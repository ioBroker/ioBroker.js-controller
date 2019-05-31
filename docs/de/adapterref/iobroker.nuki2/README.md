---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki2/README.md
title: ioBroker.nuki2
hash: 6qE+p3V1jrJEc9IQbXpYVXxRdP8+xVmErjqgHFZd4go=
---
![Logo](../../../en/adapterref/iobroker.nuki2/admin/nuki-logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/nuki2-installed.svg)
![Stabile Version](http://iobroker.live/badges/nuki2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nuki2.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.nuki2.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.nuki2.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Zefau/ioBroker.nuki2.svg)
![NPM](https://nodei.co/npm/iobroker.nuki2.png?downloads=true)

# IoBroker.nuki2 Mit diesem ioBroker-Adapter können die [Nuki Smart Lock] (https://nuki.io/de/) unter Verwendung der beiden [Nuki Bridge API (v1.8.0, 06.03.2019)] (https://developer.nuki.io/page/nuki-bridge -http-api-170/4 / # (Überschrift - Einführung) und die [Nuki Web API (v1.1.1, 30.08.2018)](https://developer.nuki.io/page/nuki-web-api-111/3/) gesteuert und überwacht werden.
**Inhaltsverzeichnis**

1. [Installation] (# Installation)
   1. [API-Token abrufen] (# get-a-api-token)
   2. [Rückruffunktion] (# Rückruffunktion)
   3. [Staaten] (# Staaten)
2. [Smart Home / Alexa-Integration mit ioBroker.javascript] (# smart-home - alexa-integration-using-iobrokerjavascript)
   1. [Tür abends um 22 Uhr abschließen] (# Tür abends um 22 Uhr abschließen)
   2. [Lassen Sie sich von Alexa über Änderungen der Sperren informieren] (# let-alexa-inform-you-about-lock-changes)
   3. [Lassen Sie sich von Telegramm über Sperränderungen informieren] (# let-telegram-inform-you-about-lock-changes)
3. [Changelog] (# changelog)
4. [Credits] (# Credits)
5. [Lizenz] (# Lizenz)

## Installation
### Holen Sie sich ein API-Token
So erhalten Sie Ihren Brücken-Token:

1. Rufen Sie `` http:// <bridge_ip>: <bridge_port> / auth``` in einem beliebigen Browser in Ihrem Netzwerk auf
2. Die Brücke schaltet ihre LED ein
2. Drücken Sie innerhalb von 30 Sekunden den Knopf der Brücke
3. Das Ergebnis des Browseraufrufs sollte ungefähr so aussehen: `` `

{"token": "token123", "success": true} `` `

### Rückruffunktion
Wenn die Rückruffunktion verwendet wird, versucht der Adapter, den Rückruf auf der Nuki-Bridge automatisch festzulegen, wenn die Instanz gespeichert wird. Die entsprechenden Nuki-Zustände ([siehe unten](#locks-with-nuki-bridge-api)) werden von der Nuki-Brücke auf dem neuesten Stand gehalten, während der Rückruf aktiviert ist.
Rückrufe können auch manuell in jedem Browser mit folgenden URLs festgelegt und entfernt werden:

* set Callback: `` `http:// <bridge_ip>: <bridge_port> / callback / add? url = http% 3A% 2F% 2F <host_ip>% 3A <host_port>% 2Fnuki-api-bridge & token = <bridgeToken> `` `
* remove Callback: `` `http:// <bridge_ip>: <bridge_port> / callback / remove? id = <callback_id> & token = <bridgeToken>` ``
* liste alle Rückrufe auf: `` `http:// <bridge_ip>: <bridge_port> / callback / liste? token = <bridgeToken>` ``

### Zustände
Wenn Sie ioBroker.nuki2 erfolgreich eingerichtet haben, werden die folgenden Kanäle und Status erstellt:

#### Bridges (mit Nuki Bridge API)
Als Gerät wird eine Brücke mit dem Namensmuster ```bridge__<name of bridge>``` angelegt. Die folgenden Kanäle / Zustände werden in jeder Brücke erstellt:

| Kanal | Staat | Beschreibung |
|:------- |:----- |:----------- |
| Rückrufe | - | Rückrufe der Brücke |
| Rückrufe | liste | Liste eines Rückrufs (im JSON-Format) |
| Rückrufe ._ \ <UniqueIdOfCallback \> _ | - | Rückruf |
| Rückrufe ._ \ <UniqueIdOfCallback \> _ | \ _löschen | Aktion zum Entfernen des Rückrufs von Bridge |
| Rückrufe ._ \ <UniqueIdOfCallback \> _ | url | URL des Rückrufs |
| - | \ _connected | Flag, das angibt, ob die Bridge mit dem Nuki-Server verbunden ist oder nicht |
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

#### Locks (mit Nuki Bridge API)
Als Gerät wird ein Schloss mit dem Namensmuster ```door__<name of door>``` angelegt. Die folgenden Kanäle / Zustände werden in jeder Sperre erstellt (bei Verwendung der Nuki Bridge-API):

| Kanal | Staat | Beschreibung |
|:------- |:----- |:----------- |
| - | Aktion | Eine Aktion auf das Schloss auslösen |
| - | brücke | Brücke der Nuki |
| - | id | ID des Nuki |
| - | name | Name des Nuki |
| status | - | Aktueller Status der Sperre |
| status | batteryCritical ** | Gibt den kritischen Akkuladestand an |
| status | lockState ** | Aktueller Sperrzustand des Nuki |
| status | gesperrt ** | Anzeige, ob die Tür verriegelt ist |
| status | aktualisiert ** | Zeitstempel der letzten Aktualisierung |

_ ** markierte Zustände werden bei einer Nuki-Aktion aktualisiert, wenn der Rückruf gesetzt ist_

#### Locks (mit Nuki Web API)
Als Gerät wird ein Schloss mit dem Namensmuster ```door__<name of door>``` angelegt. Die folgenden Kanäle / Zustände werden in jeder Sperre erstellt (bei Verwendung der Nuki Web API):

| Kanal | Staat | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| - | Aktion | Eine Aktion auf das Schloss auslösen |
| - | id | ID des Nuki |
| - | name | Name des Nuki |
| status | - | Aktueller Status der Sperre |
| status | batteryCritical | Gibt den kritischen Akkuladestand an |
| status | geschlossen | Anzeige, ob die Tür geschlossen ist (boolescher Wert von doorState) |
| status | doorState | Aktueller Türzustand der Nuki |
| status | lastAction | Letzte ausgelöste Aktion |
| status | lockState | Aktueller Sperrzustand des Nuki |
| status | gesperrt | Anzeige, ob die Tür verriegelt ist |
| status | mode | Der Smartlock-Modus <br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| status | auslösen | Der Zustandsauslöser <br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| status | auslösen | Der Zustandsauslöser <br> {&quot;0&quot;: &quot;SYSTEM&quot;, &quot;1&quot;: &quot;MANUAL&quot;, &quot;2&quot;: &quot;BUTTON&quot;, &quot;3&quot;: &quot;AUTOMATIC&quot;, &quot;4&quot;: &quot;WEB&quot;, &quot;5&quot;: &quot;APP&quot;} `|
| config | - | Konfiguration des Schlosses |
| config | gpsLatitude | Latitude |
| config | gpsLongitude | Längengrad |
| config | AutoUnlatch | True, wenn die Tür beim Entriegeln entriegelt werden soll (Knopf) |
| config | pairingEnabled | True, wenn das Pairing über die Smartlock-Schaltfläche | zulässig ist |
| config | buttonEnabled | True, wenn die Schaltfläche auf dem Smartlock aktiviert ist |
| config | ledEnabled | True, wenn die LED am Smartlock aktiviert ist |
| config | ledBrightness | Die Helligkeit der LED: 0 (aus) bis 5 (max) |
| config | fobAction1 | Die Fob-Aktion, wenn die Taste einmal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | Die Fob-Aktion, wenn die Taste zweimal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Die Fob-Aktion, wenn die Taste dreimal gedrückt wird <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Die Fob-Aktion, wenn die Taste dreimal gedrückt wird <br> &quot;{&quot; 0 &quot;:&quot; NONE &quot;,&quot; 1 &quot;:&quot; UNLOCK &quot;,&quot; 2 &quot;:&quot; LOCK &quot;,&quot; 3 &quot;:&quot; LOCK_N_GO &quot;,&quot; 4 &quot;:&quot; INTELLIGENT &quot;}&quot; |
| config | werbemodus | Der Werbemodus (Batteriesparen) <br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | werbemodus | Der Werbemodus (Batteriesparen) <br> &quot;{&quot; 0 &quot;:&quot; AUTOMATIC &quot;,&quot; 1 &quot;:&quot; NORMAL &quot;,&quot; 2 &quot;:&quot; SLOW &quot;,&quot; 3 &quot;:&quot; SLOWEST &quot;}&quot; |
| config | homekitState | Der Homekit-Status <br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| config | homekitState | Der Homekit-Status <br> &quot;{&quot; 0 &quot;:&quot; NICHT VERFÜGBAR &quot;,&quot; 1 &quot;:&quot; DEAKTIVIERT &quot;,&quot; 2 &quot;:&quot; AKTIVIERT &quot;,&quot; 3 &quot;:&quot; AKTIVIERT &amp; PAARIERT &quot;}&quot; |
| config | timezoneId | Die ID der Zeitzone |
| config.advanced | - | Erweiterte Konfiguration des Schlosses |
| config.advanced | totalDegrees | Die absolute Gesamtposition in Grad, die während der Kalibrierung erreicht wurde |
| config.advanced | unlockedPositionOffsetDegrees | Versatz, der die entriegelte Position ändert |
| config.advanced | lockedPositionOffsetDegrees | Versatz, der die verriegelte Position ändert |
| config.advanced | singleLockedPositionOffsetDegrees | Versatz, der die einzelne verriegelte Position ändert |
| config.advanced | unlockedToLockedTransitionOffsetDegrees | Versatz, der die Position ändert, an der der Übergang von entsperrt zu gesperrt erfolgt |
| config.advanced | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| config.advanced | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| config.advanced | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird <br> &quot;{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| config.advanced | batterietyp | Der Typ der im Smart Lock enthaltenen Batterien <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| config.advanced | batterietyp | Der Typ der im Smart Lock enthaltenen Batterien <br> &quot;{&quot; 0 &quot;:&quot; ALKALI &quot;,&quot; 1 &quot;:&quot; AKKUMULATOR &quot;,&quot; 2 &quot;:&quot; LITHIUM &quot;}&quot; |
| config.advanced | automaticBatteryTypeDetection | Flag, das angibt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| config.advanced | unlatchDuration | Dauer in Sekunden zum Halten des Riegels in entriegelter Position |
| config.advanced | autoLockTimeout | Sekunden, bis sich das Smart Lock nach dem Entsperren von selbst wieder verriegelt. Kein automatisches erneutes Sperren, wenn der Wert 0 ist |
| Benutzer | - | Benutzer des Schlosses |
| users._userName_ | - | Benutzer _userName_ |
| users._userName_ | Typ | Die Art der Autorisierung <br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | Typ | Die Art der Autorisierung <br> &quot;{&quot; 0 &quot;:&quot; APP &quot;,&quot; 1 &quot;:&quot; BRIDGE &quot;,&quot; 2 &quot;:&quot; FOB &quot;,&quot; 3 &quot;:&quot; KEYPAD &quot;,&quot; 13 &quot;:&quot; KEYPAD CODE &quot;,&quot; 14 &quot;:&quot; Z- KEY &#39;, &quot;15&quot;:&#39; VIRTUAL &#39;} `|
| users._userName_ | id | Die eindeutige ID des Benutzers |
| users._userName_ | authId | Die Smartlock-Berechtigungs-ID |
| users._userName_ | aktiviert | True, wenn der Benutzer aktiviert ist |
| users._userName_ | remoteAllowed | True, wenn die Authentifizierung über Remotezugriff verfügt |
| users._userName_ | lockCount | Die Anzahl der Sperren |
| users._userName_ | dateLastActive | Das letzte aktive Datum |
| users._userName_ | dateCreated | Das Erstellungsdatum |
| users._userName_ | dateUpdated | Das Aktualisierungsdatum |
| users._userName_ | allowedFromDate | Das erlaubte ab Datum |
| users._userName_ | allowedWeekDays | Die erlaubten Wochentage <br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedWeekDays | Die erlaubten Wochentage <br> &quot;{64:&quot; Montag &quot;, 32:&quot; Dienstag &quot;, 16:&quot; Mittwoch &quot;, 8:&quot; Donnerstag &quot;, 4:&quot; Freitag &quot;, 2:&quot; Samstag &quot;, 1:&quot; Sonntag &quot;}&quot; |
| users._userName_ | allowedFromTime | Die zulässige Zeit (in Minuten ab Mitternacht) |
| users._userName_ | allowedUntilTime | Die erlaubte Zeit bis (in Minuten ab Mitternacht) |

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
    var status = (getState('nuki2.0.door__home_door.status.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki2.0.door__home_door.action', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__ Ersetzen Sie `nuki2.0.door__home_door.status.lockState` durch den lockState Ihres Schlosses! __ Sie können die Nachricht auch über `msg` anpassen.

### Lassen Sie sich von Alexa über Änderungen der Sperre informieren
Dies erfordert den ioBroker-Adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Um die Sprachausgabe von Alexa nutzen zu können, definieren wir eine Funktion ```say```. Platzieren Sie die folgende Funktion in einem Skript im "globalen" Ordner von ioBroker.javascript. WICHTIG: Ersetzen Sie Ihre ALEXA ID durch Ihre Alexa ID. Sie finden die Alexa ID im Objektbaum von ioBroker ```alexa2.0.Echo-Devices```.

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

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript und fügen Sie den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID # (auch # ersetzen) durch den Status, der den Sperrstatus enthält (z. B. ```nuki2.0.door__home_door.status.lockState```):

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
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

### Lassen Sie sich von Telegram über Schlossänderungen informieren
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

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript und fügen Sie den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID # (auch # ersetzen) durch den Status, der den Sperrstatus enthält (z. B. ```nuki2.0.door__home_door.status.lockState```):

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
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

HINWEIS: Wenn Sie sowohl das Alexa-Skript als auch das Telegrammskript verwenden, können Sie nur einen Listener für beide Aktionen definieren:

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
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
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

### 1.0.0 (2019-05-xx) [IN DEVELOPMENT]
- (Zefau) support for hashed token for hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-180/4/#heading--token) in the [nuki-bridge-api](https://github.com/Mik13/nuki-bridge-api/pull/9)
- (Zefau) bump to stable release

### 0.9.12 (2019-05-16)
- (Zefau) fixed an issue causing the same callback set multiple times (see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9#issuecomment-493148883))

### 0.9.11 (2019-05-13)
- (Zefau) added info-message when setting refresh rate to less than 10 seconds

### 0.9.10 (2019-05-10)
- (Zefau) added states to reflect current callbacks set on the Nuki Bridge as well as action to delete the callbacks
- (Zefau) updated dependency of `nuki-bridge-api` to v1.5.0

### 0.9.9 (2019-05-05)
- (Zefau) updated dependency of `nuki-bridge-api` to v1.4.0

### 0.9.8 (2019-05-05)
Thanks to [@systemofapwne](https://github.com/systemofapwne) for testing and identifying quite a few bugs.

- (Zefau) added delay between requests / actions applied on the Nuki Bridge (to prevent overload, see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))
- (Zefau) fixed an issue causing the adapter to crash when polling was enabled, but Web API is not used (see [#10](https://github.com/Zefau/ioBroker.nuki2/issues/10))

### 0.9.7 (2019-05-05)
- (Zefau) added verification if callback URL is already added on Nuki Bridge (see [#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))

### 0.9.6 (2019-05-03)
- (Zefau) added Web Adapter as dependency
- (Zefau) add warning when opening web / log view but Nuki Web API has not been setup
- (Zefau) removed empty folders when Nuki Web API has not been setup 
- (Zefau) fixed an issue with Webhook when time for refreshing all settings was set ([#9](https://github.com/Zefau/ioBroker.nuki2/issues/9))

### 0.9.4 / 0.9.5 (2019-03-22)
- (Zefau) Useless versions to fix incorrect configuration in `io-package.json`

### 0.9.3 (2019-03-22)
- (Zefau) Limited log retrieval to 1000 entries

### 0.9.2 (2019-02-11)
- (Zefau) Updated dependency

### 0.9.1 (2019-02-10)
- (Zefau) Added Web Interface to view logs

### 0.9.0 (2019-02-09)
- (Zefau) Using both Bridge API and Web API
- (Zefau) Support for multiple bridges
- (Zefau) Support for discovery within admin panel
- (Zefau) Additional states for bridges and better separation between software / hardware bridge
  - retrieve the basic and advanced configuration from your lock
  - retrieve all users having access to your lock

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