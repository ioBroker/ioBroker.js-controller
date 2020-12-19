---
local: true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome/README.md
title: ioBroker Mi家庭适配器
hash: GmavLxm+klUaUCFI7o/yKJ8KJqOtoyN2RmgfJUQcojY=
---
![商标](../../../de/adapterref/iobroker.mihome/media/mihome.png)

＃ioBroker Mi家庭适配器通过Mi家庭适配器，将Mi Control集线器（网关）集成到ioBroker系统中，并可以在不同的Xiaomi传感器，开关等之间进行通信。
ioBroker可以例如网关的照明和扬声器可以控制。

＃＃ 要求
* Android或iOS设备上的Mi Home应用程序并激活了本地网络功能
*连接的Mi家庭网关
*可操作的ioBroker系统

###安装Mi Home应用程序并激活本地网络功能
#### Android
* [Android应用]（https://play.google.com/store/apps/details?id=com.xiaomi.smarthome）在Android设备上下载，安装，打开并

同意条款与条件。

*选择*中国大陆*作为国家
*通过*登录创建帐户
*成功注册后，通过“ +”添加设备
*在*家庭安全下*选择“ MI控制中心”并按照说明进行操作

后果

*成功集成网关后，屏幕右上方的三个点

然后按*关于*

*输入文字*插件版本* 10次以下
*现在，开发人员模式已开启，应该在一定时间后

出现2个其他菜单项>如果没有，请重试

*选择菜单项“无线通讯协议”
*打开顶部的滑动开关，记下密码，然后按“确定”确认。

>稍后在ioBroker安装期间将需要密码。

现在，可以使用`+`符号来教授其他设备。

#### IOS
* [iOS应用]（https://itunes.apple.com/de/app/mi-home-xiaomi-smarthome/id957323480?mt=8）在iOS设备上下载，安装，打开，然后

我同意隐私政策

*选择国家（地区）*大陆*通过配置文件/设置/国家设置。
*通过*登录创建帐户
*成功注册后，通过“ +”添加设备
*在*家庭安全下*选择“ MI控制中心”并按照说明进行操作

后果

*成功集成网关后，屏幕右上方的三个点

按，然后按*关于*

*在下面的空白区域中反复点击
*现在，开发人员模式已开启，应该在一定时间后

出现更多菜单项>如果无法立即使用，请重复以下步骤

*选择第四个菜单项
*打开顶部的滑动开关，记下密码，然后按“确定”确认。

>稍后在ioBroker安装期间将需要密码。

现在，可以使用`+`符号来教授其他设备。

###在路由器上设置
在“关于/集线器信息”下，可以在_localip_之后的文本中确定网关使用的网关的IP地址。在使用的路由器中，该IP应该永久分配给网关。
如果您不再希望通过该应用程序操作示教设备，则在路由器中示教所有设备后，也可以关闭网关的Internet访问。

###支持的设备
以下列表并不声称是完整的：

-网关-小米RGB网关
-sensor_ht-小米温度/湿度
-weather.v1-小米温度/湿度/压力
-开关-小米无线开关
-sensor_switch.aq2-小米Aqara无线开关传感器
-sensor_switch.aq3-小米Aqara无线开关传感器
-插头-小米智能插头
-86plug-小米智能墙插
-86sw2-小米无线双路墙壁开关
-86sw1-小米无线单壁开关
-汽油-小米米家霍尼韦尔气体报警探测器
-烟雾-小米米家霍尼韦尔火灾报警探测器
-ctrl_ln1-小米Aqara 86消防墙壁开关一键式
-ctrl_ln1.aq1-小米Aqara墙壁开关LN
-ctrl_ln2-小米86零火墙开关双键
-ctrl_ln2.aq1-小米Aqara墙壁开关LN双键
-ctrl_neutral2-小米有线双壁开关
-ctrl_neutral1-小米有线单壁开关
-立方体-小米立方体
-sensor_cube.aqgl01-小米多维数据集
-磁铁-小米门磁
-sensor_magnet.aq2-小米Aqara门磁
-窗帘-小米Aqara智能窗帘
-运动-小米运动传感器
-sensor_motion.aq2-小米Aqara运动传感器
-sensor_wleak.aq1-小米Aqara水传感器
-ctrl_ln2.aq1-小米Aqara墙壁开关LN（Double）
-remote.b286acn01-小米Aqara无线遥控器（Double Rocker）
-remote.b1acn01-小米Aqara无线遥控器
-振动-小米振动传感器
-wleak1-小米Aqara水传感器
-lock_aq1-小米锁

## IoBroker Mi家庭适配器安装
只能通过ioBroker管理界面进行进一步的设置。
在*适配器*区域中搜索适配器，并使用`+`符号进行安装。

![商标](../../../de/adapterref/iobroker.mihome/media/Adapter.png)

然后打开以下配置窗口：

![商标](../../../de/adapterref/iobroker.mihome/media/Adapterconfig1.PNG)

输入上面在`Default Gateway Key`下确定的密码，然后使用* save * *关闭窗口并关闭*。然后，正在运行的适配器应在*实例*下以绿色显示：

![商标](../../../de/adapterref/iobroker.mihome/media/Instanz.PNG)

网关及其示教的设备现在显示在*对象*下：

![商标](../../../de/adapterref/iobroker.mihome/media/Objekte.PNG)

这些说明是根据我们的知识和信念而制作的。

## Changelog
### 1.3.6 (2020-09-25)
* (VLGorskij) Added new device QBKG24LM

### 1.3.5 (2020-09-17)
* (Apollon77) Fix crash cases (Sentry IOBROKER-MIHOME-1..4)

### 1.3.4 (2020-08-31)
* (Alan) Fixed the crash for non existing attributes 

### 1.3.3 (2020-08-26)
* (bluefox) Sentry is activated

### 1.3.2 (2020-08-25)
* (VLGorskij) Added ac-partner.v3 support
* (bluefox) Added compact mode

### 1.3.1 (2020-08-19)
* (Diginix) Fixed calculation for sensor's battery percentage

### 1.3.0 (2020-01-16)
* (algar42) Ability to add devices with missing model by their SID ([e.g. for Aqara two-channel relay](https://github.com/algar42/ioBroker.mihome#usage))

### 1.2.9 (2019-11-15)
* (Diginix) Fixed pressure range and values of Aqara weather sensor

### 1.2.8 (2019-07-18)
* (SchumyHao) Change curtain and gateway light role that making them can be detected by type-detector

### 1.2.7 (2019-06-25)
* (SchumyHao) Add several devices support for protocol 2.0.x

### 1.2.6 (2019-03-04)
* (Diginix) Improved calculation for sensor's battery percentage

### 1.2.5 (2019-01-24)
* (Vanwards) Added long click for Aquara wall switch

### 1.2.4 (2019-01-15)
* (SchumyHao) Add Chinese support

### 1.2.3 (2018-10-23)
* (goohnie) New wall switch was added

### 1.2.0 (2018-10-12)
* (bluefox) refactoring

### 1.1.2 (2018-10-08)
* (bluefox) New button switch was added

### 1.1.1 (2018-09-23)
* (bluefox) Fixed the creation of new devices

### 1.1.0 (2018-09-13)
* (bluefox) New devices added:  sensor_switch.aq3, ctrl_ln1.aq1, ctrl_ln2.aq1, sensor_cube.aqgl01, remote.b286acn01, vibration, wleak1, lock_aq1
* (bluefox) Names will be taken from gateway

### 1.0.7 (2018-06-25)
* (bluefox) The heartbeat timeout and the re-connection interval settings were added

### 1.0.6 (2018-05-26)
* (bluefox) Added new Aqara cube sensor

### 1.0.5 (2018-03-05)
* (bluefox) Xiaomi Aqara Wall Switch LN Double was added

### 1.0.4 (2018-01-21)
* (bluefox) The alarm state was fixed.

### 1.0.3 (2018-01-21)
* (bluefox) Invalid temperature values will be ignored

### 1.0.2 (2018-01-14)
* (bluefox) Ignore unknown state of sensors

### 1.0.0 (2018-01-05)
* (bluefox) Do not overwrite the names
* (bluefox) Ready for Admin3

### 0.3.3 (2017-11-26)
* (bluefox) Allow multiple mihome gateways

### 0.2.4 (2017-11-04)
* (bluefox) Add aqara water sensor

### 0.2.3 (2017-09-22)
* (bluefox) Remove "." from id of the device

### 0.2.2 (2017-08-01)
* (bluefox) Set after 300ms doublePress to false by Temperature Sensor\nAllow control of Plug

### 0.2.1 (2017-07-29)
* (bluefox) Implement double click on temperature sensor

### 0.2.0 (2017-07-18)
* (bluefox) fix battery level

### 0.1.4 (2017-06-09)
* (bluefox) add cube
* (bluefox) remove voltage by gateway

### 0.1.1 (2017-06-06)
* (bluefox) Initial commit

## License
MIT

Copyright (c) 2017-2020 bluefox <dogafox@gmail.com>