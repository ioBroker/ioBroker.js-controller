---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-клиент
hash: GV9yQNtkLUyfuDFH9uo5frFCfqrBm6d4DIke/mXo0NA=
---
![Логотип](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![Количество установок](http://iobroker.live/badges/mqtt-client-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mqtt-client.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mqtt-client.svg)
![НПМ](https://nodei.co/npm/iobroker.mqtt-client.png?downloads=true)

# IoBroker.mqtt-client
## Настройки адаптера
![Адаптер](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

### При соединении темы и сообщения
Раздел ```on connect message``` публикуется в ```on connect topic``` каждый раз, когда клиент подключается или повторно подключается к серверу.

### Последняя тема и сообщение
Раздел ```last will message``` публикуется в ```last will topic``` каждый раз, когда клиент подключается или повторно подключается к серверу.
Сервер сохранит это сообщение и отправит его своим подписчикам, когда клиент отключится.

### Подписки
Разделенный запятыми список тем, не охваченных существующими состояниями.
Полученные сообщения преобразуются в состояния в пространстве имен адаптеров (например, mqtt.0) и подписываются.
Вы можете удалять темы после создания всех состояний.

### Префикс публикации
При публикации это будет добавлено ко всем темам.
По умолчанию пусто (без префикса).

### Префикс подписки
При подписке это будет добавлено ко всем темам.
По умолчанию пусто (без префикса).

## Настройки состояния
![Состояние](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### Включено
Включает или отключает функциональность mqtt-client для этого состояния.
Отключение приведет к удалению любых настроек mqtt-client из этого состояния.

### Тема
Тема, в которой опубликовано данное состояние и на которую подписана.
По умолчанию: state-ID преобразован в тему mqtt.

### Опубликовать
* состояние `` enable`` будет опубликовано
* Состояние `` только изменения '' будет опубликовано только при изменении его значения
* `` as object``, все состояние будет опубликовано как объект
* `` qos`` см. <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* `` сохранить '' см. <http://www.hivemq.com/blog/mqtt-essentials-part-8-reolated-messages>

### Подписываться
* Тема `` enable`` будет подписана, и состояние будет соответственно обновлено
* Состояние `` только изменения '' будет записано только при изменении значения
* Сообщения `` как объект '' будут интерпретироваться как объекты
* `` qos`` см. <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* `` ack`` при обновлении состояния флаг подтверждения будет установлен соответственно

#### Примечание
* если для параметра ack установлено значение true, он будет перезаписывать объекты, подтвержденные подтверждением, см. `` как объект ''
* для предотвращения зацикливания сообщений, если включены и публикация, и подписка, для подписки всегда включено `` только изменения ''

## ДЕЛАТЬ
* тестовые префиксы
* подключение / повторное подключение без чистой сессии

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 1.3.2 (2021-04-19)
* (bluefox) Added support of admin5

### 1.3.1 (2020-03-17)
* (bluefox) mqtt package moved back to 2.x

### 1.3.0 (2020-03-11)
* (bluefox) mqtt package was updated
* (bluefox) Fixed the error with "custom" view

### 1.2.1 (2019-10-17)
* (algar42) Fix adapter restarting
* (algar42) Fix mqtt issues

### 1.2.0 (2019-10-14)
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

Copyright (c) 2016-2020 Pmant

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