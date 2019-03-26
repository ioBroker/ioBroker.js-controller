---
title: 发展
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterref.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: IYmWNcjsLct6SUeJOBiD2aQbb8kscc212HcdRDWFGOU=
---

#Adinler reflex
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

@@@ substructure：https：//github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation和IDE，nodejs-versions，own tag，更多ROllen，类型杂项...... @@@

##数据结构 - 对象和状态
ioBroker中的适配器是一个独立的进程，可以在中央数据存储中读取和写入对象和状态。数据存储可以表示为数据库（redis / couchDB）或只是文本文件，但连接方式始终相同 - 通过API。这意味着，开发人员不应该关心它。

存储中有两种类型的数据：

*物件
*国家

对象是某些数据点的静态描述。状态是数据点的动态值。所以通常对于每个州都有一个描述对象。 （但反之亦然）。

对象因此描述：

*主机配置
*适配器的描述
*适配器实例的配置
*配置HTML文件的内容
* WEB文件的内容
*枚举
*用户
*州的层次结构（渠道和设备）

您可以在“对象”选项卡上的管理适配器中浏览对象和当前状态值。

不同部分的对象名称。每个部分除以“。”彼此。有一个系统对象（名称以_或“system。”开头）和适配器对象（名称以adapterName开头）。

注意：来回，adapterName是开发人员想要创建的适配器的名称。

状态可以分组在通道和设备中的通道中。以下是Homematic组和频道的示例：

* hm-rpc.0.IEQ1234567  - 设备
  * hm-rpc.0.IEQ1234567.0  - 频道
    * hm-rpc.0.IEQ1234567.0.INFO  - 州
    * hm-rpc.0.IEQ1234567.0.RSSI  - 状态
  * hm-rpc.0.IEQ1234567.0  - 频道
    * hm-rpc.0.IEQ1234567.0.STATE  - 状态
    * hm-rpc.0.IEQ1234567.0.BATTERY  - 状态

状态ID必须始终以通道名称和通道名称与设备名称开头。例如在上面的状态名称hm-rpc.0.IEQ1234567.0.INFO中，部分hm-rpc.0.IEQ1234567.0是通道名称，hm-rpc.0.IEQ1234567是设备名称。

它用于构建层次结构中的设备，通道和状态的协调。

注意：如果适配器不那么复杂，可以省略设备和偶数通道。

** Adapter **只是文件包，放在node_modules目录中。对于每个适配器，可以在对象“system.adapter.adapterName”中找到此适配器的描述。它只是来自io-package.json文件的“common”和“native”字段。当iobroker安装adapterName或iobroker add adapterName被调用时，将自动创建此条目。 Iobroker.adapterName在创建第一个实例之前不会创建任何条目。但它并不那么重要。 “更新”信息所需的信息将直接从io-package.json中读取。为适配器常用设置完整列表，可以发现[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapter)。

**实例**是适配器的实例。根据适配器的类型，可以创建多个实例，但对于某些适配器，创建多个实例是没有用的。例如在vis或rickshaw的情况下，只能创建一个实例。此行为由io-package.json中的标志控制。

对于每个实例，可以在“system.adapter.adapterName.X”ID下的数据存储中找到配置对象，其中X是适配器实例编号。它包含适配器的此实例的设置。通常它由“常见”和“原生”设置组成。常见设置是：

* enabled：true / false;
* host：此实例必须运行的主机名;
* mode：none，daemon，subscribe，schedule，once;

描述可以在[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#instance)中找到。

设备的IP地址，设备设置等。

注意：实例可以在不同的主机（在多主机系统中）和适配器上运行。

所有适配器实例对象ID都以adapterName.X开头，其中X是适配器实例的编号。

对象具有不同类型以用于不同目的。

对于每个适配器，将自动创建以下对象：

* system.adapter.adapterName：适配器的描述（如名称，版本号，......）
* adapterName：包含来自适配器“www”目录的HTML / JS / CSS文件的对象。仅当在适配器包中找到“www”目录时，才会创建此对象。
* adapterName.admin：包含来自适配器包的“admin”目录的HTML / JS / CSS文件的对象。

对于每个适配器实例'X'，将自动创建以下内容：

* system.adapter.adapterName.X：适配器实例的配置
* system.adapter.adapterName.X.alive：指示实例是否存活（每30秒发送一次消息）
* system.adapter.adapterName.X.connected：指示实例是否连接到数据存储，因为它无法连接，但因为死锁无法发送活动消息。
* system.adapter.adapterName.X.memHeapTotal：内存使用情况
* system.adapter.adapterName.X.memHeapUsed：内存使用情况
* system.adapter.adapterName.X.memRss：内存使用情况
* system.adapter.adapterName.X.uptime：适配器运行多少秒。

可以找到内存的解释[这里](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for)。

如果适配器具有'none'或'once'模式，则不会创建alive，uptime，...对象。
适配器的目录结构

适配器包必须具有一些必需的目录和文件：

* admin（强制目录）
  * index.html
  * xxx.png  - 可选，如果名称为adapterName.png则更好（支持任何图像格式：jpeg，jpg，svg，bmp，...）
* www  - （可选目录）
* lib  - （强制目录，因为utils.js）
  * utils.js
* package.json  - 必填
* io-package.json  - 必填
* main.js  - 必填（可以是adapterName.js）

注意：lib / utils.js是所有适配器的公共文件，用于检测js控制器的位置以及相应的iobroker.js-controller / lib / adapter.js路径。大多数实际的utils.js都可以在这里下载。请勿更改此文件。

##文件命名
适配器必须遵循某些命名约定，以便由ioBroker控制器接受和启动。

*在github（或其他地方），它必须具有名称* io **B** roker.adapterName *。
Iobroker.adapterName，因为npm doe允许包名中的大写字母。它可以在package.json中定义
*用于配置适配器的GUI html文件必须具有admin / index.html。它可以是“admin”目录中的更多文件，但index.html必须存在。
*适配器的启动文件必须具有名称main.js或adapterName.js。
*适配器的名称必须是唯一的，小写的，没有特殊字符且没有空格。适配器名称中允许使用“ - ”，“_”。

## Io-package.json的结构
js-controller使用io-package.json来显示适配器以及如何处理它。可以在此处找到共同部分中所有字段的完整描述

io-package.json希望被“admin”读取以找出适配器的在线版本。
常见的领域

最重要的共同领域是：

*姓名：必填。没有“ioBroker。”的适配器名称，类似于adapterName而不是“ioBroker.adapterName”
*版本：强制性。必须与package.json中一样。
*标题：强制性。适配器的简称，如“适配器名称”
* desc：强制性。适配器的描述。它可能是一个字符串，如“此适配器执行此操作”

~~~ json {“en”：“此适配器执行此操作”，“de”：“此aadpter执行此操作”，“ru”：“Этотдрайверделаеттоиэто”} ~~~

如果当前语言不存在条目，则将显示英语说明。

*平台：强制性。实际上只支持“Javascript / Node.js”。
*模式：强制性。时尚如何启动适配器。
*启用：可选。设置为true时，将在添加后激活实例。
* license“：许可证名称和适配器的许可证;
* loglevel“：创建后想要设置的初始日志级别。”可以“调试”，“信息”，“警告”或“错误”
*自述“：链接到互联网中的自述页面由管理适配器用于显示链接，如果单击”？“按钮。
* icon“：适配器图标的图标名称（不是路径）。
* extIcon：Internet中的图标路径，显示适配器的图标。
*关键字：关键字作为数组，以启用管理适配器中的搜索。
* localLink：链接到适配器“www”文件（或适配器服务器）。 “Http://192.168.0.100”
*类型：以下类型是可能的：硬件，社交，存储，视觉，api，脚本，天气，其他，连接。
* messagebox：可选。如果适配器应接收系统消息，则必须设置为true。

注意：localLink可以有特殊键。

*％ip％：想要替换为第一个“web”实例中定义的IP地址。
*％field％，其中field是来自适配器实例配置的“native”部分的属性。

例如“http：//％ip％：％port％”希望显示为“http://192.168.0.1:8080”，其中“192.168.0.1”是来自“web”适配器的IP地址，8080是来自“system”的值.adapter.adapterName.X => native.port“。
对象字段

对象 - 无法自动创建适配器的所有实例（xxx.object）的静态对象。这些对象不能依赖于任何特定实例，并且对于此适配器的所有实例都是通用的。例如，hm-rpc适配器具有所有HomeMatic设备的结构描述。

此外，可以定义新视图。在SQL中，它们被称为“存储过程”，在couchDB中也称为视图。

注意：不要与“vis”视图混在一起。

对于视图定义，使用javascript语言。这是样本：

~~~ json {“_ id”：“_ design / hm-rpc”，“language”：“javascript”，“views”：{“listDevices”：{“map”：“function（doc）{\ n if（doc ._id.match（/ ^ HM-RPC \\。[0-9] + \\。\\ *？[A-ZA-Z0-9 _-] +（\\。[0-9] +）？$ /））{\ n emit（doc.id，{ADDRESS：（doc.native？doc.native.ADDRESS：''），VERSION：（doc.native？doc.native.VERSION：''）}）; \ n} \ n}“}，”paramsetDescription“：{”map“：”function（doc）{\ n if（doc._id.match（/ ^ hm-rpc \\。meta /）&& doc.meta.type ==='paramsetDescription'）{\ n emit（doc._id，doc）; \ n} \ n}“}}} ~~~

以下是为hm-rpc适配器定义的两个视图：“listDevices”和“paramsetDescription”。它们从数据存储中返回由视图条件对象过滤的集合。它可以有效（如果使用CouchDB）请求指定的对象列表。

要使用视图：

~~~ javascript adapter.objects.getObjectView（'hm-rpc'，'listDevices'，{startkey：'hm-rpc。'+ adapter.instance +'。'，endkey：'hm-rpc。'+ adapter.instance +'。\ u9999'}，function（err，doc）{if（doc && doc.rows）{for（var i = 0; i <doc.rows.length; i ++）{var id = doc.rows [i ] .id; var obj = doc.rows [i] .value; console.log（'Found'+ id +'：'+ JSON.stringify（obj））;} if（！doc.rows.length）console。 log（'找不到对象。'）;} else {console.log（'找不到对象：'+ err）;}}）; ~~~

startkey和endkey的使用也可以在同一页面上找到。

注意：视图的使用基于有关CouchDB的基本知识水平。

###实例对象字段
可以在io-package.json的instanceObjects中定义一些特定的对象或对象。

对于每个创建的实例，将创建instanceObjects字段中的所有实例。

例如，适配器hm-rpc为每个实例创建“更新”状态，以便向其他适配器发出信号，这些信号必须由hm-rega处理。

~~~ json“instanceObjects”：[{“_ id”：“updated”，“type”：“state”，“common”：{“name”：“添加了一些新设备”，“type”：“bool”， “read”：true，“write”：true}}] ~~~

没有必要提供对象的完整路径，因为适配器实例未知，所以无法完成。您可以在common.name中使用特殊单词“％INSTANCE％”在对象名称中显示它。例如：

~~~ javascript“name”：“在hm-rpc％INSTANCE％中添加了一些新设备”，~~~

将扩大到

~~~ javascript“name”：“在hm-rpc.0中添加了一些新设备，~~~

通过创建第一个实例。

### Package.json
package.json是npm包标准描述文件，可以在https://docs.npmjs.com/files/package.json下找到。

package.json的简短结构：

~~~ json {“name”：“iobroker.adapterName”，“version”：“0.0.1”，“description”：“Adapter XXX”，“author”：“myName <myemail@mail.com>”“主页“：”https：//github.com/yourgit/ioBroker.adapterName“，”readme“：”https：//github.com/yourgit/ioBroker.adapterName/blob/master/README.md“，”keywords“： [“ioBroker”，“adapterName”]，“repository”：{“type”：“git”，“url”：“https://github.com/yourgit/ioBroker.adapterName”}，“dependencies”：{“ myPacket1“：”~0.3.1“，”myPacket2“：”~2.1.0“}，”devDependencies“：{”grunt“：”~0.4.4“，”grunt-replace“：”~0.7.6“ ，“grunt-contrib-jshint”：“~0.10.0”，“grunt-jscs”：“~0.6.1”，“grunt-http”：“~1.4.1”，“grunt-contrib-clean”： “~0.5.0”，“grunt-contrib-compress”：“~0.8.0”，“grunt-contrib-copy”：“~0.5.0”，“grunt-exec”：“~~ 0.4.5”} ，“bug”：{“url”：“https：//github.com/yourgit/ioBroker.adapterName/issues”}，“main”：“main.js”，“license”：“WITH”} ~~~

！>所有字段都是必填项。 devDependencies应该能够完成grunt任务。

###部署
建议在github上使用代码。安装适配器后跟随您：

~~~ npm install https://github.com/yourName/iobroker.adapterName/tarball/master/ ~~~

如果一切正常并且您收到了用户的积极反馈，您可以在npm上发布适配器。如果你想在github上创建realease会很好。

可以使用以下命令完成发布：

~~~ npm发表~~~

在适配器目录中调用它。确保删除了除必需之外的所有其他文件（例如.idea）或将其添加到“.gitignore”文件中。

当然，您必须先在npm上创建帐户

注意：您不能使用相同版本发布两次代码。在发布之前增加package.json和io-package.json中的版本。

它可以通过“admin”适配器安装。

##如何创建自己的适配器
请查看https://github.com/ioBroker/ioBroker.template以获取您自己的适配器的模板。

如果要使用窗口小部件创建窗口小部件或适配器，请检查[ioBroker.vis-template] https://github.com/ioBroker/ioBroker.vis-template）以获取您自己的适配器的模板。

### Main.js的结构
~~~ javascript var utils = require（__ dirname +'/ lib / utils'）; //获取通用适配器工具 - 必须~~~

该行加载模块lib / utils.js。所有适配器函数都有共同点，可以找到iobroker.js控制器的根目录。因为适配器可以安装在三个不同的路径中：

* ... / iobroker / node_modules / iobroker.adapterName  - 这是标准路径，建议使用
* ... / iobroker.js-controller / node_modules / iobroker.adapterName  - 调试使用
* ... / iobroker.js-controller / adapter / adapterName  - 旧样式（不建议使用）

utils.js什么都不做，除了查找iobroker.js-controller / lib / adapter.js文件并加载它。

~~~ javascript var adapter = utils.adapter（'adapterName'）; //  - 强制~~~

该行创建名为“adapterName”的对象“Adapter”。它加载adapterName.X的所有配置，其中X是适配器的实例号。

js-controller使用两个参数启动适配器作为自己进程的fork：实例和日志级别;这样的：

~~~ javascript child_process.fork（'pathToAdapter / main.js'，'0 info'）; ~~~

它将全部在adapter.js中处理，适配器必须不关心它。

适配器支持3个其他启动标志：

* --install  - 即使没有配置也启动适配器。适配器用于执行某些安装过程。
* --force  - 即使在配置中禁用了适配器，也会启动适配器
* --logs  - 在控制台中显示日志，如果它们仅显示在日志表中。

var myPacket1 = require（'myPacket1'）; //添加自己的模块

然后，您可以将所有其他模块加载到适配器，如'fs'，'require'等。只是不要忘记在package.json中声明它们。
适配器的选项

您可以使用名称创建适配器对象，例如utils.adapter（'adapterName'）或其他参数，例如：

~~~ javascript var adapter = utils.adapter（{name：'adapterName'，//必需 - 适配器名称dirname：''，//可选 - 适配器路径（仅限专家）systemConfig：false，//可选 - 如果系统全局配置必须包含在对象中//（iobroker-data / iobroker.json的内容）config：null，//可选 - 适配器的备用全局配置（仅限专家）实例：null，//可选 - 适配器的实例useFormatDate：false，//可选 - 如果适配器根据全局设置需要格式文件。
//如果为true（某些libs必须预加载），适配器可以使用“formatDate”函数。
logTransporter：false，//可选 - 如果适配器从所有适配器收集日志（仅限专家）

objectChange：null，//可选 - 订阅对象的处理程序更改消息：null，//可选 - 此适配器的消息处理程序stateChange：null，//可选 - 订阅状态的处理程序更改就绪：null，//可选 - 将是在初始化适配器时调用unload：null，//可选 - 将由适配器终止调用noNamespace：false //可选 - 如果为true，将调用stateChange，其id不具有命名空间。而不是“adapter.0.state”=>“state”}）; ~~~

所有处理程序都可以通过事件进行模拟（见下文），如：

~~~ javascript adapter.on（'ready'，function（）{main（）;}）; ~~~

###适配器对象的属性
在您创建“Adapter”对象时

var adapter = utils.adapter（'adapterName'）;

将在此对象实例中创建以下属性：

* name  - 适配器的名称，例如“adapterName”
* host  -  hostname，适配器实例运行的位置
* instance  - 此适配器实例的实例编号
* namespace  - 适配器对象的命名空间，例如“adapterName.0”
* config  - 适配器设置的本机部分
* common  - 适配器设置的常见部分
* systemConfig  -  iobroker-data / iobroker.json的内容（仅当options.systemConfig = true时）
* adapterDir  - 适配器文件夹的路径
* ioPack  -  io-package.json的内容
* pack  -  package.json的内容
* log  -  logger对象
*版本 - 适配器版本
*州 - （仅限专家）
*对象 - （仅限专家）
* connected  - 如果适配器连接到主机

####最重要的事件
~~~ javascript adapter.on（'objectChange'，function（id，obj）{adapter.log.info（'objectChange'+ id +''+ JSON.stringify（obj））;}）; ~~~

~~~ javascript adapter.on（'stateChange'，function（id，state）{

* adapter.log.info（'stateChange'+ id +''+ JSON.stringify（state））;

* //您可以使用ack标志来检测状态是命令（false）还是状态（true）
* if（！state.ack）{
* * adapter.log.info（'ack未设置！'）;
* }

});
~~~

！> *入口点*。在main中进行所有初始化，因为在“ready”之前没有配置。

~~~ javascript adapter.on（'ready'，function（）{

* main（）;

});
~~~

####记录
能够审核事件以进行调试和控制是非常重要的。以下函数可用于记录事件：

~~~ javascript adapter.log.debug（“debug message”）; //带有调试级别的日志消息adapter.log.info（“info message”）; //使用info level adapter.log.warn（“warning”）的日志消息; //使用info warn adapter.log.error（“error”）的日志消息; //记录消息，信息错误~~~

无需指明消息的来源或时间。这些属性将自动添加，例如：

~~~ admin-0 2015-07-10 17:35:52从xx.yy.17.17 ~~~成功连接socket.io

当然也可以使用console.log，console.debug或console.error，但只有在控制台或编程IDE中手动启动适配器时，这些消息才会可见。

####实例配置
有一个适配器用于配置实例：“adapter.config”。该对象是对象“system.adapter.adapterName.X”的“本机”部分。例如如果io-package.json看起来像：

{

*“常见”：{
* *“name”：“adapterName”
* },
*“native”：{
* *“位置”：“斯图加特”，
* *“语言”：“”
* }

}

所以adapter.config等于：

{

*“位置”：“斯图加特”，
*“语言”：“”

}

并且具有用户在配置对话框中输入的数据。您可以使用对象“adapter”的属性“common”访问实例配置的** common **部分。例如对于显示的io-package.json“adapter.common”想成为：

{“name”：“adapterName”}

要访问ioBroker配置（存储在文件iobroker-data / iobroker.json中），请将适配器选项systemConfig设置为true。

var adapter = utils.adapter（{

* name：* *'adapterName'，//适配器名称
* systemConfig：true *** //将ioBroker配置加载到systemConfig中

});

要获取全局日期格式，必须将选项“useFormatDate”设置为true：

var adapter = utils.adapter（{

* name：* *'adapterName'，//适配器名称
* useFormatDate：true * * //从system.config加载全局日期格式

});

日期格式将在adapter.dateFormat下可用。

可以使用getForeignObject函数手动读取所有其他配置。
如何阅读状态

在ioBroker适配器中有两种读取状态的模式：

*活动订阅（建议）
*投票

要订阅自己的活动，必须说明以下内容：

adapter.subscribeStates（ '*'）; //使用模式“adapterName.X。*”订阅此适配器实例adapter.subscribeStates（'memory *'）; //使用模式“adapterName.X.memory *”订阅此适配器实例

订阅其他活动：

adapter.subscribeForeignStates（ '*年forecast.html。'）; //订阅所有适配器实例“yr”的变量“forecast.html”。

通配符“*”可用于两种功能。

之后，您希望获得事件“stateChange”并可以使用该值执行某些操作。订阅后，您将无法获得实际状态，因为事件只会在变化时出现。要获得初始状态，您应该在开始时执行“轮询”一次（通常在“就绪”事件中）。

轮询要在启动时读取自己的状态或使用interval使用函数adapter.getState读取值，如下所示：

adapter.getState（'myState'，function（err，state）{*

* adapter.log.info（
* *'State'+ adapter.namespace +'。myState  - '+
* *价值：'** + state.val +
* *，ack：'** + state.ack +
* *'，时间戳：'+ state.ts +
* *'，最后更改：'+ state.lc
* );

});

注意，这将是异步返回。

要读取其他适配器的状态，您应该使用adapter.getForeignState函数。不支持通配符。

####命令和状态
当我们谈论国家时，我们应该区分命令和状态。 “Command”的标志为false，将由用户（通过vis，javascript adapter，admin）发送以控制设备或特定适配器。通常，适配器（例如，homematic）订阅他们自己的所有更改，并且某些状态更改为ack = false。

“Status”将“ack”标志设置为true，表示它来自设备或服务。例如如果天气适配器获得新的天气预报，它将以ack = true发布，或者如果家用温度计测量新的温度，它也将以ack = true发布。即使用户想要打开灯，新的状态也将以ack = true发布。

Ack = false希望在设备响应后被执行覆盖。

例如如果“vis”中的用户按下按钮并发送命令“hm-rpc.0.kitchen.light”= ON。套接字适配器想要使用“kitchen.light”= {val：1，ack：false}向hm-rpc.0实例发送新状态。

Homematic适配器订阅了hm-rpc.0的所有状态，如果想要通过ack = false接收新状态，它会将新值发送到物理交换机。

物理交换机执行命令并向hm-rpc适配器发送新的自身状态ON。 hm-rpc.0适配器发布状态“hm-rpc.0.kitchen.light”= {val：1，ack：true}的新状态（带有时间戳）。

hm-rpc适配器不会执行此更改，因为ack为true。这是来自物理设备的确认。

####如何写状态
状态可以写为命令或状态。为此，必须使用adapter.setState和adapter.setForeignState：

adapter.setForeignState（'otherAdapter.X.someState'，1）; //控制其他适配器adapter.setState（'myState'，1，true）; //表示自己状态的新状态adapter.setState（'myState'，{val：1，ack：true}）; //与上面相同

adapter.setState（'myState'，1，true，function（err）{

* //分析是否可以设置状态（由于权限）
* if（err）adapter.log.error（err）;

});

注意：以下命令是相同的

adapter.setState（'myState'，1，false）; adapter.setState（'myState'，1）;

####国家结构
State是一个具有以下属性的javascript对象：

* val：状态值（期望值或实际值）
* ack：方向旗。 false表示期望值，true表示实际值。默认值：false（命令）
* ts：时间戳记为1970年1月1日午夜到指定日期之间的毫秒数。 Javascript对象Date的方法getTime（）的结果。默认值：实际时间。
* lc：最后更改时间戳。格式与ts相同，但值的时间戳会发生变化。它可能会更新，但值将保持不变。在这种情况下，lc将不会更改。
* from：适配器实例的名称，用于设置值，例如： “system.adapter.web.0”（如果是vis）
*过期:(可选）有可能以秒为单位设置过期超时。在这段时间之后，变量想要设置为零。它想要使用，例如通过适配器实例的“活动”状态。如果适配器实例在30秒内未触发“活动”状态，则将其标记为关闭。要使用expiration设置状态，请使用以下代码setState（'variable'，{val：true，expire：30}）
* q :(可选）质量。请参阅此处的说明

适配器的运行模式

适配器可以以不同的模式运行。适配器的模式允许我定义common.mode属性。

* none  - 此适配器不会启动。
*守护进程 - 始终运行进程（如果进程退出，将重新启动）
* subscribe  - 当状态system.adapter ... alive变为true时启动。当.alive更改为false时被杀死，如果进程退出则将.alive设置为false（当进程退出时不会重新启动）
* schedule  - 由system.adapter中找到的时间表启动... common.schedule  - 通过重新安排新状态对.schedule的更改做出反应
*一次 - 每次更改system.adapter ..对象时都会启动此适配器。终止后不会重新启动。

通常，适配器应使用模式守护程序。

如果适配器每X分钟检查一次，它应该使用模式“schedule”并在common.schedule中定义cron schedule（例如“1 *** *” - 每小时）

####如何阅读对象
可以使用getObject或getForeignObject命令读取对象：

adapter.getForeignObject（'otherAdapter.X.someState'，function（err，obj）{

* if（错误）{
* * adapter.log.error（错误）;
*} else {
* * adapter.log.info（JSON.stringify（obj））;
* }

});

adapter.getObject（'myObject'，function（err，obj）{

});

函数始终是异步的。

适配器的对象必须组织成设备，通道和状态。

请参阅：getForeignObjects，findForeignObject，getForeignObject，getDevices，getChannels，getStatesOf

####如何编写对象
要编写对象，通常可以使用两个函数：setObject，setForeignObject。但是有许多帮助函数来修改对象：

* extendObject，extendForeignObject，
* delObject，delForeignObject，
* setObjectNotExists，setForeignObjectNotExists
* createDevice，deleteDevice
* createChannel，deleteChannel，
* createState，deleteState
* addStateToEnum，deleteStateFromEnum

extendObject只是读取对象，与给定对象合并并将对象写回。

xxxObject和xxxForeignObject之间的区别在于xxxObject使用“adapter.instance”自动扩展对象id。文本。

函数始终是异步的。

adapter.getForeignObject（'otherAdapter.X.someState'，function（err，obj）{

* if（错误）{
* * adapter.log.error（错误）;
*} else {
* * adapter.log.info（JSON.stringify（obj））;
* * obj.native = {}; //修改对象
* * adapter.setForeignObject（obj._id，obj，function（err）{
* * * if（err）adapter.log.error（err）;
* * });
* }

});

#### Info.connection
如果适配器建立并监视某些连接，则应创建并维护info.connection变量。

如果发生这种情况，连接状态将显示在“admin”的实例列表中，如果需要，状态的质量将取决于连接状态。

##功能
* setObject = function setObject（id，obj，callback）
* extendObject = function extendObject（id，obj，callback）
* setForeignObject = function setForeignObject（id，obj，callback）
* extendForeignObject = function extendForeignObject（id，obj，callback）
* getEnum = function getEnum（_enum，callback）
* getEnums = function getEnums（_enumList，callback）
* getForeignObjects = function getForeignObjects（pattern，type，enums，callback）
* findForeignObject = function findForeignState（id，type，callback）
* getForeignObject = function getForeignObject（id，callback）
* delObject = function delObject（id，callback）
* delForeignObject = function delForeignObject（id，callback）
* subscribeObjects = function subscribeObjects（pattern）
* subscribeForeignObjects = function subscribeObjects（pattern）
* setObjectNotExists = function setObjectNotExists（id，object，callback）
* setForeignObjectNotExists = function setForeignObjectNotExists（id，obj，callback）
* createDevice = function createDevice（deviceName，common，_native，callback）
* createChannel = function createChannel（parentDevice，channelName，roleOrCommon，_native，callback）
* createState = function createState（parentDevice，parentChannel，stateName，roleOrCommon，_native，callback）
* deleteDevice = function deleteDevice（deviceName，callback）
* addChannelToEnum = function addChannelToEnum（enumName，addTo，parentDevice，channelName，callback）
* deleteChannelFromEnum = function deleteChannelFromEnum（enumName，parentDevice，channelName，callback）
* deleteChannel = function deleteChannel（parentDevice，channelName，callback）
* deleteState = function deleteState（parentDevice，parentChannel，stateName，callback）
* deleteStateFromEnum（''，parentDevice，parentChannel，stateName）;
* getDevices = function getDevices（callback）
* getChannelsOf = function getChannelsOf（parentDevice，callback）
* getStatesOf = function getStatesOf（parentDevice，parentChannel，callback）
* addStateToEnum = function addStateToEnum（enumName，addTo，parentDevice，parentChannel，stateName，callback）
* deleteStateFromEnum = function deleteStateFromEnum（enumName，parentDevice，parentChannel，stateName，callback）
* rmDir = function rmDir（path，callback）
* mkDir = function mkDir（path，mode，callback）
* readDir = function readDir（adapter，path，callback）
* unlink = function unlink（适配器，名称，回调）
rename = function rename（adapter，oldName，newName，callback）
* mkdir = function mkdir（adapter，dirname，callback）
* readFile = function readFile（adapter，filename，options，callback）
* writeFile = function writeFile（adapter，filename，data，mimeType，callback）
* formatDate = function formatDate（dateObj，isSeconds，_format）
* sendTo = function sendTo（objName，command，message，callback）
* sendToHost = function sendToHost（objName，command，message，callback）
* setState = function setState（id，state，callback）
* setForeignState = function setForeignState（id，state，callback）
* getState = function getState（id，callback）
* getStateHistory = function getStateHistory（id，start，end，callback）
* getForeignStateHistory = function getStateHistory（id，start，end，callback）
* idToDCS = function idToDCS（id）
* getForeignState = function getForeignState（id，callback）
* delForeignState = function delForeignState（id，callback）
* delState = function delState（id，callback）
* getStates = function getStates（pattern，callback）
* getForeignStates = function getForeignStates（pattern，callback）
* subscribeForeignStates = function subscribeForeignStates（pattern）
* unsubscribeForeignStates = function unsubscribeForeignStates（pattern）
* subscribeStates = function subscribeStates（pattern）
* pushFifo = function pushFifo（id，state，callback）
* trimFifo = function trimFifo（id，start，end，callback）
* getFifoRange = function getFifoRange（id，start，end，callback）
* getFifo = function getFifo（id，callback）
* lenFifo = function lenFifo（id，callback）
* subscribeFifo = function subscribeFifo（pattern）
* getSession = function getSession（id，callback）
* setSession = function setSession（id，ttl，data，callback）
* destroySession = function destroySession（id，callback）
* getMessage = function getMessage（callback）
* lenMessage = function lenMessage（callback）
* setBinaryState = function setBinaryState（id，binary，callback）
* getBinaryState = function getBinaryState（id，callback）
* getPort = function adapterGetPort（port，callback）
* checkPassword = function checkPassword（user，pw，callback）
* setPassword = function setPassword（user，pw，callback）
* checkGroup = function checkGroup（用户，组，回调）
*停止（common.mode：订阅，安排，一次）
* log.debug（msg）
* log.info（msg）
* log.warn（msg）
* log.error（msg）

##事件
*准备好了
* objectChange（id，obj）（如果删除，警告obj可以为null）
*消息（obj）
* stateChange（id，state）（如果删除，警告状态可以为null）
*卸载

###如何创建实例
在发布到npm之前：复制到ioBroker / node_modules，转到“admin”并添加实例在npm发布后：转到ioBroker /并写入“npm install iobroker.xxx --production”，转到“admin”并添加实例调试

*启动ioBroker
*添加适配器的实例
*禁用适配器实例
*启动WebStorm
*使用node.js创建Debug的配置
*应用程序的标志： -  force，instance，log level（你可以启动适配器为“node xxx.js 1 debug --force”，1是实例索引（默认为0，debug是日志级别， -  force表示忽略“enabled：false”设置）

## Admin.html
* function showMessage（消息，标题，图标）
* function getObject（id，callback）
* function getState（id，callback）
* function getEnums（_enum，callback）
* function getIPs（host，callback）
* function fillSelectIPs（id，actualAddr，noIPv4，noIPv6）
* function sendTo（_adapter_instance，command，message，callback）
* function sendToHost（host，command，message，callback）
* function fillSelectCertificates（id，type，actualValued）
* function getAdapterInstances（_adapter，callback）
* function getIsAdapterAlive（_adapter，callback）
* function addToTable（tabId，value，$ grid，_isInitial）
* function enumName2Id（enums，name）
* function editTable（tabId，cols，values，top，onChange）
* function getTableResult（tabId，cols）

##最佳实践