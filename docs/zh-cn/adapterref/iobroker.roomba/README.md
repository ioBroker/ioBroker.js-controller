---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: tcLLym+E6nf8ooit8z1BQLV5IDQVg7GmVeVMaBTZqi0=
---
![商标](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

![安装数量](http://iobroker.live/badges/roomba-installed.svg)
![稳定的版本](http://iobroker.live/badges/roomba-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.roomba.svg)
![特拉维斯CI](https://travis-ci.org/Zefau/ioBroker.roomba.svg?branch=master)
![下载](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![Greenkeeper徽章](https://badges.greenkeeper.io/Zefau/ioBroker.roomba.svg)
![NPM](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

＃ioBroker.roomba将您的iRobot Roomba连接到ioBroker。
基于dorita980库https://github.com/koalazak/dorita980#readme

**目录**

1. [安装]（＃装置）
2. [设置说明]（＃setup-instructions）
3. [支持的Roomba /固件版本]（＃supported-roombas  -  firmware-versions）
4. [频道与州]（＃频道 - 州）
5. [偏好描述（不完整）]（＃描述偏好不完整）
6. [智能家居/ Alexa使用ioBroker.javascript集成]（＃smart-home  -  alexa-integration-using-iobrokerjavascript）
7. [更改日志]（#changelog）
8. [学分]（＃学分）
9. [许可证]（＃许可证）

##安装
ioBroker.roomba需要[帆布](https://www.npmjs.com/package/canvas)才能绘制Roomba任务的地图。 ioBroker将尝试使用ioBroker.roomba安装来安装此依赖项。

但是，您可能必须使用以下命令安装canvas的包依赖项：

```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

如果您收到未安装画布的错误消息，请尝试通过运行以下命令在ioBroker.roomba文件夹中手动安装（通过SSH）：

```
sudo npm install canvas --unsafe-perm=true
```

##安装说明
###自动设置
按照ioBroker.roomba管理面板中的说明自动设置ioBroker.roomba。

**注意**：身份验证凭据与您在智能手机应用程序中使用的身份验证凭据不同！

1.确保已启动ioBroker.roomba适配器。
2.确保您的机器人在Home Base上并打开电源（绿灯亮）。
3.然后按住机器人上的HOME按钮，直到它播放一系列音调（约2秒钟）。
4.松开按钮，机器人将闪烁WIFI灯。
5.然后返回此处按下按钮以检索IP和凭据。

如果自动过程无法检索您的凭据，请使用手动设置。

###手动设置
有关手动设置，请参阅https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password。

##支持的Roomba /固件版本
###支持的固件版本
|软件版本|固件信息|支持|
| ---------------- | ------------- | --------- |
| v1.4 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle)| ![**支持（！＃c5f015）（https://placehold.it/15/c5f015/000000?text=+) **](https://placehold.it/15/c5f015/000000?text=+)包括地图）** |
| v3.2.xx | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)| ![＃c5f015]（https://placehold.it/15/c5f015/000000?text=+) **支持**（！[＃f03c15](https://placehold.it/15/f03c15/000000?text=+)NOmap）|
| v3.2.xx | [发行说明]（https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle）| ！[＃c5f015]（https://placehold.it/15/c5f015/000000?text=+) **支持**（！[＃f03c15]（https://placehold.it/15/f03c15/000000？ text = +）没有地图）|

###支持Roomba
|意甲|模型_（不完整）_ |软件版本|固件信息|支持|
| ----- | --------------------- | ---------------- | ------------- | --------- |
| Roomba®6xx| 605,606,612,616,671,676,680,696 | v3.2.40 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)| （最有可能）|
| Roomba®7xx| 774,785，| -  | | ![＃f03c15](https://placehold.it/15/f03c15/000000?text=+)_Model不提供Wifi连接，因此没有support_ |
| Roomba®8xx| 880,886,891,896 | -  | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)| （最有可能）|
| Roomba®8xx| [895]（（https://forum.iobroker.net/post/245274））| v3.2.10 / 40/69 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)| ![＃c5f015]（https://placehold.it/15/c5f015/000000?text=+) **支持**（！[＃f03c15](https://placehold.it/15/f03c15/000000?text=+)NOmap）|
| Roomba®9xx| 965,981 | -  | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle)| （最有可能）|
| Roomba®9xx| [960]（https://forum.iobroker.net/user/jb_sullivan），[966]（https://forum.iobroker.net/user/thomaslpz),980 | v2.4.6-3 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle)|支持![＃c5f015](https://placehold.it/15/c5f015/000000?text=+)**（包括地图）** |
| Roomba®i| [i7（7150）]（https://forum.iobroker.net/post/240589），i7 +（7550）| v1.4 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle)|支持![＃c5f015](https://placehold.it/15/c5f015/000000?text=+)**（包括地图）** |
| Roomba®e5| [e5]（https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158）| v3.4.42 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle)| ![＃c5f015]（https://placehold.it/15/c5f015/000000?text=+) **支持**（！[＃f03c15](https://placehold.it/15/f03c15/000000?text=+)NOmap）|
| Roomba®e5| [e5]（https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158）| v3.4.42 | [发行说明]（https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle）| ！[＃c5f015]（https://placehold.it/15/c5f015/000000?text=+) **支持**（！[＃f03c15]（https://placehold.it/15/f03c15/000000？ text = +）没有地图）|

关于支持的设备，请帮助我，让我[通过一个问题知道](https://github.com/Zefau/ioBroker.roomba/issues)，无论您的Roomba模型是否受支持！

##频道和国家
成功完成设置后，将创建以下通道和状态：

|频道|文件夹|国家|说明|
| ------- | ------ | ----- | ----------- |
|清洁| -  | -  |关于清洁过程的命令和信息|
|清洁|最后| -  |最后命令发送到机器人|
|清洁|最后|命令|最后一个命令发送到机器人|
|清洁|最后|时间戳|时间戳最后一个命令已发送|
|清洁|最后| datetime |发送了DateTime最后一个命令 |
|清洁|最后|发起者|最后一个命令的启动器|
|清洁|最后|循环|循环|
|清洁|最后|阶段|阶段|
|清洁|最后|错误|表示上次任务期间的错误 |
|清洁|时间表| -  |安排信息|
|清洁|时间表|循环|计划周期（周日至周六）|
|清洁|时间表|小时|小时开始周期（周日至周六）|
|清洁|时间表|分钟|分钟开始周期（周日至周六）|
|清洁| -  |码头|将机器人发送到扩展坞|
|清洁| -  |暂停|暂停当前的清洁过程|
|清洁| -  |简历|恢复当前的清洁过程|
|清洁| -  |开始|开始清洁过程|
|清洁| -  |停止|停止当前的清洁过程|
|设备| -  | -  |设备信息|
|设备|网络| -  |网络信息|
|设备|网络| dhcp |说明DHCP是否已激活|
|设备|网络|路由器|路由器的Mac地址|
|设备|网络| ip | IP地址|
|设备|网络|子网|子网地址|
|设备|网络|网关|网关地址|
|设备|网络| dns1 |主DNS地址|
|设备|网络| dns2 |辅助DNS地址|
|设备|偏好| -  |设置首选项|
|设备|偏好| binPause | **未知** |
|设备|偏好| carpetBoostAuto |自动：Roomba将自动增加其真空功率，以深层清洁地毯。 |
|设备|偏好| carpetBoostHigh |性能模式：Roomba将始终提高其真空度，以最大限度地提高所有地板表面的清洁性能。 |
|设备|偏好| ecoCharge | **未知** |
|设备|偏好| noAutoPasses |一次通行证：Roomba将通过一个清洁通行证覆盖所有区域。 |
|设备|偏好| noPP | **未知** |
|设备|偏好| openOnly | **未知** |
|设备|偏好| schedHold | **未知** |
|设备|偏好| twoPass | Roomba将第二次覆盖所有区域。这可能对有宠物的家庭或偶尔进行深度清洁很有帮助。 |
|设备|版本| -  |版本信息|
|设备|版本| hardwareRev |硬件版本|
|设备|版本| batteryType |电池类型|
|设备|版本| soundVer | **未知** |
|设备|版本| uiSwVer | **未知** |
|设备|版本| navSwVer | **未知** |
|设备|版本| wifiSwVer | **未知** |
|设备|版本| mobilityVer | **未知** |
|设备|版本| bootloaderVer | Bootloader版本|
|设备|版本| umiVer | **未知** |
|设备|版本| softwareVer |软件版本|
|设备| -  | \ _rawData |原始首选项数据为json |
|设备| -  | mac |机器人的Mac地址|
|设备| -  |名字|机器人的名称|
|设备| -  |类型|机器人的类型|
|国家| -  | -  |状态信息|
|国家| -  | \ _连接|连接状态|
|国家| -  |电池|机器人的电池电量|
|国家| -  | binFull |说明bin状态是否已满|
|国家| -  | binInserted |说明bin是否插入 |
|国家| -  |停靠|说明机器人是否停靠|
|国家| -  |信号|信号强度|
|国家| -  |状态|机器人的当前状态|
|统计| -  | -  |统计信息|
|统计|任务| -  |使命统计|
|统计|任务|失败了|清洁作业失败的次数|
|统计|任务|成功|成功清洁工作的数量|
|统计|任务|总计|清洁工作数量|
|统计|时间| -  |时间统计|
|统计|时间| avgMin | **未知** |
|统计|时间| hOnDock | **未知** |
|统计|时间| nAvail | **未知** |
|统计|时间| estCap | **未知** |
|统计|时间| nLithChrg | **未知** |
|统计|时间| nNimhChrg | **未知** |
|统计|时间| nDocks | **未知** |
| -  | -  | refreshedDateTime |上次更新的日期时间|
| -  | -  | refreshedTimestamp |上次更新的时间戳|

##首选项描述_（不完整）_
调用```getPreferences()```时会收到以下有效负载（请参阅https://github.com/koalazak/dorita980#getpreferences）：

|对象|指数|输入|说明| ioBroker State |
| ------ | ----- | ---- | ----------- | -------------- |
| netinfo | -  |对象| Roomba连接的网络信息| -  |
| netinfo | .dhcp |布尔值|说明DHCP是否已激活| device.network.dhcp |
| netinfo | .addr | ip | IP地址| device.network.ip |
| netinfo | .mask | ip |子网地址| device.network.subnet |
| netinfo | .gw | ip |网关地址| device.network.gateway |
| netinfo | .dns1 | ip |主DNS地址| device.network.dns1 |
| netinfo | .dns2 | ip |辅助DNS地址| device.network.dns2 |
| netinfo | .bssid | mac |路由器的Mac地址| device.network.router |
| netinfo | .sec |整数|未知| _（未映射）_ |
| wifistat | -  |对象|未知| -  |
| wifistat | .wifi |整数|未知| _（未映射）_ |
| wifistat | .uap |布尔值|未知| _（未映射）_ |
| wifistat | .cloud |整数|未知| _（未映射）_ |
| wlcfg | -  |对象|未知| -  |
| wlcfg | .sec |整数|未知| _（未映射）_ |
| wlcfg | .ssid |字符串|未知| _（未映射）_ |
| mac | -  | mac | Roomba的Mac地址 -  |
|国家| -  |字符串|未知| -  |
| cloudEnv | -  |字符串|未知| -  |
| svcEndpoints | .svcDeplId |字符串|未知| -  |
| mapUploadAllowed | -  |布尔值|未知| -  |
| localtimeoffset | -  |整数|未知| -  |
| ... | - | ... | ... | - |

关于首选项的描述，请帮助我。如果您知道表中未知的首选项的含义，请允许我[通过一个问题了解他们的意思](https://github.com/Zefau/ioBroker.roomba/issues)！

## Smart Home / Alexa使用ioBroker.javascript集成
###任务完成后通过Telegram发送地图
这需要安装ioBroker适配器ioBroker.telegram（https://github.com/ioBroker/ioBroker.telegram）。

在ioBroker.javascript的“common”文件夹中创建一个脚本，并向其添加以下侦听器：

```
var _fs = require('fs');

/*
 * MISSION END: Send map
 *
 */
var ns = 'roomba.0';
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.val) return;

    // replace variables with state values
    var pos, variable, state, value;
    while (message.indexOf('%') > -1)
    {
        pos = message.indexOf('%');
        variable = message.substring(pos, message.indexOf('%', pos+1)+1);
        state = getState(ns + '.' + variable.replace(/%/g, ''));

        if (state !== null && state.val !== null)
            value = state.val
        else
        {
            log('State ' + variable.replace(/%/g, '') + ' not found!', 'warn');
            value =  '';
        }

        if (typeof value === "boolean") value = value === true ? 'with' : 'no';
        message = message.replace(RegExp(variable, 'gi'), value);
    }

    // console
    log(message);

    // get image
    var img = getState('roomba.0.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile('/tmp/image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: '/tmp/image.png', message: message});
        });
    }
});
```

_2019-02-03在任务开始时发送地图的固定错误_

您可以将变量```message```编辑为您希望通过地图接收的任何通知。您可以使用```%name-of-state%```来检索ioBroker.roomba对象树中的状态值。

##学分
###非官方API
感谢[@koalazak]（https://github.com/koalazak）为[非官方的iRobot Roomba 980 node.js库（SDK）](https://github.com/koalazak/dorita980#readme)。

###图标
<a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a>从<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>制作的图标由<a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>许可</div>

## Changelog

### 1.0.0 (2019-04-xx) [IN DEVELOPMENT]
- bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Refactored retrieval of preferences and added debug mode

### 0.4.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#8](https://github.com/Zefau/ioBroker.roomba/pull/8))

### 0.4.3 (2019-02-10)
- (zefau) Improved compatibility for series 600

### 0.4.2 (2019-02-09)
- (zefau) Bug fixing

### 0.4.1 (2019-02-03)
- (zefau) Support for Compact Mode
- (zefau) Bug fixing

### 0.4.0 (2019-01-08)
- (zefau) Support for e5 and 600 series (due to support by [dorita980](https://github.com/koalazak/dorita980#readme))

### 0.3.x (2019-01-06)
- (zefau) Bug fixed (```Mission saved``` loop)

### 0.3.0 (2019-01-06)
- (zefau) Image / Map of the current cleaning mission will be created
- (zefau) Removed encryption of password

### 0.2.3 (2018-12-03)
- (zefau) Fixed an issue encrypting the password when entered by user (no automated retrieval)

### 0.2.2 (2018-12-02)
- (zefau) Password will now be stored encrypted

Note: If you are coming from an earlier version, you have to (1) empty your settings, (2) save, (3) restart the adapter and (4) enter / fetch credentials again (duo to the fact that password will be stored encrypted now)

### 0.2.1 (2018-11-25)
- (zefau) Fixed / improved automatically retrieving of authentication credentials

### 0.2.0 (2018-11-18)
- (zefau) improved admin interface to automatically retrieve authentication credentials

### 0.1.0 (2018-11-04)
- (zefau) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Zefau <zefau@mailbox.org>

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