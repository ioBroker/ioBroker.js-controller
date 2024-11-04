[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

[\<internal\>](../modules/internal_.md).MessageCallbackInfo

Callback information for a passed message

## Table of contents

### Properties

- [ack](internal_.MessageCallbackInfo.md#ack)
- [id](internal_.MessageCallbackInfo.md#id)
- [message](internal_.MessageCallbackInfo.md#message)
- [time](internal_.MessageCallbackInfo.md#time)

## Properties

### ack

• **ack**: `boolean`

If ack is false, it means the message is a request. If ack is true, it means the message is a response

#### Defined in

[types-dev/index.d.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/a0d19f0c12f79a792741858b32ef9d3886c117c5/packages/types-dev/index.d.ts#L240)

___

### id

• **id**: `number`

ID of this callback

#### Defined in

[types-dev/index.d.ts:238](https://github.com/ioBroker/ioBroker.js-controller/blob/a0d19f0c12f79a792741858b32ef9d3886c117c5/packages/types-dev/index.d.ts#L238)

___

### message

• **message**: `any`

The original message payload

#### Defined in

[types-dev/index.d.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/a0d19f0c12f79a792741858b32ef9d3886c117c5/packages/types-dev/index.d.ts#L236)

___

### time

• **time**: `number`

Timestamp of this message

#### Defined in

[types-dev/index.d.ts:242](https://github.com/ioBroker/ioBroker.js-controller/blob/a0d19f0c12f79a792741858b32ef9d3886c117c5/packages/types-dev/index.d.ts#L242)
