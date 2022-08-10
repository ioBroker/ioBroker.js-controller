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

[packages/adapter/src/lib/adapter/adapter.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L653)

## Properties

### FORBIDDEN\_CHARS

• `Protected` `Readonly` **FORBIDDEN\_CHARS**: `RegExp` = `FORBIDDEN_CHARS`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L597)

___

### adapterConfig

• `Protected` `Optional` **adapterConfig**: ``null`` \| `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:615](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L615)

___

### adapterDir

• `Protected` **adapterDir**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L617)

___

### adapterReady

• `Protected` **adapterReady**: `boolean` = `false`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L564)

___

### common

• `Protected` `Optional` **common**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L640)

___

### config

• `Protected` `Optional` **config**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L638)

___

### connected

• `Protected` `Optional` **connected**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L616)

___

### dateFormat

• `Protected` `Optional` **dateFormat**: `any`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L627)

___

### host

• `Protected` `Optional` **host**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L639)

___

### instance

• `Protected` `Optional` **instance**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:611](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L611)

___

### ioPack

• `Protected` **ioPack**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L621)

___

### isFloatComma

• `Protected` `Optional` **isFloatComma**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L629)

___

### kill

• `Protected` `Optional` **kill**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L644)

___

### language

• `Protected` `Optional` **language**: `Languages`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L631)

___

### latitude

• `Protected` `Optional` **latitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L635)

___

### log

• `Protected` `Optional` **log**: `Log`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:583](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L583)

___

### longitude

• `Protected` `Optional` **longitude**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L633)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L590)

___

### namespace

• `Protected` **namespace**: \`${string}.${number}\`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L589)

___

### oObjects

• `Protected` `Optional` **oObjects**: `Record`<`string`, `undefined` \| `Object`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L576)

___

### oStates

• `Protected` `Optional` **oStates**: `Record`<`string`, `undefined` \| `State`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:571](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L571)

___

### pack

• `Protected` `Optional` **pack**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L619)

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

[packages/adapter/src/lib/adapter/adapter.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L645)

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

[packages/adapter/src/lib/adapter/adapter.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L646)

___

### stop

• `Protected` `Optional` **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L642)

___

### systemConfig

• `Protected` `Optional` **systemConfig**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L625)

___

### version

• `Protected` `Optional` **version**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L643)

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

[packages/adapter/src/lib/adapter/adapter.ts:8961](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8961)

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

[packages/adapter/src/lib/adapter/adapter.ts:8917](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8917)

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

[packages/adapter/src/lib/adapter/adapter.ts:5245](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5245)

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

[packages/adapter/src/lib/adapter/adapter.ts:5252](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5252)

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

[packages/adapter/src/lib/adapter/adapter.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L179)

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

[packages/adapter/src/lib/adapter/adapter.ts:5930](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5930)

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

[packages/adapter/src/lib/adapter/adapter.ts:5938](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5938)

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

[packages/adapter/src/lib/adapter/adapter.ts:196](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L196)

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

[packages/adapter/src/lib/adapter/adapter.ts:1808](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1808)

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

[packages/adapter/src/lib/adapter/adapter.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L286)

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

[packages/adapter/src/lib/adapter/adapter.ts:1721](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1721)

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

[packages/adapter/src/lib/adapter/adapter.ts:284](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L284)

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

[packages/adapter/src/lib/adapter/adapter.ts:1486](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1486)

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

[packages/adapter/src/lib/adapter/adapter.ts:280](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L280)

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

[packages/adapter/src/lib/adapter/adapter.ts:6208](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6208)

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

[packages/adapter/src/lib/adapter/adapter.ts:212](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L212)

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

[packages/adapter/src/lib/adapter/adapter.ts:6253](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6253)

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

[packages/adapter/src/lib/adapter/adapter.ts:218](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L218)

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

[packages/adapter/src/lib/adapter/adapter.ts:2531](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2531)

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

[packages/adapter/src/lib/adapter/adapter.ts:2454](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2454)

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

[packages/adapter/src/lib/adapter/adapter.ts:4886](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4886)

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

[packages/adapter/src/lib/adapter/adapter.ts:4887](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4887)

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

[packages/adapter/src/lib/adapter/adapter.ts:4893](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4893)

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

[packages/adapter/src/lib/adapter/adapter.ts:4900](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4900)

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

[packages/adapter/src/lib/adapter/adapter.ts:453](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L453)

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

[packages/adapter/src/lib/adapter/adapter.ts:458](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L458)

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

[packages/adapter/src/lib/adapter/adapter.ts:464](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L464)

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

[packages/adapter/src/lib/adapter/adapter.ts:4812](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4812)

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

[packages/adapter/src/lib/adapter/adapter.ts:4813](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4813)

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

[packages/adapter/src/lib/adapter/adapter.ts:4818](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4818)

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

[packages/adapter/src/lib/adapter/adapter.ts:4824](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4824)

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

[packages/adapter/src/lib/adapter/adapter.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L432)

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

[packages/adapter/src/lib/adapter/adapter.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L433)

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

[packages/adapter/src/lib/adapter/adapter.ts:438](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L438)

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

[packages/adapter/src/lib/adapter/adapter.ts:4971](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4971)

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

[packages/adapter/src/lib/adapter/adapter.ts:4977](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4977)

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

[packages/adapter/src/lib/adapter/adapter.ts:4984](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4984)

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

[packages/adapter/src/lib/adapter/adapter.ts:4992](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4992)

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

[packages/adapter/src/lib/adapter/adapter.ts:475](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L475)

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

[packages/adapter/src/lib/adapter/adapter.ts:481](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L481)

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

[packages/adapter/src/lib/adapter/adapter.ts:488](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L488)

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

[packages/adapter/src/lib/adapter/adapter.ts:1184](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1184)

▸ **decrypt**(`value`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1185)

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

[packages/adapter/src/lib/adapter/adapter.ts:10164](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10164)

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

[packages/adapter/src/lib/adapter/adapter.ts:10165](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10165)

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

[packages/adapter/src/lib/adapter/adapter.ts:272](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L272)

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

[packages/adapter/src/lib/adapter/adapter.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L370)

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

[packages/adapter/src/lib/adapter/adapter.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L371)

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

[packages/adapter/src/lib/adapter/adapter.ts:224](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L224)

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

[packages/adapter/src/lib/adapter/adapter.ts:10105](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10105)

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

[packages/adapter/src/lib/adapter/adapter.ts:10106](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10106)

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

[packages/adapter/src/lib/adapter/adapter.ts:266](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L266)

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

[packages/adapter/src/lib/adapter/adapter.ts:4256](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4256)

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

[packages/adapter/src/lib/adapter/adapter.ts:4257](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4257)

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

[packages/adapter/src/lib/adapter/adapter.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L157)

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

[packages/adapter/src/lib/adapter/adapter.ts:8933](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8933)

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

[packages/adapter/src/lib/adapter/adapter.ts:8934](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8934)

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

[packages/adapter/src/lib/adapter/adapter.ts:238](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L238)

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

[packages/adapter/src/lib/adapter/adapter.ts:4196](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4196)

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

[packages/adapter/src/lib/adapter/adapter.ts:4197](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4197)

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

[packages/adapter/src/lib/adapter/adapter.ts:155](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L155)

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

[packages/adapter/src/lib/adapter/adapter.ts:8886](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8886)

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

[packages/adapter/src/lib/adapter/adapter.ts:8887](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8887)

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

[packages/adapter/src/lib/adapter/adapter.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L236)

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

[packages/adapter/src/lib/adapter/adapter.ts:2469](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2469)

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

[packages/adapter/src/lib/adapter/adapter.ts:5493](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5493)

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

[packages/adapter/src/lib/adapter/adapter.ts:5494](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5494)

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

[packages/adapter/src/lib/adapter/adapter.ts:500](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L500)

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

[packages/adapter/src/lib/adapter/adapter.ts:501](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L501)

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

[packages/adapter/src/lib/adapter/adapter.ts:5378](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5378)

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

[packages/adapter/src/lib/adapter/adapter.ts:5384](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5384)

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

[packages/adapter/src/lib/adapter/adapter.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L186)

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

[packages/adapter/src/lib/adapter/adapter.ts:5179](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5179)

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

[packages/adapter/src/lib/adapter/adapter.ts:5180](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5180)

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

[packages/adapter/src/lib/adapter/adapter.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L178)

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

[packages/adapter/src/lib/adapter/adapter.ts:5600](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5600)

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

[packages/adapter/src/lib/adapter/adapter.ts:5601](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5601)

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

[packages/adapter/src/lib/adapter/adapter.ts:5602](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5602)

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

[packages/adapter/src/lib/adapter/adapter.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L506)

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

[packages/adapter/src/lib/adapter/adapter.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L507)

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

[packages/adapter/src/lib/adapter/adapter.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L508)

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

[packages/adapter/src/lib/adapter/adapter.ts:6077](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6077)

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

[packages/adapter/src/lib/adapter/adapter.ts:6084](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6084)

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

[packages/adapter/src/lib/adapter/adapter.ts:204](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L204)

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

[packages/adapter/src/lib/adapter/adapter.ts:1269](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1269)

___

### disable

▸ **disable**(): `SetObjectPromise`

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2347](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2347)

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

[packages/adapter/src/lib/adapter/adapter.ts:1204](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1204)

▸ **encrypt**(`value`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` |  |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1205](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1205)

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

[packages/adapter/src/lib/adapter/adapter.ts:3223](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3223)

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

[packages/adapter/src/lib/adapter/adapter.ts:3228](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3228)

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

[packages/adapter/src/lib/adapter/adapter.ts:127](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L127)

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

[packages/adapter/src/lib/adapter/adapter.ts:2846](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2846)

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

[packages/adapter/src/lib/adapter/adapter.ts:2847](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2847)

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

[packages/adapter/src/lib/adapter/adapter.ts:113](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L113)

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

[packages/adapter/src/lib/adapter/adapter.ts:6566](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6566)

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

[packages/adapter/src/lib/adapter/adapter.ts:6567](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6567)

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

[packages/adapter/src/lib/adapter/adapter.ts:231](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L231)

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

[packages/adapter/src/lib/adapter/adapter.ts:4075](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4075)

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

[packages/adapter/src/lib/adapter/adapter.ts:4076](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4076)

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

[packages/adapter/src/lib/adapter/adapter.ts:448](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L448)

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

[packages/adapter/src/lib/adapter/adapter.ts:6649](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6649)

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

[packages/adapter/src/lib/adapter/adapter.ts:6650](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6650)

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

[packages/adapter/src/lib/adapter/adapter.ts:6614](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6614)

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

[packages/adapter/src/lib/adapter/adapter.ts:6615](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6615)

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

[packages/adapter/src/lib/adapter/adapter.ts:2764](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2764)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Returns

`Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:302](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L302)

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

[packages/adapter/src/lib/adapter/adapter.ts:10088](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10088)

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

[packages/adapter/src/lib/adapter/adapter.ts:10089](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10089)

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

[packages/adapter/src/lib/adapter/adapter.ts:264](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L264)

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

[packages/adapter/src/lib/adapter/adapter.ts:2191](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2191)

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

[packages/adapter/src/lib/adapter/adapter.ts:300](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L300)

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

[packages/adapter/src/lib/adapter/adapter.ts:520](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L520)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:521](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L521)

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

[packages/adapter/src/lib/adapter/adapter.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L522)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<`ChannelObject`[]\>

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:532](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L532)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L533)

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

[packages/adapter/src/lib/adapter/adapter.ts:5756](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5756)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5757](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5757)

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

[packages/adapter/src/lib/adapter/adapter.ts:5758](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5758)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<`ChannelObject`[]\>

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:514](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L514)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:515](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L515)

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

[packages/adapter/src/lib/adapter/adapter.ts:5702](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5702)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`DeviceObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5703](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5703)

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

[packages/adapter/src/lib/adapter/adapter.ts:194](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L194)

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

[packages/adapter/src/lib/adapter/adapter.ts:2364](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2364)

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

[packages/adapter/src/lib/adapter/adapter.ts:3642](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3642)

▸ **getEnum**(`name`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `callback` | `GetEnumCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3643](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3643)

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

[packages/adapter/src/lib/adapter/adapter.ts:3644](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3644)

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

[packages/adapter/src/lib/adapter/adapter.ts:151](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L151)

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

[packages/adapter/src/lib/adapter/adapter.ts:3731](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3731)

▸ **getEnums**(`enumList`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `callback` | `GetEnumsCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3732](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3732)

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

[packages/adapter/src/lib/adapter/adapter.ts:3733](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3733)

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

[packages/adapter/src/lib/adapter/adapter.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L153)

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

[packages/adapter/src/lib/adapter/adapter.ts:10014](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10014)

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

[packages/adapter/src/lib/adapter/adapter.ts:10015](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10015)

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

[packages/adapter/src/lib/adapter/adapter.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L259)

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

[packages/adapter/src/lib/adapter/adapter.ts:4129](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4129)

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

[packages/adapter/src/lib/adapter/adapter.ts:4130](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4130)

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

[packages/adapter/src/lib/adapter/adapter.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L305)

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

[packages/adapter/src/lib/adapter/adapter.ts:3878](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3878)

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

[packages/adapter/src/lib/adapter/adapter.ts:3879](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3879)

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

[packages/adapter/src/lib/adapter/adapter.ts:3880](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3880)

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

[packages/adapter/src/lib/adapter/adapter.ts:3885](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3885)

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

[packages/adapter/src/lib/adapter/adapter.ts:3891](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3891)

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

[packages/adapter/src/lib/adapter/adapter.ts:3897](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3897)

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

[packages/adapter/src/lib/adapter/adapter.ts:416](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L416)

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

[packages/adapter/src/lib/adapter/adapter.ts:422](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L422)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): `GetObjectsPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetObjectsPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:427](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L427)

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

[packages/adapter/src/lib/adapter/adapter.ts:8480](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8480)

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

[packages/adapter/src/lib/adapter/adapter.ts:8481](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8481)

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

[packages/adapter/src/lib/adapter/adapter.ts:278](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L278)

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

[packages/adapter/src/lib/adapter/adapter.ts:9118](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9118)

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

[packages/adapter/src/lib/adapter/adapter.ts:9119](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9119)

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

[packages/adapter/src/lib/adapter/adapter.ts:242](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L242)

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

[packages/adapter/src/lib/adapter/adapter.ts:8759](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8759)

▸ **getHistory**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | `GetHistoryCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8760](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8760)

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

[packages/adapter/src/lib/adapter/adapter.ts:234](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L234)

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

[packages/adapter/src/lib/adapter/adapter.ts:3427](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3427)

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

[packages/adapter/src/lib/adapter/adapter.ts:3428](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3428)

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

[packages/adapter/src/lib/adapter/adapter.ts:133](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L133)

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

[packages/adapter/src/lib/adapter/adapter.ts:3586](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3586)

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

[packages/adapter/src/lib/adapter/adapter.ts:3587](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3587)

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

[packages/adapter/src/lib/adapter/adapter.ts:146](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L146)

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

[packages/adapter/src/lib/adapter/adapter.ts:3470](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3470)

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

[packages/adapter/src/lib/adapter/adapter.ts:3476](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3476)

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

[packages/adapter/src/lib/adapter/adapter.ts:139](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L139)

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

[packages/adapter/src/lib/adapter/adapter.ts:10200](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10200)

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

[packages/adapter/src/lib/adapter/adapter.ts:10182](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10182)

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

[packages/adapter/src/lib/adapter/adapter.ts:1398](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1398)

▸ **getPort**(`port`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` |  |
| `callback?` | (`port`: `number`) => `void` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1399](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1399)

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

[packages/adapter/src/lib/adapter/adapter.ts:276](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L276)

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

[packages/adapter/src/lib/adapter/adapter.ts:1225](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1225)

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

[packages/adapter/src/lib/adapter/adapter.ts:8449](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8449)

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

[packages/adapter/src/lib/adapter/adapter.ts:8450](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8450)

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

[packages/adapter/src/lib/adapter/adapter.ts:163](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L163)

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

[packages/adapter/src/lib/adapter/adapter.ts:8992](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8992)

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

[packages/adapter/src/lib/adapter/adapter.ts:8993](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8993)

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

[packages/adapter/src/lib/adapter/adapter.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L240)

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

[packages/adapter/src/lib/adapter/adapter.ts:5825](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5825)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5826](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5826)

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

[packages/adapter/src/lib/adapter/adapter.ts:5827](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5827)

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

[packages/adapter/src/lib/adapter/adapter.ts:5832](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L5832)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<`StateObject`[]\>

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L540)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<`StateObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:541](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L541)

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

[packages/adapter/src/lib/adapter/adapter.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L542)

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

[packages/adapter/src/lib/adapter/adapter.ts:10246](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L10246)

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

[packages/adapter/src/lib/adapter/adapter.ts:1586](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1586)

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

[packages/adapter/src/lib/adapter/adapter.ts:8851](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8851)

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

[packages/adapter/src/lib/adapter/adapter.ts:6425](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6425)

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

[packages/adapter/src/lib/adapter/adapter.ts:6426](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6426)

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

[packages/adapter/src/lib/adapter/adapter.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L226)

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

[packages/adapter/src/lib/adapter/adapter.ts:6299](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6299)

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

[packages/adapter/src/lib/adapter/adapter.ts:6300](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6300)

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

[packages/adapter/src/lib/adapter/adapter.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L220)

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

[packages/adapter/src/lib/adapter/adapter.ts:6451](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6451)

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

[packages/adapter/src/lib/adapter/adapter.ts:6452](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6452)

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

[packages/adapter/src/lib/adapter/adapter.ts:228](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L228)

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

[packages/adapter/src/lib/adapter/adapter.ts:7081](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7081)

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

[packages/adapter/src/lib/adapter/adapter.ts:6391](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6391)

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

[packages/adapter/src/lib/adapter/adapter.ts:6392](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6392)

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

[packages/adapter/src/lib/adapter/adapter.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L225)

___

### restart

▸ **restart**(): `void`

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2297](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2297)

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

[packages/adapter/src/lib/adapter/adapter.ts:6789](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6789)

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

[packages/adapter/src/lib/adapter/adapter.ts:6794](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6794)

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

[packages/adapter/src/lib/adapter/adapter.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L360)

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

[packages/adapter/src/lib/adapter/adapter.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L361)

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

[packages/adapter/src/lib/adapter/adapter.ts:6948](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6948)

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

[packages/adapter/src/lib/adapter/adapter.ts:6953](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6953)

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

[packages/adapter/src/lib/adapter/adapter.ts:350](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L350)

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

[packages/adapter/src/lib/adapter/adapter.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L351)

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

[packages/adapter/src/lib/adapter/adapter.ts:9995](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9995)

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

[packages/adapter/src/lib/adapter/adapter.ts:9996](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9996)

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

[packages/adapter/src/lib/adapter/adapter.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L258)

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

[packages/adapter/src/lib/adapter/adapter.ts:119](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L119)

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

[packages/adapter/src/lib/adapter/adapter.ts:9854](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9854)

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

[packages/adapter/src/lib/adapter/adapter.ts:9855](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9855)

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

[packages/adapter/src/lib/adapter/adapter.ts:252](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L252)

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

[packages/adapter/src/lib/adapter/adapter.ts:3116](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3116)

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

[packages/adapter/src/lib/adapter/adapter.ts:3121](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L3121)

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

[packages/adapter/src/lib/adapter/adapter.ts:294](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L294)

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

[packages/adapter/src/lib/adapter/adapter.ts:4697](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4697)

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

[packages/adapter/src/lib/adapter/adapter.ts:4702](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4702)

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

[packages/adapter/src/lib/adapter/adapter.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L171)

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

[packages/adapter/src/lib/adapter/adapter.ts:8007](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8007)

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

[packages/adapter/src/lib/adapter/adapter.ts:8012](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8012)

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

[packages/adapter/src/lib/adapter/adapter.ts:8018](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8018)

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

[packages/adapter/src/lib/adapter/adapter.ts:8024](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8024)

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

[packages/adapter/src/lib/adapter/adapter.ts:396](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L396)

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

[packages/adapter/src/lib/adapter/adapter.ts:401](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L401)

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

[packages/adapter/src/lib/adapter/adapter.ts:406](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L406)

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

[packages/adapter/src/lib/adapter/adapter.ts:8316](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8316)

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

[packages/adapter/src/lib/adapter/adapter.ts:8321](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8321)

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

[packages/adapter/src/lib/adapter/adapter.ts:8327](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8327)

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

[packages/adapter/src/lib/adapter/adapter.ts:8333](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L8333)

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

[packages/adapter/src/lib/adapter/adapter.ts:310](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L310)

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

[packages/adapter/src/lib/adapter/adapter.ts:315](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L315)

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

[packages/adapter/src/lib/adapter/adapter.ts:320](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L320)

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

[packages/adapter/src/lib/adapter/adapter.ts:2497](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2497)

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

[packages/adapter/src/lib/adapter/adapter.ts:2545](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2545)

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

[packages/adapter/src/lib/adapter/adapter.ts:2546](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2546)

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

[packages/adapter/src/lib/adapter/adapter.ts:292](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L292)

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

[packages/adapter/src/lib/adapter/adapter.ts:4596](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4596)

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

[packages/adapter/src/lib/adapter/adapter.ts:4601](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4601)

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

[packages/adapter/src/lib/adapter/adapter.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L169)

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

[packages/adapter/src/lib/adapter/adapter.ts:1617](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1617)

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

[packages/adapter/src/lib/adapter/adapter.ts:282](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L282)

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

[packages/adapter/src/lib/adapter/adapter.ts:1246](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1246)

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

[packages/adapter/src/lib/adapter/adapter.ts:7119](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7119)

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

[packages/adapter/src/lib/adapter/adapter.ts:7124](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7124)

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

[packages/adapter/src/lib/adapter/adapter.ts:7130](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7130)

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

[packages/adapter/src/lib/adapter/adapter.ts:7136](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7136)

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

[packages/adapter/src/lib/adapter/adapter.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L376)

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

[packages/adapter/src/lib/adapter/adapter.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L381)

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

[packages/adapter/src/lib/adapter/adapter.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L386)

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

[packages/adapter/src/lib/adapter/adapter.ts:7861](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7861)

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

[packages/adapter/src/lib/adapter/adapter.ts:7866](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7866)

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

[packages/adapter/src/lib/adapter/adapter.ts:7872](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7872)

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

[packages/adapter/src/lib/adapter/adapter.ts:7878](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L7878)

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

[packages/adapter/src/lib/adapter/adapter.ts:330](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L330)

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

[packages/adapter/src/lib/adapter/adapter.ts:335](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L335)

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

[packages/adapter/src/lib/adapter/adapter.ts:340](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L340)

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

[packages/adapter/src/lib/adapter/adapter.ts:2415](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2415)

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

[packages/adapter/src/lib/adapter/adapter.ts:4535](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4535)

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

[packages/adapter/src/lib/adapter/adapter.ts:4536](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4536)

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

[packages/adapter/src/lib/adapter/adapter.ts:4456](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4456)

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

[packages/adapter/src/lib/adapter/adapter.ts:4457](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4457)

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

[packages/adapter/src/lib/adapter/adapter.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L165)

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

[packages/adapter/src/lib/adapter/adapter.ts:9381](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9381)

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

[packages/adapter/src/lib/adapter/adapter.ts:9382](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9382)

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

[packages/adapter/src/lib/adapter/adapter.ts:244](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L244)

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

[packages/adapter/src/lib/adapter/adapter.ts:4369](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4369)

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

[packages/adapter/src/lib/adapter/adapter.ts:4370](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4370)

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

[packages/adapter/src/lib/adapter/adapter.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L159)

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

[packages/adapter/src/lib/adapter/adapter.ts:9768](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9768)

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

[packages/adapter/src/lib/adapter/adapter.ts:9769](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9769)

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

[packages/adapter/src/lib/adapter/adapter.ts:248](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L248)

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

[packages/adapter/src/lib/adapter/adapter.ts:1462](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1462)

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

[packages/adapter/src/lib/adapter/adapter.ts:1312](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1312)

▸ **terminate**(`reason?`, `exitCode?`): `never`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `string` |  |
| `exitCode?` | `number` |  |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1313](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L1313)

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

[packages/adapter/src/lib/adapter/adapter.ts:6363](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6363)

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

[packages/adapter/src/lib/adapter/adapter.ts:6364](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6364)

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

[packages/adapter/src/lib/adapter/adapter.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L222)

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

[packages/adapter/src/lib/adapter/adapter.ts:4564](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4564)

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

[packages/adapter/src/lib/adapter/adapter.ts:4565](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4565)

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

[packages/adapter/src/lib/adapter/adapter.ts:4494](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4494)

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

[packages/adapter/src/lib/adapter/adapter.ts:4495](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4495)

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

[packages/adapter/src/lib/adapter/adapter.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L167)

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

[packages/adapter/src/lib/adapter/adapter.ts:9620](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9620)

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

[packages/adapter/src/lib/adapter/adapter.ts:9621](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9621)

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

[packages/adapter/src/lib/adapter/adapter.ts:246](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L246)

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

[packages/adapter/src/lib/adapter/adapter.ts:4412](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4412)

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

[packages/adapter/src/lib/adapter/adapter.ts:4413](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L4413)

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

[packages/adapter/src/lib/adapter/adapter.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L161)

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

[packages/adapter/src/lib/adapter/adapter.ts:9810](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9810)

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

[packages/adapter/src/lib/adapter/adapter.ts:9811](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L9811)

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

[packages/adapter/src/lib/adapter/adapter.ts:250](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L250)

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

[packages/adapter/src/lib/adapter/adapter.ts:2306](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L2306)

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

[packages/adapter/src/lib/adapter/adapter.ts:6502](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6502)

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

[packages/adapter/src/lib/adapter/adapter.ts:6503](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L6503)

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

[packages/adapter/src/lib/adapter/adapter.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/fe2576be/packages/adapter/src/lib/adapter/adapter.ts#L229)

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
