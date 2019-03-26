---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: Ejk9bvs8M8TCDQBOLAEAJ5prrYoMaM1LdHgVm29BGwo=
---
![Logo](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![Tests](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

# IoBroker.roadtraffic ===================
## Über diesen Adapter
Dieser Adapter verwendet die Google Maps-API, um den Verkehr auf Ihren Routen zu überprüfen. Sie können mehrere Routen konfigurieren. Der Adapter überprüft die tatsächliche Verkehrssituation und zeigt Ihnen an, wie lange Ihre Reise dauert. (Im Moment wird die Zeit in Sekunden gespeichert).
Der Adapter befindet sich derzeit in einem sehr frühen Stadium. Ich plane, einen Wecker zu implementieren - damit Sie dem Adapter mitteilen können, wann Sie bei der Arbeit sein müssen - und was geschehen soll, wenn es Zeit ist, zu verlassen / aufzuwachen (Start Radio spielen und eine Ansage wie "Anscheinend gibt es einen Verkehrsstau auf Ihrer Route. Sie müssen jetzt aufstehen, um nicht bei der Arbeit zu spät zu sein!"
Fühlen Sie sich frei, einige Feature-Requests hier auf Github zu erstellen - öffnen Sie einfach eine Ausgabe dafür! ;)

## Fertig machen
Zuallererst: Möglicherweise machen Sie sich Sorgen über den Schritt "Rechnungskonto und Zahlungsmethode einrichten", nach dem Google Sie möglicherweise bei der Erstellung des Kontos fragt, um den API-Schlüssel zu erhalten. Keine Sorge! Google gibt Ihnen jeden Monat ein Guthaben von 200 $. (Weitere Informationen finden Sie unter https://cloud.google.com/maps-platform/pricing/sheet/). Sie können ~ 40.000 Anfragen pro Monat kostenlos erledigen.

So lass uns gehen:

1. Gehen Sie zu https://cloud.google.com/maps-platform/?apis=routes und melden Sie sich mit Ihrem Google-Konto an (oder erstellen Sie ein neues Konto, falls Sie noch keinen haben).

![Liesmich1](../../../en/adapterref/iobroker.roadtraffic/img/Readme1.png)

2. Wählen Sie einen Namen für Ihr Projekt. Sie können hier eingeben, was Sie möchten. Der Name dient nur zur Identifikation, falls in Ihrem Google-Konto mehrere Projekte laufen.

![Readme2](../../../en/adapterref/iobroker.roadtraffic/img/Readme2.png)

3. Richten Sie die Abrechnungs- und Zahlungsmethode für das Google-Konto ein (wie oben erwähnt - machen Sie sich keine Sorgen - Sie erhalten 200 $ Gutschrift pro Monat von Google für Ihr Abrechnungskonto).

Wenn Sie sich immer noch Sorgen machen, überprüfen Sie diese Seite: https://cloud.google.com/maps-platform/pricing/sheet/).

![Readme3](../../../en/adapterref/iobroker.roadtraffic/img/Readme3.png)

4. Beenden Sie Ihr Google API-Setup

![Readme4](../../../en/adapterref/iobroker.roadtraffic/img/Readme4.png)

5. Kopieren Sie Ihren API-Schlüssel in die Zwischenablage.

![Readme5](../../../en/adapterref/iobroker.roadtraffic/img/Readme5.png)

6. Öffnen Sie die Instancesettings des roadtraffic-Adapters in ioBroker und fügen Sie Ihren Google-API-Schlüssel in das Eingabefeld ein.

Danach können Sie auf das "Plus-Symbol" klicken, um Ihre erste Route einzurichten.

![Readme6](../../../en/adapterref/iobroker.roadtraffic/img/Readme6.png)

Nachdem Sie alle Informationen zum Konfigurationsdialogfeld eingegeben haben, klicken Sie auf "Speichern & Schließen".
Der Adapter sollte jetzt neu starten und Sie können loslegen!

## Changelog

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 BuZZy1337 <buzzy1337@outlook.de>

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