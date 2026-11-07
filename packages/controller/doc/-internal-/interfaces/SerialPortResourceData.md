[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SerialPortResourceData

# Interface: SerialPortResourceData

Defined in: [types-dev/index.d.ts:100](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L100)

A serial port occupied by an instance

## Properties

### baudRate?

> `optional` **baudRate?**: `number`

Defined in: [types-dev/index.d.ts:107](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L107)

Baud rate the port is opened with, if known

***

### device?

> `optional` **device?**: `string`

Defined in: [types-dev/index.d.ts:113](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L113)

The device `port` resolves to, e.g. "/dev/ttyUSB0" for a "/dev/serial/by-id/..." link or "COM3" for
"\\\\.\\com3". Set by the host on registration and used to recognize the same port under different
names; an adapter does not set it.

***

### port

> **port**: `string`

Defined in: [types-dev/index.d.ts:105](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L105)

System path or name of the serial port as the adapter opens it, e.g. "/dev/ttyUSB0", a stable
"/dev/serial/by-id/..." link or "COM3"
