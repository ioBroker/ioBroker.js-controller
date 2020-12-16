---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.contactid/README.md
title: ioBroker.contactid
hash: oBxuLRhlt78n2XXNk74mEFQfg20OY49N3c+cguw4iq4=
---
![Logo](../../../en/adapterref/iobroker.contactid/admin/contactid.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.contactid.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.contactid.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/contactid-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/contactid-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/schmupu/iobroker.contactid.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/schmupu/ioBroker.contactid/badge.svg)
![NPM](https://nodei.co/npm/iobroker.contactid.png?downloads=true)

# IoBroker.contactid
** Tests: ** ![Testen und freigeben](https://github.com/schmupu/ioBroker.contactid/workflows/Test%20and%20Release/badge.svg)

Das Protokoll Kontakt-ID, das von Alarmsystemen zur Kommunikation mit Zentralstationen verwendet wird.

Dieser Adapter ist ein Contact ID Server. Wenn ein Alarmereignis ausgelöst wird, sendet das Alarmsystem über IP die Kontakt-ID-Nachricht an die Zentralstation.
Sie können ioBroker mit diesem Adapter als Zentralstation verwenden. Zum Beispiel. Sie können per Conntact ID eine Telegrammnachricht für einen Alarm senden.

Die Kontakt-ID-Nachricht

  SSSS 18QEEEGGZZZC

  * SSSS - Abonnent. Diese vier Ziffern identifizieren das spezifische Alarmsystem oder den Kunden für die Zentralstation. ioBroker erlaubt längere Teilnehmernamen.

  * 18 - Nachrichtentyp. Grundsätzlich sollte dieses Feld immer "18" sein.
  * Q - Event Qualifier.
  * EEE - Ereigniscode.
  * GG - Gruppen- / Partitionsnummer.
  * ZZZ - Zonennummer (001 - 999). Dies ist die Nummer der Zone, die den Alarm ausgelöst hat.
  * C - Prüfsumme.

[Kontakt-ID-Protokoll](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

## Installation & Konfiguration
1. Installieren Sie den Adapter
2. Konfiguration des Adapters:

Wählen Sie die IP-Adresse und den Port aus, um auf Conctact-ID-Anforderungen zu warten.
Registrieren Sie Ihren Abonnentennamen, um Ihre Einbruchalarmmeldungen zu identifizieren, und wählen Sie Ihren Einbruchalarmtyp aus.

3. Konfigurieren Sie Ihr Einbrechersystem so, dass Kontakt-ID-Nachrichten gesendet werden

    Lupusec XT1:

Einstellungen -> Kontakt-ID: rptn: // subcriber @ ip-address-iobroker: port Beispiel: rptn: //test@192.168.20.1: 50000

    Lupusec XT1 + / XT2 / XT2 + / XT3:

Einstellungen -> Kontakt-ID: ip: // subcriber @ ip-address-iobroker: port / CID Beispiel: ip: //test@192.168.20.1: 50000 / CID

4. Testen des Adpaters

  Öffnen Sie die Befehlsshell und geben Sie ein

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

Jetzt können Sie eine Kontakt-ID-Nachricht senden. Bei Lupsec-Einbruchmeldesystemen beginnt und endet die Meldung mit [und]. Geben Sie Ihre Telnet-Sitzung ein:

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

  Jetzt können Sie die Nachricht in den ioBroker-Objekten sehen

## Changelog

### 1.0.2 (2020.12.13)
* (Stübi) Bugfixing, ACK-invalid Format - Issue #14 

### 1.0.1 (2019.10.14)
* (Stübi) Bugfixing, Issue #9

## License
MIT License

Copyright (c) 2020 Thorsten Stueben <thorsten@stueben.de>

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