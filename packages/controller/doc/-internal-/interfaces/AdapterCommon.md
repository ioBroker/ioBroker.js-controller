[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterCommon

# Interface: AdapterCommon

Defined in: [types-dev/objects.d.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L655)

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Extended by

- [`InstanceCommon`](InstanceCommon.md)

## Properties

### adminColumns?

> `optional` **adminColumns?**: `string` \| (`string` \| [`CustomAdminColumn`](CustomAdminColumn.md))[]

Defined in: [types-dev/objects.d.ts:657](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L657)

Custom attributes to be shown in admin in the object browser

***

### adminTab?

> `optional` **adminTab?**: `object`

Defined in: [types-dev/objects.d.ts:661](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L661)

Settings for custom Admin Tabs

#### icon?

> `optional` **icon?**: `string`

Icon for the tab: a file name relative to the "admin" folder, a URL or a base64 data URL. If not set, the adapter icon is shown

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

Position in the admin menu: the built-in tabs use 1 to 120, a tab without order gets 200. 0 counts as not set. Once the user has sorted the menu, the stored order wins

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

***

### adminUI?

> `optional` **adminUI?**: [`AdminUi`](AdminUi.md)

Defined in: [types-dev/objects.d.ts:659](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L659)

Type of the admin UI

***

### allowInit?

> `optional` **allowInit?**: `boolean`

Defined in: [types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L690)

If the mode is `schedule`, start one time adapter by ioBroker start, or by the configuration changes

***

### automaticUpgrade?

> `optional` **automaticUpgrade?**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

Defined in: [types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L692)

If the adapter should be automatically upgraded and which version ranges are supported

***

### availableModes?

> `optional` **availableModes?**: [`InstanceMode`](../type-aliases/InstanceMode.md)[]

Defined in: [types-dev/objects.d.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L694)

Possible values for the instance mode (if more than one is possible)

***

### blockedVersions?

> `optional` **blockedVersions?**: `string`[]

Defined in: [types-dev/objects.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L696)

Array that lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

***

### blockly?

> `optional` **blockly?**: `boolean`

Defined in: [types-dev/objects.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L698)

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L183)

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

***

### compact?

> `optional` **compact?**: `boolean`

Defined in: [types-dev/objects.d.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L702)

If true, this adapter can be started in compact mode (in the same process as other adapters)

***

### connectionType?

> `optional` **connectionType?**: [`ConnectionType`](../type-aliases/ConnectionType.md)

Defined in: [types-dev/objects.d.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L700)

Where the adapter will get its data from. Set this together with [dataSource](InstanceCommon.md#datasource)

***

### custom?

> `optional` **custom?**: `undefined`

Defined in: [types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L916)

***

### dataFolder?

> `optional` **dataFolder?**: `string`

Defined in: [types-dev/objects.d.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L704)

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

***

### dataSource?

> `optional` **dataSource?**: `"push"` \| `"poll"` \| `"assumption"`

Defined in: [types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L706)

How the adapter will mainly receive its data. Set this together with [connectionType](InstanceCommon.md#connectiontype)

***

### declareUsedResources?

> `optional` **declareUsedResources?**: `boolean`

Defined in: [types-dev/objects.d.ts:862](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L862)

If `true`, the adapter declares the exclusive resources it occupies (serial ports, TCP/UDP ports, ...)
itself via `adapter.registerUsedResource(...)`. Set this when the occupied resources are not simply
the configured `native.port`.

If not set, js-controller maintains the registry for this adapter and derives the entries from the
instance's `native.port` / `native.bind`.

If `false`, the adapter does not declare any resources and js-controller does not derive any either,
so its instances have no entries in the registry. Use this when `native.port` is not a port the
adapter listens on, e.g. the port of the device it connects to.

***

### defaultObjectsWarnLimit?

> `optional` **defaultObjectsWarnLimit?**: `number`

Defined in: [types-dev/objects.d.ts:913](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L913)

Defines the default value for objectsWarnLimit,
which is the maximum number of objects that can be stored in the system.
If this limit is exceeded, a warning will be shown in the admin UI.
This is used to prevent performance issues caused by too many objects.
The system default is actually 5000

***

### dependencies?

> `optional` **dependencies?**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L708)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

***

### desc?

> `optional` **desc?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L175)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

***

### deviceWidgets?

> `optional` **deviceWidgets?**: [`DevicesWidgets`](DevicesWidgets.md)

Defined in: [types-dev/objects.d.ts:714](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L714)

Definition of the widgets for "devices" adapter

***

### docs?

> `optional` **docs?**: `Partial`\<`Record`\<[`Languages`](../type-aliases/Languages.md), `string` \| `string`[]\>\>

Defined in: [types-dev/objects.d.ts:716](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L716)

Which files outside the README.md have documentation for the adapter

***

### dontDelete?

> `optional` **dontDelete?**: `true`

Defined in: [types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L178)

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

***

### enabled

> **enabled**: `boolean`

Defined in: [types-dev/objects.d.ts:718](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L718)

Whether new instances should be enabled by default. *Should* be `false`!

***

### eraseOnUpload?

> `optional` **eraseOnUpload?**: `boolean`

Defined in: [types-dev/objects.d.ts:720](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L720)

If true, all previous data in the target directory (web) should be deleted before uploading

***

### expert?

> `optional` **expert?**: `true`

Defined in: [types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L181)

When set to true, this object is only visible when the expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

***

### extIcon?

> `optional` **extIcon?**: `string`

Defined in: [types-dev/objects.d.ts:722](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L722)

URL of an external icon that is shown for adapters that are not installed

***

### getHistory?

> `optional` **getHistory?**: `boolean`

Defined in: [types-dev/objects.d.ts:724](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L724)

Whether this adapter responds to `getHistory` messages

***

### globalDependencies?

> `optional` **globalDependencies?**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L710)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:726](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L726)

Filename of the local icon that is shown for installed adapters. Should be located in the `admin` directory

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

***

### ifInstalledDependencies?

> `optional` **ifInstalledDependencies?**: `object`

Defined in: [types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L712)

Similar to `dependencies`, but only checked if the specified adapter is already installed. If the adapter is not installed, the version check will pass

#### Index Signature

\[`adapterName`: `string`\]: `string`

***

### ignoreVersion?

> `optional` **ignoreVersion?**: `string`

Defined in: [types-dev/objects.d.ts:892](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L892)

If a specific update of this adapter should be ignored, specifies version number to be ignored

***

### install?

> `optional` **install?**: `boolean`

Defined in: [types-dev/objects.d.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L728)

The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one-time installation code.

***

### installedFrom?

> `optional` **installedFrom?**: [`InstalledFrom`](../type-aliases/InstalledFrom.md)

Defined in: [types-dev/objects.d.ts:730](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L730)

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

***

### installedVersion

> **installedVersion**: `string`

Defined in: [types-dev/objects.d.ts:732](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L732)

Shows which version of this adapter is installed

***

### javascriptRules?

> `optional` **javascriptRules?**: `object`

Defined in: [types-dev/objects.d.ts:896](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L896)

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

***

### keywords?

> `optional` **keywords?**: `string`[]

Defined in: [types-dev/objects.d.ts:734](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L734)

Keywords are used by search in admin. Do not write ioBroker here

***

### ~~license?~~

> `optional` **license?**: `string`

Defined in: [types-dev/objects.d.ts:886](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L886)

#### Deprecated

Use 'common.licenseInformation' instead

***

### licenseInformation?

> `optional` **licenseInformation?**: [`LicenseInformation`](../type-aliases/LicenseInformation.md)

Defined in: [types-dev/objects.d.ts:888](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L888)

An object representing information with the license details

***

### ~~localLink?~~

> `optional` **localLink?**: `string`

Defined in: [types-dev/objects.d.ts:738](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L738)

#### Deprecated

Use [localLinks](InstanceCommon.md#locallinks)

***

### localLinks?

> `optional` **localLinks?**: `Record`\<`string`, `string` \| [`LocalLink`](../type-aliases/LocalLink.md)\>

Defined in: [types-dev/objects.d.ts:736](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L736)

A dictionary of links to web services this adapter provides

***

### loglevel?

> `optional` **loglevel?**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/objects.d.ts:740](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L740)

Default log level for this adapter. It can be changed for every instance separately

***

### logTransporter?

> `optional` **logTransporter?**: `boolean`

Defined in: [types-dev/objects.d.ts:742](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L742)

Whether this adapter receives logs from other hosts and adapters (e.g., to store them somewhere)

***

### main?

> `optional` **main?**: `string`

Defined in: [types-dev/objects.d.ts:744](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L744)

Path to the start file of the adapter. Should be the same as in `package.json`

***

### ~~materialize~~

> **materialize**: `boolean`

Defined in: [types-dev/objects.d.ts:749](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L749)

#### Deprecated

Use adminUI with config = "materialize". But better use jsonConfig.json

***

### materializeTab?

> `optional` **materializeTab?**: `boolean`

Defined in: [types-dev/objects.d.ts:746](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L746)

Whether the admin tab is written in a materialized style. Required for Admin 3+

***

### ~~messagebox?~~

> `optional` **messagebox?**: `true`

Defined in: [types-dev/objects.d.ts:751](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L751)

#### Deprecated

Use [supportedMessages](InstanceCommon.md#supportedmessages) up from controller v5

***

### messages?

> `optional` **messages?**: [`MessageRule`](MessageRule.md)[]

Defined in: [types-dev/objects.d.ts:890](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L890)

Messages that will be shown (if the condition evaluates to true) by upgrade or installation

***

### mode

> **mode**: [`InstanceMode`](../type-aliases/InstanceMode.md)

Defined in: [types-dev/objects.d.ts:755](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L755)

Running mode: `none`, `daemon`, `schedule`, `once`, `extension`

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:757](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L757)

Name of the adapter (without leading `ioBroker.`)

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

***

### news?

> `optional` **news?**: `object`

Defined in: [types-dev/objects.d.ts:759](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L759)

News per version in i18n

#### Index Signature

\[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

***

### noConfig?

> `optional` **noConfig?**: `true`

Defined in: [types-dev/objects.d.ts:761](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L761)

If `true`, no configuration dialog will be shown

***

### nogit?

> `optional` **nogit?**: `true`

Defined in: [types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L767)

If `true`, manual installation from GitHub is not possible

***

### noIntro?

> `optional` **noIntro?**: `true`

Defined in: [types-dev/objects.d.ts:763](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L763)

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

***

### nondeletable?

> `optional` **nondeletable?**: `true`

Defined in: [types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L769)

If `true`, this adapter cannot be deleted or updated manually.

***

### noRepository?

> `optional` **noRepository?**: `true`

Defined in: [types-dev/objects.d.ts:765](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L765)

Set to `true` if the adapter is not available in the official ioBroker repositories.

***

### onlyWWW?

> `optional` **onlyWWW?**: `boolean`

Defined in: [types-dev/objects.d.ts:771](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L771)

If `true`, this "adapter" only contains HTML files and no main executable

***

### os?

> `optional` **os?**: `"linux"` \| `"darwin"` \| `"win32"` \| (`"linux"` \| `"darwin"` \| `"win32"`)[]

Defined in: [types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L782)

Which OSes this adapter supports

***

### osDependencies?

> `optional` **osDependencies?**: `object`

Defined in: [types-dev/objects.d.ts:773](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L773)

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

***

### platform

> **platform**: `"Javascript/Node.js"` \| `"Python"`

Defined in: [types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L789)

Language the adapter is written in. `Javascript/Node.js` is the default and covers
every existing adapter. `Python` makes the controller start the adapter from the
virtual environment maintained by the `py-controller` adapter instead of with
Node.js; `common.main` then points at the package's `__main__.py`.

***

### plugins?

> `optional` **plugins?**: `object`

Defined in: [types-dev/objects.d.ts:894](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L894)

Sentry and other plugins

#### Index Signature

\[`pluginName`: `string`\]: `Record`\<`string`, `any`\>

***

### preserveSettings?

> `optional` **preserveSettings?**: `string` \| `string`[]

Defined in: [types-dev/objects.d.ts:791](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L791)

The keys of common attributes (e.g. `history`) which are not deleted in a `setObject` call even if they are not present. Deletion must be done explicitly by setting them to `null`.

***

### readme?

> `optional` **readme?**: `string`

Defined in: [types-dev/objects.d.ts:793](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L793)

Url of the ReadMe file

***

### restartAdapters?

> `optional` **restartAdapters?**: `string`[]

Defined in: [types-dev/objects.d.ts:795](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L795)

Which adapters must be restarted after installing or updating this adapter.

***

### restartSchedule?

> `optional` **restartSchedule?**: `string`

Defined in: [types-dev/objects.d.ts:797](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L797)

CRON schedule to restart mode `daemon` adapters

***

### role?

> `optional` **role?**: `string`

Defined in: [types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L190)

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

***

### schedule?

> `optional` **schedule?**: `string`

Defined in: [types-dev/objects.d.ts:799](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L799)

If the adapter runs in `schedule` mode, this contains the CRON

***

### singleton?

> `optional` **singleton?**: `boolean`

Defined in: [types-dev/objects.d.ts:803](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L803)

Whether this adapter may only be installed once in the whole system

***

### singletonHost?

> `optional` **singletonHost?**: `boolean`

Defined in: [types-dev/objects.d.ts:801](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L801)

Whether this adapter may only be installed once per host

***

### stopBeforeUpdate?

> `optional` **stopBeforeUpdate?**: `boolean`

Defined in: [types-dev/objects.d.ts:805](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L805)

Whether the adapter must be stopped before an update

***

### stopTimeout?

> `optional` **stopTimeout?**: `number`

Defined in: [types-dev/objects.d.ts:807](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L807)

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

***

### subscribable?

> `optional` **subscribable?**: `boolean`

Defined in: [types-dev/objects.d.ts:809](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L809)

This adapter supports a special mode: if someone subscribes on its states, it starts to read them. It is done to save the bandwidth or load of the slave device

***

### supportCustoms?

> `optional` **supportCustoms?**: `boolean`

Defined in: [types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L811)

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

***

### supportedMessages?

> `optional` **supportedMessages?**: [`SupportedMessages`](SupportedMessages.md)

Defined in: [types-dev/objects.d.ts:753](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L753)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

***

### ~~supportStopInstance?~~

> `optional` **supportStopInstance?**: `boolean`

Defined in: [types-dev/objects.d.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L813)

#### Deprecated

Use [supportedMessages](InstanceCommon.md#supportedmessages) up from controller v5

***

### ~~title?~~

> `optional` **title?**: `string`

Defined in: [types-dev/objects.d.ts:817](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L817)

#### Deprecated

The name of this adapter to be shown in the admin UI. Use [titleLang](InstanceCommon.md#titlelang) instead.

***

### titleLang?

> `optional` **titleLang?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:815](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L815)

The translated names of this adapter to be shown in the admin UI

***

### type?

> `optional` **type?**: `"alarm"` \| `"climate-control"` \| `"communication"` \| `"date-and-time"` \| `"energy"` \| `"garden"` \| `"general"` \| `"geoposition"` \| `"hardware"` \| `"health"` \| `"household"` \| `"infrastructure"` \| `"iot-systems"` \| `"lighting"` \| `"logic"` \| `"messaging"` \| `"metering"` \| `"misc-data"` \| `"multimedia"` \| `"network"` \| `"protocols"` \| `"storage"` \| `"utility"` \| `"vehicle"` \| `"visualization"` \| `"visualization-icons"` \| `"visualization-widgets"` \| `"weather"`

Defined in: [types-dev/objects.d.ts:819](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L819)

The type of this adapter

***

### unsafePerm?

> `optional` **unsafePerm?**: `true`

Defined in: [types-dev/objects.d.ts:849](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L849)

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

***

### version

> **version**: `string`

Defined in: [types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L864)

The available version in the ioBroker repo.

***

### visIconSets?

> `optional` **visIconSets?**: `Record`\<`string`, [`VisIconSet`](VisIconSet.md)\>

Defined in: [types-dev/objects.d.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L868)

Definition of the vis-2 icon sets

***

### visWidgets?

> `optional` **visWidgets?**: `Record`\<`string`, [`VisWidget`](VisWidget.md)\>

Defined in: [types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L866)

Definition of the vis-2 widgets

***

### webByVersion?

> `optional` **webByVersion?**: `boolean`

Defined in: [types-dev/objects.d.ts:870](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L870)

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

***

### webExtendable?

> `optional` **webExtendable?**: `boolean`

Defined in: [types-dev/objects.d.ts:872](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L872)

Whether the web server in this adapter can be extended with plugin/extensions

***

### webExtension?

> `optional` **webExtension?**: `string`

Defined in: [types-dev/objects.d.ts:874](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L874)

Relative path to a module that contains an extension for the web adapter. Use together with native.webInstance to configure which instances this affects

***

### webPreSettings?

> `optional` **webPreSettings?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:876](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L876)

List of parameters that must be included in info.js by webServer adapter. (Example material: `"webPreSettings": { "materialBackground": "native.loadingBackground" }`). Web adapter uses this setting to create a customized info.js file to provide some essential settings for the index.html file before the socket connection is established to provide e.g., background color of the loading screen.

***

### ~~webservers?~~

> `optional` **webservers?**: `string`[]

Defined in: [types-dev/objects.d.ts:878](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L878)

#### Deprecated

(where is it necessary?) Array of web server's instances that should serve content from the adapter's www folder

***

### ~~welcomeScreen?~~

> `optional` **welcomeScreen?**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

Defined in: [types-dev/objects.d.ts:880](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L880)

#### Deprecated

(use localLinks) A list of pages that should be shown on the "web" index page

***

### ~~welcomeScreenPro?~~

> `optional` **welcomeScreenPro?**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

Defined in: [types-dev/objects.d.ts:882](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L882)

#### Deprecated

(use localLinks) A list of pages that should be shown on the ioBroker cloud index page

***

### ~~wwwDontUpload?~~

> `optional` **wwwDontUpload?**: `boolean`

Defined in: [types-dev/objects.d.ts:884](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L884)

#### Deprecated

(rename the `www` folder in e.g. `adminWww`) If true, the `www` folder will be not uploaded into DB
