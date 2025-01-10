[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialOtherObject

# Interface: PartialOtherObject

## Extends

- `Partial`\<`Omit`\<[`OtherObject`](OtherObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: `string`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:910](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L910)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:917](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L917)

***

### common?

> `optional` **common**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1190](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L1190)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L916)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L918)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L914)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L923)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L921)

***

### type?

> `optional` **type**: `"config"` \| `"chart"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L1185)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L920)
