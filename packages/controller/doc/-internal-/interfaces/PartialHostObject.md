[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialHostObject

# Interface: PartialHostObject

Defined in: [types-dev/objects.d.ts:1359](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1359)

## Extends

- `Partial`\<`Omit`\<[`HostObject`](HostObject.md), `"common"` \| `"native"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `system.host.${string}` ``

Defined in: [types-dev/objects.d.ts:1353](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1353)

The ID of this object

#### Inherited from

[`HostObject`](HostObject.md).[`_id`](HostObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`HostCommon`](HostCommon.md)\>

Defined in: [types-dev/objects.d.ts:1360](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1360)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1089](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1089)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1091](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1091)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Partial`\<[`HostNative`](HostNative.md)\>

Defined in: [types-dev/objects.d.ts:1361](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1361)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1096)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"host"`

Defined in: [types-dev/objects.d.ts:1354](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1354)

#### Inherited from

[`HostObject`](HostObject.md).[`type`](HostObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1093)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
