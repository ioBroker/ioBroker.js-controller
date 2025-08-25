[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SystemConfigCommon

# Interface: SystemConfigCommon

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### activeRepo

> **activeRepo**: `string`[]

Name of all active repositories

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L834)

***

### adapterAutoUpgrade?

> `optional` **adapterAutoUpgrade**: `object`

Configured auto upgrade policy

#### defaultPolicy

> **defaultPolicy**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

Default policy, if none has been set explicit for the adapter

#### repositories

> **repositories**: `object`

Configuration for each repository

##### Index Signature

 \[`repoName`: `string`\]: `boolean`

#### Defined in

[types-dev/objects.d.ts:874](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L874)

***

### city?

> `optional` **city**: `string`

Optional user's city (only for diagnostics)

#### Defined in

[types-dev/objects.d.ts:844](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L844)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L179)

***

### country?

> `optional` **country**: `string`

Optional user's country (only for diagnostics)

#### Defined in

[types-dev/objects.d.ts:846](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L846)

***

### currency?

> `optional` **currency**: `string`

User-defined currency

#### Defined in

[types-dev/objects.d.ts:850](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L850)

***

### custom?

> `optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:897](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L897)

***

### dateFormat

> **dateFormat**: `string`

Used date format for formatting

#### Defined in

[types-dev/objects.d.ts:862](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L862)

***

### defaultHistory

> **defaultHistory**: `string`

Default history instance

#### Defined in

[types-dev/objects.d.ts:854](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L854)

***

### defaultLogLevel?

> `optional` **defaultLogLevel**: [`LogLevel`](../type-aliases/LogLevel.md)

System wide default log level

#### Defined in

[types-dev/objects.d.ts:860](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L860)

***

### defaultNewAcl

> **defaultNewAcl**: `object`

Default acl for new objects

#### file

> **file**: `number`

#### object

> **object**: `number`

#### owner

> **owner**: \`system.user.$\{string\}\`

#### ownerGroup

> **ownerGroup**: \`system.group.$\{string\}\`

#### state

> **state**: `number`

#### Defined in

[types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L866)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L171)

***

### diag

> **diag**: `"none"` \| `"extended"` \| `"no-city"`

Which diag data is allowed to be sent

#### Defined in

[types-dev/objects.d.ts:856](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L856)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L174)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L177)

***

### expertMode?

> `optional` **expertMode**: `boolean`

Global saved expert mode for admin

#### Defined in

[types-dev/objects.d.ts:894](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L894)

***

### firstDayOfWeek?

> `optional` **firstDayOfWeek**: `"monday"` \| `"sunday"`

User-defined first day of the week

#### Defined in

[types-dev/objects.d.ts:852](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L852)

***

### icon?

> `optional` **icon**: `string`

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L184)

***

### intro?

> `optional` **intro**: `string`[]

Deactivated instances, that should not be shown in admin/Intro page

#### Defined in

[types-dev/objects.d.ts:883](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L883)

***

### isFloatComma

> **isFloatComma**: `boolean`

If floating comma is used instead of dot

#### Defined in

[types-dev/objects.d.ts:838](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L838)

***

### language

> **language**: [`Languages`](../type-aliases/Languages.md)

Current configured language

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L836)

***

### latitude?

> `optional` **latitude**: `number`

Configured latitude

#### Defined in

[types-dev/objects.d.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L842)

***

### licenseConfirmed

> **licenseConfirmed**: `boolean`

If license has already been confirmed

#### Defined in

[types-dev/objects.d.ts:858](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L858)

***

### longitude?

> `optional` **longitude**: `number`

Configured longitude

#### Defined in

[types-dev/objects.d.ts:840](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L840)

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The name of this object as a simple string or an object with translations

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L168)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L186)

***

### siteName?

> `optional` **siteName**: `string`

This name will be shown in admin's header. Just to identify the whole installation

#### Defined in

[types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L864)

***

### tabsVisible?

> `optional` **tabsVisible**: `object`[]

Defines which tabs are visible in the left menu of the admin

#### Defined in

[types-dev/objects.d.ts:885](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L885)

***

### tempUnit?

> `optional` **tempUnit**: `"°C"` \| `"°F"`

User-defined temperature unit

#### Defined in

[types-dev/objects.d.ts:848](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L848)
