[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialScriptObject

# Interface: PartialScriptObject

## Extends

- `Partial`\<`Omit`\<[`ScriptObject`](ScriptObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: `string`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:901](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L901)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:908](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L908)

***

### common?

> `optional` **common**: `Partial`\<[`ScriptCommon`](ScriptCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1163](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L1163)

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

> `optional` **type**: `"script"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1158](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L1158)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L911)
