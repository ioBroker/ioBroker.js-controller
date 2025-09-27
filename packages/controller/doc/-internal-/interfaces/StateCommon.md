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

[types-dev/objects.d.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L223)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L179)

***

### custom?

> `optional` **custom**: `Record`\<`string`, `any`\>

Custom settings for this state

#### Defined in

[types-dev/objects.d.ts:264](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L264)

***

### def?

> `optional` **def**: `any`

the default value

#### Defined in

[types-dev/objects.d.ts:218](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L218)

***

### defAck?

> `optional` **defAck**: `boolean`

the default status of the ack flag

#### Defined in

[types-dev/objects.d.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L220)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L171)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L174)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L177)

***

### habpanel?

> `optional` **habpanel**: `any`

Custom defined properties for backward compatibility of habpanel adapter

#### Defined in

[types-dev/objects.d.ts:270](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L270)

***

### history?

> `optional` **history**: `any`

attached history information

#### Defined in

[types-dev/objects.d.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L261)

***

### icon?

> `optional` **icon**: `string`

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L184)

***

### material?

> `optional` **material**: `any`

Custom defined properties for backward compatibility of material adapter

#### Defined in

[types-dev/objects.d.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L267)

***

### max?

> `optional` **max**: `number`

maximum value

#### Defined in

[types-dev/objects.d.ts:204](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L204)

***

### min?

> `optional` **min**: `number`

minimum value

#### Defined in

[types-dev/objects.d.ts:202](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L202)

***

### mobile?

> `optional` **mobile**: `any`

Custom defined properties for backward compatibility of habpanel adapter

#### Defined in

[types-dev/objects.d.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L273)

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The name of this object as a simple string or an object with translations

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L168)

***

### read

> **read**: `boolean`

if this state is readable

#### Defined in

[types-dev/objects.d.ts:211](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L211)

***

### role

> **role**: `string`

role of the state (used in user interfaces to indicate which widget to choose)

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:215](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L215)

***

### smartName?

> `optional` **smartName**: [`SmartName`](../type-aliases/SmartName.md)

Settings for IOT adapters and how the state should be named in e.g., Alexa.
The string "ignore" (deprecated please use boolean `false` instead) or boolean value `false` is a special case, causing the state to be ignored.
A value of `null` means that the device should be removed by the IOT adapters

#### Defined in

[types-dev/objects.d.ts:280](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L280)

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

[types-dev/objects.d.ts:255](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L255)

***

### step?

> `optional` **step**: `number`

allowed interval for numeric values

#### Defined in

[types-dev/objects.d.ts:206](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L206)

***

### type

> **type**: [`CommonType`](../type-aliases/CommonType.md)

Type of this state. See https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole for a detailed description

#### Defined in

[types-dev/objects.d.ts:200](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L200)

***

### unit?

> `optional` **unit**: `string`

unit of the value

#### Defined in

[types-dev/objects.d.ts:208](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L208)

***

### workingID?

> `optional` **workingID**: `string`

ID of a helper state indicating if the handler of this state is working

#### Defined in

[types-dev/objects.d.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L258)

***

### write

> **write**: `boolean`

if this state is writable

#### Defined in

[types-dev/objects.d.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L213)
