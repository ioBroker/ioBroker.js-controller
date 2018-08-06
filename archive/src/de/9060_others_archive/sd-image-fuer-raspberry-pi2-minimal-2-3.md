# ioBroker Image für Raspberry Pi1

Dies ist ein SD-Karten Image für den Raspberry Pi1\. Es ist für 2 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 2 GB-Karte passt ist eine 4 GB die empfohlene Mindestgröße. 16GB Karten sind sowieso emfohlen.

Die SD Karte wird am besten mit dem 
![](img/sd-image-fuer-raspberry-pi2-minimal-2-3_icon_link.png)
 [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert.

Das Image wird entpackt und anschließend mit Hilfe des Programms 
![](img/sd-image-fuer-raspberry-pi2-minimal-2-3_icon_link.png)
 [Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._

Das Image enthält das RaspBian lite jessie vom 11.01.2017 nach download von 
![](img/sd-image-fuer-raspberry-pi2-minimal-2-3_icon_link.png)
 [http://www.raspberrypi.org/downloads](http://www.raspberrypi.org/downloads). Zusätzlich wurde noch python und build-essential installiert.

Folgende User sind angelegt:

_**User:**_

*   pi, _**Passwort:**_ raspberry
*   root, _**Passwort**_: brokerroot

Weiterhin ist node-js v 6.10.0 installiert sowie natürlich iobroker mit dem js-controller nach Stand vom 28.02.2017.

Es sind **nur die wichtigsten** Adapter vorinstalliert und dazu Instanzen angelegt. Diese müssen noch konfiguriert werden.

Folgende Versionen sind installiert:

<table style="height: 298px; width: 319px; border-color: #1833cc; background-color: #addcf0;" border="4">

<thead>

<tr style="height: 24px;">

<td style="width: 126px; height: 24px; text-align: center;">**Adapter**</td>

<td style="width: 171px; height: 24px; text-align: center;">**Version**</td>

</tr>

</thead>

<tbody>

<tr style="height: 24px;">

<td style="width: 126px; height: 24px; text-align: center;">js-controller</td>

<td style="width: 171px; height: 24px; text-align: center;">0.15.3</td>

</tr>

<tr style="height: 24px;">

<td style="width: 126px; height: 24px; text-align: center;">admin</td>

<td style="width: 171px; height: 24px; text-align: center;">1.6.11</td>

</tr>

<tr style="height: 24px;">

<td style="width: 126px; height: 24px; text-align: center;">hm-rpc</td>

<td style="width: 171px; height: 24px; text-align: center;">1.4.2</td>

</tr>

<tr style="height: 24px;">

<td style="width: 126px; height: 24px; text-align: center;">hm-rega</td>

<td style="width: 171px; height: 24px; text-align: center;">1.4.3</td>

</tr>

<tr style="height: 24px;">

<td style="width: 126px; height: 24px; text-align: center;">vis</td>

<td style="width: 171px; height: 24px; text-align: center;">0.10.15</td>

</tr>

<tr style="height: 25px;">

<td style="width: 126px; height: 25px; text-align: center;">history</td>

<td style="width: 171px; height: 25px; text-align: center;">1.5.3</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 126px;">flot</td>

<td style="text-align: center; height: 24px; width: 171px;">1.5.6</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 126px;">javascript</td>

<td style="text-align: center; height: 24px; width: 171px;">3.2.6</td>

</tr>

<tr style="height: 24.875px;">

<td style="text-align: center; height: 24.875px; width: 126px;">web</td>

<td style="text-align: center; height: 24.875px; width: 171px;">2.0.2</td>

</tr>

<tr style="height: 24.875px;">

<td style="text-align: center; height: 24.875px; width: 126px;">mobile</td>

<td style="text-align: center; height: 24.875px; width: 171px;">0.4.10</td>

</tr>

<tr style="height: 24.875px;">

<td style="text-align: center; height: 24.875px; width: 126px;">rpi2</td>

<td style="text-align: center; height: 24.875px; width: 171px;">0.3.1</td>

</tr>

</tbody>

</table>

Nach dem ersten Starten des RaspberryPi bitte mit

`sudo raspi-config`

folgende Einstellungen vornehmen:

*   Expand filesystem (Erweitern des root-filesystems bis zur maximalen Größe der verwendeten SD-Karte)
*   Change User passwort (Eigenes Passwort für den User Pi vergeben)
*   Advanced Options - Hostname (Namen des Raspberry Pi ggf. ändern. Vorgabe ist ioBroker-Pi)

Außerdem bitte aus Sicherheitsgründen <span style="color: #ff0000;">**unbedingt**</span> das Passwort für den root-Zugang ändern mit `sudo passwd root`