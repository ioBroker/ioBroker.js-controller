[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / HostObject

# Interface: HostObject

Defined in: [types-dev/objects.d.ts:1361](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1361)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.host.${string}` ``

Defined in: [types-dev/objects.d.ts:1362](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1362)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1099)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`HostCommon`](HostCommon.md)

Defined in: [types-dev/objects.d.ts:1364](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1364)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1098](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1098)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1100](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1100)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native

> **native**: [`HostNative`](HostNative.md)

Defined in: [types-dev/objects.d.ts:1365](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1365)

#### Overrides

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1105](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1105)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1103](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1103)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"host"`

Defined in: [types-dev/objects.d.ts:1363](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1363)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1102](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/objects.d.ts#L1102)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
