---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ds18b20.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ds18b20.svg
BADGE-Dependency Status: https://img.shields.io/david/crycode-de/iobroker.ds18b20.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/crycode-de/ioBroker.ds18b20/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ds18b20.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/crycode-de/ioBroker.ds18b20/master.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ds18b20/README.md
title: ioBroker.ds18b20
hash: qJfRB/5MczqQ0Aivc91lJ64NChstHjwb6g4+Ev03rfI=
---
![徽标](../../../de/adapterref/iobroker.ds18b20/../../admin/ds18b20.png)

＃ioBroker.ds18b20
适配器`ds18b20`使ioBroker中的DS18B20型1-Wire温度传感器直接集成。

需要支持1-Wire总线的相应硬件（例如Raspberry Pi），并且必须在系统上功能上设置1-Wire总线（在`/sys/bus/w1/devices/`中列出的传感器）。

##功能
*读取当前温度值
*自动检测连接的传感器
*查询传感器时的错误检测（校验和，通信错误，设备断开连接）
*每个传感器的轮询间隔可自定义
*每个传感器可调整的测量值的四舍五入和转换

##安装
当前可以通过最新的存储库使用该适配器。

或者，可以通过URL`https://github.com/crycode-de/ioBroker.ds18b20.git`安装。

##配置
在适配器配置中，可以以毫秒为单位设置所有传感器的**标准轮询间隔**。最小值为500。

在表格中，可以手动添加单个传感器，也可以通过*搜索传感器*添加。

![组态](../../../de/adapterref/iobroker.ds18b20/./img/konfiguration.png)

**地址**是传感器的1线地址/ ID，并同时确定对象ID。
例如，地址为`28-0000077ba131`的传感器将获得对象ID`ds18b20.0.sensors.28-0000077ba131`。

可以自由选择**名称**以识别传感器。

可以为每个传感器设置额外的**轮询间隔**（以毫秒为单位）。
如果该字段保留为空白，则应用默认查询间隔。
最小值为500。

**单位**确定ioBroker对象中存储的值的单位。
默认情况下，这是`°C`。

通过**因子**和**偏移**，可以根据公式`Wert = (Wert * Faktor) + Offset`来调整传感器读取的值。

**小数点**表示将小数点后的数值四舍五入。
在计算后使用因子和偏移进行舍入。

**零错误**确定读取传感器时如何处理错误。
如果设置了该选项，则在出现错误的情况下会将`null`值写入传感器的状态。
如果没有此选项，则在发生错误的情况下不会更新状态。

###`°C`到`°F`的转换
为了使适配器在`°F`中返回测得的温度，必须使用因子`1.8`和偏移`32`。

##动作
通过写入状态`ds18b20.0.actions.readNow`，可以立即读取所有或特定传感器。

要立即读取所有传感器，必须在该状态下写入关键字`all`。

如果仅要读取一个特定的传感器，则必须将传感器的地址或ioBroker对象ID写入该状态。

##在脚本中使用
可以发送适配器命令以读取传感器数据或搜索传感器。

###`readNow`
命令`readNow`触发所有或特定传感器的立即查询。
要查询所有传感器，可以将消息部分保留为空，或者可以使用字符串`all`。
要读取特定传感器，必须将消息部分设置为传感器的地址或ioBroker ID。

`readNow`命令不返回任何数据。他只触发传感器的立即读数。

```js
sendTo('ds18b20.0', 'readNow');
sendTo('ds18b20.0', 'readNow', '28-0000077ba131');
```

###`read`
可通过`read`命令读取单个传感器。
消息部分必须是要读取的传感器的地址或ioBroker对象ID。
读取的值可以通过回调函数进一步处理。

```js
sendTo('ds18b20.0', 'read', '28-0000077ba131', (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    }
});
```

###`search`
`search`命令对当前连接的1-Wire传感器执行搜索，并返回通过回调函数找到的传感器的地址。

```js
sendTo('ds18b20.0', 'search', {}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    } else {
        for (let s of ret.sensors) {
            log('Sensor: ' + s);
        }
    }
});
```

##适配器信息
使用`ds18b20.*.info.connection`状态，每个适配器实例都提供有关是否所有已配置的传感器都提供数据的信息。
如果所有传感器的最后一次读取成功，则此状态为`true`。
一旦其中一个传感器发生错误，此状态即为`false`。

## Changelog
### 1.0.2 (2019-10-07)
* (Peter Müller) Display error message when tried to search for sensors without adapter running.

### 1.0.1 (2019-10-01)
* (Peter Müller) Type changed to hardware, Renamed command, Added missing documentation

### 1.0.0 (2019-09-09)
* (Peter Müller) initial release

## License

Copyright (c) 2019 Peter Müller <peter@crycode.de>

### MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.