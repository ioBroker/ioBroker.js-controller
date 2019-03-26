![Logo](admin/viessmann.png)
# ioBroker.viessmann
=================

![Number of Installations](http://iobroker.live/badges/viessmann-installed.svg) ![Number of Installations](http://iobroker.live/badges/viessmann-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.viessmann.svg)](https://www.npmjs.com/package/iobroker.viessmann)
[![Downloads](https://img.shields.io/npm/dm/iobroker.viessmann.svg)](https://www.npmjs.com/package/iobroker.viessmann)
[![Tests](https://travis-ci.org/misanorot/ioBroker.viessmann.svg?branch=master)](https://travis-ci.org/misanorot/ioBroker.viessmann)

[![NPM](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)](https://nodei.co/npm/iobroker.viessmann/)

Mit diesem Adapter ist es möglich, Werte aus einer Viessmann Steuerung
die mit dem Programm [Vcontrold](https://github.com/openv/vcontrold) kommuniziert,
in Objekten zu speichern. 
Ebenso ist das Setzen von Werten, die man in seiner Vito.xml konfiguriert hat möglich.

#### (selber Host) 
Sollte Vcontrold auf dem gleichen Host wie auch IOBroker laufen, 
so ist unter Linux eigentlich keine weitere Veränderung in der Adminkonfiguration nötig um die .xml Dateien einzulesen.
*(Vorausgesetzt, sie liegt in dem Standard Pfad: /etc/vcontrold/vito.xml)*

#### (Anderer Host)
Ist Vcontrold auf einem anderen Host installiert, kann man per SSH Zugang die .xml Dateien einlesen.
Hierfür die nötigen Informationen in dem SSH Tab eingeben.
*(Eine funktionierende SSH Verbindung wird vorausgesetzt.)*

Nach dem Neustart der Instanz, wird diese dann automatisch eingelesen, 
man kann nun in der Konfiguration der Instanz die Werte einstellen. 



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
		
Eine Sortierung der Befehle, ist durch klicken auf den Tabellenkopf möglich.


## Wichtig!: 	
	- Bei jedem neuen einlesen der Vito Daten, werden ggf. die "alten" Einstellungen gelöscht.


Es ist empfehlenswert, bei relativ unwichtigen Abfragewerten, ein möglichst grosses Abfrageintervall zu wählen.
 

*die benutzten Bilder stammen von www.viessmann.com.*

## ToDo
	- Anderung der Vito.xml ohne Verlust der Einstellungen
	- Implementierung Unit on/off 


### Changelog
#### Versions from 0.5.0. needs node > 4.x and admin V3

#### 0.9.5 (13.01.2018)
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

### License

The MIT License (MIT)

Copyright (c) 2017-2019 misanorot <audi16v@gmx.de>

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
