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
- [tabsVisible](internal_.SystemConfigCommon.md#tabsvisible)
- [tempUnit](internal_.SystemConfigCommon.md#tempunit)

## Properties

### activeRepo

• **activeRepo**: `string`[]

Name of all active repositories

#### Defined in

[types-dev/objects.d.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L768)

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

[types-dev/objects.d.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L806)

___

### city

• `Optional` **city**: `string`

Optional user's city (only for diagnostics)

#### Defined in

[types-dev/objects.d.ts:778](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L778)

___

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[color](internal_.ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L179)

___

### country

• `Optional` **country**: `string`

Optional user's country (only for diagnostics)

#### Defined in

[types-dev/objects.d.ts:780](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L780)

___

### currency

• `Optional` **currency**: `string`

User-defined currency

#### Defined in

[types-dev/objects.d.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L784)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:829](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L829)

___

### dateFormat

• **dateFormat**: `string`

Used date format for formatting

#### Defined in

[types-dev/objects.d.ts:796](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L796)

___

### defaultHistory

• **defaultHistory**: `string`

Default history instance

#### Defined in

[types-dev/objects.d.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L788)

___

### defaultLogLevel

• `Optional` **defaultLogLevel**: [`LogLevel`](../modules/internal_.md#loglevel)

System wide default log level

#### Defined in

[types-dev/objects.d.ts:794](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L794)

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

[types-dev/objects.d.ts:798](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L798)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L171)

___

### diag

• **diag**: ``"none"`` \| ``"extended"`` \| ``"no-city"``

Which diag data is allowed to be sent

#### Defined in

[types-dev/objects.d.ts:790](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L790)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L174)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L177)

___

### expertMode

• `Optional` **expertMode**: `boolean`

Global saved expert mode for admin

#### Defined in

[types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L826)

___

### firstDayOfWeek

• `Optional` **firstDayOfWeek**: ``"monday"`` \| ``"sunday"``

User-defined first day of the week

#### Defined in

[types-dev/objects.d.ts:786](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L786)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L184)

___

### intro

• `Optional` **intro**: `string`[]

Deactivated instances, that should not be shown in admin/Intro page

#### Defined in

[types-dev/objects.d.ts:815](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L815)

___

### isFloatComma

• **isFloatComma**: `boolean`

If floating comma is used instead of dot

#### Defined in

[types-dev/objects.d.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L772)

___

### language

• **language**: [`Languages`](../modules/internal_.md#languages)

Current configured language

#### Defined in

[types-dev/objects.d.ts:770](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L770)

___

### latitude

• `Optional` **latitude**: `number`

Configured latitude

#### Defined in

[types-dev/objects.d.ts:776](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L776)

___

### licenseConfirmed

• **licenseConfirmed**: `boolean`

If license has already been confirmed

#### Defined in

[types-dev/objects.d.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L792)

___

### longitude

• `Optional` **longitude**: `number`

Configured longitude

#### Defined in

[types-dev/objects.d.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L774)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L168)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L186)

___

### tabsVisible

• `Optional` **tabsVisible**: \{ `color?`: `string` ; `name`: `string` ; `visible`: `boolean`  }[]

Which tabs are visible in admin in the left menu

#### Defined in

[types-dev/objects.d.ts:817](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L817)

___

### tempUnit

• `Optional` **tempUnit**: ``"°C"`` \| ``"°F"``

User-defined temperature unit

#### Defined in

[types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L782)
