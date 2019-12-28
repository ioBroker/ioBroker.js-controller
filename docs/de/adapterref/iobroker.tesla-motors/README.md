---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-Motoren
hash: kp6leltbRQIjsPgMbOLtAqkQ38kWJ0diAbSaBIGbx/w=
---
![Logo](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Eingerichtet](http://iobroker.live/badges/tesla-motors-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/dbweb-ch/iobroker.tesla-motors.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors/badge.svg)
![Build Status](http://img.shields.io/travis/dbweb-ch/ioBroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
## Tesla motors adapter für ioBroker
Dieser Adapter gibt ioBroker die Kontrolle über Ihr Tesla-Auto.

## Aufbau
1. Erstellen Sie eine neue Instanz des Adapters. Jedes Auto benötigt eine eigene Instanz.
2. Wählen Sie Ihre bevorzugte Aktualisierungsrate aus (siehe [Aktualisierungsrate] (# refreshRate)).
2. Geben Sie Ihren Tesla-Benutzernamen und Ihr Tesla-Passwort ein.
3. Klicken Sie auf "Token abrufen", um ein Token und ein Aktualisierungstoken von Tesla anzufordern.
4. Wählen Sie Ihr Auto in der Dropdown-Liste.

### <a name="refreshRate"></a> Aktualisierungsrate
Um die Batterie zu schonen, wechselt das Auto nach einer bestimmten Zeit ohne Aktivität in den Ruhemodus. <br /> Das Abrufen von Informationen aus dem Auto ist nur möglich, wenn das Auto wach ist. <br /> Benutzer berichteten, dass das Auto bis zu 10 km Reichweite pro Tag verbrauchen kann, wenn es nicht in den Ruhezustand geht. <br /> Um dies zu verhindern, können Sie die gewünschte Aktualisierungsrate auswählen:

* **Aus** - Der Adapter weckt das Auto nicht automatisch auf. Es weckt das Auto nur auf Anfrage (wenn Sie einen Zustand einstellen).

<br /> Wenn das Auto von alleine aufgewacht ist, fordert der Adapter einmalig Fahrzeugdaten an.

* **Gemäßigt** - Der Adapter weckt das Auto einmal pro Stunde auf, um seinen Zustand zu ermitteln.
* **Aggressiv** - Der Adapter weckt das Auto einmal pro Minute auf.
* **Smart** - Der Adapter versucht, intelligent zu sein. Es wird der Auto-Schlafzustand beobachtet. Wenn das Auto aufwacht,

Es wird davon ausgegangen, dass bald jemand fährt, und der Status wird jede Minute für 10 Minuten abgefragt.
Wenn nichts passiert ist (kein Klima, kein Fahren, kein Laden), fordert der Adapter 15 Minuten lang nicht mehr an, das Auto einschlafen zu lassen. In jedem Fall wird das Auto aufgeweckt und nach 12 Stunden Daten abgerufen.

## Adapter verwenden
Der Adapter erstellt mehrere Zustände. Die sind gruppiert nach ihren Themen:

* **chargeState** - zum Laden, Akku und Reichweite.
* **climateState** - Temperaturen und Fensterzustände.
* **driveState** - Position und Geschwindigkeit
* **softwareUpdate** - Informationen zu ausstehenden Softwareupdates
* **Fahrzeug** - Informationen zu Ihrem Fahrzeug

Es gibt eine spezielle Gruppe mit dem Namen **command** in der Sie alle Befehle zur Steuerung Ihres Autos finden.
Einige von ihnen arbeiten in beide Richtungen, zum Beispiel wird sich der Klimazustand ändern, wenn das Klima durch das Auto abgeschaltet wird. Sie können dies in der Spalte "Senden / Empfangen" sehen.

Name | Beschreibung | **S** end / **R** ecieve -------------- | -------------- | -------------- ChargePort | Ladeöffnung öffnen / schließen | SR UnlockChargePort | Schaltet den Ladeanschluss frei S Aufladen | Laden starten / beenden | SR Klima | Klima starten / stoppen | SR RemoteStart | Fernstart aktivieren / deaktivieren | SR SentryMode | Sentry-Modus aktivieren / deaktivieren | SR SetChargeLimit | Gebührenlimit in% | einstellen SR SetTemperature | Solltemperatur einstellen. Vergiss nicht, das Klima einzuschalten! | SR SpeedLimit | Geschwindigkeitsbegrenzung aktivieren | SR SpeedLimitValue | Geschwindigkeitsgrenzwert | SR StartSoftwareUpdate | Starten Sie das Software-Update | SR SunRoofVent | Sonnendachentlüftung | SR ValetMode | Valet Mode | SR ValetPin | Valet Pin | SR Standby | Wenn sich das Auto im Standby-Modus befindet (Stellen Sie dies ein, um es manuell aufzuwecken) | SR Türschloss | Schlösser / Öffnet die Tür SR Taschenlampen | Blink die Lichter | S honkHorn | Hupen Sie das Horn | S openFrunk | Frunk öffnen (nicht erhalten) | S openTrunk | Kofferraum öffnen (kein Empfang) | S seat_heater_left | Sitzheizung Linke Ebene (0-3) | SR seat_heater_rear_center | Sitzheizung Mitte hinten (0-3) | SR seat_heater_rear_left | Sitzheizung hinten links (0-3) | SR seat_heater_rear_right | Sitzheizung hinten rechts (0-3) | SR seat_heater_right | Sitzheizung Rechte Ebene (0-3) | SR lenkradheizung | Lenkradheizung | SR windowVent | Fensterlüfter | SR

## Sicherheit &amp; Referenzen
Die Tesla-API verwendet einen Token-basierten Sicherheitsansatz. <br /> Das Token läuft ab (derzeit nach 45 Tagen), aber das System kann ein neues Token mit dem Refresh Token abrufen. <br /> Ihre Anmeldeinformationen müssen nicht gespeichert werden, damit der Adapter funktioniert. Wenn Sie jedoch Probleme beim Aktualisieren des Tokens haben, kann dies die Stabilität erhöhen, da der Adapter jederzeit ein neues Token erhalten kann. <br /><aside class="warning"> Warnung: <br /> Mit Ihren Tesla-Anmeldeinformationen können Sie das while-Auto einschließlich geöffneter Fenster steuern und sogar herumfahren. Bewahren Sie Ihre Anmeldeinformationen auf! <br /> Um alle Token abzulehnen, ändern Sie das Passwort Ihres Tesla-Kontos! </aside>

## Mitwirkende
* dbweb-ch
* Apollon77

## Changelog
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

Copyright (c) 2019 Dominic Blattmann <nick@dbweb.ch>

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