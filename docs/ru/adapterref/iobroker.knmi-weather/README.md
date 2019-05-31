---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.knmi-weather/README.md
title: ioBroker.knmi-погода
hash: 71u/KS+jOB1jSbeq3AOMIt90NYMxyjUUUtsgMhayB/w=
---
![логотип](../../../en/adapterref/iobroker.knmi-weather/admin/knmi-weather.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.knmi-weather.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.knmi-weather/badge.svg)
![NPM](https://nodei.co/npm/iobroker.knmi-weather.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.knmi-weather/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.knmi-weather?branch=master&svg=true)

# IoBroker.knmi-weather
## KNMI-Данные о погоде и сигналы тревоги для ioBroker
KNMI предоставляет API, данные которого обновляются каждые 10 минут на основе всех данных датчика, которые собирает институт.
Этот адаптер позволяет читать этот API (требуется регистрация!) И сохранять все соответствующие значения в удобных для пользователя состояниях для дальнейшей обработки в уведомлениях (пример: Telegram / Pushover) или визуализации.

API можно использовать бесплатно до 300 посещений в день, поэтому адаптер планируется каждые 5 минут.

Доступны следующие данные:

* Текущие условия климат
* Прогноз сегодня, завтра, послезавтра
* Погодные будильники

Данные о местоположении основаны на координатах GPS, сохраненных в конфигурации администратора.

Для получения дополнительной информации, пожалуйста, посетите: http://weerlive.nl/index.php Получите бесплатный API-ключ здесь: http://weerlive.nl/delen.php

## Changelog

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2019 DutchmanNL

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