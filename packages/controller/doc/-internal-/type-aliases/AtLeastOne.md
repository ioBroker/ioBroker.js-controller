[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AtLeastOne

# Type Alias: AtLeastOne\<T, Req, Opt\>

> **AtLeastOne**\<`T`, `Req`, `Opt`\> = `{ [K in keyof Req]: Omit<Opt, K> & { [P in K]: Req[P] } }`\[keyof `Req`\]

Defined in: [types-dev/index.d.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L15)

## Type Parameters

### T

`T`

### Req

`Req` = `{ [K in keyof T]-?: T[K] }`

### Opt

`Opt` = `{ [K in keyof T]?: T[K] }`
