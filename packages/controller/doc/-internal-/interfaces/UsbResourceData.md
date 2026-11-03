[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UsbResourceData

# Interface: UsbResourceData

Defined in: [types-dev/index.d.ts:133](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L133)

A USB device occupied by an instance

## Properties

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:135](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L135)

System path of the USB device, e.g. "/dev/bus/usb/001/004" or "\\\\.\\COM3"

***

### productId?

> `optional` **productId?**: `string`

Defined in: [types-dev/index.d.ts:139](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L139)

USB product id (hex string), e.g. "ea60"

***

### vendorId?

> `optional` **vendorId?**: `string`

Defined in: [types-dev/index.d.ts:137](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L137)

USB vendor id (hex string), e.g. "10c4"
