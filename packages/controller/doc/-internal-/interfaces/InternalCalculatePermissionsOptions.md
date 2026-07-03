[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCalculatePermissionsOptions

# Interface: InternalCalculatePermissionsOptions

Defined in: [adapter/src/lib/\_Types.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L428)

Options for calculating the permissions of a user

## Properties

### callback?

> `optional` **callback?**: [`CalculatePermissionsCallback`](../type-aliases/CalculatePermissionsCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:436](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L436)

Called with the calculated permission set

***

### commandsPermissions

> **commandsPermissions**: [`CommandsPermissions`](../type-aliases/CommandsPermissions.md)

Defined in: [adapter/src/lib/\_Types.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L432)

The permission requirements of the commands

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L434)

Optional settings including the user context

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:430](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L430)

The user to calculate the permissions for
