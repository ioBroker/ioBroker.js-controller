[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ObjectsSettings

# Interface: ObjectsSettings

[\<internal\>](../modules/internal_.md).ObjectsSettings

## Table of contents

### Properties

- [autoConnect](internal_.ObjectsSettings.md#autoconnect)
- [change](internal_.ObjectsSettings.md#change)
- [changeFileUser](internal_.ObjectsSettings.md#changefileuser)
- [changeUser](internal_.ObjectsSettings.md#changeuser)
- [connected](internal_.ObjectsSettings.md#connected)
- [connection](internal_.ObjectsSettings.md#connection)
- [controller](internal_.ObjectsSettings.md#controller)
- [defaultNewAcl](internal_.ObjectsSettings.md#defaultnewacl)
- [disconnected](internal_.ObjectsSettings.md#disconnected)
- [hostname](internal_.ObjectsSettings.md#hostname)
- [logger](internal_.ObjectsSettings.md#logger)
- [metaNamespace](internal_.ObjectsSettings.md#metanamespace)
- [namespace](internal_.ObjectsSettings.md#namespace)
- [primaryHostLost](internal_.ObjectsSettings.md#primaryhostlost)
- [redisNamespace](internal_.ObjectsSettings.md#redisnamespace)

## Properties

### autoConnect

• `Optional` **autoConnect**: `boolean`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:18

___

### change

• `Optional` **change**: [`ChangeFunction`](../modules/internal_.md#changefunction-1)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:15

___

### changeFileUser

• `Optional` **changeFileUser**: [`FileChangeHandler`](../modules/internal_.md#filechangehandler)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:17

___

### changeUser

• `Optional` **changeUser**: [`ChangeFunction`](../modules/internal_.md#changefunction-1)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:16

___

### connected

• **connected**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:11

___

### connection

• **connection**: [`RedisConnectionOptions`](internal_.RedisConnectionOptions.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:25

___

### controller

• `Optional` **controller**: `boolean`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:12

___

### defaultNewAcl

• `Optional` **defaultNewAcl**: [`ACLObject`](internal_.ACLObject.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:22

___

### disconnected

• `Optional` **disconnected**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:14

___

### hostname

• `Optional` **hostname**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:20

___

### logger

• **logger**: [`InternalLogger`](../modules/internal_.md#internallogger)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:19

___

### metaNamespace

• `Optional` **metaNamespace**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:23

___

### namespace

• `Optional` **namespace**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:21

___

### primaryHostLost

• `Optional` **primaryHostLost**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:13

___

### redisNamespace

• `Optional` **redisNamespace**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:24
