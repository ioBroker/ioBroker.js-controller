[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Logger

# Interface: Logger

Defined in: [types-dev/index.d.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L236)

## Properties

### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/index.d.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L249)

Verbosity of the log output

## Methods

### debug()

> **debug**(`message`): `void`

Defined in: [types-dev/index.d.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L240)

log a message with debug level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### error()

> **error**(`message`): `void`

Defined in: [types-dev/index.d.ts:246](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L246)

log a message with error severity

#### Parameters

##### message

`string`

#### Returns

`void`

***

### info()

> **info**(`message`): `void`

Defined in: [types-dev/index.d.ts:242](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L242)

log a message with info level (default output level for all adapters)

#### Parameters

##### message

`string`

#### Returns

`void`

***

### silly()

> **silly**(`message`): `void`

Defined in: [types-dev/index.d.ts:238](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L238)

log a message with silly level

#### Parameters

##### message

`string`

#### Returns

`void`

***

### warn()

> **warn**(`message`): `void`

Defined in: [types-dev/index.d.ts:244](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L244)

log a message with warning severity

#### Parameters

##### message

`string`

#### Returns

`void`
