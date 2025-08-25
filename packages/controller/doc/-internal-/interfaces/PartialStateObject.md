[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialStateObject

# Interface: PartialStateObject

## Extends

- `Partial`\<`Omit`\<[`StateObject`](StateObject.md), `"common"` \| `"acl"`\>\>

## Properties

### \_id?

> `optional` **\_id**: `string`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:928](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L928)

***

### acl?

> `optional` **acl**: `Partial`\<[`StateACL`](StateACL.md)\>

#### Defined in

[types-dev/objects.d.ts:952](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L952)

***

### common?

> `optional` **common**: `Partial`\<[`StateCommon`](StateCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:951](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L951)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:934](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L934)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:936](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L936)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:932](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L932)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:941](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L941)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:939](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L939)

***

### type?

> `optional` **type**: `"state"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:945](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L945)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:938](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L938)
