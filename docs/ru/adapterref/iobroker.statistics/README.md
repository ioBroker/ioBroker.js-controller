---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: adIa0874RzAX7ME3y5k56uOLZbThzREl8C1ROlIdnd4=
---
![логотип](../../../en/adapterref/iobroker.statistics/admin/statistics.png)

![Количество установок](http://iobroker.live/badges/statistics-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.statistics.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.statistics.svg)
![Статус сборки](https://travis-ci.org/foxthefox/ioBroker.statistics.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.statistics.png?downloads=true)

# IoBroker.statistics
## Описание
Этот адаптер облегчит настройку статистики.

`The adapter only reacts on state changes (state.ack=true), not on commands!`

выберите одну из следующих настроек:

* считать импульсы или изменения вкл / выкл (только для двоичных значений и положительного фронта)
* рассчитать стоимость из подсчитанных значений (только для двоичных значений)
* как долго был статус true / ON и как долго false / OFF (только для двоичных значений)
* дельта между зарегистрированными аналоговыми значениями (только для аналоговых значений)
* дневной максимум, минимум и среднее (не для дельта-расчетов)
* мин / макс за год
* рассчитывает в течение 5 минут и максимальный дневной, минимальный и средний значения (не для дельта-расчетов)
* суммирование сгруппированных значений

Адаптер подписывается на настроенные объекты и создает свои собственные состояния в дереве статистики.

Создано 2 отдельных дерева:

* statistics.0.save -> окончательные значения периода времени
* statistics.0.temp -> временные значения до момента передачи для сохранения, затем темп начинается снова

Структура государства: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

Немецкий документ HowTo доступен здесь: [howto_de](./doc/howto_de.md)

## Настройки
* укажите соответствующие группы на странице конфигурации экземпляра (admin => instances => config config)
* указать конфигурацию в настройках состояния (admin => объекты)

## Changelog

### 0.2.1 [2019-06-15]
* (foxthefox) correction, timecount value was milliseconds instead seconds
* (foxthefox) other calculations with 2 decimal places after comma
* (foxthefox) min/max for day/week/month/quarter/year
* (foxthefox) set of daily min/max starting point from actual value
* (foxthefox) fixing the PR with dayMin 0 at 00:00
* (foxthefox) improvement for timecount when receiving status updates and no real status change

### 0.2.0 [2019-01-08]
* (foxthefox) compact mode

### 0.1.4 [2019-01-07]
* (foxthefox) license added in io-package.json
* (foxthefox) ReadMe updated
* (foxthefox) type = misc-data

### 0.1.3 [2019-01-06]
* first npm release
* (foxthefox) german doc added
* (foxthefox) error corrections
* (foxthefox) travis testing corrections

### 0.1.2 [2018-09-08]
* (bluefox) total refactoring

### 0.0.3
* admin3 implemented
* complete rewrite to have configuration through the settings of the individual states instead in admin page

### 0.0.2
* setup running

### 0.0.1
* initial release

## License

The MIT License (MIT)

Copyright (c) 2018 - 2019 foxthefox <foxthefox@wysiwis.net>,
                   bluefox <dogafox@gmail.com>