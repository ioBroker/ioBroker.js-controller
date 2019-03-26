---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/misanorot/ioBroker.viessmann/edit/master//README.md
title: viessmann
hash: O1sazlL8W2C/vnr4VUGlE+5CarHjYEqJPn9Aue3S36w=
adapter: true
license: MIT
authors: misanorot <audi16v@gmx.de>
description: Communication with Viessmann controllers over Vcontrold
keywords: viessmann, heizung, vito, vitotronic
readme: https://github.com/misanorot/ioBroker.viessmann/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2017-10-16T19:37:29.283Z
version: 0.9.5
BADGE-安装数量: http://iobroker.live/badges/viessmann-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.viessmann.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.viessmann.svg
BADGE-测试: https://travis-ci.org/misanorot/ioBroker.viessmann.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.viessmann.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.viessmann/../../../en/adapterref/iobroker.viessmann/admin/viessmann.png)


＃ioBroker.viessmann =================
Mit diesem Adapter istesmöglich，Werte aus einer Viessmann Steuerung die mit demProgramm[Vcontrold](https://github.com/openv/vcontrold)kommuniziert，in Objekten zu speichern。
Ebenso ist das Setzen von Werten，死于围网的人Vito.xml konfigurierthatmöglich。

####（selber主持人）
Sollte Vcontrold auf dem gleichen Host wie auch IOBroker laufen，sot unter Linux eigentlich keineweitereVeränderunginderAdminkonfigurationnötigumdie .xml Dateien einzulesen。
*（Vorausgesetzt，sie liegt in dem Standard Pfad：/etc/vcontrold/vito.xml)*

####（Anderer主持人）
Ist Vcontrold auf einem anderen Host installiert，kann man per SSH Zugang die .xml Dateien einlesen。
HierfürdienötigenInformationenin dem SSH Tab eingeben。
*（Eine funktionierende SSH Verbindung wird vorausgesetzt。）*

Nach dem Neustart der Instanz，wird diese dann automatisch eingelesen，man kann nun in der Konfiguration der Instanz die Werte einstellen。

#### Die Struktur der vito.xml muss in der folgenden Form aufgebaugt sein：
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

Eine Sortierung der Befehle，ist durch klicken auf denTabellenkopfmöglich。

## Wichtig！：
 -  Bei jedem neuen einlesen der Vito Daten，werden ggf.死于“alten”Einstellungengelöscht。

Es ist empfehlenswert，bei relativ unwichtigen Abfragewerten，einmöglichstgrosses Abfrageintervallzuwählen。

* die benutzten Bilder stammen von www.viessmann.com。*

＃＃ 去做
 -  Anderung der Vito.xml ohne Verlust der Einstellungen
 - 开启/关闭实施单位

## Changelog
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