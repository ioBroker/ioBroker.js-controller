---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.openligadb/README.md
title: ioBroker Adapter zum Abrufen der Ergebnisse von Fußball-Sportspielen von OpenLigaDB
hash: dbMnSe/XYVVMLqLRIGTAQqXErq/aPsuLgZ2gOvetPk0=
---
![Logo](../../../en/adapterref/iobroker.openligadb/admin/openligadb_b.png)

![Anzahl der Installationen](http://iobroker.live/badges/openligadb-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.openligadb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![Travis](https://img.shields.io/travis/oweitman/ioBroker.openligadb.svg)
![AppVeyor-Build-Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-openligadb.svg)
![GitHub Probleme](https://img.shields.io/github/issues/oweitman/ioBroker.openligadb.svg)

# IoBroker Adapter, um Ergebnisse von Fußball-Sportspielen von OpenLigaDB zu erhalten
## Überblick
Adapter zum Anfordern von Spieldaten für Fußball oder andere Spiele von openligadb.de

## Aufbau
Fügen Sie eine Instanz des Adapters hinzu und klicken Sie auf das Schraubenschlüsselsymbol. Im Formular können Sie die Verknüpfung aus einer Liga und einer Saison hinzufügen.
Bitte besuchen Sie openligadb.de für verfügbare Ligen, Jahreszeiten und Verknüpfungen. Wenn eine Saison über zwei Jahre verteilt ist, geben Sie bitte nur das Startjahr ein.

Beispieldaten für 1. Deutsche Bundliga sind Abkürzung = bl1 Saison = 2019

Wenn Sie die Konfiguration gespeichert und geschlossen haben, müssen kurze Zeit später neue Datenpunkte für Ihre Liga und Saison vorhanden sein.

## Vis und Widgets
Derzeit sind 3 Widgets verfügbar. Bitte geben Sie openligadb in den Widget-Filter ein

### Tabelle
Dieses Widget zeigt das aktuelle Ranking Ihrer Liga an

### Spieltag
Alle Spiele des aktuellen oder ausgewählten Spieltages. Es gibt viele Widget-Attribute, um die Menge der angezeigten Daten zu konfigurieren

### FavGame
Zeigen Sie alle aktuellen oder zukünftigen Spiele Ihrer Lieblingsclubs an

Die Dokumentation für die vis-Widgets ist in vis oder [Widget-Dokumentation / Deutsch](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html) verfügbar

## Machen
* Validierung im Widget, wenn der Benutzer nicht den richtigen Datenpunkt ausgewählt hat
* Übersetzung
* ~~ Tabellenmodi mit 1. Runde, 2. Runde ~~ erweitern
* ~~ neue Widget-Pivot-Tabelle der gespielten Spiele ~~
* ~~ neues Widget Goal Getter Ranking mit Sortierfunktion ~~
* ~~ Tabelle mit Trendzeichen erweitern (Pfeil nach oben / unten, Punkt ohne Änderung) ~~
* ~~ Tabelle erweitern, um mit x letzten Spielen zu berechnen ~~
* ~~ Tabelle erweitern, um das Ranking für einen definierten Spieltag zu berechnen ~~
* ~~ Dokumentationsadapter / Widget ~~
* ~~ Problem für Dynamik mit Clubspalte ~~ behoben
* ~~ neues Widget: nächste x Clubspiele ~~
* ~~ Widget-Spieltag Einstellung für den Start des Spieltages um eine Länge (-1,3 = vorherigen Spieltag und 3 Spieltage danach anzeigen) ~~
* ~~ Ersatzwert für den Bearbeitungsmodus, wenn der Spieltag mit Bindung ~~ eingestellt ist
* ~~ Lieblingsclub hervorheben ~~
* ~~ steuerbarer Spieltag im Spieltag-Widget ~~

## Changelog
### 0.11.0
* extend table to calculate with x last games and extend table to calculate ranking for a defined gameday, to ensure backward compatibility i have to create a new table v3 widget
* extend table with trend sign (arrow up/down, point for no change)
* new widget goal getter ranking with sort function
* new widget pivot table of played games
* extend table modes with 1st round,2nd round
### 0.10.3
* change computing and output logic of gameday widget to mark gameday header with favorite class
* improve documentation with css-klasses for  table widget
* bugfix for calculate gameday.
### 0.10.2
* Add data column goaldiff to table widget, improve more documentation (systax highlighting,copy code function), add example to control gameday with buttons,
### 0.10.1
* Improve documentation with more recipes and syntax highlighting, improve code to get and subscribe states
### 0.10.0
* New widget Table 2 that  includes the calculation of the total, home and away results. the previous widget is now deprecated, due to the different datapoint (allmatches) to be selected.
### 0.9.3
* Remove ES6 features due to compatibility with older browsers 
### 0.9.2
* next try to fix the experimental javascript binding function 
### 0.9.1
* fix bugs in calculation matchresults and highlight clubs in favgames 
### 0.9.0
* new Function for vis Binding to search for games at the actual day for favorite clubs, css-classes für games at actual day, fix bug to show the right match results, 
### 0.8.0
* push version for latest repository. fix some typos. fix a problem with date handling on different OS
### 0.0.11
* widget gameday: fix issue with not working gamedaycount
### 0.0.10
* widget gameday: optional you can show informations about the goalgetters
### 0.0.9
* optional weekday for widgets: gameday and gamesoffavclub,highlight the clubname in gamesoffavclub
### 0.0.8
* new widget games of favorite clubs with multi league support as replacement for the old one
### 0.0.7
* close connections and remove observers (timeouts/intervals)
### 0.0.6
* NPM deployment and preperation for the latest repository
### 0.0.5
* highlight favorite club, 
* Replacement value for edit mode if showgameday is set with binding, 
* widget gameday setting for start gameday an length (-1,3 = show previous gameday and 3 gamedays after that) 
* some documentation 
* remove unused code
* new widget: next x games of club
* fix issue for dynamic with of club column
### 0.0.4
* fixed more oids in vis runtime
### 0.0.3
* fixed getting oids in vis runtime
### 0.0.2
* add controlable gameday logic to gameday widget and adapter
### 0.0.1
* initial release

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