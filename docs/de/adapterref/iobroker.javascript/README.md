---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.javascript.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.javascript.png?downloads=true
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
---
Der javascript-Adapter dient dazu komfortabel Skripte zu erstellen, editieren und zu verwalten.


## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)Konfiguration


![Einstellungsmenü Javascript Adapter](img/javascript_Einstellungen-Javascript.png)
   Die eigentliche Konfiguration besteht aus der Eingabe von zusätzlichen zu ladenden npm-Module (durch Komma getrennt), sowie der Geo-Koordinaten, die für diverse Berechnungen benutzt werden sollen. Um die Koordinaten zu erhalten, kann man z.B. _google maps_ ziemlich weit aufzoomen und an der gewünschten Stelle anklicken. Die Koordinaten werden dann angezeigt. Nach dem Speichern muss der Adapter noch über die rote Play-Taste aktiviert werden aktiviert werden.

* * *

## Bedienung

Bei der Installation wird ein weiterer Reiter _Scripte_ in der _Admin_-Oberfläche gezeigt. Hier wird ein neuer Ordner angelegt indem auf das (+) in der Symbolleiste (roter Kreis) geklickt wird.  Ein neues Skript wird über das "leere Blatt"-Icon links davon angelegt. Ein Fenster öffnet sich und fragt den Namen und Speicherort in der Ordnerstruktur ab. 
![Javascript Adapter](img/javascript_Javascript-Adapter.png)


### Ordner- und Dateiliste

Die Ordnerstruktur kann nach eigenem Wunsch angelegt werden. Der Speicherort hat keine Auswirkungen auf die Funktionalität des Skriptes. Neben der Baumstruktur gibt es eine Listenansicht. Ein Suchfeld erleichtert das Wiederfinden von Skripten. Damit ein Skript läuft, muss es links in der Ordnerstruktur durch klick auf den roten _Play_-Knopf aktiviert werden. Zum Stoppen auf den grünen _Pause_-Knopf drücken. Für jedes Skript wird ein neues Objekt angelegt. Es trägt den Skriptnamen mit dem Zusatz `_enabled` und liegt im Ordner `javascript.Instanz.ScriptEnabled`. Das Objekt zeigt mit (`true/false`) an, ob das Skript läuft. Der Zustand kann auch gesetzt werden, um das Skript ein-/auszuschalten. Skripte, die im Ordner _global_ gespeichert wurden, sind globale Skripte. Diese werden intern vor jedes andere Skript kopiert, also vorher abgearbeitet. Somit lassen sich globale Funktionen auf mehrere Skripte anwenden. Variablen in globalen Skripten können in anderen Skripten benutzt werden. Aber Achtung: Jedes Skript hat seinen eigenen Variablen-Raum. Man kann Variablen in globalen Skripten also nicht dazu benutzen um Werte zwischen Skripten auszutauschen. Dazu müssen zwingend Objekte (States) genutzt werden.  

### Editor

Nach dem Anlegen öffnet sich rechts der Editor für _Javascript_. Einige Beispielskripte finden sich [hier](http://www.iobroker.net/docu/?page_id=2786&lang=de).

#### Name

Hat man vorher einen Namen vergeben, wird dieser hier angezeigt und kann geändert werden.

#### Speicherort

In diesem Dropdown werden alle angelegten Ordner angezeigt. Zur Zeit sind sie in der chronologischen Folge ihrer Erstellung sortiert.

#### Enginetyp

hier kann ausgewählt werden, ob mit der _javascript_ oder der _coffeescript_ engine gearbeitet werden soll.

#### Log

Rechts unten findet sich das Log-Fenster für die Ausgabe aller das markierte Skript betreffende Logs. Die Logs werden nach dem Abspeichern/Neustart des Skriptes angezeigt.

* * *

## Tipps

### Backup

Um Skripte im Zweifel wiederherstellen zu können, sei die Sicherung per _Copy & Paste_ empfohlen.

### Test-Instanz

Es hat sich bewährt, zum Testen von neuen Skripten, eine weitere Javascript-Instanz anzulegen und das Skript in dieser Instanz zu starten. 
Hinter dem Skriptnamen lässt sich per Dropdown die gewünschtes Instanz einstellen. 
Sollte im Skript ein schwerwiegender Fehler sein, beendet sich nur diese zusätzliche Testinstanz, nicht die Produktivinstanz. 

![Instanz Javascript Adapter wählen](img/screen.jpg)

## Changelog
### 4.3.0 (2019-10-09)
* (bluefox) log handlers were implemented
* (bluefox) fixed the error with $ selector and with disabled subscribes

### 4.2.1 (2019-10-07)
* (bluefox) implement inter-script communication.
* (bluefox) Implemented the mirroring on disk
* (bluefox) Translation for other languages was added

### 4.1.17 (2019-08-xx)
* (bluefox) Optimization: do not make useless iterations
* (bluefox) Allow to make requests to sites with self/signed certificates

### 4.1.16 (2019-08-24)
* (bluefox) Fixed the errors in editor

### 4.1.15 (2019-08-24)
* (bluefox) Added the polish language to CRON
* (bluefox) Fixed the import of scripts

### 4.1.14 (2019-07-14)
* (bluefox) Fixed locale settings

### 4.1.13 (2019-06-02)
* (bluefox) fixed Monaco Loading
* (bluefox) added missing blockly element
* (AlCalzone) Improved the warning message when assigning a variable of wrong type to a state
* (thewhobox) Added selector blockly, language strings, regexp
* (thewhobox) Fixed Blockly bug
* (paul53) fixed for suncalc.getTimes between middle night and nadir

### 4.1.12 (2019-03-07)
* (bluefox) Schedule was corrected

### 4.1.8 (2019-02-03)
* (jkuehner) Updated the blockly to the latest code
* (bleufox) scriptEnabled variables not only for experts
* (bleufox) fixed one error with "cannot extract blockly"
* (bluefox) GUI fixes
* (bluefox) show problem scripts as yellow pause icon

### 4.0.12 (2019-01-20)
* (Apollon77/AlCalzone) fixes unwanted changes in last version
* (SchumyHao) Add Chinese support

### 4.0.11 (2019-01-14)
* (bluefox) add set/getBinaryState

### 4.0.7 (2018-12-25) Breaking changes - no IE support anymore
* (bluefox) Material UI
* (AlCalzone) monaco javascript editor

### 3.7.0 (2018-05-05)
* (bluefox) Used VM2 as sandbox. The script errors will be caught.
* (bluefox) refactoring: split into many modules
* (AlCalzone) Change TypeScript version range to include TS 3.0+

### 3.6.5 (2019-02-13)
* (bluefox) Error with formatDate was fixed

### 3.6.4 (2018-02-05)
* (bluefox) Pattern error is fixed

### 3.6.3 (2018-01-31)
* (bluefox) Fixing the CSS for CRON dialog
* (bluefox) Fixing the reorder of scripts

### 3.6.1 (2018-01-23)
* (bluefox) Pattern error is fixed

### 3.6.0 (2017-12-28)
* (bluefox) more translations are added
* (bluefox) update blockly engine

### 3.5.1 (2017-11-14)
* (bluefox) fixed: sometimes MSG is not defined
* (AlCalzone) TypeScript support (preparations)
* (bluefox) add sendToHost call
* (bluefox) protect exec call
* (bluefox) add getStateDelayed function

### 3.4.4 (2017-09-12)
* (soef) typo error in line number correction fixed

### 3.4.1 (2017-08-12)
* (soef) patternMatching optimized

### 3.4.0 (2017-08-06)
* (bluefox) Support of new admin

### 3.3.12 (2017-07-24)
* (bluefox) file and line info added to log outputs

### 3.3.11 (2017-07-18)
* (bluefox) fix build CRON block

### 3.3.9 (2017-06-18)
* (bluefox) Add the toggle blockly block

### 3.3.8 (2017-05-22)
* (Apollon77/bluefox) Accept for subscribes arrays of IDs

### 3.3.6 (2017-05-17)
* (bluefox) add the genitive month for formatDate

### 3.3.4 (2017-04-01)
* (bluefox) Catch error by request if host unavailable
* (bluefox) add "request" to script namespace

### 3.3.3 (2017-03-27)
* (bluefox)Fix stopScript

### 3.3.2 (2017-03-18)
* (bluefox) Support of system coordinates

### 3.3.1 (2017-03-15)
 * (bluefox) fix error if no scripts exists

### 3.3.0 (2017-03-14)
* (bluefox) all callbacks in try/catch

### 3.2.8 (2017-03-08)
* (bluefox) Translations

### 3.2.7 (2017-03-03)
* (bluefox) allow creation of states for other javascript instances

### 3.2.6 (2017-02-14)
* (bluefox) Fix import of scripts
* (bluefox) Ask to save before start the script

### 3.2.5 (2017-01-23)
* (bluefox) Extend compareTime function with astro features

### 3.2.4 (2017-01-13)
* (bluefox) fix stopScript

### 3.2.3 (2017-01-05)
* (bluefox) Try to fix error with sayit

### 3.2.2 (2016-12-17)
* (bluefox) Allow with stopScript() to stop itself

### 3.2.1 (2016-11-24)
* (bluefox) Fix error with subscribe for only required states

### 3.2.0 (2016-11-14)
* (bluefox) Fix error with of blocks in adapters
* (bluefox) Support of subscribe for only required states
* (bluefox) add delFile
* (bluefox) fix error with names

### 3.1.0 (2016-10-12)
* (bluefox) Support of blocks in adapters
* (bluefox) Move sendTo blocks into adapters

### 3.0.10 (2016-09-30)
* (bluefox) New blocks: compare time, write state
* (bluefox) Documentation

### 3.0.9 (2016-09-20)
* (bluefox) Bugfixing of blockly

### 3.0.7 (2016-09-09)
* (bluefox) add ack for trigger in blockly
* (bluefox) add block to get info about trigger
* (bluefox) start description of blockly
* (bluefox) add runScript functions
* (bluefox) disable zoom on wheel in blockly
* (bluefox) fix block: time compare

### 3.0.6 (2016-09-07)
* (bluefox) add extendObject function
* (bluefox) add custom sendTo block
* (bluefox) add multiple trigger block

### 3.0.5 (2016-09-03)
* (bluefox) Fix sendTo blocks

### 3.0.4 (2016-09-01)
* (bluefox) Support of convert day of week into text in blockly

### 3.0.3 (2016-08-29)
* (bluefox) Fixed the convert date block

### 3.0.2 (2016-08-28)
* (bluefox) Change name of sandbox debug variable

### 3.0.1 (2016-08-27)
* (bluefox) Fix disabling of script

### 3.0.0 (2016-08-27)
* (bluefox) Beta Release with Blockly

## License

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker