[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageRule

# Interface: MessageRule

## Properties

### buttons?

> `optional` **buttons**: (`"agree"` \| `"cancel"` \| `"ok"`)[]

The buttons which should be shown on the message dialog

#### Defined in

[types-dev/objects.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/3f7dfd7110e5b0031cea7f51684c94438886c7d3/packages/types-dev/objects.d.ts#L554)

***

### condition

> **condition**: `object`

The condition which needs to be met to display the message

#### operand

> **operand**: `"and"` \| `"or"`

#### rules

> **rules**: `string`[]

#### Defined in

[types-dev/objects.d.ts:556](https://github.com/ioBroker/ioBroker.js-controller/blob/3f7dfd7110e5b0031cea7f51684c94438886c7d3/packages/types-dev/objects.d.ts#L556)

***

### level

> **level**: `"info"` \| `"warn"` \| `"error"`

The severity level of the message

#### Defined in

[types-dev/objects.d.ts:552](https://github.com/ioBroker/ioBroker.js-controller/blob/3f7dfd7110e5b0031cea7f51684c94438886c7d3/packages/types-dev/objects.d.ts#L552)

***

### link?

> `optional` **link**: `string`

Optional link

#### Defined in

[types-dev/objects.d.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/3f7dfd7110e5b0031cea7f51684c94438886c7d3/packages/types-dev/objects.d.ts#L548)

***

### linkText?

> `optional` **linkText**: [`Translated`](../type-aliases/Translated.md)

Text of the link

#### Defined in

[types-dev/objects.d.ts:550](https://github.com/ioBroker/ioBroker.js-controller/blob/3f7dfd7110e5b0031cea7f51684c94438886c7d3/packages/types-dev/objects.d.ts#L550)

***

### text

> **text**: [`Translated`](../type-aliases/Translated.md)

The message content

#### Defined in

[types-dev/objects.d.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/3f7dfd7110e5b0031cea7f51684c94438886c7d3/packages/types-dev/objects.d.ts#L546)

***

### title

> **title**: [`Translated`](../type-aliases/Translated.md)

The message title

#### Defined in

[types-dev/objects.d.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/3f7dfd7110e5b0031cea7f51684c94438886c7d3/packages/types-dev/objects.d.ts#L544)
