[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AtLeastOne

# Type Alias: AtLeastOne\<T, Req, Opt\>

> **AtLeastOne**\<`T`, `Req`, `Opt`\> = `{ [K in keyof Req]: Omit<Opt, K> & { [P in K]: Req[P] } }`\[keyof `Req`\]

Defined in: [types-dev/index.d.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/index.d.ts#L15)

## Type Parameters

### T

`T`

### Req

`Req` = `{ [K in keyof T]-?: T[K] }`

### Opt

`Opt` = `{ [K in keyof T]?: T[K] }`
