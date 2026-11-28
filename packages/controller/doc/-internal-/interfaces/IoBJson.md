[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / IoBJson

# Interface: IoBJson

Defined in: [types-dev/config.d.ts:151](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L151)

The ioBroker global config

## Properties

### // dataDir

> **// dataDir**: `string`

Defined in: [types-dev/config.d.ts:211](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L211)

Comment/hint shown next to the dataDir setting in the JSON config

***

### // dnsResolution

> **// dnsResolution**: `string`

Defined in: [types-dev/config.d.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L220)

Comment/hint shown next to the dnsResolution setting in the JSON config

***

### backup?

> `optional` **backup?**: [`BackupSettings`](BackupSettings.md)

Defined in: [types-dev/config.d.ts:224](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L224)

Settings of the backups created with `iobroker backup` (not the backups of the databases, see `objects.backup`)

***

### dataDir

> **dataDir**: `string`

Defined in: [types-dev/config.d.ts:209](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L209)

Always relative to iobroker.js-controller/

***

### dnsResolution

> **dnsResolution**: `"verbatim"` \| `"ipv4first"`

Defined in: [types-dev/config.d.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L222)

Use 'verbatim' for ipv6 first, else use 'ipv4first'

***

### log

> **log**: `object`

Defined in: [types-dev/config.d.ts:202](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L202)

Logging configuration

#### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

#### maxDays

> **maxDays**: `number`

#### noStdout

> **noStdout**: `boolean`

#### transport

> **transport**: `Record`\<`string`, `any`\>

***

### multihostService

> **multihostService**: `object`

Defined in: [types-dev/config.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L184)

Configuration of the multihost service used to connect several ioBroker hosts

#### enabled

> **enabled**: `boolean`

#### pairing?

> `optional` **pairing?**: `boolean`

Whether this host offers itself to be attached to a master: it announces itself via mDNS and
accepts the `join` command of a master over UDP 50005. Off when absent - ready-made images
switch it on, because only the image knows that a device is fresh. Switched off again by the
join, and without effect once the host uses a remote database.

#### password

> **password**: `string`

#### persist

> **persist**: `boolean`

#### secure

> **secure**: `boolean`

***

### objects

> **objects**: [`ObjectsDatabaseOptions`](ObjectsDatabaseOptions.md)

Defined in: [types-dev/config.d.ts:198](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L198)

Configuration of the objects database

***

### plugins

> **plugins**: `object`

Defined in: [types-dev/config.d.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L213)

Controller plugins configuration keyed by plugin name

#### Index Signature

\[`pluginName`: `string`\]: `object`

***

### states

> **states**: [`StatesDatabaseOptions`](StatesDatabaseOptions.md)

Defined in: [types-dev/config.d.ts:200](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L200)

Configuration of the states database

***

### system

> **system**: `object`

Defined in: [types-dev/config.d.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/config.d.ts#L153)

System-wide controller settings

#### // allowShellCommands

> **// allowShellCommands**: `string`

#### // checkDiskInterval

> **// checkDiskInterval**: `string`

#### // compact

> **// compact**: `string`

#### // memLimitError

> **// memLimitError**: `string`

#### // memLimitWarn

> **// memLimitWarn**: `string`

#### // statisticsInterval

> **// statisticsInterval**: `string`

#### allowShellCommands

> **allowShellCommands**: `boolean`

Allow execution of "shell" sendToHost commands

#### checkDiskInterval

> **checkDiskInterval**: `number`

Interval how often the disk size will be checked in ms

#### compact

> **compact**: `boolean`

Controller will try to start the instances as a part of the same process. No spawn will be done. Only by adapters that support it and have flag compact flag in io-package.json

#### dbLossTimeout?

> `optional` **dbLossTimeout?**: `number`

Stop all instances if the objects or states DB did not answer for this time in ms, until the DB answers again and the controller starts them. Absent or 0: off. Values below 5000 are ignored with a warning

#### fence?

> `optional` **fence?**: `boolean`

Whether adapters confirm their host after a DB reconnect before sending commands. Absent: only with more than one host

#### hostname

> **hostname**: `string`

If empty, determine use real hostname

#### instanceStartInterval

> **instanceStartInterval**: `number`

Interval to wait between multiple instances starts

#### memLimitError

> **memLimitError**: `number`

If the available RAM is below this threshold on adapter start, an error will be logged.

#### memLimitWarn

> **memLimitWarn**: `number`

If the available RAM is below this threshold on adapter start, a warning will be logged.

#### memoryLimitMB

> **memoryLimitMB**: `number`

Do not use more than memory limit mb by ioB process (0 to deactivate)

#### statisticsInterval

> **statisticsInterval**: `number`

Interval how often the counters for input/output in adapters and controller will be updated in ms
