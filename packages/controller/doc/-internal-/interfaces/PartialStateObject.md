[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialStateObject

# Interface: PartialStateObject

Defined in: [types-dev/objects.d.ts:1108](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1108)

## Extends

- `Partial`\<`Omit`\<[`StateObject`](StateObject.md), `"common"` \| `"acl"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:1086](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1086)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: `Partial`\<[`StateACL`](StateACL.md)\>

Defined in: [types-dev/objects.d.ts:1110](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1110)

***

### common?

> `optional` **common?**: `Partial`\<[`StateCommon`](StateCommon.md)\>

Defined in: [types-dev/objects.d.ts:1109](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1109)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1092)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1099)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1097](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1097)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"state"`

Defined in: [types-dev/objects.d.ts:1103](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1103)

#### Inherited from

[`StateObject`](StateObject.md).[`type`](StateObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1096)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
