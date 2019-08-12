---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.viessmann/README.md
title: ioBroker.viessmann
hash: j6m0qzV1f1E3JpYwTGgqLGC8xzydsmg606nEXmekPEg=
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

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Englische Beschreibung](https://github.com/misanorot/ioBroker.viessmann/blob/master/lib/Readme_en.md)**

Mit diesem Adapter ist es möglich, Werte aus einer Viessmann-Steuerung mit dem Programm [Vcontrold](https://github.com/openv/vcontrold) kommuniziert, in Objekten zu speichern.
Ebenso ist das Setzen von Werten, das man in seiner Vito.xml konfiguriert hat möglich.

#### (selber Host)
Sollte Vcontrold auf dem gleichen Host wie auch IOBroker laufen, so ist unter Linux eigentlich keine weitere Veränderung in der Adminkonfiguration nötig um die .xml Dateien einzulesen.
* (Vorausgesetzt, sie liegt in dem Standardpfad: /etc/vcontrold/vito.xml)*

#### (Anderer Host)
Ist Vcontrold auf einem anderen Host installiert, kann man per SSH Zugang die .xml Dateien einlesen.
Hierfür die notwendigen Informationen in das SSH Tab eingeben.
* (Eine funktionierende SSH Verbindung wird vorausgesetzt.) *

Nach dem Neustart der Instanz, wird dieser Vorgang automatisch gestartet, man kann nun in der Konfiguration der Instanz die Werte einstellen.

#### Die Struktur der vito.xml muss in der folgenden Form aufgebaugt werden:
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

A sortierung der befehle, is through click on the tables head possible.

## Wichtig !:
- Bei jedem neuen einlesen der Vito Daten, werden ggf. die "alten" Einstellungen gelöscht.

Es ist empfehlenswert, bei relativ unwichtigen Abfragewerten, ein möglichst grosses Abfrageintervall zu wählen.

*die benutzten Bilder stammen von www.viessmann.com.*

## Machen
- Anderung der Vito.xml ohne Verlust der Einstellungen
- Implementierungseinheit ein / aus

**[ÄNDERUNGSPROTOKOLL](https://github.com/misanorot/ioBroker.viessmann/blob/master/changelog.md)**

## License

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