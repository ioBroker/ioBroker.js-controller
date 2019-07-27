---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nuki2/README.md
title: ioBroker.nuki2
hash: MUvrkLsECUAuYto5Ul01US986A4CBQvryUKjWKKwE7M=
---
![商标](../../../en/adapterref/iobroker.nuki2/admin/nuki-logo.png)

![安装数量](http://iobroker.live/badges/nuki2-installed.svg)
![稳定的版本](http://iobroker.live/badges/nuki2-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.nuki2.svg)
![特拉维斯CI](https://travis-ci.org/Zefau/ioBroker.nuki2.svg?branch=master)
![下载](https://img.shields.io/npm/dm/iobroker.nuki2.svg)
![Greenkeeper徽章](https://badges.greenkeeper.io/Zefau/ioBroker.nuki2.svg)
![NPM](https://nodei.co/npm/iobroker.nuki2.png?downloads=true)

#ioBroker.nuki2此ioBroker适配器允许控制和监视[Nuki Smart Lock]（https://nuki.io/de/）使用[Nuki Bridge API（v1.8.0,06.03.2019）]（https://developer.nuki.io/page/nuki-bridge -http-api-170/4 /＃heading- introduction）和[Nuki Web API（v1.1.1,30.08.2018）](https://developer.nuki.io/page/nuki-web-api-111/3/)。
**目录**

1. [安装]（＃装置）
   1. [获取API令牌]（＃get-a-api-token）
   2. [回调函数]（＃回调函数）
   3. [国家]（＃状态）
2. [智能家居/ Alexa集成使用ioBroker.javascript]（＃smart-home  -  alexa-integration-using-iobrokerjavascript）
   1. [晚上10点锁门]（＃晚上10点钟锁门）
   2. [让Alexa告知你关于锁定的变化]（＃let-alexa-inform-you-about-lock-changes）
   3. [让电报通知你有关锁定的变化]（＃let-telegram-inform-you-about-lock-changes）
3. [更改日志]（#changelog）
4. [学分]（＃学分）
5. [许可证]（#licence）

##安装
###获取API令牌
如何获取桥接令牌：

1.从网络中的任何浏览器调用```http：// <bridge_ip>：<bridge_port> / auth```
这座桥打开了它的LED
2.在30秒内按下桥接按钮
3.浏览器调用的结果应该是这样的：```

{“token”：“token123”，“success”：true}```

###回调函数
如果正在使用回调函数，则适配器将尝试在保存实例时自动在Nuki桥上设置回调。在回调激活时，Nuki桥将保持最新的Nuki状态（[见下文](#locks-with-nuki-bridge-api)）。
也可以从具有以下URL的任何浏览器手动设置和删除回调：

* set Callback：```http：// <bridge_ip>：<bridge_port> / callback / add？url = http％3A％2F％2F <host_ip>％3A <host_port>％2Fnuki-api-bridge＆token = <bridgeToken> ```
* remove callback：```http：// <bridge_ip>：<bridge_port> / callback / remove？id = <callback_id>＆token = <bridgeToken>```
*列出所有回调：```http：// <bridge_ip>：<bridge_port> / callback / list？token = <bridgeToken>```

＃＃＃ 状态
如果您成功设置了ioBroker.nuki2，则会创建以下通道和状态：

#### Bridges（使用Nuki Bridge API）
将创建一个桥，作为名称为pattern```bridge__<name of bridge>```的设备。将在每个桥中创建以下通道/状态：

|频道|国家|说明|
|:------- |:----- |:----------- |
| -  | \ _连接|指示桥是否连接到Nuki服务器的标志 |
| -  | bridgeId |网桥/服务器的ID |
| -  | bridgeIp |桥的IP地址|
| -  | bridgePort |桥的端口|
| -  | bridgeType |桥梁类型|
| -  | hardwareId |硬件桥的ID（仅限硬件桥）|
| -  |刷新|上次更新的时间戳|
| -  |正常运行时间|桥的正常运行时间在几秒钟内 |
| -  | versFirmware |桥固件版本（仅限硬件桥）|
| -  | versWifi | WiFi模块固件版本（仅限硬件桥接）|
| -  | versApp |桥接应用程序的版本（仅限软件桥）|

#### Locks（使用Nuki Bridge API）
锁将创建为名为pattern```door__<name of door>```的设备。将在每个锁中创建以下通道/状态（使用Nuki Bridge API时）：

|频道|国家|说明|
|:------- |:----- |:----------- |
| -  |行动|触发锁定操作|
| -  |桥| Nuki的桥梁|
| -  | id | Nuki的ID |
| -  |名字| Nuki的名字|
|状态| -  |锁的当前状态|
|状态| batteryCritical ** |国家关键电池水平|
|状态| lockState ** |目前Nuki的锁定状态 |
|状态|锁定** |指示门是否锁定|
|状态|刷新** |上次更新的时间戳|

如果设置回调，_ **标记状态将在Nuki动作上更新

#### Locks（使用Nuki Web API）
锁将创建为名为pattern```door__<name of door>```的设备。将在每个锁中创建以下通道/状态（使用Nuki Web API时）：

|频道|国家|描述（可能的值）|
|:------- |:----- |:----------------------------- |
| -  |行动|触发锁定操作|
| -  | id | Nuki的ID |
| -  |名字| Nuki的名字|
|状态| -  |锁的当前状态|
|状态| batteryCritical |国家关键电池水平|
|状态|关闭|门关闭时的指示（门状态的布尔值）|
|状态| doorState | Nuki的当前门状态 |
|状态| lastAction |最后触发的动作|
|状态| lockState |目前Nuki的锁定状态 |
|状态|锁定|指示门是否锁定|
|状态|模式|智能锁模式<br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}`|
|状态|触发器|状态触发器<br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}`|
|状态|触发器|状态触发器<br> `{“0”：&#39;SYSTEM&#39;，“1”：&#39;MANUAL&#39;，“2”：&#39;BUTTON&#39;，“3”：&#39;AUTOMATIC&#39;，“4”：&#39;WEB&#39;，“5”：&#39;APP&#39;} `|
|配置| -  |锁的配置|
|配置| gpsLatitude |纬度|
|配置| gpsLongitude |经度|
|配置| autoUnlatch |如果在解锁（旋钮）|时应解锁门，则为真 |
|配置| pairingEnabled |如果通过智能锁按钮允许配对，则为真 |
|配置| buttonEnabled |如果智能锁上的按钮已启用，则为True |
|配置| ledEnabled |如果智能锁上的LED已启用，则为真 |
|配置| ledBrightness | LED的亮度：0（关闭）至5（最大）|
|配置| fobAction1 |如果按下按钮一次，则表示按钮操作<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}`|
|配置| fobAction2 |按下按钮两次的按钮动作<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}`|
|配置| fobAction3 |如果按下按钮3次，则表示按钮操作<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}`|
|配置| fobAction3 |如果按下按钮3次，则表示按钮操作<br> `{“0”：&#39;NONE&#39;，“1”：&#39;UNLOCK&#39;，“2”：&#39;LOCK&#39;，“3”：&#39;LOCK_N_GO&#39;，“4”：&#39;INTELLIGENT&#39;}`|
|配置| advertisingMode |广告模式（省电） <br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}`|
|配置| advertisingMode |广告模式（省电） <br> `{“0”：&#39;AUTOMATIC&#39;，“1”：&#39;NORMAL&#39;，“2”：&#39;SLOW&#39;，“3”：&#39;SLOWEST&#39;}`|
|配置| homekitState | homekit状态<br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}`|
|配置| homekitState | homekit状态<br> `{“0”：&#39;UNAVAILABLE&#39;，“1”：&#39;禁用&#39;，“2”：&#39;启用&#39;，“3”：&#39;启用和配对&#39;}`|
|配置| timezoneId |时区id |
| config.advanced | -  |锁的高级配置|
| config.advanced | totalDegrees |校准期间达到的绝对总位置（以度为单位） |
| config.advanced | unlockedPositionOffsetDegrees |偏移改变解锁位置|
| config.advanced | lockedPositionOffsetDegrees |偏移改变锁定位置|
| config.advanced | singleLockedPositionOffsetDegrees |偏移改变单个锁定位置|
| config.advanced | unlockedToLockedTransitionOffsetDegrees |偏移改变了从解锁到锁定的转换发生的位置 |
| config.advanced | singleButtonPressAction |如果按下按钮一次，则执行所需的操作<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}`|
| config.advanced | doubleButtonPressAction |如果按下按钮两次，则执行所需的操作<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}`|
| config.advanced | doubleButtonPressAction |如果按下按钮两次，则执行所需的操作<br> `{“0”：“NO_ACTION”，“1”：“INTELLIGENT”，“2”：“UNLOCK”，“3”：“LOCK”，“4”：“UNLATCH”，“5”：“LOCK_N_GO”， “6”：“SHOW_STATUS”}`|
| config.advanced | batteryType |智能锁中存在的电池类型<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}`|
| config.advanced | batteryType |智能锁中存在的电池类型<br> `{“0”：&#39;ALKALI&#39;，“1”：&#39;累积&#39;，“2”：&#39;LITHIUM&#39;}`|
| config.advanced | automaticBatteryTypeDetection |指示是否启用自动检测电池类型的标志 |
| config.advanced | unlatchDuration |将闩锁保持在解锁位置的持续时间（以秒为单位） |
| config.advanced | autoLockTimeout |几秒钟，直到智能锁在解锁后重新锁定。如果值为0，则不会自动重新锁定 |
|用户| -  |锁定用户|
| users._userName_ | -  |用户_userName_ |
| users._userName_ |类型|授权的类型<br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}`|
| users._userName_ |类型|授权的类型<br> `{“0”：&#39;APP&#39;，“1”：&#39;BRIDGE&#39;，“2”：&#39;FOB&#39;，“3”：&#39;KEYPAD&#39;，“13”：&#39;KEYPAD CODE&#39;，“14”：&#39;Z- KEY&#39;，“15”：&#39;VIRTUAL&#39;}`|
| users._userName_ | id |用户的唯一ID |
| users._userName_ | authId |智能锁授权标识|
| users._userName_ |启用|如果用户已启用，则为True |
| users._userName_ | remoteAllowed |如果auth具有远程访问权限，则为True |
| users._userName_ | lockCount |锁定计数|
| users._userName_ | dateLastActive |最后一个活动日期|
| users._userName_ | dateCreated |创建日期|
| users._userName_ | dateUpdated |更新日期|
| users._userName_ | allowedFromDate |允许从日期|
| users._userName_ | allowedWeekDays |允许的工作日<br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}`|
| users._userName_ | allowedWeekDays |允许的工作日<br> `{64：&#39;星期一&#39;，32：&#39;星期二&#39;，16：&#39;星期三&#39;，8：&#39;星期四&#39;，4：&#39;星期五&#39;，2：&#39;星期六&#39;，1：&#39;星期天&#39;}`|
| users._userName_ | allowedFromTime |允许的时间（从午夜开始的分钟）|
| users._userName_ | allowedUntilTime |允许的时间（从午夜开始的分钟）|

## Smart Home / Alexa使用ioBroker.javascript集成
智能家居中可能集成的一些示例。

###晚上10点锁门
```javascript
var states = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

schedule('0 22 * * *', function()
{
    var status = (getState('nuki2.0.door__home_door.status.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki2.0.door__home_door.action', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__使用锁的lockState替换`nuki2.0.door__home_door.status.lockState`！__您也可以通过`msg`自定义消息。

###让Alexa告知您有关锁更改的信息
这需要ioBroker适配器ioBroker.alexa2（https://github.com/Apollon77/ioBroker.alexa2）。

为了使用Alexa的语音输出，我们定义了一个函数```say```。将以下函数放在ioBroker.javascript的“global”文件夹中的脚本中。重要提示：用您的Alexa ID替换#YOUR ALEXA ID＃（也替换＃）。您可以在ioBroker```alexa2.0.Echo-Devices```的Objects树中找到Alexa ID。

```javascript
/**
 * Say something with Alexa.
 *
 * @param       {string}        message         Message to say
 * @param       {string|array}  alexas          Alexa Device to say the voice message
 * @return      void
 *
 */
function say(message, alexas = '#YOUR ALEXA ID#') // use alexas = ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'] for default voice output from multiple devices (also replace #)
{
    alexas = typeof alexas === 'string' ? [alexas] : alexas;
    alexas.forEach(function(alexa)
    {
        setState('alexa2.0.Echo-Devices.' + alexa + '.Commands.speak', message);
    });
}
```

您可以在ioBroker.javascript中使用此函数来使用Alexa```say('Hello World')```或```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])```来表示来自多个设备的语音输出的短语。

在ioBroker.javascript的“common”文件夹中创建一个脚本，并向其添加以下侦听器。重要信息：将#LOCK STATE ID＃（也替换为＃）替换为持有锁定状态的状态（例如```nuki2.0.door__home_door.status.lockState```）：

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

###让Telegram告知您有关锁更改的信息
这需要ioBroker适配器ioBroker.telegram（https://github.com/iobroker-community-adapters/ioBroker.telegram）。

为了使用Telegram的消息输出，我们定义了一个函数```msg```和```messenger```。将以下函数放在ioBroker.javascript的“global”文件夹中的脚本中：

```javascript
/**
 * Send something via telegram.
 *
 * @param       {string}        message         Message to print
 * @param       {string|array}  receiver        Users to send the message to
 * @return      void
 *
 */
function msg(message, receiver = 'ALL')
{
    if (receiver == 'ALL')
        messenger(message);

    else
    {
        receiver = typeof receiver == 'string' ? [receiver] : receiver;
        receiver.forEach(function(user)
        {
            messenger(message, user);
        });
    }
}
```

```javascript
/**
 * Sends a message / text.
 *
 * @param   {string}            content         Message to send
 * @param   {string}            user            (optional) Specific user to send the message to (defaults to all registered users)
 * @return  void
 *
 */
function messenger(content, user = '')
{
    var config = {
        text: content,
        parse_mode: 'HTML',
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    sendTo('telegram', user ? Object.assign({user: user}, config) : config);
}
```

您可以在ioBroker.javascript中使用此函数通过```msg('Hello World')```（对所有用户）或```msg('Hello World', 'Zefau')```（对特定用户）向Telegram发送任何内容。

在ioBroker.javascript的“common”文件夹中创建一个脚本，并向其添加以下侦听器。重要信息：将#LOCK STATE ID＃（也替换为＃）替换为持有锁定状态的状态（例如```nuki2.0.door__home_door.status.lockState```）：

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

注意：如果同时使用Alexa和Telegram脚本，则只能为这两个操作定义一个侦听器：

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```

##学分
感谢[@ Mik13]（https://github.com/Mik13）用于[Nuki Bridge API实现](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api)。

来自<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>的<a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> （[Essential Set]（https://www.flaticon.com/packs/essential-set-2））和<a href="https://www.freepik.com/" title="Freepik">Freepik</a> （[门]](https://www.flaticon.com/packs/doors)）制作的图标由<a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>许可

## Changelog

### 1.0.0 (2019-05-xx) [IN DEVELOPMENT]
- (Zefau) support for hashed token for hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-180/4/#heading--token) in the [nuki-bridge-api](https://github.com/Mik13/nuki-bridge-api/pull/9)
- (Zefau) bump to stable release

### 0.9.13 (2019-07-20)
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 0.9.12 (2019-05-16)
- (Zefau) fixed an issue causing the same callback set multiple times (see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9#issuecomment-493148883))

### 0.9.11 (2019-05-13)
- (Zefau) added info-message when setting refresh rate to less than 10 seconds

### 0.9.10 (2019-05-10)
- (Zefau) added states to reflect current callbacks set on the Nuki Bridge as well as action to delete the callbacks
- (Zefau) updated dependency of `nuki-bridge-api` to v1.5.0

### 0.9.9 (2019-05-05)
- (Zefau) updated dependency of `nuki-bridge-api` to v1.4.0

### 0.9.8 (2019-05-05)
Thanks to [@systemofapwne](https://github.com/systemofapwne) for testing and identifying quite a few bugs.

- (Zefau) added delay between requests / actions applied on the Nuki Bridge (to prevent overload, see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))
- (Zefau) fixed an issue causing the adapter to crash when polling was enabled, but Web API is not used (see [#10](https://github.com/Zefau/ioBroker.nuki2/issues/10))

### 0.9.7 (2019-05-05)
- (Zefau) added verification if callback URL is already added on Nuki Bridge (see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))

### 0.9.6 (2019-05-03)
- (Zefau) added Web Adapter as dependency
- (Zefau) add warning when opening web / log view but Nuki Web API has not been setup
- (Zefau) removed empty folders when Nuki Web API has not been setup 
- (Zefau) fixed an issue with Webhook when time for refreshing all settings was set ([#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))

### 0.9.4 / 0.9.5 (2019-03-22)
- (Zefau) Useless versions to fix incorrect configuration in `io-package.json`

### 0.9.3 (2019-03-22)
- (Zefau) Limited log retrieval to 1000 entries

### 0.9.2 (2019-02-11)
- (Zefau) Updated dependency

### 0.9.1 (2019-02-10)
- (Zefau) Added Web Interface to view logs

### 0.9.0 (2019-02-09)
- (Zefau) Using both Bridge API and Web API
- (Zefau) Support for multiple bridges
- (Zefau) Support for discovery within admin panel
- (Zefau) Additional states for bridges and better separation between software / hardware bridge
  - retrieve the basic and advanced configuration from your lock
  - retrieve all users having access to your lock

## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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