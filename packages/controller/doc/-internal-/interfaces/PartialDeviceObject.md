[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialDeviceObject

# Interface: PartialDeviceObject

Defined in: [types-dev/objects.d.ts:1124](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1124)

## Extends

- `Partial`\<`Omit`\<[`DeviceObject`](DeviceObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:1083](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1083)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`DeviceCommon`](DeviceCommon.md)\>

Defined in: [types-dev/objects.d.ts:1125](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1125)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1089](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1089)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1091](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1091)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1087](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1087)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1096)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"device"`

Defined in: [types-dev/objects.d.ts:1120](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1120)

#### Inherited from

[`DeviceObject`](DeviceObject.md).[`type`](DeviceObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L1093)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
