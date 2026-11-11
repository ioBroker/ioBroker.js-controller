[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SystemConfigCommon

# Interface: SystemConfigCommon

Defined in: [types-dev/objects.d.ts:944](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L944)

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### activeRepo

> **activeRepo**: `string`[]

Defined in: [types-dev/objects.d.ts:946](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L946)

Name of all active repositories

***

### adapterAutoUpgrade?

> `optional` **adapterAutoUpgrade?**: `object`

Defined in: [types-dev/objects.d.ts:986](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L986)

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

Defined in: [types-dev/objects.d.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L956)

Optional user's city (only for diagnostics)

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L183)

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

***

### country?

> `optional` **country?**: `string`

Defined in: [types-dev/objects.d.ts:958](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L958)

Optional user's country (only for diagnostics)

***

### currency?

> `optional` **currency?**: `string`

Defined in: [types-dev/objects.d.ts:962](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L962)

User-defined currency

***

### custom?

> `optional` **custom?**: `undefined`

Defined in: [types-dev/objects.d.ts:1011](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1011)

***

### dateFormat

> **dateFormat**: `string`

Defined in: [types-dev/objects.d.ts:974](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L974)

Used date format for formatting

***

### defaultHistory

> **defaultHistory**: `string`

Defined in: [types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L966)

Default history instance

***

### defaultLogLevel?

> `optional` **defaultLogLevel?**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L972)

System wide default log level

***

### defaultNewAcl

> **defaultNewAcl**: `object`

Defined in: [types-dev/objects.d.ts:978](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L978)

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

Defined in: [types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L175)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

***

### diag

> **diag**: `"none"` \| `"extended"` \| `"no-city"`

Defined in: [types-dev/objects.d.ts:968](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L968)

Which diag data is allowed to be sent

***

### dontDelete?

> `optional` **dontDelete?**: `true`

Defined in: [types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L178)

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

***

### expert?

> `optional` **expert?**: `true`

Defined in: [types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L181)

When set to true, this object is only visible when the expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

***

### expertMode?

> `optional` **expertMode?**: `boolean`

Defined in: [types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1006)

Global saved expert mode for admin

***

### firstDayOfWeek?

> `optional` **firstDayOfWeek?**: `"monday"` \| `"sunday"`

Defined in: [types-dev/objects.d.ts:964](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L964)

User-defined first day of the week

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L188)

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

***

### intro?

> `optional` **intro?**: `string`[]

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L995)

Deactivated instances that should not be shown in admin/Intro page

***

### isFloatComma

> **isFloatComma**: `boolean`

Defined in: [types-dev/objects.d.ts:950](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L950)

If floating comma is used instead of dot

***

### language

> **language**: [`Languages`](../type-aliases/Languages.md)

Defined in: [types-dev/objects.d.ts:948](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L948)

Current configured language

***

### latitude?

> `optional` **latitude?**: `number`

Defined in: [types-dev/objects.d.ts:954](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L954)

Configured latitude

***

### licenseConfirmed

> **licenseConfirmed**: `boolean`

Defined in: [types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L970)

If the license has already been confirmed

***

### longitude?

> `optional` **longitude?**: `number`

Defined in: [types-dev/objects.d.ts:952](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L952)

Configured longitude

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L172)

The name of this object as a simple string or an object with translations

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

***

### role?

> `optional` **role?**: `string`

Defined in: [types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L190)

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

***

### siteName?

> `optional` **siteName?**: `string`

Defined in: [types-dev/objects.d.ts:976](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L976)

This name will be shown in the admin's header. Just to identify the whole installation

***

### tabsVisible?

> `optional` **tabsVisible?**: `object`[]

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L997)

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

Defined in: [types-dev/objects.d.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L960)

User-defined temperature unit

***

### tipsDisabled?

> `optional` **tipsDisabled?**: `boolean`

Defined in: [types-dev/objects.d.ts:1008](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1008)

The "Did you know ...?" tips of the admin are not shown when it is opened
