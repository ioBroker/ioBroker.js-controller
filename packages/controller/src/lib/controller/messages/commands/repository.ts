import { tools } from '@iobroker/js-controller-common';
import { SYSTEM_CONFIG_ID, SYSTEM_REPOSITORIES_ID } from '@iobroker/js-controller-common-db/constants';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { ControllerLogger, RepoRequester } from '@/lib/controller/types.js';
import type { DiagInfoCollector } from '@/lib/controller/host/diagInfoCollector.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { SystemChecks } from '@/lib/controller/host/systemChecks.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for the adapter repositories need */
export interface RepositoryCommandsDeps {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** Collects the diagnostics information */
    diag: DiagInfoCollector;
    /** Checks the system for available updates and problems */
    systemChecks: SystemChecks;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** All instances which have requested a repository update, answered together once it is done */
    requestedRepoUpdates: RepoRequester[];
}

/** Do not send the diagnostics more often than this, e.g. if multiple admin instances request the repository */
const DIAG_SEND_INTERVAL = 30_000;

/**
 * Update the configured repositories and answer with the merged repository content
 *
 * Because updating a repository can take a while, all requesters are collected and answered at once.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const getRepository: HostCommand<RepositoryCommandsDeps> = async (deps, msg) => {
    const { objects, logger, hostLogPrefix, diag, systemChecks, messages } = deps;

    if (!msg.callback || !msg.from) {
        logger.error(
            `${hostLogPrefix} Invalid request ${msg.command}. "callback"(${!!msg.callback}) or "from"(${!!msg.from}) is null`,
        );
        return;
    }

    deps.requestedRepoUpdates.push({ from: msg.from, callback: msg.callback });
    if (deps.requestedRepoUpdates.length > 1) {
        // someone has requested repo previous to us
        logger.debug(`${hostLogPrefix} Repository update already running, registered instance "${msg.from}"`);
        return;
    }

    let systemConfig: ioBroker.SystemConfigObject | null | undefined;
    try {
        systemConfig = await objects.getObject(SYSTEM_CONFIG_ID);
    } catch {
        // ignore
    }

    // Collect statistics (only if license has been confirmed - user agreed)
    if (
        systemConfig?.common?.diag &&
        systemConfig.common.licenseConfirmed &&
        // prevent sending of diagnostics by multiple admin instances
        diag.tryStartDiagSend(DIAG_SEND_INTERVAL)
    ) {
        try {
            const obj = await diag.collectDiagInfo(systemConfig.common.diag);
            // if the user selected 'none', we will have null here and do not want to send it
            if (obj) {
                // Ignore the response here and do not wait for a result to decrease the repo fetching as it used in admin GUI
                tools
                    .sendDiagInfo(obj)
                    .catch(e => logger.error(`${hostLogPrefix} Cannot send diag info: ${e.message}`));
            }
        } catch (e) {
            logger.error(`${hostLogPrefix} cannot collect diagnostics: ${e.message}`);
        }
    }

    const globalRepo = {};

    const systemRepos = await objects.getObjectAsync(SYSTEM_REPOSITORIES_ID);
    let changed = false;

    // Check if repositories exist
    if (systemRepos?.native?.repositories) {
        let forcedUpdate = false;
        if (tools.isObject(msg.message)) {
            forcedUpdate = msg.message.update;
            msg.message = msg.message.repo;
        }

        let active = msg.message ?? systemConfig?.common?.activeRepo ?? [];
        if (!Array.isArray(active)) {
            active = [active];
        }

        for (const repoUrl of active) {
            const repo = systemRepos.native.repositories[repoUrl];
            if (!repo) {
                logger.warn(`${hostLogPrefix} Requested repository "${repoUrl}" does not exist in config.`);
                continue;
            }

            if (typeof repo === 'string') {
                systemRepos.native.repositories[repoUrl] = {
                    link: repo,
                    json: null,
                };
                changed = true;
            }

            const currentRepo = systemRepos.native.repositories[repoUrl];

            // If repo is not yet loaded
            if (!currentRepo.json || forcedUpdate) {
                logger.info(`${hostLogPrefix} Updating repository "${repoUrl}" under "${currentRepo.link}"`);
                try {
                    if (
                        !currentRepo.json ||
                        !currentRepo.time ||
                        !currentRepo.hash ||
                        Date.now() - new Date(currentRepo.time).getTime() >= 30_000
                    ) {
                        const result = await tools.getRepositoryFileAsync(
                            currentRepo.link,
                            currentRepo.hash,
                            forcedUpdate,
                            currentRepo.json,
                        );

                        // If repo was really changed
                        if (result?.json && result.changed) {
                            changed = true;
                            currentRepo.json = result.json;
                            currentRepo.hash = result.hash || '';
                            currentRepo.time = new Date().toISOString();
                        }
                    }

                    // Make sure, that time is stored too to prevent the frequent access to repo server
                    if (!currentRepo.time) {
                        currentRepo.time = new Date().toISOString();
                        changed = true;
                    }
                } catch (e) {
                    logger.error(
                        `${hostLogPrefix} Error by updating repository "${repoUrl}" under "${systemRepos.native.repositories[repoUrl].link}": ${e.message}`,
                    );
                }
            }

            if (currentRepo.json) {
                Object.assign(globalRepo, currentRepo.json);
            }
        }

        if (changed || forcedUpdate) {
            try {
                // update timestamp so adapters like admin know when it was written the last time
                systemRepos.ts = Date.now();
                await objects.setObject(SYSTEM_REPOSITORIES_ID, systemRepos);
            } catch (e) {
                logger.warn(`${hostLogPrefix} Repository object could not be updated: ${e.message}`);
            }
        }
    }

    for (const requester of deps.requestedRepoUpdates) {
        messages.sendTo(requester.from, msg.command, globalRepo, requester.callback);
    }

    deps.requestedRepoUpdates.length = 0;

    try {
        await systemChecks.checkAvailableDockerUpdate();
    } catch (e) {
        logger.warn(`${hostLogPrefix} Could not check for new Docker image: ${e.message}`);
    }

    try {
        await systemChecks.listUpdatableOsPackages();
    } catch (e) {
        logger.warn(`${hostLogPrefix} Could not check for new OS updates: ${e.message}`);
    }

    await systemChecks.checkRebootRequired();
    await systemChecks.disableBlocklistedInstances();

    if (changed) {
        await systemChecks.autoUpgradeAdapters();
    }
};

/**
 * Create the host commands for the adapter repositories
 *
 * @param deps Everything these commands need
 */
export function createRepositoryCommands(deps: RepositoryCommandsDeps): Record<string, HostCommandHandler> {
    return {
        getRepository: msg => getRepository(deps, msg),
    };
}
