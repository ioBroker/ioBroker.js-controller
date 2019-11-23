---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smappee/README.md
title: ioBroker.smappee
hash: 7klzWHLWoGQ0NVhX2qy0KrupRHgqvSA9Y+00q7LNjbk=
---
![Logo](../../../en/adapterref/iobroker.smappee/admin/smappee.png)

![Anzahl der Installationen](http://iobroker.live/badges/smappee-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.smappee.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smappee.svg)
![NPM](https://nodei.co/npm/iobroker.smappee.png?downloads=true)

# IoBroker.smappee
Ein ioBroker-Adapter für Smappee-Geräte

#### Sie müssen zuerst den ioBroker.MQTT-Adapter installieren (oder einen anderen MQTT-Broker verwenden) und die MQTT-Veröffentlichung Ihres Smappee aktivieren. Lesen Sie bitte die folgenden Anweisungen, bevor Sie den Smappee-Adapter installieren.
Mit diesem Adapter erhalten Sie in Echtzeit (1s-Intervall) Energieverbrauchsdaten, aggregierte Daten für den Energieverbrauch und optionale Sensorverbrauchsdaten sowie Zugriff auf Ihre Schalter / Stecker Ihres Smappee - Geräts zu ioBroker.

## Anleitung
### Installation von ioBroker.mqtt - Adapter.
Bitte fügen Sie eine Instanz des ioBroker.mqtt - Adapters hinzu:

![ioBMQ](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/ioBrokerMQTTBroker.PNG)

Konfigurieren Sie die Instanz als Server / Broker. Port 1883 ist standardmäßig in Ordnung, Sie können jedoch auch eine andere Funktion auswählen.
Legen Sie Benutzername und Passwort fest (dies benötigen Sie für die Konfiguration von smappee- und smappee-Adapter:

![ioBMC](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/ioBrokerMQTTConfig.PNG)

Auf der Registerkarte MQTT-Einstellungen muss das Kontrollkästchen 'Nur bei Änderung veröffentlichen' aktiviert sein.

### Aktivierung von Smappees MQTT-Publishing.
Öffnen Sie Ihren Browser und rufen Sie die URL <http://X.X.X.X/smappee.html> auf (ersetzen Sie X.X.X.X durch die IP-Adresse von Smappee in Ihrem Netzwerk).
Klicken Sie auf die Anmelde- / Abmeldeschaltfläche und verwenden Sie das Kennwort "admin" zur Anmeldung.

![smplogon](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smplogon.png)

Gehen Sie in den Bereich "Erweitert" und aktivieren Sie das Kontrollkästchen "Erweitert" im letzten Feld der Tabelle.

![smpadv](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smpadv.jpeg)

Dann sollten Sie hier sein:

![smpmqt](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smpmqt.png)

Geben Sie die Ip Ihres ioBrokers gefolgt von dem Port ein, den Sie für den mqtt-broker angegeben haben (Standard ist 1883), d. H. Tcp: //192.168.1.111: 1883

Geben Sie den Benutzernamen und das Passwort ein, die Sie beim Konfigurieren Ihres mqtt-Brokers angegeben haben.
Klicken Sie dann auf "Änderungen übernehmen und Monitor neu starten".

Und jetzt ist es Zeit für

### Installieren Sie den Smappee-Adapter
Erstellen Sie eine Instanz des smappee-Adapters und geben Sie den Benutzernamen und das Passwort ein, die Sie beim Konfigurieren Ihres mqtt-Brokers angegeben haben.

Wenn Sie einen anderen als den ioBrokers MQTT-Adapter mit Standardeinstellungen verwenden, können Sie optional die Verbindung zu Ihrem MQTT-Broker (Host & Port) angeben.

Bitte geben Sie dem Adapter einige Minuten Zeit, um die Daten von Ihrem Smappee-Gerät zu lesen. Laden Sie den Objektbaum neu, wenn Sie einige Werte vermissen.

Der Adapter liefert Daten zum aktuellen Strom, zum Stromverbrauch insgesamt und für jede Phase, zur aktuellen Last sowie zu Zustands- und Verbrauchsdaten für Gas-, Wasser- und Schaltsensoren.

### Datenaggregation oder -trennung (stündliche, tägliche, jährliche, .. Werte)
Einige der Smappee-Werte sind 'Zähler', andere sind Werte für einen bestimmten Zeitraum (5-Minuten-Werte).
Verwenden Sie zum Zusammenfassen oder Trennen von Daten den ioBroker.statistics-Adapter.

### Steuerstecker / Schalter
Mit Smappee können Sie Smart Plugs / Smart Switches fernsteuern. Entweder Smappee-Stecker oder andere 433-MHz-HF-Stecker / -Schalter (d. H. Intertechno IT-1500). Koppeln Sie die Switches mit Ihrer Smappee-App und starten Sie den ioBroker-Smappee-Adapter neu. Sie erhalten die Namen und Zustände Ihrer Stecker und durch Setzen von 'switchON' auf 'true' schalten Sie den Schalter ein, wenn Sie ihn auf 'false' setzen, schalten Sie ihn aus (wenn 'switchON' gesetzt ist, muss ACK auf 'false' gesetzt sein). .

## Changelog

### 0.2.2

-   Readme - update.

### 0.2.1

-   Core Files/Testing Update and introduce adapter-core.
-   added counters for sensor that sum the 5-min values.

### 0.2.0

-   Gets state data for smartplugs and smartswitches, controls smart plugs and smart switches, gets 5-min power consumption for switch sensors (smart switches).

### 0.1.3

-   Controls smart plugs and smart switches, gets 5-min power consuption for switch sensors (smart switches). [For testing only]

### 0.1.1

-   Imports names & states of switches/plugs. Lets you control your swiches.

### 0.1.0

-   Gas_Water sensor integrated, 'alwaysOn' integrated.

### 0.0.5

-   design-bug fixed, Gas_Water Sensor integrated (only raw value).

### 0.0.4

-   credentials - bug fixed, more efficient design, gulp update

### 0.0.3

-   first tested version, bugs in config fixed.

### 0.0.2

-   reads phase config, reports single phase data.

### 0.0.1 Initial version

-   inital version, displays realtime power und energy consumption.

## License

The MIT License (MIT)

Copyright (c) 2018-2019 forelleblau marceladam@gmx.ch

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