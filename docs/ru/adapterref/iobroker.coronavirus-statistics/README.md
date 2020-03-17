---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-статистика
hash: JR33iNLvIejO8yNKVer3X/NkoXAx9CHiGkTRHTF5quE=
---
![логотип](../../../en/adapterref/iobroker.coronavirus-statistics/admin/coronavirus-statistics.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![Количество установок (последняя)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![Состояние зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.coronavirus-statistics.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.coronavirus-statistics/badge.svg)
![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.coronavirus-statistics/master.svg)

# IoBroker.coronavirus-statistics
## Адаптер живой статистики Coronavirus для ioBroker
Адаптер для отображения информации о вирусе глобальной короны и текущих отчетов

Конфигурация не требуется, после установки:

- Получать глобальную информацию по всему миру и записывать ее в «global_totals»
- Создайте папку для каждой страны со всей соответствующей информацией, касающейся COVID-19
- Обновлять информацию каждые 15 минут

Доступна следующая информация:

| Datapoint | Детали |
|--|--|
| активный | Количество текущих инфицированных людей |
| случаи | Количество полностью известных случаев |
| критический | Сумма критической ситуации (Госпитализирована) |
| смерти | Количество зарегистрированных зарегистрированных смертей |
| выздоровел | Количество полностью известных восстановленных случаев |
| TodayCases | Новые случаи на сегодня |
| сегодня смерти | Количество полностью известных людей умерло сегодня |

Помните, что этот адаптер использует как можно больше актуальной информации, но в зависимости от отчета страны может быть задержка на несколько часов.
Источник: https://coronavirus-19-api.herokuapp.com

## Changelog
### 0.2.2
* (GermanBluefox) fixed widget countries

### 0.2.1
* (DutchmanNL) Fixed error "State attribute definition missing"
* (DutchmanNL) Moved "_Laste_Update" to updated within global_totals tree
* (GermanBluefox) fix logo size

### 0.2.0 Code optimized & released
* (DutchmanNL) Stable release
* (DutchmanNL) Added retry if API does not provide correct information
* (DutchmanNL) Added last time stamp of data collection
* (AlCalzone) Code optimized

### 0.1.6 Adapter renamed
* (@DutchmanNL) Adapter renamed

### 0.1.2 Widgets added & code improvements
* (DutchmanNL) code improvements
* (GermanBluefox) add widgets

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