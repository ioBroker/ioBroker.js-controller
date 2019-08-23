---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: apV/B74CjZZUMKx+MC9nfCoMdKN4fZnzSlibWD1ycMc=
---
![商标](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![安装数量](http://iobroker.live/badges/jeelink-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.jeelink.svg)
![建立状态](https://travis-ci.org/foxthefox/ioBroker.jeelink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.jeelink.png?downloads=true)

＃ioBroker.jeelink
这是ioBroker通过Jeelink集成RFM12B / RFM69的适配器。
jeelink可以与预装软件（rfmdemo）一起用于读取openenergy传感器（emon）。
对于LaCrosse传感器的使用，必须更换固件（参见iobroker论坛）。

##安装：
###发布的版本
```javascript
npm install iobroker.jeelink
```

在树莓上它可能有助于使用：

```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```

 因为serialport包必须建立在不支持的arm-hw上

###来自github的实际开发版本（在测试时，可能无效！）
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

要么

```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

##设置：
 -  JeelinkAdapter的USB端口通常是/ dev / ttyACME
 - 串行速度通常为57600波特

##配置：
在管理员中完成

* USB端口的定义
*设置波特率
 - 定义在空中接收的传感器地址
 - 在适配器中定义唯一的传感器地址（更换电池后，LaCrosse会更改播出地址，因此请在更换电池后观察日志并调整传感器地址）
 - 定义传感器的类型（见下面的例子）
 - 定义房间

##传感器
|对象|设备变体|电报示例|描述|
|--------|-------|:-:|--------|
| emonTH | emonTH | OK 19 ... |来自openenergy.org的传感器|
| emonWater | emonWater | OK 21 ... |带RFM12B的传感器用于水计量|
| LaCrosseDTH | TX | OK 9 ... |传感器来自LaCrosse，technoline |
| LaCrosseDTT | TX | OK 9 ... |来自LaCrosse的传感器，technoline双温度|
| HMS100TF | TXH29DTH-IT | H00 ... |传感器技术|
| LaCrosseBMP180 || OK WS ... | sensor mod，superjee |
| LaCrosseWS | WS1080，TX22，WS1600 | OK WS ... |气象站|
| EC3000 | EC3000 | OK 22 ... |电能表|
| EMT7110 | EMT7110 | OK EMT7110 ...... |电能表|
| level | level | OK LS ... | level sensor |

＃＃ 去做：
*其他传感器类型
*将传感器代码放在单独的文件中
*将新传感器推送到配置，然后在admin / config页面中显示
* HMS100TF温度低于0°C且电池电量低

## Changelog
### 0.1.3
* (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2
* correction for weather (no data is given by value = 255)

### 0.1.1
* delete buffer function to be compatible with nodejs10
* enhanced automatic testing

### 0.1.0
* compact mode

### 0.0.7
* new level sensor (fhem)

### 0.0.6
* last version of serialport
* new sensor TXH29DTH-IT
* new weather station WS1600
* new sensor EC3000, EMT7110 not verified with life data

### 0.0.5
* adminv3 improved with values2table

### 0.0.4
* command to USB-stick for configuration
* added superjee, BMP180 sensor on jeenode
* admin v3 implementation

### 0.0.3
* abs humidity and dewpoint calculation

### 0.0.2
* definition of unique sensor ID for iobroker datapoint
* implementation of LaCrosseDTH
* definition of sensors via admin

### 0.0.1
* working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>