[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UsedResourceDataMap

# Interface: UsedResourceDataMap

Defined in: [types-dev/index.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L171)

Maps every known resource type to its strictly typed payload.
To introduce a new resource type, add its `RESOURCE_TYPE: RESOURCE_TYPE_Data` entry here
(this map is intentionally open for module augmentation by adapters that own custom resources).

## Properties

### bluetooth

> **bluetooth**: [`BluetoothResourceData`](BluetoothResourceData.md)

Defined in: [types-dev/index.d.ts:176](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L176)

***

### gpio

> **gpio**: [`GpioResourceData`](GpioResourceData.md)

Defined in: [types-dev/index.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L177)

***

### serialPort

> **serialPort**: [`SerialPortResourceData`](SerialPortResourceData.md)

Defined in: [types-dev/index.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L172)

***

### tcpPort

> **tcpPort**: [`TcpPortResourceData`](TcpPortResourceData.md)

Defined in: [types-dev/index.d.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L173)

***

### udpPort

> **udpPort**: [`UdpPortResourceData`](UdpPortResourceData.md)

Defined in: [types-dev/index.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L174)

***

### usb

> **usb**: [`UsbResourceData`](UsbResourceData.md)

Defined in: [types-dev/index.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/index.d.ts#L175)
