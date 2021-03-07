---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ham/README.md
title: Менеджер по аксессуарам ioBroker Homebridge
hash: LqJkGBTKLwpEowhRXJMqL8JiCgbQgeamsXQKiRqqzsI=
---
![Логотип](../../../en/adapterref/iobroker.ham/admin/ham.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ham.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ham.svg)
![Количество установок (последнее)](https://iobroker.live/badges/ham-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/ham-stable.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.ham.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/ioBroker/ioBroker.ham.svg)
![НПМ](https://nodei.co/npm/iobroker.ham.png?downloads=true)

# IoBroker Менеджер по аксессуарам Homebridge
** Тесты: ** ![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.ham/workflows/Test%20and%20Release/badge.svg)

Используйте плагины Homebridge в ioBroker или запустите глобально установленный Homebridge в качестве адаптера ioBroker.
Все состояния из Homebridge также будут доступны в ioBroker и там также можно будет управлять.

## Описание
Этот адаптер обеспечивает три различных режима:

### Режим по умолчанию (обертка)
В режиме по умолчанию адаптер позволяет напрямую использовать модули плагинов homebridge.
Вы можете изучить все доступные плагины на сайте NPM в [поиск по ключевому слову `homebridge-plugin`](https://www.npmjs.com/search?q=homebridge-plugin).

Вы просто добавляете список модулей в конфигурацию адаптера и предоставляете конфигурацию в JSON-редакторе (см. Описания плагинов).
После этого все объекты Homebridge также будут созданы в ioBroker, и все объекты, доступные для записи, также можно будет изменить.

** ВАЖНО: этот режим позволяет использовать интеграции с устройствами предоставленных плагинов Homebridge. Не предусмотрено никакого «моста», который можно использовать в приложении Home! **

Ссылку на успешно опробованные плагины с примерами можно найти здесь: https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### Local-Homebridge-Mode
Если вы хотите, чтобы опубликованный мост использовался домашним приложением, а также вы хотите взаимодействовать с ним из ioBroker и получать данные, но у вас еще нет установленного домашнего моста, используйте этот режим.

В локальном режиме устанавливается текущая совместимая версия homebridge и запускается от имени пользователя ioBroker. Вы предоставляете полную конфигурацию домашнего моста с помощью ioBroker.
Установка модулей Homebridge также выполняется через ioBroker.

** ВАЖНО: при использовании дочерних мостов (новая функция домашнего моста с версии 1.3.x) адаптер НЕ МОЖЕТ получить доступ к данным, предоставляемым этими дочерними мостами! Доступен только главный мост! **

### Global-Homebridge-Mode
Если вы уже используете Homebridge (Apple OpenSource SmartHome) в качестве глобальной установки на хосте, на котором также работает ioBroker, вы можете использовать эту существующую установку Homebridge и запустить эту установку Homebridge как процесс ioBroker. В этом случае сервер Homebridge запускается ioBroker.
Кроме того, все состояния из Homebridge доступны как состояния в ioBroker и могут управляться из ioBroker.

Чтобы это работало, вам необходимо указать расположение глобальной папки системных узлов-модулей. Для этого вызовите **npm root -g** Кроме того, вам необходимо указать путь к каталогу конфигурации homebridge (обычно .homebridge в папке "users").

** ВАЖНО: ioBroker работает как пользователь «iobroker», но homebridge обычно как пользователь root или homebridge (в зависимости от того, как вы его установили). Вам необходимо убедиться, что папка homebride "persistance" доступна для пользователя ioBroker, иначе вы увидите ошибки о том, что файл не может быть сохранен (что может привести к сбою адаптера!) **

** ВАЖНО: при использовании дочерних мостов (новая функция домашнего моста с версии 1.3.x) адаптер НЕ МОЖЕТ получить доступ к данным, предоставляемым этими дочерними мостами! Доступен только главный мост! **

## Следующие плагины были протестированы в режиме по умолчанию
* homebridge-Chamberlain v1.0.1 - плагин для открывателей гаражных ворот Chamberlain с MyQ
* homebridge-doorbird v0.0.4 - Плагин для Doorbird
* homebridge-dyson-link v2.2.2 - устройства Dyson Link
* homebridge-edomoticz v2.1.11 - Полноценный современный плагин для Domoticz
* homebridge-Fibaro-HC2 v2.1.5 - интеграция с Fibaro HomeCenter
* homebridge-homee v0.2.4 - Полноценный современный плагин для Homee
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite через модули USB MTRF-64 или МТRF-64
* homebridge-platform-wemo v1.0.1 - плагин Belkin WeMo Platform
* homebridge-seasons v1.0.1 - плагин для отображения текущего времени года.
* homebridge-vera v0.8.2 - VeraLink - приложение для аксессуаров Z-Wave от Vera (Node.js 8.11.3)

... и многое другое

## СДЕЛАТЬ
* Тесты
* Больше документации ?!

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) update homebridge and wrapper to 1.3.2 (latest as of today). IMPORTANT: Requires also homebridge 1.3.x installed when using global mode and local mode will update to 1.3.x too! Check your plugins for updates!
* (Apollon77) IMPORTANT: Configurations in local/global mode with child bridges will NOT work because ioBroker can not access the data on the child bridge processes!

### 3.0.2 (2020-11-29)
* (Apollon77) update homebridge in wrapper to 1.1.6 (latest as of today)

### 3.0.1 (2020-08-08)
* (Apollon77) set a very high limit (again) on allowed accessories and services because irrelevant 

### 3.0.0 (2020-08-04)
* (Apollon77) BREAKING: ONLY WORKS WITH HOMEBRIDGE 1.1.x+ AND Node JS >=10.17.0!! Make sure plugins support it AND homebridge is updated to 1.1.x when you use the Global Mode!

### 1.1.2 (2019-07-08)
* (Apollon77) Allow more then 149 accessories in wrapper mode

### 1.1.1 (2019-07-05)
* (Apollon77) Add option to update NPM modules in Admin. Reinstall will happen after saving settings
* (Apollon77) Enhance NPM installation handling
* (Apollon77) Allow to specify special version of homebridge NPM packages using name@version
* (Apollon77) Allow to specify homebridge command line options. They will be added to the command line arguments (Some plugins need that or special features are only available with it)
* (Apollon77) Add "Local" mode that installs an own homebridge and run it as bridge

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

Copyright (c) 2018-2020 Apollon77 <ingo@fischer-ka.de>

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