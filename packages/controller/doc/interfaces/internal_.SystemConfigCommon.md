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

[types-dev/objects.d.ts:659](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L659)

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

[types-dev/objects.d.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L687)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L697)

___

### dateFormat

• **dateFormat**: `string`

Used date format for formatting

#### Defined in

[types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L677)

___

### defaultHistory

• **defaultHistory**: `string`

Default history instance

#### Defined in

[types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L669)

___

### defaultLogLevel

• `Optional` **defaultLogLevel**: [`LogLevel`](../modules/internal_.md#loglevel)

System wide default log level

#### Defined in

[types-dev/objects.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L675)

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

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L679)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L169)

___

### diag

• **diag**: ``"none"`` \| ``"extended"`` \| ``"no-city"``

Which diag data is allowed to be sent

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L671)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L172)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L175)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L180)

___

### isFloatComma

• **isFloatComma**: `boolean`

If floating comma is used instead of dot

#### Defined in

[types-dev/objects.d.ts:663](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L663)

___

### language

• **language**: [`Languages`](../modules/internal_.md#languages)

Current configured language

#### Defined in

[types-dev/objects.d.ts:661](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L661)

___

### latitude

• **latitude**: `string`

Configured latitude

#### Defined in

[types-dev/objects.d.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L667)

___

### licenseConfirmed

• **licenseConfirmed**: `boolean`

If license has already been confirmed

#### Defined in

[types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L673)

___

### longitude

• **longitude**: `string`

Configured longitude

#### Defined in

[types-dev/objects.d.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L665)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L166)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:182](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L182)
