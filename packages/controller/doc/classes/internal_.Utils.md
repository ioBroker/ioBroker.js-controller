[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Utils

# Class: Utils

[<internal>](../modules/internal_.md).Utils

## Table of contents

### Constructors

- [constructor](internal_.Utils.md#constructor)

### Methods

- [fixId](internal_.Utils.md#fixid)
- [performStrictObjectCheck](internal_.Utils.md#performstrictobjectcheck)
- [validateId](internal_.Utils.md#validateid)
- [validateSetStateObjectArgument](internal_.Utils.md#validatesetstateobjectargument)
- [assertBoolean](internal_.Utils.md#assertboolean)
- [assertBuffer](internal_.Utils.md#assertbuffer)
- [assertCallback](internal_.Utils.md#assertcallback)
- [assertNumber](internal_.Utils.md#assertnumber)
- [assertObject](internal_.Utils.md#assertobject)
- [assertOptionalCallback](internal_.Utils.md#assertoptionalcallback)
- [assertPattern](internal_.Utils.md#assertpattern)
- [assertString](internal_.Utils.md#assertstring)
- [getErrorText](internal_.Utils.md#geterrortext)

## Constructors

### constructor

• **new Utils**(`objects`, `states`, `namespaceLog`, `logger`, `namespace`, `namespaceRegExp`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objects` | `any` |  |
| `states` | `any` |  |
| `namespaceLog` | `string` |  |
| `logger` | `any` |  |
| `namespace` | `string` |  |
| `namespaceRegExp` | `RegExp` |  |

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L37)

## Methods

### fixId

▸ **fixId**(`id`, `isPattern?`): [`ID`](../modules/internal_.md#id)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | `undefined` |  |
| `isPattern` | `boolean` | `false` |  |

#### Returns

[`ID`](../modules/internal_.md#id)

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:354](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L354)

___

### performStrictObjectCheck

▸ **performStrictObjectCheck**(`id`, `state`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L60)

___

### validateId

▸ **validateId**(`id`, `isForeignId`, `options`): asserts id is ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `any` |  |
| `isForeignId` | `boolean` |  |
| `options` | `any` |  |

#### Returns

asserts id is ID

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:163](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L163)

___

### validateSetStateObjectArgument

▸ **validateSetStateObjectArgument**(`obj`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L385)

___

### assertBoolean

▸ `Static` **assertBoolean**(`value`, `name`): asserts value is boolean

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` |  |
| `name` | `string` |  |

#### Returns

asserts value is boolean

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L279)

___

### assertBuffer

▸ `Static` **assertBuffer**(`value`, `name`): asserts value is Buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` |  |
| `name` | `string` |  |

#### Returns

asserts value is Buffer

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L316)

___

### assertCallback

▸ `Static` **assertCallback**(`value`, `name`): asserts value is Callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` |  |
| `name` | `string` |  |

#### Returns

asserts value is Callback

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:340](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L340)

___

### assertNumber

▸ `Static` **assertNumber**(`value`, `name`): asserts value is number

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` |  |
| `name` | `string` |  |

#### Returns

asserts value is number

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:292](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L292)

___

### assertObject

▸ `Static` **assertObject**(`value`, `name`): asserts value is Record<string, any\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` |  |
| `name` | `string` |  |

#### Returns

asserts value is Record<string, any\>

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L305)

___

### assertOptionalCallback

▸ `Static` **assertOptionalCallback**(`value`, `name`): asserts value is OptionalCallback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` |  |
| `name` | `string` |  |

#### Returns

asserts value is OptionalCallback

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:327](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L327)

___

### assertPattern

▸ `Static` **assertPattern**(`value`, `name`): asserts value is Pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` |  |
| `name` | `string` |  |

#### Returns

asserts value is Pattern

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L258)

___

### assertString

▸ `Static` **assertString**(`value`, `name`): asserts value is string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` |  |
| `name` | `string` |  |

#### Returns

asserts value is string

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L245)

___

### getErrorText

▸ `Static` **getErrorText**(`code`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `number` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/a1d9b783/packages/adapter/src/lib/adapter/utils.ts#L235)
