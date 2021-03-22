---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.luftdaten/README.md
title: ioBroker.luftdaten
hash: xVdeyCQIZ18NQX8QFGf5y8NLoKX1+aLSr0BZIvU3WR0=
---
![Логотип](../../../en/adapterref/iobroker.luftdaten/admin/luftdaten.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.luftdaten.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.luftdaten.svg)
![Стабильный](http://iobroker.live/badges/luftdaten-stable.svg)
![установлены](http://iobroker.live/badges/luftdaten-installed.svg)
![Статус зависимости](https://img.shields.io/david/klein0r/iobroker.luftdaten.svg)
![Известные уязвимости](https://snyk.io/test/github/klein0r/ioBroker.luftdaten/badge.svg)
![Статус сборки](http://img.shields.io/travis/klein0r/ioBroker.luftdaten.svg)
![НПМ](https://nodei.co/npm/iobroker.luftdaten.png?downloads=true)

# IoBroker.luftdaten
Этот адаптер добавляет данные датчика luftdaten.info в вашу установку ioBroker.
Вы можете решить, хотите ли вы добавить локальный датчик по ip или просто использовать API lufdaten.info для получения данных другого датчика.

## Конфигурация
### Местный
1. Создайте собственный адаптер и добавьте его в локальную сеть Wi-Fi.
2. Создайте новый экземпляр адаптера.
3. Выберите "Местный" в качестве типа.
4. Введите IP или имя хоста датчика во второй вход.
5. Выберите имя и сохраните настройки.

Подождите несколько минут, пока cronjob соберет данные в первый раз.

*Не стесняйтесь изменять настройки расписания на вкладке экземпляров (по умолчанию каждые 15 минут).*

### Удаленный
1. Выберите один из датчиков на онлайн-карте: [deutschland.maps.luftdaten.info] (https://deutschland.maps.luftdaten.info/)
2. Щелкните датчик и скопируйте идентификатор (#XXXXX).
3. Создайте новый экземпляр адаптера.
4. Выберите «Удаленный» в качестве типа.
5. Заполните ID датчика во втором входе (без #)
6. Выберите имя и сохраните настройки.

Подождите несколько минут, пока cronjob соберет данные в первый раз.

*Не стесняйтесь изменять настройки расписания на вкладке экземпляров (по умолчанию каждые 15 минут).*

## Авторы
- klein0r
- пикс
- Немецкий
- Аполлон77
- Доминик-Лиенеманн

## Changelog

### 1.0.3

* (klein0r) Remove non-numeric characters from sensor id

### 1.0.2

* (klein0r) Fixed async object creation

### 1.0.1

* (klein0r) Added iobroker sentry

### 1.0.0

* (klein0r) First stable release

### 0.0.18

* (klein0r) Added units for pressure and noise

### 0.0.17

* (klein0r) Added link to sensor map

### 0.0.16

* (klein0r) Minor bugfixes

### 0.0.15

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.14

* (klein0r) Fixed sensor data check issue

### 0.0.13

* (klein0r) Added missing translations

### 0.0.12

* (klein0r) Minor bugfixes
* (dominik-lienemann) Added timestamp of last sensor update

### 0.0.11

* (klein0r) fixed units of states

### 0.0.10

* (klein0r) changed API url

### 0.0.9

* (klein0r) minor bugfixes

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

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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