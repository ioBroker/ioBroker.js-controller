[**@iobroker/js-controller-adapter**](../README.md)

***

[@iobroker/js-controller-adapter](../globals.md) / AdapterClass

# Class: AdapterClass

Defined in: [adapter/src/lib/adapter/adapter.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L153)

Adapter class

How the initialization happens:
 _initObjects => _initStates => _prepareInitAdapter => _initAdapter => _initLogging => _createInstancesObjects => ready

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new AdapterClass**(`options`): `AdapterClass`

Defined in: [adapter/src/lib/adapter/adapter.ts:1052](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1052)

#### Parameters

##### options

`string` \| [`AdapterOptions`](../-internal-/interfaces/AdapterOptions.md)

Adapter options, or the adapter name as a string

#### Returns

`AdapterClass`

## Properties

### adapterConfig?

> `optional` **adapterConfig?**: [`InstanceObject`](../-internal-/interfaces/InstanceObject.md) \| [`AdapterOptions`](../-internal-/interfaces/AdapterOptions.md) \| `null`

Defined in: [adapter/src/lib/adapter/adapter.ts:962](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L962)

contents of io-package.json

***

### adapterDir

> **adapterDir**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:964](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L964)

***

### adapterReady

> **adapterReady**: `boolean` = `false`

Defined in: [adapter/src/lib/adapter/adapter.ts:913](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L913)

***

### common?

> `optional` **common?**: [`InstanceCommon`](../-internal-/interfaces/InstanceCommon.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:986](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L986)

***

### config

> **config**: [`AdapterConfig`](../-internal-/interfaces/AdapterConfig.md) = `{}`

Defined in: [adapter/src/lib/adapter/adapter.ts:984](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L984)

***

### connected?

> `optional` **connected?**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L963)

***

### constants

> `readonly` **constants**: `object`

Defined in: [adapter/src/lib/adapter/adapter.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1007)

Constants for frequent use in adapters

#### STATE\_QUALITY

> **STATE\_QUALITY**: *typeof* [`STATE_QUALITY`](../-internal-/enumerations/STATE_QUALITY.md)

***

### dateFormat?

> `optional` **dateFormat?**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:974](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L974)

the configured date format of system.config, only available if requested via AdapterOptions `useFormatDate`

***

### FORBIDDEN\_CHARS

> `readonly` **FORBIDDEN\_CHARS**: `RegExp`

Defined in: [adapter/src/lib/adapter/adapter.ts:946](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L946)

A RegExp to test for forbidden chars in object IDs

***

### host?

> `optional` **host?**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:985](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L985)

***

### instance?

> `optional` **instance?**: `number`

Defined in: [adapter/src/lib/adapter/adapter.ts:958](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L958)

***

### ioPack

> **ioPack**: [`InstanceObject`](../-internal-/interfaces/InstanceObject.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:968](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L968)

contents of io-package.json

***

### isFloatComma?

> `optional` **isFloatComma?**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:976](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L976)

if float comma instead of dot is used, only available if requested via AdapterOptions `useFormatDate`

***

### language?

> `optional` **language?**: [`Languages`](../-internal-/type-aliases/Languages.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:978](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L978)

configured language of system.config, only available if requested via AdapterOptions `useFormatDate`

***

### latitude?

> `optional` **latitude?**: `number`

Defined in: [adapter/src/lib/adapter/adapter.ts:982](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L982)

latitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

***

### log

> **log**: [`Log`](../-internal-/classes/Log.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:930](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L930)

For ease of use the log property is always defined, however it is only available after `ready` has been called.

***

### longitude?

> `optional` **longitude?**: `number`

Defined in: [adapter/src/lib/adapter/adapter.ts:980](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L980)

longitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

***

### name

> **name**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:937](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L937)

***

### namespace

> **namespace**: `` `${string}.${number}` ``

Defined in: [adapter/src/lib/adapter/adapter.ts:936](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L936)

***

### oObjects?

> `optional` **oObjects?**: `Record`\<`string`, [`Object`](../-internal-/type-aliases/Object.md) \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L923)

Contains a live cache of the adapter's objects.
NOTE: This is only defined if the adapter was initialized with the option objects: true.

***

### oStates?

> `optional` **oStates?**: `Record`\<`string`, [`State`](../-internal-/interfaces/State.md) \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L918)

Contains a live cache of the adapter's states.
NOTE: This is only defined if the adapter was initialized with the option states: true.

***

### pack?

> `optional` **pack?**: `Record`\<`string`, `any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L966)

contents of package.json

***

### performStrictObjectChecks

> **performStrictObjectChecks**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:931](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L931)

***

### processLog?

> `optional` **processLog?**: (`msg`) => `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:992](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L992)

#### Parameters

##### msg

[`LogMessage`](../-internal-/interfaces/LogMessage.md)

#### Returns

`void`

***

### requireLog?

> `optional` **requireLog?**: (`isActive`, `options?`) => `void` \| `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:1001](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1001)

Start or stop subscribing to log messages
The method is only available if logTransporter is active via io-pack or adapter options
Note, that stopping will stop after 10 seconds, not immediately

#### Parameters

##### isActive

`boolean`

if log subscription should be activated or deactivated

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

options passed to setState e.g. user permissions

#### Returns

`void` \| `Promise`\<`void`\>

***

### stop?

> `optional` **stop?**: (`params?`) => `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:988](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L988)

Stop the adapter

#### Parameters

##### params?

[`StopParameters`](../-internal-/interfaces/StopParameters.md)

#### Returns

`Promise`\<`void`\>

***

### systemConfig?

> `optional` **systemConfig?**: [`InternalAdapterJsonConfig`](../-internal-/interfaces/InternalAdapterJsonConfig.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L972)

contents of iobroker.json if required via AdapterOptions

***

### version?

> `optional` **version?**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:989](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L989)

## Methods

### addChannelToEnum()

Add a channel to an enum.

#### Param

**enumName**

the enum category (e.g. rooms, functions)

#### Param

**addTo**

the enum id to add the channel to

#### Param

**parentDevice**

the parent device name

#### Param

**channelName**

the name of the channel

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Call Signature

> **addChannelToEnum**(`enumName`, `addTo`, `parentDevice`, `channelName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6760](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6760)

Add a channel to an enum.

##### Parameters

###### enumName

`string`

the enum category (e.g. rooms, functions)

###### addTo

`string`

the enum id to add the channel to

###### parentDevice

`string`

the parent device name

###### channelName

`string`

the name of the channel

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **addChannelToEnum**(`enumName`, `addTo`, `parentDevice`, `channelName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6777](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6777)

Add a channel to an enum.

##### Parameters

###### enumName

`string`

the enum category (e.g. rooms, functions)

###### addTo

`string`

the enum id to add the channel to

###### parentDevice

`string`

the parent device name

###### channelName

`string`

the name of the channel

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

***

### addChannelToEnumAsync()

> **addChannelToEnumAsync**(`enumName`, `addTo`, `parentDevice`, `channelName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:260](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L260)

Adds a channel to an enum

#### Parameters

##### enumName

`string`

##### addTo

`string`

##### parentDevice

`string`

##### channelName

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### addStateToEnum()

Add a state to an enum.

#### Param

**enumName**

the enum category (e.g. rooms, functions)

#### Param

**addTo**

the enum id to add the state to

#### Param

**parentDevice**

the parent device name

#### Param

**parentChannel**

the parent channel name

#### Param

**stateName**

the name of the state

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Call Signature

> **addStateToEnum**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7625](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7625)

Add a state to an enum.

##### Parameters

###### enumName

`string`

the enum category (e.g. rooms, functions)

###### addTo

`string`

the enum id to add the state to

###### parentDevice

`string`

the parent device name

###### parentChannel

`string`

the parent channel name

###### stateName

`string`

the name of the state

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **addStateToEnum**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7644](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7644)

Add a state to an enum.

##### Parameters

###### enumName

`string`

the enum category (e.g. rooms, functions)

###### addTo

`string`

the enum id to add the state to

###### parentDevice

`string`

the parent device name

###### parentChannel

`string`

the parent channel name

###### stateName

`string`

the name of the state

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

***

### addStateToEnumAsync()

> **addStateToEnumAsync**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L279)

Adds a state to an enum

#### Parameters

##### enumName

`string`

##### addTo

`string`

##### parentDevice

`string`

##### parentChannel

`string`

##### stateName

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### calculatePermissions()

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

#### Param

**user**

user name as text

#### Param

**commandsPermissions**

object that describes the access rights like
    ```js
        // static information
        var commandsPermissions = {
           getObject:          {type: 'object',    operation: 'read'},
           getObjects:         {type: 'object',    operation: 'list'},
           getObjectView:      {type: 'object',    operation: 'list'},
           setObject:          {type: 'object',    operation: 'write'},
           subscribeObjects:   {type: 'object',    operation: 'read'},
           unsubscribeObjects: {type: 'object',    operation: 'read'},
           subscribeFiles:     {type: 'object',    operation: 'read'},
           unsubscribeFiles:   {type: 'object',    operation: 'read'},

           getStates:          {type: 'state',     operation: 'list'},
           getState:           {type: 'state',     operation: 'read'},
           setState:           {type: 'state',     operation: 'write'},
           getStateHistory:    {type: 'state',     operation: 'read'},
           subscribe:          {type: 'state',     operation: 'read'},
           unsubscribe:        {type: 'state',     operation: 'read'},
           getVersion:         {type: '',          operation: ''},

           httpGet:            {type: 'other',     operation: 'http'},
           sendTo:             {type: 'other',     operation: 'sendto'},
           sendToHost:         {type: 'other',     operation: 'sendto'},

           readFile:           {type: 'file',      operation: 'read'},
           readFile64:         {type: 'file',      operation: 'read'},
           writeFile:          {type: 'file',      operation: 'write'},
           writeFile64:        {type: 'file',      operation: 'write'},
           unlink:             {type: 'file',      operation: 'delete'},
           rename:             {type: 'file',      operation: 'write'},
           mkdir:              {type: 'file',      operation: 'write'},
           readDir:            {type: 'file',      operation: 'list'},
           chmodFile:          {type: 'file',      operation: 'write'},
           chownFile:          {type: 'file',      operation: 'write'},

           authEnabled:        {type: '',          operation: ''},
           disconnect:         {type: '',          operation: ''},
           listPermissions:    {type: '',          operation: ''},
           getUserPermissions: {type: 'object',    operation: 'read'}
        };
       ```

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (acl) {
             // Access control object for admin looks like:
             // {
             //    file: {
             //         read:       true,
             //         write:      true,
             //         'delete':   true,
             //         create:     true,
             //         list:       true
             //     },
             //     object: {
             //         read:       true,
             //         write:      true,
             //         'delete':   true,
             //         list:       true
             //     },
             //     state: {
             //         read:       true,
             //         write:      true,
             //         'delete':   true,
             //         create:     true,
             //         list:       true
             //     },
             //     user: 'admin',
             //     users:  {
             //         read:       true,
             //         write:      true,
             //         create:     true,
             //         'delete':   true,
             //         list:       true
             //     },
             //     other: {
             //         execute:    true,
             //         http:       true,
             //         sendto:     true
             //     },
             //     groups: ['administrator'] // can be more than one
             // }
           }
       ```

#### Call Signature

> **calculatePermissions**(`user`, `commandsPermissions`, `options?`, `callback?`): `Promise`\<`void` \| [`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2485](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2485)

Calculate the effective permissions of a user for the given commands

##### Parameters

###### user

`string`

user name as text

###### commandsPermissions

[`CommandsPermissions`](../-internal-/type-aliases/CommandsPermissions.md)

the permission requirements of the commands

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`CalculatePermissionsCallback`](../-internal-/type-aliases/CalculatePermissionsCallback.md)

return result

##### Returns

`Promise`\<`void` \| [`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

#### Call Signature

> **calculatePermissions**(`user`, `commandsPermissions`, `callback?`): `Promise`\<`void` \| [`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2498](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2498)

Calculate the effective permissions of a user for the given commands

##### Parameters

###### user

`string`

user name as text

###### commandsPermissions

[`CommandsPermissions`](../-internal-/type-aliases/CommandsPermissions.md)

the permission requirements of the commands

###### callback?

[`CalculatePermissionsCallback`](../-internal-/type-aliases/CalculatePermissionsCallback.md)

return result

##### Returns

`Promise`\<`void` \| [`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

***

### calculatePermissionsAsync()

> **calculatePermissionsAsync**(`user`, `commandsPermissions`, `options?`): `Promise`\<[`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

Defined in: [adapter/src/lib/adapter/adapter.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L420)

<INTERNAL> Determines the users permissions

#### Parameters

##### user

`string`

##### commandsPermissions

[`CommandsPermissions`](../-internal-/type-aliases/CommandsPermissions.md)

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<[`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

***

### checkGroup()

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

#### Param

**user**

user name as text

#### Param

**group**

group name

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (result) {
             if (result) adapter.log.debug('User exists and in the group');
           }
       ```

#### Call Signature

> **checkGroup**(`user`, `group`, `options?`, `callback?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2382](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2382)

Returns if user exists and is in the group

##### Parameters

###### user

`string`

user name as text

###### group

`string`

group name

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`CheckGroupCallback`](../-internal-/type-aliases/CheckGroupCallback.md)

return result

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **checkGroup**(`user`, `group`, `callback?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2395](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2395)

Returns if user exists and is in the group

##### Parameters

###### user

`string`

user name as text

###### group

`string`

group name

###### callback?

[`CheckGroupCallback`](../-internal-/type-aliases/CheckGroupCallback.md)

return result

##### Returns

`Promise`\<`void`\>

***

### checkGroupAsync()

> **checkGroupAsync**(`user`, `group`, `options?`): `Promise`\<`boolean`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L418)

<INTERNAL> Checks if a user exists and is in the given group.

#### Parameters

##### user

`string`

##### group

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`boolean`\>

***

### checkPassword()

validates user and password

#### Param

**user**

user name as text

#### Param

**pw**

password as text

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (result) {
             if (result) adapter.log.debug('User is valid');
           }
       ```

#### Call Signature

> **checkPassword**(`user`, `pw`, `options`, `callback`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2093](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2093)

Validates user and password

##### Parameters

###### user

`string`

user name as text

###### pw

`string`

password as text

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`CheckPasswordCallback`](../-internal-/type-aliases/CheckPasswordCallback.md)

return result

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **checkPassword**(`user`, `pw`, `callback`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2106](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2106)

Validates user and password

##### Parameters

###### user

`string`

user name as text

###### pw

`string`

password as text

###### callback

[`CheckPasswordCallback`](../-internal-/type-aliases/CheckPasswordCallback.md)

return result

##### Returns

`Promise`\<`void`\>

***

### checkPasswordAsync()

> **checkPasswordAsync**(`user`, `password`, `options?`): `Promise`\<\[`isPasswordCorrect`: `boolean`, `user`: `` `system.user.${string}` ``\]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:406](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L406)

Validates username and password

#### Parameters

##### user

`string`

##### password

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<\[`isPasswordCorrect`: `boolean`, `user`: `` `system.user.${string}` ``\]\>

***

### checkUsedResource()

> **checkUsedResource**\<`T`\>(`type`, `data?`): `Promise`\<[`RegisteredResource`](../-internal-/type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)\>[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9176](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9176)

Ask whether another instance on this host currently holds an exclusive resource, without
registering anything.

Call this **before** opening the port or the device - afterwards the operating system has
already decided the conflict and this can only improve the error message.

The answer is a hint, not a permission: the registry knows what adapters declare, so an empty
result does not promise the resource is free.

#### Type Parameters

##### T

`T` *extends* keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)

#### Parameters

##### type

`T`

the kind of resource, e.g. "serialPort" or "tcpPort"

##### data?

`Partial`\<[`UsedResourceData`](../-internal-/type-aliases/UsedResourceData.md)\<`T`\>\>

description of the resource that is about to be used, e.g. `{ port: 1883 }`

#### Returns

`Promise`\<[`RegisteredResource`](../-internal-/type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)\>[]\>

the entries of other instances that currently hold it, newest registration first

#### Throws

when the host refuses the request or does not answer

***

### chmodFile()

Change file access rights

This function updates the file access rights
```js
     adapter.chmodFile('vis-2.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

#### Param

**\_adapter**

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

**path**

path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".

#### Param

**options**

data with mode

#### Param

**callback**

return result
       ```js
           function (err, processedFiles) {
               list of processed files with new groups
           }
       ```

#### Call Signature

> **chmodFile**(`adapter`, `path`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7972](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7972)

Change file access rights

##### Parameters

###### adapter

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to file without adapter name

###### options

data with mode

###### mode

`string` \| `number`

###### user?

`` `system.user.${string}` ``

###### callback

[`ChownFileCallback`](../-internal-/type-aliases/ChownFileCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **chmodFile**(`adapter`, `path`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7986](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7986)

Change file access rights

##### Parameters

###### adapter

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to file without adapter name

###### callback

[`ChownFileCallback`](../-internal-/type-aliases/ChownFileCallback.md)

return result

##### Returns

`void`

***

### chmodFileAsync()

> **chmodFileAsync**(`adapter`, `path`, `options`): `Promise`\<\{ `entries`: [`ChownFileResult`](../-internal-/interfaces/ChownFileResult.md)[]; `id`: `string`; \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:296](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L296)

Changes access rights of all files in the adapter directory

#### Parameters

##### adapter

`string` \| `null`

##### path

`string`

##### options

###### mode

`string` \| `number`

###### user?

`` `system.user.${string}` ``

#### Returns

`Promise`\<\{ `entries`: [`ChownFileResult`](../-internal-/interfaces/ChownFileResult.md)[]; `id`: `string`; \}\>

***

### chownFile()

Change a file owner

This function updates the file owner and ownerGroup
```js
     adapter.chownFile('vis-2.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

#### Param

**\_adapter**

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

**path**

path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".

#### Param

**options**

data with owner and ownerGroup

#### Param

**callback**

return result
       ```js
           function (err, processedFiles) {
               list of processed files with new groups
           }
       ```

#### Call Signature

> **chownFile**(`_adapter`, `path`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8039](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8039)

Change a file owner

##### Parameters

###### \_adapter

`string`

adapter name, or null for the current adapter

###### path

`string`

path to file without adapter name

###### options

data with owner and ownerGroup

###### group?

`` `system.group.${string}` ``

###### owner

`` `system.user.${string}` ``

###### ownerGroup?

`` `system.group.${string}` ``

###### user?

`` `system.user.${string}` ``

###### callback

(`err?`, `processedFiles?`) => `void`

return result

##### Returns

`void`

#### Call Signature

> **chownFile**(`_adapter`, `path`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8060](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8060)

Change a file owner

##### Parameters

###### \_adapter

`string`

adapter name, or null for the current adapter

###### path

`string`

path to file without adapter name

###### callback

(`err?`, `processedFiles?`) => `void`

return result

##### Returns

`void`

***

### chownFileAsync()

> **chownFileAsync**(...`args`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L303)

Changes the owner of all files in the adapter directory

#### Parameters

##### args

...`any`[]

#### Returns

`Promise`\<`any`\>

***

### clearInterval()

> **clearInterval**(`interval`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:3392](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3392)

Same as clearInterval but it checks the running intervals on unload

#### Parameters

##### interval

[`Interval`](../-internal-/type-aliases/Interval.md) \| `undefined`

interval object

#### Returns

`void`

***

### clearTimeout()

> **clearTimeout**(`timer`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:3286](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3286)

Same as clearTimeout but it checks the running timers on unload

#### Parameters

##### timer

[`Timeout`](../-internal-/type-aliases/Timeout.md) \| `undefined`

the timer object

#### Returns

`void`

***

### clearUsedResources()

> **clearUsedResources**(): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9192](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9192)

Free all exclusive resources this instance registered, across all types.

This is not needed on start-up (the host already resets the registrations of a starting instance) nor
on shutdown (the host marks them as no longer held). Use it when the instance drops everything it
occupied while it keeps running, e.g. on a reconfiguration.

#### Returns

`Promise`\<`void`\>

#### Throws

when the host refuses the command or does not answer

***

### ~~createChannel()~~

Name of channel must be in format "channel"

#### Param

**parentDevice**

the parent device name

#### Param

**channelName**

the name of the channel

#### Param

**roleOrCommon**

role string or the common section of the channel object

#### Param

**\_native**

the native section of the channel object

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createChannel**(`parentDevice`, `channelName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6334](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6334)

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6336](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6336)

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6343](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6343)

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6351](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6351)

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

***

### ~~createChannelAsync()~~

#### Call Signature

> **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L709)

Creates an object with a type channel. It must be located under a device

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### roleOrCommon?

`string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

#### Call Signature

> **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L715)

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

###### native?

`Record`\<`string`, `any`\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

#### Call Signature

> **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:722](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L722)

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

***

### ~~createDevice()~~

#### Param

**deviceName**

the name of the device

#### Param

**common**

the common section of the device object

#### Param

**\_native**

the native section of the device object

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createDevice**(`deviceName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6241](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6241)

##### Parameters

###### deviceName

`string`

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createDevice**(`deviceName`, `common`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6243](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6243)

##### Parameters

###### deviceName

`string`

###### common

`Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createDevice**(`deviceName`, `common`, `native`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6249](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6249)

##### Parameters

###### deviceName

`string`

###### common

`Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createDevice**(`deviceName`, `common`, `native`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6256](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6256)

##### Parameters

###### deviceName

`string`

###### common

`Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

***

### ~~createDeviceAsync()~~

#### Call Signature

> **createDeviceAsync**(`deviceName`, `common?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L689)

creates an object with type device

##### Parameters

###### deviceName

`string`

###### common?

`Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

#### Call Signature

> **createDeviceAsync**(`deviceName`, `common`, `native?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L691)

##### Parameters

###### deviceName

`string`

###### common

`Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

###### native?

`Record`\<`string`, `any`\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

#### Call Signature

> **createDeviceAsync**(`deviceName`, `common`, `native`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L697)

##### Parameters

###### deviceName

`string`

###### common

`Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

***

### ~~createState()~~

#### Param

**parentDevice**

the parent device name

#### Param

**parentChannel**

the parent channel name

#### Param

**stateName**

the name of the state

#### Param

**roleOrCommon**

role string or the common section of the state object

#### Param

**\_native**

the native section of the state object

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createState**(`parentDevice`, `parentChannel`, `stateName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6443](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6443)

##### Parameters

###### parentDevice

`string`

###### parentChannel

`string`

###### stateName

`string`

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6450](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6450)

##### Parameters

###### parentDevice

`string`

###### parentChannel

`string`

###### stateName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6458](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6458)

##### Parameters

###### parentDevice

`string`

###### parentChannel

`string`

###### stateName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

#### Call Signature

> **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6467](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6467)

##### Parameters

###### parentDevice

`string`

###### parentChannel

`string`

###### stateName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Deprecated

use `this.extendObject` instead

***

### ~~createStateAsync()~~

#### Call Signature

> **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L735)

Creates a state and the corresponding object. It must be located in a channel under a device

##### Parameters

###### parentDevice

`string`

###### parentChannel

`string`

###### stateName

`string`

###### roleOrCommon?

`string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

#### Call Signature

> **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:742](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L742)

##### Parameters

###### parentDevice

`string`

###### parentChannel

`string`

###### stateName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

###### native?

`Record`\<`string`, `any`\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

#### Call Signature

> **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:750](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L750)

##### Parameters

###### parentDevice

`string`

###### parentChannel

`string`

###### stateName

`string`

###### roleOrCommon

`string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

###### native

`Record`\<`string`, `any`\>

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

***

### decrypt()

Decrypt the password/value with given key

#### Param

**secretVal**

to use for decrypt (or value if only one parameter is given)

#### Param

**value**

value to decrypt (if secret is provided)

#### Call Signature

> **decrypt**(`secretVal`, `value?`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:1682](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1682)

Decrypt the password/value with given key

##### Parameters

###### secretVal

`string`

to use for decrypt (or value if only one parameter is given)

###### value?

`string`

value to decrypt (if secret is provided)

##### Returns

`string`

#### Call Signature

> **decrypt**(`value`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:1688](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1688)

Decrypt the password/value with the system secret

##### Parameters

###### value

`string`

value to decrypt

##### Returns

`string`

***

### delay()

> **delay**(`timeout`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:3311](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3311)

Delays the fulfillment of the promise the amount of time.

#### Parameters

##### timeout

`number`

timeout in milliseconds

#### Returns

`Promise`\<`void`\>

promise when timeout is over

***

### ~~deleteChannel()~~

Deletes channel and underlying structure

#### Deprecated

use `this.delObject` instead

#### Alias

deleteChannel

#### Param

**parentDevice**

is the part of ID like: adapter.instance.<deviceName>

#### Param

**channelName**

is the part of ID like: adapter.instance.<deviceName>.<channelName>

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

#### Call Signature

> **deleteChannel**(`channelName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7063](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7063)

##### Parameters

###### channelName

`string`

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteChannel**(`channelName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7065](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7065)

##### Parameters

###### channelName

`string`

###### options?

`unknown`

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteChannel**(`parentDevice`, `channelName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7067](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7067)

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### options?

`unknown`

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

***

### ~~deleteChannelAsync()~~

#### Call Signature

> **deleteChannelAsync**(`channelName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:764](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L764)

Deletes a channel and its states. It must have been created with createChannel

##### Parameters

###### channelName

`string`

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteChannelAsync**(`parentDevice`, `channelName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L766)

##### Parameters

###### parentDevice

`string`

###### channelName

`string`

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

***

### deleteChannelFromEnum()

Remove a channel from an enum.

#### Param

**enumName**

the enum category (e.g. rooms, functions)

#### Param

**parentDevice**

the parent device name

#### Param

**channelName**

the name of the channel

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Call Signature

> **deleteChannelFromEnum**(`enumName`, `parentDevice`, `channelName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6931](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6931)

Remove a channel from an enum.

##### Parameters

###### enumName

`string`

the enum category (e.g. rooms, functions)

###### parentDevice

`string`

the parent device name

###### channelName

`string`

the name of the channel

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **deleteChannelFromEnum**(`enumName`, `parentDevice`, `channelName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6946](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6946)

Remove a channel from an enum.

##### Parameters

###### enumName

`string`

the enum category (e.g. rooms, functions)

###### parentDevice

`string`

the parent device name

###### channelName

`string`

the name of the channel

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

***

### deleteChannelFromEnumAsync()

> **deleteChannelFromEnumAsync**(`enumName`, `parentDevice`, `channelName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:268](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L268)

Removes a channel from an enum

#### Parameters

##### enumName

`string`

##### parentDevice

`string`

##### channelName

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### ~~deleteDevice()~~

Delete device with all its channels and states.

#### Deprecated

use `this.delObject` instead

#### Param

**deviceName**

is the part of ID like: adapter.instance.<deviceName>

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

#### Call Signature

> **deleteDevice**(`deviceName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6675](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6675)

##### Parameters

###### deviceName

`string`

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteDevice**(`deviceName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6677](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6677)

##### Parameters

###### deviceName

`string`

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

***

### deleteDeviceAsync()

> **deleteDeviceAsync**(`deviceName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L258)

deletes a device, its channels and states

#### Parameters

##### deviceName

`string`

##### options?

`unknown`

#### Returns

`Promise`\<`void`\>

***

### ~~deleteState()~~

#### Param

**parentDevice**

the parent device name

#### Param

**parentChannel**

the parent channel name

#### Param

**stateName**

the name of the state

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteState**(`parentChannel`, `stateName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7179](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7179)

##### Parameters

###### parentChannel

`string`

###### stateName

`string`

###### options?

`unknown`

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteState**(`stateName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7181](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7181)

##### Parameters

###### stateName

`string`

###### options?

`unknown`

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteState**(`parentDevice`, `parentChannel`, `stateName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7183](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7183)

##### Parameters

###### parentDevice

`string` \| `null`

###### parentChannel

`string` \| `null`

###### stateName

`string`

###### options?

`unknown`

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

***

### ~~deleteStateAsync()~~

#### Call Signature

> **deleteStateAsync**(`stateName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:777](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L777)

Deletes a state. It must have been created with createState

##### Parameters

###### stateName

`string`

###### options?

`unknown`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteStateAsync**(`parentChannel`, `stateName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:779](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L779)

##### Parameters

###### parentChannel

`string`

###### stateName

`string`

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

#### Call Signature

> **deleteStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:785](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L785)

##### Parameters

###### parentDevice

`string`

###### parentChannel

`string`

###### stateName

`string`

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

***

### deleteStateFromEnum()

Remove a state from an enum.

#### Param

**enumName**

the enum category (e.g. rooms, functions)

#### Param

**parentDevice**

the parent device name

#### Param

**parentChannel**

the parent channel name

#### Param

**stateName**

the name of the state

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Call Signature

> **deleteStateFromEnum**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7813](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7813)

Remove a state from an enum.

##### Parameters

###### enumName

`string`

the enum category (e.g. rooms, functions)

###### parentDevice

`string`

the parent device name

###### parentChannel

`string`

the parent channel name

###### stateName

`string`

the name of the state

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **deleteStateFromEnum**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7830](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7830)

Remove a state from an enum.

##### Parameters

###### enumName

`string`

the enum category (e.g. rooms, functions)

###### parentDevice

`string`

the parent device name

###### parentChannel

`string`

the parent channel name

###### stateName

`string`

the name of the state

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

***

### deleteStateFromEnumAsync()

> **deleteStateFromEnumAsync**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L288)

Removes a state from an enum

#### Parameters

##### enumName

`string`

##### parentDevice

`string`

##### parentChannel

`string`

##### stateName

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### delFile()

#### Call Signature

> **delFile**(`adapterName`, `path`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L577)

Deletes a given file

##### Parameters

###### adapterName

`string` \| `null`

###### path

`string`

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

#### Call Signature

> **delFile**(`adapterName`, `path`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:586](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L586)

Deletes a given file

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the file

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

***

### delFileAsync()

> **delFileAsync**(`adapterName`, `path`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L317)

Deletes a given file

#### Parameters

##### adapterName

`string` \| `null`

##### path

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### delForeignObject()

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Param

**id**

exactly object ID (with namespace)

#### Param

**options**

optional user context or `{ recursive: true }` to delete all underlying objects

#### Param

**callback**

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

#### Call Signature

> **delForeignObject**(`id`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5596](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5596)

Delete any object.

##### Parameters

###### id

`string`

exactly object ID (with namespace)

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **delForeignObject**(`id`, `options`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5604](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5604)

Delete any object.

##### Parameters

###### id

`string`

exactly object ID (with namespace)

###### options

[`DelObjectOptions`](../-internal-/interfaces/DelObjectOptions.md)

optional user context or `{ recursive: true }` to delete all underlying objects

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

***

### delForeignObjectAsync()

> **delForeignObjectAsync**(`id`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L227)

Deletes an object (which might not belong to this adapter) from the object db

#### Parameters

##### id

`string`

##### options?

[`DelObjectOptions`](../-internal-/interfaces/DelObjectOptions.md)

#### Returns

`Promise`\<`void`\>

***

### delForeignState()

Deletes a state of any adapter.
The object is NOT deleted. If you want to delete it too, use `delForeignObject` instead.

No error is returned if state does not exist.

#### Param

**id**

long string for ID like "adapterName.0.stateID".

#### Param

**options**

optional argument to describe the user context

#### Param

**callback**

return result
```js
function (err) {}
```

#### Call Signature

> **delForeignState**(`id`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11279](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11279)

Deletes a state of any adapter. The object is NOT deleted.

##### Parameters

###### id

`string`

long string for ID like "adapterName.0.stateID".

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **delForeignState**(`id`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11287](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11287)

Deletes a state of any adapter. The object is NOT deleted.

##### Parameters

###### id

`string`

long string for ID like "adapterName.0.stateID".

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional argument to describe the user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

***

### delForeignStateAsync()

> **delForeignStateAsync**(`id`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L377)

Deletes a state from the states DB, but not the associated object

#### Parameters

##### id

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### delObject()

Delete an object of this instance.

It is not required to provide the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

#### Param

**id**

exactly object ID (without namespace)

#### Param

**options**

optional user context. E.g. recursive option could be true

#### Param

**callback**

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

#### Call Signature

> **delObject**(`id`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5519](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5519)

Delete an object of this instance.

##### Parameters

###### id

`string`

exactly object ID (without namespace)

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **delObject**(`id`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5527](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5527)

Delete an object of this instance.

##### Parameters

###### id

`string`

exactly object ID (without namespace)

###### options?

[`DelObjectOptions`](../-internal-/interfaces/DelObjectOptions.md) \| `null`

optional user context. E.g. recursive option could be true

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

***

### delObjectAsync()

> **delObjectAsync**(`id`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L225)

Deletes an object from the object db

#### Parameters

##### id

`string`

##### options?

[`DelObjectOptions`](../-internal-/interfaces/DelObjectOptions.md)

#### Returns

`Promise`\<`void`\>

***

### delState()

Deletes a state of this instance.
The object will NOT be deleted. If you want to delete it too, use `delObject` instead.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

No error is returned if state does not exist.

#### Param

**id**

exactly object ID (without namespace)

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

#### Call Signature

> **delState**(`id`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11214](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11214)

Deletes a state of this instance. The object is NOT deleted.

##### Parameters

###### id

`string`

exactly object ID (without namespace)

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **delState**(`id`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11222](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11222)

Deletes a state of this instance. The object is NOT deleted.

##### Parameters

###### id

`string`

exactly object ID (without namespace)

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`void`

***

### delStateAsync()

> **delStateAsync**(`id`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:375](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L375)

Deletes a state from the states DB, but not the associated object. Consider using deleteState instead

#### Parameters

##### id

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### destroySession()

> **destroySession**(`id`, `callback?`): [`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:1827](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1827)

Destroy a session in the states DB

#### Parameters

##### id

`string`

the session id

##### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

#### Returns

[`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

***

### disable()

> **disable**(): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:3134](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3134)

Disables and stops the adapter instance.

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

***

### encrypt()

Encrypt the password/value with given key

#### Param

**secretVal**

to use for encrypting (or value if only one parameter is given)

#### Param

**value**

value to encrypt (if secret is provided)

#### Call Signature

> **encrypt**(`secretVal`, `value?`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:1714](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1714)

Encrypt the password/value with given key

##### Parameters

###### secretVal

`string`

to use for encrypting (or value if only one parameter is given)

###### value?

`string`

value to encrypt (if secret is provided)

##### Returns

`string`

#### Call Signature

> **encrypt**(`value`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:1720](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1720)

Encrypt the password/value with the system secret

##### Parameters

###### value

`string`

value to encrypt

##### Returns

`string`

***

### extendForeignObject()

Same as [AdapterClass.extendObject](#extendobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Param

**id**

object ID, that must be extended

#### Param

**obj**

part that must be extended

#### Param

**options**

optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name

#### Param

**callback**

return result
       ```js
           function (err, obj) {
               // obj is {"id": id}
               if (err) adapter.log.error(err);
           }
       ```

#### Call Signature

> **extendForeignObject**\<`T`\>(`id`, `objPart`): `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:4189](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4189)

Extend any object and create it if it might not exist.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID with namespace

###### objPart

[`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

the partial object to merge into the existing object

##### Returns

`Promise`\<\{ `id`: `string`; \} \| `undefined`\>

#### Call Signature

> **extendForeignObject**\<`T`\>(`id`, `objPart`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4200](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4200)

Extend any object and create it if it might not exist.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID with namespace

###### objPart

[`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

the partial object to merge into the existing object

###### callback

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **extendForeignObject**\<`T`\>(`id`, `objPart`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4213](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4213)

Extend any object and create it if it might not exist.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID with namespace

###### objPart

[`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

the partial object to merge into the existing object

###### options

[`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

optional user context

###### callback

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **extendForeignObject**\<`T`\>(`id`, `objPart`, `options`): `Promise`\<\{ `id`: `string`; \} \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:4226](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4226)

Extend any object and create it if it might not exist.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID with namespace

###### objPart

[`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

the partial object to merge into the existing object

###### options

[`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

optional user context

##### Returns

`Promise`\<\{ `id`: `string`; \} \| `undefined`\>

***

### extendForeignObjectAsync()

> **extendForeignObjectAsync**\<`T`\>(`id`, `objPart`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:191](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L191)

Extend an object (which might not belong to this adapter) and create it if it might not exist

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### id

`T`

##### objPart

[`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

##### options?

[`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

***

### extendObject()

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

If the following object will be passed as an argument

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
  native: {}
}
```

#### Param

**id**

object ID, that must be extended

#### Param

**obj**

part that must be extended

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, obj) {
               if (err) adapter.log.error(err);
               // obj is {"id": id}
           }
       ```

#### Call Signature

> **extendObject**(`id`, `objPart`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:3764](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3764)

Extend some object and create it if it does not exist

##### Parameters

###### id

`string`

object ID (without namespace)

###### objPart

AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \}

the partial object to merge into the existing object

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Call Signature

> **extendObject**(`id`, `objPart`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:3772](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3772)

Extend some object and create it if it does not exist

##### Parameters

###### id

`string`

object ID (without namespace)

###### objPart

AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \}

the partial object to merge into the existing object

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **extendObject**(`id`, `objPart`, `options`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:3780](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3780)

Extend some object and create it if it does not exist

##### Parameters

###### id

`string`

object ID (without namespace)

###### objPart

AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \}

the partial object to merge into the existing object

###### options

[`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

optional user context

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Call Signature

> **extendObject**(`id`, `objPart`, `options`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:3793](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3793)

Extend some object and create it if it does not exist

##### Parameters

###### id

`string`

object ID (without namespace)

###### objPart

AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \}

the partial object to merge into the existing object

###### options

[`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

optional user context

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

***

### ~~extendObjectAsync()~~

> **extendObjectAsync**(`id`, `objPart`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L177)

Extend an object and create it if it might not exist

#### Parameters

##### id

`string`

##### objPart

AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \}

##### options?

[`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Deprecated

use `adapter.extendObject` without a callback instead

***

### fetchAdapterDir()

> **fetchAdapterDir**(`options`): `Promise`\<[`FetchAdapterDirResult`](../-internal-/interfaces/FetchAdapterDirResult.md)\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9275](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9275)

Copy a directory of an installed adapter into a local directory - also from another host.

The files of an adapter only exist on the hosts it is installed on. vis-2 for example collects the
`widgets` folder of every adapter with widgets, which fails when the adapter runs on another host. This
fetches such a directory: if the adapter is installed on this host, it is copied from its package,
otherwise the js-controller of the host hands the files out - small files several in one answer, big files
piece by piece, compressed with gzip where it helps (js-controller 8.0 or newer on that host, feature
`CONTROLLER_ADAPTER_FILES`).

Only the package directory of the adapter can be read, and not all of it: everything below
`node_modules`, hidden files and directories (name starting with a dot) and symbolic links are left out.

Existing files in `target` are overwritten, other files there are kept. If fetching fails, `target` may
hold a part of the files - fetch into an empty directory and move it into place when it is complete.

#### Parameters

##### options

[`FetchAdapterDirOptions`](../-internal-/interfaces/FetchAdapterDirOptions.md)

which directory of which adapter, where to, and optionally from which host

#### Returns

`Promise`\<[`FetchAdapterDirResult`](../-internal-/interfaces/FetchAdapterDirResult.md)\>

the host the files came from and the written files, relative to `target`

#### Example

```ts
const { host, files } = await adapter.fetchAdapterDir({
    adapter: 'wattcycle',
    path: 'widgets',
    target: '/opt/iobroker/iobroker-data/vis-2.0/remote/wattcycle',
});
```

#### Throws

if the adapter or path is invalid, no running host has the adapter, the host is too old or
does not answer, or a file changes while it is fetched

***

### fileExists()

Checks if file exists in DB.

#### Param

**\_adapter**

adapter name

#### Param

**filename**

path to file without adapter name. E.g., If you want to check "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

#### Param

**options**

optional user context

#### Param

**callback**

cb function if none provided, a promise is returned

#### Call Signature

> **fileExists**(`adapterName`, `path`): `Promise`\<`boolean`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:8533](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8533)

Checks if file exists in DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name

###### path

`string`

path to file without adapter name

##### Returns

`Promise`\<`boolean`\>

#### Call Signature

> **fileExists**(`adapterName`, `path`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8541](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8541)

Checks if file exists in DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name

###### path

`string`

path to file without adapter name

###### callback?

[`GenericCallback`](../-internal-/type-aliases/GenericCallback.md)\<`boolean`\>

cb function if none provided, a promise is returned

##### Returns

`void`

#### Call Signature

> **fileExists**(`adapterName`, `path`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8550](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8550)

Checks if file exists in DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name

###### path

`string`

path to file without adapter name

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback

[`GenericCallback`](../-internal-/type-aliases/GenericCallback.md)\<`boolean`\>

cb function if none provided, a promise is returned

##### Returns

`void`

***

### fileExistsAsync()

> **fileExistsAsync**(`adapterName`, `path`, `options?`): `Promise`\<`boolean`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:359](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L359)

Checks if a file exists in the DB

#### Parameters

##### adapterName

`string` \| `null`

##### path

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`boolean`\>

***

### findForeignObject()

Find any object by name or ID.

Find an object by the exact name or ID.

#### Param

**id**

exactly object ID (without namespace)

#### Param

**type**

optional `common.type` of state: 'number', 'string', 'boolean', 'file', ...

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           adapter.findForeignObject('Some name', function (err, id, name) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
           }
       ```

#### Call Signature

> **findForeignObject**(`idOrName`, `type`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5319](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5319)

Find any object by name or ID.

##### Parameters

###### idOrName

`string`

exactly object ID or name (without namespace)

###### type

[`CommonType`](../-internal-/type-aliases/CommonType.md) \| `null`

optional `common.type` of state: 'number', 'string', 'boolean', 'file', ...

###### callback

[`FindObjectCallback`](../-internal-/type-aliases/FindObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **findForeignObject**(`idOrName`, `type`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5328](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5328)

Find any object by name or ID.

##### Parameters

###### idOrName

`string`

exactly object ID or name (without namespace)

###### type

[`CommonType`](../-internal-/type-aliases/CommonType.md) \| `null`

optional `common.type` of state: 'number', 'string', 'boolean', 'file', ...

###### options

optional user context

###### checked?

`boolean`

This can be set to true to disable permission checks if they were already checked otherwise. Use it with caution!

###### language?

[`Languages`](../-internal-/type-aliases/Languages.md)

###### limitToOwnerRights?

`boolean`

Search only within the states, that belongs to this user

###### user?

`` `system.user.${string}` ``

###### callback

[`FindObjectCallback`](../-internal-/type-aliases/FindObjectCallback.md)

return result

##### Returns

`void`

***

### findForeignObjectAsync()

> **findForeignObjectAsync**(`id`, `type`, `options?`): `Promise`\<\{ `id?`: `string`; `name`: [`StringOrTranslated`](../-internal-/type-aliases/StringOrTranslated.md); \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:5402](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5402)

Find an object by the exact name or ID.

#### Parameters

##### id

`string`

exactly object ID (without a namespace)

##### type

[`CommonType`](../-internal-/type-aliases/CommonType.md) \| `null`

optional `common.type` of the state: 'number', 'string', 'boolean', 'file', ...

##### options?

optional user context with language

###### language?

[`Languages`](../-internal-/type-aliases/Languages.md)

language in which the search must be done for multi-language names

###### user?

`` `system.user.${string}` ``

current user

#### Returns

`Promise`\<\{ `id?`: `string`; `name`: [`StringOrTranslated`](../-internal-/type-aliases/StringOrTranslated.md); \}\>

if the object was found by ID it will return id and may be the multi-language name it exists. If the object was found by name it will return id and the multi-language name. If the object was not found, it will return only name that was searched for.

***

### foreignObjectExists()

> **foreignObjectExists**(`id`, `options?`): `Promise`\<`boolean` \| `void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:4463](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4463)

Checks if an object exists to the given id

#### Parameters

##### id

`string`

id of the object

##### options?

`Record`\<`string`, `any`\> \| `null`

optional user context

#### Returns

`Promise`\<`boolean` \| `void`\>

***

### formatDate()

Formats a date or duration according to the given format string.

#### Param

**dateObj**

the date to format

#### Param

**isDuration**

whether the value represents a duration, or the format string

#### Param

**\_format**

optional format string

#### Call Signature

> **formatDate**(`dateObj`, `format?`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:8658](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8658)

Formats a date according to the given format string.

##### Parameters

###### dateObj

`string` \| `number` \| `Date`

the date to format

###### format?

`string`

optional format string

##### Returns

`string`

#### Call Signature

> **formatDate**(`dateObj`, `isDuration`, `format?`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:8666](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8666)

Formats a date or duration according to the given format string.

##### Parameters

###### dateObj

`string` \| `number` \| `Date`

the date to format

###### isDuration

`string` \| `boolean`

whether the value represents a duration

###### format?

`string`

optional format string

##### Returns

`string`

***

### formatValue()

Formats a numeric value using the given format string.

#### Param

**value**

the value to format

#### Param

**decimals**

number of decimals to keep, or the format string

#### Param

**\_format**

optional format string for the decimal and thousands separator

#### Call Signature

> **formatValue**(`value`, `format?`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:8603](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8603)

Formats a numeric value using the given format string.

##### Parameters

###### value

`string` \| `number`

the value to format

###### format?

`string`

optional format string for the decimal and thousands separator

##### Returns

`string`

#### Call Signature

> **formatValue**(`value`, `decimals`, `format?`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:8611](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8611)

Formats a numeric value using the given format string.

##### Parameters

###### value

`string` \| `number`

the value to format

###### decimals

`number`

number of decimals to keep

###### format?

`string`

optional format string for the decimal and thousands separator

##### Returns

`string`

***

### freeUsedResource()

> **freeUsedResource**\<`T`\>(`type`, `data?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9210](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9210)

Free previously registered exclusive resources of this instance.

`data` is a **filter, not the exact payload**: every field it names must match, fields it does not name
are ignored. `freeUsedResource('tcpPort', { port: 8080 })` therefore also frees an entry registered as
`{ port: 8080, bind: '0.0.0.0' }`, and if `data` is omitted, all registered resources of the given
`type` for this instance are freed. The change is forwarded to the host this instance runs on and
reflected in `system.host.<hostname>.usedResources.<type>`; a filter that matches nothing is logged by
the host.

#### Type Parameters

##### T

`T` *extends* keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)

#### Parameters

##### type

`T`

the kind of resource, e.g. "serialPort" or "tcpPort"

##### data?

`Partial`\<[`UsedResourceData`](../-internal-/type-aliases/UsedResourceData.md)\<`T`\>\>

the fields identifying the resources to free; if omitted, all resources of `type` are freed

#### Returns

`Promise`\<`void`\>

#### Throws

when the host refuses the command or does not answer

***

### getAdapterObjects()

> **getAdapterObjects**(`callback`): `Promise`\<`void` \| `Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

Defined in: [adapter/src/lib/adapter/adapter.ts:3676](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3676)

Get all states, channels and devices of this adapter.

#### Parameters

##### callback

(`objects`) => `void`

return result

#### Returns

`Promise`\<`void` \| `Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

***

### getAdapterObjectsAsync()

> **getAdapterObjectsAsync**(): `Promise`\<`Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

Defined in: [adapter/src/lib/adapter/adapter.ts:458](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L458)

Get all states, channels, devices and folders of this adapter

#### Returns

`Promise`\<`Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

***

### getAdapterScopedPackageIdentifier()

> **getAdapterScopedPackageIdentifier**(`moduleName`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:1586](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1586)

Get the adapter scoped package identifier of a node module

#### Parameters

##### moduleName

`string`

name of the node module

#### Returns

`string`

***

### getCertificates()

> **getCertificates**(`publicName?`, `privateName?`, `chainedName?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:2999](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2999)

Get the certificates of the system.

#### Parameters

##### publicName?

`string`

name of the public certificate

##### privateName?

`string`

name of the private key

##### chainedName?

`string`

name of the chained certificate

##### callback?

[`GetCertificatesCallback`](../-internal-/type-aliases/GetCertificatesCallback.md)

return result

#### Returns

`void`

***

### getCertificatesAsync()

#### Call Signature

> **getCertificatesAsync**(`publicName?`, `privateName?`, `chainedName?`): `Promise`\<[`GetCertificatesPromiseReturnType`](../-internal-/type-aliases/GetCertificatesPromiseReturnType.md)\>

Defined in: [adapter/src/lib/adapter/adapter.ts:452](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L452)

Get the certificates of the system.

##### Parameters

###### publicName?

`string`

name of the public certificate

###### privateName?

`string`

name of the private key

###### chainedName?

`string`

name of the chained certificate

##### Returns

`Promise`\<[`GetCertificatesPromiseReturnType`](../-internal-/type-aliases/GetCertificatesPromiseReturnType.md)\>

#### Call Signature

> **getCertificatesAsync**(`publicName?`, `privateName?`, `chainedName?`): `Promise`\<[`GetCertificatesPromiseReturnType`](../-internal-/type-aliases/GetCertificatesPromiseReturnType.md)\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2975](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2975)

Loads SSL certificates by name and installs restart-on-change watchers: file watchers for
file-backed certificate values, and a subscription to `system.certificates` covering inline
ones and repointed paths.

##### Parameters

###### publicName?

`unknown`

public certificate name (defaults to `config.certPublic`)

###### privateName?

`unknown`

private key name (defaults to `config.certPrivate`)

###### chainedName?

`unknown`

chained certificate name (defaults to `config.certChained`)

##### Returns

`Promise`\<[`GetCertificatesPromiseReturnType`](../-internal-/type-aliases/GetCertificatesPromiseReturnType.md)\>

***

### getChannels()

#### Call Signature

> **getChannels**(`callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:810](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L810)

Returns a list of all channels in this adapter instance

##### Parameters

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

##### Returns

`void`

#### Call Signature

> **getChannels**(`parentDevice`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:817](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L817)

Returns a list of all channels in this adapter instance

##### Parameters

###### parentDevice

`string`

Name of the parent device to filter the channels by

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getChannels**(`parentDevice`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:825](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L825)

Returns a list of all channels in this adapter instance

##### Parameters

###### parentDevice

`string`

Name of the parent device to filter the channels by

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

return result

##### Returns

`void`

***

### getChannelsAsync()

#### Call Signature

> **getChannelsAsync**(): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:835](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L835)

Returns a list of all channels in this adapter instance parentDevice (optional)
Name of the parent device to filter the channels by options (optional) Some internal options.

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

#### Call Signature

> **getChannelsAsync**(`parentDevice`, `options?`): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L842)

Returns a list of all channels in this adapter instance, optionally filtered by parent device.

##### Parameters

###### parentDevice

`string`

Name of the parent device to filter the channels by

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Some internal options

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

***

### getChannelsOf()

Get all channels of this adapter or of the given device.

#### Param

**parentDevice**

the parent device name, or the callback

#### Param

**options**

optional user context, or the callback

#### Param

**callback**

return result

#### Call Signature

> **getChannelsOf**(`callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7378](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7378)

Get all channels of this adapter or of the given device.

##### Parameters

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getChannelsOf**(`parentDevice`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7385](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7385)

Get all channels of this adapter or of the given device.

##### Parameters

###### parentDevice

`string`

the parent device name

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getChannelsOf**(`parentDevice`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7393](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7393)

Get all channels of this adapter or of the given device.

##### Parameters

###### parentDevice

`string`

the parent device name

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

return result

##### Returns

`void`

***

### getChannelsOfAsync()

#### Call Signature

> **getChannelsOfAsync**(): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:795](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L795)

Returns a list of all channels in this adapter instance

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

#### Call Signature

> **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:802](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L802)

Returns a list of all channels in this adapter instance, optionally filtered by parent device.

##### Parameters

###### parentDevice

`string`

Name of the parent device to filter the channels by

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Some internal options

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

***

### getDevices()

Get all devices of this adapter.

#### Param

**options**

optional user context, or the callback

#### Param

**callback**

return result

#### Call Signature

> **getDevices**(`callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7304](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7304)

Get all devices of this adapter.

##### Parameters

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getDevices**(`options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7311](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7311)

Get all devices of this adapter.

##### Parameters

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)\>

return result

##### Returns

`void`

***

### getDevicesAsync()

> **getDevicesAsync**(`options?`): `Promise`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:276](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L276)

Returns a list of all devices in this adapter instance

#### Parameters

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)[]\>

***

### getEncryptedConfig()

> **getEncryptedConfig**(`attribute`, `callback?`): `Promise`\<`string` \| `void` \| `string`[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:3160](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3160)

Reads a parameter which is stored encrypted and returns its decrypted value.

An attribute listed in `encryptedNative` is already decrypted in `this.config` when the adapter
starts, and is returned as it is.

#### Parameters

##### attribute

`string`

the config attribute to decrypt

##### callback?

[`GetEncryptedConfigCallback`](../-internal-/type-aliases/GetEncryptedConfigCallback.md)

return result

#### Returns

`Promise`\<`string` \| `void` \| `string`[]\>

***

### getEnum()

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

#### Param

**\_enum**

enum name, e.g. 'rooms', 'function' or '' (all enums)

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, enums, requestEnum) {
             // requestEnum is _enum
             if (err) adapter.log.error('Cannot get object: ' + err);
             for (var e in enums) {
                adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
             }
           }
       ```

#### Call Signature

> **getEnum**(`callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4759](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4759)

Get the enum tree.

##### Parameters

###### callback

[`GetEnumCallback`](../-internal-/type-aliases/GetEnumCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getEnum**(`name`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4766](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4766)

Get the enum tree.

##### Parameters

###### name

`string`

the enum name to read

###### callback

[`GetEnumCallback`](../-internal-/type-aliases/GetEnumCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getEnum**(`name`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4774](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4774)

Get the enum tree.

##### Parameters

###### name

`string`

the enum name to read

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetEnumCallback`](../-internal-/type-aliases/GetEnumCallback.md)

return result

##### Returns

`void`

***

### getEnumAsync()

> **getEnumAsync**(`name`, `options?`): `Promise`\<\{ `requestEnum`: `string`; `result`: `Record`\<`string`, [`EnumObject`](../-internal-/interfaces/EnumObject.md)\>; \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:215](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L215)

Returns the enum tree, filtered by the optional enum name

#### Parameters

##### name

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<\{ `requestEnum`: `string`; `result`: `Record`\<`string`, [`EnumObject`](../-internal-/interfaces/EnumObject.md)\>; \}\>

***

### getEnums()

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Param

**\_enumList**

enum name or names, e.g. ['rooms', 'function']

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, enums) {
             // requestEnum is _enum
             if (err) adapter.log.error('Cannot get object: ' + err);
             // Result is like
             // {
             //    "enum.rooms": {
             //       "enum.rooms.livingroom": {
             //           common: {
             //              members: ['ID1', 'ID2']
             //           }
             //       },
             //       "enum.rooms.sleepingroom": {
             //           common: {
             //              members: ['ID3', 'ID4']
             //           }
             //       }
             //    },
             //    "enum.functions": {
             //       "enum.rooms.light": {
             //           common: {
             //              members: ['ID1', 'ID6']
             //           }
             //       },
             //       "enum.rooms.weather": {
             //           common: {
             //              members: ['ID4', 'ID7']
             //           }
             //       }
             //    }
             // }
           }
       ```

#### Call Signature

> **getEnums**(`callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4870](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4870)

Read the members of given enums.

##### Parameters

###### callback

[`GetEnumsCallback`](../-internal-/type-aliases/GetEnumsCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getEnums**(`enumList`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4877](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4877)

Read the members of given enums.

##### Parameters

###### enumList

[`EnumList`](../-internal-/type-aliases/EnumList.md)

the enum(s) to read

###### callback

[`GetEnumsCallback`](../-internal-/type-aliases/GetEnumsCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getEnums**(`enumList`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4885](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4885)

Read the members of given enums.

##### Parameters

###### enumList

[`EnumList`](../-internal-/type-aliases/EnumList.md)

the enum(s) to read

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetEnumsCallback`](../-internal-/type-aliases/GetEnumsCallback.md)

return result

##### Returns

`void`

***

### getEnumsAsync()

> **getEnumsAsync**(`enumList?`, `options?`): [`GetEnumsPromise`](../-internal-/type-aliases/GetEnumsPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L220)

Returns the enum tree, filtered by the optional enum name

#### Parameters

##### enumList?

[`EnumList`](../-internal-/type-aliases/EnumList.md)

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`GetEnumsPromise`](../-internal-/type-aliases/GetEnumsPromise.md)

***

### getForeignObject()

Get any object.

ID must be specified with namespace.

#### Param

**id**

exactly object ID (with namespace)

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

#### Call Signature

> **getForeignObject**\<`T`\>(`id`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5431](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5431)

Get any object.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

exactly object ID (with namespace)

###### callback

[`GetObjectCallback`](../-internal-/type-aliases/GetObjectCallback.md)\<`T`\>

return result

##### Returns

`void`

#### Call Signature

> **getForeignObject**\<`T`\>(`id`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5439](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5439)

Get any object.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

exactly object ID (with namespace)

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetObjectCallback`](../-internal-/type-aliases/GetObjectCallback.md)\<`T`\>

return result

##### Returns

`void`

***

### getForeignObjectAsync()

> **getForeignObjectAsync**\<`T`\>(`id`, `options?`): [`GetObjectPromise`](../-internal-/type-aliases/GetObjectPromise.md)\<`T`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:461](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L461)

Reads an object (which might not belong to this adapter) from the object db

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### id

`T`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`GetObjectPromise`](../-internal-/type-aliases/GetObjectPromise.md)\<`T`\>

***

### getForeignObjects()

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

#### Param

**pattern**

object ID/wildcards

#### Param

**type**

type of object: 'state', 'channel' or 'device'. Default - 'state'

#### Param

**enums**

object ID, that must be overwritten or created.

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

#### Call Signature

> **getForeignObjects**(`patter`): `Promise`\<`Record`\<`string`, [`AnyObject`](../-internal-/type-aliases/AnyObject.md) \| `null`\>\>

Defined in: [adapter/src/lib/adapter/adapter.ts:5037](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5037)

Get all objects matching the given pattern.

##### Parameters

###### patter

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

##### Returns

`Promise`\<`Record`\<`string`, [`AnyObject`](../-internal-/type-aliases/AnyObject.md) \| `null`\>\>

#### Call Signature

> **getForeignObjects**(`pattern`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5044](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5044)

Get all objects matching the given pattern.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

###### callback

[`GetObjectsCallback`](../-internal-/type-aliases/GetObjectsCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getForeignObjects**(`pattern`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5052](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5052)

Get all objects matching the given pattern.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetObjectsCallback`](../-internal-/type-aliases/GetObjectsCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getForeignObjects**\<`T`\>(`pattern`, `type`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5064](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5064)

Get all objects of the given type matching the given pattern.

##### Type Parameters

###### T

`T` *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

###### type

`T`

restrict the result to objects of this type

###### callback

[`GetObjectsCallbackTyped`](../-internal-/type-aliases/GetObjectsCallbackTyped.md)\<`T`\>

return result

##### Returns

`void`

#### Call Signature

> **getForeignObjects**\<`T`\>(`pattern`, `type`, `enums`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5077](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5077)

Get all objects of the given type matching the given pattern.

##### Type Parameters

###### T

`T` *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

###### type

`T`

restrict the result to objects of this type

###### enums

[`EnumList`](../-internal-/type-aliases/EnumList.md)

restrict the result to objects within these enums

###### callback

[`GetObjectsCallbackTyped`](../-internal-/type-aliases/GetObjectsCallbackTyped.md)\<`T`\>

return result

##### Returns

`void`

#### Call Signature

> **getForeignObjects**\<`T`\>(`pattern`, `type`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5091](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5091)

Get all objects of the given type matching the given pattern.

##### Type Parameters

###### T

`T` *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

###### type

`T`

restrict the result to objects of this type

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetObjectsCallbackTyped`](../-internal-/type-aliases/GetObjectsCallbackTyped.md)\<`T`\>

return result

##### Returns

`void`

#### Call Signature

> **getForeignObjects**\<`T`\>(`pattern`, `type`, `enums`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5106](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5106)

Get all objects of the given type matching the given pattern.

##### Type Parameters

###### T

`T` *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

###### type

`T`

restrict the result to objects of this type

###### enums

[`EnumList`](../-internal-/type-aliases/EnumList.md) \| `null`

restrict the result to objects within these enums

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetObjectsCallbackTyped`](../-internal-/type-aliases/GetObjectsCallbackTyped.md)\<`T`\>

return result

##### Returns

`void`

***

### getForeignObjectsAsync()

#### Call Signature

> **getForeignObjectsAsync**\<`T`\>(`pattern`, `type`, `enums?`, `options?`): [`GetObjectsPromiseTyped`](../-internal-/type-aliases/GetObjectsPromiseTyped.md)\<`T`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L655)

Get foreign objects by pattern, by specific type and resolve their enums.

##### Type Parameters

###### T

`T` *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

###### type

`T`

###### enums?

[`EnumList`](../-internal-/type-aliases/EnumList.md) \| `null`

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

##### Returns

[`GetObjectsPromiseTyped`](../-internal-/type-aliases/GetObjectsPromiseTyped.md)\<`T`\>

#### Call Signature

> **getForeignObjectsAsync**\<`T`\>(`pattern`, `type`, `options?`): [`GetObjectsPromiseTyped`](../-internal-/type-aliases/GetObjectsPromiseTyped.md)\<`T`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:668](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L668)

Get foreign objects by pattern and specific type.

##### Type Parameters

###### T

`T` *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

###### type

`T`

restrict the result to objects of this type

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

##### Returns

[`GetObjectsPromiseTyped`](../-internal-/type-aliases/GetObjectsPromiseTyped.md)\<`T`\>

#### Call Signature

> **getForeignObjectsAsync**(`pattern`, `options?`): [`GetObjectsPromise`](../-internal-/type-aliases/GetObjectsPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L679)

Get foreign objects by pattern.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

##### Returns

[`GetObjectsPromise`](../-internal-/type-aliases/GetObjectsPromise.md)

***

### getForeignState()

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

#### Param

**id**

object ID of the state.

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, state) {
             if (err) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in `setState` explanation

#### Call Signature

> **getForeignState**(`id`, `callback`): [`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:10847](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10847)

Read value from states DB for any instance and system state.

##### Parameters

###### id

`string`

object ID of the state.

###### callback

[`GetStateCallback`](../-internal-/type-aliases/GetStateCallback.md)

return result

##### Returns

[`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

#### Call Signature

> **getForeignState**(`id`, `options`, `callback`): [`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:10855](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10855)

Read value from states DB for any instance and system state.

##### Parameters

###### id

`string`

object ID of the state.

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetStateCallback`](../-internal-/type-aliases/GetStateCallback.md)

return result

##### Returns

[`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

***

### getForeignStateAsync()

> **getForeignStateAsync**(`id`, `options?`): [`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:404](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L404)

Read a value (which might not belong to this adapter) from the state's DB.

#### Parameters

##### id

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

***

### getForeignStates()

Read all states of all adapters (and system states), that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

#### Param

**pattern**

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

#### Param

**options**

optional argument to describe the user context

#### Param

**callback**

return result
```js
function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
```

#### Call Signature

> **getForeignStates**(`pattern`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11513](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11513)

Read all states of all adapters (and system states), that pass the pattern

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

###### callback

[`GetStatesCallback`](../-internal-/type-aliases/GetStatesCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getForeignStates**(`pattern`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11521](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11521)

Read all states of all adapters (and system states), that pass the pattern

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetStatesCallback`](../-internal-/type-aliases/GetStatesCallback.md)

return result

##### Returns

`void`

***

### getForeignStatesAsync()

> **getForeignStatesAsync**(`pattern`, `options?`): [`GetStatesPromise`](../-internal-/type-aliases/GetStatesPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L381)

Read all states (which might not belong to this adapter) which match the given pattern

#### Parameters

##### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`GetStatesPromise`](../-internal-/type-aliases/GetStatesPromise.md)

***

### getHistory()

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
     - none - No aggregation at all. Only raw values in the given period.

#### Param

**id**

object ID of the state.

#### Param

**options**

see function description

#### Param

**callback**

return result
       ```js
           function (error, result, step, sessionId) {
             if (error) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in `setState` explanation

#### Call Signature

> **getHistory**(`id`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11054](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11054)

Read historian data for states of any instance or system state.

##### Parameters

###### id

`string`

object ID of the state.

###### options

[`GetHistoryOptions`](../-internal-/interfaces/GetHistoryOptions.md)

the query options for the history

###### callback

[`GetHistoryCallback`](../-internal-/type-aliases/GetHistoryCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getHistory**(`id`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11061](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11061)

Read historian data for states of any instance or system state.

##### Parameters

###### id

`string`

object ID of the state.

###### callback

[`GetHistoryCallback`](../-internal-/type-aliases/GetHistoryCallback.md)

return result

##### Returns

`void`

***

### getHistoryAsync()

> **getHistoryAsync**(`id`, `options?`): `Promise`\<\{ `result?`: [`GetHistoryResult`](../-internal-/type-aliases/GetHistoryResult.md); `sessionId?`: `number`; `step?`: `number`; \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:366](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L366)

Read historian data for states of any instance or system state.

#### Parameters

##### id

`string`

##### options?

[`GetHistoryOptions`](../-internal-/interfaces/GetHistoryOptions.md)

#### Returns

`Promise`\<\{ `result?`: [`GetHistoryResult`](../-internal-/type-aliases/GetHistoryResult.md); `sessionId?`: `number`; `step?`: `number`; \}\>

***

### getHostUsedResources()

#### Param

**type**

resource type to read; if omitted, the resources of every type are returned

#### Call Signature

> **getHostUsedResources**\<`T`\>(`type`): `Promise`\<[`RegisteredResource`](../-internal-/type-aliases/RegisteredResource.md)\<`T`\>[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9230](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9230)

Query the exclusive resources currently registered as used on the **host** this instance runs on.

Unlike `registerUsedResource`/`freeUsedResource`/`clearUsedResources`, which only ever touch the
resources of this instance, this returns the resources of **all** instances of this host, so the user
(or an admin UI) can present an overview of what is occupied and pick something free.

Reading is done directly from the state's DB (`system.host.<hostname>.usedResources.<type>`), which the
host keeps up to date; only the mutating calls go through the host to keep the registry consistent.

##### Type Parameters

###### T

`T` *extends* keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)

##### Parameters

###### type

`T`

resource type to read, e.g. "serialPort"

##### Returns

`Promise`\<[`RegisteredResource`](../-internal-/type-aliases/RegisteredResource.md)\<`T`\>[]\>

the list of registered resources of that type (across all instances of this host)

#### Call Signature

> **getHostUsedResources**(): `Promise`\<[`RegisteredResource`](../-internal-/type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)\>[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9236](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9236)

Query the exclusive resources of every type currently registered as used on the host this instance runs on.

##### Returns

`Promise`\<[`RegisteredResource`](../-internal-/type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)\>[]\>

the list of registered resources (across all instances and types of this host)

***

### getObject()

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Param

**id**

exactly object ID (without namespace)

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

#### Call Signature

> **getObject**(`id`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4496](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4496)

Get object of this instance.

##### Parameters

###### id

`string`

exactly object ID (without namespace)

###### callback

[`GetObjectCallback`](../-internal-/type-aliases/GetObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getObject**(`id`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4504](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4504)

Get object of this instance.

##### Parameters

###### id

`string`

exactly object ID (without namespace)

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetObjectCallback`](../-internal-/type-aliases/GetObjectCallback.md)

return result

##### Returns

`void`

***

### getObjectAsync()

> **getObjectAsync**(`id`, `options?`): [`GetObjectPromise`](../-internal-/type-aliases/GetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:197](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L197)

Reads an object from the object db

#### Parameters

##### id

`string`

##### options?

`unknown`

#### Returns

[`GetObjectPromise`](../-internal-/type-aliases/GetObjectPromise.md)

***

### getObjectList()

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

#### Param

**params**

startkey and endkey information

#### Param

**options**

additional options, e.g. for permissions

#### Param

**callback**

optional callback
     ```js
         function (err, res) {
             if (res && res.rows) {
                  for (var i = 0; i < res.rows.length; i++) {
                      var id  = res.rows[i].id;
                      var obj = res.rows[i].value;
                      adapter.log.info('Found ' + id + ': ' + JSON.stringify(obj));
                  }
                  if (!res.rows.length) adapter.log.info('No objects found.');
             } else {
                 adapter.log.info('No objects found: ' + err);
             }
         }
      ```

#### Call Signature

> **getObjectList**(`params`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4689](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4689)

Read object list from DB.

##### Parameters

###### params

[`GetObjectListParams`](../-internal-/type-aliases/GetObjectListParams.md) \| `null`

startkey and endkey information

###### callback

[`GetObjectListCallback`](../-internal-/type-aliases/GetObjectListCallback.md)\<[`Object`](../-internal-/type-aliases/Object.md)\>

optional callback

##### Returns

`void`

#### Call Signature

> **getObjectList**(`params`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4700](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4700)

Read object list from DB.

##### Parameters

###### params

[`GetObjectListParams`](../-internal-/type-aliases/GetObjectListParams.md) \| `null`

startkey and endkey information

###### options

additional options, e.g. for permissions

###### sorted?

`boolean`

###### user?

`` `system.user.${string}` ``

###### callback

[`GetObjectListCallback`](../-internal-/type-aliases/GetObjectListCallback.md)\<[`Object`](../-internal-/type-aliases/Object.md)\>

optional callback

##### Returns

`void`

***

### getObjectListAsync()

> **getObjectListAsync**(`params`, `options?`): [`GetObjectListPromise`](../-internal-/type-aliases/GetObjectListPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:210](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L210)

Returns a list of objects with id between params.startkey and params.endkey

#### Parameters

##### params

[`GetObjectListParams`](../-internal-/type-aliases/GetObjectListParams.md) \| `null`

##### options?

\{ `sorted?`: `boolean`; `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`GetObjectListPromise`](../-internal-/type-aliases/GetObjectListPromise.md)

***

### getObjectView()

Read object view from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

#### Param

**design**

name of the design

#### Param

**search**

name of the view

#### Param

**params**

object containing startkey: first id to include in result; endkey: last id to include in result

#### Param

**options**

additional objects, e.g. for permissions

#### Param

**callback**

return result
     ```js
         function (err, doc) {
             if (doc && doc.rows) {
                  for (var i = 0; i < doc.rows.length; i++) {
                      var id  = doc.rows[i].id;
                       var obj = doc.rows[i].value;
                       adapter.log.info('Found ' + id + ': ' + JSON.stringify(obj));
                  }
                          if (!doc.rows.length) adapter.log.info('No objects found.');
              } else {
                  adapter.log.info('No objects found: ' + err);
              }
          }
          ```

#### Call Signature

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4558](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4558)

Read object view from DB.

##### Type Parameters

###### Design

`Design` *extends* `string` = `string`

###### Search

`Search` *extends* `string` = `string`

##### Parameters

###### design

`Design`

name of the design

###### search

`Search`

name of the view

###### params

[`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md) \| `null` \| `undefined`

object containing startkey: first id to include in result; endkey: last id to include in result

###### callback

[`GetObjectViewCallback`](../-internal-/type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../-internal-/type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

return result

##### Returns

`void`

#### Call Signature

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4573](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4573)

Read object view from DB.

##### Type Parameters

###### Design

`Design` *extends* `string` = `string`

###### Search

`Search` *extends* `string` = `string`

##### Parameters

###### design

`Design`

name of the design

###### search

`Search`

name of the view

###### params

[`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md) \| `null` \| `undefined`

object containing startkey: first id to include in result; endkey: last id to include in result

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

additional options, e.g. for permissions

###### callback

[`GetObjectViewCallback`](../-internal-/type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../-internal-/type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

return result

##### Returns

`void`

***

### getObjectViewAsync()

> **getObjectViewAsync**\<`Design`, `Search`\>(`design`, `search`, `params`, `options?`): [`GetObjectViewPromise`](../-internal-/type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../-internal-/type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

Defined in: [adapter/src/lib/adapter/adapter.ts:203](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L203)

Query a predefined object view (similar to SQL stored procedures) and return the results
For a detailed description refer to https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#object-fields
or http://guide.couchdb.org/editions/1/en/views.html

#### Type Parameters

##### Design

`Design` *extends* `string` = `string`

##### Search

`Search` *extends* `string` = `string`

#### Parameters

##### design

`Design`

##### search

`Search`

##### params

[`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md) \| `null` \| `undefined`

##### options?

`unknown`

#### Returns

[`GetObjectViewPromise`](../-internal-/type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../-internal-/type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

***

### getPluginConfig()

> **getPluginConfig**(`name`): `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/adapter/adapter.ts:11943](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11943)

Return plugin configuration

#### Parameters

##### name

`string`

name of the plugin to return

#### Returns

`Record`\<`string`, `any`\> \| `null`

plugin configuration or null if not existent or not isActive

***

### getPluginInstance()

> **getPluginInstance**(`name`): [`Plugin`](../-internal-/type-aliases/Plugin.md) \| `null`

Defined in: [adapter/src/lib/adapter/adapter.ts:11919](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11919)

Return plugin instance

#### Parameters

##### name

`string`

name of the plugin to return

#### Returns

[`Plugin`](../-internal-/type-aliases/Plugin.md) \| `null`

plugin instance or null if not existent or not isActive

***

### getPort()

Helper function to find next free port

Looks for first free TCP port starting with given one:
```js
    adapter.getPort(8081, function (port) {
        adapter.log.debug('Following port is free: ' + port);
    });
```

#### Param

**port**

port number to start the search for free port

#### Param

**host**

optional hostname for the port search

#### Param

**callback**

return result
       ```js
       function (port) {}
       ```

#### Call Signature

> **getPort**(`port`, `host?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:1984](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1984)

Helper function to find next free port

##### Parameters

###### port

`number`

port to start searching from

###### host?

`string`

host to bind to

###### callback?

(`port`) => `void`

return result

##### Returns

`void`

#### Call Signature

> **getPort**(`port`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:1991](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1991)

Helper function to find next free port

##### Parameters

###### port

`number`

port to start searching from

###### callback?

(`port`) => `void`

return result

##### Returns

`void`

***

### getPortAsync()

> **getPortAsync**(`port`): `Promise`\<`number`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:402](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L402)

Helper function that looks for the first free TCP port starting with the given one.

#### Parameters

##### port

`number`

#### Returns

`Promise`\<`number`\>

***

### getSession()

> **getSession**(`id`, `callback`): [`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:1747](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1747)

Read a session from the states DB

#### Parameters

##### id

`string`

the session id

##### callback

[`GetSessionCallback`](../-internal-/type-aliases/GetSessionCallback.md)

return result

#### Returns

[`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

***

### getState()

Read value from states DB.

This function can read values from states DB for this adapter.
Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.

#### Param

**id**

object ID of the state.

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, state) {
             if (err) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in `setState` explanation

#### Call Signature

> **getState**(`id`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10795](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10795)

Read value from states DB.

##### Parameters

###### id

`string`

object ID of the state.

###### callback

[`GetStateCallback`](../-internal-/type-aliases/GetStateCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getState**(`id`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10803](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10803)

Read value from states DB.

##### Parameters

###### id

`string`

object ID of the state.

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`GetStateCallback`](../-internal-/type-aliases/GetStateCallback.md)

return result

##### Returns

`void`

***

### getStateAsync()

> **getStateAsync**(`id`, `options?`): [`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:233](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L233)

Read a value from the states DB.

#### Parameters

##### id

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

***

### getStates()

Read all states of this adapter, that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

#### Param

**pattern**

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

#### Param

**options**

optional argument to describe the user context

#### Param

**callback**

return result
```js
function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
```

#### Call Signature

> **getStates**(`pattern`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11359](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11359)

Read all states of this adapter, that pass the pattern

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

###### callback

[`GetStatesCallback`](../-internal-/type-aliases/GetStatesCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getStates**(`pattern`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11367](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11367)

Read all states of this adapter, that pass the pattern

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional argument to describe the user context

###### callback

[`GetStatesCallback`](../-internal-/type-aliases/GetStatesCallback.md)

return result

##### Returns

`void`

***

### getStatesAsync()

> **getStatesAsync**(`pattern`, `options?`): [`GetStatesPromise`](../-internal-/type-aliases/GetStatesPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:379](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L379)

Read all states of this adapter that match the given pattern

#### Parameters

##### pattern

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`GetStatesPromise`](../-internal-/type-aliases/GetStatesPromise.md)

***

### getStatesOf()

Get all states of this adapter or of the given device/channel.

#### Param

**parentDevice**

the parent device name, or the callback

#### Param

**parentChannel**

the parent channel name, or the callback

#### Param

**options**

optional user context, or the callback

#### Param

**callback**

return result

#### Call Signature

> **getStatesOf**(`callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7474](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7474)

Get all states of this adapter or of the given device/channel.

##### Parameters

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getStatesOf**(`parentDevice`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7481](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7481)

Get all states of this adapter or of the given device/channel.

##### Parameters

###### parentDevice

`string`

the parent device name

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getStatesOf**(`parentDevice`, `parentChannel`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7489](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7489)

Get all states of this adapter or of the given device/channel.

##### Parameters

###### parentDevice

`string` \| `null` \| `undefined`

the parent device name

###### parentChannel

`string` \| `null` \| `undefined`

the parent channel name

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getStatesOf**(`parentDevice`, `parentChannel`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7502](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L7502)

Get all states of this adapter or of the given device/channel.

##### Parameters

###### parentDevice

`string` \| `null` \| `undefined`

the parent device name

###### parentChannel

`string` \| `null` \| `undefined`

the parent channel name

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

return result

##### Returns

`void`

***

### getStatesOfAsync()

#### Call Signature

> **getStatesOfAsync**(): `Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:850](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L850)

Returns a list of all states in this adapter instance

##### Returns

`Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

#### Call Signature

> **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:857](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L857)

Returns a list of all states in this adapter instance, optionally filtered by parent device/channel.

##### Parameters

###### parentDevice

`string`

Name of the parent device to filter the states by

###### parentChannel?

`string`

Name of the parent channel to filter the states by

##### Returns

`Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

#### Call Signature

> **getStatesOfAsync**(`parentDevice`, `parentChannel`, `options?`): `Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:865](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L865)

Returns a list of all states in this adapter instance, optionally filtered by parent device/channel.

##### Parameters

###### parentDevice

`string`

Name of the parent device to filter the states by

###### parentChannel

`string`

Name of the parent channel to filter the states by

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Some internal options

##### Returns

`Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

***

### getSuitableLicenses()

> **getSuitableLicenses**(`all?`, `adapterName?`): `Promise`\<[`SuitableLicense`](../-internal-/interfaces/SuitableLicense.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:11967](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11967)

This method returns the list of license that can be used by this adapter

#### Parameters

##### all?

`boolean`

if return the licenses, that used by other instances (true) or only for this instance (false)

##### adapterName?

`string`

Return licenses for specific adapter

#### Returns

`Promise`\<[`SuitableLicense`](../-internal-/interfaces/SuitableLicense.md)[]\>

list of suitable licenses

***

### getUserID()

> **getUserID**(`username`): `Promise`\<`string` \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2222](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2222)

Return ID of given username

#### Parameters

##### username

`string`

name of the user

#### Returns

`Promise`\<`string` \| `undefined`\>

***

### idToDCS()

> **idToDCS**(`id`): \{ `channel`: `string`; `device`: `string`; `state`: `string`; \} \| `null`

Defined in: [adapter/src/lib/adapter/adapter.ts:11173](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11173)

Convert ID into object with device's, channel's and state's name.

#### Parameters

##### id

`string`

short or long string of ID like "stateID" or "adapterName.0.stateID".

#### Returns

\{ `channel`: `string`; `device`: `string`; `state`: `string`; \} \| `null`

parsed ID as an object

***

### importNodeModule()

> **importNodeModule**(`moduleName`): `Promise`\<`unknown`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:1659](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1659)

Import a node module which has been installed via `installNodeModule`

#### Parameters

##### moduleName

`string`

name of the node module

#### Returns

`Promise`\<`unknown`\>

the required node module

***

### installNodeModule()

> **installNodeModule**(`moduleName`, `options`): `Promise`\<`CommandResult`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:1596](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1596)

Install specified npm module

#### Parameters

##### moduleName

`string`

name of the node module

##### options

[`InstallNodeModuleOptions`](../-internal-/interfaces/InstallNodeModuleOptions.md)

install options including the version

#### Returns

`Promise`\<`CommandResult`\>

***

### listInstalledNodeModules()

> **listInstalledNodeModules**(): `Promise`\<`string`[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:1630](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1630)

List all additional installed node modules from this adapter

#### Returns

`Promise`\<`string`[]\>

***

### mayRead()

> **mayRead**(`options`): `Promise`\<`boolean`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9850](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9850)

Whether a user may read something - a state, an object, or a file of an adapter.

The answer is the one the database would give: the ACL of the thing, its owner, the groups of
the user and the default ACL of the system all go into it, and members of the administrator
group are not restricted by any of it. It is the question a socket server has to ask before it
hands an event to a connection - a subscription says what a client is interested in, never what
it may see - and asking it here keeps a second implementation of the same rules out of the
adapters.

Two cases are worth knowing, because they follow the database rather than intuition:
a state whose object does not exist may be read by anyone, exactly as `getState` reads it, and
an object that does not exist is not something that can be kept from anybody either.

Only reading is asked about here. Writing and deleting are checked where they happen - the call
that writes refuses by itself - and can be added to this the same way if something needs to know
beforehand.

#### Parameters

##### options

[`MayReadOptions`](../-internal-/interfaces/MayReadOptions.md)

what is to be read, and by whom

#### Returns

`Promise`\<`boolean`\>

whether that user may read it; rejects only where the question itself cannot be
answered, e.g. with the databases gone

***

### mkdir()

Creates a directory in the DB.

#### Param

**\_adapter**

adapter name, or null for the current adapter

#### Param

**dirname**

path to the directory

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Call Signature

> **mkdir**(`adapterName`, `path`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8324](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8324)

Creates a directory in the DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the directory

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **mkdir**(`adapterName`, `path`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8333](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8333)

Creates a directory in the DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the directory

###### options

optional user context

###### owner?

`` `system.user.${string}` ``

###### ownerGroup?

`` `system.group.${string}` ``

###### user?

`` `system.user.${string}` ``

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

***

### mkdirAsync()

> **mkdirAsync**(`adapterName`, `path`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:330](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L330)

Creates a directory in the DB

#### Parameters

##### adapterName

`string` \| `null`

##### path

`string`

##### options?

\{ `owner?`: `` `system.user.${string}` ``; `ownerGroup?`: `` `system.group.${string}` ``; `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### objectExists()

> **objectExists**(`id`, `options?`): `Promise`\<`boolean` \| `void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:4430](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4430)

Checks if an object exists to the given id, id will be fixed first

#### Parameters

##### id

`string`

id of the object

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

#### Returns

`Promise`\<`boolean` \| `void`\>

***

### on()

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:155](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L155)

Listen for state changes

##### Parameters

###### event

`"stateChange"`

###### listener

[`StateChangeHandler`](../-internal-/type-aliases/StateChangeHandler.md)

##### Returns

`this`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L157)

Listen for object changes

##### Parameters

###### event

`"objectChange"`

###### listener

[`ObjectChangeHandler`](../-internal-/type-aliases/ObjectChangeHandler.md)

##### Returns

`this`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L159)

Listen for file changes

##### Parameters

###### event

`"fileChange"`

###### listener

[`FileChangeHandler`](../-internal-/type-aliases/FileChangeHandler.md)

##### Returns

`this`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L161)

Emitted when the adapter is ready

##### Parameters

###### event

`"ready"`

###### listener

[`ReadyHandler`](../-internal-/type-aliases/ReadyHandler.md)

##### Returns

`this`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:163](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L163)

Emitted when the adapter is installed

##### Parameters

###### event

`"install"`

###### listener

[`ReadyHandler`](../-internal-/type-aliases/ReadyHandler.md)

##### Returns

`this`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L165)

Emitted when the adapter is unloaded

##### Parameters

###### event

`"unload"`

###### listener

[`UnloadHandler`](../-internal-/type-aliases/UnloadHandler.md)

##### Returns

`this`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L167)

Emitted when a message is received

##### Parameters

###### event

`"message"`

###### listener

[`MessageHandler`](../-internal-/type-aliases/MessageHandler.md)

##### Returns

`this`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L169)

Only emitted for compact instances

##### Parameters

###### event

`"exit"`

###### listener

(`exitCode`, `reason`) => `void` \| `Promise`\<`void`\>

##### Returns

`this`

#### Call Signature

> **on**(`event`, `listener`): `this`

Defined in: [adapter/src/lib/adapter/adapter.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L171)

Emitted on a new log message

##### Parameters

###### event

`"log"`

###### listener

(`message`) => `void` \| `Promise`\<`void`\>

##### Returns

`this`

***

### readDir()

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

#### Param

**\_adapter**

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

**path**

path to directory without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, filesOrDirs) {
               // filesOrDirs is array with elements like
               // {
               //      file:       'views.json,
               //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,
               //      isDir:      true/false,
               //      acl:        access control list object,
               //      modifiedAt: time when modified,
               //      createdAt:  time when created
               // }
           }
       ```

#### Call Signature

> **readDir**(`adapterName`, `path`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8124](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8124)

Read directory from DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the directory

###### callback

[`ReadDirCallback`](../-internal-/type-aliases/ReadDirCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **readDir**(`adapterName`, `path`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8133](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8133)

Read directory from DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the directory

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback

[`ReadDirCallback`](../-internal-/type-aliases/ReadDirCallback.md)

return result

##### Returns

`void`

***

### readDirAsync()

> **readDirAsync**(`adapterName`, `path`, `options?`): [`ReadDirPromise`](../-internal-/type-aliases/ReadDirPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L305)

reads the content of directory from DB for given adapter and path

#### Parameters

##### adapterName

`string` \| `null`

##### path

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`ReadDirPromise`](../-internal-/type-aliases/ReadDirPromise.md)

***

### readFile()

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
```js
     adapter.readFile('vis-2.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('Content of file is: ' + data);
     });
```

#### Param

**\_adapter**

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

**filename**

path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, data) {
               // data is utf8 or binary Buffer depends on the file extension.
           }
       ```

#### Call Signature

> **readFile**(`adapterName`, `path`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8382](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8382)

Read file from DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to file without adapter name

###### callback

[`ReadFileCallback`](../-internal-/type-aliases/ReadFileCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **readFile**(`adapterName`, `path`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8391](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8391)

Read file from DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to file without adapter name

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback

[`ReadFileCallback`](../-internal-/type-aliases/ReadFileCallback.md)

return result

##### Returns

`void`

***

### readFileAsync()

> **readFileAsync**(`adapterName`, `path`, `options?`): [`ReadFilePromise`](../-internal-/type-aliases/ReadFilePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:340](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L340)

reads the content of directory from DB for given adapter and path

#### Parameters

##### adapterName

`string` \| `null`

##### path

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`ReadFilePromise`](../-internal-/type-aliases/ReadFilePromise.md)

***

### registerNotification()

> **registerNotification**\<`Scope`\>(`scope`, `category`, `message`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9119](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9119)

Send notification with given scope and category to host of this adapter

#### Type Parameters

##### Scope

`Scope` *extends* keyof [`NotificationScopes`](../-internal-/interfaces/NotificationScopes.md)

#### Parameters

##### scope

`Scope`

scope to be addressed

##### category

[`NotificationScopes`](../-internal-/interfaces/NotificationScopes.md)\[`Scope`\] \| `null`

to be addressed, if a null message will be checked by regex of given scope

##### message

`string`

message to be stored/checked

##### options?

[`NotificationOptions`](../-internal-/interfaces/NotificationOptions.md)

Additional options for the notification, currently `contextData` is supported

#### Returns

`Promise`\<`void`\>

***

### registerUsedResource()

> **registerUsedResource**\<`T`\>(`type`, `data`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9154](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9154)

Register an exclusive resource (serial port, TCP/UDP port, USB device, ...) as used by this instance.

Exclusive resources are the ones that cannot be occupied by more than one instance at the same time.
The information is forwarded to the host this instance runs on and stored under
`system.host.<hostname>.usedResources.<type>`, so the user gets an overview of the occupied resources
and can pick a free one when configuring a new instance.

Registering is **additive**: call it once per occupied resource, in any order and from any number of
async init paths. The host drops what this instance registered before whenever the instance starts, so
a stale registration from a previous configuration cannot survive a restart.

#### Type Parameters

##### T

`T` *extends* keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)

#### Parameters

##### type

`T`

the kind of resource, e.g. "serialPort" or "tcpPort"

##### data

[`UsedResourceData`](../-internal-/type-aliases/UsedResourceData.md)\<`T`\>

the strictly typed payload describing the resource, e.g. `{ port: '/dev/ttyUSB0' }`

#### Returns

`Promise`\<`void`\>

#### Throws

when the host refuses the registration - e.g. because `common.declareUsedResources` is not `true` - or does not answer

***

### rename()

Renames a file in the DB.

#### Param

**\_adapter**

adapter name, or null for the current adapter

#### Param

**oldName**

current path to the file

#### Param

**newName**

new path to the file

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Call Signature

> **rename**(`adapterName`, `oldName`, `newName`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8265](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8265)

Renames a file in the DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### oldName

`string`

current path to the file

###### newName

`string`

new path to the file

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **rename**(`adapterName`, `oldName`, `newName`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8275](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8275)

Renames a file in the DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### oldName

`string`

current path to the file

###### newName

`string`

new path to the file

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

***

### renameAsync()

> **renameAsync**(`adapterName`, `oldName`, `newName`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:323](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L323)

Renames a file in the DB

#### Parameters

##### adapterName

`string` \| `null`

##### oldName

`string`

##### newName

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### restart()

> **restart**(): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:3065](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3065)

Restarts an instance of the adapter.

#### Returns

`void`

***

### sendTo()

Send message to other adapter instance or all instances of adapter.

This function sends a message to specific instance or all instances of some specific adapter.
If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.

#### Param

**instanceName**

name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".

#### Param

**command**

command name, like "send", "browse", "list". Command is depend on target adapter implementation.

#### Param

**message**

object that will be given as argument for request

#### Param

**callback**

optional return result
       ```js
           function (result) {
             // result is target adapter specific and can vary from adapter to adapter
             if (!result) adapter.log.error('No response received');
           }
       ```

#### Param

**options**

optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance)

#### Call Signature

> **sendTo**(`instanceName`, `message`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8833](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8833)

Send a message to a specific instance or all instances of some specific adapter.

##### Parameters

###### instanceName

`string`

name of the instance to send the message to

###### message

`any`

message to send

###### callback?

[`MessageCallbackInfo`](../-internal-/interfaces/MessageCallbackInfo.md) \| [`MessageCallback`](../-internal-/type-aliases/MessageCallback.md)

optional return result

##### Returns

`void`

#### Call Signature

> **sendTo**(`instanceName`, `command`, `message`, `callback?`, `options?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8847](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8847)

Send a message to a specific instance or all instances of some specific adapter.

##### Parameters

###### instanceName

`string`

name of the instance to send the message to

###### command

`string`

command name

###### message

`any`

message to send

###### callback?

[`MessageCallbackInfo`](../-internal-/interfaces/MessageCallbackInfo.md) \| [`MessageCallback`](../-internal-/type-aliases/MessageCallback.md)

optional return result

###### options?

[`SendToOptions`](../-internal-/interfaces/SendToOptions.md)

optional options to control the send behaviour

##### Returns

`void`

***

### sendToAsync()

#### Call Signature

> **sendToAsync**(`instanceName`, `message`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L558)

Sends a message to a specific instance or all instances of some specific adapter.

##### Parameters

###### instanceName

`string`

###### message

`any`

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **sendToAsync**(`instanceName`, `command`, `message`, `options?`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:567](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L567)

Sends a message to a specific instance or all instances of some specific adapter.

##### Parameters

###### instanceName

`string`

name of the instance

###### command

`string`

command name

###### message

`any`

message to send

###### options?

[`SendToOptions`](../-internal-/interfaces/SendToOptions.md)

optional options to control the send behaviour

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **sendToAsync**(`instanceName`, `command`, `message?`, `options?`): `any`

Defined in: [adapter/src/lib/adapter/adapter.ts:8961](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8961)

Async version of sendTo
As we have a special case (first arg can be error or result, we need to promisify manually)

##### Parameters

###### instanceName

`unknown`

name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".

###### command

`unknown`

command name, like "send", "browse", "list". Command is depend on target adapter implementation.

###### message?

`unknown`

object that will be given as argument for request

###### options?

`unknown`

optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance)

##### Returns

`any`

***

### sendToHost()

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

#### Param

**hostName**

name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts.

#### Param

**command**

command name. One of: "cmdExec", "getRepository", "getRepositoryCompact", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging", "checkDocker". Commands can be checked in controller.js (function processMessage)

#### Param

**message**

object that will be given as argument for request

#### Param

**callback**

optional return result
       ```js
           function (result) {
             // result is target adapter specific and can vary from command to command
             if (!result) adapter.log.error('No response received');
           }
       ```

#### Param

**options**

optional send options: a `timeout` for the answer, or the `user` this message is
sent on behalf of - the host sees it as `obj.user`

#### Call Signature

> **sendToHost**(`hostName`, `message`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8980](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8980)

Send a message to a specific host or all hosts.

##### Parameters

###### hostName

`string` \| `null`

name of the host to send the message to, or null for all hosts

###### message

`any`

message to send

###### callback?

[`MessageCallbackInfo`](../-internal-/interfaces/MessageCallbackInfo.md) \| [`MessageCallback`](../-internal-/type-aliases/MessageCallback.md)

optional return result

##### Returns

`void`

#### Call Signature

> **sendToHost**(`hostName`, `command`, `message`, `callback?`, `options?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8994](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8994)

Send a message to a specific host or all hosts.

##### Parameters

###### hostName

`string` \| `null`

name of the host to send the message to, or null for all hosts

###### command

`string`

command name

###### message

`any`

message to send

###### callback?

[`MessageCallbackInfo`](../-internal-/interfaces/MessageCallbackInfo.md) \| [`MessageCallback`](../-internal-/type-aliases/MessageCallback.md)

optional return result

###### options?

[`SendToOptions`](../-internal-/interfaces/SendToOptions.md)

optional options to control the send behaviour

##### Returns

`void`

***

### sendToHostAsync()

#### Call Signature

> **sendToHostAsync**(`hostName`, `message`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:539](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L539)

Sends a message to a specific host or all hosts.

##### Parameters

###### hostName

`string`

###### message

`any`

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **sendToHostAsync**(`hostName`, `command`, `message`, `options?`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L548)

Sends a message to a specific host or all hosts.

##### Parameters

###### hostName

`string`

name of the host

###### command

`string`

command name

###### message

`any`

message to send

###### options?

[`SendToOptions`](../-internal-/interfaces/SendToOptions.md)

optional options to control the send behaviour

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **sendToHostAsync**(`hostName`, `command`, `message?`, `options?`): `any`

Defined in: [adapter/src/lib/adapter/adapter.ts:9081](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9081)

Async version of sendToHost

##### Parameters

###### hostName

`unknown`

name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts.

###### command

`unknown`

command name. One of: "cmdExec", "getRepository", "getRepositoryCompact", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging", "checkDocker". Commands can be checked in controller.js (function processMessage)

###### message?

`unknown`

object that will be given as argument for request

###### options?

`unknown`

optional send options, e.g. a `timeout` or the `user` the message is sent for

##### Returns

`any`

***

### sendToUI()

> **sendToUI**(`options`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9100](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9100)

Send a message to an active UI Client

#### Parameters

##### options

[`SendToUserInterfaceClientOptions`](../-internal-/interfaces/SendToUserInterfaceClientOptions.md)

clientId and data options

#### Returns

`Promise`\<`void`\>

***

### setExecutableCapabilities()

> **setExecutableCapabilities**(`execPath`, `capabilities`, `modeEffective?`, `modePermitted?`, `modeInherited?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L183)

Set the capabilities of the given executable. Only works on Linux systems.

#### Parameters

##### execPath

`string`

##### capabilities

`string`[]

##### modeEffective?

`boolean`

##### modePermitted?

`boolean`

##### modeInherited?

`boolean`

#### Returns

`Promise`\<`void`\>

***

### setForeignObject()

Same as [AdapterClass.setObject](#setobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Param

**id**

object ID, that must be overwritten or created.

#### Param

**obj**

new object

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

#### Call Signature

> **setForeignObject**\<`T`\>(`id`, `obj`): `Promise`\<\{ `id`: `string`; \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:4044](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4044)

Same as [AdapterClass.setObject](#setobject), but for any object.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID with namespace

###### obj

[`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

new object

##### Returns

`Promise`\<\{ `id`: `string`; \}\>

#### Call Signature

> **setForeignObject**\<`T`\>(`id`, `obj`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4055](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4055)

Same as [AdapterClass.setObject](#setobject), but for any object.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID with namespace

###### obj

[`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

new object

###### callback

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setForeignObject**\<`T`\>(`id`, `obj`, `options`): `Promise`\<\{ `id`: `string`; \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:4067](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4067)

Same as [AdapterClass.setObject](#setobject), but for any object.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID with namespace

###### obj

[`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

new object

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

##### Returns

`Promise`\<\{ `id`: `string`; \}\>

#### Call Signature

> **setForeignObject**\<`T`\>(`id`, `obj`, `options?`, `callback?`): `void` \| `Promise`\<\{ `id`: `string`; \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:4080](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L4080)

Same as [AdapterClass.setObject](#setobject), but for any object.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID with namespace

###### obj

[`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

new object

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void` \| `Promise`\<\{ `id`: `string`; \}\>

***

### ~~setForeignObjectAsync()~~

> **setForeignObjectAsync**\<`T`\>(`id`, `obj`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L440)

Creates or overwrites an object (which might not belong to this adapter) in the object db

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### id

`T`

##### obj

[`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Deprecated

use `adapter.setForeignObject` without a callback instead

***

### setForeignObjectNotExists()

Same as [AdapterClass.setForeignObject](#setforeignobject), but with check if the object exists.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
New object will be created only if no object exists with such ID.

#### Param

**id**

object ID, that must be overwritten or created.

#### Param

**obj**

new object

#### Param

**options**

user context

#### Param

**callback**

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

#### Call Signature

> **setForeignObjectNotExists**\<`T`\>(`id`, `obj`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6119](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6119)

Same as [AdapterClass.setForeignObject](#setforeignobject), but with check if the object exists.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID, that must be overwritten or created.

###### obj

[`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

new object

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setForeignObjectNotExists**\<`T`\>(`id`, `obj`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:6132](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6132)

Same as [AdapterClass.setForeignObject](#setforeignobject), but with check if the object exists.

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### id

`T`

object ID, that must be overwritten or created.

###### obj

[`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

new object

###### options?

\{ `preserve?`: \{\[`key`: `string`\]: `boolean`; \}; `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

***

### setForeignObjectNotExistsAsync()

> **setForeignObjectNotExistsAsync**\<`T`\>(`id`, `obj`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L251)

Creates an object (which might not belong to this adapter) in the object db. Existing objects are not overwritten.

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### id

`T`

##### obj

[`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

***

### setForeignState()

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Param

**id**

object ID of the state.

#### Param

**state**

simple value or object with attribues.
 If state is object, so the ack will be ignored and must be included into object.
 ```js
     {
         val:    value,
         ack:    true|false,       // default - false; is command(false) or status(true)
         ts:     timestampMS,      // default - now
         q:      qualityAsNumber,  // default - 0 (ok)
         from:   origin,           // default - this adapter
         c:      comment,          // default - empty
         expire: expireInSeconds   // default - 0
         lc:     timestampMS       // default - automatic calculation
     }
 ```

#### Param

**ack**

optional is command(false) or status(true)

#### Param

**options**

optional user context

#### Param

**callback**

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

#### Call Signature

> **setForeignState**(`id`, `state`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10217](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10217)

Writes value into states DB for any instance.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### callback?

[`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setForeignState**(`id`, `state`, `ack`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10230](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10230)

Writes value into states DB for any instance.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### ack

`boolean`

optional is command(false) or status(true)

###### callback?

[`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setForeignState**(`id`, `state`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10244](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10244)

Writes value into states DB for any instance.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setForeignState**(`id`, `state`, `ack`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10259](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10259)

Writes value into states DB for any instance.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### ack

`boolean`

optional is command(false) or status(true)

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

return result

##### Returns

`void`

***

### setForeignStateAsync()

#### Call Signature

> **setForeignStateAsync**(`id`, `state`, `ack?`): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L620)

Writes a value (which might not belong to this adapter) into the states DB.

##### Parameters

###### id

`string`

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

###### ack?

`boolean`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

#### Call Signature

> **setForeignStateAsync**(`id`, `state`, `options?`): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:632](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L632)

Writes a value (which might not belong to this adapter) into the states DB.

##### Parameters

###### id

`string`

object ID of the state

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

#### Call Signature

> **setForeignStateAsync**(`id`, `state`, `ack`, `options`): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L645)

Writes a value (which might not belong to this adapter) into the states DB.

##### Parameters

###### id

`string`

object ID of the state

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes

###### ack

`boolean`

is command(false) or status(true)

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

***

### setForeignStateChanged()

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Param

**id**

object ID of the state.

#### Param

**state**

simple value or object with attribues.
 If state is object and ack exists too as function argument, function argument has priority.
 ```js
     {
         val:    value,
         ack:    true|false,       // default - false; is command(false) or status(true)
         ts:     timestampMS,      // default - now
         q:      qualityAsNumber,  // default - 0 (ok)
         from:   origin,           // default - this adapter
         c:      comment,          // default - empty
         expire: expireInSeconds   // default - 0
         lc:     timestampMS       // default - automatic calculation
     }
 ```

#### Param

**ack**

optional is command(false) or status(true)

#### Param

**options**

optional user context

#### Param

**callback**

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

#### Call Signature

> **setForeignStateChanged**(`id`, `state`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10611](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10611)

Writes value into states DB for any instance only if the value really changed.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### callback?

[`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setForeignStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10624](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10624)

Writes value into states DB for any instance only if the value really changed.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### ack

`boolean`

optional is command(false) or status(true)

###### callback?

[`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setForeignStateChanged**(`id`, `state`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10638](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10638)

Writes value into states DB for any instance only if the value really changed.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setForeignStateChanged**(`id`, `state`, `ack`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10653](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10653)

Writes value into states DB for any instance only if the value really changed.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### ack

`boolean`

optional is command(false) or status(true)

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

return result

##### Returns

`void`

***

### setForeignStateChangedAsync()

#### Call Signature

> **setForeignStateChangedAsync**(`id`, `state`, `ack?`): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:469](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L469)

Writes a value (which might not belong to this adapter) into the states DB only if it has changed.

##### Parameters

###### id

`string`

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

###### ack?

`boolean`

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

#### Call Signature

> **setForeignStateChangedAsync**(`id`, `state`, `options?`): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:481](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L481)

Writes a value (which might not belong to this adapter) into the states DB only if it has changed.

##### Parameters

###### id

`string`

object ID of the state

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

#### Call Signature

> **setForeignStateChangedAsync**(`id`, `state`, `ack`, `options?`): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:494](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L494)

Writes a value (which might not belong to this adapter) into the states DB only if it has changed.

##### Parameters

###### id

`string`

object ID of the state

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes

###### ack

`boolean`

is command(false) or status(true)

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

***

### setInterval()

> **setInterval**\<`TCallback`\>(`cb`, `timeout`, ...`args`): [`Interval`](../-internal-/type-aliases/Interval.md) \| `undefined`

Defined in: [adapter/src/lib/adapter/adapter.ts:3348](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3348)

Same as setInterval, but it clears the running intervals during the unloading process

#### Type Parameters

##### TCallback

`TCallback` *extends* [`TimeoutCallback`](../-internal-/type-aliases/TimeoutCallback.md)

#### Parameters

##### cb

`TCallback`

interval callback

##### timeout

`number`

interval in milliseconds

##### args

...`Parameters`\<`TCallback`\>

as many arguments as needed, which will be passed to setInterval

#### Returns

[`Interval`](../-internal-/type-aliases/Interval.md) \| `undefined`

interval id

***

### setObject()

Creates or overwrites an object in objectDB.

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

#### Param

**id**

object ID, that must be overwritten or created.

#### Param

**obj**

new object

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

#### Call Signature

> **setObject**(`id`, `obj`): `Promise`\<\{ `id`: `string`; \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:3416](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3416)

Creates or overwrites an object in objectDB.

##### Parameters

###### id

`string`

object ID (without namespace)

###### obj

`Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object`

the object to write

##### Returns

`Promise`\<\{ `id`: `string`; \}\>

#### Call Signature

> **setObject**(`id`, `obj`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:3427](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3427)

Creates or overwrites an object in objectDB.

##### Parameters

###### id

`string`

object ID (without namespace)

###### obj

`Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object`

the object to write

###### callback

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setObject**(`id`, `obj`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:3436](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3436)

Creates or overwrites an object in objectDB.

##### Parameters

###### id

`string`

object ID (without namespace)

###### obj

`Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object`

the object to write

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setObject**(`id`, `obj`, `options?`): `Promise`\<\{ `id`: `string`; \}\>

Defined in: [adapter/src/lib/adapter/adapter.ts:3449](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3449)

Creates or overwrites an object in objectDB.

##### Parameters

###### id

`string`

object ID (without namespace)

###### obj

`Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object`

the object to write

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

##### Returns

`Promise`\<\{ `id`: `string`; \}\>

***

### ~~setObjectAsync()~~

> **setObjectAsync**(`id`, `obj`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:430](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L430)

Creates or overwrites an object in the object db

#### Parameters

##### id

`string`

##### obj

`Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Deprecated

use `adapter.setObject` without a callback instead

***

### setObjectNotExists()

Same as [AdapterClass.setObject](#setobject), but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Param

**id**

object ID, that must be overwritten or created.

#### Param

**obj**

new object

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

#### Call Signature

> **setObjectNotExists**(`id`, `obj`, `callback?`): `void` \| `Promise`\<`void` \| \{ `id`: `string`; \} \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:6002](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6002)

Same as [AdapterClass.setObject](#setobject), but with check if the object exists.

##### Parameters

###### id

`string`

object ID, that must be overwritten or created.

###### obj

`Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object`

new object

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void` \| `Promise`\<`void` \| \{ `id`: `string`; \} \| `undefined`\>

#### Call Signature

> **setObjectNotExists**(`id`, `obj`, `options?`, `callback?`): `void` \| `Promise`\<`void` \| \{ `id`: `string`; \} \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:6015](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L6015)

Same as [AdapterClass.setObject](#setobject), but with check if the object exists.

##### Parameters

###### id

`string`

object ID, that must be overwritten or created.

###### obj

`Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object`

new object

###### options?

\{ `preserve?`: \{\[`key`: `string`\]: `boolean`; \}; `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

return result

##### Returns

`void` \| `Promise`\<`void` \| \{ `id`: `string`; \} \| `undefined`\>

***

### setObjectNotExistsAsync()

> **setObjectNotExistsAsync**(`id`, `obj`, `options?`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L245)

Creates an object in the object db. Existing objects are not overwritten.

#### Parameters

##### id

`string`

##### obj

`Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

***

### setPassword()

sets the user's password

#### Param

**user**

user name as text

#### Param

**pw**

password as text

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot set password: ' + err);
           }
       ```

#### Call Signature

> **setPassword**(`user`, `pw`, `options`, `callback?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2261](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2261)

Sets the user's password

##### Parameters

###### user

`string`

user name as text

###### pw

`string`

password as text

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **setPassword**(`user`, `pw`, `callback?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:2275](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2275)

Sets the user's password

##### Parameters

###### user

`string`

user name as text

###### pw

`string`

password as text

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

##### Returns

`Promise`\<`void`\>

***

### setPasswordAsync()

> **setPasswordAsync**(`user`, `password`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:412](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L412)

Sets a new password for the given user

#### Parameters

##### user

`string`

##### password

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### setSession()

> **setSession**(`id`, `ttl`, `data`, `callback?`): [`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:1788](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1788)

Store a session in the states DB

#### Parameters

##### id

`string`

the session id

##### ttl

`number`

time to live in seconds

##### data

[`Session`](../-internal-/type-aliases/Session.md)

the session data to store

##### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

return result

#### Returns

[`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

***

### setState()

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Param

**id**

object ID of the state.

#### Param

**state**

simple value or object with attributes.
 If state is object and ack exists too as function argument, function argument has priority.
 ```js
     {
         val:    value,
         ack:    true|false,       // default - false; is command(false) or status(true)
         ts:     timestampMS,      // default - now
         q:      qualityAsNumber,  // default - 0 (ok)
         from:   origin,           // default - this adapter
         c:      comment,          // default - empty
         expire: expireInSeconds   // default - 0
         lc:     timestampMS       // default - automatic calculation
     }
 ```

#### Param

**ack**

optional is command(false) or status(true)

#### Param

**options**

optional user context

#### Param

**callback**

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

#### Call Signature

> **setState**\<`T`\>(`id`, `state`, `callback?`): `T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:9287](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9287)

Writes value into states DB.

##### Type Parameters

###### T

`T` *extends* [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md) \| `undefined`

##### Parameters

###### id

`string` \| [`IdObject`](../-internal-/interfaces/IdObject.md)

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### callback?

`T`

return result

##### Returns

`T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

#### Call Signature

> **setState**\<`T`\>(`id`, `state`, `ack`, `callback?`): `T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:9300](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9300)

Writes value into states DB.

##### Type Parameters

###### T

`T` *extends* [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md) \| `undefined`

##### Parameters

###### id

`string` \| [`IdObject`](../-internal-/interfaces/IdObject.md)

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### ack

`boolean`

optional is command(false) or status(true)

###### callback?

`T`

return result

##### Returns

`T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

#### Call Signature

> **setState**\<`T`\>(`id`, `state`, `options?`, `callback?`): `T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:9314](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9314)

Writes value into states DB.

##### Type Parameters

###### T

`T` *extends* [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md) \| `undefined`

##### Parameters

###### id

`string` \| [`IdObject`](../-internal-/interfaces/IdObject.md)

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

`T`

return result

##### Returns

`T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

#### Call Signature

> **setState**\<`T`\>(`id`, `state`, `ack`, `options?`, `callback?`): `T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:9329](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L9329)

Writes value into states DB.

##### Type Parameters

###### T

`T` *extends* [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md) \| `undefined`

##### Parameters

###### id

`string` \| [`IdObject`](../-internal-/interfaces/IdObject.md)

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### ack

`boolean`

optional is command(false) or status(true)

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

`T`

return result

##### Returns

`T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

***

### ~~setStateAsync()~~

#### Call Signature

> **setStateAsync**(`id`, `state`, `ack?`): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L598)

Writes a value into the states DB.

##### Parameters

###### id

`string`

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

###### ack?

`boolean`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Deprecated

use `adapter.setState` without callback instead

#### Call Signature

> **setStateAsync**(`id`, `state`, `options`): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:604](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L604)

##### Parameters

###### id

`string`

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Deprecated

use `adapter.setState` without callback instead

#### Call Signature

> **setStateAsync**(`id`, `state`, `ack`, `options`): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:610](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L610)

##### Parameters

###### id

`string`

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

###### ack

`boolean`

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Deprecated

use `adapter.setState` without callback instead

***

### setStateChanged()

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Param

**id**

object ID of the state.

#### Param

**state**

simple value or object with attribues.

#### Param

**ack**

optional is command(false) or status(true)

#### Param

**options**

optional user context

#### Param

**callback**

optional return error, id and notChanged
       ```js
           function (err, id, notChanged) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
             if (!notChanged) adapter.log.debug('Value was changed');
           }
       ```

#### Call Signature

> **setStateChanged**(`id`, `state`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10044](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10044)

Writes value into states DB only if the value really changed.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### callback?

[`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setStateChanged**(`id`, `state`, `ack`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10057](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10057)

Writes value into states DB only if the value really changed.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### ack

`boolean`

optional is command(false) or status(true)

###### callback?

[`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setStateChanged**(`id`, `state`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10071](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10071)

Writes value into states DB only if the value really changed.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **setStateChanged**(`id`, `state`, `ack`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:10086](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L10086)

Writes value into states DB only if the value really changed.

##### Parameters

###### id

`string`

object ID of the state.

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes.

###### ack

`boolean`

optional is command(false) or status(true)

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

return result

##### Returns

`void`

***

### setStateChangedAsync()

#### Call Signature

> **setStateChangedAsync**(`id`, `state`, `ack?`): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:504](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L504)

Writes a value into the states DB only if it has changed.

##### Parameters

###### id

`string`

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

###### ack?

`boolean`

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

#### Call Signature

> **setStateChangedAsync**(`id`, `state`, `options?`): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L516)

Writes a value into the states DB only if it has changed.

##### Parameters

###### id

`string`

object ID of the state

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

#### Call Signature

> **setStateChangedAsync**(`id`, `state`, `ack`, `options?`): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:529](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L529)

Writes a value into the states DB only if it has changed.

##### Parameters

###### id

`string`

object ID of the state

###### state

[`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

simple value or object with attributes

###### ack

`boolean`

is command(false) or status(true)

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

***

### setTimeout()

> **setTimeout**\<`TCallback`\>(`cb`, `timeout`, ...`args`): [`Timeout`](../-internal-/type-aliases/Timeout.md) \| `undefined`

Defined in: [adapter/src/lib/adapter/adapter.ts:3237](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3237)

Same as setTimeout, but it clears the running timers during the unloading process

#### Type Parameters

##### TCallback

`TCallback` *extends* [`TimeoutCallback`](../-internal-/type-aliases/TimeoutCallback.md)

#### Parameters

##### cb

`TCallback`

timer callback

##### timeout

`number`

timeout in milliseconds

##### args

...`Parameters`\<`TCallback`\>

as many arguments as needed, which will be passed to setTimeout

#### Returns

[`Timeout`](../-internal-/type-aliases/Timeout.md) \| `undefined`

timer id

***

### subscribeForeignFiles()

> **subscribeForeignFiles**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:5936](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5936)

Subscribe for the changes of files in specific instance.

#### Parameters

##### id

`string`

adapter ID like 'vis-2.0' or 'vis-2.admin'

##### pattern

`string` \| `string`[]

pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns

##### options?

`unknown`

optional user context

#### Returns

`Promise`\<`void`\>

***

### subscribeForeignObjects()

Subscribe for the changes of objects in any instance.

#### Param

**pattern**

pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns

#### Param

**options**

optional user context

#### Param

**callback**

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot subscribe object: ' + err);
           }
       ```

#### Call Signature

> **subscribeForeignObjects**(`pattern`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5824](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5824)

Subscribe for the changes of objects in any instance.

##### Parameters

###### pattern

`string` \| `string`[]

pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional returns result

##### Returns

`void`

#### Call Signature

> **subscribeForeignObjects**(`pattern`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5832](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5832)

Subscribe for the changes of objects in any instance.

##### Parameters

###### pattern

`string` \| `string`[]

pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional returns result

##### Returns

`void`

***

### subscribeForeignObjectsAsync()

> **subscribeForeignObjectsAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L235)

Subscribe to changes of objects (which might not belong to this adapter)

#### Parameters

##### pattern

`string` \| `string`[]

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### subscribeForeignStates()

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
```js
    adapter.subscribeForeignStates('adapterName.X.*');
```

#### Param

**pattern**

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

#### Param

**options**

optional argument to describe the user context

#### Param

**callback**

return result ```function (err) {}```

#### Call Signature

> **subscribeForeignStates**(`pattern`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11673](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11673)

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional callback

##### Returns

`void`

#### Call Signature

> **subscribeForeignStates**(`pattern`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11681](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11681)

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional argument to describe the user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional callback

##### Returns

`void`

***

### subscribeForeignStatesAsync()

> **subscribeForeignStatesAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L386)

Subscribe to changes of states (which might not belong to this adapter)

#### Parameters

##### pattern

`string` \| `string`[]

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### subscribeObjects()

Subscribe for the changes of objects in this instance.

#### Param

**pattern**

pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces

#### Param

**options**

optional user context

#### Param

**callback**

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot subscribe object: ' + err);
           }
       ```

#### Call Signature

> **subscribeObjects**(`pattern`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5717](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5717)

Subscribe for the changes of objects in this instance.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional returns result

##### Returns

`void`

#### Call Signature

> **subscribeObjects**(`pattern`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5725](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5725)

Subscribe for the changes of objects in this instance.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional returns result

##### Returns

`void`

***

### subscribeObjectsAsync()

> **subscribeObjectsAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L229)

Subscribe to changes of objects in this instance

#### Parameters

##### pattern

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### subscribeStates()

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
```

#### Param

**pattern**

string in form 'adapter.0.*' or like this. Only string allowed

#### Param

**options**

optional argument to describe the user context

#### Param

**callback**

optional callback

#### Call Signature

> **subscribeStates**(`pattern`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11805](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11805)

Subscribe for changes on all states of this instance, that pass the pattern

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*' or like this. Only string allowed

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional callback

##### Returns

`void`

#### Call Signature

> **subscribeStates**(`pattern`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11813](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11813)

Subscribe for changes on all states of this instance, that pass the pattern

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*' or like this. Only string allowed

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional argument to describe the user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional callback

##### Returns

`void`

***

### subscribeStatesAsync()

> **subscribeStatesAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:396](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L396)

Subscribe to changes of states in this instance

#### Parameters

##### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### supportsFeature()

> **supportsFeature**(`featureName`): `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:2062](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L2062)

Method to check for available Features for adapter development

#### Parameters

##### featureName

[`SupportedFeature`](../-internal-/type-aliases/SupportedFeature.md)

the name of the feature to check

#### Returns

`boolean`

true/false if the feature is in the list of supported features

***

### terminate()

stops the execution of adapter, but not disables it.

Sometimes, the adapter must be stopped if some libraries are missing.

#### Param

**reason**

optional termination description

#### Param

**exitCode**

optional exit code

#### Call Signature

> **terminate**(`exitCode?`): `never`

Defined in: [adapter/src/lib/adapter/adapter.ts:1873](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1873)

Stops the execution of adapter, but does not disable it.

##### Parameters

###### exitCode?

`number`

optional exit code

##### Returns

`never`

#### Call Signature

> **terminate**(`reason?`, `exitCode?`): `never`

Defined in: [adapter/src/lib/adapter/adapter.ts:1880](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1880)

Stops the execution of adapter, but does not disable it.

##### Parameters

###### reason?

`string`

optional reason for termination

###### exitCode?

`number`

optional exit code

##### Returns

`never`

***

### uninstallNodeModule()

> **uninstallNodeModule**(`moduleName`): `Promise`\<`CommandResult`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:1639](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L1639)

Uninstall specified npm module

#### Parameters

##### moduleName

`string`

name of the node module

#### Returns

`Promise`\<`CommandResult`\>

***

### unlink()

Deletes a file in the DB.

#### Param

**\_adapter**

adapter name, or null for the current adapter

#### Param

**name**

path to the file

#### Param

**options**

optional user context

#### Param

**callback**

return result

#### Call Signature

> **unlink**(`adapterName`, `path`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8208](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8208)

Deletes a file in the DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the file

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **unlink**(`adapterName`, `path`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8217](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8217)

Deletes a file in the DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the file

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

***

### unlinkAsync()

> **unlinkAsync**(`adapterName`, `path`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L311)

Deletes a given file

#### Parameters

##### adapterName

`string` \| `null`

##### path

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### unsubscribeForeignFiles()

> **unsubscribeForeignFiles**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:5967](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5967)

Unsubscribe for the changes of files on specific instance.

#### Parameters

##### id

`string`

adapter ID like 'vis-2.0' or 'vis-2.admin'

##### pattern

`string` \| `string`[]

pattern like 'channel.*' or '*' (all objects) - without namespaces

##### options?

`unknown`

optional user context

#### Returns

`Promise`\<`void`\>

***

### unsubscribeForeignObjects()

Unsubscribe for the patterns on all objects.

#### Param

**pattern**

pattern like 'channel.*' or '*' (all objects) - without namespaces

#### Param

**options**

optional user context

#### Param

**callback**

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
           }
       ```

#### Call Signature

> **unsubscribeForeignObjects**(`pattern`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5878](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5878)

Unsubscribe for the patterns on all objects.

##### Parameters

###### pattern

`string` \| `string`[]

pattern like 'channel.*' or '*' (all objects) - without namespaces

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional returns result

##### Returns

`void`

#### Call Signature

> **unsubscribeForeignObjects**(`pattern`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5886](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5886)

Unsubscribe for the patterns on all objects.

##### Parameters

###### pattern

`string` \| `string`[]

pattern like 'channel.*' or '*' (all objects) - without namespaces

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional returns result

##### Returns

`void`

***

### unsubscribeForeignObjectsAsync()

> **unsubscribeForeignObjectsAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L240)

Unsubscribe from changes of objects (which might not belong to this adapter)

#### Parameters

##### pattern

`string` \| `string`[]

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### unsubscribeForeignStates()

Unsubscribe for changes for given pattern

This function allows to unsubscribe from changes. The pattern must be equal to requested one.
```js
    adapter.subscribeForeignStates('adapterName.X.*');
    adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
    adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
```

#### Param

**pattern**

string in form 'adapter.0.*'. Must be the same as subscribe.

#### Param

**options**

optional argument to describe the user context

#### Param

**callback**

return result
```js
function (err) {}
```

#### Call Signature

> **unsubscribeForeignStates**(`pattern`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11736](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11736)

Unsubscribe for changes for given pattern

##### Parameters

###### pattern

`string` \| `string`[]

string in form 'adapter.0.*'. Must be the same as subscribe.

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional callback

##### Returns

`void`

#### Call Signature

> **unsubscribeForeignStates**(`pattern`, `options`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11744](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11744)

Unsubscribe for changes for given pattern

##### Parameters

###### pattern

`string` \| `string`[]

string in form 'adapter.0.*'. Must be the same as subscribe.

###### options

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional argument to describe the user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional callback

##### Returns

`void`

***

### unsubscribeForeignStatesAsync()

> **unsubscribeForeignStatesAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:391](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L391)

Subscribe from changes of states (which might not belong to this adapter)

#### Parameters

##### pattern

`string` \| `string`[]

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### unsubscribeObjects()

Unsubscribe on the changes of objects in this instance.

#### Param

**pattern**

pattern like 'channel.*' or '*' (all objects) - without namespaces

#### Param

**options**

optional user context

#### Param

**callback**

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
           }
       ```

#### Call Signature

> **unsubscribeObjects**(`pattern`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5770](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5770)

Unsubscribe on the changes of objects in this instance.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

pattern like 'channel.*' or '*' (all objects) - without namespaces

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional returns result

##### Returns

`void`

#### Call Signature

> **unsubscribeObjects**(`pattern`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5778](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L5778)

Unsubscribe on the changes of objects in this instance.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

pattern like 'channel.*' or '*' (all objects) - without namespaces

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional returns result

##### Returns

`void`

***

### unsubscribeObjectsAsync()

> **unsubscribeObjectsAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:231](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L231)

Unsubscribe from changes of objects in this instance

#### Parameters

##### pattern

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### unsubscribeStates()

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

```js
    adapter.unsubscribeStates('abc*'); // This will not work
    adapter.unsubscribeStates('*');    // Valid unsubscribe
```

#### Param

**pattern**

string in form 'adapter.0.*'. Must be the same as subscribe.

#### Param

**options**

optional argument to describe the user context

#### Param

**callback**

optional callback

#### Call Signature

> **unsubscribeStates**(`pattern`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11861](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11861)

Unsubscribe for changes for given pattern for own states.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*'. Must be the same as subscribe.

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional callback

##### Returns

`void`

#### Call Signature

> **unsubscribeStates**(`pattern`, `options?`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:11869](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L11869)

Unsubscribe for changes for given pattern for own states.

##### Parameters

###### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

string in form 'adapter.0.*'. Must be the same as subscribe.

###### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

optional argument to describe the user context

###### callback?

[`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

optional callback

##### Returns

`void`

***

### unsubscribeStatesAsync()

> **unsubscribeStatesAsync**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:398](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L398)

Subscribe from changes of states in this instance

#### Parameters

##### pattern

[`Pattern`](../-internal-/type-aliases/Pattern.md)

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`void`\>

***

### updateConfig()

> **updateConfig**(`newConfig`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:3079](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L3079)

Updates the adapter config with new values, merged with the existing config.

#### Parameters

##### newConfig

`Record`\<`string`, `any`\>

the new configuration values to merge into the existing config

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

***

### writeFile()

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
```js
     adapter.writeFile('vis-2.0', '/main/vis-views.json', data, function (err) {
       err && adapter.log.error('Cannot write file: ' + err);
     });
```

#### Param

**\_adapter**

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

**filename**

path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

#### Param

**data**

data as UTF8 string or buffer depends on the file extension.

#### Param

**options**

optional user context

#### Param

**callback**

return result
       ```js
           function (err) {

           }
       ```

#### Call Signature

> **writeFile**(`adapterName`, `path`, `data`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8454](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8454)

Write file to DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the file

###### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

data to write

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **writeFile**(`adapterName`, `path`, `data`, `options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8464](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L8464)

Write file to DB.

##### Parameters

###### adapterName

`string` \| `null`

adapter name, or null for the current adapter

###### path

`string`

path to the file

###### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

data to write

###### options

\{ `group?`: `` `system.group.${string}` ``; `mimeType?`: `string`; `mode?`: `number`; `user?`: `` `system.user.${string}` ``; `virtualFile?`: `boolean`; \} \| `null`

optional user context

###### callback

[`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

return result

##### Returns

`void`

***

### writeFileAsync()

> **writeFileAsync**(`adapterName`, `path`, `data`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:346](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/adapter/adapter.ts#L346)

Writes a file into the DB

#### Parameters

##### adapterName

`string` \| `null`

##### path

`string`

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

##### options?

\{ `group?`: `` `system.group.${string}` ``; `mimeType?`: `string`; `mode?`: `number`; `user?`: `` `system.user.${string}` ``; `virtualFile?`: `boolean`; \} \| `null`

#### Returns

`Promise`\<`void`\>
