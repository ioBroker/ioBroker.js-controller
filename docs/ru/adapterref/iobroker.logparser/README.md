---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.logparser/README.md
title: ioBroker.logparser
hash: UDbaxTCx3RNk4uktiXSjd8owbrtbDOwomIhgTgM67nA=
---
![логотип](../../../en/adapterref/iobroker.logparser/admin/logparser.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.logparser.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.logparser.svg)
![Количество установок (последняя)](http://iobroker.live/badges/logparser-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/logparser-stable.svg)
![Статус зависимости](https://img.shields.io/david/Mic-M/iobroker.logparser.svg)
![Известные уязвимости](https://snyk.io/test/github/Mic-M/ioBroker.logparser/badge.svg)
![NPM](https://nodei.co/npm/iobroker.logparser.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Mic-M/ioBroker.logparser/master.svg)

# IoBroker.logparser
## Log Parser для всех адаптеров ioBroker
Этот адаптер анализирует (фильтрует) все журналы адаптеров ioBroker и предоставляет результаты в виде JSON в состояниях для каждого фильтра, как настроено в настройках.
Результирующий JSON может затем использоваться в VIS для визуализации. Также предоставляются состояния для очистки (очистки) старых журналов (например, `logparser.0.filters.Homematic.emptyJson` или `logparser.0.emptyAllJson` для очистки всех).

![состояния](../../../en/adapterref/iobroker.logparser/docs/en/img/states.png)

## Инструкции
* **[Инструкции на английском языке] (docs / en / logparser.md)**

* **[Deutsche Anleitung] (docs / de / logparser.md)**

## Пример визуализации (анимированный GIF)
![Vis](../../../en/adapterref/iobroker.logparser/docs/de/img/visintro.gif)

## Changelog

### 0.4.11
* (Mic-M) Adapter is now in latest repository.
* (Mic-M) Removed unused adapter features 'extra tab' and 'custom state options'
* (Mic-M) Removed unused subscription to object changes

### 0.4.10
* (Mic-M) Fixed reference to 'visualization.table' for adapter instances other than instance 0.
* (Mic-M) Cleanup code.

### 0.4.9
* (Mic-M) Add option to remove script.js.Script_Name, update documentation

### 0.4.8
* (Mic-M) Fixed npm issue

### 0.4.7
* (Mic-M) Fixed translations, disabled 'supportCustoms', improved admin settings

### 0.4.6
* (Mic-M) Added error handling for invalid regex provided by user
* (Mic-M) A few other fixes/improvements under the hood

### 0.4.5
* (Mic-M) Fixed issue with merge option and other filter settings by now cloning input logObject prior to handling
* (Mic-M) Allow wildcard * for 'Whitelist AND' and 'Whitelist OR' to indicate matching all

### 0.4.4
* (Mic-M) Translations added, adapter instructions added, optimized admin interface

### 0.4.3
* (Mic-M) Fix multiple regex/string config values separated by comma

### 0.4.2
* (Mic-M) Fix issue #12 ('state is missing the required property val')
* (Mic-M) Fix issue with visualization.tableX.json and .selection. See https://forum.iobroker.net/post/408513

### 0.4.1
* (Mic-M) Fix 'Yesterday' for date, 2. Fix multiple filters, 3. Add description to settings page

### 0.4.0
* (Mic-M) Add new option "maxLength" to limit the length of each log message

### 0.3.0
* (Mic-M) initial public release

## License
MIT License

Copyright (c) 2020 Mic-M

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