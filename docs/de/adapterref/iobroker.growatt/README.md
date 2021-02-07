---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.growatt/README.md
title: ioBroker.growatt
hash: R/Ro5hZjXVFIpi+vg3CxrQWVR756UbHET4v+aaEyg0k=
---
![Logo](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/growatt-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/growatt-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/PLCHome/ioBroker.growatt.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

# IoBroker.growatt
## Growatt-Adapter für ioBroker
ioBroker Growatt Adapter zur Kommunikation mit Growatt Shine Server.
Ich bin nicht verbunden.
Normalerweise werden die Daten alle 5 Minuten vom Datenlogger an die Cloud gesendet.
Sie können es ändern, siehe unten.
Die Software fragt den Server alle 30 Sekunden ab, damit der Offset nicht zu groß ist.

Nicht alle Anlagentypen sind implementiert.

Derzeit können nur Daten gelesen werden, das Schreiben von Parametern oder das Ändern von Parametern ist nicht möglich.

# Datenintervall beschleunigen
## Sie können das Logger-Intervall zwischen 5 Minuten und 1 Minute einstellen
Entfernen Sie den Gummistopfen der KEY-Taste von ShineWiFi-S und drücken Sie kurz die Taste im Inneren. Die blaue LED leuchtet auf. Verwenden Sie Ihr Telefon oder Ihren Computer, um eine Verbindung zum drahtlosen Netzwerk herzustellen, das vom ShineWiFi-S-Modul ausgegeben wird. Der Netzwerkname / die SSID ist die Seriennummer des ShineWiFi-S-Moduls.

## Loginseite
Öffnen Sie nach erfolgreichem Verbindungsaufbau den Webbrowser auf Ihrem Telefon oder Computer und geben Sie 192.168.10.100 in die Adressleiste ein. Der Benutzername lautet admin, das Standardkennwort lautet 12345678.
![Loginseite](../../../en/adapterref/iobroker.growatt/docs/login.png)

## Erweiterte Einstellungen
Ändern Sie die Datenintervallzeit auf 1 Minute. ![Erweiterte Einstellungen](../../../en/adapterref/iobroker.growatt/docs/advancedsettings.png)

## Systemneustart
Starten Sie Ihr ShineWiFi-S-Modul auf dieser Seite neu. Klicken Sie auf "Sofort neu starten", um die soeben vorgenommenen neuen Einstellungen zu aktivieren und sich vom internen Webserver Ihres ShineWiFi-Moduls abzumelden.
![Systemneustart](../../../en/adapterref/iobroker.growatt/docs/restart.png)

** Die Diagramme auf der Growatt-Seite werden nicht geändert. Dort können Sie nur eine Änderung der Daten aus dem Datenlogger sehen. **

# Deutsch - Beschleunigungsdatenintervall
## Du kannst das Protokollierungsintervall von 5 Minuten auf 1 Minute Handlungen
Den Gummi vor dem KEY Button des ShineWiFi-S entfernen und den Button kurz hören.
Der ShineWiFi-S spielt nun kurz Hotspot (SSID = Seriennummer des ShineWiFi-S). Beim Netz mit einem Laptop oder dem Handy anmelden.

## Einloggen
als Webadresse http://192.168.10.100 in der Browser-Eingabe.
Der Benutzername ist Admin und das Passwort 12345678 (sollte man gleich auch mal ändern, geht in System Management).
![Loginseite](../../../en/adapterref/iobroker.growatt/docs/login.png)

## Erweiterte Einstellungen
Auf "Erweiterte Einstellungen" gehen und das Intervall ändern. (von 5 auf 1) ![Erweiterte Einstellungen](../../../en/adapterref/iobroker.growatt/docs/advancedsettings.png)

## Systemneustart
Auf System Neustart gehen und Button herzhaft, aber zukünftige Rechte.
![Systemneustart](../../../en/adapterref/iobroker.growatt/docs/restart.png)

** Es gibt keine Möglichkeit an den Diagrammen auf der Growatt-Seite, die bleibt bei 5min. Dort sehen Sie nur eine Frage der Daten im Datenlogger. **

# Adapter-Administrationsseite
## Haupteinstellungen
### Benutzer und Passwort
Bitte geben Sie den Namen und das Passwort ein, die Sie auch in der Shine-App oder im Webportal verwenden.

### Mit gemeinsamem Schlüssel anmelden
Auf der Growatt-Website unter Energie, Anlagenmanagement, Betriebstools können Sie sich einen Schlüssel per E-Mail senden.

### Anlagendaten lesen
Dieser Datensatz enthält die gespeicherten Stammdaten

### Letzte Verlaufsdaten lesen
Liest den letzten Datensatz aus dem Verlauf des Datenloggers.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

### Statusdaten lesen
Diese Daten sind nicht für alle Anlagen verfügbar (nicht INV / MAX / TLX). Dieser Datensatz enthält Live-Daten.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

### Gesamtdaten lesen
Dieser Datensatz enthält Aggregationsdaten.

### Gerätedaten lesen
Dieser Datensatz enthält einige Daten vom Gerät. Einige Daten sind auch in den anderen Kategorien verfügbar.

### Wetter lesen
Dieser Datensatz enthält die Wettervorhersage.

## Objekte verwalten
Hier können Sie festlegen, was mit jedem Wert (Objekt) geschehen soll, der vom Wechselrichter erfasst wird.
Es gibt viele Werte, die nicht zu Ihrem Wechselrichter gehören. Diese können hier entfernt werden.
Da es kein Ereignis gibt, mit dem die Objektliste beim Speichern neu geladen werden kann. Die Schaltfläche Aktualisieren muss verwendet werden, wenn Speichern gespeichert wird.

### Normal
Das Objekt bleibt erhalten, der Wert wird aktualisiert.

### Löschen
Das Objekt wird gelöscht und der vom Wechselrichter geladene Wert wird verworfen.
Nach dem Update werden nur die ID und die Aktion angezeigt, da das Objekt nicht mehr vorhanden ist. Wenn Sie normal auswählen, wird das Objekt nach dem Speichern erneut erstellt.

### Kein Update
Das Objekt bleibt erhalten, die Werte vom Wechselrichter werden verworfen.

-*-

## Changelog
### 0.0.19 (05.02.2021)
* (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
* (PLCHome) Objects of unselected data areas are now deleted.
* (PLCHome) You can choose objects to be ignored or deleted.

### 0.0.18 (23.01.2021)
* (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)
* (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)
* (PLCHome) npm package version update
* (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)
* (PLCHome) npm package version update

### 0.0.14 (01.12.2020)
* (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)
* (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)
* (PLCHome) Read me

### 0.0.10 (26.11.2020)
* (PLCHome) Shared key login
* (PLCHome) Last value of the graph if there are no live data.
* (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)
* (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)
* (PLCHome) fix io-package

### 0.0.7 (05.10.2020)
* (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
* (PLCHome) io-package native defined 5 values, admin sets 7
* (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)
* (PLCHome) translation with ioBroker tool.

### 0.0.5
* (PLCHome) initial release.

### 0.0.1
* (PLCHome) initial release.


-*-

## License
MIT License

Copyright (c) 2021 PLCHome <https://github.com/PLCHome>

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