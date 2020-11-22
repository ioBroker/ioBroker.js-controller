---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.legrand-ecocompteur/README.md
title: ioBroker.legrand-ecocompteur
hash: a73AiyFhTrm8yGm4x+3V6E38/K+jNg56NsBwZYyJ+MY=
---
![Logo](../../../en/adapterref/iobroker.legrand-ecocompteur/admin/legrand-ecocompteur.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.legrand-ecocompteur.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.legrand-ecocompteur.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/legrand-ecocompteur-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/legrand-ecocompteur-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/raintonr/iobroker.legrand-ecocompteur.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/raintonr/ioBroker.legrand-ecocompteur/badge.svg)
![Tests](https://travis-ci.org/raintonr/ioBroker.legrand-ecocompteur.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.legrand-ecocompteur.png?downloads=true)

# IoBroker.legrand-ecocompteur
## Legrand-ecocompteur Adapter für ioBroker
Adapter für das Legrand Ecocompteur-Modul (auch bekannt als Legrand Measurement Concentrator EMDX³ 412000).

Dies ist ein Leistungsmessgerät mit eigener Weboberfläche. Der Adapter verwendet diese Weboberfläche durch:

- Abfrage nach sofortigen Leistungsmesswerten (Lesen einer JSON-Antwort).
- Abrufen der Indexseite des Geräts zum Lesen der TIC-Schnittstelle. TIC steht für Télé-Information Client, ein französisches Konstrukt. Dieser Wert wird in der Regel von einem an den Ecocompteur angeschlossenen Abrechnungszähler abgelesen.

Diese Objekte werden für jeden der 5 vom Ecocompteur gelesenen Schaltkreise plus Gesamtsumme erstellt:

- Momentane Leistung (in Watt).
- Gesamte kumulierte Energie, gemessen bei laufendem Adapter (in kWh).

Ein weiteres Objekt wird erstellt, um den TIC-Schnittstellenwert zu speichern.

### Beachten Sie den fragilen IP-Stack des Ecocompteurs
Durch Tests wurde festgestellt, dass der Ecocompteur einen ziemlich fragilen IP-Stack hat. Manchmal kann der Stack hängen bleiben und nicht mehr auf Anfragen reagieren, obwohl dies nach Erfahrung des Autors auf nicht RFC-konforme Anfragen von einem anderen Hausautomationsgerät zurückgeführt wurde.

Es wäre jedoch ratsam, dieses Risiko zu mindern, indem das Gerät hinter einem einfachen Nginx-Micro-Caching-Reverse-Proxy platziert wird. Beispiel für eine Nginx-Konfiguration für einen Ecocompteur unter http://192.168.0.10/ (setzen Sie daher die *BaseURL* -Einstellungen für diesen Adapter auf *http:// &lt; Nginx-Adresse &gt;: 8080 / le /* :

```
proxy_cache_path /tmp/cache keys_zone=cache:32k levels=1 inactive=10s max_size=256k;

server {
    listen 8080;

    proxy_cache cache;
    proxy_cache_valid 200 1s;
    location /le/ {
        proxy_pass http://192.168.0.10/;
    }
}
```

### Aufbau
Die folgende Konfiguration ist erforderlich:

- Basis-URL des Geräts.
- JSON-Abfrageintervall (in Sekunden).
- Indexabfrageintervall (in Sekunden).
- Validierung: Maximaler Schaltungswert (in Watt).

## Changelog

### 0.0.6
* (Robin Rainton) Change IP address setting to base URL. **Settings will need to be updated.**
* (Robin Rainton) Fixed timeout handling. Parse readings from index HTML. Refactor to use more promises & single interval timer.

### 0.0.4
* (Robin Rainton) Added reading validation filter.

### 0.0.3
* (Robin Rainton) initial clean release.

## License
MIT License

Copyright (c) 2020 Robin Rainton <robin@rainton.com>

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