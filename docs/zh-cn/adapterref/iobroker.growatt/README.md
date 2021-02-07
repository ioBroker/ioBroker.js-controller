---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.growatt/README.md
title: ioBroker.growatt
hash: R/Ro5hZjXVFIpi+vg3CxrQWVR756UbHET4v+aaEyg0k=
---
![商标](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.growatt.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![安装数量（最新）](http://iobroker.live/badges/growatt-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/growatt-stable.svg)
![依赖状态](https://img.shields.io/david/PLCHome/ioBroker.growatt.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

＃ioBroker.growatt
## IoBroker的growatt适配器
ioBroker Growatt适配器可与Growatt Shine Server通信。
我没有关系。
通常，每5分钟将数据从数据记录器发送到云端。
您可以更改它，请参见下文。
该软件每30秒查询一次服务器，以使偏移量不会太大。

并非所有工厂类型都已实现。

当前只能读取数据，无法写入参数或更改参数。

＃加速数据间隔
##您可以将记录器间隔设置为5分钟到1分钟
从ShineWiFi-S上卸下KEY按钮的橡胶塞，然后短按内部的按钮。蓝色LED将点亮。使用手机或计算机连接到ShineWiFi-S模块发出的无线网络。网络名称/ SSID是ShineWiFi-S模块的序列号。

##登录页面
成功建立连接后，打开手机或计算机上的Web浏览器，然后在地址栏中键入192.168.10.100。用户名是admin，默认密码是12345678。
![登录页面](../../../en/adapterref/iobroker.growatt/docs/login.png)

＃＃ 高级设置
将数据间隔时间更改为1分钟![高级设置](../../../en/adapterref/iobroker.growatt/docs/advancedsettings.png)

##系统重启
在此页面上重新启动ShineWiFi-S模块，单击“立即重新启动”以启用您刚进行的新设置，并从ShineWiFi模块的内部Web服务器注销。
![系统重启](../../../en/adapterref/iobroker.growatt/docs/restart.png)

** Growatt端的图表没有变化。在那里，您只能看到数据记录器中数据的变化。**

＃德语-加速数据间隔
## Du kannst das Protokollierungsintervall von 5 Minuten auf 1分钟einstellen
密码键和WiFi的激活，以及按键按钮。
Der ShineWiFi-S特立尼姑库尔兹热点（SSID = Seriennummer des ShineWiFi-S）。 Beim Netz mit einem便携式计算机。

## Einloggen
ALS Webadresse http://192.168.10.100（位于浏览器eingeben中）。
Der用户名ist Admin和das Passwort 12345678（系统管理中的高级人）。
![登录页面](../../../en/adapterref/iobroker.growatt/docs/login.png)

＃＃ 高级设置
Auf“高级设置”显示间隔时间。 （von 5 auf 1）![高级设置](../../../en/adapterref/iobroker.growatt/docs/advancedsettings.png)

##系统重启
Auf System重新启动gehen und Button herzhaft，aber vorsichtig Klicken。
![系统重启](../../../en/adapterref/iobroker.growatt/docs/restart.png)

** Es gibt keineÄnderungand den Diagrammen在Growatt-Seite之后，于5分钟后关闭。 Datenlogger中的Dort sehen Sie nur eineÄnderungder。**

＃适配器管理页面
##主要设置
###用户和密码
请输入您在Shine应用程序或Web门户中也使用的名称和密码。

###使用共享密钥登录
在Growatt网站上的能源，工厂管理和操作工具下，您可以通过电子邮件向自己发送密钥。

###读取工厂数据
该数据记录包含存储的主数据

###读取最后的历史数据
从数据记录器的历史记录中读取最后一条数据记录。
此功能支持数据记录器的分钟间隔。

###读取状态数据
这些数据不适用于所有工厂（不是INV / MAX / TLX）。该数据集包含实时数据。
此功能支持数据记录器的分钟间隔。

###读取总数据
该数据记录包含聚合数据。

###读取设备数据
该数据记录包含来自设备的一些数据。其他类别中也有一些数据。

###阅读天气
该数据集包含天气预报。

##管理对象
在这里，您可以定义逆变器采集的每个值（对象）应该发生什么。
有很多不属于您的变频器的值。这些可以在这里删除。
由于在保存时没有事件可以重新加载对象列表。按下保存时必须使用更新按钮。

###正常
对象保留，值被更新。

###删除
删除对象，并丢弃变频器加载的值。
更新后，由于该对象不再存在，因此仅显示ID和操作。如果正常选择，则保存后将再次创建对象。

###没有更新
对象仍然存在，来自变频器的值将被丢弃。

-*-

## Changelog
### 0.0.19 (05.02.2021)
* (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
* (PLCHome) Objects of unselected data areas are now deleted.
* (PLCHome) You can choose objects to be ignored or deleted.

### 0.0.18 (23.01.2021)
* (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)
* (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)
* (PLCHome) npm package version update
* (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)
* (PLCHome) npm package version update

### 0.0.14 (01.12.2020)
* (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)
* (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)
* (PLCHome) Read me

### 0.0.10 (26.11.2020)
* (PLCHome) Shared key login
* (PLCHome) Last value of the graph if there are no live data.
* (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)
* (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)
* (PLCHome) fix io-package

### 0.0.7 (05.10.2020)
* (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
* (PLCHome) io-package native defined 5 values, admin sets 7
* (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)
* (PLCHome) translation with ioBroker tool.

### 0.0.5
* (PLCHome) initial release.

### 0.0.1
* (PLCHome) initial release.


-*-

## License
MIT License

Copyright (c) 2021 PLCHome <https://github.com/PLCHome>

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