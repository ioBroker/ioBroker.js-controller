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

[types-dev/objects.d.ts:429](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L429)

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

[types-dev/objects.d.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L420)

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

[types-dev/objects.d.ts:415](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L415)
