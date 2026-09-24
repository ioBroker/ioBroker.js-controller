[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AsyncAdapter

# Class: AsyncAdapter

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L19)

Clean async-only facade for the adapter's outbound messaging. Owns the [MessagingManager](MessagingManager.md)
and exposes promise-based methods without the legacy `*Async` postfix.

## Constructors

### Constructor

> **new AsyncAdapter**(`ctx`): `AsyncAdapter`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L28)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

#### Returns

`AsyncAdapter`

## Methods

### checkUsedResource()

> **checkUsedResource**\<`T`\>(`type`, `data?`): `Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)\>[]\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L305)

Asks the host whether another instance currently holds a resource, without registering it.

#### Type Parameters

##### T

`T` *extends* keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)

#### Parameters

##### type

`T`

the kind of resource, e.g. "serialPort" or "tcpPort"

##### data?

`Partial`\<[`UsedResourceData`](../type-aliases/UsedResourceData.md)\<`T`\>\>

description of the resource that is about to be used

#### Returns

`Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)\>[]\>

the entries of other instances that currently hold it

#### Throws

when the host refuses the request or does not answer

***

### clearPending()

> **clearPending**(): `void`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L378)

Rejects all pending reply promises and clears their timers (used on stop).

#### Returns

`void`

***

### clearUsedResources()

> **clearUsedResources**(): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L321)

Frees all exclusive resources this instance registered, across all types.

#### Returns

`Promise`\<`void`\>

#### Throws

when the host refuses the command or does not answer

***

### freeUsedResource()

> **freeUsedResource**\<`T`\>(`type`, `data?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:333](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L333)

Frees previously registered exclusive resources of this instance. `data` is a filter: every field it
names must match. If it is omitted, all registered resources of the given `type` are freed.

#### Type Parameters

##### T

`T` *extends* keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)

#### Parameters

##### type

`T`

the kind of resource, e.g. "serialPort" or "tcpPort"

##### data?

`Partial`\<[`UsedResourceData`](../type-aliases/UsedResourceData.md)\<`T`\>\>

fields identifying the resources to free; if omitted, all resources of `type` are freed

#### Returns

`Promise`\<`void`\>

#### Throws

when the host refuses the command or does not answer

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:215](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L215)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L226)

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

### getHostUsedResources()

#### Param

**type**

resource type to read; if omitted, the resources of every type are read

#### Call Signature

> **getHostUsedResources**\<`T`\>(`type`): `Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<`T`\>[]\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:350](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L350)

Reads the exclusive resources of the given type registered on this instance's host, across all
instances of that host.

##### Type Parameters

###### T

`T` *extends* keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)

##### Parameters

###### type

`T`

resource type to read, e.g. "serialPort"

##### Returns

`Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<`T`\>[]\>

#### Call Signature

> **getHostUsedResources**(): `Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)\>[]\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:352](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L352)

Reads the exclusive resources of every type registered on this instance's host.

##### Returns

`Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)\>[]\>

***

### hasRelevantCertificateChange()

> **hasRelevantCertificateChange**(`obj`): `boolean`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:266](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L266)

Tells whether a new version of the `system.certificates` object changes one of the certificates
handed out by the last [getCertificates](#getcertificates) call. Returns false if certificates were never
requested, so unrelated certificate edits do not concern this adapter.

#### Parameters

##### obj

[`OtherObject`](../interfaces/OtherObject.md) \| `null` \| `undefined`

the new `system.certificates` object, or null/undefined if it was deleted

#### Returns

`boolean`

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L175)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L188)

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

### registerUsedResource()

> **registerUsedResource**\<`T`\>(`type`, `data`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L288)

Registers an exclusive resource (serial port, TCP/UDP port, USB device, ...) as used by this
instance. The registration is forwarded to the host, which stores it under
`system.host.<hostname>.usedResources.<type>`.

#### Type Parameters

##### T

`T` *extends* keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)

#### Parameters

##### type

`T`

the kind of resource, e.g. "serialPort" or "tcpPort"

##### data

[`UsedResourceData`](../type-aliases/UsedResourceData.md)\<`T`\>

payload describing the resource

#### Returns

`Promise`\<`void`\>

#### Throws

when the host refuses the registration or does not answer

***

### resolveReply()

> **resolveReply**(`obj`): `boolean`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L371)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:59](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L59)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:72](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L72)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:110](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L110)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:123](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L123)

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

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L159)

Sends a message to a single UI client, or broadcasts to all connected UI clients when `clientId` is omitted.

#### Parameters

##### options

[`AllPropsUnknown`](../type-aliases/AllPropsUnknown.md)\<[`SendToUserInterfaceClientOptions`](../interfaces/SendToUserInterfaceClientOptions.md)\>

clientId and data options

#### Returns

`Promise`\<`void`\>

***

### stopWatchingCertificates()

> **stopWatchingCertificates**(): `void`

Defined in: [adapter/src/lib/adapter/asyncAdapter.ts:275](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/asyncAdapter.ts#L275)

Forgets the certificates handed out by the last [getCertificates](#getcertificates) call, so
[hasRelevantCertificateChange](#hasrelevantcertificatechange) no longer reports changes to them. Used when the adapter
stops watching its certificates.

#### Returns

`void`
