[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialScheduleObject

# Interface: PartialScheduleObject

Defined in: [types-dev/objects.d.ts:1082](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1082)

## Extends

- `Partial`\<`Omit`\<[`ScheduleObject`](ScheduleObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L997)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1004](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1004)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`ScheduleCommon`](ScheduleCommon.md)\>

Defined in: [types-dev/objects.d.ts:1083](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1083)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1003)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1005)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1001](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1001)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1010)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1008](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1008)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"schedule"`

Defined in: [types-dev/objects.d.ts:1078](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1078)

#### Inherited from

[`ScheduleObject`](ScheduleObject.md).[`type`](ScheduleObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L1007)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
