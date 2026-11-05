[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Logger

# Interface: Logger

Defined in: [types-dev/index.d.ts:373](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L373)

## Properties

### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/index.d.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L386)

Verbosity of the log output

## Methods

### debug()

> **debug**(`message`): `void`

Defined in: [types-dev/index.d.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L377)

log a message with debug level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### error()

> **error**(`message`): `void`

Defined in: [types-dev/index.d.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L383)

log a message with error severity

#### Parameters

##### message

`string`

#### Returns

`void`

***

### info()

> **info**(`message`): `void`

Defined in: [types-dev/index.d.ts:379](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L379)

log a message with info level (default output level for all adapters)

#### Parameters

##### message

`string`

#### Returns

`void`

***

### silly()

> **silly**(`message`): `void`

Defined in: [types-dev/index.d.ts:375](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L375)

log a message with silly level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### warn()

> **warn**(`message`): `void`

Defined in: [types-dev/index.d.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L381)

log a message with warning severity

#### Parameters

##### message

`string`

#### Returns

`void`
