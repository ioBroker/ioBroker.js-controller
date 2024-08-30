[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AdapterCommon

# Interface: AdapterCommon

[\<internal\>](../modules/internal_.md).AdapterCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`AdapterCommon`**

  ↳↳ [`InstanceCommon`](internal_.InstanceCommon.md)

## Table of contents

### Properties

- [adminColumns](internal_.AdapterCommon.md#admincolumns)
- [adminTab](internal_.AdapterCommon.md#admintab)
- [allowInit](internal_.AdapterCommon.md#allowinit)
- [automaticUpgrade](internal_.AdapterCommon.md#automaticupgrade)
- [availableModes](internal_.AdapterCommon.md#availablemodes)
- [blockedVersions](internal_.AdapterCommon.md#blockedversions)
- [blockly](internal_.AdapterCommon.md#blockly)
- [color](internal_.AdapterCommon.md#color)
- [compact](internal_.AdapterCommon.md#compact)
- [connectionType](internal_.AdapterCommon.md#connectiontype)
- [custom](internal_.AdapterCommon.md#custom)
- [dataFolder](internal_.AdapterCommon.md#datafolder)
- [dataSource](internal_.AdapterCommon.md#datasource)
- [dependencies](internal_.AdapterCommon.md#dependencies)
- [desc](internal_.AdapterCommon.md#desc)
- [docs](internal_.AdapterCommon.md#docs)
- [dontDelete](internal_.AdapterCommon.md#dontdelete)
- [enabled](internal_.AdapterCommon.md#enabled)
- [eraseOnUpload](internal_.AdapterCommon.md#eraseonupload)
- [expert](internal_.AdapterCommon.md#expert)
- [extIcon](internal_.AdapterCommon.md#exticon)
- [getHistory](internal_.AdapterCommon.md#gethistory)
- [globalDependencies](internal_.AdapterCommon.md#globaldependencies)
- [icon](internal_.AdapterCommon.md#icon)
- [ignoreVersion](internal_.AdapterCommon.md#ignoreversion)
- [install](internal_.AdapterCommon.md#install)
- [installedFrom](internal_.AdapterCommon.md#installedfrom)
- [installedVersion](internal_.AdapterCommon.md#installedversion)
- [keywords](internal_.AdapterCommon.md#keywords)
- [license](internal_.AdapterCommon.md#license)
- [licenseInformation](internal_.AdapterCommon.md#licenseinformation)
- [localLink](internal_.AdapterCommon.md#locallink)
- [localLinks](internal_.AdapterCommon.md#locallinks)
- [logTransporter](internal_.AdapterCommon.md#logtransporter)
- [loglevel](internal_.AdapterCommon.md#loglevel)
- [main](internal_.AdapterCommon.md#main)
- [materialize](internal_.AdapterCommon.md#materialize)
- [materializeTab](internal_.AdapterCommon.md#materializetab)
- [messagebox](internal_.AdapterCommon.md#messagebox)
- [messages](internal_.AdapterCommon.md#messages)
- [mode](internal_.AdapterCommon.md#mode)
- [name](internal_.AdapterCommon.md#name)
- [news](internal_.AdapterCommon.md#news)
- [noConfig](internal_.AdapterCommon.md#noconfig)
- [noIntro](internal_.AdapterCommon.md#nointro)
- [noRepository](internal_.AdapterCommon.md#norepository)
- [nogit](internal_.AdapterCommon.md#nogit)
- [nondeletable](internal_.AdapterCommon.md#nondeletable)
- [onlyWWW](internal_.AdapterCommon.md#onlywww)
- [os](internal_.AdapterCommon.md#os)
- [osDependencies](internal_.AdapterCommon.md#osdependencies)
- [platform](internal_.AdapterCommon.md#platform)
- [plugins](internal_.AdapterCommon.md#plugins)
- [preserveSettings](internal_.AdapterCommon.md#preservesettings)
- [readme](internal_.AdapterCommon.md#readme)
- [restartAdapters](internal_.AdapterCommon.md#restartadapters)
- [restartSchedule](internal_.AdapterCommon.md#restartschedule)
- [role](internal_.AdapterCommon.md#role)
- [schedule](internal_.AdapterCommon.md#schedule)
- [serviceStates](internal_.AdapterCommon.md#servicestates)
- [singleton](internal_.AdapterCommon.md#singleton)
- [singletonHost](internal_.AdapterCommon.md#singletonhost)
- [stopBeforeUpdate](internal_.AdapterCommon.md#stopbeforeupdate)
- [stopTimeout](internal_.AdapterCommon.md#stoptimeout)
- [subscribable](internal_.AdapterCommon.md#subscribable)
- [supportCustoms](internal_.AdapterCommon.md#supportcustoms)
- [supportStopInstance](internal_.AdapterCommon.md#supportstopinstance)
- [supportedMessages](internal_.AdapterCommon.md#supportedmessages)
- [title](internal_.AdapterCommon.md#title)
- [titleLang](internal_.AdapterCommon.md#titlelang)
- [type](internal_.AdapterCommon.md#type)
- [unsafePerm](internal_.AdapterCommon.md#unsafeperm)
- [version](internal_.AdapterCommon.md#version)
- [visWidgets](internal_.AdapterCommon.md#viswidgets)
- [webByVersion](internal_.AdapterCommon.md#webbyversion)
- [webExtendable](internal_.AdapterCommon.md#webextendable)
- [webExtension](internal_.AdapterCommon.md#webextension)
- [webPreSettings](internal_.AdapterCommon.md#webpresettings)
- [webservers](internal_.AdapterCommon.md#webservers)
- [welcomeScreen](internal_.AdapterCommon.md#welcomescreen)
- [welcomeScreenPro](internal_.AdapterCommon.md#welcomescreenpro)
- [wwwDontUpload](internal_.AdapterCommon.md#wwwdontupload)

## Properties

### adminColumns

• `Optional` **adminColumns**: `string` \| (`string` \| [`CustomAdminColumn`](internal_.CustomAdminColumn.md))[]

Custom attributes to be shown in admin in the object browser

#### Defined in

[types-dev/objects.d.ts:600](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L600)

___

### adminTab

• `Optional` **adminTab**: `Object`

Settings for custom Admin Tabs

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fa-icon?` | `string` | **`Deprecated`** icon name for FontAwesome (works only in admin 4) |
| `icon?` | `string` | Base 64 icon for the tab |
| `ignoreConfigUpdate?` | `boolean` | If true, the Tab is not reloaded when the configuration changes |
| `link?` | `string` | Which URL should be loaded in the tab. Supports placeholders like http://%ip%:%port% |
| `name?` | [`StringOrTranslated`](../modules/internal_.md#stringortranslated) | - |
| `order?` | `number` | Order number in admin tabs |
| `singleton?` | `boolean` | If true, only one instance of this tab will be created for all instances |

#### Defined in

[types-dev/objects.d.ts:602](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L602)

___

### allowInit

• `Optional` **allowInit**: `boolean`

#### Defined in

[types-dev/objects.d.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L617)

___

### automaticUpgrade

• `Optional` **automaticUpgrade**: [`AutoUpgradePolicy`](../modules/internal_.md#autoupgradepolicy)

If the adapter should be automatically upgraded and which version ranges are supported

#### Defined in

[types-dev/objects.d.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L619)

___

### availableModes

• `Optional` **availableModes**: [`InstanceMode`](../modules/internal_.md#instancemode)[]

Possible values for the instance mode (if more than one is possible)

#### Defined in

[types-dev/objects.d.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L621)

___

### blockedVersions

• `Optional` **blockedVersions**: `string`[]

Array which lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

#### Defined in

[types-dev/objects.d.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L623)

___

### blockly

• `Optional` **blockly**: `boolean`

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Defined in

[types-dev/objects.d.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L625)

___

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[color](internal_.ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L179)

___

### compact

• `Optional` **compact**: `boolean`

If true, this adapter can be started in compact mode (in the same process as other adapters)

#### Defined in

[types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L629)

___

### connectionType

• `Optional` **connectionType**: [`ConnectionType`](../modules/internal_.md#connectiontype)

Where the adapter will get its data from. Set this together with

**`See`**

dataSource

#### Defined in

[types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L627)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:763](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L763)

___

### dataFolder

• `Optional` **dataFolder**: `string`

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L631)

___

### dataSource

• `Optional` **dataSource**: ``"push"`` \| ``"poll"`` \| ``"assumption"``

How the adapter will mainly receive its data. Set this together with

**`See`**

connectionType

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L633)

___

### dependencies

• `Optional` **dependencies**: `Record`\<`string`, `string`\>[]

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

#### Defined in

[types-dev/objects.d.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L635)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L171)

___

### docs

• `Optional` **docs**: `Partial`\<`Record`\<[`Languages`](../modules/internal_.md#languages), `string` \| `string`[]\>\>

Which files outside the README.md have documentation for the adapter

#### Defined in

[types-dev/objects.d.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L639)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L174)

___

### enabled

• **enabled**: `boolean`

Whether new instances should be enabled by default. *Should* be `false`!

#### Defined in

[types-dev/objects.d.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L641)

___

### eraseOnUpload

• `Optional` **eraseOnUpload**: `boolean`

If true, all previous data in the target directory (web) should be deleted before uploading

#### Defined in

[types-dev/objects.d.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L643)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L177)

___

### extIcon

• `Optional` **extIcon**: `string`

URL of an external icon that is shown for adapters that are not installed

#### Defined in

[types-dev/objects.d.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L645)

___

### getHistory

• `Optional` **getHistory**: `boolean`

Whether this adapter responds to `getHistory` messages

#### Defined in

[types-dev/objects.d.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L647)

___

### globalDependencies

• `Optional` **globalDependencies**: `Record`\<`string`, `string`\>[]

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

#### Defined in

[types-dev/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L637)

___

### icon

• `Optional` **icon**: `string`

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L649)

___

### ignoreVersion

• `Optional` **ignoreVersion**: `string`

If a specific update of this adapter should be ignored, specifies version number to be ignored

#### Defined in

[types-dev/objects.d.ts:758](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L758)

___

### install

• `Optional` **install**: `boolean`

The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one time installation code.

#### Defined in

[types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L651)

___

### installedFrom

• `Optional` **installedFrom**: [`InstalledFrom`](../modules/internal_.md#installedfrom)

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

#### Defined in

[types-dev/objects.d.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L653)

___

### installedVersion

• **installedVersion**: `string`

Which version of this adapter is installed

#### Defined in

[types-dev/objects.d.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L655)

___

### keywords

• `Optional` **keywords**: `string`[]

#### Defined in

[types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L656)

___

### license

• `Optional` **license**: `string`

**`Deprecated`**

Use 'common.licenseInformation' instead

#### Defined in

[types-dev/objects.d.ts:752](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L752)

___

### licenseInformation

• `Optional` **licenseInformation**: [`LicenseInformation`](../modules/internal_.md#licenseinformation)

An object representing information with the license details

#### Defined in

[types-dev/objects.d.ts:754](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L754)

___

### localLink

• `Optional` **localLink**: `string`

**`Deprecated`**

Use

**`See`**

localLinks

#### Defined in

[types-dev/objects.d.ts:660](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L660)

___

### localLinks

• `Optional` **localLinks**: `Record`\<`string`, `string` \| [`LocalLink`](../modules/internal_.md#locallink)\>

A dictionary of links to web services this adapter provides

#### Defined in

[types-dev/objects.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L658)

___

### logTransporter

• `Optional` **logTransporter**: `boolean`

Whether this adapter receives logs from other hosts and adapters (e.g., to store them somewhere)

#### Defined in

[types-dev/objects.d.ts:663](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L663)

___

### loglevel

• `Optional` **loglevel**: [`LogLevel`](../modules/internal_.md#loglevel)

#### Defined in

[types-dev/objects.d.ts:661](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L661)

___

### main

• `Optional` **main**: `string`

Path to the start file of the adapter. Should be the same as in `package.json`

#### Defined in

[types-dev/objects.d.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L665)

___

### materialize

• **materialize**: `boolean`

Whether the admin configuration dialog is written in materialized style. Required for Admin 3+

#### Defined in

[types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L669)

___

### materializeTab

• `Optional` **materializeTab**: `boolean`

Whether the admin tab is written in materialized style. Required for Admin 3+

#### Defined in

[types-dev/objects.d.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L667)

___

### messagebox

• `Optional` **messagebox**: ``true``

**`Deprecated`**

Use

**`See`**

supportedMessages up from controller v5

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L671)

___

### messages

• `Optional` **messages**: [`MessageRule`](internal_.MessageRule.md)[]

Messages, that will be shown (if condition evaluates to true) by upgrade or installation

#### Defined in

[types-dev/objects.d.ts:756](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L756)

___

### mode

• **mode**: [`InstanceMode`](../modules/internal_.md#instancemode)

#### Defined in

[types-dev/objects.d.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L674)

___

### name

• **name**: `string`

Name of the adapter (without leading `ioBroker.`)

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L676)

___

### news

• `Optional` **news**: `Object`

News per version in i18n

#### Index signature

▪ [version: `string`]: [`Translated`](../modules/internal_.md#translated)

#### Defined in

[types-dev/objects.d.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L678)

___

### noConfig

• `Optional` **noConfig**: ``true``

If `true`, no configuration dialog will be shown

#### Defined in

[types-dev/objects.d.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L680)

___

### noIntro

• `Optional` **noIntro**: ``true``

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Defined in

[types-dev/objects.d.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L682)

___

### noRepository

• `Optional` **noRepository**: ``true``

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Defined in

[types-dev/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L684)

___

### nogit

• `Optional` **nogit**: ``true``

If `true`, manual installation from GitHub is not possible

#### Defined in

[types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L686)

___

### nondeletable

• `Optional` **nondeletable**: ``true``

If `true`, this adapter cannot be deleted or updated manually.

#### Defined in

[types-dev/objects.d.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L688)

___

### onlyWWW

• `Optional` **onlyWWW**: `boolean`

If `true`, this "adapter" only contains HTML files and no main executable

#### Defined in

[types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L690)

___

### os

• `Optional` **os**: ``"linux"`` \| ``"darwin"`` \| ``"win32"`` \| (``"linux"`` \| ``"darwin"`` \| ``"win32"``)[]

Which OSes this adapter supports

#### Defined in

[types-dev/objects.d.ts:701](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L701)

___

### osDependencies

• `Optional` **osDependencies**: `Object`

Used to configure native (OS) dependencies of this adapter that need to be installed with system package manager before installing the adapter

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `darwin` | `string`[] | For OSX |
| `linux` | `string`[] | For Linux |
| `win32` | `string`[] | For Windows |

#### Defined in

[types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L692)

___

### platform

• **platform**: ``"Javascript/Node.js"``

#### Defined in

[types-dev/objects.d.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L702)

___

### plugins

• `Optional` **plugins**: `Object`

Sentry and other plugins

#### Index signature

▪ [pluginName: `string`]: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:760](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L760)

___

### preserveSettings

• `Optional` **preserveSettings**: `string` \| `string`[]

The keys of common attributes (e.g. `history`) which are not deleted in a `setObject` call even if they are not present. Deletion must be done explicitly by setting them to `null`.

#### Defined in

[types-dev/objects.d.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L704)

___

### readme

• `Optional` **readme**: `string`

Url of the ReadMe file

#### Defined in

[types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L706)

___

### restartAdapters

• `Optional` **restartAdapters**: `string`[]

Which adapters must be restarted after installing or updating this adapter.

#### Defined in

[types-dev/objects.d.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L708)

___

### restartSchedule

• `Optional` **restartSchedule**: `string`

CRON schedule to restart mode `daemon` adapters

#### Defined in

[types-dev/objects.d.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L710)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L186)

___

### schedule

• `Optional` **schedule**: `string`

If the adapter runs in `schedule` mode, this contains the CRON

#### Defined in

[types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L712)

___

### serviceStates

• `Optional` **serviceStates**: `string` \| `boolean`

#### Defined in

[types-dev/objects.d.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L713)

___

### singleton

• `Optional` **singleton**: `boolean`

Whether this adapter may only be installed once in the whole system

#### Defined in

[types-dev/objects.d.ts:717](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L717)

___

### singletonHost

• `Optional` **singletonHost**: `boolean`

Whether this adapter may only be installed once per host

#### Defined in

[types-dev/objects.d.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L715)

___

### stopBeforeUpdate

• `Optional` **stopBeforeUpdate**: `boolean`

Whether the adapter must be stopped before an update

#### Defined in

[types-dev/objects.d.ts:719](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L719)

___

### stopTimeout

• `Optional` **stopTimeout**: `number`

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Defined in

[types-dev/objects.d.ts:721](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L721)

___

### subscribable

• `Optional` **subscribable**: `boolean`

#### Defined in

[types-dev/objects.d.ts:722](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L722)

___

### supportCustoms

• `Optional` **supportCustoms**: `boolean`

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Defined in

[types-dev/objects.d.ts:724](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L724)

___

### supportStopInstance

• `Optional` **supportStopInstance**: `boolean`

**`Deprecated`**

Use

**`See`**

supportedMessages up from controller v5

#### Defined in

[types-dev/objects.d.ts:726](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L726)

___

### supportedMessages

• `Optional` **supportedMessages**: [`SupportedMessages`](internal_.SupportedMessages.md)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

#### Defined in

[types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L673)

___

### title

• `Optional` **title**: `string`

**`Deprecated`**

The name of this adapter to be shown in the admin UI. Use

**`See`**

titleLang instead.

#### Defined in

[types-dev/objects.d.ts:730](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L730)

___

### titleLang

• `Optional` **titleLang**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The translated names of this adapter to be shown in the admin UI

#### Defined in

[types-dev/objects.d.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L728)

___

### type

• `Optional` **type**: `string`

The type of this adapter

#### Defined in

[types-dev/objects.d.ts:732](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L732)

___

### unsafePerm

• `Optional` **unsafePerm**: ``true``

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Defined in

[types-dev/objects.d.ts:734](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L734)

___

### version

• **version**: `string`

The available version in the ioBroker repo.

#### Defined in

[types-dev/objects.d.ts:736](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L736)

___

### visWidgets

• `Optional` **visWidgets**: `Record`\<`string`, [`VisWidget`](internal_.VisWidget.md)\>

#### Defined in

[types-dev/objects.d.ts:737](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L737)

___

### webByVersion

• `Optional` **webByVersion**: `boolean`

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Defined in

[types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L739)

___

### webExtendable

• `Optional` **webExtendable**: `boolean`

Whether the web server in this adapter can be extended with plugin/extensions

#### Defined in

[types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L741)

___

### webExtension

• `Optional` **webExtension**: `string`

Relative path to a module that contains an extension for the web adapter. Use together with

**`See`**

native.webInstance to configure which instances this affects

#### Defined in

[types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L743)

___

### webPreSettings

• `Optional` **webPreSettings**: `any`

#### Defined in

[types-dev/objects.d.ts:744](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L744)

___

### webservers

• `Optional` **webservers**: `any`

#### Defined in

[types-dev/objects.d.ts:745](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L745)

___

### welcomeScreen

• `Optional` **welcomeScreen**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

**`Deprecated`**

(use localLinks) A list of pages that should be shown on the "web" index page

#### Defined in

[types-dev/objects.d.ts:747](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L747)

___

### welcomeScreenPro

• `Optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

**`Deprecated`**

(use localLinks) A list of pages that should be shown on the ioBroker cloud index page

#### Defined in

[types-dev/objects.d.ts:749](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L749)

___

### wwwDontUpload

• `Optional` **wwwDontUpload**: `boolean`

#### Defined in

[types-dev/objects.d.ts:750](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L750)
