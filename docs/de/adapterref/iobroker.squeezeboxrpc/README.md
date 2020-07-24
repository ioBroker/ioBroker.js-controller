---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech Squeezebox Adapter über JSON / RPC-Protokoll
hash: VAAjzwtqfoWPdBpRdOVyLTjTrb5VKJZ24KvYqE73p+I=
---
![Logo](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![Anzahl der Installationen](http://iobroker.live/badges/squeezeboxrpc-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Travis](https://img.shields.io/travis/oweitman/ioBroker.squeezeboxrpc.svg)
![AppVeyor-Build-Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-squeezeboxrpc.svg)
![GitHub Probleme](https://img.shields.io/github/issues/oweitman/ioBroker.squeezeboxrpc.svg)

# IoBroker Logitech Squeezebox Adapter über JSON / RPC-Protokoll
Dies ist ein alternativer Adapter, der das JSON / RPC-Protokoll verwendet, um Daten abzurufen und Befehle an den Logitech Media Server ([LMS](https://de.wikipedia.org/wiki/Logitech_Media_Server)) zu senden, um angeschlossene Geräte wie z

* native [Squeezebox] (https://de.wikipedia.org/wiki/Squeezebox),
* Himbeer-Pi mit zusätzlichem Audiomodul und kleinen Linux-basierten Firmwares wie [picoreplayer] (https://picoreplayer.org/) oder [max2play] (https://www.max2play.com).
* mit Plugins Chromecast, Airplay oder UPnP / DLNA-Geräten

Der LMS-Server kann sehr große Musiksammlungen auf Festplatten oder NAS verwalten / bereitstellen, eine Verbindung zu verschiedenen Streaming-Anbietern wie Spotify, Deezer, Soundcloud, Shoutcast, Tunein, Napster, Pandora, Tidal und mehr herstellen

Warum noch ein Squeezebox-Adapter?

Der vorhandene Adapter verwendet Telnet, um auf das LMS zuzugreifen. Das Telnet hat einige Nachteile.
Die eigentliche Hauptwebschnittstelle des LMS verwendet auch das rpc / json-Protokoll, um alle erforderlichen Informationen abzurufen oder Befehle an den Server / die Player zu senden.

## Eigenschaften
- Die meisten Daten, die der LMS-Service bereitstellt, sind im Adapter verfügbar
- Detaillierte Informationen zu Player-Status, Songtitel, Künstler, Album, Bildmaterial und Wiedergabeliste
- Viele Steuerfunktionen zum Abspielen, Anhalten, Stoppen, Vorwärtsspulen, Zurückspulen, Wiederholen, Mischen, Favoriten spielen, Zur Zeit springen (absolut und relativ), Zum Wiedergabelistenindex springen (absolut und relativ), Ein- / Ausschalten und voreingestellte Tasten
- Alle Favoriten und alle Unterebenen vom Server
- Viele Widgets für die iobroker-vis-Komponente sind enthalten, um eigene Steuerungsbenutzeroberflächen zu erstellen (Player auswählen, Favoriten auswählen, Synchronisationsgruppen verwalten, Schaltflächen für Wiedergabe / Pause, FWD, Rew, Wiederholungsmodus und Auswahl des Zufallsmodus).

Die Dokumentation für die vis-Widgets ist in vis oder [Widget-Dokumentation / Deutsch](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.squeezeboxrpc/blob/master/widgets/squeezeboxrpc/doc.html) verfügbar

## Installation
- Installieren Sie das Paket
- Erstellen Sie eine Instanz
- Konfigurieren Sie die Instanz mit der IP des Logitech-Medienservers und dem Port (normalerweise 9000).
- Instanz starten / neu starten

## Update
- Nach Änderungen im Widget-Code und im Upadte des Adapters sollte iobroker Webdateien auf den internen Webserver hochladen. Benutzer berichtete, dass dies manchmal nicht oder nur mit Verzögerung geschah. Sie können diese Aktion mit dem folgenden Befehl auslösen

iobroker Upload Squeezeboxpc

## Bereitgestellte Zustände
### Server
| Zustand | Beschreibung |
| ----------------- | ------------------------------ |
| LastScan | Zeitstempel des letzten Musikscans |
| PlayerCount | Anzahl bekannter Spieler |
| PlayerCountOther | Anzahl der bekannten anderen Spieler |
| PlayerCountSN | Anzahl bekannter SN-Spieler |
| TotalAlbums | Anzahl aller bekannten Alben |
| TotalArtists | Anzahl aller bekannten Künstler |
| Gesamtdauer | Gesamtspielzeit aller Songs |
| TotalGenres | Anzahl aller bekannten Genres |
| TotalSongs | Anzahl aller bekannten Songs |
| SyncGroups | Bestehende Syncgroups |
| Version | Version von LMS |
| mac | MAC-ID des Servers |
| uuid | UUID der LMS-Instanz |

Zusätzlich eine definierte Schaltfläche zum Aktualisieren der Favoriten

Taste | Beschreibung ----------------- | ----------------------------------------- getFavorites | Fordern Sie alle Favoriten vom Server an

### Favoriten
Für jeden Favoriten Alle Attribute sind schreibgeschützt

Zustand | Beschreibung ----------------- | ------------------------------ Name | Name der bevorzugten Hasitems | Gibt an, ob dies eine Verzeichnis-ID ist ID des Lieblingsbildes | Bild / Symbol für Favorit, falls verfügbar isaudio | isaudio type | Beispieltypen: Link, Text, Audio, Wiedergabelisten-URL | URL des Tracks

 Alle Unterebenen (Unterverzeichnisse) der Favoriten sind verfügbar.

### Spieler
für jeden Spieler Der Modus zeigt an, ob Sie den Wert ändern können. Die ergriffene Aktion wird im Attribut beschrieben

state | mode | Beschreibung -------------------- | ---- | -------------------------------------------------- --- Alarme | R / - | Alle registrierten Alarme für diesen Player als JSON Album | R / - | Name des aktuellen Albums Artist | R / - | Name des Künstlers ArtworkUrl | R / - | URL zum Artwork Bitrate | R / - | Bitrate der Spur Verbunden | R / - | Verbindungsstatus des Spielers (0/1) Dauer | R / - | Dauer des Titels Genre | R / - | Genre des Titels IP | R / - | IP des Spielermodus | R / - | play / pause / stop Playername | R / - | Name des Spielers PlayerID | R / - | Player ID Playlist | R / - | Die aktuelle Wiedergabeliste als JSON PlaylistCurrentIndex | R / W | Gehen Sie zu einer absoluten Position, indem Sie den Spurindex angeben, oder gehen Sie am Anfang relativ mit einem + oder -. Beispiel 10, -3, + 2 PlaylistRepeat | R / W | Song (1) / Wiedergabeliste (2) wiederholen / nicht wiederholen (0) PlaylistShuffle | R / W | Shuffle-Wiedergabeliste (1) / Shuffle-Album (2) / Nicht mischen (0) Power | R / W | Powerstatus des Players ausschalten / ausschalten (0) / ein (1) RadioName | R / - | Name der Radiostationsrate | R / - | Bewertung des Songs Remote | R / - | Wenn Remote-Stream (1) SyncMaster | R / - | ID / MAC von Syncmaster SyncSlaves | R / - | ID / Mac der Spieler in Syncgroup Time | R / - | verstrichene Songzeit Titel | R / - | Songtitel Typ | R / - | Medientyp (z. B. MP3-Radio) URL | R / - | URL des Tracks / Streams Volume | R / W | Get / Set Lautstärke des Player-Status (0-100) | R / W | Spielstatus abrufen / einstellen: Pause (0), Wiedergabe (1), Stopp (2)

Die Wiedergabeliste enthält tatsächlich die folgenden Attribute, sofern diese in LMS verfügbar sind.
Somme-Attribute hängen von der Art der Songs ab (Stream / Datei / ...). Alle Attribute sind schreibgeschützt

Attribut | Beschreibung ----------------- | -------------------------------------------------- --- Album | Name des aktuellen Albums Artist | Name des Künstlers ArtworkUrl | URL zum Artwork Bitrate | Bitrate der Strecke Dauer | Dauer des Titels RadioName | Name der Radiostationsrate | Bewertung des Songtitels | Songtitel Typ | Art des Mediums (zB MP3-Radio) url | URL des Track / Stream-Index | Index des Songs in der Playlist-ID | ID des Liedes

zusätzliche definierte Schaltflächen:

Taste | Beschreibung ----------------- | ----------------------------------------- btnForward | Nächstes Lied btnRewind | Vorheriges Lied btnPreset_ * | 1-6 Schaltflächen zum Definieren im Player oder Server cmdGeneral | Ein allgemeines Befehlsfeld zum Senden von Befehlen an den Player. Jedes Feld muss in Anführungszeichen gesetzt werden. Parameter müssen durch Komma getrennt werden. Beispiel: "play", "1" cmdPlayFavorite | Um einen Favoriten abzuspielen, legen Sie die ID des Favoriten cmdPlayUrl | fest um ein URL-Beispiel zu spielen "http://50.7.77.114:8101/;" cmdGoTime | Springen Sie zu einer absoluten Position, indem Sie eine Anzahl von Sekunden angeben, oder springen Sie relativ mit einem + oder - am Anfang der Sekunden. Beispiel 100, -50, + 50

Weitere Informationen finden Sie in der CLI-Dokumentation:

https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md

## Machen
* mehr testen / reparieren
* Abhängigkeiten zu anderen Paketen reduzieren (Squeezenode)
* Mehr Konfiguration zum optionalen Ein- und Ausschalten von Funktionen zur Verbesserung von Speicher und Leistung
* Wiedergabelisten-Widget hinzufügen
* Browser-Widget hinzufügen, um im LMS-Menü zu surfen
* Spielergesteuertes Kreisknopf-Widget hinzufügen
* ~~ Telnet-Kommunikation hinzufügen, um Push-Ereignisse vom Server abzurufen und die Abfrage zu optimieren ~~
* ~~ Implementiere einen Befehlsstatus, um benutzerspezifische Befehle (über json) für Server und Player ~~ zu platzieren
* ~~ Weitere Steuerungsfunktionen implementieren (Wiedergabelistenposition zum Abspielen auswählen, ffwd, frew, zu einer Zeitposition im Song springen, Song wiederholen, zufälliger Song) ~~
* ~~ füge die Wiedergabeliste als json-Array zu den Spielerdaten hinzu ~~
* ~~ Grafik (Sender-Logo / Playlist-Cover) für Favoriten hinzufügen ~~
* ~~ Implementiere mehr Ebenen (Unterverzeichnisse) von Favoriten ~~
* ~~ Logitech-Medienserver automatisch erkennen ~~

## Changelog
### 1.2.1
* fix small issue in last version
### 1.2.0
* improve handling of imageproxy artwork
### 1.1.0
* make request of favorites configurable
### 1.0.1
 * change setstate/createobject logic
 * fix role and type for Mode-state
 * update tests
 * update dependency versions
 * improve io-package.json
### 1.0.0
 * prepare for stable repository
### 0.8.32
 * the adapter function iobroker.deleteChannel didnt works as expected. it didnt delete the whole subtree of states. now i implement my own delete function 
### 0.8.31
 * change behaviour of deleting favorites
### 0.8.30
 * change from the issue of the adapter checker
### 0.8.29
 * optimize handling of player state power and connected
### 0.8.28
 * add advanced signaling function with telnet and fix some more authorization issues with LMS
### 0.8.27
 * initialization for the new calctype property if empty in volumebar
### 0.8.26
 * more improvement and fixing at volumebar / remove playlist widget from master. not ready yet
### 0.8.25
 * fixing css-settings on volumebar
### 0.8.24
 * volumebar didnt get events between the segments, change clickevent and calculation
### 0.8.23
 * adjust dependencies to remove vulnerabilities in dependend packages. alos remove travis due of unresolvable build-failures for win+node10/12
### 0.8.22
 * due to iobroker.controller 2.0 a command in the api changed (socket to vis.conn._socket)
### 0.8.21
 * add command für playing urls
### 0.8.20
 * remove node v6 test setting
### 0.8.19
 * shorten news history
### 0.8.18 (2019-06-27)
* last minute changes.
### 0.8.17 (2019-06-26)
* add more widges: playtime bar, string, number, datetime, image. add button margin to player and favorite widget, improve editing of viewindex. do some refactoring.
### 0.8.16 (2019-06-24)
* resolve a cross browser issue for firefox. the style.font attribute is empty and you have to construct the font string by yourself
### 0.8.15 (2019-06-19)
* minor issue with not ready states
### 0.8.14 (2019-06-19)
* add syncgroups as new server-datapoint,add syncgroup widget, change some jquery event logic
### 0.8.13 (2019-06-16)
* rename widgetset from squeezeboxrpcwidgets to squeezeboxrpc
### 0.8.12 (2019-06-16)
* sync version with npm
### 0.8.11 (2019-06-15)
* try to integrate the widgets into the main adapter
### 0.8.10 (2019-05-15)
* another try to fix the EADDRINUSE error of the server discovery
### 0.8.9 (2019-05-15)
* try to fix the EADDRINUSE error of the server discovery
### 0.8.8 (2019-05-14)
* make discover configurable
### 0.8.7 (2019-05-11)
* more control features (select playlist pos to play,ffwd,frew,jump to a time position in song,repeat song,random song)
### 0.8.6 (2019-05-10)
* move some configuration options into seperate tabs
### 0.8.5 (2019-05-08)
* change serverdiscovery interval method, remove some double cmd lines, additional minor changes advised from eslint
### 0.8.4
* move some files to lib directory
### 0.8.3
* close port for discovery on unload
### 0.8.2
* sync version with npm
### 0.8.1
* set compact mode flag
### 0.8.0
* implementation of compact mode, change version to represent a realistic feature completness
### 0.0.9
* debug options are now configurable
### 0.0.8
* More playlist attributes + remove trailing and leading spaces from source
### 0.0.7
* Add the playlist to each player as json
### 0.0.6
* More config options
### 0.0.5
* All levels/subdirectories of favorites are now available in iobroker
### 0.0.4
* added the cmdPlayFavorite for each player
### 0.0.3
* repair the no-data symbols for buttons in vis
### 0.0.2
* added autodiscovery
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2019-2020 oweitman

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