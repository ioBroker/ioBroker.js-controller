---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-instances.md
title: 骑手实例
hash: wBKP7K139TehQSv9mxy6iGcoIz/dj9X8D7lacF88tpw=
---
＃选项卡实例
此处列出了已通过“适配器”选项卡安装的实例，并可进行相应配置。

<span style="line-height: 1.5;"></span>

![iobroker_admin_instanzen_inhalt00](../../../de/adapterref/iobroker.admin/img/tab-instances_Inhalt00.jpg)

##标题栏
标题栏包含最重要流程的图标。每个图标都有一个上下文帮助。
只需将鼠标停留在图标上一段时间即可。还有关于服务器负载的信息

![iobroker_admin_instanzen_headline_icons](../../../de/adapterref/iobroker.admin/img/tab-instances_Icons-e1476803621402.jpg)

### **详细图标：**
### ** 1.）打开管理员模式**
选择此图标后，将显示用于配置实例的其他列（切换功能）。
有关更多信息，请参阅页面内容

### ** 2.）更新视图**
如果刚刚创建的实例不可见，单击此图标将有助于使页面状态保持最新。

### ** 3.）服务器状态信息**
标题栏的右侧部分包含有关实例活动以及ioBroker服务器利用率的信息。

第一个数字表示到目前为止实例使用的内存和剩余的可用内存（MB）。在它后面是％的免费记忆。方括号包含ioBroker服务器的名称和正在运行的进程数。

##页面内容
![iobroker_admin_instanzen_headline_columns](../../../de/adapterref/iobroker.admin/img/tab-instances_Headline_Columns.jpg)

在页面上，已安装的适配器实例已制成表格。

该表包含以下列：

### ** 1.）条件**
这里，实例的状态由交通信号灯显示。通过用鼠标站在信号上获得更多信息。

![iobroker_admin_instanzen_status](../../../de/adapterref/iobroker.admin/img/tab-instances_Instanzen_Status.jpg)

并非所有实例都有此交通灯。这没有理由恐慌。这些是定时实例，仅在短时间内连接到控制器，然后立即关闭或关闭。继续在后台运行。

### ** 2.）图标**
这将显示此适配器使用ioBroker范围的图标

### ** 3.）实例**
此列包含实例的名称。它由适配器的名称和数字组成，它按照实例的安装顺序连续编号。第一个实例接收0。
此名称是在ioBroker中命名数据点的基础。

### 4.）激活
这里启动或停止实例。绿色暂停符号表示适配器正在运行且可以通过单击暂停，红色播放符号显示可以通过单击启动的已停止实例。

### ** 5.）配置**
单击此图标可打开特定于适配器的配置菜单。相关的菜单在相关的[适配器](http://www.iobroker.net/?page_id=2236&lang=de)中描述。

### ** 6.）重启**
单击此图标可重新启动相应的实例

### ** 7.）垃圾桶**
此图标将删除相应的实例。保留同一适配器的其他实例。
甚至适配器本身仍然存在。

### **8.）Weblink**
此图标后面隐藏了此实例网站的链接。要么是因为这个适配器带有自己的Web界面（具有不同的端口），或者只是另一个路径。部分此链接也会导致帮助页面。

### ** 9.）标题**
这里给出了实例的名称。此名称可以根据您自己的意愿或需求进行更改。如果有多个适配器实例（否则具有相同的Bezeischnung），这将特别有用。这将是例如对于hm-rpc，如果有一个RF，有线和CuxD实例。

### ** 10.）安排**
对于按计划启动的适配器，此适配器启动时将在此处输入。
该时间表的格式为[cronjobs](https://de.wikipedia.org/wiki/Cron#Beispiele)。
要更改单击带有三个点的按钮。它打开一个输入窗口，其中包含许多其他信息和帮助。

![iobroker_admin_instanzen_cronjob](../../../de/adapterref/iobroker.admin/img/tab-instances_Cronjob.jpg)

### ** 11.）重启**
如果勾选此复选框，则还应在此处重新启动此实例时创建计划。

### ** 12。）日志级别**
在此列中，可以调整实例的相应loglevel。可用的是调试，信息，警告和错误。默认情况下，此值设置为info。如果你的印象是某些东西不顺利，你可以把它放在调试上。然后在选项卡日志中，此实例也会输出调试信息，这有助于查找错误。相反，您可以将此值设置得更高，以便日志不会那么广泛。

### ** 13.）RAM限制**
在这里，您可以指定应提供多少内存作为预防措施。
这样的内存量不再可用于其他任务，并且不应该太高，特别是对于内存不足的系统。如果实例临时需要更多内存，它当然会由系统分配，但会立即释放回系统。在实例需要的内存多于保留的内存时，所需的内存以红色显示。

### 14.）RAM使用情况
这显示了实例使用的实际内存。这些值会定期更新。更新后，这些值会以绿色短暂显示。