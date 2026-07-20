[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Validator

# Class: Validator

Defined in: [adapter/src/lib/adapter/validator.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L22)

**`Internal`**

Validates arguments passed to the adapter's public methods

## Constructors

### Constructor

> **new Validator**(`objects`, `namespaceLog`, `logger`, `namespace`, `namespaceRegExp`): `Validator`

Defined in: [adapter/src/lib/adapter/validator.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L38)

Validator for internal adapter.js usage

#### Parameters

##### objects

[`ObjectsInRedisClient`](ObjectsInRedisClient.md)

Objects DB

##### namespaceLog

`string`

Log prefix

##### logger

[`Logger`](../interfaces/Logger.md)

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

Defined in: [adapter/src/lib/adapter/validator.ts:357](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L357)

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

Defined in: [adapter/src/lib/adapter/validator.ts:59](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L59)

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

Defined in: [adapter/src/lib/adapter/validator.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L154)

Checks if a passed ID is valid. Throws an error if id is invalid

#### Parameters

##### id

`string`

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

when id is invalid

***

### validateSetStateObjectArgument()

> **validateSetStateObjectArgument**(`obj`): `void`

Defined in: [adapter/src/lib/adapter/validator.ts:389](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L389)

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

Defined in: [adapter/src/lib/adapter/validator.ts:274](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L274)

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

Defined in: [adapter/src/lib/adapter/validator.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L317)

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

Defined in: [adapter/src/lib/adapter/validator.ts:343](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L343)

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

Defined in: [adapter/src/lib/adapter/validator.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L288)

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

Defined in: [adapter/src/lib/adapter/validator.ts:302](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L302)

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

Defined in: [adapter/src/lib/adapter/validator.ts:329](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L329)

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

Defined in: [adapter/src/lib/adapter/validator.ts:252](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L252)

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

Defined in: [adapter/src/lib/adapter/validator.ts:238](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L238)

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

Defined in: [adapter/src/lib/adapter/validator.ts:449](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L449)

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

Defined in: [adapter/src/lib/adapter/validator.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/validator.ts#L227)

Look up the error description for an error code

#### Parameters

##### code

`number`

error code

#### Returns

`string`

error description
