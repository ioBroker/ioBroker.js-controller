---
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.admin/edit/master//admin/tab-events.md
title: Admin
hash: Yi2E6W9RHhmNwuCEDkiJSk2tvvns8JKWVvLyrnyoMmo=
adapter: true
license: MIT
authors: bluefox <bluefox@ccu.io>, hobbyquaker <hq@ccu.io>
description: 配置ioBroker的Web界面
keywords: setup, config, update, upgrade, system, konfiguration, administration, einrichtung, wartung
readme: https://github.com/ioBroker/ioBroker.admin/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2018-04-12T17:51:06.332Z
version: 2.0.10
---
#The Events选项卡
在此选项卡中，将显示所有数据点的当前状态。值也可以更改。

![iobroker_admin_states_columns](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-events_States_columns.jpg)

##页面内容
在页面上，现有对象列表。通过根据相应列的内容（切换功能）单击列标题，可以按升序或降序按字母顺序对列进行排序。下面的字段用于根据自己的标准过滤数据点。

该表包含以下列：

### **1.）ID**
这是相应数据点的唯一名称，根据例如由适配器的名称。实例的名称。用户名。通道名称。数据点名称。

### ** 2.）父母姓名**
与第3列名称相同的内容。

### ** 3.）姓名**
数据点的名称。这可以是更容易理解的自动生成或手动分配的名称。此名称不必是唯一的。

### ** 4.）价值**
这里，指定数据点的当前值。

此值可编辑

### ** 5.）确认**
如果此值已更改并且这是从系统获取的，则值为_true_，否则为_false._

### ** 6.）来源**
这里指定了哪个实例已执行数据点的最后一次更改。

### ** 7.）时间**
这是数据点上次更新的时间戳。

### ** 8.）改变了**
这是数据点的值最后更改的时间戳。

##页脚
在页脚中，仍然有一些信息

![iobroker_admin_states_footer](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-events_States_footer.jpg)

### ** 1.）重新载入**
可以单击此图标以使表更新。

### ** 2.）页面信息**
页脚中间的信息块可以使用下拉菜单调整每页的行数。每页可提供20,100,200,500和1000行。此外，还有信息总共有多少页面，以及箭头图标向前或向后滚动的可能性。

### ** 3.）数据点信息**
此信息指示现有数据点的总数以及当前页面上显示的范围。