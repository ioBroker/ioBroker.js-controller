[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetObjectOptions

# Interface: InternalSetObjectOptions

## Properties

### callback?

> `optional` **callback**: [`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

#### Defined in

[adapter/src/lib/\_Types.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/adapter/src/lib/_Types.ts#L361)

***

### id

> **id**: `string`

#### Defined in

[adapter/src/lib/\_Types.ts:358](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/adapter/src/lib/_Types.ts#L358)

***

### obj

> **obj**: `Omit`\<[`StateObject`](StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](DesignObject.md), `"_id"` \| `"acl"`\> & `object`

#### Defined in

[adapter/src/lib/\_Types.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/adapter/src/lib/_Types.ts#L360)

***

### options?

> `optional` **options**: `null` \| `Record`\<`string`, `any`\>

#### Defined in

[adapter/src/lib/\_Types.ts:359](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/adapter/src/lib/_Types.ts#L359)
