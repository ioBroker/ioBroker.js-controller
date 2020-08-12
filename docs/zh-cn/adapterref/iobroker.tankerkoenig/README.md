---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Pix---/ioBroker.tankerkoenig/badge.svg?targetFile=package.json
BADGE-NPM: https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: prGhaNtsE2EchhnmVj2lhDlALqJtEe8yqbEtmyg/jjU=
---
![商标](../../../en/adapterref/iobroker.tankerkoenig/../../admin/tankerkoenig.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)
![NPM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true)

＃ioBroker.tankerkoenig
##说明
该适配器通过Web服务[tankerkoenig.de]（https://creativecommons.tankerkoenig.de/#about）。所有数据都存储在要使用的对象中并在[ioBroker.vis中显示](https://github.com/ioBroker/ioBroker.vis)的JSON提要返回多达十个不同站点的燃油价格。
与list.php和detail.php（批量）相比，适配器使用站点prices.php减少了更新时要传输的数据量。适配器为出售最便宜的E5，E10和柴油的站点创建数据点。

##配置
### API密钥
可以在[网站Tankerkönig](https://creativecommons.tankerkoenig.de/#about)获得API密钥。这是一个36位代码，必须在此字段中输入。

###站
最多可以定义十个不同的站。因此，可以在tankerkoenig.de上获得特定的工作站ID。它也有36位数字。该ID必须在列表中输入。相应的名称是可选的。
![替代文字](../../../en/adapterref/iobroker.tankerkoenig/img/tankerkoenigSettingsScreenshot.jpg "屏幕截图设置")

###写空
如果断开连接，此选项将阻止适配器存储旧值。它有助于生成更平滑的历史记录图表。

###最小化日志
为了减少日志写入（例如在SD卡上），可以选择此选项。

##激活
适配器作为守护程序运行（不在计划模式下），并每五分钟定期启动。源提要的数据仅由tankerkoenig.de上的服务器每4分钟更新一次，因此，更频繁地查询数据是没有意义的，只会造成多余的数据流量并浪费资源。可以随时设置较大的间隔。

＃＃  数据点
十个站中的每个站都有一个通道，用于每种燃料类型（E5，E10和柴油），此外，每个站还有另外四个数据点。

*`feed`（三位数的价格；类型编号）
*`short`（带有两位小数的价格；键入字符串）
*`3rd`（在VIS中不能将小数点后第三位写为上标）
*`combined`（准备使用HTML格式的价格，带有上标的三进制小数点和信息，是否打开了站[[closed] /“ not found”）以显示在VIS HTML Widget中）

![替代文字](../../../en/adapterref/iobroker.tankerkoenig/img/tankerkoenigDP.jpg "数据点")

存储了另外三个数据点

*`status`（状态打开/关闭）
*`name`（用户给定的站名）
*`station_id`（该站的TankerkönigID）

此外，还存储了每种富勒类型的最便宜的站点

*最便宜的E5
*`chepest.E10`
*`cheapest.diesel`

在这些通道中，存储了每种燃料类型价格最低的站点。如果多个工作站提供相同的最低价格，则工作站将按照配置中使用的顺序进行排序。

已创建181个数据点。

## VIS
可以在此VIS小部件中轻松显示“组合”数据点

```
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```

数据点`combined`的值传递一个css类。这些类是`station_open`，`station_closed`和`station_notfound`。通过VIS中CSS编辑器中的CSS定义，现在可以实现出色的设计（如封闭工作站的红色字体）。

```
.station_open {
    color: blue;
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}

/* € sign */
.station_combined_euro {
    font-family: Times;
    font-size: 80%;
}
```

##紧凑模式
该适配器可用于iobroker的紧凑模式。

## Changelog
### 2.0.9 (2020-04-21)
* (pix) NodeJS 10 or higher required

### 2.0.8 (2020-03-27)
* (Zwer2k) 2.0.8 Catch error if station status reports _no data_

### 2.0.7 (2020-03-25)
* (pix) 2.0.7 Catch error if station status reports _no stations_

### 2.0.6 (2019-04-17)
* (Zwer2k) implementation of utils corrected
* (Zwer2k) fixed error occured when all stations were closed

### 2.0.5 (2019-02-22)
* (jens-maus) fixes to prevent _request()_ floodings

### 2.0.3 (2019-02-21)
* (pix) fixed issue with too short sync interval
* (pix) removed datapoint __price__ which was created for debug only

### 2.0.1 (2019-02-20)
* (pix) fixed scrollbar issue in firefox

### 2.0.0 (2019-02-18)
* (pix) admin3 ready

### 1.3.1 (2019-02-05)
* (arteck, pix) request issues fixed

### 1.3.0 (2019-02-05)
* (pix) Compact mode added

### 1.2.1 (2018-11-25)
* (pix) fixed issue __station_id__ and __status__ mixed up

### 1.2.0 (2018-11-25)
* (pix) new datapoint station ID added

### 1.1.0 (2018-05-12)
* (bluefox) prices as number to allow logging were added

### 1.0.5 (2018-02-07)
* (pix) Log entry opt out

### 1.0.4 (2017-03-21)
* (pix) position of _adapter.stop()_ optimized

### 1.0.3 (2017-01-05)
* (pix) Appveyor testing added

### 1.0.2 (2017-01-04)
* (apollon77) TravisCI testing added

### 1.0.1 (2016-12-20)
* (pix) reset to zero issue fixed

### 1.0.0 (2016-10-08)
* (pix) reset values to zero before each refresh now can be ticked off.

### 0.1.2 (2016-07-05)
* (pix,jens-maus) whitespaces between price and € sign

### 0.1.1 (2016-07-05)
* (pix) € appearance in datapoints __combined__ is customizable through css now (thanx jens-maus)

### 0.1.0 (2016-06-12)
* (pix) first version for npm
* (pix) settings window

### 0.0.8 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.7 (2016-06-09)
* (pix) New channels and values for cheapest station created

### 0.0.6 (2016-06-08)
* (pix) Short prices now string

### 0.0.5 (2016-06-08)
* (pix) Channels added for stations 2 to 10
* (pix) Readme corrected (CSS code example)
* (pix) no more log.warn if station is closed
* (pix) scheduled starting improved

### 0.0.4 (2016-06-01)
* (pix) HTML Code in Datapoint __combined__ corrected

### 0.0.3 (2016-06-01)
* (pix) Datapoint __combined__ with CSS class for status

### 0.0.2 (2016-06-01)
* (pix) Datapoint __combined__

### 0.0.1 (2016-05-31)
* (pix) Adapter created

## License

The MIT License (MIT)

Copyright (c) 2016-2020 pix

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