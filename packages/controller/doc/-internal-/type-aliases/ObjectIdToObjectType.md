[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectIdToObjectType

# Type Alias: ObjectIdToObjectType\<T, Read\>

> **ObjectIdToObjectType**\<`T`, `Read`\> = `T` *extends* [`State`](State.md) ? [`StateObject`](../interfaces/StateObject.md) : `T` *extends* [`Instance`](Instance.md) ? [`InstanceObject`](../interfaces/InstanceObject.md) : `T` *extends* [`Adapter`](Adapter.md) ? [`AdapterObject`](../interfaces/AdapterObject.md) : `T` *extends* [`Channel`](Channel.md) ? [`ChannelObject`](../interfaces/ChannelObject.md) : `T` *extends* [`Meta`](Meta.md) ? [`MetaObject`](../interfaces/MetaObject.md) : `T` *extends* [`Misc`](Misc.md) ? [`AdapterScopedObject`](AdapterScopedObject.md) : `T` *extends* [`ScriptOrChannel`](ScriptOrChannel.md) ? [`ScriptObject`](../interfaces/ScriptObject.md) \| [`ChannelObject`](../interfaces/ChannelObject.md) : `T` *extends* [`Enum`](Enum.md) ? [`EnumObject`](../interfaces/EnumObject.md) : `T` *extends* [`Group`](Group.md) ? [`GroupObject`](../interfaces/GroupObject.md) : `T` *extends* [`User`](User.md) ? [`UserObject`](../interfaces/UserObject.md) : ... *extends* ... ? ... : ...

Defined in: [types-dev/objects.d.ts:121](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L121)

## Type Parameters

### T

`T` *extends* `string`

### Read

`Read` *extends* `"read"` \| `"write"` = `"read"`
