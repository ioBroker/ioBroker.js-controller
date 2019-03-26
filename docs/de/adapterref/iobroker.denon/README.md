---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.denon/README.md
title: ioBroker.denon
hash: cRIoJ/jTJ5an0IAOxshQM3FTCC38XhcdeV5G/x/Iksw=
---
![Logo](../../../en/adapterref/iobroker.denon/admin/denon.png)

![Build Status Travis](https://travis-ci.org/foxriver76/ioBroker.denon.svg?branch=master)
![Build-Status](https://ci.appveyor.com/api/projects/status/mwkeddgjpgnpef5n/branch/master?svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/denon-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.denon.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.denon.svg)
![NPM](https://nodei.co/npm/iobroker.denon.png?downloads=true)

# IoBroker.denon ============================
[![Greenkeeper-Abzeichen] (https://badges.greenkeeper.io/foxriver76/ioBroker.denon.svg)](https://greenkeeper.io/)

## Installation
Sie können den Adapter entweder über die ioBroker-Weboberfläche oder auf Ihrem lokalen Computer über npm installieren.

### Browser-basiert
1. Öffnen Sie Ihre ioBroker-Weboberfläche in einem Browser (zB: 192.168.30.70:8081).
2. Klicken Sie auf die Registerkarte "Adapter".
3. Geben Sie "Denon" in den Filter ein
4. Klicken Sie auf die drei Punkte und dann auf das Symbol "+" des DENON AVR-Adapters

![Adapter hinzufügen](../../../en/adapterref/iobroker.denon/docs/en/media/plusAddAdapter.png)

### Lokale Maschine
Navigieren Sie in Ihren iobroker-Ordner und führen Sie den folgenden Befehl aus:

```bash
npm i iobroker.denon
```

## Konfiguration
Zusätzlich zur Adapterinstallation müssen Sie sicherstellen, dass Ihr AVR richtig konfiguriert ist.

### IoBroker
1. Öffnen Sie Ihre ioBroker-Schnittstelle in einem Browser (zB: 192.168.1.33:8081)
2. Navigieren Sie zur Registerkarte "Adapter".
3. Klicken Sie auf die drei Punkte und dann auf das "+" - Symbol des DENON AVR-Adapters

![Adapter hinzufügen](../../../en/adapterref/iobroker.denon/docs/en/media/plusAddAdapter.png)

4. Nun können Sie die Adapterkonfigurationsseite sehen -> Geben Sie die IP-Adresse Ihres DENON AVR ein oder klicken Sie auf die Suche

Symbol zum Auffinden von AVRs in Ihrem Netzwerk (über UPnP) ![Adapterkonfiguration](../../../en/adapterref/iobroker.denon/docs/en/media/fillInIp.png)

5. Wenn Sie auch das Abfrage- / Abfrageintervall anpassen möchten, klicken Sie auf die Registerkarte "Erweiterte Einstellungen".

Durch Verringern des Abfrageintervalls verkürzt der Adapter die Zeit zwischen der Aktualisierung des Anzeigeinhalts.
Durch Verringern des Anforderungsintervalls wird die Zeit zwischen Sendebefehlen verringert.
Die Standardeinstellungen sollten für die meisten Benutzer gut passen.
![Erweiterte Einstellungen](../../../en/adapterref/iobroker.denon/docs/en/media/advancedSettings.png)

6. Klicken Sie auf Speichern und schließen

### Netzwerkeinrichtung des AV-Receivers
1. Drücken Sie die SETUP-Taste. Das Menü erscheint auf dem FL-Display (und der GUI).
2. Wählen Sie "Netzwerk" -> "Einstellungen".
3. Stellen Sie die unten beschriebenen Parameter ein

   * DHCP: "ON" (Verwenden Sie diese Einstellung, wenn sich der DHCP-Server im lokalen Netzwerk befindet.) *

   * IP-Adresse: Wenn <DHCP> auf "Aus" gesetzt ist, geben Sie die IP-Adresse ein. *

   * Subnetzmaske: Wenn <DHCP> auf "Aus" gesetzt ist, stellen Sie die Subnetzmaske ein. *

   * Gateway: Legen Sie die Adresse des Gateways fest, wenn sich das Gateway im lokalen Netzwerk befindet. *

   * Primary DNS: Legen Sie diesen Parameter nicht fest. *

   * Zweiter DNS: Legen Sie diesen Parameter nicht fest. *

   * Proxy: Stellen Sie diesen Parameter auf "Aus". *

4. Drücken Sie die SETUP-Taste. Das Menü erscheint auf dem FL-Display (und der GUI).
5. Wählen Sie "Netzwerk" -> Netzwerksteuerung / IP-Steuerung ".
6. Stellen Sie diesen Parameter auf "Always On".

## Verwendungszweck
Beachten Sie, dass die AVRs nur eine einzige Telnet-Verbindung verwalten können. Wenn Sie eine aktive Telnet-Verbindung haben, e. G. Mit dem Javascript-Adapter wird der AVR die Verbindung dieses Adapters ablehnen.
Hier finden Sie eine Beschreibung der Zustände und deren Verwendung.

### Tasten
Der Adapter erstellt die folgenden Schaltflächen:

Kanal: zoneMain / zone2 / zone3
* zoneMain.playPause

   * Musik von Bluetooth-, Online-, USB- / iPod-Quellen abspielen und anhalten. *

* zoneMain.play

   * Musik von Bluetooth-, Online-, USB- / iPod-Quellen abspielen. *

* zoneMain.pause

   * Pausieren Sie Musik von Bluetooth-, Online-, USB- / iPod-Quellen. *

* zoneMain.skipMinus

   * Zum vorherigen Titel springen. *

   * NICHT VOLLSTÄNDIG UNTERSTÜTZT FÜR HEOS AVR'S *

* zoneMain.skipPlus

   * Zum nächsten Titel springen. *

   * NICHT VOLLSTÄNDIG UNTERSTÜTZT FÜR HEOS AVR'S *

* zoneMain.volumeDown / zone2.volumeDown / zone3.volumeDown

   * Verringern Sie die Lautstärke der Hauptzone / Zone2 / Zone3. *

* zoneMain.volumeUp / zone2.volumeUp / zone3.volumeUp

   * Erhöhen Sie die Lautstärke der Hauptzone / Zone2 / Zone3. *

* zoneMain.equalizerBassUp / zone2.equalizerBassUp / zone3.equalizerBassUp

   * Taste zum Erhöhen des Basspegels der Zone. *

   * Die Einstellungen für Bässe und Höhen können eingestellt werden, wenn Dyn EQ auf OFF und Tone Control eingestellt ist. *

* zoneMain.equalizerBassDown / zone2.equalizerBassDown / zone3.equalizerBassDown

   * Taste, die den Basspegel der Zone verringert. *

   * Die Einstellungen für Bässe und Höhen können eingestellt werden, wenn Dyn EQ auf OFF und Tone Control eingestellt ist. *

* zoneMain.equalizerTrebleUp / zone2.equalizerTrebleUp / zone3.equalizerTrebleUp

   * Taste, die den Höhenpegel der Zone erhöht. *

   * Die Einstellungen für Bässe und Höhen können eingestellt werden, wenn Dyn EQ auf OFF und Tone Control eingestellt ist. *

* zoneMain.equalizerTrebleDown / zone2.equalizerTrebleDown / zone3.equalizerTrebleDown

   * Taste, die den Höhenpegel der Zone verringert. *

   * Die Einstellungen für Bässe und Höhen können eingestellt werden, wenn Dyn EQ auf OFF und Tone Control eingestellt ist. *

#### Channel: Einstellungen
* settings.subwooferLevelDown / settings.subwooferTwoLevelDown

   * Reduzieren Sie den Subwoofer-Pegel durch Drücken der Taste. *

* settings.subwooferLevelUp / settings.subwooferTwoLevelUp

   * Erhöhen Sie den Subwoofer-Pegel durch Drücken der Taste. *

* settings.containmentAmountDown

   * Senkung der Audyssey-LFC-Menge. Die Schaltfläche wird nur erstellt, wenn sie von Ihrem AVR unterstützt wird. *

* settings.containmentAmountUp

   * Erhöhen Sie den LFC-Betrag von Audyssey. Die Schaltfläche wird nur erstellt, wenn sie von Ihrem AVR unterstützt wird. *

* settings.cursorUp / settings.cursorDown / settings.cursorLeft / settings.cursorRight

   * Simuliert die Cursortasten Ihrer Fernbedienung *

* settings.enter

   * Simuliert die Eingabetaste Ihrer Fernbedienung *

* settings.return

   * Simuliert die Rückkehr / Zurück-Taste Ihrer Fernbedienung *

* einstellungen.option

   * Simuliert die Optionsschaltfläche Ihrer Fernbedienung *

* einstellungen.info

   * Simuliert die Info-Taste Ihrer Fernbedienung *

### Zustände
Folgende Zustände werden vom Adapter erstellt:

#### Channel: info
* info.verbindung

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R |

   * Schreibgeschützter boolescher Indikator. Wenn Ihr Broker mit Ihrem DENON AVR verbunden ist, lautet der Status true, andernfalls false. *

* info.friendlyName

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

   * Nur lesbare Zeichenfolge. Enthält den Anzeigenamen des verbundenen AVR. *

* info.onlinePresets

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

* String im JSON-Array-Format, das die aktuell gespeicherten Favoriten anhand ihrer ID und ihres Kanals darstellt.
Die Namen jedes Kanals sind auf 20 Ziffern begrenzt. Sie können den aktuellen Kanal in einer ID speichern, indem Sie settings.savePreset einstellen und einen laden, indem Sie settings.loadPreset auf die entsprechende ID setzen. *

Kanal: zoneMain / zone2 / zone3
* zoneMain.volume / zone2.volume / zone3.volume

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

* Zahlenwert, der die aktuelle Lautstärke der Hauptzone / Zone2 / Zone 3 Ihres AVR darstellt. Sie können hier auch die Lautstärke einstellen.
Die Lautstärke wird auch in dB in separaten Zuständen dargestellt, z. G. mainVolumeDB *

   * Bereich ist von 0 bis 98 (möglicherweise niedriger wegen des maximalen Volumens), wobei 80 = 0 dB *

   *Beispiel:*

```javascript
setState('denon.0.zoneMain.volume', 45.5); // Sets volume of Main Zone to 45.5
```

* zoneMain.maximumVolume

    Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R |

   * Read-Only-Nummer, die die maximal mögliche Lautstärke darstellt, wobei 80 = 0 dB ist. Die Lautstärke wird auch im maximalenVolumeDB-Status in dB eingestellt. *

* zoneMain.muteIndicator / zone2.muteIndicator / zone3.muteIndicator

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   * Boolescher Wert, der wahr ist, wenn die Hauptzone / Zone2 / Zone3 stummgeschaltet ist, andernfalls false. Sie können Ihren AVR mit diesem Status stummschalten. *

   *Beispiel:*

```javascript
setState('denon.0.zoneMain.muteIndicator', true); // Mutes the Main Zone of your AVR
```

* zoneMain.powerZone / zone2.powerZone / zone3.powerZone

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   * Boolescher Wert, der true ist, wenn die Zone eingeschaltet ist, andernfalls false. Sie können Ihren AVR / Zone mit diesem Status ein- und ausschalten. *

* zoneMain.selectInput / zone2.selectInput / zone3.selectInput

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * Der String-Wert enthält die aktuelle Eingabequelle. Sie können die Eingangsquelle auch mit der folgenden Kodierung einstellen: *

   * 0: PHONO *

   * 1: CD *

   * 2: TUNER *

   * 3: DVD *

   * 4: BD *

   * 5: TV *

   * 6: SAT / CBL *

   * 7: MPLAY *

   * 8: SPIEL *

   * 9: NET *

   * 10: SPOTIFY *

   * 11: LASTFM *

   * 12: IRADIO *

   * 13: SERVER *

   * 14: LIEBLINGS *

   * 15: AUX1 *

   * 16: AUX2 *

   * 17: AUX3 *

   * 18: AUX4 *

   * 19: AUX5 *

   * 20: AUX6 *

   * 21: AUX7 *

   * 22: BT *

   * Bitte beachten Sie, dass nicht jede Eingangsquelle für jedes AVR-Modell verfügbar ist. *

   *Beispiel:*

```javascript
 setState('denon.0.zoneMain.selectInput', '5'); // Selects TV as input for Main Zone
```

* zoneMain.quickSelect / zone2.quickSelect / zone3.quickSelect

   Datentyp | Berechtigung |
   |:---:|:---:|
   Nummer | R / W |

   * Emuliert die Schnellwahltasten Ihrer Fernbedienung mit Nummern von 1 bis 5 für Main Zone / Zone2 / Zone3. *

* zoneMain.sleepTimer / zone2.sleepTimer / zone3.sleepTimer

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

   * Zahlenwert zum Lesen und Einstellen des Sleep-Timers für die ausgewählte Zone. Der Wert wird in weniger als 10 Sekunden aktualisiert. *

* zoneMain.iconURL

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

   * Enthält einen Link, über den Sie das Cover des gerade gespielten Kanals / Songs finden können. *

   * NICHT FÜR HEOS AVR'S UNTERSTÜTZT *

* zoneMain.equalizerBass / zone2.equalizerBass / zone3.equalizerBass

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

   * Zahlenwert, der den Basspegel der Zone darstellt. Der Wertebereich reicht von -6 bis +6 dB. *

   * Die Einstellungen für Bässe und Höhen können eingestellt werden, wenn Dyn EQ auf OFF und Tone Control eingestellt ist. *

* zoneMain.equalizerTreble / zone2.equalizerTreble / zone3.equalizerTreble

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

   * Zahlenwert, der den Höhenpegel der Zone darstellt. Der Wertebereich reicht von -6 bis +6 dB. *

   * Die Einstellungen für Bässe und Höhen können eingestellt werden, wenn Dyn EQ auf OFF und Tone Control eingestellt ist. *

* zoneMain.channelVolumeFrontLeft / zone2.channelVolumeFrontLeft / zone3.channelVolumeFrontLeft / ...

   Datentyp | Berechtigung |
   |:---:|:---:|
   Nummer | R / W |

* Zahlenwert, der die aktuelle Kanallautstärke für jeden Lautsprecher darstellt. Jeder Sprecher hat einen eigenen Zustand. Die Einstellungen wirken sich auf den aktuellen Select-Input-Modus aus. Der Zustand kann von -12 dB bis +12 dB eingestellt werden. *

#### Channel: Anzeige
* display.displayContent

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

   * Nur-Lese-String, der den Inhalt Ihrer AVR-Anzeige enthält. Es hat neun Zustände 0 - 9. *

   * DISPLAY-INHALT WIRD NICHT FÜR HEOS AVR'S UNTERSTÜTZT *

* Bildschirmhelligkeit

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * String-Wert, der die Anzeigehelligkeit darstellt. Der Wert kann die Displayhelligkeit auch durch folgende Kodierung einstellen: *

   * 0: Aus -> schaltet die Anzeige aus *

   * 1: Dunkel -> dunkelt die Anzeige *

   * 2: Gedimmt -> Anzeige wird abgeblendet *

   * 3: Hell -> macht die Anzeige hell *

   *Beispiel:*

```javascript
setState('denon.0.display.brightness', '3'); // Sets display brightness to "Bright"
```

#### Channel: Einstellungen
* settings.powerSystem

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   * Boolescher Wert, der true ist, wenn der AVR eingeschaltet ist, andernfalls false. Sie können Ihren AVR auch in diesem Status ein- und ausschalten. *

* settings.surroundMode

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * Der String-Wert enthält den aktuellen Surround-Modus. Sie können die Quelle auch mit der folgenden Kodierung ändern: *

   * 0: STEREO *

   * 1: VIRTUAL *

   * 2: VIDEOSPIEL *

   * 3: MCH STEREO *

   * 4: DTS SURROUND *

   * 5: DOLBY DIGITAL *

   * 6: FILM *

   * 7: MUSIK *

   * 8: DIREKT *

   * 9: PURE DIRECT *

   * 10: AUTO *

   * 11: SPIEL *

   * 12: AURO3D *

   * 13: AURO2DSURR *

   * 14: WIDE SCREEN *

   * 15: SUPER STADIUM *

   * 16: ROCK ARENA *

   * 17: JAZZ CLUB *

   * 18: KLASSISCHES KONZERT *

   * 19: MONO MOVIE *

   * 20: MATRIX *

   * Bitte beachten Sie, dass nicht jeder Surround-Modus für jedes AVR-Modell verfügbar ist. *

   *Beispiel:*

```javascript
setState('denon.0.settings.surroundMode', '3'); // Sets Multi Channel Stereo as surround mode
```

* settings.expertCommand

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * Sie können mit diesem Status eigene benutzerdefinierte Befehle senden. Eine Übersicht über die vorhandenen Befehle finden Sie in den [AVR-Control-Protokoll.pdf](docs/AVR-Control-Protocol.pdf) *

   *Beispiel:*

```javascript
setState('denon.0.settings.expertCommand', 'ECOON'); // Turns Main Zone ECO mode on
```

* einstellungen.outputMonitor

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * Wählen Sie den Ausgangsmonitor Ihres AVR. Dieser Status wird nur erstellt, wenn Ihr AVR zwei HDMI-Ausgänge unterstützt. Sie können den Status wechseln zwischen: *

   * 0: AUTO -> Automatische Erkennung des Monitors *

   * 1: 1 -> Ausgabe des Signals an Monitor 1 *

   * 2: 2 -> Ausgabe des Signals an Monitor 2 *

   *Beispiel:*

```javascript
setState('denon.0.settings.outputMonitor', '2'); // Sets monitor 2 as active monitor
```

* settings.videoProcessingMode

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * Wählen Sie den Videoverarbeitungsmodus Ihres AVR. Dieser Status wird nur erstellt, wenn Ihr AVR dies unterstützt. Sie können den Status wechseln zwischen: *

   * 0: AUTO *

   * 1: SPIEL *

   * 2: FILM *

   *Beispiel:*

```javascript
setState('denon.0.settings.videoProcessingMode', '2'); // Sets Video Processing Mode to "MOVIE"
```

* settings.centerSpread

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   * Boolescher Wert, der true ist, wenn der Center-Spread eingestellt ist, andernfalls false. Mit diesem Status können Sie auch die Mittenverteilung ein- / ausschalten. *

* settings.dynamicEq

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   * Boolescher Wert, der den Status des Dynamic EQ darstellt. Sie können den Dynamic EQ mit diesem Status auch ein- und ausschalten. *

* settings.subwooferLevelState

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   * Boolescher Wert, wenn dies wahr ist, können Sie Änderungen am Subwoofer-Pegel vornehmen. *

* settings.subwooferLevel / settings.subwooferTwoLevel

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

* Zahlenwert, der den aktuellen Subwoofer-Pegel angibt. Der Wert hat einen Bereich von -12 bis 12 (-12 dB bis +12 dB).
Der SubwooferTwoLevel-Status wird nur erstellt, wenn er von Ihrem AVR unterstützt wird. *

* settings.audysseyLfc

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

* Boolescher Wert, der den Status des Audyssey Low Frequency Containment (ein / aus) enthält und steuern kann.
Der Status wird nur erstellt, wenn er von Ihrem AVR unterstützt wird. *

* settings.containmentAmount

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

* Zahlenwert zum Einstellen des Niederfrequenzbehältnisbetrags. Der Wert kann zwischen 1 und 7 liegen. Der Status wird nur erstellt, wenn er von Ihrem AVR unterstützt wird. *

* settings.multEq

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * String value, um die MultEQ-Funktion Ihres AVR mit der folgenden Kodierung einzustellen: *

   * 0: AUS *

   * 1: AUDYSSEY *

   * 2: BYP.LR *

   * 3: FLAT *

   * 4: MANUAL *

* settings.dynamicVolume

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * String-Wert zur Auswahl des dynamischen Volumes anhand der folgenden Codierung: *

   * 0: OFF -> schaltet die dynamische Lautstärke aus *

   * 1: LIT -> macht Dynamic Volume zum Leuchten *

   * 2: MED -> macht Dynamic Volume auf Medium *

   * 3: HEV -> macht Dynamic Volume zu schwer *

* settings.referenceLevelOffset

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * String-Wert zur Auswahl des Referenzpegelversatzes durch die folgende Kodierung: *

   * 0: 0 dB *

   * 5: 5 dB *

   * 10: 10 dB *

   * 15: 15 dB *

   *Beispiel:*

```javascript
setState('denon.0.settings.referenceLevelOffset', '5'); // Sets Reference Level Offset to 5 dB
```

* settings.pictureMode

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   * Stringwert zum Einstellen der direkten Änderung des Bildmodus. Dieser Status wird nur erstellt, wenn Ihr AVR dies unterstützt. *

   * Sie können die folgenden Werte als Zeichenfolge festlegen: *

   *'Aus'*

   *'Standard'*

   *'Film'*

   * "Lebhaft" *

   *'Strom'*

   *'Brauch'*

   * 'ISF-Tag' *

   * 'ISF Nacht' *

   *Beispiel:*

```javascript
setState('denon.0.settings.pictureMode', 'Standard'); // Set Picture Mode Direct Change to Standard
```

* settings.toneControl

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   * Boolescher Wert, der den Status der Tonsteuerung angibt. Sie können es in diesem Zustand ein- / ausschalten. *

   * Tone Control kann nur eingeschaltet werden, wenn Dyn EQ auf OFF steht. *

* einstellungen.setupMenu

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   * Boolescher Indikator, der anzeigt, ob das Setup-Menü geöffnet oder geschlossen ist. Sie können es mit diesem Status öffnen und schließen. *

* settings.savePreset

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

* Zahlenwert, der auf einen Wert von info.onlinePresets gesetzt werden kann. Der aktuelle Kanal wird dann als Voreinstellung unter der angegebenen Nummer gespeichert.
Es können nur Nummern verwendet werden, die in info.onlinePresets enthalten sind. Der Staat erhält keine Bestätigung, unabhängig davon, ob der Befehl erfolgreich war oder nicht. Sie können info.onlinePresets überprüfen, um zu prüfen, ob der Befehl als aspiziert funktioniert hat. *

* settings.loadPreset

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

* Zahlenwert, der auf einen Wert von info.onlinePresets gesetzt werden kann. Dadurch wird der zugehörige Kanal geladen.
Dieser Status wird nicht bestätigt, unabhängig davon, ob der Befehl erfolgreich war oder nicht. *

### Andere Staaten
Aufgrund der Tatsache, dass einige AVRs wie der DENON POA-3012CI eine andere Logik verwenden, gibt es einige Unterschiede in den Zuständen.
Die Zustände, die den oben aufgelisteten entsprechen, sind: settings.powerSystem, settings.expertCommand, display.brightness und info.connection. Zusätzlich werden für jede Zone 2-12 (gerade) die folgenden Zustände erstellt:

* zoneX.speakerOneVolume / zoneX.speakerTwoVolume

    Datentyp | Berechtigung |
    |:---:|:---:|
    Nummer | R / W |

* Zahlenwert, der die Lautstärke des Lautsprechers des AVR darstellt. Wenn operationMode auf 'BRIDGED' eingestellt ist, können die Lautsprecher nicht unabhängig gesteuert werden, und die Steuerung eines Lautsprechers steuert auch die Lautstärke der anderen Lautsprecher. *

* zoneX.selectInputOne / zoneX.selectInputTwo

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

* Schlüsselwertpaar, das den ausgewählten Eingang des Lautsprechers des AVR darstellt. Wenn operationMode auf 'BRIDGED' eingestellt ist, können die Lautsprecher nicht unabhängig voneinander gesteuert werden, und die Steuerung eines Lautsprechers steuert auch den Eingang des anderen. *

    * Folgende Werte sind möglich: *

    * '0': 'BUS L' *

    * '1': 'BUS R' *

    * '2': 'BUS M' *

    * '3': 'AUX' *

* zoneX.operationMode

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

* Schlüsselwertpaar, das den operationMode des AVR darstellt. Wenn operationMode auf 'BRIDGED' eingestellt ist, können die Lautsprecher nicht unabhängig gesteuert werden. Lautsprecher 1 steuert auch Lautsprecher 2. *

    * Folgende Werte sind möglich: *

    * '0': 'NORMAL' *

    * '1': 'BRIDGED' *

* zoneX.lowCutFilterSpeakerOne / zoneX.lowCutFilterSpeakerTwo

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

* Boolescher Wert, der angibt, ob der Tiefpassfilter für den Lautsprecher aktiviert oder deaktiviert ist. Im überbrückten Modus sind beide Lautsprecher voneinander abhängig. *

* zoneX.zoneTurnOnModeChange

    Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

* Schlüsselwertpaar, das die Änderung der Zone beim Einschalten des Bereichs darstellt. Sie können Ihren AVR auch mit diesem Status steuern. *

    * Folgende Werte sind möglich: *

    * '0': 'Konstante' *

    * '1': 'Trigger in' *

    * '2': 'Audiosignal' *

    * '3': 'Aus' *

* zoneX.triggerInput

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

    * Schalten Sie den Triggereingang mit diesem booleschen Wert ein oder aus. *

* zoneX.audioSignalInput

    Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

    * Boolescher Wert, der den Audiosignaleingang Ihres AVR anzeigt und steuert. *

## Fehlende Funktionen und Fehler
Wenn Sie irgendwelche Funktionen vermissen oder einen Fehler entdeckt haben, öffnen Sie bitte einen [Problem](https://github.com/foxriver76/ioBroker.denon/issues).

Der Adapter wurde mit einem DENON AVR-X1200W und einem Marantz SR5009 getestet.

## Changelog

### 1.5.1
* (foxriver76) fix to detect DENON Ceol

### 1.5.0
* (foxriver76) added channel volumes for zone2 + 3
* (foxriver76) other optimizations
* (foxriver76) support of DENON POA-3012CI and similar AVRs
* (foxriver76) create db volumes everytime

### 1.3.2
* (foxriver76) compact mode compatibility added

### 1.2.7
* (foxriver76) make sure states are never set before creation
* (foxriver76) minor fixes and improvements

### 1.2.6
* (foxriver76) only updating sleep timer and quick select on change
* (foxriver76) using promises wherever possible
* (foxriver76) minor improvements

### 1.2.4
* (foxriver76) fix verbose logging on network issues
* (foxriver76) as long as connection error stays the same, logging happens on debug

### 1.2.3
* (foxriver76) add missing usb to selectInput for all zones

### 1.2.2
* (foxriver76) use adapter core

### 1.2.1
* (foxriver76) info.onlinePresets converted to JSON array to work properly with widgets

### 1.2.0
* (foxriver76) added info.onlinePresets which is a JSON string containing all presets
* (foxriver76) settings.savePreset and loadPreset to save and load presets according to the info.onlinePresets

### 1.1.0
* (foxriver76) added Bluetooth as select input (BT)

### 1.0.0
* (foxriver76) formal version increment

### 0.6.0
* (foxriver76) fix that enables Marantz receiver to use the quickSelect functionality
* (foxriver76) quick select is now acknoledged
* (foxriver76) remove old quick select buttons

### 0.5.0
* (foxriver76) added possibility to control channelVolume per speaker for Main Zone
* (foxriver76) new states added to readme and documentation

### 0.4.4
* (foxriver76) fix bug where picture mode command was sent as undefined

### 0.4.3
* (foxriver76) fallback for advanced settings
* (foxriver76) fix double reconnection when AVR closes the socket
* (foxriver76) fix a problem where callback for pictureMode is called to early

### 0.4.2
* (foxriver76) pictureMode role fixed

### 0.4.1
* (foxriver76) added picture mode direct change

### 0.3.9
* (foxriver76) only create containment amount, audyssey lfc, subwoofer two level if supproted
* (foxriver76) readme updated

### 0.3.8
* (foxriver76) add state to control center spread
* (foxriver76) readme updated
* (foxriver76) addded video processing mode control
* (foxriver76) optimizations and minor fixes

### 0.3.7
* (foxriver76) minor code optimization
* (foxriver76) fixes on readme
* (foxriver76) logging undhandled commands on debug

### 0.3.6
* (foxriver76) fixed displayState non-readable chars for old AVRs
* (foxriver76) fixes on readme
* (foxriver76) capital chars in mainZone volumeUp/down names, are now lowercase

### 0.3.5
* (foxriver76) removed isPlaying state, because not working properly
* (foxriver76) update readme

### 0.3.4
* (foxriver76) fix that HEOS does not create http and display content related states

### 0.3.3
* (foxriver76) added state for setup button
* (foxriver76) added cursors and remote control buttons
* (foxriver76) readme update

### 0.3.2
* (foxriver76) Added isPlaying state for non-HEOS AVR's, thanks to bluefox
* (foxriver76) Added link to cover for non-HEOS AVR's
* (foxriver76) displayContent, isPlaying, coverURL will only be generated for non-HEOS
* (foxriver76) Updated readme

### 0.3.1
* (foxriver76) Added placeholder ip in config gui
* (foxriver76) fixed volume in db for main zone

### 0.3.0
* (bluefox & foxriver76) Names and roles were refactored
* (bluefox) Discovery added
* (foxriver76) Update Readme
* (foxriver76) Implemented separate Play & Pause button
* (bluefox & foxriver76) Internal improvements

### 0.2.4
* (foxriver76) prevent adapter from doing more than one reconnect attempt at the same time
* (foxriver76) improved stability
* (foxriver76) update readme

### 0.2.3
* (foxriver76) added possibility to handle states in dB additional
* (foxriver76) minor changes

### 0.2.2
* (foxriver76) removed unneeded files
* (foxriver76) state lists are now of type string due to better compatibility
* (foxriver76) optimized matching for state lists
* (foxriver76) some state lists can be set by the value additionaly to the key

### 0.2.1
* (foxriver76) small bug fixes on connection error handling
* (foxriver76) improvements on module size

### 0.2.0
* (foxriver76) preparations for offical repository

### 0.1.9
* (foxriver76) improved stability
* (foxriver76) improved fault tolerance on volume (e. g. for use as smart device)

### 0.1.8
* (foxriver76) adapter sepcific connection error handling
* (foxriver76) minor reconnect fix

### 0.1.7
* (foxriver76) subwoofer level is now in dB
* (foxriver76) added control of treble, bass and tone control state
* (foxriver76) readme updated

### 0.1.6
* (foxriver76) connection stability improvements
* (foxriver76) some parameter settings added
* (foxriver76) readme updated

### 0.1.5
* (foxriver76) sleep timer for every zone
* (foxriver76) admin2 compatibility
* (foxriver76) minor fixes

### 0.1.4
* (foxriver76) HEOS bug fix (timeout)
* (foxriver76) new state for custom commands (expertCommand)
* (foxriver76) enhanced readme

### 0.1.3
* (foxriver76) bug fixes for Zone3
* (foxriver76) new state for main zone power
* (foxriver76) minor other improvements

### 0.1.2
* (foxriver76) Performance optimization
* (foxriver76) Faster display update
* (foxriver76) More appropriate reconnect intervall

### 0.1.1
* (foxriver76) new readme for npm

### 0.1.0
* (foxriver76) handling up to three zones
* (foxriver76) handling display content
* (foxriver76) setting display brightness

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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