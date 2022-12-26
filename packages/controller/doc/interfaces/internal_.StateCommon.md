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
- [habpanel](internal_.StateCommon.md#habpanel)
- [history](internal_.StateCommon.md#history)
- [icon](internal_.StateCommon.md#icon)
- [material](internal_.StateCommon.md#material)
- [max](internal_.StateCommon.md#max)
- [min](internal_.StateCommon.md#min)
- [mobile](internal_.StateCommon.md#mobile)
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

[types/objects.d.ts:197](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L197)

___

### custom

• `Optional` **custom**: `Record`<`string`, `any`\>

Custom settings for this state

#### Defined in

[types/objects.d.ts:238](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L238)

___

### def

• `Optional` **def**: `any`

the default value

#### Defined in

[types/objects.d.ts:192](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L192)

___

### defAck

• `Optional` **defAck**: `boolean`

the default status of the ack flag

#### Defined in

[types/objects.d.ts:194](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L194)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

description of this state

#### Defined in

[types/objects.d.ts:182](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L182)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types/objects.d.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L157)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types/objects.d.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L160)

___

### habpanel

• `Optional` **habpanel**: `any`

Custom defined properties for backward compatibility of habpanel adapter

#### Defined in

[types/objects.d.ts:244](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L244)

___

### history

• `Optional` **history**: `any`

attached history information

#### Defined in

[types/objects.d.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L235)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types/objects.d.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L165)

___

### material

• `Optional` **material**: `any`

Custom defined properties for backward compatibility of material adapter

#### Defined in

[types/objects.d.ts:241](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L241)

___

### max

• `Optional` **max**: `number`

maximum value

#### Defined in

[types/objects.d.ts:176](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L176)

___

### min

• `Optional` **min**: `number`

minimum value

#### Defined in

[types/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L174)

___

### mobile

• `Optional` **mobile**: `any`

Custom defined properties for backward compatibility of habpanel adapter

#### Defined in

[types/objects.d.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L247)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types/objects.d.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L154)

___

### read

• **read**: `boolean`

if this state is readable

#### Defined in

[types/objects.d.ts:185](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L185)

___

### role

• **role**: `string`

role of the state (used in user interfaces to indicate which widget to choose)

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types/objects.d.ts:189](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L189)

___

### smartName

• `Optional` **smartName**: `string` \| { `de`: `undefined` \| `string` ; `en`: `undefined` \| `string` ; `es`: `undefined` \| `string` ; `fr`: `undefined` \| `string` ; `it`: `undefined` \| `string` ; `nl`: `undefined` \| `string` ; `pl`: `undefined` \| `string` ; `pt`: `undefined` \| `string` ; `ru`: `undefined` \| `string` ; `zh-cn`: `undefined` \| `string`  } & { `byOn?`: ``null`` \| `string` ; `smartType?`: ``null`` \| `string`  }

Settings for IOT adapters and how the state should be named in e.g. Alexa.
The string "ignore" is a special case, causing the state to be ignored.

#### Defined in

[types/objects.d.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L253)

___

### states

• `Optional` **states**: `string` \| `string`[] \| `Record`<`string`, `string`\>

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

[types/objects.d.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L229)

___

### step

• `Optional` **step**: `number`

allowed interval for numeric values

#### Defined in

[types/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L178)

___

### type

• `Optional` **type**: [`CommonType`](../modules/internal_.md#commontype)

Type of this state. See https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole for a detailed description

#### Defined in

[types/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L172)

___

### unit

• `Optional` **unit**: `string`

unit of the value

#### Defined in

[types/objects.d.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L180)

___

### workingID

• `Optional` **workingID**: `string`

ID of a helper state indicating if the handler of this state is working

#### Defined in

[types/objects.d.ts:232](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L232)

___

### write

• **write**: `boolean`

if this state is writable

#### Defined in

[types/objects.d.ts:187](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/objects.d.ts#L187)
