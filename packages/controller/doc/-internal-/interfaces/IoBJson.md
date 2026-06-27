[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / IoBJson

# Interface: IoBJson

Defined in: [types-dev/config.d.ts:110](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L110)

The ioBroker global config

## Properties

### // dataDir

> **// dataDir**: `string`

Defined in: [types-dev/config.d.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L159)

Comment/hint shown next to the dataDir setting in the JSON config

***

### // dnsResolution

> **// dnsResolution**: `string`

Defined in: [types-dev/config.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L168)

Comment/hint shown next to the dnsResolution setting in the JSON config

***

### dataDir

> **dataDir**: `string`

Defined in: [types-dev/config.d.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L157)

Always relative to iobroker.js-controller/

***

### dnsResolution

> **dnsResolution**: `"verbatim"` \| `"ipv4first"`

Defined in: [types-dev/config.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L170)

Use 'verbatim' for ipv6 first, else use 'ipv4first'

***

### log

> **log**: `object`

Defined in: [types-dev/config.d.ts:150](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L150)

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

Defined in: [types-dev/config.d.ts:139](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L139)

Configuration of the multihost service used to connect several ioBroker hosts

#### enabled

> **enabled**: `boolean`

#### password

> **password**: `string`

#### persist

> **persist**: `boolean`

#### secure

> **secure**: `boolean`

***

### objects

> **objects**: [`ObjectsDatabaseOptions`](ObjectsDatabaseOptions.md)

Defined in: [types-dev/config.d.ts:146](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L146)

Configuration of the objects database

***

### plugins

> **plugins**: `object`

Defined in: [types-dev/config.d.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L161)

Controller plugins configuration keyed by plugin name

#### Index Signature

\[`pluginName`: `string`\]: `object`

***

### states

> **states**: [`StatesDatabaseOptions`](StatesDatabaseOptions.md)

Defined in: [types-dev/config.d.ts:148](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L148)

Configuration of the states database

***

### system

> **system**: `object`

Defined in: [types-dev/config.d.ts:112](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L112)

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
