[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendToOptions

# Interface: SendToOptions

Defined in: [adapter/src/lib/\_Types.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/_Types.ts#L678)

Options controlling how a message is sent

## Properties

### timeout?

> `optional` **timeout?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/_Types.ts#L680)

Method throws or calls error cb if callback not called in time, works for single targets only

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/_Types.ts#L682)

The user on whose behalf the message is sent
