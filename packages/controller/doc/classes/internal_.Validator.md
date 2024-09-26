[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / Validator

# Class: Validator

[\<internal\>](../modules/internal_.md).Validator

## Table of contents

### Constructors

- [constructor](internal_.Validator.md#constructor)

### Methods

- [fixId](internal_.Validator.md#fixid)
- [performStrictObjectCheck](internal_.Validator.md#performstrictobjectcheck)
- [validateId](internal_.Validator.md#validateid)
- [validateSetStateObjectArgument](internal_.Validator.md#validatesetstateobjectargument)
- [assertBoolean](internal_.Validator.md#assertboolean)
- [assertBuffer](internal_.Validator.md#assertbuffer)
- [assertCallback](internal_.Validator.md#assertcallback)
- [assertNumber](internal_.Validator.md#assertnumber)
- [assertObject](internal_.Validator.md#assertobject)
- [assertOptionalCallback](internal_.Validator.md#assertoptionalcallback)
- [assertPattern](internal_.Validator.md#assertpattern)
- [assertString](internal_.Validator.md#assertstring)
- [assertTimeout](internal_.Validator.md#asserttimeout)
- [getErrorText](internal_.Validator.md#geterrortext)

## Constructors

### constructor

• **new Validator**(`objects`, `states`, `namespaceLog`, `logger`, `namespace`, `namespaceRegExp`): [`Validator`](internal_.Validator.md)

Validator for internal adapter.js usage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objects` | `any` | Objects DB |
| `states` | `any` | States DB |
| `namespaceLog` | `string` | Log prefix |
| `logger` | `any` | Logger instance |
| `namespace` | `string` | the namespace of the adapter |
| `namespaceRegExp` | `RegExp` | the namespace RegExp of the adapter `adapter.0` |

#### Returns

[`Validator`](internal_.Validator.md)

#### Defined in

[adapter/src/lib/adapter/validator.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L33)

## Methods

### fixId

▸ **fixId**(`id`, `isPattern?`): `string`

Adds the namespace to the ID if it is missing, if an object is passed it will be converted to an id string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | `undefined` | id which will be fixed |
| `isPattern` | `boolean` | `false` | if the id is a pattern |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/validator.ts:355](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L355)

___

### performStrictObjectCheck

▸ **performStrictObjectCheck**(`id`, `state`): `Promise`\<`void`\>

Performs the strict object check, which includes checking object existence, read-only logic, type and min/max
additionally it rounds state values whose objects have a `common.step` attribute defined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the state |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) | ioBroker setState object |

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/validator.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L56)

___

### validateId

▸ **validateId**(`id`, `isForeignId`, `options?`): asserts id is string

Checks if a passed ID is valid. Throws an error if id is invalid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `any` | id to check or object with properties device, channel and state |
| `isForeignId` | `boolean` | true&false if the ID is a foreign/full ID or only an "adapter local" id |
| `options?` | ``null`` \| [`ValidateIdOptions`](../interfaces/internal_.ValidateIdOptions.md) | optional |

#### Returns

asserts id is string

**`Throws`**

Error when id is invalid

#### Defined in

[adapter/src/lib/adapter/validator.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L153)

___

### validateSetStateObjectArgument

▸ **validateSetStateObjectArgument**(`obj`): `void`

Validates the object-type argument that is passed to setState

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Record`\<`string`, `any`\> | object to validate |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/validator.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L387)

___

### assertBoolean

▸ **assertBoolean**(`value`, `name`): asserts value is boolean

Throws if a type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is boolean

#### Defined in

[adapter/src/lib/adapter/validator.ts:272](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L272)

___

### assertBuffer

▸ **assertBuffer**(`value`, `name`): asserts value is Buffer

Throws if a type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Buffer

#### Defined in

[adapter/src/lib/adapter/validator.ts:315](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L315)

___

### assertCallback

▸ **assertCallback**(`value`, `name`): asserts value is Callback

Throws if a type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Callback

#### Defined in

[adapter/src/lib/adapter/validator.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L341)

___

### assertNumber

▸ **assertNumber**(`value`, `name`): asserts value is number

Throws if a type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is number

#### Defined in

[adapter/src/lib/adapter/validator.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L286)

___

### assertObject

▸ **assertObject**\<`T`\>(`value`, `name`): asserts value is T

Throws if a type is not matching the expected type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is T

#### Defined in

[adapter/src/lib/adapter/validator.ts:300](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L300)

___

### assertOptionalCallback

▸ **assertOptionalCallback**(`value`, `name`): asserts value is OptionalCallback

Throws if a type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is OptionalCallback

#### Defined in

[adapter/src/lib/adapter/validator.ts:327](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L327)

___

### assertPattern

▸ **assertPattern**(`value`, `name`): asserts value is Pattern

Throws if a type is not a pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Pattern

#### Defined in

[adapter/src/lib/adapter/validator.ts:250](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L250)

___

### assertString

▸ **assertString**(`value`, `name`): asserts value is string

Throws if a type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is string

#### Defined in

[adapter/src/lib/adapter/validator.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L236)

___

### assertTimeout

▸ **assertTimeout**(`ms`): `void`

Validates that the timeout is not exceeding a 32-bit signed integer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | milliseconds to validate |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/validator.ts:447](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L447)

___

### getErrorText

▸ **getErrorText**(`code`): `string`

Look up the error description for an error code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `number` | error code |

#### Returns

`string`

error description

#### Defined in

[adapter/src/lib/adapter/validator.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L225)
