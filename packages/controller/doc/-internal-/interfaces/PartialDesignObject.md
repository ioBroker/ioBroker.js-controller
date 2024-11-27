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

[types-dev/objects.d.ts:1187](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1187)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:908](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L908)

***

### common?

> `optional` **common**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1194](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1194)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:907](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L907)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:909](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L909)

***

### language?

> `optional` **language**: `"javascript"`

#### Inherited from

`Partial.language`

#### Defined in

[types-dev/objects.d.ts:1188](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1188)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L905)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L914)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:912](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L912)

***

### type?

> `optional` **type**: `"design"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1186](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1186)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L911)

***

### views?

> `optional` **views**: `Record`\<`string`, `object`\>

#### Inherited from

`Partial.views`

#### Defined in

[types-dev/objects.d.ts:1190](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1190)
