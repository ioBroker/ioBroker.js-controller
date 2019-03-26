---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/UncleSamSwiss/ioBroker.loxone/edit/master//README.md
title: Loxone Miniserver Adapter
hash: W9o7DX8gyGrs/dwXu5uQ9fm8LyJNElXyna/6Zz7b8bQ=
adapter: true
license: Apache 2.0
authors: UncleSamSwiss <samuel.weibel@gmail.com>
description: Communicates with a Loxone Miniserver.
keywords: loxone, miniserver, smarthome
readme: https://github.com/UncleSamSwiss/ioBroker.loxone/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-04-24T19:18:46.399Z
version: 1.0.0
BADGE-安装数量: http://iobroker.live/badges/loxone-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.loxone.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.loxone.svg
BADGE-特拉维斯: https://img.shields.io/travis/UncleSamSwiss/ioBroker.loxone.svg
BADGE-AppVeyor构建状态: https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-loxone.svg
BADGE-GitHub问题: https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.loxone.svg
---
![Loxone标志](zh-cn/adapterref/iobroker.loxone/../../../en/adapterref/iobroker.loxone/admin/loxone.png)


适用于Loxone Miniserver的＃ioBroker适配器
***此适配器至少需要nodejs 4.x！***

获取Loxone Miniserver（和Loxone Miniserver Go）中提供的所有信息，并实时提供更改。

##安装
通过ioBroker管理员安装此适配器：

1.打开实例配置对话框
2.输入您的Loxone Miniserver的IP地址或主机名和HTTP端口（默认为80）
3.在Loxone Miniserver中创建一个新用户（使用Loxone配置应用程序），您只需为所有必需变量提供读写权限。
4.在配置对话框中输入此用户的名称及其密码
5.保存配置
6.启动适配器

##配置
### Miniserver主机名/ IP
这是您的Loxone Miniserver或Miniserver Go的IP地址或主机名。

### Miniserver Port
这是您的Loxone Miniserver的HTTP端口。

默认情况下，Miniserver配置为侦听端口80，但您可能已更改它。

### Miniserver用户名
提供有效的用户名以访问Loxone Miniserver。

出于安全原因，强烈建议使用与“admin”不同的用户。

用户只需要对要从ioBroker使用的变量进行读访问。

### Miniserver密码
提供给定用户名的密码（参见上文）。

请注意，此密码在ioBroker中存储不安全 - 因此请勿使用“admin”用户！

###同步名称
这将在ioBroker中更新Loxone配置中的名称。
如果禁用此选项，则只会在第一次检测到控件时同步名称。

###同步房间
这将填充enum.rooms枚举与Loxone Miniserver提供的所有房间，并将链接所有控件。

###同步功能
这将使用Loxone Miniserver提供的所有类别填充enum.functions枚举，并将链接所有控件。

＃＃ 状态
适配器自动连接到配置的Loxone Miniserver，并为它找到的每个控件状态创建状态。

状态的ID格式如下：`loxone.<instance>.<control>.<state>`

 - `<instance>`是ioBroker适配器实例索引（通常为“0”）
 - `<control>`是控件的UUID
 - `<state>`是控件中的状态（有关详细信息，请参阅[支持的控件类型]（＃supported-control-types））。

在Loxone Config中配置控件时提供的名称将仅用作ioBroker中的显示名称。
这是因为用户可以为多个控件选择相同的名称。

有关控件及其状态的更多信息，请查看Loxone API（尤其是结构文件）：https：//www.loxone.com/enen/kb/api/

##控制可见性
默认情况下，Loxone Miniserver会从Web界面隐藏许多控件（以及它们的状态）。

这意味着，它们也隐藏在这个ioBroker适配器中。

为确保您的所有州都已正确报告给ioBroker，请确认他们已选中“在可视化中使用”：

![在可视化设置中使用](zh-cn/adapterref/iobroker.loxone/../../../en/adapterref/iobroker.loxone/doc/loxone-config-use-in-visualization.png)

##全球国家
此适配器当前提供以下全局状态：

 - `operatingMode`：Loxone Miniserver的当前操作模式编号
 - `operatingMode-text`：Loxone Miniserver的当前操作模式为文本
 - “日出”：今天太阳升起的午夜之后的分钟数
 - “夕阳”：今天太阳下山午夜后的分钟数
 - `notifications`：通知的数量
 - `修改'：修改次数
 - 所有其他全球国家仅作为文本报告

##支持的控件类型
此适配器当前支持以下控件类型。

在州名称后面，您可以看到州的类型：

 - `（rw）`：可读写：可以从ioBroker更改此状态
 - `（ro）`：只读：无法从ioBroker更改此状态
 - `（wo）`：只写：此适配器不报告此状态的值，但可以更改，触发Loxone Miniserver上的某些操作

###闹钟
由burgler报警控制提供。

 - 警报的`armed`（rw）布尔状态（真/假）;将“true”写入此值将立即打开警报（没有预定义的延迟）
 - `nextLevel`（ro）下一个警报级别的ID
    * 1 =无声
    * 2 = Acustic
    * 3 =光学
    * 4 =内部
    * 5 =外部
    * 6 =远程
 - `nextLevelDelay`（ro）下一级的延迟，以秒为单位
 - `nextLevelDelayTotal`（ro）下一级的总延迟，以秒为单位
 - “level”（ro）当前警报级别的ID
    * 1 =无声
    * 2 = Acustic
    * 3 =光学
    * 4 =内部
    * 5 =外部
    * 6 =远程
 - `startTime`（ro）报警开始时的时间戳
 - `armedDelay`（ro）警报控制的延迟
 - `armedDelayTotal`（ro）报警控制的总延迟
 - “传感器”（ro）传感器列表
 - `disabledMove`（rw）运动被禁用（true）或不（false）
 - `delayedOn`（wo）将任何值写入此状态会使用配置的延迟来控制警报
 - `quit`（wo）将任何值写入此状态即可确认警报

###中央警报
由中央burgler报警控制提供。

 - 警报的`armed`（rw）布尔状态（真/假）;将“true”写入此值将立即打开警报（没有预定义的延迟）
 - `delayedOn`（wo）将任何值写入此状态会使用配置的延迟来控制警报
 - `quit`（wo）将任何值写入此状态即可确认警报

### AlarmClock
由闹钟控制提供。

 - 闹钟的`isEnabled`（rw）布尔状态（真/假）
 - `isAlarmActive`（ro）布尔值（true / false）警报当前是否响铃
 - `confirmationNeeded`（ro）布尔值（true / false）用户是否需要确认警报
 - `ringingTime`（ro）倒计时，以秒为单位闹钟将响多长时间，直到它再次打盹为止
 - 闹钟振铃的“ringDuration”（rw）持续时间（秒）
 - `prepareDuration`（rw）准备时间，以秒为单位
 - `snoozeTime`（ro）秒，直到打盹结束
 - “snoozeDuration”（rw）持续时间以秒为单位
 - `snooze`（wo）将任何值写入此状态会暂停当前警报
 - `dismiss`（wo）向此状态写入任何值都会消除当前的警报

### AudioZone
由Music Server Zone提供。

 - 音乐服务器的`serverState`（ro）状态：
    * -3 =未知/无效区域
    * -2 =无法访问
    * -1 =未知
    * 0 =离线
    * 1 =初始化（启动，试图达到它）
    * 2 =在线
 - `playState`（rw）播放状态：
    * -1 =未知（此值无法设置）
    * 0 =停止（设置此值将暂停播放）
    * 1 =暂停（设置此值将暂停播放）
    * 2 =正在播放（设置此值将开始/恢复播放）
 - 客户端的`clientState`（ro）状态：
    * 0 =离线
    * 1 =初始化（启动，试图达到它）
    * 2 =在线
 - “power”（rw）客户端电源是否处于活动状态
 - `volume`（rw）当前音量
 - 可以为`maxVolume`（ro）区域分配最大音量
 - `shuffle`（rw）是否启用了播放列表shuffle
 - 包含所有区域收藏夹的`sourceList`（ro）列表
 - `repeat`（rw）重复模式：
    * -1 =未知
    * 0 =关闭
    * 1 =重复全部
    * 2 =  - 未使用 -
    * 3 =重复当前项目
 - `songName`（ro）歌名
 - `duration`（ro）整个曲目有多长，-1如果不知道（流）
 - “进度”（rw）在赛道中的当前位置
 - “album”（ro）专辑名称
 - “艺术家”（ro）艺术家姓名
 - `station`（ro）站名
 - `genre`（ro）流派名称
 - `cover`（ro）歌曲/专辑封面图片网址
 - `source`（rw）当前选择的源标识符（参见上面的`sourceList`）
 - `prev`（wo）将任何值写入此状态会移至上一曲目
 - `next`（wo）将任何值写入此状态将移至下一曲目

### Central Audio
由中央音乐服务器提供。

 - `control`（wo）设置所有玩家的游戏状态（`true` = play，`false` = pause）

＃＃＃ 颜色选择器
此设备仅出现在LightController中。

 - 颜色选择器的`red`（rw）红色值
 - 颜色选择器的`green`（rw）绿色值
 - 颜色选择器的“蓝色”（rw）蓝色值

从ioBroker设置上述一个或多个状态只会在大约100 ms后向Miniserver发送命令。
这是为了防止单个用户输入的颜色多次改变。

### Colorpicker V2
此设备仅出现在Loxone软件版本9及更高版本的Light Controller V2中。

 - 颜色选择器的`red`（rw）红色值
 - 颜色选择器的`green`（rw）绿色值
 - 颜色选择器的“蓝色”（rw）蓝色值

从ioBroker设置上述一个或多个状态只会在大约100 ms后向Miniserver发送命令。
这是为了防止单个用户输入的颜色多次改变。

### Dimmer
由调光器提供。

 - “位置”（rw）调光器的当前位置
 - `min`（ro）当前最小值
 - `max`（ro）当前最大值
 - “step”（ro）当前步长值
 - `on`（wo）将任何值写入此状态会将调光器设置为最后的已知位置
 - `off`（wo）将任何值写入此状态会禁用调光器，将位置设置为0但会记住最后位置

＃＃＃ 门
由门控制提供。

 - `position`（ro）位置从1 =到0 =向下
 - “主动”（rw）门运动的当前方向
    * -1 =关闭
    * 0 =不动
    * 1 =开放
 - `preventOpen`（ro）是否防止开门
 - `preventClose`（ro）是否阻止关门

###中央门
由中央门控制提供。

 - `open`（wo）打开所有门
 - `close`（wo）关闭所有门
 - `stop`（wo）停止所有门电机

### InfoOnlyDigital
由虚拟状态以及Loxone Touch开关提供。

 - 控件的`active`（ro）布尔状态（true / false）
 - `active-text`（ro）如果配置，则文本等效于状态
 - `active-image`（ro）如果配置，图像等效于状态
 - `active-color`（ro）如果配置，颜色相当于状态

![InfoOnlyDigital设置](zh-cn/adapterref/iobroker.loxone/../../../en/adapterref/iobroker.loxone/doc/loxone-config-info-only-digital.png)

### InfoOnlyAnalog
由虚拟状态以及Loxone Touch开关提供。

 - `value`（ro）控件的状态值（数字）
 - `value-formatted`（ro）如果配置，则为状态的格式化值（使用Loxone Config中的“Unit”格式）

###对讲
门控制器提供。

 - “钟声”（ro）是否响铃
 - `lastBellEvents`（ro）数组，包含未响应的每个铃声活动的时间戳
 - `version`（ro）仅限Loxone Intercoms  - 包含当前安装固件的文本

版本

 - “回答”（wo）将任何值写入此状态将停用铃声

此类型的频道可能包含其他设备。有关更多信息，请参见相应章节。

### Jalousie
由不同种类的百叶窗（自动和手动）提供。

 - `up`（rw）Jalousie是否正在向上移动
 - “下来”（rw）Jalousie是否正在向下移动
 - 百叶窗的“位置”（ro）位置，从0到1的数字
    *百叶窗帘上方位置= 0
    *百叶窗帘下方位置= 1
 - 百叶窗帘（百叶窗）的`shadePosition`（ro）阴影位置，从0到1的数字
    *百叶窗没有阴影= 0
    *百叶窗阴影= 1
 - 只有具有自动驾驶仪的人使用的`safetyActive`（ro），这表示安全关闭
 - “autoAllowed”（ro）仅供具有自动驾驶仪的人使用
 - `autoActive`（rw）仅供Autopilot使用
 - 只有使用自动驾驶仪的“锁定”（ro），这代表Loxone配置中的输出QI
 - `infoText`（ro）通知例如在什么导致锁定状态，或什么导致安全性变得活跃。
 - `fullUp`（wo）将任何值写入此状态会触发完整动作
 - `fullDown`（wo）将任何值写入此状态会触发完全向下运动
 - `shade`（wo）将任何值写入此状态，将百叶窗帘调到最佳位置

###中央百叶窗帘
由中央百叶窗控制提供。

 - `autoActive`（rw）仅供Autopilot使用
 - `fullUp`（wo）将任何值写入此状态会触发完整动作
 - `fullDown`（wo）将任何值写入此状态会触发完全向下运动
 - `shade`（wo）将所有百叶窗的任何值写入完美位置

###灯光控制器
由（酒店）照明控制器提供。
场景只能在Loxone应用程序中修改，但可以在ioBroker中选择。

 - `activeScene`（rw）当前活动场景编号
    * 0：全部关闭
    * 1..8：用户定义的场景（场景的定义/学习必须使用Loxone工具完成）
    * 9：全部开启
 - 所有场景的`sceneList`（ro）列表
 - `plus`（wo）更改为下一个场景
 - `minus`（wo）更改为上一个场景

此类型的频道可能包含其他设备。有关更多信息，请参见相应章节。

### Light Controller V2
由Loxone软件版本9及更高版本中的（酒店）照明控制器提供。
情绪只能在Loxone应用程序中修改，但可以在ioBroker中进行选择和组合。

 - 所有已配置心情名称的`moodList`（ro）列表
 - `activeMoods`（rw）当前活动的心情名称列表
 - “favoriteMoods”（ro）最喜欢的心情名单
 - `additionalMoods`（ro）非喜欢的心情名单列表
 - `plus`（wo）改变了下一个心情
 - `minus`（wo）改变了以前的情绪

此类型的频道可能包含其他设备。有关更多信息，请参见相应章节。

###中央灯控制器
由中央照明控制器提供。

 - `control`（wo）打开或关闭所有灯

###米
由实用仪表提供。

 - `actual`（ro）实际值（数字）
 - `actual-formatted`（ro）如果配置，则为格式化的实际状态值（使用Loxone Config中的“Unit”格式）
 - `total`（ro）总值（数字）
 - `total-formatted`（ro）如果配置，则为格式化的状态总值（使用Loxone Config中的“Unit”格式）
 - `reset`（wo）将任何值写入此状态会重置总值

###按钮
由虚拟按钮输入提供。

 - `active`（rw）按钮的当前状态
 - `pulse`（wo）将任何值写入此状态将模拟按钮被推动的时间非常短

###滑块
由模拟虚拟输入提供。

 - “value”（rw）滑块的当前值
 - `value-formatted`（ro）如果配置，则为状态的格式化值（使用Loxone Config中的“Unit”格式）
 - `error`（ro）表示滑块的值无效

### SmokeAlarm
由实用仪表提供。

 - `nextLevel`（ro）下一个警报级别的ID
    * 1 =无声
    * 2 = Acustic
    * 3 =光学
    * 4 =内部
    * 5 =外部
    * 6 =远程
 - “nextLevelDelay”（ro）延迟下一级别的秒数
 - `nextLevelDelayTotal`（ro）下一级的总延迟，以秒为单位
 - “level”（ro）当前警报级别的ID
    * 1 =无声
    * 2 = Acustic
    * 3 =光学
    * 4 =内部
    * 5 =外部
    * 6 =远程
 - “传感器”（ro）传感器列表
 - 声学报警的“acousticAlarm”（ro）状态为非活动状态，为活动状态为真
 - `testAlarm`（ro）testalarm是否处于活动状态
 - `alarmCause`（ro）报警原因：
    * 1 =仅限烟雾探测器
    * 2 =仅限水
    * 3 =烟和水
    * 4 =仅温度
    * 5 =火和温度
    * 6 =温度和水
    * 7 =火，温度和水
 - 报警开始时的`startTime`（ro）时间戳
 - `timeServiceMode`（rw）延迟，直到禁用服务模式
 - `mute`（wo）将任何值写入此状态会使sirene静音
 - `quit`（wo）向此状态写入任何值都会确认烟雾警报

### Switch
由虚拟输入开关提供。

 - `active`（rw）开关的当前状态

### TimedSwitch
由楼梯间和多功能开关提供。

 - `deactivationDelayTotal`（ro）秒，如果使用定时器，输出将激活多长时间
 - `deactivationDelay`（ro）倒计时直到输出停用
    * 0 =输出关闭
    * -1 =输出永久打开
    *否则它将从deactivationDelayTotal开始倒计时
 - `active`（wo）启用或禁用开关（无停用延迟）
 - `pulse`（wo）脉冲开关：
    * deactivationDelay = 0
        *将从deactivationDelayTotal开始倒计时到0
    *如果这是楼梯间开关：
        * deactivationDelay = -1
            *无效，将永久保留。
        * deactivationDelay> 0
            *重新开始倒计时
    *如果这是一个多功能开关
        *关闭它（从倒计时或永久状态）

### Tracker
由楼梯间和多功能开关提供。

 - `entries`（ro）从miniserver返回的条目列表

### WindowMonitor
由实用仪表提供。

 - `numOpen`（ro）打开的门窗数量
 - `numClosed`（ro）关闭的门窗数量
 - `numTilted`（ro）倾斜的门窗数量
 - `numOffline`（ro）无法使用的门窗数量
 - `numLocked`（ro）锁定的门窗数量
 - `numUnlocked`（ro）解锁门窗数量

所有这些状态的值之和等于监控的门窗数量。具有两种状态的窗户/门将始终计为“最差”状态。

对于每个受监控的窗口/门，将有一个设备，其索引作为其ID和给定名称。它们具有以下状态：

 - “关闭”（ro）窗户/门关闭
 - “倾斜”（ro）窗户/门是倾斜的
 - `open`（ro）窗户/门打开了
 - “锁定”（ro）窗户/门被锁定
 - “解锁”（ro）窗户/门被解锁

## Weather Server
提供天气服务器信息作为具有多个频道的设备。
该设备称为`WeatherServer`。
它包含：

 - 具有当前天气值的频道“实际”
 - 每个预测小时的一个频道称为“HourXX”，其中“XX”是从现在开始的小时数

每个频道都包含以下状态：

 - `barometricPressure`：数字气压值
 - `barometricPressure-formatted`：格式化的气压值与单位
 - `dewPoint`：数值露点值
 - `dewPoint-formatted`：格式化的露点值与单位
 - `perceivedTemperature`：数字感知温度值
 - `perceivedTemperature-formatted`：格式化的感知温度值与单位
 - `precipitation`：数值降水值
 - `precipitation-formatted`：格式化的降水值与单位
 - `relativeHumidity`：数字相对湿度值
 - `relativeHumidity-formatted`：格式化的相对湿度值与单位
 - `solarRadiation`：太阳辐射值
 - `temperature`：数值温度值
 - `temperature-formatted`：带单位的格式化温度值
 - `timestamp`：数据的时间戳为`value.time`（JavaScript时间）
 - `weatherType`：数字天气类型枚举值
 - `weatherType-text`：天气类型的文本表示
 - `windDirection`：风向值
 - `windSpeed`：风速值
 - `windSpeed-formatted`：格式化的风速值与单位

##兼容性
已使用Loxone Config 9.0.9.26对Loxone Miniserver Go 9.0.9.26测试了兼容性。

##错误报告和功能请求
请使用GitHub存储库报告任何错误或请求新功能。

如果您需要缺少控件类型，请提供ioBroker错误日志中报告的名称以及ioBroker对象树中设备的完整原始内容：

“LightController”的日志文件示例：

![缺少LightController控件的日志](zh-cn/adapterref/iobroker.loxone/../../../en/adapterref/iobroker.loxone/doc/log-missing-control-type.png)

来自ioBroker的原生价值＆gt;对象

![缺少LightController控件的详细信息](zh-cn/adapterref/iobroker.loxone/../../../en/adapterref/iobroker.loxone/doc/details-missing-control-type.png)

##法律
该项目与Loxone Electronics GmbH公司没有直接或间接关联。

Loxone和Miniserver是Loxone Electronics GmbH的注册商标。

## Changelog
### 1.0.0
* (UncleSamSwiss) Fixed issue that was resetting the custom settings and cloud smartName
* (alladdin) Fixed connection issues with Loxone Miniserver 10
* (UncleSamSwiss) Changed all write-only "switch"es to "button"s
* (UncleSamSwiss) Added support for AlarmClock control
* (Apollon77) Updated CI Testing

### 0.4.0
* (UncleSamSwiss) Improved support for Loxone Config 9
* (UncleSamSwiss) Changed all color choosers (i.e. color lights) to use RGB (previously HSV/HSL was completely wrong)

### 0.3.0
* (UncleSamSwiss) Control names only synchronized on the first time by default (configurable); users can change control names the way they want

### 0.2.1
* (UncleSamSwiss) Added support for Slider control

### 0.2.0
* (UncleSamSwiss) Added proper support for Alexa for the following controls: Alarm, AudioZone, Gate, Jalousie and LightController

### 0.1.1
* (UncleSamSwiss) Added support for synchronizing rooms and functions (categories) from Loxone Miniserver

### 0.1.0
* (UncleSamSwiss) Added support for many more controls including commands from ioBroker to Loxone Miniserver

### 0.0.3
* (Bluefox) Formatting, refactoring and Russian translations

### 0.0.2
* (UncleSamSwiss) Added creation of an empty device for all unsupported controls (helps figure out its configuration)

### 0.0.1
* (UncleSamSwiss) Initial version