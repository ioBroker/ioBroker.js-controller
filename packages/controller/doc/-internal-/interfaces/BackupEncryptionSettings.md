[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BackupEncryptionSettings

# Interface: BackupEncryptionSettings

Defined in: [types-dev/config.d.ts:232](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/config.d.ts#L232)

How backups are encrypted

## Properties

### mode

> **mode**: `"password"` \| `"publicKey"`

Defined in: [types-dev/config.d.ts:238](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/config.d.ts#L238)

`password`: with a password, asked for or taken from `--password-file` or `IOB_BACKUP_PASSWORD`.
`publicKey`: with the public key below, without a password - for unattended backups. Only the private key,
which should not be kept on this host, can restore them.

***

### publicKey?

> `optional` **publicKey?**: `string`

Defined in: [types-dev/config.d.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/config.d.ts#L240)

The public key of `iobroker backup keygen`, needed for the mode `publicKey`
