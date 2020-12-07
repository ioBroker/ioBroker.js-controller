---
title: Adapterreferenz
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapterref.md
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
hash: Pc2ieRRwfM3/TwXKAf+uQpuAfbO9vFy550NsNpmtL98=
---
# Adapterreferenz
## Datenstruktur - Objekte und Zustände
Ein Adapter in ioBroker ist ein unabhängiger Prozess, der Objekte und Zustände in einem zentralen Datenspeicher liest und schreibt. Die Datenspeicherung kann als Datenbank (redis / couchDB) oder nur als Textdatei dargestellt werden, die Verbindungsmethode ist jedoch immer dieselbe - über die API. Das heißt, der Entwickler sollte sich nicht darum kümmern, um welche Datenbank es sich handelt und wie die Daten dort gespeichert und bereitgestellt werden.

Es gibt zwei Arten von Daten im Speicher:

* Objekte
* Zustände

Objekte sind statische Beschreibungen einiger Datenpunkte. Zustände sind die dynamischen Werte von Datenpunkten. Normalerweise gibt es für jeden Zustand ein Objekt mit Beschreibung. (Aber nicht umgekehrt).

Objekte beschreiben zusätzlich:

* Konfiguration der Hosts
* Beschreibung der Adapter
* Konfiguration von Adapterinstanzen
* Inhalt der Konfigurations-HTML-Dateien
* Inhalt von WEB-Dateien
* Aufzählungen
* Benutzer
* Hierarchien von Zuständen (Kanäle und Geräte)

Sie können die Objekte und die aktuellen Statuswerte im Admin-Adapter auf der Registerkarte "Objekte" untersuchen.

Der Name des Objekts besteht aus verschiedenen Teilen. Jeder Teil wird durch "." Geteilt. von einander. Es gibt Systemobjekte (Name beginnt mit _ oder "System") und Adapterobjekte (Name beginnt mit adapterName).

Hinweis: Hier und her ist adapterName der Name des Adapters, den ein Entwickler erstellen möchte.

Die Zustände können in Kanälen und die Kanäle in Geräten gruppiert werden. Hier ist ein Beispiel für homematische Gruppen und Kanäle:

```
* hm-rpc.0.IEQ1234567 - device
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.INFO - state
    * hm-rpc.0.IEQ1234567.0.RSSI - state
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.STATE - state
    * hm-rpc.0.IEQ1234567.0.BATTERY - state
```

Die Status-ID muss immer mit dem Kanalnamen und dem Kanalnamen mit dem Gerätenamen beginnen. Z.B. Im obigen Statusnamen hm-rpc.0.IEQ1234567.0.INFO ist der Teil hm-rpc.0.IEQ1234567.0 der Kanalname und hm-rpc.0.IEQ1234567 der Gerätename.

Es wird verwendet, um die Koordination von Geräten, Kanälen und Zuständen in Hierarchien aufzubauen.

?> Hinweis: Wenn der Adapter nicht so komplex ist, können die Geräte und sogar Kanäle weggelassen werden.

** Adapter ** ist nur das Paket von Dateien und wird im Verzeichnis node_modules abgelegt. Für jeden Adapter finden Sie die Beschreibung dieses Adapters im Objekt "system.adapter.adapterName". Es sind nur die Felder "common" und "native" aus der Datei io-package.json. Dieser Eintrag wird automatisch erstellt, wenn iobroker adapterName installiert oder iobroker adapterName hinzufügt. Wenn der Adapter mit npm installiert wurde, wird iobroker.adapterName installiert. Bis zur Erstellung der ersten Instanz wird kein Eintrag erstellt. Aber es ist nicht so wichtig. Die für "Updates" erforderlichen Informationen werden direkt aus io-package.json gelesen. Eine vollständige Liste der allgemeinen Einstellungen für den Adapter finden Sie in [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapter).

** Instanz ** ist eine Instanz des Adapters. Je nach Adaptertyp kann mehr als eine Instanz erstellt werden. Bei einigen Adaptern kann jedoch nicht mehr als eine Instanz erstellt werden. Z.B. Im Falle von Vis oder Rikscha kann nur eine Instanz erstellt werden. Dieses Verhalten wird durch Flags in io-package.json gesteuert.

Für jede Instanz befindet sich das Konfigurationsobjekt im Datenspeicher unter der ID "system.adapter.adapterName.X", wobei X die Adapterinstanznummer ist. Es enthält die Einstellungen für diese Instanz des Adapters. Normalerweise besteht es aus "allgemeinen" und "nativen" Einstellungen. Allgemeine Einstellungen sind:

* `enabled`: true / false;
* `host`: Hostname, auf dem diese Instanz ausgeführt werden muss;
* `mode`: keine, daemon, abonnieren, planen, einmal;

Beschreibung finden Sie [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#instance).

`Native` Einstellungen bestehen aus spezifischen Konfigurationen für diesen Adapter, z. B.: IP-Adresse des Geräts, Geräteeinstellungen usw.

?> Hinweis: Instanzen können auf verschiedenen Hosts (in Systemen mit mehreren Hosts) ausgeführt werden, und die Adapter können auf verschiedenen Hosts unterschiedliche Versionen haben.

Alle Objekt-IDs der Adapterinstanz beginnen mit adapterName.X, wobei X die Nummer der Adapterinstanz ist.

Objekte haben unterschiedliche Typen für unterschiedliche Zwecke.

Für jeden Adapter (nicht die Instanz) werden automatisch die folgenden Objekte erstellt:

* `system.adapter.adapterName`: Beschreibung des Adapters (wie Name, Versionsnummer, ...)
* `adapterName`: Objekt, das aus HTML / JS / CSS-Dateien aus dem Verzeichnis" www "des Adapters besteht. Dieses Objekt wird nur erstellt, wenn das Verzeichnis "www" im Adapterpaket gefunden wird.
* `adapterName.admin`: Objekt, das aus HTML / JS / CSS-Dateien aus dem Verzeichnis" admin "des Adapterpakets besteht.

Für jede Adapterinstanz 'X' werden automatisch die folgenden Objekte erstellt:

* `system.adapter.adapterName.X`: Konfiguration der Adapterinstanz
* `system.adapter.adapterName.X.alive`: Angabe, ob die Instanz aktiv ist (Nachrichten alle 30 Sekunden senden)
* `system.adapter.adapterName.X.connected`: Angabe, ob die Instanz mit dem Datenspeicher verbunden ist, weil sie verbunden werden kann, aber aufgrund eines Deadlocks keine lebendigen Nachrichten senden kann.
* `system.adapter.adapterName.X.memHeapTotal`: Speichernutzung
* `system.adapter.adapterName.X.memHeapUsed`: Speichernutzung
* `system.adapter.adapterName.X.memRss`: Speichernutzung
* `system.adapter.adapterName.X.uptime`: Wie viele Sekunden Adapter läuft.

Erläuterungen zu den Speicherzuständen finden Sie in [Hier](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for).

Wenn der Adapter den Modus 'keine' oder 'einmal' hat, werden keine lebendigen, verfügbaren ... Objekte erstellt.
Verzeichnisstruktur des Adapters

Das Adapterpaket muss einige obligatorische Verzeichnisse und Dateien enthalten:

* `admin` (obligatorisches Verzeichnis)
  * `index.html`
  * `xxx.png` - optional, besser, wenn es den Namen` adapterName.png` hat (alle Bildformate werden unterstützt: jpeg, jpg, svg, bmp, ...)
* `www` - (optionales Verzeichnis)
* `lib` - (obligatorisches Verzeichnis wegen` utils.js`)
  * `utils.js`
* `package.json` - obligatorisch
* `io-package.json` - obligatorisch
* `main.js` - obligatorisch (kann` adapterName.js` sein)

Hinweis: lib / utils.js ist eine gemeinsame Datei für alle Adapter, mit der die Position des js-Controllers und der entsprechende Pfad zu iobroker.js-controller / lib / adapter.js ermittelt werden. Die meisten aktuellen utils.js können hier heruntergeladen werden. Ändern Sie diese Datei nicht.

## Dateinamen
Der Adapter muss einer Namenskonvention entsprechen, um vom ioBroker-Controller akzeptiert und gestartet zu werden.

* Auf github (oder woanders) muss es den Namen *io **B** roker.adapterName* haben.
* Wenn der Adapter auf npm verfügbar sein soll, muss er den Namen iobroker.adapterName haben, da npm doe snot Großbuchstaben in Paketnamen zulässt. Es kann in package.json definiert werden
* Die GUI-HTML-Datei für die Konfiguration des Adapters muss den Namen admin / index.html haben. Es können mehr Dateien im Verzeichnis "admin" sein, aber index.html muss vorhanden sein.
* Die Startdatei des Adapters muss den Namen main.js oder adapterName.js haben.
* Der Name des Adapters muss eindeutig sein, in Kleinbuchstaben, ohne Sonderzeichen und ohne Leerzeichen. "-", "_" sind im Namen des Adapters zulässig.

## Struktur von io-package.json
io-package.json wird von js-controller verwendet, um Informationen zum Adapter anzuzeigen und zu wissen, wie er zu behandeln ist. Eine vollständige Beschreibung aller Felder im gemeinsamen Teil finden Sie hier

io-package.json wird von "admin" gelesen, um die Online-Version des Adapters herauszufinden.

### Gemeinsame Felder
Die wichtigsten gemeinsamen Felder sind:

* `name`: obligatorisch. Name des Adapters ohne "ioBroker", wie "adapterName" und nicht "ioBroker.adapterName"
* `version`: obligatorisch. Muss mit package.json identisch sein.
* `title`: obligatorisch. Kurzname des Adapters, wie "Adaptername"
* `desc`: obligatorisch. Beschreibung des Adapters. Es kann eine Zeichenfolge wie "Dieser Adapter macht dies und das" oder ein Objekt wie:

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```

Wenn für die aktuelle Sprache kein Eintrag vorhanden ist, wird die Beschreibung in Englisch angezeigt.

* `Plattform`: obligatorisch. Eigentlich wird nur `Javascript / Node.js` unterstützt.
* `mode`: obligatorisch. Der Modus, in dem der Adapter gestartet wird.
* `enabled`: optional. Bei true wird die Instanz nach dem Hinzufügen aktiviert.
* `Lizenz`: Lizenzname unter dem der Adapter lizenziert ist;
* `loglevel`: anfängliche Protokollstufe, die nach der Erstellung der Instanz festgelegt wird. Kann "Debug", "Info", "Warnung" oder "Fehler" sein
* `readme`: Link zur Readme-Seite im Internet. Wird vom Admin-Adapter verwendet, um den Link anzuzeigen, wenn "?" Schaltfläche geklickt.
* `icon`: Symbolname (nicht der Pfad) des Adaptersymbols. Dieses Symbol muss sich im Administratorverzeichnis des Adapters befinden.
* `extIcon`: Symbolpfad im Internet, um das Symbol für den Adapter anzuzeigen, wenn der Adapter noch nicht installiert ist.
* `keywords`: Schlüsselwörter als Array, um die Suche im Admin-Adapter zu ermöglichen.
* `localLink`: Link zu Adapter" www "-Dateien (oder Adapter-Server). "http://192.168.0.100"
* `type`: Folgende Typen sind möglich:` Hardware, Social, Storage, Visual, API, Scripting, Wetter, andere, Verbindung`.
* `messagebox`: optional. Muss auf true gesetzt werden, wenn der Adapter Systemmeldungen empfangen soll.

Hinweis: localLink kann spezielle Schlüssel haben, die durch echte Werte ersetzt werden.

* `% ip%`: wird durch die IP-Adresse ersetzt, die in der ersten "Web" -Instanz definiert wurde.
* `% field%`, wobei field ein Attribut aus dem `nativen` Teil der Konfiguration der Adapterinstanz ist.

Z.B. `http://%ip%:%port%` werden als "http://192.168.0.1:8080" angezeigt, wobei "192.168.0.1" die IP-Adresse des "Web" -Adapters und 8080 der Wert von `system.adapter.adapterName.X => native.port` ist.

### Objektfelder
Objekte - statische Objekte für alle Instanzen des Adapters (xxx.object) Durch die Installation des Adapters (nicht die Instanzerstellung) können einige vordefinierte Objekte (normalerweise, die etwas beschreiben) automatisch erstellt werden. Diese Objekte dürfen nicht von einer bestimmten Instanz abhängen und gelten für alle Instanzen dieses Adapters. Zum Beispiel hat der hm-rpc-Adapter die Strukturbeschreibung aller HomeMatic-Geräte.

Zusätzlich können die neuen Ansichten definiert werden. In SQL heißen sie "gespeicherte Prozedur" und in couchDB - Ansichten.

Hinweis: Nicht mit `vis` Ansichten mischen.

Für Ansichtsdefinitionen wird die Javascript-Sprache verwendet. Hier ist das Beispiel:

```
{
	"_id": "_design/hm-rpc",
	"language": "javascript",
	"views": {
		"listDevices": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.[0-9]+\\.\\*?[A-Za-z0-9_-]+(\\.[0-9]+)?$/)) {\n   emit(doc._id, {ADDRESS:(doc.native?doc.native.ADDRESS:''),VERSION:(doc.native?doc.native.VERSION:'')});\n  }\n}"
		},
		"paramsetDescription": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.meta.type === 'paramsetDescription') {\n   emit(doc._id, doc);\n  }\n}"
		}
	}
}
```

Hier sind zwei Ansichten für den hm-rpc-Adapter definiert: `listDevices` und `paramsetDescription`.
Sie geben den Satz von nach Ansichtsbedingung gefilterten Objekten aus dem Datenspeicher zurück. Es kann effektiv (wenn CouchDB verwendet wird) die angegebene Liste von Objekten anfordern.

So verwenden Sie die Ansicht:

```
adapter.objects.getObjectView('hm-rpc', 'listDevices',
    {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'},
    function (err, doc) {
	    if (doc && doc.rows) {
		    for (var i = 0; i < doc.rows.length; i++) {
			    var id  = doc.rows[i].id;
			    var obj = doc.rows[i].value;
			    console.log('Found ' + id + ': ' + JSON.stringify(obj));
		    }
            if (!doc.rows.length) console.log('No objects found.');
	    } else {
		    console.log('No objects found: ' + err);
	    }
    }
);
```

Die Verwendung von `startkey` und `endkey` finden Sie ebenfalls auf derselben Seite.

Hinweis: Die Verwendung von Ansichten ist optional und erfordert vom Entwickler grundlegende Kenntnisse über CouchDB.

### Instanzobjektfelder
Einige bestimmte Objekte oder Objekte mit Typzuständen können in `instanceObjects` von `io-package.json` definiert werden.

Für jede erstellte Instanz werden alle Einträge aus dem Feld `instanceObjects` erstellt.

Zum Beispiel erstellt der Adapter `hm-rpc` den Status `updated` für jede Instanz, um einem anderen Adapter ein Signal zu geben, dass einige neue Geräte im Datenspeicher erscheinen und dass sie von `hm-rega` verarbeitet werden müssen.

```
"instanceObjects": [
	{
		"_id": "updated",
		"type": "state",
		"common": {
			"name": "Some new devices added",
			"type": "bool",
			"read":  true,
			"write": true
		}
	}
]
```

Es ist nicht erforderlich, den vollständigen Pfad des Objekts anzugeben, und dies ist nicht möglich, da die Adapterinstanz unbekannt ist.
Sie können das spezielle Wort `%INSTANCE%` in `common.name` verwenden, um es im Namen des Objekts anzuzeigen. Zum Beispiel:

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

Wird erweitert auf

```
"name": "Some new devices added in hm-rpc.0,
```

durch Erstellung der ersten Instanz.

### Package.json
package.json ist die Standardbeschreibungsdatei für das npm-Paket. Die vollständige Beschreibung finden Sie unter https://docs.npmjs.com/files/package.json.

Kurzstruktur von `package.json`:

```
{
  "name": "iobroker.adapterName",
  "version": "0.0.1",
  "description": "Adapter XXX",
  "author": "myName<myemail@mail.com>"
  "homepage": "https://github.com/yourgit/ioBroker.adapterName",
  "readme": "https://github.com/yourgit/ioBroker.adapterName/blob/master/README.md",
  "keywords": ["ioBroker", "adapterName"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourgit/ioBroker.adapterName"
  },
  "dependencies": {
    "myPacket1": "~0.3.1",
    "myPacket2": "~2.1.0"
  },
  "devDependencies": {
    "grunt": "~0.4.4",
    "grunt-replace": "~0.7.6",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-jscs": "~0.6.1",
    "grunt-http": "~1.4.1",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-compress": "~0.8.0",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-exec": "~0.4.5"
  },
  "bugs": {
    "url": "https://github.com/yourgit/ioBroker.adapterName/issues"
  },
  "main": "main.js",
  "license": "MIT"
}
```

!> Alle Felder sind Pflichtfelder. `devDependencies` sollten sich ebenfalls im Inneren befinden, um die Grunzaufgaben zu ermöglichen.

### Bereitstellen
Es wird empfohlen, den Code auf Github zu haben. Nachdem der Code stabil ist und der Adapter installiert werden kann, können Sie den Adapter für andere Benutzer freigeben, indem Sie ihn auffordern, den Adapter wie folgt zu installieren:

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

Wenn alles in Ordnung ist und Sie positives Feedback von Benutzern erhalten haben, können Sie den Adapter auf npm veröffentlichen.
Es wäre gut, wenn Sie vor der Veröffentlichung eine Veröffentlichung auf github erstellen würden.

Das Veröffentlichen kann mit folgendem Befehl erfolgen:

```
npm publish
```

Rufen Sie es im Adapterverzeichnis auf. Stellen Sie sicher, dass Sie alle anderen Dateien außer den erforderlichen gelöscht haben (z. B. `.idea`), oder fügen Sie sie der Datei `.gitignore` hinzu.

Natürlich müssen Sie zuerst das Konto auf npm erstellen

?> Hinweis: Sie können nicht zweimal den Code mit derselben Version veröffentlichen. Erhöhen Sie die Version in `package.json` und `io-package.json` vor der Veröffentlichung.

Nachdem der Adapter getestet wurde und andere Benutzer ihn nützlich finden, kann er in ein gemeinsames Repository übernommen werden, sodass er über den `admin` Adapter installiert werden kann.

## So erstellen Sie einen eigenen Adapter
Unter https://github.com/ioBroker/ioBroker.template finden Sie eine Vorlage Ihres eigenen Adapters.

Wenn Sie ein Widget oder einen Adapter mit einem Widget erstellen möchten, suchen Sie unter [ioBroker.vis-template] (https://github.com/ioBroker/ioBroker.vis-template) nach einer Vorlage Ihres eigenen Adapters.

### Struktur von main.js
```
var utils = require(__dirname + '/lib/utils'); // Get common adapter utils - mandatory
```

Diese Zeile lädt das Modul `lib/utils.js`. Allen Adapterfunktionen ist es gemeinsam, die Wurzel von `iobroker.js-controller` zu finden.
Weil der Adapter in drei verschiedenen Pfaden installiert werden kann:

* `... / iobroker / node_modules / iobroker.adapterName` - Dies ist der Standardpfad und wird zur Verwendung empfohlen
* `... / iobroker.js-controller / node_modules / iobroker.adapterName` - wird beim Debuggen verwendet
* `... / iobroker.js-controller / adapter / adapterName` - alter Stil (veraltet)

utils.js macht nichts anderes als sucht nach der Datei `iobroker.js-controller/lib/adapter.js` und lädt sie.

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

Diese Zeile erstellt das Objekt `adapter` mit dem Namen `adapterName`. Es lädt die gesamte Konfiguration für die Instanz `adapterName.X`, wobei X die Instanznummer des Adapters ist.

`js-controller` startet einen Adapter als Verzweigung des eigenen Prozesses mit zwei Parametern: Instanz- und Protokollebene; mögen:

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

Es wird alles automatisch in `adapter.js` verarbeitet und der Entwickler des Adapters darf sich nicht darum kümmern.

Der Adapter unterstützt 3 weitere Startflags:

* `--install` - Startet den Adapter, auch wenn keine Konfiguration vorhanden ist. Wird vom Adapter verwendet, um einen Installationsvorgang durch Installation des Adapters auszuführen.
* `--force` - Startet den Adapter, auch wenn er in der Konfiguration deaktiviert ist
* `--logs` - Zeigt Protokolle in der Konsole an, wenn sie nur in der Protokolltabelle angezeigt werden.

```
var myPacket1= require('myPacket1'); // add own module
```

Anschließend können Sie alle anderen im Adapter erforderlichen Module laden, z. B. `fs`, `require` usw.
Vergessen Sie nur nicht, sie in `package.json` zu deklarieren.

### Optionen des Adapters
Sie können Adapterobjekte nur mit Namen wie `utils.adapter('adapterName')` oder mit zusätzlichen Parametern wie: erstellen.

```
var adapter = utils.adapter({
    name: 'adapterName',    // mandatory - name of adapter
    dirname: '',            // optional - path to adapter (experts only)
    systemConfig: false,    // optional - if system global config must be included in object
                            // (content of iobroker-data/iobroker.json)
        config: null,       // optional - alternate global configuration for adapter (experts only)
    instance: null,         // optional - instance of the adapter
    useFormatDate: false,   // optional - if adapter wants format date according to global settings.
                            // if true (some libs must be preloaded) adapter can use "formatDate" function.
    logTransporter: false,  // optional - if adapter collects logs from all adapters (experts only)

    objectChange: null,     // optional - handler for subscribed objects changes
    message: null,          // optional - handler for messages for this adapter
    stateChange: null,      // optional - handler for subscribed states changes
    ready: null,            // optional - will be called when adapter is initialized
    unload: null,           // optional - will be called by adapter termination
    noNamespace: false      // optional - if true, stateChange will be called with id that has no namespace. Instead "adapter.0.state" => "state"
});
```

Alle Handler können durch Ereignisse (siehe unten) simuliert werden, wie z.

```
adapter.on('ready', function () {
    main();
});
```

### Attribute des Adapterobjekts
Wie Sie `adapter` Objekt mit erstellt haben

```
var adapter = utils.adapter('adapterName');
```

In dieser Objektinstanz werden folgende Attribute erstellt:

* `name` - Name des Adapters, z. B.` adapterName`
* `host` - Hostname, auf dem die Adapterinstanz ausgeführt wird
* `instance` - Instanznummer dieser Adapterinstanz
* `Namespace` - Namespace von Adapterobjekten, z. B.` adapterName.0`
* `config` - nativer Teil der Adaptereinstellungen
* `common` - gemeinsamer Teil der Adaptereinstellungen
* `systemConfig` - Inhalt von` iobroker-data / iobroker.json` (nur wenn` options.systemConfig = true`)
* `adapterDir` - Pfad zum Adapterordner
* `ioPack` - Inhalt von` io-package.json`
* `pack` - Inhalt von` package.json`
* `log` - Logger-Objekt
* `version` - Adapterversion
* `Staaten` - (nur Experten)
* `Objekte` - (nur für Experten)
* `verbunden` - wenn der Adapter mit dem Host verbunden ist

#### Wichtigste Ereignisse
```
adapter.on('objectChange', function (id, obj) {
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});
```

```
adapter.on('stateChange', function (id, state) {
* adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

* // you can use the ack flag to detect if state is command(false) or status(true)
* if (!state.ack) {
* * adapter.log.info('ack is not set!');
* }
});
```

!> *Einstiegspunkt* Nehmen Sie alle Initialisierungen in main vor, da vor "ready" keine Konfiguration erfolgt.

```
adapter.on('ready', function () {
* main();
});
```

#### Protokollierung
Es ist sehr wichtig, die Ereignisse für Debug- und Steuerungszwecke protokollieren zu können. Folgende Funktionen können zum Protokollieren der Ereignisse verwendet werden:

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

Es ist nicht erforderlich, den Ursprung oder die Zeit der Nachricht anzugeben. Diese Attribute werden automatisch hinzugefügt, z.

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

Natürlich können auch `console.log`, `console.debug` oder `console.error` verwendet werden, aber diese Meldungen sind nur sichtbar, wenn der Adapter manuell in der Konsole oder in der Programmier-IDE gestartet wurde.

#### Instanzkonfiguration
Es gibt ein Attribut des Adapterobjekts zum Lesen der Konfiguration der Instanz: `adapter.config`.
Dieses Objekt besteht aus `native` Teil des Objekts `system.adapter.adapterName.X`. Z.B. wenn `io-package.json` wie folgt aussieht:

```
{
   "common": {
       "name": "adapterName"
   },
   "native": {
       "location": "Stuttgart",
       "language": ""
   }
}
```

Die `adapter.config` sind also gleich:

```
{
   "location": "Stuttgart",
   "language": ""
}
```

und hat die Daten vom Benutzer im Konfigurationsdialog eingegeben. Sie können auf den **gemeinsamen** Teil der Instanzkonfiguration mit dem Attribut "common" des Objekts "adapter" zugreifen. Z.B. für das gezeigte io-package.json lautet "adapter.common":

```
{
   "name": "adapterName"
}
```

Um auf die ioBroker-Konfiguration zuzugreifen (gespeichert in der Datei `iobroker-data/iobroker.json`), setzen Sie die Adapteroption `systemConfig` auf true.

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    systemConfig:  true // load ioBroker configuration into systemConfig
});
```

Um das globale Datumsformat zu erhalten, muss die Option `useFormatDate` auf true gesetzt werden:

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    useFormatDate:  true  // load from system.config the global date format
});
```

Das Datumsformat ist unter adapter.dateFormat verfügbar.

Alle anderen Konfigurationen können manuell mit der Funktion `getForeignObject` gelesen werden.
Wie man den Zustand liest

Es gibt zwei Modi zum Lesen von Status im ioBroker-Adapter:

* Event-Abonnement (empfohlen)
* Abfrage

Um eigene Ereignisse zu abonnieren, muss der folgende Befehl aufgerufen werden:

`adapter.subscribeStates('*');` // Abonnieren Sie alle Variablen dieser Adapterinstanz mit dem Muster `adapterName.X.*`

`adapter.subscribeStates('memory*');` // Abonnieren Sie alle Variablen dieser Adapterinstanz mit dem Muster `adapterName.X.memory*`

So abonnieren Sie andere Veranstaltungen:

`adapter.subscribeForeignStates('yr.*.forecast.html');` // Abonnieren der Variablen `forecast.html` aller Adapterinstanzen `yr`.

Der Platzhalter "*" kann in beiden Funktionen verwendet werden.

Danach erhalten Sie das Ereignis `stateChange` und können mit diesem Wert etwas anfangen.
Nach dem Abonnement erhalten Sie nicht den aktuellen Status, da Ereignisse nur bei Änderung eintreten.
Um den Ausgangszustand zu erhalten, sollten Sie beim Start einmal "Abfrage" durchführen (normalerweise im Ereignis "Bereit").

Polling Um eigene Zustände beim Start zu lesen oder die Werte mit Intervall zu lesen, verwenden Sie die Funktion `adapter.getState` wie hier:

```
adapter.getState('myState', function (err, state) {

  adapter.log.info(
      'State ' + adapter.namespace + '.myState -' +
      '  Value: '    + state.val +
      ', ack: '      + state.ack +
      ', time stamp: '   + state.ts  +
      ', last changed: ' + state.lc
  );
});
```

Beachten Sie, dass dieses Ergebnis asynchron zurückgegeben wird.

Um Zustände anderer Adapter zu lesen, sollten Sie die Funktion `adapter.getForeignState` verwenden. Es werden keine Platzhalter unterstützt.

#### Befehle und Status
Wir sollten zwischen Befehlen und Status unterscheiden, wenn wir über Zustände sprechen. "Befehl" hat das Bestätigungsflag als falsch und wird vom Benutzer (über vis, Javascript-Adapter, Admin) gesendet, um die Geräte oder einen bestimmten Adapter zu steuern. Normalerweise werden Adapter (z. B. homematisch) für alle eigenen Änderungen abonniert, und wenn sich einige Zustände mit ack = false ändern, versuchen sie, diesen Befehl auszuführen (z. B. Licht an).

"Status" hat das Flag `ack` als wahr und zeigt an, dass es vom Gerät oder Dienst stammt.
Z.B. Wenn der Wetteradapter eine neue Wettervorhersage erhalten hat, wird diese mit `ack=true` veröffentlicht, oder wenn das homematische Thermometer eine neue Temperatur misst, wird sie auch mit `ack=true` veröffentlicht.
Selbst wenn der Benutzer das Licht physisch einschaltet, wird der neue Status mit `ack=true` veröffentlicht.

`Ack=false` werden normalerweise durch Ausführung nach der Antwort vom Gerät überschrieben.

Z.B. wenn der Benutzer in `vis` die Taste gedrückt und den Befehl `hm-rpc.0.kitchen.light=ON` gesendet hat.
Der Socket-io-Adapter sendet den neuen Status mit `kitchen.light = {val: 1, ack: false}` an die Instanz `hm-rpc.0`.

Der homematische Adapter ist für alle Zustände von `hm-rpc.0` abonniert, und wenn der neue Zustand mit `ack=false` empfangen wird, sendet er den neuen Wert an den physischen Schalter.

Der physische Schalter führt den Befehl aus und sendet den neuen eigenen Status EIN an den `hm-rpc` Adapter.
Der Adapter `hm-rpc.0` veröffentlicht den neuen Status des Staates `hm-rpc.0.kitchen.light={val: 1, ack: true}` (mit Zeitstempeln).

Diese Änderung wird vom hm-rpc-Adapter nicht ausgeführt, da ack true ist. Und dies ist eine Bestätigung vom physischen Gerät.

#### Wie schreibe ich den Status?
Zustände können als Befehle oder als Status geschrieben werden. Dafür müssen `adapter.setState` und `adapter.setForeignState` verwendet werden:

`adapter.setForeignState('otherAdapter.X.someState', 1);` // Andere Adapter steuern (es besteht keine Notwendigkeit, den eigenen Status zu steuern, wir können dies direkt tun)

`adapter.setState('myState', 1, true);` // neuen Status des eigenen Staates anzeigen

`adapter.setState('myState', {val: 1, ack: true});` // wie oben

```
adapter.setState('myState', 1, true, function (err) {
   // analyse if the state could be set (because of permissions)
   if (err) adapter.log.error(err);
});
```

Hinweis: Die folgenden Befehle sind identisch

```
adapter.setState('myState', 1, false);
adapter.setState('myState', 1);
```

#### Staatsstruktur
State ist ein Javascript-Objekt mit folgenden Attributen:

* `val`: Wert des Zustands (gewünschter Wert oder tatsächlicher Wert)
* `ack`: Richtungsflagge. false für den gewünschten Wert und true für den tatsächlichen Wert. Standard: false (Befehl)
* `ts`: Zeitstempel als Anzahl der Millisekunden zwischen Mitternacht des 1. Januar 1970 und dem angegebenen Datum. Ergebnis der Methode getTime () des Javascript-Objekts Date. Standard: aktuelle Zeit.
* `lc`: Zeitstempel der letzten Änderung. Gleiches Format wie ts, aber der Zeitstempel des Wertes ändert sich. Es kann sein, dass der Wert aktualisiert wird, der Wert jedoch gleich bleibt. In diesem Fall wird lc nicht geändert.
* `from`: Name der Adapterinstanz, die den Wert festlegt, z. "system.adapter.web.0" (Bei vis)
* `expire`: (optional) Es besteht die Möglichkeit, das Ablaufzeitlimit in Sekunden festzulegen. Nach dieser Zeit wird die Variable auf "null" gesetzt. Es wird z.B. durch "aktive" Zustände der Adapterinstanzen. Wenn die Adapterinstanz innerhalb von 30 Sekunden keinen "aktiven" Status auslöst, wird sie als "down" markiert. Um den Status mit Ablauf festzulegen, verwenden Sie den folgenden Code setState ('Variable', {val: true, expire: 30})
* `q`: (optional) Qualität. Siehe hier die Beschreibung

Betriebsmodi des Adapters

Der Adapter kann in verschiedenen Modi ausgeführt werden. Der Modus für den Adapter kann über das Attribut common.mode definiert werden.

* `none` - Dieser Adapter wird nicht gestartet.
* `daemon` - immer laufender Prozess (wird neu gestartet, wenn der Prozess beendet wird)
* `subscribe` - wird gestartet, wenn der Status system.adapter ... lebendig auf true wechselt. Wird beendet, wenn .alive in false geändert wird, und setzt .alive auf false, wenn der Prozess beendet wird (wird beim Beenden des Prozesses nicht neu gestartet).
* `Zeitplan` - wird nach dem in system.adapter ... common.schedule gefundenen Zeitplan gestartet - reagiert auf Änderungen des .schedule durch Neuplanung mit neuem Status
* `einmal` - Dieser Adapter wird jedes Mal gestartet, wenn das Objekt system.adapter .. geändert wird. Es wird nach Beendigung nicht neu gestartet.

Normalerweise sollten Adapter den Modus-Daemon verwenden.

Wenn der Adapter nur alle X Minuten etwas überprüft, sollte er den Modus `schedule` verwenden und den Cron-Zeitplan gemeinsam definieren (z. B. `1 * * * *` - jede Stunde).

#### Wie lese ich ein Objekt?
Objekte können mit dem Befehl getObject oder getForeignObject gelesen werden:

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
  if (err) {
    adapter.log.error(err);
  } else {
    adapter.log.info(JSON.stringify(obj));
  }
});

adapter.getObject('myObject', function (err, obj) {

});
```

Funktionen sind immer asynchron.

Objekte des Adapters müssen in Geräten, Kanälen und Zuständen organisiert sein.

Siehe: getForeignObjects, findForeignObject, getForeignObject, getDevices, getChannels, getStatesOf

#### Wie schreibe ich ein Objekt?
Zum Schreiben der Objekte können im Allgemeinen zwei Funktionen verwendet werden: `setObject, setForeignObject`. Es gibt jedoch viele Hilfefunktionen zum Ändern von Objekten:

* `verlängernObject, verlängernForeignObject`
* `delObject, delForeignObject`
* `setObjectNotExists, setForeignObjectNotExists`
* `createDevice, deleteDevice`
* `createChannel, deleteChannel`
* `createState, deleteState`
* `addStateToEnum, deleteStateFromEnum`

extensObject liest nur ein Objekt, verschmilzt mit einem bestimmten Objekt und schreibt ein Objekt zurück.

Der Unterschied zwischen `xxxObject` und `xxxForeignObject` besteht darin, dass `xxxObject` die Objekt-ID automatisch um `adapter.instance.` Text erweitert.

Funktionen sind immer asynchron.

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
  if (err) {
    adapter.log.error(err);
  } else {
    adapter.log.info(JSON.stringify(obj));
    obj.native = {}; // modify object
    adapter.setForeignObject(obj._id, obj, function (err) {
      if (err) adapter.log.error(err);
    });
  }
});
```

#### Info.connection
Wenn der Adapter eine Verbindung herstellt und überwacht (z. B. zu einem gesteuerten Gerät), sollte er eine Variable `info.connection` erstellen und warten.

In diesem Fall wird der Verbindungsstatus in der Liste der Instanz in `admin` angezeigt. Falls gewünscht, hängt die Qualität der Zustände vom Verbindungsstatus ab.

## Funktionen
```
* setObject = function setObject(id, obj, callback)
* extendObject = function extendObject(id, obj, callback)
* setForeignObject = function setForeignObject(id, obj, callback)
* extendForeignObject = function extendForeignObject(id, obj, callback)
* getEnum = function getEnum(_enum, callback)
* getEnums = function getEnums(_enumList, callback)
* getForeignObjects = function getForeignObjects(pattern, type, enums, callback)
* findForeignObject = function findForeignState(id, type, callback)
* getForeignObject = function getForeignObject(id, callback)
* delObject = function delObject(id, callback)
* delForeignObject = function delForeignObject(id, callback)
* subscribeObjects = function subscribeObjects(pattern)
* subscribeForeignObjects = function subscribeObjects(pattern)
* setObjectNotExists = function setObjectNotExists(id, object, callback)
* setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, callback)
* createDevice = function createDevice(deviceName, common, _native, callback)
* createChannel = function createChannel(parentDevice, channelName, roleOrCommon, _native, callback)
* createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, _native, callback)
* deleteDevice = function deleteDevice(deviceName, callback)
* addChannelToEnum = function addChannelToEnum(enumName, addTo, parentDevice, channelName, callback)
* deleteChannelFromEnum = function deleteChannelFromEnum(enumName, parentDevice, channelName, callback)
* deleteChannel = function deleteChannel(parentDevice, channelName, callback)
* deleteState = function deleteState(parentDevice, parentChannel, stateName, callback)
* deleteStateFromEnum('', parentDevice, parentChannel, stateName);
* getDevices = function getDevices(callback)
* getChannelsOf = function getChannelsOf(parentDevice, callback)
* getStatesOf = function getStatesOf(parentDevice, parentChannel, callback)
* addStateToEnum = function addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, callback)
* deleteStateFromEnum = function deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, callback)
* rmDir = function rmDir(path, callback)
* mkDir = function mkDir(path, mode, callback)
* readDir = function readDir(adapter, path, callback)
* unlink = function unlink(adapter, name, callback)
* rename = function rename(adapter, oldName, newName, callback)
* mkdir = function mkdir(adapter, dirname, callback)
* readFile = function readFile(adapter, filename, options, callback)
* writeFile = function writeFile(adapter, filename, data, mimeType, callback)
* formatDate = function formatDate(dateObj, isSeconds, _format)
* sendTo = function sendTo(objName, command, message, callback)
* sendToHost = function sendToHost(objName, command, message, callback)
* setState = function setState(id, state, callback)
* setForeignState = function setForeignState(id, state, callback)
* getState = function getState(id, callback)
* getStateHistory = function getStateHistory(id, start, end, callback)
* getForeignStateHistory = function getStateHistory(id, start, end, callback)
* idToDCS = function idToDCS(id)
* getForeignState = function getForeignState(id, callback)
* delForeignState = function delForeignState(id, callback)
* delState = function delState(id, callback)
* getStates = function getStates(pattern, callback)
* getForeignStates = function getForeignStates(pattern, callback)
* subscribeForeignStates = function subscribeForeignStates(pattern)
* unsubscribeForeignStates = function unsubscribeForeignStates(pattern)
* subscribeStates = function subscribeStates(pattern)
* pushFifo = function pushFifo(id, state, callback)
* trimFifo = function trimFifo(id, start, end, callback)
* getFifoRange = function getFifoRange(id, start, end, callback)
* getFifo = function getFifo(id, callback)
* lenFifo = function lenFifo(id, callback)
* subscribeFifo = function subscribeFifo(pattern)
* getSession = function getSession(id, callback)
* setSession = function setSession(id, ttl, data, callback)
* destroySession = function destroySession(id, callback)
* getMessage = function getMessage(callback)
* lenMessage = function lenMessage(callback)
* setBinaryState = function setBinaryState(id, binary, callback)
* getBinaryState = function getBinaryState(id, callback)
* getPort = function adapterGetPort(port, callback)
* checkPassword = function checkPassword(user, pw, callback)
* setPassword = function setPassword(user, pw, callback)
* checkGroup = function checkGroup(user, group, callback)
* stop (common.mode: subscribe, schedule, once)
* log.debug(msg)
* log.info(msg)
* log.warn(msg)
* log.error(msg)
```

## Veranstaltungen
```
* ready
* objectChange(id, obj) (Warning obj can be null if deleted)
* message(obj)
* stateChange(id, state) (Warning state can be null if deleted)
* unload
```

### So erstellen Sie eine Instanz
Vor der Veröffentlichung in npm: In ioBroker / node_modules kopieren, zu `admin` gehen und Instanz hinzufügen Nach der Veröffentlichung in npm: zu `ioBroker/` gehen und `npm install iobroker.xxx --production --no-optional --logevel=error` schreiben, zu `admin` gehen und hinzufügen Beispiel

## So debuggen Sie
* Starten Sie ioBroker
* Instanz des Adapters hinzufügen
* Instanz des Adapters deaktivieren
* Starten Sie WebStorm
* Konfiguration für Debug mit node.js erstellen
* Flags für die Anwendung: `--force, instance, log level` (Sie können den Adapter als` node xxx.js 1 debug --force` starten, 1 ist der Instanzindex (standardmäßig 0, debug ist die Protokollebene und `- -force` bedeutet, dass die Einstellungen "enabled: false" ignoriert werden.)

## Admin.html
```
* function showMessage(message, title, icon)
* function getObject(id, callback)
* function getState(id, callback)
* function getEnums(_enum, callback)
* function getIPs(host, callback)
* function fillSelectIPs(id, actualAddr, noIPv4, noIPv6)
* function sendTo(_adapter_instance, command, message, callback)
* function sendToHost(host, command, message, callback)
* function fillSelectCertificates(id, type, actualValued)
* function getAdapterInstances(_adapter, callback)
* function getIsAdapterAlive(_adapter, callback)
* function addToTable(tabId, value, $grid, _isInitial)
* function enumName2Id(enums, name)
* function editTable(tabId, cols, values, top, onChange)
* function getTableResult(tabId, cols)
```

## Beste Übung