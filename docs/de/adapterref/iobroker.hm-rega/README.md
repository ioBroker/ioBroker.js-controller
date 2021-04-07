---
local: true
---
![logo](media/homematic.png)
# HomeMatic ReGaHSS

## Homematic
> Homematic ist das Smart Home System von eQ-3, das die umfassende Steuerung
  unterschiedlichster Funktionen mithilfe von Szenarien (von einfach bis komplex)
  in Haus oder Wohnung ermöglicht.

> Die Geräte beinhaltet Produkte zur Licht-, Rollladen- und Heizungssteuerung,
  Gefahrenmelder, Sicherheitssensoren und Produkte zur Wetterdatenmessung. Die
  Funkkommunikation vereinfacht dabei das Nachrüsten. In Neubauten können
  Drahtbus-Komponenten eingesetzt werden.

[Quelle](https://www.eq-3.de/produkte/homematic.html)

## Adapter Homematic ReGaHss
Dieser Adapter stellt eine Verbindung zur Homematic Logikschicht „ReGaHSS“ (**Re**sidential **Ga**teway) her.
Er synchronisiert Klarnamen, Systemvariablen, Räume, Gewerke und Programme
zwischen Homematic und ioBroker.

Falls mehrere Zentralen in ioBroker eingebunden werden sollen, ist für jede
Zentrale eine eigene Instanz zu installieren und konfigurieren.

Mit der Installation von ReGaHSS wird auch eine Instanz des Adapters "hm-rpc"installiert, die vorab konfiguriert und aktiviert werden sollte.

Eine Instanz dieses Adapters kann bis zu 5 unterschiedliche Instanzen des
Homematic RPC Adapters verwalten, die verschiedene Dienste zur Verfügung stellen
(jeder Dienst benötigt eine eigene RPC-Instanz):

-   rfd (CCU-Funkdienst für Standardkomponenten)
-   hs485d (Wired) (für Drahtbus-Komponenten)
-   CuxD (Zusatzsoftware zur Bereitstellung einer universellen Schnittstelle)
-   Homematic IP (IP-gestützte Komponenten)
-   Virtual Devices

### Voraussetzungen vor Installation
-   Homematic Gateway (CCU/CCU2/CCU3 …) *oder*
-   Funkmodul mit passender Software (piVCCU(*x)*, RaspberryMatic o.ä.)

## Installation

Eine Instanz des Adapters wird über die ioBroker Admin-Oberfläche installiert.

Nach Abschluss der Installation öffnet sich automatisch das
Konfigurationsfenster.

Vor der eigentlichen Konfiguration sollte die (zusammen mit diesem Adapter
erstellte) Instanz des HM-RPC-Adapters oder bei Bedarf weitere HM-RPC-Instanzen
angelegt und konfiguriert werden.

## Konfiguration

![](media/01c7dbc4da0240421b0711b331971d2d.png)
**Auswahlmenü oben**

Im oberen Auswahlmenü können drei verschiedenen Bereiche ausgewählt werden:

### Bereich Haupteinstellungen
![](media/3e0325b2bf61e508e131f8792e2c004d.png)
**Haupteinstellungen**

In diesem Bereich werden die grundlegenden Einstellungen vorgenommen.

Im Pulldown-Menü kann die IP-Adresse der CCU ausgewählt werden; auch der
Wiederverbindungsintervall (Standard 30 sec) kann vom User angepasst werden.

![](media/ce181cdbb3b8979e1233b57a4588cf1d.png)
**Zuordnung der RPC-Instanzen**

Danach werden die erforderlichen Dienste aktiviert und mit der passenden
HM-RPC-Instanz verknüpft.

Polling

Wenn aktiviert, erfolgt die regelmäßige Abfrage der RegaHSS-Daten von der CCU,
die sich nach dem im Feld Intervalle eingestellten Sekunden richtet. Der
Intervall sollte nicht zu niedrig eingestellt werden, da ein zu häufiges
Abfragen zum Absturz der CCU führen kann.

Trigger

Um die aktiven Abfragen von ioBroker an den RegaHSS zu minimieren, kann auf der
CCU innerhalb eines Programms auch ein Trigger die Daten bei Änderung pushen.
Dafür kann eine virtuelle Taste der CCU genutzt werden, die in einem
CCU-Programm ausgelöst wird. Standardmäßig ist dies die Taste
BidCosRF.50.PRESS_SHORT (s. Beispielprogramm).

### Bereich Synchronisiere

Hier kann der User festlegen, welche Information von der CCU in ioBroker
übernommen werden. Es werden dann die entsprechenden Objekte und Datenpunkte in
ioBroker angelegt.

-   DutyCycle: Aktivieret die Angabe des Duty Cycles (in %)
-   Variablen: Aktiviert die Übernahme der Systemvariablen von der CCU
-   Programme: Aktiviert die Übernahme der Programmbezeichnungen von der CCU
-   Namen: Aktiviert die Übernahme der Klartextnamen der Datenpunkte von der CCU
-   Favoriten: Aktiviert die Übernahme und Auflistung der Favoriten
-   Räume: Aktiviert die Übernahme der Räume und einer Auflistung derselben
-   Gewerke: Aktiviert die Übernahme der Gewerke und einer Auflistung derselben

### Bereich Zusätzliche Einstellungen

Hier kann der User entscheiden, ob https (verschlüsselte und abhörsichere
Verbindung) genutzt werden soll. Wenn aktiviert, ist die Eingabe des
Nutzernamens und das dazugehörige Passwort erforderlich

Sind alle Einstellungen erfolgt, wird die Konfigurationsseite mit dem Befehl
„speichern und schließen“ abgeschlossen (Button unterhalb des
Einstellungsbereiches). Der Adapter wird geschlossen und die Instanz mit den
neuen Werten gestartet.

### Instanz

![](media/44785b82964bcdc198565b1681787dc0.png)
**Instanz und Signal**

Im Bereich *Instanzen* des ioBrokers findet sich nun die erstellte(n)
Instanz(en). Links ist im Ampelsystem visualisiert, ob der Adapter aktiviert
oder mit der CCU verbunden ist.

Platziert man den Mauszeiger auf ein Symbol, erhält man Detailinformationen.

### Objekte des Adapters

Im Bereich Objekte werden in einer Baumstruktur alle vom Adapter von der CCU
übermittelten Werte und Informationen dargestellt.

Da die Objekte anwenderspezifisch sind, werden hier nur die allgemeinen und für
alle Anwender gleichen Objekte dargestellt.

![](media/c24d8382beda4c970093097959080524.png)
**Ordnerstruktur**

Die ersten Ordner (i.d.R. Ziffern-ID) sind die in der CCU enthaltenen Programme.

CCU- und Info-Ordner beinhalten die Basisinformationen des Gateways inkl.
prozentualer Angabe des Duty Cycles (sofern aktiviert).

Abschließend sind die in der CCU angelegten Variablen aufgelistet

### FAQ

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 3.0.18 (2021-04-05)
* (foxriver76) local link now respects port and protocol

### 3.0.17 (2021-04-04)
* (foxriver76) correctly identify incomplete requests

### 3.0.16 (2021-01-31)
* (foxriver76) fix issue with non-existing objects when using LAN-Gateways

### 3.0.15 (2021-01-31)
* (foxriver76) Ensure that objects are created if something (devices, variables, programs) created during runtime (fixes #124)

### 3.0.14 (2021-01-30)
* (foxriver76) fix pot. crash after reconnect because of existingStates array

### 3.0.13 (2021-01-30)
* (foxriver76) ensure to not set states of non-existing RPC objects due to differences in the APIs (fixes #123)

### 3.0.12 (2021-01-29)
* (foxriver76) we now handle some more edge case errors

### 3.0.10 (2021-01-27)
* (foxriver76) no build needed

### 3.0.9 (2021-01-27)
* (foxriver76) fix gh actions

### 3.0.8 (2021-01-27)
* (foxriver76) we now wait until objects are created before setting states (fixes #122)
* (foxriver76) added release script

### 3.0.7 (2021-01-17)
* (foxriver76) we notify the user about aborted connection by CCU during request

### 3.0.6 (2020-12-25)
* (Hirsch-DE) don't write datapoints if timestamp is 0"

### 3.0.5 (2020-12-24)
* (foxriver76) provide possibility to use custom webinterface port, please see FAQ

### 3.0.4 (2020-12-21)
* (foxriver76) fixed enum translations (changed in API)
* (foxriver76) fixed handling of "favorites" enum
* __this can be breaking for some users, please check your enums__

### 2.6.25 (2020-12-16)
* (foxriver76) fix aliases being removed from enums if they contain `hm-rpc.`

### 2.6.24 (2020-11-03)
* (foxriver76) now states will be accordingly marked to indicate that rega is down when receiving invalid responses

### 2.6.23 (2020-10-15)
* (foxriver76) fixes for edge case crashes

### 2.6.22 (2020-09-29)
* (foxriver76) fixed error where alarm states of hm-rpc instances with instance number >= 10 are created for the wrong instance (issue #111)

### 2.6.20 (2020-09-15)
* (foxriver76) set explicit object type on extending object (issue #109)

### 2.6.19 (2020-08-23)
* (foxriver76) fixed issue on syncing service message counter when invisible variables are synchronized
* (foxriver76) fixed issue where value list variables are a string instead of an integer

### 2.6.17 (2020-08-17)
* (foxriver76) fix for % scaling of float numbers

### 2.6.15 (2020-08-08)
* (foxriver76) fix potential issues with scaling of % values as in https://github.com/ioBroker/ioBroker.hm-rpc/issues/263

### 2.6.14 (2020-06-11)
* (foxriver76) fix potential problem on enum sync, where to many channels could be deleted

### 2.6.11 (2020-06-11)
* (foxriver76) timeout of requests increased to 90 seconds (its only important to have a timeout to prevent infinite stucking)

### 2.6.10 (2020-06-10)
* (foxriver76) fix crash when a user on CCU is a empty string on synchronizing favorites

### 2.6.9 (2020-05-29)
* (foxriver76) fixed crash when we cannot determine CCU version

### 2.6.8 (2020-05-26)
* (foxriver76) Script post requests will time out after 15 seconds to prevent 
stucking in queue if no answer from ccu received

### 2.6.7 (2020-05-11)
* (foxriver76) fixed some edge cases, reported by Sentry

### 2.6.6 (2020-05-06)
* (foxriver76) use current time as timestamp if non-existent on initial variables poll

### 2.6.5 (2020-04-22)
* (foxriver76) improved error handling, no longer use legacy log file

### 2.6.4 (2020-04-13)
* (foxriver76) now storing scripts in iob file storage

### 2.6.2 (2020-04-11)
* (foxriver76) minor fix on ccu object

### 2.6.1 (2020-04-04)
* (foxriver76) fix synchronization

### 2.6.0 (2020-04-02)
* (foxriver76) sentry plugin support added

### 2.5.5 (2020-02-17)
* (foxriver76) we are logging the script name in still pending warning from now on

### 2.5.4 (2020-02-05)
* (foxriver76) made port fully configurable, also with https enabled

### 2.5.3 (2020-01-15)
* (foxriver76) improved error handling in edge cases and more verbose logging on errors

### 2.5.2 (2019-12-29)
* (foxriver76) fixed issue which originated by undefined tclsh alias on CCU for dutycycle.fn script

### 2.5.1 (2019-12-14)
* (foxriver76) no longer use adapter.objects
* (foxriver76) js-controller v > 2 required

### 2.4.12 (2019-09-26)
* (foxriver76) fixed bug which lead to alarm counter showing number of service messages

### 2.4.10 (2019-09-17)
* (foxriver76) we set enum name as translation object again

### 2.4.9 (2019-09-04)
* (foxriver76) fix minor bug which prevented correct room sync
* (foxriver76) in 2.4.6 we implemented the mechanism for hm-rega and rpc, in fact we should only delete hm-rpc devices, 
because rega will be added on ioB side (can't be done in CCU)

### 2.4.7 (2019-08-28)
* (foxriver76) fixed another legacy bug, which prevented some enums from getting correct name

### 2.4.6 (2019-08-11)
* (foxriver76) only deleting hm adapter objects from enums

### 2.4.4 (2019-08-02)
* (foxriver76) fixed enum sync and improved logging

### 2.4.2 (2019-07-23)
* (foxriver76) lc and ts for alarm states are now valid formatted for js-controller

### 2.4.1 (2019-07-13)
* (foxriver76) also poll invisible vars if configured

### 2.4.0 (2019-07-03)
* (foxriver76) added possibility to synchronize hidden variables

### 2.3.3 (2019-04-05)
* (foxriver76) added more systeminfo states when syncing duty cycle
* (foxriver76) when setting ts, do it in ms

### 2.3.2 (2019-03-10)
* (foxriver76) when ccu sysvar is nan, replace it by null

### 2.3.1 (2019-03-07)
* (foxriver76) also unescape %0A (\n)
* (foxriver76) remove line break in firmware version

### 2.3.0 (2019-02-07)
* (foxriver76) implemented messagebox

### 2.2.2 (2019-02-04)
* (foxriver76) show correct number of service messages even if automatic checking is enabled

### 2.2.1 (2019-01-29)
* (foxriver76) create alarm states with correct name instead of renaming on restart
* (foxriver76) fix to enable acknowledging servicemessages for all instance types

### 2.2.0 (2019-01-26)
* (foxriver76) reworked alarm states, see FAQ
* (foxriver76) fix where virtual devices were not named

### 2.1.8 (2019-01-24)
* (foxriver76) from now on we are displaying the firmware version instead of coprocessor fw version
* (foxriver76) we are making sure to prevent a CCU3 being exposed as a CCU2
* (foxriver76) fixed renaming of alarms on start

### 2.1.7 (2019-01-21)
* (foxriver76) fixed the bug that all alarms of devices are in hm-rpc rfd instance 
or non existent if no rpc instance existed
* (foxriver76) fix bug where datapoints were not named

### 2.1.6 (2019-01-20)
* (foxriver76) update state when same value is set with another timestamp
* (foxriver76) revert duty cycle script
* (foxriver76) fix for parse errors on -inf values

### 2.1.3 (2019-01-14)
* (foxriver76) also decode string values when setting foreign states
* (foxriver76) add more translations

### 2.1.2 (2019-01-10)
* (foxriver76) fix duty cycle script
* (foxriver76) fix bug where state units were ignored for all except rfd

### 2.1.0 (2019-01-07)
* (foxriver76) usage of adapter-core
* (bluefox) compact mode compatibility

### 2.0.1 (2019-01-01)
* (foxriver76) fix error that prevented setting umlauts to system variables in ioBroker
* (foxriver76) usage and application of eslint 

### 2.0.0 (2018-11-28)
* (foxriver76) Https checkbox added
* (foxriver76) Https can be used instead of http
* (foxriver76) Added possibility to authenticate on API
* (foxriver76) de- and encryption added

### 1.7.2 (2018-07-29)
* (bluefox) Configuration dialog was corrected

### 1.7.1 (2018-06-25)
* (bluefox) Forbidden characters were replaced

### 1.7.0 (2018-01-26)
* (bluefox) Ready for Admin3

### 1.6.6 (2017-09-23)
* (AlGu1) Fix error if Lan Interfaces exits

### 1.6.5 (2017-09-10)
* (AlGu1) Change adapter logging of new values to debug

### 1.6.4 (2017-09-10)
* (AlGu1) Config Settings changed to set defaults after update adapter

### 1.6.3 (2017-09-06)
* (AlGu1) Read values from CCU in raw format and create JSON string and object in adapter

### 1.6.2 (2017-09-05)
* (AlGu1) dutycycle.fn script changed for better compatiblity without ReGaHss Beta version

### 1.6.1 (2017-09-05)
* (AlGu1) Error in script file fixed

### 1.6.0 (2017-09-05)
* (AlGu1) Read DutyCycle and other params from listBidcosInterfaces

### 1.5.0 (2017-06-29)
* (Apollon77) Also update names of states when syncing with CCU

### 1.4.8 (2017-05-24)
* (bluefox) Fix values conversion for CUxD

### 1.4.4 (2017-02-28)
* (Apollon77) small fix (issue #23)

### 1.4.3 (2017-02-01)
* (Apollon77) respect settings and only sync variables and programs if selected in settings (issue #22)

### 1.4.2 (2017-01-30)
* (bluefox) remove error log in CCU by start

### 1.4.1 (2017-01-16)
* (bluefox) merge rooms, functions and favorites with existing one

### 1.4.0 (2017-01-15)
* (jens-maus) Add HMIP support

### 1.3.0 (2016-08-23)
* (bluefox) update states only if changed

### 1.2.1 (2016-07-15)
* (nobody) fix initial read of states

### 1.2.0 (2016-05-27)
* (bluefox) read variables anew if connection of rfd detected
* (bluefox) read alarms
* (bluefox) support of acknowledgment of alarms

### 1.1.1 (2016-05-27)
* (bluefox) fix min/max for variables

### 1.1.0 (2016-04-19)
* (bluefox) change timestamp and last change of states

### 1.0.0 (2016-04-19)
* (bluefox) detect disconnection and handle it

### 0.3.7 (2016-04-18)
* (bluefox) fix error with polling trigger

### 0.3.6 (2016-03-12)
* (bluefox) fix read datapoints

### 0.3.5 (2016-03-12)
* (bluefox) remove deprecated unescape

### 0.3.4 (2016-03-09)
* (bluefox) remove deprecated unescape

### 0.3.3 (2016-03-01)
* (bluefox) remove deprecated unescape
* (bluefox) add connection state

### 0.3.2 (2016-03-01)
* (bluefox) remove deprecated unescape

### 0.3.1 (2016-02-29)
* (bluefox) fix dimmer and blinds values at start

### 0.3.0 (2016-02-28)
* (bluefox) remove deprecated unescape

### 0.2.1 (2015-03-25)
* (bluefox) fix "\n" in values

### 0.2.0 (2015-03-24)
* (bluefox) implement check init function

### 0.1.16 (2015-01-04)
* (bluefox) catch errors if states deleted

### 0.1.15 (2015-01-03)
* (bluefox) add hm-rpc as dependency

### 0.1.14 (2015-01-03)
* (bluefox) enable npm install

### 0.1.13 (2014-12-11)
* (bluefox) process errors

### 0.1.12 (2014-12-10)
* (bluefox) update devices if hm-rpc updates the device list

### 0.1.11 (2014-12-06)
* (bluefox) update devices if hm-rpc updates the device list

### 0.1.10 (2014-11-21)
* (bluefox) support of new naming concept with no parents and children

### 0.1.9 (2014-11-11)
* (bluefox) fix error with stopping adapter

### 0.1.8 (2014-10-22)
* (bluefox) fix error with scripts
* (bluefox) add gruntfile.js and remove jscs warnings

### 0.1.7
* (Bluefox, Hobbyquaker) fix bug if no programs or variables exist

### 0.1.6
* (hobbyquaker) added common.role for variables
* (hobbyquaker) get state values
* (hobbyquaker) queue device/channel renaming

### 0.1.5
* (hobbyquaker) enum fixes

### 0.1.4
* (hobbyquaker) fixes
* (hobbyquaker) add settings ui

### 0.1.3
* (hobbyquaker) common.children vs children

### 0.1.2
* (hobbyquaker) Fix common.children in getPrograms

### 0.1.1
* (hobbyquaker) Fix common.name attribute

## License

The MIT License (MIT)

Copyright (c) 2014-2021 bluefox <dogafox@gmail.com>

Copyright (c) 2014 hobbyquaker

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