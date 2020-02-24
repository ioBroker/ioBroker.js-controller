---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: crZ8qcB8BIoTrMdd0LtQmPDHmNda2enWB/Ta0DlzjIA=
---
![Logo](../../../en/adapterref/iobroker.history/admin/history.png)

![Anzahl der Installationen](http://iobroker.live/badges/history-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.history.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.history.svg)
![Tests](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

# IoBroker.history
Dieser Adapter speichert den Statusverlauf in einem zweistufigen Prozess.

## Aufbau
* [Englische Beschreibung] (docs / de / README.md)
* [deutsche Beschreibung] (docs / de / README.md)

## 1.9.0 (2020-01-16)
* (foxriver76) hat die Verwendung von adapter.objects entfernt
* __ erfordert js-controller> = 2.0.0__

### 1.8.7 (2019-09-02)
* (paul53) alte Dateien sollten automatisch gelöscht werden

### 1.8.6
* Beheben Sie mehrere kleinere Probleme und optimieren Sie einige Texte

### 1.8.5 (2018-07-02)
* (Apollon77) Fehler in storeState behoben

### 1.8.4 (2018-06-24)
* (Apollon77) Das Schreiben von Start- und Endwerten wurde korrigiert / deaktiviert

### 1.8.0 (2018-06-19 / 24)
* (Apollon77) Option zum Schreiben von Daten in eine andere ID hinzufügen, um Geräteänderungen zu vereinfachen. Das Abrufen von Daten funktioniert für beide IDs

### 1.7.4 (2018-04-03)
* (AlCalzone) Die Behandlung von Dateinamen für Zustände mit Sonderzeichen wurde korrigiert

### 1.7.3 (28.03.2018)
* (Apollon77) Beachten Sie die Einstellung "Für immer behalten", um die Datenpunktkonfiguration beizubehalten

### 1.7.2 (2018-02-05)
* (bondrogeen) Admin3-Korrekturen

### 1.7.1 (2018-01-31)
* (Bluefox) Admin3-Korrekturen

### 1.7.0 (2018-01-17)
* (bluefox) Bereit für Admin3

### 1.6.6 (2017-12-20)
* (Bluefox) Übersetzungen

### 1.6.5 (2017-10-05)
* (Apollon77) Relog-Wert-Funktion korrigieren

### 1.6.4 (2017-08-12)
* (bluefox) Option "Letzten Wert speichern" hinzufügen

### 1.6.3 (2017-08-03)
* (Apollon77) korrigiert das Verhalten des Protokollintervalls, um immer den aktuellen Wert zu protokollieren

### 1.6.2 (2017-04-07)
* Korrektur bei Datentypkonvertierungen

### 1.6.0 (28.02.2017)
* (Apollon77) Ersetzen Sie einige Zeichen in Verlaufsdateinamen

### 1.5.3 (22.02.2017)
* (Apollon77) Kleine Korrektur für ältere Konfigurationen

### 1.5.2
* (Apollon77) Verbessert die Min-Delta-Logik für Datenpunkte vom Typ gemischt

### 1.5.1 (2017-01-16)
* (bluefox) Die Behandlung von Gleitkommawerten in der Adapterkonfiguration und der Datenpunktkonfiguration wurde korrigiert.

### 1.5.0 (01.12.2016)
* (Apollon77) Nachrichten hinzufügen enableHistory / disableHistory
* (Apollon77) Unterstützung für Protokolländerungen nur hinzufügen, wenn der Wert von einem Mindestwert für Zahlen abweicht
* (Apollon77) Korrektur der Gesamtberechnung

### 1.4.0 (29.10.2016)
* (Apollon77) Option zum erneuten Protokollieren unveränderter Werte hinzufügen, um die Visualisierung zu vereinfachen
* (Apollon77) hat Konverter-Skripte hinzugefügt, um Verlaufsdaten in die Datenbank zu verschieben

### 1.3.1 (25.09.2016)
* (Apollon77) Behoben: ts wird als val zugewiesen
* (bluefox) Fix Selektor für Verlaufsobjekte

### 1.3.0 (30.08.2016)
* (bluefox) Nur mit neuem Administrator kompatibel

### 1.2.0 (27.08.2016)
* (bluefox) Ändert den Namen des Objekts vom Verlauf in benutzerdefiniert

### 1.1.0 (27.08.2016)
* (Bluefox) Fix Aggregation des letzten Punktes
* (bluefox) Aggregation Keine liefert nur die Rohdaten ohne Aggregation

### 1.0.5 (24.07.2016)
* (Bluefox) Fix Aggregation in großen Intervallen

### 1.0.4 (05.07.2016)
* (Bluefox) Fix Aggregation auf Sekunden

### 1.0.3 (2016-05-31)
* (bluefox) Linie bis zum Ende ziehen, wenn null ignoriert wird

### 1.0.2 (29.05.2016)
* (bluefox) schalten max und min miteinander um

### 1.0.1 (28.05.2016)
* (bluefox) berechnet auch End- / Startwerte für "on change"

### 1.0.0 (20.05.2016)
* (bluefox) Ändert den Standardaggregationsnamen

### 0.4.1 (14.05.2016)
* (bluefox) support sessionId

### 0.4.0 (2016-05-05)
* (bluefox) verwendet eine Aggregationsdatei vom SQL-Adapter
* (bluefox) korrigiert den Wertespeicher beim Beenden
* (bluefox) speichert alle zwischengespeicherten Daten alle 5 Minuten
* (Bluefox) Unterstützung von ms

### 0.2.1 (2015-12-14)
* (bluefox) Beschreibung der Einstellungen hinzufügen
* (bluefox) Platziert die Aggregatfunktion in einer separaten Datei, um die Freigabe für andere Adapter zu ermöglichen
* (Smoking-Jack) Add Demo-Daten generieren
* (lächelnder Jack) bekommt Geschichte in der eigenen Gabel
* (bluefox) StoreAck-Flag hinzufügen
* (Bluefox) -Modell für den Austausch

### 0.2.0 (2015-11-15)
* (Smiling_Jack) Speichern und Laden im Adapter und nicht im js-Controller
* (Smiling_Jack) Aggregation von Datenpunkten
* (Smiling_Jack) Unterstützung des Speicherpfads

### 0.1.3 (2015-02-19)
* (bluefox) kleinen Fehler in der Geschichte behoben (Danke an Dschaedl)
* (bluefox) Administrationsseite aktualisieren

### 0.1.2 (20.01.2015)
* (bluefox) Aktivieren Sie die Schaltfläche zum Speichern und Schließen per Konfiguration

### 0.1.1 (10.01.2015)
* (Bluefox) Überprüfen Sie, ob der Status nicht gelöscht wurde

### 0.1.0 (2015-01-02)
* (bluefox) aktiviert die npm-Installation

### 0.0.8 (25.12.2014)
* (Bluefox) Unterstützung des De-Bounce-Intervalls

### 0.0.7 (2014-11-01)
* (bluefox) speichert jede Änderung und nicht nur lc! = ts

### 0.0.6 (2014-10-19)
* (bluefox) Konfigurationsseite hinzufügen

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2020 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

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