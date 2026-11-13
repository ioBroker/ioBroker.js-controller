[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialScriptObject

# Interface: PartialScriptObject

Defined in: [types-dev/objects.d.ts:1376](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1376)

## Extends

- `Partial`\<`Omit`\<[`ScriptObject`](ScriptObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:1070](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1070)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1077](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1077)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`ScriptCommon`](ScriptCommon.md)\>

Defined in: [types-dev/objects.d.ts:1377](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1377)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1076](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1076)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1078](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1078)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1074](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1074)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1083](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1083)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1081](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1081)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"script"`

Defined in: [types-dev/objects.d.ts:1372](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1372)

#### Inherited from

[`ScriptObject`](ScriptObject.md).[`type`](ScriptObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1080](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1080)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
