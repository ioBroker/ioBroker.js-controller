[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / DesignObject

# Interface: DesignObject

[<internal>](../modules/internal_.md).DesignObject

## Hierarchy

- `Omit`<[`BaseObject`](internal_.BaseObject.md), ``"common"``\>

  ↳ **`DesignObject`**

## Table of contents

### Properties

- [\_id](internal_.DesignObject.md#_id)
- [acl](internal_.DesignObject.md#acl)
- [common](internal_.DesignObject.md#common)
- [enums](internal_.DesignObject.md#enums)
- [from](internal_.DesignObject.md#from)
- [language](internal_.DesignObject.md#language)
- [native](internal_.DesignObject.md#native)
- [nonEdit](internal_.DesignObject.md#nonedit)
- [ts](internal_.DesignObject.md#ts)
- [type](internal_.DesignObject.md#type)
- [user](internal_.DesignObject.md#user)
- [views](internal_.DesignObject.md#views)

## Properties

### \_id

• **\_id**: \`\_design/${string}\`

#### Overrides

Omit.\_id

#### Defined in

[types-dev/objects.d.ts:846](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L846)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Omit.acl

#### Defined in

[types-dev/objects.d.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L672)

___

### common

• `Optional` **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Defined in

[types-dev/objects.d.ts:848](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L848)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Omit.enums

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L671)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Omit.from

#### Defined in

[types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L673)

___

### language

• **language**: ``"javascript"``

#### Defined in

[types-dev/objects.d.ts:847](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L847)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

Omit.native

#### Defined in

[types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L669)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Omit.nonEdit

#### Defined in

[types-dev/objects.d.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L678)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Omit.ts

#### Defined in

[types-dev/objects.d.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L676)

___

### type

• **type**: ``"design"``

#### Overrides

Omit.type

#### Defined in

[types-dev/objects.d.ts:845](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L845)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Omit.user

#### Defined in

[types-dev/objects.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L675)

___

### views

• **views**: `Record`<`string`, { `map`: `string`  }\>

#### Defined in

[types-dev/objects.d.ts:849](https://github.com/ioBroker/ioBroker.js-controller/blob/0ce62b24/packages/types-dev/objects.d.ts#L849)
