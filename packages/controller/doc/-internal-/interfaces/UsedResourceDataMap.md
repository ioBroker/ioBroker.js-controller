[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UsedResourceDataMap

# Interface: UsedResourceDataMap

Defined in: [types-dev/index.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L167)

Maps every known resource type to its strictly typed payload.
To introduce a new resource type, add its `RESOURCE_TYPE: RESOURCE_TYPE_Data` entry here
(this map is intentionally open for module augmentation by adapters that own custom resources).

## Properties

### bluetooth

> **bluetooth**: [`BluetoothResourceData`](BluetoothResourceData.md)

Defined in: [types-dev/index.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L172)

***

### gpio

> **gpio**: [`GpioResourceData`](GpioResourceData.md)

Defined in: [types-dev/index.d.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L173)

***

### serialPort

> **serialPort**: [`SerialPortResourceData`](SerialPortResourceData.md)

Defined in: [types-dev/index.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L168)

***

### tcpPort

> **tcpPort**: [`TcpPortResourceData`](TcpPortResourceData.md)

Defined in: [types-dev/index.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L169)

***

### udpPort

> **udpPort**: [`UdpPortResourceData`](UdpPortResourceData.md)

Defined in: [types-dev/index.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L170)

***

### usb

> **usb**: [`UsbResourceData`](UsbResourceData.md)

Defined in: [types-dev/index.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L171)
