[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SerialPortResourceData

# Interface: SerialPortResourceData

Defined in: [types-dev/index.d.ts:98](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L98)

A serial port occupied by an instance

## Properties

### baudRate?

> `optional` **baudRate?**: `number`

Defined in: [types-dev/index.d.ts:105](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L105)

Baud rate the port is opened with, if known

***

### device?

> `optional` **device?**: `string`

Defined in: [types-dev/index.d.ts:111](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L111)

The device `port` resolves to, e.g. "/dev/ttyUSB0" for a "/dev/serial/by-id/..." link or "COM3" for
"\\\\.\\com3". Set by the host on registration and used to recognize the same port under different
names; an adapter does not set it.

***

### port

> **port**: `string`

Defined in: [types-dev/index.d.ts:103](https://github.com/ioBroker/ioBroker.js-controller/blob/487c0bff4a0d0265dd14b97308baecb692589c90/packages/types-dev/index.d.ts#L103)

System path or name of the serial port as the adapter opens it, e.g. "/dev/ttyUSB0", a stable
"/dev/serial/by-id/..." link or "COM3"
