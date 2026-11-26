[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DevicesWidgets

# Interface: DevicesWidgets

Defined in: [types-dev/objects.d.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L555)

This structure defines the widgets for "devices" adapter

## Properties

### components

> **components**: `object`[]

Defined in: [types-dev/objects.d.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L569)

Description of the components (widgets). It could be multiple widgets in one adapter

#### description?

> `optional` **description?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

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

### iconsManifest?

> `optional` **iconsManifest?**: `string`

Defined in: [types-dev/objects.d.ts:567](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L567)

Link to the file (icons.json) with specific icons in form
```ts
 type IconDescription = {
  name: ioBroker.Translated,
  icons: [{id: string, label: ioBroker.Translated, category: string, icon: 'data:image/svg+xml;base64,...'}]
 };
 ```

***

### services?

> `optional` **services?**: `string`[]

Defined in: [types-dev/objects.d.ts:584](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L584)

Background components, exported by the `Components` module of the plugin like the widgets. The devices app renders each of
them once, next to the category and whichever category is shown, with the widgets of this adapter in all categories that the
user may see. For what must not stop with its category, e.g. a phone that has to stay registered to ring.

***

### url?

> `optional` **url?**: `string`

Defined in: [types-dev/objects.d.ts:557](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L557)

Link to the file with components relatively to `admin/dm-widgets` in admin or `${adapterName}` in web. Default is customDevices.js
