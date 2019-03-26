---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: bEyywg702jpyZU1BHNzrRqv/+msbdSYzvk7zVvmq0/w=
---
![Logo](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Anzahl der Installationen](http://iobroker.live/badges/chromecast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.chromecast.svg)
![Build-Status](https://travis-ci.org/angelnu/ioBroker.chromecast.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.chromecast.png?downloads=true)

# IoBroker.chromecast =========================
## Ein Google Home-Adapter für ioBroker
Mit diesem Plugin können Sie Video- und / oder Audiogeräte von Google Home-Geräten erkennen. Für jedes erkannte Home-Gerät wird ein ioBroker-Gerät erstellt. Dieses Gerät zeigt den Status des Geräts an und ermöglicht das Senden einer neuen URL für die Umwandlung.

Bauen Sie auf folgenden Projekten auf:

  * [ioBroker] (http://www.iobroker.net)
  * [node-castv2-client] (https://github.com/thibauts/node-castv2-client) als Home-Client-Bibliothek.

## Anweisungen
1. Installieren Sie den ioBroker
   1. Gehen Sie zur Registerkarte "ioBroker-Adapter"
   2. Wählen Sie den Google Home-Adapter aus und installieren Sie ihn
2. Fügen Sie eine Instanz des Google-Home-Adapters hinzu
   * es sollte automatisch ausgeführt werden, nachdem es installiert wurde
3. (optional) Wenn Sie lokale Dateien streamen möchten, müssen Sie den Adapter konfigurieren
   * Sie benötigen eine ioBroker-Webserverinstanz
4. Überprüfen Sie Ihr Protokoll: Sie sollten Protokolle zu den erkannten Geräten anzeigen
5. Schreiben Sie eine URL, wie z .net / ps-dieneue_rock / livestream_hi.mp3) an chromecast.0.` <Ihr Chromecast-Name> `.player.url2play
6. Die URL sollte auf Ihrem Gerät abgespielt werden

## Eigenschaften
* Geräte mit Multicast-DNS erkennen
  * Optional können Sie weitere manuell konfigurierte Geräte im Admin-Bereich hinzufügen
* Erstellen Sie ioBroker-Objekte für jedes gefundene Gerät
* Status-, Player-, Medien- und Metadatenkanäle
* Steuerung des Google Home-Geräts über den Adapter
  * Lautstärke einstellen
  * stummschalten / stummschalten
  * Stoppen Sie die Sendung
  * Pause
  * play url (chromecast.0.` <Ihr Google-Home-Name> `.player.url2play)
    * getestet mit MP3
      * Vollständige Liste der Formate [hier] (https://developers.google.com/cast/docs/media).
    * Wenn die URL nicht mit http beginnt, gehen Sie davon aus, dass es sich um eine lokale Datei handelt
      * Exportdatei über den ioBroker-Webserver
    * Es spielt nur Faustdateien von Wiedergabelistendateien wie .m3u ab
* Vis-Widget
  * HINWEIS: erfordert [gepatchten Vis-Adapter] (https://github.com/angelnu/ioBroker.vis).
* Anfängliche Unterstützung für Chromecast-Audiogruppen
  * Hinweis: Dies funktioniert nicht mit SSDP -> standardmäßig in den Adaptereinstellungen deaktivieren
* Wiederholen Sie den zuletzt wiedergegebenen Stream: Setzen Sie _chromecast.0.` <Ihr Gerät> `.status.playing_ auf _true_.

## Was fehlt?
* Zustandsmaschine hinzufügen, um Zustände zu verfolgen: erkannt -> verbunden -> Player Loader -> Abspielen
* Wiederholungen hinzufügen: Manchmal reagiert Google Home nicht auf eine Anfrage
* mehr testen

## Wie zu bauen
1. Checkout von git
2. Installieren Sie grunt mit `npm install -g gulp-cli`
3. Installieren Sie node.js-Abhängigkeiten: `npm install`
4. Nehmen Sie die Änderungen vor und testen Sie sie
5. Ändern Sie die Version in package.json
6. Überprüfen Sie die Änderungen mit "gulp"
7. Aktualisieren Sie [changelog] (# changelog) und [news] (io-package.json) mit diesem [Übersetzer] (http://iobroker.net:3000/).
8. npm test
9. git begehen & drücken
10. npm veröffentlichen

## Changelog
### 2.2.3 (2019-03-19)
* news

### 2.2.2 (2019-02-01)
* Fix missing reference when mDNS update is received

### 2.2.1 (2019-01-29)
* Remove mandatory dependency on vis adapter

### 2.2.0 (2019-01-15)
* Option to configure device URLs manually (when devices are in a different subnetwork)

### 2.1.5 (2019-01-14)
* Reconnect on mDNS updates

### 2.0.2 (2019-01-06)
* (angelnu) compact mode support

### 2.0.0 (2018-07-22)
* (bluefox) refactoring and add new states for material

### 1.4.3 (2018-04-03)
* Added enabled flag so some adapters can be ignored

### 1.4.2 (2018-01-30)
* Always use volume parameter for announcements

### 1.4.1 (2018-01-06)
* Fix for languages in io-package

### 1.4.0 (2017.11.26)
* (angelnu) Support for additional languages
* (angelnu) Support for version 3 of the Admin adapter

### 1.3.4 (2017.11.26)
* (angelnu) Update to latest cast2-player - wait for announcement

### 1.3.4 (2017.11.25)
* (angelnu) Rename to Google Home

### 1.3.3 (2017.11.24)
* (bluefox) bump a version

### 1.3.2
* (Vegetto) recognize uncompleted playlist status and trigger a new getStatus

### 1.3.1
* (Vegetto) Fix updateStates to accept null values
* (Vegetto) Add playlist currentItemdId

### 1.3.0
* (Vegetto) Create playlist channel with raw playlist and repeat modes
* (Vegetto) Moved jump and repeatMode from player to plalist channel

### 1.2.2
* (Vegetto) Forgot to step up version.

### 1.2.2
* (Vegetto) Update to player 1.1.3 - support relative paths in playlists

### 1.2.1
* (Vegetto) Update to player 1.1.2 - reconnect on url2play

### 1.2.0
* (Vegetto) Mayor rework
  * Chromecast player and scanner splitted into a separated module
  * **Support for playlists**
  * Improved MIME detection - **OGG files work now**
  * Support for **announcements** - playlist resume after completing announcement
  * Support to **jump** between playlist entries

### 1.1.3
* (Vegetto) bugfix - media title was not kept to url when streamTitle not present

### 1.1.2
* (Vegetto) Update npm dependencies in package.json to latest versions

### 1.1.1
* (Vegetto) bugfix - not playing when another chromecast playing same url
* (Vegetto) added additional logs

### 1.1.0
* (Vegetto) **Added support for playlist m3u, asx and pls files - play first entry**

### 1.0.9
* (Vegetto) Do not use this in callbacks. Replaced with _that_
* (Vegetto) Fix contentId not being updated. This was breaking the _play last stream_ feature

### 1.0.8
* (Vegetto) Do not try to stop if not playing

### 1.0.7
* (Vegetto) Show MultizoneLeader as playing
* (Vegetto) Set pause state to false when modified and device is not playing

### 1.0.6
* (Vegetto) Fix widget crashing when devId is not set

### 1.0.2
* (Vegetto) Fix deprecation warning - use dns-txt instead of mdns-txt

### 1.0.1
* (Vegetto) Fix exception

### 1.0.0
* (Vegetto) **Try to play last played URL when setting playing state to true**
* (Vegetto) Fix jshint and jscs findings

### 0.2.1
* (Vegetto) Update readme
* (Vegetto) Integrated into iobroker: listed there

### 0.2.0
* (Vegetto) Add vis widget (Alpha)
* (Vegetto) Performance improvements

### 0.1.4
* (Vegetto) Stability fixes - error handling, race-condition fixes, etc
* (Vegetto) Clean getMediaInfo handler when disconnecting player
* (Vegetto) Added support to retrieve ICY metadata from https sources
* (Vegetto) Moved code for querying media info to a separate class
* (Vegetto) **Support dynamic IP/port changes (audio groups)**

### 0.1.3
* (Vegetto) Added re-connection with retries. Will try for up 42 hours.
* (Vegetto) Support for triggering a reconnection by writing to <device>.status.connected
* (Vegetto) Fixed race condition when playing local file
* (Vegetto) **Added support for playing local files**
* (Bluefox) Russian translations
* (Vegetto) Update stale metadata when not present in player status
* (Vegetto) **Initial support for audio groups**
* (Vegetto) **Retrieve media type and title from URLs that support ICY**
* (Vegetto) Added displayName, isActiveInput and isStandBy status

### 0.1.2
* (Vegetto) Merge base

### 0.1.1
* (Vegetto) Fix package syntax
* (Vegetto) Fix package dependencies

### 0.1.0
* (Vegetto) Initial release

## License
The MIT License (MIT)

Copyright (c) 2015-2019 Vegetto <iobroker@angelnu.com>

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