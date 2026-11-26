import { tools } from '@iobroker/js-controller-common';

/** The certificates in `native.certificates` of `system.certificates`, as far as `setup first` cares */
export interface SystemCertificates {
    /** Private key of the default certificate, as PEM or as path of a file */
    defaultPrivate?: string | null;
    /** The default certificate, as PEM or as path of a file */
    defaultPublic?: string | null;
}

/**
 * Check if `setup first` has to create the default certificate
 *
 * `setup first` runs on a fresh installation and again on every installation or upgrade of the js-controller.
 * Only a fresh installation has no certificate yet. On an upgrade, an invalid certificate was already renewed by
 * the certificate check before, and replacing a valid one, or the file a user configured instead, would break every
 * browser and client that trusts it.
 *
 * @param certificates `native.certificates` of `system.certificates`
 */
export function needsDefaultCertificate(certificates: SystemCertificates | null | undefined): boolean {
    return (
        !certificates?.defaultPrivate ||
        !certificates.defaultPublic ||
        !tools.getCertificateInfo(certificates.defaultPublic)
    );
}
