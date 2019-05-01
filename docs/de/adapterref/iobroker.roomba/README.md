---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: tcLLym+E6nf8ooit8z1BQLV5IDQVg7GmVeVMaBTZqi0=
---
![Logo](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

![Anzahl der Installationen](http://iobroker.live/badges/roomba-installed.svg)
![stabile Version](http://iobroker.live/badges/roomba-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.roomba.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.roomba.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Zefau/ioBroker.roomba.svg)
![NPM](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

# IoBroker.roomba Verbinden Sie Ihren iRobot Roomba mit dem ioBroker.
Basierend auf der dorita980-Bibliothek https://github.com/koalazak/dorita980#readme

**Inhaltsverzeichnis**

1. [Installation] (# Installation)
2. [Setup Anweisungen] (# Setup-Anweisungen)
3. [Unterstützte Roomba / Firmware-Versionen] (# Unterstützte-Roombas - Firmware-Versionen)
4. [Channels & States] (# Channels - Status)
5. [Beschreibung der Präferenzen (unvollständig)] (# Beschreibung der Präferenzen-unvollständig)
6. [Smart Home / Alexa-Integration mit ioBroker.javascript] (# smart-home - alexa-integration-using-iobrokerjavascript)
7. [Changelog] (# changelog)
8. [Credits] (# credits)
9. [Lizenz] (# Lizenz)

## Installation
ioBroker.roomba benötigt [Segeltuch](https://www.npmjs.com/package/canvas), um Karten der Roomba-Missionen zu zeichnen. ioBroker versucht, diese Abhängigkeit mit der Installation von ioBroker.roomba zu installieren.

Sie müssen jedoch wahrscheinlich Paketabhängigkeiten von Canvas mit dem folgenden Befehl installieren:

```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Wenn Sie eine Fehlermeldung erhalten, dass die Zeichenfläche nicht installiert ist, versuchen Sie, sie manuell im Ordner ioBroker.roomba (über SSH) zu installieren, indem Sie Folgendes ausführen:

```
sudo npm install canvas --unsafe-perm=true
```

## Anweisungen zum Einrichten
### Automatisiertes Setup
So richten Sie ioBroker.roomba automatisch gemäß den Anweisungen im Admin-Bereich von ioBroker.roomba ein.

** ACHTUNG **: Die Authentifizierungsdaten sind nicht dieselben wie in der Smartphone-App!

1. Stellen Sie sicher, dass der ioBroker.roomba-Adapter gestartet ist.
2. Stellen Sie sicher, dass sich Ihr Roboter auf der Home Base befindet und eingeschaltet ist (grüne LED leuchtet).
3. Halten Sie die HOME-Taste an Ihrem Roboter gedrückt, bis eine Reihe von Tönen abgespielt wird (ca. 2 Sekunden).
4. Lassen Sie die Taste los und Ihr Roboter blinkt WIFI-Licht.
5. Dann kommen Sie hierher zurück und drücken Sie die Taste, um die IP-Adresse und die Anmeldeinformationen abzurufen.

Wenn der automatisierte Prozess Ihre Anmeldeinformationen nicht abrufen kann, verwenden Sie bitte die manuelle Einrichtung.

### Manuelle Einrichtung
Für die manuelle Einrichtung siehe https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password.

## Unterstützte Roomba / Firmware-Versionen
### Unterstützte Firmware-Versionen
| Software-Version | Firmware-Info | Unterstützt |
| ---------------- | ------------- | --------- |
| v1.4 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) ** unterstützt (! [# c5f015](https://placehold.it/15/c5f015/000000?text=+) inkl. map) ** |
| v3.2.xx | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) NEIN Karte) |
| v3.2.xx | [Versionshinweise] (https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15] (https://placehold.it/15/f03c15/000000? text = +) NEIN map) |

### Unterstützte Roomba´s
| Serie | Modelle _ (unvollständig) _ | Software-Version | Firmware-Info | Unterstützt |
| ----- | --------------------- | ---------------- | ------------- | --------- |
| Roomba® 6xx | 605, 606, 612, 616, 671, 676, 680, 696 | v3.2.40 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (höchstwahrscheinlich) |
| Roomba® 7xx | 774, 785, - | | ![# f03c15](https://placehold.it/15/f03c15/000000?text=+) _Model bietet keine WLAN-Konnektivität an, daher kein Support_ |
| Roomba® 8xx | 880, 886, 891, 896 | - | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (höchstwahrscheinlich) |
| Roomba® 8xx | [895] ((https://forum.iobroker.net/post/245274)) | v3.2.10 / 40/69 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) NEIN Karte) |
| Roomba® 9xx | 965, 981 | - | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | (höchstwahrscheinlich) |
| Roomba® 9xx | [960] (https://forum.iobroker.net/user/jb_sullivan), [966] (https://forum.iobroker.net/user/thomaslpz), 980 | v2.4.6-3 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | Unterstützt ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **(inkl. Karte)** |
| Roomba® i | [i7 (7150)] (https://forum.iobroker.net/post/240589), i7 + (7550) | v1.4 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | Unterstützt ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **(inkl. Karte)** |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) NEIN Karte) |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Versionshinweise] (https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15] (https://placehold.it/15/f03c15/000000? text = +) NEIN map) |

Bitte helfen Sie mir bei den unterstützten Geräten und lassen Sie mich nach [über ein Problem wissen](https://github.com/Zefau/ioBroker.roomba/issues), ob Ihr Roomba-Modell unterstützt wird!

## Channels & States
Nach erfolgreichem Setup werden die folgenden Kanäle und Status erstellt:

| Kanal | Ordner | Zustand | Beschreibung |
| ------- | ------ | ----- | ----------- |
| Reinigung | - | - | Befehle und Informationen zum Reinigungsprozess |
| Reinigung | letzte | - | Letzte Befehle, die an robot | gesendet wurden |
| Reinigung | letzte | Befehl | Letzter Befehl an Roboter | gesendet |
| Reinigung | letzte | Zeitstempel | Zeitstempel letzter Befehl wurde gesendet |
| Reinigung | letzte | datetime | DateTime letzter Befehl wurde gesendet |
| Reinigung | letzte | Initiator | Initiator des letzten Befehls |
| Reinigung | letzte | Zyklus | Zyklus |
| Reinigung | letzte | Phase | Phase |
| Reinigung | letzte | Fehler | Zeigt einen Fehler während der letzten Mission an |
| Reinigung | Zeitplan | - | Informationen zum Zeitplan |
| Reinigung | Zeitplan | Zyklus | Planungszyklus (Sonntag bis Samstag) |
| Reinigung | Zeitplan | Stunden | Stunde, um den Zyklus zu beginnen (Sonntag bis Samstag) |
| Reinigung | Zeitplan | Minuten | Minute zum Startzyklus (Sonntag bis Samstag) |
| Reinigung | - | Dock | Senden Sie den Roboter an die Dockingstation |
| Reinigung | - | Pause | Unterbrechen Sie den aktuellen Reinigungsvorgang |
| Reinigung | - | fortsetzen | Wiederaufnahme des aktuellen Reinigungsvorgangs |
| Reinigung | - | start | Reinigungsprozess starten |
| Reinigung | - | stop | Stoppen Sie den aktuellen Reinigungsvorgang |
| Gerät | - | - | Geräteinformationen |
| Gerät | Netzwerk | - | Netzwerkinformationen |
| Gerät | Netzwerk | dhcp | Geben Sie an, ob DHCP aktiviert ist |
| Gerät | Netzwerk | Router | Mac-Adresse des Routers |
| Gerät | Netzwerk | ip | IP-Adresse |
| Gerät | Netzwerk | Subnetz | Subnetzadresse |
| Gerät | Netzwerk | Gateway | Gateway-Adresse |
| Gerät | Netzwerk | dns1 | Primäre DNS-Adresse |
| Gerät | Netzwerk | dns2 | Sekundäre DNS-Adresse |
| Gerät | Präferenzen | - | Voreinstellungen festlegen |
| Gerät | Präferenzen | binPause | **UNBEKANNT** |
| Gerät | Präferenzen | carpetBoostAuto | Automatisch: Roomba erhöht automatisch die Vakuumleistung, um Teppiche zu reinigen. |
| Gerät | Präferenzen | carpetBoostHigh | Performance-Modus: Roomba erhöht immer das Vakuum, um die Reinigungsleistung auf allen Bodenflächen zu maximieren. |
| Gerät | Präferenzen | ecoCharge | **UNBEKANNT** |
| Gerät | Präferenzen | noAutoPasses | One Pass: Roomba deckt alle Bereiche mit einem einzigen Reinigungsdurchlauf ab. |
| Gerät | Präferenzen | noPP | **UNBEKANNT** |
| Gerät | Präferenzen | openOnly | **UNBEKANNT** |
| Gerät | Präferenzen | schedHold | **UNBEKANNT** |
| Gerät | Präferenzen | twoPass | Roomba wird alle Bereiche ein zweites Mal abdecken. Dies kann in Häusern mit Haustieren oder bei gelegentlichen Tiefenreinigungen hilfreich sein. |
| Gerät | Versionen | - | Versionsinformation |
| Gerät | Versionen | HardwareRev | Hardware-Revision |
| Gerät | Versionen | batteryType | Batterietyp |
| Gerät | Versionen | soundVer | **UNBEKANNT** |
| Gerät | Versionen | uiSwVer | **UNBEKANNT** |
| Gerät | Versionen | navSwVer | **UNBEKANNT** |
| Gerät | Versionen | wifiSwVer | **UNBEKANNT** |
| Gerät | Versionen | MobilityVer | **UNBEKANNT** |
| Gerät | Versionen | bootloaderVer | Bootloader-Version |
| Gerät | Versionen | umiVer | **UNBEKANNT** |
| Gerät | Versionen | softwareVer | Softwareversion |
| Gerät | - | \ _rawData | RAW-Präferenzdaten wie Json |
| Gerät | - | mac | Mac-Adresse des Roboters |
| Gerät | - | Name | Name des Roboters |
| Gerät | - | Typ | Typ des Roboters |
| Staaten | - | - | Statusinformationen |
| Staaten | - | \ _connected | Verbindungsstatus |
| Staaten | - | Batterie | Batteriestand des Roboters |
| Staaten | - | binFull | Geben Sie an, ob der Behälterstatus voll ist |
| Staaten | - | binInserted | Geben Sie an, ob ein Behälter eingefügt wird |
| Staaten | - | angedockt | Geben Sie an, ob der Roboter angedockt ist |
| Staaten | - | Signal | Signalstärke |
| Staaten | - | Status | Aktueller Status des Roboters |
| Statistik | - | - | Statistische Informationen |
| Statistik | Missionen | - | Missionsstatistik |
| Statistik | Missionen | fehlgeschlagen | Anzahl der fehlgeschlagenen Reinigungsaufträge |
| Statistik | Missionen | Erfolg haben | Anzahl erfolgreicher Reinigungsaufträge |
| Statistik | Missionen | total | Anzahl Reinigungsaufträge |
| Statistik | Zeit | - | Zeitstatistik |
| Statistik | Zeit | avgMin | **UNBEKANNT** |
| Statistik | Zeit | hOnDock | **UNBEKANNT** |
| Statistik | Zeit | nAvail | **UNBEKANNT** |
| Statistik | Zeit | estCap | **UNBEKANNT** |
| Statistik | Zeit | nLithChrg | **UNBEKANNT** |
| Statistik | Zeit | nNimhChrg | **UNBEKANNT** |
| Statistik | Zeit | nDocks | **UNBEKANNT** |
| - | - | refreshDateTime | DateTime der letzten Aktualisierung |
| - | - | RefreshTimestamp | Zeitstempel der letzten Aktualisierung |

## Beschreibung der Einstellungen _ (unvollständig) _
Die folgende Nutzlast wird empfangen, wenn Sie ```getPreferences()``` aufrufen (siehe https://github.com/koalazak/dorita980#getpreferences):

| Objekt | Index | Typ | Beschreibung | ioBroker State |
| ------ | ----- | ---- | ----------- | -------------- |
| netinfo | - | Objekt | Netzwerkinformationen der Roomba-Verbindung | - |
| netinfo | .dhcp | boolean | Geben Sie an, ob DHCP aktiviert ist device.network.dhcp |
| netinfo | .addr | ip | IP-Adresse | device.network.ip |
| netinfo | .mask | ip | Subnetzadresse | device.network.subnet |
| netinfo | .gw | ip | Gateway-Adresse | device.network.gateway |
| netinfo | .dns1 | ip | Primäre DNS-Adresse | device.network.dns1 |
| netinfo | .dns2 | ip | Sekundäre DNS-Adresse | device.network.dns2 |
| netinfo | .bssid | mac | Mac-Adresse des Routers | device.network.router |
| netinfo | .sec | Ganzzahl | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | - | Objekt | Unbekannt | - |
| wifistat | .wifi | Ganzzahl | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | .uap | boolean | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | .wolke | Ganzzahl | Unbekannt | _ (nicht zugeordnet) _ |
| wlcfg | - | Objekt | Unbekannt | - |
| wlcfg | .sec | Ganzzahl | Unbekannt | _ (nicht zugeordnet) _ |
| wlcfg | .ssid | Zeichenfolge | Unbekannt | _ (nicht zugeordnet) _ |
| mac | - | mac | Mac-Adresse von Roomba | - |
| Land | - | Zeichenfolge | Unbekannt | - |
| cloudEnv | - | Zeichenfolge | Unbekannt | - |
| svcEndpoints | .svcDeplId | Zeichenfolge | Unbekannt | - |
| mapUploadAllowed | - | boolean | Unbekannt | - |
| Ortszeitversatz | - | Ganzzahl | Unbekannt | - |
| ... | - | ... | ... | - |

Bitte helfen Sie mir bei der Beschreibung der Präferenzen. Wenn Sie die Bedeutung der Präferenzen kennen, die in der Tabelle als unbekannt angegeben sind, lassen Sie mich [ihre Bedeutung über ein Problem kennen](https://github.com/Zefau/ioBroker.roomba/issues)!

## Smart Home / Alexa-Integration mit ioBroker.javascript
### Karte per Telegramm senden, wenn die Mission abgeschlossen ist
Dazu muss der ioBroker-Adapter ioBroker.telegram installiert sein (https://github.com/ioBroker/ioBroker.telegram).

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript und fügen Sie den folgenden Listener hinzu:

```
var _fs = require('fs');

/*
 * MISSION END: Send map
 *
 */
var ns = 'roomba.0';
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.val) return;

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
    var img = getState('roomba.0.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile('/tmp/image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: '/tmp/image.png', message: message});
        });
    }
});
```

_2019-02-03 Fehler behoben, der die Karte am Anfang einer Mission sendet_

Sie können die Variable ```message``` zu jeder Benachrichtigung bearbeiten, die Sie mit der Karte erhalten möchten. Sie können ```%name-of-state%``` verwenden, um den Wert eines Zustands im Objektbaum von ioBroker.roomba abzurufen.

## Credits
### Inoffizielle API
Danke an [@koalazak] (https://github.com/koalazak) für die Bibliothek [inoffizieller iRobot Roomba 980 node.js (SDK)]](https://github.com/koalazak/dorita980#readme).

### Icons
Die von <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> unter <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">hergestellten</a> <a href="https://www.flaticon.com/" title="Flaticon">Icons</a> sind von <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons VON 3.0" target="_blank">CC 3.0 BY</a> lizenziert </div>

## Changelog

### 1.0.0 (2019-04-xx) [IN DEVELOPMENT]
- bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Refactored retrieval of preferences and added debug mode

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