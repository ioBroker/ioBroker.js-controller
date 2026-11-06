[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalAdapterJsonConfig

# Interface: InternalAdapterJsonConfig

Defined in: [adapter/src/lib/adapter/adapter.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/adapter/adapter.ts#L871)

Contents of iobroker.json plus some internal variables

## Extends

- [`IoBrokerJson`](../type-aliases/IoBrokerJson.md)

## Properties

### // dataDir

> **// dataDir**: `string`

Defined in: [types-dev/config.d.ts:207](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L207)

Comment/hint shown next to the dataDir setting in the JSON config

#### Inherited from

`ioBroker.IoBrokerJson.// dataDir`

***

### // dnsResolution

> **// dnsResolution**: `string`

Defined in: [types-dev/config.d.ts:216](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L216)

Comment/hint shown next to the dnsResolution setting in the JSON config

#### Inherited from

`ioBroker.IoBrokerJson.// dnsResolution`

***

### consoleOutput?

> `optional` **consoleOutput?**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:875](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/adapter/adapter.ts#L875)

If logs must be printed to stdout

***

### dataDir

> **dataDir**: `string`

Defined in: [types-dev/config.d.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L205)

Always relative to iobroker.js-controller/

#### Inherited from

`ioBroker.IoBrokerJson.dataDir`

***

### dnsResolution

> **dnsResolution**: `"verbatim"` \| `"ipv4first"`

Defined in: [types-dev/config.d.ts:218](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L218)

Use 'verbatim' for ipv6 first, else use 'ipv4first'

#### Inherited from

`ioBroker.IoBrokerJson.dnsResolution`

***

### forceIfDisabled?

> `optional` **forceIfDisabled?**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:877](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/adapter/adapter.ts#L877)

Start instance even if it disabled in config

***

### instance?

> `optional` **instance?**: `number`

Defined in: [adapter/src/lib/adapter/adapter.ts:879](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/adapter/adapter.ts#L879)

Instance number

***

### isInstall?

> `optional` **isInstall?**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:873](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/adapter/adapter.ts#L873)

Is instance started with the `--install` flag

***

### log

> **log**: `object`

Defined in: [types-dev/config.d.ts:198](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L198)

Logging configuration

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

***

### multihostService

> **multihostService**: `object`

Defined in: [types-dev/config.d.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L180)

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

#### Inherited from

`ioBroker.IoBrokerJson.multihostService`

***

### objects

> **objects**: [`ObjectsDatabaseOptions`](ObjectsDatabaseOptions.md)

Defined in: [types-dev/config.d.ts:194](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L194)

Configuration of the objects database

#### Inherited from

`ioBroker.IoBrokerJson.objects`

***

### plugins

> **plugins**: `object`

Defined in: [types-dev/config.d.ts:209](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L209)

Controller plugins configuration keyed by plugin name

#### Index Signature

\[`pluginName`: `string`\]: `object`

#### Inherited from

`ioBroker.IoBrokerJson.plugins`

***

### states

> **states**: [`StatesDatabaseOptions`](StatesDatabaseOptions.md)

Defined in: [types-dev/config.d.ts:196](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L196)

Configuration of the states database

#### Inherited from

`ioBroker.IoBrokerJson.states`

***

### system

> **system**: `object`

Defined in: [types-dev/config.d.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/config.d.ts#L153)

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

#### Inherited from

`ioBroker.IoBrokerJson.system`
