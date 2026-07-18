[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetCertificatesResult

# Interface: InternalGetCertificatesResult

Defined in: [adapter/src/lib/\_Types.ts:444](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L444)

Result of [CertificateManager.getCertificates](../classes/CertificateManager.md#getcertificates): certs, letsEncrypt flag, and file-backed cert paths to watch

## Properties

### certFilePaths

> **certFilePaths**: `string`[]

Defined in: [adapter/src/lib/\_Types.ts:450](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L450)

Paths of file-backed certificate values that were read, for the caller to watch

***

### certs

> **certs**: [`Certificates`](Certificates.md)

Defined in: [adapter/src/lib/\_Types.ts:446](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L446)

The resolved certificate content

***

### useLetsEncrypt?

> `optional` **useLetsEncrypt?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:448](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L448)

Whether Let's Encrypt certificates are configured
