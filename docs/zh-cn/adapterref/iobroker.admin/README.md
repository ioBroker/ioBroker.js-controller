---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.admin.svg
BADGE-Stable: http://iobroker.live/badges/admin-stable.svg
BADGE-installed: http://iobroker.live/badges/admin-installed.svg
BADGE-NPM: https://nodei.co/npm/iobroker.admin.png?downloads=true
---
# Admin

管理适配器用于配置整个ioBroker-Installation及其所有适配器。
它提供了一个Web界面，可以通过“http：//<服务器的IP地址>：8081”打开
在Web浏览器中。此适配器与ioBroker一起自动安装。

## 配置：

适配器“admin”的配置对话框提供以下设置：
![img_002](img/admin_img_002.png)

**IP：** 可以在此处选择“admin”Web服务器的IP地址。
可以选择不同的IPv4和IPv6地址。默认值为0.0.0.0 \。
如果您认为，0.0.0.0是无效设置，请让它留在那里，因为它
绝对有效。如果更改地址，您将能够访问Web服务器
只能通过这个地址。 **端口：** 您可以指定“admin”Web服务器的端口。
如果PC或设备上有更多Web服务器，则必须自定义端口以避免出现问题
双端口分配。 **编码：** 如果应使用安全的https协议，则启用此选项。

**身份验证：** 如果您希望使用登录名/密码进行身份验证，则应启用此复选框。
用户“admin”的默认密码是“iobroker”**缓冲区：** 加速页面加载启用此选项。
通常只有开发人员想要取消选中此选项。

## 处理：

管理员的主页包含多个选项卡。 **适配器：** 这里的实例
可以安装或删除适配器。使用更新按钮
![img_005](img/admin_img_005.png)
如果新版本的适配器可用，我们可以在左上角看到。
![img_001](img/admin_img_001.jpg)

显示适配器的可用和已安装版本。对于整体观看的状态
适配器是彩色的（红色=在计划中;橙色= alpha;黄色= beta）。更新版本的更新
适配器也在这里制作。如果有更新的版本，标签的字体将为绿色。
如果最后一列中的问号图标处于活动状态，您可以从那里获取包含适配器信息的网站。
可用的适配器按字母顺序排序。已安装的实例位于列表的上半部分。

**实例：** 此处列出了已安装的实例，可以进行相应的配置。如果标题
实例加下划线，您可以点击它，相应的网站将被打开。

![img_003](img/admin_img_003.png)

**对象：** 管理对象（例如连接硬件的设置/变量/程序）

![img_004](img/admin_img_004.png)

**国家：** 当前状态（对象的值）
如果安装了适配器历史记录，则可以记录所选的数据点。
已记录的数据点在右侧选择，并显示绿色徽标。

**脚本：** 此选项卡仅在安装了“javascript”适配器时才有效。

**节点红色：** 此选项卡仅在安装并启用“node-red”适配器时可见。

**主机：** 安装了ioBroker的计算机。这里可以安装最新版本的js-controller。
如果有新版本，则选项卡的字母为绿色。要搜索新版本，您必须单击更新
左下角的图标。

**枚举：** 此处列出了CCU的收藏，交易和空格。

**用户：** 这里可以添加用户。要执行此操作，请单击（+）。默认情况下有一个管理员。

**组：** 如果单击左下角的（+），则可以创建用户组。从下拉菜单中，用户被分配到组。

**事件：** 条件的运行更新列表。 **日志：** 此处显示日志在选项卡实例中显示记录的日志级别
可以设置单个实例。在选择菜单中，选择显示的最小日志级别。如果发生错误
日志的字体显示为红色。

## Changelog
### 3.7.6 (2020-01-03)
* (bluefox) The disabling of custom settings was corrected

### 3.7.5 (2019-12-29)
* (bluefox) Added the filter of the running instances
* (bluefox) The incompatible adapters will be hidden

### 3.7.1 (2019-11-20)
* (bluefox) Easy admin configuration was implemented

### 3.6.12 (2019-11-04)
* (ldittmar) Add repo check to popup messages
* (ldittmar) Update Controller-Update info page
* (Apollon77) update deps

### 3.6.11 (2019-10-16)
* (bluefox) Fixed login of non-admin user

### 3.6.10 (2019-10-11)
* (ldittmar) Add NPM version and OS check to popup messages
* (bluefox) Log paths were sanitized
* (bluefox) NPM packages were updated

### 3.6.7 (2019-09-24)
* (ldittmar) Add Node.JS version check to popup messages

### 3.6.6 (2019-09-18)
* (SchumyHao) Update Chinese translation
* (tmikulski) Update translations.json

### 3.6.5 (2019-09-02)
* (ldittmar) Fix anoying popups from info adapter

### 3.6.4 (2019-06-03)
* (bluefox) Update nodejs recommendation message and check to recommend nodejs 10

### 3.6.3 (2019-06-02)
* (bluefox) Added deleteFile internal function (required for lovelace)
* (bluefox) Added yaml editor (required for lovelace)
* (bluefox) try to fix auto-fill option
* (dobis) Update italian translations

### 3.6.2 (2019-05-05)
* (bluefox) Added onSave handler for custom dialogs

### 3.6.1 (2019-04-18)
* (ldittmar) Better integration for ioBroker.info (1.3.7)
* (ldittmar) Update Gulp to v4
* (ldittmar) Update materialize-css to v 1.0.0

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

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>