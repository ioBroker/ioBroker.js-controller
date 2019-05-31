---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech Squeezebox Adapter über JSON / RPC-Protokoll
hash: 0+k6sw+oV2Ep1ZCTnomHN4tH6cjNb5PtjbqjoLiKKdY=
---
![Logo](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![Anzahl der Installationen](http://iobroker.live/badges/squeezeboxrpc-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Travis](https://img.shields.io/travis/oweitman/ioBroker.squeezeboxrpc.svg)
![AppVeyor Build Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-squeezeboxrpc.svg)
![GitHub Probleme](https://img.shields.io/github/issues/oweitman/ioBroker.squeezeboxrpc.svg)

# IoBroker Logitech Squeezebox Adapter über JSON / RPC-Protokoll
Dies ist ein alternativer Adapter, der das JSON / RPC-Protokoll verwendet, um Daten abzurufen und Befehle an den Logitech Media Server ([LMS](https://de.wikipedia.org/wiki/Logitech_Media_Server)) zu senden, um angeschlossene Geräte wie z

* native [squeezebox] (https://de.wikipedia.org/wiki/Squeezebox),
* Himbeer-Pi mit zusätzlichem Audiomodul und kleinen Linux-basierten Firmwares wie [picoreplayer] (https://picoreplayer.org/) oder [max2play] (https://www.max2play.com).
* mit Plugins für Chromecast, Airplay oder UPnP / DLNA-Geräte

Der LMS-Server kann sehr große Musiksammlungen auf Festplatten oder NAS verwalten / bereitstellen, sich mit verschiedenen Streaming-Anbietern wie Spotify, Deezer, Soundcloud, Shoutcast, Tunein, Napster, Pandora, Tidal und mehr verbinden

Warum noch ein Squeezebox Adapter?

Der vorhandene Adapter greift über Telnet auf das LMS zu. Das Telnet hat einige Nachteile.
Das eigentliche Haupt-Webinterface des LMS verwendet auch das rpc / json-Protokoll, um alle benötigten Informationen abzurufen oder Befehle an den Server / die Spieler zu senden.

## Eigenschaften
- Die meisten Daten, die der LMS-Service zur Verfügung stellt, sind im Adapter verfügbar
- Detaillierte Informationen über den Player-Status, den Songtitel, den Interpreten, das Album, das Bildmaterial und die Wiedergabeliste
- Viele Steuerfunktionen zum Abspielen, Anhalten, Stoppen, Vor- und Zurückspulen, Wiederholen, Mischen, Wiedergeben von Favoriten, Springen zur Zeit (absolut und relativ), Springen zum Wiedergabelistenindex (absolut und relativ), Ein- / Ausschalten und Voreinstelltasten
- Alle Favoriten und alle Unterebenen vom Server

## Installation
- Installieren Sie das Paket
- Erstellen Sie eine Instanz
- Konfigurieren Sie die Instanz mit der IP des logitech-Medienservers und dem Port (normalerweise 9000).
- Instanz starten / neu starten

## Bereitgestellte Zustände
### Server
| Zustand | Beschreibung |
| ----------------- | ------------------------------ |
| LastScan | Zeitstempel des letzten Musikscans |
| Spieleranzahl | Anzahl bekannter Spieler |
| PlayerCountOther | Anzahl bekannter anderer Spieler |
| PlayerCountSN | Anzahl bekannter SN-Spieler |
| TotalAlbums | Anzahl aller bekannten Alben |
| TotalArtists | Anzahl aller bekannten Künstler |
| Gesamtdauer | Gesamtspielzeit aller Songs |
| TotalGenres | Anzahl aller bekannten Genres |
| TotalSongs | Anzahl aller bekannten Songs |
| Version | Version von LMS |
| mac | MAC-ID des Servers |
| uuid | uuid der LMS-Instanz |

zusätzlich eine definierte Schaltfläche, um die Favoriten zu aktualisieren

taste | Beschreibung ----------------- | ----------------------------------------- getFavorites | fordere alle Favoriten vom Server an

### Favoriten
Für jeden Favoriten Alle Attribute sind schreibgeschützt

Zustand | Beschreibung ----------------- | ------------------------------ Name | Name des Favoriten-Hashes | gibt an, ob dies eine dir id | ist id des lieblingsbildes | Bild / Symbol für Favorit, falls verfügbar isaudio | isaudio type | Beispieltypen: Link, Text, Audio, Wiedergabelisten-URL | URL der Strecke

 Alle Unterebenen (Unterverzeichnisse) des Favoriten sind verfügbar.

### Spieler
für jeden Spieler Der Modus zeigt an, ob Sie den Wert ändern können. Die durchgeführte Aktion wird im Attribut beschrieben

state | mode | Beschreibung -------------------- | ---- | -------------------------------------------------- --- Album | R / - | Name des aktuellen Albums Artist | R / - | Name des Künstlers ArtworkUrl | R / - | URL zur Artwork-Bitrate | R / - | Bitrate der Spur Connected | R / - | Verbindungsstatus des Spielers (0/1) Dauer | R / - | Dauer des Titels Genre | R / - | Genre des Titels IP | R / - | IP des Spielers Modus | R / - | play / pause / stop Spielername | R / - | Name des Spielers PlayerID | R / - | Spieler ID Wiedergabeliste | R / - | Die aktuelle Playlist als JSON PlaylistCurrentIndex | R / W | Gehe zu einer absoluten Position, indem du den Trackindex angibst, oder gehe relativ mit einem + oder - am Anfang. Beispiel 10, -3, + 2 PlaylistRepeat | R / W | Song wiederholen (1) / Playlist (2) / nicht wiederholen (0) PlaylistShuffle | R / W | Wiedergabeliste mischen (1) / Album mischen (2) / nicht mischen (0) Power | R / W | Hole / Setze PowerState des Spielers aus (0) / ein (1) RadioName | R / - | Name der Radiostationsrate | R / - | Bewertung des Liedes Remote | R / - | Wenn Remote-Stream (1) SyncMaster | R / - | ID / MAC von Syncmaster SyncSlaves | R / - | ID / Mac der Spieler in Syncgroup Time | R / - | verstrichene Liedzeit Titel | R / - | Songtitel Typ | R / - | Medientyp (z. B. MP3-Radio) Url | R / - | URL des Tracks / Streams Lautstärke | R / W | get / set Lautstärke des Players (0-100) Zustand | R / W | Wiedergabestatus abrufen / festlegen: Pause (0), Wiedergabe (1), Stopp (2)

Die Wiedergabeliste enthält die folgenden Attribute, sofern diese in LMS verfügbar sind.
Somme-Attribute hängen von der Art der Songs ab (Stream / Datei / ...). Alle Attribute sind schreibgeschützt

Attribut | Beschreibung ----------------- | -------------------------------------------------- --- Album | Name des aktuellen Albums Artist | Name des Künstlers ArtworkUrl | URL zur Artwork Bitrate | Bitrate des Tracks Dauer | Dauer des Titels RadioName | Name der Radiostationsrate Bewertung des Songtitels | Songtitel Typ | Medientyp (z. B. MP3-Radio) url | URL des Track / Stream-Index | Index des Songs in der Playlist id | ID des Liedes

zusätzliche definierte Buttons:

taste | Beschreibung ----------------- | ----------------------------------------- btnForward | Nächstes Lied btnRewind | Vorheriges Lied btnPreset_ * | 1-6 Schaltflächen, die im Player oder Server definiert werden sollen cmdPlayFavorite | um einen Favoriten abzuspielen, setzen Sie die ID des Favoriten cmdGoTime | Zu einer absoluten Position springen, indem eine Anzahl von Sekunden angegeben wird, oder mit einem + oder - am Anfang der Sekunden relativ springen. Beispiel 100, -50, + 50

Weitere Informationen finden Sie in der CLI-Dokumentation:

https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md

## Machen
* Weitere Tests / Korrekturen
* Fügen Sie Telnet-Kommunikation hinzu, um Push-Ereignisse vom Server abzurufen und das Polling zu optimieren
* füge ID zu den Spielerzuständen hinzu
* Reduziere die Abhängigkeiten zu anderen Paketen (squeezenode)
* Implementieren eines Befehlsstatus zum Platzieren von benutzerdefinierten Befehlen (über JSON) für Server und Player
* Mehr Konfiguration, um optional Funktionen ein- und auszuschalten, um Speicher und Leistung zu verbessern
* ~~ Implementieren Sie weitere Steuerungsfunktionen (wählen Sie die Wiedergabeliste zum Abspielen aus, ffwd, frew, springen Sie zu einer Zeitposition im Song, wiederholen Sie den Song, zufälliger Song) ~~
* ~~ füge die Wiedergabeliste als json array ~~ zu den Wiedergabedaten hinzu
* ~~ Grafik (Sender-Logo / Playlist-Cover) für Favoriten hinzufügen ~~
* ~~ Implementiere mehr Ebenen (Unterverzeichnisse) von Favoriten ~~
* ~~ autodiscover logitech media server ~~

## Changelog
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

Copyright (c) 2019 oweitman

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