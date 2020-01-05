---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: tyNpA/0hQ+n0OCG3Mnofzv9ocHgboD9cNkeV7eIb/CU=
---
![Logo](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![Anzahl der Installationen](http://iobroker.live/badges/roadtraffic-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![Tests](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

# IoBroker.roadtraffic
## Über diesen Adapter
Dieser Adapter verwendet die HERE.com-API, um den Verkehr auf Ihren Routen zu überprüfen. Sie können mehrere Routen konfigurieren. Der Adapter überprüft die aktuelle Verkehrssituation und zeigt an, wie lange Ihre Reise dauern wird.
Der Adapter verfügt über einen Wecker - damit Sie dem Adapter mitteilen können, zu welcher Zeit Sie arbeiten müssen - und der Adapter beginnt, Radio zu spielen und macht eine Ansage auf Alexa (Alexa2-Adapter erforderlich) - oder Sie können Ihr eigenes Skript verwenden, um zu reagieren auf den Alarm des Adapters ..

## Fertig machen
So lass uns gehen:

1. Gehen Sie zu https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account und erstellen Sie ein HERE.com Free Developer-Konto (Freemium).

![Here1](../../../en/adapterref/iobroker.roadtraffic/img/Here1.png)

2. Stellen Sie sicher, dass Freemium ausgewählt ist und füllen Sie das Formular auf der linken Seite aus. (Vorname, Nachname, E-Mail, ..)

![Here2](../../../en/adapterref/iobroker.roadtraffic/img/Here2.png)

3. Klicken Sie auf Für HIER-Konto registrieren ... und vergessen Sie nicht, das Kontrollkästchen (Akzeptieren Sie die Servicebedingungen usw.) anzukreuzen.

![Here3](../../../en/adapterref/iobroker.roadtraffic/img/Here3.png)

4. Noch einmal - stimmen Sie den Allgemeinen Geschäftsbedingungen zu und klicken Sie auf die Schaltfläche "Codierung starten".

![Here4](../../../en/adapterref/iobroker.roadtraffic/img/Here4.png)

5. Auf der nächsten Seite befinden Sie sich bereits in Ihrem HERE.com-Dashboard. Suchen Sie nach dem Abschnitt "REST" und klicken Sie auf "App generieren".

![Here5](../../../en/adapterref/iobroker.roadtraffic/img/Here5.png)

6. Klicken Sie auf "Create API Key" - Sie erhalten einen API Key. Öffnen Sie die Instancesettings des roadtraffic Adapters in ioBroker und fügen Sie den API Key in das Konfigurationsfeld ein.

![Here6](../../../en/adapterref/iobroker.roadtraffic/img/Here6.png)

7. Klicken Sie in den Instanzeinstellungen auf das Plus-Symbol und erstellen Sie Ihre erste Route.

Nachdem Sie alle Informationen in den Konfigurationsdialog eingegeben haben, klicken Sie auf "Speichern & Schließen".
Der Adapter sollte jetzt neu starten und Sie können loslegen!

## Wecker
In den Instancesettings können Sie den Wecker aktivieren, indem Sie das Kontrollkästchen "Enable Alarm-Clock feature" aktivieren.
In den Alexa2-Instanzeinstellungen sollte der Alexa2-Adapter für die Verwendung der Push-Verbindung installiert und eingestellt sein.
Wählen Sie das Alexa-Gerät aus, das vom Adapter gesteuert werden soll, und geben Sie die TuneIn StationID ein, die beim Auslösen des Alarms abgespielt werden soll.
Die Alarmlautstärke reicht von 0-100.
Mit dem Speak-String können Sie die Ansage von Alexa steuern.
Standard ist: Guten Morgen% name. Bei aktueller Verkehrslage benötigst du% dur zur Arbeit.

15 Sekunden nachdem Alexa mit der Wiedergabe der angegebenen TuneIn Station begonnen hat, wird die Saite angesagt.
Wenn Sie zum Beispiel eine Route mit dem Namen 'Daniel' haben und der Alarm ausgelöst wird, sagt Alexa: Guten Morgen Daniel. Bei aktueller Verkehrslage benötigst du 29 Minuten zur Arbeit.

Lassen Sie die Speak-Zeichenfolge leer, wenn der Adapter nur die TuneIn-Station abspielen soll und keine Ansage erhalten soll.

Jede Route hat 7 Alarmkanäle (Montag-Sonntag).
In jedem Channel gibt es folgende Zustände:

* Ankunftszeit: Geben Sie die Zeit ein, zu der Sie an Ihrem Ziel sein möchten (Beispiel: 07:30 Uhr ist halb acht Uhr morgens).
* Badezeit: Geben Sie die Uhrzeit ein, zu der Sie zur Reisedauer hinzugefügt werden möchten. (Beispiel: 45 ist 45 Minuten. Nehmen wir an, Sie haben die Ankunftszeit auf 10:00, die Badezeit auf 30 Minuten und die aktuelle Reisedauer auf 1 Stunde eingestellt. Dann wird der Adapter um 08:30 Uhr ausgelöst (Ankunftszeit - Badezeit - Reisedauer).
* enabled: Auf true setzen, wenn Sie den Alarm für diesen Tag aktivieren möchten
* ausgelöst: Der Adapter setzt diesen Status auf true, wenn der Alarm ausgelöst wird. (Sie können es beispielsweise mit eigenen Skripten verwenden.) Der ausgelöste Status wird am entsprechenden Tag um 00:00 Uhr auf false zurückgesetzt. (Der Samstagstrigger wird am Samstag um 00:00 Uhr auf false gesetzt.)

## Changelog
### 0.2.0 (2019-12-21)
* (BuZZy1337) Alarm-Clock implemented. (See Readme "Alarm-Clock" section for details)

### 0.1.1 (2019-12-13)
* (BuZZy1337) HERE.com changed the Authentication.
* (BuZZy1337) Prepare for Alarm.. (NOT WORKING YET!!! - But needed to push this version because of authentication changes)

### 0.1.0 (2019-12-08)
* (BuZZy1337) Using HERE.com instead of Google API (READ THE UPDATED README!!)

### 0.0.2 (2019-02-27)
* (BuZZy1337) Release to latest repository

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