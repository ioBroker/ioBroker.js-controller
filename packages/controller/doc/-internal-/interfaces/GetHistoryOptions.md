[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GetHistoryOptions

# Interface: GetHistoryOptions

Defined in: [types-dev/index.d.ts:337](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L337)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [types-dev/index.d.ts:350](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L350)

if `ack` field should be included in answer

***

### addId?

> `optional` **addId?**: `boolean`

Defined in: [types-dev/index.d.ts:354](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L354)

if `id` field should be included in answer

***

### aggregate?

> `optional` **aggregate?**: `"min"` \| `"max"` \| `"count"` \| `"none"` \| `"onchange"` \| `"minmax"` \| `"average"` \| `"total"` \| `"percentile"` \| `"quantile"` \| `"integral"` \| `"integralTotal"`

Defined in: [types-dev/index.d.ts:364](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L364)

aggregate method (Default: 'average')

***

### count?

> `optional` **count?**: `number`

Defined in: [types-dev/index.d.ts:346](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L346)

number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set, else default is 500 if not set

***

### end?

> `optional` **end?**: `number`

Defined in: [types-dev/index.d.ts:342](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L342)

End time in ms. If not defined, it is "now"

***

### from?

> `optional` **from?**: `boolean`

Defined in: [types-dev/index.d.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L348)

if `from` field should be included in answer

***

### ignoreNull?

> `optional` **ignoreNull?**: `boolean` \| `0`

Defined in: [types-dev/index.d.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L360)

if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)

***

### instance?

> `optional` **instance?**: `string`

Defined in: [types-dev/index.d.ts:338](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L338)

***

### integralInterpolation?

> `optional` **integralInterpolation?**: `"none"` \| `"linear"`

Defined in: [types-dev/index.d.ts:388](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L388)

when using aggregate method `integral` defines the interpolation method (defaults to `none`).

***

### integralUnit?

> `optional` **integralUnit?**: `number`

Defined in: [types-dev/index.d.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L386)

when using aggregate method `integral` defines the unit in seconds (defaults to 60 seconds). E.g., to get integral in hours for Wh or such, set to 3600.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types-dev/index.d.ts:356](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L356)

do not return more entries than limit

***

### percentile?

> `optional` **percentile?**: `number`

Defined in: [types-dev/index.d.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L382)

when using aggregate method `percentile` defines the percentile level (0..100)(defaults to 50)

***

### q?

> `optional` **q?**: `boolean`

Defined in: [types-dev/index.d.ts:352](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L352)

if `q` field should be included in answer

***

### quantile?

> `optional` **quantile?**: `number`

Defined in: [types-dev/index.d.ts:384](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L384)

when using aggregate method `quantile` defines the quantile level (0..1)(defaults to 0.5)

***

### removeBorderValues?

> `optional` **removeBorderValues?**: `boolean`

Defined in: [types-dev/index.d.ts:380](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L380)

By default, the additional border values are returned to optimize charting. Set this option to true if this is not wanted (e.g., for script data processing)

***

### returnNewestEntries?

> `optional` **returnNewestEntries?**: `boolean`

Defined in: [types-dev/index.d.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L378)

Returned data is normally sorted ascending by date, this option lets you return the newest instead of the oldest values if the number of returned points is limited

***

### round?

> `optional` **round?**: `number`

Defined in: [types-dev/index.d.ts:358](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L358)

round result to number of digits after decimal point

***

### sessionId?

> `optional` **sessionId?**: `number`

Defined in: [types-dev/index.d.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L362)

This number will be returned in answer, so the client can assign the request for it

***

### start?

> `optional` **start?**: `number`

Defined in: [types-dev/index.d.ts:340](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L340)

Start time in ms

***

### step?

> `optional` **step?**: `number`

Defined in: [types-dev/index.d.ts:344](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L344)

Step in ms of intervals. Used in aggregate (max, min, average, total, ...)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:390](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L390)

If user is set, it will be checked if this user may read the variable
