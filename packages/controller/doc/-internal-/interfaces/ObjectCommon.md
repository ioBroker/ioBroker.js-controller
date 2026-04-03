[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectCommon

# Interface: ObjectCommon

Defined in: [types-dev/objects.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L170)

## Extended by

- [`DeviceCommon`](DeviceCommon.md)
- [`ChannelCommon`](ChannelCommon.md)
- [`StateCommon`](StateCommon.md)
- [`OtherCommon`](OtherCommon.md)
- [`MetaCommon`](MetaCommon.md)
- [`EnumCommon`](EnumCommon.md)
- [`HostCommon`](HostCommon.md)
- [`AdapterCommon`](AdapterCommon.md)
- [`UserCommon`](UserCommon.md)
- [`GroupCommon`](GroupCommon.md)
- [`ScriptCommon`](ScriptCommon.md)
- [`ChartCommon`](ChartCommon.md)
- [`ScheduleCommon`](ScheduleCommon.md)
- [`RepositoryCommon`](RepositoryCommon.md)
- [`SystemConfigCommon`](SystemConfigCommon.md)

## Properties

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L183)

Color attribute used in UI

***

### desc?

> `optional` **desc?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L175)

Description of this object

***

### dontDelete?

> `optional` **dontDelete?**: `true`

Defined in: [types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L178)

When set to true, this object may not be deleted

***

### expert?

> `optional` **expert?**: `true`

Defined in: [types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L181)

When set to true, this object is only visible when the expert mode is turned on in admin

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:188](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L188)

Icon for this object

***

### name

> **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L172)

The name of this object as a simple string or an object with translations

***

### role?

> `optional` **role?**: `string`

Defined in: [types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/objects.d.ts#L190)

role of the object
