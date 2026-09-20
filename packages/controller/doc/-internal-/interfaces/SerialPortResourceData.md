[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SerialPortResourceData

# Interface: SerialPortResourceData

Defined in: [types-dev/index.d.ts:93](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L93)

A serial port occupied by an instance

## Properties

### baudRate?

> `optional` **baudRate?**: `number`

Defined in: [types-dev/index.d.ts:100](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L100)

Baud rate the port is opened with, if known

***

### device?

> `optional` **device?**: `string`

Defined in: [types-dev/index.d.ts:106](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L106)

The device `port` resolves to, e.g. "/dev/ttyUSB0" for a "/dev/serial/by-id/..." link or "COM3" for
"\\\\.\\com3". Set by the host on registration and used to recognize the same port under different
names; an adapter does not set it.

***

### port

> **port**: `string`

Defined in: [types-dev/index.d.ts:98](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/index.d.ts#L98)

System path or name of the serial port as the adapter opens it, e.g. "/dev/ttyUSB0", a stable
"/dev/serial/by-id/..." link or "COM3"
