[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InferGetObjectViewItemType

# Type Alias: InferGetObjectViewItemType\<Design, View\>

> **InferGetObjectViewItemType**\<`Design`, `View`\>: `Design` *extends* `"system"` ? `View` *extends* `"host"` ? [`HostObject`](../interfaces/HostObject.md) : `View` *extends* `"adapter"` ? [`AdapterObject`](../interfaces/AdapterObject.md) : `View` *extends* `"instance"` ? [`InstanceObject`](../interfaces/InstanceObject.md) : `View` *extends* `"meta"` ? [`MetaObject`](../interfaces/MetaObject.md) : `View` *extends* `"device"` ? [`DeviceObject`](../interfaces/DeviceObject.md) : `View` *extends* `"channel"` ? [`ChannelObject`](../interfaces/ChannelObject.md) : `View` *extends* `"state"` ? [`StateObject`](../interfaces/StateObject.md) : `View` *extends* `"folder"` ? [`FolderObject`](../interfaces/FolderObject.md) : `View` *extends* `"enum"` ? [`EnumObject`](../interfaces/EnumObject.md) : ... *extends* ... ? ... : ... : `any`

## Type Parameters

• **Design** *extends* `string`

• **View** *extends* `string`

## Defined in

[types-dev/objects.d.ts:1289](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/objects.d.ts#L1289)
