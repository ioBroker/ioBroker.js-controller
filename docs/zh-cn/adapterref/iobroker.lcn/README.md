---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: oHwz0i8ruJc4gnX7bkTWCtf1HJx+7bMjXbH3Qwq+4B0=
---
![商标](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.lcn.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![NPM](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

＃ioBroker.lcn
此适配器允许将本地控制网络[LCN](https://www.lcn.eu/)连接到ioBroker。

##支持的网关
-LCN-PKE

![ke](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

-与LCN-PCHK的LCN-PKU

![ke](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

**不要忘记，ioBroker.lcn将阻止一个LCN连接许可证。**

扫描将自动检测配置和模块，必须从配置对话框中手动触发该配置和模块，并且可以随时重复进行。

##类型
支持以下读写组：

-模拟值（输出/输入）
-继电器（输出）
-传感器（输入）
-LED（输出/输入）
-变量（输入）

##变量
要将有效的转换函数应用于变量，变量必须具有有效的角色。支持以下角色：

-**温度值**-摄氏温度
-**值。亮度**-勒克斯（I-输入）勒克斯
-** value.speed.wind **-风速，m / s
-**值电压**-电压（伏）
-** value.current **-电流（安培）
-** value.sun.azimuth **-太阳方位角
-** value.sun.elevation **-太阳高度

##显示
对于每台设备，如果有显示，您都可以激活。

##调节器（Regler）
对于每个设备，无论是否具有调节器，都可以激活。

##设置
-重新连接间隔（秒）-适配器尝试连接的频率。默认为30秒。
-连接超时（ms）-适配器等待连接响应包含身份验证的时间。默认值6秒。
-扫描响应超时（ms）-适配器通过扫描模块等待答案的时间。
-响应超时（ms）-控制命令超时
-Ping间隔（秒）-适配器发送ping请求的频率
-Ping响应超时（ms）-Ping请求超时
-输入/输出继电器相同-如果“输出”和“输入”继电器相同，或者这些继电器不同。

```
// =====================  Same relays =============================
//                                    +-------+
// ----------------- OUT -----------> |       |
//                                    | Relay |
// <----------------- IN ------------ |       |
//                                    +-------+
//
//
// ======================  Different relays =======================
//                                    +-------+
//                                    |       |
// ----------------- OUT -----------> | Relay |
//                                    |       |
//                                    +-------+
//
//                                    +--------+
//                                    | Sensor |
// <----------------- IN ------------ |   or   |
//                                    | Relay  |
//                                    +--------+
```

＃＃ 如何使用
首次启动后，必须对设备进行扫描。可以在带有扫描按钮的配置对话框中完成

![扫描](../../../en/adapterref/iobroker.lcn/img/scanButton.png)

＃＃ 去做
-定义变量类型的配置对话框。

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog
### 1.0.2 (2020-10-11)
* (bluefox) Implemented the regulators and the display support.

### 0.6.3 (2019-12-18)
* (bluefox) General relays mode implemented

### 0.6.2 (2019-12-07)
* (bluefox) Detected delayed responses
* (bluefox) Dynamical creation of states is implemented

### 0.5.5 (2019-12-05)
* (bluefox) Relay inputs were corrected

### 0.5.4 (2019-12-04)
* (bluefox) Connection indication was corrected

### 0.5.1 (2019-11-29)
* (bluefox) Finger scanner supported
* (bluefox) Added possibility to set the analog mode
* (bluefox) Relay outputs are supported now

### 0.4.4 (2019-11-26)
* (bluefox) Fixed error by parsing of acknowledgement

### 0.4.2 (2019-06-12)
* (bluefox) Support of old measure values was added

### 0.3.2 (2018-11-19)
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018-2020 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.