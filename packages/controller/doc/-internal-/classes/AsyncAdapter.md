[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AsyncAdapter

# Class: AsyncAdapter

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L15)

Clean async-only facade for the adapter's outbound messaging. Owns the [MessagingManager](MessagingManager.md)
and exposes promise-based methods without the legacy `*Async` postfix.

## Constructors

### Constructor

> **new AsyncAdapter**(`ctx`): `AsyncAdapter`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L21)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

#### Returns

`AsyncAdapter`

## Methods

### clearPending()

> **clearPending**(): `void`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:198](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L198)

Rejects all pending reply promises and clears their timers (used on stop).

#### Returns

`void`

***

### registerNotification()

#### Param

**scope**

notification scope

#### Param

**category**

notification category

#### Param

**message**

notification message

#### Param

**options**

additional notification options

#### Call Signature

> **registerNotification**\<`Scope`\>(`scope`, `category`, `message`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L153)

Sends an addNotification command to the host of this adapter instance.

##### Type Parameters

###### Scope

`Scope` *extends* keyof [`NotificationScopes`](../interfaces/NotificationScopes.md)

##### Parameters

###### scope

`Scope`

notification scope

###### category

[`NotificationScopes`](../interfaces/NotificationScopes.md)\[`Scope`\] \| `null`

notification category, or `null` to match by scope regex

###### message

`string`

notification message

###### options?

[`NotificationOptions`](../interfaces/NotificationOptions.md)

additional notification options

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **registerNotification**(`scope`, `category`, `message`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:166](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L166)

**`Internal`**

##### Parameters

###### scope

`unknown`

notification scope

###### category

`unknown`

notification category

###### message

`unknown`

notification message

###### options?

`unknown`

additional notification options

##### Returns

`Promise`\<`void`\>

***

### resolveReply()

> **resolveReply**(`obj`): `boolean`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:191](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L191)

Resolves a pending reply promise for an acked messagebox message.
Returns true if a pending entry was found and consumed.

#### Parameters

##### obj

[`Message`](../interfaces/Message.md)

incoming message object from the messagebox

#### Returns

`boolean`

***

### sendTo()

#### Param

**instanceName**

name of the instance to send the message to

#### Param

**command**

command name

#### Param

**message**

message payload

#### Param

**options**

send options

#### Call Signature

> **sendTo**(`instanceName`, `command`, `message`, `options?`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L37)

Sends a message to another adapter instance and, unless `options.expectReply` is `false`,
resolves with the reply when it arrives (or rejects with `Error('Timeout exceeded')` on timeout).

Broadcast targets (instance name without a trailing `.<number>`) resolve void regardless.

##### Parameters

###### instanceName

`string`

name of the instance to send the message to

###### command

`string`

command name

###### message

`any`

message payload

###### options?

[`SendToOptions`](../interfaces/SendToOptions.md) & `object`

send options; set `expectReply: false` for fire-and-forget, or pass a legacy
       `callback` info header (mutually exclusive with `expectReply`)

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **sendTo**(`instanceName`, `command`, `message?`, `options?`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:50](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L50)

**`Internal`**

##### Parameters

###### instanceName

`unknown`

name of the instance to send the message to

###### command

`unknown`

command name

###### message?

`unknown`

message payload

###### options?

`unknown`

send options

##### Returns

`Promise`\<`any`\>

***

### sendToHost()

#### Param

**hostName**

name of the host, or `null` to broadcast to all hosts

#### Param

**command**

command name

#### Param

**message**

message payload

#### Param

**options**

send options

#### Call Signature

> **sendToHost**(`hostName`, `command`, `message`, `options?`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:88](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L88)

Sends a message to a host, or broadcasts to all hosts when `hostName` is `null`.
For a specific host, resolves with the reply unless `options.expectReply` is `false`.
Broadcasts resolve void.

##### Parameters

###### hostName

`string` \| `null`

name of the host, or `null` to broadcast to all hosts

###### command

`string`

command name

###### message

`any`

message payload

###### options?

[`SendToOptions`](../interfaces/SendToOptions.md) & `object`

send options; set `expectReply: false` for fire-and-forget

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **sendToHost**(`hostName`, `command`, `message?`, `options?`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:101](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L101)

**`Internal`**

##### Parameters

###### hostName

`unknown`

name of the host, or `null` to broadcast to all hosts

###### command

`unknown`

command name

###### message?

`unknown`

message payload

###### options?

`unknown`

send options

##### Returns

`Promise`\<`any`\>

***

### sendToUI()

> **sendToUI**(`options`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:137](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/adapter/asyncAdapter.ts#L137)

Sends a message to a single UI client, or broadcasts to all connected UI clients when `clientId` is omitted.

#### Parameters

##### options

[`AllPropsUnknown`](../type-aliases/AllPropsUnknown.md)\<[`SendToUserInterfaceClientOptions`](../interfaces/SendToUserInterfaceClientOptions.md)\>

clientId and data options

#### Returns

`Promise`\<`void`\>
