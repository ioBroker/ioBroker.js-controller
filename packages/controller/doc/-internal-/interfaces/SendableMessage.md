[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

Defined in: [types-dev/index.d.ts:289](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L289)

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:297](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L297)

Callback information. This is set when the source expects a response

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:291](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L291)

The command to be executed

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L295)

The source of this message

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L293)

The message payload
