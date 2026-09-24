[**@iobroker/js-controller-adapter**](../README.md)

***

[@iobroker/js-controller-adapter](../globals.md) / AdapterClass

# Class: AdapterClass

Defined in: [adapter/src/lib/adapter/adapter.ts:148](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L148)

Adapter class

How the initialization happens:
 _initObjects => _initStates => _prepareInitAdapter => _initAdapter => _initLogging => _createInstancesObjects => ready

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new AdapterClass**(`options`): `AdapterClass`

Defined in: [adapter/src/lib/adapter/adapter.ts:1045](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1045)

#### Parameters

##### options

`string` \| [`AdapterOptions`](../-internal-/interfaces/AdapterOptions.md)

Adapter options, or the adapter name as a string

#### Returns

`AdapterClass`

## Properties

### adapterConfig?

> `optional` **adapterConfig?**: [`InstanceObject`](../-internal-/interfaces/InstanceObject.md) \| [`AdapterOptions`](../-internal-/interfaces/AdapterOptions.md) \| `null`

Defined in: [adapter/src/lib/adapter/adapter.ts:955](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L955)

contents of io-package.json

***

### adapterDir

> **adapterDir**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:957](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L957)

***

### adapterReady

> **adapterReady**: `boolean` = `false`

Defined in: [adapter/src/lib/adapter/adapter.ts:906](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L906)

***

### common?

> `optional` **common?**: [`InstanceCommon`](../-internal-/interfaces/InstanceCommon.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:979](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L979)

***

### config

> **config**: [`AdapterConfig`](../-internal-/interfaces/AdapterConfig.md) = `{}`

Defined in: [adapter/src/lib/adapter/adapter.ts:977](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L977)

***

### connected?

> `optional` **connected?**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L956)

***

### constants

> `readonly` **constants**: `object`

Defined in: [adapter/src/lib/adapter/adapter.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1000)

Constants for frequent use in adapters

#### STATE\_QUALITY

> **STATE\_QUALITY**: *typeof* [`STATE_QUALITY`](../-internal-/enumerations/STATE_QUALITY.md)

***

### dateFormat?

> `optional` **dateFormat?**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L967)

the configured date format of system.config, only available if requested via AdapterOptions `useFormatDate`

***

### FORBIDDEN\_CHARS

> `readonly` **FORBIDDEN\_CHARS**: `RegExp`

Defined in: [adapter/src/lib/adapter/adapter.ts:939](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L939)

A RegExp to test for forbidden chars in object IDs

***

### host?

> `optional` **host?**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:978](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L978)

***

### instance?

> `optional` **instance?**: `number`

Defined in: [adapter/src/lib/adapter/adapter.ts:951](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L951)

***

### ioPack

> **ioPack**: [`InstanceObject`](../-internal-/interfaces/InstanceObject.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L961)

contents of io-package.json

***

### isFloatComma?

> `optional` **isFloatComma?**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L969)

if float comma instead of dot is used, only available if requested via AdapterOptions `useFormatDate`

***

### language?

> `optional` **language?**: [`Languages`](../-internal-/type-aliases/Languages.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:971](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L971)

configured language of system.config, only available if requested via AdapterOptions `useFormatDate`

***

### latitude?

> `optional` **latitude?**: `number`

Defined in: [adapter/src/lib/adapter/adapter.ts:975](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L975)

latitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

***

### log

> **log**: [`Log`](../-internal-/classes/Log.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L923)

For ease of use the log property is always defined, however it is only available after `ready` has been called.

***

### longitude?

> `optional` **longitude?**: `number`

Defined in: [adapter/src/lib/adapter/adapter.ts:973](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L973)

longitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

***

### name

> **name**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:930](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L930)

***

### namespace

> **namespace**: `` `${string}.${number}` ``

Defined in: [adapter/src/lib/adapter/adapter.ts:929](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L929)

***

### oObjects?

> `optional` **oObjects?**: `Record`\<`string`, [`Object`](../-internal-/type-aliases/Object.md) \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L916)

Contains a live cache of the adapter's objects.
NOTE: This is only defined if the adapter was initialized with the option objects: true.

***

### oStates?

> `optional` **oStates?**: `Record`\<`string`, [`State`](../-internal-/interfaces/State.md) \| `undefined`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L911)

Contains a live cache of the adapter's states.
NOTE: This is only defined if the adapter was initialized with the option states: true.

***

### pack?

> `optional` **pack?**: `Record`\<`string`, `any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:959](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L959)

contents of package.json

***

### performStrictObjectChecks

> **performStrictObjectChecks**: `boolean`

Defined in: [adapter/src/lib/adapter/adapter.ts:924](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L924)

***

### processLog?

> `optional` **processLog?**: (`msg`) => `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:985](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L985)

#### Parameters

##### msg

[`LogMessage`](../-internal-/interfaces/LogMessage.md)

#### Returns

`void`

***

### requireLog?

> `optional` **requireLog?**: (`isActive`, `options?`) => `void` \| `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L994)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:981](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L981)

Stop the adapter

#### Parameters

##### params?

[`StopParameters`](../-internal-/interfaces/StopParameters.md)

#### Returns

`Promise`\<`void`\>

***

### systemConfig?

> `optional` **systemConfig?**: [`InternalAdapterJsonConfig`](../-internal-/interfaces/InternalAdapterJsonConfig.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L965)

contents of iobroker.json if required via AdapterOptions

***

### version?

> `optional` **version?**: `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:982](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L982)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6747](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6747)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6764](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6764)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:255](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L255)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7612](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7612)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7631](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7631)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:274](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L274)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2472](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2472)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2485](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2485)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:415](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L415)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2369](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2369)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2382](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2382)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:413](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L413)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2080](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2080)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2093](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2093)

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

> **checkPasswordAsync**(`user`, `password`, `options?`): `Promise`\<\[`boolean`, `` `system.user.${string}` ``\]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:401](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L401)

Validates username and password

#### Parameters

##### user

`string`

##### password

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<\[`boolean`, `` `system.user.${string}` ``\]\>

***

### checkUsedResource()

> **checkUsedResource**\<`T`\>(`type`, `data?`): `Promise`\<[`RegisteredResource`](../-internal-/type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../-internal-/interfaces/UsedResourceDataMap.md)\>[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9147](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9147)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7959](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7959)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7973](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7973)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:291](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L291)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8026](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8026)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8047](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8047)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:298](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L298)

Changes the owner of all files in the adapter directory

#### Parameters

##### args

...`any`[]

#### Returns

`Promise`\<`any`\>

***

### clearInterval()

> **clearInterval**(`interval`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:3379](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3379)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3273](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3273)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9163](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9163)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6321](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6321)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6323](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6323)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6330](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6330)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6338](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6338)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L702)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L708)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L715)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6228](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6228)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6230](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6230)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6236](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6236)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6243](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6243)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L682)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L684)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L690)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6430](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6430)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6437](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6437)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6445](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6445)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6454](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6454)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L728)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L735)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L743)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1675](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1675)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1681](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1681)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3298](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3298)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7050](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7050)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7052](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7052)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7054](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7054)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:757](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L757)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:759](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L759)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6918](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6918)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6933](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6933)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:263](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L263)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6662](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6662)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6664](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6664)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L253)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7166](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7166)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7168](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7168)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7170](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7170)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:770](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L770)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L772)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:778](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L778)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7800](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7800)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7817](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7817)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:283](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L283)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:570](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L570)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:579](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L579)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:312](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L312)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5583](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5583)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5591](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5591)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L222)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11149](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11149)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11157](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11157)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L372)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5506](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5506)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5514](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5514)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L220)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11084](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11084)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11092](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11092)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L370)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1814](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1814)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3121](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3121)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1707](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1707)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1713](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1713)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4176](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4176)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4187](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4187)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4200](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4200)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4213](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4213)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L186)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3751](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3751)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3759](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3759)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3767](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3767)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3780](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3780)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L172)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8520](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8520)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8528](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8528)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8537](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8537)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:354](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L354)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5306](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5306)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5315](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5315)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5389](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5389)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4450](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4450)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8645](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8645)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8653](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8653)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8590](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8590)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8598](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8598)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9181](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9181)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3663](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3663)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:453](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L453)

Get all states, channels, devices and folders of this adapter

#### Returns

`Promise`\<`Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

***

### getAdapterScopedPackageIdentifier()

> **getAdapterScopedPackageIdentifier**(`moduleName`): `string`

Defined in: [adapter/src/lib/adapter/adapter.ts:1579](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1579)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2986](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2986)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:447](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L447)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2962](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2962)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:803](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L803)

Returns a list of all channels in this adapter instance

##### Parameters

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

##### Returns

`void`

#### Call Signature

> **getChannels**(`parentDevice`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:810](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L810)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:818](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L818)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:828](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L828)

Returns a list of all channels in this adapter instance parentDevice (optional)
Name of the parent device to filter the channels by options (optional) Some internal options.

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

#### Call Signature

> **getChannelsAsync**(`parentDevice`, `options?`): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:835](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L835)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7365](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7365)

Get all channels of this adapter or of the given device.

##### Parameters

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getChannelsOf**(`parentDevice`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7372](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7372)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7380](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7380)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L788)

Returns a list of all channels in this adapter instance

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

#### Call Signature

> **getChannelsOfAsync**(`parentDevice`, `options?`): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:795](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L795)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7291](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7291)

Get all devices of this adapter.

##### Parameters

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getDevices**(`options`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7298](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7298)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:271](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L271)

Returns a list of all devices in this adapter instance

#### Parameters

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)[]\>

***

### getEncryptedConfig()

> **getEncryptedConfig**(`attribute`, `callback?`): `Promise`\<`string` \| `void` \| `string`[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:3147](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3147)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4746](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4746)

Get the enum tree.

##### Parameters

###### callback

[`GetEnumCallback`](../-internal-/type-aliases/GetEnumCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getEnum**(`name`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4753](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4753)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4761](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4761)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:210](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L210)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4857](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4857)

Read the members of given enums.

##### Parameters

###### callback

[`GetEnumsCallback`](../-internal-/type-aliases/GetEnumsCallback.md)

return result

##### Returns

`void`

#### Call Signature

> **getEnums**(`enumList`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:4864](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4864)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4872](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4872)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:215](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L215)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5418](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5418)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5426](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5426)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:456](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L456)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5024](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5024)

Get all objects matching the given pattern.

##### Parameters

###### patter

[`Pattern`](../-internal-/type-aliases/Pattern.md)

the pattern to match object ids against

##### Returns

`Promise`\<`Record`\<`string`, [`AnyObject`](../-internal-/type-aliases/AnyObject.md) \| `null`\>\>

#### Call Signature

> **getForeignObjects**(`pattern`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:5031](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5031)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5039](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5039)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5051](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5051)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5064](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5064)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5078](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5078)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5093](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5093)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L648)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:661](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L661)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L672)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10717](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10717)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10725](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10725)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:399](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L399)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11383](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11383)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11391](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11391)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L376)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10924](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10924)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10931](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10931)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L361)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9201](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9201)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9207](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9207)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4483](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4483)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4491](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4491)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:192](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L192)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4676](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4676)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4687](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4687)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L205)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4545](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4545)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4560](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4560)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:198](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L198)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11813](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11813)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11789](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11789)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1971](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1971)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1978](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1978)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:397](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L397)

Helper function that looks for the first free TCP port starting with the given one.

#### Parameters

##### port

`number`

#### Returns

`Promise`\<`number`\>

***

### getSession()

> **getSession**(`id`, `callback`): [`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

Defined in: [adapter/src/lib/adapter/adapter.ts:1740](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1740)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10665](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10665)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10673](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10673)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:228](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L228)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11229](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11229)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11237](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11237)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:374](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L374)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7461](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7461)

Get all states of this adapter or of the given device/channel.

##### Parameters

###### callback

[`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

return result

##### Returns

`void`

#### Call Signature

> **getStatesOf**(`parentDevice`, `callback`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:7468](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7468)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7476](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7476)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:7489](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L7489)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:843](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L843)

Returns a list of all states in this adapter instance

##### Returns

`Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

#### Call Signature

> **getStatesOfAsync**(`parentDevice`, `parentChannel?`): `Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

Defined in: [adapter/src/lib/adapter/adapter.ts:850](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L850)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:858](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L858)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11837](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11837)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2209](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2209)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11043](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11043)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1652](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1652)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1589](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1589)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1623](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1623)

List all additional installed node modules from this adapter

#### Returns

`Promise`\<`string`[]\>

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8311](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8311)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8320](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8320)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:325](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L325)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4417](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4417)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:150](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L150)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L152)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L154)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:156](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L156)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:158](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L158)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L160)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:162](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L162)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:164](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L164)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L166)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8111](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8111)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8120](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8120)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:300](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L300)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8369](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8369)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8378](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8378)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:335](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L335)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9090](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9090)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9125](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9125)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8252](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8252)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8262](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8262)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:318](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L318)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3052](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3052)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8820](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8820)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8834](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8834)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:551](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L551)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L560)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8948](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8948)

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

command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)

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

#### Call Signature

> **sendToHost**(`hostName`, `message`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8967](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8967)

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

> **sendToHost**(`hostName`, `command`, `message`, `callback?`): `void`

Defined in: [adapter/src/lib/adapter/adapter.ts:8980](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8980)

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

##### Returns

`void`

***

### sendToHostAsync()

#### Call Signature

> **sendToHostAsync**(`hostName`, `message`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L534)

Sends a message to a specific host or all hosts.

##### Parameters

###### hostName

`string`

###### message

`any`

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **sendToHostAsync**(`hostName`, `command`, `message`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L542)

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

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **sendToHostAsync**(`hostName`, `command`, `message?`): `any`

Defined in: [adapter/src/lib/adapter/adapter.ts:9057](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9057)

Async version of sendToHost

##### Parameters

###### hostName

`unknown`

name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts.

###### command

`unknown`

command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)

###### message?

`unknown`

object that will be given as argument for request

##### Returns

`any`

***

### sendToUI()

> **sendToUI**(`options`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/adapter.ts:9071](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9071)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L178)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4031](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4031)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4042](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4042)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4054](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4054)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:4067](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L4067)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:435](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L435)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6106](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6106)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6119](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6119)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:246](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L246)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10087](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10087)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10100](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10100)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10114](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10114)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10129](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10129)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L613)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L625)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L638)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10481](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10481)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10494](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10494)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10508](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10508)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:10523](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L10523)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:464](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L464)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L476)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L489)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3335](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3335)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3403](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3403)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3414](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3414)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3423](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3423)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3436](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3436)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:425](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L425)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5989](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5989)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:6002](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L6002)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L240)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2248](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2248)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2262](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2262)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:407](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L407)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1775](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1775)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9225](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9225)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9238](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9238)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9252](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9252)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9267](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9267)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L591)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L597)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:603](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L603)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9914](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9914)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9927](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9927)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9941](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9941)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:9956](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L9956)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:499](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L499)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:511](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L511)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:524](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L524)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3224](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3224)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5923](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5923)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5811](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5811)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5819](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5819)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L230)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11543](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11543)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11551](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11551)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L381)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5704](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5704)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5712](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5712)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:224](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L224)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11675](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11675)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11683](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11683)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:391](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L391)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:2049](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L2049)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1860](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1860)

Stops the execution of adapter, but does not disable it.

##### Parameters

###### exitCode?

`number`

optional exit code

##### Returns

`never`

#### Call Signature

> **terminate**(`reason?`, `exitCode?`): `never`

Defined in: [adapter/src/lib/adapter/adapter.ts:1867](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1867)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:1632](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L1632)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8195](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8195)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8204](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8204)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L306)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5954](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5954)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5865](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5865)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5873](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5873)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L235)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11606](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11606)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11614](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11614)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L386)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5757](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5757)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:5765](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L5765)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L226)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11731](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11731)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:11739](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L11739)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:393](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L393)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:3066](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L3066)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8441](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8441)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:8451](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L8451)

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

Defined in: [adapter/src/lib/adapter/adapter.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/adapter.ts#L341)

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
