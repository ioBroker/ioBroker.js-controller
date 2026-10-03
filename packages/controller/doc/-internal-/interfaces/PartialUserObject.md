[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialUserObject

# Interface: PartialUserObject

Defined in: [types-dev/objects.d.ts:1258](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1258)

## Extends

- `Partial`\<`Omit`\<[`UserObject`](UserObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1253](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1253)

The ID of this object

#### Inherited from

[`UserObject`](UserObject.md).[`_id`](UserObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:996](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L996)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`UserCommon`](UserCommon.md)\>

Defined in: [types-dev/objects.d.ts:1259](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1259)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L997)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1002](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1002)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1000)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"user"`

Defined in: [types-dev/objects.d.ts:1254](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1254)

#### Inherited from

[`UserObject`](UserObject.md).[`type`](UserObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:999](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L999)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
