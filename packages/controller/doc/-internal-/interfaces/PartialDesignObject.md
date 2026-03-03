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

[types-dev/objects.d.ts:1272](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L1272)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L966)

***

### common?

> `optional` **common**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1279](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L1279)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L967)

***

### language?

> `optional` **language**: `"javascript"`

#### Inherited from

`Partial.language`

#### Defined in

[types-dev/objects.d.ts:1273](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L1273)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L963)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L972)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L970)

***

### type?

> `optional` **type**: `"design"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1271](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L1271)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L969)

***

### views?

> `optional` **views**: `Record`\<`string`, `object`\>

#### Inherited from

`Partial.views`

#### Defined in

[types-dev/objects.d.ts:1275](https://github.com/ioBroker/ioBroker.js-controller/blob/997e40b7387fd354c814a396a6ac94a6d3e21134/packages/types-dev/objects.d.ts#L1275)
