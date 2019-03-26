---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/lib/performance/Performancemonitoring-mit-Systemdatenpunkten.md
title: 性能监控
hash: 6XZuyxG/P1K8Kb5EzN4iYtT7LNazGydyeGlH+NRvTxE=
---
＃性能监控
ioBroker中性能分析的起点是Admin中的对象列表。有关主机或主机的系统信息（ioBroker支持多主机），并提供了各个适配器。通过将对象列表切换到专家模式来访问此信息：

[attachment = 6] 2018-07-14 19_08_43-objects  -  ioBroker.png [/ attachment]

[b] [u]主机性能值[/ u] [/ b]

ioBroker语言中的主机是运行ioBroker js控制器进程的计算机。在用于分发负载的多主机环境中，这也可以是多台计算机。甚至相应的操作系统也可能不同。例如，一个很好的任务Raspberry Pi集群堆栈可应对1GB RAM硬件限制。

[attachment = 5] 2018-07-15 17_35_07-（2）.png [/ attachment] [color =＃808080](Jeff Geerling, youtube)[/色]

ioBrokers的js控制器协调适配器的启动和停止，并在后台执行其他系统管理任务。在Admin中，您可以找到相应主机以及ID [i]'system.host下的js控制器的性能值。<主机名称>'[/ i]。

以下是各个关键数字及其含义的列表：

关键指标/数据类型/单位

[list] [*] [b] alive [/ b] / logic / none [list]指示ioBroker js控制器是否在主机上有效[/ list] [*] [b] diskFree [/ b] / Number / MiB [list]安装ioBroker的逻辑驱动器上的可用空间bi =二进制多个（1 MB = 1,000,000字节）<（1 MiB = 1,048,576字节= 1×1024×1024字节）[ / list] [*] [b] diskSize [/ b] / number / MiB [list]安装ioBroker的总逻辑卷卷[/ list] [*] [b] diskWarning [/ b] / number /％ [list]在这里你可以输入百分比。如果卷上的可用空间低于此值（例如20），则管理员将显示警告。如果历史适配器处于活动状态，这尤其有用。[附件= 4] 2018-07-15 18_44_47-intro  -  ioBroker.png [/ attachment] [/ list] [*] [b] freemem [/ b] / Number / MB [list]主机的可用RAM系统内存总量[/ list] [*] [b] inputCount [/ b] / number / / 15s [list]状态值的变化次数。输入事件可以是例如创建或设置值[/ list] [*] [b] load [/ b] / number /％[list] CPU的总系统负载，平均每秒超过一秒。毫不奇怪，在Windows下，此值始终为0 [/ list] [*] [b] mem [/ b] / number /％[list]内存使用情况。可用内存占总系统内存比[/ list] [*] [b] memHeapTotal [/ b] / number / MB [list] js控制器保留的堆内存大小[/ list] [*] [b] memHeapUsed [ / b] / number / MB [list] js控制器使用的堆内存大小[/ list] [*] [b] memRss [/ b] / number / MB [list]驻留集，js的总大小-RAM内存中的控制器[/ list] [*] [b] outputCount [/ b] / number / / 15s [list]输出事件包括值比较，向状态DB写入值，订阅引起的事件等操作或者将适配器记录到例如获取有关.connected-或.alive-states的陈述。这就是实例列表中通常位于事件输出值的8个事件的发生方式。[/ List] [*] [b] uptime [/ b] / number / s [list]自上一个主机上ioBroker运行时间重启[/ list] [/ list]

下图以符号形式显示了堆，代码和堆栈如何影响nodejs进程的总内存使用量[b] memRss [/ b]：

[附件= 3] Unbenannt-5.png [/附件]

如果主js控制器本身为整个系统提供了对象和状态数据库，则此度量是分辨内存使用中300和3000个ioBroker对象之间差异的好方法。例如，在我的Windows系统上，此值为3500个对象，2700个状态介于75和128MB之间。 nodejs中的问候集成了垃圾收集。另一方面，如果我使用Redis作为状态数据库，js控制器的内存使用量将减少到50MB。 （现在Redis需要再加25MB = 75MB;））

如果状态更改的数量超过依赖事件使用者的处理能力（例如，具有on：触发器的javascript），则在内存数据库中建立队列。这可以通过js控制器的内存消耗来看出。一旦系统负载再次下降并且给予事件使用者足够的时间来处理挂起的值更改，memRss的值将返回其原始值：

[attachment = 2] 2018-07-15 20_26_08.png [/ attachment]

在这种环境中，人们常常无法根据固定值对错误原因做出准确的陈述。然而，通常有助于观察无故障系统（=参考值），然后在故障条件下观察同一系统[/ b]的比较[b]。另外，在直方图中记录一个或另一个数据点是非常有用的，例如，捕捉倾向和异常值。

[b] [u]适配器性能值[/ u] [/ b]

每个适配器都有自己的性能指标。它们分别存储在ID [i]'system.adapter。<Adapter_name>。<Instance>'[/ i]下，与主机有些不同。

关键指标/数据类型/单位

[list] [*] [b] alive [/ b] / logic / none [list]指示适配器是否处于活动状态[/ list] [*] [b]已连接[/ b] / logic / none [ list]指示适配器是否在最近30秒内响应[/ list] [*] [b] inputCount [/ b] / number / / 15s [list]状态值的更改次数。输入事件可以是例如设置或设置值[/ list] [*] [b] memHeapTotal [/ b] / number / MB [list]适配器保留的堆内存大小[/ list] [*] [b] memHeapUsed [ / b] / number / MB [list]适配器使用的堆内存大小[/ list] [*] [b] memRss [/ b] / number / MB [list]驻留集，RAM中适配器的总大小使用内存[/ list] [*] [b] inputCount [/ b] / number / / 15s [list]状态值的更改次数。输入事件可以是例如来自创建或设置值[/ list] [*] [b] outputCount [/ b] / number / / 15s [list]输出事件包括值比较，将值写入状态DB，事件等操作由于订阅或将适配器记录到例如获取有关.connected-或.alive-states的陈述。这是实例列表中事件输出值中通常出现的8个事件的结果。[/ List] [*] [b] uptime [/ b] / number / s [list]自适配器启动以来适配器的运行时间[/ list] [/列表]

例如，如果在脚本更改100 [b] inputCount [/ b]事件后Javascript适配器突然跳转到几千个，则强烈推测触发器循环，即。他的脚本中内置了一个环参考。

考虑[b] memRss [/ b]也很有用通过脚本或适配器检测内存泄漏。在[b] alive [/ b]和[b]已连接[/ b]的情况下，如果适配器无法提供新值，您可以直观地显示适配器的状态或禁止显示不正确的数据。

[u] [b]展望和问题[/ b] [/ u]

我只是展示一张图片，展望未来（以及我的开发环境）：

[attachment = 1] 2018-07-14 19_08_43-o1.png [/ attachment]

对于适配器，我错过了由单个适配器引起的CPU负载[b] cpu [/ b]的显示。毕竟，即使没有资源需要安装额外的监控适配器，您也想知道谁是系统的罪魁祸首。在nodejs是单线程之后，这里的显示是指CPU核心。超过100％不在这里。

如果适配器显示持续较高的值，则使用具有多个内核的CPU无济于事。在这种情况下，只有更快的CPU（通常更高的时钟），程序代码的优化或几个适配器（如果可能）上的负载分配是有利的。

关键值[b] cputime [/ b]允许您评估自启动以来适配器使用的处理器时间总和。它提供有关程序声称处理器的频率或强度（关键字密集型）的信息。这个总和实际上总是低于适配器[b]正常运行时间[/ b]的整个运行时间，因为即使使用频繁，适配器也几乎不会向处理器发送任何命令。

在这里你可以很好地看到各种关键数字以及Javascript适配器对Flot中突然出现的需求的反应如何：

[attachment = 0] 2018-07-15 21_22_11-Flot Edit.png [/ attachment]

顺便说一下，Javascript适配器已经非常繁忙，以至于他无法再立即接受所有事件。它形成了一个事件队列。