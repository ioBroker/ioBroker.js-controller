---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/monitoring.md
title: 性能监控
hash: f9k8uTEaRQI9WucjkJjFqbIX8d32IdLTh8VwMNiVFIk=
---
＃性能监控
ioBroker中性能分析的起点是admin中的对象列表。
它提供有关主机或主机（ioBroker支持多主机）和各个适配器的系统信息。通过将对象列表切换到专家模式来访问此信息：

![对象](../../de/trouble/media/monitoring1.png)

##主机的性能值
ioBroker语言中的主机是运行ioBroker js控制器进程的计算机。
在用于分发负载的多主机环境中，这也可以是多台计算机。
甚至相应的操作系统也可能不同。
例如，一项很好的任务Raspberry Pi集群堆栈可应对1GB RAM硬件限制。

![Jeff Geerling，youtube](../../de/trouble/media/monitoring2.png)

ioBrokers的js控制器协调适配器的启动和停止，并在后台执行其他系统管理任务。在Admin中，可以在ID`system.host.<Name_des_Hostrechners>`下找到相应主机和js控制器的性能值。

以下是各个关键数字及其含义的列表：

|关键人物|数据类型|单位|说明|
|----------|----------|---------|--------------|
| **活着** |逻辑|没有|指示ioBroker js控制器是否在主机上处于活动状态 |
| **磁盘免费** |号码| MiB |安装ioBroker的逻辑驱动器上的可用空间* bi =二进制多个（1 MB = 1,000,000字节）<（1 MiB = 1,048,576字节= 1×1024×1024字节）* |
| **磁盘大小** |号码| MiB |安装ioBroker的逻辑卷的总大小|
| **diskWarning** |号码| ％|在这里你可以输入百分比。如果卷上的可用空间低于此值（例如20），则管理员将显示警告。如果历史记录适配器处于活动状态，这尤其有用。 ![屏幕](../../de/trouble/media/monitoring3.png)|
| **freemem** |号码| MB |总主机可用RAM系统内存|
| **inputCount** |号码| / 15s |状态值的更改次数。输入事件可以是例如通过创建或设置值|
| **加载** |号码| ％| CPU的总系统负载，平均每个超过一秒。不要惊讶，在Windows下这个值总是0 |
| **mem** |号码| ％|内存使用情况。空闲内存与系统总内存的关系|
| **memHeapTotal** |号码| MB | js控制器保留的堆内存大小|
| **memHeapUsed** |号码| MB | js控制器使用的堆内存大小|
| **memRss** |号码| MB | Resident Set，js控制器在RAM中使用的内存总大小  |
| **outputCount** |号码| / 15s |输出事件包括诸如值比较，将值写入状态DB，由于订阅而发生的事件或者在适配器处记录适配器等操作。获取有关.connected |或.alive-states的陈述。所以也会发生8个事件，这些事件通常是实例列表中的事件输出值。 |
| **正常运行时间** |号码| s |自上次重启|后，在此主机上运行ioBroker的时间 |

下图以符号形式显示了堆，代码和堆栈如何影响nodejs进程的总内存使用量** memRss **：

![屏幕](../../de/trouble/media/monitoring4.png)

如果主js控制器本身为整个系统提供了对象和状态数据库，则此度量是分辨内存使用中300和3000个ioBroker对象之间差异的好方法。例如，在我的Windows系统上，此值为3500个对象，2700个状态介于75和128MB之间。 nodejs中的问候集成了垃圾收集。
另一方面，如果我使用Redis作为状态数据库，js控制器的内存使用量将减少到50MB。
（现在Redis需要再加25MB = 75MB;））

如果状态更改的数量超过依赖事件使用者的处理能力（例如，具有on：触发器的javascript），则在内存数据库中建立队列。
这可以通过js控制器的内存消耗来看出。一旦系统负载再次下降并且给予事件使用者足够的时间来处理挂起的值更改，memRss的值将返回其原始值：

![屏幕](../../de/trouble/media/monitoring5.png)

在这种环境中，人们常常无法根据固定值对错误原因做出准确的陈述。
然而，通常有助于观察无故障系统（=参考值），然后在故障条件下对同一系统**进行比较**。另外，在直方图中记录一个或另一个数据点是非常有用的，例如，捕捉倾向和异常值。

##适配器的性能值
每个适配器都有自己的性能指标。
它们存储在ID`system.adapter.<Name_des_Adapters>.<Instanz>`下，与主机略有不同。

|关键人物|数据类型|单位|说明|
|----------|----------|---------|--------------|
| **活着** |逻辑|没有|指示适配器是否处于活动状态 |
| **连接** |逻辑|没有|指示适配器是否在最近30秒内报告了|
| **inputCount** |号码| / 15s |状态值的更改次数。输入事件可以是例如通过创建或设置值|
| **memHeapTotal** |号码| MB |适配器保留的堆内存大小  |
| **memHeapUsed** |号码| MB |适配器使用的堆内存大小  |
| **memRss** |号码| MB |驻留集，适配器在RAM中使用的内存总大小  |
| **inputCount** |号码| / 15s |状态值的更改次数。输入事件可以是例如创建或设置值|
| **outputCount** |号码| / 15s |输出事件包括诸如值比较，将值写入状态DB，由于订阅而发生的事件或者在适配器处记录适配器等操作。获取有关.connected-或.alive-states的陈述。所以也会发生8个事件，这些事件通常是实例列表中的事件输出值。 |
| **正常运行时间** |号码| s |适配器启动后适配器的运行时间 |

例如，如果在脚本更改100 **inputCount** 件后Javascript适配器突然跳转到几千个，则强烈推测触发器循环，即。他的脚本中内置了一个环参考。

考虑** memRss **也很有用通过脚本或适配器检测内存泄漏。使用** alive **和** connected **，您可以直观地显示适配器的状态，或者如果适配器无法提供新值，则禁止显示不正确的数据。

## Outlook和问题
我只是展示一张图片，展望未来（以及我的开发环境）：

![屏幕](../../de/trouble/media/monitoring6.png)

我错过了各个适配器显示的适配器导致CPU负载** cpu **。
毕竟，即使没有资源需要安装额外的监控适配器，您也想知道谁是系统的罪魁祸首。在nodejs是单线程之后，这里的显示是指CPU核心。超过100％不在这里。

如果适配器显示持续较高的值，则使用具有多个内核的CPU无济于事。
在这种情况下，只有更快的CPU（通常更高的时钟），程序代码的优化或几个适配器（如果可能）上的负载分配是有利的。

代码** cputime **允许您评估自启动以来适配器使用的处理器总时间。
它提供有关程序声称处理器的频率或强度（关键字密集型）的信息。
这个总和实际上总是低于适配器**正常运行时间**的整个运行时间，因为即使使用频繁，适配器也几乎不会向处理器发送任何订单。

在这里你可以很好地看到各种关键数字以及Javascript适配器对Flot中突然出现的需求的反应如何：

![屏幕](../../de/trouble/media/monitoring7.png)

顺便说一下，Javascript适配器已经非常繁忙，以至于他无法再立即接受所有事件。
它形成了一个事件队列。

为了让我们更多地了解<u>主机</u>的负载，特别是关于所有适配器的主机，js-controller，我还为此提供了一些性能计数器。以下语句显示了主机性能计数器的未来可能外观。

如上所述，这需要Bluefox的检查，最早只能从js控制器1.5.x进行检查：

![屏幕](../../de/trouble/media/monitoring8.png)

总结数据点的含义：

|关键人物|数据类型|单位|数据源|说明|
|----------|----------|---------|-------------|--------------|
| **活着** |逻辑|没有| js-controller |指示ioBroker js控制器是否在主机上处于活动状态。死后自动更改为假| 25秒 |
| **cpu** |号码|核心利用率％ js-controller |指定运行js控制器的核心的利用率。超过100％在这里不起作用，因为nodejs是单线程的  |
| **cputime** |号码| s | js-controller |处理器时间（英文CPU时间）表示以秒为单位的测量时间，其中js控制器自上次程序启动以来实际上已向处理器发送命令。该数量实际上总是低于程序的总运行时间（正常运行时间），因为即使使用密集，它也几乎不会向处理器发送任何订单。 |
| **磁盘免费** |号码| MiB | |安装ioBroker的逻辑驱动器上的可用空间* bi =二进制多个（1 MB = 1,000,000字节）<（1 MiB = 1,048,576字节= 1×1024×1024字节）* |
| **磁盘大小** |号码| MiB | |安装ioBroker的逻辑卷的总大小|
| **diskWarning** |号码| ％| |在这里你可以输入百分比。如果卷上的可用空间低于此值（例如20），则管理员将显示警告。如果历史记录适配器处于活动状态，这尤其有用。 ![屏幕](../../de/trouble/media|monitoring9.png)|
| **freemem** |号码| MB | |总主机可用RAM系统内存|
| **inputCount** |号码| / 15s | js-controller |状态值的更改次数。输入事件可以是例如通过创建或设置值|
| **加载** |号码| | |所有CPU核心的总系统负载，平均每个核心超过一秒。例如，具有8个CPU内核的计算器 - >值7.9 =系统几乎超载，0.1 =没有任何进行; 4个核心 - >值3.9 =过载 - 如果是永久性的，0.1 =没有任何进展|
| **mem** |号码| ％| |内存使用情况。空闲内存与系统总内存的关系|
| **memHeapTotal** |号码| MB | js-controller | js-controller |保留的堆内存大小  |
| **memHeapUsed** |号码| MB | js-controller | js-controller使用的堆内存大小  |
| **memRss** |号码| MB | js-controller | Resident Set，js控制器在RAM中使用的内存总大小  |
| **outputCount** |号码| / 15s | js-controller |输出事件包括诸如值比较，向状态DB写入值，由于订阅而发生的事件或日志记录等操作。所以这里也发生了10多个事件  |
| **memAvailable** |号码| MB | js-controller | （仅限* nix系统）可用于满足新存储要求的可用空间，而系统无需开始卸载已用存储。根据MemFree，Active（文件），非活动（文件），SReclaimable和来自`/proc/zoneinfo`的下限阈值计算。 <br>见[https://git.kernel.org](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=34e431b0ae398fc54ea69ff85ec700722c9da773)|
| **memAvailable** |号码| MB | js-controller | （仅限* nix系统）可用于满足新存储要求的可用空间，而系统无需开始卸载已用存储。根据MemFree，Active（文件），Inactive（文件），SReclaimable和来自`/ proc / zoneinfo`的下限阈值计算。 <br>见[https://git.kernel.org]（https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=34e431b0ae398fc54ea69ff85ec700722c9da773）|