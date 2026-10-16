[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LocalLink

# Type Alias: LocalLink

> **LocalLink** = `object`

Defined in: [types-dev/objects.d.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L643)

## Properties

### cloud?

> `optional` **cloud?**: `string`

Defined in: [types-dev/objects.d.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L653)

Link to the adapter if it could be shown in the free cloud, like: vis-2/index.html according to "https://iobroker.net/"

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L649)

Color

***

### description?

> `optional` **description?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:661](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L661)

Description of the link. Could be multi-language

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L651)

Link to icon, like "vis-2/img/favicon.png"

***

### intro?

> `optional` **intro?**: `boolean`

Defined in: [types-dev/objects.d.ts:657](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L657)

If this link should be shown on the intro tab in admin. false = do not show

***

### link

> **link**: `string`

Defined in: [types-dev/objects.d.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L645)

Link to the web service of this adapter, like: "%web_protocol%://%ip%:%web_port%/vis-2/edit.html"

***

### name?

> `optional` **name?**: [`StringOrTranslated`](StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L647)

Name of the link. Could be multi-language

***

### order?

> `optional` **order?**: `number`

Defined in: [types-dev/objects.d.ts:659](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L659)

Order of the card. Used on "intro" and cloud tabs to sort the links

***

### pro?

> `optional` **pro?**: `string`

Defined in: [types-dev/objects.d.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L655)

Link to the adapter if it could be shown in the pro-cloud, like: vis-2/edit.html according to "https://iobroker.pro/"
