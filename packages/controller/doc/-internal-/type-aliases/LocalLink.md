[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LocalLink

# Type Alias: LocalLink

> **LocalLink** = `object`

Defined in: [types-dev/objects.d.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L682)

## Properties

### cloud?

> `optional` **cloud?**: `string`

Defined in: [types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L692)

Link to the adapter if it could be shown in the free cloud, like: vis-2/index.html according to "https://iobroker.net/"

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L688)

Color

***

### description?

> `optional` **description?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L700)

Description of the link. Could be multi-language

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L690)

Link to icon, like "vis-2/img/favicon.png"

***

### intro?

> `optional` **intro?**: `boolean`

Defined in: [types-dev/objects.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L696)

If this link should be shown on the intro tab in admin. false = do not show

***

### link

> **link**: `string`

Defined in: [types-dev/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L684)

Link to the web service of this adapter, like: "%web_protocol%://%ip%:%web_port%/vis-2/edit.html"

***

### name?

> `optional` **name?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L686)

Name of the link. Could be multi-language

***

### order?

> `optional` **order?**: `number`

Defined in: [types-dev/objects.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L698)

Order of the card. Used on "intro" and cloud tabs to sort the links

***

### pro?

> `optional` **pro?**: `string`

Defined in: [types-dev/objects.d.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/objects.d.ts#L694)

Link to the adapter if it could be shown in the pro-cloud, like: vis-2/edit.html according to "https://iobroker.pro/"
