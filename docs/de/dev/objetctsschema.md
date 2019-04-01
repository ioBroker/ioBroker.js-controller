---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/objetctsschema.md
title: Kernkonzept
hash: +IiUhViJwTVu/ux3jUbrAkvLZtYImrDNIKJFW4Cv1zA=
---
# Kernkonzept
Im ioBroker gibt es zwei grundsätzlich verschiedene Datentypen. So genannte **Zustände** (`states`) und **Objekte**

Objekte stellen selten sich ändernde und größere Daten dar, wie Metadaten Ihrer Systemgeräte, Konfigurationen und zusätzliche Dateien. Jedes Objekt muss ein Attribut "type" haben. Nachfolgend finden Sie weitere Informationen, welche Objekttypen verfügbar sind und welche obligatorischen Attribute ein Objekt eines bestimmten Typs benötigt. Funktionen wie setObject, getObject, ... werden Ihnen vom Adaptermodul zur Verfügung gestellt.

Zustände stellen häufig sich ändernde Daten in Ihrem System dar, wie z. B. f.e. Wenn eine Lampe ein- oder ausgeschaltet ist, wenn ein Bewegungsmelder eine Bewegung erkannt hat, die Temperatur in Ihrem Wohnzimmer oder wenn Sie die Taste einer Fernbedienung drücken. Im Gegensatz zu Objekten können Zustände zum Auslösen von Aktionen verwendet werden, und Zustände können Verlaufsdaten erstellen. Um mit Zuständen zu arbeiten, gibt es im Adaptermodul mehrere Funktionen wie setState, getState usw.

Für jeden Zustand muss auch ein entsprechendes Objekt mit `type=state` vorhanden sein.

In den folgenden Kapiteln wird das Datenbankschema beschrieben.

## IDs
ID ist eine Zeichenfolge mit einer maximalen Länge von 240 Byte, die hierarchisch strukturiert ist und durch Punkte voneinander getrennt ist.

Folgende Zeichen dürfen nicht in IDs verwendet werden: `[]*,;'"&#96;<>\\?`.

Es wird nicht empfohlen, auch `^$()/` zu verwenden.

Die ID hat verschiedene Stufen. Jede Ebene wird durch Punkt festgelegt. Beispiel: `system.adapter.admin.0`

- **system** - ist ein Namespace für Systemobjekte
- **adapter** - Namespace für Adapterkonfigurationen
- **admin** - Adaptername
- **0** - Adapterinstanz

Oder anderes Beispiel `hm-rpc.1.ABC110022.2.VALUE`:

- **hm-rpc** - ist der Name des Adapters
- **1** - Adapterinstanz
- **ABC110022** - Geräteadresse
- **2** - Kanalname
- **VALUE** - Zustandsname

## Namensräume
* System. - Systemobjekte und Zustände
* system.host. - Controllerprozesse
* system.config. - Systemeinstellungen wie Standardsprache
* system.meta. - Systemmetadaten
* system.user. - Benutzer
* system.group. - Gruppen
* system.adapter. & lt; Name des Adapters & gt; - Standardkonfiguration eines Adapters
* & lt; adaptorname & gt; - Objekt, das Anhänge enthält, die über http:// & lt; couch & gt;: 5984 / iobroker / & lt; adaptorname & gt; / path zugänglich sind
* & lt; adaptorname & gt; .meta. - allgemeine Metadaten, die von allen Instanzen dieses Adapters verwendet werden
* & lt; adaptorname & gt;. & lt; instanznummer & gt ;. - Ein Adapterinstanz-Namespace
* enum. - Aufzählungen
* Geschichte. - Verlaufsdaten
* Skripte. - Skript-Engine-Skripte
* scripts.js. - Javascript Script Engine-Skripte
* scripts.py. - python Script Engine-Skripte (zukünftig)

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

### Namespace system.host. & Lt; Hostname & gt;
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

## Zustände
Die getState-Methode und das stateChange-Ereignis liefern ein Objekt mit allen Attributen außer "expire"

für die `setState`-Methode ist alles außer `val` optional, `from` wird automatisch durch die `setState`-Methode eingestellt. `ack` ist standardmäßig auf falsch gesetzt, `ts` und `lc` werden wie erwartet eingestellt

Attribute für das Objekt getState / stateChange / setState:

* `val` - der tatsächliche Wert - kann ein beliebiger Typ sein, der JSON-" kodierbar "ist.
* `ack` - ein boolesches Flag, das angibt, ob das Zielsystem den Wert bestätigt hat
* `ts` - ein Unix-Zeitstempel, der die letzte Aktualisierung des Status angibt
* `lc` - ein Unix-Zeitstempel, der die letzte Änderung des aktuellen Werts des Zustands angibt
* `from` - Adapterinstanz, die den` setState` ausgeführt hat
* `user` - Benutzername, der den Wert festlegt
* `expire` - ein ganzzahliger Wert, mit dem Zustände festgelegt werden können, die nach einer bestimmten Anzahl von Sekunden ablaufen. Kann nur mit `setValue` verwendet werden. Nachdem der Wert abgelaufen ist, verschwindet er in redisDB.
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

Jeder *state* muss durch ein Objekt des Typs state dargestellt werden, das Metadaten für den Status enthält. Siehe unten.

## Objekte
Erforderliche Attribute
In jedem Objekt müssen folgende Attribute vorhanden sein:

* `_id`
* `type` - mögliche Werte siehe unten
* `common` - ein Objekt, das ioBroker-spezifische Abstraktionseigenschaften enthält
* `native` - ein Objekt, das kongruente Eigenschaften des Zielsystems enthält

### Optionale Attribute
* `common.name` - der Name des Objekts (optional, aber nur zum Ausfüllen empfohlen)

### Baumstruktur
Die Baumstruktur wird automatisch nach Namen zusammengestellt. Z.B. ```system.adapter.0.admin``` ist für `system.adapter.0.admin.uptime` Elternteil. Verwenden Sie diese Namenskonvention mit Punkt "." Als Teilung der Ebenen.

### Objekttypen
* `state` - parent sollte vom Typ Kanal, Gerät, Instanz oder Host sein
* `channel` - Objekt zum Gruppieren eines oder mehrerer Zustände. Elternteil sollte Gerät sein.
* `device` - Objekt zum Gruppieren eines oder mehrerer Kanäle oder Zustände. Sollte kein übergeordnetes Element außer dem Namensraum der Adapterinstanz haben.
* `enum` - Objekte, die ein Array in common.members enthalten, das auf Zustände, Kanäle, Geräte oder Dateien verweist. Aufzählungen können eine übergeordnete Aufzählung haben (Baumstruktur möglich)
* `host` - ein Host, der einen Controller-Prozess ausführt
* `adapter` - die Standardkonfiguration eines Adapters. Präsenz zeigt auch an, dass der Adapter erfolgreich installiert wurde. (Vorschlag: sollte ein Attribut enthalten, das ein Array der Hosts enthält, auf denen es installiert ist.)
* `Instanz` - Instanz des Adapters. Das übergeordnete Element muss vom Typ Adapter sein
* `meta` - ändert selten Metainformationen, die ein Adapter oder seine Instanzen benötigt
* `config` - Konfigurationen
* `script`
* "Benutzer"
* `Gruppe`

#### Attribute für bestimmte Objekttypen
##### Zustand
Attribute:

* `common.type` (optional - (Standard ist gemischt == jeder Typ) (mögliche Werte: number, string, boolean, Array, Objekt, mixed, file)
* `common.min` (optional)
* `common.max` (optional)
* `common.unit` (optional)
* `common.def` (optional - der Standardwert)
* `common.defAck` (optional - wenn common.def gesetzt ist, wird dieser Wert als Ack-Flag verwendet, js-controller 2.0.0+)
* `common.desc` (optional, Zeichenfolge)
* `common.read` (boolean, obligatorisch) - true, wenn der Status lesbar ist
* `common.write` (boolean, obligatorisch) - true, wenn der Status schreibbar ist
* `common.role` (string, obligatorisch) - Rolle des Status (wird in Benutzeroberflächen verwendet, um anzugeben, welches Widget ausgewählt werden soll, siehe unten)
* `common.states` (optional) Attribut der Typnummer mit Objekt möglicher Zustände {'value': 'valueName', 'value2': 'valueName2', 0: 'OFF', 1: 'ON'
* `common.workingID` (String, optional) - wenn dieser Status den Hilfsstatus WORKING hat. Hier muss der vollständige Name oder nur der letzte Teil geschrieben werden, wenn die ersten Teile mit tatsächlichen identisch sind. Wird für HM.LEVEL verwendet und hat normalerweise den Wert "WORKING".

##### State `common.history`
Die Verlaufsfunktion benötigt den Verlaufsadapter oder einen anderen Speicheradapter vom Typ Verlauf

die fifo-länge wird auf min reduziert, wenn max erreicht ist. auf null setzen oder undefined lassen, um Standardeinstellungen zu verwenden

Eine Liste der Transporte finden Sie in der README des History-Adapters

* `common.history` (optional)
* `common.history.HISTORY-INSTANCE.changesOnly` (optional, boolean, wenn wahr, werden nur Wertänderungen protokolliert)
* `common.history.HISTORY-INSTANCE.enabled` (boolean)

##### State `common.role`
* `common.role` (gibt an, wie dieser Zustand in Benutzeroberflächen dargestellt werden soll)

[mögliche Werte](stateroles.md)

#### Kanal
##### Channel `common.role` (optional)
Vorschlag: Die channel-objects common.role sollten / können eine Reihe von obligatorischen und / oder optionalen state-child-Objekten enthalten

mögliche Werte:

* `info` - Währung oder Aktienkurs, Treibstoffpreise, Post Box Insertion und ähnliches
* `calendar` -
* "Prognose" - Wettervorhersage

* Medien - allgemeiner Medienkanal
* `media.music` - Mediaplayer wie SONOS, YAMAHA und so weiter
* `media.tv` - TV
* `media.tts` - Text zu Sprache

* `thermo` - Überwachung oder Kontrolle der Temperatur, Luftfeuchtigkeit usw.
* `thermo.heat '
* `thermo.cool`

* `blind` - Jalousiesteuerung

* "Licht"
* `light.dimmer` - Lichtdimmer
* `light.switch` - Lichtschalter.
* `light.color` - Lichtsteuerung mit Farbwechselfähigkeit
* `light.color.rgb` - Farbe in RGB einstellen
* `light.color.rgbw` - Setzt die Farbe in RGBW
* `light.color.hsl` - Farbe in Farbton / Sättigung / Luminanz einstellen (Farbton Lichtfarbe - LivingColors ...)
* `light.color.hslct` - Farbe in Farbton / Sättigung / Luminanz oder Farbtemperatur (Farbton mit erweitertem Farblicht) einstellen
* `light.color.ct` - Farbtemperatur K

* `switch` - Einige generische Schalter

* `sensor` - z. Fenster- oder Türkontakt, Wasserlecksensor, Feuersensor
* `sensor.door` - öffne, schließe
* `sensor.door.lock` - öffnen, schließen, verriegeln
* `sensor.window` - öffnen, schließen
* `sensor.window.3` - öffnen, neigen, schließen
* `sensor.water` - wahr (Alarm), falsch (kein Alarm)
* `sensor.fire` - wahr (Alarm), falsch (kein Alarm)
* `sensor.CO2` - wahr (Alarm), falsch (kein Alarm)

*

* `alarm` - etwas alarm

* `phone` - fritz box, speedport und so weiter

* `button` - wie ein Wandschalter oder eine TV-Fernbedienung, bei der jeder Button ein Zustand wie .play, .stop, .pause ist
* `remote` - Fernsehgeräte oder andere Fernbedienungen mit Status sind Zeichenfolgen mit gedrückten Werten, z. "PLAY", "STOP", "PAUSE"

* `meta` - Informationen zum Gerät
* `meta.version` - Geräteversion
* `meta.config` - Konfiguration vom Gerät
* ...

#### Kanalbeschreibungen
~~ Die Namen der Attribute können vom Adapter frei definiert werden, mit Ausnahme der mit **Fettschrift** ~~

"W" - common.write = true

"M" - obligatorisch

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
| **Name** | **common.role** | **M** | **W** | **allgemeiner Typ** | **Beschreibung** | ------------- |: -------------------------- |: -----: | : -----: | ----------------- | ---

| Zustand | Schalter | X | X | boolean |
| Beschreibung | Textbeschreibung | | | |
| mmm | Anzeige.Wartung.mmm | | | | mmm = lowbat oder unreach oder was auch immer |

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
| **Name** | **common.role** | **M** | **W** | **allgemeiner Typ** | **Beschreibung** | `ringing_number` | `text.phone_number` | | | `string` |

| `ringing` | `indicator` | | | `boolean` |
| "Klingeln" | "Indikator" | | | `boolean` |

...

#### Gerät
#### Enum
* `common.members` - (optionales) Array von Enum-Member-IDs

#### Meta
Ich würde

 ** Adapter-Name & gt; Instanz-Nummer & gt; Meta & lt; Metaname & gt;*
 ** & lt; adaptorname & gt; meta. & lt; metaname>*
 *system. * meta. & lt; metaname & gt;*

#### Adapter
id *system.adapter. & lt; adapter.name & gt;*

* Hinweis: * Alle Flags sind optional, außer als **Pflichtfeld**

* `common.name` - **obligatorisch** Name des Adapters ohne" ioBroker ".
* `common.title` - (veralteter) längerer Name des Adapters, der in admin angezeigt werden soll
* `common.titleLang` - **obligatorisch** längerer Name des Adapters in allen unterstützten Sprachen wie {en: 'Adapter', de: 'adapter', ru: 'Драйвер'}
* `common.mode` - **obligatorisch** mögliche Werte siehe unten
* `common.version` - **obligatorisch** verfügbare Version
* `common.installedVersion` - **obligatorisch** installierte Version
* `common.enabled` - **obligatorisch** [true / false] sollte false sein, damit neue Instanzen standardmäßig deaktiviert werden
* `common.platform` - **obligatorisch** mögliche Werte: Javascript / Node.js, mehr kommen
* `common.webservers` - ein Array von Webserver-Instanzen, die Inhalte aus dem Ordner www des Adapters bereitstellen sollen
* `common.noRepository` - [true / false], wenn der Adapter bei der Erstinstallation ausgeliefert wurde oder ein eigenes Repository hat
* `common.messagebox` - true, wenn das Meldungsfeld unterstützt wird. Wenn ja, wird das Objekt system.adapter. & Lt; adapter.name & gt & lt; adapter.instance & gt.messagebox erstellt, um Meldungen an den Adapter zu senden (für E-Mail, Pushover, ...;
* `common.subscribe` - Name der Variable, die automatisch abonniert wird
* `common.subscribable` - Variablen dieses Adapters müssen mit sendTo abonniert sein, um Updates zu aktivieren
* `common.wakeup` -
* `common.availableModes` - Werte für common.mode, wenn mehrere Modi möglich sind
* `common.localLink` - Link zum Webservice dieses Adapters. Z. B. http:// localhost: 5984 / _utils für futon von admin
* `common.logTransporter` - wenn dieser Adapter Protokolle von anderen Hosts und Adaptern empfängt (z. B. um sie irgendwo zu speichern)
* `common.nondeletable` - [true / false] Dieser Adapter kann nicht gelöscht oder aktualisiert werden. Sie wird zusammen mit dem Controller aktualisiert.
* `common.icon` - Name des lokalen Symbols (sollte sich im Unterverzeichnis" admin "befinden)
* `common.extIcon` - Link zu einem externen Symbol für nicht installierte Adapter. Normalerweise auf Github.
* `common.logLevel` - Debug, Info, Warnung oder Fehler
* `common.supportStopInstance`- [true / false], wenn der Adapter das Signal stopInstance unterstützt (** messagebox ** erforderlich). Das Signal wird vor dem Stopp an den Adapter gesendet. (Wird verwendet, wenn Probleme mit SIGTERM aufgetreten sind)
* `common.allowInit` - [true / false] ermöglicht, dass der" geplante "Adapter" nicht im Zeitplan "genannt wird, wenn sich die Einstellungen geändert haben oder der Adapter gestartet wurde.
* `common.onlyWWW` - [true / false] sagt dem Controller, dieser Adapter hat nur HTML-Dateien und keine main.js wie Rickshaw
* `common.singleton` - Adapter kann nur einmal im gesamten System installiert werden
* `common.singletonHost` - Adapter kann nur einmal auf einem Host installiert werden
* `common.allowInit` - [true / false] erlaubt den geplanten Adapterstart einmal nach einer Konfigurationsänderung und dann nach Zeitplan
* `common.config.width` - Standardbreite für Konfigurationsdialog
* `common.config.height` - Standardhöhe für Konfigurationsdialog
* `common.config.minWidth` - minimale Breite für Konfigurationsdialog
* `common.config.minHeight` - minimale Höhe für Konfigurationsdialog
* `common.os` - String oder Array unterstützter Betriebssysteme, z. B. [" linux "," darwin "]
* `common.stopBeforeUpdate` - [true / false], wenn der Adapter vor dem Update angehalten werden muss
* `common.adminTab.singleton` - [true / false], wenn der Adapter TAB für den Administrator hat. Es wird nur ein TAB für alle Instanzen angezeigt.
* `common.adminTab.name` - Name des TAB im Admin
* `common.adminTab.link` - Link für Iframe in der TAB. Sie können Parameter wie folgt verwenden: "http://% ip%:% port%". IP wird durch Host-IP ersetzt. "port" wird aus native.port extrahiert.
* `common.adminTab.ignoreConfigUpdate` - Aktualisieren Sie die Konfigurations-TAB nicht, wenn die Konfiguration geändert wurde (um die Konfigurationseinstellungen in der TAB zu aktivieren)
* `common.restartAdapters` - Array mit Namen des Adapters, der nach der Installation dieses Adapters neu gestartet werden muss, z. ["vis"]
* `common.preserveSettings` - String (oder Array) mit Namen von Attributen, die der Instanz gemeinsam sind, die nicht gelöscht werden. Z.B. "history", also durch setState ('system.adapter.mqtt.0 ", {..}) wird das Feld common.history nicht gelöscht, auch wenn das neue Objekt dieses Feld nicht hat. Um das Attribut zu löschen, muss es explizit sein fertig mit `` `common: {history: null}` ``.
* `common.noConfig` - [true / false] zeigt keinen Konfigurationsdialog für die Instanz
* `common.stopTimeout` - Zeitüberschreitung in ms, bis der Adapter heruntergefahren ist. Standardeinstellung 500ms.
* `common.unsafePerm` - [true / false], wenn das Paket mit dem Parameter" npm --unsafe-perm "installiert werden muss
* `common.supportCustoms` - [true / false], wenn der Adapter Einstellungen für jeden Status unterstützt. Es muss eine custom.html-Datei in admin haben. Ein Beispiel kann in ioBroker.history gefunden werden
* `common.getHistory` - [true / false], wenn der Adapter die getHistory-Nachricht unterstützt
* `common.blockly` - [true / false], wenn der Adapter benutzerdefinierte Blöcke für Blockly enthält. (admin / blockly.js erforderlich)
* `common.webExtendable` - [true / false], wenn der Webserver in diesem Adapter mit Plugins / Erweiterungen wie Proxy oder Simple-API erweitert werden kann
* `common.webExtension` - relativer Dateiname zum Verbinden der Weberweiterung. Z.B. in simple-api "lib / simpleapi.js" relativ zum Adapter-Stammverzeichnis. Außerdem muss native.webInstance angeben, wo diese Erweiterung enthalten sein soll. Leer bedeutet, es muss als eigener Webdienst ausgeführt werden. "*" bedeutet, dass jeder Webserver es enthalten muss.
* `common.welcomeScreen` - ein Array von Seiten, das auf der" web "index.html-Seite angezeigt werden soll. ["vis / edit.html", "vis / index.html"] oder [{"link": "vis / edit.html", "name": "vis-Editor", "img": "vis / img / edit.png "," color ":" blue "}," vis / index.html "]
* `common.unchanged` - (System) Bitte benutzen Sie dieses Flag nicht. Es ist ein Flag, um das System zu informieren, dass der Konfigurationsdialog in admin angezeigt werden muss.
* `common.serviceStates` - [true / false oder path], wenn der Adapter zusätzliche Zustände liefern kann. Wenn ja, wird der Pfadadapter / lib / states.js aufgerufen, und es geben die folgenden Parameter eine Funktion (Objekte, Zustände, Instanz, Konfiguration, Rückruf). Die Funktion muss das Array von Punkten mit Werten wie function (err, result) liefern. {Result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}
* `common.nogit` - Wenn true, ist keine direkte Installation von github möglich
* `common.materialize` - wenn der Adapter> admin3 (Materialize style) unterstützt
* `common.materializeTab` - wenn der Adapter> admin3 für die Registerkarte unterstützt (Materialstil)
* `common.dataFolder` - Ordner relativ zu den Iobroker-Daten, in denen der Adapter die Daten speichert. Dieser Ordner wird automatisch gesichert und wiederhergestellt. Sie können die Variable '% INSTANCE%' verwenden.
* `common.webPreSettings` - Liste der Parameter, die vom webServer-Adapter in info.js aufgenommen werden müssen. (Beispielmaterial)
* `common.apt-get` - Liste von Debian-Paketen, die für diesen Adapter erforderlich sind (natürlich nur Debian)
* `common.eraseOnUpload` - löscht vor dem Hochladen alle vorherigen Daten im Verzeichnis
* `common.webByVersion` - Version als Präfix im Webadapter anzeigen (normalerweise - ip: port / material, webByVersion - ip: port / 1.2.3 / material)
* `common.noIntro` - Zeigt niemals Instanzen dieses Adapters auf dem Bildschirm Intro / Overview in admin an (wie Symbole, Widgets).
* `common.expert` - Dieses Objekt nur im Expertenmodus in Admin anzeigen
* `common.compact` - sagt dem Controller, dass dieser Adapter auf Wunsch im selben Prozess gestartet werden kann

#### Instanz
id *system.adapter. & lt; adapter.name & gt;. & lt; instanznummer & gt;*

* common.host - (obligatorischer) Host, auf dem der Adapter unter - object *system.host. & lt; host & gt;* gestartet werden muss
* common.enabled - (obligatorisch)
* common.mode - (obligatorisch) mögliche Werte siehe unten

##### Adapter / instance common.mode
* **none** - Dieser Adapter startet keinen Prozess
* **daemon** - laufender Prozess (wird neu gestartet, wenn der Prozess beendet wird)
* **subscribe** - wird gestartet, wenn der Status *system.adapter. & lt; adaptorname & gt;. & lt; Instanznummer & gt; .alive* in *true* geändert wird. Wird beendet, wenn *.alive* in *false* geändert wird und *.alive* auf *false* gesetzt wird, wenn der Prozess beendet wird (wird **nicht** neu gestartet, wenn der Prozess beendet wird).
* **Zeitplan** - wird durch einen Zeitplan gestartet, der in *system.adapter. & lt; adaptorname & gt;. & lt; Instanznummer & gt; .schedule* vorhanden ist - reagiert auf Änderungen von *.schedule* durch Umplanung mit neuem Status
* **einmal** - Dieser Adapter wird jedes Mal gestartet, wenn das system.adapter.yyy.x-Objekt geändert wird. Es wird nach Beendigung nicht neu gestartet.

#### Host
id *system.host. & lt; host & gt;*

* `common.name` - z. "system.host.banana"
* `common.process`
* `common.version`
* `common.platform`
* `common.cmd`
* `common.hostname` - f.e. "Banane"
* `common.address` - Array von IP-Adresszeichenfolgen

#### Config
#### Skript
* `common.platform` - (obligatorisch) mögliche Werte 'Javascript / Node.js' (weitere werden folgen)
* `common.enabled` - (obligatorisch) ist Skript aktiviert oder nicht
* `common.source` - (obligatorisch) die Skriptquelle
* `common.engine` - (optional) *scriptengine* -Instanz, die dieses Skript ausführen soll (z. B. 'javascript.0') - wenn das ausgelassene Modul automatisch ausgewählt wird

#### Nutzer
* `common.name` - (obligatorisch) Name des Benutzers (@HQ: Groß- / Kleinschreibung nicht berücksichtigt? @Bluefox Ihre Wahl, ich denke, dass die Groß- / Kleinschreibung auch in Ordnung ist)
* `common.password` - (obligatorisch) MD5 Hash des Passworts

#### Gruppe
* `common.name` - (obligatorischer) Name der Gruppe
* `common.members` - (obligatorisches) Array von Benutzerobjekt-IDs
* `common.desc` - (optional) Gruppenzweckbeschreibung