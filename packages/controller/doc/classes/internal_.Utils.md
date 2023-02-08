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

Utils for internal adapter.js usage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objects` | `any` | Objects DB |
| `states` | `any` | States DB |
| `namespaceLog` | `string` | Log prefix |
| `logger` | `any` | Logger instance |
| `namespace` | `string` | the namespace of the adapter |
| `namespaceRegExp` | `RegExp` | the namespace RegExp of the adapter adapter.0 |

#### Defined in

[adapter/src/lib/adapter/utils.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L37)

## Methods

### fixId

▸ **fixId**(`id`, `isPattern?`): `string`

Adds the namespace to the id if it is missing, if an object is passed it will be converted to an id string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | `undefined` | id which will be fixed |
| `isPattern` | `boolean` | `false` | if the id is a pattern |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/utils.ts:354](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L354)

___

### performStrictObjectCheck

▸ **performStrictObjectCheck**(`id`, `state`): `Promise`<`void`\>

Performs the strict object check, which includes checking object existence, read-only logic, type and min/max
additionally it rounds state values whose objects have a common.step attribute defined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the state |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) | ioBroker setState object |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/utils.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L60)

___

### validateId

▸ **validateId**(`id`, `isForeignId`, `options?`): asserts id is string

Checks if a passed ID is valid. Throws an error if id is invalid

**`Throws`**

Error when id is invalid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `any` | id to check or object with properties device, channel and state |
| `isForeignId` | `boolean` | true&false if the ID is a foreign/full ID or only an "adapter local" id |
| `options?` | ``null`` \| [`ValidateIdOptions`](../interfaces/internal_.ValidateIdOptions.md) | optional |

#### Returns

asserts id is string

#### Defined in

[adapter/src/lib/adapter/utils.ts:163](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L163)

___

### validateSetStateObjectArgument

▸ **validateSetStateObjectArgument**(`obj`): `void`

Validates the object-type argument that is passed to setState

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Record`<`string`, `any`\> | object to validate |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/utils.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L385)

___

### assertBoolean

▸ `Static` **assertBoolean**(`value`, `name`): asserts value is boolean

Throws if type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is boolean

#### Defined in

[adapter/src/lib/adapter/utils.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L279)

___

### assertBuffer

▸ `Static` **assertBuffer**(`value`, `name`): asserts value is Buffer

Throws if type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Buffer

#### Defined in

[adapter/src/lib/adapter/utils.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L316)

___

### assertCallback

▸ `Static` **assertCallback**(`value`, `name`): asserts value is Callback

Throws if type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Callback

#### Defined in

[adapter/src/lib/adapter/utils.ts:340](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L340)

___

### assertNumber

▸ `Static` **assertNumber**(`value`, `name`): asserts value is number

Throws if type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is number

#### Defined in

[adapter/src/lib/adapter/utils.ts:292](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L292)

___

### assertObject

▸ `Static` **assertObject**(`value`, `name`): asserts value is Record<string, any\>

Throws if type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Record<string, any\>

#### Defined in

[adapter/src/lib/adapter/utils.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L305)

___

### assertOptionalCallback

▸ `Static` **assertOptionalCallback**(`value`, `name`): asserts value is OptionalCallback

Throws if type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is OptionalCallback

#### Defined in

[adapter/src/lib/adapter/utils.ts:327](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L327)

___

### assertPattern

▸ `Static` **assertPattern**(`value`, `name`): asserts value is Pattern

Throws if type is not a pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Pattern

#### Defined in

[adapter/src/lib/adapter/utils.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L258)

___

### assertString

▸ `Static` **assertString**(`value`, `name`): asserts value is string

Throws if type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is string

#### Defined in

[adapter/src/lib/adapter/utils.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L245)

___

### getErrorText

▸ `Static` **getErrorText**(`code`): `string`

Look up the error description for an error code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `number` | error code |

#### Returns

`string`

error description

#### Defined in

[adapter/src/lib/adapter/utils.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/adapter/src/lib/adapter/utils.ts#L235)
