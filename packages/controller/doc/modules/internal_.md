[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / <internal\>

# Module: <internal\>

## Table of contents

### Classes

- [Log](../classes/internal_.Log.md)
- [Utils](../classes/internal_.Utils.md)

### Interfaces

- [AdapterOptions](../interfaces/internal_.AdapterOptions.md)
- [AdapterOptionsConfig](../interfaces/internal_.AdapterOptionsConfig.md)
- [AliasDetails](../interfaces/internal_.AliasDetails.md)
- [AliasDetailsSource](../interfaces/internal_.AliasDetailsSource.md)
- [AliasTargetEntry](../interfaces/internal_.AliasTargetEntry.md)
- [GetUserGroupsOptions](../interfaces/internal_.GetUserGroupsOptions.md)
- [IdObject](../interfaces/internal_.IdObject.md)
- [InternalAddChannelToEnumOptions](../interfaces/internal_.InternalAddChannelToEnumOptions.md)
- [InternalAddStateToEnumOptions](../interfaces/internal_.InternalAddStateToEnumOptions.md)
- [InternalCalculatePermissionsOptions](../interfaces/internal_.InternalCalculatePermissionsOptions.md)
- [InternalCheckGroupOptions](../interfaces/internal_.InternalCheckGroupOptions.md)
- [InternalCheckPasswordOptions](../interfaces/internal_.InternalCheckPasswordOptions.md)
- [InternalCreateDeviceOptions](../interfaces/internal_.InternalCreateDeviceOptions.md)
- [InternalCreateStateOptions](../interfaces/internal_.InternalCreateStateOptions.md)
- [InternalDelBinaryStateOptions](../interfaces/internal_.InternalDelBinaryStateOptions.md)
- [InternalDelObjectOptions](../interfaces/internal_.InternalDelObjectOptions.md)
- [InternalDelStateOptions](../interfaces/internal_.InternalDelStateOptions.md)
- [InternalDeleteChannelFromEnumOptions](../interfaces/internal_.InternalDeleteChannelFromEnumOptions.md)
- [InternalDeleteChannelOptions](../interfaces/internal_.InternalDeleteChannelOptions.md)
- [InternalDeleteDeviceOptions](../interfaces/internal_.InternalDeleteDeviceOptions.md)
- [InternalDeleteStateFromEnumOptions](../interfaces/internal_.InternalDeleteStateFromEnumOptions.md)
- [InternalDeleteStateOptions](../interfaces/internal_.InternalDeleteStateOptions.md)
- [InternalDestroySessionOptions](../interfaces/internal_.InternalDestroySessionOptions.md)
- [InternalFormatDateOptions](../interfaces/internal_.InternalFormatDateOptions.md)
- [InternalGetAdapterObjectsOptions](../interfaces/internal_.InternalGetAdapterObjectsOptions.md)
- [InternalGetBinaryStateOption](../interfaces/internal_.InternalGetBinaryStateOption.md)
- [InternalGetCertificatesOptions](../interfaces/internal_.InternalGetCertificatesOptions.md)
- [InternalGetChannelsOfOptions](../interfaces/internal_.InternalGetChannelsOfOptions.md)
- [InternalGetDevicesOptions](../interfaces/internal_.InternalGetDevicesOptions.md)
- [InternalGetEncryptedConfigOptions](../interfaces/internal_.InternalGetEncryptedConfigOptions.md)
- [InternalGetEnumOptions](../interfaces/internal_.InternalGetEnumOptions.md)
- [InternalGetEnumsOptions](../interfaces/internal_.InternalGetEnumsOptions.md)
- [InternalGetHistoryOptions](../interfaces/internal_.InternalGetHistoryOptions.md)
- [InternalGetObjectOptions](../interfaces/internal_.InternalGetObjectOptions.md)
- [InternalGetObjectViewOptions](../interfaces/internal_.InternalGetObjectViewOptions.md)
- [InternalGetObjectsOptions](../interfaces/internal_.InternalGetObjectsOptions.md)
- [InternalGetPortOptions](../interfaces/internal_.InternalGetPortOptions.md)
- [InternalGetSessionOptions](../interfaces/internal_.InternalGetSessionOptions.md)
- [InternalGetStateOptions](../interfaces/internal_.InternalGetStateOptions.md)
- [InternalGetStatesOfOptions](../interfaces/internal_.InternalGetStatesOfOptions.md)
- [InternalGetStatesOptions](../interfaces/internal_.InternalGetStatesOptions.md)
- [InternalGetUserIDOptions](../interfaces/internal_.InternalGetUserIDOptions.md)
- [InternalSendToHostOptions](../interfaces/internal_.InternalSendToHostOptions.md)
- [InternalSendToOptions](../interfaces/internal_.InternalSendToOptions.md)
- [InternalSetBinaryStateOptions](../interfaces/internal_.InternalSetBinaryStateOptions.md)
- [InternalSetObjectOptions](../interfaces/internal_.InternalSetObjectOptions.md)
- [InternalSetPasswordOptions](../interfaces/internal_.InternalSetPasswordOptions.md)
- [InternalSetSessionOptions](../interfaces/internal_.InternalSetSessionOptions.md)
- [InternalSetStateChanedOptions](../interfaces/internal_.InternalSetStateChanedOptions.md)
- [InternalSetStateOptions](../interfaces/internal_.InternalSetStateOptions.md)
- [InternalSubscribeOptions](../interfaces/internal_.InternalSubscribeOptions.md)
- [InternalUpdateConfigOptions](../interfaces/internal_.InternalUpdateConfigOptions.md)
- [ValidateIdOptions](../interfaces/internal_.ValidateIdOptions.md)

### Type Aliases

- [CalculatePermissionsCallback](internal_.md#calculatepermissionscallback)
- [Callback](internal_.md#callback)
- [ChangeFileFunction](internal_.md#changefilefunction)
- [CheckGroupCallback](internal_.md#checkgroupcallback)
- [CheckPasswordCallback](internal_.md#checkpasswordcallback)
- [CheckStateCommand](internal_.md#checkstatecommand)
- [CommandsPermissions](internal_.md#commandspermissions)
- [CommandsPermissionsEntry](internal_.md#commandspermissionsentry)
- [CommandsPermissionsObject](internal_.md#commandspermissionsobject)
- [GetCertificatesCallback](internal_.md#getcertificatescallback)
- [GetEncryptedConfigCallback](internal_.md#getencryptedconfigcallback)
- [ID](internal_.md#id)
- [MaybePromise](internal_.md#maybepromise)
- [OpaqueString](internal_.md#opaquestring)
- [OptionalCallback](internal_.md#optionalcallback)
- [Pattern](internal_.md#pattern)
- [TimeoutCallback](internal_.md#timeoutcallback)

## Type Aliases

### CalculatePermissionsCallback

Ƭ **CalculatePermissionsCallback**: (`result`: `ioBroker.PermissionSet`) => `void`

#### Type declaration

▸ (`result`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `ioBroker.PermissionSet` |

##### Returns

`void`

#### Defined in

[packages/adapter/src/lib/_Types.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L152)

___

### Callback

Ƭ **Callback**: (...`args`: `any`[]) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (...`args`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/adapter/utils.ts#L10)

___

### ChangeFileFunction

Ƭ **ChangeFileFunction**: (`id`: `string`, `fileName`: `string`, `size`: `number` \| ``null``) => `void`

#### Type declaration

▸ (`id`, `fileName`, `size`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `fileName` | `string` |
| `size` | `number` \| ``null`` |

##### Returns

`void`

#### Defined in

packages/db-objects-redis/build/lib/objects/objectsInRedisClient.d.ts:7

___

### CheckGroupCallback

Ƭ **CheckGroupCallback**: (`result`: `boolean`) => `void`

#### Type declaration

▸ (`result`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `boolean` |

##### Returns

`void`

#### Defined in

[packages/adapter/src/lib/_Types.ts:136](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L136)

___

### CheckPasswordCallback

Ƭ **CheckPasswordCallback**: (`success`: `boolean`, `user`: `string`) => `void`

#### Type declaration

▸ (`success`, `user`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `success` | `boolean` |
| `user` | `string` |

##### Returns

`void`

#### Defined in

[packages/adapter/src/lib/_Types.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L116)

___

### CheckStateCommand

Ƭ **CheckStateCommand**: ``"getState"`` \| ``"setState"`` \| ``"delState"``

#### Defined in

[packages/adapter/src/lib/_Types.ts:89](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L89)

___

### CommandsPermissions

Ƭ **CommandsPermissions**: [`CommandsPermissionsObject`](internal_.md#commandspermissionsobject) \| [`CommandsPermissionsEntry`](internal_.md#commandspermissionsentry)[]

#### Defined in

[packages/adapter/src/lib/_Types.ts:150](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L150)

___

### CommandsPermissionsEntry

Ƭ **CommandsPermissionsEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `operation` | `string` |
| `type` | ``"object"`` \| ``"state"`` \| ``""`` \| ``"other"`` \| ``"file"`` |

#### Defined in

[packages/adapter/src/lib/_Types.ts:145](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L145)

___

### CommandsPermissionsObject

Ƭ **CommandsPermissionsObject**: `Object`

#### Index signature

▪ [permission: `string`]: [`CommandsPermissionsEntry`](internal_.md#commandspermissionsentry)

#### Defined in

[packages/adapter/src/lib/_Types.ts:146](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L146)

___

### GetCertificatesCallback

Ƭ **GetCertificatesCallback**: (`err`: `string` \| ``null``, `certs?`: `ioBroker.Certificates`, `useLetsEncryptCert?`: `boolean`) => `void`

#### Type declaration

▸ (`err`, `certs?`, `useLetsEncryptCert?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `string` \| ``null`` |
| `certs?` | `ioBroker.Certificates` |
| `useLetsEncryptCert?` | `boolean` |

##### Returns

`void`

#### Defined in

[packages/adapter/src/lib/_Types.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L161)

___

### GetEncryptedConfigCallback

Ƭ **GetEncryptedConfigCallback**: (`error`: `Error` \| ``null`` \| `undefined`, `result?`: `string`) => `void`

#### Type declaration

▸ (`error`, `result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` \| ``null`` \| `undefined` |
| `result?` | `string` |

##### Returns

`void`

#### Defined in

[packages/adapter/src/lib/_Types.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L178)

___

### ID

Ƭ **ID**: [`OpaqueString`](internal_.md#opaquestring)<``"ID"``\>

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/adapter/utils.ts#L8)

___

### MaybePromise

Ƭ **MaybePromise**: `Promise`<`void`\> \| `void`

#### Defined in

[packages/adapter/src/lib/_Types.ts:91](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L91)

___

### OpaqueString

Ƭ **OpaqueString**<`T`\>: `string` & { `__type`: `T`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:4](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/adapter/utils.ts#L4)

___

### OptionalCallback

Ƭ **OptionalCallback**: `undefined` \| [`Callback`](internal_.md#callback)

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/adapter/utils.ts#L11)

___

### Pattern

Ƭ **Pattern**: `string` \| `string`[]

#### Defined in

[packages/adapter/src/lib/adapter/utils.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/adapter/utils.ts#L12)

___

### TimeoutCallback

Ƭ **TimeoutCallback**: (`args?`: `any`[]) => `void`

#### Type declaration

▸ (`args?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/adapter/src/lib/_Types.ts:185](https://github.com/ioBroker/ioBroker.js-controller/blob/3090c793/packages/adapter/src/lib/_Types.ts#L185)
