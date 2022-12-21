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

• **\_id**: `string`

The ID of this object

#### Inherited from

Omit.\_id

#### Defined in

[types/objects.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L554)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Omit.acl

#### Defined in

[types/objects.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L561)

___

### common

• `Optional` **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Defined in

[types/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L684)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Omit.enums

#### Defined in

[types/objects.d.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L560)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Omit.from

#### Defined in

[types/objects.d.ts:562](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L562)

___

### language

• **language**: ``"javascript"``

#### Defined in

[types/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L683)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

Omit.native

#### Defined in

[types/objects.d.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L558)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Omit.ts

#### Defined in

[types/objects.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L565)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Inherited from

Omit.type

#### Defined in

[types/objects.d.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L555)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Omit.user

#### Defined in

[types/objects.d.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L564)

___

### views

• **views**: `Record`<`string`, { `map`: `string`  }\>

#### Defined in

[types/objects.d.ts:685](https://github.com/ioBroker/ioBroker.js-controller/blob/931c925a/packages/types/objects.d.ts#L685)
