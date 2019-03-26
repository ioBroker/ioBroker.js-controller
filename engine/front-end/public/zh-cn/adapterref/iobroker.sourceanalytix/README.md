---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/edit/master//README.md
title: SourceAnalytix
hash: owuV3WE3lin3Rp4b08vvlLx5mJnF+ounVyzBX6PTFHg=
adapter: true
license: MIT
authors: DutchmanNL <rdrozda@hotmail.com>
description: 提供每日，每周，每月和每年消费数据的详细消费计算
keywords: energy, power, analytics, consumption, meassurement, data
readme: https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2019-01-13T20:30:60.934Z
version: 0.2.274
BADGE-测试: https://travis-ci.org/iobroker-community-adapters/ioBroker.sourceanalytix.svg?branch=master
BADGE-安装数量: http://iobroker.live/badges/sourceanalytix-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.sourceanalytix.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg
---
＃[Beta  - 已发布] SourceAnalytix
[![Greenkeeper徽章]（https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.sourceanalytix.svg）](https://greenkeeper.io/)

##警告，此适配器需要节点8或更高！
ioBroker SourceAnalytix允许您跟踪和跟踪设备的消耗，成本和仪表值。
您需要从设备输入数据（Wh，l / h或m3的总量），此适配器将：

*每日，每周，每月，每季度，每年跟踪消费
*计算成本（当前价格可配置）
*可用于功耗，液体和气体
*输入值可以是wh / kWh / m3 / l

＃＃ 如何
* [ ] 去做

这个适配器是根源，感谢pix回2016年https://forum.iobroker.net/viewtopic.php?f=21&t=2262

由@hadering改进并在github上发布https://github.com/hdering/homematic_verbrauchszaehler

＃＃ 已知的问题
* []期间计算可选但尚未实施
* []存储尚未实现的当前仪表值
* []季度未计算
* []月度成本价格尚未在计算中实施
* [x]米值可选但尚未实施
* [x]适配器重启需要添加新对象的计算
* [x]成本类型交付的最终状态未被写入
* [x]设备名称别名不正确
* [x]翻译

＃＃ 去做
* []文档
* []成本默认值为0，如果未提供，则显示错误消息
* []基于仪表值的重新计算（可按日期配置）
* []计算季度值
* []存储每个州的仪表值
* []为适配器设置中可配置的前[x]天，[x]周，[x]月，[x]季度，[x]年添加对象状态
* []代码优化
* [x]紧凑模式
* [x]添加对wh值计算的支持
* [x]修复基本翻译
* [x]就绪状态值并存储到状态
* [x]将仪表值写入“启动”状态以用于计算
* [x]可配置的每个州的intervall
* [x]每个州的可配置单位
* [x]每个州的可配置成本价格
* [x]每个州的可配置单价
* [x]用于成本或收入的状态
* [x]消耗量计算
* [x]成本计算
* [x]可调节的测量起点
* [x]支持多种设备状态
* [x]将仪表值写入要在计算中使用的对象
* [x]配置适配器设置（目前只支持发现的演示对象）
* [x]删除临时状态以进行计算
* [x]计算m3值
* [x]使用设备名称的别名
* [x]可配置的数据点（是/否），用于成本，消耗和计量值
* [x]可选择存储整年的分析或仅存储可选择的周期
* [x]确保在适配器关闭时存储所有值以防止数据间隔

## Changelog

### 0.2.273
* (Dutchman) fix issue in daily reset of start values
* (Dutchman) Fix badges in readme
* (Dutchman) exclude calculations of w from current routines (will be implemented in next version(s)

### 0.2.272
* (Dutchman) change logic of initialisation
* (Dutchman) fix issue in calculation handling
* (Dutchman) extract unit definition to central function
* (Dutchman) removed "logging to troubleshoot", use "debug" in adapter setting

### 0.2.271
* (Dutchman) implement compact mode
* (Dutchman) fix testing issues
* (Dutchman) fix error "unit" or "tolowercase" is undefind
* (Dutchman) fixed installation issues

### 0.2.27
* (Dutchman) fixed issue related to multihost installations with slave as target

### 0.2.26
* (Dutchman) fixed issue in calculations for gas environments and liquids
* (Dutchman) improve logging related to issue analytics

### 0.2.25
* (Dutchman) add option in state setting to automatically OR manually choose the meassurement unit (for cases device state does not have correct value)

### 0.2.24
* (Dutchman) add support for heating pumps
* (Dutchman) improvements in adapter configuration screen

### 0.2.2
* (Dutchman) fixed reset of start values
* (Dutchman) removed uneeded logging "Write calculations for : "
* (Dutchman) generic improvement of logging, to see status messages activate it in adapter settings ! Otherwise onlyu erros will be shown and add/del devices
* (Dutchman) improved complete logic of state add/delete/update config in backend which will result in better performance/error handling
* (Dutchman) small fixed in configuration screen to show logging options

### 0.2.1
* (Dutchman) fixed "current_day" missing in object tree
* (Dutchman) fixed log messages "removed from SourceAnalytix"
* (Dutchman) fixed unit issue to support upper and lower case in values
* (Dutchman) fixed unit issue replace strange characters
* (Dutchman) remove intervall setting from configuraiton screen (handle by state subscribtion now!)
* (Dutchman) remove start meassurement from state configuraiton screen (not need, please use day start, week start etc !)

### 0.2.0
* (Dutchman) rebuild logic to calculate values (beta testing)
* (Dutchman) implement logic to automatically reset values by start of new day, week, month, year etc (beta testing)
* (Dutchman) changed logic from intervall polling to handle calculations based on state updates (beta testing, not if suitable for all situations)
* (Dutchman) fixed issue incorrect states are added to monitoring
* (Dutchman) fixed issue calculation not stopped when state removed from monitoring
* (Dutchman) always store all current meassurements to values of cathegorie regardless setting year etc
* (Dutchman) code cleanup and optiomalisation
* (Dutchman) added logging option "satus notification"
* (Dutchman) implement new translation mechanisme


### 0.1.9 
* (Dutchman) Adapter moved to community development tree
* (Dutchman) added npm version and test-status to readme
* (Dutchman) finalized new konfiguration screen & translations
* (Dutchman) adding/removing objects from analytix does not need adapter reboot anymore ! :-)
* (Dutchman) rebuild logic how data is handled as basic for new calculation logic (Experimental)
* (Dutchman) added options to year analytics to choose values (days,weeks,years etc)
* (Dutchman) option added for Developer logging
* (Dutchman) Basic price is currently not considered in cost calculations !
* (Dutchman) Values day start, week start etc are currenlty not automatically set (will be in 0.2.0)


### 0.1.8 (unuasable temporary verion )
* (Dutchman) konfiguration pages completly redesigned : Please do not enter values yet !
* (Dutchman) master konfiguration added to globally define costs
* (Dutchman) intervall settings moved to global setting instead of each state seperated
* (Dutchman) instead of cost-price in each state use drop down menu to choose values from global settings
* (Dutchman) fixed naming and translations

### 0.1.6
* (Dutchman) fixed data reset for quarter values (thank you Jens !)
* (Dutchman) fixed usage of alias
* (Dutchman) fixeded issue in calculation of earnings and delivery
* (Dutchman) logging improvement
* (Dutchman) fixed log messages
* (Dutchman) calculation for m3 values
* (Dutchman) calculation for l values

### 0.1.5
* (Dutchman) improved state write logic, only sent write commando when needed

### 0.1.3
* (Dutchman) add support for calculation of Wh values

### 0.1.0
* (Dutchman) first public beta release
* (Dutchman) fixed translations
* (Dutchman) rebuild calculation logic
* (Dutchman) fixed calculation of start offset
* (Dutchman) adjustable if state is used for cosumption or delivery
* (Dutchman) limited possible logging to kWh only for this moment
* (Dutchman) only create states and channels for logging types selected

### 0.0.9
* (Dutchman) fixed wrong calculation of start values
* (Dutchman) fixed wrong calculation of quarter values
* (Dutchman) prepare public beta and travis testing
* (Dutchman) change name to SourceAnalytix
* (Dutchman) implemented SourceAnalytix settings at states (equal to data logging adapters)
* (Dutchman) configurable unit for every state, automatically from object state. currently only kWh supported !

### 0.0.8
* (Dutchman) configurable intervall for every state

### 0.0.7
* (Dutchman) automated reset of start values

### 0.0.6
* (Dutchman) fixed issue with travis build
* (Dutchman) fixed wrong information in package-json

### 0.0.4
* (Dutchman) cost calculation
* (Dutchman) adjustable starting point of meassurement
* (Dutchman) support of multiple device states instead of 1
* (Dutchman) fixed calculation of current consumptions

### 0.0.3
* (Dutchman) code optimalisation

### 0.0.2
* (Dutchman) creation of object structure
* (Dutchman) first values read based on test_object.js input file to read values adn write data of current period.s

### 0.0.1
* (Dutchman) initial release

## License
MIT License

Copyright (c) 2018 Dutchman

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