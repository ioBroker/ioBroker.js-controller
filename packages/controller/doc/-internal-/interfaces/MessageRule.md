[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageRule

# Interface: MessageRule

Defined in: [types-dev/objects.d.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L589)

## Properties

### buttons?

> `optional` **buttons?**: (`"agree"` \| `"cancel"` \| `"ok"`)[]

Defined in: [types-dev/objects.d.ts:601](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L601)

The buttons that should be shown on the message dialog

***

### condition

> **condition**: `object`

Defined in: [types-dev/objects.d.ts:603](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L603)

The condition that needs to be met to display the message

#### operand

> **operand**: `"and"` \| `"or"`

#### rules

> **rules**: `string`[]

***

### level

> **level**: `"info"` \| `"warn"` \| `"error"`

Defined in: [types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L599)

The severity level of the message

***

### link?

> `optional` **link?**: `string`

Defined in: [types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L595)

Optional link

***

### linkText?

> `optional` **linkText?**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L597)

Text of the link

***

### text

> **text**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L593)

The message content

***

### title

> **title**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L591)

The message title
