---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla电机
hash: exSkZOo4rWuvSAZ3ldy3L4RuQ0nnHcTQRqgG2X6mVj8=
---
![商标](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![已安装](http://iobroker.live/badges/tesla-motors-installed.svg)
![依赖状态](https://img.shields.io/david/dbweb-ch/iobroker.tesla-motors.svg)
![已知漏洞](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors/badge.svg)
![建立状态](http://img.shields.io/travis/dbweb-ch/ioBroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

＃ioBroker.tesla-motors
##特斯拉电机适配器（适用于ioBroker）
该适配器可将对您的Tesla汽车的控制权添加到ioBroker。

##配置
1.创建适配器的新实例，每个汽车都需要自己的实例。
2.选择您喜欢的刷新率（请参阅[刷新率]（＃refreshRate））
2.输入您的Tesla用户名和Tesla密码。
3.单击“获取令牌”以从特斯拉请求令牌和刷新令牌。
4.在下拉列表中选择您的汽车。

###<a name="refreshRate"></a>刷新率
为了节省电池，汽车会在一段时间没有活动后进入睡眠模式。<br />仅在汽车醒着时才能从汽车获取信息。<br />用户报告说，如果汽车不进入睡眠状态，则每天最多可以消耗10公里的Range。<br />为避免这种情况，您可以选择所需的刷新率：

* **关闭**-适配器不会自动唤醒汽车。它仅在请求时唤醒汽车（如果您设置了状态）。

<br />如果汽车自行醒来，适配器将请求一次汽车数据。

* **温度**-适配器每小时将汽车唤醒一次以获取状态。
* **侵略性**-适配器每分钟唤醒一次汽车。
* **智能**-适配器尝试变得智能。它将观察汽车的睡眠状态。汽车醒来时

它假定某人可能即将开车，并在10分钟内每分钟请求状态。
如果没有任何反应（无气候，无驾驶，无充电），适配器将停止请求15分钟以让汽车进入睡眠状态。无论如何，它将在12小时后唤醒汽车并获取数据。

##使用适配器
适配器创建多个状态。它们按主题分组：

* **chargeState** 关于充电，电池和范围。
* **climateState** 温度和窗口状态。
* **driveState** 位置和速度
* **softwareUpdate** 有关待处理的软件更新的信息
* **车辆**-有关您的车辆的信息

有一个称为“命令”的特殊小组，您可以在其中找到控制您汽车的所有命令。
它们中的一些正在双向工作，例如，当汽车关闭气候时，气候状态将改变。您可以在“发送/接收”列中看到它。

姓名|描述**结束** / **结束** -------------- | -------------- | -------------- ChargePort |打开/关闭充电端口| SR UnlockChargePort |解锁充电端口| S充电|开始/停止充电| SR气候|开始/停止气候SR RemoteStart |激活/停用远程启动| SR SentryMode |启用/停用哨兵模式| SR SetChargeLimit |以％设置费用限制| SR设定温度|设置目标温度。不要忘记打开气候！ | SR SpeedLimit |激活速度限制| SR SpeedLimitValue |限速值| SR StartSoftwareUpdate |开始软件更新| SR SunRoofVent |太阳屋顶通风口| SR ValetMode |代客模式| SR ValetPin |代客销| SR待机|如果汽车处于待机状态（将其设置为手动唤醒）| SR门锁|锁/开门| SR手电筒|闪灯| ShonkHorn |鸣喇叭S openFrunk |打开Frunk（未接收）| S openTrunk |打开后备箱（未收到）| S seat_heater_left |座椅加热器左水平（0-3）| SR seat_heater_rear_center |后排中央座椅加热器（0-3）| SR seat_heater_rear_left |左后座椅加热器（0-3）| SR seat_heater_rear_right |右后座椅加热器（0-3）| SR seat_heater_right |座椅加热器右水平（0-3）| SR方向盘加热器|方向盘加热器| SR windowVent |窗户排气| SR

##安全性证书
Tesla API使用基于令牌的安全性方法。<br />令牌将过期（当前在45天后），但是系统可以使用“刷新令牌”来检索新令牌。<br />不必存储凭据即可使适配器正常工作，但是，如果刷新令牌时遇到问题，则可以使适配器更加稳定，因为适配器可以随时获取一个完整的新令牌。<br /><aside class="warning">警告：<br />借助您的Tesla凭证，您可以控制敞篷车，包括打开的Windows甚至在周围行驶。保存您的凭据！<br />要拒绝所有令牌，请更改您的Tesla帐户密码！</aside>

##贡献者
* dbweb-ch
* Apollon77
*霍姆巴赫

## Changelog
### 0.3.0
* (Hombach) Removed tests for node 8; updated dependencies
### 0.2.3
* (dbweb-ch) Refresh info every 5 seconds when car is moving
### 0.2.2
* (dbweb-ch) Use decrypt from ioBrokerTools, fix issue with selecting car
### 0.2.1
* (dbweb-ch) Fix bug with odomoter, refactor object creation, fix issues with compact mode
### 0.2.0
* (dbweb-ch) Included testing
* (dbweb-ch) Encrypt passwords
### 0.1.2
* (dbweb-ch) Added Roles, refactor states. 
* Attention: "awake" replaced by "standby" and inverted!
* Attention: Door lock is inverted.
### 0.1.1
* (dbweb-ch) Fix for Wakeup plan "smart"
### 0.1.0
* (dbweb-ch) Small fixes for Beta-Version release
### 0.0.3
* (dbweb-ch) control all state, added wakeup strategy
### 0.0.2
* (dbweb-ch) added all states
### 0.0.1
* (dbweb-ch) initial release

## License
MIT License

Copyright (c) 2020 Dominic Blattmann <nick@dbweb.ch>

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