---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: fJWbc2AUfUlvEbHQ8lUvLCgs5r8wt6RytzZfd4WRDjQ=
---
![Logo](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

![Anzahl der Installationen](http://iobroker.live/badges/roomba-installed.svg)
![stabile Version](http://iobroker.live/badges/roomba-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.roomba.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.roomba.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Zefau/ioBroker.roomba.svg)
![NPM](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

# IoBroker.roomba Verbinden Sie Ihren iRobot Roomba mit ioBroker.
Basierend auf der dorita980-Bibliothek https://github.com/koalazak/dorita980#readme

**Inhaltsverzeichnis**

1. [Funktionen] (# Funktionen)
2. [Installation] (# installation)
3. [Setup Instructions] (# Setup-Anweisungen)
4. [Unterstützte Roomba / Firmware-Versionen] (# supported-roombas - firmware-versions)
5. [Channels & States] (# channels - states)
6. [Beschreibung der Einstellungen (unvollständig)] (# Beschreibung der Einstellungen (unvollständig))
7. [Smart Home / Alexa-Integration mit ioBroker.javascript] (# smart-home - alexa-integration-using-iobrokerjavascript)
8. [Changelog] (# changelog)
9. [Credits] (# Credits)
10. [Lizenz] (# Lizenz)

## Eigenschaften
Die folgenden Funktionen werden mit diesem Adapter geliefert:

- __Senden Sie Befehle__ (Starten, Stoppen, Fortsetzen, Anhalten, Andocken) an Ihren Roomba
- __Gerätestatus__ abrufen, z. B. Akku, angedockt, voll / eingelegtes Fach (vollständige Liste siehe [Kanäle & Status] (# Kanäle - Status))
- __Gerätekonfiguration__ abrufen, z. B. Einstellungen für Einstellungen, Netzwerk oder Zeitplan (eine vollständige Liste finden Sie unter [Channels & States] (# channels - states))
- Abrufen von __Gerätestatistiken__, z. B. Gesamtmissionen, Stunden an der Dockingstation usw. (vollständige Liste siehe [Kanäle & Status] (# Kanäle - Status))
- Abrufen von Informationen zu __aktueller Mission__ (wenn Ihr Roomba bereinigt), z. B. Start- und Endzeit, Gesamtlaufzeit, bereinigte Fläche usw. (nur bei unterstützten Roomba-Versionen siehe [Unterstützte Roomba- / Firmware-Versionen] (# supported-roombas --firmware-versionen))
- __Karte basierend auf den erhaltenen Missionsdaten zeichnen__ (nur auf unterstützten Roomba \ 's)
- __Web Interface__, das den Status und die Karte der aktuellen sowie der vorherigen / archivierten Missionen anzeigt:

![Roomba-Schnittstelle](../../../en/adapterref/iobroker.roomba/img/roomba.interface.png)

## Installation
ioBroker.roomba benötigt [Segeltuch](https://www.npmjs.com/package/canvas), um Karten der Roomba-Missionen zu zeichnen. ioBroker versucht, diese Abhängigkeit mit der Installation von ioBroker.roomba zu installieren.

Wahrscheinlich müssen Sie die Paketabhängigkeiten von canvas mit dem folgenden Befehl installieren:

```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Wenn Sie eine Fehlermeldung erhalten, dass Canvas nicht installiert ist, versuchen Sie, es manuell im Ordner ioBroker.roomba (über SSH) zu installieren, indem Sie Folgendes ausführen:

```
sudo npm install canvas --unsafe-perm=true
```

## Setup Anweisungen
### Automatisiertes Setup
So richten Sie ioBroker.roomba automatisch ein: Befolgen Sie die Anweisungen im Admin-Bereich von ioBroker.roomba.

** ACHTUNG **: Die Authentifizierungsdaten stimmen nicht mit denen überein, die Sie in der Smartphone-App verwenden!

1. Stellen Sie sicher, dass der Adapter ioBroker.roomba gestartet ist.
2. Vergewissern Sie sich, dass sich Ihr Roboter in der Home Base befindet und eingeschaltet ist (grüne Lichter leuchten).
3. Halten Sie dann die HOME-Taste an Ihrem Roboter gedrückt, bis eine Reihe von Tönen abgespielt wird (ca. 2 Sekunden).
4. Lassen Sie die Taste los und Ihr Roboter wird WIFI-Licht blinken.
5. Kommen Sie dann hierher zurück und drücken Sie die Taste, um die IP-Adresse und die Anmeldeinformationen abzurufen.

Wenn der automatisierte Vorgang fehlschlägt, um Ihre Anmeldeinformationen abzurufen, verwenden Sie bitte die manuelle Einrichtung.

### Manuelle Einrichtung
Informationen zur manuellen Einrichtung finden Sie unter https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password.

## Unterstützte Roomba / Firmware-Versionen
### Unterstützte Firmware-Versionen
| Software-Version | Firmware Info | Unterstützt |
| ---------------- | ------------- | --------- |
| v1.4 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) ** unterstützt (! [# c5f015](https://placehold.it/15/c5f015/000000?text=+) inkl. Gesetzl. Karte) ** |
| v3.2.xx | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) KEINE Karte) |
| v3.2.xx | [Versionshinweise] (https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15] (https://placehold.it/15/f03c15/000000? text = +) KEINE Karte) |

### Unterstützte Roombas
| Serie | Modelle _ (unvollständig) _ | Software-Version | Firmware Info | Unterstützt |
| ----- | --------------------- | ---------------- | ------------- | --------- |
| Roomba® 6xx | 605, 606, 612, 616, 671, 676, 680, 696 | v3.2.40 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (höchstwahrscheinlich) |
| Roomba® 7xx | 774, 785, | - | | ![# f03c15](https://placehold.it/15/f03c15/000000?text=+) _Model bietet keine WLAN-Verbindung, daher keine Unterstützung_ |
| Roomba® 8xx | 880, 886, 891, 896 | - | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (höchstwahrscheinlich) |
| Roomba® 8xx | [895] (((https://forum.iobroker.net/post/245274)) | v3.2.10 / 40/69 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) KEINE Karte) |
| Roomba® 9xx | 965, 981 | - | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | (höchstwahrscheinlich) |
| Roomba® 9xx | [960] (https://forum.iobroker.net/user/jb_sullivan), [966] (https://forum.iobroker.net/user/thomaslpz), 980 | v2.4.6-3 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **unterstützt (inkl. Karte)** |
| Roomba® i | [i7 (7150)] (https://forum.iobroker.net/post/240589), i7 + (7550) | v1.4 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **unterstützt (inkl. Karte)** |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) KEINE Karte) |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Versionshinweise] (https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15] (https://placehold.it/15/f03c15/000000? text = +) KEINE Karte) |

Bitte helfen Sie mir bezüglich der unterstützten Geräte und lassen Sie mich [weiß über ein Problem](https://github.com/Zefau/ioBroker.roomba/issues), ob Ihr Roomba-Modell unterstützt wird!

## Channels & States
Nach erfolgreicher Einrichtung werden die folgenden Kanäle und Zustände erstellt:

| Kanal | Ordner | Staat | Beschreibung |
| ------- | ------ | ----- | ----------- |
| reinigung | - | - | Befehle und Informationen zum Reinigungsprozess |
| reinigung | letzte | - | Letzte an den Roboter gesendete Befehle |
| reinigung | letzte | befehl | Letzter Befehl an Roboter gesendet |
| reinigung | letzte | Zeitstempel | Timestamp letzter Befehl wurde gesendet |
| reinigung | letzte | datetime | DateTime letzter Befehl wurde gesendet |
| reinigung | letzte | Initiator | Initiator des letzten Befehls |
| reinigung | letzte | zyklus | Zyklus |
| reinigung | letzte | Phase | Phase |
| reinigung | letzte | Fehler | Zeigt einen Fehler während der letzten Mission an |
| reinigung | Zeitplan - | Fahrplanauskunft |
| reinigung | Zeitplan zyklus | Programmzyklus (Sonntag bis Samstag) |
| reinigung | Zeitplan Stunden | Stunde zum Starten des Zyklus (Sonntag bis Samstag) |
| reinigung | Zeitplan Minuten | Minute zum Starten des Zyklus (Sonntag bis Samstag) |
| reinigung | - | Dock | Schicken Sie den Roboter zur Dockingstation |
| reinigung | - | Pause | Unterbrechen Sie den aktuellen Reinigungsvorgang |
| reinigung | - | wieder aufnehmen | Setzen Sie den aktuellen Reinigungsprozess fort |
| reinigung | - | start | Reinigungsvorgang starten |
| reinigung | - | aufhören | Beenden Sie den aktuellen Reinigungsprozess |
| Gerät | - | - | Geräteinformationen |
| Gerät | Netzwerk | - | Netzwerkinformationen |
| Gerät | Netzwerk | dhcp | Geben Sie an, ob DHCP aktiviert ist |
| Gerät | Netzwerk | Router | Mac-Adresse des Routers |
| Gerät | Netzwerk | ip | IP-Adresse |
| Gerät | Netzwerk | Subnetz | Subnetzadresse |
| Gerät | Netzwerk | Einfahrt | Gateway-Adresse |
| Gerät | Netzwerk | dns1 | Primäre DNS-Adresse |
| Gerät | Netzwerk | dns2 | Sekundäre DNS-Adresse |
| Gerät | Vorlieben | - | Voreinstellungen festlegen |
| Gerät | Vorlieben | binPause | **UNBEKANNT** |
| Gerät | Vorlieben | carpetBoostAuto | Automatisch: Roomba erhöht die Saugkraft automatisch, um Teppiche gründlich zu reinigen. |
| Gerät | Vorlieben | carpetBoostHigh | Leistungsmodus: Roomba erhöht das Vakuum immer, um die Reinigungsleistung auf allen Bodenflächen zu maximieren. |
| Gerät | Vorlieben | ecoCharge | **UNBEKANNT** |
| Gerät | Vorlieben | noAutoPasses | One Pass: Roomba wird alle Bereiche mit einem einzigen Reinigungspass abdecken. |
| Gerät | Vorlieben | noPP | **UNBEKANNT** |
| Gerät | Vorlieben | openOnly | **UNBEKANNT** |
| Gerät | Vorlieben | schedHold | **UNBEKANNT** |
| Gerät | Vorlieben | twoPass | Roomba wird ein zweites Mal alle Bereiche abdecken. Dies kann in Häusern mit Haustieren oder für gelegentliche Tiefenreinigung hilfreich sein. |
| Gerät | Versionen | - | Versionsinformationen |
| Gerät | Versionen | hardwareRev | Hardware Revision |
| Gerät | Versionen | batterietyp | Batterietyp |
| Gerät | Versionen | soundVer | **UNBEKANNT** |
| Gerät | Versionen | uiSwVer | **UNBEKANNT** |
| Gerät | Versionen | navSwVer | **UNBEKANNT** |
| Gerät | Versionen | wifiSwVer | **UNBEKANNT** |
| Gerät | Versionen | mobilityVer | **UNBEKANNT** |
| Gerät | Versionen | bootloaderVer | Bootloader-Version |
| Gerät | Versionen | umiVer | **UNBEKANNT** |
| Gerät | Versionen | softwareVer | Softwareversion |
| Gerät | - | \ _rawData | Rohe Präferenzdaten als json |
| Gerät | - | mac | Mac-Adresse des Roboters |
| Gerät | - | name | Name des Roboters |
| Gerät | - | Typ | Typ des Roboters |
| Staaten | - | - | Statusinformationen |
| Staaten | - | \ _connected | Verbindungsstatus |
| Staaten | - | Batterie | Batteriestand des Roboters |
| Staaten | - | binFull | Geben Sie an, ob der Behälterstatus voll ist |
| Staaten | - | binInserted | Geben Sie an, ob bin eingefügt ist |
| Staaten | - | angedockt | Geben Sie an, ob der Roboter angedockt ist |
| Staaten | - | signal | Signalstärke |
| Staaten | - | status | Aktueller Status des Roboters |
| Statistiken | - | - | Statistische Informationen |
| Statistiken | Missionen - | Missionsstatistik |
| Statistiken | Missionen fehlgeschlagen Anzahl fehlgeschlagener Reinigungsjobs |
| Statistiken | Missionen erfolgreich sein Anzahl erfolgreicher Reinigungsjobs |
| Statistiken | Missionen gesamt | Anzahl der Reinigungsarbeiten |
| Statistiken | Zeit | - | Zeitstatistik |
| Statistiken | Zeit | avgMin | **UNBEKANNT** |
| Statistiken | Zeit | hOnDock | **UNBEKANNT** |
| Statistiken | Zeit | nVerfügbar | **UNBEKANNT** |
| Statistiken | Zeit | estCap | **UNBEKANNT** |
| Statistiken | Zeit | nLithChrg | **UNBEKANNT** |
| Statistiken | Zeit | nNimhChrg | **UNBEKANNT** |
| Statistiken | Zeit | nDocks | **UNBEKANNT** |
| - | - | refreshDateTime | DatumZeit der letzten Aktualisierung |
| - | - | refreshTimestamp | Zeitstempel der letzten Aktualisierung |

## Beschreibung der Einstellungen _ (unvollständig) _
Die folgenden Nutzdaten werden beim Aufrufen von ```getPreferences()``` empfangen (siehe https://github.com/koalazak/dorita980#getpreferences):

| Objekt | Index | Typ | Beschreibung | ioBroker-Status |
| ------ | ----- | ---- | ----------- | -------------- |
| netinfo | - | Objekt | Netzwerkinformationen der Roomba-Verbindung | - |
| netinfo | .dhcp | Boolescher Wert | Geben Sie an, ob DHCP aktiviert ist device.network.dhcp |
| netinfo | .addr | ip | IP-Adresse | device.network.ip |
| netinfo | .mask | ip | Subnetzadresse | device.network.subnet |
| netinfo | .gw | ip | Gateway-Adresse | device.network.gateway |
| netinfo | .dns1 | ip | Primäre DNS-Adresse | device.network.dns1 |
| netinfo | .dns2 | ip | Sekundäre DNS-Adresse | device.network.dns2 |
| netinfo | .bssid | mac | Mac-Adresse des Routers | device.network.router |
| netinfo | .sec | ganze Zahl | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | - | Objekt | Unbekannt | - |
| wifistat | .wifi | ganze Zahl | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | .uap | Boolescher Wert | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | .cloud | ganze Zahl | Unbekannt | _ (nicht zugeordnet) _ |
| wlcfg | - | Objekt | Unbekannt | - |
| wlcfg | .sec | ganze Zahl | Unbekannt | _ (nicht zugeordnet) _ |
| wlcfg | .ssid | Zeichenfolge | Unbekannt | _ (nicht zugeordnet) _ |
| mac | - | mac | Mac-Adresse von Roomba | - |
| Land | - | Zeichenfolge | Unbekannt | - |
| cloudEnv | - | Zeichenfolge | Unbekannt | - |
| svcEndpoints | .svcDeplId | Zeichenfolge | Unbekannt | - |
| mapUploadAllowed | - | Boolescher Wert | Unbekannt | - |
| localtimeoffset | - | ganze Zahl | Unbekannt | - |
| ... | - | ... | ... | - |

Bitte helfen Sie mir bei der Beschreibung der Einstellungen. Wenn Sie die Bedeutung der in der Tabelle als unbekannt angegebenen Präferenzen kennen, lassen Sie mich [kennen ihre Bedeutung über ein Problem](https://github.com/Zefau/ioBroker.roomba/issues)!

## Smart Home / Alexa-Integration mit ioBroker.javascript
### Karte nach Beendigung der Mission per Telegramm senden
Dazu muss der ioBroker-Adapter ioBroker.telegram installiert sein (https://github.com/ioBroker/ioBroker.telegram).

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript und fügen Sie den folgenden Listener hinzu:

```javascript
var _fs = require('fs');

/*
 * MISSION END: Send map
 *
 */
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";
var ns = 'roomba.0';
var imagePath = 'tmp/';

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.state || !obj.state.val) return;

    // replace variables with state values
    var pos, variable, state, value;
    while (message.indexOf('%') > -1)
    {
        pos = message.indexOf('%');
        variable = message.substring(pos, message.indexOf('%', pos+1)+1);
        state = getState(ns + '.' + variable.replace(/%/g, ''));

        if (state !== null && state.val !== null)
            value = state.val
        else
        {
            log('State ' + variable.replace(/%/g, '') + ' not found!', 'warn');
            value =  '';
        }

        if (typeof value === "boolean") value = value === true ? 'with' : 'no';
        message = message.replace(RegExp(variable, 'gi'), value);
    }

    // console
    log(message);

    // get image
    var img = getState(ns + '.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile(imagePath + 'image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: imagePath + 'image.png', message: message});
        });
    }
});
```

_2019-05-04 Fehler behoben, der das Senden der Karte verhinderte_

Sie können die Variable ```message``` für jede Benachrichtigung bearbeiten, die Sie mit der Karte erhalten möchten. Sie können ```%name-of-state%``` verwenden, um den Wert eines Status innerhalb des ioBroker.roomba-Objektbaums abzurufen.

## Credits
### Inoffizielle API
Vielen Dank an [@koalazak] (https://github.com/koalazak) für die [inoffizielle iRobot Roomba 980 node.js-Bibliothek (SDK)](https://github.com/koalazak/dorita980#readme).

### Icons
Icons von <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> von <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com werden</a> von <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> lizenziert </div>

## Changelog

### 1.0.1 (2019-05-15)
- (Zefau) fixed display error in Chrome ([#19](https://github.com/Zefau/ioBroker.roomba/issues/19#issuecomment-492963244))
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#18](https://github.com/Zefau/ioBroker.roomba/pull/18))
- (Zefau) updated dependencies

### 1.0.0 (2019-05-04)
- (zefau) No changes, only bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) Added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Zefau) Refactored retrieval of preferences and added debug mode

### 0.4.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#8](https://github.com/Zefau/ioBroker.roomba/pull/8))

### 0.4.3 (2019-02-10)
- (zefau) Improved compatibility for series 600

### 0.4.2 (2019-02-09)
- (zefau) Bug fixing

### 0.4.1 (2019-02-03)
- (zefau) Support for Compact Mode
- (zefau) Bug fixing

### 0.4.0 (2019-01-08)
- (zefau) Support for e5 and 600 series (due to support by [dorita980](https://github.com/koalazak/dorita980#readme))

### 0.3.x (2019-01-06)
- (zefau) Bug fixed (```Mission saved``` loop)

### 0.3.0 (2019-01-06)
- (zefau) Image / Map of the current cleaning mission will be created
- (zefau) Removed encryption of password

### 0.2.3 (2018-12-03)
- (zefau) Fixed an issue encrypting the password when entered by user (no automated retrieval)

### 0.2.2 (2018-12-02)
- (zefau) Password will now be stored encrypted

Note: If you are coming from an earlier version, you have to (1) empty your settings, (2) save, (3) restart the adapter and (4) enter / fetch credentials again (duo to the fact that password will be stored encrypted now)

### 0.2.1 (2018-11-25)
- (zefau) Fixed / improved automatically retrieving of authentication credentials

### 0.2.0 (2018-11-18)
- (zefau) improved admin interface to automatically retrieve authentication credentials

### 0.1.0 (2018-11-04)
- (zefau) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Zefau <zefau@mailbox.org>

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