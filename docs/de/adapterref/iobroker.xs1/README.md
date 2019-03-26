---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.xs1/README.md
title: ioBroker.xs1
hash: IeybNGgMEMa/IF18ankudZnwKWWL8wrsSWuzSaS5VS4=
---
![Logo](../../../en/adapterref/iobroker.xs1/admin/xs1.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.xs1.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.xs1.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.xs1/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/frankjoke/ioBroker.xs1?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.xs1.png?downloads=true)

# IoBroker.xs1
=================

## ioBroker adapter zu EZcontrol XS1 Der Adapter kommuniziert über die RestAPI des XS1 und hängt auch an das XS1 als alle anderen Änderungen an dem ioBroker weiterzuleiten.
Kommando vom ioBroker wird zuerst mit ack = false gesendet und wenn etwas vom Listener kommt dann passiert das mit ack = true. Man weiß dann zumindest XS1 den Befehl gesendet hat.
Der Adapter scannt alle verfügbaren Sensoren (read-only) und verwendet die XS1 vergebenen Namen.

Momentan werden keine Spezialinformationen wie Batterielevel unterstützt.

Der Link ist der gesamte Link zum XS1 kann.
Momentan ist noch kein Passwort-Zugriff und damit auf dem XS1 kein Passwort gesetzt sein!

  Für Sensoren, die im Status eine 'Battery low' -Anzeige anzeigen wird ein .LOWBAT-State erzeugt.

Die Copylist erlaubt direktes Schalten zwischen Listener und Aktoren.
Damit kann man Aktoren zusammenschalten, ohne im ioBroker scrips schreiben zu müssen.
Auch wenn Aktor A von XS! auf ein wird wird auch Aktor B (und C ..) auf ein geschaltet.
Das ist sinnvoll, wenn Aktoren verschiedene Systeme benutzen (Aktor A = FS20, B = AB400, C = HMS) und zusammen geschaltet werden sollen.

Die Syntax ist {"von_a": "auf_b (, auf_c, ...)", "von_b": "auf_c", ....} Die runden Klammern zeigen, dass mehrere Destinationen mit comma getrennt angegeben werden.
Ein Beispiel von mir: {"UWPumpeT2": "UWPumpe", "UWPumpe": "UWPumpeT2", "Schalter1": "Licht1, Licht2"} ioBroker nur noch einen Aktor verwenden.
'Schalter1' würde 'Licht1' und 'Licht2' gleichzeitig mitschalten.

Für die neu hinzugefügte Watchdog-Funktion sollte im XS1 ein virtueller Aktuator namens 'Watchdog' kreiert werden.
Dieser wird jede Minute umgeschaltet und wird zurückgeschaltet werden wird der Adapter neu gestartet.

## Wichtig!
* Der Adapter benötigt Node> = v4.3!
Einen blinden (aber nicht virtuellen) Aktuator mit dem Namen 'Watchdog' erstellen.

## Changelog
### 1.0.2
* Added more sensors. All unknown types will use 'value' role. This can lead to problems if actual type is a boolean, but should work otherwise. As a result all sensors should be listed now.

### 1.0.0
* Update accepted device list and test for node v 8
* Tarvis updated to test right repository

### 0.5.2
* Update variables list and values from XS1 but change values only if they are different than in state not to create false state updates

### 0.5.1
* Adapter test auf Node 4.x und 6.x für Windows und Linux.
* Fehler beim ersten Einlesen von boolean states korrigiert.

### 0.5.0 
* LOWBAT für Sensoren mit Battery low state.
* Abhängigkeit von 'async' und 'request' entfernt, damit braucht xs1 keine zusätzlichen Module mehr.
* Watchdog mit XS1-Aktuator implementiert.
* Cleanup der states wenn sie nicht mehr verwendet werden (und z.B. vom XS1 gelöscht werden)

### 0.4.2
  Watchdog von 4 Minuten implementiert, wenn 4 Minuten kein Signal vom XS1 kommt wird Adapter gestoppt.
  jede Minute sendet der Adapter ein Signal an den Aktuator 'Watchdog' der dies bestätigen sollte.
  iobroker sollte den Adapter dann neu starten.
 
### 0.4.0
  Erster öffentliche Version, kann lesen und Aktuatoren schreiben (Befehle absetzten).
  TODO: Dokumentieren und Batteriestatus polling implementieren.

### 0.1.0
  Erster Test, Kann nur lesen und mithören

## License
The MIT License (MIT)

Copyright (c) 2016 Frank Joke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.