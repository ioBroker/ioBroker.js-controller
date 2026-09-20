[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GetHistoryOptions

# Interface: GetHistoryOptions

Defined in: [types-dev/index.d.ts:453](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L453)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [types-dev/index.d.ts:466](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L466)

if `ack` field should be included in answer

***

### addId?

> `optional` **addId?**: `boolean`

Defined in: [types-dev/index.d.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L470)

if `id` field should be included in answer

***

### aggregate?

> `optional` **aggregate?**: `"max"` \| `"min"` \| `"count"` \| `"none"` \| `"onchange"` \| `"minmax"` \| `"average"` \| `"total"` \| `"percentile"` \| `"quantile"` \| `"integral"` \| `"integralTotal"`

Defined in: [types-dev/index.d.ts:480](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L480)

aggregate method (Default: 'average')

***

### count?

> `optional` **count?**: `number`

Defined in: [types-dev/index.d.ts:462](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L462)

number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set, else default is 500 if not set

***

### end?

> `optional` **end?**: `number`

Defined in: [types-dev/index.d.ts:458](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L458)

End time in ms. If not defined, it is "now"

***

### from?

> `optional` **from?**: `boolean`

Defined in: [types-dev/index.d.ts:464](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L464)

if `from` field should be included in answer

***

### ignoreNull?

> `optional` **ignoreNull?**: `boolean` \| `0`

Defined in: [types-dev/index.d.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L476)

if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)

***

### instance?

> `optional` **instance?**: `string`

Defined in: [types-dev/index.d.ts:454](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L454)

***

### integralInterpolation?

> `optional` **integralInterpolation?**: `"none"` \| `"linear"`

Defined in: [types-dev/index.d.ts:504](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L504)

when using aggregate method `integral` defines the interpolation method (defaults to `none`).

***

### integralUnit?

> `optional` **integralUnit?**: `number`

Defined in: [types-dev/index.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L502)

when using aggregate method `integral` defines the unit in seconds (defaults to 60 seconds). E.g., to get integral in hours for Wh or such, set to 3600.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types-dev/index.d.ts:472](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L472)

do not return more entries than limit

***

### percentile?

> `optional` **percentile?**: `number`

Defined in: [types-dev/index.d.ts:498](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L498)

when using aggregate method `percentile` defines the percentile level (0..100)(defaults to 50)

***

### q?

> `optional` **q?**: `boolean`

Defined in: [types-dev/index.d.ts:468](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L468)

if `q` field should be included in answer

***

### quantile?

> `optional` **quantile?**: `number`

Defined in: [types-dev/index.d.ts:500](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L500)

when using aggregate method `quantile` defines the quantile level (0..1)(defaults to 0.5)

***

### removeBorderValues?

> `optional` **removeBorderValues?**: `boolean`

Defined in: [types-dev/index.d.ts:496](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L496)

By default, the additional border values are returned to optimize charting. Set this option to true if this is not wanted (e.g., for script data processing)

***

### returnNewestEntries?

> `optional` **returnNewestEntries?**: `boolean`

Defined in: [types-dev/index.d.ts:494](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L494)

Returned data is normally sorted ascending by date, this option lets you return the newest instead of the oldest values if the number of returned points is limited

***

### round?

> `optional` **round?**: `number`

Defined in: [types-dev/index.d.ts:474](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L474)

round result to number of digits after decimal point

***

### sessionId?

> `optional` **sessionId?**: `number`

Defined in: [types-dev/index.d.ts:478](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L478)

This number will be returned in answer, so the client can assign the request for it

***

### start?

> `optional` **start?**: `number`

Defined in: [types-dev/index.d.ts:456](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L456)

Start time in ms

***

### step?

> `optional` **step?**: `number`

Defined in: [types-dev/index.d.ts:460](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L460)

Step in ms of intervals. Used in aggregate (max, min, average, total, ...)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L506)

If user is set, it will be checked if this user may read the variable
