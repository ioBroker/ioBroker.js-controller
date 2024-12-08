[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Logger

# Interface: Logger

## Properties

### level

> **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Verbosity of the log output

#### Defined in

[types-dev/index.d.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L219)

## Methods

### debug()

> **debug**(`message`): `void`

log a message with debug level

#### Parameters

• **message**: `string`

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:210](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L210)

***

### error()

> **error**(`message`): `void`

log a message with error severity

#### Parameters

• **message**: `string`

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:216](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L216)

***

### info()

> **info**(`message`): `void`

log a message with info level (default output level for all adapters)

#### Parameters

• **message**: `string`

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:212](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L212)

***

### silly()

> **silly**(`message`): `void`

log a message with silly level

#### Parameters

• **message**: `string`

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:208](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L208)

***

### warn()

> **warn**(`message`): `void`

log a message with warning severity

#### Parameters

• **message**: `string`

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:214](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L214)
