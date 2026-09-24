[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ResourceManager

# Class: ResourceManager

Defined in: [adapter/src/lib/adapter/managers/ResourceManager.ts:16](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/managers/ResourceManager.ts#L16)

Owns the adapter's exclusive-resource registry. Register/free requests are forwarded to the host
this instance runs on, which keeps `system.host.<hostname>.usedResources.<type>` up to date; reads
go straight to those states.

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new ResourceManager**(`ctx`, `getMessaging`): `ResourceManager`

Defined in: [adapter/src/lib/adapter/managers/ResourceManager.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/managers/ResourceManager.ts#L25)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

##### getMessaging

() => [`MessagingManager`](MessagingManager.md)

Returns the adapter's messaging manager. Passed as a getter rather than an
       instance because it is created lazily - and it has to be *the* one, since it owns the map
       the host's reply is matched against.

#### Returns

`ResourceManager`

#### Overrides

[`AdapterContextBase`](AdapterContextBase.md).[`constructor`](AdapterContextBase.md#constructor)

## Methods

### checkUsedResource()

> **checkUsedResource**\<`T`\>(`type`, `data?`): `Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)\>[]\>

Defined in: [adapter/src/lib/adapter/managers/ResourceManager.ts:96](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/managers/ResourceManager.ts#L96)

Asks the host whether another instance currently holds a resource, without registering anything.

Meant to be called *before* the port or the device is opened: afterwards the operating system
has already decided the conflict, and all this can add is a better error message.

The answer is a hint, not a permission. The registry only knows what adapters declare, so an
empty list does not promise the resource is free - something outside ioBroker may hold it.

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

the entries of other instances that currently hold it, newest first

#### Throws

when the host refuses the request or does not answer

***

### clearUsedResources()

> **clearUsedResources**(): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/ResourceManager.ts:109](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/managers/ResourceManager.ts#L109)

Frees all exclusive resources this instance registered, across all types, by forwarding it to the host.

#### Returns

`Promise`\<`void`\>

#### Throws

when the host refuses the command or does not answer

***

### freeUsedResource()

> **freeUsedResource**\<`T`\>(`type`, `data?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/ResourceManager.ts:120](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/managers/ResourceManager.ts#L120)

Frees previously registered exclusive resources of this instance by forwarding it to the host.

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

### getHostUsedResources()

#### Param

**type**

resource type to read; if omitted, the resources of every type are read

#### Call Signature

> **getHostUsedResources**\<`T`\>(`type`): `Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<`T`\>[]\>

Defined in: [adapter/src/lib/adapter/managers/ResourceManager.ts:134](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/managers/ResourceManager.ts#L134)

Reads the exclusive resources of the given type currently registered on this instance's host, across
all its instances.

##### Type Parameters

###### T

`T` *extends* keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)

##### Parameters

###### type

`T`

resource type to read, e.g. "serialPort"

##### Returns

`Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<`T`\>[]\>

##### Throws

when the host of this instance is unknown

#### Call Signature

> **getHostUsedResources**(): `Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)\>[]\>

Defined in: [adapter/src/lib/adapter/managers/ResourceManager.ts:136](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/managers/ResourceManager.ts#L136)

Reads the exclusive resources of every type currently registered on this instance's host.

##### Returns

`Promise`\<[`RegisteredResource`](../type-aliases/RegisteredResource.md)\<keyof [`UsedResourceDataMap`](../interfaces/UsedResourceDataMap.md)\>[]\>

***

### registerUsedResource()

> **registerUsedResource**\<`T`\>(`type`, `data`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/ResourceManager.ts:75](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/adapter/src/lib/adapter/managers/ResourceManager.ts#L75)

Registers an exclusive resource as used by this instance by forwarding it to the host.

Registering is additive - one call per occupied resource, in any order. The host drops what this
instance registered before when it starts, so there is nothing to reset by hand.

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
