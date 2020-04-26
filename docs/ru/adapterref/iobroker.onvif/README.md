---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: anOSc88zA6i8s7Xoblhm727huSUtKa+Z4Ydd4A7nSZg=
---
![логотип](../../../en/adapterref/iobroker.onvif/admin/onvif_logo.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.onvif.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![Количество установок (последняя)](http://iobroker.live/badges/onvif-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/onvif-stable.svg)
![Статус зависимости](https://img.shields.io/david/Haba1234/iobroker.onvif.svg)
![Известные уязвимости](https://snyk.io/test/github/Haba1234/ioBroker.onvif/badge.svg)
![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Haba1234/ioBroker.onvif/master.svg)

# IoBroker.onvif
## RU
### Настройка
1. Открыть настройки драйвера
2. Нажать кнопку сканирования (сверху справа)
3. По умолчанию: startRange - начальный IP-адрес диапазона поиска,

Конечный диапазон - конечный IP-адрес диапазона поиска, Список портов - через запатую порты сервиса onvif (по умолчанию: 80, 7575, 8000, 8080, 8081), Имя пользователя - по умолчанию admin, Пароль - по умолчанию admin

4. Нажать НАЧАТЬ СКАН

Если все сделано правильно, в основном окне настроек появятся найденые камеры и через несколько секунд должны будут подтянуться снапшоты

### События
Драйвер автоматически подписывается на события к настроенным камерам.
События, которые генерирует камера, появятся в объектах вида:

```
onvif.0.192_168_1_4_80.message.tns1:RuleEngine/FieldDetector/ObjectsInside
onvif.0.192_168_1_4_80.message.tns1:VideoSource/MotionAlarm.State
```

### Запрос снапшота
Для этого используется команда: `sendTo('onvif.0', command, message, callback);`

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

* заголовок * - заголовок для картинки в телеграме.
Вызывать можно как по событию, так и по кнопке / рассписанию

### События Камеры
Подписать на события от камеры, необходимо выставить состояние `subscribeEvents = false` и перезапустить адаптер.
При изменении в панели администратора, перезугрузка адаптера выполняется автоматически.

События имеют тип "Объект", например:

```
{
	'Value': false,
	'UtcTime': '2020-04-26T17:35:34.000Z'
}
```

`Value` - значение / состояние, `UtcTime` - время изменения значения / состояние

Т.к. Адаптер работает над подписью о событиях, в то время как в состоянии `state.ts` может не совпадать с реальным временем событий в камере.

## ENG
### Настройка
1. Откройте настройки драйвера
2. Нажмите кнопку сканирования (вверху справа)
3. Введите необходимые настройки или оставьте настройки по умолчанию:

startRange - начальный IP-адрес диапазона сканирования, End Range - конечный IP-адрес диапазона сканирования, список портов - разделенные запятыми порты службы onvif (по умолчанию: 80, 7575, 8000, 8080, 8081), имя пользователя - Администратор по умолчанию, Пароль - Администратор по умолчанию

4. Нажмите НАЧАТЬ СКАНИРОВАНИЕ

Если все сделано правильно, то найденные камеры появятся в главном окне настроек и через несколько секунд снимки придется подтянуть.

### Мероприятия
Драйвер автоматически подписывается на события для настроенных камер.
События, генерируемые камерой, будут отображаться в следующих объектах:

```
onvif.0.192_168_1_4_80.message.tns1:RuleEngine/FieldDetector/ObjectsInside
onvif.0.192_168_1_4_80.message.tns1:VideoSource/MotionAlarm.State
```

### Запрос снимка
Для этого используйте команду: `sendTo('onvif.0', command, message, callback);`

Пример скрипта для запроса снимка и отправки в Telegram:

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

* заголовок * - идет к картинке в Telegram

Вызывать можно как по событию, так и по кнопке / расписанию

### События камеры
Чтобы отключить подписку на события с камеры, необходимо установить состояние `subscribeEvents = false` и перезапустить адаптер.
При смене в админке адаптер автоматически перезагружается.

События имеют тип «Объект», например:

```
{
	'Value': false,
	'UtcTime': '2020-04-26T17:35:34.000Z'
}
```

`Value` - значение / состояние, `UtcTime` - время изменения состояния

Поскольку адаптер работает, подписываясь на события, время состояния `state.ts` может не совпадать с реальным временем события в камере.

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