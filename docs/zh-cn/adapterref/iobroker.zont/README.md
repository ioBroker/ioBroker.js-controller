---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zont/README.md
title: ioBroker.zont
hash: gal4k00yBlWw5UJ9RlEi/ZtSzgCw7ao2fSu9H1qcmfE=
---
![商标](../../../en/adapterref/iobroker.zont/admin/zont.png)

![安装数量](http://iobroker.live/badges/zont-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.zont.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zont.svg)
![测试](https://travis-ci.org/kirovilya/ioBroker.zont.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.zont.png?downloads=true)

＃ioBroker.zont
ioBroker添加了更多信息https://zont-online.ru

АдаптериспользуемZont-apiописанное[здесь](https://zont-online.ru/api/docs/)。
ОнполучаетданныеобустойствахисохраняетихкакСостоянияioBroker。

НекоторыеСостояниямогутизменятьсяпользователемилискриптамиioBroker。 ЗатемониотправляютсяобратновсервисZont：

* thermostat_mode
* thermostat_ext_mode
* thermostat_temp
*警卫
*警笛
* engine_block
* webasto
* auto_ignition

## История изменений
####0.5.3ОбновленаработаH-1термостата
####0.5.2Перваяпубличнаяверсия
-----------------

用于https://zont-online.ru服务的ioBroker适配器

适配器使用Zont-api描述[这里](https://zont-online.ru/api/docs/)。
它获取有关设备的数据并将其存储为多个ioBroker状态。

某些国家/地区可以通过用户或ioBroker脚本进行更改。然后它发送回Zont服务：

* thermostat_mode
* thermostat_ext_mode
* thermostat_temp
*警卫
*警笛
* engine_block
* webasto
* auto_ignition

## Changelog

#### 0.5.3 Update H-1 thermostat

#### 0.5.2 First public version

---------------

## License
The MIT License (MIT)

Copyright (c) 2017 Kirov Ilya <kirovilya@gmail.com>

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