---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-airpurifier/README.md
title: ioBroker.mihome-Luftreiniger
hash: 4cO83i4dXikaBbW73ZksOsXn9rVQP2OKRCk+RMXHOS0=
---
![Anzahl der Installationen](http://iobroker.live/badges/mihome-airpurifier-stable.svg)
![Build Status](https://travis-ci.org/JoJ123/ioBroker.mihome-airpurifier.svg?branch=master)

---
---
![Logo](../../../en/adapterref/iobroker.mihome-airpurifier/admin/mihome-airpurifier.png)

# IoBroker.mihome-airpurifier Xiaomi Air Purifier-Adapter für die ioBroker IoT-Plattform.
## Wie bekomme ich den Token?
Sie müssen das miio-Kommandozeilen-Tool `npm install -g miio` installieren.

Jetzt haben Sie zwei Möglichkeiten:

1. Mit der Mi Home App:

    Sie verbinden den Luftreiniger mit der MI Home App mit Ihrem Wifi-Netzwerk und führen dann den folgenden Befehl aus:

    `miio discover`

    Sie sollten die folgende Ausgabe erhalten und können das Token speichern.

```
Device ID: 48765421
Model info: zhimi.airpurifier.m1
Address: 192.168.100.9
Token: token-as-hex-here via auto-token
Support: At least basic
```

2. Ohne Mi Home App:

    Sie setzen die WLAN-Einstellungen des Luftreinigers zurück. Dann verbinden Sie Ihr Netzwerk mit dem WIFI des Luftreinigers und führen den folgenden Befehl aus:

    `miio discover`

    Sie sollten die gleiche Ausgabe wie oben erhalten und können nun die Verbindung zu Ihrem Netzwerk mit dem folgenden Befehl konfigurieren:

    `miio configure id-or-address --ssid ssid-of-network --passwd password-of-network`

    Jetzt ist der Luftreiniger mit Ihrem Netzwerk verbunden.

## Cloud-Verbindung
Um den Luftreiniger mit dem Cloud-Adapter zu steuern, fügen Sie Ihrem Cloud-Adapter einfach den Status "manuallevel" hinzu. Danach können Sie f.e. die folgenden Befehle über Alexa:

* Alexa, schalte den Luftreiniger ein *,

* Alexa, stelle den Luftreiniger auf 50% *,

*Alexa, schalte den Luftreiniger aus*

Wenn Sie im Cloud-Adapter den Wert "On Value" auf "Last active value" setzen, wird das Gerät immer mit der neuesten aktiven Leistungsstufe gestartet.

## Kontrollzustände
Zur Steuerung Ihres Luftreinigers können die folgenden Objekte geschrieben werden:

| Staat | Beschreibung |
| :---           | :---        |
| `power` | Gerät ein- / ausschalten |
| `silent` | Aktivieren Sie den Silent-Modus des Geräts. |
| `manual` | Aktivieren Sie den manuellen Modus des Geräts. |
| `manuallevel` | Steuern Sie die Leistung des manuellen Modus im Bereich von 0-100%. Dadurch wird das Gerät bei Bedarf auch ein- / ausgeschaltet |
| `manuallevel` | Steuern Sie die Leistung des manuellen Modus im Bereich von 0-100%. Dadurch wird das Gerät bei Bedarf auch ein- / ausgeschaltet |

## Info States
Die folgenden Informationen werden von Ihrem Luftreiniger gesammelt (schreibgeschützt):

### Geräteinformationen
| Staat | Beschreibung |
| :---        | :---        |
| `mode` | Der tatsächliche Gerätemodus, nur gültig, wenn das Gerät eingeschaltet ist. |
| `humidity` | Die gemessene relative Luftfeuchtigkeit in% des Geräts. |
| `pm25` | Die Luftverschmutzung in PM2.5. |
| `pm25` | Die Luftverschmutzung in PM2.5. |

## Changelog
### 0.0.6 (09.04.2019)
* (JoJ123) update miio to fork of Sineos

### 0.0.5 (06.01.2019)
* (JoJ123) update natives

### 0.0.4 (02.01.2019)
* (JoJ123) update type

### 0.0.3 (18.12.2018)
* (JoJ123) npm release

### 0.0.2 (29.11.2018)
* (JoJ123) auto reconnect

### 0.0.1 (10.10.2018)
* (JoJ123) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 Johannes Jaeger johannesjaegeroffice@gmail.com

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

Copyright (c) 2019 Johannes Jaeger johannesjaegeroffice@gmail.com