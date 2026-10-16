[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SerialPortResourceData

# Interface: SerialPortResourceData

Defined in: [types-dev/index.d.ts:95](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/index.d.ts#L95)

A serial port occupied by an instance

## Properties

### baudRate?

> `optional` **baudRate?**: `number`

Defined in: [types-dev/index.d.ts:102](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/index.d.ts#L102)

Baud rate the port is opened with, if known

***

### device?

> `optional` **device?**: `string`

Defined in: [types-dev/index.d.ts:108](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/index.d.ts#L108)

The device `port` resolves to, e.g. "/dev/ttyUSB0" for a "/dev/serial/by-id/..." link or "COM3" for
"\\\\.\\com3". Set by the host on registration and used to recognize the same port under different
names; an adapter does not set it.

***

### port

> **port**: `string`

Defined in: [types-dev/index.d.ts:100](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/index.d.ts#L100)

System path or name of the serial port as the adapter opens it, e.g. "/dev/ttyUSB0", a stable
"/dev/serial/by-id/..." link or "COM3"
