---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nello/README.md
title: ioBroker.nello
hash: +ujTBqRIPaMS7TG7Sl3TND/WYFxQWQ7fM02PlrlhgCk=
---
![Logo](../../../en/adapterref/iobroker.nello/admin/nello.png)

![Anzahl der Installationen](http://iobroker.live/badges/nello-installed.svg)
![stabile Version](http://iobroker.live/badges/nello-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nello.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.nello.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.nello.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Zefau/ioBroker.nello.svg)
![NPM](https://nodei.co/npm/iobroker.nello.png?downloads=true)

# IoBroker.nello nello one verbindet Ihre Gegensprechanlage mit Ihrem Smartphone und WLAN. Dieser Adapter verbindet Ihr Nello One mit dem offiziellen API (https://nellopublicapi.docs.apiary.io/) mit ioBroker.
Entwickler finden die Javascript-Implementierung der API nello.io unter https://github.com/Zefau/nello.io.

## [Deutsche Liesmich / Deutsche Anleitung](https://github.com/Zefau/ioBroker.nello/blob/master/README.de.md)
**Inhaltsverzeichnis**

1. [Setup-Anweisungen (Quick Setup)] (# Quick-Setup)
2. [Setup-Anweisungen (Advanced Setup)] (# Advanced-Setup)
3. [Nutzung / Aktionen] (# Nutzung - Aktionen)
   1. [Tür öffnen] (# Tür öffnen)
   2. [Hinzufügen eines Zeitfensters] (# Hinzufügen eines neuen Zeitfensters)
   3. [Zeitfenster löschen] (# ein Zeitfenster löschen)
4. [Smart Home / Alexa-Integration mit ioBroker.javascript] (# smart-home - alexa-integration-using-iobrokerjavascript)
   1. [Tür mit Alexa öffnen] (# open-door-using-alexa)
   2. [Lassen Sie sich von Alexa über den Türring informieren] (# let-alexa-inform-you-about-door-ring)
   3. [Lassen Sie sich von farbigen Lampen über den Türring informieren] (# lassen Sie farbige Lampen über den Türring informieren)
5. [Credits] (# credits)
6. [Changelog] (# changelog)
7. [Lizenz] (# Lizenz)

## Anweisungen zum Einrichten
### Quick Setup
Die Nello-Authentifizierungs-API ist für die Authentifizierung aller Nello-Client-Apps verantwortlich. Dieser Dienst folgt OAuth2 als Authentifizierungsschema zur Authentifizierung einer App / eines Benutzers. Weitere Informationen zum OAuth2-Standard finden Sie hier: https://oauth.net/2/.
Um diesen Dienst verwenden zu können, müssen die Anmeldeinformationen des Clients von der nello auth-Benutzeroberfläche des Administrators abgerufen werden: https://auth.nello.io/admin. Bitte beachten Sie, dass Sie vorerst nur ein Paar client_id und client_secret erhalten können. Sie bestehen aus einer client_id und einem client_secret.

1. Generieren Sie die Client-ID und das Client-Geheimnis unter https://auth.nello.io/admin
2. Geben Sie in den Adaptereinstellungen für den ioBroker.nello sowohl die Client-ID als auch das Client Secret ein
3. Klicken Sie auf die Schaltfläche "Get Token", um ein Token zu erstellen
4. Speichern Sie und genießen Sie den Adapter

Bei dieser schnellen Einrichtung werden Ihre Standorte (alle verfügbaren Türen) von der Nello-API einschließlich der jeweiligen Adresse abgerufen. Außerdem werden die zugewiesenen Zeitfenster der Standorte abgerufen. Zusätzlich können Sie die Tür mit dieser Grundeinstellung öffnen.
Um Ereignisse (Türklingelringe) zu empfangen, müssen Sie den erweiterten Einstellungen folgen.

#### Log
Wenn Sie ioBroker.nello erfolgreich eingerichtet haben, finden Sie Folgendes im ioBroker-Protokoll:

```
nello.0	2018-11-24 21:29:48.132	info	Updating time windows of location XXXXX.
nello.0	2018-11-24 21:29:47.905	info	Updating location: {"location_id":"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX","address":{"number":"X","country":"XXXXX","street":"XXXXX ","zip":"XXXXX","city":"XXXXX","state":""}}
nello.0	2018-11-24 21:29:47.342	info	starting. Version X.X.X in /opt/iobroker/node_modules/iobroker.nello, node: vX.XX.X
```

#### Zustände
Wenn Sie ioBroker.nello erfolgreich eingerichtet haben, finden Sie Ihre Türen als Geräte innerhalb von "** nello.0. **". Das Format einer Tür ist _xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_. In jedem Gerät werden die folgenden Kanäle und Zustände erstellt:

| Kanal | Zustand | Beschreibung |
|:------- |:----- |:------------- |
| Adresse | - | Adressdaten des Standorts |
| Adresse | Adresse | Vollständige Adresse des Standorts |
| Adresse | Stadt | Stadt des Standorts |
| Adresse | Land | Land des Standorts |
| Adresse | Zustand | Zustand des Ortes |
| Adresse | Straße | Straße mit der Nummer des Standorts |
| Adresse | Straßenname | Straßenname des Standorts |
| Adresse | Straßennummer | Straßennummer des Standorts |
| Adresse | zip | Postleitzahl des Standorts |
| timeWindows | - | Zeitfenster des Standorts |
| timeWindows | indexedTimeWindows | Index aller Zeitfenster |
| timeWindows | deleteAllTimeWindows | Löschen aller Zeitfenster |
| timeWindows | **createTimeWindow** \ * | JSON-Objekt zum Erstellen eines neuen Zeitfensters ([Dokumentation](#adding-a-new-time-window)) |
| timeWindows.0000000000000000000 | - | Zeitfenster: Beschreibung des Zeitfensters |
| timeWindows.0000000000000000000 | aktiviert | Geben Sie an, ob das Zeitfenster aktiviert ist |
| timeWindows.0000000000000000000 | icalObj | JSON-Objekt der Kalenderdaten |
| timeWindows.0000000000000000000 | icalRaw | Text der Kalenderdaten im iCal-Format |
| timeWindows.0000000000000000000 | id | ID des Zeitfensters |
| timeWindows.0000000000000000000 | Bild | (nicht verwendet) |
| timeWindows.0000000000000000000 | name | Name des Zeitfensters |
| timeWindows.0000000000000000000 | Zustand | Zustand |
| timeWindows.0000000000000000000 | **deleteTimeWindow** \ * | Dieses Zeitfenster löschen |
| - | **& # 95; openDoor** \ * | Offene Tür von Standort XXXXX |
| - | id | ID des Standorts XXXXX |
| - | refreshDateTime | Letzte Aktualisierung (DateTime) des Speicherorts XXXXX |
| - | RefreshTimestamp | Letzte Aktualisierung (Zeitstempel) von Standort XXXXX |

\ * _hellere Zustände lösen eine Aktion aus, wenn sie geändert werden_

** Anmerkung: Sie sehen diese Zustände nur dann, wenn Sie ioBroker.nello schnell eingerichtet haben. **

### Erweitertes Setup
#### Option 1: Benutzerdefinierte URL für ioBroker.cloud / ioBroker.iot (empfohlen)
Um Ereignisse (Türklingelringe) zu empfangen, wird empfohlen, entweder den Adapter ioBroker.cloud oder ioBroker.iot zu verwenden.
Der ioBroker.cloud / ioBroker.iot-Adpater empfängt das Ereignis von nello und schreibt es in einen Status, der vom ioBroker.nello-Adapter lesbar ist.

##### IoBroker.iot
1. Gehen Sie zu den Adaptereinstellungen von ioBroker.iot und navigieren Sie zur Registerkarte _Services und IFTTT_.
2. Fügen Sie der "_White-Liste für Dienste_" den Begriff "_nello_" hinzu, und kopieren Sie den Link für die benutzerdefinierten Dienste ("_Use folgenden Link für benutzerdefinierten Service_"). Dies sieht wie folgt aus: `` https://service.iobroker.in / v1 / iotService? service = custom_ <SERVICE_NAME> &key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&user=email@domain.com&data= <some_text> `` `.

   ![Schritt 2](../../../en/adapterref/iobroker.nello/screenshots/step-2.jpg)

3. Ersetzen Sie `` `custom_ <SERVICE_NAME>` `` durch den Dienstnamen `` `custom_nello``` (stellen Sie sicher, dass der Begriff, der an` `custom_``` angehängt ist, mit dem Whitelist-Wort in Schritt 2 übereinstimmt. Entfernen Sie außerdem `` `& data = <SOME_TEXT>` ``, da dies nicht erforderlich ist.
4. Gehen Sie zur **nello-Adapterkonfiguration** und fügen Sie den Link in "_ioBroker.iot Service URL_" (in Option 1) ein.

   ![Schritt 4](../../../en/adapterref/iobroker.nello/screenshots/step-4.jpg)

5. Speichern Sie die Einstellungen des nello Adapters und warten Sie, bis der Adapter neu gestartet wurde. Dann klingeln Sie an Ihrer Tür und vergewissern Sie sich, dass der Status von ioBroker.iot erstellt wurde. In den ioBroker-Objekten finden Sie den Zustand `` `custom_nello``` über` `iot.0.services```.

   ![Schritt 6](../../../en/adapterref/iobroker.nello/screenshots/step-6.jpg)

6. Wenn der Status erfolgreich erstellt wurde, starten Sie den nello Adapter erneut, um sicherzustellen, dass der nello Adapter diesen neu erstellten iot-Status abonniert

##### IoBroker.cloud
1. Gehen Sie zu den Adaptereinstellungen von ioBroker.cloud und navigieren Sie zur Registerkarte _Services und IFTTT_.
2. Fügen Sie der "_White-Liste für Services_" den Begriff "_nello_" hinzu, und kopieren Sie den Link für die benutzerdefinierten Services ("_Use folgenden Link für benutzerdefinierten Service_") / `` `.
3. Fügen Sie `` `custom_nello``` hinzu (stellen Sie sicher, dass der Begriff, der an` `` custom_``` angehängt ist, mit dem in Schritt 2 Whitelist-Wort übereinstimmt.
4. Fügen Sie Ihren API-Schlüssel hinzu, sodass die URL schließlich wie folgt aussieht: `` `https:// iobroker.net / service / custom_nello / xxxxxx```.
5. Gehen Sie zur **nello-Adapterkonfiguration** und fügen Sie den Link in "_ioBroker.iot Service URL_" (in Option 1) ein.
6. Speichern Sie die Einstellungen des nello Adapters und warten Sie, bis der Adapter neu gestartet wurde. Dann klingeln Sie an Ihrer Tür und vergewissern Sie sich, dass der Status von ioBroker.cloud erstellt wurde. Sie finden den Zustand `` custom_nello``` in den ioBroker-Objekten über `` cloud.0.services```.
7. Wenn der Zustand erfolgreich erstellt wurde, starten Sie den nello Adapter erneut, um sicherzustellen, dass der nello Adapter diesen neu erstellten Cloud-Status abonniert

Option 2: DynDNS-URL
Um Ereignisse (Türklingelringe) zu empfangen, können Sie alternativ eine externe URL (mit Port) in den Adaptereinstellungen des ioBroker.nello angeben.
Diese URL (inkl. Port) wird an die Nello-API gesendet und registriert. Wenn ein Türklingelring von der API registriert wird, überträgt die API diese Informationen an die angegebene URL. Weitere Informationen finden Sie unter https://en.wikipedia.org/wiki/Webhook.
Wenn Sie keine DynDNS-Adresse haben und keine Ahnung haben, von was für einem Scheiß ich rede, lesen Sie bitte https://www.howtogeek.com/66438/how-to-easily-access-your-home-network-from-anywhere- mit-ddns /.

1. Platzieren Sie die externe DynDNS-Adresse einschließlich eines Ports Ihrer Wahl in den Adaptereinstellungen des ioBroker.nello
2. Öffnen Sie den Port Ihrer Wahl in Ihrem Router und leiten Sie ihn an den ioBroker weiter
3. Fertig Sie haben jetzt zusätzliche Zustände in Ihrem Nello-Baum innerhalb des Kanals "events" und alle Ereignisse werden in einen Status mit dem Namen "feed" geschrieben.

#### Log
Unabhängig von der von Ihnen gewählten Option finden Sie bei erfolgreichem Advanced-Setup von ioBroker.nello im ioBroker-Protokoll zusätzlich Folgendes:

```
nello.0	2018-11-24 21:29:48.220	info	Listener attached to uri https://XXXX.XXXXX.XX:YYYY.
```

Falls ein Ereignis vom Webook-Listener erkannt wurde, finden Sie diese Einträge im ioBroker-Protokoll:

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -deny-).
```

** deny **: Wenn nello ein Klingelzeichen erkennt, aber weder ein Zeitfenster noch ein Homezone-Ereignis die Tür geöffnet hat.

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -swipe-).
```

** Wischen **: Wenn sich die Tür von einem autorisierten Benutzer öffnet.

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -geo-).
```

** geo **: Wenn die Tür wegen der Homezone-Unlock-Funktion (mit einem Klingelzeichen) geöffnet wird.

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -tw-).
```

** tw **: Wenn die Tür aufgrund eines Zeitfensters (mit einem Klingelzeichen) geöffnet wird.

#### Zustände
Wenn Sie ioBroker.nello erfolgreich erweitert haben, werden die folgenden zusätzlichen Kanäle und Status erstellt:

| Kanal | Zustand | Beschreibung |
|:------- |:----- |:------------- |
| Veranstaltungen | - | Ereignisse des Ortes |
| Veranstaltungen | feed | Aktivitäts-Feed / Ereignisverlauf |
| Veranstaltungen | refreshDateTime | DateTime des letzten Ereignisses |
| Veranstaltungen | RefreshTimestamp | Zeitstempel des letzten Ereignisses |

** Anmerkung: Sie sehen diese Zustände nur dann _, wenn Sie ioBroker.nello erfolgreich vorgerüstet haben UND ein erstes Ereignis als erkannt erkannt wurde (jemand hat bei Ihnen angerufen)!

Der Status "Feed" liefert eine JSON aller Ereignisse, die vom Webhook registriert wurden. Hierbei handelt es sich um ein Array von Objekten, bei dem jedes Objekt die folgenden Werte bereitstellt (Einzelheiten finden Sie unter https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/add-/-update-webhook):

- **Aktion** ablehnen, streichen, tw oder geo
- **Daten**:
    - location_id
    - Zeitstempel
    - user_id (nur Aktionen swipe, tw oder geo)
    - name (nur Aktionen swipe, tw oder geo)

## Verwendung / Aktionen
### Offene Tür
Um die Tür Ihres Nello zu öffnen, drücken Sie die Taste des Bundesstaates §§JJJJJ0.

### Hinzufügen eines neuen Zeitfensters Fügen Sie zum Hinzufügen eines neuen Zeitfensters den Inhalt in den Status ```timeWindows.createTimeWindow``` ein. Das folgende Format wird erwartet:
```
{"name":"<NAME>","ical":"<iCal-String>"}
```

Das Format des iCal-Strings finden Sie in der Nello API-Dokumentation (https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/create-a-new-time-window). **Es ist wichtig, die einzelnen Elemente mit den ```\r\n```** zu trennen.

Beispiel eines Zeitfensters:

```
{"name":"Cleaner","ical":"BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nDTSTART:20190101T163000Z\r\nDTEND:20190101T170000Z\r\nSUMMARY:Cleaner\r\nEND:VEVENT\r\nEND:VCALENDAR"}
```

### Zeitfenster löschen
Um ein Zeitfenster zu löschen, drücken Sie die Schaltfläche innerhalb des Objektbaums des jeweiligen Zeitfensters.

## Smart Home / Alexa-Integration mit ioBroker.javascript
Einige Beispiele für eine mögliche Integration in Ihr Smart Home.

### Tür mit Alexa öffnen
Dies erfordert den ioBroker-Adapter ioBroker.cloud (https://github.com/ioBroker/ioBroker.cloud).

Speichern Sie die folgende Funktion innerhalb eines Skripts im Ordner "global" auf der Registerkarte "Scripts" von ioBroker:

```javascript
/**
 * Register node in Cloud Adapter
 *
 * @param   {string}    node        Node to be published
 * @param   {string}    label       Name / label of the node within Cloud Adapter
 * @param   {object}    settings    (optional) Extra settings
 * @param   {string}    type        (optional) Type of node, e.g. LIGHT, SWITCH, THERMOSTAT, ACTIVITY_TRIGGER, SCENE_TRIGGER, SMARTPLUG, SMARTLOCK, CAMERA
 * @param   {string}    byOn        (optional) Default when turning on
 * @return  void
 */
function cloud(node, label, settings = {})
{
    log('Published '+node+' as '+label+' in Cloud Adapter.');

    settings = typeof settings === 'string' ? {type: settings} : settings;
    extendObject(node, {common: {smartName: {en: label, smartType: settings.type || 'SWITCH', byON: settings.byON || ''}}});
}
```

_ (aktualisiert am 2018-11-22 und falsche falsche Einstellungen korrigiert) _

Sie können diese Funktion für jeden Status in der ioBroker-Objektstruktur verwenden, um den Status im ioBroker.cloud-Adapter zu registrieren und in Alexa zu verwenden.
** WICHTIG **: Gehen Sie in die Adaptereinstellungen von ioBroker.javascript und markieren Sie das Kontrollkästchen "Befehl setObject aktivieren"!

Erstellen Sie nun ein neues Skript im Ordner "common" mit der Funktion:

```javascript
cloud('nello.0.#YOUR DOOR ID#._openDoor', 'Tür öffnen');
```

Ersetzen Sie **# IHRE TÜR-ID #** (auch #) durch die ID der Tür, die Sie öffnen möchten. Sie finden die ID im Statusbaum ioBroker.nello (Registerkarte "Objekte" von ioBroker).

Suchen / entdecken Sie neue Geräte in Ihrer Alexa-App und erstellen Sie eine Routine in der Alexa-App (z. B. "Alexa, open door"), und weisen Sie ihr den neu entdeckten Status zu. Fertig! Jetzt können Sie Alexa sagen, dass Sie Ihre Tür für Sie öffnen sollen.

### Lassen Sie sich von Alexa über den Türring informieren
Dies erfordert den ioBroker-Adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Um die Sprachausgabe von Alexa zu verwenden, definieren wir eine Funktion ```say```. Platzieren Sie die folgende Funktion in einem Skript im "globalen" Ordner von ioBroker.javascript (Sie können es in den gleichen Ordner wie oben einfügen). **WICHTIG** Ersetzen Sie #YOUR ALEXA ID # (auch #) durch Ihre Alexa ID. Sie finden die Alexa-ID im Objektbaum von ioBroker ```alexa2.0.Echo-Devices```.

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

_ (aktualisiert am 18.08.2011 zur Unterstützung der Sprachausgabe von mehreren alexa-Geräten gleichzeitig) _

Sie können diese Funktion in ioBroker.javascript verwenden, um einen Satz mit Alexa ```say('Hello World')``` oder ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` für die Sprachausgabe von mehreren Geräten zu sagen.

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript (oder verwenden Sie das oben erstellte), und fügen Sie den folgenden Listener hinzu:

```javascript
var L = {
   'actionRingUnknown': 'Es hat geklingelt',
   'actionOpenName': '%name% hat die Tür geöffnet',
   'actionOpenGeo': '%name% hat das Haus betreten',
   'actionOpen': 'Die Haustür wurde geöffnet'
};

on({id: 'nello.0.ID.events.feed', change: 'any'}, function(obj)
{
   var events = JSON.parse(obj.state.val);
   if (events.length === 0) return;

   var event = events[events.length-1];
   if (event.action == 'deny')
      say(L.actionRingUnknown);

   else if (event.action == 'swipe')
      say(L.actionOpenName.replace(/%name%/gi, event.data.name));

   else if (event.action == 'geo')
      say(L.actionOpenGeo.replace(/%name%/gi, event.data.name));

   else
      say(L.actionOpen);
});
```

_ (aktualisiert am 02.01.01, um auch die Geo-Option mit einer bestimmten Alexa-Phrase anzuzeigen) _

Basierend auf der Aktion der Veranstaltung informiert Sie Alexa über das Öffnen der Tür oder das Erkennen der Türklingel.
** WICHTIG **: Ersetzen Sie #YOUR DOOR ID # (auch #) durch Ihre Nello-Tür-ID.

### Lassen Sie sich von farbigen Lampen über den Türring informieren
Diese Funktionalität erfordert einen Adapter, der Farb- / RGB-Lampen setzen kann, z. ioBroker.hue (https://github.com/ioBroker/ioBroker.hue).

Um die Farblampen verwenden zu können, müssen die Funktionen ```color``` und ```colors``` definiert werden. Platzieren Sie die folgenden Funktionen in einem Skript im "globalen" Ordner von ioBroker.javascript (Sie können es in den gleichen Ordner wie oben einfügen):

```javascript
/**
 * Visualize a message using a color / hue.
 *
 * @param       {string|array}  devices         Device(s) the color shall be set
 * @param       {object}        hue             Color code to bet set
 * @param       {integer}       hue.r           (optional) Red part of the color to be set
 * @param       {integer}       hue.g           (optional) Green part of the color to be set
 * @param       {integer}       hue.b           (optional) Blue part of the color to be set
 * @param       {integer}       hue.w           (optional) White part of the color to be set
 * @param       {integer}       hue.bri         (optional) Brightness part of the color to be set
 * @param       {integer}       hue.rgb         (optional) All RGB parts of the color to be set
 * @return      void
 *
 */
function color(devices, hue)
{
    devices = typeof devices === 'string' ? [devices] : devices;
    devices.forEach(function(device)
    {
	    ['b', 'g', 'w', 'r', 'bri', 'rgb'].forEach(function(key)
    	{
    		if (hue[key] !== undefined)
    			setState(device + '.' + key, hue[key]);
    	});
    });
}
```

```javascript
/**
 * Append multiple messages using a delay to create a light sequence.
 *
 * @param       {string|array}  devices         Device(s) the color shall be set
 * @param       {array}         hues            Color code to bet set
 * @param       {number}        delay           (optional) Delay between steps
 * @param       {number}        start           (optional) Delayed start
 * @return      {number}                        Total delay used
 *
 */
function colors(devices, hues, delay = 3000, start = 0)
{
    var delayed = start;
    devices = typeof devices === 'string' ? [devices] : devices;
    devices.forEach(function(device)
    {
        // get initial state and colors
        var defaults = {};
        ['on', 'xy', 'bri'].forEach(function(initial) {defaults[initial] = getState(device + '.' + initial).val});

        // turn lights on if currently off
        if (defaults.on !== true)
        {
            setState(device + '.on', true);
            delayed += 800;
        }

        // loop through colors
        hues.forEach(function(hue, i)
    	{
            delayed += delay;
            setTimeout(function()
            {
                color(device, hue);
            }, delayed);
    	});

        // restore initial states
        delayed += 1000;
        setTimeout(function()
        {
            setState(device + '.xy', defaults['xy']);
            if (defaults['on'] === true)
                setState(device + '.bri', defaults['bri']);
        }, delayed);

        // turn off again (if it was off)
        if (defaults['on'] === false)
        {
            delayed += 2000;
            setTimeout(function() {setState(device + '.on', false)}, delayed); // delayed so colors is set before turned off
        }
    });

    return delayed;
}
```

_ (aktualisiert am 2019-01-20, um Problem zu beheben [# 11](https://github.com/Zefau/ioBroker.nello/issues/11)) _

Sie können diese Funktionen in ioBroker.javascript verwenden, um jede Lampe, z. nach ```color('hue.0.Philips_hue.Lamp', {'r': 0, 'g': 255, 'b': 0})``` (Farbe grün) oder ```color(['hue.0.Philips_hue.Lamp1', 'hue.0.Philips_hue.Lamp2'], {'r': 0, 'g': 255, 'b': 0})```, um mehrere Geräte einzufärben.

Erstellen Sie ein Skript im Ordner "common" von ioBroker.javascript (oder verwenden Sie das oben erstellte), und fügen Sie den folgenden Listener hinzu:

```javascript
var lamp = '#YOUR LAMP#'; // e.g. hue.0.Philips_hue.Lamp
var rgb = {
   'actionRingUnknown': {'r': 255, 'g': 0, 'b': 0, 'bri': 255},
   'actionOpenName': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'actionOpenGeo': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'actionOpen': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'reset': {'r': 255, 'g': 255, 'b': 255, 'bri': 255},
};

on({id: 'nello.0.#YOUR DOOR ID#.events.feed', change: 'any'}, function(obj)
{
    var events = JSON.parse(obj.state.val);
    if (events.length === 0) return;

    var event = events[events.length-1];
    if (event.action == 'deny')
        colors(lamp, [
            rgb.actionRingUnknown,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else if (event.action == 'swipe')
        colors(lamp, [
            rgb.actionOpenName,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else if (event.action == 'geo')
        colors(lamp, [
            rgb.actionOpenGeo,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else
        colors(lamp, [
            rgb.actionOpen,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);
});
```

Basierend auf der Aktion des Ereignisses werden die Lampen mit den definierten Werten eingefärbt.
** WICHTIG **: Ersetzen Sie ** # YOUR LAMP # ** (auch #) durch den Status der Lampe, die Sie färben möchten. Ersetzen Sie ** # IHRE TÜR-ID # ** (auch #) durch Ihre Nello-Tür-ID.

## Credits
Icons von <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> von <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com werden</a> von <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons VON 3.0" target="_blank">CC 3.0 BY</a> lizenziert

## Changelog

### 2.0.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#17](https://github.com/Zefau/ioBroker.nello/pull/17)) and Update CI testing ([#19](https://github.com/Zefau/ioBroker.nello/pull/19))

### 2.0.3 (2019-03-03)
- (zefau) added folder `.events.latest` with states `action`, `twName`, `userId` and `userName` reflecting the information of the latest event

### 2.0.2 (2019-02-09)
- (zefau) fixed error incorrectly stating a missing token

### 2.0.1 (2019-02-01)
- (zefau) added error stack trace in log debug output
- ([@ldittmar81](https://github.com/ldittmar81)) added support for gulp

### 2.0.0 (2019-01-27)
- (zefau) added visual timeline of nello events
- (zefau) support for [ioBroker compact mode](https://forum.iobroker.net/viewtopic.php?f=24&t=20387#p213466)
- (zefau) updated API dependency

### 1.x.x
For earlier release, [please see Github branch for v1](https://github.com/Zefau/ioBroker.nello/tree/v1#changelog).

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