---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: T9yxjz3EPQTTd3vuWbGLj2VpjMOhUpCZM5Ctt8nyIac=
---
![Logo](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Anzahl der Installationen](http://iobroker.live/badges/roomba-installed.svg)
![Stabile Version](http://iobroker.live/badges/roomba-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.roomba.svg)
![Commits seit der letzten Veröffentlichung](https://img.shields.io/github/commits-since/Zefau/ioBroker.roomba/latest.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.roomba.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![NPM](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

# IoBroker.roomba Verbinden Sie Ihren iRobot Roomba mit ioBroker.
Basierend auf der dorita980-Bibliothek https://github.com/koalazak/dorita980#readme

**Inhaltsverzeichnis**

1. [Funktionen] (# Funktionen)
2. [Installation] (# Installation)
3. [Setup Instructions] (# Setup-Anweisungen)
4. [Unterstützte Roomba / Firmware-Versionen] (# supported-roombas - firmware-versions)
5. [Channels & States] (# channels - states)
6. [Beschreibung der Einstellungen (unvollständig)] (# Beschreibung der Einstellungen (unvollständig))
7. [Smart Home / Alexa-Integration mit ioBroker.javascript] (# smart-home - alexa-Integration mit iobrokerjavascript)
8. [Changelog] (# changelog)
9. [Credits] (# Credits)
10. [Lizenz] (# Lizenz)

## Eigenschaften
Die folgenden Funktionen werden mit diesem Adapter geliefert:

- __Senden Sie Befehle__ (`Start`,` Stopp`, `Fortsetzen`,` Pause`, `Andocken`) an Ihren Roomba
- __Gerätestatus__ abrufen, z. B. Akku, angedockt, voll / eingelegtes Fach (vollständige Liste siehe [Kanäle & Status] (# Kanäle - Status))
- Rufen Sie die Gerätekonfiguration ab, z. B. Einstellungen, Netzwerk- oder Zeitplaneinstellungen (eine vollständige Liste finden Sie unter [Kanäle und Status] (# Kanäle - Status)).
- Rufen Sie __Gerätestatistiken__ ab, z. B. Gesamtmissionen, Stunden an der Dockingstation usw. (eine vollständige Liste finden Sie unter [Kanäle und Status] (# Kanäle - Status)).
- Rufen Sie Informationen zu __current mission__ (wenn Ihr Roomba bereinigt wird) ab, z. B. Start- und Endzeit, Gesamtlaufzeit, gereinigte Quadratmeter usw. (nur bei unterstützten Roombas siehe [Unterstützte Roombas / Firmware-Versionen] (# unterstützte Roombas) --firmware-Versionen))
- __Karte basierend auf den empfangenen Missionsdaten zeichnen__ (nur auf unterstützten Roomba \ 's)
- __Web Interface__, das den Status und die Karte der aktuellen sowie der vorherigen / archivierten Missionen anzeigt:

  ![Roomba-Schnittstelle](../../../en/adapterref/iobroker.roomba/img/roomba.interface.png)

## Installation
ioBroker.roomba benötigt [Segeltuch](https://www.npmjs.com/package/canvas), um Karten der Roomba-Missionen zu zeichnen. ioBroker versucht, diese Abhängigkeit mit der Installation von ioBroker.roomba zu installieren.

Wahrscheinlich müssen Sie die Paketabhängigkeiten von canvas (und canvas selbst) mit dem folgenden Befehl installieren:

### Linux
```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Führen Sie außerdem den folgenden Befehl __im Verzeichnis ioBroker.roomba__ aus (`/opt/iobroker/node_modules/iobroker.roomba`):

```
sudo npm install canvas --unsafe-perm=true
```

### Windows
1. Stellen Sie sicher, dass Sie `node-gyp` über installiert haben

```
npm install -g node-gyp
```

2. Vergewissern Sie sich, dass Sie die wichtigsten Komponenten über installiert haben

```
npm install --global --production windows-build-tools
```

3. Laden Sie GTK 2 (für [Win32] (http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip) oder [Win64] (http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip)) und entpacken Sie es (z. B. nach `C: \ path \ to \ GTK2`)
4. Führen Sie aus

```
node-gyp rebuild --GTK_Root=C:\path\to\GTK2
```

5. Installieren Sie canvas aus dem Ordner iobroker.roomba

```
cd C:\path\to\iobroker\node_modules\iobroker.roomba
npm install canvas
```

Weitere Informationen finden Sie unter https://github.com/Automattic/node-canvas/wiki/Installation:-Windows.

## Setup Anweisungen
### Automatisierte Einrichtung
So richten Sie ioBroker.roomba automatisch ein, indem Sie den Anweisungen im Admin-Bereich von ioBroker.roomba folgen.

** ACHTUNG **: Die Authentifizierungsdaten stimmen nicht mit denen überein, die Sie in der Smartphone-App verwenden!

1. Stellen Sie sicher, dass der Adapter ioBroker.roomba gestartet ist.
2. Stellen Sie sicher, dass sich Ihr Roboter auf der Home Base befindet und eingeschaltet ist (grüne Lichter leuchten).
3. Halten Sie dann die HOME-Taste Ihres Roboters gedrückt, bis eine Reihe von Tönen abgespielt wird (ca. 2 Sekunden).
4. Lassen Sie die Taste los und Ihr Roboter blinkt WIFI-Licht.
5. Kommen Sie dann hierher zurück und drücken Sie die Taste, um IP-Adresse und Anmeldeinformationen abzurufen.

Wenn der automatisierte Prozess das Abrufen Ihrer Anmeldeinformationen fehlschlägt, verwenden Sie bitte die manuelle Einrichtung.

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
| Roomba® 7xx | 774, 785, | - | | ![# f03c15](https://placehold.it/15/f03c15/000000?text=+) _Model bietet keine Wifi-Konnektivität, daher keine Unterstützung_ |
| Roomba® 8xx | 880, 886, 891, 896 | - | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (höchstwahrscheinlich) |
| Roomba® 8xx | [895] (((https://forum.iobroker.net/post/245274)) | v3.2.10 / 40/69 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) KEINE Karte) |
| Roomba® 9xx | 965, 981 | - | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | (höchstwahrscheinlich) |
| Roomba® 9xx | [960] (https://forum.iobroker.net/user/jb_sullivan), [966] (https://forum.iobroker.net/user/thomaslpz), 980 | v2.4.6-3 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **unterstützt (inkl. Karte)** |
| Roomba® i | [i7 (7150)] (https://forum.iobroker.net/post/240589), i7 + (7550) | v1.4 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **unterstützt (inkl. Karte)** |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) KEINE Karte) |
| Roomba® s | [S9 +] (https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Versionshinweise](https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **unterstützt (inkl. Karte)** |
| Roomba® s | [S9 +] (https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Versionshinweise] (https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **unterstützt (inkl. Karte)** |

Bitte helfen Sie mir bezüglich der unterstützten Geräte und lassen Sie mich [über ein Problem wissen](https://github.com/Zefau/ioBroker.roomba/issues), ob Ihr Roomba-Modell unterstützt wird!

## Channels & States
Nach erfolgreicher Einrichtung werden die folgenden Kanäle und Zustände erstellt:

| Kanal | Ordner | Staat | Beschreibung |
| ------- | ------ | ----- | ----------- |
| reinigung | - | - | Befehle und Informationen zum Reinigungsprozess |
| reinigung | letzte | - | Letzte an den Roboter gesendete Befehle |
| reinigung | letzte | Befehl | Letzter Befehl an Roboter gesendet |
| reinigung | letzte | Zeitstempel | Timestamp letzter Befehl wurde gesendet |
| reinigung | letzte | datetime | DateTime letzter Befehl wurde gesendet |
| reinigung | letzte | Initiator | Initiator des letzten Befehls |
| reinigung | letzte | Zyklus | Zyklus |
| reinigung | letzte | Phase | Phase |
| reinigung | letzte | Fehler | Zeigt einen Fehler während der letzten Mission an |
| reinigung | Zeitplan | - | Zeitplaninformationen |
| reinigung | Zeitplan | Zyklus | Programmzyklus (Sonntag bis Samstag) |
| reinigung | Zeitplan | Stunden | Stunde zum Starten des Zyklus (Sonntag bis Samstag) |
| reinigung | Zeitplan | Minuten | Minute zum Starten des Zyklus (Sonntag bis Samstag) |
| reinigung | - | Dock | Schicken Sie den Roboter zur Dockingstation |
| reinigung | - | Pause | Unterbrechen Sie den aktuellen Reinigungsvorgang |
| reinigung | - | Lebenslauf | Setzen Sie den aktuellen Reinigungsprozess fort |
| reinigung | - | start | Reinigungsvorgang starten |
| reinigung | - | stop | Beenden Sie den aktuellen Reinigungsprozess |
| Gerät | - | - | Geräteinformationen |
| Gerät | Netzwerk | - | Netzwerkinformationen |
| Gerät | Netzwerk | dhcp | Geben Sie an, ob DHCP aktiviert ist |
| Gerät | Netzwerk | Router | Mac-Adresse des Routers |
| Gerät | Netzwerk | ip | IP-Adresse |
| Gerät | Netzwerk | Subnetz | Subnetzadresse |
| Gerät | Netzwerk | Gateway | Gateway-Adresse |
| Gerät | Netzwerk | dns1 | Primäre DNS-Adresse |
| Gerät | Netzwerk | dns2 | Sekundäre DNS-Adresse |
| Gerät | Präferenzen | - | Einstellungen festlegen |
| Gerät | Präferenzen | binPause | **UNBEKANNT** |
| Gerät | Präferenzen | TeppichBoostAuto | Automatisch: Roomba steigert die Saugkraft automatisch, um Teppiche gründlich zu reinigen. |
| Gerät | Präferenzen | carpetBoostHigh | Leistungsmodus: Roomba erhöht das Vakuum immer, um die Reinigungsleistung auf allen Bodenflächen zu maximieren. |
| Gerät | Präferenzen | ecoCharge | **UNBEKANNT** |
| Gerät | Präferenzen | noAutoPasses | Ein Pass: Roomba deckt alle Bereiche mit einem einzigen Reinigungspass ab. |
| Gerät | Präferenzen | noPP | **UNBEKANNT** |
| Gerät | Präferenzen | openOnly | **UNBEKANNT** |
| Gerät | Präferenzen | schedHold | **UNBEKANNT** |
| Gerät | Präferenzen | twoPass | Roomba wird ein zweites Mal alle Bereiche abdecken. Dies kann in Häusern mit Haustieren oder für gelegentliche Tiefenreinigung hilfreich sein. |
| Gerät | Versionen | - | Versionsinformationen |
| Gerät | Versionen | hardwareRev | Hardware-Revision |
| Gerät | Versionen | Batterietyp | Batterietyp |
| Gerät | Versionen | soundVer | **UNBEKANNT** |
| Gerät | Versionen | uiSwVer | **UNBEKANNT** |
| Gerät | Versionen | navSwVer | **UNBEKANNT** |
| Gerät | Versionen | wifiSwVer | **UNBEKANNT** |
| Gerät | Versionen | MobilitätVer | **UNBEKANNT** |
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
| Statistik | - | - | Statistische Informationen |
| Statistik | Missionen | - | Missionsstatistik |
| Statistik | Missionen | fehlgeschlagen | Anzahl fehlgeschlagener Reinigungsaufträge |
| Statistik | Missionen | erfolgreich sein Anzahl erfolgreicher Reinigungsjobs |
| Statistik | Missionen | gesamt | Anzahl der Reinigungsarbeiten |
| Statistik | Zeit | - | Zeitstatistik |
| Statistik | Zeit | avgMin | **UNBEKANNT** |
| Statistik | Zeit | hOnDock | **UNBEKANNT** |
| Statistik | Zeit | nVerfügbar | **UNBEKANNT** |
| Statistik | Zeit | estCap | **UNBEKANNT** |
| Statistik | Zeit | nLithChrg | **UNBEKANNT** |
| Statistik | Zeit | nNimhChrg | **UNBEKANNT** |
| Statistik | Zeit | nDocks | **UNBEKANNT** |
| - | - | refreshDateTime | DatumZeit der letzten Aktualisierung |
| - | - | refreshedTimestamp | Zeitstempel des letzten Updates |

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
| netinfo | .sec | Ganzzahl | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | - | Objekt | Unbekannt | - |
| wifistat | .wifi | Ganzzahl | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | .uap | Boolescher Wert | Unbekannt | _ (nicht zugeordnet) _ |
| wifistat | .cloud | Ganzzahl | Unbekannt | _ (nicht zugeordnet) _ |
| wlcfg | - | Objekt | Unbekannt | - |
| wlcfg | .sec | Ganzzahl | Unbekannt | _ (nicht zugeordnet) _ |
| wlcfg | .ssid | Zeichenfolge | Unbekannt | _ (nicht zugeordnet) _ |
| mac | - | mac | Mac-Adresse von Roomba | - |
| Land | - | Zeichenfolge | Unbekannt | - |
| cloudEnv | - | Zeichenfolge | Unbekannt | - |
| svcEndpoints | .svcDeplId | Zeichenfolge | Unbekannt | - |
| mapUploadAllowed | - | Boolescher Wert | Unbekannt | - |
| localtimeoffset | - | Ganzzahl | Unbekannt | - |
| ... | - | ... | ... | - |

Bitte helfen Sie mir bei der Beschreibung der Einstellungen. Wenn Sie die Bedeutung der in der Tabelle als unbekannt angegebenen Einstellungen kennen, lassen Sie mich [kennen ihre Bedeutung über ein Problem](https://github.com/Zefau/ioBroker.roomba/issues)!

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
Dank [@koalazak] (https://github.com/koalazak) für die [inoffizielle iRobot Roomba 980 node.js-Bibliothek (SDK)](https://github.com/koalazak/dorita980#readme).

### Icons
Von <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> von <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">erstellte</a> <a href="https://www.flaticon.com/" title="Flaticon">Symbole werden</a> von <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> lizenziert </div>

## Changelog

### 1.1.0 (2020-02-06)
- (Zefau) added support to change schedule (see [#36](https://github.com/Zefau/ioBroker.roomba/issues/36))
- (Zefau) fixed bug with state `commands.last.dateTime` having incorrect value `NaN`
- (Zefau) fixed error message shown when robot is on a mission but map is not given

### 1.1.0 (2020-02-06)
- (Zefau) acknowledged support for S9+ (see [#34](https://github.com/Zefau/ioBroker.roomba/issues/34))

### 1.0.7 (2019-09-03)
- (Zefau) fixed bugs occurring when Roomba is on a mission
- (Zefau) added additional debug logging

### 1.0.6 (2019-08-19)
- (Zefau) added loading screen to web interface

### 1.0.5 (2019-08-18)
- (Zefau) fixed failing secure connection
- (Zefau) fixed broken credential retrieval
- (Zefau) fixed broken refresh

### 1.0.4 (2019-08-15)
- (Zefau) fixed password retrieval
- (Zefau) fixed German translations
- (Zefau) added donations button
- (Zefau) updated `dorita980` dependency to v3.1.3
- (Zefau) updated `canvas` dependency to v2.6.0

### 1.0.3 (2019-07-23)
- (Zefau) fixed bug _uncaught exception: Cannot read property 'x' of undefined_

### 1.0.2 (2019-07-20)
- (Zefau) reworked placing home icon ([#23](https://github.com/Zefau/ioBroker.roomba/issues/23))
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

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