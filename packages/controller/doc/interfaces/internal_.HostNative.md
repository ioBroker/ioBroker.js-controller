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
| `cpus` | `CpuInfo`[] |
| `networkInterfaces` | `Dict`<`NetworkInterfaceInfo`[]\> |
| `totalmem` | `number` |

#### Defined in

[types/objects.d.ts:343](https://github.com/ioBroker/ioBroker.js-controller/blob/d87d529d/packages/types/objects.d.ts#L343)

___

### os

• **os**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `arch` | `string` |
| `endianness` | ``"BE"`` \| ``"LE"`` |
| `hostname` | `string` |
| `platform` | `Platform` |
| `release` | `string` |
| `tmpdir` | `string` |
| `type` | `string` |

#### Defined in

[types/objects.d.ts:334](https://github.com/ioBroker/ioBroker.js-controller/blob/d87d529d/packages/types/objects.d.ts#L334)

___

### process

• **process**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `env` | `Record`<`string`, `string`\> |
| `title` | `string` |
| `versions` | `ProcessVersions` |

#### Defined in

[types/objects.d.ts:329](https://github.com/ioBroker/ioBroker.js-controller/blob/d87d529d/packages/types/objects.d.ts#L329)
