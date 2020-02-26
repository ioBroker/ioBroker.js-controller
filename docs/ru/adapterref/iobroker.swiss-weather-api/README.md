---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-погода-апи
hash: qtQLhf2pWdnBLxJYR9xuhxY9Y/fXMtoTb1JL6MXTNT0=
---
![логотип](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![Количество установок (последняя)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![Состояние зависимости](https://img.shields.io/david/baerengraben/iobroker.swiss-weather-api.svg)
![Известные уязвимости](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/baerengraben/ioBroker.swiss-weather-api/master.svg)

# IoBroker.swiss-weather-api
## Адаптер swiss-weather-api для ioBroker
Соединяется с отличным API погоды SRG-SSR (https://developer.srgssr.ch/apis/srgssr-weather).
Значки погоды используются повторно с https://erikflowers.github.io/weather-icons/

API REST Weather SRG-SSR позволяет получать прогнозы погоды и отчеты из более чем 25 000 населенных пунктов по всей Швейцарии.

** Имейте в виду, что этот адаптер поддерживает только места в Швейцарии. **

### Начиная
1. Получить бесплатную учетную запись на https://developer.srgssr.ch/
1. Перейдите в «Мои приложения» и создайте новое приложение. Это создаст определенный ConsumerKey и ConsumerSecret
1. Узнайте долготу / широту (десятичные градусы) выбранного местоположения, для которого нужен прогноз
1. Установите этот адаптер на ioBroker => Это может занять несколько минут (~ 7 минут на Raspberry Pi 3)
1. В настройках адаптера заполните
   1. ConsumerKey из приложения
   1. ConsumerSecret of App
   1. Долгота / Широта выбранного швейцарского местоположения, для которого нужен прогноз. => Пожалуйста, используйте десятичные градусы (например, Цюрих: 47.36667 / 8.5)

Это запланированный адаптер. Он запланирован каждые 30 минут и читает прогноз API SRG-SSR. Вы можете изменить этот интервал в экземпляре-представлении (Расписание). Нижний интервал не рекомендуется, поскольку минимальный прогноз составляет 1 час.
** Поэтому имейте в виду, что после установки потребуется 30 минут, пока данные прогноза не будут доставлены в первый раз, а объекты данных в представлении данных будут созданы. **

При первой установке вы можете проверить, все ли работает нормально, и не хотите ждать 30 минут. В этом случае вы можете изменить планировщик на 1 мин. => Если все работает правильно, **, пожалуйста, измените его обратно на 30 минут **.

## Changelog

### 0.1.8
* (baerengraben) Added Icons provided by SRGSSR => Thank you!! :)
* (baerengraben) Added new Object icon-url-srgssr => Contains the url-link to the srgssr Icon


### 0.1.7
**Attention**: If you have already installed a previous Version of swiss-weather-api (<= 0.1.6) please remove the adapter and install it completely new. This makes shure you get the new Unit-Names for "fff" and "ffx3" which where corrected by SRG. 
* (baerengraben) Added Icon-Codes -17 to -30 => These are not yet confirmed by srf - but I beleave these are correct.  
* (baerengraben) SRG is now providing the correct unit-names for "fff" and "ffx3". Adaptet this in the swiss-weather-adapter. **Attention**: You have to reinstall the swiss-weather-api (remove and install new Version) to make shure the Object-Name gets this Update.

### 0.1.6
* (baerengraben) Some fixes based on Feedback of forum.iobroker.net

### 0.1.5
* (baerengraben) Some fixes based on Feedback of forum.iobroker.net

### 0.1.4
* (baerengraben) Added Travis CI testing

### 0.1.3
* (baerengraben) Role-Definitions updated and added attribute 'icon-name'.

### 0.1.2
* (baerengraben) Some fixes.

### 0.1.0
* (baerengraben) Running version. Reads the complete weather forecast from https://api.srgssr.ch

### 0.0.2
* (baerengraben) first running version. Reads Current Forecast (https://api.srgssr.ch/forecasts/v1.0/weather/current)

### 0.0.1
* (baerengraben) initial release

## License
MIT License

Copyright (c) 2020 baerengraben <baerengraben@intelli.ch>

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