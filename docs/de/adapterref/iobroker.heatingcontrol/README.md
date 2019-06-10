---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: HJLyKTLvHU9Jewi/UeGxqaT9xWe3MUNwRuX1sBrSi3o=
---
![Logo](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Anzahl der Installationen](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)

# IoBroker.HeatingControl
Adapter zur Steuerung von Thermostaten.

Eigenschaften:

* Einstellen der eingestellten Temperatur zu bestimmten Zeiten
* Anzahl der Tagesstrecken mit unterschiedlichen Solltemperaturen einstellbar
* Unterstützt verschiedene Homematic Thermostate
* unterstützt mehrere Profile (zu tun)
* Wenn keine direkte Verbindung zwischen Thermostat und Stellantrieb besteht, kann der Stellantrieb direkt aus dem Adapter geschaltet werden
* Derzeit wird der Antrieb bei Erreichen der Solltemperatur direkt abgeschaltet. Sobald die Solltemperatur unterschritten wird, wird der Antrieb wieder eingeschaltet. Später wird hier eine bessere Rechtsetzung umgesetzt.
* Es werden bis zu zwei Aktoren unterstützt
* Thermostat und Stellantrieb werden automatisch pro Raum erkannt. Hierfür wird die Funktion (zB "Heizen") verwendet.
* Räume können im Admin deaktiviert werden, wenn ein Raum einen Thermostat hat, aber nicht gesteuert werden soll
* Ein Visualisierungsbeispiel wird später hier verfügbar sein

## Die Einstellungen
### Main
* Verwenden Sie Actors =, wenn Sie die Aktoren direkt vom Adapter aus steuern möchten. Nur für den Fall, dass keine direkte Verbindung zwischen Thermostat und Stellantrieb besteht.
* Gewerk = Funktion zur Erkennung von Thermostaten und Antrieben pro Raum
* Pfad zu Thermostaten = Objektpfad zu Thermostaten, z. "hm-rpc.0."
* Pfad zu Aktoren = Objektpfad zu Aktoren, z. "hm-rpc.0."
* timezone = Wird für Cron verwendet, um Cron-Jobs anzupassen
* delete all = löscht alle Raumeinstellungen, wenn der Admin sich öffnet. Danach wird ein neuer Scan nach Räumen gestartet

### Profil
* Profiltyp = Derzeit wird nur Montag bis Sonntag unterstützt. Die anderen werden in Kürze implementiert
* Anzahl der Profile = Wenn Sie mehr als ein Profil benötigen, erhöhen Sie diesen Wert. Sie können dann auswählen, welches Profil verwendet werden soll.
* Anzahl der Perioden = Definieren Sie, wie viele tägliche Abschnitte mit unterschiedlicher Temperatur Sie benötigen. Je mehr Sie einstellen, desto mehr Datenpunkte werden erstellt. Verwenden Sie besser einen niedrigen Wert (z. B. 5).
* Feiertag = Wenn Sie dies ankreuzen, erhalten Sie eine separate Anpassung für Feiertage (noch nicht implementiert)

### Geräte
* eine Liste aller Räume mit Thermostaten und Antrieben. Hier können Sie einen Raum deaktivieren. Sie sollten die Einstellungen für Thermostate oder Stellantriebe nicht ändern, da diese beim nächsten Start von admin überschrieben werden

## Anmerkungen
* Knoten mit einer Version höher als 8 ist erforderlich!

## Bekannte Probleme
* Bitte erstellen Sie Probleme bei [github] (https://github.com/rg-engineering/ioBroker.heatingcontrol/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## Changelog

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License

Copyright (C) <2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.