[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GetUserGroupsOptions

# Interface: GetUserGroupsOptions

Defined in: [adapter/src/lib/\_Types.ts:299](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L299)

Options for resolving the groups of a user

## Properties

### \_objects?

> `optional` **\_objects?**: ([`StateObject`](StateObject.md) \| `null`)[]

Defined in: [adapter/src/lib/\_Types.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L303)

***

### acl

> **acl**: `Omit`\<[`PermissionSet`](PermissionSet.md), `"user"` \| `"groups"`\>

Defined in: [adapter/src/lib/\_Types.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L305)

***

### checked?

> `optional` **checked?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:304](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L304)

***

### groups?

> `optional` **groups?**: `` `system.group.${string}` ``[]

Defined in: [adapter/src/lib/\_Types.ts:302](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L302)

***

### limitToOwnerRights?

> `optional` **limitToOwnerRights?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L306)

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L301)

The user whose groups should be resolved
