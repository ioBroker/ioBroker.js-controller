[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GroupCommon

# Interface: GroupCommon

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### acl

> **acl**: `Omit`\<[`PermissionSet`](PermissionSet.md), `"user"` \| `"groups"`\>

The default permissions of this group

#### Defined in

[types-dev/objects.d.ts:446](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L446)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L179)

***

### custom?

> `optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:450](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L450)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L171)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L174)

***

### enabled?

> `optional` **enabled**: `boolean`

A group can be disabled, if missing, a group is active

#### Defined in

[types-dev/objects.d.ts:448](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L448)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L177)

***

### icon?

> `optional` **icon**: `string`

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L184)

***

### members

> **members**: \`system.user.$\{string\}\`[]

The users of this group

#### Defined in

[types-dev/objects.d.ts:444](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L444)

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The name of this group

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:442](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L442)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L186)
