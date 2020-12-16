---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cloud/README.md
title: ioBroker云适配器
hash: A8annnfqo+2LZ6Y9DTgNkQyzH8xSq6lZ3iJ1cNVu2Ng=
---
![商标](../../../en/adapterref/iobroker.cloud/admin/cloud.png)

![安装数量](http://iobroker.live/badges/cloud-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.cloud.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.cloud.svg)
![NPM](https://nodei.co/npm/iobroker.cloud.png?downloads=true)

＃ioBroker云适配器
该适配器允许通过ioBroker云从Internet连接到ioBroker的本地安装。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

##设置
### APP-KEY
要使用云适配器，您应该首先在[https://iobroker.net](https://iobroker.net)上获得APP-Key。

这是用户可以在[https://iobroker.net](https://iobroker.net)站点上获得的应用程序密钥。请在那里获取密钥并在此处输入。

![介绍](../../../en/adapterref/iobroker.cloud/img/intro.png)

###实例
来自云适配器的所有请求将被路由到某些WEB实例。用户必须在此处指定登录到https://iobroker.net站点时将显示给用户的WEB实例。

###允许自签名证书
如果您使用标准的iobroker.net云，则可以将其停用。仅当使用自己的云时，此选项才重要。

### Alexa设置
***`cloud`适配器不再支持Alexa。为此使用ioBroker.iot适配器。***

## IFTTT
[指示](doc/ifttt.md)

＃＃ 服务
可以将消息发送到云适配器。
如果将```[POST]https://iobroker.net/service/custom_<NAME>/<user-app-key>```und值称为有效负载。

```
curl --data "myString" https://iobroker.net/service/custom_test/<user-app-key>
```

如果在设置中将“服务白名单”字段设置为名称* custom_test *，并使用“ custom_test”作为服务名称进行调用，则状态cloud / 0.services.custom_test将设置为myString *。

您可以在白名单中写上“ *”，然后将允许所有服务。

从2.0.5版开始，您可以使用```[GET]https://iobroker.net/service/custom_<NAME>/<user-app-key>/<data>```格式的GET请求来放置** \<data\> **进入** cloud.0.services.custom_ \<NAME\> **。

在这里，您可以找到有关如何与[任务者](doc/tasker.md)一起使用的说明。

仅当设置了IFTTT密钥时，才允许IFTTT服务。

保留名称为“ ifttt”，“ text2command”，“ simpleApi”，“ swagger”。必须在没有```"custom_"```前缀的情况下使用它们。

### Text2command
您可以在白名单中写入“ text2command”，可以将POST请求发送到```https://iobroker.net/service/text2command/<user-app-key>```以将数据写入* text2command.X.text *变量。

可以通过“使用text2command实例”选项在设置中定义“ X”。

### SimpleApi
您可以使用以下命令（仅限专业人士）：

-```[GET] https://iobroker.pro/service/simpleApi/ <user-app-key> / get / stateID```-读取状态值=>`{“ val”：103.516，“ ack “：true，” ts“：1604132484682，” q“：0，”来自“：” system.adapter.admin.0“，” lc“：1604132469672，”结果“：” OK“}
-```[获取] https://iobroker.pro/service/simpleApi/ <user-app-key> / getPlainValue / stateID``-读取状态值=>`103.641`
-```[GET] https://iobroker.pro/service/simpleApi/ <user-app-key> / set / stateID？value = 1''`-设置状态值=>`{“结果”： “确定”}`

**不要忘记将`simpleApi`添加到配置中允许的服务中。**

###局限性
如果在已定义的Web实例上启用了HTTPs（安全性）或身份验证，则它将不起作用。

您可以在这些Web实例上停用HTTPS和身份验证，但更好的方法是创建一个绑定到`localhost`的新Web实例，然后在云设置中选择该实例。

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog
### 4.0.0  (2020-12-14)
* (bluefox) Breaking change! Alexa was removed from cloud adapter.
* (bluefox) Allowed to use the login and password for authentication.

### 3.1.0 (2020-10-31)
* (bluefox) Implemented the easy simpleApi commands (not all)

### 3.0.5 (2020-10-30)
* (Apollon77) Make sure that subscribe patterns are strings (Sentry IOBROKER-CLOUD-D)

### 3.0.4 (2020-07-16)
* (Apollon77) crash prevented when socket is not connected (Sentry IOBROKER-CLOUD-8)

### 3.0.3 (2020-04-14)
* (bluefox) Updated socket.io version
* (bluefox) Added sentry.io reporting

### 3.0.2 (2020-02-23)
* (Apollon77) fix for pot. crash when used with web 3.x

### 3.0.1 (2020-01-05)
* (bluefox) Breaking changes: no alexa support. Use ioBroker.iot for that.
* (bluefox) Support of multiple clients for .pro

### 2.8.0 (2019-11-13)
* (bluefox) Connects your ioBroker server to the ioBroker cloud

### 2.7.1 (2018-09-07)
* (Apollon77) Enhancements for Custom Skill

### 2.7.0 (2018-06-18)
* (bluefox) Multilingual names were corrected

### 2.6.2 (2018-06-18)
* (Apollon77/AlCalzone/Bluefox) Several fixes

### 2.6.1 (2018-05-04)
* (bluefox) Support of custom alexa skill

### 2.5.0 (2018-03-17)
* (bluefox) Added actions on commands from server: wait, stop, redirect; to control load of the server by start.

### 2.4.7 (2018-02-09)
* (bluefox) Small changes in the configuration dialog
* (bluefox) add information about the expiring of remote access

### 2.4.6 (2018-02-09)
* (bluefox) Adding of new devices is fixed

### 2.4.5 (2018-01-29)
* (bluefox) Changes for Admin 3

### 2.4.4 (2018-01-20)
* (bluefox) The errors by controlling of temperature are caught now

### 2.4.2 (2018-01-20)
* (bluefox) Do not subscribe all objects

### 2.2.0 (2017-12-22)
* (bluefox) Better update of the devices in configuration dialog

### 2.1.1 (2017-12-11)
* (bluefox) Add settings for the ping timeout
* (grimneko) corrected some spelling mistakes
* (grimneko) update readme for IFTTT

### 2.1.0 (2017-12-06)
* (bluefox) Allow to disable alexa service by state

### 2.0.8 (2017-11-28)
* (bluefox / Philipp Beckers) Translations

### 2.0.7 (2017-10-29)
* (bluefox) Changes for socket-io

### 2.0.6 (2017-10-26)
* (bluefox) Fix small error in configuration
* (bluefox) Send uuid to cloud for authentication

### 2.0.5 (2017-09-26)
* (bluefox) The small custom service reaction improvement

### 2.0.4 (2017-09-12)
* (bluefox) Allow access to admin via iobroker.pro
* (c-klinger) Add settings for the connection timeout

### 1.0.8 (2017-07-13)
* (bluefox) Allow control light colors

### 1.0.7 (2017-06-26)
* (bluefox) AI deactivated
* (bluefox) change ping interval from 10 to 30 seconds
* (bluefox) fix double auth on connect

### 1.0.3 (2017-05-23)
* (bluefox) Rename some german words

### 1.0.2 (2017-05-23)
* (bluefox) Support of IFTTT

### 1.0.0 (2017-05-22)
* (bluefox) Catch an error if the invalid smart name set

### 0.8.2 (2017-04-24)
* (bluefox) controls of colors (english only)
* (bluefox) request temperature (target temperature and sensor temperature, english only)
* (bluefox) support of double names

### 0.7.1 (2017-04-05)
* (bluefox) Fixed reconnection

### 0.7.0 (2017-04-01)
* (bluefox) Try to fix reconnection

### 0.6.12 (2017-03-26)
* (bluefox) Try to fix error with names

### 0.6.11 (2017-03-20)
* (bluefox) Fixed scrollbar in configuration

### 0.6.10 (2017-03-03)
* (bluefox) Add tooltips in config
* (bluefox) Add workaround for alexa reconnection

### 0.6.9 (2017-02-17)
* (bluefox) Allow to use more than one smart name

### 0.6.8 (2017-02-16)
* (bluefox) Fix deactivation of enums

### 0.6.7 (2017-02-14)
* (bluefox) allow buttons to be controller with alexa

### 0.6.5 (2017-02-06)
* (bluefox) print warnings for invalid states

### 0.6.3 (2017-01-28)
* (bluefox) fix enum names
* (bluefox) add helper states and response text

### 0.6.2 (2017-01-25)
* (bluefox) add option "Place function in names first"

### 0.6.1 (2017-01-24)
* (bluefox) fix reconnect
* (bluefox) change smartName structure

### 0.5.0 (2017-01-20)
* (bluefox) add value by ON

### 0.4.2 (2017-01-12)
* (bluefox) add daily restart

### 0.4.1 (2017-01-06)
* (bluefox) use devices with ":" symbols in the names
* (bluefox) add debug outputs

### 0.4.0 (2017-01-06)
* (bluefox) Support of english language
* (bluefox) Use rooms of channel and not only states

### 0.3.3 (2017-01-02)
* (bluefox) Fix error with smartNames
* (bluefox) Take the superset of actions for group and not the last one
* (bluefox) if group has switches and dimmers, turn devices OFF if the percent level is less than 30%
* (bluefox) Remember ON level for dimmers to switch it later ON

### 0.3.0 (2016-12-29)
* (bluefox) Implement Heating profile for Alexa

### 0.2.0 (2016-12-13)
* (bluefox) support of amazon alexa

### 0.1.2 (2016-11-17)
* (bluefox) update socket.io

### 0.1.1 (2016-10-23)
* (bluefox) update some packages

### 0.1.0 (2016-08-01)
* (bluefox) support of read/write files

## License
The MIT License (MIT)

Copyright (c) 2016-2020 bluefox <dogafox@gmail.com>

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