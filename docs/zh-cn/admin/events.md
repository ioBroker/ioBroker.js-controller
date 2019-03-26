---
title: 活动
lastChanged: 26.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/events.md
hash: 4kDExpUZKC8PTd5MvmCtNV09qByeQl3bT117RjVwvZg=
---
#The events窗口
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

#The Events选项卡
在此选项卡中，将显示所有数据点的当前状态。
这里的值无法更改。

![活动页面](../../de/admin/media/ADMIN_Ereignisse_numbers.png)

##标题栏
标题栏包含最重要流程的图标。每个图标都有一个上下文帮助。只需将鼠标停留在图标上一段时间即可。

###详细图标：
** 1.）暂停查看**

使用此按钮可以停止当前显示的最新事件。然后该按钮变为黄色背景，其中“错过”事件的数量被计算在内。

！>由于事件在毫秒范围内部分更新，因此显示器可能会有延迟或甚至冻结

再次单击该按钮将重新启动实时演示。

** 2.）删除广告**

此按钮可清除屏幕

##页面内容
在页面上，现有事件以表格形式显示。最近的活动位于顶部。

![活动页面](../../de/admin/media/ADMIN_Ereignisse_numbers02.png)

通过单击列标题，您可以根据特定条件进行过滤。

###该表由以下列组成：
** 1.）类型**

这里要么*** stateChange ***是值的更新，要么是*** objectChange ***这些也是两个过滤选项。

** 2.）ID **

这是相应数据点的唯一名称，根据例如由以下组成的结构：适配器的名称。实例的名称。用户名。通道名称。数据点名称。

在这里，您可以过滤完整的ID，但也可以过滤其中的部分ID，例如：毕竟TEMPERATURE数据点。

** 3.）价值**

这是相应数据点的当前值。

** 4.）确认**

如果系统已更改并采用此值，则值为true，否则为false。

这些也是过滤器选项

** 5.）来源**

这里指定了哪个实例已执行数据点的最后一次更改。

在这列之后可以过滤这些。

** 6.）时间**

这是数据点上次更新的时间戳。

** 7.）改变了**

这是数据点的值最后更改的时间戳。