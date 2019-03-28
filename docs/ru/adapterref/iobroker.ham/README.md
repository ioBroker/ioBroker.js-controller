---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ham/README.md
title: ioBroker менеджер аксессуаров для Homebridge
hash: GXblfm8LZgTzMcAAaBLkqRMDAApWKCYG+LGhtLBXsNw=
---
![логотип](../../../en/adapterref/iobroker.ham/admin/ham.png)

![Количество установок](http://iobroker.live/badges/ham-stable.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/ioBroker/ioBroker.ham.svg)

# IoBroker Менеджер аксессуаров для Homebridge
=================

Используйте плагины Homebridge в ioBroker или используйте глобально установленный Homebridge в качестве адаптера ioBroker.
Все состояния из Homebridge будут доступны и в ioBroker, и их также можно будет контролировать там.

## Описание
Этот адаптер обеспечивает два разных режима:

### Режим по умолчанию (Wrapper)
В режиме по умолчанию адаптер позволяет напрямую использовать подключаемые модули homebridge.
Вы можете ознакомиться со всеми доступными плагинами на веб-сайте NPM по [поиск по ключевому слову `homebridge-plugin`](https://www.npmjs.com/search?q=homebridge-plugin).

Вы просто добавляете список модулей в конфигурацию адаптера и предоставляете конфигурацию в JSON-редакторе (см. Описание плагинов).
После этого все объекты Homebridge будут созданы и в ioBroker, и все доступные для записи объекты также могут быть изменены.

Ссылку на успешно опробованные плагины с примерами можно найти здесь: https://forum.iobroker.net/viewtopic.php?f=20&t=15021.

### Global-Homebridge-Mode
Если вы уже используете Homebridge (Apple OpenSource SmartHome) для управления своими устройствами, вы можете использовать эту существующую установку Homebridge и запустить эту установку Homebridge как процесс ioBroker. В этом случае сервер Homebridge запускается ioBroker.
Кроме того, все состояния из Homebridge доступны как состояния в ioBroker и позволяют управлять из ioBroker.

Чтобы это работало, вам необходимо указать расположение папки global node-modules системы. Для этого вызова **npm root -g** Кроме того, вам нужно указать путь к каталогу конфигурации homebridge (обычно .homebridge в папке users).

## Следующие адаптеры были протестированы в режиме по умолчанию
* homebridge-Chamberlain v1.0.1 - плагин для открывателей гаражных ворот Чемберлена с MyQ
* homebridge-doorbird v0.0.4 - Плагин для Doorbird
* homebridge-dyson-link v2.2.2 - устройства Dyson Link
* homebridge-edomoticz v2.1.11 - полноценный современный плагин для Domoticz
* homebridge-Fibaro-HC2 v2.1.5 - интеграция Fibaro HomeCenter
* homebridge-homee v0.2.4 - полноценный современный плагин для Homee
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite через модули USB MTRF-64 или МТRF-64
* homebridge-platform-wemo v1.0.1 - плагин Belkin WeMo Platform
* homebridge-seasons v1.0.1 - плагин для отображения текущего сезона года.
* homebridge-vera v0.8.2 - VeraLink - приложение для аксессуаров Z-Wave от Vera (Node.js 8.11.3)

## СДЕЛАТЬ
* Тесты
* Больше документации ?!

## Changelog

### 1.0.1 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.0.0 (WIP)
* (Apollon77) add polling interval to global mode
* (Apollon77) add option to use insecure flag in wrapper mode

### 0.4.5 (2018.08.21)
* (Apollon77) issues fixed

### 0.4.4 (2018.08.07)
* (Apollon77) corrected automatic role determination and bugs fixed

### 0.4.2 (2018.06.25)
* (Apollon77) Fix for global mode

### 0.4.1 (2018.06.21)
* (Apollon77) option to poll values from the plugins added and other optimizations

### 0.3.1 (2018.06.20)
* (kirovilya) Fixed a bug in global mode that values were not reported back to iOS devices

### 0.3.0 (2018.06.20)
* (bluefox) Support of ham plugins was added

### 0.2.6 (2018.06.19)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.5 (2018.06.18)
* (Apollon77) Catch all console logs from Homegridge and make available as debug log

### 0.2.4 (2018.06.18)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.3 (2018.06.17)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.2 (2018.06.17)
* (Bluefox) Fixes for JSON editor in Firefox and Chrome

### 0.2.0/0.2.1 (2018.06.17)
* (Apollon77) Public test version with both modes
* (Bluefox) Admin3

### 0.1.0 (2018.06.09)
* (Apollon77) Update for working mode 1

### 0.0.1 (2018.03.24)
* (kirovilya) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018 Apollon77 <ingo@fischer-ka.de>

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