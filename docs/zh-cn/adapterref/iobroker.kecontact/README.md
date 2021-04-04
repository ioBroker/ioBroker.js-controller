---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kecontact/README.md
title: 用于KEBA KeContact壁盒的ioBroker适配器
hash: vjCbP+Q83JgDZKTsurLlO6g+lu0iIW+GUqLR8Ogzg6g=
---
![适配器徽标](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![安装数量](http://iobroker.live/badges/kecontact-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![特拉维斯](https://img.shields.io/travis/iobroker-community-adapters/ioBroker.kecontact.svg)
![GitHub问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.kecontact.svg)

＃用于KEBA KeContact壁盒的ioBroker适配器
使用其UDP协议提供有关KEBA KeContact Wallbox当前状态的信息。

＃＃ 安装
通过ioBroker Admin安装此适配器：

1.打开实例配置对话框
2.输入您的KEBA KeContact壁盒的IP地址
3.根据需要调整刷新间隔
4.保存配置
5.启动适配器

＃＃ 配置
### KeContact IP地址
这是您的KEBA KeContact壁盒的IP地址。

###固件检查
每天一次适配器将在KEBA网站上检查是否有更新的固件。该信息将被打印以记录为警告。

###被动模式
如果您自己控制自己的Wallbox，并且不希望此适配器自动执行操作，请激活此选项。在这种情况下，有关光伏自动控制和功率限制的所有后续选项将被忽略。

###加载充电会话
您可以选中此选项以从墙上的盒子中定期下载最新的充电会话（30）。
v1.1.1及以下版本的用户要注意：您必须选中此选项才能继续接收充电会话！

＃＃＃ 刷新间隔
这是间隔（以秒为单位），应该多久查询一次壁盒以获取新值。通常不需要它（设置为0）。
Wallbox连续发送绝对足够使数据保持最新状态的广播。

默认值为30秒，这是KeConnect的负载与ioBroker中的最新信息之间的良好平衡。

### PV自动装置
为了使您的车辆过剩地充电（例如通过光伏），您还可以定义代表过剩和主电源状态的状态。这些值用于计算可用于充电的安培数。通过其他值，您可以定义

*与默认的6 A不同的最小安培数（仅适用于例如Renault Zoe）
*可用于开始充电的参考功率值（这意味着即使没有足够的剩余电量也将开始充电-建议1阶段充电为0 W，3阶段充电为500 W至2000 W）
*安培数的增量（建议500 mA）
*可以暂时用于维持充电时段的关注值（这意味着即使不再有足够的剩余电量，充电也将在以后停止-将添加开始关注-建议500 W）
*充电会话的最短持续时间（即使剩余不再足够，充电会话也至少会持续此时间-建议300秒）

###功率限制
您还可以限制最大墙盒的电源以限制主电源。例如。在运行夜间存储加热器时，您可能必须遵守最大功率限制。如果您输入一个值，则您的wallbox将连续受到限制，以不超过您的功率限制。最多可以指定三种状态的电度表进行限制。所有值都将相加以计算电流消耗。一个额外的复选框用于指定是否包括墙盒电源（在这种情况下，将从状态值中减去墙盒电源）。

＃＃ 合法的
该项目与KEBA AG公司没有直接或间接的联系。

KeConnect是KEBA AG的注册商标。

## Changelog

### 1.1.2 (2021-04-02)
* (Sneak-L8) default state of photovoltaics automatic set to true for new users
* (Sneak-L8) new option to select whether charging sessions list should be downloaded and be saved in states or not, do so only once an hour
             ATTENTION for users from version v1.1.1 and below: you have to check this option to still receive for charging sessions!
* (Sneak-L8) firmware version check
* (Sneak-L8) expanded readme

### 1.1.1 (2021-02-25)
* (Sneak-L8) internal state update prevented recognition of state change

### 1.1.0 (2021-02-20)
* (Sneak-L8) intermediate results saved as states values
* (Sneak-L8) additional power for charging session as state

### 1.0.3 (2021-02-08)
* (Sneak-L8) new options for minimal amerage (e.g. Renault Zoe) and permanent regard value

### 1.0.2
* Added readout of last 30 Charging Sessions from Wallbox; Enabled 'setenergy' State to send and set Charging Goal in Wh to Wallbox

### 1.0.1 (2020-08-20)
* (Sneak-L8) add missing german translation for IP address setting

### 1.0.0 (2020-08-20)
* (UncleSam) change settings layout to material design, first offical version

### 0.3.2 (2020-08-04)
* (Sneak-L8) in PV automatics mode wallbox will be disabled as long as no vehicle is plugged

### 0.3.1 (2020-07-23)
* (Sneak-L8) do not start charging when vehicle is plugged even if current is too low for photovoltaics automation

### 0.3.0 (2020-07-21)
* (Sneak-L8) regulate wallbox by PV automatics independant from state curr user

### 0.2.6 (2020-07-20)
* (Sneak-L8) try again to regulate wallbox by currtime instead of curr as suggested

### 0.2.3 (2020-05-24)
* (Sneak-L8) fix call to display PV automatics after vehicle is plugged, fix object in energy meter states

### 0.2.2 (2020-05-13)
* (Sneak-L8) display information about photovoltaics automatic also at begin of charging
* (Sneak-L8) delayed display of photovoltaics automatic when vehicle is plugged (8 sec)

### 0.2.1 (2019-11-14)
* (Sneak-L8) handle values of undefined in getStates
* (Sneak-L8) better recognition of max power function

### 0.2.0 (2019-02-05)
* (Sneak-L8) added automatic regulation by output photovoltaics unit
* (Sneak-L8) added possibility to limit wallbox to keep total power below a limit
* (Sneak-L8) added state to display text on wallbox

### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version

## License

Copyright 2020 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.