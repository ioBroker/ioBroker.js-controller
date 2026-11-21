[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SystemConfigCommon

# Interface: SystemConfigCommon

Defined in: [types-dev/objects.d.ts:985](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L985)

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### activeRepo

> **activeRepo**: `string`[]

Defined in: [types-dev/objects.d.ts:987](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L987)

Name of all active repositories

***

### adapterAutoUpgrade?

> `optional` **adapterAutoUpgrade?**: `object`

Defined in: [types-dev/objects.d.ts:1027](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1027)

Configured auto upgrade policy

#### defaultPolicy

> **defaultPolicy**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

Default policy, if none has been set explicit for the adapter

#### repositories

> **repositories**: `object`

Configuration for each repository

##### Index Signature

\[`repoName`: `string`\]: `boolean`

***

### city?

> `optional` **city?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L997)

Optional user's city (only for diagnostics)

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L183)

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

***

### country?

> `optional` **country?**: `string`

Defined in: [types-dev/objects.d.ts:999](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L999)

Optional user's country (only for diagnostics)

***

### currency?

> `optional` **currency?**: `string`

Defined in: [types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1003)

User-defined currency

***

### custom?

> `optional` **custom?**: `undefined`

Defined in: [types-dev/objects.d.ts:1052](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1052)

***

### dateFormat

> **dateFormat**: `string`

Defined in: [types-dev/objects.d.ts:1015](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1015)

Used date format for formatting

***

### defaultHistory

> **defaultHistory**: `string`

Defined in: [types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1007)

Default history instance

***

### defaultLogLevel?

> `optional` **defaultLogLevel?**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/objects.d.ts:1013](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1013)

System wide default log level

***

### defaultNewAcl

> **defaultNewAcl**: `object`

Defined in: [types-dev/objects.d.ts:1019](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1019)

Default acl for new objects

#### file

> **file**: `number`

#### object

> **object**: `number`

#### owner

> **owner**: `` `system.user.${string}` ``

#### ownerGroup

> **ownerGroup**: `` `system.group.${string}` ``

#### state

> **state**: `number`

***

### desc?

> `optional` **desc?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L175)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

***

### diag

> **diag**: `"none"` \| `"extended"` \| `"no-city"`

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1009)

Which diag data is allowed to be sent

***

### dontDelete?

> `optional` **dontDelete?**: `true`

Defined in: [types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L178)

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

***

### expert?

> `optional` **expert?**: `true`

Defined in: [types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L181)

When set to true, this object is only visible when the expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

***

### expertMode?

> `optional` **expertMode?**: `boolean`

Defined in: [types-dev/objects.d.ts:1047](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1047)

Global saved expert mode for admin

***

### firstDayOfWeek?

> `optional` **firstDayOfWeek?**: `"monday"` \| `"sunday"`

Defined in: [types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1005)

User-defined first day of the week

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L188)

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

***

### intro?

> `optional` **intro?**: `string`[]

Defined in: [types-dev/objects.d.ts:1036](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1036)

Deactivated instances that should not be shown in admin/Intro page

***

### isFloatComma

> **isFloatComma**: `boolean`

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L991)

If floating comma is used instead of dot

***

### language

> **language**: [`Languages`](../type-aliases/Languages.md)

Defined in: [types-dev/objects.d.ts:989](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L989)

Current configured language

***

### latitude?

> `optional` **latitude?**: `number`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L995)

Configured latitude

***

### licenseConfirmed

> **licenseConfirmed**: `boolean`

Defined in: [types-dev/objects.d.ts:1011](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1011)

If the license has already been confirmed

***

### longitude?

> `optional` **longitude?**: `number`

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L993)

Configured longitude

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L172)

The name of this object as a simple string or an object with translations

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

***

### role?

> `optional` **role?**: `string`

Defined in: [types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L190)

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

***

### siteName?

> `optional` **siteName?**: `string`

Defined in: [types-dev/objects.d.ts:1017](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1017)

This name will be shown in the admin's header. Just to identify the whole installation

***

### tabsVisible?

> `optional` **tabsVisible?**: `object`[]

Defined in: [types-dev/objects.d.ts:1038](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1038)

Defines which tabs are visible in the left menu of the admin

#### color?

> `optional` **color?**: `string`

Optional color of the tab

#### name

> **name**: `string`

Name of the tab

#### visible

> **visible**: `boolean`

If the tab should be visible

***

### tempUnit?

> `optional` **tempUnit?**: `"°C"` \| `"°F"`

Defined in: [types-dev/objects.d.ts:1001](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1001)

User-defined temperature unit

***

### tipsDisabled?

> `optional` **tipsDisabled?**: `boolean`

Defined in: [types-dev/objects.d.ts:1049](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1049)

The "Did you know ...?" tips of the admin are not shown when it is opened
