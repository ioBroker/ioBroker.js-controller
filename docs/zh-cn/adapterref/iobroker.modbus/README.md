---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: TOU8dQgOXSQlCVGEXCnoA2Q/sLRNJ1N9pEhI7PIt2J8=
---
![商标](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![安装数量](http://iobroker.live/badges/modbus-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.modbus.svg)
![下载](https://img.shields.io/npm/dm/iobroker.modbus.svg)
![NPM](https://nodei.co/npm/iobroker.modbus.png?downloads=true)

#iobroker.modbus
为ioBroker实现ModBus Slave和Master。支持以下类型：

 -  Modbus RTU over serial（master）
 -  TCP上的Modbus RTU（主站）
 -  Modbus TCP（从站，主站）

##设置
###合作伙伴IP地址
modbus合作伙伴的IP地址。

＃＃＃ 港口
TCP端口的modbus伙伴如果配置为主（客户端）或自身端口（如果配置为从属（服务器））。

＃＃＃ 设备编号
Modbus设备ID。如果使用TCP / Modbus桥，则很重要。

###类型
从属（服务器）或主服务器（客户端）。

###使用别名作为地址
通常，所有寄存器的地址都可以是0到65535.通过使用别名，您可以为每种类型的寄存器定义虚拟地址字段。一般：

 - 离散输入从10001到20000
 - 线圈从1到1000
 - 输入寄存器为30001至40000
 - 保持寄存器从40001到60000

每个别名都将在内部映射到地址，例如30011将映射到输入寄存器10，依此类推。

###不要将地址与单词对齐
通常，线圈和离散输入地址对齐到16位。类似地址从3到20将对齐到0到32。
如果此选项处于活动状态，则地址将不会对齐。

### Round Real to
用逗号表示浮点数和双精度数后的位数。

###民意调查延迟
循环轮询间隔（仅与主站相关）

###重新连接时间
重新连接间隔（仅与主站相关）

###脉冲时间
如果脉冲用于线圈，则定义脉冲的时间间隔。

###最大读取请求长度
命令READ_MULTIPLE_REGISTERS的最大长度为要读取的寄存器数。

一些系统需要首先“写入请求”以在“读取请求”上传递数据。
您可以通过将“最大读取请求长度”设置为1来强制执行此模式。

**注意：**某些USB Modbus解决方案（例如基于socat）可能无法使用serialport npm模块。

有一个软件[** Modbus RTU < - > TCP上的Modbus RTU **](http://mbus.sourceforge.net/index.html)网关，可以通过TCP协议使用串行RTU。

两种解决方案** RTU over TCP **和** TCP **都运行良好。

##数据类型
 -  uint16be  - 无符号16位（Big Endian）：AABB => AABB
 -  uint16le  - 无符号16位（Little Endian）：AABB => BBAA
 -  int16be  - 有符号16位（Big Endian）：AABB => AABB
 -  int16le  - 有符号16位（Little Endian）：AABB => BBAA
 -  uint32be  - 无符号32位（Big Endian）：AABBCCDD => AABBCCDD
 -  uint32le  - 无符号32位（Little Endian）：AABBCCDD => DDCCBBAA
 -  uint32sw  - 无符号32位（Big Endian字交换）：AABBCCDD => CCDDAABB
 -  uint32sb  - 无符号32位（Big Endian字节交换）：AABBCCDD => DDCCBBAA
 -  int32be  - 有符号32位（Big Endian）：AABBCCDD => AABBCCDD
 -  int32le  - 有符号32位（Little Endian）：ABBCCDD => DDCCBBAA
 -  int32sw  - 有符号32位（Big Endian Word Swap）：AABBCCDD => CCDDAABB
 -  int32sb  - 有符号32位（Big Endian Byte Swap）：AABBCCDD => DDCCBBAA
 -  uint64be  - 无符号64位（Big Endian）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
 -  uint64le  - 无符号64位（Little Endian）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
 -  uint8be  - 无符号8位（Big Endian）：AA => AA
 -  uint8le  - 无符号8位（Little Endian）：AA => AA
 -  int8be  - 有符号8位（Big Endian）：AA => AA
 -  int8le  - 有符号8位（Little Endian）：AA => AA
 -  floatbe  -  Float（Big Endian）：AABBCCDD => AABBCCDD
 -  floatle  -  Float（Little Endian）：AABBCCDD => DDCCBBAA
 -  floatsw  -  Float（Big Endian Word Swap）：AABBCCDD => CCDDAABB
 -  floatsb  -  Float（Big Endian Byte Swap）：AABBCCDD => DDCCBBAA
 -  doublebe  -  Double（Big Endian）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
 -  doublele  -  Double（Little Endian）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
 -  string  -  String（Zero-end）：ABCDEF \ 0 => ABCDEF \ 0
 -  stringle  -  String（Little Endian，Zero-end）：BADCFE \ 0 => ABCDEF \ 0

以下描述是从[这里](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/)复制的

点对点Modbus协议是RTU通信的流行选择，如果没有其他原因它是基本的便利。协议本身控制Modbus网络上每个设备的交互，设备如何建立已知地址，每个设备如何识别其消息以及如何从数据中提取基本信息。从本质上讲，该协议是整个Modbus网络的基础。

然而，这种便利性并非没有一些复杂性，Modbus RTU消息协议也不例外。协议本身是基于具有16位寄存器长度的器件设计的。因此，在实现32位数据元素时需要特别注意。该实现决定使用两个连续的16位寄存器来表示32位数据或基本上4字节的数据。在这4个字节的数据中，单精度浮点数据可以编码为Modbus RTU消息。

###字节顺序的重要性
Modbus本身没有定义浮点数据类型，但人们普遍认为它使用IEEE-754标准实现了32位浮点数据。但是，IEEE标准没有明确规定数据有效载荷的字节顺序。因此，处理32位数据时最重要的考虑因素是数据按正确顺序寻址。

例如，IEEE 754标准中针对单精度32位浮点数定义的数字123 / 456.00如下所示：

![此搜索](../../../en/adapterref/iobroker.modbus/img/img1.png)

各种字节排序的影响很大。例如，在“B A D C”序列中对表示123456.00的4字节数据进行排序，称为“字节交换”。当解释为IEEE 744浮点数据类型时，结果完全不同：

![镜像2](../../../en/adapterref/iobroker.modbus/img/img2.png)

在“C D A B”序列中排序相同的字节称为“字交换”。同样，结果与原始值123456.00大不相同：

![图像3](../../../en/adapterref/iobroker.modbus/img/img3.png)

此外，“字节交换”和“字交换”基本上都会完全颠倒字节序列以产生另一个结果：

![图像4](../../../en/adapterref/iobroker.modbus/img/img4.png)

显然，在使用Modbus等网络协议时，必须严格注意内存字节在传输时的排序方式，也称为“字节顺序”。

###确定字节顺序
根据Modbus应用协议规范V1.1.b，Modbus协议本身被声明为“big-Endian”协议：

```Modbus uses a “big-Endian” representation for addresses and data items. This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.```

Big-Endian是网络协议最常用的格式 - 实际上很常见，它也被称为“网络秩序”。

鉴于Modbus RTU消息协议是big-Endian，为了通过Modbus RTU消息成功交换32位数据类型，必须考虑主站和从站的字节顺序。许多RTU主设备和从设备允许特定的字节顺序选择，特别是在软件模拟单元的情况下。必须确保所有单元都设置为相同的字节顺序。

根据经验，设备的微处理器系列决定了它的字节顺序。通常，big-Endian样式（首先存储高位字节，然后是低位字节）通常在使用Motorola处理器设计的CPU中找到。 little-Endian样式（首先存储低位字节，然后是高位字节）通常在使用Intel架构的CPU中找到。关于哪种风格被认为是“倒退”，这是个人观点的问题。

但是，如果字节顺序和字节顺序不是可配置选项，则必须确定如何解释字节。这可以通过从从站请求已知的浮点值来完成。如果返回不可能的值，即具有两位数指数等的数字，则字节排序很可能需要修改。

###实用帮助
FieldServer Modbus RTU驱动程序提供多种功能移动，可处理32位整数和32位浮点值。更重要的是，这些函数移动考虑了所有不同形式的字节排序。下表显示了FieldServer函数移动，它将两个相邻的16位寄存器复制为32位整数值。

|功能关键字|交换模式|来源字节|目标字节|
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.i32-s |字节和字交换| [a b] [c d] | [d c b a] |
| 2.i16-1.i32-sb |字节交换| [a b] [c d] | [b a d c] |
| 2.i16-1.i32-sw |单词交换| [a b] [c d] | [c d a b] |

下表显示了FieldServer函数移动，它将两个相邻的16位寄存器复制到32位浮点值：

|功能关键字|交换模式|来源字节|目标字节|
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | N / A | [a b] [c d] | [a b c d] |
| 2.i16-1.ifloat -s |字节和字交换| [a b] [c d] | [d c b a] |
| 2.i16-1.ifloat-sb |字节交换| [a b] [c d] | [b a d c] |
| 2.i16-1.ifloat-sw |单词交换| [a b] [c d] | [c d a b] |

下表显示了FieldServer函数移动，它将单个32位浮点值复制到两个相邻的16位寄存器：

|功能关键字|交换模式|来源字节|目标字节|
|------------------|-------------------|-----------------|----------------|
| 1.float-2.i16 | N / A | [a b] [c d] | [a b] [c d] |
| 1.float-2.i16-s |字节和字交换| [a b] [c d] | [d c] [b a] |
| 1.float-2.i16-sb | byte swap | [a b] [c d] | [b a] [d c] |
| 1.float-2.i16-sw |单词交换| [a b] [c d] | [c d] [a b] |

鉴于各种FieldServer功能的移动，32位数据的正确处理取决于选择合适的数据。观察这些FieldServer函数的以下行为在已知的单精度十进制浮点值123456.00上移动：

| 16位值|功能移动|结果|功能移动|结果|
|---------------|-------------------|-----------|-------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.float-2.i16 | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.float-S | 123456.00 | 1.float-2.i16-S | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-SB | 123456.00 | 1.float-2.i16-SB | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-SW | 123456.00 | 1.float-2.i16-SW | 0x47F1 0x2000 |

请注意，不同的字节和字顺序需要使用相应的FieldServer函数移动。选择正确的功能移动后，可以在两个方向上转换数据。

在互联网上可用的许多十六进制到浮点转换器和计算器中，很少有实际允许操作字节和字顺序。其中一个这样的实用程序位于www.61131.com/download.htm，可以下载Linux和Windows版本的实用程序。安装后，该实用程序将作为具有单个对话框界面的可执行文件运行。该实用程序的十进制浮点值为123456.00，如下所示：

![图像5](../../../en/adapterref/iobroker.modbus/img/img5.png)

然后可以交换字节和/或字来分析Modbus RTU主设备和从设备之间可能存在的潜在字节序问题。

##测试
文件夹* test'中有一些程序用于测试TCP通信：

 -  Ananas32 / 64是从模拟器（仅保持寄存器和输入，无线圈和数字输入）
 -  RMMS是主模拟器
 -  mod_RSsim.exe是从模拟器。您可能需要[Microsoft Visual C ++ 2008 SP1可再发行组件包]（https://www.microsoft.com/en-us/download/details.aspx?id=5582）来启动它（因为SideBySide错误）。

＃2.0.9（2018-10-11）
*（Bjoern3003）写入寄存器已更正

＃2.0.7（2018-07-02）
*（bluefox）服务器模式已修复

＃2.0.6（2018-06-26）
*（bluefox）rtu-tcp主模式是固定的

＃2.0.3（2018-06-16）
*（bluefox）修正了数字的舍入

＃2.0.2（2018-06-12）
*（bluefox）修复了块读取的错误
*（bluefox）实现了离散值的块读取

＃2.0.1（2018-05-06）
*（bluefox）添加了多个设备ID的支持

＃1.1.1（2018-04-15）
*（Apollon77）优化重新连接处理

＃1.1.0（2018-01-23）
*（bluefox）添加了小端字符串
*（Apollon77）升级Serialport库

＃1.0.2（2018-01-20）
*（bluefox）固定读取线圈

＃0.5.4（2017-09-27）
*（Apollon77）几个修复

＃0.5.0（2017-02-11）
*（bluefox）逐个创建所有状态

＃0.4.10（2017-02-10）
*（Apollon77）不要在适配器启动时重新创建所有数据点
*（ykuendig）多重优化和措辞修复

＃0.4.9（2016-12-20）
*（bluefox）修复串行RTU

＃0.4.8（2016-12-15）
*（Apollon77）更新用于节点6.x兼容性的串行端口库

＃0.4.7（2016-11-27）
*（bluefox）使用旧版本的jsmodbus

＃0.4.6（2016-11-08）
*（bluefox）向后兼容0.3.x

＃0.4.5（2016-10-25）
*（bluefox）在tcp和serial上更好的缓冲区处理

＃0.4.4（2016-10-21）
*（bluefox）修复保持寄存器的写入

＃0.4.1（2016-10-19）
*（bluefox）通过串口和TCP（仅限从站）支持ModBus RTU

＃0.3.11（2016-08-18）
*（Apollon77）修复循环中错误的字节数

＃0.3.10（2016-02-01）
*（bluefox）修复丢失的历史记录设置。

＃0.3.9（2015-11-09）
*（bluefox）通过写保持寄存器来使用write_multiple_registers。

＃0.3.7（2015-11-02）
*（bluefox）如果“最大读取请求长度”为1，则添加特殊读/写模式。

＃0.3.6（2015-11-01）
*（bluefox）为保持寄存器添加循环写入（修复）

＃0.3.5（2015-10-31）
*（bluefox）为保持寄存器添加循环写入

＃0.3.4（2015-10-28）
*（bluefox）添加双打并修复uint64

＃0.3.3（2015-10-27）
*（bluefox）修复保持寄存器

＃0.3.2（2015-10-27）
*（bluefox）修复从文本文件导入

＃0.3.1（2015-10-26）
*（bluefox）修复读取块长度（主）的错误
*（bluefox）支持读取块和最大读取请求长度（主）
*（bluefox）可以通过导入定义字段

＃0.3.0（2015-10-24）
*（bluefox）添加圆形设置
*（bluefox）添加deviceID
*（bluefox）slave支持浮点数，整数和字符串

＃0.2.6（2015-10-22）
*（bluefox）为inputRegisters添加不同的类型，并仅为FORTER FOR MASTER保存寄存器

＃0.2.5（2015-10-20）
*（bluefox）修复对象名称（如果使用别名）

＃0.2.4（2015-10-19）
*（bluefox）修复错误添加新值

＃0.2.3（2015-10-15）
*（bluefox）修复了master的错误

＃0.2.2（2015-10-14）
*（bluefox）实现奴隶
*（bluefox）改变寻址模型

＃0.0.1
*（bluefox）初始提交

## Changelog