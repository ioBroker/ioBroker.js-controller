[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LocalLink

# Type Alias: LocalLink

> **LocalLink**: `object`

## Type declaration

### cloud?

> `optional` **cloud**: `string`

Link to the adapter if it could be shown in the free cloud, like: vis-2/index.html according to "https://iobroker.net/"

### color?

> `optional` **color**: `string`

Color

### description?

> `optional` **description**: [`StringOrTranslated`](StringOrTranslated.md)

Description of the link. Could be multi-language

### icon?

> `optional` **icon**: `string`

Link to icon, like "vis-2/img/favicon.png"

### intro?

> `optional` **intro**: `boolean`

If this link should be shown on the intro tab in admin. false = do not show

### link

> **link**: `string`

Link to the web service of this adapter, like: "%web_protocol%://%ip%:%web_port%/vis-2/edit.html"

### name?

> `optional` **name**: [`StringOrTranslated`](StringOrTranslated.md)

Name of the link. Could be multi-language

### order?

> `optional` **order**: `number`

Order of the card. Used on "intro" and cloud tabs to sort the links

### pro?

> `optional` **pro**: `string`

Link to the adapter if it could be shown in the pro-cloud, like: vis-2/edit.html according to "https://iobroker.pro/"

## Defined in

[types-dev/objects.d.ts:602](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L602)
