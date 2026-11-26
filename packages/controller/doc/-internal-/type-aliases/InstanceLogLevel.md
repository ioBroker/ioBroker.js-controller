[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceLogLevel

# Type Alias: InstanceLogLevel

> **InstanceLogLevel** = [`LogLevel`](LogLevel.md) \| `"off"`

Defined in: [types-dev/index.d.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/index.d.ts#L383)

Log level of an adapter instance
(`common.loglevel` and the state `system.adapter.<name>.<instance>.logLevel`)

Besides the real levels, `off` switches every output of the instance off, also errors. It is no level of a
log entry and no level a logger can be set to, which is why it is not part of [LogLevel](LogLevel.md)
