---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: H35jC6h/n9Gh+hmU2Jqe7BvaNZe8+id1JmRgM0alWGg=
---
![Logo](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Anzahl der Installationen](http://iobroker.live/badges/sbfspot-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.sbfspot.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

# IoBroker.sbfspot
Dieser Adapter liest mit sbfspot Daten von SMA Wechselrichtern.
Jetzt werden beide Datenbanktypen (mySQL und sqlite) unterstützt.
Seit Version 0.2.3 gibt es ein eigenes vis-Widget auf Flot-Basis, das historische Daten anzeigt.

## Hinweise
* Verwenden Sie die neueste Version von sbfspot von https://github.com/SBFspot/SBFspot oder von https://github.com/rg-engineering/SBFspot
* Adapter, sbfspot und Datenbanken (mySQL oder sqlite) müssen auf demselben System ausgeführt werden, z. Himbeer-PI
* Das Installationshandbuch für sbfspot auf Raspberry Pi (oder ähnlichem) finden Sie unter https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite oder https://www.rg-engineering.eu/index. php / produkte / software / plugin-fuer-iobroker-sbfspot
* Für Raspberry Pi steht unter https://github.com/SBFspot/sbfspot-config ein halbautomatisches Konfigurationstool zur Verfügung

## Bekannte Probleme
* Bitte erstellen Sie Probleme bei [github] (https://github.com/rg-engineering/ioBroker.sbfspot/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## 2.3.4 (2019-10-31)
* (René) Update Flot auf Version 3.0

### 2.3.3 (2019-02-03)
* (René) wegen Installationsproblemen beim Downgrade des sqlite3-Pakets

### 2.3.1 (2019-02-02)
* (René) Bugfix: mit sqlite "today" wurden keine Daten angezeigt

### 2.3.0 (2019-01-20)
* (René) Unterstützung des Kompaktmodus
* (René) Füge zusätzliche Fehlerinformationen in das Protokoll ein

### 2.2.5 (26.11.2018)
* (René) Upgrade-Pakete

### 2.2.5 (04.11.2018)
* (René) Rendite zurücksetzen, wenn ab heute kein neuer Wert vorhanden ist

### 2.2.4 (2018-08-19)
* (René) Bugfix für Ticks auf X

### 2.2.3
* (René) wie 2.2.2

### 2.2.2
* (René) Zeitstempel der letzten Aktualisierung hinzufügen

### 2.2.1
* (René) Trennt die Datenbankverbindung, nachdem das letzte Abfrageergebnis verfügbar ist (z. B. um mehr als einen Wechselrichter zu unterstützen)

### 2.2.0
* (Nis) Hintergrundfarbe und Rand
* (René) Bugfixes in admin3

### 2.1.0
* (René) MariaDB unterstützen

### 2.0.1
* (René) Unterstützung von admin3

### 2.0.0
* (René) Da wir immer ein Diagramm pro Widget verwenden, wird jetzt nur eines unterstützt

Achtung: Widget ist nicht kompatibel mit Version 1.x.x; Überprüfen Sie einfach die Einstellungen im Widget nach der Installation!

### 1.1.0
* (René) Autoskalierung der y-Achse
* (René) Farbe für die y-Achse
* (René) einstellbares Datumsformat

### 1.0.1
* (René) Bugfix für SQLite

### 1.0.0
* (René) erste stabile Veröffentlichung

### 0.2.6
* (René) Bugfix für Android App> 1.0.6

### 0.2.5
* (René) Verwenden Sie das Installationsdatum, um historische Werte zu berechnen

### 0.2.4
* (René) Logo geändert

### 0.2.3
* (René) Hinzufügen historischer Daten als Datenpunkt (JSON)
* (René) neues vis Widget zur Anzeige historischer Daten

### 0.2.2
* (René) umbenannt in sbfspot

### 0.2.1
* (René) index.html aktualisiert

### 0.2.0
* (René) Unterstützung von SQLite und Lizenz geändert zu MIT

### 0.1.1
* (René) UTF8-Codierung

### 0.1.0
* (René) erste Veröffentlichung

### 0.0.1
* (René) Erstveröffentlichung

## Changelog

## License
Copyright (C) <2017-2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.