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

[types-dev/index.d.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L258)

***

### id

> **id**: `number`

ID of this callback

#### Defined in

[types-dev/index.d.ts:256](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L256)

***

### message

> **message**: `any`

The original message payload

#### Defined in

[types-dev/index.d.ts:254](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L254)

***

### time

> **time**: `number`

Timestamp of this message

#### Defined in

[types-dev/index.d.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L260)
