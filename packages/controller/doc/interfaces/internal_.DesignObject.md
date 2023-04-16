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

[types-dev/objects.d.ts:740](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L740)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Omit.acl

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L595)

___

### common

• `Optional` **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Defined in

[types-dev/objects.d.ts:742](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L742)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Omit.enums

#### Defined in

[types-dev/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L594)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Omit.from

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L596)

___

### language

• **language**: ``"javascript"``

#### Defined in

[types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L741)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

Omit.native

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L592)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Omit.ts

#### Defined in

[types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L599)

___

### type

• **type**: ``"design"``

#### Overrides

Omit.type

#### Defined in

[types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L739)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Omit.user

#### Defined in

[types-dev/objects.d.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L598)

___

### views

• **views**: `Record`<`string`, { `map`: `string`  }\>

#### Defined in

[types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/c507341d/packages/types-dev/objects.d.ts#L743)
