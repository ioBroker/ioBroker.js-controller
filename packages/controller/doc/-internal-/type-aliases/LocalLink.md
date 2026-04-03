[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LocalLink

# Type Alias: LocalLink

> **LocalLink** = `object`

Defined in: [types-dev/objects.d.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L621)

## Properties

### cloud?

> `optional` **cloud?**: `string`

Defined in: [types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L631)

Link to the adapter if it could be shown in the free cloud, like: vis-2/index.html according to "https://iobroker.net/"

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L627)

Color

***

### description?

> `optional` **description?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L639)

Description of the link. Could be multi-language

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L629)

Link to icon, like "vis-2/img/favicon.png"

***

### intro?

> `optional` **intro?**: `boolean`

Defined in: [types-dev/objects.d.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L635)

If this link should be shown on the intro tab in admin. false = do not show

***

### link

> **link**: `string`

Defined in: [types-dev/objects.d.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L623)

Link to the web service of this adapter, like: "%web_protocol%://%ip%:%web_port%/vis-2/edit.html"

***

### name?

> `optional` **name?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L625)

Name of the link. Could be multi-language

***

### order?

> `optional` **order?**: `number`

Defined in: [types-dev/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L637)

Order of the card. Used on "intro" and cloud tabs to sort the links

***

### pro?

> `optional` **pro?**: `string`

Defined in: [types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L633)

Link to the adapter if it could be shown in the pro-cloud, like: vis-2/edit.html according to "https://iobroker.pro/"
