---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: 6Eo8Jf+RRmiw2StisaXhUrbLu5493j4zhlWj+OTMXRE=
---
![логотип](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![Количество установок](http://iobroker.live/badges/alarm-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Статус зависимости](https://img.shields.io/david/misanorot/iobroker.alarm.svg)
![Известные уязвимости](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/misanorot/ioBroker.alarm/master.svg)

# IoBroker.alarm
[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Английское описание](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

## IoBroker Alarm
Умирает в адаптере, с его помощью. Аларманирование, программирование, техническое обслуживание.
Er bietet die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z.B. Находится на территории De- und Aktivierung zu überwachen. Des Weiteren ist eine direkte Verknüpfung der jeweiligen Instanz «заявляет», auf anddere «заявляет» меглиц. Diese Verknüpfungen werden im Reiter Verknüpfungen angelegt.

----------------------------------------------------------------------------------------------------------------------

### Tab Haupteinstellungen
Hier werden die Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm, Passwort und Benachrichtigungen über Andere Adapter wie z.B. Телеграмма, воргеноммен.

----------------------------------------------------------------------------------------------------------------------

### Tab Überwachung
Hier werden die Kreise der Anlage konfiguriert.
* умри намеки штатов лассен сич андерн *

Der Alarmkreis hat die Priorität «hoch» and hat be aktivierter Anlage Vorrang vor allen and anderen Keisen. Er dient zur eigentlichen Überwachung der Anlage.

Der Warnkreis hat zwei Funktionen, bei aktivierter Anlage werden diese States nur überwacht und geben ggf. eine Meldung ab wenn eine Änderung stattfand. Die Zweite Funkest besteht darin bei z. B. Anwesenheit und aktivierter internen Uberwachung der Anlage (острая внутренняя часть), Bei Veränderung einer der konfigurierten States ggf. Эйн Мелдунг Абгесетцт Вирд.

Der Nachtkreis hat die gleiche Funktion wie der Warnkreis, jedoch nur während der Nachtruhe. Начинающий ученик Nachtruhe Lost Остаться в живых, падает Активиерт, умереть Uberwachung des Warnkreises (острый внутри) ab.

*Es ist durchaus möglich, dassman für einen State, den Haken bei allen drei Kreisen macht.*

Die Kreise sind folgendermaßen überwacht:

#### Alarmkreis:
Alarmanlage lässt sich nicht aktivieren wenn ein konfigurierter state aktiv ist. Bei aktivierter Alarmanlage führt eine Veränderung sofort zur Auslösung der Anlage.

#### Warnkreis:
Hier können Dinge überwacht werden die nicht die Priorität "hoch" haben, z.B. Фенстер им О.Г. В зале Haupteinstellungen kann man die Uberwachung bei der Aktivierung einstellen. Ist die Alarmanlage aktiviert, очень странный и тревожный сигнал тревоги.
Человек Кан Сич Джедох Бенахрихтиген Лассен.

#### Nachtkreis:
Bei aktiver Nachtruhe werden Veränderungen während der erkannt und ggf. gemeldet.

*Sollten Alarm - und Warnkreis pro State aktiviert sein, zählt der Alarmkreis*

----------------------------------------------------------------------------------------------------------------------

### Tab Sprachausgabe
Ist eine gewünschte Sprachausgabe z.B. bei bei Änderung des Zustandes gewünscht, lässt sich das hier mit den gewünschten Sätzen konfigurieren. Последний человек Фельдер со з.б. bei der Aktivierung leer, so findet keine Sprachausgabe statt. Weitere Optionen wie die wie die Ausgabe von Namen sind hier auch einstellbar.
* Sayit oder Alexa2 werden unterstüzt *

----------------------------------------------------------------------------------------------------------------------

### Tab Verknüpfungen
Hier ist es möglich Адаптер международных государств, директива по внешним государствам, в целом. Somit is ein Umweg über ein Skript oder ähnlichen nicht erforderlich.
Es lässt sich somit z.B. Bei Beginn der Nachtruhe, Eine Veriegelung des Türschlosses realisieren.
![логотип](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

----------------------------------------------------------------------------------------------------------------------

Der Adapter liefet eine ganze Anzahl заявляет:

#### "alarm.x.use .....".
Das sind die eigentlichen заявляет, что um die Alarmanlage zu bedienen.
Es ist möglich die Alarmanlage direkt von aktiviert auf "intern scharf" umzuschalten, dies ist jedoch nur möglich wenn die Alarmanlage, не имеющей возможности.

#### "alarm.x.status ...."
Hier lässte sich der Zustand der Anlage смог.

#### "alarm.x.info ...."
Liefert zusätzliche Informationen wie z.B. Welche "Türen offen sind" oder einen Лог государства.
Der log_today State Wird Um Mitternacht Geleert.

----------------------------------------------------------------------------------------------------------------------

## Проблема
- мужская телеграмма телеграмм, в том числе слова, написанные на английском языке, канзуфюгт, канцман нью эйн дер дер инстанс авансвен и человек мусс бис * телеграмма.

#### Erfahrene ioBroker Nutzer
*Wählt человек в логове Опционально умирает Log Ausgabe an, werden gewisse Änderungen im Log des ioBroker geschrieben. Ist man mit diesen Texten nicht zufrieden, besteht die Möglichkeit, sich die Datei "/lib/Logs.js" zu editieren.*

#### Wichtig, die Benutzung dieses.

## Changelog

#### 0.5.0 (14.05.2020)
* (misanorot) added use.list state

#### 0.4.0 (14.05.2020)
* (misanorot) added warn circuit monitoring

#### 0.3.0 (04.05.2020)
* (misanorot) expaned speech output

#### 0.2.2 (30.04.2020)
* (misanorot) added alexa2 speak output

#### 0.2.0 (22.04.2020)
* (misanorot) added more states

#### 0.1.2 (19.04.2020)
* (misanorot) status.state  activated

#### 0.1.1 (28.03.2020)
* (misanorot) added states and lists - fixed issues - translation

#### 0.1.0 ()
* (misanorot) add password for de/activation -- better logging

#### 0.0.9 (19.02.2020)
* (misanorot) add sayit

#### 0.0.8 (03.02.2020)
* (misanorot) initial release

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