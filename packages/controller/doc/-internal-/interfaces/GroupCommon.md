[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GroupCommon

# Interface: GroupCommon

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### acl

> **acl**: `Omit`\<[`PermissionSet`](PermissionSet.md), `"user"` \| `"groups"`\>

The default permissions of this group

#### Defined in

[types-dev/objects.d.ts:462](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L462)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L183)

***

### custom?

> `optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:466](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L466)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L175)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L178)

***

### enabled?

> `optional` **enabled**: `boolean`

A group can be disabled, if missing, a group is active

#### Defined in

[types-dev/objects.d.ts:464](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L464)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L181)

***

### icon?

> `optional` **icon**: `string`

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L188)

***

### members

> **members**: \`system.user.$\{string\}\`[]

The users of this group

#### Defined in

[types-dev/objects.d.ts:460](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L460)

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The name of this group

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:458](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L458)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/objects.d.ts#L190)
