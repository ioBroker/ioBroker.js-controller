---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: NOmuppZJszQtk4vXpDIlZVzc184ehQ9fxCYn+38dLIM=
---
![Logo](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Build Status](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.plenticore
Ein ioBroker-Adapter für KOSTAL Plenticore Plus-Wechselrichter (d. H. Plenticore Plus 8.5)

Dieser Adapter verwendet das interne Webinterface des Wechselrichters, um auf die Eigenschaften und Einstellungen Ihres Wechselrichters und der angeschlossenen Geräte (z. B. Batterie oder Smart Energy Meter) zuzugreifen. Um den Adapter zu verwenden, muss die ioBroker-Instanz mit dem Netzwerk verbunden sein, in dem sich Ihr KOSTAL Plenticore befindet.

Dieser Adapter ist KEIN offizielles Produkt von KOSTAL und wird auch nicht von KOSTAL unterstützt oder unterstützt. Es ist ein privates Projekt, das sich noch in einem frühen Entwicklungsstadium befindet. Verwenden Sie es also auf eigenes Risiko!

## Konfig
Stellen Sie die IP-Adresse Ihres Wechselrichters (z. B. 192.168.0.23) und Ihr Passwort ein, mit dem Sie sich als Anlagenbesitzer mit der Web-Oberfläche des Wechselrichters verbinden. Das Abfrageintervall ist in Millisekunden angegeben (d. H. 10000 sind 10 Sekunden).

## Adapter
Der Adapter verwendet kein Screenscraping. Es verwendet dieselbe REST-API wie das Webinterface. Möglicherweise gibt es (viele) Funktionen, die vom Adapter (noch) nicht verwendet werden.

### Warum nicht (einfach) Modbus verwenden?
Der Wechselrichter hat Modbus TCP aktiviert, sodass Sie den Modbus-Adapter zum Abfragen von Werten verwenden können. KOSTAL hat es jedoch nicht erlaubt, eine der Modbus-Adressen zu schreiben. Sie können also nicht e einstellen. G. Batteriemindest-SoC mit ioBroker.

### Adapter verwenden
Der Adapter sollte einige Objekte im plenticore.X-Objektbaum füllen. Einige davon sind schreibgeschützt, z. G. die aktuelle PV-Leistung oder den Stromverbrauch zu Hause. Andere sind veränderlich, z. G. der minimale SoC der Batterie oder die Batteriemanagementmodi. Ich habe den Adapter auf dem Plenticore Plus 10 getestet.

Ich habe noch nicht alle API-Endpunkte implementiert, insbesondere die Energieflussstatistiken, die für die Seite "Statistiken" auf der Weboberfläche verwendet werden. Außerdem fehlen dem Adapter sehr viele Übersetzungen, da ich für ioBroker völlig neu in der Entwicklung bin.

## Objekte
Im Folgenden finden Sie einen Auszug der wichtigsten Objekte, die von diesem Adapter verwendet und gefüllt werden. Alle mit `[**]` markierten Einstellungen sollten editierbar sein, aber nicht alle wurden getestet und es kann (und wird) Fehler geben.

### Plenticore.X.devices.local
Der Geräte.Lokalbaum enthält Informationen über den Wechselrichter und eventuell angeschlossene Smart Energy Meter und / oder Batterie.

`plenticore.X.devices.local.Dc_P` - die aktuelle Gleichstromleistung einschließlich der selbst genutzten Leistung des Wechselrichters. Dieser Wert sollte in der Nähe des Wertes von §§SSSSS_1§ (ungefähr + 30-40 W) liegen. `plenticore.X.devices.local.Home_P` - die aktuell verbrauchte Gesamthaushaltsleistung. `plenticore.X.devices.local.HomeBat_P` - die aktuell von der Batterie gelieferte Haushaltsleistung. § - die aktuelle Eigenleistung, die direkt von der Anlage bereitgestellt wird `plenticore.X.devices.local.HomeGrid_P` - die aktuelle Eigenleistung, die vom Netz bereitgestellt wird `plenticore.X.devices.local.LimitEvuAbs` - die berechnete aktuelle Leistungsgrenze, die an das Netz gesendet wird. Wenn die Anlage mehr Strom erzeugt, geht dieser verloren.
`plenticore.X.devices.local.StateKey0` - Wenn dies zutrifft, wurde das Batteriemanagement des Wechselrichters entsperrt

#### Plenticore.X.devices.local.ac
Dieser Kanal enthält Informationen zur AC-Seite des Wechselrichters. Am wichtigsten sind: `plenticore.X.devices.local.ac.Frequency` - die Nettofrequenz `plenticore.X.devices.local.ac.L1_P` - die aktuelle Leistung von Phase 1 in W `plenticore.X.devices.local.ac.L2_P` - die aktuelle Leistung von Phase 2 in W `plenticore.X.devices.local.ac.L3_P` - die aktuelle Leistung Phase 3 in W `plenticore.X.devices.local.ac.P` - die aktuelle Gesamtleistung des Wechselrichters, einschließlich Batterieentladung

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles` - die bisherige Lebensdauer der Batterie `[**] plenticore.X.devices.local.battery.DynamicSoc` - true, wenn dynamischer SoC aktiviert ist (nur wenn `SmartBatteryControl` ebenfalls true ist) `[**] plenticore.X.devices.local.battery.MinHomeConsumption` - der minimale Stromverbrauch zu Hause wird für die Verwendung der Batterie benötigt `[**] plenticore.X.devices.local.battery.MinSoc` - der gewünschte minimale SoC (State of Charge) der Batterie. Der tatsächliche SoC kann unter diesen Wert fallen, wenn keine Sonnenenergie zur Verfügung steht.
`plenticore.X.devices.local.battery.P` - die aktuelle Batterieleistung (negativ beim Laden, positiv beim Entladen) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` - wahr, wenn das intelligente Batteriemanagement aktiviert ist. Bezüglich des offiziellen Handbuchs ist dies nur dann zu aktivieren, wenn keine weitere Wechselstromquelle wie ein zweiter Wechselrichter beteiligt ist `plenticore.X.devices.local.battery.SoC` - der aktuelle Ladezustand der Batterie

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower` - die maximale Leistung, die der Wechselrichter liefern kann

#### Plenticore.X.devices.local.pv1 / pv2
`plenticore.X.devices.local.pvX.P` - die aktuelle Leistung, die von Phase X der Anlage geliefert wird

### Plenticore.X.scb
Dieser Kanal enthält Informationen und Einstellungen des Geräts

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable` - true, wenn der Modbus-TCP aktiviert ist `[**] plenticore.X.scb.modbus.ModbusUnitId` - Modbus-Einheiten-ID des Geräts

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname` - aktueller Hostname des Wechselrichters `[**] plenticore.X.scb.network.IPv4Auto` - IP-Adresse des Wechselrichters über DHCP einstellen `[**] plenticore.X.scb.network.IPv4Address` - aktuelle IP-Adresse des Wechselrichters `[**] plenticore.X.scb.network.IPv4DNS1` und § §SSSSS_4§§ - die aktuell verwendeten DNS-Server `[**] plenticore.X.scb.network.IPv4Gateway` - das aktuell verwendete Netzwerk-Gateway `[**] plenticore.X.scb.network.IPv4Subnetmask` - die Netzwerk-Subnetzmaske

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers` - die aktuell verwendeten Zeitserver (NTP). Dies können mehrere durch Leerzeichen getrennte sein.
`[**] plenticore.X.scb.time.NTPuse` - Verwenden Sie NTP, um die aktuellen Gerätezeiteinstellungen festzulegen. `[**] plenticore.X.scb.time.Timezone` - Die Zeitzone des Geräts

### Plenticore.X.scb.statistic.EnergyFlow
Die Datenpunkte in diesem Abschnitt enthalten die Statistiken, die auf der Plenticore-Weboberfläche angezeigt werden. Nachstehend werden nur die `Day`-Datenpunkte genannt, aber jeder von ihnen ist auch für `Month`, `Year` und `Total` verfügbar.

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - die Autarkie in Prozent für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - das geschätzte eingesparte CO2 in kg für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - der gesamte Eigenverbrauch in Wh für den aktuellen Tag §§SSSSS_3§ § - der gesamte Eigenheimverbrauch der PV-Anlage für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - der gesamte Eigenheimverbrauch der Batterie für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - der gesamte Eigenheimverbrauch des Stromnetzes für den aktueller Tag `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - Eigenverbrauchsrate (erzeugter Anlagenstrom NICHT ins Netz eingespeist) für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.YieldDay` - Gesamtertrag der Anlage für den aktuellen Tag

## Prognosedaten
Um die Prognosefunktion nutzen zu können, muss der Adapter ioBroker.darksky oder ioBroker.weatherunderground installiert sein. Außerdem müssen Sie die globale geografische Position (Längen- und Breitengrad) des Systems konfigurieren und die erweiterte Konfiguration des Plenticore-Adapters festlegen (falls zutreffend, Panel- und Batteriedaten).

### Plenticore.0.forecast.consumption
`plenticore.0.forecast.consumption.day` - aktueller Stromverbrauchsdurchschnitt für die Tageszeit in den letzten 3 Tagen `plenticore.0.forecast.consumption.night` - aktueller Stromverbrauchsdurchschnitt für die Nachtzeit in den letzten 3 Tagen `plenticore.0.forecast.consumption.remaining` - geschätzter verbleibender Stromverbrauch für den aktuellen Prognosetag bis zum Sonnenuntergang

### Plenticore.0.forecast.current
`plenticore.0.forecast.current.sky` - aktuelle Wolkenbedeckung vom Wetteradapter `plenticore.0.forecast.current.visibility` - aktuelle Sichtbarkeit vom Wetteradapter `plenticore.0.forecast.current.power.generated` - erzeugte Anlagenleistung am aktuellen Tag bis zur aktuellen Uhrzeit `plenticore.0.forecast.current.power.max` - berechnete maximale Anlagenleistung auf Null Himmel (0% Wolkenbedeckung) `plenticore.0.forecast.current.power.sky` - berechnete Anlagenleistung unter Berücksichtigung der aktuellen Wolkenbedeckung vom Wetteradapter `plenticore.0.forecast.current.power.skyvis` - berechnete Anlagenleistung unter Berücksichtigung der aktuellen Wolkenbedeckung und Sichtbarkeit vom Wetteradapter `plenticore.0.forecast.current.sun.azimuth` - aktueller Sonnenstand (Azimut) `plenticore.0.forecast.current.sun.elevation` - aktueller Sonnenstand (Höhenunterschied) `plenticore.0.forecast.current.sun.sunrise` - Sonnenaufgang des Prognosedatums (entweder heute oder morgen) `plenticore.0.forecast.current.sun.sunset` - Sonnenuntergang des Prognosedatums (entweder heute oder morgen) oder morgen)

### Plenticore.0.forecast.power
`plenticore.0.forecast.power.date` - Datum, an dem die aktuellen Informationen zur Stromprognose für `plenticore.0.forecast.power.day` gelten - Gesamtstromprognose für den Tag §§SSS_2§ - Gesamtstromprognose für den Tag ohne Berücksichtigung der Sichtbarkeitsdaten des Wetteradapters `plenticore.0.forecast.power.remaining` - verbleibende Leistung der prognostizierten Gesamtsumme für den Tag, basierend auf `plenticore.0.forecast.power.day` `plenticore.0.forecast.power.Xh.power` - geschätzte Gesamtleistung der Anlage zur Sonnenstunde X des prognostizierten Tages, wobei 1h die Stunde des Sonnenaufgangs ist `plenticore.0.forecast.power.1h.time` - die zeit die sonnenstunde für `plenticore.0.forecast.power.Xh.power` beginnt

## Spenden
[![paypal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 2.0.0

-   Code rework
-   Outsourced many functions to libraries
-   This version has new dependencies and requires a newer adapter-core version!
-   Several fixes

### 1.1.1

-   No changes

### 1.1.0

-   Added support for weatherunderground weather adapter. The adapter can be choosen as alternative forecast source over the DarkSky adapter.

### 1.0.2

-   Fixed a warning message occuring far too often

### 1.0.1

-   Added forecast features to readme

### 1.0.0

-	Added power forecast feature

### 0.1.5

-   Added translations
-   Fixed shadow management handling.

### 0.1.4

-   Added shadow management datapoint.

### 0.1.3

-   Do not query battery values if battery management is not unlocked.

### 0.1.2

-   Resolved adapter check issues, see https://github.com/StrathCole/ioBroker.plenticore/issues/1
-   Added statistics data points.

### 0.1.1

-   Removed admin adapter dependency

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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