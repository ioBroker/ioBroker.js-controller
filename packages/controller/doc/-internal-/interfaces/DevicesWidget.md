[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DevicesWidget

# Interface: DevicesWidget

Defined in: [types-dev/objects.d.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L536)

This structure defines the widgets for "devices" adapter

## Properties

### components

> **components**: `object`[]

Defined in: [types-dev/objects.d.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L540)

Description of the components (widgets). It could be multiple widgets in one adapter

#### description

> **description**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description

#### icon

> **icon**: `string`

Icon as a link to picture imageName.png relative to the admin folder or base64

#### label

> **label**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Title

#### name

> **name**: `string`

Name of the class

***

### url

> **url**: `string`

Defined in: [types-dev/objects.d.ts:538](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L538)

Link to the file with components relatively to `admin/dm-widgets` in admin or `${adapterName}` in web
