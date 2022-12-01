[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / InternalSetObjectOptions

# Interface: InternalSetObjectOptions

[<internal>](../modules/internal_.md).InternalSetObjectOptions

## Table of contents

### Properties

- [callback](internal_.InternalSetObjectOptions.md#callback)
- [id](internal_.InternalSetObjectOptions.md#id)
- [obj](internal_.InternalSetObjectOptions.md#obj)
- [options](internal_.InternalSetObjectOptions.md#options)

## Properties

### callback

• `Optional` **callback**: `SetObjectCallback`

#### Defined in

[packages/adapter/src/lib/_Types.ts:201](https://github.com/ioBroker/ioBroker.js-controller/blob/8b30b890/packages/adapter/src/lib/_Types.ts#L201)

___

### id

• **id**: `string`

#### Defined in

[packages/adapter/src/lib/_Types.ts:198](https://github.com/ioBroker/ioBroker.js-controller/blob/8b30b890/packages/adapter/src/lib/_Types.ts#L198)

___

### obj

• **obj**: `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & {}

#### Defined in

[packages/adapter/src/lib/_Types.ts:200](https://github.com/ioBroker/ioBroker.js-controller/blob/8b30b890/packages/adapter/src/lib/_Types.ts#L200)

___

### options

• `Optional` **options**: ``null`` \| `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/_Types.ts:199](https://github.com/ioBroker/ioBroker.js-controller/blob/8b30b890/packages/adapter/src/lib/_Types.ts#L199)
