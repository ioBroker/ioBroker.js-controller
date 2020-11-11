---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecovacs-deebot/README.md
title: Адаптер Ecovacs Deebot для ioBroker
hash: DkBGxHrRk4kYPdcFnwkVADB89lV/GdFdorsw6J4rtmc=
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
* Deebot 900/901
* Deebot Ozmo 930
* Deebot Ozmo 950

### Эти модели, как известно, работают
* Deebot Slim 2
* Deebot N79
* Deebot 601
* Deebot 710/711
* Deebot Ozmo 610
* Deebot Ozmo 900
* Deebot Ozmo 920
* Deebot Ozmo T8 AIVI

### Эти модели должны работать
* Deebot M88
* Deebot 600/605
* Deebot Ozmo 960
* Deebot Ozmo Slim 10
* Deebot Ozmo T8 (+)

## Установка
Рекомендуется использовать версию Node.js 10 или более новую.

Этот адаптер использует библиотеку холста, для которой может потребоваться дополнительная установка.
Для полного набора функций установите следующие пакеты.

Для систем Linux на базе Debian необходимо выполнить следующие команды:

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Перед выполнением следующей команды может потребоваться перезагрузка.

```bash
sudo npm install canvas --unsafe-perm=true
```

Для получения инструкций для других систем посетите https://www.npmjs.com/package/canvas#compiling.

## Применение
* Информацию о том, как использовать этот адаптер, можно найти [здесь] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

## Известные проблемы
* Есть сообщения, что в настоящее время Ecovacs доставляет пустые журналы очистки для Ozmo 920/950.
* Для Deebot Ozmo 930 рекомендуется [запланировать перезапуск] (https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content) один раз в день, потому что есть некоторые сообщает, что соединение потеряно через прибл. 24 часа.
* Также есть сообщения о странном поведении заряда батареи Deebot 900/901. Очень вероятно, что это ошибка прошивки.
  * Вы можете использовать соответствующую опцию в конфигурации адаптера в качестве временного решения.
* Кнопка «пауза» не работает с Deebot 710/711.

## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
* Часто задаваемые вопросы можно найти [здесь] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Отказ от ответственности
Я никоим образом не связан с ECOVACS.

## Changelog

### 1.0.5
* Bump library to 0.4.25
* Initial support for Ozmo T8 and T8+
* Implement buttons for ResetLifeSpan cmd (currently 900/901/930 only)
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

### 1.0.3
* Improved Support for Ozmo T8 AIVI

### 1.0.2
* Initial Support for Ozmo T8 AIVI

### 1.0.1
   * Compact mode support
   * New features:
     * button to save the last used custom area values
     * buttons to rerun saved custom areas
   * Some enhancements and fixes

### 1.0.0
   * Stable Release

### 0.6.5
   * Set flag for compact mode to false

### 0.6.4
   * Some minor fixes

### 0.6.3
   * Using library version 0.4.13
   * Some translations added

### 0.6.2
   * Using library version 0.4.12
   * (boriswerner) Alternative API call for last clean log info (920/950)
   * (mrbungle64) Periodically polling of CleanLogs

### 0.6.1
   * Using library version 0.4.11
   * Several enhancements and fixes

### 0.6.0
   * Using library version 0.4.10
   * Several enhancements and fixes

### 0.5.9
   * Several enhancements and fixes

### 0.5.8
   * Several enhancements and fixes

### 0.5.7
   * Using library version 0.3.8
   
### 0.5.6
   * Using library version 0.3.7

### 0.5.5
   * Using library version 0.3.6

### 0.5.4
   * Using library version 0.3.5

### 0.5.3
   * Using library version 0.3.4

### 0.5.2
   * Bugfixes (MQTT/XML)
   * Start implement NetInfo (XMPP)

### 0.5.1
   * Using version 0.3.2 of ecovacs-deebot.js module
     * (boriswerner) Added Features for Ozmo 950
     * (mrbungle64) Some improvements for non Ozmo 950
   
### 0.5.0
   * Using version 0.3.x of ecovacs-deebot.js module (ng library)

### 0.4.2
   * Improved support for MQTT devices

### 0.3.10
   * (mrbungle64) Improved support for XML based MQTT devices
   
### 0.3.9
   * (mrbungle64) Improved support for XML based MQTT devices

### 0.3.8
   * (boriswerner) Improved support for Ozmo 950
   * (mrbungle64) Implemented waterbox info (XMPP based devices)

### 0.3.7
   * (mrbungle64) Bugfix
   
### 0.3.6
   * (boriswerner) Basic clean & charge working (Ozmo 950)

### 0.3.5
   * (mrbungle64) Improved support for MQTT devices
   * (boriswerner) Improved support for Ozmo 950 device

### 0.3.4
* (mrbungle64) Feature Release
   * Implemented handling water level
   * Preparing for latest repo

### 0.3.3
* (mrbungle64) Feature release
   * Implemented lifespan values of components
   
### 0.3.2
* (mrbungle64) Feature release
   * Implemented spotArea buttons
   
### 0.3.1
* (mrbungle64) Feature release (alpha)
   * Implemented spotArea command
   * Implemented customArea command
   * Implemented playSound command
   
### 0.3.0
* (mrbungle64) alpha release

### 0.2.0
* (mrbungle64) Pre-release (alpha)

### 0.1.0
* (mrbungle64) Initial release (pre-alpha)

### 0.0.1
* (mrbungle64) Initial development release

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