[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialUserObject

# Interface: PartialUserObject

## Extends

- `Partial`\<`Omit`\<[`UserObject`](UserObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: \`system.user.$\{string\}\`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:1138](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L1138)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:908](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L908)

***

### common?

> `optional` **common**: `Partial`\<[`UserCommon`](UserCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1144](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L1144)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:907](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L907)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:909](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L909)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L905)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L914)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:912](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L912)

***

### type?

> `optional` **type**: `"user"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1139](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L1139)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L911)
