[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / CertificateManager

# Class: CertificateManager

Defined in: [adapter/src/lib/adapter/managers/CertificateManager.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/CertificateManager.ts#L11)

Fetches SSL certificates from `system.certificates`, resolving file-backed values to their contents.

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new CertificateManager**(`ctx`): `CertificateManager`

Defined in: [adapter/src/lib/adapter/managers/CertificateManager.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/CertificateManager.ts#L22)

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

Defined in: [adapter/src/lib/adapter/managers/CertificateManager.ts:77](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/CertificateManager.ts#L77)

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

***

### hasRelevantChange()

> **hasRelevantChange**(`obj`): `boolean`

Defined in: [adapter/src/lib/adapter/managers/CertificateManager.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/CertificateManager.ts#L38)

Tells whether a new version of the `system.certificates` object actually changes one of the
certificates handed out by the last [getCertificates](#getcertificates) call. Unrelated certificates being
added, changed or removed are ignored, so that editing some other adapter's certificate does
not restart this one.

Compares the raw (unresolved) values: for a file-backed certificate that is the path, so
repointing it to a different file counts as a change, while a change of the file content is
left to the file watcher.

#### Parameters

##### obj

[`OtherObject`](../interfaces/OtherObject.md) \| `null` \| `undefined`

the new `system.certificates` object, or null/undefined if it was deleted

#### Returns

`boolean`

***

### stopWatching()

> **stopWatching**(): `void`

Defined in: [adapter/src/lib/adapter/managers/CertificateManager.ts:61](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/CertificateManager.ts#L61)

Forgets the certificates handed out by the last [getCertificates](#getcertificates) call, so a subsequent
change of `system.certificates` is no longer treated as relevant by [hasRelevantChange](#hasrelevantchange).
Used when the adapter stops watching its certificates.

#### Returns

`void`
