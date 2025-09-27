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

[types-dev/objects.d.ts:952](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L952)

***

### acl?

> `optional` **acl**: `Partial`\<[`StateACL`](StateACL.md)\>

#### Defined in

[types-dev/objects.d.ts:976](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L976)

***

### common?

> `optional` **common**: `Partial`\<[`StateCommon`](StateCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:975](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L975)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:958](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L958)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L960)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L956)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L965)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L963)

***

### type?

> `optional` **type**: `"state"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L969)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:962](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L962)
