---
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-Greenkeeper badge: https://badges.greenkeeper.io/foxriver76/ioBroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonnen/README.md
title: 太阳适配器
hash: oMeeAfD4xgO3JYH8YuAPHB25TvMTGYjpiqMBJjHpvLI=
---
![商标](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

＃太阳适配器
sonnen适配器可将sonnenBatterie集成到ioBroker中。

##概述
### Sonnen电池
借助sonnenBatterie，可以存储来自太阳系的自生能量供您自己使用，并在需要时使用。这样就可以独立于匿名的能源公司而成为自给自足的电力生产商。借助集成的能源管理器，智能高科技蓄电技术可确保为家庭提供尽可能最佳的电力。
这不仅价格便宜，而且环保！ sonnenBatterie具有不同的灵活存储模式。

###太阳适配器
Sonnen适配器可以监视和控制网络中的Sonnen电池。使用发现适配器（TODO：链接），可以在网络中自动找到sonnenBatterie。 <br/>适配器以对象形式创建用于监视和控制sonnenBatterie的状态。状态的很大一部分仅用于监视电池，而通过描述某些状态，也可以控制电池。

##安装前的要求
使用ioBroker操作sonnenBatterie的前提是电工要成功安装电池。电池还必须与ioBroker位于同一网络中。

###安装
适配器的实例通过ioBroker管理界面安装。有关必要安装步骤的详细说明，请参见此处（TODO：LINK）。 <br/><br/>适配器实例的安装完成后，配置窗口将自动打开。

##配置
###主设置窗口
![主要设定](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "主要设定")

|领域|描述 |
|:-------------|:-------------|
| | IP地址|所需sonnenBattery的IP地址应在此处指定。 |

###高级设置窗口
![进阶设定](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "进阶设定")

|领域|描述 |
|:-------------|:-------------|
|查询间隔|此处可以以毫秒为单位设置替代值。 sonnenBatterie的状态在此间隔内更新 |

完成配置后，使用`SPEICHERN UND SCHLIEßEN`退出配置对话框。
然后，这将重新启动适配器。

##个实例
适配器的安装已在§SSSSS_0§§部分中创建了Sonnen适配器的活动实例。 <br/><br/> ![实例](../../../de/adapterref/iobroker.sonnen/media/instance.png "实例") <span style="color:grey">*一审*</span>

可以在ioBroker服务器上创建几个Sonnen适配器实例。相反，sonnenBatterie也可以与多个ioBroker服务器一起运行。如果一台ioBroker服务器要控制多个设备，则应为每个电池创建一个实例。 <br/><br/>实例状态字段的颜色指示适配器是已激活还是已连接至电池。如果鼠标指针指向该符号，则会显示更多详细信息。

##适配器的对象
集线器中适配器识别的所有设备和活动均以树形结构列出在`Objekte`区域中。另外，还通知与集线器的通信是否畅通。

![对象](../../../de/adapterref/iobroker.sonnen/media/objects.png "太阳物体") <span style="color:grey">*太阳适配器的对象*</span>

然后将对象分为状态和按钮。由于有两种不同的API取决于电池，因此仅创建相应电池支持的状态。
列出了每个数据点及其关联的数据类型及其授权。
可以读取（R）和写入（W）授权。每个数据点至少可以读取（R），而其他数据点也可以写入。要搜索特定的数据点，我们建议使用“ CTRL + F”组合键。

###状态
####频道：信息
*信息连接

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，当ioBroker与电池之间建立连接时为true。

* info.lastSync

    |数据类型|授权|
    |:---:|:---:|
    |时间戳记| R |

   *仅在每次数据更新时更新的可读时间戳。

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

   *仅可读的JSON字符串，带有来自sonnenBatterie的逆变器信息。

####频道：状态
* status.consumption

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *仅可读的数字值，其中包含房屋的当前功耗（瓦）。

* status.production

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *仅可读的数字值，它指示光伏系统当前正在产生多少瓦特。

* status.pacTotal

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

*只能读取数字值，表示变频器的交流电源。
如果该值大于0，则该电池放电（如果该值小于0）。

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

   *仅可读的数字值，代表变频器的当前AC（交流）电压。

* status.batteryVoltage

    |数据类型|授权|
    |:---:|:---:|
    |号| R |

   *唯一可读的数字值，代表电池的当前DC（直流）电压。

* status.systemTime

    |数据类型|授权|
    |:---:|:---:|
    |日期| R |

   *仅可读的ISO日期，代表电池的系统时间。

* status.system已安装

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，如果系统安装正确，则为true。

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

   *仅可读的布尔值，如果当前正在从网格获取电源，则为true。

* status.flowConsumptionProduction

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值。如果当前光伏系统直接使用电力，这是正确的。

* status.flowGridBattery

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔指示器，如果网络当前正在为电池充电，则为true。

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

*仅可读数字值，表示当前正在馈入或抽取到电网的电量（瓦）。
如果该值为正，则表明当前正在向电网供电；如果该值为负，则从电网中抽取电量。

* status.onlineStatus

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   *仅可读的布尔值，这是真的，sonnenBatterie在线。

####频道：控制
*控制费

    |数据类型|授权|
    |:---:|:---:|
    |号| R / W |

   *数字值，可将电池的最大放电量设置为瓦特。

*注意：如果设置了无效值，则仍将确认。确认该值仅表示该命令已传输到电池。

   *示例：*

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

*控制放电

    |数据类型|授权|
    |:---:|:---:|
    |号| R / W |

   *数字值，可以确定电池的最大电量（瓦）。

*注意：如果设置了无效值，则仍将确认。确认该值仅表示该命令已传输到电池。

   *示例：*

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

## Changelog

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