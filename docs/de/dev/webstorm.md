# WebStorm
Auf dieser Seite zeigen wir Ihnen, wie Sie eine ioBroker-Entwicklungsumgebung installieren und einrichten.
WebStorm wird für die Hauptentwicklung verwendet, möglicherweise ist [Visual Studio Code](./vscode.md) eine Alternative.

Diese Dokumentation ist wie ein "Kochbuch", aber ohne Erklärungen zu Javascript, NodeJS, HTML5 usw.

## Installation von WebStorm unter Linux
*Hinweis*: Je nach Linux Distribution kann die Installation abweichen. Hier wird die Installation auf Ubuntu 16.04 beschrieben.

### Laden Sie WebStorm herunter und installieren Sie es
 1. Gehen Sie auf die Webseite von [jetBrains](https://www.jetbrains.com/webstorm/download/#section=linux) und laden Sie WebStorm für Linux herunter.
 2. Öffnen Sie ein Terminal und wechseln Sie in das Download-Verzeichnis
 3. Entpacken Sie die Datei mit "sudo tar xfz WebStorm-*.tar.gz -C /opt/" in das Verzeichnis /opt/. E
 4. . Öffnen Sie" WebStorm-139.1112 / bin "und geben Sie" ./webstorm.sh "ein. Möglicherweise müssen Sie das Java-JDK installieren ...

### Installieren Sie Java JDK
** Dieser Schritt ist unter Windows nicht erforderlich **

```
sudo apt-add-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

### NodeJS installieren
1. `sudo apt-get install nodejs` (machen Sie keinen` `sudo apt-get install node```, da der Knoten nicht nodejs ist.
2. Erstellen Sie einen Alias "node" mit Hilfe von `` sudo ln -s / usr / bin / nodejs / usr / bin / node```

## Download der neuesten ioBroker-Quellen und Import in ein WebStorm-Projekt
1. Öffnen Sie ein Terminal und wechseln Sie in das Verzeichnis / opt.
2. Erstellen Sie ein neues Verzeichnis mit "mkdir iobroker" und führen Sie dann "cd iobroker" aus.
3. Installieren Sie iobroker mit "npm install iobroker".
4. Testen Sie es mit "cd node_modules / iobroker.js-controller /" und geben Sie "chmod + x iobroker" und später "node controller.js" ein.
5. Öffnen Sie Ihren Browser mit "http:// localhost: 8081". Sie sollten den Begrüßungsbildschirm von ioBroker sehen.

  ![](../../en/dev/media/WelcomeScreen.png)

6. Gehen Sie zum Terminalfenster und geben Sie "ctrl + c" ein, um den ioBroker zu unterbrechen

## Konfigurieren Sie WebStorm, um den ioBroker auszuführen und zu debuggen
1. Öffnen Sie WebStorm mit `. / Webstorm.sh`
2. Klicken Sie auf Datei -> "Neues Projekt aus vorhandenen Dateien ..."
3. Wählen Sie Folgendes aus ...

  ![](../../en/dev/media/CreateNewProject01.png)

4. Wählen Sie Ihr ioBroker-Verzeichnis ... (klicken Sie mit der rechten Maustaste auf das Verzeichnis, um das Projektstammverzeichnis festzulegen)

   ![](../../en/dev/media/CNP03.png)

5. Ihr neues WebStorm-Projekt sollte so aussehen ...

  ![Prüfung](../../en/dev/media/NewProject01.png)

### Erstellen Sie den ioBroker "Run Configuration"
1. Gehen Sie zu Ausführen -> "Konfiguration bearbeiten ...".

![](../../en/dev/media/RC01.png)

2. Wählen Sie das "+" aus und fügen Sie eine NodeJS-Konfiguration wie in der folgenden Abbildung hinzu ...

![](../../en/dev/media/RunConfigIoBroker.png)

## So starten Sie ioBroker über WebStorm
1. Starten Sie ioBroker mit der Auswahl ...

    ![](../../en/dev/media/RunIobroker01.png)

2. Sie fragen sich vielleicht, wie Sie ioBroker stoppen können? Öffnen Sie ein Terminal in WebStorm und geben Sie Folgendes ein ...

    ![](../../en/dev/media/TerminalRun01.png)

## So debuggen Sie einen ioBroker-Adapter
In diesem Kapitel erfahren Sie, wie Sie einen ioBroker-Adapter wie "iobroker.hmm" debuggen können.
Starten Sie den ioBroker wie zuvor erwähnt. Verwenden Sie nicht den "Debug-Modus". Verwenden Sie für ioBroker nur den "Run-Modus".
Installieren Sie einen Adapter wie ioBroker.hmm von der Befehlszeile aus wie folgt ![](../../en/dev/media/CLIinstallHMM01.png)

Konfigurieren Sie den WebStorm "Debug-Einstellungen" ...
![](../../en/dev/media/DebugSettingsHMM01.png)

Gehen Sie zur ioBroker-Webseite http:// localhost: 8081 und installieren Sie den iobroker.hmm-Adapter: ![](../../en/dev/media/InstallHMMfromWeb01.png)

Nach der Installation des Adapters müssen wir die Adapterinstanz deaktivieren ...
![](../../en/dev/media/DisableHMMWeb011.png)

... weiter ![](../../en/dev/media/DisableHMMWeb01.png)

... am Ende sollten Sie dieses Ergebnis sehen: ![](../../en/dev/media/DisableHMMWeb02.png)

Nun zurück zu WebStorm. Öffnen Sie die Datei hmm.js und setzen Sie einen Haltepunkt wie diesen: ![](../../en/dev/media/WebstormBreakpointsHMM01.png)

Beginnen Sie mit dem Beheben des iobroker.hmm-Adapters: ![](../../en/dev/media/WebstormDebugHMM01.png)

Wenn Sie am ersten Haltepunkt anhalten, können Sie die nächsten Schritte steuern, indem Sie 1) das Programm fortsetzen. 2) Schritt vorbei: ![](../../en/dev/media/DebugHMM02.png)
