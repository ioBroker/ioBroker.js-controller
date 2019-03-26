---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vcard/README.md
title: kein Titel
hash: UCPJo61e0J9T+5Ei3ugEPsnIWep5/zjz0mGKw0KDCYw=
---
![Logo](../../../en/adapterref/iobroker.vcard/admin/vcard.png)

#vCard Adapter für ioBroker
##Beschreibung:
Das Hauptaugenmerk des vCard Adapters liegt darauf, die Telefonnummern der Ausgänge des ioBroker.fritzBox Adapters zu ersetzen.

Dieser Adapter liest eine vCard-Datei und bietet die Möglichkeit:

a) Ausgabe von Namen (vollständige Namen) auf Outputs.FilteredFullNames.
b) Ausgabe von E-Mail-Adressen auf Outputs.FilteredEmailAddresses.
c) Ausgabe von Postadressen auf Outputs.FilteredPostalAddresses.
d) Ausgabe von E-Mail-Adressen auf Outputs.FilteredEmailAddresses.
e) Die Ausgabe von a), b), c) und d) kann ausgelöst werden, indem ein Suchmuster (das mit vollem Namen ausgeführt wird) auf Inputs.Filter gesetzt wird. Dieser Filter arbeitet bei Groß- und Kleinschreibung.
f) Wenn ein Wert auf Inputs.ReplacePhoneNumbersChX gesetzt ist (X: ist Kanalnummer), werden alle Telefonnummern in diesem Wert durch den entsprechenden vollständigen Namen ersetzt. Die Ausgabe wird in Outputs.ReplacedPhoneNumbersChX geschrieben. Der Ersatz ignoriert die Startnummern '0' und '+49' in deutschen Telefonnummern. Inputs.ReplacePhoneNumbersChX kann manuell, über ein Skript oder über eine direkte Verknüpfung festgelegt werden.
Geben Sie für die direkte Verknüpfung das entsprechende Objekt in den Einstellungen ein.
g) Outputs.TodaysBirthdays zeigt den vollständigen Namen aller Personen, die heute Geburtstag haben.
h) Wenn bei einer Ausgabe mehrere Ergebnisse vorhanden sind, werden die verschiedenen Ergebnisse durch einen HTML-Zeilenumbruch getrennt.

_Der Adapter wurde bisher mit Exporten von "Mac-Kontakten" und "Outlook" (vCard-Dateiversion 3.0) getestet.

### VCF-Pfad:
* Windows: c: /data/vcard.vcf
* Linux: /tmp/vcard.vcf
* http: http://192.168.1.1/data/vcard.vcf
* http (FritzBox Nas): http://192.168.1.1/nas/filelink.lua?id=164fe89123456789

### CSS-Beispiel (für feste Spaltenbreite):
** Style-Header: ** ` <style type="text/css"> spanVcard1 { display: inline-block; width: 300px; } </style> `

** Style Prefix: ** `<spanVcard1>`

** Style Postfix: ** `</spanVcard1>`

** Hinweis: Jeder Kanal benötigt ein eigenes Tag (z. B. spanVcard1, spanVcard2, spanVcard3, spanVcard4, spanVcard5)! **

##Voraussetzungen:
- [ioBroker] (http://www.ioBroker.net "ioBroker-Startseite")

##Änderungsprotokoll:
### 0.0.9 (2016-11-12)
* Die Kategorie der Adapter wurde geändert

0,08 (27.05.2016)
* Bugfixing neuer Channels

### 0.0.7 (2016-05-21)
* Tippfehler
* Liesmich aktualisiert

### 0.0.6 (2015-01-16)
* Tippfehler
* Liesmich aktualisiert

0.0 0.0 (2015-11-15)
* Lesen von Kontakten über http aktualisiert
* Mehrere Kanäle haben einen Ausgang abonniert
* CSS-Beispiel aktualisiert

### 0.0.4 (2015-11-6)
* Fehlende Abhängigkeit

### 0.0.3 (2015-10-25)
* Drei Kanäle zum Ersetzen von Zahlen
* Kanäle können mit den Ausgängen anderer Adapter verbunden werden (kein Skript erforderlich)
* Ersetzte Namen können durch CSS formatiert werden
* VCF-Dateien können über http gelesen werden

### 0.0.2 (2015-10-02)
* Aktualisierungen der Dokumentation
* Fehlendes Symbol
* vcard-json Problem mit Leerzeichen (in Outlook-Dateien)

### 0.0.1 (2015-09-18)
* Erste Version

##STUTZEN:
* Lesen von Kontakten über CardDav

## License
The MIT License (MIT)

Copyright (c) 2016 hometm 

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