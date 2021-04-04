---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecovacs-deebot/README.md
title: Адаптер Ecovacs Deebot для ioBroker
hash: qGBFk0sikuR2Igv7BtHEhdAvWdw4uA6V9wigza4kd+M=
---
![Логотип](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![Стабильная версия](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![Последняя версия](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Количество установок](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![Количество загрузок](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![npm](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)
![Статус зависимости](https://img.shields.io/david/mrbungle64/iobroker.ecovacs-deebot.svg)
![Трэвис-Си](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

# Ecovacs Адаптер Deebot для ioBroker
Этот адаптер использует библиотеку [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Функции
Некоторые примечательные особенности:

* Получить информацию (например, аккумулятор, журнал очистки, расходные материалы, состояние очистки и зарядки)
* Отправлять чистые команды (например, авто, точечная область, настраиваемая область)
* Отправить некоторые другие команды (например, воспроизвести звук, сбросить расходные материалы, переместить)
* Сохранение и повторный запуск пользовательских областей
* Регулировка мощности вакуума (чистая скорость) и уровня воды
* Получить информацию о картах, вкл. точечные области и виртуальные границы
* Получение информации во время уборки (например, текущее положение, карта и область)
* Удалить, сохранить и воссоздать виртуальные границы *)

*) Экспериментальный

Обратите внимание: некоторые функции доступны только для некоторых моделей.

## Модели
### Поддерживаемые модели
* Deebot 900/901
* Deebot OZMO 930
* Deebot OZMO 920/950

Перечисленные модели - это те, которые я использую сам или которые технически идентичны им.

### Эти модели должны работать исправно или хотя бы частично
* Deebot Slim 2
* Deebot N79 серии
* Deebot M88
* Deebot 600/601/605
* Deebot 710/711/711s
* Deebot OZMO 610
* Deebot OZMO 900/905
* Deebot OZMO T5
* Deebot OZMO T8 серии
* Deebot OZMO Slim 10
* Deebot N3 MAX
* Deebot N7
* Серия Deebot N8
* Серия Deebot U2

Перечисленные модели либо уже работают, либо технически аналогичны этим моделям.
Тем не менее, функциональность может быть частично ограничена.

Я стараюсь достичь широкого диапазона функциональных возможностей, но решаю этот вопрос индивидуально, в зависимости от сложности и различных других критериев.
Претензий на полную функциональность конечно же нет.

## Установка
Рекомендуется использовать Node.js. версии 10.x, 12.x или 14.x. Минимальная необходимая версия - 10.x

Этот адаптер использует библиотеку [узел-холст](https://www.npmjs.com/package/canvas) для некоторых функций, связанных с картой, которые могут потребовать установки некоторых дополнительных пакетов.
Это необязательно и не обязательно для моделей без функции карты, но для полного функционального диапазона установите следующие пакеты.

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

## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
* Часто задаваемые вопросы можно найти [здесь] (https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Известные проблемы
* Для некоторых моделей (например, Deebot OZMO 930) рекомендуется [запланировать перезапуск] (https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content) один раз в день. потому что есть некоторые сообщения о том, что соединение теряется через прибл. 24 часа
* Некоторые функции очистки могут не работать с Deebot 710/711 / 711s. Пожалуйста, используйте пока версию 0.5.8.
* Функция "edge" не работает с Deebot U2 (вместо этого запускает автоматическую очистку)

## Заявление об ограничении ответственности
Я никоим образом не связан с ECOVACS.

## Changelog

### 1.1.2 (alpha)
* Using library version 0.6.0-beta.0
* Added experimental functions for deleting, saving and to recreate saved virtual boundaries (920,950,T8)
* Added option to control clean speed and water level separately for each spot area
* Quite a lot of improvements for processing map data, spot areas and virtual boundaries
* Move some states from "info" channel to sub channels "info.library" and "info.network"
* Added some cleaning log values
* Some improvements and fixes

### 1.1.1
* Using library version 0.6.0-alpha.3
  * Updated login process
  * Support for Chinese server login
* Initial support for some models (e.g. N3, N7 and N8 series)

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

Copyright (c) 2021 Sascha Hölzel <mrb1232@posteo.de>

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