[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / StateCommon

# Interface: StateCommon

[\<internal\>](../modules/internal_.md).StateCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`StateCommon`**

## Table of contents

### Properties

- [alias](internal_.StateCommon.md#alias)
- [color](internal_.StateCommon.md#color)
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
| `id` | `string` \| \{ `read`: `string` ; `write`: `string`  } | The target state id |
| `read?` | `string` | An optional conversion function when reading, e.g. `"(val − 32) * 5/9"` |
| `write?` | `string` | An optional conversion function when reading, e.g. `"(val * 9/5) + 32"` |

#### Defined in

[types-dev/objects.d.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L213)

___

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[color](internal_.ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L178)

___

### custom

• `Optional` **custom**: `Record`\<`string`, `any`\>

Custom settings for this state

#### Defined in

[types-dev/objects.d.ts:254](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L254)

___

### def

• `Optional` **def**: `any`

the default value

#### Defined in

[types-dev/objects.d.ts:208](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L208)

___

### defAck

• `Optional` **defAck**: `boolean`

the default status of the ack flag

#### Defined in

[types-dev/objects.d.ts:210](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L210)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L170)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L173)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:176](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L176)

___

### habpanel

• `Optional` **habpanel**: `any`

Custom defined properties for backward compatibility of habpanel adapter

#### Defined in

[types-dev/objects.d.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L260)

___

### history

• `Optional` **history**: `any`

attached history information

#### Defined in

[types-dev/objects.d.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L251)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L183)

___

### material

• `Optional` **material**: `any`

Custom defined properties for backward compatibility of material adapter

#### Defined in

[types-dev/objects.d.ts:257](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L257)

___

### max

• `Optional` **max**: `number`

maximum value

#### Defined in

[types-dev/objects.d.ts:194](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L194)

___

### min

• `Optional` **min**: `number`

minimum value

#### Defined in

[types-dev/objects.d.ts:192](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L192)

___

### mobile

• `Optional` **mobile**: `any`

Custom defined properties for backward compatibility of habpanel adapter

#### Defined in

[types-dev/objects.d.ts:263](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L263)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L167)

___

### read

• **read**: `boolean`

if this state is readable

#### Defined in

[types-dev/objects.d.ts:201](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L201)

___

### role

• **role**: `string`

role of the state (used in user interfaces to indicate which widget to choose)

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L205)

___

### smartName

• `Optional` **smartName**: ``null`` \| `string` \| \{ `de`: `undefined` \| `string` ; `en`: `undefined` \| `string` ; `es`: `undefined` \| `string` ; `fr`: `undefined` \| `string` ; `it`: `undefined` \| `string` ; `nl`: `undefined` \| `string` ; `pl`: `undefined` \| `string` ; `pt`: `undefined` \| `string` ; `ru`: `undefined` \| `string` ; `uk`: `undefined` \| `string` ; `zh-cn`: `undefined` \| `string`  } & \{ `byOn?`: ``null`` \| `string` ; `smartType?`: ``null`` \| `string`  }

Settings for IOT adapters and how the state should be named in e.g., Alexa.
The string "ignore" is a special case, causing the state to be ignored.
A value of `null` means, that the device should be removed by the IOT adapters

#### Defined in

[types-dev/objects.d.ts:270](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L270)

___

### states

• `Optional` **states**: `string` \| `string`[] \| `Record`\<`string`, `string`\>

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

[types-dev/objects.d.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L245)

___

### step

• `Optional` **step**: `number`

allowed interval for numeric values

#### Defined in

[types-dev/objects.d.ts:196](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L196)

___

### type

• **type**: [`CommonType`](../modules/internal_.md#commontype)

Type of this state. See https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole for a detailed description

#### Defined in

[types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L190)

___

### unit

• `Optional` **unit**: `string`

unit of the value

#### Defined in

[types-dev/objects.d.ts:198](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L198)

___

### workingID

• `Optional` **workingID**: `string`

ID of a helper state indicating if the handler of this state is working

#### Defined in

[types-dev/objects.d.ts:248](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L248)

___

### write

• **write**: `boolean`

if this state is writable

#### Defined in

[types-dev/objects.d.ts:203](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L203)
