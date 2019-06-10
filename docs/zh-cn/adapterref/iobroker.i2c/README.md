---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.i2c/README.md
title: 适用于I2C的ioBroker适配器
hash: ocC9nqbL123YC+GBR5buH+n/3DyLEAD504/VHnXn6B4=
---
![I2C徽标](../../../en/adapterref/iobroker.i2c/admin/i2c.png)

![安装数量](http://iobroker.live/badges/i2c-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.i2c.svg)
![下载](https://img.shields.io/npm/dm/iobroker.i2c.svg)
![特拉维斯](https://img.shields.io/travis/UncleSamSwiss/ioBroker.i2c.svg)
![GitHub问题](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.i2c.svg)

#ioBroker适配器用于I2C
使用I2C总线与连接到本地系统的设备进行通信。

此适配器应适用于Raspberry Pi，C.H.I.P。，BeagleBone或Intel Edison等Linux主板。

##安装
在安装之前，请阅读[i2c总线模块的安装指南](https://www.npmjs.com/package/i2c-bus#installation)。

特别要确保您已在系统上正确配置并启用了I2C（如果需要）：

* [在Raspberry Pi上配置I2C]（https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md）
* [在英特尔Edison Arduino基板上配置I2C]（https://github.com/fivdi/i2c-bus/blob/master/doc/edison-adruino-base-board-i2c.md）

启用并配置I2C后，可以通过ioBroker Admin安装此适配器：

1.启动适配器（它必须运行才能使发现工作）
2.打开实例配置对话框
3.按“搜索设备”按钮以发现所有连接的I2C设备 - 这需要一些时间，请耐心等待！
4.在各自的选项卡中配置所有找到的设备。
5.保存配置（这将重新启动适配器）

###访问权限问题
根据您的ioBroker安装的年龄，`iobroker`用户（或在运行的任何用户ioBroker下）可能没有访问I2C的适当权限。

如果您已连接设备且未在配置屏幕中显示，请确保将用户添加到`i2c`组：

```sh
sudo usermod -G i2c iobroker
```

注意：如果没有标准安装，请将上述命令中的`iobroker`替换为运行ioBroker安装的用户（请参阅`ps`）。

##配置
###公交车号码
这是要打开的I2C总线/适配器的编号，0表示/ dev / i2c-0,1表示/ dev / i2c-1，...

在Raspberry Pi 3上，这是“1”。

##支持的设备
目前支持以下设备。括号中的数字是十六进制格式的设备的已知地址（没有读取位）。

### ADS1015（48-4B）
德州仪器（TI）4x 3.3 kSPS，12位ADC，内置基准电压源。

### ADS1115（48-4B）
德州仪器（TI）4x 860-SPS，16位ADC，内置基准电压源。

### BME280（76,77）
博世数字湿度，压力和温度传感器。

### MCP23008 8位I / O扩展器（20-27）
具有串行接口的Microchip 8位I / O扩展器。

### MCP23017 16位I / O扩展器（20-27）
具有串行接口的Microchip 16位I / O扩展器。

### PCF8574 8位I / O扩展器（20-27）
用于I2C总线的德州仪器远程8位I / O扩展器。

### PCF8574A 8位I / O扩展器（38-3F）
用于I2C总线的德州仪器远程8位I / O扩展器。

##兼容性
已经使用Raspberry Pi 3测试了兼容性。

##错误报告和功能请求
请使用GitHub存储库报告任何错误或请求新功能。

如果您需要遗漏，请提供适配器配置中报告的IC类型（品牌，型号，......）及其地址。

＃＃ 去做
*支持中断，而不是仅轮询MCP230xx和PCF8574

＃＃ 谢谢
该项目基于[I2C总线](https://www.npmjs.com/package/i2c-bus)NPM模块。感谢fivdi的出色模块！

##第三方许可
### BME280
BME280代码基于https://github.com/skylarstein/bme280-sensor：

MIT许可证

版权所有（c）2016 Skylar Stein

特此授予任何获得本软件和相关文档文件（“软件”）副本的人免费许可，以无限制地交易本软件，包括但不限于使用，复制，修改，合并的权利根据以下条件，出版，分发，再许可和/或出售本软件的副本，并允许向其提供本软件的人员这样做：

上述版权声明和本许可声明应包含在本软件的所有副本或实质部分中。

本软件按“原样”提供，不提供任何明示或暗示的保证，包括但不限于适销性，特定用途的适用性和不侵权的保证。在任何情况下，作者或版权所有者均不对任何索赔，损害或其他责任承担任何责任，无论是在合同，侵权行为还是其他方面的行为，由本软件引起或与之相关，或与本软件的使用或其他交易有关。软件。

### ADS1x15
ADS1x15代码基于https://github.com/alphacharlie/node-ads1x15/blob/master/index.js

node-ads1x15本身基于https://github.com/adafruit/Adafruit_Python_ADS1x15

麻省理工学院许可证（MIT）

版权所有（c）2016 Adafruit Industries

特此授予任何获得本软件和相关文档文件（“软件”）副本的人免费许可，以无限制地交易本软件，包括但不限于使用，复制，修改，合并的权利根据以下条件，出版，分发，再许可和/或出售本软件的副本，并允许向其提供本软件的人员这样做：

上述版权声明和本许可声明应包含在本软件的所有副本或实质部分中。

本软件按“原样”提供，不提供任何明示或暗示的保证，包括但不限于适销性，特定用途的适用性和不侵权的保证。在任何情况下，作者或版权所有者均不对任何索赔，损害或其他责任承担任何责任，无论是在合同，侵权行为还是其他方面的行为，由本软件引起或与之相关，或与本软件的使用或其他交易有关。软件。

## Changelog

### 0.0.6 (2019-03-17)
* (UncleSamSwiss) Added support for BME280.
* (UncleSamSwiss) Added support for ADS1015 / ADS1115.

### 0.0.5 (2019-01-12)
* (UncleSamSwiss) Added support for MCP23008.

### 0.0.4 (2018-07-23)
* (UncleSamSwiss) Improved stability of MCP23017.
* (Apollon77) Latest ioBroker utils and testing including node 10.

### 0.0.3 (2017-11-12)
* (UncleSamSwiss) Added support for MCP23017.

### 0.0.2 (2017-07-30)
* (UncleSamSwiss) Added support for inverting PCF8574 inputs and outputs.

### 0.0.1 (2017-07-27)
* (UncleSamSwiss) Initial version