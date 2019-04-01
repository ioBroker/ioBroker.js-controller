# VS Code

ioBroker Adapterentwicklung mit Microsoft Visual Studio Code (VSCode) auf Grundlage des ioBroker.template Adapters

!> Korrekturen, Ergänzungen und Änderungen sind Willkommen!

Die Doku entsteht ohne jegliche Erfahrungen mit VSCode in Verbindung mit node.js/ioBroker. Sollte die Vorgehensweise Verbesserungen nötig haben, bin ich für jeden Hinweis dankbar.

Stolpersteine: Wenn jemand "hängen" geblieben ist und vertiefende Informationen benötigt, bitte ein Issue aufmachen, damit die Doku ergänzt und verfeinert werden kann.

Der Adaptername in den Beispielen lautet **iobroker.template-master-mhe**.

## Template
ioBroker Template Adapter: [https://github.com/ioBroker/ioBroker.template](https://github.com/ioBroker/ioBroker.template)

## gestestet in folgender Umgebung
- ioBroker, lokal installiert
- ioBroker.js-controller: 1.0.0
- node.js: v6.10.2
- npm: 3.10.10
- Windows 10 Prof.
- VSCode 1.12.1

## Begleitende Informationen zur Adapterentwicklung allgemein und mit VSCode

- [ioBroker Forum: Adapter debuggen mit VSCode](http://forum.iobroker.net/viewtopic.php?f=20&t=4564&p=61310&hilit=visual+studio+code#p44156)
- [ioBroker Adapter Template auf Github](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
- Allgemeine Informationen zur Adapterentwicklung auf deutsch: [ioBroker AdapterDev Usertreffen 2017.pdf](http://forum.iobroker.net/download/file.php?id=11259)  von [Apollon77](http://forum.iobroker.net/memberlist.php?mode=viewprofile&u=378).
- [ioBroker Adapter Development Documentation](https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation)
- [Erste Schritte der Adapterentwicklung am Beispiel einer Webstrom IDE](https://github.com/ioBroker/ioBroker/wiki/Installation,-setup-and-first-steps-with-an-ioBroker-Development-Environment)

## Allgemeine Vorgehensweise - Template für einen Adapter verwenden

### 1. Download template

- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - dort Punkt 1.) ausführen, z.B.: das Template in einem Ordner entpacken und speichern


### 2. "npm install" im Ordner ausgeführt

- installiert die benötigten npm Mopdule in der Kopie des Templates
- Ordner node-modules wird im Template Ordner neu angelegt
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - dort Punkt 2.) ausführen



### 3. grunt ausgeführt // ändert die Einstellungen im Template im vorhandenen Projekt

- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - dort Punkt 3.) ausführen
- grunt global installieren, wenn noch nicht vorhanden
- im Terminal ausführen:

```
grunt rename --name=template-master-mhe --email=iobroker@digheim.de --author="Michael Herwig"
```

- Adaptername, Author und Email-Adresse wird über grunt an den notwendigen Stellen im Code geändert

### 4. Adapter-Ordner in VSCode laden

- Ordnername anpassen. Hier im Beispiel von ioBroker.template-master in iobroker.template-master-mhe
- VSCode: Datei/Ordner öffnen // oder **STRG+K, STRG+O**


### 5. In VSCode die Version des Templates angepasst (von 0.5.0 auf 0.0.2)

- in io-package.json von 0.5.0 auf 0.0.2 geändert   // verwendet von ioBroker
- in package.json von 0.5.0 auf 0.0.2 geändert      // verwendet von npm


### 6. nach ioBroker kopiert und Pfad/Name angepasst

- **Pfad:** .../iobroker/node_modules
- **Name:** ioBroker.template-master-mhe
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
- dort Punkt 5.)


### 7. Ordner in VSCode schliessen

- VSCode: Datei/Ordner schliessen // oder **STRG+K F**


### 8. ioBroker/Admin -> Update durchführen

- in der ioBroker Admin GUI auf Update klicken


### 9. Adapter rausgesucht und Instanz hinzugefügt

- in der ioBroker Admin GUI auf das Plus beim Adapter drücken
![SCREENSHOT: Instanz des eigenen Adapters](media/Instanz-installieren.png)

- Instanz des Adapters wird installiert und angezeigt
![SCREENSHOT: Instanz des eigenen Adapters](media/Adapterinstanz.png)
- zum debuggen den installierten Adapter stoppen

### 10. Installierten Ordner von ioBroker in VSCode öffnen

- VSCode: Datei/Ordner öffnen // oder **STRG+K, STRG+O**
- **../node_modules/iobroker.template-master-mhe** auswählen
- hier kann nun der Adapter entwickelt und debuggt werden

---

## Debuggen

### 1.) VSCode launch.json anpassen

EInmalig für alle Adapter muss die Einstellungen

- **SHIFT+STRG+P**: und dann folgendes eingeben: >debug launch.json
- oder über die Editor GUI: auf den Käfer und dann oben auf das Zahnrad

![SCREENSHOT: VSCode Konfiguration der launch.json](media/VSCode_launch.json.png)

launch.json Einstellungen zum Debuggen von ioBroker-Adaptern:
```javascript
{
    // Use IntelliSense to learn about possible Node.js debug attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Programm starten",             // Name, der im VSCode Auswahlmenü neben dem grünen Play angezeigt wird
            "program": "${workspaceRoot}/main.js"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "An den Prozess anfügen",       // Name, der im VSCode Auswahlmenü neben dem grünen Play angezeigt wird
            "address": "127.0.0.1",                 // Adresse, an dem der node.js Prozess läuft (bei Remote Debug, der Remote-Rechner)
            "port": 5858                            // Port, auf dem der node.js Debugger lauscht, der mit node --debug-brk ... gestartet wird
        }
    ]
}
```

- **Remote Debugging** auf einem entfernten ioBroker ist ebenfalls möglich. Die IP Adresse muss dann von 127.0.0.1 angepasst werden.

### 2.) Terminal öffnen und Debugger starten

- **STRG+ö** // öffnet das integrierte Terminal (die Tastenkombination ist Abhängig vom Betriebssystem und der VSCode Version)

- im Terminal den neu installierten Adapter stoppen

        cd /opt/iobroker
        iobroker stop template-master-mhe

- im Terminal den Debugger starten (bem Remote-Debugging muss vorher im Terminal eine Verbindung per SSH aufgebaut werden):

        node --debug-brk node_modules/iobroker.template-master-mhe/main.js --force --logs

    Wobei **iobroker.template-master-mhe** der Name des Adapters ist.



Anzeige im integriertem Terminal (Hinweis: es kann auch ein externes Terminal-Programm verwendet werden):
``` cmd
PS C:\ioBroker> node --debug-brk node_modules/iobroker.template-master-mhe/main.js --force --logs
Debugger listening on [::]:5858
```
![SCREENSHOT: VSCode Debugger starten](media/VSCode_Debugger_starten.png)

Ausgabe im Terminal nach dem Starten des Debuggers:

``` cmd
starting. Version 0.0.2 in C:/ioBroker/node_modules/iobroker.template-master-mhe, node: v6.10.2
config test1: true
config test1: 42
stateChange template-master-mhe.0.testVariable {"val":true,"ack":false,"ts":1494753342714,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
ack is not set!
stateChange template-master-mhe.0.testVariable {"val":true,"ack":true,"ts":1494753342715,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
stateChange template-master-mhe.0.testVariable {"val":true,"ack":true,"ts":1494753342715,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753342714}
check group user admin group admin: false
check user admin pw ioboker: true
stateChange template-master-mhe.0.testVariable {"val":null,"ack":true,"ts":1494753367809,"q":0,"from":"system.adapter.template-master-mhe.0","lc":1494753367809}
```

- mit **STRGF+C** im Terminal abbrechen

Ausgabe im Terminal nach dem Stoppen des Debuggers:
``` cmd
cleaned everything up...
terminating
cleaned everything up...
PS C:\ioBroker>
```

- in VSCode auf Debug gehen und unter Debuggen "An den Prozess anfügen" auswählen und starten
- die Ausgabe wird im Reiter Terminal beim integrierten Terminal durchgeführt
- mit STRGF+C im Terminal abbrechen


---

## Erfahrungen

- Adapter Icon des Templates wurde nach Grunt angepasst (umbenannt), aber im ioBroker/Admin nicht angezeigt
- das richtige Icon wird erst nach Veröffentlichung des Adapters angezeigt

---

### todo

- VSCode mit Github nutzen
- Beispiel an einem eigenem Adapter
- klären: Debug nur mit node.js > 6.x oder ist 4.x auch möglich?


---

### Dokumentation im Netz

#### zu Visual Studio Code

- [Grundlagenartikel zu VSCode](https://www.microsoft.com/germany/techwiese/know-how/visual-studio-code-01-die-grundlagen.aspx)

#### zu node.js

#### zu Git & Github

- [Git Book - kostenloses Grundlagenbuch zu Git](https://git-scm.com/book/de/v1)
- [Git für Windwos - Downloadseite](https://git-scm.com/download/win)

---

## Allgemeine Tipps & Tricks

### SSH mit Windows

- [Git für Windwos - Downloadseite](https://git-scm.com/download/win) installiert die bash, mit der man mit Hilfe von openSSH auch ssh nutzen kann.

---

## Sonstiges

- meine Einstellungen in settings.json für VSCode:

```
// Platzieren Sie Ihre Einstellungen in dieser Datei, um die Standardeinstellungen zu überschreiben.
{
    "window.zoomLevel": 0,
    "editor.minimap.enabled": true,                 // zeigt die kleine Codeübersichtskarte rechts neben dem Code an
    "editor.dragAndDrop": true,                     // ermöglicht markierte Codeteile per Drag und Drop zu verschieben0
    "workbench.editor.closeOnFileDelete": false,
    "files.autoSave": "afterDelay",                 // Auotmatisches Speichern der Dateien einstellen
    "files.autoSaveDelay": 1000,                    // Autosave nach 1000 ms
    "[javascript]": {},                             // Einstellungen für die SPrache "Javascript"
    "telemetry.enableCrashReporter": false,         //
    "workbench.colorTheme": "Quiet Light",          // Farbschema des Editors
    "telemetry.enableTelemetry": false,
    "workbench.iconTheme": "vs-seti",               // Icons für bekannte Dateieendungen. Wenn ja, welches Icon-Set soll verwendet werden
    "javascript.implicitProjectConfig.checkJs": true
}
```