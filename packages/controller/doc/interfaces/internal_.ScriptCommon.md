[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ScriptCommon

# Interface: ScriptCommon

[<internal>](../modules/internal_.md).ScriptCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`ScriptCommon`**

## Table of contents

### Properties

- [compiled](internal_.ScriptCommon.md#compiled)
- [custom](internal_.ScriptCommon.md#custom)
- [debug](internal_.ScriptCommon.md#debug)
- [declarations](internal_.ScriptCommon.md#declarations)
- [dontDelete](internal_.ScriptCommon.md#dontdelete)
- [enabled](internal_.ScriptCommon.md#enabled)
- [engine](internal_.ScriptCommon.md#engine)
- [engineType](internal_.ScriptCommon.md#enginetype)
- [expert](internal_.ScriptCommon.md#expert)
- [icon](internal_.ScriptCommon.md#icon)
- [name](internal_.ScriptCommon.md#name)
- [role](internal_.ScriptCommon.md#role)
- [source](internal_.ScriptCommon.md#source)
- [sourceHash](internal_.ScriptCommon.md#sourcehash)
- [verbose](internal_.ScriptCommon.md#verbose)

## Properties

### compiled

• `Optional` **compiled**: `string`

If the script uses a compiled language like TypeScript, this contains the compilation output

#### Defined in

[types-dev/objects.d.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L424)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:429](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L429)

___

### debug

• **debug**: `boolean`

#### Defined in

[types-dev/objects.d.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L417)

___

### declarations

• `Optional` **declarations**: `string`

If the script uses a compiled language like TypeScript, this contains the generated declarations (global scripts only)

#### Defined in

[types-dev/objects.d.ts:426](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L426)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L159)

___

### enabled

• **enabled**: `boolean`

Whether this script should be executed

#### Defined in

[types-dev/objects.d.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L420)

___

### engine

• **engine**: `string`

The instance id of the instance which executes this script

#### Defined in

[types-dev/objects.d.ts:414](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L414)

___

### engineType

• **engineType**: `string`

Defines the type of the script, e.g. TypeScript/ts, JavaScript/js or Blockly

#### Defined in

[types-dev/objects.d.ts:412](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L412)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:162](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L162)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L167)

___

### name

• **name**: `string`

The name of this object as a simple string or an object with translations

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:410](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L410)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L169)

___

### source

• **source**: `string`

The source code of this script

#### Defined in

[types-dev/objects.d.ts:416](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L416)

___

### sourceHash

• `Optional` **sourceHash**: `string`

Is used to determine whether a script has changed and needs to be recompiled

#### Defined in

[types-dev/objects.d.ts:422](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L422)

___

### verbose

• **verbose**: `boolean`

#### Defined in

[types-dev/objects.d.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L418)
