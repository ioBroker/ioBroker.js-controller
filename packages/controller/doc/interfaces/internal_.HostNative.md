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

| Name | Type | Description |
| :------ | :------ | :------ |
| `cpus` | `Omit`\<`CpuInfo`, ``"times"``\> & `Partial`\<`Pick`\<`CpuInfo`, ``"times"``\>\>[] | Return value of os.cpu but property `times` could be removed from every entry |
| `networkInterfaces` | `Dict`\<`NetworkInterfaceInfo`[]\> | - |
| `totalmem` | `number` | - |

#### Defined in

[types-dev/objects.d.ts:413](https://github.com/ioBroker/ioBroker.js-controller/blob/20b08f31/packages/types-dev/objects.d.ts#L413)

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

[types-dev/objects.d.ts:404](https://github.com/ioBroker/ioBroker.js-controller/blob/20b08f31/packages/types-dev/objects.d.ts#L404)

___

### process

• **process**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `env` | `ProcessEnv` |
| `title` | `string` |
| `versions` | `ProcessVersions` |

#### Defined in

[types-dev/objects.d.ts:399](https://github.com/ioBroker/ioBroker.js-controller/blob/20b08f31/packages/types-dev/objects.d.ts#L399)
