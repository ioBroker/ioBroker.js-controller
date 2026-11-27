[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LogMessage

# Interface: LogMessage

Defined in: [types-dev/index.d.ts:401](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/index.d.ts#L401)

Log message

## Properties

### \_id

> **\_id**: `number`

Defined in: [types-dev/index.d.ts:403](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/index.d.ts#L403)

unique ID

***

### alreadyPushed?

> `optional` **alreadyPushed?**: `boolean`

Defined in: [types-dev/index.d.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/index.d.ts#L417)

Set when the producer of this record has already pushed it to the log transporters itself, so
that a host which logs the record a second time - e.g. captured from the output of a child
process - does not push it again and show it twice

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:405](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/index.d.ts#L405)

id of the source instance

***

### message

> **message**: `string`

Defined in: [types-dev/index.d.ts:411](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/index.d.ts#L411)

actual content

***

### severity

> **severity**: `string`

Defined in: [types-dev/index.d.ts:407](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/index.d.ts#L407)

log level

***

### ts

> **ts**: `number`

Defined in: [types-dev/index.d.ts:409](https://github.com/ioBroker/ioBroker.js-controller/blob/b62a32b960333e433da0f12f4d80867ad6ba6e25/packages/types-dev/index.d.ts#L409)

timestamp
