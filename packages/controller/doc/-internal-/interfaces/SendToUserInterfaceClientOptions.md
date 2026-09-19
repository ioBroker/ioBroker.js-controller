[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendToUserInterfaceClientOptions

# Interface: SendToUserInterfaceClientOptions

Defined in: [adapter/src/lib/\_Types.ts:414](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/adapter/src/lib/_Types.ts#L414)

Options for sending data to a UI client

## Properties

### clientId?

> `optional` **clientId?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:416](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/adapter/src/lib/_Types.ts#L416)

id of the UI client, if not given, send it to all active clients

***

### data

> **data**: `unknown`

Defined in: [adapter/src/lib/\_Types.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/adapter/src/lib/_Types.ts#L418)

data to send to the client
