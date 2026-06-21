[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCalculatePermissionsOptions

# Interface: InternalCalculatePermissionsOptions

Defined in: [adapter/src/lib/\_Types.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L420)

Options for calculating the permissions of a user

## Properties

### callback?

> `optional` **callback?**: [`CalculatePermissionsCallback`](../type-aliases/CalculatePermissionsCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L428)

Called with the calculated permission set

***

### commandsPermissions

> **commandsPermissions**: [`CommandsPermissions`](../type-aliases/CommandsPermissions.md)

Defined in: [adapter/src/lib/\_Types.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L424)

The permission requirements of the commands

***

### options?

> `optional` **options?**: `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:426](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L426)

Optional settings including the user context

***

### user

> **user**: `string`

Defined in: [adapter/src/lib/\_Types.ts:422](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L422)

The user to calculate the permissions for
