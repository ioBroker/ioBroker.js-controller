---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: arHjPFDSFCWhUuDWwkMW6rVlqiIPvhw5gj2ASjboo0M=
---
![логотип](../../../en/adapterref/iobroker.lametric/admin/lametric.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.lametric.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lametric.svg)
![стабильный](http://iobroker.live/badges/lametric-stable.svg)
![установлены](http://iobroker.live/badges/lametric-installed.svg)
![Статус зависимости](https://img.shields.io/david/klein0r/iobroker.lametric.svg)
![Известные уязвимости](https://snyk.io/test/github/klein0r/ioBroker.lametric/badge.svg)
![Статус сборки](http://img.shields.io/travis/klein0r/ioBroker.lametric.svg)
![NPM](https://nodei.co/npm/iobroker.lametric.png?downloads=true)

# IoBroker.lametric
Этот адаптер позволяет вам получать информацию о состоянии вашего LaMetric Time и отправлять на него уведомления.
Все, что вам нужно, это IP-адрес вашего устройства и ключ разработчика API.

## Конфигурация
Вы можете получить свой личный ключ [Вот](https://developer.lametric.com/).

![апи-ключ](../../../en/adapterref/iobroker.lametric/docs/apiKey.png)

## Применение
Вы можете узнать больше об уведомлениях здесь: https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html

## Особенности
- Установите яркость дисплея (в процентах, автоматический режим / ручной режим)
- Установить громкость звука (в процентах)
- Настроить заставку (включить / отключить, по времени, когда темно)
- Активировать / деактивировать Bluetooth и изменить имя Bluetooth
- Переключение между приложениями (следующий, предыдущий, перейти к определенному приложению)
- Отправлять блочные уведомления (с настраиваемым приоритетом, звуком, значками, текстом, ...)
- Управляйте специальными приложениями, такими как радио, секундомер и погода

## Блочно
В качестве сообщения вы можете использовать простую строку, которая будет отображаться в виде одного кадра.

![просто](../../../en/adapterref/iobroker.lametric/docs/blockly1.png)

Чтобы показать несколько кадров, вы также можете предоставить массив в качестве сообщения

![просто](../../../en/adapterref/iobroker.lametric/docs/blockly2.png)

## Сценарии
Чтобы показать сообщение в вашей метрике, просто отправьте сообщение этому экземпляру с помощью адаптера сценария:

```
sendTo('lametric.0', 'send', {
    "priority": "[info|warning|critical]",
    "icon_type": "[none|info|alert]",
    "lifeTime": <milliseconds>,
    "model": {
    "frames": [
         {
            "icon":"<icon id or base64 encoded binary>",
            "text":"<text>"
         },
         {
           "icon": 298,
           "text":"text"
         },
         {
             "icon": 120,
             "goalData":{
                 "start": 0,
                 "current": 50,
                 "end": 100,
                 "unit": "%"
             }
         },
         {
             "chartData": [ <comma separated integer values> ] // [ 1, 2, 3, 4, 5, 6, 7 ]
         }
         ],
         "sound": {
           "category":"[alarms|notifications]",
             "id":"<sound_id>",
             "repeat":<repeat count>
         },
         "cycles":<cycle count>
    }
});
```

Пример, чтобы показать некоторую информацию циклически:

```
let i = 0;
function show() {
    console.log('Show ' + i);
    sendTo('lametric.0', 'send', {
        "priority": "info",
        "icon_type": "info",
        "lifeTime": 10000,
        "model": {
        "frames": [
                {
                    "icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAAySURBVBhXY4AAYdcKk1lngCSUDwHIfAQbzgLqgDCgIqRLwFkQCYQoBAD5EATl4wQMDADhuxQzaDgX0gAAAABJRU5ErkJggg==",
                    "text":"Hi " + i
                }
            ],
            "cycles": 0
        }
    });
    i++;
}
setInterval(show, 10000);
show();
```

## Changelog

### 0.0.9

* (klein0r) Added missing translations
* (GermanBluefox) Improved Blockly and main.js

### 0.0.8

* (klein0r) Updated dependencies

### 0.0.7

* (klein0r) fixed blockly

### 0.0.6

* (klein0r) switched to setTimeout instead of setInterval, improved logging and fixes eslint complaints

### 0.0.5

* (klein0r) Fixed notification, html, updated github template, enable and disable screensaver

### 0.0.4

* (klein0r) Refactored blockly sendTo / notifications

### 0.0.3

* (klein0r) Added app switching support, refactored everything
* (bluefox) The deletion of the actual shown information was added

### 0.0.2

* (Sigi74) Change message_value for variables message
* (Sigi74) Leave sound none

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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