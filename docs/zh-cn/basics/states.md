---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/states.md
title: 国家和数据点
hash: x/QuY94TT/pzS/xmrB0cz48nq3lzLiiE8agZlTlcnfo=
---
＃状态和数据点
**数据点**由“状态”类型和动态状态的静态对象组成。

国家的属性是

 * val  - 当前值
 * ack  - 表示目标系统确认值的标志
 * ts  - 上次状态更新的Unix时间戳（以毫秒为单位）
 * lc  - 最后一次值更改的Unix时间戳（以毫秒为单位）
 * q  -  [质量]（../ dev / objectsschema＃states）
 * from  - （可选）上次更新的源（适配器实例）
 * user  - （可选）用户名，最后写入的值。
 * c  - （可选）评论
 * expire  - （可选）值将重置为“null”的时间（以秒为单位）。

？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。