---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parser/README.md
title: kein Titel
hash: Lg4GUIwP3rQm33R0Vu1O+kha1iJ3jJ3EourbBn5IJIc=
---
![Logo](../../../en/adapterref/iobroker.parser/admin/parser.png) ioBroker Parser Adapter

![Anzahl der Installationen](http://iobroker.live/badges/parser-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.parser.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.parser.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.parser.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.parser.png?downloads=true)

=================

Dieser Adapter analysiert Daten, die über eine URL oder aus einer Datei empfangen wurden, mithilfe regulärer Ausdrücke. Für jede Regel, die in den Einstellungen dieses Adapters konfiguriert wird, wird ein Status unter `parser.<instance number>` erstellt und mit den analysierten Informationen gefüllt und aktualisiert.

## Die Einstellungen
### 1. Standard-Abfrageintervall
Dieser Standard-Abfrageintervallwert wird verwendet, wenn für einen Eintrag in der Konfigurationstabelle (Spalte: "Intervall") kein einzelner Abfrageintervallwert angegeben ist. Das Intervall ist in Millisekunden angegeben und definiert, wie oft der Link oder die Datei gelesen und die Status aktualisiert werden.

** Hinweis: ** Verwenden Sie kein zu aggressives Abfrageintervall, insbesondere für Website-URLs. Wenn Sie zum Beispiel den Preis Ihrer Aktien von einer bestimmten Website abrufen möchten, sollten Sie mit einem Intervall von nur 24 Stunden (= 86400000 ms) gut zurechtkommen, wenn Sie kein Daytrader sind. Wenn Sie versuchen, zu oft Daten von bestimmten URLs abzurufen, werden Sie möglicherweise von der Website gesperrt und auf eine Server-Blacklist gesetzt. Verwenden Sie daher das Abfrageintervall mit Vorsicht.

### 2. Tabelle
Klicken Sie auf die Schaltfläche "Plus", um der Tabelle einen neuen Eintrag hinzuzufügen.

Tabellenfelder:

- ***Name*** - Name des Staates, der unter `Parser. <Instanznummer>` erstellt wird. Leerzeichen sind nicht erlaubt. Sie können Punkte "." als Trennzeichen zum Erstellen von Unterordnern. Beispiel: `Shares.Microsoft.Current` führt zu` Parser. <Instanznummer> .Shares.Micosoft.Current`.
- ***URL oder Dateiname*** - entweder eine URL einer Website oder der Pfad zu einer Datei, von der wir Informationen abrufen möchten. Beispiele `https:// darksky.net / forecast / 48.1371,11.5754 / si24 / de` (Wetterinformation München) oder` / opt / iobroker / test / testdata.txt` (Datei aus ioBroker).
- ***RegEx*** - regulärer Ausdruck, wie Daten aus dem Link extrahiert werden. Es gibt einen guten Service zum Testen von Regula-Ausdrücken: [regex101] (https://regex101.com/). Z.B. * temp swip "> (-? \ d +) ˚ <* für die obige Zeile.
- ***Item*** (deutsch: "Num") - Ein Regex kann mehrere Einträge finden (abgleichen). Mit dieser Option können Sie festlegen, welche Übereinstimmung ausgewählt werden soll. 0 = erste Übereinstimmung, 1 = zweite Übereinstimmung, 2 = dritte Übereinstimmung usw. Die Standardeinstellung ist 0 (erste Übereinstimmung).
- ***Rolle*** - eine der Rollen:
    - custom - user definiert sich über * admin "die Rolle
    - Temperatur - Der Wert ist die Temperatur
    - value - der Wert ist eine Zahl (z. B. dimmer)
    - blinds - der Wert ist eine Blindposition
    - switch - der Wert ist die Schalterstellung (true / false)
    - button - der Wert ist eine Schaltfläche
    - indicator - Boolescher Indikator
- ***Typ*** - Der Variablentyp gemäß dem Pulldown-Menü.
- ***Item*** - Nummer des gefundenen Elements, beginnend mit 0.
- ***Einheit*** - Optional: Einheit des Werts, der dem Staatseintrag hinzugefügt wurde. Z.B. `°C`,` € `,` GB` usw.
- ***Alt*** - Wenn diese Option aktiviert ist, wird der Status *nicht* aktualisiert, wenn der Wert im angegebenen Datum (URL oder Datei) nicht gelesen oder gefunden werden kann. In diesem Fall wird der vorherige Wert beibehalten.
- ***Subs*** - Optional: URL oder Dateiname ersetzen. Diese Ersatz-URL / Dateiname wird verwendet, wenn die URL / der Dateiname der ersten Spalte nicht verfügbar ist.
- ***Faktor / Offset*** (nur für "Typ" -Nummern) - Ermöglicht das Ändern der abgerufenen Daten, bevor sie in den Status versetzt werden:

* berechneter Wert * = * extrahierter Wert * * Faktor + Offset, um sofort Wertänderungen vorzunehmen

- ***Interval*** - Abfrageintervall in ms (Millisekunden). Wenn leer oder 0, wird das Standard-Abfrageintervall verwendet. Weitere Informationen finden Sie oben.

## Beispieleinstellungen
| Name | URL oder Dateiname | RegEx | Rolle | Typ | Einheit | Intervall |
|-------------------|:-----------------------------------------------------|:----------------------|--------------|---------|------|----------|
| temperaturMünchen | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<` | Temperatur | nummer | °C | 180000 |
| cloudRunning | `https://iobroker.net/` | `Privacy Notice` | Anzeige | Boolescher Wert | | 60000 |
| cpuTemperature | `/sys/devices/virtual/thermal/thermal_zone0/temp` | `(.*)` | Temperatur | nummer | °C | 30000 |
| stockPrice.Visa | `https://www.finanzen.net/aktien/visa-aktie` | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | Wert | nummer | € | 86400000 |
| stockPrice.Visa | https://www.finanzen.net/aktien/visa-aktie &quot;\ d {0,3}, \ d {2} (? = <span>EUR &lt;\ / span&gt;)&quot; | Wert | nummer | € | 86400000 |</span> |

* Hinweis: * Beim Anwenden von Regex auf die abgerufenen URL- / Dateidaten werden alle Zeilenumbrüche durch Leerzeichen ersetzt, um die Suche in mehreren Zeilen zu ermöglichen.

## Über reguläre Ausdrücke (RegExp)
Reguläre Ausdrücke sind ein leistungsfähiges Werkzeug zum Parsen und Extrahieren bestimmter Daten aus Zeichenfolgen, und noch wichtiger: Sie ermöglichen das Extrahieren bestimmter Werte / Texte aus einer bestimmten Zeichenfolge (z. B. aus dem HTML-Code einer Webseite oder Text aus einer Datei) durch Anwenden von Regeln .

Für Boolesche Typen ist der reguläre Ausdruck ziemlich einfach. Bei numerischen Typen sollten Sie die Nummer mit Klammern - "()" markieren. Z.B. um die Zahl zu extrahieren *Die Temperatur beträgt 5 °C* Sie sollten den Ausdruck "(\ d +)" verwenden.

Weitere Informationen zu RegExp:

  * [MDN / Mozilla-Dokumentation] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  * [regex101: Online-Tool zum Erstellen und Testen von regulären Ausdrücken] (https://regex101.com/)

### Beispiele
- *.at* entspricht einer beliebigen Zeichenfolge mit drei Zeichen, die mit "at" endet, einschließlich "hat", "cat" und "bat".
- *[hc] at* stimmt mit "hat" und "cat" überein.
- *[^ b] at* entspricht allen Zeichenfolgen, die mit .at übereinstimmen, mit Ausnahme von "bat".
- *[^ hc] at* entspricht allen Zeichenfolgen, die mit .at übereinstimmen, mit Ausnahme von "hat" und "cat".
- *^ [hc] at* stimmt mit "hat" und "cat" überein, jedoch nur am Anfang der Zeichenfolge oder Zeile.
- *[hc] at $* stimmt mit "hat" und "cat" überein, jedoch nur am Ende der Zeichenfolge oder Zeile.
- *\ [. \]* stimmt mit jedem einzelnen Zeichen überein, das von "[" und "]" umgeben ist, da die Klammern ausgeblendet sind, zum Beispiel: "[a]" und "[b]".
- * s. \ ** stimmt mit s überein, gefolgt von null oder mehr Zeichen, zum Beispiel: "s" und "saw" und "seed".
- *[hc] + at* entspricht "hat", "cat", "hhat", "chat", "hcat", "cchchat" usw., jedoch nicht "at".
- *[hc]? at* entspricht "hat", "cat" und "at".
- * [hc] \ * at * stimmt mit "hat", "cat", "hhat", "chat", "hcat", "cchchat", "at" usw. überein.
- *cat | dog* entspricht "cat" oder "dog".
- *(\ d +)* - Ermittelt die Nummer aus dem String
- *now (\ w +)* later - erhalte das Wort zwischen "now" und "later"

### Andere nützliche Ausdrücke
- (-? \ d +) erhält eine Zahl (sowohl negative als auch positive Zahlen)

## Qualitätscodes
Werte können Qualitätscodes haben:

- 0 - OK
- 0x82 - Die URL oder Datei kann nicht gelesen werden.
- 0x44 - Zahl oder Zeichenfolge im Text nicht gefunden

## Unterstützung
1. Allgemein: [ioBroker Forum] (https://forum.iobroker.net/). Deutschsprachige Benutzer: siehe [ioBroker Forum Thread Parser-Adapter] (https://forum.iobroker.net/topic/4494/adapter-parser-regex).
2. Bei Problemen lesen Sie bitte [ioBroker Parser Adapter: Github Issues] (https://github.com/ioBroker/ioBroker.parser/issues).

## Changelog
### 1.0.7 (2018-10-08)
* (bluefox) Comma will be replaced automatically by point for the offset and for the factor

### 1.0.6 (2018-09-22)
* (bluefox) fix parser

### 1.0.5 (2018-08-30)
* (bluefox) Multi-line search allowed

### 1.0.2 (2018-08-06)
* (bluefox) Iterations in regex were corrected

### 1.0.1 (2017-12-10)
* (bluefox) Added additional option: old value

### 1.0.0 (2017-05-19)
* (bluefox) Allow set the number of found item

### 0.2.2 (2017-04-03)
* (Apollon77) fix handling of multiple fields for one URL

### 0.2.1 (2017-02-24)
* (bluefox) fix error with timestamp

### 0.2.0 (2017-02-01)
* (bluefox) Add visual test

### 0.1.1 (2017-01-30)
* (bluefox) move to common group

### 0.0.1 (2017-01-16)
* (bluefox) initial commit