---
BADGE-Number of Installations: http://iobroker.live/badges/s7-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.s7.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.s7.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.s7.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.s7.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.s7/README.md
title: ioBroker.S7
hash: I6x/U3+nhImauYGf++qbdsGE3FrGTXoqptKnNB87LBo=
---
＃ioBroker.S7
＃＃ 详细说明
ioBroker附带的S7适配器基于Snap7 \。 Snap7将在首次安装适配器时安装，并处理S7 PLC和ioBroker之间的TCP / IP通信。因此，S7必须配备以太网接口（集成或外部CP），以便通过TCP / IP与运行ioBroker的硬件进行通信。作为先决条件，用户必须了解有关TCP / IP通信的基础知识，并且他/她必须能够使用Step7软件配置S7 PLC。但对于考虑将S7连接到ioBroker的人来说，这不应该是一个挑战。

##安装
本指南基于以下配置：

* S7-315带集成以太网接口
* Raspberry Pi 2，在Debian GNU / Linux 7.8下运行的ioBroker（wheezy）
* IP地址范围192.168.1.xxx
* PC运行：
    *传播表工具，如MS Excel，Apache Open Office
    *谷歌Chrome浏览器
    * Step7 V5.5 SP4 HF5

**需要额外的文件：（iobroker_adapter_S7.xlsx）[iobroker_adapter_S7.xlsx] **

###通过数据块（DB）进行通信
本指南介绍了ioBroker与S7 PLC之间通过数据块进行的通信。可以为通信生成理想的专用DB。 DB必须集成在S7 \中运行的代码中。这种方法的优点是，您可以确保不会意外地覆盖数据，例如在实例数据块中，这可能会导致S7软件中出现意外或意外的反应。如果由于内存限制而必须使用现有数据块，或者无法对S7软件进行任何修改，请确保仅将相关数据填充到ioBroker以避免冲突。

###生成通信DB
我们将使用4个DB：

* DB20  - 从ioBroker发送到S7的二进制值（S7视图中的数字输入）
* DB21  - 从S7发送到ioBroker的二进制值（S7视图的数字输出）
* DB22  - 从ioBroker发送到S7的实际值（S7视图中的模拟输入）
* DB23  - 从S7发送到ioBroker的实际值（S7视图的模拟输出）

将使用每个数据块具有一个表的电子表格生成DB。

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_1.png)

#### DB20的准备 - 从ioBroker发送到S7的二进制值
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_3.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

A列到M列基于ioBroker中的结构，必须由用户根据S7软件填写。您可能希望使用S7符号表的一部分（复制 - 粘贴）。在列O中，S7 DB的代码是从A到M列的内容派生的。

* A列：DB = S7中的DB编号和ioBroker中的地址的第一部分
* B列：字节= S7中DB的字节和ioBroker中地址的第二部分
* C列：位= S7中DB的位和ioBroker中地址的第三部分
* D列：名称= S7中DB的名称和ioBroker中的名称
* E列：描述= S7中DB的注释和ioBroker中的描述
*列F：类型=在S7中键入DB并键入ioBroker
* G列：长度= ioBroker中的长度
* H列：单位= ioBroker中的单位
*第I列：角色= ioBroker中的角色
* J栏：房间= ioBroker的房间
*列K：轮询=数据点将循环轮询（真/假）
* L列：RW =数据点可写入（真/假）è“true”在DB20中，因为我们要将数据写入S7
* M列：WP =数据点仅对“General  -  General”中定义的“脉冲时间”设置为“1”

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_config_1.png)

* N栏：故意留空
*列O：DB内容=将被复制到Step7进行数据库生成的内容，公式：```= CONCATENATE（D2;“：”; F2;“：=”;“false;”;“//”; E2 ）```

#### DB21的准备 - 从S7发送到ioBroker的二进制值
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_3.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* L列：由于我们要从S7读取数据，因此DB21中的“RW”为“false”

#### DB22的准备 - 从ioBroker发送到S7的实际值
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_4.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* B列：字节=实数值的起始字节（0,4,8，...）
* C列：Bit =左空
*列L：RW在DB22中为“true”，因为我们要将数据写入S7
*列O：公式：```= CONCATENATE_ _（D2;“：”; F2;“：=”;“0.000000e + 000;”;“//”; E2）```

#### DB23的准备 - 从S7发送到ioBroker的实际值
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_5.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* B列：字节=实数值的起始字节（0,4,8，...）
* C列：Bit =左空
*列L：在DB23中RWè“false”，因为我们想要从S7读取数据
*列O：公式：```= CONCATENATE_ _（D2;“：”; F2;“：=”;“0.000000e + 000;”;“//”; E2）```

####在Step7中创建数据库源
我们现在将使用电子表格的O列中的代码在Step7中生成DB。在Step7程序中，通过单击“Sources”上的鼠标右键插入STL源。 [![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_1.png)

将新源重命名为“DB20”。
在空源中插入以下代码：

```
DATA_BLOCK DB 20
    TITLE =
    VERSION : 0.1
    STRUCT
    END_STRUCT ;
    BEGIN
END_DATA_BLOCK
```

源应如下所示：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_2.png)

复制源“DB20”3次并命名副本DB21，DB22，DB23，同时将每个源中的第一行更改为：

*```DATA_BLOCK DB 21```
*```DATA_BLOCK DB 22```
*```DATA_BLOCK DB 23```

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_3.png)

现在转到电子表格，表格DB20，并复制O列中的代码（无标题）：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_4.png)

将单元格粘贴到“STRUCT”和“END_STRUCT;”之间的步骤7中名为“DB20”的源中：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_5.png)

启动编译器，结果应为0错误，0警告。现在已生成DB20，您可以在S7程序的“块”下找到新块。

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_6.png)

该块看起来像这样：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_7.png)

 地址应与电子表格中的地址一致，只需通过比较字节和位的组合进行健全性检查：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_8.png)

对DB21，DB22，DB23重复并确保从右表中选择列O并将其粘贴到正确的源（表DB21到源DB21等）。由于DB22和23将处理REAL值，您可以在下面找到块看起来。

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_9.png)

此处地址也应与电子表格（Byte）对应：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_10.png)

我们现在有4个DB进行通信：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_11.png)

你应该相应地给它们一个符号名称，这有助于保持清晰。不要忘记将它们连接到S7逻辑并下载修改后的代码。

###将DB填充到ioBroker
既然4个DB是S7中运行的代码的一部分，我们将告诉ioBroker如何与S7通信。

####安装S7 Adapter实例
适配器 - 硬件 -  Siemens S7 Adapter  -  +

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_1.png)

如果您希望ioBroker与多个S7 CPU连接，可以使用多个实例。启用新适配器实例：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_2.png)

适配器的标题（标准：Siemens S7 Adapter）也可以在该步骤中更改。使用IP地址作为标题的一部分将是一个想法。打开适配器配置

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_3.png)

并开始配置S7适配器：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_4.png)

*标签“一般”
    * PLC连接
        * PLC IP地址在Step7 HW Config中定义的PLC的IP地址

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_5.png)

* S7 LOGO！如果您使用的是LOGO，而不是S7 PLC
*在Step7 HW Config（R0 / S2）中找到的CPU的PLC机架号
* PLC插槽在Step7 HW Config（R0 / S2）中找到的CPU的插槽号

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_6.png)

* 一般
    * Round real to：实数值的位数将在分隔符后四舍五入，例如：2  - > 12.12 3  - > 12.123 ... 9  - > 12.123456789
    *轮询延迟：通信更新周期，以毫秒为单位
*重新连接时间： <span style="line-height: 1.5;">一旦与S7的连接丢失，将尝试重新连接后的持续时间（以毫秒为单位）</span>
*脉冲时间： <span style="line-height: 1.5;">配置为WP = true的数据点的“1”的时间（以毫秒为单位）</span>
*导入符号文件：
    *加载符号功能从ASCII文件导入Step7符号 - 此处未使用
*导入DB文件：
    *添加数据库功能以从ASCII文件导入Step7数据库 - 此处未使用

####配置ioBroker进行通信
我们跳过标签“输入”，“输出”和“标记”，然后右转到“数据库”：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_7.png)

在这里，您可以找到电子表格的结构。我们已经准备好再次进行批量工程。点击“从CSV导入”按钮[

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_8.png)

而你得到一个空的领域。现在再次转到电子表格，表DB20，并复制A到M列（没有标题）。 [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_9.png)

将单元格粘贴到ioBroker中的空导入字段中，并使用“导出”进行确认 - 这称为“导入”。 [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_10.png)

第一个数据库已完成并准备好进行通信：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_11.png)

重复DB21，DB22，DB23 \。每次单击“从CSV导入”时，都会出现一个空框，但内容将添加到列表中。无论您想要填充多少数据点，都应该立即完成。如果您想通过填写长度，单位，角色，房间来利用ioBroker附带的功能，您也可以在电子表格中执行此操作，以便利用批量工程。如果您决定稍后或仅为几个数据点执行此操作，您也可以使用集成的编辑选项直接在“DB”下的ioBroker中执行此操作。不过，别忘了保存！ 12 [[

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_12.png)

####通讯测试
转到ioBroker中的“Objects”选项卡，找到S7实例（例如s7.0，而不是system.adapter.S7.0）。如果你遗漏了任何东西：F5（网页更新）为王！她找到两组：

*我们配置了4个DB的DB：
    * DB20
    * DB21
    * DB22
    * DB23
*有关连接信息的信息：
    *连接：如果可以在网络上找到S7，则为“true”
    * pdu：PDU大小Snap7连接到S7（S7-300通常为240，S7-400为480）
    * poll_time：Snap7进行通信所需的时间（以毫秒为单位） - 应低于适配器实例配置中“常规” - “常规”下配置的轮询延迟。

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_13.png)

 我们已将DB21和DB23配置为向ioBroker发送信息的DB，即如果在“Objects”下打开DB，您应该看到已经存在的值，为DB提供来自S7代码的数据。

##监视和操作
从“Instances”选项卡启动ioBroker.vis。我建议安装vis-hqwidgets。让我们从一个开关开始：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_14.png)

在视图上拖放一个开关小部件，将其连接到DB20中交换机的对象ID，然后就完成了。如果您现在操作开关，您会发现“Objects” - “s7.x” - “DBs” - “DB20”下的数据点将切换，S7将打开和关闭连接到DB的数据。如果您在步骤7中在线监视数据库，您将看到数据库中的数据点将从“0”变为“1”等。二进制状态的工作方式完全相同：在视图中拖放窗口小部件并连接从DB21到它的相关数据点。对于真正的价值观也是如此：

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_15.png)

重要提示：用户负责将正确的数据点连接到小部件。您可以将实际值连接到二进制状态（例如灯泡），因此一旦实际值> 1.0，灯泡将显示“打开”。这就是全部，伙计们，非常简单直接，是吧？

## Changelog
### 1.1.4 (2018.07.10)
* (Apollon77) Support for nodejs 10 on windows

### 1.1.3 (2018.01.19)
* (bluefox) The time offset was added

### 1.1.1 (2018.01.05)
* (Apollon77) Fix LOGO! support

### 1.1.0 (2018.01.03)
* (bluefox) Fix strings
* (bluefox) fix names if they have more than one space

### 1.0.6 (2017.12.18)
* (bluefox) Decode error codes

### 1.0.5 (2017.12.17)
* (bluefox) Error by the DB import is fixed

### 1.0.4 (2017.11.30)
* (bluefox) Fix read of DB (range error)

### 1.0.2 (2017.10.30)
* (Apollon77) Enhance object data to allow writing if available
* (bluefox) Add export from Graphpic

### 1.0.1 (2017.10.24)
* (bluefox) Detect DB and db in addresses

### 1.0.0 (2017.09.25)
* (bluefox) Activate save button if something was deleted

### 0.3.2 (2017.09.20)
* (bluefox) Fix DB bit offset bug if starting not from 0

### 0.3.0 (2017.07.12)
* (Apollon77) Upgrade node-snap7 library to current version

### 0.2.6 (2017.05.19)
* (Apollon77) Fix history handling

### 0.2.5 (2016.12.09)
* (bluefox) Fix button text: Import

### 0.2.4 (2015.10.29)
* (bluefox) add comment about python
* (bluefox) implement string read and write
* (bluefox) implement auto-increment of addresses.
* (bluefox) fix length
* (bluefox) implement export import from/to CSV
* (bluefox) fix small errors in config
* (bluefox) implement import/export for inputs and outputs too.
* (bluefox) add translation

### 0.2.3 (2015.09.24)
* (bluefox) add suppor of Logo!

### 0.2.2 (2015.09.11)
* (bluefox) add S7time
* (bluefox) support rooms and roles
* (bluefox) it works
* (bluefox) update packets

### 0.2.1 (2015.09.09)
* (bluefox) fix creation of objects

### 0.2.0 (2015.08.15)
* (bluefox) improve performance and enable DB2 3.9 addresses.

### 0.1.8 (2015.08.10)
* (smiling_Jack) Bugfix send info states
* (smiling_Jack) Remove unneeded conole.log

### 0.1.7 (2015.08.06)
* (smiling_Jack) Bugfix send to SPS
* (smiling_Jack) Bugfix reconnect on connection lost

### 0.1.6 (2015.07.31)
* (smiling_Jack) Bugfix typo (Adress, Merkers)

### 0.1.5 (2015.07.29)
* (smiling_Jack) Bugfix translation Admin

### 0.1.4 (2015.07.28)
* (smiling_Jack) Add S5Time as Type
* (smiling_Jack) Bugfix History
* (smiling_Jack) Bugfix (fast value change)

### 0.1.3 (2015.06.04)
* (bluefox) translate admin
* (bluefox) remove jshint warnings
* (bluefox) add info.connected and rename info.connection to info.state

### 0.1.2
* Bugfix startup
* Bugfix add states

### 0.1.1
* change import options

### 0.1.0
* redesign Admin UI
* add write as Pulse
* Bugfix delete unused objects

### 0.0.8
* Bugfix start file
* Bugfix DB import
* Working on Admin style
* Add Units

### 0.0.6
* Bugfix start file