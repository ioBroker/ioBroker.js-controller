[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterContextBase

# Abstract Class: AdapterContextBase

Defined in: [adapter/src/lib/adapter/managers/AdapterContextBase.ts:16](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/AdapterContextBase.ts#L16)

Base class for adapter managers that read from the shared [AdapterContext](../interfaces/AdapterContext.md).

Holds the context in a private `#ctx` field so subclasses cannot bypass the connection-checked
getters and reach the raw (possibly null) DB clients directly. Access to `states`/`objects` goes
through the throwing getters, which raise `ERROR_DB_CLOSED` when the respective database is not
connected; the other getters pass ctx values through unchanged.

Getters are `protected` because `#` privates are not visible to subclasses.

## Extended by

- [`MessagingManager`](MessagingManager.md)
- [`CertificateManager`](CertificateManager.md)

## Constructors

### Constructor

> **new AdapterContextBase**(`ctx`): `AdapterContextBase`

Defined in: [adapter/src/lib/adapter/managers/AdapterContextBase.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/AdapterContextBase.ts#L22)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

#### Returns

`AdapterContextBase`
