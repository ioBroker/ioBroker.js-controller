---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ds18b20.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ds18b20.svg
BADGE-Number of Installations (latest): https://iobroker.live/badges/ds18b20-installed.svg
BADGE-Number of Installations (stable): https://iobroker.live/badges/ds18b20-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/crycode-de/iobroker.ds18b20.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ds18b20.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ds18b20/README.md
title: 的ioBroker.ds18b20
hash: +VxuFVmwQYwavZM2kX5k6VefCAk5Nq3mNozrBktQMvc=
---
![标识](../../../de/adapterref/iobroker.ds18b20/../../admin/ds18b20.png)

＃ioBroker.ds18b20
适配器`ds18b20`可以将ioBroker中DS18B20类型的1-Wire温度传感器直接集成。

需要具有支持1-Wire总线的适当硬件（例如Raspberry Pi），并且必须设置1-Wire总线以在系统上工作（传感器在`/sys/bus/w1/devices/`中列出）。

DS18B20传感器与Raspberry Pi的连接示例如下。

＃＃ 特征
*读取当前温度值
*自动检测连接的传感器
*查询传感器时的错误检测（校验和，通信错误，设备断开连接）
*查询间隔可以根据每个传感器进行调整
*可以调整每个传感器的测量值的舍入和转换
*通过_Remote Client_支持远程系统上的传感器

＃＃ 安装
该适配器可从稳定的最新存储库中获得。

也可以通过GitHub URL`https://github.com/crycode-de/ioBroker.ds18b20.git`安装最新的开发版本。
但是，很少建议这样做！

＃＃ 配置
在适配器配置中，可以为所有传感器设置“标准轮询间隔” **（以毫秒为单位）。最小值为500。
此外，如有必要，可以调整1-Wire器件的**路径。
仍然可以激活和配置集成服务器，以将传感器集成到远程系统中。

各个传感器可以手动添加，也可以通过表格中的**搜索传感器**添加。

![配置](../../../de/adapterref/iobroker.ds18b20/./img/konfiguration.png)

**地址**是传感器的1线地址/ ID，并同时确定对象ID。
例如，地址为`28-0000077ba131`的传感器会收到对象ID`ds18b20.0.sensors.28-0000077ba131`。

对于直接连接的传感器，未设置**远程系统ID **（空），对于远程系统上的传感器，未设置相应的远程系统的ID

可以自由选择**名称**以识别传感器。

可以为每个传感器指定一个额外的**查询间隔**（以毫秒为单位）。
如果该字段留为空白，则应用标准查询间隔。
最小值为500。

**单位**确定ioBroker对象中存储的值的单位。
默认情况下，这是`°C`。

通过**因子**和**偏移**，可以根据公式`Wert = (Wert * Faktor) + Offset`调整传感器读取的值。

**小数点**表示该值四舍五入到小数点后多少位。
在计算后使用因子和偏移进行舍入。

**如果出现错误，则为零**定义读取传感器时如何处理错误。
如果设置了该选项，则在发生错误的情况下会将`null`值写入传感器的状态。
如果没有此选项，则在发生错误时不会更新状态。

###将`°C`转换为`°F`
为确保适配器在`°F`中返回测得的温度，必须将`1.8`用作因子，并将`32`用作偏移量。

##动作
通过写入状态`ds18b20.0.actions.readNow`，可以触发立即读取所有或特定传感器。

为了触发所有传感器的立即读取，必须在该状态下编写关键字`all`。

如果仅要读取某个传感器，则必须将传感器的地址或ioBroker对象ID写入该状态。

##在脚本中使用
可以向适配器发送命令以读取传感器数据或搜索传感器。

###`readNow`
命令`readNow`从所有传感器或特定传感器启动立即查询。
消息部分可以保留为空，或字符串`all`可用于查询所有传感器。
要读取特定的传感器，必须将消息部分设置为传感器的地址或ioBroker ID。

命令`readNow`不返回任何数据。它仅触发立即读取传感器。

```js
sendTo('ds18b20.0', 'readNow');
sendTo('ds18b20.0', 'readNow', '28-0000077ba131');
```

###`read`
可以使用`read`命令读取单个传感器。
必须将要读取的传感器的地址或ioBroker对象ID指定为消息部分。
可以使用回调函数进一步处理读取的值。

```js
sendTo('ds18b20.0', 'read', '28-0000077ba131', (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    }
});
```

###`search`
`search`命令搜索当前连接的1-wire传感器，并返回通过回调函数找到的传感器的地址。

```js
sendTo('ds18b20.0', 'search', {}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    } else {
        for (let s of ret.sensors) {
            if (s.remoteSystemId) {
                log('Sensor: ' + s.address + '@' + s.remoteSystemId);
            } else {
                log('Sensor: ' + s.address);
            }
        }
    }
});
```

###`getRemoteSystems`
可以通过`getRemoteSystems`查询当前连接的远程系统的系统ID。

```js
sendTo('ds18b20.0', 'getRemoteSystems', {}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    log('Verbundene Systeme: ' + ret.join(', '));
});
```

##适配器信息
通过`ds18b20.*.info.connection`状态，每个适配器实例都提供有关是否所有已配置的传感器都在传递数据的信息。
如果从所有传感器最后一次读取成功，则此状态为`true`。
一旦其中一个传感器显示错误，此状态即为`false`。

Raspberry Pi上的## DS18B20
DS18B20温度传感器已连接到Raspberry Pi，如下图所示。
应当注意，上拉电阻必须连接到+ 3.3V而不是+ 5V，因为这会损坏GPIO。
在此示例中，使用了GPIO.04（BCM）。

![DS18B20 Raspberry Pi](../../../de/adapterref/iobroker.ds18b20/./img/raspi-ds18b20.png)

要在Raspberry Pi上激活1-Wire总线，必须将以下行添加到文件`/boot/config.txt`中，然后重新启动Raspberry Pi。

```
dtoverlay=w1-gpio,gpiopin=4
```

如果一切正常，则在`/sys/bus/w1/devices/`下可以看到已连接的传感器。

```
$ ls -l /sys/bus/w1/devices/
insgesamt 0
lrwxrwxrwx 1 root root 0 Nov  2 11:18 28-0000077b4592 -> ../../../devices/w1_bus_master1/28-0000077b4592
lrwxrwxrwx 1 root root 0 Nov  2 11:18 28-0000077b9fea -> ../../../devices/w1_bus_master1/28-0000077b9fea
lrwxrwxrwx 1 root root 0 Nov  2 10:49 w1_bus_master1 -> ../../../devices/w1_bus_master1
```

###在Raspberry Pi上使用许多传感器
可以在线路上的Raspberry Pi上无错误操作的传感器数量是有限的，并且取决于某些技术条件（例如电缆长度）。
第一次（有时是偶然的）故障通常是由大约10个传感器引起的。

为了能够操作更多的传感器，可以将它们分为几个字符串（即几个GPIO）。
然后，每个线束都需要自己的上拉电阻。

要激活它，只需在文件`/boot/config.txt`§中添加几个具有相应GPIO编号的条目：

```
dtoverlay=w1-gpio,gpiopin=4
dtoverlay=w1-gpio,gpiopin=17
```

然后，每个条目都会在系统中创建自己的`w1_bus_masterX`。

###负温度下的内核错误
Raspberry Pi的5.10.y内核在2020年11月中旬出现一个错误，例如，负温度读数为4092°C。 （请参阅[GitHub问题](https://github.com/raspberrypi/linux/issues/4124)）此错误已于02/08/2021的内核10/5/14中修复。 （请参阅[GitHub提交](https://github.com/Hexxeh/rpi-firmware/commit/115e3a5f77488d9ee30a33bcb5ac31eb587f60a8)）`rpi-update`应该可以解决此问题。

在v1.2.2及更高版本的适配器版本中，这些显然不正确的值已转移到ioBroker State。
从v1.2.3开始，适配器还会检查读取的值是否合理（在-80至+150°C之间），并拒绝不合理的值。

##在远程系统中集成传感器
从_ioBroker.ds18b20_的1.4.0版本开始，可以通过您自己的_ioBroker.ds18b20远程客户端_直接集成远程系统上的传感器。所需的全部是远程系统上的Node.js。

必须在适配器配置中设置“激活远程传感器”的复选标记。然后，适配器在指定的端口上启动TCP服务器，并接受来自客户端的连接。

服务器和客户端之间的连接使用`aes-256-cbc`算法进行加密。
为此，必须在客户端上设置适配器配置中显示的加密密钥。

然后，_ioBroker.ds18b20远程客户端_建立与适配器的TCP连接，并显示在适配器配置的**已连接的远程系统**下。

### IoBroker.ds18b20远程客户端的安装
通过适配器提供了_ioBroker.ds18b20 Remote Client_的设置。

可以在适配器配置中找到安装说明。

## Changelog

### 1.4.0 (2021-02-21)
* (crycode-de) Support for remote sensors using an own tiny daemon and encrypted TCP sockets
* (crycode-de) Set `q` flag to `0x81` (general problem by sensor) if a sensor reported a `null` value

### 1.3.0 (2021-02-11)
* (crycode-de) Searching for sensors now works for multiple 1-wire masters

### 1.2.3 (2021-02-11)
* (crycode-de) Added check of temperatures higher/lower than possible sensor values

### 1.2.2 (2021-02-06)
* (crycode-de) Fixed crash if settings are malformed (IOBROKER-DS18B20-3)

### 1.2.1 (2021-01-09)
* (crycode-de) Small fixes
* (crycode-de) Updated dependencies

### 1.2.0 (2020-12-21)
* (crycode-de) Added Sentry error reporting
* (crycode-de) Updated dependencies
* (crycode-de) Optimized npm package

### 1.1.5 (2020-10-14)
* (crycode-de) Fixed incorrect data type of object
* (crycode-de) Updated dependencies

### 1.1.4 (2020-02-03)
* (crycode-de) Updated connectionType and dataSource in io-package.json.

### 1.1.3 (2020-01-23)
* (crycode-de) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.1.2 (2020-01-22)
* (crycode-de) Better handling of changed objects in admin.

### 1.1.1 (2020-01-09)
* (crycode-de) Fixed wrong communication errror detection on some sensors.

### 1.1.0 (2019-11-11)
* (crycode-de) Own implementation of reading the sensor data.
* (crycode-de) Fixed bug on decimals rounding.
* (crycode-de) 1-wire devices path is now configurable.

### 1.0.3 (2019-11-03)
* (crycode-de) Added documentation about DS18B20 at a Raspberry Pi; Dependencies updated

### 1.0.2 (2019-10-07)
* (crycode-de) Display error message when tried to search for sensors without adapter running.

### 1.0.1 (2019-10-01)
* (crycode-de) Type changed to hardware, Renamed command, Added missing documentation

### 1.0.0 (2019-09-09)
* (crycode-de) initial release

## License

Copyright (c) 2019-2021 Peter Müller <peter@crycode.de>

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