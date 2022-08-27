[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / StateCommon

# Interface: StateCommon

[<internal>](../modules/internal_.md).StateCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`StateCommon`**

## Table of contents

### Properties

- [alias](internal_.StateCommon.md#alias)
- [custom](internal_.StateCommon.md#custom)
- [def](internal_.StateCommon.md#def)
- [defAck](internal_.StateCommon.md#defack)
- [desc](internal_.StateCommon.md#desc)
- [dontDelete](internal_.StateCommon.md#dontdelete)
- [expert](internal_.StateCommon.md#expert)
- [history](internal_.StateCommon.md#history)
- [icon](internal_.StateCommon.md#icon)
- [max](internal_.StateCommon.md#max)
- [min](internal_.StateCommon.md#min)
- [name](internal_.StateCommon.md#name)
- [read](internal_.StateCommon.md#read)
- [role](internal_.StateCommon.md#role)
- [smartName](internal_.StateCommon.md#smartname)
- [states](internal_.StateCommon.md#states)
- [step](internal_.StateCommon.md#step)
- [type](internal_.StateCommon.md#type)
- [unit](internal_.StateCommon.md#unit)
- [workingID](internal_.StateCommon.md#workingid)
- [write](internal_.StateCommon.md#write)

## Properties

### alias

• `Optional` **alias**: `Object`

Configures this state as an alias for another state

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| { `read`: `string` ; `write`: `string`  } | The target state id |
| `read?` | `string` | An optional conversion function when reading, e.g. `"(val − 32) * 5/9"` |
| `write?` | `string` | An optional conversion function when reading, e.g. `"(val * 9/5) + 32"` |

#### Defined in

node_modules/@types/iobroker/objects.d.ts:188

___

### custom

• `Optional` **custom**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

Custom settings for this state

#### Defined in

node_modules/@types/iobroker/objects.d.ts:227

___

### def

• `Optional` **def**: `any`

the default value

#### Defined in

node_modules/@types/iobroker/objects.d.ts:183

___

### defAck

• `Optional` **defAck**: `boolean`

the default status of the ack flag

#### Defined in

node_modules/@types/iobroker/objects.d.ts:185

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

description of this state

#### Defined in

node_modules/@types/iobroker/objects.d.ts:173

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:148

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:151

___

### history

• `Optional` **history**: `any`

attached history information

#### Defined in

node_modules/@types/iobroker/objects.d.ts:224

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:156

___

### max

• `Optional` **max**: `number`

maximum value

#### Defined in

node_modules/@types/iobroker/objects.d.ts:167

___

### min

• `Optional` **min**: `number`

minimum value

#### Defined in

node_modules/@types/iobroker/objects.d.ts:165

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:145

___

### read

• **read**: `boolean`

if this state is readable

#### Defined in

node_modules/@types/iobroker/objects.d.ts:176

___

### role

• **role**: `string`

role of the state (used in user interfaces to indicate which widget to choose)

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:180

___

### smartName

• `Optional` **smartName**: `string` \| { `de`: `undefined` \| `string` ; `en`: `undefined` \| `string` ; `es`: `undefined` \| `string` ; `fr`: `undefined` \| `string` ; `it`: `undefined` \| `string` ; `nl`: `undefined` \| `string` ; `pl`: `undefined` \| `string` ; `pt`: `undefined` \| `string` ; `ru`: `undefined` \| `string` ; `zh-cn`: `undefined` \| `string`  } & { `byOn?`: ``null`` \| `string` ; `smartType?`: ``null`` \| `string`  }

Settings for IOT adapters and how the state should be named in e.g. Alexa.
The string "ignore" is a special case, causing the state to be ignored.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:233

___

### states

• `Optional` **states**: `string` \| `string`[] \| [`Record`](../modules/internal_.md#record)<`string`, `string`\>

Dictionary of possible values for this state in the form
```jsonc
{
    "internal value 1": "displayed value 1",
    "internal value 2": "displayed value 2",
    // ...
}
```

or as an array:
```jsonc
[ "value 1", "value 2", // ... ]
```

In old ioBroker versions, this could also be a string of the form
`"val1:text1;val2:text2"` (now deprecated)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:218

___

### step

• `Optional` **step**: `number`

allowed interval for numeric values

#### Defined in

node_modules/@types/iobroker/objects.d.ts:169

___

### type

• `Optional` **type**: [`CommonType`](../modules/internal_.md#commontype)

Type of this state. See https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole for a detailed description

#### Defined in

node_modules/@types/iobroker/objects.d.ts:163

___

### unit

• `Optional` **unit**: `string`

unit of the value

#### Defined in

node_modules/@types/iobroker/objects.d.ts:171

___

### workingID

• `Optional` **workingID**: `string`

ID of a helper state indicating if the handler of this state is working

#### Defined in

node_modules/@types/iobroker/objects.d.ts:221

___

### write

• **write**: `boolean`

if this state is writable

#### Defined in

node_modules/@types/iobroker/objects.d.ts:178
