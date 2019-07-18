---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.linkeddevices/README.md
title: Objekt (Datenpunkt) verlinken
hash: sJ8Vym9Cn0EmgbYJG+B0IgjEQKfhM9SkZlVFUvWfLE8=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.linkeddevices.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.linkeddevices.svg)
![Anzahl der Installationen](http://iobroker.live/badges/linkeddevices-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Scrounger/iobroker.linkeddevices.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linkeddevices.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Scrounger/ioBroker.linkeddevices/master.svg)

<h1><img src="admin/linkeddevices.png" width="32"/> ioBroker.linkeddevices </h1>

## Linkeddevices adapter für ioBroker
[![paypal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

Erstellen Sie verknüpfte Objekte (Datenpunkte) Ihrer Geräte mit einer selbst definierten Struktur. Dadurch ist es möglich, in ioBroker eine Struktur zu erstellen, in der alle Objekte zentralisiert sind, z. in den vis oder scripts verwendet werden. Dies bietet beispielsweise den Vorteil, dass bei einem Hardwareaustausch nur die verknüpften Objekte neu erstellt werden müssen und alle vis und Skripte wieder funktionieren.

Mit dem Adapter können Sie Objekte konvertieren oder in andere Typen konvertieren (noch nicht vollständig implementiert).

<img src="screenshots/structure.png?sanitize=true&raw=true" title="Beispiel für selbst definierte Struktur"/>

Dieser Adapter ist an [Skript für virtuelle Geräte von Pman](https://forum.iobroker.net/topic/7751/virtual-devices) angelehnt.

# Objekt (Datenpunkt) verlinken
Ein Objekt (Datenpunkt) können Sie über den Button 'Einstellungen' im Menü 'Objekt' erstellen.

<img src="screenshots/object_tree_custom_button.png?sanitize=true&raw=true" title="Männer &#39;Objekt&#39;"/>

## Objekt (Datenpunkt) Einstellungen
<img src="screenshots/custom_dialog.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

Die folgenden Grundeinstellungen für das verlinkte Objekt vorgenommen werden:

| Eingabefeld | Beschreibung |
|---|---|
| Aktiviert | ein Verlinkung für das Objekt aktivieren |
| Préfix for ID des verlinkten Objektes | Bezeichung der Id des verlinkten Objekts vorangestellt werden soll |
| ID des verlinkten Objekts | Id des verlinkten Objektes |
| Zusammengesetzte Id des verlinkten Objektes | Zeigt an, wie die ID des verlinkten Objekts aussieht - Zusammensetzung von *'Préfix for ID des verlinkten Objekts' & 'ID des verlinkten Objekts'* |

Weiter k ihrnnt ihr noch folgende Einstellungen vornehmen:

| Eingabefeld | Beschreibung |
|---|---|
| Name des verlinkten Objekts | Hier können Sie einen Namen für die verlinkten Objekte festlegen |
| Experteneinstellungen für verlinktes Objekt vom Typ 'X' | weitere Einstellungen die abh�ngig vom Typ des Objekts sind. ([Weitere Informationen hierzu findest du weiter unten] (https://github.com/Scrounger/ioBroker.linkeddevices/blob/master/README.md#experteneinstellungen-f%C3%BCr-verlinktes-objekt-vom-typ-x )) <ul><li> [Zahl (readonly)] (https://github.com/Scrounger/ioBroker.linkeddevices/blob/master/README.md#experteneinstellungen-f%C3%BCr-verlinktes-objekt-vom-typ-zahl-readonly) </li><li> [Zahl](https://github.com/Scrounger/ioBroker.linkeddevices/blob/master/README.md#experteneinstellungen-f%C3%BCr-verlinktes-objekt-vom-typ-zahl) </ li> </ ul> |

** Beispiel: ** <img src="screenshots/example_create_linkedObject.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

## Experteneinstellungen für verlinktes Objekt vom Typ 'X'
Abh�ngig vom Typ (Zahl, Logigwert, Zeichenkette, etc.) des zu verlinkenden Objekts, k�nnt Ihr weitere Einstellungen, wie lautet Umrechnungen oder Umwandlungen in einen anderen Typ für das verlinkte Objekt einstellen.

### Experteneinstellungen für verlinktes Objekt vom Typ 'Zahl (readonly)'
<img src="screenshots/expert_settings_number_readonly.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

#### 'Zahl (readonly)': Konvertiere in Typ 'nicht umwandeln'
<img src="screenshots/expert_settings_number_readonly_no_conversion.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | erlaubte Eingabe | Beispiel (siehe Bild) |
|---|---|---|---|
| �ndere Einheit 'X' in | Einheit für das verlinkte Objekt festlegen | keine Beschrkungnkung | Objekt hat Einheit 'kWh', verlinktes Objekt hat Einheit 'Wh' |
| max. Anzahl der Nachkommastellen | max. Anzahl der Nachkommastellen für das verlinkte Objekt festlegen | Zahlen | Wert des Objekts '100.561' ergibt sich für das verlinkte Objekt den Wert '101' |
| �unter 'X' in | minimaler Wert der verlinkten Objekte annehmen darf | Zahlen | - |
| �ndere max 'X' auf | maximaler Wert der verlinkten Objekte annehmen darf | Zahlen | - |
| Umrechnung für verlinktes 'read' Objekt | mathematische Umrechnung des Wertes des Objektes | _ + - / * ,. () _ & * Zahlen * | Wert des Objektes '279688.9' mit Umrechnung '/ 1000' zeigt beim verlinkten Objekt den Wert '280.6889' an |

#### 'Zahl (readonly)': Konvertiere in Typ 'Logikwert'
<img src="screenshots/expert_settings_number_readonly_convert_to_boolean.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | erlaubte Eingabe | Beispiel (siehe Bild) |
|---|---|---|---|
| Bedingung 'true' für verlinktes Objekt | Wert des Objekts, für den das verlinkte Objekt auf 'true' gesetzt werden soll | *=! => <> = <=* + *Zahlen* | Für Werte '> 100' ist das verknüpfte Objekt 'true' |

### Experteneinstellungen für verlinktes Objekt vom Typ 'Zahl'
#### 'Zahl': Konvertiere in Typ 'nicht umwandeln'
<img src="screenshots/expert_settings_number_no_conversion.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | erlaubte Eingabe | Beispiel (siehe Bild) |
|---|---|---|---|
| �ndere Einheit 'X' in | Einheit für das verlinkte Objekt festlegen | keine Beschrkungnkung | Objekt hat keine Einheit, verlinktes Objekt hat Einheit '%' |
| max. Anzahl der Nachkommastellen | max. Anzahl der Nachkommastellen für das verlinkte Objekt festlegen | Zahlen | Wert des Objekts '100.561' ergibt sich für das verlinkte Objekt den Wert '101' |
| �unter 'X' in | minimaler Wert der verlinkten Objekte annehmen darf | Zahlen | - |
| �ndere max 'X' auf | maximaler Wert der verlinkten Objekte annehmen darf | Zahlen | - |
| Umrechnung für verlinktes Objekt | mathematische Umrechnung des Wertes des Objektes | _ / *, ._ & * Zahlen * | Wert des Objektes '180' mit Umrechnung '* 100/255' zeigt beim verlinkten Objekt den Wert '71' an. Umgekehrt wird der Kehrwert bei der Berechnung gebildet, d.h. wenn das verlinkte Objekt den Wert '71' hat, hat das Objekt den Wert '180'. Das kann dauern for Hue Lampen using the value area of '0-255' in '0% -100%' umzuwandeln |

#### 'Zahl': Konvertiere in Typ 'Logikwert'
<img src="screenshots/expert_settings_number_convert_to_boolean.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | erlaubte Eingabe | Beispiel (siehe Bild) |
|---|---|---|---|
| Bedingung 'true' für verlinktes Objekt | Wert des Objekts, für den das verlinkte Objekt auf 'true' gesetzt werden soll | *=! => <> = <=* + *Zahlen* | Für Werte '> 30' ist das verknüpfte Objekt 'true' |
| Wert wenn verlinktes Objekt 'true' ist | Value of object if the linked object 'true' is | Zahlen | Wird das verlinkte Objekt auf 'true' gesetzt, wird der Wert des Objekts '30' |
| Wert wenn verlinktes Objekt 'false' ist | Value of object if the linked object 'false' ist | Zahlen | Wird das verlinkte Objekt auf 'false' gesetzt, wird der Wert des Objekts '10' |

## Changelog

### 0.2.1
* (Scrounger) boolean to string converter added
* (Scrounger) bug fixes

### 0.2.0
* (Scrounger) number to boolean converter added
* (Scrounger) number expert settings for min, max added
* (Scrounger) bug fixes

### 0.1.5
* (Scrounger) expert settings properties renamed -> you must recreate your expert settings for all parent objects !!!
* (Scrounger) custom dialog prepared for convert to other type
* (Scrounger) bug fixes

### 0.1.0
* (Scrounger) custom dialog layout changed
* (Scrounger) conversion bug fixes
* (Scrounger) change unit bug fixes

### 0.0.4
* (Scrounger) main function added
* (Scrounger) change unit for linked objects
* (Scrounger) set number of decimal places for linked objects
* (Scrounger) set conversion for read only linked objects

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger

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