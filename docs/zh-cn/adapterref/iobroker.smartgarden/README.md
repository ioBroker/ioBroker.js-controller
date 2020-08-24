---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smartgarden/README.md
title: ioBroker.smartgarden
hash: wVJ/PkrXzfsgkReI3Ht0ofjEMzknM94tm/BhhARUbQc=
---
![商标](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

![已安装](http://iobroker.live/badges/smartgarden-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.smartgarden.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.smartgarden.svg)
![建立状态](https://travis-ci.org/jpgorganizer/ioBroker.smartgarden.svg?branch=master)
![稳定](http://iobroker.live/badges/smartgarden-stable.svg)
![NPM](https://nodei.co/npm/iobroker.smartgarden.png?downloads=true)

＃ioBroker.smartgarden
**如果您愿意，请考虑捐赠：**

[![贝宝]（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8C7M7MH3KPYDC&source=url)

##用于GARDENA智能系统的ioBroker smartgarden适配器
使用官方[GARDENA智能系统API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general)和服务的GARDENA智能系统适配器。

该适配器允许开发可与官方GARDENA应用程序并行使用的应用程序（例如，使用VIS）。适配器及其附加功能不会影响GARDENA应用程序的任何基本功能，反之亦然。

该适配器不是GARDENA应用程序的完整替代品，而是将GARDENA设备集成到带有ioBroker的智能家居中的附加功能。
可以使用适配器执行最重要的操作。它还提供了实现您自己的想法的机会，而这是GARDENA应用程序无法实现的。

##支持的设备
  -GARDENA智能SILENO机器人割草机
  -GARDENA智能灌溉控制
  -GARDENA智能压力泵
  -GARDENA智能水控制
  -GARDENA智能电源适配器
  -GARDENA智能传感器

有关设备的更多信息，请参见[GARDENA德国网站](https://www.gardena.com/de/produkte/smart/smartsystem/)和[这里是英文](https://www.gardena.com/uk/products/smart/smart-system/)。

＃＃ 要求
要使用此适配器，您需要做两件事：

1. GARDENA智能系统帐户
1. GARDENA应用程序密钥

要同时获得两者，请转至[https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/](https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/)。

![Getting_application_key](../../../en/adapterref/iobroker.smartgarden/getting_application_key.jpg)

**注意：**

  -如果您已经拥有HusqvarnaAutomower®Connect或

GARDENA智能系统帐户，您可以使用该帐户登录，然后继续执行步骤2，创建应用程序以获取应用程序密钥。

	---

***几乎可以肯定您拥有一个帐户。**请使用与注册GARDENA设备的GARDENA应用程序相同的帐户。否则，您将无法访问您的设备。*

	---

  -确保已将应用程序（从第2步开始）连接到API的
    -身份验证API ***和***
-GARDENA智能系统API。

当然，您需要运行的ioBroker安装，并且您应至少拥有一个[GARDENA智能设备](#supported-devices)。

＃＃ 目录
  * [用于GARDENA智能系统的ioBroker smartgarden适配器]（＃iobroker-smartgarden-adapter-for-gardena-smart-system）
  * [支持的设备]（＃supported-devices）
  * [要求]（＃requirements）
  * [目录]（＃table-of-contents）
  * [安装]（＃installation）
  * [设置适配器]（＃setup-adapter）
  * [获得支持]（＃getting-support）
  * [适配器的数据点]（＃data-points-of-adapter）
     * [关于数据点的一般知识]（＃general-things-toknow-about-data-points）
     * [For SERVICE_MOWER]（＃for-service_mower）
     * [对于SERVICE_VALVE_SET]（＃for-service_valve_set）
     * [对于SERVICE_VALVE]（＃for-service_valve）
     * [对于SERVICE_POWER_SOCKET]（＃for-service_power_socket）
     * [对于SERVICE_SENSOR]（＃for-service_sensor）
     * [For SERVICE_COMMON]（＃for-service_common）
  * [割草时不允许灌溉]（＃割草时不允许灌溉）
     * [出什么问题？]（＃问题是什么）
* [正在做什么？]（＃what-is-being-done）
* [基本行为-警告]（＃basic-behaviour ---- warning）
  * [希望获得数据点]（＃希望获得数据点）
  * [注意]（＃note）
  * [变更日志]（＃changelog）
     * [1.0.1]（＃101）
     * [1.0.0]（＃100）
     * [0.6.0]（＃060）
     * [0.5.1]（＃051）
     * [0.5.0]（＃050）
     * [先前版本]（＃042）
  * [学分]（＃credits）
  * [许可证]（＃license）

##安装
适配器可用

-在npm：使用`npm install iobroker.smartgarden`安装
-在GitHub的https://github.com/jpgorganizer/ioBroker.smartgarden下。

[这里](https://www.iobroker.net/docu/index-235.htm?page_id=5379&lang=de#3_Adapter_aus_eigener_URL_installieren)（德语）中提供了如何从GitHub安装的说明。

##安装适配器
1.安装适配器
2.创建适配器的实例
3.检查并完成实例配置

   **如果您更改这些设置的任何值，请重新启动适配器。**

3.1在主实例配置中编辑用户名，密码和应用程序密钥

      |参数描述 |
      | - | - |
      |用户名| GARDENA智能系统的用户名|
      |密码对应的密码|
      | API密钥| API密钥（应用程序密钥），例如在[要求](#requirements)下|

请注意，密码和应用程序密钥已编码并存储在适配器中，并且刚刚解码后可以通过GARDENA应用程序主机进行身份验证。

3.2验证其他设置的默认值，并在实例配置中打开/关闭选项。对于大多数用户而言，默认值是可以的。

      |参数描述 |
      | - | - |
      |预定义状态|预先定义Gardena API的所有状态，无论当前是否在传输它们；打开或关闭；如果打开，则将创建GARDENA智能系统API的所有状态，而不管当前是否由GARDENA服务传输这些状态；默认值：关闭; *（v0.4.0中的新功能）* |
      |预测|将预测用于充电时间和割草机剩余时间；开启/关闭割草机的预测充电和割草时间；默认值：关闭; *（v0.5.0中的新功能）* |
      |周期| MOWER历史周期数；您可以使用3（最小值）中的任何数字，但10（默认值）似乎是一个不错的选择；仅在上述*“预测” *启用时相关； *（v0.5.0中的新功能）* |
      |灌溉检查|检查割草时是否允许灌溉；开/关;默认值：关闭; *（v0.6.0中的新功能）* |

3.3验证系统设置的默认值，并在实例配置中打开/关闭选项。 **大多数用户无需在此标签上进行任何更改。**

      |参数描述 |
      | - | - |
      |日志级别|日志级别：0 =无日志，1 =一些日志，2 =更多日志，3 =所有日志；默认值：0 |
      | ping频率|将Ping发送到Gardena Webservice的频率（以秒为单位）；默认值：150 |
      |授权因素|认证令牌有效性的因素；默认值：1.001 |
      |验证网址|认证主机URL；默认值：[https://api.authentication.husqvarnagroup.dev](https://api.authentication.husqvarnagroup.dev)||
      |基本网址| Webservice Base-URL；默认值：[https://api.smart.gardena.dev]（https://api.smart.gardena.dev）|
      | TestVar |使用测试变量进行调试；开/关;默认值：关闭|

##获得支持
要获得帮助，请仔细阅读此[README]（README.md）和[FAQ](FAQ.md)。
如果您需要进一步的支持，请加入[ioBroker论坛主题](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system)。

##适配器的数据点
该适配器旨在监视和控制GARDENA智能系统设备。
为此，将有一个`LOCATION`和一个或多个`DEVICE`。
对于每个`DEVICE`，都会有

  -一个`SERVICE_COMMON_ <id>`和
  -一个或多个`SERVICE_ <servicelink_type> _ <id>`。

其中`<servicelink_type>`是设备的类型描述，例如MOWER或VALVE，而`<id>`是API使用的（编码的）GARDENA设备ID。
请参阅[https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger)中有关ServiceLink的说明。

可以通过下表中的`SERVICE_<servicelink_type>`对每个设备进行控制/监视。 `SERVICE_COMMON`提供有关设备的常规信息。

  |设备| SERVICE_ <servicelink_type> |
  | - | - |
  | SILENO智能机器人割草机| SERVICE_MOWER和SERVICE_COMMON |
  |智能灌溉控制| SERVICE_VALVE_SET，SERVICE_VALVE和SERVICE_COMMON |
  |智能压力泵| SERVICE_VALVE和SERVICE_COMMON |
  |智能水控制| SERVICE_VALVE和SERVICE_COMMON |
  |智能电源适配器| SERVICE_POWER_SOCKET和SERVICE_COMMON |
  |智能传感器| SERVICE_SENSOR和SERVICE_COMMON |

如果您需要有关数据点的更多信息，请查看[https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger)。
在那里，您将找到每个数据点的描述。除了标记为适配器而不是GARDENA智能系统API的数据点的标记。

选择功能部件后，适配器会为各种功能部件/选项创建自己的数据点。取消选择功能后，这些数据点不会自动删除。如果您不再需要这些数据点，则必须手动删除它们。

###关于数据点的一般知识
适配器不会更改GARDENA智能API传输的任何值。
唯一要做的事情（从1.0.0版开始）是检查* timestamps *和* numbers *的类型。

|检查说明|
| - | - |
|时间戳|所有时间戳均以UTC给出；如果接收到的时间戳不是有效的时间戳，则使用`01 Jan 1970 00:00:00Z`（Unix时间零）。因此，如果您看到此日期/时间，请报告。 |
|数字|如果数字不是有效数字，则使用-1代替。因此，如果您看到此号码，请报告。 |

###对于SERVICE_MOWER
####控制
要控制设备使用数据点

-`activity_control_i`

  *此数据点是由适配器生成的，由于GARDENA智能系统API的缘故，它不是必需的。*

  更改此数据点以启动割草机。

  -要开始定义的时间，请将值设置为计划的持续时间

  秒（请使用60的倍数）

  -对于自动操作，设置字符串`START_DONT_OVERRIDE`
  -取消当前操作并返回充电站使用

  字符串`PARK_UNTIL_NEXT_TASK`

  -取消当前操作，返回充电站并忽略

  计划使用字符串`PARK_UNTIL_FURTHER_NOTICE`

####监控
所有其他数据点仅用于监视和提供信息。

特殊数据点：

-`activity_mowing_i`

  *此数据点是由适配器生成的，由于GARDENA智能系统API的缘故，它不是必需的。*

  该数据点显示了割草机的两种不同状态：

  -`true`：割草或
  -`false`：不割草。

该数据点可用于进一步的操作，在这些操作中，重要的是要知道割草机是否安全地在草坪上。

根据数据点`activity_value`的值来设置此数据点。
有关详细信息，请参见下表。

  | `activity_value`| `activity_mowing_i`|
  |`OK_CHARGING`割草机必须修剪，但充电水平不足，无法将其保留在充电站中。 |错误 |
  |`PARKED_TIMER`割草机已根据计时器停放，将在配置的时间再次启动。 |错误 |
  |`PARKED_PARK_SELECTED`割草机已停放，直至另行通知。 |错误 |
  |`PARKED_AUTOTIMER`由于草高不足，割草机跳过了割草工作。 |错误 |
  |`PAUSED`割草机处于等待状态，舱口关闭。 |错误 |
  |`OK_CUTTING`割草机正在AUTO模式下进行切割（计划）。 |真实|
  |`OK_CUTTING_TIMER_OVERRIDDEN`割草机正在削减进度。 |真实|
  |`OK_SEARCHING`割草机正在搜索充电站。 |真实|
  |`OK_LEAVING`割草机正在离开充电站。 |真实|
  |`NONE`没有活动发生，可能是由于错误。 |真实|
  |`NONE`可能由于错误而没有任何活动。 |真实|
  |所有其他值|真实|

-`batteryState_chargingTime_remain_i` *（在SERVICE_COMMON ...下）*和<br/>

`activity_mowingTime_remain_i`*（在SERVICE_MOWER ...下）*

  *两个数据点均由适配器生成，由于GARDENA智能系统API的缘故，因此不需要。

这些数据点显示了割草机剩余的充电时间和割草时间（以秒为单位）的预测。
仅在实例配置中选择功能时才创建它们。

为了预测值，将最近几个充电和修剪周期的历史记录保存在`info.saveMowingHistory`和`info.saveChargingHistory`两个状态中。

可以在适配器实例配置中打开/关闭此功能，以及历史记录中保存的充电和修剪周期数。

要使该功能投入运行，**请确保至少一个修剪和充电周期无误运行（例如，不要手动中断或传感器控制）。**最好至少完成三轮无错运行。
此函数尝试识别正常情况，并最初假定下一个过程是正常情况。如果这是错误的，则将该错误的运行视为正常情况，然后将正常通过的运行视为故障情况。如果运行期间发生错误，请停止适配器，删除两个数据点，然后重新启动。

有关常规预测机制的更多信息，请参见[FORECAST.md](FORECAST.md)。

  **笔记：**

    1.预测值仅在至少完成一项时才可用

充电和修剪周期已保存在历史记录中。

    2.历史记录保存在“ info”下，因此如果需要“ LOCATION”

被删除，例如在以后的更新中，它不会丢失。

    3.如果断开割草机与GARDENA智能系统的连接，

再次重新连接，历史将丢失，因为您的割草机在GARDENA智能系统中获得了新的ID。这意味着适配器无法将割草机识别为先前的割草机-可能是第二割草机。
在这种情况下，建议删除这两个数据点并重新启动适配器，以使先前的（现在已很旧的）历史记录集不会被持续读取和写入。然后，适配器开始建立新的历史记录。

4.此功能应适用于多台割草机，但是

未测试*（我不能这样做，因为我只有一个割草机）*。
如果割草机不止一台，请测试并报告错误，当然还要报告其是否按预期工作。在此先感谢您。

-`lastErrorCode_value`

请特别注意数据点`lastErrorCode_value`。
可能的值的描述可以在https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger中找到，请参阅“ MowerService-lastErrorCode”

###对于SERVICE_VALVE_SET
####控制
要控制设备使用数据点

-`stop_all_valves_i`

  *此数据点是由适配器生成的，由于GARDENA智能系统API的缘故，它不是必需的。*

  更改该数据点以停止所有阀门。

  -要立即停止所有阀门，请使用字符串“ STOP_UNTIL_NEXT_TASK”

**注意：**不要在您的应用程序中显示此数据点的值，因为该值大多是未定义的。此外，此数据点不能用作您自己的操作的触发器，因为在命令被触发后，它仅被设置为值* null *。

####监控
所有其他数据点仅用于监视和提供信息。

###对于SERVICE_VALVE
####控制
要控制设备使用数据点

-`duration_value`

  更改该数据点以启动阀门。

  -要在定义的时间内启动，请将值设置为以秒为单位的值

  （请使用60的倍数）。

**注意：**允许的值有一些限制。
如果发现其他限制，请报告。

    |设备|极限 |
    | - | - |
    | GARDENA智能灌溉控制| 3540秒（59分钟）|
    | GARDENA智能泵| 36000（10小时）|
    | GARDENA智能水控制| 36000（10小时）|

  -要取消当前的浇水并继续使用时间表，请使用字符串

  `STOP_UNTIL_NEXT_TASK`

  -要跳过自动操作直到指定时间，当前处于活动状态

使用字符串`PAUSE_<number_of_seconds>`可能会或可能不会取消操作（取决于设备型号），例如`PAUSE_86400`暂停24小时（请使用60的倍数）

  -要恢复自动操作（如果已暂停），请使用字符串“ UNPAUSE”

-`irrigationWhileMowing_allowed_i`和`irrigationWhileMowing_mowerDefinition_i`

  *此数据点是由适配器生成的，由于GARDENA智能系统API的缘故，因此不需要。

这些数据点可控制功能*割草时不允许灌溉*。
仅在实例配置中选择功能时才创建它们。
有关此功能的说明，请参见章节[割草时不允许灌溉](#Irrigation-not-allowed-while-mowing)。

####监控
所有其他数据点仅用于监视和提供信息。

特殊数据点：

-`duration_leftover_i`

  *此数据点是由适配器生成的，由于GARDENA智能系统API的缘故，它不是必需的。*

该值描述了直到阀门关闭并停止浇水的分钟数。

    -一个整数，一个（`1`）或更大。
    -如果未定义，则为null

###对于SERVICE_POWER_SOCKET
####控制
要控制设备使用数据点

-`duration_value`

  更改此数据点以启动电源插座。

  -要在定义的时间内启动，请将值设置为以秒为单位的值

  （请使用60的倍数）

  -要永久打开设备，请使用字符串“ START_OVERRIDE”。
  -要停止设备，请使用“ STOP_UNTIL_NEXT_TASK”。
  -跳过自动操作直到指定的时间。当前活动的操作

不会被取消。使用字符串`PAUSE_<number_of_seconds>`，例如`PAUSE_86400`暂停24小时（请使用60的倍数）

  -要恢复自动操作（如果已暂停），请使用字符串“ UNPAUSE”

####监控
所有其他数据点仅用于监视和提供信息。

特殊数据点：

-`duration_leftover_i`

  *此数据点是由适配器生成的，由于GARDENA智能系统API的缘故，它不是必需的。*

  该值描述电源插座关闭之前的分钟数。

    -一个整数，一个（`1`）或更大。
    -如果未定义，则为null

###对于SERVICE_SENSOR
####控制
没有可用的控制功能。

####监控
所有数据点仅用于监视和提供信息。

###对于SERVICE_COMMON
`SERVICE_COMMON`提供有关设备的常规信息。
必要时，说明会集成到其他SERVICE _...的说明中。

##割草时不允许灌溉
＃＃＃ 有什么问题？
如果您同时拥有割草机和带有弹出式洒水装置的灌溉系统，则可能会在灌溉运行时割草机碰到弹出式洒水装置并损坏或造成损坏。

为避免这种情况，割草机割草时应关闭灌溉系统或更好的单个阀门。

###正在做什么？
使用此功能，可以在割草机在草坪上时停止灌溉。可以为每个阀分别定义。

可以为每个阀门定义一个或多个割草机，在割草机割草时不允许打开阀门。
原则上，割草机的优先级高于灌溉，即，如果出现割草机割草且阀门打开的冲突，则阀门将关闭，并设置相应的警告。

另外，可以定义无论割草机如何，阀门都决不能打开。例如。如果阀门或其背后的管道损坏，可以使用。

整个检查可以在带有参数* irrigation check *的实例配置中打开或关闭。

每个`SERVICE_VALVE`都有三个数据点。
它们用于配置和报告警告。

  |数据点|可写数据点描述|
  | - | - | - |
  |`irrigationWhileMowing_allowed_i`| |是|如果应检查在割草机在草坪上修剪时是否允许灌溉，则设置为`false`，否则|§SSSSS_2§§|
  |`irrigationWhileMowing_warningCode_i`||没有如果阀门打开，则设置警告代码。可能的警告代码请参见下表。如果设置了多个警告，则代码与`+`（例如`STOPPED+UNKNOWN_MOWER`）串联在一起。 |
  |`irrigationWhileMowing_warningCode_i` ||没有如果阀门打开，则设置警告代码。可能的警告代码请参见下表。如果设置了多个警告，则代码将以“ +”串联（例如“ STOPPED + UNKNOWN_MOWER”）。 |

* ***割草机ID格式***

  `smartgarden.0.LOCATION_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.DEVICE_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.SERVICE_MOWER_xxxxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxx`

您可以从ioBroker的对象选项卡中复制此割草机ID，请参见下图的红色箭头。

  ![割草机编号](../../../en/adapterref/iobroker.smartgarden/mowerid.jpg)

* ***警告代码*** </br>

  |警告代码|描述|
  | - | - |
  | `NO_WARNING`|无警告，阀门已打开|
  | `STOPPED`|由于割草机在关闭，阀门自动关闭|
  | `FORBIDDEN`|关闭了阀门，因为在数据点`irrigationWhileMowing_mowerDefinition_i`|中设置了特殊代码`IRRIGATION_FORBIDDEN` |
  | “ FORBIDDEN”阀关闭，因为在数据点“ irrigationWhileMowing_mowerDefinition_i”中设置了特殊代码“ IRRIGATION_FORBIDDEN”。 |

每次

-阀门打开或
-割草机开始割草

当您更改上面列出的数据点中的值时，它不会运行。
这意味着：如果存在冲突情况，并且将`irrigationWhileMowing_allowed_i`从`true`更改为`false`，则冲突不会被识别，并且冲突将继续。相同的行为适用于`irrigationWhileMowing_mowerDefinition_i`的更改。

###基本行为-警告
此功能无法防止割草机在割草时打开阀门。这可以例如通过GARDENA应用程序手动完成或通过时间表自动完成。

如果发生冲突，此功能只能尽快关闭阀门。并且冲突也可能不会被识别。
因此，有可能让水通过。
**例如。不能防止弹出式喷头伸展并且割草机撞到弹出式喷头**，但这种情况发生的可能性已降至最低。
**因此，由您的应用程序确定此冲突永远不会发生。**

##数据点的愿望
该适配器报告“每个值”作为通过GARDENA智能系统API提供的数据点。如果有人需要更多值，请联系GARDENA，并告知他们该值也将包含在API中。为此，请转至***§LLLLL_0§§页脚的“与我们联系并留下反馈” ***。

＃＃ 注意
这是一个私人项目。我与GARDENA或Husqvarna没有任何关系。

##积分
smartgarden徽标：http://www.freepik.com由Freepik设计

## Changelog
### 1.0.1
* (jpgorganizer)
  - better reconnection to GARDENA smart system server in case of your internet connection was broken
  - textual changes in io-package.json
  - improved README and FAQ
  
  ### 1.0.0
* (jpgorganizer)
  - code rework, no functional change expected
  - support `PAUSE` for SERVICE_VALVE, SERVICE_POWER_SOCKET. e.g. 
	[Issue 14](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/14)
  - internal representation for all timestamps changed from format like 
    `2020-05-26T05:03:47.613+0000` to `2020-05-26T05:03:47.613Z` to 
    support Safari browser e.g. 
	[Issue 12](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/12).
  - support forecast values for mower id's in format with suffix, 
    e.g. `d8a1faef-2ee3-421d-a3f8-f8ed577c2ad3:suffix`, e.g. 
	[Issue 12](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/12)
  - making the adapter more fault tolerant at startup, e.g. trimming 
    whitespaces from username, etc.
  - README: new chapter *Getting support*, 
  - README: chapter *Known Errors* deleted, should be resolved by GARDENA 
  - README: links to GARDENA/Husqvarna developer portal adjusted to the new address

### 0.6.0
* (jpgorganizer) 
  - new feature *Irrigation not allowed while mowing*, 
    for detailed description see 
	[Irrigation not allowed while mowing](#Irrigation-not-allowed-while-mowing); 
    e.g. 
	[Issue 5](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/5)
  - rework instance config dialog
  - improvement of documentation

### 0.5.1
* (jpgorganizer) 
  - some corrections (sensor, typo)
  - integration of travis-ci
  
### 0.5.0
* (jpgorganizer) 
  - MOWER: forecast for remaining charging time and remaining mowing time 
  integrated, e.g. [Issue 1](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/1)
  - **IMPORTANT CHANGE** for existing users: the id for LOCATION, all 
    DEVICE's and all SERVICE's has changed due to support of History adapter. 
	(History adapter cannot handle id's with `%` (percent) character 
	within id's, although the `%` is not forbidden in id's in ioBroker), e.g. 
	[Issue 8](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/8). 
  
    So you **must delete all states** of the adapter instance to 
    install this release and please check your application carefully for 
    necessary adjustments regarding the change of the id names.

  - devices *Water Control* and *Smart Pump* tested (many thanks to user 
    gammler2003 and xengosam at 
    [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)
  - some code rework and improvement of documentation
  - dependency corrected, important for js-controller v3, e.g. 
    [Issue 7](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/7)
  - adapter now available at npm
  
### 0.4.2
* (jpgorganizer) 
  - error *missing SENSOR data* fixed (many thanks to user dslraser and 
  muckel at 
  [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)

### 0.4.1
* (jpgorganizer) 
  - Dependency get's resolved now
  
### 0.4.0
* (jpgorganizer) 
  - **NOTE:** with this version an additional dependency is necessary at runtime. 
  If it does not get installed together with the installation of this adapter, 
  please install seperately with 
  `npm install https://github.com/jpgorganizer/ioBroker.utils` or 
  `npm i @jpgorganizer/utils`
  - **NOTE:** you **must delete all states** of the adapter instance to 
  install this release and please check your application carefully for 
  necessary adjustments regarding type/role changes (see below) 
  - data types of (nearly) all data points adjusted for compliance with 
  ioBroker guidance: 
    * states now have special ioBroker type and role instead of former 
	`string`/`text` where applicable, e.g. `number`/`value.battery` for 
	`batteryLevel_value`, see 
	[Issue 3](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/3)
  - data point `activity_value_i` replaced by `activity_mowing_i` with 
    type/role `boolean`/`indicator.working`: `true` means *mowing*, `false` 
  means *not mowing*
  - possibility to pre-define states integrated, see new switch 
  `PreDefine States` in adapter/instance configuration, see 
  [Issue 2](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/2)
  - states are readonly now; except states for commands, see 
  [Issue 4](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/4)
  - input field for `useTestVariable` in adapter/instance configuration 
  switched to a *checkbox* (former: *text*); please check your settings
  - error in command  `stop_all_valves_i` in VALVE_SET fixed
  
### 0.3.0
* (jpgorganizer) 
  - create all states read/write 
  - error TypeError: Cannot read property 'val' of null with useTestVariable 
  fixed



### 0.2.0
* (jpgorganizer) 
  - **IMPORTANT** : data point for MOWER control (command) changed from  
  `duration_value` to `activity_control_i`
  - rework leftovertimer 
  - improved error handling
  - improved logging (see  loglevel in adapter configurations)

### 0.0.1
* (jpgorganizer) initial release

## License

Copyright (c) 2020 jpgorganizer, https://github.com/jpgorganizer 

smartgarden by jpgorganizer is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
[(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden. 
 

<!--- SVN: $Rev: 2222 $ $Date: 2020-08-17 11:20:02 +0200 (Mo, 17 Aug 2020) $ --->