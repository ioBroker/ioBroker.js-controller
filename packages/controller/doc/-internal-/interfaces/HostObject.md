[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / HostObject

# Interface: HostObject

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: \`system.host.$\{string\}\`

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:1135](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L1135)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:917](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L917)

***

### common

> **common**: [`HostCommon`](HostCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1137](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L1137)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L916)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L918)

***

### native

> **native**: [`HostNative`](HostNative.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:1138](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L1138)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L923)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L921)

***

### type

> **type**: `"host"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1136](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L1136)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/objects.d.ts#L920)
