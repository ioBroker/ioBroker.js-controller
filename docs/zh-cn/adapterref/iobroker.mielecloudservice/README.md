---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.MieleCloudService
hash: rddpQDgYYESDU49zCZjbWILDTaRrDNcBKGKqJvXk5Wg=
---
![商标](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.png)

![安装数量](http://iobroker.live/badges/mielecloudservice-stable.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![依赖状态](https://img.shields.io/david/Grizzelbee/iobroker.mielecloudservice.svg)
![已知漏洞](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg)
![特拉维斯](http://img.shields.io/travis/Grizzelbee/ioBroker.mielecloudservice/master.svg)
![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)

＃ioBroker.MieleCloudService
=================

##说明
该适配器用于从官方Miele 3rd-party API检索有关所有Miele @ Home设备的信息。

##安装
要安装，请执行以下操作：

1.通过管理员安装：https://github.com/Grizzelbee/ioBroker.mielecloudservice.git
2.在Miele Smartphone应用程序中为Miele @ Home创建一个应用程序帐户
3.在https://www.miele.com/f/com/zh-CN/register_api.aspx上创建一个开发人员帐户
4.将您的Miele设备添加到应用程序（如果未自动添加）
6.填写从Miele-developer团队收到的client_secret和client_id，以及从应用程序获得的帐户ID和密码。

＃＃ 要求
* Miele @ Home用户（智能手机应用程序）
* Miele @ Home密码（智能手机应用程序）
* Miele Client_id（来自https://www.miele.com/developer/）
* Miele Client_secret（来自https://www.miele.com/developer/）

＃＃ 下一步
*新增：（无设备活动时）（更长）轮询间隔
*新功能：完全不活动的睡眠时间（例如晚上）
*新增：行动支持

##文档
有一些数据点可用2种。作为人类可读的文本和数字。
这些属于文本字段的数字数据字段具有相同的名称，但附加了“ _raw”。
下面列出了具有一般含义的字段。
未列出的字段的含义因设备而异，并且不受Miele的贬低。
如果需要在脚本中引用这些字段，请始终使用_raw值。
文本值将来可能会更改，并且还取决于语言。
以下是这些原始值代表的列表：

###状态/状态
 |原始值状态|
 |----------|-------|
| 1 |关闭|
 | 2 | STAND_BY |
 | 3 |已编程|
 | 4 | PROGRAMMED_WAITING_TO_START |
 | 5 |正在运行|
 | 6 |暂停|
 | 7 | END_PROGRAMMED |
 | 8 |失败|
 | 9 | PROGRAMME_INTERRUPTED |
 | 10 |空闲|
 | 11 | RINSE_HOLD |
 | 12 |服务|
 | 13 |超级冷冻|
 | 14 |超冷|
 | 15 |超热|
 | 144 |默认|
 | 145 |锁定|
 | 146 | SUPERCOOLING_SUPERFREEZING |

### ProgramType / Programmart
|原始值状态|
|----------|-------|
| 0 |正常运行模式 |
| 1 |自己的程序|
| 2 |自动程序|
| 3 |清洁/保养程序|

### DryingStep / Trockenstufe
 |原始值状态|
 |----------|-------|
 | 0 |超干|
 | 1 |普通加|
 | 2 |正常|
 | 3 |稍干|
 | 4 |手铁1级|
 | 5 |手铁2级|
 | 6 |机铁|

## Changelog

### 1.0.5 (2020-02-14)
* (grizzelbee) removed node-schedule as a dependency
* (grizzelbee) implemented scheduling via setTimeout, which raises the opportunity 
               to schedule with less than a minute in the future

### 1.0.4 (2020-02-12)
* (grizzelbee) removed unneeded setTimeout from main
* (grizzelbee) Clearing scheduler on unload of adapter
* (grizzelbee) Minor updates and fixed typos in Readme

### 1.0.3 (2020-02-06)
* (grizzelbee) removed an overseen logging of Passwords
* (grizzelbee) Fixed createTemperatureDatapoint to work with less than 3 values delivered from API
* (grizzelbee) Added some documentation
* (grizzelbee) Started implementation of DeviceActions 


### 1.0.2 (2020-02-05)
* (grizzelbee) removed any logging of Passwords
* (grizzelbee) Fixed bug in config interface introduced during password encryption that config values aren't loaded properly

### 1.0.1 (2020-02-04)
* (grizzelbee) Fixes in environment for getting Adapater into the Repo
* (grizzelbee) Passwords are stored encyrpted now

### 1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefor it's incompatible with prior versions and needs to be installed freshly. 
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug 
* (grizzelbee) Chg: removed Push-API checkbox (may be introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for Non german Miele-Accounts (ALL should be included)
* (grizzelbee) Completely new layout of datapoints
* (grizzelbee) Devicetypes are grouped now 

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values 
* (grizzelbee) New: Parent-Datapoint of timevalues will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.  

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
                    - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

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

##Copyright
Copyright (c) 2019, 2020 grizzelbee <captain.tzk@gmail.com>