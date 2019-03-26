---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.systeminfo/README.md
title: kein Titel
hash: foC/wzSvgAwpM+gnbhyD3KIRK/89kpPq4SNlySZNoDY=
---
![Logo](../../../en/adapterref/iobroker.systeminfo/./admin/systeminfo.png) Liest (und schreibt) Informationen aus System (en) ---

![NPM-Version](http://img.shields.io/npm/v/iobroker.systeminfo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.systeminfo.svg)
![Travis-CI-Build-Status](https://travis-ci.org/frankjoke/ioBroker.systeminfo.svg?branch=master)
![AppVeyor Build-Status](https://ci.appveyor.com/api/projects/status/pil6266rrtw6l5c0?svg=true)
![NPM](https://nodei.co/npm/iobroker.systeminfo.png?downloads=true)

## Adapter verarbeitet (System-) Informationen von eigenen oder anderen Systemen und Webquellen
Es generiert Zustände aus den Informationen, die es über verschiedene Methoden findet

* Befehle, die im Betriebssystem ausgeführt werden
* Dateien, die auf lokalen oder verbundenen Systemen gelesen werden sollen
* Ergebnisse von Webseiten oder APIs
* Nodejs-Tools-Befehle

* Befehle und Dateien funktionieren auch in beide Richtungen, was bedeutet, dass Sie auch Informationen in das System schreiben können.
* Dies ermöglicht den Zugriff und das Schreiben der GPIO-Pins auf Raspi oder OrangePi oder die Steuerung der grünen oder roten LEDs von Raspi / Opi
* Außerdem können Sie Systeminformationen abrufen / einstellen, auf die über / sys in Lunux zugegriffen wird
* Es wird ein "Systeminformationsteil" verwendet, der unter Windows und Linux funktioniert

Es verarbeitet Text-, HTML-, Json- und XML-Datentypen mit speziellen Abfragemechanismen.

### Hinweis
* Ich möchte mich bei einigen Modulen im Web bedanken, die ich mit meinem eigenen Code verwendet oder implementiert habe. Der Adapter verwendet einige externe Module wie [cheerio] (https://github.com/cheeriojs/cheerio), [Systeminformationen] (https://github.com/sebhildebrandt/systeminformation) und [node-schedule] (https: / /github.com/node-schedule/node-schedule) so wie sie sind. Es wurde auch durch den Code von [JSONPath] (http://goessner.net/articles/JsonPath/index.html#e2) und [scrape-it] (https://github.com/IonicaBizau/scrape-it) inspiriert. Ihr Code wurde jedoch nicht direkt verwendet, sondern für die unterschiedlichen Bedürfnisse neu implementiert.

## Aufbau
* In Adapter konfigurieren konfigurieren (Seite vergrößern)
* Ich habe ein Bild einer Beispielskonfiguration gespeichert [hier] (./admin/systeminfo.Config.jpg)
    * Das erste Element ist eine Befehlsliste, die beim Start des Adapters (Zeile für Zeile) ausgeführt wird. Es kann zum Einrichten der verwendeten GPIO-Ports verwendet werden.
    * Zeilen, die mit '`#`' beginnen, werden nicht ausgeführt
    * Wenn der erste Text "debug!" Ist, wird der Adapter in den Debug-Modus versetzt, der viel mehr Informationen anzeigt, was er zu ziehen versucht und erhält.
* Nach der Startkonfiguration wird die Konfigurationsliste für jede Datenquelle angezeigt
    * Namensfeld, das auch enthalten kann
        * Wenn ein Name mit "` - "beginnt, wird die Zeile ignoriert (ausgeschaltet), genauso wie wenn kein Zeitplan vorhanden ist
        * `[*]`, `[name, ...]`, `[name / (value)]` Syntax
        * Ohne eine der obigen Angaben wird der Name verwendet, um einen Zustand so zu erstellen, wie er ist.
        * Wenn `[]` verwendet wird, werden hier Namen mit unterschiedlichen Methoden eingefügt
            * `[*]` Wenn mehrere Elemente zurückgegeben werden, werden diese als Zahlen eingefügt. Beispiel: `Meldung []` würde `Meldung0`-` Nachricht (n) `erzeugen, wenn (n) Elemente zurückgegeben werden
            * `[Name1, Name2, ...]` erstellt genau diese Namen (Beispiel: System.Memory_ [verwendet, frei, verfügbar] `erstellt drei Zustände mit den Namen` System.Memory_used, System.Memory_free, System.Memory_available`)
            * `[Name / Wert]` entnimmt den Namen aus der Objekteigenschaft `Name` (kann anders sein) und den Wert aus der Eigenschaft` Wert`. Jede Eigenschaft oder jeder Wertname kann verwendet werden.
            * `[name /]` ohne einen Wert würde den Namen von `name 'übernehmen und für alle anderen in diesem Objekt gefundenen Eigenschaften Subzustände erstellen (Beispiel` System.Network. [iface /] `)

    * Der "Typ" und die "Quelle" der Informationsquelle, die sein kann
        * `file`: Das` source`-Feld beschreibt einen Dateinamen, der gelesen wird
        * `exec`: Das` source'-Feld beschreibt einen einzeiligen Befehl, der ausgeführt wird
        * `info`: Das` source`-Feld beschreibt eine einzeilige `systeminfo`-Befehlsfunktion
        * `web`: Das` source`-Feld beschreibt eine Web-URL, die gelesen wird (oder ein Objekt, das den Zugriff beschreibt, dies muss später dokumentiert werden!).
        * Die Anfragen werden zwischengespeichert, wenn gleichzeitig mehrere Einträge mit demselben Typ / Quellinhalt angefordert werden! Dies bedeutet, wenn Sie jede Minute die Ausführung eines Befehls planen und zwei verschiedene Datenelemente aus demselben Befehl herausnehmen, wird er nur einmal ausgeführt und nur der Datenfilter wird mehrmals angewendet.
        * Dies hilft, die gleiche Seite nicht mehrmals herunterzuladen, wenn Sie weitere Elemente speichern möchten.

    * Der `regexp / filter`` beschreibt, wie der empfangene Text entweder mit gefiltert wird
        * `Regexp`-Anweisung, bei der die einzelnen Elemente mit` () `umgeben werden müssen.

        Beispiel: `/lic\s+(\d+)K\s+(\d+)K\s+(\d+)/m` würde in allen Zeilen nach dem Text `lic` suchen, gefolgt von Leerzeichen und Zahlen, die mit `K` enden, und würde die 3 Zahlen zurückgeben. Dies wird im Linux-Befehl `df -BK` verwendet, um die Größe einer gemounteten NFS-Freigabe anzuzeigen, die im Namen mit 'lic' endet.

        * `JsonPath`-Anweisung. Ich habe eine spezielle Version von JsonPath erstellt, um Daten aus Json oder Javascript-Objekten auszuwählen.
            * Die Syntax besteht aus einer Reihe von Selektoren, die sein können
            * `name` ein Eigenschaftsname
            * `*` jedes Element in diesem Objekt. Dies können alle Eigenschaften sein. Wenn es sich bei dem Objekt um ein Array handelt, handelt es sich um Array-Elemente
            * `[(...)]` `` `auswerten, um den Namen der Eigenschaft zu erhalten, die ausgewählt wird. @ wird als Platzhalter für das aktuelle Objekt verwendet und kann in der eval-Anweisung verwendet werden.
            * `[? (...)]` Filtern Sie die Elemente dieses Elements nach ...,

            Beispiel: `list[?(@.user == 'pi')]` würde zuerst die Eigenschaft `list` (was ein Array ist) und Fileter auswählen, dann die Liste, indem nur diese Listenelemente ausgewählt werden, die `.user` auf `pi` setzen.

            * `[! (...)]` Gibt den ausgewerteten Wert als neues Element zurück. Auf diese Weise können Sie Ihre eigenen Daten aus den gefundenen Objekten berechnen.
            * `[Name1, Name2, Name3]` würde nur diese Eigenschaftsnamen auswählen
            * `[0]` würde nur das erste oder n-te Element oder die erste Eigenschaft auswählen
            * `[start: end: step]` nimmt die Elemente ab `start` und` <end` mit `step`. Alle müssen Zahlen sein oder leer bleiben. "start" und "end" können negativ sein, was bedeuten würde, dass sie vom ende kommen. Beispiel: `[1: -1: 2]` würde jedes zweite Element vom zweiten Element bis zum letzten Element verwenden. Die letzte wäre `[-1 ::]`, die ersten 3 wären `[: 3:]` und die letzten 3 wären `[-3 ::]`
            * `..` ist ein rekursiver Abstiegswähler, was bedeutet, dass '..name' den Namen der Eigenschaft in 'any dept' des Objekts auswählen würde!
    * `html WebObject query` Für den Fall, dass HTML analysiert wird, habe ich ein spezielles Abfragetool erstellt, um Elemente aus Web-Paqges auszuwählen, die jQuery ähneln. Dieses Werkzeug erstellt ein Objekt, das schließlich mit "JsonPath" analysiert wird. **Dokumentation folgt**

    * Der `convert`-Eintrag kann entweder sein
        * `json` für zu analysierende Json-Daten. Bei Web-Einträgen bedeutet dies, dass der empfangene Text direkt als Json behandelt wird und der Regex / Filter eine JsonParse-Anweisung / ein Filter ist.
        * `xml` für XML-Daten. Dies bedeutet, dass die empfangenen Daten von XML in Json konvertiert und wie oben beschrieben behandelt werden
        * `html` Erzeugt ein` cheerio`-Objekt, das dann mit der speziellen WebObject-Abfrage durchsucht wird
    * "number" oder "boolean" würde versuchen, den Wert in Zahlen oder Booleans umzuwandeln, wobei auf Booleans Zahlen> 0 wahr sind, aber auch Zeichenfolgen wie **on** oder **ein** und **true** auswerten wahr.
    * `...` Alles andere wie `! parseInt (@)` würde ausgewertet und in diesem Fall **true** zurückgegeben, wenn der Wert 0 ist, oder **false** wenn der Wert eine größere Ganzzahl ist.

    Das Feld `Rolle / Typ` beschreibt das ioBroker-Feld und kann eine Einheit benennen. Der normale Feldtyp ist Text oder der Wert, der in convert angezeigt wird.
        * `json` bedeutet, dass die Feldeigenschaft aus dem Objekt genommen wird
        * "Anzahl | MB" würde ein Zahlenfeld mit der Einheit MB (Megabytes) definieren.

    * `Write Command`-Feld beschreibt Anweisungen oder Evalierungen, die zum Zurückschreiben des Objekts verwendet werden. Im Moment funktioniert es nur für "exec" - oder "file" -Typen.
        * Für `exec` ist dies eine Befehlszeile, die @ (...)` - Anweisungen enthalten kann, die ausgewertet werden würden. Beispiel: `gpio write 1 @ (@? '0': '1')` würde in 'gpio write 1 0' übersetzt, wenn der Status wahr ist, und in 'gpio write 1 1', wenn es falsch ist. Dies steuert meine IR-LEDs, die aufleuchten, wenn der GPIO-Pin "low" (0) ist.
        * Bei `file` handelt es sich um einen einfachen Eval-Ausdruck, der ausgeführt und in die Datei geschrieben wird. Beispiel: `@? '1': '0' `würde '1' schreiben, wenn der Wert wahr ist, und '0', wenn es falsch ist.

    * Der letzte ist der "Zeitplan". Wenn es leer ist, wird der ite überhaupt nicht ausgeführt! Alle Zeitpläne, die genau denselben Wert haben, werden zusammen mit demselben Cache ausgeführt.
        * `cron-syntax` Sie können dieselbe 'cron'-Syntax verwenden wie OBroker InJavascript-Zeitpläne, die in [node-schedule] (https://github.com/node-schedule/node-schedule) beschrieben werden.
        Zeit-Syntax Ich habe eine spezielle Zeit-Syntax erstellt:?:? (:?) `, die es einfacher macht
            * '*: 16' würde diese Daten in Minute 15 jeder Stunde abfragen
            * `* / 2: 1: 1` würde jede zweite Stunde in der 1. Minute und 1 Sekunde anfordern.
            * `? s`,`? m`, `? h` mit? Da es sich um Ziffern> 0 handelt, wird die Anforderung alle? Sekunden, Monites oder Stunden ausgeführt. Sie können nicht mehrere Elemente gleichzeitig angeben.
        * Zeitpläne werden zur gleichen Zeit gruppiert. Wenn Sie die Sekunden wie im ersten Beispiel oben weglassen, wird sie einer Nummer zugewiesen, die versucht, die gleiche Sekunde für alle Elemente zu vermeiden. Dadurch werden nicht zu viele Befehle gleichzeitig ausgeführt.

## Bekannte Probleme
* Betatest, keine Schreibvorgänge auf Webseiten implementiert

## Wichtig / Wichtig
* Benötigt Knoten> = v4.5

## Installation
Mit ioBroker admin, npm install iobroker.systeminfo oder von <https://github.com/frankjoke/ioBroker.systeminfo>

## Changelog
### 0.3.0
* Added save and load config in admin screen

### 0.2.2
* First public beta includes jsonParse and WebQuery parse, jsonParse syntax mistake corrected for selectors
* New icon to separate it from info-Adapter

### 0.2.0
* First public beta includes jsonParse and WebQuery parse

### Todo for later revisions
* Allow import/export of configs to easily add new functions
* Allow access of web pages with authentication and also writing/postng web content

## License

The MIT License (MIT)

Copyright (c) 2017, frankjoke <frankjoke@hotmail.com>

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