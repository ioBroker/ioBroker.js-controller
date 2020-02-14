---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.web-speedy/README.md
title: ioBroker.web-speedy
hash: JVh7sCm5G2DiV8lPopZ2orRBflHlWpQnhjSWN1NZKKc=
---
![Logo](../../../en/adapterref/iobroker.web-speedy/admin/web-speedy.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.web-speedy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.web-speedy.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/web-speedy-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/web-speedy-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.web-speedy.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.web-speedy/badge.svg)
![NPM](https://nodei.co/npm/iobroker.web-speedy.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.web-speedy/master.svg)

# IoBroker.web-speedy
## Web-Speedy-Adapter für ioBroker
Mit Web-Speedy können Sie Ihre Internetverbindung regelmäßig testen und Ergebnisse in ioBroker speichern!

### Verwendung dieses Adapters
Beim ersten Start werden die besten Server in der Nähe basierend auf den Ping-Ergebnissen abgerufen und der erste Test ausgeführt.

Web-Speedy ist so aufgebaut, dass die gesamte Ausführung automatisch erfolgt, sodass Sie keine Konfigurationsseite haben.
Sie können jedoch noch einige Dinge beeinflussen (siehe Datenpunkte):

- [test_best] Führen Sie den Test jetzt auf dem besten Server basierend auf den letzten Ping-Ergebnissen aus
- [test_specific] Verwenden Sie die Dropdown-Liste, um einen der fünf besten Server auszuwählen, die im vorherigen Scan gefunden wurden
- [test_duration] Die maximale Länge (in Sekunden) eines einzelnen Testlaufs (Upload oder Download)
- [test_id_always] Führen Sie den Test IMMER auf einer bestimmten Server-ID aus. [Eine Server-ID finden Sie hier.]
- [test_id_once] Führen Sie den Test EINMAL auf einer bestimmten Server-ID aus. [Eine Server-ID finden Sie hier.]
- [test_auto_intervall] Intervallzeit für die automatisierte Testausführung (Standard = 60, wenn auf 0 gesetzt, wird kein automatisierter Test ausgeführt!)

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für DutchmanNL, keine Beziehung zum ioBroker-Projekt!) [![Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.1.6 Implemented specific scan by url
* (DutchmanNL) Implemented specific scan by url

### 0.1.5 New settings possibilities & Code improvements
* (DutchmanNL) Implemented states for progress in %
* (DutchmanNL) No automated scan if test_auto_intervall set zo 0
* (DutchmanNL) Ensure propper running state reset at adapter start
* (DutchmanNL) Improve code performance  and avoid multiple running instances
* (DutchmanNL) Implemented adjustable duration time for scan by(increase if you see strange test results, like to 20 secons)
* (DutchmanNL) Implemented state to run test ONCE by id or URL at specific server [Please find a server id here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)
* (DutchmanNL) Implemented state to run test ALWAYS by id or URL at specific server [Please find a server id here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)

### 0.1.1 MegaByte to Megabit calculation and current test speeds implemented
* (DutchmanNL) Fix wrong status "test runnig"
* (DutchmanNL) Implement byte to bit calculation for test - results
* (DutchmanNL) implement current speeds in kb/s during download

### 0.1.0 Beta release for public testing
* (DutchmanNL) Beta release for public testing

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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