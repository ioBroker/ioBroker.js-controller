[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DevicesWidgets

# Interface: DevicesWidgets

Defined in: [types-dev/objects.d.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L536)

This structure defines the widgets for "devices" adapter

## Properties

### components

> **components**: `object`[]

Defined in: [types-dev/objects.d.ts:550](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L550)

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

Defined in: [types-dev/objects.d.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L548)

Link to the file (icons.json) with specific icons in form
```ts
 type IconDescription = {
  name: ioBroker.Translated,
  icons: [{id: string, label: ioBroker.Translated, category: string, icon: 'data:image/svg+xml;base64,...'}]
 };
 ```

***

### url?

> `optional` **url?**: `string`

Defined in: [types-dev/objects.d.ts:538](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L538)

Link to the file with components relatively to `admin/dm-widgets` in admin or `${adapterName}` in web. Default is customDevices.js
