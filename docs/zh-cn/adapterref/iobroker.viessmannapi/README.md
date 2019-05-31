---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.viessmannapi/README.md
title: ioBroker.viessmannapi
hash: E+E7xqiJjqeHgW33UbeLs5yc7G6Tp7c9OqAghBPYONY=
---
![商标](../../../en/adapterref/iobroker.viessmannapi/admin/viessmannapi.png)

![建立状态](https://travis-ci.org/thovid/ioBroker.viessmannapi.svg?branch=master)
![安装数量](http://iobroker.live/badges/viessmannapi-installed.svg)

＃ioBroker.viessmannapi
=================

该适配器通过Viessmann API将您的ioBroker系统连接到您的Viessmann中央供暖系统。它需要您的加热系统通过Vitoconnect或类似设备连接到Viessmann服务器。 API提供的所有已启用信息都会定期轮询（每60秒）并写入状态。

请注意，这是一个私人项目，因此使用风险自负。它不受菲斯曼的支持或认可！

##安装
由于此适配器处于早期开发阶段，因此可以通过ioBroker“最新”存储库进行安装。在适配器设置中，输入您的Viessmann帐户的用户名和密码。如果一切顺利，您应该看到状态出现在`viessmannapi.X`下。第一个值应在60秒后到达。

＃＃ 状态
具体状态可能取决于您的安装。例子是

 - `viessmannapi.0.heating.boiler.sensors.temperature.main.value`  - 锅炉温度
 - `viessmannapi.0.heating.circuits.0.heating.curve.shift`和`slope`  - 移位和斜率确定加热曲线
 - `viessmannapi.0.heating.circuits.0.operating.modes.active.value`  - 当前的操作模式;例如，“dhw”仅指热水，“dhwAndHeating”表示热水和加热
 - `viessmannapi.0.heating.sensors.temperature.outside.value`  - 外部传感器测量的外部温度

##行动
某些功能提供*动作*来更改某些属性。可以通过`sendTo`方法调用操作。语法如下所示：

```javascript
sendTo('viessmannapi.0', 'action', {
    feature: 'heating.circuits.0.operating.programs.comfort',
    action: 'setTemperature',
    payload: {targetTemperature: 20}
});
```

以上呼叫将舒适程序的目标温度设置为20°C。

###支持的操作
以下是支持的操作列表（请注意，根据您的加热安装，某些操作可能不可用，或者其他操作可用但未在此处记录）。

|专题|行动|领域|备注|
|---------------------------------------------------|----------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **heating.circuits.X.circulation.schedule** | | | |
| | setSchedule | |设定电路'X'|循环的时间表 |
| | | `newSchedule`（类型：时间表，见下文，模式：'开'，默认：'关'）|请参阅下面的计划类型说明 |
| **heating.circuits.X.heating.curve** | | | |
| | | `slope`（数字，最小值：0.2，最大值：3.5，步进：0.1）| |
| | | `shift`（编号，最小值：-13，最大值：40，步进：1）| |
| | | `shift`（数字，最小值：-13，最大值：40，步进：1）| |
| **heating.circuits.X.heating.schedule** | | | |
| | | `newSchedule`（类型：时间表，见下文，模式：'正常'，默认：'减少'|参见下面的时间表类型的描述|
| | | `newSchedule`（类型：Schedule，见下文，模式：'normal'，默认：'reduced'|参见下面的Schedule类型的描述 |
| **heating.circuits.X.operating.modes.active** | | | |
| | | `mode`（字符串，枚举：[“待机”，“dhw”，“dhwAndHeating”，“forcedReduced”，“forcedNormal”]）|要求|
| | | `mode`（string，enum：[“standby”，“dhw”，“dhwAndHeating”，“forcedReduced”，“forcedNormal”]）|要求|
| **heating.circuits.X.operating.programs.comfort** | | | |
| | | `targetTemperature`（编号，最小值：4，最大值：37，步进：1）|要求|
| | | `targetTemperature`（数字，最小值：4，最大值：37，步进：1）|要求|
| |激活| |没有字段（发送空对象），激活舒适模式|
| |停用| |没有字段（发送空对象），停用舒适模式|
| **heating.circuits.X.operating.programs.eco** | | | |
| | | `temperature`（编号，最小值：3，最大值：37，步进：1）|可选|
| | | `温度`（数字，最小值：3，最大值：37，步进：1）|可选|
| |停用| |没有字段（发送空对象），停用eco模式|
| **heating.circuits.X.operating.programs.holiday** | | | |
| | | `start`（字符串）|必需的，未知的格式（可能是某种形式的日期字符串？）|
| | | `end`（字符串）|必需的，未知的格式（可能是某种形式的日期字符串？）|
| | | `end`（string）|必需的，未知的格式（可能是某种形式的日期字符串？）|
| |不定期| |没有字段（发送空对象），停用假日程序|
| **heating.circuits.X.operating.programs.normal** | | | |
| | | `targetTemperature`（编号，最小值：3，最大值：37，步进：1）|要求|
| | | `targetTemperature`（数字，最小值：3，最大值：37，步进：1）|要求|
| **heating.circuits.X.operating.programs.reduced** | | | |
| | | `targetTemperature`（编号，最小值：3，最大值：37，步进：1）|要求|
| | | `targetTemperature`（数字，最小值：3，最大值：37，步进：1）|要求|
| **heating.dhw.oneTimeCharge** | | | |
| |激活| |没有字段（发送空对象）。激活一次性热水储存。 |
| |停用| |没有字段（发送空对象）。停用一次热水储存装置。 |
| **heating.dhw.temperature** | | | |
| | | `temperature`（编号，最小值：10，最大值：60，步进：1）|要求|
| | | `温度`（数字，最小值：10，最大值：60，步进：1）|要求|
| **heating.dhw.schedule** | | | |
| | | `newSchedule`（类型：时间表，见下文，模式：'开'，默认：'关'）|请参阅下面的计划类型说明 |
| | | `newSchedule`（类型：Schedule，见下文，模式：'on'，默认：'off'）|请参阅下面的计划类型说明 |

###日程表类型
大多数操作使用简单的数据类型（数字，字符串）。某些操作允许设置计划。时间表如下所示：

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

对于每一天，必须提供包含当天“时间表”的数组。单个条目包括开始和结束时间，计划的“模式”和位置。支持的模式取决于计划的内容，请参阅上面支持的功能表。在计划元素之外，使用默认模式，请参见上表。在上面的例子中，有些东西计划在星期一的5:30到10:00之间以及11:00到12:30之间“开启”。在这些时间间隔之外，安排默认模式（“关闭”）。

###查询所有功能
要获取包含所有可用操作的所有可用功能的列表，只需将消息`describe`发送到正在运行的适配器实例。结果是所有可用功能的数组，例如可以通过`JSON.stringify()`打印为JSON字符串。

*例：*

```javascript
sendTo('viessmannapi.0', 'describe', {}, (result) => {
    const features = JSON.stringify(result.result);
    log(features);
});
```

此脚本查询所有可用功能并将其打印到日志中。

##注意事项
 - 这个adpater正处于早期开发阶段！期待错误，并随时在github上报告错误（https://github.com/thovid/ioBroker.viessmannapi/issues“）。

##法律
 -  Viessmann和Vitoconnect是Viessmann Werke GmbH＆Co。KG的注册商标。

 - 该项目是一个私人项目，不得由Viessmann Werke GmbH＆Co。KG正式支持或认可，使用风险由您自行承担。

 - 如果您有任何疑问，请通过github与我联系！

## Changelog
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