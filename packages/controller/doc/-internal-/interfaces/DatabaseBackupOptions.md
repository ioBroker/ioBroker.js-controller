[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DatabaseBackupOptions

# Interface: DatabaseBackupOptions

Defined in: [types-dev/config.d.ts:1](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L1)

## Properties

### // files

> **// files**: `string`

Defined in: [types-dev/config.d.ts:5](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L5)

***

### // hours

> **// hours**: `string`

Defined in: [types-dev/config.d.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L8)

***

### // path

> **// path**: `string`

Defined in: [types-dev/config.d.ts:14](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L14)

***

### // period

> **// period**: `string`

Defined in: [types-dev/config.d.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L11)

***

### disabled

> **disabled**: `boolean`

Defined in: [types-dev/config.d.ts:2](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L2)

***

### files

> **files**: `number`

Defined in: [types-dev/config.d.ts:4](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L4)

Minimal number of backup files, after the deletion will be executed according to backupTime settings

***

### hours

> **hours**: `number`

Defined in: [types-dev/config.d.ts:7](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L7)

All backups older than configured hours will be deleted. But only if the number of files is greater than of backupNumber

***

### path

> **path**: `string`

Defined in: [types-dev/config.d.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L13)

Absolute path to back-up directory or empty to back-up in data directory

***

### period

> **period**: `number`

Defined in: [types-dev/config.d.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/config.d.ts#L10)

By default backup every 2 hours. Time is in minutes. To disable backup set the value to 0
