---
title: 发展
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterdoctemplate.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: rrrjyCfMyLCz6GbkLq/cltXrIL8D5wQPGBmpWRj2Bsk=
---

＃用于创建适配器文档的模板
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

~~~ markdown --- title：“{page title}”lastChanged：“{修改日期的文章}”editLink：“{链接到GitHub上的这个文件}”--- ---

！>警告！这个模板远非最终版！示例实现是[和谐适配器](adapterref/docs/iobroker.harmony/de/README)。

＃ <img src="zh-cn/dev/media/{Adaptericon}" width=150 hight=150/> （名称）的转接适配器
本节提供适配器预期用途的最终用户友好摘要。此摘要应保持简短（最多1-3个小段）。它应该包含如此多的信息，以引起用户的兴趣，并且他可以决定适配器是否与他相关。

有关适配器和任何设备的技术背景信息，请参见“概述”部分。

<!-- Einführungsbild--> ![{旧图片名称}](zh-cn/dev/../../de/dev/media/{Bild} "{图像描述") <span style="color:grey">* {image description} *</span>

<details open><summary>内容</summary><p>

|导航|
| 1§§LLLL_0§§|
| 2§§LLLL_0§§|
| 3§§LLLL_0§§|
| 4§§LLLL_0§§|
| 5§§LLLL_0§§|
| 6§§LLLL_0§§|
| 7§§LLLL_0§§|
| 8§§LLLL_0§§|
| 9§§LLLL_0§§|
| 10§§LLLL_0§§|
| 11§§LLLL_0§§|
| 12§§LLLL_0§§|
| 12 [历史]（＃history）|

</ p> </细节>

<a name="steckbrief"/>

##特征
>注意！下表仅是一个示例。它由文档生成器动态生成并在此处插入。
根据所选字段，数据源例如是相应适配器的`frontmatter`，`io-package.json`和`package.json`。

|                         |                              |
|-------------------------|:----------------------------:|
|纪录片的状态| {date：} |
|当前版本稳定| ！[稳定] [logo] |
|当前版本最新| ！[最新] [logo] |
| OS |支持OS |
|节点版本|支持的节点版本|
|开发者|开发人员的名称/别名|
| Github |链接|
|许可证| WITH | |
|关键词| `Suchworte`|
|依赖性| `dependencies`|
|依赖性| `dependencies` |

<a name="überblick"/>

##概述
### {Tailored System}
本节介绍任何连接系统或过程的基础知识。有什么好处？你能用它做什么？沟通如何完成？什么是系统结构？存在哪种框架条件？

### {adapter name}适配器
以下是适配器的背景信息。这可以是关于设备适配器上下文中的设备的信息，或者，对于通信协议的适配器，是协议的基础。
然而，对于初学者来说，这个文本应该是普遍可以理解的。

<a name="voraussetzungen"/>

##安装前的先决条件
用户在此处接收信息，如果需要，在安装适配器u.a之前执行哪些步骤。在外部系统上。这包括例如根据制造商文档注册API密钥或连接系统的配置。

<a name="installation"/>

##安装
这里描述了安装的特殊功能，这些功能超出了此处**文档标准安装的范围。这可以是例如
在实际的适配器安装或服务器上的端口激活之前手动安装软件。

>通过ioBroker管理界面安装适配器的实例。
有关必要安装步骤的详细说明，请参见** **。

<a name="konfiguration"/>

##配置
简要介绍配置。对于每个管理员窗口，提供了一个separter部分。

<a name="{Eindeutiger Fensterbezeichner}"/>

### Window“{Window title}”
![{Alt键名}](zh-cn/dev/../../de/dev/media/{Formularfelderbild} "{图像}说明") <span style="color:grey">* {image description} *</span>

|领域|说明|
|:-------------------|:-------------|
| **{表格字段1}** | {描述} |
| **{表格字段2}** | {描述} |
| **{form field}** | {description} |

特殊笔记的空间。

<a name="{Eindeutiger Fensterbezeichner}"/>

### Window“{Window title}”
![{Alt键名}](zh-cn/dev/../../de/dev/media/{Formularfelderbild} "{图像}说明") <span style="color:grey">* {image description} *</span>

|领域|说明|
|:-------------------|:-------------|
| **{表格字段1}** | {描述} |
| **{表格字段2}** | {描述} |
| **{form field}** | {description} |

特殊笔记的空间。

配置的最终文本

>完成配置后，将使用`SPEICHERN UND SCHLIEßEN`退出配置对话框。这将导致随后重新启动适配器。

<a name="instanz"/>

##实例
>适配器的安装在`Objekte`部分中创建了{adapter name}适配器的活动实例。

![例](zh-cn/dev/../../de/dev/media/a_harmony_instanz.png "例") <span style="color:grey">*初审*</span>

有关适配器实例的更多信息的空间。例如，是否可以在服务器上安装多个实例，或者实例在多主机系统上的行为方式。

>适配器是启用还是连接到{device}，由实例的状态字段的颜色指示。如果鼠标指针指向符号，则显示更详细的信息。

<a name="objekte"/>

##适配器的对象
>在`Objekte`部分中，适配器在集线器中检测到的所有设备和活动都以树结构列出。另外，还提供关于与集线器的通信是否顺利进行的信息。

![老物件名称](zh-cn/dev/../../de/dev/media/{Bildname} "“{图片}说明") <span style="color:grey">* {image description} *</span>

>创建的对象及其含义定义如下：

对象|访问|说明：------------------------- |：-------：|：----------- **{instance}** | R |适配器的第一个*实例*的名称＆emsp; **{subobject}** | R |名称* {...} *，列表，含义......
＆emsp; **** {sub-object}** | R |名称* {...} *，列表，含义......
＆EMSP;＆EMSP; *** {}数据点*** | R / W |功能＆emsp;＆nbsp; *** {数据点} *** |的数据点说明R / W |带功能的数据点描述

该表尝试简化对象树的表示，并说明各个对象对用户的含义和应用。它为用户提供了参考文档，例如：使用JavaScript访问对象层次结构。

### {更深入地解释对象分组}
这里可以突出显示对象树的摘录并特别考虑。

#### {有关单个对象或功能的更深入说明}
由于对象表中的描述空间在这里通常是不够的，例如，各个数据点都有更详细的记录。

可写数据点示例：

####启动活动当您为活动`{Instanz}.{Hub Name}.activities.{Aktivität}`输入大于0的数字时，将启动活动。
在执行活动期间，此值首先更改为1（=开始），然后更改为2（=活动）。
### {更深入地解释对象分组}
根据对象树的结构和适配器的功能给出了这里的个性化设计选项。

各个数据点的描述示例：

####状态值`{Instanz}.{Hub Name}.activities.currentActivity`以字符串形式返回当前运行的活动。
`{Instanz}.{Hub Name}.activities.currentStatus`表示Harmony Hub的状态。价值观意味着

 -  0 =无效
 -  1 =开始
 -  2 =有效

##卸载
如果要再次删除该实例，则将通过Instances列中指定的垃圾桶图标将其删除

<img src="zh-cn/dev/media/adapter_AdapterName_delete_01.png">

出现确认提示，必须用*** OK ***确认

<img src="zh-cn/dev/media/adapter_AdapterName_delete_02.png">

然后会再次出现一个窗口，显示卸载命令的处理

<img src="zh-cn/dev/media/adapter_AdapterName_delete_03.png">

此卸载将完全删除属于该实例的所有对象。

如果安装文件已从主机中完全删除，则必须通过“适配器”部分的AdapterName适配器磁贴中的垃圾桶图标完成此操作。

## Examples / demo
Lorem ipsum

##特价
备份多主机历史记录性能

##已知问题
*无论如何

  解决方案：

*和一个非常糟糕的错误

  解决方案：

*魔鬼知道

  解决方案：

##国家一体化
### Blockly
Lorem ipsum

### Node-Red
Lorem ipsum

### Vis
Lorem ipsum

###历史
Lorem ipsum

##链接
还有GitHub（开发者区域？）和外部资源的链接？但请不要在纪录片的开头，而不是在最后。
首先是清淡的食物。

##开发者区域
~~~