[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterCommon

# Interface: AdapterCommon

Defined in: [types-dev/objects.d.ts:626](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L626)

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Extended by

- [`InstanceCommon`](InstanceCommon.md)

## Properties

### adminColumns?

> `optional` **adminColumns?**: `string` \| (`string` \| [`CustomAdminColumn`](CustomAdminColumn.md))[]

Defined in: [types-dev/objects.d.ts:628](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L628)

Custom attributes to be shown in admin in the object browser

***

### adminTab?

> `optional` **adminTab?**: `object`

Defined in: [types-dev/objects.d.ts:632](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L632)

Settings for custom Admin Tabs

#### ~~fa-icon?~~

> `optional` **fa-icon?**: `string`

##### Deprecated

icon name for FontAwesome (works only in admin 4)

#### icon?

> `optional` **icon?**: `string`

Base 64 icon for the tab

#### ignoreConfigUpdate?

> `optional` **ignoreConfigUpdate?**: `boolean`

If true, the Tab is not reloaded when the configuration changes

#### link?

> `optional` **link?**: `string`

Describes which URL should be loaded in the tab. Supports placeholders like http://%ip%:%port% or JSON(5) configs. If empty `adapter/ADAPTERNAME/tab(_m).html` will be taken. JSON config file must be defined relative to "admin" folder, like "jsonTab.json"

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

***

### adminUI?

> `optional` **adminUI?**: [`AdminUi`](AdminUi.md)

Defined in: [types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L630)

Type of the admin UI

***

### allowInit?

> `optional` **allowInit?**: `boolean`

Defined in: [types-dev/objects.d.ts:663](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L663)

If the mode is `schedule`, start one time adapter by ioBroker start, or by the configuration changes

***

### automaticUpgrade?

> `optional` **automaticUpgrade?**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

Defined in: [types-dev/objects.d.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L665)

If the adapter should be automatically upgraded and which version ranges are supported

***

### availableModes?

> `optional` **availableModes?**: [`InstanceMode`](../type-aliases/InstanceMode.md)[]

Defined in: [types-dev/objects.d.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L667)

Possible values for the instance mode (if more than one is possible)

***

### blockedVersions?

> `optional` **blockedVersions?**: `string`[]

Defined in: [types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L669)

Array which lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

***

### blockly?

> `optional` **blockly?**: `boolean`

Defined in: [types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L671)

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

***

### color?

> `optional` **color?**: `string`

Defined in: [types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L183)

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

***

### compact?

> `optional` **compact?**: `boolean`

Defined in: [types-dev/objects.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L675)

If true, this adapter can be started in compact mode (in the same process as other adapters)

***

### connectionType?

> `optional` **connectionType?**: [`ConnectionType`](../type-aliases/ConnectionType.md)

Defined in: [types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L673)

Where the adapter will get its data from. Set this together with

#### See

dataSource

***

### custom?

> `optional` **custom?**: `undefined`

Defined in: [types-dev/objects.d.ts:860](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L860)

***

### dataFolder?

> `optional` **dataFolder?**: `string`

Defined in: [types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L677)

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

***

### dataSource?

> `optional` **dataSource?**: `"push"` \| `"poll"` \| `"assumption"`

Defined in: [types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L679)

How the adapter will mainly receive its data. Set this together with

#### See

connectionType

***

### dependencies?

> `optional` **dependencies?**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L681)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

***

### desc?

> `optional` **desc?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L175)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

***

### docs?

> `optional` **docs?**: `Partial`\<`Record`\<[`Languages`](../type-aliases/Languages.md), `string` \| `string`[]\>\>

Defined in: [types-dev/objects.d.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L687)

Which files outside the README.md have documentation for the adapter

***

### dontDelete?

> `optional` **dontDelete?**: `true`

Defined in: [types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L178)

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

***

### enabled

> **enabled**: `boolean`

Defined in: [types-dev/objects.d.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L689)

Whether new instances should be enabled by default. *Should* be `false`!

***

### eraseOnUpload?

> `optional` **eraseOnUpload?**: `boolean`

Defined in: [types-dev/objects.d.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L691)

If true, all previous data in the target directory (web) should be deleted before uploading

***

### expert?

> `optional` **expert?**: `true`

Defined in: [types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L181)

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

***

### extIcon?

> `optional` **extIcon?**: `string`

Defined in: [types-dev/objects.d.ts:693](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L693)

URL of an external icon that is shown for adapters that are not installed

***

### getHistory?

> `optional` **getHistory?**: `boolean`

Defined in: [types-dev/objects.d.ts:695](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L695)

Whether this adapter responds to `getHistory` messages

***

### globalDependencies?

> `optional` **globalDependencies?**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L683)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L697)

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

***

### ifInstalledDependencies?

> `optional` **ifInstalledDependencies?**: `object`

Defined in: [types-dev/objects.d.ts:685](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L685)

Similar to `dependencies`, but only checked if the specified adapter is already installed. If the adapter is not installed, the version check will pass

#### Index Signature

\[`adapterName`: `string`\]: `string`

***

### ignoreVersion?

> `optional` **ignoreVersion?**: `string`

Defined in: [types-dev/objects.d.ts:844](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L844)

If a specific update of this adapter should be ignored, specifies version number to be ignored

***

### install?

> `optional` **install?**: `boolean`

Defined in: [types-dev/objects.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L699)

The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one time installation code.

***

### installedFrom?

> `optional` **installedFrom?**: [`InstalledFrom`](../type-aliases/InstalledFrom.md)

Defined in: [types-dev/objects.d.ts:701](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L701)

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

***

### installedVersion

> **installedVersion**: `string`

Defined in: [types-dev/objects.d.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L703)

Shows which version of this adapter is installed

***

### javascriptRules?

> `optional` **javascriptRules?**: `object`

Defined in: [types-dev/objects.d.ts:848](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L848)

Rules blocks for JavaScript rules

#### i18n?

> `optional` **i18n?**: `boolean` \| `Record`\<`string`, `string`\> \| `Record`\<`string`, `Record`\<[`Languages`](../type-aliases/Languages.md), `string`\>\>

Translations

#### name

> **name**: `string`

Rules block name, like "ActionTelegram"

#### type?

> `optional` **type?**: `"module"`

Load it as TypeScript module

#### url

> **url**: `string`

Where to load the blocks, like "rules/customRuleBlocks.js"

***

### keywords?

> `optional` **keywords?**: `string`[]

Defined in: [types-dev/objects.d.ts:705](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L705)

Keywords are used by search in admin. Do not write ioBroker here

***

### ~~license?~~

> `optional` **license?**: `string`

Defined in: [types-dev/objects.d.ts:838](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L838)

#### Deprecated

Use 'common.licenseInformation' instead

***

### licenseInformation?

> `optional` **licenseInformation?**: [`LicenseInformation`](../type-aliases/LicenseInformation.md)

Defined in: [types-dev/objects.d.ts:840](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L840)

An object representing information with the license details

***

### ~~localLink?~~

> `optional` **localLink?**: `string`

Defined in: [types-dev/objects.d.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L709)

#### Deprecated

Use

#### See

localLinks

***

### localLinks?

> `optional` **localLinks?**: `Record`\<`string`, `string` \| [`LocalLink`](../type-aliases/LocalLink.md)\>

Defined in: [types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L707)

A dictionary of links to web services this adapter provides

***

### loglevel?

> `optional` **loglevel?**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [types-dev/objects.d.ts:711](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L711)

Default log level for this adapter. It can be changed for every instance separately

***

### logTransporter?

> `optional` **logTransporter?**: `boolean`

Defined in: [types-dev/objects.d.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L713)

Whether this adapter receives logs from other hosts and adapters (e.g., to store them somewhere)

***

### main?

> `optional` **main?**: `string`

Defined in: [types-dev/objects.d.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L715)

Path to the start file of the adapter. Should be the same as in `package.json`

***

### materialize

> **materialize**: `boolean`

Defined in: [types-dev/objects.d.ts:719](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L719)

Whether the admin configuration dialog is written in materialized style. Required for Admin 3+

***

### materializeTab?

> `optional` **materializeTab?**: `boolean`

Defined in: [types-dev/objects.d.ts:717](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L717)

Whether the admin tab is written in materialized style. Required for Admin 3+

***

### ~~messagebox?~~

> `optional` **messagebox?**: `true`

Defined in: [types-dev/objects.d.ts:721](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L721)

#### Deprecated

Use

#### See

supportedMessages up from controller v5

***

### messages?

> `optional` **messages?**: [`MessageRule`](MessageRule.md)[]

Defined in: [types-dev/objects.d.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L842)

Messages, that will be shown (if condition evaluates to true) by upgrade or installation

***

### mode

> **mode**: [`InstanceMode`](../type-aliases/InstanceMode.md)

Defined in: [types-dev/objects.d.ts:725](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L725)

Running mode: `none`, `daemon`, `schedule`, `once`, `extension`

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:727](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L727)

Name of the adapter (without leading `ioBroker.`)

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

***

### news?

> `optional` **news?**: `object`

Defined in: [types-dev/objects.d.ts:729](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L729)

News per version in i18n

#### Index Signature

\[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

***

### noConfig?

> `optional` **noConfig?**: `true`

Defined in: [types-dev/objects.d.ts:731](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L731)

If `true`, no configuration dialog will be shown

***

### nogit?

> `optional` **nogit?**: `true`

Defined in: [types-dev/objects.d.ts:737](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L737)

If `true`, manual installation from GitHub is not possible

***

### noIntro?

> `optional` **noIntro?**: `true`

Defined in: [types-dev/objects.d.ts:733](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L733)

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

***

### nondeletable?

> `optional` **nondeletable?**: `true`

Defined in: [types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L739)

If `true`, this adapter cannot be deleted or updated manually.

***

### noRepository?

> `optional` **noRepository?**: `true`

Defined in: [types-dev/objects.d.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L735)

Set to `true` if the adapter is not available in the official ioBroker repositories.

***

### onlyWWW?

> `optional` **onlyWWW?**: `boolean`

Defined in: [types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L741)

If `true`, this "adapter" only contains HTML files and no main executable

***

### os?

> `optional` **os?**: `"linux"` \| `"darwin"` \| `"win32"` \| (`"linux"` \| `"darwin"` \| `"win32"`)[]

Defined in: [types-dev/objects.d.ts:752](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L752)

Which OSes this adapter supports

***

### osDependencies?

> `optional` **osDependencies?**: `object`

Defined in: [types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L743)

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

***

### platform

> **platform**: `"Javascript/Node.js"`

Defined in: [types-dev/objects.d.ts:754](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L754)

Constant

***

### plugins?

> `optional` **plugins?**: `object`

Defined in: [types-dev/objects.d.ts:846](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L846)

Sentry and other plugins

#### Index Signature

\[`pluginName`: `string`\]: `Record`\<`string`, `any`\>

***

### preserveSettings?

> `optional` **preserveSettings?**: `string` \| `string`[]

Defined in: [types-dev/objects.d.ts:756](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L756)

The keys of common attributes (e.g. `history`) which are not deleted in a `setObject` call even if they are not present. Deletion must be done explicitly by setting them to `null`.

***

### readme?

> `optional` **readme?**: `string`

Defined in: [types-dev/objects.d.ts:758](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L758)

Url of the ReadMe file

***

### restartAdapters?

> `optional` **restartAdapters?**: `string`[]

Defined in: [types-dev/objects.d.ts:760](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L760)

Which adapters must be restarted after installing or updating this adapter.

***

### restartSchedule?

> `optional` **restartSchedule?**: `string`

Defined in: [types-dev/objects.d.ts:762](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L762)

CRON schedule to restart mode `daemon` adapters

***

### role?

> `optional` **role?**: `string`

Defined in: [types-dev/objects.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L190)

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

***

### schedule?

> `optional` **schedule?**: `string`

Defined in: [types-dev/objects.d.ts:764](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L764)

If the adapter runs in `schedule` mode, this contains the CRON

***

### singleton?

> `optional` **singleton?**: `boolean`

Defined in: [types-dev/objects.d.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L768)

Whether this adapter may only be installed once in the whole system

***

### singletonHost?

> `optional` **singletonHost?**: `boolean`

Defined in: [types-dev/objects.d.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L766)

Whether this adapter may only be installed once per host

***

### stopBeforeUpdate?

> `optional` **stopBeforeUpdate?**: `boolean`

Defined in: [types-dev/objects.d.ts:770](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L770)

Whether the adapter must be stopped before an update

***

### stopTimeout?

> `optional` **stopTimeout?**: `number`

Defined in: [types-dev/objects.d.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L772)

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

***

### subscribable?

> `optional` **subscribable?**: `boolean`

Defined in: [types-dev/objects.d.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L774)

This adapter supports a special mode: if someone subscribes on its states, it starts to read them. It is done to save the bandwidth or load of the slave device

***

### supportCustoms?

> `optional` **supportCustoms?**: `boolean`

Defined in: [types-dev/objects.d.ts:776](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L776)

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

***

### supportedMessages?

> `optional` **supportedMessages?**: [`SupportedMessages`](SupportedMessages.md)

Defined in: [types-dev/objects.d.ts:723](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L723)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

***

### ~~supportStopInstance?~~

> `optional` **supportStopInstance?**: `boolean`

Defined in: [types-dev/objects.d.ts:778](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L778)

#### Deprecated

Use

#### See

supportedMessages up from controller v5

***

### ~~title?~~

> `optional` **title?**: `string`

Defined in: [types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L782)

#### Deprecated

The name of this adapter to be shown in the admin UI. Use

#### See

titleLang instead.

***

### titleLang?

> `optional` **titleLang?**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Defined in: [types-dev/objects.d.ts:780](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L780)

The translated names of this adapter to be shown in the admin UI

***

### type?

> `optional` **type?**: `"hardware"` \| `"alarm"` \| `"climate-control"` \| `"communication"` \| `"date-and-time"` \| `"energy"` \| `"garden"` \| `"general"` \| `"geoposition"` \| `"health"` \| `"household"` \| `"infrastructure"` \| `"iot-systems"` \| `"lighting"` \| `"logic"` \| `"messaging"` \| `"metering"` \| `"misc-data"` \| `"multimedia"` \| `"network"` \| `"protocols"` \| `"storage"` \| `"utility"` \| `"vehicle"` \| `"visualization"` \| `"visualization-icons"` \| `"visualization-widgets"` \| `"weather"`

Defined in: [types-dev/objects.d.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L784)

The type of this adapter

***

### unsafePerm?

> `optional` **unsafePerm?**: `true`

Defined in: [types-dev/objects.d.ts:814](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L814)

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

***

### version

> **version**: `string`

Defined in: [types-dev/objects.d.ts:816](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L816)

The available version in the ioBroker repo.

***

### visIconSets?

> `optional` **visIconSets?**: `Record`\<`string`, [`VisIconSet`](VisIconSet.md)\>

Defined in: [types-dev/objects.d.ts:820](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L820)

Definition of the vis-2 icon sets

***

### visWidgets?

> `optional` **visWidgets?**: `Record`\<`string`, [`VisWidget`](VisWidget.md)\>

Defined in: [types-dev/objects.d.ts:818](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L818)

Definition of the vis-2 widgets

***

### webByVersion?

> `optional` **webByVersion?**: `boolean`

Defined in: [types-dev/objects.d.ts:822](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L822)

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

***

### webExtendable?

> `optional` **webExtendable?**: `boolean`

Defined in: [types-dev/objects.d.ts:824](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L824)

Whether the web server in this adapter can be extended with plugin/extensions

***

### webExtension?

> `optional` **webExtension?**: `string`

Defined in: [types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L826)

Relative path to a module that contains an extension for the web adapter. Use together with

#### See

native.webInstance to configure which instances this affects

***

### webPreSettings?

> `optional` **webPreSettings?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:828](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L828)

List of parameters that must be included in info.js by webServer adapter. (Example material: `"webPreSettings": { "materialBackground": "native.loadingBackground" }`). Web adapter uses this setting to create a customized info.js file to provide some essential settings for index.html file before the socket connection is established to provide e.g., background color of the loading screen.

***

### ~~webservers?~~

> `optional` **webservers?**: `string`[]

Defined in: [types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L830)

#### Deprecated

(where is it necessary?) Array of web server's instances that should serve content from the adapter's www folder

***

### ~~welcomeScreen?~~

> `optional` **welcomeScreen?**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

Defined in: [types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L832)

#### Deprecated

(use localLinks) A list of pages that should be shown on the "web" index page

***

### ~~welcomeScreenPro?~~

> `optional` **welcomeScreenPro?**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

Defined in: [types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L834)

#### Deprecated

(use localLinks) A list of pages that should be shown on the ioBroker cloud index page

***

### ~~wwwDontUpload?~~

> `optional` **wwwDontUpload?**: `boolean`

Defined in: [types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L836)

#### Deprecated

(rename the `www` folder in e.g. `adminWww`) If true, the `www` folder will be not uploaded into DB
