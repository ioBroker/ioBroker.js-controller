[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterCommon

# Interface: AdapterCommon

## Extends

- [`ObjectCommon`](ObjectCommon.md)

## Extended by

- [`InstanceCommon`](InstanceCommon.md)

## Properties

### adminColumns?

> `optional` **adminColumns**: `string` \| (`string` \| [`CustomAdminColumn`](CustomAdminColumn.md))[]

Custom attributes to be shown in admin in the object browser

#### Defined in

[types-dev/objects.d.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L612)

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

#### Defined in

[types-dev/objects.d.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L616)

***

### adminUI?

> `optional` **adminUI**: [`AdminUi`](AdminUi.md)

Type of the admin UI

#### Defined in

[types-dev/objects.d.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L614)

***

### allowInit?

> `optional` **allowInit**: `boolean`

If the mode is `schedule`, start one time adapter by ioBroker start, or by the configuration changes

#### Defined in

[types-dev/objects.d.ts:632](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L632)

***

### automaticUpgrade?

> `optional` **automaticUpgrade**: [`AutoUpgradePolicy`](../type-aliases/AutoUpgradePolicy.md)

If the adapter should be automatically upgraded and which version ranges are supported

#### Defined in

[types-dev/objects.d.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L634)

***

### availableModes?

> `optional` **availableModes**: [`InstanceMode`](../type-aliases/InstanceMode.md)[]

Possible values for the instance mode (if more than one is possible)

#### Defined in

[types-dev/objects.d.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L636)

***

### blockedVersions?

> `optional` **blockedVersions**: `string`[]

Array which lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

#### Defined in

[types-dev/objects.d.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L638)

***

### blockly?

> `optional` **blockly**: `boolean`

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Defined in

[types-dev/objects.d.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L640)

***

### color?

> `optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`color`](ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L179)

***

### compact?

> `optional` **compact**: `boolean`

If true, this adapter can be started in compact mode (in the same process as other adapters)

#### Defined in

[types-dev/objects.d.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L644)

***

### connectionType?

> `optional` **connectionType**: [`ConnectionType`](../type-aliases/ConnectionType.md)

Where the adapter will get its data from. Set this together with

#### See

dataSource

#### Defined in

[types-dev/objects.d.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L642)

***

### custom?

> `optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:829](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L829)

***

### dataFolder?

> `optional` **dataFolder**: `string`

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Defined in

[types-dev/objects.d.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L646)

***

### dataSource?

> `optional` **dataSource**: `"push"` \| `"poll"` \| `"assumption"`

How the adapter will mainly receive its data. Set this together with

#### See

connectionType

#### Defined in

[types-dev/objects.d.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L648)

***

### dependencies?

> `optional` **dependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

#### Defined in

[types-dev/objects.d.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L650)

***

### desc?

> `optional` **desc**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

Description of this object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`desc`](ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L171)

***

### docs?

> `optional` **docs**: `Partial`\<`Record`\<[`Languages`](../type-aliases/Languages.md), `string` \| `string`[]\>\>

Which files outside the README.md have documentation for the adapter

#### Defined in

[types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L656)

***

### dontDelete?

> `optional` **dontDelete**: `true`

When set to true, this object may not be deleted

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`dontDelete`](ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L174)

***

### enabled

> **enabled**: `boolean`

Whether new instances should be enabled by default. *Should* be `false`!

#### Defined in

[types-dev/objects.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L658)

***

### eraseOnUpload?

> `optional` **eraseOnUpload**: `boolean`

If true, all previous data in the target directory (web) should be deleted before uploading

#### Defined in

[types-dev/objects.d.ts:660](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L660)

***

### expert?

> `optional` **expert**: `true`

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`expert`](ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L177)

***

### extIcon?

> `optional` **extIcon**: `string`

URL of an external icon that is shown for adapters that are not installed

#### Defined in

[types-dev/objects.d.ts:662](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L662)

***

### getHistory?

> `optional` **getHistory**: `boolean`

Whether this adapter responds to `getHistory` messages

#### Defined in

[types-dev/objects.d.ts:664](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L664)

***

### globalDependencies?

> `optional` **globalDependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

#### Defined in

[types-dev/objects.d.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L652)

***

### icon?

> `optional` **icon**: `string`

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`icon`](ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:666](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L666)

***

### ifInstalledDependencies?

> `optional` **ifInstalledDependencies**: `object`

Similar to `dependencies`, but only checked if the specified adapter is already installed. If the adapter is not installed, the version check will pass

#### Index Signature

 \[`adapterName`: `string`\]: `string`

#### Defined in

[types-dev/objects.d.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L654)

***

### ignoreVersion?

> `optional` **ignoreVersion**: `string`

If a specific update of this adapter should be ignored, specifies version number to be ignored

#### Defined in

[types-dev/objects.d.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L813)

***

### install?

> `optional` **install**: `boolean`

The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one time installation code.

#### Defined in

[types-dev/objects.d.ts:668](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L668)

***

### installedFrom?

> `optional` **installedFrom**: [`InstalledFrom`](../type-aliases/InstalledFrom.md)

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

#### Defined in

[types-dev/objects.d.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L670)

***

### installedVersion

> **installedVersion**: `string`

Shows which version of this adapter is installed

#### Defined in

[types-dev/objects.d.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L672)

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

#### Defined in

[types-dev/objects.d.ts:817](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L817)

***

### keywords?

> `optional` **keywords**: `string`[]

Keywords are used by search in admin. Do not write ioBroker here

#### Defined in

[types-dev/objects.d.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L674)

***

### ~~license?~~

> `optional` **license**: `string`

#### Deprecated

Use 'common.licenseInformation' instead

#### Defined in

[types-dev/objects.d.ts:807](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L807)

***

### licenseInformation?

> `optional` **licenseInformation**: [`LicenseInformation`](../type-aliases/LicenseInformation.md)

An object representing information with the license details

#### Defined in

[types-dev/objects.d.ts:809](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L809)

***

### ~~localLink?~~

> `optional` **localLink**: `string`

#### Deprecated

Use

#### See

localLinks

#### Defined in

[types-dev/objects.d.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L678)

***

### localLinks?

> `optional` **localLinks**: `Record`\<`string`, `string` \| [`LocalLink`](../type-aliases/LocalLink.md)\>

A dictionary of links to web services this adapter provides

#### Defined in

[types-dev/objects.d.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L676)

***

### loglevel?

> `optional` **loglevel**: [`LogLevel`](../type-aliases/LogLevel.md)

Default log level for this adapter. It can be changed for every instance separately

#### Defined in

[types-dev/objects.d.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L680)

***

### logTransporter?

> `optional` **logTransporter**: `boolean`

Whether this adapter receives logs from other hosts and adapters (e.g., to store them somewhere)

#### Defined in

[types-dev/objects.d.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L682)

***

### main?

> `optional` **main**: `string`

Path to the start file of the adapter. Should be the same as in `package.json`

#### Defined in

[types-dev/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L684)

***

### materialize

> **materialize**: `boolean`

Whether the admin configuration dialog is written in materialized style. Required for Admin 3+

#### Defined in

[types-dev/objects.d.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L688)

***

### materializeTab?

> `optional` **materializeTab**: `boolean`

Whether the admin tab is written in materialized style. Required for Admin 3+

#### Defined in

[types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L686)

***

### ~~messagebox?~~

> `optional` **messagebox**: `true`

#### Deprecated

Use

#### See

supportedMessages up from controller v5

#### Defined in

[types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L690)

***

### messages?

> `optional` **messages**: [`MessageRule`](MessageRule.md)[]

Messages, that will be shown (if condition evaluates to true) by upgrade or installation

#### Defined in

[types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L811)

***

### mode

> **mode**: [`InstanceMode`](../type-aliases/InstanceMode.md)

Running mode: `none`, `daemon`, `schedule`, `once`, `extension`

#### Defined in

[types-dev/objects.d.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L694)

***

### name

> **name**: `string`

Name of the adapter (without leading `ioBroker.`)

#### Overrides

[`ObjectCommon`](ObjectCommon.md).[`name`](ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L696)

***

### news?

> `optional` **news**: `object`

News per version in i18n

#### Index Signature

 \[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

#### Defined in

[types-dev/objects.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L698)

***

### noConfig?

> `optional` **noConfig**: `true`

If `true`, no configuration dialog will be shown

#### Defined in

[types-dev/objects.d.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L700)

***

### nogit?

> `optional` **nogit**: `true`

If `true`, manual installation from GitHub is not possible

#### Defined in

[types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L706)

***

### noIntro?

> `optional` **noIntro**: `true`

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Defined in

[types-dev/objects.d.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L702)

***

### nondeletable?

> `optional` **nondeletable**: `true`

If `true`, this adapter cannot be deleted or updated manually.

#### Defined in

[types-dev/objects.d.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L708)

***

### noRepository?

> `optional` **noRepository**: `true`

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Defined in

[types-dev/objects.d.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L704)

***

### onlyWWW?

> `optional` **onlyWWW**: `boolean`

If `true`, this "adapter" only contains HTML files and no main executable

#### Defined in

[types-dev/objects.d.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L710)

***

### os?

> `optional` **os**: `"linux"` \| `"darwin"` \| `"win32"` \| (`"linux"` \| `"darwin"` \| `"win32"`)[]

Which OSes this adapter supports

#### Defined in

[types-dev/objects.d.ts:721](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L721)

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

#### Defined in

[types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L712)

***

### platform

> **platform**: `"Javascript/Node.js"`

Constant

#### Defined in

[types-dev/objects.d.ts:723](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L723)

***

### plugins?

> `optional` **plugins**: `object`

Sentry and other plugins

#### Index Signature

 \[`pluginName`: `string`\]: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:815](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L815)

***

### preserveSettings?

> `optional` **preserveSettings**: `string` \| `string`[]

The keys of common attributes (e.g. `history`) which are not deleted in a `setObject` call even if they are not present. Deletion must be done explicitly by setting them to `null`.

#### Defined in

[types-dev/objects.d.ts:725](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L725)

***

### readme?

> `optional` **readme**: `string`

Url of the ReadMe file

#### Defined in

[types-dev/objects.d.ts:727](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L727)

***

### restartAdapters?

> `optional` **restartAdapters**: `string`[]

Which adapters must be restarted after installing or updating this adapter.

#### Defined in

[types-dev/objects.d.ts:729](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L729)

***

### restartSchedule?

> `optional` **restartSchedule**: `string`

CRON schedule to restart mode `daemon` adapters

#### Defined in

[types-dev/objects.d.ts:731](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L731)

***

### role?

> `optional` **role**: `string`

role of the object

#### Inherited from

[`ObjectCommon`](ObjectCommon.md).[`role`](ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L186)

***

### schedule?

> `optional` **schedule**: `string`

If the adapter runs in `schedule` mode, this contains the CRON

#### Defined in

[types-dev/objects.d.ts:733](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L733)

***

### singleton?

> `optional` **singleton**: `boolean`

Whether this adapter may only be installed once in the whole system

#### Defined in

[types-dev/objects.d.ts:737](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L737)

***

### singletonHost?

> `optional` **singletonHost**: `boolean`

Whether this adapter may only be installed once per host

#### Defined in

[types-dev/objects.d.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L735)

***

### stopBeforeUpdate?

> `optional` **stopBeforeUpdate**: `boolean`

Whether the adapter must be stopped before an update

#### Defined in

[types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L739)

***

### stopTimeout?

> `optional` **stopTimeout**: `number`

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Defined in

[types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L741)

***

### subscribable?

> `optional` **subscribable**: `boolean`

This adapter supports a special mode: if someone subscribes on its states, it starts to read them. It is done to save the bandwidth or load of the slave device

#### Defined in

[types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L743)

***

### supportCustoms?

> `optional` **supportCustoms**: `boolean`

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Defined in

[types-dev/objects.d.ts:745](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L745)

***

### supportedMessages?

> `optional` **supportedMessages**: [`SupportedMessages`](SupportedMessages.md)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

#### Defined in

[types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L692)

***

### ~~supportStopInstance?~~

> `optional` **supportStopInstance**: `boolean`

#### Deprecated

Use

#### See

supportedMessages up from controller v5

#### Defined in

[types-dev/objects.d.ts:747](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L747)

***

### ~~title?~~

> `optional` **title**: `string`

#### Deprecated

The name of this adapter to be shown in the admin UI. Use

#### See

titleLang instead.

#### Defined in

[types-dev/objects.d.ts:751](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L751)

***

### titleLang?

> `optional` **titleLang**: [`StringOrTranslated`](../type-aliases/StringOrTranslated.md)

The translated names of this adapter to be shown in the admin UI

#### Defined in

[types-dev/objects.d.ts:749](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L749)

***

### type?

> `optional` **type**: `"hardware"` \| `"alarm"` \| `"climate-control"` \| `"communication"` \| `"date-and-time"` \| `"energy"` \| `"garden"` \| `"general"` \| `"geoposition"` \| `"health"` \| `"household"` \| `"infrastructure"` \| `"iot-systems"` \| `"lighting"` \| `"logic"` \| `"messaging"` \| `"metering"` \| `"misc-data"` \| `"multimedia"` \| `"network"` \| `"protocols"` \| `"storage"` \| `"utility"` \| `"vehicle"` \| `"visualization"` \| `"visualization-icons"` \| `"visualization-widgets"` \| `"weather"`

The type of this adapter

#### Defined in

[types-dev/objects.d.ts:753](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L753)

***

### unsafePerm?

> `optional` **unsafePerm**: `true`

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Defined in

[types-dev/objects.d.ts:783](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L783)

***

### version

> **version**: `string`

The available version in the ioBroker repo.

#### Defined in

[types-dev/objects.d.ts:785](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L785)

***

### visIconSets?

> `optional` **visIconSets**: `Record`\<`string`, [`VisIconSet`](VisIconSet.md)\>

Definition of the vis-2 icon sets

#### Defined in

[types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L789)

***

### visWidgets?

> `optional` **visWidgets**: `Record`\<`string`, [`VisWidget`](VisWidget.md)\>

Definition of the vis-2 widgets

#### Defined in

[types-dev/objects.d.ts:787](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L787)

***

### webByVersion?

> `optional` **webByVersion**: `boolean`

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Defined in

[types-dev/objects.d.ts:791](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L791)

***

### webExtendable?

> `optional` **webExtendable**: `boolean`

Whether the web server in this adapter can be extended with plugin/extensions

#### Defined in

[types-dev/objects.d.ts:793](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L793)

***

### webExtension?

> `optional` **webExtension**: `string`

Relative path to a module that contains an extension for the web adapter. Use together with

#### See

native.webInstance to configure which instances this affects

#### Defined in

[types-dev/objects.d.ts:795](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L795)

***

### webPreSettings?

> `optional` **webPreSettings**: `Record`\<`string`, `any`\>

List of parameters that must be included in info.js by webServer adapter. (Example material: `"webPreSettings": { "materialBackground": "native.loadingBackground" }`). Web adapter uses this setting to create a customized info.js file to provide some essential settings for index.html file before the socket connection is established to provide e.g., background color of the loading screen.

#### Defined in

[types-dev/objects.d.ts:797](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L797)

***

### ~~webservers?~~

> `optional` **webservers**: `string`[]

#### Deprecated

(where is it necessary?) Array of web server's instances that should serve content from the adapter's www folder

#### Defined in

[types-dev/objects.d.ts:799](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L799)

***

### ~~welcomeScreen?~~

> `optional` **welcomeScreen**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

#### Deprecated

(use localLinks) A list of pages that should be shown on the "web" index page

#### Defined in

[types-dev/objects.d.ts:801](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L801)

***

### ~~welcomeScreenPro?~~

> `optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../type-aliases/WelcomeScreenEntry.md)[]

#### Deprecated

(use localLinks) A list of pages that should be shown on the ioBroker cloud index page

#### Defined in

[types-dev/objects.d.ts:803](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L803)

***

### ~~wwwDontUpload?~~

> `optional` **wwwDontUpload**: `boolean`

#### Deprecated

(rename the `www` folder in e.g. `adminWww`) If true, the `www` folder will be not uploaded into DB

#### Defined in

[types-dev/objects.d.ts:805](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L805)
