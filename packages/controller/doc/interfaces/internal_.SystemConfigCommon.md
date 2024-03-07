[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / SystemConfigCommon

# Interface: SystemConfigCommon

[\<internal\>](../modules/internal_.md).SystemConfigCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`SystemConfigCommon`**

## Table of contents

### Properties

- [activeRepo](internal_.SystemConfigCommon.md#activerepo)
- [adapterAutoUpgrade](internal_.SystemConfigCommon.md#adapterautoupgrade)
- [color](internal_.SystemConfigCommon.md#color)
- [custom](internal_.SystemConfigCommon.md#custom)
- [dateFormat](internal_.SystemConfigCommon.md#dateformat)
- [defaultHistory](internal_.SystemConfigCommon.md#defaulthistory)
- [defaultLogLevel](internal_.SystemConfigCommon.md#defaultloglevel)
- [defaultNewAcl](internal_.SystemConfigCommon.md#defaultnewacl)
- [desc](internal_.SystemConfigCommon.md#desc)
- [diag](internal_.SystemConfigCommon.md#diag)
- [dontDelete](internal_.SystemConfigCommon.md#dontdelete)
- [expert](internal_.SystemConfigCommon.md#expert)
- [icon](internal_.SystemConfigCommon.md#icon)
- [isFloatComma](internal_.SystemConfigCommon.md#isfloatcomma)
- [language](internal_.SystemConfigCommon.md#language)
- [latitude](internal_.SystemConfigCommon.md#latitude)
- [licenseConfirmed](internal_.SystemConfigCommon.md#licenseconfirmed)
- [longitude](internal_.SystemConfigCommon.md#longitude)
- [name](internal_.SystemConfigCommon.md#name)
- [role](internal_.SystemConfigCommon.md#role)

## Properties

### activeRepo

• **activeRepo**: `string`[]

Name of all active repositories

#### Defined in

[types-dev/objects.d.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L687)

___

### adapterAutoUpgrade

• `Optional` **adapterAutoUpgrade**: `Object`

Configured auto upgrade policy

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultPolicy` | [`AutoUpgradePolicy`](../modules/internal_.md#autoupgradepolicy) | Default policy, if none has been set explicit for the adapter |
| `repositories` | \{ `[repoName: string]`: `boolean`;  } | Configuration for each repository |

#### Defined in

[types-dev/objects.d.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L715)

___

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[color](internal_.ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L178)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:725](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L725)

___

### dateFormat

• **dateFormat**: `string`

Used date format for formatting

#### Defined in

[types-dev/objects.d.ts:705](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L705)

___

### defaultHistory

• **defaultHistory**: `string`

Default history instance

#### Defined in

[types-dev/objects.d.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L697)

___

### defaultLogLevel

• `Optional` **defaultLogLevel**: [`LogLevel`](../modules/internal_.md#loglevel)

System wide default log level

#### Defined in

[types-dev/objects.d.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L703)

___

### defaultNewAcl

• **defaultNewAcl**: `Object`

Default acl for new objects

#### Type declaration

| Name | Type |
| :------ | :------ |
| `file` | `number` |
| `object` | `number` |
| `owner` | \`system.user.$\{string}\` |
| `ownerGroup` | \`system.group.$\{string}\` |
| `state` | `number` |

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L707)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L170)

___

### diag

• **diag**: ``"none"`` \| ``"extended"`` \| ``"no-city"``

Which diag data is allowed to be sent

#### Defined in

[types-dev/objects.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L699)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L173)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:176](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L176)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L183)

___

### isFloatComma

• **isFloatComma**: `boolean`

If floating comma is used instead of dot

#### Defined in

[types-dev/objects.d.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L691)

___

### language

• **language**: [`Languages`](../modules/internal_.md#languages)

Current configured language

#### Defined in

[types-dev/objects.d.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L689)

___

### latitude

• **latitude**: `string`

Configured latitude

#### Defined in

[types-dev/objects.d.ts:695](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L695)

___

### licenseConfirmed

• **licenseConfirmed**: `boolean`

If license has already been confirmed

#### Defined in

[types-dev/objects.d.ts:701](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L701)

___

### longitude

• **longitude**: `string`

Configured longitude

#### Defined in

[types-dev/objects.d.ts:693](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L693)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L167)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:185](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L185)
