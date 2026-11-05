[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

Defined in: [types-dev/index.d.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L432)

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L440)

Callback information. This is set when the source expects a response

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L434)

The command to be executed

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:438](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L438)

The source of this message

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:436](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L436)

The message payload
