---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smartcontrol/README.md
title: ioBroker.smartcontrol
hash: y63P7D4JHpiNxcmrfSNZ+TM4WLO6T28M5z5koFMqX68=
---
![商标](../../../en/adapterref/iobroker.smartcontrol/admin/smartcontrol-banner.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.smartcontrol.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.smartcontrol.svg)
![安装数量（最新）](http://iobroker.live/badges/smartcontrol-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/smartcontrol-stable.svg)
![依赖状态](https://img.shields.io/david/Mic-M/iobroker.smartcontrol.svg)
![已知漏洞](https://snyk.io/test/github/Mic-M/ioBroker.smartcontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.smartcontrol.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Mic-M/ioBroker.smartcontrol/master.svg)

＃ioBroker.smartcontrol
## IoBroker的智能控制适配器
*[单击此处跳到下面的“简介”部分](#introduction)*

没有ioBroker社区有关UI，功能请求，测试和错误报告等方面的宝贵宝贵意见，就不会存在该适配器。非常感谢所有贡献者！

以下是我想与您分享的社区非常积极反馈的摘要：lush（脸红）（从最旧到最新，以及德语）：

* * Ein收费适配器和Entwicklungsarbeit！* [来源]（https://forum.iobroker.net/post/461724）
* * Ich finde das Hilfssystem einfachGenial.👍* [来源]（https://forum.iobroker.net/post/463066）
* *死奥斯威斯坦教徒这么卑鄙的Übersichtlicher！绝对要举行！ 🙂Die Eierlegende selbstversorgende Wollmilchsau ist amlaufen..🙂* [来源]（https://forum.iobroker.net/post/470948）
* *人在阿尔贝克（Erstmal einDankeschönfürdie Arbeit）。 Möchtenicht wissen wieviele Stunden da drin stecken👍* [来源]（https://forum.iobroker.net/post/474350）
* *还包括mus susgen：TOP Arbeit！* [来源]（https://forum.iobroker.net/post/476116）
* *超级用户，超级用户和用户群！* [来源]（https://forum.iobroker.net/post/476117）
* *Die Geschwindigkeit mit der der Den den Adapter nach vorne treibst ist echt erschreckend，因此schlimm und schnell das manching Mal mit dem testen nicht hinterher kommt👍RESPEKTABEL* [source]（https://forum.iobroker.net/post/204 ）
* ICH斌奥赫recht begeistert冯DEM适配器，SCHÖNEArbeit。 Hab jetzt schonlängereZeit浸泡式mal wieder verschiedene Systeme getestet，FHEM，Nodered和jetzt seit kurzem Iobroker。所以schnell hab ich meine LichtsteuerungüberBewegungsmelder noch nie hinbekommen。* [source]（https://forum.iobroker.net/post/482899）
* * Super Sache die du da gebaut hast🙂* [来源]（https://forum.iobroker.net/post/485306）
* *适配器由贝米尔米尔·伊因萨兹和洛伊特·塞古特提供。 DankefürDeine Arbeit。* [来源]（https://forum.iobroker.net/post/485463）
* *发现不符合要求的人，必须在适配器和其他适配器之间进行连接。回复<br>Bis jetzt konnte ichtatsächlichalles如此，所以这是Blockly在apt migrieren的收费地区。<br> Ichwürdemirwünschen，温特·德·适配器，所以，他的适配器，“ forkst”和diesen dann ebenfalls，所以usernah weiterentwickelst🙄* [来源]（https://forum.iobrokerker.net/post / 488090）
* * Ersmal Hut Ab。在Adapterlog上的适配器和lass sich nach einer gewissen的Einarbeitungszeit适配器。 （...）Trotzdem nochmal dickes Lob，viele Dinge laufen damit seit einiger Zeit reibungslos和übersichtlicherals通过Skript。 👍* [来源]（https://forum.iobroker.net/post/492035）
* * Dankefürden coolen适配器-da kann ich nur meinen Hut davor ziehen！* [来源]（https://forum.iobroker.net/post/496452）
* * ein dickes Lobfürden Adapter und Deine vorbildliche Arbeit👍* [来源]（https://forum.iobroker.net/post/497110）
** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
* * Danke，man das Teil ist somächtiggeworden，aber GENIAL！* [来源]（https://forum.iobroker.net/post/500518）

＃＃ 介绍
在我们的[ioBroker](https://github.com/ioBroker/ioBroker)家庭自动化中，我们有几个触发器，例如

 *走廊触发器中的运动传感器，
 *按下墙壁开关，
 *发生特定时间（例如，日落之后30分钟或周一至周五的7:00）

一旦触发了此类触发器，我们通常希望（不）满足其他条件（例如，“今天是假期”，“客厅窗户打开”，亮度大于100勒克斯等）。

这些可选验证通过后，应切换目标状态（即“目标设备” **）。

此外，应在触发运动传感器后运行计时器，该定时器（一旦没有运动发生）将在设置的秒数后关闭目标设备。

所有这些都可以通过此适配器轻松完成，甚至更多;-)

该适配器的目的是为您提供各种需求的非常“用户友好”的环境**，尽管以上只是使用IFTTT的一个简单示例（*如果是，那么*），您可以配置您家中的许多不同情况（在适配器选项中称为“区域”）。
另外，如果您使用的是Javascript / Blockly，通常应该可以使用此适配器替换多个脚本，这还将确保更高的一致性，更稳定的环境，尤其是用户友好的配置方式。

##安装
只需通过ioBroker管理界面定期安装适配器。该适配器位于最新的稳定存储库中。<br>完成后，相应地添加适配器实例。

##说明
我已经在此适配器的管理员设置中包含了所有说明。

<sub>原因：我们有一个很好的德语用语[Medienbruch](https://de.wikipedia.org/wiki/Medienbruch)，这对于“破坏”当前媒体并切换到其他媒体（例如不同的网站，程序等）来执行/完成是不必要的要求任务等。由于这很麻烦，因此我已在此适配器的管理员设置中包括了所有说明。</sub>

另外，您也可以在此处阅读大多数说明：

* [**基本适配器说明**]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/start_en.md）-对于德语[单击此处（德语） ]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/start_de.md）
* [**目标设备**]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-target-devices_en.md）-对于德语[单击此处（德语）]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-target-devices_de.md）
* [**附加条件**]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-conditions_en.md）-对于德语[点击此处（德语）]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-conditions_de.md）
* [**触发器：运动传感器**]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-trigger-motion_zh.md）-对于德语[单击此处（德语）]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-trigger-motion_de.md）
* [**触发：其他设备（墙壁开关等）**]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-trigger-devices_en .md）-对于德语[单击此处（德语）]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-trigger-devices_de.md）
* [**触发器：与时间有关**]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc/md/table-trigger-times_en.md）-对于德语[单击此处（德语）]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-trigger-times_de.md）
* [**区域**]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-zones_en.md）-对于德语[点击此处（德语） ]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-zones_de.md）
* [**执行设置**]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-execution_en.md）-对于德语[点击此处（德语）]（https://github.com/Mic-M/ioBroker.smartcontrol/blob/master/admin/doc-md/table-execution_de.md）

##适配器选项的屏幕截图
请注意，这些屏幕截图是快照，并不反映最新的适配器选项。
这只是为您提供适配器选项的概述。

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-start.png)

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-triggers-motion.png)

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-triggers-other.png)

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-triggers-time.png)

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-target-devices.png)

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-conditions.png)

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-zones.png)

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-zones-execution.png)

![SmartControl选项](../../../en/adapterref/iobroker.smartcontrol/admin/img/option-screenshots/tab-further-options.png)

##链接和资源
* [**永久性的Smart Control ioBroker论坛链接（启动页面）**]（https://forum.iobroker.net/topic/36728/smart-control-adapter-splash-page）

##注意
*此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[Sentry-Plugin文档]（https://github.com/ioBroker/plugin -sentry＃plugin-sentry）！ Sentry报告从js-controller 3.0开始使用。
*由[flaticon.com]（https://www.flaticon.com/）的[freepik]（https://www.flaticon.com/authors/freepik）制作的适配器图标。</ sup> </ sub>

## Changelog

### 1.0.0 
* (Mic-M) No changes - just prepared versioning to add adapter to stable repository per adapter development documentation, [Versioning section](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

### 0.6.0
* (Mic-M) Several code improvements / fixes
* (Mic-M) Enhancement: New 'Linked devices' options for tab '3. TRIGGER', motion sensors.

### 0.5.13
* (Mic-M) Issue #35 should be finally fixed.
* (Mic-M) Enhancement: New state `info.log.switchedTargetDevices.json` for recently switched target devices
* (Mic-M) Code improvements

### 0.5.12
* (Mic-M) Another fix of 0.5.10 and improvement of debug log

### 0.5.11
* (Mic-M) Fix of 0.5.10

### 0.5.10
* (Mic-M) Potential fix / workaround: for issue #35 to verify if schedule was called before at the same time


### 0.5.9
* (Mic-M) **Breaking Change** New feature: 'Target Devices' -> 'Target URLs': added separate URL field to switch device off. This is breaking, since adapter admin config will have blank fields of 'Target URLs' once you update the adapter, and state ids will change as well. 
* (Mic-M) Enhancement: 'Target Devices' -> 'Target URLs' : [Allow DNS name](https://forum.iobroker.net/post/510154)

### 0.5.8
* (Mic-M) Fixed admin options

### 0.5.7
* (Mic-M) Various code fixes and improvements
* (Mic-M) Potentially fix of [issue #35](https://github.com/Mic-M/ioBroker.smartcontrol/issues/35) - to be tested
* (Mic-M) Enhancement for 'Target Devices': Add table to call URLs als target (implementation of [issue #1](https://github.com/Mic-M/ioBroker.smartcontrol/issues/1))


### 0.5.6
* (Mic-M) Hotfix: loading admin settings for enums

### 0.5.5
* (Mic-M) Fixed error (reported by [Sentry](https://github.com/Mic-M/ioBroker.smartcontrol#notes)): `Cannot read property 'log' of undefined` in _asyncSetTargetDevices_processZone()
* (Mic-M) Fixed issue: Tab TARGET DEVICES > Enumerations: functions and rooms selection were sometimes blank, and chosen item was sometimes deleted after saving and reopening admin options.
* (Mic-M) Future - Early preparation work, not yet visible and not yet activated! - Tab TARGET DEVICES: new table for URLs as targets will be added ([see issue](https://github.com/Mic-M/ioBroker.smartcontrol/issues/1))

### 0.5.4
* (Mic-M) New feature: TARGET DEVICES - add delay option for delayed switching on of target device.

### 0.5.3
* (Mic-M) New feature: ZONES - target devices: you can now assign a delay in seconds to wait until the device is being switched on
* (Mic-M) Various fixes

### 0.5.2
* (Mic-M) Fix: Removed redundant column in Target Devices table
* (Mic-M) Fix: Under the hood (admin/index_m.js, admin/tsconfig.json, admin/admin.d.ts)

### 0.5.1
* (Mic-M) Fixed clearing timeout while adapter is stopping.

### 0.5.0
* (Mic-M) New feature: ZONES - New option "Delay for switching zone on (in seconds)" - [issue #31](https://github.com/Mic-M/ioBroker.smartcontrol/issues/31)
* (Mic-M) New feature: ZONES - New option "Never switch off if..." - [issue #32](https://github.com/Mic-M/ioBroker.smartcontrol/issues/32)


### 0.4.4
* (Mic-M) New feature: allow comparison operators `!=` / `<>` in 'TRIGGERS -> Other triggers' to trigger if state value is unequal. Example: `<>30` or `!=30` - see [Forum](https://forum.iobroker.net/post/496133)
* (Mic-M) Fix: Don't create `smartcontrol.x.options.TargetDevices.` states for enums since this does not make sense for enums.
* (Mic-M) Fix: Don't create `smartcontrol.x.targetDevices.` states for enums since this does not make sense for enums.
* (Mic-M) Moved log `Trigger xyz was already activated x seconds ago and is ignored...` from regular info log to debug/'extended info log' - [Forum](https://forum.iobroker.net/post/496604)


### 0.4.3
* (Mic-M) New feature in adapter options: configure number of entries in 'smartcontrol.x.info.log.zoneActivations.json'
* (Mic-M) Extend adapter documentation by adding new 0.4.0 features 
* (Mic-M) Fixed issue regarding 'smartcontrol.x.userstates.xxx' creation

### 0.4.2
* (Mic-M) Fix code

### 0.4.1
* (Mic-M) Fixed io-package.json


### 0.4.0
* (Mic-M) New feature: Tab 'Target Devices': New table 'Targets: Enum functions' to **support enum functions**, and optionally limit to certain enum rooms. [issue #29](https://github.com/Mic-M/ioBroker.smartcontrol/issues/29).
* (Mic-M) New feature: New JSON state for recent zone activations: 'smartcontrol.x.info.log.zoneActivations.json'. [issue #30](https://github.com/Mic-M/ioBroker.smartcontrol/issues/30).
* (Mic-M) Code fixes


### 0.3.10
* (Mic-M) Fixed io-package.json

### 0.3.9
* (Mic-M) New feature: Table "Additional Conditions" is now allowing comparators like `> 30`, `<= 25` etc. in column 'State value'. See [issue #28](https://github.com/Mic-M/ioBroker.smartcontrol/issues/28)

### 0.3.8
* (Mic-M) Updated readme since adapter [is now in latest repository](https://github.com/ioBroker/ioBroker.repositories/pull/930)
* (Mic-M) Updated translations, which also addresses [#26](https://github.com/Mic-M/ioBroker.smartcontrol/issues/26)
* (Mic-M) Fixed/improved 'admin/index_m.js' 

### 0.3.7
* (Mic-M) Mini update, just under the hood.

### 0.3.6
* (Mic-M) Minor translation update and [Compact Mode test](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen) successfully completed.

### 0.3.5
* (Mic-M) Internationalization (i18n) only – added all required 10 languages, and provide documentation in English and German plus support for embedded other translations (like Russian, Spanish, etc.) within the admin configuration.

### 0.3.4
* (Mic-M) Test: Implementation of markdown documentation files within adapter configuration by using [zero-md](https://github.com/zerodevx/) for tables 'Target Devices' and 'Additional Conditions' to prepare adapter for multiple languages. Based on your language set in the adapter configuration, either German will be displayed (if language set to German) or English, if set language is not German.


### 0.3.3
* (Mic-M) New feature for Motion sensors: the timer duration and brightness threshold can now be changed via states. These states are available under `smartcontrol.0.options.TriggerMotion.xxx.<duration|briThreshold>` for each of your motion sensors. Please note that any change will cause an adapter restart (for initializing and clearing all existing timers to apply the new values). [Issue #18](https://github.com/Mic-M/ioBroker.smartcontrol/issues/18)

### 0.3.2
* (Mic-M) New feature: In the adapter configuration, tab 'Further Options' > 'Input Validation', you can now select if deactivated configuration table rows should be validated as well.
* (Mic-M) Fix [adapter-check.iobroker.in](https://adapter-check.iobroker.in/) error [E144] "common.installedFrom field found in io-package.json. Must be removed."
* (Mic-M) Fix for adapter unload: check schedule variable for undefined.
* (Mic-M) Fixed debug log line


### 0.3.1
* (Mic-M) Fix error if no duration is set for motion sensor - [Forum Link](https://forum.iobroker.net/post/487630)

### 0.3.0
**Breaking Changes**
* (Mic-M) Entire adapter code refactored. Therefore, tests are required to verify if these massive changes do not affect the adapter functionality. However, none of your existing adapter configuration should be lost and will be kept if you upgrade from 0.2.0+. But please check ALL of your configuration, since new options were added which
can have an effect to your existing configuration.
* (Mic-M) New feature: Implemented [issue #22](https://github.com/Mic-M/ioBroker.smartcontrol/issues/22) - Motion sensors timeout, e.g. for Homematic sensors: Motion sensor timer will now start once a motion sensor is set to false. In previous adapter versions, it was started once set to true.
<br><strong>Note:</strong> This change will cause that per your existing adapter configuration, the timer end will be reached later (so: once no motion detected any longer + the seconds you have set)
* (Mic-M) New feature: Time triggers - added options for additional conditions for 'any' or 'all'. [issue #24](https://github.com/Mic-M/ioBroker.smartcontrol/issues/24)
* (Mic-M) New feature: Zones > Execution - added options for additional conditions for 'any' or 'all'. 
* (Mic-M) Many fixes under the hood



### 0.2.2
* (Mic-M) New feature: In '3. TRIGGERS', 'Other Triggers', you can now easily create own states as triggers under 'smartcontrol.x.userstates'

### 0.2.1
* (Mic-M) Fixed motion sensors table, column 'seconds' to allow 0 seconds for deactivation

### 0.2.0
**Breaking Change**
* German: In den Adapter-Optionen wurde der Reiter und die Tabelle "Ausführung" entfernt und stattdessen in "4. ZONEN" integriert. <br>Das bedeutet für euch: Falls ihr von einer vorherigen Version aktualisiert, sichert zuvor die Adapter-Einstellungen (blauer Knopf mit "Pfeil nach unten" ganz oben rechts in den Adapter-Optionen).
Diese gehen sonst verloren. In einem Texteditor könnt ihr diese einsehen und dann in "4. ZONEN" unter Ausführung übertragen.
* English: Tab "Execution" was removed and transferred to "4. ZONES". If you have installed and used a previous version of this adapter, please save your adapter configuration settings prior to update the adapter (adapter settings: blue button at the top right corner with 'arror down' symbol).

Change Log for 0.2.0:
* (Mic-M) New feature: Admin Options: Removed tab "5. EXECUTION" (German "5. AUSFÜHRUNG") and included in tab "4. ZONES"
* (Mic-M) New feature: Changing name fields (renaming) will also change names in all other tables, in which these names are used. This is a huge usability improvement to quickly re-organize/rename table names without the need to correct in other tables accordingly.
* (Mic-M) Improvement: Add info.connection to allow setting adapter to "yellow" in case of any configuration errors

### 0.1.2-beta.7
* (Mic-M) Improvement: Once user clicks "Save" in admin options, adapter verifies if all required tables are filled, and throws an error via dialog box, which shows details.
* (Mic-M) Fixed error handling for 'overwrite state vals' in target devices table

### 0.1.2-beta.6
* (Mic-M) New feature: Changing name fields in admin options now also sets the names in all other fields to the new value.

### 0.1.2-beta.5
* (Mic-M) New feature: option in Target Devices table to not verify if device is already on/off. Use case is e.g. for button states which do not reflect the actual status of the device in the state (like Broadlink, etc.). Addresses [request #5](https://github.com/Mic-M/ioBroker.smartcontrol/issues/5)

### 0.1.2-beta.4
* (Mic-M) Enhance functionality of validating/correcting config settings  (new feature with 0.1.2-beta.3) to also process overwritten target device values. The issue is described here: [ioBroker forum post](https://forum.iobroker.net/post/472856).
* (Mic-M) Improved validation of all adapter config settings (user input)

### 0.1.2-beta.3
* (Mic-M) New feature: Overwrite target device values in Zones table, addresses [#16](https://github.com/Mic-M/ioBroker.smartcontrol/issues/16) and [#15](https://github.com/Mic-M/ioBroker.smartcontrol/issues/15)
* (Mic-M) Improved dialogs for selection: all selected nodes are expanded when opening, and additional buttons 'collapse all' and 'expand all' - [#17](https://github.com/Mic-M/ioBroker.smartcontrol/issues/17)

### 0.1.2-beta.2
* (Mic-M) Fixed saving of admin options for tab 'Further Options'.

### 0.1.2-beta.1
* (Mic-M) New feature: Additional dialogs in various tables to easily select items (like target devices) by implementing a modal dialog, FancyTree, etc.
* (Mic-M) Improved table filter functionality in adapter configuration

### 0.1.1-beta.6
* (Mic-M) Added [Sentry](https://github.com/ioBroker/plugin-sentry)

### 0.1.1-beta.5
* (Mic-M) New feature: Add filter field to each table in adapter configuration to filter table rows.

### 0.1.1-beta.4
* (Mic-M) Fixed errors of 0.1.1-beta.3. **Note** You may still experience errors in comparison to 0.1.1-beta.2 due to the major and breaking changes of 0.1.1-beta.3. In case of any issues in productive environments: please go back to 0.1.1-beta.2 and report your issue.

### 0.1.1-beta.3
* (Mic-M) **Breaking:** I did some breaking code changes under the hood, to fix various issues. I have tested these changes well, but negative side effects are still likely. No changes to options or states, so no worries here. But please use new version with care and report any issues.
* (Mic-M) Fix: issue https://forum.iobroker.net/post/464466
* (Mic-M) Extensive code changes and several bug fixes within code
* (hombach) corrected typos and wordings in admin/index_m.html
* (hombach) corrected translations in docs/translations.md
* (hombach) extended Travis tests to include ARM CPUs


### 0.1.1-beta.2
* (Mic-M) Fix: Perform configuration validation and correction also for non-active table rows, since these can be switched on thru `smartcontrol.x.options.xxx.xxx.active` states.


### 0.1.1-beta.1
* (Mic-M) New feature: New option in motion sensor table: if activated, motion triggers will not set a timeout if target device was turned on previously without a motion trigger ("manually"). [Forum Link](https://forum.iobroker.net/post/433871)
* (Mic-M) Fix: non-consistent logs for verifying config
* (Mic-M) Change: changed limitTriggerInterval from 2s to 1s - [Issue #3](https://github.com/Mic-M/ioBroker.smartcontrol/issues/3)
* (Mic-M) Fix: 24:00 as time: now treated as 0:00 but adding 24h to timestamp. 
* (Mic-M) Fix: If a trigger state path was used multiple times in different triggers and schedules, second schedule stopped. [Forum Link](https://forum.iobroker.net/post/464208)
* (Mic-M) Improvement: Better info log / extended info log per Option 'Extended Info Log'

### 0.1.0-alpha.11
* (Mic-M) Fix: check for 'is time between'

### 0.1.0-alpha.10
* (Mic-M) New feature: Provide "Toggle?" option in 'Other Triggers' table to allow toggles: if targets are off -> turn on, and vice versa.
* (Mic-M) New feature: Allow using same trigger state multiple times. Required significant code changes.
* (Mic-M) New feature: If you are using multiple motion sensors for a zone: whenever a motion device triggers, the turn off timer is being stopped and a new timer is set per the latest motion sensor.
* (Mic-M) New feature: In certain northern areas is night/nightEnd not available at least in Summer in Germay. New adapter option added to set midnight to 0:00 and midnightEnd to 2:00 in this case.
* (Mic-M) New feature 'Always of after x secs' in Zones table.
* (Mic-M) + a few more features I forgot do mention ;)

### 0.1.0-alpha.9
* (Mic-M) New feature: Triggers (Auslöser) - new option to switch target devices off and not on for 'Other Triggers' and 'Time specific Triggers'

### 0.1.0-alpha.8
* (Mic-M) Editorial only: rename '5. ZEITPLÄNE' (SCHEDULES) into '5. AUSFÜHRUNG' (EXECUTION) throughout the code - https://forum.iobroker.net/post/461282

### 0.1.0-alpha.7
* (Mic-M) Extend option 'triggerStatesAck' to include alias and namespaces not from adapters - https://forum.iobroker.net/post/461221

### 0.1.0-alpha.6
* (Mic-M) Remove requirement that trigger states must be unique - https://forum.iobroker.net/post/461115

### 0.1.0-alpha.5
* (Mic-M) New feature: allow comparison operators >=, <=, >, < for trigger states

### 0.1.0-alpha.4
* (Mic-M) translations

### 0.1.0-alpha.3
* (Mic-M) multiple changes, improvements and enhancements

### 0.1.0-alpha.2
* (Mic-M) multiple changes, improvements and enhancements

### 0.1.0-alpha.1
* (Mic-M) multiple changes, improvements and enhancements

### 0.0.3
* (Mic-M) release for very early testers

## License
MIT License

Copyright (c) 2020 Mic-M <iob.micm@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.