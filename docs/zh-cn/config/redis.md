---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/config/redis.md
title: ioBroker的Redis数据库
hash: SoqEQqV0IZ/uxETDM3MSFvy9Bkrk4fp/cwvrsetbZjQ=
---
＃ioBroker的Redis数据库
Redis是一个开源的内存数据库。
可以在https://redis.io/上找到更多信息。

Redis的最大优势是：

与内部ioBroker数据库相比，Redis在数据访问速度，文件系统中的IO管理以及更好地使用CPU资源方面具有优势。
js控制器松了一口气。先前缓慢的系统可能会再次变得更快。
但是，重要的是要有足够的RAM，因为Redis会将所有数据保留在RAM中。根据Redis中确切存储的内容，RAM要求为几MB（例如，如果只有状态处于Redis中），则最高为200 MB以上（例如，如果对象和文件也存储在其中）。

## Redis常见问题
1.我的ioBroker是否需要Redis？

对于所有常见的安装，ioBroker自己的数据库通常就足够了！只有当js-controller永久需要50-70％或更多的CPU并且系统同时感觉迟钝时，才有可能处理Redis主题。
另外，如果您要有一个高度可用的ioBroker系统，则有必要，但还需要做一些其他事情。

2.如何确定我是否正在使用Redis？

由于ioBroker自己的数据库也使用Redis协议进行通信，因此有时从日志中的Redis读取内容可能会造成混淆。只要提到端口9000/9001，它就表示内部数据库，与外部Redis数据库无关。
对`iobroker status`的调用显示了用于状态和对象数据库的数据库类型。
“文件”表示使用ioBroker自己的数据库。 “ redis”表示正在使用Redis。

可以在[论坛](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick)中找到有关Redis主题的详细说明，以及更多信息。

## Redis持久性
通常，Redis是一个“内存数据库”。因此，数据存储在RAM中。当Redis退出时，这些都消失了。
为了启用更新，Redis在硬盘驱动器上支持两种类型的数据存储。
RDB和AOF的持久性。

** RDB **默认处于活动状态，此方法将整个内容保存在RDB文件中。可以配置存储间隔，并且应根据自己的需要进行调整！要进行配置，需要混合使用数据安全性（崩溃时可以处理多少数据）和存储介质的写入负载，因为总要写入全部内容（如果对象也位于Redis中，则可能是数百个） MB！）。

但是，** AOF **可确保数据完全是最新的。
为此，将连续写入一个所谓的AOF文件，并始终将所有更改附加到该文件中。然后，该文件会定期合并，因此会再次减小大小。最终写入负载的精确度，以及整个过程是否适合SD卡，取决于保存的数据。如果对象和文件也位于Redis中，则不定期地添加和合并比定期存储大量数据要“经济得多”。
如上所述，这意味着需要更多的柱塞。如果此RAM不可用，则根据设置，一切都会继续进行，而不会出现任何问题。
这样就不会创建数据备份！相应的消息仅在日志文件中可用。

有关持久性的更多详细信息，请参见https://redis.io/topics/persistence

** Redis Slaves **，即第二台Redis服务器，是始终将当前数据作为备份的另一种方式。
如果具有主Redis的计算机出现故障，则该数据仍几乎实时存在于从属上。
您可以使用它来创建转储以再次设置主服务器，或者作为一种快速的解决方案，可以使从服务器成为主服务器并更改ioBroker中的数据库IP，并且您几乎可以重新联机。这也可以在[论坛](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick)或https://raw.githubusercontent.com/antirez/redis/5.0/redis.conf中更详细地找到。

**但是，从站无法防止意外删除数据，因为这些数据随后会立即在从站上删除。此处仅备份有帮助。**

##安装Redis
Redis必须安装并配置为单独的服务，并且在备份期间还应考虑数据。
持久数据库以JSON文件的形式保存在“ iobroker-data”文件夹中。
安装在命令行上进行

** Debian **

```sh
sudo apt update
sudo apt install redis
```

** Ubuntu **

```sh
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
```

**警告**：没有适用于Windows的官方Redis构建。

##设置Redis
您可以使用`sudo systemctl status redis-server`进行检查。
如果重新启动后它没有自动重新启动，则`sudo systemctl enable redis-server`会有所帮助。
Redis默认情况下使用端口6379，并且还具有用于访问数据库的命令行工具：`redis-cli`打开外壳程序。
命令`info`显示有关系统，内存使用情况和存储的数据（“键空间”）的一些信息，这些信息当前为空。

如果您运行单个主机系统，或者ioBroker在同一主机上运行，则仅此而已。

如果其他主机也应访问此Redis服务器（从属服务器或其他服务器），则仍必须允许该主机。
为此，必须编辑/etc/redis/redis.conf，并将** bind 127.0.0.1 **行更改为** bind 0.0.0.0 **，并将** protected_mode **设置为** no **正下方成了。

然后，`sudo systemctl restart redis-server`用更新后的配置重新启动服务器。

有关更多详细信息，请参见[多主机](https://www.iobroker.net/#de/documentation/config/multihost.md)

##将ioBroker数据库转换为Redis
大多数更改和数据查询都是通过“状态”数据库进行的。所有数据更改都到达此处，然后在注册某些数据后再次分发给适配器。
迄今为止，将状态切换到Redis具有最大和最显着的性能效果。
如果仅转换States数据库，则理想情况下应将Redis服务器与ioBroker主服务器安装在同一主机上。

然后可以将“状态”更改为：

```sh
iobroker stop
iobroker setup custom
```

对于“对象”，确认当前设置（“文件”为类型，IP，端口9001），对于“状态”，现在为“ redis”类型，Redis主机服务器的IP（如果在同一主机上，则为127.0.01）。 ），并将6379设置为端口。
为了避免丢失所有状态数据，建议迁移数据，这是配置中的下一个问题。
迁移之后，可以使用iobroker start **重新启动ioBroker。如果还使用从属系统，则必须通过iobroker setup custom **在各处进行相同的设置。
但是，关于迁移的问题必须以否定的方式回答！

如果您还想更改“对象”，请继续进行操作，然后选择类型“ redis”，输入Redis主机的IP和端口，并在必要时迁移数据，具体取决于大小，这可能需要一些时间。

**处于相同或单独的Redis进程中的状态和对象吗？**

当然，在Redis流程中将状态和对象保存在一起最容易。
但是，这也意味着只能将所有数据一起备份。
使用ioBroker File-DB，状态，对象和文件是分离的，因此可以有选择地进行备份。
如果所有内容都存储在Redis中，则由于数据库较大，因此写入负载也较高。
为了使用Redis设置分离经常变化的状态而不是经常变化的对象和文件，您可以简单地在每个主机上使用两个Redis进程。
例如，可以在https://gist.github.com/inecmc/f40ca0ee622e86999d9aa016c1b15e8c获得说明。

使用`iobroker setup custom`，可以简单地指定状态或对象/文件的各个不同端口。

对于状态，建议使用RDB持久性，然后根据更改次数每5-15分钟备份一次数据。对于对象/文件，AOF持久性更适合于最大程度地减少写负载。

##备份
Redis通常将其文件保存在/ var / lib / redis中。可以保存位于此处的dump.rdb或appendonly.aof（取决于所选的持久性）。您也可以使用`redis-cli BGSAVE`在备份之前直接生成dump.rdb，然后将其保存。