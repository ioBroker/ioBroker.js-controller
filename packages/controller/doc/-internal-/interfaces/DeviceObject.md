[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DeviceObject

# Interface: DeviceObject

Defined in: [types-dev/objects.d.ts:1025](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1025)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `string`

Defined in: [types-dev/objects.d.ts:989](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L989)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:996](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L996)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`DeviceCommon`](DeviceCommon.md)

Defined in: [types-dev/objects.d.ts:1027](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1027)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L997)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1002](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1002)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1000)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"device"`

Defined in: [types-dev/objects.d.ts:1026](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1026)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:999](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L999)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
