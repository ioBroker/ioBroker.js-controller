[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetObjectOptions

# Interface: InternalSetObjectOptions

Defined in: [adapter/src/lib/\_Types.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L470)

Options for setting an object

## Properties

### callback?

> `optional` **callback?**: [`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:478](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L478)

Called once the object has been set

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:472](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L472)

The id of the object

***

### obj

> **obj**: `Omit`\<[`StateObject`](StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](DesignObject.md), `"_id"` \| `"acl"`\> & `object`

Defined in: [adapter/src/lib/\_Types.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L476)

The object to set

***

### options?

> `optional` **options?**: `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:474](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L474)

Optional settings including the user context
