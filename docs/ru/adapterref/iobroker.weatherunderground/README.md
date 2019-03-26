---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weatherunderground/README.md
title: ioBroker.weatherunderground
hash: mnc1wmBhp/yn5r8AEdq5D7oIQN+glxNL49woG/vU9/o=
---
![логотип](../../../en/adapterref/iobroker.weatherunderground/admin/wu.png)

![Количество установок](http://iobroker.live/badges/weatherunderground-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.weatherunderground.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)
![NPM](https://nodei.co/npm/iobroker.weatherunderground.png?downloads=true)

# IoBroker.weatherunderground
Адаптер ioBroker для загрузки 24-часового прогноза погоды для вашего местоположения из [Погода Подземная](http://www.wunderground.com/).
Адаптер загружает все 15-минутные (по умолчанию) ежедневные и почасовые данные прогноза.

## Заметки
Вы можете использовать этот адаптер с предоставлением официального API-ключа «Владелец PWS» или оставить API-ключ пустым, чтобы использовать ключи, извлеченные из веб-страницы WU.

## Наборы иконок
При использовании «Legacy API» доступно несколько различных наборов значков, см. Ниже. Для использования с новым API имена изображений были изменены (см. Https://docs.google.com/document/d/1dNCf6nF6cjm4oOxQxjtqNuAvG_iEe5f9MQH1xlCeV4s/edit) и теперь основаны на числах ... их можно загрузить с e.g. https://drive.google.com/drive/folders/0B6fWQWXuE09OOWtBOXJNX190TDQ и может использоваться в качестве пользовательского набора (см. ниже).

В настройках адаптера измените «Custom Icon-Base-URL» на один из доступных значков на Weatherunderground: (источник: https://www.wunderground.com/weather/api/d/docs?d=resources/icon-sets )

| Набор иконок | URL | Пример |
| ------------- | -------------------------------- | --------------------- 	|
| 1 | https://icons.wxug.com/i/c/a/ | ![альтернативный текст](https://icons.wxug.com/i/c/a/partlycloudy.gif) |
| 3 | https://icons.wxug.com/i/c/c/ | ![альтернативный текст](https://icons.wxug.com/i/c/c/partlycloudy.gif) |
| 4 | https://icons.wxug.com/i/c/d/ | ![альтернативный текст](https://icons.wxug.com/i/c/d/partlycloudy.gif) |
| 5 | https://icons.wxug.com/i/c/e/ | ![альтернативный текст](https://icons.wxug.com/i/c/e/partlycloudy.gif) |
| 6 | https://icons.wxug.com/i/c/f/ | ![альтернативный текст](https://icons.wxug.com/i/c/f/partlycloudy.gif) |
| 7 | https://icons.wxug.com/i/c/g/ | ![альтернативный текст](https://icons.wxug.com/i/c/g/partlycloudy.gif) |
| 8 | https://icons.wxug.com/i/c/h/ | ![альтернативный текст](https://icons.wxug.com/i/c/h/partlycloudy.gif) |
| 9 | https://icons.wxug.com/i/c/i/ | ![альтернативный текст](https://icons.wxug.com/i/c/i/partlycloudy.gif) |
| 10 | https://icons.wxug.com/i/c/j/ | ![альтернативный текст](https://icons.wxug.com/i/c/j/partlycloudy.gif) |
| 11 | https://icons.wxug.com/i/c/k/ | ![альтернативный текст](https://icons.wxug.com/i/c/k/partlycloudy.gif) |
| 11 | https://icons.wxug.com/i/c/k/ | ! [альтернативный текст] (https://icons.wxug.com/i/c/k/partlycloudy.gif) |

Или вы можете также использовать свои собственные "пользовательские" значки, для этого в каталоге Base-URL должны быть предоставлены следующие gif-файлы:

| Значок на День | Значок на ночь |
| -----------------------------	| ----------------------------- |
| chanceflurries.gif | nt_chanceflurries.gif |
| chancerain.gif | nt_chancerain.gif |
| chancesleet.gif | nt_chancesleet.gif |
| chancesleet.gif | nt_chancesleet.gif |
| chancesnow.gif | nt_chancesnow.gif |
| chancetstorms.gif | nt_chancetstorms.gif |
| chancetstorms.gif | nt_chancetstorms.gif |
| clear.gif | nt_clear.gif |
| cloudy.gif | nt_cloudy.gif |
| flurries.gif | nt_flurries.gif |
| fog.gif | nt_fog.gif |
| hazy.gif | nt_hazy.gif |
| mostlycloudy.gif | nt_mostlycloudy.gif |
| mostlysunny.gif | nt_mostlysunny.gif |
| partlycloudy.gif | nt_partlycloudy.gif |
| partlysunny.gif | nt_partlysunny.gif |
| sleet.gif | nt_sleet.gif |
| rain.gif | nt_rain.gif |
| sleet.gif | nt_sleet.gif |
| partlycloudy.gif | nt_partlycloudy.gif |
| sunny.gif | nt_sunny.gif |
| tstorms.gif | nt_tstorms.gif |
| cloudy.gif | nt_cloudy.gif |

## На форуме ioBroker (немецкий)
http://forum.iobroker.org/viewtopic.php?f=20&t=2042&sid=a863d19838bc49439759bef89fcad1c3

## Сделать
Есть еще проблема с кодировкой. Адреса с "äüöß" будут показаны неправильно.

## Changelog

### 3.0.8 (2019-03-23)
* (Apollon77) Add additional guidance when location is not found by WU
 
### 3.0.7 (2019-03-22)
* (Apollon77) implement to extract used "legacy" API keys out of WU website to allow restore of functionality for now
* (Apollon77) Also extract API keys for newer API version from website to be usable together with real "PWS owner keys" in future
* (Apollon77) optionally get data using the New APIs (as well as the officially available PWS-Owner APIs as also additional ones to restore functionality)
* (Apollon77) Admin 2 support removed and adapted the Admin 3 texts as needed for now

### 2.0.4 (2018-08-19)
* (René) some typos
* (bluefox) Write only numbers and not strings

### 2.0.3 (2018-07-30)
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.1.2 (2017-11-24)
* (Apollon77) Add option to specify image format for custom image urls

### 1.1.1 (2017-11-08)
* (Apollon77) Optimize API usage by getting all data with one call instead of two
* (Apollon77) Add support for multiple API-Keys

### 1.1.0 (2017-10-30)
* (Apollon77) Add option to overwrite Icon Base URL

### 1.0.8 (2017-07-12)
* (DeepCoreSystem) add 2 current observation values, fixes of some datapoint caps.

### 1.0.7 (2017-06-19)
* (Dutchman) add Dutch language suppport

### 1.0.6 (2017-05-16)
* (Rene) bug fixing
	+ all 4 sets are enabled as default
	+ change of checkbox enables saves button

### 1.0.5 (2017-05-14)
* (Rene) hourly forecast extend to 36h

### 1.0.4 (2017-04-09)
* (Rene) parse much more data
   + today's 24 h
   + next 4 days / nights as text
   + next 4 days
   + current values
   each can be enabled or disabled

### 1.0.3 (2016-11-01)
* (bluefox) Catch parse errors

### 1.0.2 (2016-10-29)
* (Apollon77) make sure precip values are always integers

### 1.0.1 (2016-07-21)
* (jens-maus) conversion from feet to meter for observation_location

### 1.0.0 (2016-07-12)
* (Apollon77) add daily rain level forecast

### 0.2.0 (2016-07-01)
* (Apollon77) Add Error handling and station-usage for forcasts

### 0.1.1 (2016-06-07)
* (ploebb) Fix forecast api URL

### 0.1.0 (2016-05-07)
* (bluefox) convert text to floats
* (bluefox) support languages

### 0.0.5
corrected humidity value within current weather info (slice + unit)

### 0.0.4
checking for spaces in location
added current conditions

### 0.0.3
bugfix in summed pop-value.

### 0.0.2
config dialog fixed

### 0.0.1
initial release with all basics to load WU-forecast data

## License

The MIT License (MIT)

Copyright (c) 2015-2019 dschaedl <daniel.schaedler@gmail.com>

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