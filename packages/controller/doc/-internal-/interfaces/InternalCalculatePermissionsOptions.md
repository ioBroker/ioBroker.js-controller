[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCalculatePermissionsOptions

# Interface: InternalCalculatePermissionsOptions

Defined in: [adapter/src/lib/\_Types.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L424)

Options for calculating the permissions of a user

## Properties

### callback?

> `optional` **callback?**: [`CalculatePermissionsCallback`](../type-aliases/CalculatePermissionsCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L432)

Called with the calculated permission set

***

### commandsPermissions

> **commandsPermissions**: [`CommandsPermissions`](../type-aliases/CommandsPermissions.md)

Defined in: [adapter/src/lib/\_Types.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L428)

The permission requirements of the commands

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:430](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L430)

Optional settings including the user context

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:426](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L426)

The user to calculate the permissions for
