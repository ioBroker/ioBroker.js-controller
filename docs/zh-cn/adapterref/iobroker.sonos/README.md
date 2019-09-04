---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonos/README.md
title: ioBroker.sonos
hash: mmZYqCeLZ17CE0iJUzEBUkEQCTYS3BGyPlOoGn9mZJA=
---
![商标](../../../en/adapterref/iobroker.sonos/admin/sonos.png)

![安装数量](http://iobroker.live/badges/sonos-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sonos.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sonos.svg)
![NPM](https://nodei.co/npm/iobroker.sonos.png?downloads=true)

＃ioBroker.sonos
使用ioBroker控制和监控SONOS设备。

##处理组
*处理SONOS组的国家：
  * **coordinator`** *：设置/获取协调器，因此SONOS设备是主设备并协调组。它需要SONOS设备的IP地址（通道名称）作为协调器，但是使用下划线`_`而不是点`.`，因此使用例如`192_168_0_100`来获取IP地址`192.168.0.100`。如果设备不属于任何组，则该值等于自己的通道名称（IP）。
  * **group_volume`** *：组的音量
  * **group_muted`** *：组的静音状态。
   * **`add_to_group` **：将某个SONOS设备添加到此状态所在的SONOS设备。使用带下划线的IP地址（见上文）。
   * **`remove_from_group` **：从SONOS设备中删除某个SONOS设备，此设备处于此状态。使用带下划线的IP地址（见上文）。

*）如果在SONOS应用程序中进行了更改，这些状态将会更新。

##与sayit适配器一起使用
使用[sayit adapter]（https://github.com/ioBroker/ioBroker.sayit）与这个SONOS适配器，确保[web适配器]](https://github.com/ioBroker/ioBroker.web)也是实例化并运行的。需要Web适配器才允许SONOS适配器从sayit适配器读取生成的MP3文件。

###警告：与sayit适配器组合的稳定性问题
请注意：如果在sayit适配器上使用“text to speech”，则此SONOS适配器会出现稳定性问题。观察到的症状：

1.任意改变音量为0或100％。
2.随机数量的文本到语音序列后没有响应

文本到语音的解决方法是使用[SONOS HTTP API](https://github.com/jishi/node-sonos-http-api)。

＃＃ 去做
*显示带盖的队列

##配置
 -  Web服务器 -  [可选]如果启用了Web服务器
 - 端口 - 如果启用了Web服务器，则为此端口。默认8083
 - 更新经过时间（ms） - 以毫秒为单位的间隔，以播放标题时更新已用定时器的频率。 （默认2000）

## Changelog
### 2.0.0 (2019-08-13)
* (bluefox) no web server any more
* (bluefox) update all used npm packages

### 1.8.0 (2019-01-04)
* (bluefox) Support js-controller compact mode

### 1.7.7 (2018-08-06)
* (bluefox) Fixed error with node.js 6

### 1.7.5 (2018-08-06)
* (bluefox) Trying to correct fade-out

### 1.7.4 (2018-07-23)
* (bluefox) The group volume has a valid role now
* (bluefox) Important changes: state cover.png renamed to "cover_png"
* (bluefox) added shuffle, repeat and crossfade modes. To enable it you must delete device from list and add it again
* (bluefox) better icon
* (bluefox) fix fade out option

### 1.7.1 (2018-07-17)
* (bluefox) Ready for npm6

### 1.7.0 (2018-07-16)
* (bluefox) Added the support of Admin3

### 1.6.2 (2017-08-16)
* (soef) no duration/elapsed update on radio

### 1.6.0 (2017-04-09)
* (justr1) Enhance group Handling

### 1.5.0 (2017-02-23)
* (bluefox) use new configuration dialog

### 1.4.4 (2017-01-29)
* (soef) removeFromGroup extended

### 1.4.3 (2017-01-08)
* (bluefox) Allow to use the sonos web via with proxy

### 1.4.2 (2016-12-29)
* (bluefox) add states for vis control and change some roles

### 1.3.1 (2016-12-27)
* (bluefox) Fix TTS if fade was 0

### 1.3.0 (2016-12-13)
* (bluefox) Fix api changes of SONOS module

### 1.2.1 (2016-12-10)
* (bluefox) add web adapter as dependency

### 1.2.0 (2016-10-25)
* (bluefox) tts was rewritten because of new sonos-discovery interface

### 1.1.0 (2016-10-20)
* (bluefox) update sonos npm packets
* (bluefox) configurable fadeIn and fadeOut

### 1.0.0 (2016-10-16)
* (bluefox) fix fade out

### 0.2.2 (2016-09-30)
* (bluefox) fix types of states

### 0.2.1 (2016-09-25)
* (soef) fixed restore of radio after sayIt

### 0.2.0 (2016-07-28)
* (soef) fixed restore of radio after sayIt
* (bluefox) fix log outputs
* (bluefox) update libraries and use fix versions of it

### 0.1.10 (2016-05-26)
* (bluefox) check type of "state"

### 0.1.9 (2016-05-20)
* (bluefox) change default port to 8080

### 0.1.8 (2016-02-22)
* (hagen) - Better handling of radio stations (show -> album, streamInfo -> artist)
* (hagen) New state 'current_type' to tell if a track or radio is playing
* (hagen) (Hopefully) fixed the unreliable cover art update

### 0.1.7 (2015-09-14)
* (bluefox) fix favorites set

### 0.1.6 (2015-02-25)
* (bluefox) implement tts if radio is playing

### 0.1.5 (2015-02-13)
* (bluefox) set volume by TTS

### 0.1.4 (2015-01-04)
* (bluefox) catch errors if states deleted

### 0.1.3 (2015-01-02)
* (bluefox) enable npm install

### 0.1.2 (2014-12-12)
* (bluefox) redirect logging messages to ioBroker

### 0.1.1 (2014-12-04)
* (bluefox) translate grid in config dialog

### 0.1.0 (2014-12-04)
* (bluefox) use sonos-web-controller module as tarball from git

### 0.0.5 (2014-11-24)
* (bluefox) support of new naming concept


### 0.0.4 (2014-11-22)
* (bluefox) support of text to speech

### 0.0.3 (2014-11-01)
* (bluefox) support of text to speech and cover image

### 0.0.2 (2014-11-01)
* (bluefox) improve configuration edit

## License

The MIT License (MIT)

Copyright (c) 2014-2019, bluefox <dogafox@gmail.com>

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