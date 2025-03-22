[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialUserObject

# Interface: PartialUserObject

## Extends

- `Partial`\<`Omit`\<[`UserObject`](UserObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: \`system.user.$\{string\}\`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:1152](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L1152)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:922](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L922)

***

### common?

> `optional` **common**: `Partial`\<[`UserCommon`](UserCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1158](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L1158)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L921)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L923)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:919](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L919)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:928](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L928)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:926](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L926)

***

### type?

> `optional` **type**: `"user"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1153](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L1153)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:925](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L925)
