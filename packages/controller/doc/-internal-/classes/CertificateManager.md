[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / CertificateManager

# Class: CertificateManager

Defined in: [adapter/src/lib/adapter/managers/CertificateManager.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/CertificateManager.ts#L8)

Fetches SSL certificates from `system.certificates`, resolving file-backed values to their contents.

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new CertificateManager**(`ctx`): `CertificateManager`

Defined in: [adapter/src/lib/adapter/managers/CertificateManager.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/CertificateManager.ts#L12)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

#### Returns

`CertificateManager`

#### Overrides

[`AdapterContextBase`](AdapterContextBase.md).[`constructor`](AdapterContextBase.md#constructor)

## Methods

### getCertificates()

> **getCertificates**(`names`): `Promise`\<[`InternalGetCertificatesResult`](../interfaces/InternalGetCertificatesResult.md)\>

Defined in: [adapter/src/lib/adapter/managers/CertificateManager.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/CertificateManager.ts#L28)

Loads the named certificates from `system.certificates`. File-backed values (short strings that
are existing paths) are read from disk and their paths collected in `certFilePaths` so the caller
can watch them.

#### Parameters

##### names

public/private/chained certificate names

###### chainedName?

`string`

Name of the chained certificate

###### privateName?

`string`

Name of the private key

###### publicName?

`string`

Name of the public certificate

#### Returns

`Promise`\<[`InternalGetCertificatesResult`](../interfaces/InternalGetCertificatesResult.md)\>

#### Throws

`ERROR_DB_CLOSED` when the objects database is not connected

#### Throws

`ERROR_NOT_FOUND` when the requested certificates are not configured
