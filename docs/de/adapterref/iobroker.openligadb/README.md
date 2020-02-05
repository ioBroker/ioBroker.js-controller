---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.openligadb/README.md
title: ioBroker Adapter, um Ergebnisse von Fußballspielen aus OpenLigaDB zu erhalten
hash: 9bfbzA6cbNxYlyrVPRQt9p4KSJUlPjuP1FqXDEd/K3c=
---
![Logo](../../../en/adapterref/iobroker.openligadb/admin/openligadb_b.png)

![Anzahl der Installationen](http://iobroker.live/badges/openligadb-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.openligadb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![Travis](https://img.shields.io/travis/oweitman/ioBroker.openligadb.svg)
![AppVeyor Build Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-openligadb.svg)
![GitHub Probleme](https://img.shields.io/github/issues/oweitman/ioBroker.openligadb.svg)

# IoBroker Adapter, um Ergebnisse von Fußballspielen aus OpenLigaDB zu erhalten
## Überblick
Adapter zur Abfrage von Spieldaten für Fußball oder andere Spiele von openligadb.de

## Aufbau
Fügen Sie eine Instanz des Adapters hinzu und klicken Sie auf das Schraubenschlüsselsymbol. Im Formular können Sie die Verknüpfung aus einer Liga und einer Saison hinzufügen.
Bitte besuchen Sie openligadb.de für verfügbare Ligen, Saisons und Shortcuts. Wenn eine Saison über zwei Jahre verteilt ist, geben Sie bitte nur das Startjahr ein.

Beispieldaten für die 1. Deutsche Bundliga sind shortcut = bl1 season = 2019

Wenn Sie die Konfiguration gespeichert und geschlossen haben, müssen kurze Zeit später neue Datenpunkte für Ihre Liga und Saison vorhanden sein.

## Vis und Widgets
Derzeit sind 3 Widgets verfügbar. Bitte geben Sie openligadb in den Widget-Filter ein

### Tabelle
Dieses Widget zeigt das aktuelle Ranking Ihrer Liga an

### Spieltag
Alle Spiele des aktuellen oder ausgewählten Spieltages. Es gibt viele Widget-Attribute, um die Menge der angezeigten Daten zu konfigurieren

### FavGame
Zeigen Sie alle, aktuellen oder zukünftigen Spiele Ihrer Lieblingsvereine an

Die Dokumentation für die vis-Widgets ist in vis oder [Widget-Dokumentation](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html) verfügbar.

## Machen
* Überprüfung im Widget, wenn der Benutzer nicht den richtigen Datenpunkt ausgewählt hat
* Übersetzung
* Dokumentationsadapter / Widget
* ~~ Problem mit der Dynamik der Clubspalte ~~ behoben
* ~~ neues Widget: nächste x Spiele des Clubs ~~
* ~~ Widget-Spieltag-Einstellung für Startspieltag und Länge (-1,3 = vorherigen Spieltag und 3 Spieltage danach anzeigen) ~~
* ~~ Ersatzwert für den Bearbeitungsmodus, wenn showgameday mit Bindung ~~ gesetzt ist
* ~~ Lieblingsclub markieren ~~
* ~~ steuerbarer Spieltag im Spieltag-Widget ~~

## Changelog
### 0.0.1
* initial release
### 0.0.2
* add controlable gameday logic to gameday widget and adapter
### 0.0.3
* fixed getting oids in vis runtime
### 0.0.4
* fixed more oids in vis runtime
### 0.0.5
* highlight favorite club, 
* Replacement value for edit mode if showgameday is set with binding, 
* widget gameday setting for start gameday an length (-1,3 = show previous gameday and 3 gamedays after that) 
* some documentation 
* remove unused code
* new widget: next x games of club
* fix issue for dynamic with of club column
### 0.0.6
* NPM deployment and preperation for the latest repository
### 0.0.7
* close connections and remove observers (timeouts/intervals)
### 0.0.8
* new widget games of favorite clubs with multi league support as replacement for the old one
### 0.0.9
* optional weekday for widgets: gameday and gamesoffavclub,highlight the clubname in gamesoffavclub
### 0.0.10
* widget gameday: optional you can show informations about the goalgetters
### 0.0.11
* widget gameday: fix issue with not working gamedaycount
### 0.8.0
* push version for latest repository. fix some typos. fix a problem with date handling on different OS

## License
MIT License

Copyright (c) 2020 oweitman

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