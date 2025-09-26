[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageRule

# Interface: MessageRule

## Properties

### buttons?

> `optional` **buttons**: (`"agree"` \| `"cancel"` \| `"ok"`)[]

The buttons which should be shown on the message dialog

#### Defined in

[types-dev/objects.d.ts:573](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L573)

***

### condition

> **condition**: `object`

The condition which needs to be met to display the message

#### operand

> **operand**: `"and"` \| `"or"`

#### rules

> **rules**: `string`[]

#### Defined in

[types-dev/objects.d.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L575)

***

### level

> **level**: `"info"` \| `"warn"` \| `"error"`

The severity level of the message

#### Defined in

[types-dev/objects.d.ts:571](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L571)

***

### link?

> `optional` **link**: `string`

Optional link

#### Defined in

[types-dev/objects.d.ts:567](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L567)

***

### linkText?

> `optional` **linkText**: [`Translated`](../type-aliases/Translated.md)

Text of the link

#### Defined in

[types-dev/objects.d.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L569)

***

### text

> **text**: [`Translated`](../type-aliases/Translated.md)

The message content

#### Defined in

[types-dev/objects.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L565)

***

### title

> **title**: [`Translated`](../type-aliases/Translated.md)

The message title

#### Defined in

[types-dev/objects.d.ts:563](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L563)
