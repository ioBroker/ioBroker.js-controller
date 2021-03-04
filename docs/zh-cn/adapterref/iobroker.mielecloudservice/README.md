---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.MieleCloudService
hash: ZLsHppC757/KAgqLW2TbgD9QzBbDq34IOz/fWmHDLu8=
---
![标识](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![安装数量](http://iobroker.live/badges/mielecloudservice-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![已知漏洞](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![特拉维斯](http://img.shields.io/travis/Grizzelbee/ioBroker.mielecloudservice/master.svg)
![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![资料下载](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)

＃ioBroker.MieleCloudService
＃＃ 描述
该适配器用于从官方Miele 3rd-party API检索有关所有Miele @ Home设备的信息。
无论它们是否通过Wi-Fi或XGW3000网关直接连接。它实现了** Miele 3rd Party API V1.0.4 **

##先决条件
* Miele @ Home用户（智能手机应用程序）
* Miele @ Home密码（智能手机应用程序）
* Miele Client_id（来自https://www.miele.com/developer/）
* Miele Client_secret（来自https://www.miele.com/developer/）

＃＃ 安装
要安装，请执行以下操作：

1.使用
 *稳定的回购-获得当前的稳定版本
 *最新的Repo-获取最新的测试版本（可能不稳定）
 *通过：https://github.com/Grizzelbee/ioBroker.mielecloudservice.git-获得最新的开发版本
2.在Miele Smartphone应用程序中为Miele @ Home创建一个应用程序帐户
3.在https://www.miele.com/f/com/zh-CN/register_api.aspx上创建一个开发人员帐户
4.将您的Miele设备添加到应用程序（如果未自动添加）
6.填写从Miele-developer团队收到的client_secret和client_id以及从应用程序获得的帐户ID和密码。

##控制您的设备
实现了所有设备当前所有受支持和记录的操作（API V1.0.2）。
>请记住，仅当您将设备置于适当的状态（例如，Mobile Control，powerOn等）时，“操作”才有效。
请参阅[Miele文档](#documentation)了解有关操作的更多信息。

＃＃ 已知的问题
* API 1.0.4引入的动作ambientLight尚未实现

##文档
请主要参考Miele发布的主要API文档

* [一般文档]（https://www.miele.com/developer/swagger-ui/index.html）
* [在设备上执行操作的前提条件]（https://www.miele.com/developer/swagger-ui/put_additional_info.html）

有2种可用的数据点。作为人类可读的文本和数字。
这些属于文本字段的数字数据字段具有相同的名称，但附加了“ _raw”。
下面列出了具有一般含义的字段。
未列出的字段的含义因设备而异，并且未由Miele记录。
如果需要在脚本中引用这些字段，请始终使用_raw值。
文本值将来可能会更改，并且还取决于语言。
以下是这些原始值代表的列表：

###设备类型
 |原始值状态|
 |----------|-------|
 | 1 |洗衣机|
 | 2 |滚筒干燥机|
 | 7 |洗碗机|
 | 8 |洗碗机半专业|
 | 12 |烤箱|
 | 13 |微波炉|
 | 14 |重点介绍|
 | 15 |蒸汽烤箱|
 | 16 |微波|
 | 17 |咖啡系统|
 | 18 |头套|
 | 19 |电冰箱|
 | 20 |冷冻机|
 | 21 |电冰箱/冰柜组合|
 | 23 |真空清洁器，自动机器人真空清洁器|
 | 24 |洗衣机烘干机|
 | 25 |盘温|
 | 27 |滚刀感应|
 | 28 |燃气|
 | 31 |蒸汽烤箱组合|
 | 32 |酒柜|
 | 33 |酒柜|
 | 34 |葡萄酒储存调节装置|
 | 39 |双烤箱|
 | 40 |双蒸炉|
 | 41 |双蒸汽烤箱组合|
 | 42 |双微波|
 | 43 |双微波炉|
 | 45 |蒸汽烤箱微波组合|
 | 48 |真空吸尘器|
 | 67 | DIALOGOVEN |
 | 68 |葡萄酒柜冷冻组合|

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
 | 255 |设备离线|

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
 | 5 |手动熨斗2级|
 | 6 |机铁|

### ProgramBezeichnung
|原始值状态|适用于|
|----------|-------|---------------|
| 1 | “ Baumwolle” /“棉” |洗衣机|
| 23 | “ Oberhemden” / |洗衣机|
| 27 | “Imprägnieren” / |洗衣机|
| 48 | “弗洛森·奥斯普兰” |洗衣机烘干机|
| 50 | “ DunkleWäsche” / |洗衣机烘干机|
| 122 | “ Express 20” / |洗衣机烘干机|
| 123 | “扣篮/牛仔裤” |洗衣机|

### ProgramPhase
|原始值状态|适用于|
|----------|-------|---------------|
| 260 | “洗涤” /“洗涤” |洗衣机|
| 261 | “Spülen” /“冲洗” |洗衣机|
| 266 | “ Schleudern” /“ Spinning” |洗衣机|
| 267 | “ Knitterschutz” /“” |洗衣机|
| 268 | “ Ende” /“ End” |大多数设备|
| 256 | “Vorbügeln” |洗衣机|
| 514 | “ Trocknen” |洗衣机烘干机|
| 519 | “Abkühlen” |洗衣机烘干机|
| 532 | “弗吕森·奥斯普兰” |洗衣机烘干机|

##版权
版权所有（c）2019、2020 grizzelbee <hanjo@hingsen.de>

## Changelog
### 3.0.2 (2021-03-03)
*  (grizzelbee) Fix: [79](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/79) When a devices serial is missing, the identNumber is assigned instead.
*  (grizzelbee) Upd: Changed folder name cooktops to hobs since this is the more common name

### 3.0.1 (2021-02-25)
> *Hint:* Action_Information and Action_Status objects are created on first action execution and contain infos to the last executed action.
> Please take care of notes regarding [Controlling your devices](#Controlling your devices).
*  (grizzelbee) Upd: Improved logging in some parts - objects get stringified.
*  (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Actions are working again
*  (grizzelbee) Upd: Actions are tested before sending whether they are permitted in current device state
*  (grizzelbee) Upd: estimatedEndTime doesn't show seconds anymore
*  (grizzelbee) Upd: Improved documentation
*  (grizzelbee) Upd: removed unused function decrypt
*  (grizzelbee) Upd: removed superfluent parameters


### 3.0.0 (2021-02-18)
> Hint: ecoFeedback objects are created on the first run of the device. This allows to only create them, when they contain data.
*  (grizzelbee) New: BREAKING CHANGE: Making use of build-in password de-/encryption. This raises the need to re-enter your passwords again, because the old ones can't be decrypted anymore.
*  (grizzelbee) New: [70](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/70) Implements Miele API 1.0.4
*  (grizzelbee) New: [64](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/64) Introduces data point estimatedFinishingTime
*  (grizzelbee) New: [54](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/54) Poll interval can now freely be selected in seconds and minutes
*  (grizzelbee) Upd: [73](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/73) BREAKING CHANGE: Removed white-spaces from any ID in device tree. This creates completely new device trees. So please delete the old ones.
*  (grizzelbee) Upd: removed david-dm badge
*  (grizzelbee) Upd: updated dependencies
*  (grizzelbee) Fix: added passwords to encryptedNative
*  (grizzelbee) Fix: added passwords to protectedNative
*  (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) added missing info.connection object to io-package
*  (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) Fixed new Warnings introduced with js-controller 3.2
*  (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Light-Actions should work now

### 2.0.3 (2020-09-15)
* (grizzelbee) Upd: Updated country list in config dialog
* (grizzelbee) New: Some more debug code

### 2.0.2 (2020-09-15)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on failed authentication preventing a valid error message

### 2.0.1 (2020-09-14)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on logout while invalidating token

### 2.0.0 - Support for Miele API V1.0.3 (2020-08-25)
Some breaking changes in this release. Some datapoints changed their type. May require fixes in scripts. **Update with care!**
Due to the fix that datapoints with invalid values aren't created any longer, I recommend deleting all datapoints in Object view.
* (grizzelbee) Change: New Icon
* (grizzelbee) Fix: Number-datapoints are no longer created as strings due to their unit. They are correct numbers with units now.
* (grizzelbee) Fix: Unit °Celsius is now shown as °C - not longer °Celsius
* (grizzelbee) New: Introduced support for °Fahrenheit
* (grizzelbee) New: Introduced support for new Value "plateStep" for Hobs.
* (grizzelbee) New: Performing a LogOut from Miele API on shutdown to invalidate the Auth-Tokens.
* (grizzelbee) Fix: Datapoints with invalid values (null/-32768) are no longer created.

### 1.2.4 (2020-06-09)
* (grizzelbee) Fix: fixed No-Data Bug (introduced in V1.2.3)

### 1.2.3 (2020-06-07)
* (grizzelbee) Upd: fixed snyk badge
* (grizzelbee) Upd: Improved error handling

### 1.2.2 (2020-05-23)
* (grizzelbee) Upd: removed node 8 from testing on travis.com
* (grizzelbee) Fix: signalActionRequired should work better now
* (grizzelbee) Upd: Updated documentation
* (grizzelbee) Upd: Improved error handling in function APISendRequest
* (grizzelbee) Fix: Moved testing of Config to On(Ready) and fixed unit tests with this.

### 1.2.1 (2020-04-22)
* (grizzelbee) New: Introduced new boolean state (**signalActionRequired**) that indicates that the machine has finished running, but a human action, like putting the wet clothes to the dryer, ... is needed. State is cleared automatically when the door of the appliance is opened, or it is restarted. State is implemented for washing machines, tumble dryers, washer dryer and dishwashers. **Doesn't work perfectly currently.**
* (grizzelbee) Upd: Updated Documentation
* (grizzelbee) Fix: Fixed warnings with js-Controller >=3.0 (Issue #23)

### 1.2.0 (2020-04-18)
* (grizzelbee) New: Added new boolean state (**Connected**) that indicates whether the device is connected to WLAN or a gateway.
* (grizzelbee) New: Added new boolean state (**signalInUse**) that indicates whether the device is switched off (false) or in Use (true).
* (grizzelbee) Change: replaced the deprecated http-library **request** with **axios**
* (grizzelbee) Change: Made functions communicating with API asynchronous

### 1.1.0 (2020-03-07)
* (grizzelbee) New: Added Actions - Implemented all currently supported and documented Actions for all devices.
> Please remember that Actions will only work if you put your device into the appropriate state (e.g. Mobile Control)
please refer to [Miele-Documentation](#documentation) for more Information on actions.

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
* (grizzelbee) Fixes in environment for getting adapter into the Repo
* (grizzelbee) Passwords are stored encrypted now

### 1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefore it's incompatible with prior versions and needs to be installed freshly.
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug
* (grizzelbee) Chg: removed Push-API checkbox (maybe introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for non-german Miele-Accounts (ALL should be included)
* (grizzelbee) Complete new layout of datapoints
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