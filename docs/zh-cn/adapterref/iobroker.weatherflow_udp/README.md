---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weatherflow_udp/README.md
title: 天气流UDP
hash: yxgr2MEMcXFzQZVMqmC5+baOM6kYCy8UA0/+Jotrft4=
---
![商标](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.weatherflow_udp.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.weatherflow_udp.svg)
![安装数量（最新）](http://iobroker.live/badges/weatherflow_udp-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![依赖状态](https://img.shields.io/david/woessmich/iobroker.weatherflow_udp.svg)
![已知漏洞](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![NPM](https://nodei.co/npm/iobroker.weatherflow_udp.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/woessmich/ioBroker.weatherflow_udp/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/woessmich/ioBroker.weatherflow_udp?branch=master&svg=true)

＃Weatherflow UDP
**测试：**

##用于ioBroker的weatherflow_udp适配器
Weatherflow UDP接收器适配器，用于接收和解析[UDP消息]（https://weatherflow.github.io/Tempest/api/udp/v143/）来自[Weatherflow]（www.weatherflow.com）智能气象站，例如[Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/)。
适配器也应该能够解析“ Air”和“ Sky”之类的较旧的电台（但这未经测试）。
adpater侦听的标准端口是50222，但可以在设置中更改。

##设置
适配器提供最少的设置选项集。
据我所知，侦听端口可以更改，因为气象站中心正在发送的端口不能更改，因此不需要更改。

车站海拔高度（以米为单位）用于计算车站所提供的局部压力所降低的压力。只需使用与在应用程序中输入的高度相同的高度即可。与应用程序中的减压相比，根据所使用的公式，可能会有小的差异。适配器使用德国气象服务DWD使用的公式（http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch[er](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)）。

选中调试复选框时，适配器将在日志文件中创建大量输出。仅应用于调试。

##数据和天气状况
适配器提供通过UDP协议发送的所有参数。状态在集线器和站ID下方的树中。<b>注意</b>：将数据发送到数据库进行长期归档时，如果需要更换单元，则应使用状态别名来避免丢失序列。 Tempest-App提供的内容有所不同，因为该应用程序从Weatherflow服务器获取已处理的数据。给定足够的电池电量，“ device_status”和“ obs_st”数据并每分钟更新一次，“ rapid_wind”每3秒更新一次。 “ evt_precip”和“ evt_strike”仅在发生时更新（创建）。 “ hub_status”每10秒更新一次。工作站和适配器计算出的值（请参阅下文）仅在收到或计算时创建。这意味着可能需要最多24小时才能看到所有内容，除了下雨和雷击事件，这可能需要几天，几周，几个月才能出现；

##适配器计算的状态
除了系统提供的数据之外，适配器还会计算一些其他数据，所有这些数据都将“ adapter named”作为名称后缀：

-[beaufort]中的平均风，阵风和平静（https://en.wikipedia.org/wiki/Beaufort_scale）
-根据温度和湿度计算的露点
-感觉像是根据温度，湿度和平均风计算的温度。根据温度和风或温度或湿度，显示气温，或者显示[风寒]（https://en.wikipedia.org/wiki/Wind_chill）或[热指数]（https：//en.wikipedia。 org / wiki / Heat_index）。
-提供了当前和过去一小时以及今天和昨天的降水量和持续时间以及[阳光持续时间]（https://en.wikipedia.org/wiki/Sunshine_duration）（> = 120 W / m2）。使用前一个小时和昨天，可以轻松地将有关值更改的数据存储到数据库中。
-根据此比例提供降水强度：none（0）：0 mm / hour；非常轻（1）：> 0，<0.25毫米/小时;轻度（2）：≥0.25，<1.0毫米/小时;中度（3）：≥1.0，<4.0毫米/小时;重（4）：≥4.0，<16.0毫米/小时;非常重（5）：≥16.0，<50毫米/小时;极限（6）：> 50.0毫米/小时
-下雨在precip_evt中也显示为布尔状态（真，假）。如果接收到降水事件并且降水值> 0，则将其设置为true。 3分钟后，如果不再下雨，将重置
-如果> = 120 W / m2，则阳光也显示为布尔状态，则为true，否则为false。
-从风向以度数计算的基数字母（NSWE）的风向。

此外，适配器为今天和昨天提供了有用的最小和最大值参数选择。

-sensor_status作为文本，可以轻松查看发生这种情况的传感器失败。
-从sensor_status位中提取功率模式（实验性）

##闪电距离
当未检测到闪电时，协议发送的闪电距离为0。将值0修改为999，可避免产生雷击直接在头顶的印象。

## Changelog
### 0.0.11
* (womi) Corrected more programming issues from review
### 0.0.10
* (womi) Corrected programming issues from review
### 0.0.9
* (womi) Assigned roles to states; fixes for status 'latest'
### 0.0.8
* (womi) Corrected rain accumulation/duration; added precipitation intensity; added experimental power mode; added raining and sunshine as boolean states
### 0.0.7
* (womi) Updated parts of adapter calculated data structure, added last message per message type instead of one for all; corrected calculation of feels like temperature
### 0.0.6
* (womi) initial release after testing with real tempest

## License
MIT License

Copyright (c) 2020 womi <woessmich@gmail.com>

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