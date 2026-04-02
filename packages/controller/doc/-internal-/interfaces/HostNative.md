[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / HostNative

# Interface: HostNative

Defined in: [types-dev/objects.d.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L418)

## Properties

### hardware

> **hardware**: `object`

Defined in: [types-dev/objects.d.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L433)

#### cpus

> **cpus**: `Omit`\<`CpuInfo`, `"times"`\> & `Partial`\<`Pick`\<`CpuInfo`, `"times"`\>\>[]

Return value of `os.cpu` but property `times` could be removed from every entry

#### networkInterfaces

> **networkInterfaces**: `Dict`\<`NetworkInterfaceInfo`[]\>

#### totalmem

> **totalmem**: `number`

***

### os

> **os**: `object`

Defined in: [types-dev/objects.d.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L424)

#### arch

> **arch**: `string`

#### endianness

> **endianness**: `"BE"` \| `"LE"`

#### hostname

> **hostname**: `string`

#### platform

> **platform**: `Platform`

#### release

> **release**: `string`

#### tmpdir

> **tmpdir**: `string`

#### type

> **type**: `string`

***

### process

> **process**: `object`

Defined in: [types-dev/objects.d.ts:419](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L419)

#### env

> **env**: `ProcessEnv`

#### title

> **title**: `string`

#### versions

> **versions**: `ProcessVersions`
