[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / AdapterClass

# Class: AdapterClass

Adapter class

How the initialization happens:
 initObjects => initStates => prepareInitAdapter => initAdapter => initLogging => createInstancesObjects => ready

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

[packages/adapter/src/lib/adapter/adapter.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L654)

## Properties

### FORBIDDEN\_CHARS

• `Protected` `Readonly` **FORBIDDEN\_CHARS**: `RegExp` = `FORBIDDEN_CHARS`

A RegExp to test for forbidden chars in object IDs

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L598)

___

### adapterConfig

• `Protected` `Optional` **adapterConfig**: ``null`` \| [`AdapterOptions`](../interfaces/internal_.AdapterOptions.md) \| [`InstanceObject`](../interfaces/internal_.InstanceObject.md)

contents of io-package.json

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L616)

___

### adapterDir

• `Protected` **adapterDir**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L618)

___

### adapterReady

• `Protected` **adapterReady**: `boolean` = `false`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L565)

___

### common

• `Protected` `Optional` **common**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L641)

___

### config

• `Protected` `Optional` **config**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L639)

___

### connected

• `Protected` `Optional` **connected**: `boolean`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L617)

___

### dateFormat

• `Protected` `Optional` **dateFormat**: `any`

the configured date format of system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:628](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L628)

___

### host

• `Protected` `Optional` **host**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L640)

___

### instance

• `Protected` `Optional` **instance**: `number`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L612)

___

### ioPack

• `Protected` **ioPack**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

contents of io-package.json

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:622](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L622)

___

### isFloatComma

• `Protected` `Optional` **isFloatComma**: `boolean`

if float comma instead of dot is used, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L630)

___

### kill

• `Protected` `Optional` **kill**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L645)

___

### language

• `Protected` `Optional` **language**: [`Languages`](../modules/internal_.md#languages)

configured language of system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:632](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L632)

___

### latitude

• `Protected` `Optional` **latitude**: `number`

latitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L636)

___

### log

• `Protected` `Optional` **log**: [`Log`](internal_.Log.md)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:584](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L584)

___

### longitude

• `Protected` `Optional` **longitude**: `number`

longitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L634)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L591)

___

### namespace

• `Protected` **namespace**: \`${string}.${number}\`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L590)

___

### oObjects

• `Protected` `Optional` **oObjects**: [`Record`](../modules/internal_.md#record)<`string`, `undefined` \| [`Object`](../modules/internal_.md#object)\>

Contains a live cache of the adapter's objects.
NOTE: This is only defined if the adapter was initialized with the option objects: true.

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L577)

___

### oStates

• `Protected` `Optional` **oStates**: [`Record`](../modules/internal_.md#record)<`string`, `undefined` \| [`State`](../interfaces/internal_.State.md)\>

Contains a live cache of the adapter's states.
NOTE: This is only defined if the adapter was initialized with the option states: true.

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:572](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L572)

___

### pack

• `Protected` `Optional` **pack**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

contents of package.json

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L620)

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

[packages/adapter/src/lib/adapter/adapter.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L646)

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

[packages/adapter/src/lib/adapter/adapter.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L647)

___

### stop

• `Protected` `Optional` **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L643)

___

### systemConfig

• `Protected` `Optional` **systemConfig**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

contents of iobroker.json if required via AdapterOptions

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:626](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L626)

___

### version

• `Protected` `Optional` **version**: `string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L644)

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

Sets or gets the default captureRejection value for all emitters.

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

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

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

[packages/adapter/src/lib/adapter/adapter.ts:5249](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5249)

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

[packages/adapter/src/lib/adapter/adapter.ts:5256](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5256)

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

[packages/adapter/src/lib/adapter/adapter.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L180)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

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

[packages/adapter/src/lib/adapter/adapter.ts:5935](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5935)

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

[packages/adapter/src/lib/adapter/adapter.ts:5943](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5943)

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

[packages/adapter/src/lib/adapter/adapter.ts:197](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L197)

___

### calculatePermissions

▸ **calculatePermissions**(`user`, `commandsPermissions`, `options?`, `callback?`): `Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) | object that describes the access rights like     <pre><code>         // static information         var commandsPermissions = {            getObject:          {type: 'object',    operation: 'read'},            getObjects:         {type: 'object',    operation: 'list'},            getObjectView:      {type: 'object',    operation: 'list'},            setObject:          {type: 'object',    operation: 'write'},            subscribeObjects:   {type: 'object',    operation: 'read'},            unsubscribeObjects: {type: 'object',    operation: 'read'},            subscribeFiles:     {type: 'object',    operation: 'read'},            unsubscribeFiles:   {type: 'object',    operation: 'read'},             getStates:          {type: 'state',     operation: 'list'},            getState:           {type: 'state',     operation: 'read'},            setState:           {type: 'state',     operation: 'write'},            getStateHistory:    {type: 'state',     operation: 'read'},            subscribe:          {type: 'state',     operation: 'read'},            unsubscribe:        {type: 'state',     operation: 'read'},            getVersion:         {type: '',          operation: ''},             httpGet:            {type: 'other',     operation: 'http'},            sendTo:             {type: 'other',     operation: 'sendto'},            sendToHost:         {type: 'other',     operation: 'sendto'},             readFile:           {type: 'file',      operation: 'read'},            readFile64:         {type: 'file',      operation: 'read'},            writeFile:          {type: 'file',      operation: 'write'},            writeFile64:        {type: 'file',      operation: 'write'},            unlink:             {type: 'file',      operation: 'delete'},            rename:             {type: 'file',      operation: 'write'},            mkdir:              {type: 'file',      operation: 'write'},            readDir:            {type: 'file',      operation: 'list'},            chmodFile:          {type: 'file',      operation: 'write'},            chownFile:          {type: 'file',      operation: 'write'},             authEnabled:        {type: '',          operation: ''},            disconnect:         {type: '',          operation: ''},            listPermissions:    {type: '',          operation: ''},            getUserPermissions: {type: 'object',    operation: 'read'}         };        </code></pre> |
| `options?` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | optional user context |
| `callback?` | [`CalculatePermissionsCallback`](../modules/internal_.md#calculatepermissionscallback) | return result        <pre><code>            function (acl) {              // Access control object for admin looks like:              // {              //    file: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         create:     true,              //         list:       true              //     },              //     object: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         list:       true              //     },              //     state: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         create:     true,              //         list:       true              //     },              //     user: 'admin',              //     users:  {              //         read:       true,              //         write:      true,              //         create:     true,              //         'delete':   true,              //         list:       true              //     },              //     other: {              //         execute:    true,              //         http:       true,              //         sendto:     true              //     },              //     groups: ['administrator'] // can be more than one              // }            }        </code></pre> |

#### Returns

`Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1810](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1810)

▸ **calculatePermissions**(`user`, `commandsPermissions`, `callback?`): `Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) | object that describes the access rights like     <pre><code>         // static information         var commandsPermissions = {            getObject:          {type: 'object',    operation: 'read'},            getObjects:         {type: 'object',    operation: 'list'},            getObjectView:      {type: 'object',    operation: 'list'},            setObject:          {type: 'object',    operation: 'write'},            subscribeObjects:   {type: 'object',    operation: 'read'},            unsubscribeObjects: {type: 'object',    operation: 'read'},            subscribeFiles:     {type: 'object',    operation: 'read'},            unsubscribeFiles:   {type: 'object',    operation: 'read'},             getStates:          {type: 'state',     operation: 'list'},            getState:           {type: 'state',     operation: 'read'},            setState:           {type: 'state',     operation: 'write'},            getStateHistory:    {type: 'state',     operation: 'read'},            subscribe:          {type: 'state',     operation: 'read'},            unsubscribe:        {type: 'state',     operation: 'read'},            getVersion:         {type: '',          operation: ''},             httpGet:            {type: 'other',     operation: 'http'},            sendTo:             {type: 'other',     operation: 'sendto'},            sendToHost:         {type: 'other',     operation: 'sendto'},             readFile:           {type: 'file',      operation: 'read'},            readFile64:         {type: 'file',      operation: 'read'},            writeFile:          {type: 'file',      operation: 'write'},            writeFile64:        {type: 'file',      operation: 'write'},            unlink:             {type: 'file',      operation: 'delete'},            rename:             {type: 'file',      operation: 'write'},            mkdir:              {type: 'file',      operation: 'write'},            readDir:            {type: 'file',      operation: 'list'},            chmodFile:          {type: 'file',      operation: 'write'},            chownFile:          {type: 'file',      operation: 'write'},             authEnabled:        {type: '',          operation: ''},            disconnect:         {type: '',          operation: ''},            listPermissions:    {type: '',          operation: ''},            getUserPermissions: {type: 'object',    operation: 'read'}         };        </code></pre> |
| `callback?` | [`CalculatePermissionsCallback`](../modules/internal_.md#calculatepermissionscallback) | return result        <pre><code>            function (acl) {              // Access control object for admin looks like:              // {              //    file: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         create:     true,              //         list:       true              //     },              //     object: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         list:       true              //     },              //     state: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         create:     true,              //         list:       true              //     },              //     user: 'admin',              //     users:  {              //         read:       true,              //         write:      true,              //         create:     true,              //         'delete':   true,              //         list:       true              //     },              //     other: {              //         execute:    true,              //         http:       true,              //         sendto:     true              //     },              //     groups: ['administrator'] // can be more than one              // }            }        </code></pre> |

#### Returns

`Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1816](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1816)

___

### calculatePermissionsAsync

▸ **calculatePermissionsAsync**(`user`, `commandsPermissions`, `options?`): `Promise`<[`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

<INTERNAL> Determines the users permissions

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) |
| `options?` | `unknown` |

#### Returns

`Promise`<[`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:287](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L287)

___

### checkGroup

▸ **checkGroup**(`user`, `group`, `options`, `callback?`): `Promise`<`void`\>

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `group` | `string` | group name |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | optional user context |
| `callback?` | [`CheckGroupCallback`](../modules/internal_.md#checkgroupcallback) | return result        <pre><code>            function (result) {              if (result) adapter.log.debug('User exists and in the group');            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1726](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1726)

▸ **checkGroup**(`user`, `group`, `callback?`): `Promise`<`void`\>

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `group` | `string` | group name |
| `callback?` | [`CheckGroupCallback`](../modules/internal_.md#checkgroupcallback) | return result        <pre><code>            function (result) {              if (result) adapter.log.debug('User exists and in the group');            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1727](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1727)

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

[packages/adapter/src/lib/adapter/adapter.ts:285](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L285)

___

### checkPassword

▸ **checkPassword**(`user`, `pw`, `options`, `callback`): `Promise`<`void`\>

validates user and password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | optional user context |
| `callback` | [`CheckPasswordCallback`](../modules/internal_.md#checkpasswordcallback) | return result        <pre><code>            function (result) {              if (result) adapter.log.debug('User is valid');            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1487](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1487)

▸ **checkPassword**(`user`, `pw`, `callback`): `Promise`<`void`\>

validates user and password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `callback` | [`CheckPasswordCallback`](../modules/internal_.md#checkpasswordcallback) | return result        <pre><code>            function (result) {              if (result) adapter.log.debug('User is valid');            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1493](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1493)

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

[packages/adapter/src/lib/adapter/adapter.ts:281](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L281)

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
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> \| { `mode`: `string` \| `number`  } | data with mode |
| `callback` | [`ChownFileCallback`](../modules/internal_.md#chownfilecallback) | return result        <pre><code>            function (err, processedFiles) {                list of processed files with new groups            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6213](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6213)

▸ **chmodFile**(`adapter`, `path`, `callback`): `void`

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
| `callback` | [`ChownFileCallback`](../modules/internal_.md#chownfilecallback) | return result        <pre><code>            function (err, processedFiles) {                list of processed files with new groups            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6220](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6220)

___

### chmodFileAsync

▸ **chmodFileAsync**(`adapter`, `path`, `options`): `Promise`<{ `entries`: [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[] ; `id`: `string`  }\>

Changes access rights of all files in the adapter directory

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapter` | ``null`` \| `string` |
| `path` | `string` |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> \| { `mode`: `string` \| `number`  } |

#### Returns

`Promise`<{ `entries`: [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[] ; `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L213)

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
| `callback` | (`err?`: ``null`` \| [`Error`](../modules/internal_.md#error), `processedFiles?`: `any`) => `void` | return result        <pre><code>            function (err, processedFiles) {                list of processed files with new groups            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6260](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6260)

▸ **chownFile**(`_adapter`, `path`, `callback`): `void`

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
| `callback` | (`err?`: ``null`` \| [`Error`](../modules/internal_.md#error), `processedFiles?`: `any`) => `void` | return result        <pre><code>            function (err, processedFiles) {                list of processed files with new groups            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6267](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6267)

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

[packages/adapter/src/lib/adapter/adapter.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L219)

___

### clearInterval

▸ **clearInterval**(`interval`): `void`

Same as clearInterval
but it check the running intervals on unload

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | [`Timeout`](../interfaces/internal_.Timeout.md) | interval object |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2538](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2538)

___

### clearTimeout

▸ **clearTimeout**(`timer`): `void`

Same as clearTimeout
but it check the running timers on unload

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timer` | [`Timeout`](../interfaces/internal_.Timeout.md) | the timer object |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2461](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2461)

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

[packages/adapter/src/lib/adapter/adapter.ts:4890](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4890)

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

[packages/adapter/src/lib/adapter/adapter.ts:4891](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4891)

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

[packages/adapter/src/lib/adapter/adapter.ts:4897](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4897)

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

[packages/adapter/src/lib/adapter/adapter.ts:4904](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4904)

___

### createChannelAsync

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates an object with type channel. It must be located under a device

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon?` | `string` \| [`Partial`](../modules/internal_.md#partial)<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:454](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L454)

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

[packages/adapter/src/lib/adapter/adapter.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L459)

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

[packages/adapter/src/lib/adapter/adapter.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L465)

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

[packages/adapter/src/lib/adapter/adapter.ts:4816](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4816)

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

[packages/adapter/src/lib/adapter/adapter.ts:4817](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4817)

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

[packages/adapter/src/lib/adapter/adapter.ts:4822](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4822)

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

[packages/adapter/src/lib/adapter/adapter.ts:4828](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4828)

___

### createDeviceAsync

▸ **createDeviceAsync**(`deviceName`, `common?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

creates an object with type device

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common?` | [`Partial`](../modules/internal_.md#partial)<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L433)

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

[packages/adapter/src/lib/adapter/adapter.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L434)

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

[packages/adapter/src/lib/adapter/adapter.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L439)

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

[packages/adapter/src/lib/adapter/adapter.ts:4975](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4975)

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

[packages/adapter/src/lib/adapter/adapter.ts:4981](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4981)

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

[packages/adapter/src/lib/adapter/adapter.ts:4988](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4988)

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

[packages/adapter/src/lib/adapter/adapter.ts:4996](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4996)

___

### createStateAsync

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates a state and the corresponding object. It must be located in a channel under a device

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

[packages/adapter/src/lib/adapter/adapter.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L476)

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

[packages/adapter/src/lib/adapter/adapter.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L482)

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

[packages/adapter/src/lib/adapter/adapter.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L489)

___

### decrypt

▸ **decrypt**(`secretVal`, `value?`): `string`

Decrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretVal` | `string` | to use for decrypt (or value if only one parameter is given) |
| `value?` | `string` | value to decrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1185)

▸ **decrypt**(`value`): `string`

Decrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | value to decrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1186](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1186)

___

### delBinaryState

▸ **delBinaryState**(`id`, `callback?`): `void`

Deletes binary state but prefixes the own namespace to the id

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10185](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10185)

▸ **delBinaryState**(`id`, `options`, `callback?`): `void`

Deletes binary state but prefixes the own namespace to the id

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10186](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10186)

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

[packages/adapter/src/lib/adapter/adapter.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L273)

___

### delFile

▸ **delFile**(`adapterName`, `path`, `callback`): `void`

Deletes a given file

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L371)

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

[packages/adapter/src/lib/adapter/adapter.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L372)

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

[packages/adapter/src/lib/adapter/adapter.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L225)

___

### delForeignBinaryState

▸ **delForeignBinaryState**(`id`, `callback?`): `void`

Deletes binary state

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10126](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10126)

▸ **delForeignBinaryState**(`id`, `options`, `callback?`): `void`

Deletes binary state

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10127](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10127)

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

[packages/adapter/src/lib/adapter/adapter.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L267)

___

### delForeignObject

▸ **delForeignObject**(`id`, `callback?`): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (with namespace) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4260](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4260)

▸ **delForeignObject**(`id`, `options`, `callback?`): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (with namespace) |
| `options` | [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) | optional user context or {recursive:true} to delete all underlying objects |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4261](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4261)

___

### delForeignObjectAsync

▸ **delForeignObjectAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes an object (which might not belong to this adapter) from the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:158](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L158)

___

### delForeignState

▸ **delForeignState**(`id`, `callback?`): `void`

Deletes a state of any adapter.
The object is NOT deleted. If you want to delete it too, use

**`Del Foreign Object`**

instead.

No error is returned if state does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | long string for ID like "adapterName.0.stateID". |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result function (err) {} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8955](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8955)

▸ **delForeignState**(`id`, `options`, `callback?`): `void`

Deletes a state of any adapter.
The object is NOT deleted. If you want to delete it too, use

**`Del Foreign Object`**

instead.

No error is returned if state does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | long string for ID like "adapterName.0.stateID". |
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result function (err) {} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8956](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8956)

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

[packages/adapter/src/lib/adapter/adapter.ts:239](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L239)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4200](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4200)

▸ **delObject**(`id`, `options?`, `callback?`): `void`

Delete an object of this instance.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options?` | ``null`` \| [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) | optional user context. E.g. recursive option could be true |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4201](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4201)

___

### delObjectAsync

▸ **delObjectAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes an object from the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:156](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L156)

___

### delState

▸ **delState**(`id`, `callback?`): `void`

Deletes a state of this instance.
The object will NOT be deleted. If you want to delete it too, use

**`Del Object`**

instead.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

No error is returned if state does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8903](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8903)

▸ **delState**(`id`, `options`, `callback?`): `void`

Deletes a state of this instance.
The object will NOT be deleted. If you want to delete it too, use

**`Del Object`**

instead.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

No error is returned if state does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8904](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8904)

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

[packages/adapter/src/lib/adapter/adapter.ts:237](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L237)

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

[packages/adapter/src/lib/adapter/adapter.ts:2476](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2476)

___

### deleteChannel

▸ **deleteChannel**(`channelName`, `callback?`): `void`

Deletes channel and udnerlying structure

**`Alais`**

deleteChannel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` | is the part of ID like: adapter.instance.<deviceName>.<channelName> |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5497](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5497)

▸ **deleteChannel**(`channelName`, `options?`, `callback?`): `void`

Deletes channel and udnerlying structure

**`Alais`**

deleteChannel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` | is the part of ID like: adapter.instance.<deviceName>.<channelName> |
| `options?` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5498](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5498)

▸ **deleteChannel**(`parentDevice`, `channelName`, `options?`, `callback?`): `void`

Deletes channel and udnerlying structure

**`Alais`**

deleteChannel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentDevice` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `channelName` | `string` | is the part of ID like: adapter.instance.<deviceName>.<channelName> |
| `options?` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5499](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5499)

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

[packages/adapter/src/lib/adapter/adapter.ts:501](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L501)

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

[packages/adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L502)

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

[packages/adapter/src/lib/adapter/adapter.ts:5382](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5382)

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

[packages/adapter/src/lib/adapter/adapter.ts:5388](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5388)

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

[packages/adapter/src/lib/adapter/adapter.ts:187](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L187)

___

### deleteDevice

▸ **deleteDevice**(`deviceName`, `callback?`): `void`

Delete device with all its channels and states.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5183](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5183)

▸ **deleteDevice**(`deviceName`, `options`, `callback?`): `void`

Delete device with all its channels and states.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5184](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5184)

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

[packages/adapter/src/lib/adapter/adapter.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L179)

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

[packages/adapter/src/lib/adapter/adapter.ts:5605](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5605)

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

[packages/adapter/src/lib/adapter/adapter.ts:5606](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5606)

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

[packages/adapter/src/lib/adapter/adapter.ts:5607](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5607)

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

[packages/adapter/src/lib/adapter/adapter.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L507)

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

[packages/adapter/src/lib/adapter/adapter.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L508)

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

[packages/adapter/src/lib/adapter/adapter.ts:509](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L509)

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

[packages/adapter/src/lib/adapter/adapter.ts:6082](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6082)

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

[packages/adapter/src/lib/adapter/adapter.ts:6089](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6089)

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

[packages/adapter/src/lib/adapter/adapter.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L205)

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

[packages/adapter/src/lib/adapter/adapter.ts:1270](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1270)

___

### disable

▸ **disable**(): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Disables and stops the adapter instance.

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2354](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2354)

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

**`Since`**

v0.1.26

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

Encrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretVal` | `string` | to use for encrypt (or value if only one parameter is given) |
| `value?` | `string` | value to encrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1205](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1205)

▸ **encrypt**(`value`): `string`

Encrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | value to encrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1206](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1206)

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

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[eventNames](internal_.EventEmitter-1.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### extendForeignObject

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `callback?`): `void`

Same as Adapter.extendObject, but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be extended |
| `objPart` | [`PartialObjectWorker`](../modules/internal_.md#partialobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {                // obj is {"id": id}                if (err) adapter.log.error(err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3231](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3231)

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `options`, `callback?`): `void`

Same as Adapter.extendObject, but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be extended |
| `objPart` | [`PartialObjectWorker`](../modules/internal_.md#partialobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> | - |
| `options` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) | optional user context, or use attribute preserve e.g. {preserve: {common: ['name']}} to preserve common.name |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {                // obj is {"id": id}                if (err) adapter.log.error(err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3236](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3236)

___

### extendForeignObjectAsync

▸ **extendForeignObjectAsync**<`T`\>(`id`, `objPart`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Extend an object (which might not belong to this adapter) and create it if it might not exist

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

[packages/adapter/src/lib/adapter/adapter.ts:128](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L128)

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
| `objPart` | `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {                if (err) adapter.log.error(err);                // obj is {"id": id}            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2854](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2854)

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
| `objPart` | `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` | - |
| `options` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) | optional user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {                if (err) adapter.log.error(err);                // obj is {"id": id}            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2855](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2855)

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `objPart`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Extend an object and create it if it might not exist

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `objPart` | `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` |
| `options?` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:114](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L114)

___

### fileExists

▸ **fileExists**(`adapterName`, `path`, `callback`): `void`

Checks if file exists in DB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `callback` | [`GenericCallback`](../modules/internal_.md#genericcallback)<`boolean`\> | cb function if none provided, a promise is returned |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6569](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6569)

▸ **fileExists**(`adapterName`, `path`, `options`, `callback`): `void`

Checks if file exists in DB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `options` | `unknown` | optional user context |
| `callback` | [`GenericCallback`](../modules/internal_.md#genericcallback)<`boolean`\> | cb function if none provided, a promise is returned |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6570](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6570)

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

[packages/adapter/src/lib/adapter/adapter.ts:232](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L232)

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
| `callback` | [`FindObjectCallback`](../modules/internal_.md#findobjectcallback) | return result        <pre><code>            adapter.findForeignObject('Some name', function (err, id, name) {              if (err) adapter.log.error('Cannot get object: ' + err);              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4083](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4083)

▸ **findForeignObject**(`idOrName`, `type`, `options`, `callback`): `void`

Find any object by name or ID.

Find object by the exact name or ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | `string` | optional common.type of state: 'number', 'string', 'boolean', 'file', ... |
| `options` | `unknown` | optional user context |
| `callback` | [`FindObjectCallback`](../modules/internal_.md#findobjectcallback) | return result        <pre><code>            adapter.findForeignObject('Some name', function (err, id, name) {              if (err) adapter.log.error('Cannot get object: ' + err);              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4084](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4084)

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

[packages/adapter/src/lib/adapter/adapter.ts:449](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L449)

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

[packages/adapter/src/lib/adapter/adapter.ts:6652](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6652)

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

[packages/adapter/src/lib/adapter/adapter.ts:6653](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6653)

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

[packages/adapter/src/lib/adapter/adapter.ts:6617](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6617)

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

[packages/adapter/src/lib/adapter/adapter.ts:6618](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6618)

___

### getAdapterObjects

▸ **getAdapterObjects**(`callback`): `Promise`<`void` \| [`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

Get all states, channels and devices of this adapter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`objects`: [`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>) => `void` | return result        <pre><code>            function (objects) {                for (var id in objects) {                    adapter.log.debug(id);                }            }        </code></pre> |

#### Returns

`Promise`<`void` \| [`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2772](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2772)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<[`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

Get all states, channels, devices and folders of this adapter

#### Returns

`Promise`<[`Record`](../modules/internal_.md#record)<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L303)

___

### getBinaryState

▸ **getBinaryState**(`id`, `callback`): `void`

Same as getForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10109](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10109)

▸ **getBinaryState**(`id`, `options`, `callback`): `void`

Same as getForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `options` | `unknown` | optional |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10110](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10110)

___

### getBinaryStateAsync

▸ **getBinaryStateAsync**(`id`, `options?`): [`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

Despite the naming convention, this method doesn't prepend the adapter namespace. Use getForeignBinaryStateAsync instead.
Reads a binary state from Redis

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L265)

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
| `publicName?` | `string` | public certificate name |
| `privateName?` | `string` | private certificate name |
| `chainedName?` | `string` | optional chained certificate name |
| `callback?` | [`GetCertificatesCallback`](../modules/internal_.md#getcertificatescallback) | return result        <pre><code>            function (err, certs, letsEncrypt) {              adapter.log.debug('private key: ' + certs.key);              adapter.log.debug('public cert: ' + certs.cert);              adapter.log.debug('chained cert: ' + certs.ca);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2198](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2198)

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

[packages/adapter/src/lib/adapter/adapter.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L301)

___

### getChannels

▸ **getChannels**(`callback`): `void`

Returns a list of all channels in this adapter instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:521](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L521)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L522)

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

[packages/adapter/src/lib/adapter/adapter.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L523)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

Returns a list of all channels in this adapter instance

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L533)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L534)

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

[packages/adapter/src/lib/adapter/adapter.ts:5761](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5761)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5762](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5762)

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

[packages/adapter/src/lib/adapter/adapter.ts:5763](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5763)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

Returns a list of all channels in this adapter instance

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:515](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L515)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L516)

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

[packages/adapter/src/lib/adapter/adapter.ts:5707](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5707)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5708](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5708)

___

### getDevicesAsync

▸ **getDevicesAsync**(`options?`): `Promise`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md)[]\>

Returns a list of all devices in this adapter instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `unknown` |

#### Returns

`Promise`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:195](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L195)

___

### getEncryptedConfig

▸ **getEncryptedConfig**(`attribute`, `callback?`): `Promise`<`string` \| `void`\>

Reads the encrypted parameter from config.

It returns promise if no callback is provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attribute` | `string` | attribute name in native configuration part |
| `callback?` | [`GetEncryptedConfigCallback`](../modules/internal_.md#getencryptedconfigcallback) | optional callback |

#### Returns

`Promise`<`string` \| `void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2371](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2371)

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
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) | return result        <pre><code>            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3650](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3650)

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
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) | return result        <pre><code>            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3651](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3651)

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
| `options` | `unknown` | optional user context |
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) | return result        <pre><code>            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3652](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3652)

___

### getEnumAsync

▸ **getEnumAsync**(`name`, `options?`): `Promise`<{ `requestEnum`: `string` ; `result`: [`Record`](../modules/internal_.md#record)<`string`, `any`\>  }\>

Returns the enum tree, filtered by the optional enum name

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<{ `requestEnum`: `string` ; `result`: [`Record`](../modules/internal_.md#record)<`string`, `any`\>  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L152)

___

### getEnums

▸ **getEnums**(`callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) | return result        <pre><code>            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3739](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3739)

▸ **getEnums**(`enumList`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | [`EnumList`](../modules/internal_.md#enumlist) | - |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) | return result        <pre><code>            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3740](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3740)

▸ **getEnums**(`enumList`, `options`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | [`EnumList`](../modules/internal_.md#enumlist) | - |
| `options` | `unknown` | optional user context |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) | return result        <pre><code>            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3741](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3741)

___

### getEnumsAsync

▸ **getEnumsAsync**(`enumList`, `options?`): [`GetEnumsPromise`](../modules/internal_.md#getenumspromise)

Returns the enum tree, filtered by the optional enum name

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumList` | [`EnumList`](../modules/internal_.md#enumlist) |
| `options?` | `unknown` |

#### Returns

[`GetEnumsPromise`](../modules/internal_.md#getenumspromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L154)

___

### getForeignBinaryState

▸ **getForeignBinaryState**(`id`, `callback`): `void`

Read a binary block from redis, e.g. an image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10035](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10035)

▸ **getForeignBinaryState**(`id`, `options`, `callback`): `void`

Read a binary block from redis, e.g. an image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `options` | `unknown` | optional |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10036](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10036)

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

[packages/adapter/src/lib/adapter/adapter.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L260)

___

### getForeignObject

▸ **getForeignObject**<`T`\>(`id`, `callback`): [`MaybePromise`](../modules/internal_.md#maybepromise)

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
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4137](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4137)

▸ **getForeignObject**<`T`\>(`id`, `options`, `callback`): [`MaybePromise`](../modules/internal_.md#maybepromise)

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
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4138](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4138)

___

### getForeignObjectAsync

▸ **getForeignObjectAsync**<`T`\>(`id`, `options?`): [`GetObjectPromise`](../modules/internal_.md#getobjectpromise)<`T`\>

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

[`GetObjectPromise`](../modules/internal_.md#getobjectpromise)<`T`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L306)

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
| `callback` | [`GetObjectsCallback`](../modules/internal_.md#getobjectscallback) | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3886](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3886)

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
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectsCallback`](../modules/internal_.md#getobjectscallback) | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3887](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3887)

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
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3888](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3888)

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
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `enums` | [`EnumList`](../modules/internal_.md#enumlist) | object ID, that must be overwritten or created. |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3893](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3893)

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
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3899](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3899)

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
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `enums` | ``null`` \| [`EnumList`](../modules/internal_.md#enumlist) | object ID, that must be overwritten or created. |
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3905](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3905)

___

### getForeignObjectsAsync

▸ **getForeignObjectsAsync**<`T`\>(`pattern`, `type`, `enums`, `options?`): [`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

Get foreign objects by pattern, by specific type and resolve their enums.

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

[packages/adapter/src/lib/adapter/adapter.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L417)

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

[packages/adapter/src/lib/adapter/adapter.ts:423](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L423)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): [`GetObjectsPromise`](../modules/internal_.md#getobjectspromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetObjectsPromise`](../modules/internal_.md#getobjectspromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L428)

___

### getForeignState

▸ **getForeignState**(`id`, `callback`): `void`

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

**`Set State`**

explanation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | return result        <pre><code>            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8497](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8497)

▸ **getForeignState**(`id`, `options`, `callback`): `void`

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

**`Set State`**

explanation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `options` | `unknown` | optional user context |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | return result        <pre><code>            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8498](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8498)

___

### getForeignStateAsync

▸ **getForeignStateAsync**(`id`, `options?`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

Read a value (which might not belong to this adapter) from the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L279)

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
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) | return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9139](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9139)

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
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) | return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9140](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9140)

___

### getForeignStatesAsync

▸ **getForeignStatesAsync**(`pattern`, `options?`): [`GetStatesPromise`](../modules/internal_.md#getstatespromise)

Read all states (which might not belong to this adapter) which match the given pattern

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetStatesPromise`](../modules/internal_.md#getstatespromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:243](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L243)

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

**`Set State`**

explanation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `options` | [`GetHistoryOptions`](../interfaces/internal_.GetHistoryOptions.md) | see function description |
| `callback` | [`GetHistoryCallback`](../modules/internal_.md#gethistorycallback) | return result        <pre><code>            function (error, result, step, sessionId) {              if (error) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8776](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8776)

▸ **getHistory**(`id`, `callback`): `void`

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

**`Set State`**

explanation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `callback` | [`GetHistoryCallback`](../modules/internal_.md#gethistorycallback) | return result        <pre><code>            function (error, result, step, sessionId) {              if (error) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8777](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8777)

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

[packages/adapter/src/lib/adapter/adapter.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L235)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](AdapterClass.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[getMaxListeners](internal_.EventEmitter-1.md#getmaxlisteners)

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
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`string`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3435](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3435)

▸ **getObject**(`id`, `options`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`string`\> | return result        <pre><code>            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3436](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3436)

___

### getObjectAsync

▸ **getObjectAsync**(`id`, `options?`): [`GetObjectPromise`](../modules/internal_.md#getobjectpromise)<`string`\>

Reads an object from the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetObjectPromise`](../modules/internal_.md#getobjectpromise)<`string`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L134)

___

### getObjectList

▸ **getObjectList**(`params`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
to get all objects of the instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |  |
| `callback` | [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback) | <pre><code>          function (err, res) {              if (res && res.rows) {                   for (var i = 0; i < res.rows.length; i++) {                       var id  = res.rows[i].id;                       var obj = res.rows[i].value;                       console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                   if (!res.rows.length) console.log('No objects found.');              } else {                  console.log('No objects found: ' + err);              }          }       </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3594](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3594)

▸ **getObjectList**(`params`, `options`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
to get all objects of the instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |  |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> \| { `sorted?`: `boolean`  } |  |
| `callback` | [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback) | <pre><code>          function (err, res) {              if (res && res.rows) {                   for (var i = 0; i < res.rows.length; i++) {                       var id  = res.rows[i].id;                       var obj = res.rows[i].value;                       console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                   if (!res.rows.length) console.log('No objects found.');              } else {                  console.log('No objects found: ' + err);              }          }       </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3595](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3595)

___

### getObjectListAsync

▸ **getObjectListAsync**(`params`, `options?`): [`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

Returns a list of objects with id between params.startkey and params.endkey

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> \| { `sorted?`: `boolean`  } |

#### Returns

[`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:147](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L147)

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
| `params` | `undefined` \| ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) | object containing startkey: first id to include in result; endkey: last id to include in result |
| `callback` | [`GetObjectViewCallback`](../modules/internal_.md#getobjectviewcallback)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\> | return result      <pre><code>          function (err, doc) {              if (doc && doc.rows) {                   for (var i = 0; i < doc.rows.length; i++) {                       var id  = doc.rows[i].id;                        var obj = doc.rows[i].value;                        console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                           if (!doc.rows.length) console.log('No objects found.');               } else {                   console.log('No objects found: ' + err);               }           }           </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3478](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3478)

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
| `params` | `undefined` \| ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) | object containing startkey: first id to include in result; endkey: last id to include in result |
| `options` | `unknown` |  |
| `callback` | [`GetObjectViewCallback`](../modules/internal_.md#getobjectviewcallback)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\> | return result      <pre><code>          function (err, doc) {              if (doc && doc.rows) {                   for (var i = 0; i < doc.rows.length; i++) {                       var id  = doc.rows[i].id;                        var obj = doc.rows[i].value;                        console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                           if (!doc.rows.length) console.log('No objects found.');               } else {                   console.log('No objects found: ' + err);               }           }           </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3484](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3484)

___

### getObjectViewAsync

▸ **getObjectViewAsync**<`Design`, `Search`\>(`design`, `search`, `params`, `options?`): [`GetObjectViewPromise`](../modules/internal_.md#getobjectviewpromise)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\>

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
| `params` | `undefined` \| ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | `unknown` |

#### Returns

[`GetObjectViewPromise`](../modules/internal_.md#getobjectviewpromise)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:140](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L140)

___

### getPluginConfig

▸ **getPluginConfig**(`name`): ``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

Return plugin configuration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | {string} name of the plugin to return |

#### Returns

``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

plugin configuration or null if not existent or not isActive

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10221](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10221)

___

### getPluginInstance

▸ **getPluginInstance**(`name`): ``null`` \| [`Plugin`](../modules/internal_.md#plugin)

Return plugin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | {string} name of the plugin to return |

#### Returns

``null`` \| [`Plugin`](../modules/internal_.md#plugin)

plugin instance or null if not existent or not isActive

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10203](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10203)

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
| `host?` | `string` | optional hostname for the port search |
| `callback?` | (`port`: `number`) => `void` | return result        <pre><code>function (port) {}</code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1399](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1399)

▸ **getPort**(`port`, `callback?`): `void`

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
| `callback?` | (`port`: `number`) => `void` | return result        <pre><code>function (port) {}</code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1400](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1400)

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

[packages/adapter/src/lib/adapter/adapter.ts:277](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L277)

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

[packages/adapter/src/lib/adapter/adapter.ts:1226](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1226)

___

### getState

▸ **getState**(`id`, `callback`): `void`

Read value from states DB.

This function can read values from states DB for this adapter.
Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.

**`Set State`**

explanation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | return result        <pre><code>            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8466](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8466)

▸ **getState**(`id`, `options`, `callback`): `void`

Read value from states DB.

This function can read values from states DB for this adapter.
Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.

**`Set State`**

explanation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `options` | `unknown` | optional user context |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | return result        <pre><code>            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        </code></pre>         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8467](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8467)

___

### getStateAsync

▸ **getStateAsync**(`id`, `options?`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

Read a value from the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:164](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L164)

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
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) | return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9014](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9014)

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
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) | return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9015](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9015)

___

### getStatesAsync

▸ **getStatesAsync**(`pattern`, `options?`): [`GetStatesPromise`](../modules/internal_.md#getstatespromise)

Read all states of this adapter which match the given pattern

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetStatesPromise`](../modules/internal_.md#getstatespromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:241](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L241)

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

[packages/adapter/src/lib/adapter/adapter.ts:5830](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5830)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`StateObject`](../interfaces/internal_.StateObject.md)\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5831](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5831)

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

[packages/adapter/src/lib/adapter/adapter.ts:5832](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5832)

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

[packages/adapter/src/lib/adapter/adapter.ts:5837](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L5837)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

Returns a list of all states in this adapter instance

#### Returns

`Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:541](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L541)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L542)

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

[packages/adapter/src/lib/adapter/adapter.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L543)

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

[packages/adapter/src/lib/adapter/adapter.ts:10267](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10267)

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

[packages/adapter/src/lib/adapter/adapter.ts:1589](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1589)

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

[packages/adapter/src/lib/adapter/adapter.ts:8868](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8868)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[listenerCount](internal_.EventEmitter-1.md#listenercount)

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

**`Since`**

v0.1.26

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

[packages/adapter/src/lib/adapter/adapter.ts:6434](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6434)

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

[packages/adapter/src/lib/adapter/adapter.ts:6435](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6435)

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

[packages/adapter/src/lib/adapter/adapter.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L227)

___

### off

▸ **off**(`eventName`, `listener`): [`AdapterClass`](AdapterClass.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

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

**`Since`**

v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[on](internal_.EventEmitter-1.md#on)

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

**`Since`**

v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once)

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

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[prependListener](internal_.EventEmitter-1.md#prependlistener)

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

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[prependOnceListener](internal_.EventEmitter-1.md#prependoncelistener)

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

**`Since`**

v9.4.0

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
| `callback` | [`ReadDirCallback`](../modules/internal_.md#readdircallback) | return result        <pre><code>            function (err, filesOrDirs) {                // filesOrDirs is array with elements like                // {                //      file:       'views.json,                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,                //      isDir:      true/false,                //      acl:        access control list object,                //      modifiedAt: time when modified,                //      createdAt:  time when created                // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6308](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6308)

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
| `callback` | [`ReadDirCallback`](../modules/internal_.md#readdircallback) | return result        <pre><code>            function (err, filesOrDirs) {                // filesOrDirs is array with elements like                // {                //      file:       'views.json,                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,                //      isDir:      true/false,                //      acl:        access control list object,                //      modifiedAt: time when modified,                //      createdAt:  time when created                // }            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6309](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6309)

___

### readDirAsync

▸ **readDirAsync**(`adapterName`, `path`, `options?`): [`ReadDirPromise`](../modules/internal_.md#readdirpromise)

reads the content of directory from DB for given adapter and path

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

[`ReadDirPromise`](../modules/internal_.md#readdirpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L221)

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
| `callback` | [`ReadFileCallback`](../modules/internal_.md#readfilecallback) | return result        <pre><code>            function (err, data) {                // data is utf8 or binary Buffer depends on the file extension.            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6460](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6460)

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
| `callback` | [`ReadFileCallback`](../modules/internal_.md#readfilecallback) | return result        <pre><code>            function (err, data) {                // data is utf8 or binary Buffer depends on the file extension.            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6461](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6461)

___

### readFileAsync

▸ **readFileAsync**(`adapterName`, `path`, `options?`): [`ReadFilePromise`](../modules/internal_.md#readfilepromise)

reads the content of directory from DB for given adapter and path

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |
| `options?` | `unknown` |

#### Returns

[`ReadFilePromise`](../modules/internal_.md#readfilepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L229)

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
| `category` | ``null`` \| [`NotificationScopes`](../interfaces/internal_.NotificationScopes.md)[`Scope`] | to be addressed, if null message will be checked by regex of given scope |
| `message` | `string` | message to be stored/checked |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7098](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7098)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`AdapterClass`](AdapterClass.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

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

**`Since`**

v0.1.26

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

[packages/adapter/src/lib/adapter/adapter.ts:6400](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6400)

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

[packages/adapter/src/lib/adapter/adapter.ts:6401](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6401)

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

[packages/adapter/src/lib/adapter/adapter.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L226)

___

### restart

▸ **restart**(): `void`

Restarts an instance of the adapter.

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2304](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2304)

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
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) | object that will be given as argument for request |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | optional return result        <pre><code>            function (result) {              // result is target adapter specific and can vary from adapter to adapter              if (!result) adapter.log.error('No response received');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6806](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6806)

▸ **sendTo**(`instanceName`, `command`, `message`, `callback?`): `void`

Send message to other adapter instance or all instances of adapter.

This function sends a message to specific instance or all instances of some specific adapter.
If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceName` | `string` | name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0". |
| `command` | `string` | command name, like "send", "browse", "list". Command is depend on target adapter implementation. |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) | object that will be given as argument for request |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | optional return result        <pre><code>            function (result) {              // result is target adapter specific and can vary from adapter to adapter              if (!result) adapter.log.error('No response received');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6811](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6811)

___

### sendToAsync

▸ **sendToAsync**(`instanceName`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

Sends a message to a specific instance or all instances of some specific adapter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L361)

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

[packages/adapter/src/lib/adapter/adapter.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L362)

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
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) | object that will be given as argument for request |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | optional return result        <pre><code>            function (result) {              // result is target adapter specific and can vary from command to command              if (!result) adapter.log.error('No response received');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6965](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6965)

▸ **sendToHost**(`hostName`, `command`, `message`, `callback?`): `void`

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` | name of the host where the message must be send to. E.g. "myPC" or "system.host.myPC". If argument is empty, the message will be sent to all hosts. |
| `command` | `string` | command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage) |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) | object that will be given as argument for request |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | optional return result        <pre><code>            function (result) {              // result is target adapter specific and can vary from command to command              if (!result) adapter.log.error('No response received');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6970](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6970)

___

### sendToHostAsync

▸ **sendToHostAsync**(`hostName`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

Sends a message to a specific host or all hosts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostName` | `string` |
| `message` | [`MessagePayload`](../modules/internal_.md#messagepayload) |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L351)

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

[packages/adapter/src/lib/adapter/adapter.ts:352](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L352)

___

### setBinaryState

▸ **setBinaryState**(`id`, `binary`, `callback`): `void`

Same as setForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) | data |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10016](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10016)

▸ **setBinaryState**(`id`, `binary`, `options`, `callback`): `void`

Same as setForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) | data |
| `options` | `unknown` | optional |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10017](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L10017)

___

### setBinaryStateAsync

▸ **setBinaryStateAsync**(`id`, `binary`, `options?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Despite the naming convention, this method doesn't prepend the adapter namespace. Use setForeignBinaryStateAsync instead.
Writes a binary state into Redis

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) |
| `options?` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L259)

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

[packages/adapter/src/lib/adapter/adapter.ts:120](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L120)

___

### setForeignBinaryState

▸ **setForeignBinaryState**(`id`, `binary`, `callback`): `void`

Write binary block into redis, e.g image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) | data |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9875](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9875)

▸ **setForeignBinaryState**(`id`, `binary`, `options`, `callback`): `void`

Write binary block into redis, e.g image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) | data |
| `options` | `unknown` | optional |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9876](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9876)

___

### setForeignBinaryStateAsync

▸ **setForeignBinaryStateAsync**(`id`, `binary`, `options?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Writes a binary state into Redis. The ID will not be prefixed with the adapter namespace.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | [`Buffer`](../modules/internal_.md#buffer) |
| `options?` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L253)

___

### setForeignObject

▸ **setForeignObject**<`T`\>(`id`, `obj`, `callback?`): `void`

Same as Adapter.setObject, but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be overwritten or created. |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> | new object |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3124](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3124)

▸ **setForeignObject**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

Same as Adapter.setObject, but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `T` | object ID, that must be overwritten or created. |
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> | new object |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3129](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L3129)

___

### setForeignObjectAsync

▸ **setForeignObjectAsync**<`T`\>(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates or overwrites an object (which might not belong to this adapter) in the object db

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

[packages/adapter/src/lib/adapter/adapter.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L295)

___

### setForeignObjectNotExists

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `callback?`): `void`

Same as Adapter.setForeignObject, but with check if the object exists.

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
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> | new object |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4701](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4701)

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

Same as Adapter.setForeignObject, but with check if the object exists.

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
| `obj` | [`SettableObjectWorker`](../modules/internal_.md#settableobjectworker)<[`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"write"``\>\> | new object |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4706](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4706)

___

### setForeignObjectNotExistsAsync

▸ **setForeignObjectNotExistsAsync**<`T`\>(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates an object (which might not belong to this adapter) in the object db. Existing objects are not overwritten.

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

[packages/adapter/src/lib/adapter/adapter.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L172)

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
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8024](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8024)

▸ **setForeignState**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8029](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8029)

▸ **setForeignState**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8035](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8035)

▸ **setForeignState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8041](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8041)

___

### setForeignStateAsync

▸ **setForeignStateAsync**(`id`, `state`, `ack?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Writes a value (which might not belong to this adapter) into the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack?` | `boolean` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:397](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L397)

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

[packages/adapter/src/lib/adapter/adapter.ts:402](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L402)

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

[packages/adapter/src/lib/adapter/adapter.ts:407](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L407)

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
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8333](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8333)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8338](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8338)

▸ **setForeignStateChanged**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8344](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8344)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8350](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L8350)

___

### setForeignStateChangedAsync

▸ **setForeignStateChangedAsync**(`id`, `state`, `ack?`): [`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

Writes a value (which might not belong to this adapter) into the states DB only if it has changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack?` | `boolean` |

#### Returns

[`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L311)

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

[packages/adapter/src/lib/adapter/adapter.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L316)

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

[packages/adapter/src/lib/adapter/adapter.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L321)

___

### setInterval

▸ **setInterval**(`cb`, `timeout`, ...`args`): `void` \| [`Timeout`](../interfaces/internal_.Timeout.md)

Same as setInterval
but it clears the running intervals on unload
does not work after unload has been called

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | [`TimeoutCallback`](../modules/internal_.md#timeoutcallback) | interval callback |
| `timeout` | `number` | interval in milliseconds |
| `...args` | `any`[] | as many arguments as needed, which will be passed to setTimeout |

#### Returns

`void` \| [`Timeout`](../interfaces/internal_.Timeout.md)

interval interval object

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2504](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2504)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`AdapterClass`](AdapterClass.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

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
| `id` | [`ID`](../modules/internal_.md#id) | object ID, that must be overwritten or created. |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2552](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2552)

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
| `id` | [`ID`](../modules/internal_.md#id) | object ID, that must be overwritten or created. |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2553](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2553)

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
| `id` | [`ID`](../modules/internal_.md#id) | object ID, that must be overwritten or created. |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2559](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2559)

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates or overwrites an object in the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L293)

___

### setObjectNotExists

▸ **setObjectNotExists**(`id`, `obj`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

Same as Adapter.setObject, but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4600](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4600)

▸ **setObjectNotExists**(`id`, `obj`, `options`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

Same as Adapter.setObject, but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result        <pre><code>            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        </code></pre> |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4605](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4605)

___

### setObjectNotExistsAsync

▸ **setObjectNotExistsAsync**(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates an object in the object db. Existing objects are not overwritten.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | [`Omit`](../modules/internal_.md#omit)<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| [`Omit`](../modules/internal_.md#omit)<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L170)

___

### setPassword

▸ **setPassword**(`user`, `pw`, `options`, `callback?`): `Promise`<`void`\>

sets the user's password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `options` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot set password: ' + err);            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1620](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1620)

▸ **setPassword**(`user`, `pw`, `callback?`): `Promise`<`void`\>

sets the user's password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot set password: ' + err);            }        </code></pre> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1627](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1627)

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

[packages/adapter/src/lib/adapter/adapter.ts:283](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L283)

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

[packages/adapter/src/lib/adapter/adapter.ts:1247](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1247)

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
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7136](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7136)

▸ **setState**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7141](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7141)

▸ **setState**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7147](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7147)

▸ **setState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  <pre><code>      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  </code></pre> |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id        <pre><code>            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7153](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7153)

___

### setStateAsync

▸ **setStateAsync**(`id`, `state`, `ack?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Writes a value into the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack?` | `boolean` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L377)

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

[packages/adapter/src/lib/adapter/adapter.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L382)

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

[packages/adapter/src/lib/adapter/adapter.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L387)

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
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error, id and notChanged        <pre><code>            function (err, id, notChanged) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);              if (!notChanged) adapter.log.debug('Value was changed');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7878](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7878)

▸ **setStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error, id and notChanged        <pre><code>            function (err, id, notChanged) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);              if (!notChanged) adapter.log.debug('Value was changed');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7883](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7883)

▸ **setStateChanged**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error, id and notChanged        <pre><code>            function (err, id, notChanged) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);              if (!notChanged) adapter.log.debug('Value was changed');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7889](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7889)

▸ **setStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error, id and notChanged        <pre><code>            function (err, id, notChanged) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);              if (!notChanged) adapter.log.debug('Value was changed');            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7895](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L7895)

___

### setStateChangedAsync

▸ **setStateChangedAsync**(`id`, `state`, `ack?`): [`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

Writes a value into the states DB only if it has changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) |
| `ack?` | `boolean` |

#### Returns

[`SetStateChangedPromise`](../modules/internal_.md#setstatechangedpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:331](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L331)

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

[packages/adapter/src/lib/adapter/adapter.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L336)

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

[packages/adapter/src/lib/adapter/adapter.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L341)

___

### setTimeout

▸ **setTimeout**(`cb`, `timeout`, ...`args`): `void` \| [`Timeout`](../interfaces/internal_.Timeout.md)

Same as setTimeout
but it clears the running timers on unload
does not work after unload has been called

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cb` | [`TimeoutCallback`](../modules/internal_.md#timeoutcallback) | timer callback |
| `timeout` | `number` | timeout in milliseconds |
| `...args` | `any`[] | as many arguments as needed, which will be passed to setTimeout |

#### Returns

`void` \| [`Timeout`](../interfaces/internal_.Timeout.md)

timer id

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2422](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2422)

___

### subscribeForeignFiles

▸ **subscribeForeignFiles**(`pattern`, `callback?`): `void`

Subscribe for the changes of files in specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4539](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4539)

▸ **subscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of files in specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4540](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4540)

___

### subscribeForeignObjects

▸ **subscribeForeignObjects**(`pattern`, `callback?`): `void`

Subscribe for the changes of objects in any instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot subscribe object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4460](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4460)

▸ **subscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of objects in any instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot subscribe object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4461](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4461)

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

[packages/adapter/src/lib/adapter/adapter.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L166)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result function (err) {} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9402](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9402)

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
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result function (err) {} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9403](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9403)

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

[packages/adapter/src/lib/adapter/adapter.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L245)

___

### subscribeObjects

▸ **subscribeObjects**(`pattern`, `callback?`): `void`

Subscribe for the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot subscribe object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4373](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4373)

▸ **subscribeObjects**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot subscribe object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4374](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4374)

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

[packages/adapter/src/lib/adapter/adapter.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L160)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9789](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9789)

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
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9790](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9790)

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

[packages/adapter/src/lib/adapter/adapter.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L249)

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

[packages/adapter/src/lib/adapter/adapter.ts:1463](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1463)

___

### terminate

▸ **terminate**(`exitCode?`): `never`

stops the execution of adapter, but not disables it.

Sometimes, the adapter must be stopped if some libraries are missing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exitCode?` | `number` | optional exit code |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1313](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1313)

▸ **terminate**(`reason?`, `exitCode?`): `never`

stops the execution of adapter, but not disables it.

Sometimes, the adapter must be stopped if some libraries are missing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `string` | optional termination description |
| `exitCode?` | `number` | optional exit code |

#### Returns

`never`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1314](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L1314)

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

[packages/adapter/src/lib/adapter/adapter.ts:6372](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6372)

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

[packages/adapter/src/lib/adapter/adapter.ts:6373](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6373)

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

[packages/adapter/src/lib/adapter/adapter.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L223)

___

### unsubscribeForeignFiles

▸ **unsubscribeForeignFiles**(`pattern`, `callback?`): `void`

Unsubscribe for the changes of files on specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4568](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4568)

▸ **unsubscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for the changes of files on specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4569](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4569)

___

### unsubscribeForeignObjects

▸ **unsubscribeForeignObjects**(`pattern`, `callback?`): `void`

Unsubscribe for the patterns on all objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4498](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4498)

▸ **unsubscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for the patterns on all objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4499](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4499)

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

[packages/adapter/src/lib/adapter/adapter.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L168)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result function (err) {} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9641](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9641)

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
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result function (err) {} |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9642](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9642)

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

[packages/adapter/src/lib/adapter/adapter.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L247)

___

### unsubscribeObjects

▸ **unsubscribeObjects**(`pattern`, `callback?`): `void`

Unsubscribe on the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4416](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4416)

▸ **unsubscribeObjects**(`pattern`, `options`, `callback?`): `void`

Unsubscribe on the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result        <pre><code>            function (err) {              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);            }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4417](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L4417)

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

[packages/adapter/src/lib/adapter/adapter.ts:162](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L162)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9831](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9831)

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
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9832](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L9832)

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

[packages/adapter/src/lib/adapter/adapter.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L251)

___

### updateConfig

▸ **updateConfig**(`newConfig`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Updates the adapter config with new values. Only a subset of the configuration has to be provided,
since merging with the existing config is done automatically, e.g. like this:

`adapter.updateConfig({prop1: "newValue1"})`

After updating the configuration, the adapter is automatically restarted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | The new config values to be stored |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2313](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L2313)

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
| `data` | `string` \| [`Buffer`](../modules/internal_.md#buffer) | data as UTF8 string or buffer depends on the file extension. |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) | return result        <pre><code>            function (err) {             }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6511](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6511)

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
| `data` | `string` \| [`Buffer`](../modules/internal_.md#buffer) | data as UTF8 string or buffer depends on the file extension. |
| `options` | `unknown` | optional user context |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) | return result        <pre><code>            function (err) {             }        </code></pre> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6512](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L6512)

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

[packages/adapter/src/lib/adapter/adapter.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/5767b399/packages/adapter/src/lib/adapter/adapter.ts#L230)

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

**`Since`**

v15.2.0, v14.17.0

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

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[listenerCount](internal_.EventEmitter-1.md#listenercount-1)

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): [`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

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

**`Since`**

v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) | - |

#### Returns

[`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[on](internal_.EventEmitter-1.md#on-1)

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

**`Since`**

v11.13.0, v10.16.0

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
