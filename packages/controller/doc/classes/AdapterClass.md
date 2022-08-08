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

[packages/adapter/src/lib/adapter/adapter.ts:974](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L974)

## Properties

### FORBIDDEN\_CHARS

• `Protected` `Readonly` **FORBIDDEN\_CHARS**: `RegExp`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L921)

___

### adapterConfig

• `Protected` `Optional` **adapterConfig**: ``null`` \| `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:936](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L936)

___

### adapterDir

• `Protected` **adapterDir**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:938](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L938)

___

### adapterReady

• `Protected` **adapterReady**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:891](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L891)

___

### common

• `Protected` `Optional` **common**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L961)

___

### config

• `Protected` `Optional` **config**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:959](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L959)

___

### connected

• `Protected` `Optional` **connected**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:937](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L937)

___

### dateFormat

• `Protected` `Optional` **dateFormat**: `any`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:948](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L948)

___

### host

• `Protected` `Optional` **host**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L960)

___

### instance

• `Protected` `Optional` **instance**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:932](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L932)

___

### ioPack

• `Protected` **ioPack**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:942](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L942)

___

### isFloatComma

• `Protected` `Optional` **isFloatComma**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:950](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L950)

___

### kill

• `Protected` `Optional` **kill**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L965)

___

### language

• `Protected` `Optional` **language**: `Languages`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:952](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L952)

___

### latitude

• `Protected` `Optional` **latitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L956)

___

### log

• `Protected` `Optional` **log**: `Log`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:910](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L910)

___

### longitude

• `Protected` `Optional` **longitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:954](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L954)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:917](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L917)

___

### namespace

• `Protected` **namespace**: \`${string}.${number}\`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L916)

___

### oObjects

• `Protected` `Optional` **oObjects**: `Record`<`string`, `undefined` \| `Object`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:903](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L903)

___

### oStates

• `Protected` `Optional` **oStates**: `Record`<`string`, `undefined` \| `State`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:898](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L898)

___

### pack

• `Protected` `Optional` **pack**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:940](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L940)

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

[packages/adapter/src/lib/adapter/adapter.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L966)

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

[packages/adapter/src/lib/adapter/adapter.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L967)

___

### stop

• `Protected` `Optional` **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L963)

___

### systemConfig

• `Protected` `Optional` **systemConfig**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:946](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L946)

___

### version

• `Protected` `Optional` **version**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:964](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L964)

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

[packages/adapter/src/lib/adapter/adapter.ts:5598](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5598)

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

[packages/adapter/src/lib/adapter/adapter.ts:5605](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5605)

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

[packages/adapter/src/lib/adapter/adapter.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L321)

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

[packages/adapter/src/lib/adapter/adapter.ts:6283](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6283)

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

[packages/adapter/src/lib/adapter/adapter.ts:6291](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6291)

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

[packages/adapter/src/lib/adapter/adapter.ts:338](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L338)

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

[packages/adapter/src/lib/adapter/adapter.ts:2161](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2161)

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

[packages/adapter/src/lib/adapter/adapter.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L428)

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

[packages/adapter/src/lib/adapter/adapter.ts:2074](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2074)

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

[packages/adapter/src/lib/adapter/adapter.ts:426](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L426)

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

[packages/adapter/src/lib/adapter/adapter.ts:1839](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1839)

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

[packages/adapter/src/lib/adapter/adapter.ts:422](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L422)

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

[packages/adapter/src/lib/adapter/adapter.ts:6561](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6561)

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

[packages/adapter/src/lib/adapter/adapter.ts:354](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L354)

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

[packages/adapter/src/lib/adapter/adapter.ts:6606](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6606)

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

[packages/adapter/src/lib/adapter/adapter.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L360)

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

[packages/adapter/src/lib/adapter/adapter.ts:2884](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2884)

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

[packages/adapter/src/lib/adapter/adapter.ts:2807](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2807)

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

[packages/adapter/src/lib/adapter/adapter.ts:5239](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5239)

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

[packages/adapter/src/lib/adapter/adapter.ts:5240](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5240)

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

[packages/adapter/src/lib/adapter/adapter.ts:5246](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5246)

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

[packages/adapter/src/lib/adapter/adapter.ts:5253](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5253)

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

[packages/adapter/src/lib/adapter/adapter.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L595)

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

[packages/adapter/src/lib/adapter/adapter.ts:600](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L600)

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

[packages/adapter/src/lib/adapter/adapter.ts:606](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L606)

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

[packages/adapter/src/lib/adapter/adapter.ts:5165](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5165)

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

[packages/adapter/src/lib/adapter/adapter.ts:5166](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5166)

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

[packages/adapter/src/lib/adapter/adapter.ts:5171](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5171)

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

[packages/adapter/src/lib/adapter/adapter.ts:5177](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5177)

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

[packages/adapter/src/lib/adapter/adapter.ts:574](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L574)

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

[packages/adapter/src/lib/adapter/adapter.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L575)

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

[packages/adapter/src/lib/adapter/adapter.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L580)

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

[packages/adapter/src/lib/adapter/adapter.ts:5324](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5324)

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

[packages/adapter/src/lib/adapter/adapter.ts:5330](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5330)

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

[packages/adapter/src/lib/adapter/adapter.ts:5337](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5337)

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

[packages/adapter/src/lib/adapter/adapter.ts:5345](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5345)

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

[packages/adapter/src/lib/adapter/adapter.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L617)

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

[packages/adapter/src/lib/adapter/adapter.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L623)

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

[packages/adapter/src/lib/adapter/adapter.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L630)

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

[packages/adapter/src/lib/adapter/adapter.ts:1538](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1538)

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

[packages/adapter/src/lib/adapter/adapter.ts:10468](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10468)

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

[packages/adapter/src/lib/adapter/adapter.ts:10469](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10469)

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

[packages/adapter/src/lib/adapter/adapter.ts:414](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L414)

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

[packages/adapter/src/lib/adapter/adapter.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L512)

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

[packages/adapter/src/lib/adapter/adapter.ts:513](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L513)

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

[packages/adapter/src/lib/adapter/adapter.ts:366](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L366)

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

[packages/adapter/src/lib/adapter/adapter.ts:10409](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10409)

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

[packages/adapter/src/lib/adapter/adapter.ts:10410](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10410)

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

[packages/adapter/src/lib/adapter/adapter.ts:408](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L408)

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

[packages/adapter/src/lib/adapter/adapter.ts:4609](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4609)

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

[packages/adapter/src/lib/adapter/adapter.ts:4610](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4610)

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

[packages/adapter/src/lib/adapter/adapter.ts:299](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L299)

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

[packages/adapter/src/lib/adapter/adapter.ts:9250](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9250)

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

[packages/adapter/src/lib/adapter/adapter.ts:9251](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9251)

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

[packages/adapter/src/lib/adapter/adapter.ts:380](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L380)

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

[packages/adapter/src/lib/adapter/adapter.ts:4549](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4549)

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

[packages/adapter/src/lib/adapter/adapter.ts:4550](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4550)

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

[packages/adapter/src/lib/adapter/adapter.ts:297](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L297)

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

[packages/adapter/src/lib/adapter/adapter.ts:9215](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9215)

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

[packages/adapter/src/lib/adapter/adapter.ts:9216](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9216)

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

[packages/adapter/src/lib/adapter/adapter.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L378)

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

[packages/adapter/src/lib/adapter/adapter.ts:2822](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2822)

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

[packages/adapter/src/lib/adapter/adapter.ts:5846](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5846)

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

[packages/adapter/src/lib/adapter/adapter.ts:5847](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5847)

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

[packages/adapter/src/lib/adapter/adapter.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L642)

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

[packages/adapter/src/lib/adapter/adapter.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L643)

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

[packages/adapter/src/lib/adapter/adapter.ts:5731](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5731)

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

[packages/adapter/src/lib/adapter/adapter.ts:5737](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5737)

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

[packages/adapter/src/lib/adapter/adapter.ts:328](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L328)

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

[packages/adapter/src/lib/adapter/adapter.ts:5532](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5532)

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

[packages/adapter/src/lib/adapter/adapter.ts:5533](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5533)

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

[packages/adapter/src/lib/adapter/adapter.ts:320](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L320)

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

[packages/adapter/src/lib/adapter/adapter.ts:5953](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5953)

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

[packages/adapter/src/lib/adapter/adapter.ts:5954](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5954)

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

[packages/adapter/src/lib/adapter/adapter.ts:5955](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5955)

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

[packages/adapter/src/lib/adapter/adapter.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L648)

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

[packages/adapter/src/lib/adapter/adapter.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L649)

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

[packages/adapter/src/lib/adapter/adapter.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L650)

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

[packages/adapter/src/lib/adapter/adapter.ts:6430](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6430)

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

[packages/adapter/src/lib/adapter/adapter.ts:6437](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6437)

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

[packages/adapter/src/lib/adapter/adapter.ts:346](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L346)

___

### destroySession

▸ **destroySession**(`id`, `callback?`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1625](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1625)

___

### disable

▸ **disable**(): `SetObjectPromise`

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2700](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2700)

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

[packages/adapter/src/lib/adapter/adapter.ts:1557](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1557)

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

[packages/adapter/src/lib/adapter/adapter.ts:3576](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3576)

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

[packages/adapter/src/lib/adapter/adapter.ts:3581](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3581)

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

[packages/adapter/src/lib/adapter/adapter.ts:269](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L269)

___

### extendObject

▸ **extendObject**(`id`, `objPart`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `objPart` | `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3199](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3199)

▸ **extendObject**(`id`, `objPart`, `options`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `objPart` | `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } | - |
| `options` | `ExtendObjectOptions` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3200](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3200)

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `objPart`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `objPart` | `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } |
| `options?` | `ExtendObjectOptions` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:255](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L255)

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

[packages/adapter/src/lib/adapter/adapter.ts:6919](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6919)

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

[packages/adapter/src/lib/adapter/adapter.ts:6920](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6920)

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

[packages/adapter/src/lib/adapter/adapter.ts:373](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L373)

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

[packages/adapter/src/lib/adapter/adapter.ts:4428](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4428)

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

[packages/adapter/src/lib/adapter/adapter.ts:4429](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4429)

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

[packages/adapter/src/lib/adapter/adapter.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L590)

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

[packages/adapter/src/lib/adapter/adapter.ts:7002](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7002)

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

[packages/adapter/src/lib/adapter/adapter.ts:7003](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7003)

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

[packages/adapter/src/lib/adapter/adapter.ts:6967](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6967)

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

[packages/adapter/src/lib/adapter/adapter.ts:6968](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6968)

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

[packages/adapter/src/lib/adapter/adapter.ts:3117](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3117)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Returns

`Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:444](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L444)

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

[packages/adapter/src/lib/adapter/adapter.ts:10392](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10392)

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

[packages/adapter/src/lib/adapter/adapter.ts:10393](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10393)

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

[packages/adapter/src/lib/adapter/adapter.ts:406](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L406)

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

[packages/adapter/src/lib/adapter/adapter.ts:2544](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2544)

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

[packages/adapter/src/lib/adapter/adapter.ts:442](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L442)

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

[packages/adapter/src/lib/adapter/adapter.ts:662](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L662)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:663](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L663)

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

[packages/adapter/src/lib/adapter/adapter.ts:664](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L664)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<`ChannelObject`[]\>

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L674)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L675)

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

[packages/adapter/src/lib/adapter/adapter.ts:6109](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6109)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6110](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6110)

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

[packages/adapter/src/lib/adapter/adapter.ts:6111](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6111)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<`ChannelObject`[]\>

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L656)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:657](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L657)

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

[packages/adapter/src/lib/adapter/adapter.ts:6055](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6055)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`DeviceObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6056](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6056)

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

[packages/adapter/src/lib/adapter/adapter.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L336)

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

[packages/adapter/src/lib/adapter/adapter.ts:2717](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2717)

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

[packages/adapter/src/lib/adapter/adapter.ts:3995](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3995)

▸ **getEnum**(`name`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `callback` | `GetEnumCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3996](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3996)

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

[packages/adapter/src/lib/adapter/adapter.ts:3997](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3997)

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

[packages/adapter/src/lib/adapter/adapter.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L293)

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

[packages/adapter/src/lib/adapter/adapter.ts:4084](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4084)

▸ **getEnums**(`enumList`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `callback` | `GetEnumsCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4085](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4085)

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

[packages/adapter/src/lib/adapter/adapter.ts:4086](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4086)

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

[packages/adapter/src/lib/adapter/adapter.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L295)

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

[packages/adapter/src/lib/adapter/adapter.ts:10318](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10318)

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

[packages/adapter/src/lib/adapter/adapter.ts:10319](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10319)

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

[packages/adapter/src/lib/adapter/adapter.ts:401](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L401)

___

### getForeignObject

▸ **getForeignObject**<`T`\>(`id`, `callback`): `void` \| `Promise`<`void`\>

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

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4482](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4482)

▸ **getForeignObject**<`T`\>(`id`, `options`, `callback`): `void` \| `Promise`<`void`\>

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

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4483](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4483)

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

[packages/adapter/src/lib/adapter/adapter.ts:447](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L447)

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

[packages/adapter/src/lib/adapter/adapter.ts:4231](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4231)

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

[packages/adapter/src/lib/adapter/adapter.ts:4232](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4232)

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

[packages/adapter/src/lib/adapter/adapter.ts:4233](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4233)

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

[packages/adapter/src/lib/adapter/adapter.ts:4238](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4238)

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

[packages/adapter/src/lib/adapter/adapter.ts:4244](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4244)

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

[packages/adapter/src/lib/adapter/adapter.ts:4250](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4250)

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

[packages/adapter/src/lib/adapter/adapter.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L558)

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

[packages/adapter/src/lib/adapter/adapter.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L564)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): `GetObjectsPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetObjectsPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L569)

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

[packages/adapter/src/lib/adapter/adapter.ts:8833](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8833)

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

[packages/adapter/src/lib/adapter/adapter.ts:8834](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8834)

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

[packages/adapter/src/lib/adapter/adapter.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L420)

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

[packages/adapter/src/lib/adapter/adapter.ts:9422](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9422)

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

[packages/adapter/src/lib/adapter/adapter.ts:9423](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9423)

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

[packages/adapter/src/lib/adapter/adapter.ts:384](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L384)

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

[packages/adapter/src/lib/adapter/adapter.ts:9112](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9112)

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

[packages/adapter/src/lib/adapter/adapter.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L376)

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

[packages/adapter/src/lib/adapter/adapter.ts:3780](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3780)

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

[packages/adapter/src/lib/adapter/adapter.ts:3781](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3781)

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

[packages/adapter/src/lib/adapter/adapter.ts:275](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L275)

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

[packages/adapter/src/lib/adapter/adapter.ts:3939](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3939)

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

[packages/adapter/src/lib/adapter/adapter.ts:3940](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3940)

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

[packages/adapter/src/lib/adapter/adapter.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L288)

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

[packages/adapter/src/lib/adapter/adapter.ts:3823](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3823)

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

[packages/adapter/src/lib/adapter/adapter.ts:3829](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3829)

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

[packages/adapter/src/lib/adapter/adapter.ts:281](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L281)

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

[packages/adapter/src/lib/adapter/adapter.ts:10504](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10504)

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

[packages/adapter/src/lib/adapter/adapter.ts:10486](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10486)

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

[packages/adapter/src/lib/adapter/adapter.ts:1753](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1753)

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

[packages/adapter/src/lib/adapter/adapter.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L418)

___

### getSession

▸ **getSession**(`id`, `callback`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback` | `GetSessionCallback` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1576](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1576)

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

[packages/adapter/src/lib/adapter/adapter.ts:8802](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8802)

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

[packages/adapter/src/lib/adapter/adapter.ts:8803](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8803)

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

[packages/adapter/src/lib/adapter/adapter.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L305)

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

[packages/adapter/src/lib/adapter/adapter.ts:9297](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9297)

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

[packages/adapter/src/lib/adapter/adapter.ts:9298](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9298)

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

[packages/adapter/src/lib/adapter/adapter.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L382)

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

[packages/adapter/src/lib/adapter/adapter.ts:6178](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6178)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6179](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6179)

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

[packages/adapter/src/lib/adapter/adapter.ts:6180](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6180)

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

[packages/adapter/src/lib/adapter/adapter.ts:6185](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6185)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<`StateObject`[]\>

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L682)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<`StateObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L683)

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

[packages/adapter/src/lib/adapter/adapter.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L684)

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

[packages/adapter/src/lib/adapter/adapter.ts:10550](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10550)

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

[packages/adapter/src/lib/adapter/adapter.ts:1939](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1939)

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

[packages/adapter/src/lib/adapter/adapter.ts:9183](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9183)

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

[packages/adapter/src/lib/adapter/adapter.ts:6778](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6778)

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

[packages/adapter/src/lib/adapter/adapter.ts:6779](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6779)

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

[packages/adapter/src/lib/adapter/adapter.ts:368](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L368)

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

[packages/adapter/src/lib/adapter/adapter.ts:6652](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6652)

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

[packages/adapter/src/lib/adapter/adapter.ts:6653](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6653)

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

[packages/adapter/src/lib/adapter/adapter.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L362)

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

[packages/adapter/src/lib/adapter/adapter.ts:6804](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6804)

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

[packages/adapter/src/lib/adapter/adapter.ts:6805](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6805)

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

[packages/adapter/src/lib/adapter/adapter.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L370)

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

[packages/adapter/src/lib/adapter/adapter.ts:7434](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7434)

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

[packages/adapter/src/lib/adapter/adapter.ts:6744](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6744)

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

[packages/adapter/src/lib/adapter/adapter.ts:6745](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6745)

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

[packages/adapter/src/lib/adapter/adapter.ts:367](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L367)

___

### restart

▸ **restart**(): `void`

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2650](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2650)

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

[packages/adapter/src/lib/adapter/adapter.ts:7142](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7142)

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

[packages/adapter/src/lib/adapter/adapter.ts:7147](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7147)

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

[packages/adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L502)

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

[packages/adapter/src/lib/adapter/adapter.ts:503](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L503)

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

[packages/adapter/src/lib/adapter/adapter.ts:7301](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7301)

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

[packages/adapter/src/lib/adapter/adapter.ts:7306](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7306)

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

[packages/adapter/src/lib/adapter/adapter.ts:492](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L492)

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

[packages/adapter/src/lib/adapter/adapter.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L493)

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

[packages/adapter/src/lib/adapter/adapter.ts:10299](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10299)

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

[packages/adapter/src/lib/adapter/adapter.ts:10300](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10300)

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

[packages/adapter/src/lib/adapter/adapter.ts:400](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L400)

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

[packages/adapter/src/lib/adapter/adapter.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L261)

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

[packages/adapter/src/lib/adapter/adapter.ts:10158](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10158)

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

[packages/adapter/src/lib/adapter/adapter.ts:10159](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10159)

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

[packages/adapter/src/lib/adapter/adapter.ts:394](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L394)

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

[packages/adapter/src/lib/adapter/adapter.ts:3469](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3469)

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

[packages/adapter/src/lib/adapter/adapter.ts:3474](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L3474)

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

[packages/adapter/src/lib/adapter/adapter.ts:436](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L436)

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

[packages/adapter/src/lib/adapter/adapter.ts:5050](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5050)

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

[packages/adapter/src/lib/adapter/adapter.ts:5055](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L5055)

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

[packages/adapter/src/lib/adapter/adapter.ts:313](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L313)

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

[packages/adapter/src/lib/adapter/adapter.ts:8360](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8360)

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

[packages/adapter/src/lib/adapter/adapter.ts:8365](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8365)

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

[packages/adapter/src/lib/adapter/adapter.ts:8371](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8371)

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

[packages/adapter/src/lib/adapter/adapter.ts:8377](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8377)

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

[packages/adapter/src/lib/adapter/adapter.ts:538](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L538)

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

[packages/adapter/src/lib/adapter/adapter.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L543)

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

[packages/adapter/src/lib/adapter/adapter.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L548)

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

[packages/adapter/src/lib/adapter/adapter.ts:8669](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8669)

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

[packages/adapter/src/lib/adapter/adapter.ts:8674](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8674)

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

[packages/adapter/src/lib/adapter/adapter.ts:8680](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8680)

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

[packages/adapter/src/lib/adapter/adapter.ts:8686](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8686)

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

[packages/adapter/src/lib/adapter/adapter.ts:452](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L452)

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

[packages/adapter/src/lib/adapter/adapter.ts:457](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L457)

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

[packages/adapter/src/lib/adapter/adapter.ts:462](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L462)

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

[packages/adapter/src/lib/adapter/adapter.ts:2850](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2850)

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
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |  |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2898](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2898)

▸ **setObject**(`id`, `obj`, `options`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` |  |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |  |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2899](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2899)

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L434)

___

### setObjectNotExists

▸ **setObjectNotExists**(`id`, `obj`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |  |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4949](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4949)

▸ **setObjectNotExists**(`id`, `obj`, `options`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |  |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4954](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4954)

___

### setObjectNotExistsAsync

▸ **setObjectNotExistsAsync**(`id`, `obj`, `options?`): `SetObjectPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L311)

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

[packages/adapter/src/lib/adapter/adapter.ts:1970](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1970)

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

[packages/adapter/src/lib/adapter/adapter.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L424)

___

### setSession

▸ **setSession**(`id`, `ttl`, `data`, `callback?`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `ttl` | `number` |
| `data` | `Record`<`string`, `any`\> |
| `callback?` | `ErrorCallback` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1597](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1597)

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

[packages/adapter/src/lib/adapter/adapter.ts:7472](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7472)

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

[packages/adapter/src/lib/adapter/adapter.ts:7477](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7477)

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

[packages/adapter/src/lib/adapter/adapter.ts:7483](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7483)

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

[packages/adapter/src/lib/adapter/adapter.ts:7489](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L7489)

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

[packages/adapter/src/lib/adapter/adapter.ts:518](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L518)

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

[packages/adapter/src/lib/adapter/adapter.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L523)

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

[packages/adapter/src/lib/adapter/adapter.ts:528](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L528)

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

[packages/adapter/src/lib/adapter/adapter.ts:8214](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8214)

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

[packages/adapter/src/lib/adapter/adapter.ts:8219](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8219)

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

[packages/adapter/src/lib/adapter/adapter.ts:8225](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8225)

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

[packages/adapter/src/lib/adapter/adapter.ts:8231](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L8231)

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

[packages/adapter/src/lib/adapter/adapter.ts:472](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L472)

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

[packages/adapter/src/lib/adapter/adapter.ts:477](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L477)

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

[packages/adapter/src/lib/adapter/adapter.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L482)

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

[packages/adapter/src/lib/adapter/adapter.ts:2768](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2768)

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

[packages/adapter/src/lib/adapter/adapter.ts:4888](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4888)

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

[packages/adapter/src/lib/adapter/adapter.ts:4889](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4889)

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

[packages/adapter/src/lib/adapter/adapter.ts:4809](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4809)

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

[packages/adapter/src/lib/adapter/adapter.ts:4810](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4810)

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

[packages/adapter/src/lib/adapter/adapter.ts:307](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L307)

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

[packages/adapter/src/lib/adapter/adapter.ts:9685](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9685)

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

[packages/adapter/src/lib/adapter/adapter.ts:9686](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9686)

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

[packages/adapter/src/lib/adapter/adapter.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L386)

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

[packages/adapter/src/lib/adapter/adapter.ts:4722](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4722)

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

[packages/adapter/src/lib/adapter/adapter.ts:4723](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4723)

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

[packages/adapter/src/lib/adapter/adapter.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L301)

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

[packages/adapter/src/lib/adapter/adapter.ts:10072](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10072)

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

[packages/adapter/src/lib/adapter/adapter.ts:10073](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10073)

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

[packages/adapter/src/lib/adapter/adapter.ts:390](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L390)

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

[packages/adapter/src/lib/adapter/adapter.ts:1815](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1815)

___

### terminate

▸ **terminate**(`reason?`, `exitCode?`): `never`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `string` \| `number` |  |
| `exitCode?` | `number` |  |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1668](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L1668)

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

[packages/adapter/src/lib/adapter/adapter.ts:6716](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6716)

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

[packages/adapter/src/lib/adapter/adapter.ts:6717](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6717)

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

[packages/adapter/src/lib/adapter/adapter.ts:364](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L364)

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

[packages/adapter/src/lib/adapter/adapter.ts:4917](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4917)

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

[packages/adapter/src/lib/adapter/adapter.ts:4918](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4918)

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

[packages/adapter/src/lib/adapter/adapter.ts:4847](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4847)

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

[packages/adapter/src/lib/adapter/adapter.ts:4848](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4848)

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

[packages/adapter/src/lib/adapter/adapter.ts:309](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L309)

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

[packages/adapter/src/lib/adapter/adapter.ts:9924](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9924)

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

[packages/adapter/src/lib/adapter/adapter.ts:9925](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L9925)

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

[packages/adapter/src/lib/adapter/adapter.ts:388](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L388)

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

[packages/adapter/src/lib/adapter/adapter.ts:4765](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4765)

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

[packages/adapter/src/lib/adapter/adapter.ts:4766](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L4766)

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

[packages/adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L303)

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

[packages/adapter/src/lib/adapter/adapter.ts:10114](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10114)

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

[packages/adapter/src/lib/adapter/adapter.ts:10115](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L10115)

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

[packages/adapter/src/lib/adapter/adapter.ts:392](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L392)

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

[packages/adapter/src/lib/adapter/adapter.ts:2659](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L2659)

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

[packages/adapter/src/lib/adapter/adapter.ts:6855](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6855)

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

[packages/adapter/src/lib/adapter/adapter.ts:6856](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L6856)

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

[packages/adapter/src/lib/adapter/adapter.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/2ceed925/packages/adapter/src/lib/adapter/adapter.ts#L371)

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
