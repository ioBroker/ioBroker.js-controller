[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / StatesSettings

# Interface: StatesSettings

[\<internal\>](../modules/internal_.md).StatesSettings

## Table of contents

### Properties

- [autoConnect](internal_.StatesSettings.md#autoconnect)
- [change](internal_.StatesSettings.md#change)
- [changeUser](internal_.StatesSettings.md#changeuser)
- [connected](internal_.StatesSettings.md#connected)
- [connection](internal_.StatesSettings.md#connection)
- [disconnected](internal_.StatesSettings.md#disconnected)
- [hostname](internal_.StatesSettings.md#hostname)
- [logger](internal_.StatesSettings.md#logger)
- [metaNamespace](internal_.StatesSettings.md#metanamespace)
- [namespace](internal_.StatesSettings.md#namespace)
- [namespaceLog](internal_.StatesSettings.md#namespacelog)
- [namespaceMsg](internal_.StatesSettings.md#namespacemsg)
- [namespaceSession](internal_.StatesSettings.md#namespacesession)
- [redisNamespace](internal_.StatesSettings.md#redisnamespace)

## Properties

### autoConnect

• `Optional` **autoConnect**: `boolean`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:31

___

### change

• `Optional` **change**: [`ChangeFunction`](../modules/internal_.md#changefunction)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:29

___

### changeUser

• `Optional` **changeUser**: [`UserChangeFunction`](../modules/internal_.md#userchangefunction)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:28

___

### connected

• `Optional` **connected**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:26

___

### connection

• **connection**: [`ConnectionOptions`](internal_.ConnectionOptions.md)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:30

___

### disconnected

• `Optional` **disconnected**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:27

___

### hostname

• `Optional` **hostname**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:33

___

### logger

• `Optional` **logger**: [`InternalLogger`](../modules/internal_.md#internallogger)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:32

___

### metaNamespace

• `Optional` **metaNamespace**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:35

___

### namespace

• `Optional` **namespace**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:34

___

### namespaceLog

• `Optional` **namespaceLog**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:37

___

### namespaceMsg

• `Optional` **namespaceMsg**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:38

___

### namespaceSession

• `Optional` **namespaceSession**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:36

___

### redisNamespace

• `Optional` **redisNamespace**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:39
