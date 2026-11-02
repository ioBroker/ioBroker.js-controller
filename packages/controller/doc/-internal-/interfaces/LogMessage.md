[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / LogMessage

# Interface: LogMessage

Defined in: [types-dev/index.d.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L387)

Log message

## Properties

### \_id

> **\_id**: `number`

Defined in: [types-dev/index.d.ts:389](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L389)

unique ID

***

### alreadyPushed?

> `optional` **alreadyPushed?**: `boolean`

Defined in: [types-dev/index.d.ts:403](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L403)

Set when the producer of this record has already pushed it to the log transporters itself, so
that a host which logs the record a second time - e.g. captured from the output of a child
process - does not push it again and show it twice

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:391](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L391)

id of the source instance

***

### message

> **message**: `string`

Defined in: [types-dev/index.d.ts:397](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L397)

actual content

***

### severity

> **severity**: `string`

Defined in: [types-dev/index.d.ts:393](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L393)

log level

***

### ts

> **ts**: `number`

Defined in: [types-dev/index.d.ts:395](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L395)

timestamp
