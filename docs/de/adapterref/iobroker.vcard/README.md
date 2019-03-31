---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vcard/README.md
title: vCard Adapter für ioBroker
hash: rUHMx/sduIGMe3JSK2JEegk6Z/mN1Wdwbdw1sMIrHBg=
---
![Logo](../../../en/adapterref/iobroker.vcard/admin/vcard.png)

# VCard Adapter für ioBroker
## Beschreibung
Das Hauptaugenmerk des vCard-Adapters liegt darauf, die Telefonnummern der Ausgänge des ioBroker.fritzBox-Adapters zu ersetzen.

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

### VCF-Pfad
* Windows: c: /data/vcard.vcf
* Linux: /tmp/vcard.vcf
* http: http://192.168.1.1/data/vcard.vcf
* http (FritzBox Nas): http://192.168.1.1/nas/filelink.lua?id=164fe89123456789

### CSS-Beispiel (für feste Spaltenbreite)
** Style-Header: **

```
<style type="text/css">
spanVcard1 {
display: inline-block;
width: 300px;
}
</style>
```

** Style Prefix: ** `<spanVcard1>`

** Style Postfix: ** `</spanVcard1>`

** Hinweis: Jeder Kanal benötigt ein eigenes Tag (z. B. spanVcard1, spanVcard2, spanVcard3, spanVcard4, spanVcard5)! **

## Voraussetzungen:
- [ioBroker] (http://www.ioBroker.net "ioBroker-Startseite")

## LOP
* Lesen von Kontakten über CardDav

## Changelog

### 0.0.9 (2016-11-12)
* Addapter category changed 

### 0.0.8 (2016-05-27)
* Bugfixing new Channels  

### 0.0.7 (2016-05-21)
* Typos  
* Readme updated  

### 0.0.6 (2015-01-16)
* Typos  
* Readme updated  

### 0.0.5 (2015-11-15)
* Reading contacts via http updated  
* Multiple channels subscribed to one output fixed  
* CSS Example updated

### 0.0.4 (2015-11-6)  
* Missing dependency  

### 0.0.3 (2015-10-25)
* Three channels for replacing numbers
* Channels can be connected to outputs of other adapters (no script needed)
* Replaced names can be formated by CSS  
* VCF files can be read via http

### 0.0.2 (2015-10-02)
* Documentation updates
* Missing icon
* vcard-json issue with white spaces (inside Outlook files)

### 0.0.1 (2015-09-18)
* Initial version

## License
![Number of Installations](http://iobroker.live/badges/vcard-installed.svg) ![Number of Installations](http://iobroker.live/badges/vcard-stable.svg) The MIT License (MIT)

Copyright (c) 2016-2019 hometm 

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