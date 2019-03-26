---
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.admin/edit/master//admin/tab-adapters.md
title: Admin
hash: QL+KH1rDLyLUu//lZEw1peBxkvCTrTkqq2Z4ohf+BKg=
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
#Tab适配器
此处显示和管理可用和已安装的适配器。

![iobroker_image_bpi_20160910](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/ioBroker_Image_BPi_20160910.jpg)

##标题栏
标题栏包含最重要流程的图标。
每个图标都有一个上下文帮助。只需将鼠标停留在图标上一段时间即可。

![iobroker_adapter_admin_002aa](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_002aa.jpg)

### **详细图标：**
![](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_icons01_20170108-e1483882554815.jpg)

### ** 1.）仅显示已安装的适配器**
选择此图标时，仅显示已安装的适配器（切换功能）

### ** 2.）显示带有更新的适配器**
选择此图标时，仅显示有更新的适配器（切换功能）

在可更新的适配器后面，** _ installed _ **列中有一个更新图标。
单击此按钮将使相应的适配器进入最新版本。

此外，标题栏中还会显示另一个图标：

![iobroker_adapter_admin_002b](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_002b.jpg)

单击此图标可更新所有可用的适配器。

### ** 3.）从自己的URL安装适配器**
使用Octocat图标，可以从他们自己的路径（URL或文件路径）或GitHub的预发布版本安装适配器。

单击此图标后，将打开相应的选择窗口：

![iobroker_adapter_admin_002c_github](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_002c_GitHub.jpg)

在选项卡** _ From github _ **下，只需在下拉菜单中选择所需的适配器，即可安装最新的预发行版本。

如果选择“任意位置”选项卡，则可以在该字段中输入剩余文件路径或任何URL（例如，外部适配器开发人员的URL），并安装相应的适配器。

![iobroker_adapter_admin_002c_ownfile](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_002c_ownFile.jpg)

### ** 4.）打开专家模式**
专家模式还允许您安装旧版本的适配器。
如果选择此按钮，则会在每个适配器的最右侧显示下拉菜单（4）以安装早期版本。

![](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_icons02_20170108.jpg)

### ** 5.）检查更新**
每次重新启动时，它都会自动检查更新。但您可以使用此按钮手动启动搜索。

如果在[系统设置](#Systemeinstellungen)下的存储库集中提供了更新，则选项卡** _ Adapter _ **的字体显示为绿色。

### ** 5.）更改排序顺序**
此按钮可更改此页面上适配器的排序。

如果按钮处于活动状态，则所有适配器都按字母顺序排序，其中一个块显示已安装的适配器，另一个块带有尚未安装的适配器。这两个块中的每一个都按字母顺序排序。

如果此按钮未激活，则适配器按主题排序。

然后可以看到接下来的两个图标。

### ** 6.）收起所有主题**
### ** 7.）展开所有主题**
在右侧还有两个按钮

![iobroker_adapter_admin_003a](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_003a.jpg)

### ** 8.）编辑标签**
使用此按钮，您可以隐藏未使用的标签并隐藏不可见的标签。

### ** <a id="Systemeinstellungen"></a> 9.）系统设置**
这为ioBroker设置了基本参数。

##页面内容
![iobroker_admin_adapter_inhalt01](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_Inhalt01.jpg)适配器在页面上列表。该表包含以下列：

### ** 1.）姓名**
此列列出适配器和关联图标的名称。
如果通过标题栏中的图标（5）选择了适配器分组，则组名称也会显示在此处。

### ** 2.）说明**
以下是适配器功能的简要说明

### ** 3.）关键字**
以下是与适配器关联的一些搜索字词。

### ** 4.）版本**
此处显示可用版本。概述，将突出显示适配器的开发状态。 （红色=在计划中，黄色= beta，橙色= alpha，绿色=最终）。

### ** 5.）已安装**
此列提供有关此适配器的安装状态的各种信息。
首先，安装适配器的版本号。如果是粗体，则有更新。在它后面是此适配器在方括号中安装的实例数，激活了多少实例以及它们的状态。因此，[2/1]表示该适配器有两个实例，其中一个被激活并且运行没有问题（后者可以通过第二个数字的绿色识别）。如果有适配器的更新适配器，则在右侧有一个更新图标。单击此图标可启动更新过程。

### ** 6.）平台**
此适配器指示此适配器所基于的软件平台。通常这是nodejs下的javascript。

### ** 7.）许可证**
这是提供适配器的许可证。许可条件通常在自述文件中找到。如果许可证要求最终用户必须接受该许可证，则在创建实例时将显示具有许可条件的相应窗口。

### ** 8.）安装**
在此列中有几个用于安装和帮助的按钮。

![](zh-cn/adapterref/iobroker.admin/../../../../de/adapterref/iobroker.admin-2/admin/img/tab-adapters_icons02_20170108.jpg)

1.（+）添加适配器的实例。必须仍在“实例”选项卡中配置和激活它。对于大多数适配器，可以安装任意数量的实例，例如解决不同的硬件问题。如果无法做到这一点，将打开一个窗口，其中包含相应的错误消息。
2.（？）如果此按钮处于活动状态，则会链接到适配器的帮助页面。这通常位于GitHub上，同时也维护适配器。
3.（Trashcan）此按钮删除适配器和所有已安装的实例
4.（下拉菜单）此菜单可用于安装相应适配器的早期版本。此下拉菜单仅在专家模式下可见。