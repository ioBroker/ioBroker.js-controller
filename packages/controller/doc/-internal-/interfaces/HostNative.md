[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / HostNative

# Interface: HostNative

## Properties

### hardware

> **hardware**: `object`

#### cpus

> **cpus**: `Omit`\<`CpuInfo`, `"times"`\> & `Partial`\<`Pick`\<`CpuInfo`, `"times"`\>\>[]

Return value of os.cpu but property `times` could be removed from every entry

#### networkInterfaces

> **networkInterfaces**: `Dict`\<`NetworkInterfaceInfo`[]\>

#### totalmem

> **totalmem**: `number`

#### Defined in

[types-dev/objects.d.ts:419](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/types-dev/objects.d.ts#L419)

***

### os

> **os**: `object`

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

#### Defined in

[types-dev/objects.d.ts:410](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/types-dev/objects.d.ts#L410)

***

### process

> **process**: `object`

#### env

> **env**: `ProcessEnv`

#### title

> **title**: `string`

#### versions

> **versions**: `ProcessVersions`

#### Defined in

[types-dev/objects.d.ts:405](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/types-dev/objects.d.ts#L405)
