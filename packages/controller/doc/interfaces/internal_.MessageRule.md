[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / MessageRule

# Interface: MessageRule

[\<internal\>](../modules/internal_.md).MessageRule

## Table of contents

### Properties

- [buttons](internal_.MessageRule.md#buttons)
- [condition](internal_.MessageRule.md#condition)
- [level](internal_.MessageRule.md#level)
- [link](internal_.MessageRule.md#link)
- [linkText](internal_.MessageRule.md#linktext)
- [text](internal_.MessageRule.md#text)
- [title](internal_.MessageRule.md#title)

## Properties

### buttons

• `Optional` **buttons**: (``"agree"`` \| ``"cancel"`` \| ``"ok"``)[]

The buttons which should be shown on the message dialog

#### Defined in

[types-dev/objects.d.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/3bbff415/packages/types-dev/objects.d.ts#L540)

___

### condition

• **condition**: `Object`

The condition which needs to be met to display the message

#### Type declaration

| Name | Type |
| :------ | :------ |
| `operand` | ``"and"`` \| ``"or"`` |
| `rules` | `string`[] |

#### Defined in

[types-dev/objects.d.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/3bbff415/packages/types-dev/objects.d.ts#L542)

___

### level

• **level**: ``"info"`` \| ``"warn"`` \| ``"error"``

The severity level of the message

#### Defined in

[types-dev/objects.d.ts:538](https://github.com/ioBroker/ioBroker.js-controller/blob/3bbff415/packages/types-dev/objects.d.ts#L538)

___

### link

• `Optional` **link**: `string`

Optional link

#### Defined in

[types-dev/objects.d.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/3bbff415/packages/types-dev/objects.d.ts#L534)

___

### linkText

• `Optional` **linkText**: [`Translated`](../modules/internal_.md#translated)

Text of the link

#### Defined in

[types-dev/objects.d.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/3bbff415/packages/types-dev/objects.d.ts#L536)

___

### text

• **text**: [`Translated`](../modules/internal_.md#translated)

The message content

#### Defined in

[types-dev/objects.d.ts:532](https://github.com/ioBroker/ioBroker.js-controller/blob/3bbff415/packages/types-dev/objects.d.ts#L532)

___

### title

• **title**: [`Translated`](../modules/internal_.md#translated)

The message title

#### Defined in

[types-dev/objects.d.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/3bbff415/packages/types-dev/objects.d.ts#L530)