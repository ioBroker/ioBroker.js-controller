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

[types-dev/objects.d.ts:901](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L901)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:908](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L908)

***

### common

> **common**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:906](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L906)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Defined in

[types-dev/objects.d.ts:907](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L907)

***

### from?

> `optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:909](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L909)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L905)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L914)

***

### ts?

> `optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:912](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L912)

***

### type

> **type**: [`ObjectType`](../type-aliases/ObjectType.md)

#### Defined in

[types-dev/objects.d.ts:902](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L902)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L911)
