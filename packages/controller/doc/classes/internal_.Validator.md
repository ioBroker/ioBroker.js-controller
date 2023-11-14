[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Validator

# Class: Validator

[<internal>](../modules/internal_.md).Validator

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

• **new Validator**(`objects`, `states`, `namespaceLog`, `logger`, `namespace`, `namespaceRegExp`)

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

#### Defined in

[adapter/src/lib/adapter/validator.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L31)

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

[adapter/src/lib/adapter/validator.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L348)

___

### performStrictObjectCheck

▸ **performStrictObjectCheck**(`id`, `state`): `Promise`<`void`\>

Performs the strict object check, which includes checking object existence, read-only logic, type and min/max
additionally it rounds state values whose objects have a `common.step` attribute defined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the state |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) | ioBroker setState object |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/validator.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L54)

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

[adapter/src/lib/adapter/validator.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L157)

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

[adapter/src/lib/adapter/validator.ts:379](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L379)

___

### assertBoolean

▸ `Static` **assertBoolean**(`value`, `name`): asserts value is boolean

Throws if a type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is boolean

#### Defined in

[adapter/src/lib/adapter/validator.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L273)

___

### assertBuffer

▸ `Static` **assertBuffer**(`value`, `name`): asserts value is Buffer

Throws if a type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Buffer

#### Defined in

[adapter/src/lib/adapter/validator.ts:310](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L310)

___

### assertCallback

▸ `Static` **assertCallback**(`value`, `name`): asserts value is Callback

Throws if a type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Callback

#### Defined in

[adapter/src/lib/adapter/validator.ts:334](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L334)

___

### assertNumber

▸ `Static` **assertNumber**(`value`, `name`): asserts value is number

Throws if a type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is number

#### Defined in

[adapter/src/lib/adapter/validator.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L286)

___

### assertObject

▸ `Static` **assertObject**(`value`, `name`): asserts value is Record<string, any\>

Throws if a type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Record<string, any\>

#### Defined in

[adapter/src/lib/adapter/validator.ts:299](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L299)

___

### assertOptionalCallback

▸ `Static` **assertOptionalCallback**(`value`, `name`): asserts value is OptionalCallback

Throws if a type is not an optional callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is OptionalCallback

#### Defined in

[adapter/src/lib/adapter/validator.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L321)

___

### assertPattern

▸ `Static` **assertPattern**(`value`, `name`): asserts value is Pattern

Throws if a type is not a pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is Pattern

#### Defined in

[adapter/src/lib/adapter/validator.ts:252](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L252)

___

### assertString

▸ `Static` **assertString**(`value`, `name`): asserts value is string

Throws if a type is not matching the expected type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | value to check a type of |
| `name` | `string` | name of the parameter for logging |

#### Returns

asserts value is string

#### Defined in

[adapter/src/lib/adapter/validator.ts:239](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L239)

___

### assertTimeout

▸ `Static` **assertTimeout**(`ms`): `void`

Validates that the timeout is not exceeding a 32-bit signed integer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | milliseconds to validate |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/validator.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L439)

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

[adapter/src/lib/adapter/validator.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/9e3b8273/packages/adapter/src/lib/adapter/validator.ts#L229)
