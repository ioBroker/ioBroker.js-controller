[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AtLeastOne

# Type Alias: AtLeastOne\<T, Req, Opt\>

> **AtLeastOne**\<`T`, `Req`, `Opt`\> = `{ [K in keyof Req]: Omit<Opt, K> & { [P in K]: Req[P] } }`\[keyof `Req`\]

Defined in: [types-dev/index.d.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L15)

## Type Parameters

### T

`T`

### Req

`Req` = `{ [K in keyof T]-?: T[K] }`

### Opt

`Opt` = `{ [K in keyof T]?: T[K] }`
