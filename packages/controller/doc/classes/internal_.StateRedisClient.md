[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / StateRedisClient

# Class: StateRedisClient

[\<internal\>](../modules/internal_.md).StateRedisClient

## Table of contents

### Constructors

- [constructor](internal_.StateRedisClient.md#constructor)

### Properties

- [namespaceMsg](internal_.StateRedisClient.md#namespacemsg)

### Methods

- [\_destroyDBHelper](internal_.StateRedisClient.md#_destroydbhelper)
- [\_determineProtocolVersion](internal_.StateRedisClient.md#_determineprotocolversion)
- [connectDb](internal_.StateRedisClient.md#connectdb)
- [delState](internal_.StateRedisClient.md#delstate)
- [destroy](internal_.StateRedisClient.md#destroy)
- [destroyDB](internal_.StateRedisClient.md#destroydb)
- [destroySession](internal_.StateRedisClient.md#destroysession)
- [getKeys](internal_.StateRedisClient.md#getkeys)
- [getProtocolVersion](internal_.StateRedisClient.md#getprotocolversion)
- [getSession](internal_.StateRedisClient.md#getsession)
- [getState](internal_.StateRedisClient.md#getstate)
- [getStateAsync](internal_.StateRedisClient.md#getstateasync)
- [getStates](internal_.StateRedisClient.md#getstates)
- [getStatus](internal_.StateRedisClient.md#getstatus)
- [pushLog](internal_.StateRedisClient.md#pushlog)
- [pushMessage](internal_.StateRedisClient.md#pushmessage)
- [setProtocolVersion](internal_.StateRedisClient.md#setprotocolversion)
- [setRawState](internal_.StateRedisClient.md#setrawstate)
- [setSession](internal_.StateRedisClient.md#setsession)
- [setState](internal_.StateRedisClient.md#setstate)
- [setStateAsync](internal_.StateRedisClient.md#setstateasync)
- [subscribe](internal_.StateRedisClient.md#subscribe)
- [subscribeLog](internal_.StateRedisClient.md#subscribelog)
- [subscribeMessage](internal_.StateRedisClient.md#subscribemessage)
- [subscribeUser](internal_.StateRedisClient.md#subscribeuser)
- [unsubscribe](internal_.StateRedisClient.md#unsubscribe)
- [unsubscribeLog](internal_.StateRedisClient.md#unsubscribelog)
- [unsubscribeMessage](internal_.StateRedisClient.md#unsubscribemessage)
- [unsubscribeUser](internal_.StateRedisClient.md#unsubscribeuser)

## Constructors

### constructor

• **new StateRedisClient**(`settings`): [`StateRedisClient`](internal_.StateRedisClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`StatesSettings`](../interfaces/internal_.StatesSettings.md) |

#### Returns

[`StateRedisClient`](internal_.StateRedisClient.md)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:64

## Properties

### namespaceMsg

• **namespaceMsg**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:45

## Methods

### \_destroyDBHelper

▸ **_destroyDBHelper**(`keys`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | `string`[] | array of keys which will be deleted from db |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | function to be executed after keys have been deleted |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:99

___

### \_determineProtocolVersion

▸ **_determineProtocolVersion**(): `Promise`\<`void`\>

Checks if we are allowed to start and sets the protocol version accordingly

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:69

___

### connectDb

▸ **connectDb**(): `void`

#### Returns

`void`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:70

___

### delState

▸ **delState**(`id`, `callback?`): `Promise`\<`undefined` \| `string` \| `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`DeleteStateCallback`](../modules/internal_.md#deletestatecallback) |

#### Returns

`Promise`\<`undefined` \| `string` \| `void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:105

___

### destroy

▸ **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:104

___

### destroyDB

▸ **destroyDB**(`callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | cb function to be executed after DB has been destroyed |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:103

___

### destroySession

▸ **destroySession**(`id`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:130

___

### getKeys

▸ **getKeys**(`pattern`, `callback?`, `dontModify?`): `Promise`\<`undefined` \| `string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `callback?` | `undefined` |
| `dontModify?` | `boolean` |

#### Returns

`Promise`\<`undefined` \| `string`[]\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:106

▸ **getKeys**(`pattern`, `callback`, `dontModify?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `callback` | [`GetKeysCallback`](../modules/internal_.md#getkeyscallback) |
| `dontModify?` | `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:107

___

### getProtocolVersion

▸ **getProtocolVersion**(): `Promise`\<``null`` \| `string`\>

Returns the protocol version from DB

#### Returns

`Promise`\<``null`` \| `string`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:135

___

### getSession

▸ **getSession**(`id`, `callback`): `Promise`\<``null`` \| `void` \| `Record`\<`string`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback` | (`err`: `undefined` \| ``null`` \| `Error`, `session?`: ``null`` \| `Record`\<`string`, `any`\>) => `void` |

#### Returns

`Promise`\<``null`` \| `void` \| `Record`\<`string`, `any`\>\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:128

___

### getState

▸ **getState**(`id`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:84

▸ **getState**(`id`, `callback?`): `Promise`\<`undefined` \| ``null`` \| `void` \| [`State`](../interfaces/internal_.State.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | (`err`: `undefined` \| ``null`` \| `Error`, `state?`: ``null`` \| [`State`](../interfaces/internal_.State.md)) => `void` |

#### Returns

`Promise`\<`undefined` \| ``null`` \| `void` \| [`State`](../interfaces/internal_.State.md)\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:85

___

### getStateAsync

▸ **getStateAsync**(`id`): `Promise`\<`undefined` \| ``null`` \| `void` \| [`State`](../interfaces/internal_.State.md)\>

Promise-version of getState

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| ``null`` \| `void` \| [`State`](../interfaces/internal_.State.md)\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:91

___

### getStates

▸ **getStates**(`keys`, `callback?`, `dontModify?`): `Promise`\<(``null`` \| [`State`](../interfaces/internal_.State.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `callback?` | `undefined` |
| `dontModify?` | `boolean` |

#### Returns

`Promise`\<(``null`` \| [`State`](../interfaces/internal_.State.md))[]\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:92

▸ **getStates**(`keys`, `callback`, `dontModify?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `callback` | (`err`: `undefined` \| ``null`` \| `Error`, `states?`: (``null`` \| [`State`](../interfaces/internal_.State.md))[]) => `void` |
| `dontModify?` | `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:93

▸ **getStates**(`keys`, `callback`, `dontModify?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `callback` | (`err`: `undefined` \| ``null`` \| `Error`, `states?`: (``null`` \| [`State`](../interfaces/internal_.State.md))[]) => `void` |
| `dontModify?` | `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:94

___

### getStatus

▸ **getStatus**(): [`DbStatus`](../interfaces/internal_.DbStatus.md)

#### Returns

[`DbStatus`](../interfaces/internal_.DbStatus.md)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:71

___

### pushLog

▸ **pushLog**(`id`, `log`, `callback?`): `Promise`\<`string` \| `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `log` | [`LogObject`](../interfaces/internal_.LogObject.md) |
| `callback?` | (`err`: `undefined` \| ``null`` \| `Error`, `id?`: `string`) => `void` |

#### Returns

`Promise`\<`string` \| `void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:125

___

### pushMessage

▸ **pushMessage**(`id`, `message`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `message` | [`SendableMessage`](../interfaces/internal_.SendableMessage.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:122

___

### setProtocolVersion

▸ **setProtocolVersion**(`version`): `Promise`\<`void`\>

Sets the protocol version to the DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | protocol version |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:141

___

### setRawState

▸ **setRawState**(`id`, `state`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) |

#### Returns

`Promise`\<`string`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:83

___

### setSession

▸ **setSession**(`id`, `expireS`, `obj`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `expireS` | `number` |
| `obj` | `Record`\<`string`, `any`\> |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:129

___

### setState

▸ **setState**(`id`, `state`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |

#### Returns

`Promise`\<`string`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:72

▸ **setState**(`id`, `state`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `callback` | (`err`: `undefined` \| ``null`` \| `Error`, `id`: `string`) => `void` |

#### Returns

`Promise`\<`void`\>

**`Deprecated`**

migrate to promisified version (without callback)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:74

___

### setStateAsync

▸ **setStateAsync**(`id`, `state`): `Promise`\<`string`\>

Promise-version of setState

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |

#### Returns

`Promise`\<`string`\>

**`Deprecated`**

use version without `Async` postfix

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:82

___

### subscribe

▸ **subscribe**(`pattern`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:108

▸ **subscribe**(`pattern`, `asUser`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `asUser` | `boolean` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:109

___

### subscribeLog

▸ **subscribeLog**(`id`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:126

___

### subscribeMessage

▸ **subscribeMessage**(`id`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:123

___

### subscribeUser

▸ **subscribeUser**(`pattern`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | callback function (optional) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:114

___

### unsubscribe

▸ **unsubscribe**(`pattern`, `asUser`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `asUser` | `boolean` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:115

▸ **unsubscribe**(`pattern`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:116

___

### unsubscribeLog

▸ **unsubscribeLog**(`id`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:127

___

### unsubscribeMessage

▸ **unsubscribeMessage**(`id`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:124

___

### unsubscribeUser

▸ **unsubscribeUser**(`pattern`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | callback function (optional) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:121
