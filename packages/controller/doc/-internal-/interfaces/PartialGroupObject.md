[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialGroupObject

# Interface: PartialGroupObject

## Extends

- `Partial`\<`Omit`\<[`GroupObject`](GroupObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: \`system.group.$\{string\}\`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:1233](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1233)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L966)

***

### common?

> `optional` **common**: `Partial`\<[`GroupCommon`](GroupCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1239](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1239)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L967)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L963)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L972)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L970)

***

### type?

> `optional` **type**: `"group"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1234](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1234)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L969)
