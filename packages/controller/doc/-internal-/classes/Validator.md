[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Validator

# Class: Validator

Defined in: [adapter/src/lib/adapter/validator.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L15)

## Constructors

### Constructor

> **new Validator**(`objects`, `states`, `namespaceLog`, `logger`, `namespace`, `namespaceRegExp`): `Validator`

Defined in: [adapter/src/lib/adapter/validator.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L33)

Validator for internal adapter.js usage

#### Parameters

##### objects

`any`

Objects DB

##### states

`any`

States DB

##### namespaceLog

`string`

Log prefix

##### logger

`any`

Logger instance

##### namespace

`string`

the namespace of the adapter

##### namespaceRegExp

`RegExp`

the namespace RegExp of the adapter `adapter.0`

#### Returns

`Validator`

## Methods

### fixId()

> **fixId**(`id`, `isPattern?`): `string`

Defined in: [adapter/src/lib/adapter/validator.ts:355](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L355)

Adds the namespace to the ID if it is missing, if an object is passed it will be converted to an id string

#### Parameters

##### id

`string` \| [`IdObject`](../interfaces/IdObject.md)

id which will be fixed

##### isPattern?

`boolean` = `false`

if the id is a pattern

#### Returns

`string`

***

### performStrictObjectCheck()

> **performStrictObjectCheck**(`id`, `state`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/validator.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L56)

Performs the strict object check, which includes checking object existence, read-only logic, type and min/max
additionally it rounds state values whose objects have a `common.step` attribute defined

#### Parameters

##### id

`string`

id of the state

##### state

[`SettableState`](../type-aliases/SettableState.md)

ioBroker setState object

#### Returns

`Promise`\<`void`\>

***

### validateId()

> **validateId**(`id`, `isForeignId`, `options?`): `asserts id is string`

Defined in: [adapter/src/lib/adapter/validator.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L153)

Checks if a passed ID is valid. Throws an error if id is invalid

#### Parameters

##### id

`any`

id to check or object with properties device, channel and state

##### isForeignId

`boolean`

true&false if the ID is a foreign/full ID or only an "adapter local" id

##### options?

[`ValidateIdOptions`](../interfaces/ValidateIdOptions.md) \| `null`

optional

#### Returns

`asserts id is string`

#### Throws

Error when id is invalid

***

### validateSetStateObjectArgument()

> **validateSetStateObjectArgument**(`obj`): `void`

Defined in: [adapter/src/lib/adapter/validator.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L387)

Validates the object-type argument that is passed to setState

#### Parameters

##### obj

`Record`\<`string`, `any`\>

object to validate

#### Returns

`void`

***

### assertBoolean()

> `static` **assertBoolean**(`value`, `name`): `asserts value is boolean`

Defined in: [adapter/src/lib/adapter/validator.ts:272](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L272)

Throws if a type is not matching the expected type

#### Parameters

##### value

`unknown`

value to check a type of

##### name

`string`

name of the parameter for logging

#### Returns

`asserts value is boolean`

***

### assertBuffer()

> `static` **assertBuffer**(`value`, `name`): `asserts value is Buffer<ArrayBufferLike>`

Defined in: [adapter/src/lib/adapter/validator.ts:315](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L315)

Throws if a type is not an optional callback

#### Parameters

##### value

`unknown`

value to check a type of

##### name

`string`

name of the parameter for logging

#### Returns

`asserts value is Buffer<ArrayBufferLike>`

***

### assertCallback()

> `static` **assertCallback**(`value`, `name`): `asserts value is Callback`

Defined in: [adapter/src/lib/adapter/validator.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L341)

Throws if a type is not an optional callback

#### Parameters

##### value

`unknown`

value to check a type of

##### name

`string`

name of the parameter for logging

#### Returns

`asserts value is Callback`

***

### assertNumber()

> `static` **assertNumber**(`value`, `name`): `asserts value is number`

Defined in: [adapter/src/lib/adapter/validator.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L286)

Throws if a type is not matching the expected type

#### Parameters

##### value

`unknown`

value to check a type of

##### name

`string`

name of the parameter for logging

#### Returns

`asserts value is number`

***

### assertObject()

> `static` **assertObject**\<`T`\>(`value`, `name`): `asserts value is T`

Defined in: [adapter/src/lib/adapter/validator.ts:300](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L300)

Throws if a type is not matching the expected type

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

#### Parameters

##### value

`unknown`

value to check a type of

##### name

`string`

name of the parameter for logging

#### Returns

`asserts value is T`

***

### assertOptionalCallback()

> `static` **assertOptionalCallback**(`value`, `name`): `asserts value is OptionalCallback`

Defined in: [adapter/src/lib/adapter/validator.ts:327](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L327)

Throws if a type is not an optional callback

#### Parameters

##### value

`unknown`

value to check a type of

##### name

`string`

name of the parameter for logging

#### Returns

`asserts value is OptionalCallback`

***

### assertPattern()

> `static` **assertPattern**(`value`, `name`): `asserts value is Pattern`

Defined in: [adapter/src/lib/adapter/validator.ts:250](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L250)

Throws if a type is not a pattern

#### Parameters

##### value

`unknown`

value to check a type of

##### name

`string`

name of the parameter for logging

#### Returns

`asserts value is Pattern`

***

### assertString()

> `static` **assertString**(`value`, `name`): `asserts value is string`

Defined in: [adapter/src/lib/adapter/validator.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L236)

Throws if a type is not matching the expected type

#### Parameters

##### value

`unknown`

value to check a type of

##### name

`string`

name of the parameter for logging

#### Returns

`asserts value is string`

***

### assertTimeout()

> `static` **assertTimeout**(`ms`): `void`

Defined in: [adapter/src/lib/adapter/validator.ts:447](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L447)

Validates that the timeout is not exceeding a 32-bit signed integer

#### Parameters

##### ms

`number`

milliseconds to validate

#### Returns

`void`

***

### getErrorText()

> `static` **getErrorText**(`code`): `string`

Defined in: [adapter/src/lib/adapter/validator.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/adapter/validator.ts#L225)

Look up the error description for an error code

#### Parameters

##### code

`number`

error code

#### Returns

`string`

error description
