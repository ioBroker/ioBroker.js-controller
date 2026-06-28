[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / FileObject

# Interface: FileObject

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:42

Metadata of a stored file

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:54

Evaluated access control list of the file

***

### binary?

> `optional` **binary?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:58

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:52

Timestamp (ms) when the file was created

***

### isDir?

> `optional` **isDir?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:55

***

### mimeType?

> `optional` **mimeType?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:57

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:50

Timestamp (ms) when the file was last modified

***

### notExists?

> `optional` **notExists?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:56

***

### stats?

> `optional` **stats?**: `object`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:46

File system stats of the file

#### size?

> `optional` **size?**: `number`

***

### virtualFile?

> `optional` **virtualFile?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:44

Whether this is a virtual file (a directory placeholder)
