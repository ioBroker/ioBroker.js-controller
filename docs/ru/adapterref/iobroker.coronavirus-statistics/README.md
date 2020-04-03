---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-статистика
hash: Sbloxfv/wHn7WacXUIZ5lIjT/1caCqz4t4TsaU7228c=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![Количество установок (последняя)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.coronavirus-statistics.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.coronavirus-statistics/badge.svg)
![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.coronavirus-statistics/master.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50">

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
| casePerOneMillion | Количество полностью известных случаев на миллион жителей |
| критический | Сумма критической ситуации (Госпитализирована) |
| смерти | Количество зарегистрированных зарегистрированных смертей |
| deathsPerOneMillion | Количество зарегистрированных зарегистрированных смертей на миллион жителей |
| флаг | Флаг страны, ссылка на местоположение GitHub |
| выздоровел | Количество полностью известных восстановленных случаев |
| TodayCases | Новые случаи на сегодня |
| сегодня смерти | Количество полностью известных людей умерло сегодня |

Помните, что этот адаптер использует как можно больше актуальной информации, но в зависимости от отчета страны может быть задержка на несколько часов.
Федеральные земли Германии: https://npgeo-corona-npgeo-de.hub.arcgis.com/ s Общий источник: https://coronavirus-19-api.herokuapp.com

## Расширенные настройки
| Вариант | Описание |
|--|--|
| Все страны | Получить данные для всех стран мира (по умолчанию: false) |
| Континенты | Группировать общие суммы по континентам в отдельном состоянии (по умолчанию: false) |
| Удалить неиспользуемые состояния | Удалить данные, когда страны не выбраны (по умолчанию: false) |

## Только для Германии
| Вариант | Описание |
|--|--|
| Федеральные штаты | Получить данные федеральных земель по Германии (только выбрано, по умолчанию false) |
| уезды | Получить данные для округов Германии (только выбрано, по умолчанию false) |
| Города | Получить данные для городов Германии (только выбрано, по умолчанию false) |
| Все федеральные земли | Все федеральные земли Германии (по умолчанию false) |
| Все города | Все города Германии (по умолчанию false) |
| Все округа | Все округа Германии (по умолчанию false) |

Можно получить данные по федеральным округам (Bundesländer), городам (Städte) и округам (Landeskreise).
Вы можете выбрать получение всех данных или просто выбрать определенные регионы в дополнительных настройках.

## Добавить недостающие страны
Может случиться, что страны не распознаются правильно, потому что API предоставляет названия некоторых стран, не соответствующих ISO. В таком случае вы получите предупреждение в журнале, которое выглядит следующим образом

```
coronavirus-statistics.0	2020-03-21 09:05:31.328	warn	(22937) Timor-Leste not found in lib! Must be added to the country name translator.
```

Используя точку данных `coronavirus-statistics.0.countryTranslator`, вы можете назначить страну самостоятельно. Ищите название соответствующей страны здесь:

[Список с названиями стран](https://github.com/i-rocky/country-list-js/blob/master/data/names.json)

Выбрав название страны, вы должны создать строку JSON и ввести ее в точку данных `coronavirus-statistics.0.countryTranslator`.
Строка JSON выглядит следующим образом, например:

```
{
	"Cabo_Verde": "Cape Verde",
	"Timor-Leste": "East Timor"
}
```

В качестве первого значения имя из предупреждающего сообщения должно быть взято из журнала. Название страны из [Список с названиями стран](https://github.com/i-rocky/country-list-js/blob/master/data/names.json) затем присваивается этому.

## Changelog

### 0.5.1 (2020-03-31) BugFix : State attribute definition missing for + affectedCountries
* (DutchmanNL) BugFix : State attribute definition missing for + affectedCountries
* (DutchmanNL) BugFix : Ensure name changes are propagated

### 0.5.0 (2020-03-31) For Germany : federal states, counties and cities added
* (DutchmanNL) Update production release from 0.4.0 to 0.5.0
* (DutchmanNL) BugFix : Do not write objects unneeded

### 0.4.9 Fixed issues in country names, added counties and cities for germany
* (DutchmanNL  & AlCalzone) Code optimations 
* (DutchmanNL) Cities for germany added
* (DutchmanNL) counties for germany added
* (DutchmanNL) Hiding tables if "all" is selected
* (DutchmanNL) Hiding unused tables in advanced settings
* (Kampfratte) BugFix : Country top 5
* (GermanBluefox) BugFix : hidden numbers
* (DutchmanNL) BugFix : Several translations
* (DutchmanNL) BugFix : Issues with integration testing
* (Scrounger)  Bugfix : Country names by ISO format (could result in new datapoints !)
* (DutchmanNL) BugFix : Deletion of unselected federal states and counties (Germany)
* (DutchmanNL) BugFix : Button only respond when clicking on lable (not all browser)
* (DutchmanNL) BugFix : Ensure incorrect created states for "countryInfo" are removed

### 0.4.5 Countries for Germany added
* (DutchmanNL) Countries for Germany added
* (DutchmanNL) added selection for federal states and country's
* (DutchmanNL) BugFix : State attribute definition missing for + deathsPerOneMillion

### 0.4.2 Federal States for Germany implemented
* (DutchmanNL) Configuration redesigned, moved options to "Advanced Settings" tab
* (DutchmanNL) Federal States for Germany implemented, thanks to : https://npgeo-corona-npgeo-de.hub.arcgis.com/ 

### 0.4.0 Data-points added for Top 5 of countries with most cases
* (KLVN) BugFix : German (and some other) translations corrected
* (DutchmanNL) Add gulp i18n translation structure


### 0.3.5 Data-points added for Top 5 of countries with most cases
* (DutchmanNL) Data-points added for Top 5 of countries with most cases
* (DutchmanNL) BugFix : Flag datapoints are not deleted

### 0.3.4 Add button to read "All Countrys"
* (DutchmanNL) Add button to read "All Countrys"
* (DutchmanNL) Add state for link to flag for each country on github
* (DutchmanNL) BugFix : State attribute definition missing for + countryInfo
* (DutchmanNL) BugFix : Turks_and_Caicos not found in lib! Must be added to the country name translator.

### 0.3.3 Improved configuration page
* (DutchmanNL) Improved configuration page
* (DutchmanNL) Make country list in configuration variable	
* (DutchmanNL) Implement choice if non-selected countrys should be deleted from states (if already there, default No!) 

### 0.3.1
* (DutchmanNL) Enable configuration

### 0.3.0 (2020-03-22)
* (GermanBluefox) The number of data points was reduced by selection of countries
 
### 0.2.5 
* (Scrounger) Bugfix : Cabo_Verde not found in lib! Must be added to the country name translator

### 0.2.4
* (Scrounger) Grouping by continents implemented

### 0.2.3
* (DutchmanNL) Error message for new attribute solved

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