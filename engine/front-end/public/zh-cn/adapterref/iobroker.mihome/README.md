---
local: true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome/README.md
title: Xiaomi MiHome Gateway
hash: GmavLxm+klUaUCFI7o/yKJ8KJqOtoyN2RmgfJUQcojY=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: 小米绿米网关接入适配器
keywords: mihome, xiaomi
readme: https://github.com/ioBroker/ioBroker.mihome/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2017-06-05T17:40:26.665Z
version: 1.2.5
---
![徽标](zh-cn/adapterref/iobroker.mihome/../../../de/adapterref/iobroker.mihome/media/mihome.png)

#ioBroker Mi Home Adapter借助Mi Home适配器，Mi Control Hub（网关）集成到ioBroker系统中，可通过ioBroker实现各种小米传感器，交换机等之间的通信。
关于ioBroker可以例如网关的照明和扬声器受到控制。

##要求
* Android或iOS设备上的Mi Home应用程序和免费的本地网络功能
*连接Mi家庭网关
*运营ioBroker系统

###安装Mi Home应用程序并解锁本地网络功能
#### Android
*§§LLLL_0§§在Android设备上下载，安装，打开和

同意条款和条件。

*选择国家*中国大陆*
*通过*登录*创建一个帐户
*通过`+`成功注册后添加设备
*在* Household Security *下，选择`MI Control Hub`并按照说明操作

遵循

*网关成功集成后，右上角的3个点

然后按*关于*

*点击文本*插件版本* 10次以下
*现在开启了开发者模式，需要一段时间

出现2个以上菜单项>如果没有，请再试一次

*选择菜单项`Wireless communication protocol`
*打开顶部的滑动开关，记下密码并使用`OK`进行确认。

>稍后将在ioBroker安装期间需要密码。

现在可以通过`+`字符教授其他设备。

#### IOS
*§§LLLL_0§§在iOS设备上下载，安装，打开和

同意隐私政策

*通过个人资料/设置/区域设置选择国家*大陆*。
*通过*登录*创建一个帐户
*通过`+`成功注册后添加设备
*在* Household Security *下，选择`MI Control Hub`并按照说明操作

遵循

*网关成功集成后，右上角的3个点

按，按*关于*

*反复点击空的下部区域
*现在开启了开发者模式，需要一段时间

出现更多菜单项>如果它的工作方式不同，请重复上述步骤

*选择第4个菜单项
*打开顶部的滑动开关，记下密码并使用`OK`进行确认。

>稍后将在ioBroker安装期间需要密码。

现在可以通过`+`字符教授其他设备。

###在路由器上设置
在About / Hub info下，可以在_localip_之后的文本中确定网关使用的网关的IP地址。在使用的路由器中，应将此IP分配给网关。
如果不再需要通过应用程序对学习设备的操作，则在学习路由器中的所有设备并且可以关闭网关的因特网访问之后。

###支持的设备
以下列表并非详尽无遗：

 - 网关 - 小米RGB网关
 -  sensor_ht  - 小米温度/湿度
 -  weather.v1  - 小米温度/湿度/压力
 - 开关 - 小米无线开关
 -  sensor_switch.aq2  - 小米阿加拉无线开关传感器
 -  sensor_switch.aq3  - 小米阿加拉无线开关传感器
 - 插头 - 小米智能插头
 -  86插头 - 小米智能墙插头
 -  86sw2  - 小米无线双壁开关
 -  86sw1  - 小米无线单壁开关
 -  natgas  - 小米Mijia Honeywell气体警报探测器
 - 烟雾 - 小米米佳霍尼韦尔火灾报警探测器
 -  ctrl_ln1  - 小米Aqara 86防火墙开关一键
 -  ctrl_ln1.aq1  - 小米阿加拉墙壁开关LN
 -  ctrl_ln2  - 小米86零火墙开关双键
 -  ctrl_ln2.aq1  - 小米阿加拉墙壁开关LN双键
 -  ctrl_neutral2  - 小米有线双壁开关
 -  ctrl_neutral1  - 小米有线单壁开关
 - 立方体 - 小米立方体
 -  sensor_cube.aqgl01  - 小米立方体
 - 磁铁 - 小米门传感器
 -  sensor_magnet.aq2  - 小米阿加拉门传感器
 - 窗帘 - 小米阿加拉智能窗帘
 - 运动 - 小米运动传感器
 -  sensor_motion.aq2  - 小米阿加拉运动传感器
 -  sensor_wleak.aq1  - 小米阿加拉水传感器
 -  ctrl_ln2.aq1  - 小米阿加拉墙壁开关LN（双）
 -  remote.b286acn01  - 小米Aqara无线遥控开关（双摇杆）
 -  remote.b1acn01  - 小米Aqara无线遥控开关
 - 振动 - 小米振动传感器
 -  wleak1  - 小米阿加拉水传感器
 -  lock_aq1  - 小米锁

## IoBroker Mi Home适配器安装
只能通过ioBroker Admin界面进行进一步设置。
在* Adapter *区域中找到适配器，并通过`+`安装符号。

![徽标](zh-cn/adapterref/iobroker.mihome/../../../de/adapterref/iobroker.mihome/media/Adapter.png)

然后打开以下配置窗口：

![徽标](zh-cn/adapterref/iobroker.mihome/../../../de/adapterref/iobroker.mihome/media/Adapterconfig1.PNG)

输入上面根据`Default Gateway Key`确定的密码，并使用*和* close *窗口保存。然后，当前适配器应在* Instances *下显示为绿色：

![徽标](zh-cn/adapterref/iobroker.mihome/../../../de/adapterref/iobroker.mihome/media/Instanz.PNG)

在* Objects *下，现在显示网关及其学习设备：

![徽标](zh-cn/adapterref/iobroker.mihome/../../../de/adapterref/iobroker.mihome/media/Objekte.PNG)

该手册是根据我的知识和信念创建的。

## Changelog
### 1.2.5 (2019-01-24)
- (Vanwards) Added long click for Aquara wall switch

### 1.2.4 (2019-01-15)
- (SchumyHao) Add Chinese support

### 1.2.3 (2018-10-23)
- (goohnie) New wall switch was added

### 1.2.0 (2018-10-12)
- (bluefox) refactoring

### 1.1.2 (2018-10-08)
- (bluefox) New button switch was added

### 1.1.1 (2018-09-23)
- (bluefox) Fixed the creation of new devices

### 1.1.0 (2018-09-13)
- (bluefox) New devices added:  sensor_switch.aq3, ctrl_ln1.aq1, ctrl_ln2.aq1, sensor_cube.aqgl01, remote.b286acn01, vibration, wleak1, lock_aq1
- (bluefox) Names will be taken from gateway

### 1.0.7 (2018-06-25)
- (bluefox) The heartbeat timeout and the re-connection interval settings were added

### 1.0.6 (2018-05-26)
- (bluefox) Added new Aqara cube sensor

### 1.0.5 (2018-03-05)
- (bluefox) Xiaomi Aqara Wall Switch LN Double was added

### 1.0.4 (2018-01-21)
- (bluefox) The alarm state was fixed.

### 1.0.3 (2018-01-21)
- (bluefox) Invalid temperature values will be ignored

### 1.0.2 (2018-01-14)
- (bluefox) Ignore unknown state of sensors

### 1.0.0 (2018-01-05)
- (bluefox) Do not overwrite the names
- (bluefox) Ready for Admin3

### 0.3.3 (2017-11-26)
- (bluefox) Allow multiple mihome gateways

### 0.2.4 (2017-11-04)
- (bluefox) Add aqara water sensor

### 0.2.3 (2017-09-22)
- (bluefox) Remove "." from id of the device

### 0.2.2 (2017-08-01)
- (bluefox) Set after 300ms doublePress to false by Temperature Sensor\nAllow control of Plug

### 0.2.1 (2017-07-29)
- (bluefox) Implement double click on temperature sensor

### 0.2.0 (2017-07-18)
- (bluefox) fix battery level

### 0.1.4 (2017-06-09)
- (bluefox) add cube
- (bluefox) remove voltage by gateway

### 0.1.1 (2017-06-06)
- (bluefox) Initial commit

## License

MIT

Copyright (c) 2017-2019 bluefox <dogafox@gmail.com>