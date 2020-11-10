---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: elQeOPXkT5ba21PqxJof5sB4rxB8CwcIC0kGZtM23+Y=
---
![Logo](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![Anzahl der Installationen](http://iobroker.live/badges/plenticore-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![NPM](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![Stabil](http://iobroker.live/badges/plenticore-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Build-Status](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [hier zu finden](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md).

# IoBroker.plenticore
Ein ioBroker-Adapter für den KOSTAL Plenticore Plus-Wechselrichter (d. H. Plenticore Plus 8.5)

Dieser Adapter verwendet die interne Weboberfläche des Wechselrichters, um auf die Eigenschaften und Einstellungen Ihres Wechselrichters und der angeschlossenen Geräte (z. B. Batterie oder intelligenter Energiezähler) zuzugreifen. Um den Adapter verwenden zu können, muss die ioBroker-Instanz mit dem Netzwerk verbunden sein, in dem sich Ihr KOSTAL Plenticore befindet.

Dieser Adapter ist KEIN offizielles Produkt von KOSTAL und wird von KOSTAL weder unterstützt noch unterstützt. Es ist ein privates Projekt, das sich noch in einem frühen Entwicklungsstadium befindet. Verwenden Sie es daher auf eigenes Risiko!

## Konfig
Stellen Sie die IP-Adresse Ihres Wechselrichters (z. B. 192.168.0.23) und Ihr Kennwort ein, mit dem Sie als Anlagenbesitzer eine Verbindung zur Weboberfläche des Wechselrichters herstellen. Das Abfrageintervall wird in Millisekunden angegeben (d. H. 10000 beträgt 10 Sekunden).

## Adapter
Der Adapter verwendet kein Screenscraping. Es verwendet dieselbe REST-API wie die Weboberfläche. Möglicherweise gibt es (viele) Funktionen, die (noch) nicht vom Adapter verwendet werden.

### Warum nicht (einfach) Modbus benutzen?
Auf dem Wechselrichter ist Modbus TCP aktiviert, sodass Sie den Modbus-Adapter zum Abfragen von Werten verwenden können. KOSTAL hat es jedoch nicht erlaubt, eine der Modbus-Adressen zu schreiben. Sie können also nicht e einstellen. G. Batterie Minimum SoC mit ioBroker.

### Verwenden des Adapters
Der Adapter sollte einige Objekte unter dem Objektbaum plenticore.X füllen. Einige davon sind schreibgeschützt, z. G. die aktuelle PV-Leistung oder den Stromverbrauch zu Hause. Andere sind veränderbar, z. G. der minimale SoC der Batterie oder die Batteriemanagementmodi. Ich habe den Adapter auf dem Plenticore Plus 10 getestet.

## Objekte
Im Folgenden finden Sie einen Auszug der wichtigsten Objekte, die von diesem Adapter verwendet und gefüllt werden. Alle mit `[**]` gekennzeichneten Einstellungen sollten bearbeitbar sein, aber nicht alle wurden getestet und es können Fehler auftreten.

### Plenticore.X.devices.local
Der Gerätebaum lokal enthält Informationen zum Wechselrichter und möglicherweise zum angeschlossenen intelligenten Energiezähler und / oder zur Batterie.

`plenticore.X.devices.local.Dc_P` - die aktuelle Gleichstromversorgung einschließlich der Eigenleistung des Wechselrichters. Dieser Wert sollte in der Nähe des Werts von `plenticore.X.devices.local.ac.P` (ca. + 30-40W) `plenticore.X.devices.local.Pv_P` - der aktuell erzeugten PV-Leistung liegen. Dieser Wert wird vom Adapter durch Aufsummieren der pvx.P-Werte berechnet.
`plenticore.X.devices.local.Home_P` - die aktuell verbrauchte Gesamthausstromversorgung `plenticore.X.devices.local.HomeBat_P` - die aktuell von der Batterie bereitgestellte Hausstromversorgung `plenticore.X.devices.local.HomePv_P` - die aktuell direkt von der Anlage bereitgestellte Hausstromversorgung `plenticore.X.devices.local.HomeGrid_P` - die aktuelle Hausstromversorgung vom Netz bereitgestellte Leistung `plenticore.X.devices.local.ToGrid_P` - die aktuelle Leistung, die an das Netz gesendet wird. Dieser Wert wird vom Adapter berechnet und ist möglicherweise nicht 100% genau.
`plenticore.X.devices.local.LimitEvuAbs` - die berechnete Strombegrenzung, die den Wandler verlassen kann. Wenn mehr Strom von der Anlage erzeugt wird, geht dieser verloren.
`plenticore.X.devices.local.StateKey0` - Wenn dies zutrifft, wurde das Batteriemanagement des Wechselrichters entsperrt

#### Plenticore.X.devices.local.ac
Dieser Kanal enthält Informationen zur Wechselstromseite des Wechselrichters. Am wichtigsten sind: `plenticore.X.devices.local.ac.Frequency` - die Nettofrequenz `plenticore.X.devices.local.ac.L1_P` - die aktuelle Leistung der Phase 1 in W `plenticore.X.devices.local.ac.L2_P` - die aktuelle Leistung der Phase 2 in W `plenticore.X.devices.local.ac.L3_P` - die aktuelle Leistung der Phase 3 in W `plenticore.X.devices.local.ac.P` - die aktuelle vom Wechselrichter abgegebene Gesamtleistung einschließlich Batterieentladung

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles` - die bisherige Lebensdauer der Batteriezyklen `[**] plenticore.X.devices.local.battery.DynamicSoc` - wahr, wenn dynamischer SoC aktiviert ist (nur wenn auch `SmartBatteryControl` wahr ist) `[**] plenticore.X.devices.local.battery.MinHomeConsumption` - der minimale Stromverbrauch zu Hause, der wird benötigt, damit die Batterie verwendet werden kann `[**] plenticore.X.devices.local.battery.MinSoc` - der gewünschte minimale SoC (Ladezustand) der Batterie. Der tatsächliche SoC kann darunter liegen, wenn keine Sonnenenergie vorhanden ist.
`plenticore.X.devices.local.battery.MinSocDummy` - Dieser Wert wird vom Adapter festgelegt, wenn die MinSoC-Verwaltung in der Konfiguration deaktiviert ist. Es soll zeigen, auf welchen Wert der MinSoC eingestellt werden würde.
`plenticore.X.devices.local.battery.P` - die aktuelle Batterieleistung (negativ beim Laden, positiv beim Entladen) `plenticore.X.devices.local.battery.Charge_P` - die aktuelle Batterieladeleistung (0 beim Entladen) `plenticore.X.devices.local.battery.Discharge_P` - die aktuelle Batterieentladeleistung (0 beim Laden) ) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` - true, wenn das Smart Battery Management aktiviert ist. In Bezug auf das offizielle Handbuch darf dies nur aktiviert werden, wenn keine weitere Wechselstromquelle wie ein zweiter Wechselrichter vorhanden ist. `[**] plenticore.X.devices.local.battery.ExternControl` - 0 zur Aktivierung der internen Steuerung, 1 für externe digitale E / A, 2 für externe Modbus-TCP §§SSSSS_11§ § - der aktuelle Ladezustand der Batterie

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower` - die maximale Leistung, die der Wechselrichter liefern kann

#### Plenticore.X.devices.local.pv1 / pv2 / pv3
`plenticore.X.devices.local.pvX.P` - die aktuelle Leistung, die von Phase X der Anlage bereitgestellt wird

### Plenticore.X.scb
Dieser Kanal enthält Informationen und Einstellungen des Geräts

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable` - true, wenn der Modbus TCP aktiviert ist `[**] plenticore.X.scb.modbus.ModbusUnitId` - Modbus-Einheiten-ID des Geräts

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname` - der aktuelle Hostname des Wechselrichters `[**] plenticore.X.scb.network.IPv4Auto` - DHCP verwenden, um die IP-Adresseinstellungen für den Wechselrichter bereitzustellen `[**] plenticore.X.scb.network.IPv4Address` - die aktuelle IP-Adresse des Wechselrichters `[**] plenticore.X.scb.network.IPv4DNS1` und § §SSSSS_4§§ - die aktuell verwendeten DNS-Server `[**] plenticore.X.scb.network.IPv4Gateway` - das aktuell verwendete Netzwerk-Gateway `[**] plenticore.X.scb.network.IPv4Subnetmask` - die Netzwerk-Subnetzmaske

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers` - die aktuell verwendeten Zeitserver (NTP). Dies können mehrere durch Leerzeichen getrennte sein.
`[**] plenticore.X.scb.time.NTPuse` - Verwenden Sie NTP, um die aktuellen Gerätezeiteinstellungen einzustellen. `[**] plenticore.X.scb.time.Timezone` - Die Zeitzone des Geräts

### Plenticore.X.scb.statistic.EnergyFlow
Die Datenpunkte in diesem Abschnitt enthalten die Statistiken, die in der Plenticore-Webbenutzeroberfläche angezeigt werden. Im Folgenden werden nur die `Day` Datenpunkte erwähnt, aber jeder von ihnen ist auch für `Month`, `Year` und `Total` verfügbar.

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - die Autarkie in Prozent für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - die geschätzte CO2-Einsparung in kg für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - der gesamte Eigenverbrauch in Wh für den aktuellen Tag §§SSSSS_3§ § - der gesamte Eigenverbrauch der PV-Anlage für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - der gesamte Eigenverbrauch der Batterie für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - der gesamte Eigenverbrauch des Stromnetzes für die aktueller Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - die Gesamtleistung, die für den aktuellen Tag an das Stromnetz gesendet wird `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - die eigene Verbrauchsrate (erzeugte Anlagenleistung, die NICHT an das Stromnetz gesendet wird) für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.YieldDay` - der Gesamtertrag der Pflanze für den aktuellen Tag

## Prognosedaten
Um die Vorhersagefunktion mit Strom zu versorgen, werden verschiedene Wetterdatenquellen verwendet. Es funktioniert sofort, aber Sie können die Ergebnisse verbessern, indem Sie Instanzen eines oder mehrerer der folgenden Wetteradapter hinzufügen: ioBroker.darksky, ioBroker.weatherunderground, ioBroker.daswetter. Damit die Funktion funktioniert, muss die globale Geoposition des Systems (Längen- und Breitengrad) konfiguriert und die erweiterte Konfiguration des Plenticore-Adapters festgelegt sein (Panel- und Batteriedaten, falls zutreffend).

### Wie funktioniert die Prognose?
Die Prognosefunktion verwendet die bereitgestellten Daten Ihres Kraftwerks und Ihrer Batterie, um die maximal mögliche Stromerzeugung zu jeder Tageszeit zu berechnen. Dazu wird der Standort des Systems verwendet, um die Sonnenhöhe und den Azimut zu ermitteln und die Sonnenstrahlungswerte zu berechnen. Diese Werte werden mit Wettervorhersagedaten aus verschiedenen Quellen kombiniert, um die Vorhersage von Bewölkung, Nebel und Regen für jede Stunde des Tages zu erhalten. Aus diesen Daten berechnet der Adapter einen möglichen Strom, den die Anlage in jedem Sonnenlicht erzeugen kann.

Die Prognosewerte können dann verwendet werden, um den MinSoC der Batterie einzustellen, das dynamische "intelligente Batteriemanagement" des Konverters zu aktivieren oder zu deaktivieren (beide werden intern vom Adapter durchgeführt) oder andere Entscheidungen im Haushalt zu steuern, z. G. Heizung, Waschmaschine, Trockner, Geschirrspüler usw. (erfolgt durch externes JavaScript / Blockly des Benutzers).

### Plenticore.0.forecast.consumption
`plenticore.0.forecast.consumption.day` - aktueller Stromverbrauchsdurchschnitt für den Tag während der letzten 3 Tage `plenticore.0.forecast.consumption.night` - aktueller Stromverbrauchsdurchschnitt für die Nacht während der letzten 3 Tage `plenticore.0.forecast.consumption.remaining` - geschätzter verbleibender Stromverbrauch für den aktuellen Prognosetag bis Sonnenuntergang

### Plenticore.0.forecast.current
`plenticore.0.forecast.current.power.generated` - erzeugte Anlagenleistung am aktuellen Tag bis zur aktuellen Zeit `plenticore.0.forecast.current.power.max` - berechnete maximale Anlagenleistung bei klarem Himmel (0% Wolkendecke) `plenticore.0.forecast.current.power.sky` - berechnete Anlagenleistung unter Berücksichtigung der aktuellen Wolkendecke von Wetteradapter `plenticore.0.forecast.current.power.skyvis` - berechnete Anlagenleistung unter Berücksichtigung der aktuellen Wolkendecke und Sichtbarkeit von Wetteradaptern `plenticore.0.forecast.current.power.skyvisrain` - berechnete Anlagenleistung unter Berücksichtigung der aktuellen Wolkendecke, Sichtbarkeit und Regenvorhersage von Wetteradaptern `plenticore.0.forecast.current.visibility.*` - Aktuelle Sichtbarkeitsprognose des entsprechenden Wetteradapters `plenticore.0.forecast.current.rain.*` - Aktuelle Regenvorhersage des entsprechenden Wetteradapters `plenticore.0.forecast.current.rainChance.*` - Aktuelle Regenwahrscheinlichkeitsprognose des entsprechenden Wetteradapters `plenticore.0.forecast.current.sky.*` - Aktuelle Wolkenvorhersage bereitgestellt durch den entsprechenden Wetteradapter `plenticore.0.forecast.current.sky_high.*` - aktuelle Wolkenvorhersage (obere Luftschichten) bereitgestellt durch den entsprechenden Wetteradapter `plenticore.0.forecast.current.sky_medium.*` - aktuelle Wolkenvorhersage (mittlere Luft la yers) bereitgestellt durch den entsprechenden Wetteradapter `plenticore.0.forecast.current.sky_low.*` - aktuelle Wolkenvorhersage (untere Luftschichten) bereitgestellt durch den entsprechenden Wetteradapter `plenticore.0.forecast.current.sun.azimuth` - aktuelle Sonnenposition (Azimut) `plenticore.0.forecast.current.sun.elevation` - aktuelle Sonnenposition ( eleevation)

### Plenticore.0.forecast.day1 - Gleiches gilt für Tag2
`plenticore.0.forecast.day1.power.date` - Datum, an dem die aktuellen Leistungsprognoseinformationen für `plenticore.0.forecast.day1.power.day` gelten - Gesamtleistungsprognose für den Tag `plenticore.0.forecast.day1.power.day_adjusted` - Gesamtleistungsprognose für den Tag unter Berücksichtigung der bisher erzeugten Leistung und unter Verwendung von Prognosedaten nur für verbleibende Sonnenstunden `plenticore.0.forecast.day1.power.day_high` - Gesamtleistungsvorhersage für den Tag ohne Berücksichtigung der Sichtbarkeitsdaten des Wetteradapters `plenticore.0.forecast.day1.power.remaining` - verbleibende Gesamtleistungsvorhersage für den Tag, basierend auf Vorhersage für verbleibende Sonnenstunden `plenticore.0.forecast.day1.power.Xh.power` - geschätzte Gesamtleistung der Anlage zur Sonnenstunde X des Prognosetages, wobei 1h die Stunde des Sonnenaufgangs ist `plenticore.0.forecast.day1.power.Xh.power_high` - geschätzte Gesamtleistung der Anlage zur Sonnenstunde X des Prognosetages, jedoch ohne Berücksichtigung der Sichtbarkeit oder Regendaten `plenticore.0.forecast.day1.power.Xh.time` - die Zeit, zu der die Sonnenstunde für `plenticore.0.forecast.power.Xh.power` beginnt `plenticore.0.forecast.day1.sun.sunrise` - Sonnenaufgangszeit des Prognosedatums `plenticore.0.forecast.day1.sun.sunset` - Sonnenuntergangszeit des Prognosedatums

## Spenden
[![paypal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 2.1.3
-   Fixed wrong hour of weather forecast from daswetter adapter

### 2.1.2
-   Added setting for minimum SoC to enable battery management

### 2.1.1
-   Fixed problems in config and translations

### 2.1.0
-   Added further forecast sources to provide better power forecasts
-   Added second day forecast
-   Improved code and fixed some minor issues
-   New dependency for xml2js
-   Updated readme

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