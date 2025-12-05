[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / HostCommon

# Interface: HostCommon

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Properties

### address

> **address**: `string`[]

An array of IP addresses this host exposes

#### Defined in

[types-dev/objects.d.ts:406](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L406)

***

### cmd

> **cmd**: `string`

The command line of the executable

#### Defined in

[types-dev/objects.d.ts:403](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L403)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L183)

***

### custom?

> `optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:412](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L412)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L175)

***

### disableDataReporting?

> `optional` **disableDataReporting**: `boolean`

If set to true, the reporting by sentry on this host is disabled for all instances

#### Defined in

[types-dev/objects.d.ts:415](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L415)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L178)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L181)

***

### hostname

> **hostname**: `string`

#### Defined in

[types-dev/objects.d.ts:404](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L404)

***

### icon?

> `optional` **icon**: `string`

base64 encoded icon

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:400](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L400)

***

### installedVersion

> **installedVersion**: `string`

#### Defined in

[types-dev/objects.d.ts:401](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L401)

***

### name

> **name**: `string`

The display name of this host

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:396](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L396)

***

### platform

> **platform**: `"Javascript/Node.js"`

#### Defined in

[types-dev/objects.d.ts:409](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L409)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L190)

***

### title

> **title**: `string`

Changeable name of the host

#### Defined in

[types-dev/objects.d.ts:398](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L398)

***

### type

> **type**: `"js-controller"`

#### Defined in

[types-dev/objects.d.ts:408](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/objects.d.ts#L408)
