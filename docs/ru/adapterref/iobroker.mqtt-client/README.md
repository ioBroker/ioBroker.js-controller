---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-клиент
hash: Pzk8b4sE1sQWx5/ZxhB0IfeKVmWlkQhNhNzV5CyWOzI=
---
![логотип](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![Количество установок](http://iobroker.live/badges/mqtt-client-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mqtt-client.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mqtt-client.svg)
![NPM](https://nodei.co/npm/iobroker.mqtt-client.png?downloads=true)

# IoBroker.mqtt-client
## Настройки адаптера
![адаптер](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

### На тему и сообщение
```on connect message``` публикуется в ```on connect topic``` каждый раз, когда клиент подключается или переподключается к серверу.

### Последняя тема и сообщение
```last will message``` публикуется в ```last will topic``` каждый раз, когда клиент подключается или переподключается к серверу.
Сервер сохранит это сообщение и отправит его своим подписчикам, когда клиент отключится.

### Подписки
Разделенный запятыми список тем, которые не охватываются существующими состояниями.
Полученные сообщения преобразуются в состояния в пространстве имен адаптеров (например, mqtt.0) и подписываются.
Вы можете удалить темы после того, как все состояния были созданы.

### Опубликовать префикс
При публикации это будет предшествовать всем темам.
По умолчанию пусто (без префикса).

### Подписка префикса
При подписке это будет предшествовать всем темам.
По умолчанию пусто (без префикса).

## Настройки государства
![государственный](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### Включено
Включает или отключает функциональность mqtt-client для этого состояния.
Отключение удалит все настройки mqtt-client из этого состояния.

### Тема
Тема, в которой опубликовано и подписано это состояние.
по умолчанию: идентификатор состояния преобразуется в тему mqtt.

### Опубликовать
* `` `enable``` будет опубликовано
* `` `changes only``` состояние будет опубликовано только при изменении его значения
* `` `as object``` все состояние будет опубликовано как object
* `` `qos``` смотрите <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* `` `retain``` see <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### Подписываться
* `` `enable``` тема будет подписана и состояние будет соответственно обновляться
* `` `changes only``` состояние будет записано только при изменении значения
* `` `as object``` сообщения будут интерпретироваться как объекты
* `` `qos``` смотрите <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* `` `ack``` при обновлении состояния флаг ack будет установлен соответственно

#### Запись
* когда ack установлен в true, он перезаписывает объекты ack, смотрите `` `как объект```
* для предотвращения зацикливания сообщений, если включены и публикация, и подписка, `` `изменения только``` всегда включены для подписки

## СДЕЛАТЬ
* тестовые префиксы
* подключение / переподключение без чистой сессии

## Changelog
### 1.2.0 (2019-10-14)
* (bluefox) Used MQTT 5.0
* (bluefox) Support of js-controller 2.0 was added

### 1.1.1 (2018-01-30)
* (bluefox) small fixes

### 1.1.0 (2017-12-30)
* (bluefox) Translations
* (bluefox) Udpate of MQTT module

### 1.0.1 (2017-11-16)

### 1.0.0 (2017-11-16)
* (bluefox) Update io-package.json

### 0.3.2 (2016-11-18)
* (Pmant) fix initial object parsing
* (Pmant) fix objects view

### 0.3.1 (2016-11-16)
* (Pmant) fix crash

### 0.3.0 (2016-09-08)
* (Pmant) add optional publish and subscribe prefixes

### 0.2.5 (2016-09-08)
* (Pmant) reduce logging -> debug

### 0.2.0 (2016-09-08)
* (Pmant) use new custom settings

### 0.1.1 (2016-06-09)
* (Pmant) fix possible loop

### 0.1.0 (2016-06-08)
* (Pmant) initial commit

## License
The MIT License (MIT)

Copyright (c) 2016-2019 Pmant

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