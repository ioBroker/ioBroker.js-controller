---
BADGE-Build Status Travis: https://travis-ci.org/foxriver76/ioBroker.sonnen.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/9c3a9qlw4ut32hbu/branch/master?svg=true
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-Greenkeeper badge: https://badges.greenkeeper.io/foxriver76/ioBroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonnen/README.md
title: 太阳适配器
hash: cRAG41z6WHo/8QW3c2dIJI3YbUgkBUJZhnQipGRKYaE=
---
![徽标](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

#sun adapter
sonnen适配器允许在ioBroker中集成sonnenBatterie。

##概述
### Sunbattery
使用sonnenBatterie，太阳能系统产生的自发能量可以存储起来供个人使用，并在需要时使用。这使得有可能独立于匿名能源公司，甚至成为一个自给自足的电力生产商。凭借集成的能源管理器，智能高科技电力存储单元可确保以最佳方式为家庭提供自己的电力。
这不仅具有成本效益，而且环保！ sonnenBatterie提供各种灵活的内存模型。

### Sun adapter
太阳适配器可以监视和控制网络中的太阳能电池。 Discovery适配器（TODO：Link）允许在网络上自动找到太阳能电池。 <br/>适配器以对象的形式创建用于监视和控制太阳能电池的状态。大部分状态仅用于监控电池，而在描述某些状态时，可以另外控制电池。

##安装前的先决条件
使用ioBroker操作太阳能电池的先决条件是电工成功安装电池。此外，电池必须与ioBroker位于同一网络中。

###安装
通过ioBroker Admin界面安装适配器的实例。有关必要安装步骤的详细说明，请参见此处（TODO：LINK）。 <br/><br/>完成适配器实例的安装后，将自动打开配置窗口。

##配置
###主要设置窗口
![主要设置](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "主要设置")

|领域|说明|
|:-------------|:-------------|
| IP地址|这里，应指定所需太阳能电池的IP地址 |

###“高级设置”窗口
![高级设置](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "高级设置")

|领域|说明|
|:-------------|:-------------|
|查询间隔|此处可以设置替代值（以毫秒为单位）。在此间隔中，更新太阳能电池的状态 |

完成配置后，将使用`SPEICHERN UND SCHLIEßEN`退出配置对话框。
这将导致随后重新启动适配器。

##实例
适配器的安装在区域`Objekte`中创建了太阳适配器的活动实例。 <br/><br/> ![例](../../../de/adapterref/iobroker.sonnen/media/instance.png "例") <span style="color:grey">*初审*</span>

在ioBroker服务器上，可以创建多个Sun适配器实例。相反，太阳能电池也可以与几台ioBroker服务器一起运行。如果要由一个ioBroker服务器控制多个设备，则应为每个电池创建一个实例。 <br/><br/>适配器是激活还是连接到电池由实例的状态字段的颜色指示。如果鼠标指针指向符号，则显示更详细的信息。

##适配器的对象
在`Objekte`部分中，集线器中适配器识别的所有设备和活动都以树结构列出。另外，还提供关于与集线器的通信是否顺利进行的信息。

![对象](../../../de/adapterref/iobroker.sonnen/media/objects.png "晒黑的物体") <span style="color:grey">*太阳适配器的对象*</span>

随后，对象被分为状态和按钮。由于根据电池有两种不同的API，因此仅创建相应电池支持的状态。
每个数据点都与其关联的数据类型和权限相关联。
权限可以是读（R）和写（W）。每个数据点至少可以被读取（R），而其他数据点也可以被描述。要搜索特定数据点，建议使用组合键“CTRL + F”进行搜索。

###状态
####频道：信息
* info.connection

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔值，如果在ioBroker和电池之间建立连接，则为true。*

* info.lastSync

    |数据类型|授权|
    |:---:|:---:|
    |时间戳| R |

   *只读时间戳，每次更新数据时都会更新。*

* info.configuration

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

   *只读JSON字符串，带有太阳能电池配置信息。*

####频道：状态
* status.consumption

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

   *只读数字值，包含以瓦特为单位的房屋当前消耗量。*

* status.production

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

   *只读数字值，表示光伏系统当前正在生产多少瓦特。*

* status.pacTotal

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

*只读数值，表示逆变器交流电源。
如果该值大于0，则电池放电，值小于0，充电。*

* status.relativeSoc

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

   *只读数字值代表当前电池电量。*

* status.userSoc

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

   *只读数字值代表当前电池电量。*

* status.acFrequency

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

   *只读数字值，代表以赫兹为单位的交流频率。*

* status.acVoltage

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

   *只读数值，表示逆变器的当前AC（AC）电流电压。*

* status.batteryVoltage

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

   *只读数字值，表示电池的当前DC（DC）电压。*

* status.systemTime

    |数据类型|授权|
    |:---:|:---:|
    |日期| R |

   *只读ISO表示电池系统时间的日期。*

* status.systemInstalled

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔值，如果系统安装正确，则为true。*

* status.batteryCharging

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔值。如果太阳能电池正在充电，则情况确实如此。*

* status.flowConsumptionBattery

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔值。如果电池当前正在放电，则情况确实如此。*

* status.flowConsumptionGrid

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔值，如果电源当前来自网格，则为真。*

* status.flowConsumptionProduction

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔值。如果当前直接从光伏系统消耗电力，则情况确实如此。*

* status.flowGridBattery

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔指示器，如果电池当前正通过网络充电，则为真。*

* status.flowProductionBattery

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔值，如果电池当前正通过光伏系统直接充电，则为真。*

* status.flowProductionGrid

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读布尔值，如果当前正在将电源输入网格，则为true。*

* status.gridFeedIn

    |数据类型|授权|
    |:---:|:---:|
    |号码| R |

*只读数值，表示当前输入电网的功率（以瓦特为单位）。
如果该值为正，则当前正在进入电网;如果为负，则将从电网中提取电量。*

####频道：控制
* control.charge

    |数据类型|授权|
    |:---:|:---:|
    |编号| R / W |

   *数值，允许以瓦特为单位设置电池的最大放电量。*

*注意：如果设置了无效值，则无论如何都会确认。该值的确认（确认）仅表示该命令已传输到电池。*

   *实施例：*

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

* control.discharge

    |数据类型|授权|
    |:---:|:---:|
    |编号| R / W |

   *数值，允许以瓦为单位设置电池的最大充电量。*

*注意：如果设置了无效值，则无论如何都会确认。该值的确认（确认）仅表示该命令已传输到电池。*

   *实施例：*

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

## Changelog

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

Copyright (c) 2018-2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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