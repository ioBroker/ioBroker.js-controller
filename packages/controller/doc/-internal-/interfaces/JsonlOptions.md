[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / JsonlOptions

# Interface: JsonlOptions

## Properties

### // autoCompress (1)

> **// autoCompress (1)**: `string`

#### Defined in

[types-dev/config.d.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L18)

***

### // autoCompress (2)

> **// autoCompress (2)**: `string`

#### Defined in

[types-dev/config.d.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L19)

***

### // autoCompress (3)

> **// autoCompress (3)**: `string`

#### Defined in

[types-dev/config.d.ts:20](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L20)

***

### // ignoreReadErrors

> **// ignoreReadErrors**: `string`

#### Defined in

[types-dev/config.d.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L30)

***

### // throttleFS (1)

> **// throttleFS (1)**: `string`

#### Defined in

[types-dev/config.d.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L33)

***

### // throttleFS (2)

> **// throttleFS (2)**: `string`

#### Defined in

[types-dev/config.d.ts:34](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L34)

***

### autoCompress

> **autoCompress**: `object`

The JSONL DB is append-only and will contain unnecessary entries after a while.
It will be compressed when the uncompressed size is >= size * sizeFactor AND >= sizeFactorMinimumSize
Note that too low values here will cause the DB to be rewritten often.

#### sizeFactor

> **sizeFactor**: `number`

#### sizeFactorMinimumSize

> **sizeFactorMinimumSize**: `number`

#### Defined in

[types-dev/config.d.ts:26](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L26)

***

### ignoreReadErrors

> **ignoreReadErrors**: `true`

If single lines in the DB are corrupted, they can be ignored without losing the whole DB.

#### Defined in

[types-dev/config.d.ts:32](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L32)

***

### throttleFS

> **throttleFS**: `object`

By default, the database immediately writes to the database file. Write access can be reduced using the throttleFS option.
Be aware that buffered changes will be lost in case the process crashes

#### // intervalMs

> **// intervalMs**: `string`

#### // maxBufferedCommands

> **// maxBufferedCommands**: `string`

#### intervalMs

> **intervalMs**: `number`

Write to the database file no more than every intervalMs milliseconds.

#### maxBufferedCommands

> **maxBufferedCommands**: `number`

Force writing of buffered commands after so many changes. This reduces memory consumption and data loss in case of a crash.

#### Defined in

[types-dev/config.d.ts:39](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/config.d.ts#L39)
