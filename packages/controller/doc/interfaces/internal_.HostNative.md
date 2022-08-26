[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / HostNative

# Interface: HostNative

[<internal>](../modules/internal_.md).HostNative

## Table of contents

### Properties

- [hardware](internal_.HostNative.md#hardware)
- [os](internal_.HostNative.md#os)
- [process](internal_.HostNative.md#process)

## Properties

### hardware

• **hardware**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cpus` | [`CpuInfo`](internal_.CpuInfo.md)[] |
| `networkInterfaces` | [`Dict`](internal_.Dict.md)<[`NetworkInterfaceInfo`](../modules/internal_.md#networkinterfaceinfo)[]\> |
| `totalmem` | `number` |

#### Defined in

node_modules/@types/iobroker/objects.d.ts:321

___

### os

• **os**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `arch` | `string` |
| `endianness` | ``"BE"`` \| ``"LE"`` |
| `hostname` | `string` |
| `platform` | [`Platform`](../modules/internal_.md#platform) |
| `release` | `string` |
| `tmpdir` | `string` |
| `type` | `string` |

#### Defined in

node_modules/@types/iobroker/objects.d.ts:312

___

### process

• **process**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `env` | [`Record`](../modules/internal_.md#record)<`string`, `string`\> |
| `title` | `string` |
| `versions` | [`ProcessVersions`](internal_.ProcessVersions.md) |

#### Defined in

node_modules/@types/iobroker/objects.d.ts:307
