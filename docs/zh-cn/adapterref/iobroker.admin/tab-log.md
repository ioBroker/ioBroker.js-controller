---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-log.md
title: 选项卡日志
hash: kzof4XfyddkyR8KdFjUtTOUg5IE6jzeGfhiqozkyyE0=
---
＃选项卡日志
这里连续输出系统的消息。
最新消息位于顶部。

![](../../../de/adapterref/iobroker.admin/img/tab-log_01.jpg)

##标题栏
标题栏包含最重要流程的图标。
每个图标都有一个上下文帮助。只需将鼠标停留在图标上一段时间即可。

![](../../../de/adapterref/iobroker.admin/img/tab-log_icons.jpg)

### **详细图标：**
### ** 1.）停止更新**
通过单击此按钮，将停止不断更新列表。
现在不显示暂停图标，而是显示未显示的新消息数。

### ** 2.）更新日志**
此按钮可更新列表。

### ** 3.）复制日志**
单击此图标后，列表将显示为文本。使用CTRL-A，选择整个文本并使用CTRL-C将其插入剪贴板以进行进一步处理。

### ** 4.）清除清单**
通过单击此图标，只会删除屏幕上的列表

### ** 5.）清除日志**
单击此图标将永久删除主机上的整个日志。

###下拉菜单
### **实例过滤器**
![](../../../de/adapterref/iobroker.admin/img/tab-log_instances.jpg)

使用此下拉菜单，可以根据日志记录实例过滤消息。
在菜单中，仅显示实例，页面上也有条目。

### **显示日志级别**
![](../../../de/adapterref/iobroker.admin/img/tab-log_loglevel.jpg)

此菜单用于设置消息的严重性。
但是，这只是现有列表的过滤器。要为实例设置特定级别的日志记录，必须在_ **Instances** _选项卡中设置。