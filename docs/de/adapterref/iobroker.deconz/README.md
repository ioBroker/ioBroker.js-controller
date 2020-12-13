---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.deconz/README.md
title: Wichtig: Entwicklung von Version 2.x.x gestoppt. Nicht installieren.
hash: 91pA5IsG6BdOllBnQVybbzjjPoeE9Bi4AY9lDb9wXOs=
---
![Logo](../../../en/adapterref/iobroker.deconz/admin/deconz.png)

![Anzahl der Installationen](http://iobroker.live/badges/deconz-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.deconz.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.deconz.svg)
![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)

ioBroker deConz dresden-elektronik Adapter

==============

# Wichtig: Entwicklung von Version 2.x.x gestoppt. Nicht installieren.
## Beachten
Keine Unterstützung für Beta / Pre-Release-Versionen von deConz.

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Erforderliche js-controller Version> 2.x.x, Erforderliche node.js> = 10.x.x.

## Englisch
Verbindet mit der von dresden-elektronik entwickelten deConz-Software. Diese Software soll eine universelle ZigBee Gateway-Lösung sein, die Hardware von dresden-elektronik, den ConBee USB-Stick und RaspBee, ein Modul für den Raspberry Pi, verwendet.

### Konfiguration
1. Lesen Sie die Dokumentation zu deConz / Phoscon und lesen Sie den Abschnitt [links] (https://github.com/iobroker-community-adapters/ioBroker.deconz#links).
2. Starten Sie den Adapter
3. * Geben Sie die IP-Adresse für deConz ein
    * Geben Sie die Portnummer ein, Standard ist 80.
    * IP und Port werden automatisch gespeichert
  * **Alternative:** Konfiguration schließen und wieder öffnen.

    Wenn deConz gefunden wurde, werden IP und Port jetzt angezeigt.

4. Klicken Sie auf "API-Schlüssel erstellen".
5. * Benutzername eingeben (Standard ist Freude)
    * Passwort eingeben (wird beim ersten Login auf der Phoscon APP festgelegt)
  * **Alternative:** Öffnen Sie die Phoscon APP -> Menü -> Einstellungen -> Gateway -> Erweitert -> Gateway entsperren

#### Mehr als einen Befehl gleichzeitig senden
Zu diesem Zweck gibt es ein Objekt namens "Aktion".

Beispiele:

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

#### Erstellen Sie eine Szene
   1. Stellen Sie alle Lichter in der Gruppe auf den Zustand ein, den Sie für die Szene wünschen
   2. Schreiben Sie den Namen Ihrer Szene in den Status "Erstellt Szene"

   Das ist es!

#### Gruppe erstellen
   1. Setzen Sie den Status `groups.creategroup` mit dem gewünschten Namen der Gruppe

      Dadurch wird eine leere Gruppe erstellt.

   2. Die Lampe (n) können jetzt mit `manage.addtoGroup` hinzugefügt werden.

      Stellen Sie dazu den Status mit der ID der Gruppe ein.

## Deutsche
Verbindet mit der von dresden-elektronik erled deConz-Software. Diese Software soll eine universelle ZigBee Gateway-Lösung sein, die Hardware von dresden-elektronik, ConBee USB-Stick und RaspBee, ein Modul für den Raspberry Pi, verwendet.

### Einrichten
1. Dokumentation von deConz / Phoscon lesen, Quellen lesen [Links] (https://github.com/iobroker-community-adapters/ioBroker.deconz#links).
2. Adapter starten
3. * IP-Adresse von deConz und
    * Port gehört, Standard ist Port 80
    * IP und Port wird automatisch überprüft
  * **Alterantiv:** Adpterkonfiguration schließen und erneuern öffnen.

    Wurde deConz gefunden steht jetzt IP und Port schon in der Maske.

4. "Erstelle API Key" enthält
5. * Nameame (Standard ist Freude) und
    * Passwort (wird beim ersten Anmelden in der Phoscon APP gehört) gehört
   * **Alterantiv:** Phoscon APP öffnen -> Menü -> Einstellungen -> Gateway -> Erweitert -> Auf "App gehört" klicken

#### Mehr als ein Befehl senden
Dafür gibt es das Objekt "Aktion".

Beispiele:

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

#### Weisen Sie eine Szene
   1. Stellen Sie alle Lichter in der Gruppe auf den Zustand ein, den Sie für die Szene Situationen
   2. Schreiben Sie den Namen Ihrer Szene im Status "Erstehende Szene"

   Das Kriege!

#### Gruppe erstellen
   1. Den state `groups.creategroup` mit dem richtigen Namen der Gruppe setzen.

      Damit wird eine leere Gruppe erledigt.

   2. Die Lampe (n) kann jetzt mit `manage.addtoGroup` hinzugefügt werden.

      Dazu gehört der Staat mit der ID der Gruppe.

## Links
- [Phoscon APP] (https://phoscon.de/)
- [Unterstützte Geräte] (https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices)
- [deConz] (https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/)
- [REST-Plugin auf Github] (https://github.com/dresden-elektronik/deconz-rest-plugin)
- [Gateways (Hardware)] (https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/)

## [Sponsoren](https://github.com/iobroker-community-adapters/ioBroker.deconz/blob/master/SPONSORS.MD)
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für Jey Cee, keine Beziehung zum ioBroker-Projekt!) [![Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## Treten Sie dem Discord-Server bei, um alles über die Integration von ioBroker-deconz zu besprechen!
<a href="https://discord.gg/uPwfzvR"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## Changelog

### 2.0.5
* fix buttonpressed not shown

### 2.0.4
* remove sentry for js-controller version <3
* replace request with axios
* use object_definition.js and iobroker-adapter-helpers
* added channel objects for information and scenes for better overview
* refactored scenes
* use only lower case for ids
* added management for groups and lights

### 2.0.3
* fix incoming rename event for sensors
* fix release_press is set to true at start
* added websocket port info to configuration
* added event types handling for websocket messages
* added backup, deConz update & firmware update states under Gateway_info
* added touchlink functions
* fix sensor handling for virtual devices (fsm and vpir)

### 2.0.2
* Bugfix

### 2.0.1
* Bugfixes

### 2.0.0
* changed id naming from id to mac (uniqueid)
* possibility to rename devices

Full changelog history can be found in CHANGELOG.md

## License
Apache-2.0

Copyright (c) 2017-2020 Jey Cee jey-cee@live.com