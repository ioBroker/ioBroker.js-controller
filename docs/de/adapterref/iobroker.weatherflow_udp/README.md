---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weatherflow_udp/README.md
title: Wetterfluss UDP
hash: yxgr2MEMcXFzQZVMqmC5+baOM6kYCy8UA0/+Jotrft4=
---
![Logo](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.weatherflow_udp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weatherflow_udp.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/weatherflow_udp-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/woessmich/iobroker.weatherflow_udp.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![NPM](https://nodei.co/npm/iobroker.weatherflow_udp.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/woessmich/ioBroker.weatherflow_udp/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/woessmich/ioBroker.weatherflow_udp?branch=master&svg=true)

# Wetterfluss UDP
** Tests: **

## Weatherflow_udp Adapter für ioBroker
Weatherflow UDP-Empfänger Adapter zum Empfangen und Analysieren von [UDP-Nachrichten] (https://weatherflow.github.io/Tempest/api/udp/v143/) von [Weatherflow] (www.weatherflow.com) intelligenten Wetterstationen wie [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/).
Der Adapter sollte auch ältere Stationen wie "Air" und "Sky" analysieren können (dies ist jedoch nicht getestet).
Der Standardport, den der Adpater abhört, ist 50222, kann jedoch im Setup geändert werden.

## Die Einstellungen
Der Adapter bietet einen Mindestsatz an Setup-Optionen.
Der Überwachungsport kann geändert werden, was meines Wissens nicht erforderlich sein sollte, da der Port, den der Weatherstation-Hub sendet, nicht geändert werden kann.

Die Stationshöhe in Metern über dem Meeresspiegel wird verwendet, um den reduzierten Druck aus dem lokalen Druck zu berechnen, der von der Station bereitgestellt wird. Verwenden Sie einfach die gleiche Höhe wie in der App eingegeben. Abhängig von der verwendeten Formel können sich im Vergleich zum reduzierten Druck in der App kleine Unterschiede ergeben. Der Adapter verwendet die Formel, die der deutsche Wetterdienst DWD verwendet (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [hier](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)).

Wenn das Kontrollkästchen Debug aktiviert ist, erstellt der Adapter eine Menge Ausgabe in der Protokolldatei. Sollte nur zum Debuggen verwendet werden.

## Daten und Zustände nach Wetterfluss
Der Adapter stellt alle Parameter bereit, die über das UDP-Protokoll gesendet werden. Die Status befinden sich in einem Baum unter der Hub- und Stations-ID. <b>Achtung</b> : Wenn Sie Daten zur Langzeitarchivierung an Datenbanken senden, sollten Aliase für die Status verwendet werden, um die Serie nicht zu verlieren, wenn eine Einheit ausgetauscht werden muss. Es gibt einige Unterschiede zu dem, was die Tempest-App bietet, da die App die bereits verarbeiteten Daten von Wetterflussservern zurückerhält. Bei ausreichender Batterieleistung, &quot;Gerätestatus&quot; und &quot;obs_st&quot; werden die Daten aktualisiert und jede Minute aktualisiert. &quot;Rapid_wind&quot; wird alle 3 Sekunden aktualisiert. &quot;evt_precip&quot; und &quot;evt_strike&quot; werden nur aktualisiert (und erstellt), wenn sie auftreten. &quot;hub_status&quot; wird alle 10 Sekunden aktualisiert. Von der Station und dem Adapter berechnete Werte (siehe unten) werden nur erstellt, wenn sie empfangen werden oder zur Berechnung fällig sind. Dies bedeutet, dass es bis zu 24 Stunden dauern kann, bis alles angezeigt wird, mit Ausnahme von Regenbeginn und Blitzeinschlägen, deren Auftreten Tage, Wochen, Monate dauern kann ;-)

## Adapter berechnete Zustände
Zusätzlich zu den vom System bereitgestellten Daten berechnet der Adapter einige zusätzliche Daten, für die alle das Adapter "Adapter berechnet" haben:

- Winddurchschnitt, Windböe und Flaute in [beaufort] (https://en.wikipedia.org/wiki/Beaufort_scale)
- Taupunkt berechnet aus Temperatur und Luftfeuchtigkeit
- fühlt sich an wie eine Temperatur, die aus Temperatur, Luftfeuchtigkeit und durchschnittlichem Wind berechnet wird. Je nach Temperatur und Wind oder Temperatur oder Luftfeuchtigkeit wird entweder die Lufttemperatur angezeigt oder [Windchill] (https://en.wikipedia.org/wiki/Wind_chill) oder [Hitzeindex] (https://en.wikipedia). org / wiki / Heat_index) wird berechnet.
- Niederschlagsmenge und -dauer sowie [Sonnenscheindauer] (https://en.wikipedia.org/wiki/Sunshine_duration) (> = 120 W / m2) werden für die aktuelle und vergangene Stunde sowie heute und gestern angegeben. Die Verwendung der vorherigen und gestrigen Stunde ermöglicht das einfache Speichern von Daten in einer Datenbank bei Änderungen der Werte.
- Die Niederschlagsintensität wird gemäß dieser Skala angegeben: keine (0): 0 mm / Stunde; sehr leicht (1):> 0, <0,25 mm / Stunde; Licht (2): ≥ 0,25, <1,0 mm / Stunde; mäßig (3): ≥ 1,0, <4,0 mm / Stunde; schwer (4): ≥ 4,0, <16,0 mm / Stunde; sehr schwer (5): ≥ 16,0, <50 mm / Stunde; extrem (6):> 50,0 mm / Stunde
- Regen wird auch in bash_evt als boolescher Zustand (wahr, falsch) angezeigt. Es wird auf true gesetzt, wenn ein Niederschlagsereignis empfangen wird und der Niederschlagswert> 0 ist. Nach 3 Minuten wird es zurückgesetzt, wenn es nicht mehr regnet
- Sonnenschein wird auch als boolescher Zustand true angezeigt, wenn> = 120 W / m2 und false, wenn weniger
- Windrichtung in Kardinalbuchstaben (NSWE) berechnet aus der Windrichtung in Grad.

Darüber hinaus bietet der Adapter eine Auswahl nützlicher Minimal- und Maximalwerte von Parametern für heute und gestern.

- sensor_status als Text, um leicht zu erkennen, welche Sensoren in diesem Fall ausgefallen sind.
- Aus sensor_status-Bits wird der Power-Modus extrahiert (experimentell)

## Blitzentfernung
Das Protokoll sendet eine Blitzentfernung von 0, wenn kein Blitz erkannt wurde. Die Werte von 0 werden auf 999 geändert, um den Eindruck zu vermeiden, dass Blitzeinschläge direkt über Ihnen liegen.

## Changelog
### 0.0.11
* (womi) Corrected more programming issues from review
### 0.0.10
* (womi) Corrected programming issues from review
### 0.0.9
* (womi) Assigned roles to states; fixes for status 'latest'
### 0.0.8
* (womi) Corrected rain accumulation/duration; added precipitation intensity; added experimental power mode; added raining and sunshine as boolean states
### 0.0.7
* (womi) Updated parts of adapter calculated data structure, added last message per message type instead of one for all; corrected calculation of feels like temperature
### 0.0.6
* (womi) initial release after testing with real tempest

## License
MIT License

Copyright (c) 2020 womi <woessmich@gmail.com>

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