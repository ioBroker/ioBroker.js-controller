---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fhem/README.md
title: ioBroker.fhem
hash: N5iJnz+zMACr/jOpD4kKZSjgK6n51TAKFE52hRcrxjE=
---
![商标](../../../en/adapterref/iobroker.fhem/admin/fhem.png)

![安装数量](http://iobroker.live/badges/fhem-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.fhem.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fhem.svg)
![NPM](https://nodei.co/npm/iobroker.fhem.png?downloads=true)

＃ioBroker.fhem =================
此适配器允许将FHEM连接到ioBroker。

要启用连接，必须在FHEM中启用telnet。要启用它（默认启用），请检查fhen.cfg中的以下设置：

```
define telnetPort telnet 7072 global
```

应该使用完全相同的端口和FHEM主机的IP地址（或者如果FHEM和ioBroker在同一台PC上运行，则为localhost）来设置适配器。

ioBroker在启动时发送“jsonlist2”命令以从列表中获取所有“读数”。

##支持的设备
通常，所有设备都受支持。但其中一些更好地整合。

特别是通过控制状态出现问题。
因为没有明确的属性结构，ioBroker会尝试猜测可以使用哪个“PossibleSets”字段。
实际上只支持以下属性：

 -  RGB：如果RGB存在于* PossibleSets *和* Readings *中，它将合并为一个可以读写的状态。像``＃234567```这样的值会自动转换为```234567```。
 - 关闭状态：如果* **和**关**存在* PossibleSets *和**状态** * Readings *中，它将合并为名称**状态**下的开启状态。它可以用true和false控制，命令将改为```set DEVICE on```和```set DEVICE off```。

##功能和用法
*如果FHEM中存在“ioBroker”房间，则只会同步此对象
*同步后，FHEM未使用的对象将被自动删除。
* TYPE，NAME，PORT，manufacturername，modelid，swversion等内部组件将被同步（role = value.xxx）
*房间，别名，禁用，评论等属性将同步，并且可以在ioBroker中编辑属性。 （角色= state.xxx）
*在同步期间设置角色和其他
  *任何PossibleSets的读数xxx都将设置为role = state.xxx
  *没有PossibleSets的读数xxx将设置为role = value.xxx
  *带有PossibleSets“noArg”的读数xxx将设置为role = button.xxx
  *带有PossibleSets“slider”的读数xxx将设置为role = level.xxx，min = slider（min），max = slider（max）
  *读数“desired-temp”将设置为role = level.temperature，min = 5，max = 35，unit =°C。
  *读数“pct，brightness，dim”将设置为role = level.dimmer，min = 0，max = 100，unit =％
  *读数“Volume，volume，GroupVolume”将设置为role = level.volume，min = 0，max = 100，unit =％
  *读数“GroupVolume”将设置为role = level.volume.group，min = 0，max = 100，unit =％
* Smart Adapter for Cloud Adapter将自动设置别名或名称（仅限fhem.0和具有role = level.temperature，level.dim，level.volume的对象）

## Changelog
### 1.1.0 (2018-10-22)
* (LausiD) Big changes

### 1.0.0 (2018-10-15)
* (LausiD) Min/max were defined as number

### 0.5.6 (2018-09-09)
* (LausiD) Some roles were updated

### 0.5.5 (2018-08-22)
* (LausiD) Several fixes and changes
* (bluefox) Admin3

### 0.5.0 (2018-04-29)
* (LausiD) Several fixes and changes

### 0.4.2 (2018-04-15)
* (TonyBostonTB) Fix wordings

### 0.4.1 (2017-04-14)
* (bluefox) add link to FHEM im admin

### 0.4.0 (2017-03-12)
* (LausiD) fix some types
* (bluefox) define custom prompt

### 0.3.0 (2017-02-25)
 * (LausiD) fix some types
 * (bluefox) add password for telnet

### 0.2.2 (2016-06-17)
* (bluefox) implement On/Off state and fix RGB
* (bluefox) add debug output by control

### 0.2.1 (2016-06-12)
* (bluefox) support of RGB values for control

### 0.2.0
* (bluefox) implemented write
* (bluefox) try to read meta information if unknown event received

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2018 bluefox <dogafox@gmail.com>

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