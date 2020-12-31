---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: E8hfa7y3//Kfs8SjeMmyRcbVD3YYRXY1duPScutpZG4=
---
![商标](../../../en/adapterref/iobroker.lametric/admin/lametric.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.lametric.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.lametric.svg)
![稳定](http://iobroker.live/badges/lametric-stable.svg)
![已安装](http://iobroker.live/badges/lametric-installed.svg)
![依赖状态](https://img.shields.io/david/klein0r/iobroker.lametric.svg)
![已知漏洞](https://snyk.io/test/github/klein0r/ioBroker.lametric/badge.svg)
![建立状态](http://img.shields.io/travis/klein0r/ioBroker.lametric.svg)
![NPM](https://nodei.co/npm/iobroker.lametric.png?downloads=true)

＃ioBroker.lametric
该适配器使您可以获取有关LaMetric Time的状态信息，并向其发送通知。
您需要的只是设备的IP地址和api开发人员密钥。

##配置
经LaMetric固件* 2.0.28 *和* 2.1.2 *测试（推荐）

您可以获取个人密钥[这里](https://developer.lametric.com/)。

![api键](../../../en/adapterref/iobroker.lametric/docs/apiKey.png)

##用法
您可以在此处阅读有关通知的更多信息：https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html

＃＃ 特征
-设置显示亮度（百分比，自动模式/手动模式）
-设置音量（百分比）
-配置屏幕保护程序（启用/禁用，基于时间，黑暗时）
-激活/停用蓝牙并更改蓝牙名称
-在应用之间切换（下一个，上一个，转到特定的应用）
-发送块状通知（具有可配置的优先级，声音，图标，文本等）
-控制特殊的应用程序，例如收音机，秒表和天气

功能受[官方API功能](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html)的限制。

##大量示例
您可以使用简单的字符串作为消息，将其显示为单个框架

![单帧](../../../en/adapterref/iobroker.lametric/docs/blockly1.png)

要显示多个框架，您还可以提供一个数组作为消息

![多帧](../../../en/adapterref/iobroker.lametric/docs/blockly2.png)

如果要使用图表框架，则必须指定一个数字数组作为框架

![图表数据框](../../../en/adapterref/iobroker.lametric/docs/blockly3.png)

##我的数据（DIY）
LaMetric提供了一个应用程序（在集成应用程序市场上）以轮询自定义数据。这个程序叫做[我的数据DIY](https://apps.lametric.com/apps/my_data__diy_/8942)。该适配器以所需格式创建新状态。
您可以使用简单API适配器将数据传输到LaMetric Time。

```ioBroker LaMetric Adapter -> State with Frame information <- Simple API Adapter <- My Data DIY App <- LaMetric```

###配置（带有身份验证）
1.安装[Simple API ioBroker适配器]（https://github.com/ioBroker/ioBroker.simple-api）
2.使用自定义密码（例如HhX7dZl3Fe）创建一个名为“ lametric”的新ioBroker用户
3.将“ lametric”用户添加到“ users”组中
4.在LaMetric Time上安装此* My Data DIY *应用程序（使用市场）
5.打开*我的数据（DIY）*应用设置，并配置简单的api网址（请参见下文）
6.转到适配器配置，并使用您的自定义信息（图标和文本）配置框架

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?&user=lametric&pass=HhX7dZl3Fe
```

**如有必要，请确保更新URL中的IP，端口，用户和密码！**

###配置（无身份验证）
1.安装[Simple API ioBroker适配器]（https://github.com/ioBroker/ioBroker.simple-api）
2.在您的LaMetric Time上安装此* My Data DIY *应用程序（使用市场）
3.打开*我的数据（DIY）*应用设置，并配置简单的api网址（请参见下文）
4.转到适配器配置，并使用您的自定义信息（图标和文本）配置框架

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/
```

**如有必要，请确保更新URL中的IP和端口！**

##脚本
要在您的公制上显示消息，只需使用脚本适配器将消息发送到该实例：

```JavaScript
sendTo(
    "lametric.0",
    "notification",
    {
        priority: "[info|warning|critical]",
        iconType: "[none|info|alert]",
        sound: "<string from sound list>",
        lifeTime: <milliseconds>,
        icon: "<icon>",
        text: "<string|array>",
        cycles: <integer>
    }
);
```

单帧示例：

```JavaScript
sendTo(
    "lametric.0",
    "notification",
    {
        priority: "info",
        iconType: "none",
        sound: "cat",
        lifeTime: 5000,
        icon: "i31820",
        text: "test",
        cycles: 1
    }
);
```

多帧示例：

```JavaScript
sendTo(
    "lametric.0",
    "notification",
    {
        priority: "info",
        iconType: "none",
        sound: "cat",
        lifeTime: 5000,
        icon: "i31820",
        text: ["frame 1", "frame 2", "frame 3"],
        cycles: 1
    }
);
```

显示一些循环信息的示例：

```JavaScript
let i = 0;
function show() {
    console.log('Show ' + i);
    sendTo(
        "lametric.0",
        "notification",
        {
            priority: "info",
            iconType: "info",
            lifeTime: 5000,
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAAySURBVBhXY4AAYdcKk1lngCSUDwHIfAQbzgLqgDCgIqRLwFkQCYQoBAD5EATl4wQMDADhuxQzaDgX0gAAAABJRU5ErkJggg==",
            text: "Hi " + i,
            cycles: 1
        }
    );
    i++;
}
setInterval(show, 10000);
show();
```

## Changelog

### 1.1.0

* (klein0r) Added support for My Data (DIY)

### 1.0.1

* (klein0r) Added chart data support to notification

### 1.0.0

* (klein0r) First stable release
* (klein0r) Added iobroker sentry
* (klein0r) Added brightness and volume limit information (min, max)

### 0.0.10

* (klein0r) Switched to axios lib

### 0.0.9

* (klein0r) Added missing translations
* (GermanBluefox) Improved Blockly and main.js

### 0.0.8

* (klein0r) Updated dependencies

### 0.0.7

* (klein0r) fixed blockly

### 0.0.6

* (klein0r) switched to setTimeout instead of setInterval, improved logging and fixes eslint complaints

### 0.0.5

* (klein0r) Fixed notification, html, updated github template, enable and disable screensaver

### 0.0.4

* (klein0r) Refactored blockly sendTo / notifications

### 0.0.3

* (klein0r) Added app switching support, refactored everything
* (bluefox) The deletion of the actual shown information was added

### 0.0.2

* (Sigi74) Change message_value for variables message
* (Sigi74) Leave sound none

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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