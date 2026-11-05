[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InferGetObjectViewItemType

# Type Alias: InferGetObjectViewItemType\<Design, View\>

> **InferGetObjectViewItemType**\<`Design`, `View`\> = `Design` *extends* `"system"` ? `View` *extends* `"host"` ? [`HostObject`](../interfaces/HostObject.md) : `View` *extends* `"adapter"` ? [`AdapterObject`](../interfaces/AdapterObject.md) : `View` *extends* `"instance"` ? [`InstanceObject`](../interfaces/InstanceObject.md) : `View` *extends* `"meta"` ? [`MetaObject`](../interfaces/MetaObject.md) : `View` *extends* `"device"` ? [`DeviceObject`](../interfaces/DeviceObject.md) : `View` *extends* `"channel"` ? [`ChannelObject`](../interfaces/ChannelObject.md) : `View` *extends* `"state"` ? [`StateObject`](../interfaces/StateObject.md) : `View` *extends* `"folder"` ? [`FolderObject`](../interfaces/FolderObject.md) : `View` *extends* `"enum"` ? [`EnumObject`](../interfaces/EnumObject.md) : ... *extends* ... ? ... : ... : `any`

Defined in: [types-dev/objects.d.ts:1464](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1464)

## Type Parameters

### Design

`Design` *extends* `string`

### View

`View` *extends* `string`
