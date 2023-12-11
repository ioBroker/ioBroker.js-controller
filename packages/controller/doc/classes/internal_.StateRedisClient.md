[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / StateRedisClient

# Class: StateRedisClient

[\<internal\>](../modules/internal_.md).StateRedisClient

## Table of contents

### Constructors

- [constructor](internal_.StateRedisClient.md#constructor)

### Properties

- [namespaceMsg](internal_.StateRedisClient.md#namespacemsg)

### Methods

- [connectDb](internal_.StateRedisClient.md#connectdb)
- [delBinaryState](internal_.StateRedisClient.md#delbinarystate)
- [delState](internal_.StateRedisClient.md#delstate)
- [destroy](internal_.StateRedisClient.md#destroy)
- [destroyDB](internal_.StateRedisClient.md#destroydb)
- [destroySession](internal_.StateRedisClient.md#destroysession)
- [getBinaryState](internal_.StateRedisClient.md#getbinarystate)
- [getKeys](internal_.StateRedisClient.md#getkeys)
- [getProtocolVersion](internal_.StateRedisClient.md#getprotocolversion)
- [getSession](internal_.StateRedisClient.md#getsession)
- [getState](internal_.StateRedisClient.md#getstate)
- [getStateAsync](internal_.StateRedisClient.md#getstateasync)
- [getStates](internal_.StateRedisClient.md#getstates)
- [getStatus](internal_.StateRedisClient.md#getstatus)
- [pushLog](internal_.StateRedisClient.md#pushlog)
- [pushMessage](internal_.StateRedisClient.md#pushmessage)
- [setBinaryState](internal_.StateRedisClient.md#setbinarystate)
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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:65

## Properties

### namespaceMsg

• **namespaceMsg**: `string`

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:46

## Methods

### connectDb

▸ **connectDb**(): `void`

#### Returns

`void`

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:72

___

### delBinaryState

▸ **delBinaryState**(`id`, `callback?`): `Promise`\<`string` \| `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | (`err`: `undefined` \| ``null`` \| `Error`, `id?`: `string`) => `void` |

#### Returns

`Promise`\<`string` \| `void`\>

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:163

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:132

___

### destroy

▸ **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:131

___

### destroyDB

▸ **destroyDB**(`callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | cb function to be executed after DB has been destroyed |

#### Returns

`Promise`\<`void`\>

**`Method`**

destroyDB

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:130

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:160

___

### getBinaryState

▸ **getBinaryState**(`id`, `callback`): `Promise`\<`void` \| `Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback` | (`err`: `undefined` \| ``null`` \| `Error`, `state?`: `Buffer`) => `void` |

#### Returns

`Promise`\<`void` \| `Buffer`\>

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:162

___

### getKeys

▸ **getKeys**(`pattern`, `callback?`, `dontModify?`): `Promise`\<`undefined` \| `void` \| `string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `callback?` | [`GetKeysCallback`](../modules/internal_.md#getkeyscallback) |
| `dontModify?` | `boolean` |

#### Returns

`Promise`\<`undefined` \| `void` \| `string`[]\>

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:133

___

### getProtocolVersion

▸ **getProtocolVersion**(): `Promise`\<``null`` \| `string`\>

Returns the protocol version from DB

#### Returns

`Promise`\<``null`` \| `string`\>

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:168

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:158

___

### getState

▸ **getState**(`id`, `callback?`): `Promise`\<`undefined` \| ``null`` \| `void` \| [`State`](../interfaces/internal_.State.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | (`err`: `undefined` \| ``null`` \| `Error`, `state?`: ``null`` \| [`State`](../interfaces/internal_.State.md)) => `void` |

#### Returns

`Promise`\<`undefined` \| ``null`` \| `void` \| [`State`](../interfaces/internal_.State.md)\>

**`Method`**

getState

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:112

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:116

___

### getStates

▸ **getStates**(`keys`, `callback?`, `dontModify?`): `Promise`\<`void` \| (``null`` \| [`State`](../interfaces/internal_.State.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `callback?` | (`err`: `undefined` \| ``null`` \| `Error`, `states?`: (``null`` \| [`State`](../interfaces/internal_.State.md))[]) => `void` |
| `dontModify?` | `boolean` |

#### Returns

`Promise`\<`void` \| (``null`` \| [`State`](../interfaces/internal_.State.md))[]\>

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:117

___

### getStatus

▸ **getStatus**(): [`DbStatus`](../interfaces/internal_.DbStatus.md)

#### Returns

[`DbStatus`](../interfaces/internal_.DbStatus.md)

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:73

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:155

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:152

___

### setBinaryState

▸ **setBinaryState**(`id`, `data`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | `Buffer` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:161

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:173

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:105

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:159

___

### setState

▸ **setState**(`id`, `state`, `callback?`): `Promise`\<`string` \| `void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the value. '<this.namespaceRedis>.' will be prepended |
| `state` | [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | an object containing the actual value and some metadata:<br> setState(id, {'val': val, 'ts': ts, 'ack': ack, 'from': from, 'lc': lc, 'user': user}) if no object is given state is treated as val:<br> setState(id, val) <ul><li><b>val</b> the actual value. Can be any JSON-stringifiable object. If undefined the value is kept unchanged.</li> <li><b>ack</b> a boolean that can be used to mark a value as confirmed, used in bidirectional systems which acknowledge that a value has been successfully set. Will be set to false if undefined.</li> <li><b>ts</b> a unix timestamp indicating the last write-operation on the state. Will be set by the setState method if undefined.</li> <li><b>lc</b> a unix timestamp indicating the last change of the actual value. this should be undefined when calling setState, it will be set by the setValue method itself.</li></ul> |
| `callback?` | (`err`: `undefined` \| ``null`` \| `Error`, `id`: `string`) => `void` | will be called when redis confirmed reception of the command |

#### Returns

`Promise`\<`string` \| `void`\>

**`Method`**

setState

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:100

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

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:104

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:134

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:135

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:156

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:153

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

**`Method`**

subscribeUser

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:142

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:143

▸ **unsubscribe**(`pattern`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:144

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:157

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

db-states-redis/build/lib/states/statesInRedisClient.d.ts:154

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

**`Method`**

unsubscribeUser

#### Defined in

db-states-redis/build/lib/states/statesInRedisClient.d.ts:151
