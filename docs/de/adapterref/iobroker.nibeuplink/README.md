---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nibeuplink/README.md
title: ioBroker.nibeuplink
hash: 4PF8iWYeBdP1zNnMEqZ9mpBA5xjpHTgjGpENlqW246o=
---
# IoBroker.nibeuplink

![Anzahl der Installationen](http://iobroker.live/badges/nibeuplink-installed.svg)
![Stabile Version](http://iobroker.live/badges/nibeuplink-stable.svg)

Dieser ioBroker-Adapter empfängt Daten von einer Nibe-Wärmepumpe von Nibe Uplink.

## Verwendung dieses Adapters
1. Du brauchst eine Nibe-Wärmepumpe - tschüss, wenn du nicht hast ;-)
2. Sie benötigen ein Konto bei Nibe Uplink: https://www.nibeuplink.com/
3. Nach der Anmeldung haben Sie eine URL in diesem Formular: https://www.nibeuplink.com/System/XXXXX/Status/Overview
4. Anstelle von XXXXX gibt es eine Nummer. Dies ist Ihre System ID. Wir brauchen diese ID.
5. Gehen Sie zu Nibe Uplink Api: https://api.nibeuplink.com/Account/LogIn und melden Sie sich an
6. Klicken Sie auf "MEINE ANWENDUNGEN" und dann auf "Anwendung erstellen".
7. Geben Sie Folgendes ein: Name und Beschreibung können alles sein, z. ioBroker
8. Die Rückruf-URL ist wichtig. Sie können https://z0mt3c.github.io/nibe.html verwenden
9. Akzeptieren Sie die NIBE Uplink API Services-Vereinbarung und klicken Sie auf "Anwendung erstellen".
10. Dann bekommst du einen Identifikator und ein Geheimnis - wir brauchen sie
11. Installieren Sie diesen Adapter in ioBroker
12. Auf der Adaptereinstellungsseite geben Sie den Bezeichner und das Geheimnis ein.
13. Klicken Sie auf den Link "Klicken Sie hier, um den Auth-Code für NIBE Uplink zu generieren."
14. Befolgen Sie die Anweisungen. Am Ende erhalten Sie Ihren Nibe-Fetcher-Code
15. Kopieren Sie diesen Code und fügen Sie ihn in den Adaptereinstellungen unter "Auth Code" ein.
16. Geben Sie Ihre System-ID über die Nibe Uplink-URL ein.
17. Wählen Sie Ihre Sprache.
18. Klicken Sie auf Speichern und schließen

Wenn Sie (später) einen Fehler "400 fehlerhafte Anforderung" im Protokoll erhalten, müssen Sie einen neuen Auth-Code erhalten - die Nummern 13 bis 15 und 18.

## Changelog

### 0.2.2
* Internal clean-up

### 0.2.1
* Dependencies updated
* Fix problem with nodejs 6 and the spread operator and async

### 0.2.0
* Code change to new template
* Support for Compact mode (js-Controller 2.0 Feature) added (#1)
* Translations in settings page
* Type moved from general to climate control

### 0.1.1
* Do not create deprecated sub path objects - only update them if present (if you have them and don't use them, you can delete them)
* info.connection added

### 0.1.0
* Objects tree changed: New, more readable objects added

### 0.0.2
* Language support for objects tree

### 0.0.1
* Initial release

## License
MIT License

Copyright (c) 2019 Sebastian Häßelbarth <seb@sebmail.de>

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