---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-erweitert
hash: SRyqV/KzzlUhBsyMJ7ZtHIwi5oPiEJ2o4DU0rX9OVPc=
---
![Logo](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Anzahl der Installationen](http://iobroker.live/badges/nuki-extended-installed.svg)
![Stabile Version](http://iobroker.live/badges/nuki-extended-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Commits seit der letzten Veröffentlichung](https://img.shields.io/github/commits-since/Zefau/ioBroker.nuki-extended/latest.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)
![NPM](https://nodei.co/npm/iobroker.nuki-extended.png?downloads=true)

# IoBroker.nuki-erweitert Dieser ioBroker-Adapter (früher ioBroker.Nuki2) ermöglicht die Steuerung und Überwachung der [Nuki Smart Lock] (https://nuki.io/de/smart-lock/) und / oder der [Nuki Opener] (https://nuki.io/de/opener/) unter Verwendung der beiden [Nuki Bridge API (v1.9.0, 06.05.2019)] (https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) und die [Nuki Web API (v1. 2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
[![Travis CI] (https://travis-ci.com/Zefau/ioBroker.nuki-extended.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.nuki-extended)

**Inhaltsverzeichnis**

1. [Funktionen] (# Funktionen)
2. [Installation] (# Installation)
   1. [Nuki Bridge API] (# nuki-bridge-api)
   2. [Nuki Web API] (# nuki-web-api)
3. [Kanäle & Zustände] (# Kanäle - Zustände)
4. [Smart Home / Alexa-Integration mit ioBroker.javascript] (# smart-home - alexa-Integration mit iobrokerjavascript)
   1. [Tür um 22 Uhr abends abschließen] (# Tür um 22 Uhr abends abschließen)
   2. [Lassen Sie sich von Alexa über Änderungen an der Sperre informieren] (# Lassen Sie sich von Alexa über Änderungen der Sperre informieren)
   3. [Lassen Sie sich von Telegramm über Sperränderungen informieren] (# Lassen Sie sich von Telegramm über Sperränderungen informieren)
5. [Changelog] (# changelog)
6. [Credits] (# Credits)
7. [Lizenz] (# Lizenz)

## Eigenschaften
- Unterstützung für Nuki Smartlock und Nuki Opener
- Unterstützung sowohl für die Nuki Bridge API als auch für die Nuki Web API
- ~~ Unterstützung für Hash-Token auf Hardware-Bridges (siehe https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- Fallback auf die Nuki-Web-API für den Fall, dass angewendete Aktionen auf die Nuki-Bridge-API fehlschlagen, z. aufgrund des Brückenfehlers 503 (siehe https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Wiederholen Sie den Vorgang, falls die auf die Nuki Bridge-API angewendeten Aktionen fehlschlagen (wenn die Nuki-Web-API nicht verwendet wird).
- Option zur regelmäßigen Synchronisierung anstelle des Bridge-API-Rückrufs (der aufgrund von Hardware Bridge verzögert werden kann)
- Aktualisieren aller Status der Nuki Web API, wenn ein Rückruf über die Nuki Bridge API empfangen wird
- Autorisierte Benutzer für Nuki Smartlock und Nuki Opener abrufen (siehe unten [Kanäle & Status] (# allgemeine Informationen))
- Rufen Sie die Konfiguration für Nuki Smartlock und Nuki Opener ab (siehe unten [Channels & States] (# general-config)).
- Nuki-Benachrichtigungen abrufen (siehe unten [Kanäle & Status] (# Benutzer))
- Webinterface, das die letzten Ereignisse von Ihrem Nuki Smartlock und Nuki Opener anzeigt:

  ![Nuki Extended Web Interface](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Installation
### Nuki Bridge API
So erhalten Sie Ihr Hardware-Bridge-Token (funktioniert nicht für Software-Bridges):

1. Rufen Sie `` `http:// <bridge_ip>: <bridge_port> / auth``` von einem beliebigen Browser in Ihrem Netzwerk aus auf. Die Brücke schaltet ihre LED ein.
2. Drücken Sie innerhalb von 30 Sekunden die Taste der Brücke.
3. Das Ergebnis des Browseraufrufs sollte ungefähr so aussehen:

```
{
   "token":"token123",
   "success":true
}
```

4. Verwenden Sie das generierte Token im nuki-erweiterten Adapter.

### Nuki Web API
Gehen Sie wie folgt vor, um die Nuki-Web-API zu verwenden:

1. Rufen Sie ein Token unter https://web.nuki.io/de/#/admin/web-api ab
2. Verwenden Sie dieses Token im nuki-erweiterten Adapter
3. Stellen Sie sicher, dass Ihre Nuki-Geräte in der Nuki-Web-API veröffentlicht sind (verwenden Sie die Smartphone-App über die Einstellungen "Nuki-Web aktivieren").

## Kanäle & Staaten
Wenn Sie ioBroker.nuki-extended erfolgreich eingerichtet haben, werden die folgenden Kanäle und Status erstellt:

### Bridges (mit Nuki Bridge API)
Als Gerät wird eine Brücke mit dem Namensmuster ```bridge__<name of bridge>``` erstellt. Die folgenden Kanäle / Zustände werden in jeder Brücke erstellt:

| Kanal | Staat | Beschreibung |
|:------- |:----- |:----------- |
| - | \ _connected | Flag, das angibt, ob die Bridge mit dem Nuki-Server verbunden ist oder nicht |
| - | Name | Name der Brücke / des Servers |
| - | bridgeId | ID der Bridge / des Servers |
| - | bridgeIp | IP-Adresse der Brücke |
| - | bridgePort | Hafen der Brücke |
| - | bridgeType | Brückentyp |
| - | hardwareId | ID der Hardwarebrücke (nur Hardwarebrücke) |
| - | aktualisiert | Zeitstempel des letzten Updates |
| - | Betriebszeit | Betriebszeit der Brücke in Sekunden |
| - | versFirmware | Version der Bridges-Firmware (nur Hardware-Bridge) |
| - | versWifi | Version der Firmware der WiFi-Module (nur Hardware-Bridge) |
| - | versApp | Version der Bridge-App (nur Software-Bridge) |
| Rückrufe | - | Rückrufe der Brücke |
| Rückrufe | Liste | Liste der Rückrufe |
| callbacks._callbackId_ | \ _delete | Rückruf löschen |
| callbacks._callbackId_ | url | URL des Rückrufs |

### Allgemeine Information
| Kanal | Staat | Beschreibung |
|:------- |:----- |:----------- |
| - | Verbindung | Adapterverbindungsstatus |
| - | bridgeApiSync | Gibt an, ob die Synchronisierung über die Bridge-API aktiviert ist |
| - | bridgeApiLast | Zeitstempel der letzten Bridge-API-Synchronisierung |
| - | webApiSync | Gibt an, ob die Synchronisierung über die Web-API aktiviert ist |
| - | webApiLast | Zeitstempel der letzten Web-API-Synchronisierung |
| Benachrichtigungen | - | Benachrichtigungen |
| notifications._notificationIndex_ | - | - |
| notifications._notificationIndex_.settings | - | Benachrichtigungseinstellungen |
| notifications._notificationIndex_.settings._settingsIndex_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | Eine Reihe von Authentifizierungs-IDs zum Filtern von Push-Benachrichtigungen an bestimmte Benutzer oder Tastaturen. Wenn keine Eintrags-Push-Benachrichtigungen für alle Benutzer und Tastaturen ausgelöst werden |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | Wenn nicht alle Smart Locks des Kontos festgelegt sind, wird die Smartlock-ID für Push-Benachrichtigungen aktiviert |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | Ein Set, bei dem Push-Benachrichtigungen ausgelöst werden sollen: Sperren, Entsperren, Entriegeln, Sperren, Öffnen, Klingeln, Türsensor, Warnungen, Smartlock |
| notifications._notificationIndex_ | Sprache | Die Sprache der Push-Nachrichten |
| notifications._notificationIndex_ | lastActiveDate | Das letzte aktive Datum |
| notifications._notificationIndex_ | Benachrichtigungs-ID | Die eindeutige Benachrichtigungs-ID für die Benachrichtigung |
| notifications._notificationIndex_ | os | Das Betriebssystem <br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | Die Push-ID oder die POST-URL für einen Webhook |
| notifications._notificationIndex_ | referenceId | Die Referenz-ID, eine ID zur Identifizierung eines fremden Systems |
| notifications._notificationIndex_ | Status | Aktueller Aktivierungsstatus <br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| notifications._notificationIndex_ | Status | Aktueller Aktivierungsstatus <br> `{&quot; 0 &quot;: &#39;INIT&#39;,&quot; 1 &quot;: &#39;ACTIVE&#39;,&quot; 2 &quot;: &#39;FAILED&#39;}` |

### Smartlocks und Opener (mit Nuki Bridge API)
Als Gerät wird eine Sperre mit dem Namensmuster ```door__<name of door>``` erstellt. Die folgenden Kanäle / Zustände werden in jeder Sperre erstellt (bei Verwendung der Nuki Bridge-API):

| Kanal | Staat | Beschreibung |
|:------- |:----- |:----------- |
| - | \ _ACTION | Lösen Sie eine Aktion für das Schloss aus |
| - | id | ID des Nuki |
| - | Name | Name des Nuki |
| - | Typ | Gerätetyp |
| - | bridgeId | Brücken-ID des Nuki |
| Status | - | Aktueller Status der Sperre |
| Status | batteriekritisch ** | Gibt den kritischen Batteriestand an |
| Status | lockState ** | Aktueller Sperrzustand des Nuki |
| Status | gesperrt ** | Anzeige, ob die Tür verriegelt ist |
| Status | aktualisiert ** | Zeitstempel des letzten Updates |

_ ** markierte Zustände werden bei einer Nuki-Aktion aktualisiert, wenn der Rückruf gesetzt ist_

### Smartlocks und Opener (mit Nuki Web API)
Als Gerät wird eine Sperre mit dem Namensmuster ```door__<name of door>``` erstellt. Die folgenden Kanäle / Zustände werden in jeder Sperre erstellt (bei Verwendung der Nuki-Web-API):

| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| - | \ _ACTION | Lösen Sie eine Aktion für das Schloss aus |
| - | id | ID des Nuki |
| - | Name | Name des Nuki |
| - | Typ | Gerätetyp |
| - | Protokolle | Protokolle / Geschichte von Nuki |
| - | bridgeId | Brücken-ID des Nuki |

#### Information
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| info | - | Zusätzliche Informationen |
| info | accountId | Die Konto-ID |
| info | authId | Die Berechtigungs-ID |
| info | Favorit | Die Lieblingsflagge |
| info | firmwareVersion | Die Firmware-Version |
| info | hardwareVersion | Die Hardwareversion |
| info | operationId | Die Operations-ID - Wenn festgelegt, ist das Gerät für eine andere Operation gesperrt |
| info | serverState | Der Serverstatus <br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| info | adminPinState | Der Admin-Pin-Status <br> `{&quot; 0 &quot;: &#39;OK&#39;,&quot; 1 &quot;: &#39;MISSING&#39;,&quot; 2 &quot;: &#39;INVALID&#39;}` |
| info | virtualDevice | Das Flag für ein virtuelles Smart Lock |
| info | dateCreated | Das Erstellungsdatum |
| info | dateUpdated | Das Aktualisierungsdatum |

#### Zustand
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Zustand | - | Aktueller Status der Sperre |
| Zustand | batteriekritisch | Gibt den kritischen Batteriestand an |
| Zustand | geschlossen | Anzeige, wenn die Tür geschlossen ist (Boolescher Wert von doorState) |
| Zustand | Türstaat | Aktueller Türzustand des Nuki |
| Zustand | lastAction | Zuletzt ausgelöste Aktion |
| Zustand | lockState | Aktueller Sperrzustand des Nuki |
| Zustand | gesperrt | Anzeige, ob die Tür verriegelt ist |
| Zustand | Modus | Der Smartlock-Modus <br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| Zustand | ringToOpenTimer | Verbleibender Ring zur Öffnungszeit |
| Zustand | auslösen | Der Statusauslöser <br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| Zustand | auslösen | Der Statusauslöser <br> `{&quot; 0 &quot;: &#39;SYSTEM&#39;,&quot; 1 &quot;: &#39;MANUAL&#39;,&quot; 2 &quot;: &#39;BUTTON&#39;,&quot; 3 &quot;: &#39;AUTOMATIC&#39;,&quot; 4 &quot;: &#39;WEB&#39;,&quot; 5 &quot;: &#39;APP&#39;} `|

#### Allgemeine Konfiguration
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| config | - | Konfiguration |
| config | Werbemodus | Der Werbemodus (Batteriesparen) <br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | autoUnlatch | Richtig, wenn die Tür beim Entriegeln entriegelt werden soll (Knopf) |
| config | buttonEnabled | True, wenn die Schaltfläche auf dem Smartlock aktiviert ist |
| config | Fähigkeiten | Die Funktionen geben an, ob das Öffnen der Tür über App, RTO oder beides möglich ist |
| config | fobAction1 | Die Fob-Aktion, wenn die Taste einmal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | Die Fob-Aktion, wenn die Taste zweimal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Die Fob-Aktion, wenn die Taste dreimal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Die Fob-Aktion, wenn die Taste dreimal gedrückt wird <br> `{&quot; 0 &quot;: &#39;NONE&#39;,&quot; 1 &quot;: &#39;UNLOCK&#39;,&quot; 2 &quot;: &#39;LOCK&#39;,&quot; 3 &quot;: &#39;LOCK_N_GO&#39;,&quot; 4 &quot;: &#39;INTELLIGENT&#39;}` |
| config | fobPaired | True, wenn ein Anhänger mit dem Smartlock | gekoppelt ist |
| config | gpsLatitude | Breitengrad |
| config | homekitState | Der Homekit-Status <br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| config | homekitState | Der Homekit-Status <br> `{&quot; 0 &quot;: &#39;UNAVAILABLE&#39;,&quot; 1 &quot;: &#39;DISABLED&#39;,&quot; 2 &quot;: &#39;ENABLED&#39;,&quot; 3 &quot;: &#39;ENABLED &amp; PAIRED&#39;}` |
| config | TastaturPaired | True, wenn eine Tastatur mit dem Smartlock | gekoppelt ist |
| config | ledBrightness | Die Helligkeit der LED: 0 (aus) bis 5 (max) |
| config | ledEnabled | True, wenn die LED am Smartlock aktiviert ist |
| config | Name | Der Name des Smartlocks für neue Benutzer |
| config | Betriebsmodus | Die Betriebsart des Öffners |
| config | pairingEnabled | True, wenn das Pairing über die Smartlock-Taste | zulässig ist |
| config | singleLock | True, wenn der Smartlock nur einmal (statt zweimal) gesperrt werden soll |
| config | timezoneId | Die Zeitzonen-ID |
| config | timezoneOffset | Der Zeitzonenversatz (in Minuten) |

#### Erweiterte Konfiguration
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Erweiterte Konfiguration |
| advancedConfig | autoLockTimeout | Sekunden, bis sich das Smart Lock nach dem Entsperren wieder verriegelt. Keine automatische Neuverriegelung, wenn der Wert 0 ist |
| advancedConfig | omaticBatteryTypeDetection | Flag, das angibt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| advancedConfig | Batterietyp | Der Typ der im Smart Lock vorhandenen Batterien <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird <br> `{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| advancedConfig | lngTimeout | Zeitüberschreitung in Sekunden für Sperre 'n' go |
| advancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird <br> `{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| advancedConfig | singleLockedPositionOffsetDegrees | Versatz, der die einzelne verriegelte Position ändert |
| advancedConfig | totalDegrees | Die absolute Gesamtposition in Grad, die während der Kalibrierung erreicht wurde |
| advancedConfig | unlatchDuration | Dauer in Sekunden, um die Verriegelung in der nicht verriegelten Position zu halten |
| advancedConfig | UnlockedPositionOffsetDegrees | Versatz, der die entriegelte Position ändert |
| advancedConfig | UnlockedToLockedTransitionOffsetDegrees | Versatz, der die Position ändert, an der der Übergang von entsperrt zu gesperrt erfolgt |

#### Opener Advanced Config
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Öffnerkonfiguration |
| openerAdvancedConfig | Gegensprechanlage | Die Datenbank-ID der angeschlossenen Gegensprechanlage |
| openerAdvancedConfig | busModeSwitch | Methode zum Umschalten zwischen Daten- und Analogmodus <br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | Kurzschlussdauer | Dauer des Kurzschlusses für die Umschaltung des BUS-Modus in ms |
| openerAdvancedConfig | electricStrikeDelay | Verzögerung der elektrischen Schlagaktivierung in ms (nach Sperrwirkung 3 - elektrische Schlagbetätigung-) |
| openerAdvancedConfig | randomElectricStrikeDelay | Random electricStrikeDelay (Bereich 3000 - 7000 ms), um eine Person im Inneren zu simulieren, die den elektrischen Schlag betätigt |
| openerAdvancedConfig | electricStrikeDuration | Dauer der elektrischen Schlagbetätigung in ms (Verriegelungswirkung 3 - elektrische Schlagbetätigung-) |
| openerAdvancedConfig | disableRtoAfterRing | Flag zum Deaktivieren von RTO nach Klingeln |
| openerAdvancedConfig | Türklingelunterdrückung | Der Türklingel-Unterdrückungsmodus <br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | Türklingelunterdrückung | Der Türklingel-Unterdrückungsmodus <br> `{&quot; 0 &quot;: &#39;NIE&#39;,&quot; 1 &quot;: &#39;IMMER&#39;,&quot; 2 &quot;: &#39;RTO&#39;,&quot; 3 &quot;: &#39;KONTINUIERLICH&#39;,&quot; 4 &quot;: &#39;KONTINUIERLICH + RTO&#39;}` |
| openerAdvancedConfig | TürklingelSuppressionDauer | Dauer der Türklingelunterdrückung in ms (nur im Betriebsmodus 2 -digital Intercom-) |
| openerAdvancedConfig | soundRing | Der Ton für Ring |
| openerAdvancedConfig | soundOpen | Der Sound für open |
| openerAdvancedConfig | soundRto | Der Sound für RTO |
| openerAdvancedConfig | soundCm | Der Sound für CM |
| openerAdvancedConfig | soundConfirmation | Die Tonbestätigung |
| openerAdvancedConfig | soundLevel | Der Schallpegel |
| openerAdvancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird |
| openerAdvancedConfig | Batterietyp | Der Typ der im Smart Lock vorhandenen Batterien <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | Batterietyp | Der Typ der im Smart Lock vorhandenen Batterien <br> `{&quot; 0 &quot;: &#39;ALKALI&#39;,&quot; 1 &quot;: &#39;ACCUMULATOR&#39;,&quot; 2 &quot;: &#39;LITHIUM&#39;}` |
| openerAdvancedConfig | omaticBatteryTypeDetection | Flag, das angibt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| openerAdvancedConfig | operationId | Die Operations-ID - wenn das eingestellte Gerät für eine andere Operation gesperrt ist |

#### Benutzer
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Benutzer | - | Benutzer des Schlosses |
| users._userName_ | - | Benutzer _userName_ |
| users._userName_ | allowFromDate | Das erlaubte ab Datum |
| users._userName_ | allowUntilDate | Das erlaubte bis Datum |
| users._userName_ | allowWeekDays | Die erlaubten Wochentage <br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowFromTime | Die erlaubte ab Zeit (in Minuten ab Mitternacht) |
| users._userName_ | allowUntilTime | Die erlaubte Zeit (in Minuten ab Mitternacht) |
| users._userName_ | authId | Die Smartlock-Berechtigungs-ID |
| users._userName_ | dateCreated | Das Erstellungsdatum |
| users._userName_ | dateUpdated | Das Aktualisierungsdatum |
| users._userName_ | dateLastActive | Das letzte aktive Datum |
| users._userName_ | aktiviert | True, wenn der Benutzer aktiviert ist |
| users._userName_ | id | Die eindeutige ID des Benutzers |
| users._userName_ | lockCount | Die Anzahl der Sperren |
| users._userName_ | Name | Name des Benutzers |
| users._userName_ | remoteAllowed | True, wenn die Authentifizierung Fernzugriff hat |
| users._userName_ | Typ | Die Art der Autorisierung <br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | Typ | Die Art der Autorisierung <br> `{&quot; 0 &quot;: &#39;APP&#39;,&quot; 1 &quot;: &#39;BRIDGE&#39;,&quot; 2 &quot;: &#39;FOB&#39;,&quot; 3 &quot;: &#39;KEYPAD&#39;,&quot; 13 &quot;: &#39;KEYPAD CODE&#39;,&quot; 14 &quot;: &#39;Z- KEY &#39;, &quot;15&quot;:&#39; VIRTUAL &#39;} `|

## Smart Home / Alexa-Integration mit ioBroker.javascript
Einige Beispiele für eine mögliche Integration in Ihr Smart Home.

### Abends um 22 Uhr die Tür abschließen
```javascript
var states = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

schedule('0 22 * * *', function()
{
    var status = (getState('nuki-extended.0.smartlocks.home_door.state.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki-extended.0.smartlocks.home_door._ACTION', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__Ersetzen Sie `nuki-extended.0.door__home_door.status.lockState` durch den LockState Ihres Schlosses! __ Sie können die Nachricht auch über `msg` anpassen.

### Lassen Sie sich von Alexa über Änderungen an der Sperre informieren
Dies erfordert den ioBroker-Adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Um die Sprachausgabe von Alexa nutzen zu können, definieren wir eine Funktion ```say```. Platzieren Sie die folgende Funktion in einem Skript im Ordner "global" von ioBroker.javascript. WICHTIG: Ersetzen Sie #Ihre ALEXA-ID # (ersetzen Sie auch #) durch Ihre Alexa-ID. Sie finden die Alexa-ID im Objektbaum von ioBroker ```alexa2.0.Echo-Devices```.

```javascript
/**
 * Say something with Alexa.
 *
 * @param       {string}        message         Message to say
 * @param       {string|array}  alexas          Alexa Device to say the voice message
 * @return      void
 *
 */
function say(message, alexas = '#YOUR ALEXA ID#') // use alexas = ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'] for default voice output from multiple devices (also replace #)
{
    alexas = typeof alexas === 'string' ? [alexas] : alexas;
    alexas.forEach(function(alexa)
    {
        setState('alexa2.0.Echo-Devices.' + alexa + '.Commands.speak', message);
    });
}
```

Sie können diese Funktion in ioBroker.javascript verwenden, um eine Phrase mit Alexa ```say('Hello World')``` oder ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` für die Sprachausgabe von mehreren Geräten auszusprechen.

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript und fügen Sie den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID # (ersetzen Sie auch #) durch den Status, der den Sperrstatus enthält (z. B. ```nuki-extended.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

### Lassen Sie sich von Telegram über Änderungen an der Sperre informieren
Dies erfordert den ioBroker-Adapter ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

Um die Nachrichtenausgabe von Telegram zu verwenden, definieren wir eine Funktion ```msg``` und ```messenger```. Platzieren Sie die folgende Funktion in einem Skript im Ordner "global" von ioBroker.javascript:

```javascript
/**
 * Send something via telegram.
 *
 * @param       {string}        message         Message to print
 * @param       {string|array}  receiver        Users to send the message to
 * @return      void
 *
 */
function msg(message, receiver = 'ALL')
{
    if (receiver == 'ALL')
        messenger(message);

    else
    {
        receiver = typeof receiver == 'string' ? [receiver] : receiver;
        receiver.forEach(function(user)
        {
            messenger(message, user);
        });
    }
}
```

```javascript
/**
 * Sends a message / text.
 *
 * @param   {string}            content         Message to send
 * @param   {string}            user            (optional) Specific user to send the message to (defaults to all registered users)
 * @return  void
 *
 */
function messenger(content, user = '')
{
    var config = {
        text: content,
        parse_mode: 'HTML',
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    sendTo('telegram', user ? Object.assign({user: user}, config) : config);
}
```

Mit dieser Funktion in ioBroker.javascript können Sie alles über ```msg('Hello World')``` (an alle Benutzer) oder ```msg('Hello World', 'Zefau')``` (an bestimmte Benutzer) an Telegram senden.

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript und fügen Sie den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID # (ersetzen Sie auch #) durch den Status, der den Sperrstatus enthält (z. B. ```nuki-extended.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

HINWEIS: Wenn Sie sowohl das Alexa- als auch das Telegrammskript verwenden, können Sie für beide Aktionen nur einen Listener definieren:

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```

## Credits
Dank [@ Mik13] (https://github.com/Mik13) für die [Nuki Bridge API-Implementierung](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Von <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> ([Essential Set] (https://www.flaticon.com/packs/essential-set-2)) und <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Doors](https://www.flaticon.com/packs/doors)) von <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com erstellte Symbole werden</a> von <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> lizenziert

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

### v2.2.2  (2019-03-04)
- (Zefau) fixed incorrect error message `Error triggering action via Nuki Bridge API: No Nuki Hex ID given!`
- (Zefau) added new error message if too many callbacks are already attached to Nuki Bridge (`Callback not attached because too many Callbacks attached to the Nuki Bridge already! Please delete a callback!`)

### v2.2.1  (2019-03-03)
- (Zefau) fixed incorrect state mapping of state `openerAdvancedConfig.doorbellSuppression`

  **Note:** Please delete the state `openerAdvancedConfig.doorbellSuppression` once manually and restart the adapter to take affect!
  
- (Zefau) updated dependencies

### v2.2.0  (2019-02-16)
- (Zefau) added possibility to change configuration of Nuki Smartlock or Nuki Opener (when using Web API)
- (Zefau) updated dependencies

### v2.1.0  (2019-02-03)
- (Zefau) added (optional) callback IP for Bridge API events (e.g. when ioBroker is run in docker; see [#51](https://github.com/Zefau/ioBroker.nuki-extended/issues/51))
- (Zefau) added dedicated buttons for each lock / opener action
- (Zefau) replaced `state.timestamp` with `state.lastDataUpdate` (indicates last data refresh from the APIs) and `state.lastStateUpdate` (indicates the last actual state change)

### v2.0.3  (2019-10-31)
- (Zefau) reintroduced support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)

### v2.0.2 (2019-10-31)
- (Zefau) added support for newly introduced nightmode (see https://nuki.io/de/blog/nuki-news-de/nuki-update-2019-der-winter-naht-sei-vorbereitet/)
- (Zefau) fixed incorrect behavior when bridges are defined insufficiently (no name, ip or token provided)

### v2.0.1 (2019-10-26)
- (Zefau) fixed missing `bridge_name`

### v2.0.0 (2019-10-24)
- (Zefau) added support for new Nuki Opener
- (Zefau) added support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)
- (Zefau) added fallback to Nuki Web API in case applied actions on Nuki Bridge API fail, e.g. due to bridge error 503 (see https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- (Zefau) added retry in case applied actions on Nuki Bridge API fail (when Nuki Web API is not used)
- (Zefau) added option to regularly synchronise instead of using Bridge API callback
- (Zefau) added refreshing all states of Nuki Web API when callback is received via Nuki Bridge API
- (Zefau) added states for Nuki Notifications
- (Zefau) added support for multiple devices (including Nuki Opener) on adapter web interface
- (Zefau) added option to not retrieve all information (by deselecting `config` or `users`) via Nuki Web API

## License
The MIT License (MIT)

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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