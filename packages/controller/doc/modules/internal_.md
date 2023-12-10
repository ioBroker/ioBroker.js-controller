[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / <internal\>

# Module: <internal\>

## Table of contents

### Enumerations

- [STATE\_QUALITY](../enums/internal_.STATE_QUALITY.md)
- [STATE\_QUALITY](../enums/internal_.STATE_QUALITY-1.md)

### Classes

- [Log](../classes/internal_.Log.md)
- [ObjectsInRedisClient](../classes/internal_.ObjectsInRedisClient.md)
- [StateRedisClient](../classes/internal_.StateRedisClient.md)
- [UserInterfaceMessagingController](../classes/internal_.UserInterfaceMessagingController.md)
- [Validator](../classes/internal_.Validator.md)
- [WMStrm](../classes/internal_.WMStrm.md)

### Interfaces

- [ACLObject](../interfaces/internal_.ACLObject.md)
- [AdapterCommon](../interfaces/internal_.AdapterCommon.md)
- [AdapterConfig](../interfaces/internal_.AdapterConfig.md)
- [AdapterObject](../interfaces/internal_.AdapterObject.md)
- [AdapterOptions](../interfaces/internal_.AdapterOptions.md)
- [AdapterOptionsConfig](../interfaces/internal_.AdapterOptionsConfig.md)
- [AdminUi](../interfaces/internal_.AdminUi.md)
- [AliasDetails](../interfaces/internal_.AliasDetails.md)
- [AliasDetailsSource](../interfaces/internal_.AliasDetailsSource.md)
- [AliasTargetEntry](../interfaces/internal_.AliasTargetEntry.md)
- [BackupOptions](../interfaces/internal_.BackupOptions.md)
- [BaseObject](../interfaces/internal_.BaseObject.md)
- [CallOptions](../interfaces/internal_.CallOptions.md)
- [Certificates](../interfaces/internal_.Certificates.md)
- [ChannelCommon](../interfaces/internal_.ChannelCommon.md)
- [ChannelObject](../interfaces/internal_.ChannelObject.md)
- [ChartCommon](../interfaces/internal_.ChartCommon.md)
- [ChartObject](../interfaces/internal_.ChartObject.md)
- [CheckStatesResult](../interfaces/internal_.CheckStatesResult.md)
- [ChownFileResult](../interfaces/internal_.ChownFileResult.md)
- [ClientHandler](../interfaces/internal_.ClientHandler.md)
- [ConnectionOptions](../interfaces/internal_.ConnectionOptions.md)
- [DbStatus](../interfaces/internal_.DbStatus.md)
- [DelObjectOptions](../interfaces/internal_.DelObjectOptions.md)
- [DesignObject](../interfaces/internal_.DesignObject.md)
- [DeviceCommon](../interfaces/internal_.DeviceCommon.md)
- [DeviceObject](../interfaces/internal_.DeviceObject.md)
- [EnumCommon](../interfaces/internal_.EnumCommon.md)
- [EnumObject](../interfaces/internal_.EnumObject.md)
- [EvaluatedFileACL](../interfaces/internal_.EvaluatedFileACL.md)
- [ExtendObjectOptions](../interfaces/internal_.ExtendObjectOptions.md)
- [ExtendObjectOptionsPreserve](../interfaces/internal_.ExtendObjectOptionsPreserve.md)
- [FileACL](../interfaces/internal_.FileACL.md)
- [FolderObject](../interfaces/internal_.FolderObject.md)
- [GetHistoryOptions](../interfaces/internal_.GetHistoryOptions.md)
- [GetObjectListItem](../interfaces/internal_.GetObjectListItem.md)
- [GetObjectViewItem](../interfaces/internal_.GetObjectViewItem.md)
- [GetObjectViewParams](../interfaces/internal_.GetObjectViewParams.md)
- [GetUserGroupsOptions](../interfaces/internal_.GetUserGroupsOptions.md)
- [GroupCommon](../interfaces/internal_.GroupCommon.md)
- [GroupObject](../interfaces/internal_.GroupObject.md)
- [HeartbeatTimer](../interfaces/internal_.HeartbeatTimer.md)
- [HostCommon](../interfaces/internal_.HostCommon.md)
- [HostNative](../interfaces/internal_.HostNative.md)
- [HostObject](../interfaces/internal_.HostObject.md)
- [IdObject](../interfaces/internal_.IdObject.md)
- [InstanceCommon](../interfaces/internal_.InstanceCommon.md)
- [InstanceObject](../interfaces/internal_.InstanceObject.md)
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
- [InternalSetStateChangedOptions](../interfaces/internal_.InternalSetStateChangedOptions.md)
- [InternalSetStateOptions](../interfaces/internal_.InternalSetStateOptions.md)
- [InternalSubscribeOptions](../interfaces/internal_.InternalSubscribeOptions.md)
- [InternalUpdateConfigOptions](../interfaces/internal_.InternalUpdateConfigOptions.md)
- [LogObject](../interfaces/internal_.LogObject.md)
- [Logger](../interfaces/internal_.Logger.md)
- [Message](../interfaces/internal_.Message.md)
- [MessageCallbackInfo](../interfaces/internal_.MessageCallbackInfo.md)
- [MessageCallbackObject](../interfaces/internal_.MessageCallbackObject.md)
- [MessagingControllerOptions](../interfaces/internal_.MessagingControllerOptions.md)
- [MetaCommon](../interfaces/internal_.MetaCommon.md)
- [MetaObject](../interfaces/internal_.MetaObject.md)
- [NonEditable](../interfaces/internal_.NonEditable.md)
- [Notification](../interfaces/internal_.Notification.md)
- [NotificationScopes](../interfaces/internal_.NotificationScopes.md)
- [ObjectACL](../interfaces/internal_.ObjectACL.md)
- [ObjectCommon](../interfaces/internal_.ObjectCommon.md)
- [ObjectOperationPermissions](../interfaces/internal_.ObjectOperationPermissions.md)
- [ObjectPermissions](../interfaces/internal_.ObjectPermissions.md)
- [ObjectsSettings](../interfaces/internal_.ObjectsSettings.md)
- [OtherCommon](../interfaces/internal_.OtherCommon.md)
- [OtherObject](../interfaces/internal_.OtherObject.md)
- [PartialAdapterObject](../interfaces/internal_.PartialAdapterObject.md)
- [PartialChannelObject](../interfaces/internal_.PartialChannelObject.md)
- [PartialDesignObject](../interfaces/internal_.PartialDesignObject.md)
- [PartialDeviceObject](../interfaces/internal_.PartialDeviceObject.md)
- [PartialEnumObject](../interfaces/internal_.PartialEnumObject.md)
- [PartialFolderObject](../interfaces/internal_.PartialFolderObject.md)
- [PartialGroupObject](../interfaces/internal_.PartialGroupObject.md)
- [PartialHostObject](../interfaces/internal_.PartialHostObject.md)
- [PartialInstanceObject](../interfaces/internal_.PartialInstanceObject.md)
- [PartialMetaObject](../interfaces/internal_.PartialMetaObject.md)
- [PartialOtherObject](../interfaces/internal_.PartialOtherObject.md)
- [PartialScheduleObject](../interfaces/internal_.PartialScheduleObject.md)
- [PartialScriptObject](../interfaces/internal_.PartialScriptObject.md)
- [PartialStateObject](../interfaces/internal_.PartialStateObject.md)
- [PartialUserObject](../interfaces/internal_.PartialUserObject.md)
- [PermissionSet](../interfaces/internal_.PermissionSet.md)
- [ReadDirResult](../interfaces/internal_.ReadDirResult.md)
- [RedisConnectionOptions](../interfaces/internal_.RedisConnectionOptions.md)
- [RmResult](../interfaces/internal_.RmResult.md)
- [ScheduleCommon](../interfaces/internal_.ScheduleCommon.md)
- [ScheduleObject](../interfaces/internal_.ScheduleObject.md)
- [ScriptCommon](../interfaces/internal_.ScriptCommon.md)
- [ScriptObject](../interfaces/internal_.ScriptObject.md)
- [SendToClientOptions](../interfaces/internal_.SendToClientOptions.md)
- [SendToOptions](../interfaces/internal_.SendToOptions.md)
- [SendToUserInterfaceClientOptions](../interfaces/internal_.SendToUserInterfaceClientOptions.md)
- [SendableMessage](../interfaces/internal_.SendableMessage.md)
- [SetStateChangedResult](../interfaces/internal_.SetStateChangedResult.md)
- [State](../interfaces/internal_.State.md)
- [StateACL](../interfaces/internal_.StateACL.md)
- [StateCommon](../interfaces/internal_.StateCommon.md)
- [StateObject](../interfaces/internal_.StateObject.md)
- [StatesSettings](../interfaces/internal_.StatesSettings.md)
- [SupportedMessages](../interfaces/internal_.SupportedMessages.md)
- [UserCommon](../interfaces/internal_.UserCommon.md)
- [UserInterfaceClientSubscribeReturnType](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md)
- [UserInterfaceSubscribeInfo](../interfaces/internal_.UserInterfaceSubscribeInfo.md)
- [UserObject](../interfaces/internal_.UserObject.md)
- [ValidateIdOptions](../interfaces/internal_.ValidateIdOptions.md)
- [VisWidget](../interfaces/internal_.VisWidget.md)
- [WriteFileOptions](../interfaces/internal_.WriteFileOptions.md)

### Type Aliases

- [Adapter](internal_.md#adapter)
- [AdapterScoped](internal_.md#adapterscoped)
- [AdapterScopedObject](internal_.md#adapterscopedobject)
- [AnyObject](internal_.md#anyobject)
- [AnyPartialObject](internal_.md#anypartialobject)
- [AtLeastOne](internal_.md#atleastone)
- [CalculatePermissionsCallback](internal_.md#calculatepermissionscallback)
- [Callback](internal_.md#callback)
- [CallbackReturnTypeOf](internal_.md#callbackreturntypeof)
- [ChangeFunction](internal_.md#changefunction)
- [ChangeFunction](internal_.md#changefunction-1)
- [Channel](internal_.md#channel)
- [CheckFileCallback](internal_.md#checkfilecallback)
- [CheckFileRightsCallback](internal_.md#checkfilerightscallback)
- [CheckGroupCallback](internal_.md#checkgroupcallback)
- [CheckPasswordCallback](internal_.md#checkpasswordcallback)
- [CheckStateCommand](internal_.md#checkstatecommand)
- [ChownFileCallback](internal_.md#chownfilecallback)
- [ChownObjectCallback](internal_.md#chownobjectcallback)
- [ClientUnsubscribeReason](internal_.md#clientunsubscribereason)
- [CommandsPermissions](internal_.md#commandspermissions)
- [CommandsPermissionsEntry](internal_.md#commandspermissionsentry)
- [CommandsPermissionsObject](internal_.md#commandspermissionsobject)
- [CommonType](internal_.md#commontype)
- [Config](internal_.md#config)
- [DeleteStateCallback](internal_.md#deletestatecallback)
- [Design](internal_.md#design)
- [EmptyCallback](internal_.md#emptycallback)
- [Enum](internal_.md#enum)
- [EnumList](internal_.md#enumlist)
- [ErrnoCallback](internal_.md#errnocallback)
- [ErrorCallback](internal_.md#errorcallback)
- [ErrorHandler](internal_.md#errorhandler)
- [ExtendObjectCallback](internal_.md#extendobjectcallback)
- [FileChangeHandler](internal_.md#filechangehandler)
- [FindObjectCallback](internal_.md#findobjectcallback)
- [GenericCallback](internal_.md#genericcallback)
- [GetBinaryStateCallback](internal_.md#getbinarystatecallback)
- [GetBinaryStatePromise](internal_.md#getbinarystatepromise)
- [GetCertificatesCallback](internal_.md#getcertificatescallback)
- [GetCertificatesPromiseReturnType](internal_.md#getcertificatespromisereturntype)
- [GetEncryptedConfigCallback](internal_.md#getencryptedconfigcallback)
- [GetEnumCallback](internal_.md#getenumcallback)
- [GetEnumsCallback](internal_.md#getenumscallback)
- [GetEnumsPromise](internal_.md#getenumspromise)
- [GetHistoryCallback](internal_.md#gethistorycallback)
- [GetHistoryResult](internal_.md#gethistoryresult)
- [GetKeysCallback](internal_.md#getkeyscallback)
- [GetObjectCallback](internal_.md#getobjectcallback)
- [GetObjectListCallback](internal_.md#getobjectlistcallback)
- [GetObjectListPromise](internal_.md#getobjectlistpromise)
- [GetObjectPromise](internal_.md#getobjectpromise)
- [GetObjectViewCallback](internal_.md#getobjectviewcallback)
- [GetObjectViewPromise](internal_.md#getobjectviewpromise)
- [GetObjectsCallback](internal_.md#getobjectscallback)
- [GetObjectsCallback3](internal_.md#getobjectscallback3)
- [GetObjectsCallbackTyped](internal_.md#getobjectscallbacktyped)
- [GetObjectsPromise](internal_.md#getobjectspromise)
- [GetObjectsPromiseTyped](internal_.md#getobjectspromisetyped)
- [GetSessionCallback](internal_.md#getsessioncallback)
- [GetStateCallback](internal_.md#getstatecallback)
- [GetStatePromise](internal_.md#getstatepromise)
- [GetStatesCallback](internal_.md#getstatescallback)
- [GetStatesPromise](internal_.md#getstatespromise)
- [GetUserGroupCallbackNoError](internal_.md#getusergroupcallbacknoerror)
- [GetUserGroupPromiseReturn](internal_.md#getusergrouppromisereturn)
- [Group](internal_.md#group)
- [Host](internal_.md#host)
- [InferGetObjectViewItemType](internal_.md#infergetobjectviewitemtype)
- [Instance](internal_.md#instance)
- [InstanceMode](internal_.md#instancemode)
- [InternalLogger](internal_.md#internallogger)
- [Interval](internal_.md#interval)
- [Languages](internal_.md#languages)
- [LogLevel](internal_.md#loglevel)
- [MaybePromise](internal_.md#maybepromise)
- [MessageCallback](internal_.md#messagecallback)
- [MessageHandler](internal_.md#messagehandler)
- [MessageUnsubscribeReason](internal_.md#messageunsubscribereason)
- [Meta](internal_.md#meta)
- [Misc](internal_.md#misc)
- [NonNullCallbackReturnTypeOf](internal_.md#nonnullcallbackreturntypeof)
- [Object](internal_.md#object)
- [ObjectChangeHandler](internal_.md#objectchangehandler)
- [ObjectIdToObjectType](internal_.md#objectidtoobjecttype)
- [ObjectType](internal_.md#objecttype)
- [OptionalCallback](internal_.md#optionalcallback)
- [PartialChartObject](internal_.md#partialchartobject)
- [PartialObjectWorker](internal_.md#partialobjectworker)
- [Pattern](internal_.md#pattern)
- [Pattern](internal_.md#pattern-1)
- [Plugin](internal_.md#plugin)
- [ReadDirCallback](internal_.md#readdircallback)
- [ReadDirPromise](internal_.md#readdirpromise)
- [ReadFileCallback](internal_.md#readfilecallback)
- [ReadFilePromise](internal_.md#readfilepromise)
- [ReadyHandler](internal_.md#readyhandler)
- [RmCallback](internal_.md#rmcallback)
- [ScriptOrChannel](internal_.md#scriptorchannel)
- [SecondParameterOf](internal_.md#secondparameterof)
- [SendToAllClientOptions](internal_.md#sendtoallclientoptions)
- [Session](internal_.md#session)
- [SetObjectCallback](internal_.md#setobjectcallback)
- [SetObjectPromise](internal_.md#setobjectpromise)
- [SetStateCallback](internal_.md#setstatecallback)
- [SetStateChangedCallback](internal_.md#setstatechangedcallback)
- [SetStateChangedPromise](internal_.md#setstatechangedpromise)
- [SetStatePromise](internal_.md#setstatepromise)
- [SettableObjectWorker](internal_.md#settableobjectworker)
- [SettableState](internal_.md#settablestate)
- [State](internal_.md#state)
- [StateChangeHandler](internal_.md#statechangehandler)
- [StateValue](internal_.md#statevalue)
- [StringOrTranslated](internal_.md#stringortranslated)
- [Timeout](internal_.md#timeout)
- [TimeoutCallback](internal_.md#timeoutcallback)
- [Translated](internal_.md#translated)
- [UnloadHandler](internal_.md#unloadhandler)
- [User](internal_.md#user)
- [UserChangeFunction](internal_.md#userchangefunction)
- [UserInterfaceClientRemoveMessage](internal_.md#userinterfaceclientremovemessage)
- [UserInterfaceClientSubscribeHandler](internal_.md#userinterfaceclientsubscribehandler)
- [UserInterfaceClientUnsubscribeHandler](internal_.md#userinterfaceclientunsubscribehandler)
- [UserInterfaceClientUnsubscribeReason](internal_.md#userinterfaceclientunsubscribereason)
- [UserInterfaceUnsubscribeInfo](internal_.md#userinterfaceunsubscribeinfo)
- [UserInterfaceUnsubscribeInfoBaseObject](internal_.md#userinterfaceunsubscribeinfobaseobject)
- [WelcomeScreenEntry](internal_.md#welcomescreenentry)

## Type Aliases

### Adapter

Ƭ **Adapter**: \`system.adapter.${string}\`

#### Defined in

[types-dev/objects.d.ts:81](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L81)

___

### AdapterScoped

Ƭ **AdapterScoped**: \`${string}.${number}.${string}\`

#### Defined in

[types-dev/objects.d.ts:94](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L94)

___

### AdapterScopedObject

Ƭ **AdapterScopedObject**: [`FolderObject`](../interfaces/internal_.FolderObject.md) \| [`DeviceObject`](../interfaces/internal_.DeviceObject.md) \| [`ChannelObject`](../interfaces/internal_.ChannelObject.md) \| [`StateObject`](../interfaces/internal_.StateObject.md)

All objects that usually appear in an adapter scope

#### Defined in

[types-dev/objects.d.ts:901](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L901)

___

### AnyObject

Ƭ **AnyObject**: [`StateObject`](../interfaces/internal_.StateObject.md) \| [`ChannelObject`](../interfaces/internal_.ChannelObject.md) \| [`DeviceObject`](../interfaces/internal_.DeviceObject.md) \| [`FolderObject`](../interfaces/internal_.FolderObject.md) \| [`EnumObject`](../interfaces/internal_.EnumObject.md) \| [`MetaObject`](../interfaces/internal_.MetaObject.md) \| [`HostObject`](../interfaces/internal_.HostObject.md) \| [`AdapterObject`](../interfaces/internal_.AdapterObject.md) \| [`InstanceObject`](../interfaces/internal_.InstanceObject.md) \| [`UserObject`](../interfaces/internal_.UserObject.md) \| [`GroupObject`](../interfaces/internal_.GroupObject.md) \| [`ScriptObject`](../interfaces/internal_.ScriptObject.md) \| [`ChartObject`](../interfaces/internal_.ChartObject.md) \| [`ScheduleObject`](../interfaces/internal_.ScheduleObject.md) \| [`OtherObject`](../interfaces/internal_.OtherObject.md) \| [`DesignObject`](../interfaces/internal_.DesignObject.md)

#### Defined in

[types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L864)

___

### AnyPartialObject

Ƭ **AnyPartialObject**: [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) \| [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) \| [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) \| [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) \| [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) \| [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) \| [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) \| [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) \| [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) \| [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) \| [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) \| [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) \| [`PartialChartObject`](internal_.md#partialchartobject) \| [`PartialScheduleObject`](../interfaces/internal_.PartialScheduleObject.md) \| [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) \| [`PartialDesignObject`](../interfaces/internal_.PartialDesignObject.md)

#### Defined in

[types-dev/objects.d.ts:882](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L882)

___

### AtLeastOne

Ƭ **AtLeastOne**<`T`, `Req`, `Opt`\>: { [K in keyof Req]: Omit<Opt, K\> & { [P in K]: Req[P] } }[keyof `Req`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Req` | { [K in keyof T]-?: T[K] } |
| `Opt` | { [K in keyof T]?: T[K] } |

#### Defined in

[types-dev/index.d.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L10)

___

### CalculatePermissionsCallback

Ƭ **CalculatePermissionsCallback**: (`result`: [`PermissionSet`](../interfaces/internal_.PermissionSet.md)) => `void`

#### Type declaration

▸ (`result`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`PermissionSet`](../interfaces/internal_.PermissionSet.md) |

##### Returns

`void`

#### Defined in

[adapter/src/lib/_Types.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L236)

___

### Callback

Ƭ **Callback**: (...`args`: `any`[]) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`...args`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/validator.ts:4](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/adapter/validator.ts#L4)

___

### CallbackReturnTypeOf

Ƭ **CallbackReturnTypeOf**<`T`\>: [`SecondParameterOf`](internal_.md#secondparameterof)<`T`\>

Infers the return type from a callback-style API and leaves null and undefined in

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `any` |

#### Defined in

[types-dev/index.d.ts:395](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L395)

___

### ChangeFunction

Ƭ **ChangeFunction**: (`id`: `string`, `state`: [`State`](../interfaces/internal_.State.md) \| [`Message`](../interfaces/internal_.Message.md) \| ``null``) => `void`

#### Type declaration

▸ (`id`, `state`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`Message`](../interfaces/internal_.Message.md) \| ``null`` |

##### Returns

`void`

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:25

___

### ChangeFunction

Ƭ **ChangeFunction**: (`id`: `string`, `object`: [`Object`](internal_.md#object) \| ``null``) => `void`

#### Type declaration

▸ (`id`, `object`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `object` | [`Object`](internal_.md#object) \| ``null`` |

##### Returns

`void`

#### Defined in

db-objects-redis/build/lib/objects/objectsInRedisClient.d.ts:5

___

### Channel

Ƭ **Channel**: \`script.js.${"common" \| "global"}\` \| \`${string}.${number}.info\`

#### Defined in

[types-dev/objects.d.ts:71](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L71)

___

### CheckFileCallback

Ƭ **CheckFileCallback**: (`checkFailed`: `boolean`, `options?`: [`CallOptions`](../interfaces/internal_.CallOptions.md), `fileOptions?`: { `notExists`: `boolean`  }) => `void`

#### Type declaration

▸ (`checkFailed`, `options?`, `fileOptions?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `checkFailed` | `boolean` |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `fileOptions?` | `Object` |
| `fileOptions.notExists` | `boolean` |

##### Returns

`void`

#### Defined in

db-objects-redis/build/lib/objects/objectsInRedisClient.d.ts:39

___

### CheckFileRightsCallback

Ƭ **CheckFileRightsCallback**: (`err`: `Error` \| ``null`` \| `undefined`, `options`: `Record`<`string`, `any`\>, `opt?`: `any`) => `void`

#### Type declaration

▸ (`err`, `options`, `opt?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` \| ``null`` \| `undefined` |
| `options` | `Record`<`string`, `any`\> |
| `opt?` | `any` |

##### Returns

`void`

#### Defined in

db-objects-redis/build/lib/objects/objectsUtils.d.ts:37

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

[adapter/src/lib/_Types.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L220)

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

[adapter/src/lib/_Types.ts:200](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L200)

___

### CheckStateCommand

Ƭ **CheckStateCommand**: ``"getState"`` \| ``"setState"`` \| ``"delState"``

#### Defined in

[adapter/src/lib/_Types.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L173)

___

### ChownFileCallback

Ƭ **ChownFileCallback**: (`err?`: `NodeJS.ErrnoException` \| ``null``, `processed?`: [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[]) => `void`

#### Type declaration

▸ (`err?`, `processed?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `NodeJS.ErrnoException` \| ``null`` |
| `processed?` | [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[] |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:460](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L460)

___

### ChownObjectCallback

Ƭ **ChownObjectCallback**: (`err?`: `NodeJS.ErrnoException` \| ``null``, `list?`: [`Object`](internal_.md#object)[]) => `void`

#### Type declaration

▸ (`err?`, `list?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `NodeJS.ErrnoException` \| ``null`` |
| `list?` | [`Object`](internal_.md#object)[] |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:471](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L471)

___

### ClientUnsubscribeReason

Ƭ **ClientUnsubscribeReason**: [`MessageUnsubscribeReason`](internal_.md#messageunsubscribereason) \| ``"clientSubscribeError"``

#### Defined in

[adapter/src/lib/_Types.ts:61](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L61)

___

### CommandsPermissions

Ƭ **CommandsPermissions**: [`CommandsPermissionsObject`](internal_.md#commandspermissionsobject) \| [`CommandsPermissionsEntry`](internal_.md#commandspermissionsentry)[]

#### Defined in

[adapter/src/lib/_Types.ts:234](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L234)

___

### CommandsPermissionsEntry

Ƭ **CommandsPermissionsEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `operation` | `string` |
| `type` | ``"object"`` \| ``"state"`` \| ``""`` \| ``"other"`` \| ``"file"`` |

#### Defined in

[adapter/src/lib/_Types.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L229)

___

### CommandsPermissionsObject

Ƭ **CommandsPermissionsObject**: `Object`

#### Index signature

▪ [permission: `string`]: [`CommandsPermissionsEntry`](internal_.md#commandspermissionsentry)

#### Defined in

[adapter/src/lib/_Types.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L230)

___

### CommonType

Ƭ **CommonType**: ``"number"`` \| ``"string"`` \| ``"boolean"`` \| ``"array"`` \| ``"object"`` \| ``"mixed"`` \| ``"file"``

#### Defined in

[types-dev/objects.d.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L154)

___

### Config

Ƭ **Config**: \`system.${"certificates" \| "config" \| "repositories"}\`

#### Defined in

[types-dev/objects.d.ts:89](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L89)

___

### DeleteStateCallback

Ƭ **DeleteStateCallback**: (`err?`: `Error` \| ``null``, `id?`: `string`) => `void`

#### Type declaration

▸ (`err?`, `id?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `id?` | `string` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:412](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L412)

___

### Design

Ƭ **Design**: \`\_design/${string}\`

#### Defined in

[types-dev/objects.d.ts:91](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L91)

___

### EmptyCallback

Ƭ **EmptyCallback**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:331](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L331)

___

### Enum

Ƭ **Enum**: \`enum.${string}\`

#### Defined in

[types-dev/objects.d.ts:77](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L77)

___

### EnumList

Ƭ **EnumList**: `string` \| `string`[]

#### Defined in

[types-dev/index.d.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L260)

___

### ErrnoCallback

Ƭ **ErrnoCallback**: (`err?`: `NodeJS.ErrnoException` \| ``null``) => `void`

#### Type declaration

▸ (`err?`): `void`

Special variant of ErrorCallback for methods where Node.js returns an ErrnoException

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `NodeJS.ErrnoException` \| ``null`` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:334](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L334)

___

### ErrorCallback

Ƭ **ErrorCallback**: (`err?`: `Error` \| ``null``) => `void`

#### Type declaration

▸ (`err?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:332](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L332)

___

### ErrorHandler

Ƭ **ErrorHandler**: (`err`: `Error`) => `boolean`

#### Type declaration

▸ (`err`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

##### Returns

`boolean`

#### Defined in

[types-dev/index.d.ts:329](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L329)

___

### ExtendObjectCallback

Ƭ **ExtendObjectCallback**: (`err?`: `Error` \| ``null``, `result?`: { `id`: `string` ; `value`: [`Object`](internal_.md#object)  }, `id?`: `string`) => `void`

#### Type declaration

▸ (`err?`, `result?`, `id?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `result?` | `Object` |
| `result.id` | `string` |
| `result.value` | [`Object`](internal_.md#object) |
| `id?` | `string` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:499](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L499)

___

### FileChangeHandler

Ƭ **FileChangeHandler**: (`id`: `string`, `fileName`: `string`, `size`: `number` \| ``null``) => `void`

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

[types-dev/index.d.ts:326](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L326)

___

### FindObjectCallback

Ƭ **FindObjectCallback**: (`err?`: `Error` \| ``null``, `id?`: `string`, `name?`: [`StringOrTranslated`](internal_.md#stringortranslated)) => `void`

#### Type declaration

▸ (`err?`, `id?`, `name?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `id?` | `string` |
| `name?` | [`StringOrTranslated`](internal_.md#stringortranslated) |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L370)

___

### GenericCallback

Ƭ **GenericCallback**<`T`\>: (`err?`: `Error` \| ``null``, `result?`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`err?`, `result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `result?` | `T` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L336)

___

### GetBinaryStateCallback

Ƭ **GetBinaryStateCallback**: (`err?`: `Error` \| ``null``, `state?`: `Buffer`) => `void`

#### Type declaration

▸ (`err?`, `state?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `state?` | `Buffer` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:403](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L403)

___

### GetBinaryStatePromise

Ƭ **GetBinaryStatePromise**: `Promise`<[`CallbackReturnTypeOf`](internal_.md#callbackreturntypeof)<[`GetBinaryStateCallback`](internal_.md#getbinarystatecallback)\>\>

#### Defined in

[types-dev/index.d.ts:404](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L404)

___

### GetCertificatesCallback

Ƭ **GetCertificatesCallback**: (`err?`: `Error` \| ``null``, `certs?`: [`Certificates`](../interfaces/internal_.Certificates.md), `useLetsEncryptCert?`: `boolean`) => `void`

#### Type declaration

▸ (`err?`, `certs?`, `useLetsEncryptCert?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `certs?` | [`Certificates`](../interfaces/internal_.Certificates.md) |
| `useLetsEncryptCert?` | `boolean` |

##### Returns

`void`

#### Defined in

[adapter/src/lib/_Types.ts:254](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L254)

___

### GetCertificatesPromiseReturnType

Ƭ **GetCertificatesPromiseReturnType**: [cert: Certificates, useLetsEncryptCert?: boolean]

#### Defined in

[adapter/src/lib/_Types.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L260)

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

[adapter/src/lib/_Types.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L273)

___

### GetEnumCallback

Ƭ **GetEnumCallback**: (`err?`: `Error` \| ``null``, `enums?`: `Record`<`string`, [`EnumObject`](../interfaces/internal_.EnumObject.md)\>, `requestedEnum?`: `string`) => `void`

#### Type declaration

▸ (`err?`, `enums?`, `requestedEnum?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `enums?` | `Record`<`string`, [`EnumObject`](../interfaces/internal_.EnumObject.md)\> |
| `requestedEnum?` | `string` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:350](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L350)

___

### GetEnumsCallback

Ƭ **GetEnumsCallback**: (`err?`: `Error` \| ``null``, `result?`: { `[groupName: string]`: `Record`<`string`, [`EnumObject`](../interfaces/internal_.EnumObject.md)\>;  }) => `void`

#### Type declaration

▸ (`err?`, `result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `result?` | `Object` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L351)

___

### GetEnumsPromise

Ƭ **GetEnumsPromise**: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`GetEnumsCallback`](internal_.md#getenumscallback)\>\>

#### Defined in

[types-dev/index.d.ts:357](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L357)

___

### GetHistoryCallback

Ƭ **GetHistoryCallback**: (`err`: `Error` \| ``null``, `result?`: [`GetHistoryResult`](internal_.md#gethistoryresult), `step?`: `number`, `sessionId?`: `string`) => `void`

#### Type declaration

▸ (`err`, `result?`, `step?`, `sessionId?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` \| ``null`` |
| `result?` | [`GetHistoryResult`](internal_.md#gethistoryresult) |
| `step?` | `number` |
| `sessionId?` | `string` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:415](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L415)

___

### GetHistoryResult

Ƭ **GetHistoryResult**: [`State`](../interfaces/internal_.State.md) & { `id?`: `string`  }[]

#### Defined in

[types-dev/index.d.ts:414](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L414)

___

### GetKeysCallback

Ƭ **GetKeysCallback**: (`err?`: `Error` \| ``null``, `list?`: `string`[]) => `void`

#### Type declaration

▸ (`err?`, `list?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `list?` | `string`[] |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:473](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L473)

___

### GetObjectCallback

Ƭ **GetObjectCallback**<`T`\>: (`err?`: `Error` \| ``null``, `obj?`: [`ObjectIdToObjectType`](internal_.md#objectidtoobjecttype)<`T`\> \| ``null``) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` = `string` |

#### Type declaration

▸ (`err?`, `obj?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `obj?` | [`ObjectIdToObjectType`](internal_.md#objectidtoobjecttype)<`T`\> \| ``null`` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:344](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L344)

___

### GetObjectListCallback

Ƭ **GetObjectListCallback**<`T`\>: (`err?`: `Error` \| ``null``, `result?`: { `rows`: [`GetObjectListItem`](../interfaces/internal_.GetObjectListItem.md)<`T`\>[]  }) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Object`](internal_.md#object) |

#### Type declaration

▸ (`err?`, `result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `result?` | `Object` |
| `result.rows` | [`GetObjectListItem`](../interfaces/internal_.GetObjectListItem.md)<`T`\>[] |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L493)

___

### GetObjectListPromise

Ƭ **GetObjectListPromise**: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`GetObjectListCallback`](internal_.md#getobjectlistcallback)<[`Object`](internal_.md#object)\>\>\>

#### Defined in

[types-dev/index.d.ts:497](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L497)

___

### GetObjectPromise

Ƭ **GetObjectPromise**<`T`\>: `Promise`<[`CallbackReturnTypeOf`](internal_.md#callbackreturntypeof)<[`GetObjectCallback`](internal_.md#getobjectcallback)<`T`\>\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` = `string` |

#### Defined in

[types-dev/index.d.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L348)

___

### GetObjectViewCallback

Ƭ **GetObjectViewCallback**<`T`\>: (`err?`: `Error` \| ``null``, `result?`: { `rows`: [`GetObjectViewItem`](../interfaces/internal_.GetObjectViewItem.md)<`T`\>[]  }) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyObject`](internal_.md#anyobject) |

#### Type declaration

▸ (`err?`, `result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `result?` | `Object` |
| `result.rows` | [`GetObjectViewItem`](../interfaces/internal_.GetObjectViewItem.md)<`T`\>[] |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:481](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L481)

___

### GetObjectViewPromise

Ƭ **GetObjectViewPromise**<`T`\>: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`GetObjectViewCallback`](internal_.md#getobjectviewcallback)<`T`\>\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnyObject`](internal_.md#anyobject) |

#### Defined in

[types-dev/index.d.ts:485](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L485)

___

### GetObjectsCallback

Ƭ **GetObjectsCallback**: (`err?`: `Error` \| ``null``, `objects?`: `Record`<`string`, [`Object`](internal_.md#object)\>) => `void`

#### Type declaration

▸ (`err?`, `objects?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `objects?` | `Record`<`string`, [`Object`](internal_.md#object)\> |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:359](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L359)

___

### GetObjectsCallback3

Ƭ **GetObjectsCallback3**<`T`\>: (`err?`: `Error` \| ``null``, `result?`: `T`[]) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`BaseObject`](../interfaces/internal_.BaseObject.md) |

#### Type declaration

▸ (`err?`, `result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `result?` | `T`[] |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:380](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L380)

___

### GetObjectsCallbackTyped

Ƭ **GetObjectsCallbackTyped**<`T`\>: (`err?`: `Error` \| ``null``, `objects?`: `Record`<`string`, [`AnyObject`](internal_.md#anyobject) & { `type`: `T`  }\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](internal_.md#objecttype) |

#### Type declaration

▸ (`err?`, `objects?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `objects?` | `Record`<`string`, [`AnyObject`](internal_.md#anyobject) & { `type`: `T`  }\> |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L362)

___

### GetObjectsPromise

Ƭ **GetObjectsPromise**: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`GetObjectsCallback`](internal_.md#getobjectscallback)\>\>

#### Defined in

[types-dev/index.d.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L360)

___

### GetObjectsPromiseTyped

Ƭ **GetObjectsPromiseTyped**<`T`\>: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`GetObjectsCallbackTyped`](internal_.md#getobjectscallbacktyped)<`T`\>\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](internal_.md#objecttype) |

#### Defined in

[types-dev/index.d.ts:366](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L366)

___

### GetSessionCallback

Ƭ **GetSessionCallback**: (`session`: [`Session`](internal_.md#session)) => `void`

#### Type declaration

▸ (`session`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `session` | [`Session`](internal_.md#session) |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:505](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L505)

___

### GetStateCallback

Ƭ **GetStateCallback**: (`err?`: `Error` \| ``null``, `state?`: [`State`](../interfaces/internal_.State.md) \| ``null``) => `void`

#### Type declaration

▸ (`err?`, `state?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `state?` | [`State`](../interfaces/internal_.State.md) \| ``null`` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:397](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L397)

___

### GetStatePromise

Ƭ **GetStatePromise**: `Promise`<[`CallbackReturnTypeOf`](internal_.md#callbackreturntypeof)<[`GetStateCallback`](internal_.md#getstatecallback)\>\>

#### Defined in

[types-dev/index.d.ts:398](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L398)

___

### GetStatesCallback

Ƭ **GetStatesCallback**: (`err?`: `Error` \| ``null``, `states?`: `Record`<`string`, [`State`](../interfaces/internal_.State.md)\>) => `void`

#### Type declaration

▸ (`err?`, `states?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `states?` | `Record`<`string`, [`State`](../interfaces/internal_.State.md)\> |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:400](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L400)

___

### GetStatesPromise

Ƭ **GetStatesPromise**: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`GetStatesCallback`](internal_.md#getstatescallback)\>\>

#### Defined in

[types-dev/index.d.ts:401](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L401)

___

### GetUserGroupCallbackNoError

Ƭ **GetUserGroupCallbackNoError**: (`user`: `string`, `groups`: `string`[], `acl`: [`ObjectPermissions`](../interfaces/internal_.ObjectPermissions.md)) => `void`

#### Type declaration

▸ (`user`, `groups`, `acl`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `groups` | `string`[] |
| `acl` | [`ObjectPermissions`](../interfaces/internal_.ObjectPermissions.md) |

##### Returns

`void`

#### Defined in

db-objects-redis/build/lib/objects/objectsInRedisClient.d.ts:6

___

### GetUserGroupPromiseReturn

Ƭ **GetUserGroupPromiseReturn**: [user: string, groups: string[], acl: ObjectPermissions]

#### Defined in

db-objects-redis/build/lib/objects/objectsUtils.d.ts:56

___

### Group

Ƭ **Group**: \`system.group.${string}\`

#### Defined in

[types-dev/objects.d.ts:83](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L83)

___

### Host

Ƭ **Host**: \`system.host.${string}\`

#### Defined in

[types-dev/objects.d.ts:87](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L87)

___

### InferGetObjectViewItemType

Ƭ **InferGetObjectViewItemType**<`Design`, `View`\>: `Design` extends ``"system"`` ? `View` extends ``"host"`` ? [`HostObject`](../interfaces/internal_.HostObject.md) : `View` extends ``"adapter"`` ? [`AdapterObject`](../interfaces/internal_.AdapterObject.md) : `View` extends ``"instance"`` ? [`InstanceObject`](../interfaces/internal_.InstanceObject.md) : `View` extends ``"meta"`` ? [`MetaObject`](../interfaces/internal_.MetaObject.md) : `View` extends ``"device"`` ? [`DeviceObject`](../interfaces/internal_.DeviceObject.md) : `View` extends ``"channel"`` ? [`ChannelObject`](../interfaces/internal_.ChannelObject.md) : `View` extends ``"state"`` ? [`StateObject`](../interfaces/internal_.StateObject.md) : `View` extends ``"folder"`` ? [`FolderObject`](../interfaces/internal_.FolderObject.md) : `View` extends ``"enum"`` ? [`EnumObject`](../interfaces/internal_.EnumObject.md) : `View` extends ``"script"`` ? [`ScriptObject`](../interfaces/internal_.ScriptObject.md) : `View` extends ``"group"`` ? [`GroupObject`](../interfaces/internal_.GroupObject.md) : `View` extends ``"user"`` ? [`UserObject`](../interfaces/internal_.UserObject.md) : `View` extends ``"chart"`` ? [`ChartObject`](../interfaces/internal_.ChartObject.md) : `View` extends ``"schedule"`` ? [`ScheduleObject`](../interfaces/internal_.ScheduleObject.md) : `View` extends ``"config"`` ? [`OtherObject`](../interfaces/internal_.OtherObject.md) & { `type`: ``"config"``  } : `View` extends ``"custom"`` ? `NonNullable`<[`StateObject`](../interfaces/internal_.StateObject.md)[``"common"``][``"custom"``]\> : [`Object`](internal_.md#object) : `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` |
| `View` | extends `string` |

#### Defined in

[types-dev/objects.d.ts:942](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L942)

___

### Instance

Ƭ **Instance**: \`system.adapter.${string}.${number}\`

#### Defined in

[types-dev/objects.d.ts:79](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L79)

___

### InstanceMode

Ƭ **InstanceMode**: ``"none"`` \| ``"daemon"`` \| ``"subscribe"`` \| ``"schedule"`` \| ``"once"`` \| ``"extension"``

#### Defined in

[types-dev/objects.d.ts:315](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L315)

___

### InternalLogger

Ƭ **InternalLogger**: `Omit`<[`Logger`](../interfaces/internal_.Logger.md), ``"level"``\>

#### Defined in

common/build/lib/common/tools.d.ts:563

___

### Interval

Ƭ **Interval**: `number` & { `__ioBrokerBrand`: ``"Interval"``  }

#### Defined in

[types-dev/index.d.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L508)

___

### Languages

Ƭ **Languages**: ``"en"`` \| ``"de"`` \| ``"ru"`` \| ``"pt"`` \| ``"nl"`` \| ``"fr"`` \| ``"it"`` \| ``"es"`` \| ``"pl"`` \| ``"uk"`` \| ``"zh-cn"``

#### Defined in

[types-dev/objects.d.ts:148](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L148)

___

### LogLevel

Ƭ **LogLevel**: ``"silly"`` \| ``"debug"`` \| ``"info"`` \| ``"warn"`` \| ``"error"``

#### Defined in

[types-dev/index.d.ts:201](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L201)

___

### MaybePromise

Ƭ **MaybePromise**: `Promise`<`void`\> \| `void`

#### Defined in

[adapter/src/lib/_Types.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L175)

___

### MessageCallback

Ƭ **MessageCallback**: (`response?`: [`Message`](../interfaces/internal_.Message.md) \| `Error`) => `void`

#### Type declaration

▸ (`response?`): `void`

Due to backward compatibility first param can be result or error

##### Parameters

| Name | Type |
| :------ | :------ |
| `response?` | [`Message`](../interfaces/internal_.Message.md) \| `Error` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:339](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L339)

___

### MessageHandler

Ƭ **MessageHandler**: (`obj`: [`Message`](../interfaces/internal_.Message.md)) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`obj`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Message`](../interfaces/internal_.Message.md) |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[types-dev/index.d.ts:327](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L327)

___

### MessageUnsubscribeReason

Ƭ **MessageUnsubscribeReason**: ``"client"`` \| ``"disconnect"``

#### Defined in

[adapter/src/lib/_Types.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L60)

___

### Meta

Ƭ **Meta**: \`${string}.${number}\` \| \`${string}.${"meta" \| "admin"}\` \| \`${string}.meta.${string}\` \| \`${string}.${number}.meta.${string}\`

#### Defined in

[types-dev/objects.d.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L60)

___

### Misc

Ƭ **Misc**: \`system.host.${string}.${string}\` \| \`0\_userdata.0.${string}\`

#### Defined in

[types-dev/objects.d.ts:68](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L68)

___

### NonNullCallbackReturnTypeOf

Ƭ **NonNullCallbackReturnTypeOf**<`T`\>: `Exclude`<[`SecondParameterOf`](internal_.md#secondparameterof)<`T`\>, ``null`` \| `undefined`\>

Infers the return type from a callback-style API and strips out null and undefined

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `any` |

#### Defined in

[types-dev/index.d.ts:390](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L390)

___

### Object

Ƭ **Object**: [`AnyObject`](internal_.md#anyobject) & { `common`: `Record`<`string`, `any`\> ; `native`: `Record`<`string`, `any`\>  }

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L905)

___

### ObjectChangeHandler

Ƭ **ObjectChangeHandler**: (`id`: `string`, `obj`: [`Object`](internal_.md#object) \| ``null`` \| `undefined`) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`id`, `obj`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | [`Object`](internal_.md#object) \| ``null`` \| `undefined` |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[types-dev/index.d.ts:324](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L324)

___

### ObjectIdToObjectType

Ƭ **ObjectIdToObjectType**<`T`, `Read`\>: `T` extends [`State`](internal_.md#state) ? [`StateObject`](../interfaces/internal_.StateObject.md) : `T` extends [`Instance`](internal_.md#instance) ? [`InstanceObject`](../interfaces/internal_.InstanceObject.md) : `T` extends [`Adapter`](internal_.md#adapter) ? [`AdapterObject`](../interfaces/internal_.AdapterObject.md) : `T` extends [`Channel`](internal_.md#channel) ? [`ChannelObject`](../interfaces/internal_.ChannelObject.md) : `T` extends [`Meta`](internal_.md#meta) ? [`MetaObject`](../interfaces/internal_.MetaObject.md) : `T` extends [`Misc`](internal_.md#misc) ? [`AdapterScopedObject`](internal_.md#adapterscopedobject) : `T` extends [`ScriptOrChannel`](internal_.md#scriptorchannel) ? [`ScriptObject`](../interfaces/internal_.ScriptObject.md) \| [`ChannelObject`](../interfaces/internal_.ChannelObject.md) : `T` extends [`Enum`](internal_.md#enum) ? [`EnumObject`](../interfaces/internal_.EnumObject.md) : `T` extends [`Group`](internal_.md#group) ? [`GroupObject`](../interfaces/internal_.GroupObject.md) : `T` extends [`User`](internal_.md#user) ? [`UserObject`](../interfaces/internal_.UserObject.md) : `T` extends [`Host`](internal_.md#host) ? [`HostObject`](../interfaces/internal_.HostObject.md) : `T` extends [`Design`](internal_.md#design) ? [`DesignObject`](../interfaces/internal_.DesignObject.md) : `T` extends [`Config`](internal_.md#config) ? [`OtherObject`](../interfaces/internal_.OtherObject.md) & { `type`: ``"config"``  } : `T` extends [`AdapterScoped`](internal_.md#adapterscoped) ? [`AdapterScopedObject`](internal_.md#adapterscopedobject) : `Read` extends ``"read"`` ? [`Object`](internal_.md#object) : [`AnyObject`](internal_.md#anyobject)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |
| `Read` | extends ``"read"`` \| ``"write"`` = ``"read"`` |

#### Defined in

[types-dev/objects.d.ts:113](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L113)

___

### ObjectType

Ƭ **ObjectType**: ``"state"`` \| ``"channel"`` \| ``"device"`` \| ``"folder"`` \| ``"enum"`` \| ``"adapter"`` \| ``"config"`` \| ``"group"`` \| ``"host"`` \| ``"instance"`` \| ``"meta"`` \| ``"script"`` \| ``"user"`` \| ``"chart"`` \| ``"schedule"`` \| ``"design"``

Defines the existing object types in ioBroker

#### Defined in

[types-dev/objects.d.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L38)

___

### OptionalCallback

Ƭ **OptionalCallback**: `undefined` \| [`Callback`](internal_.md#callback)

#### Defined in

[adapter/src/lib/adapter/validator.ts:5](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/adapter/validator.ts#L5)

___

### PartialChartObject

Ƭ **PartialChartObject**: [`ChartObject`](../interfaces/internal_.ChartObject.md)

#### Defined in

[types-dev/objects.d.ts:746](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L746)

___

### PartialObjectWorker

Ƭ **PartialObjectWorker**<`T`\>: `T` extends [`AnyObject`](internal_.md#anyobject) ? [`AnyPartialObject`](internal_.md#anypartialobject) & { `type?`: `T`[``"type"``]  } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L918)

___

### Pattern

Ƭ **Pattern**: `string` \| `string`[]

#### Defined in

[adapter/src/lib/_Types.ts:122](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L122)

___

### Pattern

Ƭ **Pattern**: `string` \| `string`[]

#### Defined in

[adapter/src/lib/adapter/validator.ts:6](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/adapter/validator.ts#L6)

___

### Plugin

Ƭ **Plugin**: `Record`<`string`, `any`\>

#### Defined in

[types-dev/index.d.ts:262](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L262)

___

### ReadDirCallback

Ƭ **ReadDirCallback**: (`err?`: `NodeJS.ErrnoException` \| ``null``, `entries?`: [`ReadDirResult`](../interfaces/internal_.ReadDirResult.md)[]) => `void`

#### Type declaration

▸ (`err?`, `entries?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `NodeJS.ErrnoException` \| ``null`` |
| `entries?` | [`ReadDirResult`](../interfaces/internal_.ReadDirResult.md)[] |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:437](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L437)

___

### ReadDirPromise

Ƭ **ReadDirPromise**: `Promise`<[`ReadDirResult`](../interfaces/internal_.ReadDirResult.md)[]\>

#### Defined in

[types-dev/index.d.ts:438](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L438)

___

### ReadFileCallback

Ƭ **ReadFileCallback**: (`err?`: `NodeJS.ErrnoException` \| ``null``, `data?`: `Buffer` \| `string`, `mimeType?`: `string`) => `void`

#### Type declaration

▸ (`err?`, `data?`, `mimeType?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `NodeJS.ErrnoException` \| ``null`` |
| `data?` | `Buffer` \| `string` |
| `mimeType?` | `string` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L440)

___

### ReadFilePromise

Ƭ **ReadFilePromise**: `Promise`<{ `file`: `string` \| `Buffer` ; `mimeType?`: `string`  }\>

#### Defined in

[types-dev/index.d.ts:441](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L441)

___

### ReadyHandler

Ƭ **ReadyHandler**: () => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (): `void` \| `Promise`<`void`\>

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[types-dev/index.d.ts:323](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L323)

___

### RmCallback

Ƭ **RmCallback**: (`err?`: `NodeJS.ErrnoException` \| ``null``, `entries?`: [`RmResult`](../interfaces/internal_.RmResult.md)[]) => `void`

#### Type declaration

▸ (`err?`, `entries?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `NodeJS.ErrnoException` \| ``null`` |
| `entries?` | [`RmResult`](../interfaces/internal_.RmResult.md)[] |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:469](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L469)

___

### ScriptOrChannel

Ƭ **ScriptOrChannel**: \`script.js.${string}\`

#### Defined in

[types-dev/objects.d.ts:73](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L73)

___

### SecondParameterOf

Ƭ **SecondParameterOf**<`T`\>: `T` extends (`arg0`: `any`, `arg1`: infer R, ...`args`: `any`[]) => `any` ? `R` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `any` |

#### Defined in

[types-dev/index.d.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L382)

___

### SendToAllClientOptions

Ƭ **SendToAllClientOptions**: `Omit`<[`SendToClientOptions`](../interfaces/internal_.SendToClientOptions.md), ``"clientId"``\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L35)

___

### Session

Ƭ **Session**: `any`

#### Defined in

[types-dev/index.d.ts:89](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L89)

___

### SetObjectCallback

Ƭ **SetObjectCallback**: (`err?`: `Error` \| ``null``, `obj?`: { `id`: `string`  }) => `void`

#### Type declaration

▸ (`err?`, `obj?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `obj?` | `Object` |
| `obj.id` | `string` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L341)

___

### SetObjectPromise

Ƭ **SetObjectPromise**: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`SetObjectCallback`](internal_.md#setobjectcallback)\>\>

#### Defined in

[types-dev/index.d.ts:342](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L342)

___

### SetStateCallback

Ƭ **SetStateCallback**: (`err?`: `Error` \| ``null``, `id?`: `string`) => `void`

#### Type declaration

▸ (`err?`, `id?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `id?` | `string` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:406](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L406)

___

### SetStateChangedCallback

Ƭ **SetStateChangedCallback**: (`err?`: `Error` \| ``null``, `id?`: `string`, `notChanged?`: `boolean`) => `void`

#### Type declaration

▸ (`err?`, `id?`, `notChanged?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` \| ``null`` |
| `id?` | `string` |
| `notChanged?` | `boolean` |

##### Returns

`void`

#### Defined in

[types-dev/index.d.ts:409](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L409)

___

### SetStateChangedPromise

Ƭ **SetStateChangedPromise**: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`SetStateChangedCallback`](internal_.md#setstatechangedcallback)\>\>

#### Defined in

[types-dev/index.d.ts:410](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L410)

___

### SetStatePromise

Ƭ **SetStatePromise**: `Promise`<[`NonNullCallbackReturnTypeOf`](internal_.md#nonnullcallbackreturntypeof)<[`SetStateCallback`](internal_.md#setstatecallback)\>\>

#### Defined in

[types-dev/index.d.ts:407](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L407)

___

### SettableObjectWorker

Ƭ **SettableObjectWorker**<`T`\>: `T` extends [`AnyObject`](internal_.md#anyobject) ? `Omit`<`T`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `T`[``"_id"``] ; `acl?`: `T`[``"acl"``]  } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L911)

___

### SettableState

Ƭ **SettableState**: [`AtLeastOne`](internal_.md#atleastone)<[`State`](../interfaces/internal_.State.md)\>

#### Defined in

[types-dev/index.d.ts:81](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L81)

___

### State

Ƭ **State**: \`system.adapter.${string}.${number}.${string}\`

#### Defined in

[types-dev/objects.d.ts:75](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L75)

___

### StateChangeHandler

Ƭ **StateChangeHandler**: (`id`: `string`, `obj`: [`State`](../interfaces/internal_.State.md) \| ``null`` \| `undefined`) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`id`, `obj`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | [`State`](../interfaces/internal_.State.md) \| ``null`` \| `undefined` |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[types-dev/index.d.ts:325](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L325)

___

### StateValue

Ƭ **StateValue**: `string` \| `number` \| `boolean` \| ``null``

#### Defined in

[types-dev/index.d.ts:50](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L50)

___

### StringOrTranslated

Ƭ **StringOrTranslated**: `string` \| [`Translated`](internal_.md#translated)

For objects, we require the English language to be present

#### Defined in

[types-dev/objects.d.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L152)

___

### Timeout

Ƭ **Timeout**: `number` & { `__ioBrokerBrand`: ``"Timeout"``  }

#### Defined in

[types-dev/index.d.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L507)

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

[adapter/src/lib/_Types.ts:280](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L280)

___

### Translated

Ƭ **Translated**: { `en`: `string`  } & { [lang in Languages]?: string }

#### Defined in

[types-dev/objects.d.ts:149](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L149)

___

### UnloadHandler

Ƭ **UnloadHandler**: (`callback`: [`EmptyCallback`](internal_.md#emptycallback)) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`callback`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`EmptyCallback`](internal_.md#emptycallback) |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[types-dev/index.d.ts:328](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/index.d.ts#L328)

___

### User

Ƭ **User**: \`system.user.${string}\`

#### Defined in

[types-dev/objects.d.ts:85](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L85)

___

### UserChangeFunction

Ƭ **UserChangeFunction**: (`id`: `string`, `state`: [`State`](../interfaces/internal_.State.md) \| ``null``) => `void`

#### Type declaration

▸ (`id`, `state`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| ``null`` |

##### Returns

`void`

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:24

___

### UserInterfaceClientRemoveMessage

Ƭ **UserInterfaceClientRemoveMessage**: `Omit`<[`Message`](../interfaces/internal_.Message.md), ``"message"`` \| ``"command"``\> & { `command`: ``"clientUnsubscribe"`` ; `message`: { `reason`: [`MessageUnsubscribeReason`](internal_.md#messageunsubscribereason) ; `type`: `string`[]  }  } \| `Omit`<[`Message`](../interfaces/internal_.Message.md), ``"message"`` \| ``"command"``\> & { `command`: ``"clientSubscribeError"`` ; `message`: { `reason`: `undefined` ; `type`: `string`[]  }  }

#### Defined in

[adapter/src/lib/_Types.ts:106](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L106)

___

### UserInterfaceClientSubscribeHandler

Ƭ **UserInterfaceClientSubscribeHandler**: (`subscribeInfo`: [`UserInterfaceSubscribeInfo`](../interfaces/internal_.UserInterfaceSubscribeInfo.md)) => [`UserInterfaceClientSubscribeReturnType`](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md) \| `Promise`<[`UserInterfaceClientSubscribeReturnType`](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md)\>

#### Type declaration

▸ (`subscribeInfo`): [`UserInterfaceClientSubscribeReturnType`](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md) \| `Promise`<[`UserInterfaceClientSubscribeReturnType`](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `subscribeInfo` | [`UserInterfaceSubscribeInfo`](../interfaces/internal_.UserInterfaceSubscribeInfo.md) |

##### Returns

[`UserInterfaceClientSubscribeReturnType`](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md) \| `Promise`<[`UserInterfaceClientSubscribeReturnType`](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md)\>

#### Defined in

[adapter/src/lib/_Types.ts:71](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L71)

___

### UserInterfaceClientUnsubscribeHandler

Ƭ **UserInterfaceClientUnsubscribeHandler**: (`unsubscribeInfo`: [`UserInterfaceUnsubscribeInfo`](internal_.md#userinterfaceunsubscribeinfo)) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`unsubscribeInfo`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `unsubscribeInfo` | [`UserInterfaceUnsubscribeInfo`](internal_.md#userinterfaceunsubscribeinfo) |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[adapter/src/lib/_Types.ts:102](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L102)

___

### UserInterfaceClientUnsubscribeReason

Ƭ **UserInterfaceClientUnsubscribeReason**: [`ClientUnsubscribeReason`](internal_.md#clientunsubscribereason) \| ``"timeout"``

#### Defined in

[adapter/src/lib/_Types.ts:62](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L62)

___

### UserInterfaceUnsubscribeInfo

Ƭ **UserInterfaceUnsubscribeInfo**: [`UserInterfaceUnsubscribeInfoBaseObject`](internal_.md#userinterfaceunsubscribeinfobaseobject) & { `message?`: `undefined` ; `reason`: `Exclude`<[`UserInterfaceClientUnsubscribeReason`](internal_.md#userinterfaceclientunsubscribereason), [`ClientUnsubscribeReason`](internal_.md#clientunsubscribereason)\>  } \| { `message`: [`Message`](../interfaces/internal_.Message.md) ; `reason`: [`ClientUnsubscribeReason`](internal_.md#clientunsubscribereason)  }

#### Defined in

[adapter/src/lib/_Types.ts:87](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L87)

___

### UserInterfaceUnsubscribeInfoBaseObject

Ƭ **UserInterfaceUnsubscribeInfoBaseObject**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientId` | `string` | The handler id, which can be used to send information to clients |

#### Defined in

[adapter/src/lib/_Types.ts:82](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/adapter/src/lib/_Types.ts#L82)

___

### WelcomeScreenEntry

Ƭ **WelcomeScreenEntry**: `string` \| { `color`: `string` ; `img`: `string` ; `link`: `string` ; `name`: `string`  }

#### Defined in

[types-dev/objects.d.ts:456](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L456)
