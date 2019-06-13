---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/objectsschema.md
title: Kernkonzept
hash: /+zjF1sxTW9nTd9/4ssdJVC89TA4xSYZjT8bNVA6QHo=
---
# Kernkonzept
In ioBroker gibt es zwei grundsätzlich verschiedene Datentypen. Sogenannte **Staaten** (`states`) und **Objekte**

Objekte repräsentieren sich selten ändernde und größere Daten, wie Metadaten Ihrer Systemgeräte, Konfigurationen und zusätzliche Dateien. Jedes Objekt muss ein Attribut "Typ" haben. Im Folgenden erfahren Sie, welche Objekttypen verfügbar sind und welche obligatorischen Attribute ein Objekt eines bestimmten Typs benötigt. Funktionen wie setObject, getObject, ... werden Ihnen vom Adaptermodul zur Verfügung gestellt.

Zustände stellen häufig sich ändernde Daten in Ihrem System dar, wie z. Wenn eine Lampe ein- oder ausgeschaltet ist, wenn ein Bewegungsmelder eine Bewegung festgestellt hat, die Temperatur Ihres Wohnzimmers oder wenn die Taste einer Fernbedienung gedrückt wird. Im Gegensatz zu Objekten können Zustände verwendet werden, um Aktionen auszulösen, und Zustände können Verlaufsdaten erstellen. Um mit Zuständen zu arbeiten, gibt es im Adaptermodul verschiedene Funktionen wie setState, getState und so weiter.

Für jeden Staat muss auch ein entsprechendes Objekt mit `type=state` existieren.

In den folgenden Kapiteln wird das Datenbankschema beschrieben.

## IDs
ID ist eine Zeichenfolge mit einer maximalen Länge von 240 Byte, hierarchisch strukturiert, Ebenen durch Punkte getrennt.

Folgende Zeichen dürfen in IDs nicht verwendet werden: `[]*,;'"&#96;<>\\?`.

Es wird nicht empfohlen, auch `^$()/` zu verwenden.

Die ID hat verschiedene Ebenen. Jede Ebene wird durch einen Punkt bestimmt. Beispiel: `system.adapter.admin.0`

- `system` - ist der Namespace für Systemobjekte
- `adapter` - Namespace für Adapterkonfigurationen
- `admin` - Adaptername
- `0` - Adapterinstanz

Oder ein anderes Beispiel `hm-rpc.1.ABC110022.2.VALUE`:

- `hm-rpc` - ist der Name des Adapters
- `1` - Adapterinstanz
- `ABC110022` - Geräteadresse
- `2` - Kanalname
- `VALUE` - Name des Zustands

## Namespaces
* `system.` - Systemobjekte und -zustände
* `system.host.` - Steuerungsprozesse
* `system.config.` - Systemeinstellungen wie Standardsprache
* `system.meta.` - System-Metadaten
* `system.user.` - Benutzer
* `system.group.` - Gruppen
* `system.adapter. <Adaptername>` - Standardkonfiguration eines Adapters
* `<Adaptername> .` - Objekte für einen bestimmten Adapter.
* `<Adaptername> .meta.` - Gemeinsame Metadaten, die von allen Instanzen dieses Adapters verwendet werden
* `<Adaptername>. <Instanznummer> .` - Ein Adapterinstanz-Namespace
* `enum.` - Aufzählungen
* `history.` - Verlaufsdaten
* `scripts.` - Script Engine Scripts
* `scripts.js.` - Javascript Script Engine Scripts
* `scripts.py.` - Skripte der Python Script Engine (zukünftig)

### Namespace system.config.
```
{
    _id:   id,
    type: 'config',
    common: {
        language:     'en',         // Default language for adapters. Adapters can use different values.
        tempUnit:     '°C',         // Default temperature units.
        currency:     '€',          // Default currency sign.
        dateFormat:   'DD.MM.YYYY'  // Default date format.
        isFloatComma: true,         // Default float divider ('.' - false, ',' - true)
        "activeRepo": "online1",    // active repository
        "listRepo": {               // list of possible repositories
            "default": "conf/sources-dist.json",
            "online1": "https://raw.githubusercontent.com/ioBroker/ioBroker.nodejs/master/conf/sources-dist.json"
        }
    }
}
```

### Namespace system.host. &lt; Hostname &gt;
```
{
    _id:   id,
    type: 'host',
    common: {
        name:       id,
        process:    title,           // iobroker.ctrl
        version:    version,         // Vx.xx.xx
        platform:   'javascript/Node.js',
        cmd:        process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
        hostname:   hostname,
        address:    ipArr,
        defaultIP:  ???
    },
    native: {
        process: {
            title:      process.title,
            pid:        process.pid,
            versions:   process.versions,
            env:        process.env
        },
        os: {
            hostname:   hostname,
            type:       os.type(),
            platform:   os.platform(),
            arch:       os.arch(),
            release:    os.release(),
            uptime:     os.uptime(),
            endianness: os.endianness(),
            tmpdir:     os.tmpdir()
        },
        hardware: {
            cpus:       os.cpus(),
            totalmem:   os.totalmem(),
            networkInterfaces: os.networkInterfaces()
        }
    }
};
```

<a id="states"></a>

## Zustände
Die Methode getState und das Ereignis stateChange liefern ein Objekt mit allen Attributen außer expire

für die `setState`-Methode ist alles außer `val` optional, `from` wird automatisch durch die `setState`-Methode festgelegt. `ack` sind standardmäßig false, `ts` und `lc` sind wie erwartet eingestellt

Attribute für das Objekt getState / stateChange / setState:

* `val` - der tatsächliche Wert - kann ein beliebiger Typ sein, der JSON-" codierbar "ist
* `ack` - ein Boolesches Flag, das angibt, ob das Zielsystem den Wert bestätigt hat
* `ts` - ein Unix-Zeitstempel, der die letzte Aktualisierung des Status angibt (in Millisekunden)
* `lc` - ein Unix-Zeitstempel, der die letzte Änderung des tatsächlichen Zustands anzeigt (in Millisekunden)
* `from` - Adapterinstanz, die den` setState` ausgeführt hat
* `user` - Benutzername, der den Wert festlegt
* `expire` - ein ganzzahliger Wert, mit dem Zustände festgelegt werden können, die nach einer bestimmten Anzahl von Sekunden ablaufen. Kann nur mit `setValue` verwendet werden. Nachdem der Wert abgelaufen ist, verschwindet er aus redisDB.
* `c` - Kommentar zu dieser Zustandsänderung.
* `q` - Qualität. Nummer mit folgenden Zuständen:

```
  0x00 - 00000000 - good (can be undefined or null)
  0x01 - 00000001 - general bad, general problem
  0x02 - 00000010 - no connection problem

  0x10 - 00010000 - substitute value from controller
  0x40 - 00100000 - substitute value from device or instance
  0x80 - 01000000 - substitute value from sensor

  0x11 - 01000001 - general problem by instance
  0x41 - 01000001 - general problem by device
  0x81 - 10000001 - general problem by sensor

  0x12 - 00010010 - instance not connected
  0x42 - 01000010 - device not connected
  0x82 - 10000010 - sensor not connected

  0x44 - 01000100 - device reports error
  0x84 - 10000100 - sensor reports error
```

Jeder *Zustand* muss durch ein Objekt vom Typ Zustand dargestellt werden, das Metadaten für den Zustand enthält. Siehe unten.

## Objekte
### Pflichtattribute
Folgende Attribute müssen in jedem Objekt vorhanden sein:

* `_id`
* `type` - siehe unten für mögliche Werte
* `common` - Ein Objekt, das ioBroker-spezifische Abstraktionseigenschaften enthält
* `native` - Ein Objekt, das kongruente Eigenschaften des Zielsystems enthält

### Optionale Attribute
* `common.name` - der Name des Objekts (optional, aber unbedingt empfohlen, um es auszufüllen)

### Baumstruktur
Die Baumstruktur wird automatisch nach Namen zusammengestellt. Z.B. ```system.adapter.0.admin``` ist Elternteil von `system.adapter.0.admin.uptime`. Verwenden Sie diese Namenskonvention mit Punkt "." Als Ebenenteiler.

### Objekttypen
* `state` - Elternteil sollte vom Typ Kanal, Gerät, Instanz oder Host sein
* `channel` - Objekt zum Gruppieren eines oder mehrerer Zustände. Eltern sollten Gerät sein.
* `device` - Objekt zum Gruppieren eines oder mehrerer Kanäle oder Zustände. Sollte keinen übergeordneten außer dem Adapterinstanz-Namespace haben.
* `enum` - Objekte, die ein Array in common.members enthalten, das auf Zustände, Kanäle, Geräte oder Dateien verweist. Aufzählungen können eine übergeordnete Aufzählung haben (Baumstruktur möglich)
* `host` - Ein Host, der einen Controller-Prozess ausführt
* `adapter` - die Standardkonfiguration eines Adapters. Anwesenheit zeigt auch an, dass der Adapter erfolgreich installiert wurde. (Vorschlag: sollte ein Attribut enthalten, das ein Array der Hosts enthält, auf denen es installiert ist)
* `instance` - Instanz des Adapters. Eltern müssen vom Typ Adapter sein
* `meta` - Ändert selten die Meta-Informationen, die ein Adapter oder seine Instanzen benötigen
* `config` - Konfigurationen
* `script`
* `Benutzer`
* `Gruppe`

#### Attribute für bestimmte Objekttypen
##### Zustand
Attribute:

* `common.type` (optional - (Standardeinstellung ist mixed == any type) (mögliche Werte: number, string, boolean, array, object, mixed, file)
* `common.min` (optional)
* `common.max` (optional)
* `common.unit` (optional)
* `common.def` (optional - der Standardwert)
* `common.defAck` (optional - wenn common.def gesetzt ist, wird dieser Wert als ack Flag verwendet, js-controller 2.0.0+)
* `common.desc` (optional, string)
* `common.read` (Boolescher Wert, obligatorisch) - true, wenn der Status lesbar ist
* `common.write` (Boolescher Wert, obligatorisch) - true, wenn der Status beschreibbar ist
* `common.role` (string, obligatorisch) - Rolle des Status (wird in Benutzeroberflächen verwendet, um anzugeben, welches Widget ausgewählt werden soll, siehe unten)
* `common.states` (optional) Attribut vom Typ number mit Objekt möglicher Zustände
* `common.workingID` (string, optional) - wenn dieser Zustand den Hilfszustand WORKING hat. Hier muss der vollständige Name oder nur der letzte Teil geschrieben werden, wenn die ersten Teile mit tatsächlichen gleich sind. Wird für HM.LEVEL verwendet und hat normalerweise den Wert "WORKING"

##### Bundesland `common.history`
Die Verlaufsfunktion benötigt den Verlaufsadapter oder einen anderen Speicheradapter vom Typ Verlauf

Die fifo-Länge wird auf min reduziert, wenn max getroffen wird. auf null setzen oder undefiniert lassen, um die Standardeinstellungen zu verwenden

Eine Liste der Transporte finden Sie in der README-Datei des Verlaufsadapters

* `common.history` (optional)
* `common.history. <HISTORY-INSTANCE> .changesOnly` (optional, boolean, wenn true, werden nur Wertänderungen protokolliert)
* `common.history. <HISTORY-INSTANCE> .enabled` (Boolean)

##### Bundesland `common.role`
* `common.role` (gibt an, wie dieser Status in Benutzeroberflächen dargestellt werden soll)

[mögliche Werte](stateroles.md)

#### Kanal
##### Channel `common.role` (optional)
vorschlag: die channel-objects common.role sollte / könnte eine reihe von obligatorischen und / oder optionalen state-child-objekten beinhalten

mögliche Werte:

* `info` - Währung oder Aktienkurs, Kraftstoffpreise, Postfacheinfügung und ähnliches
* `calendar` -
* `Prognose` - Wettervorhersage

* `media - gemeinsamer Medienkanal
* `media.music` - Mediaplayer wie SONOS, YAMAHA und so weiter
* `media.tv` - TV
* `media.tts` - Text zur Rede

* `thermo` - Überwacht oder regelt die Temperatur, Luftfeuchtigkeit und so weiter
* `thermo.heat`
* `thermo.cool`

* `blind` - Jalousiesteuerung

* `Licht`
* `light.dimmer` - Lichtdimmer
* `light.switch` - Lichtschalter.
* `light.color` - Lichtsteuerung mit der Möglichkeit der Farbänderung
* `light.color.rgb` - Setzt die Farbe in RGB
* `light.color.rgbw` - Farbe in RGBW einstellen
* `light.color.hsl` - Farbe in Hue / Saturation / Luminance einstellen (Hue color light - LivingColors ...)
* `light.color.hslct` - Farbe in Farbton / Sättigung / Luminanz oder Farbtemperatur einstellen (Farbton erweitertes Farblicht)
* `light.color.ct` - Farbtemperatur K

* `switch` - Ein generischer Schalter

* "Sensor" - z.B. Fenster- oder Türkontakt, Wasserlecksensor, Feuersensor
* `sensor.door` - öffnen, schließen
* `sensor.door.lock` - öffnen, schließen, verriegeln
* `sensor.window` - öffnen, schließen
* `sensor.window.3` - öffnen, kippen, schließen
* `sensor.water` - wahr (Alarm), falsch (kein Alarm)
* `sensor.fire` - wahr (Alarm), falsch (kein Alarm)
* `sensor.CO2` - wahr (Alarm), falsch (kein Alarm)

*

* `Alarm` - etwas Alarm

* `phone` - fritz box, speedport und so weiter

* `button` - wie ein Wandschalter oder eine TV-Fernbedienung, bei der jede Taste einen Status wie .play, .stop, .pause hat
* `remote` - TV oder andere Fernbedienungen mit Status sind Zeichenfolgen mit gedrückten Werten, z. "PLAY", "STOP", "PAUSE"

* `meta` - Informationen zum Gerät
* `meta.version` - Geräteversion
* `meta.config` - Konfiguration vom Gerät
* ...

#### Kanalbeschreibungen
~~ Die Namen der Attribute können vom Adapter frei definiert werden, mit Ausnahme der mit **fett** geschriebenen. ~~

"W" - common.write = true

"M" - Pflichtfeld

##### Optionale Zustände für jeden Kanal / Gerät
```javascript
// state-working (optional)
{
   "_id": "adapter.instance.channelName.stateName-working", // e.g. "hm-rpc.0.JEQ0205612:1.WORKING"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.working"     // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-direction (optional). The state can have following states: "up"/"down"/""
{
   "_id": "adapter.instance.channelName.stateName-direction", // e.g. "hm-rpc.0.JEQ0205612:1.DIRECTION"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   "",                     // optional,  default ""
       "type":  "string",               // optional,  default "string"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "role":  "direction"             // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-maintenance (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance", //e.g. "hm-rpc.0.JEQ0205612:1.MAINTENANCE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance" // mandatory
       "desc":  "Problem description"   // optional,  default undefined
   }
}
,
// state-maintenance-unreach (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance-unreach", //e.g. "hm-rpc.0.JEQ0205612:0.UNREACH"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance.unreach" // mandatory
       "desc":  "Device unreachable"    // optional,  default 'Device unreachable'
   }
}
```

##### `light.switch` - Beschreibung der Attribute
| **Name** | **common.role** | **M** | **W** | **common.type** | **Beschreibung** | ------------- |: -------------------------- |: -----: | : -----: | ----------------- | ---

| Zustand | wechseln | X | X | Boolescher Wert |
| beschreibung | text.description | | | |
| mmm | anzeige.wartung.mmm | | | | mmm = lowbat oder unreach oder was auch immer |

```
// SWITCH CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205614:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.switch"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// SWITCH STATES
{
   "_id": "adapter.instance.channelName.state-switch", // e.g. "hm-rpc.0.JEQ0205614:1.STATE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "role":  "switch"                // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### `light.dimmer` - Beschreibung der Attribute
```
// DIMMER CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205612:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.dimmer"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// DIMMER STATES
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205612:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.dimmer"          // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-working",             // optional
//            "adapter.instance.channelName.state-direction",           // optional
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### `blind` - Beschreibung der Attribute
```
// BLIND CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205615:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
      "role":  "blind"                 // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// BLIND STATES
// Important: 0% - blind is fully closed, 100% blind is fully opened
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205615:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.blind"           // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
```

##### `phone` - Beschreibung der Attribute
| **Name** | **common.role** | **M** | **W** | **common.type** | **Beschreibung** | `ringing_number` | `text.phone_number` | | | `string` |

| `ringing` | `indicator` | | | `boolean` |
| `Klingeln` | `indicator` | | | `boolean` |

...

#### Gerät
#### Enum
* `common.members` - (optionales) Array von Enum-Member-IDs

#### Meta
Ich würde

 ** &lt; Adaptername &gt;. & lt; Instanznummer & gt; .meta & lt; Metaname & gt;*
 ** &lt; Adaptername &gt; .meta & lt; Metaname & gt;*
 *system. * meta. &lt; metaname &gt;*

#### Adapter
id `system.adapter.<adapter.name>`

* Hinweis: * Alle Flaggen sind optional, außer als **obligatorisch** gekennzeichnet.

* `common.name` - **obligatorisch** Name des Adapters ohne" ioBroker ".
* `common.title` - (veralteter) längerer Name des Adapters, der in admin angezeigt werden soll
* `common.titleLang` - **obligatorisch** längerer Name des Adapters in allen unterstützten Sprachen wie {en: 'Adapter', de: 'Adapter', ru: 'Драйвер'}
* `common.mode` - **obligatorisch** mögliche Werte siehe unten
* `common.version` - **obligatorisch** verfügbare Version
* `common.installedVersion` - **obligatorisch** installierte Version
* `common.enabled` - **obligatorisch** Der Wert [true / false] sollte false sein, damit neue Instanzen standardmäßig deaktiviert werden
* `common.platform` - **obligatorisch** mögliche Werte: Javascript / Node.js, weitere kommen
* `common.webservers` - Array von Webserver-Instanzen, die Inhalte aus dem WWW-Ordner des Adapters bereitstellen sollen
* `common.noRepository` - [true / false], wenn der Adapter bei der Erstinstallation geliefert wurde oder ein eigenes Repository hat
* `common.messagebox` - true, wenn die Nachrichtenbox unterstützt wird. Wenn ja, wird das Objekt system.adapter. &lt; adapter.name &gt; adapter.instance & gt.messagebox erstellt, um Nachrichten an den Adapter zu senden (verwendet für E-Mail, Pushover, ...;
* `common.subscribe` - Name der Variablen, die automatisch abonniert wird
* `common.subscribable` - Variablen dieses Adapters müssen mit sendTo abonniert werden, um Aktualisierungen zu ermöglichen
* `common.wakeup` -
* `common.availableModes` - Werte für common.mode, wenn mehr als ein Modus möglich ist
* `common.localLink` - Link zum Webservice dieses Adapters. ZB zu http:// localhost: 5984 / _utils für Futon von admin
* `common.logTransporter` - wenn dieser Adapter Protokolle von anderen Hosts und Adaptern empfängt (z. B. um sie irgendwo zu speichern)
* `common.nondeletable` - [true / false] Dieser Adapter kann nicht gelöscht oder aktualisiert werden. Es wird zusammen mit dem Controller aktualisiert.
* `common.icon` - Name des lokalen Icons (sollte sich im Unterverzeichnis" admin "befinden)
* `common.extIcon` - Link zum externen Symbol für deinstallierte Adapter. Normalerweise auf Github.
* `common.logLevel` - Debug, Info, Warnung oder Fehler
* `common.supportStopInstance`- [true / false], wenn der Adapter das Signal stopInstance unterstützt (** messagebox ** erforderlich). Das Signal wird vor dem Stopp an den Adapter gesendet. (Wird verwendet, wenn Probleme mit SIGTERM aufgetreten sind.)
* `common.allowInit` - [true / false] ermöglicht, dass der" geplante "Adapter" nicht im Zeitplan "genannt wird, wenn Einstellungen geändert oder der Adapter gestartet werden.
* `common.onlyWWW` - [true / false] sagt dem Controller, dass der Adapter nur HTML-Dateien und keine main.js hat, wie Rikscha
* `common.singleton` - Adapter kann nur einmal im gesamten System installiert werden
* `common.singletonHost` - Adapter kann nur einmal auf einem Host installiert werden
* `common.allowInit` - [true / false] ermöglicht den geplanten Start des Adapters einmal nach Änderung der Konfiguration und dann nach Zeitplan
* `common.config.width` - Standardbreite für den Konfigurationsdialog
* `common.config.height` - Standardhöhe für den Konfigurationsdialog
* `common.config.minWidth` - minimale Breite für den Konfigurationsdialog
* `common.config.minHeight` - minimale Höhe für den Konfigurationsdialog
* `common.os` - Zeichenfolge oder Array unterstützter Betriebssysteme, z. B. [" linux "," darwin "]
* `common.stopBeforeUpdate` - [true / false], wenn der Adapter vor dem Update gestoppt werden muss
* `common.adminTab.singleton` - [true / false], wenn der Adapter TAB für admin hat. Es wird nur ein Tab für alle Instanzen angezeigt.
* `common.adminTab.name` - Name des TAB in admin
* `common.adminTab.link` - Link für iframe im TAB. Sie können die Parameterersetzung folgendermaßen verwenden: "http://% ip%:% port%". IP wird durch Host-IP ersetzt. "port" wird aus native.port extrahiert.
* `common.adminTab.ignoreConfigUpdate` - Konfigurations-TAB nicht aktualisieren, wenn die Konfiguration geändert wurde (um die Konfigurationseinstellungen in TAB zu aktivieren)
* `common.restartAdapters` - Array mit Namen des Adapters, der nach der Installation dieses Adapters neu gestartet werden muss, z. ["vis"]
* `common.preserveSettings` - Zeichenfolge (oder Array) mit Namen von Attributen, die gemeinsam verwendet werden und nicht gelöscht werden. Z.B. "history", daher wird bei setState ('system.adapter.mqtt.0 ", {..}) das Feld common.history nicht gelöscht, auch wenn das neue Objekt dieses Feld nicht enthält. Um das Attribut zu löschen, muss es explizit angegeben werden fertig mit `` `common: {history: null}` ``.
* `common.noConfig` - [true / false] zeigt beispielsweise keinen Konfigurationsdialog an
* `common.stopTimeout` - Wartezeit in ms, bis der Adapter heruntergefahren ist. Standard 500ms.
* `common.unsafePerm` - [true / false], wenn das Paket mit dem Parameter" npm --unsafe-perm "installiert werden muss
* `common.supportCustoms` - [true / false], wenn der Adapter Einstellungen für jeden Status unterstützt. Es muss die Datei custom.html in admin enthalten sein. Ein Beispiel finden Sie in ioBroker.history
* `common.getHistory` - [true / false], wenn der Adapter die getHistory-Nachricht unterstützt
* `common.blockly` - [true / false], wenn der Adapter benutzerdefinierte Blöcke für blockly hat. (admin / blockly.js erforderlich)
* `common.webExtendable` - [true / false], wenn der Webserver in diesem Adapter mit Plugins / Erweiterungen wie Proxy, Simple-API erweitert werden kann
* `common.webExtension` - relativer Dateiname, um die Web-Erweiterung zu verbinden. Z.B. in simple-api "lib / simpleapi.js" relativ zum Adapter-Stammverzeichnis. Zusätzlich muss native.webInstance angeben, wo diese Erweiterung enthalten sein wird. Leer bedeutet, es muss als eigener Webservice laufen. "*" bedeutet, dass jeder Webserver dies beinhalten muss.
* `common.welcomeScreen` - Array von Seiten, die auf der Seite" web "index.html angezeigt werden sollen. ["vis / edit.html", "vis / index.html"] oder [{"link": "vis / edit.html", "name": "Vis editor", "img": "vis / img / edit.png "," color ":" blue "}," vis / index.html "]
* `common.unchanged` - (System) Bitte benutzen Sie dieses Flag nicht. Es ist ein Flag, das das System darüber informiert, dass der Konfigurationsdialog in admin angezeigt werden muss.
* `common.serviceStates` - [true / false oder path], wenn der Adapter zusätzliche Zustände liefern kann. Wenn ja, wird der Pfad adapter / lib / states.js aufgerufen und es gibt folgende Parameter function (objects, states, instance, config, callback). Die Funktion muss das Array von Punkten mit Werten wie function (err, result) liefern. {Result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}
* `common.nogit` - wenn dies zutrifft, ist keine direkte Installation von github möglich
* `common.materialise` - wenn der Adapter> admin3 unterstützt (materialise style)
* `common.materializeTab` - wenn der Adapter> admin3 für tab unterstützt (materialize style)
* `common.dataFolder` - Ordner relativ zu iobroker-Daten, in dem der Adapter die Daten speichert. Dieser Ordner wird automatisch gesichert und wiederhergestellt. Sie können die Variable '% INSTANCE%' verwenden.
* `common.webPreSettings` - Liste der Parameter, die vom Webserver-Adapter in info.js aufgenommen werden müssen. (Beispielmaterial)
* `common.apt-get` - Liste der Debian-Pakete, die für diesen Adapter benötigt werden (natürlich nur Debian)
* `common.eraseOnUpload` - löscht alle vorherigen Daten im Verzeichnis vor dem Hochladen
* `common.webByVersion` - Version als Präfix im Webadapter anzeigen (normalerweise - IP: Port / Material, WebByVersion - IP: Port / 1.2.3 / Material)
* `common.noIntro` - zeige niemals Instanzen dieses Adapters auf dem Intro / Overview Bildschirm in Admin (wie Icons, Widgets)
* `common.expert` - zeige dieses Objekt nur im Expertenmodus in admin
* `common.compact` - teilt dem Controller mit, dass dieser Adapter auf Wunsch im selben Prozess gestartet werden kann

#### Instanz
id *system.adapter. &lt; adapter.name &gt;. & lt; instanznummer & gt;*

* `common.host` - (obligatorischer) Host, auf dem der Adapter gestartet werden soll - object *system.host. &lt; host &gt;* muss vorhanden sein
* `common.enabled` - (obligatorisch)
* `common.mode` - (obligatorische) mögliche Werte siehe unten

##### Adapter / Instanz common.mode
* `none` - dieser Adapter startet keinen Prozess
* `daemon` - immer laufender Prozess (wird neu gestartet, wenn der Prozess beendet wird)
* `subscribe` - wird gestartet, wenn der Status *system.adapter. &lt; adaptername &gt;. & lt; instanznummer & gt; .alive* auf *true* geändert wird. Wird beendet, wenn *.alive* auf *false* wechselt und *.alive* auf *false* setzt, wenn der Prozess beendet wird (wird **nicht** neu gestartet, wenn der Prozess beendet wird)
* `Zeitplan` - wird durch einen Zeitplan gestartet, der in * system.adapter. &lt; Adaptername &gt;. & lt; Instanznummer & gt; .schedule zu finden ist
* `once` - Dieser Adapter wird jedes Mal gestartet, wenn das system.adapter.yyy.x-Objekt geändert wird. Es wird nach Beendigung nicht neu gestartet.

#### Host
id `system.host.<host>`

* `common.name` - f.e. `system.host.banana`
* `common.process`
* `common.version`
* `common.platform`
* `common.cmd`
* `common.hostname` - f.e. `Banane`
* `common.address` - Array von IP-Adresszeichenfolgen

#### Config
#### Skript
* `common.platform` - (obligatorisch) mögliche Werte` Javascript / Node.js` (weitere folgen)
* `common.enabled` - (obligatorisch) ist das aktivierte Skript oder nicht
* `common.source` - (obligatorisch) die Skriptquelle
* `common.engine` - (optional) *Skript-Engine* Instanz, die dieses Skript ausführen soll (zB 'javascript.0') - wenn die Engine weggelassen wird, wird sie automatisch ausgewählt

#### Nutzer
* `common.name` - (obligatorisch) Name des Benutzers (Groß- und Kleinschreibung beachten)
* `common.password` - (obligatorisch) MD5 Hash des Passworts

#### Gruppe
* `common.name` - (obligatorischer) Name der Gruppe
* `common.members` - (obligatorisches) Array von Benutzerobjekt-IDs
* `common.desc` - (optional) Beschreibung des Gruppenzwecks