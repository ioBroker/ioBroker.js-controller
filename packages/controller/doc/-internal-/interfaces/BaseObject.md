[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BaseObject

# Interface: BaseObject

## Extended by

- [`StateObject`](StateObject.md)
- [`DeviceObject`](DeviceObject.md)
- [`ChannelObject`](ChannelObject.md)
- [`FolderObject`](FolderObject.md)
- [`MetaObject`](MetaObject.md)
- [`EnumObject`](EnumObject.md)
- [`HostObject`](HostObject.md)
- [`AdapterObject`](AdapterObject.md)
- [`InstanceObject`](InstanceObject.md)
- [`UserObject`](UserObject.md)
- [`GroupObject`](GroupObject.md)
- [`ScriptObject`](ScriptObject.md)
- [`ChartObject`](ChartObject.md)
- [`ScheduleObject`](ScheduleObject.md)
- [`RepositoryObject`](RepositoryObject.md)
- [`OtherObject`](OtherObject.md)
- [`SystemConfigObject`](SystemConfigObject.md)

## Properties

### \_id

> **\_id**: `string`

The ID of this object

#### Defined in

[types-dev/objects.d.ts:915](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L915)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:922](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L922)

***

### common

> **common**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L920)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L921)

***

### from?

> `optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L923)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:919](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L919)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Defined in

[types-dev/objects.d.ts:928](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L928)

***

### ts?

> `optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:926](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L926)

***

### type

> **type**: [`ObjectType`](../type-aliases/ObjectType.md)

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L916)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:925](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L925)
