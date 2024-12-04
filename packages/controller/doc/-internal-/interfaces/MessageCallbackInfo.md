[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

Callback information for a passed message

## Properties

### ack

> **ack**: `boolean`

If ack is false, it means the message is a request. If ack is true, it means the message is a response

#### Defined in

[types-dev/index.d.ts:254](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L254)

***

### id

> **id**: `number`

ID of this callback

#### Defined in

[types-dev/index.d.ts:252](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L252)

***

### message

> **message**: `any`

The original message payload

#### Defined in

[types-dev/index.d.ts:250](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L250)

***

### time

> **time**: `number`

Timestamp of this message

#### Defined in

[types-dev/index.d.ts:256](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L256)
