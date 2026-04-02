[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateCommon

# Interface: StateCommon

Defined in: [types-dev/objects.d.ts:202](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L202)

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### alias?

> `optional` **alias?**: `object`

Defined in: [types-dev/objects.d.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L227)

Configures this state as an alias for another state

#### id

> **id**: `string` \| \{ `read`: `string`; `write`: `string`; \}

The target state id

#### read?

> `optional` **read?**: `string`

An optional conversion function when reading, e.g. `"(val − 32) * 5/9"`

#### write?

> `optional` **write?**: `string`

An optional conversion function when reading, e.g. `"(val * 9/5) + 32"`

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L183)

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

***

### custom?

> `optional` **custom?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:268](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L268)

Custom settings for this state

***

### def?

> `optional` **def?**: `any`

Defined in: [types-dev/objects.d.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L222)

the default value

***

### defAck?

> `optional` **defAck?**: `boolean`

Defined in: [types-dev/objects.d.ts:224](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L224)

the default status of the ack flag

***

### desc?

> `optional` **desc?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L175)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

***

### dontDelete?

> `optional` **dontDelete?**: `true`

Defined in: [types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L178)

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

***

### expert?

> `optional` **expert?**: `true`

Defined in: [types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L181)

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

***

### habpanel?

> `optional` **habpanel?**: `any`

Defined in: [types-dev/objects.d.ts:274](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L274)

Custom defined properties for backward compatibility of habpanel adapter

***

### history?

> `optional` **history?**: `any`

Defined in: [types-dev/objects.d.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L265)

attached history information

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L188)

Icon for this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

***

### material?

> `optional` **material?**: `any`

Defined in: [types-dev/objects.d.ts:271](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L271)

Custom defined properties for backward compatibility of material adapter

***

### max?

> `optional` **max?**: `number`

Defined in: [types-dev/objects.d.ts:208](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L208)

maximum value

***

### min?

> `optional` **min?**: `number`

Defined in: [types-dev/objects.d.ts:206](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L206)

minimum value

***

### mobile?

> `optional` **mobile?**: `any`

Defined in: [types-dev/objects.d.ts:277](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L277)

Custom defined properties for backward compatibility of habpanel adapter

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L172)

The name of this object as a simple string or an object with translations

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

***

### read

> **read**: `boolean`

Defined in: [types-dev/objects.d.ts:215](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L215)

if this state is readable

***

### role

> **role**: `string`

Defined in: [types-dev/objects.d.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L219)

role of the state (used in user interfaces to indicate which widget to choose)

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

***

### smartName?

> `optional` **smartName?**: [`SmartName`](../type-aliases/SmartName.md)

Defined in: [types-dev/objects.d.ts:284](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L284)

Settings for IOT adapters and how the state should be named in e.g., Alexa.
The string "ignore" (deprecated please use boolean `false` instead) or boolean value `false` is a special case, causing the state to be ignored.
A value of `null` means that the device should be removed by the IOT adapters

***

### states?

> `optional` **states?**: `string` \| `string`[] \| `Record`\<`string`, `string`\>

Defined in: [types-dev/objects.d.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L259)

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

***

### step?

> `optional` **step?**: `number`

Defined in: [types-dev/objects.d.ts:210](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L210)

allowed interval for numeric values

***

### type

> **type**: [`CommonType`](../type-aliases/CommonType.md)

Defined in: [types-dev/objects.d.ts:204](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L204)

Type of this state. See https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole for a detailed description

***

### unit?

> `optional` **unit?**: `string`

Defined in: [types-dev/objects.d.ts:212](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L212)

unit of the value

***

### workingID?

> `optional` **workingID?**: `string`

Defined in: [types-dev/objects.d.ts:262](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L262)

ID of a helper state indicating if the handler of this state is working

***

### write

> **write**: `boolean`

Defined in: [types-dev/objects.d.ts:217](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L217)

if this state is writable
