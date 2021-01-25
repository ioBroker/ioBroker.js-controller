---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smappee/README.md
title: ioBroker.smappee
hash: gwcVX0Z9Crq0vyemPA0SsrxqNuHkE+VXpj/xJtFTXD4=
---
![Logo](../../../en/adapterref/iobroker.smappee/admin/smappee.png)

![Anzahl der Installationen](http://iobroker.live/badges/smappee-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.smappee.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smappee.svg)
![NPM](https://nodei.co/npm/iobroker.smappee.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.smappee.svg)

# IoBroker.smappee
Ein ioBroker-Adapter für Smappee-Geräte

#### Sie müssen zuerst den ioBroker.MQTT-Adapter installieren (oder einen anderen MQTT-Broker verwenden) und die MQTT-Veröffentlichung Ihres Smappee aktivieren. Bitte beachten Sie die folgenden Anweisungen, bevor Sie den Smappee-Adapter installieren.
Dieser Adapter liefert Ihnen Echtzeit-Energiedaten (1s-Intervall), aggregierte Daten für Energie und optionale Sensorverbrauchsdaten sowie Zugriff auf Ihre Schalter / Stecker Ihres Smappee - Device to ioBroker.

## Anleitung
### Installation von ioBroker.mqtt - Adapter.
Bitte fügen Sie eine Instanz des ioBroker.mqtt - Adapters hinzu:

![ioBMQ](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/ioBrokerMQTTBroker.PNG)

Konfigurieren Sie die Instanz als Server / Broker. Port 1883 ist standardmäßig in Ordnung. Sie können auch eine andere Funktion auswählen.
Legen Sie den Benutzernamen und das Passwort fest (diese benötigen Sie für die Konfiguration des Smappee- und Smappee-Adapters:

![ioBMC](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/ioBrokerMQTTConfig.PNG)

Auf der Registerkarte MQTT-Einstellungen muss das Kontrollkästchen "Nur bei Änderung veröffentlichen" aktiviert sein.

### Aktivierung von Smappees MQTT-Veröffentlichung.
Öffnen Sie Ihren Browser und rufen Sie die URL <http://X.X.X.X/smappee.html> auf (ersetzen Sie X.X.X.X durch die IP-Adresse von Smappee in Ihrem Netzwerk).
Klicken Sie auf die Schaltfläche Anmelden / Abmelden und verwenden Sie das Kennwort "admin", um sich anzumelden.

![smplogon](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smplogon.png)

Gehen Sie zum Abschnitt "Erweitert" und aktivieren Sie das Kontrollkästchen "Erweitert" im letzten Feld der Tabelle.

![smpadv](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smpadv.jpeg)

Dann sollten Sie hier sein:

![smpmqt](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smpmqt.png)

Geben Sie die IP Ihres ioBroker gefolgt von dem Port ein, den Sie für den mqtt-Broker angegeben haben (Standard ist 1883), d. H. TCP: //192.168.1.111: 1883

Geben Sie den Benutzernamen und das Passwort ein, die Sie bei der Konfiguration Ihres mqtt-Brokers angegeben haben.
Klicken Sie dann auf "Änderungen übernehmen und Monitor neu starten".

Und jetzt ist es Zeit dafür

### Installieren Sie den Smappee-Adapter
Erstellen Sie eine Instanz des Smappee-Adapters und geben Sie den Benutzernamen und das Passwort ein, die Sie bei der Konfiguration Ihres mqtt-Brokers angegeben haben.

Wenn Sie einen anderen als den ioBrokers MQTT-Adapter mit Standardeinstellungen verwenden, können Sie optional die Verbindung zu Ihrem MQTT Broker (Host & Port) angeben.

Bitte geben Sie dem Adapter einige Minuten Zeit, um die Daten von Ihrem Smappee-Gerät zu lesen. Laden Sie den Objektbaum neu, wenn Sie einige Werte vermissen.

Der Adapter liefert Daten zum tatsächlichen Strom, zum Stromverbrauch insgesamt und für jede Phase, zur tatsächlichen Last sowie zu Zustands- und Verbrauchsdaten für Gas-, Wasser- und Schaltersensoren.

### Datenaggregation oder -trennung (stündliche, tägliche, jährliche, .. Werte)
Einige der Smappee-Werte sind "Zähler", andere sind Werte für einen bestimmten Zeitraum (5-Minuten-Werte).
Verwenden Sie zum Aggregieren oder Trennen von Daten den Adapter ioBroker.statistics.

### Steuerstecker / Schalter
Mit Smappee können Sie Smart Plugs / Smart Switches fernsteuern. Entweder smappee-one oder andere 433-MHz-HF-Stecker / -Schalter (d. H. Intertechno IT-1500). Koppeln Sie die Schalter mit Ihrer Smappee - App und starten Sie den ioBroker Smappee - Adapter neu. Sie erhalten die Namen und Zustände Ihrer Stecker. Wenn Sie 'switchON' 'true' einstellen, schalten Sie den Schalter ein. Wenn Sie 'false' setzen, schalten Sie ihn aus (wenn Sie 'switchON' einstellen, muss ACK false sein). . Der aktuelle Status von switchON wird mit dem Status von plug.state aktualisiert.

## Changelog

### 0.2.3

-   'switchON' state is updated with actual state of a plug.

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

Copyright (c) 2018-2021 forelleblau marceladam@gmx.ch

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