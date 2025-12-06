[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / EnumCommon

# Interface: EnumCommon

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L183)

***

### custom?

> `optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:326](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L326)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L175)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L178)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L181)

***

### icon?

> `optional` **icon**: `string`

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L188)

***

### members?

> `optional` **members**: `string`[]

The IDs of the enum members

#### Defined in

[types-dev/objects.d.ts:323](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L323)

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The name of this object as a simple string or an object with translations

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L172)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L190)

***

### smartName?

> `optional` **smartName**: [`SmartName`](../type-aliases/SmartName.md)

Settings for IOT adapters and how the state should be named in e.g., Alexa.
The string "ignore" (deprecated please use boolean `false` instead) or boolean value `false` is a special case, causing the state to be ignored.
A value of `null` means that the device should be removed by the IOT adapters

#### Defined in

[types-dev/objects.d.ts:333](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L333)
