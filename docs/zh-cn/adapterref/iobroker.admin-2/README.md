---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.admin.svg
BADGE-Stable: http://iobroker.live/badges/admin-stable.svg
BADGE-installed: http://iobroker.live/badges/admin-installed.svg
BADGE-NPM: https://nodei.co/npm/iobroker.admin.png?downloads=true
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin-2/README.md
title: 没有标题
hash: k4IUgPdp7JdnkhVG20ud9BIBeLMtR2mzJ4Hr8SN1rBU=
---
##详细说明
适配器管理员用于操作整个ioBroker安装。他提供了一个Web界面。这在`<IP-Adresse des Servers>:8081`下调用。在ioBroker的安装过程中直接创建此适配器。

适配器提供的GUI可以包括但不限于：检索以下函数：

*安装额外的适配器
*访问对象概述
*访问对象的状态概述
*访问用户和组管理
*访问日志文件
*主持人的管理

##安装
在ioBroker的安装过程中直接创建此适配器，无需手动安装

##配置
![adapter_admin_konfiguration](../../../de/adapterref/iobroker.admin-2/img/admin_konfiguration.png)

#### IP
此处输入可以到达适配器的IP地址。提供各种Ipv4和Ipv6选项。 <span style="color: #ff0000;">**默认值为0.0.0.0 \。这不能改变！**</span>

#### Port
这里，设置了可以调用管理员的端口。如果服务器上正在运行多个Web服务器，则必须调整此端口，以便重复端口分配没有问题。

####加密
如果要使用安全协议https，则必须选中此框。

####身份验证
如果要进行身份验证，则需要放置一个钩子。

##操作
在Web浏览器中，转到以下页面：

`<IP-Adresse des Servers>:8081`

##骑手
管理员的主页面包含多个选项卡。在基本安装中，选项卡如图所示。使用右上角的铅笔图标（1），可以在安装其他适配器后添加其他选项卡。还可以禁用车手以获得更好的概览。

![iobroker_adapter_admin_001a](../../../de/adapterref/iobroker.admin-2/img/admin_ioBroker_Adapter_Admin_001a.jpg)

详细信息在标题链接的页面中提供。

### [适配器](admin/tab-adapters.md)
此处显示和管理可用和已安装的适配器。

### [实例](admin/tab-instances.md)
此处列出了已通过“适配器”选项卡安装的实例，并可进行相应配置。

### [对象](admin/tab-objects.md)
管理对象（例如，CCU的设备/变量/程序）。这里可以创建和删除对象。
_arrow up和_ down箭头按钮可用于上载或下载整个对象结构。
另一个按钮允许您查看专家视图。

如果值以红色显示，则尚未确认（`ack = false`）。

### [条件](admin/tab-states.md)
对象的当前状态。

### [活动](admin/tab-events.md)
状态更新列表。

### [组](admin/tab-groups.md)
此处，创建创建的用户组并管理权限

### [用户](admin/tab-users.md)
此处可以创建用户并将其添加到现有组。

### [枚举](admin/tab-enums.md)
这里列出了Homematic CCU的最爱，行业和房间。

### [主机](admin/tab-hosts.md)
有关安装ioBroker的计算机的信息。
在这里，您可以更新js控制器的当前版本。
如果有新版本，则选项卡的选项卡显示为绿色。

### [日志](admin/tab-log.md)
这里显示日志

在Instances选项卡中，可以为各个实例设置要记录的日志级别。
在选择菜单中，选择要显示的最小日志级别。
如果发生错误，选项卡的标签将显示为红色。

安装其他适配器后，您可以使用右上角的铅笔图标激活其他选项卡（1）。此选项卡的说明位于相应的适配器上。

### [系统设置](admin/tab-system.md)
在打开的菜单中，进行语言，时间和日期格式以及其他系统范围设置等设置。

![管理员系统设置](../../../de/adapterref/iobroker.admin-2/img/admin_Systemeinstellungen.jpg)

也可以在此处设置存储库和安全设置。
可以通过本节标题中的链接获得更深入的描述。

## Changelog
### 3.6.0 (2018-11-08)
* (foxriver76) New update states added in info channel
* (foxriver76) Take respect to async when creating info states
* (SchumyHao) Added chinese translations

### 3.5.10 (2018-09-22)
* (bluefox) Disable too many debug outputs

### 3.5.9 (2018-09-12)
* (bluefox) The log output problem was fixed

### 3.5.8 (2018-09-03)
* (bluefox) Google map was replaces with "open street map"

### 3.5.7 (2018-08-30)
* (bluefox) Edit of the table entries in configuration dialog was corrected.

### 3.5.6 (2018-08-22)
* (bluefox) Import and export of the instance configuration was implemented.

### 3.5.5 (2018-08-21)
* (bluefox) Fix upload of files

### 3.5.3 (2018-08-18)
* (bluefox) Dropdown was fixed on touch devices
* (bluefox) Speedup build of instances

### 3.5.1 (2018-08-11)
* (bluefox) Error in custom settings was fixed

### 3.5.0 (2018-08-03)
* (bluefox) Editing of enums was changed
* (bluefox) Logo was updated
* (bluefox) The function icons were added

### 3.4.9 (2018-07-17)
* (bluefox) Support of the custom login screen background
* (bluefox) show tooltip about refresh on instances page
* (bluefox) Destroy tabs after they left

### 3.4.8 (2018-07-17)
* (bluefox) fix error with add new enum
* (bluefox) try to fix error with custom settings
* (bluefox) place all titles at the top in the config
* (bluefox) add expert mode to common
* (bluefox) allow edit of enum's names in many languages

### 3.4.7 (2018-06-25)
* (bluefox) add getInterfaces function
* (bluefox) save scroll position for some tables
* (bluefox) add info about "filtered out"

### 3.4.6 (2018-06-18)
* (bluefox) Minor GUI fixes

### 3.4.5 (2018-06-12)
* (bluefox) Minor GUI fixes

### 3.4.4 (2018-06-04)
* (bluefox) add touch support for draggable and droppable
* (bluefox) edit raw value and not escaped in selectID.js
* (bluefox) allow edit of empty names in selectID.less
* (bluefox) add change with ack=true to selectID
* (bluefox) fix select for admin3 in configuration dialog
* (bluefox) add autocomplete for configs
* (bluefox) fix enums

### 3.4.3 (2018-05-13)
* (bluefox) The button in selectID was fixed
* (bluefox) disk info was added
* (bluefox) The filter in table mode on adapter tab was showed
* (bluefox) memAvailable for RAM monitoring is used
* (bluefox) fix select problem in config dialog
* (bluefox) added the asking about unsaved scripts

### 3.4.2 (2018-05-04)
* (BuZZy1337) fix wrong height calculation in select id dialog

### 3.4.1 (2018-05-03)
* (bluefox) fix wait popup
* (bluefox) fix button name in config dialog
* (BuZZy1337) escape html from log entries
* (bluefox) fix objects counter
* (BuZZy1337) show current Tab in Page-Title
* (BuZZy1337) escape HTML Tags from selectID.js
* (bluefox) GUI bugfixes
* (BuZZy1337) Fix: Unable to scroll trough Dropdown on Touchscreens
* (BuZZy1337) Enhancement: Show current Tab in Pagetitle

### 3.4.0 (2018-04-23)
* (bluefox) show error about not activated admin for cloud
* (bluefox) handle mutlilanguage names
* (bluefox) show number of objects
* (BuZZy1337) always addChips when input blurs
* (bluefox) fix select ID dialog for old styles
* (bluefox) add states view for object tab

### 3.3.9 (2018-04-12)
* (bluefox) The user and groups deletion was corrected
* (bluefox) Force using of socket.io 2.1.0

### 3.3.8 (2018-04-10)
* (bluefox) Hosts selection is improved

### 3.3.7 (2018-04-10)
* (bluefox) small UI corrections

### 3.3.5 (2018-03-25)
* (bondrogeen) info for server redesigned
* (bondrogeen) hosts list redesigned
* (bluefox) small UI corrections

### 3.3.4 (2018-03-17)
* (bluefox) small UI corrections

### 3.3.3 (2018-03-15)
* (bluefox) small UI corrections

### 3.3.1 (2018-03-11)
* (bluefox) Corrections for scenes
* (bluefox) move from socket.io 2.0.4 to 1.5.1 because of bug
* (bluefox) small fix for hosts

### 3.3.0 (2018-03-10)
* (bluefox) Overview page was added
* (bluefox) Many bugs were fixed

### 3.2.4 (2018-03-04)
* (bluefox) Adjust layout on mobile devices

### 3.2.1 (2018-03-03)
* (bluefox) Many UI fixes

### 3.2.0 (2018-02-09)
* (bluefox) The select ID dialog was fixed

### 3.1.12 (2018-02-05)
* (bondrogeen) Configuration dialog updated
* (bondrogeen) Open menu button is fixed

### 3.1.11 (2018-02-04)
* (bluefox) Connection LED fixed

### 3.1.10 (2018-02-02)
* (bluefox) update material CSS
* (bluefox) fix permission error
* (bluefox) fix filter of adapters

### 3.1.7 (2018-01-31)
* (bluefox) Fixing the role selection
* (bluefox) It runs even in IE10

### 3.1.6 (2018-01-30)
* (bluefox) Fixes for Firefox and MS-EDGE

### 3.1.2 (2018-01-25)
* (bluefox) GUI corrections

### 3.0.12 (2018-01-19)
* (bluefox) Old configuration dialogs fixed
* (bluefox) convert strings to booleans by object edit
* (DeepCoreSystem) Updates in english, german and french translations
* (bluefox) buttons layout fixed
* (bluefox) event fixes

### 3.0.11 (2018-01-11)
* (DeepCoreSystem) French update
* (bluefox) fix error with empty ID 
* (bluefox) add sort by "recently updated"
* (ldittmar) add readme and issues viewer

### 3.0.10 (2018-01-06)
* (bluefox) Update indication
* (ldittmar) Use jQuery3
* (AlCalzone) German translations

### 3.0.7 (2018-01-01)
* (soef) update instances, objects and other lists
* (bluefox) rewrite interface with materialize 

### 2.0.11 (2017-10-23)
* (bluefox) Configurable event update disable threshold

### 2.0.10 (2017-10-22)
* (soef) added use of delete-key in the objects view

### 2.0.8 (2017-10-12)
* (soef) fix quickEdit: number with boolean value

### 2.0.7 (2017-10-11)
* (soef) Sort option added to object view

### 2.0.5 (2017-10-06)
* (bluefox) Show the history charts if the web server has the https option on too

### 2.0.3 (2017-08-13)
* (bluefox) Fix user access rights for sendToHost

### 2.0.2 (2017-08-12)
* (bluefox) Add the editing of the default access rights

### 2.0.1 (2017-08-07)
* (bluefox) Allow access via iobroker.pro
* (bluefox) Add node.js version recommendation

### 1.8.3 (2017-07-24)
* (bluefox) allow access on tmp directory

### 1.8.0 (2017-06-02)
* (bluefox) split into modules

### 1.7.6 (2017-06-01)
* (bluefox) Fix edit of the enum name

### 1.7.5 (2017-05-20)
* (bluefox) catch error if translated object is not text
* (bluefox) update selectID.js
* (bluefox) do not open configuration dialog for instances with no config
* (Steiger04) select multiple auch bei data-name="[eigner-name]"

### 1.7.3 (2017-03-25)
* (bluefox) fix license dialog
* (bluefox) change color of tooltip text
* (ykuendig) update german translation
* (bluefox) add docs

### 1.7.2 (2017-03-15)
* (bluefox) add statistics selector for no-city
* (bluefox) support of discovery by first start

### 1.7.1 (2017-03-11)
* (apollon77) fix save button functionality
* (ykuendig) Update german translations
* (bluefox) patch repositories to support stable

### 1.7.0 (2017-03-08)
* (bluefox) fix log
* (bluefox) show jQuery button for role button
* (apollon77) update testing setup.js
* (bluefox) fix wetty loading
* (bluefox) fix add/delete tabs
* (bluefox) implement hints for configuration dialog
* (bluefox) redirect if IP address changes
* (bluefox) add tooltip instruction
* (bluefox) wizard support
* (bluefox) fix acl error
* (bluefox) fix license agree button

## License

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>