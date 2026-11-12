[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UsedResourceDataMap

# Interface: UsedResourceDataMap

Defined in: [types-dev/index.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L174)

Maps every known resource type to its strictly typed payload.
To introduce a new resource type, add its `RESOURCE_TYPE: RESOURCE_TYPE_Data` entry here
(this map is intentionally open for module augmentation by adapters that own custom resources).

## Properties

### bluetooth

> **bluetooth**: [`BluetoothResourceData`](BluetoothResourceData.md)

Defined in: [types-dev/index.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L179)

***

### gpio

> **gpio**: [`GpioResourceData`](GpioResourceData.md)

Defined in: [types-dev/index.d.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L180)

***

### serialPort

> **serialPort**: [`SerialPortResourceData`](SerialPortResourceData.md)

Defined in: [types-dev/index.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L175)

***

### tcpPort

> **tcpPort**: [`TcpPortResourceData`](TcpPortResourceData.md)

Defined in: [types-dev/index.d.ts:176](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L176)

***

### udpPort

> **udpPort**: [`UdpPortResourceData`](UdpPortResourceData.md)

Defined in: [types-dev/index.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L177)

***

### usb

> **usb**: [`UsbResourceData`](UsbResourceData.md)

Defined in: [types-dev/index.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/types-dev/index.d.ts#L178)
