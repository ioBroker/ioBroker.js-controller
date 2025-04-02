[**@iobroker/js-controller-adapter**](../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../globals.md) / AdapterClass

# Class: AdapterClass

Adapter class

How the initialization happens:
 _initObjects => _initStates => _prepareInitAdapter => _initAdapter => _initLogging => _createInstancesObjects => ready

## Extends

- `EventEmitter`

## Constructors

### new AdapterClass()

> **new AdapterClass**(`options`): [`AdapterClass`](AdapterClass.md)

#### Parameters

• **options**: `string` \| [`AdapterOptions`](../-internal-/interfaces/AdapterOptions.md)

#### Returns

[`AdapterClass`](AdapterClass.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:770](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L770)

## Properties

### adapterConfig?

> `optional` **adapterConfig**: `null` \| [`AdapterOptions`](../-internal-/interfaces/AdapterOptions.md) \| [`InstanceObject`](../-internal-/interfaces/InstanceObject.md)

contents of io-package.json

#### Defined in

[adapter/src/lib/adapter/adapter.ts:714](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L714)

***

### adapterDir

> **adapterDir**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:716](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L716)

***

### adapterReady

> **adapterReady**: `boolean` = `false`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:662](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L662)

***

### common?

> `optional` **common**: [`InstanceCommon`](../-internal-/interfaces/InstanceCommon.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L739)

***

### config

> **config**: [`AdapterConfig`](../-internal-/interfaces/AdapterConfig.md) = `{}`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:737](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L737)

***

### connected?

> `optional` **connected**: `boolean`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L715)

***

### constants

> `readonly` **constants**: `object`

Constants for frequent use in adapters

#### STATE\_QUALITY

> **STATE\_QUALITY**: *typeof* [`STATE_QUALITY`](../-internal-/enumerations/STATE_QUALITY.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:761](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L761)

***

### dateFormat?

> `optional` **dateFormat**: `any`

the configured date format of system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:726](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L726)

***

### FORBIDDEN\_CHARS

> `readonly` **FORBIDDEN\_CHARS**: `RegExp`

A RegExp to test for forbidden chars in object IDs

#### Defined in

[adapter/src/lib/adapter/adapter.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L696)

***

### host?

> `optional` **host**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:738](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L738)

***

### instance?

> `optional` **instance**: `number`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L710)

***

### ioPack

> **ioPack**: [`InstanceObject`](../-internal-/interfaces/InstanceObject.md)

contents of io-package.json

#### Defined in

[adapter/src/lib/adapter/adapter.ts:720](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L720)

***

### isFloatComma?

> `optional` **isFloatComma**: `boolean`

if float comma instead of dot is used, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L728)

***

### language?

> `optional` **language**: [`Languages`](../-internal-/type-aliases/Languages.md)

configured language of system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:730](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L730)

***

### latitude?

> `optional` **latitude**: `number`

latitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:734](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L734)

***

### log

> **log**: [`Log`](../-internal-/classes/Log.md)

For ease of use the log property is always defined, however it is only available after `ready` has been called.

#### Defined in

[adapter/src/lib/adapter/adapter.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L682)

***

### longitude?

> `optional` **longitude**: `number`

longitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:732](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L732)

***

### name

> **name**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L689)

***

### namespace

> **namespace**: \`$\{string\}.$\{number\}\`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L688)

***

### oObjects?

> `optional` **oObjects**: `Record`\<`string`, `undefined` \| [`Object`](../-internal-/type-aliases/Object.md)\>

Contains a live cache of the adapter's objects.
NOTE: This is only defined if the adapter was initialized with the option objects: true.

#### Defined in

[adapter/src/lib/adapter/adapter.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L674)

***

### oStates?

> `optional` **oStates**: `Record`\<`string`, `undefined` \| [`State`](../-internal-/interfaces/State.md)\>

Contains a live cache of the adapter's states.
NOTE: This is only defined if the adapter was initialized with the option states: true.

#### Defined in

[adapter/src/lib/adapter/adapter.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L669)

***

### pack?

> `optional` **pack**: `Record`\<`string`, `any`\>

contents of package.json

#### Defined in

[adapter/src/lib/adapter/adapter.ts:718](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L718)

***

### performStrictObjectChecks

> **performStrictObjectChecks**: `boolean`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L683)

***

### processLog()?

> `optional` **processLog**: (`msg`) => `void`

#### Parameters

• **msg**: [`LogMessage`](../-internal-/interfaces/LogMessage.md)

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:746](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L746)

***

### requireLog()?

> `optional` **requireLog**: (`isActive`, `options`?) => `void` \| `Promise`\<`void`\>

Start or stop subscribing to log messages
The method is only available if logTransporter is active via io-pack or adapter options
Note, that stopping will stop after 10 seconds, not immediately

#### Parameters

• **isActive**: `boolean`

if log subscription should be activated or deactivated

• **options?**: `Partial`\<[`GetUserGroupsOptions`](../-internal-/interfaces/GetUserGroupsOptions.md)\>

options passed to setState e.g. user permissions

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:755](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L755)

***

### stop()?

> `optional` **stop**: (`params`?) => `Promise`\<`void`\>

Stop the adapter

#### Parameters

• **params?**: [`StopParameters`](../-internal-/interfaces/StopParameters.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:742](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L742)

***

### systemConfig?

> `optional` **systemConfig**: [`InternalAdapterJsonConfig`](../-internal-/interfaces/InternalAdapterJsonConfig.md)

contents of iobroker.json if required via AdapterOptions

#### Defined in

[adapter/src/lib/adapter/adapter.ts:724](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L724)

***

### version?

> `optional` **version**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L743)

## Methods

### addChannelToEnum()

#### addChannelToEnum(enumName, addTo, parentDevice, channelName, callback)

> **addChannelToEnum**(`enumName`, `addTo`, `parentDevice`, `channelName`, `callback`?): `void`

##### Parameters

• **enumName**: `string`

• **addTo**: `string`

• **parentDevice**: `string`

• **channelName**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5708](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5708)

#### addChannelToEnum(enumName, addTo, parentDevice, channelName, options, callback)

> **addChannelToEnum**(`enumName`, `addTo`, `parentDevice`, `channelName`, `options`, `callback`?): `void`

##### Parameters

• **enumName**: `string`

• **addTo**: `string`

• **parentDevice**: `string`

• **channelName**: `string`

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5715](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5715)

***

### addChannelToEnumAsync()

> **addChannelToEnumAsync**(`enumName`, `addTo`, `parentDevice`, `channelName`, `options`?): `Promise`\<`void`\>

#### Parameters

• **enumName**: `string`

• **addTo**: `string`

• **parentDevice**: `string`

• **channelName**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:233](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L233)

***

### addStateToEnum()

#### addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, callback)

> **addStateToEnum**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `callback`?): `void`

##### Parameters

• **enumName**: `string`

• **addTo**: `string`

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6430](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6430)

#### addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, options, callback)

> **addStateToEnum**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `options`, `callback`?): `void`

##### Parameters

• **enumName**: `string`

• **addTo**: `string`

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6438](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6438)

***

### addStateToEnumAsync()

> **addStateToEnumAsync**(`enumName`, `addTo`, `parentDevice`, `parentChannel`, `stateName`, `options`?): `Promise`\<`void`\>

#### Parameters

• **enumName**: `string`

• **addTo**: `string`

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:250](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L250)

***

### calculatePermissions()

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

#### Param

user name as text

#### Param

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

optional user context

#### Param

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

#### calculatePermissions(user, commandsPermissions, options, callback)

> **calculatePermissions**(`user`, `commandsPermissions`, `options`?, `callback`?): `Promise`\<`void` \| [`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

##### Parameters

• **user**: `string`

• **commandsPermissions**: [`CommandsPermissions`](../-internal-/type-aliases/CommandsPermissions.md)

• **options?**: `Record`\<`string`, `any`\>

• **callback?**: [`CalculatePermissionsCallback`](../-internal-/type-aliases/CalculatePermissionsCallback.md)

##### Returns

`Promise`\<`void` \| [`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

##### Param

user name as text

##### Param

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

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1985](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1985)

#### calculatePermissions(user, commandsPermissions, callback)

> **calculatePermissions**(`user`, `commandsPermissions`, `callback`?): `Promise`\<`void` \| [`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

get the user permissions

This function used mostly internally and the adapter developer do not require it.
The function reads permissions of user's groups (it can be more than one) and merge permissions together

##### Parameters

• **user**: `string`

• **commandsPermissions**: [`CommandsPermissions`](../-internal-/type-aliases/CommandsPermissions.md)

• **callback?**: [`CalculatePermissionsCallback`](../-internal-/type-aliases/CalculatePermissionsCallback.md)

##### Returns

`Promise`\<`void` \| [`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

##### Param

user name as text

##### Param

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

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1991](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1991)

***

### calculatePermissionsAsync()

> **calculatePermissionsAsync**(`user`, `commandsPermissions`, `options`?): `Promise`\<[`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

<INTERNAL> Determines the users permissions

#### Parameters

• **user**: `string`

• **commandsPermissions**: [`CommandsPermissions`](../-internal-/type-aliases/CommandsPermissions.md)

• **options?**: `unknown`

#### Returns

`Promise`\<[`PermissionSet`](../-internal-/interfaces/PermissionSet.md)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:329](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L329)

***

### checkGroup()

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

#### Param

user name as text

#### Param

group name

#### Param

optional user context

#### Param

return result
       ```js
           function (result) {
             if (result) adapter.log.debug('User exists and in the group');
           }
       ```

#### checkGroup(user, group, options, callback)

> **checkGroup**(`user`, `group`, `options`, `callback`?): `Promise`\<`void`\>

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

##### Parameters

• **user**: `string`

• **group**: `string`

• **options**: `Record`\<`string`, `any`\>

• **callback?**: [`CheckGroupCallback`](../-internal-/type-aliases/CheckGroupCallback.md)

##### Returns

`Promise`\<`void`\>

##### Param

user name as text

##### Param

group name

##### Param

optional user context

##### Param

return result
       ```js
           function (result) {
             if (result) adapter.log.debug('User exists and in the group');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1902](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1902)

#### checkGroup(user, group, callback)

> **checkGroup**(`user`, `group`, `callback`?): `Promise`\<`void`\>

returns if user exists and is in the group

This function used mostly internally and the adapter developer do not require it.

##### Parameters

• **user**: `string`

• **group**: `string`

• **callback?**: [`CheckGroupCallback`](../-internal-/type-aliases/CheckGroupCallback.md)

##### Returns

`Promise`\<`void`\>

##### Param

user name as text

##### Param

group name

##### Param

optional user context

##### Param

return result
       ```js
           function (result) {
             if (result) adapter.log.debug('User exists and in the group');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1903](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1903)

***

### checkGroupAsync()

> **checkGroupAsync**(`user`, `group`, `options`?): `Promise`\<`boolean`\>

<INTERNAL> Checks if a user exists and is in the given group.

#### Parameters

• **user**: `string`

• **group**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:327](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L327)

***

### checkPassword()

validates user and password

#### Param

user name as text

#### Param

password as text

#### Param

optional user context

#### Param

return result
       ```js
           function (result) {
             if (result) adapter.log.debug('User is valid');
           }
       ```

#### checkPassword(user, pw, options, callback)

> **checkPassword**(`user`, `pw`, `options`, `callback`): `Promise`\<`void`\>

validates user and password

##### Parameters

• **user**: `string`

• **pw**: `string`

• **options**: `Record`\<`string`, `any`\>

• **callback**: [`CheckPasswordCallback`](../-internal-/type-aliases/CheckPasswordCallback.md)

##### Returns

`Promise`\<`void`\>

##### Param

user name as text

##### Param

password as text

##### Param

optional user context

##### Param

return result
       ```js
           function (result) {
             if (result) adapter.log.debug('User is valid');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1648](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1648)

#### checkPassword(user, pw, callback)

> **checkPassword**(`user`, `pw`, `callback`): `Promise`\<`void`\>

validates user and password

##### Parameters

• **user**: `string`

• **pw**: `string`

• **callback**: [`CheckPasswordCallback`](../-internal-/type-aliases/CheckPasswordCallback.md)

##### Returns

`Promise`\<`void`\>

##### Param

user name as text

##### Param

password as text

##### Param

optional user context

##### Param

return result
       ```js
           function (result) {
             if (result) adapter.log.debug('User is valid');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1654](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1654)

***

### checkPasswordAsync()

> **checkPasswordAsync**(`user`, `password`, `options`?): `Promise`\<[`boolean`, \`system.user.$\{string\}\`]\>

Validates username and password

#### Parameters

• **user**: `string`

• **password**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<[`boolean`, \`system.user.$\{string\}\`]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:319](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L319)

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

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".

#### Param

data with mode

#### Param

return result
       ```js
           function (err, processedFiles) {
               list of processed files with new groups
           }
       ```

#### chmodFile(adapter, path, options, callback)

> **chmodFile**(`adapter`, `path`, `options`, `callback`): `void`

Change file access rights

This function updates the file access rights
```js
     adapter.chmodFile('vis-2.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

##### Parameters

• **adapter**: `null` \| `string`

• **path**: `string`

• **options**: `Record`\<`string`, `any`\> \| `object`

• **callback**: [`ChownFileCallback`](../-internal-/type-aliases/ChownFileCallback.md)

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".

##### Param

data with mode

##### Param

return result
       ```js
           function (err, processedFiles) {
               list of processed files with new groups
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6708](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6708)

#### chmodFile(adapter, path, callback)

> **chmodFile**(`adapter`, `path`, `callback`): `void`

Change file access rights

This function updates the file access rights
```js
     adapter.chmodFile('vis-2.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

##### Parameters

• **adapter**: `null` \| `string`

• **path**: `string`

• **callback**: [`ChownFileCallback`](../-internal-/type-aliases/ChownFileCallback.md)

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".

##### Param

data with mode

##### Param

return result
       ```js
           function (err, processedFiles) {
               list of processed files with new groups
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6715](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6715)

***

### chmodFileAsync()

> **chmodFileAsync**(`adapter`, `path`, `options`): `Promise`\<`object`\>

Changes access rights of all files in the adapter directory

#### Parameters

• **adapter**: `null` \| `string`

• **path**: `string`

• **options**: `Record`\<`string`, `any`\> \| `object`

#### Returns

`Promise`\<`object`\>

##### entries

> **entries**: [`ChownFileResult`](../-internal-/interfaces/ChownFileResult.md)[]

##### id

> **id**: `string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:266](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L266)

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

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".

#### Param

data with owner and ownerGroup

#### Param

return result
       ```js
           function (err, processedFiles) {
               list of processed files with new groups
           }
       ```

#### chownFile(_adapter, path, options, callback)

> **chownFile**(`_adapter`, `path`, `options`, `callback`): `void`

Change a file owner

This function updates the file owner and ownerGroup
```js
     adapter.chownFile('vis-2.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

##### Parameters

• **\_adapter**: `string`

• **path**: `string`

• **options**: `unknown`

• **callback**

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".

##### Param

data with owner and ownerGroup

##### Param

return result
       ```js
           function (err, processedFiles) {
               list of processed files with new groups
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6755](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6755)

#### chownFile(_adapter, path, callback)

> **chownFile**(`_adapter`, `path`, `callback`): `void`

Change a file owner

This function updates the file owner and ownerGroup
```js
     adapter.chownFile('vis-2.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('New files: ' + JSON.stringify(processed));
     });
```

##### Parameters

• **\_adapter**: `string`

• **path**: `string`

• **callback**

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".

##### Param

data with owner and ownerGroup

##### Param

return result
       ```js
           function (err, processedFiles) {
               list of processed files with new groups
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6762](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6762)

***

### chownFileAsync()

> **chownFileAsync**(...`args`): `Promise`\<`any`\>

#### Parameters

• ...**args**: `any`[]

#### Returns

`Promise`\<`any`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:272](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L272)

***

### clearInterval()

> **clearInterval**(`interval`): `void`

Same as clearInterval
but it checks the running intervals on unload

#### Parameters

• **interval**: `undefined` \| [`Interval`](../-internal-/type-aliases/Interval.md)

interval object

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2791](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2791)

***

### clearTimeout()

> **clearTimeout**(`timer`): `void`

Same as clearTimeout
but it checks the running timers on unload

#### Parameters

• **timer**: `undefined` \| [`Timeout`](../-internal-/type-aliases/Timeout.md)

the timer object

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2705](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2705)

***

### ~~createChannel()~~

Name of channel must be in format "channel"

#### Param

#### Param

#### Param

#### Param

#### Param

#### Param

#### Deprecated

use `this.extendObject` instead

#### createChannel(parentDevice, channelName, callback)

> **createChannel**(`parentDevice`, `channelName`, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5309](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5309)

#### createChannel(parentDevice, channelName, roleOrCommon, callback)

> **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5311](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5311)

#### createChannel(parentDevice, channelName, roleOrCommon, native, callback)

> **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5318](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5318)

#### createChannel(parentDevice, channelName, roleOrCommon, native, options, callback)

> **createChannel**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options`, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **options**: `unknown`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5326](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5326)

***

### ~~createChannelAsync()~~

#### createChannelAsync(parentDevice, channelName, roleOrCommon)

> **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Creates an object with a type channel. It must be located under a device

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **roleOrCommon?**: `string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:514](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L514)

#### createChannelAsync(parentDevice, channelName, roleOrCommon, native)

> **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

• **native?**: `Record`\<`string`, `any`\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:520](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L520)

#### createChannelAsync(parentDevice, channelName, roleOrCommon, native, options)

> **createChannelAsync**(`parentDevice`, `channelName`, `roleOrCommon`, `native`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`ChannelCommon`](../-internal-/interfaces/ChannelCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **options?**: `unknown`

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:527](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L527)

***

### ~~createDevice()~~

#### Param

#### Param

#### Param

#### Param

#### Param

#### Deprecated

use `this.extendObject` instead

#### createDevice(deviceName, callback)

> **createDevice**(`deviceName`, `callback`?): `void`

##### Parameters

• **deviceName**: `string`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5219](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5219)

#### createDevice(deviceName, common, callback)

> **createDevice**(`deviceName`, `common`, `callback`?): `void`

##### Parameters

• **deviceName**: `string`

• **common**: `Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5221](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5221)

#### createDevice(deviceName, common, native, callback)

> **createDevice**(`deviceName`, `common`, `native`, `callback`?): `void`

##### Parameters

• **deviceName**: `string`

• **common**: `Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5227](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5227)

#### createDevice(deviceName, common, native, options, callback)

> **createDevice**(`deviceName`, `common`, `native`, `options`, `callback`?): `void`

##### Parameters

• **deviceName**: `string`

• **common**: `Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **options**: `unknown`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5234](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5234)

***

### ~~createDeviceAsync()~~

#### createDeviceAsync(deviceName, common)

> **createDeviceAsync**(`deviceName`, `common`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

creates an object with type device

##### Parameters

• **deviceName**: `string`

• **common?**: `Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:494](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L494)

#### createDeviceAsync(deviceName, common, native)

> **createDeviceAsync**(`deviceName`, `common`, `native`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Parameters

• **deviceName**: `string`

• **common**: `Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

• **native?**: `Record`\<`string`, `any`\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:496](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L496)

#### createDeviceAsync(deviceName, common, native, options)

> **createDeviceAsync**(`deviceName`, `common`, `native`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Parameters

• **deviceName**: `string`

• **common**: `Partial`\<[`DeviceCommon`](../-internal-/interfaces/DeviceCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **options?**: `unknown`

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L502)

***

### ~~createState()~~

#### Param

#### Param

#### Param

#### Param

#### Param

#### Param

#### Param

#### Deprecated

use `this.extendObject` instead

#### createState(parentDevice, parentChannel, stateName, callback)

> **createState**(`parentDevice`, `parentChannel`, `stateName`, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5412](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5412)

#### createState(parentDevice, parentChannel, stateName, roleOrCommon, callback)

> **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5419](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5419)

#### createState(parentDevice, parentChannel, stateName, roleOrCommon, native, callback)

> **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5427](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5427)

#### createState(parentDevice, parentChannel, stateName, roleOrCommon, native, options, callback)

> **createState**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options`, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **options**: `unknown`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.extendObject` instead

##### Deprecated

use `this.extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5436](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5436)

***

### ~~createStateAsync()~~

#### createStateAsync(parentDevice, parentChannel, stateName, roleOrCommon)

> **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Creates a state and the corresponding object. It must be located in a channel under a device

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **roleOrCommon?**: `string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L540)

#### createStateAsync(parentDevice, parentChannel, stateName, roleOrCommon, native)

> **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

• **native?**: `Record`\<`string`, `any`\>

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:547](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L547)

#### createStateAsync(parentDevice, parentChannel, stateName, roleOrCommon, native, options)

> **createStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `roleOrCommon`, `native`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **roleOrCommon**: `string` \| `Partial`\<[`StateCommon`](../-internal-/interfaces/StateCommon.md)\>

• **native**: `Record`\<`string`, `any`\>

• **options?**: `unknown`

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Deprecated

use `extendObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L555)

***

### decrypt()

Decrypt the password/value with given key

#### Param

to use for decrypt (or value if only one parameter is given)

#### Param

value to decrypt (if secret is provided)

#### decrypt(secretVal, value)

> **decrypt**(`secretVal`, `value`?): `string`

Decrypt the password/value with given key

##### Parameters

• **secretVal**: `string`

• **value?**: `string`

##### Returns

`string`

##### Param

to use for decrypt (or value if only one parameter is given)

##### Param

value to decrypt (if secret is provided)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1355](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1355)

#### decrypt(value)

> **decrypt**(`value`): `string`

Decrypt the password/value with given key

##### Parameters

• **value**: `string`

##### Returns

`string`

##### Param

to use for decrypt (or value if only one parameter is given)

##### Param

value to decrypt (if secret is provided)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1356](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1356)

***

### delay()

> **delay**(`timeout`): `Promise`\<`void`\>

delays the fulfillment of the promise the amount of time.
it will not fulfill during and after adapter shutdown

#### Parameters

• **timeout**: `number`

timeout in milliseconds

#### Returns

`Promise`\<`void`\>

promise when timeout is over

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2724](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2724)

***

### ~~deleteChannel()~~

Deletes channel and underlying structure

#### Deprecated

use `this.delObject` instead

#### Alias

deleteChannel

#### Param

is the part of ID like: adapter.instance.<deviceName>

#### Param

is the part of ID like: adapter.instance.<deviceName>.<channelName>

#### Param

optional user context

#### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

#### deleteChannel(channelName, callback)

> **deleteChannel**(`channelName`, `callback`?): `void`

##### Parameters

• **channelName**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

##### Alias

deleteChannel

##### Param

is the part of ID like: adapter.instance.<deviceName>

##### Param

is the part of ID like: adapter.instance.<deviceName>.<channelName>

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5957](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5957)

#### deleteChannel(channelName, options, callback)

> **deleteChannel**(`channelName`, `options`?, `callback`?): `void`

##### Parameters

• **channelName**: `string`

• **options?**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

##### Alias

deleteChannel

##### Param

is the part of ID like: adapter.instance.<deviceName>

##### Param

is the part of ID like: adapter.instance.<deviceName>.<channelName>

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5959](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5959)

#### deleteChannel(parentDevice, channelName, options, callback)

> **deleteChannel**(`parentDevice`, `channelName`, `options`?, `callback`?): `void`

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **options?**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

##### Alias

deleteChannel

##### Param

is the part of ID like: adapter.instance.<deviceName>

##### Param

is the part of ID like: adapter.instance.<deviceName>.<channelName>

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5961](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5961)

***

### ~~deleteChannelAsync()~~

#### deleteChannelAsync(channelName, options)

> **deleteChannelAsync**(`channelName`, `options`?): `Promise`\<`void`\>

Deletes a channel and its states. It must have been created with createChannel

##### Parameters

• **channelName**: `string`

• **options?**: `unknown`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L569)

#### deleteChannelAsync(parentDevice, channelName, options)

> **deleteChannelAsync**(`parentDevice`, `channelName`, `options`?): `Promise`\<`void`\>

##### Parameters

• **parentDevice**: `string`

• **channelName**: `string`

• **options?**: `unknown`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:571](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L571)

***

### deleteChannelFromEnum()

#### deleteChannelFromEnum(enumName, parentDevice, channelName, callback)

> **deleteChannelFromEnum**(`enumName`, `parentDevice`, `channelName`, `callback`?): `void`

##### Parameters

• **enumName**: `string`

• **parentDevice**: `string`

• **channelName**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5841](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5841)

#### deleteChannelFromEnum(enumName, parentDevice, channelName, options, callback)

> **deleteChannelFromEnum**(`enumName`, `parentDevice`, `channelName`, `options`, `callback`?): `void`

##### Parameters

• **enumName**: `string`

• **parentDevice**: `string`

• **channelName**: `string`

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5847](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5847)

***

### deleteChannelFromEnumAsync()

> **deleteChannelFromEnumAsync**(`enumName`, `parentDevice`, `channelName`, `options`?): `Promise`\<`void`\>

#### Parameters

• **enumName**: `string`

• **parentDevice**: `string`

• **channelName**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L240)

***

### ~~deleteDevice()~~

Delete device with all its channels and states.

#### Deprecated

use `this.delObject` instead

#### Param

is the part of ID like: adapter.instance.<deviceName>

#### Param

optional user context

#### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

#### deleteDevice(deviceName, callback)

> **deleteDevice**(`deviceName`, `callback`?): `void`

##### Parameters

• **deviceName**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

##### Param

is the part of ID like: adapter.instance.<deviceName>

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5636](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5636)

#### deleteDevice(deviceName, options, callback)

> **deleteDevice**(`deviceName`, `options`, `callback`?): `void`

##### Parameters

• **deviceName**: `string`

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Deprecated

use `this.delObject` instead

##### Param

is the part of ID like: adapter.instance.<deviceName>

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete device: ' + err);
           }
       ```

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5638](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5638)

***

### deleteDeviceAsync()

> **deleteDeviceAsync**(`deviceName`, `options`?): `Promise`\<`void`\>

deletes a device, its channels and states

#### Parameters

• **deviceName**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:232](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L232)

***

### ~~deleteState()~~

#### Param

#### Param

#### Param

#### Param

#### Param

#### Deprecated

use `this.delObject` instead

#### deleteState(parentChannel, stateName, options, callback)

> **deleteState**(`parentChannel`, `stateName`, `options`?, `callback`?): `void`

##### Parameters

• **parentChannel**: `string`

• **stateName**: `string`

• **options?**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.delObject` instead

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6073](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6073)

#### deleteState(stateName, options, callback)

> **deleteState**(`stateName`, `options`?, `callback`?): `void`

##### Parameters

• **stateName**: `string`

• **options?**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.delObject` instead

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6075](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6075)

#### deleteState(parentDevice, parentChannel, stateName, options, callback)

> **deleteState**(`parentDevice`, `parentChannel`, `stateName`, `options`?, `callback`?): `void`

##### Parameters

• **parentDevice**: `null` \| `string`

• **parentChannel**: `null` \| `string`

• **stateName**: `string`

• **options?**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

##### Param

##### Param

##### Param

##### Param

##### Deprecated

use `this.delObject` instead

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6077](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6077)

***

### ~~deleteStateAsync()~~

#### deleteStateAsync(stateName, options)

> **deleteStateAsync**(`stateName`, `options`?): `Promise`\<`void`\>

Deletes a state. It must have been created with createState

##### Parameters

• **stateName**: `string`

• **options?**: `unknown`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:578](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L578)

#### deleteStateAsync(parentChannel, stateName, options)

> **deleteStateAsync**(`parentChannel`, `stateName`, `options`?): `Promise`\<`void`\>

##### Parameters

• **parentChannel**: `string`

• **stateName**: `string`

• **options?**: `unknown`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L580)

#### deleteStateAsync(parentDevice, parentChannel, stateName, options)

> **deleteStateAsync**(`parentDevice`, `parentChannel`, `stateName`, `options`?): `Promise`\<`void`\>

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **options?**: `unknown`

##### Returns

`Promise`\<`void`\>

##### Deprecated

use `this.delObject` instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:582](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L582)

***

### deleteStateFromEnum()

#### deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, callback)

> **deleteStateFromEnum**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `callback`?): `void`

##### Parameters

• **enumName**: `string`

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6577](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6577)

#### deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, options, callback)

> **deleteStateFromEnum**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `options`, `callback`?): `void`

##### Parameters

• **enumName**: `string`

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6584](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6584)

***

### deleteStateFromEnumAsync()

> **deleteStateFromEnumAsync**(`enumName`, `parentDevice`, `parentChannel`, `stateName`, `options`?): `Promise`\<`void`\>

#### Parameters

• **enumName**: `string`

• **parentDevice**: `string`

• **parentChannel**: `string`

• **stateName**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L258)

***

### delFile()

#### delFile(adapterName, path, callback)

> **delFile**(`adapterName`, `path`, `callback`): `void`

Deletes a given file

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:426](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L426)

#### delFile(adapterName, path, options, callback)

> **delFile**(`adapterName`, `path`, `options`, `callback`): `void`

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options**: `unknown`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:427](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L427)

***

### delFileAsync()

> **delFileAsync**(`adapterName`, `path`, `options`?): `Promise`\<`void`\>

Deletes a given file

#### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:278](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L278)

***

### delForeignObject()

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

#### Param

exactly object ID (with namespace)

#### Param

optional user context or `{ recursive: true }` to delete all underlying objects

#### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

#### delForeignObject(id, callback)

> **delForeignObject**(`id`, `callback`?): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

##### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

exactly object ID (with namespace)

##### Param

optional user context or `{ recursive: true }` to delete all underlying objects

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4672](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4672)

#### delForeignObject(id, options, callback)

> **delForeignObject**(`id`, `options`, `callback`?): `void`

Delete any object.

The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".

##### Parameters

• **id**: `string`

• **options**: [`DelObjectOptions`](../-internal-/interfaces/DelObjectOptions.md)

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

exactly object ID (with namespace)

##### Param

optional user context or `{ recursive: true }` to delete all underlying objects

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4673](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4673)

***

### delForeignObjectAsync()

> **delForeignObjectAsync**(`id`, `options`?): `Promise`\<`void`\>

Deletes an object (which might not belong to this adapter) from the object db

#### Parameters

• **id**: `string`

• **options?**: [`DelObjectOptions`](../-internal-/interfaces/DelObjectOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:211](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L211)

***

### delForeignState()

Deletes a state of any adapter.
The object is NOT deleted. If you want to delete it too, use

#### Del Foreign Object

instead.

No error is returned if state does not exist.

#### Param

long string for ID like "adapterName.0.stateID".

#### Param

optional argument to describe the user context

#### Param

return result
```js
function (err) {}
```

#### delForeignState(id, callback)

> **delForeignState**(`id`, `callback`?): `void`

Deletes a state of any adapter.
The object is NOT deleted. If you want to delete it too, use

##### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Del Foreign Object

instead.

No error is returned if state does not exist.

##### Param

long string for ID like "adapterName.0.stateID".

##### Param

optional argument to describe the user context

##### Param

return result
```js
function (err) {}
```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9382](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9382)

#### delForeignState(id, options, callback)

> **delForeignState**(`id`, `options`, `callback`?): `void`

Deletes a state of any adapter.
The object is NOT deleted. If you want to delete it too, use

##### Parameters

• **id**: `string`

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Del Foreign Object

instead.

No error is returned if state does not exist.

##### Param

long string for ID like "adapterName.0.stateID".

##### Param

optional argument to describe the user context

##### Param

return result
```js
function (err) {}
```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9383](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9383)

***

### delForeignStateAsync()

> **delForeignStateAsync**(`id`, `options`?): `Promise`\<`void`\>

Deletes a state from the states DB, but not the associated object

#### Parameters

• **id**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:299](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L299)

***

### delObject()

Delete an object of this instance.

It is not required to provide the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

#### Param

exactly object ID (without namespace)

#### Param

optional user context. E.g. recursive option could be true

#### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

#### delObject(id, callback)

> **delObject**(`id`, `callback`?): `void`

Delete an object of this instance.

It is not required to provide the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

##### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

exactly object ID (without namespace)

##### Param

optional user context. E.g. recursive option could be true

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4613](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4613)

#### delObject(id, options, callback)

> **delObject**(`id`, `options`?, `callback`?): `void`

Delete an object of this instance.

It is not required to provide the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

The corresponding state will be deleted too if the object has type "state".

##### Parameters

• **id**: `string`

• **options?**: `null` \| [`DelObjectOptions`](../-internal-/interfaces/DelObjectOptions.md)

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

exactly object ID (without namespace)

##### Param

optional user context. E.g. recursive option could be true

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4614](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4614)

***

### delObjectAsync()

> **delObjectAsync**(`id`, `options`?): `Promise`\<`void`\>

Deletes an object from the object db

#### Parameters

• **id**: `string`

• **options?**: [`DelObjectOptions`](../-internal-/interfaces/DelObjectOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:209](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L209)

***

### delState()

Deletes a state of this instance.
The object will NOT be deleted. If you want to delete it too, use

#### Del Object

instead.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

No error is returned if state does not exist.

#### Param

exactly object ID (without namespace)

#### Param

optional user context

#### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

#### delState(id, callback)

> **delState**(`id`, `callback`?): `void`

Deletes a state of this instance.
The object will NOT be deleted. If you want to delete it too, use

##### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Del Object

instead.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

No error is returned if state does not exist.

##### Param

exactly object ID (without namespace)

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9330](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9330)

#### delState(id, options, callback)

> **delState**(`id`, `options`, `callback`?): `void`

Deletes a state of this instance.
The object will NOT be deleted. If you want to delete it too, use

##### Parameters

• **id**: `string`

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Del Object

instead.

It is not required to provice the adapter namespace, because it will automatically be added.
E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.

No error is returned if state does not exist.

##### Param

exactly object ID (without namespace)

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot delete object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9331](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9331)

***

### delStateAsync()

> **delStateAsync**(`id`, `options`?): `Promise`\<`void`\>

Deletes a state from the states DB, but not the associated object. Consider using deleteState instead

#### Parameters

• **id**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:297](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L297)

***

### destroySession()

> **destroySession**(`id`, `callback`?): [`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

#### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

#### Returns

[`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1442](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1442)

***

### disable()

> **disable**(): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Disables and stops the adapter instance.

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2593](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2593)

***

### encrypt()

Encrypt the password/value with given key

#### Param

to use for encrypting (or value if only one parameter is given)

#### Param

value to encrypt (if secret is provided)

#### encrypt(secretVal, value)

> **encrypt**(`secretVal`, `value`?): `string`

Encrypt the password/value with given key

##### Parameters

• **secretVal**: `string`

• **value?**: `string`

##### Returns

`string`

##### Param

to use for encrypting (or value if only one parameter is given)

##### Param

value to encrypt (if secret is provided)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1376](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1376)

#### encrypt(value)

> **encrypt**(`value`): `string`

Encrypt the password/value with given key

##### Parameters

• **value**: `string`

##### Returns

`string`

##### Param

to use for encrypting (or value if only one parameter is given)

##### Param

value to encrypt (if secret is provided)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1377](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1377)

***

### extendForeignObject()

Same as [AdapterClass.extendObject](AdapterClass.md#extendobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Param

object ID, that must be extended

#### Param

part that must be extended

#### Param

optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name

#### Param

return result
       ```js
           function (err, obj) {
               // obj is {"id": id}
               if (err) adapter.log.error(err);
           }
       ```

#### extendForeignObject(id, objPart)

> **extendForeignObject**\<`T`\>(`id`, `objPart`): `Promise`\<`undefined` \| `object`\>

Same as [AdapterClass.extendObject](AdapterClass.md#extendobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **objPart**: [`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

##### Returns

`Promise`\<`undefined` \| `object`\>

##### Param

object ID, that must be extended

##### Param

part that must be extended

##### Param

optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name

##### Param

return result
       ```js
           function (err, obj) {
               // obj is {"id": id}
               if (err) adapter.log.error(err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3501](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3501)

#### extendForeignObject(id, objPart, callback)

> **extendForeignObject**\<`T`\>(`id`, `objPart`, `callback`): `void`

Same as [AdapterClass.extendObject](AdapterClass.md#extendobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **objPart**: [`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **callback**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be extended

##### Param

part that must be extended

##### Param

optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name

##### Param

return result
       ```js
           function (err, obj) {
               // obj is {"id": id}
               if (err) adapter.log.error(err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3505](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3505)

#### extendForeignObject(id, objPart, options, callback)

> **extendForeignObject**\<`T`\>(`id`, `objPart`, `options`, `callback`): `void`

Same as [AdapterClass.extendObject](AdapterClass.md#extendobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **objPart**: [`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options**: [`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

• **callback**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be extended

##### Param

part that must be extended

##### Param

optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name

##### Param

return result
       ```js
           function (err, obj) {
               // obj is {"id": id}
               if (err) adapter.log.error(err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3510](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3510)

#### extendForeignObject(id, objPart, options)

> **extendForeignObject**\<`T`\>(`id`, `objPart`, `options`): `Promise`\<`undefined` \| `object`\>

Same as [AdapterClass.extendObject](AdapterClass.md#extendobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **objPart**: [`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options**: [`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

##### Returns

`Promise`\<`undefined` \| `object`\>

##### Param

object ID, that must be extended

##### Param

part that must be extended

##### Param

optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name

##### Param

return result
       ```js
           function (err, obj) {
               // obj is {"id": id}
               if (err) adapter.log.error(err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3516](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3516)

***

### extendForeignObjectAsync()

> **extendForeignObjectAsync**\<`T`\>(`id`, `objPart`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Extend an object (which might not belong to this adapter) and create it if it might not exist

#### Type Parameters

• **T** *extends* `string`

#### Parameters

• **id**: `T`

• **objPart**: [`PartialObjectWorker`](../-internal-/type-aliases/PartialObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options?**: [`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L181)

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
  native: {}
}
```

#### Param

object ID, that must be extended

#### Param

part that must be extended

#### Param

optional user context

#### Param

return result
       ```js
           function (err, obj) {
               if (err) adapter.log.error(err);
               // obj is {"id": id}
           }
       ```

#### extendObject(id, objPart)

> **extendObject**(`id`, `objPart`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

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
  native: {}
}
```

##### Parameters

• **id**: `string`

• **objPart**: AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \}

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Param

object ID, that must be extended

##### Param

part that must be extended

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
               if (err) adapter.log.error(err);
               // obj is {"id": id}
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3119](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3119)

#### extendObject(id, objPart, callback)

> **extendObject**(`id`, `objPart`, `callback`?): `void`

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
  native: {}
}
```

##### Parameters

• **id**: `string`

• **objPart**: AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \}

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be extended

##### Param

part that must be extended

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
               if (err) adapter.log.error(err);
               // obj is {"id": id}
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3120](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3120)

#### extendObject(id, objPart, options)

> **extendObject**(`id`, `objPart`, `options`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

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
  native: {}
}
```

##### Parameters

• **id**: `string`

• **objPart**: AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \}

• **options**: [`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

##### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

##### Param

object ID, that must be extended

##### Param

part that must be extended

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
               if (err) adapter.log.error(err);
               // obj is {"id": id}
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3121](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3121)

#### extendObject(id, objPart, options, callback)

> **extendObject**(`id`, `objPart`, `options`, `callback`?): `void`

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
  native: {}
}
```

##### Parameters

• **id**: `string`

• **objPart**: AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \}

• **options**: [`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be extended

##### Param

part that must be extended

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
               if (err) adapter.log.error(err);
               // obj is {"id": id}
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3126](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3126)

***

### ~~extendObjectAsync()~~

> **extendObjectAsync**(`id`, `objPart`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Extend an object and create it if it might not exist

#### Parameters

• **id**: `string`

• **objPart**: AnyPartialObject & \{ type?: "state" \| undefined; \} \| AnyPartialObject & \{ type?: "device" \| undefined; \} \| AnyPartialObject & \{ type?: "channel" \| undefined; \} \| AnyPartialObject & \{ type?: "folder" \| undefined; \} \| AnyPartialObject & \{ type?: "meta" \| undefined; \} \| AnyPartialObject & \{ type?: "enum" \| undefined; \} \| AnyPartialObject & \{ type?: "host" \| undefined; \} \| AnyPartialObject & \{ type?: "adapter" \| undefined; \} \| AnyPartialObject & \{ type?: "instance" \| undefined; \} \| AnyPartialObject & \{ type?: "user" \| undefined; \} \| AnyPartialObject & \{ type?: "group" \| undefined; \} \| AnyPartialObject & \{ type?: "script" \| undefined; \} \| AnyPartialObject & \{ type?: "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "schedule" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| undefined; \} \| AnyPartialObject & \{ type?: "config" \| "chart" \| undefined; \} \| AnyPartialObject & \{ type?: "design" \| undefined; \}

• **options?**: [`ExtendObjectOptions`](../-internal-/interfaces/ExtendObjectOptions.md)

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Deprecated

use `adapter.extendObject` without a callback instead

#### Defined in

[adapter/src/lib/adapter/adapter.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L167)

***

### fileExists()

Checks if file exists in DB.

#### Param

adapter name

#### Param

path to file without adapter name. E.g., If you want to check "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

#### Param

optional user context

#### Param

cb function if none provided, a promise is returned

#### fileExists(adapterName, path)

> **fileExists**(`adapterName`, `path`): `Promise`\<`boolean`\>

Checks if file exists in DB.

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

##### Returns

`Promise`\<`boolean`\>

##### Param

adapter name

##### Param

path to file without adapter name. E.g., If you want to check "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

optional user context

##### Param

cb function if none provided, a promise is returned

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7064](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7064)

#### fileExists(adapterName, path, callback)

> **fileExists**(`adapterName`, `path`, `callback`?): `void`

Checks if file exists in DB.

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **callback?**: [`GenericCallback`](../-internal-/type-aliases/GenericCallback.md)\<`boolean`\>

##### Returns

`void`

##### Param

adapter name

##### Param

path to file without adapter name. E.g., If you want to check "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

optional user context

##### Param

cb function if none provided, a promise is returned

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7065](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7065)

#### fileExists(adapterName, path, options, callback)

> **fileExists**(`adapterName`, `path`, `options`, `callback`): `void`

Checks if file exists in DB.

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options**: `unknown`

• **callback**: [`GenericCallback`](../-internal-/type-aliases/GenericCallback.md)\<`boolean`\>

##### Returns

`void`

##### Param

adapter name

##### Param

path to file without adapter name. E.g., If you want to check "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

optional user context

##### Param

cb function if none provided, a promise is returned

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7066](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7066)

***

### fileExistsAsync()

> **fileExistsAsync**(`adapterName`, `path`, `options`?): `Promise`\<`boolean`\>

Checks if a file exists in the DB

#### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:285](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L285)

***

### findForeignObject()

Find any object by name or ID.

Find an object by the exact name or ID.

#### Param

exactly object ID (without namespace)

#### Param

optional `common.type` of state: 'number', 'string', 'boolean', 'file', ...

#### Param

optional user context

#### Param

return result
       ```js
           adapter.findForeignObject('Some name', function (err, id, name) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
           }
       ```

#### findForeignObject(idOrName, type, callback)

> **findForeignObject**(`idOrName`, `type`, `callback`): `void`

Find any object by name or ID.

Find an object by the exact name or ID.

##### Parameters

• **idOrName**: `string`

• **type**: `null` \| [`CommonType`](../-internal-/type-aliases/CommonType.md)

• **callback**: [`FindObjectCallback`](../-internal-/type-aliases/FindObjectCallback.md)

##### Returns

`void`

##### Param

exactly object ID (without namespace)

##### Param

optional `common.type` of state: 'number', 'string', 'boolean', 'file', ...

##### Param

optional user context

##### Param

return result
       ```js
           adapter.findForeignObject('Some name', function (err, id, name) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4442](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4442)

#### findForeignObject(idOrName, type, options, callback)

> **findForeignObject**(`idOrName`, `type`, `options`, `callback`): `void`

Find any object by name or ID.

Find an object by the exact name or ID.

##### Parameters

• **idOrName**: `string`

• **type**: `null` \| [`CommonType`](../-internal-/type-aliases/CommonType.md)

• **options**

• **options.language?**: [`Languages`](../-internal-/type-aliases/Languages.md)

• **options.user?**: \`system.user.$\{string\}\`

• **callback**: [`FindObjectCallback`](../-internal-/type-aliases/FindObjectCallback.md)

##### Returns

`void`

##### Param

exactly object ID (without namespace)

##### Param

optional `common.type` of state: 'number', 'string', 'boolean', 'file', ...

##### Param

optional user context

##### Param

return result
       ```js
           adapter.findForeignObject('Some name', function (err, id, name) {
             if (err) adapter.log.error('Cannot get object: ' + err);
             adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4443](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4443)

***

### findForeignObjectAsync()

> **findForeignObjectAsync**(`id`, `type`, `options`?): `Promise`\<`object`\>

Find an object by the exact name or ID.

#### Parameters

• **id**: `string`

exactly object ID (without a namespace)

• **type**: `null` \| [`CommonType`](../-internal-/type-aliases/CommonType.md)

optional `common.type` of the state: 'number', 'string', 'boolean', 'file', ...

• **options?**

optional user context with language

• **options.language?**: [`Languages`](../-internal-/type-aliases/Languages.md)

language in which the search must be done for multi-language names

• **options.user?**: \`system.user.$\{string\}\`

current user

#### Returns

`Promise`\<`object`\>

##### id?

> `optional` **id**: `string`

##### name

> **name**: [`StringOrTranslated`](../-internal-/type-aliases/StringOrTranslated.md)

#### Result

if the object was found by ID it will return id and may be the multi-language name it exists. If the object was found by name it will return id and the multi-language name. If the object was not found, it will return only name that was searched for.

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4510](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4510)

***

### foreignObjectExists()

> **foreignObjectExists**(`id`, `options`?): `Promise`\<`boolean` \| `void`\>

Checks if an object exists to the given id

#### Parameters

• **id**: `string`

id of the object

• **options?**: `null` \| `Record`\<`string`, `any`\>

optional user context

#### Returns

`Promise`\<`boolean` \| `void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3736](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3736)

***

### formatDate()

#### formatDate(dateObj, format)

> **formatDate**(`dateObj`, `format`?): `string`

##### Parameters

• **dateObj**: `string` \| `number` \| `Date`

• **format?**: `string`

##### Returns

`string`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7148](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7148)

#### formatDate(dateObj, isDuration, format)

> **formatDate**(`dateObj`, `isDuration`, `format`?): `string`

##### Parameters

• **dateObj**: `string` \| `number` \| `Date`

• **isDuration**: `string` \| `boolean`

• **format?**: `string`

##### Returns

`string`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7149](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7149)

***

### formatValue()

#### formatValue(value, format)

> **formatValue**(`value`, `format`?): `string`

##### Parameters

• **value**: `string` \| `number`

• **format?**: `string`

##### Returns

`string`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7113](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7113)

#### formatValue(value, decimals, format)

> **formatValue**(`value`, `decimals`, `format`?): `string`

##### Parameters

• **value**: `string` \| `number`

• **decimals**: `number`

• **format?**: `string`

##### Returns

`string`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7114](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7114)

***

### getAdapterObjects()

> **getAdapterObjects**(`callback`): `Promise`\<`void` \| `Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

Get all states, channels and devices of this adapter.

#### Parameters

• **callback**

return result
       ```js
           function (objects) {
               for (var id in objects) {
                   adapter.log.debug(id);
               }
           }
       ```

#### Returns

`Promise`\<`void` \| `Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3037](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3037)

***

### getAdapterObjectsAsync()

> **getAdapterObjectsAsync**(): `Promise`\<`Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

Get all states, channels, devices and folders of this adapter

#### Returns

`Promise`\<`Record`\<`string`, [`AdapterScopedObject`](../-internal-/type-aliases/AdapterScopedObject.md)\>\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:357](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L357)

***

### getAdapterScopedPackageIdentifier()

> **getAdapterScopedPackageIdentifier**(`moduleName`): `string`

Get the adapter scoped package identifier of a node module

#### Parameters

• **moduleName**: `string`

name of the node module

#### Returns

`string`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1282](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1282)

***

### getCertificates()

> **getCertificates**(`publicName`?, `privateName`?, `chainedName`?, `callback`?): `void`

returns SSL certificates by name

This function returns SSL certificates (private key, public cert and chained certificate).
Names are defined in the system's configuration in admin, e.g. "defaultPrivate", "defaultPublic".
The result can be directly used for creation of https server.

#### Parameters

• **publicName?**: `string`

public certificate name

• **privateName?**: `string`

private certificate name

• **chainedName?**: `string`

optional chained certificate name

• **callback?**: [`GetCertificatesCallback`](../-internal-/type-aliases/GetCertificatesCallback.md)

return result
       ```js
           function (err, certs, letsEncrypt) {
             adapter.log.debug('private key: ' + certs.key);
             adapter.log.debug('public cert: ' + certs.cert);
             adapter.log.debug('chained cert: ' + certs.ca);
           }
       ```

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2388](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2388)

***

### getCertificatesAsync()

> **getCertificatesAsync**(`publicName`?, `privateName`?, `chainedName`?): `Promise`\<[`GetCertificatesPromiseReturnType`](../-internal-/type-aliases/GetCertificatesPromiseReturnType.md)\>

#### Parameters

• **publicName?**: `string`

• **privateName?**: `string`

• **chainedName?**: `string`

#### Returns

`Promise`\<[`GetCertificatesPromiseReturnType`](../-internal-/type-aliases/GetCertificatesPromiseReturnType.md)\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L351)

***

### getChannels()

#### getChannels(callback)

> **getChannels**(`callback`): `void`

Returns a list of all channels in this adapter instance

##### Parameters

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L594)

#### getChannels(parentDevice, callback)

> **getChannels**(`parentDevice`, `callback`): `void`

##### Parameters

• **parentDevice**: `string`

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L595)

#### getChannels(parentDevice, options, callback)

> **getChannels**(`parentDevice`, `options`, `callback`): `void`

##### Parameters

• **parentDevice**: `string`

• **options**: `unknown`

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L596)

***

### getChannelsAsync()

#### getChannelsAsync()

> **getChannelsAsync**(): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

Returns a list of all channels in this adapter instance

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:606](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L606)

#### getChannelsAsync(parentDevice, options)

> **getChannelsAsync**(`parentDevice`, `options`?): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

##### Parameters

• **parentDevice**: `string`

• **options?**: `unknown`

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:607](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L607)

***

### getChannelsOf()

#### getChannelsOf(callback)

> **getChannelsOf**(`callback`): `void`

##### Parameters

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6247](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6247)

#### getChannelsOf(parentDevice, callback)

> **getChannelsOf**(`parentDevice`, `callback`): `void`

##### Parameters

• **parentDevice**: `string`

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6248](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6248)

#### getChannelsOf(parentDevice, options, callback)

> **getChannelsOf**(`parentDevice`, `options`, `callback`): `void`

##### Parameters

• **parentDevice**: `string`

• **options**: `unknown`

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6249](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6249)

***

### getChannelsOfAsync()

#### getChannelsOfAsync()

> **getChannelsOfAsync**(): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

Returns a list of all channels in this adapter instance

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:588](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L588)

#### getChannelsOfAsync(parentDevice, options)

> **getChannelsOfAsync**(`parentDevice`, `options`?): `Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

##### Parameters

• **parentDevice**: `string`

• **options?**: `unknown`

##### Returns

`Promise`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md)[]\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L589)

***

### getDevices()

#### getDevices(callback)

> **getDevices**(`callback`): `void`

##### Parameters

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6193](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6193)

#### getDevices(options, callback)

> **getDevices**(`options`, `callback`): `void`

##### Parameters

• **options**: `unknown`

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6194](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6194)

***

### getDevicesAsync()

> **getDevicesAsync**(`options`?): `Promise`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)[]\>

Returns a list of all devices in this adapter instance

#### Parameters

• **options?**: `unknown`

#### Returns

`Promise`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md)[]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:248](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L248)

***

### getEncryptedConfig()

> **getEncryptedConfig**(`attribute`, `callback`?): `Promise`\<`string` \| `void`\>

Reads the encrypted parameter from config.

It returns promise if no callback is provided.

#### Parameters

• **attribute**: `string`

attribute name in native configuration part

• **callback?**: [`GetEncryptedConfigCallback`](../-internal-/type-aliases/GetEncryptedConfigCallback.md)

optional callback

#### Returns

`Promise`\<`string` \| `void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2610](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2610)

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

enum name, e.g. 'rooms', 'function' or '' (all enums)

#### Param

optional user context

#### Param

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

#### getEnum(callback)

> **getEnum**(`callback`): `void`

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

##### Parameters

• **callback**: [`GetEnumCallback`](../-internal-/type-aliases/GetEnumCallback.md)

##### Returns

`void`

##### Param

enum name, e.g. 'rooms', 'function' or '' (all enums)

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3980](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3980)

#### getEnum(name, callback)

> **getEnum**(`name`, `callback`): `void`

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

##### Parameters

• **name**: `string`

• **callback**: [`GetEnumCallback`](../-internal-/type-aliases/GetEnumCallback.md)

##### Returns

`void`

##### Param

enum name, e.g. 'rooms', 'function' or '' (all enums)

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3981](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3981)

#### getEnum(name, options, callback)

> **getEnum**(`name`, `options`, `callback`): `void`

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

##### Parameters

• **name**: `string`

• **options**: `unknown`

• **callback**: [`GetEnumCallback`](../-internal-/type-aliases/GetEnumCallback.md)

##### Returns

`void`

##### Param

enum name, e.g. 'rooms', 'function' or '' (all enums)

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3982](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3982)

***

### getEnumAsync()

> **getEnumAsync**(`name`, `options`?): `Promise`\<`object`\>

Returns the enum tree, filtered by the optional enum name

#### Parameters

• **name**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`object`\>

##### requestEnum

> **requestEnum**: `string`

##### result

> **result**: `Record`\<`string`, `any`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:205](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L205)

***

### getEnums()

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

#### Param

enum name or names, e.g. ['rooms', 'function']

#### Param

optional user context

#### Param

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

#### getEnums(callback)

> **getEnums**(`callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

##### Parameters

• **callback**: [`GetEnumsCallback`](../-internal-/type-aliases/GetEnumsCallback.md)

##### Returns

`void`

##### Param

enum name or names, e.g. ['rooms', 'function']

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4069](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4069)

#### getEnums(enumList, callback)

> **getEnums**(`enumList`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

##### Parameters

• **enumList**: [`EnumList`](../-internal-/type-aliases/EnumList.md)

• **callback**: [`GetEnumsCallback`](../-internal-/type-aliases/GetEnumsCallback.md)

##### Returns

`void`

##### Param

enum name or names, e.g. ['rooms', 'function']

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4070](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4070)

#### getEnums(enumList, options, callback)

> **getEnums**(`enumList`, `options`, `callback`): `void`

Read the members of given enums.

Get enums of specified tree or all enums if nothing specified as object with values.

##### Parameters

• **enumList**: [`EnumList`](../-internal-/type-aliases/EnumList.md)

• **options**: `unknown`

• **callback**: [`GetEnumsCallback`](../-internal-/type-aliases/GetEnumsCallback.md)

##### Returns

`void`

##### Param

enum name or names, e.g. ['rooms', 'function']

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4071](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4071)

***

### getEnumsAsync()

> **getEnumsAsync**(`enumList`?, `options`?): [`GetEnumsPromise`](../-internal-/type-aliases/GetEnumsPromise.md)

Returns the enum tree, filtered by the optional enum name

#### Parameters

• **enumList?**: [`EnumList`](../-internal-/type-aliases/EnumList.md)

• **options?**: `unknown`

#### Returns

[`GetEnumsPromise`](../-internal-/type-aliases/GetEnumsPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:207](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L207)

***

### getForeignObject()

Get any object.

ID must be specified with namespace.

#### Param

exactly object ID (with namespace)

#### Param

optional user context

#### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

#### getForeignObject(id, callback)

> **getForeignObject**\<`T`\>(`id`, `callback`): `void` \| `Promise`\<`null` \| `void` \| [`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

Get any object.

ID must be specified with namespace.

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **callback**: [`GetObjectCallback`](../-internal-/type-aliases/GetObjectCallback.md)\<`T`\>

##### Returns

`void` \| `Promise`\<`null` \| `void` \| [`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

##### Param

exactly object ID (with namespace)

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4533](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4533)

#### getForeignObject(id, options, callback)

> **getForeignObject**\<`T`\>(`id`, `options`, `callback`): `void` \| `Promise`\<`null` \| `void` \| [`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

Get any object.

ID must be specified with namespace.

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **options**: `unknown`

• **callback**: [`GetObjectCallback`](../-internal-/type-aliases/GetObjectCallback.md)\<`T`\>

##### Returns

`void` \| `Promise`\<`null` \| `void` \| [`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"read"`\>\>

##### Param

exactly object ID (with namespace)

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4537](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4537)

***

### getForeignObjectAsync()

> **getForeignObjectAsync**\<`T`\>(`id`, `options`?): [`GetObjectPromise`](../-internal-/type-aliases/GetObjectPromise.md)\<`T`\>

Reads an object (which might not belong to this adapter) from the object db

#### Type Parameters

• **T** *extends* `string`

#### Parameters

• **id**: `T`

• **options?**: `unknown`

#### Returns

[`GetObjectPromise`](../-internal-/type-aliases/GetObjectPromise.md)\<`T`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L360)

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

object ID/wildcards

#### Param

type of object: 'state', 'channel' or 'device'. Default - 'state'

#### Param

object ID, that must be overwritten or created.

#### Param

optional user context

#### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

#### getForeignObjects(patter)

> **getForeignObjects**(`patter`): `Promise`\<`Record`\<`string`, [`Object`](../-internal-/type-aliases/Object.md)\>\>

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

##### Parameters

• **patter**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

##### Returns

`Promise`\<`Record`\<`string`, [`Object`](../-internal-/type-aliases/Object.md)\>\>

##### Param

object ID/wildcards

##### Param

type of object: 'state', 'channel' or 'device'. Default - 'state'

##### Param

object ID, that must be overwritten or created.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4216](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4216)

#### getForeignObjects(pattern, callback)

> **getForeignObjects**(`pattern`, `callback`): `void`

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

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **callback**: [`GetObjectsCallback`](../-internal-/type-aliases/GetObjectsCallback.md)

##### Returns

`void`

##### Param

object ID/wildcards

##### Param

type of object: 'state', 'channel' or 'device'. Default - 'state'

##### Param

object ID, that must be overwritten or created.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4217](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4217)

#### getForeignObjects(pattern, options, callback)

> **getForeignObjects**(`pattern`, `options`, `callback`): `void`

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

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options**: `unknown`

• **callback**: [`GetObjectsCallback`](../-internal-/type-aliases/GetObjectsCallback.md)

##### Returns

`void`

##### Param

object ID/wildcards

##### Param

type of object: 'state', 'channel' or 'device'. Default - 'state'

##### Param

object ID, that must be overwritten or created.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4218](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4218)

#### getForeignObjects(pattern, type, callback)

> **getForeignObjects**\<`T`\>(`pattern`, `type`, `callback`): `void`

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

##### Type Parameters

• **T** *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **type**: `T`

• **callback**: [`GetObjectsCallbackTyped`](../-internal-/type-aliases/GetObjectsCallbackTyped.md)\<`T`\>

##### Returns

`void`

##### Param

object ID/wildcards

##### Param

type of object: 'state', 'channel' or 'device'. Default - 'state'

##### Param

object ID, that must be overwritten or created.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4219](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4219)

#### getForeignObjects(pattern, type, enums, callback)

> **getForeignObjects**\<`T`\>(`pattern`, `type`, `enums`, `callback`): `void`

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

##### Type Parameters

• **T** *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **type**: `T`

• **enums**: [`EnumList`](../-internal-/type-aliases/EnumList.md)

• **callback**: [`GetObjectsCallbackTyped`](../-internal-/type-aliases/GetObjectsCallbackTyped.md)\<`T`\>

##### Returns

`void`

##### Param

object ID/wildcards

##### Param

type of object: 'state', 'channel' or 'device'. Default - 'state'

##### Param

object ID, that must be overwritten or created.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4224](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4224)

#### getForeignObjects(pattern, type, options, callback)

> **getForeignObjects**\<`T`\>(`pattern`, `type`, `options`, `callback`): `void`

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

##### Type Parameters

• **T** *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **type**: `T`

• **options**: `unknown`

• **callback**: [`GetObjectsCallbackTyped`](../-internal-/type-aliases/GetObjectsCallbackTyped.md)\<`T`\>

##### Returns

`void`

##### Param

object ID/wildcards

##### Param

type of object: 'state', 'channel' or 'device'. Default - 'state'

##### Param

object ID, that must be overwritten or created.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4230](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4230)

#### getForeignObjects(pattern, type, enums, options, callback)

> **getForeignObjects**\<`T`\>(`pattern`, `type`, `enums`, `options`, `callback`): `void`

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

##### Type Parameters

• **T** *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **type**: `T`

• **enums**: `null` \| [`EnumList`](../-internal-/type-aliases/EnumList.md)

• **options**: `unknown`

• **callback**: [`GetObjectsCallbackTyped`](../-internal-/type-aliases/GetObjectsCallbackTyped.md)\<`T`\>

##### Returns

`void`

##### Param

object ID/wildcards

##### Param

type of object: 'state', 'channel' or 'device'. Default - 'state'

##### Param

object ID, that must be overwritten or created.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4236](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4236)

***

### getForeignObjectsAsync()

#### getForeignObjectsAsync(pattern, type, enums, options)

> **getForeignObjectsAsync**\<`T`\>(`pattern`, `type`, `enums`?, `options`?): [`GetObjectsPromiseTyped`](../-internal-/type-aliases/GetObjectsPromiseTyped.md)\<`T`\>

Get foreign objects by pattern, by specific type and resolve their enums.

##### Type Parameters

• **T** *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **type**: `T`

• **enums?**: `null` \| [`EnumList`](../-internal-/type-aliases/EnumList.md)

• **options?**: `unknown`

##### Returns

[`GetObjectsPromiseTyped`](../-internal-/type-aliases/GetObjectsPromiseTyped.md)\<`T`\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:476](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L476)

#### getForeignObjectsAsync(pattern, type, options)

> **getForeignObjectsAsync**\<`T`\>(`pattern`, `type`, `options`?): [`GetObjectsPromiseTyped`](../-internal-/type-aliases/GetObjectsPromiseTyped.md)\<`T`\>

##### Type Parameters

• **T** *extends* [`ObjectType`](../-internal-/type-aliases/ObjectType.md)

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **type**: `T`

• **options?**: `unknown`

##### Returns

[`GetObjectsPromiseTyped`](../-internal-/type-aliases/GetObjectsPromiseTyped.md)\<`T`\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L482)

#### getForeignObjectsAsync(pattern, options)

> **getForeignObjectsAsync**(`pattern`, `options`?): [`GetObjectsPromise`](../-internal-/type-aliases/GetObjectsPromise.md)

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options?**: `unknown`

##### Returns

[`GetObjectsPromise`](../-internal-/type-aliases/GetObjectsPromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:487](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L487)

***

### getForeignState()

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

#### Param

object ID of the state.

#### Param

optional user context

#### Param

return result
       ```js
           function (err, state) {
             if (err) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

#### Set State

explanation

#### getForeignState(id, callback)

> **getForeignState**(`id`, `callback`): [`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

##### Parameters

• **id**: `string`

• **callback**: [`GetStateCallback`](../-internal-/type-aliases/GetStateCallback.md)

##### Returns

[`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

##### Param

object ID of the state.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, state) {
             if (err) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

##### Set State

explanation

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9006](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9006)

#### getForeignState(id, options, callback)

> **getForeignState**(`id`, `options`, `callback`): [`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

Read value from states DB for any instance and system state.

This function can read values from states DB for all instances and adapters. It expects the full path of object ID.

##### Parameters

• **id**: `string`

• **options**: `unknown`

• **callback**: [`GetStateCallback`](../-internal-/type-aliases/GetStateCallback.md)

##### Returns

[`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

##### Param

object ID of the state.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, state) {
             if (err) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

##### Set State

explanation

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9007](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9007)

***

### getForeignStateAsync()

> **getForeignStateAsync**(`id`, `options`?): [`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

Read a value (which might not belong to this adapter) from the state's DB.

#### Parameters

• **id**: `string`

• **options?**: `unknown`

#### Returns

[`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L317)

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

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

#### Param

optional argument to describe the user context

#### Param

return result
```js
function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
```

#### getForeignStates(pattern, callback)

> **getForeignStates**(`pattern`, `callback`): `void`

Read all states of all adapters (and system states), that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **callback**: [`GetStatesCallback`](../-internal-/type-aliases/GetStatesCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

##### Param

optional argument to describe the user context

##### Param

return result
```js
function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9571](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9571)

#### getForeignStates(pattern, options, callback)

> **getForeignStates**(`pattern`, `options`, `callback`): `void`

Read all states of all adapters (and system states), that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options**: `unknown`

• **callback**: [`GetStatesCallback`](../-internal-/type-aliases/GetStatesCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

##### Param

optional argument to describe the user context

##### Param

return result
```js
function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9572](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9572)

***

### getForeignStatesAsync()

> **getForeignStatesAsync**(`pattern`, `options`?): [`GetStatesPromise`](../-internal-/type-aliases/GetStatesPromise.md)

Read all states (which might not belong to this adapter) which match the given pattern

#### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options?**: `unknown`

#### Returns

[`GetStatesPromise`](../-internal-/type-aliases/GetStatesPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L303)

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

object ID of the state.

#### Param

see function description

#### Param

return result
       ```js
           function (error, result, step, sessionId) {
             if (error) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

#### Set State

explanation

#### getHistory(id, options, callback)

> **getHistory**(`id`, `options`, `callback`): `void`

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

##### Parameters

• **id**: `string`

• **options**: [`GetHistoryOptions`](../-internal-/interfaces/GetHistoryOptions.md)

• **callback**: [`GetHistoryCallback`](../-internal-/type-aliases/GetHistoryCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

see function description

##### Param

return result
       ```js
           function (error, result, step, sessionId) {
             if (error) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

##### Set State

explanation

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9195](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9195)

#### getHistory(id, callback)

> **getHistory**(`id`, `callback`): `void`

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

##### Parameters

• **id**: `string`

• **callback**: [`GetHistoryCallback`](../-internal-/type-aliases/GetHistoryCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

see function description

##### Param

return result
       ```js
           function (error, result, step, sessionId) {
             if (error) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

##### Set State

explanation

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9196](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9196)

***

### getHistoryAsync()

> **getHistoryAsync**(`id`, `options`?): `Promise`\<`object`\>

Read historian data for states of any instance or system state.

#### Parameters

• **id**: `string`

• **options?**: [`GetHistoryOptions`](../-internal-/interfaces/GetHistoryOptions.md)

#### Returns

`Promise`\<`object`\>

##### result?

> `optional` **result**: [`GetHistoryResult`](../-internal-/type-aliases/GetHistoryResult.md)

##### sessionId?

> `optional` **sessionId**: `number`

##### step?

> `optional` **step**: `number`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L288)

***

### getObject()

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

#### Param

exactly object ID (without namespace)

#### Param

optional user context

#### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

#### getObject(id, callback)

> **getObject**(`id`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

##### Parameters

• **id**: `string`

• **callback**: [`GetObjectCallback`](../-internal-/type-aliases/GetObjectCallback.md)\<`string`\>

##### Returns

`void`

##### Param

exactly object ID (without namespace)

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3763](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3763)

#### getObject(id, options, callback)

> **getObject**(`id`, `options`, `callback`): `void`

Get object of this instance.

It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.

##### Parameters

• **id**: `string`

• **options**: `unknown`

• **callback**: [`GetObjectCallback`](../-internal-/type-aliases/GetObjectCallback.md)\<`string`\>

##### Returns

`void`

##### Param

exactly object ID (without namespace)

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             if (err) adapter.log.error('Cannot get object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3764](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3764)

***

### getObjectAsync()

> **getObjectAsync**(`id`, `options`?): [`GetObjectPromise`](../-internal-/type-aliases/GetObjectPromise.md)\<`string`\>

Reads an object from the object db

#### Parameters

• **id**: `string`

• **options?**: `unknown`

#### Returns

[`GetObjectPromise`](../-internal-/type-aliases/GetObjectPromise.md)\<`string`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:187](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L187)

***

### getObjectList()

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

#### Param

startkey and endkey information

#### Param

additional options, e.g. for permissions

#### Param

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

#### getObjectList(params, callback)

> **getObjectList**(`params`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

##### Parameters

• **params**: `null` \| [`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md)

• **callback**: [`GetObjectListCallback`](../-internal-/type-aliases/GetObjectListCallback.md)\<[`Object`](../-internal-/type-aliases/Object.md)\>

##### Returns

`void`

##### Param

startkey and endkey information

##### Param

additional options, e.g. for permissions

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3922](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3922)

#### getObjectList(params, options, callback)

> **getObjectList**(`params`, `options`, `callback`): `void`

Read object list from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

##### Parameters

• **params**: `null` \| [`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md)

• **options**: `Record`\<`string`, `any`\> \| `object`

• **callback**: [`GetObjectListCallback`](../-internal-/type-aliases/GetObjectListCallback.md)\<[`Object`](../-internal-/type-aliases/Object.md)\>

##### Returns

`void`

##### Param

startkey and endkey information

##### Param

additional options, e.g. for permissions

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3926](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3926)

***

### getObjectListAsync()

> **getObjectListAsync**(`params`, `options`?): [`GetObjectListPromise`](../-internal-/type-aliases/GetObjectListPromise.md)

Returns a list of objects with id between params.startkey and params.endkey

#### Parameters

• **params**: `null` \| [`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md)

• **options?**: `Record`\<`string`, `any`\> \| `object`

#### Returns

[`GetObjectListPromise`](../-internal-/type-aliases/GetObjectListPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:200](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L200)

***

### getObjectView()

Read object view from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

#### Param

name of the design

#### Param

name of the view

#### Param

object containing startkey: first id to include in result; endkey: last id to include in result

#### Param

additional objects, e.g. for permissions

#### Param

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

#### getObjectView(design, search, params, callback)

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `callback`): `void`

Read object view from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

##### Type Parameters

• **Design** *extends* `string` = `string`

• **Search** *extends* `string` = `string`

##### Parameters

• **design**: `Design`

• **search**: `Search`

• **params**: `undefined` \| `null` \| [`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md)

• **callback**: [`GetObjectViewCallback`](../-internal-/type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../-internal-/type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

##### Returns

`void`

##### Param

name of the design

##### Param

name of the view

##### Param

object containing startkey: first id to include in result; endkey: last id to include in result

##### Param

additional objects, e.g. for permissions

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3806](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3806)

#### getObjectView(design, search, params, options, callback)

> **getObjectView**\<`Design`, `Search`\>(`design`, `search`, `params`, `options`, `callback`): `void`

Read object view from DB.

It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
to get all objects of the instance.

##### Type Parameters

• **Design** *extends* `string` = `string`

• **Search** *extends* `string` = `string`

##### Parameters

• **design**: `Design`

• **search**: `Search`

• **params**: `undefined` \| `null` \| [`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md)

• **options**: `unknown`

• **callback**: [`GetObjectViewCallback`](../-internal-/type-aliases/GetObjectViewCallback.md)\<[`InferGetObjectViewItemType`](../-internal-/type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

##### Returns

`void`

##### Param

name of the design

##### Param

name of the view

##### Param

object containing startkey: first id to include in result; endkey: last id to include in result

##### Param

additional objects, e.g. for permissions

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3812](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3812)

***

### getObjectViewAsync()

> **getObjectViewAsync**\<`Design`, `Search`\>(`design`, `search`, `params`, `options`?): [`GetObjectViewPromise`](../-internal-/type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../-internal-/type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

Query a predefined object view (similar to SQL stored procedures) and return the results
For a detailed description refer to https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#object-fields
or http://guide.couchdb.org/editions/1/en/views.html

#### Type Parameters

• **Design** *extends* `string` = `string`

• **Search** *extends* `string` = `string`

#### Parameters

• **design**: `Design`

• **search**: `Search`

• **params**: `undefined` \| `null` \| [`GetObjectViewParams`](../-internal-/interfaces/GetObjectViewParams.md)

• **options?**: `unknown`

#### Returns

[`GetObjectViewPromise`](../-internal-/type-aliases/GetObjectViewPromise.md)\<[`InferGetObjectViewItemType`](../-internal-/type-aliases/InferGetObjectViewItemType.md)\<`Design`, `Search`\>\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:193](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L193)

***

### getPluginConfig()

> **getPluginConfig**(`name`): `null` \| `Record`\<`string`, `any`\>

Return plugin configuration

#### Parameters

• **name**: `string`

name of the plugin to return

#### Returns

`null` \| `Record`\<`string`, `any`\>

plugin configuration or null if not existent or not isActive

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10270](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10270)

***

### getPluginInstance()

> **getPluginInstance**(`name`): `null` \| [`Plugin`](../-internal-/type-aliases/Plugin.md)

Return plugin instance

#### Parameters

• **name**: `string`

name of the plugin to return

#### Returns

`null` \| [`Plugin`](../-internal-/type-aliases/Plugin.md)

plugin instance or null if not existent or not isActive

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10252](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10252)

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

port number to start the search for free port

#### Param

optional hostname for the port search

#### Param

return result
       ```js
       function (port) {}
       ```

#### getPort(port, host, callback)

> **getPort**(`port`, `host`?, `callback`?): `void`

Helper function to find next free port

Looks for first free TCP port starting with given one:
```js
    adapter.getPort(8081, function (port) {
        adapter.log.debug('Following port is free: ' + port);
    });
```

##### Parameters

• **port**: `number`

• **host?**: `string`

• **callback?**

##### Returns

`void`

##### Param

port number to start the search for free port

##### Param

optional hostname for the port search

##### Param

return result
       ```js
       function (port) {}
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1559](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1559)

#### getPort(port, callback)

> **getPort**(`port`, `callback`?): `void`

Helper function to find next free port

Looks for first free TCP port starting with given one:
```js
    adapter.getPort(8081, function (port) {
        adapter.log.debug('Following port is free: ' + port);
    });
```

##### Parameters

• **port**: `number`

• **callback?**

##### Returns

`void`

##### Param

port number to start the search for free port

##### Param

optional hostname for the port search

##### Param

return result
       ```js
       function (port) {}
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1560](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1560)

***

### getPortAsync()

> **getPortAsync**(`port`): `Promise`\<`number`\>

Helper function that looks for the first free TCP port starting with the given one.

#### Parameters

• **port**: `number`

#### Returns

`Promise`\<`number`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:315](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L315)

***

### getSession()

> **getSession**(`id`, `callback`): [`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

#### Parameters

• **id**: `string`

• **callback**: [`GetSessionCallback`](../-internal-/type-aliases/GetSessionCallback.md)

#### Returns

[`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1398](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1398)

***

### getState()

Read value from states DB.

This function can read values from states DB for this adapter.
Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.

#### Param

object ID of the state.

#### Param

optional user context

#### Param

return result
       ```js
           function (err, state) {
             if (err) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

#### Set State

explanation

#### getState(id, callback)

> **getState**(`id`, `callback`): `void`

Read value from states DB.

This function can read values from states DB for this adapter.
Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.

##### Parameters

• **id**: `string`

• **callback**: [`GetStateCallback`](../-internal-/type-aliases/GetStateCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, state) {
             if (err) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

##### Set State

explanation

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8975](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8975)

#### getState(id, options, callback)

> **getState**(`id`, `options`, `callback`): `void`

Read value from states DB.

This function can read values from states DB for this adapter.
Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.

##### Parameters

• **id**: `string`

• **options**: `unknown`

• **callback**: [`GetStateCallback`](../-internal-/type-aliases/GetStateCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

optional user context

##### Param

return result
       ```js
           function (err, state) {
             if (err) adapter.log.error('Cannot read value: ' + err);
           }
       ```

       See possible attributes of the state in

##### Set State

explanation

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8976](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8976)

***

### getStateAsync()

> **getStateAsync**(`id`, `options`?): [`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

Read a value from the states DB.

#### Parameters

• **id**: `string`

• **options?**: `unknown`

#### Returns

[`GetStatePromise`](../-internal-/type-aliases/GetStatePromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:217](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L217)

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

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

#### Param

optional argument to describe the user context

#### Param

return result
```js
function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
```

#### getStates(pattern, callback)

> **getStates**(`pattern`, `callback`): `void`

Read all states of this adapter, that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **callback**: [`GetStatesCallback`](../-internal-/type-aliases/GetStatesCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

##### Param

optional argument to describe the user context

##### Param

return result
```js
function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9441](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9441)

#### getStates(pattern, options, callback)

> **getStates**(`pattern`, `options`, `callback`): `void`

Read all states of this adapter, that pass the pattern

Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.getStates('*', function (err, states) {
        for (var id in states) {
             adapter.log.debug('"' + id + '" = "' + states[id].val);
        }
    });
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options**: `unknown`

• **callback**: [`GetStatesCallback`](../-internal-/type-aliases/GetStatesCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

##### Param

optional argument to describe the user context

##### Param

return result
```js
function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9442](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9442)

***

### getStatesAsync()

> **getStatesAsync**(`pattern`, `options`?): [`GetStatesPromise`](../-internal-/type-aliases/GetStatesPromise.md)

Read all states of this adapter that match the given pattern

#### Parameters

• **pattern**: `string`

• **options?**: `unknown`

#### Returns

[`GetStatesPromise`](../-internal-/type-aliases/GetStatesPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L301)

***

### getStatesOf()

#### getStatesOf(callback)

> **getStatesOf**(`callback`): `void`

##### Parameters

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6318](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6318)

#### getStatesOf(parentDevice, callback)

> **getStatesOf**(`parentDevice`, `callback`): `void`

##### Parameters

• **parentDevice**: `string`

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6319](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6319)

#### getStatesOf(parentDevice, parentChannel, callback)

> **getStatesOf**(`parentDevice`, `parentChannel`, `callback`): `void`

##### Parameters

• **parentDevice**: `undefined` \| `null` \| `string`

• **parentChannel**: `undefined` \| `null` \| `string`

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6320](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6320)

#### getStatesOf(parentDevice, parentChannel, options, callback)

> **getStatesOf**(`parentDevice`, `parentChannel`, `options`, `callback`): `void`

##### Parameters

• **parentDevice**: `undefined` \| `null` \| `string`

• **parentChannel**: `undefined` \| `null` \| `string`

• **options**: `unknown`

• **callback**: [`GetObjectsCallback3`](../-internal-/type-aliases/GetObjectsCallback3.md)\<[`StateObject`](../-internal-/interfaces/StateObject.md)\>

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6325](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6325)

***

### getStatesOfAsync()

#### getStatesOfAsync()

> **getStatesOfAsync**(): `Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

Returns a list of all states in this adapter instance

##### Returns

`Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L614)

#### getStatesOfAsync(parentDevice, parentChannel)

> **getStatesOfAsync**(`parentDevice`, `parentChannel`?): `Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

##### Parameters

• **parentDevice**: `string`

• **parentChannel?**: `string`

##### Returns

`Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:615](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L615)

#### getStatesOfAsync(parentDevice, parentChannel, options)

> **getStatesOfAsync**(`parentDevice`, `parentChannel`, `options`?): `Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

##### Parameters

• **parentDevice**: `string`

• **parentChannel**: `string`

• **options?**: `unknown`

##### Returns

`Promise`\<[`StateObject`](../-internal-/interfaces/StateObject.md)[]\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L616)

***

### getSuitableLicenses()

> **getSuitableLicenses**(`all`?, `adapterName`?): `Promise`\<`any`[]\>

This method returns the list of license that can be used by this adapter

#### Parameters

• **all?**: `boolean`

if return the licenses, that used by other instances (true) or only for this instance (false)

• **adapterName?**: `string`

Return licenses for specific adapter

#### Returns

`Promise`\<`any`[]\>

list of suitable licenses

#### Defined in

[adapter/src/lib/adapter/adapter.ts:10314](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10314)

***

### getUserID()

> **getUserID**(`username`): `Promise`\<`undefined` \| `string`\>

Return ID of given username

#### Parameters

• **username**: `string`

name of the user

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1765](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1765)

***

### idToDCS()

> **idToDCS**(`id`): `null` \| `object`

Convert ID into object with device's, channel's and state's name.

Convert "adapter.instance.D.C.S" in object `{device: D, channel: C, state: S}`
Convert ID to `{device: D, channel: C, state: S}`

#### Parameters

• **id**: `string`

short or long string of ID like "stateID" or "adapterName.0.stateID".

#### Returns

`null` \| `object`

parsed ID as an object

#### Defined in

[adapter/src/lib/adapter/adapter.ts:9295](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9295)

***

### importNodeModule()

> **importNodeModule**(`moduleName`): `Promise`\<`unknown`\>

Import a node module which has been installed via `installNodeModule`

#### Parameters

• **moduleName**: `string`

name of the node module

#### Returns

`Promise`\<`unknown`\>

the required node module

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1338](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1338)

***

### installNodeModule()

> **installNodeModule**(`moduleName`, `options`): `Promise`\<`CommandResult`\>

Install specified npm module

#### Parameters

• **moduleName**: `string`

• **options**: [`InstallNodeModuleOptions`](../-internal-/interfaces/InstallNodeModuleOptions.md)

version information

#### Returns

`Promise`\<`CommandResult`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1286](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1286)

***

### listInstalledNodeModules()

> **listInstalledNodeModules**(): `Promise`\<`string`[]\>

List all additional installed node modules from this adapter

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1320](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1320)

***

### mkdir()

#### mkdir(adapterName, path, callback)

> **mkdir**(`adapterName`, `path`, `callback`): `void`

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6929](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6929)

#### mkdir(adapterName, path, options, callback)

> **mkdir**(`adapterName`, `path`, `options`, `callback`): `void`

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options**: `unknown`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6930](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6930)

***

### mkdirAsync()

> **mkdirAsync**(`adapterName`, `path`, `options`?): `Promise`\<`void`\>

#### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:280](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L280)

***

### objectExists()

> **objectExists**(`id`, `options`?): `Promise`\<`boolean` \| `void`\>

Checks if an object exists to the given id, id will be fixed first

#### Parameters

• **id**: `string`

id of the object

• **options?**: `null` \| `Record`\<`string`, `any`\>

optional user context

#### Returns

`Promise`\<`boolean` \| `void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:3709](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3709)

***

### on()

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"stateChange"`

• **listener**: [`StateChangeHandler`](../-internal-/type-aliases/StateChangeHandler.md)

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L152)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"objectChange"`

• **listener**: [`ObjectChangeHandler`](../-internal-/type-aliases/ObjectChangeHandler.md)

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L153)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"fileChange"`

• **listener**: [`FileChangeHandler`](../-internal-/type-aliases/FileChangeHandler.md)

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L154)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"ready"`

• **listener**: [`ReadyHandler`](../-internal-/type-aliases/ReadyHandler.md)

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:155](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L155)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"install"`

• **listener**: [`ReadyHandler`](../-internal-/type-aliases/ReadyHandler.md)

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:156](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L156)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"unload"`

• **listener**: [`UnloadHandler`](../-internal-/type-aliases/UnloadHandler.md)

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L157)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"message"`

• **listener**: [`MessageHandler`](../-internal-/type-aliases/MessageHandler.md)

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:158](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L158)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Only emitted for compact instances

##### Parameters

• **event**: `"exit"`

• **listener**

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L160)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"log"`

• **listener**

##### Returns

`this`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L161)

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

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

path to directory without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

#### Param

optional user context

#### Param

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

#### readDir(adapterName, path, callback)

> **readDir**(`adapterName`, `path`, `callback`): `void`

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

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **callback**: [`ReadDirCallback`](../-internal-/type-aliases/ReadDirCallback.md)

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to directory without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6803](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6803)

#### readDir(adapterName, path, options, callback)

> **readDir**(`adapterName`, `path`, `options`, `callback`): `void`

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

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options**: `unknown`

• **callback**: [`ReadDirCallback`](../-internal-/type-aliases/ReadDirCallback.md)

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to directory without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

optional user context

##### Param

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

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6804](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6804)

***

### readDirAsync()

> **readDirAsync**(`adapterName`, `path`, `options`?): [`ReadDirPromise`](../-internal-/type-aliases/ReadDirPromise.md)

reads the content of directory from DB for given adapter and path

#### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options?**: `unknown`

#### Returns

[`ReadDirPromise`](../-internal-/type-aliases/ReadDirPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:274](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L274)

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

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

#### Param

optional user context

#### Param

return result
       ```js
           function (err, data) {
               // data is utf8 or binary Buffer depends on the file extension.
           }
       ```

#### readFile(adapterName, path, callback)

> **readFile**(`adapterName`, `path`, `callback`): `void`

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
```js
     adapter.readFile('vis-2.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('Content of file is: ' + data);
     });
```

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **callback**: [`ReadFileCallback`](../-internal-/type-aliases/ReadFileCallback.md)

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

optional user context

##### Param

return result
       ```js
           function (err, data) {
               // data is utf8 or binary Buffer depends on the file extension.
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6955](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6955)

#### readFile(adapterName, path, options, callback)

> **readFile**(`adapterName`, `path`, `options`, `callback`): `void`

Read file from DB.

This function reads the content of one file from DB for given adapter and file name.
```js
     adapter.readFile('vis-2.0', '/main/vis-views.json', function (err, data) {
       // All enums
       if (err) adapter.log.error('Cannot read file: ' + err);
       adapter.log.info('Content of file is: ' + data);
     });
```

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options**: `unknown`

• **callback**: [`ReadFileCallback`](../-internal-/type-aliases/ReadFileCallback.md)

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

optional user context

##### Param

return result
       ```js
           function (err, data) {
               // data is utf8 or binary Buffer depends on the file extension.
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6956](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6956)

***

### readFileAsync()

> **readFileAsync**(`adapterName`, `path`, `options`?): [`ReadFilePromise`](../-internal-/type-aliases/ReadFilePromise.md)

reads the content of directory from DB for given adapter and path

#### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options?**: `unknown`

#### Returns

[`ReadFilePromise`](../-internal-/type-aliases/ReadFilePromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:282](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L282)

***

### registerNotification()

> **registerNotification**\<`Scope`\>(`scope`, `category`, `message`, `options`?): `Promise`\<`void`\>

Send notification with given scope and category to host of this adapter

#### Type Parameters

• **Scope** *extends* keyof [`NotificationScopes`](../-internal-/interfaces/NotificationScopes.md)

#### Parameters

• **scope**: `Scope`

scope to be addressed

• **category**: `null` \| [`NotificationScopes`](../-internal-/interfaces/NotificationScopes.md)\[`Scope`\]

to be addressed, if a null message will be checked by regex of given scope

• **message**: `string`

message to be stored/checked

• **options?**: [`NotificationOptions`](../-internal-/interfaces/NotificationOptions.md)

Additional options for the notification, currently `contextData` is supported

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7688](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7688)

***

### rename()

#### rename(adapterName, oldName, newName, callback)

> **rename**(`adapterName`, `oldName`, `newName`, `callback`): `void`

##### Parameters

• **adapterName**: `null` \| `string`

• **oldName**: `string`

• **newName**: `string`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6895](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6895)

#### rename(adapterName, oldName, newName, options, callback)

> **rename**(`adapterName`, `oldName`, `newName`, `options`, `callback`): `void`

##### Parameters

• **adapterName**: `null` \| `string`

• **oldName**: `string`

• **newName**: `string`

• **options**: `unknown`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6896](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6896)

***

### renameAsync()

> **renameAsync**(`adapterName`, `oldName`, `newName`, `options`?): `Promise`\<`void`\>

#### Parameters

• **adapterName**: `null` \| `string`

• **oldName**: `string`

• **newName**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L279)

***

### restart()

> **restart**(): `void`

Restarts an instance of the adapter.

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2529](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2529)

***

### sendTo()

Send message to other adapter instance or all instances of adapter.

This function sends a message to specific instance or all instances of some specific adapter.
If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.

#### Param

name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".

#### Param

command name, like "send", "browse", "list". Command is depend on target adapter implementation.

#### Param

object that will be given as argument for request

#### Param

optional return result
       ```js
           function (result) {
             // result is target adapter specific and can vary from adapter to adapter
             if (!result) adapter.log.error('No response received');
           }
       ```

#### Param

optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance)

#### sendTo(instanceName, message, callback)

> **sendTo**(`instanceName`, `message`, `callback`?): `void`

Send message to other adapter instance or all instances of adapter.

This function sends a message to specific instance or all instances of some specific adapter.
If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.

##### Parameters

• **instanceName**: `string`

• **message**: `any`

• **callback?**: [`MessageCallback`](../-internal-/type-aliases/MessageCallback.md) \| [`MessageCallbackInfo`](../-internal-/interfaces/MessageCallbackInfo.md)

##### Returns

`void`

##### Param

name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".

##### Param

command name, like "send", "browse", "list". Command is depend on target adapter implementation.

##### Param

object that will be given as argument for request

##### Param

optional return result
       ```js
           function (result) {
             // result is target adapter specific and can vary from adapter to adapter
             if (!result) adapter.log.error('No response received');
           }
       ```

##### Param

optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7302](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7302)

#### sendTo(instanceName, command, message, callback, options)

> **sendTo**(`instanceName`, `command`, `message`, `callback`?, `options`?): `void`

Send message to other adapter instance or all instances of adapter.

This function sends a message to specific instance or all instances of some specific adapter.
If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.

##### Parameters

• **instanceName**: `string`

• **command**: `string`

• **message**: `any`

• **callback?**: [`MessageCallback`](../-internal-/type-aliases/MessageCallback.md) \| [`MessageCallbackInfo`](../-internal-/interfaces/MessageCallbackInfo.md)

• **options?**: [`SendToOptions`](../-internal-/interfaces/SendToOptions.md)

##### Returns

`void`

##### Param

name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".

##### Param

command name, like "send", "browse", "list". Command is depend on target adapter implementation.

##### Param

object that will be given as argument for request

##### Param

optional return result
       ```js
           function (result) {
             // result is target adapter specific and can vary from adapter to adapter
             if (!result) adapter.log.error('No response received');
           }
       ```

##### Param

optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7307](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7307)

***

### sendToAsync()

#### sendToAsync(instanceName, message)

> **sendToAsync**(`instanceName`, `message`): `Promise`\<`undefined` \| [`Message`](../-internal-/interfaces/Message.md)\>

Sends a message to a specific instance or all instances of some specific adapter.

##### Parameters

• **instanceName**: `string`

• **message**: `any`

##### Returns

`Promise`\<`undefined` \| [`Message`](../-internal-/interfaces/Message.md)\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:415](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L415)

#### sendToAsync(instanceName, command, message, options)

> **sendToAsync**(`instanceName`, `command`, `message`, `options`?): `Promise`\<`undefined` \| [`Message`](../-internal-/interfaces/Message.md)\>

##### Parameters

• **instanceName**: `string`

• **command**: `string`

• **message**: `any`

• **options?**: [`SendToOptions`](../-internal-/interfaces/SendToOptions.md)

##### Returns

`Promise`\<`undefined` \| [`Message`](../-internal-/interfaces/Message.md)\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:416](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L416)

#### sendToAsync(instanceName, command, message, options)

> **sendToAsync**(`instanceName`, `command`, `message`?, `options`?): `any`

Async version of sendTo
As we have a special case (first arg can be error or result, we need to promisify manually)

##### Parameters

• **instanceName**: `unknown`

name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".

• **command**: `unknown`

command name, like "send", "browse", "list". Command is depend on target adapter implementation.

• **message?**: `unknown`

object that will be given as argument for request

• **options?**: `unknown`

optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance)

##### Returns

`any`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7372](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7372)

***

### sendToHost()

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

#### Param

name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts.

#### Param

command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)

#### Param

object that will be given as argument for request

#### Param

optional return result
       ```js
           function (result) {
             // result is target adapter specific and can vary from command to command
             if (!result) adapter.log.error('No response received');
           }
       ```

#### sendToHost(hostName, message, callback)

> **sendToHost**(`hostName`, `message`, `callback`?): `void`

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

##### Parameters

• **hostName**: `null` \| `string`

• **message**: `any`

• **callback?**: [`MessageCallback`](../-internal-/type-aliases/MessageCallback.md) \| [`MessageCallbackInfo`](../-internal-/interfaces/MessageCallbackInfo.md)

##### Returns

`void`

##### Param

name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts.

##### Param

command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)

##### Param

object that will be given as argument for request

##### Param

optional return result
       ```js
           function (result) {
             // result is target adapter specific and can vary from command to command
             if (!result) adapter.log.error('No response received');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7516](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7516)

#### sendToHost(hostName, command, message, callback)

> **sendToHost**(`hostName`, `command`, `message`, `callback`?): `void`

Send message to specific host or to all hosts.

This function sends a message to specific host or all hosts.
If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.

##### Parameters

• **hostName**: `null` \| `string`

• **command**: `string`

• **message**: `any`

• **callback?**: [`MessageCallback`](../-internal-/type-aliases/MessageCallback.md) \| [`MessageCallbackInfo`](../-internal-/interfaces/MessageCallbackInfo.md)

##### Returns

`void`

##### Param

name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts.

##### Param

command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)

##### Param

object that will be given as argument for request

##### Param

optional return result
       ```js
           function (result) {
             // result is target adapter specific and can vary from command to command
             if (!result) adapter.log.error('No response received');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7521](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7521)

***

### sendToHostAsync()

#### sendToHostAsync(hostName, message)

> **sendToHostAsync**(`hostName`, `message`): `Promise`\<`undefined` \| [`Message`](../-internal-/interfaces/Message.md)\>

Sends a message to a specific host or all hosts.

##### Parameters

• **hostName**: `string`

• **message**: `any`

##### Returns

`Promise`\<`undefined` \| [`Message`](../-internal-/interfaces/Message.md)\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:405](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L405)

#### sendToHostAsync(hostName, command, message)

> **sendToHostAsync**(`hostName`, `command`, `message`): `Promise`\<`undefined` \| [`Message`](../-internal-/interfaces/Message.md)\>

##### Parameters

• **hostName**: `string`

• **command**: `string`

• **message**: `any`

##### Returns

`Promise`\<`undefined` \| [`Message`](../-internal-/interfaces/Message.md)\>

##### Defined in

[adapter/src/lib/adapter/adapter.ts:406](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L406)

***

### sendToUI()

> **sendToUI**(`options`): `Promise`\<`void`\>

Send a message to an active UI Client

#### Parameters

• **options**: [`SendToUserInterfaceClientOptions`](../-internal-/interfaces/SendToUserInterfaceClientOptions.md)

clientId and data options

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:7658](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7658)

***

### setExecutableCapabilities()

> **setExecutableCapabilities**(`execPath`, `capabilities`, `modeEffective`?, `modePermitted`?, `modeInherited`?): `Promise`\<`void`\>

Set the capabilities of the given executable. Only works on Linux systems.

#### Parameters

• **execPath**: `string`

• **capabilities**: `string`[]

• **modeEffective?**: `boolean`

• **modePermitted?**: `boolean`

• **modeInherited?**: `boolean`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L173)

***

### setForeignObject()

Same as [AdapterClass.setObject](AdapterClass.md#setobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

#### Param

object ID, that must be overwritten or created.

#### Param

new object

#### Param

optional user context

#### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

#### setForeignObject(id, obj)

> **setForeignObject**\<`T`\>(`id`, `obj`): `Promise`\<`object`\>

Same as [AdapterClass.setObject](AdapterClass.md#setobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

##### Returns

`Promise`\<`object`\>

###### id

> **id**: `string`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3384](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3384)

#### setForeignObject(id, obj, callback)

> **setForeignObject**\<`T`\>(`id`, `obj`, `callback`): `void`

Same as [AdapterClass.setObject](AdapterClass.md#setobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **callback**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3388](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3388)

#### setForeignObject(id, obj, options)

> **setForeignObject**\<`T`\>(`id`, `obj`, `options`): `Promise`\<`object`\>

Same as [AdapterClass.setObject](AdapterClass.md#setobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options**: `unknown`

##### Returns

`Promise`\<`object`\>

###### id

> **id**: `string`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3393](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3393)

#### setForeignObject(id, obj, options, callback)

> **setForeignObject**\<`T`\>(`id`, `obj`, `options`, `callback`?): `void` \| `Promise`\<`object`\>

Same as [AdapterClass.setObject](AdapterClass.md#setobject), but for any object.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options**: `unknown`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void` \| `Promise`\<`object`\>

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:3398](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L3398)

***

### ~~setForeignObjectAsync()~~

> **setForeignObjectAsync**\<`T`\>(`id`, `obj`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Creates or overwrites an object (which might not belong to this adapter) in the object db

#### Type Parameters

• **T** *extends* `string`

#### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options?**: `unknown`

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Deprecated

use `adapter.setForeignObject` without a callback instead

#### Defined in

[adapter/src/lib/adapter/adapter.ts:345](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L345)

***

### setForeignObjectNotExists()

Same as [AdapterClass.setForeignObject](AdapterClass.md#setforeignobject), but with check if the object exists.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
New object will be created only if no object exists with such ID.

#### Param

object ID, that must be overwritten or created.

#### Param

new object

#### Param

user context

#### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

#### setForeignObjectNotExists(id, obj, callback)

> **setForeignObjectNotExists**\<`T`\>(`id`, `obj`, `callback`?): `void`

Same as [AdapterClass.setForeignObject](AdapterClass.md#setforeignobject), but with check if the object exists.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
New object will be created only if no object exists with such ID.

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5105](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5105)

#### setForeignObjectNotExists(id, obj, options, callback)

> **setForeignObjectNotExists**\<`T`\>(`id`, `obj`, `options`, `callback`?): `void`

Same as [AdapterClass.setForeignObject](AdapterClass.md#setforeignobject), but with check if the object exists.

ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
New object will be created only if no object exists with such ID.

##### Type Parameters

• **T** *extends* `string`

##### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options**: `unknown`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5110](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5110)

***

### setForeignObjectNotExistsAsync()

> **setForeignObjectNotExistsAsync**\<`T`\>(`id`, `obj`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Creates an object (which might not belong to this adapter) in the object db. Existing objects are not overwritten.

#### Type Parameters

• **T** *extends* `string`

#### Parameters

• **id**: `T`

• **obj**: [`SettableObjectWorker`](../-internal-/type-aliases/SettableObjectWorker.md)\<[`ObjectIdToObjectType`](../-internal-/type-aliases/ObjectIdToObjectType.md)\<`T`, `"write"`\>\>

• **options?**: `unknown`

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L225)

***

### setForeignState()

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Param

object ID of the state.

#### Param

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

optional is command(false) or status(true)

#### Param

optional user context

#### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

#### setForeignState(id, state, callback)

> **setForeignState**(`id`, `state`, `callback`?): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **callback?**: [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8526](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8526)

#### setForeignState(id, state, ack, callback)

> **setForeignState**(`id`, `state`, `ack`, `callback`?): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **callback?**: [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8531](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8531)

#### setForeignState(id, state, options, callback)

> **setForeignState**(`id`, `state`, `options`, `callback`?): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **options**: `unknown`

• **callback?**: [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8537](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8537)

#### setForeignState(id, state, ack, options, callback)

> **setForeignState**(`id`, `state`, `ack`, `options`, `callback`?): `void`

Writes value into states DB for any instance.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **options**: `unknown`

• **callback?**: [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8543](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8543)

***

### setForeignStateAsync()

#### setForeignStateAsync(id, state, ack)

> **setForeignStateAsync**(`id`, `state`, `ack`?): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

Writes a value (which might not belong to this adapter) into the states DB.

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack?**: `boolean`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:456](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L456)

#### setForeignStateAsync(id, state, options)

> **setForeignStateAsync**(`id`, `state`, `options`?): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **options?**: `unknown`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:461](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L461)

#### setForeignStateAsync(id, state, ack, options)

> **setForeignStateAsync**(`id`, `state`, `ack`, `options`): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **options**: `unknown`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:466](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L466)

***

### setForeignStateChanged()

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

#### Param

object ID of the state.

#### Param

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

optional is command(false) or status(true)

#### Param

optional user context

#### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

#### setForeignStateChanged(id, state, callback)

> **setForeignStateChanged**(`id`, `state`, `callback`?): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **callback?**: [`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8839](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8839)

#### setForeignStateChanged(id, state, ack, callback)

> **setForeignStateChanged**(`id`, `state`, `ack`, `callback`?): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **callback?**: [`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8844](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8844)

#### setForeignStateChanged(id, state, options, callback)

> **setForeignStateChanged**(`id`, `state`, `options`, `callback`?): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **options**: `unknown`

• **callback?**: [`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8850](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8850)

#### setForeignStateChanged(id, state, ack, options, callback)

> **setForeignStateChanged**(`id`, `state`, `ack`, `options`, `callback`?): `void`

Writes value into states DB for any instance, but only if state changed.

This function can write values into states DB for all instances and system states too.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **options**: `unknown`

• **callback?**: [`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8856](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8856)

***

### setForeignStateChangedAsync()

#### setForeignStateChangedAsync(id, state, ack)

> **setForeignStateChangedAsync**(`id`, `state`, `ack`?): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

Writes a value (which might not belong to this adapter) into the states DB only if it has changed.

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack?**: `boolean`

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:365](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L365)

#### setForeignStateChangedAsync(id, state, options)

> **setForeignStateChangedAsync**(`id`, `state`, `options`?): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **options?**: `unknown`

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L370)

#### setForeignStateChangedAsync(id, state, ack, options)

> **setForeignStateChangedAsync**(`id`, `state`, `ack`, `options`): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **options**: `unknown`

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:375](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L375)

***

### setInterval()

> **setInterval**\<`TCallback`\>(`cb`, `timeout`, ...`args`): `undefined` \| [`Interval`](../-internal-/type-aliases/Interval.md)

Same as setInterval
but it clears the running intervals during the unload process
does not work after unload has been called

#### Type Parameters

• **TCallback** *extends* [`TimeoutCallback`](../-internal-/type-aliases/TimeoutCallback.md)

#### Parameters

• **cb**: `TCallback`

interval callback

• **timeout**: `number`

interval in milliseconds

• ...**args**: `Parameters`\<`TCallback`\>

as many arguments as needed, which will be passed to setTimeout

#### Returns

`undefined` \| [`Interval`](../-internal-/type-aliases/Interval.md)

interval interval object

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2752](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2752)

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

object ID, that must be overwritten or created.

#### Param

new object

#### Param

optional user context

#### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

#### setObject(id, obj)

> **setObject**(`id`, `obj`): `Promise`\<`object`\>

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

##### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

##### Returns

`Promise`\<`object`\>

###### id

> **id**: `string`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:2809](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2809)

#### setObject(id, obj, callback)

> **setObject**(`id`, `obj`, `callback`): `void`

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

##### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

• **callback**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:2813](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2813)

#### setObject(id, obj, options, callback)

> **setObject**(`id`, `obj`, `options`, `callback`): `void`

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

##### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

• **options**: `unknown`

• **callback**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:2814](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2814)

#### setObject(id, obj, options)

> **setObject**(`id`, `obj`, `options`): `Promise`\<`object`\>

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

##### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

• **options**: `unknown`

##### Returns

`Promise`\<`object`\>

###### id

> **id**: `string`

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:2815](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2815)

***

### ~~setObjectAsync()~~

> **setObjectAsync**(`id`, `obj`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Creates or overwrites an object in the object db

#### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

• **options?**: `unknown`

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Deprecated

use `adapter.setObject` without a callback instead

#### Defined in

[adapter/src/lib/adapter/adapter.ts:339](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L339)

***

### setObjectNotExists()

Same as [AdapterClass.setObject](AdapterClass.md#setobject), but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

#### Param

object ID, that must be overwritten or created.

#### Param

new object

#### Param

optional user context

#### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

#### setObjectNotExists(id, obj, callback)

> **setObjectNotExists**(`id`, `obj`, `callback`?): `void` \| `Promise`\<`undefined` \| `void` \| `object`\>

Same as [AdapterClass.setObject](AdapterClass.md#setobject), but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

##### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void` \| `Promise`\<`undefined` \| `void` \| `object`\>

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5003](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5003)

#### setObjectNotExists(id, obj, options, callback)

> **setObjectNotExists**(`id`, `obj`, `options`, `callback`?): `void` \| `Promise`\<`undefined` \| `void` \| `object`\>

Same as [AdapterClass.setObject](AdapterClass.md#setobject), but with check if the object exists.

Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
New object will be created only if no object exists with such ID.

##### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

• **options**: `unknown`

• **callback?**: [`SetObjectCallback`](../-internal-/type-aliases/SetObjectCallback.md)

##### Returns

`void` \| `Promise`\<`undefined` \| `void` \| `object`\>

##### Param

object ID, that must be overwritten or created.

##### Param

new object

##### Param

optional user context

##### Param

return result
       ```js
           function (err, obj) {
             // obj is {id: id}
             if (err) adapter.log.error('Cannot write object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:5008](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L5008)

***

### setObjectNotExistsAsync()

> **setObjectNotExistsAsync**(`id`, `obj`, `options`?): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Creates an object in the object db. Existing objects are not overwritten.

#### Parameters

• **id**: `string`

• **obj**: `Omit`\<[`StateObject`](../-internal-/interfaces/StateObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DeviceObject`](../-internal-/interfaces/DeviceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChannelObject`](../-internal-/interfaces/ChannelObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`FolderObject`](../-internal-/interfaces/FolderObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`MetaObject`](../-internal-/interfaces/MetaObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`EnumObject`](../-internal-/interfaces/EnumObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`HostObject`](../-internal-/interfaces/HostObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`AdapterObject`](../-internal-/interfaces/AdapterObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`InstanceObject`](../-internal-/interfaces/InstanceObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`UserObject`](../-internal-/interfaces/UserObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`GroupObject`](../-internal-/interfaces/GroupObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScriptObject`](../-internal-/interfaces/ScriptObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ChartObject`](../-internal-/interfaces/ChartObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`ScheduleObject`](../-internal-/interfaces/ScheduleObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`RepositoryObject`](../-internal-/interfaces/RepositoryObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`OtherObject`](../-internal-/interfaces/OtherObject.md), `"_id"` \| `"acl"`\> & `object` \| `Omit`\<[`DesignObject`](../-internal-/interfaces/DesignObject.md), `"_id"` \| `"acl"`\> & `object`

• **options?**: `unknown`

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L223)

***

### setPassword()

sets the user's password

#### Param

user name as text

#### Param

password as text

#### Param

optional user context

#### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot set password: ' + err);
           }
       ```

#### setPassword(user, pw, options, callback)

> **setPassword**(`user`, `pw`, `options`, `callback`?): `Promise`\<`void`\>

sets the user's password

##### Parameters

• **user**: `string`

• **pw**: `string`

• **options**: `Record`\<`string`, `any`\>

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

##### Param

user name as text

##### Param

password as text

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot set password: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1796](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1796)

#### setPassword(user, pw, callback)

> **setPassword**(`user`, `pw`, `callback`?): `Promise`\<`void`\>

sets the user's password

##### Parameters

• **user**: `string`

• **pw**: `string`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

##### Param

user name as text

##### Param

password as text

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot set password: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1803](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1803)

***

### setPasswordAsync()

> **setPasswordAsync**(`user`, `password`, `options`?): `Promise`\<`void`\>

Sets a new password for the given user

#### Parameters

• **user**: `string`

• **password**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:325](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L325)

***

### setSession()

> **setSession**(`id`, `ttl`, `data`, `callback`?): [`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

#### Parameters

• **id**: `string`

• **ttl**: `number`

• **data**: `Record`\<`string`, `any`\>

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

#### Returns

[`MaybePromise`](../-internal-/type-aliases/MaybePromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1419](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1419)

***

### setState()

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Param

object ID of the state.

#### Param

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

optional is command(false) or status(true)

#### Param

optional user context

#### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

#### setState(id, state, callback)

> **setState**\<`T`\>(`id`, `state`, `callback`?): `T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

##### Type Parameters

• **T** *extends* `undefined` \| [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

##### Parameters

• **id**: `string` \| [`IdObject`](../-internal-/interfaces/IdObject.md)

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **callback?**: `T`

##### Returns

`T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7738](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7738)

#### setState(id, state, ack, callback)

> **setState**\<`T`\>(`id`, `state`, `ack`, `callback`?): `T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

##### Type Parameters

• **T** *extends* `undefined` \| [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

##### Parameters

• **id**: `string` \| [`IdObject`](../-internal-/interfaces/IdObject.md)

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **callback?**: `T`

##### Returns

`T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7743](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7743)

#### setState(id, state, options, callback)

> **setState**\<`T`\>(`id`, `state`, `options`?, `callback`?): `T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

##### Type Parameters

• **T** *extends* `undefined` \| [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

##### Parameters

• **id**: `string` \| [`IdObject`](../-internal-/interfaces/IdObject.md)

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **options?**: `null` \| `Partial`\<[`GetUserGroupsOptions`](../-internal-/interfaces/GetUserGroupsOptions.md)\>

• **callback?**: `T`

##### Returns

`T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7749](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7749)

#### setState(id, state, ack, options, callback)

> **setState**\<`T`\>(`id`, `state`, `ack`, `options`?, `callback`?): `T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

Writes value into states DB.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

##### Type Parameters

• **T** *extends* `undefined` \| [`SetStateCallback`](../-internal-/type-aliases/SetStateCallback.md)

##### Parameters

• **id**: `string` \| [`IdObject`](../-internal-/interfaces/IdObject.md)

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **options?**: `null` \| `Partial`\<[`GetUserGroupsOptions`](../-internal-/interfaces/GetUserGroupsOptions.md)\>

• **callback?**: `T`

##### Returns

`T` *extends* `unknown` ? [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md) : `void`

##### Param

object ID of the state.

##### Param

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

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error and id
       ```js
           function (err, id) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7755](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7755)

***

### ~~setStateAsync()~~

#### setStateAsync(id, state, ack)

> **setStateAsync**(`id`, `state`, `ack`?): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

Writes a value into the states DB.

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack?**: `boolean`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Deprecated

use `adapter.setState` without callback instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L434)

#### setStateAsync(id, state, options)

> **setStateAsync**(`id`, `state`, `options`?): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **options?**: `unknown`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Deprecated

use `adapter.setState` without callback instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L440)

#### setStateAsync(id, state, ack, options)

> **setStateAsync**(`id`, `state`, `ack`, `options`): [`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **options**: `unknown`

##### Returns

[`SetStatePromise`](../-internal-/type-aliases/SetStatePromise.md)

##### Deprecated

use `adapter.setState` without callback instead

##### Defined in

[adapter/src/lib/adapter/adapter.ts:446](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L446)

***

### setStateChanged()

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

#### Param

object ID of the state.

#### Param

simple value or object with attribues.

#### Param

optional is command(false) or status(true)

#### Param

optional user context

#### Param

optional return error, id and notChanged
       ```js
           function (err, id, notChanged) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
             if (!notChanged) adapter.log.debug('Value was changed');
           }
       ```

#### setStateChanged(id, state, callback)

> **setStateChanged**(`id`, `state`, `callback`?): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **callback?**: [`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

simple value or object with attribues.

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error, id and notChanged
       ```js
           function (err, id, notChanged) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
             if (!notChanged) adapter.log.debug('Value was changed');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8384](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8384)

#### setStateChanged(id, state, ack, callback)

> **setStateChanged**(`id`, `state`, `ack`, `callback`?): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **callback?**: [`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

simple value or object with attribues.

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error, id and notChanged
       ```js
           function (err, id, notChanged) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
             if (!notChanged) adapter.log.debug('Value was changed');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8389](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8389)

#### setStateChanged(id, state, options, callback)

> **setStateChanged**(`id`, `state`, `options`, `callback`?): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **options**: `unknown`

• **callback?**: [`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

simple value or object with attribues.

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error, id and notChanged
       ```js
           function (err, id, notChanged) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
             if (!notChanged) adapter.log.debug('Value was changed');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8395](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8395)

#### setStateChanged(id, state, ack, options, callback)

> **setStateChanged**(`id`, `state`, `ack`, `options`, `callback`?): `void`

Writes value into states DB only if the value really changed.

This function can write values into states DB for this adapter.
Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
ack, options and callback are optional

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **options**: `unknown`

• **callback?**: [`SetStateChangedCallback`](../-internal-/type-aliases/SetStateChangedCallback.md)

##### Returns

`void`

##### Param

object ID of the state.

##### Param

simple value or object with attribues.

##### Param

optional is command(false) or status(true)

##### Param

optional user context

##### Param

optional return error, id and notChanged
       ```js
           function (err, id, notChanged) {
             if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
             if (!notChanged) adapter.log.debug('Value was changed');
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:8401](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L8401)

***

### setStateChangedAsync()

#### setStateChangedAsync(id, state, ack)

> **setStateChangedAsync**(`id`, `state`, `ack`?): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

Writes a value into the states DB only if it has changed.

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack?**: `boolean`

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L385)

#### setStateChangedAsync(id, state, options)

> **setStateChangedAsync**(`id`, `state`, `options`?): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **options?**: `unknown`

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:390](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L390)

#### setStateChangedAsync(id, state, ack, options)

> **setStateChangedAsync**(`id`, `state`, `ack`, `options`): [`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Parameters

• **id**: `string`

• **state**: [`State`](../-internal-/interfaces/State.md) \| [`SettableState`](../-internal-/type-aliases/SettableState.md) \| [`StateValue`](../-internal-/type-aliases/StateValue.md)

• **ack**: `boolean`

• **options**: `unknown`

##### Returns

[`SetStateChangedPromise`](../-internal-/type-aliases/SetStateChangedPromise.md)

##### Defined in

[adapter/src/lib/adapter/adapter.ts:395](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L395)

***

### setTimeout()

> **setTimeout**\<`TCallback`\>(`cb`, `timeout`, ...`args`): `undefined` \| [`Timeout`](../-internal-/type-aliases/Timeout.md)

Same as setTimeout,
but it clears the running timers during the unloading process
does not work after unload has been called

#### Type Parameters

• **TCallback** *extends* [`TimeoutCallback`](../-internal-/type-aliases/TimeoutCallback.md)

#### Parameters

• **cb**: `TCallback`

timer callback

• **timeout**: `number`

timeout in milliseconds

• ...**args**: `Parameters`\<`TCallback`\>

as many arguments as needed, which will be passed to setTimeout

#### Returns

`undefined` \| [`Timeout`](../-internal-/type-aliases/Timeout.md)

timer id

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2661](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2661)

***

### subscribeForeignFiles()

> **subscribeForeignFiles**(`id`, `pattern`, `options`?): `Promise`\<`void`\>

Subscribe for the changes of files in specific instance.

#### Parameters

• **id**: `string`

adapter ID like 'vis-2.0' or 'vis-2.admin'

• **pattern**: `string` \| `string`[]

pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns

• **options?**: `unknown`

optional user context

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4944](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4944)

***

### subscribeForeignObjects()

Subscribe for the changes of objects in any instance.

#### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns

#### Param

optional user context

#### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot subscribe object: ' + err);
           }
       ```

#### subscribeForeignObjects(pattern, callback)

> **subscribeForeignObjects**(`pattern`, `callback`?): `void`

Subscribe for the changes of objects in any instance.

##### Parameters

• **pattern**: `string` \| `string`[]

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns

##### Param

optional user context

##### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot subscribe object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4865](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4865)

#### subscribeForeignObjects(pattern, options, callback)

> **subscribeForeignObjects**(`pattern`, `options`, `callback`?): `void`

Subscribe for the changes of objects in any instance.

##### Parameters

• **pattern**: `string` \| `string`[]

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns

##### Param

optional user context

##### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot subscribe object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4866](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4866)

***

### subscribeForeignObjectsAsync()

> **subscribeForeignObjectsAsync**(`pattern`, `options`?): `Promise`\<`void`\>

Subscribe to changes of objects (which might not belong to this adapter)

#### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L219)

***

### subscribeForeignStates()

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
```js
    adapter.subscribeForeignStates('adapterName.X.*');
```

#### Param

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

#### Param

optional argument to describe the user context

#### Param

return result ```function (err) {}```

#### subscribeForeignStates(pattern, callback)

> **subscribeForeignStates**(`pattern`, `callback`?): `void`

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
```js
    adapter.subscribeForeignStates('adapterName.X.*');
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

##### Param

optional argument to describe the user context

##### Param

return result ```function (err) {}```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9811](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9811)

#### subscribeForeignStates(pattern, options, callback)

> **subscribeForeignStates**(`pattern`, `options`, `callback`?): `void`

Subscribe for changes on all states of all adapters (and system states), that pass the pattern

Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
```js
    adapter.subscribeForeignStates('adapterName.X.*');
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*' or like this. It can be an array of IDs too.

##### Param

optional argument to describe the user context

##### Param

return result ```function (err) {}```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:9812](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L9812)

***

### subscribeForeignStatesAsync()

> **subscribeForeignStatesAsync**(`pattern`, `options`?): `Promise`\<`void`\>

Subscribe to changes of states (which might not belong to this adapter)

#### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L305)

***

### subscribeObjects()

Subscribe for the changes of objects in this instance.

#### Param

pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces

#### Param

optional user context

#### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot subscribe object: ' + err);
           }
       ```

#### subscribeObjects(pattern, callback)

> **subscribeObjects**(`pattern`, `callback`?): `void`

Subscribe for the changes of objects in this instance.

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces

##### Param

optional user context

##### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot subscribe object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4780](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4780)

#### subscribeObjects(pattern, options, callback)

> **subscribeObjects**(`pattern`, `options`, `callback`?): `void`

Subscribe for the changes of objects in this instance.

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces

##### Param

optional user context

##### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot subscribe object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4781](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4781)

***

### subscribeObjectsAsync()

> **subscribeObjectsAsync**(`pattern`, `options`?): `Promise`\<`void`\>

Subscribe to changes of objects in this instance

#### Parameters

• **pattern**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L213)

***

### subscribeStates()

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
```

#### Param

string in form 'adapter.0.*' or like this. Only string allowed

#### Param

optional argument to describe the user context

#### Param

optional callback

#### subscribeStates(pattern, callback)

> **subscribeStates**(`pattern`, `callback`?): `void`

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*' or like this. Only string allowed

##### Param

optional argument to describe the user context

##### Param

optional callback

##### Defined in

[adapter/src/lib/adapter/adapter.ts:10182](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10182)

#### subscribeStates(pattern, options, callback)

> **subscribeStates**(`pattern`, `options`, `callback`?): `void`

Subscribe for changes on all states of this instance, that pass the pattern

Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
```js
    adapter.subscribeStates('*'); // subscribe for all states of this adapter
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*' or like this. Only string allowed

##### Param

optional argument to describe the user context

##### Param

optional callback

##### Defined in

[adapter/src/lib/adapter/adapter.ts:10183](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10183)

***

### subscribeStatesAsync()

> **subscribeStatesAsync**(`pattern`, `options`?): `Promise`\<`void`\>

Subscribe to changes of states in this instance

#### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:309](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L309)

***

### supportsFeature()

> **supportsFeature**(`featureName`): `boolean`

Method to check for available Features for adapter development

Use it like ...
```js
if (adapter.supportsFeature && adapter.supportsFeature('ALIAS')) {
...
}
```

#### Parameters

• **featureName**: `"ALIAS"` \| `"ALIAS_SEPARATE_READ_WRITE_ID"` \| `"ADAPTER_GETPORT_BIND"` \| `"ADAPTER_DEL_OBJECT_RECURSIVE"` \| `"ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE"` \| `"ADAPTER_AUTO_DECRYPT_NATIVE"` \| `"PLUGINS"` \| `"CONTROLLER_NPM_AUTO_REBUILD"` \| `"CONTROLLER_READWRITE_BASE_SETTINGS"` \| `"CONTROLLER_MULTI_REPO"` \| `"CONTROLLER_LICENSE_MANAGER"` \| `"CONTROLLER_OS_PACKAGE_UPGRADE"` \| `"DEL_INSTANCE_CUSTOM"` \| `"CUSTOM_FULL_VIEW"` \| `"ADAPTER_GET_OBJECTS_BY_ARRAY"` \| `"CONTROLLER_UI_UPGRADE"` \| `"ADAPTER_WEBSERVER_UPGRADE"`

the name of the feature to check

#### Returns

`boolean`

true/false if the feature is in the list of supported features

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1625](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1625)

***

### terminate()

stops the execution of adapter, but not disables it.

Sometimes, the adapter must be stopped if some libraries are missing.

#### Param

optional termination description

#### Param

optional exit code

#### terminate(exitCode)

> **terminate**(`exitCode`?): `never`

stops the execution of adapter, but not disables it.

Sometimes, the adapter must be stopped if some libraries are missing.

##### Parameters

• **exitCode?**: `number`

##### Returns

`never`

##### Param

optional termination description

##### Param

optional exit code

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1476](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1476)

#### terminate(reason, exitCode)

> **terminate**(`reason`?, `exitCode`?): `never`

stops the execution of adapter, but not disables it.

Sometimes, the adapter must be stopped if some libraries are missing.

##### Parameters

• **reason?**: `string`

• **exitCode?**: `number`

##### Returns

`never`

##### Param

optional termination description

##### Param

optional exit code

##### Defined in

[adapter/src/lib/adapter/adapter.ts:1477](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1477)

***

### uninstallNodeModule()

> **uninstallNodeModule**(`moduleName`): `Promise`\<`CommandResult`\>

Uninstall specified npm module

#### Parameters

• **moduleName**: `string`

name of the node module

#### Returns

`Promise`\<`CommandResult`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:1324](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L1324)

***

### unlink()

#### unlink(adapterName, path, callback)

> **unlink**(`adapterName`, `path`, `callback`): `void`

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6867](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6867)

#### unlink(adapterName, path, options, callback)

> **unlink**(`adapterName`, `path`, `options`, `callback`): `void`

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options**: `unknown`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Defined in

[adapter/src/lib/adapter/adapter.ts:6868](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L6868)

***

### unlinkAsync()

> **unlinkAsync**(`adapterName`, `path`, `options`?): `Promise`\<`void`\>

Deletes a given file

#### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:276](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L276)

***

### unsubscribeForeignFiles()

> **unsubscribeForeignFiles**(`id`, `pattern`, `options`?): `Promise`\<`void`\>

Unsubscribe for the changes of files on specific instance.

#### Parameters

• **id**: `string`

adapter ID like 'vis-2.0' or 'vis-2.admin'

• **pattern**: `string` \| `string`[]

pattern like 'channel.*' or '*' (all objects) - without namespaces

• **options?**: `unknown`

optional user context

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:4972](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4972)

***

### unsubscribeForeignObjects()

Unsubscribe for the patterns on all objects.

#### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces

#### Param

optional user context

#### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
           }
       ```

#### unsubscribeForeignObjects(pattern, callback)

> **unsubscribeForeignObjects**(`pattern`, `callback`?): `void`

Unsubscribe for the patterns on all objects.

##### Parameters

• **pattern**: `string` \| `string`[]

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces

##### Param

optional user context

##### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4903](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4903)

#### unsubscribeForeignObjects(pattern, options, callback)

> **unsubscribeForeignObjects**(`pattern`, `options`, `callback`?): `void`

Unsubscribe for the patterns on all objects.

##### Parameters

• **pattern**: `string` \| `string`[]

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces

##### Param

optional user context

##### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4904](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4904)

***

### unsubscribeForeignObjectsAsync()

> **unsubscribeForeignObjectsAsync**(`pattern`, `options`?): `Promise`\<`void`\>

Unsubscribe from changes of objects (which might not belong to this adapter)

#### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L221)

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

string in form 'adapter.0.*'. Must be the same as subscribe.

#### Param

optional argument to describe the user context

#### Param

return result
```js
function (err) {}
```

#### unsubscribeForeignStates(pattern, callback)

> **unsubscribeForeignStates**(`pattern`, `callback`?): `void`

Unsubscribe for changes for given pattern

This function allows to unsubscribe from changes. The pattern must be equal to requested one.
```js
    adapter.subscribeForeignStates('adapterName.X.*');
    adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
    adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
```

##### Parameters

• **pattern**: `string` \| `string`[]

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*'. Must be the same as subscribe.

##### Param

optional argument to describe the user context

##### Param

return result
```js
function (err) {}
```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:10032](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10032)

#### unsubscribeForeignStates(pattern, options, callback)

> **unsubscribeForeignStates**(`pattern`, `options`, `callback`?): `void`

Unsubscribe for changes for given pattern

This function allows to unsubscribe from changes. The pattern must be equal to requested one.
```js
    adapter.subscribeForeignStates('adapterName.X.*');
    adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
    adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
```

##### Parameters

• **pattern**: `string` \| `string`[]

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*'. Must be the same as subscribe.

##### Param

optional argument to describe the user context

##### Param

return result
```js
function (err) {}
```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:10033](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10033)

***

### unsubscribeForeignStatesAsync()

> **unsubscribeForeignStatesAsync**(`pattern`, `options`?): `Promise`\<`void`\>

Subscribe from changes of states (which might not belong to this adapter)

#### Parameters

• **pattern**: `string` \| `string`[]

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:307](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L307)

***

### unsubscribeObjects()

Unsubscribe on the changes of objects in this instance.

#### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces

#### Param

optional user context

#### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
           }
       ```

#### unsubscribeObjects(pattern, callback)

> **unsubscribeObjects**(`pattern`, `callback`?): `void`

Unsubscribe on the changes of objects in this instance.

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces

##### Param

optional user context

##### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4822](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4822)

#### unsubscribeObjects(pattern, options, callback)

> **unsubscribeObjects**(`pattern`, `options`, `callback`?): `void`

Unsubscribe on the changes of objects in this instance.

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

pattern like 'channel.*' or '*' (all objects) - without namespaces

##### Param

optional user context

##### Param

optional returns result
       ```js
           function (err) {
             if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:4823](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L4823)

***

### unsubscribeObjectsAsync()

> **unsubscribeObjectsAsync**(`pattern`, `options`?): `Promise`\<`void`\>

Unsubscribe from changes of objects in this instance

#### Parameters

• **pattern**: `string`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:215](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L215)

***

### unsubscribeStates()

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

```js
    adapter.unsubscribeStates('abc*'); // This will not work
    adapter.unsubscribeStates('*');    // Valid unsubscribe
```

#### Param

string in form 'adapter.0.*'. Must be the same as subscribe.

#### Param

optional argument to describe the user context

#### Param

optional callback

#### unsubscribeStates(pattern, callback)

> **unsubscribeStates**(`pattern`, `callback`?): `void`

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

```js
    adapter.unsubscribeStates('abc*'); // This will not work
    adapter.unsubscribeStates('*');    // Valid unsubscribe
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*'. Must be the same as subscribe.

##### Param

optional argument to describe the user context

##### Param

optional callback

##### Defined in

[adapter/src/lib/adapter/adapter.ts:10216](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10216)

#### unsubscribeStates(pattern, options, callback)

> **unsubscribeStates**(`pattern`, `options`, `callback`?): `void`

Unsubscribe for changes for given pattern for own states.

This function allows to unsubscribe from changes. The pattern must be equal to requested one.

```js
    adapter.unsubscribeStates('abc*'); // This will not work
    adapter.unsubscribeStates('*');    // Valid unsubscribe
```

##### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options**: `unknown`

• **callback?**: [`ErrorCallback`](../-internal-/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Param

string in form 'adapter.0.*'. Must be the same as subscribe.

##### Param

optional argument to describe the user context

##### Param

optional callback

##### Defined in

[adapter/src/lib/adapter/adapter.ts:10217](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L10217)

***

### unsubscribeStatesAsync()

> **unsubscribeStatesAsync**(`pattern`, `options`?): `Promise`\<`void`\>

Subscribe from changes of states in this instance

#### Parameters

• **pattern**: [`Pattern`](../-internal-/type-aliases/Pattern.md)

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L311)

***

### updateConfig()

> **updateConfig**(`newConfig`): [`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

Updates the adapter config with new values. Only a subset of the configuration has to be provided,
since merging with the existing config is done automatically, e.g., like this:

`adapter.updateConfig({prop1: "newValue1"})`

After updating the configuration, the adapter is automatically restarted.

#### Parameters

• **newConfig**: `Record`\<`string`, `any`\>

The new config values to be stored

#### Returns

[`SetObjectPromise`](../-internal-/type-aliases/SetObjectPromise.md)

#### Defined in

[adapter/src/lib/adapter/adapter.ts:2538](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L2538)

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

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

#### Param

path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

#### Param

data as UTF8 string or buffer depends on the file extension.

#### Param

optional user context

#### Param

return result
       ```js
           function (err) {

           }
       ```

#### writeFile(adapterName, path, data, callback)

> **writeFile**(`adapterName`, `path`, `data`, `callback`): `void`

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
```js
     adapter.writeFile('vis-2.0', '/main/vis-views.json', data, function (err) {
       err && adapter.log.error('Cannot write file: ' + err);
     });
```

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **data**: `string` \| `Buffer`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

data as UTF8 string or buffer depends on the file extension.

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {

           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7006](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7006)

#### writeFile(adapterName, path, data, options, callback)

> **writeFile**(`adapterName`, `path`, `data`, `options`, `callback`): `void`

Write file to DB.

This function writes the content of one file into DB for given adapter and file name.
```js
     adapter.writeFile('vis-2.0', '/main/vis-views.json', data, function (err) {
       err && adapter.log.error('Cannot write file: ' + err);
     });
```

##### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **data**: `string` \| `Buffer`

• **options**: `unknown`

• **callback**: [`ErrnoCallback`](../-internal-/type-aliases/ErrnoCallback.md)

##### Returns

`void`

##### Param

adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.

##### Param

path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".

##### Param

data as UTF8 string or buffer depends on the file extension.

##### Param

optional user context

##### Param

return result
       ```js
           function (err) {

           }
       ```

##### Defined in

[adapter/src/lib/adapter/adapter.ts:7007](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L7007)

***

### writeFileAsync()

> **writeFileAsync**(`adapterName`, `path`, `data`, `options`?): `Promise`\<`void`\>

#### Parameters

• **adapterName**: `null` \| `string`

• **path**: `string`

• **data**: `string` \| `Buffer`

• **options?**: `unknown`

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/adapter.ts:283](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/adapter.ts#L283)
