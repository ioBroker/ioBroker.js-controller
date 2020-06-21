---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: Sned5trIfAFdUgBpKKClgG/rVfUx5J55OH8O7QooxDc=
---
![商标](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![安装数量](http://iobroker.live/badges/modbus-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.modbus.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.modbus.svg)
![NPM](https://nodei.co/npm/iobroker.modbus.png?downloads=true)

＃iobroker.modbus
**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

ioBroker的ModBus从站和主站的实现。支持以下类型：

-串行Modbus RTU（主站）
-通过TCP的Modbus RTU（主站）
-Modbus TCP（从站，主站）

##设置
###合作伙伴IP地址
Modbus伙伴的IP地址。

＃＃＃ 港口
Modbus伙伴的TCP端口（如果配置为主机（客户端））或自己的端口（如果配置为从机（服务器））。

＃＃＃ 设备ID
Modbus设备ID。如果使用TCP / Modbus网桥，则很重要。

###类型
从站（服务器）或主站（客户端）。

###使用别名作为地址
通常，所有寄存器的地址范围都可以从0到65535。通过使用别名，您可以为每种类型的寄存器定义虚拟地址字段。一般：

-离散量输入为10001至20000
-线圈从1到1000
-输入寄存器为30001至40000
-保持寄存器从40001到60000

每个别名都将在内部映射到地址，例如30011将映射到输入寄存器10。依此类推。

###不要将地址与单词对齐
通常，线圈和离散输入地址对齐为16位。从3到20的类似地址将与0到32对齐。
如果激活此选项，则地址将不对齐。

###舍入为
逗号后的位数为float和double。

###轮询延迟
循环轮询间隔（仅与主设备相关）

###重新连接时间
重新连接间隔（仅与主设备相关）

###脉冲时间
如果脉冲用于线圈，则定义脉冲间隔多长时间。

###最大读取请求长度
命令READ_MULTIPLE_REGISTERS的最大长度，作为要读取的寄存器数。

一些系统需要首先“写入请求”才能根据“读取请求”传递数据。
您可以通过将“最大读取请求长度”设置为1来强制此模式。

**注意：**某些USB Modbus解决方案（例如，基于socat）可能无法与serialport npm模块一起使用。

有一个软件[**基于TCP的Modbus RTU <-> Modbus RTU **](http://mbus.sourceforge.net/index.html)网关，可以通过TCP协议使用串行RTU。

两种解决方案**基于TCP的RTU **和** TCP **都能很好地工作。

###不要使用多个寄存器
如果从站不支持“写入多个寄存器”命令，则可以在写入多个寄存器时激活它以获取警告。

###写入间隔
两个写入请求之间的延迟（以毫秒为单位）。默认值0。

##数据类型
-uint16be-无符号16位（Big Endian）：AABB => AABB
-uint16le-无符号16位（Little Endian）：AABB => BBAA
-int16be-有符号16位（Big Endian）：AABB => AABB
-int16le-有符号16位（Little Endian）：AABB => BBAA
-uint32be-无符号32位（Big Endian）：AABBCCDD => AABBCCDD
-uint32le-无符号32位（Little Endian）：AABBCCDD => DDCCBBAA
-uint32sw-无符号32位（大尾数字交换）：AABBCCDD => CCDDAABB
-uint32sb-无符号32位（大字节序交换）：AABBCCDD => DDCCBBAA
-int32be-有符号32位（Big Endian）：AABBCCDD => AABBCCDD
-int32le-带符号的32位（Little Endian）：ABBCCDD => DDCCBBAA
-int32sw-有符号32位（大尾数字交换）：AABBCCDD => CCDDAABB
-int32sb-带符号的32位（大字节序交换）：AABBCCDD => DDCCBBAA
-uint64be-无符号64位（Big Endian）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
-uint64le-无符号64位（Little Endian）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
-uint8be-无符号8位（Big Endian）：AA => AA
-uint8le-无符号8位（Little Endian）：AA => AA
-int8be-有符号8位（Big Endian）：AA => AA
-int8le-有符号8位（小端）：AA => AA
-floatbe-浮动（大尾数法）：AABBCCDD => AABBCCDD
-浮法-浮法（小尾数法）：AABBCCDD => DDCCBBAA
-floatsw-浮点数（大尾数字交换）：AABBCCDD => CCDDAABB
-floatsb-浮点数（大尾数字节交换）：AABBCCDD => DDCCBBAA
-doublebe-Double（Big Endian）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
-doublele-Double（Little Endian）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
-字符串-字符串（零结尾）：ABCDEF \ 0 => ABCDEF \ 0
-字符串-字符串（小端，零端）：BADCFE \ 0 => ABCDEF \ 0

以下描述摘自[这里](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/)

点对点Modbus协议是RTU通信的一种普遍选择，只要它没有其他基本便利就可以了。该协议本身控制着Modbus网络上每个设备的交互，设备如何建立已知地址，每个设备如何识别其消息以及如何从数据中提取基本信息。本质上，该协议是整个Modbus网络的基础。

然而，这种便利并非没有复杂之处，并且Modbus RTU消息协议也不例外。该协议本身是基于具有16位寄存器长度的设备设计的。因此，在实现32位数据元素时需要特别考虑。该实现方案使用两个连续的16位寄存器表示32位数据或本质上为4字节数据。可以在这4个字节的数据内将单精度浮点数据编码为Modbus RTU消息。

###字节顺序的重要性
Modbus本身未定义浮点数据类型，但它被广泛接受，它使用IEEE-754标准实现32位浮点数据。但是，IEEE标准没有明确定义数据有效载荷的字节顺序。因此，处理32位数据时，最重要的考虑因素是按正确的顺序对数据进行寻址。

例如，IEEE 754标准中为单精度32位浮点数定义的数字123 / 456.00如下所示：

![图片1](../../../en/adapterref/iobroker.modbus/img/img1.png)

各种字节顺序的影响很大。例如，以“ B A D C”顺序对表示123456.00的4个字节的数据进行排序（称为“字节交换”）。当解释为IEEE 744浮点数据类型时，结果是完全不同的：

![图片2](../../../en/adapterref/iobroker.modbus/img/img2.png)

在“ C D A B”序列中排序相同的字节称为“字交换”。同样，结果与原始值123456.00截然不同：

![图3](../../../en/adapterref/iobroker.modbus/img/img3.png)

此外，“字节交换”和“字交换”都将实质上完全颠倒字节的顺序，以产生另一个结果：

![图4](../../../en/adapterref/iobroker.modbus/img/img4.png)

显然，当使用诸如Modbus之类的网络协议时，必须严格注意内存字节在传输时如何排序（也称为“字节顺序”）。

###确定字节顺序
根据Modbus应用协议规范V1.1.b，Modbus协议本身被声明为“ big-Endian”协议：

```Modbus uses a “big-Endian” representation for addresses and data items. This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.```

Big-Endian是网络协议最常用的格式-实际上非常普遍，因此也称为“网络顺序”。

鉴于Modbus RTU消息协议为big-Endian，为了通过Modbus RTU消息成功交换32位数据类型，必须同时考虑主站和从站的字节序。许多RTU主设备和从设备允许特定的字节顺序选择，特别是在软件模拟单元的情况下。只需确保所有两个单元都设置为相同的字节顺序即可。

根据经验，设备的微处理器家族决定其字节序。通常，在使用Motorola处理器设计的CPU中通常会找到big-Endian样式（先存储高位字节，然后存储低位字节）。 little-Endian样式（低位字节先存储，然后是高位字节）通常在使用Intel架构的CPU中找到。至于哪种样式被视为“后退”，则取决于个人观点。

但是，如果字节顺序和字节序不是可配置的选项，则必须确定如何解释字节。可以从从站请求一个已知的浮点值来完成。如果返回一个不可能的值，即具有两位数或类似数字的数字，则很可能需要修改字节顺序。

###实用帮助
FieldServer Modbus RTU驱动程序提供了几种处理32位整数和32位浮点值的功能。更重要的是，这些功能移动考虑了字节排序的所有不同形式。下表显示了将两个相邻的16位寄存器复制到32位整数值的FieldServer函数移动。

|功能关键字|交换模式源字节|目标字节|
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.i32-s |字节和字交换| [a b] [c d] | [d c b a] |
| 2.i16-1.i32-sb |字节交换| [a b] [c d] | [b a d c] |
| 2.i16-1.i32-sw |单词互换| [a b] [c d] | [c d a b] |

下表显示了将两个相邻的16位寄存器复制到32位浮点值的FieldServer函数移动：

|功能关键字|交换模式源字节|目标字节|
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.ifloat-s |字节和字交换| [a b] [c d] | [d c b a] |
| 2.i16-1.ifloat-sb |字节交换| [a b] [c d] | [b a d c] |
| 2.i16-1.ifloat-sw |单词互换| [a b] [c d] | [c d a b] |

下表显示了将单个32位浮点值复制到两个相邻的16位寄存器的FieldServer函数移动：

|功能关键字|交换模式源字节|目标字节|
|------------------|-------------------|-----------------|----------------|
| 1.float-2.i16 |不适用| [a b] [c d] | [a b] [c d] |
| 1.float-2.i16-s |字节和字交换| [a b] [c d] | [d c] [b a] |
| 1.float-2.i16-sb |字节交换| [a b] [c d] | [b a] [d c] |
| 1.float-2.i16-sw |单词交换| [a b] [c d] | [c d] [a b] |

考虑到各种FieldServer函数的动作，对32位数据的正确处理取决于选择正确的数据。观察这些FieldServer函数在已知的单精度十进制浮点值123456.00上移动的以下行为：

| 16位值|功能移动|结果功能移动|结果 |
|---------------|-------------------|-----------|-------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.float-2.i16 | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.float-s | 123456.00 | 1.float-2.i16-s | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.float-2.i16-sb | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

请注意，不同的字节和单词顺序要求使用适当的FieldServer函数移动。选择适当的功能移动后，即可在两个方向上转换数据。

Internet上有许多十六进制到浮点转换器和计算器，实际上很少有允许对字节和字序进行操作的。 www.61131.com/download.htm上有一个这样的实用程序，可以在此下载Linux和Windows版本的实用程序。安装后，该实用程序将作为具有单个对话框界面的可执行文件运行。该实用程序显示的十进制浮点值123456.00如下所示：

![图片5](../../../en/adapterref/iobroker.modbus/img/img5.png)

然后可以交换字节和/或字来分析Modbus RTU主站和从站设备之间可能存在哪些潜在的字节序问题。

##测试
文件夹* test'中有一些程序可以测试TCP通信：

-Ananas32 / 64是从属模拟器（仅保存寄存器和输入，没有线圈和数字输入）
-RMMS是主模拟器
-mod_RSsim.exe是从属模拟器。可能是您需要[Microsoft Visual C ++ 2008 SP1可再发行组件包]（https://www.microsoft.com/zh-cn/download/details.aspx?id=5582）来启动它（由于SideBySide错误）。

## Changelog

### 3.1.3 (2020-06-12)
* (Apollon77) fix scheduled restart

### 3.1.2 (2020-06-12)
* (Apollon77) fix serialport list for Admin

### 3.1.1 (2020-06-11)
* (Apollon77) Add Sentry crash reporting when used with js-controller >=3.x

### 3.1.0 (2020-06-11)
* (Apollon77) Make sure that regular adapter stops do not terminate the process, so that scheduled restarts still work
* (Apollon77) update serialport, support nodejs 12/14

### 3.0.4 (2020-06-05)
* (bluefox) Added device ID by export/import
* (bluefox) Added the write interval parameter
* (bluefox) Added the disabling of write multiple registers

### 3.0.3 (2020-06-05)
* (bluefox) Corrected error after refactoring

### 3.0.2 (2020-06-01)
* (compton-git) Decodes 0xFF00 as coil ON

### 3.0.1 (2020-01-23)
* (BlackBird77) Fixes for Serial Timeouts done
* (bluefox) Refactoring

### 3.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 2.0.9 (2018-10-11)
* (Bjoern3003) Write registers was corrected

### 2.0.7 (2018-07-02)
* (bluefox) The server mode was fixed

### 2.0.6 (2018-06-26)
* (bluefox) rtu-tcp master mode was fixed

### 2.0.3 (2018-06-16)
* (bluefox) Fixed the rounding of numbers

### 2.0.2 (2018-06-12)
* (bluefox) The error with blocks reading was fixed
* (bluefox) The block reading for discrete values was implemented

### 2.0.1 (2018-05-06)
* (bluefox) Added the support of multiple device IDs

### 1.1.1 (2018-04-15)
* (Apollon77) Optimize reconnect handling

### 1.1.0 (2018-01-23)
* (bluefox) Little endian strings added
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-20)
* (bluefox) Fixed read of coils

### 0.5.4 (2017-09-27)
* (Apollon77) Several Fixes

### 0.5.0 (2017-02-11)
* (bluefox) Create all states each after other

### 0.4.10 (2017-02-10)
* (Apollon77) Do not recreate all datapoints on start of adapter
* (ykuendig) Multiple optimization and wording fixes

### 0.4.9 (2016-12-20)
* (bluefox) fix serial RTU

### 0.4.8 (2016-12-15)
* (Apollon77) update serialport library for node 6.x compatibility

### 0.4.7 (2016-11-27)
* (bluefox) Use old version of jsmodbus

### 0.4.6 (2016-11-08)
* (bluefox) backward compatibility with 0.3.x

### 0.4.5 (2016-10-25)
* (bluefox) better buffer handling on tcp and serial

### 0.4.4 (2016-10-21)
* (bluefox) Fix write of holding registers

### 0.4.1 (2016-10-19)
* (bluefox) Support of ModBus RTU over serial and over TCP (only slave)

### 0.3.11 (2016-08-18)
* (Apollon77) Fix wrong byte count in loop

### 0.3.10 (2016-02-01)
* (bluefox) fix lost of history settings.

### 0.3.9 (2015-11-09)
* (bluefox) Use always write_multiple_registers by write of holding registers.

### 0.3.7 (2015-11-02)
* (bluefox) add special read/write mode if "Max read request length" is 1.

### 0.3.6 (2015-11-01)
* (bluefox) add cyclic write for holding registers (fix)

### 0.3.5 (2015-10-31)
* (bluefox) add cyclic write for holding registers

### 0.3.4 (2015-10-28)
* (bluefox) add doubles and fix uint64

### 0.3.3 (2015-10-27)
* (bluefox) fix holding registers

### 0.3.2 (2015-10-27)
* (bluefox) fix import from text file

### 0.3.1 (2015-10-26)
* (bluefox) fix error with length of read block (master)
* (bluefox) support of read blocks and maximal length of read request (master)
* (bluefox) can define fields by import

### 0.3.0 (2015-10-24)
* (bluefox) add round settings
* (bluefox) add deviceID
* (bluefox) slave supports floats, integers and strings

### 0.2.6 (2015-10-22)
* (bluefox) add different types for inputRegisters and for holding registers ONLY FOR MASTER

### 0.2.5 (2015-10-20)
* (bluefox) fix names of objects if aliases used

### 0.2.4 (2015-10-19)
* (bluefox) fix error add new values

### 0.2.3 (2015-10-15)
* (bluefox) fix error with master

### 0.2.2 (2015-10-14)
* (bluefox) implement slave
* (bluefox) change addressing model

### 0.0.1
* (bluefox) initial commit

The MIT License (MIT)

Copyright (c) 2015-2020 Bluefox <dogafox@gmail.com>

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