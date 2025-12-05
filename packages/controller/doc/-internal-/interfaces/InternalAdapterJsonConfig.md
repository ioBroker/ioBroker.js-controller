[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalAdapterJsonConfig

# Interface: InternalAdapterJsonConfig

Contents of iobroker.json plus some internal variables

## Extends

- [`IoBrokerJson`](../type-aliases/IoBrokerJson.md)

## Properties

### // dataDir

> **// dataDir**: `string`

#### Inherited from

`ioBroker.IoBrokerJson.// dataDir`

#### Defined in

[types-dev/config.d.ts:135](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L135)

***

### // dnsResolution

> **// dnsResolution**: `string`

#### Inherited from

`ioBroker.IoBrokerJson.// dnsResolution`

#### Defined in

[types-dev/config.d.ts:142](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L142)

***

### consoleOutput?

> `optional` **consoleOutput**: `boolean`

If logs must be printed to stdout

#### Defined in

[adapter/src/lib/adapter/adapter.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/adapter/src/lib/adapter/adapter.ts#L629)

***

### dataDir

> **dataDir**: `string`

Always relative to iobroker.js-controller/

#### Inherited from

`ioBroker.IoBrokerJson.dataDir`

#### Defined in

[types-dev/config.d.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L134)

***

### dnsResolution

> **dnsResolution**: `"verbatim"` \| `"ipv4first"`

Use 'verbatim' for ipv6 first, else use 'ipv4first'

#### Inherited from

`ioBroker.IoBrokerJson.dnsResolution`

#### Defined in

[types-dev/config.d.ts:144](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L144)

***

### forceIfDisabled?

> `optional` **forceIfDisabled**: `boolean`

Start instance even if it disabled in config

#### Defined in

[adapter/src/lib/adapter/adapter.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/adapter/src/lib/adapter/adapter.ts#L631)

***

### instance?

> `optional` **instance**: `number`

Instance number

#### Defined in

[adapter/src/lib/adapter/adapter.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/adapter/src/lib/adapter/adapter.ts#L633)

***

### isInstall?

> `optional` **isInstall**: `boolean`

Is instance started with the `--install` flag

#### Defined in

[adapter/src/lib/adapter/adapter.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/adapter/src/lib/adapter/adapter.ts#L627)

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

#### Inherited from

`ioBroker.IoBrokerJson.log`

#### Defined in

[types-dev/config.d.ts:127](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L127)

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

#### Inherited from

`ioBroker.IoBrokerJson.multihostService`

#### Defined in

[types-dev/config.d.ts:119](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L119)

***

### objects

> **objects**: [`ObjectsDatabaseOptions`](ObjectsDatabaseOptions.md)

#### Inherited from

`ioBroker.IoBrokerJson.objects`

#### Defined in

[types-dev/config.d.ts:125](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L125)

***

### plugins

> **plugins**: `object`

#### Index Signature

 \[`pluginName`: `string`\]: `object`

#### Inherited from

`ioBroker.IoBrokerJson.plugins`

#### Defined in

[types-dev/config.d.ts:136](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L136)

***

### states

> **states**: [`StatesDatabaseOptions`](StatesDatabaseOptions.md)

#### Inherited from

`ioBroker.IoBrokerJson.states`

#### Defined in

[types-dev/config.d.ts:126](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L126)

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

#### Inherited from

`ioBroker.IoBrokerJson.system`

#### Defined in

[types-dev/config.d.ts:93](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/config.d.ts#L93)
