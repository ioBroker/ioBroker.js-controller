import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import type { InternalGetCertificatesResult } from '../../_Types.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';

/** Fetches SSL certificates from `system.certificates`, resolving file-backed values to their contents. */
export class CertificateManager extends AdapterContextBase {
    /**
     * @param ctx Shared adapter context providing live runtime state
     */
    constructor(ctx: AdapterContext) {
        super(ctx);
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
            obj = await objects.getObject('system.certificates');
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
