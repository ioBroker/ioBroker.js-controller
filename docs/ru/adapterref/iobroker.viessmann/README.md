---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.viessmann/README.md
title: ioBroker.viessmann
hash: GeOy2jgizgzXYnFjrbu2xhUBaac8mjOqayiJ4iWM4KI=
---
![Логотип](../../../en/adapterref/iobroker.viessmann/admin/viessmann.png)

![Количество установок](http://iobroker.live/badges/viessmann-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.viessmann.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.viessmann.svg)
![Трэвис-Си](http://img.shields.io/travis/misanorot/ioBroker.viessmann/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/misanorot/ioBroker.viessmann?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)

# IoBroker.viessmann
=================

** Действия Github **: ![Действия GitHub](https://github.com/misanorot/ioBroker.viessmann/workflows/Test%20and%20Release/badge.svg)

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Английское описание](https://github.com/misanorot/ioBroker.viessmann/blob/master/lib/Readme_en.md)**

Mit diesem Adapter ist es möglich, Werte aus einer Viessmann Steuerung die mit dem Programm [Vcontrold](https://github.com/openv/vcontrold) kommuniziert, в Objekten zu speichern.
Ebenso ist das Setzen von Werten, die man in seiner Vito.xml konfiguriert hat möglich.

#### (Selber Host)
Управление Vcontrold на хосте с установленным IOBroker laufen, таким образом, Linux имеет собственное значение Veränderung в Adminkonfiguration, но не в формате .xml Dateien einzulesen.
* (Vorausgesetzt, находится в стандартной документации: /etc/vcontrold/vito.xml)*

#### (хост Anderer)
Ist Vcontrold auf einem anderen Host installiert, cann man per SSH Zugang die .xml Dateien einlesen.
Hierfür die nötigen Informationen in dem SSH Tab eingeben.
* (Eine funktionierende SSH Verbindung wird vorausgesetzt.) *

Nach dem Neustart der Instanz, wird diese dann automatisch eingelesen, man kann nun in der Konfiguration der Instanz die Werte einstellen.

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

## Wichtig !:
- Bei jedem neuen einlesen der Vito Daten, werden ggf. die "alten" Einstellungen gelöscht.

Es ist empfehlenswert, bei relativ unwichtigen Abfragewerten, ein möglichst grosses Abfrageintervall zu wählen.
Es ist ebenso möglich, einen Wert ausserhalb des Abfragezyklus abzufragen. Hierzu muss der Datenpunkt *force_polling* mit dem gewünschten *get* Wert beschrieben werden.

*die benutzten Bilder stammen von www.viessmann.com.*

## Делать
- Anderung der Vito.xml ohne Verlust der Einstellungen
- Включение / выключение блока внедрения

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