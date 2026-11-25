[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GetHistoryOptions

# Interface: GetHistoryOptions

Defined in: [types-dev/index.d.ts:491](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L491)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [types-dev/index.d.ts:504](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L504)

if `ack` field should be included in answer

***

### addId?

> `optional` **addId?**: `boolean`

Defined in: [types-dev/index.d.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L508)

if `id` field should be included in answer

***

### aggregate?

> `optional` **aggregate?**: `"max"` \| `"min"` \| `"count"` \| `"none"` \| `"onchange"` \| `"minmax"` \| `"average"` \| `"total"` \| `"percentile"` \| `"quantile"` \| `"integral"` \| `"integralTotal"`

Defined in: [types-dev/index.d.ts:518](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L518)

aggregate method (Default: 'average')

***

### count?

> `optional` **count?**: `number`

Defined in: [types-dev/index.d.ts:500](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L500)

number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set, else default is 500 if not set

***

### end?

> `optional` **end?**: `number`

Defined in: [types-dev/index.d.ts:496](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L496)

End time in ms. If not defined, it is "now"

***

### from?

> `optional` **from?**: `boolean`

Defined in: [types-dev/index.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L502)

if `from` field should be included in answer

***

### ignoreNull?

> `optional` **ignoreNull?**: `boolean` \| `0`

Defined in: [types-dev/index.d.ts:514](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L514)

if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)

***

### instance?

> `optional` **instance?**: `string`

Defined in: [types-dev/index.d.ts:492](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L492)

***

### integralInterpolation?

> `optional` **integralInterpolation?**: `"none"` \| `"linear"`

Defined in: [types-dev/index.d.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L542)

when using aggregate method `integral` defines the interpolation method (defaults to `none`).

***

### integralUnit?

> `optional` **integralUnit?**: `number`

Defined in: [types-dev/index.d.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L540)

when using aggregate method `integral` defines the unit in seconds (defaults to 60 seconds). E.g., to get integral in hours for Wh or such, set to 3600.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types-dev/index.d.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L510)

do not return more entries than limit

***

### percentile?

> `optional` **percentile?**: `number`

Defined in: [types-dev/index.d.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L536)

when using aggregate method `percentile` defines the percentile level (0..100)(defaults to 50)

***

### q?

> `optional` **q?**: `boolean`

Defined in: [types-dev/index.d.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L506)

if `q` field should be included in answer

***

### quantile?

> `optional` **quantile?**: `number`

Defined in: [types-dev/index.d.ts:538](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L538)

when using aggregate method `quantile` defines the quantile level (0..1)(defaults to 0.5)

***

### removeBorderValues?

> `optional` **removeBorderValues?**: `boolean`

Defined in: [types-dev/index.d.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L534)

By default, the additional border values are returned to optimize charting. Set this option to true if this is not wanted (e.g., for script data processing)

***

### returnNewestEntries?

> `optional` **returnNewestEntries?**: `boolean`

Defined in: [types-dev/index.d.ts:532](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L532)

Returned data is normally sorted ascending by date, this option lets you return the newest instead of the oldest values if the number of returned points is limited

***

### round?

> `optional` **round?**: `number`

Defined in: [types-dev/index.d.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L512)

round result to number of digits after decimal point

***

### sessionId?

> `optional` **sessionId?**: `number`

Defined in: [types-dev/index.d.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L516)

This number will be returned in answer, so the client can assign the request for it

***

### start?

> `optional` **start?**: `number`

Defined in: [types-dev/index.d.ts:494](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L494)

Start time in ms

***

### step?

> `optional` **step?**: `number`

Defined in: [types-dev/index.d.ts:498](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L498)

Step in ms of intervals. Used in aggregate (max, min, average, total, ...)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/index.d.ts#L544)

If user is set, it will be checked if this user may read the variable
