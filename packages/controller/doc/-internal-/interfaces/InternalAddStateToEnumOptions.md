[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalAddStateToEnumOptions

# Interface: InternalAddStateToEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:803](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L803)

Options for adding a state to an enum

## Properties

### addTo

> **addTo**: `string`

Defined in: [adapter/src/lib/\_Types.ts:807](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L807)

The enum id to add the state to

***

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:817](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L817)

Called once the state has been added

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:805](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L805)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:815](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L815)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L811)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:809](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L809)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L813)

The name of the state
