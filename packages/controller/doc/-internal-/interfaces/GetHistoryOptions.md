[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GetHistoryOptions

# Interface: GetHistoryOptions

## Properties

### ack?

> `optional` **ack**: `boolean`

if `ack` field should be included in answer

#### Defined in

[types-dev/index.d.ts:304](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L304)

***

### addId?

> `optional` **addId**: `boolean`

if `id` field should be included in answer

#### Defined in

[types-dev/index.d.ts:308](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L308)

***

### aggregate?

> `optional` **aggregate**: `"min"` \| `"max"` \| `"count"` \| `"none"` \| `"onchange"` \| `"minmax"` \| `"average"` \| `"total"` \| `"percentile"` \| `"quantile"` \| `"integral"` \| `"integralTotal"`

aggregate method (Default: 'average')

#### Defined in

[types-dev/index.d.ts:318](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L318)

***

### count?

> `optional` **count**: `number`

number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set, else default is 500 if not set

#### Defined in

[types-dev/index.d.ts:300](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L300)

***

### end?

> `optional` **end**: `number`

End time in ms. If not defined, it is "now"

#### Defined in

[types-dev/index.d.ts:296](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L296)

***

### from?

> `optional` **from**: `boolean`

if `from` field should be included in answer

#### Defined in

[types-dev/index.d.ts:302](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L302)

***

### ignoreNull?

> `optional` **ignoreNull**: `boolean` \| `0`

if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)

#### Defined in

[types-dev/index.d.ts:314](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L314)

***

### instance?

> `optional` **instance**: `string`

#### Defined in

[types-dev/index.d.ts:292](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L292)

***

### integralInterpolation?

> `optional` **integralInterpolation**: `"none"` \| `"linear"`

when using aggregate method `integral` defines the interpolation method (defaults to `none`).

#### Defined in

[types-dev/index.d.ts:342](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L342)

***

### integralUnit?

> `optional` **integralUnit**: `number`

when using aggregate method `integral` defines the unit in seconds (defaults to 60s). e.g. to get integral in hours for Wh or such, set to 3600.

#### Defined in

[types-dev/index.d.ts:340](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L340)

***

### limit?

> `optional` **limit**: `number`

do not return more entries than limit

#### Defined in

[types-dev/index.d.ts:310](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L310)

***

### percentile?

> `optional` **percentile**: `number`

when using aggregate method `percentile` defines the percentile level (0..100)(defaults to 50)

#### Defined in

[types-dev/index.d.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L336)

***

### q?

> `optional` **q**: `boolean`

if `q` field should be included in answer

#### Defined in

[types-dev/index.d.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L306)

***

### quantile?

> `optional` **quantile**: `number`

when using aggregate method `quantile` defines the quantile level (0..1)(defaults to 0.5)

#### Defined in

[types-dev/index.d.ts:338](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L338)

***

### removeBorderValues?

> `optional` **removeBorderValues**: `boolean`

By default, the additional border values are returned to optimize charting. Set this option to true if this is not wanted (e.g. for script data processing)

#### Defined in

[types-dev/index.d.ts:334](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L334)

***

### returnNewestEntries?

> `optional` **returnNewestEntries**: `boolean`

Returned data is normally sorted ascending by date, this option lets you return the newest instead of the oldest values if the number of returned points is limited

#### Defined in

[types-dev/index.d.ts:332](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L332)

***

### round?

> `optional` **round**: `number`

round result to number of digits after decimal point

#### Defined in

[types-dev/index.d.ts:312](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L312)

***

### sessionId?

> `optional` **sessionId**: `number`

This number will be returned in answer, so the client can assign the request for it

#### Defined in

[types-dev/index.d.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L316)

***

### start?

> `optional` **start**: `number`

Start time in ms

#### Defined in

[types-dev/index.d.ts:294](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L294)

***

### step?

> `optional` **step**: `number`

Step in ms of intervals. Used in aggregate (max, min, average, total, ...)

#### Defined in

[types-dev/index.d.ts:298](https://github.com/ioBroker/ioBroker.js-controller/blob/b50a278725d350a15d2e89556fee6afed5154f0b/packages/types-dev/index.d.ts#L298)
