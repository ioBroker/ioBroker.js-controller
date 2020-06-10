---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: GfwwDPxEmBmuil/Z8P9Pkvvn5wsDBFhrYyZv2rg7tMA=
---
![商标](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![安装数量](http://iobroker.live/badges/modbus-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.modbus.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.modbus.svg)
![NPM](https://nodei.co/npm/iobroker.modbus.png?downloads=true)

＃iobroker.modbus
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

**注意：**某些USB Modbus解决方案（例如，基于socat）可能无法与Serialport npm模块一起使用。

有一个软件[**基于TCP的Modbus RTU <-> Modbus RTU **](http://mbus.sourceforge.net/index.html)网关，可以通过TCP协议使用串行RTU。

两种解决方案**基于TCP的RTU **和** TCP **都可以很好地工作。

###不要使用多个寄存器
如果从站不支持“写入多个寄存器”命令，则可以在写入多个寄存器时激活它以获取警告。

###写入间隔
两个写入请求之间的延迟（以毫秒为单位）。默认值0

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
-int32le-带符号的32位（小端）：ABBCCDD => DDCCBBAA
-int32sw-有符号32位（大尾数字交换）：AABBCCDD => CCDDAABB
-int32sb-有符号32位（大字节序交换）：AABBCCDD => DDCCBBAA
-uint64be-无符号64位（Big Endian）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
-uint64le-无符号64位（Little Endian）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
-uint8be-无符号8位（Big Endian）：AA => AA
-uint8le-无符号8位（Little Endian）：AA => AA
-int8be-有符号8位（Big Endian）：AA => AA
-int8le-带符号的8位（小端）：AA => AA
-floatbe-浮动（大尾数法）：AABBCCDD => AABBCCDD
-浮法-浮法（小尾数法）：AABBCCDD => DDCCBBAA
-floatsw-浮动（大尾数字词交换）：AABBCCDD => CCDDAABB
-floatsb-浮点数（大尾数字节交换）：AABBCCDD => DDCCBBAA
-doublebe-Double（Big Endian）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
-doublele-Double（Little Endian）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
-字符串-字符串（零结尾）：ABCDEF \ 0 => ABCDEF \ 0
-字符串-字符串（小端，零端）：BADCFE \ 0 => ABCDEF \ 0

以下描述摘自[这里](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/)

点对点Modbus协议是RTU通信的一种普遍选择，只要它没有其他基本便利即可。协议本身控制Modbus网络上每个设备的交互，设备如何建立已知地址，每个设备如何识别其消息以及如何从数据中提取基本信息。本质上，该协议是整个Modbus网络的基础。

然而，这种便利并非毫无复杂性，而且Modbus RTU消息协议也不例外。该协议本身是基于具有16位寄存器长度的设备设计的。因此，在实现32位数据元素时需要特别考虑。该实现方案使用两个连续的16位寄存器表示32位数据或本质上为4字节数据。可以在这4个字节的数据内将单精度浮点数据编码为Modbus RTU消息。

###字节顺序的重要性
Modbus本身未定义浮点数据类型，但它被广泛接受，它使用IEEE-754标准实现32位浮点数据。但是，IEEE标准没有明确定义数据有效载荷的字节顺序。因此，处理32位数据时，最重要的考虑因素是按正确的顺序对数据进行寻址。

例如，在IEEE 754标准中为单精度32位浮点数定义的数字123 / 456.00如下所示：

![图片1](../../../en/adapterref/iobroker.modbus/img/img1.png)

各种字节顺序的影响很大。例如，以“ B A D C”顺序对表示123456.00的4个字节的数据进行排序（称为“字节交换”）。当解释为IEEE 744浮点数据类型时，结果是完全不同的：

![图片2](../../../en/adapterref/iobroker.modbus/img/img2.png)

在“ C D A B”序列中排序相同的字节称为“字交换”。同样，结果与原始值123456.00截然不同：

![图3](../../../en/adapterref/iobroker.modbus/img/img3.png)

此外，“字节交换”和“字交换”都将实质上完全颠倒字节的顺序，以产生另一个结果：

![图4](../../../en/adapterref/iobroker.modbus/img/img4.png)

显然，在使用诸如Modbus之类的网络协议时，必须严格注意在传输内存字节时如何对其进行排序（也称为“字节顺序”）。

###确定字节顺序
根据Modbus应用协议规范V1.1.b，Modbus协议本身被声明为“ big-Endian”协议：

```Modbus uses a “big-Endian” representation for addresses and data items. This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.```

Big-Endian是网络协议最常用的格式-实际上非常普遍，因此也称为“网络顺序”。

鉴于Modbus RTU消息协议为big-Endian，为了通过Modbus RTU消息成功交换32位数据类型，必须同时考虑主站和从站的字节序。许多RTU主设备和从设备允许特定的字节顺序选择，特别是在软件模拟单元的情况下。只需确保所有两个单元都设置为相同的字节顺序即可。

根据经验，设备的微处理器家族决定其字节序。通常，在使用Motorola处理器设计的CPU中通常会出现big-Endian样式（先存储高位字节，然后存储低位字节）。 little-Endian样式（低位字节先存储，然后是高位字节）通常在使用Intel架构的CPU中找到。至于哪种样式被视为“后退”，则取决于个人观点。

但是，如果字节顺序和字节序不是可配置的选项，则必须确定如何解释字节。可以从从站请求一个已知的浮点值来完成。如果返回一个不可能的值，即具有两位数或类似数字的数字，则很可能需要修改字节顺序。

###实用帮助
FieldServer Modbus RTU驱动程序提供了几种处理32位整数和32位浮点值的功能。更重要的是，这些函数移动考虑了字节排序的所有不同形式。下表显示了将两个相邻的16位寄存器复制到32位整数值的FieldServer函数移动。

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

请注意，不同的字节和单词顺序要求使用适当的FieldServer函数移动。一旦选择了正确的功能移动，就可以在两个方向上转换数据。

在Internet上可用的许多十六进制到浮点转换器和计算器中，实际上很少有允许对字节和字序进行操作的。 www.61131.com/download.htm上有一个这样的实用程序，可以在此下载Linux和Windows版本的实用程序。安装后，该实用程序将作为具有单个对话框界面的可执行文件运行。该实用程序显示的十进制浮点值123456.00如下所示：

![图片5](../../../en/adapterref/iobroker.modbus/img/img5.png)

然后可以交换字节和/或字来分析Modbus RTU主站和从站设备之间可能存在哪些潜在的字节序问题。

##测试
文件夹* test'中有一些程序可以测试TCP通信：

-Ananas32 / 64是从属模拟器（仅保存寄存器和输入，没有线圈和数字输入）
-RMMS是主模拟器
-mod_RSsim.exe是从属模拟器。可能是您需要[Microsoft Visual C ++ 2008 SP1可再发行组件包]（https://www.microsoft.com/zh-cn/download/details.aspx?id=5582）来启动它（由于SideBySide错误）。

＃3.0.4（2020-06-05）
*（bluefox）通过导出/导入添加了设备ID
*（bluefox）添加了写入间隔参数
*（bluefox）添加了禁用写入多个寄存器的功能

＃3.0.3（2020-06-05）
*（bluefox）重构后纠正的错误

＃3.0.2（2020-06-01）
*（compton-git）将0xFF00解码为线圈ON

＃3.0.1（2020-01-23）
*（BlackBird77）修复了串行超时问题
*（bluefox）重构

＃3.0.0（2019-05-15）
*（Apollon77）添加了对nodejs 12的支持，不再支持nodejs 4！

＃2.0.9（2018-10-11）
*（Bjoern3003）写入寄存器已更正

＃2.0.7（2018-07-02）
*（bluefox）服务器模式是固定的

＃2.0.6（2018-06-26）
*（bluefox）rtu-tcp主模式已修复

＃2.0.3（2018-06-16）
*（bluefox）固定数字舍入

＃2.0.2（2018-06-12）
*（bluefox）读取块的错误已修复
*（bluefox）实现了离散值的块读取

＃2.0.1（2018-05-06）
*（bluefox）添加了对多个设备ID的支持

＃1.1.1（2018-04-15）
*（Apollon77）优化重新连接处理

＃1.1.0（2018-01-23）
*（bluefox）添加了小端序字符串
*（Apollon77）升级串行端口库

＃1.0.2（2018-01-20）
*（bluefox）固定读取线圈

＃0.5.4（2017-09-27）
*（Apollon77）几个修复

＃0.5.0（2017-02-11）
*（bluefox）互相创建所有状态

＃0.4.10（2017-02-10）
*（Apollon77）不要在适配器启动时重新创建所有数据点
*（ykuendig）多个优化和措辞修复

＃0.4.9（2016-12-20）
*（bluefox）修复了串行RTU

＃0.4.8（2016-12-15）
*（Apollon77）更新了串行端口库以实现节点6.x的兼容性

＃0.4.7（2016-11-27）
*（bluefox）使用旧版本的jsmodbus

＃0.4.6（2016-11-08）
*（bluefox）与0.3.x向后兼容

＃0.4.5（2016-10-25）
*（bluefox）更好地处理tcp和串行缓冲区

＃0.4.4（2016-10-21）
*（bluefox）修复对保持寄存器的写入

＃0.4.1（2016-10-19）
*（bluefox）通过串行和TCP（仅从站）支持ModBus RTU

＃0.3.11（2016-08-18）
*（Apollon77）修正循环中错误的字节数

＃0.3.10（2016-02-01）
*（bluefox）修复了历史记录设置丢失的问题。

＃0.3.9（2015-11-09）
*（bluefox）通过写入保持寄存器来始终使用write_multiple_registers。

＃0.3.7（2015-11-02）
*（bluefox）如果“最大读取请求长度”为1，则添加特殊的读取/写入模式。

＃0.3.6（2015-11-01）
*（bluefox）为保持寄存器添加循环写入（修复）

＃0.3.5（2015-10-31）
*（bluefox）为保持寄存器添加循环写入

＃0.3.4（2015-10-28）
*（bluefox）添加双打并修复uint64

＃0.3.3（2015-10-27）
*（bluefox）修复保留寄存器

＃0.3.2（2015-10-27）
*（bluefox）修复了从文本文件导入的问题

＃0.3.1（2015-10-26）
*（bluefox）修复了读取块长度（主）错误
*（bluefox）支持读取块和最大读取请求长度（主）
*（bluefox）可以通过导入定义字段

＃0.3.0（2015-10-24）
*（bluefox）添加圆形设置
*（bluefox）添加deviceID
*（bluefox）从站支持浮点数，整数和字符串

＃0.2.6（2015-10-22）
*（bluefox）为inputRegisters和保持寄存器添加不同类型，仅用于MASTER

＃0.2.5（2015-10-20）
*（bluefox）如果使用别名，则修复对象名称

＃0.2.4（2015-10-19）
*（bluefox）修复错误，添加新值

＃0.2.3（2015-10-15）
*（bluefox）修复大师错误

＃0.2.2（2015-10-14）
*（bluefox）实现从属
*（bluefox）更改寻址模型

＃0.0.1
*（bluefox）初始提交

MIT许可证（MIT）

版权所有（c）2015-2020 Bluefox <dogafox@gmail.com>

特此免费授予获得此软件和相关文档文件（“软件”）副本的任何人无限制使用软件的权利，包括但不限于使用，复制，修改，合并的权利，发布，分发，再许可和/或出售本软件的副本，并允许具备软件的人员这样做，但须满足以下条件：

以上版权声明和本许可声明应包含在本软件的所有副本或大部分内容中。

本软件按“原样”提供，不提供任何形式的明示或暗示担保，包括但不限于对适销性，特定目的的适用性和非侵权性的保证。无论是由于软件，使用或其他方式产生的，与之有关或与之有关的合同，侵权或其他形式的任何索赔，损害或其他责任，作者或版权所有者概不负责。软件。

## Changelog