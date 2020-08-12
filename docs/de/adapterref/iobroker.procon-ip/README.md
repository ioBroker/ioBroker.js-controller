---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: WHThC2C72ZK1XeH7fiMjD2Xk2dKMo/A1XKd1OFx4/oc=
---
![Logo](../../../en/adapterref/iobroker.procon-ip/admin/iobroker-procon-ip.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![Installationen](http://iobroker.live/badges/procon-ip-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ylabonte/iobroker.procon-ip.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![Travis-CI](http://img.shields.io/travis/ylabonte/ioBroker.procon-ip/master.svg)
![NPM](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)

# IoBroker.procon-ip
## ProCon.IP Pool Control Adapter für ioBroker
ioBroker-Adapter zur grundlegenden Unterstützung der ProCon.IP-Schwimmbadsteuereinheit. Es ist für die Integration in Ihre ioBroker-Hausautomation vorgesehen, z.
um eine Logik zu erstellen, an der andere Geräte beteiligt sind, oder einfach mit Ihren bevorzugten Sprachassistenten gekoppelt zu werden:

* Sie können die [_cloud_] (https://github.com/ioBroker/ioBroker.cloud) oder verwenden

[_IoT_](https://github.com/ioBroker/ioBroker.iot) Adapter für Alexa (und auch Google Home, glaube ich) und

* [_yahka_] (https://github.com/jensweigele/ioBroker.yahka) als Brücke zum

  Apple HomeKit von Siri oder zu erreichen

* Verwenden Sie das [_javascript_] (https://github.com/ioBroker/ioBroker.javascript), um

  Erstellen Sie Ihre eigene benutzerdefinierte Logik.

Weitere Informationen finden Sie in den [Wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki).

### Was ist die ProCon.IP-Poolsteuerung?
![Bild von pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

Die ProCon.IP-Poolsteuerung ist eine an ein Netzwerk angeschlossene Low-Budget-Steuereinheit für Heimschwimmbäder. Mit seinen softwaregeschalteten Relais kann es mehrere Pumpen (für den Poolfilter und verschiedene Dosierungsaspekte) steuern, die entweder einfach pro Zeitplan geplant sind oder von einem Messwert / Wert aus einem seiner vielen Eingangskanäle für Messungen abhängen (z. B. E / A-Durchfluss) Sensoren, Dallas 1-Draht-Termometer, Redox- und pH-Elektroden). Zumindest besteht auch die Möglichkeit, diese Relais bei Bedarf einzuschalten, wodurch sie auch zum Ein- und Ausschalten von Lichtern (oder anderen gewünschten Elementen) verwendet werden können.
Nicht alle Funktionen sind über die API erreichbar. Tatsächlich gibt es eine dokumentierte API zum Lesen (Abrufen) von Werten als CSV (`/GetState.csv`). In meinen Erinnerungen gab es eine andere zum Ein- und Ausschalten der Relais mit Timer. Aber ich kann den zweiten nicht mehr finden. Also nicht einmal hübsch, sondern funktional: Die ProCon.IP verfügt über zwei native Webschnittstellen, die analysiert werden können, um eine bestimmte Funktionalität (wie das Schalten der Relais) rückzuentwickeln.

Weitere Informationen finden Sie unter folgendem Link (leider nur auf Deutsch; ich habe noch keine englische Dokumentation / Information gefunden):

* [pooldigital.de Webshop] (https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webstellungs-poolsteuerung-/-dosieranlage)
* [pooldigital.de Forum] (http://forum.pooldigital.de/)

** Um ganz klar zu sein: Ich habe nichts mit der Entwicklung, dem Verkauf, dem Marketing oder der Unterstützung der Poolsteuereinheit zu tun. Ich habe gerade eine Lösung entwickelt, um diese in ioBroker zu integrieren und das Zuhause meiner Eltern ein bisschen intelligenter zu machen. **

### Details zum Adapter
Der Adapter verwendet die `/GetState.csv`-API des ProCon.IP, um seine Werte abzufragen, und eine andere - nicht dokumentierte - API, die mit bitweisen Befehlen zum Umschalten der Relais arbeitet. Die zweite wird auch von den ursprünglichen Webschnittstellen der ProCon.IP verwendet. Es könnte also zukünftige Firmware-Upgrades geben, die mit diesem Adapter kompatibel sind oder zumindest die Funktionalität zum Schalten der Relais.

#### Kompatibilität
Derzeit wurde der Adapter in Kombination mit der ProCon.IP-Firmware **Version 1.7.0.c** getestet und entwickelt.

## Roadmap
### 1.0.0
** Stabile Version: ** Dies sollte der Release-Kandidat für das offizielle ioBroker-Adapter-Repository werden. Da dies buchstäblich ein Meilenstein für dieses Projekt ist, habe ich einen solchen für die relevanten Themen erstellt, um den Fortschritt zu verfolgen und dies für Sie transparenter zu machen.

* Beheben Sie alle offenen [Meilensteinprobleme] (https://github.com/ylabonte/ioBroker.procon-ip/milestone/1).

  in Bezug auf diejenigen, die sich aus den [Adapter Überprüfung](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248) ergeben)

* ~~ Dokumentation hinzufügen (mach das Github-Wiki nützlich / hilfreich) ~~
* ~~ Verbindungsstatus einschließlich Zeitstempel der letzten Aktualisierung und Systeminformationen von anzeigen

die ProCon.IP in der Registerkartenansicht (kann durch Aktivieren des entsprechenden Menüeintrags im Admin-Adapter aktiviert werden) ~~

* ~~ Automatisierte Tests bezüglich der Funktionalität des Adapters (z. B. Einheit)

  Tests) ~~

** Was ist mit den Punkten passiert, die jetzt durchgestrichen sind? ** Nun, die Dokumentation wurde bereits verbessert. Jetzt liegt es an Ihnen, das Wiki zu erweitern oder mich zu bitten, Probleme zu verwenden, um das Wiki oder README.md in Bezug auf einen bestimmten Inhalt zu erweitern.
Die Tab-Ansicht scheint mir ziemlich interessant zu sein. Wenn Sie eine solche Funktion schätzen würden, lassen Sie es mich einfach wissen ...
Das Fehlen automatisierter Tests bezüglich der Funktionalität des Controllers ist ziemlich unangenehm, aber der Fokus liegt jetzt eindeutig darauf, stabil zu werden, und das Schreiben guter und nützlicher Tests für den gesamten vorhandenen Code wird viel Zeit kosten (in Bezug auf die Verwendung bezüglich des Komplexität und Zielgruppe dieses Softwareprojekts) und könnte in einem weiteren Refactoring enden. Es wird also etwas für die Zukunft sein, aber für die Version 1.0.0 nicht mehr relevant.

## Entwicklung und Beteiligung
Sie können mich gerne kontaktieren, wenn Sie an der Entwicklung oder Dokumentation dieses Adapters teilnehmen möchten.

Nützliche Links für den Ansatz werden sein

* die [TypeScript-Adaptervorlage] (https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

  Ich hatte angefangen von und

* das [Handbuch für Adapterentwickler] (https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

## Changelog

### 0.4.1
Bugfix release:
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated or not
  and therefore decide on how to handle write actions to the corresponding relay state._

### 0.4.0
Public release version:
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### 0.3.1
Functional and security update:
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### 0.2.0
Minor update:
* Update npm dependencies
* Group admin settings input fields in rows

### 0.1.1
Security update:
* Update vulnerable eslint-utils

### 0.1.0
Functional update and minor fixes:
* Fix object attributes regarding the cloud adapter
* Optimization for the cloud adapter
    * Pre-defined `smartName` attributes for active relays and temperature sensors
    * Recognize relays with 'light', 'licht' or 'leucht' in its name as `smartType` _LIGHT_ 

### 0.0.4
Security update:
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### 0.0.3
Bugfix release:
* Fix missing `value` states
* Reduce logging output

### 0.0.2
Bugfix release:
* Fix sys info state values

### 0.0.1
Initial release with following features:
* All information from `GetState.csv` as readonly states
* Writable states for all relays to toggle auto/manual
* Writable states for relays not configured for dosage control to toggle on/off

## License
MIT License

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

Copyright (c) 2020 Yannic Labonte <yannic.labonte@gmail.com>