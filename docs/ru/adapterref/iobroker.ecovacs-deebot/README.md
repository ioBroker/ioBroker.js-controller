---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecovacs-deebot/README.md
title: Адаптер Ecovacs Deebot для ioBroker
hash: T0ob73oJ4PwAa7s273V/xK0R8ip52IqyySOGm7/MLWo=
---
![Логотип](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![npm](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)
![Трэвис-Си](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

# Ecovacs Адаптер Deebot для ioBroker
Этот адаптер использует библиотеку [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Модели
### Поддерживаемые модели
* Deebot 901
* Deebot OZMO 920
* Deebot OZMO 930
* Deebot OZMO 950

### Эти модели, как известно, работают
* Deebot Slim 2
* Deebot N79 серии
* Deebot 601
* Deebot 710/711 (см. «Известные проблемы»)
* Deebot 900
* Deebot U2
* Deebot OZMO 610
* Deebot OZMO 900
* Deebot OZMO T8 серии

### Эти модели должны работать
* Deebot M88
* Deebot 600/605
* Deebot OZMO T5
* Deebot OZMO Slim 10
* Deebot U2 Pro / Мощность

## Установка
Рекомендуется использовать версию Node.js 10 или более новую.

Этот адаптер использует библиотеку холста, которая может потребовать дополнительных установок.
Для полного набора функций установите следующие пакеты.

Для систем Linux на базе Debian необходимо выполнить следующие команды:

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Для получения инструкций для других систем посетите https://www.npmjs.com/package/canvas#compiling.

## Использование
* Информацию о том, как использовать этот адаптер, можно найти [здесь] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

### Состояния
* Информацию о состояниях можно найти [здесь] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29) (на английском языке) и [здесь] (https:// github .com / mrbungle64 / ioBroker.ecovacs-deebot / wiki / Datenpunkte-% 28DE% 29) (немецкий)

## Известные вопросы
* Для Deebot Ozmo 930 рекомендуется [запланировать перезапуск] (https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content) один раз в день, потому что есть некоторые сообщает, что соединение потеряно через прибл. 24 часа
* Некоторые функции очистки могут не работать с 710/711. Пожалуйста, используйте пока версию 0.5.8.
* Функция "edge" не работает с Deebot U2 (вместо этого запускает автоматическую очистку)

## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
* Часто задаваемые вопросы можно найти [здесь] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Заявление об ограничении ответственности
Я никоим образом не связан с ECOVACS.

## Changelog

### 1.1.0
* Stable release

### 1.0.13
* Using library version 0.5.6
* Some improvements and fixes

### 1.0.12
* Using library version 0.5.5
* Added some more T8 models
* Several improvements and fixes

### 1.0.11
* Enabled some features for OZMO 900
* Several minor improvements

### 1.0.10
* Using library version 0.5.4
* Several improvements and fixes
* Added available spot area boundaries to "map" channel (read only)

### 1.0.9
* Using library version 0.5.3
* Added some experimental features (for a few models only)
* Added option for virtual boundaries and some further improvements to adapter config
* Some improvements for js-controller 3.2.x

### 1.0.8
* Using library version 0.5.2 (0.5.2-beta.1)
* Added available virtualBoundaries channel for Deebot 900/901 and Ozmo 930 (read only)
* Added "volume" and buttons for resetting consumable values for 950 type models (920/950/T8)
* Improved synchronization of spot area buttons
* Add option for setting the language for spot area names
* Added some experimental features (for a few models only)
* Several enhancements and fixes
* Bump some dependencies

### 1.0.7
* Using library version 0.5.1 (0.5.1-beta.3)
* Initial support for Deebot U2 series
* Improved support for Ozmo T8 models
* (boriswerner) Fixed cleaning log for 950 type models (920/950/T8)
* (boriswerner) Added available virtualBoundaries to "map" channel (currently read only)
* Improved handling of device classes
* Several enhancements and fixes

### 1.0.6
* Using library version 0.5.0-beta.0
* Fix for running multiple devices
* Support for additional Ozmo T8 models
* Add option to synchronize spotArea buttons
* Set state value for triggered buttons to false
* Add option to suppress "unknown" value for "map.deebotPositionCurrentSpotAreaID" state
* Further enhancements and fixes

### 1.0.5
* Bump library to 0.4.25
* Initial support for Ozmo T8 and T8+
* Implement buttons for resetting consumable values (currently Deebot 900/901 and Ozmo 930 only)
* Several enhancements and fixes

### 1.0.4
* Bump library to 0.4.21
* Remove canvas from dependencies
* Several bugfixes and improvements (especially for N79 series)
* Possibility to specify the number of reruns for a spot area
* Spot areas in the "control" channel are now created automatically
* Remove number of spot areas from adapter settings
* Some refactoring
* Bump dependencies

### 1.0.1 - 1.0.3
* Added support for Ozmo T8 AIVI
* Compact mode support
* Added a button to save the last used custom area values
* Added buttons to rerun saved custom areas
* Some enhancements and fixes

### 1.0.0
* Stable release

### 0.0.1 - 0.6.5
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive)#059)

## License

MIT License

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

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