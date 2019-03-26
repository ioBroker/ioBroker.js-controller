---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.admin/edit/master//tab-enums.md
title: Admin
hash: rqPVvVeC50Hm4dxcQ7zBoNm0VTUa7zS5Txki6arYBmc=
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
＃选项卡枚举
这里列出了Homematic CCU的最爱，行业和房间。
您也可以创建自己的列表可以在脚本中使用。

![iobroker_adapter_admin_enums_01](zh-cn/adapterref/iobroker.admin/../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_01.jpg)

##标题栏
标题栏包含最重要流程的图标。
每个图标都有一个上下文帮助。只需将鼠标停留在图标上一段时间即可。

![iobroker_adapter_admin_enums_headers_01](zh-cn/adapterref/iobroker.admin/../../../de/adapterref/iobroker.admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **详细图标：**
### ** 1.）更新视图**
如果看不到新创建的列表，单击此图标将有助于更新页面状态。

### ** 2.）更改排序**
此按钮可更改此页面上对象的排序。

如果按钮处于活动状态，则所有对象都按字母顺序排序。
如果此按钮未激活，则根据树结构中的枚举以分层方式显示对象。

然后可以看到接下来的两个图标。

### ** 3.）关闭所有子文件夹**
### ** 4.）展开所有子文件夹**
### ** 5.）添加**
选择此图标后，可以添加基本结构中的更多枚举。
文件夹结构中的元素通过右侧的（+）图标创建（＃10）。
配置窗口打开：

![iobroker_adapter_admin_enums_new](zh-cn/adapterref/iobroker.admin/../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new.jpg)

现在您必须为新枚举选择名称，生成的ID将自动调整。

###页面内容
![iobroker_adapter_admin_enums_headers_03](zh-cn/adapterref/iobroker.admin/../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Headers_03.jpg)

在页面上，现有列表及其成员列表。

该表由以下列组成（列标题6,7和8下的字段用作过滤条件）。图中的表按层次结构排序，所有子节点都已扩展：

### **6.）ID**
这里列出了枚举的所有成员及其ID。可以通过双击或单击相关的铅笔图标（＃9）来更改此名称。
下级结构的完整ID还包括每种情况下的父级别。

### ** 7.）姓名**
此列显示成员的名称。双击或单击关联的铅笔图标（＃9）可以更改此名称。

### ** 8.）会员**
在此列中，列表的成员只显示了太多的数字。
如果将鼠标移到该字段上，则所有成员都将显示在气泡信息中。
有关更多信息，请参阅最右侧的信息图标（＃12）

### ** 9.）编辑名称**
单击此图标后，您可以编辑列ID和名称中的名称。
此时出现一个带有复选标记形式的ok按钮和一个（x）形式的取消图标。

### ** 10.）添加结构元素**
单击此图标后，将打开一个对话框，可在相应结构中创建新成员。

![iobroker_adapter_admin_enums_new_member](zh-cn/adapterref/iobroker.admin/../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new_Member.jpg)

同样，名称可以单独选择。根据结构和所选名称自动生成关联的ID。

### ** 11.）删除项目**
垃圾桶图标会删除此行中的元素

### ** 12.）信息**
单击此图标后，将显示另一个窗口，其中包含有关所选元素的扩展信息。

![iobroker_adapter_admin_enums_info](zh-cn/adapterref/iobroker.admin/../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Info.jpg)