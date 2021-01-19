---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.viessmann/README.md
title: ioBroker.viessmann
hash: GeOy2jgizgzXYnFjrbu2xhUBaac8mjOqayiJ4iWM4KI=
---
![Logo](../../../en/adapterref/iobroker.viessmann/admin/viessmann.png)

![Anzahl der Installationen](http://iobroker.live/badges/viessmann-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.viessmann.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.viessmann.svg)
![Travis-CI](http://img.shields.io/travis/misanorot/ioBroker.viessmann/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/misanorot/ioBroker.viessmann?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)

# IoBroker.viessmann
=================

** Github-Aktionen **: ![GitHub-Aktionen](https://github.com/misanorot/ioBroker.viessmann/workflows/Test%20and%20Release/badge.svg)

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Englische Beschreibung](https://github.com/misanorot/ioBroker.viessmann/blob/master/lib/Readme_en.md)**

Mit diesem Adapter ist es möglich, Werte aus einer Viessmann-Steuerung die mit dem Programm
Dies ist das Setzen von Werten, der Mann in seinem Vito.xml.

#### (Selber Host)
Viele Vcontrold auf dem gleichen Host wie auch IOBroker laufen, so ist es unter Linux eigentlich keine weitere weitere in der Adminkonfiguration gehört um die .xml gehört gehörtesen.
* (Vorausgesetzt, sie liegt im Standard Pfad: /etc/vcontrold/vito.xml)*

#### (Anderer Host)
Ist Vcontrold auf einem anderen Host installiert, kann man per SSH Zugang die .xml entfernen einlesen.
Hierfür die nötigen Informationen in der SSH Tab.
* (Eine funktionierende SSH Verbindung wird erledigt.) *

Nach dem Neustart der Instanz, wird diese dann soziale Rechteesen, Mann kann Nonne in der Konfiguration der Instanz die Werte werden.

#### Die Struktur der vito.xml muss in der folgenden Form aufgebaugt sein:
		```<vito>
			<devices>
				<device ID="2094" name="V200KW1" protocol="KW2"/>
			</devices>
			<commands>
				<command name='getOelverbrauch' protocmd='getaddr' >
					<addr>7574</addr>
					<len>4</len>
					<description></description>
				</command>
				<command name='getTempAbgas' protocmd='getaddr'>
					<addr>0808</addr>
					<len>2</len>
					<unit>UT</unit>
					<error>05 05</error>
					<description>Abgastemeratur in Grad C</description>
				</command>
			</commands>
		</vito>```

Eine Sortierung der Befehle, ist durch Klicken auf den Tabellenkopf möglich.

## Wicht!!
- Bei jedem neuen einlesen der Vito Daten, werden ggf. die "alten" Einstellungen eingestellt.

Es ist empfehlenswert, bei relativ unwichtigen Abfragewerten.
Es ist möglich möglich, einen Wert ausserhalb des Abfragezyklus abzufragen. Hierzu muss der Datenpunkt *force_polling* mit dem verloren *get* Wert werden werden.

*die benlichen Bilder Bilder von www.viessmann.com.*

## Machen
- Anderung der Vito.xml ohne Verlust der Einstellungen
- Ein-Einheit ein / aus

## Changelog

	### 1.3.2 (17.09.2020)
	* (misanorot) fixed little issues

	### 1.2.5 (26.07.2020)
	* (misanorot) new config style

	#### 1.2.4 (01.02.2020)
	* (misanorot) add trigger state and two second polling

	#### 1.2.0 (10.08.2019)
	* (misanorot) added reconnect time

	#### 1.1.2 (06.08.2019)
	* (misanorot) fixed issue with reconnect

	#### 1.0.0 (16.06.2019)
	* (misanorot) fixes little issues in compact modus

	#### 0.9.5 (13.01.2019)
	* (misanorot) Compact modus added

	#### 0.9.2 (13.01.2018)
	* (misanorot) Fixed little issue with new xml read

	#### 0.9.0 (11.12.2018)
	* (misanorot) create types from vcontrold.xml to states (require a new config)
	* (misanorot) add sort tables

	#### 0.8.0 (11.11.2018)
	* (misanorot) create units from vcontrold.xml (require a new config)

	#### 0.7.0 (01.11.2018)
	* (Bjoern3003) added lastPoll state

	#### 0.6.0 (24.09.2018)
	* (misanorot) os:linux--> read vito.xml from /etc/vcontrold from the same host
	* (misanorot) use a ssh connection to read the vito.xml from a other server

	#### 0.5.0 (13.07.2018)
	* (misanorot) option to create only states if you use
	* (misanorot) option to restart the connection after to many errors

	#### 0.4.0 (28.01.2018)
	* (misanorot) parse vito.xml file

	#### 0.3.0 (22.01.2018)
	* (misanorot) ready for admin V3

	#### 0.2.6
	* (misanorot) add option to use format values

	#### 0.0.1
	* (misanorot) initial release

## License

The MIT License (MIT)

Copyright (c) 2017-2021 misanorot <audi16v@gmx.de>

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