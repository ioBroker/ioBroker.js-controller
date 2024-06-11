[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialScriptObject

# Interface: PartialScriptObject

[\<internal\>](../modules/internal_.md).PartialScriptObject

## Hierarchy

- `Partial`\<`Omit`\<[`ScriptObject`](internal_.ScriptObject.md), ``"common"``\>\>

  ↳ **`PartialScriptObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialScriptObject.md#_id)
- [acl](internal_.PartialScriptObject.md#acl)
- [common](internal_.PartialScriptObject.md#common)
- [enums](internal_.PartialScriptObject.md#enums)
- [from](internal_.PartialScriptObject.md#from)
- [native](internal_.PartialScriptObject.md#native)
- [nonEdit](internal_.PartialScriptObject.md#nonedit)
- [ts](internal_.PartialScriptObject.md#ts)
- [type](internal_.PartialScriptObject.md#type)
- [user](internal_.PartialScriptObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L826)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L833)

___

### common

• `Optional` **common**: `Partial`\<[`ScriptCommon`](internal_.ScriptCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1057](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L1057)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L834)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L839)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L837)

___

### type

• `Optional` **type**: ``"script"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:1052](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L1052)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/70d97db12b1a527812cd28f020b3dec4b1c23b61/packages/types-dev/objects.d.ts#L836)
