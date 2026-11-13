[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LocalLink

# Type Alias: LocalLink

> **LocalLink** = `object`

Defined in: [types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L669)

## Properties

### cloud?

> `optional` **cloud?**: `string`

Defined in: [types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L679)

Link to the adapter if it could be shown in the free cloud, like: vis-2/index.html according to "https://iobroker.net/"

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L675)

Color

***

### description?

> `optional` **description?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L687)

Description of the link. Could be multi-language

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L677)

Link to icon, like "vis-2/img/favicon.png"

***

### intro?

> `optional` **intro?**: `boolean`

Defined in: [types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L683)

If this link should be shown on the intro tab in admin. false = do not show

***

### link

> **link**: `string`

Defined in: [types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L671)

Link to the web service of this adapter, like: "%web_protocol%://%ip%:%web_port%/vis-2/edit.html"

***

### name?

> `optional` **name?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L673)

Name of the link. Could be multi-language

***

### order?

> `optional` **order?**: `number`

Defined in: [types-dev/objects.d.ts:685](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L685)

Order of the card. Used on "intro" and cloud tabs to sort the links

***

### pro?

> `optional` **pro?**: `string`

Defined in: [types-dev/objects.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L681)

Link to the adapter if it could be shown in the pro-cloud, like: vis-2/edit.html according to "https://iobroker.pro/"
