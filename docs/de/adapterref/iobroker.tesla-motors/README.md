---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-Motoren
hash: exSkZOo4rWuvSAZ3ldy3L4RuQ0nnHcTQRqgG2X6mVj8=
---
![Logo](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Eingerichtet](http://iobroker.live/badges/tesla-motors-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/dbweb-ch/iobroker.tesla-motors.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors/badge.svg)
![Build-Status](http://img.shields.io/travis/dbweb-ch/ioBroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motoren
## Tesla motors adapter für ioBroker
Dieser Adapter erweitert ioBroker um die Kontrolle über Ihr Tesla-Auto.

## Aufbau
1. Erstellen Sie eine neue Instanz des Adapters. Jedes Auto benötigt eine eigene Instanz.
2. Wählen Sie Ihre bevorzugte Aktualisierungsrate aus (siehe [Aktualisierungsrate] (# refreshRate)).
2. Geben Sie Ihren Tesla-Benutzernamen und Ihr Tesla-Passwort ein.
3. Klicken Sie auf "Token abrufen", um ein Token und ein Aktualisierungstoken von Tesla anzufordern.
4. Wählen Sie Ihr Auto in der Dropdown-Liste.

###<a name="refreshRate"></a> Aktualisierungsrate
Um Batterie zu sparen, geht das Auto nach einer bestimmten Zeit ohne Aktivität in den Schlafmodus.<br /> Das Abrufen von Informationen aus dem Auto ist nur möglich, wenn das Auto wach ist.<br /> Benutzer berichteten, dass das Auto bis zu 10 km Reichweite pro Tag verbrauchen kann, wenn es nicht in den Ruhezustand wechselt.<br /> Um dies zu verhindern, können Sie die gewünschte Aktualisierungsrate auswählen:

* **Aus** - Der Adapter weckt das Auto nicht von selbst auf. Das Auto wird nur auf Anfrage geweckt (wenn Sie einen Status festlegen).

<br />Wenn das Auto von selbst aufgewacht ist, fordert der Adapter einmal Fahrzeugdaten an.

* **Gemäßigt** - Der Adapter weckt das Auto einmal pro Stunde, um seinen Zustand zu ermitteln.
* **Aggressiv** - Der Adapter weckt das Auto einmal pro Minute.
* **Smart** - Der Adapter versucht, intelligent zu sein. Es wird den Schlafzustand des Autos beobachten. Wenn das Auto aufwacht,

Es wird davon ausgegangen, dass jemand bald fährt, und der Staat wird 10 Minuten lang jede Minute nach dem Status gefragt.
Wenn nichts passiert ist (kein Klima, kein Fahren, kein Laden), fordert der Adapter 15 Minuten lang nicht mehr auf, das Auto einschlafen zu lassen. In jedem Fall wird das Auto geweckt und nach 12 Stunden werden Daten abgerufen.

## Verwenden des Adapters
Der Adapter erstellt mehrere Zustände. Sie sind nach ihren Themen gruppiert:

* **loadState** - Informationen zu Ladung, Akku und Reichweite.
* **ClimateState** - Temperaturen und Fensterzustände.
* **driveState** - Position und Geschwindigkeit
* **softwareUpdate** - Informationen zu ausstehenden Softwareupdates
* **Fahrzeug** - Informationen zu Ihrem Fahrzeug

Es gibt eine spezielle Gruppe namens **Befehl** in der Sie alle Befehle zur Steuerung Ihres Autos finden.
Einige von ihnen arbeiten in beide Richtungen, zum Beispiel ändert sich der Klimazustand, wenn das Klima vom Auto abgeschaltet wird. Sie können dies in der Spalte "Senden / Empfangen" sehen.

Name | Beschreibung | **S** end / **R** ecieve -------------- | -------------- | -------------- ChargePort | Ladeanschluss öffnen / schließen | SR UnlockChargePort | Schaltet den Ladeanschluss | frei S Aufladen | Laden starten / stoppen | SR Klima | Klima starten / stoppen | SR RemoteStart | Fernstart aktivieren / deaktivieren | SR SentryMode | Sentry-Modus aktivieren / deaktivieren | SR SetChargeLimit | Gebührenlimit in% | einstellen SR SetTemperature | Zieltemperatur einstellen. Vergessen Sie nicht, das Klima einzuschalten! | SR SpeedLimit | Geschwindigkeitsbegrenzung aktivieren | SR SpeedLimitValue | Geschwindigkeitsbegrenzungswert | SR StartSoftwareUpdate | Starten Sie das Software-Update | SR SunRoofVent | Sonnendachentlüftung | SR ValetMode | Parkservice | SR ValetPin | Valet Pin | SR Standby | Wenn sich das Auto im Standby-Modus befindet (Stellen Sie dies so ein, dass es manuell aufwacht) SR Türschloss | Schließt / öffnet die Tür | SR Blitzlichter | Blink die Lichter | S honkHorn | Hupen | S openFrunk | Open Frunk (kein Empfang) | S openTrunk | Kofferraum öffnen (kein Empfang) | S seat_heater_left | Sitzheizung Linke Ebene (0-3) | SR seat_heater_rear_center | Sitzheizung hinten hinten (0-3) | SR seat_heater_rear_left | Sitzheizung hinten links (0-3) | SR seat_heater_rear_right | Rücksitzheizung rechts (0-3) | SR seat_heater_right | Sitzheizung Rechte Ebene (0-3) | SR Lenkradheizung | Lenkradheizung | SR windowVent | Fensterlüftung | SR

## Sicherheit &amp; Referenzen
Die Tesla-API verwendet einen Token-basierten Sicherheitsansatz.<br /> Das Token läuft ab (derzeit nach 45 Tagen), aber das System kann mithilfe des Aktualisierungstokens ein neues Token abrufen.<br /> Ihre Anmeldeinformationen müssen nicht gespeichert werden, damit der Adapter funktioniert. Wenn Sie jedoch Probleme beim Aktualisieren des Tokens haben, kann dies zu einer Stabilisierung des Tokens führen, da der Adapter jederzeit ein vollständig neues Token erhalten kann.<br /><aside class="warning"> Warnung:<br /> Mit Ihren Tesla-Anmeldeinformationen können Sie das Auto steuern, einschließlich geöffneter Fenster und sogar herumfahren. Bewahren Sie Ihre Anmeldeinformationen auf!<br /> Um alle Token abzulehnen, ändern Sie das Passwort Ihres Tesla-Kontos!</aside>

## Mitwirkende
* dbweb-ch
* Apollon77
* Hombach

## Changelog
### 0.3.0
* (Hombach) Removed tests for node 8; updated dependencies
### 0.2.3
* (dbweb-ch) Refresh info every 5 seconds when car is moving
### 0.2.2
* (dbweb-ch) Use decrypt from ioBrokerTools, fix issue with selecting car
### 0.2.1
* (dbweb-ch) Fix bug with odomoter, refactor object creation, fix issues with compact mode
### 0.2.0
* (dbweb-ch) Included testing
* (dbweb-ch) Encrypt passwords
### 0.1.2
* (dbweb-ch) Added Roles, refactor states. 
* Attention: "awake" replaced by "standby" and inverted!
* Attention: Door lock is inverted.
### 0.1.1
* (dbweb-ch) Fix for Wakeup plan "smart"
### 0.1.0
* (dbweb-ch) Small fixes for Beta-Version release
### 0.0.3
* (dbweb-ch) control all state, added wakeup strategy
### 0.0.2
* (dbweb-ch) added all states
### 0.0.1
* (dbweb-ch) initial release

## License
MIT License

Copyright (c) 2020 Dominic Blattmann <nick@dbweb.ch>

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