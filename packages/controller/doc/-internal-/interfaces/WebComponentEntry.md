[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / WebComponentEntry

# Interface: WebComponentEntry

Defined in: [types-dev/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L580)

A web component of `common.webComponents` with a short form of its manifest. The manifest stays the source:
the short form is generated from it (`@iobroker/web-components`) and copied into the repository, so that a
host can list the component before its adapter is installed. Settings and description are left out on purpose,
as `common` is copied into every instance object

## Properties

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:588](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L588)

Picture of the component, as in the manifest: relative to the manifest file, or a `data:` URL

***

### manifest

> **manifest**: `string`

Defined in: [types-dev/objects.d.ts:582](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L582)

The manifest file (`.json`), relative to the admin folder, like a plain entry of `webComponents`

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:586](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L586)

Name of the component, as in the manifest

***

### size?

> `optional` **size?**: `object`

Defined in: [types-dev/objects.d.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L590)

The size the element looks best in, as in the manifest

#### height

> **height**: `number`

In px

#### noResize?

> `optional` **noResize?**: `boolean`

The component works in exactly this size only

#### width

> **width**: `number`

In px

***

### tag

> **tag**: `string`

Defined in: [types-dev/objects.d.ts:584](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L584)

Name of the custom element, as in the manifest
