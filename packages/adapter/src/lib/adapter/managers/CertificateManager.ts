import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import type { InternalGetCertificatesResult } from '../../_Types.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';

/** ID of the object holding all configured certificates */
export const CERTIFICATES_OBJECT_ID = 'system.certificates';

/** Fetches SSL certificates from `system.certificates`, resolving file-backed values to their contents. */
export class CertificateManager extends AdapterContextBase {
    /**
     * Raw (unresolved) values of the certificates handed out by the last {@link getCertificates} call,
     * keyed by certificate name. Used to tell a relevant change of `system.certificates` from an
     * unrelated one. `undefined` until certificates have been requested at least once.
     */
    #usedCertificates?: Map<string, string>;

    /**
     * @param ctx Shared adapter context providing live runtime state
     */
    constructor(ctx: AdapterContext) {
        super(ctx);
    }

    /**
     * Tells whether a new version of the `system.certificates` object actually changes one of the
     * certificates handed out by the last {@link getCertificates} call. Unrelated certificates being
     * added, changed or removed are ignored, so that editing some other adapter's certificate does
     * not restart this one.
     *
     * Compares the raw (unresolved) values: for a file-backed certificate that is the path, so
     * repointing it to a different file counts as a change, while a change of the file content is
     * left to the file watcher.
     *
     * @param obj the new `system.certificates` object, or null/undefined if it was deleted
     */
    hasRelevantChange(obj: ioBroker.OtherObject | null | undefined): boolean {
        const usedCertificates = this.#usedCertificates;
        if (!usedCertificates) {
            // certificates were never requested, so nothing can have changed for us
            return false;
        }

        const certificates: Record<string, string> | undefined = obj?.native?.certificates;

        for (const [name, value] of usedCertificates) {
            if (certificates?.[name] !== value) {
                return true;
            }
        }

        return false;
    }

    /**
     * Forgets the certificates handed out by the last {@link getCertificates} call, so a subsequent
     * change of `system.certificates` is no longer treated as relevant by {@link hasRelevantChange}.
     * Used when the adapter stops watching its certificates.
     */
    stopWatching(): void {
        this.#usedCertificates = undefined;
    }

    /**
     * Loads the named certificates from `system.certificates`. File-backed values (short strings that
     * are existing paths) are read from disk and their paths collected in `certFilePaths` so the caller
     * can watch them.
     *
     * @param names public/private/chained certificate names
     * @param names.publicName Name of the public certificate
     * @param names.privateName Name of the private key
     * @param names.chainedName Name of the chained certificate
     * @throws {Error} `ERROR_DB_CLOSED` when the objects database is not connected
     * @throws {Error} `ERROR_NOT_FOUND` when the requested certificates are not configured
     */
    async getCertificates(names: {
        publicName?: string;
        privateName?: string;
        chainedName?: string;
    }): Promise<InternalGetCertificatesResult> {
        const { publicName, privateName, chainedName } = names;
        const objects = this.objects;

        let obj: ioBroker.OtherObject | undefined | null;
        try {
            obj = await objects.getObject(CERTIFICATES_OBJECT_ID);
        } catch {
            // ignore
        }

        if (
            !obj ||
            !obj.native.certificates ||
            !publicName ||
            !privateName ||
            !obj.native.certificates[publicName] ||
            !obj.native.certificates[privateName] ||
            (chainedName && !obj.native.certificates[chainedName])
        ) {
            this.logger.error(
                `${this.namespaceLog} Cannot configure secure web server, because no certificates found: ${publicName}, ${privateName}, ${chainedName}`,
            );
            if (publicName === 'defaultPublic' || privateName === 'defaultPrivate') {
                this.logger.info(
                    `${this.namespaceLog} Default certificates seem to be configured but missing. You can execute "iobroker cert create" in your shell to create these.`,
                );
            }
            throw new Error(tools.ERRORS.ERROR_NOT_FOUND);
        }

        const certFilePaths = new Array<string>();

        let ca: string | undefined;
        if (chainedName) {
            const chained = this.#resolveCert(obj.native.certificates[chainedName], certFilePaths).split(
                '-----END CERTIFICATE-----\r\n',
            );
            if (chained.join('').length >= 512) {
                const caArr = new Array<string>();
                for (const cert of chained) {
                    if (cert.replace(/(\r\n|\r|\n)/g, '').trim()) {
                        caArr.push(`${cert}-----END CERTIFICATE-----\r\n`);
                    }
                }
                ca = caArr.join('');
            }
        }

        const certs: ioBroker.Certificates = {
            key: this.#resolveCert(obj.native.certificates[privateName], certFilePaths),
            cert: this.#resolveCert(obj.native.certificates[publicName], certFilePaths),
            ca,
        };

        // remember the raw values, so a change of `system.certificates` can be told from an unrelated one
        this.#usedCertificates = new Map<string, string>();
        for (const name of [publicName, privateName, chainedName]) {
            if (name) {
                this.#usedCertificates.set(name, obj.native.certificates[name]);
            }
        }

        return { certs, useLetsEncrypt: obj.native.letsEncrypt, certFilePaths };
    }

    /**
     * Returns the certificate content. When `value` is a short string that is an existing file path,
     * reads the file, records the path in `certFilePaths` (deduped), and returns the file content.
     * Otherwise returns `value` unchanged.
     *
     * @param value inline certificate or a path to one
     * @param certFilePaths accumulator for file-backed paths (mutated)
     */
    #resolveCert(value: string, certFilePaths: string[]): string {
        if (typeof value === 'string') {
            try {
                if (value.length < 1024 && fs.existsSync(value)) {
                    const content = fs.readFileSync(value, 'utf8');
                    if (!certFilePaths.includes(value)) {
                        certFilePaths.push(value);
                    }
                    return content;
                }
            } catch (e: any) {
                this.logger.error(`${this.namespaceLog} Could not read certificate from file ${value}: ${e.message}`);
            }
        }
        return value;
    }
}
