---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.net-tools/README.md
title: Net Tools
hash: E5GWcV7mbsnibvXXMxSgaDtZNq6oW3S9WM/TvOcvBxU=
---
![Logo](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![Anzahl der Installationen](http://iobroker.live/badges/net-tools-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.net-tools.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Tests](https://travis-ci.org/jey-cee/ioBroker.net-tools.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)

# Net Tools
| [Sponsoren](https://github.com/iobroker-community-adapters/ioBroker.net-tools/blob/master/SPONSORS.md) | |
|---|---|
| [![Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url) | <a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2"></a> |
| [! [Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)] (https://www.paypal.com/cgi-bin/ webscr? cmd = _s-xclick &amp; hosts_button_id = 95YZN2LR59Q64 &amp; source = url) | <a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2"></a> |

### Entdecken Sie Geräte im Netzwerk
Setzen Sie das Erkennungsobjekt auf true, um Geräte in Ihrem Netzwerk zu erkennen. Dieser Vorgang dauert eine Weile.
Diese Funktion wird vom Erkennungsadapter bereitgestellt. Dies bedeutet, dass die Erkennung installiert wird, wenn dies nicht der Fall ist und ausgeführt werden muss.

Anmerkung: Diese Funktion ist auf das Subnetz des ioBroker-Hosts beschränkt.

### Pingt konfigurierte IP-Adressen an
Pingt die angegebenen IP-Adressen in einem definierten Intervall und überwacht die Ergebnisse. (lebendig, rps, Zeit)

### Wake on LAN
Setzen Sie das wol-Objekt auf true und 3 WOL-Pakete werden mit einer Dauer von 750 ms an Ihr Gerät gesendet.

### Port-Scan
Wenn Sie scan auf true setzen, wird nach allen offenen Ports in einem Bereich von 0-65535 gesucht. Dieser Vorgang dauert eine Weile.
Das Ergebnis wird in Objektports geschrieben.

---

## Für Entwickler
#### Mac für bestimmtes Gerät abrufen
`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Anmerkung: Diese Funktion ist auf das Subnetz des ioBroker-Hosts beschränkt.

#### Ping-spezifische IP-Adresse
`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake on LAN
`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Changelog

### 0.1.2
* added device discovery to configuration page
* start discovery if it is not started and stop it afterwards


### 0.1.1 
* initial release

## License

The MIT License (MIT)

Copyright (c) 2020-2021, Jey Cee <jey-cee@live.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.