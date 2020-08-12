---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kecontact/README.md
title: 用于KEBA KeContact壁盒的ioBroker适配器
hash: NWcJNViFqmMdew0IG36iCau7nPWSHVmhinSCNL6COYc=
---
![适配器徽标](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![安装数量](http://iobroker.live/badges/kecontact-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![特拉维斯](https://img.shields.io/travis/iobroker-community-adapters/ioBroker.kecontact.svg)
![GitHub问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.kecontact.svg)

＃用于KEBA KeContact壁盒的ioBroker适配器
使用其UDP协议提供有关KEBA KeContact Wallbox当前状态的信息。

##安装
通过ioBroker Admin安装此适配器：

1.打开实例配置对话框
2.输入您的KEBA KeContact壁盒的IP地址
3.根据需要调整刷新间隔
4.保存配置
5.启动适配器

##配置
### KeContact IP地址
这是您的KEBA KeContact Wallbox的IP地址。

＃＃＃ 刷新间隔
这是间隔时间（以秒为单位），应该多久查询一次wallbox以获取新值。

默认值为30秒，这是KeConnect的负载与ioBroker中的最新信息之间的良好平衡。

###其他选项
您还可以定义状态，以优化汽车的PV充电或限制最大功率。主电源的功率。

##法律
该项目不直接或间接与KEBA AG公司关联。

KeConnect是KEBA AG的注册商标。

## Changelog
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