[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / AdapterClass

# Class: AdapterClass

## Hierarchy

- [`EventEmitter`](internal_.EventEmitter-1.md)

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
| `options` | `string` \| [`AdapterOptions`](../interfaces/internal_.AdapterOptions.md) |

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[constructor](internal_.EventEmitter-1.md#constructor)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L654)

## Properties

### FORBIDDEN\_CHARS

• `Protected` `Readonly` **FORBIDDEN\_CHARS**: `RegExp` = `FORBIDDEN_CHARS`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L598)

___

### adapterConfig

• `Protected` `Optional` **adapterConfig**: ``null`` \| [`AdapterOptions`](../interfaces/internal_.AdapterOptions.md) \| [`InstanceObject`](../interfaces/internal_.InstanceObject.md)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L616)

___

### adapterDir

• `Protected` **adapterDir**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L618)

___

### adapterReady

• `Protected` **adapterReady**: `boolean` = `false`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L565)

___

### common

• `Protected` `Optional` **common**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L641)

___

### config

• `Protected` `Optional` **config**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L639)

___

### connected

• `Protected` `Optional` **connected**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L617)

___

### dateFormat

• `Protected` `Optional` **dateFormat**: `any`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:628](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L628)

___

### host

• `Protected` `Optional` **host**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L640)

___

### instance

• `Protected` `Optional` **instance**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L612)

___

### ioPack

• `Protected` **ioPack**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:622](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L622)

___

### isFloatComma

• `Protected` `Optional` **isFloatComma**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L630)

___

### kill

• `Protected` `Optional` **kill**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L645)

___

### language

• `Protected` `Optional` **language**: [`Languages`](../modules/internal_.md#languages)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:632](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L632)

___

### latitude

• `Protected` `Optional` **latitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L636)

___

### log

• `Protected` `Optional` **log**: [`Log`](internal_.Log.md)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:584](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L584)

___

### longitude

• `Protected` `Optional` **longitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L634)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L591)

___

### namespace

• `Protected` **namespace**: \`${string}.${number}\`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L590)

___

### oObjects

• `Protected` `Optional` **oObjects**: [`Record`](../modules/internal_.md#record)<`string`, `undefined` \| [`Object`](../modules/internal_.md#object)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L577)

___

### oStates

• `Protected` `Optional` **oStates**: [`Record`](../modules/internal_.md#record)<`string`, `undefined` \| [`State`](../interfaces/internal_.State.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:572](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L572)

___

### pack

• `Protected` `Optional` **pack**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L620)

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

[packages/adapter/src/lib/adapter/adapter.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L646)

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

[packages/adapter/src/lib/adapter/adapter.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L647)

___

### stop

• `Protected` `Optional` **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L643)

___

### systemConfig

• `Protected` `Optional` **systemConfig**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:626](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L626)

___

### version

• `Protected` `Optional` **version**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L644)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](AdapterClass.md#capturerejectionsymbol)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[captureRejectionSymbol](internal_.EventEmitter-1.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[captureRejections](internal_.EventEmitter-1.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[defaultMaxListeners](internal_.EventEmitter-1.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](AdapterClass.md#errormonitor)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[errorMonitor](internal_.EventEmitter-1.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:272

## Methods

### addChannelToEnum

▸ **addChannelToEnum**(`enumName`, `addTo`, `parentDevice`, `channelName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `addTo` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5249](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5249)

▸ **addChannelToEnum**(`enumName`, `addTo`, `parentDevice`, `channelName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `addTo` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5256](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5256)

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

[packages/adapter/src/lib/adapter/adapter.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L180)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[addListener](internal_.EventEmitter-1.md#addlistener)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5935](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5935)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5943](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5943)

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

[packages/adapter/src/lib/adapter/adapter.ts:197](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L197)

___

### calculatePermissions

▸ **calculatePermissions**(`user`, `commandsPermissions`, `options?`, `callback?`): `Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) |  |
| `options?` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | - |
| `callback?` | [`CalculatePermissionsCallback`](../modules/internal_.md#calculatepermissionscallback) | - |

#### Returns

`Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1810](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1810)

▸ **calculatePermissions**(`user`, `commandsPermissions`, `callback?`): `Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) |  |
| `callback?` | [`CalculatePermissionsCallback`](../modules/internal_.md#calculatepermissionscallback) | - |

#### Returns

`Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1816](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1816)

___

### calculatePermissionsAsync

▸ **calculatePermissionsAsync**(`user`, `commandsPermissions`, `options?`): `Promise`<[`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) |
| `options?` | `unknown` |

#### Returns

`Promise`<[`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:287](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L287)

___

### checkGroup

▸ **checkGroup**(`user`, `group`, `options`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `group` | `string` |  |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | - |
| `callback?` | [`CheckGroupCallback`](../modules/internal_.md#checkgroupcallback) |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1726](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1726)

▸ **checkGroup**(`user`, `group`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `group` | `string` |  |
| `callback?` | [`CheckGroupCallback`](../modules/internal_.md#checkgroupcallback) |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1727](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1727)

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

[packages/adapter/src/lib/adapter/adapter.ts:285](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L285)

___

### checkPassword

▸ **checkPassword**(`user`, `pw`, `options`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | - |
| `callback` | [`CheckPasswordCallback`](../modules/internal_.md#checkpasswordcallback) |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1487](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1487)

▸ **checkPassword**(`user`, `pw`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `callback` | [`CheckPasswordCallback`](../modules/internal_.md#checkpasswordcallback) |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1493](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1493)

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

[packages/adapter/src/lib/adapter/adapter.ts:281](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L281)

___

### chmodFile

▸ **chmodFile**(`adapter`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` |  |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> \| { `mode`: `string` \| `number`  } |  |
| `callback` | [`ChownFileCallback`](../modules/internal_.md#chownfilecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6213](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6213)

▸ **chmodFile**(`adapter`, `path`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` |  |
| `callback` | [`ChownFileCallback`](../modules/internal_.md#chownfilecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6220](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6220)

___

### chmodFileAsync

▸ **chmodFileAsync**(`adapter`, `path`, `options`): `Promise`<{ `entries`: [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[] ; `id`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapter` | ``null`` \| `string` |
| `path` | `string` |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> \| { `mode`: `string` \| `number`  } |

#### Returns

`Promise`<{ `entries`: [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[] ; `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L213)

___

### chownFile

▸ **chownFile**(`_adapter`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` |  |
| `path` | `string` |  |
| `options` | `unknown` |  |
| `callback` | (`err?`: ``null`` \| [`Error`](../modules/internal_.md#error), `processedFiles?`: `any`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6260](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6260)

▸ **chownFile**(`_adapter`, `path`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` |  |
| `path` | `string` |  |
| `callback` | (`err?`: ``null`` \| [`Error`](../modules/internal_.md#error), `processedFiles?`: `any`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6267](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6267)

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

[packages/adapter/src/lib/adapter/adapter.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L219)

___

### clearInterval

▸ **clearInterval**(`interval`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | [`Timeout`](../interfaces/internal_.Timeout.md) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2538](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2538)

___

### clearTimeout

▸ **clearTimeout**(`timer`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timer` | [`Timeout`](../interfaces/internal_.Timeout.md) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2461](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2461)

___

### createChannel

▸ **createChannel**(`parentDevice`, `channelName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4890](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4890)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4891](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4891)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4897](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4897)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4904](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4904)

___

### createChannelAsync

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon?` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:454](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L454)

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `native?` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L459)

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L465)

___

### createDevice

▸ **createDevice**(`deviceName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4816](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4816)

▸ **createDevice**(`deviceName`, `common`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | [`Partial`](../modules/internal_.md#partial)<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4817](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4817)

▸ **createDevice**(`deviceName`, `common`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | [`Partial`](../modules/internal_.md#partial)<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4822](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4822)

▸ **createDevice**(`deviceName`, `common`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | [`Partial`](../modules/internal_.md#partial)<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4828](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4828)

___

### createDeviceAsync

▸ **createDeviceAsync**(`deviceName`, `common?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common?` | [`Partial`](../modules/internal_.md#partial)<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L433)

▸ **createDeviceAsync**(`deviceName`, `common`, `native?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | [`Partial`](../modules/internal_.md#partial)<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `native?` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L434)

▸ **createDeviceAsync**(`deviceName`, `common`, `native`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | [`Partial`](../modules/internal_.md#partial)<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L439)

___

### createState

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4975](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4975)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4981](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4981)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4988](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4988)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4996](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4996)

___

### createStateAsync

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon?` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L476)

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `native?` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L482)

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `native` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L489)

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

[packages/adapter/src/lib/adapter/adapter.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1185)

▸ **decrypt**(`value`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1186](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1186)

___

### delBinaryState

▸ **delBinaryState**(`id`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10185](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10185)

▸ **delBinaryState**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10186](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10186)

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

[packages/adapter/src/lib/adapter/adapter.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L273)

___

### delFile

▸ **delFile**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L371)

▸ **delFile**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `unknown` |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L372)

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

[packages/adapter/src/lib/adapter/adapter.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L225)

___

### delForeignBinaryState

▸ **delForeignBinaryState**(`id`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10126](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10126)

▸ **delForeignBinaryState**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10127](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10127)

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

[packages/adapter/src/lib/adapter/adapter.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L267)

___

### delForeignObject

▸ **delForeignObject**(`id`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4260](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4260)

▸ **delForeignObject**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4261](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4261)

___

### delForeignObjectAsync

▸ **delForeignObjectAsync**(`id`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:158](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L158)

___

### delForeignState

▸ **delForeignState**(`id`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8955](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8955)

▸ **delForeignState**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8956](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8956)

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

[packages/adapter/src/lib/adapter/adapter.ts:239](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L239)

___

### delObject

▸ **delObject**(`id`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4200](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4200)

▸ **delObject**(`id`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options?` | ``null`` \| [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4201](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4201)

___

### delObjectAsync

▸ **delObjectAsync**(`id`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:156](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L156)

___

### delState

▸ **delState**(`id`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8903](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8903)

▸ **delState**(`id`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8904](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8904)

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

[packages/adapter/src/lib/adapter/adapter.ts:237](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L237)

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

[packages/adapter/src/lib/adapter/adapter.ts:2476](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2476)

___

### deleteChannel

▸ **deleteChannel**(`channelName`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5497](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5497)

▸ **deleteChannel**(`channelName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` |  |
| `options?` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5498](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5498)

▸ **deleteChannel**(`parentDevice`, `channelName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentDevice` | `string` |  |
| `channelName` | `string` |  |
| `options?` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5499](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5499)

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

[packages/adapter/src/lib/adapter/adapter.ts:501](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L501)

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

[packages/adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L502)

___

### deleteChannelFromEnum

▸ **deleteChannelFromEnum**(`enumName`, `parentDevice`, `channelName`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5382](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5382)

▸ **deleteChannelFromEnum**(`enumName`, `parentDevice`, `channelName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5388](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5388)

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

[packages/adapter/src/lib/adapter/adapter.ts:187](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L187)

___

### deleteDevice

▸ **deleteDevice**(`deviceName`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5183](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5183)

▸ **deleteDevice**(`deviceName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5184](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5184)

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

[packages/adapter/src/lib/adapter/adapter.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L179)

___

### deleteState

▸ **deleteState**(`stateName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateName` | `string` |
| `options?` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5605](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5605)

▸ **deleteState**(`parentChannel`, `stateName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options?` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5606](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5606)

▸ **deleteState**(`parentDevice`, `parentChannel`, `stateName`, `options?`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options?` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5607](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5607)

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

[packages/adapter/src/lib/adapter/adapter.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L507)

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

[packages/adapter/src/lib/adapter/adapter.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L508)

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

[packages/adapter/src/lib/adapter/adapter.ts:509](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L509)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6082](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6082)

▸ **deleteStateFromEnum**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumName` | `string` |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6089](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6089)

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

[packages/adapter/src/lib/adapter/adapter.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L205)

___

### destroySession

▸ **destroySession**(`id`, `callback?`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1270](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1270)

___

### disable

▸ **disable**(): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2354](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2354)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[emit](internal_.EventEmitter-1.md#emit)

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

[packages/adapter/src/lib/adapter/adapter.ts:1205](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1205)

▸ **encrypt**(`value`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1206](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1206)

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[eventNames](internal_.EventEmitter-1.md#eventnames)

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
| `objPart` | [`PartialObjectWorker`](../modules/internal_.md#partialobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3231](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3231)

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `options`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `objPart` | [`PartialObjectWorker`](../modules/internal_.md#partialobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> | - |
| `options` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3236](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3236)

___

### extendForeignObjectAsync

▸ **extendForeignObjectAsync**<`T`\>(`id`, `objPart`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `objPart` | [`PartialObjectWorker`](../modules/internal_.md#partialobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> |
| `options?` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:128](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L128)

___

### extendObject

▸ **extendObject**(`id`, `objPart`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `objPart` | [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"state"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"state"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"state"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"state"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"state"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"state"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"state"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"state"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"state"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"state"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"state"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"state"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"state"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"channel"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"channel"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"channel"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"channel"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"channel"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"channel"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"channel"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"channel"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"channel"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"channel"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"channel"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"channel"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"channel"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"device"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"device"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"device"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"device"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"device"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"device"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"device"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"device"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"device"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"device"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"device"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"device"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"device"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"folder"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"folder"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"folder"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"folder"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"folder"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"folder"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"folder"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"folder"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"folder"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"folder"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"folder"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"folder"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"folder"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"enum"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"enum"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"enum"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"enum"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"enum"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"enum"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"enum"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"enum"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"enum"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"enum"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"enum"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"enum"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"enum"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"meta"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"meta"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"meta"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"meta"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"meta"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"meta"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"meta"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"meta"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"meta"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"meta"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"meta"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"meta"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"meta"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"host"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"host"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"host"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"host"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"host"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"host"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"host"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"host"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"host"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"host"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"host"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"host"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"host"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"adapter"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"adapter"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"adapter"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"adapter"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"adapter"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"adapter"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"adapter"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"adapter"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"adapter"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"adapter"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"adapter"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"adapter"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"adapter"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"instance"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"instance"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"instance"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"instance"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"instance"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"instance"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"instance"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"instance"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"instance"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"instance"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"instance"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"instance"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"instance"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"user"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"user"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"user"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"user"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"user"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"user"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"user"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"user"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"user"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"user"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"user"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"user"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"user"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"group"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"group"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"group"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"group"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"group"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"group"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"group"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"group"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"group"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"group"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"group"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"group"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"group"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"script"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"script"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"script"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"script"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"script"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"script"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"script"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"script"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"script"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"script"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"script"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"script"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"script"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2854](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2854)

▸ **extendObject**(`id`, `objPart`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `objPart` | [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"state"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"state"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"state"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"state"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"state"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"state"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"state"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"state"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"state"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"state"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"state"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"state"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"state"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"channel"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"channel"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"channel"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"channel"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"channel"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"channel"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"channel"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"channel"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"channel"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"channel"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"channel"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"channel"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"channel"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"device"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"device"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"device"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"device"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"device"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"device"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"device"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"device"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"device"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"device"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"device"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"device"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"device"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"folder"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"folder"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"folder"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"folder"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"folder"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"folder"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"folder"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"folder"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"folder"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"folder"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"folder"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"folder"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"folder"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"enum"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"enum"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"enum"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"enum"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"enum"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"enum"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"enum"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"enum"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"enum"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"enum"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"enum"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"enum"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"enum"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"meta"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"meta"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"meta"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"meta"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"meta"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"meta"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"meta"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"meta"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"meta"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"meta"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"meta"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"meta"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"meta"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"host"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"host"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"host"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"host"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"host"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"host"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"host"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"host"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"host"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"host"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"host"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"host"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"host"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"adapter"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"adapter"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"adapter"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"adapter"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"adapter"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"adapter"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"adapter"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"adapter"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"adapter"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"adapter"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"adapter"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"adapter"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"adapter"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"instance"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"instance"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"instance"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"instance"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"instance"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"instance"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"instance"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"instance"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"instance"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"instance"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"instance"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"instance"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"instance"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"user"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"user"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"user"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"user"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"user"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"user"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"user"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"user"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"user"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"user"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"user"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"user"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"user"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"group"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"group"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"group"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"group"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"group"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"group"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"group"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"group"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"group"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"group"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"group"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"group"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"group"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"script"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"script"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"script"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"script"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"script"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"script"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"script"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"script"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"script"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"script"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"script"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"script"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"script"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } | - |
| `options` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2855](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2855)

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `objPart`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `objPart` | [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"state"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"state"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"state"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"state"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"state"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"state"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"state"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"state"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"state"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"state"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"state"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"state"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"state"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"channel"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"channel"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"channel"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"channel"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"channel"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"channel"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"channel"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"channel"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"channel"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"channel"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"channel"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"channel"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"channel"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"device"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"device"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"device"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"device"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"device"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"device"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"device"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"device"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"device"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"device"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"device"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"device"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"device"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"folder"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"folder"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"folder"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"folder"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"folder"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"folder"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"folder"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"folder"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"folder"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"folder"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"folder"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"folder"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"folder"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"enum"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"enum"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"enum"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"enum"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"enum"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"enum"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"enum"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"enum"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"enum"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"enum"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"enum"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"enum"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"enum"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"meta"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"meta"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"meta"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"meta"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"meta"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"meta"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"meta"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"meta"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"meta"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"meta"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"meta"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"meta"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"meta"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"host"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"host"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"host"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"host"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"host"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"host"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"host"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"host"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"host"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"host"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"host"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"host"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"host"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"adapter"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"adapter"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"adapter"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"adapter"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"adapter"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"adapter"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"adapter"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"adapter"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"adapter"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"adapter"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"adapter"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"adapter"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"adapter"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"instance"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"instance"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"instance"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"instance"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"instance"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"instance"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"instance"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"instance"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"instance"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"instance"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"instance"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"instance"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"instance"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"user"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"user"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"user"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"user"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"user"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"user"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"user"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"user"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"user"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"user"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"user"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"user"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"user"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"group"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"group"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"group"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"group"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"group"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"group"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"group"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"group"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"group"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"group"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"group"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"group"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"group"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"script"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"script"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"script"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"script"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"script"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"script"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"script"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"script"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"script"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"script"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"script"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"script"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"script"``  } \| [`PartialStateObject`](../interfaces/internal_.PartialStateObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialChannelObject`](../interfaces/internal_.PartialChannelObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialDeviceObject`](../interfaces/internal_.PartialDeviceObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialFolderObject`](../interfaces/internal_.PartialFolderObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialEnumObject`](../interfaces/internal_.PartialEnumObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialMetaObject`](../interfaces/internal_.PartialMetaObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialHostObject`](../interfaces/internal_.PartialHostObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialAdapterObject`](../interfaces/internal_.PartialAdapterObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialInstanceObject`](../interfaces/internal_.PartialInstanceObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialUserObject`](../interfaces/internal_.PartialUserObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialGroupObject`](../interfaces/internal_.PartialGroupObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialScriptObject`](../interfaces/internal_.PartialScriptObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } & [`PartialOtherObject`](../interfaces/internal_.PartialOtherObject.md) & { `type?`: ``"config"`` \| ``"chart"``  } |
| `options?` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:114](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L114)

___

### fileExists

▸ **fileExists**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | [`GenericCallback`](../modules/internal_.md#genericcallback)<`boolean`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6569](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6569)

▸ **fileExists**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `unknown` |
| `callback` | [`GenericCallback`](../modules/internal_.md#genericcallback)<`boolean`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6570](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6570)

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

[packages/adapter/src/lib/adapter/adapter.ts:232](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L232)

___

### findForeignObject

▸ **findForeignObject**(`idOrName`, `type`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | `string` |  |
| `callback` | [`FindObjectCallback`](../modules/internal_.md#findobjectcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4083](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4083)

▸ **findForeignObject**(`idOrName`, `type`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | `string` |  |
| `options` | `unknown` |  |
| `callback` | [`FindObjectCallback`](../modules/internal_.md#findobjectcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4084](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4084)

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

[packages/adapter/src/lib/adapter/adapter.ts:449](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L449)

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

[packages/adapter/src/lib/adapter/adapter.ts:6652](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6652)

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

[packages/adapter/src/lib/adapter/adapter.ts:6653](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6653)

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

[packages/adapter/src/lib/adapter/adapter.ts:6617](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6617)

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

[packages/adapter/src/lib/adapter/adapter.ts:6618](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6618)

___

### getAdapterObjects

▸ **getAdapterObjects**(`callback`): `Promise`<`void` \| [`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`objects`: [`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>) => `void` |  |

#### Returns

`Promise`<`void` \| [`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2772](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2772)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<[`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

#### Returns

`Promise`<[`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L303)

___

### getBinaryState

▸ **getBinaryState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10109](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10109)

▸ **getBinaryState**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` |  |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10110](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10110)

___

### getBinaryStateAsync

▸ **getBinaryStateAsync**(`id`, `options?`): [`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L265)

___

### getCertificates

▸ **getCertificates**(`publicName?`, `privateName?`, `chainedName?`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicName?` | `string` | - |
| `privateName?` | `string` | - |
| `chainedName?` | `string` | - |
| `callback?` | [`GetCertificatesCallback`](../modules/internal_.md#getcertificatescallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2198](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2198)

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

[packages/adapter/src/lib/adapter/adapter.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L301)

___

### getChannels

▸ **getChannels**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:521](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L521)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L522)

▸ **getChannels**(`parentDevice`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options` | `unknown` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L523)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L533)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L534)

___

### getChannelsOf

▸ **getChannelsOf**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5761](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5761)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5762](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5762)

▸ **getChannelsOf**(`parentDevice`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options` | `unknown` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5763](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5763)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:515](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L515)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L516)

___

### getDevices

▸ **getDevices**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5707](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5707)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5708](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5708)

___

### getDevicesAsync

▸ **getDevicesAsync**(`options?`): `Promise`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `unknown` |

#### Returns

`Promise`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:195](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L195)

___

### getEncryptedConfig

▸ **getEncryptedConfig**(`attribute`, `callback?`): `Promise`<`string` \| `void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attribute` | `string` |  |
| `callback?` | [`GetEncryptedConfigCallback`](../modules/internal_.md#getencryptedconfigcallback) | - |

#### Returns

`Promise`<`string` \| `void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2371](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2371)

___

### getEnum

▸ **getEnum**(`callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3650](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3650)

▸ **getEnum**(`name`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3651](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3651)

▸ **getEnum**(`name`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `options` | `unknown` | - |
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3652](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3652)

___

### getEnumAsync

▸ **getEnumAsync**(`name`, `options?`): `Promise`<{ `requestEnum`: `string` ; `result`: [`Record`](../modules/internal_.md#record)<`string`, `any`\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<{ `requestEnum`: `string` ; `result`: [`Record`](../modules/internal_.md#record)<`string`, `any`\>  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L152)

___

### getEnums

▸ **getEnums**(`callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3739](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3739)

▸ **getEnums**(`enumList`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | [`EnumList`](../modules/internal_.md#enumlist) | - |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3740](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3740)

▸ **getEnums**(`enumList`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | [`EnumList`](../modules/internal_.md#enumlist) | - |
| `options` | `unknown` | - |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3741](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3741)

___

### getEnumsAsync

▸ **getEnumsAsync**(`enumList`, `options?`): [`GetEnumsPromise`](../modules/internal_.md#getenumspromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumList` | [`EnumList`](../modules/internal_.md#enumlist) |
| `options?` | `unknown` |

#### Returns

[`GetEnumsPromise`](../modules/internal_.md#getenumspromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L154)

___

### getForeignBinaryState

▸ **getForeignBinaryState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10035](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10035)

▸ **getForeignBinaryState**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` |  |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10036](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10036)

___

### getForeignBinaryStateAsync

▸ **getForeignBinaryStateAsync**(`id`, `options?`): [`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L260)

___

### getForeignObject

▸ **getForeignObject**<`T`\>(`id`, `callback`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`T`\> |  |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4137](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4137)

▸ **getForeignObject**<`T`\>(`id`, `options`, `callback`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `options` | `unknown` | - |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`T`\> |  |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4138](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4138)

___

### getForeignObjectAsync

▸ **getForeignObjectAsync**<`T`\>(`id`, `options?`): [`GetObjectPromise`](../modules/internal_.md#getobjectpromise)<`T`\>

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

[`GetObjectPromise`](../modules/internal_.md#getobjectpromise)<`T`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L306)

___

### getForeignObjects

▸ **getForeignObjects**(`pattern`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback` | [`GetObjectsCallback`](../modules/internal_.md#getobjectscallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3886](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3886)

▸ **getForeignObjects**(`pattern`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback` | [`GetObjectsCallback`](../modules/internal_.md#getobjectscallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3887](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3887)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `type` | `T` |  |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3888](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3888)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `enums`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `type` | `T` |  |
| `enums` | [`EnumList`](../modules/internal_.md#enumlist) |  |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3893](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3893)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `options`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `type` | `T` |  |
| `options` | `unknown` | - |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3899](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3899)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `enums`, `options`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `type` | `T` |  |
| `enums` | ``null`` \| [`EnumList`](../modules/internal_.md#enumlist) |  |
| `options` | `unknown` | - |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3905](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3905)

___

### getForeignObjectsAsync

▸ **getForeignObjectsAsync**<`T`\>(`pattern`, `type`, `enums`, `options?`): [`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `type` | `T` |
| `enums` | [`EnumList`](../modules/internal_.md#enumlist) |
| `options?` | `unknown` |

#### Returns

[`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L417)

▸ **getForeignObjectsAsync**<`T`\>(`pattern`, `type`, `options?`): [`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `type` | `T` |
| `options?` | `unknown` |

#### Returns

[`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:423](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L423)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): [`GetObjectsPromise`](../modules/internal_.md#getobjectspromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetObjectsPromise`](../modules/internal_.md#getobjectspromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L428)

___

### getForeignState

▸ **getForeignState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8497](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8497)

▸ **getForeignState**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` |  |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8498](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8498)

___

### getForeignStateAsync

▸ **getForeignStateAsync**(`id`, `options?`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L279)

___

### getForeignStates

▸ **getForeignStates**(`pattern`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] |  |
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9139](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9139)

▸ **getForeignStates**(`pattern`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] |  |
| `options` | `unknown` |  |
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9140](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9140)

___

### getForeignStatesAsync

▸ **getForeignStatesAsync**(`pattern`, `options?`): [`GetStatesPromise`](../modules/internal_.md#getstatespromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetStatesPromise`](../modules/internal_.md#getstatespromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:243](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L243)

___

### getHistory

▸ **getHistory**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | [`GetHistoryOptions`](../interfaces/internal_.GetHistoryOptions.md) |  |
| `callback` | [`GetHistoryCallback`](../modules/internal_.md#gethistorycallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8776](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8776)

▸ **getHistory**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | [`GetHistoryCallback`](../modules/internal_.md#gethistorycallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8777](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8777)

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

[packages/adapter/src/lib/adapter/adapter.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L235)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[getMaxListeners](internal_.EventEmitter-1.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### getObject

▸ **getObject**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`string`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3435](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3435)

▸ **getObject**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` | - |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`string`\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3436](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3436)

___

### getObjectAsync

▸ **getObjectAsync**(`id`, `options?`): [`GetObjectPromise`](../modules/internal_.md#getobjectpromise)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetObjectPromise`](../modules/internal_.md#getobjectpromise)<`string`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L134)

___

### getObjectList

▸ **getObjectList**(`params`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |  |
| `callback` | [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3594](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3594)

▸ **getObjectList**(`params`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |  |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> \| { `sorted?`: `boolean`  } |  |
| `callback` | [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3595](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3595)

___

### getObjectListAsync

▸ **getObjectListAsync**(`params`, `options?`): [`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> \| { `sorted?`: `boolean`  } |

#### Returns

[`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:147](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L147)

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
| `params` | `undefined` \| ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |  |
| `callback` | [`GetObjectViewCallback`](../modules/internal_.md#getobjectviewcallback)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3478](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3478)

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
| `params` | `undefined` \| ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |  |
| `options` | `unknown` |  |
| `callback` | [`GetObjectViewCallback`](../modules/internal_.md#getobjectviewcallback)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\> |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3484](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3484)

___

### getObjectViewAsync

▸ **getObjectViewAsync**<`Design`, `Search`\>(`design`, `search`, `params`, `options?`): [`GetObjectViewPromise`](../modules/internal_.md#getobjectviewpromise)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\>

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
| `params` | `undefined` \| ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | `unknown` |

#### Returns

[`GetObjectViewPromise`](../modules/internal_.md#getobjectviewpromise)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:140](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L140)

___

### getPluginConfig

▸ **getPluginConfig**(`name`): ``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10221](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10221)

___

### getPluginInstance

▸ **getPluginInstance**(`name`): ``null`` \| [`Plugin`](../modules/internal_.md#plugin)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

``null`` \| [`Plugin`](../modules/internal_.md#plugin)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10203](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10203)

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

[packages/adapter/src/lib/adapter/adapter.ts:1399](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1399)

▸ **getPort**(`port`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` |  |
| `callback?` | (`port`: `number`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1400](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1400)

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

[packages/adapter/src/lib/adapter/adapter.ts:277](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L277)

___

### getSession

▸ **getSession**(`id`, `callback`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback` | [`GetSessionCallback`](../modules/internal_.md#getsessioncallback) |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1226](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1226)

___

### getState

▸ **getState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8466](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8466)

▸ **getState**(`id`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `options` | `unknown` |  |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8467](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8467)

___

### getStateAsync

▸ **getStateAsync**(`id`, `options?`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:164](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L164)

___

### getStates

▸ **getStates**(`pattern`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9014](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9014)

▸ **getStates**(`pattern`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` |  |
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9015](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9015)

___

### getStatesAsync

▸ **getStatesAsync**(`pattern`, `options?`): [`GetStatesPromise`](../modules/internal_.md#getstatespromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetStatesPromise`](../modules/internal_.md#getstatespromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:241](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L241)

___

### getStatesOf

▸ **getStatesOf**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`StateObject`](../interfaces/internal_.StateObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5830](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5830)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`StateObject`](../interfaces/internal_.StateObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5831](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5831)

▸ **getStatesOf**(`parentDevice`, `parentChannel`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`StateObject`](../interfaces/internal_.StateObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5832](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5832)

▸ **getStatesOf**(`parentDevice`, `parentChannel`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `options` | `unknown` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`StateObject`](../interfaces/internal_.StateObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5837](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L5837)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Returns

`Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:541](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L541)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L542)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel`, `options?`): `Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L543)

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

[packages/adapter/src/lib/adapter/adapter.ts:10267](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10267)

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

[packages/adapter/src/lib/adapter/adapter.ts:1589](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1589)

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

[packages/adapter/src/lib/adapter/adapter.ts:8868](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8868)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |

#### Returns

`number`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[listenerCount](internal_.EventEmitter-1.md#listenercount)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[listeners](internal_.EventEmitter-1.md#listeners)

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
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6434](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6434)

▸ **mkdir**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `unknown` |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6435](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6435)

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

[packages/adapter/src/lib/adapter/adapter.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L227)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[off](internal_.EventEmitter-1.md#off)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[on](internal_.EventEmitter-1.md#on)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[prependListener](internal_.EventEmitter-1.md#prependlistener)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[prependOnceListener](internal_.EventEmitter-1.md#prependoncelistener)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[rawListeners](internal_.EventEmitter-1.md#rawlisteners)

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
| `callback` | [`ReadDirCallback`](../modules/internal_.md#readdircallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6308](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6308)

▸ **readDir**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` |  |
| `options` | `unknown` |  |
| `callback` | [`ReadDirCallback`](../modules/internal_.md#readdircallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6309](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6309)

___

### readDirAsync

▸ **readDirAsync**(`adapterName`, `path`, `options?`): [`ReadDirPromise`](../modules/internal_.md#readdirpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

[`ReadDirPromise`](../modules/internal_.md#readdirpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L221)

___

### readFile

▸ **readFile**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `callback` | [`ReadFileCallback`](../modules/internal_.md#readfilecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6460](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6460)

▸ **readFile**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `options` | `unknown` |  |
| `callback` | [`ReadFileCallback`](../modules/internal_.md#readfilecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6461](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6461)

___

### readFileAsync

▸ **readFileAsync**(`adapterName`, `path`, `options?`): [`ReadFilePromise`](../modules/internal_.md#readfilepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

[`ReadFilePromise`](../modules/internal_.md#readfilepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L229)

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
| `category` | ``null`` \| [`NotificationScopes`](../interfaces/internal_.NotificationScopes.md)[`Scope`] |  |
| `message` | `string` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7098](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7098)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[removeAllListeners](internal_.EventEmitter-1.md#removealllisteners)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[removeListener](internal_.EventEmitter-1.md#removelistener)

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
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6400](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6400)

▸ **rename**(`adapterName`, `oldName`, `newName`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `oldName` | `string` |
| `newName` | `string` |
| `options` | `unknown` |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6401](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6401)

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

[packages/adapter/src/lib/adapter/adapter.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L226)

___

### restart

▸ **restart**(): `void`

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2304](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2304)

___

### sendTo

▸ **sendTo**(`instanceName`, `message`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceName` | `string` |  |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |  |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6806](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6806)

▸ **sendTo**(`instanceName`, `command`, `message`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceName` | `string` |  |
| `command` | `string` |  |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |  |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6811](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6811)

___

### sendToAsync

▸ **sendToAsync**(`instanceName`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L361)

▸ **sendToAsync**(`instanceName`, `command`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `command` | `string` |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L362)

___

### sendToHost

▸ **sendToHost**(`hostName`, `message`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` |  |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |  |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6965](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6965)

▸ **sendToHost**(`hostName`, `command`, `message`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` |  |
| `command` | `string` |  |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |  |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6970](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6970)

___

### sendToHostAsync

▸ **sendToHostAsync**(`hostName`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostName` | `string` |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L351)

▸ **sendToHostAsync**(`hostName`, `command`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostName` | `string` |
| `command` | `string` |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:352](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L352)

___

### setBinaryState

▸ **setBinaryState**(`id`, `binary`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) |  |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10016](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10016)

▸ **setBinaryState**(`id`, `binary`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) |  |
| `options` | `unknown` | - |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10017](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L10017)

___

### setBinaryStateAsync

▸ **setBinaryStateAsync**(`id`, `binary`, `options?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) |
| `options?` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L259)

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

[packages/adapter/src/lib/adapter/adapter.ts:120](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L120)

___

### setForeignBinaryState

▸ **setForeignBinaryState**(`id`, `binary`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) |  |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9875](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9875)

▸ **setForeignBinaryState**(`id`, `binary`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) |  |
| `options` | `unknown` | - |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9876](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9876)

___

### setForeignBinaryStateAsync

▸ **setForeignBinaryStateAsync**(`id`, `binary`, `options?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) |
| `options?` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L253)

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
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> |  |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3124](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3124)

▸ **setForeignObject**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> |  |
| `options` | `unknown` | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3129](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L3129)

___

### setForeignObjectAsync

▸ **setForeignObjectAsync**<`T`\>(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L295)

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
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> |  |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4701](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4701)

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` |  |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> |  |
| `options` | `unknown` | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4706](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4706)

___

### setForeignObjectNotExistsAsync

▸ **setForeignObjectNotExistsAsync**<`T`\>(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `T` |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L172)

___

### setForeignState

▸ **setForeignState**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8024](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8024)

▸ **setForeignState**(`id`, `state`, `ack`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `ack` | `boolean` | - |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8029](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8029)

▸ **setForeignState**(`id`, `state`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `options` | `unknown` | - |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8035](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8035)

▸ **setForeignState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8041](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8041)

___

### setForeignStateAsync

▸ **setForeignStateAsync**(`id`, `state`, `ack?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack?` | `boolean` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:397](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L397)

▸ **setForeignStateAsync**(`id`, `state`, `options?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `options?` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:402](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L402)

▸ **setForeignStateAsync**(`id`, `state`, `ack`, `options`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:407](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L407)

___

### setForeignStateChanged

▸ **setForeignStateChanged**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8333](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8333)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `ack` | `boolean` | - |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8338](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8338)

▸ **setForeignStateChanged**(`id`, `state`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `options` | `unknown` | - |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8344](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8344)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8350](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L8350)

___

### setForeignStateChangedAsync

▸ **setForeignStateChangedAsync**(`id`, `state`, `ack?`): [`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack?` | `boolean` |

#### Returns

[`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L311)

▸ **setForeignStateChangedAsync**(`id`, `state`, `options?`): [`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `options?` | `unknown` |

#### Returns

[`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L316)

▸ **setForeignStateChangedAsync**(`id`, `state`, `ack`, `options`): [`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

[`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L321)

___

### setInterval

▸ **setInterval**(`cb`, `timeout`, ...`args`): `void` \| [`Timeout`](../interfaces/internal_.Timeout.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | [`TimeoutCallback`](../modules/internal_.md#timeoutcallback) |  |
| `timeout` | `number` |  |
| `...args` | `any`[] |  |

#### Returns

`void` \| [`Timeout`](../interfaces/internal_.Timeout.md)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2504](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2504)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[setMaxListeners](internal_.EventEmitter-1.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### setObject

▸ **setObject**(`id`, `obj`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules/internal_.md#id) |  |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |  |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2552](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2552)

▸ **setObject**(`id`, `obj`, `options`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules/internal_.md#id) |  |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |  |
| `options` | `unknown` | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2553](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2553)

▸ **setObject**(`id`, `obj`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules/internal_.md#id) |  |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |  |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2559](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2559)

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L293)

___

### setObjectNotExists

▸ **setObjectNotExists**(`id`, `obj`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |  |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4600](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4600)

▸ **setObjectNotExists**(`id`, `obj`, `options`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |  |
| `options` | `unknown` | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4605](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4605)

___

### setObjectNotExistsAsync

▸ **setObjectNotExistsAsync**(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L170)

___

### setPassword

▸ **setPassword**(`user`, `pw`, `options`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1620](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1620)

▸ **setPassword**(`user`, `pw`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1627](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1627)

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

[packages/adapter/src/lib/adapter/adapter.ts:283](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L283)

___

### setSession

▸ **setSession**(`id`, `ttl`, `data`, `callback?`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `ttl` | `number` |
| `data` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1247](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1247)

___

### setState

▸ **setState**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7136](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7136)

▸ **setState**(`id`, `state`, `ack`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `ack` | `boolean` | - |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7141](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7141)

▸ **setState**(`id`, `state`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `options` | `unknown` | - |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7147](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7147)

▸ **setState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7153](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7153)

___

### setStateAsync

▸ **setStateAsync**(`id`, `state`, `ack?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack?` | `boolean` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L377)

▸ **setStateAsync**(`id`, `state`, `options?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `options?` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L382)

▸ **setStateAsync**(`id`, `state`, `ack`, `options`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L387)

___

### setStateChanged

▸ **setStateChanged**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7878](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7878)

▸ **setStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `ack` | `boolean` | - |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7883](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7883)

▸ **setStateChanged**(`id`, `state`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `options` | `unknown` | - |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7889](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7889)

▸ **setStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |  |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7895](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L7895)

___

### setStateChangedAsync

▸ **setStateChangedAsync**(`id`, `state`, `ack?`): [`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack?` | `boolean` |

#### Returns

[`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:331](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L331)

▸ **setStateChangedAsync**(`id`, `state`, `options?`): [`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `options?` | `unknown` |

#### Returns

[`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L336)

▸ **setStateChangedAsync**(`id`, `state`, `ack`, `options`): [`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

[`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L341)

___

### setTimeout

▸ **setTimeout**(`cb`, `timeout`, ...`args`): `void` \| [`Timeout`](../interfaces/internal_.Timeout.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | [`TimeoutCallback`](../modules/internal_.md#timeoutcallback) |  |
| `timeout` | `number` |  |
| `...args` | `any`[] |  |

#### Returns

`void` \| [`Timeout`](../interfaces/internal_.Timeout.md)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2422](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2422)

___

### subscribeForeignFiles

▸ **subscribeForeignFiles**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4539](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4539)

▸ **subscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4540](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4540)

___

### subscribeForeignObjects

▸ **subscribeForeignObjects**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4460](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4460)

▸ **subscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4461](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4461)

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

[packages/adapter/src/lib/adapter/adapter.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L166)

___

### subscribeForeignStates

▸ **subscribeForeignStates**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9402](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9402)

▸ **subscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9403](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9403)

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

[packages/adapter/src/lib/adapter/adapter.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L245)

___

### subscribeObjects

▸ **subscribeObjects**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4373](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4373)

▸ **subscribeObjects**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4374](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4374)

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

[packages/adapter/src/lib/adapter/adapter.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L160)

___

### subscribeStates

▸ **subscribeStates**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9789](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9789)

▸ **subscribeStates**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9790](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9790)

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

[packages/adapter/src/lib/adapter/adapter.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L249)

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

[packages/adapter/src/lib/adapter/adapter.ts:1463](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1463)

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

[packages/adapter/src/lib/adapter/adapter.ts:1313](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1313)

▸ **terminate**(`reason?`, `exitCode?`): `never`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `string` |  |
| `exitCode?` | `number` |  |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1314](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L1314)

___

### unlink

▸ **unlink**(`adapterName`, `path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6372](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6372)

▸ **unlink**(`adapterName`, `path`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `unknown` |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6373](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6373)

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

[packages/adapter/src/lib/adapter/adapter.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L223)

___

### unsubscribeForeignFiles

▸ **unsubscribeForeignFiles**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4568](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4568)

▸ **unsubscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4569](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4569)

___

### unsubscribeForeignObjects

▸ **unsubscribeForeignObjects**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4498](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4498)

▸ **unsubscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4499](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4499)

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

[packages/adapter/src/lib/adapter/adapter.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L168)

___

### unsubscribeForeignStates

▸ **unsubscribeForeignStates**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9641](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9641)

▸ **unsubscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9642](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9642)

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

[packages/adapter/src/lib/adapter/adapter.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L247)

___

### unsubscribeObjects

▸ **unsubscribeObjects**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4416](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4416)

▸ **unsubscribeObjects**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4417](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L4417)

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

[packages/adapter/src/lib/adapter/adapter.ts:162](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L162)

___

### unsubscribeStates

▸ **unsubscribeStates**(`pattern`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9831](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9831)

▸ **unsubscribeStates**(`pattern`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` |  |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9832](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L9832)

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

[packages/adapter/src/lib/adapter/adapter.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L251)

___

### updateConfig

▸ **updateConfig**(`newConfig`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2313](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L2313)

___

### writeFile

▸ **writeFile**(`adapterName`, `path`, `data`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| [`Buffer`](../modules/internal_.md#buffer) |  |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6511](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6511)

▸ **writeFile**(`adapterName`, `path`, `data`, `options`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| [`Buffer`](../modules/internal_.md#buffer) |  |
| `options` | `unknown` | - |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6512](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L6512)

___

### writeFileAsync

▸ **writeFileAsync**(`adapterName`, `path`, `data`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `data` | `string` \| [`Buffer`](../modules/internal_.md#buffer) |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/8ea66616/packages/adapter/src/lib/adapter/adapter.ts#L230)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| [`DOMEventTarget`](../interfaces/internal_.DOMEventTarget.md) |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[getEventListeners](internal_.EventEmitter-1.md#geteventlisteners)

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

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[listenerCount](internal_.EventEmitter-1.md#listenercount-1)

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): [`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` |  |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) | - |

#### Returns

[`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[on](internal_.EventEmitter-1.md#on-1)

#### Defined in

node_modules/@types/node/events.d.ts:217

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`NodeEventTarget`](../interfaces/internal_.NodeEventTarget.md) |
| `eventName` | `string` \| `symbol` |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:157

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`DOMEventTarget`](../interfaces/internal_.DOMEventTarget.md) |
| `eventName` | `string` |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:158
