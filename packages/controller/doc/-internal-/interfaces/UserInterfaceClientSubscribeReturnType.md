[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceClientSubscribeReturnType

# Interface: UserInterfaceClientSubscribeReturnType

## Properties

### accepted

> **accepted**: `boolean`

If the adapter has accepted the client subscription

#### Defined in

[adapter/src/lib/\_Types.ts:149](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/adapter/src/lib/_Types.ts#L149)

***

### error?

> `optional` **error**: `string`

Optional error if not accepted

#### Defined in

[adapter/src/lib/\_Types.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/adapter/src/lib/_Types.ts#L153)

***

### heartbeat?

> `optional` **heartbeat**: `number`

Optional heartbeat, if set, the client needs to re-subscribe every heartbeat interval

#### Defined in

[adapter/src/lib/\_Types.ts:151](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/adapter/src/lib/_Types.ts#L151)
