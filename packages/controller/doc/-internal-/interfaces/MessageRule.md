[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageRule

# Interface: MessageRule

Defined in: [types-dev/objects.d.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L650)

## Properties

### buttons?

> `optional` **buttons?**: (`"cancel"` \| `"agree"` \| `"ok"`)[]

Defined in: [types-dev/objects.d.ts:662](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L662)

The buttons that should be shown on the message dialog

***

### condition

> **condition**: `object`

Defined in: [types-dev/objects.d.ts:664](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L664)

The condition that needs to be met to display the message

#### operand

> **operand**: `"and"` \| `"or"`

#### rules

> **rules**: `string`[]

***

### level

> **level**: `"info"` \| `"warn"` \| `"error"`

Defined in: [types-dev/objects.d.ts:660](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L660)

The severity level of the message

***

### link?

> `optional` **link?**: `string`

Defined in: [types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L656)

Optional link

***

### linkText?

> `optional` **linkText?**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L658)

Text of the link

***

### text

> **text**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L654)

The message content

***

### title

> **title**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L652)

The message title
