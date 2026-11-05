[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChannelObject

# Interface: ChannelObject

Defined in: [types-dev/objects.d.ts:1067](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1067)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `string`

Defined in: [types-dev/objects.d.ts:1040](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1040)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1047](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1047)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`ChannelCommon`](ChannelCommon.md)

Defined in: [types-dev/objects.d.ts:1069](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1069)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1046](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1046)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1048](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1048)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1044](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1044)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1053](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1053)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1051](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1051)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"channel"`

Defined in: [types-dev/objects.d.ts:1068](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1068)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1050](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/objects.d.ts#L1050)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
