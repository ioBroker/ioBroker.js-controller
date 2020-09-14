---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.linux-control/README.md
title: ioBroker.linux控制
hash: dK7NHAYUOt8m7SjzhfXb++SHUc69QIU7mbuljXYBBxk=
---
![商标](../../../en/adapterref/iobroker.linux-control/admin/linux-control.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.linux-control.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.linux-control.svg)
![安装数量（最新）](http://iobroker.live/badges/linux-control-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/linux-control-stable.svg)
![依赖状态](https://img.shields.io/david/Scrounger/iobroker.linux-control.svg)
![已知漏洞](https://snyk.io/test/github/Scrounger/ioBroker.linux-control/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linux-control.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Scrounger/ioBroker.linux-control/master.svg)

＃ioBroker.linux-control
##用于ioBroker的Linux控制适配器
[![paypal]（https://www.paypalobjects.com/zh_CN/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

控制Linux设备并获取有关系统的信息

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

##配置
＃＃＃ 一般
![一般](../../../en/adapterref/iobroker.linux-control/docs/en/img/general.png)

|设置|描述|
|-------|-----------|
|启用|启用或禁用主机更新|
|要存储所有数据点的数据点ID | ID |
| IP |您的Linux设备的IP地址|
|端口| Linux设备的SSH端口|
|轮询间隔|轮询间隔，以分钟为单位。 <br>要取消轮询，您可以使用“ 0”或将其留空|
| user | ssh登录用户|
|密码/密码| ssh登录密码或密码（如果使用rsa键）|
|使用Sudo |使用sudo |
| rsa密钥| rsa密钥的路径和文件名。访问权限必须可用！ |
|超时|连接超时|

＃＃＃ 数据点
![数据点](../../../en/adapterref/iobroker.linux-control/docs/en/img/datapoints.gif)

适配器将创建预定义的数据点，其中包含信息以及控制Linux设备的可能性。这些可以在这里选择。
另外，对于每个单独的主机，可以通过拖放将单独的数据点或整个通道放置在黑名单中，这样就不会为主机创建它们。

请注意，如果要将整个频道添加到黑名单，则必须将频道节点拖放到黑名单。只有这样，整个频道才会被忽略-请参见下面的sreenshot：

![数据点](../../../en/adapterref/iobroker.linux-control/docs/en/img/all_to_blacklist.gif)

**由于有许多不同的Linux发行版，此功能仅在Debian 10，Ubuntu 18/20 LTS上进行了测试！**

＃＃＃ 服务
![服务](../../../en/adapterref/iobroker.linux-control/docs/en/img/services.png)

如果激活了在数据点下检索服务，则可以在此处为每个主机定义仅应检索其信息的服务。

**由于有许多不同的Linux发行版，此功能仅在Debian 10，Ubuntu 18/20 LTS上进行了测试！**

###文件夹
![资料夹](../../../en/adapterref/iobroker.linux-control/docs/en/img/folders.png)

在这里，您可以获取有关文件夹大小，这些文件夹中包含的文件数以及该文件夹中最后一次更改的时间戳的信息。

**由于有许多不同的Linux发行版，此功能仅在Debian 10，Ubuntu 18/20 LTS上进行了测试！**

|设置|描述|
|-------|-----------|
|启用|启用或禁用文件夹更新|
|主机|应使用的主机|
|要存储所有数据点的数据点ID | ID |
|路径|文件夹的路径|
||文件名模式|应重新显示的文件名的模式。 |
|单位|尺寸单位|
|小数位|小数位|
|文件数|创建用于文件数的数据点|
||最后更改|在此文件夹中为最后更改的时间戳创建数据点|

###我的命令
![自定义命令](../../../en/adapterref/iobroker.linux-control/docs/en/img/myCommands.png)

在这里，可以定义非常单独的命令，然后将其写入您自己定义的数据点。
务必以正确的类型传输检索到的数据！然后必须相应地配置类型。

|设置|描述|
|-------|-----------|
|启用|启用或禁用命令更新|
|主机|应使用的主机|
|要存储数据点的数据点ID | ID |
| polling interval |不同的轮询间隔仅针对命令。要取消激活，请使用`0`或将该字段留空，然后使用来自主机的轮询间隔|
|命令|应使用的命令<br><br>如果您使用需要`sudo`的用户，则必须在您自己的命令中添加`sudo -S`！ |
|命令|应使用的命令<br><br>如果您使用需要`sudo`的用户，则必须在您自己的命令中添加`sudo -S`！ |
|类型|数据点的类型|
|单位|数据点的单位|

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.3.4 (2020-09-09)
* (Scrounger) bug fixes

### 0.3.3 (2020-09-09)
* (Scrounger) bug fix for datapoints creation

### 0.3.2 (2020-09-07)
* (Scrounger) performance optimizations
* (Scrounger) Fixed some errors reported via Sentry

### 0.3.1 (2020-08-23)
* (Scrounger) datapoint info lastRefresh added

### 0.3.0 (2020-08-23)
* (Scrounger) button to manual refresh a single host added
* (Scrounger) userCommand: ignore polling interval if type is button
* (Scrounger) userCommand: individual polling intervals added
* (Scrounger) userCommand: bug fix if sudo is used
* (Scrounger) refresh services info after using command
* (Scrounger) services command: bug fix for using sudo

### 0.2.7 (2020-08-17)
* (Scrounger) option to deactive polling for hosts added
* (Scrounger) bug fixes for using sudo

### 0.2.6 (2020-08-15)
* (Scrounger) Node-SSH bug fix

### 0.2.5 (2020-08-15)
* (Scrounger) sentry error handling optimized
* (Scrounger) info datapoints added, isOnline changed to info.is_online

### 0.2.4 (2020-08-12)
* (Scrounger) datapoint isOnline added
* (Scrounger) settings: styles optimized
* (Scrounger) userCommand: null values if response is null or empty
* (Scrounger) bug fixes

### 0.2.3 (2020-08-09)
* (Scrounger) bug fixes

### 0.2.2 (2020-08-09)
* (Scrounger) bug fixes

### 0.2.1 (2020-08-09)
* (Scrounger) bug fixes

### 0.2.0 (2020-08-08)
* (Scrounger) optional folder datapoints for count of files and last change added
* (Scrounger) enable options for hosts, folders and user commands added
* (Scrounger) using sudo implemented
* (Scrounger) type array for user commands added
* (Scrounger) ignore whole datapoints node by using drag and drop 
* (Scrounger) error handling for user commands improved
* (Scrounger) Sentry implemented
 

### 0.1.0 (2020-05-20)
* (Scrounger) added datapoints blacklist configurable for each host individually
* (Scrounger) added poll interval configurable for each host individually
* (Scrounger) configuration bug fixes

### 0.0.3 (2020-05-16)
* (Scrounger) added services whitelist configurable for each host individually

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2020 Scrounger <scrounger@gmx.net>

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