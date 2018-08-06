![Logo](media/radar.png)

[![NPM version](http://img.shields.io/npm/v/iobroker.radar.svg)](https://www.npmjs.com/package/iobroker.radar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.radar.svg)](https://www.npmjs.com/package/iobroker.radar)
**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.radar/master.svg)](https://travis-ci.org/frankjoke/ioBroker.radar)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/frankjoke/ioBroker.radar?branch=master&svg=true)](https://ci.appveyor.com/project/frankjoke/ioBroker-radar/)


[![NPM](https://nodei.co/npm/iobroker.radar.png?downloads=true)](https://nodei.co/npm/iobroker.radar/)

==============

# ioBroker radar Adapter für Netzwerk und Bluetooth-Geräte, HP Drucker und ECB-Kurse
Mit diesem Adapter kann man testen ob Geräte via Netzwerk oder Bluetooth verfügbar sind.

Er kann folgendes aufspüren oder anzeigen:
* Geräte IP oder Netzwerkadressen
* Bluetooth normal oder Bluetooth LE
* HP drucker tintenfüllstände
* ECB Umrechnungskurse zum Euro
* UWZ Wetterwarnungen

Er benutzt Ping (und wenn installiert auf Linux auch fping und arp-scan, 'sudo apt-get install fping arp-scan' erledigt die Installation am Raspi).
Für Bluetooth verwendet es neben Noble [http://www.nirsoft.net/utils/bluetooth_viewer.html] unter Windows und hcitool auf Linux.
Noble ist nun optional und wenn es nicht installiert werden kann wird der Adapter trotzdem laufen.

MAC-Adressen können auch angegeben werden, diese werden aber nur verwendet wenn das Programm 'arp-scan' installiert ist. Am Raspi kann das mit 'sudo apt-get install arp-scan' installiert werden.
Es können mehrere MAC-Adressen durch ',' getrennt angegeben werden.

Wenn ein Name mit '-' endet wird er nicht zu whoHere dazugerechnet, erscheint aber unter allHere.
Wenn ein Gerät eine IP-Adresse hat und der Name mit `HP-` beginnt wird versucht alle 500 scans (einstellbar) den Tiuntenfüllstand vom HP-Drucker auszulesen. 
Wenn ein Gerät mit `ECB-` beginnt werden die Wechselkurse der Eurpopäischen Zentralbank von der Seite [http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml] abgefragt. In diesem Fall wird das Feld der IP-Adresse dazu verwendet um die Kurse auszuwählen die abgefragt werden sollen, getrennt durch Beistriche oder Leerzeichen wie z.B zur Anzeige von US$ und Rubel: `USD,RUB`.

Je nach settings für External Network in Sekunden (wenn 0 dann ausgeschaltet) wird die externe IP-Adresse abgefragt und als IP4 abgelegt. Wenn die Abfrage nicht gelingt (von 3 verschiedenen Servern) wird ein Status-Flag auf 0 gesetzt. Der Status kann auch 1 oder 2 sein je nachdem ob die IP von einem oder mehreren Servern zurückgegeben worden ist. Damit kann erkannt werden wenn keine Verbindung zum externen Netzwerk besteht (Status=0) und falls eine besteht die externe IPV4-Adresse ausgelesen werden was ermöglicht dass dynamisch DNS upgedated werden können.
Default Delay ist 300 Sekunden (=5 Minuten), ich würde nicht unter 60 (1 Minute) gehen da bei jeder Abfrage 2-3 Webseiten abgefragt werden.

Der Adapter generiert mit arp-scan und Noble (wenn vorhanden) nun auch AllUnknownBTs und AllUnknownIPs JSON-Variablen welche die gefundenen aber nicht im adapter gescannten IP-, MAC- und BT-Adressen listet.
Damit können neue devices erkannt werden und potentielle scripts können checken ob sich neue Geräte am Wlan angemeldet haben.
Beide Variablen enthalten arrays mit den unbekannten devices. AllUnknownIPs ist ein Array von Strings die mit '; ' getrennt die gefundene IP-Adresse, die MAC-Adresse, den Hersteller (wenn bekannt) des Lan-Adapters und den Reverse-IP-Namen der IP-Adresse enthält.
Somit sollten Geräte leicht identifiziert werden können.
Bei AllUnknownBTs ist es ein Array von Objekten welche die BT-Adresse, den Herstellernamen falls bekannt und die Signalstärke (rssi, je niedriger desto weiter weg is das device) enthält.

Wenn die IP-adresse mit 'http' beginnt interpretiert radar sie als web-adresse (url) und fragt die Adresse ab anstatt ping zu verwenden. Damit kann der Status eines Webservers (wie z.B. http(s)://iobroker.net) geprüft werden.
Bei https kann aber ein Fehler bei den Schlüsseln auch als 'nicht vorhanden' gemeldet werden. So meldet https://forum.iobroker.net abwesend da das Forum nicht im domainschlüssel gelistet ist. Das vorige Beispiel ohne 'forum.' funktioniert.

Für Unwetterwarnungen muss im ioBroker-admin der Längen- und Breitengrad konfiguriert sein damit der Adapter den UWZ-Area_Code findet. 
Es kann das Intervall (in Sekunden) zwischen den Abfragen angegeben werden, default ist 30 Minuten (1800 Sekunden). 
Wenn der Wert von Max Messages >0 ist dann werden genau so viele states erzeugt die entweder leer sind oder Meldungen enthalten.
Wenn 0 angegeben wird (als default) wird nur ein State erzeugt welcher dann für jede Meldung eine Zeile enthält.
Jede Meldung besteht aus dem Meldungs-Text und am Ende eine severity-einstufung.
Es kann eingestellt werden ob der der lange (mit genauer Beschreibung für Orte mit Gewitter) oder kurze Warnungstext angezeigt wird.

## Important/Wichtig
* Adapter requires node >= v4.3.*!

## Changelog
### 1.1.3 
* Repository rename to ioBroker.radar to fulfill ioBroker requirements! 

### 1.1.2 
* when number of UWS messages is <0 then do not use a \\n but \<br\> as line separator for easy web display
* Added new long or short text selector in adapter config
* Changed AllUnknownIP/BTs behaviour to exclude if possible known or double values

### 1.1.1
* Added UWZ Weather warning
* Changed listing of unkown IP's and BT's to remove double entries

## Changelog
### 1.0.2
* Made it first official version

## Changelog
### 0.7.4 
* More Bluetoot debug messages if debug enabled
* l2ping problem resolved 

## Changelog
### 0.7.3 
* Officejext 6?00 Series support für Tintenfüllstände hinzugefügt 
* Testing enabled

### 0.7.2 
* Wenn die ip-adresse mit 'http' beginnt interpretiert radar sie als web-adresse und fragt die Adresse ab anstatt ping zu verwenden. Damit kann der Status eines Webservers (wie z.B. http://iobroker.net) geprüft werden. 

## Changelog
### 0.7.1 
* Wenn hcitool vorhanden ist wird auch mit l2ping nach Bluetooth-Adressen gesucht. Damit wird die Verfügbarkeit von Bluetooth auf Linux weiter verbessert.  

### 0.7.0 
* Arp-scan und Noble BT scan kreieren 'AllUnknown*' Variablen die die IP/Mac-Adressen und BT-Adressen listen welche gefunden werden aber nicht in der Device-Liste sind!  

### 0.6.3
* Scan External IP und External Network Status eingeführt. 

### 0.6.1
* Der Gerätename wird überprüft und ' ' oder '.' werden durch '_' ersetzt. Damit werden keine ungültigen Datenpunkte erzeugt.

### 0.6.0
* Loglevel info loggt nur wenn sich whoHere ändert
* HP-Printer Tintenfüllstand sollte nun auch bei OfficeJet funktionieren  
* ECB (European Central Bank) Wechselkurse können abgefragt werden

### 0.5.0
* Der Adapter nimmt jetzt auch Netzwerk-MAC-Adressen (auch mehrere pro Gerät) 

### 0.4.3
* Bug fixes to 0.4.1
* Der Adapter löscht auch nicht verwendete States/Objekte die der Adapter (mit dieser Instanz) erzeugt hat und die aber nicht mehr gescannt werden.

### 0.4.1 
* Habe für Windows 'Bluetoothview' integriert. Damit ist es auch ohne Noble möglich BT-Devices zu scannen.
* BT LE (wie G-Tags) funktionieren leider nicht damit. Unter Umständen muss das Gerät 'gekoppelt' werden.

### 0.3.3
* Es werden nur die Objekte erzeugt welche IP oder BT-Adressen haben.
* Der code verwendet jetzt Promises woimmer möglich und die Verwendung/Abhängigkeit von den Modulen 'request' und 'async' wurde eliminiert. 
* Der Adapter startet nun auch wenn Noble nicht voll installiert ist, die Noble-BT-LE Scans sind dann einfach nicht vorhanden. 

### 0.2.1
* Implementierung von anyBelow10 wo angezeigt wird ob im Drucker irgendeine Farbe auf/unter 10% Füllstand ist.
* Implementierung von Ausschluß aus whoHere wenn Name mit `-` endet

### 0.2.0
* First public release, working fine on Raspberry

### 0.1.0
* Ok, my first working version on Raspberry!

## Install

Installieren über ioBroker.admin

On Linux install `fping` and `arp-scan` (with me it worked like `sudo apt-get install fping arp-scan`)

if `fping` is available the tool will use ping and fping to check on IP availabilit. 
if `arp-scan` is available it will use it to scan mac addresses.

Also make sure that `hcitool` is installed, normally part of `bluez`.

## Configuration

Jedes Gerät bekommt einen Namen und es wird entweder wird als Ausgang oder Eingang definiert ('output' oder 'input'  bzw 'o' oder 'i' ins Feld schreiben).
Beginnt der Name des Geätes mit `HP-` dann nimmt radar an es handelt sich um einen HP-Drucker und es versucht auch (alle 500 scan-Versuche) den Tintenstand auszulesen!

Wenn ein Gerätename mit `-` endet (z.B. `Internet-`) dann wird er nicht in whoHere/countHere gelistet. Damit können Geräte oder andere Devices vom Anwesenheitscheck ausgeklammert werden.

### Todo

## Installation
Auf Linux sollte das tool 'fping' und arp-scan (z.B. mit `sudo apt-get install fping arp-scan`) installiert werden welches zusätzlich zum normalen ping verwendet wird.
Auf Windows sollte das bin.zip nach node_modules\iobroker.radar extrahiert werden da eventuell node_modules\iobroker.radar\bin\bluetoothview\BluetoothView.exe von npm nicht installiert wird.

## License

The MIT License (MIT)

Copyright (c) 2014-2016, bluefox <dogafox@gmail.com>

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
