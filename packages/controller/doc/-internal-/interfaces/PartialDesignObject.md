[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialDesignObject

# Interface: PartialDesignObject

Defined in: [types-dev/objects.d.ts:1349](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1349)

## Extends

- `Partial`\<`Omit`\<[`DesignObject`](DesignObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1343](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1343)

The ID of this object

#### Inherited from

[`DesignObject`](DesignObject.md).[`_id`](DesignObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1019](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1019)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

Defined in: [types-dev/objects.d.ts:1350](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1350)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1018](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1018)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1020](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1020)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### language?

> `optional` **language?**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1344](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1344)

#### Inherited from

[`DesignObject`](DesignObject.md).[`language`](DesignObject.md#language)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1016](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1016)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1025](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1025)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1023](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1023)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"design"`

Defined in: [types-dev/objects.d.ts:1342](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1342)

#### Inherited from

[`DesignObject`](DesignObject.md).[`type`](DesignObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1022](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1022)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views?

> `optional` **views?**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1346](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/objects.d.ts#L1346)

#### Inherited from

`Partial.views`
