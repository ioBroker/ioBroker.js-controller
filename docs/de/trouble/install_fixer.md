---
title:       "ioBroker Installation Fixer"
lastChanged: "13.06.2019"
---

# Probleme mit Benutzerrechten der ioBroker Installation beheben

Der Installations Fixer löst Probleme mit den Benutzerrechten der ioBroker installation.
Ende 2018 und vor allem im Januar 2019 hat @AlCalzone den ioBroker Installer komplett überarbeitet und damit gehören in den inzwischen aktuellen Version von Anfang Februar 2019 auch alle Rechteprobleme der Vergangenheit. ioBroker läuft damit nicht mehr als "root" sondern unter einem eigenen User der alles darf was er für die aktuellen ioBroker Adapter können muss.
Für alle neuen Installation ist also alles bestens.

Was ist aber wenn jemand ioBroker früher installiert hat? Er noch als root läuft? Oder in den ersten Tagen der neuen Installationsroutine?
**Auch dafür haben wir jetzt dank @AlCalzone eine Lösung: den Installation-Fixer**

Mittels einem Kommando wird eine bestehende Installation in /opt/iobroker auf den gleichen Stand gebracht wie eine aktuelle neue Installation. Das Skript kann auch in Zukunft immer wieder genutzt werden um die Installation diesbezüglich zu Aktualisieren. 
Wichtig: Diese Skript aktualisiert weder nodejs, npm noch js-controller oder irgend einen Adapter. Nur die Systemrechte u.a. werden bearbeitet.
Versucht es und gebt Feedback im [Diskussionsthread](https://forum.iobroker.net/topic/20212/diskussion-zum-neuen-installation-fixer)

!> [Bitte beachten]:  Anwendung unter Docker sollte, weil eh alles als root läuft, nicht nötig sein und wir raten aktuell mangels klarer Erfahrungen und Feedback von einer Anwendung ab. Falls es doch jemand versuchen will und Feedback geben will: Anwendung komplett auf eigene Gefahr. Unbedingt vorher ein Backup machen und wissen was man tut!

Bitte beachtet den FAQ Post in diesem Thread!

Das auszuführende Skript wird, wie beim Installer auch, von GitHub geladen und ist so immer aktuell. Der Befehl lautet:

```
curl -sL https://iobroker.net/fix.sh | bash -
```

## FAQ

**Muss man den Fixer nutzen?**
Wir empfehlen die Installation zu aktualisieren und daher den Fixer zu nutzen. Damit habt Ihr eine Installation die wir auch supporten können falls es Probleme gibt. Mit npm 5 und höher gab es immer mehr Probleme wenn mit root oder sudo gearbeitet wird und der neue Installer und damit auf der Fixer sind für Linux-basierte Systeme tragen dem Rechnung und versuchen diese Probleme zu verhindern. Und die Sicherheitsaspekte sind auch nicht zu vernachlässigen.


**Wo kann ich sehen was der Fixer alles macht?**
Wir versuchen den Installer und Fixer immer aktuell zu halten.
Beide haben auch ein Changelog.
[Installer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md)
[Fixer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md)
Ansonsten das Skript direkt ansehen wenn Ihr etwas von Shell-Programmierung versteht :-)


**Als welcher Benutzer führt man den Fixer am besten aus?**
Es ist faktisch egal. Am besten führe es als normaler Benutzer aus, dann kannst Du danach 
auch damit arbeiten.


**In welchem Verzeichnis führt man den Fixer am besten aus?**
Es ist auch egal. Der aktuelle Fixer (2019-02-21) erwartet die Installation in /opt/iobroker


**Für welche Betriebssysteme gilt der Fixer?**
Für alle Linux-basierte Systeme. Windows ist hier nicht abgedeckt.


**Was genau tut der Fixer?**
Der Fixer legt einen ioBroker Benutzer an, setzt Datei- und Verzeichnis Rechte korrekt für diesen User und ebenso einige Sudo-Rechte und alles was gebraucht wird um ohne Root mit ioBroker und npm arbeiten zu können.


**Kann der Fixer mehrfach ausgeführt werden wenn es Updates gibt?**
Ja und das ist explizit so gedacht um bei Weiterentwicklung des Installers immer aktuell bleiben zu können.


**Gibt es spezielle Situationen wo der Fixer zusätzlich ausgeführt werden sollte?**
Der Fixer behandelt auch spezielle Rechte wenn redis und backitup genutzt wird. Falls Redis bei der Anwendung bereits installiert ist wird alles automatisch korrekt gesetzt. Falls Redis später installiert wird setzt der Fixer auch dazu alles korrekt.


**Kann der Installations-Fixer auch unter Docker eingesetzt werden?**
Aktuell liegen noch wenige Erfahrungen vor und die Ergebnisse sind sehr gemischt. Wir raten daher aktuell von einem Einsatz ab, auch da im Container meist alles als root läuft und daher eh nicht relevant ist. Wer dennoch mag und Feedback geben will: Einsatz in Docker auf eigene Gefahr und NIE ohne Backup und Wissen was man tut!

**Was kann ich tun wenn ich nicht sicher bin das was schieff geht?**
Du kannst das ioBroker Verzeichnis vorher einfach kopieren, wobei ausser Berechtigungen nichts geändert wird.
