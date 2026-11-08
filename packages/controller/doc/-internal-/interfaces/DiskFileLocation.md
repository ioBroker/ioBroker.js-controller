[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DiskFileLocation

# Interface: DiskFileLocation

Defined in: common/build/esm/lib/common/diskFiles.d.ts:7

The parts of an `iobdisk://` URL

## Properties

### host

> **host**: `string`

Defined in: common/build/esm/lib/common/diskFiles.d.ts:9

Name of the host on whose disk the file is

***

### namespace

> **namespace**: `string`

Defined in: common/build/esm/lib/common/diskFiles.d.ts:11

Namespace of the instance whose data directory holds the file, e.g. `telegram.0`

***

### path

> **path**: `string`

Defined in: common/build/esm/lib/common/diskFiles.d.ts:13

Path below the data directory of the instance, with `/` as separator, e.g. `video/1.mp4`
