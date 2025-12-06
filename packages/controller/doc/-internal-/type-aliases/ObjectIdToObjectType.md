[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectIdToObjectType

# Type Alias: ObjectIdToObjectType\<T, Read\>

> **ObjectIdToObjectType**\<`T`, `Read`\>: `T` *extends* [`State`](State.md) ? [`StateObject`](../interfaces/StateObject.md) : `T` *extends* [`Instance`](Instance.md) ? [`InstanceObject`](../interfaces/InstanceObject.md) : `T` *extends* [`Adapter`](Adapter.md) ? [`AdapterObject`](../interfaces/AdapterObject.md) : `T` *extends* [`Channel`](Channel.md) ? [`ChannelObject`](../interfaces/ChannelObject.md) : `T` *extends* [`Meta`](Meta.md) ? [`MetaObject`](../interfaces/MetaObject.md) : `T` *extends* [`Misc`](Misc.md) ? [`AdapterScopedObject`](AdapterScopedObject.md) : `T` *extends* [`ScriptOrChannel`](ScriptOrChannel.md) ? [`ScriptObject`](../interfaces/ScriptObject.md) \| [`ChannelObject`](../interfaces/ChannelObject.md) : `T` *extends* [`Enum`](Enum.md) ? [`EnumObject`](../interfaces/EnumObject.md) : `T` *extends* [`Group`](Group.md) ? [`GroupObject`](../interfaces/GroupObject.md) : `T` *extends* [`User`](User.md) ? [`UserObject`](../interfaces/UserObject.md) : ... *extends* ... ? ... : ...

## Type Parameters

• **T** *extends* `string`

• **Read** *extends* `"read"` \| `"write"` = `"read"`

## Defined in

[types-dev/objects.d.ts:121](https://github.com/ioBroker/ioBroker.js-controller/blob/023c9fd23da3000029fab87bfd4e6349dd61e07c/packages/types-dev/objects.d.ts#L121)
