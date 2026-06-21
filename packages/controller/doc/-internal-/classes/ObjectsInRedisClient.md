[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectsInRedisClient

# Class: ObjectsInRedisClient

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:65

Client for the objects database backed by Redis (or the in-memory redis-protocol server)

## Constructors

### Constructor

> **new ObjectsInRedisClient**(`settings`): `ObjectsInRedisClient`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:94

#### Parameters

##### settings

[`ObjectsSettings`](../interfaces/ObjectsSettings.md)

Settings for the objects client including connection and namespaces

#### Returns

`ObjectsInRedisClient`

## Methods

### activateSets()

> **activateSets**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:988

Activates the usage of sets

#### Returns

`Promise`\<`void`\>

***

### addPreserveSettings()

> **addPreserveSettings**(`settings`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:904

Add object property paths that should be preserved when an object is overwritten (controller only)

#### Parameters

##### settings

`string` \| `string`[]

One or more property paths to preserve

#### Returns

`void`

***

### checkFile()

> **checkFile**(`id`, `name`, `options`, `flag`, `callback?`): `Promise`\<`void` \| [`CallOptions`](../interfaces/CallOptions.md) \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:156

Check whether the current options have the required rights on a file

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

##### flag

`any`

The access flag(s) to check for

##### callback?

[`CheckFileCallback`](../type-aliases/CheckFileCallback.md)

Called with whether the check failed and the effective options

#### Returns

`Promise`\<`void` \| [`CallOptions`](../interfaces/CallOptions.md) \| `undefined`\>

***

### checkFileRights()

> **checkFileRights**(`id`, `name`, `options?`, `flag?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:166

Check whether the current user is allowed to access a file

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string` \| `null`

The file name, or null for the whole namespace

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

##### flag?

`any`

The access flag(s) to check for

##### callback?

[`CheckFileRightsCallback`](../type-aliases/CheckFileRightsCallback.md)

Called with the effective options once the rights have been checked

#### Returns

`void`

***

### chmodFile()

> **chmodFile**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:407

Change the file mode (permissions) of a single file

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the new mode and the user, or the callback

##### callback

[`ChownFileCallback`](../type-aliases/ChownFileCallback.md)

Called with the processed file

#### Returns

`void`

***

### chmodFileAsync()

> **chmodFileAsync**(`id`, `name`, `options`): `Promise`\<[`ChownFileResult`](../interfaces/ChownFileResult.md)[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:415

Promise-version of chmodFile

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the new mode and the user

#### Returns

`Promise`\<[`ChownFileResult`](../interfaces/ChownFileResult.md)[] \| `undefined`\>

***

### chmodObject()

> **chmodObject**(`pattern`, `options`, `callback?`): `void` \| `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:566

Change the file mode (permissions) of all files matching the given pattern

#### Parameters

##### pattern

`string`

The pattern of object ids whose files should be changed

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the new mode and the user, or the callback

##### callback?

[`ChownObjectCallback`](../type-aliases/ChownObjectCallback.md)

Called with the list of changed objects

#### Returns

`void` \| `Promise`\<`void`\>

***

### chmodObjectAsync()

> **chmodObjectAsync**(`pattern`, `options`): `Promise`\<[`Object`](../type-aliases/Object.md)[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:573

Promise-version of chmodObject

#### Parameters

##### pattern

`string`

The pattern of object ids whose files should be changed

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the new mode and the user

#### Returns

`Promise`\<[`Object`](../type-aliases/Object.md)[] \| `undefined`\>

***

### chownFile()

> **chownFile**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:381

Change the owner and owner group of a file

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the new owner and the user

##### callback

[`ChownFileCallback`](../type-aliases/ChownFileCallback.md)

Called with the processed file(s)

#### Returns

`void`

***

### chownFileAsync()

> **chownFileAsync**(`id`, `name`, `options`): `Promise`\<[`ChownFileResult`](../interfaces/ChownFileResult.md)[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:389

Promise-version of chownFile

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the new owner and the user

#### Returns

`Promise`\<[`ChownFileResult`](../interfaces/ChownFileResult.md)[] \| `undefined`\>

***

### chownObject()

> **chownObject**(`pattern`, `options`, `callback?`): `void` \| `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:550

Change the owner and owner group of all objects matching the given pattern

#### Parameters

##### pattern

`string`

The pattern of object ids whose owner should be changed

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the new owner and the user, or the callback

##### callback?

[`ChownObjectCallback`](../type-aliases/ChownObjectCallback.md)

Called with the list of changed objects

#### Returns

`void` \| `Promise`\<`void`\>

***

### chownObjectAsync()

> **chownObjectAsync**(`pattern`, `options`): `Promise`\<[`Object`](../type-aliases/Object.md)[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:557

Promise-version of chownObject

#### Parameters

##### pattern

`string`

The pattern of object ids whose owner should be changed

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the new owner and the user

#### Returns

`Promise`\<[`Object`](../type-aliases/Object.md)[] \| `undefined`\>

***

### connectDb()

> **connectDb**(): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:102

Connect to the objects database and set up the change and file subscriptions

#### Returns

`void`

***

### deactivateSets()

> **deactivateSets**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:992

Deactivates the usage of sets

#### Returns

`Promise`\<`void`\>

***

### delFile()

> **delFile**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:269

Delete a file of an object (alias for unlink)

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name to delete

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

##### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the file has been deleted

#### Returns

`void`

***

### delFileAsync()

> **delFileAsync**(`id`, `name`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:277

Promise-version of delFile

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name to delete

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### delObject()

#### Call Signature

> **delObject**(`id`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:733

Delete an object

##### Parameters

###### id

`string`

The id of the object to delete

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the object has been deleted

##### Returns

`void`

#### Call Signature

> **delObject**(`id`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:741

Delete an object

##### Parameters

###### id

`string`

The id of the object to delete

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the object has been deleted

##### Returns

`void`

#### Call Signature

> **delObject**(`id`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:748

Delete an object

##### Parameters

###### id

`string`

The id of the object to delete

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

##### Returns

`Promise`\<`void`\>

***

### delObjectAsync()

> **delObjectAsync**(`id`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:755

Promise-version of delObject

#### Parameters

##### id

`string`

The id of the object to delete

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:923

Destructor of the class. Called when shutting down to close the redis connections.

#### Returns

`Promise`\<`void`\>

***

### destroyDB()

> **destroyDB**(`options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:913

Delete the whole objects database (requires admin rights)

#### Parameters

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

The current request options including the user, or the callback

##### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the database has been destroyed

#### Returns

`void`

***

### destroyDBAsync()

> **destroyDBAsync**(`options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:919

Promise-version of destroyDB

#### Parameters

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### enableFileCache()

#### Call Signature

> **enableFileCache**(`enabled`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:422

Enable or disable the file cache

##### Parameters

###### enabled

`boolean`

Whether the file cache should be enabled

###### callback?

(`err`, `res`) => `void`

Called with the resulting cache state

##### Returns

`void`

#### Call Signature

> **enableFileCache**(`enabled`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:430

Enable or disable the file cache

##### Parameters

###### enabled

`boolean`

Whether the file cache should be enabled

###### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

###### callback?

(`err`, `res`) => `void`

Called with the resulting cache state

##### Returns

`void`

***

### enableFileCacheAsync()

> **enableFileCacheAsync**(`enabled`, `options?`): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:437

Promise-version of enableFileCache

#### Parameters

##### enabled

`boolean`

Whether the file cache should be enabled

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`boolean`\>

***

### extendObject()

#### Call Signature

> **extendObject**\<`T`\>(`id`, `obj`, `options?`): `Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:843

Extend an existing object with the given partial object, creating it if it does not exist

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

The id of the object to extend

###### obj

[`PartialObjectWorker`](../type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

The partial object to merge into the existing object

###### options?

[`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md) \| `null`

The current request options including the user

##### Returns

`Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

#### Call Signature

> **extendObject**\<`T`\>(`id`, `obj`, `options?`, `callback?`): `void` \| `Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:852

Extend an existing object with the given partial object, creating it if it does not exist

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

The id of the object to extend

###### obj

[`PartialObjectWorker`](../type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

The partial object to merge into the existing object

###### options?

[`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md) \| `null`

The current request options including the user

###### callback?

[`ExtendObjectCallback`](../type-aliases/ExtendObjectCallback.md)

Called with the resulting object and its id

##### Returns

`void` \| `Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

***

### extendObjectAsync()

> **extendObjectAsync**(`id`, `obj`, `options?`): `Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:860

Promise-version of extendObject

#### Parameters

##### id

`string`

The id of the object to extend

##### obj

`Partial`\<[`AnyObject`](../type-aliases/AnyObject.md)\>

The partial object to merge into the existing object

##### options?

[`ExtendObjectOptions`](../interfaces/ExtendObjectOptions.md)

The current request options including the user

#### Returns

`Promise`\<\{ `id`: `string`; `value`: [`Object`](../type-aliases/Object.md); \} \| `undefined`\>

***

### extendPrimaryHostLock()

> **extendPrimaryHostLock**(`ms`): `Promise`\<`number`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:958

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

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:242

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

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:878

Find an object by its id or name

##### Parameters

###### idOrName

`string`

The id or name to search for

###### type

[`CommonType`](../type-aliases/CommonType.md) \| `null`

The expected common type, or null for any

###### options

[`CallOptions`](../interfaces/CallOptions.md) & `object` \| `null`

The current request options (may include a language)

###### callback

[`FindObjectCallback`](../type-aliases/FindObjectCallback.md)

Called with the found id and the original id/name

##### Returns

`void`

#### Call Signature

> **findObject**(`idOrName`, `type`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:888

Find an object by its id or name

##### Parameters

###### idOrName

`string`

The id or name to search for

###### type

[`CommonType`](../type-aliases/CommonType.md) \| `null`

The expected common type, or null for any

###### callback

[`FindObjectCallback`](../type-aliases/FindObjectCallback.md)

Called with the found id and the original id/name

##### Returns

`void`

#### Call Signature

> **findObject**(`idOrName`, `type?`, `options?`): `Promise`\<`string` \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:896

Find an object by its id or name

##### Parameters

###### idOrName

`string`

The id or name to search for

###### type?

[`CommonType`](../type-aliases/CommonType.md) \| `null`

The expected common type, or null for any

###### options?

[`CallOptions`](../interfaces/CallOptions.md) & `object` \| `null`

The current request options (may include a language)

##### Returns

`Promise`\<`string` \| `undefined`\>

***

### getFileId()

> **getFileId**(`id`, `name`, `isMeta?`): `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:146

Build the internal redis key for a file

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### isMeta?

`boolean`

Whether to return the key of the meta entry (true) or the data entry (false)

#### Returns

`string`

***

### getKeys()

#### Call Signature

> **getKeys**(`pattern`, `options`, `callback`, `dontModify?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:614

Get all object ids matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to match object ids against

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

The current request options including the user

###### callback

[`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

Called with the matching keys

###### dontModify?

`boolean`

If true, the returned keys are not stripped of the namespace

##### Returns

`void`

#### Call Signature

> **getKeys**(`pattern`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:621

Get all object ids matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to match object ids against

###### callback

[`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

Called with the matching keys

##### Returns

`void`

#### Call Signature

> **getKeys**(`pattern`, `options?`, `callback?`, `dontModify?`): `Promise`\<`string`[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:630

Get all object ids matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to match object ids against

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

###### callback?

`undefined`

Must be undefined for the promise variant

###### dontModify?

`boolean`

If true, the returned keys are not stripped of the namespace

##### Returns

`Promise`\<`string`[] \| `undefined`\>

***

### getKeysAsync()

> **getKeysAsync**(`pattern`, `options?`): `Promise`\<`string`[] \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:637

Promise-version of getKeys

#### Parameters

##### pattern

`string`

The pattern to match object ids against

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`string`[] \| `undefined`\>

***

### getMeta()

> **getMeta**(`id`): `Promise`\<`string` \| `null`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:998

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

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:582

Get a single object by its id

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

The id of the object to read

###### options

[`Options`](../interfaces/Options.md) \| `null` \| `undefined`

The current request options including the user

###### callback

[`GetObjectCallback`](../type-aliases/GetObjectCallback.md)\<`T`\>

Called with the read object

##### Returns

`void`

#### Call Signature

> **getObject**\<`T`\>(`id`, `options?`): [`GetObjectPromise`](../type-aliases/GetObjectPromise.md)\<`T`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:589

Get a single object by its id

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

The id of the object to read

###### options?

[`Options`](../interfaces/Options.md) \| `null`

The current request options including the user

##### Returns

[`GetObjectPromise`](../type-aliases/GetObjectPromise.md)\<`T`\>

#### Call Signature

> **getObject**\<`T`\>(`id`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:596

Get a single object by its id

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

The id of the object to read

###### callback

[`GetObjectCallback`](../type-aliases/GetObjectCallback.md)\<`T`\>

Called with the read object

##### Returns

`void`

***

### ~~getObjectAsync()~~

> **getObjectAsync**\<`T`\>(`id`, `options?`): `Promise`\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\> \| `null` \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:604

Promise-version of getObject

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### id

`T`

The id of the object to read

##### options?

`Record`\<`string`, `any`\> \| `null`

The current request options including the user

#### Returns

`Promise`\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\> \| `null` \| `undefined`\>

#### Deprecated

use `getObject` without callback instead

***

### getObjectList()

#### Call Signature

> **getObjectList**(`params`): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:805

Get the list of objects matching the given parameters

##### Parameters

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

Query parameters such as startkey and endkey

##### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

#### Call Signature

> **getObjectList**(`params`, `options?`): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:812

Get the list of objects matching the given parameters

##### Parameters

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

Query parameters such as startkey and endkey

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

##### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

#### Call Signature

> **getObjectList**(`params`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:819

Get the list of objects matching the given parameters

##### Parameters

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

Query parameters such as startkey and endkey

###### callback

[`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\>

Called with the matching objects

##### Returns

`void`

#### Call Signature

> **getObjectList**\<`T`\>(`params`, `options?`, `callback?`): `T` *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\> ? `void` : [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:827

Get the list of objects matching the given parameters

##### Type Parameters

###### T

`T` *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\>

##### Parameters

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

Query parameters such as startkey and endkey

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

###### callback?

`T`

Called with the matching objects

##### Returns

`T` *extends* [`GetObjectListCallback`](../type-aliases/GetObjectListCallback.md)\<[`Object`](../type-aliases/Object.md)\> ? `void` : [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

***

### getObjectListAsync()

> **getObjectListAsync**(`params`, `options?`): [`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:834

Promise-version of getObjectList

#### Parameters

##### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

Query parameters such as startkey and endkey

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

[`GetObjectListPromise`](../type-aliases/GetObjectListPromise.md)

***

### getObjects()

#### Call Signature

> **getObjects**(`keys`, `options?`): `Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:645

Get multiple objects by their ids

##### Parameters

###### keys

`string`[]

The ids of the objects to read

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

##### Returns

`Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

#### Call Signature

> **getObjects**(`keys`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:652

Get multiple objects by their ids

##### Parameters

###### keys

`string`[]

The ids of the objects to read

###### callback

(`err?`, `objs?`) => `void`

Called with the read objects

##### Returns

`void`

#### Call Signature

> **getObjects**(`keys`, `options`, `callback`, `dontModify?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:661

Get multiple objects by their ids

##### Parameters

###### keys

`string`[]

The ids of the objects to read

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

###### callback

(`err?`, `objs?`) => `void`

Called with the read objects

###### dontModify?

`boolean`

If true, the returned objects are not cloned/modified

##### Returns

`void`

***

### getObjectsAsync()

> **getObjectsAsync**(`keys`, `options?`): `Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:668

Promise-version of getObjects

#### Parameters

##### keys

`string`[]

The ids of the objects to read

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

#### Returns

`Promise`\<[`AnyObject`](../type-aliases/AnyObject.md)[]\>

***

### getObjectsByPattern()

#### Call Signature

> **getObjectsByPattern**(`pattern`, `options`): `Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:676

Get all objects whose id matches the given pattern

##### Parameters

###### pattern

`string`

The pattern to match object ids against

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

##### Returns

`Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

#### Call Signature

> **getObjectsByPattern**(`pattern`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:684

Get all objects whose id matches the given pattern

##### Parameters

###### pattern

`string`

The pattern to match object ids against

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

###### callback

(`err?`, `objs?`) => `void`

Called with the matching objects

##### Returns

`void`

***

### getObjectsByPatternAsync()

> **getObjectsByPatternAsync**(`pattern`, `options`): `Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:691

Promise-version of getObjectsByPattern

#### Parameters

##### pattern

`string`

The pattern to match object ids against

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void` \| [`AnyObject`](../type-aliases/AnyObject.md)[]\>

***

### getObjectView()

#### Call Signature

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params?`, `options?`): [`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:770

Run a predefined object view (design document) and return the matching rows

##### Type Parameters

###### Design

`Design` *extends* `string` = `string`

###### Search

`Search` *extends* `string` = `string`

##### Parameters

###### design

`Design`

The design document name

###### search

`Search`

The view name within the design document

###### params?

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

Query parameters such as startkey and endkey

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

##### Returns

[`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

#### Call Signature

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:780

Run a predefined object view (design document) and return the matching rows

##### Type Parameters

###### Design

`Design` *extends* `string` = `string`

###### Search

`Search` *extends* `string` = `string`

##### Parameters

###### design

`Design`

The design document name

###### search

`Search`

The view name within the design document

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md) \| `undefined`

Query parameters such as startkey and endkey

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

The current request options including the user

###### callback

[`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

Called with the matching rows

##### Returns

`void`

#### Call Signature

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:789

Run a predefined object view (design document) and return the matching rows

##### Type Parameters

###### Design

`Design` *extends* `string` = `string`

###### Search

`Search` *extends* `string` = `string`

##### Parameters

###### design

`Design`

The design document name

###### search

`Search`

The view name within the design document

###### params

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

Query parameters such as startkey and endkey

###### callback

[`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

Called with the matching rows

##### Returns

`void`

***

### getObjectViewAsync()

> **getObjectViewAsync**\<`Design`, `Search`\>(`design`, `search`, `params?`, `options?`): [`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:798

Promise-version of getObjectView

#### Type Parameters

##### Design

`Design` *extends* `string` = `string`

##### Search

`Search` *extends* `string` = `string`

#### Parameters

##### design

`Design`

The design document name

##### search

`Search`

The view name within the design document

##### params?

[`GetObjectViewParams`](../interfaces/GetObjectViewParams.md)

Query parameters such as startkey and endkey

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

[`GetObjectViewPromise`](../type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

***

### getPrimaryHost()

> **getPrimaryHost**(): `Promise`\<`string` \| `null`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:970

Get name of the primary host

#### Returns

`Promise`\<`string` \| `null`\>

***

### getProtocolVersion()

> **getProtocolVersion**(): `Promise`\<`string` \| `null`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:950

Returns the protocol version from DB

#### Returns

`Promise`\<`string` \| `null`\>

***

### getStatus()

> **getStatus**(): [`DbStatus`](../interfaces/DbStatus.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:106

Get the current status of the database

#### Returns

[`DbStatus`](../interfaces/DbStatus.md)

***

### getUserGroup()

> **getUserGroup**(`user`, `callback`): `void` \| `Promise`\<[`GetUserGroupPromiseReturn`](../type-aliases/GetUserGroupPromiseReturn.md)\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:180

Determine the groups and effective ACL of the given user

#### Parameters

##### user

`` `system.user.${string}` ``

The id of the user to look up

##### callback

[`GetUserGroupCallbackNoError`](../type-aliases/GetUserGroupCallbackNoError.md)

Called with the user, its groups and the effective ACL

#### Returns

`void` \| `Promise`\<[`GetUserGroupPromiseReturn`](../type-aliases/GetUserGroupPromiseReturn.md)\>

***

### isSystemLocaleSupported()

> **isSystemLocaleSupported**(): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:759

Function to checks if comparisons will work according to the configured Locale

#### Returns

`Promise`\<`boolean`\>

***

### loadLuaScripts()

> **loadLuaScripts**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:927

Load and register the Lua scripts used for atomic operations on the redis server

#### Returns

`Promise`\<`void`\>

***

### migrateToSets()

> **migrateToSets**(): `Promise`\<`number`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:946

Migrate all objects to sets

#### Returns

`Promise`\<`number`\>

number of migrated sets

***

### mkdir()

> **mkdir**(`id`, `dirName?`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:362

Create a directory for an object's files (simulated, as redis has no real directories)

#### Parameters

##### id

`string`

The id of the object owning the files

##### dirName?

`string`

The directory name to create

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user, or the callback

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the directory has been created

#### Returns

`void`

***

### mkdirAsync()

> **mkdirAsync**(`id`, `dirName?`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:370

Promise-version of mkdir

#### Parameters

##### id

`string`

The id of the object owning the files

##### dirName?

`string`

The directory name to create

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### normalizeFilename()

> **normalizeFilename**(`name`): `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:119

Normalize a file name by collapsing slashes and backslashes into a single forward slash

#### Parameters

##### name

`string`

The file name to normalize

#### Returns

`string`

***

### objectExists()

> **objectExists**(`id`, `options?`): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:234

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

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:287

List the contents of a directory of an object

#### Parameters

##### id

`string`

The id of the object owning the files

##### name

`string`

The directory name to list

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

The current request options including the user, or the callback

##### callback

[`ReadDirCallback`](../type-aliases/ReadDirCallback.md)

Called with the directory entries

#### Returns

`void`

***

### readDirAsync()

> **readDirAsync**(`id`, `name`, `options?`): [`ReadDirPromise`](../type-aliases/ReadDirPromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:295

Promise-version of readDir

#### Parameters

##### id

`string`

The id of the object owning the files

##### name

`string`

The directory name to list

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

[`ReadDirPromise`](../type-aliases/ReadDirPromise.md)

***

### readFile()

#### Call Signature

> **readFile**(`id`, `name`, `options?`): [`ReadFilePromise`](../type-aliases/ReadFilePromise.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:218

Read a file of an object

##### Parameters

###### id

`string`

The id of the object owning the file

###### name

`string`

The file name

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

##### Returns

[`ReadFilePromise`](../type-aliases/ReadFilePromise.md)

#### Call Signature

> **readFile**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:227

Read a file of an object

##### Parameters

###### id

`string`

The id of the object owning the file

###### name

`string`

The file name

###### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

The current request options including the user

###### callback

[`ReadFileCallback`](../type-aliases/ReadFileCallback.md)

Called with the file content and mime type

##### Returns

`void`

***

### releasePrimaryHost()

> **releasePrimaryHost**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:974

Ensure we are no longer the primary host

#### Returns

`Promise`\<`void`\>

***

### rename()

> **rename**(`id`, `oldName`, `newName`, `options?`, `callback?`): `void` \| `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:307

Rename a file or directory of an object

#### Parameters

##### id

`string`

The id of the object owning the file

##### oldName

`string`

The current file or directory name

##### newName

`string`

The new file or directory name

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user, or the callback

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the file has been renamed

#### Returns

`void` \| `Promise`\<`void`\>

***

### renameAsync()

> **renameAsync**(`id`, `oldName`, `newName`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:316

Promise-version of rename

#### Parameters

##### id

`string`

The id of the object owning the file

##### oldName

`string`

The current file or directory name

##### newName

`string`

The new file or directory name

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### rm()

> **rm**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:345

Delete a file or directory of an object

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file or directory name to delete

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user, or the callback

##### callback

[`RmCallback`](../type-aliases/RmCallback.md)

Called with the list of removed files

#### Returns

`void`

***

### rmAsync()

> **rmAsync**(`id`, `name`, `options`): `Promise`\<`void` \| [`RmResult`](../interfaces/RmResult.md)[]\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:353

Promise-version of rm

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file or directory name to delete

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void` \| [`RmResult`](../interfaces/RmResult.md)[]\>

***

### setDefaultAcl()

> **setDefaultAcl**(`defaultNewAcl`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:173

Set the default ACL applied to new objects and apply it to all existing objects without an ACL

#### Parameters

##### defaultNewAcl

[`ACLObject`](../interfaces/ACLObject.md) \| `null`

The default ACL to use, or null to use the built-in default

#### Returns

`Promise`\<`void`\>

***

### setExists()

> **setExists**(`id`): `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:940

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

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:699

Set anew or update an object

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

ID of the object

###### obj

[`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

The object to write

##### Returns

`Promise`\<\{ `id`: `string`; \} \| `undefined`\>

#### Call Signature

> **setObject**\<`T`\>(`id`, `obj`, `callback?`): `void` \| `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:707

Set anew or update an object

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

ID of the object

###### obj

[`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

The object to write

###### callback?

[`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

return function

##### Returns

`void` \| `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

#### Call Signature

> **setObject**\<`T`\>(`id`, `obj`, `options?`, `callback?`): `void` \| `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:716

Set anew or update an object

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

ID of the object

###### obj

[`SettableObjectWorker`](../type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

The object to write

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

options for access control are optional

###### callback?

[`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

return function

##### Returns

`void` \| `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

***

### ~~setObjectAsync()~~

> **setObjectAsync**(`id`, `obj`, `options?`): `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:725

Promise-version of setObject

#### Parameters

##### id

`string`

ID of the object

##### obj

`Omit`\<[`StateObject`](../interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

The object to write

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

options for access control are optional

#### Returns

`Promise`\<\{ `id`: `string`; \} \| `undefined`\>

#### Deprecated

use `setObject` without callback instead

***

### setPrimaryHost()

> **setPrimaryHost**(`ms`): `Promise`\<`number`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:966

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

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:980

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

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:464

Subscribe to object changes matching the given pattern

##### Parameters

###### pattern

`string` \| `string`[]

One or more patterns to subscribe to

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the subscription is registered

##### Returns

`void`

#### Call Signature

> **subscribe**(`pattern`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:472

Subscribe to object changes matching the given pattern

##### Parameters

###### pattern

`string` \| `string`[]

One or more patterns to subscribe to

###### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the subscription is registered

##### Returns

`void`

***

### subscribeAsync()

> **subscribeAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:479

Promise-version of subscribe

#### Parameters

##### pattern

`string` \| `string`[]

One or more patterns to subscribe to

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### subscribePrimaryHost()

> **subscribePrimaryHost**(): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:984

Subscribe to expired events to get expiration of primary host

#### Returns

`Promise`\<`void`\>

***

### subscribeUser()

#### Call Signature

> **subscribeUser**(`pattern`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:486

Subscribe a user to object changes matching the given pattern

##### Parameters

###### pattern

`string` \| `string`[]

One or more patterns to subscribe to

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the subscription is registered

##### Returns

`void`

#### Call Signature

> **subscribeUser**(`pattern`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:494

Subscribe a user to object changes matching the given pattern

##### Parameters

###### pattern

`string` \| `string`[]

One or more patterns to subscribe to

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the subscription is registered

##### Returns

`void`

***

### subscribeUserAsync()

> **subscribeUserAsync**(`pattern`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:501

Promise-version of subscribeUser

#### Parameters

##### pattern

`string` \| `string`[]

One or more patterns to subscribe to

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### subscribeUserFile()

> **subscribeUserFile**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:447

Subscribe a user to file changes of an object

#### Parameters

##### id

`string`

The id of the object owning the files

##### pattern

`string` \| `string`[]

One or more file name patterns to subscribe to

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### touch()

> **touch**(`id`, `name`, `options`, `callback`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:326

Update the modification time of a file

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user, or the callback

##### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the file has been touched

#### Returns

`void`

***

### touchAsync()

> **touchAsync**(`id`, `name`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:334

Promise-version of touch

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### unlink()

> **unlink**(`id`, `name`, `options`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:252

Delete a file or directory of an object

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file or directory name to delete

##### options

[`CallOptions`](../interfaces/CallOptions.md) \| `null` \| `undefined`

The current request options including the user, or the callback

##### callback?

[`RmCallback`](../type-aliases/RmCallback.md)

Called with the list of removed files

#### Returns

`void`

***

### unlinkAsync()

> **unlinkAsync**(`id`, `name`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:260

Promise-version of unlink

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file or directory name to delete

##### options?

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### unsubscribe()

#### Call Signature

> **unsubscribe**(`pattern`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:510

Unsubscribe from object changes matching the given pattern

##### Parameters

###### pattern

`string` \| `string`[]

One or more patterns to unsubscribe from

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the subscription is removed

##### Returns

`void`

#### Call Signature

> **unsubscribe**(`pattern`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:518

Unsubscribe from object changes matching the given pattern

##### Parameters

###### pattern

`string` \| `string`[]

One or more patterns to unsubscribe from

###### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the subscription is removed

##### Returns

`void`

***

### unsubscribeAsync()

> **unsubscribeAsync**(`pattern`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:525

Promise-version of unsubscribe

#### Parameters

##### pattern

`string` \| `string`[]

One or more patterns to unsubscribe from

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### unsubscribeUser()

> **unsubscribeUser**(`pattern`, `options?`, `callback?`): `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:533

Unsubscribe a user from object changes matching the given pattern

#### Parameters

##### pattern

`string` \| `string`[]

One or more patterns to unsubscribe from

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user, or the callback

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the subscription is removed

#### Returns

`void`

***

### unsubscribeUserAsync()

> **unsubscribeUserAsync**(`pattern`, `options`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:540

Promise-version of unsubscribeUser

#### Parameters

##### pattern

`string` \| `string`[]

One or more patterns to unsubscribe from

##### options

[`CallOptions`](../interfaces/CallOptions.md)

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### unsubscribeUserFile()

> **unsubscribeUserFile**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:455

Unsubscribe a user from file changes of an object

#### Parameters

##### id

`string`

The id of the object owning the files

##### pattern

`string` \| `string`[]

One or more file name patterns to unsubscribe from

##### options?

[`CallOptions`](../interfaces/CallOptions.md) \| `null`

The current request options including the user

#### Returns

`Promise`\<`void`\>

***

### validateMetaObject()

> **validateMetaObject**(`id`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:113

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

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:190

Write data into a file of an object

##### Parameters

###### id

`string`

The id of the object owning the file

###### name

`string`

The file name

###### data

`any`

The data to write

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the file has been written

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **writeFile**(`id`, `name`, `data`, `options?`, `callback?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:200

Write data into a file of an object

##### Parameters

###### id

`string`

The id of the object owning the file

###### name

`string`

The file name

###### data

`any`

The data to write

###### options?

[`WriteFileOptions`](../interfaces/WriteFileOptions.md) \| `null`

The current request options including the user

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

Called once the file has been written

##### Returns

`Promise`\<`void`\>

***

### writeFileAsync()

> **writeFileAsync**(`id`, `name`, `data`, `options?`): `Promise`\<`void`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:209

Promise-version of writeFile

#### Parameters

##### id

`string`

The id of the object owning the file

##### name

`string`

The file name

##### data

`any`

The data to write

##### options?

[`WriteFileOptions`](../interfaces/WriteFileOptions.md) \| `null`

The current request options including the user

#### Returns

`Promise`\<`void`\>
