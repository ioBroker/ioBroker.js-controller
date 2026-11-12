[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Message

# Interface: Message

Defined in: [types-dev/index.d.ts:463](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L463)

A message being passed between adapter instances

## Extends

- [`SendableMessage`](SendableMessage.md)

## Properties

### \_id

> **\_id**: `number`

Defined in: [types-dev/index.d.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L465)

ID of this message

***

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L459)

Callback information. This is set when the source expects a response

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`callback`](SendableMessage.md#callback)

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:437](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L437)

The command to be executed

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`command`](SendableMessage.md#command)

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:441](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L441)

The source of this message

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`from`](SendableMessage.md#from)

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L439)

The message payload

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`message`](SendableMessage.md#message)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:457](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L457)

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
