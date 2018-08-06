# ioBroker Image für Cubieboard 3 (Cubietruck)

Dies ist ein SD-Karten Image für das Cubieboard 3\. Es ist für 2 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 2 GB-Karte passt ist eine 4 GB die empfohlene Mindestgröße.

Die Micro-SD Karte wird am besten mit dem 
![](img/sd-image-fuer-raspberry-pi2-minimal-3-2_icon_link.png)
 [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert.

Das Image wird entpackt und anschließend mit Hilfe des Programms 
![](img/sd-image-fuer-raspberry-pi2-minimal-3-2_icon_link.png)
 [Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._

Das Image enthält das Armbian_5.14_Cubietruck_Debian_jessie_4.6.2 nach download von 
![](img/sd-image-fuer-raspberry-pi2-minimal-3-2_icon_link.png)
 [Armbian.com](http://www.armbian.com/cubietruck/) mit Vanilla Kernel.

Folgende User sind angelegt:

_**User:**_

*   cubie, _**Passwort:**_ broker
*   root, _**Passwort: **_cubieroot

Weiterhin ist node-js v 4.5.0 installiert sowie natürlich iobroker mit dem js-controller nach Stand vom 04.09.2016 und redis.

Es sind **nur die wichtigsten** Adapter vorinstalliert und dazu Instanzen angelegt. Diese müssen noch konfiguriert werden.

Folgende Versionen sind installiert:

<table style="height: 298px; width: 319px; border-color: #1833cc; background-color: #addcf0;" border="4">

<thead>

<tr style="height: 24px;">

<td style="width: 129px; height: 24px; text-align: center;">**Adapter**</td>

<td style="width: 174px; height: 24px; text-align: center;">**Version**</td>

</tr>

</thead>

<tbody>

<tr style="height: 24px;">

<td style="width: 129px; height: 24px; text-align: center;">js-controller</td>

<td style="width: 174px; height: 24px; text-align: center;">0.11.3</td>

</tr>

<tr style="height: 24px;">

<td style="width: 129px; height: 24px; text-align: center;">hm-rpc</td>

<td style="width: 174px; height: 24px; text-align: center;">1.3.1</td>

</tr>

<tr style="height: 24px;">

<td style="width: 129px; height: 24px; text-align: center;">hm-rega</td>

<td style="width: 174px; height: 24px; text-align: center;">1.3.0</td>

</tr>

<tr style="height: 24px;">

<td style="width: 129px; height: 24px; text-align: center;">vis</td>

<td style="width: 174px; height: 24px; text-align: center;">0.10.7</td>

</tr>

<tr style="height: 25px;">

<td style="width: 129px; height: 25px; text-align: center;">history</td>

<td style="width: 174px; height: 25px; text-align: center;">1.0.5</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px;">flot</td>

<td style="text-align: center; height: 24px;">1.4.0</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px;">Javascript</td>

<td style="text-align: center; height: 24px;">3.0.5</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px;">Socket</td>

<td style="text-align: center; height: 24px;">1.5.2</td>

</tr>

<tr style="height: 24.875px;">

<td style="text-align: center; height: 24.875px;">Web</td>

<td style="text-align: center; height: 24.875px;">1.5.3</td>

</tr>

</tbody>

</table>

Nach dem ersten Starten des BnanaPi wird das Filesystem automatisch an die Größe der SD-Karte angepasst. Außerdem wird man aufgefordert das Root-Passwort zu ändern.

<span style="line-height: 1.5;">Bitte noch selber über die Konsole die Passworte ändern:</span>

`sudo passwd cubie` das Passwort für den User "cubie" ändern.