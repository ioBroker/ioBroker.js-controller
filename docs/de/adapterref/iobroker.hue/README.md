---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hue/README.md
title: ioBroker Philips Hue Bridge Adapter
hash: +wmhAQViMGBbMc3up4o09shIerhDFbIruvymapkXLIU=
---
![Logo](../../../en/adapterref/iobroker.hue/admin/hue.jpeg)

![Anzahl der Installationen](http://iobroker.live/badges/hue-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hue.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hue.svg)
![NPM](https://nodei.co/npm/iobroker.hue.png?downloads=true)

# IoBroker Philips Hue Bridge Adapter
==============

## English: gb:
Dieser Adapter verbindet Ihre Philips Hue Bridges mit ioBroker, um Philips Hue LED-Lampen, Friends of Hue LED-Lampen, Streifen, Stecker wie von Osram und andere SmartLink-fähige Geräte (wie LivingWhites und einige LivingColors) zu steuern.

### Konfiguration
Nachdem Sie diesen Adapter in ioBroker installiert haben, erstellen Sie eine entsprechende Adapterinstanz. Als nächstes müssen Sie Ihre Hue Bridge mit ioBroker in den Adaptereinstellungen verbinden:

1. Wenn Sie eine andere Bridge als v2 verwenden, konfigurieren Sie den Port auf 80 (nicht https), andernfalls sollte 443 (https) der richtige Weg sein.
2. Klicken Sie auf die Schaltfläche "Find Bridge", um die IP-Adresse Ihrer Bridge abzurufen. Dadurch werden alle Brücken in Ihrer Umgebung gesucht. Wählen Sie dann die Bridge aus, zu der Sie eine Verbindung herstellen möchten. Das Feld "Bridge Address" wird mit der IP-Adresse der von Ihnen gewählten Hue Bridge gefüllt.
3. Klicken Sie anschließend in den Einstellungen auf die Schaltfläche "Benutzer erstellen" und gehen Sie zu Ihrem Hue Bridge-Gerät, also Ihrer Hardware, um die runde Schaltfläche zu drücken. Sie haben 30 Sekunden Zeit, um fortzufahren. Sobald Sie den Knopf gedrückt haben, sollte das Feld "Bridge User" mit einem generierten String gefüllt sein.
4. Ändern Sie andere Optionen in den Adaptereinstellungen und wählen Sie dann "Speichern und schließen".
5. Schließlich sollten Sie fertig sein: Der Adapter generiert alle Objekte, um Ihre Hue-Geräte entsprechend zu steuern.

Bitte beachten Sie: Die Schaltfläche "Find Bridge" für die Adaptereinstellungen ist inaktiv, wenn das Feld "Bridge Address" (Brückenadresse) ausgefüllt ist, und die Schaltfläche "Create User" (Benutzer erstellen) ist inaktiv, wenn das Feld "Bridge User" (Brückenbenutzer) ausgefüllt ist.

### Die Einstellungen
| Name | Beschreibung |
|---|---|
| __Bridge-Adresse__ | IP-Adresse Ihrer Hue-Bridge. Sie können versuchen, sie zu erkennen, indem Sie die Taste `Find Bridge` drücken. |
| __Port__ | Port Ihrer Hue-Bridge, normalerweise 443 (SSL) und 80 (Nicht-SSL). |
| __User__ | Benutzername Ihres Bridge-Benutzers. Sie können es erstellen, indem Sie die Taste `Create User` drücken und den Anweisungen auf dem Bildschirm folgen |
| __User__ | Benutzername Ihres Bridge-Benutzers. Sie können es erstellen, indem Sie auf die Schaltfläche "Benutzer erstellen" klicken und den Anweisungen auf dem Bildschirm folgen |
| __Ignore scenes__ | Wenn diese Option aktiviert ist, werden Szenen vom Adapter nicht angezeigt / gesteuert. |
| __Gruppen ignorieren__ | Wenn diese Option aktiviert ist, werden Gruppen vom Adapter nicht angezeigt / gesteuert. |
| __ "Legacy" -Struktur__ | Um die Abwärtskompatibilität zu unterstützen, ist es möglich, eine alte Objektstruktur in ioBroker zu behalten. Diese alte Struktur ist `hue.<instance_number>.<brdige_name_channel>.<light_or_group_channel>.<state>`. Die neue Struktur entfernt `<brdige_name_channel>` und macht es daher erforderlich, alte Skripte usw. anzupassen. Wenn der Adapter eine vorhandene alte Struktur erkennt, wird die Struktur verwendet, ohne das Kontrollkästchen zu aktivieren. Wenn Sie jedoch von einer alten zu einer neuen Struktur migrieren möchten, löschen Sie den gesamten `hue.<instance_number>`-Namespace einmal. |
| __Natives Ein- / Ausschaltverhalten__ | Wenn diese Option aktiviert ist, schaltet der Adapter die Lichter auf dieselbe Weise ein / aus wie die native Hue-App. Andernfalls werden die Lampen beim Einschalten auf einen Wert von 100% gesetzt |
| __Polling__ | Wenn diese Option aktiviert ist, werden Statusänderungen vom Adapter abgefragt. Andernfalls können Lampen nur gesteuert und nicht angezeigt werden. |
| __Polling interval__ | Definiert, wie oft die Status abgefragt und somit in ioBroker aktualisiert werden. Niedrige Abfrageintervalle können in einigen Einstellungen zu Leistungsproblemen führen. Daher beträgt das minimal zulässige Abfrageintervall 2 Sekunden. Wenn das Abfrageintervall auf weniger als 2 Sekunden festgelegt ist, wird es während der Laufzeit auf 2 Sekunden festgelegt |

## Deutsch: de:
Bindet Philips Hue / LivingColors / LivingWhites Lampen ein.
In den Adapter-Einstellungen muss die IP der Hue Bridge sowie ein Benutzername konfiguriert werden. Um einen User zu aktivieren, drücken Sie auf den Button an der Hue bridge. Dann wird automatisch der User übergeben.

## Roadmap / Todo
* Automatische Brückenerkennung
* Automatische Benutzereinstellung über Bridge Link Button

## Changelog
### 2.2.3 (2019-10-21)
* (foxriver76) migrate everything to Hue v3
* (foxriver76) add possibility to turn on/off sensor
* (foxriver76) add anyOn state for all group
* (foxriver76) different kinds of fixes for v3 (Osram Plugs, SSL connection, etc)

### 2.1.0 (2019-10-15)
* (foxriver76) usage and adaptions for node-hue-api v3
* (foxriver76) ability to turn lights on with last settings
* (foxriver76) polling interval minimum is now 2 sec

### 2.0.1 (2019-10-04)
* (foxriver76) fixed bug, that prevented some sensor states getting updated during runtime

### 2.0.0 (2019-09-23)
__ATTENTION: Remove all objects once, ids have changed__
* (foxriver76) internal optimizations
* (foxriver76) usage of iobroker testing
* (foxriver76) add possibility to sync scenes
* (foxriver76) restart adapter when room is deleted in app
* (foxriver76) fix .hue value, user had to set 0-360° but adapter set 0-65535
* (foxriver76) fix .color.temperature
* (foxriver76) remove unnecessary bridge channel, adapter namespace is the bridge
* (foxriver76) add "update available" indicator for light bulbs
* (foxriver76) we now poll the root endpoint instead of (|lights| + |groups| + |sensors|) endpoints every pollingInterval seconds
* (foxriver76) min poll interval now 3 seconds instead of 5 seconds
* (foxriver76) add new indicator state 'anyOn'

### 1.2.4 (2019.09.18)
* (Apollon77) Make compatible with js-controller 2.0

### 1.2.3 (2019.03.11//2019.07.07)
* (jens-maus) Refactored command queue handling to use 'bottleneck' package so that command execution are processed with minimum delay.

### 1.1.2 (2019.01.25)
* (BasGo) Added compact mode

### 1.1.1 (2018.08.17)
* (bluefox) Ignoring of groups was implemented

### 1.1.0 (2018.08.17)
* (bluefox) The command queue was optimized

### 1.0.1 (2018.08.14)
* (bluefox) Roles were adjusted
* (bluefox) temperature changed from 153-cold, 500-warm to 2200-warm, 6500-cold
* (bluefox) hue changed from 0-65535 to 0-360°

### 1.0.0 (2018.04.12)
* (arteck) Enable/Disable OSRAM check from HUE Bridge
* (arteck) polling ZLLSwitch and ZGPSwitch     
* (bluefox) admin3
* (bluefox) do not send commands ofter than 10 in 10 seconds

### 0.6.9 (2017.05.18)
* (bluefox) Enable adapter by default

### 0.6.8 (2017.04.22)
* (bluefox) Poll groups

### 0.6.7 (2017.04.21)
* (bluefox) Fix error with turn on the lamp on start
* (bluefox) configurable port

### 0.6.6 (2017.04.20)
* (bluefox) Use new version of npm library

### 0.6.0 (2016.11.30)
* (pmant) support new lamps
* (pmant) add light name to log

### 0.5.9 (2016.10.11)
* (pmant) fix error with null values

### 0.5.8 (2016.06.05)
* (bluefox) fix typo

### 0.5.7 (2016.06.05)
* (soef) write back known states for group/room
* (soef) Integer conversion for bri_inc command

### 0.5.6
* (Pmant) (experimental) support for power switches

### 0.5.5
* (Pmant) fix error with xy state
* (Pmant) support level in command state

### 0.5.4
* (Pman) Lightset 0 fixed
* (Pman) support for diffent gamuts
* (Pman) support Rooms (new HUE App)

### 0.5.3
* (soef) Default Lightset 0 added

### 0.5.2
* (Pman) fix jscs warnings
* (Pman) improve RGB conversion
* (Pman) add update rgb color

### 0.5.1
* (Pman) fix find bridge popup

### 0.5.0
* (Pman) update to node-hue-api 1.2.x
* (Pman) add level state (bri percentage)

### 0.4.4
* (bluefox) fix config edit

### 0.4.3
* (Pmant) fix adapter crash

### 0.4.2
* (Pmant) add find bridge (experimental)
* (Pmant) add create user (experimental)
* (Pmant) fix enable polling

### 0.4.1
* (Pmant) calculate and write back inc values

### 0.4.0
* (Pmant) add command state

### 0.3.2
* (Pmant) add groups as channels (write only)
* (Pmant) fix prevent duplicate channel names

### 0.3.1
* (Pmant) fix another bug with spaces
* (Pmant) fix hue/sat bug
* (Pmant) fix effect bug
* (Pmant) fix xy colormode

### 0.3.0
* (Pmant) fix rgb states only for color lights
* (Pmant) change set known state changes immediately
* (Pmant) change on/off sets brightness to 254/0
* (Pmant) change changing any color (hs,ct,xy) while light is off sets brightness to max
* (Pmant) fix set brightness to zero if light is off
* (Pmant) change set bri to zero if lamp is not reachable
* (Pmant) fix bridges and lamps with spaces in name

### 0.2.1
* (Pmant) add rgb states (write only)
* (Pmant) fix parent/children warnings
* (Pmant) add switch light off if brightness is zero

### 0.1.4
* (bluefox) fix some null objects

### 0.1.3
* (hobbyquaker) config UI
* (hobbyquaker) added children

### 0.1.2
* (hobbyquaker) fixes

### 0.1.1

* (hobbyquaker) fixed min/max attributes
* (hobbyquaker) added common.oper.read/write attributes

### 0.1.0

* (hobbyquaker) first release

## License

Apache 2.0

Copyright (c) 2017-2019 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker