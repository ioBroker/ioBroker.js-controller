---
title:       "Debugging"
lastChanged: "14.09.2018"
---

# Debugging von Adaptern

## Adapter debuggen mit Chrome
Node.JS unterstützt das Debuggen mit Chrome.

Wenn man ein Adapter im ioBroker stoppt und dann aus der Konsole so startet:

```
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js --debug
```

Wichtig ist `-–inspect`

Dann wird so was ausgegeben:

```
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/9415dda6-0825-40ed-855c-83c6142e56e9
2016-12-27 15:23:02.637  - error: sayit.0 adapter disabled
starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
2016-12-27 15:23:02.647  - info: sayit.0 starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
Debugger attached.
```

Danach kann mit Chrome debuggen, wenn man ausgegeben Link im Chrome eingibt:

![Chrome](media/adapterdebug1.png)

*Getestet: Windows, Chrome 55, node.js 6.9.2*

### Remote debugging with Chrome
Wenn iobroker läuft nicht auf dem gleichen Rechner wie chrome, dann lautet der befehl in Anlehnung an dem obigen beispiel:

```
node --inspect-brk=0.0.0.0:9229 node_modules/iobroker.sayit/main.js --debug
```

der parameter `--inspect-brk` sorgt im vergleich zu oben,

das gleich zum start des debuggers auf der ersten Zeile deines Adapters ein breakpoint gesetzt wird.

Wer nicht immer den link zum start des debugs einzeln kopieren will, kann auch im chrome die folgende Seite aufrufen:

```
chrome://inspect
```

dann einmalig über configure die IP Adresse und Port eures **ioBroker-Rechners** genau wie beim inspect befehl eingeben.

Dort wird dann die debug session nach start des befehls angezeigt und kann mit einem klick gestartet werden.

Die chrome debug möglichkeiten sind fantastisch.
Man hat alle Möglichkeiten, die man auch aus dem **Web-Debugging** kennt: Breakpoints, auch mit Bedingungen, watch, call stack, scope inspection, Konsole-Ausgabe, usw.

Bilder und englische Beschreibung befindet sich [hier](https://software.intel.com/en-us/xdk/articles/using-chrome-devtools-to-debug-your-remote-iot-nodejs-application)

Falls noch nicht installiert ist, auf dem iobroker rechner noch der node-inspector notwendig:

```
npm install -g node-inspector
```

## Debuggen mit WebStorm

## Debuggen mit `Visual Studio Code`
Falls man ein Verzeichnis mit `VS Code` aufmacht, dann nachdem als man Adapter Verzeichnis aufmacht (`File=>Open folder...` menu),
kann man dann einen Adapter debuggen.

Die Konfiguration in der Datei `.vscode/launch.js` sollte so aussehen:
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}\\main.js",
            "args": ["--debug"]
        },
        {
            "name": "Attach to Process",
            "type": "node",
            "request": "attach",
            "address": "IO_BROKER_IP_ADDRESS",
            "port": 9229
          }
    ]
}
```

### Lokal Debugging
Nachdem als der Adapter gestoppt ist (`iobroker stop ADAPTER_NAME`), kann man den Adapter im VS Code starten:
![VS Code](media/adapterdebug10.png) 

Nachdem als man `Launch Program` auswählt und `Play` Knopf klickt, wird Der Adapter gestartet und man kann lokal debuggen.

### Remote Debugging
Dafür sollte man den Adapter auf dem ioBroker server speziell starten.

 ```
cd /opt/iobroker
iobroker stop ADAPTERNAME
node --inspect-brk=0.0.0.0:9229 node_modules/iobroker.ADAPTERNAME/main.js --debug
 ```

Danach kann man `VS Code` an Prozess anschließen (`attach`).

![VS Code](media/adapterdebug11.png) 