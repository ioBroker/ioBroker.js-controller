[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UsedResourceDataMap

# Interface: UsedResourceDataMap

Defined in: [types-dev/index.d.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L166)

Maps every known resource type to its strictly typed payload.
To introduce a new resource type, add its `RESOURCE_TYPE: RESOURCE_TYPE_Data` entry here
(this map is intentionally open for module augmentation by adapters that own custom resources).

## Properties

### bluetooth

> **bluetooth**: [`BluetoothResourceData`](BluetoothResourceData.md)

Defined in: [types-dev/index.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L171)

***

### gpio

> **gpio**: [`GpioResourceData`](GpioResourceData.md)

Defined in: [types-dev/index.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L172)

***

### serialPort

> **serialPort**: [`SerialPortResourceData`](SerialPortResourceData.md)

Defined in: [types-dev/index.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L167)

***

### tcpPort

> **tcpPort**: [`TcpPortResourceData`](TcpPortResourceData.md)

Defined in: [types-dev/index.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L168)

***

### udpPort

> **udpPort**: [`UdpPortResourceData`](UdpPortResourceData.md)

Defined in: [types-dev/index.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L169)

***

### usb

> **usb**: [`UsbResourceData`](UsbResourceData.md)

Defined in: [types-dev/index.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L170)
