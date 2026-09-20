[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Logger

# Interface: Logger

Defined in: [types-dev/index.d.ts:368](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L368)

## Properties

### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/index.d.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L381)

Verbosity of the log output

## Methods

### debug()

> **debug**(`message`): `void`

Defined in: [types-dev/index.d.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L372)

log a message with debug level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### error()

> **error**(`message`): `void`

Defined in: [types-dev/index.d.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L378)

log a message with error severity

#### Parameters

##### message

`string`

#### Returns

`void`

***

### info()

> **info**(`message`): `void`

Defined in: [types-dev/index.d.ts:374](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L374)

log a message with info level (default output level for all adapters)

#### Parameters

##### message

`string`

#### Returns

`void`

***

### silly()

> **silly**(`message`): `void`

Defined in: [types-dev/index.d.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L370)

log a message with silly level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### warn()

> **warn**(`message`): `void`

Defined in: [types-dev/index.d.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L376)

log a message with warning severity

#### Parameters

##### message

`string`

#### Returns

`void`
