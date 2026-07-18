[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GetUserGroupsOptions

# Interface: GetUserGroupsOptions

Defined in: [adapter/src/lib/\_Types.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L295)

Options for resolving the groups of a user

## Properties

### \_objects?

> `optional` **\_objects?**: ([`StateObject`](StateObject.md) \| `null`)[]

Defined in: [adapter/src/lib/\_Types.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L301)

Cache of state objects used while resolving

***

### acl

> **acl**: `Omit`\<[`PermissionSet`](PermissionSet.md), `"user"` \| `"groups"`\>

Defined in: [adapter/src/lib/\_Types.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L305)

The permissions resolved for the user

***

### checked?

> `optional` **checked?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L303)

Whether the groups have already been resolved

***

### groups?

> `optional` **groups?**: `` `system.group.${string}` ``[]

Defined in: [adapter/src/lib/\_Types.ts:299](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L299)

The groups already resolved for the user

***

### limitToOwnerRights?

> `optional` **limitToOwnerRights?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:307](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L307)

Whether to limit the result to the rights of the owner

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:297](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L297)

The user whose groups should be resolved
