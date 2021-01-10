---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.javascript.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.javascript.png?downloads=true
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.javascript/README.md
title: 无题
hash: q3YX1NwfzLQorNQ5+ghfbhwVOMCUE8EAwSl2yvCeKhU=
---
**注意：目前英文版包含更多信息，我们建议您阅读**

javascript适配器用于轻松地创建，编辑和管理脚本。

##配置
[这是关于它的更多信息](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)

![Javascript适配器设置菜单](../../../de/adapterref/iobroker.javascript/img/javascript_Einstellungen-Javascript.png)实际配置包括输入要加载的其他npm模块（以逗号分隔）以及用于各种计算的地理坐标。要获取坐标，您可以例如放大_google maps_并单击所需的位置。然后显示坐标。保存后，仍然必须使用红色的播放按钮激活适配器。

* * *

##服务
在安装过程中，_Admin_界面中将显示另一个_Scripte_选项卡。单击工具栏（红色圆圈）中的（+），在此处创建一个新文件夹。使用脚本左侧的“空白页”图标创建一个新脚本。将打开一个窗口，询问文件夹结构中的名称和存储位置。
![Javascript适配器](../../../de/adapterref/iobroker.javascript/img/javascript_Javascript-Adapter.png)

###文件夹和文件列表
可以根据需要创建文件夹结构。存储位置对脚本的功能没有影响。除了树结构之外，还有一个列表视图。搜索字段使再次查找脚本变得更加容易。为了运行脚本，必须通过单击红色的_Play_按钮在文件夹结构的左侧将其激活。要停止，请按绿色的_Pause_按钮。为每个脚本创建一个新对象。它的脚本名称带有`_enabled`，并且位于文件夹`javascript.Instanz.ScriptEnabled`中。该对象用（`true/false`）显示脚本是否正在运行。还可以设置状态以打开/关闭脚本。 _global_文件夹中保存的脚本是全局脚本。这些是在内部复制到其他脚本之前的，即事先进行了处理。这意味着全局功能可以应用于多个脚本。全局脚本中的变量可以在其他脚本中使用。但请注意：每个脚本都有其自己的可变空间。您不能在全局脚本中使用变量在脚本之间交换值。对象（状态）必须用于此目的。

###编辑
创建后，_Javascript_的编辑器将在右侧打开。可以在[这里](http://www.iobroker.net/docu/?page_id=2786&lang=de)中找到一些示例脚本。

＃＃＃＃ 姓
如果您先前已分配了名称，则该名称将显示在此处并可以更改。

＃＃＃＃ 位置
在此下拉列表中，显示所有创建的文件夹。当前，它们按照创建时的时间顺序排序。

＃＃＃＃ 引擎种类
在这里，您可以选择使用_javascript_还是_coffeescript_引擎。

####日志
右下角是日志窗口，用于输出与所选脚本有关的所有日志。保存/重新启动脚本后，将显示日志。

* * *

＃＃ 提示
###备份
为了能够在不确定的情况下还原脚本，建议使用_Copy＆Paste_对其进行备份。

###测试实例
已经证明自己可以测试新脚本来创建另一个JavaScript实例并在该实例中启动脚本。
可以通过脚本名称后的下拉菜单设置所需的实例。
如果脚本中存在严重错误，则仅此附加测试实例终止，而生产实例不终止。

![选择Javascript适配器的实例](../../../de/adapterref/iobroker.javascript/img/screen.jpg)

## Changelog
### 4.10.8 (2020-12-07)
* (paul53) Corrected `variables.isDayTime`
* (AlCalzone) catch errors during virtual-tsc compile calls
* (Apollon77) Prevent crash case (Sentry)

### 4.10.7 (2020-12-03)
* (Apollon77) Prevent crash case (Sentry IOBROKER-JAVASCRIPT-4Q)
* (paul53) Corrected `variables.isDayTime`

### 4.10.6 (2020-12-01)
* (AlCalzone) TypeScripts which augment the global scope are now correctly compiled
* (AlCalzone) If no type declarations are found for an installed package, `require` will no longer show the error "module not found"
* (AlCalzone) Removed the `--prefix` argument in `npm install`, so package installations on Windows no longer mess up the install directory
* (bluefox) Corrected the set of the binary state

### 4.10.5 (2020-11-15)
* (bluefox) null timeouts are checked now

### 4.10.4 (2020-11-09)
* (bluefox) null timeouts are checked now
* (AlCalzone) Correction for the typescript with async functions

## License

The MIT License (MIT)

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker