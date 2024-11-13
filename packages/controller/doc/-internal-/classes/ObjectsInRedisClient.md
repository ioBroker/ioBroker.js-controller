[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectsInRedisClient

# Class: ObjectsInRedisClient

## Constructors

### new ObjectsInRedisClient()

> **new ObjectsInRedisClient**(`settings`): [`ObjectsInRedisClient`](ObjectsInRedisClient.md)

#### Parameters

• **settings**: [`ObjectsSettings`](../interfaces/ObjectsSettings.md)

#### Returns

[`ObjectsInRedisClient`](ObjectsInRedisClient.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:72

## Methods

### activateSets()

> **activateSets**(): `Promise`\<`void`\>

Activates the usage of sets

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:340

***

### addPreserveSettings()

> **addPreserveSettings**(`settings`): `void`

#### Parameters

• **settings**: `string` \| `string`[]

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:273

***

### checkFile()

> **checkFile**(`id`, `name`, `options`, `flag`, `callback`?): `Promise`\<`undefined` \| `void` \| [`CallOptions`](../interfaces/CallOptions.md)\>

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

• **flag**: `any`

• **callback?**: [`CheckFileCallback`](../type-aliases/CheckFileCallback.md)

#### Returns

`Promise`\<`undefined` \| `void` \| [`CallOptions`](../interfaces/CallOptions.md)\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:107

***

### checkFileRights()

> **checkFileRights**(`id`, `name`, `options`?, `flag`?, `callback`?): `void`

#### Parameters

• **id**: `string`

• **name**: `null` \| `string`

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **flag?**: `any`

• **callback?**: [`CheckFileRightsCallback`](../type-aliases/CheckFileRightsCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:108

***

### chmodFile()

> **chmodFile**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`ChownFileCallback`](../type-aliases/ChownFileCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:168

***

### chmodFileAsync()

> **chmodFileAsync**(`id`, `name`, `options`): `Promise`\<`undefined` \| [`ChownFileResult`](../interfaces/ChownFileResult.md)[]\>

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`undefined` \| [`ChownFileResult`](../interfaces/ChownFileResult.md)[]\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:169

***

### chmodObject()

> **chmodObject**(`pattern`, `options`, `callback`?): `void` \| `Promise`\<`void`\>

#### Parameters

• **pattern**: `string`

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`ChownObjectCallback`](../type-aliases/ChownObjectCallback.md)

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:197

***

### chmodObjectAsync()

> **chmodObjectAsync**(`pattern`, `options`): `Promise`\<`undefined` \| [`Object`](../type-aliases/Object.md)[]\>

#### Parameters

• **pattern**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`undefined` \| [`Object`](../type-aliases/Object.md)[]\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:198

***

### chownFile()

> **chownFile**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`ChownFileCallback`](../type-aliases/ChownFileCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:157

***

### chownFileAsync()

> **chownFileAsync**(`id`, `name`, `options`): `Promise`\<`undefined` \| [`ChownFileResult`](../interfaces/ChownFileResult.md)[]\>

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`undefined` \| [`ChownFileResult`](../interfaces/ChownFileResult.md)[]\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:158

***

### chownObject()

> **chownObject**(`pattern`, `options`, `callback`?): `void` \| `Promise`\<`void`\>

#### Parameters

• **pattern**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`ChownObjectCallback`](../type-aliases/ChownObjectCallback.md)

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:194

***

### chownObjectAsync()

> **chownObjectAsync**(`pattern`, `options`): `Promise`\<`undefined` \| [`Object`](../type-aliases/Object.md)[]\>

#### Parameters

• **pattern**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`undefined` \| [`Object`](../type-aliases/Object.md)[]\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:195

***

### connectDb()

> **connectDb**(): `void`

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:77

***

### deactivateSets()

> **deactivateSets**(): `Promise`\<`void`\>

Deactivates the usage of sets

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:344

***

### delFile()

> **delFile**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:137

***

### delFileAsync()

> **delFileAsync**(`id`, `name`, `options`): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:138

***

### delObject()

#### delObject(id, callback)

> **delObject**(`id`, `callback`): `void`

##### Parameters

• **id**: `string`

• **callback**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:237

#### delObject(id, options, callback)

> **delObject**(`id`, `options`, `callback`): `void`

##### Parameters

• **id**: `string`

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:238

#### delObject(id, options)

> **delObject**(`id`, `options`?): `Promise`\<`void`\>

##### Parameters

• **id**: `string`

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:239

***

### delObjectAsync()

> **delObjectAsync**(`id`, `options`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:240

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:278

***

### destroyDB()

> **destroyDB**(`options`, `callback`): `void`

#### Parameters

• **options**: `undefined` \| `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:276

***

### destroyDBAsync()

> **destroyDBAsync**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:277

***

### enableFileCache()

#### enableFileCache(enabled, callback)

> **enableFileCache**(`enabled`, `callback`?): `void`

##### Parameters

• **enabled**: `boolean`

• **callback?**

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:170

#### enableFileCache(enabled, options, callback)

> **enableFileCache**(`enabled`, `options`?, `callback`?): `void`

##### Parameters

• **enabled**: `boolean`

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:171

***

### enableFileCacheAsync()

> **enableFileCacheAsync**(`enabled`, `options`?): `Promise`\<`boolean`\>

#### Parameters

• **enabled**: `boolean`

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:172

***

### extendObject()

#### extendObject(id, obj, options)

> **extendObject**\<`T`\>(`id`, `obj`, `options`?): `Promise`\<`undefined` \| `object`\>

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`PartialObjectWorker`](../type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options?**: `null` \| [`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md)

##### Returns

`Promise`\<`undefined` \| `object`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:258

#### extendObject(id, obj, options, callback)

> **extendObject**\<`T`\>(`id`, `obj`, `options`?, `callback`?): `void` \| `Promise`\<`undefined` \| `object`\>

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`PartialObjectWorker`](../type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options?**: `null` \| [`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md)

• **callback?**: [`ExtendObjectCallback`](../type-aliases/ExtendObjectCallback.md)

##### Returns

`void` \| `Promise`\<`undefined` \| `object`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:259

***

### extendObjectAsync()

> **extendObjectAsync**(`id`, `obj`, `options`?): `Promise`\<`undefined` \| `object`\>

#### Parameters

• **id**: `string`

• **obj**: `Partial`\<[`AnyObject`](../type-aliases/AnyObject.md)\>

• **options?**: [`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md)

#### Returns

`Promise`\<`undefined` \| `object`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:260

***

### extendPrimaryHostLock()

> **extendPrimaryHostLock**(`ms`): `Promise`\<`number`\>

Extend the primary host lock time
Value will expire after ms milliseconds

#### Parameters

• **ms**: `number`

ms until value expires

#### Returns

`Promise`\<`number`\>

1 if extended else 0

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:310

***

### fileExists()

> **fileExists**(`id`, `name`, `options`?): `Promise`\<`boolean`\>

Check if given file exists

#### Parameters

• **id**: `string`

id of the namespace

• **name**: `string`

name of the file

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

optional user context

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:133

***

### findObject()

#### findObject(idOrName, type, options, callback)

> **findObject**(`idOrName`, `type`, `options`, `callback`): `void`

##### Parameters

• **idOrName**: `string`

• **type**: `null` \| `string`

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`FindObjectCallback`](../type-aliases/FindObjectCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:270

#### findObject(idOrName, type, callback)

> **findObject**(`idOrName`, `type`, `callback`): `void`

##### Parameters

• **idOrName**: `string`

• **type**: `null` \| `string`

• **callback**: [`FindObjectCallback`](../type-aliases/FindObjectCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:271

#### findObject(idOrName, type, options)

> **findObject**(`idOrName`, `type`?, `options`?): `Promise`\<`undefined` \| `string`\>

##### Parameters

• **idOrName**: `string`

• **type?**: `null` \| `string`

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

##### Returns

`Promise`\<`undefined` \| `string`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:272

***

### getFileId()

> **getFileId**(`id`, `name`, `isMeta`?): `string`

#### Parameters

• **id**: `string`

• **name**: `string`

• **isMeta?**: `boolean`

#### Returns

`string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:106

***

### getKeys()

#### getKeys(pattern, options, callback, dontModify)

> **getKeys**(`pattern`, `options`, `callback`, `dontModify`?): `void`

##### Parameters

• **pattern**: `string`

• **options**: `undefined` \| `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

• **dontModify?**: `boolean`

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:211

#### getKeys(pattern, callback)

> **getKeys**(`pattern`, `callback`): `void`

##### Parameters

• **pattern**: `string`

• **callback**: [`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:212

#### getKeys(pattern, options, callback, dontModify)

> **getKeys**(`pattern`, `options`?, `callback`?, `dontModify`?): `Promise`\<`undefined` \| `string`[]\>

##### Parameters

• **pattern**: `string`

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: `undefined`

• **dontModify?**: `boolean`

##### Returns

`Promise`\<`undefined` \| `string`[]\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:213

***

### getKeysAsync()

> **getKeysAsync**(`id`, `options`?): `Promise`\<`undefined` \| `string`[]\>

#### Parameters

• **id**: `string`

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`undefined` \| `string`[]\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:214

***

### getMeta()

> **getMeta**(`id`): `Promise`\<`null` \| `string`\>

Get value from meta namespace

#### Parameters

• **id**: `string`

redis key

#### Returns

`Promise`\<`null` \| `string`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:350

***

### getObject()

#### getObject(id, options, callback)

> **getObject**\<`T`\>(`id`, `options`, `callback`): `void`

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **options**: `undefined` \| `null` \| [`Options`](../interfaces/Options.md)

• **callback**: [`GetObjectCallback`](../type-aliases/GetObjectCallback.md)\<`T`\>

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:200

#### getObject(id, options)

> **getObject**\<`T`\>(`id`, `options`?): [`GetObjectPromise`](../type-aliases/GetObjectPromise.md)\<`T`\>

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **options?**: `null` \| [`Options`](../interfaces/Options.md)

##### Returns

[`GetObjectPromise`](../type-aliases/GetObjectPromise.md)\<`T`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:201

#### getObject(id, callback)

> **getObject**\<`T`\>(`id`, `callback`): `void`

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **callback**: [`GetObjectCallback`](../type-aliases/GetObjectCallback.md)\<`T`\>

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:202

***

### ~~getObjectAsync()~~

> **getObjectAsync**\<`T`\>(`id`, `options`?): `Promise`\<`undefined` \| `null` \| [`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

#### Type Parameters

• **T** *extends* `string`

#### Parameters

• **id**: `T`

• **options?**: `null` \| `Record`\<`string`, `any`\>

#### Returns

`Promise`\<`undefined` \| `null` \| [`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

#### Deprecated

use `getObject` without callback instead

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:209

***

### getObjectList()

#### getObjectList(params)

> **getObjectList**(`params`): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

##### Parameters

• **params**: [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

##### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:252

#### getObjectList(params, options)

> **getObjectList**(`params`, `options`?): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

##### Parameters

• **params**: [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

##### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:253

#### getObjectList(params, callback)

> **getObjectList**(`params`, `callback`): `void`

##### Parameters

• **params**: [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

• **callback**: [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\>

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:254

#### getObjectList(params, options, callback)

> **getObjectList**\<`T`\>(`params`, `options`?, `callback`?): `T` *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\> ? `void` : [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

##### Type Parameters

• **T** *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\>

##### Parameters

• **params**: [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: `T`

##### Returns

`T` *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\> ? `void` : [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:255

***

### getObjectListAsync()

> **getObjectListAsync**(`params`, `options`?): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

#### Parameters

• **params**: [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:256

***

### getObjects()

#### getObjects(keys, options)

> **getObjects**(`keys`, `options`?): `Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

##### Parameters

• **keys**: `string`[]

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

##### Returns

`Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:216

#### getObjects(keys, callback)

> **getObjects**(`keys`, `callback`): `void`

##### Parameters

• **keys**: `string`[]

• **callback**

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:217

#### getObjects(keys, options, callback, dontModify)

> **getObjects**(`keys`, `options`, `callback`, `dontModify`?): `void`

##### Parameters

• **keys**: `string`[]

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**

• **dontModify?**: `boolean`

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:218

***

### getObjectsAsync()

> **getObjectsAsync**(`keys`, `options`?): `Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

#### Parameters

• **keys**: `string`[]

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:219

***

### getObjectsByPattern()

#### getObjectsByPattern(pattern, options)

> **getObjectsByPattern**(`pattern`, `options`): `Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

##### Parameters

• **pattern**: `string`

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

##### Returns

`Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:221

#### getObjectsByPattern(pattern, options, callback)

> **getObjectsByPattern**(`pattern`, `options`, `callback`): `void`

##### Parameters

• **pattern**: `string`

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:222

***

### getObjectsByPatternAsync()

> **getObjectsByPatternAsync**(`pattern`, `options`): `Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

#### Parameters

• **pattern**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:223

***

### getObjectView()

#### getObjectView(design, search, params, options)

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`?, `options`?): [`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

##### Type Parameters

• **Design** *extends* `string` = `string`

• **Search** *extends* `string` = `string`

##### Parameters

• **design**: `Design`

• **search**: `Search`

• **params?**: [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

##### Returns

[`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:247

#### getObjectView(design, search, params, options, callback)

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

##### Type Parameters

• **Design** *extends* `string` = `string`

• **Search** *extends* `string` = `string`

##### Parameters

• **design**: `Design`

• **search**: `Search`

• **params**: `undefined` \| [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

• **options**: `undefined` \| `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:248

#### getObjectView(design, search, params, callback)

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

##### Type Parameters

• **Design** *extends* `string` = `string`

• **Search** *extends* `string` = `string`

##### Parameters

• **design**: `Design`

• **search**: `Search`

• **params**: [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

• **callback**: [`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:249

***

### getObjectViewAsync()

> **getObjectViewAsync**\<`Design`, `Search`\>(`design`, `search`, `params`?, `options`?): [`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

#### Type Parameters

• **Design** *extends* `string` = `string`

• **Search** *extends* `string` = `string`

#### Parameters

• **design**: `Design`

• **search**: `Search`

• **params?**: [`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

[`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:250

***

### getPrimaryHost()

> **getPrimaryHost**(): `Promise`\<`null` \| `string`\>

Get name of the primary host

#### Returns

`Promise`\<`null` \| `string`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:322

***

### getProtocolVersion()

> **getProtocolVersion**(): `Promise`\<`null` \| `string`\>

Returns the protocol version from DB

#### Returns

`Promise`\<`null` \| `string`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:302

***

### getStatus()

> **getStatus**(): [`DbStatus`](../interfaces/DbStatus.md)

#### Returns

[`DbStatus`](../interfaces/DbStatus.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:78

***

### getUserGroup()

> **getUserGroup**(`user`, `callback`): `void` \| `Promise`\<[`GetUserGroupPromiseReturn`](../type-aliases/GetUserGroupPromiseReturn.md)\>

#### Parameters

• **user**: \`system.user.$\{string\}\`

• **callback**: [`GetUserGroupCallbackNoError`](../type-aliases/GetUserGroupCallbackNoError.md)

#### Returns

`void` \| `Promise`\<[`GetUserGroupPromiseReturn`](../type-aliases/GetUserGroupPromiseReturn.md)\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:111

***

### isSystemLocaleSupported()

> **isSystemLocaleSupported**(): `Promise`\<`boolean`\>

Function to checks if comparisons will work according to the configured Locale

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:244

***

### loadLuaScripts()

> **loadLuaScripts**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:279

***

### migrateToSets()

> **migrateToSets**(): `Promise`\<`number`\>

Migrate all objects to sets

#### Returns

`Promise`\<`number`\>

number of migrated sets

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:298

***

### mkdir()

> **mkdir**(`id`, `dirName`?, `options`?, `callback`?): `void`

#### Parameters

• **id**: `string`

• **dirName?**: `string`

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:153

***

### mkdirAsync()

> **mkdirAsync**(`id`, `dirName`?, `options`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **dirName?**: `string`

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:154

***

### normalizeFilename()

> **normalizeFilename**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:86

***

### objectExists()

> **objectExists**(`id`, `options`?): `Promise`\<`boolean`\>

Check if given object exists

#### Parameters

• **id**: `string`

id of the object

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

optional user context

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:125

***

### readDir()

> **readDir**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: `undefined` \| `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`ReadDirCallback`](../type-aliases/ReadDirCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:140

***

### readDirAsync()

> **readDirAsync**(`id`, `name`, `options`?): [`ReadDirPromise`](../type-aliases/ReadDirPromise.md)

#### Parameters

• **id**: `string`

• **name**: `string`

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

[`ReadDirPromise`](../type-aliases/ReadDirPromise.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:141

***

### readFile()

#### readFile(id, name, options)

> **readFile**(`id`, `name`, `options`?): [`ReadFilePromise`](../type-aliases/ReadFilePromise.md)

##### Parameters

• **id**: `string`

• **name**: `string`

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

##### Returns

[`ReadFilePromise`](../type-aliases/ReadFilePromise.md)

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:117

#### readFile(id, name, options, callback)

> **readFile**(`id`, `name`, `options`, `callback`): `void`

##### Parameters

• **id**: `string`

• **name**: `string`

• **options**: `undefined` \| `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`ReadFileCallback`](../type-aliases/ReadFileCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:118

***

### releasePrimaryHost()

> **releasePrimaryHost**(): `Promise`\<`void`\>

Ensure we are no longer the primary host

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:326

***

### rename()

> **rename**(`id`, `oldName`, `newName`, `options`?, `callback`?): `void` \| `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **oldName**: `string`

• **newName**: `string`

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:144

***

### renameAsync()

> **renameAsync**(`id`, `oldName`, `newName`, `options`): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **oldName**: `string`

• **newName**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:145

***

### rm()

> **rm**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`RmCallback`](../type-aliases/RmCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:151

***

### rmAsync()

> **rmAsync**(`id`, `name`, `options`): `Promise`\<`void` \| [`RmResult`](../interfaces/RmResult.md)[]\>

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void` \| [`RmResult`](../interfaces/RmResult.md)[]\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:152

***

### setDefaultAcl()

> **setDefaultAcl**(`defaultNewAcl`): `Promise`\<`void`\>

#### Parameters

• **defaultNewAcl**: `null` \| [`ACLObject`](../interfaces/ACLObject.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:110

***

### setExists()

> **setExists**(`id`): `Promise`\<`boolean`\>

Checks if a given set exists

#### Parameters

• **id**: `string`

id of the set

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:292

***

### setObject()

#### setObject(id, obj)

> **setObject**\<`T`\>(`id`, `obj`): `Promise`\<`undefined` \| `object`\>

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

##### Returns

`Promise`\<`undefined` \| `object`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:225

#### setObject(id, obj, callback)

> **setObject**\<`T`\>(`id`, `obj`, `callback`?): `void` \| `Promise`\<`undefined` \| `object`\>

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

• **callback?**: [`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

##### Returns

`void` \| `Promise`\<`undefined` \| `object`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:226

#### setObject(id, obj, options, callback)

> **setObject**\<`T`\>(`id`, `obj`, `options`?, `callback`?): `void` \| `Promise`\<`undefined` \| `object`\>

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

##### Returns

`void` \| `Promise`\<`undefined` \| `object`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:227

***

### ~~setObjectAsync()~~

> **setObjectAsync**(`id`, `obj`, `options`?): `Promise`\<`undefined` \| `object`\>

#### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`undefined` \| `object`\>

#### Deprecated

use `setObject` without callback instead

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:235

***

### setPrimaryHost()

> **setPrimaryHost**(`ms`): `Promise`\<`number`\>

Sets current host as primary if no primary host active
Value will expire after ms milliseconds

#### Parameters

• **ms**: `number`

ms until value expires

#### Returns

`Promise`\<`number`\>

1 if lock acquired else 0

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:318

***

### setProtocolVersion()

> **setProtocolVersion**(`version`): `Promise`\<`void`\>

Sets the protocol version to the DB

#### Parameters

• **version**: `string` \| `number`

protocol version

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:332

***

### subscribe()

#### subscribe(pattern, callback)

> **subscribe**(`pattern`, `callback`?): `void`

##### Parameters

• **pattern**: `string` \| `string`[]

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:179

#### subscribe(pattern, options, callback)

> **subscribe**(`pattern`, `options`?, `callback`?): `void`

##### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:180

***

### subscribeAsync()

> **subscribeAsync**(`pattern`, `options`?): `Promise`\<`void`\>

#### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:181

***

### subscribePrimaryHost()

> **subscribePrimaryHost**(): `Promise`\<`void`\>

Subscribe to expired events to get expiration of primary host

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:336

***

### subscribeUser()

#### subscribeUser(pattern, callback)

> **subscribeUser**(`pattern`, `callback`?): `void`

##### Parameters

• **pattern**: `string` \| `string`[]

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:182

#### subscribeUser(pattern, options, callback)

> **subscribeUser**(`pattern`, `options`?, `callback`?): `void`

##### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:183

***

### subscribeUserAsync()

> **subscribeUserAsync**(`pattern`, `options`): `Promise`\<`void`\>

#### Parameters

• **pattern**: `string` \| `string`[]

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:184

***

### subscribeUserFile()

> **subscribeUserFile**(`id`, `pattern`, `options`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **pattern**: `string` \| `string`[]

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:175

***

### touch()

> **touch**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:147

***

### touchAsync()

> **touchAsync**(`id`, `name`, `options`): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:148

***

### unlink()

> **unlink**(`id`, `name`, `options`, `callback`?): `void`

#### Parameters

• **id**: `string`

• **name**: `string`

• **options**: `undefined` \| `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`RmCallback`](../type-aliases/RmCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:135

***

### unlinkAsync()

> **unlinkAsync**(`id`, `name`, `options`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **name**: `string`

• **options?**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:136

***

### unsubscribe()

#### unsubscribe(pattern, callback)

> **unsubscribe**(`pattern`, `callback`?): `void`

##### Parameters

• **pattern**: `string` \| `string`[]

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:187

#### unsubscribe(pattern, options, callback)

> **unsubscribe**(`pattern`, `options`?, `callback`?): `void`

##### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:188

***

### unsubscribeAsync()

> **unsubscribeAsync**(`pattern`, `options`): `Promise`\<`void`\>

#### Parameters

• **pattern**: `string` \| `string`[]

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:189

***

### unsubscribeUser()

> **unsubscribeUser**(`pattern`, `options`?, `callback`?): `void`

#### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:190

***

### unsubscribeUserAsync()

> **unsubscribeUserAsync**(`pattern`, `options`): `Promise`\<`void`\>

#### Parameters

• **pattern**: `string` \| `string`[]

• **options**: [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:191

***

### unsubscribeUserFile()

> **unsubscribeUserFile**(`id`, `pattern`, `options`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **pattern**: `string` \| `string`[]

• **options?**: `null` \| [`CallOptions`](../interfaces/CallOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:176

***

### validateMetaObject()

> **validateMetaObject**(`id`): `Promise`\<`void`\>

Checks if given ID is a meta-object, else throws error

#### Parameters

• **id**: `string`

to check

#### Returns

`Promise`\<`void`\>

#### Throws

Error if id is invalid

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:85

***

### writeFile()

#### writeFile(id, name, data, callback)

> **writeFile**(`id`, `name`, `data`, `callback`?): `Promise`\<`void`\>

##### Parameters

• **id**: `string`

• **name**: `string`

• **data**: `any`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:113

#### writeFile(id, name, data, options, callback)

> **writeFile**(`id`, `name`, `data`, `options`?, `callback`?): `Promise`\<`void`\>

##### Parameters

• **id**: `string`

• **name**: `string`

• **data**: `any`

• **options?**: `null` \| [`WriteFileOptions`](../interfaces/WriteFileOptions.md)

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:114

***

### writeFileAsync()

> **writeFileAsync**(`id`, `name`, `data`, `options`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **name**: `string`

• **data**: `any`

• **options?**: `null` \| [`WriteFileOptions`](../interfaces/WriteFileOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:115
