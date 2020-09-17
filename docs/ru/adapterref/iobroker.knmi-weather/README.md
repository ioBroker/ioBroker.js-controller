---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.knmi-weather/README.md
title: ioBroker.knmi-погода
hash: xQoVApNkHMFgEPOLLmDRliIMEH9gUkuXr61thF7VPAg=
---
![Логотип](../../../en/adapterref/iobroker.knmi-weather/admin/knmi-weather.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)
![Количество установок (последнее)](http://iobroker.live/badges/knmi-weather-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/knmi-weather-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/ioBroker.knmi-weather.svg)
![NPM](https://nodei.co/npm/ioBroker.knmi-weather.png?downloads=true)

# IoBroker.knmi-weather
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

## KNMI-Погодные данные и сигналы тревоги для ioBroker
KNMI предоставляет API, данные которого обновляются каждые 10 минут на основе всех данных датчиков, собираемых институтом.
Этот адаптер позволяет читать этот API (требуется регистрация!) И сохранять все соответствующие значения в удобных для пользователя состояниях для дальнейшей обработки в уведомлениях (пример: Telegram / Pushover) или визуализации.

API можно использовать бесплатно до 300 раз в день, поэтому адаптер планируется каждые 5 минут.

Доступны следующие данные:

* Погодная сигнализация
* Текущие климатические условия
* Прогноз сегодня, завтра, послезавтра
* Карты текущего Rain-Radar предоставлены «[Buienradar] (https://www.buienradar.nl)»

Данные о местоположении связаны с координатами GPS, хранящимися в конфигурации администратора.

Для получения дополнительной информации посетите: http://weerlive.nl/index.php Получите бесплатный ключ API здесь: http://weerlive.nl/delen.php

## Поддержите меня
Если вам нравится моя работа, пожалуйста, сделайте личное пожертвование (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.knmi-weather/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 1.0.0 (2020-09-15)
* (DutchmanNL) Final version release
* (DutchmanNL) Bugfixes

### 0.2.1
* (DutchmanNL) Updated dependency's
* (DutchmanNL) Release to stable repository
* (DutchmanNL) Bugfix : Solve incorrect Latitude/Longtitude configuration

### 0.2.0
* (DutchmanNL) improve propper adapter termination instead of guessing by timer
* (DutchmanNL) Release to stable repository

### 0.1.1
* (DutchmanNL) implement states for RainRadar

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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