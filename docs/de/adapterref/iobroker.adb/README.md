---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.adb/README.md
title: ioBroker.adb
hash: DJ8OQXPjNVglgAUFzwu5+DM1TbuY2as654gOxACSAWI=
---
![Logo](../../../en/adapterref/iobroker.adb/admin/adb.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.adb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.adb.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/om2804/iobroker.adb.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/om2804/ioBroker.adb/badge.svg)
![NPM](https://nodei.co/npm/iobroker.adb.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/om2804/ioBroker.adb/master.svg)

# IoBroker.adb
## AdB-Adapter für ioBroker
Mit diesem Adapter können Sie einige Funktionen Ihrer Android-Geräte über Android Debug Bridge steuern:

- Benutzerdefinierter Shell-Befehl
- eine Anwendung starten / stoppen
- Neustart
- einen Screenshot machen

### Benutzerdefinierter Shell-Befehl
Um den Shell-Befehl auszuführen, schreiben Sie den Befehl in den Status **shell** Sie erhalten die Antwort immer im Status **Ergebnis**

Beispiel: Drücken Sie die POWER-Taste **Eingabetaste POWER** oder **Shell-Eingabetaste POWER**

### Eine Anwendung starten / stoppen
Starten Sie eine Anwendung. Geben Sie den Komponentennamen mit dem Paketnamenpräfix an, um eine explizite Absicht zu erstellen.
Um eine Anwendung zu starten, schreiben Sie die Absicht (* com.example.app / .ExampleActivity *.), Um **startApp** anzugeben.

Beispiel: Zum Starten von KODI schreiben Sie **org.xbmc.kodi / .Splash**

Beenden Sie eine Anwendung. Erzwinge das Stoppen aller mit dem Paket verbundenen Elemente (der Paketname der App).
Um eine Anwendung zu stoppen, schreiben Sie den Paketnamen in den Status **stopApp**

Beispiel: Wenn KODI gestoppt wird, schreiben Sie **org.xbmc.kodi**

### Gerät neustarten
Startet das Gerät neu. Schreiben Sie einen beliebigen Wert für den Status **Neustart**

### Einen Screenshot machen
Machen Sie einen Screenshot und speichern Sie ihn im Ordner des Adapters. Schreiben Sie einen beliebigen Wert in den Status **screencap**

## Die Info
Android Debug Bridge (adb) ist ein vielseitiges Befehlszeilentool, mit dem Sie mit einem Gerät kommunizieren können. Der Befehl adb ermöglicht eine Vielzahl von Geräteaktionen, z. B. das Installieren und Debuggen von Apps, und bietet Zugriff auf eine Unix-Shell, mit der Sie verschiedene Befehle auf einem Gerät ausführen können.

adb ist im Android SDK Platform-Tools-Paket enthalten. Sie können dieses Paket mit dem SDK-Manager herunterladen, der es unter android_sdk / platform-tools / installiert. Um nicht das gesamte Android SDK zu installieren, können Sie Minimal ADB und Fastboot installieren oder adbLink verwenden

Zur Verwendung des Adapters muss der ADB-Server gestartet werden.
** adb start-server **

### Mehr Info
[Android Debug Bridge-Dokumente](https://developer.android.com/studio/command-line/adb?hl=ru)

## Changelog

### 0.0.4
* (om2804) js-controller dependency upgraded to > 2.0.0

### 0.0.3
* (om2804) fixes ater review

### 0.0.2
* (om2804) start/stop application
* (om2804) reboot device
* (om2804) take screenshot

### 0.0.1
* (om2804) initial release

## License
MIT License

Copyright (c) 2020 om2804 <om2804@mail.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.