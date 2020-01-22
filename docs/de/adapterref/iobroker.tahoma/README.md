---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: 6jJeftdc0XAKJLMQDjrLpjPo+Iha2eALuaX8cShxvjc=
---
![Logo](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Build Status](https://travis-ci.org/StrathCole/ioBroker.tahoma.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.tahoma
Ein ioBroker-Adapter für Somfy Tahoma. Dieses Projekt hat keine Zugehörigkeit zu Somfy. Ursprünglich basierend auf dem Skript von https://forum.iobroker.net/post/336001.

Der Adapter stellt eine Verbindung zur Tahomalink-Endbenutzer-API her und steuert die Geräte, die über die Tahoma Box (und höchstwahrscheinlich Connexoon) eingerichtet wurden.
Der Adapter ist noch nicht mit allen Funktionen ausgestattet, sollte jedoch die meisten Aktionen zur Steuerung von Jalousien und Rollläden usw. unterstützen.

Befolgen Sie einige der vom Adapter erstellten Status.

## Tahoma.X.Location
Der Status in diesem Baum enthält die persönlichen Informationen des Benutzers wie Stadt, Straße und Längengrad / Breitengrad.

## Tahoma.X.devices. *. deviceURL
Dieser Status enthält die Geräte-URL, mit der Tahoma das Gerät identifiziert.

## Tahoma.X.devices. *. -Befehle
Diese Zustände enthalten Schaltflächenbefehle zur Steuerung der Geräte. Die meisten Geräte unterstützen Befehle wie `close` und `open`, aber auch einige andere.
Einige Befehle haben am Ende einen `:slow`, sofern dies vom Gerät unterstützt wird. Wenn Sie diese verwenden, wird eine niedrige Geschwindigkeit oder ein sogenannter Silent-Modus aktiviert.

## Tahoma.X.devices. *. states
Diese Zustände enthalten den aktuellen Status der Geräte wie folgt. Alle mit `[**]` gekennzeichneten Einstellungen können bearbeitet werden, um das Verhalten / die Sendebefehle des Geräts zu steuern.
Einige Staaten haben am Ende einen `:slow`, wenn dies vom Gerät unterstützt wird. Wenn Sie diese einstellen, wird die niedrige Geschwindigkeit oder der sogenannte stille Modus aktiviert.

`[**] tahoma.X.devices.*.states.core:DeploymentState` - Stellt Informationen zum aktuellen Bereitstellungsstatus bereit und steuert diesen. 100 bedeutet vollständig implementiert, 0 ist nicht implementiert. Nicht alle Geräte haben diesen Wert, einige haben stattdessen `ClosureState`.
`[**] tahoma.X.devices.*.states.core:TargetDeploymentState` - Siehe `tahoma.X.devices.*.states.core:DeploymentState` `[**] tahoma.X.devices.*.states.coreClosureState` - Stellt Informationen zum aktuellen Schließungsstatus bereit und steuert diesen. 100 bedeutet vollständig geschlossen, 0 ist offen. Nicht alle Geräte haben diesen Wert, einige haben stattdessen `DeploymentState`.
`[**] tahoma.X.devices.*.states.core:TargetClosureState` - Siehe `tahoma.X.devices.*.states.core:ClosureState` `[**] tahoma.X.devices.*.states.core:OrientationState` - Bietet Informationen über und steuert die Ausrichtung (z. B. für Rollläden) von Lamellen. Nicht alle Geräte bieten diesen Wert.
`[**] tahoma.X.devices.*.states.core:TargetOrientationState` - Siehe `tahoma.X.devices.*.states.core:OrientationState` `tahoma.X.devices.*.states.core:NameState` - Enthält den aktuellen Namen des Geräts.
`tahoma.X.devices.*.states.core:OpenClosedState` - Enthält `closed`, wenn das Gerät zu 100% geschlossen oder zu 0% in Betrieb ist, und `open`, ansonsten.
`tahoma.X.devices.*.states.core:PriorityLockTimerState` - Wenn ein Sensor das Gerät gesperrt hat, wird dies hier angegeben, z. G. Ein Windsensor blockiert eine Markise.
`tahoma.X.devices.*.states.core:RSSILevelState` - Die aktuelle Signalqualität des Geräts.
`tahoma.X.devices.*.states.core:StatusState` - `available`, wenn das Gerät aktuell verfügbar ist.
`tahoma.X.devices.*.states.io:PriorityLockLevelState` - Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` `tahoma.X.devices.*.states.io:PriorityLockOriginatorState` - Siehe `tahoma.X.devices.*.states.core:PriorityLockTimerState` `tahoma.X.devices.*.states.moving` - Gibt an, ob sich das Gerät gerade bewegt. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`

## Spenden
[![paypal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.3.1

-   Fixed adapter crash on empty response object after request error

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