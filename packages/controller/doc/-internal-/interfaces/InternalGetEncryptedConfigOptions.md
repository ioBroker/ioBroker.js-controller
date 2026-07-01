[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetEncryptedConfigOptions

# Interface: InternalGetEncryptedConfigOptions

Defined in: [adapter/src/lib/\_Types.ts:468](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L468)

Options for reading an encrypted config value

## Properties

### attribute

> **attribute**: `string`

Defined in: [adapter/src/lib/\_Types.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L470)

The config attribute to decrypt

***

### callback?

> `optional` **callback?**: [`GetEncryptedConfigCallback`](../type-aliases/GetEncryptedConfigCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:472](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L472)

Called with the decrypted value
