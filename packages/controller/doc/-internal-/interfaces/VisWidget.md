[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / VisWidget

# Interface: VisWidget

Defined in: [types-dev/objects.d.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L522)

## Properties

### bundlerType?

> `optional` **bundlerType?**: `"module"`

Defined in: [types-dev/objects.d.ts:528](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L528)

If the widget was written with TypeScript

***

### components

> **components**: `string`[]

Defined in: [types-dev/objects.d.ts:526](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L526)

***

### i18n

> **i18n**: `true` \| [`Translated`](../type-aliases/Translated.md) \| `"component"`

Defined in: [types-dev/objects.d.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L523)

***

### ignoreInVersions?

> `optional` **ignoreInVersions?**: `number`[]

Defined in: [types-dev/objects.d.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L530)

The vis widget does not support the listed major versions of vis

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:524](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L524)

***

### services?

> `optional` **services?**: `string`[]

Defined in: [types-dev/objects.d.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L536)

Background components of the set, exposed by its module federation like the `components`. vis-2 renders each of them once
in the runtime, next to the views and whichever view is shown, with the widgets of the set in all views of the project that
the user may see. For what must not stop with its view, e.g. a phone that has to stay registered to ring.

***

### url

> **url**: `string`

Defined in: [types-dev/objects.d.ts:525](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L525)
