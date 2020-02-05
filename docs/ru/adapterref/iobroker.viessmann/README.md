---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.viessmann/README.md
title: ioBroker.viessmann
hash: py7WH/sT7A9CXgu/xcGjnCdIpEIKKXYdeErNrQ8IoFo=
---
![логотип](../../../en/adapterref/iobroker.viessmann/admin/viessmann.png)

![Количество установок](http://iobroker.live/badges/viessmann-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.viessmann.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.viessmann.svg)
![Трэвис-CI](http://img.shields.io/travis/misanorot/ioBroker.viessmann/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/misanorot/ioBroker.viessmann?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)

# IoBroker.viessmann
=================

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Английское описание](https://github.com/misanorot/ioBroker.viessmann/blob/master/lib/Readme_en.md)**

Mit Diesem Adapter ist es möglich, Werte aus einer Viessmann Steuerung die mit dem Programm, [Vcontrold](https://github.com/openv/vcontrold) kommuniziert, в Objekten zu speichern.
Ebenso ist das Setzen von Werten, умерший в сейнере Vito.xml, изображающий шляпу меглиха.

#### (хост Host)
Sollte Vcontrold auf dem gleichen Принимающая сторона с IOBroker laufen, так и под Linux.
* (Vorausgesetzt, sie liegt in dem Standard Pfad: /etc/vcontrold/vito.xml)*

#### (Anderer Host)
Ist Vcontrold auf einem andderen Принимающая компания, работающая по SSH Zugang die .xml Dateien einlesen.
Hierfür die nötigen Informationen in dem SSH Tab eingeben.
* (Eine funktionierende SSH Verbindung wird vorausgesetzt.) *

Nach dem Neustart der Instanz, странный человек, известный как человек, любящий человека в своей жизни.

#### Die Struktur der vito.xml muss in der folgenden Форма aufgebaugt sein:
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

Eine Sortierung der Befehle, является самым популярным отелем.

## Wichtig !:
- Бей Джедем Нойен Эйнлезен дер Вито Датен, Верден Г.Г.Ф. умереть "alten" Einstellungen gelöscht.

Es ist empfehlenswert, bei reltiv unwichtigen Abfragewerten, ein möglichst grosses Abfrageintervall zu wählen.
Es ist ebenso möglich, einen Wert ausserhalb des Abfragezyklus abzufragen. Hierzu muss der Datenpunkt *force_polling* mit dem gewünschten *get* Wert beschrieben werden.

*die benutzten Bilder Stammen von www.viessmann.com.*

## Сделать
- Anderung der Vito.xml ohne Verlust der Einstellungen
- Внедрение блока вкл / выкл

**[CHANGELOG](https://github.com/misanorot/ioBroker.viessmann/blob/master/changelog.md)**

## License

The MIT License (MIT)

Copyright (c) 2017-2020 misanorot <audi16v@gmx.de>

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