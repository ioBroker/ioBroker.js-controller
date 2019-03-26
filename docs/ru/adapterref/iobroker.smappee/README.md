---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smappee/README.md
title: ioBroker.smappee
hash: kN91vzBPwDEYQJ8D/N06TsAasHmzY/2EL0v63KAJldQ=
---
![логотип](../../../en/adapterref/iobroker.smappee/admin/smappee.png)

![Количество установок](http://iobroker.live/badges/smappee-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.smappee.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smappee.svg)
![NPM](https://nodei.co/npm/iobroker.smappee.png?downloads=true)

# IoBroker.smappee
Адаптер ioBroker для smappee - устройства

#### Вам необходимо установить первый адаптер ioBroker.MQTT (или использовать другого MQTT-брокера) и активировать публикацию MQTT вашего Smappee. Пожалуйста, смотрите следующие инструкции перед установкой адаптера Smappee.
Этот адаптер предоставляет вам данные о потребляемой мощности в режиме реального времени (с интервалом в 1 с), агрегированные данные об энергии и дополнительные данные о потреблении датчиков, а также доступ к вашим переключателям / разъемам вашего Smappee - Device to ioBroker.

## Инструкции
### Установка ioBroker.mqtt - Адаптер.
Пожалуйста, добавьте экземпляр ioBroker.mqtt - Adapter:

![ioBMQ](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/ioBrokerMQTTBroker.PNG)

настроить экземпляр как сервер / посредник. Порт 1883 по умолчанию в порядке, вы можете выбрать любой другой рабочий.
Задайте имя пользователя и пароль (вам понадобится это для конфигурации smappee- и smappee-Adapter:

![ioBMC](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/ioBrokerMQTTConfig.PNG)

На вкладке «Настройки MQTT» необходимо установить флажок «Публиковать только при изменении».

### Активация публикации MQTT Smappee.
Откройте браузер и перейдите по URL-адресу: <http://X.X.X.X/smappee.html> (замените X.X.X.X на IP-адрес Smappee в вашей сети).
Нажмите кнопку входа / выхода и используйте пароль «admin» для входа.

![smplogon](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/smplogon.png)

Перейдите в раздел «Дополнительно» и установите флажок «Дополнительно» в последнем поле таблицы.

![smpadv](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/smpadv.jpeg)

Тогда вы должны быть здесь:

![smpmqt](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/smpmqt.png)

Введите IP-адрес вашего ioBroker, а затем порт, указанный для mqtt-broker (по умолчанию 1883), т.е. tcp: //192.168.1.111: 1883

Введите имя пользователя и пароль, которые вы указали при настройке вашего mqtt-брокера.
Затем нажмите «Применить изменения и перезапустить монитор».

И теперь пришло время

### Установить smappee-адаптер
Создайте экземпляр адаптера smappee и введите имя пользователя и пароль, которые вы указали при настройке вашего mqtt-брокера.

Если вы используете MQTT-адаптер, отличный от ioBrokers, с настройками по умолчанию, вы можете при желании указать соединение с вашим брокером MQTT (хост и порт).

Пожалуйста, дайте адаптеру несколько минут, чтобы прочитать данные с вашего устройства smappee. Перезагрузите объектное дерево, если вам не хватает некоторых значений.

Адаптер предоставляет данные о фактическом токе, потребляемой мощности в целом и для каждой фазы, о фактической нагрузке, а также данные о состоянии и потреблении для датчиков газа, воды и переключателей.

### Агрегирование или разделение данных (ежечасно, ежедневно, ежегодно, .. значения)
Некоторые из значений smappee являются «счетчиками», некоторые - значения для определенного периода (5-минутные значения).
Для агрегирования или разделения данных, пожалуйста, используйте адаптер ioBroker.statistics.

### Контрольные вилки / переключатели
Smappee позволяет вам удаленно управлять интеллектуальными разъемами / интеллектуальными переключателями. Либо smappee-one, либо другие 433 МГц RF-штекеры / переключатели (т. Е. Intertechno IT-1500). Соедините коммутаторы с вашим приложением smappee и перезапустите smappee-адаптер ioBroker. Вы получите имена и состояния ваших штекеров и, установив «switchON» «true», включите переключатель, когда вы установите «false», вы выключите его (когда настройка «switchON» ACK должна быть ложной) ,

## Changelog

### 0.2.2

-   Readme - update.

### 0.2.1

-   Core Files/Testing Update and introduce adapter-core.
-   added counters for sensor that sum the 5-min values.

### 0.2.0

-   Gets state data for smartplugs and smartswitches, controls smart plugs and smart switches, gets 5-min power consumption for switch sensors (smart switches).

### 0.1.3

-   Controls smart plugs and smart switches, gets 5-min power consuption for switch sensors (smart switches). [For testing only]

### 0.1.1

-   Imports names & states of switches/plugs. Lets you control your swiches.

### 0.1.0

-   Gas_Water sensor integrated, 'alwaysOn' integrated.

### 0.0.5

-   design-bug fixed, Gas_Water Sensor integrated (only raw value).

### 0.0.4

-   credentials - bug fixed, more efficient design, gulp update

### 0.0.3

-   first tested version, bugs in config fixed.

### 0.0.2

-   reads phase config, reports single phase data.

### 0.0.1 Initial version

-   inital version, displays realtime power und energy consumption.

## License

The MIT License (MIT)

Copyright (c) 2018-2019 forelleblau marceladam@gmx.ch

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