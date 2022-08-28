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

• `Optional` **callback**: [`SetObjectCallback`](../modules/internal_.md#setobjectcallback)

#### Defined in

[packages/adapter/src/lib/_Types.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/_Types.ts#L188)

___

### id

• **id**: `string`

#### Defined in

[packages/adapter/src/lib/_Types.ts:185](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/_Types.ts#L185)

___

### obj

• **obj**: [`Omit`](../modules/internal_.md#omit)<[`StateObject`](internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](internal_.ObjectACL.md)  }

#### Defined in

[packages/adapter/src/lib/_Types.ts:187](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/_Types.ts#L187)

___

### options

• `Optional` **options**: ``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/_Types.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/_Types.ts#L186)
