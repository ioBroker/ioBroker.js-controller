[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AtLeastOne

# Type Alias: AtLeastOne\<T, Req, Opt\>

> **AtLeastOne**\<`T`, `Req`, `Opt`\>: `{ [K in keyof Req]: Omit<Opt, K> & { [P in K]: Req[P] } }`\[keyof `Req`\]

## Type Parameters

• **T**

• **Req** = `{ [K in keyof T]-?: T[K] }`

• **Opt** = `{ [K in keyof T]?: T[K] }`

## Defined in

[types-dev/index.d.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/664d3c56250ad4e09c02e3cf6b90746a581d9f55/packages/types-dev/index.d.ts#L11)
