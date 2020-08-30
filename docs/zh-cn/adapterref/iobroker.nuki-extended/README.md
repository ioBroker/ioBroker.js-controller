---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki扩展
hash: P4wBQswyXDfM+blJgnDZpc+52jPqKyTvebuLngSFV1M=
---
![商标](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/nuki-extended-installed.svg)
![稳定版](http://iobroker.live/badges/nuki-extended-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![自上次发行以来提交](https://img.shields.io/github/commits-since/Zefau/ioBroker.nuki-extended/latest.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)
![NPM](https://nodei.co/npm/iobroker.nuki-extended.png?downloads=true)

＃ioBroker.nuki-extended这个ioBroker适配器（以前为ioBroker.Nuki2）允许控制和监视[Nuki Smart Lock]（https://nuki.io/de/smart-lock/）和/或[Nuki Opener]（https://nuki.io/de/opener/）同时使用[Nuki Bridge API （v1.9.0，06.05.2019）]（https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction）和[Nuki Web API（v1。 2.0，31.05.2019）](https://developer.nuki.io/page/nuki-web-api-111/3/)。
[![Travis CI]（https://travis-ci.com/Zefau/ioBroker.nuki-extended.svg?branch=master）](https://travis-ci.com/Zefau/ioBroker.nuki-extended)

**目录**

1. [功能]（＃features）
2. [安装]（＃installation）
   1. [Nuki Bridge API]（＃nuki-bridge-api）
   2. [Nuki Web API]（＃nuki-web-api）
3. [通道和状态]（＃channels--states）
4. [使用ioBroker.javascript进行智能家居/ Alexa集成]（＃smart-home--alexa-integration-using-iobrokerjavascript）
   1. [晚上晚上10点锁门]（晚上10点＃lock-door-at）
   2. [让Alexa通知您有关锁的更改]（＃let-alexa-告知您有关锁的更改）
   3. [让电报通知您有关锁的更改]（＃let-telegram-告知您有关锁的更改）
   4. [让Alexa和Telegram通知您有人通过Opener振铃]（＃let-telegram和alexa通知您有关有人通过opener振铃）
5. [变更日志]（＃changelog）
6. [学分]（＃credits）
7. [许可证]（＃license）

＃＃ 特征
-支持Nuki Smartlock和Nuki Opener
-支持Nuki Bridge API和Nuki Web API
-~~在硬件桥接器上支持哈希令牌（请参阅https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
-如果在Nuki Bridge API上执行的操作失败（例如由于桥接错误503（请参阅https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau）
-如果在Nuki Bridge API上应用的操作失败（不使用Nuki Web API时），请重试
-选择定期同步而不是使用Bridge API回调（由于硬件Bridge可能会延迟）
-通过Nuki Bridge API收到回调时，刷新Nuki Web API的所有状态
-检索Nuki Smartlock和Nuki Opener的授权用户（请参阅下面的[频道和国家/地区]（＃general-information））
-检索Nuki Smartlock和Nuki Opener的配置（请参见下面的[Channels＆States]（＃general-config））
-检索设置Nuki通知（请参见下面的[频道和状态]（＃users））
-Web界面，显示Nuki Smartlock和Nuki Opener的最近事件：

  ![Nuki扩展Web界面](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

##安装
### Nuki Bridge API
如何获取硬件桥令牌（不适用于软件桥）：

1.从网络中的任何浏览器调用“ http：// <bridge_ip>：<bridge_port> / auth`”。桥打开其LED。
2.在30秒内按下电桥的按钮。
3.浏览器调用的结果应如下所示：

```
{
   "token":"token123",
   "success":true
}
```

4.在nuki扩展适配器中使用生成的令牌。

### Nuki Web API
请执行以下操作以使用Nuki Web API：

1.通过https://web.nuki.io/de/#/admin/web-api检索令牌
2.在nuki扩展适配器中使用此令牌
3.确保您的Nuki设备已发布在Nuki Web API上（通过“激活Nuki Web”设置使用智能手机应用）

##频道和状态
如果您成功设置了ioBroker.nuki-extended的设置，则会创建以下通道和状态：

###桥（使用Nuki Bridge API）
将使用名称模式```bridge__<name of bridge>```创建一个网桥作为设备。在每个网桥中将创建以下通道/状态：

|频道|州|描述 |
|:------- |:----- |:----------- |
| -| \ _connected |指示网桥是否已连接到Nuki服务器的标志。 |
| -|名称|网桥/服务器的名称|
| -| bridgeId |网桥/服务器的ID |
| -| bridgeIp |桥的IP地址|
| -| bridgePort |桥梁的港口|
| -| bridgeType |桥的类型 |
| -| hardwareId |硬件桥的ID（仅硬件桥）|
| -|刷新最后更新的时间戳|
| -|正常运行时间桥梁的正常运行时间（以秒为单位）|
| -| versFirmware |网桥固件的版本（仅硬件网桥）|
| -| versWifi | WiFi模块固件的版本（仅硬件桥）|
| -| versApp |桥应用程序的版本（仅软件桥）|
|回调| -|桥的回调|
|回调|列表|回调列表|
| callbacks._callbackId_ | \ _删除|删除回调 |
| callbacks._callbackId_ |网址|回调的URL |

＃＃＃ 一般信息
|频道|州|描述 |
|:------- |:----- |:----------- |
| -|连接|适配器连接状态|
| -| bridgeApiSync |指示是否激活了通过Bridge API的同步|
| -| bridgeApiLast |最后Bridge API同步的时间戳|
| -| webApiSync |指示是否激活了通过Web API的同步。 |
| -| webApiLast |上次Web API同步的时间戳|
|通知| -|通知|
| notifications._notificationIndex_ | -| -|
| notifications._notificationIndex_.settings | -|通知设置|
| notifications._notificationIndex_.settings._settingsIndex_ | -| -|
| notifications._notificationIndex_.settings._settingsIndex_ | authIds |一组身份验证ID，用于过滤对某些用户或键盘的推送通知。如果没有为所有用户和键盘触发条目推送通知|
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | Smartlock ID（如果未设置）启用帐户的所有Smart Lock进行推送通知|
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents |一组应触发推送通知的集合：锁定，解锁，解锁，lockngo，打开，响铃，门磁，警告，smartlock |
| notifications._notificationIndex_ |语言|推送消息的语言|
| notifications._notificationIndex_ | lastActiveDate |上次有效日期|
| notifications._notificationIndex_ | notificationId |通知|的唯一ID。 |
| notifications._notificationIndex_ | os |作业系统<br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}`|
| notifications._notificationIndex_ | pushId | Webhook的推送ID或POST URL |
| notifications._notificationIndex_ | referenceId |参考ID，标识外部系统的ID |
| notifications._notificationIndex_ |状态|当前激活状态<br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}`|
| notifications._notificationIndex_ |状态|当前激活状态<br> `{“ 0”：&#39;INIT&#39;，“ 1”：&#39;ACTIVE&#39;，“ 2”：&#39;FAILED&#39;}`|

### Smartlocks和Opener（使用Nuki Bridge API）
将创建一个名为```door__<name of door>```的锁作为设备。在每个锁中（使用Nuki Bridge API时）将创建以下通道/状态：

|频道|州|描述 |
|:------- |:----- |:----------- |
| -| \ _ACTION |在锁上触发操作|
| -| id | Nuki的ID |
| -|名称| Nuki的名称|
| -|类型设备类型 |
| -| bridgeId | Nuki的网桥ID |
|状态| -|锁的当前状态 |
|状态| batteryCritical ** |临界电池电量水平 |
|状态| lockState ** | Nuki的当前锁定状态 |
|状态|锁定** |指示门是否锁好 |
|状态|刷新** |最后更新的时间戳|

如果设置了回调，则_ **标记的状态将在Nuki操作上更新_

### Smartlocks和Opener（使用Nuki Web API）
将创建一个名为```door__<name of door>```的锁作为设备。在每个锁中（使用Nuki Web API时）将创建以下通道/状态：

|频道|州|描述（可能的值）|
|:------- |:----- |:----------------------------- |
| -| \ _ACTION |在锁上触发操作|
| -| id | Nuki的ID |
| -|名称| Nuki的名称|
| -|类型设备类型 |
| -|日志| Nuki的日志/历史|
| -| bridgeId | Nuki的网桥ID |

####信息
|频道|州|描述（可能的值）|
|:------- |:----- |:----------------------------- |
|信息| -|附加信息|
|信息| accountId |帐户ID |
|信息| authId |授权ID |
|信息|最喜欢的最喜欢的标志 |
|信息| firmwareVersion |固件版本|
|信息| hardwareVersion |硬件版本|
|信息| operationId |操作ID-如果已设置，则设备将被锁定以进行其他操作|
|信息| serverState |服务器状态<br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}`|
|信息| adminPinState |管理员密码状态<br> `{“ 0”：&#39;OK&#39;，“ 1”：&#39;MISSING&#39;，“ 2”：&#39;INVALID&#39;}`|
|信息| virtualDevice |指示虚拟Smart Lock |的标志。 |
|信息| dateCreated |创建日期|
|信息| dateUpdated |更新日期|

####状态
|频道|州|描述（可能的值）|
|:------- |:----- |:----------------------------- |
|州| -|锁的当前状态 |
|州|电池严重|临界电池电量水平 |
|州|关闭指示门是否关闭（doorState的布尔值）|
|州| doorState | Nuki的当前门国|
|州| lastAction |最后触发动作|
|州| lockState | Nuki的当前锁定状态 |
|州|锁定指示门是否锁好 |
|州|模式智能锁模式<br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}`|
|州| ringToOpenTimer |剩余时间开放时间|
|州|触发状态触发<br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}`|
|州|触发状态触发<br> `{“ 0”：“ SYSTEM”，“ 1”：“ MANUAL”，“ 2”：“按钮”，“ 3”：“ AUTOMATIC”，“ 4”：“ WEB”，“ 5”：“ APP”} `|

####常规配置
|频道|州|描述（可能的值）|
|:------- |:----- |:----------------------------- |
|配置| -|配置|
|配置| advertisingMode |广告模式（省电） <br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}`|
|配置|自动解锁|如果应在解锁时将门解锁，则为真。 |
|配置| buttonEnabled |如果启用了智能锁上的按钮，则为true。 |
|配置|能力|该功能指示是否可以通过App，RTO或同时通过两者打开门。 |
|配置| fobAction1 |如果按一次按钮，则为遥控操作<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}`|
|配置| fobAction2 |如果按两次按钮，则为遥控钥匙操作<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}`|
|配置| fobAction3 |如果按下按钮3次，则显示FOB动作<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}`|
|配置| fobAction3 |如果按下按钮3次，则显示FOB动作<br> `{“ 0”：&#39;NONE&#39;，“ 1”：&#39;UNLOCK&#39;，“ 2”：&#39;LOCK&#39;，“ 3”：&#39;LOCK_N_GO&#39;，“ 4”：&#39;智能&#39;}} |
|配置|配对|如果智能钥匙与智能钥匙配对，则为true |
|配置| gpsLatitude |纬度|
|配置| homekitState |家庭套件状态<br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}`|
|配置| homekitState |家庭套件状态<br> `{“ 0”：&#39;UNAVAILABLE&#39;，“ 1”：&#39;DISABLED&#39;，“ 2”：&#39;ENABLED&#39;，“ 3”：&#39;ENABLED＆PAIRED&#39;}`|
|配置|配对如果键盘与smartlock配对，则为true。 |
|配置| led亮度| LED的亮度：0（关闭）至5（最大）|
|配置| ledEnabled |如果启用了智能锁上的LED，则为true。 |
|配置|名称|新用户的Smartlock名称|
|配置| operatingMode |开瓶器的操作模式|
|配置| pairingEnabled |如果通过smartlock按钮允许配对，则为true。 |
|配置| singleLock |如果智能锁只能锁定一次（而不是两次），则为true。 |
|配置| timezoneId |时区ID |
|配置| timezoneOffset |时区偏移量（以分钟为单位）|

####高级配置
|频道|州|描述（可能的值）|
|:------- |:----- |:----------------------------- |
| advancedConfig | -|高级配置|
| advancedConfig | autoLockTimeout |秒，直到智能锁在解锁后重新锁定自身为止。如果值为0，则不会自动重新锁定。 |
| advancedConfig | automaticBatteryTypeDetection |指示是否启用了自动检测电池类型的标志 |
| advancedConfig |电池类型|智能锁中存在的电池类型<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}`|
| advancedConfig | doubleButtonPressAction |所需的操作，如果两次按下按钮<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}`|
| advancedConfig | doubleButtonPressAction |所需的操作，如果两次按下按钮<br> `{“ 0”：“ NO_ACTION”，“ 1”：“智能”，“ 2”：“解锁”，“ 3”：“ LOCK”，“ 4”：“解锁”，“ 5”：“ LOCK_N_GO”， “ 6”：“ SHOW_STATUS”}`| |
| advancedConfig | lngTimeout |锁定“ n”的超时时间（以秒为单位）|
| advancedConfig | singleButtonPressAction |所需的操作（如果按下按钮一次） <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}`|
| advancedConfig | singleButtonPressAction |所需的操作（如果按下按钮一次） <br> `{“ 0”：“ NO_ACTION”，“ 1”：“智能”，“ 2”：“解锁”，“ 3”：“ LOCK”，“ 4”：“解锁”，“ 5”：“ LOCK_N_GO”， “ 6”：“ SHOW_STATUS”}`| |
| advancedConfig | singleLockedPositionOffsetDegrees |改变单个锁定位置的偏移量 |
| advancedConfig | totalDegrees |校准期间达到的绝对总位置（以度为单位）|
| advancedConfig | unlatchDuration |将闩锁保持在解锁位置的持续时间（以秒为单位）|
| advancedConfig | unlockedPositionOffsetDegrees |偏移量可更改解锁位置|
| advancedConfig | unlockedToLockedTransitionOffsetDegrees |偏移量会更改从解锁到锁定的过渡发生的位置|

#### Opener Advanced Config
|频道|州|描述（可能的值）|
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | -|开瓶器配置|
| openerAdvancedConfig | intercomId |连接的对讲机的数据库ID。 |
| openerAdvancedConfig | busModeSwitch |在数据和模拟模式之间切换的方法<br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}`|
| openerAdvancedConfig | shortCircuitDuration | BUS模式切换的短路持续时间（毫秒）|
| openerAdvancedConfig | electricStrikeDelay |电击激活的延迟，以毫秒为单位（锁定操作3-电击激活后）|
| openerAdvancedConfig | randomElectricStrikeDelay |随机的ElectricStrikeDelay（范围3000-7000毫秒），以模拟内部触发电击的人|
| openerAdvancedConfig | electricStrikeDuration |电击致动的持续时间（毫秒）（锁定动作3-电击致动-）|
| openerAdvancedConfig | disableRtoAfterRing |振铃后禁用RTO的标志|
| openerAdvancedConfig |门铃抑制|门铃抑制模式<br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}`|
| openerAdvancedConfig |门铃抑制|门铃抑制模式<br> `{“ 0”：“从不”，“ 1”：“ ALWAYS”，“ 2”：“ RTO”，“ 3”：“ CONTINUOUS”，“ 4”：“ CONTINUOUS + RTO”} |
| openerAdvancedConfig |门铃抑制持续时间|门铃抑制的持续时间（毫秒）（仅在工作模式2-Digital Intercom-中）|
| openerAdvancedConfig | soundRing |响声|
| openerAdvancedConfig | soundOpen |开放的声音 |
| openerAdvancedConfig | soundRto | RTO的声音|
| openerAdvancedConfig | soundCm | CM的声音|
| openerAdvancedConfig | soundConfirmation |声音确认|
| openerAdvancedConfig | soundLevel |声级|
| openerAdvancedConfig | singleButtonPressAction |如果按一下按钮，则所需的操作|
| openerAdvancedConfig |电池类型|智能锁中存在的电池类型<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}`|
| openerAdvancedConfig |电池类型|智能锁中存在的电池类型<br> `{“ 0”：&#39;ALKALI&#39;，“ 1”：&#39;ACCUMULATOR&#39;，“ 2”：&#39;LITHIUM&#39;}`|
| openerAdvancedConfig | automaticBatteryTypeDetection |指示是否启用了自动检测电池类型的标志 |
| openerAdvancedConfig | operationId |操作ID-如果设置的设备被锁定以进行其他操作|

####用户
|频道|州|描述（可能的值）|
|:------- |:----- |:----------------------------- |
|用户| -|用户锁|
| users._userName_ | -|用户_userName_ |
| users._userName_ | allowedFromDate |允许的日期|
| users._userName_ | allowedUntilDate |允许的截止日期|
| users._userName_ | allowedWeekDays |允许的工作日<br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}`|
| users._userName_ | allowedFromTime |允许的时间（从午夜开始的分钟数）|
| users._userName_ | allowedUntilTime |允许的时间（从午夜开始的分钟数）|
| users._userName_ | authId | Smartlock授权ID |
| users._userName_ | dateCreated |创建日期|
| users._userName_ | dateUpdated |更新日期|
| users._userName_ | dateLastActive |上次有效日期|
| users._userName_ |已启用|如果启用了用户，则为true |
| users._userName_ | id |用户的唯一ID |
| users._userName_ | lockCount |锁数|
| users._userName_ |名称|用户名|
| users._userName_ |允许如果身份验证具有远程访问权限，则为true |
| users._userName_ |类型授权类型<br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}`|
| users._userName_ |类型授权类型<br> `{“ 0”：“ APP”，“ 1”：“ BRIDGE”，“ 2”：“ FOB”，“ 3”：“ KEYPAD”，“ 13”：“ KEYPAD CODE”，“ 14”：“ Z- KEY&#39;，“ 15”：&#39;VIRTUAL&#39;}`| |

##使用ioBroker.javascript的Smart Home / Alexa集成
您的智能家居中可能集成的一些示例。

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
    var status = (getState('nuki-extended.0.smartlocks.home_door.state.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki-extended.0.smartlocks.home_door._ACTION', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__用您的锁的lockState替换`nuki-extended.0.door__home_door.status.lockState`！__您还可以通过`msg`自定义消息。

###让Alexa通知您有关锁的更改
这需要ioBroker适配器ioBroker.alexa2（https://github.com/Apollon77/ioBroker.alexa2）。

为了使用Alexa的语音输出，我们定义一个函数```say```§。将以下函数放在ioBroker.javascript的“全局”文件夹中的脚本中。重要信息：用您的Alexa ID替换＃您的ALEXA ID＃（也替换＃）。您可以在ioBroker```alexa2.0.Echo-Devices```的对象树中找到Alexa ID。

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

您可以在ioBroker.javascript中使用此功能，使用Alexa§§JJJJJ_0_0§或```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])```来说出短语，以从多个设备输出语音。

在ioBroker.javascript的“ common”文件夹中创建一个脚本，并将以下侦听器添加到该脚本中。重要说明：用保持锁定状态的状态（例如§§JJJJJ_0_0§§）替换#LOCK STATE ID＃（也替换＃）：

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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

###让Telegram通知您有关锁的更改
这需要ioBroker适配器ioBroker.telegram（https://github.com/iobroker-community-adapters/ioBroker.telegram）。

为了使用Telegram的消息输出，我们定义一个函数```msg```和```messenger```§。将以下函数放在ioBroker.javascript的“全局”文件夹中的脚本中：

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

您可以在ioBroker.javascript中使用此功能，以通过§§JJJJJ_0_0§（发送给所有用户）或§§JJJJJ_1_1§§（发送给特定用户）将任何内容发送到Telegram。

在ioBroker.javascript的“ common”文件夹中创建一个脚本，并将以下侦听器添加到该脚本中。重要说明：用保持锁定状态的状态（例如§§JJJJJ_0_0§§）替换#LOCK STATE ID＃（也替换＃）：

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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

注意：如果同时使用Alexa和Telegram脚本，则只能为这两种操作定义一个侦听器：

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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```

###让Telegram和Alexa通知您有人通过Opener响铃
这需要ioBroker适配器ioBroker.telegram（https://github.com/iobroker-community-adapters/ioBroker.telegram）和ioBroker适配器ioBroker.alexa2（https://github.com/Apollon77/ioBroker.alexa2）。

```javascript
/*
 * Alexa and Telegram to notify on Opener Ringing state
 *
 */
let phrase = 'Somebody is ringing the doorbell.'; // Es hat an der Tür geklingelt
on({id: 'nuki-extended.0.openers.opener.state.ringStateUpdate', change: "any", ack: true}, function (s) {
  let state= s && s.state;

  if (state.val === true) {
    setState("alexa2.0.Echo-Devices.#YOUR ALEXA ID#.Commands.speak"/*speak*/, phrase);
    sendTo("telegram", "send", { text: phrase });
  }
});
```

##积分
感谢[@ Nik13]（https://github.com/Mik13）用于[Nuki Bridge API实现](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api)。

<a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> （[基本套装]（https://www.flaticon.com/packs/essential-set-2））和<a href="https://www.freepik.com/" title="Freepik">Freepik</a> （[门](https://www.flaticon.com/packs/doors)）从<a href="https://www.flaticon.com/" title="平面图标">www.flaticon.com</a>制作的图标<a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">已获</a> <a href="http://creativecommons.org/licenses/by/3.0/" title="知识共享3.0" target="_blank">CC 3.0 BY</a>许可

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

### v2.3.0 (2020-08-10)
- (Zefau) added support for the door sensor of the Nuki Smartlock ([introduced with Bridge firmware 2.6.0 / 1.16.0](https://developer.nuki.io/t/bridge-beta-fw-2-6-0-1-16-0-with-door-sensor-state/6159))
- (Zefau) added support for the ring bell action of the Nuki Opener ([introduced with Bridge firmware 2.7.0 / 1.17.0](https://developer.nuki.io/t/bridge-beta-fw-2-7-0-1-17-0/6792))

### v2.2.6 (2020-07-14)
- (Zefau) fixed Web API not refreshing correctly (see [#59](https://github.com/Zefau/ioBroker.nuki-extended/issues/59))
- (Zefau) updated dependencies

### v2.2.5 (2020-03-19)
- (Zefau) fixed incorrect versioning

### v2.2.4 (2020-03-18)
- (Zefau) fixed incorrect dates of version history (see [#60](https://github.com/Zefau/ioBroker.nuki-extended/issues/60))

### v2.2.3 (2020-03-04)
- (Zefau) added refresh of configuration (via Nuki Web API) when any config item has been changed in ioBroker

### v2.2.2 (2020-03-04)
- (Zefau) fixed incorrect error message `Error triggering action via Nuki Bridge API: No Nuki Hex ID given!`
- (Zefau) added new error message if too many callbacks are already attached to Nuki Bridge (`Callback not attached because too many Callbacks attached to the Nuki Bridge already! Please delete a callback!`)

### v2.2.1 (2020-03-03)
- (Zefau) fixed incorrect state mapping of state `openerAdvancedConfig.doorbellSuppression`

  **Note:** Please delete the state `openerAdvancedConfig.doorbellSuppression` once manually and restart the adapter to take affect!
  
- (Zefau) updated dependencies

### v2.2.0 (2020-02-16)
- (Zefau) added possibility to change configuration of Nuki Smartlock or Nuki Opener (when using Web API)
- (Zefau) updated dependencies

### v2.1.0 (2020-02-03)
- (Zefau) added (optional) callback IP for Bridge API events (e.g. when ioBroker is run in docker; see [#51](https://github.com/Zefau/ioBroker.nuki-extended/issues/51))
- (Zefau) added dedicated buttons for each lock / opener action
- (Zefau) replaced `state.timestamp` with `state.lastDataUpdate` (indicates last data refresh from the APIs) and `state.lastStateUpdate` (indicates the last actual state change)

### v2.0.3 (2019-10-31)
- (Zefau) reintroduced support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)

### v2.0.2 (2019-10-31)
- (Zefau) added support for newly introduced nightmode (see https://nuki.io/de/blog/nuki-news-de/nuki-update-2019-der-winter-naht-sei-vorbereitet/)
- (Zefau) fixed incorrect behavior when bridges are defined insufficiently (no name, ip or token provided)

### v2.0.1 (2019-10-26)
- (Zefau) fixed missing `bridge_name`

### v2.0.0 (2019-10-24)
- (Zefau) added support for new Nuki Opener
- (Zefau) added support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)
- (Zefau) added fallback to Nuki Web API in case applied actions on Nuki Bridge API fail, e.g. due to bridge error 503 (see https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- (Zefau) added retry in case applied actions on Nuki Bridge API fail (when Nuki Web API is not used)
- (Zefau) added option to regularly synchronise instead of using Bridge API callback
- (Zefau) added refreshing all states of Nuki Web API when callback is received via Nuki Bridge API
- (Zefau) added states for Nuki Notifications
- (Zefau) added support for multiple devices (including Nuki Opener) on adapter web interface
- (Zefau) added option to not retrieve all information (by deselecting `config` or `users`) via Nuki Web API

## License
The MIT License (MIT)

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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