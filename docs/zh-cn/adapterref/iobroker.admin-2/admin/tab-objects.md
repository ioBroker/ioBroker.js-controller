---
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin-2/admin/tab-objects.md
title: 选项卡对象
hash: GIc3qNC2ZnoKb8Y2zbYYsyTbWS+DWObdVmPTllsNDVk=
---
＃标签对象
在此选项卡下是所有托管对象。对于每个实例，在此创建一个文件夹，其中由其创建的数据点处于分层结构中。也可以在此处手动创建和删除对象。可以上载或下载整个对象结构。另一个按钮允许您查看专家视图。

<span style="line-height: 1.5; text-align: justify;"></span>

![iobroker_admin_objekte_inhalt00](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-objects_Inhalt00.jpg)

##标题栏
标题栏包含最重要流程的图标。每个图标都有一个上下文帮助。只需将鼠标停留在图标上一段时间即可。

![iobroker_admin_objekte_headline_icons](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-objects_Headline_Icons.jpg)

### **详细图标：**
### ** 1.）更新视图**
如果刚刚创建的对象不可见，单击此图标将有助于使页面状态保持最新。

### ** 2.）更改排序**
此按钮可更改此页面上对象的排序。

如果按钮处于活动状态，则所有对象都按字母顺序排序。如果此按钮未激活，则根据实例对对象进行分层排序。

然后可以看到接下来的两个图标。

### ** 3.）关闭所有主题**
### ** 4.）展开所有主题**
### ** 5.）管理员模式**
选择此图标后，将显示更多对象（切换功能）。这些是系统的数据点。

### ** 6.）添加**
选择此图标后，可以添加更多对象。
如果选择了某个文件夹，则会在对象结构中将其作为_Parent_接管。
配置窗口打开：

![iobroker_admin_objekte_addobject](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-objects_AddObject.jpg)

这里，现在必须选择新对象的名称，从而根据分层结构将设备，通道或数据点作为类型提供。
数据点类型包括逻辑值，开关，字符串，数字，值列表，字段，对象和混合。

只要您确认输入窗口，就会打开另一个窗口：

![iobroker_admin_objekte_addobjec02t](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-objects_AddObjec02t.jpg)

在这里您可以输入更多数据。因此，您可以向对象添加角色和图标。

其他选项卡中包含对象的其他属性。
每个对象都存在这样的信息。

### ** 7.）上传**
使用此按钮，将完整的对象结构作为json文件上载到ioBroker服务器

### ** 8.）下载**
使用此按钮，所选对象结构将从ioBroker服务器下载为json文件，并可以保存。

##页面内容
![iobroker_admin_objekte_headline_columns](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-objects_Headline_Columns.jpg)

在页面上，现有对象列表。

该表由以下列组成（列标题1和2下的字段以及其他列的下拉菜单用作过滤条件）。
图中的表按层次结构排序，所有子节点都已扩展：

### **1.）ID**
这些是对象层次结构的顶级。这里，作为顶层，例如
实例的名称，包括创建的数据的结构。

### ** 2.）姓名**
此列指定对象的名称。此外，前面的图标显示它是哪个层级（设备，通道或数据点）

此列的值是可编辑的。

![iobroker_admin_objekte_structure01](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-objects_Structure01.jpg)

### ** 3.）类型**
层次结构级别中的类型（在前面的图标列_Name_中已经显示）在此处再次明确提及。通过列标题中的下拉菜单，您可以根据这些类型进行过滤。仅显示所有数据点。

### 4.）角色
该角色指示.vis和mobile等用户界面应如何处理此数据点。
原则上，这个对象的功能由术语简要描述。
之后，您可以再次过滤。此列的值是可编辑的。

### ** 5.）房间**
如果此对象已分配给房间，则此处将显示此对象。
这也适用于美国。搜索对象时进行过滤。
此列的值是可编辑的。这样，以后仍然可以将对象分配给房间。
如果单击该字段，将打开一个弹出窗口，其中包含先前创建的房间。

![iobroker_admin_objekte_rooms](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-objects_Rooms.jpg)

### ** 6.）功能**
此列包含分配相应对象的交易。

此列的值是可编辑的。因此，可以稍后将对象分配给交易。如果单击该字段，将打开一个弹出窗口，其中包含先前创建的交易。

### ** 7.）价值**
如果对象是数据点，则此处显示此数据点的当前值。

### ** 8.）其他**
单击铅笔图标将打开一个包含此对象属性的窗口。
它与创建新对象时出现的窗口相同。
这里可以更改对象的属性。只有当您确切知道自己在做什么时，才应极其谨慎地使用此功能。

单击垃圾桶图标也会删除此对象以及**层次结构中的所有**基础对象。为安全起见，会出现一个窗口，其中必须再次确认删除。

![iobroker_admin_objekte_delete](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-objects_delete.jpg)

仅当至少安装了一个历史记录实例（History，InfluxDB或SQL）时，齿轮图标才会出现。
您可以在此处配置用于记录历史数据的数据点。更多信息可以在[历史适配器](http://www.iobroker.net/?page_id=144&lang=de)的描述中找到。

通过标题栏中的链轮，可以同时对与当前过滤条件匹配的所有数据点执行此操作。因此，检查是否选择了此页面的过滤条件以便仅包含所需的数据点非常重要。

用于过滤此列的下拉菜单是指具有记录数据的数据点。
_Mit _，_ ohne_和_alle_以及已安装的历史记录实例可在此处获得。