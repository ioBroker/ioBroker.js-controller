---
title:       "Update NodeJS"
lastChanged: "30.05.2019"
---

# Update NodeJS für ioBroker

Jedes Jahr erscheint eine neue Node.js Version die als LTS (Long Term Support) 
mit einer gerade Versionsnummer gekennzeichnet ist und ab dann einige Jahre gepflegt wird. 
Im gleichem Zuge erreicht eine frühere Node.js LTS Version Ihr Lebensende (`End of Life`). 
In 2019 wird die NodeJS Version 12 im Oktober zum LTS erklärt und Version 6 ist im April End-of-Life gegangen.

Auch wenn der js-controller bis Version 1.5.11 noch Node.js ab Version 4 unterstützt, 
kommen neue Adapter immer öfter mit z.B. Node.js 8 als Grundvoraussetzung, weil auch jede neue Node.js Version neue Features mitbringt.

Alle Node.js Versionen mit ungeraden Versionsnummern sind Entwicklungsversionen und werden offiziell 
nicht unterstützt und sollten nicht genutzt werden!

Aber auch immer die neueste Version ist nicht sinnvoll, da hier oft noch Libraries nicht ganz kompatibel sind. 
Im Moment wäre damit Node.js 10 die empfohlene Version.

Alle paar Jahre steht also für eine ioBroker-Installation das Update des Node.js an und 
dieser Artikel soll zusammenfassen wir man dazu am besten vorgeht.

Zu aller erst sollte ioBroker gestoppt werden, damit Updates keine Nebeneffekte oder Abstürze verursachen können. 
Bitte auch prüfen ob wirklich alle Prozesse beendet wurden die mit `io.` beginnen.

Weiterhin sollte natürlich unbedingt ein Backup erstellt werden. 
Dazu kann der BackItUp-Adapter genutzt werden oder der Kommandozeilenbefehl

```iobroker backup```

Als nächster Schritt aktualisiert man Node.js auf dem System auf die gewünschte neue Version. 
Unter Linux reicht es dazu einfach den Nodesource-Installationsbefehle auszuführen 
wie unter [https://github.com/nodesource/distributions#debinstall](https://github.com/nodesource/distributions#debinstall) gelistet. 
Für macOS gibt es Installer auf [https://nodejs.org/en/download/](https://nodejs.org/en/download/) die man einfach neu installiert. 
Wenn unter Windows der ioBroker-Installer genutzt wurde dann bitte NICHT eigenständig die Nodejs/npm 
Version aktualisieren, sondern den Anleitungen des Installers folgen.

Leider ist das nur die Hälfte der Arbeit, da es viele genutzte Module Module gibt, 
welche bei der Installation für die zu dem Zeitpunkt aktuelle Node.js passend installiert werden. 
Bei einer Aktualisierung des Node.js müssen diese Module auch alle aktualisiert werden, sonst gibt es Fehler bei der Ausführung.

Um diese zu aktualisieren gibt es mehrere Möglichkeiten:

1. **npm rebuild**
Der erste Versuch sollte immer mit dem Befehl `npm rebuild` im ioBroker 
Verzeichnis stattfinden, weil dies am saubersten funktioniert und direkt von der 
Paketverwaltung ausgeführt wird. Im Idealfall dauert das ein paar Minuten und es könnten ein paar Warnungen gelistet werden.
Falls es aber Fehler gibt, dann muss man diese genau prüfen und lösen ... das ist der tricky Part hierbei. 
Im nächsten Post versuchen wir alle bekannten dieser Fälle mit Ihren Lösungsansätzen zu sammeln. 
Wenn das funktioniert ist dies der schnellste und sauberste Weg.

2. **reinstall-Skript**
Falls dies nicht tut beinhaltet der js-Controller ein reinstall-Skript 
(reinstall.sh bzw ab js-controller 1.5 ein reinstall.js). 
Dieses Skript erkennt alle installierten ioBroker-Adapter, löscht diese dann aus dem node_modules-Verzeichnis und installiert Sie neu. 
Dieser Ansatz ist etwas aufwändiger als npm rebuild, erfüllt aber den gleichen Zweck. Das funktioniert generell gut, 
man sollte den Prozess aber nicht abbrechen. Falls es doch passiert oder es Probleme beim starten nach dieser Prozedur gibt, 
dann am besten den Weg im nächsten Punkt wählen.
Das reinstall.sh-Skript welches im js-controller 1.4 mitgeliefert wurde 
hat ein Formatierungsproblem und muss vorher noch für Linux mit dem Befehl

... ???
korrigiert werden damit es tut.

3. **node-Modules Reset**
Eine weitere Variante, die aber etwas länger dauert, ist der Ansatz einfach alle ode-JS Module zu löschen, 
den js-controller manuell zu installieren und dann ioBroker zu starten und die fehlenden Adapter automatisch installieren zu lassen.
Dazu löscht man das gesamte node_modules Verzeichnis im ioBroker-Verzeichnis. Danach installiert man 
den Controller in der relevanten version (hier zB 1.5.11 der aktuell im Stable ist):

```npm install iobroker.js-controller@1.5.11 --production```

Danach startet man ioBroker. Wichtig ist das das iobroker-data Verzeichnis nicht verändert wird.
Dann startet ioBroker und wird nacheinander feststellen das die Adapter die er starten will 
nicht installiert sind und diese installieren. Je nach System kann dies seine Zeit dauern - 
gern auch mal bis zu ein paar Stunden (oder bei langsamen SD-Karten die ganze Nacht). 
Aber danach sollte alles aktualisiert sein.

4. **Neuinstallation mit Restore**
Eine kleine Abwandlung der letzten Variante ist eine Neuinstallation. Hierbei sichert man das `iobroker-data` Verzeichnis 
(oder nutzt das Backup von oben). Dann löscht man das ganze ioBroker Verzeichnis und nutzt den Installer. 
Direkt danach stoppt man ioBroker wieder (der ja nach der Installation automatisch gestartet wird) und 
kopiert das iobroker-data Verzeichnis zurück oder nutzt `iobroker restore`. Dann startet man ioBroker wieder. 
Der Rest läuft dann wie bei Option 3 und dauert seine Zeit.

Bitte gebt Euer Feedback was bei Euch wie gut funktioniert, was Ihr immer nutzt und was die Probleme und Eure Lösungen sind.