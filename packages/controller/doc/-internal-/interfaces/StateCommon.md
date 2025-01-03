[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateCommon

# Interface: StateCommon

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### alias?

> `optional` **alias**: `object`

Configures this state as an alias for another state

#### id

> **id**: `string` \| `object`

The target state id

#### read?

> `optional` **read**: `string`

An optional conversion function when reading, e.g. `"(val − 32) * 5/9"`

#### write?

> `optional` **write**: `string`

An optional conversion function when reading, e.g. `"(val * 9/5) + 32"`

#### Defined in

[types-dev/objects.d.ts:214](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L214)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L179)

***

### custom?

> `optional` **custom**: `Record`\<`string`, `any`\>

Custom settings for this state

#### Defined in

[types-dev/objects.d.ts:255](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L255)

***

### def?

> `optional` **def**: `any`

the default value

#### Defined in

[types-dev/objects.d.ts:209](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L209)

***

### defAck?

> `optional` **defAck**: `boolean`

the default status of the ack flag

#### Defined in

[types-dev/objects.d.ts:211](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L211)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L171)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L174)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L177)

***

### habpanel?

> `optional` **habpanel**: `any`

Custom defined properties for backward compatibility of habpanel adapter

#### Defined in

[types-dev/objects.d.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L261)

***

### history?

> `optional` **history**: `any`

attached history information

#### Defined in

[types-dev/objects.d.ts:252](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L252)

***

### icon?

> `optional` **icon**: `string`

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L184)

***

### material?

> `optional` **material**: `any`

Custom defined properties for backward compatibility of material adapter

#### Defined in

[types-dev/objects.d.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L258)

***

### max?

> `optional` **max**: `number`

maximum value

#### Defined in

[types-dev/objects.d.ts:195](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L195)

***

### min?

> `optional` **min**: `number`

minimum value

#### Defined in

[types-dev/objects.d.ts:193](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L193)

***

### mobile?

> `optional` **mobile**: `any`

Custom defined properties for backward compatibility of habpanel adapter

#### Defined in

[types-dev/objects.d.ts:264](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L264)

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The name of this object as a simple string or an object with translations

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L168)

***

### read

> **read**: `boolean`

if this state is readable

#### Defined in

[types-dev/objects.d.ts:202](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L202)

***

### role

> **role**: `string`

role of the state (used in user interfaces to indicate which widget to choose)

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:206](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L206)

***

### smartName?

> `optional` **smartName**: `null` \| `string` \| `false` \| `object` & `object`

Settings for IOT adapters and how the state should be named in e.g., Alexa.
The string "ignore" (deprecated please use boolean `false` instead) or boolean value `false` is a special case, causing the state to be ignored.
A value of `null` means that the device should be removed by the IOT adapters

#### Defined in

[types-dev/objects.d.ts:271](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L271)

***

### states?

> `optional` **states**: `string` \| `string`[] \| `Record`\<`string`, `string`\>

Dictionary of possible values for this state in the form
```jsonc
{
    "internal value 1": "displayed value 1",
    "internal value 2": "displayed value 2",
    // ...
}
```

or as an array:
```jsonc
[ "value 1", "value 2", // ... ]
```

In old ioBroker versions, this could also be a string of the form
`"val1:text1;val2:text2"` (now deprecated)

#### Defined in

[types-dev/objects.d.ts:246](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L246)

***

### step?

> `optional` **step**: `number`

allowed interval for numeric values

#### Defined in

[types-dev/objects.d.ts:197](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L197)

***

### type

> **type**: [`CommonType`](../type-aliases/CommonType.md)

Type of this state. See https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole for a detailed description

#### Defined in

[types-dev/objects.d.ts:191](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L191)

***

### unit?

> `optional` **unit**: `string`

unit of the value

#### Defined in

[types-dev/objects.d.ts:199](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L199)

***

### workingID?

> `optional` **workingID**: `string`

ID of a helper state indicating if the handler of this state is working

#### Defined in

[types-dev/objects.d.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L249)

***

### write

> **write**: `boolean`

if this state is writable

#### Defined in

[types-dev/objects.d.ts:204](https://github.com/ioBroker/ioBroker.js-controller/blob/f1ba02661ee76a492ac7f898d8736bf0a1d44d8b/packages/types-dev/objects.d.ts#L204)
