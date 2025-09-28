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

[types-dev/objects.d.ts:1243](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L1243)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:962](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L962)

***

### common?

> `optional` **common**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1250](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L1250)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L961)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L963)

***

### language?

> `optional` **language**: `"javascript"`

#### Inherited from

`Partial.language`

#### Defined in

[types-dev/objects.d.ts:1244](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L1244)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:959](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L959)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:968](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L968)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L966)

***

### type?

> `optional` **type**: `"design"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1242](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L1242)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L965)

***

### views?

> `optional` **views**: `Record`\<`string`, `object`\>

#### Inherited from

`Partial.views`

#### Defined in

[types-dev/objects.d.ts:1246](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L1246)
