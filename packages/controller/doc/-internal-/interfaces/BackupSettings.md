[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BackupSettings

# Interface: BackupSettings

Defined in: [types-dev/config.d.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/config.d.ts#L226)

Settings of the backups created with `iobroker backup`

## Properties

### encryption?

> `optional` **encryption?**: [`BackupEncryptionSettings`](BackupEncryptionSettings.md)

Defined in: [types-dev/config.d.ts:228](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/config.d.ts#L228)

Encrypt every backup, also without `--encrypt`. Absent: backups are only encrypted with `--encrypt`
