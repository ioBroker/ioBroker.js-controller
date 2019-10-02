---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: iJ8gpRubqG4y8QhVSRJ3b19JyxSByvMs26cNSI74Syo=
---
![商标](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![Travis建立状态](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)
![AppVeyor构建状态](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.lupusec?branch=master&svg=true)
![稳定版](http://iobroker.live/badges/lupusec-stable.svg)
![安装数量](http://iobroker.live/badges/lupusec-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

＃ioBroker.lupusec
**需要node.js 8.0或更高版本以及Admin v3！**

该适配器将Lupusec报警系统XT1 Plus，XT2，XT2 Plus和XT3与ioBroker相连。
不支持XT1（不带Plus）。您可以读取Lupusec传感器的状态，例如门，窗户，水，烟雾传感器以及警报系统的状态。
例如，您可以打开开关，控制快门和布防/撤防警报系统。

您可以在此处找到详细信息：[狼疮](https://www.lupus-electronics.de/en)

##安装
1.安装适配器

最简单的方法是通过ioBroker中的发现适配器来配置lupusec.iobroker适配器。发现适配器搜索Lupusec警报系统的正确IP地址。另一种方法是手动配置

2.手动配置适配器

从Lupusec警报系统中选择IP地址或主机名。尽可能选择https（推荐）。
仅读取状态，请选择没有写访问权限的用户。如果要更改状态（例如，打开/关闭灯或布防/撤防警报），请选择具有写权限的用户。
![admin_main](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin.png)如果您将监视摄像机连接到Lupusec警报系统，则可以在ioBroker中提供它们。 Lupusec适配器自己找到所有Lupusec凸轮。您必须输入一个地址（您的ioBroker IP地址或0.0.0.0）和一个端口，以便以后连接到凸轮。
![admin_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_webcam.png)如果您将Nuki开门器连接到Lupusec报警系统，则也可以从ioBroker使用它。在ioBroker实例管理菜单上，您可以输入安装在Nuki门上的Lupusec门传感器。如果现在打开安装Nuki的门，则将具有附加状态“开门”，而只有“解锁”状态。如果Nuki门上没有Lupusec门传感器，则只会看到“锁定”或“锁定”状态。
![admin_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_nuki.png)

默认情况下，所有Lupusec设备都将显示在ioBroker对象选项卡上。
下列设备完全受支持并经过单独调整：

  -门触点/窗触点（类型4）
  -水传感器（5型）
  -紧急按钮（类型7）
  -运动检测器/ 360度运动检测器（9类）
  -CO传感器（13型）
  -烟雾探测器/热量探测器（类型14）
  -内部警笛（21型）
  -状态指示灯/迷你室内警报器（22型）
  -电源开关（类型24）
  -带ZigBee中继器的1通道中继器（类型24）
  -带ZigBee中继器的2通道中继器（类型24）
  -键盘（37型）
  -玻璃传感器（39型）
  -警笛外（48型）
  -电源开关表（类型48）
  -电表（50型）
  -房间传感器V1（54型）
  -LCD温度传感器（54型）
  -最低温度（54型）
  -Nuki开门器（57型）
  -热量探测器（58型）
  -调光器（66型）
  -电灯开关V2（66型）
  -色相（74型）
  -卷帘继电器V1（76型）
  -散热器恒温器（79型）
  -散热器温度调节器V2（79型）
  -光线感应器（78型）
  -场景切换器V2（类型81）
  -震动感应器（93型）
  -烟雾探测器V2（类型14）
  -带调光器V3的入墙继电器（66型）

支持Apple Homekit适配器yahka的两个状态apple_home_a1和lupusec.0.status.apple_home_a2。除了lupusec状态之外，您还可以打开和关闭区域1和2的警报系统。

如果您拥有的设备不在上面的列表中，请通过Thorsten Stueben <thorsten@stueben.de>与我联系。

##对象
###狼疮状态
ioBroker为您提供与Lupusec应用程序中相同的状态对象。
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_status.png)

### Lupusec设备
您可以在“设备”下找到所有受支持的Lupsec传感器和设备。如果缺少设备，请与我联系。
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices.png)传感器或设备的详细视图。在此示例中，您将看到CO传感器。在发生CO警报时，状态“ alarm_status_ex”更改为true，而“ alarm_status”更改为“ CO”。
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices_type09.png)

### Lupusec网络摄像头
您可以在“网络摄像头”下找到所有已连接的监视摄像头。您可以将“图像”和“流”状态中提供的链接复制到Web浏览器以打开。
![lupusec_obj_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_webcam.png)

### Lupusec Nuki
您可以在Lupusec设备等“设备”下找到Nuki开门器。 Nuki提供2个州。状态nuki_state向您显示Nuki开门器的实际状态，例如门已锁定或未锁定。使用状态nuki_action，您可以打开，锁定或解锁门。
![lupusec_obj_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_nuki.png)

##已计划
计划在将来进行以下工作：

*支持更多的传感器/设备
*为每个传感器/设备编写文档

## Changelog

### 1.2.0 (13.09.2019)
* (Stübi) Changing error handling of adapter
* (Stübi) Add Nuki door opener

### 1.1.9 (06.09.2019)
* (Stübi) Add device: Smoke detector V2
* (Stübi) Add device: Inwall relay with dimmer V3

### 1.1.8 (10.06.2019)
* (Stübi) Add device: 360 PIR motion sensor
* (Stübi) Add device: electric meter
* (Stübi) Add device: LCD temperature sensor
* (Stübi) Add device: mini temperature sensor

### 1.1.7 (06.05.2019)
* (Stübi) Enhancement: optimizing webcam support

### 1.1.6 (01.05.2019)
* (Stübi) New feature: you can change the buttons for keypad
* (Stübi) New feature: add push notifications to sensors
* (Stübi) New feature: change switch from switch to push button 
* (Stübi) New feature: now you can change status for tamper, bypass and reporting for sensors
* (Stübi) New feature: Webcam support. You can get the link of Lupusec provided webcams.
* (Stübi) New feature: you can edit the on/off timer for shutters 
* (Stübi) New feature: Discription of states are now in English or German available
* (Stübi) Bugfixing: HUE and saturation of HUE devices fixed 
* (Stübi) Bugfixing: Add role to button 4 of scenario switch.  

### 1.1.5 (24.04.2019)
* (Stübi) New feature: Add buttons for Scenario Switch V2
* (Stübi) Bugfixing: Various improvements

### 1.1.4 (13.04.2019)
* (Stübi) Add device outside alarm
* (Stübi) Add device inside alarm
* (Stübi) Add device PIR motions sensor V2
* (Stübi) Add device glass sensor

### 1.1.3 (10.04.2019)
* (Stübi) New Logo
* (Stübi) Add device Panic Button
* (Stübi) Add status indicator 
* (Stübi) Add sensor Heat detector
* (Stübi) Add shock sensor 
* (Stübi) Add Light Switch V2
 
### 1.1.2 (06.04.2019)
* (Stübi) Add light sensor 
* (Stübi) Add CO sensor
* (Stübi) Add water sensor V2
* (Stübi) Add Radiator thermostat V2
* (Stübi) Add 1 channel relay with ZigBee repeater (Type 24)
* (Stübi) Add 2 channel relay with ZigBee repeater (Type 24)
* (Stübi) If you change the sensor name in the Lupusec App, it will be change in ioBroker too 
* (Stübi) Bugfixing Radiator thermostat V1/V2
* (Stübi) Bugfixing Dimmer
* (Stübi) Bugfixing PD Status (Timer) for relay, power switch
* (Stübi) Bugfixing status switch for rollter/shutter device

### 1.1.1 (27.03.2019)
* (Stübi) Lupusec alarm online status added

### 1.1.0 (23.03.2019)
* (Stübi) Totally redesign of the Lupusec adapter. Node 8 or higher is now required

### 1.0.0 (22.12.2018)
* (Stübi) Support js-controller compact mode
* (Stübi) Changed core adapter
* (Stübi) Add Light sensor (type 78)
* (Stübi) Add Apple home alarm status
* (Stübi) Add dimmer / relais (type 66)
* (Stübi) Bugfixing and new status alarm_ex
* (Stübi) Bugfixing and changing of the polling mechanism
* (Stübi) password will be encrypted. Translation of configuration
* (Stübi) add debug messages
* (Stübi) Hue, room sensor, power switch added
* (Stübi) Fixing error update function
* (Stübi) Improvements and new add/del/update Object function
* (Stübi) Changes of roles and icons added to devices
* (Stübi) Wrong device description removed
* (Stübi) RSSI Status an Device shutter (type 76) supported
* (Stübi) Devices thermostat (type 79) and switch (type 48) supported
* (Stübi) Directory widged deleted
* (Stübi) Port can be added

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.