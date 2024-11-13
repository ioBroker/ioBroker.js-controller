[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceCommon

# Interface: InstanceCommon

## Extends

- [`AdapterCommon`](AdapterCommon.md)

## Properties

### adminColumns?

> `optional` **adminColumns**: `string` \| (`string` \| [`CustomAdminColumn`](CustomAdminColumn.md))[]

Custom attributes to be shown in admin in the object browser

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminColumns`](AdapterCommon.md#admincolumns)

#### Defined in

[types-dev/objects.d.ts:600](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L600)

***

### adminTab?

> `optional` **adminTab**: `object`

Settings for custom Admin Tabs

#### ~~fa-icon?~~

> `optional` **fa-icon**: `string`

##### Deprecated

icon name for FontAwesome (works only in admin 4)

#### icon?

> `optional` **icon**: `string`

Base 64 icon for the tab

#### ignoreConfigUpdate?

> `optional` **ignoreConfigUpdate**: `boolean`

If true, the Tab is not reloaded when the configuration changes

#### link?

> `optional` **link**: `string`

Which URL should be loaded in the tab. Supports placeholders like http://%ip%:%port%

#### name?

> `optional` **name**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

#### order?

> `optional` **order**: `number`

Order number in admin tabs

#### singleton?

> `optional` **singleton**: `boolean`

If true, only one instance of this tab will be created for all instances

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminTab`](AdapterCommon.md#admintab)

#### Defined in

[types-dev/objects.d.ts:604](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L604)

***

### adminUI?

> `optional` **adminUI**: [`AdminUi`](AdminUi.md)

Type of the admin UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminUI`](AdapterCommon.md#adminui)

#### Defined in

[types-dev/objects.d.ts:602](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L602)

***

### allowInit?

> `optional` **allowInit**: `boolean`

If the mode is `schedule`, start one time adapter by ioBroker start, or by the configuration changes

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`allowInit`](AdapterCommon.md#allowinit)

#### Defined in

[types-dev/objects.d.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L620)

***

### automaticUpgrade?

> `optional` **automaticUpgrade**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

If the adapter should be automatically upgraded and which version ranges are supported

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`automaticUpgrade`](AdapterCommon.md#automaticupgrade)

#### Defined in

[types-dev/objects.d.ts:622](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L622)

***

### availableModes?

> `optional` **availableModes**: [`InstanceMode`](../type-aliases/InstanceMode.md)[]

Possible values for the instance mode (if more than one is possible)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`availableModes`](AdapterCommon.md#availablemodes)

#### Defined in

[types-dev/objects.d.ts:624](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L624)

***

### blockedVersions?

> `optional` **blockedVersions**: `string`[]

Array which lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`blockedVersions`](AdapterCommon.md#blockedversions)

#### Defined in

[types-dev/objects.d.ts:626](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L626)

***

### blockly?

> `optional` **blockly**: `boolean`

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`blockly`](AdapterCommon.md#blockly)

#### Defined in

[types-dev/objects.d.ts:628](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L628)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`color`](AdapterCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L179)

***

### compact?

> `optional` **compact**: `boolean`

If compact mode is supported

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`compact`](AdapterCommon.md#compact)

#### Defined in

[types-dev/objects.d.ts:364](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L364)

***

### compactGroup?

> `optional` **compactGroup**: `number`

Active compact group, instances in this group will be started in one process

#### Defined in

[types-dev/objects.d.ts:368](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L368)

***

### connectionType?

> `optional` **connectionType**: [`ConnectionType`](../type-aliases/ConnectionType.md)

Where the adapter will get its data from. Set this together with

#### See

dataSource

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`connectionType`](AdapterCommon.md#connectiontype)

#### Defined in

[types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L630)

***

### custom?

> `optional` **custom**: `undefined`

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`custom`](AdapterCommon.md#custom)

#### Defined in

[types-dev/objects.d.ts:380](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L380)

***

### dataFolder?

> `optional` **dataFolder**: `string`

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dataFolder`](AdapterCommon.md#datafolder)

#### Defined in

[types-dev/objects.d.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L634)

***

### dataSource?

> `optional` **dataSource**: `"push"` \| `"poll"` \| `"assumption"`

How the adapter will mainly receive its data. Set this together with

#### See

connectionType

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dataSource`](AdapterCommon.md#datasource)

#### Defined in

[types-dev/objects.d.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L636)

***

### dependencies?

> `optional` **dependencies**: [`Depdendencies`](../type-aliases/Depdendencies.md)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dependencies`](AdapterCommon.md#dependencies)

#### Defined in

[types-dev/objects.d.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L638)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`desc`](AdapterCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L171)

***

### docs?

> `optional` **docs**: `Partial`\<`Record`\<[`Languages`](../type-aliases/Languages.md), `string` \| `string`[]\>\>

Which files outside the README.md have documentation for the adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`docs`](AdapterCommon.md#docs)

#### Defined in

[types-dev/objects.d.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L642)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dontDelete`](AdapterCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L174)

***

### enabled

> **enabled**: `boolean`

Whether new instances should be enabled by default. *Should* be `false`!

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`enabled`](AdapterCommon.md#enabled)

#### Defined in

[types-dev/objects.d.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L351)

***

### eraseOnUpload?

> `optional` **eraseOnUpload**: `boolean`

If true, all previous data in the target directory (web) should be deleted before uploading

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`eraseOnUpload`](AdapterCommon.md#eraseonupload)

#### Defined in

[types-dev/objects.d.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L646)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`expert`](AdapterCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L177)

***

### extIcon?

> `optional` **extIcon**: `string`

URL of an external icon that is shown for adapters that are not installed

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`extIcon`](AdapterCommon.md#exticon)

#### Defined in

[types-dev/objects.d.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L648)

***

### getHistory?

> `optional` **getHistory**: `boolean`

Whether this adapter responds to `getHistory` messages

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`getHistory`](AdapterCommon.md#gethistory)

#### Defined in

[types-dev/objects.d.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L650)

***

### globalDependencies?

> `optional` **globalDependencies**: [`Depdendencies`](../type-aliases/Depdendencies.md)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`globalDependencies`](AdapterCommon.md#globaldependencies)

#### Defined in

[types-dev/objects.d.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L640)

***

### host

> **host**: `string`

The name of the host where this instance is running

#### Defined in

[types-dev/objects.d.ts:350](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L350)

***

### icon?

> `optional` **icon**: `string`

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`icon`](AdapterCommon.md#icon-1)

#### Defined in

[types-dev/objects.d.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L652)

***

### ignoreVersion?

> `optional` **ignoreVersion**: `string`

If a specific update of this adapter should be ignored, specifies version number to be ignored

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`ignoreVersion`](AdapterCommon.md#ignoreversion)

#### Defined in

[types-dev/objects.d.ts:797](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L797)

***

### install?

> `optional` **install**: `boolean`

The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one time installation code.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`install`](AdapterCommon.md#install)

#### Defined in

[types-dev/objects.d.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L654)

***

### installedFrom?

> `optional` **installedFrom**: [`InstalledFrom`](../type-aliases/InstalledFrom.md)

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`installedFrom`](AdapterCommon.md#installedfrom)

#### Defined in

[types-dev/objects.d.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L372)

***

### installedVersion

> **installedVersion**: `string`

Shows which version of this adapter is installed

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`installedVersion`](AdapterCommon.md#installedversion)

#### Defined in

[types-dev/objects.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L658)

***

### keywords?

> `optional` **keywords**: `string`[]

Keywords are used by search in admin. Do not write ioBroker here

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`keywords`](AdapterCommon.md#keywords)

#### Defined in

[types-dev/objects.d.ts:660](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L660)

***

### ~~license?~~

> `optional` **license**: `string`

#### Deprecated

Use 'common.licenseInformation' instead

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`license`](AdapterCommon.md#license)

#### Defined in

[types-dev/objects.d.ts:791](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L791)

***

### licenseInformation?

> `optional` **licenseInformation**: [`LicenseInformation`](../type-aliases/LicenseInformation.md)

An object representing information with the license details

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`licenseInformation`](AdapterCommon.md#licenseinformation)

#### Defined in

[types-dev/objects.d.ts:793](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L793)

***

### ~~localLink?~~

> `optional` **localLink**: `string`

#### Deprecated

Use

#### See

localLinks

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`localLink`](AdapterCommon.md#locallink)

#### Defined in

[types-dev/objects.d.ts:664](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L664)

***

### localLinks?

> `optional` **localLinks**: `Record`\<`string`, `string` \| [`LocalLink`](../type-aliases/LocalLink.md)\>

A dictionary of links to web services this adapter provides

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`localLinks`](AdapterCommon.md#locallinks)

#### Defined in

[types-dev/objects.d.ts:662](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L662)

***

### loglevel?

> `optional` **loglevel**: [`LogLevel`](../type-aliases/LogLevel.md)

Default log level for this adapter. It can be changed for every instance separately

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`loglevel`](AdapterCommon.md#loglevel)

#### Defined in

[types-dev/objects.d.ts:666](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L666)

***

### logTransporter?

> `optional` **logTransporter**: `boolean`

If adapter can consume log messages, like admin, javascript or logparser

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`logTransporter`](AdapterCommon.md#logtransporter)

#### Defined in

[types-dev/objects.d.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L376)

***

### main?

> `optional` **main**: `string`

Path to the start file of the adapter. Should be the same as in `package.json`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`main`](AdapterCommon.md#main)

#### Defined in

[types-dev/objects.d.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L670)

***

### materialize

> **materialize**: `boolean`

Whether the admin configuration dialog is written in materialized style. Required for Admin 3+

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`materialize`](AdapterCommon.md#materialize)

#### Defined in

[types-dev/objects.d.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L674)

***

### materializeTab?

> `optional` **materializeTab**: `boolean`

Whether the admin tab is written in materialized style. Required for Admin 3+

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`materializeTab`](AdapterCommon.md#materializetab)

#### Defined in

[types-dev/objects.d.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L672)

***

### memoryLimitMB?

> `optional` **memoryLimitMB**: `number`

Optional memory limit for this instance

#### Defined in

[types-dev/objects.d.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L378)

***

### ~~messagebox?~~

> `optional` **messagebox**: `true`

#### Deprecated

Use

#### See

supportedMessages up from controller v5

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`messagebox`](AdapterCommon.md#messagebox)

#### Defined in

[types-dev/objects.d.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L676)

***

### messages?

> `optional` **messages**: [`MessageRule`](MessageRule.md)[]

Messages, that will be shown (if condition evaluates to true) by upgrade or installation

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`messages`](AdapterCommon.md#messages)

#### Defined in

[types-dev/objects.d.ts:795](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L795)

***

### mode

> **mode**: [`InstanceMode`](../type-aliases/InstanceMode.md)

How and when this instance should be started

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`mode`](AdapterCommon.md#mode)

#### Defined in

[types-dev/objects.d.ts:353](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L353)

***

### name

> **name**: `string`

Name of the adapter (without leading `ioBroker.`)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`name`](AdapterCommon.md#name-1)

#### Defined in

[types-dev/objects.d.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L682)

***

### news?

> `optional` **news**: `object`

News per version in i18n

#### Index Signature

 \[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`news`](AdapterCommon.md#news)

#### Defined in

[types-dev/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L684)

***

### noConfig?

> `optional` **noConfig**: `true`

If `true`, no configuration dialog will be shown

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noConfig`](AdapterCommon.md#noconfig)

#### Defined in

[types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L686)

***

### nodeProcessParams?

> `optional` **nodeProcessParams**: `string`[]

Arguments passed to the adapter process, this disables compact mode

#### Defined in

[types-dev/objects.d.ts:374](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L374)

***

### nogit?

> `optional` **nogit**: `true`

If `true`, manual installation from GitHub is not possible

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`nogit`](AdapterCommon.md#nogit)

#### Defined in

[types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L692)

***

### noIntro?

> `optional` **noIntro**: `true`

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noIntro`](AdapterCommon.md#nointro)

#### Defined in

[types-dev/objects.d.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L688)

***

### nondeletable?

> `optional` **nondeletable**: `true`

If `true`, this adapter cannot be deleted or updated manually.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`nondeletable`](AdapterCommon.md#nondeletable)

#### Defined in

[types-dev/objects.d.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L694)

***

### noRepository?

> `optional` **noRepository**: `true`

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noRepository`](AdapterCommon.md#norepository)

#### Defined in

[types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L690)

***

### onlyWWW?

> `optional` **onlyWWW**: `boolean`

If `true`, this "adapter" only contains HTML files and no main executable

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`onlyWWW`](AdapterCommon.md#onlywww)

#### Defined in

[types-dev/objects.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L696)

***

### os?

> `optional` **os**: `"linux"` \| `"darwin"` \| `"win32"` \| (`"linux"` \| `"darwin"` \| `"win32"`)[]

Which OSes this adapter supports

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`os`](AdapterCommon.md#os)

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L707)

***

### osDependencies?

> `optional` **osDependencies**: `object`

Used to configure native (OS) dependencies of this adapter that need to be installed with system package manager before installing the adapter

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

#### Defined in

[types-dev/objects.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L698)

***

### platform

> **platform**: `"Javascript/Node.js"`

Constant

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`platform`](AdapterCommon.md#platform)

#### Defined in

[types-dev/objects.d.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L709)

***

### plugins?

> `optional` **plugins**: `object`

Sentry and other plugins

#### Index Signature

 \[`pluginName`: `string`\]: `Record`\<`string`, `any`\>

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`plugins`](AdapterCommon.md#plugins)

#### Defined in

[types-dev/objects.d.ts:799](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L799)

***

### preserveSettings?

> `optional` **preserveSettings**: `string` \| `string`[]

String (or array) with names of attributes in common of instance, which will not be deleted.

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`preserveSettings`](AdapterCommon.md#preservesettings)

#### Defined in

[types-dev/objects.d.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L370)

***

### readme?

> `optional` **readme**: `string`

Url of the ReadMe file

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`readme`](AdapterCommon.md#readme)

#### Defined in

[types-dev/objects.d.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L713)

***

### restartAdapters?

> `optional` **restartAdapters**: `string`[]

Which adapters must be restarted after installing or updating this adapter.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`restartAdapters`](AdapterCommon.md#restartadapters)

#### Defined in

[types-dev/objects.d.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L715)

***

### restartSchedule?

> `optional` **restartSchedule**: `string`

CRON schedule to restart mode `daemon` adapters

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`restartSchedule`](AdapterCommon.md#restartschedule)

#### Defined in

[types-dev/objects.d.ts:717](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L717)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`role`](AdapterCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L186)

***

### runAsCompactMode?

> `optional` **runAsCompactMode**: `boolean`

If compact mode is active

#### Defined in

[types-dev/objects.d.ts:366](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L366)

***

### schedule?

> `optional` **schedule**: `string`

If the adapter runs in `schedule` mode, this contains the CRON

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`schedule`](AdapterCommon.md#schedule)

#### Defined in

[types-dev/objects.d.ts:719](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L719)

***

### singleton?

> `optional` **singleton**: `boolean`

Whether this adapter may only be installed once in the whole system

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`singleton`](AdapterCommon.md#singleton-1)

#### Defined in

[types-dev/objects.d.ts:723](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L723)

***

### singletonHost?

> `optional` **singletonHost**: `boolean`

Whether this adapter may only be installed once per host

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`singletonHost`](AdapterCommon.md#singletonhost)

#### Defined in

[types-dev/objects.d.ts:721](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L721)

***

### stopBeforeUpdate?

> `optional` **stopBeforeUpdate**: `boolean`

Whether the adapter must be stopped before an update

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`stopBeforeUpdate`](AdapterCommon.md#stopbeforeupdate)

#### Defined in

[types-dev/objects.d.ts:725](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L725)

***

### stopTimeout?

> `optional` **stopTimeout**: `number`

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`stopTimeout`](AdapterCommon.md#stoptimeout)

#### Defined in

[types-dev/objects.d.ts:727](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L727)

***

### subscribable?

> `optional` **subscribable**: `boolean`

Variables of this adapter must be subscribed with sendTo to enable updates

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`subscribable`](AdapterCommon.md#subscribable)

#### Defined in

[types-dev/objects.d.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L362)

***

### supportCustoms?

> `optional` **supportCustoms**: `boolean`

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportCustoms`](AdapterCommon.md#supportcustoms)

#### Defined in

[types-dev/objects.d.ts:731](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L731)

***

### supportedMessages?

> `optional` **supportedMessages**: [`SupportedMessages`](SupportedMessages.md)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportedMessages`](AdapterCommon.md#supportedmessages)

#### Defined in

[types-dev/objects.d.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L678)

***

### ~~supportStopInstance?~~

> `optional` **supportStopInstance**: `boolean`

#### Deprecated

Use

#### See

supportedMessages up from controller v5

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportStopInstance`](AdapterCommon.md#supportstopinstance)

#### Defined in

[types-dev/objects.d.ts:733](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L733)

***

### tier?

> `optional` **tier**: `2` \| `1` \| `3`

The starting priority of this adapter:
- **1:** Logic adapters
- **2:** Data providers
- **3:** All other adapters

#### Defined in

[types-dev/objects.d.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L360)

***

### ~~title?~~

> `optional` **title**: `string`

#### Deprecated

The name of this adapter to be shown in the admin UI. Use

#### See

titleLang instead.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`title`](AdapterCommon.md#title)

#### Defined in

[types-dev/objects.d.ts:737](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L737)

***

### titleLang?

> `optional` **titleLang**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The translated names of this adapter to be shown in the admin UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`titleLang`](AdapterCommon.md#titlelang)

#### Defined in

[types-dev/objects.d.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L735)

***

### type?

> `optional` **type**: `"hardware"` \| `"alarm"` \| `"climate-control"` \| `"communication"` \| `"date-and-time"` \| `"energy"` \| `"garden"` \| `"general"` \| `"geoposition"` \| `"health"` \| `"household"` \| `"infrastructure"` \| `"iot-systems"` \| `"lighting"` \| `"logic"` \| `"messaging"` \| `"metering"` \| `"misc-data"` \| `"multimedia"` \| `"network"` \| `"protocols"` \| `"storage"` \| `"utility"` \| `"vehicle"` \| `"visualization"` \| `"visualization-icons"` \| `"visualization-widgets"` \| `"weather"`

The type of this adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`type`](AdapterCommon.md#type)

#### Defined in

[types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L739)

***

### unsafePerm?

> `optional` **unsafePerm**: `true`

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`unsafePerm`](AdapterCommon.md#unsafeperm)

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L769)

***

### version

> **version**: `string`

The available version in the ioBroker repo.

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`version`](AdapterCommon.md#version)

#### Defined in

[types-dev/objects.d.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L348)

***

### visWidgets?

> `optional` **visWidgets**: `Record`\<`string`, [`VisWidget`](VisWidget.md)\>

Definition of the vis-2 widgets

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`visWidgets`](AdapterCommon.md#viswidgets)

#### Defined in

[types-dev/objects.d.ts:773](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L773)

***

### webByVersion?

> `optional` **webByVersion**: `boolean`

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webByVersion`](AdapterCommon.md#webbyversion)

#### Defined in

[types-dev/objects.d.ts:775](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L775)

***

### webExtendable?

> `optional` **webExtendable**: `boolean`

Whether the web server in this adapter can be extended with plugin/extensions

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webExtendable`](AdapterCommon.md#webextendable)

#### Defined in

[types-dev/objects.d.ts:777](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L777)

***

### webExtension?

> `optional` **webExtension**: `string`

Relative path to a module that contains an extension for the web adapter. Use together with

#### See

native.webInstance to configure which instances this affects

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webExtension`](AdapterCommon.md#webextension)

#### Defined in

[types-dev/objects.d.ts:779](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L779)

***

### webPreSettings?

> `optional` **webPreSettings**: `Record`\<`string`, `any`\>

List of parameters that must be included in info.js by webServer adapter. (Example material: `"webPreSettings": { "materialBackground": "native.loadingBackground" }`). Web adapter uses this setting to create a customized info.js file to provide some essential settings for index.html file before the socket connection is established to provide e.g., background color of the loading screen.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webPreSettings`](AdapterCommon.md#webpresettings)

#### Defined in

[types-dev/objects.d.ts:781](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L781)

***

### ~~webservers?~~

> `optional` **webservers**: `string`[]

#### Deprecated

(where is it necessary?) Array of web server's instances that should serve content from the adapter's www folder

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webservers`](AdapterCommon.md#webservers)

#### Defined in

[types-dev/objects.d.ts:783](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L783)

***

### ~~welcomeScreen?~~

> `optional` **welcomeScreen**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

#### Deprecated

(use localLinks) A list of pages that should be shown on the "web" index page

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`welcomeScreen`](AdapterCommon.md#welcomescreen)

#### Defined in

[types-dev/objects.d.ts:785](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L785)

***

### ~~welcomeScreenPro?~~

> `optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

#### Deprecated

(use localLinks) A list of pages that should be shown on the ioBroker cloud index page

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`welcomeScreenPro`](AdapterCommon.md#welcomescreenpro)

#### Defined in

[types-dev/objects.d.ts:787](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L787)

***

### ~~wwwDontUpload?~~

> `optional` **wwwDontUpload**: `boolean`

#### Deprecated

(rename the `www` folder in e.g. `adminWww`) If true, the `www` folder will be not uploaded into DB

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`wwwDontUpload`](AdapterCommon.md#wwwdontupload)

#### Defined in

[types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L789)
