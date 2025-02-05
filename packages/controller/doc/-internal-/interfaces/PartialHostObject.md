[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialHostObject

# Interface: PartialHostObject

## Extends

- `Partial`\<`Omit`\<[`HostObject`](HostObject.md), `"common"` \| `"native"`\>\>

## Properties

### \_id?

> `optional` **\_id**: \`system.host.$\{string\}\`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:1137](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L1137)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:919](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L919)

***

### common?

> `optional` **common**: `Partial`\<[`HostCommon`](HostCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1144](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L1144)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L918)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L920)

***

### native?

> `optional` **native**: `Partial`\<[`HostNative`](HostNative.md)\>

#### Defined in

[types-dev/objects.d.ts:1145](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L1145)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:925](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L925)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L923)

***

### type?

> `optional` **type**: `"host"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1138](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L1138)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:922](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/objects.d.ts#L922)
