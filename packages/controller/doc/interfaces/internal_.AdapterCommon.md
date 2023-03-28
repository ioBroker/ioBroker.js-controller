[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / AdapterCommon

# Interface: AdapterCommon

[<internal>](../modules/internal_.md).AdapterCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`AdapterCommon`**

## Table of contents

### Properties

- [adminColumns](internal_.AdapterCommon.md#admincolumns)
- [adminTab](internal_.AdapterCommon.md#admintab)
- [allowInit](internal_.AdapterCommon.md#allowinit)
- [availableModes](internal_.AdapterCommon.md#availablemodes)
- [blockly](internal_.AdapterCommon.md#blockly)
- [compact](internal_.AdapterCommon.md#compact)
- [connectionType](internal_.AdapterCommon.md#connectiontype)
- [custom](internal_.AdapterCommon.md#custom)
- [dataFolder](internal_.AdapterCommon.md#datafolder)
- [dataSource](internal_.AdapterCommon.md#datasource)
- [dependencies](internal_.AdapterCommon.md#dependencies)
- [docs](internal_.AdapterCommon.md#docs)
- [dontDelete](internal_.AdapterCommon.md#dontdelete)
- [enabled](internal_.AdapterCommon.md#enabled)
- [eraseOnUpload](internal_.AdapterCommon.md#eraseonupload)
- [expert](internal_.AdapterCommon.md#expert)
- [extIcon](internal_.AdapterCommon.md#exticon)
- [getHistory](internal_.AdapterCommon.md#gethistory)
- [icon](internal_.AdapterCommon.md#icon)
- [installedVersion](internal_.AdapterCommon.md#installedversion)
- [keywords](internal_.AdapterCommon.md#keywords)
- [localLink](internal_.AdapterCommon.md#locallink)
- [localLinks](internal_.AdapterCommon.md#locallinks)
- [logLevel](internal_.AdapterCommon.md#loglevel)
- [logTransporter](internal_.AdapterCommon.md#logtransporter)
- [main](internal_.AdapterCommon.md#main)
- [materialize](internal_.AdapterCommon.md#materialize)
- [materializeTab](internal_.AdapterCommon.md#materializetab)
- [messagebox](internal_.AdapterCommon.md#messagebox)
- [mode](internal_.AdapterCommon.md#mode)
- [name](internal_.AdapterCommon.md#name)
- [noConfig](internal_.AdapterCommon.md#noconfig)
- [noIntro](internal_.AdapterCommon.md#nointro)
- [noRepository](internal_.AdapterCommon.md#norepository)
- [nogit](internal_.AdapterCommon.md#nogit)
- [nondeletable](internal_.AdapterCommon.md#nondeletable)
- [onlyWWW](internal_.AdapterCommon.md#onlywww)
- [os](internal_.AdapterCommon.md#os)
- [osDependencies](internal_.AdapterCommon.md#osdependencies)
- [platform](internal_.AdapterCommon.md#platform)
- [preserveSettings](internal_.AdapterCommon.md#preservesettings)
- [restartAdapters](internal_.AdapterCommon.md#restartadapters)
- [role](internal_.AdapterCommon.md#role)
- [schedule](internal_.AdapterCommon.md#schedule)
- [serviceStates](internal_.AdapterCommon.md#servicestates)
- [singleton](internal_.AdapterCommon.md#singleton)
- [singletonHost](internal_.AdapterCommon.md#singletonhost)
- [stopBeforeUpdate](internal_.AdapterCommon.md#stopbeforeupdate)
- [stopTimeout](internal_.AdapterCommon.md#stoptimeout)
- [subscribable](internal_.AdapterCommon.md#subscribable)
- [subscribe](internal_.AdapterCommon.md#subscribe)
- [supportCustoms](internal_.AdapterCommon.md#supportcustoms)
- [supportStopInstance](internal_.AdapterCommon.md#supportstopinstance)
- [title](internal_.AdapterCommon.md#title)
- [titleLang](internal_.AdapterCommon.md#titlelang)
- [type](internal_.AdapterCommon.md#type)
- [unsafePerm](internal_.AdapterCommon.md#unsafeperm)
- [version](internal_.AdapterCommon.md#version)
- [wakeup](internal_.AdapterCommon.md#wakeup)
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

• `Optional` **adminColumns**: `any`[]

Custom attributes to be shown in admin in the object browser

#### Defined in

[types-dev/objects.d.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L440)

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

#### Defined in

[types-dev/objects.d.ts:442](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L442)

___

### allowInit

• `Optional` **allowInit**: `boolean`

#### Defined in

[types-dev/objects.d.ts:453](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L453)

___

### availableModes

• `Optional` **availableModes**: [`InstanceMode`](../modules/internal_.md#instancemode)[]

Possible values for the instance mode (if more than one is possible)

#### Defined in

[types-dev/objects.d.ts:455](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L455)

___

### blockly

• `Optional` **blockly**: `boolean`

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Defined in

[types-dev/objects.d.ts:457](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L457)

___

### compact

• `Optional` **compact**: `boolean`

If true, this adapter can be started in compact mode (in the same process as other adpaters)

#### Defined in

[types-dev/objects.d.ts:461](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L461)

___

### connectionType

• `Optional` **connectionType**: ``"cloud"`` \| ``"local"``

Where the adapter will get its data from. Set this together with

**`See`**

dataSource

#### Defined in

[types-dev/objects.d.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L459)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:573](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L573)

___

### dataFolder

• `Optional` **dataFolder**: `string`

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Defined in

[types-dev/objects.d.ts:463](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L463)

___

### dataSource

• `Optional` **dataSource**: ``"push"`` \| ``"poll"`` \| ``"assumption"``

How the adapter will mainly receive its data. Set this together with

**`See`**

connectionType

#### Defined in

[types-dev/objects.d.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L465)

___

### dependencies

• `Optional` **dependencies**: `Record`<`string`, `string`\>[]

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter.

#### Defined in

[types-dev/objects.d.ts:467](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L467)

___

### docs

• `Optional` **docs**: `Partial`<`Record`<[`Languages`](../modules/internal_.md#languages), `string` \| `string`[]\>\>

Which files outside of the README.md have documentation for the adapter

#### Defined in

[types-dev/objects.d.ts:469](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L469)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L159)

___

### enabled

• **enabled**: `boolean`

Whether new instances should be enabled by default. *Should* be `false`!

#### Defined in

[types-dev/objects.d.ts:471](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L471)

___

### eraseOnUpload

• `Optional` **eraseOnUpload**: `boolean`

If true, all previous data in the target directory (web) should be deleted before uploading

#### Defined in

[types-dev/objects.d.ts:473](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L473)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:162](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L162)

___

### extIcon

• `Optional` **extIcon**: `string`

URL of an external icon that is shown for adapters that are not installed

#### Defined in

[types-dev/objects.d.ts:475](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L475)

___

### getHistory

• `Optional` **getHistory**: `boolean`

Whether this adapter responds to `getHistory` messages

#### Defined in

[types-dev/objects.d.ts:477](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L477)

___

### icon

• `Optional` **icon**: `string`

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:479](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L479)

___

### installedVersion

• **installedVersion**: `string`

Which version of this adapter is installed

#### Defined in

[types-dev/objects.d.ts:481](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L481)

___

### keywords

• `Optional` **keywords**: `string`[]

#### Defined in

[types-dev/objects.d.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L482)

___

### localLink

• `Optional` **localLink**: `string`

**`Deprecated`**

Use

**`See`**

localLinks

#### Defined in

[types-dev/objects.d.ts:486](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L486)

___

### localLinks

• `Optional` **localLinks**: `Record`<`string`, `string`\>

A dictionary of links to web services this adapter provides

#### Defined in

[types-dev/objects.d.ts:484](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L484)

___

### logLevel

• `Optional` **logLevel**: [`LogLevel`](../modules/internal_.md#loglevel)

#### Defined in

[types-dev/objects.d.ts:487](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L487)

___

### logTransporter

• `Optional` **logTransporter**: `boolean`

Whether this adapter receives logs from other hosts and adapters (e.g. to strore them somewhere)

#### Defined in

[types-dev/objects.d.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L489)

___

### main

• `Optional` **main**: `string`

Path to the start file of the adapter. Should be the same as in `package.json`

#### Defined in

[types-dev/objects.d.ts:491](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L491)

___

### materialize

• **materialize**: `boolean`

Whether the admin configuration dialog is written in materialize style. Required for Admin 3+

#### Defined in

[types-dev/objects.d.ts:495](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L495)

___

### materializeTab

• **materializeTab**: `boolean`

Whether the admin tab is written in materialize style. Required for Admin 3+

#### Defined in

[types-dev/objects.d.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L493)

___

### messagebox

• `Optional` **messagebox**: ``true``

If `true`, the object `system.adapter.<adaptername>.<adapterinstance>.messagebox will be created to send messages to the adapter (used for email, pushover, etc...)

#### Defined in

[types-dev/objects.d.ts:497](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L497)

___

### mode

• **mode**: [`InstanceMode`](../modules/internal_.md#instancemode)

#### Defined in

[types-dev/objects.d.ts:498](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L498)

___

### name

• **name**: `string`

Name of the adapter (without leading `ioBroker.`)

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:500](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L500)

___

### noConfig

• `Optional` **noConfig**: ``true``

If `true`, no configuration dialog will be shown

#### Defined in

[types-dev/objects.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L502)

___

### noIntro

• `Optional` **noIntro**: ``true``

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Defined in

[types-dev/objects.d.ts:504](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L504)

___

### noRepository

• `Optional` **noRepository**: ``true``

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Defined in

[types-dev/objects.d.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L506)

___

### nogit

• `Optional` **nogit**: ``true``

If `true`, manual installation from GitHub is not possible

#### Defined in

[types-dev/objects.d.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L508)

___

### nondeletable

• `Optional` **nondeletable**: ``true``

If `true`, this adapter cannot be deleted or updated manually.

#### Defined in

[types-dev/objects.d.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L510)

___

### onlyWWW

• `Optional` **onlyWWW**: `boolean`

If `true`, this "adapter" only contains HTML files and no main executable

#### Defined in

[types-dev/objects.d.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L512)

___

### os

• `Optional` **os**: ``"linux"`` \| ``"darwin"`` \| ``"win32"`` \| (``"linux"`` \| ``"darwin"`` \| ``"win32"``)[]

Which OSes this adapter supports

#### Defined in

[types-dev/objects.d.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L523)

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

[types-dev/objects.d.ts:514](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L514)

___

### platform

• **platform**: ``"Javascript/Node.js"``

#### Defined in

[types-dev/objects.d.ts:524](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L524)

___

### preserveSettings

• `Optional` **preserveSettings**: `string` \| `string`[]

The keys of common attributes (e.g. `history`) which are not deleted in a `setObject` call even if they are not present. Deletion must be done explicitly by setting them to `null`.

#### Defined in

[types-dev/objects.d.ts:526](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L526)

___

### restartAdapters

• `Optional` **restartAdapters**: `string`[]

Which adapters must be restarted after installing or updating this adapter.

#### Defined in

[types-dev/objects.d.ts:528](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L528)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L169)

___

### schedule

• `Optional` **schedule**: `string`

If the adapter runs in `schedule` mode, this contains the CRON

#### Defined in

[types-dev/objects.d.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L530)

___

### serviceStates

• `Optional` **serviceStates**: `string` \| `boolean`

#### Defined in

[types-dev/objects.d.ts:531](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L531)

___

### singleton

• `Optional` **singleton**: `boolean`

Whether this adapter may only be installed once in the whole system

#### Defined in

[types-dev/objects.d.ts:535](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L535)

___

### singletonHost

• `Optional` **singletonHost**: `boolean`

Whether this adapter may only be installed once per host

#### Defined in

[types-dev/objects.d.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L533)

___

### stopBeforeUpdate

• `Optional` **stopBeforeUpdate**: `boolean`

Whether the adapter must be stopped before an update

#### Defined in

[types-dev/objects.d.ts:537](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L537)

___

### stopTimeout

• `Optional` **stopTimeout**: `number`

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Defined in

[types-dev/objects.d.ts:539](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L539)

___

### subscribable

• `Optional` **subscribable**: `boolean`

#### Defined in

[types-dev/objects.d.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L540)

___

### subscribe

• `Optional` **subscribe**: `any`

#### Defined in

[types-dev/objects.d.ts:541](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L541)

___

### supportCustoms

• `Optional` **supportCustoms**: `boolean`

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Defined in

[types-dev/objects.d.ts:543](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L543)

___

### supportStopInstance

• `Optional` **supportStopInstance**: `boolean`

Whether the adapter supports the signal stopInstance via messagebox

#### Defined in

[types-dev/objects.d.ts:545](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L545)

___

### title

• `Optional` **title**: `string`

**`Deprecated`**

The name of this adapter to be shown in the admin UI. Use

**`See`**

titleLang instead.

#### Defined in

[types-dev/objects.d.ts:549](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L549)

___

### titleLang

• `Optional` **titleLang**: `Record`<[`Languages`](../modules/internal_.md#languages), `string`\>

The translated names of this adapter to be shown in the admin UI

#### Defined in

[types-dev/objects.d.ts:547](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L547)

___

### type

• `Optional` **type**: `string`

The type of this adapter

#### Defined in

[types-dev/objects.d.ts:551](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L551)

___

### unsafePerm

• `Optional` **unsafePerm**: ``true``

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Defined in

[types-dev/objects.d.ts:553](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L553)

___

### version

• **version**: `string`

The available version in the ioBroker repo.

#### Defined in

[types-dev/objects.d.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L555)

___

### wakeup

• `Optional` **wakeup**: `boolean`

If `true`, the adapter will be started if any value is written into `system.adapter.<name>.<instance>.wakeup. Normally the adapter should stop after processing the event.

#### Defined in

[types-dev/objects.d.ts:557](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L557)

___

### webByVersion

• `Optional` **webByVersion**: `boolean`

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Defined in

[types-dev/objects.d.ts:559](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L559)

___

### webExtendable

• `Optional` **webExtendable**: `boolean`

Whether the web server in this adapter can be extended with plugin/extensions

#### Defined in

[types-dev/objects.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L561)

___

### webExtension

• `Optional` **webExtension**: `string`

Relative path to a module that contains an extension for the web adapter. Use together with

**`See`**

native.webInstance to configure which instances this affects

#### Defined in

[types-dev/objects.d.ts:563](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L563)

___

### webPreSettings

• `Optional` **webPreSettings**: `any`

#### Defined in

[types-dev/objects.d.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L564)

___

### webservers

• `Optional` **webservers**: `any`

#### Defined in

[types-dev/objects.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L565)

___

### welcomeScreen

• `Optional` **welcomeScreen**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

A list of pages that should be shown on the "web" index page

#### Defined in

[types-dev/objects.d.ts:567](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L567)

___

### welcomeScreenPro

• `Optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

A list of pages that should be shown on the ioBroker cloud index page

#### Defined in

[types-dev/objects.d.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L569)

___

### wwwDontUpload

• `Optional` **wwwDontUpload**: `boolean`

#### Defined in

[types-dev/objects.d.ts:570](https://github.com/ioBroker/ioBroker.js-controller/blob/08bb2650/packages/types-dev/objects.d.ts#L570)
