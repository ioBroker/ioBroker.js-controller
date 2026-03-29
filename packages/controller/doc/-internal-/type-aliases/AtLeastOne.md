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

[types-dev/index.d.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/764d023de697246cf053de688f2dd588f0fba0f8/packages/types-dev/index.d.ts#L15)
