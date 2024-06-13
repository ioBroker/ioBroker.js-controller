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

[types-dev/objects.d.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L417)

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

[types-dev/objects.d.ts:408](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L408)

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

[types-dev/objects.d.ts:403](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L403)
