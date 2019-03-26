---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parser/README.md
title: kein Titel
hash: 1xpg1MP1AYgU5c5rd9cDJwleBI8cpRXpm7lzvwoML1U=
---
![Logo](../../../en/adapterref/iobroker.parser/admin/parser.png) ioBroker-Parseradapter ===================

![Anzahl der Installationen](http://iobroker.live/badges/parser-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.parser.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.parser.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.parser.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.parser.png?downloads=true)

Dieser Adapter ermöglicht das Analysieren der über eine URL oder in Dateien mit regulären Ausdrücken erhaltenen Daten.

## Die Einstellungen
### Standardabfrageintervall
Dieser Wert wird verwendet, wenn für den Eintrag kein Abrufintervall angegeben wurde. Das Intervall ist in Millisekunden und beschreibt, wie oft der Link oder die Datei gelesen wird.

### Tabelle
Mit dem Plus-Button werden die neuen Einträge zur Tabelle hinzugefügt.

Tabellenfelder:

- *Name* - ist der Statusname und darf keine Leerzeichen enthalten.
- * URL oder Dateiname * - ist der URL-Link wie * https://darksky.net/forecast/48.1371,11.5754/si24/de* für das Wetter in München.
- * RegEx * - regulärer Ausdruck, wie Daten aus der Verknüpfung extrahiert werden. Es gibt einen guten Service zum Testen von Regula-Ausdrücken: [regex101] (https://regex101.com/). Z.B. * temp swip "> (-? \ d +) ˚ <* für die obige Zeile.
- *Rolle* - eine der Rollen:
    - Benutzer definiert sich selbst über * admin "die Rolle
    - Temperatur - Der Wert ist Temperatur
    - value - Der Wert ist eine Zahl (z. B. Dimmer)
    - Jalousien - Der Wert ist eine Blindposition
    - switch - der Wert ist die Schalterposition (true / false)
    - button - der Wert ist ein Button
    - Anzeige - Boolesche Anzeige
- *Type* - Typ der Variablen. Einer von boolean, number, string, json.
- *Item* - Nummer des gefundenen Elements, beginnend mit 0.
- *Einheit* - Einheit des Wertes. Z.B. *°C*
- *Alt* - Wenn der Wert auf der Seite nicht gelesen oder gefunden werden kann, aktualisieren Sie nicht den tatsächlich gespeicherten Wert.
- *Subs* - Ersatzwerte. Dieser Wert wird verwendet, wenn Datei oder URL nicht verfügbar sind.
- *Faktor / Offset* - *berechneter Wert* = *extrahierter Wert* * Faktor + Offset, um den Wert sofort zu ändern. Wird nur für Zahlen verwendet.
- *Intervall* - Abfrageintervall in ms. Wenn nicht oder 0 eingestellt ist, wird das Standardintervall verwendet.

## Probeneinstellungen
| Name | URL oder Dateiname | RegEx | Rolle | Typ | Einheit | Intervall |
|-------------------|:-----------------------------------------------------|:----------------------|--------------|---------|------|----------|
| TemperaturMünchen | https://darksky.net/forecast/48.1371,11.5754/si24/de | Temp Swip "> (-? \ d +) ˚ <| Temperatur | Anzahl | °C | 180000 |
| forumRunning | http://forum.iobroker.net/ | Forum | Anzeige | boolean | | 60000 |
| cloudRunning | https://iobroker.net/ | Privatsphäre und Datenschutz | Anzeige | boolean | | 60000 |
| cpuTemperatur | / sys / devices / virtual / thermal / thermal_zone0 / temp | (. *) | Temperatur | Nummer | °C | 30000 |

* Hinweis: * Im empfangenen Text werden alle neuen Zeilen durch Leerzeichen ersetzt, um eine mehrzeilige Suche zu ermöglichen.

## Über reguläre Ausdrücke
Reguläre Ausdrücke sind ein leistungsfähiges Werkzeug zum Analysieren und Extrahieren der Daten aus Zeichenfolgen.

Sie können effektiv prüfen, ob Text in der Zeichenfolge enthalten ist, oder Text aus der Zeichenfolge in eine Variable extrahieren.

Für boolesche Typen reicht es aus, einfaches RegEx zu schreiben. Bei numerischen Typen sollten Sie die Zahl mit Klammern markieren - "()". Z.B. um die Zahl aus * zu extrahieren * Die Temperatur beträgt 5 °C * Sie sollten den Ausdruck "(\ d +)" verwenden.

Weitere Informationen zu Regex finden Sie hier: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp

### Beispiele:
- *.at* stimmt mit jeder aus drei Zeichen bestehenden Zeichenfolge überein, die mit "at" endet, einschließlich "Hut", "Katze" und "Schläger".
- *[hc] bei* entspricht "Hut" und "Katze".
- *[^ b] at* stimmt mit allen Strings überein, die mit .at übereinstimmen, mit Ausnahme von "bat".
- *[^ hc] at* stimmt mit allen Zeichenfolgen überein, die mit .at außer "Hut" und "Katze" übereinstimmen.
- *^ [hc] at* stimmt mit "hat" und "cat" überein, jedoch nur am Anfang der Zeichenfolge oder Zeile.
- *[hc] bei $* entspricht "hat" und "cat", jedoch nur am Ende der Zeichenfolge oder Zeile.
- *\ [. \]* entspricht jedem einzelnen Zeichen, das von "[" und "]" umgeben ist, da die Klammern mit Escapezeichen versehen sind, zum Beispiel: "[a]" und "[b]".
- * s. \ ** entspricht s gefolgt von null oder mehr Zeichen, z. B. "s" und "saw" und "seed".
- *[hc] + at* entspricht "hat", "cat", "hhat", "chat", "hcat", "cchchat" usw., aber nicht "at".
- *[hc]? at* entspricht "hat", "cat" und "at".
- * [hc] \ * at * entspricht "Hut", "Katze", "Hhat", "Chat", "Hcat", "Cchchat", "At" und so weiter.
- *cat | dog* entspricht "cat" oder "dog".
- *(\ d +)* - Liefert die Nummer von String
- *jetzt (\ w +)* später - erhalten Sie das Wort zwischen "jetzt" und "später"

### Die nützlichsten Ausdrücke
- (-? \ d +) erhält die Zahl negativ oder positiv

## Qualitätscodes
Werte können Qualitätscodes haben:

- 0 - OK
- 0x82 - Die URL oder Datei kann nicht gelesen werden.
- 0x44 - Zahlen- oder Stringwert nicht im Text gefunden

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