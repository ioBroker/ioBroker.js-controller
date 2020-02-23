---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: WQ/YjLhugOj3gHo0ZPfKVI0A3f1acCv5zoT5UHnmU4Y=
---
![Logo](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![Anzahl der Installationen](http://iobroker.live/badges/yahka-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yahka.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)

# Iobroker.yahka
## Installation und Verwendung
Einzelheiten zur Installation und Konfiguration dieses Adapters finden Sie in den [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki)

## Voraussetzungen
Bevor Sie den Adapter installieren können, müssen Sie einige Pakete (für Linux) ausführen:

```sudo apt-get install libavahi-compat-libdnssd-dev```

## Installiere die neueste **Version**
Klicken Sie einfach auf die Schaltfläche "+" hinter "Homekit yahka adapter" im ioBroker Admin Panel auf der Seite "Adapter"

## Installiere die neueste **Beta**
Wenn Sie auf dem neuesten Stand sein und die neueste Beta testen möchten, können Sie den Adapter über eine Github-URL installieren. <br> (Manchmal ist ein zusätzlicher Upload [zB iobroker upload yahka] und ein Neustart des Adapters erforderlich) <br>

## Fehlerbehebung
### Nicht alle neuen Funktionen sind verfügbar:
Wenn nach einem Yahoo-Update nicht alle neuen Funktionen verfügbar sind, versuchen Sie einen Upload (z. B. iobrober yahka-Upload) und starten Sie den Adapter neu.

### Fehlender Avahi-Daemon (Linux)
Wenn Sie den folgenden Fehler im Protokoll haben: <br>

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

Sie müssen einige zusätzliche Schritte ausführen:

* Avahi Daemon installieren:

```sudo apt-get install avahi-daemon -y```

* Bearbeiten Sie die Datei avahi-daemon.conf

```sudo nano avahi-daemon.conf ```<br>
change the following variables:
```host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### Fehlendes Pam-Devel-Paket (Linux)
Wenn Sie den folgenden Fehler im Protokoll haben: <br>

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

Sie müssen das pam-devel-Paket installieren:

* Avahi Daemon installieren:

```sudo apt-get install pam-devel -y```

### Fehlendes Bonjour (Fenster)
- Download: `` `https:// www.samuelattard.com / files / bonjourcore2.msi```
- Ausführen: `` `msiexec / i bonjourcore2.msi / qn```
- entfernen: `` `del bonjourcore2.msi```
- Download: `` `https:// www.samuelattard.com / files / bonjoursdksetup.exe```
- Ausführen: `` `bonjoursdksetup.exe / quiet```
- Entfernen Sie: `` `del bonjoursdksetup.exe```
- Set: `` `set BONJOUR_SDK_HOME = C: \ Programme \ Bonjour SDK```

Und danach installieren Sie den Yahoo-Adapter.

## Einige Worte zu HomeKit
Die Architektur von HomeKit ist wie folgt: <br> Es gibt **Geräte** als logische Einheiten. Jedes Gerät kann mehrere **Dienste** haben und jeder Dienst hat mehrere **Eigenschaften** <br> Am Ende ist ein Merkmal ein Endpunkt, an dem Werte gelesen oder beschrieben werden können. <br> Welche Eigenschaften ein Dienst haben könnte, wird von Apple / HomeKit definiert und vom Diensttyp bestimmt. Die Diensttypen werden auch von Apple / HomeKit definiert.

Beispiel: <br> Ein Garagentoröffner ist ein Gerät, das zwei Dienste haben kann: <br>

1. Garagentoröffner
2. Licht

Der Garagentoröffner-Service selbst kann verschiedene Merkmale aufweisen, z. B. CurrentDoorState, TargetDoorState und viele mehr. <br> Auch der Lichtdienst kann verschiedene Eigenschaften haben, wie: Ein (und viele andere zum Ändern der Lichtfarbe usw.)

## Was Yahka macht
Mit Yahka ist es möglich, einen ioBroker-Datenpunkt einem HomeKit-Merkmal zuzuordnen. <br> Da manchmal Zuordnungen erforderlich sind (z. B. unterscheiden sich die &quot;Status&quot; -Werte eines Garagentors zwischen HomeKit und anderen Systemen), besteht auch die Möglichkeit, Funktionen zum Konvertieren der Werte anzugeben. Dies wird unten beschrieben. <br> Um zu viel Verwaltungsarbeit zu vermeiden, befinden sich alle Geräte, die Sie in Yahka erstellen, hinter einer sogenannten &quot;Brücke&quot;. Bei dieser Bridge müssen Sie die Bridge nur mit Ihrem iOS-Gerät koppeln, um Zugriff auf alle Geräte zu erhalten. Andernfalls müssten Sie jedes Yahka-Gerät mit Homekit koppeln.

## Richten Sie die Bridge ein und erstellen Sie Geräte und Dienste
Jedes Gerät, das mit Homekit gekoppelt werden muss, benötigt einen &quot;Benutzernamen&quot; in Form einer Mac-Adresse. Yahka generiert automatisch einen zufälligen Benutzernamen für jede Yahoo-Instanz. <br> **Wichtig: Wenn Sie den Benutzernamen nach dem Koppeln von Yahka mit HomeKit ändern, müssen Sie alle Geräte in iOS neu konfigurieren (Raumzuweisung, Position usw.). Das Ändern des Benutzernamens bedeutet für iOS, dass es sich um ein komplett neues Gerät handelt!** <br> Neben dem Benutzernamen müssen Sie einen PIN-Code angeben, der auf dem iOS-Gerät eingegeben werden muss. Dies alles kann durch Klicken auf &quot;: yahka.0&quot; im Admin-Bereich von Yahka angegeben werden. (Erweitern Sie das Bedienfeld auf der rechten Seite, nachdem Sie auf den Listeneintrag geklickt haben.) Dort könnte auch der Name der Brücke geändert werden.

Nach dem Einrichten der Bridge können Sie die gewünschten Geräte mit der Schaltfläche &quot;Gerät hinzufügen&quot; oben hinzufügen. Sobald ein Gerät hinzugefügt / ausgewählt wurde, können Sie diesem Gerät Dienste hinzufügen. <br> Es ist erforderlich, einen Dienstnamen und einen Diensttyp anzugeben. <br> Je nach Servicetyp ändert sich die Liste der verfügbaren Merkmale <br>

## Eigenschaften einrichten
Wenn Sie ein Merkmal unterstützen möchten, müssen Sie das Kontrollkästchen "aktiviert" auf der linken Seite des Merkmals aktivieren.
Für jedes Merkmal können Sie die folgenden Eigenschaften angeben:

- InOutFunction: Sie können eine vordefinierte Funktion angeben, die für die Übergabe der Werte von HomeKit an ioBroker und umgekehrt verantwortlich ist
- InOutParameter: Hier können Sie Parameter für die ausgewählte InOutFunction angeben. Die verfügbaren / erwarteten Parameter hängen von der ausgewählten Funktion ab. Eine kurze Übersicht über die Funktionen und Parameter finden Sie unten.
- ConversionFunction: Zusätzlich zur InOutFunction können Sie auch eine Funktion angeben, die einen von HomeKit kommenden Wert in ioBroker konvertiert (und umgekehrt).
- ConversionParameter: Wie InOutParameter - Die verfügbaren / erwarteten Parameter hängen von der ausgewählten Funktion ab.

## Übersicht der InOut-Funktionen
| Funktion | Erwarteter Parameter | Beschreibung |
|---|---|---|

| const | Wert | Die const-Funktion übergibt immer den in "InOutParameter" angegebenen Wert an die Konvertierungsfunktion, wenn HomeKit den Wert liest. Wenn HomeKit den Wert schreiben möchte, wird diese Aktion abgelehnt

| ioBroker.State | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreibvorgänge. Alle Operationen werden sofort ohne Pufferung oder Filterung ausgeführt (Werte werden an die angegebenen Konvertierungsfunktionen übergeben) |
| ioBroker.State.Defered | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreibvorgänge. Schreibvorgänge von HomeKit werden direkt an die Konvertierungsfunktion übergeben. Änderungen von ioBroker werden für 150 ms entprellt. Dies bedeutet, dass der Wert nur an HomeKit übertragen wird, wenn innerhalb von 150 ms keine weitere Änderung vorgenommen wurde |
| ioBroker.State.OnlyACK | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreibvorgänge. Schreibvorgänge von HomeKit werden direkt an die Konvertierungsfunktion übergeben. Änderungen von ioBroker werden nur an HomeKit weitergeleitet, wenn die "Acknowledged" -Flag des Werts gesetzt ist. Andernfalls wird der zuletzt bestätigte Wert an HomeKit | übertragen |
| ioBroker.homematic. <br> WindowCovering.TargetPosition | ID des HomeMatic Level-Datenpunkts <br> oder <br> String-Array mit der ID des Level-Datenpunkts und der ID des Arbeitsdatenpunkts | Diese Funktion dient insbesondere zur Steuerung der HomeMatic-Fensterabdeckung. Diese Funktion verzögert die Übertragung von Werten an HomeKit, während sich die Fensterabdeckung bewegt. Dies ist erforderlich, um ein Flackern des Schiebereglers für die Fensterabdeckung in iOS | zu vermeiden |

## Übersicht der Konvertierungsfunktionen
| Funktion | Erwarteter Parameter | Beschreibung |
|---|---|---|

| Passthrough | \ <none \> | Der Wert von ioBroker wird ohne Konvertierung an HomeKit übergeben (und umgekehrt).

| HomematicDirectionTo <br> HomekitPositionState | \ <none\> | Diese Funktion ordnet die Richtungsaufzählung der homematischen Fensterabdeckung der PositionState-Aufzählung von HomeKit (und zurück) zu |
| HomematicControlModeTo <br> HomekitHeathingCoolingState | \ <none\> Diese Funktion ordnet die ControlMode-Aufzählung von Homematic der HeathingCoolingState-Aufzählung von HomeKit (und zurück) zu |
| scaleInt <br> scaleFloat | ```{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }``` | Diese Funktion ähnelt &quot;level255&quot;, ist jedoch allgemeiner. Es transformiert einen ioBroker-Wert mit einem Bereich von &quot;iobroker.min&quot; (0, wenn weggelassen) zu &quot;iobroker.max&quot; in einen HomeKit-Wert mit einem Wertebereich von &quot;homekit.min&quot; (0, wenn weggelassen) zu &quot;homekit.max&quot;. (und zurück). <br> **Beispiel:** Wenn das Parameterfeld lautet: ```{ "homekit.max": 500, "iobroker.max": 250}``` <br> Der Wert von ioBroker wird tatsächlich mit 2 multipliziert, bevor er an HomeKit gesendet wird. <br> **Die min-Parameter sind nur in Version 0.8.0 und höher verfügbar** |
| inverse | number | Mit dieser Funktion wird ein Wert von ioBroker &quot;invertiert&quot;. Der Parameter gab das Maximum des Wertes in ioBroker an. Die Formel lautet: ```Parameter - value``` <br> **Beispiel:** Wenn das Parameterfeld ```100``` ist, wird der Wert 100 von ioBroker als 0 an HomeKit gesendet, der Wert 80 wird als 20 an HomeKit usw. gesendet  |
| hue | \ <none \> | Diese Funktion ist eine spezielle Version von scaleInt mit den Parametern ```iobroker.max=65535``` und ```homekit.max=360```. |
| hue | \ <none \> | Diese Funktion ist eine spezielle Version von scaleInt mit den Parametern `` `iobroker.max = 65535``` und` `` homekit.max = 360```. |

## Homematischer Blindantrieb \ Fensterabdeckung
Zur Integration der homematischen Blindaktoren (wie HM-LC-Bl1PBU-FM) sind folgende Einstellungen erforderlich:

* Fügen Sie einem Gerät einen Dienst hinzu
* Setzen Sie den Dienstnamen auf einen Namen und den Diensttyp auf "WindowCovering". Der Service-Subtyp kann leer bleiben
* Aktivieren und füllen Sie die folgenden Merkmale aus:

| Merkmalname | 1: InOut-Funktion <br> 2: Konvertierungsfunktion | 1: InOut-Parameter <br> 2: Konvertierungsparameter |
|---|---|---|
| Aktuelle Position 1: ioBroker.State.OnlyACK <br> 2: Passthrough | 1: _ \ <path to homematic object\> _.1.LEVEL <br> 2: \ <empty\> |
| PositionState | 1: ioBroker.State.OnlyACK <br> 2: HomematicDirectionToHomekitPositionState | 1: _ \ <path to homematic object\> _.1 RICHTUNG <br> 2: \ <empty\> |
| TargetPosition | 1: ioBroker.homematic.WindowCovering.TargetPosition <br> 2: Passthrough | 1: _ \ <path to homematic object\> _.1.LEVEL <br> 2: \ <empty\> |

Der Wert _ \ <Pfad zum homematischen Objekt \> _ muss durch den tatsächlichen Pfad zum Gerät ersetzt werden (z. B. hm-rpc.0.NEQ0012345).

Allgemeine Informationen zur Konfigurationsmaske finden Sie unter: TODO <br> Weitere Informationen zur Konfiguration, den InOut-Funktionen und den Konvertierungsfunktionen finden Sie unter: [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

## Changelog
### 0.10.0 (2020-02-19)
  (apollon77) updated dependencies, nodejs 12 support<br>

### 0.10.0
  (jw) updated dependencies<br>
  (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)<br>

### 0.9.2
  (jw) fixed a bug where the adapter didn't start anymore<br>
  (jw) removed the reference to the git repository of the hap community types<br>

### 0.9.1
  (jw) fixed a bug where the adapter crashes if a state does not exist<br>
  (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))<br>
  (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
  (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))<br>

### 0.9.0
  (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)<br>
  (jw) improved admin interface to support individual editors for IO/Conversion functions<br>
  (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions<br>
  (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) <br>
  (jw) added ioFunction "MultiState" to get multiple states and/or seperate between read and write states <br>
  (jw) added conversion function "map" to customize mappings betwen ioBroker and HomeKit <br>
  (jw) added possibility to specifiy IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86))<br> 
  (jw) switched to webpack and refactored admin interface and io/conversion functions <br>
  (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))<br>
  (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))<br>
  (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))<br>
  (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))<br>
  (jw) added support for specifiyng device information via datapoints ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))<br>
  (SchumyHao) added Chinese support
  
### 0.8.2
  (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption<br>

### 0.8.1
  (jw) updated dependencies<br>
  (jw) change default name of new instances<br>
  (foxriver76) remove excessive logging<br>
  (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)<br>
  (arichter83) added "Duplicate Device" functionality<br>

### 0.7.1
  (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore<br>
  (jw) restructured repository to support install via url<br>

### 0.7.0 
  (bluefox) Fixed the ID select dialog in Admin3<br>
  (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve<br>
  (jw) added ip-package to dependencies to avoid errors on some installations<br>

### 0.6.1 
  (jw) fixed startup crash<br>

### 0.6.0
  (jw) add support for IP-Cameras<br>
  (jw) included iOS 11 device definitions<br>
  (jw) allowed negative temperatures for temperature sensors<br>
  (jw) fixed crashes due to duplicate device names<br>
  (oliverschulze) added conversion functions "hue" and "level255"<br>
  (jw) added conversion functions scaleInt, scaleFloat and inverse<br>
  (jw) devices are now sorted by name in the admin panel<br>

### 0.5.5
  (bluefox) allow select ID in configuration dialog<br>

### 0.5.4
  (jw) improve logoutput<br>
  (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping<br>

### 0.5.3
  (jw) internal release<br>

### 0.5.2
  (jw) fixed issues with empty characteristic values<br>
  (jw) fixed issue with empty adapter.systemConfig.system object<br>

### 0.5.1
  (jw) fixed issue with wrongly displayed logo<br>

### 0.5.0
  (jw) initial release<br>

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Jens Weigele (iobroker.yahka@gmail.com)

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