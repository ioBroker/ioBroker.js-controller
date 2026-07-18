import fs from 'fs-extra';
import path from 'node:path';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';

import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import type { ProcessExitCallback } from '../_Types.js';
import type { ProcessCommandOptions } from '@/lib/cli/cliCommand.js';
import { dbConnect } from '@/lib/setup/dbConnection.js';

/** Options for the vis debug helper */
export interface CLIVisDebugOptions {
    /** The objects database client */
    objects: ObjectsRedisClient;
    /** Callback to exit the process with an exit code */
    processExit: ProcessExitCallback;
}

/**
 * Helper to upload a vis widget directory for debugging
 */
export class VisDebug {
    private readonly objects: ObjectsRedisClient;
    private readonly processExit: ProcessExitCallback;

    /**
     * @param options The objects client and the process-exit callback
     */
    constructor(options: CLIVisDebugOptions) {
        this.objects = options.objects;
        this.processExit = options.processExit;
    }

    /**
     * Upload widget directory to vis directory
     *
     * @param widgetDir directory of widgets
     * @param adapter name of the adapter
     * @param pathW widgets path
     */
    private async uploadWidgets(widgetDir: string, adapter: string, pathW: string): Promise<void> {
        if (!fs.existsSync(widgetDir)) {
            console.error(`Cannot upload widgets, because folder "${widgetDir}" does not exist`);
            return;
        }
        const dirs = fs.readdirSync(widgetDir);

        for (const dir of dirs) {
            const stat = fs.statSync(`${widgetDir}/${dir}`);
            if (stat.isDirectory()) {
                await this.uploadWidgets(`${widgetDir}/${dir}`, adapter, `${pathW}/${dir}`);
            } else {
                console.log(`Upload "${widgetDir}/${dir}"`);
                await this.objects.writeFile(adapter, `${pathW}/${dir}`, fs.readFileSync(`${widgetDir}/${dir}`));
            }
        }
    }

    /**
     * Activates vis debug for given widget
     *
     * @param widgetSet widget to activate vis debug for
     */
    async enableDebug(widgetSet: string): Promise<void> {
        let adapterDir: string | undefined;

        if (widgetSet) {
            // Try to find out the adapter directory out of a list of options
            const adapterNames2Try = [`vis-${widgetSet}`, widgetSet];
            if (adapterNames2Try[0] === adapterNames2Try[1]) {
                adapterNames2Try.splice(1, 1);
            }
            for (const adapterName of adapterNames2Try) {
                try {
                    const adapterDir2Try = tools.getAdapterDir(adapterName)!;
                    // Query the entry
                    const stats = fs.statSync(adapterDir2Try);

                    // Is it a directory?
                    if (stats.isDirectory()) {
                        //found it!
                        adapterDir = adapterDir2Try;
                        break;
                    }
                } catch {
                    // OK
                }
            }

            if (!adapterDir) {
                console.error(`Adapter not found. Tried: ${adapterNames2Try.join(', ')}`);
                return void this.processExit(EXIT_CODES.MISSING_ADAPTER_FILES);
            }
        }

        // copy index.html.original to index.html
        // copy edit.html.original to edit.html
        // correct appName.json
        // correct config.js
        const controllerDir = tools.getControllerDir();
        let visDir = `${controllerDir}/node_modules/${tools.appName.toLowerCase()}.vis`;
        if (!fs.existsSync(visDir)) {
            visDir = `${controllerDir}/node_modules/${tools.appName.toLowerCase()}.vis`;
            if (!fs.existsSync(visDir)) {
                visDir = `${controllerDir}/../${tools.appName.toLowerCase()}.vis`;
                if (!fs.existsSync(visDir)) {
                    visDir = `${controllerDir}/../${tools.appName.toLowerCase()}.vis`;
                    if (!fs.existsSync(visDir)) {
                        console.error(`Cannot find ${tools.appName.toLowerCase()}.vis`);
                        return void this.processExit(EXIT_CODES.MISSING_ADAPTER_FILES);
                    }
                }
            }
        }

        if (fs.existsSync(`${visDir}/www/index.html.original`)) {
            console.log(`Upload "${path.normalize(`${visDir}/www/index.html.original`)}"`);
            const file = fs.readFileSync(`${visDir}/www/index.html.original`, 'utf8');
            try {
                await this.objects.writeFile('vis', 'index.html', file);
            } catch (e) {
                console.error(`Cannot save ${visDir}/vis/index.html: ${e.message}`);
            }
        }

        if (fs.existsSync(`${visDir}/www/edit.html.original`)) {
            console.log(`Upload "${path.normalize(`${visDir}/www/edit.html.original`)}"`);
            const file = fs.readFileSync(`${visDir}/www/edit.html.original`, 'utf8');
            try {
                await this.objects.writeFile('vis', 'edit.html', file);
            } catch (e) {
                console.error(`Cannot save ${visDir}/vis/index.html: ${e.message}`);
            }
        }

        if (fs.existsSync(`${visDir}/www/cache.manifest`)) {
            console.log(`Modify "${path.normalize(`${visDir}/www/cache.manifest`)}"`);
            let file = fs.readFileSync(`${visDir}/www/cache.manifest`, 'utf-8');
            // if file does not exist
            if (!file.toString().trim()) {
                const version = fs.readJSONSync(`${visDir}/package.json`).version;
                file = `CACHE MANIFEST
#
# vis Version ${version}
# dev build 2



NETWORK:
    *


CACHE:
    ./img/disconnect.png

FALLBACK:
    ./index.html ./offline.html
    ./edit.html ./offline.html
`;
            }
            const n = file.match(/# dev build (\d+)/)![1];
            file = file.replace(`# dev build ${n}`, `# dev build ${parseInt(n, 10) + 1}`);
            // also update it in the vis npm dir like vis does it by itself
            fs.writeFileSync(`${visDir}/www/cache.manifest`, file);
            try {
                await this.objects.writeFile('vis', 'cache.manifest', file);
            } catch (e) {
                console.error(`Cannot save ${visDir}/www/cache.manifest: ${e.message}`);
            }
        }

        const file = fs.readJSONSync(tools.getConfigFileName(), 'utf8');

        if (!file.objects.noFileCache) {
            file.objects.noFileCache = true;
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(file, null, 2));
            await this.objects.enableFileCacheAsync(false);
            console.log('Disable cache. ioBroker restart required! Execute "iobroker restart"');
        }

        if (widgetSet) {
            const { file } = await this.objects.readFile('vis', 'js/config.js', null);
            let content = typeof file === 'string' ? file : file?.toString() || '';

            content = content.replace(/[\r\n]/g, '');
            const json: ({ name: string; depends?: string | string[]; always?: boolean; v2?: boolean } | string)[] =
                JSON.parse(content.match(/"widgetSets":\s(.*)};/)![1]);
            let found = false;
            for (const widget of Object.values(json)) {
                if (
                    widget === widgetSet ||
                    (widget as { name: string; depends?: string | string[]; always?: boolean; v2?: boolean }).name ===
                        widgetSet
                ) {
                    found = true;
                    break;
                }
            }
            // if the idget set isn't found in config.js
            if (!found) {
                console.log('Modify config.js');
                const pckg = fs.readJSONSync(`${adapterDir}/io-package.json`);
                if (pckg.native?.dependencies?.length) {
                    json.push({
                        name: widgetSet,
                        depends: pckg.native.dependencies,
                    });
                } else {
                    json.push(widgetSet);
                }

                content = content.replace(/"widgetSets":\s+.*};/, `"widgetSets": ${JSON.stringify(json, null, 2)}};`);

                await this.objects.writeFile('vis', 'js/config.js', content);
                // upload all files into vis
                console.log(`Upload ${adapterDir}/widgets`);
                await this.uploadWidgets(`${adapterDir}/widgets`, 'vis', 'widgets');
            } else {
                // upload all files into vis
                console.log(`Upload "${adapterDir}/widgets"`);
                await this.uploadWidgets(`${adapterDir}/widgets`, 'vis', 'widgets');
            }
        }

        this.processExit(EXIT_CODES.NO_ERROR);
    }
}

/**
 * @param options The command options
 */
export function processCommandVisDebug(options: ProcessCommandOptions): void {
    const { args, params, callback } = options;

    let widgetset = args[0];
    if (widgetset?.startsWith('vis-')) {
        widgetset = widgetset.substring(4);
    }

    dbConnect(params, ({ objects }) => {
        const visDebug = new VisDebug({
            objects,
            processExit: callback,
        });

        visDebug.enableDebug(widgetset).catch(e => console.error(`Cannot enable debug: ${e.message}`));
    });
}
