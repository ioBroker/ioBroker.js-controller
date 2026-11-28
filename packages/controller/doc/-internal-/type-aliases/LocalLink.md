[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LocalLink

# Type Alias: LocalLink

> **LocalLink** = `object`

Defined in: [types-dev/objects.d.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L688)

## Properties

### cloud?

> `optional` **cloud?**: `string`

Defined in: [types-dev/objects.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L698)

Link to the adapter if it could be shown in the free cloud, like: vis-2/index.html according to "https://iobroker.net/"

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L694)

Color

***

### description?

> `optional` **description?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L706)

Description of the link. Could be multi-language

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L696)

Link to icon, like "vis-2/img/favicon.png"

***

### intro?

> `optional` **intro?**: `boolean`

Defined in: [types-dev/objects.d.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L702)

If this link should be shown on the intro tab in admin. false = do not show

***

### link

> **link**: `string`

Defined in: [types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L690)

Link to the web service of this adapter, like: "%web_protocol%://%ip%:%web_port%/vis-2/edit.html"

***

### name?

> `optional` **name?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L692)

Name of the link. Could be multi-language

***

### order?

> `optional` **order?**: `number`

Defined in: [types-dev/objects.d.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L704)

Order of the card. Used on "intro" and cloud tabs to sort the links

***

### pro?

> `optional` **pro?**: `string`

Defined in: [types-dev/objects.d.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L700)

Link to the adapter if it could be shown in the pro-cloud, like: vis-2/edit.html according to "https://iobroker.pro/"
