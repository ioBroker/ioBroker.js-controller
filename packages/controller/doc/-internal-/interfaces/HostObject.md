[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / HostObject

# Interface: HostObject

Defined in: [types-dev/objects.d.ts:1352](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1352)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.host.${string}` ``

Defined in: [types-dev/objects.d.ts:1353](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1353)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`HostCommon`](HostCommon.md)

Defined in: [types-dev/objects.d.ts:1355](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1355)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1089](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1089)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1091](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1091)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native

> **native**: [`HostNative`](HostNative.md)

Defined in: [types-dev/objects.d.ts:1356](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1356)

#### Overrides

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1096)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"host"`

Defined in: [types-dev/objects.d.ts:1354](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1354)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1093)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
