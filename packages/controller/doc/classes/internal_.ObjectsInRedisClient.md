[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ObjectsInRedisClient

# Class: ObjectsInRedisClient

[\<internal\>](../modules/internal_.md).ObjectsInRedisClient

## Table of contents

### Constructors

- [constructor](internal_.ObjectsInRedisClient.md#constructor)

### Methods

- [activateSets](internal_.ObjectsInRedisClient.md#activatesets)
- [addPreserveSettings](internal_.ObjectsInRedisClient.md#addpreservesettings)
- [checkFile](internal_.ObjectsInRedisClient.md#checkfile)
- [checkFileRights](internal_.ObjectsInRedisClient.md#checkfilerights)
- [chmodFile](internal_.ObjectsInRedisClient.md#chmodfile)
- [chmodFileAsync](internal_.ObjectsInRedisClient.md#chmodfileasync)
- [chmodObject](internal_.ObjectsInRedisClient.md#chmodobject)
- [chmodObjectAsync](internal_.ObjectsInRedisClient.md#chmodobjectasync)
- [chownFile](internal_.ObjectsInRedisClient.md#chownfile)
- [chownFileAsync](internal_.ObjectsInRedisClient.md#chownfileasync)
- [chownObject](internal_.ObjectsInRedisClient.md#chownobject)
- [chownObjectAsync](internal_.ObjectsInRedisClient.md#chownobjectasync)
- [connectDb](internal_.ObjectsInRedisClient.md#connectdb)
- [deactivateSets](internal_.ObjectsInRedisClient.md#deactivatesets)
- [delFile](internal_.ObjectsInRedisClient.md#delfile)
- [delFileAsync](internal_.ObjectsInRedisClient.md#delfileasync)
- [delObject](internal_.ObjectsInRedisClient.md#delobject)
- [delObjectAsync](internal_.ObjectsInRedisClient.md#delobjectasync)
- [destroy](internal_.ObjectsInRedisClient.md#destroy)
- [destroyDB](internal_.ObjectsInRedisClient.md#destroydb)
- [destroyDBAsync](internal_.ObjectsInRedisClient.md#destroydbasync)
- [enableFileCache](internal_.ObjectsInRedisClient.md#enablefilecache)
- [enableFileCacheAsync](internal_.ObjectsInRedisClient.md#enablefilecacheasync)
- [extendObject](internal_.ObjectsInRedisClient.md#extendobject)
- [extendObjectAsync](internal_.ObjectsInRedisClient.md#extendobjectasync)
- [extendPrimaryHostLock](internal_.ObjectsInRedisClient.md#extendprimaryhostlock)
- [fileExists](internal_.ObjectsInRedisClient.md#fileexists)
- [findObject](internal_.ObjectsInRedisClient.md#findobject)
- [getFileId](internal_.ObjectsInRedisClient.md#getfileid)
- [getKeys](internal_.ObjectsInRedisClient.md#getkeys)
- [getKeysAsync](internal_.ObjectsInRedisClient.md#getkeysasync)
- [getMeta](internal_.ObjectsInRedisClient.md#getmeta)
- [getObject](internal_.ObjectsInRedisClient.md#getobject)
- [getObjectAsync](internal_.ObjectsInRedisClient.md#getobjectasync)
- [getObjectList](internal_.ObjectsInRedisClient.md#getobjectlist)
- [getObjectListAsync](internal_.ObjectsInRedisClient.md#getobjectlistasync)
- [getObjectView](internal_.ObjectsInRedisClient.md#getobjectview)
- [getObjectViewAsync](internal_.ObjectsInRedisClient.md#getobjectviewasync)
- [getObjects](internal_.ObjectsInRedisClient.md#getobjects)
- [getObjectsAsync](internal_.ObjectsInRedisClient.md#getobjectsasync)
- [getObjectsByPattern](internal_.ObjectsInRedisClient.md#getobjectsbypattern)
- [getObjectsByPatternAsync](internal_.ObjectsInRedisClient.md#getobjectsbypatternasync)
- [getPrimaryHost](internal_.ObjectsInRedisClient.md#getprimaryhost)
- [getProtocolVersion](internal_.ObjectsInRedisClient.md#getprotocolversion)
- [getStatus](internal_.ObjectsInRedisClient.md#getstatus)
- [getUserGroup](internal_.ObjectsInRedisClient.md#getusergroup)
- [isSystemLocaleSupported](internal_.ObjectsInRedisClient.md#issystemlocalesupported)
- [loadLuaScripts](internal_.ObjectsInRedisClient.md#loadluascripts)
- [migrateToSets](internal_.ObjectsInRedisClient.md#migratetosets)
- [mkdir](internal_.ObjectsInRedisClient.md#mkdir)
- [mkdirAsync](internal_.ObjectsInRedisClient.md#mkdirasync)
- [normalizeFilename](internal_.ObjectsInRedisClient.md#normalizefilename)
- [objectExists](internal_.ObjectsInRedisClient.md#objectexists)
- [readDir](internal_.ObjectsInRedisClient.md#readdir)
- [readDirAsync](internal_.ObjectsInRedisClient.md#readdirasync)
- [readFile](internal_.ObjectsInRedisClient.md#readfile)
- [releasePrimaryHost](internal_.ObjectsInRedisClient.md#releaseprimaryhost)
- [rename](internal_.ObjectsInRedisClient.md#rename)
- [renameAsync](internal_.ObjectsInRedisClient.md#renameasync)
- [rm](internal_.ObjectsInRedisClient.md#rm)
- [rmAsync](internal_.ObjectsInRedisClient.md#rmasync)
- [setDefaultAcl](internal_.ObjectsInRedisClient.md#setdefaultacl)
- [setExists](internal_.ObjectsInRedisClient.md#setexists)
- [setObject](internal_.ObjectsInRedisClient.md#setobject)
- [setObjectAsync](internal_.ObjectsInRedisClient.md#setobjectasync)
- [setPrimaryHost](internal_.ObjectsInRedisClient.md#setprimaryhost)
- [setProtocolVersion](internal_.ObjectsInRedisClient.md#setprotocolversion)
- [subscribe](internal_.ObjectsInRedisClient.md#subscribe)
- [subscribeAsync](internal_.ObjectsInRedisClient.md#subscribeasync)
- [subscribePrimaryHost](internal_.ObjectsInRedisClient.md#subscribeprimaryhost)
- [subscribeUser](internal_.ObjectsInRedisClient.md#subscribeuser)
- [subscribeUserAsync](internal_.ObjectsInRedisClient.md#subscribeuserasync)
- [subscribeUserFile](internal_.ObjectsInRedisClient.md#subscribeuserfile)
- [touch](internal_.ObjectsInRedisClient.md#touch)
- [touchAsync](internal_.ObjectsInRedisClient.md#touchasync)
- [unlink](internal_.ObjectsInRedisClient.md#unlink)
- [unlinkAsync](internal_.ObjectsInRedisClient.md#unlinkasync)
- [unsubscribe](internal_.ObjectsInRedisClient.md#unsubscribe)
- [unsubscribeAsync](internal_.ObjectsInRedisClient.md#unsubscribeasync)
- [unsubscribeUser](internal_.ObjectsInRedisClient.md#unsubscribeuser)
- [unsubscribeUserAsync](internal_.ObjectsInRedisClient.md#unsubscribeuserasync)
- [unsubscribeUserFile](internal_.ObjectsInRedisClient.md#unsubscribeuserfile)
- [validateMetaObject](internal_.ObjectsInRedisClient.md#validatemetaobject)
- [writeFile](internal_.ObjectsInRedisClient.md#writefile)
- [writeFileAsync](internal_.ObjectsInRedisClient.md#writefileasync)

## Constructors

### constructor

• **new ObjectsInRedisClient**(`settings`): [`ObjectsInRedisClient`](internal_.ObjectsInRedisClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`ObjectsSettings`](../interfaces/internal_.ObjectsSettings.md) |

#### Returns

[`ObjectsInRedisClient`](internal_.ObjectsInRedisClient.md)

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:68

## Methods

### activateSets

▸ **activateSets**(): `Promise`\<`void`\>

Activates the usage of sets

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:323

___

### addPreserveSettings

▸ **addPreserveSettings**(`settings`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | `string` \| `string`[] |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:256

___

### checkFile

▸ **checkFile**(`id`, `name`, `options`, `flag`, `callback?`): `Promise`\<`undefined` \| `void` \| [`CallOptions`](../interfaces/internal_.CallOptions.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `flag` | `any` |
| `callback?` | [`CheckFileCallback`](../modules/internal_.md#checkfilecallback) |

#### Returns

`Promise`\<`undefined` \| `void` \| [`CallOptions`](../interfaces/internal_.CallOptions.md)\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:103

___

### checkFileRights

▸ **checkFileRights**(`id`, `name`, `options?`, `flag?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | ``null`` \| `string` |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `flag?` | `any` |
| `callback?` | [`CheckFileRightsCallback`](../modules/internal_.md#checkfilerightscallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:104

___

### chmodFile

▸ **chmodFile**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`ChownFileCallback`](../modules/internal_.md#chownfilecallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:164

___

### chmodFileAsync

▸ **chmodFileAsync**(`id`, `name`, `options`): `Promise`\<`undefined` \| [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`undefined` \| [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:165

___

### chmodObject

▸ **chmodObject**(`pattern`, `options`, `callback?`): `void` \| `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`ChownObjectCallback`](../modules/internal_.md#chownobjectcallback) |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:193

___

### chmodObjectAsync

▸ **chmodObjectAsync**(`pattern`, `options`): `Promise`\<`undefined` \| [`Object`](../modules/internal_.md#object)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`undefined` \| [`Object`](../modules/internal_.md#object)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:194

___

### chownFile

▸ **chownFile**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`ChownFileCallback`](../modules/internal_.md#chownfilecallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:153

___

### chownFileAsync

▸ **chownFileAsync**(`id`, `name`, `options`): `Promise`\<`undefined` \| [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`undefined` \| [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:154

___

### chownObject

▸ **chownObject**(`pattern`, `options`, `callback?`): `void` \| `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`ChownObjectCallback`](../modules/internal_.md#chownobjectcallback) |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:190

___

### chownObjectAsync

▸ **chownObjectAsync**(`pattern`, `options`): `Promise`\<`undefined` \| [`Object`](../modules/internal_.md#object)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`undefined` \| [`Object`](../modules/internal_.md#object)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:191

___

### connectDb

▸ **connectDb**(): `void`

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:73

___

### deactivateSets

▸ **deactivateSets**(): `Promise`\<`void`\>

Deactivates the usage of sets

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:327

___

### delFile

▸ **delFile**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:133

___

### delFileAsync

▸ **delFileAsync**(`id`, `name`, `options`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:134

___

### delObject

▸ **delObject**(`id`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:220

▸ **delObject**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:221

▸ **delObject**(`id`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:222

___

### delObjectAsync

▸ **delObjectAsync**(`id`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:223

___

### destroy

▸ **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:261

___

### destroyDB

▸ **destroyDB**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:259

___

### destroyDBAsync

▸ **destroyDBAsync**(`options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:260

___

### enableFileCache

▸ **enableFileCache**(`enabled`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |
| `callback?` | (`err`: `undefined` \| ``null`` \| `Error`, `res`: `boolean`) => `void` |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:166

▸ **enableFileCache**(`enabled`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | (`err`: `undefined` \| ``null`` \| `Error`, `res`: `boolean`) => `void` |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:167

___

### enableFileCacheAsync

▸ **enableFileCacheAsync**(`enabled`, `options?`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:168

___

### extendObject

▸ **extendObject**\<`T`\>(`id`, `obj`, `options?`): `Promise`\<`undefined` \| \{ `id`: `string` ; `value`: [`Object`](../modules/internal_.md#object)  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | [`PartialObjectWorker`](../modules/internal_.md#partialobjectworker)\<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"write"``\>\> |
| `options?` | ``null`` \| [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) |

#### Returns

`Promise`\<`undefined` \| \{ `id`: `string` ; `value`: [`Object`](../modules/internal_.md#object)  }\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:241

▸ **extendObject**\<`T`\>(`id`, `obj`, `options?`, `callback?`): `void` \| `Promise`\<`undefined` \| \{ `id`: `string` ; `value`: [`Object`](../modules/internal_.md#object)  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | [`PartialObjectWorker`](../modules/internal_.md#partialobjectworker)\<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"write"``\>\> |
| `options?` | ``null`` \| [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) |
| `callback?` | [`ExtendObjectCallback`](../modules/internal_.md#extendobjectcallback) |

#### Returns

`void` \| `Promise`\<`undefined` \| \{ `id`: `string` ; `value`: [`Object`](../modules/internal_.md#object)  }\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:242

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `obj`, `options?`): `Promise`\<`undefined` \| \{ `id`: `string` ; `value`: [`Object`](../modules/internal_.md#object)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Partial`\<[`AnyObject`](../modules/internal_.md#anyobject)\> |
| `options?` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) |

#### Returns

`Promise`\<`undefined` \| \{ `id`: `string` ; `value`: [`Object`](../modules/internal_.md#object)  }\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:243

___

### extendPrimaryHostLock

▸ **extendPrimaryHostLock**(`ms`): `Promise`\<`number`\>

Extend the primary host lock time
Value will expire after ms milliseconds

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | ms until value expires |

#### Returns

`Promise`\<`number`\>

1 if extended else 0

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:293

___

### fileExists

▸ **fileExists**(`id`, `name`, `options?`): `Promise`\<`boolean`\>

Check if given file exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the namespace |
| `name` | `string` | name of the file |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) | optional user context |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:129

___

### findObject

▸ **findObject**(`idOrName`, `type`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrName` | `string` |
| `type` | ``null`` \| `string` |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`FindObjectCallback`](../modules/internal_.md#findobjectcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:253

▸ **findObject**(`idOrName`, `type`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrName` | `string` |
| `type` | ``null`` \| `string` |
| `callback` | [`FindObjectCallback`](../modules/internal_.md#findobjectcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:254

▸ **findObject**(`idOrName`, `type?`, `options?`): `Promise`\<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrName` | `string` |
| `type?` | ``null`` \| `string` |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:255

___

### getFileId

▸ **getFileId**(`id`, `name`, `isMeta?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `isMeta?` | `boolean` |

#### Returns

`string`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:102

___

### getKeys

▸ **getKeys**(`pattern`, `options`, `callback`, `dontModify?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options` | `undefined` \| ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`GetKeysCallback`](../modules/internal_.md#getkeyscallback) |
| `dontModify?` | `boolean` |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:201

▸ **getKeys**(`pattern`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `callback` | [`GetKeysCallback`](../modules/internal_.md#getkeyscallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:202

▸ **getKeys**(`pattern`, `options?`, `callback?`, `dontModify?`): `Promise`\<`undefined` \| `string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | `undefined` |
| `dontModify?` | `boolean` |

#### Returns

`Promise`\<`undefined` \| `string`[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:203

___

### getKeysAsync

▸ **getKeysAsync**(`id`, `options?`): `Promise`\<`undefined` \| `string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`undefined` \| `string`[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:204

___

### getMeta

▸ **getMeta**(`id`): `Promise`\<``null`` \| `string`\>

Get value from meta namespace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | redis key |

#### Returns

`Promise`\<``null`` \| `string`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:333

___

### getObject

▸ **getObject**\<`T`\>(`id`, `options`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `options` | `undefined` \| ``null`` \| `Record`\<`string`, `any`\> |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)\<`T`\> |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:196

▸ **getObject**\<`T`\>(`id`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)\<`T`\> |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:197

▸ **getObject**\<`T`\>(`id`, `options?`): `Promise`\<`undefined` \| ``null`` \| [`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"read"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `options?` | ``null`` \| `Record`\<`string`, `any`\> |

#### Returns

`Promise`\<`undefined` \| ``null`` \| [`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"read"``\>\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:198

___

### getObjectAsync

▸ **getObjectAsync**\<`T`\>(`id`, `options?`): `Promise`\<`undefined` \| ``null`` \| [`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"read"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `options?` | ``null`` \| `Record`\<`string`, `any`\> |

#### Returns

`Promise`\<`undefined` \| ``null`` \| [`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"read"``\>\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:199

___

### getObjectList

▸ **getObjectList**(`params`): [`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |

#### Returns

[`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:235

▸ **getObjectList**(`params`, `options?`): [`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

[`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:236

▸ **getObjectList**(`params`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `callback` | [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback)\<[`Object`](../modules/internal_.md#object)\> |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:237

▸ **getObjectList**\<`T`\>(`params`, `options?`, `callback?`): `T` extends [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback)\<[`Object`](../modules/internal_.md#object)\> ? `void` : [`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback)\<[`Object`](../modules/internal_.md#object)\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | `T` |

#### Returns

`T` extends [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback)\<[`Object`](../modules/internal_.md#object)\> ? `void` : [`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:238

___

### getObjectListAsync

▸ **getObjectListAsync**(`params`, `options?`): [`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

[`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:239

___

### getObjectView

▸ **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params?`, `options?`): [`GetObjectViewPromise`](../modules/internal_.md#getobjectviewpromise)\<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)\<`Design`, `Search`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` = `string` |
| `Search` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `design` | `Design` |
| `search` | `Search` |
| `params?` | [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

[`GetObjectViewPromise`](../modules/internal_.md#getobjectviewpromise)\<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)\<`Design`, `Search`\>\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:230

▸ **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` = `string` |
| `Search` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `design` | `Design` |
| `search` | `Search` |
| `params` | `undefined` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options` | `undefined` \| ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`GetObjectViewCallback`](../modules/internal_.md#getobjectviewcallback)\<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)\<`Design`, `Search`\>\> |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:231

▸ **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` = `string` |
| `Search` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `design` | `Design` |
| `search` | `Search` |
| `params` | [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `callback` | [`GetObjectViewCallback`](../modules/internal_.md#getobjectviewcallback)\<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)\<`Design`, `Search`\>\> |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:232

___

### getObjectViewAsync

▸ **getObjectViewAsync**\<`Design`, `Search`\>(`design`, `search`, `params?`, `options?`): [`GetObjectViewPromise`](../modules/internal_.md#getobjectviewpromise)\<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)\<`Design`, `Search`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` = `string` |
| `Search` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `design` | `Design` |
| `search` | `Search` |
| `params?` | [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

[`GetObjectViewPromise`](../modules/internal_.md#getobjectviewpromise)\<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)\<`Design`, `Search`\>\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:233

___

### getObjects

▸ **getObjects**(`keys`, `options?`): `Promise`\<[`AnyObject`](../modules/internal_.md#anyobject)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<[`AnyObject`](../modules/internal_.md#anyobject)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:206

▸ **getObjects**(`keys`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `callback` | (`err?`: ``null`` \| `Error`, `objs?`: [`AnyObject`](../modules/internal_.md#anyobject)[]) => `void` |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:207

▸ **getObjects**(`keys`, `options`, `callback`, `dontModify?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | (`err?`: ``null`` \| `Error`, `objs?`: [`AnyObject`](../modules/internal_.md#anyobject)[]) => `void` |
| `dontModify?` | `boolean` |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:208

___

### getObjectsAsync

▸ **getObjectsAsync**(`keys`, `options?`): `Promise`\<[`AnyObject`](../modules/internal_.md#anyobject)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<[`AnyObject`](../modules/internal_.md#anyobject)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:209

___

### getObjectsByPattern

▸ **getObjectsByPattern**(`pattern`, `options`): `Promise`\<`void` \| [`AnyObject`](../modules/internal_.md#anyobject)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void` \| [`AnyObject`](../modules/internal_.md#anyobject)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:211

▸ **getObjectsByPattern**(`pattern`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | (`err?`: ``null`` \| `Error`, `objs?`: [`AnyObject`](../modules/internal_.md#anyobject)[]) => `void` |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:212

___

### getObjectsByPatternAsync

▸ **getObjectsByPatternAsync**(`pattern`, `options`): `Promise`\<`void` \| [`AnyObject`](../modules/internal_.md#anyobject)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void` \| [`AnyObject`](../modules/internal_.md#anyobject)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:213

___

### getPrimaryHost

▸ **getPrimaryHost**(): `Promise`\<``null`` \| `string`\>

Get name of the primary host

#### Returns

`Promise`\<``null`` \| `string`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:305

___

### getProtocolVersion

▸ **getProtocolVersion**(): `Promise`\<``null`` \| `string`\>

Returns the protocol version from DB

#### Returns

`Promise`\<``null`` \| `string`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:285

___

### getStatus

▸ **getStatus**(): [`DbStatus`](../interfaces/internal_.DbStatus.md)

#### Returns

[`DbStatus`](../interfaces/internal_.DbStatus.md)

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:74

___

### getUserGroup

▸ **getUserGroup**(`user`, `callback`): `void` \| `Promise`\<[`GetUserGroupPromiseReturn`](../modules/internal_.md#getusergrouppromisereturn)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | \`system.user.$\{string}\` |
| `callback` | [`GetUserGroupCallbackNoError`](../modules/internal_.md#getusergroupcallbacknoerror) |

#### Returns

`void` \| `Promise`\<[`GetUserGroupPromiseReturn`](../modules/internal_.md#getusergrouppromisereturn)\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:107

___

### isSystemLocaleSupported

▸ **isSystemLocaleSupported**(): `Promise`\<`boolean`\>

Function to checks if comparisons will work according to the configured Locale

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:227

___

### loadLuaScripts

▸ **loadLuaScripts**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:262

___

### migrateToSets

▸ **migrateToSets**(): `Promise`\<`number`\>

Migrate all objects to sets

#### Returns

`Promise`\<`number`\>

number of migrated sets

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:281

___

### mkdir

▸ **mkdir**(`id`, `dirName?`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dirName?` | `string` |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:149

___

### mkdirAsync

▸ **mkdirAsync**(`id`, `dirName?`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dirName?` | `string` |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:150

___

### normalizeFilename

▸ **normalizeFilename**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:82

___

### objectExists

▸ **objectExists**(`id`, `options?`): `Promise`\<`boolean`\>

Check if given object exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) | optional user context |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:121

___

### readDir

▸ **readDir**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | `undefined` \| ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`ReadDirCallback`](../modules/internal_.md#readdircallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:136

___

### readDirAsync

▸ **readDirAsync**(`id`, `name`, `options?`): [`ReadDirPromise`](../modules/internal_.md#readdirpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

[`ReadDirPromise`](../modules/internal_.md#readdirpromise)

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:137

___

### readFile

▸ **readFile**(`id`, `name`, `options?`): [`ReadFilePromise`](../modules/internal_.md#readfilepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

[`ReadFilePromise`](../modules/internal_.md#readfilepromise)

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:113

▸ **readFile**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | `undefined` \| ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`ReadFileCallback`](../modules/internal_.md#readfilecallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:114

___

### releasePrimaryHost

▸ **releasePrimaryHost**(): `Promise`\<`void`\>

Ensure we are no longer the primary host

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:309

___

### rename

▸ **rename**(`id`, `oldName`, `newName`, `options?`, `callback?`): `void` \| `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `oldName` | `string` |
| `newName` | `string` |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:140

___

### renameAsync

▸ **renameAsync**(`id`, `oldName`, `newName`, `options`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `oldName` | `string` |
| `newName` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:141

___

### rm

▸ **rm**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`RmCallback`](../modules/internal_.md#rmcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:147

___

### rmAsync

▸ **rmAsync**(`id`, `name`, `options`): `Promise`\<`void` \| [`RmResult`](../interfaces/internal_.RmResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void` \| [`RmResult`](../interfaces/internal_.RmResult.md)[]\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:148

___

### setDefaultAcl

▸ **setDefaultAcl**(`defaultNewAcl`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultNewAcl` | ``null`` \| [`ACLObject`](../interfaces/internal_.ACLObject.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:106

___

### setExists

▸ **setExists**(`id`): `Promise`\<`boolean`\>

Checks if a given set exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the set |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:275

___

### setObject

▸ **setObject**\<`T`\>(`id`, `obj`): `Promise`\<`undefined` \| \{ `id`: `string`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)\<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"read"``\>\> |

#### Returns

`Promise`\<`undefined` \| \{ `id`: `string`  }\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:215

▸ **setObject**\<`T`\>(`id`, `obj`, `callback?`): `void` \| `Promise`\<`undefined` \| \{ `id`: `string`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)\<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"read"``\>\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void` \| `Promise`\<`undefined` \| \{ `id`: `string`  }\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:216

▸ **setObject**\<`T`\>(`id`, `obj`, `options?`, `callback?`): `void` \| `Promise`\<`undefined` \| \{ `id`: `string`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)\<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)\<`T`, ``"read"``\>\> |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void` \| `Promise`\<`undefined` \| \{ `id`: `string`  }\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:217

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`, `options?`): `Promise`\<`undefined` \| \{ `id`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`\<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| `Omit`\<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: \`system.host.$\{string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: \`system.adapter.$\{string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: \`system.adapter.$\{string}.$\{number}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: \`system.user.$\{string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: \`system.group.$\{string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`ChartObject`](../interfaces/internal_.ChartObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`ScheduleObject`](../interfaces/internal_.ScheduleObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`RepositoryObject`](../interfaces/internal_.RepositoryObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: ``"system.repositories"`` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`\<[`DesignObject`](../interfaces/internal_.DesignObject.md), ``"_id"`` \| ``"acl"``\> & \{ `_id?`: \`\_design/$\{string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`undefined` \| \{ `id`: `string`  }\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:218

___

### setPrimaryHost

▸ **setPrimaryHost**(`ms`): `Promise`\<`number`\>

Sets current host as primary if no primary host active
Value will expire after ms milliseconds

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | ms until value expires |

#### Returns

`Promise`\<`number`\>

1 if lock acquired else 0

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:301

___

### setProtocolVersion

▸ **setProtocolVersion**(`version`): `Promise`\<`void`\>

Sets the protocol version to the DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `string` \| `number` | protocol version |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:315

___

### subscribe

▸ **subscribe**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:175

▸ **subscribe**(`pattern`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:176

___

### subscribeAsync

▸ **subscribeAsync**(`pattern`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:177

___

### subscribePrimaryHost

▸ **subscribePrimaryHost**(): `Promise`\<`void`\>

Subscribe to expired events to get expiration of primary host

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:319

___

### subscribeUser

▸ **subscribeUser**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:178

▸ **subscribeUser**(`pattern`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:179

___

### subscribeUserAsync

▸ **subscribeUserAsync**(`pattern`, `options`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:180

___

### subscribeUserFile

▸ **subscribeUserFile**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `pattern` | `string` \| `string`[] |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:171

___

### touch

▸ **touch**(`id`, `name`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:143

___

### touchAsync

▸ **touchAsync**(`id`, `name`, `options`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:144

___

### unlink

▸ **unlink**(`id`, `name`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options` | `undefined` \| ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`RmCallback`](../modules/internal_.md#rmcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:131

___

### unlinkAsync

▸ **unlinkAsync**(`id`, `name`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `options?` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:132

___

### unsubscribe

▸ **unsubscribe**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:183

▸ **unsubscribe**(`pattern`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:184

___

### unsubscribeAsync

▸ **unsubscribeAsync**(`pattern`, `options`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:185

___

### unsubscribeUser

▸ **unsubscribeUser**(`pattern`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:186

___

### unsubscribeUserAsync

▸ **unsubscribeUserAsync**(`pattern`, `options`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options` | [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:187

___

### unsubscribeUserFile

▸ **unsubscribeUserFile**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `pattern` | `string` \| `string`[] |
| `options?` | ``null`` \| [`CallOptions`](../interfaces/internal_.CallOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:172

___

### validateMetaObject

▸ **validateMetaObject**(`id`): `Promise`\<`void`\>

Checks if given ID is a meta-object, else throws error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | to check |

#### Returns

`Promise`\<`void`\>

**`Throws`**

Error if id is invalid

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:81

___

### writeFile

▸ **writeFile**(`id`, `name`, `data`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `data` | `any` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:109

▸ **writeFile**(`id`, `name`, `data`, `options?`, `callback?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `data` | `any` |
| `options?` | ``null`` \| [`WriteFileOptions`](../interfaces/internal_.WriteFileOptions.md) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:110

___

### writeFileAsync

▸ **writeFileAsync**(`id`, `name`, `data`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `data` | `any` |
| `options?` | ``null`` \| [`WriteFileOptions`](../interfaces/internal_.WriteFileOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

db-objects-redis/build/cjs/lib/objects/objectsInRedisClient.d.ts:111
