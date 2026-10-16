[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageRule

# Interface: MessageRule

Defined in: [types-dev/objects.d.ts:611](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L611)

## Properties

### buttons?

> `optional` **buttons?**: (`"cancel"` \| `"agree"` \| `"ok"`)[]

Defined in: [types-dev/objects.d.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L623)

The buttons that should be shown on the message dialog

***

### condition

> **condition**: `object`

Defined in: [types-dev/objects.d.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L625)

The condition that needs to be met to display the message

#### operand

> **operand**: `"and"` \| `"or"`

#### rules

> **rules**: `string`[]

***

### level

> **level**: `"info"` \| `"warn"` \| `"error"`

Defined in: [types-dev/objects.d.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L621)

The severity level of the message

***

### link?

> `optional` **link?**: `string`

Defined in: [types-dev/objects.d.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L617)

Optional link

***

### linkText?

> `optional` **linkText?**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L619)

Text of the link

***

### text

> **text**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:615](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L615)

The message content

***

### title

> **title**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L613)

The message title
