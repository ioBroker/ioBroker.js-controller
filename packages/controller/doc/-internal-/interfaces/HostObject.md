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

[types-dev/objects.d.ts:1182](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L1182)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:962](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L962)

***

### common

> **common**: [`HostCommon`](HostCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1184](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L1184)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L961)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L963)

***

### native

> **native**: [`HostNative`](HostNative.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L1185)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:968](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L968)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L966)

***

### type

> **type**: `"host"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1183](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L1183)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/036be02247b6f3256fd323eea857c12e94fac3f3/packages/types-dev/objects.d.ts#L965)
