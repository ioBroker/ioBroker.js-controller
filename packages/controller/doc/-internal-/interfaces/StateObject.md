[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateObject

# Interface: StateObject

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `string`

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:910](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L910)

***

### acl?

> `optional` **acl**: [`StateACL`](StateACL.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:929](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L929)

***

### common

> **common**: [`StateCommon`](StateCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:928](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L928)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L916)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L918)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L914)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L923)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L921)

***

### type

> **type**: `"state"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:927](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L927)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/objects.d.ts#L920)
