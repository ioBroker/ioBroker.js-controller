---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schwoerer-ventcube/README.md
title: ioBroker.schwoerer-ventcube
hash: h1L4E7+APHdLKCuaLMoZsUVbr5OMFSlueVozYaasX7Q=
---
![Logo](../../../en/adapterref/iobroker.schwoerer-ventcube/admin/schwoerer-ventcube.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.schwoerer-ventcube.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.schwoerer-ventcube.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Excodibur/iobroker.schwoerer-ventcube.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/schwoerer-ventcube-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/schwoerer-ventcube-stable.svg)
![Sprachklasse: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.schwoerer-ventcube.svg?logo=lgtm&logoWidth=18)
![Travis-CI](http://img.shields.io/travis/excodibur/ioBroker.schwoerer-ventcube/master.svg)
![NPM](https://nodei.co/npm/iobroker.schwoerer-ventcube.png?downloads=true)

# IoBroker.schwoerer-ventcube
![Github-Veröffentlichungsstatus](https://github.com/Excodibur/iobroker.schwoerer-ventcube/workflows/Build%2C%20Test%20and%20Release/badge.svg)

## Schwoerer-ventcube adapter für ioBroker
Adapter für Schwoererhaus Ventcube System. Weitere Informationen zu Ventcube Fresh finden Sie in [Hier](https://www.bauinfocenter.de/lueftung/lueftungsanlagen/).

** Haftungsausschluss **: Dieser Adapter wird von der Firma [Schwoererhaus KG](https://www.schwoererhaus.de/), die das Ventcube-System vertreibt, weder entwickelt noch offiziell unterstützt. Anweisungen sollten sorgfältig und auf eigenes Risiko befolgt werden.

### Voraussetzungen
Um auf die Netzwerkschnittstelle von Ventcube zugreifen zu können, müssen folgende (bekannte) Voraussetzungen erfüllt sein:

- Der Ventcube muss mit Ihrem internen Netzwerk verbunden sein (normalerweise über ein Netzwerkkabel).
- Die Modbus-TCP-Schnittstelle muss unterstützt werden (Systemsteuerung:> = V1.05, VentCube:> = V02.11) und muss häufig zuerst manuell aktiviert werden
    * Melden Sie sich in der Systemsteuerung im Abschnitt "Service" an (verwenden Sie das Standardkennwort aus den Dokumenten).
* Überprüfen Sie in den Grundeinstellungen, ob die Netzwerkverbindung hergestellt ist und "9. Netzwerkschnittstelle" und "10. Modbus TCP" beide aktiv sind.
* Wenn die letzten beiden Einstellungen nicht aktiv sind, aktivieren Sie sie und starten Sie den Ventcube neu (z. B. indem Sie die Stromversorgung vorübergehend unterbrechen).

### Konfigurationsparameter
Abhängig vom gebäudespezifischen Ventcube-Setup werden nicht alle Parameter verwendet, die über die Ventcube-Schnittstelle abgerufen oder geändert werden können. Jeder Parameter im Ordner "parameters" wird neben einem Eintrag im Ordner "lastUpdate" angezeigt, der den letzten Abrufzeitstempel für jeden Parameter angibt.

Alle in der unten angegebenen Spezifikation genannten Parameter wurden dem Adapter hinzugefügt und können über die Option ***Erweiterte Funktionen*** aufgerufen werden, die während der Adapterbereitstellung konfiguriert werden kann. Wenn Sie diese Option aktivieren, ruft der Adapter regelmäßig Daten für mehr als 100 Parameter ab, von denen die meisten möglicherweise nicht in normalen Haushalten verwendet werden. Der Testumfang war auf ***Grundfunktionen*** beschränkt (standardmäßig aktiviert).

Die folgenden Standardkonfigurationswerte müssen wahrscheinlich während der Adapterbereitstellung geändert werden, damit eine ordnungsgemäße Verbindung zu Ventcube hergestellt werden kann:

| Parameter | Standardwert | **Sollte sein** | Erklärung |
| `Server` | localhost | ***HERMES-LT*** oder ***lokale Netzwerk-IP von Ventcube*** | Der Standardwert wird für Tests verwendet und muss unbedingt geändert werden! |
| `Port` | 10502 | ***502*** | Der Standardwert wird für Tests verwendet und muss unbedingt geändert werden! |
| `Interval` | 30 | 30 | Nach wie vielen Sekunden sollten die Metriken vom Server | aktualisiert werden |
| `Request Timeout` | 5000 | 5000 | Wie viele Millisekunden warten, bis das Zeitlimit für Anfragen an Ventcube abgelaufen ist? |
| `Reconnection Attempts` | 10 | 10 | Wenn die Verbindung zu Ventcube unterbrochen wird, wie oft sollte eine erneute Verbindung versucht werden |
| `Delay between reconnection attempts` | 10000 | 10000 | Wie lange zwischen Wiederverbindungsversuchen gewartet werden soll (in Millisekunden) |
| `Advanced Functions` | & # 10003; | | Während Grundfunktionen ausreichen können, wenn Ventcube nur zur Belüftung verwendet wird, sollten erweiterte Funktionen aktiviert werden, wenn Heiz- / Kühlfunktionen oder Systemmetriken (Fehlercodes, Lüfterdetails) benötigt werden. |
| `Erweiterte Funktionen` | & # 10003; | | Während Grundfunktionen ausreichen können, wenn Ventcube nur zur Belüftung verwendet wird, sollten erweiterte Funktionen aktiviert werden, wenn Heiz- / Kühlfunktionen oder Systemmetriken (Fehlercodes, Lüfterdetails) benötigt werden. |

#### Interessante Funktionen (zunächst)
- ***Betriebsart*** , veränderbar
- ***Stoßlüftung*** (30 Minuten Luftstoß der Stufe 4), austauschbar
- ***Ist Temp Raum 1*** (Temperatur im Haus)
- ***T10 Außentemperatur***

### Referenzsystem
Der ioBroker-Adapter wurde erfolgreich getestet mit:

| Systemsteuerung | Ventcube | Modbus-Spezifikation |
|---------------|----------|-----------------------------------|
| V01.10 | V02.26 | Parameterliste_Modbus_TCP_03.2020 |

## License
MIT License

Copyright (c) 2020 Excodibur <excodibur@posteo.de>

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