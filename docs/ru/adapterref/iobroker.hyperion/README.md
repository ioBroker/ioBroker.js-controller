---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hyperion/README.md
title: Гиперион ioBroker Адаптер
hash: otzy2Apclo4DDG4ko8PTVQCeC181e36uAw+CsDU/X5c=
---
![логотип](../../../en/adapterref/iobroker.hyperion/admin/hyperion.png)

![Количество установок](http://iobroker.live/badges/hyperion-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hyperion.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hyperion.svg)
![NPM](https://nodei.co/npm/iobroker.hyperion.png?downloads=true)

# IoBroker Hyperion Adapter ==============
Управление и настройка Hyperion Lights.

## Установка и настройка
1-й.) Установите Hyperion и настройте его. Проверьте, все ли работает правильно. <br> 2-й.) Установите этот адаптер на iobroker и настройте ip и порт интерфейса hyperion json. <br>

## Changelog

### 0.0.15 (2018-27-03)
Changed Logging behaviour for clear and clear all, since node hyperion client is throwing err for clear all on some systems,
even if everything is working as expected. 


### 0.0.14 (2018-26-03)
Bugfix (State = NULL fix)


### 0.0.13 (2018-05-03)
Bugfix (wrong Datatype for Argument prio)


### 0.0.12 (2018-08-02)
Admin Side Layout adjustment / added default value for priority

### 0.0.11 (2018-08-02)
Added Priority / Updated admin Side / Updated Logo

### 0.0.10 (2018-17-01)
Again massive clean up. Cleared some warnings regarding missing attributes, implemented error handling, 
added connection monitoring... 


### 0.0.9 (2018-13-01)
Massive clean up, and stuff. 


### 0.0.1 (2017-18-12)
Still Pre Release<br>
<br>
Fixed Bugs:<br>
1.) Ignoring Adapter configuration Bug -> Fixed<br>
2.) Missing Icon -> Fixed<br>
3.) Effect Parametrisation -> Implemented<br>
4.) Switch to Color Bug -> Fixed<br>

Todo 4 0.0.2 -> Implement Clear and Clear all


### 0.0.0 (2017-30-11)
Pre Release
Known Bugs and Issues:
This is a very early release, and it's not yet finished.
Please don't use it. It's not ready.

## License

The MIT License (MIT)

Copyright (c) 2018 ruhigundrelaxed

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