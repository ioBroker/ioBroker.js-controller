---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis/README.md
title: iobroker.vis
hash: tgBZRQnCISMUFyGJBWspfDEkAkS7mZLYgeW/cmKk/6U=
---
![商标](../../../en/adapterref/iobroker.vis/admin/vis.png)

![安装数量](http://iobroker.live/badges/vis-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.vis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis.svg)
![NPM](https://nodei.co/npm/iobroker.vis.png?downloads=true)

＃iobroker.vis ============
iobroker平台的WEB可视化。

##安装和文档
![演示界面](https://github.com/GermanBluefox/DashUI/raw/master/images/user0.png)![演示界面](https://github.com/GermanBluefox/DashUI/raw/master/images/user7.png)

[在线演示](https://iobroker.net:8080)

##对象的绑定
通常，大多数小部件都具有ObjectID属性。并且此属性可以与对象ID的某个值绑定。
但是还有另一种选择如何将widget的* any *属性绑定到某个ObjectID。

只需写入属性§§JJJJJ00§§，它就会被绑定（不是在编辑模式下）到该对象的值。
如果您将使用特殊格式，您甚至可以使用它进行一些简单的操作，例如乘法或格式化。
Patten有以下格式：

```
{objectID;operation1;operation2;...}
```

支持以下操作：

 -  \ *  - 乘以。参数必须在括号中，如“*（4）”。在此示例中，我们将值乘以4。
 -  \ +  - 添加。参数必须在括号中，例如“+（4.5）”。在此示例中，我们添加到值4.5。
- \- - 减去。参数必须在括号中，例如“ - （ -  674.5）”。在此示例中，我们从值-674.5中减去。
 -  /  - 分开。参数必须在括号中，例如“/(0.5)”。在此示例中，我们将值除以0.5。
 - ％ -  modulo。参数必须在括号中，例如“％（5）”。在这个例子中，我们采用5的模数。
 - 围绕价值。
 -  round（N） - 在点之后用N个位置舍入值，例如34.678; round（1）=> 34.7
 - 十六进制 - 将值转换为十六进制值。所有字母都是较低的。
 -  hex2  - 将值转换为十六进制值。所有字母都是较低的。如果值小于16，那么将添加前导零。
 - 十六进制 - 与十六进制相同，但是上部套管。
 -  HEX2  - 与hex2相同，但是上部套管。
 - 日期 - 根据给定格式格式化日期。格式与[iobroker.javascript]中的格式相同（https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate）
 -  min（N） - 如果值小于N，则取N，否则值
 -  max（M） - 如果值大于M，则取M，否则值
 -  sqrt  - 平方根
 -  pow（n） -  N的力量。
 - 战俘 -  2的力量。
 - 楼层 -  Math.floor
 -  ceil  -  Math.ceil
 -  random（R） -  Math.random（）* R，如果没有参数，则只是Math.random（）
 -  formatValue（decimals） - 根据系统设置格式化值并使用小数
 - 日期（格式） - 格式值作为日期。格式如下：“YYYY-MM-DD hh：mm：ss.sss”
 -  array（element1，element2 [，element3，element4]） - 返回索引的元素。例如：{id.ack; array（ack为false，ack为true）}

您可以在任何文本中使用此模式，例如

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

或颜色计算：

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

要在对象id结尾处显示对象的时间戳“.ts”或“.lc”（对于最后一次更改），例如：

```
Last change: {objectRed.lc;date(hh:mm)}
```

写模式还有另一种可能性：

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(h*h + w*w))}
```

```{h:height;w:width;h*w}``` will be interpreted as function:

```

value =（function（）{var h =“10”; var w =“20”;返回Math.max（20，Math.sqrt（h *h + w* w））;}）（）;

```

You can use *any* javascript functions. Arguments must be defined with ':', if not, it will be interpreted as formula.

Take care about types. All of them defined as strings. To be sure, that value will be treated as number use parseFloat function.

```

{height}和{width} = {h：height; w：width; Math.max（20，Math.sqrt（Math.pow（parseFloat（h），2）+ Math.pow（parseFloat（w））的斜边， 2）））}

```

### Special bindings
There are a number different internal bindings to provide additional information in views:
* username - shows logged in user
* view - name of actual view
* wname - widget name
* widget - is an object with all data of widget. Can be used only in JS part, like {a:a;widget.data.name}
* wid - name of actual widget
* language - can be "de", "en" or "ru".
* instance - browser instance
* login - if login required or not (e.g. to show/hide logout button)

Note: to use ":" in calculations (e.g. in string formula) use "::" instead.

**Remember**, that style definitions will be interpreted as bindings, so use ```{{style: value}}``` or just

```

{style：value}

```

for that.**

## Filters
To visualise on the one view thw whole number of widgets you can use filters to reduce the amount of widgets simultaneously shown on the view.

Every widget has a field "filter". If you set it to some value, e.g. "light", so you can use other widget (bars - filters, filter - dropdown) to control which filter is actually active.

## Control interface
Vis creates 3 variables:

- control.instance - Here the browser instance should be written or FFFFFFFF if every browser must be controlled.
- control.data     - Parameter for command. See specific command description.
- control.command  - Command name. Write this variable triggers the command. That means before command will be written the "instance" and "data" must be prepared with data.

Commands:

* alert - show alert window in vis. "control.data" has following format "message;title;jquery-icon". Title and jquery-icon are optional. Icon names can be found [here](http://jqueryui.com/themeroller/). To show icon "ui-icon-info" write ```Message;;info```.
* changeView - switch to desired view. "control.data" must have name of view. You can specify project name too as "project/view". Default project is "main".
* refresh - reload vis, for instance after project is changed to reload on all browsers.
* reload - same as refresh.
* dialog - Show dialog window. Dialog must exist on view. One of:

    - "static    - HTML    - Dialog",
    - "static    - Icon    - Dialog",
    - "container - HTML    - view in jqui Dialog",
    - "container - ext cmd - view in jqui Dialog",
    - "container - Icon    - view in jqui Dialog",
    - "container - Button  - view in jqui Dialog".

    "control.data" must have id of dialog widget, e.g. "w00056".
* dialogClose
* popup - opens a new browser window. Link must be specified in "control.data", e.g. http://google.com
* playSound - play sound file. The link to file is specified in "control.data", e.g. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.
  You can upload your own file in vis and let it play as for instance "/vis.0/main/img/myFile.mp3".

If user changes the view or at start the variables will be filled by vis with

- "control.instance": browser instance and ack=true
- "control.data": project and view name in form "project/view", e.g. "main/view" (and ack=true)
- "control.command": "changedView" and ack=true

You can write the JSON-string or Object into control.command as ```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}```. In this case the instance and data will be taken from JSON object.

## Default view
You can define for every view the desired resolution (Menu=>Tools=>Resolution). This is only the visual border in edit mode to show you the screen size on some specific device. In real time mode it will not be visible and all widgets outside of border will be visible.

Additionally you can define if this view must be used as default for this resolution.

So every time the **index.html** (without #viewName) is called, the best suitable for this resolution view will be opened.
If only one view has *"Default"* flag, so this view will be opened independent from screen resolution or orientation.

E.g. you can create two views "Landscape-Mobile" and "Portrait-Mobile" and these two views will be switched automatically when you change the orientation or screen size.

There is a helper widget "basic - Screen Resolution" that shows actual screen resolution and best suitable default view for this resolution.

## Settings
### Reload if sleep longer than
There is a rule, that after some disconnection period the whole VIS page will be reloaded to synchronise the project.
You can configure it in menu "Settings...". If you set interval to "never" so the page will be never reloaded.

### Reconnect interval
Set the interval between the connection attempts if disconnected. If you will set 2 seconds, it will try to establish the connection every 2 seconds.

### Dark reconnect screen
Sometimes (in the night) it is required to have dark loading screen. With this option you can set it.

Notice that this settings is valid only for reconnection and not for the first connect.

![Dark](../../../en/adapterref/iobroker.vis/img/dark_screen.png)

## Changelog
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
 Copyright (c) 2013-2019 bluefox https://github.com/GermanBluefox <dogafox@gmail.com>,
 
 Copyright (c) 2013-2014 hobbyquaker https://github.com/hobbyquaker
 
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).