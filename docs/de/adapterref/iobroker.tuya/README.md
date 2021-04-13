---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: w5Wvp8cqmi7jYdq4nzNU5aCU6AKPwoCacnh/D6CUl1M=
---
![Logo](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Anzahl der Installationen](http://iobroker.live/badges/tuya-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tuya.svg)
![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.tuya/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.tuya?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.tuya.png?downloads=true)

# IoBroker.tuya
** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

ioBroker-Adapter für die Verbindung mit mehreren kleinen und billigen Wifi-Geräten, die mit der Tuya Cloud verbunden sind und hauptsächlich die Smartlife App / Alexa-Skill verwenden. Der Adapter unterstützt das Lesen von Statusaktualisierungen in Echtzeit und das Steuern dieser Geräte, sobald diese mit der jeweiligen Mobiltelefon-App synchronisiert wurden.

Tuya-Geräte sind ESP8266MOD WiFi-Smart-Geräte von Shenzhen Xenon.

Neben Geräten, die mit der Smart Live App verwendet werden können, sollte auch die Verwendung der Jinvoo Smart App, der Xenon Smart App, der eFamilyCloud, der io.e (Luminea oder einer solchen) App möglich sein. Bitte melden Sie sich bei Erfolg zurück. <img src="https://https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/admin/warning.png" width="50" height="50"> **Der Adapter funktioniert nur mit Tuya und kompatiblen Apps, solange deren Version &lt;3.14 (!!) ist**

Der Adapter funktioniert nachweislich sehr gut mit allen Geräten, die "immer über WLAN" verfügen. Geräte, die nur dann online gehen, wenn ein Ereignis vorliegt, ihre Daten senden und wieder offline gehen, werden nicht unterstützt. Dies bedeutet, dass **batteriebetriebene Geräte normalerweise NICHT funktionieren!**

Eine Adapterinstanz kann alle Geräte in einem Netzwerk verarbeiten, die UDP-Pakete weiterleiten.

## Kompatible mobile Apps und Versionen
Die aktuellen Versionen des Tuya Smart und auch der Smartlife App sind **nicht mehr kompatibel** mit der Funktionsweise des Adapters, da Tuya den gesamten Datenverkehr verschlüsselt hat, den der Adapter abhören könnte. Im Moment funktionieren noch einige ältere Versionen der Apps ...

* Smartlife App <3.14, am besten 3.12.6 !!
* Tuya Smart App <3.14, am besten 3.12.x.
* STL Smart Home App 1.1.1 (zuletzt vom September 2019)
* Ucomen Home App (??)

## Wichtiger Hinweis
Wenn die Geräte über ihre UDP-Pakete nicht korrekt erkannt werden, können Sie die IP manuell festlegen, indem Sie das Geräteobjekt bearbeiten. Siehe https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636

## Wie der Adapter funktioniert
### Grundfunktionalität
Der Adapter überwacht das lokale Netzwerk auf UDP-Pakete von Tuya-Geräten (alte Firmware, also nur unverschlüsselt). Der ioBroker-Host, auf dem der Adapter ausgeführt wird, muss sich im selben Netzwerksegment befinden wie die Geräte, und UDP-Multicasting muss vom Router unterstützt werden!

Alle erkannten Geräte werden dem Adapter hinzugefügt, und als Basisfunktionalität fordert der Adapter Daten im definierten Abfrageintervall an. Ohne eine Synchronisierung mit der jeweiligen mobilen App (siehe unten) sind KEINE weiteren Funktionen wie Echtzeit-Updates oder Controlling möglich.

Neuere verschlüsselte Geräte werden NICHT angezeigt, bevor Sie eine Gerätesynchronisierung durchführen (siehe nächste ...).

### Erweiterte Funktionalität nach Gerätesynchronisierung
Um die volle Funktionalität des Adapters zu erhalten und auch Geräte mit der neuen verschlüsselten Firmware zu unterstützen, muss dem Adapter ein Verschlüsselungsschlüssel bekannt sein.

Der einfachste Weg, diesen Verschlüsselungsschlüssel zu erhalten, besteht darin, ihn von der verwendeten mobilen App abzurufen. Zu diesem Zweck bietet der Adapter einen Proxy, um die Kommunikation der App mit den Tuya-Servern abzufangen und die erforderlichen Informationen abzurufen.

** Wichtiger Hinweis für iOS-Benutzer: ** Der hier beschriebene Proxy-Ansatz funktioniert nicht mehr. Sobald Sie über Smart Life App Version 3.10 oder höher verfügen, ist die Kommunikation von App für den Proxy nicht mehr sichtbar. Da es jedoch immer noch mit allen Android App-Versionen funktioniert, ist der beste Ansatz ein Androis-Emulator, wie er grob unter https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte- beschrieben wird ger% C3% A4te / 19

Dazu müssen Sie zunächst ein benutzerdefiniertes Root-Zertifikat auf Ihrem Mobilgerät hinzufügen.
Wenn Sie in der Konfiguration der Adapterinstanz auf "Proxy starten" klicken, wird das Zertifikat für Ihr System erstellt und zeigt dem Download-Speicherort einen QR-Code an. Scannen Sie den QR-Code idealerweise mit Ihrem Mobilgerät und folgen Sie den Anweisungen, um dieses Stammzertifikat hinzuzufügen und ihm zu vertrauen.
Wenn der Speicherort des QR-Codes nicht erreichbar ist (kann bei Verwendung von Docker oder Ähnlichem auftreten), öffnen Sie den "Proxy Web Info Port" in Ihrem Browser und klicken Sie in der Navigation auf "Root-CA". Sie können auch die CA-Datei herunterladen.

Stellen Sie nun sicher, dass Sie die entsprechende Tuya Smart App schließen / beenden.
Fügen Sie anschließend den Proxy-Port und den ioBroker-Host als "manuellen" Proxy für Ihre WLAN-Verbindung auf Ihrem Mobiltelefon hinzu.

Öffnen Sie nun die entsprechende Tuya Smart App und / oder laden Sie sie neu.

Die Admin-Konfiguration zeigt eine Erfolgsmeldung an, wenn das entsprechende Datenpaket empfangen wurde, und schaltet den Proxy 10 Sekunden später aus. Sie können jetzt den Proxy von Ihrem Telefon entfernen und das Zertifikat auch nicht mehr vertrauen.

Unmittelbar danach sollten die Objekte mit aussagekräftigeren Namen aktualisiert werden und von da an automatisch Live-Updates erhalten und in der Lage sein, zu kommunizieren.

Die Synchronisierung wird nur anfangs oder nach dem Hinzufügen neuer Geräte zu Ihrer App benötigt.

Einige Bilder für ein mobiles Betriebssystem finden Sie unter [Proxy-Seite](PROXY.md).

## Nicht für batteriebetriebene Geräte
Batteriebetriebene Geräte werden normalerweise NICHT von diesem Adapter unterstützt! Der Grund ist, dass sie nicht immer online sind, um Strom zu sparen. Immer wenn sie ein Signal erhalten, gehen sie online, senden das Update an die Tuya-Cloud-Server und gehen wieder offline. Sie senden keine UDP-Pakete aus oder sind lange genug online, damit der Adapter eine Verbindung zu ihnen herstellen kann.
Sobald jemand einen Weg findet, Daten direkt aus der Tuya-Cloud abzurufen, kann sich dies ändern.

## Credits
Die Arbeit des Adapters wäre ohne die großartige Arbeit von @codetheweb, @kueblc und @ NorthernMan54 (https://github.com/codetheweb/tuyapi) und https://github.com/clach04/python-tuya nicht möglich gewesen und viele mehr.

## Machen
* Testen verbessern: Statusprüfungen und setState's
* Dokumentation verbessern

## So melden Sie Probleme und Funktionsanforderungen
Bitte verwenden Sie dazu GitHub-Probleme.

Am besten stellen Sie den Adapter auf den Debug-Protokollmodus (Instanzen -> Expertenmodus -> Spaltenprotokollstufe). Dann holen Sie sich bitte die Protokolldatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht von Admin, da Admin die Zeilen abschneidet). Wenn Sie es nicht gerne in der GitHub-Ausgabe bereitstellen, können Sie es mir auch per E-Mail senden (iobroker@fischer-ka.de). Bitte fügen Sie einen Verweis auf das relevante GitHub-Problem hinzu UND beschreiben Sie auch, was ich zu welchem Zeitpunkt im Protokoll sehe.

## Changelog

### 3.6.1 (2021-04-11)
* (Apollon77) More schema information added

### 3.6.0 (2021-04-02)
* (Apollon77) Fix broken data updates because of tuyaapi change
* (Apollon77) Optimize "json unvalid" cases by refreshing data manually differently 
* (Apollon77) More schema information added

### 3.5.9 (2021-03-28)
* (Apollon77) More schema information added

### 3.5.8 (2021-03-24)
* (Apollon77) More schema information added

### 3.5.7 (2021-03-18)
* (Apollon77) Fix crash case (Sentry IOBROKER-TUYA-P9)
* (Apollon77) More schema information added

### 3.5.6 (2021-02-09)
* (Apollon77) More schema information added

### 3.5.4 (2021-01-30)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-TUYA-MG)
* (Apollon77) More schema information added

### 3.5.3 (2021-01-13)
* (Apollon77) More schema information added

### 3.5.2 (2020-12-24)
* (Apollon77) More schema information added

### 3.5.0 (2020-12-10)
* (Apollon77) More schema information added
* (Apollon77) Try to decode "raw" values via base64

### 3.4.3 (2020-11-29)
* (Apollon77) More schema information added

### 3.4.2 (2020-11-19)
* (Apollon77) More schema information added

### 3.4.1 (2020-11-05)
* (Apollon77) More schema information added
* (Apollon77) fix IP lookup via UDP

### 3.4.0 (2020-10-29)
* (Apollon77) update tuya-api library

### 3.3.15 (2020-10-29)
* (Apollon77) More schema information added

### 3.3.14 (2020-09-15)
* (Apollon77) More schema information added

### 3.3.12 (2020-08-26)
* (Apollon77) More schema information added
* (Apollon77) Crash case prevented (Sentry IOBROKER-TUYA-89)

### 3.3.11 (2020-08-18)
* (Apollon77) More schema information added

### 3.3.10 (2020-08-02)
* (Apollon77) More schema information added

### 3.3.9 (2020-07-16)
* (Apollon77) More schema information added

### 3.3.8 (2020-07-09)
* (Apollon77) Work around invalid data that are returned by some devices
* (Apollon77) More schema information added

### 3.3.7 (2020-07-01)
* (Apollon77) More schema information added

### 3.3.6 (2020-06-29)
* (Apollon77) More schema information added

### 3.3.5 (2020-06-11)
* (Apollon77) More schema information added
* (Apollon77) Optimizations and fixes

### 3.3.2 (2020-03-19)
* (Apollon77) Many new schemas added

### 3.2.3 (2020-03-08)
* (Apollon77) Many new schemas added

### 3.2.2 (2020-02-08)
* (Apollon77) New schemas added
* (Apollon77) Better handle strange case where qrcode library is not existing

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

Copyright (c) 2018-2020 Apollon77 <iobroker@fischer-ka.de>

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