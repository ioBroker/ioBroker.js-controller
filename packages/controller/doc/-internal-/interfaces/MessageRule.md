[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageRule

# Interface: MessageRule

## Properties

### buttons?

> `optional` **buttons**: (`"agree"` \| `"cancel"` \| `"ok"`)[]

The buttons which should be shown on the message dialog

#### Defined in

[types-dev/objects.d.ts:557](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L557)

***

### condition

> **condition**: `object`

The condition which needs to be met to display the message

#### operand

> **operand**: `"and"` \| `"or"`

#### rules

> **rules**: `string`[]

#### Defined in

[types-dev/objects.d.ts:559](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L559)

***

### level

> **level**: `"info"` \| `"warn"` \| `"error"`

The severity level of the message

#### Defined in

[types-dev/objects.d.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L555)

***

### link?

> `optional` **link**: `string`

Optional link

#### Defined in

[types-dev/objects.d.ts:551](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L551)

***

### linkText?

> `optional` **linkText**: [`Translated`](../type-aliases/Translated.md)

Text of the link

#### Defined in

[types-dev/objects.d.ts:553](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L553)

***

### text

> **text**: [`Translated`](../type-aliases/Translated.md)

The message content

#### Defined in

[types-dev/objects.d.ts:549](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L549)

***

### title

> **title**: [`Translated`](../type-aliases/Translated.md)

The message title

#### Defined in

[types-dev/objects.d.ts:547](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L547)
