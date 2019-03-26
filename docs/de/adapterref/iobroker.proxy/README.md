---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.proxy/README.md
title: ioBroker.proxy
hash: iHHYy+0aocpDNzYRw4oG9/MEk1MVBab4p9GQzuyPUYM=
---
![Logo](../../../en/adapterref/iobroker.proxy/admin/proxy.png)

![Anzahl der Installationen](http://iobroker.live/badges/proxy-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.proxy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.proxy.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.proxy.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.proxy.png?downloads=true)

# IoBroker.proxy ===================
## Verwendungszweck
Ermöglicht den Zugriff auf definierte URLs oder lokale Dateien über einen Webserver.

Spezifizierte Routen sind unter ```http://ip:8082/proxy.0/context/...``` verfügbar. Natürlich können Port, Protokoll, "Proxy.0", abhängig von den Einstellungen variieren.

## Aufbau
- WEB-Adapter erweitern: Für welche Webinstanz wird dieser Proxy aktiviert.
- Routenpfad: Pfad für Proxy. Bei "/proxy.0" stehen die Routen unter `` http:// webIP: 8082 / proxy.0 / ... `` `zur Verfügung
- Fehler-Timeout (ms): Minimales Intervall zwischen Wiederholungen, wenn die angeforderte Ressource nicht verfügbar war oder ein Fehler zurückgegeben wurde.

## Probeneinstellungen
| Kontext | URL | Beschreibung |
|----------------|:---------------------------------------------------|:---------------------------------------------------|
| admin / | http:// localhost: 8081 | Zugriff auf die Admin-Seite |
| Router / | http://192.168.1.1 | Zugriff auf lokalen Router |
| cam / | http:// user: pass@192.168.1.123 | Zugriff auf die Webcam (z. B. Aufruf http: // ip: 8082 / proxy.0 / cam / web / snapshot.jpg) |
| dir / | / tmp / | Zugriff auf das lokale Verzeichnis "/ tmp /" |
| dir / | tmp / | Zugriff auf lokales Verzeichnis "/ opt / iobroker / tmp" |
| file.jpg | /tmp/picture.jpg | Zugriff auf die lokale Datei "/tmp/picture.jpg" |

** Nicht auf alle Geräte kann über einen Proxy zugegriffen werden.

Einige Geräte möchten sich in der Wurzel ```http://ip/``` befinden und können nicht unter ```http://ip/proxy.0/context/``` ausgeführt werden.

Sie können mehr über den Kontext lesen. [Hier](https://www.npmjs.com/package/http-proxy-middleware#context-matching)

Zusätzlich kann der Benutzer den Routenpfad für Proxy-Anforderungen definieren.

## Changelog
### 1.0.3 (2018-07-14)
* (bluefox) Newer mime version used

### 1.0.2 (2018-06-30)
* (bluefox) URI was decoded for usage of special chars in password and login

### 1.0.1 (2018-03-01)
* (bluefox) Fixed error: after 10 timeouts the web cam was never reachable
* (bluefox) Ready for Admin3

### 1.0.0 (2017-10-09)
* (bluefox) do not allow the error generation to fast

### 0.2.0 (2017-03-13)
* (bluefox) fix run-mode

### 0.0.1 (2017-01-09)
* (bluefox) initial commit