[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceClientSubscribeReturnType

# Interface: UserInterfaceClientSubscribeReturnType

## Properties

### accepted

> **accepted**: `boolean`

If the adapter has accepted the client subscription

#### Defined in

[adapter/src/lib/\_Types.ts:149](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/adapter/src/lib/_Types.ts#L149)

***

### error?

> `optional` **error**: `string`

Optional error if not accepted

#### Defined in

[adapter/src/lib/\_Types.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/adapter/src/lib/_Types.ts#L153)

***

### heartbeat?

> `optional` **heartbeat**: `number`

Optional heartbeat, if set, the client needs to re-subscribe every heartbeat interval

#### Defined in

[adapter/src/lib/\_Types.ts:151](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/adapter/src/lib/_Types.ts#L151)
