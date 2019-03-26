---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezebox/README.md
title: ioBroker Logitech Squeezebox-Adapter
hash: ekS2ohwzWNTJBxDf+mja5LYVVNoiC5NOygUYuD9GSyk=
---
![Logo](../../../en/adapterref/iobroker.squeezebox/admin/squeezebox.png)

![Anzahl der Installationen](http://iobroker.live/badges/squeezebox-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.squeezebox.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.squeezebox.svg)
![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.squeezebox.svg)
![AppVeyor Build Status](https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-squeezebox.svg)
![GitHub Probleme](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.squeezebox.svg)

# IoBroker Logitech Squeezebox Adapter
Steuert einen Squeezebox-Server und Logitech Media Server und seine Player.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin.

1. Öffnen Sie den Instanzkonfigurationsdialog
2. Geben Sie die IP-Adresse oder den Hostnamen Ihres Squeezebox-Servers ein
3. Verringern Sie den Wert für das Zeitaktualisierungsintervall, wenn Sie über eine ausreichende Leistung in Ihrem System verfügen.
4. Speichern Sie die Konfiguration
5. Starten Sie den Adapter

## Aufbau
### Logitech Media Server-Adresse
Dies ist die IP-Adresse oder der Hostname Ihres Squeezebox-Servers.

### Logitech Media Server-Anschluss
Dies ist der TCP-Port Ihres Squeezebox-Servers.
Optional ist der Standardwert 9090.
Der Server muss die Telnet-Befehle an diesem Port abhören (verwechseln Sie dies nicht mit dem Web-Port (HTTP), der immer ein anderer ist).

### Benutzername (optional)
Dies ist der Benutzername Ihres Squeezebox-Servers.
Standardmäßig kann dies leer bleiben. Sie wird nur benötigt, wenn auf Ihrem Server der Kennwortschutz aktiviert ist.

### Passwort (optional)
Dies ist das Passwort Ihres Squeezebox-Servers.
Standardmäßig kann dies leer bleiben. Sie wird nur benötigt, wenn auf Ihrem Server der Kennwortschutz aktiviert ist.

### Aktualisierungsintervall der Nachlaufzeit (Sek)
Alle N Sekunden wird die abgelaufene Spielzeit aktualisiert.
Lassen Sie dies bei 5 Sekunden, wenn Sie dies nicht zur Visualisierung verwenden.
Wenn Sie mehr Genauigkeit benötigen, stellen Sie sie auf 2 oder 1 Sekunden ein.

## Zustände
Der Adapter stellt automatisch eine Verbindung zum konfigurierten Squeezebox Server her und erstellt die folgenden Status für jeden mit dem Squeezebox Server verbundenen Player.

Die Namen der Zustände sind wie folgt formatiert: Squeezebox. Instanz Instanz. Player Spieler. Zustand. Status & gt; Status & gt;

- & lt; Instanz & gt; ist der Index der Instanz des ioBroker-Adapters (normalerweise "0").
- & lt; Spieler & gt; ist der Name, den Sie dem Player bei der Konfiguration gegeben haben (Leerzeichen werden durch Unterstriche "_" ersetzt).
- & lt; Zustand & gt; wird in den folgenden Abschnitten beschrieben

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .Power
Boolean, Lese- und Schreibzugriff

- wahr: Spieler ist eingeschaltet
- Falsch: Plyer ist in Bereitschaft

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .Status
Aufzählung, Lese- und Schreibzugriff

- 0: Pause
- 1: Spielen
- 2: Halt

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .volume
Ganzzahl (0 ... 100), Lese- und Schreibzugriff

Wiedergabelautstärke von nichts (0) bis maximal (100) Seien Sie vorsichtig bei der Einstellung hoher Werte (& gt; 50), da dies Ihre Ohren (oder die Ihrer Angehörigen) verletzen kann!

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .stummschaltung
Boolean, Lese- und Schreibzugriff

- true: Der Player ist stummgeschaltet (die Wiedergabe wird fortgesetzt, der Lautsprecher ist jedoch ausgeschaltet)
- false: Der Player befindet sich im regulären Wiedergabemodus

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .pathUrl
Zeichenfolge, Lese- und Schreibzugriff

Die URL des gerade abgespielten (oder pausierten) Songs oder Streams.

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .currentTitle
String, schreibgeschützt

Der Name des gerade abgespielten (oder pausierten) Songs oder Streams. Kann leer sein

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .currentAlbum
String, schreibgeschützt

Der Name des Albums des aktuell wiedergegebenen (oder pausierten) Songs oder Streams. Kann leer sein

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .currentArtist
String, schreibgeschützt

Der Name des Interpreten des aktuell wiedergegebenen (oder pausierten) Songs oder Streams. Kann leer sein

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .currentArtwork
String (URL), schreibgeschützt

Die URL zu einem Artwork für den gerade wiedergegebenen (oder unterbrochenen) Song oder Stream. Sollte niemals leer sein.
Wenn ein Stream abgespielt wird, wird seine Artwork-URL verwendet (siehe CLI-Tag "K").
Wenn keine Artwork-URL verfügbar ist (z. B. für eine normale MP3-Datei von LMS), wird der generische Link "Current Player Artwork" verwendet.
Zum generischen Artwork-Link fügt der Adapter eine "Zufallszahl" hinzu, um sicherzustellen, dass sich die URL bei jeder Änderung des Songs ändert.

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .currentDuration
Ganzzahl, schreibgeschützt

Die Gesamtlänge des aktuellen Songs oder Streams in Sekunden.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .currentDurationText
String, schreibgeschützt

Die formatierte Gesamtlänge des aktuellen Songs oder Streams. (Format: "[hh:] mm: ss")

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .elapsedTime
Ganzzahl, schreibgeschützt

Die Anzahl der Sekunden des aktuellen Songs oder Streams wurde bereits abgespielt. Dieser Wert wird bei jedem "Aktualisierungsintervall der Nachlaufzeit" aktualisiert (siehe Konfiguration oben).

### Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .elapsedTimeText
String, schreibgeschützt

Die formatierte Zeit, zu der das aktuelle Lied oder der aktuelle Stream bereits abgespielt wurde. Dieser Wert wird bei jedem "Aktualisierungsintervall der Nachlaufzeit" aktualisiert (siehe Konfiguration oben).

### Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .sleep
Ganzzahl, Lese- und Schreibzugriff

Die Anzahl der Sekunden bis der Spieler in den Ruhezustand geht.
Stellen Sie diesen Status so ein, dass er ausgeblendet wird, und schalten Sie den Player mit der angegebenen Anzahl von Sekunden als Dauer aus.
Wenn dieser Wert Null ist, ist der Spieler entweder ausgeschaltet oder schläft nicht. Andernfalls wird dieser Player schlafen.

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .tasten.vorwärts
Button, nur zum Schreiben

Springt zum nächsten Titel in der Wiedergabeliste.

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .tasten.rewind
Button, nur zum Schreiben

Springt zum vorherigen Titel in der Wiedergabeliste.

Squeezebox. & lt; Instanz & gt;. & lt; Spieler & gt; .Buttons.preset_ & lt; 1-6 & gt;
Button, nur zum Schreiben

Schaltet auf die im Player gespeicherte Voreinstellungsnummer um.

## Roadmap / Todo
- Staat für Wiedergabeliste [Arminhh]
- Synchronisation von Spielern [Arminhh]
- LMS von ioBroker aus steuern (z. B. einen Radiosender aus den Favoriten auswählen) [ak1]

## Changelog
### 1.0.0 (2018-12-23)
* (mrMuppet) Fixed title error in streams and artwork.
* (mafof) Added buttons for forward/rewind and presets.
* (mafof) Added playlist path URL and sleep states.

### 0.2.1 (2017-10-08)
* (UncleSamSwiss) Fixed issue with more than 9 players (fix in logitechmediaserver package)

### 0.2.0 (2017-07-24)
* (UncleSamSwiss) Added support for optional TCP port number (default is still 9090)
* (UncleSamSwiss) Added support for optional login using username and password (by default still no authentication is used)

### 0.1.0 (2016-01-16)
* (UncleSamSwiss) Ready to be published to NPM (no further changes)

### 0.0.2 (2016-01-10)
* (UncleSamSwiss) Support for artwork (will use stream artwork if available, otherwise server artwork)

### 0.0.1 (2015-12-07)
* (UncleSamSwiss) Initial version

## License

Apache 2.0

Copyright (c) 2015 UncleSamSwiss