[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageRule

# Interface: MessageRule

Defined in: [types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/types-dev/objects.d.ts#L599)

## Properties

### buttons?

> `optional` **buttons?**: (`"cancel"` \| `"agree"` \| `"ok"`)[]

Defined in: [types-dev/objects.d.ts:611](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/types-dev/objects.d.ts#L611)

The buttons that should be shown on the message dialog

***

### condition

> **condition**: `object`

Defined in: [types-dev/objects.d.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/types-dev/objects.d.ts#L613)

The condition that needs to be met to display the message

#### operand

> **operand**: `"and"` \| `"or"`

#### rules

> **rules**: `string`[]

***

### level

> **level**: `"info"` \| `"warn"` \| `"error"`

Defined in: [types-dev/objects.d.ts:609](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/types-dev/objects.d.ts#L609)

The severity level of the message

***

### link?

> `optional` **link?**: `string`

Defined in: [types-dev/objects.d.ts:605](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/types-dev/objects.d.ts#L605)

Optional link

***

### linkText?

> `optional` **linkText?**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:607](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/types-dev/objects.d.ts#L607)

Text of the link

***

### text

> **text**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:603](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/types-dev/objects.d.ts#L603)

The message content

***

### title

> **title**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:601](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/types-dev/objects.d.ts#L601)

The message title
