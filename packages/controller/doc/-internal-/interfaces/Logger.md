[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Logger

# Interface: Logger

Defined in: [types-dev/index.d.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L376)

## Properties

### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/index.d.ts:389](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L389)

Verbosity of the log output

## Methods

### debug()

> **debug**(`message`): `void`

Defined in: [types-dev/index.d.ts:380](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L380)

log a message with debug level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### error()

> **error**(`message`): `void`

Defined in: [types-dev/index.d.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L386)

log a message with error severity

#### Parameters

##### message

`string`

#### Returns

`void`

***

### info()

> **info**(`message`): `void`

Defined in: [types-dev/index.d.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L382)

log a message with info level (default output level for all adapters)

#### Parameters

##### message

`string`

#### Returns

`void`

***

### silly()

> **silly**(`message`): `void`

Defined in: [types-dev/index.d.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L378)

log a message with silly level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### warn()

> **warn**(`message`): `void`

Defined in: [types-dev/index.d.ts:384](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L384)

log a message with warning severity

#### Parameters

##### message

`string`

#### Returns

`void`
