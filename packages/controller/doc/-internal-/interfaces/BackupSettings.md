[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BackupSettings

# Interface: BackupSettings

Defined in: [types-dev/config.d.ts:228](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L228)

Settings of the backups created with `iobroker backup`

## Properties

### encryption?

> `optional` **encryption?**: [`BackupEncryptionSettings`](BackupEncryptionSettings.md)

Defined in: [types-dev/config.d.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L230)

Encrypt every backup, also without `--encrypt`. Absent: backups are only encrypted with `--encrypt`
