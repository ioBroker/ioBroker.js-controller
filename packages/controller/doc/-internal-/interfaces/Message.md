[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Message

# Interface: Message

Defined in: [types-dev/index.d.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L317)

A message being passed between adapter instances

## Extends

- [`SendableMessage`](SendableMessage.md)

## Properties

### \_id

> **\_id**: `number`

Defined in: [types-dev/index.d.ts:319](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L319)

ID of this message

***

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:313](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L313)

Callback information. This is set when the source expects a response

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`callback`](SendableMessage.md#callback)

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:291](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L291)

The command to be executed

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`command`](SendableMessage.md#command)

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L295)

The source of this message

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`from`](SendableMessage.md#from)

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L293)

The message payload

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`message`](SendableMessage.md#message)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L311)

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

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`user`](SendableMessage.md#user)
