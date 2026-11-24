[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / WebComponentEntry

# Interface: WebComponentEntry

Defined in: [types-dev/objects.d.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L593)

A web component of `common.webComponents` with a short form of its manifest. The manifest stays the source:
the short form is generated from it (`@iobroker/web-components`) and copied into the repository, so that a
host can list the component before its adapter is installed. Settings and description are left out on purpose,
as `common` is copied into every instance object

## Properties

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:601](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L601)

Picture of the component, as in the manifest: relative to the manifest file, or a `data:` URL

***

### manifest

> **manifest**: `string`

Defined in: [types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L595)

The manifest file (`.json`), relative to the admin folder, like a plain entry of `webComponents`

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L599)

Name of the component, as in the manifest

***

### size?

> `optional` **size?**: `object`

Defined in: [types-dev/objects.d.ts:603](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L603)

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

Defined in: [types-dev/objects.d.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L597)

Name of the custom element, as in the manifest
