[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialEnumObject

# Interface: PartialEnumObject

## Extends

- `Partial`\<`Omit`\<[`EnumObject`](EnumObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: `string`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:950](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L950)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:957](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L957)

***

### common?

> `optional` **common**: `Partial`\<[`EnumCommon`](EnumCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1011](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1011)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L956)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:958](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L958)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:954](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L954)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L963)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L961)

***

### type?

> `optional` **type**: `"enum"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1006)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L960)
