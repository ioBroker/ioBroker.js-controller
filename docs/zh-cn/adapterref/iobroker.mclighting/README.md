---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mclighting/README.md
title: ioBroker McLighting适配器
hash: dXdR0TFBVa8nzSi2OtTRjXFxpkRm6+/sy9Bi+JeHlWo=
---
![标识](../../../en/adapterref/iobroker.mclighting/admin/mclighting.png)

![安装数量](http://iobroker.live/badges/mclighting-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.mclighting.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mclighting.svg)
![NPM](https://nodei.co/npm/iobroker.mclighting.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

＃ioBroker McLighting适配器
=================

[![测试]（https://github.com/instalator/iobroker.mclighting/workflows/Test%20and%20Release/badge.svg）](https://github.com/instalator/ioBroker.mclighting/actions/)

## Описание
SP 1/826 WS2811 / WS2812 281 281 E E SP SP SP SP SP SP SP

ЕсливыхотитеиспользоватьRGBW-светодиоды（например，SK6812），подключенныекESP8266，вамнужнавотэтадоработаннаяпрошивка：[McLightingRGBW](https://github.com/FabLab-Luenen/McLighting)ивнастройкахдрайверавыбратьRGBW。

＃＃ 描述
该驱动程序可让您通过固件[McLighting](https://github.com/toblum/McLighting)控制连接到ESP8266的LED WS2811 / WS2812的RGB灯条。

如果要使用连接到ESP8266的RGBW LED（如SK6812），则应使用此fork：[McLightingRGBW](https://github.com/FabLab-Luenen/McLighting)并在适配器配置* RGBW *中进行选择。

＃＃ 使用
###亮度
设置亮度。

其中<brightness>是亮度，值为0-255。

### Speed设置速度。
 其中<speed>是从0到255的速度。

###模式设置模式。
 其中<lightmode>是以下之一：

-熄灭（关闭所有LED。）
-全部（以给定或先前设置的颜色打开所有LED。）
-擦除（以给定或先前设置的颜色打开所有LED，并具有擦除效果。）
-彩虹（开始彩虹效果。）
-rainbowCycle（开始彩虹周期效果。）
-戏剧化（以给定或先前设置的颜色开始戏剧化效果。）
-TheaterchaseRainbow（通过更改颜色开始戏剧效果。）
-电视（启动电视模拟器。）

### Array_RGB（W）
 以给定的颜色点亮多个LED。

```
+[numled][hexrgb(w)]+[numled][hexrgb(w)]+[numled][hexrgb(w)] [...] or
[numled][hexrgb(w)],[numled][hexrgb(w)],[numled][hexrgb(w)],[...]
```

 其中<numled>是led的编号（从00开始），例如01。

 其中<hexrgb>是十六进制的颜色，例如04d2ff。

 例如：+ 09ffffff + 19ff0000或09ffffff，19ff0000

### Color设置灯泡的默认颜色。
 其中<r，g，b（，w）>是作为数字（0-255）的颜色，例如32,3,200（，255）

 如果处于活动模式0（静态）-设置灯泡的默认颜色，并以该颜色点亮所有LED。

### Color_R，color_G，color_B（，color_W）设置灯泡的默认颜色。
 其中<r（g）（b）（w）>是数字（0-255）的颜色，例如154

 如果处于活动模式0（静态）-设置灯泡的默认颜色，并以该颜色点亮所有LED。

### Color_RGB（W）设置灯泡的默认颜色。
 其中<hexrgb（w）>是十六进制的颜色，例如04d2ff

 如果处于活动模式0（静态）-设置灯泡的默认颜色，并以该颜色点亮所有LED。

### list_modes可用动画模式列表，以数组形式。
结果：
```

 {
   "mode": 0,
   "name": "Static"
 },
 {
   "mode": 1,
   "name": "Blink"
 },
 {
   "mode": 2,
   "name": "Breath"
 },
 ...

```

### Range_RGB（W）
 以给定的颜色点亮多个LED范围。

```
R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)] [...] or
[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[...]
```

 其中<rangestart_led>是范围的起始编号（以00开头的数字），例如00

 其中<rangeend_led>是范围的结束号（以00开头的数字），例如09。

 其中<hexrgb（w）>是十六进制的颜色，例如04d2ff。

 可以重复多次。

 示例：R0009ffffffR1019ff0000或0009ffffff，1019ff0000将前10个LED点亮为白色，然后将10个红色点亮

### Set_all_RGB（W）设置灯泡的默认颜色，并以该颜色点亮所有LED。
 其中<hexrgb（w）>是十六进制的颜色，例如04d2ff

### Single_RGB（W）以给定的颜色点亮单个LED。
 其中<numled>是led的编号（从00开始），例如01。

 其中<hexrgb（w）>是十六进制的颜色，例如04d2ff。

### Fx_mode设置动画模式。
 从列表模式打开<animation_mode_id>的位置

### Fx_mode_name当前名称fx_mode

## Changelog

### 0.1.2
* (instalator) change role

### 0.1.1
* (Bluefox) Fix clear timeouts

### 0.1.0
* (instalator) refactoring
* (instalator) added compact mode

### 0.0.12 (2018-12-09)
* (instalator) fix error

### 0.0.11 (2018-10-14)
* (Johannes Jaeger) Add support for RGBW Leds ([McLightingRGBW](https://github.com/FabLab-Luenen/McLighting))
* (Johannes Jaeger) Fix typo for state *rang_RGB* to *range_RGB* !

### 0.0.10 (2018-04-02)
* (instalator) fix error, added ping pong function for reconnect

### 0.0.4 (2018-03-27)
* (instalator) fix error

### 0.0.3 (2018-03-24)
* (instalator) fix error, change README

### 0.0.2 (2018-03-24)
* (instalator) Release version

### 0.0.1 (2018-03-24)
* (instalator) initial

## License

The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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