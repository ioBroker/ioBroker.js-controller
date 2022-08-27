[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Message

# Interface: Message

[<internal>](../modules/internal_.md).Message

A message being passed between adapter instances

## Table of contents

### Properties

- [\_id](internal_.Message.md#_id)
- [callback](internal_.Message.md#callback)
- [command](internal_.Message.md#command)
- [from](internal_.Message.md#from)
- [message](internal_.Message.md#message)

## Properties

### \_id

• **\_id**: `number`

ID of this message

#### Defined in

node_modules/@types/iobroker/index.d.ts:229

___

### callback

• **callback**: [`MessageCallbackInfo`](internal_.MessageCallbackInfo.md)

Callback information. This is set when the source expects a response

#### Defined in

node_modules/@types/iobroker/index.d.ts:231

___

### command

• **command**: `string`

The command to be executed

#### Defined in

node_modules/@types/iobroker/index.d.ts:223

___

### from

• **from**: `string`

The source of this message

#### Defined in

node_modules/@types/iobroker/index.d.ts:227

___

### message

• **message**: [`MessagePayload`](../modules/internal_.md#messagepayload)

The message payload

#### Defined in

node_modules/@types/iobroker/index.d.ts:225
