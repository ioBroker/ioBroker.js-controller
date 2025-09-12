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

[types-dev/objects.d.ts:1236](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1236)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:957](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L957)

***

### common?

> `optional` **common**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1243](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1243)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L956)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:958](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L958)

***

### language?

> `optional` **language**: `"javascript"`

#### Inherited from

`Partial.language`

#### Defined in

[types-dev/objects.d.ts:1237](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1237)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:954](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L954)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L963)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L961)

***

### type?

> `optional` **type**: `"design"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1235](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1235)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L960)

***

### views?

> `optional` **views**: `Record`\<`string`, `object`\>

#### Inherited from

`Partial.views`

#### Defined in

[types-dev/objects.d.ts:1239](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1239)
