---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nut/README.md
title: ioBroker.nut
hash: 4V5c4I6Vh/5cCcmu/zWPK9gorBweyRSZKnlLDbsUZkc=
---
![商标](../../../en/adapterref/iobroker.nut/admin/nut.png)

![Greenkeeper徽章](https://badges.greenkeeper.io/Apollon77/ioBroker.nut.svg)
![安装数量](http://iobroker.live/badges/nut-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.nut.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nut.svg)
![特拉维斯-CI](http://img.shields.io/travis/Apollon77/ioBroker.nut/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.nut?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.nut.png?downloads=true)

#ioBroker.nut
[![代码气候]（https://codeclimate.com/github/Apollon77/ioBroker.nut/badges/gpa.svg）](https://codeclimate.com/github/Apollon77/ioBroker.nut)

此ioBroker适配器连接到定义的NUT服务器，以提供ioBroker状态的已连接UPS / USV的状态和详细信息，以便在此处使用。

##参数说明
### Host_ip
NUT服务器的IP地址。 NUT需要在服务器模式下运行，并且需要由运行iobroker NUT适配器的计算机访问。因此，如果遇到问题，请检查防火墙设置并允许访问。如果UPS在本地连接，您也可以使用127.0.0.1或localhost。

### Host_port
坚果港。默认端口为<b>3493</b>

### Ups_name
在NUT服务器的NUT配置中定义的UPS名称。</ p>提示：如果要连接到连接到Synology diskstation的UPS，名称只是“ups”。

### Update_interval
以秒为单位的间隔更新数据。默认值为300秒

## UPS-Monitor通知
包括scripts / nut-notify.sh中的一个小型linux shell脚本，可以在upsmon中配置。

该脚本需要执行权限（chmod + x nut-notify.sh）。

它应该添加到/etc/nut/upsmon.conf中，如：

```
NOTIFYCMD "cd /opt/iobroker/;./nut-notify.sh"
```

另外配置所有相关的通知消息，如：

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

重要的是添加了“EXEC”标志。

nut-notify.sh脚本的一个简单示例是：

```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```

＃＃ 故障排除
如果您遇到问题并且适配器不提供数据，您可以使用适配器安装的目录“test”中的两个脚本（通常在node_modules / iobroker.nut / test中相对于您的iobroker安装目录）以试用它命令行。使用“node filename.js”调用脚本以查看等待的参数。</ p>

* **test_upslist.js** 连接到NUT服务器并返回可用UPS名称列表
* **test_upsvars.js** 连接到已定义UPS的NUT服务器并返回可用UPS变量列表

＃＃ 去做
*网页文档

## Changelog

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

Copyright (c) 2016-2018 Apollon77 <ingo@fischer-ka.de>

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