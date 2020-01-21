---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-真空适配器
hash: AOAalXfMKBwzIM4xD3kpyJJ278omMCQWMuM55jq/RZ0=
---
![商标](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![安装数量](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.mihome-vacuum.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mihome-vacuum.png?downloads=true)

＃ioBroker mihome-vacuum适配器
[德意志银行](README_de.md)

该适配器可让您控制小米吸尘器。

##内容
-[设置]（＃configuration）
    -[配置适配器]（＃adapter-configuration）
        -[通过Alexa控制]（＃control-over-alexa）
        -[第二机器人]（＃second-robot）
    -[配置Valetudo]（＃valetudo-config）
-[功能]（＃functions）
    -[S50命令]（＃s-s-s50）
    -[转到]（＃goto）
-[区域清洁]（＃zoneclean）
    -[房间]（＃rooms）
    -[定时器]（＃timer）
    -[个人命令]（＃send-your-own-commands）
    -[sendTo挂钩]（＃send-custom-commands-with-sendto）
-[小工具]（＃widget）
-[错误]（＃bugs）
-[变更日志]（＃changelog）

##配置
当前，找到令牌是最大的问题。
请按照链接中的说明进行操作：

[代币](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

###适配器配置
-对于IP地址，必须以“ 192.168.178.XX”格式输入机器人的IP地址。
-机器人的端口默认设置为“ 54321”，请勿更改
-自己的端口，只能由第二个机器人更改
-查询间隔检索机器人状态值的时间（以毫秒为单位）（不应小于10000）

####控制Alexa
在配置中，添加alexa状态在此处被激活，一个hack被设置为附加状态“ clean_home”，这是一个从“ true”开始，在“ false”处启动的开关，它自动归位，它自动成为云中的智能设备创建的适配器名称为“真空吸尘器”，可以在云适配器中进行更改。

####使用开始按钮恢复暂停的区域清洁
启用此选项后，如果在运行区域清洁期间暂停了“开始”状态，则Vacuum将恢复区域清洁。
如果禁用此选项，则在发送启动命令时，真空吸尘器将开始新的“常规清洁”，即使在运行区域清洁期间暂停了真空吸尘器。

-实验性：使用复选框“发送自己的命令”创建对象，通过这些对象，您可以向机器人发送和接收自己的命令。

####第二个机器人
如果要通过ioBroker控制两个机械手，则必须创建两个实例。第二个机械手必须更改其自己的端口（默认值：53421），以便两个机械手都具有不同的端口。

## Valetudo配置
因此，您必须root并将valetudo安装到您的设备。 Vatudo可以使用[Valetudo RE]（https://github.com/rand256/valetudo）或普通的[Valetudo](https://github.com/Hypfer/Valetudo)

![设定档](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

-激活Valetudo激活Valetudo界面
-请求间隔必须大于1000毫秒，这是更新html映射的间隔
-地图间隔必须超过5000毫秒，此间隔会更新png地图文件（您可以将其用于Telegram或vis或其他任何东西）
-在此为地图示例选择颜色：

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

-那里的机器人，您可以为地图选择其他机器人或其他车辆

###地图小工具
要显示地图，您可以使用普通的html小部件，例如：

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.valetudo.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

第二种方法是使用src img小部件集成png文件。但是html视图速度更快，就像实时视图一样。

＃＃ 功能
S50的命令（第二代）
卡的尺寸始终为52000mm x 52000mm，因此可以设置从0到51999mm的值。
不幸的是，无法查询卡的位置和位置，这可以随吸力而变化。永远是最后一张吸卡，以及在应用程序中用作基础。
如果机器人仅拾取一个区域并始终以相同的方式构建地图，则可以可靠地将其发送到地方或对该区域进行清理。

＃＃＃＃ 去
为了将真空吸尘器驱动到一个点，必须按以下方式填充“ goTo”对象：

```
xVal, yval
```

值必须满足上述范围并在地图上指示x和y坐标。

例：

```
24,850.26500
```

#### ZoneClean
要清理区域，必须按以下方式填充ZoneClean：

```
[X1, y1, x2, x2, count]
```

其中x和y是矩形区域的坐标，并“计数”清洁操作。
您还可以让多个区域一次吸吮：

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

例：

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

####房间
具有最新Home App的更新的吸尘器支持房间的定义，请参阅[视频](https://www.youtube.com/watch?v=vEiUZzoXfPg)

当前地图中的每个房间都有一个索引，然后从应用程序将其分配给该房间。从机器人中，我们仅获得带有房间号和索引的映射。适配器每次启动时都会查询这些房间，并为每个房间创建一个通道，然后知道当前房间索引。使用按钮loadRooms手动进行相同的操作。然后可以将此频道分配给ioBroker房间。如果按下了按钮roomClean，则确定卡的索引并将其发送到机械手，以便随后可以清洁该空间。在此之前，将FAN电源设置为单室抽吸。如果您尚无法在应用程序中命名房间，则还可以通过指定地图索引来手动创建此类通道。也可以添加区域坐标而不是mapIndex。
如果要自发清洁多个房间，可以通过将ioBroker房间分配给该数据点，然后按按钮，通过multiRoomClean进行操作。

####计时器
吸尘器一旦支持房间功能（见上文），就可以创建计时器，然后触发相应的房间通道或确定其mapIndexes。
计时器可以直接通过房间和/或房间通道触发。
计时器本身是通过config区域创建的，但随后成为数据点。在那里，每个计时器都可以被激活/禁用或跳过一次。也可以直接启动。 ioBroker计时器的优点是可以在VIS中显示和使用它们，并且您可以使机器人与互联网断开连接，因为该应用程序的计时器是从中国触发的。

###发送您自己的命令
注意：此功能只能由专家使用，因为错误的命令可能会损坏吸盘

机器人区分方法（方法）中的命令和用于指定方法的参数（参数）。
在对象“ mihome-vacuum.X.control.X_send_command”下，您可以将自己的命令发送给机械手。
对象结构必须如下所示： [参数]

发送后，机械手在对象“ mihome-vacuum.X.control.X_get_response”下输入响应。如果查询了参数，它们将以JSON格式显示在此处。如果仅发送了一个命令，则机器人仅响应“ 0”。

支持以下方法和参数：

|方法参数| Beschreibung |
|-----------      |-------                                                              |-------------------                                                                                     |
| get_timer | |返回设置的计时器设置吸气时间BSp。 5天12时30分|
| set_timer | [[“” TIME_IN_MS“，[” 30 12 * * 1,2,3,4,5“，[” start_clean“，”“]]]] | |启用/禁用计时器 |
| upd_timer | [“ 1481997713308”，“打开/关闭”] | |
| | |拯救“请勿打扰”的时代 |
| get_dnd_timer | |删除免打扰时间|
| close_dnd_timer | | DND设置h，min，h，min |
| set_dnd_timer | [22,0,8,0] | |
|                 |                                                                     |                                                                                                        |
| app_rc_start | |启动远程控制|
| app_rc_end | |完成遥控器|

| app_rc_move | [{“ seqnum”：'0-1000'，“ velocity”：VALUE1，“ omega”：VALUE2，“ duration”：VALUE3}]] |移动。序列号必须是连续的，VALUE1（速度）= -0.3-0.3，VALUE2（旋转）= -3.1-3.1，VALUE3（持续时间）

您可以在此处（[链接](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)）找到更多的方法和参数。

###使用sendTo发送自定义命令
您还可以使用`sendTo`从其他适配器发送那些自定义命令。与上面定义的`method_id`和`params`结合使用：

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

`response`对象具有两个属性：`error`和（如果没有错误）`result`。

也可以通过这种方式发出几个预定义的命令：

```
sendTo("mihome-vacuum.0",
    commandName,
    {param1: value1, param2: value2, ...},
    function (response) { /* do something with the result */}
);
```

支持的命令是：

|描述`commandName`|必需参数|备注|
|开始清洁过程| `startVacuuming`| -无-| |
|停止清洁过程| `stopVacuuming`| -无-| |
|暂停清洁过程| `pause`| -无-| |
|清洁机器人周围的一小块区域| `cleanSpot`| -无-| |
|回到基地| `charge`| -无-| |
|说“嗨，我在这里！” | `findMe`| -无-| |
|检查耗材的状态（刷子等）| `getConsumableStatus`| -无-| |
|重置耗材（刷子等）的状态| `resetConsumables`| -无-|通话签名未知|
|获取以前所有清洁过程的摘要| `getCleaningSummary`| -无-| |
|获取先前清洁过程的详细摘要| `getCleaningRecord`| `recordId`| |
|获取地图| `getMap`| -无-|未知结果如何处理 |
|获取机器人的当前状态| `getStatus`| -无-| |
|检索机器人的序列号| `getSerialNumber`| -无-| |
|获取详细的设备信息| `getDeviceDetails`| -无-| |
|检索“请勿打扰”计时器| `getDNDTimer`| -无-| |
|设置新的“请勿打扰”计时器| `setDNDTimer`| `startHour`，`startMinute`，`endHour`，`endMinute`| |
|删除“请勿打扰”计时器| `deleteDNDTimer`| -无-| |
|检索当前风扇速度| `getFanSpeed`| -无-| |
|设置新风扇速度| `setFanSpeed`| `fanSpeed`| `fanSpeed`是1到100之间的数字|
|启动遥控器功能| `startRemoteControl`| -无-| |
|发出用于远程控制的移动命令`move`| `velocity`，`angularVelocity`，`duration`，`sequenceNumber`|序列号必须按顺序排列，持续时间以ms为单位|
|结束遥控器功能| `stopRemoteControl`| -无-| |
|无尘室| `cleanRooms`| `rooms`| `rooms`是逗号分隔的字符串，带有enum.rooms.XXX |
|清洁段| `cleanSegments`| `rooms`| `rooms`是一个具有mapIndex的数组或逗号分隔的具有mapIndex |
|清洁区| `cleanZone`| `coordinates`| `coordinates`是一个带有坐标和计数的字符串，请参见[zoneClean](#zoneClean)|
|清洁区| `cleanZone` | `坐标`| `coordinates` ist一个带有坐标和计数的字符串，请参见[zoneClean]（＃zoneClean）|

##小部件
抱歉，尚未完成。
![小部件](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

##错误
-偶尔断开连接，但这不是由于适配器引起的，而是主要在其自身的网络上
-当时没有功能的小部件

## Changelog
### 1.10.1 (2020-01-20)
* (dirkhe) added zone as room handling
* (dirkhe) timer could room channels directly

### 1.10.0 (2020-01-17)
* (dirkhe) added room handling
* (dirkhe) added Timer 
* (dirkhe) changed featurehandling 

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