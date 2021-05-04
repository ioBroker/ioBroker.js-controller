---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.device-reminder/README.md
title: ioBroker.device-reminder
hash: aQ+VLGTgS05w1RhWr/yrU9jx71JJC4iJUNlbdw/R0l0=
---
![商标](../../../en/adapterref/iobroker.device-reminder/admin/icon.png)

![安装数量（稳定）](http://iobroker.live/badges/device-reminder-stable.svg)
![安装数量（最新）](http://iobroker.live/badges/device-reminder-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.device-reminder.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.device-reminder.svg)
![依赖状态](https://img.shields.io/david/xenon-s/iobroker.device-reminder.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.device-reminder.png?downloads=true)

＃ioBroker.device-reminder
![测试与发布](https://github.com/xenon-s/iobroker.device-reminder/workflows/Test%20and%20Release/badge.svg)

##需要德国自述文件？<br> [德语自述文件](https://github.com/Xenon-s/ioBroker.device-reminder/blob/master/README_GER.md)
<br>

＃用于监视设备状态版本> 1.1的适配器
该适配器可以通过测量插座检测设备是否已打开，正在运行或已关闭并对其做出反应。然后可以通过电报，whatsapp，alexa，sayit，pushover和电子邮件（可以在每个设备上进行多次选择）自动发出消息。该过程完成后（也有时间延迟），也可以自动关闭电源插座。在给定的运行时间下，可以为每个数据点输出警报（使用外部脚本，该数据点仅发送true / false或在vis中显示）。为此，只需将以分钟为单位的预选时间输入到数据点“ device-reminder.X.XXX.config.runtime max”中即可。

＃应该考虑什么？
对于大多数设备，“实时消耗值（称为**“ _ energy” **）“的刷新间隔不应超过10秒，否则可能导致消息延迟。适配器本身每10秒轮询一次值，并使用基于事件的新值。这样可以节省系统<br>Tasmota控制台中的命令：TelePeriod 10

＃每个设备可以做什么？
-设备启动时的通知
-在相应设备的处理结束时进行通知
-电报通知（可以有多个ID）
-Alexa通知（可以使用多个ID）
-WhatsApp通知（可以使用多个ID）
-推送通知（可以使用多个ID）
-电子邮件通知（可以使用多个ID）
-通知可以自由创建，也可以由外部脚本指定
-具有当前状态，实时消耗和最后发送的状态消息的数据点，以在其他脚本中使用此适配器的值
-如果检测到过程完成，则可以按需关闭设备（也有时间延迟）
-每个数据点可以暂时禁用语音助手
-以分钟为单位的运行时监视：如果超过了时间，则会向所有选定的Messenger发送警报

＃ 操作说明
##事前基本
对于每组设备，alexa等，都有一个按钮“检查输入”。如果单击此按钮，将检查现有条目的合理性，并且您会立即得到所有条目是否正确的响应。如果进行了更改，则必须始终单击此按钮！

##创建设备
![addDevice.png](../../../en/adapterref/iobroker.device-reminder/admin/addDevice.png)

-**设备名称**：可自由选择的名称
-**设备类型**：在这里您必须选择它是哪个设备，以便可以正确执行适配器中的计算。
-**消耗**：单击带有三个白点的按钮以打开对象管理。必须选择显示“当前实时消费量”的数据点。
-**打开/关闭**：单击带有三个白点的按钮可打开对象管理。必须选择打开/关闭插座的数据点（非强制性）。
-**开始文本**：设备启动时将发送通知（也可以使用特殊字符）
-**结束文字**：当设备完成其操作时将发送通知（也可以使用特殊字符）

使用**起始文本**和**结束文本**，您还可以从外部数据点获取消息。单元状态更改后，从数据点读取此消息的时间为1秒。这样，您可以通过外部脚本创建一条消息。适配器自动识别消息是来自数据点还是仅是手动输入。要选择一个数据点，只需单击带有三个白点的按钮，然后选择相应的数据点。 **请注意**：只能使用一个数据点**或**一个手动输入的消息！<br><br>

##创建Alexa
![addAlexa.png](../../../en/adapterref/iobroker.device-reminder/admin/addAlexa.png)

-** alexa名称**：可以自由选择的名称，也可以使用特殊字符。
-** alexa“公告” /“发言” **：必须在此处选择允许Alexa发言的数据点。要选择数据点，只需单击带有三个小白点的按钮。
-**音量0-100 **：您的Alexa说话的音量（0-100％）。

最后4个字段可用于创建允许Alexa讲话的时间段。默认情况下，从00:00-23:59的时间段处于活动状态。

-**从小时开始有效**：以小时为单位的开始时间
-**从分钟开始有效**：以分钟为单位的开始时间
-**从小时开始无效**：以小时为单位的结束时间
-**从几分钟开始无效**：以分钟为单位的结束时间

##创建SayIt设备
![addSayit.png](../../../en/adapterref/iobroker.device-reminder/admin/addSayit.png)

-**说名称**：可以自由选择的名称，也可以使用特殊字符。
-** sayit路径“ sayit /../ text” **：在相应的sayIt设备文件夹中选择数据点“ text”。文本输出发送到这里。
-**音量0-100 **：您的sayIt设备应与之通话的音量（0-100％）。
-**从小时开始有效**：以小时为单位的开始时间
-**从分钟开始有效**：以分钟为单位的开始时间
-**从小时开始无效**：以小时为单位的结束时间
-**从几分钟开始无效**：以分钟为单位的结束时间

##创建下推用户
![addPushover.png](../../../en/adapterref/iobroker.device-reminder/admin/addPushover.png)

-**名称**：可以自由选择的名称，也可以使用特殊字符。
-**推送实例“ **”：要发送到的实例
-**优先级**：发送消息的优先级
-**声音**：Pushover收到消息时播放的声音。

##创建电子邮件用户
![addEmail.png](../../../en/adapterref/iobroker.device-reminder/admin/addEmail.png)

-**名称**：可以自由选择的名称，也可以使用特殊字符。
-**发件人地址**：发送电子邮件的电子邮件地址
-**收件人地址**：用于接收邮件的电子邮件地址

＃默认设备
![default-devices.png](../../../en/adapterref/iobroker.device-reminder/admin/default-devices.png)这些值是在几个月内并在众多测试人员的帮助下确定的。更改值可能导致设备无法正确记录，从而导致错误报告。

＃自定义设备
![custom-devices.png](../../../en/adapterref/iobroker.device-reminder/admin/custom-devices.png)这些值可以由用户自定义然后使用。以下是说明：

-**阈值“启动”（瓦特）**：必须超过瓦特的启动值，设备才能被识别为已启动。
-**阈值“ End”（瓦特）**：最终值（以瓦特为单位），必须低于此值才能将设备识别为已终止。
-**阈值“待机”（Watt）**：阈值，指示设备为“ OFF”或“ IN STANDBY”。如果当前计算的值低于** Standy **阈值，则将设备识别为已关闭。
-**起始值数量**：这指定必须连续**超过“起始值”的频率。一次低于此值将导致启动中止。这些值的平均值必须高于起始值，设备才能被识别为已启动。<br>

*示例：该值应为10W，并且连续超过3次。 1. 15W，2。1W，15W =>启动阶段被中止，因为第二个值低于10. *。

-**最终值数量**：这指定在计算设备是否准备就绪之前要记录多少个值。此处的值越少，结果的准确性越差，并且错误警报的风险也会增加。值越高，记录越准确。但是，缺点是完成的消息发送延迟很长。仅当达到“最终值数量”并且平均消耗低于“阈值'End'（Watt）”时，才检测到结束。

*简短的示例计算：*消耗值每10秒出现一次。 **阈值“结束”（Watt）**设置为50，**结束值的数量**设置为100。在设备被识别为启动后，100个值（*取100个值x 10秒= 1000秒*）被记录，然后才形成平均值。如果低于50，则在大约之后。 16.5分钟（我们记得**最终值的数量** = 100个值）**确认完成**并显示一条消息（如果已配置）。如果该值大于50，则不会发生任何事情，因为该设备仍在运行。现在，每个附加值将替换最旧的值，并在每个新值之后计算一个新的平均值。<br>

＃配置设备
![configureDevices.png](../../../en/adapterref/iobroker.device-reminder/admin/configureDevices.png)

-**激活**：默认情况下处于激活状态。您可以在此处临时停用设备，使其不再发送通知。
-**设备**：自动创建
-** Alexa **：此处列出了所有以前创建的Alexas，可通过单击添加
-** sayit **：此处列出了所有先前创建的sayit设备，可以通过单击它们将其添加。
-** whatsapp **：此处列出了所有自动检测到的whatsapp用户
-**推送**：此处列出了所有以前创建的推送用户，可以通过单击它们来添加。
-**电子邮件**：所有以前创建的电子邮件用户都将在此处列出，可以通过单击添加
-电报**：此处列出了所有可用的电报用户，可以通过单击将其分配给设备。相应的实例在方括号中指出。

**如果未显示名称：**检查“ telegram.X.communicate.users”下的条目（X代表相应的实例，例如0）是否包含以下结构：“ {” ID IN NUMBERS”：{ “ firstName”：“ User1”}}“，如果没有，可以简单地进行修改。适配器搜索** firstName **和** userName **。然后，您可以决定要发送给哪个名称。只能选择“名字”或“用户名”！

-**关闭**：如果选中，则该过程完成后，套接字将自动关闭。
-**几分钟后关闭**：可以选择在此处输入**分钟**的超时时间。超时到期后，*如果激活了自动关闭功能*，则会关闭套接字。但是，设备的结束通知仍不受超时的影响！
-中止检测**：如果激活，适配器将尝试检测在通知之前是否已手动关闭设备，然后不再进行通知。

单击“ **保存并关闭**”后，将在* Objects-> device-reminder *下为每个新创建的设备创建一个文件夹。

-请勿打扰（如果启用，**语音提示**将不会发送任何消息）
-最大运行时间
-设备的当前状态
-运行时警报
-averageConsumption（可用作确定自己的阈值的辅助手段）
-最后一个以JSON格式运行
-hh：mm：ss中的最后一个运行时
-当前的生活消费
-给信使的信息
-当前运行时，以hh：mm：ss为单位
-当前运行时间（以毫秒为单位）

被陈列。<br>

＃ 支持
**如果您喜欢我的工作：**<br>

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3EYML5A4EMJCW&source=url)]<br><br>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 1.2.1 (2021-05-01)
* (xenon-s) Adapter structure redesigned to classes
* (xenon-s) Admin UI design and inputs made more user friendly
* (xenon-s) Telegram bug fixed
* (xenon-s) Fix for js-controller 3.3.*
* (xenon-s) new datapoints added (runtime max, last runs as JSON, last runtime, runtime max, runtime alert)
* (xenon-s) add: runtime-alert

### 1.0.6 (2021-01-19)
* (xenon-s) bugfix: removed incorrect status

### 1.0.5 (2021-01-16)
* (xenon-s) bugfix: no messages were sent

### 1.0.4 (2021-01-12)
* (xenon-s) bugfix pushover
* (xenon-s) bugfix message: there may now be a "." at the end of the messages

### 1.0.3 (2021-01-07)
* (xenon-s) bugfix pushover
* (xenon-s) added link "german readme" in readme

### 1.0.2 (2021-01-06)
* (xenon-s) fix name in io-package.json

### 1.0.1 (2021-01-05)
* (xenon-s) bugfix

### 1.0.0 (2021-01-05)
* (xenon-s) initial commit version 1.0

### 0.7.4 (2020-12-20)
* (xenon-s) bugfix: telegram instance was not recognised correctly
* (xenon-s) bugfix: abort detection prevented sending of notifications

### 0.7.1 (2020-12-17)
* (xenon-s) fix telegram bug
* (xenon-s) Deleted incorrect version numbers in the io package

### 0.7.0 (2020-12-10)
* (xenon-s) Data is now queried cyclically

### 0.6.2 (2020-12-04)
* (xenon-s) bugfix index_m

### 0.6.0 (2020-12-03)
* (xenon-s) bugfix: alexa speak-volume when input is empty
* (xenon-s) bugfix: telegram now shows both names, otherwise there were errors in the notifications 
* (xenon-s) add: Device status can now be configured yourself

### 0.5.4 (2020-11-28)
* (xenon-s) calculation optimised, custom / default values may have to be adjusted if they have been changed by the user

### 0.5.0 (2020-11-22)
* (xenon-s) bugfix: volume sayit
* (xenon-s) add: volume alexa
* (xenon-s) DP runtime in milliseconds

### 0.4.10 (2020-11-17)
* (xenon-s) bugfix main.js

### 0.4.0 (2020-11-11)
* (xenon-s) config page revised to simplify the input of devices
* (xenon-s) inserted a break, so that it is recognized, if a device is switched off prematurely at the device switch
* (xenon-s) bugfix: telegram users are not always recognized correctly and displayed incorrectly
* (xenon-s) adjustable values inserted at "Type
* (xenon-s) readme extended and adapted

### 0.3.0 (2020-11-07)
* (xenon-s) standby detection, even if the power outlet should not be switched off
* (xenon-s) It is now possible to get messages from an external data point and send them as start / end message
* (xenon-s) device "microwave" added

### 0.2.1 (2020-11-05)
* (xenon-s) readme adapted

### 0.2.0 (2020-11-05)
* (xenon-s) update to version 0.2: index_m completely revised and whatsapp added

### 0.1.0 (2020-10-23)
* (xenon-s) beta release

### 0.0.1 (2020-10-20)
* (xenon-s) initial commit

## License

MIT License

Copyright (c) 2020 xenon-s

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.