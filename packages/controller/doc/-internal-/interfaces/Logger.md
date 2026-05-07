[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Logger

# Interface: Logger

Defined in: [types-dev/index.d.ts:210](https://github.com/ioBroker/ioBroker.js-controller/blob/9a597925507d153ba52e122dc370116da14485fa/packages/types-dev/index.d.ts#L210)

## Properties

### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/index.d.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/9a597925507d153ba52e122dc370116da14485fa/packages/types-dev/index.d.ts#L223)

Verbosity of the log output

## Methods

### debug()

> **debug**(`message`): `void`

Defined in: [types-dev/index.d.ts:214](https://github.com/ioBroker/ioBroker.js-controller/blob/9a597925507d153ba52e122dc370116da14485fa/packages/types-dev/index.d.ts#L214)

log a message with debug level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### error()

> **error**(`message`): `void`

Defined in: [types-dev/index.d.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/9a597925507d153ba52e122dc370116da14485fa/packages/types-dev/index.d.ts#L220)

log a message with error severity

#### Parameters

##### message

`string`

#### Returns

`void`

***

### info()

> **info**(`message`): `void`

Defined in: [types-dev/index.d.ts:216](https://github.com/ioBroker/ioBroker.js-controller/blob/9a597925507d153ba52e122dc370116da14485fa/packages/types-dev/index.d.ts#L216)

log a message with info level (default output level for all adapters)

#### Parameters

##### message

`string`

#### Returns

`void`

***

### silly()

> **silly**(`message`): `void`

Defined in: [types-dev/index.d.ts:212](https://github.com/ioBroker/ioBroker.js-controller/blob/9a597925507d153ba52e122dc370116da14485fa/packages/types-dev/index.d.ts#L212)

log a message with silly level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### warn()

> **warn**(`message`): `void`

Defined in: [types-dev/index.d.ts:218](https://github.com/ioBroker/ioBroker.js-controller/blob/9a597925507d153ba52e122dc370116da14485fa/packages/types-dev/index.d.ts#L218)

log a message with warning severity

#### Parameters

##### message

`string`

#### Returns

`void`
