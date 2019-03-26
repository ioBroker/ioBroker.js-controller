---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-airpurifier/README.md
title: ioBroker.mihome-airpurifier
hash: v9/RyFymOAzQsuQLVQ998xAKpCe4/CXiSDSvgb6c/84=
---
![Logo](../../../en/adapterref/iobroker.mihome-airpurifier/admin/mihome-airpurifier.png)

![Build-Status](https://travis-ci.org/JoJ123/ioBroker.mihome-airpurifier.svg?branch=master)

# IoBroker.mihome-airpurifier
Xiaomi Air Purifier-Adapter für die IoT-Plattform von IoBroker.

## Wie bekomme ich das Token?
Sie müssen das miio-Befehlszeilentool installieren. `npm install -g miio`

Jetzt haben Sie zwei Möglichkeiten:

1. Mit Mi Home App:

    Sie verbinden den Reiniger mit der MI Home App mit Ihrem WLAN-Netzwerk und führen dann den folgenden Befehl aus:

    `miio discover`

    Sie sollten die folgende Ausgabe erhalten und das Token speichern.

```
Device ID: 48765421
Model info: zhimi.airpurifier.m1
Address: 192.168.100.9
Token: token-as-hex-here via auto-token
Support: At least basic
```

2. Ohne Mi Home App:

    Sie setzen die WLAN-Einstellungen des Luftreinigers zurück. Dann verbinden Sie Ihr Netzwerk mit dem WLAN des Luftreinigers und führen den folgenden Befehl aus:

    `miio discover`

    Sie sollten die gleiche Ausgabe wie oben erhalten und können nun die Verbindung zu Ihrem Netzwerk mit folgendem Befehl konfigurieren:

    `miio configure id-or-address --ssid ssid-of-network --passwd password-of-network`

    Nun ist der Luftreiniger an Ihr Netzwerk angeschlossen.

## Cloud-Verbindung
Um den Luftreiniger mit dem Cloud-Adapter zu steuern, fügen Sie einfach den Status "Manuallevel" zu Ihrem Cloud-Adapter hinzu. Danach können Sie zB f.e. die folgenden Befehle über Alexa:

* Alexa, schalte den Luftreiniger ein *,

* Alexa, setze den Luftreiniger auf 50% *,

* Alexa, schalte den Luftreiniger aus *

Wenn Sie im Cloud-Adapter "On Value" auf "Last active value" setzen, läuft das Gerät immer mit der neuesten aktiven Leistungsstufe.

## Kontrollstaaten
Zur Steuerung Ihres Luftreinigers können die folgenden Objekte geschrieben werden:

| Zustand | Beschreibung |
| :---           | :---        |
| Macht | Gerät ein- / ausschalten |
| auto | Aktivieren Sie den Auto-Modus des Geräts. |
| stumm | Aktivieren Sie den Silent-Modus des Geräts. |
| Handbuch | Aktivieren Sie den manuellen Modus des Geräts. |
| Handlevel | Steuern Sie die Leistung des manuellen Modus im Bereich von 0-100%. Dadurch wird das Gerät bei Bedarf auch ein- / ausgeschaltet

## Info Staaten
Die folgenden Informationen werden von Ihrem Luftreiniger gesammelt (Nur-Lesen-Status):

### Geräteinformationen
| Zustand | Beschreibung |
| :---        | :---        |
| Modus | Der tatsächliche Gerätemodus, nur gültig, wenn das Gerät eingeschaltet ist. |
| Temperatur | Die gemessene Temperatur in °C des Geräts. |
| Luftfeuchtigkeit | Die gemessene relative Luftfeuchtigkeit in% des Geräts. |
| pm25 | Die Luftverschmutzung in PM2.5. |

## Changelog
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

Copyright (c) 2018 Johannes Jaeger <johannesjaegeroffice@gmail.com>

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