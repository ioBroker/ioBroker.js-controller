---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/objectsschema.md
title: Kernkonzept
hash: mG9F6aWkgsId38qcRUEcjkU7m6+afwc4m6L2RBBrG9U=
---
# Kernkonzept
In ioBroker gibt es zwei grundlegend unterschiedliche Datentypen. Sogenannte **Zustände** (`states`) und **Objekte**

Objekte stellen selten wechselnde und größere Daten dar, z. B. Metadaten Ihrer Systemgeräte, Konfigurationen und zusätzliche Dateien. Jedes Objekt muss ein Attribut "Typ" haben. Im Folgenden finden Sie weitere Informationen dazu, welche Objekttypen verfügbar sind und welche obligatorischen Attribute ein Objekt eines bestimmten Typs benötigt. Funktionen wie setObject, getObject, ... werden Ihnen vom Adaptermodul zur Verfügung gestellt.

Zustände repräsentieren häufig sich ändernde Daten in Ihrem System, wie z. Wenn eine Lampe ein- oder ausgeschaltet ist, wenn ein Bewegungsmelder eine Bewegung erkannt hat, die Temperatur Ihres Wohnzimmers oder wenn die Taste einer Fernbedienung gedrückt wird. Im Gegensatz zu Objekten können Zustände verwendet werden, um Aktionen auszulösen, und Zustände können Verlaufsdaten erstellen. Um mit Zuständen zu arbeiten, gibt es im Adaptermodul verschiedene Funktionen wie setState, getState und so weiter.

Für jeden Staat muss auch ein entsprechendes Objekt mit `type=state` vorhanden sein.

In den folgenden Kapiteln wird das Datenbankschema beschrieben.

## IDs
ID ist eine Zeichenfolge mit einer maximalen Länge von 240 Byte, hierarchisch strukturiert und durch Punkte getrennt.

Folgende Zeichen dürfen nicht in IDs verwendet werden: `[]*,;'"&#96;<>\\?`.

Es wird nicht empfohlen, auch `^$()/` zu verwenden.

Die ID hat verschiedene Ebenen. Jede Ebene wird durch einen Punkt bestimmt. Beispiel: `system.adapter.admin.0`

- `system` - ist ein Namespace für Systemobjekte
- `adapter` - Namespace für Adapterkonfigurationen
- `admin` - Adaptername
- `0` - Adapterinstanz

Oder ein anderes Beispiel `hm-rpc.1.ABC110022.2.VALUE`:

- `hm-rpc` - ist der Name des Adapters
- `1` - Adapterinstanz
- `ABC110022` - Geräteadresse
- `2` - Kanalname
- `VALUE` - Statusname

## Namespaces
* `system.` - Systemobjekte und -zustände
* `system.host.` - Controller-Prozesse
* `system.config.` - Systemeinstellungen wie Standardsprache
* `system.meta.` - System-Metadaten
* `system.user.` - Benutzer
* `system.group.` - Gruppen
* `system.adapter. <Adaptername>` - Standardkonfiguration eines Adapters
* `<Adaptername> .` - Objekte für einen bestimmten Adapter.
* `<Adaptername> .meta.` - allgemeine Metadaten, die von allen Instanzen dieses Adapters verwendet werden
* `<Adaptername>. <Instanznummer> .` - Ein Adapterinstanz-Namespace
* `enum.` - Aufzählungen
* `history.` - Verlaufsdaten
* `scripts.` - Script Engine-Skripte
* `scripts.js.` - Javascript Script Engine Scripts
* `scripts.py.` - Python Script Engine Scripts (Zukunft)

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

Für die `setState` Methode ist alles außer `val` optional, `from` wird automatisch durch die `setState` Methode eingestellt. `ack` ist standardmäßig false, `ts` und `lc` werden wie erwartet gesetzt

Attribute für das Objekt getState / stateChange / setState:

* `val` - der tatsächliche Wert - kann ein beliebiger Typ sein, der JSON-" codierbar "ist.
* `ack` - ein boolesches Flag, das angibt, ob das Zielsystem den Wert bestätigt hat
* `ts` - ein Unix-Zeitstempel, der die letzte Aktualisierung des Status angibt (in Millisekunden)
* `lc` - ein Unix-Zeitstempel, der die letzte Änderung des tatsächlichen Status des Status angibt (in Millisekunden)
* `from` - Adapterinstanz, die den` setState` ausgeführt hat
* `user` - Benutzername, der den Wert festlegt
* `expire` - ein ganzzahliger Wert, mit dem Zustände festgelegt werden können, die nach einer bestimmten Anzahl von Sekunden ablaufen. Kann nur mit `setValue` verwendet werden. Nachdem der Wert abgelaufen ist, verschwindet er aus redisDB.
* `c` - Kommentar für diese Statusänderung.
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
### Obligatorische Attribute
Folgende Attribute müssen in jedem Objekt vorhanden sein:

* `_id`
* `type` - mögliche Werte siehe unten
* `common` - ein Objekt, das ioBroker-spezifische Abstraktionseigenschaften enthält
* `native` - ein Objekt, das kongruente Eigenschaften des Zielsystems enthält

### Optionale Attribute
* `common.name` - der Name des Objekts (optional, aber unbedingt empfohlen, um es zu füllen)

### Baumstruktur
Die Baumstruktur wird automatisch nach Namen zusammengestellt. Z.B. ```system.adapter.0.admin``` ist übergeordnet für `system.adapter.0.admin.uptime`. Verwenden Sie diese Namenskonvention mit Punkt "." Als Teiler der Ebenen.

### Objekttypen
* `state` - Eltern sollten vom Typ Kanal, Gerät, Instanz oder Host sein
* `channel` - Objekt zum Gruppieren eines oder mehrerer Zustände. Eltern sollten Gerät sein.
* `device` - Objekt zum Gruppieren eines oder mehrerer Kanäle oder Status. Sollte außer dem Adapterinstanz-Namespace kein übergeordnetes Element haben.
* `enum` - Objekte, die ein Array in common.members enthalten, das auf Status, Kanäle, Geräte oder Dateien verweist. Aufzählungen können eine übergeordnete Aufzählung haben (Baumstruktur möglich)
* `host` - ein Host, der einen Controller-Prozess ausführt
* `adapter` - die Standardkonfiguration eines Adapters. Das Vorhandensein zeigt auch an, dass der Adapter erfolgreich installiert wurde. (Vorschlag: sollte ein Attribut haben, das ein Array der Hosts enthält, auf denen es installiert ist)
* `instance` - Instanz des Adapters. Das übergeordnete Element muss vom Typ Adapter sein
* `meta` - ändert selten Metainformationen, die ein Adapter oder seine Instanzen benötigen
* `config` - Konfigurationen
* `script` - Skripte
* `user` - Benutzer
* `group` - Gruppen
* `chart` - Diagramme
* `Ordner` - eine Reihe von Geräten oder andere Dinge.

#### Attribute für bestimmte Objekttypen
##### Zustand
Attribute:

* `common.type` (optional - (Standard ist gemischt == beliebiger Typ) (mögliche Werte: Zahl, Zeichenfolge, Boolescher Wert, Array, Objekt, gemischt, Datei). Ausnahmsweise können Objekte mit dem Typ` meta` `common haben .type = meta.user` oder `meta.folder`
* `common.min` (optional)
* `common.max` (optional)
* `common.step` (optional) - Intervall erhöhen / verringern. Z.B. 0,5 für Thermostat
* `common.unit` (optional)
* `common.def` (optional - der Standardwert)
* `common.defAck` (optional - wenn common.def gesetzt ist, wird dieser Wert als ack-Flag verwendet, js-controller 2.0.0+)
* `common.desc` (optional, Zeichenfolge oder Objekt) - Beschreibung, Objekt für mehrsprachige Beschreibung
* `common.read` (boolesch, obligatorisch) - true, wenn der Status lesbar ist
* `common.write` (boolesch, obligatorisch) - true, wenn state beschreibbar ist
* `common.role` (Zeichenfolge, obligatorisch) - Rolle des Status (wird in Benutzeroberflächen verwendet, um anzugeben, welches Widget ausgewählt werden soll, siehe unten)
* `common.states` (optional) Attribut vom Typ Nummer mit Objekt möglicher Zustände` {'Wert': 'Wertname', 'Wert2': 'Wertname2', 0: 'AUS', 1: 'EIN'} `
* `common.workingID` (Zeichenfolge, optional) - wenn dieser Status den Hilfsstatus WORKING hat. Hier muss der vollständige Name oder nur der letzte Teil geschrieben werden, wenn die ersten Teile mit den tatsächlichen identisch sind. Wird für HM.LEVEL verwendet und hat normalerweise den Wert "WORKING".
* `common.custom` (optional) - die Struktur mit benutzerdefinierten Einstellungen für bestimmte Adapter. Wie `{" influxdb.0 ": {" enabled ": true," alias ":" name "}}`. Das Attribut "enabled" ist erforderlich. Wenn dies nicht der Fall ist, wird das gesamte Attribut gelöscht.

##### Zustand `common.history`
Die Verlaufsfunktion benötigt den Verlaufsadapter oder einen anderen Speicheradapter vom Typ Verlauf

Die FIFO-Länge wird auf min reduziert, wenn max getroffen wird. auf null setzen oder undefiniert lassen, um die Standardeinstellungen zu verwenden

Eine Liste der Transporte finden Sie im Verlaufsadapter README

* `common.history` (optional)
* `common.history. <HISTORY-INSTANCE> .changesOnly` (optional, boolesch, wenn true, werden nur Wertänderungen protokolliert)
* `common.history. <HISTORY-INSTANCE> .enabled` (boolean)

##### Zustand `common.role`
* `common.role` (gibt an, wie dieser Status in Benutzeroberflächen dargestellt werden soll)

[mögliche Werte](stateroles.md)

#### Kanal
##### Kanal `common.role` (optional)
Vorschlag: Die Kanalobjekte common.role sollten / könnten eine Reihe von obligatorischen und / oder optionalen State-Child-Objekten implizieren

mögliche Werte:

* `info` - Währungs- oder Aktienkurs, Kraftstoffpreise, Postfacheinfügung und ähnliches
* `Kalender` -
* `Vorhersage` - Wettervorhersage

* `media - gemeinsamer Medienkanal
* `media.music` - Media Player wie SONOS, YAMAHA und so weiter
* `media.tv` - TV
* `media.tts` - Text zu Sprache

* `thermo` - Überwachen oder steuern Sie Temperatur, Luftfeuchtigkeit usw.
* `thermo.heat`
* `thermo.cool`

* `blind` - Jalousiesteuerung

* `Licht`
* `light.dimmer` - Lichtdimmer
* `light.switch` - Lichtschalter.
* `light.color` - Lichtsteuerung mit Fähigkeit zur Farbänderung
* `light.color.rgb` - Farbe in RGB einstellen
* `light.color.rgbw` - Farbe in RGBW einstellen
* `light.color.hsl` - Farbe in Farbton / Sättigung / Luminanz einstellen (Farbton-Farblicht - LivingColors ...)
* `light.color.hslct` - Farbe in Farbton / Sättigung / Luminanz oder Farbtemperatur einstellen (Farbton erweitertes Farblicht)
* `light.color.ct` - Farbtemperatur K.

* `switch` - Ein generischer Schalter

* "Sensor" - z. Fenster- oder Türkontakt, Wasserlecksensor, Feuersensor
* `sensor.door` - öffnen, schließen
* `sensor.door.lock` - öffnen, schließen, verriegeln
* `sensor.window` - öffnen, schließen
* `sensor.window.3` - öffnen, kippen, schließen
* `sensor.water` - wahr (Alarm), falsch (kein Alarm)
* `sensor.fire` - wahr (Alarm), falsch (kein Alarm)
* `sensor.CO2` - wahr (Alarm), falsch (kein Alarm)

*

* `Alarm` - ein Alarm

* `phone` - fritz box, speedport und so weiter

* `button` - wie ein Wandschalter oder eine TV-Fernbedienung, bei der jede Taste einen Zustand wie .play, .stop, .pause aufweist
* `remote` - TV oder andere Fernbedienungen mit Status sind Zeichenfolgen mit gedrückten Werten, z. "PLAY", "STOP", "PAUSE"

* `meta` - Informationen zum Gerät
* `meta.version` - Geräteversion
* `meta.config` - Konfiguration vom Gerät
* ...

#### Kanalbeschreibungen
~~ Die Namen der Attribute können vom Adapter frei definiert werden, mit Ausnahme derjenigen, die mit **Fett** geschrieben sind. ~~

"W" - common.write = true

"M" - Obligatorisch

##### Optionale Zustände für jeden Kanal / jedes Gerät
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

##### `light.switch` - Attributbeschreibung
| **Name** | **common.role** | **M** | **W** | **common.type** | **Beschreibung** | ------------- |: -------------------------- |: -----: | : -----: | ----------------- | ---

| Zustand | Schalter | X | X | boolean |
| Beschreibung | text.description | | | |
| mmm | Indicator.maintenance.mmm | | | | mmm = Lowbat oder Unreach oder was auch immer |

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

##### `light.dimmer` - Attributbeschreibung
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

##### `blind` - Attributbeschreibung
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

##### `phone` - Attributbeschreibung
| **Name** | **common.role** | **M** | **W** | **common.type** | **Beschreibung** | `ringing_number` | `text.phone_number` | | | `string` |

| `ringing` | `indicator` | | | `boolean` |
| `klingeln` | `Indikator` | | | `boolean` |

...

#### Gerät
#### Enum
* `common.members` - (optionales) Array von Enum-Member-IDs

#### Meta
Ich würde

 * `* &lt; Adaptername &gt;. & lt; Instanznummer &gt; .meta. & lt; Metaname & gt; *`
 * `* &lt; Adaptername &gt; .meta. & lt; Metaname & gt; *`
 * `system. *meta. &lt; meta-name &gt;*

#### Adapter
id `system.adapter.<adapter.name>`

* Hinweis: * Alle Flags sind optional, außer als **obligatorisch** gekennzeichnet.

* `common.adminTab.fa-icon` - Font-Awesome Symbolname für TAB.
* `common.adminTab.ignoreConfigUpdate` - Konfigurations-TAB nicht aktualisieren, wenn die Konfiguration geändert wurde (um die Konfigurationseinstellungen in TAB zu aktivieren)
* `common.adminTab.link` - Link für iframe in der TAB. Sie können die Parameter wie folgt ersetzen: "http://% ip%:% port%". IP wird durch Host-IP ersetzt. "port" wird aus native.port extrahiert.
* `common.adminTab.name` - Name der TAB in admin
* `common.adminTab.singleton` - [true / false], wenn der Adapter TAB für admin hat. Es wird nur eine TAB für alle Instanzen angezeigt.
* `common.allowInit` - [true / false] ermöglicht den Aufruf des" geplanten "Adapters" nicht im Zeitplan ", wenn die Einstellungen geändert oder der Adapter gestartet wurde. Oder erlauben Sie den geplanten Adapterstart einmal nach Änderung der Konfiguration und dann nach Zeitplan.
* `common.availableModes` - Werte für common.mode, wenn mehr als ein Modus möglich ist
* `common.blockly` - [true / false], wenn der Adapter benutzerdefinierte Blöcke für blockly hat. (admin / blockly.js erforderlich)
* `common.connectionType` - Verbindungstyp mit Gerät:` local / cloud`. Siehe auch "common.dataSource".
* `common.compact` - sagt dem Controller, dass dieser Adapter auf Wunsch im selben Prozess gestartet werden kann
* `common.config.height` - Standardhöhe für den Konfigurationsdialog (veraltet - nur für admin2 gültig)
* `common.config.minHeight` - minimale Höhe für den Konfigurationsdialog (veraltet - nur gültig für admin2)
* `common.config.minWidth` - minimale Breite für den Konfigurationsdialog (veraltet - nur gültig für admin2)
* `common.config.width` - Standardbreite für den Konfigurationsdialog (veraltet - nur gültig für admin2)
* `common.dataFolder` - Ordner relativ zu iobroker-Daten, in dem der Adapter die Daten speichert. Dieser Ordner wird automatisch gesichert und wiederhergestellt. Sie können die Variable '% INSTANCE%' verwenden.
* `common.dataSource` - Wie die Daten vom Gerät empfangen werden:` poll / push / Annahme`. Es ist wichtig zusammen mit `connectionType`.
* `common.dependencies` - Array wie` [{"js-controller": "> = 2.0.0"}] `, das beschreibt, welche ioBroker-Module für diesen Adapter erforderlich sind.
* `common.docs` - Die Struktur wie` {"en": "docs / de / README.md", "de": ["docs / de / README.md", "docs / de / README1.md" ]} `, das die Dokumentation beschreibt, wenn nicht in README.md
* `common.enabled` - **obligatorisch** Der Wert [true / false] sollte false sein, damit neue Instanzen standardmäßig deaktiviert werden
* `common.engineTypes` - veraltet. Verwenden Sie die Engine in package.json
* `common.eraseOnUpload` - Löscht alle vorherigen Daten im Verzeichnis vor dem Hochladen
* `common.expert` - Zeigt dieses Objekt nur im Expertenmodus in admin an
* `common.extIcon` - Link zum externen Symbol für deinstallierte Adapter. Normalerweise auf Github.
* `common.getHistory` - [true / false], wenn der Adapter die getHistory-Nachricht unterstützt
* `common.icon` - Name des lokalen Symbols (sollte sich im Unterverzeichnis" admin "befinden)
* `common.installedVersion` - **obligatorische** installierte Version
* `common.keywords` - Ähnlich wie Schlüsselwörter in package.json, kann jedoch in vielen Sprachen definiert werden. Nur ein Array.
* `common.localLinks` - Link zum Webdienst dieses Adapters. Zum Beispiel zu http:// localhost: 5984 / _utils für Futon von admin
* `common.localLink` - veraltet. Verwenden Sie "common.localLinks".
* `common.logLevel` - Debug, Info, Warnung oder Fehler
* `common.logTransporter` - wenn dieser Adapter Protokolle von anderen Hosts und Adaptern empfängt (z. B. um sie irgendwo zu speichern)
* `common.main` - Startdatei des Adapters. Gleich wie in package.json.
* `common.materializeTab` - wenn der Adapter> admin3 für tab unterstützt (materialize style)
* `common.materialize` - wenn der Adapter> admin3 unterstützt (materialize style)
* `common.messagebox` - true, wenn das Nachrichtenfeld unterstützt wird. Wenn ja, wird das Objekt system.adapter. &lt; adapter.name & gt &lt; adapter.instance & gt.messagebox erstellt, um Nachrichten an den Adapter zu senden (wird für E-Mail, Pushover, ... verwendet;
* `common.mode` - **obligatorisch** mögliche Werte siehe unten
* `common.name` - **obligatorischer** Name des Adapters ohne" ioBroker ".
* `common.noConfig` - [true / false] zeigt beispielsweise keinen Konfigurationsdialog an
* `common.noIntro` - zeigt niemals Instanzen dieses Adapters auf dem Intro / Übersichtsbildschirm in admin an (wie Symbole, Widgets)
* `common.noRepository` - [true / false], wenn der Adapter bei der Erstinstallation geliefert wurde oder über ein eigenes Repository verfügt
* `common.nogit` - Wenn true, ist keine direkte Installation von Github möglich
* `common.nondeletable` - [true / false] Dieser Adapter kann nicht gelöscht oder aktualisiert werden. Es wird zusammen mit dem Controller aktualisiert.
* `common.npmLibs` - veraltet. Verwenden Sie package.json `dependencies`.
* `common.onlyWWW` - [true / false] sagt dem Controller, dass der Adapter nur HTML-Dateien und keine main.js wie Rikscha hat
* `common.osDependencies.darwin` - Array von OSX-Paketen, die für diesen Adapter erforderlich sind
* `common.osDependencies.linux` - Array von Debian / Centos-Paketen, die für diesen Adapter erforderlich sind (natürlich nur Betriebssysteme mit apt, apt-get, yum als Paketmanager)
* `common.osDependencies.win32` - wird nicht verwendet, da win32 keinen Paketmanager hat
* `common.os` - Zeichenfolge oder Array unterstützter Betriebssysteme, z. B. [" linux "," darwin "]
* `common.platform` - **obligatorisch** mögliche Werte: Javascript / Node.js, weitere folgen
* `common.preserveSettings` - Zeichenfolge (oder Array) mit Namen von Attributen, die gemeinsam gelöscht werden und nicht gelöscht werden. Z.B. "history", also wird mit setState ('system.adapter.mqtt.0 ", {..}) das Feld common.history nicht gelöscht, auch wenn das neue Objekt dieses Feld nicht hat. Um das Attribut zu löschen, muss es explizit sein erledigt mit `` `common: {history: null}` ``.
* `common.readme` - veraltet. Verwenden Sie "docs".
* `common.restartAdapters` - Array mit den Namen des Adapters, der nach der Installation dieses Adapters neu gestartet werden muss, z. ["vis"]
* `common.schedule` - CRON-Zeitplan, wenn der Adapter im Modus` Zeitplan` ausgeführt wird.
* `common.serviceStates` - [true / false oder path], wenn der Adapter zusätzliche Zustände liefern kann. Wenn ja, wird der Pfadadapter / lib / States.js aufgerufen und gibt folgende Parameterfunktion (Objekte, Zustände, Instanz, Konfiguration, Rückruf). Die Funktion muss das Array von Punkten mit Werten wie function (err, result) liefern {result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}
* `common.singletonHost` - Der Adapter kann nur einmal auf einem Host installiert werden
* `common.singleton` - Adapter kann nur einmal im gesamten System installiert werden
* `common.stopBeforeUpdate` - [true / false], wenn der Adapter vor dem Update gestoppt werden muss
* `common.stopTimeout` - Zeitüberschreitung in ms, um zu warten, bis der Adapter heruntergefahren ist. Standard 500ms.
* `common.subscribable` - Variablen dieses Adapters müssen mit sendTo abonniert werden, um Updates zu ermöglichen
* `common.subscribe` - Name der Variablen, die automatisch abonniert wird
* `common.supportCustoms` - [true / false], wenn der Adapter Einstellungen für jeden Status unterstützt. Die Datei custom.html muss sich in admin befinden. Ein Beispiel finden Sie in ioBroker.history
* `common.supportStopInstance`- [true / false], wenn der Adapter das Signal stopInstance unterstützt (** Messagebox ** erforderlich). Das Signal wird vor dem Stopp an den Adapter gesendet. (wird verwendet, wenn die Probleme mit SIGTERM aufgetreten sind)
* `common.titleLang` - **obligatorisch** längerer Name des Adapters in allen unterstützten Sprachen wie {en: 'Adapter', de: 'Adapter', ru: 'Драйвер'}
* `common.title` - (veralteter) längerer Name des Adapters, der in admin angezeigt werden soll
* `common.type` - Adaptertyp. Siehe [Typen] (adapterpublish.md)
* `common.unchanged` - (System) Bitte verwenden Sie dieses Flag nicht. Es ist ein Flag, um das System darüber zu informieren, dass der Konfigurationsdialog in admin angezeigt werden muss.
* `common.unsafePerm` - [true / false], wenn das Paket mit dem Parameter" npm --unsafe-perm "installiert werden muss
* `common.version` - **obligatorische** verfügbare Version
* `common.wakeup` - Der Adapter wird gestartet, wenn ein Wert in` system.adapter.NAME.x.wakeup` geschrieben wird. Normalerweise sollte der Adapter nach der Verarbeitung des Ereignisses anhalten.
* `common.webByVersion` - Version als Präfix im Webadapter anzeigen (normalerweise - IP: Port / Material, WebByVersion - IP: Port / 1.2.3 / Material)
* `common.webExtendable` - [true / false], wenn der Webserver in diesem Adapter mit Plugins / Erweiterungen wie Proxy, Simple-API erweitert werden kann
* `common.webExtension` - relativer Dateiname zum Verbinden der Web-Erweiterung. Z.B. in simple-api "lib / simpleapi.js" relativ zum Adapter-Stammverzeichnis. Zusätzlich muss native.webInstance angeben, wo diese Erweiterung enthalten sein wird. Leer bedeutet, dass es als eigener Webdienst ausgeführt werden muss. "*" bedeutet, dass jeder Webserver es enthalten muss.
* `common.webPreSettings` - Liste der Parameter, die vom webServer-Adapter in info.js aufgenommen werden müssen. (Beispielmaterial)
* `common.webservers` - Array von Webserverinstanzen, die Inhalte aus dem www-Ordner des Adapters bereitstellen sollen
* `common.welcomeScreen` - Array von Seiten, die auf der Seite" web "index.html angezeigt werden sollen. ["vis / edit.html", "vis / index.html"] oder [{"link": "vis / edit.html", "name": "Vis editor", "img": "vis / img / edit.png "," color ":" blue "}," vis / index.html "]
* `common.welcomeScreen.order` - todo
* `common.welcomeScreenPro` - Wie` common.welcomeScreen`, jedoch nur für den Zugriff von ioBroker.cloud verwendet.
* `common.wwwDontUpload` - Laden Sie das Verzeichnis www nicht in die DB hoch. Wird nur für Administratoren verwendet. Sie können Ihrem Verzeichnis einfach einen anderen Namen geben und OK.
* `protectedNative` - Array von Konfigurationsattributen, auf die nur der eigene Adapter zugreifen kann, z. `[" Passwort "]`
* `encryptedNative` - Array von Konfigurationsattributen, die automatisch verschlüsselt werden, wenn sie über die Admin-Konfigurationsseite gespeichert und zur Laufzeit des Adapters automatisch entschlüsselt werden, z. `[" Passwort "," Token "]`
* `native` - vordefinierte Attribute, auf die in index_m.html und zur Laufzeit über` adapter.config. <attribute> `zugegriffen werden kann, z. `{" port ": 1234," password ":" secret "}`

#### Instanz
id *system.adapter. &lt; adapter.name &gt;. & lt; instanznummer &gt;*

* `common.host` - (obligatorischer) Host, auf dem der Adapter unter - object *system.host gestartet werden soll. &lt; host &gt;* muss vorhanden sein
* `common.enabled` - (obligatorisch)
* `common.mode` - (obligatorische) mögliche Werte siehe unten

##### Adapter / Instanz common.mode
* `none` - Dieser Adapter startet keinen Prozess
* `daemon` - immer laufender Prozess (wird neu gestartet, wenn der Prozess beendet wird)
* `subscribe` - wird gestartet, wenn der Status *system.adapter. &lt; Adaptername &gt;. & lt; Instanznummer &gt; .alive* in *true* geändert wird. Wird getötet, wenn *.alive* in *false* wechselt und *.alive* auf *false* gesetzt wird, wenn der Prozess beendet wird (wird **nicht** neu gestartet, wenn der Prozess beendet wird)
* `Zeitplan` - wird durch den in *system.adapter gefundenen Zeitplan gestartet. &lt; Adaptername &gt;. & lt; Instanznummer &gt; .schedule* - reagiert auf Änderungen von *.schedule* durch Neuplanung mit neuem Status
* `einmal` - Dieser Adapter wird jedes Mal gestartet, wenn das Objekt system.adapter.yyy.x geändert wird. Es wird nach Beendigung nicht neu gestartet.
* `extension` - Dieser Adapter wird nicht von` js-controller` gestartet, sondern von einer Webinstanz. Die Webinstanz kann in "native.webInstance" als "*" (wenn in jedem Web) oder als "web.x" für eine bestimmte Webinstanz definiert werden. (Beispiele: `Kameras, Proxy`). Zusätzlich muss in `common.webExtension` der Pfad zur Plugin-Datei angegeben werden.

#### Host
id `system.host.<host>`

* `common.name` - f.e. `system.host.banana`
* `common.process`
* `common.version`
* `common.platform`
* `common.cmd`
* `common.hostname` - f.e. "Banane"
* `common.address` - Array von IP-Adresszeichenfolgen

#### Config
#### Skript
* `common.platform` - (obligatorisch) mögliche Werte` Javascript / Node.js` (weitere werden folgen)
* `common.enabled` - (obligatorisch) ist skriptaktiviert oder nicht
* `common.source` - (obligatorisch) die Skriptquelle
* `common.engine` - (optional) *Skript-Engine* Instanz, die dieses Skript ausführen soll (z. B. 'javascript.0') - wenn die ausgelassene Engine automatisch ausgewählt wird

#### Nutzer
* `common.name` - (obligatorisch) Name des Benutzers (Groß- und Kleinschreibung beachten)
* `common.password` - (obligatorisch) MD5 Hash des Passworts

#### Gruppe
* `common.name` - (obligatorischer) Name der Gruppe
* `common.members` - (obligatorisches) Array von Benutzerobjekt-IDs
* `common.desc` - (optionale) Beschreibung des Gruppenzwecks