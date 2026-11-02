[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DevicesWidgets

# Interface: DevicesWidgets

Defined in: [types-dev/objects.d.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L542)

This structure defines the widgets for "devices" adapter

## Properties

### components

> **components**: `object`[]

Defined in: [types-dev/objects.d.ts:556](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L556)

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

Defined in: [types-dev/objects.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L554)

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

Defined in: [types-dev/objects.d.ts:571](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L571)

Background components, exported by the `Components` module of the plugin like the widgets. The devices app renders each of
them once, next to the category and whichever category is shown, with the widgets of this adapter in all categories that the
user may see. For what must not stop with its category, e.g. a phone that has to stay registered to ring.

***

### url?

> `optional` **url?**: `string`

Defined in: [types-dev/objects.d.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L544)

Link to the file with components relatively to `admin/dm-widgets` in admin or `${adapterName}` in web. Default is customDevices.js
