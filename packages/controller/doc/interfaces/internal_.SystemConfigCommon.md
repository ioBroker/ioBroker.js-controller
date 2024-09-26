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
- [city](internal_.SystemConfigCommon.md#city)
- [color](internal_.SystemConfigCommon.md#color)
- [country](internal_.SystemConfigCommon.md#country)
- [currency](internal_.SystemConfigCommon.md#currency)
- [custom](internal_.SystemConfigCommon.md#custom)
- [dateFormat](internal_.SystemConfigCommon.md#dateformat)
- [defaultHistory](internal_.SystemConfigCommon.md#defaulthistory)
- [defaultLogLevel](internal_.SystemConfigCommon.md#defaultloglevel)
- [defaultNewAcl](internal_.SystemConfigCommon.md#defaultnewacl)
- [desc](internal_.SystemConfigCommon.md#desc)
- [diag](internal_.SystemConfigCommon.md#diag)
- [dontDelete](internal_.SystemConfigCommon.md#dontdelete)
- [expert](internal_.SystemConfigCommon.md#expert)
- [expertMode](internal_.SystemConfigCommon.md#expertmode)
- [firstDayOfWeek](internal_.SystemConfigCommon.md#firstdayofweek)
- [icon](internal_.SystemConfigCommon.md#icon)
- [intro](internal_.SystemConfigCommon.md#intro)
- [isFloatComma](internal_.SystemConfigCommon.md#isfloatcomma)
- [language](internal_.SystemConfigCommon.md#language)
- [latitude](internal_.SystemConfigCommon.md#latitude)
- [licenseConfirmed](internal_.SystemConfigCommon.md#licenseconfirmed)
- [longitude](internal_.SystemConfigCommon.md#longitude)
- [name](internal_.SystemConfigCommon.md#name)
- [role](internal_.SystemConfigCommon.md#role)
- [siteName](internal_.SystemConfigCommon.md#sitename)
- [tabsVisible](internal_.SystemConfigCommon.md#tabsvisible)
- [tempUnit](internal_.SystemConfigCommon.md#tempunit)

## Properties

### activeRepo

• **activeRepo**: `string`[]

Name of all active repositories

#### Defined in

[types-dev/objects.d.ts:807](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L807)

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

[types-dev/objects.d.ts:847](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L847)

___

### city

• `Optional` **city**: `string`

Optional user's city (only for diagnostics)

#### Defined in

[types-dev/objects.d.ts:817](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L817)

___

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[color](internal_.ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L179)

___

### country

• `Optional` **country**: `string`

Optional user's country (only for diagnostics)

#### Defined in

[types-dev/objects.d.ts:819](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L819)

___

### currency

• `Optional` **currency**: `string`

User-defined currency

#### Defined in

[types-dev/objects.d.ts:823](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L823)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:870](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L870)

___

### dateFormat

• **dateFormat**: `string`

Used date format for formatting

#### Defined in

[types-dev/objects.d.ts:835](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L835)

___

### defaultHistory

• **defaultHistory**: `string`

Default history instance

#### Defined in

[types-dev/objects.d.ts:827](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L827)

___

### defaultLogLevel

• `Optional` **defaultLogLevel**: [`LogLevel`](../modules/internal_.md#loglevel)

System wide default log level

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L833)

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

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L839)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L171)

___

### diag

• **diag**: ``"none"`` \| ``"extended"`` \| ``"no-city"``

Which diag data is allowed to be sent

#### Defined in

[types-dev/objects.d.ts:829](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L829)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L174)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L177)

___

### expertMode

• `Optional` **expertMode**: `boolean`

Global saved expert mode for admin

#### Defined in

[types-dev/objects.d.ts:867](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L867)

___

### firstDayOfWeek

• `Optional` **firstDayOfWeek**: ``"monday"`` \| ``"sunday"``

User-defined first day of the week

#### Defined in

[types-dev/objects.d.ts:825](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L825)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L184)

___

### intro

• `Optional` **intro**: `string`[]

Deactivated instances, that should not be shown in admin/Intro page

#### Defined in

[types-dev/objects.d.ts:856](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L856)

___

### isFloatComma

• **isFloatComma**: `boolean`

If floating comma is used instead of dot

#### Defined in

[types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L811)

___

### language

• **language**: [`Languages`](../modules/internal_.md#languages)

Current configured language

#### Defined in

[types-dev/objects.d.ts:809](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L809)

___

### latitude

• `Optional` **latitude**: `number`

Configured latitude

#### Defined in

[types-dev/objects.d.ts:815](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L815)

___

### licenseConfirmed

• **licenseConfirmed**: `boolean`

If license has already been confirmed

#### Defined in

[types-dev/objects.d.ts:831](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L831)

___

### longitude

• `Optional` **longitude**: `number`

Configured longitude

#### Defined in

[types-dev/objects.d.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L813)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L168)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L186)

___

### siteName

• `Optional` **siteName**: `string`

This name will be shown in admin's header. Just to identify the whole installation

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L837)

___

### tabsVisible

• `Optional` **tabsVisible**: \{ `color?`: `string` ; `name`: `string` ; `visible`: `boolean`  }[]

Defines which tabs are visible in the left menu of the admin

#### Defined in

[types-dev/objects.d.ts:858](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L858)

___

### tempUnit

• `Optional` **tempUnit**: ``"°C"`` \| ``"°F"``

User-defined temperature unit

#### Defined in

[types-dev/objects.d.ts:821](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L821)
