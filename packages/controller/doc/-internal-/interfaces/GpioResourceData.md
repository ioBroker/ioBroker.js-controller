[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / GpioResourceData

# Interface: GpioResourceData

Defined in: [types-dev/index.d.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L153)

A GPIO pin occupied by an instance

## Properties

### chip?

> `optional` **chip?**: `string`

Defined in: [types-dev/index.d.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L165)

GPIO chip the pin belongs to, e.g. "gpiochip2" for an I²C port expander. Leave it out for the main chip
of the board; an entry without a chip counts as overlapping with the same pin on any chip, because the
host cannot tell which one was meant.

***

### pin

> **pin**: `number`

Defined in: [types-dev/index.d.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L159)

Line offset of the pin on its GPIO chip. On the main chip of a Raspberry Pi that is the BCM number, so
GPIO 17 is header pin 11. Convert physical header pins, wiringPi numbers or sysfs numbers (which start
at 512 on newer kernels) before registering, otherwise the same pin is not recognized.
