---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weatherunderground/README.md
title: ioBroker.weatherunderground
hash: mnc1wmBhp/yn5r8AEdq5D7oIQN+glxNL49woG/vU9/o=
---
![商标](../../../en/adapterref/iobroker.weatherunderground/admin/wu.png)

![安装数量](http://iobroker.live/badges/weatherunderground-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.weatherunderground.svg)
![下载](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)
![NPM](https://nodei.co/npm/iobroker.weatherunderground.png?downloads=true)

＃ioBroker.weatherunderground
ioBroker适配器从[天气地下](http://www.wunderground.com/)为您的位置加载24小时天气预报。
适配器加载所有15分钟（默认）每日和每小时预测数据。

##注意事项
您可以使用此适配器提供官方“PWS所有者”API密钥或将API密钥保留为空以使用从WU网页中提取的密钥。

##图标集
使用“Legacy API”时，可以使用一些不同的图标集，如下所示。对于使用新API的usabe，图片名称已更改（请参阅https://docs.google.com/document/d/1dNCf6nF6cjm4oOxQxjtqNuAvG_iEe5f9MQH1xlCeV4s/edit），现在基于数字...可以从例如https://drive.google.com/drive/folders/0B6fWQWXuE09OOWtBOXJNX190TDQ，可用作自定义设置（见下文）。

在适配器设置中，将“自定义图标 - 基本URL”更改为Weatherunderground上可用的图标集之一：（来源：https：//www.wunderground.com/weather/api/d/docs？d = resources / icon-sets ）

|图标集|网址|示例|
| ------------- | -------------------------------- | --------------------- 	|
| 1 | https://icons.wxug.com/i/c/a/ | ![替代文字](https://icons.wxug.com/i/c/a/partlycloudy.gif)|
| 3 | https://icons.wxug.com/i/c/c/ | ![替代文字](https://icons.wxug.com/i/c/c/partlycloudy.gif)|
| 4 | https://icons.wxug.com/i/c/d/ | ![替代文字](https://icons.wxug.com/i/c/d/partlycloudy.gif)|
| 5 | https://icons.wxug.com/i/c/e/ | ![替代文字](https://icons.wxug.com/i/c/e/partlycloudy.gif)|
| 6 | https://icons.wxug.com/i/c/f/ | ![替代文字](https://icons.wxug.com/i/c/f/partlycloudy.gif)|
| 7 | https://icons.wxug.com/i/c/g/ | ![替代文字](https://icons.wxug.com/i/c/g/partlycloudy.gif)|
| 8 | https://icons.wxug.com/i/c/h/ | ![替代文字](https://icons.wxug.com/i/c/h/partlycloudy.gif)|
| 9 | https://icons.wxug.com/i/c/i/ | ![替代文字](https://icons.wxug.com/i/c/i/partlycloudy.gif)|
| 10 | https://icons.wxug.com/i/c/j/ | ![替代文字](https://icons.wxug.com/i/c/j/partlycloudy.gif)|
| 11 | https://icons.wxug.com/i/c/k/ | ![替代文字](https://icons.wxug.com/i/c/k/partlycloudy.gif)|
| 11 | https://icons.wxug.com/i/c/k/ | ！[替代文字]（https://icons.wxug.com/i/c/k/partlycloudy.gif）|

或者您可以使用自己的“自定义”图标，为此，必须在Base-URL目录中提供以下gif文件：

| Day |的图标夜间图标|
| -----------------------------	| ----------------------------- |
| chanceflurries.gif | nt_chanceflurries.gif |
| chancerain.gif | nt_chancerain.gif |
| chancesleet.gif | nt_chancesleet.gif |
| chancesleet.gif | nt_chancesleet.gif |
| chancesnow.gif | nt_chancesnow.gif |
| chancetstorms.gif | nt_chancetstorms.gif |
| chancetstorms.gif | nt_chancetstorms.gif |
| clear.gif | nt_clear.gif |
| cloudy.gif | nt_cloudy.gif |
| flurries.gif | nt_flurries.gif |
| fog.gif | nt_fog.gif |
| hazy.gif | nt_hazy.gif |
| mostlycloudy.gif | nt_mostlycloudy.gif |
| mostlysunny.gif | nt_mostlysunny.gif |
| partlycloudy.gif | nt_partlycloudy.gif |
| partlysunny.gif | nt_partlysunny.gif |
| sleet.gif | nt_sleet.gif |
| rain.gif | nt_rain.gif |
| sleet.gif | nt_sleet.gif |
| partlycloudy.gif | nt_partlycloudy.gif |
| sunny.gif | nt_sunny.gif |
| tstorms.gif | nt_tstorms.gif |
| cloudy.gif | nt_cloudy.gif |

ioBroker论坛中的##（德语）
http://forum.iobroker.org/viewtopic.php?f=20&t=2042&sid=a863d19838bc49439759bef89fcad1c3

＃＃ 去做
编码仍然存在问题。 “äüöß”的地址将显示错误。

## Changelog

### 3.0.8 (2019-03-23)
* (Apollon77) Add additional guidance when location is not found by WU
 
### 3.0.7 (2019-03-22)
* (Apollon77) implement to extract used "legacy" API keys out of WU website to allow restore of functionality for now
* (Apollon77) Also extract API keys for newer API version from website to be usable together with real "PWS owner keys" in future
* (Apollon77) optionally get data using the New APIs (as well as the officially available PWS-Owner APIs as also additional ones to restore functionality)
* (Apollon77) Admin 2 support removed and adapted the Admin 3 texts as needed for now

### 2.0.4 (2018-08-19)
* (René) some typos
* (bluefox) Write only numbers and not strings

### 2.0.3 (2018-07-30)
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.1.2 (2017-11-24)
* (Apollon77) Add option to specify image format for custom image urls

### 1.1.1 (2017-11-08)
* (Apollon77) Optimize API usage by getting all data with one call instead of two
* (Apollon77) Add support for multiple API-Keys

### 1.1.0 (2017-10-30)
* (Apollon77) Add option to overwrite Icon Base URL

### 1.0.8 (2017-07-12)
* (DeepCoreSystem) add 2 current observation values, fixes of some datapoint caps.

### 1.0.7 (2017-06-19)
* (Dutchman) add Dutch language suppport

### 1.0.6 (2017-05-16)
* (Rene) bug fixing
	+ all 4 sets are enabled as default
	+ change of checkbox enables saves button

### 1.0.5 (2017-05-14)
* (Rene) hourly forecast extend to 36h

### 1.0.4 (2017-04-09)
* (Rene) parse much more data
   + today's 24 h
   + next 4 days / nights as text
   + next 4 days
   + current values
   each can be enabled or disabled

### 1.0.3 (2016-11-01)
* (bluefox) Catch parse errors

### 1.0.2 (2016-10-29)
* (Apollon77) make sure precip values are always integers

### 1.0.1 (2016-07-21)
* (jens-maus) conversion from feet to meter for observation_location

### 1.0.0 (2016-07-12)
* (Apollon77) add daily rain level forecast

### 0.2.0 (2016-07-01)
* (Apollon77) Add Error handling and station-usage for forcasts

### 0.1.1 (2016-06-07)
* (ploebb) Fix forecast api URL

### 0.1.0 (2016-05-07)
* (bluefox) convert text to floats
* (bluefox) support languages

### 0.0.5
corrected humidity value within current weather info (slice + unit)

### 0.0.4
checking for spaces in location
added current conditions

### 0.0.3
bugfix in summed pop-value.

### 0.0.2
config dialog fixed

### 0.0.1
initial release with all basics to load WU-forecast data

## License

The MIT License (MIT)

Copyright (c) 2015-2019 dschaedl <daniel.schaedler@gmail.com>

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