[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialHostObject

# Interface: PartialHostObject

Defined in: [types-dev/objects.d.ts:1318](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1318)

## Extends

- `Partial`\<`Omit`\<[`HostObject`](HostObject.md), `"common"` \| `"native"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `system.host.${string}` ``

Defined in: [types-dev/objects.d.ts:1312](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1312)

The ID of this object

#### Inherited from

[`HostObject`](HostObject.md).[`_id`](HostObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1049](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1049)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`HostCommon`](HostCommon.md)\>

Defined in: [types-dev/objects.d.ts:1319](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1319)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1048](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1048)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1050](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1050)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Partial`\<[`HostNative`](HostNative.md)\>

Defined in: [types-dev/objects.d.ts:1320](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1320)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1055](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1055)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1053](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1053)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"host"`

Defined in: [types-dev/objects.d.ts:1313](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1313)

#### Inherited from

[`HostObject`](HostObject.md).[`type`](HostObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1052](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/types-dev/objects.d.ts#L1052)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
