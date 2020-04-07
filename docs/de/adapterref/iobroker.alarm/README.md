---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: R0ReV6006oswtZGt1FfkZlgq9Zw8OirVIL0ChlPE+T0=
---
![Logo](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/misanorot/iobroker.alarm.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/misanorot/ioBroker.alarm/master.svg)

# IoBroker.alarm
[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Englische Beschreibung](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

### IoBroker Alarm
#### DER ADAPTER IST NOCH ALPHA
Dies ist ein Adapter, mit dem sich eine kleine Alarmanlage ohne programmiertechnische Vorkenntnisse realisieren lässt.
Er Nord die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z.B. bei Nachtruhe oder De- und Aktivierung zu Interessen. Des Weiteren ist eine direkte Kontaktung der Instanz "Staaten", auf andere "Staaten" möglich. Diese Einstellungenungen werden im Reiter Interessenungen anschaulich.

Neben den Haupteinstellungen, wie die Zeiten der Nachtruhe, Berechtigungen über Andere Adapter wie Telegramm, sind die Sicherheitskreise im Reiter Zustände zu konfigurieren.

Die Kreise sind folgender Berechtigung:

#### Alarmkreis:
Alarmanlage lässt sich nicht erkennen, wenn ein konfigurierter Zustand aktiv ist. Bei aktivierter Alarmanlage führen eine Möglichkeit sofort zur Auslösung der Anlage.

#### Warnkreis:
Hier können Dinge, die die nicht sterben, "hoch" haben, z.B. Fenster im OG. In den Haupteinstellungen kann man die Wahrnehmung bei der Wahrnehmung beeinflussen. Ist die Alarmanlage, wird hier bei Veränderungen kein Alarm behandelt.

#### Nachtkreis:
Wenn man die Option verliert, werden Sie von der Nachtruhe erkannten und ggf. verwirkt.

*Sollten Alarm- und Warnkreis pro Staat wird sein, der Alarmkreis*

Ist eine Lösung "sayit" Ansage bei der Regel des Zustandses, die sich auf das Sayit-Tab Seite mit den gleichen Sätzen konfigurieren.

Die eigentlichen Staaten um den Adapter zu finden, finden sich unter "alarm.x.use .....". Die Statuszustände der Alarmanlage sind unter "alarm.x.status ...." zu finden. Ein Log Zustand, der Mitternacht wird wird, findet man unter "alarm.x.info ....".

Wählt man in den Optionen die Log Ausgabe an, wird geändert im Log des ioBroker geschrieben. Ist man mit diesen Texten nicht zufrieden, besteht die Rechte, sich die Datei "/lib/Logs.js" zu editieren.

#### Wichtige, die Berechtigung dieses Adapters zusätzliche auf eigene Gefahr, für etwaige Fehlfunktionen wird keine Berechtigung!

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