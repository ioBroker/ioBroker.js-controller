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

[types-dev/objects.d.ts:628](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L628)

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

#### supportsLoadingMessage?

> `optional` **supportsLoadingMessage**: `boolean`

If page sends 'iobLoaded' event:

if (window.parent !== window) {
 try {
  window.parent.postMessage('iobLoaded', '*');
 } catch {
 // ignore
 }
}

When loaded in iframe, inform parent window
Admin will hide a loading spinner when the message will be received.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminTab`](AdapterCommon.md#admintab)

#### Defined in

[types-dev/objects.d.ts:632](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L632)

***

### adminUI?

> `optional` **adminUI**: [`AdminUi`](AdminUi.md)

Type of the admin UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`adminUI`](AdapterCommon.md#adminui)

#### Defined in

[types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L630)

***

### allowInit?

> `optional` **allowInit**: `boolean`

If the mode is `schedule`, start one time adapter by ioBroker start, or by the configuration changes

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`allowInit`](AdapterCommon.md#allowinit)

#### Defined in

[types-dev/objects.d.ts:663](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L663)

***

### automaticUpgrade?

> `optional` **automaticUpgrade**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

If the adapter should be automatically upgraded and which version ranges are supported

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`automaticUpgrade`](AdapterCommon.md#automaticupgrade)

#### Defined in

[types-dev/objects.d.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L665)

***

### availableModes?

> `optional` **availableModes**: [`InstanceMode`](../type-aliases/InstanceMode.md)[]

Possible values for the instance mode (if more than one is possible)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`availableModes`](AdapterCommon.md#availablemodes)

#### Defined in

[types-dev/objects.d.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L667)

***

### blockedVersions?

> `optional` **blockedVersions**: `string`[]

Array which lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`blockedVersions`](AdapterCommon.md#blockedversions)

#### Defined in

[types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L669)

***

### blockly?

> `optional` **blockly**: `boolean`

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`blockly`](AdapterCommon.md#blockly)

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L671)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`color`](AdapterCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L183)

***

### compact?

> `optional` **compact**: `boolean`

If compact mode is supported

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`compact`](AdapterCommon.md#compact)

#### Defined in

[types-dev/objects.d.ts:375](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L375)

***

### compactGroup?

> `optional` **compactGroup**: `number`

Active compact group, instances in this group will be started in one process

#### Defined in

[types-dev/objects.d.ts:379](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L379)

***

### connectionType?

> `optional` **connectionType**: [`ConnectionType`](../type-aliases/ConnectionType.md)

Where the adapter will get its data from. Set this together with

#### See

dataSource

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`connectionType`](AdapterCommon.md#connectiontype)

#### Defined in

[types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L673)

***

### custom?

> `optional` **custom**: `undefined`

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`custom`](AdapterCommon.md#custom)

#### Defined in

[types-dev/objects.d.ts:391](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L391)

***

### dataFolder?

> `optional` **dataFolder**: `string`

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dataFolder`](AdapterCommon.md#datafolder)

#### Defined in

[types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L677)

***

### dataSource?

> `optional` **dataSource**: `"push"` \| `"poll"` \| `"assumption"`

How the adapter will mainly receive its data. Set this together with

#### See

connectionType

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dataSource`](AdapterCommon.md#datasource)

#### Defined in

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L679)

***

### dependencies?

> `optional` **dependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dependencies`](AdapterCommon.md#dependencies)

#### Defined in

[types-dev/objects.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L681)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`desc`](AdapterCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L175)

***

### docs?

> `optional` **docs**: `Partial`\<`Record`\<[`Languages`](../type-aliases/Languages.md), `string` \| `string`[]\>\>

Which files outside the README.md have documentation for the adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`docs`](AdapterCommon.md#docs)

#### Defined in

[types-dev/objects.d.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L687)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`dontDelete`](AdapterCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L178)

***

### enabled

> **enabled**: `boolean`

Whether new instances should be enabled by default. *Should* be `false`!

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`enabled`](AdapterCommon.md#enabled)

#### Defined in

[types-dev/objects.d.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L362)

***

### eraseOnUpload?

> `optional` **eraseOnUpload**: `boolean`

If true, all previous data in the target directory (web) should be deleted before uploading

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`eraseOnUpload`](AdapterCommon.md#eraseonupload)

#### Defined in

[types-dev/objects.d.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L691)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`expert`](AdapterCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L181)

***

### extIcon?

> `optional` **extIcon**: `string`

URL of an external icon that is shown for adapters that are not installed

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`extIcon`](AdapterCommon.md#exticon)

#### Defined in

[types-dev/objects.d.ts:693](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L693)

***

### getHistory?

> `optional` **getHistory**: `boolean`

Whether this adapter responds to `getHistory` messages

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`getHistory`](AdapterCommon.md#gethistory)

#### Defined in

[types-dev/objects.d.ts:695](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L695)

***

### globalDependencies?

> `optional` **globalDependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`globalDependencies`](AdapterCommon.md#globaldependencies)

#### Defined in

[types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L683)

***

### host

> **host**: `string`

The name of the host where this instance is running

#### Defined in

[types-dev/objects.d.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L361)

***

### icon?

> `optional` **icon**: `string`

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`icon`](AdapterCommon.md#icon-1)

#### Defined in

[types-dev/objects.d.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L697)

***

### ifInstalledDependencies?

> `optional` **ifInstalledDependencies**: `object`

Similar to `dependencies`, but only checked if the specified adapter is already installed. If the adapter is not installed, the version check will pass

#### Index Signature

 \[`adapterName`: `string`\]: `string`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`ifInstalledDependencies`](AdapterCommon.md#ifinstalleddependencies)

#### Defined in

[types-dev/objects.d.ts:685](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L685)

***

### ignoreVersion?

> `optional` **ignoreVersion**: `string`

If a specific update of this adapter should be ignored, specifies version number to be ignored

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`ignoreVersion`](AdapterCommon.md#ignoreversion)

#### Defined in

[types-dev/objects.d.ts:844](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L844)

***

### install?

> `optional` **install**: `boolean`

The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one time installation code.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`install`](AdapterCommon.md#install)

#### Defined in

[types-dev/objects.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L699)

***

### installedFrom?

> `optional` **installedFrom**: [`InstalledFrom`](../type-aliases/InstalledFrom.md)

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`installedFrom`](AdapterCommon.md#installedfrom)

#### Defined in

[types-dev/objects.d.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L383)

***

### installedVersion

> **installedVersion**: `string`

Shows which version of this adapter is installed

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`installedVersion`](AdapterCommon.md#installedversion)

#### Defined in

[types-dev/objects.d.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L703)

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

[types-dev/objects.d.ts:848](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L848)

***

### keywords?

> `optional` **keywords**: `string`[]

Keywords are used by search in admin. Do not write ioBroker here

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`keywords`](AdapterCommon.md#keywords)

#### Defined in

[types-dev/objects.d.ts:705](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L705)

***

### ~~license?~~

> `optional` **license**: `string`

#### Deprecated

Use 'common.licenseInformation' instead

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`license`](AdapterCommon.md#license)

#### Defined in

[types-dev/objects.d.ts:838](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L838)

***

### licenseInformation?

> `optional` **licenseInformation**: [`LicenseInformation`](../type-aliases/LicenseInformation.md)

An object representing information with the license details

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`licenseInformation`](AdapterCommon.md#licenseinformation)

#### Defined in

[types-dev/objects.d.ts:840](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L840)

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

[types-dev/objects.d.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L709)

***

### localLinks?

> `optional` **localLinks**: `Record`\<`string`, `string` \| [`LocalLink`](../type-aliases/LocalLink.md)\>

A dictionary of links to web services this adapter provides

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`localLinks`](AdapterCommon.md#locallinks)

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L707)

***

### loglevel?

> `optional` **loglevel**: [`LogLevel`](../type-aliases/LogLevel.md)

Default log level for this adapter. It can be changed for every instance separately

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`loglevel`](AdapterCommon.md#loglevel)

#### Defined in

[types-dev/objects.d.ts:711](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L711)

***

### logTransporter?

> `optional` **logTransporter**: `boolean`

If adapter can consume log messages, like admin, javascript or logparser

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`logTransporter`](AdapterCommon.md#logtransporter)

#### Defined in

[types-dev/objects.d.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L387)

***

### main?

> `optional` **main**: `string`

Path to the start file of the adapter. Should be the same as in `package.json`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`main`](AdapterCommon.md#main)

#### Defined in

[types-dev/objects.d.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L715)

***

### materialize

> **materialize**: `boolean`

Whether the admin configuration dialog is written in materialized style. Required for Admin 3+

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`materialize`](AdapterCommon.md#materialize)

#### Defined in

[types-dev/objects.d.ts:719](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L719)

***

### materializeTab?

> `optional` **materializeTab**: `boolean`

Whether the admin tab is written in materialized style. Required for Admin 3+

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`materializeTab`](AdapterCommon.md#materializetab)

#### Defined in

[types-dev/objects.d.ts:717](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L717)

***

### memoryLimitMB?

> `optional` **memoryLimitMB**: `number`

Optional memory limit for this instance

#### Defined in

[types-dev/objects.d.ts:389](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L389)

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

[types-dev/objects.d.ts:721](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L721)

***

### messages?

> `optional` **messages**: [`MessageRule`](MessageRule.md)[]

Messages, that will be shown (if condition evaluates to true) by upgrade or installation

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`messages`](AdapterCommon.md#messages)

#### Defined in

[types-dev/objects.d.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L842)

***

### mode

> **mode**: [`InstanceMode`](../type-aliases/InstanceMode.md)

How and when this instance should be started

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`mode`](AdapterCommon.md#mode)

#### Defined in

[types-dev/objects.d.ts:364](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L364)

***

### name

> **name**: `string`

Name of the adapter (without leading `ioBroker.`)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`name`](AdapterCommon.md#name-2)

#### Defined in

[types-dev/objects.d.ts:727](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L727)

***

### news?

> `optional` **news**: `object`

News per version in i18n

#### Index Signature

 \[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`news`](AdapterCommon.md#news)

#### Defined in

[types-dev/objects.d.ts:729](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L729)

***

### noConfig?

> `optional` **noConfig**: `true`

If `true`, no configuration dialog will be shown

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noConfig`](AdapterCommon.md#noconfig)

#### Defined in

[types-dev/objects.d.ts:731](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L731)

***

### nodeProcessParams?

> `optional` **nodeProcessParams**: `string`[]

Arguments passed to the adapter process, this disables compact mode

#### Defined in

[types-dev/objects.d.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L385)

***

### nogit?

> `optional` **nogit**: `true`

If `true`, manual installation from GitHub is not possible

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`nogit`](AdapterCommon.md#nogit)

#### Defined in

[types-dev/objects.d.ts:737](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L737)

***

### noIntro?

> `optional` **noIntro**: `true`

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noIntro`](AdapterCommon.md#nointro)

#### Defined in

[types-dev/objects.d.ts:733](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L733)

***

### nondeletable?

> `optional` **nondeletable**: `true`

If `true`, this adapter cannot be deleted or updated manually.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`nondeletable`](AdapterCommon.md#nondeletable)

#### Defined in

[types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L739)

***

### noRepository?

> `optional` **noRepository**: `true`

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`noRepository`](AdapterCommon.md#norepository)

#### Defined in

[types-dev/objects.d.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L735)

***

### onlyWWW?

> `optional` **onlyWWW**: `boolean`

If `true`, this "adapter" only contains HTML files and no main executable

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`onlyWWW`](AdapterCommon.md#onlywww)

#### Defined in

[types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L741)

***

### os?

> `optional` **os**: `"linux"` \| `"darwin"` \| `"win32"` \| (`"linux"` \| `"darwin"` \| `"win32"`)[]

Which OSes this adapter supports

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`os`](AdapterCommon.md#os)

#### Defined in

[types-dev/objects.d.ts:752](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L752)

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

[types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L743)

***

### platform

> **platform**: `"Javascript/Node.js"`

Constant

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`platform`](AdapterCommon.md#platform)

#### Defined in

[types-dev/objects.d.ts:754](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L754)

***

### plugins?

> `optional` **plugins**: `object`

Sentry and other plugins

#### Index Signature

 \[`pluginName`: `string`\]: `Record`\<`string`, `any`\>

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`plugins`](AdapterCommon.md#plugins)

#### Defined in

[types-dev/objects.d.ts:846](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L846)

***

### preserveSettings?

> `optional` **preserveSettings**: `string` \| `string`[]

String (or array) with names of attributes in common of instance, which will not be deleted.

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`preserveSettings`](AdapterCommon.md#preservesettings)

#### Defined in

[types-dev/objects.d.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L381)

***

### readme?

> `optional` **readme**: `string`

Url of the ReadMe file

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`readme`](AdapterCommon.md#readme)

#### Defined in

[types-dev/objects.d.ts:758](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L758)

***

### restartAdapters?

> `optional` **restartAdapters**: `string`[]

Which adapters must be restarted after installing or updating this adapter.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`restartAdapters`](AdapterCommon.md#restartadapters)

#### Defined in

[types-dev/objects.d.ts:760](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L760)

***

### restartSchedule?

> `optional` **restartSchedule**: `string`

CRON schedule to restart mode `daemon` adapters

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`restartSchedule`](AdapterCommon.md#restartschedule)

#### Defined in

[types-dev/objects.d.ts:762](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L762)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`role`](AdapterCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L190)

***

### runAsCompactMode?

> `optional` **runAsCompactMode**: `boolean`

If compact mode is active

#### Defined in

[types-dev/objects.d.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L377)

***

### schedule?

> `optional` **schedule**: `string`

If the adapter runs in `schedule` mode, this contains the CRON

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`schedule`](AdapterCommon.md#schedule)

#### Defined in

[types-dev/objects.d.ts:764](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L764)

***

### singleton?

> `optional` **singleton**: `boolean`

Whether this adapter may only be installed once in the whole system

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`singleton`](AdapterCommon.md#singleton-1)

#### Defined in

[types-dev/objects.d.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L768)

***

### singletonHost?

> `optional` **singletonHost**: `boolean`

Whether this adapter may only be installed once per host

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`singletonHost`](AdapterCommon.md#singletonhost)

#### Defined in

[types-dev/objects.d.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L766)

***

### stopBeforeUpdate?

> `optional` **stopBeforeUpdate**: `boolean`

Whether the adapter must be stopped before an update

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`stopBeforeUpdate`](AdapterCommon.md#stopbeforeupdate)

#### Defined in

[types-dev/objects.d.ts:770](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L770)

***

### stopTimeout?

> `optional` **stopTimeout**: `number`

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`stopTimeout`](AdapterCommon.md#stoptimeout)

#### Defined in

[types-dev/objects.d.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L772)

***

### subscribable?

> `optional` **subscribable**: `boolean`

Variables of this adapter must be subscribed with sendTo to enable updates

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`subscribable`](AdapterCommon.md#subscribable)

#### Defined in

[types-dev/objects.d.ts:373](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L373)

***

### supportCustoms?

> `optional` **supportCustoms**: `boolean`

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportCustoms`](AdapterCommon.md#supportcustoms)

#### Defined in

[types-dev/objects.d.ts:776](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L776)

***

### supportedMessages?

> `optional` **supportedMessages**: [`SupportedMessages`](SupportedMessages.md)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`supportedMessages`](AdapterCommon.md#supportedmessages)

#### Defined in

[types-dev/objects.d.ts:723](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L723)

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

[types-dev/objects.d.ts:778](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L778)

***

### tier?

> `optional` **tier**: `2` \| `1` \| `3`

The starting priority of this adapter:
- **1:** Logic adapters
- **2:** Data providers
- **3:** All other adapters

#### Defined in

[types-dev/objects.d.ts:371](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L371)

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

[types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L782)

***

### titleLang?

> `optional` **titleLang**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The translated names of this adapter to be shown in the admin UI

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`titleLang`](AdapterCommon.md#titlelang)

#### Defined in

[types-dev/objects.d.ts:780](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L780)

***

### type?

> `optional` **type**: `"hardware"` \| `"alarm"` \| `"climate-control"` \| `"communication"` \| `"date-and-time"` \| `"energy"` \| `"garden"` \| `"general"` \| `"geoposition"` \| `"health"` \| `"household"` \| `"infrastructure"` \| `"iot-systems"` \| `"lighting"` \| `"logic"` \| `"messaging"` \| `"metering"` \| `"misc-data"` \| `"multimedia"` \| `"network"` \| `"protocols"` \| `"storage"` \| `"utility"` \| `"vehicle"` \| `"visualization"` \| `"visualization-icons"` \| `"visualization-widgets"` \| `"weather"`

The type of this adapter

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`type`](AdapterCommon.md#type-1)

#### Defined in

[types-dev/objects.d.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L784)

***

### unsafePerm?

> `optional` **unsafePerm**: `true`

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`unsafePerm`](AdapterCommon.md#unsafeperm)

#### Defined in

[types-dev/objects.d.ts:814](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L814)

***

### version

> **version**: `string`

The available version in the ioBroker repo.

#### Overrides

[`AdapterCommon`](AdapterCommon.md).[`version`](AdapterCommon.md#version)

#### Defined in

[types-dev/objects.d.ts:359](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L359)

***

### visIconSets?

> `optional` **visIconSets**: `Record`\<`string`, [`VisIconSet`](VisIconSet.md)\>

Definition of the vis-2 icon sets

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`visIconSets`](AdapterCommon.md#visiconsets)

#### Defined in

[types-dev/objects.d.ts:820](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L820)

***

### visWidgets?

> `optional` **visWidgets**: `Record`\<`string`, [`VisWidget`](VisWidget.md)\>

Definition of the vis-2 widgets

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`visWidgets`](AdapterCommon.md#viswidgets)

#### Defined in

[types-dev/objects.d.ts:818](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L818)

***

### webByVersion?

> `optional` **webByVersion**: `boolean`

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webByVersion`](AdapterCommon.md#webbyversion)

#### Defined in

[types-dev/objects.d.ts:822](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L822)

***

### webExtendable?

> `optional` **webExtendable**: `boolean`

Whether the web server in this adapter can be extended with plugin/extensions

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webExtendable`](AdapterCommon.md#webextendable)

#### Defined in

[types-dev/objects.d.ts:824](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L824)

***

### webExtension?

> `optional` **webExtension**: `string`

Relative path to a module that contains an extension for the web adapter. Use together with

#### See

native.webInstance to configure which instances this affects

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webExtension`](AdapterCommon.md#webextension)

#### Defined in

[types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L826)

***

### webPreSettings?

> `optional` **webPreSettings**: `Record`\<`string`, `any`\>

List of parameters that must be included in info.js by webServer adapter. (Example material: `"webPreSettings": { "materialBackground": "native.loadingBackground" }`). Web adapter uses this setting to create a customized info.js file to provide some essential settings for index.html file before the socket connection is established to provide e.g., background color of the loading screen.

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webPreSettings`](AdapterCommon.md#webpresettings)

#### Defined in

[types-dev/objects.d.ts:828](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L828)

***

### ~~webservers?~~

> `optional` **webservers**: `string`[]

#### Deprecated

(where is it necessary?) Array of web server's instances that should serve content from the adapter's www folder

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`webservers`](AdapterCommon.md#webservers)

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L830)

***

### ~~welcomeScreen?~~

> `optional` **welcomeScreen**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

#### Deprecated

(use localLinks) A list of pages that should be shown on the "web" index page

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`welcomeScreen`](AdapterCommon.md#welcomescreen)

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L832)

***

### ~~welcomeScreenPro?~~

> `optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

#### Deprecated

(use localLinks) A list of pages that should be shown on the ioBroker cloud index page

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`welcomeScreenPro`](AdapterCommon.md#welcomescreenpro)

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L834)

***

### ~~wwwDontUpload?~~

> `optional` **wwwDontUpload**: `boolean`

#### Deprecated

(rename the `www` folder in e.g. `adminWww`) If true, the `www` folder will be not uploaded into DB

#### Inherited from

[`AdapterCommon`](AdapterCommon.md).[`wwwDontUpload`](AdapterCommon.md#wwwdontupload)

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/2a759bcbd07aaabbf7206422d85040f1ac7712ec/packages/types-dev/objects.d.ts#L836)
