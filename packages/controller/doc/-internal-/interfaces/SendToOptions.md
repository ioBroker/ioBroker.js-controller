[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendToOptions

# Interface: SendToOptions

Defined in: [adapter/src/lib/\_Types.ts:668](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L668)

Options controlling how a message is sent

## Properties

### timeout?

> `optional` **timeout?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L670)

Method throws or calls error cb if callback not called in time, works for single targets only

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L672)

The user on whose behalf the message is sent
