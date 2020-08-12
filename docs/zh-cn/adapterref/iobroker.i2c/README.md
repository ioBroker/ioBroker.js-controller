---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.i2c/README.md
title: 用于I2C的ioBroker适配器
hash: 6LeU2QT3MHsl6Bh2FqtsRihb34PN6QOwp+5QpwhKy9E=
---
![安装数量](http://iobroker.live/badges/i2c-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.i2c.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.i2c.svg)
![特拉维斯](https://img.shields.io/travis/UncleSamSwiss/ioBroker.i2c.svg)
![GitHub问题](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.i2c.svg)

*** **重要更新**

此适配器的开发将于2020年8月**重新开始。敬请关注！

我将首先解决最紧迫的问题，然后再发布新的主要版本，使适配器达到最新的开发标准。
***

![I2C徽标](../../../en/adapterref/iobroker.i2c/admin/i2c.png)

＃用于I2C的ioBroker适配器
使用I2C总线与连接到本地系统的设备进行通信。

此适配器应可在Raspberry Pi，C.H.I.P.，BeagleBone或Intel Edison等Linux板上使用。

##安装
在安装之前，请阅读[i2c总线模块的安装指南](https://www.npmjs.com/package/i2c-bus#installation)。

尤其要确保已在系统上正确配置并启用了I2C（如果需要）：

* [在Raspberry Pi上配置I2C]（https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md）
* [在英特尔Edison Arduino主板上配置I2C]（https://github.com/fivdi/i2c-bus/blob/master/doc/edison-adruino-base-board-i2c.md）

启用并配置I2C之后，可以通过ioBroker Admin安装此适配器：

1.启动适配器（必须运行适配器才能使发现起作用）
2.打开实例配置对话框
3.按下“搜索设备”按钮以发现所有已连接的I2C设备-这需要一些时间，请耐心等待！
4.在各自的选项卡中配置所有找到的设备。
5.保存配置（这将重新启动适配器）

###访问权限问题
根据ioBroker安装的年龄，`iobroker`用户（或在ioBroker运行的任何用户下）可能没有访问I2C的适当权限。

如果已连接设备，但未在配置屏幕中显示该设备，请确保将用户添加到`i2c`组：

```sh
sudo usermod -G i2c iobroker
```

注意：如果没有标准安装，请用运行ioBroker安装的用户替换上述命令中的`iobroker`（检查`ps`）。

##配置
###巴士号码
这是要打开的I2C总线/适配器的编号，/ dev / i2c-0为0，/ dev / i2c-1为1，...

在Raspberry Pi 3上，该值为“ 1”。

##支持的设备
当前支持以下设备。括号中的数字是十六进制格式的设备的已知地址（无读取位）。

### ADS1015（48-4B）
德州仪器（TI）具有内部基准的4个3.3 kSPS，12位ADC。

### ADS1115（48-4B）
德州仪器（TI）4x 860-SPS，16位ADC，具有内部基准。

### BME280（76，77）
博世数字湿度，压力和温度传感器。

### MCP23008 8位I / O扩展器（20-27）
具有串行接口的Microchip 8位I / O扩展器。

### MCP23017 16位I / O扩展器（20-27）
具有串行接口的Microchip 16位I / O扩展器。

### PCF8574 8位I / O扩展器（20-27）
德州仪器（TI）用于I2C总线的远程8位I / O扩展器。

### PCF8574A 8位I / O扩展器（38-3F）
德州仪器（TI）用于I2C总线的远程8位I / O扩展器。

##相容性
兼容性已经过Raspberry Pi 3的测试。

##错误报告和功能请求
请使用GitHub存储库报告任何错误或请求新功能。

如果您需要缺少设备，请提供适配器配置中报告的IC类型（品牌，型号，...）及其地址。

＃＃ 去做
*支持中断而不是仅对MCP230xx和PCF8574进行轮询

＃＃ 谢谢
该项目基于[i2c总线](https://www.npmjs.com/package/i2c-bus)NPM模块。感谢fivdi的出色模块！

##第三方许可
### BME280
BME280代码基于https://github.com/skylarstein/bme280-sensor：

麻省理工学院执照

版权所有（c）2016 Skylar Stein

特此免费授予获得此软件和相关文档文件（“软件”）副本的任何人无限制使用软件的权利，包括但不限于使用，复制，修改，合并的权利，发布，分发，再许可和/或出售本软件的副本，并允许具备本软件的个人这样做，但须符合以下条件：

以上版权声明和本许可声明应包含在本软件的所有副本或大部分内容中。

本软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性，特定目的的适用性和非侵权性的保证。无论是由于软件，使用或其他方式产生的，与之有关或与之有关的合同，侵权或其他形式的任何索赔，损害或其他责任，作者或版权所有者概不负责。软件。

### ADS1x15
ADS1x15代码基于https://github.com/alphacharlie/node-ads1x15/blob/master/index.js

node-ads1x15本身基于https://github.com/adafruit/Adafruit_Python_ADS1x15

MIT许可证（MIT）

版权所有（c）2016 Adafruit Industries

特此免费授予获得此软件和相关文档文件（“软件”）副本的任何人无限制使用软件的权利，包括但不限于使用，复制，修改，合并的权利，发布，分发，再许可和/或出售本软件的副本，并允许具备本软件的个人这样做，但须符合以下条件：

以上版权声明和本许可声明应包含在本软件的所有副本或大部分内容中。

本软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性，特定目的的适用性和非侵权性的保证。无论是由于软件，使用或其他方式产生的，与之有关或与之有关的合同，侵权或其他形式的任何索赔，损害或其他责任，作者或版权所有者概不负责。软件。

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