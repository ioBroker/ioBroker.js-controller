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

[packages/adapter/src/lib/adapter/adapter.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L654)

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

[packages/adapter/src/lib/adapter/adapter.ts:5238](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5238)

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

[packages/adapter/src/lib/adapter/adapter.ts:5245](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5245)

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

[packages/adapter/src/lib/adapter/adapter.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L180)

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

[packages/adapter/src/lib/adapter/adapter.ts:5924](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5924)

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

[packages/adapter/src/lib/adapter/adapter.ts:5932](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5932)

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

[packages/adapter/src/lib/adapter/adapter.ts:197](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L197)

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
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) | object that describes the access rights like     ```js         // static information         var commandsPermissions = {            getObject:          {type: 'object',    operation: 'read'},            getObjects:         {type: 'object',    operation: 'list'},            getObjectView:      {type: 'object',    operation: 'list'},            setObject:          {type: 'object',    operation: 'write'},            subscribeObjects:   {type: 'object',    operation: 'read'},            unsubscribeObjects: {type: 'object',    operation: 'read'},            subscribeFiles:     {type: 'object',    operation: 'read'},            unsubscribeFiles:   {type: 'object',    operation: 'read'},             getStates:          {type: 'state',     operation: 'list'},            getState:           {type: 'state',     operation: 'read'},            setState:           {type: 'state',     operation: 'write'},            getStateHistory:    {type: 'state',     operation: 'read'},            subscribe:          {type: 'state',     operation: 'read'},            unsubscribe:        {type: 'state',     operation: 'read'},            getVersion:         {type: '',          operation: ''},             httpGet:            {type: 'other',     operation: 'http'},            sendTo:             {type: 'other',     operation: 'sendto'},            sendToHost:         {type: 'other',     operation: 'sendto'},             readFile:           {type: 'file',      operation: 'read'},            readFile64:         {type: 'file',      operation: 'read'},            writeFile:          {type: 'file',      operation: 'write'},            writeFile64:        {type: 'file',      operation: 'write'},            unlink:             {type: 'file',      operation: 'delete'},            rename:             {type: 'file',      operation: 'write'},            mkdir:              {type: 'file',      operation: 'write'},            readDir:            {type: 'file',      operation: 'list'},            chmodFile:          {type: 'file',      operation: 'write'},            chownFile:          {type: 'file',      operation: 'write'},             authEnabled:        {type: '',          operation: ''},            disconnect:         {type: '',          operation: ''},            listPermissions:    {type: '',          operation: ''},            getUserPermissions: {type: 'object',    operation: 'read'}         };        ``` |
| `options?` | `Record`<`string`, `any`\> | optional user context |
| `callback?` | [`CalculatePermissionsCallback`](../modules/internal_.md#calculatepermissionscallback) | return result        ```js            function (acl) {              // Access control object for admin looks like:              // {              //    file: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         create:     true,              //         list:       true              //     },              //     object: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         list:       true              //     },              //     state: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         create:     true,              //         list:       true              //     },              //     user: 'admin',              //     users:  {              //         read:       true,              //         write:      true,              //         create:     true,              //         'delete':   true,              //         list:       true              //     },              //     other: {              //         execute:    true,              //         http:       true,              //         sendto:     true              //     },              //     groups: ['administrator'] // can be more than one              // }            }        ``` |

#### Returns

`Promise`<`void` \| `PermissionSet`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1803](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1803)

▸ **calculatePermissions**(`user`, `commandsPermissions`, `callback?`): `Promise`<`void` \| `PermissionSet`\>

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) | object that describes the access rights like     ```js         // static information         var commandsPermissions = {            getObject:          {type: 'object',    operation: 'read'},            getObjects:         {type: 'object',    operation: 'list'},            getObjectView:      {type: 'object',    operation: 'list'},            setObject:          {type: 'object',    operation: 'write'},            subscribeObjects:   {type: 'object',    operation: 'read'},            unsubscribeObjects: {type: 'object',    operation: 'read'},            subscribeFiles:     {type: 'object',    operation: 'read'},            unsubscribeFiles:   {type: 'object',    operation: 'read'},             getStates:          {type: 'state',     operation: 'list'},            getState:           {type: 'state',     operation: 'read'},            setState:           {type: 'state',     operation: 'write'},            getStateHistory:    {type: 'state',     operation: 'read'},            subscribe:          {type: 'state',     operation: 'read'},            unsubscribe:        {type: 'state',     operation: 'read'},            getVersion:         {type: '',          operation: ''},             httpGet:            {type: 'other',     operation: 'http'},            sendTo:             {type: 'other',     operation: 'sendto'},            sendToHost:         {type: 'other',     operation: 'sendto'},             readFile:           {type: 'file',      operation: 'read'},            readFile64:         {type: 'file',      operation: 'read'},            writeFile:          {type: 'file',      operation: 'write'},            writeFile64:        {type: 'file',      operation: 'write'},            unlink:             {type: 'file',      operation: 'delete'},            rename:             {type: 'file',      operation: 'write'},            mkdir:              {type: 'file',      operation: 'write'},            readDir:            {type: 'file',      operation: 'list'},            chmodFile:          {type: 'file',      operation: 'write'},            chownFile:          {type: 'file',      operation: 'write'},             authEnabled:        {type: '',          operation: ''},            disconnect:         {type: '',          operation: ''},            listPermissions:    {type: '',          operation: ''},            getUserPermissions: {type: 'object',    operation: 'read'}         };        ``` |
| `callback?` | [`CalculatePermissionsCallback`](../modules/internal_.md#calculatepermissionscallback) | return result        ```js            function (acl) {              // Access control object for admin looks like:              // {              //    file: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         create:     true,              //         list:       true              //     },              //     object: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         list:       true              //     },              //     state: {              //         read:       true,              //         write:      true,              //         'delete':   true,              //         create:     true,              //         list:       true              //     },              //     user: 'admin',              //     users:  {              //         read:       true,              //         write:      true,              //         create:     true,              //         'delete':   true,              //         list:       true              //     },              //     other: {              //         execute:    true,              //         http:       true,              //         sendto:     true              //     },              //     groups: ['administrator'] // can be more than one              // }            }        ``` |

#### Returns

`Promise`<`void` \| `PermissionSet`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1809](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1809)

___

### calculatePermissionsAsync

▸ **calculatePermissionsAsync**(`user`, `commandsPermissions`, `options?`): `Promise`<`PermissionSet`\>

<INTERNAL> Determines the users permissions

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `string` |
| `commandsPermissions` | [`CommandsPermissions`](../modules/internal_.md#commandspermissions) |
| `options?` | `unknown` |

#### Returns

`Promise`<`PermissionSet`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:287](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L287)

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
| `callback?` | [`CheckGroupCallback`](../modules/internal_.md#checkgroupcallback) | return result        ```js            function (result) {              if (result) adapter.log.debug('User exists and in the group');            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1719](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1719)

▸ **checkGroup**(`user`, `group`, `callback?`): `Promise`<`void`\>

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `group` | `string` | group name |
| `callback?` | [`CheckGroupCallback`](../modules/internal_.md#checkgroupcallback) | return result        ```js            function (result) {              if (result) adapter.log.debug('User exists and in the group');            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1720](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1720)

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

[packages/adapter/src/lib/adapter/adapter.ts:285](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L285)

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
| `callback` | [`CheckPasswordCallback`](../modules/internal_.md#checkpasswordcallback) | return result        ```js            function (result) {              if (result) adapter.log.debug('User is valid');            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1480](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1480)

▸ **checkPassword**(`user`, `pw`, `callback`): `Promise`<`void`\>

validates user and password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `callback` | [`CheckPasswordCallback`](../modules/internal_.md#checkpasswordcallback) | return result        ```js            function (result) {              if (result) adapter.log.debug('User is valid');            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1486](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1486)

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

[packages/adapter/src/lib/adapter/adapter.ts:281](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L281)

___

### chmodFile

▸ **chmodFile**(`adapter`, `path`, `options`, `callback`): `void`

Change file access rights

This function updates the file access rights
```js
     adapter.chmodFile('vis.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('New files: ' + JSON.stringify(processed));
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` | path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0". |
| `options` | `Record`<`string`, `any`\> \| { `mode`: `string` \| `number`  } | data with mode |
| `callback` | `ChownFileCallback` | return result        ```js            function (err, processedFiles) {                list of processed files with new groups            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6202](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6202)

▸ **chmodFile**(`adapter`, `path`, `callback`): `void`

Change file access rights

This function updates the file access rights
```js
     adapter.chmodFile('vis.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('New files: ' + JSON.stringify(processed));
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapter` | ``null`` \| `string` | - |
| `path` | `string` | path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0". |
| `callback` | `ChownFileCallback` | return result        ```js            function (err, processedFiles) {                list of processed files with new groups            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6209](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6209)

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

[packages/adapter/src/lib/adapter/adapter.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L213)

___

### chownFile

▸ **chownFile**(`_adapter`, `path`, `options`, `callback`): `void`

Change file owner

This function updates the file owner and ownerGroup
```js
     adapter.chownFile('vis.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('New files: ' + JSON.stringify(processed));
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` | adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken. |
| `path` | `string` | path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0". |
| `options` | `unknown` | data with owner and ownerGroup |
| `callback` | (`err?`: ``null`` \| `Error`, `processedFiles?`: `any`) => `void` | return result        ```js            function (err, processedFiles) {                list of processed files with new groups            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6249](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6249)

▸ **chownFile**(`_adapter`, `path`, `callback`): `void`

Change file owner

This function updates the file owner and ownerGroup
```js
     adapter.chownFile('vis.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('New files: ' + JSON.stringify(processed));
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_adapter` | `string` | adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken. |
| `path` | `string` | path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0". |
| `callback` | (`err?`: ``null`` \| `Error`, `processedFiles?`: `any`) => `void` | return result        ```js            function (err, processedFiles) {                list of processed files with new groups            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6256](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6256)

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

[packages/adapter/src/lib/adapter/adapter.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L219)

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

[packages/adapter/src/lib/adapter/adapter.ts:2531](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2531)

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

[packages/adapter/src/lib/adapter/adapter.ts:2454](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2454)

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

[packages/adapter/src/lib/adapter/adapter.ts:4879](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4879)

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

[packages/adapter/src/lib/adapter/adapter.ts:4880](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4880)

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

[packages/adapter/src/lib/adapter/adapter.ts:4886](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4886)

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

[packages/adapter/src/lib/adapter/adapter.ts:4893](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4893)

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

[packages/adapter/src/lib/adapter/adapter.ts:454](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L454)

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

[packages/adapter/src/lib/adapter/adapter.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L459)

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

[packages/adapter/src/lib/adapter/adapter.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L465)

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

[packages/adapter/src/lib/adapter/adapter.ts:4805](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4805)

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

[packages/adapter/src/lib/adapter/adapter.ts:4806](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4806)

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

[packages/adapter/src/lib/adapter/adapter.ts:4811](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4811)

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

[packages/adapter/src/lib/adapter/adapter.ts:4817](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4817)

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

[packages/adapter/src/lib/adapter/adapter.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L433)

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

[packages/adapter/src/lib/adapter/adapter.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L434)

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

[packages/adapter/src/lib/adapter/adapter.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L439)

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

[packages/adapter/src/lib/adapter/adapter.ts:4964](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4964)

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

[packages/adapter/src/lib/adapter/adapter.ts:4970](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4970)

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

[packages/adapter/src/lib/adapter/adapter.ts:4977](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4977)

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

[packages/adapter/src/lib/adapter/adapter.ts:4985](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4985)

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

[packages/adapter/src/lib/adapter/adapter.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L476)

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

[packages/adapter/src/lib/adapter/adapter.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L482)

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

[packages/adapter/src/lib/adapter/adapter.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L489)

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

[packages/adapter/src/lib/adapter/adapter.ts:1178](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1178)

▸ **decrypt**(`value`): `string`

Decrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | value to decrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1179](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1179)

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

[packages/adapter/src/lib/adapter/adapter.ts:10185](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10185)

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

[packages/adapter/src/lib/adapter/adapter.ts:10186](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10186)

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

[packages/adapter/src/lib/adapter/adapter.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L273)

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

[packages/adapter/src/lib/adapter/adapter.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L371)

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

[packages/adapter/src/lib/adapter/adapter.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L372)

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

[packages/adapter/src/lib/adapter/adapter.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L225)

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

[packages/adapter/src/lib/adapter/adapter.ts:10126](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10126)

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

[packages/adapter/src/lib/adapter/adapter.ts:10127](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10127)

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

[packages/adapter/src/lib/adapter/adapter.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L267)

___

### delForeignObject

▸ **delForeignObject**(`id`, `callback?`): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (with namespace) |
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4253](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4253)

▸ **delForeignObject**(`id`, `options`, `callback?`): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (with namespace) |
| `options` | `DelObjectOptions` | optional user context or `{ recursive: true }` to delete all underlying objects |
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4254](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4254)

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

[packages/adapter/src/lib/adapter/adapter.ts:158](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L158)

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
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8944](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8944)

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
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8945](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8945)

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

[packages/adapter/src/lib/adapter/adapter.ts:239](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L239)

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
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4193](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4193)

▸ **delObject**(`id`, `options?`, `callback?`): `void`

Delete an object of this instance.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options?` | ``null`` \| `DelObjectOptions` | optional user context. E.g. recursive option could be true |
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4194](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4194)

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

[packages/adapter/src/lib/adapter/adapter.ts:156](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L156)

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
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8892](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8892)

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
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8893](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8893)

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

[packages/adapter/src/lib/adapter/adapter.ts:237](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L237)

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

[packages/adapter/src/lib/adapter/adapter.ts:2469](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2469)

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
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5486](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5486)

▸ **deleteChannel**(`channelName`, `options?`, `callback?`): `void`

Deletes channel and udnerlying structure

**`Alais`**

deleteChannel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` | is the part of ID like: adapter.instance.<deviceName>.<channelName> |
| `options?` | `unknown` | - |
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5487](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5487)

▸ **deleteChannel**(`parentDevice`, `channelName`, `options?`, `callback?`): `void`

Deletes channel and udnerlying structure

**`Alais`**

deleteChannel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentDevice` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `channelName` | `string` | is the part of ID like: adapter.instance.<deviceName>.<channelName> |
| `options?` | `unknown` | - |
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5488](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5488)

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

[packages/adapter/src/lib/adapter/adapter.ts:501](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L501)

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

[packages/adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L502)

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

[packages/adapter/src/lib/adapter/adapter.ts:5371](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5371)

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

[packages/adapter/src/lib/adapter/adapter.ts:5377](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5377)

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

[packages/adapter/src/lib/adapter/adapter.ts:187](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L187)

___

### deleteDevice

▸ **deleteDevice**(`deviceName`, `callback?`): `void`

Delete device with all its channels and states.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5172](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5172)

▸ **deleteDevice**(`deviceName`, `options`, `callback?`): `void`

Delete device with all its channels and states.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceName` | `string` | is the part of ID like: adapter.instance.<deviceName> |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot delete device: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5173](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5173)

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

[packages/adapter/src/lib/adapter/adapter.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L179)

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

[packages/adapter/src/lib/adapter/adapter.ts:5594](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5594)

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

[packages/adapter/src/lib/adapter/adapter.ts:5595](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5595)

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

[packages/adapter/src/lib/adapter/adapter.ts:5596](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5596)

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

[packages/adapter/src/lib/adapter/adapter.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L507)

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

[packages/adapter/src/lib/adapter/adapter.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L508)

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

[packages/adapter/src/lib/adapter/adapter.ts:509](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L509)

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

[packages/adapter/src/lib/adapter/adapter.ts:6071](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6071)

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

[packages/adapter/src/lib/adapter/adapter.ts:6078](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6078)

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

[packages/adapter/src/lib/adapter/adapter.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L205)

___

### destroySession

▸ **destroySession**(`id`, `callback?`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback?` | `ErrorCallback` |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1263](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1263)

___

### disable

▸ **disable**(): `SetObjectPromise`

Disables and stops the adapter instance.

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2347](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2347)

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

[packages/adapter/src/lib/adapter/adapter.ts:1198](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1198)

▸ **encrypt**(`value`): `string`

Encrypt the password/value with given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | value to encrypt (if secret is provided) |

#### Returns

`string`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1199](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1199)

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
| `objPart` | `PartialObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | - |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {                // obj is {"id": id}                if (err) adapter.log.error(err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3224](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3224)

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
| `objPart` | `PartialObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | - |
| `options` | `ExtendObjectOptions` | optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {                // obj is {"id": id}                if (err) adapter.log.error(err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3229](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3229)

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

[packages/adapter/src/lib/adapter/adapter.ts:128](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L128)

___

### extendObject

▸ **extendObject**(`id`, `objPart`, `callback?`): `void`

Extend some object and create it if it does not exist

You can change or extend some object. E.g existing object is:
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
| `objPart` | `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` | - |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {                if (err) adapter.log.error(err);                // obj is {"id": id}            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2847](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2847)

▸ **extendObject**(`id`, `objPart`, `options`, `callback?`): `void`

Extend some object and create it if it does not exist

You can change or extend some object. E.g existing object is:
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
| `objPart` | `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` | - |
| `options` | `ExtendObjectOptions` | optional user context |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {                if (err) adapter.log.error(err);                // obj is {"id": id}            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2848](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2848)

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `objPart`, `options?`): `SetObjectPromise`

Extend an object and create it if it might not exist

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `objPart` | `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object` |
| `options?` | `ExtendObjectOptions` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:114](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L114)

___

### fileExists

▸ **fileExists**(`adapterName`, `path`, `callback`): `void`

Checks if file exists in DB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `callback` | `GenericCallback`<`boolean`\> | cb function if none provided, a promise is returned |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6558](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6558)

▸ **fileExists**(`adapterName`, `path`, `options`, `callback`): `void`

Checks if file exists in DB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `options` | `unknown` | optional user context |
| `callback` | `GenericCallback`<`boolean`\> | cb function if none provided, a promise is returned |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6559](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6559)

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

[packages/adapter/src/lib/adapter/adapter.ts:232](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L232)

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
| `callback` | `FindObjectCallback` | return result        ```js            adapter.findForeignObject('Some name', function (err, id, name) {              if (err) adapter.log.error('Cannot get object: ' + err);              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4076](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4076)

▸ **findForeignObject**(`idOrName`, `type`, `options`, `callback`): `void`

Find any object by name or ID.

Find object by the exact name or ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrName` | `string` | - |
| `type` | `string` | optional common.type of state: 'number', 'string', 'boolean', 'file', ... |
| `options` | `unknown` | optional user context |
| `callback` | `FindObjectCallback` | return result        ```js            adapter.findForeignObject('Some name', function (err, id, name) {              if (err) adapter.log.error('Cannot get object: ' + err);              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4077](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4077)

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

[packages/adapter/src/lib/adapter/adapter.ts:449](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L449)

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

[packages/adapter/src/lib/adapter/adapter.ts:6641](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6641)

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

[packages/adapter/src/lib/adapter/adapter.ts:6642](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6642)

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

[packages/adapter/src/lib/adapter/adapter.ts:6606](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6606)

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

[packages/adapter/src/lib/adapter/adapter.ts:6607](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6607)

___

### getAdapterObjects

▸ **getAdapterObjects**(`callback`): `Promise`<`void` \| `Record`<`string`, `AdapterScopedObject`\>\>

Get all states, channels and devices of this adapter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`objects`: `Record`<`string`, `AdapterScopedObject`\>) => `void` | return result        ```js            function (objects) {                for (var id in objects) {                    adapter.log.debug(id);                }            }        ``` |

#### Returns

`Promise`<`void` \| `Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2765](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2765)

___

### getAdapterObjectsAsync

▸ **getAdapterObjectsAsync**(): `Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

Get all states, channels, devices and folders of this adapter

#### Returns

`Promise`<`Record`<`string`, `AdapterScopedObject`\>\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L303)

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

[packages/adapter/src/lib/adapter/adapter.ts:10109](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10109)

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

[packages/adapter/src/lib/adapter/adapter.ts:10110](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10110)

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

[packages/adapter/src/lib/adapter/adapter.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L265)

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
| `callback?` | [`GetCertificatesCallback`](../modules/internal_.md#getcertificatescallback) | return result        ```js            function (err, certs, letsEncrypt) {              adapter.log.debug('private key: ' + certs.key);              adapter.log.debug('public cert: ' + certs.cert);              adapter.log.debug('chained cert: ' + certs.ca);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2191](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2191)

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

[packages/adapter/src/lib/adapter/adapter.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L301)

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

[packages/adapter/src/lib/adapter/adapter.ts:521](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L521)

▸ **getChannels**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L522)

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

[packages/adapter/src/lib/adapter/adapter.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L523)

___

### getChannelsAsync

▸ **getChannelsAsync**(): `Promise`<`ChannelObject`[]\>

Returns a list of all channels in this adapter instance

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L533)

▸ **getChannelsAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L534)

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

[packages/adapter/src/lib/adapter/adapter.ts:5750](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5750)

▸ **getChannelsOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`ChannelObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5751](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5751)

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

[packages/adapter/src/lib/adapter/adapter.ts:5752](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5752)

___

### getChannelsOfAsync

▸ **getChannelsOfAsync**(): `Promise`<`ChannelObject`[]\>

Returns a list of all channels in this adapter instance

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:515](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L515)

▸ **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`<`ChannelObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `options?` | `unknown` |

#### Returns

`Promise`<`ChannelObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L516)

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

[packages/adapter/src/lib/adapter/adapter.ts:5696](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5696)

▸ **getDevices**(`options`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `unknown` |
| `callback` | `GetObjectsCallback3`<`DeviceObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5697](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5697)

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

[packages/adapter/src/lib/adapter/adapter.ts:195](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L195)

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

[packages/adapter/src/lib/adapter/adapter.ts:2364](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2364)

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
| `callback` | `GetEnumCallback` | return result        ```js            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3643](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3643)

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
| `callback` | `GetEnumCallback` | return result        ```js            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3644](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3644)

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
| `callback` | `GetEnumCallback` | return result        ```js            function (err, enums, requestEnum) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              for (var e in enums) {                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));              }            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3645](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3645)

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

[packages/adapter/src/lib/adapter/adapter.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L152)

___

### getEnums

▸ **getEnums**(`callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `GetEnumsCallback` | return result        ```js            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3732](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3732)

▸ **getEnums**(`enumList`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `callback` | `GetEnumsCallback` | return result        ```js            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3733](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3733)

▸ **getEnums**(`enumList`, `options`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumList` | `EnumList` | - |
| `options` | `unknown` | optional user context |
| `callback` | `GetEnumsCallback` | return result        ```js            function (err, enums) {              // requestEnum is _enum              if (err) adapter.log.error('Cannot get object: ' + err);              // Result is like              // {              //    "enum.rooms": {              //       "enum.rooms.livingroom": {              //           common: {              //              members: ['ID1', 'ID2']              //           }              //       },              //       "enum.rooms.sleepingroom": {              //           common: {              //              members: ['ID3', 'ID4']              //           }              //       }              //    },              //    "enum.functions": {              //       "enum.rooms.light": {              //           common: {              //              members: ['ID1', 'ID6']              //           }              //       },              //       "enum.rooms.weather": {              //           common: {              //              members: ['ID4', 'ID7']              //           }              //       }              //    }              // }            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3734](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3734)

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

[packages/adapter/src/lib/adapter/adapter.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L154)

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

[packages/adapter/src/lib/adapter/adapter.ts:10035](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10035)

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

[packages/adapter/src/lib/adapter/adapter.ts:10036](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10036)

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

[packages/adapter/src/lib/adapter/adapter.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L260)

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
| `callback` | `GetObjectCallback`<`T`\> | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4130](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4130)

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
| `callback` | `GetObjectCallback`<`T`\> | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4131](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4131)

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

[packages/adapter/src/lib/adapter/adapter.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L306)

___

### getForeignObjects

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
| `pattern` | `string` | object ID/wildchars |
| `callback` | `GetObjectsCallback` | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3879](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3879)

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
| `pattern` | `string` | object ID/wildchars |
| `options` | `unknown` | optional user context |
| `callback` | `GetObjectsCallback` | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3880](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3880)

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
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `callback` | `GetObjectsCallbackTyped`<`T`\> | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3881](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3881)

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
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `enums` | `EnumList` | object ID, that must be overwritten or created. |
| `callback` | `GetObjectsCallbackTyped`<`T`\> | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3886](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3886)

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
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `options` | `unknown` | optional user context |
| `callback` | `GetObjectsCallbackTyped`<`T`\> | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3892](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3892)

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
| `T` | extends `ObjectType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | object ID/wildchars |
| `type` | `T` | type of object: 'state', 'channel' or 'device'. Default - 'state' |
| `enums` | ``null`` \| `EnumList` | object ID, that must be overwritten or created. |
| `options` | `unknown` | optional user context |
| `callback` | `GetObjectsCallbackTyped`<`T`\> | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3898](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3898)

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

[packages/adapter/src/lib/adapter/adapter.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L417)

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

[packages/adapter/src/lib/adapter/adapter.ts:423](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L423)

▸ **getForeignObjectsAsync**(`pattern`, `options?`): `GetObjectsPromise`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `string` |
| `options?` | `unknown` |

#### Returns

`GetObjectsPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L428)

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
| `callback` | `GetStateCallback` | return result        ```js            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        ```         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8486](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8486)

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
| `callback` | `GetStateCallback` | return result        ```js            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        ```         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8487](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8487)

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

[packages/adapter/src/lib/adapter/adapter.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L279)

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
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `callback` | `GetStatesCallback` | return result ```js function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9134](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9134)

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
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback` | `GetStatesCallback` | return result ```js function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9135](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9135)

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

[packages/adapter/src/lib/adapter/adapter.ts:243](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L243)

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
| `options` | `GetHistoryOptions` | see function description |
| `callback` | `GetHistoryCallback` | return result        ```js            function (error, result, step, sessionId) {              if (error) adapter.log.error('Cannot read value: ' + err);            }        ```         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8765](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8765)

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
| `callback` | `GetHistoryCallback` | return result        ```js            function (error, result, step, sessionId) {              if (error) adapter.log.error('Cannot read value: ' + err);            }        ```         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8766](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8766)

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

[packages/adapter/src/lib/adapter/adapter.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L235)

___

### getObject

▸ **getObject**(`id`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `callback` | `GetObjectCallback`<`string`\> | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3428](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3428)

▸ **getObject**(`id`, `options`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | exactly object ID (without namespace) |
| `options` | `unknown` | optional user context |
| `callback` | `GetObjectCallback`<`string`\> | return result        ```js            function (err, obj) {              if (err) adapter.log.error('Cannot get object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3429](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3429)

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

[packages/adapter/src/lib/adapter/adapter.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L134)

___

### getObjectList

▸ **getObjectList**(`params`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| `GetObjectViewParams` |  |
| `callback` | `GetObjectListCallback` | ```js          function (err, res) {              if (res && res.rows) {                   for (var i = 0; i < res.rows.length; i++) {                       var id  = res.rows[i].id;                       var obj = res.rows[i].value;                       console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                   if (!res.rows.length) console.log('No objects found.');              } else {                  console.log('No objects found: ' + err);              }          }       ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3587](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3587)

▸ **getObjectList**(`params`, `options`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | ``null`` \| `GetObjectViewParams` |  |
| `options` | `Record`<`string`, `any`\> \| { `sorted?`: `boolean`  } |  |
| `callback` | `GetObjectListCallback` | ```js          function (err, res) {              if (res && res.rows) {                   for (var i = 0; i < res.rows.length; i++) {                       var id  = res.rows[i].id;                       var obj = res.rows[i].value;                       console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                   if (!res.rows.length) console.log('No objects found.');              } else {                  console.log('No objects found: ' + err);              }          }       ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3588](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3588)

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

[packages/adapter/src/lib/adapter/adapter.ts:147](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L147)

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
| `params` | `undefined` \| ``null`` \| `GetObjectViewParams` | object containing startkey: first id to include in result; endkey: last id to include in result |
| `callback` | `GetObjectViewCallback`<`InferGetObjectViewItemType`<`Design`, `Search`\>\> | return result      ```js          function (err, doc) {              if (doc && doc.rows) {                   for (var i = 0; i < doc.rows.length; i++) {                       var id  = doc.rows[i].id;                        var obj = doc.rows[i].value;                        console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                           if (!doc.rows.length) console.log('No objects found.');               } else {                   console.log('No objects found: ' + err);               }           }           ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3471](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3471)

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
| `params` | `undefined` \| ``null`` \| `GetObjectViewParams` | object containing startkey: first id to include in result; endkey: last id to include in result |
| `options` | `unknown` |  |
| `callback` | `GetObjectViewCallback`<`InferGetObjectViewItemType`<`Design`, `Search`\>\> | return result      ```js          function (err, doc) {              if (doc && doc.rows) {                   for (var i = 0; i < doc.rows.length; i++) {                       var id  = doc.rows[i].id;                        var obj = doc.rows[i].value;                        console.log('Found ' + id + ': ' + JSON.stringify(obj));                   }                           if (!doc.rows.length) console.log('No objects found.');               } else {                   console.log('No objects found: ' + err);               }           }           ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3477](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3477)

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

[packages/adapter/src/lib/adapter/adapter.ts:140](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L140)

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

[packages/adapter/src/lib/adapter/adapter.ts:10221](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10221)

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

[packages/adapter/src/lib/adapter/adapter.ts:10203](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10203)

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
| `callback?` | (`port`: `number`) => `void` | return result        ```jsfunction (port) {}``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1392](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1392)

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
| `callback?` | (`port`: `number`) => `void` | return result        ```jsfunction (port) {}``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1393](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1393)

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

[packages/adapter/src/lib/adapter/adapter.ts:277](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L277)

___

### getSession

▸ **getSession**(`id`, `callback`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback` | `GetSessionCallback` |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1219](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1219)

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
| `callback` | `GetStateCallback` | return result        ```js            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        ```         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8455](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8455)

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
| `callback` | `GetStateCallback` | return result        ```js            function (err, state) {              if (err) adapter.log.error('Cannot read value: ' + err);            }        ```         See possible attributes of the state in |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8456](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8456)

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

[packages/adapter/src/lib/adapter/adapter.ts:164](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L164)

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
| `pattern` | `string` | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `callback` | `GetStatesCallback` | return result ```js function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9006](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9006)

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
| `pattern` | `string` | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback` | `GetStatesCallback` | return result ```js function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...} ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9007](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9007)

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

[packages/adapter/src/lib/adapter/adapter.ts:241](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L241)

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

[packages/adapter/src/lib/adapter/adapter.ts:5819](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5819)

▸ **getStatesOf**(`parentDevice`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `callback` | `GetObjectsCallback3`<`StateObject`\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:5820](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5820)

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

[packages/adapter/src/lib/adapter/adapter.ts:5821](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5821)

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

[packages/adapter/src/lib/adapter/adapter.ts:5826](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L5826)

___

### getStatesOfAsync

▸ **getStatesOfAsync**(): `Promise`<`StateObject`[]\>

Returns a list of all states in this adapter instance

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:541](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L541)

▸ **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`<`StateObject`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentDevice` | `string` |
| `parentChannel?` | `string` |

#### Returns

`Promise`<`StateObject`[]\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L542)

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

[packages/adapter/src/lib/adapter/adapter.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L543)

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

[packages/adapter/src/lib/adapter/adapter.ts:10267](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10267)

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

[packages/adapter/src/lib/adapter/adapter.ts:1582](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1582)

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

[packages/adapter/src/lib/adapter/adapter.ts:8857](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8857)

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

[packages/adapter/src/lib/adapter/adapter.ts:6423](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6423)

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

[packages/adapter/src/lib/adapter/adapter.ts:6424](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6424)

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

[packages/adapter/src/lib/adapter/adapter.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L227)

___

### readDir

▸ **readDir**(`adapterName`, `path`, `callback`): `void`

Read directory from DB.

This function reads the content of directory from DB for given adapter and path.
If getEnum called with no enum specified, all enums will be returned:
```js
     adapter.readDir('vis.0', '/main/', function (err, filesOrDirs) {
       // All enums
       if (err) adapter.log.error('Cannot read directory: ' + err);
       if (filesOrDirs) {
          for (var f = 0; f < filesOrDirs.length; f++) {
             adapter.log.debug('Directory main has following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
          }
      }
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | path to direcory without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0". |
| `callback` | `ReadDirCallback` | return result        ```js            function (err, filesOrDirs) {                // filesOrDirs is array with elements like                // {                //      file:       'views.json,                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,                //      isDir:      true/false,                //      acl:        access control list object,                //      modifiedAt: time when modified,                //      createdAt:  time when created                // }            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6297](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6297)

▸ **readDir**(`adapterName`, `path`, `options`, `callback`): `void`

Read directory from DB.

This function reads the content of directory from DB for given adapter and path.
If getEnum called with no enum specified, all enums will be returned:
```js
     adapter.readDir('vis.0', '/main/', function (err, filesOrDirs) {
       // All enums
       if (err) adapter.log.error('Cannot read directory: ' + err);
       if (filesOrDirs) {
          for (var f = 0; f < filesOrDirs.length; f++) {
             adapter.log.debug('Directory main has following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
          }
      }
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | path to direcory without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0". |
| `options` | `unknown` | optional user context |
| `callback` | `ReadDirCallback` | return result        ```js            function (err, filesOrDirs) {                // filesOrDirs is array with elements like                // {                //      file:       'views.json,                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,                //      isDir:      true/false,                //      acl:        access control list object,                //      modifiedAt: time when modified,                //      createdAt:  time when created                // }            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6298](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6298)

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

[packages/adapter/src/lib/adapter/adapter.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L221)

___

### readFile

▸ **readFile**(`adapterName`, `path`, `callback`): `void`

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
```js
     adapter.readFile('vis.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('Content of file is: ' + data);
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `callback` | `ReadFileCallback` | return result        ```js            function (err, data) {                // data is utf8 or binary Buffer depends on the file extension.            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6449](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6449)

▸ **readFile**(`adapterName`, `path`, `options`, `callback`): `void`

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
```js
     adapter.readFile('vis.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       console.log('Content of file is: ' + data);
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `options` | `unknown` | optional user context |
| `callback` | `ReadFileCallback` | return result        ```js            function (err, data) {                // data is utf8 or binary Buffer depends on the file extension.            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6450](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6450)

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

[packages/adapter/src/lib/adapter/adapter.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L229)

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

[packages/adapter/src/lib/adapter/adapter.ts:7087](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7087)

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

[packages/adapter/src/lib/adapter/adapter.ts:6389](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6389)

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

[packages/adapter/src/lib/adapter/adapter.ts:6390](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6390)

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

[packages/adapter/src/lib/adapter/adapter.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L226)

___

### restart

▸ **restart**(): `void`

Restarts an instance of the adapter.

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2297](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2297)

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
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | optional return result        ```js            function (result) {              // result is target adapter specific and can vary from adapter to adapter              if (!result) adapter.log.error('No response received');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6795](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6795)

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
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | optional return result        ```js            function (result) {              // result is target adapter specific and can vary from adapter to adapter              if (!result) adapter.log.error('No response received');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6800](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6800)

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

[packages/adapter/src/lib/adapter/adapter.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L361)

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

[packages/adapter/src/lib/adapter/adapter.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L362)

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
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | optional return result        ```js            function (result) {              // result is target adapter specific and can vary from command to command              if (!result) adapter.log.error('No response received');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6954](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6954)

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
| `callback?` | `MessageCallback` \| `MessageCallbackInfo` | optional return result        ```js            function (result) {              // result is target adapter specific and can vary from command to command              if (!result) adapter.log.error('No response received');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6959](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6959)

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

[packages/adapter/src/lib/adapter/adapter.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L351)

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

[packages/adapter/src/lib/adapter/adapter.ts:352](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L352)

___

### setBinaryState

▸ **setBinaryState**(`id`, `binary`, `callback`): `void`

Same as setForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `callback` | `SetStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10016](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10016)

▸ **setBinaryState**(`id`, `binary`, `options`, `callback`): `void`

Same as setForeignBinaryState but prefixes the own namespace to the id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `options` | `unknown` | optional |
| `callback` | `SetStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:10017](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L10017)

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

[packages/adapter/src/lib/adapter/adapter.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L259)

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

[packages/adapter/src/lib/adapter/adapter.ts:120](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L120)

___

### setForeignBinaryState

▸ **setForeignBinaryState**(`id`, `binary`, `callback`): `void`

Write binary block into redis, e.g image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `callback` | `SetStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9875](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9875)

▸ **setForeignBinaryState**(`id`, `binary`, `options`, `callback`): `void`

Write binary block into redis, e.g image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | of state |
| `binary` | `Buffer` | data |
| `options` | `unknown` | optional |
| `callback` | `SetStateCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9876](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9876)

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

[packages/adapter/src/lib/adapter/adapter.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L253)

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
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | new object |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3117](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3117)

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
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | new object |
| `options` | `unknown` | optional user context |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:3122](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L3122)

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

[packages/adapter/src/lib/adapter/adapter.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L295)

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
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | new object |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4691](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4691)

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
| `obj` | `SettableObjectWorker`<`ObjectIdToObjectType`<`T`, ``"write"``\>\> | new object |
| `options` | `unknown` | user context |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4696](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4696)

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

[packages/adapter/src/lib/adapter/adapter.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L172)

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
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `callback?` | `SetStateCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8013](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8013)

▸ **setForeignState**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | `SetStateCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8018](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8018)

▸ **setForeignState**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `options` | `unknown` | optional user context |
| `callback?` | `SetStateCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8024](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8024)

▸ **setForeignState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object, so the ack will be ignored and must be included into object.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | `SetStateCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8030](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8030)

___

### setForeignStateAsync

▸ **setForeignStateAsync**(`id`, `state`, `ack?`): `SetStatePromise`

Writes a value (which might not belong to this adapter) into the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack?` | `boolean` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:397](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L397)

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

[packages/adapter/src/lib/adapter/adapter.ts:402](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L402)

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

[packages/adapter/src/lib/adapter/adapter.ts:407](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L407)

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
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `callback?` | `SetStateChangedCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8322](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8322)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | `SetStateChangedCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8327](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8327)

▸ **setForeignStateChanged**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `options` | `unknown` | optional user context |
| `callback?` | `SetStateChangedCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8333](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8333)

▸ **setForeignStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | `SetStateChangedCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:8339](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L8339)

___

### setForeignStateChangedAsync

▸ **setForeignStateChangedAsync**(`id`, `state`, `ack?`): `SetStateChangedPromise`

Writes a value (which might not belong to this adapter) into the states DB only if it has changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack?` | `boolean` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L311)

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

[packages/adapter/src/lib/adapter/adapter.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L316)

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

[packages/adapter/src/lib/adapter/adapter.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L321)

___

### setInterval

▸ **setInterval**(`cb`, `timeout`, ...`args`): `void` \| `Timeout`

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

`void` \| `Timeout`

interval interval object

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2497](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2497)

___

### setObject

▸ **setObject**(`id`, `obj`, `callback?`): `Promise`<`void`\>

Creates or overwrites object in objectDB.

This function can create or overwrite objects in objectDB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
<b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory and it will be checked.
Additionally type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
```js{
    common: {
         name: 'object name',
         type: 'number', // string, boolean, object, mixed, array
         role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
    },
    native: {},
    type: 'state' // channel, device
}```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules/internal_.md#id) | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & {} | new object |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2545](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2545)

▸ **setObject**(`id`, `obj`, `options`, `callback?`): `Promise`<`void`\>

Creates or overwrites object in objectDB.

This function can create or overwrite objects in objectDB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
<b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory and it will be checked.
Additionally type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
```js{
    common: {
         name: 'object name',
         type: 'number', // string, boolean, object, mixed, array
         role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
    },
    native: {},
    type: 'state' // channel, device
}```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules/internal_.md#id) | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & {} | new object |
| `options` | `unknown` | optional user context |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2546](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2546)

▸ **setObject**(`id`, `obj`, `callback?`): `Promise`<`void`\>

Creates or overwrites object in objectDB.

This function can create or overwrite objects in objectDB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
<b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory and it will be checked.
Additionally type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
```js{
    common: {
         name: 'object name',
         type: 'number', // string, boolean, object, mixed, array
         role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
    },
    native: {},
    type: 'state' // channel, device
}```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules/internal_.md#id) | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & {} | new object |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2552](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2552)

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`, `options?`): `SetObjectPromise`

Creates or overwrites an object in the object db

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & {} |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L293)

___

### setObjectNotExists

▸ **setObjectNotExists**(`id`, `obj`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| {}\>

Same as [setObject](AdapterClass.md#setobject), but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & {} | new object |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| {}\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4591](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4591)

▸ **setObjectNotExists**(`id`, `obj`, `options`, `callback?`): `void` \| `Promise`<`undefined` \| `void` \| {}\>

Same as [setObject](AdapterClass.md#setobject), but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID, that must be overwritten or created. |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & {} | new object |
| `options` | `unknown` | - |
| `callback?` | `SetObjectCallback` | return result        ```js            function (err, obj) {              // obj is {id: id}              if (err) adapter.log.error('Cannot write object: ' + err);            }        ``` |

#### Returns

`void` \| `Promise`<`undefined` \| `void` \| {}\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4596](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4596)

___

### setObjectNotExistsAsync

▸ **setObjectNotExistsAsync**(`id`, `obj`, `options?`): `SetObjectPromise`

Creates an object in the object db. Existing objects are not overwritten.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `obj` | `Omit`<`StateObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ChannelObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`DeviceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`FolderObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`EnumObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`MetaObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`HostObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`AdapterObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`InstanceObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`UserObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`GroupObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`ScriptObject`, ``"_id"`` \| ``"acl"``\> & {} \| `Omit`<`OtherObject`, ``"_id"`` \| ``"acl"``\> & {} |
| `options?` | `unknown` |

#### Returns

`SetObjectPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L170)

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
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot set password: ' + err);            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1613](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1613)

▸ **setPassword**(`user`, `pw`, `callback?`): `Promise`<`void`\>

sets the user's password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `string` | user name as text |
| `pw` | `string` | password as text |
| `callback?` | `ErrorCallback` | return result        ```js            function (err) {              if (err) adapter.log.error('Cannot set password: ' + err);            }        ``` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1620](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1620)

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

[packages/adapter/src/lib/adapter/adapter.ts:283](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L283)

___

### setSession

▸ **setSession**(`id`, `ttl`, `data`, `callback?`): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `ttl` | `number` |
| `data` | `Record`<`string`, `any`\> |
| `callback?` | `ErrorCallback` |

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1240](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1240)

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
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `callback?` | `SetStateCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7125](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7125)

▸ **setState**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | `SetStateCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7130](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7130)

▸ **setState**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `options` | `unknown` | optional user context |
| `callback?` | `SetStateCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7136](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7136)

▸ **setState**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`IdObject`](../interfaces/internal_.IdObject.md) | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues.  If state is object and ack exists too as function argument, function argument has priority.  ```js      {          val:    value,          ack:    true\|false,       // default - false; is command(false) or status(true)          ts:     timestampMS,      // default - now          q:      qualityAsNumber,  // default - 0 (ok)          from:   origin,           // default - this adapter          c:      comment,          // default - empty          expire: expireInSeconds   // default - 0          lc:     timestampMS       // default - automatic calculation      }  ``` |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | `SetStateCallback` | optional return error and id        ```js            function (err, id) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7142](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7142)

___

### setStateAsync

▸ **setStateAsync**(`id`, `state`, `ack?`): `SetStatePromise`

Writes a value into the states DB.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack?` | `boolean` |

#### Returns

`SetStatePromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L377)

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

[packages/adapter/src/lib/adapter/adapter.ts:382](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L382)

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

[packages/adapter/src/lib/adapter/adapter.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L387)

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
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues. |
| `callback?` | `SetStateChangedCallback` | optional return error, id and notChanged        ```js            function (err, id, notChanged) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);              if (!notChanged) adapter.log.debug('Value was changed');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7867](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7867)

▸ **setStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues. |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `callback?` | `SetStateChangedCallback` | optional return error, id and notChanged        ```js            function (err, id, notChanged) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);              if (!notChanged) adapter.log.debug('Value was changed');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7872](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7872)

▸ **setStateChanged**(`id`, `state`, `options`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues. |
| `options` | `unknown` | optional user context |
| `callback?` | `SetStateChangedCallback` | optional return error, id and notChanged        ```js            function (err, id, notChanged) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);              if (!notChanged) adapter.log.debug('Value was changed');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7878](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7878)

▸ **setStateChanged**(`id`, `state`, `ack`, `options`, `callback?`): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | object ID of the state. |
| `state` | `State` \| `SettableState` \| `StateValue` | simple value or object with attribues. |
| `ack` | `boolean` | optional is command(false) or status(true) |
| `options` | `unknown` | optional user context |
| `callback?` | `SetStateChangedCallback` | optional return error, id and notChanged        ```js            function (err, id, notChanged) {              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);              if (!notChanged) adapter.log.debug('Value was changed');            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:7884](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L7884)

___

### setStateChangedAsync

▸ **setStateChangedAsync**(`id`, `state`, `ack?`): `SetStateChangedPromise`

Writes a value into the states DB only if it has changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `State` \| `SettableState` \| `StateValue` |
| `ack?` | `boolean` |

#### Returns

`SetStateChangedPromise`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:331](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L331)

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

[packages/adapter/src/lib/adapter/adapter.ts:336](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L336)

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

[packages/adapter/src/lib/adapter/adapter.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L341)

___

### setTimeout

▸ **setTimeout**(`cb`, `timeout`, ...`args`): `void` \| `Timeout`

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

`void` \| `Timeout`

timer id

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:2415](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2415)

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

[packages/adapter/src/lib/adapter/adapter.ts:4532](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4532)

▸ **subscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of files in specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns |
| `options` | `unknown` | optional user context |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4533](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4533)

___

### subscribeForeignObjects

▸ **subscribeForeignObjects**(`pattern`, `callback?`): `void`

Subscribe for the changes of objects in any instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns |
| `callback?` | `ErrorCallback` | optional returns result        ```js            function (err) {              if (err) adapter.log.error('Cannot subscribe object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4453](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4453)

▸ **subscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of objects in any instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns |
| `options` | `unknown` | optional user context |
| `callback?` | `ErrorCallback` | optional returns result        ```js            function (err) {              if (err) adapter.log.error('Cannot subscribe object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4454](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4454)

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

[packages/adapter/src/lib/adapter/adapter.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L166)

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
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `callback?` | `ErrorCallback` | return result ```function (err) {}``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9400](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9400)

▸ **subscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
```js
    adapter.subscribeForeignStates('adapterName.X.*');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` \| `string`[] | string in form 'adapter.0.*' or like this. It can be array of IDs too. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | `ErrorCallback` | return result ```function (err) {}``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9401](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9401)

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

[packages/adapter/src/lib/adapter/adapter.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L245)

___

### subscribeObjects

▸ **subscribeObjects**(`pattern`, `callback?`): `void`

Subscribe for the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces |
| `callback?` | `ErrorCallback` | optional returns result        ```js            function (err) {              if (err) adapter.log.error('Cannot subscribe object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4366](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4366)

▸ **subscribeObjects**(`pattern`, `options`, `callback?`): `void`

Subscribe for the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | `ErrorCallback` | optional returns result        ```js            function (err) {              if (err) adapter.log.error('Cannot subscribe object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4367](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4367)

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

[packages/adapter/src/lib/adapter/adapter.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L160)

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
| `pattern` | `string` | string in form 'adapter.0.*' or like this. Only string allowed |
| `callback?` | `ErrorCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9789](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9789)

▸ **subscribeStates**(`pattern`, `options`, `callback?`): `void`

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*' or like this. Only string allowed |
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | `ErrorCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9790](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9790)

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

[packages/adapter/src/lib/adapter/adapter.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L249)

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
| `featureName` | `string` | the name of the feature to check |

#### Returns

`boolean`

true/false if the feature is in the list of supported features

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:1456](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1456)

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

[packages/adapter/src/lib/adapter/adapter.ts:1306](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1306)

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

[packages/adapter/src/lib/adapter/adapter.ts:1307](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L1307)

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

[packages/adapter/src/lib/adapter/adapter.ts:6361](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6361)

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

[packages/adapter/src/lib/adapter/adapter.ts:6362](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6362)

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

[packages/adapter/src/lib/adapter/adapter.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L223)

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

[packages/adapter/src/lib/adapter/adapter.ts:4560](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4560)

▸ **unsubscribeForeignFiles**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for the changes of files on specific instance.
This is async function!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | `ErrorCallback` | - |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4561](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4561)

___

### unsubscribeForeignObjects

▸ **unsubscribeForeignObjects**(`pattern`, `callback?`): `void`

Unsubscribe for the patterns on all objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | `ErrorCallback` | optional returns result        ```js            function (err) {              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4491](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4491)

▸ **unsubscribeForeignObjects**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for the patterns on all objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | `ErrorCallback` | optional returns result        ```js            function (err) {              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4492](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4492)

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

[packages/adapter/src/lib/adapter/adapter.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L168)

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
| `pattern` | `string` | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `callback?` | `ErrorCallback` | return result ```js function (err) {} ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9639](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9639)

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
| `pattern` | `string` | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `options` | `unknown` | - |
| `callback?` | `ErrorCallback` | return result ```js function (err) {} ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9640](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9640)

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

[packages/adapter/src/lib/adapter/adapter.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L247)

___

### unsubscribeObjects

▸ **unsubscribeObjects**(`pattern`, `callback?`): `void`

Unsubscribe on the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `callback?` | `ErrorCallback` | optional returns result        ```js            function (err) {              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4409](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4409)

▸ **unsubscribeObjects**(`pattern`, `options`, `callback?`): `void`

Unsubscribe on the changes of objects in this instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | pattern like 'channel.*' or '*' (all objects) - without namespaces |
| `options` | `unknown` | optional user context |
| `callback?` | `ErrorCallback` | optional returns result        ```js            function (err) {              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);            }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:4410](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L4410)

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

[packages/adapter/src/lib/adapter/adapter.ts:162](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L162)

___

### unsubscribeStates

▸ **unsubscribeStates**(`pattern`, `callback?`): `void`

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

```js
    adapter.subscribeForeignStates('*');
    adapter.unsubscribeForeignStates('abc*'); // This will not work
    adapter.unsubscribeForeignStates('*');    // Valid unsubscribe
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `callback?` | `ErrorCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9831](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9831)

▸ **unsubscribeStates**(`pattern`, `options`, `callback?`): `void`

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

```js
    adapter.subscribeForeignStates('*');
    adapter.unsubscribeForeignStates('abc*'); // This will not work
    adapter.unsubscribeForeignStates('*');    // Valid unsubscribe
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | string in form 'adapter.0.*'. Must be the same as subscribe. |
| `options` | `unknown` | optional argument to describe the user context |
| `callback?` | `ErrorCallback` |  |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:9832](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L9832)

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

[packages/adapter/src/lib/adapter/adapter.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L251)

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

[packages/adapter/src/lib/adapter/adapter.ts:2306](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L2306)

___

### writeFile

▸ **writeFile**(`adapterName`, `path`, `data`, `callback`): `void`

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
```js
     adapter.writeFile('vis.0', '/main/vis-views.json', data, function (err) {
       err && adapter.log.error('Cannot write file: ' + err);
     });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adapterName` | ``null`` \| `string` | - |
| `path` | `string` | - |
| `data` | `string` \| `Buffer` | data as UTF8 string or buffer depends on the file extension. |
| `callback` | `ErrnoCallback` | return result        ```js            function (err) {             }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6500](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6500)

▸ **writeFile**(`adapterName`, `path`, `data`, `options`, `callback`): `void`

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
```js
     adapter.writeFile('vis.0', '/main/vis-views.json', data, function (err) {
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
| `callback` | `ErrnoCallback` | return result        ```js            function (err) {             }        ``` |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/adapter/adapter.ts:6501](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L6501)

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

[packages/adapter/src/lib/adapter/adapter.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/7c11c7b9/packages/adapter/src/lib/adapter/adapter.ts#L230)
