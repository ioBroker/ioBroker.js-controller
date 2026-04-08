[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceCommon

# Interface: InstanceCommon

Defined in: [types-dev/objects.d.ts:358](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L358)

## Extends

- [`AdapterCommon`](AdapterCommon.md)

## Properties

### adminColumns?

> `optional` **adminColumns?**: `string` \| (`string` \| [`CustomAdminColumn`](CustomAdminColumn.md))[]

Defined in: [types-dev/objects.d.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L647)

Custom attributes to be shown in admin in the object browser

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminColumns`](AdapterCommon.md#admincolumns)

***

### adminTab?

> `optional` **adminTab?**: `object`

Defined in: [types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L651)

Settings for custom Admin Tabs

#### icon?

> `optional` **icon?**: `string`

Base 64 icon for the tab

#### ignoreConfigUpdate?

> `optional` **ignoreConfigUpdate?**: `boolean`

If true, the Tab is not reloaded when the configuration changes

#### link?

> `optional` **link?**: `string`

Describes which URL should be loaded in the tab. Supports placeholders like http://%ip%:%port% or JSON(5) configs. If empty, `adapter/ADAPTERNAME/tab(_m).html` will be taken. JSON config file must be defined relative to the "admin" folder, like "jsonTab.json"

#### name?

> `optional` **name?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

#### order?

> `optional` **order?**: `number`

Order number in admin tabs

#### singleton?

> `optional` **singleton?**: `boolean`

If true, only one instance of this tab will be created for all instances

#### supportsLoadingMessage?

> `optional` **supportsLoadingMessage?**: `boolean`

If the page sends an 'iobLoaded' event:

if (window.parent !== window) {
 try {
  window.parent.postMessage('iobLoaded', '*');
 } catch {
 // ignore
 }
}

When loaded in an iframe, inform the parent window
Admin will hide a loading spinner when the message will be received.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminTab`](AdapterCommon.md#admintab)

***

### adminUI?

> `optional` **adminUI?**: [`AdminUi`](AdminUi.md)

Defined in: [types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L649)

Type of the admin UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminUI`](AdapterCommon.md#adminui)

***

### allowInit?

> `optional` **allowInit?**: `boolean`

Defined in: [types-dev/objects.d.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L680)

If the mode is `schedule`, start one time adapter by ioBroker start, or by the configuration changes

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`allowInit`](AdapterCommon.md#allowinit)

***

### automaticUpgrade?

> `optional` **automaticUpgrade?**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

Defined in: [types-dev/objects.d.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L682)

If the adapter should be automatically upgraded and which version ranges are supported

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`automaticUpgrade`](AdapterCommon.md#automaticupgrade)

***

### availableModes?

> `optional` **availableModes?**: [`InstanceMode`](../type-aliases/InstanceMode.md)[]

Defined in: [types-dev/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L684)

Possible values for the instance mode (if more than one is possible)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`availableModes`](AdapterCommon.md#availablemodes)

***

### blockedVersions?

> `optional` **blockedVersions?**: `string`[]

Defined in: [types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L686)

Array that lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`blockedVersions`](AdapterCommon.md#blockedversions)

***

### blockly?

> `optional` **blockly?**: `boolean`

Defined in: [types-dev/objects.d.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L688)

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`blockly`](AdapterCommon.md#blockly)

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L183)

Color attribute used in UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`color`](AdapterCommon.md#color)

***

### compact?

> `optional` **compact?**: `boolean`

Defined in: [types-dev/objects.d.ts:375](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L375)

If compact mode is supported

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`compact`](AdapterCommon.md#compact)

***

### compactGroup?

> `optional` **compactGroup?**: `number`

Defined in: [types-dev/objects.d.ts:379](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L379)

Active compact group, instances in this group will be started in one process

***

### connectionType?

> `optional` **connectionType?**: [`ConnectionType`](../type-aliases/ConnectionType.md)

Defined in: [types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L690)

Where the adapter will get its data from. Set this together with

#### See

dataSource

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`connectionType`](AdapterCommon.md#connectiontype)

***

### custom?

> `optional` **custom?**: `undefined`

Defined in: [types-dev/objects.d.ts:391](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L391)

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`custom`](AdapterCommon.md#custom)

***

### dataFolder?

> `optional` **dataFolder?**: `string`

Defined in: [types-dev/objects.d.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L694)

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dataFolder`](AdapterCommon.md#datafolder)

***

### dataSource?

> `optional` **dataSource?**: `"push"` \| `"poll"` \| `"assumption"`

Defined in: [types-dev/objects.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L696)

How the adapter will mainly receive its data. Set this together with

#### See

connectionType

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dataSource`](AdapterCommon.md#datasource)

***

### dependencies?

> `optional` **dependencies?**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L698)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dependencies`](AdapterCommon.md#dependencies)

***

### desc?

> `optional` **desc?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L175)

Description of this object

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`desc`](AdapterCommon.md#desc)

***

### deviceWidgets?

> `optional` **deviceWidgets?**: `Record`\<`string`, [`DevicesWidget`](DevicesWidget.md)\>

Defined in: [types-dev/objects.d.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L704)

Definition of the widgets for "devices" adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`deviceWidgets`](AdapterCommon.md#devicewidgets)

***

### docs?

> `optional` **docs?**: `Partial`\<`Record`\<[`Languages`](../type-aliases/Languages.md), `string` \| `string`[]\>\>

Defined in: [types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L706)

Which files outside the README.md have documentation for the adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`docs`](AdapterCommon.md#docs)

***

### dontDelete?

> `optional` **dontDelete?**: `true`

Defined in: [types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L178)

When set to true, this object may not be deleted

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dontDelete`](AdapterCommon.md#dontdelete)

***

### enabled

> **enabled**: `boolean`

Defined in: [types-dev/objects.d.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L362)

Whether new instances should be enabled by default. *Should* be `false`!

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`enabled`](AdapterCommon.md#enabled)

***

### eraseOnUpload?

> `optional` **eraseOnUpload?**: `boolean`

Defined in: [types-dev/objects.d.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L710)

If true, all previous data in the target directory (web) should be deleted before uploading

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`eraseOnUpload`](AdapterCommon.md#eraseonupload)

***

### expert?

> `optional` **expert?**: `true`

Defined in: [types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L181)

When set to true, this object is only visible when the expert mode is turned on in admin

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`expert`](AdapterCommon.md#expert)

***

### extIcon?

> `optional` **extIcon?**: `string`

Defined in: [types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L712)

URL of an external icon that is shown for adapters that are not installed

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`extIcon`](AdapterCommon.md#exticon)

***

### getHistory?

> `optional` **getHistory?**: `boolean`

Defined in: [types-dev/objects.d.ts:714](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L714)

Whether this adapter responds to `getHistory` messages

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`getHistory`](AdapterCommon.md#gethistory)

***

### globalDependencies?

> `optional` **globalDependencies?**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L700)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`globalDependencies`](AdapterCommon.md#globaldependencies)

***

### host

> **host**: `string`

Defined in: [types-dev/objects.d.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L361)

The name of the host where this instance is running

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:716](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L716)

Filename of the local icon that is shown for installed adapters. Should be located in the `admin` directory

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`icon`](AdapterCommon.md#icon)

***

### ifInstalledDependencies?

> `optional` **ifInstalledDependencies?**: `object`

Defined in: [types-dev/objects.d.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L702)

Similar to `dependencies`, but only checked if the specified adapter is already installed. If the adapter is not installed, the version check will pass

#### Index Signature

\[`adapterName`: `string`\]: `string`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`ifInstalledDependencies`](AdapterCommon.md#ifinstalleddependencies)

***

### ignoreVersion?

> `optional` **ignoreVersion?**: `string`

Defined in: [types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L864)

If a specific update of this adapter should be ignored, specifies version number to be ignored

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`ignoreVersion`](AdapterCommon.md#ignoreversion)

***

### install?

> `optional` **install?**: `boolean`

Defined in: [types-dev/objects.d.ts:718](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L718)

The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one-time installation code.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`install`](AdapterCommon.md#install)

***

### installedFrom?

> `optional` **installedFrom?**: [`InstalledFrom`](../type-aliases/InstalledFrom.md)

Defined in: [types-dev/objects.d.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L383)

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`installedFrom`](AdapterCommon.md#installedfrom)

***

### installedVersion

> **installedVersion**: `string`

Defined in: [types-dev/objects.d.ts:722](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L722)

Shows which version of this adapter is installed

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`installedVersion`](AdapterCommon.md#installedversion)

***

### javascriptRules?

> `optional` **javascriptRules?**: `object`

Defined in: [types-dev/objects.d.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L868)

Rules blocks for JavaScript rules

#### i18n?

> `optional` **i18n?**: `boolean` \| `Record`\<`string`, `string`\> \| `Record`\<`string`, `Record`\<[`Languages`](../type-aliases/Languages.md), `string`\>\>

Translations

#### name

> **name**: `string`

Rules block name, like "ActionTelegram"

#### type?

> `optional` **type?**: `"module"`

Load it as a TypeScript module

#### url

> **url**: `string`

Where to load the blocks, like "rules/customRuleBlocks.js"

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`javascriptRules`](AdapterCommon.md#javascriptrules)

***

### keywords?

> `optional` **keywords?**: `string`[]

Defined in: [types-dev/objects.d.ts:724](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L724)

Keywords are used by search in admin. Do not write ioBroker here

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`keywords`](AdapterCommon.md#keywords)

***

### ~~license?~~

> `optional` **license?**: `string`

Defined in: [types-dev/objects.d.ts:858](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L858)

#### Deprecated

Use 'common.licenseInformation' instead

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`license`](AdapterCommon.md#license)

***

### licenseInformation?

> `optional` **licenseInformation?**: [`LicenseInformation`](../type-aliases/LicenseInformation.md)

Defined in: [types-dev/objects.d.ts:860](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L860)

An object representing information with the license details

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`licenseInformation`](AdapterCommon.md#licenseinformation)

***

### ~~localLink?~~

> `optional` **localLink?**: `string`

Defined in: [types-dev/objects.d.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L728)

#### Deprecated

Use

#### See

localLinks

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`localLink`](AdapterCommon.md#locallink)

***

### localLinks?

> `optional` **localLinks?**: `Record`\<`string`, `string` \| [`LocalLink`](../type-aliases/LocalLink.md)\>

Defined in: [types-dev/objects.d.ts:726](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L726)

A dictionary of links to web services this adapter provides

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`localLinks`](AdapterCommon.md#locallinks)

***

### loglevel?

> `optional` **loglevel?**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/objects.d.ts:730](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L730)

Default log level for this adapter. It can be changed for every instance separately

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`loglevel`](AdapterCommon.md#loglevel)

***

### logTransporter?

> `optional` **logTransporter?**: `boolean`

Defined in: [types-dev/objects.d.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L387)

If adapter can consume log messages, like admin, javascript or logparser

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`logTransporter`](AdapterCommon.md#logtransporter)

***

### main?

> `optional` **main?**: `string`

Defined in: [types-dev/objects.d.ts:734](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L734)

Path to the start file of the adapter. Should be the same as in `package.json`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`main`](AdapterCommon.md#main)

***

### materialize

> **materialize**: `boolean`

Defined in: [types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L739)

#### Deprectaed

Use adminUI with config = "materialize". But better use jsonConfig.json

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`materialize`](AdapterCommon.md#materialize)

***

### materializeTab?

> `optional` **materializeTab?**: `boolean`

Defined in: [types-dev/objects.d.ts:736](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L736)

Whether the admin tab is written in a materialized style. Required for Admin 3+

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`materializeTab`](AdapterCommon.md#materializetab)

***

### memoryLimitMB?

> `optional` **memoryLimitMB?**: `number`

Defined in: [types-dev/objects.d.ts:389](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L389)

Optional memory limit for this instance

***

### ~~messagebox?~~

> `optional` **messagebox?**: `true`

Defined in: [types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L741)

#### Deprecated

Use

#### See

supportedMessages up from controller v5

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`messagebox`](AdapterCommon.md#messagebox)

***

### messages?

> `optional` **messages?**: [`MessageRule`](MessageRule.md)[]

Defined in: [types-dev/objects.d.ts:862](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L862)

Messages that will be shown (if the condition evaluates to true) by upgrade or installation

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`messages`](AdapterCommon.md#messages)

***

### mode

> **mode**: [`InstanceMode`](../type-aliases/InstanceMode.md)

Defined in: [types-dev/objects.d.ts:364](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L364)

How and when this instance should be started

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`mode`](AdapterCommon.md#mode)

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:747](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L747)

Name of the adapter (without leading `ioBroker.`)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`name`](AdapterCommon.md#name)

***

### news?

> `optional` **news?**: `object`

Defined in: [types-dev/objects.d.ts:749](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L749)

News per version in i18n

#### Index Signature

\[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`news`](AdapterCommon.md#news)

***

### noConfig?

> `optional` **noConfig?**: `true`

Defined in: [types-dev/objects.d.ts:751](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L751)

If `true`, no configuration dialog will be shown

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noConfig`](AdapterCommon.md#noconfig)

***

### nodeProcessParams?

> `optional` **nodeProcessParams?**: `string`[]

Defined in: [types-dev/objects.d.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L385)

Arguments passed to the adapter process, this disables compact mode

***

### nogit?

> `optional` **nogit?**: `true`

Defined in: [types-dev/objects.d.ts:757](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L757)

If `true`, manual installation from GitHub is not possible

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`nogit`](AdapterCommon.md#nogit)

***

### noIntro?

> `optional` **noIntro?**: `true`

Defined in: [types-dev/objects.d.ts:753](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L753)

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noIntro`](AdapterCommon.md#nointro)

***

### nondeletable?

> `optional` **nondeletable?**: `true`

Defined in: [types-dev/objects.d.ts:759](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L759)

If `true`, this adapter cannot be deleted or updated manually.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`nondeletable`](AdapterCommon.md#nondeletable)

***

### noRepository?

> `optional` **noRepository?**: `true`

Defined in: [types-dev/objects.d.ts:755](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L755)

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noRepository`](AdapterCommon.md#norepository)

***

### onlyWWW?

> `optional` **onlyWWW?**: `boolean`

Defined in: [types-dev/objects.d.ts:761](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L761)

If `true`, this "adapter" only contains HTML files and no main executable

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`onlyWWW`](AdapterCommon.md#onlywww)

***

### os?

> `optional` **os?**: `"linux"` \| `"darwin"` \| `"win32"` \| (`"linux"` \| `"darwin"` \| `"win32"`)[]

Defined in: [types-dev/objects.d.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L772)

Which OSes this adapter supports

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`os`](AdapterCommon.md#os)

***

### osDependencies?

> `optional` **osDependencies?**: `object`

Defined in: [types-dev/objects.d.ts:763](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L763)

Used to configure native (OS) dependencies of this adapter that need to be installed with the system package manager before installing the adapter

#### darwin

> **darwin**: `string`[]

For OSX

#### linux

> **linux**: `string`[]

For Linux

#### win32

> **win32**: `string`[]

For Windows

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`osDependencies`](AdapterCommon.md#osdependencies)

***

### platform

> **platform**: `"Javascript/Node.js"`

Defined in: [types-dev/objects.d.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L774)

Constant

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`platform`](AdapterCommon.md#platform)

***

### plugins?

> `optional` **plugins?**: `object`

Defined in: [types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L866)

Sentry and other plugins

#### Index Signature

\[`pluginName`: `string`\]: `Record`\<`string`, `any`\>

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`plugins`](AdapterCommon.md#plugins)

***

### preserveSettings?

> `optional` **preserveSettings?**: `string` \| `string`[]

Defined in: [types-dev/objects.d.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L381)

String (or array) with names of attributes in common of instance, which will not be deleted.

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`preserveSettings`](AdapterCommon.md#preservesettings)

***

### readme?

> `optional` **readme?**: `string`

Defined in: [types-dev/objects.d.ts:778](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L778)

Url of the ReadMe file

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`readme`](AdapterCommon.md#readme)

***

### restartAdapters?

> `optional` **restartAdapters?**: `string`[]

Defined in: [types-dev/objects.d.ts:780](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L780)

Which adapters must be restarted after installing or updating this adapter.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`restartAdapters`](AdapterCommon.md#restartadapters)

***

### restartSchedule?

> `optional` **restartSchedule?**: `string`

Defined in: [types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L782)

CRON schedule to restart mode `daemon` adapters

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`restartSchedule`](AdapterCommon.md#restartschedule)

***

### role?

> `optional` **role?**: `string`

Defined in: [types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L190)

role of the object

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`role`](AdapterCommon.md#role)

***

### runAsCompactMode?

> `optional` **runAsCompactMode?**: `boolean`

Defined in: [types-dev/objects.d.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L377)

If compact mode is active

***

### schedule?

> `optional` **schedule?**: `string`

Defined in: [types-dev/objects.d.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L784)

If the adapter runs in `schedule` mode, this contains the CRON

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`schedule`](AdapterCommon.md#schedule)

***

### singleton?

> `optional` **singleton?**: `boolean`

Defined in: [types-dev/objects.d.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L788)

Whether this adapter may only be installed once in the whole system

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`singleton`](AdapterCommon.md#singleton)

***

### singletonHost?

> `optional` **singletonHost?**: `boolean`

Defined in: [types-dev/objects.d.ts:786](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L786)

Whether this adapter may only be installed once per host

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`singletonHost`](AdapterCommon.md#singletonhost)

***

### stopBeforeUpdate?

> `optional` **stopBeforeUpdate?**: `boolean`

Defined in: [types-dev/objects.d.ts:790](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L790)

Whether the adapter must be stopped before an update

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`stopBeforeUpdate`](AdapterCommon.md#stopbeforeupdate)

***

### stopTimeout?

> `optional` **stopTimeout?**: `number`

Defined in: [types-dev/objects.d.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L792)

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`stopTimeout`](AdapterCommon.md#stoptimeout)

***

### subscribable?

> `optional` **subscribable?**: `boolean`

Defined in: [types-dev/objects.d.ts:373](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L373)

Variables of this adapter must be subscribed with sendTo to enable updates

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`subscribable`](AdapterCommon.md#subscribable)

***

### supportCustoms?

> `optional` **supportCustoms?**: `boolean`

Defined in: [types-dev/objects.d.ts:796](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L796)

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportCustoms`](AdapterCommon.md#supportcustoms)

***

### supportedMessages?

> `optional` **supportedMessages?**: [`SupportedMessages`](SupportedMessages.md)

Defined in: [types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L743)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportedMessages`](AdapterCommon.md#supportedmessages)

***

### ~~supportStopInstance?~~

> `optional` **supportStopInstance?**: `boolean`

Defined in: [types-dev/objects.d.ts:798](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L798)

#### Deprecated

Use

#### See

supportedMessages up from controller v5

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportStopInstance`](AdapterCommon.md#supportstopinstance)

***

### tier?

> `optional` **tier?**: `2` \| `1` \| `3`

Defined in: [types-dev/objects.d.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L371)

The starting priority of this adapter:
- **1:** Logic adapters
- **2:** Data providers
- **3:** All other adapters

***

### ~~title?~~

> `optional` **title?**: `string`

Defined in: [types-dev/objects.d.ts:802](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L802)

#### Deprecated

The name of this adapter to be shown in the admin UI. Use

#### See

titleLang instead.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`title`](AdapterCommon.md#title)

***

### titleLang?

> `optional` **titleLang?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:800](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L800)

The translated names of this adapter to be shown in the admin UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`titleLang`](AdapterCommon.md#titlelang)

***

### type?

> `optional` **type?**: `"hardware"` \| `"alarm"` \| `"climate-control"` \| `"communication"` \| `"date-and-time"` \| `"energy"` \| `"garden"` \| `"general"` \| `"geoposition"` \| `"health"` \| `"household"` \| `"infrastructure"` \| `"iot-systems"` \| `"lighting"` \| `"logic"` \| `"messaging"` \| `"metering"` \| `"misc-data"` \| `"multimedia"` \| `"network"` \| `"protocols"` \| `"storage"` \| `"utility"` \| `"vehicle"` \| `"visualization"` \| `"visualization-icons"` \| `"visualization-widgets"` \| `"weather"`

Defined in: [types-dev/objects.d.ts:804](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L804)

The type of this adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`type`](AdapterCommon.md#type)

***

### unsafePerm?

> `optional` **unsafePerm?**: `true`

Defined in: [types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L834)

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`unsafePerm`](AdapterCommon.md#unsafeperm)

***

### version

> **version**: `string`

Defined in: [types-dev/objects.d.ts:359](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L359)

The available version in the ioBroker repo.

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`version`](AdapterCommon.md#version)

***

### visIconSets?

> `optional` **visIconSets?**: `Record`\<`string`, [`VisIconSet`](VisIconSet.md)\>

Defined in: [types-dev/objects.d.ts:840](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L840)

Definition of the vis-2 icon sets

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`visIconSets`](AdapterCommon.md#visiconsets)

***

### visWidgets?

> `optional` **visWidgets?**: `Record`\<`string`, [`VisWidget`](VisWidget.md)\>

Defined in: [types-dev/objects.d.ts:838](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L838)

Definition of the vis-2 widgets

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`visWidgets`](AdapterCommon.md#viswidgets)

***

### webByVersion?

> `optional` **webByVersion?**: `boolean`

Defined in: [types-dev/objects.d.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L842)

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webByVersion`](AdapterCommon.md#webbyversion)

***

### webExtendable?

> `optional` **webExtendable?**: `boolean`

Defined in: [types-dev/objects.d.ts:844](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L844)

Whether the web server in this adapter can be extended with plugin/extensions

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webExtendable`](AdapterCommon.md#webextendable)

***

### webExtension?

> `optional` **webExtension?**: `string`

Defined in: [types-dev/objects.d.ts:846](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L846)

Relative path to a module that contains an extension for the web adapter. Use together with

#### See

native.webInstance to configure which instances this affects

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webExtension`](AdapterCommon.md#webextension)

***

### webPreSettings?

> `optional` **webPreSettings?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:848](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L848)

List of parameters that must be included in info.js by webServer adapter. (Example material: `"webPreSettings": { "materialBackground": "native.loadingBackground" }`). Web adapter uses this setting to create a customized info.js file to provide some essential settings for the index.html file before the socket connection is established to provide e.g., background color of the loading screen.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webPreSettings`](AdapterCommon.md#webpresettings)

***

### ~~webservers?~~

> `optional` **webservers?**: `string`[]

Defined in: [types-dev/objects.d.ts:850](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L850)

#### Deprecated

(where is it necessary?) Array of web server's instances that should serve content from the adapter's www folder

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webservers`](AdapterCommon.md#webservers)

***

### ~~welcomeScreen?~~

> `optional` **welcomeScreen?**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

Defined in: [types-dev/objects.d.ts:852](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L852)

#### Deprecated

(use localLinks) A list of pages that should be shown on the "web" index page

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`welcomeScreen`](AdapterCommon.md#welcomescreen)

***

### ~~welcomeScreenPro?~~

> `optional` **welcomeScreenPro?**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

Defined in: [types-dev/objects.d.ts:854](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L854)

#### Deprecated

(use localLinks) A list of pages that should be shown on the ioBroker cloud index page

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`welcomeScreenPro`](AdapterCommon.md#welcomescreenpro)

***

### ~~wwwDontUpload?~~

> `optional` **wwwDontUpload?**: `boolean`

Defined in: [types-dev/objects.d.ts:856](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L856)

#### Deprecated

(rename the `www` folder in e.g. `adminWww`) If true, the `www` folder will be not uploaded into DB

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`wwwDontUpload`](AdapterCommon.md#wwwdontupload)
