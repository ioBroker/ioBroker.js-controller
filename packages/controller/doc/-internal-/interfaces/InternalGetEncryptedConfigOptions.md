[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetEncryptedConfigOptions

# Interface: InternalGetEncryptedConfigOptions

Defined in: [adapter/src/lib/\_Types.ts:474](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L474)

Options for reading an encrypted config value

## Properties

### attribute

> **attribute**: `string`

Defined in: [adapter/src/lib/\_Types.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L476)

The config attribute to decrypt

***

### callback?

> `optional` **callback?**: [`GetEncryptedConfigCallback`](../type-aliases/GetEncryptedConfigCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:478](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L478)

Called with the decrypted value
