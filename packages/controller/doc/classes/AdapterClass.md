[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / AdapterClass

# Class: AdapterClass

Adapter class

How the initialization happens:
 _initObjects => _initStates => _prepareInitAdapter => _initAdapter => _initLogging => _createInstancesObjects => ready

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
- [constants](AdapterClass.md#constants)
- [dateFormat](AdapterClass.md#dateformat)
- [host](AdapterClass.md#host)
- [instance](AdapterClass.md#instance)
- [ioPack](AdapterClass.md#iopack)
- [isFloatComma](AdapterClass.md#isfloatcomma)
- [language](AdapterClass.md#language)
- [latitude](AdapterClass.md#latitude)
- [log](AdapterClass.md#log)
- [longitude](AdapterClass.md#longitude)
- [name](AdapterClass.md#name)
- [namespace](AdapterClass.md#namespace)
- [oObjects](AdapterClass.md#oobjects)
- [oStates](AdapterClass.md#ostates)
- [pack](AdapterClass.md#pack)
- [performStrictObjectChecks](AdapterClass.md#performstrictobjectchecks)
- [processLog](AdapterClass.md#processlog)
- [requireLog](AdapterClass.md#requirelog)
- [stop](AdapterClass.md#stop)
- [systemConfig](AdapterClass.md#systemconfig)
- [version](AdapterClass.md#version)

### Methods

- [addChannelToEnum](AdapterClass.md#addchanneltoenum)
- [addChannelToEnumAsync](AdapterClass.md#addchanneltoenumasync)
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
- [encrypt](AdapterClass.md#encrypt)
- [extendForeignObject](AdapterClass.md#extendforeignobject)
- [extendForeignObjectAsync](AdapterClass.md#extendforeignobjectasync)
- [extendObject](AdapterClass.md#extendobject)
- [extendObjectAsync](AdapterClass.md#extendobjectasync)
- [fileExists](AdapterClass.md#fileexists)
- [fileExistsAsync](AdapterClass.md#fileexistsasync)
- [findForeignObject](AdapterClass.md#findforeignobject)
- [findForeignObjectAsync](AdapterClass.md#findforeignobjectasync)
- [foreignObjectExists](AdapterClass.md#foreignobjectexists)
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
- [mkdir](AdapterClass.md#mkdir)
- [mkdirAsync](AdapterClass.md#mkdirasync)
- [objectExists](AdapterClass.md#objectexists)
- [on](AdapterClass.md#on)
- [readDir](AdapterClass.md#readdir)
- [readDirAsync](AdapterClass.md#readdirasync)
- [readFile](AdapterClass.md#readfile)
- [readFileAsync](AdapterClass.md#readfileasync)
- [registerNotification](AdapterClass.md#registernotification)
- [rename](AdapterClass.md#rename)
- [renameAsync](AdapterClass.md#renameasync)
- [restart](AdapterClass.md#restart)
- [sendTo](AdapterClass.md#sendto)
- [sendToAsync](AdapterClass.md#sendtoasync)
- [sendToHost](AdapterClass.md#sendtohost)
- [sendToHostAsync](AdapterClass.md#sendtohostasync)
- [sendToUI](AdapterClass.md#sendtoui)
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

## Constructors

### constructor

• **new AdapterClass**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`AdapterOptions`](../interfaces/internal_.AdapterOptions.md) |

#### Defined in

[adapter/src/lib/adapter/adapter.ts:722](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L722)

## Properties

### FORBIDDEN\_CHARS

• `Readonly` **FORBIDDEN\_CHARS**: `RegExp` = `FORBIDDEN_CHARS`

A RegExp to test for forbidden chars in object IDs

#### Defined in

[adapter/src/lib/adapter/adapter.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L647)

___

### adapterConfig

• `Optional` **adapterConfig**: ``null`` \| [`AdapterOptions`](../interfaces/internal_.AdapterOptions.md) \| [`InstanceObject`](../interfaces/internal_.InstanceObject.md)

contents of io-package.json

#### Defined in

[adapter/src/lib/adapter/adapter.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L665)

___

### adapterDir

• **adapterDir**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L667)

___

### adapterReady

• **adapterReady**: `boolean` = `false`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L613)

___

### common

• `Optional` **common**: [`InstanceCommon`](../interfaces/internal_.InstanceCommon.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L690)

___

### config

• **config**: [`AdapterConfig`](../interfaces/internal_.AdapterConfig.md) = `{}`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L688)

___

### connected

• `Optional` **connected**: `boolean`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:666](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L666)

___

### constants

• `Readonly` **constants**: `Object`

Constants for frequent use in adapters

#### Type declaration

| Name | Type |
| :------ | :------ |
| `STATE_QUALITY` | typeof [`STATE_QUALITY`](../enums/internal_.STATE_QUALITY.md) |

#### Defined in

[adapter/src/lib/adapter/adapter.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L713)

___

### dateFormat

• `Optional` **dateFormat**: `any`

the configured date format of system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L677)

___

### host

• `Optional` **host**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L689)

___

### instance

• `Optional` **instance**: `number`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:661](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L661)

___

### ioPack

• **ioPack**: `Record`<`string`, `any`\>

contents of io-package.json

#### Defined in

[adapter/src/lib/adapter/adapter.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L671)

___

### isFloatComma

• `Optional` **isFloatComma**: `boolean`

if float comma instead of dot is used, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L679)

___

### language

• `Optional` **language**: [`Languages`](../modules/internal_.md#languages)

configured language of system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L681)

___

### latitude

• `Optional` **latitude**: `number`

latitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:685](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L685)

___

### log

• **log**: [`Log`](internal_.Log.md)

For ease of use the log property is always defined, however it is only available after `ready` has been called.

#### Defined in

[adapter/src/lib/adapter/adapter.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L633)

___

### longitude

• `Optional` **longitude**: `number`

longitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L683)

___

### name

• **name**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L640)

___

### namespace

• **namespace**: \`${string}.${number}\`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L639)

___

### oObjects

• `Optional` **oObjects**: `Record`<`string`, `undefined` \| [`Object`](../modules/internal_.md#object)\>

Contains a live cache of the adapter's objects.
NOTE: This is only defined if the adapter was initialized with the option objects: true.

#### Defined in

[adapter/src/lib/adapter/adapter.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L625)

___

### oStates

• `Optional` **oStates**: `Record`<`string`, `undefined` \| [`State`](../interfaces/internal_.State.md)\>

Contains a live cache of the adapter's states.
NOTE: This is only defined if the adapter was initialized with the option states: true.

#### Defined in

[adapter/src/lib/adapter/adapter.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L620)

___

### pack

• `Optional` **pack**: `Record`<`string`, `any`\>

contents of package.json

#### Defined in

[adapter/src/lib/adapter/adapter.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L669)

___

### performStrictObjectChecks

• **performStrictObjectChecks**: `boolean`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L634)

___

### processLog

• `Optional` **processLog**: (`msg`: `any`) => `void`

#### Type declaration

▸ (`msg`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

##### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L697)

___

### requireLog

• `Optional` **requireLog**: (`isActive`: `boolean`, `options?`: `Partial`<[`GetUserGroupsOptions`](../interfaces/internal_.GetUserGroupsOptions.md)\>) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`isActive`, `options?`): `void` \| `Promise`<`void`\>

Start or stop subscribing to log messages
The method is only available if logTransporter is active via io-pack or adapter options
Note, that stopping will stop after 10 seconds, not immediately

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isActive` | `boolean` | if log subscription should be activated or deactivated |
| `options?` | `Partial`<[`GetUserGroupsOptions`](../interfaces/internal_.GetUserGroupsOptions.md)\> | options passed to setState e.g. user permissions |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L706)

___

### stop

• `Optional` **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Stop the adapter

##### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:693](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L693)

___

### systemConfig

• `Optional` **systemConfig**: `Record`<`string`, `any`\>

contents of iobroker.json if required via AdapterOptions

#### Defined in

[adapter/src/lib/adapter/adapter.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L675)

___

### version

• `Optional` **version**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L694)

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

[adapter/src/lib/adapter/adapter.ts:5476](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5476)

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

[adapter/src/lib/adapter/adapter.ts:5483](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5483)

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

[adapter/src/lib/adapter/adapter.ts:206](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L206)

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

[adapter/src/lib/adapter/adapter.ts:6174](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6174)

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

[adapter/src/lib/adapter/adapter.ts:6182](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6182)

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

[adapter/src/lib/adapter/adapter.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L223)

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
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) | object that describes the access rights like ```js // static information var commandsPermissions = { getObject: {type: 'object', operation: 'read'}, getObjects: {type: 'object', operation: 'list'}, getObjectView: {type: 'object', operation: 'list'}, setObject: {type: 'object', operation: 'write'}, subscribeObjects: {type: 'object', operation: 'read'}, unsubscribeObjects: {type: 'object', operation: 'read'}, subscribeFiles: {type: 'object', operation: 'read'}, unsubscribeFiles: {type: 'object', operation: 'read'}, getStates: {type: 'state', operation: 'list'}, getState: {type: 'state', operation: 'read'}, setState: {type: 'state', operation: 'write'}, getStateHistory: {type: 'state', operation: 'read'}, subscribe: {type: 'state', operation: 'read'}, unsubscribe: {type: 'state', operation: 'read'}, getVersion: {type: '', operation: ''}, httpGet: {type: 'other', operation: 'http'}, sendTo: {type: 'other', operation: 'sendto'}, sendToHost: {type: 'other', operation: 'sendto'}, readFile: {type: 'file', operation: 'read'}, readFile64: {type: 'file', operation: 'read'}, writeFile: {type: 'file', operation: 'write'}, writeFile64: {type: 'file', operation: 'write'}, unlink: {type: 'file', operation: 'delete'}, rename: {type: 'file', operation: 'write'}, mkdir: {type: 'file', operation: 'write'}, readDir: {type: 'file', operation: 'list'}, chmodFile: {type: 'file', operation: 'write'}, chownFile: {type: 'file', operation: 'write'}, authEnabled: {type: '', operation: ''}, disconnect: {type: '', operation: ''}, listPermissions: {type: '', operation: ''}, getUserPermissions: {type: 'object', operation: 'read'} }; ``` |
| `options?` | `Record`<`string`, `any`\> | optional user context |
| `callback?` | [`CalculatePermissionsCallback`](../modules/internal_.md#calculatepermissionscallback) | return result ```js function (acl) { // Access control object for admin looks like: // { // file: { // read: true, // write: true, // 'delete': true, // create: true, // list: true // }, // object: { // read: true, // write: true, // 'delete': true, // list: true // }, // state: { // read: true, // write: true, // 'delete': true, // create: true, // list: true // }, // user: 'admin', // users: { // read: true, // write: true, // create: true, // 'delete': true, // list: true // }, // other: { // execute: true, // http: true, // sendto: true // }, // groups: ['administrator'] // can be more than one // } } ``` |

#### Returns

`Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1869](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1869)

▸ **calculatePermissions**(`user`, `commandsPermissions`, `callback?`): `Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) | object that describes the access rights like ```js // static information var commandsPermissions = { getObject: {type: 'object', operation: 'read'}, getObjects: {type: 'object', operation: 'list'}, getObjectView: {type: 'object', operation: 'list'}, setObject: {type: 'object', operation: 'write'}, subscribeObjects: {type: 'object', operation: 'read'}, unsubscribeObjects: {type: 'object', operation: 'read'}, subscribeFiles: {type: 'object', operation: 'read'}, unsubscribeFiles: {type: 'object', operation: 'read'}, getStates: {type: 'state', operation: 'list'}, getState: {type: 'state', operation: 'read'}, setState: {type: 'state', operation: 'write'}, getStateHistory: {type: 'state', operation: 'read'}, subscribe: {type: 'state', operation: 'read'}, unsubscribe: {type: 'state', operation: 'read'}, getVersion: {type: '', operation: ''}, httpGet: {type: 'other', operation: 'http'}, sendTo: {type: 'other', operation: 'sendto'}, sendToHost: {type: 'other', operation: 'sendto'}, readFile: {type: 'file', operation: 'read'}, readFile64: {type: 'file', operation: 'read'}, writeFile: {type: 'file', operation: 'write'}, writeFile64: {type: 'file', operation: 'write'}, unlink: {type: 'file', operation: 'delete'}, rename: {type: 'file', operation: 'write'}, mkdir: {type: 'file', operation: 'write'}, readDir: {type: 'file', operation: 'list'}, chmodFile: {type: 'file', operation: 'write'}, chownFile: {type: 'file', operation: 'write'}, authEnabled: {type: '', operation: ''}, disconnect: {type: '', operation: ''}, listPermissions: {type: '', operation: ''}, getUserPermissions: {type: 'object', operation: 'read'} }; ``` |
| `callback?` | [`CalculatePermissionsCallback`](../modules/internal_.md#calculatepermissionscallback) | return result ```js function (acl) { // Access control object for admin looks like: // { // file: { // read: true, // write: true, // 'delete': true, // create: true, // list: true // }, // object: { // read: true, // write: true, // 'delete': true, // list: true // }, // state: { // read: true, // write: true, // 'delete': true, // create: true, // list: true // }, // user: 'admin', // users: { // read: true, // write: true, // create: true, // 'delete': true, // list: true // }, // other: { // execute: true, // http: true, // sendto: true // }, // groups: ['administrator'] // can be more than one // } } ``` |

#### Returns

`Promise`<`void` \| [`PermissionSet`](../interfaces/internal_.PermissionSet.md)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1875](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1875)

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

[adapter/src/lib/adapter/adapter.ts:330](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L330)

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
| `options` | `Record`<`string`, `any`\> | optional user context |
| `callback?` | [`CheckGroupCallback`](../modules/internal_.md#checkgroupcallback) | return result ```js function (result) { if (result) adapter.log.debug('User exists and in the group'); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1785](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1785)

▸ **checkGroup**(`user`, `group`, `callback?`): `Promise`<`void`\>

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `group` | `string` | group name |
| `callback?` | [`CheckGroupCallback`](../modules/internal_.md#checkgroupcallback) | return result ```js function (result) { if (result) adapter.log.debug('User exists and in the group'); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1786](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1786)

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

[adapter/src/lib/adapter/adapter.ts:328](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L328)

___

### checkPassword

▸ **checkPassword**(`user`, `pw`, `options`, `callback`): `Promise`<`void`\>

validates user and password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `options` | `Record`<`string`, `any`\> | optional user context |
| `callback` | [`CheckPasswordCallback`](../modules/internal_.md#checkpasswordcallback) | return result ```js function (result) { if (result) adapter.log.debug('User is valid'); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1543](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1543)

▸ **checkPassword**(`user`, `pw`, `callback`): `Promise`<`void`\>

validates user and password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `callback` | [`CheckPasswordCallback`](../modules/internal_.md#checkpasswordcallback) | return result ```js function (result) { if (result) adapter.log.debug('User is valid'); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1549](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1549)

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

[adapter/src/lib/adapter/adapter.ts:324](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L324)

___

### chmodFile

▸ **chmodFile**(`adapter`, `path`, `options`, `callback`): `void`

Change file access rights

This function updates the file access rights
```js
     adapter.chmodFile('vis-2.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` | path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0". |
| `options` | `Record`<`string`, `any`\> \| { `mode`: `string` \| `number`  } | data with mode |
| `callback` | [`ChownFileCallback`](../modules/internal_.md#chownfilecallback) | return result ```js function (err, processedFiles) { list of processed files with new groups } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6452](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6452)

▸ **chmodFile**(`adapter`, `path`, `callback`): `void`

Change file access rights

This function updates the file access rights
```js
     adapter.chmodFile('vis-2.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` | path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0". |
| `callback` | [`ChownFileCallback`](../modules/internal_.md#chownfilecallback) | return result ```js function (err, processedFiles) { list of processed files with new groups } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6459](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6459)

___

### chmodFileAsync

▸ **chmodFileAsync**(`adapter`, `path`, `options`): `Promise`<{ `entries`: [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[] ; `id`: `string`  }\>

Changes access rights of all files in the adapter directory

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapter` | ``null`` \| `string` |
| `path` | `string` |
| `options` | `Record`<`string`, `any`\> \| { `mode`: `string` \| `number`  } |

#### Returns

`Promise`<{ `entries`: [`ChownFileResult`](../interfaces/internal_.ChownFileResult.md)[] ; `id`: `string`  }\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:239](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L239)

___

### chownFile

▸ **chownFile**(`_adapter`, `path`, `options`, `callback`): `void`

Change a file owner

This function updates the file owner and ownerGroup
```js
     adapter.chownFile('vis-2.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` | adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken. |
| `path` | `string` | path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0". |
| `options` | `unknown` | data with owner and ownerGroup |
| `callback` | (`err?`: ``null`` \| `Error`, `processedFiles?`: `any`) => `void` | return result ```js function (err, processedFiles) { list of processed files with new groups } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6499](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6499)

▸ **chownFile**(`_adapter`, `path`, `callback`): `void`

Change a file owner

This function updates the file owner and ownerGroup
```js
     adapter.chownFile('vis-2.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` | adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken. |
| `path` | `string` | path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0". |
| `callback` | (`err?`: ``null`` \| `Error`, `processedFiles?`: `any`) => `void` | return result ```js function (err, processedFiles) { list of processed files with new groups } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6506](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6506)

___

### chownFileAsync

▸ **chownFileAsync**(`...args`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L245)

___

### clearInterval

▸ **clearInterval**(`interval`): `void`

Same as clearInterval
but it checks the running intervals on unload

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | `undefined` \| [`Interval`](../modules/internal_.md#interval) | interval object |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2669](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2669)

___

### clearTimeout

▸ **clearTimeout**(`timer`): `void`

Same as clearTimeout
but it checks the running timers on unload

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timer` | `undefined` \| [`Timeout`](../modules/internal_.md#timeout) | the timer object |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2587](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2587)

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

[adapter/src/lib/adapter/adapter.ts:5117](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5117)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5118](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5118)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5124](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5124)

▸ **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5131](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5131)

___

### createChannelAsync

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates an object with type channel. It must be located under a device

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon?` | `string` \| `Partial`<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L502)

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `native?` | `Record`<`string`, `any`\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L507)

▸ **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `channelName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`ChannelCommon`](../interfaces/internal_.ChannelCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:513](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L513)

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

[adapter/src/lib/adapter/adapter.ts:5043](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5043)

▸ **createDevice**(`deviceName`, `common`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5044](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5044)

▸ **createDevice**(`deviceName`, `common`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5049](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5049)

▸ **createDevice**(`deviceName`, `common`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5055](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5055)

___

### createDeviceAsync

▸ **createDeviceAsync**(`deviceName`, `common?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

creates an object with type device

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common?` | `Partial`<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:481](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L481)

▸ **createDeviceAsync**(`deviceName`, `common`, `native?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `native?` | `Record`<`string`, `any`\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L482)

▸ **createDeviceAsync**(`deviceName`, `common`, `native`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deviceName` | `string` |
| `common` | `Partial`<[`DeviceCommon`](../interfaces/internal_.DeviceCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:487](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L487)

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

[adapter/src/lib/adapter/adapter.ts:5202](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5202)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5208](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5208)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5215](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5215)

▸ **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `options` | `unknown` |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5223](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5223)

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
| `roleOrCommon?` | `string` \| `Partial`<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:524](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L524)

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `native?` | `Record`<`string`, `any`\> |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L530)

▸ **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel` | `string` |
| `stateName` | `string` |
| `roleOrCommon` | `string` \| `Partial`<[`StateCommon`](../interfaces/internal_.StateCommon.md)\> |
| `native` | `Record`<`string`, `any`\> |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:537](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L537)

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

[adapter/src/lib/adapter/adapter.ts:1246](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1246)

▸ **decrypt**(`value`): `string`

Decrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | value to decrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1247](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1247)

___

### delBinaryState

▸ **delBinaryState**(`id`, `callback?`): `void`

Deletes binary state but prefixes the own namespace to the id

**`Deprecated`**

Please use `delFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10371](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10371)

▸ **delBinaryState**(`id`, `options`, `callback?`): `void`

Deletes binary state but prefixes the own namespace to the id

**`Deprecated`**

Please use `delFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10372](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10372)

___

### delBinaryStateAsync

▸ **delBinaryStateAsync**(`id`, `options?`): `Promise`<`void`\>

Despite the naming convention, this method doesn't prepend the adapter namespace. Use delForeignBinaryStateAsync instead.
Deletes a binary state from the states DB

**`Deprecated`**

Please use `delFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L316)

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

[adapter/src/lib/adapter/adapter.ts:419](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L419)

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

[adapter/src/lib/adapter/adapter.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L420)

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

[adapter/src/lib/adapter/adapter.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L251)

___

### delForeignBinaryState

▸ **delForeignBinaryState**(`id`, `callback?`): `void`

Deletes binary state

**`Deprecated`**

Please use `delFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10305](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10305)

▸ **delForeignBinaryState**(`id`, `options`, `callback?`): `void`

Deletes binary state

**`Deprecated`**

Please use `delFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `unknown` |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10306](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10306)

___

### delForeignBinaryStateAsync

▸ **delForeignBinaryStateAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes a binary state from the states DB. The ID will not be prefixed with the adapter namespace.

**`Deprecated`**

Please use `delFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:308](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L308)

___

### delForeignObject

▸ **delForeignObject**(`id`, `callback?`): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (with namespace) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4496](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4496)

▸ **delForeignObject**(`id`, `options`, `callback?`): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (with namespace) |
| `options` | [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) | optional user context or `{ recursive: true }` to delete all underlying objects |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4497](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4497)

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

[adapter/src/lib/adapter/adapter.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L184)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) {} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9114](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9114)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) {} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9115](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9115)

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

[adapter/src/lib/adapter/adapter.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L265)

___

### delObject

▸ **delObject**(`id`, `callback?`): `void`

Delete an object of this instance.

It is not required to provide the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4436](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4436)

▸ **delObject**(`id`, `options?`, `callback?`): `void`

Delete an object of this instance.

It is not required to provide the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options?` | ``null`` \| [`DelObjectOptions`](../interfaces/internal_.DelObjectOptions.md) | optional user context. E.g. recursive option could be true |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4437](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4437)

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

[adapter/src/lib/adapter/adapter.ts:182](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L182)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9062](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9062)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9063](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9063)

___

### delStateAsync

▸ **delStateAsync**(`id`, `options?`): `Promise`<`void`\>

Deletes a state from the states DB, but not the associated object. Consider using deleteState instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:263](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L263)

___

### delay

▸ **delay**(`timeout`): `Promise`<`void`\>

delays the fulfillment of the promise the amount of time.
it will not fulfill during and after adapter shutdown

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout` | `number` | timeout in milliseconds |

#### Returns

`Promise`<`void`\>

promise when timeout is over

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2606](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2606)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete device: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5724](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5724)

▸ **deleteChannel**(`channelName`, `options?`, `callback?`): `void`

Deletes channel and udnerlying structure

**`Alais`**

deleteChannel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` | is the part of ID like: adapter.instance.<deviceName>.<channelName> |
| `options?` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete device: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5725](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5725)

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
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete device: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5726](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5726)

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

[adapter/src/lib/adapter/adapter.ts:549](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L549)

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

[adapter/src/lib/adapter/adapter.ts:550](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L550)

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

[adapter/src/lib/adapter/adapter.ts:5609](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5609)

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

[adapter/src/lib/adapter/adapter.ts:5615](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5615)

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

[adapter/src/lib/adapter/adapter.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L213)

___

### deleteDevice

▸ **deleteDevice**(`deviceName`, `callback?`): `void`

Delete device with all its channels and states.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete device: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5410](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5410)

▸ **deleteDevice**(`deviceName`, `options`, `callback?`): `void`

Delete device with all its channels and states.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot delete device: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5411](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5411)

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

[adapter/src/lib/adapter/adapter.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L205)

___

### deleteState

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

[adapter/src/lib/adapter/adapter.ts:5832](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5832)

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

[adapter/src/lib/adapter/adapter.ts:5833](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5833)

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

[adapter/src/lib/adapter/adapter.ts:5834](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5834)

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

[adapter/src/lib/adapter/adapter.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L555)

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

[adapter/src/lib/adapter/adapter.ts:556](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L556)

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

[adapter/src/lib/adapter/adapter.ts:557](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L557)

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

[adapter/src/lib/adapter/adapter.ts:6321](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6321)

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

[adapter/src/lib/adapter/adapter.ts:6328](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6328)

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

[adapter/src/lib/adapter/adapter.ts:231](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L231)

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

[adapter/src/lib/adapter/adapter.ts:1331](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1331)

___

### disable

▸ **disable**(): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Disables and stops the adapter instance.

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2478](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2478)

___

### encrypt

▸ **encrypt**(`secretVal`, `value?`): `string`

Encrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretVal` | `string` | to use for encrypting (or value if only one parameter is given) |
| `value?` | `string` | value to encrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1266](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1266)

▸ **encrypt**(`value`): `string`

Encrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | value to encrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1267](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1267)

___

### extendForeignObject

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `callback?`): `void`

Same as [extendObject](AdapterClass.md#extendobject), but for any object.

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
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {"id": id} if (err) adapter.log.error(err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3361](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3361)

▸ **extendForeignObject**<`T`\>(`id`, `objPart`, `options`, `callback?`): `void`

Same as [extendObject](AdapterClass.md#extendobject), but for any object.

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
| `options` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) | optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {"id": id} if (err) adapter.log.error(err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3366](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3366)

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

[adapter/src/lib/adapter/adapter.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L154)

___

### extendObject

▸ **extendObject**(`id`, `objPart`, `callback?`): `void`

Extend some object and create it if it does not exist

You can change or extend some object. E.g. existing object is:
```js
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
```

If following object will be passed as argument

```js
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
```

We will get as output:
```js
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
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be extended |
| `objPart` | [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"state"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"device"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"channel"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"folder"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"meta"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"enum"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"host"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"adapter"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"instance"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"user"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"group"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"script"``  } \| `Object` \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"schedule"``  } \| `Object` \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"design"``  } | - |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { if (err) adapter.log.error(err); // obj is {"id": id} } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2986](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2986)

▸ **extendObject**(`id`, `objPart`, `options`, `callback?`): `void`

Extend some object and create it if it does not exist

You can change or extend some object. E.g. existing object is:
```js
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
```

If following object will be passed as argument

```js
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
```

We will get as output:
```js
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
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be extended |
| `objPart` | [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"state"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"device"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"channel"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"folder"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"meta"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"enum"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"host"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"adapter"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"instance"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"user"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"group"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"script"``  } \| `Object` \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"schedule"``  } \| `Object` \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"design"``  } | - |
| `options` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) | optional user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { if (err) adapter.log.error(err); // obj is {"id": id} } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2987](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2987)

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `objPart`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Extend an object and create it if it might not exist

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `objPart` | [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"state"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"device"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"channel"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"folder"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"meta"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"enum"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"host"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"adapter"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"instance"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"user"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"group"``  } \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"script"``  } \| `Object` \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"schedule"``  } \| `Object` \| [`AnyPartialObject`](../modules/internal_.md#anypartialobject) & { `type?`: ``"design"``  } |
| `options?` | [`ExtendObjectOptions`](../interfaces/internal_.ExtendObjectOptions.md) |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:140](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L140)

___

### fileExists

▸ **fileExists**(`adapterName`, `path`): `Promise`<`boolean`\>

Checks if file exists in DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `adapterName` | ``null`` \| `string` |
| `path` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6808](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6808)

▸ **fileExists**(`adapterName`, `path`, `callback?`): `void`

Checks if file exists in DB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `callback?` | [`GenericCallback`](../modules/internal_.md#genericcallback)<`boolean`\> | cb function if none provided, a promise is returned |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6809](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6809)

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

[adapter/src/lib/adapter/adapter.ts:6810](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6810)

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

[adapter/src/lib/adapter/adapter.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L258)

___

### findForeignObject

▸ **findForeignObject**(`idOrName`, `type`, `callback`): `void`

Find any object by name or ID.

Find object by the exact name or ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | ``null`` \| `string` | optional common.type of state: 'number', 'string', 'boolean', 'file', ... |
| `callback` | [`FindObjectCallback`](../modules/internal_.md#findobjectcallback) | return result ```js adapter.findForeignObject('Some name', function (err, id, name) { if (err) adapter.log.error('Cannot get object: ' + err); adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4297](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4297)

▸ **findForeignObject**(`idOrName`, `type`, `options`, `callback`): `void`

Find any object by name or ID.

Find object by the exact name or ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | ``null`` \| `string` | optional common.type of state: 'number', 'string', 'boolean', 'file', ... |
| `options` | `unknown` | optional user context |
| `callback` | [`FindObjectCallback`](../modules/internal_.md#findobjectcallback) | return result ```js adapter.findForeignObject('Some name', function (err, id, name) { if (err) adapter.log.error('Cannot get object: ' + err); adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4298](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4298)

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

[adapter/src/lib/adapter/adapter.ts:497](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L497)

___

### foreignObjectExists

▸ **foreignObjectExists**(`id`, `options?`): `Promise`<`boolean` \| `void`\>

Checks if an object exists to the given id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object |
| `options?` | ``null`` \| `Record`<`string`, `any`\> | optional user context |

#### Returns

`Promise`<`boolean` \| `void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3589](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3589)

___

### formatDate

▸ **formatDate**(`dateObj`, `format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateObj` | `string` \| `number` \| `Date` |
| `format?` | `string` |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6892](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6892)

▸ **formatDate**(`dateObj`, `isDuration`, `format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateObj` | `string` \| `number` \| `Date` |
| `isDuration` | `string` \| `boolean` |
| `format?` | `string` |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6893](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6893)

___

### formatValue

▸ **formatValue**(`value`, `format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |
| `format?` | `string` |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6857](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6857)

▸ **formatValue**(`value`, `decimals`, `format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |
| `decimals` | `number` |
| `format?` | `string` |

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6858](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6858)

___

### getAdapterObjects

▸ **getAdapterObjects**(`callback`): `Promise`<`void` \| `Record`<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

Get all states, channels and devices of this adapter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`objects`: `Record`<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>) => `void` | return result ```js function (objects) { for (var id in objects) { adapter.log.debug(id); } } ``` |

#### Returns

`Promise`<`void` \| `Record`<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2904](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2904)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<`Record`<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

Get all states, channels, devices and folders of this adapter

#### Returns

`Promise`<`Record`<`string`, [`AdapterScopedObject`](../modules/internal_.md#adapterscopedobject)\>\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:350](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L350)

___

### getBinaryState

▸ **getBinaryState**(`id`, `callback`): `void`

Same as getForeignBinaryState but prefixes the own namespace to the id

**`Depreacted`**

Please use `readFile` instead of binary states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10287](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10287)

▸ **getBinaryState**(`id`, `options`, `callback`): `void`

Same as getForeignBinaryState but prefixes the own namespace to the id

**`Depreacted`**

Please use `readFile` instead of binary states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `options` | `unknown` | optional |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10288](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10288)

___

### getBinaryStateAsync

▸ **getBinaryStateAsync**(`id`, `options?`): [`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

Despite the naming convention, this method doesn't prepend the adapter namespace. Use getForeignBinaryStateAsync instead.
Reads a binary state from Redis

**`Deprecated`**

Please use `readFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L303)

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
| `callback?` | [`GetCertificatesCallback`](../modules/internal_.md#getcertificatescallback) | return result ```js function (err, certs, letsEncrypt) { adapter.log.debug('private key: ' + certs.key); adapter.log.debug('public cert: ' + certs.cert); adapter.log.debug('chained cert: ' + certs.ca); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2272](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2272)

___

### getCertificatesAsync

▸ **getCertificatesAsync**(`publicName?`, `privateName?`, `chainedName?`): `Promise`<[`GetCertificatesPromiseReturnType`](../modules/internal_.md#getcertificatespromisereturntype)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicName?` | `string` |
| `privateName?` | `string` |
| `chainedName?` | `string` |

#### Returns

`Promise`<[`GetCertificatesPromiseReturnType`](../modules/internal_.md#getcertificatespromisereturntype)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:344](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L344)

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

[adapter/src/lib/adapter/adapter.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L569)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:570](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L570)

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

[adapter/src/lib/adapter/adapter.ts:571](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L571)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

Returns a list of all channels in this adapter instance

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L581)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:582](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L582)

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

[adapter/src/lib/adapter/adapter.ts:5991](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5991)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)\> |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5992](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5992)

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

[adapter/src/lib/adapter/adapter.ts:5993](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5993)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

Returns a list of all channels in this adapter instance

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:563](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L563)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md)[]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L564)

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

[adapter/src/lib/adapter/adapter.ts:5937](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5937)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`DeviceObject`](../interfaces/internal_.DeviceObject.md)\> |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:5938](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L5938)

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

[adapter/src/lib/adapter/adapter.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L221)

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

[adapter/src/lib/adapter/adapter.ts:2495](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2495)

___

### getEnum

▸ **getEnum**(`callback`): `void`

Get the enum tree.

Get enums of specified tree or all enums if nothing specified as object with values.
If getEnum called with no enum specified, all enums will be returned:
```js
     adapter.getEnums(function (err, enums, requestEnum) {
       // All enums
       if (err) adapter.log.error('Cannot get object: ' + err);
       for (var e in enums) {
          adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
       }
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) | return result ```js function (err, enums, requestEnum) { // requestEnum is _enum if (err) adapter.log.error('Cannot get object: ' + err); for (var e in enums) { adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', ')); } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3834](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3834)

▸ **getEnum**(`name`, `callback`): `void`

Get the enum tree.

Get enums of specified tree or all enums if nothing specified as object with values.
If getEnum called with no enum specified, all enums will be returned:
```js
     adapter.getEnums(function (err, enums, requestEnum) {
       // All enums
       if (err) adapter.log.error('Cannot get object: ' + err);
       for (var e in enums) {
          adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
       }
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) | return result ```js function (err, enums, requestEnum) { // requestEnum is _enum if (err) adapter.log.error('Cannot get object: ' + err); for (var e in enums) { adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', ')); } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3835](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3835)

▸ **getEnum**(`name`, `options`, `callback`): `void`

Get the enum tree.

Get enums of specified tree or all enums if nothing specified as object with values.
If getEnum called with no enum specified, all enums will be returned:
```js
     adapter.getEnums(function (err, enums, requestEnum) {
       // All enums
       if (err) adapter.log.error('Cannot get object: ' + err);
       for (var e in enums) {
          adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
       }
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | - |
| `options` | `unknown` | optional user context |
| `callback` | [`GetEnumCallback`](../modules/internal_.md#getenumcallback) | return result ```js function (err, enums, requestEnum) { // requestEnum is _enum if (err) adapter.log.error('Cannot get object: ' + err); for (var e in enums) { adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', ')); } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3836](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3836)

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

[adapter/src/lib/adapter/adapter.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L178)

___

### getEnums

▸ **getEnums**(`callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) | return result ```js function (err, enums) { // requestEnum is _enum if (err) adapter.log.error('Cannot get object: ' + err); // Result is like // { // "enum.rooms": { // "enum.rooms.livingroom": { // common: { // members: ['ID1', 'ID2'] // } // }, // "enum.rooms.sleepingroom": { // common: { // members: ['ID3', 'ID4'] // } // } // }, // "enum.functions": { // "enum.rooms.light": { // common: { // members: ['ID1', 'ID6'] // } // }, // "enum.rooms.weather": { // common: { // members: ['ID4', 'ID7'] // } // } // } // } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3923](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3923)

▸ **getEnums**(`enumList`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | [`EnumList`](../modules/internal_.md#enumlist) | - |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) | return result ```js function (err, enums) { // requestEnum is _enum if (err) adapter.log.error('Cannot get object: ' + err); // Result is like // { // "enum.rooms": { // "enum.rooms.livingroom": { // common: { // members: ['ID1', 'ID2'] // } // }, // "enum.rooms.sleepingroom": { // common: { // members: ['ID3', 'ID4'] // } // } // }, // "enum.functions": { // "enum.rooms.light": { // common: { // members: ['ID1', 'ID6'] // } // }, // "enum.rooms.weather": { // common: { // members: ['ID4', 'ID7'] // } // } // } // } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3924](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3924)

▸ **getEnums**(`enumList`, `options`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | [`EnumList`](../modules/internal_.md#enumlist) | - |
| `options` | `unknown` | optional user context |
| `callback` | [`GetEnumsCallback`](../modules/internal_.md#getenumscallback) | return result ```js function (err, enums) { // requestEnum is _enum if (err) adapter.log.error('Cannot get object: ' + err); // Result is like // { // "enum.rooms": { // "enum.rooms.livingroom": { // common: { // members: ['ID1', 'ID2'] // } // }, // "enum.rooms.sleepingroom": { // common: { // members: ['ID3', 'ID4'] // } // } // }, // "enum.functions": { // "enum.rooms.light": { // common: { // members: ['ID1', 'ID6'] // } // }, // "enum.rooms.weather": { // common: { // members: ['ID4', 'ID7'] // } // } // } // } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3925](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3925)

___

### getEnumsAsync

▸ **getEnumsAsync**(`enumList?`, `options?`): [`GetEnumsPromise`](../modules/internal_.md#getenumspromise)

Returns the enum tree, filtered by the optional enum name

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumList?` | [`EnumList`](../modules/internal_.md#enumlist) |
| `options?` | `unknown` |

#### Returns

[`GetEnumsPromise`](../modules/internal_.md#getenumspromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L180)

___

### getForeignBinaryState

▸ **getForeignBinaryState**(`id`, `callback`): `void`

Read a binary block from redis, e.g. an image

**`Deprecated`**

Please use `readFile` instead of binary states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10201](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10201)

▸ **getForeignBinaryState**(`id`, `options`, `callback`): `void`

Read a binary block from redis, e.g. an image

**`Deprecated`**

Please use `readFile` instead of binary states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The state ID |
| `options` | `unknown` | optional |
| `callback` | [`GetBinaryStateCallback`](../modules/internal_.md#getbinarystatecallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10202](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10202)

___

### getForeignBinaryStateAsync

▸ **getForeignBinaryStateAsync**(`id`, `options?`): [`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

**`Deprecated`**

Please use `readFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `unknown` |

#### Returns

[`GetBinaryStatePromise`](../modules/internal_.md#getbinarystatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:296](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L296)

___

### getForeignObject

▸ **getForeignObject**<`T`\>(`id`, `callback`): `void` \| `Promise`<``null`` \| `void` \| [`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"read"``\>\>

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
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`T`\> | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void` \| `Promise`<``null`` \| `void` \| [`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"read"``\>\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4356](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4356)

▸ **getForeignObject**<`T`\>(`id`, `options`, `callback`): `void` \| `Promise`<``null`` \| `void` \| [`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"read"``\>\>

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
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`T`\> | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void` \| `Promise`<``null`` \| `void` \| [`ObjectIdToObjectType`](../modules/internal_.md#objectidtoobjecttype)<`T`, ``"read"``\>\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4360](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4360)

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

[adapter/src/lib/adapter/adapter.ts:353](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L353)

___

### getForeignObjects

▸ **getForeignObjects**(`patter`): `Promise`<`Record`<`string`, [`Object`](../modules/internal_.md#object)\>\>

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       ```js
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
       ```

#### Parameters

| Name | Type |
| :------ | :------ |
| `patter` | [`Pattern`](../modules/internal_.md#pattern) |

#### Returns

`Promise`<`Record`<`string`, [`Object`](../modules/internal_.md#object)\>\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4070](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4070)

▸ **getForeignObjects**(`pattern`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       ```js
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
       ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | object ID/wildcards |
| `callback` | [`GetObjectsCallback`](../modules/internal_.md#getobjectscallback) | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4071](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4071)

▸ **getForeignObjects**(`pattern`, `options`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       ```js
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
       ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | object ID/wildcards |
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectsCallback`](../modules/internal_.md#getobjectscallback) | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4072](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4072)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       ```js
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
       ```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | object ID/wildcards |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4073](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4073)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `enums`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       ```js
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
       ```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | object ID/wildcards |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `enums` | [`EnumList`](../modules/internal_.md#enumlist) | object ID, that must be overwritten or created. |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4078](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4078)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `options`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       ```js
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
       ```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | object ID/wildcards |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4084](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4084)

▸ **getForeignObjects**<`T`\>(`pattern`, `type`, `enums`, `options`, `callback`): `void`

Get objects by pattern, by specific type and resolve their enums.

Get all objects in the system of specified type. E.g.:

       ```js
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
       ```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | object ID/wildcards |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `enums` | ``null`` \| [`EnumList`](../modules/internal_.md#enumlist) | object ID, that must be overwritten or created. |
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectsCallbackTyped`](../modules/internal_.md#getobjectscallbacktyped)<`T`\> | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4090](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4090)

___

### getForeignObjectsAsync

▸ **getForeignObjectsAsync**<`T`\>(`pattern`, `type`, `enums?`, `options?`): [`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

Get foreign objects by pattern, by specific type and resolve their enums.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) |
| `type` | `T` |
| `enums?` | ``null`` \| [`EnumList`](../modules/internal_.md#enumlist) |
| `options?` | `unknown` |

#### Returns

[`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L465)

▸ **getForeignObjectsAsync**<`T`\>(`pattern`, `type`, `options?`): [`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](../modules/internal_.md#objecttype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) |
| `type` | `T` |
| `options?` | `unknown` |

#### Returns

[`GetObjectsPromiseTyped`](../modules/internal_.md#getobjectspromisetyped)<`T`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:471](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L471)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): [`GetObjectsPromise`](../modules/internal_.md#getobjectspromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) |
| `options?` | `unknown` |

#### Returns

[`GetObjectsPromise`](../modules/internal_.md#getobjectspromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L476)

___

### getForeignState

▸ **getForeignState**(`id`, `callback`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

**`Set State`**

explanation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | return result ```js function (err, state) { if (err) adapter.log.error('Cannot read value: ' + err); } ``` See possible attributes of the state in |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8735](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8735)

▸ **getForeignState**(`id`, `options`, `callback`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

**`Set State`**

explanation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `options` | `unknown` | optional user context |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | return result ```js function (err, state) { if (err) adapter.log.error('Cannot read value: ' + err); } ``` See possible attributes of the state in |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8736](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8736)

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

[adapter/src/lib/adapter/adapter.ts:322](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L322)

___

### getForeignStates

▸ **getForeignStates**(`pattern`, `callback`): `void`

Read all states of all adapters (and system states), that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*' or like this. It can be an array of IDs too. |
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) | return result ```js function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9302](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9302)

▸ **getForeignStates**(`pattern`, `options`, `callback`): `void`

Read all states of all adapters (and system states), that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*' or like this. It can be an array of IDs too. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) | return result ```js function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9303](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9303)

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

[adapter/src/lib/adapter/adapter.ts:269](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L269)

___

### getHistory

▸ **getHistory**(`id`, `options`, `callback`): `void`

Read historian data for states of any instance or system state.

This function can read values from history adapters like: history, sql, influxdb. It expects the full path of object ID.
Normally only foreign history has interest, so there is no getHistory and getForeignHistory

Possible options:

 - instance - (optional) name of instance, where to read the historian data, e.g. 'history.0', 'sql.1'. By default, will be taken from system settings.
 - start - (optional) time in ms - Date.now()', by default is (now - 1 week)
 - end - (optional) time in ms - Date.now()', by default is (now + 5000 seconds)
 - step - (optional) used in aggregate (m4, max, min, average, total) step in ms of intervals
 - count - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set.
 - from - if from field should be included in answer
 - ack - if ack field should be included in answer
 - q - if q field should be included in answer
 - addId - if id field should be included in answer
 - limit - do not return more entries than limit
 - ignoreNull - if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)
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
| `callback` | [`GetHistoryCallback`](../modules/internal_.md#gethistorycallback) | return result ```js function (error, result, step, sessionId) { if (error) adapter.log.error('Cannot read value: ' + err); } ``` See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8935](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8935)

▸ **getHistory**(`id`, `callback`): `void`

Read historian data for states of any instance or system state.

This function can read values from history adapters like: history, sql, influxdb. It expects the full path of object ID.
Normally only foreign history has interest, so there is no getHistory and getForeignHistory

Possible options:

 - instance - (optional) name of instance, where to read the historian data, e.g. 'history.0', 'sql.1'. By default, will be taken from system settings.
 - start - (optional) time in ms - Date.now()', by default is (now - 1 week)
 - end - (optional) time in ms - Date.now()', by default is (now + 5000 seconds)
 - step - (optional) used in aggregate (m4, max, min, average, total) step in ms of intervals
 - count - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set.
 - from - if from field should be included in answer
 - ack - if ack field should be included in answer
 - q - if q field should be included in answer
 - addId - if id field should be included in answer
 - limit - do not return more entries than limit
 - ignoreNull - if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)
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
| `callback` | [`GetHistoryCallback`](../modules/internal_.md#gethistorycallback) | return result ```js function (error, result, step, sessionId) { if (error) adapter.log.error('Cannot read value: ' + err); } ``` See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8936](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8936)

___

### getHistoryAsync

▸ **getHistoryAsync**(`...args`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L261)

___

### getObject

▸ **getObject**(`id`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`string`\> | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3616](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3616)

▸ **getObject**(`id`, `options`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options` | `unknown` | optional user context |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`string`\> | return result ```js function (err, obj) { if (err) adapter.log.error('Cannot get object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3617](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3617)

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

[adapter/src/lib/adapter/adapter.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L160)

___

### getObjectList

▸ **getObjectList**(`params`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |  |
| `callback` | [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback)<[`Object`](../modules/internal_.md#object)\> | ```js function (err, res) { if (res && res.rows) { for (var i = 0; i < res.rows.length; i++) { var id = res.rows[i].id; var obj = res.rows[i].value; adapter.log.info('Found ' + id + ': ' + JSON.stringify(obj)); } if (!res.rows.length) adapter.log.info('No objects found.'); } else { adapter.log.info('No objects found: ' + err); } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3775](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3775)

▸ **getObjectList**(`params`, `options`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |  |
| `options` | `Record`<`string`, `any`\> \| { `sorted?`: `boolean`  } |  |
| `callback` | [`GetObjectListCallback`](../modules/internal_.md#getobjectlistcallback)<[`Object`](../modules/internal_.md#object)\> | ```js function (err, res) { if (res && res.rows) { for (var i = 0; i < res.rows.length; i++) { var id = res.rows[i].id; var obj = res.rows[i].value; adapter.log.info('Found ' + id + ': ' + JSON.stringify(obj)); } if (!res.rows.length) adapter.log.info('No objects found.'); } else { adapter.log.info('No objects found: ' + err); } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3779](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3779)

___

### getObjectListAsync

▸ **getObjectListAsync**(`params`, `options?`): [`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

Returns a list of objects with id between params.startkey and params.endkey

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | ``null`` \| [`GetObjectViewParams`](../interfaces/internal_.GetObjectViewParams.md) |
| `options?` | `Record`<`string`, `any`\> \| { `sorted?`: `boolean`  } |

#### Returns

[`GetObjectListPromise`](../modules/internal_.md#getobjectlistpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L173)

___

### getObjectView

▸ **getObjectView**<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

Read object view from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
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
| `callback` | [`GetObjectViewCallback`](../modules/internal_.md#getobjectviewcallback)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\> | return result ```js function (err, doc) { if (doc && doc.rows) { for (var i = 0; i < doc.rows.length; i++) { var id = doc.rows[i].id; var obj = doc.rows[i].value; adapter.log.info('Found ' + id + ': ' + JSON.stringify(obj)); } if (!doc.rows.length) adapter.log.info('No objects found.'); } else { adapter.log.info('No objects found: ' + err); } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3659](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3659)

▸ **getObjectView**<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

Read object view from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
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
| `callback` | [`GetObjectViewCallback`](../modules/internal_.md#getobjectviewcallback)<[`InferGetObjectViewItemType`](../modules/internal_.md#infergetobjectviewitemtype)<`Design`, `Search`\>\> | return result ```js function (err, doc) { if (doc && doc.rows) { for (var i = 0; i < doc.rows.length; i++) { var id = doc.rows[i].id; var obj = doc.rows[i].value; adapter.log.info('Found ' + id + ': ' + JSON.stringify(obj)); } if (!doc.rows.length) adapter.log.info('No objects found.'); } else { adapter.log.info('No objects found: ' + err); } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3665](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3665)

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

[adapter/src/lib/adapter/adapter.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L166)

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

[adapter/src/lib/adapter/adapter.ts:10408](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10408)

___

### getPluginInstance

▸ **getPluginInstance**(`name`): ``null`` \| [`Plugin`](../modules/internal_.md#plugin)

Return plugin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to return |

#### Returns

``null`` \| [`Plugin`](../modules/internal_.md#plugin)

plugin instance or null if not existent or not isActive

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10390](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10390)

___

### getPort

▸ **getPort**(`port`, `host?`, `callback?`): `void`

Helper function to find next free port

Looks for first free TCP port starting with given one:
```js
    adapter.getPort(8081, function (port) {
        adapter.log.debug('Following port is free: ' + port);
    });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` | port number to start the search for free port |
| `host?` | `string` | optional hostname for the port search |
| `callback?` | (`port`: `number`) => `void` | return result ```js function (port) {} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1453](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1453)

▸ **getPort**(`port`, `callback?`): `void`

Helper function to find next free port

Looks for first free TCP port starting with given one:
```js
    adapter.getPort(8081, function (port) {
        adapter.log.debug('Following port is free: ' + port);
    });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` | port number to start the search for free port |
| `callback?` | (`port`: `number`) => `void` | return result ```js function (port) {} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1454](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1454)

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

[adapter/src/lib/adapter/adapter.ts:320](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L320)

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

[adapter/src/lib/adapter/adapter.ts:1287](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1287)

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
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | return result ```js function (err, state) { if (err) adapter.log.error('Cannot read value: ' + err); } ``` See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8704](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8704)

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
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | return result ```js function (err, state) { if (err) adapter.log.error('Cannot read value: ' + err); } ``` See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8705](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8705)

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

[adapter/src/lib/adapter/adapter.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L190)

___

### getStates

▸ **getStates**(`pattern`, `callback`): `void`

Read all states of this adapter, that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*' or like this. It can be an array of IDs too. |
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) | return result ```js function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9173](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9173)

▸ **getStates**(`pattern`, `options`, `callback`): `void`

Read all states of this adapter, that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*' or like this. It can be an array of IDs too. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback` | [`GetStatesCallback`](../modules/internal_.md#getstatescallback) | return result ```js function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9174](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9174)

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

[adapter/src/lib/adapter/adapter.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L267)

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

[adapter/src/lib/adapter/adapter.ts:6062](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6062)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`StateObject`](../interfaces/internal_.StateObject.md)\> |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6063](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6063)

▸ **getStatesOf**(`parentDevice`, `parentChannel`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `undefined` \| ``null`` \| `string` |
| `parentChannel` | `undefined` \| ``null`` \| `string` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`StateObject`](../interfaces/internal_.StateObject.md)\> |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6064](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6064)

▸ **getStatesOf**(`parentDevice`, `parentChannel`, `options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `undefined` \| ``null`` \| `string` |
| `parentChannel` | `undefined` \| ``null`` \| `string` |
| `options` | `unknown` |
| `callback` | [`GetObjectsCallback3`](../modules/internal_.md#getobjectscallback3)<[`StateObject`](../interfaces/internal_.StateObject.md)\> |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6069](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6069)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

Returns a list of all states in this adapter instance

#### Returns

`Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L589)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<[`StateObject`](../interfaces/internal_.StateObject.md)[]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L590)

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

[adapter/src/lib/adapter/adapter.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L591)

___

### getSuitableLicenses

▸ **getSuitableLicenses**(`all?`, `adapterName?`): `Promise`<`any`[]\>

This method returns the list of license that can be used by this adapter

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `all?` | `boolean` | if return the licenses, that used by other instances (true) or only for this instance (false) |
| `adapterName?` | `string` | Return licenses for specific adapter |

#### Returns

`Promise`<`any`[]\>

list of suitable licenses

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10452](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10452)

___

### getUserID

▸ **getUserID**(`username`): `Promise`<`undefined` \| `string`\>

Return ID of given username

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | name of the user |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1648](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1648)

___

### idToDCS

▸ **idToDCS**(`id`): ``null`` \| { `channel`: `string` ; `device`: `string` ; `state`: `string`  }

Convert ID into object with device's, channel's and state's name.

Convert "adapter.instance.D.C.S" in object `{device: D, channel: C, state: S}`
Convert ID to `{device: D, channel: C, state: S}`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | short or long string of ID like "stateID" or "adapterName.0.stateID". |

#### Returns

``null`` \| { `channel`: `string` ; `device`: `string` ; `state`: `string`  }

parsed ID as an object

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9027](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9027)

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

[adapter/src/lib/adapter/adapter.ts:6673](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6673)

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

[adapter/src/lib/adapter/adapter.ts:6674](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6674)

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

[adapter/src/lib/adapter/adapter.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L253)

___

### objectExists

▸ **objectExists**(`id`, `options?`): `Promise`<`boolean` \| `void`\>

Checks if an object exists to the given id, id will be fixed first

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object |
| `options?` | ``null`` \| `Record`<`string`, `any`\> | optional user context |

#### Returns

`Promise`<`boolean` \| `void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3562](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3562)

___

### on

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"stateChange"`` |
| `listener` | [`StateChangeHandler`](../modules/internal_.md#statechangehandler) |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:129](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L129)

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"objectChange"`` |
| `listener` | [`ObjectChangeHandler`](../modules/internal_.md#objectchangehandler) |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:130](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L130)

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"fileChange"`` |
| `listener` | [`FileChangeHandler`](../modules/internal_.md#filechangehandler) |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:131](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L131)

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"ready"`` |
| `listener` | [`ReadyHandler`](../modules/internal_.md#readyhandler) |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:132](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L132)

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"install"`` |
| `listener` | [`ReadyHandler`](../modules/internal_.md#readyhandler) |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:133](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L133)

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unload"`` |
| `listener` | [`UnloadHandler`](../modules/internal_.md#unloadhandler) |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L134)

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"message"`` |
| `listener` | [`MessageHandler`](../modules/internal_.md#messagehandler) |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:135](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L135)

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

Only emitted for compact instances

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"exit"`` |
| `listener` | (`exitCode`: `number`, `reason`: `string`) => `void` \| `Promise`<`void`\> |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:137](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L137)

▸ **on**(`event`, `listener`): [`AdapterClass`](AdapterClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"log"`` |
| `listener` | (`info`: `any`) => `void` \| `Promise`<`void`\> |

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:138](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L138)

___

### readDir

▸ **readDir**(`adapterName`, `path`, `callback`): `void`

Read directory from DB.

This function reads the content of directory from DB for given adapter and path.
If getEnum called with no enum specified, all enums will be returned:
```js
     adapter.readDir('vis-2.0', '/main/', function (err, filesOrDirs) {
       // All enums
       if (err) adapter.log.error('Cannot read directory: ' + err);
       if (filesOrDirs) {
          for (var f = 0; f < filesOrDirs.length; f++) {
             adapter.log.debug('Directory main has the following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
          }
      }
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | path to directory without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0". |
| `callback` | [`ReadDirCallback`](../modules/internal_.md#readdircallback) | return result ```js function (err, filesOrDirs) { // filesOrDirs is array with elements like // { // file: 'views.json, // stats: node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats , // isDir: true/false, // acl: access control list object, // modifiedAt: time when modified, // createdAt: time when created // } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6547](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6547)

▸ **readDir**(`adapterName`, `path`, `options`, `callback`): `void`

Read directory from DB.

This function reads the content of directory from DB for given adapter and path.
If getEnum called with no enum specified, all enums will be returned:
```js
     adapter.readDir('vis-2.0', '/main/', function (err, filesOrDirs) {
       // All enums
       if (err) adapter.log.error('Cannot read directory: ' + err);
       if (filesOrDirs) {
          for (var f = 0; f < filesOrDirs.length; f++) {
             adapter.log.debug('Directory main has the following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
          }
      }
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | path to directory without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0". |
| `options` | `unknown` | optional user context |
| `callback` | [`ReadDirCallback`](../modules/internal_.md#readdircallback) | return result ```js function (err, filesOrDirs) { // filesOrDirs is array with elements like // { // file: 'views.json, // stats: node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats , // isDir: true/false, // acl: access control list object, // modifiedAt: time when modified, // createdAt: time when created // } } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6548](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6548)

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

[adapter/src/lib/adapter/adapter.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L247)

___

### readFile

▸ **readFile**(`adapterName`, `path`, `callback`): `void`

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
```js
     adapter.readFile('vis-2.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('Content of file is: ' + data);
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `callback` | [`ReadFileCallback`](../modules/internal_.md#readfilecallback) | return result ```js function (err, data) { // data is utf8 or binary Buffer depends on the file extension. } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6699](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6699)

▸ **readFile**(`adapterName`, `path`, `options`, `callback`): `void`

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
```js
     adapter.readFile('vis-2.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('Content of file is: ' + data);
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `options` | `unknown` | optional user context |
| `callback` | [`ReadFileCallback`](../modules/internal_.md#readfilecallback) | return result ```js function (err, data) { // data is utf8 or binary Buffer depends on the file extension. } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6700](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6700)

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

[adapter/src/lib/adapter/adapter.ts:255](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L255)

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

[adapter/src/lib/adapter/adapter.ts:7425](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7425)

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

[adapter/src/lib/adapter/adapter.ts:6639](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6639)

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

[adapter/src/lib/adapter/adapter.ts:6640](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6640)

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

[adapter/src/lib/adapter/adapter.ts:252](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L252)

___

### restart

▸ **restart**(): `void`

Restarts an instance of the adapter.

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2414](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2414)

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
| `message` | `any` | object that will be given as argument for request |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | optional return result ```js function (result) { // result is target adapter specific and can vary from adapter to adapter if (!result) adapter.log.error('No response received'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7046](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7046)

▸ **sendTo**(`instanceName`, `command`, `message`, `callback?`, `options?`): `void`

Send message to other adapter instance or all instances of adapter.

This function sends a message to specific instance or all instances of some specific adapter.
If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceName` | `string` | name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0". |
| `command` | `string` | command name, like "send", "browse", "list". Command is depend on target adapter implementation. |
| `message` | `any` | object that will be given as argument for request |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | optional return result ```js function (result) { // result is target adapter specific and can vary from adapter to adapter if (!result) adapter.log.error('No response received'); } ``` |
| `options?` | [`SendToOptions`](../interfaces/internal_.SendToOptions.md) | optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance) |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7051](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7051)

___

### sendToAsync

▸ **sendToAsync**(`instanceName`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

Sends a message to a specific instance or all instances of some specific adapter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `message` | `any` |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:408](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L408)

▸ **sendToAsync**(`instanceName`, `command`, `message`, `options?`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

Async version of sendTo
As we have a special case (first arg can be error or result, we need to promisify manually)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `command` | `string` |
| `message` | `any` |
| `options?` | [`SendToOptions`](../interfaces/internal_.SendToOptions.md) |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:409](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L409)

▸ **sendToAsync**(`instanceName`, `command`, `message?`, `options?`): `any`

Async version of sendTo
As we have a special case (first arg can be error or result, we need to promisify manually)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `unknown` |
| `command` | `unknown` |
| `message?` | `unknown` |
| `options?` | `unknown` |

#### Returns

`any`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7111](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7111)

___

### sendToHost

▸ **sendToHost**(`hostName`, `message`, `callback?`): `void`

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | ``null`` \| `string` | name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts. |
| `message` | `any` | object that will be given as argument for request |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | optional return result ```js function (result) { // result is target adapter specific and can vary from command to command if (!result) adapter.log.error('No response received'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7254](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7254)

▸ **sendToHost**(`hostName`, `command`, `message`, `callback?`): `void`

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | ``null`` \| `string` | name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts. |
| `command` | `string` | command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage) |
| `message` | `any` | object that will be given as argument for request |
| `callback?` | [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](../interfaces/internal_.MessageCallbackInfo.md) | optional return result ```js function (result) { // result is target adapter specific and can vary from command to command if (!result) adapter.log.error('No response received'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7259](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7259)

___

### sendToHostAsync

▸ **sendToHostAsync**(`hostName`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

Sends a message to a specific host or all hosts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostName` | `string` |
| `message` | `any` |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:398](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L398)

▸ **sendToHostAsync**(`hostName`, `command`, `message`): `Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostName` | `string` |
| `command` | `string` |
| `message` | `any` |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/internal_.Message.md)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:399](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L399)

___

### sendToUI

▸ **sendToUI**(`options`): `Promise`<`void`\>

Send a message to an active UI Client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SendToUserInterfaceClientOptions`](../interfaces/internal_.SendToUserInterfaceClientOptions.md) | clientId and data options |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7395](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7395)

___

### setBinaryState

▸ **setBinaryState**(`id`, `binary`, `callback`): `void`

Same as setForeignBinaryState but prefixes the own namespace to the id

**`Deprecated`**

Please use `writeFile` instead of binary states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10181](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10181)

▸ **setBinaryState**(`id`, `binary`, `options`, `callback`): `void`

Same as setForeignBinaryState but prefixes the own namespace to the id

**`Deprecated`**

Please use `writeFile` instead of binary states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `options` | `unknown` | optional |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10182](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10182)

___

### setBinaryStateAsync

▸ **setBinaryStateAsync**(`id`, `binary`, `options?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Despite the naming convention, this method doesn't prepend the adapter namespace. Use setForeignBinaryStateAsync instead.
Writes a binary state into Redis

**`Deprecated`**

Please use `writeFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | `Buffer` |
| `options?` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:291](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L291)

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

[adapter/src/lib/adapter/adapter.ts:146](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L146)

___

### setForeignBinaryState

▸ **setForeignBinaryState**(`id`, `binary`, `callback`): `void`

Write binary block into redis, e.g. image

**`Deprecated`**

Please use `writeFile` instead of binary states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10030](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10030)

▸ **setForeignBinaryState**(`id`, `binary`, `options`, `callback`): `void`

Write binary block into redis, e.g. image

**`Deprecated`**

Please use `writeFile` instead of binary states

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `options` | `unknown` | optional |
| `callback` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10031](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L10031)

___

### setForeignBinaryStateAsync

▸ **setForeignBinaryStateAsync**(`id`, `binary`, `options?`): [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Writes a binary state into Redis. The ID will not be prefixed with the adapter namespace.

**`Deprecated`**

Please use `writeFile` instead of binary states

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `binary` | `Buffer` |
| `options?` | `unknown` |

#### Returns

[`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:283](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L283)

___

### setForeignObject

▸ **setForeignObject**<`T`\>(`id`, `obj`, `callback?`): `void`

Same as [setObject](AdapterClass.md#setobject), but for any object.

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
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3254](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3254)

▸ **setForeignObject**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

Same as [setObject](AdapterClass.md#setobject), but for any object.

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
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3259](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L3259)

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

[adapter/src/lib/adapter/adapter.ts:338](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L338)

___

### setForeignObjectNotExists

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `callback?`): `void`

Same as [setForeignObject](AdapterClass.md#setforeignobject), but with check if the object exists.

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
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4929](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4929)

▸ **setForeignObjectNotExists**<`T`\>(`id`, `obj`, `options`, `callback?`): `void`

Same as [setForeignObject](AdapterClass.md#setforeignobject), but with check if the object exists.

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
| `options` | `unknown` | user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4934](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4934)

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

[adapter/src/lib/adapter/adapter.ts:198](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L198)

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
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object, so the ack will be ignored and must be included into object. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8252](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8252)

▸ **setForeignState**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object, so the ack will be ignored and must be included into object. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8257](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8257)

▸ **setForeignState**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object, so the ack will be ignored and must be included into object. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8263](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8263)

▸ **setForeignState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object, so the ack will be ignored and must be included into object. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8269](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8269)

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

[adapter/src/lib/adapter/adapter.ts:445](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L445)

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

[adapter/src/lib/adapter/adapter.ts:450](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L450)

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

[adapter/src/lib/adapter/adapter.ts:455](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L455)

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
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object and ack exists too as function argument, function argument has priority. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8563](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8563)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object and ack exists too as function argument, function argument has priority. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8568](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8568)

▸ **setForeignStateChanged**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object and ack exists too as function argument, function argument has priority. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8574](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8574)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object and ack exists too as function argument, function argument has priority. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8580](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8580)

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

[adapter/src/lib/adapter/adapter.ts:358](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L358)

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

[adapter/src/lib/adapter/adapter.ts:363](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L363)

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

[adapter/src/lib/adapter/adapter.ts:368](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L368)

___

### setInterval

▸ **setInterval**(`cb`, `timeout`, `...args`): `undefined` \| [`Interval`](../modules/internal_.md#interval)

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

`undefined` \| [`Interval`](../modules/internal_.md#interval)

interval interval object

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2634](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2634)

___

### setObject

▸ **setObject**(`id`, `obj`, `callback?`): `Promise`<`void`\>

Creates or overwrites object in objectDB.

This function can create or overwrite objects in objectDB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
<b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory, and it will be checked.
Additionally, type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
```js
{
    common: {
         name: 'object name',
         type: 'number', // string, boolean, object, mixed, array
         role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
    },
    native: {},
    type: 'state' // channel, device
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| `Omit`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.host.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}.${number}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.user.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.group.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChartObject`](../interfaces/internal_.ChartObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScheduleObject`](../interfaces/internal_.ScheduleObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`DesignObject`](../interfaces/internal_.DesignObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`\_design/${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2687](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2687)

▸ **setObject**(`id`, `obj`, `options`, `callback?`): `Promise`<`void`\>

Creates or overwrites object in objectDB.

This function can create or overwrite objects in objectDB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
<b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory, and it will be checked.
Additionally, type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
```js
{
    common: {
         name: 'object name',
         type: 'number', // string, boolean, object, mixed, array
         role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
    },
    native: {},
    type: 'state' // channel, device
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| `Omit`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.host.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}.${number}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.user.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.group.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChartObject`](../interfaces/internal_.ChartObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScheduleObject`](../interfaces/internal_.ScheduleObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`DesignObject`](../interfaces/internal_.DesignObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`\_design/${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2688](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2688)

▸ **setObject**(`id`, `obj`, `callback?`): `Promise`<`void`\>

Creates or overwrites object in objectDB.

This function can create or overwrite objects in objectDB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
<b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory, and it will be checked.
Additionally, type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
```js
{
    common: {
         name: 'object name',
         type: 'number', // string, boolean, object, mixed, array
         role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
    },
    native: {},
    type: 'state' // channel, device
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| `Omit`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.host.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}.${number}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.user.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.group.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChartObject`](../interfaces/internal_.ChartObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScheduleObject`](../interfaces/internal_.ScheduleObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`DesignObject`](../interfaces/internal_.DesignObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`\_design/${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2694](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2694)

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates or overwrites an object in the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| `Omit`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.host.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}.${number}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.user.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.group.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChartObject`](../interfaces/internal_.ChartObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScheduleObject`](../interfaces/internal_.ScheduleObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`DesignObject`](../interfaces/internal_.DesignObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`\_design/${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L336)

___

### setObjectNotExists

▸ **setObjectNotExists**(`id`, `obj`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

Same as [setObject](AdapterClass.md#setobject), but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| `Omit`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.host.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}.${number}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.user.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.group.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChartObject`](../interfaces/internal_.ChartObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScheduleObject`](../interfaces/internal_.ScheduleObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`DesignObject`](../interfaces/internal_.DesignObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`\_design/${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4829](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4829)

▸ **setObjectNotExists**(`id`, `obj`, `options`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

Same as [setObject](AdapterClass.md#setobject), but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| `Omit`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.host.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}.${number}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.user.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.group.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChartObject`](../interfaces/internal_.ChartObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScheduleObject`](../interfaces/internal_.ScheduleObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`DesignObject`](../interfaces/internal_.DesignObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`\_design/${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } | new object |
| `options` | `unknown` | optional user context |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | return result ```js function (err, obj) { // obj is {id: id} if (err) adapter.log.error('Cannot write object: ' + err); } ``` |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| { `id`: `string`  }\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4834](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4834)

___

### setObjectNotExistsAsync

▸ **setObjectNotExistsAsync**(`id`, `obj`, `options?`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Creates an object in the object db. Existing objects are not overwritten.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<[`StateObject`](../interfaces/internal_.StateObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`StateACL`](../interfaces/internal_.StateACL.md)  } \| `Omit`<[`DeviceObject`](../interfaces/internal_.DeviceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChannelObject`](../interfaces/internal_.ChannelObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`FolderObject`](../interfaces/internal_.FolderObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`MetaObject`](../interfaces/internal_.MetaObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`EnumObject`](../interfaces/internal_.EnumObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`HostObject`](../interfaces/internal_.HostObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.host.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`AdapterObject`](../interfaces/internal_.AdapterObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`InstanceObject`](../interfaces/internal_.InstanceObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.adapter.${string}.${number}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`UserObject`](../interfaces/internal_.UserObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.user.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`GroupObject`](../interfaces/internal_.GroupObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`system.group.${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScriptObject`](../interfaces/internal_.ScriptObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ChartObject`](../interfaces/internal_.ChartObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`ScheduleObject`](../interfaces/internal_.ScheduleObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`OtherObject`](../interfaces/internal_.OtherObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: `string` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } \| `Omit`<[`DesignObject`](../interfaces/internal_.DesignObject.md), ``"_id"`` \| ``"acl"``\> & { `_id?`: \`\_design/${string}\` ; `acl?`: [`ObjectACL`](../interfaces/internal_.ObjectACL.md)  } |
| `options?` | `unknown` |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:196](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L196)

___

### setPassword

▸ **setPassword**(`user`, `pw`, `options`, `callback?`): `Promise`<`void`\>

sets the user's password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `options` | `Record`<`string`, `any`\> | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot set password: ' + err); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1679](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1679)

▸ **setPassword**(`user`, `pw`, `callback?`): `Promise`<`void`\>

sets the user's password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) { if (err) adapter.log.error('Cannot set password: ' + err); } ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1686](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1686)

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

[adapter/src/lib/adapter/adapter.ts:326](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L326)

___

### setSession

▸ **setSession**(`id`, `ttl`, `data`, `callback?`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `ttl` | `number` |
| `data` | `Record`<`string`, `any`\> |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1308](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1308)

___

### setState

▸ **setState**<`T`\>(`id`, `state`, `callback?`): `T` extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) ? `void` : [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `undefined` \| [`SetStateCallback`](../modules/internal_.md#setstatecallback) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object and ack exists too as function argument, function argument has priority. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `callback?` | `T` | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`T` extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) ? `void` : [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7463](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7463)

▸ **setState**<`T`\>(`id`, `state`, `ack`, `callback?`): `T` extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) ? `void` : [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object and ack exists too as function argument, function argument has priority. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | `T` | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`T` extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) ? `void` : [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7468](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7468)

▸ **setState**<`T`\>(`id`, `state`, `options?`, `callback?`): `T` extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) ? `void` : [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object and ack exists too as function argument, function argument has priority. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `options?` | ``null`` \| `Partial`<[`GetUserGroupsOptions`](../interfaces/internal_.GetUserGroupsOptions.md)\> | optional user context |
| `callback?` | `T` | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`T` extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) ? `void` : [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7474](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7474)

▸ **setState**<`T`\>(`id`, `state`, `ack`, `options?`, `callback?`): `T` extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) ? `void` : [`SetStatePromise`](../modules/internal_.md#setstatepromise)

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | [`State`](../interfaces/internal_.State.md) \| [`SettableState`](../modules/internal_.md#settablestate) \| [`StateValue`](../modules/internal_.md#statevalue) | simple value or object with attribues. If state is object and ack exists too as function argument, function argument has priority. ```js { val: value, ack: true\|false, // default - false; is command(false) or status(true) ts: timestampMS, // default - now q: qualityAsNumber, // default - 0 (ok) from: origin, // default - this adapter c: comment, // default - empty expire: expireInSeconds // default - 0 lc: timestampMS // default - automatic calculation } ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options?` | ``null`` \| `Partial`<[`GetUserGroupsOptions`](../interfaces/internal_.GetUserGroupsOptions.md)\> | optional user context |
| `callback?` | `T` | optional return error and id ```js function (err, id) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); } ``` |

#### Returns

`T` extends [`SetStateCallback`](../modules/internal_.md#setstatecallback) ? `void` : [`SetStatePromise`](../modules/internal_.md#setstatepromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7480](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L7480)

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

[adapter/src/lib/adapter/adapter.ts:425](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L425)

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

[adapter/src/lib/adapter/adapter.ts:430](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L430)

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

[adapter/src/lib/adapter/adapter.ts:435](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L435)

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
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error, id and notChanged ```js function (err, id, notChanged) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); if (!notChanged) adapter.log.debug('Value was changed'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8109](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8109)

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
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error, id and notChanged ```js function (err, id, notChanged) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); if (!notChanged) adapter.log.debug('Value was changed'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8114](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8114)

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
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error, id and notChanged ```js function (err, id, notChanged) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); if (!notChanged) adapter.log.debug('Value was changed'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8120](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8120)

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
| `callback?` | [`SetStateChangedCallback`](../modules/internal_.md#setstatechangedcallback) | optional return error, id and notChanged ```js function (err, id, notChanged) { if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err); if (!notChanged) adapter.log.debug('Value was changed'); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:8126](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L8126)

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

[adapter/src/lib/adapter/adapter.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L378)

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

[adapter/src/lib/adapter/adapter.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L383)

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

[adapter/src/lib/adapter/adapter.ts:388](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L388)

___

### setTimeout

▸ **setTimeout**(`cb`, `timeout`, `...args`): `undefined` \| [`Timeout`](../modules/internal_.md#timeout)

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

`undefined` \| [`Timeout`](../modules/internal_.md#timeout)

timer id

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2547](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2547)

___

### subscribeForeignFiles

▸ **subscribeForeignFiles**(`id`, `pattern`, `options?`): `void`

Subscribe for the changes of files in specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | adapter ID like 'vis-2.0' or 'vis-2.admin' |
| `pattern` | `string` \| `string`[] | pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns |
| `options?` | `unknown` | optional user context |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4772](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4772)

___

### subscribeForeignObjects

▸ **subscribeForeignObjects**(`pattern`, `callback?`): `void`

Subscribe for the changes of objects in any instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result ```js function (err) { if (err) adapter.log.error('Cannot subscribe object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4693](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4693)

▸ **subscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of objects in any instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result ```js function (err) { if (err) adapter.log.error('Cannot subscribe object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4694](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4694)

___

### subscribeForeignObjectsAsync

▸ **subscribeForeignObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe to changes of objects (which might not belong to this adapter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:192](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L192)

___

### subscribeForeignStates

▸ **subscribeForeignStates**(`pattern`, `callback?`): `void`

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
```js
    adapter.subscribeForeignStates('adapterName.X.*');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*' or like this. It can be an array of IDs too. |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```function (err) {}``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9571](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9571)

▸ **subscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
```js
    adapter.subscribeForeignStates('adapterName.X.*');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*' or like this. It can be an array of IDs too. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```function (err) {}``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9572](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9572)

___

### subscribeForeignStatesAsync

▸ **subscribeForeignStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe to changes of states (which might not belong to this adapter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:271](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L271)

___

### subscribeObjects

▸ **subscribeObjects**(`pattern`, `callback?`): `void`

Subscribe for the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result ```js function (err) { if (err) adapter.log.error('Cannot subscribe object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4608](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4608)

▸ **subscribeObjects**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result ```js function (err) { if (err) adapter.log.error('Cannot subscribe object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4609](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4609)

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

[adapter/src/lib/adapter/adapter.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L186)

___

### subscribeStates

▸ **subscribeStates**(`pattern`, `callback?`): `void`

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*' or like this. Only string allowed |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9960](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9960)

▸ **subscribeStates**(`pattern`, `options`, `callback?`): `void`

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*' or like this. Only string allowed |
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9961](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9961)

___

### subscribeStatesAsync

▸ **subscribeStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe to changes of states in this instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:275](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L275)

___

### supportsFeature

▸ **supportsFeature**(`featureName`): `boolean`

Method to check for available Features for adapter development

Use it like ...
```js
    if (adapter.supportsFeature && adapter.supportsFeature('ALIAS')) {
        ...
    }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `featureName` | ``"ALIAS"`` \| ``"ALIAS_SEPARATE_READ_WRITE_ID"`` \| ``"ADAPTER_GETPORT_BIND"`` \| ``"ADAPTER_DEL_OBJECT_RECURSIVE"`` \| ``"ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE"`` \| ``"ADAPTER_AUTO_DECRYPT_NATIVE"`` \| ``"PLUGINS"`` \| ``"CONTROLLER_NPM_AUTO_REBUILD"`` \| ``"CONTROLLER_READWRITE_BASE_SETTINGS"`` \| ``"CONTROLLER_MULTI_REPO"`` \| ``"CONTROLLER_LICENSE_MANAGER"`` \| ``"DEL_INSTANCE_CUSTOM"`` \| ``"BINARY_STATE_EVENT"`` \| ``"CUSTOM_FULL_VIEW"`` \| ``"ADAPTER_GET_OBJECTS_BY_ARRAY"`` \| ``"CONTROLLER_UI_UPGRADE"`` \| ``"ADAPTER_WEBSERVER_UPGRADE"`` | the name of the feature to check |

#### Returns

`boolean`

true/false if the feature is in the list of supported features

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1519](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1519)

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

[adapter/src/lib/adapter/adapter.ts:1370](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1370)

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

[adapter/src/lib/adapter/adapter.ts:1371](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L1371)

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

[adapter/src/lib/adapter/adapter.ts:6611](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6611)

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

[adapter/src/lib/adapter/adapter.ts:6612](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6612)

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

[adapter/src/lib/adapter/adapter.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L249)

___

### unsubscribeForeignFiles

▸ **unsubscribeForeignFiles**(`id`, `pattern`, `options?`): `void`

Unsubscribe for the changes of files on specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | adapter ID like 'vis-2.0' or 'vis-2.admin' |
| `pattern` | `string` \| `string`[] | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options?` | `unknown` | optional user context |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4799](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4799)

___

### unsubscribeForeignObjects

▸ **unsubscribeForeignObjects**(`pattern`, `callback?`): `void`

Unsubscribe for the patterns on all objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result ```js function (err) { if (err) adapter.log.error('Cannot unsubscribe object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4731](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4731)

▸ **unsubscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for the patterns on all objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result ```js function (err) { if (err) adapter.log.error('Cannot unsubscribe object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4732](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4732)

___

### unsubscribeForeignObjectsAsync

▸ **unsubscribeForeignObjectsAsync**(`pattern`, `options?`): `Promise`<`void`\>

Unsubscribe from changes of objects (which might not belong to this adapter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:194](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L194)

___

### unsubscribeForeignStates

▸ **unsubscribeForeignStates**(`pattern`, `callback?`): `void`

Unsubscribe for changes for given pattern

This function allows to unsubscribe from changes. The pattern must be equal to requested one.
```js
    adapter.subscribeForeignStates('adapterName.X.*');
    adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
    adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) {} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9810](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9810)

▸ **unsubscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for changes for given pattern

This function allows to unsubscribe from changes. The pattern must be equal to requested one.
```js
    adapter.subscribeForeignStates('adapterName.X.*');
    adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
    adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `options` | `unknown` | - |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | return result ```js function (err) {} ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9811](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9811)

___

### unsubscribeForeignStatesAsync

▸ **unsubscribeForeignStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe from changes of states (which might not belong to this adapter)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` \| `string`[] |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L273)

___

### unsubscribeObjects

▸ **unsubscribeObjects**(`pattern`, `callback?`): `void`

Unsubscribe on the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result ```js function (err) { if (err) adapter.log.error('Cannot unsubscribe object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4650](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4650)

▸ **unsubscribeObjects**(`pattern`, `options`, `callback?`): `void`

Unsubscribe on the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) | optional returns result ```js function (err) { if (err) adapter.log.error('Cannot unsubscribe object: ' + err); } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4651](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L4651)

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

[adapter/src/lib/adapter/adapter.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L188)

___

### unsubscribeStates

▸ **unsubscribeStates**(`pattern`, `callback?`): `void`

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

```js
    adapter.unsubscribeStates('abc*'); // This will not work
    adapter.unsubscribeStates('*');    // Valid unsubscribe
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9994](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9994)

▸ **unsubscribeStates**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

```js
    adapter.unsubscribeStates('abc*'); // This will not work
    adapter.unsubscribeStates('*');    // Valid unsubscribe
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | [`ErrorCallback`](../modules/internal_.md#errorcallback) |  |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9995](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L9995)

___

### unsubscribeStatesAsync

▸ **unsubscribeStatesAsync**(`pattern`, `options?`): `Promise`<`void`\>

Subscribe from changes of states in this instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | [`Pattern`](../modules/internal_.md#pattern) |
| `options?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:277](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L277)

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
| `newConfig` | `Record`<`string`, `any`\> | The new config values to be stored |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2423](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L2423)

___

### writeFile

▸ **writeFile**(`adapterName`, `path`, `data`, `callback`): `void`

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
```js
     adapter.writeFile('vis-2.0', '/main/vis-views.json', data, function (err) {
       err && adapter.log.error('Cannot write file: ' + err);
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| `Buffer` | data as UTF8 string or buffer depends on the file extension. |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) | return result ```js function (err) { } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6750](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6750)

▸ **writeFile**(`adapterName`, `path`, `data`, `options`, `callback`): `void`

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
```js
     adapter.writeFile('vis-2.0', '/main/vis-views.json', data, function (err) {
       err && adapter.log.error('Cannot write file: ' + err);
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| `Buffer` | data as UTF8 string or buffer depends on the file extension. |
| `options` | `unknown` | optional user context |
| `callback` | [`ErrnoCallback`](../modules/internal_.md#errnocallback) | return result ```js function (err) { } ``` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:6751](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L6751)

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

[adapter/src/lib/adapter/adapter.ts:256](https://github.com/ioBroker/ioBroker.js-controller/blob/af5992c0/packages/adapter/src/lib/adapter/adapter.ts#L256)
