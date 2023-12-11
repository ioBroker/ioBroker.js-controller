[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / HostNative

# Interface: HostNative

[\<internal\>](../modules/internal_.md).HostNative

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
| `networkInterfaces` | `Dict`\<`NetworkInterfaceInfo`[]\> |
| `totalmem` | `number` |

#### Defined in

[types-dev/objects.d.ts:399](https://github.com/ioBroker/ioBroker.js-controller/blob/5b429316/packages/types-dev/objects.d.ts#L399)

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

[types-dev/objects.d.ts:390](https://github.com/ioBroker/ioBroker.js-controller/blob/5b429316/packages/types-dev/objects.d.ts#L390)

___

### process

• **process**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `env` | `Record`\<`string`, `string`\> |
| `title` | `string` |
| `versions` | `ProcessVersions` |

#### Defined in

[types-dev/objects.d.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/5b429316/packages/types-dev/objects.d.ts#L385)
