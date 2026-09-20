[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

Defined in: [types-dev/index.d.ts:421](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L421)

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:429](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L429)

Callback information. This is set when the source expects a response

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:423](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L423)

The command to be executed

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:427](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L427)

The source of this message

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:425](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L425)

The message payload
