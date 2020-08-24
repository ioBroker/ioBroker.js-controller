---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mobile/README.md
title: ioBroker.mobile
hash: UeI6kCqqBtJl00cXKLlIqsbY28eCGpbRXhiiiZNxsCg=
---
![商标](../../../en/adapterref/iobroker.mobile/admin/mobile.png)

![安装数量](http://iobroker.live/badges/mobile-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mobile.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mobile.svg)
![NPM](https://nodei.co/npm/iobroker.mobile.png?downloads=true)

＃ioBroker.mobile
基于jQuery Mobile的用户界面。

![屏幕](../../../en/adapterref/iobroker.mobile/img/screen.png)

##用法
要使用移动用户界面，您需要在admin中创建逻辑结构。

例如：转到标签“枚举”并创建新的枚举，例如“海关”。
![滑杆](../../../en/adapterref/iobroker.mobile/img/starting1.png)

在“ enum.customs”中创建新的枚举组，例如“控件”![滑杆](../../../en/adapterref/iobroker.mobile/img/starting2.png)

将一些状态添加到“ enum.customs.controls”中![滑杆](../../../en/adapterref/iobroker.mobile/img/starting3.png)

![滑杆](../../../en/adapterref/iobroker.mobile/img/starting4.png)

转到移动页面，按“信息”（右上），然后按“刷新”以从ioBroker![滑杆](../../../en/adapterref/iobroker.mobile/img/starting5.png)中加载对象

重新加载后，您可以转到“海关=>控件”![滑杆](../../../en/adapterref/iobroker.mobile/img/starting6.png)

##支持的类型
###滑块：
![滑杆](../../../en/adapterref/iobroker.mobile/img/widget-slider.png)

    -角色=“ level.dimmer”
    -角色=“ level.blind”
    -角色由“级别”，common.type为“数字”，common.write为“ true”和common.max定义
    -common.type =“ number”，common.write为“ true”，并定义了common.max

例：

```
{
  "_id": "javascript.0.mobile.inputSlider",
  "type": "state",
  "common": {
    "name": "Slider",
    "type": "number",
    "read": true,
    "write": true,
    "min": 0,
    "max": 100
  },
  "native": {}
}
```

###按钮（必须通过编辑模式显式设置为可见）：
![纽扣](../../../en/adapterref/iobroker.mobile/img/widget-button.png)

    -角色由“按钮”组成
    -角色由“动作”组成

默认情况下，按钮是不可见的。如果按下，它们只会写“ true”。

例：

```
{
  "_id": "javascript.0.mobile.inputButton",
  "type": "state",
  "common": {
    "name": "Button",
    "role": "button",
    "type": "boolean",
    "write": true
  },
  "native": {}
}
```

###开关：
![开关](../../../en/adapterref/iobroker.mobile/img/widget-switch.png)

    -common.type =“ boolean”，common.write为“ true”

例：

```
{
  "_id": "javascript.0.mobile.inputSwitch",
  "type": "state",
  "common": {
    "name": "Switch",
    "type": "boolean",
    "write": true
  },
  "native": {}
}
```

###设置输入字段：
![输入栏](../../../en/adapterref/iobroker.mobile/img/widget-input-number.png)

    -common.type =“ number”，common.max未定义，common.write为“ true”，common.states未定义

例：

```
{
  "_id": "javascript.0.mobile.inputNumber",
  "type": "state",
  "common": {
    "name": "Number",
    "type": "number",
    "write": true
  },
  "native": {}
}
```

###设置状态：
![状态](../../../en/adapterref/iobroker.mobile/img/widget-value-states.png)

    -common.type =“ number”，common.max未定义，common.write为“ true”，common.states已定义

例：

```
{
  "_id": "javascript.0.mobile.inputNumber",
  "type": "state",
  "common": {
    "name": "Number",
    "type": "number",
    "write": true,
    "states": {
          "1": "Value 1",
          "2": "Value 2"
        }
  },
  "native": {}
}
```

###显示布尔值：
![布尔值](../../../en/adapterref/iobroker.mobile/img/widget-value-boolean.png)

    -common.write为“ false”，common.type为“ boolean”

例：

```
{
  "_id": "javascript.0.mobile.valueBoolean",
  "type": "state",
  "common": {
    "name": "Boolean value",
    "type": "bolean"
  },
  "native": {}
}
```

###显示值：
![数值](../../../en/adapterref/iobroker.mobile/img/widget-value-number.png)

    -common.write为“ false”，common.type不是“ boolean”

例：

```
{
  "_id": "javascript.0.mobile.valueNumber",
  "type": "state",
  "common": {
    "name": "Number value",
    "type": "number",
    "unit": "%"
  },
  "native": {}
}
```

＃＃ 去做：
-编辑图标
-显示带有更多图标的小部件
-平板电脑视图

## Changelog
### 1.0.1 (2020-08-22)
* (bluefox) The compatibility to socket.io 3.0.13 provided

### 1.0.0 (2019-01-30)
* (ldittmar) Add translations
* (ldittmar) Some fixes

### 0.5.0 (2019-01-24)
* (Hirsch-DE) The multilingual names were fixed

### 0.4.12 (2017-11-14)
* (Apollon77) update adapter type

### 0.4.11 (2017-07-12)
* (BasGo) Fixed blind states

### 0.4.10 (2016-11-08)
* (bluefox) Better cloud support

### 0.4.9 (2016-10-29)
* (bluefox) Fix rooms rendering
* (bluefox) add green, red, blue, white types

### 0.4.8 (2016-10-09)
* (bluefox) implement type blind

### 0.4.7 (2016-09-10)
* (bluefox) make narrow screen on wide displays
* (bluefox) fix some widgets

### 0.4.6 (2016-09-03)
* (bluefox) support of custom images
* (bluefox) fix input number and select value

### 0.4.5 (2016-07-01)
* (bluefox) fix open first page

### 0.4.4 (2016-06-24)
* (bluefox) reload if problems occur

### 0.4.3 (2016-06-24)
* (bluefox) just check invalid objects

### 0.4.2 (2016-06-14)
* (bluefox) update version number

### 0.4.1 (2016-05-12)
* (bluefox) fix control of logical states

### 0.4.0
* (bluefox) add theme switcher

### 0.3.0
* (bluefox) fix problem with room names with spaces
* (bluefox) implement side panel

### 0.2.2
* (bluefox) fix locations in edit mode
* (bluefox) enable visibility of indicators

### 0.2.1
* (bluefox) fix some errors

### 0.2.0
* (bluefox) sorting and edit name

### 0.1.1
* (bluefox) fix errors for some devices

### 0.1.0
* (bluefox) edit of visibility

### 0.0.4
* (bluefox) first version. No edit possible.

## License
The MIT License (MIT)

Copyright (c) 2015-2019 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.