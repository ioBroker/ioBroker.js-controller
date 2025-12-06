[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DesignObject

# Interface: DesignObject

## Extends

- `Omit`\<[`BaseObject`](BaseObject.md), `"common"`\>

## Properties

### \_id

> **\_id**: \`\_design/$\{string\}\`

The ID of this object

#### Overrides

`Omit._id`

#### Defined in

[types-dev/objects.d.ts:1272](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1272)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Omit.acl`

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L966)

***

### common?

> `optional` **common**: [`OtherCommon`](OtherCommon.md)

#### Defined in

[types-dev/objects.d.ts:1274](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1274)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Omit.enums`

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Omit.from`

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L967)

***

### language

> **language**: `"javascript"`

#### Defined in

[types-dev/objects.d.ts:1273](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1273)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Omit.native`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L963)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Omit.nonEdit`

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L972)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Omit.ts`

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L970)

***

### type

> **type**: `"design"`

#### Overrides

`Omit.type`

#### Defined in

[types-dev/objects.d.ts:1271](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1271)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Omit.user`

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L969)

***

### views

> **views**: `Record`\<`string`, `object`\>

#### Defined in

[types-dev/objects.d.ts:1275](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1275)
