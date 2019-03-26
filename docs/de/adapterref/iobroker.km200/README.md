---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.km200/README.md
title: ioBroker.km200
hash: tsPSmDY9afXxyXUew2/p/U3+Q6HOK8EeGGCY7l1Byj4=
---
# IoBroker.km200

![NPM-Version](http://img.shields.io/npm/v/iobroker.km200.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.km200.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.km200/master.svg)
![NPM](https://nodei.co/npm/iobroker.km200.png?downloads=true)

## Für Buderus KM50 / KM100 / KM200 / KM300 und Junkers / Bosch MB LANi
![Logo](../../../en/adapterref/iobroker.km200/admin/km200.png)

[Deutsches Handbuch](README_DE.md)

Der Adapter unterstützt das folgende Heizsystem:

* Buderus mit den [Netzwerkadaptern] (https://www.buderus.de/de/produkte/catalogue/alle-produkte/7719_gateway-logamatic-web-km200-km100-km50) KM50, KM100, KM200 und KM300
* Junkers mit dem [Netzwerkadapter] (https://www.bosch-smarthome.com/de/mblani) MB LANi
* Bosch mit dem [Netzwerkadapter] (https://www.bosch-smarthome.com/de/mblani) MB LANi

Die Heizungsanlage kann über die Buderus-Website ([https://www.buderus-connect.de]) oder über die App „EasyControl“ von Ihrem Mobiltelefon aus gesteuert werden. Die App- und Buderus-Website arbeitet auch mit Junkers- und Bosch-Heizsystemen zusammen.

Dies ist nun in beide Richtungen gelungen und der Adapter ist bereits voll nutzbar.

Dazu muss die App zunächst auf einem Mobiltelefon installiert und ein privates Passwort festgelegt werden.
Die App fragt nach dem Gerätekennwort und dem Anmeldenamen des Geräts.

Der Adapter benötigt weiterhin die IP-Adresse (oder den Netzwerknamen, z. B. 'BuderusKM200.fritz.box') und die Port-Adresse (Port 80 am Gerät, wenn Sie sie jedoch über einen Router geändert haben ...).

Wenn Sie ein "!" Am Ende der Adresse arbeitet der Adapter im Debug-Modus und liefert viele Informationen!

Da der Adapter die Daten vom System abfragen muss, habe ich ein Aktualisierungsintervall definiert. Dies ist auf mindestens 5 Minuten festgelegt, da für jedes Update eine separate Abfrage erforderlich ist.

Mein System (2 Heizkreise und ein Warmwasserkreislauf) bietet mehr als 180 Datenpunkte, an denen ich die meisten nicht verwenden kann und einige davon doppelt.

Deshalb habe ich eine Black / Push-Liste eingeführt, um bestimmte Daten auszublenden oder anzuzeigen.
Diese Liste besteht aus Zeichenfolgen, die RegExp ähneln (in die sie vom Adapter konvertiert werden), und die Dienste in der Heizung werden anschließend mit diesen gefiltert.

Die Syntax lautet, dass `+` ganz am Anfang bedeutet, dass dieses Feld nicht skizziert werden sollte, selbst wenn eine andere Regel es blockieren würde.
Ein `-` ist wie nichts und verhindert, dass der mathematische Zustand gesperrt wird.
Jede Übereinstimmung wird durch `,` getrennt und kann für den Anfang `/` oder `^`, für alles passende `*` und am Ende das Ende enthalten.
Die Zeichenfolgen sind case sensitive !!! Wenn Sie wissen möchten, welche Zustände gefunden werden, schalten Sie den Debug-Modus ein und entfernen Sie alle Blockierungen. Dann werden Sie alle angegebenen Werte finden und können ein nicht benötigtes Datum mit einer Sperrliste blockieren.
Beispiele: Mit `+*temp*` können Sie alles einblenden, was 'temp' enthält, und mit `_HourlyDie Syntax lautet, dass `+` ganz am Anfang bedeutet, dass dieses Feld nicht skizziert werden sollte, selbst wenn eine andere Regel es blockieren würde.
Ein `-` ist wie nichts und verhindert, dass der mathematische Zustand gesperrt wird.
Jede Übereinstimmung wird durch `,` getrennt und kann für den Anfang `/` oder `^`, für alles passende `*` und am Ende das Ende enthalten.
Die Zeichenfolgen sind case sensitive !!! Wenn Sie wissen möchten, welche Zustände gefunden werden, schalten Sie den Debug-Modus ein und entfernen Sie alle Blockierungen. Dann werden Sie alle angegebenen Werte finden und können ein nicht benötigtes Datum mit einer Sperrliste blockieren.
Beispiele: Mit `+*temp*` können Sie alles einblenden, was 'temp' enthält, und mit  können Sie alles blockieren, was '_hourly' am Ende hat, beide zusammen werden alle _hourly am Ende blockieren, die nicht haben Temp in ihrem Namen.

Meine Liste sieht aus wie `/gateway*, /recordings*,*SwitchPrograms*,/HeatSource*, *HolidayModes*` und verbirgt etwa 90 von ~ 180 Aufzeichnungen meiner Anlage.

Es gibt jetzt zwei weitere Zeitpläne, den schnellen (für Zustände, die schneller als alle 30 Minuten abgefragt werden) und langsamer für Zustände, die nach Stunden oder Mehrstundenzyklen abgefragt werden.
Auf diese Weise können Sie einige Informationen wie Temperaturen in Zyklen von 1 bis 5 Minuten und andere Elemente in normalen Zyklen von 20 Minuten verfolgen. Diejenigen, die sich normalerweise innerhalb einer Stunde nicht ändern (wie _Daily $ oder _Monthly $ und Severyl andere allgemeine Daten), müssen nicht einmal alle 30 Minuten gelesen werden, da sie sich nicht ändern.
Diese Strategie hilft, schnellere Messwerte für wichtige Daten zu erhalten und langsamere Messwerte für nicht so wichtige.

Die aufzuzeichnenden Daten sind (kleine) Historiendaten innerhalb des Heizungssystems. Es stehen 3 verschiedene zur Verfügung: _Stündlich, _Täglich und Monatlich.
Stündlich deckt die letzten 48 Stunden normalerweise ab. _Täglich die letzten 2 Monate und monatlich nicht mehr als ein Jahr, alles ab dem aktuellen Zeitpunkt des Auslesens. Einige Datenpunkte zeigen weniger Datenpunkte.
Sie müssen verstehen, dass der Adapter die Daten von 3 einzelnen Anrufen für jeden aufgezeichneten Datenpunkt sammelt!

`switchPrograms` kann jetzt auch geschrieben und geschrieben werden, es handelt sich um einen JSON-String, der ein Array von Wochentagen widerspiegelt. Bitte ändern Sie nicht das Format, sondern nur die Zahlen beim Hochladen. Es scheint, dass die Anzahl der Minuten nur in Schritten von 15 Minuten eingestellt werden kann!

Seit V 1.1.2 können die Klammern und Kommas weggelassen und die gesperrten / gedrückten Werte nur mit Komma geschrieben werden!

Das System arbeitet mit Diensten, die wie eine Verzeichnisstruktur strukturiert sind, und diese wird im Adapter repliziert.

### Wichtig, wenn km200 von Version 1.1 aktualisiert wird. *
Wenn Sie den 64-stelligen Zugangsschlüssel eingegeben haben, benötigen Sie das Kennwort nicht, es sollte jedoch nicht leer bleiben. Schreiben Sie einfach etwas!

## Wichtig
* Adapter erfordert Knoten> = v6.1. *

## Machen
* Zusätzliche Sprachunterstützung und Textübersetzung

## Changelog

### 1.9.9

* Beta for v2.0.0
* Implemented recordings for hourly, daily and monthly data
* Changed readout for 'mins' units to enable these fields for read/write
* Implemented 2 additional time schedule where you can define fast cycle (1-30 minutes), normal with 30-60 minutes and slow with 1-24 hours. You define the lists whjich go to fast or slow in a similar way than the blocklist.
* Blocklist syntax changed sligly. `/` or `^` first is for from beginning, `*` can now be everywhere and `$` can be the end
* `switchPrograms` are supported now for read and write!  

### 1.2.4

* Beta for next version, recordings supported

### 1.2.3 
* Implemented a correction to show also switchPrograms

### 1.2.2
* Adapter works also only with accesskey iin old 64 digit hex format without private passwort.

### 1.2.1 
* Adapter supports now compact mopde
* Adapter uses other module and removes need for mcrypt which makes it working on all platforms
* Adapter can now have debug mode set via '!' at end of address
* Adapter needs node >=v6


### 1.2.0
* Integrating Schupu's changes and also make the adapter ready for compact mode
* Update of adapter should continue to work with old settings

### 1.1.7
* (Schmupu) Supports Admin3
* (Schmupu) Only device password and own password needed. You do not have to get the access code anymore.

### 1.1.6
Adapter communication and retries more often to catch more errors.
* Writes are also retried
Added blocklist text in config screen

### 1.1.2
* Adapter handles better communication and retries if he got an error.
* you can set debug-mode by adding 'debug!' in front of host.
* Host port is not required and can be added to hostname with: xxx at end.
* Simpler blocklist handling, which does not ask for device which services are blocked

### 0.4.3
* Renamed repository to ioBroker.km200

### 0.4.3
Cleaning of objects / states for current adapters instance which are not part of scanned services anymore.

### 0.4.2
* Some small bug fixes and added some debug logs. Removed so dependency of 'request' and 'async' modules.

### 0.4.1
  Have only 'request' and 'async' with --save now also registered in the package.json ... Remember: Nuícht --save forget :(!

### 0.4.0
  Strings with allowedValues ​​are now converted to ioBroker states in both directions (read & write)

### 0.3.0
  Setting variables with numbers or strings now works.
  Thus, e.g. Target temperatures are changed.
  TODO: Enums and set tables

### 0.2.0
  Adapter now works with blacklist and in read-only mode.
  TODO: Implement setting values ​​in the heating system
  TODO: Implement variables with ENUMS (value lists)

### 0.1.0
  First test

## License
The MIT License (MIT)

Copyright (c) 2016 Frank Joke 

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