---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.egigeozone/README.md
title: ioBroker.egigeozone
hash: RA1yeaAyhKiG1Wa1zx6oqvF/MTg5TbZcvvOx0RM6Dco=
---
# IoBroker.egigeozone
# Beschreibung

![Anzahl der Installationen](http://iobroker.live/badges/egigeozone-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.egigeozone.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.egigeozone.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/basgo/iobroker.egigeozone.svg)
![NPM](https://nodei.co/npm/iobroker.egigeozone.png?downloads=true)
![Travis-CI](https://img.shields.io/travis/BasGo/ioBroker.egigeozone/master.svg)
![Build-Status](https://ci.appveyor.com/api/projects/status/eobyt279ncmd9qbi/branch/master?svg=true)

Dies ist ein ioBroker-Adapter für Android-Geofencing-App "EgiGeoZone" ([Webseite](https://egigeozone.de/)). Es ist in der Lage, Geofence-Ereignisse als HTTP-Anforderungen zu empfangen, wenn Sie ein definiertes Gebiet mit Ihrem mobilen Gerät betreten oder verlassen.

# Sicherheitshinweise
Es wird nicht empfohlen, diesen Adapter für das öffentliche Internet bereitzustellen (z. B. durch Öffnen des konfigurierten Ports in Ihrem Router). Dies bedeutet, dass alle Anforderungen an diesen Port an die IoBroker-Instanz weitergeleitet werden, auf der der Adapter ausgeführt wird. Es gibt mehrere Möglichkeiten, mehr Sicherheit für den Zugriff auf diesen Adapter zu erhalten:

* Verwenden Sie immer eine VPN-Verbindung für Anfragen oder
* Integrieren Sie einen Proxy-Server (z. B. nginx) zum Filtern eingehender Anforderungen.

# Aufbau
In EgiGeoZone sollte die URL mit der folgenden Syntax definiert werden:

Protokoll: // Adresse: Port / Person

* **Protokoll** könnte **http** oder **https** sein.
* **address** sollte die Adresse sein, auf die die Adapterinstanz zugreifen kann.
* **port** sollte der Port sein, auf dem der Adapter überwacht.
* **Person** ist die Person, die für die Auflistung innerhalb des atHome-Arrays verwendet wird.

### Beispiele
* https:// meine-domain: 7654 / John oder
* http:// meine-domain: 7654 / Paul

# Credits
Die Implementierung basiert größtenteils auf dschaedls [ioBroker.geofency] (https://github.com/ioBroker/ioBroker.geofency) an. Das Logo stammt von [Free Icons PNG](http://www.freeiconspng.com/images/maps-icon) und wurde geändert, um einen transparenten Hintergrund zu haben.

## Changelog

### 0.1.2
* (BasGo) Changed icon
* (BasGo) Updated NPM reference

### 0.1.1
* (BasGo) Added whitespace handling for home location

### 0.1.0
* (BasGo) Fixed issue with authorization
* (BasGo) Added description for URL configuration

### 0.0.2
* (BasGo) Updated NPM reference

### 0.0.1
* (BasGo) Initial release

## License
This adapter is licensed under the [MIT license](../blob/master/LICENSE) which is part of this repository.