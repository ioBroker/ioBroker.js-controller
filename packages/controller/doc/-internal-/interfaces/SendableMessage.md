[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

Defined in: [types-dev/index.d.ts:289](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L289)

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:313](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L313)

Callback information. This is set when the source expects a response

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:291](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L291)

The command to be executed

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L295)

The source of this message

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L293)

The message payload

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L311)

The user this message is sent on behalf of, if the sender named one (`options.user` of
`sendTo`/`sendToHost`). A socket server such as `admin` or `web` puts the authenticated
user of the connection here, so the receiving instance can check what that user may do
instead of acting with its own rights.

It is only as trustworthy as `from`: every instance can claim any user here, and all of
them run with full database rights anyway. Trust it when `from` is an instance you trust
to have authenticated the user, and never as a substitute for your own permission check.

Set from js-controller 7.2.5 on; an older one never sets it. A message that was sent
without a user does not carry the field at all, so the absence of the field means
"nobody was named" - for whichever of the two reasons, and in both cases there is
nothing to check against.
