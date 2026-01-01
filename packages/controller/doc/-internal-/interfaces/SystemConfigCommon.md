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

[types-dev/objects.d.ts:865](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L865)

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

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L905)

***

### city?

> `optional` **city**: `string`

Optional user's city (only for diagnostics)

#### Defined in

[types-dev/objects.d.ts:875](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L875)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L183)

***

### country?

> `optional` **country**: `string`

Optional user's country (only for diagnostics)

#### Defined in

[types-dev/objects.d.ts:877](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L877)

***

### currency?

> `optional` **currency**: `string`

User-defined currency

#### Defined in

[types-dev/objects.d.ts:881](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L881)

***

### custom?

> `optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:928](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L928)

***

### dateFormat

> **dateFormat**: `string`

Used date format for formatting

#### Defined in

[types-dev/objects.d.ts:893](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L893)

***

### defaultHistory

> **defaultHistory**: `string`

Default history instance

#### Defined in

[types-dev/objects.d.ts:885](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L885)

***

### defaultLogLevel?

> `optional` **defaultLogLevel**: [`LogLevel`](../type-aliases/LogLevel.md)

System wide default log level

#### Defined in

[types-dev/objects.d.ts:891](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L891)

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

[types-dev/objects.d.ts:897](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L897)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L175)

***

### diag

> **diag**: `"none"` \| `"extended"` \| `"no-city"`

Which diag data is allowed to be sent

#### Defined in

[types-dev/objects.d.ts:887](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L887)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L178)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L181)

***

### expertMode?

> `optional` **expertMode**: `boolean`

Global saved expert mode for admin

#### Defined in

[types-dev/objects.d.ts:925](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L925)

***

### firstDayOfWeek?

> `optional` **firstDayOfWeek**: `"monday"` \| `"sunday"`

User-defined first day of the week

#### Defined in

[types-dev/objects.d.ts:883](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L883)

***

### icon?

> `optional` **icon**: `string`

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L188)

***

### intro?

> `optional` **intro**: `string`[]

Deactivated instances, that should not be shown in admin/Intro page

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L914)

***

### isFloatComma

> **isFloatComma**: `boolean`

If floating comma is used instead of dot

#### Defined in

[types-dev/objects.d.ts:869](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L869)

***

### language

> **language**: [`Languages`](../type-aliases/Languages.md)

Current configured language

#### Defined in

[types-dev/objects.d.ts:867](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L867)

***

### latitude?

> `optional` **latitude**: `number`

Configured latitude

#### Defined in

[types-dev/objects.d.ts:873](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L873)

***

### licenseConfirmed

> **licenseConfirmed**: `boolean`

If license has already been confirmed

#### Defined in

[types-dev/objects.d.ts:889](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L889)

***

### longitude?

> `optional` **longitude**: `number`

Configured longitude

#### Defined in

[types-dev/objects.d.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L871)

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The name of this object as a simple string or an object with translations

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L172)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L190)

***

### siteName?

> `optional` **siteName**: `string`

This name will be shown in admin's header. Just to identify the whole installation

#### Defined in

[types-dev/objects.d.ts:895](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L895)

***

### tabsVisible?

> `optional` **tabsVisible**: `object`[]

Defines which tabs are visible in the left menu of the admin

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L916)

***

### tempUnit?

> `optional` **tempUnit**: `"°C"` \| `"°F"`

User-defined temperature unit

#### Defined in

[types-dev/objects.d.ts:879](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L879)
