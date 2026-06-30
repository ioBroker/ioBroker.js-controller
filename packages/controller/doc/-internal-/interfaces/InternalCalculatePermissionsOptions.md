[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCalculatePermissionsOptions

# Interface: InternalCalculatePermissionsOptions

Defined in: [adapter/src/lib/\_Types.ts:423](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L423)

Options for calculating the permissions of a user

## Properties

### callback?

> `optional` **callback?**: [`CalculatePermissionsCallback`](../type-aliases/CalculatePermissionsCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:431](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L431)

Called with the calculated permission set

***

### commandsPermissions

> **commandsPermissions**: [`CommandsPermissions`](../type-aliases/CommandsPermissions.md)

Defined in: [adapter/src/lib/\_Types.ts:427](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L427)

The permission requirements of the commands

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:429](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L429)

Optional settings including the user context

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:425](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L425)

The user to calculate the permissions for
