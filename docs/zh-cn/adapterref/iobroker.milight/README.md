---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.milight/README.md
title: ioBroker.milight
hash: Ecq04r4TXFjADX8OGk+fwmG2HESTZdjmC1XwtyMIxwg=
---
![商标](../../../en/adapterref/iobroker.milight/admin/easybulb_logo.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.milight.svg)
![下载](https://img.shields.io/npm/dm/iobroker.milight.svg)
![建立状态](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.milight.png?downloads=true)

＃ioBroker.milight
用于ioBroker的适配器，用于LED灯，如milight，easybulb，无限

##安装：
来自npm

```javascript
npm install iobroker.milight
```

来自github的实际版本

```javascript
npm install https://github.com/foxthefox/ioBroker.milight/tarball/master --production
```

##常用设置：
在管理页面中

* IP-Adress->网桥IP
*港口 - >桥港
*延迟之间 -  UDP包之间的延迟 - >毫秒（v5为100毫秒）
* repeatPackage  - >重复次数（v5为1）
*版本的milight协议v5或v6  - >自动设置相应的端口
*更改为白色模式时设置全亮度

##区域中的灯泡类型：
在管理页面中

* basic =仅适用于区域1和v6
* RGBWW =全白色灯泡，带白色LED和色温调节（增加色温意味着冷色调），仅限于v6
* RGB =纯色灯泡，仅适用于1区
* RGBW =带白色LED的彩色灯泡
*白色= WW / CW白色灯泡，带色温调节（增加色温意味着冷色调）

Zone0或ZoneAll可用于向所有4个区域发出命令，适配器在v6中使用base / bridge命令配置，在v5中使用rgbw命令配置。

版本6中的##状态
|可用状态|基本/桥梁|白色| RGB | RGBW | RGBWW |
|:-------------------------------------------:|:--------------------------------:|:------------------------------:|:------------------------------:|:-------------------------------------:|:--------------------------------------:|
| ON / OFF作为开关| state（zone1），function |州（区），功能| state（zone1），function |州（区），功能|州（区），功能|
|按下按钮| on（zone1），native | on（zone），native | on（zone1），native | on（zone），native | on（zone），native |
|关闭按钮| off（zone1），native |关（区），本地| off（zone1），native |关（区），本地|关（区），本地|
| colorMode作为布尔状态| | | | colorMode（0 = nightMode，1 = whiteMode）| colorMode（0 = nightMode，1 = whiteMode）|
| maxWhite作为按钮| | maxBright（区域），原生| | | |
| whiteMode as button | whiteMode（zone1），native | | | whiteMode（zone），native | whiteMode（zone），native |
| nightMode作为按钮| | nightMode（区域），原生| | nightMode（区域），原生| nightMode（区域），原生|
|亮度值（0-100％）|亮度（区域），原生| | |亮度（区域），原生|亮度（区域），原生|
|颜色为3个十六进制值|颜色（区域），原生| |颜色（区域），原生|颜色（区域），原生|颜色（区域），原生|
| rgb作为组合值（＃000000  -  #FFFFFF）| rgb（zone），native | | rgb（zone），native | rgb（zone），native | rgb（zone），native |
|模式为值| mode（zone），native | | | mode（zone），native | mode（zone），native |
| modeSpeedUp as按钮| | modeSpeedUp（zone），native | | modeSpeedUp（zone），native | modeSpeedUp（zone），native |
| modeSpeedDown为按钮| | modeSpeedDown（zone），native | | modeSpeedDown（zone），native | modeSpeedDown（zone），native |
|链接为按钮| | | |链接（区域），原生|链接（区域），原生|
|取消链接作为按钮| | | | unlink（zone），native | unlink（zone），native |
|饱和度为值（0-100％）| | | | |饱和度（区域），原生|
| colorTemp作为值（0-100等于2700K到6500K）| | | | | colorTemp（zone），native |
| brightnessUp as button | brightnessUp（区域），功能| brightnessUp（zone），native | brightnessUp（zone），native | brightnessUp（区域），功能| brightnessUp（区域），功能|
| brightnessDown按钮| brightnessDown（区域），功能| brightnessDown（区域），原生| brightnessDown（区域），原生| brightnessDown（区域），功能| brightnessDown（区域），功能|
| colorUp as button | colorUp（zone），function | | | colorUp（zone），function | colorUp（zone），function |
|颜色向下按钮|颜色向下（区域），功能| |颜色向下（区域），功能|颜色向下（区域），功能| |
| saturationUp as button | | | | | saturationUp（zone），function |
| saturationDown为按钮| | | | | saturationDown（zone），函数|
| colorTempUp as button | | colorTempUp（zone），native | | | colorTempUp（zone），function |
| colorTempDown as button | | colorTempDown（zone），native | | | colorTempDown（zone），函数|
|色调为值（0-360）| | | |色调（区域），功能|色调（区域），功能|

版本5 /版本4中的##状态
|可用状态| RGB |白色| RGBW |
|:---------------------------------------------:|:-----------------------:|:-----------------------:|:----------------------------------------:|
| ON / OFF作为开关|州（区），功能|州（区），功能|州（区），功能|
|按下按钮| on（zone），native | on（zone），native | on（zone），native |
|关闭按钮|关（区），本地|关（区），本地|关（区），本地|
| colorMode作为布尔状态| | | colorMode（0 / hs = whiteMode，1 / ct = color（hue = 55））|
| maxWhite作为按钮| | maxBright（区域），原生| |
| whiteMode as button | | | whiteMode（zone），native |
| nightMode作为按钮| | | nightMode（区域），原生|
|颜色为色调值（0-255）| | |色调，原生|
| rgb作为组合值（＃000000  -  #FFFFFF）| | | rgb，native |
| colorTempUp as button | |温暖，本地人| |
| colorTempDown as button | |冷却器，原生的| |
|亮度值（0-100％）| | |亮度，原生|
|亮度值（0-100％），扩展范围| | | |
| effectModeNext作为按钮| | | effectModeNext，native |
| speedUp as button | speedUp，native | | effectSpeedUp，native |
| speedDown作为按钮| speedDown，native | | effectSpeedDown，native |
| brightUp as button | brightUp，native | brightUp，native | |
| brightDown作为按钮| brightDown，native | brightDown，native | |
| effectModeNext作为按钮| effectSpeedUp，native | | |
| effectModePrev为按钮| effectSpeedDown，native | | |

effectSpeedUp / Down有不同的含义（对于rgb更改模式，对于rgbw它会改变速度）！

##配置：
在适配器版本5的管理页面中也用于v4灯

＃＃ 去做：
* ??

＃＃ 已知的问题：
* ??

## Changelog
### 0.4.0
* compact mode
### 0.3.6
* (foxthefox) node-milight-promise 0.3.1 (former version 0.2.32)

### 0.3.5
* (mrinc)     fix for the v5 color setting (was always blue)
* (foxthefox) nightModeSwitch added on white bulbs for command from Alexa

### 0.3.4
* (foxthefox) adminv3 added

### 0.3.3
* (foxthefox) setting of state after usage of command OFF/ON
* (foxthefox) v6 widget for RGBW; RGBWW mode switch night/weiß instead weiß/farbe
* (foxthefox) v6 widget for RGBW, RGBWW speedup/down correction, no hide of color temp vs. color when switching night/weiß
* (foxthefox) v5 widget for RGBW with color changing to matching the selected color
* (foxthefox) v6 widget for RGBWW with colortemperature changing to matching the selected colortemperature

### 0.3.2
* (foxthefox) V5 uses brightUp/brightDown instead brightnessUp/brightnessDown
* (foxthefox) corrections in V5 for white Commands (cooler/warmer/maxBright)
* (foxthefox) new RGBWW V6 widget
* (foxthefox) update for effects and correctios in RGBW V6 widget
* (foxthefox) added CW/WW widget V4 and V6
* (foxthefox) added disco button in RGBW V4

### 0.3.1
* (bluefox) added checking of methods before calling them

### 0.3.0
* (foxthefox) cleanup of states
* (foxthefox) added white/rgb lamp
* (foxthefox) correction of mismatch RGBW/RGBWW in v6
* (foxthefox) v6 brightness only 0-0x64(100)

### 0.2.2/0.2.1
* (foxthefox) debug messages with v5/v6 prefix; v6 colorset->colormode

### 0.2.0 
* (bluefox) discovery for v6

### 0.1.1
* (foxthefox) switch lamp on with full brightness -> checkbox in admin for v5

### 0.1.0
* (foxthefox) tested with bridge version 4 and protocol version v5
* (bluefox)v6 implementation
* (foxthefox) node-milight-promise 0.0.9
* (foxthefox) jqui widget RGBW lamp

### 0.0.1
* (foxthefox) initial setup

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>