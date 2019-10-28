---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-erweitert
hash: TlM/nSgWkaONGEu+OYzokMhDGqwAbaeQTZ9OLSTs834=
---
![Logo](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Anzahl der Installationen](http://iobroker.live/badges/nuki-extended-installed.svg)
![Stabile Version](http://iobroker.live/badges/nuki-extended-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.nuki-extended.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)
![NPM](https://nodei.co/npm/iobroker.nuki-extended.png?downloads=true)

# IoBroker.nuki-extended Dieser ioBroker-Adapter (ehemals ioBroker.Nuki2) ermöglicht die Steuerung und Überwachung der [Nuki Smart Lock] (https://nuki.io/de/smart-lock/) und / oder der [Nuki Opener] (https://nuki.io/de/opener/) unter Verwendung der beiden [Nuki Bridge API (v1.9.0, 06.05.2019)] (https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) und der [Nuki Web API (v1. 2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
**Inhaltsverzeichnis**

1. [Funktionen] (# Funktionen)
2. [Installation] (# Installation)
   1. [API-Token abrufen] (# get-a-api-token)
   2. [Rückruffunktion] (# Rückruffunktion)
3. [Channels & States] (# 3-Kanäle - Staaten)
4. [Smart Home / Alexa-Integration mit ioBroker.javascript] (# smart-home - alexa-integration-using-iobrokerjavascript)
   1. [Tür abends um 22 Uhr abschließen] (# Tür abends um 22 Uhr abschließen)
   2. [Lassen Sie sich von Alexa über Änderungen der Sperren informieren] (# let-alexa-inform-you-about-lock-changes)
   3. [Lassen Sie sich von Telegramm über Sperränderungen informieren] (# let-telegram-inform-you-about-lock-changes)
5. [Changelog] (# changelog)
6. [Credits] (# Credits)
7. [Lizenz] (# Lizenz)

## Eigenschaften
- Unterstützung für Nuki Smartlock und Nuki Opener
- Unterstützung für Nuki Bridge API und Nuki Web API
- Unterstützung für Hash-Token auf Hardware-Bridges (siehe https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)
- Fallback auf die Nuki Web API, falls die auf die Nuki Bridge API angewendeten Aktionen fehlschlagen, z. wegen Brückenfehler 503 (siehe https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Wiederholen Sie den Vorgang, falls die auf die Nuki Bridge-API angewendeten Aktionen fehlschlagen (wenn die Nuki Web-API nicht verwendet wird).
- Option zur regelmäßigen Synchronisierung anstelle des Bridge-API-Rückrufs (möglicherweise verzögert aufgrund von Hardware Bridge)
- Aktualisierung aller Zustände der Nuki Web API, wenn ein Rückruf über die Nuki Bridge API eingeht
- Berechtigte Benutzer für Nuki Smartlock und Nuki Opener abrufen (siehe unten [Channels & States] (# general-information))
- Abrufen der Konfiguration für Nuki Smartlock und Nuki Opener (siehe unten [Channels & States] (# general-config))
- Setup-Nuki-Benachrichtigungen abrufen (siehe unten [Channels & States] (# users))
- Webinterface, das die letzten Ereignisse von Ihrem Nuki Smartlock und Nuki Opener anzeigt:

  ![Nuki Extended Web Interface](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Installation
### Nuki Bridge API
So erhalten Sie Ihr Hardware-Bridge-Token (funktioniert nicht bei Software-Bridges):

1. Rufen Sie `` http:// <bridge_ip>: <bridge_port> / auth``` in einem beliebigen Browser in Ihrem Netzwerk auf. Die Brücke schaltet ihre LED ein.
2. Drücken Sie innerhalb von 30 Sekunden den Knopf der Brücke.
3. Das Ergebnis des Browseraufrufs sollte ungefähr so aussehen:

```
{
   "token":"token123",
   "success":true
}
```

4. Verwenden Sie das generierte Token im nuki-extended Adapter.

### Nuki Web API
Gehen Sie wie folgt vor, um die Nuki-Web-API zu verwenden:

1. Rufen Sie ein Token unter https://web.nuki.io/de/#/admin/web-api ab
2. Verwenden Sie dieses Token im nuki-extended Adapter
3. Stellen Sie sicher, dass Ihre Nuki-Geräte auf der Nuki Web-API veröffentlicht sind (verwenden Sie die Smartphone-App über die Einstellungen "Nuki Web aktivieren").

## Channels & States
Wenn Sie ioBroker.nuki-extended erfolgreich eingerichtet haben, werden die folgenden Kanäle und Status erstellt:

### Bridges (mit Nuki Bridge API)
Als Gerät wird eine Brücke mit dem Namensmuster ```bridge__<name of bridge>``` angelegt. Die folgenden Kanäle / Zustände werden in jeder Brücke erstellt:

| Kanal | Staat | Beschreibung |
|:------- |:----- |:----------- |
| - | \ _connected | Flag, das angibt, ob die Bridge mit dem Nuki-Server verbunden ist oder nicht |
| - | name | Name der Bridge / des Servers |
| - | bridgeId | ID der Bridge / des Servers |
| - | bridgeIp | IP-Adresse der Brücke |
| - | bridgePort | Hafen der Brücke |
| - | bridgeType | Art der Brücke |
| - | hardwareId | ID der Hardware-Brücke (nur Hardware-Brücke) |
| - | aktualisiert | Zeitstempel der letzten Aktualisierung |
| - | Betriebszeit | Betriebszeit der Brücke in Sekunden |
| - | versFirmware | Version der Bridges-Firmware (nur Hardware-Bridge) |
| - | versWifi | Version der Firmware der WiFi-Module (nur Hardware-Bridge) |
| - | versApp | Version der Bridge-App (nur Software-Bridge) |
| Rückrufe | - | Rückrufe der Brücke |
| Rückrufe | liste | Liste der Rückrufe |
| callbacks._callbackId_ | \ _löschen | Rückruf löschen |
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
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | Eine Reihe von Authentifizierungs-IDs zum Filtern von Push-Benachrichtigungen an bestimmte Benutzer oder Tastaturen. Wenn kein Eintrag vorhanden ist, werden Push-Benachrichtigungen für alle Benutzer und Tastaturen ausgelöst |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | Wenn die Smartlock-ID nicht festgelegt ist, werden alle Smart Locks des Kontos für Push-Benachrichtigungen aktiviert |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | Ein Set, auf dem Push-Benachrichtigungen ausgelöst werden sollen: Sperren, Entsperren, Entriegeln, Sperren, Öffnen, Klingeln, Türsensor, Warnungen, Smartlock |
| notifications._notificationIndex_ | sprache | Die Sprache der Push-Nachrichten |
| notifications._notificationIndex_ | lastActiveDate | Das letzte aktive Datum |
| notifications._notificationIndex_ | notificationId | Die eindeutige Benachrichtigungs-ID für die Benachrichtigung |
| notifications._notificationIndex_ | os | Das Betriebssystem <br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | Die Push-ID oder die POST-URL für einen Webhook |
| notifications._notificationIndex_ | referenceId | Die Referenz-ID, eine ID zur Identifizierung eines fremden Systems |
| notifications._notificationIndex_ | status | Aktueller Aktivierungsstatus <br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| notifications._notificationIndex_ | status | Aktueller Aktivierungsstatus <br> &quot;{&quot; 0 &quot;:&quot; INIT &quot;,&quot; 1 &quot;:&quot; ACTIVE &quot;,&quot; 2 &quot;:&quot; FAILED &quot;}&quot; |

### Smartlocks und Opener (mit Nuki Bridge API)
Als Gerät wird ein Schloss mit dem Namensmuster ```door__<name of door>``` angelegt. Die folgenden Kanäle / Zustände werden in jeder Sperre erstellt (bei Verwendung der Nuki Bridge-API):

| Kanal | Staat | Beschreibung |
|:------- |:----- |:----------- |
| - | \ _ACTION | Eine Aktion auf das Schloss auslösen |
| - | id | ID des Nuki |
| - | name | Name des Nuki |
| - | Typ | Art des Geräts |
| - | bridgeId | Brückenausweis der Nuki |
| status | - | Aktueller Status des Schlosses |
| status | batteryCritical ** | Gibt den kritischen Akkuladestand an |
| status | lockState ** | Aktueller Sperrzustand des Nuki |
| status | gesperrt ** | Anzeige, ob die Tür verriegelt ist |
| status | aktualisiert ** | Zeitstempel der letzten Aktualisierung |

_ ** markierte Zustände werden bei einer Nuki-Aktion aktualisiert, wenn der Rückruf gesetzt ist_

### Smartlocks und Opener (mit Nuki Web API)
Als Gerät wird ein Schloss mit dem Namensmuster ```door__<name of door>``` angelegt. Die folgenden Kanäle / Status werden in jeder Sperre erstellt (bei Verwendung der Nuki Web API):

| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| - | \ _ACTION | Eine Aktion auf das Schloss auslösen |
| - | id | ID des Nuki |
| - | name | Name des Nuki |
| - | Typ | Art des Geräts |
| - | Protokolle | Logs / Geschichte von Nuki |
| - | bridgeId | Brückenausweis der Nuki |

#### Information
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| info | - | Zusätzliche Informationen |
| info | accountId | Die Konto-ID |
| info | authId | Die Autorisierungs-ID |
| info | Favorit | Die Lieblingsflagge |
| info | firmwareVersion | Die Firmware-Version |
| info | hardwareVersion | Die Hardware-Version |
| info | operationId | Die Vorgangs-ID - Wenn festgelegt, ist das Gerät für einen anderen Vorgang gesperrt |
| info | serverState | Der Serverstatus <br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| info | adminPinState | Der Admin-Pin-Status <br> &quot;{&quot; 0 &quot;:&quot; OK &quot;,&quot; 1 &quot;:&quot; FEHLT &quot;,&quot; 2 &quot;:&quot; UNGÜLTIG &quot;}&quot; |
| info | virtualDevice | Das Flag, das eine virtuelle intelligente Sperre angibt |
| info | dateCreated | Das Erstellungsdatum |
| info | dateUpdated | Das Aktualisierungsdatum |

#### Zustand
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Zustand | - | Aktueller Status des Schlosses |
| Zustand | batteryCritical | Gibt den kritischen Akkuladestand an |
| Zustand | geschlossen | Anzeige, ob die Tür geschlossen ist (boolescher Wert von doorState) |
| Zustand | doorState | Aktueller Türzustand der Nuki |
| Zustand | lastAction | Letzte ausgelöste Aktion |
| Zustand | lockState | Aktueller Sperrzustand des Nuki |
| Zustand | gesperrt | Anzeige, ob die Tür verriegelt ist |
| Zustand | mode | Der Smartlock-Modus <br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| Zustand | ringToOpenTimer | Restring zur Öffnungszeit |
| Zustand | auslösen | Der Zustandsauslöser <br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| Zustand | auslösen | Der Zustandsauslöser <br> {&quot;0&quot;: &quot;SYSTEM&quot;, &quot;1&quot;: &quot;MANUAL&quot;, &quot;2&quot;: &quot;BUTTON&quot;, &quot;3&quot;: &quot;AUTOMATIC&quot;, &quot;4&quot;: &quot;WEB&quot;, &quot;5&quot;: &quot;APP&quot;} `|

#### General Config
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| config | - | Konfiguration |
| config | werbemodus | Der Werbemodus (Batteriesparen) <br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | AutoUnlatch | True, wenn die Tür beim Entriegeln entriegelt werden soll (Knopf) |
| config | buttonEnabled | True, wenn die Schaltfläche auf dem Smartlock aktiviert ist |
| config | Fähigkeiten Die Funktionen geben an, ob das Öffnen der Tür über App, RTO oder beides möglich ist |
| config | fobAction1 | Die Fob-Aktion, wenn die Taste einmal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | Die Fob-Aktion, wenn die Taste zweimal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Die Fob-Aktion, wenn die Taste dreimal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Die Fob-Aktion, wenn die Taste dreimal gedrückt wird <br> &quot;{&quot; 0 &quot;:&quot; NONE &quot;,&quot; 1 &quot;:&quot; UNLOCK &quot;,&quot; 2 &quot;:&quot; LOCK &quot;,&quot; 3 &quot;:&quot; LOCK_N_GO &quot;,&quot; 4 &quot;:&quot; INTELLIGENT &quot;}&quot; |
| config | fobPaired | True, wenn ein Anhänger mit dem Smartlock | gepaart ist |
| config | gpsLatitude | Latitude |
| config | homekitState | Der Homekit-Status <br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| config | homekitState | Der Homekit-Status <br> &quot;{&quot; 0 &quot;:&quot; NICHT VERFÜGBAR &quot;,&quot; 1 &quot;:&quot; DEAKTIVIERT &quot;,&quot; 2 &quot;:&quot; AKTIVIERT &quot;,&quot; 3 &quot;:&quot; AKTIVIERT &amp; PAARIERT &quot;}&quot; |
| config | TastaturPaired | True, wenn eine Tastatur mit dem Smartlock | gekoppelt ist |
| config | ledBrightness | Die Helligkeit der LED: 0 (aus) bis 5 (max) |
| config | ledEnabled | True, wenn die LED am Smartlock aktiviert ist |
| config | name | Der Name des Smartlocks für neue Benutzer |
| config | betriebsmodus | Die Betriebsart des Öffners |
| config | pairingEnabled | True, wenn das Pairing über die Smartlock-Schaltfläche | zulässig ist |
| config | singleLock | True, wenn das Smartlock nur einmal (statt zweimal) gesperrt werden soll |
| config | timezoneId | Die ID der Zeitzone |
| config | timezoneOffset | Der Zeitzonenversatz (in Minuten) |

#### Erweiterte Konfig
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Erweiterte Konfiguration |
| advancedConfig | autoLockTimeout | Sekunden, bis sich das Smart Lock nach dem Entsperren von selbst wieder verriegelt. Kein automatisches erneutes Sperren, wenn der Wert 0 ist |
| advancedConfig | automaticBatteryTypeDetection | Flag, das angibt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| advancedConfig | batterietyp | Der Typ der im Smart Lock enthaltenen Batterien <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird <br> &quot;{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| advancedConfig | lngTimeout | Zeitüberschreitung in Sekunden für die Sperre 'n' go |
| advancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird <br> &quot;{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| advancedConfig | singleLockedPositionOffsetDegrees | Versatz, der die einzelne verriegelte Position ändert |
| advancedConfig | totalDegrees | Die absolute Gesamtposition in Grad, die während der Kalibrierung erreicht wurde |
| advancedConfig | unlatchDuration | Dauer in Sekunden zum Halten des Riegels in entriegelter Position |
| advancedConfig | unlockedPositionOffsetDegrees | Versatz, der die entriegelte Position ändert |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | Versatz, der die Position ändert, an der der Übergang von entsperrt zu gesperrt erfolgt |

#### Opener Advanced Config
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Öffner Konfiguration |
| openerAdvancedConfig | intercomId | Die Datenbank-ID der verbundenen Gegensprechanlage |
| openerAdvancedConfig | busModeSwitch | Methode zum Umschalten zwischen Daten- und Analogmodus <br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | Dauer des Kurzschlusses bei BUS-Betriebsartenumschaltung in ms |
| openerAdvancedConfig | electricStrikeDelay | Verzögerung der Aktivierung des elektrischen Schließers in ms (nach Verriegelung 3 - Aktivierung des elektrischen Schließers -) |
| openerAdvancedConfig | randomElectricStrikeDelay | Zufällige electricStrikeDelay (Bereich 3000 - 7000 ms), um eine Person im Inneren zu simulieren, die den elektrischen Schlag betätigt |
| openerAdvancedConfig | electricStrikeDuration | Dauer in ms der Betätigung des elektrischen Schließers (Verriegelung 3 - Betätigung des elektrischen Schließers -) |
| openerAdvancedConfig | disableRtoAfterRing | Flag zum Deaktivieren von RTO nach dem Klingeln |
| openerAdvancedConfig | Türklingelunterdrückung Der Klingelunterdrückungsmodus <br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | Türklingelunterdrückung Der Klingelunterdrückungsmodus <br> &quot;{&quot; 0 &quot;:&quot; NIE &quot;,&quot; 1 &quot;:&quot; IMMER &quot;,&quot; 2 &quot;:&quot; RTO &quot;,&quot; 3 &quot;:&quot; KONTINUIERLICH &quot;,&quot; 4 &quot;:&quot; KONTINUIERLICH + RTO &quot;}&quot; |
| openerAdvancedConfig | TürklingelunterdrückungDauer | Dauer in ms der Klingelunterdrückung (nur in Betriebsart 2 -digital Intercom-) |
| openerAdvancedConfig | soundRing | Der Ton für Ring |
| openerAdvancedConfig | soundOpen | Der Sound für open |
| openerAdvancedConfig | soundRto | Der Sound für RTO |
| openerAdvancedConfig | soundCm | Der Sound für CM |
| openerAdvancedConfig | soundConfirmation | Die akustische Bestätigung |
| openerAdvancedConfig | soundLevel | Der Schallpegel |
| openerAdvancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird |
| openerAdvancedConfig | batterietyp | Der Typ der im Smart Lock enthaltenen Batterien <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | batterietyp | Der Typ der im Smart Lock enthaltenen Batterien <br> &quot;{&quot; 0 &quot;:&quot; ALKALI &quot;,&quot; 1 &quot;:&quot; AKKUMULATOR &quot;,&quot; 2 &quot;:&quot; LITHIUM &quot;}&quot; |
| openerAdvancedConfig | automaticBatteryTypeDetection | Flag, das angibt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| openerAdvancedConfig | operationId | Die Vorgangs-ID - wenn das eingestellte Gerät für einen anderen Vorgang gesperrt ist |

#### Benutzer
| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Benutzer | - | Benutzer des Schlosses |
| users._userName_ | - | Benutzer _userName_ |
| users._userName_ | allowedFromDate | Das erlaubte ab Datum |
| users._userName_ | allowedUntilDate | Das erlaubte bis Datum |
| users._userName_ | allowedWeekDays | Die erlaubten Wochentage <br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | Die zulässige Zeit (in Minuten ab Mitternacht) |
| users._userName_ | allowedUntilTime | Die erlaubte Zeit bis (in Minuten ab Mitternacht) |
| users._userName_ | authId | Die Smartlock-Berechtigungs-ID |
| users._userName_ | dateCreated | Das Erstellungsdatum |
| users._userName_ | dateUpdated | Das Aktualisierungsdatum |
| users._userName_ | dateLastActive | Das letzte aktive Datum |
| users._userName_ | aktiviert | True, wenn der Benutzer aktiviert ist |
| users._userName_ | id | Die eindeutige ID des Benutzers |
| users._userName_ | lockCount | Die Anzahl der Sperren |
| users._userName_ | name | Name des Benutzers |
| users._userName_ | remoteAllowed | True, wenn die Authentifizierung über Remotezugriff verfügt |
| users._userName_ | Typ | Die Art der Autorisierung <br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | Typ | Die Art der Autorisierung <br> &quot;{&quot; 0 &quot;:&quot; APP &quot;,&quot; 1 &quot;:&quot; BRIDGE &quot;,&quot; 2 &quot;:&quot; FOB &quot;,&quot; 3 &quot;:&quot; KEYPAD &quot;,&quot; 13 &quot;:&quot; KEYPAD CODE &quot;,&quot; 14 &quot;:&quot; Z- KEY &#39;, &quot;15&quot;:&#39; VIRTUAL &#39;} `|

## Smart Home / Alexa-Integration mit ioBroker.javascript
Einige Beispiele für eine mögliche Integration in Ihr Smart Home.

### Abends um 22 Uhr Tür abschließen
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

__ Ersetzen Sie `nuki-extended.0.door__home_door.status.lockState` durch den lockState Ihres Schlosses! __ Sie können die Nachricht auch über `msg` anpassen.

### Lassen Sie sich von Alexa über Änderungen der Sperre informieren
Dies erfordert den ioBroker-Adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Um die Sprachausgabe von Alexa zu nutzen, definieren wir eine Funktion ```say```. Platzieren Sie die folgende Funktion in einem Skript im "globalen" Ordner von ioBroker.javascript. WICHTIG: Ersetzen Sie Ihre ALEXA ID durch Ihre Alexa ID. Sie finden die Alexa ID im Objektbaum von ioBroker ```alexa2.0.Echo-Devices```.

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

Sie können diese Funktion in ioBroker.javascript verwenden, um einen Ausdruck mit Alexa ```say('Hello World')``` oder ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` für die Sprachausgabe von mehreren Geräten auszusprechen.

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript und fügen Sie den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID # (auch # ersetzen) durch den Status, der den Sperrstatus enthält (z. B. ```nuki-extended.0.door__home_door.status.lockState```):

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

### Lassen Sie sich von Telegram über Änderungen der Sperre informieren
Dies erfordert den ioBroker-Adapter ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

Um die Nachrichtenausgabe des Telegramms nutzen zu können, definieren wir eine Funktion ```msg``` und ```messenger```. Platzieren Sie die folgende Funktion in einem Skript im "globalen" Ordner von ioBroker.javascript:

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

Sie können diese Funktion in ioBroker.javascript verwenden, um über ```msg('Hello World')``` (an alle Benutzer) oder ```msg('Hello World', 'Zefau')``` (an bestimmte Benutzer) etwas an Telegramm zu senden.

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript und fügen Sie den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID # (auch # ersetzen) durch den Status, der den Sperrstatus enthält (z. B. ```nuki-extended.0.door__home_door.status.lockState```):

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

HINWEIS: Wenn Sie sowohl das Alexa-Skript als auch das Telegramm-Skript verwenden, dürfen Sie für beide Aktionen nur einen Listener definieren:

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
Vielen Dank an [@ Mik13] (https://github.com/Mik13) für die [Nuki Bridge API-Implementierung](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Icons von <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> ([Essential Set] (https://www.flaticon.com/packs/essential-set-2) und <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Doors](https://www.flaticon.com/packs/doors)) von <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com werden</a> von <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> lizenziert

## Changelog

### 2.0.0 (2019-10-xx)
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

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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