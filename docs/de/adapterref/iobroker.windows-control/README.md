---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.windows-control/README.md
title: ioBroker.windows-control
hash: n0cN2H2xfyKCu0I/mtx+6KUcirwA3gd/7RDk1+6s09E=
---
![Logo](../../../en/adapterref/iobroker.windows-control/admin/windows-control_90.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.windows-control.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.windows-control.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/windows-control-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/windows-control-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Mic-M/iobroker.windows-control.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Mic-M/ioBroker.windows-control/badge.svg)
![NPM](https://nodei.co/npm/iobroker.windows-control.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Mic-M/ioBroker.windows-control/master.svg)

# IoBroker.windows-control
## Adapter zur Steuerung von Windows-Geräten
Dieser Adapter ermöglicht die Steuerung von Microsoft Windows-Geräten. Es ist erforderlich, dass das Tool GetAdmin auf jedem Windows-Gerät installiert ist, das Sie steuern möchten. <br> <strong>Vielen Dank an [Vladimir Vilisov](https://blog.instalator.ru) für sein Tool GetAdmin!</strong>

** Bitte beachten Sie: ** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch anonym an die Adapterentwickler zu melden. Weitere Details und Informationen zum Deaktivieren dieser Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Sentry Reporting wird ab js-controller 3.0 verwendet.

## Tool GetAdmin
Um diesen Adapter verwenden zu können, muss das Tool GetAdmin (Version 2.6) auf jedem Windows-Gerät ausgeführt werden, das Sie steuern möchten.
GetAdmin ist eine einzelne exe-Datei (776 kB). Es wurde von Vladimir Vilisov in Delphi codiert und [auf seinem Blog instalator.ru](https://blog.instalator.ru/archives/47) veröffentlicht.
Herunterladen:

 1. Primärquelle: https://blog.instalator.ru/archives/47
 2. Falls nicht verfügbar, finden Sie eine Kopie auf der Github-Site dieses Adapters [im Ordner "files"] (https://github.com/Mic-M/ioBroker.windows-control/tree/master/files).

### Aufbau
Legen Sie die Datei `GetAdmin.exe` in einem beliebigen Ordner Ihres Windows-Geräts ab. Führen Sie die Datei aus und stellen Sie Folgendes ein:

1. Oben links im Abschnitt "Server":
    * IP: Die IP-Adresse Ihres ioBroker-Servers
    * Port: `8585` ist der Standardport. Normalerweise muss dieser Port nicht geändert werden.
2. Oben im Abschnitt "Optionen": Aktivieren Sie "In Fach minimieren" und "Start", um das in der Taskleiste minimierte Programm automatisch zu starten.
3. Bestätigen Sie mit "Speichern".

![GetAdmin-Einstellungen](../../../en/adapterref/iobroker.windows-control/img/getadmin-settings.png)

### Beispiele für einzelne Einträge in der GetAdmin.exe-Befehlsliste:
* Ruhezustand:
    * Spalte "Befehl": Geben Sie "m_hibernate" oder einen anderen Namen Ihrer Wahl ein (bitte keine Leerzeichen).
    * Spalte `PATH oder URL`:` shutdown`
    * Spalte `PARAMETER`:` -h`
* Standby (deutsch: Energie sparen):
    * Spalte "Befehl": Geben Sie "m_sleep" oder einen anderen Namen Ihrer Wahl ein (bitte keine Leerzeichen).
    * Spalte "PATH oder URL": "rundll32.exe"
    * Spalte `PARAMETERS`:` powrprof.dll, SetSuspendState`

### Weitere Informationen
* ioBroker Forum:
    * [Adapter Windows Control] (https://forum.iobroker.net/topic/31485/)
    * [Windows-Steuerung] (https://forum.iobroker.net/topic/1570/windows-steuerung)
    * [Psрограмма управления компьютером GetAdmin] (https://forum.iobroker.net/topic/1505/)
* [Blog-Artikel] (https://blog.instalator.ru/archives/47) von GetAdmin. Verwenden Sie Google Übersetzer, wenn Sie mit der russischen Sprache nicht vertraut sind.

## Changelog

### 0.1.5
* (Mic-M) Added [Sentry](https://github.com/ioBroker/plugin-sentry)

### 0.1.4
* (Mic-M) Updated lodash dependency from 4.17.15 to 4.17.19

### 0.1.3
* (Mic-M) Internal only: Correction to support compatibility with js-adapter 3.x, Use gulp for translations (which is resulting in files under admin/i18n/)

### 0.1.2
* (Mic-M) Several fixes.

### 0.1.1
* (Mic-M) Readme updated.

### 0.1.0
* (Mic-M) Add states "_processGetStatus" and "_processGetStatusResult" to check if a Windows process (like Chrome browser) is running or not

### 0.0.3
* (Mic-M) `io-package.json` fixed

### 0.0.2
* (Mic-M) Fixed sendkey issue
* (Mic-M) State _sendKey: provide all supported keys as dropdown and no longer as open text field.
* (Mic-M) Renamed states: sendKey -> _sendKey, connected -> _connection

### 0.0.1
* (Mic-M) Initial release

## License
MIT License

Copyright (c) 2020 Mic-M

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