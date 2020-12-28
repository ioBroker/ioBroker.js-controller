---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weatherunderground/README.md
title: ioBroker.weatherunderground
hash: KQBKAuXaHZmK2XRbNAt/ff0+mkMYDLf0Ao3vFnFby04=
---
![商标](../../../en/adapterref/iobroker.weatherunderground/admin/wu.png)

![安装数量](http://iobroker.live/badges/weatherunderground-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.weatherunderground.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)
![NPM](https://nodei.co/npm/iobroker.weatherunderground.png?downloads=true)

＃ioBroker.weatherunderground
**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

ioBroker适配器可从[地下天气](http://www.wunderground.com/)加载您所在位置的24小时天气预报。
适配器将加载所有15分钟（默认）的每日和每小时预测数据。

##注意
您可以在提供官方“ PWS所有者” API密钥的情况下使用此适配器，也可以将API密钥留空以使用从WU网页中提取的密钥。

##图标集
使用“旧版API”时，有一些不同的图标集可用，请参见下文。对于使用新API的美国，图片名称已更改（请参阅https://docs.google.com/document/d/1dNCf6nF6cjm4oOxQxjtqNuAvG_iEe5f9MQH1xlCeV4s/edit），并且现在是基于编号的...可以从例如下载。 https://drive.google.com/drive/folders/0B6fWQWXuE09OOWtBOXJNX190TDQ，可以用作自定义设置（请参见下文）。

在“适配器设置”中，将“自定义图标库URL”更改为Weatherunderground上可用的图标集之一：（来源：https：//www.wunderground.com/weather/api/d/docs？d = resources / icon-sets ）

|图标集|网址|例子 |
| ------------- | -------------------------------- | --------------------- 	|
| 1 | https://icons.wxug.com/i/c/a/ | ![替代文字](https://icons.wxug.com/i/c/a/partlycloudy.gif)|
| 3 | https://icons.wxug.com/i/c/c/ | ![替代文字](https://icons.wxug.com/i/c/c/partlycloudy.gif)|
| 4 | https://icons.wxug.com/i/c/d/ | ![替代文字](https://icons.wxug.com/i/c/d/partlycloudy.gif)|
| 5 | https://icons.wxug.com/i/c/e/ | ![替代文字](https://icons.wxug.com/i/c/e/partlycloudy.gif)|
| 6 | https://icons.wxug.com/i/c/f/ | ![替代文字](https://icons.wxug.com/i/c/f/partlycloudy.gif)|
| 7 | https://icons.wxug.com/i/c/g/ | ![替代文字](https://icons.wxug.com/i/c/g/partlycloudy.gif)|
| 8 | https://icons.wxug.com/i/c/h/ | | ![替代文字](https://icons.wxug.com/i/c/h/partlycloudy.gif)|
| 9 | https://icons.wxug.com/i/c/i/ | ![替代文字](https://icons.wxug.com/i/c/i/partlycloudy.gif)|
| 10 | https://icons.wxug.com/i/c/j/ | ![替代文字](https://icons.wxug.com/i/c/j/partlycloudy.gif)|
| 11 | https://icons.wxug.com/i/c/k/ | ![替代文字](https://icons.wxug.com/i/c/k/partlycloudy.gif)|
| 11 | https://icons.wxug.com/i/c/k/ | ！[替代文字]（https://icons.wxug.com/i/c/k/partlycloudy.gif）|

或者，您也可以使用自己的“自定义”图标，为此，必须在Base-URL目录中提供以下gif文件：

|一天的图标|晚上的图标|
| -----------------------------	| ----------------------------- |
| chanceflurries.gif | nt_chanceflurries.gif |
| chancerain.gif | nt_chancerain.gif |
| chancesleet.gif | nt_chancesleet.gif |
| chancesleet.gif | nt_chancesleet.gif |
| chancesnow.gif | nt_chancesnow.gif |
| chancetstorms.gif | nt_chancetstorms.gif |
| chancetstorms.gif | nt_chancetstorms.gif |
| clear.gif | nt_clear.gif |
| cloud.gif | nt_cloudy.gif |
| flurries.gif | nt_flurries.gif |
| fog.gif | nt_fog.gif |
| hazy.gif | nt_hazy.gif |
| mostcloudy.gif | nt_mostlycloudy.gif |
| mostsunny.gif | nt_mostlysunny.gif |
| partlycloudy.gif | nt_partlycloudy.gif |
| partlysunny.gif | nt_partlysunny.gif |
| sleet.gif | nt_sleet.gif |
| rain.gif | nt_rain.gif |
| sleet.gif | nt_sleet.gif |
| partlycloudy.gif | nt_partlycloudy.gif |
| sunny.gif | nt_sunny.gif |
| tstorms.gif | nt_tstorms.gif |
| cloud.gif | nt_cloudy.gif |

ioBroker论坛中的##（德语）
http://forum.iobroker.org/viewtopic.php?f=20&t=2042&sid=a863d19838bc49439759bef89fcad1c3

＃＃ 去做
编码仍然存在问题。带“äüöß”的地址将显示错误。

## Changelog

### 3.2.5 (2020-12-27)
* (Apollon77) Prevent crash case (Sentry IOBROKER-WEATHERUNDERGROUND-1, IOBROKER-WEATHERUNDERGROUND-2)

### 3.2.3 (2020-12-26)
* (Apollon77) make sure adapter do not crash when no data could be read
* (Apollon77) Add Sentry error reporting

### 3.2.2 (2020-12-02)
* (Apollon77) icons sometimes did not have a correct extension
* (Apollon77) Correct some cases with different types of locations when reading data

### 3.2.1
* (raintonr) Corrected 'Imperial' terminology.

### 3.2.0 (2019-12-28)
* (StrathCole) fix forecast expiry time
* (StrathCole) add visibility index to objects on hourly forecast

### 3.1.6 (2019-10-16)
* (Bjoern3003) adjust to WU changes, now v3 API for hourly data
* (Apollon77) run once after installation/update
 
### 3.1.3
* (Apollon77) text correction
 
### 3.1.2 (2019-07-27)
* (Apollon77) use new parameters to get decimal precision values
 
### 3.1.1 (2019-07-14)
* (Apollon77) add windDirection as string calculated based on degrees
 
### 3.1.0 (2019-07-12)
* (Apollon77) remove option for legacy API because disabled by WU
 
### 3.0.14 (2019-07-11)
* (Apollon77) optimize checking of pws station id
 
### 3.0.13 (2019-07-10)
* (Apollon77) Fix error in image url handling
 
### 3.0.11/12 (2019-07-09)
* (Apollon77) Re-Fetch PWS station key on Error 401
 
### 3.0.10 (2019-05-27)
* (Apollon77) Adopt logic to WU changes
 
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

Copyright (c) 2015-2020 dschaedl <daniel.schaedler@gmail.com>

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