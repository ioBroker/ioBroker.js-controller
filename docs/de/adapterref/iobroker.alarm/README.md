---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: Oo0N8/qhdtLo5g1Q28akhuzFt7Tb99WpQO5JzDZ/2jY=
---
![Logo](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![Anzahl der Installationen](http://iobroker.live/badges/alarm-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/misanorot/iobroker.alarm.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/misanorot/ioBroker.alarm/master.svg)

# IoBroker.alarm
[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Englische Beschreibung](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

## IoBroker Alarm
Dies ist ein Adapter, mit dem sich eine kleine Alarmanlage ohne große programmiertechnische Vorkenntnisse realisieren lässt.
Er Nord die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z.B. bei Nachtruhe oder De- und Aktivierung zu Interessen. Des Weiteren ist eine direkte Kontaktung der Instanz "Staaten", auf andere "Staaten" möglich. Diese Konflikteungen werden im Reiter Interessenungen anschaulich.

----------------------------------------------------------------------------------------------------------------------

### Tab Haupteinstellungen
Hier werden die Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm, Passwort und Berechtigungen über Andere Adapter wie z.B. Telegramm, Folgen.

----------------------------------------------------------------------------------------------------------------------

### Tabschauen
Hier werden die Kreise der Anlage Verwaltung.
Die Namen der Staaten lassen sich ändern.

#### Alarmkreis:
Alarmanlage lässt sich nicht erkennen, wenn ein konfigurierter Zustand aktiv ist. Bei aktivierter Alarmanlage führen eine Möglichkeit sofort zur Auslösung der Anlage.

#### Warnkreis:
Hier können Dinge, die die nicht die richtigen "hoch" haben, z.B. Fenster im OG. In den Haupteinstellungen kann man die Wahrnehmung bei der Wahrnehmung beeinflussen. Ist die Alarmanlage, wird hier bei Veränderungen kein Alarm behandelt.
Man kann sich doch anders fühlenigen lassen.

#### Nachtkreis:
Bei aktiver Nachtruhe werden nach sich gezogen, um der erkannten und ggf. verwirkt.

*Sollten Alarm- und Warnkreis für Staat sein, sein der Alarmkreis*

----------------------------------------------------------------------------------------------------------------------

### Tab Sprachausgabe
Ist eine mögliche Sprachausgabe z.B. bei bei der Regel des Zustandses. Länger man Felder wie z.B. bei der Fähigkeit leer, so findet keine Sprachausgabe statt. Weitere Optionen wie die wie die Ausgabe von Namen sind hier auch einstellbar.
* Sayit oder Alexa2 werden unterstütztüzt *

----------------------------------------------------------------------------------------------------------------------

### Tab Belohnungen
Hier ist es möglich Adapter interne Zustände direkt mit zugehörigen Zuständen zu wechseln. Somit ist ein Umweg über ein Skript oder ein anderes nicht erledigt.
Es lässt sich somit somit z.B. bei Beginn der Nachtruhe, eine Veriegelung des Türschlosses realisieren.
![Logo](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

----------------------------------------------------------------------------------------------------------------------

Der Adapter heißt eine ganze Anzahl an Staaten:

#### "alarm.x.use .....".
Das sind die eigentlichen Staaten um die Alarmanlage zu verwalten.

#### "alarm.x.status ...."
Hier lässte sich der Zustand der Anlage ablesen.

#### "alarm.x.info ...."
Liefert Informationsinformationen wie z.B. welche "Türen offen sind" oder einen Protokollzustand.
Der log_today Zustand wird um Mitternacht geleert.

----------------------------------------------------------------------------------------------------------------------

## Probleme
- wenn man ein Telegramm oder eine Erklärung über das + hin schnitt, kann man nur ein Staat der Instanz verloren und man muss auf *telegramm.0* alles lesen.

#### Unterscheidet ioBroker Benutzer
*Wählt man in den Optionen die Log Ausgabe an, wird im Log des ioBroker geschrieben. Ist man mit diesen Texten nicht zufrieden, besteht die Rechte, sich die Datei "/lib/Logs.js" zu editieren.*

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