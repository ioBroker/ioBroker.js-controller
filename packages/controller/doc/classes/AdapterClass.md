[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / AdapterClass

# Class: AdapterClass

Adapter class

How the initialization happens:
 initObjects => initStates => prepareInitAdapter => initAdapter => initLogging => createInstancesObjects => ready

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

[packages/adapter/src/lib/adapter/adapter.ts:974](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L974)

## Properties

### FORBIDDEN\_CHARS

• `Protected` `Readonly` **FORBIDDEN\_CHARS**: `RegExp`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L921)

___

### adapterConfig

• `Protected` `Optional` **adapterConfig**: ``null`` \| `Record`<`string`, `any`\>

contents of io-package.json

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:936](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L936)

___

### adapterDir

• `Protected` **adapterDir**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:938](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L938)

___

### adapterReady

• `Protected` **adapterReady**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:891](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L891)

___

### common

• `Protected` `Optional` **common**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L961)

___

### config

• `Protected` `Optional` **config**: `Record`<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:959](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L959)

___

### connected

• `Protected` `Optional` **connected**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:937](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L937)

___

### dateFormat

• `Protected` `Optional` **dateFormat**: `any`

the configured date format of system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:948](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L948)

___

### host

• `Protected` `Optional` **host**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L960)

___

### instance

• `Protected` `Optional` **instance**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:932](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L932)

___

### ioPack

• `Protected` **ioPack**: `Record`<`string`, `any`\>

contents of io-package.json

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:942](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L942)

___

### isFloatComma

• `Protected` `Optional` **isFloatComma**: `boolean`

if float comma instead of dot is used, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:950](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L950)

___

### kill

• `Protected` `Optional` **kill**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L965)

___

### language

• `Protected` `Optional` **language**: `Languages`

configured language of system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:952](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L952)

___

### latitude

• `Protected` `Optional` **latitude**: `number`

latitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L956)

___

### log

• `Protected` `Optional` **log**: `Log`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:910](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L910)

___

### longitude

• `Protected` `Optional` **longitude**: `number`

longitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:954](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L954)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:917](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L917)

___

### namespace

• `Protected` **namespace**: \`${string}.${number}\`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L916)

___

### oObjects

• `Protected` `Optional` **oObjects**: `Record`<`string`, `undefined` \| `Object`\>

Contains a live cache of the adapter's objects.
NOTE: This is only defined if the adapter was initialized with the option objects: true.

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:903](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L903)

___

### oStates

• `Protected` `Optional` **oStates**: `Record`<`string`, `undefined` \| `State`\>

Contains a live cache of the adapter's states.
NOTE: This is only defined if the adapter was initialized with the option states: true.

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:898](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L898)

___

### pack

• `Protected` `Optional` **pack**: `Record`<`string`, `any`\>

contents of package.json

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:940](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L940)

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

[packages/adapter/src/lib/adapter/adapter.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L966)

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

[packages/adapter/src/lib/adapter/adapter.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L967)

___

### stop

• `Protected` `Optional` **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L963)

___

### systemConfig

• `Protected` `Optional` **systemConfig**: `Record`<`string`, `any`\>

contents of iobroker.json if required via AdapterOptions

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:946](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L946)

___

### version

• `Protected` `Optional` **version**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:964](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L964)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](AdapterClass.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

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

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

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

[packages/adapter/src/lib/adapter/adapter.ts:5598](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5598)

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

[packages/adapter/src/lib/adapter/adapter.ts:5605](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5605)

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

[packages/adapter/src/lib/adapter/adapter.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L321)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

Alias for `emitter.on(eventName, listener)`.

**`since`** v0.1.26

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

[packages/adapter/src/lib/adapter/adapter.ts:6283](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6283)

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

[packages/adapter/src/lib/adapter/adapter.ts:6291](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6291)

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

[packages/adapter/src/lib/adapter/adapter.ts:338](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L338)

___

### calculatePermissions

▸ **calculatePermissions**(`user`, `commandsPermissions`, `options?`, `callback?`): `Promise`<`void` \| `PermissionSet`\>

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `commandsPermissions` | `CommandsPermissions` | object that describes the access rights like     <pre><code>         // static information         var commandsPermissions = {            getObject:          {type: 'object',    operation: 'read'},            getObjects:         {type: 'object',    operation: 'list'},            getObjectView:      {type: 'object',    operation: 'list'},            setObject:          {type: 'object',    operation: 'write'},            subscribeObjects:   {type: 'object',    operation: 'read'},            unsubscribeObjects: {type: 'object',    operation: 'read'},            subscribeFiles:     {type: 'object',    operation: 'read'},            unsubscribeFiles:   {type: 'object',    operation: 'read'},             getStates:          {type: 'state',     operation: 'list'},            getState:           {type: 'state',     operation: 'read'},            setState:           {type: 'state',     operation: 'write'},            getStateHistory:    {type: 'state',     operation: 'read'},            subscribe:          {type: 'state',     operation: 'read'},            unsubscribe:        {type: 'state',     operation: 'read'},            getVersion:         {type: '',          operation: ''},             httpGet:            {type: 'other',     operation: 'http'},            sendTo:             {type: 'other',     operation: 'sendto'},            sendToHost:         {type: 'other',     operation: 'sendto'},             readFile:           {type: 'file',      operation: 'read'},            readFile64:         {type: 'file',      operation: 'read'},            writeFile:          {type: 'file',      operation: 'write'},            writeFile64:        {type: 'file',      operation: 'write'},            unlink:             {type: 'file',      operation: 'delete'},            rename:             {type: 'file',      operation: 'write'},            mkdir:              {type: 'file',      operation: 'write'},            readDir:            {type: 'file',      operation: 'list'},            chmodFile:          {type: 'file',      operation: 'write'},            chownFile:          {type: 'file',      operation: 'write'},             authEnabled:        {type: '',          operation: ''},            disconnect:         {type: '',          operation: ''},            listPermissions:    {type: '',          operation: ''},            getUserPermissions: {type: 'object',    operation: 'read'}         };        </code></pre> |
| `options?` | `Record`<`string`, `any`\> | - |
| `callback?` | `CalculatePermissionsCallback` | - |

#### Returns

`Promise`<`void` \| `PermissionSet`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2161](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2161)

___

### calculatePermissionsAsync

▸ **calculatePermissionsAsync**(`user`, `commandsPermissions`, `options?`): `Promise`<`PermissionSet`\>

<INTERNAL> Determines the users permissions

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `commandsPermissions` | `CommandsPermissions` |
| `options?` | `unknown` |

#### Returns

`Promise`<`PermissionSet`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L428)

___

### checkGroup

▸ **checkGroup**(`user`, `group`, `options?`, `callback?`): `Promise`<`void`\>

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `group` | `string` | group name |
| `options?` | `Record`<`string`, `any`\> | - |
| `callback?` | `CheckGroupCallback` | return result        <pre><code>            function (result) {              if (result) adapter.log.debug('User exists and in the group');            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2074](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2074)

___

### checkGroupAsync

▸ **checkGroupAsync**(`user`, `group`, `options?`): `Promise`<`boolean`\>

<INTERNAL> Checks if a user exists and is in the given group.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `group` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:426](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L426)

___

### checkPassword

▸ **checkPassword**(`user`, `pw`, `options?`, `callback?`): `Promise`<`void`\>

validates user and password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `options?` | `Record`<`string`, `any`\> | - |
| `callback?` | `CheckPasswordCallback` | return result        <pre><code>            function (result) {              if (result) adapter.log.debug('User is valid');            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1839](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1839)

___

### checkPasswordAsync

▸ **checkPasswordAsync**(`user`, `password`, `options?`): `Promise`<`boolean`\>

Validates username and password

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `password` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:422](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L422)

___

### chmodFile

▸ **chmodFile**(`adapter`, `path`, `options`, `callback`): `void`

Change file access rights

This function updates the file access rights
<pre><code>
     adapter.chmodFile('vis.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('New files: ' + JSON.stringify(processed));
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` | path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0". |
| `options` | `Record`<`string`, `any`\> \| { `mode`: `string` \| `number`  } | data with mode |
| `callback` | `ChownFileCallback` | return result        <pre><code>            function (err, processedFiles) {                list of processed files with new groups            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6561](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6561)

___

### chmodFileAsync

▸ **chmodFileAsync**(`adapter`, `path`, `options`): `Promise`<{ `entries`: `ChownFileResult`[] ; `id`: `string`  }\>

Changes access rights of all files in the adapter directory

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapter` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `Record`<`string`, `any`\> \| { `mode`: `string` \| `number`  } |

#### Returns

`Promise`<{ `entries`: `ChownFileResult`[] ; `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:354](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L354)

___

### chownFile

▸ **chownFile**(`_adapter`, `path`, `options`, `callback`): `void`

Change file owner

This function updates the file owner and ownerGroup
<pre><code>
     adapter.chownFile('vis.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('New files: ' + JSON.stringify(processed));
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` | adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken. |
| `path` | `string` | path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0". |
| `options` | `unknown` | data with owner and ownerGroup |
| `callback` | (`err?`: ``null`` \| `Error`, `processedFiles?`: `any`) => `void` | return result        <pre><code>            function (err, processedFiles) {                list of processed files with new groups            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6606](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6606)

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

[packages/adapter/src/lib/adapter/adapter.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L360)

___

### clearInterval

▸ **clearInterval**(`interval`): `void`

Same as clearInterval
but it check the running intervals on unload

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | `Timeout` | interval object |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2884](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2884)

___

### clearTimeout

▸ **clearTimeout**(`timer`): `void`

Same as clearTimeout
but it check the running timers on unload

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timer` | `Timeout` | the timer object |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2807](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2807)

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

[packages/adapter/src/lib/adapter/adapter.ts:5239](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5239)

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

[packages/adapter/src/lib/adapter/adapter.ts:5240](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5240)

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

[packages/adapter/src/lib/adapter/adapter.ts:5246](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5246)

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

[packages/adapter/src/lib/adapter/adapter.ts:5253](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5253)

___

### createChannelAsync

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon?`): `SetObjectPromise`

Creates an object with type channel. It must be located under a device

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon?` | `string` \| `Partial`<`ChannelCommon`\> |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L595)

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

[packages/adapter/src/lib/adapter/adapter.ts:600](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L600)

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

[packages/adapter/src/lib/adapter/adapter.ts:606](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L606)

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

[packages/adapter/src/lib/adapter/adapter.ts:5165](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5165)

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

[packages/adapter/src/lib/adapter/adapter.ts:5166](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5166)

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

[packages/adapter/src/lib/adapter/adapter.ts:5171](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5171)

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

[packages/adapter/src/lib/adapter/adapter.ts:5177](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5177)

___

### createDeviceAsync

▸ **createDeviceAsync**(`deviceName`, `common?`): `SetObjectPromise`

creates an object with type device

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common?` | `Partial`<`DeviceCommon`\> |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:574](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L574)

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

[packages/adapter/src/lib/adapter/adapter.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L575)

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

[packages/adapter/src/lib/adapter/adapter.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L580)

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

[packages/adapter/src/lib/adapter/adapter.ts:5324](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5324)

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

[packages/adapter/src/lib/adapter/adapter.ts:5330](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5330)

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

[packages/adapter/src/lib/adapter/adapter.ts:5337](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5337)

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

[packages/adapter/src/lib/adapter/adapter.ts:5345](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5345)

___

### createStateAsync

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon?`): `SetObjectPromise`

Creates a state and the corresponding object. It must be located in a channel under a device

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

[packages/adapter/src/lib/adapter/adapter.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L617)

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

[packages/adapter/src/lib/adapter/adapter.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L623)

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

[packages/adapter/src/lib/adapter/adapter.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L630)

___

### decrypt

▸ **decrypt**(`secretVal`, `value?`): `string`

Decrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretVal` | `string` | to use for decrypt (or value if only one parameter is given) |
| `value?` | `string` | to decrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1538](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1538)

___

### delBinaryState

▸ **delBinaryState**(`id`, `callback?`): `void`

Deletes binary state but prefixes the own namespace to the id

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10468](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10468)

▸ **delBinaryState**(`id`, `options`, `callback?`): `void`

Deletes binary state but prefixes the own namespace to the id

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10469](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10469)

___

### delBinaryStateAsync

▸ **delBinaryStateAsync**(`id`, `options?`): `Promise`<`void`\>

Despite the naming convention, this method doesn't prepend the adapter namespace. Use delForeignBinaryStateAsync instead.
Deletes a binary state from the states DB

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:414](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L414)

___

### delFile

▸ **delFile**(`adapterName`, `path`, `callback`): `void`

Deletes a given file

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | `ErrnoCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L512)

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

[packages/adapter/src/lib/adapter/adapter.ts:513](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L513)

___

### delFileAsync

▸ **delFileAsync**(`adapterName`, `path`, `options?`): `Promise`<`void`\>

Deletes a given file

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:366](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L366)

___

### delForeignBinaryState

▸ **delForeignBinaryState**(`id`, `callback?`): `void`

Deletes binary state

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10409](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10409)

▸ **delForeignBinaryState**(`id`, `options`, `callback?`): `void`

Deletes binary state

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | `ErrorCallback` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10410](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10410)

___

### delForeignBinaryStateAsync

▸ **delForeignBinaryStateAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes a binary state from the states DB. The ID will not be prefixed with the adapter namespace.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:408](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L408)

___

### delForeignObject

▸ **delForeignObject**(`id`, `callback?`): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (with namespace) |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4609](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4609)

▸ **delForeignObject**(`id`, `options`, `callback?`): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (with namespace) |
| `options` | `DelObjectOptions` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4610](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4610)

___

### delForeignObjectAsync

▸ **delForeignObjectAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes an object (which might not belong to this adapter) from the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `DelObjectOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:299](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L299)

___

### delForeignState

▸ **delForeignState**(`id`, `callback?`): `void`

Deletes a state of any adapter.
The object is NOT deleted. If you want to delete it too, use @delForeignObject instead.

No error is returned if state does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | long string for ID like "adapterName.0.stateID". |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9250](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9250)

▸ **delForeignState**(`id`, `options`, `callback?`): `void`

Deletes a state of any adapter.
The object is NOT deleted. If you want to delete it too, use @delForeignObject instead.

No error is returned if state does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | long string for ID like "adapterName.0.stateID". |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9251](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9251)

___

### delForeignStateAsync

▸ **delForeignStateAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes a state from the states DB, but not the associated object

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:380](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L380)

___

### delObject

▸ **delObject**(`id`, `callback?`): `void`

Delete an object of this instance.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4549](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4549)

▸ **delObject**(`id`, `options?`, `callback?`): `void`

Delete an object of this instance.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options?` | ``null`` \| `DelObjectOptions` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4550](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4550)

___

### delObjectAsync

▸ **delObjectAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes an object from the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `DelObjectOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:297](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L297)

___

### delState

▸ **delState**(`id`, `callback?`): `void`

Deletes a state of this instance.
The object will NOT be deleted. If you want to delete it too, use @delObject instead.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

No error is returned if state does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9215](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9215)

▸ **delState**(`id`, `options`, `callback?`): `void`

Deletes a state of this instance.
The object will NOT be deleted. If you want to delete it too, use @delObject instead.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

No error is returned if state does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9216](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9216)

___

### delStateAsync

▸ **delStateAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes a state from the states DB, but not the associated object. Consider using @link{deleteState} instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L378)

___

### delay

▸ **delay**(`timeout`): `Promise`<`void`\>

delays the fullfillment of the promise the amount of time.
it will not fullfill during and after adapter shutdown

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout` | `number` | timeout in milliseconds |

#### Returns

`Promise`<`void`\>

promise when timeout is over

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2822](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2822)

___

### deleteChannel

▸ **deleteChannel**(`channelName`, `options?`, `callback?`): `void`

Deletes channel and udnerlying structure

**`alais`** deleteChannel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` | is the part of ID like: adapter.instance.<deviceName>.<channelName> |
| `options?` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5846](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5846)

▸ **deleteChannel**(`parentDevice`, `channelName`, `options?`, `callback?`): `void`

Deletes channel and udnerlying structure

**`alais`** deleteChannel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentDevice` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `channelName` | `string` | is the part of ID like: adapter.instance.<deviceName>.<channelName> |
| `options?` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5847](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5847)

___

### deleteChannelAsync

▸ **deleteChannelAsync**(`channelName`, `options?`): `Promise`<`void`\>

Deletes a channel and its states. It must have been created with createChannel

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L642)

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

[packages/adapter/src/lib/adapter/adapter.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L643)

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

[packages/adapter/src/lib/adapter/adapter.ts:5731](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5731)

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

[packages/adapter/src/lib/adapter/adapter.ts:5737](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5737)

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

[packages/adapter/src/lib/adapter/adapter.ts:328](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L328)

___

### deleteDevice

▸ **deleteDevice**(`deviceName`, `callback?`): `void`

Delete device with all its channels and states.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5532](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5532)

▸ **deleteDevice**(`deviceName`, `options`, `callback?`): `void`

Delete device with all its channels and states.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5533](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5533)

___

### deleteDeviceAsync

▸ **deleteDeviceAsync**(`deviceName`, `options?`): `Promise`<`void`\>

deletes a device, its channels and states

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:320](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L320)

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

[packages/adapter/src/lib/adapter/adapter.ts:5953](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5953)

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

[packages/adapter/src/lib/adapter/adapter.ts:5954](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5954)

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

[packages/adapter/src/lib/adapter/adapter.ts:5955](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5955)

___

### deleteStateAsync

▸ **deleteStateAsync**(`stateName`, `options?`): `Promise`<`void`\>

Deletes a state. It must have been created with createState

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateName` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L648)

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

[packages/adapter/src/lib/adapter/adapter.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L649)

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

[packages/adapter/src/lib/adapter/adapter.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L650)

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

[packages/adapter/src/lib/adapter/adapter.ts:6430](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6430)

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

[packages/adapter/src/lib/adapter/adapter.ts:6437](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6437)

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

[packages/adapter/src/lib/adapter/adapter.ts:346](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L346)

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

[packages/adapter/src/lib/adapter/adapter.ts:1625](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1625)

___

### disable

▸ **disable**(): `SetObjectPromise`

Disables and stops the adapter instance.

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2700](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2700)

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`since`** v0.1.26

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

Encrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretVal` | `string` | to use for encrypt (or value if only one parameter is given) |
| `value?` | `string` | to encrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1557](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1557)

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`since`** v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### extendForeignObject

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `callback?`): `void`

Same as {@link Adapter.extendObject}, but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be extended |
| `objPart` | `PartialObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3576](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3576)

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `options`, `callback?`): `void`

Same as {@link Adapter.extendObject}, but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be extended |
| `objPart` | `PartialObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | - |
| `options` | `ExtendObjectOptions` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3581](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3581)

___

### extendForeignObjectAsync

▸ **extendForeignObjectAsync**<`T`\>(`id`, `objPart`, `options?`): `SetObjectPromise`

Extend an object (which might not belong to this adapter) and create it if it might not exist

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

[packages/adapter/src/lib/adapter/adapter.ts:269](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L269)

___

### extendObject

▸ **extendObject**(`id`, `objPart`, `callback?`): `void`

Extend some object and create it if it does not exist

You can change or extend some object. E.g existing object is:
<pre><code>
    {
         common: {
             name: 'Adapter name',
             desc: 'Description'
         },
         type: 'state',
         native: {
             unused: 'text'
         }
    }
</code></pre>

If following object will be passed as argument

<pre><code>
    {
         common: {
             desc: 'New description',
             min: 0,
             max: 100
         },
         native: {
             unused: null
         }
    }
</code></pre>

We will get as output:
<pre><code>
    {
         common: {
             desc: 'New description',
             min: 0,
             max: 100
         },
         type: 'state',
         native: {
         }
    }
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be extended |
| `objPart` | `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3199](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3199)

▸ **extendObject**(`id`, `objPart`, `options`, `callback?`): `void`

Extend some object and create it if it does not exist

You can change or extend some object. E.g existing object is:
<pre><code>
    {
         common: {
             name: 'Adapter name',
             desc: 'Description'
         },
         type: 'state',
         native: {
             unused: 'text'
         }
    }
</code></pre>

If following object will be passed as argument

<pre><code>
    {
         common: {
             desc: 'New description',
             min: 0,
             max: 100
         },
         native: {
             unused: null
         }
    }
</code></pre>

We will get as output:
<pre><code>
    {
         common: {
             desc: 'New description',
             min: 0,
             max: 100
         },
         type: 'state',
         native: {
         }
    }
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be extended |
| `objPart` | `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } | - |
| `options` | `ExtendObjectOptions` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3200](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3200)

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `objPart`, `options?`): `SetObjectPromise`

Extend an object and create it if it might not exist

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `objPart` | `PartialStateObject` & { `type?`: ``"state"``  } & `PartialChannelObject` & { `type?`: ``"state"``  } & `PartialDeviceObject` & { `type?`: ``"state"``  } & `PartialFolderObject` & { `type?`: ``"state"``  } & `PartialEnumObject` & { `type?`: ``"state"``  } & `PartialMetaObject` & { `type?`: ``"state"``  } & `PartialHostObject` & { `type?`: ``"state"``  } & `PartialAdapterObject` & { `type?`: ``"state"``  } & `PartialInstanceObject` & { `type?`: ``"state"``  } & `PartialUserObject` & { `type?`: ``"state"``  } & `PartialGroupObject` & { `type?`: ``"state"``  } & `PartialScriptObject` & { `type?`: ``"state"``  } & `PartialOtherObject` & { `type?`: ``"state"``  } \| `PartialStateObject` & { `type?`: ``"channel"``  } & `PartialChannelObject` & { `type?`: ``"channel"``  } & `PartialDeviceObject` & { `type?`: ``"channel"``  } & `PartialFolderObject` & { `type?`: ``"channel"``  } & `PartialEnumObject` & { `type?`: ``"channel"``  } & `PartialMetaObject` & { `type?`: ``"channel"``  } & `PartialHostObject` & { `type?`: ``"channel"``  } & `PartialAdapterObject` & { `type?`: ``"channel"``  } & `PartialInstanceObject` & { `type?`: ``"channel"``  } & `PartialUserObject` & { `type?`: ``"channel"``  } & `PartialGroupObject` & { `type?`: ``"channel"``  } & `PartialScriptObject` & { `type?`: ``"channel"``  } & `PartialOtherObject` & { `type?`: ``"channel"``  } \| `PartialStateObject` & { `type?`: ``"device"``  } & `PartialChannelObject` & { `type?`: ``"device"``  } & `PartialDeviceObject` & { `type?`: ``"device"``  } & `PartialFolderObject` & { `type?`: ``"device"``  } & `PartialEnumObject` & { `type?`: ``"device"``  } & `PartialMetaObject` & { `type?`: ``"device"``  } & `PartialHostObject` & { `type?`: ``"device"``  } & `PartialAdapterObject` & { `type?`: ``"device"``  } & `PartialInstanceObject` & { `type?`: ``"device"``  } & `PartialUserObject` & { `type?`: ``"device"``  } & `PartialGroupObject` & { `type?`: ``"device"``  } & `PartialScriptObject` & { `type?`: ``"device"``  } & `PartialOtherObject` & { `type?`: ``"device"``  } \| `PartialStateObject` & { `type?`: ``"folder"``  } & `PartialChannelObject` & { `type?`: ``"folder"``  } & `PartialDeviceObject` & { `type?`: ``"folder"``  } & `PartialFolderObject` & { `type?`: ``"folder"``  } & `PartialEnumObject` & { `type?`: ``"folder"``  } & `PartialMetaObject` & { `type?`: ``"folder"``  } & `PartialHostObject` & { `type?`: ``"folder"``  } & `PartialAdapterObject` & { `type?`: ``"folder"``  } & `PartialInstanceObject` & { `type?`: ``"folder"``  } & `PartialUserObject` & { `type?`: ``"folder"``  } & `PartialGroupObject` & { `type?`: ``"folder"``  } & `PartialScriptObject` & { `type?`: ``"folder"``  } & `PartialOtherObject` & { `type?`: ``"folder"``  } \| `PartialStateObject` & { `type?`: ``"enum"``  } & `PartialChannelObject` & { `type?`: ``"enum"``  } & `PartialDeviceObject` & { `type?`: ``"enum"``  } & `PartialFolderObject` & { `type?`: ``"enum"``  } & `PartialEnumObject` & { `type?`: ``"enum"``  } & `PartialMetaObject` & { `type?`: ``"enum"``  } & `PartialHostObject` & { `type?`: ``"enum"``  } & `PartialAdapterObject` & { `type?`: ``"enum"``  } & `PartialInstanceObject` & { `type?`: ``"enum"``  } & `PartialUserObject` & { `type?`: ``"enum"``  } & `PartialGroupObject` & { `type?`: ``"enum"``  } & `PartialScriptObject` & { `type?`: ``"enum"``  } & `PartialOtherObject` & { `type?`: ``"enum"``  } \| `PartialStateObject` & { `type?`: ``"meta"``  } & `PartialChannelObject` & { `type?`: ``"meta"``  } & `PartialDeviceObject` & { `type?`: ``"meta"``  } & `PartialFolderObject` & { `type?`: ``"meta"``  } & `PartialEnumObject` & { `type?`: ``"meta"``  } & `PartialMetaObject` & { `type?`: ``"meta"``  } & `PartialHostObject` & { `type?`: ``"meta"``  } & `PartialAdapterObject` & { `type?`: ``"meta"``  } & `PartialInstanceObject` & { `type?`: ``"meta"``  } & `PartialUserObject` & { `type?`: ``"meta"``  } & `PartialGroupObject` & { `type?`: ``"meta"``  } & `PartialScriptObject` & { `type?`: ``"meta"``  } & `PartialOtherObject` & { `type?`: ``"meta"``  } \| `PartialStateObject` & { `type?`: ``"host"``  } & `PartialChannelObject` & { `type?`: ``"host"``  } & `PartialDeviceObject` & { `type?`: ``"host"``  } & `PartialFolderObject` & { `type?`: ``"host"``  } & `PartialEnumObject` & { `type?`: ``"host"``  } & `PartialMetaObject` & { `type?`: ``"host"``  } & `PartialHostObject` & { `type?`: ``"host"``  } & `PartialAdapterObject` & { `type?`: ``"host"``  } & `PartialInstanceObject` & { `type?`: ``"host"``  } & `PartialUserObject` & { `type?`: ``"host"``  } & `PartialGroupObject` & { `type?`: ``"host"``  } & `PartialScriptObject` & { `type?`: ``"host"``  } & `PartialOtherObject` & { `type?`: ``"host"``  } \| `PartialStateObject` & { `type?`: ``"adapter"``  } & `PartialChannelObject` & { `type?`: ``"adapter"``  } & `PartialDeviceObject` & { `type?`: ``"adapter"``  } & `PartialFolderObject` & { `type?`: ``"adapter"``  } & `PartialEnumObject` & { `type?`: ``"adapter"``  } & `PartialMetaObject` & { `type?`: ``"adapter"``  } & `PartialHostObject` & { `type?`: ``"adapter"``  } & `PartialAdapterObject` & { `type?`: ``"adapter"``  } & `PartialInstanceObject` & { `type?`: ``"adapter"``  } & `PartialUserObject` & { `type?`: ``"adapter"``  } & `PartialGroupObject` & { `type?`: ``"adapter"``  } & `PartialScriptObject` & { `type?`: ``"adapter"``  } & `PartialOtherObject` & { `type?`: ``"adapter"``  } \| `PartialStateObject` & { `type?`: ``"instance"``  } & `PartialChannelObject` & { `type?`: ``"instance"``  } & `PartialDeviceObject` & { `type?`: ``"instance"``  } & `PartialFolderObject` & { `type?`: ``"instance"``  } & `PartialEnumObject` & { `type?`: ``"instance"``  } & `PartialMetaObject` & { `type?`: ``"instance"``  } & `PartialHostObject` & { `type?`: ``"instance"``  } & `PartialAdapterObject` & { `type?`: ``"instance"``  } & `PartialInstanceObject` & { `type?`: ``"instance"``  } & `PartialUserObject` & { `type?`: ``"instance"``  } & `PartialGroupObject` & { `type?`: ``"instance"``  } & `PartialScriptObject` & { `type?`: ``"instance"``  } & `PartialOtherObject` & { `type?`: ``"instance"``  } \| `PartialStateObject` & { `type?`: ``"user"``  } & `PartialChannelObject` & { `type?`: ``"user"``  } & `PartialDeviceObject` & { `type?`: ``"user"``  } & `PartialFolderObject` & { `type?`: ``"user"``  } & `PartialEnumObject` & { `type?`: ``"user"``  } & `PartialMetaObject` & { `type?`: ``"user"``  } & `PartialHostObject` & { `type?`: ``"user"``  } & `PartialAdapterObject` & { `type?`: ``"user"``  } & `PartialInstanceObject` & { `type?`: ``"user"``  } & `PartialUserObject` & { `type?`: ``"user"``  } & `PartialGroupObject` & { `type?`: ``"user"``  } & `PartialScriptObject` & { `type?`: ``"user"``  } & `PartialOtherObject` & { `type?`: ``"user"``  } \| `PartialStateObject` & { `type?`: ``"group"``  } & `PartialChannelObject` & { `type?`: ``"group"``  } & `PartialDeviceObject` & { `type?`: ``"group"``  } & `PartialFolderObject` & { `type?`: ``"group"``  } & `PartialEnumObject` & { `type?`: ``"group"``  } & `PartialMetaObject` & { `type?`: ``"group"``  } & `PartialHostObject` & { `type?`: ``"group"``  } & `PartialAdapterObject` & { `type?`: ``"group"``  } & `PartialInstanceObject` & { `type?`: ``"group"``  } & `PartialUserObject` & { `type?`: ``"group"``  } & `PartialGroupObject` & { `type?`: ``"group"``  } & `PartialScriptObject` & { `type?`: ``"group"``  } & `PartialOtherObject` & { `type?`: ``"group"``  } \| `PartialStateObject` & { `type?`: ``"script"``  } & `PartialChannelObject` & { `type?`: ``"script"``  } & `PartialDeviceObject` & { `type?`: ``"script"``  } & `PartialFolderObject` & { `type?`: ``"script"``  } & `PartialEnumObject` & { `type?`: ``"script"``  } & `PartialMetaObject` & { `type?`: ``"script"``  } & `PartialHostObject` & { `type?`: ``"script"``  } & `PartialAdapterObject` & { `type?`: ``"script"``  } & `PartialInstanceObject` & { `type?`: ``"script"``  } & `PartialUserObject` & { `type?`: ``"script"``  } & `PartialGroupObject` & { `type?`: ``"script"``  } & `PartialScriptObject` & { `type?`: ``"script"``  } & `PartialOtherObject` & { `type?`: ``"script"``  } \| `PartialStateObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialChannelObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialDeviceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialFolderObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialEnumObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialMetaObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialHostObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialAdapterObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialInstanceObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialUserObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialGroupObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialScriptObject` & { `type?`: ``"config"`` \| ``"chart"``  } & `PartialOtherObject` & { `type?`: ``"config"`` \| ``"chart"``  } |
| `options?` | `ExtendObjectOptions` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:255](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L255)

___

### fileExists

▸ **fileExists**(`adapterName`, `path`, `callback`): `void`

Checks if file exists in DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | `GenericCallback`<`boolean`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6919](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6919)

▸ **fileExists**(`adapterName`, `path`, `options`, `callback`): `void`

Checks if file exists in DB.

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

[packages/adapter/src/lib/adapter/adapter.ts:6920](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6920)

___

### fileExistsAsync

▸ **fileExistsAsync**(`adapterName`, `path`, `options?`): `Promise`<`boolean`\>

Checks if a file exists in the DB

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:373](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L373)

___

### findForeignObject

▸ **findForeignObject**(`idOrName`, `type`, `callback`): `void`

Find any object by name or ID.

Find object by the exact name or ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | `string` | optional common.type of state: 'number', 'string', 'boolean', 'file', ... |
| `callback` | `FindObjectCallback` | return result        <pre><code>            adapter.findForeignObject('Some name', function (err, id, name) {              if (err) adapter.log.error('Cannot get object: ' + err);              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4428](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4428)

▸ **findForeignObject**(`idOrName`, `type`, `options`, `callback`): `void`

Find any object by name or ID.

Find object by the exact name or ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | `string` | optional common.type of state: 'number', 'string', 'boolean', 'file', ... |
| `options` | `unknown` | optional user context |
| `callback` | `FindObjectCallback` | return result        <pre><code>            adapter.findForeignObject('Some name', function (err, id, name) {              if (err) adapter.log.error('Cannot get object: ' + err);              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4429](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4429)

___

### findForeignObjectAsync

▸ **findForeignObjectAsync**(`idOrName`, `type`): `Promise`<{ `id`: `string` ; `name`: `string`  }\>

Finds an object by its ID or name

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrName` | `string` |
| `type` | `string` |

#### Returns

`Promise`<{ `id`: `string` ; `name`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L590)

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

[packages/adapter/src/lib/adapter/adapter.ts:7002](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7002)

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

[packages/adapter/src/lib/adapter/adapter.ts:7003](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7003)

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

[packages/adapter/src/lib/adapter/adapter.ts:6967](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6967)

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

[packages/adapter/src/lib/adapter/adapter.ts:6968](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6968)

___

### getAdapterObjects

▸ **getAdapterObjects**(`callback`): `Promise`<`void` \| `Record`<`string`, `AdapterScopedObject`\>\>

Get all states, channels and devices of this adapter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`objects`: `Record`<`string`, `AdapterScopedObject`\>) => `void` | return result        <pre><code>            function (objects) {                for (var id in objects) {                    adapter.log.debug(id);                }            }        </code></pre> |

#### Returns

`Promise`<`void` \| `Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3117](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3117)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

Get all states, channels, devices and folders of this adapter

#### Returns

`Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:444](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L444)

___

### getBinaryState

▸ **getBinaryState**(`id`, `callback`): `void`

Same as getForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `callback` | `GetBinaryStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10392](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10392)

▸ **getBinaryState**(`id`, `options`, `callback`): `void`

Same as getForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `options` | `unknown` | optional |
| `callback` | `GetBinaryStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10393](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10393)

___

### getBinaryStateAsync

▸ **getBinaryStateAsync**(`id`, `options?`): `GetBinaryStatePromise`

Despite the naming convention, this method doesn't prepend the adapter namespace. Use getForeignBinaryStateAsync instead.
Reads a binary state from Redis

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetBinaryStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:406](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L406)

___

### getCertificates

▸ **getCertificates**(`publicName?`, `privateName?`, `chainedName?`, `callback?`): `void`

returns SSL certificates by name

This function returns SSL certificates (private key, public cert and chained certificate).
Names are defined in the system's configuration in admin, e.g. "defaultPrivate", "defaultPublic".
The result can be directly used for creation of https server.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicName?` | `string` | - |
| `privateName?` | `string` | - |
| `chainedName?` | `string` | - |
| `callback?` | `GetCertificatesCallback` | return result        <pre><code>            function (err, certs, letsEncrypt) {              adapter.log.debug('private key: ' + certs.key);              adapter.log.debug('public cert: ' + certs.cert);              adapter.log.debug('chained cert: ' + certs.ca);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2544](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2544)

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

[packages/adapter/src/lib/adapter/adapter.ts:442](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L442)

___

### getChannels

▸ **getChannels**(`callback`): `void`

Returns a list of all channels in this adapter instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:662](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L662)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:663](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L663)

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

[packages/adapter/src/lib/adapter/adapter.ts:664](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L664)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<`ChannelObject`[]\>

Returns a list of all channels in this adapter instance @param parentDevice (optional)
Name of the parent device to filter the channels by @param options (optional) Some internal options.

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L674)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L675)

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

[packages/adapter/src/lib/adapter/adapter.ts:6109](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6109)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6110](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6110)

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

[packages/adapter/src/lib/adapter/adapter.ts:6111](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6111)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<`ChannelObject`[]\>

Returns a list of all channels in this adapter instance @param parentDevice (optional) Name
of the parent device to filter the channels by @param options (optional) Some internal options.

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L656)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:657](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L657)

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

[packages/adapter/src/lib/adapter/adapter.ts:6055](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6055)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`DeviceObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6056](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6056)

___

### getDevicesAsync

▸ **getDevicesAsync**(`options?`): `Promise`<`DeviceObject`[]\>

Returns a list of all devices in this adapter instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `unknown` |

#### Returns

`Promise`<`DeviceObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L336)

___

### getEncryptedConfig

▸ **getEncryptedConfig**(`attribute`, `callback?`): `Promise`<`string` \| `void`\>

Reads the encrypted parameter from config.

It returns promise if no callback is provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attribute` | `string` | attribute name in native configuration part |
| `callback?` | `GetEncryptedConfigCallback` | - |

#### Returns

`Promise`<`string` \| `void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2717](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2717)

___

### getEnum

▸ **getEnum**(`callback`): `void`

Get the enum tree.

Get enums of specified tree or all enums if nothing specified as object with values.
If getEnum called with no enum specified, all enums will be returned:
<pre><code>
     adapter.getEnums(function (err, enums, requestEnum) {
       // All enums
       if (err) adapter.log.error('Cannot get object: ' + err);
       for (var e in enums) {
          adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
       }
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `GetEnumCallback` | return result        <pre><code>            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3995](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3995)

▸ **getEnum**(`name`, `callback`): `void`

Get the enum tree.

Get enums of specified tree or all enums if nothing specified as object with values.
If getEnum called with no enum specified, all enums will be returned:
<pre><code>
     adapter.getEnums(function (err, enums, requestEnum) {
       // All enums
       if (err) adapter.log.error('Cannot get object: ' + err);
       for (var e in enums) {
          adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
       }
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `callback` | `GetEnumCallback` | return result        <pre><code>            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3996](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3996)

▸ **getEnum**(`name`, `options`, `callback`): `void`

Get the enum tree.

Get enums of specified tree or all enums if nothing specified as object with values.
If getEnum called with no enum specified, all enums will be returned:
<pre><code>
     adapter.getEnums(function (err, enums, requestEnum) {
       // All enums
       if (err) adapter.log.error('Cannot get object: ' + err);
       for (var e in enums) {
          adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
       }
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `options` | `unknown` | - |
| `callback` | `GetEnumCallback` | return result        <pre><code>            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3997](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3997)

___

### getEnumAsync

▸ **getEnumAsync**(`name`, `options?`): `Promise`<{ `requestEnum`: `string` ; `result`: `Record`<`string`, `any`\>  }\>

Returns the enum tree, filtered by the optional enum name

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<{ `requestEnum`: `string` ; `result`: `Record`<`string`, `any`\>  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L293)

___

### getEnums

▸ **getEnums**(`callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `GetEnumsCallback` | return result        <pre><code>            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4084](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4084)

▸ **getEnums**(`enumList`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `callback` | `GetEnumsCallback` | return result        <pre><code>            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4085](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4085)

▸ **getEnums**(`enumList`, `options`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `options` | `unknown` | - |
| `callback` | `GetEnumsCallback` | return result        <pre><code>            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4086](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4086)

___

### getEnumsAsync

▸ **getEnumsAsync**(`enumList`, `options?`): `GetEnumsPromise`

Returns the enum tree, filtered by the optional enum name

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumList` | `EnumList` |
| `options?` | `unknown` |

#### Returns

`GetEnumsPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L295)

___

### getForeignBinaryState

▸ **getForeignBinaryState**(`id`, `callback`): `void`

Read a binary block from redis, e.g. an image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `callback` | `GetBinaryStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10318](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10318)

▸ **getForeignBinaryState**(`id`, `options`, `callback`): `void`

Read a binary block from redis, e.g. an image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `options` | `unknown` | optional |
| `callback` | `GetBinaryStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10319](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10319)

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

[packages/adapter/src/lib/adapter/adapter.ts:401](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L401)

___

### getForeignObject

▸ **getForeignObject**<`T`\>(`id`, `callback`): `void` \| `Promise`<`void`\>

Get any object.

ID must be specified with namespace.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | exactly object ID (with namespace) |
| `callback` | `GetObjectCallback`<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4482](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4482)

▸ **getForeignObject**<`T`\>(`id`, `options`, `callback`): `void` \| `Promise`<`void`\>

Get any object.

ID must be specified with namespace.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | exactly object ID (with namespace) |
| `options` | `unknown` | - |
| `callback` | `GetObjectCallback`<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4483](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4483)

___

### getForeignObjectAsync

▸ **getForeignObjectAsync**<`T`\>(`id`, `options?`): `GetObjectPromise`<`T`\>

Reads an object (which might not belong to this adapter) from the object db

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

[packages/adapter/src/lib/adapter/adapter.ts:447](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L447)

___

### getForeignObjects

▸ **getForeignObjects**(`pattern`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       <pre><code>
           adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             // objs look like:
             // {
             //    "hm-rega.0.ABC0000.1.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.livingroom': 'Living room',
             //           'enums.functions.light': 'Light'
             //       }
             //    },
             //    "hm-rega.0.ABC0000.2.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.sleepingroom': 'Sleeping room',
             //           'enums.functions.window': 'Windows'
             //       }
             //    }
           }
       </code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `callback` | `GetObjectsCallback` | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4231](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4231)

▸ **getForeignObjects**(`pattern`, `options`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       <pre><code>
           adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             // objs look like:
             // {
             //    "hm-rega.0.ABC0000.1.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.livingroom': 'Living room',
             //           'enums.functions.light': 'Light'
             //       }
             //    },
             //    "hm-rega.0.ABC0000.2.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.sleepingroom': 'Sleeping room',
             //           'enums.functions.window': 'Windows'
             //       }
             //    }
           }
       </code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `options` | `unknown` | - |
| `callback` | `GetObjectsCallback` | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4232](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4232)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       <pre><code>
           adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             // objs look like:
             // {
             //    "hm-rega.0.ABC0000.1.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.livingroom': 'Living room',
             //           'enums.functions.light': 'Light'
             //       }
             //    },
             //    "hm-rega.0.ABC0000.2.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.sleepingroom': 'Sleeping room',
             //           'enums.functions.window': 'Windows'
             //       }
             //    }
           }
       </code></pre>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `callback` | `GetObjectsCallbackTyped`<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4233](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4233)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `enums`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       <pre><code>
           adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             // objs look like:
             // {
             //    "hm-rega.0.ABC0000.1.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.livingroom': 'Living room',
             //           'enums.functions.light': 'Light'
             //       }
             //    },
             //    "hm-rega.0.ABC0000.2.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.sleepingroom': 'Sleeping room',
             //           'enums.functions.window': 'Windows'
             //       }
             //    }
           }
       </code></pre>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `enums` | `EnumList` | object ID, that must be overwritten or created. |
| `callback` | `GetObjectsCallbackTyped`<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4238](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4238)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `options`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       <pre><code>
           adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             // objs look like:
             // {
             //    "hm-rega.0.ABC0000.1.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.livingroom': 'Living room',
             //           'enums.functions.light': 'Light'
             //       }
             //    },
             //    "hm-rega.0.ABC0000.2.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.sleepingroom': 'Sleeping room',
             //           'enums.functions.window': 'Windows'
             //       }
             //    }
           }
       </code></pre>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `options` | `unknown` | - |
| `callback` | `GetObjectsCallbackTyped`<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4244](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4244)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `enums`, `options`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       <pre><code>
           adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             // objs look like:
             // {
             //    "hm-rega.0.ABC0000.1.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.livingroom': 'Living room',
             //           'enums.functions.light': 'Light'
             //       }
             //    },
             //    "hm-rega.0.ABC0000.2.STATE": {
             //        common: {...},
             //        native: {},
             //        type: 'state',
             //        enums: {
             //           'enums.rooms.sleepingroom': 'Sleeping room',
             //           'enums.functions.window': 'Windows'
             //       }
             //    }
           }
       </code></pre>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `enums` | ``null`` \| `EnumList` | object ID, that must be overwritten or created. |
| `options` | `unknown` | - |
| `callback` | `GetObjectsCallbackTyped`<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4250](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4250)

___

### getForeignObjectsAsync

▸ **getForeignObjectsAsync**<`T`\>(`pattern`, `type`, `enums`, `options?`): `GetObjectsPromiseTyped`<`T`\>

Get foreign objects by pattern, by specific type and resolve their enums.

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

[packages/adapter/src/lib/adapter/adapter.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L558)

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

[packages/adapter/src/lib/adapter/adapter.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L564)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): `GetObjectsPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetObjectsPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L569)

___

### getForeignState

▸ **getForeignState**(`id`, `callback`): `void`

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `callback` | `GetStateCallback` | return result        <pre><code>            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in @setState explanation |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8833](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8833)

▸ **getForeignState**(`id`, `options`, `callback`): `void`

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `options` | `unknown` | optional user context |
| `callback` | `GetStateCallback` | return result        <pre><code>            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in @setState explanation |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8834](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8834)

___

### getForeignStateAsync

▸ **getForeignStateAsync**(`id`, `options?`): `GetStatePromise`

Read a value (which might not belong to this adapter) from the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L420)

___

### getForeignStates

▸ **getForeignStates**(`pattern`, `callback`): `void`

Read all states of all adapters (and system states), that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
<pre><code>
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `callback` | `GetStatesCallback` | return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9422](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9422)

▸ **getForeignStates**(`pattern`, `options`, `callback`): `void`

Read all states of all adapters (and system states), that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
<pre><code>
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback` | `GetStatesCallback` | return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9423](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9423)

___

### getForeignStatesAsync

▸ **getForeignStatesAsync**(`pattern`, `options?`): `GetStatesPromise`

Read all states (which might not belong to this adapter) which match the given pattern

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetStatesPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:384](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L384)

___

### getHistory

▸ **getHistory**(`id`, `options`, `callback`): `void`

Read historian data for states of any instance or system state.

This function can read values from history adapters like: history, sql, influxdb. It expects the full path of object ID.
Normally only foreign history has interest, so there is no getHistory and getForeignHistory

Possible options:

 - instance - (optional) name of instance, where to read the historian data, e.g. 'history.0', 'sql.1'. By default will be taken from system settings.
 - start - (optional) time in ms - Date.now()', by default is (now - 1 week)
 - end - (optional) time in ms - Date.now()', by default is (now + 5000 seconds)
 - step - (optional) used in aggregate (m4, max, min, average, total) step in ms of intervals
 - count - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set.
 - from - if from field should be included in answer
 - ack - if ack field should be included in answer
 - q - if q field should be included in answer
 - addId - if id field should be included in answer
 - limit - do not return more entries than limit
 - ignoreNull - if null values should be include (false), replaced by last not null value (true) or replaced with 0 (0)
 - sessionId - (optional) identifier of request, will be returned back in the answer
 - aggregate - aggregate method:
     - minmax - used special algorithm. Splice the whole time range in small intervals and find for every interval max, min, start and end values.
     - max - Splice the whole time range in small intervals and find for every interval max value and use it for this interval (nulls will be ignored).
     - min - Same as max, but take minimal value.
     - average - Same as max, but take average value.
     - total - Same as max, but calculate total value.
     - count - Same as max, but calculate number of values (nulls will be calculated).
     - none - No aggregation at all. Only raw values in given period.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `options` | `GetHistoryOptions` | see function description |
| `callback` | `GetHistoryCallback` | return result        <pre><code>            function (error, result, step, sessionId) {              if (error) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in @setState explanation |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9112](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9112)

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

[packages/adapter/src/lib/adapter/adapter.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L376)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](AdapterClass.md#defaultmaxlisteners).

**`since`** v1.0.0

#### Returns

`number`

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### getObject

▸ **getObject**(`id`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `callback` | `GetObjectCallback`<`string`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3780](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3780)

▸ **getObject**(`id`, `options`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options` | `unknown` | - |
| `callback` | `GetObjectCallback`<`string`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3781](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3781)

___

### getObjectAsync

▸ **getObjectAsync**(`id`, `options?`): `GetObjectPromise`<`string`\>

Reads an object from the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetObjectPromise`<`string`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:275](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L275)

___

### getObjectList

▸ **getObjectList**(`params`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
to get all objects of the instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| `GetObjectViewParams` |  |
| `callback` | `GetObjectListCallback` | <pre><code>          function (err, res) {              if (res && res.rows) {                   for (var i = 0; i < res.rows.length; i++) {                       var id  = res.rows[i].id;                       var obj = res.rows[i].value;                       console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                   if (!res.rows.length) console.log('No objects found.');              } else {                  console.log('No objects found: ' + err);              }          }       </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3939](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3939)

▸ **getObjectList**(`params`, `options`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
to get all objects of the instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| `GetObjectViewParams` |  |
| `options` | `Record`<`string`, `any`\> \| { `sorted?`: `boolean`  } |  |
| `callback` | `GetObjectListCallback` | <pre><code>          function (err, res) {              if (res && res.rows) {                   for (var i = 0; i < res.rows.length; i++) {                       var id  = res.rows[i].id;                       var obj = res.rows[i].value;                       console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                   if (!res.rows.length) console.log('No objects found.');              } else {                  console.log('No objects found: ' + err);              }          }       </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3940](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3940)

___

### getObjectListAsync

▸ **getObjectListAsync**(`params`, `options?`): `GetObjectListPromise`

Returns a list of objects with id between params.startkey and params.endkey

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | ``null`` \| `GetObjectViewParams` |
| `options?` | `Record`<`string`, `any`\> \| { `sorted?`: `boolean`  } |

#### Returns

`GetObjectListPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L288)

___

### getObjectView

▸ **getObjectView**<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

Read object view from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
to get all objects of the instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` = `string` |
| `Search` | extends `string` = `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `design` | `Design` | name of the design |
| `search` | `Search` | name of the view |
| `params` | `undefined` \| ``null`` \| `GetObjectViewParams` | object containing startkey: first id to include in result; endkey: last id to include in result |
| `callback` | `GetObjectViewCallback`<`InferGetObjectViewItemType`<`Design`, `Search`\>\> | return result      <pre><code>          function (err, doc) {              if (doc && doc.rows) {                   for (var i = 0; i < doc.rows.length; i++) {                       var id  = doc.rows[i].id;                        var obj = doc.rows[i].value;                        console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                           if (!doc.rows.length) console.log('No objects found.');               } else {                   console.log('No objects found: ' + err);               }           }           </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3823](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3823)

▸ **getObjectView**<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

Read object view from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
to get all objects of the instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Design` | extends `string` = `string` |
| `Search` | extends `string` = `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `design` | `Design` | name of the design |
| `search` | `Search` | name of the view |
| `params` | `undefined` \| ``null`` \| `GetObjectViewParams` | object containing startkey: first id to include in result; endkey: last id to include in result |
| `options` | `unknown` |  |
| `callback` | `GetObjectViewCallback`<`InferGetObjectViewItemType`<`Design`, `Search`\>\> | return result      <pre><code>          function (err, doc) {              if (doc && doc.rows) {                   for (var i = 0; i < doc.rows.length; i++) {                       var id  = doc.rows[i].id;                        var obj = doc.rows[i].value;                        console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                           if (!doc.rows.length) console.log('No objects found.');               } else {                   console.log('No objects found: ' + err);               }           }           </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3829](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3829)

___

### getObjectViewAsync

▸ **getObjectViewAsync**<`Design`, `Search`\>(`design`, `search`, `params`, `options?`): `GetObjectViewPromise`<`InferGetObjectViewItemType`<`Design`, `Search`\>\>

Query a predefined object view (similar to SQL stored procedures) and return the results
For a detailed description refer to https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#object-fields
or http://guide.couchdb.org/editions/1/en/views.html

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

[packages/adapter/src/lib/adapter/adapter.ts:281](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L281)

___

### getPluginConfig

▸ **getPluginConfig**(`name`): ``null`` \| `Record`<`string`, `any`\>

Return plugin configuration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to return |

#### Returns

``null`` \| `Record`<`string`, `any`\>

plugin configuration or null if not existent or not isActive

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10504](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10504)

___

### getPluginInstance

▸ **getPluginInstance**(`name`): ``null`` \| `Plugin`

Return plugin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to return |

#### Returns

``null`` \| `Plugin`

plugin instance or null if not existent or not isActive

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10486](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10486)

___

### getPort

▸ **getPort**(`port`, `host?`, `callback?`): `void`

Helper function to find next free port

Looks for first free TCP port starting with given one:
<pre><code>
    adapter.getPort(8081, function (port) {
        adapter.log.debug('Following port is free: ' + port);
    });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` | port number to start the search for free port |
| `host?` | `string` | - |
| `callback?` | (`port`: `number`) => `void` | return result        <pre><code>function (port) {}</code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1753](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1753)

___

### getPortAsync

▸ **getPortAsync**(`port`): `Promise`<`number`\>

Helper function that looks for first free TCP port starting with the given one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `number` |

#### Returns

`Promise`<`number`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L418)

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

[packages/adapter/src/lib/adapter/adapter.ts:1576](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1576)

___

### getState

▸ **getState**(`id`, `callback`): `void`

Read value from states DB.

This function can read values from states DB for this adapter.
Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `callback` | `GetStateCallback` | return result        <pre><code>            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in @setState explanation |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8802](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8802)

▸ **getState**(`id`, `options`, `callback`): `void`

Read value from states DB.

This function can read values from states DB for this adapter.
Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `options` | `unknown` | optional user context |
| `callback` | `GetStateCallback` | return result        <pre><code>            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in @setState explanation |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8803](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8803)

___

### getStateAsync

▸ **getStateAsync**(`id`, `options?`): `GetStatePromise`

Read a value from the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`GetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L305)

___

### getStates

▸ **getStates**(`pattern`, `callback`): `void`

Read all states of this adapter, that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
<pre><code>
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `callback` | `GetStatesCallback` | return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9297](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9297)

▸ **getStates**(`pattern`, `options`, `callback`): `void`

Read all states of this adapter, that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
<pre><code>
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback` | `GetStatesCallback` | return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9298](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9298)

___

### getStatesAsync

▸ **getStatesAsync**(`pattern`, `options?`): `GetStatesPromise`

Read all states of this adapter which match the given pattern

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetStatesPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L382)

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

[packages/adapter/src/lib/adapter/adapter.ts:6178](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6178)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6179](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6179)

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

[packages/adapter/src/lib/adapter/adapter.ts:6180](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6180)

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

[packages/adapter/src/lib/adapter/adapter.ts:6185](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6185)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<`StateObject`[]\>

Returns a list of all states in this adapter instance @param parentDevice (optional)
Name of the parent device to filter the channels by @param parentChannel (optional)
Name of the parent channel to filter the channels by @param options (optional) Some internal options.

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L682)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<`StateObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L683)

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

[packages/adapter/src/lib/adapter/adapter.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L684)

___

### getSuitableLicenses

▸ **getSuitableLicenses**(`all`): `Promise`<`any`[]\>

This method returns the list of license that can be used by this adapter

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `all` | `boolean` | if return the licenses, that used by other instances (true) or only for this instance (false) |

#### Returns

`Promise`<`any`[]\>

list of suitable licenses

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10550](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10550)

___

### getUserID

▸ **getUserID**(`username`): `Promise`<`string` \| `void`\>

Return ID of given username

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | name of the user |

#### Returns

`Promise`<`string` \| `void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1939](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1939)

___

### idToDCS

▸ **idToDCS**(`id`): ``null`` \| { `channel`: `string` ; `device`: `string` ; `state`: `string`  }

Convert ID into object with device's, channel's and state's name.

Convert "adapter.instance.D.C.S" in object {device: D, channel: C, state: S}
Convert ID to {device: D, channel: C, state: S}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | short or long string of ID like "stateID" or "adapterName.0.stateID". |

#### Returns

``null`` \| { `channel`: `string` ; `device`: `string` ; `state`: `string`  }

parsed ID as an object

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9183](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9183)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`since`** v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Defined in

node_modules/@types/node/events.d.ts:561

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`since`** v0.1.26

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

[packages/adapter/src/lib/adapter/adapter.ts:6778](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6778)

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

[packages/adapter/src/lib/adapter/adapter.ts:6779](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6779)

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

[packages/adapter/src/lib/adapter/adapter.ts:368](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L368)

___

### off

▸ **off**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

Alias for `emitter.removeListener()`.

**`since`** v10.0.0

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

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

node_modules/@types/node/events.d.ts:595

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`since`** v9.4.0

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

Read directory from DB.

This function reads the content of directory from DB for given adapter and path.
If getEnum called with no enum specified, all enums will be returned:
<pre><code>
     adapter.readDir('vis.0', '/main/', function (err, filesOrDirs) {
       // All enums
       if (err) adapter.log.error('Cannot read directory: ' + err);
       if (filesOrDirs) {
          for (var f = 0; f < filesOrDirs.length; f++) {
             adapter.log.debug('Directory main has following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
          }
      }
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | path to direcory without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0". |
| `callback` | `ReadDirCallback` | return result        <pre><code>            function (err, filesOrDirs) {                // filesOrDirs is array with elements like                // {                //      file:       'views.json,                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,                //      isDir:      true/false,                //      acl:        access control list object,                //      modifiedAt: time when modified,                //      createdAt:  time when created                // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6652](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6652)

▸ **readDir**(`adapterName`, `path`, `options`, `callback`): `void`

Read directory from DB.

This function reads the content of directory from DB for given adapter and path.
If getEnum called with no enum specified, all enums will be returned:
<pre><code>
     adapter.readDir('vis.0', '/main/', function (err, filesOrDirs) {
       // All enums
       if (err) adapter.log.error('Cannot read directory: ' + err);
       if (filesOrDirs) {
          for (var f = 0; f < filesOrDirs.length; f++) {
             adapter.log.debug('Directory main has following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
          }
      }
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | path to direcory without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0". |
| `options` | `unknown` | optional user context |
| `callback` | `ReadDirCallback` | return result        <pre><code>            function (err, filesOrDirs) {                // filesOrDirs is array with elements like                // {                //      file:       'views.json,                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,                //      isDir:      true/false,                //      acl:        access control list object,                //      modifiedAt: time when modified,                //      createdAt:  time when created                // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6653](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6653)

___

### readDirAsync

▸ **readDirAsync**(`adapterName`, `path`, `options?`): `ReadDirPromise`

reads the content of directory from DB for given adapter and path

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`ReadDirPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L362)

___

### readFile

▸ **readFile**(`adapterName`, `path`, `callback`): `void`

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
<pre><code>
     adapter.readFile('vis.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('Content of file is: ' + data);
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `callback` | `ReadFileCallback` | return result        <pre><code>            function (err, data) {                // data is utf8 or binary Buffer depends on the file extension.            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6804](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6804)

▸ **readFile**(`adapterName`, `path`, `options`, `callback`): `void`

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
<pre><code>
     adapter.readFile('vis.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('Content of file is: ' + data);
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `options` | `unknown` | optional user context |
| `callback` | `ReadFileCallback` | return result        <pre><code>            function (err, data) {                // data is utf8 or binary Buffer depends on the file extension.            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6805](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6805)

___

### readFileAsync

▸ **readFileAsync**(`adapterName`, `path`, `options?`): `ReadFilePromise`

reads the content of directory from DB for given adapter and path

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`ReadFilePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L370)

___

### registerNotification

▸ **registerNotification**<`Scope`\>(`scope`, `category`, `message`): `Promise`<`void`\>

Send notification with given scope and category to host of this adapter

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"system"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Scope` | scope to be addressed |
| `category` | ``null`` \| `NotificationScopes`[`Scope`] | to be addressed, if null message will be checked by regex of given scope |
| `message` | `string` | message to be stored/checked |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7434](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7434)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`AdapterClass`](AdapterClass.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

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

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

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

[packages/adapter/src/lib/adapter/adapter.ts:6744](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6744)

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

[packages/adapter/src/lib/adapter/adapter.ts:6745](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6745)

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

[packages/adapter/src/lib/adapter/adapter.ts:367](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L367)

___

### restart

▸ **restart**(): `void`

Restarts an instance of the adapter.

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2650](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2650)

___

### sendTo

▸ **sendTo**(`instanceName`, `message`, `callback?`): `void`

Send message to other adapter instance or all instances of adapter.

This function sends a message to specific instance or all instances of some specific adapter.
If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceName` | `string` | name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0". |
| `message` | `MessagePayload` | object that will be given as argument for request |
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7142](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7142)

▸ **sendTo**(`instanceName`, `command`, `message`, `callback?`): `void`

Send message to other adapter instance or all instances of adapter.

This function sends a message to specific instance or all instances of some specific adapter.
If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceName` | `string` | name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0". |
| `command` | `string` | command name, like "send", "browse", "list". Command is depend on target adapter implementation. |
| `message` | `MessagePayload` | object that will be given as argument for request |
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7147](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7147)

___

### sendToAsync

▸ **sendToAsync**(`instanceName`, `message`): `Promise`<`undefined` \| `Message`\>

Sends a message to a specific instance or all instances of some specific adapter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `message` | `MessagePayload` |

#### Returns

`Promise`<`undefined` \| `Message`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L502)

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

[packages/adapter/src/lib/adapter/adapter.ts:503](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L503)

___

### sendToHost

▸ **sendToHost**(`hostName`, `message`, `callback?`): `void`

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` | name of the host where the message must be send to. E.g. "myPC" or "system.host.myPC". If argument is empty, the message will be sent to all hosts. |
| `message` | `MessagePayload` | object that will be given as argument for request |
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7301](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7301)

▸ **sendToHost**(`hostName`, `command`, `message`, `callback?`): `void`

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` | name of the host where the message must be send to. E.g. "myPC" or "system.host.myPC". If argument is empty, the message will be sent to all hosts. |
| `command` | `string` | command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage) |
| `message` | `MessagePayload` | object that will be given as argument for request |
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7306](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7306)

___

### sendToHostAsync

▸ **sendToHostAsync**(`hostName`, `message`): `Promise`<`undefined` \| `Message`\>

Sends a message to a specific host or all hosts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostName` | `string` |
| `message` | `MessagePayload` |

#### Returns

`Promise`<`undefined` \| `Message`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:492](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L492)

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

[packages/adapter/src/lib/adapter/adapter.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L493)

___

### setBinaryState

▸ **setBinaryState**(`id`, `binary`, `callback`): `void`

Same as setForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `callback` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10299](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10299)

▸ **setBinaryState**(`id`, `binary`, `options`, `callback`): `void`

Same as setForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `options` | `unknown` | - |
| `callback` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10300](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10300)

___

### setBinaryStateAsync

▸ **setBinaryStateAsync**(`id`, `binary`, `options?`): `SetStatePromise`

Despite the naming convention, this method doesn't prepend the adapter namespace. Use setForeignBinaryStateAsync instead.
Writes a binary state into Redis

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | `Buffer` |
| `options?` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:400](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L400)

___

### setExecutableCapabilities

▸ **setExecutableCapabilities**(`execPath`, `capabilities`, `modeEffective?`, `modePermitted?`, `modeInherited?`): `Promise`<`void`\>

Set capabilities of the given executable. Only works on Linux systems.

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

[packages/adapter/src/lib/adapter/adapter.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L261)

___

### setForeignBinaryState

▸ **setForeignBinaryState**(`id`, `binary`, `callback`): `void`

Write binary block into redis, e.g image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `callback` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10158](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10158)

▸ **setForeignBinaryState**(`id`, `binary`, `options`, `callback`): `void`

Write binary block into redis, e.g image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `options` | `unknown` | - |
| `callback` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10159](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10159)

___

### setForeignBinaryStateAsync

▸ **setForeignBinaryStateAsync**(`id`, `binary`, `options?`): `SetStatePromise`

Writes a binary state into Redis. The ID will not be prefixed with the adapter namespace.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | `Buffer` |
| `options?` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:394](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L394)

___

### setForeignObject

▸ **setForeignObject**<`T`\>(`id`, `obj`, `callback?`): `void`

Same as {@link Adapter.setObject}, but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be overwritten or created. |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | new object |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3469](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3469)

▸ **setForeignObject**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

Same as {@link Adapter.setObject}, but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be overwritten or created. |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | new object |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3474](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L3474)

___

### setForeignObjectAsync

▸ **setForeignObjectAsync**<`T`\>(`id`, `obj`, `options?`): `SetObjectPromise`

Creates or overwrites an object (which might not belong to this adapter) in the object db

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

[packages/adapter/src/lib/adapter/adapter.ts:436](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L436)

___

### setForeignObjectNotExists

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `callback?`): `void`

Same as {@link Adapter.setForeignObject}, but with check if the object exists.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
New object will be created only if no object exists with such ID.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be overwritten or created. |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | new object |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

>}

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5050](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5050)

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

Same as {@link Adapter.setForeignObject}, but with check if the object exists.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
New object will be created only if no object exists with such ID.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be overwritten or created. |
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | new object |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void`

>}

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5055](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L5055)

___

### setForeignObjectNotExistsAsync

▸ **setForeignObjectNotExistsAsync**<`T`\>(`id`, `obj`, `options?`): `SetObjectPromise`

Creates an object (which might not belong to this adapter) in the object db. Existing objects are not overwritten.

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

[packages/adapter/src/lib/adapter/adapter.ts:313](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L313)

___

### setForeignState

▸ **setForeignState**(`id`, `state`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8360](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8360)

▸ **setForeignState**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8365](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8365)

▸ **setForeignState**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `options` | `unknown` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8371](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8371)

▸ **setForeignState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8377](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8377)

___

### setForeignStateAsync

▸ **setForeignStateAsync**(`id`, `state`, `ack?`): `SetStatePromise`

Writes a value (which might not belong to this adapter) into the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `ack?` | `boolean` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:538](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L538)

▸ **setForeignStateAsync**(`id`, `state`, `options?`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `options?` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L543)

▸ **setForeignStateAsync**(`id`, `state`, `ack`, `options`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L548)

___

### setForeignStateChanged

▸ **setForeignStateChanged**(`id`, `state`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8669](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8669)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8674](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8674)

▸ **setForeignStateChanged**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `options` | `unknown` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8680](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8680)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8686](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8686)

___

### setForeignStateChangedAsync

▸ **setForeignStateChangedAsync**(`id`, `state`, `ack?`): `SetStateChangedPromise`

Writes a value (which might not belong to this adapter) into the states DB only if it has changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `ack?` | `boolean` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:452](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L452)

▸ **setForeignStateChangedAsync**(`id`, `state`, `options?`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `options?` | `unknown` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:457](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L457)

▸ **setForeignStateChangedAsync**(`id`, `state`, `ack`, `options`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:462](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L462)

___

### setInterval

▸ **setInterval**(`cb`, `timeout`, ...`args`): `void` \| `Timeout`

Same as setInterval
but it clears the running intervals on unload
does not work after unload has been called

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | `TimeoutCallback` | interval callback |
| `timeout` | `number` | interval in milliseconds |
| `...args` | `any`[] | as many arguments as needed, which will be passed to setTimeout |

#### Returns

`void` \| `Timeout`

interval interval object

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2850](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2850)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`AdapterClass`](AdapterClass.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.3.5

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

Creates or overwrites object in objectDB.

This function can create or overwrite objects in objectDB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
<b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory and it will be checked.
Additionally type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
<pre><code>{
    common: {
         name: 'object name',
         type: 'number', // string, boolean, object, mixed, array
         role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
    },
    native: {},
    type: 'state' // channel, device
}</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } | new object |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2898](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2898)

▸ **setObject**(`id`, `obj`, `options`, `callback?`): `Promise`<`void`\>

Creates or overwrites object in objectDB.

This function can create or overwrite objects in objectDB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
<b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory and it will be checked.
Additionally type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
<pre><code>{
    common: {
         name: 'object name',
         type: 'number', // string, boolean, object, mixed, array
         role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
    },
    native: {},
    type: 'state' // channel, device
}</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } | new object |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2899](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2899)

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`, `options?`): `SetObjectPromise`

Creates or overwrites an object in the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<`StateObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L434)

___

### setObjectNotExists

▸ **setObjectNotExists**(`id`, `obj`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

Same as {@link Adapter.setObject}, but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } | new object |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

>}

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4949](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4949)

▸ **setObjectNotExists**(`id`, `obj`, `options`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

Same as {@link Adapter.setObject}, but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } | new object |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | - |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

>}

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4954](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4954)

___

### setObjectNotExistsAsync

▸ **setObjectNotExistsAsync**(`id`, `obj`, `options?`): `SetObjectPromise`

Creates an object in the object db. Existing objects are not overwritten.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<`StateObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `StateACL`  } \| `Omit`<`ChannelObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`DeviceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`FolderObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`EnumObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`MetaObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`HostObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`AdapterObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`InstanceObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`UserObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`GroupObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`ScriptObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } \| `Omit`<`OtherObject`, ``"acl"`` \| ``"_id"``\> & { `_id?`: `string` ; `acl?`: `ObjectACL`  } |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L311)

___

### setPassword

▸ **setPassword**(`user`, `pw`, `options`, `callback?`): `Promise`<`void`\>

sets the user's password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `options` | `Record`<`string`, `any`\> | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1970](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1970)

___

### setPasswordAsync

▸ **setPasswordAsync**(`user`, `password`, `options?`): `Promise`<`void`\>

Sets a new password for the given user

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `password` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L424)

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

[packages/adapter/src/lib/adapter/adapter.ts:1597](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1597)

___

### setState

▸ **setState**(`id`, `state`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `IdObject` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7472](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7472)

▸ **setState**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `IdObject` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7477](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7477)

▸ **setState**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `IdObject` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `options` | `unknown` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7483](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7483)

▸ **setState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| `IdObject` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | `SetStateCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7489](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L7489)

___

### setStateAsync

▸ **setStateAsync**(`id`, `state`, `ack?`): `SetStatePromise`

Writes a value into the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `ack?` | `boolean` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:518](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L518)

▸ **setStateAsync**(`id`, `state`, `options?`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `options?` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L523)

▸ **setStateAsync**(`id`, `state`, `ack`, `options`): `SetStatePromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:528](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L528)

___

### setStateChanged

▸ **setStateChanged**(`id`, `state`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues. |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8214](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8214)

▸ **setStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues. |
| `ack` | `boolean` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8219](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8219)

▸ **setStateChanged**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues. |
| `options` | `unknown` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8225](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8225)

▸ **setStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `StateValue` \| `SettableState` | simple value or object with attribues. |
| `ack` | `boolean` | - |
| `options` | `unknown` | - |
| `callback?` | `SetStateChangedCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8231](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L8231)

___

### setStateChangedAsync

▸ **setStateChangedAsync**(`id`, `state`, `ack?`): `SetStateChangedPromise`

Writes a value into the states DB only if it has changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `ack?` | `boolean` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:472](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L472)

▸ **setStateChangedAsync**(`id`, `state`, `options?`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `options?` | `unknown` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:477](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L477)

▸ **setStateChangedAsync**(`id`, `state`, `ack`, `options`): `SetStateChangedPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `StateValue` \| `SettableState` |
| `ack` | `boolean` |
| `options` | `unknown` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L482)

___

### setTimeout

▸ **setTimeout**(`cb`, `timeout`, ...`args`): `void` \| `Timeout`

Same as setTimeout
but it clears the running timers on unload
does not work after unload has been called

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | `TimeoutCallback` | timer callback |
| `timeout` | `number` | timeout in milliseconds |
| `...args` | `any`[] | as many arguments as needed, which will be passed to setTimeout |

#### Returns

`void` \| `Timeout`

timer id

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2768](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2768)

___

### subscribeForeignFiles

▸ **subscribeForeignFiles**(`pattern`, `callback?`): `void`

Subscribe for the changes of files in specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4888](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4888)

▸ **subscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of files in specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4889](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4889)

___

### subscribeForeignObjects

▸ **subscribeForeignObjects**(`pattern`, `callback?`): `void`

Subscribe for the changes of objects in any instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4809](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4809)

▸ **subscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of objects in any instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4810](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4810)

___

### subscribeForeignObjectsAsync

▸ **subscribeForeignObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe to changes of objects (which might not belong to this adapter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:307](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L307)

___

### subscribeForeignStates

▸ **subscribeForeignStates**(`pattern`, `callback?`): `void`

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
<pre><code>
    adapter.subscribeForeignStates('adapterName.X.*');
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9685](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9685)

▸ **subscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
<pre><code>
    adapter.subscribeForeignStates('adapterName.X.*');
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9686](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9686)

___

### subscribeForeignStatesAsync

▸ **subscribeForeignStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe to changes of states (which might not belong to this adapter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L386)

___

### subscribeObjects

▸ **subscribeObjects**(`pattern`, `callback?`): `void`

Subscribe for the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4722](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4722)

▸ **subscribeObjects**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4723](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4723)

___

### subscribeObjectsAsync

▸ **subscribeObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe to changes of objects in this instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L301)

___

### subscribeStates

▸ **subscribeStates**(`pattern`, `callback?`): `void`

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
<pre><code>
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*' or like this. Only string allowed |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10072](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10072)

▸ **subscribeStates**(`pattern`, `options`, `callback?`): `void`

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
<pre><code>
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*' or like this. Only string allowed |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10073](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10073)

___

### subscribeStatesAsync

▸ **subscribeStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe to changes of states in this instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:390](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L390)

___

### supportsFeature

▸ **supportsFeature**(`featureName`): `boolean`

Method to check for available Features for adapter development

Use it like ...
<pre><code>
    if (adapter.supportsFeature && adapter.supportsFeature('ALIAS')) {
        ...
    }
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `featureName` | `string` | the name of the feature to check |

#### Returns

`boolean`

true/false if the feature is in the list of supported features

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1815](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1815)

___

### terminate

▸ **terminate**(`reason?`, `exitCode?`): `never`

stops the execution of adapter, but not disables it.

Sometimes, the adapter must be stopped if some libraries are missing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `string` \| `number` | optional termination description |
| `exitCode?` | `number` | optional exit code |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1668](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L1668)

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

[packages/adapter/src/lib/adapter/adapter.ts:6716](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6716)

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

[packages/adapter/src/lib/adapter/adapter.ts:6717](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6717)

___

### unlinkAsync

▸ **unlinkAsync**(`adapterName`, `path`, `options?`): `Promise`<`void`\>

Deletes a given file

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:364](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L364)

___

### unsubscribeForeignFiles

▸ **unsubscribeForeignFiles**(`pattern`, `callback?`): `void`

Unsubscribe for the changes of files on specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4917](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4917)

▸ **unsubscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for the changes of files on specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4918](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4918)

___

### unsubscribeForeignObjects

▸ **unsubscribeForeignObjects**(`pattern`, `callback?`): `void`

Unsubscribe for the patterns on all objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4847](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4847)

▸ **unsubscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for the patterns on all objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4848](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4848)

___

### unsubscribeForeignObjectsAsync

▸ **unsubscribeForeignObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

Unsubscribe from changes of objects (which might not belong to this adapter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:309](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L309)

___

### unsubscribeForeignStates

▸ **unsubscribeForeignStates**(`pattern`, `callback?`): `void`

Unsubscribe for changes for given pattern

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

<pre><code>
    adapter.subscribeForeignStates('adapterName.X.*');
    adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
    adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9924](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9924)

▸ **unsubscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for changes for given pattern

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

<pre><code>
    adapter.subscribeForeignStates('adapterName.X.*');
    adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
    adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9925](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L9925)

___

### unsubscribeForeignStatesAsync

▸ **unsubscribeForeignStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe from changes of states (which might not belong to this adapter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:388](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L388)

___

### unsubscribeObjects

▸ **unsubscribeObjects**(`pattern`, `callback?`): `void`

Unsubscribe on the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4765](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4765)

▸ **unsubscribeObjects**(`pattern`, `options`, `callback?`): `void`

Unsubscribe on the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4766](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L4766)

___

### unsubscribeObjectsAsync

▸ **unsubscribeObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

Unsubscribe from changes of objects in this instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L303)

___

### unsubscribeStates

▸ **unsubscribeStates**(`pattern`, `callback?`): `void`

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

<pre><code>
    adapter.subscribeForeignStates('*');
    adapter.unsubscribeForeignStates('abc*'); // This will not work
    adapter.unsubscribeForeignStates('*');    // Valid unsubscribe
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10114](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10114)

▸ **unsubscribeStates**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

<pre><code>
    adapter.subscribeForeignStates('*');
    adapter.unsubscribeForeignStates('abc*'); // This will not work
    adapter.unsubscribeForeignStates('*');    // Valid unsubscribe
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10115](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L10115)

___

### unsubscribeStatesAsync

▸ **unsubscribeStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe from changes of states in this instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:392](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L392)

___

### updateConfig

▸ **updateConfig**(`newConfig`): `SetObjectPromise`

Updates the adapter config with new values. Only a subset of the configuration has to be provided,
since merging with the existing config is done automatically, e.g. like this:

`adapter.updateConfig({prop1: "newValue1"})`

After updating the configuration, the adapter is automatically restarted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newConfig` | `Record`<`string`, `any`\> | The new config values to be stored |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2659](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L2659)

___

### writeFile

▸ **writeFile**(`adapterName`, `path`, `data`, `callback`): `void`

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
<pre><code>
     adapter.writeFile('vis.0', '/main/vis-views.json', data, function (err) {
       err && adapter.log.error('Cannot write file: ' + err);
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| `Buffer` | data as UTF8 string or buffer depends on the file extension. |
| `callback` | `ErrnoCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6855](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6855)

▸ **writeFile**(`adapterName`, `path`, `data`, `options`, `callback`): `void`

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
<pre><code>
     adapter.writeFile('vis.0', '/main/vis-views.json', data, function (err) {
       err && adapter.log.error('Cannot write file: ' + err);
     });
</code></pre>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| `Buffer` | data as UTF8 string or buffer depends on the file extension. |
| `options` | `unknown` | - |
| `callback` | `ErrnoCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6856](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L6856)

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

[packages/adapter/src/lib/adapter/adapter.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/f94b465f/packages/adapter/src/lib/adapter/adapter.ts#L371)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`since`** v15.2.0, v14.17.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` \| `EventEmitter` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Defined in

node_modules/@types/node/events.d.ts:262

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`since`** v0.9.12

**`deprecated`** Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`since`** v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Defined in

node_modules/@types/node/events.d.ts:217

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`since`** v11.13.0, v10.16.0

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
