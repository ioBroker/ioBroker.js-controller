![Logo](admin/alarm.png)
# ioBroker.alarm

![Number of Installations](http://iobroker.live/badges/alarm-installed.svg) ![Number of Installations](http://iobroker.live/badges/alarm-stable.svg)[![NPM version](http://img.shields.io/npm/v/iobroker.alarm.svg)](https://www.npmjs.com/package/iobroker.alarm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.alarm.svg)](https://www.npmjs.com/package/iobroker.alarm)
[![Dependency Status](https://img.shields.io/david/misanorot/iobroker.alarm.svg)](https://david-dm.org/misanorot/iobroker.alarm)
[![Known Vulnerabilities](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)](https://snyk.io/test/github/misanorot/ioBroker.alarm)

[![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)](https://nodei.co/npm/iobroker.alarm/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/misanorot/ioBroker.alarm/master.svg)](https://travis-ci.org/misanorot/ioBroker.alarm)


[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[English description](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

## ioBroker Alarm


Dies ist ein Adapter, mit dem sich eine kleine Alarmanlage ohne große programmiertechnische Vorkenntnisse realisieren lässt.
Er bietet die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z.B. bei Nachtruhe oder De- und Aktivierung zu überwachen. Des Weiteren ist
eine direkte Verknüpfung der jeweiligen Instanz "states", auf andere "states" möglich. Diese Verknüpfungen werden im Reiter Verknüpfungen angelegt.

----------------------------------------------------------------------------------------------------------------------
*Stand 28.05.2020*


### Tab Haupteinstellungen

Hier werden die Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm, Passwort und Benachrichtigungen über Andere Adapter wie z.B. Telegramm, vorgenommen.

*Alle Zeiten sind in Sekunden einzugeben*

- Aktivierzeit -> Zeitverzögerung bis zu Aktivierung wenn man einen delay Datenpunkt benutzt
- Sirenenzeit bei Einbruch -> Bei Einbruch wird der Datenpunkt alarm.0.status.siren für die Zeit auf true gesetzt
- Alarmverzögerung -> Verzögerungszeit bis Einbruch ausgelöst wird (während dieser Zeit wird der Stille Alarm ausgelöst)  
- Auslösezeit bei Warnungen -> Bei Auslösung eines der Warnkreise(info.warn/night_circuit_changes), wird der jeweils zugehörige Datenpunkt für die Zeit auf true gesetzt


----------------------------------------------------------------------------------------------------------------------

### Tab Überwachung

Hier werden die Kreise der Anlage konfiguriert.
*die Namen der states lassen sich ändern*

Der Alarmkreis hat die Priorität „hoch" und hat bei aktivierter Anlage Vorrang vor allen anderen Keisen. Er dient zur eigentlichen Überwachung der Anlage. Dies entspricht einer einfachen Alarmanlage mit nur einem Kreis.

Der Warnkreis hat zwei Funktionen, bei aktivierter Anlage werden diese States nur überwacht und geben ggf. eine Meldung ab wenn eine Änderung stattfand. Die zweite Funktion besteht darin, bei z. B. Anwesenheit und aktivierter internen Überwachung der Anlage (sharp inside), bei Veränderung einer der konfigurierten States ggf. eine Meldung abgesetzt wird.

Der Nachtkreis hat die gleiche Funktion wie der Warnkreis, jedoch nur während der Nachtruhe. Bei beginender Nachtruhe löst diese, falls aktiviert, die Überwachung des Warnkreises (sharp inside) ab.

*Es ist durchaus möglich, dass man für einen State, den Haken bei allen drei Kreisen macht.*

Die Kreise sind folgendermaßen überwacht:

#### Alarmkreis:
Alarmanlage lässt sich nicht aktivieren wenn ein konfigurierter state aktiv ist. Bei aktivierter Alarmanlage führt eine Veränderung sofort zur Auslösung der Anlage.

#### Warnkreis:
Hier können Dinge überwacht werden die nicht die Priorität "hoch" haben, z.B. Fenster im OG. In den Haupteinstellungen kann man die Überwachung bei der Aktivierung einstellen. Ist die Alarmanlage aktiviert, wird hier bei Veränderung kein Alarm ausgelöst.
Man kann sich jedoch benachrichtigen lassen.

#### Nachtkreis:
Bei aktiver Nachtruhe werden Veränderungen während der erkannt und ggf. gemeldet.

*Sollten Alarm- und Warnkreis pro state aktiviert sein, zählt der Alarmkreis*

----------------------------------------------------------------------------------------------------------------------

### Tab Sprachausgabe

Ist eine gewünschte Sprachausgabe z.B. bei bei Änderung des Zustandes gewünscht, lässt sich das hier mit den gewünschten Sätzen konfigurieren. Lässt man Felder wie z.B. bei der Aktivierung leer,
so findet keine Sprachausgabe statt. Weitere Optionen wie die wie die Ausgabe von Namen sind hier auch einstellbar.
*Sayit oder Alexa2 werden unterstüzt*

----------------------------------------------------------------------------------------------------------------------

### Tab Verknüpfungen

Hier ist es möglich Adapter interne states direkt mit externen states zu verknüpfen. Somit ist ein Umweg über ein Skript oder ähnlichen nicht erforderlich.
Es lässt sich somit z.B. bei Beginn der Nachtruhe, eine Veriegelung des Türschlosses realisieren.
![Logo](admin/img/short.png)

----------------------------------------------------------------------------------------------------------------------

Der Adapter liefert eine ganze Anzahl an states:

#### "alarm.x.use.....".
Das sind die eigentlichen states um die Alarmanlage zu bedienen.
Es ist möglich die Alarmanlage direkt von aktiviert auf "intern scharf" umzuschalten, dies ist jedoch nur möglich wenn die Alarmanlage nicht ausgelöst hatte.

- use.activate_nightrest -> Aktivierung der Nachtruhe
- use.deactivate_nightrest -> Deaktivierung der Nachtruhe
- use.toggle_nightrest -> Deaktivierung/Aktivierung der Nachtruhe
- use.activate_warn_circuit -> Aktivierung der Überwachung des Warnkreises (intern scharf)
- use.deactivate_warn_circuit -> Deaktivierung der Überwachung des Warnkreises (intern scharf)
- use.toggle_warn_circuit -> Deaktivierung/Aktivierung der Überwachung des Warnkreises (intern scharf)
- use.disable -> Aktivierung der Anlage (Alarmkreis)
- use.enable -> Deaktivierung der Anlage (Alarmkreis)
- use.enable_with_delay -> Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.list -> Deaktivierung/Aktivierung/Warnkreis/Aktivierung mit Verzögerungszeit
- use.quit_changes -> Rücksetzen der beiden states *info.warn/night_circuit_changes*
- use.toggle -> Deaktivierung/Aktivierung der Anlage (Alarmkreis)
- use.toggle_password -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Passwort
- use.toggle_with_delay -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.toggle_with_delay_and_password -> Deaktivierung/Aktivierung der Anlage (Alarmkreis) mit Passwort und Verzögerungszeit


#### "alarm.x.status...."
Hier lässte sich der Zustand der Anlage ablesen.

#### "alarm.x.info...."
Liefert zusätzliche Informationen wie z.B. welche "Türen offen sind" oder einen Log state.
Der log_today state wird um Mitternacht geleert.

----------------------------------------------------------------------------------------------------------------------



## Probleme
	- wenn man eine Telegram oder ähnliches über das + hinzufügt, kann man nur ein state der Instanz auswählen und  man muss bis auf *telegram.0* alles löschen.

#### erfahrene ioBroker Nutzer
*Wählt man in den Optionen die Log Ausgabe an, werden gewisse Änderungen im Log des ioBroker geschrieben. Ist man mit diesen Texten nicht zufrieden, besteht die Möglichkeit, sich die Datei "/lib/Logs.js" zu editieren.*




#### Wichtig, die Benutzung dieses Adapters geschieht auf eigene Gefahr, für etwaige Fehlfunktionen wird keine Haftung übernommen!



## Changelog

#### 0.5.0 (31.05.2020)
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
