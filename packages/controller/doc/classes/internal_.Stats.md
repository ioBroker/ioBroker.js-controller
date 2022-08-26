[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Stats

# Class: Stats

[<internal>](../modules/internal_.md).Stats

## Hierarchy

- [`StatsBase`](../interfaces/internal_.StatsBase.md)<`number`\>

  ↳ **`Stats`**

## Table of contents

### Constructors

- [constructor](internal_.Stats.md#constructor)

### Properties

- [atime](internal_.Stats.md#atime)
- [atimeMs](internal_.Stats.md#atimems)
- [birthtime](internal_.Stats.md#birthtime)
- [birthtimeMs](internal_.Stats.md#birthtimems)
- [blksize](internal_.Stats.md#blksize)
- [blocks](internal_.Stats.md#blocks)
- [ctime](internal_.Stats.md#ctime)
- [ctimeMs](internal_.Stats.md#ctimems)
- [dev](internal_.Stats.md#dev)
- [gid](internal_.Stats.md#gid)
- [ino](internal_.Stats.md#ino)
- [mode](internal_.Stats.md#mode)
- [mtime](internal_.Stats.md#mtime)
- [mtimeMs](internal_.Stats.md#mtimems)
- [nlink](internal_.Stats.md#nlink)
- [rdev](internal_.Stats.md#rdev)
- [size](internal_.Stats.md#size)
- [uid](internal_.Stats.md#uid)

### Methods

- [isBlockDevice](internal_.Stats.md#isblockdevice)
- [isCharacterDevice](internal_.Stats.md#ischaracterdevice)
- [isDirectory](internal_.Stats.md#isdirectory)
- [isFIFO](internal_.Stats.md#isfifo)
- [isFile](internal_.Stats.md#isfile)
- [isSocket](internal_.Stats.md#issocket)
- [isSymbolicLink](internal_.Stats.md#issymboliclink)

## Constructors

### constructor

• **new Stats**()

#### Inherited from

StatsBase<number\>.constructor

## Properties

### atime

• **atime**: `Date`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[atime](../interfaces/internal_.StatsBase.md#atime)

#### Defined in

node_modules/@types/node/fs.d.ts:67

___

### atimeMs

• **atimeMs**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[atimeMs](../interfaces/internal_.StatsBase.md#atimems)

#### Defined in

node_modules/@types/node/fs.d.ts:63

___

### birthtime

• **birthtime**: `Date`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[birthtime](../interfaces/internal_.StatsBase.md#birthtime)

#### Defined in

node_modules/@types/node/fs.d.ts:70

___

### birthtimeMs

• **birthtimeMs**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[birthtimeMs](../interfaces/internal_.StatsBase.md#birthtimems)

#### Defined in

node_modules/@types/node/fs.d.ts:66

___

### blksize

• **blksize**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[blksize](../interfaces/internal_.StatsBase.md#blksize)

#### Defined in

node_modules/@types/node/fs.d.ts:61

___

### blocks

• **blocks**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[blocks](../interfaces/internal_.StatsBase.md#blocks)

#### Defined in

node_modules/@types/node/fs.d.ts:62

___

### ctime

• **ctime**: `Date`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[ctime](../interfaces/internal_.StatsBase.md#ctime)

#### Defined in

node_modules/@types/node/fs.d.ts:69

___

### ctimeMs

• **ctimeMs**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[ctimeMs](../interfaces/internal_.StatsBase.md#ctimems)

#### Defined in

node_modules/@types/node/fs.d.ts:65

___

### dev

• **dev**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[dev](../interfaces/internal_.StatsBase.md#dev)

#### Defined in

node_modules/@types/node/fs.d.ts:53

___

### gid

• **gid**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[gid](../interfaces/internal_.StatsBase.md#gid)

#### Defined in

node_modules/@types/node/fs.d.ts:58

___

### ino

• **ino**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[ino](../interfaces/internal_.StatsBase.md#ino)

#### Defined in

node_modules/@types/node/fs.d.ts:54

___

### mode

• **mode**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[mode](../interfaces/internal_.StatsBase.md#mode)

#### Defined in

node_modules/@types/node/fs.d.ts:55

___

### mtime

• **mtime**: `Date`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[mtime](../interfaces/internal_.StatsBase.md#mtime)

#### Defined in

node_modules/@types/node/fs.d.ts:68

___

### mtimeMs

• **mtimeMs**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[mtimeMs](../interfaces/internal_.StatsBase.md#mtimems)

#### Defined in

node_modules/@types/node/fs.d.ts:64

___

### nlink

• **nlink**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[nlink](../interfaces/internal_.StatsBase.md#nlink)

#### Defined in

node_modules/@types/node/fs.d.ts:56

___

### rdev

• **rdev**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[rdev](../interfaces/internal_.StatsBase.md#rdev)

#### Defined in

node_modules/@types/node/fs.d.ts:59

___

### size

• **size**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[size](../interfaces/internal_.StatsBase.md#size)

#### Defined in

node_modules/@types/node/fs.d.ts:60

___

### uid

• **uid**: `number`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[uid](../interfaces/internal_.StatsBase.md#uid)

#### Defined in

node_modules/@types/node/fs.d.ts:57

## Methods

### isBlockDevice

▸ **isBlockDevice**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[isBlockDevice](../interfaces/internal_.StatsBase.md#isblockdevice)

#### Defined in

node_modules/@types/node/fs.d.ts:48

___

### isCharacterDevice

▸ **isCharacterDevice**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[isCharacterDevice](../interfaces/internal_.StatsBase.md#ischaracterdevice)

#### Defined in

node_modules/@types/node/fs.d.ts:49

___

### isDirectory

▸ **isDirectory**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[isDirectory](../interfaces/internal_.StatsBase.md#isdirectory)

#### Defined in

node_modules/@types/node/fs.d.ts:47

___

### isFIFO

▸ **isFIFO**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[isFIFO](../interfaces/internal_.StatsBase.md#isfifo)

#### Defined in

node_modules/@types/node/fs.d.ts:51

___

### isFile

▸ **isFile**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[isFile](../interfaces/internal_.StatsBase.md#isfile)

#### Defined in

node_modules/@types/node/fs.d.ts:46

___

### isSocket

▸ **isSocket**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[isSocket](../interfaces/internal_.StatsBase.md#issocket)

#### Defined in

node_modules/@types/node/fs.d.ts:52

___

### isSymbolicLink

▸ **isSymbolicLink**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[StatsBase](../interfaces/internal_.StatsBase.md).[isSymbolicLink](../interfaces/internal_.StatsBase.md#issymboliclink)

#### Defined in

node_modules/@types/node/fs.d.ts:50
