[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetPasswordOptions

# Interface: InternalSetPasswordOptions

Defined in: [adapter/src/lib/\_Types.ts:373](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L373)

Options for setting a user's password

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L381)

Called once the password has been set

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:379](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L379)

Optional settings including the user context

***

### pw

> **pw**: `string`

Defined in: [adapter/src/lib/\_Types.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L377)

The new password

***

### user

> **user**: `string`

Defined in: [adapter/src/lib/\_Types.ts:375](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L375)

The user whose password is set
