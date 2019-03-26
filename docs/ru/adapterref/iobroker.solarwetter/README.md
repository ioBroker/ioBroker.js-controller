---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarwetter/README.md
title: ioBroker.solarwetter
hash: qUc6gzg0wBE4IZgRqKmyeSbUWQ4qCowDUgGox8K/Otc=
---
![логотип](../../../en/adapterref/iobroker.solarwetter/admin/solarwetter.png)

![Количество установок](http://iobroker.live/badges/solarwetter-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.solarwetter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarwetter.svg)
![Открытые вопросы](http://githubbadges.herokuapp.com/Pix---/ioBroker.solarwetter/issues.svg)
![NPM](https://nodei.co/npm/iobroker.solarwetter.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Pix---/ioBroker.solarwetter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.solarwetter?branch=master&svg=true)

# IoBroker.solarwetter
## Beschreibung / Описание
: de: Адаптер дизельного двигателя liefert den prognostizierten Solarstrom Tagesertrag für eine bestimmte Region. Die Daten kommen von [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).
Bei Eingabe der Leistung der eigenen Solaranlage errechnet der Adapter auch die zu erwartende Energieabgabe der Anlage.

: uk: Этот адаптер предоставляет прогноз суточного количества солнечной энергии для конкретного региона от поставщика [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).
Переведите!!!!

## Einstellungen / Конфигурация
### Пользователь / Passwort
Seit 2017 ist die Authentifizierung beim Anbieter nötig. Dazu muss kostenpflichtig beim Anbieter ein Zugang erstanden werden. Die Login-Daten können nun hier im Adapter hinterlegt werden.

С 2017 года провайдер взимает плату за свои услуги. Персональный логин можно получить на сайте solar-wetter.com. имя пользователя и пароль будут храниться здесь.

### Standort / Местоположение
Örtlichkeit durch Auswahl des Postleitzahlenbereichs bestimmen

Выберите свой регион, выбрав из списка почтовых индексов.
Введите мощность вашей солнечной электростанции, чтобы рассчитать выход энергии.

### Solaranlage / Солнечная электростанция
Hier kann die Gesamtleistung der eigenen Solaranlage zur Bechnung der vorraussichtlich erzeugten Energiemenge eingegeben werden (auch Dezimalzahlen möglich).

Введите общую мощность вашей солнечной электростанции, чтобы рассчитать ежедневный прогноз производства энергии (возможны десятичные разделители)

### 4-Tage-Prognose / 4-дневный прогноз
Wählen Sie Hier Eine Stadt. Der Adapter erzeugt einen Link zu einem Chart mit 4-Tage-Prognose (Datenpunkt solarwetter.0.forecast.chart .__ url__).

Выберите город, чтобы адаптер создал ссылку на 4-дневный прогнозный график (datapoint solarwetter.0.forecast.chart .__ url__).

![альтернативный текст](../../../en/adapterref/iobroker.solarwetter/img/solarwetterSettingScreenshot.jpg "Настройки скриншота")

## Активирунг / Расписание
Der Adapter startet einmal täglich.

Адаптер запускается один раз в день.

## Datenpunkte / Datapoints
solarwetter.0.forecast .__ clearSky__ (* значение *)

solarwetter.0.forecast .__ realSky_min __ (* значение *)

solarwetter.0.forecast .__ realSky_max__ (* значение *)

solarwetter.0.forecast .__ Datum__ (* строка, без отметки времени *)

solarwetter.0.forecast .__ Region__ (* значение *)

solarwetter.0.forecast.home .__ clearSky__ (* значение *)

solarwetter.0.forecast.home .__ realSky_min __ (* значение *)

solarwetter.0.forecast.home .__ realSky_max__ (* значение *)

solarwetter.0.forecast.home .__ Leistung__ (* значение *)

solarwetter.0.forecast.chart .__ city__ (* значение *)

solarwetter.0.forecast.chart .__ url__ (* значение *)

## Сделать
* Перевод точек данных
* Русский перевод настроек окна

## Changelog
### 1.0.0 (2017-10-15)
* (pix) End of beta, Nodejs 4 or higher required

### 0.3.0 (2017-05-28)
* (pix) Login with website password & username  

### 0.2.0 (2017-01-05)
* (pix) Travis CI testing added

### 0.1.2 (2016-06-21)
* (pix) city selection fixed

### 0.1.1 (2016-06-20)
* (pix) 4-Day-Forecast Chart

### 0.1.0 (2016-06-12)
* (pix) publish on npm

### 0.0.6 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.5 (2016-05-14)
* (pix) Settings now show correct location if already defined

### 0.0.4 (2016-05-13)
* (pix) Appearance of settings window

### 0.0.3 (2016-05-13)
* (pix) Calculates power of own solar plant

### 0.0.2 (2016-05-13)
* (pix) Post code area selectable

### 0.0.1 (2016-05-12)
* (pix) first release

## License

The MIT License (MIT)

Copyright (c) 2017 pix

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

---
*Logo is partly crafted by CHALLENGER* :+1: