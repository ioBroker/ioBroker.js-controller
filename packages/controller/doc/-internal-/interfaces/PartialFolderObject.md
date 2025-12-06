[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialFolderObject

# Interface: PartialFolderObject

## Extends

- `Partial`\<`Omit`\<[`FolderObject`](FolderObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: `string`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:959](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L959)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L966)

***

### common?

> `optional` **common**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1011](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L1011)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L967)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L963)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L972)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L970)

***

### type?

> `optional` **type**: `"folder"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L1005)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L969)
