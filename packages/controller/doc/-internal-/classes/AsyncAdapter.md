[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AsyncAdapter

# Class: AsyncAdapter

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L18)

Clean async-only facade for the adapter's outbound messaging. Owns the [MessagingManager](MessagingManager.md)
and exposes promise-based methods without the legacy `*Async` postfix.

## Constructors

### Constructor

> **new AsyncAdapter**(`ctx`): `AsyncAdapter`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:26](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L26)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

#### Returns

`AsyncAdapter`

## Methods

### clearPending()

> **clearPending**(): `void`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L265)

Rejects all pending reply promises and clears their timers (used on stop).

#### Returns

`void`

***

### getCertificates()

#### Param

**publicName**

public certificate name

#### Param

**privateName**

private key name

#### Param

**chainedName**

chained certificate name

#### Call Signature

> **getCertificates**(`publicName?`, `privateName?`, `chainedName?`): `Promise`\<[`InternalGetCertificatesResult`](../interfaces/InternalGetCertificatesResult.md)\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:208](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L208)

Loads SSL certificates by name, falling back to the instance config defaults. File-backed
certificate values are resolved to their content and their paths returned for watching.

##### Parameters

###### publicName?

`string`

public certificate name (defaults to `config.certPublic`)

###### privateName?

`string`

private key name (defaults to `config.certPrivate`)

###### chainedName?

`string`

chained certificate name (defaults to `config.certChained`)

##### Returns

`Promise`\<[`InternalGetCertificatesResult`](../interfaces/InternalGetCertificatesResult.md)\>

#### Call Signature

> **getCertificates**(`publicName?`, `privateName?`, `chainedName?`): `Promise`\<[`InternalGetCertificatesResult`](../interfaces/InternalGetCertificatesResult.md)\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L219)

**`Internal`**

##### Parameters

###### publicName?

`unknown`

public certificate name

###### privateName?

`unknown`

private key name

###### chainedName?

`unknown`

chained certificate name

##### Returns

`Promise`\<[`InternalGetCertificatesResult`](../interfaces/InternalGetCertificatesResult.md)\>

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L168)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L181)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:258](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L258)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:52](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L52)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:65](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L65)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:103](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L103)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L116)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:152](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/asyncAdapter.ts#L152)

Sends a message to a single UI client, or broadcasts to all connected UI clients when `clientId` is omitted.

#### Parameters

##### options

[`AllPropsUnknown`](../type-aliases/AllPropsUnknown.md)\<[`SendToUserInterfaceClientOptions`](../interfaces/SendToUserInterfaceClientOptions.md)\>

clientId and data options

#### Returns

`Promise`\<`void`\>
