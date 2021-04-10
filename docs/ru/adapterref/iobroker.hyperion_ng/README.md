---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hyperion_ng/README.md
title: ioBroker.hyperion_ng
hash: yxrOejxWKCewRasC784zpVjNET7vUTpRyyQxMO8bB5U=
---
![Логотип](../../../en/adapterref/iobroker.hyperion_ng/admin/hyperion_ng.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.hyperion_ng.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hyperion_ng.svg)
![Количество установок (последнее)](http://iobroker.live/badges/hyperion_ng-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/hyperion_ng-stable.svg)
![Статус зависимости](https://img.shields.io/david/felixganzer/ioBroker.hyperion_ng.svg)
![Известные уязвимости](https://snyk.io/test/github/felixganzer/ioBroker.hyperion_ng/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.hyperion_ng.png?downloads=true)

# IoBroker.hyperion_ng
** Тесты: ** ![Тестирование и выпуск](https://github.com/felixganzer/ioBroker.hyperion_ng/workflows/Test%20and%20Release/badge.svg)

## Адаптер hyperion_ng для ioBroker
С помощью этого адаптера вы можете управлять своими устройствами HyperionNG

https://hyperion-project.org/

## Руководство по эксплуатации
### Общий
Адаптер создаст для каждого экземпляра оборудования Hyperion папку с номером экземпляра. Внутри этой папки актуальные настройки, все компоненты и все активные приоритеты.

Кроме того, будет создана общая папка, которая включает в себя элементы управления, для отправки команд в гиперион, все возможные эффекты и системную информацию о гиперионе.

### Управлять компонентами и деактивировать экземпляр Hyperion
Вы можете управлять компонентами внутри папки instance.components, чтобы установить логическое значение. После установки параметра будут обновлены все параметры компонентов контролируемого экземпляра и всех последующих экземпляров.

Кроме того, вы можете установить параметр instance.running для активации и деактивации всего экземпляра.

### Настройки управления
вы можете управлять настройками внутри папки instance.components для установки параметра. После установки параметра все настройки контролируемого экземпляра и всех последующих экземпляров будут обновлены.

### Установить эффекты
Чтобы установить эффект, вы должны установить номер экземпляра в general.control.instance. После этого вы можете ввести правильное имя существующего эффекта в general.control.setEffect. После установки эффекта приоритеты используемого экземпляра и каждого последующего экземпляра будут обновлены.

В general.control.durationEffectColor вы можете установить продолжительность в секундах. Вы должны установить эти значения перед установкой эффекта. Стандартное значение 0. Это установит время эффекта на бесконечность.

### Установить цвета
Чтобы установить цвет, вы должны установить номер экземпляра в general.control.instance. После этого вы можете ввести значение RGB в general.control.setColorRGB. После установки цвета приоритеты используемого экземпляра и каждого последующего экземпляра будут обновлены.

В general.control.durationEffectColor вы можете установить продолжительность в секундах. Вы должны установить эти значения, прежде чем устанавливать цвет. Стандартное значение 0. Это установит время эффекта на бесконечность.

Другая возможность установить цвет - через HSL. Для них существует 3 точки данных в general.control.setColorHSL. Если одна из этих точек данных будет изменена, цвет будет обновлен.

### Установить Grabber Visible
вы можете установить внутренний или USB-захват видео в качестве видимого приоритета, если для параметра general.control.setinternalGrabberVisible или для параметраUSBGrabberVisible установлено значение true. Прежде чем вам нужно будет настроить экземпляр для управления в general.control.instance. Если вы изменили стандартные приоритеты в Hyperion, вам необходимо изменить значения на странице конфигурации адаптера, чтобы они имели те же значения.

### Четкие эффекты и цвета
Чтобы сбросить приоритет, вы должны установить номер экземпляра в general.control.instance. После этого вы можете установить для параметра general.control.clearAll или general.control.clearVisible значение true, чтобы очистить приоритеты. После успеха логическое значение будет установлено в false.

### Обновить данные из Hyperion
Вы можете вручную обновить данные всего адаптера, если установите для general.control.updateAdapter значение true. С помощью datapoint general.control.updatePriorities вы можете обновить приоритеты всех экземпляров.

## Changelog

### 0.1.19 (2021.03.29)
* (felixganzer) little bugfixing

### 0.1.18 (2021.03.06)
* (felixganzer) increase stopTimeout to 3 seconds
* (felixganzer) add communicationTimer object


### 0.1.17 (2021.02.26)
* (felixganzer) bugfixing: add error event handler for socket connection
* (felixganzer) bugfixing: change state roles of control states
* (felixganzer) bugfixing: add try and catch at set RGB color

### 0.1.16 (2021.02.07)
* (felixganzer) bugfixing: clear socket at adapter unload
* (felixganzer) bugfixing: change logo
* (felixganzer) bugfixing: fix testing for github
* (felixganzer) bugfixing: remove all the stuff inserted by an npm install

### 0.1.13 (2021.02.03)
* (felixganzer) add set Color over HSL values

### 0.1.12 (2021.02.02)
* (felixganzer) bugfix: add type-of-is to dependencies

### 0.1.11 (2021.01.30)
* (felixganzer) bugfix: reduce warning "state has no existing object" for js-controller 3.2
* (felixganzer) bugfix: read out priority of color crash at js-controller 3.2

### 0.1.10 (2021.01.10)
* (felixganzer) reorginize config page and add config parameter
* (felixganzer) add set internal or USB Grabber Visible with boolean

### 0.1.9 (2021.01.09)
* (felixganzer) bugfix: reduce warnings
* (felixganzer) add set Grabber Visible without any error catching
* (felixganzer) add start update whole adapter data points and update Priorities

### 0.1.8 (2021.01.07)
* (felixganzer) add set duration of effect and color to set
* (felixganzer) bugfix: clearVisible did not work

### 0.1.7 (2021.01.06)
* (felixganzer) bugfix: only works with iobroker adapter instance 0
* (felixganzer) updating the manual

### 0.1.6 (2021.01.03)
* (felixganzer) add setColorRGB under general.control
* (felixganzer) add controlling adjustments of hyperion
* (felixganzer) add start and stop Instance

### 0.1.5 (2021.01.02)
* (felixganzer) read out all possible effects
* (felixganzer) add setEffect under general.control
* (felixganzer) read out video Mode and LED Mapping
* (felixganzer) read out adjustments of instance

### 0.1.4 (2021.01.01)
* (felixganzer) add control clear of colors and effects

### 0.1.3 (2021.01.01)
* (felixganzer) add read out priorities to see actual running colors and effects

### 0.1.2 (2020.12.30)
* (felixganzer) add read out sysinfos to check Version of Hyperion

### 0.1.1 (2020.12.30)
* (felixganzer) add controlling components of hyperion
* (felixganzer) create first config to set IP, Port and Priority

### 0.1.0 (2020.12.29)
* (felixganzer) creating api class to communicate with hyperion and adding read out instances of hyperionNG

### 0.0.1 (2020.12.29)
* (felixganzer) initial release

## License
MIT License

Copyright (c) 2020-2021 felixganzer <felixganzer@web.de>

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