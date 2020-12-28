---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nut/README.md
title: ioBroker.nut
hash: 76FicpJQCVl7v9oiC8y++e8VHNLJgLPqkeuJGM6H2q8=
---
![商标](../../../en/adapterref/iobroker.nut/admin/nut.png)

![安装数量](http://iobroker.live/badges/nut-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.nut.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.nut.svg)
![特拉维斯](http://img.shields.io/travis/Apollon77/ioBroker.nut/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.nut?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.nut.png?downloads=true)

＃ioBroker.nut
[![代码气候]（https://codeclimate.com/github/Apollon77/ioBroker.nut/badges/gpa.svg）](https://codeclimate.com/github/Apollon77/ioBroker.nut)

ioBroker的此适配器连接到已定义的NUT服务器，以提供ioBroker的状态和已连接的UPS / USV的详细信息，以便可以在此处使用。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

##参数说明
### Host_ip
NUT服务器的IP地址。 NUT需要在服务器模式下运行，并且需要运行iobroker NUT适配器的计算机可以访问。因此，如果您有问题并允许访问，请检查防火墙设置。如果UPS在本地连接，则还可以使用127.0.0.1或localhost。

### Host_port
NUT的端口。默认端口是<b>3493</b>

### Ups_name
在NUT服务器的NUT配置中定义的UPS的名称。

### Update_interval
时间间隔以秒为单位来更新数据。默认为300秒

## UPS监视器通知
在scripts / nut-notify.sh中包含一个小的Linux shell脚本，可以在upsmon中对其进行配置。

该脚本需要执行权限（chmod + x nut-notify.sh）。

应该将其添加到/etc/nut/upsmon.conf中，如下所示：

```
NOTIFYCMD "cd /opt/iobroker/;./nut-notify.sh"
```

另外，配置所有相关的通知消息，例如：

```
NOTIFYFLAG ONLINE       SYSLOG+WALL+EXEC
NOTIFYFLAG ONBATT       SYSLOG+WALL+EXEC
NOTIFYFLAG LOWBATT      SYSLOG+WALL+EXEC
NOTIFYFLAG FSD          SYSLOG+WALL+EXEC
NOTIFYFLAG COMMOK       SYSLOG+WALL+EXEC
NOTIFYFLAG COMMBAD      SYSLOG+WALL+EXEC
NOTIFYFLAG SHUTDOWN     SYSLOG+WALL+EXEC
NOTIFYFLAG REPLBATT     SYSLOG+WALL+EXEC
NOTIFYFLAG NOCOMM       SYSLOG+WALL+EXEC
NOTIFYFLAG NOPARENT     SYSLOG+WALL+EXEC
```

重要的是添加的“ EXEC”标志。

nut-notify.sh脚本的一个简单示例是：

```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```

＃＃ 故障排除
如果您有问题，并且适配器不提供数据，则可以使用适配器安装目录“ test”中的两个脚本（通常在iobroker安装目录的node_modules / iobroker.nut / test中）进行尝试。命令行。使用“ node filename.js”调用脚本以查看等待的参数。</ p>

* **test_upslist.js** 连接到NUT服务器并返回可用的UPS名称列表
* **test_upsvars.js** 连接到已定义的UPS的NUT服务器并返回可用UPS变量的列表

＃＃ 去做
*网页文档

## Changelog

### 1.3.0 (2020-12-27)
* (Apollon77) adjust connection close handling
* (Apollon77) add compact mode

### 1.2.0 (2020-12-26)
* (Apollon77) update dependencies
* (Apollon77) Add Sentry error reporting

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (2018-03-28)
* Fix status parsing

### 1.1.1
* Enhance error handling

### 1.1.0
* Add possibility to call commands on the UPS

### 1.0.0
* change mode from schedule to deamon
* implement message support to receive messages from upsmon
* add status.severity to get one status about the USV with values idle, operating, operating_critical, action_needed, unknown

### 0.3.0
* add better usable status states under "status" channel

### 0.2.1
* finalizied initial version

### 0.1.0
* initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2016-2020 Apollon77 <ingo@fischer-ka.de>

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