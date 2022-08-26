[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / LogMethod

# Interface: LogMethod

[<internal>](../modules/internal_.md).LogMethod

## Callable

### LogMethod

▸ **LogMethod**(`level`, `message`, `callback`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `string` |
| `message` | `string` |
| `callback` | [`LogCallback`](../modules/internal_.md#logcallback) |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:77

### LogMethod

▸ **LogMethod**(`level`, `message`, `meta`, `callback`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `string` |
| `message` | `string` |
| `meta` | `any` |
| `callback` | [`LogCallback`](../modules/internal_.md#logcallback) |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:78

### LogMethod

▸ **LogMethod**(`level`, `message`, ...`meta`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `string` |
| `message` | `string` |
| `...meta` | `any`[] |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:79

### LogMethod

▸ **LogMethod**(`entry`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entry` | [`LogEntry`](internal_.LogEntry.md) |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:80

### LogMethod

▸ **LogMethod**(`level`, `message`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `string` |
| `message` | `any` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:81
