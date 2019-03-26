---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.javascript.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.javascript.png?downloads=true
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/iobroker/ioBroker.javascript/edit/master//README.md
title: 脚本引擎
hash: 5W14HpUieIRGZnOboj1ymbUuSrVhwKc1726J97hsB8M=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>, hobbyquaker <hq@ccu.io>, Apollon77 <ingo@fischer-ka.de>, AlCalzone
description: Javascript/Blockly Script Engine for ioBroker
keywords: js, javascript, typescript, coffeescript, rules, automate, scriptengine, blockly, blokly
readme: https://github.com/iobroker/ioBroker.javascript/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2015-01-02T23:37:49.644Z
version: 4.1.12
---
javascript适配器用于轻松创建，编辑和管理脚本。

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)Konfiguration

## []（https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#configuration）配置
![设置菜单Javascript适配器](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/javascript_Einstellungen-Javascript.png)实际配置包括输入附加的npm模块（以逗号分隔）以及用于各种计算的地理坐标。为了获得坐标，可以例如_google maps_放大了很多，然后点击所需的位置。然后显示坐标。保存后，仍然必须通过红色播放按钮激活适配器。

* * *

##操作
在安装过程中，_Admin_界面中会显示另一个选项卡_Scripte_。在这里，通过单击工具栏中的（+）（红色圆圈）创建一个新文件夹。通过左侧的“空白表”图标创建一个新脚本。将打开一个窗口，询问文件夹结构中的名称和位置。
![Javascript适配器](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/javascript_Javascript-Adapter.png)

###文件夹和文件列表
可以根据需要创建文件夹结构。该位置不会影响脚本的功能。树结构旁边有一个列表视图。搜索字段可以更轻松地检索脚本。要运行脚本，必须通过单击红色_Play_按钮在左侧的文件夹结构中激活它。要停止，请按绿色_Pause_按钮。对于每个脚本，都会创建一个新对象。它具有附加`_enabled`的脚本名称，位于文件夹`javascript.Instanz.ScriptEnabled`中。该对象用（`true/false`）表示脚本是否正在运行。状态也可以设置为打开/关闭脚本。存储在_global_文件夹中的脚本是全局脚本。它们在任何其他脚本之前在内部复制，即事先处理。因此，全局函数可以应用于多个脚本。全局脚本中的变量可以在其他脚本中使用。但要注意：每个脚本都有自己的可变空间。您不能在全局脚本中使用变量来在脚本之间交换值。为此，必须使用对象（状态）。

###编辑
创建后，_Javascript_的编辑器将在右侧打开。一些示例脚本可以在[这里](http://www.iobroker.net/docu/?page_id=2786&lang=de)中找到。

####名称
如果您之前已经提供了名称，则会在此处显示，并且可以更改。

####位置
此下拉列表显示所有创建的文件夹。目前，它们按照其创建的时间顺序排序。

####引擎类型
在这里，您可以选择使用_javascript_或_coffeescript_引擎。

####日志
右下角是有关所选脚本的所有日志输出的日志窗口。保存/重新启动脚本后会显示日志。

* * *

##提示
###备份
要在出现疑问时恢复脚本，建议通过_Copy和Paste_进行备份。

###测试实例
事实证明，测试新脚本，创建另一个javascript实例并在此实例中启动脚本非常有用。
在脚本名称后面，可以通过下拉列表设置所需的实例。
如果脚本中存在致命错误，则只有此附加测试实例终止，而不是生产实例。

![选择Instance Javascript Adapter](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/screen.jpg)

## Changelog
### 4.1.12 (2019-03-07)
* (bluefox) Schedule was corrected

### 4.1.8 (2019-02-03)
* (jkuehner) Updated the blockly to the latest code
* (bleufox) scriptEnabled variables not only for experts
* (bleufox) fixed one error with "cannot extract blockly"
* (bluefox) GUI fixes
* (bluefox) show problem scripts as yellow pause icon

### 4.0.12 (2019-01-20)
* (Apollon77/AlCalzone) fixes unwanted changes in last version
* (SchumyHao) Add Chinese support

### 4.0.11 (2019-01-14)
* (bluefox) add set/getBinaryState

### 4.0.7 (2018-12-25) Breaking changes - no IE support anymore
* (bluefox) Material UI
* (AlCalzone) monaco javascript editor

### 3.7.0 (2018-05-05)
* (bluefox) Used VM2 as sandbox. The script errors will be caught.
* (bluefox) refactoring: split into many modules
* (AlCalzone) Change TypeScript version range to include TS 3.0+

### 3.6.5 (2019-02-13)
* (bluefox) Error with formatDate was fixed

### 3.6.4 (2018-02-05)
* (bluefox) Pattern error is fixed

### 3.6.3 (2018-01-31)
* (bluefox) Fixing the CSS for CRON dialog
* (bluefox) Fixing the reorder of scripts

### 3.6.1 (2018-01-23)
* (bluefox) Pattern error is fixed

### 3.6.0 (2017-12-28)
* (bluefox) more translations are added
* (bluefox) update blockly engine

### 3.5.1 (2017-11-14)
* (bluefox) fixed: sometimes MSG is not defined
* (AlCalzone) TypeScript support (preparations)
* (bluefox) add sendToHost call
* (bluefox) protect exec call
* (bluefox) add getStateDelayed function

### 3.4.4 (2017-09-12)
* (soef) typo error in line number correction fixed

### 3.4.1 (2017-08-12)
* (soef) patternMatching optimized

### 3.4.0 (2017-08-06)
* (bluefox) Support of new admin

### 3.3.12 (2017-07-24)
* (bluefox) file and line info added to log outputs

### 3.3.11 (2017-07-18)
* (bluefox) fix build CRON block

### 3.3.9 (2017-06-18)
* (bluefox) Add the toggle blockly block

### 3.3.8 (2017-05-22)
* (Apollon77/bluefox) Accept for subscribes arrays of IDs

### 3.3.6 (2017-05-17)
* (bluefox) add the genitive month for formatDate

### 3.3.4 (2017-04-01)
* (bluefox) Catch error by request if host unavailable
* (bluefox) add "request" to script namespace

### 3.3.3 (2017-03-27)
* (bluefox)Fix stopScript

### 3.3.2 (2017-03-18)
* (bluefox) Support of system coordinates

### 3.3.1 (2017-03-15)
 * (bluefox) fix error if no scripts exists

### 3.3.0 (2017-03-14)
* (bluefox) all callbacks in try/catch

### 3.2.8 (2017-03-08)
* (bluefox) Translations

### 3.2.7 (2017-03-03)
* (bluefox) allow creation of states for other javascript instances

### 3.2.6 (2017-02-14)
* (bluefox) Fix import of scripts
* (bluefox) Ask to save before start the script

### 3.2.5 (2017-01-23)
* (bluefox) Extend compareTime function with astro features

### 3.2.4 (2017-01-13)
* (bluefox) fix stopScript

### 3.2.3 (2017-01-05)
* (bluefox) Try to fix error with sayit

### 3.2.2 (2016-12-17)
* (bluefox) Allow with stopScript() to stop itself

### 3.2.1 (2016-11-24)
* (bluefox) Fix error with subscribe for only required states

### 3.2.0 (2016-11-14)
* (bluefox) Fix error with of blocks in adapters
* (bluefox) Support of subscribe for only required states
* (bluefox) add delFile
* (bluefox) fix error with names

### 3.1.0 (2016-10-12)
* (bluefox) Support of blocks in adapters
* (bluefox) Move sendTo blocks into adapters

### 3.0.10 (2016-09-30)
* (bluefox) New blocks: compare time, write state
* (bluefox) Documentation

### 3.0.9 (2016-09-20)
* (bluefox) Bugfixing of blockly

### 3.0.7 (2016-09-09)
* (bluefox) add ack for trigger in blockly
* (bluefox) add block to get info about trigger
* (bluefox) start description of blockly
* (bluefox) add runScript functions
* (bluefox) disable zoom on wheel in blockly
* (bluefox) fix block: time compare

### 3.0.6 (2016-09-07)
* (bluefox) add extendObject function
* (bluefox) add custom sendTo block
* (bluefox) add multiple trigger block

### 3.0.5 (2016-09-03)
* (bluefox) Fix sendTo blocks

### 3.0.4 (2016-09-01)
* (bluefox) Support of convert day of week into text in blockly

### 3.0.3 (2016-08-29)
* (bluefox) Fixed the convert date block

### 3.0.2 (2016-08-28)
* (bluefox) Change name of sandbox debug variable

### 3.0.1 (2016-08-27)
* (bluefox) Fix disabling of script

### 3.0.0 (2016-08-27)
* (bluefox) Beta Release with Blockly

## License

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker