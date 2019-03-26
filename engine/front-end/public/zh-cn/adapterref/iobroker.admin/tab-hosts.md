---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.admin/edit/master//tab-hosts.md
title: Admin
hash: A0PX3gNVnrOQijF2MxOe4AXudr5VPDE9MVykcpPXSng=
adapter: true
license: MIT
authors: bluefox <bluefox@ccu.io>, hobbyquaker <hq@ccu.io>
description: 配置ioBroker的Web界面
keywords: setup, config, update, upgrade, system, konfiguration, administration, einrichtung, wartung
readme: https://github.com/ioBroker/ioBroker.admin/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2014-12-04T18:45:44.907Z
version: 3.6.0
---
#Tabs主机
此处显示可用的主机。

在标准系统中，只有一个主机。对于[多主机系统](http://www.iobroker.net/?page_id=3068&lang=de)几个。

##标题栏
标题栏包含最重要流程的图标。每个图标都有一个上下文帮助。只需将鼠标停留在图标上一段时间即可。

![](zh-cn/adapterref/iobroker.admin/../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_icons.jpg)

### **详细图标：**
### ** 1.）获取更新**
要检查是否有js-controller的更新，您可以单击此按钮。如果有更新，则选项卡的标签将以绿色文本显示，并且_ **可用** _列中将显示新版本。

### ** 2.）过滤**
通过此功能，您可以根据自己的意愿过滤主机列表

##页面内容
在页面上，现有主机已列表。

![](zh-cn/adapterref/iobroker.admin/../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_01.jpg)

该表包含以下列：

### ** 3.）姓名**
这是主机操作系统中指定的主机的唯一名称。此名称必须是唯一的。

### ** 4.）重启主机**
使用此按钮，可以重新启动相应的主机。单击它对应于命令** _ reboot _ **。

### ** 5.）输入**
指定主机正在运行的引擎。

### ** 6.）标题**
引擎的全名，通常是ioBroker.js控制器

### ** 7.）平台**
引擎所基于的软件基础的规范。

### ** 8.）操作系统**
主机上运行的操作系统的规范。

### ** 9.）可用**
指定引擎的最新可用版本

如果有更新版本的引擎，则可以通过控制台进行更新。
在开始更新适配器之前，应始终首先执行此操作（如果可用）。

### ** 9.）已安装**
已安装的发动机版本规格