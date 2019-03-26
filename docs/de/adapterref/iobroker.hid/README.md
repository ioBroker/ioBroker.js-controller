---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hid/README.md
title: kein Titel
hash: ocorguClOBzHzBoeOx9POaHFhiuwEqU3Ppx/5S23HMo=
---
![Logo](../../../en/adapterref/iobroker.hid/admin/hid.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.hid.svg)
![Build-Status](https://ci.appveyor.com/api/projects/status/9w4enhutav1e2leu?svg=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

### IoBroker.hid
#### Beschreibung
Adapter für HID-Geräte, z. Apple-Fernbedienung

#### Info
Komplett neu gestaltet

#### Installation
Führen Sie den folgenden Befehl im iobroker-Stammverzeichnis aus (z. B. in / opt / iobroker).

```
npm install iobroker.hid
```

#### Zustände
Es gibt zwei Zustandsgruppen, Roh und Schlüssel. Die Schlüsselgruppe wird nur ausgelöst, wenn eine Zuordnung gefunden wird.

Bei einem Ereignis ändert sich nur einer der Zustände xxx.double, xxx.single und xxx.long.
Der Status xxx.dsl liefert die Ergebnisse .double, single oder long.
Aktion zeigt nach unten, nach oben oder wiederholt sich.

#### Zuordnungen
Fügen Sie den Zuordnungsabschnitt in der Datei "io-package.json" hinzu oder bearbeiten Sie ihn, um die Namen der Schlüsselcodes anzuzeigen.
Dies ist nicht notwendig, die Rohdatenzustände werden trotzdem erstellt.

```
  "mappings": {
    "26017F2A55": "AllLightsOn-(AM)",
    "26017F1867": "AllLightsOff-(Memory)",
    "26857A21DE": "OK",
    "26857A55AA": "ESC"
  },
```

<!--

#### Bedarf
Das Node-Hid-Modul funktioniert nicht unter Windows 10, bis Sie eine kleine Änderung am Node-Hid-Projekt vornehmen.
Nach der Installation von iobroker.hid edit:

```
<path to iobroker>/node_modules/iobroker.hid/node_modules/node-hid/hidapi/windows/hid.c
```

Finden:

```
open_device
```

Ändern Sie den 2. und 3. Parameter des Funktionsaufrufs "CreateFileA":

```
static HANDLE open_device(const char *path, BOOL enumerate)
{
    ...

	handle = CreateFileA(path,
		//desired_access,                    // original line
		GENERIC_WRITE | GENERIC_READ,        // replaced line
		//share_mode,                        // original line
		FILE_SHARE_READ | FILE_SHARE_WRITE,  // replaced line
		NULL,
		OPEN_EXISTING,
		FILE_FLAG_OVERLAPPED,/*FILE_ATTRIBUTE_NORMAL,*/
		0);

	...
}
```

Um das node-hid-Modul neu zu erstellen, wechseln Sie in das irectory:

```
cd <path to iobroker>/node_modules/iobroker.hid/node_modules/node-hid
```

ausführen:

```
npm install --build-from-source
```

Starten Sie das Modul iobroker.hid erneut ...
->