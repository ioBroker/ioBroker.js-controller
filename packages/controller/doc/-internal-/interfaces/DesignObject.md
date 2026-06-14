[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DesignObject

# Interface: DesignObject

Defined in: [types-dev/objects.d.ts:1297](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L1297)

## Extends

- `Omit`\<[`BaseObject`](BaseObject.md), `"common"`\>

## Properties

### \_id

> **\_id**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1300](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L1300)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L994)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: [`OtherCommon`](OtherCommon.md)

Defined in: [types-dev/objects.d.ts:1302](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L1302)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### language

> **language**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1301](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L1301)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L991)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L1000)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L998)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"design"`

Defined in: [types-dev/objects.d.ts:1299](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L1299)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views

> **views**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1303](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/objects.d.ts#L1303)
