[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialHostObject

# Interface: PartialHostObject

Defined in: [types-dev/objects.d.ts:1293](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1293)

## Extends

- `Partial`\<`Omit`\<[`HostObject`](HostObject.md), `"common"` \| `"native"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `system.host.${string}` ``

Defined in: [types-dev/objects.d.ts:1287](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1287)

The ID of this object

#### Inherited from

[`HostObject`](HostObject.md).[`_id`](HostObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1024](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1024)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`HostCommon`](HostCommon.md)\>

Defined in: [types-dev/objects.d.ts:1294](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1294)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1023](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1023)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1025](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1025)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Partial`\<[`HostNative`](HostNative.md)\>

Defined in: [types-dev/objects.d.ts:1295](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1295)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1030](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1030)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1028](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1028)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"host"`

Defined in: [types-dev/objects.d.ts:1288](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1288)

#### Inherited from

[`HostObject`](HostObject.md).[`type`](HostObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1027](https://github.com/ioBroker/ioBroker.js-controller/blob/d0887094b5dfd9bda3a0096a0ef2ea334d850a72/packages/types-dev/objects.d.ts#L1027)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
