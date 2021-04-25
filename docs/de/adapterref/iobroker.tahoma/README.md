---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tahoma/README.md
title: NICHT AKTUELL GEWARTET !!!
hash: O8jue3Vsog/1wlwxiQ4xFu6UGjUptJA7NZEfwi+kqQo=
---
![Logo](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![Anzahl der Installationen](http://iobroker.live/badges/tahoma-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tahoma.svg)
![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![Stabil](http://iobroker.live/badges/tahoma-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Build-Status](https://travis-ci.org/StrathCole/ioBroker.tahoma.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# NICHT AKTUELL GEWARTET !!!
# IoBroker.tahoma
Ein ioBroker-Adapter für Somfy Tahoma. Dieses Projekt ist nicht mit Somfy verbunden. Zunächst basierend auf dem Skript von https://forum.iobroker.net/post/336001.

Der Adapter stellt eine Verbindung zur Tahomalink-Endbenutzer-API her und steuert die über Tahoma Box (und höchstwahrscheinlich Connexoon) eingerichteten Geräte.
Der Adapter ist noch nicht vollständig ausgestattet, sollte jedoch die meisten Aktionen zur Steuerung von Jalousien und Rollläden usw. unterstützen.

Nach einigen der vom Adapter erstellten Zustände.

## Tahoma.X.location
Der Status in diesem Baum enthält die persönlichen Informationen des Benutzers wie Stadt, Straße und Längen- / Breitengrad.

## Tahoma.X.devices. *. deviceURL
Dieser Status enthält die Geräte-URL, die Tahoma zur Identifizierung des Geräts verwendet.

## Tahoma.X.devices. *. Befehle
Diese Zustände enthalten Schaltflächenbefehle zur Steuerung der Geräte. Die meisten Geräte unterstützen Befehle wie `close` und `open`, aber auch einige mehr.
Einige der Befehle haben am Ende einen `:slow`, wenn dies vom Gerät unterstützt wird. Die Verwendung dieser ermöglicht einen langsamen oder sogenannten Silent-Modus.

## Tahoma.X.devices. *. Staaten
Diese Zustände enthalten den aktuellen Status der Geräte wie folgt. Alle mit `[**]` gekennzeichneten Einstellungen können bearbeitet werden, um das Verhalten / die Sendebefehle des Geräts zu steuern.
Einige Staaten haben am Ende einen `:slow`, wenn dies vom Gerät unterstützt wird. Durch Einstellen dieser Werte wird der langsame oder sogenannte Silent-Modus aktiviert.

`[**] tahoma.X.devices.*.states.core:DeploymentState` - Enthält Informationen zum aktuellen Bereitstellungsstatus und steuert diesen. 100 bedeutet vollständig bereitgestellt, 0 ist nicht bereitgestellt. Nicht alle Geräte haben diesen Wert, einige haben stattdessen `ClosureState`.
`[**] tahoma.X.devices.*.states.core:TargetDeploymentState` - Siehe `tahoma.X.devices.*.states.core:DeploymentState` `[**] tahoma.X.devices.*.states.coreClosureState` - Bietet Informationen über den aktuellen Stand der Schließung und steuert diesen. 100 bedeutet vollständig geschlossen, 0 ist offen. Nicht alle Geräte haben diesen Wert, einige haben stattdessen `DeploymentState`.
`[**] tahoma.X.devices.*.states.core:TargetClosureState` - Siehe `tahoma.X.devices.*.states.core:ClosureState` `[**] tahoma.X.devices.*.states.core:OrientationState` - Bietet Informationen über und überwacht die Ausrichtung (z. B. für Rollläden) von Lamellen. Nicht alle Geräte bieten diesen Wert.
`[**] tahoma.X.devices.*.states.core:TargetOrientationState` - Siehe `tahoma.X.devices.*.states.core:OrientationState` `tahoma.X.devices.*.states.core:NameState` - Enthält den aktuellen Namen des Geräts.
`tahoma.X.devices.*.states.core:OpenClosedState` - Enthält `closed` wenn das Gerät zu 100% geschlossen oder zu 0% eingesetzt ist und `open` sonst.
`tahoma.X.devices.*.states.core:PriorityLockTimerState` - Wenn ein Sensor das Gerät gesperrt hat, wird dies hier angegeben, z. G. ein Windsensor blockiert eine Markise.
`tahoma.X.devices.*.states.core:RSSILevelState` - Die aktuelle Signalqualität des Gerätes.
`tahoma.X.devices.*.states.core:StatusState` - `available` wenn das Gerät aktuell verfügbar ist.
`tahoma.X.devices.*.states.io:PriorityLockLevelState` - Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` `tahoma.X.devices.*.states.io:PriorityLockOriginatorState` - Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` `tahoma.X.devices.*.states.moving` - Gibt an, ob sich das Gerät gerade bewegt. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`

## Spenden
[![paypal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.3.3

-  Removed credentials from log on error and debug

### 0.3.2

-  Fixed silent modes (low speed) for newer Somfy devices
-  Fixed problem with wrong reference to `this`

### 0.3.1

-   Fixed adapter crash on empty response object after request error
-   Fixed problems with slow/silent mode for closure

### 0.3.0

-   Added possibility for low speed open and close on supported devices
-   Fixed commands not stopping on next command for device
-   Smaller fixes

### 0.2.6

-   Added queue for device commands not already covered by update to 0.2.1

### 0.2.5

-   Added README for states

### 0.2.4

-   Switched moving state values 1 / 2 for DeploymentState devices

### 0.2.3

-   Fixed direction (moving state) for deployment devices

### 0.2.2

-   Fixed problem with DeploymentState treated as ClosureState on setting values

### 0.2.1

-   Fixed problems with too many simultanous commands/devices

### 0.2.0

-   Added deployment actions
-   Added new state for moving direction
-   Changed command buttons to boolean type

### 0.1.2

-   Retry device command on error 400 (payload) once

### 0.1.1

-   No changes

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