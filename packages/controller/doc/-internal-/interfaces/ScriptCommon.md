[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ScriptCommon

# Interface: ScriptCommon

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

### compiled?

> `optional` **compiled**: `string`

If the script uses a compiled language like TypeScript, this contains the compilation output

#### Defined in

[types-dev/objects.d.ts:484](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L484)

***

### custom?

> `optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L489)

***

### debug

> **debug**: `boolean`

#### Defined in

[types-dev/objects.d.ts:477](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L477)

***

### declarations?

> `optional` **declarations**: `string`

If the script uses a compiled language like TypeScript, this contains the generated declarations (global scripts only)

#### Defined in

[types-dev/objects.d.ts:486](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L486)

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

### enabled

> **enabled**: `boolean`

Whether this script should be executed

#### Defined in

[types-dev/objects.d.ts:480](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L480)

***

### engine

> **engine**: `string`

The instance id of the instance which executes this script

#### Defined in

[types-dev/objects.d.ts:474](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L474)

***

### engineType

> **engineType**: `"TypeScript/ts"` \| `"Blockly"` \| `"Rules"` \| `"Javascript/js"`

Defines the type of the script, e.g., TypeScript/ts, Javascript/js or Blockly

#### Defined in

[types-dev/objects.d.ts:472](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L472)

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

### name

> **name**: `string`

The name of this object as a simple string or an object with translations

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L470)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L190)

***

### source

> **source**: `string`

The source code of this script

#### Defined in

[types-dev/objects.d.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L476)

***

### sourceHash?

> `optional` **sourceHash**: `string`

Is used to determine whether a script has changed and needs to be recompiled

#### Defined in

[types-dev/objects.d.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L482)

***

### verbose

> **verbose**: `boolean`

#### Defined in

[types-dev/objects.d.ts:478](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L478)
