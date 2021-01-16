---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: A7xAt+oZ1mmWz9RS/ljKzTjKddar7wc2MaWgZAvbjE0=
---
![Logo](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Anzahl der Installationen](http://iobroker.live/badges/sbfspot-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.sbfspot.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

# IoBroker.sbfspot
** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

** Wenn es Ihnen gefällt, ziehen Sie bitte eine Spende in Betracht: **

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Dieser Adapter liest Daten von SMA-Wechselrichtern mit sbfspot.
Jetzt werden beide Datenbanktypen (mySQL und sqlite) unterstützt.
Seit Version 0.2.3 steht ein eigenes vis-Widget auf Basis des Flots zur Verfügung, um historische Daten anzuzeigen.

## Installation
Bitte folgen Sie den Installationsanweisungen für sbfspot unter https://github.com/SBFspot/SBFspot/wiki

[detaillierte Installation auf armbasierten Systemen](docs/en/install_arm.md)

## Hinweise
* Verwenden Sie die neueste Version von sbfspot von https://github.com/SBFspot/SBFspot
* Adapter, sbfspot und Datenbanken (mySQL oder sqlite) müssen auf demselben System ausgeführt werden, z. Himbeer PI
* Das Installationshandbuch für sbfspot auf Raspberry Pi (oder ähnlichem) finden Sie unter https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite oder https://www.rg-engineering.eu/index. php / produkte / software / plugin-fuer-iobroker-sbfspot
* Für Raspberry Pi steht unter https://github.com/SBFspot/sbfspot-config ein halbautomatisches Konfigurationstool zur Verfügung

## Bekannte Probleme
* Manchmal schlägt die Installation des npm-Pakets sqlite3 fehl.

In diesem Fall installieren Sie alle npm-Pakete neu

> cd /opt/iobroker/node_modules/iobroker.sbfspot> sudo npm install

Manchmal muss npm intall mehrmals aufgerufen werden, um alle erforderlichen Pakete erfolgreich zu installieren

* Bitte erstellen Sie Probleme unter [github] (https://github.com/rg-engineering/ioBroker.sbfspot/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## 4.0.3 (2021-01-15)
* (René) Fehlerbehebung basierend auf CI-Tests

## 4.0.2 (2020-10-09)
* (René) Fehlerbehebung basierend auf CI-Tests

## 4.0.0 (2020-07-28)
* (René) Überarbeitung, um async / await zu verwenden
* (René) benutze mysql2

## 3.0.0 (2020-04-25)
* (René) sqlite3-Paket ersetzt durch better-sqlite3
* (René) Rollen von DP überarbeitet
* (René) siehe Problem Nr. 19: Daten nur abrufen, wenn optional Tageslicht hinzugefügt wird
* (René) siehe Problem Nr. 29: Standardfarbe für Widget-Achsenbeschriftung geändert
* (René) Widget: Protokollieren, wenn das Widget zu klein ist

## 2.4.3 (2020-04-02)
* (René) Bugfix in DB_CalcHistory_Today, der für das Widget verwendet wird

## 2.4.2 (2020-02-01)
* (René) Bugfix-Widget

## 2.4.0 (2019-12-28)
* (René) Update auf meinen eigenen Flot 3.0

#3. 2.3.4 (2019-10-31)
* (René) Update Flot auf Version 3.0

### 2.3.3 (2019-02-03)
* (René) aufgrund von Installationsproblemen beim Downgrade des sqlite3-Pakets

### 2.3.1 (2019-02-02)
* (René) Fehlerbehebung: Mit SQLite "Heute" wurden keine Daten angezeigt

### 2.3.0 (20.01.2019)
* (René) Unterstützung des Kompaktmodus
* (René) zusätzliche Fehlerinformationen im Protokoll hinzufügen

### 2.2.5 (26.11.2018)
* (René) Upgrade-Pakete

### 2.2.5 (2018-11-04)
* (René) Rendite zurücksetzen, wenn kein neuer Wert von heute vorliegt

### 2.2.4 (2018-08-19)
* (René) Bugfix für Ticks auf X.

### 2.2.3
* (René) wie 2.2.2

### 2.2.2
* (René) Zeitstempel des letzten Updates hinzufügen

### 2.2.1
* (René) Schließen der Datenbankverbindung, nachdem das letzte Abfrageergebnis verfügbar ist (z. B. um mehr als einen Wechselrichter zu unterstützen)

### 2.2.0
* (Nis) Hintergrundfarbe und Rand
* (René) Fehlerbehebungen in admin3

### 2.1.0
* (René) Unterstützung MariaDB

### 2.0.1
* (René) Unterstützung von admin3

### 2.0.0
* (René) Da wir immer ein Diagramm pro Widget verwenden, wird jetzt nur eines unterstützt

Achtung: Das Widget ist nicht mit Version 1.x.x kompatibel. Überprüfen Sie einfach die Einstellungen im Widget nach der Installation!

### 1.1.0
* (René) Autoskala der y-Achse
* (René) Farbe für die y-Achse
* (René) einstellbares Datumsformat

### 1.0.1
* (René) Fehlerbehebung für SQLite

### 1.0.0
* (René) erste stabile Version

### 0.2.6
* (René) Fehlerbehebung für Android App> 1.0.6

### 0.2.5
* (René) verwendet das Installationsdatum, um historische Werte zu berechnen

### 0.2.4
* (René) Logo geändert

### 0.2.3
* (René) Hinzufügen historischer Daten als Datenpunkt (JSON)
* (René) neues vis-Widget zum Anzeigen historischer Daten

### 0.2.2
* (René) umbenannt in sbfspot

### 0.2.1
* (René) index.html aktualisiert

### 0.2.0
* (René) Unterstützung von SQLite und Lizenz in MIT geändert

### 0.1.1
* (René) UTF8-Codierung

### 0.1.0
* (René) erste Veröffentlichung

### 0.0.1
* (René) Erstveröffentlichung

## Changelog

## License
Copyright (C) <2017-2021>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.