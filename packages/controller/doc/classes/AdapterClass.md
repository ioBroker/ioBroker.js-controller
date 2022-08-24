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

[packages/adapter/src/lib/adapter/adapter.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L655)

## Properties

### FORBIDDEN\_CHARS

• `Protected` `Readonly` **FORBIDDEN\_CHARS**: `RegExp` = `FORBIDDEN_CHARS`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L599)

___

### adapterConfig

• `Protected` `Optional` **adapterConfig**: ``null`` \| `AdapterConfig`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L617)

___

### adapterDir

• `Protected` **adapterDir**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L619)

___

### adapterReady

• `Protected` **adapterReady**: `boolean` = `false`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:566](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L566)

___

### common

• `Protected` `Optional` **common**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L642)

___

### config

• `Protected` `Optional` **config**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L640)

___

### connected

• `Protected` `Optional` **connected**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L618)

___

### dateFormat

• `Protected` `Optional` **dateFormat**: `any`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L629)

___

### host

• `Protected` `Optional` **host**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L641)

___

### instance

• `Protected` `Optional` **instance**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L613)

___

### ioPack

• `Protected` **ioPack**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L623)

___

### isFloatComma

• `Protected` `Optional` **isFloatComma**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L631)

___

### kill

• `Protected` `Optional` **kill**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L646)

___

### language

• `Protected` `Optional` **language**: `Languages`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L633)

___

### latitude

• `Protected` `Optional` **latitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L637)

___

### log

• `Protected` `Optional` **log**: `Log`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:585](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L585)

___

### longitude

• `Protected` `Optional` **longitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L635)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L592)

___

### namespace

• `Protected` **namespace**: \`${string}.${number}\`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L591)

___

### oObjects

• `Protected` `Optional` **oObjects**: `Record`<`string`, `undefined` \| `Object`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:578](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L578)

___

### oStates

• `Protected` `Optional` **oStates**: `Record`<`string`, `undefined` \| `State`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:573](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L573)

___

### pack

• `Protected` `Optional` **pack**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L621)

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

[packages/adapter/src/lib/adapter/adapter.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L647)

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

[packages/adapter/src/lib/adapter/adapter.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L648)

___

### stop

• `Protected` `Optional` **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L644)

___

### systemConfig

• `Protected` `Optional` **systemConfig**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L627)

___

### version

• `Protected` `Optional` **version**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L645)

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

[packages/adapter/src/lib/adapter/adapter.ts:8994](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8994)

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

[packages/adapter/src/lib/adapter/adapter.ts:8950](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8950)

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

[packages/adapter/src/lib/adapter/adapter.ts:5254](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5254)

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

[packages/adapter/src/lib/adapter/adapter.ts:5261](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5261)

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

[packages/adapter/src/lib/adapter/adapter.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L181)

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

[packages/adapter/src/lib/adapter/adapter.ts:5940](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5940)

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

[packages/adapter/src/lib/adapter/adapter.ts:5948](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5948)

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

[packages/adapter/src/lib/adapter/adapter.ts:198](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L198)

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

[packages/adapter/src/lib/adapter/adapter.ts:1811](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1811)

▸ **calculatePermissions**(`user`, `commandsPermissions`, `callback?`): `Promise`<`void` \| `PermissionSet`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `commandsPermissions` | `CommandsPermissions` |  |
| `callback?` | `CalculatePermissionsCallback` | - |

#### Returns

`Promise`<`void` \| `PermissionSet`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1817](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1817)

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

[packages/adapter/src/lib/adapter/adapter.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L288)

___

### checkGroup

▸ **checkGroup**(`user`, `group`, `options`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `group` | `string` |  |
| `options` | `Record`<`string`, `any`\> | - |
| `callback?` | `CheckGroupCallback` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1727](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1727)

▸ **checkGroup**(`user`, `group`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `group` | `string` |  |
| `callback?` | `CheckGroupCallback` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1728](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1728)

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

[packages/adapter/src/lib/adapter/adapter.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L286)

___

### checkPassword

▸ **checkPassword**(`user`, `pw`, `options`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `options` | `Record`<`string`, `any`\> | - |
| `callback` | `CheckPasswordCallback` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1488](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1488)

▸ **checkPassword**(`user`, `pw`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `callback` | `CheckPasswordCallback` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1494](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1494)

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

[packages/adapter/src/lib/adapter/adapter.ts:282](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L282)

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

[packages/adapter/src/lib/adapter/adapter.ts:6218](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6218)

▸ **chmodFile**(`adapter`, `path`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` |  |
| `callback` | `ChownFileCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6225](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6225)

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

[packages/adapter/src/lib/adapter/adapter.ts:214](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L214)

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

[packages/adapter/src/lib/adapter/adapter.ts:6265](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6265)

▸ **chownFile**(`_adapter`, `path`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` |  |
| `path` | `string` |  |
| `callback` | (`err?`: ``null`` \| `Error`, `processedFiles?`: `any`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6272](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6272)

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

[packages/adapter/src/lib/adapter/adapter.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L220)

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

[packages/adapter/src/lib/adapter/adapter.ts:2539](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2539)

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

[packages/adapter/src/lib/adapter/adapter.ts:2462](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2462)

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

[packages/adapter/src/lib/adapter/adapter.ts:4895](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4895)

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

[packages/adapter/src/lib/adapter/adapter.ts:4896](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4896)

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

[packages/adapter/src/lib/adapter/adapter.ts:4902](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4902)

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

[packages/adapter/src/lib/adapter/adapter.ts:4909](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4909)

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

[packages/adapter/src/lib/adapter/adapter.ts:455](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L455)

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

[packages/adapter/src/lib/adapter/adapter.ts:460](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L460)

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

[packages/adapter/src/lib/adapter/adapter.ts:466](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L466)

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

[packages/adapter/src/lib/adapter/adapter.ts:4821](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4821)

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

[packages/adapter/src/lib/adapter/adapter.ts:4822](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4822)

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

[packages/adapter/src/lib/adapter/adapter.ts:4827](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4827)

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

[packages/adapter/src/lib/adapter/adapter.ts:4833](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4833)

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

[packages/adapter/src/lib/adapter/adapter.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L434)

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

[packages/adapter/src/lib/adapter/adapter.ts:435](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L435)

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

[packages/adapter/src/lib/adapter/adapter.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L440)

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

[packages/adapter/src/lib/adapter/adapter.ts:4980](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4980)

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

[packages/adapter/src/lib/adapter/adapter.ts:4986](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4986)

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

[packages/adapter/src/lib/adapter/adapter.ts:4993](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4993)

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

[packages/adapter/src/lib/adapter/adapter.ts:5001](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5001)

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

[packages/adapter/src/lib/adapter/adapter.ts:477](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L477)

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

[packages/adapter/src/lib/adapter/adapter.ts:483](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L483)

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

[packages/adapter/src/lib/adapter/adapter.ts:490](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L490)

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

[packages/adapter/src/lib/adapter/adapter.ts:1186](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1186)

▸ **decrypt**(`value`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1187](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1187)

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

[packages/adapter/src/lib/adapter/adapter.ts:10196](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10196)

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

[packages/adapter/src/lib/adapter/adapter.ts:10197](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10197)

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

[packages/adapter/src/lib/adapter/adapter.ts:274](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L274)

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

[packages/adapter/src/lib/adapter/adapter.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L372)

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

[packages/adapter/src/lib/adapter/adapter.ts:373](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L373)

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

[packages/adapter/src/lib/adapter/adapter.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L226)

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

[packages/adapter/src/lib/adapter/adapter.ts:10137](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10137)

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

[packages/adapter/src/lib/adapter/adapter.ts:10138](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10138)

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

[packages/adapter/src/lib/adapter/adapter.ts:268](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L268)

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

[packages/adapter/src/lib/adapter/adapter.ts:4265](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4265)

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

[packages/adapter/src/lib/adapter/adapter.ts:4266](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4266)

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

[packages/adapter/src/lib/adapter/adapter.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L159)

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

[packages/adapter/src/lib/adapter/adapter.ts:8966](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8966)

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

[packages/adapter/src/lib/adapter/adapter.ts:8967](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8967)

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

[packages/adapter/src/lib/adapter/adapter.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L240)

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

[packages/adapter/src/lib/adapter/adapter.ts:4205](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4205)

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

[packages/adapter/src/lib/adapter/adapter.ts:4206](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4206)

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

[packages/adapter/src/lib/adapter/adapter.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L157)

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

[packages/adapter/src/lib/adapter/adapter.ts:8914](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8914)

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

[packages/adapter/src/lib/adapter/adapter.ts:8915](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8915)

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

[packages/adapter/src/lib/adapter/adapter.ts:238](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L238)

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

[packages/adapter/src/lib/adapter/adapter.ts:2477](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2477)

___

### deleteChannel

▸ **deleteChannel**(`channelName`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5502](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5502)

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

[packages/adapter/src/lib/adapter/adapter.ts:5503](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5503)

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

[packages/adapter/src/lib/adapter/adapter.ts:5504](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5504)

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

[packages/adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L502)

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

[packages/adapter/src/lib/adapter/adapter.ts:503](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L503)

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

[packages/adapter/src/lib/adapter/adapter.ts:5387](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5387)

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

[packages/adapter/src/lib/adapter/adapter.ts:5393](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5393)

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

[packages/adapter/src/lib/adapter/adapter.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L188)

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

[packages/adapter/src/lib/adapter/adapter.ts:5188](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5188)

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

[packages/adapter/src/lib/adapter/adapter.ts:5189](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5189)

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

[packages/adapter/src/lib/adapter/adapter.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L180)

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

[packages/adapter/src/lib/adapter/adapter.ts:5610](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5610)

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

[packages/adapter/src/lib/adapter/adapter.ts:5611](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5611)

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

[packages/adapter/src/lib/adapter/adapter.ts:5612](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5612)

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

[packages/adapter/src/lib/adapter/adapter.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L508)

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

[packages/adapter/src/lib/adapter/adapter.ts:509](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L509)

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

[packages/adapter/src/lib/adapter/adapter.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L510)

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

[packages/adapter/src/lib/adapter/adapter.ts:6087](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6087)

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

[packages/adapter/src/lib/adapter/adapter.ts:6094](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6094)

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

[packages/adapter/src/lib/adapter/adapter.ts:206](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L206)

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

[packages/adapter/src/lib/adapter/adapter.ts:1271](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1271)

___

### disable

▸ **disable**(): `SetObjectPromise`

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2355](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2355)

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

[packages/adapter/src/lib/adapter/adapter.ts:1206](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1206)

▸ **encrypt**(`value`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1207](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1207)

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

[packages/adapter/src/lib/adapter/adapter.ts:3232](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3232)

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

[packages/adapter/src/lib/adapter/adapter.ts:3237](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3237)

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

[packages/adapter/src/lib/adapter/adapter.ts:129](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L129)

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

[packages/adapter/src/lib/adapter/adapter.ts:2855](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2855)

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

[packages/adapter/src/lib/adapter/adapter.ts:2856](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2856)

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

[packages/adapter/src/lib/adapter/adapter.ts:115](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L115)

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

[packages/adapter/src/lib/adapter/adapter.ts:6580](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6580)

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

[packages/adapter/src/lib/adapter/adapter.ts:6581](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6581)

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

[packages/adapter/src/lib/adapter/adapter.ts:233](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L233)

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

[packages/adapter/src/lib/adapter/adapter.ts:4084](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4084)

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

[packages/adapter/src/lib/adapter/adapter.ts:4085](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4085)

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

[packages/adapter/src/lib/adapter/adapter.ts:450](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L450)

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

[packages/adapter/src/lib/adapter/adapter.ts:6663](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6663)

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

[packages/adapter/src/lib/adapter/adapter.ts:6664](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6664)

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

[packages/adapter/src/lib/adapter/adapter.ts:6628](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6628)

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

[packages/adapter/src/lib/adapter/adapter.ts:6629](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6629)

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

[packages/adapter/src/lib/adapter/adapter.ts:2773](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2773)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Returns

`Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:304](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L304)

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

[packages/adapter/src/lib/adapter/adapter.ts:10120](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10120)

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

[packages/adapter/src/lib/adapter/adapter.ts:10121](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10121)

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

[packages/adapter/src/lib/adapter/adapter.ts:266](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L266)

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

[packages/adapter/src/lib/adapter/adapter.ts:2199](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2199)

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

[packages/adapter/src/lib/adapter/adapter.ts:302](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L302)

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

[packages/adapter/src/lib/adapter/adapter.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L522)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L523)

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

[packages/adapter/src/lib/adapter/adapter.ts:524](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L524)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<`ChannelObject`[]\>

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L534)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:535](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L535)

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

[packages/adapter/src/lib/adapter/adapter.ts:5766](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5766)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5767](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5767)

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

[packages/adapter/src/lib/adapter/adapter.ts:5768](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5768)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<`ChannelObject`[]\>

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L516)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:517](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L517)

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

[packages/adapter/src/lib/adapter/adapter.ts:5712](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5712)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`DeviceObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5713](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5713)

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

[packages/adapter/src/lib/adapter/adapter.ts:196](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L196)

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

[packages/adapter/src/lib/adapter/adapter.ts:2372](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2372)

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

[packages/adapter/src/lib/adapter/adapter.ts:3651](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3651)

▸ **getEnum**(`name`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `callback` | `GetEnumCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3652](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3652)

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

[packages/adapter/src/lib/adapter/adapter.ts:3653](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3653)

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

[packages/adapter/src/lib/adapter/adapter.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L153)

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

[packages/adapter/src/lib/adapter/adapter.ts:3740](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3740)

▸ **getEnums**(`enumList`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `callback` | `GetEnumsCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3741](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3741)

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

[packages/adapter/src/lib/adapter/adapter.ts:3742](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3742)

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

[packages/adapter/src/lib/adapter/adapter.ts:155](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L155)

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

[packages/adapter/src/lib/adapter/adapter.ts:10046](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10046)

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

[packages/adapter/src/lib/adapter/adapter.ts:10047](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10047)

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

[packages/adapter/src/lib/adapter/adapter.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L261)

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

[packages/adapter/src/lib/adapter/adapter.ts:4138](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4138)

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

[packages/adapter/src/lib/adapter/adapter.ts:4139](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4139)

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

[packages/adapter/src/lib/adapter/adapter.ts:307](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L307)

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

[packages/adapter/src/lib/adapter/adapter.ts:3887](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3887)

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

[packages/adapter/src/lib/adapter/adapter.ts:3888](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3888)

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

[packages/adapter/src/lib/adapter/adapter.ts:3889](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3889)

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

[packages/adapter/src/lib/adapter/adapter.ts:3894](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3894)

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

[packages/adapter/src/lib/adapter/adapter.ts:3900](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3900)

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

[packages/adapter/src/lib/adapter/adapter.ts:3906](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3906)

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

[packages/adapter/src/lib/adapter/adapter.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L418)

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

[packages/adapter/src/lib/adapter/adapter.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L424)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): `GetObjectsPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetObjectsPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:429](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L429)

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

[packages/adapter/src/lib/adapter/adapter.ts:8508](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8508)

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

[packages/adapter/src/lib/adapter/adapter.ts:8509](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8509)

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

[packages/adapter/src/lib/adapter/adapter.ts:280](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L280)

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

[packages/adapter/src/lib/adapter/adapter.ts:9150](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9150)

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

[packages/adapter/src/lib/adapter/adapter.ts:9151](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9151)

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

[packages/adapter/src/lib/adapter/adapter.ts:244](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L244)

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

[packages/adapter/src/lib/adapter/adapter.ts:8787](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8787)

▸ **getHistory**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | `GetHistoryCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8788](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8788)

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

[packages/adapter/src/lib/adapter/adapter.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L236)

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

[packages/adapter/src/lib/adapter/adapter.ts:3436](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3436)

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

[packages/adapter/src/lib/adapter/adapter.ts:3437](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3437)

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

[packages/adapter/src/lib/adapter/adapter.ts:135](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L135)

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

[packages/adapter/src/lib/adapter/adapter.ts:3595](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3595)

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

[packages/adapter/src/lib/adapter/adapter.ts:3596](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3596)

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

[packages/adapter/src/lib/adapter/adapter.ts:148](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L148)

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

[packages/adapter/src/lib/adapter/adapter.ts:3479](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3479)

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

[packages/adapter/src/lib/adapter/adapter.ts:3485](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3485)

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

[packages/adapter/src/lib/adapter/adapter.ts:141](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L141)

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

[packages/adapter/src/lib/adapter/adapter.ts:10232](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10232)

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

[packages/adapter/src/lib/adapter/adapter.ts:10214](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10214)

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

[packages/adapter/src/lib/adapter/adapter.ts:1400](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1400)

▸ **getPort**(`port`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` |  |
| `callback?` | (`port`: `number`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1401](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1401)

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

[packages/adapter/src/lib/adapter/adapter.ts:278](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L278)

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

[packages/adapter/src/lib/adapter/adapter.ts:1227](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1227)

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

[packages/adapter/src/lib/adapter/adapter.ts:8477](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8477)

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

[packages/adapter/src/lib/adapter/adapter.ts:8478](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8478)

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

[packages/adapter/src/lib/adapter/adapter.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L165)

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

[packages/adapter/src/lib/adapter/adapter.ts:9025](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9025)

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

[packages/adapter/src/lib/adapter/adapter.ts:9026](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9026)

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

[packages/adapter/src/lib/adapter/adapter.ts:242](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L242)

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

[packages/adapter/src/lib/adapter/adapter.ts:5835](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5835)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5836](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5836)

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

[packages/adapter/src/lib/adapter/adapter.ts:5837](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5837)

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

[packages/adapter/src/lib/adapter/adapter.ts:5842](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L5842)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<`StateObject`[]\>

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L542)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<`StateObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L543)

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

[packages/adapter/src/lib/adapter/adapter.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L544)

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

[packages/adapter/src/lib/adapter/adapter.ts:10278](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10278)

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

[packages/adapter/src/lib/adapter/adapter.ts:1590](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1590)

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

[packages/adapter/src/lib/adapter/adapter.ts:8879](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8879)

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

[packages/adapter/src/lib/adapter/adapter.ts:6439](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6439)

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

[packages/adapter/src/lib/adapter/adapter.ts:6440](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6440)

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

[packages/adapter/src/lib/adapter/adapter.ts:228](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L228)

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

[packages/adapter/src/lib/adapter/adapter.ts:6313](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6313)

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

[packages/adapter/src/lib/adapter/adapter.ts:6314](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6314)

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

[packages/adapter/src/lib/adapter/adapter.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L222)

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

[packages/adapter/src/lib/adapter/adapter.ts:6465](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6465)

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

[packages/adapter/src/lib/adapter/adapter.ts:6466](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6466)

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

[packages/adapter/src/lib/adapter/adapter.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L230)

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

[packages/adapter/src/lib/adapter/adapter.ts:7109](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7109)

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

[packages/adapter/src/lib/adapter/adapter.ts:6405](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6405)

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

[packages/adapter/src/lib/adapter/adapter.ts:6406](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6406)

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

[packages/adapter/src/lib/adapter/adapter.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L227)

___

### restart

▸ **restart**(): `void`

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2305](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2305)

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

[packages/adapter/src/lib/adapter/adapter.ts:6817](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6817)

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

[packages/adapter/src/lib/adapter/adapter.ts:6822](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6822)

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

[packages/adapter/src/lib/adapter/adapter.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L362)

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

[packages/adapter/src/lib/adapter/adapter.ts:363](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L363)

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

[packages/adapter/src/lib/adapter/adapter.ts:6976](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6976)

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

[packages/adapter/src/lib/adapter/adapter.ts:6981](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6981)

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

[packages/adapter/src/lib/adapter/adapter.ts:352](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L352)

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

[packages/adapter/src/lib/adapter/adapter.ts:353](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L353)

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

[packages/adapter/src/lib/adapter/adapter.ts:10027](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10027)

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

[packages/adapter/src/lib/adapter/adapter.ts:10028](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L10028)

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

[packages/adapter/src/lib/adapter/adapter.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L260)

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

[packages/adapter/src/lib/adapter/adapter.ts:121](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L121)

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

[packages/adapter/src/lib/adapter/adapter.ts:9886](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9886)

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

[packages/adapter/src/lib/adapter/adapter.ts:9887](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9887)

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

[packages/adapter/src/lib/adapter/adapter.ts:254](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L254)

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

[packages/adapter/src/lib/adapter/adapter.ts:3125](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3125)

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

[packages/adapter/src/lib/adapter/adapter.ts:3130](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L3130)

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

[packages/adapter/src/lib/adapter/adapter.ts:296](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L296)

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

[packages/adapter/src/lib/adapter/adapter.ts:4706](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4706)

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

[packages/adapter/src/lib/adapter/adapter.ts:4711](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4711)

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

[packages/adapter/src/lib/adapter/adapter.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L173)

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

[packages/adapter/src/lib/adapter/adapter.ts:8035](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8035)

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

[packages/adapter/src/lib/adapter/adapter.ts:8040](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8040)

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

[packages/adapter/src/lib/adapter/adapter.ts:8046](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8046)

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

[packages/adapter/src/lib/adapter/adapter.ts:8052](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8052)

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

[packages/adapter/src/lib/adapter/adapter.ts:398](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L398)

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

[packages/adapter/src/lib/adapter/adapter.ts:403](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L403)

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

[packages/adapter/src/lib/adapter/adapter.ts:408](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L408)

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

[packages/adapter/src/lib/adapter/adapter.ts:8344](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8344)

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

[packages/adapter/src/lib/adapter/adapter.ts:8349](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8349)

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

[packages/adapter/src/lib/adapter/adapter.ts:8355](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8355)

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

[packages/adapter/src/lib/adapter/adapter.ts:8361](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L8361)

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

[packages/adapter/src/lib/adapter/adapter.ts:312](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L312)

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

[packages/adapter/src/lib/adapter/adapter.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L317)

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

[packages/adapter/src/lib/adapter/adapter.ts:322](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L322)

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

[packages/adapter/src/lib/adapter/adapter.ts:2505](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2505)

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

[packages/adapter/src/lib/adapter/adapter.ts:2553](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2553)

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

[packages/adapter/src/lib/adapter/adapter.ts:2554](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2554)

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

[packages/adapter/src/lib/adapter/adapter.ts:2560](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2560)

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

[packages/adapter/src/lib/adapter/adapter.ts:294](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L294)

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

[packages/adapter/src/lib/adapter/adapter.ts:4605](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4605)

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

[packages/adapter/src/lib/adapter/adapter.ts:4610](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4610)

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

[packages/adapter/src/lib/adapter/adapter.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L171)

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

[packages/adapter/src/lib/adapter/adapter.ts:1621](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1621)

▸ **setPassword**(`user`, `pw`, `callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` |  |
| `pw` | `string` |  |
| `callback?` | `ErrorCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1628](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1628)

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

[packages/adapter/src/lib/adapter/adapter.ts:284](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L284)

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

[packages/adapter/src/lib/adapter/adapter.ts:1248](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1248)

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

[packages/adapter/src/lib/adapter/adapter.ts:7147](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7147)

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

[packages/adapter/src/lib/adapter/adapter.ts:7152](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7152)

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

[packages/adapter/src/lib/adapter/adapter.ts:7158](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7158)

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

[packages/adapter/src/lib/adapter/adapter.ts:7164](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7164)

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

[packages/adapter/src/lib/adapter/adapter.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L378)

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

[packages/adapter/src/lib/adapter/adapter.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L383)

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

[packages/adapter/src/lib/adapter/adapter.ts:388](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L388)

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

[packages/adapter/src/lib/adapter/adapter.ts:7889](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7889)

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

[packages/adapter/src/lib/adapter/adapter.ts:7894](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7894)

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

[packages/adapter/src/lib/adapter/adapter.ts:7900](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7900)

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

[packages/adapter/src/lib/adapter/adapter.ts:7906](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L7906)

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

[packages/adapter/src/lib/adapter/adapter.ts:332](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L332)

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

[packages/adapter/src/lib/adapter/adapter.ts:337](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L337)

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

[packages/adapter/src/lib/adapter/adapter.ts:342](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L342)

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

[packages/adapter/src/lib/adapter/adapter.ts:2423](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2423)

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

[packages/adapter/src/lib/adapter/adapter.ts:4544](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4544)

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

[packages/adapter/src/lib/adapter/adapter.ts:4545](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4545)

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

[packages/adapter/src/lib/adapter/adapter.ts:4465](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4465)

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

[packages/adapter/src/lib/adapter/adapter.ts:4466](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4466)

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

[packages/adapter/src/lib/adapter/adapter.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L167)

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

[packages/adapter/src/lib/adapter/adapter.ts:9413](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9413)

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

[packages/adapter/src/lib/adapter/adapter.ts:9414](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9414)

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

[packages/adapter/src/lib/adapter/adapter.ts:246](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L246)

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

[packages/adapter/src/lib/adapter/adapter.ts:4378](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4378)

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

[packages/adapter/src/lib/adapter/adapter.ts:4379](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4379)

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

[packages/adapter/src/lib/adapter/adapter.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L161)

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

[packages/adapter/src/lib/adapter/adapter.ts:9800](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9800)

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

[packages/adapter/src/lib/adapter/adapter.ts:9801](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9801)

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

[packages/adapter/src/lib/adapter/adapter.ts:250](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L250)

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

[packages/adapter/src/lib/adapter/adapter.ts:1464](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1464)

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

[packages/adapter/src/lib/adapter/adapter.ts:1314](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1314)

▸ **terminate**(`reason?`, `exitCode?`): `never`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `string` |  |
| `exitCode?` | `number` |  |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1315](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L1315)

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

[packages/adapter/src/lib/adapter/adapter.ts:6377](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6377)

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

[packages/adapter/src/lib/adapter/adapter.ts:6378](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6378)

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

[packages/adapter/src/lib/adapter/adapter.ts:224](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L224)

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

[packages/adapter/src/lib/adapter/adapter.ts:4573](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4573)

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

[packages/adapter/src/lib/adapter/adapter.ts:4574](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4574)

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

[packages/adapter/src/lib/adapter/adapter.ts:4503](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4503)

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

[packages/adapter/src/lib/adapter/adapter.ts:4504](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4504)

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

[packages/adapter/src/lib/adapter/adapter.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L169)

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

[packages/adapter/src/lib/adapter/adapter.ts:9652](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9652)

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

[packages/adapter/src/lib/adapter/adapter.ts:9653](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9653)

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

[packages/adapter/src/lib/adapter/adapter.ts:248](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L248)

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

[packages/adapter/src/lib/adapter/adapter.ts:4421](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4421)

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

[packages/adapter/src/lib/adapter/adapter.ts:4422](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L4422)

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

[packages/adapter/src/lib/adapter/adapter.ts:163](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L163)

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

[packages/adapter/src/lib/adapter/adapter.ts:9842](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9842)

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

[packages/adapter/src/lib/adapter/adapter.ts:9843](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L9843)

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

[packages/adapter/src/lib/adapter/adapter.ts:252](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L252)

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

[packages/adapter/src/lib/adapter/adapter.ts:2314](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L2314)

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

[packages/adapter/src/lib/adapter/adapter.ts:6516](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6516)

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

[packages/adapter/src/lib/adapter/adapter.ts:6517](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L6517)

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

[packages/adapter/src/lib/adapter/adapter.ts:231](https://github.com/ioBroker/ioBroker.js-controller/blob/35f1eaa8/packages/adapter/src/lib/adapter/adapter.ts#L231)

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
