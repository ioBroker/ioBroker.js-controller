---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: R0ReV6006oswtZGt1FfkZlgq9Zw8OirVIL0ChlPE+T0=
---
![логотип](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Статус зависимости](https://img.shields.io/david/misanorot/iobroker.alarm.svg)
![Известные уязвимости](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/misanorot/ioBroker.alarm/master.svg)

# IoBroker.alarm
[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Английское описание](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

### IoBroker Alarm
#### DER ADAPTER IST NOCH ALPHA
Умирает в адаптере, с его помощью.
Er bietet die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z.B. Находится под названием De- und Aktivierung zu überwachen. Des Weiteren ist eine direkte Verknüpfung der jeweiligen Instanz "заявляет", auf anddere "заявляет" меглиц. Diese Verknüpfungen werden im Reiter Verknüpfungen angelegt.

Neben den Haupteinstellungen, wie die Zeiten der Nachtruhe, Benachrichtigungen über Andere Adapter wie Telegramm, sind die Sicherheitskreise im Reiter Zustände zu konfigurieren.

Die Kreise sind folgendermaßen überwacht:

#### Alarmkreis:
Alarmanlage lässt sich nicht aktivieren wenn ein konfigurierter state aktiv ist. Bei aktivierter Alarmanlage führt eine Veränderung sofort zur Auslösung der Anlage.

#### Warnkreis:
Hier können Dinge überwacht werden die nicht die Priorität "hoch" haben, z.B. Фенстер им О.Г. В зале Haupteinstellungen kann man die Uberwachung bei der Aktivierung einstellen. Ist die Alarmanlage aktiviert, очень странный и тревожный сигнал тревоги.

#### Nachtkreis:
Wenn man die Option konfiguriert, werden Veränderungen während der Nachtruhe erkannt und ggf. gemeldet.

*Sollten Alarm - und Warnkreis pro State aktiviert sein, zählt der Alarmkreis*

Ist eine gewünschte "sayit" Ansage bei Änderung des Zustandes gewünscht, lässt sich das entsprechend auf der Sayit-Tab Seite mit den gewünschten Sätzen konfigurieren.

Умереть в своих состояниях. Адаптер zu bedienen, найденный как "alarm.x.use .....". Умеренный статус заявляет, что он находится под "alarm.x.status ...." zu finden. Государство Эйн Лог, der Mitternacht gelöscht wird, найти человека unter "alarm.x.info ....".

Уверен, что у вас есть возможность выбора журнала Ausgabe, Werden Gewisse Änderungen im Log des ioBroker geschrieben. Ist man mit diesen Texten nicht zufrieden, besteht die Möglichkeit, sich die Datei "/lib/Logs.js" zu editieren.

#### Wichtig, die Benutzung dieses.

## Changelog
**[CHANGELOG](https://github.com/misanorot/ioBroker.alarm/blob/master/changelog.md)**

## License
MIT License

Copyright (c) 2019-2020 misanorot <audi16v@gmx.de>

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