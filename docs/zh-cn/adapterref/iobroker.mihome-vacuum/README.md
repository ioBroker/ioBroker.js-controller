---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-vacuum适配器
hash: 397aoJdVXEmf4jU9mhgcGIdTtzu5ml/ND4jdJKe9Hu8=
---
![商标](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![安装数量](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.mihome-vacuum.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mihome-vacuum.png?downloads=true)

＃ioBroker mihome-vacuum adapter
[Deutsche beschreibung hier](README_de.md)

此适配器允许您控制小米吸尘器。

##内容
 -  [设置]（＃配置）
     -  [与Android]（＃on-android）
     -  [与iOS]（＃for-ios）
     -  [配置适配器]（#adapter-configuration）
         -  [通过Alexa控制]（＃control-over-alexa）
         -  [第二机器人]（＃second-robot）
 -  [功能]（＃功能）
     -  [S50命令]（#svid-of-the-s50）
     -  [转到]（＃goto）
 -  [区域清洁]（＃zoneclean）
     -  [自己的命令]（＃send-your-own-commands）
     -  [sendTo hook]（＃send-custom-commands-with-sendto）
 -  [widget]（＃widget）
 -  [bug]（#bugs）
 -  [更改日志]（#changelog）

##配置
目前，找到令牌是最大的问题。
可以使用以下过程：

### Android上的简单令牌发现
只需卸载官方MiHome应用程序并从[这个页面（俄语）](http://www.kapiba.ru/2017/11/mi-home.html)安装：

 -  [链接APK]（https://cloud.mail.ru/public/BSos/7YJhcLB2W/MiHome_5.4.13_vevs.apk）。

使用与官方应用程序相同的设置进行安装和登录后，您将在设备的“网络信息”中找到该令牌。

###在Android上
准备工作：需要配备现成MiHome应用程序的Android智能手机。奶嘴必须添加并装入其中。

非根Android手机

 - 下载并解压缩[MiToolkit]（https://github.com/ultrara1n/MiToolkit/releases）并启动MiToolkit.exe。
 - 在智能手机设置中启用USB调试（[视频]（https://www.youtube.com/watch?v=aw7D6bNgI1U））
 - 使用USB线将智能手机连接到PC。
 - 在MiToolkit中单击“检查连接”，如有必要，测试Java安装，两个测试都应该无故障运行。
 - 单击“读取令牌”并在智能手机上确认消息（不给密码！）。

在智能手机上应该打开（自动）MiHome应用程序，并且应该备份到PC（应该花几秒钟），程序然后从MiHome数据库（miio2.db）读取令牌。
现在在打开的窗口中查找rockrobo.vacuum并复制32位令牌并在配置窗口中输入它。

扎根Android手机

 - 您必须使用MiHome app 4.xx-5.029。更高版本的Mihome应用程序在数据库中不包含令牌。
 - 使用MiHome app在手机上安装[aSQLiteManager]（https://play.google.com/store/apps/details?id=dk.andsen.asqlitemanager）
 - 制作副本/data/data/com.xiaomi.smarthome/databases/miio2.db
 - 使用aSQLiteManager打开miio2.db的副本并执行查询“从devicerecord中选择令牌，其中localIP为'192.168.89.100'”，其中用小米真空吸尘器的IP地址替换IP地址192.168.89.100。复制32位令牌并在配置窗口中输入。

###对于iOS
随着越狱：

 - 如果在/var/mobile/Containers/Data/Application/514106F3-C854-45E9-A45C-119CB4FFC235/Documents/USERID_mihome.sqlite中找到令牌

没有越狱：

 - 首先通过iPhone备份读取所需的令牌
 - 为此，首先在iPhone上设置xiaomi
 - 使用iTunes或3utools创建备份
 - 然后安装[iphonebackupviewer]（http://www.imactools.com/iphonebackupviewer/）
 - 转到树视图（右上角）
 - 转到路径AppDomain-com.xiaomi.mihome \ Documents \
 - 下载文件xxxxxxxxxx_mihome.sqlite

 - 如果找不到文件/文件夹，请使用iTunes备份而不是使用3utools

 - 使用[DBite for SQLite]打开它们（https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.10.1/SQLiteDatabaseBrowserPortable_3.10.1_English.paf.exe）
 - 可以在最右侧列ZTOKEN的浏览数据表ZDEVICE下找到96位十六进制密钥
 - 现在必须将96位十六进制密钥转换为32位密钥
 - 在此处通过[link]（http://aes.online-domain-tools.com/）输入以下内容
 - 输入类型：文本
 - 输入文本：96位数字键
 - 十六进制
 - 自动检测：开启
 - 功能：AES
 - 模式：ECB（电子密码本）
 - 密钥：00000000000000000000000000000000 *必须是32位数
 - 十六进制
 - 现在单击Decrypt并从最右侧的解密文本中删除32位数密钥

###适配器配置
 - 对于IP地址，必须以“192.168.178.XX”格式输入机器人的IP地址
 - 默认情况下，机器人的端口设置为“54321”，不应更改此端口
 - 自己的端口，只能用第二个机器人更换
 - 查询间隔检索机器人状态值的时间（以毫秒为单位）（不应小于10000）

####控制Alexa
在配置添加alexa状态被激活这里是一个hack被设置一个额外的状态“clean_home”它是一个开关，从“真”吸盘开始，在“假”它回家，它自动成为云中的智能设备使用名称“vacuum cleaner”创建的适配器，可以在云适配器中更改。

####使用开始按钮恢复暂停的区域清理
启用此选项后，如果在运行区域清洁期间暂停状态，则将“启动”状态设置为“真”时，真空将恢复区域清理。
如果禁用此选项，则在发送启动命令时，即使在运行区域清洁期间暂停，真空也将启动新的“正常清洁”。

 - 实验：使用“发送您自己的命令”复选框创建对象，通过该对象可以向机器人发送和接收您自己的命令。

####第二个机器人
如果要通过ioBroker控制两个机器人，则必须创建两个实例。第二个机器人必须更改自己的端口（默认值：53421），以便两个机器人具有不同的端口。

＃＃ 功能
### S50的命令（第二代）
卡片尺寸始终为52000mm x 52000mm，因此可以使用0到51999mm的值。
不幸的是，卡的位置和位置无法查询，这可能会从吸力变为吸力。用作基础始终是最后一个吸卡，以及在应用程序中。
如果机器人只拾取一个区域并始终以相同的方式构建地图，则可以将其可靠地发送到地方或将区域抽真空。

＃＃＃＃ 去
为了将真空吸尘器驱动到某一点，必须按如下方式填充“goTo”对象：

```
xVal, yval
```

值必须满足上述范围，并指示地图上的x和y坐标。

例：

```
24,850.26500
```

#### ZoneClean
要清空区域，必须按如下方式填写ZoneClean：

```
[X1, y1, x2, x2, count]
```

其中x和y是矩形区域的坐标，并“计算”清洁操作。
你也可以让几个区域一次吸吮：

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

例：

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

###发送您自己的命令
注意：此功能只能由专家使用，因为错误的命令可能会损坏吸盘

机器人区分用于指定方法的方法（方法）和参数（参数）中的命令。
在“mihome-vacuum.X.control.X_send_command”对象下，您可以将自己的命令发送给机器人。
对象结构必须如下所示：方法; [PARAMS]

在“mihome-vacuum.X.control.X_get_response”对象下，机器人在发送后输入响应。如果查询了参数，它们将以JSON格式显示在此处。如果仅发送一个命令，则机器人仅响应“0”。

支持以下方法和参数：

|方法|参数| Beschreibung |
|-----------      |-------                                                              |-------------------                                                                                     |
| get_timer | |返回set timer设置吸入次数BSp。 12点30分在5天内|
| set_timer | [[“TIME_IN_MS”，[“30 12 * * 1,2,3,4,5”，[“start_clean”，“”]]]] |启用/禁用计时器|
| upd_timer | [“1481997713308”，“开/关”] | |
| | |拯救Do Not Distrube的时代 |
| get_dnd_timer | |删除DND时间|
| close_dnd_timer | | DND设置h，min，h，min |
| set_dnd_timer | [22,0,8,0] | |
|                 |                                                                     |                                                                                                        |
| app_rc_start | |启动Romote Control |
| app_rc_end | |完成远程控制|

| app_rc_move | [{“seqnum”：'0-1000'，“velocity”：VALUE1，“omega”：VALUE2，“duration”：VALUE3}] |移动。序号必须是连续的，VALUE1（速度）= -0.3-0.3，VALUE2（旋转）= -3.1-3.1，VALUE3（持续时间）

您可以在此处找到更多方法和参数（[链接](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)）。

###使用sendTo发送自定义命令
您还可以使用`sendTo`从其他适配器发送这些自定义命令。使用`method_id`和`params`如上所定义：

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

`response`对象具有两个属性：`error`和（如果没有错误）`result`。

也可以通过这种方式发出一些预定义的命令：

```
sendTo("mihome-vacuum.0",
    commandName,
    {param1: value1, param2: value2, ...},
    function (response) { /* do something with the result */}
);
```

支持的命令是：

|说明| `commandName`|要求的参数|备注|
|开始清洁过程| `startVacuuming`| - 无 -  | |
|停止清洁过程| `stopVacuuming`| - 无 -  | |
|暂停清洁过程| `pause`| - 无 -  | |
|清洁机器人周围的小区域`cleanSpot`| - 无 -  | |
|回到基地| `charge`| - 无 -  | |
|说“嗨，我在这儿！” | `findMe`| - 无 -  | |
|检查消耗品的状态（刷子等）| `getConsumableStatus`| - 无 -  | |
|重置耗材状态（刷子等）| `resetConsumables`| - 无 -  |呼叫签名未知|
|获取所有先前清洁过程的摘要| `getCleaningSummary`| - 无 -  | |
|获取先前清洁过程的详细摘要| `getCleaningRecord`| `recordId`| |
|获取地图| `getMap`| - 无 -  |未知如何处理结果|
|获取机器人的当前状态| `getStatus`| - 无 -  | |
|检索机器人的序列号| `getSerialNumber`| - 无 -  | |
|获取详细的设备信息| `getDeviceDetails`| - 无 -  | |
|检索*请勿打扰*计时器| `getDNDTimer`| - 无 -  | |
|设置新的*请勿打扰*计时器| `setDNDTimer`| `startHour`，`startMinute`，`endHour`，`endMinute`| |
|删除*请勿打扰*计时器| `deleteDNDTimer`| - 无 -  | |
|检索当前的风扇速度| `getFanSpeed`| - 无 -  | |
|设置新的风扇速度| `setFanSpeed`| `fanSpeed`| `fanSpeed`是介于1和100之间的数字 |
|启动遥控器功能| `startRemoteControl`| - 无 -  | |
|发出远程控制的移动命令`move`| `velocity`，`angularVelocity`，`duration`，`sequenceNumber`|序列号必须是顺序的，持续时间以ms为单位 |
|结束遥控器功能| `stopRemoteControl`| - 无 -  | |
|结束遥控器功能| `stopRemoteControl` | - 无 -  | |

##小工具
对不起，还没完呢。
![窗口小部件](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Bugs
 - 偶尔断开连接，但这不是由于适配器，而是主要在自己的网络上
 - 当时没有功能的小工具

## Changelog
### 1.1.6 (2018-12-06)
* (JoJ123) Added fan speed for MOP (S50+).

### 1.1.5 (2018-09-02)
* (BuZZy1337) Added description for Status 16 and 17 (goTo and zonecleaning).
* (BuZZy1337) Added setting for automatic resume of paused zonecleaning.

### 1.1.4 (2018-08-24)
* (BuZZy1337) Added possibility to resume a paused zoneclean (State: mihome-vacuum.X.control.resumeZoneClean)

### 1.1.3 (2018-07-11)
* (BuZZy1337) fixed zoneCleanup state not working (vacuum was only leaving the dock, saying "Finished ZoneCleanup", and returned immediately back to the dock)

### 1.1.2 (2018-07-05)
* (BuZZy1337) fixed detection of new Firmware / Second generation Vacuum

### 1.1.1 (2018-04-17)
* (MeisterTR) error catched , added states for new fw

### 1.1.0 (2018-04-10)
* (mswiege) Finished the widget

### 1.0.1 (2018-01-26)
* (MeisterTR) ready for admin3
* (MeisterTR) support SpotClean and voice level (v1)
* (MeisterTR) support second generation (S50)
* (MeisterTR) Speed up data requests

### 0.6.0 (2017-11-17)
* (MeisterTR) use 96 char token from Ios Backup
* (MeisterTR) faster connection on first use

### 0.5.9 (2017-11-03)
* (MeisterTR) fix communication error without i-net
* (AlCalzone) add selection of predefined power levels

### 0.5.7 (2017-08-17)
* (MeisterTR) compare system time and Robot time (fix no connection if system time is different)
* (MeisterTR) update values if robot start by cloud

### 0.5.6 (2017-07-23)
* (MeisterTR) add option for crate switch for Alexa control

### 0.5.5 (2017-06-30)
* (MeisterTR) add states, fetures, fix communication errors

### 0.3.2 (2017-06-07)
* (MeisterTR) fix no communication after softwareupdate(Vers. 3.3.9)

### 0.3.1 (2017-04-10)
* (MeisterTR) fix setting the fan power
* (bluefox) catch error if port is occupied

### 0.3.0 (2017-04-08)
* (MeisterTR) add more states

### 0.0.2 (2017-04-02)
* (steinwedel) implement better decoding of packets

### 0.0.1 (2017-01-16)
* (bluefox) initial commit