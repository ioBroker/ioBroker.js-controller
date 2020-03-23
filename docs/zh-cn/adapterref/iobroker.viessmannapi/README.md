---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.viessmannapi/README.md
title: ioBroker.viessmannapi
hash: VHRP4CZLw2F3JTpv5Ed5HBdIex5+YNaRgLvZMV4cakU=
---
![商标](../../../en/adapterref/iobroker.viessmannapi/admin/viessmannapi.png)

![建立状态](https://travis-ci.org/thovid/ioBroker.viessmannapi.svg?branch=master)
![安装数量](http://iobroker.live/badges/viessmannapi-installed.svg)

＃ioBroker.viessmannapi
=================

 **请注意，自2020年3月起，Viessmann已对其API实施了一些速率限制。目前，限制为120分钟呼叫10分钟的时间窗口和1450次呼叫24小时的时间窗口（请参阅https://www.viessmann-community.com/t5/Experten-fragen/Q-amp-A- Viessmann-API / qaq-p / 127660 / comment-id / 117660＃M117660）。因此，轮询间隔设置为900秒。您可以通过adpater配置更改它，后果自负。如果在短时间内拨打过多电话，您的viessmann帐户将被封锁一段时间。这也阻止了通过官方的Viessmann App访问！ **

该适配器通过Viessmann API将ioBroker系统连接到Viessmann中央供暖系统。它要求您的供暖系统通过Vitoconnect或类似设备连接到Viessmann Server。该API提供的所有已启用信息都将定期（每60秒一次）进行轮询并写入状态。

请注意，这是一个私人项目，使用风险自负。 Viessmann不支持或不支持它！

##安装
由于此适配器处于早期开发阶段，因此可以通过ioBroker“最新”存储库进行安装。在适配器设置上，输入您的Viessmann帐户的用户名和密码。如果一切顺利，您应该看到状态出现在`viessmannapi.X`下。第一个值应在60秒后到达。

＃＃ 状态
具体状态可能取决于您的安装。例子是

-`viessmannapi.0.heating.boiler.sensors.temperature.main.value`-锅炉温度
-`viessmannapi.0.heating.circuits.0.heating.curve.shift`和`slope`-确定加热曲线的偏移和斜率
-`viessmannapi.0.heating.circuits.0.operating.modes.active.value`-当前操作模式；例如dhw仅表示热水，dhwAndHeating表示热水和暖气
-`viessmannapi.0.heating.sensors.temperature.outside.value`-外部传感器测量的外部温度

##动作
一些功能提供了* action *来更改某些属性。可以通过`sendTo`方法调用一个动作。语法如下所示：

```javascript
sendTo('viessmannapi.0', 'action', {
    feature: 'heating.circuits.0.operating.programs.comfort',
    action: 'setTemperature',
    payload: {targetTemperature: 20}
});
```

高于上述要求会将舒适度程序的目标温度设置为20°C。

###支持的操作
以下是受支持的操作的列表（请注意，根据您的供暖设备的不同，某些操作可能不可用，或者其他操作可用，但此处未记录）。

|功能|动作|领域|注意事项 |
|---------------------------------------------------|----------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **加热回路X循环时间表** | | | |
| | setSchedule | |设置循环“ X”的时间表|
| | | `newSchedule`（类型：时间表，请参见下文，模式：“打开”，默认值：“关闭”）|请参阅下面的时间表类型说明|
| **加热电路X加热曲线** | | | |
| | | `slope`（数字，最小值：0.2，最大值：3.5，步进：0.1）| |
| | | `shift`（数字，最小值：-13，最大值”：40，步进：1） |
| | | `shift`（number，min：-13，max“：40，stepping：1）| |
| **加热电路X加热时间表** | | | |
| | | `newSchedule`（类型：时间表，请参见下文，模式：“正常”，默认值：“已减少” |请参见下文的时间表类型说明|
| | | `newSchedule`（类型：计划，请参见下文，模式：“正常”，默认值：“已减少”）|请参见下面的计划类型说明|
| **加热电路X操作模式有效** | | | |
| | | `mode`（字符串，枚举：[“ standby”，“ dhw”，“ dhwAndHeating”，“ forcedReduced”，“ forcedNormal”]）|必填|
| | | `mode`（字符串，枚举：[“ standby”，“ dhw”，“ dhwAndHeating”，“ forcedReduced”，“ forcedNormal”]）|必填|
| **加热电路X操作程序的舒适度** | | | |
| | | `targetTemperature`（数字，最小值：4，最大值：37，步进：1）|必填|
| | | `targetTemperature`（数字，最小值：4，最大值：37，步进：1）|必填|
| |激活|无字段（发送空对象），激活舒适模式|
| |停用| |无字段（发送空对象），停用舒适模式|
| **加热电路X操作程序生态** | | | |
| | | `temperature`（数字，最小值：3，最大值：37，步进：1）|可选|
| | | “温度”（数字，最小值：3，最大值：37，步进：1）|可选|
| |停用| |无字段（发送空对象），禁用环保模式|
| **加热电路X操作程序假日** | | | |
| | | `start`（字符串）|必需，未知格式（可能是日期字符串的某种形式？） |
| | | `end`（字符串）|必需，未知格式（可能是日期字符串的某种形式？） |
| | | `end`（字符串）|必需，未知格式（可能是日期字符串的某种形式？） |
| |不定期| |无字段（发送空对象），停用假期计划|
| **加热电路X操作程序正常** | | | |
| | | `targetTemperature`（数字，最小值：3，最大值：37，步进：1）|必填|
| | | `targetTemperature`（数字，最小值：3，最大值：37，步进：1）|必填|
| **减少了加热电路X的操作程序** | | | |
| | | `targetTemperature`（数字，最小值：3，最大值：37，步进：1）|必填|
| | | `targetTemperature`（数字，最小值：3，最大值：37，步进：1）|必填|
| **heating.dhw.oneTimeCharge** | | | |
| |激活|没有字段（发送空对象）。激活一次性充入热水的功能。 |
| |停用| |没有字段（发送空对象）。取消一次性充入热水。 |
| **加热温度** | | | |
| | | `temperature`（数字，最小值：10，最大值：60，步进：1）|必填|
| | | “温度”（数字，最小值：10，最大值：60，步进：1）|必填|
| **heating.dhw.schedule** | | | |
| | | `newSchedule`（类型：时间表，请参见下文，模式：“开启”，默认值：“关闭”）|请参阅下面的时间表类型说明。 |
| | | `newSchedule`（类型：时间表，请参见下文，模式：“开”，默认值：“关”）|请参阅下面的时间表类型说明。 |

###时间表类型
大多数操作使用简单的数据类型（数字，字符串）。某些操作允许设置时间表。时间表如下所示：

```javascript
{
   "mon":[
      {
         "start":"05:30",
         "end":"10:00",
         "mode":"on",
         "position":0
      },
      {
          "start":"11:00",
          "end":"12:30",
          "mode":"on",
          "position":1
      },
      /* ... */
   ],
   "tue":[ /* ... */ ],
   "wed":[ /* ... */ ],
   "thu":[ /* ... */ ],
   "fri":[ /* ... */ ],
   "sat":[ /* ... */ ],
   "sun":[ /* ... */ ]
}
```

对于每一天，都必须提供一个包含当天“时间表”的数组。单个条目包括开始和结束时间，计划的“模式”和位置。支持的模式取决于计划的时间，请参阅上面的支持功能表。在预定元素之外，使用默认模式，请参见上表。在上面的示例中，计划在星期一的5:30和10:00之间以及11:00和12:30之间“开”东西。在这些时间间隔之外，将计划默认模式（“关闭”）。

###查询所有功能
要获取具有所有可用操作的所有可用功能的列表，只需将消息`describe`发送到正在运行的适配器实例。结果是所有可用功能的数组，例如可以通过`JSON.stringify()`打印为JSON字符串。

*例：*

```javascript
sendTo('viessmannapi.0', 'describe', {}, (result) => {
    const features = JSON.stringify(result.result);
    log(features);
});
```

该脚本查询所有可用功能并将其打印到日志中。

##注意
-该adpater处于早期开发中！请期待错误，并随时在github（https://github.com/thovid/ioBroker.viessmannapi/issues“）上报告错误。

##法律
-Viessmann和Vitoconnect是Viessmann Werke GmbH＆Co. KG的注册商标。

-此项目是私人项目，未经Viessmann Werke GmbH＆Co. KG官方*支持或认可，使用后果自负。

-如果您有任何疑问，请通过github与我联系！

## Changelog
### 1.3.3 (2020/03/23)
* (thovid) Updated dependencies, set default poll intervall to 900 s due to rate limiting of the viessmann api
### 1.3.2 (2019/02/10)
* (thovid) Fixed a bug preventing the adapter to start
### 1.3.1 (2019/02/05)
* (thovid) reduced package size by removing unused stuff
### 1.3.0 (2019/02/05)
* (thovid) impoved action execution: validation of payload improved, schedule payload now supported
* (thovid) added support for compact mode
* (thovid) added configuration for poll interval
### 1.2.0 (2018/12/18)
* (thovid) added experimental support to execute actions on a feature via the `sendTo` function
### 1.1.2 (2018/12/10)
* (thovid) fixed bug that prevented email and password to be removed after initial authentication 
### 1.1.1 (2018/12/10)
* (thovid) fixed a bug that prevented certain properties from beeing exposed as states (for example `heating.burner`)
### 1.1.0 (2018/12/10)
* (thovid) Deletes email and password after sucessful connection, further connections are done via refresh token
* (thovid) Uses npm released version of client lib, so no longer requires git upon installation
### 1.0.0 (2018/12/07)
* (thovid) Initial adapter

## License
The MIT License (MIT)

Copyright (c) 2018 Thomas Vidic

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