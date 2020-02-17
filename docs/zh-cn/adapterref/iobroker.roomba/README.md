---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: 4QSunjs5xSBvOiA0U5aoHQDA8EhXC1dTvTjqLGNsTDk=
---
![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/roomba-installed.svg)
![稳定版](http://iobroker.live/badges/roomba-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.roomba.svg)
![特拉维斯CI](https://travis-ci.org/Zefau/ioBroker.roomba.svg?branch=master)
![资料下载](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![NPM](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

：heavy_exclamation_mark：| **开发已移至[社区](https://github.com/iobroker-community-adapters/ioBroker.roomba)。** ------------ | -------------

________________________

![商标](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

＃ioBroker.roomba将iRobot Roomba连接到ioBroker。
基于dorita980库https://github.com/koalazak/dorita980#readme

**目录**

1. [功能]（＃features）
2. [安装]（＃installation）
3. [设置说明]（＃setup-instructions）
4. [支持的Roomba /固件版本]（＃supported-roombas--firmware-versions）
5. [通道和状态]（＃channels--states）
6. [首选项描述（不完整）]（＃description-of-preferences-incomplete）
7. [使用ioBroker.javascript进行智能家居/ Alexa集成]（＃smart-home--alexa-integration-using-iobrokerjavascript）
8. [变更日志]（＃changelog）
9. [学分]（＃credits）
10. [许可证]（＃license）

＃＃ 特征
此适配器随附以下功能：

-__发送命令__（“开始”，“停止”，“继续”，“暂停”，“停靠”）到您的Roomba
-检索__设备状态__，例如电池，对接的，已满/已插入的垃圾箱（有关完整列表，请参见[通道和状态]（＃channels--状态））
-检索__device configuration__，例如首选项，网络或时间表设置（有关完整列表，请参见[Channels and States]（＃channels--states））
-检索__device的统计信息__，例如总任务数，扩展坞的工作时间等。（有关完整列表，请参见[Channels and States]（＃channels--states））
-检索有关__当前任务__的信息（清理Roomba时），例如开始和结束时间，总运行时间，清理的平方米等。（仅在支持的Roomba上，请参阅[支持的Roomba /固件版本]（＃supported-roombas --firmware-versions））
-__根据收到的任务数据绘制地图__（仅在支持的Roomba上）
-__Web Interface__，显示当前任务以及先前/已存档任务的状态和地图：

  ![Roomba介面](../../../en/adapterref/iobroker.roomba/img/roomba.interface.png)

##安装
ioBroker.roomba需要[帆布](https://www.npmjs.com/package/canvas)才能绘制Roomba任务的地图。 ioBroker将尝试通过ioBroker.roomba安装来安装此依赖项。

但是，您可能必须使用以下命令安装canvas的软件包依赖项（以及canvas本身）：

### Linux
```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

此外，在ioBroker.roomba目录__（`/opt/iobroker/node_modules/iobroker.roomba`）中运行以下命令__：

```
sudo npm install canvas --unsafe-perm=true
```

### Windows
1.确保您通过安装了“ node-gyp”

```
npm install -g node-gyp
```

2.确保已通过安装了构建基础

```
npm install --global --production windows-build-tools
```

3.下载GTK 2（用于[Win32]（http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip）或[Win64]（http： //ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip））并将其解压缩（例如，解压缩到“ C：\ path \ to \ GTK2”）
4.运行

```
node-gyp rebuild --GTK_Root=C:\path\to\GTK2
```

5.从iobroker.roomba文件夹中安装画布

```
cd C:\path\to\iobroker\node_modules\iobroker.roomba
npm install canvas
```

有关详细信息，请参见https://github.com/Automattic/node-canvas/wiki/Installation:-Windows。

##安装说明
###自动设置
按照ioBroker.roomba管理面板中的说明自动设置ioBroker.roomba。

**注意**：身份验证凭据与您在智能手机应用中使用的身份凭据不同！

1.确保ioBroker.roomba适配器已启动。
2.确保您的机器人在Home Base上并且已打开电源（绿灯亮）。
3.然后，按住机器人上的HOME按钮，直到发出一系列音调（约2秒）。
4.释放按钮，您的机器人将闪烁WIFI灯。
5.然后回到此处，按按钮以检索IP和凭据。

如果自动过程无法检索您的凭据，请使用手动设置。

###手动设置
对于手动设置，请参见https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password。

##支持的Roomba /固件版本
###支持的固件版本
|软件版本|固件信息|支持|
| ---------------- | ------------- | --------- |
| v1.4 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle)| ![＃c5f015]（https://placehold.it/15/c5f015/000000?text=+）**受支持（！[＃c5f015](https://placehold.it/15/c5f015/000000?text=+)含地图）** |
| v3.2.xx | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)| ![＃c5f015]（https://placehold.it/15/c5f015/000000?text=+）**支持**（！[＃f03c15](https://placehold.it/15/f03c15/000000?text=+)NO地图）|
| v3.2.xx | [发行说明]（https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle）| ！[＃c5f015]（https://placehold.it/15/c5f015/000000?text=+）**支持**（！[＃f03c15]（https://placehold.it/15/f03c15/000000？ text = +）没有地图）|

###支持的Roomba
|意甲型号_（不完整）_ |软件版本|固件信息|支持|
| ----- | --------------------- | ---------------- | ------------- | --------- |
| Roomba®6xx | 605、606、612、616、671、676、680、696 | v3.2.40 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)| （最有可能）|
| Roomba®7xx | 774，785，| -| | ![＃f03c15](https://placehold.it/15/f03c15/000000?text=+)_Model不提供Wifi连接，因此不提供支持 |
| Roomba®8xx | 880、886、891、896 | -| [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)| （最有可能）|
| Roomba®8xx | [895]（（https://forum.iobroker.net/post/245274））| v3.2.10 / 40/69 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle)| ![＃c5f015]（https://placehold.it/15/c5f015/000000?text=+）**支持**（！[＃f03c15](https://placehold.it/15/f03c15/000000?text=+)NO地图）|
| Roomba®9xx | 965、981 | -| [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle)| （最有可能）|
| Roomba®9xx | [960]（https://forum.iobroker.net/user/jb_sullivan），[966]（https://forum.iobroker.net/user/thomaslpz），980 | v2.4.6-3 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle)| ![＃c5f015](https://placehold.it/15/c5f015/000000?text=+)**支持（包括地图）** |
| Roomba®i | [i7（7150）]（https://forum.iobroker.net/post/240589），i7 +（7550）| v1.4 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle)| ![＃c5f015](https://placehold.it/15/c5f015/000000?text=+)**支持（包括地图）** |
| Roomba®e5 | [e5]（https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158）| v3.4.42 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle)| ![＃c5f015]（https://placehold.it/15/c5f015/000000?text=+）**支持**（！[＃f03c15](https://placehold.it/15/f03c15/000000?text=+)NO地图）|
| Roomba®s | [S9 +]（https://github.com/Zefau/ioBroker.roomba/issues/34）| v3.2.4 | [发行说明](https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle)| ![＃c5f015](https://placehold.it/15/c5f015/000000?text=+)**支持（包括地图）** |
| Roomba®s | [S9 +]（https://github.com/Zefau/ioBroker.roomba/issues/34）| v3.2.4 | [发行说明]（https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle）| ！[＃c5f015]（https://placehold.it/15/c5f015/000000?text=+）**受支持（包括地图）** |

请就支持的设备向我提供帮助，无论您的Roomba型号是否支持，请让我[通过问题知道](https://github.com/Zefau/ioBroker.roomba/issues)！

##频道和状态
成功设置后，将创建以下通道和状态：

|频道|文件夹|州|描述 |
| ------- | ------ | ----- | ----------- |
|清洁| -| -|有关清洁过程的命令和信息|
|清洁|最后-|最后发送给机器人的命令 |
|清洁|最后命令最后命令发送给机器人 |
|清洁|最后时间戳|时间戳最后一条命令已发送|
|清洁|最后日期时间| DateTime最后一个命令已发送|
|清洁|最后发起人|最后命令的发起者|
|清洁|最后循环|循环|
|清洁|最后相相|
|清洁|最后错误指示上一次任务期间发生错误|
|清洁|时间表| -|时间表信息|
|清洁|时间表|循环|时间表周期（星期日至星期六）|
|清洁|时间表|小时小时开始循环（星期日至星期六）|
|清洁|时间表|分钟|分钟开始循环（星期日至星期六）|
|清洁| -|码头|将机器人发送到扩展坞|
|清洁| -|暂停|暂停当前的清洁过程|
|清洁| -|简历|恢复当前的清洁过程|
|清洁| -|开始开始清洁过程|
|清洁| -|停止|停止当前的清洁过程|
|设备| -| -|设备信息|
|设备|网络-|网络信息|
|设备|网络dhcp |说明是否激活了DHCP |
|设备|网络路由器|路由器的Mac地址|
|设备|网络ip | IP地址 |
|设备|网络子网|子网地址|
|设备|网络网关|网关地址|
|设备|网络dns1 |主DNS地址|
|设备|网络dns2 |辅助DNS地址|
|设备|偏好| -|设置首选项|
|设备|偏好| binPause | **未知** |
|设备|偏好| carpetBoostAuto |自动：Roomba将自动提高其真空能力，以清洁深层地毯。 |
|设备|偏好| carpetBoostHigh |性能模式：Roomba始终会提高真空度，以最大程度地清洁所有地板表面。 |
|设备|偏好| ecoCharge | **未知** |
|设备|偏好| noAutoPasses |一张通行证：Roomba只需一张清洁通行证即可覆盖所有区域。 |
|设备|偏好| noPP | **未知** |
|设备|偏好| openOnly | **未知** |
|设备|偏好| schedHold | **未知** |
|设备|偏好| twoPass | Roomba将第二次覆盖所有区域。这在有宠物的家中或偶尔进行深层清洁时可能会有所帮助。 |
|设备|版本| -|版本信息|
|设备|版本| hardwareRev |硬件修订|
|设备|版本|电池类型|电池类型 |
|设备|版本| soundVer | **未知** |
|设备|版本| uiSwVer | **未知** |
|设备|版本| navSwVer | **未知** |
|设备|版本| wifiSwVer | **未知** |
|设备|版本| bilityVer | **未知** |
|设备|版本| bootloaderVer |引导程序版本|
|设备|版本| umiVer | **未知** |
|设备|版本|软件版本|软件版本|
|设备| -| \ _rawData |原始偏好数据为json |
|设备| -| mac |机器人的Mac地址|
|设备| -|名称|机器人名称|
|设备| -|类型机器人类型|
|州| -| -|状态信息 |
|州| -| \ _connected |连接状态 |
|州| -|电池|机器人的电池电量|
|州| -| binFull |陈述垃圾箱状态是否已满|
|州| -| binInserted |说明是否插入了垃圾箱|
|州| -|对接|声明机器人是否对接|
|州| -|信号|信号强度|
|州| -|状态|机器人的当前状态|
|统计-| -|统计信息|
|统计任务| -|任务统计 |
|统计任务|失败清洁作业失败的数量|
|统计任务|成功成功清洁工作的数量|
|统计任务|总计清洁工作数量|
|统计时间| -|时间统计|
|统计时间| avgMin | **未知** |
|统计时间| HonDock | **未知** |
|统计时间| nAvail | **未知** |
|统计时间| estCap | **未知** |
|统计时间| nLithChrg | **未知** |
|统计时间| nNimhChrg | **未知** |
|统计时间| nDocks | **未知** |
| -| -| refreshedDateTime |最后更新的日期时间|
| -| -| refreshedTimestamp |最后更新的时间戳|

##首选项说明_（不完整）_
调用```getPreferences()```时，将收到以下有效负载（请参阅https://github.com/koalazak/dorita980#getpreferences）：

|对象索引|类型描述ioBroker州|
| ------ | ----- | ---- | ----------- | -------------- |
|网信| -|对象Roomba连接的网络信息| -|
|网信| .dhcp |布尔|说明是否激活了DHCP | device.network.dhcp |
|网信| .addr | ip | IP地址device.network.ip |
|网信| .mask | ip |子网地址| device.network.subnet |
|网信| .gw | ip |网关地址| device.network.gateway |
|网信| .dns1 | ip |主DNS地址| device.network.dns1 |
|网信| .dns2 | ip |辅助DNS地址| device.network.dns2 |
|网信| .bssid | mac |路由器的Mac地址| device.network.router |
|网信| .sec |整数|未知_（未映射）_ |
| wifistat | -|对象未知-|
| wifistat | .wifi |整数|未知_（未映射）_ |
| wifistat | .uap |布尔|未知_（未映射）_ |
| wifistat | .cloud |整数|未知_（未映射）_ |
| wlcfg | -|对象未知-|
| wlcfg | .sec |整数|未知_（未映射）_ |
| wlcfg | .ssid |字符串未知_（未映射）_ |
| mac | -| mac | Roomba的Mac地址| -|
|国家| -|字符串未知-|
| cloudEnv | -|字符串未知-|
| svc端点| .svcDeplId |字符串未知-|
| mapUploadAllowed | -|布尔|未知-|
| localtimeoffset | -|整数|未知-|
| ... | - | ... | ... | - |

请帮我有关首选项的描述。如果您知道表中表述为未知的首选项的含义，请让我[通过问题了解其含义](https://github.com/Zefau/ioBroker.roomba/issues)！

##使用ioBroker.javascript的Smart Home / Alexa集成
###任务完成后通过电报发送地图
这需要安装ioBroker适配器ioBroker.telegram（https://github.com/ioBroker/ioBroker.telegram）。

在ioBroker.javascript的“ common”文件夹中创建一个脚本，并向其中添加以下侦听器：

```javascript
var _fs = require('fs');

/*
 * MISSION END: Send map
 *
 */
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";
var ns = 'roomba.0';
var imagePath = 'tmp/';

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.state || !obj.state.val) return;

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
    var img = getState(ns + '.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile(imagePath + 'image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: imagePath + 'image.png', message: message});
        });
    }
});
```

_2019-05-04修复了无法发送地图的错误_

您可以将变量```message```修改为要与地图一起接收的任何通知。您可以使用```%name-of-state%```检索ioBroker.roomba对象树中的状态值。

##积分
###非官方API
感谢[@@ koalazak]（https://github.com/koalazak）用于[非官方iRobot Roomba 980 node.js库（SDK）](https://github.com/koalazak/dorita980#readme)。

###图标
<a href="https://www.flaticon.com/authors/iconnice" title="圣像">Iconnice</a>从<a href="https://www.flaticon.com/" title="平面图标">www.flaticon.com</a>制作的图标<a href="https://www.flaticon.com/authors/iconnice" title="圣像">已获</a> <a href="http://creativecommons.org/licenses/by/3.0/" title="知识共享BY 3.0" target="_blank">CC 3.0 BY</a>许可</div>

## Changelog

### 1.1.0 (2020-02-06)
- (Zefau) added support to change schedule (see [#36](https://github.com/Zefau/ioBroker.roomba/issues/36))
- (Zefau) fixed bug with state `commands.last.dateTime` having incorrect value `NaN`
- (Zefau) fixed error message shown when robot is on a mission but map is not given

### 1.1.0 (2020-02-06)
- (Zefau) acknowledged support for S9+ (see [#34](https://github.com/Zefau/ioBroker.roomba/issues/34))

### 1.0.7 (2019-09-03)
- (Zefau) fixed bugs occurring when Roomba is on a mission
- (Zefau) added additional debug logging

### 1.0.6 (2019-08-19)
- (Zefau) added loading screen to web interface

### 1.0.5 (2019-08-18)
- (Zefau) fixed failing secure connection
- (Zefau) fixed broken credential retrieval
- (Zefau) fixed broken refresh

### 1.0.4 (2019-08-15)
- (Zefau) fixed password retrieval
- (Zefau) fixed German translations
- (Zefau) added donations button
- (Zefau) updated `dorita980` dependency to v3.1.3
- (Zefau) updated `canvas` dependency to v2.6.0

### 1.0.3 (2019-07-23)
- (Zefau) fixed bug _uncaught exception: Cannot read property 'x' of undefined_

### 1.0.2 (2019-07-20)
- (Zefau) reworked placing home icon ([#23](https://github.com/Zefau/ioBroker.roomba/issues/23))
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 1.0.1 (2019-05-15)
- (Zefau) fixed display error in Chrome ([#19](https://github.com/Zefau/ioBroker.roomba/issues/19#issuecomment-492963244))
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#18](https://github.com/Zefau/ioBroker.roomba/pull/18))
- (Zefau) updated dependencies

### 1.0.0 (2019-05-04)
- (zefau) No changes, only bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) Added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Zefau) Refactored retrieval of preferences and added debug mode

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