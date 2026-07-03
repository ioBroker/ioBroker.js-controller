[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendToOptions

# Interface: SendToOptions

Defined in: [adapter/src/lib/\_Types.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L672)

Options controlling how a message is sent

## Properties

### timeout?

> `optional` **timeout?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L674)

Method throws or calls error cb if callback not called in time, works for single targets only

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L676)

The user on whose behalf the message is sent
