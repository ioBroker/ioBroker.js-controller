---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.loxone/README.md
title: ioBroker-Adapter für Loxone Miniserver
hash: W9o7DX8gyGrs/dwXu5uQ9fm8LyJNElXyna/6Zz7b8bQ=
---
![Loxone-Logo](../../../en/adapterref/iobroker.loxone/admin/loxone.png)

![Anzahl der Installationen](http://iobroker.live/badges/loxone-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.loxone.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.loxone.svg)
![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.loxone.svg)
![AppVeyor Build Status](https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-loxone.svg)
![GitHub Probleme](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.loxone.svg)

# IoBroker-Adapter für Loxone Miniserver
*** Dieser Adapter erfordert mindestens nodejs 4.x! ***

Ruft alle in Loxone Miniserver (und Loxone Miniserver Go) verfügbaren Informationen ab und stellt Änderungen in Echtzeit bereit.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie den Instanzkonfigurationsdialog
2. Geben Sie die IP-Adresse oder den Hostnamen und den HTTP-Port (standardmäßig 80) Ihres Loxone Miniservers ein
3. Erstellen Sie im Loxone Miniserver (mit der Anwendung Loxone Config) einen neuen Benutzer, dem Sie nur für alle erforderlichen Variablen Lese- und Schreibrechte erteilen.
4. Geben Sie den Namen und das Kennwort dieses Benutzers im Konfigurationsdialogfeld ein
5. Speichern Sie die Konfiguration
6. Starten Sie den Adapter

## Aufbau
### Miniserver Hostname / IP
Dies ist die IP-Adresse oder der Hostname Ihres Loxone Miniserver oder Miniserver Go.

### Miniserver Port
Dies ist der HTTP-Port Ihres Loxone Miniservers.

Standardmäßig ist der Miniserver so konfiguriert, dass er Port 80 überwacht, aber Sie haben ihn möglicherweise geändert.

### Miniserver Benutzername
Geben Sie einen gültigen Benutzernamen an, um auf den Loxone Miniserver zuzugreifen.

Es wird dringend empfohlen, aus Sicherheitsgründen einen anderen Benutzer als "admin" zu verwenden.

Der Benutzer benötigt nur Lesezugriff auf die Variablen, die Sie vom ioBroker verwenden möchten.

### Miniserver Passwort
Geben Sie das Passwort für den angegebenen Benutzernamen an (siehe oben).

Bitte beachten Sie, dass dieses Passwort in ioBroker ungesichert gespeichert ist. Verwenden Sie daher nicht den Benutzer "admin"!

### Namen synchronisieren
Dadurch werden Namen in ioBroker aktualisiert, wenn sie in der Loxone-Konfiguration geändert werden.
Wenn dies deaktiviert ist, werden Namen nur beim ersten Erkennen einer Steuerung synchronisiert.

### Räume synchronisieren
Dadurch wird die Aufzählung enum.rooms mit allen vom Loxone Miniserver bereitgestellten Räumen aufgefüllt und alle Steuerelemente werden miteinander verbunden.

### Funktionen synchronisieren
Dadurch wird die Aufzählung enum.functions mit allen vom Loxone Miniserver bereitgestellten Kategorien aufgefüllt und alle Steuerelemente werden verknüpft.

## Zustände
Der Adapter stellt automatisch eine Verbindung zum konfigurierten Loxone Miniserver her und erstellt Zustände für jeden gefundenen Steuerungszustand.

Die IDs der Staaten sind wie folgt formatiert: `loxone.<instance>.<control>.<state>`

- `<Instanz>` ist der Instanzindex des IoBroker-Adapters (normalerweise "0")
- `<control>` ist die UUID des Controls
- `<state>` ist der Status innerhalb der Kontrolle (weitere Informationen finden Sie unter [Unterstützte Kontrolltypen] (# Unterstützte Kontrolltypen)).

Der bei der Konfiguration eines Steuerelements in Loxone Config angegebene Name wird nur als Anzeigename in ioBroker verwendet.
Dies liegt daran, dass ein Benutzer für mehrere Steuerelemente denselben Namen auswählen kann.

Weitere Informationen zu Steuerelementen und deren Status finden Sie in der Loxone-API (insbesondere der Strukturdatei): https://www.loxone.com/enen/kb/api/

## Kontrollieren Sie die Sichtbarkeit
Standardmäßig verbirgt Loxone Miniserver viele Steuerelemente (und damit deren Status) vor der Webschnittstelle.

Das heißt, sie sind auch für diesen ioBroker-Adapter verborgen.

Um sicherzustellen, dass alle Ihre Zustände ordnungsgemäß an ioBroker gemeldet werden, vergewissern Sie sich, dass "In Visualisierung verwenden" aktiviert ist:

![In Visualisierungseinstellungen verwenden](../../../en/adapterref/iobroker.loxone/doc/loxone-config-use-in-visualization.png)

## Globale Staaten
Die folgenden globalen Status werden derzeit von diesem Adapter bereitgestellt:

- `operatingMode`: die aktuelle Betriebsmodusnummer des Loxone Miniservers
- `operatingMode-text`: die aktuelle Betriebsart des Loxone Miniservers als Text
- "Sonnenaufgang": Die Anzahl der Minuten nach Mitternacht, wenn heute die Sonne aufgeht
- "Sonnenuntergang": Die Anzahl der Minuten nach Mitternacht, wenn die Sonne heute untergeht
- "Benachrichtigungen": Anzahl der Benachrichtigungen
- "Modifikationen": die Anzahl der Modifikationen
- Alle anderen globalen Staaten werden einfach als Texte gemeldet

## Unterstützte Kontrolltypen
Die folgenden Steuerelementtypen werden derzeit von diesem Adapter unterstützt.

Hinter dem Namen des Staates können Sie den Typ des Staates sehen:

- `(rw)`: lesbar und beschreibbar: Dieser Status kann von ioBroker aus geändert werden
- `(ro)`: schreibgeschützt: Dieser Status kann von ioBroker nicht geändert werden
- `(wo)`: Nur-Schreiben: Der Wert dieses Status wird von diesem Adapter nicht gemeldet. Er kann jedoch geändert werden und löst eine Aktion auf dem Loxone Miniserver aus

### Alarm
Bereitgestellt durch die Alarmkontrolle der Burgler.

- "bewaffnet" (rw) boolescher Zustand (wahr / falsch) des Alarms; Wenn Sie "true" auf diesen Wert schreiben, wird der Alarm sofort aktiviert (ohne die vordefinierte Verzögerung).
- `nextLevel` (ro) die ID der nächsten Alarmstufe
    * 1 = lautlos
    * 2 = Akustisch
    * 3 = Optisch
    * 4 = intern
    * 5 = Extern
    * 6 = Remote
- `nextLevelDelay` (ro) die Verzögerung der nächsten Ebene in Sekunden
- `nextLevelDelayTotal` (ro) die Gesamtverzögerung der nächsten Ebene in Sekunden
- `level` (ro) die ID der aktuellen Alarmstufe
    * 1 = lautlos
    * 2 = Akustisch
    * 3 = Optisch
    * 4 = intern
    * 5 = Extern
    * 6 = Remote
- `startTime` (ro) der Zeitstempel, an dem der Alarm ausgelöst wurde
- 'armedDelay' (ro) die Verzögerung der Alarmsteuerung
- "armedDelayTotal" (ro) die Gesamtverzögerung der Alarmsteuerung, die aktiviert wird
- `sensors` (ro) die Liste der Sensoren
- `disabledMove` (rw) die Bewegung ist deaktiviert (true) oder nicht (false)
- `delayedOn` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird der Alarm mit der konfigurierten Verzögerung aktiviert
- "quit" (wo) das Schreiben eines beliebigen Werts in diesen Status bestätigt den Alarm

### Zentralalarm
Bereitgestellt durch zentrale Alarmkontrolle der Burgler.

- "bewaffnet" (rw) boolescher Zustand (wahr / falsch) des Alarms; Wenn Sie "true" auf diesen Wert schreiben, wird der Alarm sofort aktiviert (ohne die vordefinierte Verzögerung).
- `delayedOn` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird der Alarm mit der konfigurierten Verzögerung aktiviert
- "quit" (wo) das Schreiben eines beliebigen Werts in diesen Status bestätigt den Alarm

### Wecker
Bereitgestellt durch Weckersteuerung.

- `isEnabled` (rw) boolescher Status (wahr / falsch) des Weckers
- `isAlarmActive` (ro) boolean (true / false), ob der Alarm gerade klingelt
- `confirmNeeded` (ro) boolean (true / false), ob der Benutzer den Alarm bestätigen muss
- "ringingTime" (ro) Countdown in Sekunden, wie lange der Wecker klingelt, bis er wieder schläft
- `ringDuration` (rw) Dauer in Sekunden, in der der Wecker klingelt
- Vorbereitungszeit "prepDuration" (rw) in Sekunden
- `snoozeTime` (ro) Sekunden bis das Schlummern beendet wird
- `snoozeDuration` (rw) Dauer in Sekunden des Schlummerns
- "snooze" (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird der aktuelle Alarm angezeigt
- "Ablehnen" (wo) das Schreiben eines beliebigen Werts in diesen Status löscht den aktuellen Alarm

### AudioZone
Bereitgestellt von Music Server Zone.

- `serverState` (ro) Zustand des Musikservers:
    * -3 = unbekannte / ungültige Zone
    * -2 = nicht erreichbar
    * -1 = unbekannt
    * 0 = offline
    * 1 = initialisieren (booten, versuchen, es zu erreichen)
    * 2 = online
- `playState` (rw) der Wiedergabestatus:
    * -1 = unbekannt (dieser Wert kann nicht eingestellt werden)
    * 0 = gestoppt (Einstellung dieses Wertes pausiert die Wiedergabe)
    * 1 = pausiert (Einstellung dieses Wertes pausiert die Wiedergabe)
    * 2 = Wiedergabe (Einstellung dieses Wertes startet / setzt die Wiedergabe fort)
- `clientState` (ro) Zustand des Clients:
    * 0 = offline
    * 1 = initialisieren (booten, versuchen, es zu erreichen)
    * 2 = online
- `power '(rw), ob die Client-Stromversorgung aktiv ist oder nicht
- `volume` (rw) aktuelles Volumen
- `maxVolume` (ro) -Zonen kann eine maximale Lautstärke zugewiesen werden
- `shuffle` (rw), ob Playlist-Shuffle aktiviert ist oder nicht
- `sourceList` (ro) Liste mit allen Zonenfavoriten
- Wiederholungsmodus "Wiederholen" (rw):
    * -1 = unbekannt
    * 0 = aus
    * 1 = alle wiederholen
    * 2 = -nicht verwendet-
    * 3 = aktuelles Element wiederholen
- `songName` (ro) Liedname
- `duration` (ro) wie lang die gesamte Spur ist, -1 falls nicht bekannt (Stream)
- `progress` (rw) aktuelle Position in der Spur
- `album` (ro) Albumname
- "artist" (ro) Künstlername
- Station-Name (Station)
- Genre-Name (Genre)
- URL für das Titel- / Albumcover des `cover` (ro)
- `source` (rw) aktuell gewählte Quellkennung (siehe` sourceList` oben)
- `prev` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird der vorherige Titel aufgerufen
- `next` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, gelangen Sie zur nächsten Spur

### Zentrales Audio
Wird vom zentralen Musikserver bereitgestellt.

- `control` (wo) legt den Spielstatus aller Spieler fest (` true` = play, `false` = pause)

### Farbwähler
Dieses Gerät wird nur in einem LightController angezeigt.

- `red` (rw) Rotwert des Farbwählers
- Grünwert (rw) des Farbwählers
- `blue` (rw) blauer Wert des Farbwählers

Wenn Sie einen oder mehrere der oben genannten Zustände von ioBroker festlegen, wird der Befehl erst nach etwa 100 ms an den Miniserver gesendet.
Dadurch wird verhindert, dass sich die Farbe für eine einzelne Benutzereingabe mehrmals ändert.

### Colorpicker V2
Dieses Gerät wird nur in einem Light Controller V2 in der Loxone-Softwareversion 9 und höher angezeigt.

- `red` (rw) Rotwert des Farbwählers
- Grünwert (rw) des Farbwählers
- `blue` (rw) blauer Wert des Farbwählers

Wenn Sie einen oder mehrere der oben genannten Zustände von ioBroker festlegen, wird der Befehl erst nach etwa 100 ms an den Miniserver gesendet.
Dadurch wird verhindert, dass sich die Farbe für eine einzelne Benutzereingabe mehrmals ändert.

### Dimmer
Wird von Dimmern bereitgestellt.

- Position "Position" (rw) für den Dimmer
- "min" (ro) aktueller Mindestwert
- "max" (ro) aktueller Maximalwert
- `step` (ro) aktueller Schrittwert
- Wenn Sie einen Wert in diesen Zustand schreiben, wird der Dimmer auf die letzte bekannte Position gesetzt
- `off` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird der Dimmer deaktiviert, die Position wird auf 0 gesetzt, die letzte Position wird jedoch gespeichert

### Tor
Bereitgestellt von Gate-Steuerungen.

- `position` (ro) die Position von 1 = bis 0 = runter
- "aktive" (rw) aktuelle Richtung der Bewegung des Tors
    * -1 = schließen
    * 0 = bewegt sich nicht
    * 1 = offen
- "PrevenseOpen" (ro) ob das Öffnen der Tür verhindert wird
- "disableClose" (ro), ob das Schließen der Tür verhindert wird

### Zentrales Tor
Bereitgestellt durch zentrale Torsteuerung.

- "open" (wo) öffnet alle Tore
- "close" (wo) schließt alle Tore
- "stop" (wo) stoppt alle Torantriebe

### InfoOnlyDigital
Bereitgestellt durch virtuelle Zustände sowie den Loxone Touch-Schalter.

- `active` (ro) Boolescher Zustand (true / false) des Steuerelements
- `active-text` (ro), falls konfiguriert, das Textäquivalent des Zustands
- `active-image` (ro), falls konfiguriert, das dem Staat entsprechende Bild
- `active-color` (ro), falls konfiguriert, das Farbäquivalent des Zustands

![InfoOnlyDigital-Einstellungen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-info-only-digital.png)

### InfoOnlyAnalog
Bereitgestellt durch virtuelle Zustände sowie den Loxone Touch-Schalter.

- `value` (ro) der Zustandswert (Nummer) der Steuerung
- `value-formatiert` (ro), falls konfiguriert, der formatierte Wert des Zustands (unter Verwendung des Formats" Unit "von Loxone Config)

### Intercom
Bereitgestellt von Türsteuerungen.

- `bell` (ro) ob die Klingel klingelt
- `lastBellEvents` (ro) -Array mit den Zeitstempeln für jede Glockenaktivität, die nicht beantwortet wurde
- `version` (ro) Loxone Intercoms only - Text, der die aktuell installierte Firmware enthält

Versionen

- Wenn Sie einen Wert in diesen Zustand schreiben, wird die Glocke deaktiviert

Dieser Kanaltyp kann andere Geräte enthalten. Weitere Informationen finden Sie im jeweiligen Kapitel.

### Jalousie
Wird durch verschiedene Arten von Jalousien (automatisch und manuell) bereitgestellt.

- `up` (rw) ob Jalousie nach oben geht
- "down" (rw), ob sich Jalousie nach unten bewegt
- "position" (ro) Position der Jalousie, eine Zahl von 0 bis 1
    * Jalousie obere Position = 0
    * Jalousie untere Position = 1
- 'shadePosition' (ro) Schattenposition der Jalousie (Jalousien), eine Zahl von 0 bis 1
    * Jalousien sind nicht schattiert = 0
    * Jalousien sind schattiert = 1
- `safetyActive` (ro), das nur von Personen mit Autopilot verwendet wird, bedeutet Sicherheitsabschaltung
- "autoAllowed" (ro) wird nur von Autopiloten verwendet
- `autoActive` (rw) wird nur von Autopiloten verwendet
- `locked` (ro) nur von Autopiloten, dies stellt den Ausgangs-QI in Loxone Config dar
- "infoText" (ro) informiert z. worauf der gesperrte Zustand zurückzuführen ist oder was dazu geführt hat, dass die Sicherheit aktiv wurde.
- `fullUp` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird eine vollständige Bewegung ausgelöst
- `fullDown` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird eine vollständige Abwärtsbewegung ausgelöst
- "Schatten" (wo) das Schreiben eines Wertes für diesen Zustand schattiert die Jalousie in die perfekte Position

Zentral Jalousie
Wird von der zentralen Jalousiesteuerung bereitgestellt.

- `autoActive` (rw) wird nur von Autopiloten verwendet
- `fullUp` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird eine vollständige Bewegung ausgelöst
- `fullDown` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird eine vollständige Abwärtsbewegung ausgelöst
- "Farbton" (wo) Schreibe jeden Wert dieses Zustands der Jalousien in die perfekte Position

### Lichtsteuerung
Bereitgestellt von (Hotel-) Lichtsteuerungen.
Szenen können nur in den Loxone-Anwendungen geändert werden, können jedoch in ioBroker ausgewählt werden.

- `activeScene` (rw) aktuelle Nummer der aktiven Szene
    * 0: alles aus
    * 1..8: Benutzerdefinierte Szene (Definition / Lernen von Szenen muss mit den Loxone-Tools erfolgen)
    * 9: alles ein
- `sceneList` (ro) Liste aller Szenen
- "Plus" (wo) wechselt zur nächsten Szene
- "minus" (wo) wechselt zur vorherigen Szene

Dieser Kanaltyp kann andere Geräte enthalten. Weitere Informationen finden Sie im jeweiligen Kapitel.

### Lichtsteuerung V2
Wird von (Hotel-) Lichtsteuerungen in Loxone-Software-Version 9 und höher bereitgestellt.
Stimmungen können nur in den Loxone-Anwendungen geändert werden, können jedoch in ioBroker ausgewählt und kombiniert werden.

- `moodList` (ro) Liste aller konfigurierten Stimmungsnamen
- `activeMoods` (rw) derzeit aktive Liste der Stimmungsnamen
- "favoriteMoods" (ro) Liste der Lieblingsstimmungen
- `additionalMoods` (ro) Liste der nicht bevorzugten Stimmungsnamen
- "Plus" (wo) wechselt zur nächsten Stimmung
- "minus" (wo) wechselt zur vorherigen Stimmung

Dieser Kanaltyp kann andere Geräte enthalten. Weitere Informationen finden Sie im jeweiligen Kapitel.

### Zentrale Lichtsteuerung
Bereitgestellt durch zentrale Lichtsteuerung.

- `control` (wo) schaltet alle Lichter ein oder aus

### Meter
Bereitgestellt von Verbrauchszählern.

- "actual" (ro) der tatsächliche Wert (Anzahl)
- "actual-formatiert" (ro), falls konfiguriert, der formatierte Statuswert (mit dem "Unit" -Format von Loxone Config)
- `total` (ro) der Gesamtwert (Anzahl)
- `total-formatiert` (ro), falls konfiguriert, der formatierte Gesamtwert des Status (unter Verwendung des Formats" Unit "von Loxone Config)
- `reset` (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird der Gesamtwert zurückgesetzt

### Druckknopf
Bereitgestellt durch virtuelle Tastereingaben.

- `active` (rw) den aktuellen Zustand der Drucktaste
- Wenn Sie einen beliebigen Wert in diesen Zustand schreiben, wird simuliert, dass die Taste nur für eine sehr kurze Zeit gedrückt wird

### Schieberegler
Wird durch analoge virtuelle Eingänge bereitgestellt.

- `value` (rw) der aktuelle Wert des Schiebereglers
- `value-formatiert` (ro), falls konfiguriert, der formatierte Wert des Zustands (unter Verwendung des Formats" Unit "von Loxone Config)
- `error` (ro) zeigt einen ungültigen Wert des Schiebereglers an

### Rauchmelder
Bereitgestellt von Verbrauchszählern.

- `nextLevel` (ro) die ID der nächsten Alarmstufe
    * 1 = lautlos
    * 2 = Akustisch
    * 3 = Optisch
    * 4 = intern
    * 5 = Extern
    * 6 = Remote
- `nextLevelDelay` (ro) Verzögerung der nächsten Ebene in Sekunden
- `nextLevelDelayTotal` (ro) Gesamtverzögerung der nächsten Ebene in Sekunden
- `level` (ro) die ID der aktuellen Alarmstufe
    * 1 = lautlos
    * 2 = Akustisch
    * 3 = Optisch
    * 4 = intern
    * 5 = Extern
    * 6 = Remote
- `sensors` (ro) die Liste der Sensoren
- 'acousticAlarm` (ro) Status des akustischen Alarms ist falsch für nicht aktiv und wahr für aktiv
- `testAlarm` (ro) ob Testalarm aktiv ist
- `alarmCause` (ro) die Ursache des Alarms:
    * 1 = nur Rauchmelder
    * 2 = nur Wasser
    * 3 = Rauch und Wasser
    * 4 = nur Temperatur
    * 5 = Feuer und Temperatur
    * 6 = Temperatur und Wasser
    * 7 = Feuer, Temperatur und Wasser
- Zeitstempel `startTime` (ro), wenn der Alarm ausgelöst wurde
- `timeServiceMode` (rw) verzögert sich, bis der Servicemodus deaktiviert ist
- "Stummschaltung" (wo) Wenn Sie einen beliebigen Wert in diesen Status schreiben, wird die Sirene stummgeschaltet
- "quit" (wo) das Schreiben eines beliebigen Werts in diesen Status bestätigt den Rauchalarm

### Schalter
Bereitgestellt durch virtuelle Eingabeschalter.

- "aktiv" (rw) den aktuellen Status des Schalters

### TimedSwitch
Bereitgestellt durch Treppenhaus und Multifunktionsschalter.

- `disableivationDelayTotal` (ro) Sekunden, wie lange der Ausgang aktiv ist, wenn der Timer verwendet wird
- Countdown 'disableivationDelay' (ro) bis der Ausgang deaktiviert wird
    * 0 = der Ausgang ist ausgeschaltet
    * -1 = der Ausgang ist permanent eingeschaltet
    * Andernfalls zählt es von disableDelayTotal herunter
- "aktiv" (wo) aktiviert oder deaktiviert den Schalter (ohne Deaktivierungsverzögerung)
- "puls" (wo) pulsiert den Schalter:
    * Deaktivierungsverzögerung = 0
        * Startet den Countdown von disableDelayTotal bis 0
    * wenn es sich um einen Treppenhausschalter handelt:
        * Deaktivierungsverzögerung = -1
            * Kein Effekt, bleibt dauerhaft eingeschaltet.
        * disableDelay> 0
            * Startet den Countdown neu
    * wenn dies ein Multifunktionsschalter ist
        * schaltet es aus (vom Countdown oder permanentem Ein)

### Tracker
Bereitgestellt durch Treppenhaus und Multifunktionsschalter.

- `entries` (ro) Liste der vom Miniserver zurückgegebenen Einträge

### WindowMonitor
Bereitgestellt von Verbrauchszählern.

Anzahl der geöffneten Fenster und Türen
- "numClosed" (ro) Anzahl der geschlossenen Fenster und Türen
- "numTilted" (ro) Anzahl gekippter Fenster und Türen
- `numOffline` (ro) Anzahl der Fenster und Türen, die nicht verfügbar sind
- Anzahl der gesperrten Fenster und Türen
- "numUnlocked" (ro) Anzahl der unverschlossenen Fenster und Türen

Die Summe der Werte aus allen diesen Zuständen ist gleich der Anzahl der überwachten Fenster und Türen. Die Fenster / Türen mit zwei Zuständen werden immer in den "schlechtesten" Zustand gezählt.

Für jedes überwachte Fenster / jede Tür gibt es ein Gerät mit einem Index als ID und dem angegebenen Namen. Sie haben folgende Zustände:

- `closed` (ro) das Fenster / die Tür ist geschlossen
- "gekippt" (ro) das Fenster / die Tür ist gekippt
- `open` (ro) das Fenster / die Tür ist offen
- `locked` (ro) das Fenster / die Tür ist gesperrt
- `unlocked` (ro) das Fenster / die Tür ist entriegelt

## Weather Server
Die Wetterserver-Informationen werden als Gerät mit mehreren Kanälen bereitgestellt.
Das Gerät heißt `WeatherServer`.
Es beinhaltet:

- der Kanal "Actual" mit den aktuellen Wetterwerten
- einen Kanal für jede Vorhersagezeit mit dem Namen "HourXX", wobei "XX" die Anzahl der Stunden angibt

Jeder Kanal enthält die folgenden Zustände:

- barometrischer Druck: numerischer barometrischer Druckwert
- 'barometricPressure-formatiert': formatierter barometrischer Druckwert mit Einheit
- `dewPoint`: numerischer Taupunktwert
- `dewPoint-formatiert`: formatierter Taupunktwert mit Einheit
- "gefühlte Temperatur": numerischer wahrgenommener Temperaturwert
- "gefühlteTemperatur-formatiert": formatierter gefühlter Temperaturwert mit Einheit
- "Niederschlag": numerischer Niederschlagswert
- "Niederschlag-formatiert": formatierter Niederschlagswert mit Einheit
- "relativeHumidity": numerischer relativer Luftfeuchtigkeitswert
- `relativeHumidity-formatiert`: formatierter relativer Luftfeuchtigkeitswert mit Einheit
- "solarRadiation": Sonnenstrahlungswert
- "Temperatur": numerischer Temperaturwert
- "temperaturformatiert": formatierter Temperaturwert mit Einheit
- `timestamp`: Zeitstempel der Daten als` value.time` (JavaScript-Zeit)
- `weatherType`: numerischer Aufzählungswert des Wettertyps
- `weatherType-text`: Textdarstellung des Wettertyps
- "windDirection": Windrichtungswert
- `windSpeed`: Windgeschwindigkeitswert
- `windSpeed-formatiert ': formatierter Windgeschwindigkeitswert mit Einheit

## Kompatibilität
Die Kompatibilität wurde mit Loxone Miniserver Go 9.0.9.26 mit Loxone Config 9.0.9.26 getestet.

## Fehlerberichte und Funktionsanfragen
Bitte verwenden Sie das GitHub-Repository, um Fehler zu melden oder neue Funktionen anzufordern.

Wenn Sie einen fehlenden Steuerelementtyp benötigen, geben Sie bitte den Namen, wie er im Fehlerprotokoll von ioBroker angegeben ist, sowie den gesamten Rohinhalt des Geräts im ioBroker-Objektbaum an:

Beispiel für eine Logdatei für "LightController":

![Protokoll der fehlenden LightController-Steuerung](../../../en/adapterref/iobroker.loxone/doc/log-missing-control-type.png)

Nativer Wert von ioBroker & gt; Objekte

![Details zum fehlenden LightController-Steuerelement](../../../en/adapterref/iobroker.loxone/doc/details-missing-control-type.png)

## Legal
Dieses Projekt ist weder direkt noch indirekt mit der Firma Loxone Electronics GmbH verbunden.

Loxone und Miniserver sind eingetragene Marken der Loxone Electronics GmbH.

## Changelog
### 1.0.0
* (UncleSamSwiss) Fixed issue that was resetting the custom settings and cloud smartName
* (alladdin) Fixed connection issues with Loxone Miniserver 10
* (UncleSamSwiss) Changed all write-only "switch"es to "button"s
* (UncleSamSwiss) Added support for AlarmClock control
* (Apollon77) Updated CI Testing

### 0.4.0
* (UncleSamSwiss) Improved support for Loxone Config 9
* (UncleSamSwiss) Changed all color choosers (i.e. color lights) to use RGB (previously HSV/HSL was completely wrong)

### 0.3.0
* (UncleSamSwiss) Control names only synchronized on the first time by default (configurable); users can change control names the way they want

### 0.2.1
* (UncleSamSwiss) Added support for Slider control

### 0.2.0
* (UncleSamSwiss) Added proper support for Alexa for the following controls: Alarm, AudioZone, Gate, Jalousie and LightController

### 0.1.1
* (UncleSamSwiss) Added support for synchronizing rooms and functions (categories) from Loxone Miniserver

### 0.1.0
* (UncleSamSwiss) Added support for many more controls including commands from ioBroker to Loxone Miniserver

### 0.0.3
* (Bluefox) Formatting, refactoring and Russian translations

### 0.0.2
* (UncleSamSwiss) Added creation of an empty device for all unsupported controls (helps figure out its configuration)

### 0.0.1
* (UncleSamSwiss) Initial version