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

node_modules/@types/iobroker/objects.d.ts:384

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

node_modules/@types/iobroker/objects.d.ts:386

___

### allowInit

• `Optional` **allowInit**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:397

___

### availableModes

• `Optional` **availableModes**: [`InstanceMode`](../modules/internal_.md#instancemode)[]

Possible values for the instance mode (if more than one is possible)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:399

___

### blockly

• `Optional` **blockly**: `boolean`

Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:401

___

### compact

• `Optional` **compact**: `boolean`

If true, this adapter can be started in compact mode (in the same process as other adpaters)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:405

___

### connectionType

• `Optional` **connectionType**: ``"local"`` \| ``"cloud"``

Where the adapter will get its data from. Set this together with

**`See`**

dataSource

#### Defined in

node_modules/@types/iobroker/objects.d.ts:403

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:517

___

### dataFolder

• `Optional` **dataFolder**: `string`

The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:407

___

### dataSource

• `Optional` **dataSource**: ``"push"`` \| ``"poll"`` \| ``"assumption"``

How the adapter will mainly receive its data. Set this together with

**`See`**

connectionType

#### Defined in

node_modules/@types/iobroker/objects.d.ts:409

___

### dependencies

• `Optional` **dependencies**: [`Record`](../modules/internal_.md#record)<`string`, `string`\>[]

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:411

___

### docs

• `Optional` **docs**: [`Partial`](../modules/internal_.md#partial)<[`Record`](../modules/internal_.md#record)<[`Languages`](../modules/internal_.md#languages), `string` \| `string`[]\>\>

Which files outside of the README.md have documentation for the adapter

#### Defined in

node_modules/@types/iobroker/objects.d.ts:413

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:148

___

### enabled

• **enabled**: `boolean`

Whether new instances should be enabled by default. *Should* be `false`!

#### Defined in

node_modules/@types/iobroker/objects.d.ts:415

___

### eraseOnUpload

• `Optional` **eraseOnUpload**: `boolean`

If true, all previous data in the target directory (web) should be deleted before uploading

#### Defined in

node_modules/@types/iobroker/objects.d.ts:417

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:151

___

### extIcon

• `Optional` **extIcon**: `string`

URL of an external icon that is shown for adapters that are not installed

#### Defined in

node_modules/@types/iobroker/objects.d.ts:419

___

### getHistory

• `Optional` **getHistory**: `boolean`

Whether this adapter responds to `getHistory` messages

#### Defined in

node_modules/@types/iobroker/objects.d.ts:421

___

### icon

• `Optional` **icon**: `string`

Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:423

___

### installedVersion

• **installedVersion**: `string`

Which version of this adapter is installed

#### Defined in

node_modules/@types/iobroker/objects.d.ts:425

___

### keywords

• `Optional` **keywords**: `string`[]

#### Defined in

node_modules/@types/iobroker/objects.d.ts:426

___

### localLink

• `Optional` **localLink**: `string`

**`Deprecated`**

Use

**`See`**

localLinks

#### Defined in

node_modules/@types/iobroker/objects.d.ts:430

___

### localLinks

• `Optional` **localLinks**: [`Record`](../modules/internal_.md#record)<`string`, `string`\>

A dictionary of links to web services this adapter provides

#### Defined in

node_modules/@types/iobroker/objects.d.ts:428

___

### logLevel

• `Optional` **logLevel**: [`LogLevel`](../modules/internal_.md#loglevel)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:431

___

### logTransporter

• `Optional` **logTransporter**: `boolean`

Whether this adapter receives logs from other hosts and adapters (e.g. to strore them somewhere)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:433

___

### main

• `Optional` **main**: `string`

Path to the start file of the adapter. Should be the same as in `package.json`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:435

___

### materialize

• **materialize**: `boolean`

Whether the admin configuration dialog is written in materialize style. Required for Admin 3+

#### Defined in

node_modules/@types/iobroker/objects.d.ts:439

___

### materializeTab

• **materializeTab**: `boolean`

Whether the admin tab is written in materialize style. Required for Admin 3+

#### Defined in

node_modules/@types/iobroker/objects.d.ts:437

___

### messagebox

• `Optional` **messagebox**: ``true``

If `true`, the object `system.adapter.<adaptername>.<adapterinstance>.messagebox will be created to send messages to the adapter (used for email, pushover, etc...)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:441

___

### mode

• **mode**: [`InstanceMode`](../modules/internal_.md#instancemode)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:442

___

### name

• **name**: `string`

Name of the adapter (without leading `ioBroker.`)

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:444

___

### noConfig

• `Optional` **noConfig**: ``true``

If `true`, no configuration dialog will be shown

#### Defined in

node_modules/@types/iobroker/objects.d.ts:446

___

### noIntro

• `Optional` **noIntro**: ``true``

If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets...

#### Defined in

node_modules/@types/iobroker/objects.d.ts:448

___

### noRepository

• `Optional` **noRepository**: ``true``

Set to `true` if the adapter is not available in the official ioBroker repositories.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:450

___

### nogit

• `Optional` **nogit**: ``true``

If `true`, manual installation from GitHub is not possible

#### Defined in

node_modules/@types/iobroker/objects.d.ts:452

___

### nondeletable

• `Optional` **nondeletable**: ``true``

If `true`, this adapter cannot be deleted or updated manually.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:454

___

### onlyWWW

• `Optional` **onlyWWW**: `boolean`

If `true`, this "adapter" only contains HTML files and no main executable

#### Defined in

node_modules/@types/iobroker/objects.d.ts:456

___

### os

• `Optional` **os**: ``"linux"`` \| ``"darwin"`` \| ``"win32"`` \| (``"linux"`` \| ``"darwin"`` \| ``"win32"``)[]

Which OSes this adapter supports

#### Defined in

node_modules/@types/iobroker/objects.d.ts:467

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

node_modules/@types/iobroker/objects.d.ts:458

___

### platform

• **platform**: ``"Javascript/Node.js"``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:468

___

### preserveSettings

• `Optional` **preserveSettings**: `string` \| `string`[]

The keys of common attributes (e.g. `history`) which are not deleted in a `setObject` call even if they are not present. Deletion must be done explicitly by setting them to `null`.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:470

___

### restartAdapters

• `Optional` **restartAdapters**: `string`[]

Which adapters must be restarted after installing or updating this adapter.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:472

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:158

___

### schedule

• `Optional` **schedule**: `string`

If the adapter runs in `schedule` mode, this contains the CRON

#### Defined in

node_modules/@types/iobroker/objects.d.ts:474

___

### serviceStates

• `Optional` **serviceStates**: `string` \| `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:475

___

### singleton

• `Optional` **singleton**: `boolean`

Whether this adapter may only be installed once in the whole system

#### Defined in

node_modules/@types/iobroker/objects.d.ts:479

___

### singletonHost

• `Optional` **singletonHost**: `boolean`

Whether this adapter may only be installed once per host

#### Defined in

node_modules/@types/iobroker/objects.d.ts:477

___

### stopBeforeUpdate

• `Optional` **stopBeforeUpdate**: `boolean`

Whether the adapter must be stopped before an update

#### Defined in

node_modules/@types/iobroker/objects.d.ts:481

___

### stopTimeout

• `Optional` **stopTimeout**: `number`

Overrides the default timeout that ioBroker will wait before force-stopping the adapter

#### Defined in

node_modules/@types/iobroker/objects.d.ts:483

___

### subscribable

• `Optional` **subscribable**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:484

___

### subscribe

• `Optional` **subscribe**: `any`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:485

___

### supportCustoms

• `Optional` **supportCustoms**: `boolean`

If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:487

___

### supportStopInstance

• `Optional` **supportStopInstance**: `boolean`

Whether the adapter supports the signal stopInstance via messagebox

#### Defined in

node_modules/@types/iobroker/objects.d.ts:489

___

### title

• `Optional` **title**: `string`

**`Deprecated`**

The name of this adapter to be shown in the admin UI. Use

**`See`**

titleLang instead.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:493

___

### titleLang

• `Optional` **titleLang**: [`Record`](../modules/internal_.md#record)<[`Languages`](../modules/internal_.md#languages), `string`\>

The translated names of this adapter to be shown in the admin UI

#### Defined in

node_modules/@types/iobroker/objects.d.ts:491

___

### type

• `Optional` **type**: `string`

The type of this adapter

#### Defined in

node_modules/@types/iobroker/objects.d.ts:495

___

### unsafePerm

• `Optional` **unsafePerm**: ``true``

If `true`, the `npm` package must be installed with the `--unsafe-perm` flag

#### Defined in

node_modules/@types/iobroker/objects.d.ts:497

___

### version

• **version**: `string`

The available version in the ioBroker repo.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:499

___

### wakeup

• `Optional` **wakeup**: `boolean`

If `true`, the adapter will be started if any value is written into `system.adapter.<name>.<instance>.wakeup. Normally the adapter should stop after processing the event.

#### Defined in

node_modules/@types/iobroker/objects.d.ts:501

___

### webByVersion

• `Optional` **webByVersion**: `boolean`

Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:503

___

### webExtendable

• `Optional` **webExtendable**: `boolean`

Whether the web server in this adapter can be extended with plugin/extensions

#### Defined in

node_modules/@types/iobroker/objects.d.ts:505

___

### webExtension

• `Optional` **webExtension**: `string`

Relative path to a module that contains an extension for the web adapter. Use together with

**`See`**

native.webInstance to configure which instances this affects

#### Defined in

node_modules/@types/iobroker/objects.d.ts:507

___

### webPreSettings

• `Optional` **webPreSettings**: `any`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:508

___

### webservers

• `Optional` **webservers**: `any`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:509

___

### welcomeScreen

• `Optional` **welcomeScreen**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

A list of pages that should be shown on the "web" index page

#### Defined in

node_modules/@types/iobroker/objects.d.ts:511

___

### welcomeScreenPro

• `Optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

A list of pages that should be shown on the ioBroker cloud index page

#### Defined in

node_modules/@types/iobroker/objects.d.ts:513

___

### wwwDontUpload

• `Optional` **wwwDontUpload**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:514
