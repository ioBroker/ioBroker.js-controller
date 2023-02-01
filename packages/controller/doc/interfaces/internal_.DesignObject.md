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

[types/objects.d.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L703)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Omit.acl

#### Defined in

[types/objects.d.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L576)

___

### common

• `Optional` **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Defined in

[types/objects.d.ts:705](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L705)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Omit.enums

#### Defined in

[types/objects.d.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L575)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Omit.from

#### Defined in

[types/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L577)

___

### language

• **language**: ``"javascript"``

#### Defined in

[types/objects.d.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L704)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

Omit.native

#### Defined in

[types/objects.d.ts:573](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L573)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Omit.ts

#### Defined in

[types/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L580)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Inherited from

Omit.type

#### Defined in

[types/objects.d.ts:570](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L570)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Omit.user

#### Defined in

[types/objects.d.ts:579](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L579)

___

### views

• **views**: `Record`<`string`, { `map`: `string`  }\>

#### Defined in

[types/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L706)
