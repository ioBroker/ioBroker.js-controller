[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UsbResourceData

# Interface: UsbResourceData

Defined in: [types-dev/index.d.ts:138](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/index.d.ts#L138)

A USB device occupied by an instance

## Properties

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:140](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/index.d.ts#L140)

System path of the USB device, e.g. "/dev/bus/usb/001/004" or "\\\\.\\COM3"

***

### productId?

> `optional` **productId?**: `string`

Defined in: [types-dev/index.d.ts:144](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/index.d.ts#L144)

USB product id (hex string), e.g. "ea60"

***

### vendorId?

> `optional` **vendorId?**: `string`

Defined in: [types-dev/index.d.ts:142](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/types-dev/index.d.ts#L142)

USB vendor id (hex string), e.g. "10c4"
