---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fitbit-api/README.md
title: ioBroker.fitbit
hash: sUMdAh3gtrwrv5Q5anEMOYW8avty7evQcSHyUvhfQOw=
---
![Logo](../../../en/adapterref/iobroker.fitbit-api/admin/fitbit-api.png)

# IoBroker.fitbit
Dieser Adapter bezieht Daten aus der Fitbit-API!

## Aufbau
![Schritt 1](../../../en/adapterref/iobroker.fitbit-api/img/step1.png)

Klicken Sie auf die Schaltfläche "Autorisieren".

Danach können Sie aufgefordert werden, Ihre Anmeldeinformationen erneut einzugeben, oder wenn der Browser-Cache immer noch aus Cookies besteht, kann dies automatisch erfolgen.

![Schritt 2](../../../en/adapterref/iobroker.fitbit-api/img/step2.png)

![Schritt 3](../../../en/adapterref/iobroker.fitbit-api/img/step3.png)

![Schritt 4](../../../en/adapterref/iobroker.fitbit-api/img/step4.png)

Dann erscheinen die `access token` und `refresh token`. Sie sind schreibgeschützt.

Wenn der Vorgang bei Ihnen nicht funktioniert, können Sie versuchen, das Zugriffstoken manuell abzurufen: https://dev.fitbit.com/apps/oauthinteractivetutorial

## Mehrere Benutzer
Um die Daten für mehrere Benutzer (z. B. Familienmitglieder) zu lesen, müssen Sie die Cookies im Browser löschen und eine zusätzliche Instanz dieses Adapters erstellen.

Wichtig: Wenn Sie die Browser-Cookies nicht löschen, werden Sie mit dem zuletzt gültigen Benutzer angemeldet.

## Entwicklung
Die API wurde gemäß https://dev.fitbit.com/build/reference/web-api/basics/ implementiert.

## Changelog

### 0.1.1 (2019-11-06)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright 2019, bluefox <dogafox@gmail.com>

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