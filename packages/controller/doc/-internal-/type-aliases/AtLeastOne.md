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

[types-dev/index.d.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L15)
