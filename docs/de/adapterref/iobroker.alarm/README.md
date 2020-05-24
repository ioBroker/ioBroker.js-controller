---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: 6Eo8Jf+RRmiw2StisaXhUrbLu5493j4zhlWj+OTMXRE=
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
Er Nord die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z.B. bei Nachtruhe oder De- und Aktivierung zu Interessen. Des Weiteren ist eine direkte Zugangung der Instanzen "Staaten", auf andere "Staaten" möglich. Diese Konflikteungen werden im Reiter Interessenungen anschaulich.

----------------------------------------------------------------------------------------------------------------------

### Tab Haupteinstellungen
Hier werden die Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm, Passwort und Berechtigungen über Andere Adapter wie z.B. Telegramm, Folgen.

----------------------------------------------------------------------------------------------------------------------

### Tabschauen
Hier werden die Kreise der Anlage Infrastruktur.
* die Namen der Staaten lassen sich ändern *

Der Alarmkreis hat den Verlust „hoch" und den Hut bei aktivierter Anlage Vorrang vor allen anderen Keisen.

Der Warnkreis hat zwei Funktionen, bei aktivierter Anlage werden diese Staaten nur zentrale und geben ggf. eine Meldung ab wenn eine richtige Verantwortung. Die zweite Funktion besteht darin, bei z. B. Haltung und aktivierte interne interne der Anlage (scharf innen), bei Befugnissen einer der konfigurierten Staaten ggf. eine Meldung abgesetzt wird.

Der Nachtkreis hat die gleiche Funktion wie der Warnkreis, auch nur die der Nachtruhe. Bei Beginender Nachtruhe fordert diese, fällt ab, die Anzeigen des Warnkreises ab.

*Es ist möglich möglich, dass man für einen Staat, den Haken bei allen drei Kreisen macht.*

Die Kreise sind folgender Berechtigung:

#### Alarmkreis:
Alarmanlage lässt sich nicht erkennen, wenn ein konfigurierter Zustand aktiv ist. Bei aktivierter Alarmanlage führen eine Möglichkeit sofort zur Auslösung der Anlage.

#### Warnkreis:
Hier können Dinge, die die nicht die richtigen "hoch" haben, z.B. Fenster im OG. In den Haupteinstellungen kann man die Wahrnehmung bei der Wahrnehmung beeinflussen. Ist die Alarmanlage, wird hier bei Veränderungen kein Alarm behandelt.
Man kann sich doch anders fühlenigen lassen.

#### Nachtkreis:
Bei aktiver Nachtruhe werden nachsichtshalber der erkannten und ggf. verwirren.

*Sollten Alarm- und Warnkreis für Staat sein, sein der Alarmkreis*

----------------------------------------------------------------------------------------------------------------------

### Tab Sprachausgabe
Ist eine mögliche Sprachausgabe z.B. bei bei der Regel des Zustandses. Länger man Felder wie z.B. bei der Fähigkeit leer, so findet keine Sprachausgabe statt. Weitere Optionen wie die wie die Ausgabe von Namen sind hier auch einstellbar.
* Sayit oder Alexa2 werden unterstütztüzt *

----------------------------------------------------------------------------------------------------------------------

### Tab Belohnungen
Hier ist es möglich Adapter interne Zustände direkt mit den Zuständen zu hören. Somit ist ein Umweg über ein Skript oder ein anderes nicht erledigt.
Es lässt sich somit somit z.B. bei Beginn der Nachtruhe, eine Veriegelung des Türschlosses realisieren.
![Logo](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

----------------------------------------------------------------------------------------------------------------------

Der Adapter heißt eine ganze Anzahl an Staaten:

#### "alarm.x.use .....".
Das sind die eigentlichen Staaten um die Alarmanlage zu verwalten.
Es ist möglich, die Alarmanlage direkt von der Anzeige auf "intern scharf" umzuschalten, stirbt ist nur nur möglich, wenn die Alarmanlage nicht verkauft wurde.

#### "alarm.x.status ...."
Hier lässte sich der Zustand der Anlage ablesen.

#### "alarm.x.info ...."
Liefert Informationsinformationen wie z.B. welche "Türen offen sind" oder einen Protokollzustand.
Der log_today Zustand wird um Mitternacht geleert.

----------------------------------------------------------------------------------------------------------------------

## Probleme
- wenn man ein Telegramm oder eine Erklärung über das + hin schnittgt, kann man nur ein Zustand der Instanz verloren und man muss auf *telegramm.0* alles lesen.

#### Unterscheidet ioBroker Benutzer
*Wählt man in den Optionen die Log Ausgabe an, wird im Log des ioBroker geschrieben. Ist man mit diesen Texten nicht zufrieden, besteht die Rechte, sich die Datei "/lib/Logs.js" zu editieren.*

#### Wichtige, die Berechtigung dieses Adapters zusätzliche auf eigene Gefahr, für etwaige Fehlfunktionen wird keine Berechtigung!

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