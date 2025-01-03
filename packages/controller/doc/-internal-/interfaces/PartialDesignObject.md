[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialDesignObject

# Interface: PartialDesignObject

## Extends

- `Partial`\<`Omit`\<[`DesignObject`](DesignObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: \`\_design/$\{string\}\`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:1196](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L1196)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:917](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L917)

***

### common?

> `optional` **common**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1203](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L1203)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L916)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L918)

***

### language?

> `optional` **language**: `"javascript"`

#### Inherited from

`Partial.language`

#### Defined in

[types-dev/objects.d.ts:1197](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L1197)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L914)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L923)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L921)

***

### type?

> `optional` **type**: `"design"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1195](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L1195)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L920)

***

### views?

> `optional` **views**: `Record`\<`string`, `object`\>

#### Inherited from

`Partial.views`

#### Defined in

[types-dev/objects.d.ts:1199](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L1199)
