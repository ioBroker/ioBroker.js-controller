---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rpi2/README.md
title: 无题
hash: LuTrQrlZ5YW5/rS6OYyVphiuYRKeh2CH3Y22fvNr/zQ=
---
![商标](../../../en/adapterref/iobroker.rpi2/admin/rpi.png)ioBroker RPI监视器适配器

![安装数量](http://iobroker.live/badges/rpi2-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.rpi2.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.rpi2.svg)
![NPM](https://nodei.co/npm/iobroker.rpi2.png?downloads=true)

==============

用于集成到ioBroker中的RPI-Monitor实现。与iobroker.rpi的实现相同，但具有GPIO。

##重要信息
仅适用于节点> = 0.12

** ioBroker需要特殊权限才能控制GPIO。**在大多数Linux发行版中，可以通过将ioBroker用户添加到`gpio`组（推荐）或在`root`下运行ioBroker（不太安全）来实现。

##安装
安装后，您必须通过管理页面配置所有必需的模块。

在启动iobroker.rpi之后，所有选定的模块都会在ioBroker中的rpi中生成一个对象树。<instance>。<modulename>例如rpi.0.cpu

确保已安装python和build-essential：

```
sudo apt-get update
sudo apt-get install -y build-essential python
```

选择后可以使用以下对象：

＃＃＃＃ **中央处理器**
-cpu_frequency
-负载1
-负载5
-负载15

#### ** Raspberry（需要vcgencmd）**
-cpu_voltage
-mem_arm
-mem_gpu

#### **内存**
-memory_available
-memory_free
-memory_total

#### **网络（eth0）**
-net_received
-net_send

＃＃＃＃ **SD卡**
-sdcard_boot_total
-sdcard_boot_used
-sdcard_root_total
-sdcard_root_used

#### **交换**
-swap_total
-swap_used

#### **温度**
-soc_temp

#### **正常运行时间**
-正常运行时间

#### **WLAN**
-wifi_received
-wifi_send

##配置
在配置页面上，您可以选择以下模块：

- 中央处理器
- 覆盆子
-记忆
-网络
- SD卡
-交换
-温度
-正常运行时间
-无线局域网

##日志文件/配置设置
＃＃ 特征
＃＃ 去做
##经过测试的硬件
 -Odroid C1
 -树莓派1

## GPIO
您也可以读取和控制GPIO。
您需要做的就是在设置中配置GPIO选项（附加选项卡）。

![通用输入输出](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

启用某些端口后，对象树中会显示以下状态：

-rpi.0.gpio.PORT.state

端口的数量为BCM（片上BroadComm引脚）。您可以使用```gpio readall```获得枚举。
例如PI2：

```
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
|     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
|   2 |   8 |   SDA.1 | ALT0 | 1 |  3 || 4  |   |      | 5V      |     |     |
|   3 |   9 |   SCL.1 | ALT0 | 1 |  5 || 6  |   |      | 0v      |     |     |
|   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |
|     |     |      0v |      |   |  9 || 10 | 1 | IN   | RxD     | 16  | 15  |
|  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
|  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
|  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
|     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
|  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
|   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 1 | IN   | GPIO. 6 | 6   | 25  |
|  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
|     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
|   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
|   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
|   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
|  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
|  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
|  26 |  25 | GPIO.25 |  OUT | 1 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
|     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
```

## DHTxx / AM23xx传感器
您可以从DHT11，DHT22和AM2302温度/湿度传感器中读取。

如[节点DHT传感器](https://www.npmjs.com/package/node-dht-sensor)封装页面中所述，将这种传感器连接到GPIO引脚。可以将多个传感器连接到*多个*引脚（这不是*总线系统），如前所述。

## Changelog

### 1.2.0 (2020-01-17)
- (janfromberlin) GPIO configuration as output with defined initial value
- (foxriver76) No longer use adapter.objects
- (Apollon77) Adjust gpio errors

### 1.1.1
- (Apollon77) Error messages for not existing values are logged only once

### 1.1.0
 - (Apollon77) Nodejs 10 support 

### 1.0.0 (2018-08-20)
 - (bluefox) Admin3 support 

### 0.3.2 (2017-11-29)
 - (Homoran) fixed Mem available readings on Stretch

### 0.3.1 (2017-01-11)
 - (olifre) Fixup swap_used calculation.

### 0.2.2 (2016-12-01)
 - (bluefox) Add GPIO direction indication

### 0.2.2 (2016-11-22)
 - (bluefox) Use BCM enumeration

### 0.2.1 (2016-10-29)
 - (bluefox) fix start of adapter

### 0.2.0 (2016-10-23)
 - (bluefox) just version change

### 0.1.1 (2016-10-13)
 - (bluefox) implement GPIOs control

### 0.0.4 (2016-03-25)
 - (bluefox) Try catch by eval
   (bluefox) do not process if exec fails

### 0.0.3 (2015-12-28)
 - (husky-koglhof) Fixed value calc.
   Set Value to 2 digits

### 0.0.2 (2015-12-26)
 - (husky-koglhof) Workaround for node 0.10.x
 - (bluefox) Some Fixes

### 0.0.1 (2015-12-23)
 - Initial commit. Alpha Version.

## License

Copyright (c) 2015-2020 husky-koglhof <husky.koglhof@icloud.com>

MIT License