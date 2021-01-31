---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: J96EEfhXaMPbFj1J6CUCiIB2CbfhWhEyF1gfJdaKe8A=
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
使用此适配器，您可以获取有关[公制时间](https://haus-auto.com/p/amz/LaMetricTime)*（会员链接）*的状态信息，并向其发送通知。
您需要的只是设备的IP地址和api开发人员密钥。

##配置
经LaMetric固件* 2.1.3 *测试（推荐）

您可以获取个人密钥[这里](https://developer.lametric.com/)。

![api键](../../../en/adapterref/iobroker.lametric/docs/apiKey.png)

＃＃ 产品特点
-设置显示亮度（百分比，自动模式/手动模式）
-设置音量（百分比）
-配置屏幕保护程序（启用/禁用，基于时间，黑暗时）
-激活/停用蓝牙并更改蓝牙名称
-在应用之间切换（下一个，上一个，转到特定的应用）
-以块状发送通知（具有可配置的优先级，声音，图标，文本等）
-控制时钟，收音机，秒表或天气等特殊应用
-使用*我的数据（DIY）* LaMetric App显示永久信息

功能受[官方API功能](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html)的限制。

##大量示例
您可以使用简单的字符串作为消息，将其显示为单个框架

![单帧](../../../en/adapterref/iobroker.lametric/docs/blockly1.png)

要显示多个框架，您还可以提供一个数组作为消息

![多帧](../../../en/adapterref/iobroker.lametric/docs/blockly2.png)

如果要使用图表框架，则必须指定一个数字数组作为框架

![图表数据框](../../../en/adapterref/iobroker.lametric/docs/blockly3.png)

##我的数据（DIY）*（版本> 1.1.0）*
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

###框架配置*（版本> 1.1.0）*
-使用加号图标可以添加任意数量的帧
-图标：从[官方网站]（https://developer.lametric.com/icons）中选择一个图标，然后将ID放在配置字段中。 **重要提示：添加一个i（用于静态图标）或a（用于动画图标）作为该ID的前缀。 （例如：“ i3389”）
-文字：只需输入框架的文字信息即可。您可以在花括号中使用状态。这些信息将被替换为状态的相应值。 （例如：“ {youtube.0.channels.HausAutomatisierungCom.statistics.subscriberCount}订阅者”）

2帧的示例配置：

![示例框架配置](../../../en/adapterref/iobroker.lametric/docs/myDataDIYConfig.png)

##特殊应用/小部件*（版本> 1.1.2）*
您可以使用自定义信息控制某些应用

### Clock.clockface
允许的值为：

-“天气”，“ page_a_day”，“自定义”或“无”之一
-格式为`data：image / png; base64，<base64编码的png二进制>或`data：image / gif; base64，<base64编码的gif二进制>的自定义图标数据

示例：`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYlWNUVFBgwAeYcEncv//gP04FMEmsCmCSiooKjHAFMEF0SRQTsEnCFcAE0SUZGBgYGAl5EwA+6RhuHb9bggAAAABJRU5ErkJggg==`

### Countdown.configure
允许的值：以秒为单位的时间

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

### 1.2.0

* (klein0r) Added hide if value for My Data (DIY)
* (klein0r) Remove frames without text from My Data (DIY)
* (klein0r) Allow dynamic states for My Data (DIY) icons

### 1.1.3

* (klein0r) Fixed async object creation

### 1.1.2

* (klein0r) Delete app channels if app was deleted on LaMetric
* (klein0r) Custom app configuration (clockface, countdown duration)

### 1.1.1

* (klein0r) Fixed replacement issue for My Data (DIY)
* (klein0r) Updated README with more configuration details

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

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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