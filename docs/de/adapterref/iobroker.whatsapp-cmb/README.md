---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: tl1F5FmMp2oEUTrvyhB8/IbpMO4qqvYxZvBnT6pGcjk=
---
![Logo](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.whatsapp-cmb.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/ioBroker/ioBroker.whatsapp-cmb/badge.svg)
![NPM](https://nodei.co/npm/iobroker.whatsapp-cmb.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.whatsapp-cmb/master.svg)

# IoBroker.whatsapp-cmb
## WhatsApp-Cmb-Adapter für ioBroker
Dank des kostenlosen Dienstes [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) können Sie mit diesem Adapter WhatsApp-Nachrichten an sich selbst oder eine andere Nummer senden.

** Hinweis **: *Die kostenlose API ist nur für den persönlichen Gebrauch bestimmt!*

### Aufbau
*Die folgende Dokumentation wurde von der Seite [Callmebot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) kopiert.*

Sie müssen den API-Schlüssel vom Bot erhalten, bevor Sie die API verwenden können:

- Fügen Sie die Telefonnummer +34 644 10 55 84 zu Ihren Telefonkontakten hinzu. (Nennen Sie es wie Sie möchten.)
- Senden Sie diese Nachricht "Ich erlaube Callmebot, mir Nachrichten zu senden" (auf Englisch) an den neu erstellten Kontakt (natürlich mit WhatsApp).
- Warten Sie, bis Sie die Meldung `API Activated für Ihre Telefonnummer erhalten. Ihr APIKEY ist 123123` vom Bot. Da dies noch im Beta-Test ist, kann die Aktivierung bis zu 2 Minuten dauern.
- Die WhatsApp-Nachricht vom Bot enthält den API-Schlüssel, der zum Senden von Nachrichten über die API erforderlich ist.
- Sie können jetzt den API-SCHLÜSSEL in der ioBroker-Konfiguration verwenden.

Beispiel: ![Beispiel](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

### Verwendung
Es gibt zwei Möglichkeiten, eine Nachricht zu senden:

- über `whatsapp-cmb.0.sendMessage`. Schreiben Sie einfach einen Text in diesen Status und die Nachricht wird an die Standardnummer gesendet, die im Einstellungsdialog konfiguriert wurde.
- per Nachricht vom Javascript-Adapter:

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Blockly](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

<! - Platzhalter für die nächste Version (am Zeilenanfang):

### __WORK IN PROGRESS__ ->

## Changelog
### 0.1.3 (2020-08-29)
* (bluefox) The documentation and translations were added.

### 0.0.1 (2020-08-27)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 Bluefox <dogafox@gmail.com>

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