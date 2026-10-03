[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialDesignObject

# Interface: PartialDesignObject

Defined in: [types-dev/objects.d.ts:1308](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1308)

## Extends

- `Partial`\<`Omit`\<[`DesignObject`](DesignObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1302](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1302)

The ID of this object

#### Inherited from

[`DesignObject`](DesignObject.md).[`_id`](DesignObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:996](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L996)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

Defined in: [types-dev/objects.d.ts:1309](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1309)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L997)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### language?

> `optional` **language?**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1303](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1303)

#### Inherited from

[`DesignObject`](DesignObject.md).[`language`](DesignObject.md#language)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1002](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1002)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1000)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"design"`

Defined in: [types-dev/objects.d.ts:1301](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1301)

#### Inherited from

[`DesignObject`](DesignObject.md).[`type`](DesignObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:999](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L999)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views?

> `optional` **views?**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1305](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1305)

#### Inherited from

`Partial.views`
