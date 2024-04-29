[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / InstanceCommon

# Interface: InstanceCommon

[\<internal\>](../modules/internal_.md).InstanceCommon

## Hierarchy

- [`AdapterCommon`](internal_.AdapterCommon.md)

  ↳ **`InstanceCommon`**

## Table of contents

### Properties

- [adminColumns](internal_.InstanceCommon.md#admincolumns)
- [adminTab](internal_.InstanceCommon.md#admintab)
- [adminUI](internal_.InstanceCommon.md#adminui)
- [allowInit](internal_.InstanceCommon.md#allowinit)
- [automaticUpgrade](internal_.InstanceCommon.md#automaticupgrade)
- [availableModes](internal_.InstanceCommon.md#availablemodes)
- [blockedVersions](internal_.InstanceCommon.md#blockedversions)
- [blockly](internal_.InstanceCommon.md#blockly)
- [color](internal_.InstanceCommon.md#color)
- [compact](internal_.InstanceCommon.md#compact)
- [compactGroup](internal_.InstanceCommon.md#compactgroup)
- [connectionType](internal_.InstanceCommon.md#connectiontype)
- [custom](internal_.InstanceCommon.md#custom)
- [dataFolder](internal_.InstanceCommon.md#datafolder)
- [dataSource](internal_.InstanceCommon.md#datasource)
- [dependencies](internal_.InstanceCommon.md#dependencies)
- [desc](internal_.InstanceCommon.md#desc)
- [docs](internal_.InstanceCommon.md#docs)
- [dontDelete](internal_.InstanceCommon.md#dontdelete)
- [enabled](internal_.InstanceCommon.md#enabled)
- [eraseOnUpload](internal_.InstanceCommon.md#eraseonupload)
- [expert](internal_.InstanceCommon.md#expert)
- [extIcon](internal_.InstanceCommon.md#exticon)
- [getHistory](internal_.InstanceCommon.md#gethistory)
- [globalDependencies](internal_.InstanceCommon.md#globaldependencies)
- [host](internal_.InstanceCommon.md#host)
- [icon](internal_.InstanceCommon.md#icon)
- [ignoreVersion](internal_.InstanceCommon.md#ignoreversion)
- [install](internal_.InstanceCommon.md#install)
- [installedFrom](internal_.InstanceCommon.md#installedfrom)
- [installedVersion](internal_.InstanceCommon.md#installedversion)
- [keywords](internal_.InstanceCommon.md#keywords)
- [license](internal_.InstanceCommon.md#license)
- [licenseInformation](internal_.InstanceCommon.md#licenseinformation)
- [localLink](internal_.InstanceCommon.md#locallink)
- [localLinks](internal_.InstanceCommon.md#locallinks)
- [logTransporter](internal_.InstanceCommon.md#logtransporter)
- [loglevel](internal_.InstanceCommon.md#loglevel)
- [main](internal_.InstanceCommon.md#main)
- [materialize](internal_.InstanceCommon.md#materialize)
- [materializeTab](internal_.InstanceCommon.md#materializetab)
- [memoryLimitMB](internal_.InstanceCommon.md#memorylimitmb)
- [messagebox](internal_.InstanceCommon.md#messagebox)
- [messages](internal_.InstanceCommon.md#messages)
- [mode](internal_.InstanceCommon.md#mode)
- [name](internal_.InstanceCommon.md#name)
- [news](internal_.InstanceCommon.md#news)
- [noConfig](internal_.InstanceCommon.md#noconfig)
- [noIntro](internal_.InstanceCommon.md#nointro)
- [noRepository](internal_.InstanceCommon.md#norepository)
- [nodeProcessParams](internal_.InstanceCommon.md#nodeprocessparams)
- [nogit](internal_.InstanceCommon.md#nogit)
- [nondeletable](internal_.InstanceCommon.md#nondeletable)
- [onlyWWW](internal_.InstanceCommon.md#onlywww)
- [os](internal_.InstanceCommon.md#os)
- [osDependencies](internal_.InstanceCommon.md#osdependencies)
- [platform](internal_.InstanceCommon.md#platform)
- [preserveSettings](internal_.InstanceCommon.md#preservesettings)
- [restartAdapters](internal_.InstanceCommon.md#restartadapters)
- [restartSchedule](internal_.InstanceCommon.md#restartschedule)
- [role](internal_.InstanceCommon.md#role)
- [runAsCompactMode](internal_.InstanceCommon.md#runascompactmode)
- [schedule](internal_.InstanceCommon.md#schedule)
- [serviceStates](internal_.InstanceCommon.md#servicestates)
- [singleton](internal_.InstanceCommon.md#singleton)
- [singletonHost](internal_.InstanceCommon.md#singletonhost)
- [stopBeforeUpdate](internal_.InstanceCommon.md#stopbeforeupdate)
- [stopTimeout](internal_.InstanceCommon.md#stoptimeout)
- [subscribable](internal_.InstanceCommon.md#subscribable)
- [supportCustoms](internal_.InstanceCommon.md#supportcustoms)
- [supportStopInstance](internal_.InstanceCommon.md#supportstopinstance)
- [supportedMessages](internal_.InstanceCommon.md#supportedmessages)
- [tier](internal_.InstanceCommon.md#tier)
- [title](internal_.InstanceCommon.md#title)
- [titleLang](internal_.InstanceCommon.md#titlelang)
- [type](internal_.InstanceCommon.md#type)
- [unsafePerm](internal_.InstanceCommon.md#unsafeperm)
- [version](internal_.InstanceCommon.md#version)
- [visWidgets](internal_.InstanceCommon.md#viswidgets)
- [webByVersion](internal_.InstanceCommon.md#webbyversion)
- [webExtendable](internal_.InstanceCommon.md#webextendable)
- [webExtension](internal_.InstanceCommon.md#webextension)
- [webPreSettings](internal_.InstanceCommon.md#webpresettings)
- [webservers](internal_.InstanceCommon.md#webservers)
- [welcomeScreen](internal_.InstanceCommon.md#welcomescreen)
- [welcomeScreenPro](internal_.InstanceCommon.md#welcomescreenpro)
- [wwwDontUpload](internal_.InstanceCommon.md#wwwdontupload)

## Properties

### adminColumns

• `Optional` **adminColumns**: `string` \| (`string` \| [`CustomAdminColumn`](internal_.CustomAdminColumn.md))[]

Custom attributes to be shown in admin in the object browser

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[adminColumns](internal_.AdapterCommon.md#admincolumns)

#### Defined in

[types-dev/objects.d.ts:568](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L568)

___

### adminTab

• `Optional` **adminTab**: `Object`

Settings for custom Admin Tabs

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fa-icon?` | `string` | Icon name for FontAwesome |
| `ignoreConfigUpdate?` | `boolean` | If true, the Tab is not reloaded when the configuration changes |
| `link?` | `string` | Which URL should be loaded in the tab. Supports placeholders like http://%ip%:%port% |
| `name?` | `string` | - |
| `singleton?` | `boolean` | If true, only one instance of this tab will be created for all instances |

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[adminTab](internal_.AdapterCommon.md#admintab)

#### Defined in

[types-dev/objects.d.ts:570](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L570)

___

### adminUI

• `Optional` **adminUI**: [`AdminUi`](internal_.AdminUi.md)

Type of the admin UI

#### Defined in

[types-dev/objects.d.ts:372](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L372)

___

### allowInit

• `Optional` **allowInit**: `boolean`

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[allowInit](internal_.AdapterCommon.md#allowinit)

#### Defined in

[types-dev/objects.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L581)

___

### automaticUpgrade

• `Optional` **automaticUpgrade**: [`AutoUpgradePolicy`](../modules/internal_.md#autoupgradepolicy)

If the adapter should be automatically upgraded and which version ranges are supported

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[automaticUpgrade](internal_.AdapterCommon.md#automaticupgrade)

#### Defined in

[types-dev/objects.d.ts:583](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L583)

___

### availableModes

• `Optional` **availableModes**: [`InstanceMode`](../modules/internal_.md#instancemode)[]

Possible values for the instance mode (if more than one is possible)

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[availableModes](internal_.AdapterCommon.md#availablemodes)

#### Defined in

[types-dev/objects.d.ts:585](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L585)

___

### blockedVersions

• `Optional` **blockedVersions**: `string`[]

Array which lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[blockedVersions](internal_.AdapterCommon.md#blockedversions)

#### Defined in

[types-dev/objects.d.ts:587](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L587)

___

### blockly

• `Optional` **blockly**: `boolean`

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[blockly](internal_.AdapterCommon.md#blockly)

#### Defined in

[types-dev/objects.d.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L589)

___

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[color](internal_.AdapterCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L178)

___

### compact

• `Optional` **compact**: `boolean`

If compact mode is supported

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[compact](internal_.AdapterCommon.md#compact)

#### Defined in

[types-dev/objects.d.ts:359](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L359)

___

### compactGroup

• `Optional` **compactGroup**: `number`

Active compact group, instances in this group will be started in one process

#### Defined in

[types-dev/objects.d.ts:363](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L363)

___

### connectionType

• `Optional` **connectionType**: ``"cloud"`` \| ``"local"``

Where the adapter will get its data from. Set this together with

**`See`**

dataSource

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[connectionType](internal_.AdapterCommon.md#connectiontype)

#### Defined in

[types-dev/objects.d.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L591)

___

### custom

• `Optional` **custom**: `undefined`

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[custom](internal_.AdapterCommon.md#custom)

#### Defined in

[types-dev/objects.d.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L377)

___

### dataFolder

• `Optional` **dataFolder**: `string`

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[dataFolder](internal_.AdapterCommon.md#datafolder)

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L595)

___

### dataSource

• `Optional` **dataSource**: ``"push"`` \| ``"poll"`` \| ``"assumption"``

How the adapter will mainly receive its data. Set this together with

**`See`**

connectionType

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[dataSource](internal_.AdapterCommon.md#datasource)

#### Defined in

[types-dev/objects.d.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L597)

___

### dependencies

• `Optional` **dependencies**: `Record`\<`string`, `string`\>[]

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[dependencies](internal_.AdapterCommon.md#dependencies)

#### Defined in

[types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L599)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[desc](internal_.AdapterCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L170)

___

### docs

• `Optional` **docs**: `Partial`\<`Record`\<[`Languages`](../modules/internal_.md#languages), `string` \| `string`[]\>\>

Which files outside the README.md have documentation for the adapter

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[docs](internal_.AdapterCommon.md#docs)

#### Defined in

[types-dev/objects.d.ts:603](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L603)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[dontDelete](internal_.AdapterCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L173)

___

### enabled

• **enabled**: `boolean`

Whether new instances should be enabled by default. *Should* be `false`!

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[enabled](internal_.AdapterCommon.md#enabled)

#### Defined in

[types-dev/objects.d.ts:346](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L346)

___

### eraseOnUpload

• `Optional` **eraseOnUpload**: `boolean`

If true, all previous data in the target directory (web) should be deleted before uploading

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[eraseOnUpload](internal_.AdapterCommon.md#eraseonupload)

#### Defined in

[types-dev/objects.d.ts:607](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L607)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[expert](internal_.AdapterCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:176](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L176)

___

### extIcon

• `Optional` **extIcon**: `string`

URL of an external icon that is shown for adapters that are not installed

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[extIcon](internal_.AdapterCommon.md#exticon)

#### Defined in

[types-dev/objects.d.ts:609](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L609)

___

### getHistory

• `Optional` **getHistory**: `boolean`

Whether this adapter responds to `getHistory` messages

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[getHistory](internal_.AdapterCommon.md#gethistory)

#### Defined in

[types-dev/objects.d.ts:611](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L611)

___

### globalDependencies

• `Optional` **globalDependencies**: `Record`\<`string`, `string`\>[]

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[globalDependencies](internal_.AdapterCommon.md#globaldependencies)

#### Defined in

[types-dev/objects.d.ts:601](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L601)

___

### host

• **host**: `string`

The name of the host where this instance is running

#### Defined in

[types-dev/objects.d.ts:345](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L345)

___

### icon

• `Optional` **icon**: `string`

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[icon](internal_.AdapterCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L613)

___

### ignoreVersion

• `Optional` **ignoreVersion**: `string`

If specific update of this adapter should be ignored, specifies version number to be ignored

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[ignoreVersion](internal_.AdapterCommon.md#ignoreversion)

#### Defined in

[types-dev/objects.d.ts:720](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L720)

___

### install

• `Optional` **install**: `boolean`

The adapter will be executed once additionally after installation and the `install` event will be emitted during this run. This allows for executing one time installation code.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[install](internal_.AdapterCommon.md#install)

#### Defined in

[types-dev/objects.d.ts:615](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L615)

___

### installedFrom

• `Optional` **installedFrom**: `string`

Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[installedFrom](internal_.AdapterCommon.md#installedfrom)

#### Defined in

[types-dev/objects.d.ts:366](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L366)

___

### installedVersion

• **installedVersion**: `string`

Which version of this adapter is installed

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[installedVersion](internal_.AdapterCommon.md#installedversion)

#### Defined in

[types-dev/objects.d.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L619)

___

### keywords

• `Optional` **keywords**: `string`[]

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[keywords](internal_.AdapterCommon.md#keywords)

#### Defined in

[types-dev/objects.d.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L620)

___

### license

• `Optional` **license**: `string`

**`Deprecated`**

Use 'common.licenseInformation' instead

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[license](internal_.AdapterCommon.md#license)

#### Defined in

[types-dev/objects.d.ts:714](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L714)

___

### licenseInformation

• `Optional` **licenseInformation**: [`LicenseInformation`](../modules/internal_.md#licenseinformation)

An object representing information with the license details

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[licenseInformation](internal_.AdapterCommon.md#licenseinformation)

#### Defined in

[types-dev/objects.d.ts:716](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L716)

___

### localLink

• `Optional` **localLink**: `string`

**`Deprecated`**

Use

**`See`**

localLinks

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[localLink](internal_.AdapterCommon.md#locallink)

#### Defined in

[types-dev/objects.d.ts:624](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L624)

___

### localLinks

• `Optional` **localLinks**: `Record`\<`string`, `string`\>

A dictionary of links to web services this adapter provides

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[localLinks](internal_.AdapterCommon.md#locallinks)

#### Defined in

[types-dev/objects.d.ts:622](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L622)

___

### logTransporter

• `Optional` **logTransporter**: `boolean`

If adapter can consume log messages, like admin, javascript or logparser

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[logTransporter](internal_.AdapterCommon.md#logtransporter)

#### Defined in

[types-dev/objects.d.ts:370](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L370)

___

### loglevel

• `Optional` **loglevel**: [`LogLevel`](../modules/internal_.md#loglevel)

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[loglevel](internal_.AdapterCommon.md#loglevel)

#### Defined in

[types-dev/objects.d.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L625)

___

### main

• `Optional` **main**: `string`

Path to the start file of the adapter. Should be the same as in `package.json`

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[main](internal_.AdapterCommon.md#main)

#### Defined in

[types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L629)

___

### materialize

• **materialize**: `boolean`

Whether the admin configuration dialog is written in materialize style. Required for Admin 3+

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[materialize](internal_.AdapterCommon.md#materialize)

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L633)

___

### materializeTab

• `Optional` **materializeTab**: `boolean`

Whether the admin tab is written in materialize style. Required for Admin 3+

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[materializeTab](internal_.AdapterCommon.md#materializetab)

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L631)

___

### memoryLimitMB

• `Optional` **memoryLimitMB**: `number`

Optional memory limit for this instance

#### Defined in

[types-dev/objects.d.ts:374](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L374)

___

### messagebox

• `Optional` **messagebox**: ``true``

**`Deprecated`**

Use

**`See`**

supportedMessages up from controller v5

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[messagebox](internal_.AdapterCommon.md#messagebox)

#### Defined in

[types-dev/objects.d.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L635)

___

### messages

• `Optional` **messages**: [`MessageRule`](internal_.MessageRule.md)[]

Messages, that will be shown (if condition evaluates to true) by upgrade or installation

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[messages](internal_.AdapterCommon.md#messages)

#### Defined in

[types-dev/objects.d.ts:718](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L718)

___

### mode

• **mode**: [`InstanceMode`](../modules/internal_.md#instancemode)

How and when this instance should be started

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[mode](internal_.AdapterCommon.md#mode)

#### Defined in

[types-dev/objects.d.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L348)

___

### name

• **name**: `string`

Name of the adapter (without leading `ioBroker.`)

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[name](internal_.AdapterCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L640)

___

### news

• `Optional` **news**: `Record`\<`string`, `Record`\<`string`, [`Translated`](../modules/internal_.md#translated)\>\>

News per version in i18n

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[news](internal_.AdapterCommon.md#news)

#### Defined in

[types-dev/objects.d.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L642)

___

### noConfig

• `Optional` **noConfig**: ``true``

If `true`, no configuration dialog will be shown

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[noConfig](internal_.AdapterCommon.md#noconfig)

#### Defined in

[types-dev/objects.d.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L644)

___

### noIntro

• `Optional` **noIntro**: ``true``

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[noIntro](internal_.AdapterCommon.md#nointro)

#### Defined in

[types-dev/objects.d.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L646)

___

### noRepository

• `Optional` **noRepository**: ``true``

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[noRepository](internal_.AdapterCommon.md#norepository)

#### Defined in

[types-dev/objects.d.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L648)

___

### nodeProcessParams

• `Optional` **nodeProcessParams**: `string`[]

Arguments passed to the adapter process, this disables compact mode

#### Defined in

[types-dev/objects.d.ts:368](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L368)

___

### nogit

• `Optional` **nogit**: ``true``

If `true`, manual installation from GitHub is not possible

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[nogit](internal_.AdapterCommon.md#nogit)

#### Defined in

[types-dev/objects.d.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L650)

___

### nondeletable

• `Optional` **nondeletable**: ``true``

If `true`, this adapter cannot be deleted or updated manually.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[nondeletable](internal_.AdapterCommon.md#nondeletable)

#### Defined in

[types-dev/objects.d.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L652)

___

### onlyWWW

• `Optional` **onlyWWW**: `boolean`

If `true`, this "adapter" only contains HTML files and no main executable

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[onlyWWW](internal_.AdapterCommon.md#onlywww)

#### Defined in

[types-dev/objects.d.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L654)

___

### os

• `Optional` **os**: ``"linux"`` \| ``"darwin"`` \| ``"win32"`` \| (``"linux"`` \| ``"darwin"`` \| ``"win32"``)[]

Which OSes this adapter supports

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[os](internal_.AdapterCommon.md#os)

#### Defined in

[types-dev/objects.d.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L665)

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

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[osDependencies](internal_.AdapterCommon.md#osdependencies)

#### Defined in

[types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L656)

___

### platform

• **platform**: ``"Javascript/Node.js"``

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[platform](internal_.AdapterCommon.md#platform)

#### Defined in

[types-dev/objects.d.ts:666](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L666)

___

### preserveSettings

• `Optional` **preserveSettings**: `string` \| `string`[]

String (or array) with names of attributes in common of instance, which will not be deleted.

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[preserveSettings](internal_.AdapterCommon.md#preservesettings)

#### Defined in

[types-dev/objects.d.ts:365](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L365)

___

### restartAdapters

• `Optional` **restartAdapters**: `string`[]

Which adapters must be restarted after installing or updating this adapter.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[restartAdapters](internal_.AdapterCommon.md#restartadapters)

#### Defined in

[types-dev/objects.d.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L670)

___

### restartSchedule

• `Optional` **restartSchedule**: `string`

CRON schedule to restart mode `daemon` adapters

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[restartSchedule](internal_.AdapterCommon.md#restartschedule)

#### Defined in

[types-dev/objects.d.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L672)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[role](internal_.AdapterCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:185](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L185)

___

### runAsCompactMode

• `Optional` **runAsCompactMode**: `boolean`

If compact mode is active

#### Defined in

[types-dev/objects.d.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L361)

___

### schedule

• `Optional` **schedule**: `string`

If the adapter runs in `schedule` mode, this contains the CRON

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[schedule](internal_.AdapterCommon.md#schedule)

#### Defined in

[types-dev/objects.d.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L674)

___

### serviceStates

• `Optional` **serviceStates**: `string` \| `boolean`

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[serviceStates](internal_.AdapterCommon.md#servicestates)

#### Defined in

[types-dev/objects.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L675)

___

### singleton

• `Optional` **singleton**: `boolean`

Whether this adapter may only be installed once in the whole system

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[singleton](internal_.AdapterCommon.md#singleton)

#### Defined in

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L679)

___

### singletonHost

• `Optional` **singletonHost**: `boolean`

Whether this adapter may only be installed once per host

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[singletonHost](internal_.AdapterCommon.md#singletonhost)

#### Defined in

[types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L677)

___

### stopBeforeUpdate

• `Optional` **stopBeforeUpdate**: `boolean`

Whether the adapter must be stopped before an update

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[stopBeforeUpdate](internal_.AdapterCommon.md#stopbeforeupdate)

#### Defined in

[types-dev/objects.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L681)

___

### stopTimeout

• `Optional` **stopTimeout**: `number`

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[stopTimeout](internal_.AdapterCommon.md#stoptimeout)

#### Defined in

[types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L683)

___

### subscribable

• `Optional` **subscribable**: `boolean`

Variables of this adapter must be subscribed with sendTo to enable updates

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[subscribable](internal_.AdapterCommon.md#subscribable)

#### Defined in

[types-dev/objects.d.ts:357](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L357)

___

### supportCustoms

• `Optional` **supportCustoms**: `boolean`

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[supportCustoms](internal_.AdapterCommon.md#supportcustoms)

#### Defined in

[types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L686)

___

### supportStopInstance

• `Optional` **supportStopInstance**: `boolean`

**`Deprecated`**

Use

**`See`**

supportedMessages up from controller v5

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[supportStopInstance](internal_.AdapterCommon.md#supportstopinstance)

#### Defined in

[types-dev/objects.d.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L688)

___

### supportedMessages

• `Optional` **supportedMessages**: [`SupportedMessages`](internal_.SupportedMessages.md)

Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[supportedMessages](internal_.AdapterCommon.md#supportedmessages)

#### Defined in

[types-dev/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L637)

___

### tier

• `Optional` **tier**: ``2`` \| ``1`` \| ``3``

The starting priority of this adapter:
- **1:** Logic adapters
- **2:** Data providers
- **3:** All other adapters

#### Defined in

[types-dev/objects.d.ts:355](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L355)

___

### title

• `Optional` **title**: `string`

**`Deprecated`**

The name of this adapter to be shown in the admin UI. Use

**`See`**

titleLang instead.

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[title](internal_.AdapterCommon.md#title)

#### Defined in

[types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L692)

___

### titleLang

• `Optional` **titleLang**: `Record`\<[`Languages`](../modules/internal_.md#languages), `string`\>

The translated names of this adapter to be shown in the admin UI

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[titleLang](internal_.AdapterCommon.md#titlelang)

#### Defined in

[types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L690)

___

### type

• `Optional` **type**: `string`

The type of this adapter

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[type](internal_.AdapterCommon.md#type)

#### Defined in

[types-dev/objects.d.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L694)

___

### unsafePerm

• `Optional` **unsafePerm**: ``true``

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[unsafePerm](internal_.AdapterCommon.md#unsafeperm)

#### Defined in

[types-dev/objects.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L696)

___

### version

• **version**: `string`

The available version in the ioBroker repo.

#### Overrides

[AdapterCommon](internal_.AdapterCommon.md).[version](internal_.AdapterCommon.md#version)

#### Defined in

[types-dev/objects.d.ts:343](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L343)

___

### visWidgets

• `Optional` **visWidgets**: `Record`\<`string`, [`VisWidget`](internal_.VisWidget.md)\>

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[visWidgets](internal_.AdapterCommon.md#viswidgets)

#### Defined in

[types-dev/objects.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L699)

___

### webByVersion

• `Optional` **webByVersion**: `boolean`

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[webByVersion](internal_.AdapterCommon.md#webbyversion)

#### Defined in

[types-dev/objects.d.ts:701](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L701)

___

### webExtendable

• `Optional` **webExtendable**: `boolean`

Whether the web server in this adapter can be extended with plugin/extensions

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[webExtendable](internal_.AdapterCommon.md#webextendable)

#### Defined in

[types-dev/objects.d.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L703)

___

### webExtension

• `Optional` **webExtension**: `string`

Relative path to a module that contains an extension for the web adapter. Use together with

**`See`**

native.webInstance to configure which instances this affects

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[webExtension](internal_.AdapterCommon.md#webextension)

#### Defined in

[types-dev/objects.d.ts:705](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L705)

___

### webPreSettings

• `Optional` **webPreSettings**: `any`

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[webPreSettings](internal_.AdapterCommon.md#webpresettings)

#### Defined in

[types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L706)

___

### webservers

• `Optional` **webservers**: `any`

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[webservers](internal_.AdapterCommon.md#webservers)

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L707)

___

### welcomeScreen

• `Optional` **welcomeScreen**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

A list of pages that should be shown on the "web" index page

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[welcomeScreen](internal_.AdapterCommon.md#welcomescreen)

#### Defined in

[types-dev/objects.d.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L709)

___

### welcomeScreenPro

• `Optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

A list of pages that should be shown on the ioBroker cloud index page

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[welcomeScreenPro](internal_.AdapterCommon.md#welcomescreenpro)

#### Defined in

[types-dev/objects.d.ts:711](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L711)

___

### wwwDontUpload

• `Optional` **wwwDontUpload**: `boolean`

#### Inherited from

[AdapterCommon](internal_.AdapterCommon.md).[wwwDontUpload](internal_.AdapterCommon.md#wwwdontupload)

#### Defined in

[types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/12b5c7f4/packages/types-dev/objects.d.ts#L712)
