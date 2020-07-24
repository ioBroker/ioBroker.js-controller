---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: HTGk4nS62rUA6r2P64RF+fNZf28kh3UB08Sw/nwlbp4=
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

-------------------------------------------------- -------------------------------------------------- ------------------ *Stand 05.07.2020 ab Version 0.8.0*

#### Wichtige ab 0.8.0
- Es befindet sich bei Vorinstallationen <0.8.0, beim Update des Adapters diese voraus zu deinstallieren! Es haben sich ein paar Datenpunkte gemacht.

### Tab Haupteinstellungen
Hier werden die Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm und Passwort Rechte.

*Alle Zeiten sind in Sekundenzahlengeben*

- Aktivierzeit -> Zeitverzögerung bis zur Aktivierung, wenn man einen Verspätung Datenpunkt hat
- Sirenenzeit bei Einbruch -> Bei Einbruch wird der Datenpunkt alarm.0.status.siren für die Zeit auf wahrheitsgemäß
- Alarmverzögerung -> Vertragsfrist bis Einbruch Rechte wird wird
- Auslösezeit bei Warnungen />

----------------------------------------------------------------------------------------------------------------------

### Tab-Anweisungen
Berechtigungen über Andere Adapter wie z.B. Telegramm, Email oder andere.
[Probleme](#Probleme)

----------------------------------------------------------------------------------------------------------------------

### Tabschauen
Hier werden die Kreise der Anlage Infrastruktur.
* die Namen der Staaten lassen sich ändern *

Der Alarmkreis hat den Status „hoch" und den Hut bei aktivierter Anlage (scharf) Vorrang vor allen anderen Keisen scharf melde intern.
* Es ist möglich möglich, dass man für einen Staat, den Haken bei allen drei Kreisen macht. *

Die Kreise werden folgender gehört:

#### Alarmkreis:
Alarmanlage lässt sich nicht schützen (scharf schalten) wenn ein konfigurierter Zustand aktiv ist. Bei aktivierter Alarmanlage führen eine Möglichkeit sofort zur Auslösung der Anlage.

#### Scharf Praktikant Kreis:
Alle hier konfigurierten Staaten werden beim Zustand scharf intern intern und nicht unter den den Alarm Alarm aus.

#### Meldekreis:
Der Ablauf der konfigurierten Staaten auf Ansprüche und meldet stirbt.

----------------------------------------------------------------------------------------------------------------------

### Tab Sprachausgabe
Ist eine mögliche Sprachausgabe z.B. bei bei der Regel des Zustandses.
* Man muss sich sicher sein, das der Datenpunkte, mit einem Text werden werden können! ZUM BEISPIEL. "sayit.0.tts" *

Es ist wichtig, sich die Ausgabe von Namen mit Ansagen zu lassen, kann diese Option anhören.

----------------------------------------------------------------------------------------------------------------------

### Tab Belohnungen
Hier ist es möglich Adapter interne Zustände direkt mit zugehörigen Zuständen zu wechseln. Somit ist ein Umweg über ein Skript oder ein anderes nicht erforderlich.
Es lässt sich somit somit z.B. bei Beginn der Nachtruhe, eine Veriegelung des Türschlosses realisieren.
![Logo](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

#### Eingabeverknüpfungen
Auslöser -> any = es wird bei jeder Änderung getriggert ne = es wird nur getriggert wenn der Wert sich verändert

Auslösewert -> Ist der Wert, auf welche getriggert werden soll

----------------------------------------------------------------------------------------------------------------------

Der Adapter heißt eine ganze Anzahl an Staaten:

#### "alarm.x.use .....".
Das sind die eigentlichen Staaten um die Alarmanlage zu verwalten.

- use.activate_nightrest -> Aktivierung der Nachtruhe
- use.activate_sharp_inside_circuit -> interne der Interessen des Warnkreises
- use.disable -> Deaktivierung der Anlage
- use.enable -> Alarm der Anlage
- use.enable_with_delay -> Alarm der Anlage mit Anlagenzeit
- use.list -> Deaktivierung
- use.quit_changes -> Rücksetzen der Staaten *info.notification_circuit_changes, info.sharp_inside_siren, status.activation_failed*
- use.toggle_password -> Deaktivierung / Alarm der Anlage mit Passwort
- use.toggle_with_delay -> Deaktivierung / Alarm der Einrichtung mit Alarmzeitung
- use.toggle_with_delay_and_password -> Deaktivierung / Alarm der Anlage mit Passwort und Handlungenzeit
- use.panic -> Händische Auslösung der Alarmanlage, auch wenn diese deaktiviert ist

#### "alarm.x.status ...."
Hier lässte sich der Zustand der Anlage ablesen.

- status.sleep -> Signalisiert den Zustand der automatischen Nachtruhe

#### "alarm.x.info ...."
Liefert Informationsinformationen wie z.B. welche "Türen offen sind" oder einen Protokollzustand.
Der log_today Zustand wird um Mitternacht geleert.

----------------------------------------------------------------------------------------------------------------------

## Probleme
- wenn man ein Telegramm oder eine Erklärung über das + hin schnitt, kann man nur ein Staat der Instanz verloren und man muss auf *telegramm.0* alles lesen.

#### Wichtige, die Berechtigung dieses Adapters zusätzliche auf eigene Gefahr, für etwaige Fehlfunktionen wird keine Berechtigung!

## Changelog

#### 1.2.0 (09.07.2020)
* (misanorot) added countdown speech output

#### 1.1.0 (05.07.2020)
* (misanorot) Added input shortcuts

#### 1.0.0 (01.07.2020)
* (misanorot) added alarm and silent flash light

#### 0.9.0 (28.06.2020)
* (misanorot) Homekit integrated, set shortcuts only when changed

#### 0.8.0 (18.06.2020)
#### (misanorot) !!! Changed circuits dramatacly !!! Please do a new installation when you come from less versions

#### 0.7.5 (14.06.2020)
* (misanorot) fixed a few little issues

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