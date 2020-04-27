---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: anOSc88zA6i8s7Xoblhm727huSUtKa+Z4Ydd4A7nSZg=
---
![商标](../../../en/adapterref/iobroker.onvif/admin/onvif_logo.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.onvif.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![安装数量（最新）](http://iobroker.live/badges/onvif-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/onvif-stable.svg)
![依赖状态](https://img.shields.io/david/Haba1234/iobroker.onvif.svg)
![已知漏洞](https://snyk.io/test/github/Haba1234/ioBroker.onvif/badge.svg)
![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Haba1234/ioBroker.onvif/master.svg)

＃ioBroker.onvif
## RU
### Настройка
1.ОткрытьНастройкидрайвера
2.Нажатькнопкусканирования（сверхусправа）
3.Ввестинеобходимыенастройкиилиоставитьпоумолчанию：startRange-начальныйipадресдиапазонасканировани

终端范围-конечныйipадресдиапазонасканирования，端口列表-череззапятуюпортысервисаonvif（密码оооччи）：80，80，575，-

4.Нажать开始扫描

Если все сделано правильно, в основном окне настроек появятся найденые камеры и через несколько секунд должны будут подтянуться снапшоты

### События
Драйвер автоматически подписывается на события к настроенным камерам.
События, которые генерирует камера, появятся в объектах вида:

```
onvif.0.192_168_1_4_80.message.tns1:RuleEngine/FieldDetector/ObjectsInside
onvif.0.192_168_1_4_80.message.tns1:VideoSource/MotionAlarm.State
```

### Запрос снапшота
Дляэтогоиспользуетсякоманда：`sendTo('onvif.0', command, message, callback);`

Пример скрипта для запроса снапшота и отправка в телеграм:

```
const fs = require('fs');

function getSnapshot(caption){
    sendTo('onvif.0', 'saveFileSnapshot', {"id":"onvif.0.192_168_1_4_80", "file":"/opt/cameras/snapshot.jpg"}, (data) => {
        console.log('image принят: ' + data);
        if (data === "OK")
            sendTo('telegram.0', {text: '/opt/cameras/snapshot.jpg', caption: caption});
    });
}
```

*说明*-заголовокдлякартинкивтелеграме。
Вызыватьможнокакпособытию，такипокнопке/рассписанию

### События Камеры
натобыотключитьподпискунасобытияоткамеры，необходимовыставитьсостояние`subscribeEvents = false`иперезапуста。
Приизменениивпанелиадминистратора，перезугрузкаадаптеравыполняетсяавтоматически。

События имеют тип "Объект", например:

```
{
	'Value': false,
	'UtcTime': '2020-04-26T17:35:34.000Z'
}
```

`Value`-значение/состояние，`UtcTime`-времяизменениязначения/состояния

Т.к. адаптерработаетпоподпискенасобытия，товремясостояния`state.ts`можетнесовпадатьсеельным

## ENG
###定制
1.打开驱动程序设置
2.按下扫描按钮（右上方）
3.输入必要的设置或保留默认值：

startRange-扫描范围的起始ip地址，End Range-扫描范围的终止ip地址，Port list-onvif服务的逗号分隔端口（默认值：80、7575、8000、8080、8081），用户名-默认管理员，密码-默认管理员

4.按开始扫描

如果一切操作正确，则找到的摄像机将出现在设置的主窗口中，并在几秒钟之内必须收紧快照。

###活动
驱动程序自动订阅已配置摄像机的事件。
摄像机生成的事件将显示在以下对象中：

```
onvif.0.192_168_1_4_80.message.tns1:RuleEngine/FieldDetector/ObjectsInside
onvif.0.192_168_1_4_80.message.tns1:VideoSource/MotionAlarm.State
```

###快照请求
为此，请使用以下命令：`sendTo('onvif.0', command, message, callback);`

请求快照并发送到Telegram的脚本示例：

```
const fs = require('fs');

function getSnapshot(caption){
    sendTo('onvif.0', 'saveFileSnapshot', {"id":"onvif.0.192_168_1_4_80", "file":"/opt/cameras/snapshot.jpg"}, (data) => {
        console.log('image принят: ' + data);
        if (data === "OK")
            sendTo('telegram.0', {text: '/opt/cameras/snapshot.jpg', caption: caption});
    });
}
```

*说明*-前往电报中的图片

既可能导致事件发生，也可能导致按钮/时间表发生

###相机事件
要从摄像机断开对事件的订阅，您需要设置状态`subscribeEvents = false`并重新启动适配器。
在管理面板中更改时，适配器会自动重新启动。

事件的类型为“对象”，例如：

```
{
	'Value': false,
	'UtcTime': '2020-04-26T17:35:34.000Z'
}
```

`Value`-值/状态，`UtcTime`-状态更改时间

因为适配器通过订阅事件来工作，所以`state.ts`的状态时间可能与摄像机中事件的实时时间不一致。

## Changelog

### 0.4.0 (2020-04-26)
* (haba1234) States as an Object
* (haba1234) Error control 'pullMessages'. Disconnect if there are more than three errors

### 0.3.0 (2020-04-24)
* (haba1234) Added support for the Discovery adapter
* (haba1234) Added password encryption

### 0.2.0 (2020-04-21)
* (haba1234) Added camera settings
* (haba1234) Changes in the structure of objects (ATTENTION! After updating, delete cameras and add again)
* (haba1234) Fixed issue [#9](https://github.com/Haba1234/ioBroker.onvif/issues/9)

### 0.1.2 (2020-04-19)
* (haba1234) Fixed uncaught exception: The \"chunk\" argument must be one of type string or Buffer
* (haba1234) Add state 'subscribeEvents'

### 0.1.1 (2020-04-18)
* (haba1234) Port polling bug fixed

### 0.1.0 (2020-04-15)
* (haba1234) bag fix and different little things
* (haba1234) compact mode
* (haba1234) deprecated 'request' is replaced by class 'http'
* (haba1234) 'onvif-snapshot' is replaced by class 'http'
* (haba1234) Added translate
* (haba1234) Refactoring code

### 0.0.2 (2018-11-20)
* (haba1234) add events and snapshot

### 0.0.1 (2018-02-20)
* (Kirov Ilya) intial commit

## License

The MIT License (MIT)

Copyright (c) 2018-2020 Haba1234 <b_roman@inbox.ru>