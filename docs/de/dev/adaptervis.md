---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptervis.md
title: VIS-Widget debuggen
hash: KIzieMx/A0IHa34738atYrTR1bLyDI4IzfnpJXXujh8=
---
# Debuggen von VIS-Widgets
Um mit dem Debuggen von ioBroker.vis zu beginnen, müssen Sie Folgendes tun:

- Deaktivieren Sie den Cache im ioBroker.js-Controller

 Öffnen Sie die Datei /opt/iobroker/iobroker-data/iobroker.json und ändern Sie das Attribut **noFileCache** in _true_.

```
{
  "network": {
    "IPv4": true,
    "IPv6": true,
    "bindAddress": null,
    "useSystemNpm": true
  },
  "objects": {
    "type": "file",
    "typeComment": "Possible values: 'file' - [port 9001], redis - [port 6379], couch - [port 5984].",
    "host": "127.0.0.1",
    "port": 9001,
    "user": "",
    "pass": "",
    "noFileCache": true
  },
...
```

- Deaktivieren Sie den Cache in ioBroker.web

  Öffnen Sie die Konfiguration der Adapter "web" -Instanz und stellen Sie sicher, dass "Cache" deaktiviert ist. Es ist standardmäßig deaktiviert.

- starte den ioBroker mit "iobroker restart" neu

- Ersetzen Sie index.html und edit.html

Ersetzen Sie Dateien in _ / opt / iobroker / iobroker-data / files / vis / index.html_ und _edit.html_ durch Dateien aus _ / opt / iobroker / node_modules / iobroker.vis / www / index.html.original_ und _edit.html .Original_.
Ändern Sie die Datei /opt/iobroker/iobroker-data/files/vis/cache.manifest. Egal was, nur ein Symbol, um den Browser zum erneuten Laden von Dateien zu veranlassen. Die Dateien müssen kleiner als 200 KB sein. Wenn Sie falsche Dateien haben, sind sie definitiv größer als 400k.

Wenn Sie nun die Dateien ändern (z. B. /opt/iobroker/iobroker-data/files/vis/widgets/metro.html), werden die Änderungen nach dem erneuten Laden von vis angezeigt.

- Das Problem ist, dass alle Widgets dynamisch verknüpft sind und Sie nicht in Browser-Quellen zur Datei metro.html wechseln und einen Haltepunkt setzen können.

  Es gibt jedoch einen Trick: Wenn Sie eine Konsole.log-Ausgabe machen (oder [Debugger;](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/debugger)), können Sie diese Ausgabe in der Browser-JS-Konsole erkennen und durch Klicken auf die Stelle wechseln (in Chrome arbeiten).