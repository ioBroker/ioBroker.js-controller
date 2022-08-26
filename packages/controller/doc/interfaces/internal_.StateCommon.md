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

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| { `read`: `string` ; `write`: `string`  } |  |
| `read?` | `string` |  |
| `write?` | `string` |  |

#### Defined in

node_modules/@types/iobroker/objects.d.ts:188

___

### custom

• `Optional` **custom**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:227

___

### def

• `Optional` **def**: `any`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:183

___

### defAck

• `Optional` **defAck**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:185

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:173

___

### dontDelete

• `Optional` **dontDelete**: ``true``

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:148

___

### expert

• `Optional` **expert**: ``true``

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:151

___

### history

• `Optional` **history**: `any`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:224

___

### icon

• `Optional` **icon**: `string`

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:156

___

### max

• `Optional` **max**: `number`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:167

___

### min

• `Optional` **min**: `number`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:165

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:145

___

### read

• **read**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:176

___

### role

• **role**: `string`

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:180

___

### smartName

• `Optional` **smartName**: `string` \| { `de`: `undefined` \| `string` ; `en`: `undefined` \| `string` ; `es`: `undefined` \| `string` ; `fr`: `undefined` \| `string` ; `it`: `undefined` \| `string` ; `nl`: `undefined` \| `string` ; `pl`: `undefined` \| `string` ; `pt`: `undefined` \| `string` ; `ru`: `undefined` \| `string` ; `zh-cn`: `undefined` \| `string`  } & { `byOn?`: ``null`` \| `string` ; `smartType?`: ``null`` \| `string`  }

#### Defined in

node_modules/@types/iobroker/objects.d.ts:233

___

### states

• `Optional` **states**: `string` \| `string`[] \| [`Record`](../modules/internal_.md#record)<`string`, `string`\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:218

___

### step

• `Optional` **step**: `number`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:169

___

### type

• `Optional` **type**: [`CommonType`](../modules/internal_.md#commontype)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:163

___

### unit

• `Optional` **unit**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:171

___

### workingID

• `Optional` **workingID**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:221

___

### write

• **write**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:178
