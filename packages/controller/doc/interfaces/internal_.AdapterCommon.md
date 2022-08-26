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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:384

___

### adminTab

• `Optional` **adminTab**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fa-icon?` | `string` |  |
| `ignoreConfigUpdate?` | `boolean` |  |
| `link?` | `string` |  |
| `name?` | `string` | - |
| `singleton?` | `boolean` |  |

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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:399

___

### blockly

• `Optional` **blockly**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:401

___

### compact

• `Optional` **compact**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:405

___

### connectionType

• `Optional` **connectionType**: ``"local"`` \| ``"cloud"``

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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:407

___

### dataSource

• `Optional` **dataSource**: ``"push"`` \| ``"poll"`` \| ``"assumption"``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:409

___

### dependencies

• `Optional` **dependencies**: [`Record`](../modules/internal_.md#record)<`string`, `string`\>[]

#### Defined in

node_modules/@types/iobroker/objects.d.ts:411

___

### docs

• `Optional` **docs**: [`Partial`](../modules/internal_.md#partial)<[`Record`](../modules/internal_.md#record)<[`Languages`](../modules/internal_.md#languages), `string` \| `string`[]\>\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:413

___

### dontDelete

• `Optional` **dontDelete**: ``true``

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:148

___

### enabled

• **enabled**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:415

___

### eraseOnUpload

• `Optional` **eraseOnUpload**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:417

___

### expert

• `Optional` **expert**: ``true``

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:151

___

### extIcon

• `Optional` **extIcon**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:419

___

### getHistory

• `Optional` **getHistory**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:421

___

### icon

• `Optional` **icon**: `string`

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:423

___

### installedVersion

• **installedVersion**: `string`

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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:430

___

### localLinks

• `Optional` **localLinks**: [`Record`](../modules/internal_.md#record)<`string`, `string`\>

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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:433

___

### main

• `Optional` **main**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:435

___

### materialize

• **materialize**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:439

___

### materializeTab

• **materializeTab**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:437

___

### messagebox

• `Optional` **messagebox**: ``true``

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

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:444

___

### noConfig

• `Optional` **noConfig**: ``true``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:446

___

### noIntro

• `Optional` **noIntro**: ``true``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:448

___

### noRepository

• `Optional` **noRepository**: ``true``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:450

___

### nogit

• `Optional` **nogit**: ``true``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:452

___

### nondeletable

• `Optional` **nondeletable**: ``true``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:454

___

### onlyWWW

• `Optional` **onlyWWW**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:456

___

### os

• `Optional` **os**: ``"linux"`` \| ``"darwin"`` \| ``"win32"`` \| (``"linux"`` \| ``"darwin"`` \| ``"win32"``)[]

#### Defined in

node_modules/@types/iobroker/objects.d.ts:467

___

### osDependencies

• `Optional` **osDependencies**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `darwin` | `string`[] |  |
| `linux` | `string`[] |  |
| `win32` | `string`[] |  |

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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:470

___

### restartAdapters

• `Optional` **restartAdapters**: `string`[]

#### Defined in

node_modules/@types/iobroker/objects.d.ts:472

___

### role

• `Optional` **role**: `string`

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:158

___

### schedule

• `Optional` **schedule**: `string`

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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:479

___

### singletonHost

• `Optional` **singletonHost**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:477

___

### stopBeforeUpdate

• `Optional` **stopBeforeUpdate**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:481

___

### stopTimeout

• `Optional` **stopTimeout**: `number`

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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:487

___

### supportStopInstance

• `Optional` **supportStopInstance**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:489

___

### title

• `Optional` **title**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:493

___

### titleLang

• `Optional` **titleLang**: [`Record`](../modules/internal_.md#record)<[`Languages`](../modules/internal_.md#languages), `string`\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:491

___

### type

• `Optional` **type**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:495

___

### unsafePerm

• `Optional` **unsafePerm**: ``true``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:497

___

### version

• **version**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:499

___

### wakeup

• `Optional` **wakeup**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:501

___

### webByVersion

• `Optional` **webByVersion**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:503

___

### webExtendable

• `Optional` **webExtendable**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:505

___

### webExtension

• `Optional` **webExtension**: `string`

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

#### Defined in

node_modules/@types/iobroker/objects.d.ts:511

___

### welcomeScreenPro

• `Optional` **welcomeScreenPro**: [`WelcomeScreenEntry`](../modules/internal_.md#welcomescreenentry)[]

#### Defined in

node_modules/@types/iobroker/objects.d.ts:513

___

### wwwDontUpload

• `Optional` **wwwDontUpload**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:514
