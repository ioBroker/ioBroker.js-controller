[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

Defined in: [types-dev/index.d.ts:263](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/types-dev/index.d.ts#L263)

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:271](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/types-dev/index.d.ts#L271)

Callback information. This is set when the source expects a response

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/types-dev/index.d.ts#L265)

The command to be executed

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:269](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/types-dev/index.d.ts#L269)

The source of this message

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/types-dev/index.d.ts#L267)

The message payload
