[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / AdapterClass

# Class: AdapterClass

## Hierarchy

- `EventEmitter`

  ↳ **`AdapterClass`**

## Table of contents

### Constructors

- [constructor](AdapterClass.md#constructor)

### Properties

- [FORBIDDEN\_CHARS](AdapterClass.md#forbidden_chars)
- [adapterConfig](AdapterClass.md#adapterconfig)
- [adapterDir](AdapterClass.md#adapterdir)
- [adapterReady](AdapterClass.md#adapterready)
- [common](AdapterClass.md#common)
- [config](AdapterClass.md#config)
- [connected](AdapterClass.md#connected)
- [dateFormat](AdapterClass.md#dateformat)
- [host](AdapterClass.md#host)
- [instance](AdapterClass.md#instance)
- [ioPack](AdapterClass.md#iopack)
- [isFloatComma](AdapterClass.md#isfloatcomma)
- [kill](AdapterClass.md#kill)
- [language](AdapterClass.md#language)
- [latitude](AdapterClass.md#latitude)
- [log](AdapterClass.md#log)
- [longitude](AdapterClass.md#longitude)
- [name](AdapterClass.md#name)
- [namespace](AdapterClass.md#namespace)
- [oObjects](AdapterClass.md#oobjects)
- [oStates](AdapterClass.md#ostates)
- [pack](AdapterClass.md#pack)
- [processLog](AdapterClass.md#processlog)
- [requireLog](AdapterClass.md#requirelog)
- [stop](AdapterClass.md#stop)
- [systemConfig](AdapterClass.md#systemconfig)
- [version](AdapterClass.md#version)
- [captureRejectionSymbol](AdapterClass.md#capturerejectionsymbol)
- [captureRejections](AdapterClass.md#capturerejections)
- [defaultMaxListeners](AdapterClass.md#defaultmaxlisteners)
- [errorMonitor](AdapterClass.md#errormonitor)

### Methods

- [\_delForeignState](AdapterClass.md#_delforeignstate)
- [\_delState](AdapterClass.md#_delstate)
- [addChannelToEnum](AdapterClass.md#addchanneltoenum)
- [addChannelToEnumAsync](AdapterClass.md#addchanneltoenumasync)
- [addListener](AdapterClass.md#addlistener)
- [addStateToEnum](AdapterClass.md#addstatetoenum)
- [addStateToEnumAsync](AdapterClass.md#addstatetoenumasync)
- [calculatePermissions](AdapterClass.md#calculatepermissions)
- [calculatePermissionsAsync](AdapterClass.md#calculatepermissionsasync)
- [checkGroup](AdapterClass.md#checkgroup)
- [checkGroupAsync](AdapterClass.md#checkgroupasync)
- [checkPassword](AdapterClass.md#checkpassword)
- [checkPasswordAsync](AdapterClass.md#checkpasswordasync)
- [chmodFile](AdapterClass.md#chmodfile)
- [chmodFileAsync](AdapterClass.md#chmodfileasync)
- [chownFile](AdapterClass.md#chownfile)
- [chownFileAsync](AdapterClass.md#chownfileasync)
- [clearInterval](AdapterClass.md#clearinterval)
- [clearTimeout](AdapterClass.md#cleartimeout)
- [createChannel](AdapterClass.md#createchannel)
- [createChannelAsync](AdapterClass.md#createchannelasync)
- [createDevice](AdapterClass.md#createdevice)
- [createDeviceAsync](AdapterClass.md#createdeviceasync)
- [createState](AdapterClass.md#createstate)
- [createStateAsync](AdapterClass.md#createstateasync)
- [decrypt](AdapterClass.md#decrypt)
- [delBinaryState](AdapterClass.md#delbinarystate)
- [delBinaryStateAsync](AdapterClass.md#delbinarystateasync)
- [delFile](AdapterClass.md#delfile)
- [delFileAsync](AdapterClass.md#delfileasync)
- [delForeignBinaryState](AdapterClass.md#delforeignbinarystate)
- [delForeignBinaryStateAsync](AdapterClass.md#delforeignbinarystateasync)
- [delForeignObject](AdapterClass.md#delforeignobject)
- [delForeignObjectAsync](AdapterClass.md#delforeignobjectasync)
- [delForeignState](AdapterClass.md#delforeignstate)
- [delForeignStateAsync](AdapterClass.md#delforeignstateasync)
- [delObject](AdapterClass.md#delobject)
- [delObjectAsync](AdapterClass.md#delobjectasync)
- [delState](AdapterClass.md#delstate)
- [delStateAsync](AdapterClass.md#delstateasync)
- [delay](AdapterClass.md#delay)
- [deleteChannel](AdapterClass.md#deletechannel)
- [deleteChannelAsync](AdapterClass.md#deletechannelasync)
- [deleteChannelFromEnum](AdapterClass.md#deletechannelfromenum)
- [deleteChannelFromEnumAsync](AdapterClass.md#deletechannelfromenumasync)
- [deleteDevice](AdapterClass.md#deletedevice)
- [deleteDeviceAsync](AdapterClass.md#deletedeviceasync)
- [deleteState](AdapterClass.md#deletestate)
- [deleteStateAsync](AdapterClass.md#deletestateasync)
- [deleteStateFromEnum](AdapterClass.md#deletestatefromenum)
- [deleteStateFromEnumAsync](AdapterClass.md#deletestatefromenumasync)
- [destroySession](AdapterClass.md#destroysession)
- [disable](AdapterClass.md#disable)
- [emit](AdapterClass.md#emit)
- [encrypt](AdapterClass.md#encrypt)
- [eventNames](AdapterClass.md#eventnames)
- [extendForeignObject](AdapterClass.md#extendforeignobject)
- [extendForeignObjectAsync](AdapterClass.md#extendforeignobjectasync)
- [extendObject](AdapterClass.md#extendobject)
- [extendObjectAsync](AdapterClass.md#extendobjectasync)
- [fileExists](AdapterClass.md#fileexists)
- [fileExistsAsync](AdapterClass.md#fileexistsasync)
- [findForeignObject](AdapterClass.md#findforeignobject)
- [findForeignObjectAsync](AdapterClass.md#findforeignobjectasync)
- [formatDate](AdapterClass.md#formatdate)
- [formatValue](AdapterClass.md#formatvalue)
- [getAdapterObjects](AdapterClass.md#getadapterobjects)
- [getAdapterObjectsAsync](AdapterClass.md#getadapterobjectsasync)
- [getBinaryState](AdapterClass.md#getbinarystate)
- [getBinaryStateAsync](AdapterClass.md#getbinarystateasync)
- [getCertificates](AdapterClass.md#getcertificates)
- [getCertificatesAsync](AdapterClass.md#getcertificatesasync)
- [getChannels](AdapterClass.md#getchannels)
- [getChannelsAsync](AdapterClass.md#getchannelsasync)
- [getChannelsOf](AdapterClass.md#getchannelsof)
- [getChannelsOfAsync](AdapterClass.md#getchannelsofasync)
- [getDevices](AdapterClass.md#getdevices)
- [getDevicesAsync](AdapterClass.md#getdevicesasync)
- [getEncryptedConfig](AdapterClass.md#getencryptedconfig)
- [getEnum](AdapterClass.md#getenum)
- [getEnumAsync](AdapterClass.md#getenumasync)
- [getEnums](AdapterClass.md#getenums)
- [getEnumsAsync](AdapterClass.md#getenumsasync)
- [getForeignBinaryState](AdapterClass.md#getforeignbinarystate)
- [getForeignBinaryStateAsync](AdapterClass.md#getforeignbinarystateasync)
- [getForeignObject](AdapterClass.md#getforeignobject)
- [getForeignObjectAsync](AdapterClass.md#getforeignobjectasync)
- [getForeignObjects](AdapterClass.md#getforeignobjects)
- [getForeignObjectsAsync](AdapterClass.md#getforeignobjectsasync)
- [getForeignState](AdapterClass.md#getforeignstate)
- [getForeignStateAsync](AdapterClass.md#getforeignstateasync)
- [getForeignStates](AdapterClass.md#getforeignstates)
- [getForeignStatesAsync](AdapterClass.md#getforeignstatesasync)
- [getHistory](AdapterClass.md#gethistory)
- [getHistoryAsync](AdapterClass.md#gethistoryasync)
- [getMaxListeners](AdapterClass.md#getmaxlisteners)
- [getObject](AdapterClass.md#getobject)
- [getObjectAsync](AdapterClass.md#getobjectasync)
- [getObjectList](AdapterClass.md#getobjectlist)
- [getObjectListAsync](AdapterClass.md#getobjectlistasync)
- [getObjectView](AdapterClass.md#getobjectview)
- [getObjectViewAsync](AdapterClass.md#getobjectviewasync)
- [getPluginConfig](AdapterClass.md#getpluginconfig)
- [getPluginInstance](AdapterClass.md#getplugininstance)
- [getPort](AdapterClass.md#getport)
- [getPortAsync](AdapterClass.md#getportasync)
- [getSession](AdapterClass.md#getsession)
- [getState](AdapterClass.md#getstate)
- [getStateAsync](AdapterClass.md#getstateasync)
- [getStates](AdapterClass.md#getstates)
- [getStatesAsync](AdapterClass.md#getstatesasync)
- [getStatesOf](AdapterClass.md#getstatesof)
- [getStatesOfAsync](AdapterClass.md#getstatesofasync)
- [getSuitableLicenses](AdapterClass.md#getsuitablelicenses)
- [getUserID](AdapterClass.md#getuserid)
- [idToDCS](AdapterClass.md#idtodcs)
- [listenerCount](AdapterClass.md#listenercount)
- [listeners](AdapterClass.md#listeners)
- [mkdir](AdapterClass.md#mkdir)
- [mkdirAsync](AdapterClass.md#mkdirasync)
- [off](AdapterClass.md#off)
- [on](AdapterClass.md#on)
- [once](AdapterClass.md#once)
- [prependListener](AdapterClass.md#prependlistener)
- [prependOnceListener](AdapterClass.md#prependoncelistener)
- [rawListeners](AdapterClass.md#rawlisteners)
- [readDir](AdapterClass.md#readdir)
- [readDirAsync](AdapterClass.md#readdirasync)
- [readFile](AdapterClass.md#readfile)
- [readFileAsync](AdapterClass.md#readfileasync)
- [registerNotification](AdapterClass.md#registernotification)
- [removeAllListeners](AdapterClass.md#removealllisteners)
- [removeListener](AdapterClass.md#removelistener)
- [rename](AdapterClass.md#rename)
- [renameAsync](AdapterClass.md#renameasync)
- [restart](AdapterClass.md#restart)
- [sendTo](AdapterClass.md#sendto)
- [sendToAsync](AdapterClass.md#sendtoasync)
- [sendToHost](AdapterClass.md#sendtohost)
- [sendToHostAsync](AdapterClass.md#sendtohostasync)
- [setBinaryState](AdapterClass.md#setbinarystate)
- [setBinaryStateAsync](AdapterClass.md#setbinarystateasync)
- [setExecutableCapabilities](AdapterClass.md#setexecutablecapabilities)
- [setForeignBinaryState](AdapterClass.md#setforeignbinarystate)
- [setForeignBinaryStateAsync](AdapterClass.md#setforeignbinarystateasync)
- [setForeignObject](AdapterClass.md#setforeignobject)
- [setForeignObjectAsync](AdapterClass.md#setforeignobjectasync)
- [setForeignObjectNotExists](AdapterClass.md#setforeignobjectnotexists)
- [setForeignObjectNotExistsAsync](AdapterClass.md#setforeignobjectnotexistsasync)
- [setForeignState](AdapterClass.md#setforeignstate)
- [setForeignStateAsync](AdapterClass.md#setforeignstateasync)
- [setForeignStateChanged](AdapterClass.md#setforeignstatechanged)
- [setForeignStateChangedAsync](AdapterClass.md#setforeignstatechangedasync)
- [setInterval](AdapterClass.md#setinterval)
- [setMaxListeners](AdapterClass.md#setmaxlisteners)
- [setObject](AdapterClass.md#setobject)
- [setObjectAsync](AdapterClass.md#setobjectasync)
- [setObjectNotExists](AdapterClass.md#setobjectnotexists)
- [setObjectNotExistsAsync](AdapterClass.md#setobjectnotexistsasync)
- [setPassword](AdapterClass.md#setpassword)
- [setPasswordAsync](AdapterClass.md#setpasswordasync)
- [setSession](AdapterClass.md#setsession)
- [setState](AdapterClass.md#setstate)
- [setStateAsync](AdapterClass.md#setstateasync)
- [setStateChanged](AdapterClass.md#setstatechanged)
- [setStateChangedAsync](AdapterClass.md#setstatechangedasync)
- [setTimeout](AdapterClass.md#settimeout)
- [subscribeForeignFiles](AdapterClass.md#subscribeforeignfiles)
- [subscribeForeignObjects](AdapterClass.md#subscribeforeignobjects)
- [subscribeForeignObjectsAsync](AdapterClass.md#subscribeforeignobjectsasync)
- [subscribeForeignStates](AdapterClass.md#subscribeforeignstates)
- [subscribeForeignStatesAsync](AdapterClass.md#subscribeforeignstatesasync)
- [subscribeObjects](AdapterClass.md#subscribeobjects)
- [subscribeObjectsAsync](AdapterClass.md#subscribeobjectsasync)
- [subscribeStates](AdapterClass.md#subscribestates)
- [subscribeStatesAsync](AdapterClass.md#subscribestatesasync)
- [supportsFeature](AdapterClass.md#supportsfeature)
- [terminate](AdapterClass.md#terminate)
- [unlink](AdapterClass.md#unlink)
- [unlinkAsync](AdapterClass.md#unlinkasync)
- [unsubscribeForeignFiles](AdapterClass.md#unsubscribeforeignfiles)
- [unsubscribeForeignObjects](AdapterClass.md#unsubscribeforeignobjects)
- [unsubscribeForeignObjectsAsync](AdapterClass.md#unsubscribeforeignobjectsasync)
- [unsubscribeForeignStates](AdapterClass.md#unsubscribeforeignstates)
- [unsubscribeForeignStatesAsync](AdapterClass.md#unsubscribeforeignstatesasync)
- [unsubscribeObjects](AdapterClass.md#unsubscribeobjects)
- [unsubscribeObjectsAsync](AdapterClass.md#unsubscribeobjectsasync)
- [unsubscribeStates](AdapterClass.md#unsubscribestates)
- [unsubscribeStatesAsync](AdapterClass.md#unsubscribestatesasync)
- [updateConfig](AdapterClass.md#updateconfig)
- [writeFile](AdapterClass.md#writefile)
- [writeFileAsync](AdapterClass.md#writefileasync)
- [getEventListeners](AdapterClass.md#geteventlisteners)
- [listenerCount](AdapterClass.md#listenercount-1)
- [on](AdapterClass.md#on-1)
- [once](AdapterClass.md#once-1)

## Constructors

### constructor

• **new AdapterClass**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `AdapterOptions` |

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L654)

## Properties

### FORBIDDEN\_CHARS

• `Protected` `Readonly` **FORBIDDEN\_CHARS**: `RegExp` = `FORBIDDEN_CHARS`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L598)

___

### adapterConfig

• `Protected` `Optional` **adapterConfig**: ``null`` \| `AdapterConfig`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L616)

___

### adapterDir

• `Protected` **adapterDir**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L618)

___

### adapterReady

• `Protected` **adapterReady**: `boolean` = `false`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L565)

___

### common

• `Protected` `Optional` **common**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L641)

___

### config

• `Protected` `Optional` **config**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L639)

___

### connected

• `Protected` `Optional` **connected**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L617)

___

### dateFormat

• `Protected` `Optional` **dateFormat**: `any`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:628](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L628)

___

### host

• `Protected` `Optional` **host**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L640)

___

### instance

• `Protected` `Optional` **instance**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L612)

___

### ioPack

• `Protected` **ioPack**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:622](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L622)

___

### isFloatComma

• `Protected` `Optional` **isFloatComma**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L630)

___

### kill

• `Protected` `Optional` **kill**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L645)

___

### language

• `Protected` `Optional` **language**: `Languages`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:632](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L632)

___

### latitude

• `Protected` `Optional` **latitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L636)

___

### log

• `Protected` `Optional` **log**: `Log`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:584](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L584)

___

### longitude

• `Protected` `Optional` **longitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L634)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L591)

___

### namespace

• `Protected` **namespace**: \`${string}.${number}\`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L590)

___

### oObjects

• `Protected` `Optional` **oObjects**: `Record`<`string`, `undefined` \| `Object`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L577)

___

### oStates

• `Protected` `Optional` **oStates**: `Record`<`string`, `undefined` \| `State`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:572](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L572)

___

### pack

• `Protected` `Optional` **pack**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L620)

___

### processLog

• `Protected` `Optional` **processLog**: (`msg`: `any`) => `void`

#### Type declaration

▸ (`msg`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

##### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L646)

___

### requireLog

• `Protected` `Optional` **requireLog**: (`_isActive`: `boolean`) => `void`

#### Type declaration

▸ (`_isActive`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_isActive` | `boolean` |

##### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L647)

___

### stop

• `Protected` `Optional` **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L643)

___

### systemConfig

• `Protected` `Optional` **systemConfig**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:626](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L626)

___

### version

• `Protected` `Optional` **version**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L644)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](AdapterClass.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](AdapterClass.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:272

## Methods

### \_delForeignState

▸ **_delForeignState**(`_options`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_options` | `InternalDelStateOptions` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8962](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8962)

___

### \_delState

▸ **_delState**(`_options`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_options` | `InternalDelStateOptions` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8918](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8918)

___

### addChannelToEnum

▸ **addChannelToEnum**(`enumName`, `addTo`, `parentDevice`, `channelName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `addTo` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5246](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5246)

▸ **addChannelToEnum**(`enumName`, `addTo`, `parentDevice`, `channelName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `addTo` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `options` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5253](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5253)

___

### addChannelToEnumAsync

▸ **addChannelToEnumAsync**(`enumName`, `addTo`, `parentDevice`, `channelName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `addTo` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L180)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:299

___

### addStateToEnum

▸ **addStateToEnum**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `addTo` | `string` |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5931](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5931)

▸ **addStateToEnum**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `addTo` | `string` |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5939](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5939)

___

### addStateToEnumAsync

▸ **addStateToEnumAsync**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `addTo` | `string` |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:197](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L197)

___

### calculatePermissions

▸ **calculatePermissions**(`user`, `commandsPermissions`, `options?`, `callback?`): `Promise`<`void` \| `PermissionSet`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `commandsPermissions` | `CommandsPermissions` |  |
| `options?` | `Record`<`string`, `any`\> | - |
| `callback?` | `CalculatePermissionsCallback` | - |

#### Returns

`Promise`<`void` \| `PermissionSet`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1809](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1809)

___

### calculatePermissionsAsync

▸ **calculatePermissionsAsync**(`user`, `commandsPermissions`, `options?`): `Promise`<`PermissionSet`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `commandsPermissions` | `CommandsPermissions` |
| `options?` | `unknown` |

#### Returns

`Promise`<`PermissionSet`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:287](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L287)

___

### checkGroup

▸ **checkGroup**(`user`, `group`, `options?`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `group` | `string` |  |
| `options?` | `Record`<`string`, `any`\> | - |
| `callback?` | `CheckGroupCallback` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1722](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1722)

___

### checkGroupAsync

▸ **checkGroupAsync**(`user`, `group`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `group` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:285](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L285)

___

### checkPassword

▸ **checkPassword**(`user`, `pw`, `options?`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `options?` | `Record`<`string`, `any`\> | - |
| `callback?` | `CheckPasswordCallback` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1487](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1487)

___

### checkPasswordAsync

▸ **checkPasswordAsync**(`user`, `password`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `password` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:281](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L281)

___

### chmodFile

▸ **chmodFile**(`adapter`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` |  |
| `options` | `Record`<`string`, `any`\> \| { `mode`: `string` \| `number`  } |  |
| `callback` | `ChownFileCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6209](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6209)

___

### chmodFileAsync

▸ **chmodFileAsync**(`adapter`, `path`, `options`): `Promise`<{ `entries`: `ChownFileResult`[] ; `id`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapter` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `Record`<`string`, `any`\> \| { `mode`: `string` \| `number`  } |

#### Returns

`Promise`<{ `entries`: `ChownFileResult`[] ; `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L213)

___

### chownFile

▸ **chownFile**(`_adapter`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` |  |
| `path` | `string` |  |
| `options` | `unknown` |  |
| `callback` | (`err?`: ``null`` \| `Error`, `processedFiles?`: `any`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6254](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6254)

___

### chownFileAsync

▸ **chownFileAsync**(...`args`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L219)

___

### clearInterval

▸ **clearInterval**(`interval`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | `Timeout` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2532](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2532)

___

### clearTimeout

▸ **clearTimeout**(`timer`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timer` | `Timeout` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2455](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2455)

___

### createChannel

▸ **createChannel**(`parentDevice`, `channelName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4887](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4887)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`ChannelCommon`\> |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4888](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4888)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`ChannelCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4894](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4894)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`ChannelCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4901](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4901)

___

### createChannelAsync

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon?` | `string` \| `Partial`<`ChannelCommon`\> |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:454](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L454)

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`ChannelCommon`\> |
| `native?` | `Record`<`string`, `any`\> |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L459)

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`ChannelCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L465)

___

### createDevice

▸ **createDevice**(`deviceName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4813](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4813)

▸ **createDevice**(`deviceName`, `common`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<`DeviceCommon`\> |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4814](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4814)

▸ **createDevice**(`deviceName`, `common`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<`DeviceCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4819](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4819)

▸ **createDevice**(`deviceName`, `common`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<`DeviceCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4825](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4825)

___

### createDeviceAsync

▸ **createDeviceAsync**(`deviceName`, `common?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common?` | `Partial`<`DeviceCommon`\> |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L433)

▸ **createDeviceAsync**(`deviceName`, `common`, `native?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<`DeviceCommon`\> |
| `native?` | `Record`<`string`, `any`\> |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L434)

▸ **createDeviceAsync**(`deviceName`, `common`, `native`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<`DeviceCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L439)

___

### createState

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4972](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4972)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`StateCommon`\> |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4978](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4978)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`StateCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4985](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4985)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`StateCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | `SetObjectCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4993](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4993)

___

### createStateAsync

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon?` | `string` \| `Partial`<`StateCommon`\> |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L476)

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`StateCommon`\> |
| `native?` | `Record`<`string`, `any`\> |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L482)

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<`StateCommon`\> |
| `native` | `Record`<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L489)

___

### decrypt

▸ **decrypt**(`secretVal`, `value?`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretVal` | `string` |  |
| `value?` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1185)

▸ **decrypt**(`value`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1186](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1186)

___

### delBinaryState

▸ **delBinaryState**(`id`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10165](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10165)

▸ **delBinaryState**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10166](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10166)

___

### delBinaryStateAsync

▸ **delBinaryStateAsync**(`id`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L273)

___

### delFile

▸ **delFile**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L371)

▸ **delFile**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `unknown` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L372)

___

### delFileAsync

▸ **delFileAsync**(`adapterName`, `path`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L225)

___

### delForeignBinaryState

▸ **delForeignBinaryState**(`id`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10106](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10106)

▸ **delForeignBinaryState**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10107](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10107)

___

### delForeignBinaryStateAsync

▸ **delForeignBinaryStateAsync**(`id`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L267)

___

### delForeignObject

▸ **delForeignObject**(`id`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4257](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4257)

▸ **delForeignObject**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `DelObjectOptions` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4258](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4258)

___

### delForeignObjectAsync

▸ **delForeignObjectAsync**(`id`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `DelObjectOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:158](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L158)

___

### delForeignState

▸ **delForeignState**(`id`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8934](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8934)

▸ **delForeignState**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8935](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8935)

___

### delForeignStateAsync

▸ **delForeignStateAsync**(`id`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:239](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L239)

___

### delObject

▸ **delObject**(`id`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4197](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4197)

▸ **delObject**(`id`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options?` | ``null`` \| `DelObjectOptions` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4198](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4198)

___

### delObjectAsync

▸ **delObjectAsync**(`id`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `DelObjectOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:156](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L156)

___

### delState

▸ **delState**(`id`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8887](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8887)

▸ **delState**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8888](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8888)

___

### delStateAsync

▸ **delStateAsync**(`id`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:237](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L237)

___

### delay

▸ **delay**(`timeout`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout` | `number` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2470](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2470)

___

### deleteChannel

▸ **deleteChannel**(`channelName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` |  |
| `options?` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5494](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5494)

▸ **deleteChannel**(`parentDevice`, `channelName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentDevice` | `string` |  |
| `channelName` | `string` |  |
| `options?` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5495](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5495)

___

### deleteChannelAsync

▸ **deleteChannelAsync**(`channelName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:501](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L501)

▸ **deleteChannelAsync**(`parentDevice`, `channelName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L502)

___

### deleteChannelFromEnum

▸ **deleteChannelFromEnum**(`enumName`, `parentDevice`, `channelName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5379](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5379)

▸ **deleteChannelFromEnum**(`enumName`, `parentDevice`, `channelName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `options` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5385](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5385)

___

### deleteChannelFromEnumAsync

▸ **deleteChannelFromEnumAsync**(`enumName`, `parentDevice`, `channelName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:187](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L187)

___

### deleteDevice

▸ **deleteDevice**(`deviceName`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5180](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5180)

▸ **deleteDevice**(`deviceName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5181](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5181)

___

### deleteDeviceAsync

▸ **deleteDeviceAsync**(`deviceName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L179)

___

### deleteState

▸ **deleteState**(`stateName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateName` | `string` |
| `options?` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5601](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5601)

▸ **deleteState**(`parentChannel`, `stateName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options?` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5602](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5602)

▸ **deleteState**(`parentDevice`, `parentChannel`, `stateName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options?` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5603](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5603)

___

### deleteStateAsync

▸ **deleteStateAsync**(`stateName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L507)

▸ **deleteStateAsync**(`parentChannel`, `stateName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L508)

▸ **deleteStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:509](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L509)

___

### deleteStateFromEnum

▸ **deleteStateFromEnum**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6078](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6078)

▸ **deleteStateFromEnum**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6085](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6085)

___

### deleteStateFromEnumAsync

▸ **deleteStateFromEnumAsync**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L205)

___

### destroySession

▸ **destroySession**(`id`, `callback?`): `VoidLikeCallback`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`VoidLikeCallback`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1270](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1270)

___

### disable

▸ **disable**(): `SetObjectPromise`

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2348](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2348)

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### encrypt

▸ **encrypt**(`secretVal`, `value?`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretVal` | `string` |  |
| `value?` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1205](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1205)

▸ **encrypt**(`value`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1206](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1206)

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### extendForeignObject

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `objPart` | `PartialObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3224](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3224)

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `options`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `objPart` | `PartialObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | - |
| `options` | `ExtendObjectOptions` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3229](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3229)

___

### extendForeignObjectAsync

▸ **extendForeignObjectAsync**<`T`\>(`id`, `objPart`, `options?`): `SetObjectPromise`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `objPart` | `PartialObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> |
| `options?` | `ExtendObjectOptions` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:128](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L128)

___

### extendObject

▸ **extendObject**(`id`, `objPart`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `objPart` | `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2847](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2847)

▸ **extendObject**(`id`, `objPart`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `objPart` | `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } | - |
| `options` | `ExtendObjectOptions` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2848](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2848)

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `objPart`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `objPart` | `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } |
| `options?` | `ExtendObjectOptions` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:114](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L114)

___

### fileExists

▸ **fileExists**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | `GenericCallback`<`boolean`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6567](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6567)

▸ **fileExists**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `unknown` |
| `callback` | `GenericCallback`<`boolean`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6568](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6568)

___

### fileExistsAsync

▸ **fileExistsAsync**(`adapterName`, `path`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:232](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L232)

___

### findForeignObject

▸ **findForeignObject**(`idOrName`, `type`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | `string` |  |
| `callback` | `FindObjectCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4076](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4076)

▸ **findForeignObject**(`idOrName`, `type`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | `string` |  |
| `options` | `unknown` |  |
| `callback` | `FindObjectCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4077](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4077)

___

### findForeignObjectAsync

▸ **findForeignObjectAsync**(`idOrName`, `type`): `Promise`<{ `id`: `string` ; `name`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrName` | `string` |
| `type` | `string` |

#### Returns

`Promise`<{ `id`: `string` ; `name`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:449](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L449)

___

### formatDate

▸ **formatDate**(`dateObj`, `format`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateObj` | `string` \| `number` \| `Date` |
| `format` | `string` |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6650](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6650)

▸ **formatDate**(`dateObj`, `isDuration`, `format`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateObj` | `string` \| `number` \| `Date` |
| `isDuration` | `string` \| `boolean` |
| `format` | `string` |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6651](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6651)

___

### formatValue

▸ **formatValue**(`value`, `format`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |
| `format` | `any` |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6615](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6615)

▸ **formatValue**(`value`, `decimals`, `format`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |
| `decimals` | `number` |
| `format` | `any` |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6616](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6616)

___

### getAdapterObjects

▸ **getAdapterObjects**(`callback`): `Promise`<`void` \| `Record`<`string`, `AdapterScopedObject`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`objects`: `Record`<`string`, `AdapterScopedObject`\>) => `void` |  |

#### Returns

`Promise`<`void` \| `Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2765](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2765)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Returns

`Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L303)

___

### getBinaryState

▸ **getBinaryState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | `GetBinaryStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10089](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10089)

▸ **getBinaryState**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` |  |
| `callback` | `GetBinaryStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10090](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10090)

___

### getBinaryStateAsync

▸ **getBinaryStateAsync**(`id`, `options?`): `GetBinaryStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetBinaryStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L265)

___

### getCertificates

▸ **getCertificates**(`publicName?`, `privateName?`, `chainedName?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicName?` | `string` | - |
| `privateName?` | `string` | - |
| `chainedName?` | `string` | - |
| `callback?` | `GetCertificatesCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2192](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2192)

___

### getCertificatesAsync

▸ **getCertificatesAsync**(...`args`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L301)

___

### getChannels

▸ **getChannels**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:521](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L521)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L522)

▸ **getChannels**(`parentDevice`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L523)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<`ChannelObject`[]\>

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L533)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L534)

___

### getChannelsOf

▸ **getChannelsOf**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5757](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5757)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5758](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5758)

▸ **getChannelsOf**(`parentDevice`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5759](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5759)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<`ChannelObject`[]\>

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:515](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L515)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L516)

___

### getDevices

▸ **getDevices**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `GetObjectsCallback3`<`DeviceObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5703](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5703)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`DeviceObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5704](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5704)

___

### getDevicesAsync

▸ **getDevicesAsync**(`options?`): `Promise`<`DeviceObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `unknown` |

#### Returns

`Promise`<`DeviceObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:195](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L195)

___

### getEncryptedConfig

▸ **getEncryptedConfig**(`attribute`, `callback?`): `Promise`<`string` \| `void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attribute` | `string` |  |
| `callback?` | `GetEncryptedConfigCallback` | - |

#### Returns

`Promise`<`string` \| `void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2365](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2365)

___

### getEnum

▸ **getEnum**(`callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `GetEnumCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3643](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3643)

▸ **getEnum**(`name`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `callback` | `GetEnumCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3644](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3644)

▸ **getEnum**(`name`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `options` | `unknown` | - |
| `callback` | `GetEnumCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3645](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3645)

___

### getEnumAsync

▸ **getEnumAsync**(`name`, `options?`): `Promise`<{ `requestEnum`: `string` ; `result`: `Record`<`string`, `any`\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<{ `requestEnum`: `string` ; `result`: `Record`<`string`, `any`\>  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L152)

___

### getEnums

▸ **getEnums**(`callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `GetEnumsCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3732](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3732)

▸ **getEnums**(`enumList`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `callback` | `GetEnumsCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3733](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3733)

▸ **getEnums**(`enumList`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `options` | `unknown` | - |
| `callback` | `GetEnumsCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3734](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3734)

___

### getEnumsAsync

▸ **getEnumsAsync**(`enumList`, `options?`): `GetEnumsPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumList` | `EnumList` |
| `options?` | `unknown` |

#### Returns

`GetEnumsPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L154)

___

### getForeignBinaryState

▸ **getForeignBinaryState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | `GetBinaryStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10015](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10015)

▸ **getForeignBinaryState**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` |  |
| `callback` | `GetBinaryStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10016](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10016)

___

### getForeignBinaryStateAsync

▸ **getForeignBinaryStateAsync**(`id`, `options?`): `GetBinaryStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetBinaryStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L260)

___

### getForeignObject

▸ **getForeignObject**<`T`\>(`id`, `callback`): `VoidLikeCallback`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `callback` | `GetObjectCallback`<`T`\> |  |

#### Returns

`VoidLikeCallback`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4130](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4130)

▸ **getForeignObject**<`T`\>(`id`, `options`, `callback`): `VoidLikeCallback`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `options` | `unknown` | - |
| `callback` | `GetObjectCallback`<`T`\> |  |

#### Returns

`VoidLikeCallback`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4131](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4131)

___

### getForeignObjectAsync

▸ **getForeignObjectAsync**<`T`\>(`id`, `options?`): `GetObjectPromise`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `options?` | `unknown` |

#### Returns

`GetObjectPromise`<`T`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L306)

___

### getForeignObjects

▸ **getForeignObjects**(`pattern`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback` | `GetObjectsCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3879](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3879)

▸ **getForeignObjects**(`pattern`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback` | `GetObjectsCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3880](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3880)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `type` | `T` |  |
| `callback` | `GetObjectsCallbackTyped`<`T`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3881](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3881)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `enums`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `type` | `T` |  |
| `enums` | `EnumList` |  |
| `callback` | `GetObjectsCallbackTyped`<`T`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3886](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3886)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `options`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `type` | `T` |  |
| `options` | `unknown` | - |
| `callback` | `GetObjectsCallbackTyped`<`T`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3892](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3892)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `enums`, `options`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `type` | `T` |  |
| `enums` | ``null`` \| `EnumList` |  |
| `options` | `unknown` | - |
| `callback` | `GetObjectsCallbackTyped`<`T`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3898](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3898)

___

### getForeignObjectsAsync

▸ **getForeignObjectsAsync**<`T`\>(`pattern`, `type`, `enums`, `options?`): `GetObjectsPromiseTyped`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `type` | `T` |
| `enums` | `EnumList` |
| `options?` | `unknown` |

#### Returns

`GetObjectsPromiseTyped`<`T`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L417)

▸ **getForeignObjectsAsync**<`T`\>(`pattern`, `type`, `options?`): `GetObjectsPromiseTyped`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `type` | `T` |
| `options?` | `unknown` |

#### Returns

`GetObjectsPromiseTyped`<`T`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:423](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L423)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): `GetObjectsPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetObjectsPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L428)

___

### getForeignState

▸ **getForeignState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | `GetStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8481](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8481)

▸ **getForeignState**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` |  |
| `callback` | `GetStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8482](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8482)

___

### getForeignStateAsync

▸ **getForeignStateAsync**(`id`, `options?`): `GetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L279)

___

### getForeignStates

▸ **getForeignStates**(`pattern`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] |  |
| `callback` | `GetStatesCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9119](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9119)

▸ **getForeignStates**(`pattern`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] |  |
| `options` | `unknown` |  |
| `callback` | `GetStatesCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9120](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9120)

___

### getForeignStatesAsync

▸ **getForeignStatesAsync**(`pattern`, `options?`): `GetStatesPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetStatesPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:243](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L243)

___

### getHistory

▸ **getHistory**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `GetHistoryOptions` |  |
| `callback` | `GetHistoryCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8760](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8760)

▸ **getHistory**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | `GetHistoryCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8761](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8761)

___

### getHistoryAsync

▸ **getHistoryAsync**(...`args`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L235)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### getObject

▸ **getObject**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | `GetObjectCallback`<`string`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3428](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3428)

▸ **getObject**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` | - |
| `callback` | `GetObjectCallback`<`string`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3429](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3429)

___

### getObjectAsync

▸ **getObjectAsync**(`id`, `options?`): `GetObjectPromise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetObjectPromise`<`string`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L134)

___

### getObjectList

▸ **getObjectList**(`params`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| `GetObjectViewParams` |  |
| `callback` | `GetObjectListCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3587](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3587)

▸ **getObjectList**(`params`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| `GetObjectViewParams` |  |
| `options` | `Record`<`string`, `any`\> \| { `sorted?`: `boolean`  } |  |
| `callback` | `GetObjectListCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3588](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3588)

___

### getObjectListAsync

▸ **getObjectListAsync**(`params`, `options?`): `GetObjectListPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | ``null`` \| `GetObjectViewParams` |
| `options?` | `Record`<`string`, `any`\> \| { `sorted?`: `boolean`  } |

#### Returns

`GetObjectListPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:147](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L147)

___

### getObjectView

▸ **getObjectView**<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` = `string` |
| `Search` | extends `string` = `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `design` | `Design` |  |
| `search` | `Search` |  |
| `params` | `undefined` \| ``null`` \| `GetObjectViewParams` |  |
| `callback` | `GetObjectViewCallback`<`InferGetObjectViewItemType`<`Design`, `Search`\>\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3471](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3471)

▸ **getObjectView**<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` = `string` |
| `Search` | extends `string` = `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `design` | `Design` |  |
| `search` | `Search` |  |
| `params` | `undefined` \| ``null`` \| `GetObjectViewParams` |  |
| `options` | `unknown` |  |
| `callback` | `GetObjectViewCallback`<`InferGetObjectViewItemType`<`Design`, `Search`\>\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3477](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3477)

___

### getObjectViewAsync

▸ **getObjectViewAsync**<`Design`, `Search`\>(`design`, `search`, `params`, `options?`): `GetObjectViewPromise`<`InferGetObjectViewItemType`<`Design`, `Search`\>\>

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
| `params` | `undefined` \| ``null`` \| `GetObjectViewParams` |
| `options?` | `unknown` |

#### Returns

`GetObjectViewPromise`<`InferGetObjectViewItemType`<`Design`, `Search`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:140](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L140)

___

### getPluginConfig

▸ **getPluginConfig**(`name`): ``null`` \| `Record`<`string`, `any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

``null`` \| `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10201](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10201)

___

### getPluginInstance

▸ **getPluginInstance**(`name`): ``null`` \| `Plugin`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

``null`` \| `Plugin`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10183](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10183)

___

### getPort

▸ **getPort**(`port`, `host?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` |  |
| `host?` | `string` | - |
| `callback?` | (`port`: `number`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1399](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1399)

▸ **getPort**(`port`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` |  |
| `callback?` | (`port`: `number`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1400](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1400)

___

### getPortAsync

▸ **getPortAsync**(`port`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `number` |

#### Returns

`Promise`<`number`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:277](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L277)

___

### getSession

▸ **getSession**(`id`, `callback`): `VoidLikeCallback`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback` | `GetSessionCallback` |

#### Returns

`VoidLikeCallback`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1226](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1226)

___

### getState

▸ **getState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | `GetStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8450](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8450)

▸ **getState**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` |  |
| `callback` | `GetStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8451](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8451)

___

### getStateAsync

▸ **getStateAsync**(`id`, `options?`): `GetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:164](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L164)

___

### getStates

▸ **getStates**(`pattern`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback` | `GetStatesCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8993](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8993)

▸ **getStates**(`pattern`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` |  |
| `callback` | `GetStatesCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8994](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8994)

___

### getStatesAsync

▸ **getStatesAsync**(`pattern`, `options?`): `GetStatesPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetStatesPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:241](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L241)

___

### getStatesOf

▸ **getStatesOf**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5826](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5826)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5827](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5827)

▸ **getStatesOf**(`parentDevice`, `parentChannel`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5828](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5828)

▸ **getStatesOf**(`parentDevice`, `parentChannel`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5833](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L5833)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<`StateObject`[]\>

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:541](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L541)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<`StateObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L542)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel`, `options?`): `Promise`<`StateObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L543)

___

### getSuitableLicenses

▸ **getSuitableLicenses**(`all`): `Promise`<`any`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `all` | `boolean` |  |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10247](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L10247)

___

### getUserID

▸ **getUserID**(`username`): `Promise`<`string` \| `void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` |  |

#### Returns

`Promise`<`string` \| `void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1587](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1587)

___

### idToDCS

▸ **idToDCS**(`id`): ``null`` \| { `channel`: `string` ; `device`: `string` ; `state`: `string`  }

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |

#### Returns

``null`` \| { `channel`: `string` ; `device`: `string` ; `state`: `string`  }

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8852](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8852)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |

#### Returns

`number`

#### Defined in

node_modules/@types/node/events.d.ts:561

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### mkdir

▸ **mkdir**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6426](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6426)

▸ **mkdir**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `unknown` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6427](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6427)

___

### mkdirAsync

▸ **mkdirAsync**(`adapterName`, `path`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L227)

___

### off

▸ **off**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:595

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### readDir

▸ **readDir**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` |  |
| `callback` | `ReadDirCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6300](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6300)

▸ **readDir**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` |  |
| `options` | `unknown` |  |
| `callback` | `ReadDirCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6301](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6301)

___

### readDirAsync

▸ **readDirAsync**(`adapterName`, `path`, `options?`): `ReadDirPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`ReadDirPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L221)

___

### readFile

▸ **readFile**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `callback` | `ReadFileCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6452](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6452)

▸ **readFile**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `options` | `unknown` |  |
| `callback` | `ReadFileCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6453](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6453)

___

### readFileAsync

▸ **readFileAsync**(`adapterName`, `path`, `options?`): `ReadFilePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`ReadFilePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L229)

___

### registerNotification

▸ **registerNotification**<`Scope`\>(`scope`, `category`, `message`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"system"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Scope` |  |
| `category` | ``null`` \| `NotificationScopes`[`Scope`] |  |
| `message` | `string` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7082](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7082)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### rename

▸ **rename**(`adapterName`, `oldName`, `newName`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `oldName` | `string` |
| `newName` | `string` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6392](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6392)

▸ **rename**(`adapterName`, `oldName`, `newName`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `oldName` | `string` |
| `newName` | `string` |
| `options` | `unknown` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6393](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6393)

___

### renameAsync

▸ **renameAsync**(`adapterName`, `oldName`, `newName`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `oldName` | `string` |
| `newName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L226)

___

### restart

▸ **restart**(): `void`

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2298](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2298)

___

### sendTo

▸ **sendTo**(`instanceName`, `message`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceName` | `string` |  |
| `message` | `MessagePayload` |  |
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6790](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6790)

▸ **sendTo**(`instanceName`, `command`, `message`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceName` | `string` |  |
| `command` | `string` |  |
| `message` | `MessagePayload` |  |
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6795](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6795)

___

### sendToAsync

▸ **sendToAsync**(`instanceName`, `message`): `Promise`<`undefined` \| `Message`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `message` | `MessagePayload` |

#### Returns

`Promise`<`undefined` \| `Message`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L361)

▸ **sendToAsync**(`instanceName`, `command`, `message`): `Promise`<`undefined` \| `Message`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `command` | `string` |
| `message` | `MessagePayload` |

#### Returns

`Promise`<`undefined` \| `Message`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L362)

___

### sendToHost

▸ **sendToHost**(`hostName`, `message`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` |  |
| `message` | `MessagePayload` |  |
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6949](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6949)

▸ **sendToHost**(`hostName`, `command`, `message`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` |  |
| `command` | `string` |  |
| `message` | `MessagePayload` |  |
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6954](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6954)

___

### sendToHostAsync

▸ **sendToHostAsync**(`hostName`, `message`): `Promise`<`undefined` \| `Message`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostName` | `string` |
| `message` | `MessagePayload` |

#### Returns

`Promise`<`undefined` \| `Message`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L351)

▸ **sendToHostAsync**(`hostName`, `command`, `message`): `Promise`<`undefined` \| `Message`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostName` | `string` |
| `command` | `string` |
| `message` | `MessagePayload` |

#### Returns

`Promise`<`undefined` \| `Message`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:352](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L352)

___

### setBinaryState

▸ **setBinaryState**(`id`, `binary`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `binary` | `Buffer` |  |
| `callback` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9996](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9996)

▸ **setBinaryState**(`id`, `binary`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `binary` | `Buffer` |  |
| `options` | `unknown` | - |
| `callback` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9997](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9997)

___

### setBinaryStateAsync

▸ **setBinaryStateAsync**(`id`, `binary`, `options?`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | `Buffer` |
| `options?` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L259)

___

### setExecutableCapabilities

▸ **setExecutableCapabilities**(`execPath`, `capabilities`, `modeEffective?`, `modePermitted?`, `modeInherited?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `execPath` | `string` |
| `capabilities` | `string`[] |
| `modeEffective?` | `boolean` |
| `modePermitted?` | `boolean` |
| `modeInherited?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:120](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L120)

___

### setForeignBinaryState

▸ **setForeignBinaryState**(`id`, `binary`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `binary` | `Buffer` |  |
| `callback` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9855](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9855)

▸ **setForeignBinaryState**(`id`, `binary`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `binary` | `Buffer` |  |
| `options` | `unknown` | - |
| `callback` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9856](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9856)

___

### setForeignBinaryStateAsync

▸ **setForeignBinaryStateAsync**(`id`, `binary`, `options?`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | `Buffer` |
| `options?` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L253)

___

### setForeignObject

▸ **setForeignObject**<`T`\>(`id`, `obj`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> |  |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3117](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3117)

▸ **setForeignObject**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> |  |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3122](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L3122)

___

### setForeignObjectAsync

▸ **setForeignObjectAsync**<`T`\>(`id`, `obj`, `options?`): `SetObjectPromise`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L295)

___

### setForeignObjectNotExists

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> |  |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4698](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4698)

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> |  |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4703](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4703)

___

### setForeignObjectNotExistsAsync

▸ **setForeignObjectNotExistsAsync**<`T`\>(`id`, `obj`, `options?`): `SetObjectPromise`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L172)

___

### setForeignState

▸ **setForeignState**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8008](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8008)

▸ **setForeignState**(`id`, `state`, `ack`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `ack` | `boolean` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8013](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8013)

▸ **setForeignState**(`id`, `state`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `options` | `unknown` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8019](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8019)

▸ **setForeignState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8025](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8025)

___

### setForeignStateAsync

▸ **setForeignStateAsync**(`id`, `state`, `ack?`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack?` | `boolean` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:397](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L397)

▸ **setForeignStateAsync**(`id`, `state`, `options?`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `options?` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:402](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L402)

▸ **setForeignStateAsync**(`id`, `state`, `ack`, `options`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:407](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L407)

___

### setForeignStateChanged

▸ **setForeignStateChanged**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8317](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8317)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `ack` | `boolean` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8322](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8322)

▸ **setForeignStateChanged**(`id`, `state`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `options` | `unknown` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8328](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8328)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8334](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L8334)

___

### setForeignStateChangedAsync

▸ **setForeignStateChangedAsync**(`id`, `state`, `ack?`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack?` | `boolean` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L311)

▸ **setForeignStateChangedAsync**(`id`, `state`, `options?`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `options?` | `unknown` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L316)

▸ **setForeignStateChangedAsync**(`id`, `state`, `ack`, `options`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L321)

___

### setInterval

▸ **setInterval**(`cb`, `timeout`, ...`args`): `void` \| `Timeout`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | `TimeoutCallback` |  |
| `timeout` | `number` |  |
| `...args` | `any`[] |  |

#### Returns

`void` \| `Timeout`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2498](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2498)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### setObject

▸ **setObject**(`id`, `obj`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` |  |
| `obj` | `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |  |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2546](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2546)

▸ **setObject**(`id`, `obj`, `options`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` |  |
| `obj` | `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |  |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2547](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2547)

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L293)

___

### setObjectNotExists

▸ **setObjectNotExists**(`id`, `obj`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |  |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4597](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4597)

▸ **setObjectNotExists**(`id`, `obj`, `options`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |  |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4602](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4602)

___

### setObjectNotExistsAsync

▸ **setObjectNotExistsAsync**(`id`, `obj`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L170)

___

### setPassword

▸ **setPassword**(`user`, `pw`, `options`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `options` | `Record`<`string`, `any`\> | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1618](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1618)

___

### setPasswordAsync

▸ **setPasswordAsync**(`user`, `password`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `password` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:283](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L283)

___

### setSession

▸ **setSession**(`id`, `ttl`, `data`, `callback?`): `VoidLikeCallback`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `ttl` | `number` |
| `data` | `Record`<`string`, `any`\> |
| `callback?` | `ErrorCallback` |

#### Returns

`VoidLikeCallback`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1247](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1247)

___

### setState

▸ **setState**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `IdObject` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7120](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7120)

▸ **setState**(`id`, `state`, `ack`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `IdObject` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `ack` | `boolean` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7125](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7125)

▸ **setState**(`id`, `state`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `IdObject` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `options` | `unknown` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7131](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7131)

▸ **setState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `IdObject` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7137](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7137)

___

### setStateAsync

▸ **setStateAsync**(`id`, `state`, `ack?`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack?` | `boolean` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L377)

▸ **setStateAsync**(`id`, `state`, `options?`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `options?` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L382)

▸ **setStateAsync**(`id`, `state`, `ack`, `options`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L387)

___

### setStateChanged

▸ **setStateChanged**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7862](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7862)

▸ **setStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `ack` | `boolean` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7867](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7867)

▸ **setStateChanged**(`id`, `state`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `options` | `unknown` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7873](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7873)

▸ **setStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | `State` \| `SettableState` \| `StateValue` |  |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7879](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L7879)

___

### setStateChangedAsync

▸ **setStateChangedAsync**(`id`, `state`, `ack?`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack?` | `boolean` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:331](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L331)

▸ **setStateChangedAsync**(`id`, `state`, `options?`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `options?` | `unknown` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L336)

▸ **setStateChangedAsync**(`id`, `state`, `ack`, `options`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L341)

___

### setTimeout

▸ **setTimeout**(`cb`, `timeout`, ...`args`): `void` \| `Timeout`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | `TimeoutCallback` |  |
| `timeout` | `number` |  |
| `...args` | `any`[] |  |

#### Returns

`void` \| `Timeout`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2416](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2416)

___

### subscribeForeignFiles

▸ **subscribeForeignFiles**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4536](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4536)

▸ **subscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4537](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4537)

___

### subscribeForeignObjects

▸ **subscribeForeignObjects**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4457](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4457)

▸ **subscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4458](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4458)

___

### subscribeForeignObjectsAsync

▸ **subscribeForeignObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L166)

___

### subscribeForeignStates

▸ **subscribeForeignStates**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9382](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9382)

▸ **subscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9383](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9383)

___

### subscribeForeignStatesAsync

▸ **subscribeForeignStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L245)

___

### subscribeObjects

▸ **subscribeObjects**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4370](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4370)

▸ **subscribeObjects**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4371](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4371)

___

### subscribeObjectsAsync

▸ **subscribeObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L160)

___

### subscribeStates

▸ **subscribeStates**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9769](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9769)

▸ **subscribeStates**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9770](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9770)

___

### subscribeStatesAsync

▸ **subscribeStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L249)

___

### supportsFeature

▸ **supportsFeature**(`featureName`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `featureName` | `string` |  |

#### Returns

`boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1463](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1463)

___

### terminate

▸ **terminate**(`exitCode?`): `never`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exitCode?` | `number` |  |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1313](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1313)

▸ **terminate**(`reason?`, `exitCode?`): `never`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `string` |  |
| `exitCode?` | `number` |  |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1314](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L1314)

___

### unlink

▸ **unlink**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6364](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6364)

▸ **unlink**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `unknown` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6365](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6365)

___

### unlinkAsync

▸ **unlinkAsync**(`adapterName`, `path`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L223)

___

### unsubscribeForeignFiles

▸ **unsubscribeForeignFiles**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4565](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4565)

▸ **unsubscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4566](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4566)

___

### unsubscribeForeignObjects

▸ **unsubscribeForeignObjects**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4495](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4495)

▸ **unsubscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4496](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4496)

___

### unsubscribeForeignObjectsAsync

▸ **unsubscribeForeignObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L168)

___

### unsubscribeForeignStates

▸ **unsubscribeForeignStates**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9621](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9621)

▸ **unsubscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9622](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9622)

___

### unsubscribeForeignStatesAsync

▸ **unsubscribeForeignStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L247)

___

### unsubscribeObjects

▸ **unsubscribeObjects**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4413](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4413)

▸ **unsubscribeObjects**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4414](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L4414)

___

### unsubscribeObjectsAsync

▸ **unsubscribeObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:162](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L162)

___

### unsubscribeStates

▸ **unsubscribeStates**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9811](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9811)

▸ **unsubscribeStates**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9812](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L9812)

___

### unsubscribeStatesAsync

▸ **unsubscribeStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L251)

___

### updateConfig

▸ **updateConfig**(`newConfig`): `SetObjectPromise`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newConfig` | `Record`<`string`, `any`\> |  |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2307](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L2307)

___

### writeFile

▸ **writeFile**(`adapterName`, `path`, `data`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| `Buffer` |  |
| `callback` | `ErrnoCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6503](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6503)

▸ **writeFile**(`adapterName`, `path`, `data`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| `Buffer` |  |
| `options` | `unknown` | - |
| `callback` | `ErrnoCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6504](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L6504)

___

### writeFileAsync

▸ **writeFileAsync**(`adapterName`, `path`, `data`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `data` | `string` \| `Buffer` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/a74c68fe/packages/adapter/src/lib/adapter/adapter.ts#L230)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Defined in

node_modules/@types/node/events.d.ts:262

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` |  |
| `eventName` | `string` \| `symbol` |  |

#### Returns

`number`

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` |  |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

#### Defined in

node_modules/@types/node/events.d.ts:217

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

node_modules/@types/node/events.d.ts:157

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

node_modules/@types/node/events.d.ts:158
