[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Log

# Class: Log

Log class for adapter.js

It prefixes every message with the given namespace

## Implements

- [`Logger`](../interfaces/Logger.md)

## Constructors

### new Log()

> **new Log**(`namespaceLog`, `level`, `logger`): [`Log`](Log.md)

#### Parameters

• **namespaceLog**: `string`

Logging namespace to prefix

• **level**: [`LogLevel`](../type-aliases/LogLevel.md)

The log level

• **logger**: `any`

logger instance

#### Returns

[`Log`](Log.md)

#### Defined in

[adapter/src/lib/adapter/log.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/log.ts#L17)

## Properties

### level

> `readonly` **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Verbosity of the log output

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`level`](../interfaces/Logger.md#level)

#### Defined in

[adapter/src/lib/adapter/log.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/log.ts#L8)

## Methods

### debug()

> **debug**(`msg`): `void`

log a message with debug level

#### Parameters

• **msg**: `string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`debug`](../interfaces/Logger.md#debug)

#### Defined in

[adapter/src/lib/adapter/log.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/log.ts#L37)

***

### error()

> **error**(`msg`): `void`

log a message with error severity

#### Parameters

• **msg**: `string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`error`](../interfaces/Logger.md#error)

#### Defined in

[adapter/src/lib/adapter/log.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/log.ts#L45)

***

### info()

> **info**(`msg`): `void`

log a message with info level (default output level for all adapters)

#### Parameters

• **msg**: `string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`info`](../interfaces/Logger.md#info)

#### Defined in

[adapter/src/lib/adapter/log.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/log.ts#L41)

***

### silly()

> **silly**(`msg`): `void`

log a message with silly level

#### Parameters

• **msg**: `string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`silly`](../interfaces/Logger.md#silly)

#### Defined in

[adapter/src/lib/adapter/log.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/log.ts#L33)

***

### warn()

> **warn**(`msg`): `void`

log a message with warning severity

#### Parameters

• **msg**: `string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`warn`](../interfaces/Logger.md#warn)

#### Defined in

[adapter/src/lib/adapter/log.ts:49](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/log.ts#L49)
