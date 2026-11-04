[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / FileObject

# Interface: FileObject

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:48

Metadata of a stored file

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:60

Evaluated access control list of the file

***

### binary?

> `optional` **binary?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:68

Whether the file content is binary

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:58

Timestamp (ms) when the file was created

***

### isDir?

> `optional` **isDir?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:62

Whether the entry is a directory

***

### mimeType?

> `optional` **mimeType?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:66

The mime type of the file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:56

Timestamp (ms) when the file was last modified

***

### notExists?

> `optional` **notExists?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:64

Whether the file does not exist (yet)

***

### stats?

> `optional` **stats?**: `object`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:52

File system stats of the file

#### size?

> `optional` **size?**: `number`

***

### virtualFile?

> `optional` **virtualFile?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:50

Whether this is a virtual file (a directory placeholder)
