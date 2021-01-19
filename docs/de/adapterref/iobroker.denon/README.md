---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.denon/README.md
title: ioBroker.denon
hash: JYREJt7gT3z33R1WkTzC1mRy5Fp2M+2eeCHRIxmYS5E=
---
![Logo](../../../en/adapterref/iobroker.denon/admin/denon.png)

![Anzahl der Installationen](http://iobroker.live/badges/denon-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.denon.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.denon.svg)
![NPM](https://nodei.co/npm/iobroker.denon.png?downloads=true)

# IoBroker.denon
===========================

![Build-Status](https://github.com/foxriver76/ioBroker.denon/workflows/Test%20and%20Release/badge.svg)

## Installation
Sie können den Adapter entweder über die ioBroker-Weboberfläche oder über npm auf Ihrem lokalen Computer installieren.

### Browser-basiert
1. Öffnen Sie Ihre ioBroker-Weboberfläche in einem Browser (z. B.: 192.168.30.70:8081).
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
Zusätzlich zur Adapterinstallation müssen Sie sicherstellen, dass Ihr AVR korrekt konfiguriert ist.

### IoBroker
1. Öffnen Sie Ihre ioBroker-Oberfläche in einem Browser (zB: 192.168.1.33:8081).
2. Navigieren Sie zur Registerkarte "Adapter".
3. Klicken Sie auf die drei Punkte und dann auf das Symbol "+" des DENON AVR-Adapters

![Adapter hinzufügen](../../../en/adapterref/iobroker.denon/docs/en/media/plusAddAdapter.png)

4. Jetzt sehen Sie die Adapterkonfigurationsseite -> geben Sie die IP-Adresse Ihres DENON AVR ein oder klicken Sie auf die Suche

Symbol zum Auffinden von AVRs in Ihrem Netzwerk (über UPnP) ![Adapterkonfiguration](../../../en/adapterref/iobroker.denon/docs/en/media/fillInIp.png)

5. Wenn Sie auch das Anforderungs- / Abfrageintervall anpassen möchten, klicken Sie auf die Registerkarte "Erweiterte Einstellungen".

Durch Verringern des Abfrageintervalls verringert der Adapter die Zeit zwischen dem Aktualisieren des Anzeigeinhalts.
Durch Verringern des Anforderungsintervalls wird die Zeit zwischen dem Senden von Befehlen verringert.
Die Standardeinstellungen sollten für die meisten Benutzer gut passen.
![Erweiterte Einstellungen](../../../en/adapterref/iobroker.denon/docs/en/media/advancedSettings.png)

6. Klicken Sie auf Speichern und schließen

### Netzwerkeinrichtung des AV-Receivers
1. Drücken Sie die SETUP-Taste, dann erscheint das Menü auf dem FL-Display (und der GUI).
2. Wählen Sie "Netzwerk" -> "Einstellungen"
3. Stellen Sie die unten beschriebenen Parameter ein

   *DHCP: "ON" (Verwenden Sie diese Einstellung, wenn sich der DHCP-Server im lokalen Netzwerk befindet.)*

   *IP-Adresse: Wenn <DHCP> "Aus" setzt, stellen Sie bitte die IP-Adresse ein.*

   *Subnetzmaske: Wenn <DHCP> "Aus" setzt, stellen Sie bitte die Subnetzmaske ein.*

   *Gateway: Legen Sie die Adresse des Gateways fest, wenn sich das Gateway im lokalen Netzwerk befindet.*

   *Primärer DNS: Stellen Sie diesen Parameter nicht ein.*

   *Zweiter DNS: Stellen Sie diesen Parameter nicht ein.*

   *Proxy: Stellen Sie diesen Parameter auf "Aus".*

4. Drücken Sie die SETUP-Taste, dann erscheint das Menü auf dem FL-Display (und der GUI).
5. Wählen Sie "Netzwerk" -> Netzwerksteuerung / IP-Steuerung "
6. Stellen Sie diesen Parameter auf "Immer ein".

## Verwendung
Beachten Sie, dass die AVRs nur eine einzige Telnet-Verbindung verwalten können. Wenn Sie eine aktive Telnet-Verbindung haben e. G. Mit dem Javascript-Adapter verweigert der AVR den Anschluss dieses Adapters.
Hier finden Sie eine Beschreibung der Zustände und deren Verwendung.

### Tasten
Der Adapter erstellt die folgenden Schaltflächen:

#### Kanal: zoneMain / zone2 / zone3
* zoneMain.playPause

   *Musik von Bluetooth-, Online-, USB- / iPod-Quellen abspielen und anhalten.*

* zoneMain.play

   *Spielen Sie Musik von Bluetooth-, Online-, USB- / iPod-Quellen ab.*

* zoneMain.pause

   *Unterbrechen Sie Musik von Bluetooth-, Online-, USB- / iPod-Quellen.*

* zoneMain.skipMinus

   *Zum vorherigen Titel springen.*

   *NICHT VOLLSTÄNDIG UNTERSTÜTZT FÜR HEOS AVR*

* zoneMain.skipPlus

   *Zum nächsten Titel springen.*

   *NICHT VOLLSTÄNDIG UNTERSTÜTZT FÜR HEOS AVR*

* zoneMain.volumeDown / zone2.volumeDown / zone3.volumeDown

   *Verringern Sie die Lautstärke der Hauptzone / Zone2 / Zone3.*

* zoneMain.volumeUp / zone2.volumeUp / zone3.volumeUp

   *Erhöhen Sie die Lautstärke von Hauptzone / Zone2 / Zone3.*

* zoneMain.equalizerBassUp / zone2.equalizerBassUp / zone3.equalizerBassUp

   *Taste, die den Basspegel der Zone erhöht.*

  *Die Einstellungen für Bässe und Höhen können angepasst werden, wenn Dyn EQ auf OFF und Tone Control auf* gestellt ist.

* zoneMain.equalizerBassDown / zone2.equalizerBassDown / zone3.equalizerBassDown

   *Taste, die den Basspegel der Zone verringert.*

  *Die Einstellungen für Bässe und Höhen können angepasst werden, wenn Dyn EQ auf OFF und Tone Control auf* gestellt ist.

* zoneMain.equalizerTrebleUp / zone2.equalizerTrebleUp / zone3.equalizerTrebleUp

   *Taste, die den Höhenpegel der Zone erhöht.*

  *Die Einstellungen für Bässe und Höhen können angepasst werden, wenn Dyn EQ auf OFF und Tone Control auf* gestellt ist.

* zoneMain.equalizerTrebleDown / zone2.equalizerTrebleDown / zone3.equalizerTrebleDown

   *Taste, die den Höhenpegel der Zone verringert.*

  *Die Einstellungen für Bässe und Höhen können angepasst werden, wenn Dyn EQ auf OFF und Tone Control auf* gestellt ist.

#### Kanal: Einstellungen
* settings.subwooferLevelDown / settings.subwooferTwoLevelDown

   *Reduzieren Sie den Subwoofer-Pegel durch Drücken der Taste.*

* settings.subwooferLevelUp / settings.subwooferTwoLevelUp

   *Erhöhen Sie den Subwoofer-Pegel durch Drücken der Taste.*

* settings.containmentAmountDown

   *Verringern Sie den Audyssey LFC-Betrag. Die Schaltfläche wird nur erstellt, wenn sie von Ihrem AVR unterstützt wird.*

* settings.containmentAmountUp

   *Erhöhen Sie die Audyssey LFC-Menge. Die Schaltfläche wird nur erstellt, wenn sie von Ihrem AVR unterstützt wird.*

* settings.cursorUp / settings.cursorDown / settings.cursorLeft / settings.cursorRight

   *Simuliert die Cursortasten Ihrer Fernbedienung*

* settings.enter

   *Simuliert die Eingabetaste Ihrer Fernbedienung*

* settings.return

   *Simuliert die Return / Back-Taste Ihrer Fernbedienung*

* settings.option

   *Simuliert das Optionsfeld Ihrer Fernbedienung*

* settings.info

   *Simuliert die Info-Taste Ihrer Fernbedienung*

### Zustände
Folgende Zustände werden vom Adapter erstellt:

#### Kanal: info
* info.connection

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R |

   *Schreibgeschützter boolescher Indikator. Wenn Ihr Broker mit Ihrem DENON AVR verbunden ist, ist der Status wahr, andernfalls falsch.*

* info.friendlyName

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

   *Nur-Lese-Zeichenfolge. Enthält den Anzeigenamen des angeschlossenen AVR.*

* info.onlinePresets

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

*Zeichenfolge im JSON-Array-Format, die die aktuell gespeicherten Favoriten anhand ihrer ID und ihres Kanals darstellt.
Die Namen der einzelnen Kanäle sind auf 20 Stellen begrenzt. Sie können den aktuellen Kanal in einer ID speichern, indem Sie settings.savePreset festlegen, und einen laden, indem Sie settings.loadPreset auf die zugehörige ID setzen.*

#### Kanal: zoneMain / zone2 / zone3
* zoneMain.volume / zone2.volume / zone3.volume

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

*Zahlenwert, der die aktuelle Lautstärke der Hauptzone / Zone2 / Zone 3 Ihres AVR darstellt. Hier können Sie auch die Lautstärke einstellen.
Die Lautstärke wird auch in getrennten Zuständen in dB dargestellt, z. G. mainVolumeDB*

   *Der Bereich reicht von 0 bis 98 (möglicherweise aufgrund des maximalen Volumens niedriger), wobei 80 = 0 dB*

   *Beispiel:*

```javascript
setState('denon.0.zoneMain.volume', 45.5); // Sets volume of Main Zone to 45.5
```

* zoneMain.maximumVolume

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R |

   *Schreibgeschützte Zahl, die die maximal mögliche Lautstärke darstellt, wobei 80 = 0 dB. Die Lautstärke wird im Status "MaximumVolumeDB" ebenfalls in dB eingestellt.*

* zoneMain.muteIndicator / zone2.muteIndicator / zone3.muteIndicator

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   *Boolescher Wert, der wahr ist, wenn die Hauptzone / Zone2 / Zone3 stummgeschaltet ist, andernfalls falsch. Sie können Ihren AVR mit diesem Status stummschalten.*

   *Beispiel:*

```javascript
setState('denon.0.zoneMain.muteIndicator', true); // Mutes the Main Zone of your AVR
```

* zoneMain.powerZone / zone2.powerZone / zone3.powerZone

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   *Boolescher Wert, der wahr ist, wenn die Zone aktiviert ist, andernfalls falsch. In diesem Zustand können Sie Ihren AVR / Ihre Zone ein- und ausschalten.*

* zoneMain.selectInput / zone2.selectInput / zone3.selectInput

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *Der Zeichenfolgenwert enthält die aktuelle Eingabequelle. Sie können die Eingabequelle auch mit der folgenden Codierung einstellen:*

   *0: PHONO*

   *1: CD*

   *2: TUNER*

   *3: DVD*

   *4: BD*

   *5: TV*

   *6: SAT / CBL*

   *7: MPLAY*

   *8: SPIEL*

   *9: NET*

   *10: SPOTIFIZIEREN*

   *11: LASTFM*

   *12: IRADIO*

   *13: SERVER*

   *14: FAVORITEN*

   *15: AUX1*

   *16: AUX2*

   *17: AUX3*

   *18: AUX4*

   *19: AUX5*

   *20: AUX6*

   *21: AUX7*

   *22: BT*

   *23: USB*

*Bitte beachten Sie, dass nicht jede Eingangsquelle bei jedem AVR-Modell verfügbar ist. Wenn Ihr AVR über zusätzliche Eingänge verfügt, werden diese an die Liste angehängt, sobald sie erkannt wurden.*

   *Beispiel:*

```javascript
 setState('denon.0.zoneMain.selectInput', '5'); // Selects TV as input for Main Zone
```

* zoneMain.quickSelect / zone2.quickSelect / zone3.quickSelect

   | Datentyp | Berechtigung |
   |:---:|:---:|
   | Nummer | R / W |

   *Emuliert die Schnellwahltasten Ihrer Fernbedienung mit Zahlen von 1 bis 5 für Hauptzone / Zone2 / Zone3.*

* zoneMain.sleepTimer / zone2.sleepTimer / zone3.sleepTimer

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

   *Zahlenwert zum Lesen und Einstellen des Sleep-Timers für die ausgewählte Zone. Der Wert wird in weniger als 10 Sekunden aktualisiert.*

* zoneMain.iconURL

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

   *Enthält einen Link, über den Sie das Cover des aktuell gespielten Kanals / Songs finden.*

   *NICHT FÜR HEOS AVR'S UNTERSTÜTZT*

* zoneMain.equalizerBass / zone2.equalizerBass / zone3.equalizerBass

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

   *Zahlenwert, der den Basspegel der Zone darstellt. Der Wertebereich liegt zwischen -6 und +6 dB.*

  *Die Einstellungen für Bässe und Höhen können angepasst werden, wenn Dyn EQ auf OFF und Tone Control auf* gestellt ist.

* zoneMain.equalizerTreble / zone2.equalizerTreble / zone3.equalizerTreble

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

   *Zahlenwert, der die Höhen der Zone darstellt. Der Wertebereich liegt zwischen -6 und +6 dB.*

  *Die Einstellungen für Bässe und Höhen können angepasst werden, wenn Dyn EQ auf OFF und Tone Control auf* gestellt ist.

* zoneMain.channelVolumeFrontLeft / zone2.channelVolumeFrontLeft / zone3.channelVolumeFrontLeft / ...

   | Datentyp | Berechtigung |
   |:---:|:---:|
   | Nummer | R / W |

*Zahlenwert, der die aktuelle Kanallautstärke für jeden Lautsprecher darstellt. Jeder Sprecher hat einen eigenen Status. Die Einstellungen wirken sich auf den aktuellen Eingabemodus auswählen aus. Der Zustand kann von -12 dB bis +12 dB eingestellt werden.*

#### Kanal: Anzeige
* display.displayContent

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R |

   *Schreibgeschützte Zeichenfolge, die den Inhalt Ihrer AVR-Anzeige enthält. Es hat neun Zustände 0 - 9.*

   *ANZEIGEINHALTE WERDEN FÜR HEOS AVRs NICHT UNTERSTÜTZT*

* Bildschirmhelligkeit

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *Zeichenfolgenwert, der die Anzeigehelligkeit darstellt. Der Wert kann die Anzeigehelligkeit auch durch die folgende Codierung einstellen:*

   *0: Aus -> schaltet die Anzeige aus*

   *1: Dunkel -> wird dunkel*

   *2: Abgedunkelt -> dreht die Anzeige abgedunkelt*

   *3: Hell -> schaltet das Display hell*

   *Beispiel:*

```javascript
setState('denon.0.display.brightness', '3'); // Sets display brightness to "Bright"
```

#### Kanal: Einstellungen
* settings.powerSystem

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   *Boolescher Wert, der wahr ist, wenn der AVR eingeschaltet ist, andernfalls falsch. In diesem Zustand können Sie Ihren AVR auch ein- und ausschalten.*

* settings.surroundMode

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *Der Zeichenfolgenwert enthält den aktuellen Surround-Modus. Sie können die Quelle auch mit der folgenden Codierung ändern:*

   *0: STEREO*

   *1: VIRTUELL*

   *2: VIDEOSPIEL*

   *3: MCH STEREO*

   *4: DTS-UMGEBUNG*

   *5: DOLBY DIGITAL*

   *6: FILM*

   *7: MUSIK*

   *8: DIREKT*

   *9: PURE DIRECT*

   *10: AUTO*

   *11: SPIEL*

   *12: AURO3D*

   *13: AURO2DSURR*

   *14: BREITBILDSCHIRM*

   *15: SUPER STADIUM*

   *16: ROCK ARENA*

   *17: JAZZ CLUB*

   *18: KLASSISCHES KONZERT*

   *19: MONO-FILM*

   *20: MATRIX*

   *Bitte beachten Sie, dass nicht jeder Surround-Modus für jedes AVR-Modell verfügbar ist.*

   *Beispiel:*

```javascript
setState('denon.0.settings.surroundMode', '3'); // Sets Multi Channel Stereo as surround mode
```

* settings.lfeAmount

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

*Menge des zusätzlich an die Lautsprecher gerichteten Subwoofersignals in dB.
Der Bereich reicht von 0 dB bis -10 dB. Wobei 10 = -10 dB.*

* settings.expertCommand

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *Mit diesem Status können Sie Ihre eigenen benutzerdefinierten Befehle senden. Eine Übersicht über die vorhandenen Befehle finden Sie in den [AVR-Control-Protocol.pdf](docs/AVR-Control-Protocol.pdf)*

   *Beispiel:*

```javascript
setState('denon.0.settings.expertCommand', 'ECOON'); // Turns Main Zone ECO mode on
```

* settings.expertReadingPattern

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

*Wenn Sie bestimmte Antworten in `settings.expertReadingResult` speichern möchten, müssen Sie einen RegEx auf diesen Status setzen.
RegEx muss festgelegt werden, damit ein RegEx-Konstruktor es verwenden kann. Es wird empfohlen, einen [RegEx-Tester](https://regexr.com/) zu verwenden.
Setzen Sie `/` nicht am Anfang oder Ende des RegEx.*

    *Beispiel:*

```javascript
setState('denon.0.settings.expertReadingPattern', '(MV.+)|(SSINFAISFSV.+)');

ttings.expertReadingResult

|Data type|Permission|
|:---:|:---:|
|string|R|

*Incoming data, which matches the RegEx of `settings.expertReadingPattern` will be set to this state.*

ttings.outputMonitor

|Data type|Permission|
|:---:|:---:|
|string|R/W|

Select the output monitor of your AVR. This state will only be created if your AVR supports two HDMI outputs. You can switch the state between:*

0: AUTO --> Auto detection of monitor*

1: 1 --> Outputs signal to monitor 1*

2: 2 --> Outputs signal to monitor 2*

Example:*

``javascript
etState('denon.0.settings.outputMonitor', '2'); // Sets monitor 2 as active monitor
``

* settings.videoProcessingMode

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *Wählen Sie den Videoverarbeitungsmodus Ihres AVR. Dieser Status wird nur erstellt, wenn Ihr AVR ihn unterstützt. Sie können den Status wechseln zwischen:*

   *0: AUTO*

   *1: SPIEL*

   *2: FILM*

   *Beispiel:*

```javascript
setState('denon.0.settings.videoProcessingMode', '2'); // Sets Video Processing Mode to "MOVIE"
```

* settings.centerSpread

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   *Boolescher Wert, der wahr ist, wenn die Mittelstreuung abgeschnitten ist, andernfalls falsch. Mit diesem Status können Sie auch die Mittelverteilung ein- und ausschalten.*

* settings.dynamicEq

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   *Boolescher Wert, der den Status des dynamischen EQ darstellt. Mit diesem Status können Sie auch den dynamischen EQ ein- und ausschalten.*

* settings.subwooferLevelState

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   *Boolescher Wert, wenn es wahr ist, können Sie Änderungen auf der Subwoofer-Ebene vornehmen.*

* settings.subwooferLevel / settings.subwooferTwoLevel

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

*Zahlenwert, der den aktuellen Subwoofer-Pegel angibt. Der Wert liegt zwischen -12 und 12 (-12 dB bis +12 dB).
Der SubwooferTwoLevel-Status wird nur erstellt, wenn er von Ihrem AVR unterstützt wird.*

* settings.audysseyLfc

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

*Boolescher Wert, der den Audyssey Low Frequency Containment-Status enthält und steuern kann (Ein / Aus).
Der Status wird nur erstellt, wenn er von Ihrem AVR unterstützt wird.*

* settings.containmentAmount

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

*Zahlenwert zum Einstellen des Niederfrequenz-Containment-Betrags. Der Wert kann zwischen 1 und 7 liegen. Der Status wird nur erstellt, wenn er von Ihrem AVR unterstützt wird.*

* settings.multEq

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *String-Wert, um die MultEQ-Funktion Ihres AVR mit der folgenden Codierung festzulegen:*

   *0: AUS*

   *1: AUDYSSEY*

   *2: BYP.LR*

   *3: WOHNUNG*

   *4: HANDBUCH*

* settings.dynamicVolume

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *String-Wert zum Auswählen des dynamischen Volumes durch folgende Codierung:*

   *0: AUS -> schaltet die dynamische Lautstärke aus*

   *1: LIT -> schaltet die dynamische Lautstärke auf*

   *2: MED -> dreht die dynamische Lautstärke auf mittel*

   *3: HEV -> macht Dynamic Volume zu schwer*

* settings.referenceLevelOffset

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *Zeichenfolgenwert zum Auswählen des Referenzpegelversatzes durch die folgende Codierung:*

   *0: 0 dB*

   *5: 5 dB*

   *10: 10 dB*

   *15: 15 dB*

   *Beispiel:*

```javascript
setState('denon.0.settings.referenceLevelOffset', '5'); // Sets Reference Level Offset to 5 dB
```

* settings.pictureMode

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

   *Zeichenfolgenwert zum Festlegen der direkten Änderung im Bildmodus. Dieser Status wird nur erstellt, wenn Ihr AVR ihn unterstützt*

   *Sie können die folgenden Werte als Zeichenfolge festlegen:*

   *'Aus'*

   *'Standard'*

   *'Film'*

   *'Lebhaft'*

   *'Strom'*

   *'Benutzerdefiniert'*

   *'ISF Day'*

   *'ISF Night'*

   *Beispiel:*

```javascript
setState('denon.0.settings.pictureMode', 'Standard'); // Set Picture Mode Direct Change to Standard
```

* settings.toneControl

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   *Boolescher Wert, der den Status der Tonsteuerung angibt. Sie können es mit diesem Status ein- und ausschalten.*

   *Die Tonsteuerung kann nur eingeschaltet werden, wenn Dyn EQ auf OFF gestellt ist.*

* settings.setupMenu

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

   *Boolesche Anzeige, die anzeigt, ob das Setup-Menü gerade geöffnet oder geschlossen ist. Sie können es mit diesem Status öffnen und schließen.*

* settings.savePreset

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

*Zahlenwert, der auf den Wert info.onlinePresets gesetzt werden kann. Dann wird der aktuelle Kanal als Voreinstellung auf die angegebene Nummer gespeichert.
Es können nur Zahlen verwendet werden, die in info.onlinePresets enthalten sind. Der Staat erhält keine Bestätigung, unabhängig davon, ob der Befehl erfolgreich war oder nicht. Sie können info.onlinePresets überprüfen, um zu überprüfen, ob der Befehl wie vorgesehen funktioniert hat.*

* settings.loadPreset

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

*Zahlenwert, der auf den Wert info.onlinePresets gesetzt werden kann. Dadurch wird der zugehörige Kanal geladen.
Dieser Status wird nicht bestätigt, unabhängig davon, ob der Befehl erfolgreich war oder nicht.*

### Andere Staaten
Aufgrund der Tatsache, dass einige AVRs wie der DENON POA-3012CI eine andere Logik verwenden, gibt es einige Unterschiede in den Zuständen.
Die Zustände, die den oben aufgeführten entsprechen, sind: settings.powerSystem, settings.expertCommand, display.brightness und info.connection. Zusätzlich werden für jede Zone 2-12 (gerade) die folgenden Zustände erstellt:

* zoneX.speakerOneVolume / zoneX.speakerTwoVolume

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | Nummer | R / W |

*Zahlenwert, der die Lautstärke des Lautsprechers des AVR darstellt. Wenn operationMode auf 'BRIDGED' eingestellt ist, können die Lautsprecher nicht unabhängig voneinander gesteuert werden, und die Steuerung des einen regelt auch die Lautstärke des anderen.*

* zoneX.selectInputOne / zoneX.selectInputTwo

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

*Tastenwertpaar, das den ausgewählten Eingang des AVR-Lautsprechers darstellt. Wenn operationMode auf 'BRIDGED' eingestellt ist, können die Lautsprecher nicht unabhängig voneinander gesteuert werden, und die Steuerung des einen steuert auch den Eingang der anderen.*

    *Folgende Werte sind möglich:*

    *'0': 'BUS L'*

    *'1': 'BUS R'*

    *'2': 'BUS M'*

    *'3': 'AUX'*

* zoneX.operationMode

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

*Schlüsselwertpaar, das den Operationsmodus des AVR darstellt. Wenn operationMode auf 'BRIDGED' eingestellt ist, können die Lautsprecher nicht unabhängig voneinander gesteuert werden, und die Steuerung von Lautsprecher 1 steuert auch Lautsprecher 2.*

    *Folgende Werte sind möglich:*

    *'0': 'NORMAL'*

    *'1': 'BRIDGED'*

* zoneX.lowCutFilterSpeakerOne / zoneX.lowCutFilterSpeakerTwo

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

*Boolescher Wert, der angibt, ob der Low-Cut-Filter für den Lautsprecher aktiviert oder deaktiviert ist. Im Bridged-Modus hängen beide Lautsprecher voneinander ab.*

* zoneX.zoneTurnOnModeChange

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | string | R / W |

*Schlüsselwertpaar, das die Änderung des Zoneneinschaltmodus der Zone darstellt. Sie können Ihren AVR auch mit diesem Status steuern.*

    *Folgende Werte sind möglich:*

    *'0': 'Konstante'*

    *'1': 'Trigger in'*

    *'2': 'Audiosignal'*

    *'3': 'Aus'*

* zoneX.triggerInput

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

    *Schalten Sie den Triggereingang mit diesem booleschen Wert ein oder aus.*

* zoneX.audioSignalInput

    | Datentyp | Berechtigung |
    |:---:|:---:|
    | boolean | R / W |

    *Boolescher Wert, der den Audiosignaleingang Ihres AVR anzeigt und steuert.*

## Fehlende Funktionen & Fehler
Wenn Ihnen Funktionen fehlen oder ein Fehler festgestellt wurde, öffnen Sie bitte einen [Problem](https://github.com/foxriver76/ioBroker.denon/issues).

Der Adapter wird mit einem DENON AVR-X1200W und einem Marantz SR5009 getestet.

## Changelog
### 1.10.0 (2021-01-17)
* (foxriver76) auto-detect selectInput of all zones

### 1.9.4 (2021-01-03)
* (foxriver76) added missing rear height speaker states
* (foxriver76) revert the last added options because they are not working as intended
* (foxriver76) no longer remove digits and spaces from surroundMode response

### 1.9.2 (2021-01-03)
* (foxriver76) added some missing options for surroundMode

### 1.9.1 (2020-12-03)
* (foxriver76) prevent writing in destroyed socket on adapter unload
* (foxriver76) add subwoofer states for main zone
* (foxriver76) internal optimizations

### 1.8.1 (2020-11-29)
* (foxriver76) added states for atmos speakers `channelVolumeSurroundDolbyRight/Left` and `channelVolumeFrontDolbyLeft/Right`
* (foxriver76) fixed bug with setting channelVolume of other zones than main
* (foxriver76) added states `channelVolumeFrontHeightRight/Left` and `channelVolumeSurroundHeightLeft/Right`

### 1.7.7 (2020-04-28)
* (foxriver76) fixed timing issue which could lead to state creation procedure triggered more than once

### 1.7.5 (2020-04-21)
* (foxriver76) better error handling

### 1.7.4 (2020-04-01)
* (foxriver76) fix potential timeout issues

### 1.7.2 (2020-01-08)
* (foxriver76) another fix for DENON Picool to keep connection alive when turned off

### 1.7.1 (2019-11-19)
* (foxriver76) added ability to read desired data by expertReading states

### 1.6.1 (2019-10-08)
* (foxriver76) fixed bug with selectInput for zone2 and 3

### 1.6.0
* (foxriver76) added new state settings.lfeAmount

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

Copyright (c) 2018-2020 Moritz Heusinger <moritz.heusinger@gmail.com>

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