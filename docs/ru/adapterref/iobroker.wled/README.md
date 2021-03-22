---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: OuR8MefMR0W8HD0uepODxQyPj1gkE6QIp5bvy0IVcTE=
---
![Логотип](../../../en/adapterref/iobroker.wled/admin/wled_large.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.wled.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wled.svg)
![Количество установок (последнее)](http://iobroker.live/badges/wled-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/wled-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.wled/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.wled/workflows/Test%20and%20Release/badge.svg)

** Этот адаптер использует службу [Sentry.io](https://sentry.io) для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств. ** Подробнее см. Ниже!

## Wled адаптер для ioBroker
Быстрая и многофункциональная реализация веб-сервера ESP8266 / ESP32 для управления светодиодами NeoPixel (WS2812B, WS2811, SK6812, APA102), а также наборами микросхем на основе SPI, такими как WS2801!

[WLED - проект Github](https://github.com/Aircoookie/WLED), автор: @Aircoookie

## Инструкции
Адаптер автоматически пытается найти устройства WLED в вашей сети с помощью служб Bonjour.
Известные проблемы: сети с разделением VLAN в большинстве случаев не маршрутизируют широковещательный трафик, что означает, что автоматическое обнаружение не будет выполнено.

Не волнуйтесь, в этом случае вы можете добавить устройство вручную по IP-адресу.

1) Убедитесь, что ваше устройство WLED работает и доступно по сети 2) Установите адаптер 3) Настройте интервалы времени для опроса данных и автоматического определения цикла 4 - A) Запустите адаптер, устройства должны обнаруживаться автоматически 4 - B) Если A выходит из строя , используйте кнопку Add-Device и укажите IP-адрес устройства 5) Адаптер немедленно отправит изменения и опрашивает данные каждые x секунд (настраивается)

## Сделать
* [] Переключить опрос на сокетные соединения, ожидается реализация в прошивке WLED.

## Поддержите меня
Если вам нравятся мои работы, пожалуйста, сделайте личное пожертвование (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать информацию об ошибках в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш идентификатор установки (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почты, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.5.6 (2021-01-03)
* (DutchmanNL) Bugfix : State type definition for time and pmt

### 0.5.5 (2021-01-03)
* (DutchmanNL) add development option to disable sentry
* (DutchmanNL) split API calls, avoid not needed query's
* (DutchmanNL) Bugfix : issue with boolean attributes #40
* (DutchmanNL) add new state definition for WLED version 0.11
* (DutchmanNL) Bugfix : You are assigning a string to the state "wled.0.xxxx.seg.0.col.0

### 0.5.4 (2020-09-02)
* (DutchmanNL) Support WLED 0.10.2, new state definitions implemented
* (DutchmanNL) Update state definitions
* (DutchmanNL) Remove log messages for missing states (Sentry report only)
* (DutchmanNL) Bugfix : 0.5.3 decommissioned, update to 0.5.4 !

### 0.5.2 (2020-08-29)
* (DutchmanNL) Bugfix : Add missing Attributes with WLED 0.10.0

### 0.5.1 (20-04-2020) Avoid writing objects unnecessarily, Sentry implemented
* (DutchmanNL) Implement Sentry
* (DutchmanNL) Bugfix : Devicename
* (DutchmanNL) Bugfix : Warning with JS Controler 3.0.7
* (DutchmanNL) Bugfix : Avoid writing objects unnecessarily

### 0.5.0 Stable release
* (DutchmanNL) Added translations
* (DutchmanNL) Release to stable repository, beta testing finished

### 0.3.0 Bugfix : Correct handling of polling timer
* (DutchmanNL  & Jey-Cee) Bugfix : Polling timer not saved
* (DutchmanNL) Bugfix : Correct handling of "online" state
* (DutchmanNL) Bugfix : Polling timer (offline devices did not reconnect)

### 0.2.6 Bugfix : Hex state value change
* (DutchmanNL) Bugfix : Hex state value change

### 0.2.5 Stable release candidate
* (DutchmanNL) Code cleanup
* (DutchmanNL) Improved logging information
* (DutchmanNL) Make polling timer configurable
* (DutchmanNL) Correct handling of device online state
* (DutchmanNL) Show online state in instance configuration

### 0.2.0 Possibility to add devices by IP-adress
* (DutchmanNL) Bugfix io-package
* (DutchmanNL) Improved logging at adapter start
* (DutchmanNL) Possibility to add devices by IP-adress implemented. (Needed for situations were autoscan fails)
* (DutchmanNL) Ensure known devices get connected immediatly after adapter start instead of waiting for network scan

### 0.1.9 Code improvements
* (DutchmanNL) Code cleanup and optimalisation
* (DutchmanNL) FIX memory leak by proper handling of bonjour service

### 0.1.8 Bugfix
* (DutchmanNL) Solved incorrect formated API call at state changes causing warning message

### 0.1.7 Bugfix
* (DutchmanNL) Fixed error when API call fails (write warning to log and retry at intervall time)

### 0.1.6 HEX color states implemented
* (DutchmanNL) HEX color states implemented

### 0.1.5 Stable Beta release

### 0.1.2
* (DutchmanNL) Implement drop down menu for effects

### 0.1.1
* (DutchmanNL) Implemented states hidden from JSON-API : tt / psave / nn / time
* (DutchmanNL) Improve logging issue

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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