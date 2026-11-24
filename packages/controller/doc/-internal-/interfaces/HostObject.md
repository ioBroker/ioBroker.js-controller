[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / HostObject

# Interface: HostObject

Defined in: [types-dev/objects.d.ts:1355](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1355)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.host.${string}` ``

Defined in: [types-dev/objects.d.ts:1356](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1356)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1093)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`HostCommon`](HostCommon.md)

Defined in: [types-dev/objects.d.ts:1358](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1358)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1092)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native

> **native**: [`HostNative`](HostNative.md)

Defined in: [types-dev/objects.d.ts:1359](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1359)

#### Overrides

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1099)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1097](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1097)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"host"`

Defined in: [types-dev/objects.d.ts:1357](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1357)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1096)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
