---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis/README.md
title: 可视化
hash: xlDe+wAangAnbtsUYPvfwibsxkyTKWDgAO/nN7jD3tw=
---
![商标](../../../en/adapterref/iobroker.vis/admin/vis.png)

![安装数量](http://iobroker.live/badges/vis-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.vis.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vis.svg)
![NPM](https://nodei.co/npm/iobroker.vis.png?downloads=true)

＃可视化
ioBroker平台的Web可视化。

##安装与说明文件
![演示界面](img/user0.png)![演示界面](../../../en/adapterref/iobroker.vis/img/user7.png)

[在线演示](https://iobroker.click/)

##对象绑定
通常，大多数小部件都具有ObjectID属性。并且此属性可以与对象ID的某些值绑定。
但是还有另一种选择如何将窗口小部件的* any *属性绑定到某个ObjectID。

只需写入属性```{object.id}```§中，它将绑定到该对象的值（不在编辑模式下）。
如果您要使用特殊格式，甚至可以使用它进行一些简单的操作，例如乘法或格式化。
Patten具有以下格式：

```
{objectID;operation1;operation2;...}
```

支持以下操作：

-`\ *`-相乘。参数必须放在方括号中，例如“ *（4）”。在此示例中，我们将值乘以4。
-`\ +`-添加。参数必须放在方括号中，例如“ +（4.5）”。在此示例中，我们将值添加为4.5。
-`\ -`-减去。参数必须放在方括号中，例如“-（-674.5）”。在此样本中，我们从值-674.5中减去。
-`/`-除法。参数必须放在方括号中，例如“ /(0.5）”。在此示例中，我们将值除以0.5。
-`％`-取模。参数必须放在方括号中，例如“％（5）”。在此示例中，我们取模5。
-`round`-取整值。
-`round（N）`-将值四舍五入到点后N个位置，例如34.678; round（1）=> 34.7
-`hex`-将值转换为十六进制值。所有字母均小写。
-`hex2`-将值转换为十六进制值。所有字母均小写。如果值小于16，则将添加前导零。
-`HEX`-与十六进制相同，但大写。
-`HEX2`-与hex2相同，但大写。
-`date`-根据给定的格式格式化日期。格式与[iobroker.javascript]（https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate）中的格式相同
-`min（N）`-如果值小于N，则取N，否则取N
-`max（M）`-如果值大于M，则取M，否则取M
-`sqrt`-平方根
-`pow（n）`-N的幂。
-`pow`-2的幂。
-`floor`-Math.floor
-`ceil`-Math.ceil
-`random（R）`-Math.random（）* R，或者如果没有参数则只是Math.random（）
-`formatValue（decimals）`-根据系统设置格式化值并使用小数
-`date（format）`-将值格式化为日期。格式如下：“ YYYY-MM-DD hh：mm：ss.sss”
-`array（element1，element2 [，element3，element4]）`-返回索引的元素。例如：`{id.ack; array（ack为假，ack为真）}}

您可以在任何文本中使用此模式，例如

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

或颜色计算：

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

要显示对象的时间戳记，请在对象ID的末尾写入`.ts`或`.lc`（用于最后更改），例如：

```
Last change: {objectRed.lc;date(hh:mm)}
```

还有另一种写模式的可能性：

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(h*h + w*w))}
```

`{h:height;w:width;h*w}`将被解释为功能：

```
value = (function () {
    var h = "10";
    var w = "20";
    return Math.max(20, Math.sqrt(h*h + w*w));
})();
```

您可以使用* any * JavaScript函数。参数必须用'：'定义，否则，将被解释为公式。

注意类型。它们都定义为字符串。可以肯定的是，使用parseFloat函数将该值视为数字。

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

###特殊绑定
有许多不同的内部绑定可在视图中提供其他信息：

*`username`-显示已登录的用户
*`view`-实际视图的名称
*`wname`-小部件名称
*`widget`-是具有小部件所有数据的对象。只能在JS部分中使用，例如{{a：a; widget.data.name}`
*`wid`-实际小部件的名称
*`language`-可以是`de`，`en`或`ru`。
*`instance`-浏览器实例
*`login`-是否需要登录（例如显示/隐藏注销按钮）

注意：要在计算中使用“：”（例如在字符串公式中），请使用“ ::”。

**请记住**，样式定义将被解释为绑定，因此请使用`{{style: value}}`或仅

```
{
	style: value
}
```

为了那个原因。

##过滤器
要在一个视图上可视化所有小部件的数量，可以使用过滤器减少视图上同时显示的小部件的数量。

每个窗口小部件都有一个字段`filter`。如果您将其设置为某个值，例如`light`，因此您可以使用其他小部件`(bars - filters, filter - dropdown)`来控制哪个过滤器实际处于活动状态。

##控制界面
Vis创建3个变量：

-`control.instance`-如果必须控制每个浏览器，则此处应编写浏览器实例或FFFFFFFF。
-`control.data`-命令参数。请参阅特定的命令描述。
-`control.command`-命令名称。编写此变量将触发命令。这意味着在写入命令之前，“实例”和“数据”必须与数据一起准备。

命令：

*`alert`-显示可见的警报窗口。 “ control.data”具有以下格式“ message; title; jquery-icon”。标题和jquery-icon是可选的。图标名称可以在[here]（http://jqueryui.com/themeroller/）中找到。要显示图标“ ui-icon-info”，请写“ Message ;; info`”。
*`changeView`-切换到所需的视图。 “ control.data”必须具有视图名称。您也可以将项目名称指定为“项目/视图”。默认项目为“ main”。
*`refresh`-重新加载，例如在将项目更改为在所有浏览器上重新加载后。
*`reload`-与刷新相同。
*`dialog`-显示对话框窗口。对话框必须存在于视图中。之一：

    -`static-HTML-对话框`，
    -`static-图标-对话框`，
    -`container-HTML-在jqui对话框中查看，
    -`container-ext cmd-在jqui对话框中查看，
    -`container-Icon-在jqui对话框中查看，
    -`容器-按钮-在jqui对话框中查看。

    `control.data`必须具有对话框小部件的ID，例如`w00056`。

*`dialogClose`
*`popup`-打开一个新的浏览器窗口。链接必须在`control.data`中指定，例如http://google.com
*`playSound`-播放声音文件。文件的链接在`control.data`中指定，例如http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3。

  您可以在vis中上传自己的文件，并使其像`/vis.0/main/img/myFile.mp3`那样播放。

如果用户更改视图或在开始时，变量将由vis填充

-`control.instance`：浏览器实例和`ack = true`
-`control.data`：以`project / view`形式的项目和视图名称，例如`main / view`（和`ack = true`）
-`control.command`：`changedView`和`ack = true`

您可以将JSON字符串或对象作为`{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`写入control.command中。在这种情况下，实例和数据将从JSON对象获取。

JavaScript适配器示例：

```
setState('vis.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

＃＃ 默认视图
您可以为每个视图定义所需的分辨率（菜单=>工具=>分辨率）。这只是在编辑模式下的可视边框，可显示特定设备上的屏幕尺寸。在实时模式下，它将不可见，并且边框外的所有小部件都将可见。

此外，您可以定义是否必须将此视图用作该分辨率的默认视图。

因此，每次调用`index.html`（不包含`#viewName`）时，都会打开最适合此分辨率视图的视图。
如果只有一个视图带有*“ Default” *标志，那么将独立于屏幕分辨率或方向打开此视图。

例如。您可以创建两个视图“ Landscape-Mobile”和“ Portrait-Mobile”，并且当您更改方向或屏幕尺寸时，这两个视图将自动切换。

有一个帮助器小部件“基本-屏幕分辨率”，它显示实际屏幕分辨率和最适合该分辨率的默认视图。

##设置
###如果睡眠时间超过
有一条规则是，在断开连接一段时间后，将重新加载整个VIS页面以同步项目。
您可以在菜单“设置...”中对其进行配置。如果将时间间隔设置为“从不”，则将永远不会重新加载页面。

###重新连接间隔
设置断开连接之间的尝试间隔时间。如果设置为2秒，它将尝试每2秒建立一次连接。

###黑暗重新连接屏幕
有时（夜间），需要具有黑暗的加载屏幕。使用此选项可以进行设置。

请注意，此设置仅对重新连接有效，而对第一次连接无效。

![暗](../../../en/adapterref/iobroker.vis/img/dark_screen.png)

## Changelog
### 1.2.3 (2019-12-14)
* (bluefox) Small changes in license handling were made

### 1.2.2 (2019-10-27)
* (bluefox) Preparations for js-controller 2.0. Check undefined adn null.

### 1.2.1 (2019-09-10)
* (bluefox) fixed upload of files

### 1.2.0 (2019-05-07)
* (bluefox) add translations

### 1.1.11 (2019-02-07)
* (bluefox) improve Bool HTML

### 1.1.10 (2019-01-30)
* Add Chinese support

### 1.1.8 (2018-10-29)
* (bluefox) File dialog was corrected

### 1.1.7 (2018-07-24)
* (bluefox) view8 corrected

### 1.1.6 (2018-07-18)
* (bluefox) support of new variables (see [Special bindings](#special-bindings) )
* (bluefox) fix error if fast view changes
* (bluefox) fix "jqui - ctrl - IconState / val - Icon Bool"

### 1.1.5 (2018-06-10)
* (bluefox) show more information if widget cannot be rendered
* (bluefox) fix saving of widgets if they have bindings
* (bluefox) show error stack
* (bluefox) fix binding
* (Apollon77) fix testing
* (bluefox) fix for iobroker.pro and external socket.io settings
* (bluefox) A user variable was added into bindings.
* (bluefox) Fixed widget tabs

### 1.1.4 (2018-04-23)
* (bluefox) fix bool SVG

### 1.1.3 (2018-04-12)
* (bluefox) ignore click by scrolling on touch devices
* (bluefox) remove wrong state vis.0.command
* (bluefox) fix error with jplot
* (bluefox) better widget behaviour in edit Mode (basic, jqui)
* Fix config dialog

### 1.1.2 (2018-02-02)
* (bluefox) Fixing the saving of project
* (bluefox) Fixing the background selector
* (bluefox) Fixing the null pointer problem
* (bluefox) Fixing the selection helper
* Update translations

### 1.1.1 (2018-01-07)
* (bluefox) The problem with view change on the touch devices fixed

### 1.0.5 (2017-11-19)
* (bluefox) show number of datapoints in every project

### 1.0.4 (2017-10-22)
* (bluefox) Add autocomplete for view CSS options
* (bluefox) change edit of view CSS background options

### 1.0.3 (2017-10-20)
* (bluefox) Fix parse of invalid bindings
* (bluefox) add moment.js

### 1.0.0 release candidate (2017-10-13)
* (bluefox) fix iframe and image updates
* (bluefox) fix fonts

### 0.15.7 (2017-10-01)
* (bluefox) allow update of images without additional query (but it works only in spome very specific cases)
* (bluefox) zoom of iframes

### 0.15.5 (2017-07-24)
* (bluefox) Fix widgets upload

### 0.15.4 (2017-07-19)
* (bluefox) Add swipe

### 0.15.3 (2017-07-12)
* (bluefox) Add full screen widget
* (bluefox) Fix timestamp widget

### 0.15.2 (2017-07-07)
* (bluefox) Fix binding if it has "-" in the OID

### 0.15.1 (2017-06-30)
* (bluefox) Fix error with context menu
* (bluefox) Allow add class to view

### 0.15.0 (2017-05-25)
* (bluefox) fix copy of grouped widgets
* (bluefox) fix subscribe if empty states

### 0.14.7 (2017-05-19)
* (bluefox) add templates

### 0.14.6 (2017-05-16)
* (bluefox) Fix error by groups selection
* (apollon77) fix jqui-dialog for auto-open

### 0.14.3 (2017-05-11)
* (bluefox) fix export/import of groupped widgets

### 0.14.2 (2017-04-29)
* (bluefox) Fix install error

### 0.14.1 (2017-04-27)
* (bluefox) move beta to main
* (bluefox) fix choose filter
* (bluefox) fix error if some views do not exist
* (bluefox) fix binding problem, e.g. "a:-45?0" was detected as variable too.
* (bluefox) fix some font sizes
* (bluefox) fix undo
* (bluefox) fix themes change
* (bluefox) optimize load of pages
* (bluefox) check license
* (bluefox) fix basic views 8
* (bluefox) fix time picker if opened in dialog

### 0.14.0 (2017-04-10)
* (bluefox) add mandatory license input

### 0.12.7 (2017-02-09)
* (bluefox) prepare beta

### 0.12.6 (2017-01-29)
* (pmant) fix view copy
* (pmant) Improvements to context menu
* (pmant) usability improvements for both view dropdowns
* (bluefox) small fix of dragging

### 0.12.6 (2017-01-29)
* (pmant) add dropdown menu to views bar
* (pmant) sort widgets widget selector by name
* (bluefox) fix groupAttr in signals and visibility

### 0.12.2 (2016-12-04)
* (bluefox) fix errors with grouping

### 0.12.1 (2016-11-30)
* (bluefox) fix errors with containers

### 0.12.0 (2016-11-24)
* (bluefox) subscribe mode for faster state loading
* (bluefox) add grouping

### 0.10.15 (2016-11-06)
* (bluefox) remove weather-adapter.html
* (bluefox) clean config.js
* (bluefox) remove old widgets
* (bluefox) improve authentication in app
* (bluefox) allow creation of instance from helper widget

### 0.10.14 (2016-10-09)
* (bluefox) fix rendering of widgets
* (bluefox) working on relative positions.
* (bluefox) destroy widgets before views deletion

### 0.10.13 (2016-09-23)
* (bluefox) fixed errors for iPad 1
* (bluefox) start wokring on relative positions

### 0.10.12 (2016-09-16)
* (bluefox) group specific visibility of widgets and views

### 0.10.11 (2016-09-15)
* (bluefox) fix for iOS 10
* (bluefox) allow disabling of groups for performance

### 0.10.10 (2016-09-14)
* (bluefox) add text2speech widget
* (bluefox) try to fix problem with iOS 10

### 0.10.9 (2016-09-04)
* (bluefox) support of web-sockets force
* (bluefox) destory unused views after 30 seconds
* (bluefox) do not show middle leading lines if top and bottom are shown
* (bluefox) let timestamp and lastchange to show time as interval

### 0.10.7 (2016-07-09)
* (bluefox) add settings to reload vis
* (bluefox) add dark reload screen
* (bluefox) fix reload interval
* (bluefox) export/import
* (bluefox) add global script
* (bluefox) add 'not exist'/'not consist'/'exist' to signal and visibility
* (bluefox) fix oids in editor

### 0.10.5 (2016-06-15)
* (bluefox) fix select ID dialog
* (bluefox) add align help lines
* (bluefox) never store data in non-edit mode

### 0.10.4 (2016-06-14)
* (bluefox) fix drag and resize
* (Patrick) fix QuoJS
* (bluefox) support of milliseconds in formatDate
* (bluefox) support of getHistory
* (bluefox) support of show history instances
* (bluefox) grid
* (bluefox) add previews

### 0.10.3 (2016-05-30)
* (bluefox) update canJS
* (pmant) fixes bugs with dialogs on touchscreens
* (bluefox) speedUP show attributes at 300ms
* (bluefox) fix click on widget if signal is active

### 0.10.2 (2016-05-24)
* (bluefox) fix widgets with timestamps

### 0.10.1 (2016-05-23)
* (bluefox) change version

### 0.10.0 (2016-05-23)
* (bluefox) translates
* (bluefox) fix 'no widgets selected'
* (bluefox) change widget icons
* (bluefox) add signals
* (bluefox) add app.css for cordova
* (bluefox) change icons preview
* (bluefox) show properties of widget as icon
* (bluefox) fix error with external commands
* (bluefox) add types icon to preview
* (bluefox) support edit on iPad1
* (bluefox) change security settings

## License
 Copyright (c) 2013-2019 bluefox, https://github.com/GermanBluefox <dogafox@gmail.com>,
 
 Copyright (c) 2013-2014 hobbyquaker, https://github.com/hobbyquaker <hobbyquaker@gmail.com>,
 
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).