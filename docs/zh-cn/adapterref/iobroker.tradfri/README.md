---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tradfri/README.md
title: 宜家tradfri适配器
hash: ej5aOPKAJf0ewg/X6ytf+TQlHjvMC80iVwHKlgx1ouo=
---
--- local：true ---![徽标](../../../de/adapterref/iobroker.tradfri/media/tradfri.png)

#Ikea tradfri适配器
## Tradfri
Tradfri是宜家的SmartHome系统。目前，该系统包括各种组件：

 - 灯（灯）
 - 用于墙壁和橱柜/橱柜门的LED面板/模制品
 - 运动检测器
 - 窗户百叶窗
 - 遥控器
 - 中央门户

因此，Tradfri系统是市场上最全面的SmartHome组件系统之一。

##使用Tradfri和ioBroker的要求
 -  RaspberryPi 3型号B +
 -  Tradfri Gateway
 -  Tradfri组件（例如灯泡或运动探测器等）
 -  Tradfri遥控器

##使用ioBroker管理和控制Tradfri
要使用ioBroker以最佳方式管理和控制Tradfri，您需要以下适配器：

1.宜家特拉德里

此适配器连接到中央Tradfri网关它同步组件（灯，运动检测器等），场景，Tradfri网关和ioBroker系统变量。图01显示了ioBroker，网关和组件之间通信的简化表示。

![沟通过程](../../../de/adapterref/iobroker.tradfri/media/TradfriOverview_002.PNG)

###安装适配器并配置实例
<b>第1步。</b>

 - 单击Web界面左侧导航栏中的![适配器](../../../de/adapterref/iobroker.tradfri/media/Adapter.PNG)安装适配器
 - 在出现的页面中搜索/过滤“Ikea Tradfri”（见图01）
 - 通过图标![加](../../../de/adapterref/iobroker.tradfri/media/plus.PNG)（最后一栏，最右边）安装适配器。 （auto将是这里的新实例

  根据![实例](../../../de/adapterref/iobroker.tradfri/media/instanzen.PNG)）的适配器

![添加Ikea Tradfri适配器](../../../de/adapterref/iobroker.tradfri/media/TradfriAdapterInstanz_002.PNG)

<b>第2步。</b>

 - 通过更改左侧导航栏中的视图![实例](../../../de/adapterref/iobroker.tradfri/media/instanzen.PNG)当前可用

显示的实例。将过滤器设置为“Tradfri”后，将显示所有正在运行的“Tradfri”实例。
这应该与下图相同。

![Ikea Tradfri实例视图](../../../de/adapterref/iobroker.tradfri/media/TradfriAdapterInstanz_003optimiert.PNG)

 - 从左到右描述的相应实例的列中存在以下显示/操作选项。
- <b>显示活动</b>状态（简单的交通灯系统）
     - ![状态为绿色](../../../de/adapterref/iobroker.tradfri/media/status_green.PNG) - >实例在预期参数内运行，一切正常
     - ![状态为黄色](../../../de/adapterref/iobroker.tradfri/media/status_yellow.PNG) - >实例正在运行，但Tradfri Gateway的配置可能存在问题
     - ![状态为红色](../../../de/adapterref/iobroker.tradfri/media/status_red.PNG) - >实例已启动，但连接到主机时出现问题。
- <b>行动</b>
     - ![启动实例]（media / starting.PNG）启动和！[停止实例](../../../de/adapterref/iobroker.tradfri/media/stop.PNG)停止实例启用这些按钮
     - ![启动实例](../../../de/adapterref/iobroker.tradfri/media/konfiguration.PNG)访问实例的配置区域
     - ![启动实例](../../../de/adapterref/iobroker.tradfri/media/reload.PNG)实例重新启动
     - ![启动实例](../../../de/adapterref/iobroker.tradfri/media/delete.PNG)实例被无可挽回地删除