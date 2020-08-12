---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adddevice.md
title: 如何将设备添加到Alexa或Google Home
hash: HtmNyEXpX7oykzGw/4ocJhB7H72oYAh+n4MsvGBoLzM=
---
＃如何将设备添加到Alexa或Google Home
要添加设备，我们有4个步骤：

-如果需要，将状态角色扩展为所需的新角色。
-用新设备扩展类型检测器
-将设备添加到iobroker.devices以使其能够仿真。
-将设备添加到Alexa / Google和Co

##新角色
我们有3个（或更多）源，在添加新设备之前必须检查这些源：

-Alexa智能家居API：https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
-Yandex API：https：//yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
-Google API：https：//developers.google.com/assistant/smarthome/guides

此外，检查某些适配器中的现有设备可能很有用。

让我们以空调为例。我们有：

-https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
-https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
-https://developers.google.com/assistant/smarthome/guides/aircooler

Yandex最全面地了解了州，因此将其作为基础是合理的。
我们可以看到，对于恒温器模式和摆动位置，文档中没有任何作用。

因此，我们将在此处添加它：https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

所有其他状态（功率，设定温度）都存在。

##类型检测器
添加所有必需的角色后，必须扩展类型检测器。
将新设备类型添加到全局列表：https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29以某台设备为基础，并将其复制到以下设备的`patterns`中`ChannelDetector`类。
类型检测器必须以某种方式区分设备，因此您的设备必须具有唯一的角色集。
我们将`level.temperature`和`level.mode.thermostat`作为空调的特定模式，并将这两个状态标记为`required`。
大多数复杂的设备必须位于列表的顶部，因此将首先检测到它们，最后将出现越来越多的简单设备。

 ## iobroker.devices