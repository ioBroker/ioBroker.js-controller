[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InferGetObjectViewItemType

# Type Alias: InferGetObjectViewItemType\<Design, View\>

> **InferGetObjectViewItemType**\<`Design`, `View`\> = `Design` *extends* `"system"` ? `View` *extends* `"host"` ? [`HostObject`](../interfaces/HostObject.md) : `View` *extends* `"adapter"` ? [`AdapterObject`](../interfaces/AdapterObject.md) : `View` *extends* `"instance"` ? [`InstanceObject`](../interfaces/InstanceObject.md) : `View` *extends* `"meta"` ? [`MetaObject`](../interfaces/MetaObject.md) : `View` *extends* `"device"` ? [`DeviceObject`](../interfaces/DeviceObject.md) : `View` *extends* `"channel"` ? [`ChannelObject`](../interfaces/ChannelObject.md) : `View` *extends* `"state"` ? [`StateObject`](../interfaces/StateObject.md) : `View` *extends* `"folder"` ? [`FolderObject`](../interfaces/FolderObject.md) : `View` *extends* `"enum"` ? [`EnumObject`](../interfaces/EnumObject.md) : ... *extends* ... ? ... : ... : `any`

Defined in: [types-dev/objects.d.ts:1436](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1436)

## Type Parameters

### Design

`Design` *extends* `string`

### View

`View` *extends* `string`
