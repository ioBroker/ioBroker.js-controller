---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: f1lFcY3hIeuPTSEZN1GmfOuiuQW7C10OzaOn5sLMO6Y=
---
![Logo](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Anzahl der Installationen](http://iobroker.live/badges/socketio-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io ===================
Dieser Adapter wird von einigen WEB-Anwendungen und Adaptern für die Kommunikation mit ioBroker verwendet.

Benutzer können diesen Adapter verwenden, um ihre Produkte über Web-Sockets mit ioBroker zu verbinden. Tatsächlich wird dieser Adapter von Flot, Rickshaw, Vis und Mobile verwendet, um Daten aus dem ioBroker zu extrahieren.

Sie finden in dem Beispiel [Verzeichnis](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) eine einfache Anwendung, die diese Schnittstelle verwendet, um einige Daten anzuzeigen.

Durch die Verwendung der Socket.io-Schnittstelle sollte der Benutzer die [Grundlagen und Konzept](https://github.com/ioBroker/ioBroker) des Systems verstehen.

Es ist auch nützlich, über die [Struktur der Objekte](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) zu lesen.

## Kurzbeschreibung des Konzepts
### Objekt
Objekt ist die Beschreibung eines Datenpunkts oder einer Gruppe. Die Gruppe könnte andere Datenpunkte enthalten. In diesem Fall wird sie als Kanal bezeichnet. Wenn die Gruppe aus anderen Kanälen besteht, wird sie als Gerät bezeichnet.

Objekt ist eine Meta-Information, die Datenpunkte beschreibt und deren Inhalt enthalten könnte: Max / Min-Wert, Einheit, Name, Standardwert, Wertetyp, Informationen für den Kommunikationsadapter (z. B. IP-Adresse) usw.

### Zustand
Der Zustand ist der tatsächliche Wert des Datenpunkts und wird vom Javascript-Objekt dargestellt:

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

Staaten ändern sich sehr häufig im Vergleich zu Objekten. (Normalerweise sollten Objekte einmal durch die Erstellung geändert werden und das ist alles)

### Wissen
Jeder Staat hat das Attribut "ack". Es zeigt die Befehlsrichtung.

- Wenn ack = false, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, so dass der Befehl ausgeführt wird (z. B. wird das Licht eingeschaltet).
- Wenn ack = true ist, bedeutet dies, dass das Gerät über den neuen Wert informiert. (Licht wurde z. B. manuell eingeschaltet oder Bewegung erkannt)

** Beispiel **: Wir haben einen Hausautomationsadapter (HAA), an den eine Lampe unter Adresse *haa.0.lamp1* angeschlossen ist.

- Die Lampe kann manuell mit einem physischen Schalter oder über WLAN mit Hilfe von HAA eingeschaltet werden.
- Wenn vis die Lampe über WLAN einschalten möchte, sollte der neue Wert auf `` {value: true, ack: false} `` `gesetzt werden.
- Wenn die Lampe eingeschaltet ist, wird HAA normalerweise über den neuen Status informiert und der Wert sollte sofort mit `` {Wert: true, ack: true} `` `überschrieben werden.
- Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert sie HAA über den neuen Zustand mit `` {Wert: falsch, ack: wahr} `` `.

### Qualität
Jeder Datenpunkt hat das Attribut **q** - *Qualität*

## Verwendungszweck
Es wird empfohlen, example / conn.js für die Kommunikation zu verwenden.

Nach dem Einbinden der Datei conn.js kann das globale Objekt **servConn** verwendet werden, um die Kommunikation mit dem Socketio-Adapter herzustellen.

** servConn ** -Objekt verfügt über Ausweichmethoden:

### Drin
- Funktion (connOptions, connCallbacks, objectsRequired)

** connOptions ** - ist optionaler Parameter:

```
connOptions = {
    name:          'name of the connection', // optional - default 'vis.0', used to distinguish connections in socket-io adapter.
    connLink:      'http://localhost:8084',  // optional - URL of the socket.io adapter. By default it is same URL where the WEB server is.
    socketSession: ''                        // optional - default 'nokey', and used by authentication
};
```

Sie können diese Parameter übergeben, indem Sie auch die globalen Variablen vor dem Aufruf von "init" definieren:

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
- Funktion (pointId, value, callback)

Setzt einen neuen Wert für einen Datenpunkt.

Z.B. ```servConn.setState('adapter.0.myvalue', true)``` schreibt ```{val: true, ack: false}``` in *adapter.0.myvalue*

- **pointId** - ist die ID des Zustands wie *adapter.0.myvalue*
- **value** - Neuer Wert des Zustands, kann ein einfacher Wert (Zeichenfolge, Zahl, Boolescher Wert) oder ein Objekt wie `` {val: newValue, ack: false, q: 0} `` `sein.

Wenn ein einfacher Wert verwendet wird, wird "ack" auf "false" gesetzt.

- **callback** - `` `function (error) {}` `` - wird aufgerufen, wenn der neue Wert in den DB geschrieben wird (nicht wenn das Gerät gesteuert wurde).

### GetStates
- Funktion (IDs, Rückruf)

Holen Sie sich die Zustände von mehr als einem Zustand. Dieser Befehl wird normalerweise nach dem Verbindungsaufbau aufgerufen, um die tatsächlichen Zustände der verwendeten Datenpunkte abzurufen.

- **IDs** - Muster oder Array mit IDs. Könnte ausgelassen werden, um alle Zustände zu erhalten. Muster können Platzhalterzeichen haben, wie: '* .STATE', 'haa.0. *'
- **callback** - `` `funktion (fehler, zustände) {}` `` - *states* ist objekt wie `` {'id1': 'state1', 'id2': 'state2', .. .} `` `. *stateX* sind Objekte mit der beschriebenen Struktur [#] (# state).

### HttpGet
- Funktion (URL, Rückruf)

Ruft diese URL vom PC aus auf, auf dem der Socketio-Adapter ausgeführt wird.

- **url** - ist die anzurufende Adresse.
- **Rückruf** - `` `Funktion (Daten) {}` `` - Ergebnis der Anforderung (HTML-Body).

### LogError
- Funktion (errorText)

schreibt eine Fehlermeldung in das Protokoll des Controllers.

### GetConfig
- Funktion (Rückruf)

Liest die Controller-Konfiguration wie Sprache, Temperatureinheiten, Punkt- oder Komma-Trennzeichen in Floats und Datumsformat.

- **callback** - `` `funktion (err, config) {}` `` - config sieht so aus:

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

Bestimmtes Objekt aus der DB lesen. Mit dieser Funktion können die Metainformationen eines Objekts gelesen werden.

- **id** - id des Staates wie "haa.0.light1",
- **callback** - `` `funktion (error, obj)` `` - obj sieht so aus:

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

Lesen Sie alle Objekte aus der DB.

- **callback** - `` `funktion (error, objs)` `- objs sieht folgendermaßen aus:` `{'id1': 'object1', 'id2': 'object2', ...}` ` `

### ReadDir
- Funktion (dirName, Callback)

Liest Dateien und Verzeichnisse im angegebenen Verzeichnis.

Dateien werden in DB (oder ähnlichem) gespeichert und sollten normalerweise nicht direkt angesprochen werden. Der Dateiname besteht aus Pfad, Dateiname und Dateierweiterung wie "/mobile.0/data/fileName.txt".

- dirName - Name des Verzeichnisses wie */ mobile.0 / data*
- Rückruf - `` `Funktion (Fehler, Liste)` `` - Liste sieht so aus:

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
- Funktion (dirName, Callback)

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### Unlink
- Funktion (Name, Rückruf)

löscht Datei oder Verzeichnis. Das Verzeichnis muss leer sein, um gelöscht zu werden.

- dirName - Name des Verzeichnisses oder der Datei wie */ mobile.0 / data*
- **Rückruf** - `` `Funktion (Fehler) {}` ``

### ReadFile
- Funktion (Dateiname, Rückruf)

- **callback** - `` funktion (fehler, fileData, mimeType) `` `

### ReadFile64
- Funktion (Dateiname, Rückruf)

- **callback** - `` `funktion (fehler, daten)` `- daten sind` `{mime: mimeType, daten: base64data}` ``

### WriteFile
- Funktion (Dateiname, Daten, Modus, Rückruf)

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### WriteFile64
- Funktion (Dateiname, Daten, Modus, Rückruf)

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### Datei umbenennen
- Funktion (alterName, neuerName, Rückruf)

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### GetHistory
- Funktion (Instanz, Optionen, Rückruf)

- **callback** - `` funktion (fehler, daten, schritt, sessionId) {} `` `

### RequiredLog
- Funktion (isRequire, Rückruf)

Aktiviert / deaktiviert den Protokollempfang für diesen Socket.

- **Rückruf** - `` `Funktion (Fehler) {}` ``

### AuthEnabled
- Funktion ()

liest, ob die Authentifizierung aktiviert ist und welcher Benutzer angemeldet ist

- **callback** - `` funktion (authEnabled, currentUser) {} `` `

Wenn die Authentifizierung aktiviert ist, wird der aktuell angemeldete Benutzer zurückgegeben. Wenn die Authentifizierung deaktiviert ist, wird der Standardbenutzer "running as" zurückgegeben.

## Tuning von Web-Sockets
Bei einigen Web-Sockets-Clients gibt es Leistungsprobleme bei der Kommunikation. Manchmal ist dieses Problem auf den Fallback der Kommunikation von socket.io bei einem langen Abfragemechanismus zurückzuführen.
Sie können die Option *Force Web-Sockets* so einstellen, dass nur der Web-Sockets-Transport erzwungen wird.

## Changelog
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

Copyright (c) 2014-2018 bluefox <dogafox@gmail.com>