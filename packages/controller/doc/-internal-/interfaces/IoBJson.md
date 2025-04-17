[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / IoBJson

# Interface: IoBJson

The ioBroker global config

## Properties

### // dataDir

> **// dataDir**: `string`

#### Defined in

[types-dev/config.d.ts:135](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L135)

***

### // dnsResolution

> **// dnsResolution**: `string`

#### Defined in

[types-dev/config.d.ts:142](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L142)

***

### dataDir

> **dataDir**: `string`

Always relative to iobroker.js-controller/

#### Defined in

[types-dev/config.d.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L134)

***

### dnsResolution

> **dnsResolution**: `"verbatim"` \| `"ipv4first"`

Use 'verbatim' for ipv6 first, else use 'ipv4first'

#### Defined in

[types-dev/config.d.ts:144](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L144)

***

### log

> **log**: `object`

#### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

#### maxDays

> **maxDays**: `number`

#### noStdout

> **noStdout**: `boolean`

#### transport

> **transport**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/config.d.ts:127](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L127)

***

### multihostService

> **multihostService**: `object`

#### enabled

> **enabled**: `boolean`

#### password

> **password**: `string`

#### persist

> **persist**: `boolean`

#### secure

> **secure**: `boolean`

#### Defined in

[types-dev/config.d.ts:119](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L119)

***

### objects

> **objects**: [`ObjectsDatabaseOptions`](ObjectsDatabaseOptions.md)

#### Defined in

[types-dev/config.d.ts:125](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L125)

***

### plugins

> **plugins**: `object`

#### Index Signature

 \[`pluginName`: `string`\]: `object`

#### Defined in

[types-dev/config.d.ts:136](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L136)

***

### states

> **states**: [`StatesDatabaseOptions`](StatesDatabaseOptions.md)

#### Defined in

[types-dev/config.d.ts:126](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L126)

***

### system

> **system**: `object`

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

#### Defined in

[types-dev/config.d.ts:93](https://github.com/ioBroker/ioBroker.js-controller/blob/16f7418df1bc6d07b232fa81310bbbd4fbe2a36c/packages/types-dev/config.d.ts#L93)
