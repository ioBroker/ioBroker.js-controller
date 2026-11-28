[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

Defined in: [types-dev/index.d.ts:443](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/index.d.ts#L443)

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:467](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/index.d.ts#L467)

Callback information. This is set when the source expects a response

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:445](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/index.d.ts#L445)

The command to be executed

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:449](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/index.d.ts#L449)

The source of this message

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:447](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/index.d.ts#L447)

The message payload

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/index.d.ts#L465)

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
