[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / VisWidget

# Interface: VisWidget

Defined in: [types-dev/objects.d.ts:535](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L535)

## Properties

### bundlerType?

> `optional` **bundlerType?**: `"module"`

Defined in: [types-dev/objects.d.ts:541](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L541)

If the widget was written with TypeScript

***

### components

> **components**: `string`[]

Defined in: [types-dev/objects.d.ts:539](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L539)

***

### i18n

> **i18n**: `true` \| [`Translated`](../type-aliases/Translated.md) \| `"component"`

Defined in: [types-dev/objects.d.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L536)

***

### ignoreInVersions?

> `optional` **ignoreInVersions?**: `number`[]

Defined in: [types-dev/objects.d.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L543)

The vis widget does not support the listed major versions of vis

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:537](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L537)

***

### services?

> `optional` **services?**: `string`[]

Defined in: [types-dev/objects.d.ts:549](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L549)

Background components of the set, exposed by its module federation like the `components`. vis-2 renders each of them once
in the runtime, next to the views and whichever view is shown, with the widgets of the set in all views of the project that
the user may see. For what must not stop with its view, e.g. a phone that has to stay registered to ring.

***

### url

> **url**: `string`

Defined in: [types-dev/objects.d.ts:538](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L538)
