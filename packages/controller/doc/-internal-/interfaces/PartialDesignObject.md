[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialDesignObject

# Interface: PartialDesignObject

Defined in: [types-dev/objects.d.ts:1377](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1377)

## Extends

- `Partial`\<`Omit`\<[`DesignObject`](DesignObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1371](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1371)

The ID of this object

#### Inherited from

[`DesignObject`](DesignObject.md).[`_id`](DesignObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1047](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1047)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

Defined in: [types-dev/objects.d.ts:1378](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1378)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1046](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1046)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1048](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1048)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### language?

> `optional` **language?**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1372](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1372)

#### Inherited from

[`DesignObject`](DesignObject.md).[`language`](DesignObject.md#language)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1044](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1044)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1053](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1053)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1051](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1051)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"design"`

Defined in: [types-dev/objects.d.ts:1370](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1370)

#### Inherited from

[`DesignObject`](DesignObject.md).[`type`](DesignObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1050](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1050)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views?

> `optional` **views?**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1374](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1374)

#### Inherited from

`Partial.views`
