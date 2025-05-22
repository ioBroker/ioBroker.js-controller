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

[types-dev/objects.d.ts:603](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L603)

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

Describes which URL should be loaded in the tab. Supports placeholders like http://%ip%:%port% or JSON(5) configs. If empty `adapter/ADAPTERNAME/tab(_m).html` will be taken. JSON config file must be defined relative to "admin" folder, like "jsonTab.json"

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

[types-dev/objects.d.ts:607](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L607)

***

### adminUI?

> `optional` **adminUI**: [`AdminUi`](AdminUi.md)

Type of the admin UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminUI`](AdapterCommon.md#adminui)

#### Defined in

[types-dev/objects.d.ts:605](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L605)

***

### allowInit?

> `optional` **allowInit**: `boolean`

If the mode is `schedule`, start one time adapter by ioBroker start, or by the configuration changes

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`allowInit`](AdapterCommon.md#allowinit)

#### Defined in

[types-dev/objects.d.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L623)

***

### automaticUpgrade?

> `optional` **automaticUpgrade**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

If the adapter should be automatically upgraded and which version ranges are supported

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`automaticUpgrade`](AdapterCommon.md#automaticupgrade)

#### Defined in

[types-dev/objects.d.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L625)

***

### availableModes?

> `optional` **availableModes**: [`InstanceMode`](../type-aliases/InstanceMode.md)[]

Possible values for the instance mode (if more than one is possible)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`availableModes`](AdapterCommon.md#availablemodes)

#### Defined in

[types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L627)

***

### blockedVersions?

> `optional` **blockedVersions**: `string`[]

Array which lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`blockedVersions`](AdapterCommon.md#blockedversions)

#### Defined in

[types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L629)

***

### blockly?

> `optional` **blockly**: `boolean`

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`blockly`](AdapterCommon.md#blockly)

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L631)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`color`](AdapterCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L179)

***

### compact?

> `optional` **compact**: `boolean`

If compact mode is supported

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`compact`](AdapterCommon.md#compact)

#### Defined in

[types-dev/objects.d.ts:364](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L364)

***

### compactGroup?

> `optional` **compactGroup**: `number`

Active compact group, instances in this group will be started in one process

#### Defined in

[types-dev/objects.d.ts:368](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L368)

***

### connectionType?

> `optional` **connectionType**: [`ConnectionType`](../type-aliases/ConnectionType.md)

Where the adapter will get its data from. Set this together with

#### See

dataSource

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`connectionType`](AdapterCommon.md#connectiontype)

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L633)

***

### custom?

> `optional` **custom**: `undefined`

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`custom`](AdapterCommon.md#custom)

#### Defined in

[types-dev/objects.d.ts:380](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L380)

***

### dataFolder?

> `optional` **dataFolder**: `string`

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dataFolder`](AdapterCommon.md#datafolder)

#### Defined in

[types-dev/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L637)

***

### dataSource?

> `optional` **dataSource**: `"push"` \| `"poll"` \| `"assumption"`

How the adapter will mainly receive its data. Set this together with

#### See

connectionType

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dataSource`](AdapterCommon.md#datasource)

#### Defined in

[types-dev/objects.d.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L639)

***

### dependencies?

> `optional` **dependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dependencies`](AdapterCommon.md#dependencies)

#### Defined in

[types-dev/objects.d.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L641)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`desc`](AdapterCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L171)

***

### docs?

> `optional` **docs**: `Partial`\<`Record`\<[`Languages`](../type-aliases/Languages.md), `string` \| `string`[]\>\>

Which files outside the README.md have documentation for the adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`docs`](AdapterCommon.md#docs)

#### Defined in

[types-dev/objects.d.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L647)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dontDelete`](AdapterCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L174)

***

### enabled

> **enabled**: `boolean`

Whether new instances should be enabled by default. *Should* be `false`!

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`enabled`](AdapterCommon.md#enabled)

#### Defined in

[types-dev/objects.d.ts:351](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L351)

***

### eraseOnUpload?

> `optional` **eraseOnUpload**: `boolean`

If true, all previous data in the target directory (web) should be deleted before uploading

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`eraseOnUpload`](AdapterCommon.md#eraseonupload)

#### Defined in

[types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L651)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`expert`](AdapterCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L177)

***

### extIcon?

> `optional` **extIcon**: `string`

URL of an external icon that is shown for adapters that are not installed

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`extIcon`](AdapterCommon.md#exticon)

#### Defined in

[types-dev/objects.d.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L653)

***

### getHistory?

> `optional` **getHistory**: `boolean`

Whether this adapter responds to `getHistory` messages

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`getHistory`](AdapterCommon.md#gethistory)

#### Defined in

[types-dev/objects.d.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L655)

***

### globalDependencies?

> `optional` **globalDependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`globalDependencies`](AdapterCommon.md#globaldependencies)

#### Defined in

[types-dev/objects.d.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L643)

***

### host

> **host**: `string`

The name of the host where this instance is running

#### Defined in

[types-dev/objects.d.ts:350](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L350)

***

### icon?

> `optional` **icon**: `string`

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`icon`](AdapterCommon.md#icon-1)

#### Defined in

[types-dev/objects.d.ts:657](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L657)

***

### ifInstalledDependencies?

> `optional` **ifInstalledDependencies**: `object`

Similar to `dependencies`, but only checked if the specified adapter is already installed. If the adapter is not installed, the version check will pass

#### Index Signature

 \[`adapterName`: `string`\]: `string`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`ifInstalledDependencies`](AdapterCommon.md#ifinstalleddependencies)

#### Defined in

[types-dev/objects.d.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L645)

***

### ignoreVersion?

> `optional` **ignoreVersion**: `string`

If a specific update of this adapter should be ignored, specifies version number to be ignored

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`ignoreVersion`](AdapterCommon.md#ignoreversion)

#### Defined in

[types-dev/objects.d.ts:802](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L802)

***

### install?

> `optional` **install**: `boolean`

The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one time installation code.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`install`](AdapterCommon.md#install)

#### Defined in

[types-dev/objects.d.ts:659](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L659)

***

### installedFrom?

> `optional` **installedFrom**: [`InstalledFrom`](../type-aliases/InstalledFrom.md)

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`installedFrom`](AdapterCommon.md#installedfrom)

#### Defined in

[types-dev/objects.d.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L372)

***

### installedVersion

> **installedVersion**: `string`

Shows which version of this adapter is installed

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`installedVersion`](AdapterCommon.md#installedversion)

#### Defined in

[types-dev/objects.d.ts:663](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L663)

***

### javascriptRules?

> `optional` **javascriptRules**: `object`

Rules blocks for JavaScript rules

#### i18n?

> `optional` **i18n**: `boolean` \| `Record`\<`string`, `string`\> \| `Record`\<`string`, `Record`\<[`Languages`](../type-aliases/Languages.md), `string`\>\>

Translations

#### name

> **name**: `string`

Rules block name, like "ActionTelegram"

#### type?

> `optional` **type**: `"module"`

Load it as TypeScript module

#### url

> **url**: `string`

Where to load the blocks, like "rules/customRuleBlocks.js"

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`javascriptRules`](AdapterCommon.md#javascriptrules)

#### Defined in

[types-dev/objects.d.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L806)

***

### keywords?

> `optional` **keywords**: `string`[]

Keywords are used by search in admin. Do not write ioBroker here

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`keywords`](AdapterCommon.md#keywords)

#### Defined in

[types-dev/objects.d.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L665)

***

### ~~license?~~

> `optional` **license**: `string`

#### Deprecated

Use 'common.licenseInformation' instead

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`license`](AdapterCommon.md#license)

#### Defined in

[types-dev/objects.d.ts:796](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L796)

***

### licenseInformation?

> `optional` **licenseInformation**: [`LicenseInformation`](../type-aliases/LicenseInformation.md)

An object representing information with the license details

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`licenseInformation`](AdapterCommon.md#licenseinformation)

#### Defined in

[types-dev/objects.d.ts:798](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L798)

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

[types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L669)

***

### localLinks?

> `optional` **localLinks**: `Record`\<`string`, `string` \| [`LocalLink`](../type-aliases/LocalLink.md)\>

A dictionary of links to web services this adapter provides

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`localLinks`](AdapterCommon.md#locallinks)

#### Defined in

[types-dev/objects.d.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L667)

***

### loglevel?

> `optional` **loglevel**: [`LogLevel`](../type-aliases/LogLevel.md)

Default log level for this adapter. It can be changed for every instance separately

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`loglevel`](AdapterCommon.md#loglevel)

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L671)

***

### logTransporter?

> `optional` **logTransporter**: `boolean`

If adapter can consume log messages, like admin, javascript or logparser

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`logTransporter`](AdapterCommon.md#logtransporter)

#### Defined in

[types-dev/objects.d.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L376)

***

### main?

> `optional` **main**: `string`

Path to the start file of the adapter. Should be the same as in `package.json`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`main`](AdapterCommon.md#main)

#### Defined in

[types-dev/objects.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L675)

***

### materialize

> **materialize**: `boolean`

Whether the admin configuration dialog is written in materialized style. Required for Admin 3+

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`materialize`](AdapterCommon.md#materialize)

#### Defined in

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L679)

***

### materializeTab?

> `optional` **materializeTab**: `boolean`

Whether the admin tab is written in materialized style. Required for Admin 3+

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`materializeTab`](AdapterCommon.md#materializetab)

#### Defined in

[types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L677)

***

### memoryLimitMB?

> `optional` **memoryLimitMB**: `number`

Optional memory limit for this instance

#### Defined in

[types-dev/objects.d.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L378)

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

[types-dev/objects.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L681)

***

### messages?

> `optional` **messages**: [`MessageRule`](MessageRule.md)[]

Messages, that will be shown (if condition evaluates to true) by upgrade or installation

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`messages`](AdapterCommon.md#messages)

#### Defined in

[types-dev/objects.d.ts:800](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L800)

***

### mode

> **mode**: [`InstanceMode`](../type-aliases/InstanceMode.md)

How and when this instance should be started

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`mode`](AdapterCommon.md#mode)

#### Defined in

[types-dev/objects.d.ts:353](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L353)

***

### name

> **name**: `string`

Name of the adapter (without leading `ioBroker.`)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`name`](AdapterCommon.md#name-2)

#### Defined in

[types-dev/objects.d.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L687)

***

### news?

> `optional` **news**: `object`

News per version in i18n

#### Index Signature

 \[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`news`](AdapterCommon.md#news)

#### Defined in

[types-dev/objects.d.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L689)

***

### noConfig?

> `optional` **noConfig**: `true`

If `true`, no configuration dialog will be shown

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noConfig`](AdapterCommon.md#noconfig)

#### Defined in

[types-dev/objects.d.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L691)

***

### nodeProcessParams?

> `optional` **nodeProcessParams**: `string`[]

Arguments passed to the adapter process, this disables compact mode

#### Defined in

[types-dev/objects.d.ts:374](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L374)

***

### nogit?

> `optional` **nogit**: `true`

If `true`, manual installation from GitHub is not possible

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`nogit`](AdapterCommon.md#nogit)

#### Defined in

[types-dev/objects.d.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L697)

***

### noIntro?

> `optional` **noIntro**: `true`

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noIntro`](AdapterCommon.md#nointro)

#### Defined in

[types-dev/objects.d.ts:693](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L693)

***

### nondeletable?

> `optional` **nondeletable**: `true`

If `true`, this adapter cannot be deleted or updated manually.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`nondeletable`](AdapterCommon.md#nondeletable)

#### Defined in

[types-dev/objects.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L699)

***

### noRepository?

> `optional` **noRepository**: `true`

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noRepository`](AdapterCommon.md#norepository)

#### Defined in

[types-dev/objects.d.ts:695](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L695)

***

### onlyWWW?

> `optional` **onlyWWW**: `boolean`

If `true`, this "adapter" only contains HTML files and no main executable

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`onlyWWW`](AdapterCommon.md#onlywww)

#### Defined in

[types-dev/objects.d.ts:701](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L701)

***

### os?

> `optional` **os**: `"linux"` \| `"darwin"` \| `"win32"` \| (`"linux"` \| `"darwin"` \| `"win32"`)[]

Which OSes this adapter supports

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`os`](AdapterCommon.md#os)

#### Defined in

[types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L712)

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

[types-dev/objects.d.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L703)

***

### platform

> **platform**: `"Javascript/Node.js"`

Constant

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`platform`](AdapterCommon.md#platform)

#### Defined in

[types-dev/objects.d.ts:714](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L714)

***

### plugins?

> `optional` **plugins**: `object`

Sentry and other plugins

#### Index Signature

 \[`pluginName`: `string`\]: `Record`\<`string`, `any`\>

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`plugins`](AdapterCommon.md#plugins)

#### Defined in

[types-dev/objects.d.ts:804](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L804)

***

### preserveSettings?

> `optional` **preserveSettings**: `string` \| `string`[]

String (or array) with names of attributes in common of instance, which will not be deleted.

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`preserveSettings`](AdapterCommon.md#preservesettings)

#### Defined in

[types-dev/objects.d.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L370)

***

### readme?

> `optional` **readme**: `string`

Url of the ReadMe file

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`readme`](AdapterCommon.md#readme)

#### Defined in

[types-dev/objects.d.ts:718](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L718)

***

### restartAdapters?

> `optional` **restartAdapters**: `string`[]

Which adapters must be restarted after installing or updating this adapter.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`restartAdapters`](AdapterCommon.md#restartadapters)

#### Defined in

[types-dev/objects.d.ts:720](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L720)

***

### restartSchedule?

> `optional` **restartSchedule**: `string`

CRON schedule to restart mode `daemon` adapters

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`restartSchedule`](AdapterCommon.md#restartschedule)

#### Defined in

[types-dev/objects.d.ts:722](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L722)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`role`](AdapterCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L186)

***

### runAsCompactMode?

> `optional` **runAsCompactMode**: `boolean`

If compact mode is active

#### Defined in

[types-dev/objects.d.ts:366](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L366)

***

### schedule?

> `optional` **schedule**: `string`

If the adapter runs in `schedule` mode, this contains the CRON

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`schedule`](AdapterCommon.md#schedule)

#### Defined in

[types-dev/objects.d.ts:724](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L724)

***

### singleton?

> `optional` **singleton**: `boolean`

Whether this adapter may only be installed once in the whole system

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`singleton`](AdapterCommon.md#singleton-1)

#### Defined in

[types-dev/objects.d.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L728)

***

### singletonHost?

> `optional` **singletonHost**: `boolean`

Whether this adapter may only be installed once per host

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`singletonHost`](AdapterCommon.md#singletonhost)

#### Defined in

[types-dev/objects.d.ts:726](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L726)

***

### stopBeforeUpdate?

> `optional` **stopBeforeUpdate**: `boolean`

Whether the adapter must be stopped before an update

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`stopBeforeUpdate`](AdapterCommon.md#stopbeforeupdate)

#### Defined in

[types-dev/objects.d.ts:730](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L730)

***

### stopTimeout?

> `optional` **stopTimeout**: `number`

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`stopTimeout`](AdapterCommon.md#stoptimeout)

#### Defined in

[types-dev/objects.d.ts:732](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L732)

***

### subscribable?

> `optional` **subscribable**: `boolean`

Variables of this adapter must be subscribed with sendTo to enable updates

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`subscribable`](AdapterCommon.md#subscribable)

#### Defined in

[types-dev/objects.d.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L362)

***

### supportCustoms?

> `optional` **supportCustoms**: `boolean`

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportCustoms`](AdapterCommon.md#supportcustoms)

#### Defined in

[types-dev/objects.d.ts:736](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L736)

***

### supportedMessages?

> `optional` **supportedMessages**: [`SupportedMessages`](SupportedMessages.md)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportedMessages`](AdapterCommon.md#supportedmessages)

#### Defined in

[types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L683)

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

[types-dev/objects.d.ts:738](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L738)

***

### tier?

> `optional` **tier**: `2` \| `1` \| `3`

The starting priority of this adapter:
- **1:** Logic adapters
- **2:** Data providers
- **3:** All other adapters

#### Defined in

[types-dev/objects.d.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L360)

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

[types-dev/objects.d.ts:742](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L742)

***

### titleLang?

> `optional` **titleLang**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The translated names of this adapter to be shown in the admin UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`titleLang`](AdapterCommon.md#titlelang)

#### Defined in

[types-dev/objects.d.ts:740](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L740)

***

### type?

> `optional` **type**: `"hardware"` \| `"alarm"` \| `"climate-control"` \| `"communication"` \| `"date-and-time"` \| `"energy"` \| `"garden"` \| `"general"` \| `"geoposition"` \| `"health"` \| `"household"` \| `"infrastructure"` \| `"iot-systems"` \| `"lighting"` \| `"logic"` \| `"messaging"` \| `"metering"` \| `"misc-data"` \| `"multimedia"` \| `"network"` \| `"protocols"` \| `"storage"` \| `"utility"` \| `"vehicle"` \| `"visualization"` \| `"visualization-icons"` \| `"visualization-widgets"` \| `"weather"`

The type of this adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`type`](AdapterCommon.md#type-1)

#### Defined in

[types-dev/objects.d.ts:744](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L744)

***

### unsafePerm?

> `optional` **unsafePerm**: `true`

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`unsafePerm`](AdapterCommon.md#unsafeperm)

#### Defined in

[types-dev/objects.d.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L774)

***

### version

> **version**: `string`

The available version in the ioBroker repo.

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`version`](AdapterCommon.md#version)

#### Defined in

[types-dev/objects.d.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L348)

***

### visWidgets?

> `optional` **visWidgets**: `Record`\<`string`, [`VisWidget`](VisWidget.md)\>

Definition of the vis-2 widgets

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`visWidgets`](AdapterCommon.md#viswidgets)

#### Defined in

[types-dev/objects.d.ts:778](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L778)

***

### webByVersion?

> `optional` **webByVersion**: `boolean`

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webByVersion`](AdapterCommon.md#webbyversion)

#### Defined in

[types-dev/objects.d.ts:780](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L780)

***

### webExtendable?

> `optional` **webExtendable**: `boolean`

Whether the web server in this adapter can be extended with plugin/extensions

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webExtendable`](AdapterCommon.md#webextendable)

#### Defined in

[types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L782)

***

### webExtension?

> `optional` **webExtension**: `string`

Relative path to a module that contains an extension for the web adapter. Use together with

#### See

native.webInstance to configure which instances this affects

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webExtension`](AdapterCommon.md#webextension)

#### Defined in

[types-dev/objects.d.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L784)

***

### webPreSettings?

> `optional` **webPreSettings**: `Record`\<`string`, `any`\>

List of parameters that must be included in info.js by webServer adapter. (Example material: `"webPreSettings": { "materialBackground": "native.loadingBackground" }`). Web adapter uses this setting to create a customized info.js file to provide some essential settings for index.html file before the socket connection is established to provide e.g., background color of the loading screen.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webPreSettings`](AdapterCommon.md#webpresettings)

#### Defined in

[types-dev/objects.d.ts:786](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L786)

***

### ~~webservers?~~

> `optional` **webservers**: `string`[]

#### Deprecated

(where is it necessary?) Array of web server's instances that should serve content from the adapter's www folder

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webservers`](AdapterCommon.md#webservers)

#### Defined in

[types-dev/objects.d.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L788)

***

### ~~welcomeScreen?~~

> `optional` **welcomeScreen**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

#### Deprecated

(use localLinks) A list of pages that should be shown on the "web" index page

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`welcomeScreen`](AdapterCommon.md#welcomescreen)

#### Defined in

[types-dev/objects.d.ts:790](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L790)

***

### ~~welcomeScreenPro?~~

> `optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

#### Deprecated

(use localLinks) A list of pages that should be shown on the ioBroker cloud index page

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`welcomeScreenPro`](AdapterCommon.md#welcomescreenpro)

#### Defined in

[types-dev/objects.d.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L792)

***

### ~~wwwDontUpload?~~

> `optional` **wwwDontUpload**: `boolean`

#### Deprecated

(rename the `www` folder in e.g. `adminWww`) If true, the `www` folder will be not uploaded into DB

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`wwwDontUpload`](AdapterCommon.md#wwwdontupload)

#### Defined in

[types-dev/objects.d.ts:794](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L794)
