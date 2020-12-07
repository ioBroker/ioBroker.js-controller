---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mystrom/README.md
title: ioBroker.mystrom
hash: Y4F1YJ9C2J8XGwmWsaxy+NFPk41ruTvYoaxjM4W5V9o=
---
![Логотип](../../../en/adapterref/iobroker.mystrom/admin/mystrom.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.mystrom.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mystrom.svg)
![Количество установок (последнее)](http://iobroker.live/badges/mystrom-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/mystrom-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.mystrom.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.mystrom/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mystrom.png?downloads=true)

# IoBroker.mystrom
** Тесты: ** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.mystrom/workflows/Test%20and%20Release/badge.svg)

## Адаптер mystrom для ioBroker
myStrom Адаптер

Адаптер находится на всех датах через приложение myStrom и актуален на протяжении 30 минут. Er Liest außerdem die lokalen Daten der Geräte wenn sie online sind und über die App oder manuell eine IP vergeben wurden ist. Dazu müssen all Geräte bei Adapterstart online sein. Кнопка sind nicht immer online entweder probieren über 2x drücken und dann 8 Sekunden gedrückt halten oder Reseten über 10 Sekunden drücken bis er rot blinkt und dann einmal drücken. Nach dem Reset ist ein erneutes Verbinden через WLAN notwendig. Manuell verbinden via 3 mal drücken und dann manuell bei dem WLAN anmelden und dann erst den Weg in der App folgen. Danach ist der Button online und kann ausgelesen werden.

Es können URLs eingegeben für die jeweiligen Aktionen der Buttons und Bewegungsmelder. Außerdem können die Switch через ioBroker State geschaltet werden.

#### Wifi-Switch
Zum Schalten der Geräte die localCommand benutzen mystrom.0.XXXXXXX.localCommands.

#### Кнопки
Zum Schalten von ioBroker заявляет, что muss man die [SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api) verwenden.

Die SimpleAPI kann über ein ioBroker web.0 Instanz aktiviert werden. In der Instanz web.0 Активен вариант «Eingebautes 'Simple-API'».

Zum setzen eines States kann dann folgende URL<br />

Unter Objekte folgenden State setzen mystrom.0.XXX.localData.api / v1 / device.XXXX. single or long order double (Geräte muss bei Adapterstart online sein, Zweimal drücken und dann für 8 Sekunden halten. Danach Adapter neustarten bis deatar Ordata gefüllt ist.):

##### Get: // ioBrokerIP: 8082 / toggle / javascript.0.test
<br />

#### PIR Bewegungsmelder
Unter Objekte folgenden State setzen mystrom.0.XXXXX.localData.api / v1 / action.pir

##### Get: // ioBrokerIP: 8082 / toggle / javascript.0.test
<br />

Mehr Details wie man z.B. zwei States gleichzeitig ändert: [https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

## Changelog

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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