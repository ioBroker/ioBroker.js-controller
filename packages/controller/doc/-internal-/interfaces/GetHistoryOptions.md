[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GetHistoryOptions

# Interface: GetHistoryOptions

Defined in: [types-dev/index.d.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L295)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [types-dev/index.d.ts:308](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L308)

if `ack` field should be included in answer

***

### addId?

> `optional` **addId?**: `boolean`

Defined in: [types-dev/index.d.ts:312](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L312)

if `id` field should be included in answer

***

### aggregate?

> `optional` **aggregate?**: `"min"` \| `"max"` \| `"count"` \| `"none"` \| `"onchange"` \| `"minmax"` \| `"average"` \| `"total"` \| `"percentile"` \| `"quantile"` \| `"integral"` \| `"integralTotal"`

Defined in: [types-dev/index.d.ts:322](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L322)

aggregate method (Default: 'average')

***

### count?

> `optional` **count?**: `number`

Defined in: [types-dev/index.d.ts:304](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L304)

number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set, else default is 500 if not set

***

### end?

> `optional` **end?**: `number`

Defined in: [types-dev/index.d.ts:300](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L300)

End time in ms. If not defined, it is "now"

***

### from?

> `optional` **from?**: `boolean`

Defined in: [types-dev/index.d.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L306)

if `from` field should be included in answer

***

### ignoreNull?

> `optional` **ignoreNull?**: `boolean` \| `0`

Defined in: [types-dev/index.d.ts:318](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L318)

if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)

***

### instance?

> `optional` **instance?**: `string`

Defined in: [types-dev/index.d.ts:296](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L296)

***

### integralInterpolation?

> `optional` **integralInterpolation?**: `"none"` \| `"linear"`

Defined in: [types-dev/index.d.ts:346](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L346)

when using aggregate method `integral` defines the interpolation method (defaults to `none`).

***

### integralUnit?

> `optional` **integralUnit?**: `number`

Defined in: [types-dev/index.d.ts:344](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L344)

when using aggregate method `integral` defines the unit in seconds (defaults to 60 seconds). E.g., to get integral in hours for Wh or such, set to 3600.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types-dev/index.d.ts:314](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L314)

do not return more entries than limit

***

### percentile?

> `optional` **percentile?**: `number`

Defined in: [types-dev/index.d.ts:340](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L340)

when using aggregate method `percentile` defines the percentile level (0..100)(defaults to 50)

***

### q?

> `optional` **q?**: `boolean`

Defined in: [types-dev/index.d.ts:310](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L310)

if `q` field should be included in answer

***

### quantile?

> `optional` **quantile?**: `number`

Defined in: [types-dev/index.d.ts:342](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L342)

when using aggregate method `quantile` defines the quantile level (0..1)(defaults to 0.5)

***

### removeBorderValues?

> `optional` **removeBorderValues?**: `boolean`

Defined in: [types-dev/index.d.ts:338](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L338)

By default, the additional border values are returned to optimize charting. Set this option to true if this is not wanted (e.g., for script data processing)

***

### returnNewestEntries?

> `optional` **returnNewestEntries?**: `boolean`

Defined in: [types-dev/index.d.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L336)

Returned data is normally sorted ascending by date, this option lets you return the newest instead of the oldest values if the number of returned points is limited

***

### round?

> `optional` **round?**: `number`

Defined in: [types-dev/index.d.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L316)

round result to number of digits after decimal point

***

### sessionId?

> `optional` **sessionId?**: `number`

Defined in: [types-dev/index.d.ts:320](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L320)

This number will be returned in answer, so the client can assign the request for it

***

### start?

> `optional` **start?**: `number`

Defined in: [types-dev/index.d.ts:298](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L298)

Start time in ms

***

### step?

> `optional` **step?**: `number`

Defined in: [types-dev/index.d.ts:302](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L302)

Step in ms of intervals. Used in aggregate (max, min, average, total, ...)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/index.d.ts#L348)

If user is set, it will be checked if this user may read the variable
