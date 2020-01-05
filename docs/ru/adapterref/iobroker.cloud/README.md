---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cloud/README.md
title: Облачный адаптер ioBroker
hash: RebA3aDvQtVtvoT0+yWQ951WyaujEGwhHFc9X8QsJ5c=
---
![логотип](../../../en/adapterref/iobroker.cloud/admin/cloud.png)

![Количество установок](http://iobroker.live/badges/cloud-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cloud.svg)
![NPM](https://nodei.co/npm/iobroker.cloud.png?downloads=true)

# IoBroker облачный адаптер
Этот адаптер позволяет подключаться из Интернета через облако ioBroker к локальной установке ioBroker.

## Настройки
### APP-ключ
Для использования облачного адаптера вы должны сначала получить ключ APP на [https://iobroker.net](https://iobroker.net).

Это ключ приложения, который пользователь может получить на сайте [https://iobroker.net](https://iobroker.net). Пожалуйста, получите ключ и введите его здесь.

![вступление](../../../en/adapterref/iobroker.cloud/img/intro.png)

### Экземпляр
Все запросы от облачного адаптера будут перенаправлены в какой-либо WEB-экземпляр. Пользователь должен указать здесь экземпляр WEB, который будет показан пользователю при входе на сайт https://iobroker.net.

### Разрешить самозаверяющие сертификаты
Если вы используете стандартное облако iobroker.net, вы можете отключить его. Эта опция важна, только если используется собственное облако.

### Настройки Алекса
*** Alexa больше не поддерживается адаптером `cloud`. Для этого используйте адаптер ioBroker.iot. ***

Некоторое время он все еще будет работать для пользователей `.pro`, а документация доступна [Вот](doc/alexa.md).

## IFTTT
[инструкции](doc/ifttt.md)

## Сервисы
Есть возможность отправлять сообщения в облачный адаптер.
Если вы называете ```[POST]https://iobroker.net/service/custom_<NAME>/<user-app-key>``` und value как полезную нагрузку.

```
curl --data "myString" https://iobroker.net/service/custom_test/<user-app-key>
```

Если вы зададите в настройках для поля «Белый список служб» имя *custom_test* и вызовете с именем «custom_test» в качестве имени службы, состояние **cloud.0.services.custom_test** будет установлено на *myString*

Вы можете написать «*» в белом списке, и все услуги будут разрешены.

Начиная с версии 2.0.5 вы можете использовать запрос GET в форме ```[GET]https://iobroker.net/service/custom_<NAME>/<user-app-key>/<data>``` для размещения **\ <data\>** в **cloud.0.services.custom_ \ <NAME\>**

Здесь вы можете найти инструкции, как использовать его с [Tasker](doc/tasker.md).

Услуга IFTTT разрешена, только если установлен ключ IFTTT.

Зарезервированные имена: «ifttt», «text2command», «simpleApi», «swagger». Они должны использоваться без префикса ```"custom_"```.

### Text2command
Вы можете написать «text2command» в белый список, вы можете отправить запрос POST в ```https://iobroker.net/service/text2command/<user-app-key>``` для записи данных в переменную *text2command.X.text*

«X» можно определить в настройках с помощью опции «Использовать экземпляр text2command».

### SimpleApi
*сделать*

## Changelog
### 3.0.0 (2020-01-04)
* (bluefox) Breaking changes: no alexa support. Use ioBroker.iot for that.
* (bluefox) Support of multiple clients for .pro

### 2.8.0 (2019-11-13)
* (bluefox) Connects your ioBroker server to the ioBroker cloud

### 2.7.1 (2018-09-07)
* (Apollon77) Enhancements for Custom Skill

### 2.7.0 (2018-06-18)
* (bluefox) Multilingual names were corrected

### 2.6.2 (2018-06-18)
* (Apollon77/AlCalzone/Bluefox) Several fixes

### 2.6.1 (2018-05-04)
* (bluefox) Support of custom alexa skill

### 2.5.0 (2018-03-17)
* (bluefox) Added actions on commands from server: wait, stop, redirect; to control load of the server by start.

### 2.4.7 (2018-02-09)
* (bluefox) Small changes in the configuration dialog
* (bluefox) add information about the expiring of remote access

### 2.4.6 (2018-02-09)
* (bluefox) Adding of new devices is fixed

### 2.4.5 (2018-01-29)
* (bluefox) Changes for Admin 3

### 2.4.4 (2018-01-20)
* (bluefox) The errors by controlling of temperature are caught now

### 2.4.2 (2018-01-20)
* (bluefox) Do not subscribe all objects

### 2.2.0 (2017-12-22)
* (bluefox) Better update of the devices in configuration dialog

### 2.1.1 (2017-12-11)
* (bluefox) Add settings for the ping timeout
* (grimneko) corrected some spelling mistakes
* (grimneko) update readme for IFTTT

### 2.1.0 (2017-12-06)
* (bluefox) Allow to disable alexa service by state

### 2.0.8 (2017-11-28)
* (bluefox / Philipp Beckers) Translations

### 2.0.7 (2017-10-29)
* (bluefox) Changes for socket-io

### 2.0.6 (2017-10-26)
* (bluefox) Fix small error in configuration
* (bluefox) Send uuid to cloud for authentication

### 2.0.5 (2017-09-26)
* (bluefox) The small custom service reaction improvement

### 2.0.4 (2017-09-12)
* (bluefox) Allow access to admin via iobroker.pro
* (c-klinger) Add settings for the connection timeout

### 1.0.8 (2017-07-13)
* (bluefox) Allow control light colors

### 1.0.7 (2017-06-26)
* (bluefox) AI deactivated
* (bluefox) change ping interval from 10 to 30 seconds
* (bluefox) fix double auth on connect

### 1.0.3 (2017-05-23)
* (bluefox) Rename some german words

### 1.0.2 (2017-05-23)
* (bluefox) Support of IFTTT

### 1.0.0 (2017-05-22)
* (bluefox) Catch an error if the invalid smart name set

### 0.8.2 (2017-04-24)
* (bluefox) controls of colors (english only)
* (bluefox) request temperature (target temperature and sensor temperature, english only)
* (bluefox) support of double names

### 0.7.1 (2017-04-05)
* (bluefox) Fixed reconnection

### 0.7.0 (2017-04-01)
* (bluefox) Try to fix reconnection

### 0.6.12 (2017-03-26)
* (bluefox) Try to fix error with names

### 0.6.11 (2017-03-20)
* (bluefox) Fixed scrollbar in configuration

### 0.6.10 (2017-03-03)
* (bluefox) Add tooltips in config
* (bluefox) Add workaround for alexa reconnection

### 0.6.9 (2017-02-17)
* (bluefox) Allow to use more than one smart name

### 0.6.8 (2017-02-16)
* (bluefox) Fix deactivation of enums

### 0.6.7 (2017-02-14)
* (bluefox) allow buttons to be controller with alexa

### 0.6.5 (2017-02-06)
* (bluefox) print warnings for invalid states

### 0.6.3 (2017-01-28)
* (bluefox) fix enum names
* (bluefox) add helper states and response text

### 0.6.2 (2017-01-25)
* (bluefox) add option "Place function in names first"

### 0.6.1 (2017-01-24)
* (bluefox) fix reconnect
* (bluefox) change smartName structure

### 0.5.0 (2017-01-20)
* (bluefox) add value by ON

### 0.4.2 (2017-01-12)
* (bluefox) add daily restart

### 0.4.1 (2017-01-06)
* (bluefox) use devices with ":" symbols in the names
* (bluefox) add debug outputs

### 0.4.0 (2017-01-06)
* (bluefox) Support of english language
* (bluefox) Use rooms of channel and not only states

### 0.3.3 (2017-01-02)
* (bluefox) Fix error with smartNames
* (bluefox) Take the superset of actions for group and not the last one
* (bluefox) if group has switches and dimmers, turn devices OFF if the percent level is less than 30%
* (bluefox) Remember ON level for dimmers to switch it later ON

### 0.3.0 (2016-12-29)
* (bluefox) Implement Heating profile for Alexa

### 0.2.0 (2016-12-13)
* (bluefox) support of amazon alexa

### 0.1.2 (2016-11-17)
* (bluefox) update socket.io

### 0.1.1 (2016-10-23)
* (bluefox) update some packages

### 0.1.0 (2016-08-01)
* (bluefox) support of read/write files

## License
The MIT License (MIT)

Copyright (c) 2016-2020 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.