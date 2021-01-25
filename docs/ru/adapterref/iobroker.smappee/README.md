---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smappee/README.md
title: ioBroker.smappee
hash: gwcVX0Z9Crq0vyemPA0SsrxqNuHkE+VXpj/xJtFTXD4=
---
![Логотип](../../../en/adapterref/iobroker.smappee/admin/smappee.png)

![Количество установок](http://iobroker.live/badges/smappee-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.smappee.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smappee.svg)
![НПМ](https://nodei.co/npm/iobroker.smappee.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.smappee.svg)

# IoBroker.smappee
Адаптер ioBroker для smappee - устройства

#### Вам необходимо установить первый адаптер ioBroker.MQTT (или использовать другой MQTT-брокер) и активировать публикацию MQTT вашего Smappee. Перед установкой адаптера Smappee ознакомьтесь со следующими инструкциями.
Этот адаптер предоставляет вам данные об энергии в реальном времени (с интервалом 1 с), агрегированные данные об энергии и данные о потреблении дополнительных датчиков, а также доступ к вашим переключателям / разъемам вашего Smappee - устройства в ioBroker.

## Инструкции
### Установка ioBroker.mqtt - Адаптер.
Добавьте экземпляр ioBroker.mqtt - Adapter:

![ioBMQ](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/ioBrokerMQTTBroker.PNG)

настроить экземпляр как сервер / брокер. Порт 1883 по умолчанию в порядке, не стесняйтесь выбирать любой другой рабочий.
Задайте имя пользователя и пароль (они понадобятся для настройки smappee- и smappee-Adapter:

![ioBMC](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/ioBrokerMQTTConfig.PNG)

На вкладке MQTT-Settings необходимо установить флажок «Публиковать только при изменении».

### Активация публикации MQTT Smappee.
Откройте браузер и перейдите по URL-адресу: <http://X.X.X.X/smappee.html> (замените X.X.X.X IP-адресом Smappee в вашей сети).
Нажмите кнопку входа / выхода и используйте пароль «admin» для входа в систему.

![smplogon](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smplogon.png)

Перейдите в раздел «Дополнительно» и установите флажок «Дополнительно» в последнем поле таблицы.

![smpadv](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smpadv.jpeg)

Тогда вы должны быть здесь:

![smpmqt](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smpmqt.png)

Введите Ip вашего ioBroker, а затем порт, который вы указали для mqtt-broker (по умолчанию 1883), то есть tcp: //192.168.1.111: 1883

Введите имя пользователя и пароль, которые вы указали при настройке вашего mqtt-брокера.
Затем нажмите «Применить изменения и перезапустить монитор».

А теперь пора

### Установите smappee-адаптер
Создайте экземпляр smappee-адаптера и введите имя пользователя и пароль, которые вы указали при настройке вашего mqtt-брокера.

Если вы используете MQTT-адаптер, отличный от ioBrokers, с настройками по умолчанию, вы можете дополнительно указать подключение к вашему MQTT-брокеру (хост и порт).

Дайте адаптеру несколько минут для чтения данных с вашего устройства smappee. Если вам не хватает некоторых значений, перезагрузите дерево объектов.

Адаптер предоставляет данные о фактическом токе, о потребляемой мощности в целом и по каждой фазе, о фактической нагрузке, а также о состоянии и потреблении данных датчиков газа, воды и выключателя.

### Агрегирование или разделение данных (ежечасные, ежедневные, годовые, .. значения)
Некоторые значения smappee являются «счетчиками», некоторые - значениями за определенный период (5-минутные значения).
Для агрегирования или разделения данных используйте адаптер ioBroker.statistics.

### Контрольные штекеры / переключатели
Smappee позволяет удаленно управлять интеллектуальными розетками / интеллектуальными переключателями. Либо smappee-one, либо другие 433Mhz RF-plugs / swiches (например, Intertechno IT-1500). Подключите коммутаторы к вашему smappee - app и перезапустите smappee-адаптер ioBroker. Вы получите имена и состояния ваших вилок, и, установив 'switchON' 'true', вы включаете переключатель, когда вы устанавливаете 'false', вы выключаете его (при установке 'switchON' ACK должно быть false) . Фактическое состояние switchON обновляется с помощью состояния plug.state.

## Changelog

### 0.2.3

-   'switchON' state is updated with actual state of a plug.

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

Copyright (c) 2018-2021 forelleblau marceladam@gmx.ch

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