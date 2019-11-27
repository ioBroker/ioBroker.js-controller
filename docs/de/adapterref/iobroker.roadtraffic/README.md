---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: IUmLDzAkE5Cb6dAckIUOdrK6ff5u79VdmrRKAR9jGpw=
---
![Logo](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![Anzahl der Installationen](http://iobroker.live/badges/roadtraffic-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![Tests](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

# IoBroker.roadtraffic
## Über diesen Adapter
Dieser Adapter verwendet die Google Maps-API, um den Verkehr auf Ihren Routen zu überprüfen. Sie können mehrere Routen konfigurieren. Der Adapter überprüft die aktuelle Verkehrssituation und zeigt an, wie lange Ihre Reise dauern wird. (Im Moment spart es die Zeit in Sekunden).
Der Adapter befindet sich momentan in einem sehr frühen Stadium. Ich plane, einen Wecker einzurichten, damit Sie dem Adapter mitteilen können, zu welcher Zeit Sie arbeiten müssen und was passieren soll, wenn er aufsteht / aufwacht (Start) spiele Radio und mache eine Ansage wie "Es scheint, als stünde ein Stau auf deiner Route. Du musst jetzt aufstehen, um nicht zu spät zur Arbeit zu kommen!" auf Alexa etc.) ..
Fühlen Sie sich frei, einige Feature-Anfragen hier auf Github zu erstellen - eröffnen Sie einfach eine Ausgabe dafür! ;)

## Beginnen
Zuallererst: Möglicherweise sind Sie besorgt über den Schritt "Einrichten des Abrechnungskontos und der Zahlungsmethode", nach dem Sie von Google möglicherweise gefragt werden, wenn Sie das Konto erstellen, um den API-Schlüssel zu erhalten. Machen Sie sich keine Sorgen! Google gewährt Ihnen ein Guthaben von 200 US-Dollar pro Monat. Weitere Informationen erhalten Sie unter https://cloud.google.com/maps-platform/pricing/sheet/. Sie können ~ 40.000 Anfragen pro Monat kostenlos stellen.

So lass uns gehen:

1. Gehen Sie zu https://cloud.google.com/maps-platform/?apis=routes und melden Sie sich mit Ihrem Google-Konto an (oder erstellen Sie ein neues Konto, falls Sie noch keines haben).

![Readme1](../../../en/adapterref/iobroker.roadtraffic/img/Readme1.png)

2. Wählen Sie einen Namen für Ihr Projekt. Hier können Sie eingeben, was Sie wollen. Der Name dient nur zur Identifikation, falls Sie mehr als ein Projekt in Ihrem Google-Konto haben.

![Readme2](../../../en/adapterref/iobroker.roadtraffic/img/Readme2.png)

3. Richten Sie die Abrechnungs- und Zahlungsmethode für das Google-Konto ein (wie oben erwähnt - keine Sorge - Sie erhalten 200 $ Guthaben pro Monat von Google für Ihr Abrechnungskonto).

Wenn Sie immer noch besorgt sind, lesen Sie diese Seite: https://cloud.google.com/maps-platform/pricing/sheet/).

![Readme3](../../../en/adapterref/iobroker.roadtraffic/img/Readme3.png)

4. Beenden Sie Ihr Google API-Setup

![Readme4](../../../en/adapterref/iobroker.roadtraffic/img/Readme4.png)

5. Und kopieren Sie Ihren API-Schlüssel in die Zwischenablage.

![Readme5](../../../en/adapterref/iobroker.roadtraffic/img/Readme5.png)

6. Öffnen Sie die Instancesettings des roadtraffic Adapters in ioBroker und fügen Sie Ihren Google API Key in das Eingabefeld ein.

Danach können Sie auf das "Plus-Symbol" klicken, um Ihre erste Route einzurichten.

![Readme6](../../../en/adapterref/iobroker.roadtraffic/img/Readme6.png)

Nachdem Sie alle Informationen in den Konfigurationsdialog eingegeben haben, klicken Sie auf "Speichern & Schließen".
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