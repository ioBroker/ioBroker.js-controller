[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UsbResourceData

# Interface: UsbResourceData

Defined in: [types-dev/index.d.ts:132](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L132)

A USB device occupied by an instance

## Properties

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L134)

System path of the USB device, e.g. "/dev/bus/usb/001/004" or "\\\\.\\COM3"

***

### productId?

> `optional` **productId?**: `string`

Defined in: [types-dev/index.d.ts:138](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L138)

USB product id (hex string), e.g. "ea60"

***

### vendorId?

> `optional` **vendorId?**: `string`

Defined in: [types-dev/index.d.ts:136](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L136)

USB vendor id (hex string), e.g. "10c4"
