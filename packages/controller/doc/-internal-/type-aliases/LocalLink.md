[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LocalLink

# Type Alias: LocalLink

> **LocalLink** = `object`

Defined in: [types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L631)

## Properties

### cloud?

> `optional` **cloud?**: `string`

Defined in: [types-dev/objects.d.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L641)

Link to the adapter if it could be shown in the free cloud, like: vis-2/index.html according to "https://iobroker.net/"

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L637)

Color

***

### description?

> `optional` **description?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L649)

Description of the link. Could be multi-language

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L639)

Link to icon, like "vis-2/img/favicon.png"

***

### intro?

> `optional` **intro?**: `boolean`

Defined in: [types-dev/objects.d.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L645)

If this link should be shown on the intro tab in admin. false = do not show

***

### link

> **link**: `string`

Defined in: [types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L633)

Link to the web service of this adapter, like: "%web_protocol%://%ip%:%web_port%/vis-2/edit.html"

***

### name?

> `optional` **name?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L635)

Name of the link. Could be multi-language

***

### order?

> `optional` **order?**: `number`

Defined in: [types-dev/objects.d.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L647)

Order of the card. Used on "intro" and cloud tabs to sort the links

***

### pro?

> `optional` **pro?**: `string`

Defined in: [types-dev/objects.d.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/types-dev/objects.d.ts#L643)

Link to the adapter if it could be shown in the pro-cloud, like: vis-2/edit.html according to "https://iobroker.pro/"
