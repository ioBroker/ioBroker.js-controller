---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.luftdaten/README.md
title: ioBroker.luftdaten
hash: yrlW/s/AMQlrCeBMb3JnJ7ZrPlqqBg9DiPer7gCvelg=
---
![логотип](../../../en/adapterref/iobroker.luftdaten/admin/luftdaten.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.luftdaten.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.luftdaten.svg)
![стабильный](http://iobroker.live/badges/luftdaten-stable.svg)
![установлен](http://iobroker.live/badges/luftdaten-installed.svg)
![Статус зависимости](https://img.shields.io/david/klein0r/iobroker.luftdaten.svg)
![Известные уязвимости](https://snyk.io/test/github/klein0r/ioBroker.luftdaten/badge.svg)
![Статус сборки](http://img.shields.io/travis/klein0r/ioBroker.luftdaten.svg)
![NPM](https://nodei.co/npm/iobroker.luftdaten.png?downloads=true)

# IoBroker.luftdaten
Этот адаптер добавляет данные датчика «luftdaten.info» в вашу установку ioBroker.
Вы можете решить, хотите ли вы добавить локальный датчик по ip или просто использовать API lufdaten.info для получения данных другого датчика.

## Конфигурация
### Местный
1. Создайте свой собственный адаптер и добавьте его в свою локальную сеть Wi-Fi.
2. Создайте новый экземпляр адаптера
3. Выберите «Local» в качестве типа
4. Введите IP или имя хоста датчика во второй вход
5. Выберите имя и сохраните настройки

Подождите несколько минут, пока cronjob соберет данные в первый раз.

*Не стесняйтесь изменять настройки расписания на вкладке экземпляров (по умолчанию каждые 5 минут).*

### Удаленный
1. Выберите один из датчиков на онлайн-карте: [deutschland.maps.luftdaten.info] (https://deutschland.maps.luftdaten.info/)
2. Нажмите на датчик и скопируйте идентификатор (#XXXXX)
3. Создайте новый экземпляр адаптера
4. Выберите «Remote» в качестве типа
5. Заполните идентификатор датчика во втором входе
6. Выберите имя и сохраните настройки

Подождите несколько минут, пока cronjob соберет данные в первый раз.

*Не стесняйтесь изменять настройки расписания на вкладке экземпляров (по умолчанию каждые 5 минут).*

## Участники
- klein0r
- пикс
- GermanBluefox
- Apollon77

## Changelog

### 0.0.9

* (klein0r) improved logging

### 0.0.8

* (klein0r) added response time and units

### 0.0.7

* (klein0r) merged pull requests - thanks a lot for contribution

### 0.0.6

* (klein0r) changed type to weather

### 0.0.5

* (klein0r) fixed issues when sensor is not available
* (klein0r) added location information for remote sensors

### 0.0.4

* (pix) path is IP if sensor is local

### 0.0.3

* (pix) path and sensor name added

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2019 Matthias Kleine <info@haus-automatisierung.com>

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