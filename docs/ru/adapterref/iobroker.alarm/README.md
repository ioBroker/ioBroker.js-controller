---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: HtQRzGke7pLNpCxorf6Re5gBtRVUr7f+kyqVQrsWrJU=
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
Er bietet die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z.B. Находится под названием De- und Aktivierung zu überwachen. Des Weiteren ist eine direkte Verknüpfung der jeweiligen Instanz «заявляет», auf anddere «заявляет» меглиц. Diese Verknüpfungen werden im Reiter Verknüpfungen angelegt.

-------------------------------------------------- -------------------------------------------------- ------------------ *Подставка 28.05.2020*

### Tab Haupteinstellungen
В настоящее время в нем представлены Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm и Passwort vorgenommen.

*Alle Zeiten sind в Sekunden einzugeben*

- Aktivierzeit -> Zeitverzögerung bis zu Aktivierung wenn man einen delay Datenpunkt benutzt
- Sirenenzeit bei Einbruch -> Bei Einbruch wird der Datenpunkt alarm.0.status.siren für die Zeit auf true gesetzt
- Alarmverzögerung -> Verzögerungszeit bis Einbruch ausgelöst wird (большой вес) Zeit wird der Stille Alarm ausgelöst)
- Auslösezeit bei Warnungen -> Bei Auslösung eines der Warnkreise (info.warn / night_circuit_changes), ювелирные изделия из драгоценных камней

----------------------------------------------------------------------------------------------------------------------

### Tab Benachrichtigungen
Benachrichtigungen über Andere Adapter wie z.B. Телеграмма, электронная почта или андер.
[Probleme](#Probleme)

----------------------------------------------------------------------------------------------------------------------

### Tab Überwachung
Hier werden die Kreise der Anlage konfiguriert.
* умри намеки штатов лассен сич андерн *

Der Alarmkreis hat die Priorität «hoch» and hat be aktivierter Anlage Vorrang vor allen and anderen Keisen. Er dient zur eigentlichen Überwachung der Anlage.

Der Warnkreis hat zwei Funktionen, bei aktivierter Anlage werden diese States nur überwacht und geben ggf. eine Meldung ab wenn eine Änderung stattfand. Die Zweite Funkest besteht darin bei z. B. Anwesenheit und aktivierter internen Uberwachung der Anlage (острая внутренняя часть), Bei Veränderung einer der konfigurierten States ggf. Эйн Мелдунг Абгесетцт Вирд.

Der Nachtkreis hat die gleiche Funktion wie der Warnkreis, jedoch nur während der Nachtruhe. Начинающий ученик Nachtruhe Lost Остаться в живых, падает Активиерт, умереть Uberwachung des Warnkreises (острый внутри) ab.

* Es ist durchaus möglich, dassman für einen State, den Haken bei allen drei Kreisen Macht

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
Ist eine gewünschte Sprachausgabe z.B. bei bei Änderung des Zustandes gewünscht, lässt sich das hier mit den gewünschten Sätzen konfigurieren.
* Man muss sich sicher sein, das der ausgewählte Datenpunkt, mit einem Text beschrieben werden kann! Z.B. "sayit.0.tts" *

Möchte man sich die Ausgabe von Namen mit Ansagen lassen, kann man diese Вариант anwählen.

----------------------------------------------------------------------------------------------------------------------

### Tab Verknüpfungen
Hier ist es möglich Адаптер международных государств, директива по внешним государствам, в целом. Somit is ein Umweg über ein Skript oder ähnlichen nicht erforderlich.
Es lässt sich somit z.B. Bei Beginn der Nachtruhe, Eine Veriegelung des Türschlosses realisieren.
![логотип](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

----------------------------------------------------------------------------------------------------------------------

Der Adapter liefet eine ganze Anzahl заявляет:

#### "alarm.x.use .....".
Das sind die eigentlichen заявляет, что умирает.
Es ist möglich die Alarmanlage direkt von aktiviert auf "intern scharf" umzuschalten, dies ist jedoch nur möglich wenn die Alarmanlage, не имеющей возможности.

- use.activate_nightrest -> Активирунг дер Нахтруэ
- use.deactivate_nightrest -> Deaktivierung der Nachtruhe
- use.toggle_nightrest -> Deaktivierung / Aktivierung der Nachtruhe
- use.activate_warn_circuit -> Aktivierung der Uberwachung des Warnkreises (intern scharf)
- use.deactivate_warn_circuit -> Deaktivierung der Uberwachung des Warnkreises (intern scharf)
- use.toggle_warn_circuit -> Deaktivierung / Aktivierung der Überwachung des Warnkreises (стажер)
- use.disable -> Deaktivierung der Anlage (Alarmkreis)
- use.enable -> Aktivierung der Anlage (Alarmkreis)
- use.enable_with_delay -> Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.list -> Deaktivierung / Aktivierung / Warnkreis / Aktivierung mit Verzögerungszeit
- use.quit_changes -> штаты Рюксетцен дер байден *info.warn / night_circuit_changes*
- use.toggle -> Deaktivierung / Aktivierung der Anlage (Alarmkreis)
- use.toggle_password -> Deaktivierung / Aktivierung der Anlage (Alarmkreis) mit Passwort
- use.toggle_with_delay -> Deaktivierung / Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.toggle_with_delay_and_password -> Deaktivierung / Aktivierung der Anlage (Alarmkreis) mit Passwort und Verzögerungszeit
- use.panic -> Händische Auslösung der Alarmanlage (Einbruch), очень хорошо

#### "alarm.x.status ...."
Hier lässte sich der Zustand der Anlage смог.

#### "alarm.x.info ...."
Liefert zusätzliche Informationen wie z.B. Welche "Türen offen sind" oder einen Лог государства.
Der log_today State Wird Um Mitternacht Geleert.

----------------------------------------------------------------------------------------------------------------------

## Проблема
- мужская телеграмма телеграмм, посвященных английским языкам, родным и родным и родным дорогам, телеграммам и телеграммам.

#### Wichtig, die Benutzung dieses.

## Changelog

#### 0.7.0 (07.06.2020)
* (misanorot) edit notification sentences in admin

#### 0.6.0 (31.05.2020)
* (misanorot) changed speech output

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