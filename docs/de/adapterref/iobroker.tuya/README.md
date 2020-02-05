---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: OPYx8AWx1cy+97xg1gQ6kgOMDXhT+6AyWkYwcNiBNY0=
---
![Logo](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Apollon77/ioBroker.tuya.svg)
![Anzahl der Installationen](http://iobroker.live/badges/tuya-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tuya.svg)
![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.tuya/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.tuya?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.tuya.png?downloads=true)

# IoBroker.tuya
** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an mich als Entwickler zu melden. ** Weitere Details siehe unten!

ioBroker-Adapter zur Verbindung mit mehreren kleinen und billigen WLAN-Geräten, die mit der Tuya Cloud verbunden sind und hauptsächlich die Smartlife App / Alexa-Skill verwenden. Der Adapter unterstützt das Lesen von Echtzeit-Statusaktualisierungen und die Steuerung dieser Geräte, sobald sie mit der jeweiligen Handy-App synchronisiert sind.

Tuya-Geräte sind ESP8266MOD WiFi-Smart-Geräte von Shenzhen Xenon.

Neben Geräten, die mit der Smart Live App verwendet werden können, sollte auch die Verwendung der Jinvoo Smart App, der Xenon Smart App, der eFamilyCloud, der io.e (Luminea oder einer ähnlichen) App möglich sein. Bitte melden Sie sich bei Erfolg zurück. <img src="https://https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/admin/warning.png" width="50" height="50"> **Der Adapter funktioniert nur mit Tuya und kompatiblen Apps, solange deren Version &lt;3.14 (!!) ist**

Der Adapter funktioniert nachweislich sehr gut mit allen Geräten, die "immer in WLAN" sind. Geräte, die nur online geschaltet werden, wenn ein Ereignis vorliegt, ihre Daten senden und wieder offline geschaltet werden, werden nicht unterstützt. Dies bedeutet, dass **batteriebetriebene Geräte normalerweise NICHT funktionieren!**

Eine Adapterinstanz kann alle Geräte in einem Netzwerk verarbeiten, die UDP-Pakete weiterleiten.

## Kompatible Mobile Apps und Versionen
Die aktuellen Versionen des Tuya Smart und auch der Smartlife App sind **nicht mehr kompatibel** mit der Funktionsweise des Adapters, da Tuya den gesamten Datenverkehr verschlüsselt hat, den der Adapter schnüffeln konnte. Vorerst funktionieren noch einige ältere Versionen der Apps ...

* Smartlife App <3.14, am besten 3.12.6 !!
* Tuya Smart App <3.14, am besten 3.12.x
* STL Smart Home App 1.1.1 (zuletzt datiert September 2019)
* Ucomen Home App (??)

## Wie der Adapter funktioniert
### Grundfunktionalität
Der Adapter überwacht das lokale Netzwerk auf UDP-Pakete von Tuya-Geräten (alte Firmware, also nur unverschlüsselt). Der ioBroker-Host, auf dem der Adapter ausgeführt wird, muss sich im selben Netzwerksegment befinden wie die Geräte, und UDP-Multicasting muss vom Router unterstützt werden!

Alle erkannten Geräte werden dem Adapter hinzugefügt und als Basisfunktionalität fordert der Adapter Daten im definierten Abfrageintervall an. Ohne eine Synchronisation mit der jeweiligen mobilen App (su) sind KEINE weiteren Funktionen wie Echtzeitupdates oder Controlling möglich.

Neuere verschlüsselte Geräte werden NICHT angezeigt, bevor Sie eine Gerätesynchronisierung durchführen (siehe nächste ...)

### Erweiterte Funktionalität nach Gerätesynchronisation
Um die volle Funktionalität des Adapters zu erhalten und auch Geräte mit der neuen verschlüsselten Firmware zu unterstützen, muss dem Adapter ein Verschlüsselungsschlüssel bekannt sein.

Der einfachste Weg, diesen Verschlüsselungsschlüssel zu erhalten, besteht darin, sie über die verwendete mobile App abzurufen. Dazu stellt der Adapter einen Proxy bereit, um die Kommunikation der App mit den Tuya-Servern abzufangen und die erforderlichen Informationen abzurufen.

** Wichtiger Hinweis für iOS-Benutzer: ** Der hier beschriebene Proxy-Ansatz funktioniert nicht mehr. Sobald Sie Smart Life App Version 3.10 oder höher haben, ist die Kommunikation von der App für den Proxy nicht mehr sichtbar. Es funktioniert jedoch immer noch mit allen Android-App-Versionen. Der beste Ansatz ist daher ein Androis-Emulator, wie unter https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte- beschrieben. ger% C3% A4te / 19

Dazu müssen Sie zunächst ein benutzerdefiniertes Root-Zertifikat auf Ihrem Mobilgerät hinzufügen.
Wenn Sie in der Konfiguration der Adapterinstanz auf "Start Proxy" klicken, wird das Zertifikat für Ihr System erstellt und zeigt einen QR-Code zum Download-Speicherort an. Im Idealfall scannen Sie den QR-Code mit Ihrem Mobilgerät und folgen Sie den Anweisungen, um dieses Root-Zertifikat hinzuzufügen und ihm zu vertrauen.
Wenn der QR-Code-Speicherort nicht erreichbar ist (kann bei Verwendung von Docker oder ähnlichem vorkommen), öffnen Sie den "Proxy Web Info Port" in Ihrem Browser und klicken Sie in der Navigation auf "Root-CA". Sie können auch die CA-Datei herunterladen.

Stellen Sie nun sicher, dass Sie die entsprechende Tuya Smart App schließen / beenden.
Fügen Sie anschließend den Proxy-Port und den ioBroker-Host als "Manual" -Proxy für Ihre WLAN-Verbindung auf Ihrem Mobiltelefon hinzu.

Öffnen Sie nun die jeweilige Tuya Smart App und / oder laden Sie sie neu.

Die Admin-Konfiguration zeigt eine Erfolgsmeldung an, wenn das entsprechende Datenpaket empfangen wurde, und schaltet den Proxy 10 Sekunden später aus. Sie können jetzt den Proxy von Ihrem Telefon entfernen und auch das Zertifikat nicht mehr vertrauen.

Direkt danach sollten die Objekte mit aussagekräftigeren Namen aktualisiert werden und von da an automatisch Live-Updates erhalten und kommunizieren können.

Die Synchronisierung wird nur zu Beginn oder nach dem Hinzufügen neuer Geräte zu Ihrer App benötigt.

Einige Bilder für bestimmte mobile Betriebssysteme finden Sie unter [Proxy-Seite](PROXY.md).

## Nicht für batteriebetriebene Geräte
Batteriebetriebene Geräte werden von diesem Adapter normalerweise NICHT unterstützt! Der Grund dafür ist, dass sie nicht immer online sind, um Strom zu sparen. Wenn sie ein Signal erhalten, gehen Sie online, senden Sie das Update an die Tuya-Cloud-Server und gehen Sie wieder offline. Sie senden keine UDP-Pakete aus oder sind so lange online, dass der Adapter eine Verbindung zu ihnen herstellen kann.
Sobald jemand eine Möglichkeit findet, Daten direkt aus der Tuya-Cloud abzurufen, kann sich dies ändern.

## Credits
Die Arbeit des Adapters wäre ohne die großartige Arbeit von @codetheweb, @kueblc und @ NorthernMan54 (https://github.com/codetheweb/tuyapi) und https://github.com/clach04/python-tuya nicht möglich gewesen und viele mehr.

## Machen
* Verbesserung der Tests: State Checks und SetState's
* Dokumentation verbessern

## So melden Sie Probleme und Funktionsanforderungen
Bitte benutzen Sie dazu GitHub.

Stellen Sie den Adapter am besten auf den Debug-Protokollmodus ein (Instanzen -> Expertenmodus -> Spaltenprotokollstufe). Dann holen Sie sich bitte die Protokolldatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht von Admin, da Admin die Zeilen schneidet). Wenn Sie es nicht in der GitHub-Ausgabe bereitstellen möchten, können Sie es mir auch per E-Mail senden (iobroker@fischer-ka.de). Bitte fügen Sie einen Verweis auf das relevante GitHub-Problem hinzu UND beschreiben Sie auch, was ich zu welchem Zeitpunkt im Protokoll sehe.

## Was ist Sentry und was wird den Servern gemeldet?
Sentry.io ist eine Möglichkeit für Entwickler, sich einen Überblick über Fehler in ihren Anwendungen zu verschaffen. Und genau das ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an unseren eigenen Sentry-Server gesendet, der in Deutschland gehostet wird. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Namen oder dergleichen) enthalten. Auf diese Weise kann Sentry Fehler gruppieren und anzeigen, wie viele eindeutige Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

## Changelog

### 3.2.0 (2020-02-05)
* (Apollon77) Many new schemas added
* (Apollon77) Add Infos about compatible App versions with link to enhanced docs
* (Apollon77) try to detect unsupported apps when trying to sync and write warning in logfile
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.1.16 (2019-12-26)
* (Apollon77) New schemas added
* (Apollon77) prevent crash when proxy request had no hosts array

### 3.1.15 (2019-12-24)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.14 (2019-12-20)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.13 (2019-12-11)
* (Apollon77) New schemas added

### 3.1.12 (2019-12-07)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.11 (2019-12-06)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.10 (2019-12-05)
* (Apollon77) New schemas added

### 3.1.9 (2019-11-30)
* (Apollon77) New schemas added
* (Apollon77) Improve error handling for proxy web port

### 3.1.8 (2019-11-28)
* (Apollon77) New schemas added
* (Apollon77) Add check for invalid proxy port

### 3.1.7 (2019-11-26)
* (Apollon77) New schemas added

### 3.1.6 (2019-11-25)
* (Apollon77) New schemas added
* (Apollon77) Optimize Sentry integration and dedupe errors

### 3.1.4 (2019-11-24)
* (Apollon77) New schemas added

### 3.1.3 (2019-11-24)
* (Apollon77) try to get rid of SSL errors with new proxies
* (Apollon77) Many new schemas added
* (Apollon77) Sentry added for error/exception/schema reporting
* (Apollon77) Compact Mode added

### 3.0.0 (2019-09-03)
* (Apollon77) Switch from AnyProxy to mitm ... hopefully get SSL-Proxy working again. Important: The Proxy is called "NodeMITMProxyCA"!

### 2.0.4 (2019-08-01)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.3 (2019-07-11)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.2 (2019-06-27)
* (Apollon77) New schemas added
* (Apollon77) Update all Dependencies
* (Apollon77) Nodejs 6.x no longer supported!
* (Apollon77) Support encrypted devices

### 1.0.8 (2019-03-08) [Unreleased]
* (Apollon77) New schemas added

### 1.0.7 (2018-11-23)
* (Apollon77) New schemas added, fixed one error

### 1.0.5 (2018-11-18)
* (Apollon77) preserve device name too, New schemas

### 1.0.4 (2018-11-16)
* (Apollon77) New schemas added

### 1.0.3
* (Apollon77) New schemas added

### 1.0.2
* (Apollon77) New schemas added
* (Apollon77) Data are requested from the device after controlling because sometimes not all data seems to be updated automatically

### 1.0.1
* (Apollon77) Automatically convert some value types like booleans better

### 1.0.0
* (Apollon77) Add several new schema definitions
* (Apollon77) Optimizations and bug fixes

### 0.1.3
* (Apollon77) Add several new schema definitions
* (Apollon77) Try to preserve names of objects. Sync with App via proxy will overwrite in any case!
* (Apollon77) Optimizations and bug fixes

### 0.1.2
* (BuZZy1337) Optimized Admin, thank you very much!

### 0.1.0/1
* (Apollon77) development and first tests

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Apollon77 <iobroker@fischer-ka.de>

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