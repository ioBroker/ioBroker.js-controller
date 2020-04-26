---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: kvmr/STXUvUUlD5loJavs7GahNyBQDsN0hBq3IpB90U=
---
![Logo](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Anzahl der Installationen](http://iobroker.live/badges/socketio-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io
Dieser Adapter wird von einigen WEB-Anwendungen und Adaptern verwendet, um mit ioBroker über das Protokoll socket.io zu kommunizieren.

Benutzer können diesen Adapter verwenden, um ihre Produkte über Web-Sockets mit ioBroker zu verbinden. Tatsächlich wird dieser Adapter von Flot, Rickshaw, Vis und Mobile verwendet, um Daten aus ioBroker zu extrahieren.

Im Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) finden Sie eine einfache Anwendung, die über diese Schnittstelle einige Daten anzeigt.

Unter Verwendung der Schnittstelle socket.io sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist nützlich, auch über die [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Kurze Beschreibung des Konzepts
### Objekt
Objekt ist eine Beschreibung des Datenpunkts oder der Datengruppe. Die Gruppe könnte andere Datenpunkte in diesem Fall als Kanal bezeichnen. Wenn die Gruppe in diesem Fall aus anderen Kanälen besteht, wird sie als Gerät bezeichnet.

Objekt ist eine Metainformation, die den Datenpunkt beschreibt und Inhalt enthalten kann: Max / Min-Wert, Einheit, Name, Standardwert, Werttyp, Informationen für den Adapter für die Kommunikation (z. B. IP-Adresse) und so weiter.

### Zustand
Der Status ist der tatsächliche Wert des Datenpunkts und wird vom Javascript-Objekt dargestellt:

```
{
    val: VALUE,
    ack: ACKNOWLEDGED,
    ts: TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    lc: TIMESTAMP of last change,
    from: ADAPTER_NAME,
    q: QUALITY
}
```

Zustände ändern sich sehr häufig im Vergleich zu Objekten. (Normalerweise sollten Objekte durch Erstellung einmal geändert werden und das ist alles)

### Wissen
Jeder Staat hat das Attribut "ack". Es zeigt die Befehlsrichtung.

- Wenn ack = false ist, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, damit der Befehl ausgeführt wird (z. B. wird das Licht eingeschaltet).
- Wenn ack = true, bedeutet dies, dass das Gerät über einen neuen Wert informiert. (z. B. wurde das Licht manuell eingeschaltet oder eine Bewegung wurde erkannt)

** Beispiel **: Wir haben einen Hausautomationsadapter (HAA), an den eine Lampe unter der Adresse *haa.0.lamp1* angeschlossen ist.

- Die Lampe kann manuell mit einem physischen Schalter oder über WLAN mit Hilfe von HAA eingeschaltet werden.
- Wenn vis die Lampe über WLAN einschalten möchte, sollte der neue Wert mit `` `{value: true, ack: false}` `` eingestellt werden.
- Wenn die Lampe eingeschaltet ist, wird HAA normalerweise über den neuen Status informiert und der Wert sollte sofort mit `` `{value: true, ack: true}` `` überschrieben werden.
- Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert sie HAA über den neuen Status mit `` `{Wert: falsch, ack: wahr}` ``.

### Qualität
Jeder Datenpunkt hat das Attribut **q** - *Qualität*

## Verwendungszweck
Es wird empfohlen, example / conn.js für die Kommunikation zu verwenden.

Nach Aufnahme der Datei conn.js kann das globale Objekt **servConn** verwendet werden, um die Kommunikation mit dem Socketio-Adapter herzustellen.

Das Objekt **servConn** verfügt über Aushöhlungsmethoden:

### Drin
- Funktion (connOptions, connCallbacks, Objekte Erforderlich)

** connOptions ** - ist ein optionaler Parameter:

```
connOptions = {
    name:          'name of the connection', // optional - default 'vis.0', used to distinguish connections in socket-io adapter.
    connLink:      'http://localhost:8084',  // optional - URL of the socket.io adapter. By default it is same URL where the WEB server is.
    socketSession: ''                        // optional - default 'nokey', and used by authentication
};
```

Sie können diese Parameter übergeben, indem Sie die globalen Variablen auch vor dem Aufruf von "init" definieren:

```
var socketUrl      = 'http://localhost:8084';  // is connOptions.connLink
var socketSession  = '';                       // is connOptions.socketSession
servConn.namespace = 'myapp';                  // is connOptions.name
```

** connCallbacks ** - Objekt mit Rückrufen:

```
connCallbacks = {
    onConnChange:   function (isConnected) {}, // optional - called if connection state changed.
    onObjectChange: function (id, obj)     {}, // optional - called if content of some object is changed, new object created or object was deleted (obj = null)
    onUpdate:       function (id, state)   {}, // optional - called if state of some object is changed, new state for object is created or state was deleted (state = null)
    onError:        function (error)       {}  // optional - called if some error occurs
};
```

### SetState
- Funktion (pointId, Wert, Rückruf)

Setzen Sie einen neuen Wert für einen Datenpunkt.

Z.B. ```servConn.setState('adapter.0.myvalue', true)``` schreibt ```{val: true, ack: false}``` in *adapter.0.myvalue*

- **pointId** - ist die ID des Status, wie *adapter.0.myvalue*
- **value** - neuer Wert des Status, kann ein einfacher Wert (Zeichenfolge, Zahl, Boolescher Wert) oder ein Objekt wie `` `{val: newValue, ack: false, q: 0}` `` sein.

Falls ein einfacher Wert verwendet wird, wird "ack" auf "false" gesetzt.

- **Rückruf** - `` `Funktion (Fehler) {}` `` - Wird aufgerufen, wenn das Schreiben eines neuen Werts in die Datenbank ausgeführt wird (nicht, wenn das Gerät gesteuert wurde).

### GetStates
- Funktion (IDs, Rückruf)

Erhalten Sie die Zustände von mehr als einem Zustand. Dieser Befehl wird normalerweise aufgerufen, nachdem die Verbindung hergestellt wurde, um den tatsächlichen Status der verwendeten Datenpunkte abzurufen.

- **IDs** - Muster oder Array mit IDs. Könnte weggelassen werden, um alle Zustände zu erhalten. Muster können Platzhalter haben, z. B.: '* .STATE', 'haa.0. *'
- **Rückruf** - `` `Funktion (Fehler, Zustände) {}` `` - *Zustände* ist ein Objekt wie `` `{'id1': 'state1', 'id2': 'state2', .. .} `` `. *stateX* sind Objekte mit der oben beschriebenen Struktur (# state).

### HttpGet
- Funktion (URL, Rückruf)

Ruft diese URL vom PC auf, auf dem der Socketio-Adapter ausgeführt wird.

- **url** - ist die anzurufende Adresse.
- **Rückruf** - `` `Funktion (Daten) {}` `` - Ergebnis der Anfrage (HTML-Body).

### LogError
- Funktion (errorText)

schreibt eine Fehlermeldung in das Protokoll des Controllers.

### GetConfig
- Funktion (Rückruf)

Liest die Controller-Konfiguration wie Sprache, Temperatureinheiten, Punkt- oder Komma-Trennzeichen in Gleitkommazahlen, Datumsformat.

- **Rückruf** - `` `Funktion (err, config) {}` `` - config sieht aus wie:

```
{
  "_id": "system.config",
  "type": "config",
  "common": {
    "name":             "System configuration",
    "language":         "de",
    "tempUnit":         "°C",
    "currency":         "€",
    "dateFormat":       "DD.MM.YYYY",
    "isFloatComma":     true,
    "licenseConfirmed": true,
    "activeRepo":       "fast-online",
    "diag":             "extended",
    "defaultHistory":   ""
  }
}
```

### GetObject
- Funktion (ID, Rückruf)

Lesen Sie ein bestimmtes Objekt aus der Datenbank. Mit dieser Funktion konnten die Metainformationen eines Objekts gelesen werden.

- **id** - id des Staates, wie "haa.0.light1",
- **Rückruf** - `` `Funktion (Fehler, obj)` `` - obj sieht aus wie:

```
{
  "_id": "haa.0.light1",
  "type": "state",
  "common": {
    "def": false,
    "type": "boolean",
    "read": false,
    "write": true,
    "role": "switch",
    "name": "light in floor"
  },
  "native": {
    "CONTROL": "BUTTON.LONG",
    "DEFAULT": false,
    "FLAGS": 1,
    "ID": "PRESS_LONG",
    "MAX": true,
    "MIN": false,
    "OPERATIONS": 6,
    "TAB_ORDER": 1,
    "TYPE": "ACTION",
    "UNIT": ""
  },
  "enums": ['enum.rooms.floor'],
  "acl": {
    "object": 1638,
    "state": 1638
  }
}
```

### GetObjects
- Funktion (Rückruf)

Lesen Sie alle Objekte aus der Datenbank.

- **Rückruf** - `` `Funktion (Fehler, objs)` `` - objs sieht aus wie: `` `{'id1': 'object1', 'id2': 'object2', ...}` ` `

### ReadDir
- Funktion (dirName, Rückruf)

liest Dateien und Verzeichnisse im angegebenen Verzeichnis.

Dateien werden in der Datenbank (oder ähnlichem) gespeichert und sollten normalerweise nicht direkt aufgerufen werden. Der Dateiname besteht aus Pfad, Dateiname und Dateierweiterung wie "/mobile.0/data/fileName.txt".

- dirName - Name des Verzeichnisses wie */ mobile.0 / data*
- Rückruf - `` `Funktion (Fehler, Liste)` `` - Liste sieht aus wie:

```
[
    {
        file:       'file1.txt',
        stats:      {
                      mode: 33188,
                      size: 527,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      false,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    {
        file:       'main',
        stats:      {
                      mode: 33188,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      true,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    ...
]
```

### Mkdir
- Funktion (dirName, Rückruf)

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### Verknüpfung aufheben
- Funktion (Name, Rückruf)

löscht Datei oder Verzeichnis. Das Verzeichnis muss leer sein, um gelöscht zu werden.

- dirName - Name des Verzeichnisses oder der Datei wie */ mobile.0 / data*
- **Rückruf** - `` `Funktion (Fehler) {}` ``

### ReadFile
- Funktion (Dateiname, Rückruf)

- **Rückruf** - `` `Funktion (Fehler, fileData, mimeType)` ``

### ReadFile64
- Funktion (Dateiname, Rückruf)

- **Rückruf** - `` `Funktion (Fehler, Daten)` `` - Daten sind `` `{mime: mimeType, Daten: base64data}` ``

### WriteFile
- Funktion (Dateiname, Daten, Modus, Rückruf)

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### WriteFile64
- Funktion (Dateiname, Daten, Modus, Rückruf)

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### Datei umbenennen
- Funktion (alter Name, neuer Name, Rückruf)

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### GetHistory
- Funktion (Instanz, Optionen, Rückruf)

- **Rückruf** - `` `Funktion (Fehler, Daten, Schritt, Sitzungs-ID) {}` ``

### RequireLog
- Funktion (isRequire, Rückruf)

Aktiviert / deaktiviert den Protokollempfang für diesen Socket.

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### AuthEnabled
- Funktion ()

liest, ob die Authentifizierung aktiviert ist und welcher Benutzer angemeldet ist

- **Rückruf** - `` `Funktion (authEnabled, currentUser) {}` ``

Wenn die Authentifizierung aktiviert ist, wird der aktuell angemeldete Benutzer zurückgegeben. Wenn die Authentifizierung deaktiviert ist, wird der Standardbenutzer "Ausführen als" zurückgegeben.

## Web-Sockets optimieren
Auf einigen Web-Sockets-Clients gibt es Leistungsprobleme bei der Kommunikation. Manchmal ist dieses Problem auf einen Fallback der Socket.io-Kommunikation bei einem langen Abfragemechanismus zurückzuführen.
Sie können die Option *Web-Sockets erzwingen* so einstellen, dass nur der Transport von Web-Sockets erzwungen wird.

## Changelog
### 3.0.5 (2020-04-23)
* (bluefox) Caught the web server errors

### 3.0.4 (2020-04-23)
* fix crash reason when server closes (Sentry IOBROKER-SOCKETIO-2/3/4/5)

### 3.0.3 (2020-04-16)
* (Apollon77) Remove usage of deprecated object methods; prevent js-controller 3.0 warnings
* (Apollon77) Add Sentry error reporting

### 3.0.2 (2020-03-07)
* (bluefox) Unload of adapter was corrected

### 3.0.1 (2020-02-23)
* (Apollon77) Workaround for socket.io bug #3555 added to make sure always the correct client files are delivered

### 3.0.0 (2020-01-15)
* (Apollon77) upgrade all dependencies, especially socketio to current version! This might break ipad 1/2 devices

### 2.1.2 (2019-09-28)
* (Apollon77) optimize shutdown for compact mode

### 2.1.1 (2018-06-09)
* (bluefox) Used socket.io Version 1.7.2
* (bluefox) Fix authentication problem

### 2.1.0 (2018-05-04)
* (bluefox) Used socket.io Version 1.7.4

### 2.0.1 (2018-02-28)
* (bluefox) Dropped support of old browsers. Please do not update if you have iPad 1 and so on.

### 1.9.0 (2018-01-14)
* (bluefox) Ready for admin3

### 1.8.7 (2017-11-29)
* (bluefox) Tune cloud work

### 1.8.5 (2017-10-22)
* (bluefox) Escape [] in subscriptions

### 1.8.4 (2017-10-16)
* (bluefox) Check callback validity

### 1.8.3 (2017-10-09)
* (bluefox) Allow authentication via URL

### 1.8.2 (2017-09-20)
* (bluefox) Fix cmdExec command

### 1.8.1 (2017-09-13)
* (bluefox) Fix user access rights for sendToHost

### 1.8.0 (2017-08-06)
* (bluefox) Support the access to admin via iobroker.pro

### 1.7.5 (2017-05-24)
* (bluefox) fix error if subscribe is empty

### 1.7.4 (2017-01-04)
* (bluefox) fix error with authentication

### 1.7.3 (2016-11-13)
* (bluefox) support of socket extensions

### 1.7.2 (2016-11-06)
* (bluefox) Fix unsubscribe of states

### 1.7.1 (2016-10-11)
* (bluefox) Fix authentication for app

### 1.7.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.6.1 (2016-08-29)
* (bluefox) fix error by checking user name

### 1.6.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.5.4 (2016-08-26)
* (bluefox) fix error in socket.js

### 1.5.3 (2016-08-14)
* (bluefox) support of force only web sockets transport

### 1.5.2 (2016-07-06)
* (bluefox) support of chained certificates

### 1.5.1 (2016-06-28)
* (bluefox) add sendToHost command

### 1.5.0 (2016-06-17)
* (bluefox) preparations for cloud

### 1.4.1 (2016-05-13)
* (bluefox) change getHistory function

### 1.4.0 (2016-04-24)
* (bluefox) encode json files

### 1.3.0 (2016-03-17)
* (bluefox) rename files

### 1.2.3 (2015-12-24)
* (bluefox) support of authentication over URL

### 1.2.2 (2015-12-09)
* (bluefox) remove unused parameter "cache"

### 1.2.0 (2015-11-15)
* (bluefox) add version compatibility check

### 1.1.0 (2015-11-14)
* (Smiling_Jack) add getHistory

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.4.5 (2015-08-11)
* (bluefox) update packets

### 0.4.4 (2015-07-07)
* (bluefox) extend writeFile with mode

### 0.4.3 (2015-07-06)
* (bluefox) add chmodFile

### 0.4.1 (2015-06-13)
* (bluefox) add default ttl
* (bluefox) enable run from "web" and add permissions check

### 0.4.0 (2015-06-13)
* (bluefox) add permissions support

### 0.3.1 (2015-05-19)
* (bluefox) support of subscribe on objectChanged

### 0.3.0 (2015-04-23)
* (bluefox) enable security

### 0.2.3 (2015-03-07)
* (bluefox) extend getStates to support list of objects

### 0.2.2 (2015-02-14)
* (bluefox) fix error with objectChanged event

### 0.2.0 (2015-01-16)
* (bluefox) make socket usable as module

### 0.1.6 (2015-01-08)
* (bluefox) support of subscribe for different sockets. Support of socket names. Diagnostic info in socket.0.connected

### 0.1.5 (2015-01-07)
* (bluefox) fix error with update of states and objects

### 0.1.4 (2015-01-06)
* (bluefox) support of file manager in vis

### 0.1.3 (2015-01-02)
* (bluefox) enable adapter by default

### 0.1.2 (2015-01-02)
* (bluefox) add "request" module to package.json

### 0.1.1 (2015-01-02)
* (bluefox) enable npm install

### 0.1.0 (2014-12-28)
* (bluefox) support of read/write files

### 0.0.5 (2014-12-19)
* (bluefox) support of setObjects command

### 0.0.4 (2014-12-10)
* (bluefox) support of https sockets

### 0.0.3 (2014-12-05)
* (bluefox) support of https sockets

### 0.0.2 (2014-11-24)
* (bluefox) fix error by start

### 0.0.1 (2014-10-10)
* (bluefox) authentication works

## License

The MIT License (MIT)

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>