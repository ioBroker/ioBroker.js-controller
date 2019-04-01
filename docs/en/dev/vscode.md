---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/vscode.md
title: VS code
hash: TXXU7i+WiRe1zmhlQuotwhVoN2pG5nBo/BtK1Ue6Jto=
---
# VS code
ioBroker Adapter development with Microsoft Visual Studio Code (VSCode) based on the ioBroker.template adapter

!> Corrections, additions and changes are welcome!

The documentary is created without any experience with VSCode in conjunction with node.js / ioBroker. If the procedure needs improvement, I am grateful for any hint.

Stumbling blocks: If someone has remained "stuck" and needs more in-depth information, please open an issue so that the documentary can be supplemented and refined.

The adapter name in the examples is **iobroker.template-master-mhe**

## Template
ioBroker Template Adapter: [https://github.com/ioBroker/ioBroker.template](https://github.com/ioBroker/ioBroker.template)

## Tested in the following environment
- ioBroker, installed locally
- ioBroker.js-controller: 1.0.0
- node.js: v6.10.2
- npm: 3.10.10
- Windows 10 Prof.
- VSCode 1.12.1

## Accompanying information about adapter development in general and with VSCode
- [ioBroker forum: debugging adapter with VSCode] (http://forum.iobroker.net/viewtopic.php?f=20&t=4564&p=61310&hilit=visual+studio+code#p44156)
- [ioBroker Adapter Template on Github] (https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
- General information on adapter development in German: [ioBroker AdapterDev User Meeting 2017.pdf] [http://forum.iobroker.net/download/file.php?id=11259] by [Apollon77] (http://forum.iobroker. net / memberlist.php? mode = view profile & u = 378).
- [ioBroker Adapter Development Documentation] (https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation)
- [Getting started with adapter development using a Webstrom IDE as an example] (https://github.com/ioBroker/ioBroker/wiki/Installation,-setup-and-first-steps-with-an-ioBroker-Development-Environment)

## General Procedure - Using a Template for an Adapter
### 1. Download template
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - there point 1.) run, for example: unpack the template in a folder and save

### 2. Run "npm install" in the folder
- Installs the required npm mopdule in the copy of the template
- Folder node-modules is newly created in the template folder
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - there point 2.) run

### 3. grunt executed // changes the settings in the template in the existing project
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
    - there point 3.) run
- install grunt globally if it does not already exist
- execute in the terminal:

```
grunt rename --name=template-master-mhe --email=iobroker@digheim.de --author="Michael Herwig"
```

- Adaptername, Author and Email address will be changed via grunt in the necessary places in the code

### 4. Load adapter folder in VSCode
- Customize the folder name. Here in the example of ioBroker.template-master in iobroker.template-master-mhe
- VSCode: open file / folder // or **CTRL + K, CTRL + O**

### 5. In VSCode adjusted the version of the template (from 0.5.0 to 0.0.2)
- changed from 0.5.0 to 0.0.2 in io-package.json // used by ioBroker
- changed from 0.5.0 to 0.0.2 in package.json // used by npm

### 6. copied to ioBroker and adapted path / name
- **Path:** ... / iobroker / node_modules
- **Name:** ioBroker.template-master-mhe
- [https://github.com/ioBroker/ioBroker.template#iobrokertemplate](https://github.com/ioBroker/ioBroker.template#iobrokertemplate)
- there point 5.)

### 7. Close folder in VSCode
- VSCode: File / Folder close // or **CTRL + K F**

### 8. ioBroker / Admin -> Update
- Click Update in the ioBroker Admin GUI

### 9. Adapter picked out and added instance
- Press in the ioBroker Admin GUI on the plus at the adapter

![SCREENSHOT: instance of your own adapter](../../de/dev/media/Instanz-installieren.png)

- Instance of the adapter is installed and displayed

![SCREENSHOT: instance of your own adapter](../../de/dev/media/Adapterinstanz.png)

- Stop debugging the installed adapter

### 10. Open the installed folder of ioBroker in VSCode
- VSCode: open file / folder // or **CTRL + K, CTRL + O**
- **.. / node_modules / iobroker.template-master-mhe** select
- Here you can now develop and debug the adapter

---

## Debug
### 1.) VSCode launch.json customize
Once for all adapters, the settings

- **SHIFT + CTRL + P** and then enter:> debug launch.json
- or via the editor GUI: on the beetle and then on top of the gear

![SCREENSHOT: VSCode configuration of the launch.json](../../de/dev/media/VSCode_launch.json.png)

launch.json Settings for Debugging ioBroker Adapters:

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

- **Remote Debugging** on a remote ioBroker is also possible. The IP address must then be adjusted from 127.0.0.1.

### 2.) Open terminal and start debugger
- **CTRL + ö** // opens the integrated terminal (the key combination depends on the operating system and VSCode version)

- Stop the newly installed adapter in the terminal

cd / opt / iobroker iobroker stop template-master-mhe

- start the debugger in the terminal (because remote debugging must first be established in the terminal via SSH):

        node --debug - brk node_modules / iobroker.template - master - mhe / main.js --force - logs

  Where **iobroker.template-master-mhe** is the name of the adapter.

Display in the integrated terminal (Note: an external terminal program can also be used):

``` cmd
PS C:\ioBroker> node --debug-brk node_modules/iobroker.template-master-mhe/main.js --force --logs
Debugger listening on [::]:5858
```

![SCREENSHOT: Start VSCode debugger](../../de/dev/media/VSCode_Debugger_starten.png)

Output in the terminal after starting the debugger:

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

- cancel with **CTRL + C** in the terminal

Output in the terminal after stopping the debugger:

``` cmd
cleaned everything up...
terminating
cleaned everything up...
PS C:\ioBroker>
```

- Go to Debug in VSCode and under Debugging select "Append to process" and start
- The output is carried out in the Terminal tab of the integrated terminal
- cancel with CTRL + C in the terminal

---

## Experience
- Adapter Icon of the template was adapted (renamed) to Grunt, but not displayed in ioBroker / Admin
- the correct icon will be displayed after the adapter has been published

---

### To do
- Use VSCode with Github
- Example on a separate adapter
- clarify: Debug only with node.js> 6.x or 4.x is also possible?

---

### Documentation in the network
#### To Visual Studio Code
- [VSCode Fundamentals] (https://www.microsoft.com/technet/know-how/visual-studio-code-01-the-basics.aspx)

#### To node.js
#### To Git & Github
- [Git Book - Git Free Basic Guide] (https://git-scm.com/book/en/v1)
- [Git for Windwos - Download Page] (https://git-scm.com/download/win)

---

## General Tips & Tricks
### SSH with Windows
- [Git for Windwos - Download Page] (https://git-scm.com/download/win) installs the bash, with which you can use ssh with the help of openSSH.

---

## Miscellaneous
- my settings in settings.json for VSCode:

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