---
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonnen/README.md
title: 声纳适配器
hash: 2OHpDJNtX/XILxjP2Vlf4UusEWvFSwmt5wRzak854bI=
---
![商标](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

＃Sonnen适配器
sonnen适配器使sonnenBatterie可以集成到ioBroker中。

##概述
### Sonnen电池
借助sonnenBatterie，来自太阳能系统的自生能量可以存储起来供个人使用，并在需要时准确使用。这样就可以使自己独立于匿名的能源公司，并成为自己的自给自足的电力生产商。借助集成的能源管理器，智能高科技蓄电系统可确保为家庭提供尽可能最佳的电力。
这不仅价格便宜，而且环保！ sonnenBatterie有多种灵活的存储型号。

### Sonnen适配器
Sonnen适配器可以监视和控制网络中的SonnenBatterie。借助发现适配器（TODO：链接），可以在网络中自动找到sonnenBatterien。 <br/>适配器以对象形式创建用于监视和控制sonnenBatterie的状态。大多数状态仅用于监视电池，而电池也可以通过描述某些状态来控制。

##安装前的要求
使用ioBroker操作sonnenBatterie的前提是，电工已成功设置了电池。电池还必须与ioBroker位于同一网络中。

###安装
适配器的实例是通过ioBroker管理界面安装的。有关必要安装步骤的详细说明，请参见此处（TODO：LINK）。 <br/><br/>适配器实例的安装完成后，配置窗口将自动打开。

##配置
###“主要设置”窗口
![主要设定](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "主要设定")

|领域描述 |
|:-------------|:-------------|
| | IP地址|所需sonnenBatterie的IP地址应在此处输入。 |

|领域描述 |
|:-------------|:-------------|
| Auth-Token |应该在此处输入Auth-Token，可以在sonnen Web界面的“软件集成”下找到它。如果没有输入身份验证令牌，则使用非官方的API，可以随时将其关闭。 |

###“高级设置”窗口
![高级设置](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "高级设置")

|领域描述 |
|:-------------|:-------------|
|查询间隔|在此处可以设置替代值（以毫秒为单位）。在此间隔中更新sonnenBatterie的状态。 |

完成配置后，使用`SPEICHERN UND SCHLIEßEN`退出配置对话框。
这将导致适配器重新启动。

##个实例
适配器的安装已在`Objekte`节中创建了Sonnen适配器的活动实例。 <br/><br/> ![实例](../../../de/adapterref/iobroker.sonnen/media/instance.png "实例") <span style="color:grey">*一审*</span>

可以在ioBroker服务器上创建多个sonnen Adapter实例。相反，sonnenBatterie也可以与多个ioBroker服务器一起运行。如果一个ioBroker服务器要控制多个设备，则应为每个电池创建一个实例。 <br/><br/>实例的状态字段的颜色指示适配器是已激活还是已连接到电池。如果鼠标指针指向该符号，则会显示更多详细信息。

##适配器的对象
在`Objekte`节中，树状结构中列出了集线器中适配器识别的所有设备和活动。另外，还提供关于与集线器的通信是否顺利进行的信息。

![对象](../../../de/adapterref/iobroker.sonnen/media/objects.png "太阳物体") <span style="color:grey">*</span> Sonnen <span style="color:grey">适配器的对象*</span>

在下文中，对象分为状态和按钮。由于有两种不同的API取决于电池，因此仅创建相应电池支持的状态。
列出了每个数据点及其关联的数据类型及其授权。
可以读取（R）和写入（W）授权。每个数据点至少可以读取（R），而其他数据点也可以写入。要搜索特定的数据点，我们建议使用组合键“ CTRL + F”。

＃＃＃ 状态
####频道：信息
*信息连接

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果在ioBroker和电池之间建立了连接，则为true。

* info.lastSync

    |数据类型|授权|
    |:---:|:---:|
    |时间戳记| R |

   *只读时间戳，每次更新数据时都会更新。

*信息配置

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

   *唯一可读的JSON字符串，带有sonnenBatterie的配置信息。

* info.powerMeter

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

   *仅可读的JSON字符串，带有sonnenBatterie的当前测量信息。

*信息逆变器

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

   *唯一可读的JSON字符串，带有sonnenBatterie的逆变器信息。

####频道：状态
* status.consumption

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *仅可读的数字值，其中包含以瓦特为单位的房屋电流消耗。

* status.production

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *仅可读的数字值，它指示光伏系统当前正在产生多少瓦特。

* status.pacTotal

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

*可读的数值，表示变频器的交流电源。
如果该值大于0，则将电池放电；如果该值小于0，则将电池充电。

* status.relativeSoc

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *仅可读的数字值，代表当前的电池电量。

* status.userSoc

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *仅可读的数字值，代表当前的电池电量。

* status.acFrequency

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *仅可读的数字值，代表以赫兹为单位的交流频率。

* status.acVoltage

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *可读的数字值，代表逆变器的当前AC（交流）电压。

* status.batteryVoltage

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *仅可读数字值，代表电池的当前DC（直流）电压。

* status.systemTime

    |数据类型|授权|
    |:---:|:---:|
    |日期| R |

   *只读的ISO日期，代表电池的系统时间。

* status.system已安装

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果正确安装了系统，则为true。

* status.batteryCharging

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值。如果sonnenBatterie当前正在充电，则为真。

* status.flowConsumptionBattery

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值。如果电池当前正在放电，则为真。

* status.flowConsumptionGrid

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果当前正在从网格中获取电源，则为true。

* status.flowConsumptionProduction

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值。如果当前光伏系统直接消耗电力，这是正确的。

* status.flowGridBattery

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *只读布尔型指示器，如果电池当前正在由市电充电，则为true。

* status.flowProductionBattery

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果当前正在由PV系统直接为电池充电，则为true。

* status.flowProductionGrid

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果当前将发电量馈入电网，则为true。

* status.gridFeedIn

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

*可读数字值，代表当前正在馈入或从电网汲取的电量（瓦）。
如果该值为正，则表示当前正在将电网馈入电网；如果为负，则表示正在从电网中汲取电量。

* status.onlineStatus

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，为true，sonnenBatterie在线。

####频道：控制
*控制费

    |数据类型|授权|
    |:---:|:---:|
    |号| R / W |

   *数字值，可将电池的最大放电功率指定为瓦特。

*注意：如果设置了无效值，则无论如何都会被确认。确认（确认）该值仅表示该命令已发送到电池。

*设定值的相应值会一直保留，直到电池收到新的充电或放电值为止。
如果VPP处于活动状态，则该请求将被拒绝。

   *示例：*

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

*控制放电

    |数据类型|授权|
    |:---:|:---:|
    |号| R / W |

   *数字值，可以指定电池的最大电量（瓦）。

*注意：如果设置了无效值，则无论如何都会被确认。确认（确认）该值仅表示该命令已发送到电池。

*设定值的相应值会一直保留，直到电池收到新的充电或放电值为止。
如果VPP处于活动状态，则该请求将被拒绝。

   *示例：*

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

## Changelog
### 1.6.0 (2020-08-09)
* (foxriver76) added support for official api, automatically used when auth token is given by user

### 1.5.3 (2020-05-18)
* (foxriver76) poll online status always again if not confirmed that there are differences in api (old solution could lead to false negative)
* (foxriver76) more specific error handling 

### 1.5.2 (2020-05-16)
* (foxriver76) check if onlineStatus is supported at adapter start - else do not poll it

### 1.5.0 (2020-05-04)
* (foxriver76) added online status indicator

### 1.4.2 (2020-04-16)
* (foxriver76) added more translations
* (foxriver76) optimizations for compact mode

### 1.4.0
* (foxriver76) introducing new states with power metering and inverter information (supported on :8080 API)
* (foxriver76) only minimum support until we know what users need as states

### 1.3.0
* (foxriver76) introducing new state with configuration information (supported on :8080 API)

### 1.2.0
* (foxriver76) support of another sonnen api

### 1.1.2
* (foxriver76) bugfix for control states

### 1.1.1
* (foxriver76) add compact mode compatibility

### 1.0.2
* (foxriver76) use adapter-core module

### 1.0.1
* (foxriver76) take timezone offset into account on time states

### 1.0.0
* (foxriver76) formal version increment

### 0.0.8
* (foxriver76) Enhanced debug logging
* (foxriver76) Prevent crashing when a return code is received

### 0.0.7
* (foxriver76) Only set info.connection on change

### 0.0.6
* (foxriver76) Only set states if request was successfull --> prevents adapter crash

### 0.0.5
* (foxriver76) translations on index_m.html
* (foxriver76) use 7000 as interval if poll interval is undefined

### 0.0.3
* (foxriver76) fixed links to bugs, repo etc

### 0.0.2
* (foxriver76) bugfixes on control states
* (foxriver76) big readme update
* (foxriver76) addded more states
* (foxriver76) added advanced settings

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Moritz Heusinger <moritz.heusinger@gmail.com>

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