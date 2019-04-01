---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: xvJAGdSNVXACS/GYrLjZH/Z64uh0aTAFSH4hPx8OV0g=
---
![商标](../../../en/adapterref/iobroker.onvif/admin/onvif_logo.png)

![安装数量](http://iobroker.live/badges/onvif-stable.svg)

＃ioBroker.onvif
## RU
### Настройка
1.ОткрытьНастройкидрайвера
2.Нажатькнопкусканирования（сверхусправа）
3.Ввестинеобходимыенастройкиилиоставитьпоумолчанию：startRange  - начальныйipадресдиапазонасканирования，

结束范围 - конечныйipадресдиапазонасканирования，端口列表 - череззапятуюпортысервисаonvif（поумолчанию：80,7575,8000,8080,8081），用户名 - поумолчаниюadmin，密码 - поумолчаниюadmin

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

*标题*  - заголовокдлякартинкивтелеграме。
更多信息，包括пособытию

## ENG
###定制
1.打开驱动程序设置
2.按扫描按钮（右上角）
3.输入必要的设置或保留默认值：

startRange  - 扫描范围的起始IP地址，结束范围 - 扫描范围的结束IP地址，端口列表 -  onvif服务的逗号分隔端口（默认值：80,7575,8000,8080,8081），用户名 - 默认管理员，密码 - 默认管理员

4.按START SCAN

如果一切都正确，那么找到的摄像机将出现在设置的主窗口中，并且在几秒钟内必须收紧快照。

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

*标题*  - 正在电报中的图片

可以在事件上和根据按钮/时间表产生两者

## Changelog
### 0.0.2 (2018-11-20)
* (haba1234) add events and snapshot

### 0.0.1 (2018-02-20)
* (Kirov Ilya) intial commit

## License

The MIT License (MIT)

Copyright (c) 2018 Kirov Ilya <kirovilya@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.