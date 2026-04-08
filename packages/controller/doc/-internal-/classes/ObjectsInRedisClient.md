[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectsInRedisClient

# Class: ObjectsInRedisClient

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:46

## Constructors

### Constructor

> **new ObjectsInRedisClient**(`settings`): `ObjectsInRedisClient`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:72

#### Parameters

##### settings

[`ObjectsSettings`](../interfaces/ObjectsSettings.md)

#### Returns

`ObjectsInRedisClient`

## Methods

### activateSets()

> **activateSets**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:344

Activates the usage of sets

#### Returns

`Promise`\<`void`\>

***

### addPreserveSettings()

> **addPreserveSettings**(`settings`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:277

#### Parameters

##### settings

`string` \| `string`[]

#### Returns

`void`

***

### checkFile()

> **checkFile**(`id`, `name`, `options`, `flag`, `callback?`): `Promise`\<`void` \| [`CallOptions`](../interfaces/CallOptions.md) \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:107

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

##### flag

`any`

##### callback?

[`CheckFileCallback`](../type-aliases/CheckFileCallback.md)

#### Returns

`Promise`\<`void` \| [`CallOptions`](../interfaces/CallOptions.md) \| `undefined`\>

***

### checkFileRights()

> **checkFileRights**(`id`, `name`, `options?`, `flag?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:108

#### Parameters

##### id

`string`

##### name

`string` \| `null`

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### flag?

`any`

##### callback?

[`CheckFileRightsCallback`](../type-aliases/CheckFileRightsCallback.md)

#### Returns

`void`

***

### chmodFile()

> **chmodFile**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:168

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### callback

[`ChownFileCallback`](../type-aliases/ChownFileCallback.md)

#### Returns

`void`

***

### chmodFileAsync()

> **chmodFileAsync**(`id`, `name`, `options`): `Promise`\<[`ChownFileResult`](../interfaces/ChownFileResult.md)[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:169

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<[`ChownFileResult`](../interfaces/ChownFileResult.md)[] \| `undefined`\>

***

### chmodObject()

> **chmodObject**(`pattern`, `options`, `callback?`): `void` \| `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:197

#### Parameters

##### pattern

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### callback?

[`ChownObjectCallback`](../type-aliases/ChownObjectCallback.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### chmodObjectAsync()

> **chmodObjectAsync**(`pattern`, `options`): `Promise`\<[`Object`](../type-aliases/Object.md)[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:198

#### Parameters

##### pattern

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<[`Object`](../type-aliases/Object.md)[] \| `undefined`\>

***

### chownFile()

> **chownFile**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:157

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

##### callback

[`ChownFileCallback`](../type-aliases/ChownFileCallback.md)

#### Returns

`void`

***

### chownFileAsync()

> **chownFileAsync**(`id`, `name`, `options`): `Promise`\<[`ChownFileResult`](../interfaces/ChownFileResult.md)[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:158

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<[`ChownFileResult`](../interfaces/ChownFileResult.md)[] \| `undefined`\>

***

### chownObject()

> **chownObject**(`pattern`, `options`, `callback?`): `void` \| `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:194

#### Parameters

##### pattern

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

##### callback?

[`ChownObjectCallback`](../type-aliases/ChownObjectCallback.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### chownObjectAsync()

> **chownObjectAsync**(`pattern`, `options`): `Promise`\<[`Object`](../type-aliases/Object.md)[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:195

#### Parameters

##### pattern

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<[`Object`](../type-aliases/Object.md)[] \| `undefined`\>

***

### connectDb()

> **connectDb**(): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:77

#### Returns

`void`

***

### deactivateSets()

> **deactivateSets**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:348

Deactivates the usage of sets

#### Returns

`Promise`\<`void`\>

***

### delFile()

> **delFile**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:137

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

##### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

***

### delFileAsync()

> **delFileAsync**(`id`, `name`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:138

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### delObject()

#### Call Signature

> **delObject**(`id`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:237

##### Parameters

###### id

`string`

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

#### Call Signature

> **delObject**(`id`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:238

##### Parameters

###### id

`string`

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

#### Call Signature

> **delObject**(`id`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:239

##### Parameters

###### id

`string`

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### Returns

`Promise`\<`void`\>

***

### delObjectAsync()

> **delObjectAsync**(`id`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:240

#### Parameters

##### id

`string`

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:282

#### Returns

`Promise`\<`void`\>

***

### destroyDB()

> **destroyDB**(`options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:280

#### Parameters

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

##### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

***

### destroyDBAsync()

> **destroyDBAsync**(`options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:281

#### Parameters

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### enableFileCache()

#### Call Signature

> **enableFileCache**(`enabled`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:170

##### Parameters

###### enabled

`boolean`

###### callback?

(`err`, `res`) => `void`

##### Returns

`void`

#### Call Signature

> **enableFileCache**(`enabled`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:171

##### Parameters

###### enabled

`boolean`

###### options?

[`CallOptions`](../interfaces/CallOptions.md)

###### callback?

(`err`, `res`) => `void`

##### Returns

`void`

***

### enableFileCacheAsync()

> **enableFileCacheAsync**(`enabled`, `options?`): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:172

#### Parameters

##### enabled

`boolean`

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`boolean`\>

***

### extendObject()

#### Call Signature

> **extendObject**\<`T`\>(`id`, `obj`, `options?`): `Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:258

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

###### obj

[`PartialObjectWorker`](../type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

###### options?

[`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md) \| `null`

##### Returns

`Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

#### Call Signature

> **extendObject**\<`T`\>(`id`, `obj`, `options?`, `callback?`): `void` \| `Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:259

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

###### obj

[`PartialObjectWorker`](../type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

###### options?

[`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md) \| `null`

###### callback?

[`ExtendObjectCallback`](../type-aliases/ExtendObjectCallback.md)

##### Returns

`void` \| `Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

***

### extendObjectAsync()

> **extendObjectAsync**(`id`, `obj`, `options?`): `Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:260

#### Parameters

##### id

`string`

##### obj

`Partial`\<[`AnyObject`](../type-aliases/AnyObject.md)\>

##### options?

[`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md)

#### Returns

`Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

***

### extendPrimaryHostLock()

> **extendPrimaryHostLock**(`ms`): `Promise`\<`number`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:314

Extend the primary host lock time
Value will expire after ms milliseconds

#### Parameters

##### ms

`number`

ms until value expires

#### Returns

`Promise`\<`number`\>

1 if extended else 0

***

### fileExists()

> **fileExists**(`id`, `name`, `options?`): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:133

Check if given file exists

#### Parameters

##### id

`string`

id of the namespace

##### name

`string`

name of the file

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

optional user context

#### Returns

`Promise`\<`boolean`\>

***

### findObject()

#### Call Signature

> **findObject**(`idOrName`, `type`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:270

##### Parameters

###### idOrName

`string`

###### type

[`CommonType`](../type-aliases/CommonType.md) \| `null`

###### options

[`CallOptions`](../interfaces/CallOptions.md) & `object` \| `null`

###### callback

[`FindObjectCallback`](../type-aliases/FindObjectCallback.md)

##### Returns

`void`

#### Call Signature

> **findObject**(`idOrName`, `type`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:273

##### Parameters

###### idOrName

`string`

###### type

[`CommonType`](../type-aliases/CommonType.md) \| `null`

###### callback

[`FindObjectCallback`](../type-aliases/FindObjectCallback.md)

##### Returns

`void`

#### Call Signature

> **findObject**(`idOrName`, `type?`, `options?`): `Promise`\<`string` \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:274

##### Parameters

###### idOrName

`string`

###### type?

[`CommonType`](../type-aliases/CommonType.md) \| `null`

###### options?

[`CallOptions`](../interfaces/CallOptions.md) & `object` \| `null`

##### Returns

`Promise`\<`string` \| `undefined`\>

***

### getFileId()

> **getFileId**(`id`, `name`, `isMeta?`): `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:106

#### Parameters

##### id

`string`

##### name

`string`

##### isMeta?

`boolean`

#### Returns

`string`

***

### getKeys()

#### Call Signature

> **getKeys**(`pattern`, `options`, `callback`, `dontModify?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:211

##### Parameters

###### pattern

`string`

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

###### callback

[`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

###### dontModify?

`boolean`

##### Returns

`void`

#### Call Signature

> **getKeys**(`pattern`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:212

##### Parameters

###### pattern

`string`

###### callback

[`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

##### Returns

`void`

#### Call Signature

> **getKeys**(`pattern`, `options?`, `callback?`, `dontModify?`): `Promise`\<`string`[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:213

##### Parameters

###### pattern

`string`

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

###### callback?

`undefined`

###### dontModify?

`boolean`

##### Returns

`Promise`\<`string`[] \| `undefined`\>

***

### getKeysAsync()

> **getKeysAsync**(`id`, `options?`): `Promise`\<`string`[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:214

#### Parameters

##### id

`string`

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`string`[] \| `undefined`\>

***

### getMeta()

> **getMeta**(`id`): `Promise`\<`string` \| `null`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:354

Get value from meta namespace

#### Parameters

##### id

`string`

redis key

#### Returns

`Promise`\<`string` \| `null`\>

***

### getObject()

#### Call Signature

> **getObject**\<`T`\>(`id`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:200

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

###### options

[`Options`](../interfaces/Options.md) \| `null` \| `undefined`

###### callback

[`GetObjectCallback`](../type-aliases/GetObjectCallback.md)\<`T`\>

##### Returns

`void`

#### Call Signature

> **getObject**\<`T`\>(`id`, `options?`): [`GetObjectPromise`](../type-aliases/GetObjectPromise.md)\<`T`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:201

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

###### options?

[`Options`](../interfaces/Options.md) \| `null`

##### Returns

[`GetObjectPromise`](../type-aliases/GetObjectPromise.md)\<`T`\>

#### Call Signature

> **getObject**\<`T`\>(`id`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:202

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

###### callback

[`GetObjectCallback`](../type-aliases/GetObjectCallback.md)\<`T`\>

##### Returns

`void`

***

### ~~getObjectAsync()~~

> **getObjectAsync**\<`T`\>(`id`, `options?`): `Promise`\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\> \| `null` \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:209

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### id

`T`

##### options?

`Record`\<`string`, `any`\> \| `null`

#### Returns

`Promise`\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\> \| `null` \| `undefined`\>

#### Deprecated

use `getObject` without callback instead

***

### getObjectList()

#### Call Signature

> **getObjectList**(`params`): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:252

##### Parameters

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

##### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

#### Call Signature

> **getObjectList**(`params`, `options?`): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:253

##### Parameters

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

#### Call Signature

> **getObjectList**(`params`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:254

##### Parameters

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

###### callback

[`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\>

##### Returns

`void`

#### Call Signature

> **getObjectList**\<`T`\>(`params`, `options?`, `callback?`): `T` *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\> ? `void` : [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:255

##### Type Parameters

###### T

`T` *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\>

##### Parameters

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

###### callback?

`T`

##### Returns

`T` *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\> ? `void` : [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

***

### getObjectListAsync()

> **getObjectListAsync**(`params`, `options?`): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:256

#### Parameters

##### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

***

### getObjects()

#### Call Signature

> **getObjects**(`keys`, `options?`): `Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:216

##### Parameters

###### keys

`string`[]

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### Returns

`Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

#### Call Signature

> **getObjects**(`keys`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:217

##### Parameters

###### keys

`string`[]

###### callback

(`err?`, `objs?`) => `void`

##### Returns

`void`

#### Call Signature

> **getObjects**(`keys`, `options`, `callback`, `dontModify?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:218

##### Parameters

###### keys

`string`[]

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

###### callback

(`err?`, `objs?`) => `void`

###### dontModify?

`boolean`

##### Returns

`void`

***

### getObjectsAsync()

> **getObjectsAsync**(`keys`, `options?`): `Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:219

#### Parameters

##### keys

`string`[]

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

#### Returns

`Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

***

### getObjectsByPattern()

#### Call Signature

> **getObjectsByPattern**(`pattern`, `options`): `Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:221

##### Parameters

###### pattern

`string`

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### Returns

`Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

#### Call Signature

> **getObjectsByPattern**(`pattern`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:222

##### Parameters

###### pattern

`string`

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

###### callback

(`err?`, `objs?`) => `void`

##### Returns

`void`

***

### getObjectsByPatternAsync()

> **getObjectsByPatternAsync**(`pattern`, `options`): `Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:223

#### Parameters

##### pattern

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

***

### getObjectView()

#### Call Signature

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params?`, `options?`): [`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:247

##### Type Parameters

###### Design

`Design` *extends* `string` = `string`

###### Search

`Search` *extends* `string` = `string`

##### Parameters

###### design

`Design`

###### search

`Search`

###### params?

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### Returns

[`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

#### Call Signature

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:248

##### Type Parameters

###### Design

`Design` *extends* `string` = `string`

###### Search

`Search` *extends* `string` = `string`

##### Parameters

###### design

`Design`

###### search

`Search`

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md) \| `undefined`

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

###### callback

[`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

##### Returns

`void`

#### Call Signature

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:249

##### Type Parameters

###### Design

`Design` *extends* `string` = `string`

###### Search

`Search` *extends* `string` = `string`

##### Parameters

###### design

`Design`

###### search

`Search`

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

###### callback

[`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

##### Returns

`void`

***

### getObjectViewAsync()

> **getObjectViewAsync**\<`Design`, `Search`\>(`design`, `search`, `params?`, `options?`): [`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:250

#### Type Parameters

##### Design

`Design` *extends* `string` = `string`

##### Search

`Search` *extends* `string` = `string`

#### Parameters

##### design

`Design`

##### search

`Search`

##### params?

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

[`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

***

### getPrimaryHost()

> **getPrimaryHost**(): `Promise`\<`string` \| `null`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:326

Get name of the primary host

#### Returns

`Promise`\<`string` \| `null`\>

***

### getProtocolVersion()

> **getProtocolVersion**(): `Promise`\<`string` \| `null`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:306

Returns the protocol version from DB

#### Returns

`Promise`\<`string` \| `null`\>

***

### getStatus()

> **getStatus**(): [`DbStatus`](../interfaces/DbStatus.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:78

#### Returns

[`DbStatus`](../interfaces/DbStatus.md)

***

### getUserGroup()

> **getUserGroup**(`user`, `callback`): `void` \| `Promise`\<[`GetUserGroupPromiseReturn`](../type-aliases/GetUserGroupPromiseReturn.md)\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:111

#### Parameters

##### user

`` `system.user.${string}` ``

##### callback

[`GetUserGroupCallbackNoError`](../type-aliases/GetUserGroupCallbackNoError.md)

#### Returns

`void` \| `Promise`\<[`GetUserGroupPromiseReturn`](../type-aliases/GetUserGroupPromiseReturn.md)\>

***

### isSystemLocaleSupported()

> **isSystemLocaleSupported**(): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:244

Function to checks if comparisons will work according to the configured Locale

#### Returns

`Promise`\<`boolean`\>

***

### loadLuaScripts()

> **loadLuaScripts**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:283

#### Returns

`Promise`\<`void`\>

***

### migrateToSets()

> **migrateToSets**(): `Promise`\<`number`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:302

Migrate all objects to sets

#### Returns

`Promise`\<`number`\>

number of migrated sets

***

### mkdir()

> **mkdir**(`id`, `dirName?`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:153

#### Parameters

##### id

`string`

##### dirName?

`string`

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

***

### mkdirAsync()

> **mkdirAsync**(`id`, `dirName?`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:154

#### Parameters

##### id

`string`

##### dirName?

`string`

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### normalizeFilename()

> **normalizeFilename**(`name`): `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:86

#### Parameters

##### name

`string`

#### Returns

`string`

***

### objectExists()

> **objectExists**(`id`, `options?`): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:125

Check if given object exists

#### Parameters

##### id

`string`

id of the object

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

optional user context

#### Returns

`Promise`\<`boolean`\>

***

### readDir()

> **readDir**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:140

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

##### callback

[`ReadDirCallback`](../type-aliases/ReadDirCallback.md)

#### Returns

`void`

***

### readDirAsync()

> **readDirAsync**(`id`, `name`, `options?`): [`ReadDirPromise`](../type-aliases/ReadDirPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:141

#### Parameters

##### id

`string`

##### name

`string`

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

[`ReadDirPromise`](../type-aliases/ReadDirPromise.md)

***

### readFile()

#### Call Signature

> **readFile**(`id`, `name`, `options?`): [`ReadFilePromise`](../type-aliases/ReadFilePromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:117

##### Parameters

###### id

`string`

###### name

`string`

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### Returns

[`ReadFilePromise`](../type-aliases/ReadFilePromise.md)

#### Call Signature

> **readFile**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:118

##### Parameters

###### id

`string`

###### name

`string`

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

###### callback

[`ReadFileCallback`](../type-aliases/ReadFileCallback.md)

##### Returns

`void`

***

### releasePrimaryHost()

> **releasePrimaryHost**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:330

Ensure we are no longer the primary host

#### Returns

`Promise`\<`void`\>

***

### rename()

> **rename**(`id`, `oldName`, `newName`, `options?`, `callback?`): `void` \| `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:144

#### Parameters

##### id

`string`

##### oldName

`string`

##### newName

`string`

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### renameAsync()

> **renameAsync**(`id`, `oldName`, `newName`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:145

#### Parameters

##### id

`string`

##### oldName

`string`

##### newName

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### rm()

> **rm**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:151

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### callback

[`RmCallback`](../type-aliases/RmCallback.md)

#### Returns

`void`

***

### rmAsync()

> **rmAsync**(`id`, `name`, `options`): `Promise`\<`void` \| [`RmResult`](../interfaces/RmResult.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:152

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void` \| [`RmResult`](../interfaces/RmResult.md)[]\>

***

### setDefaultAcl()

> **setDefaultAcl**(`defaultNewAcl`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:110

#### Parameters

##### defaultNewAcl

[`ACLObject`](../interfaces/ACLObject.md) \| `null`

#### Returns

`Promise`\<`void`\>

***

### setExists()

> **setExists**(`id`): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:296

Checks if a given set exists

#### Parameters

##### id

`string`

id of the set

#### Returns

`Promise`\<`boolean`\>

***

### setObject()

#### Call Signature

> **setObject**\<`T`\>(`id`, `obj`): `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:225

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

###### obj

[`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

##### Returns

`Promise`\<\{ `id`: `string`; \} \| `undefined`\>

#### Call Signature

> **setObject**\<`T`\>(`id`, `obj`, `callback?`): `void` \| `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:226

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

###### obj

[`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

###### callback?

[`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

##### Returns

`void` \| `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

#### Call Signature

> **setObject**\<`T`\>(`id`, `obj`, `options?`, `callback?`): `void` \| `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:227

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

###### obj

[`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

###### callback?

[`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

##### Returns

`void` \| `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

***

### ~~setObjectAsync()~~

> **setObjectAsync**(`id`, `obj`, `options?`): `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:235

#### Parameters

##### id

`string`

##### obj

`Omit`\<[`StateObject`](../interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

#### Returns

`Promise`\<\{ `id`: `string`; \} \| `undefined`\>

#### Deprecated

use `setObject` without callback instead

***

### setPrimaryHost()

> **setPrimaryHost**(`ms`): `Promise`\<`number`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:322

Sets current host as primary if no primary host active
Value will expire after ms milliseconds

#### Parameters

##### ms

`number`

ms until value expires

#### Returns

`Promise`\<`number`\>

1 if lock acquired else 0

***

### setProtocolVersion()

> **setProtocolVersion**(`version`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:336

Sets the protocol version to the DB

#### Parameters

##### version

`string` \| `number`

protocol version

#### Returns

`Promise`\<`void`\>

***

### subscribe()

#### Call Signature

> **subscribe**(`pattern`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:179

##### Parameters

###### pattern

`string` \| `string`[]

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

#### Call Signature

> **subscribe**(`pattern`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:180

##### Parameters

###### pattern

`string` \| `string`[]

###### options?

[`CallOptions`](../interfaces/CallOptions.md)

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

***

### subscribeAsync()

> **subscribeAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:181

#### Parameters

##### pattern

`string` \| `string`[]

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### subscribePrimaryHost()

> **subscribePrimaryHost**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:340

Subscribe to expired events to get expiration of primary host

#### Returns

`Promise`\<`void`\>

***

### subscribeUser()

#### Call Signature

> **subscribeUser**(`pattern`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:182

##### Parameters

###### pattern

`string` \| `string`[]

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

#### Call Signature

> **subscribeUser**(`pattern`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:183

##### Parameters

###### pattern

`string` \| `string`[]

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

***

### subscribeUserAsync()

> **subscribeUserAsync**(`pattern`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:184

#### Parameters

##### pattern

`string` \| `string`[]

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### subscribeUserFile()

> **subscribeUserFile**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:175

#### Parameters

##### id

`string`

##### pattern

`string` \| `string`[]

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

#### Returns

`Promise`\<`void`\>

***

### touch()

> **touch**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:147

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

***

### touchAsync()

> **touchAsync**(`id`, `name`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:148

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### unlink()

> **unlink**(`id`, `name`, `options`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:135

#### Parameters

##### id

`string`

##### name

`string`

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

##### callback?

[`RmCallback`](../type-aliases/RmCallback.md)

#### Returns

`void`

***

### unlinkAsync()

> **unlinkAsync**(`id`, `name`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:136

#### Parameters

##### id

`string`

##### name

`string`

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### unsubscribe()

#### Call Signature

> **unsubscribe**(`pattern`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:187

##### Parameters

###### pattern

`string` \| `string`[]

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

#### Call Signature

> **unsubscribe**(`pattern`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:188

##### Parameters

###### pattern

`string` \| `string`[]

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

***

### unsubscribeAsync()

> **unsubscribeAsync**(`pattern`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:189

#### Parameters

##### pattern

`string` \| `string`[]

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### unsubscribeUser()

> **unsubscribeUser**(`pattern`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:190

#### Parameters

##### pattern

`string` \| `string`[]

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

***

### unsubscribeUserAsync()

> **unsubscribeUserAsync**(`pattern`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:191

#### Parameters

##### pattern

`string` \| `string`[]

##### options

[`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

***

### unsubscribeUserFile()

> **unsubscribeUserFile**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:176

#### Parameters

##### id

`string`

##### pattern

`string` \| `string`[]

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

#### Returns

`Promise`\<`void`\>

***

### validateMetaObject()

> **validateMetaObject**(`id`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:85

Checks if given ID is a meta-object, else throws error

#### Parameters

##### id

`string`

to check

#### Returns

`Promise`\<`void`\>

#### Throws

Error if id is invalid

***

### writeFile()

#### Call Signature

> **writeFile**(`id`, `name`, `data`, `callback?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:113

##### Parameters

###### id

`string`

###### name

`string`

###### data

`any`

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **writeFile**(`id`, `name`, `data`, `options?`, `callback?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:114

##### Parameters

###### id

`string`

###### name

`string`

###### data

`any`

###### options?

[`WriteFileOptions`](../interfaces/WriteFileOptions.md) \| `null`

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

***

### writeFileAsync()

> **writeFileAsync**(`id`, `name`, `data`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:115

#### Parameters

##### id

`string`

##### name

`string`

##### data

`any`

##### options?

[`WriteFileOptions`](../interfaces/WriteFileOptions.md) \| `null`

#### Returns

`Promise`\<`void`\>
