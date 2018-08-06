# ioBroker Image für BananaPi

Dies ist ein SD-Karten Image für den BananaPi. Es ist für 2 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 2 GB-Karte passt ist eine 4 GB die empfohlene Mindestgröße.

Die SD Karte wird am besten mit dem 
![](img/sd-image-fuer-raspberry-pi2-minimal-3_icon_link.png)
 [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert.

Das Image wird entpackt und anschließend mit Hilfe des Programms 
![](img/sd-image-fuer-raspberry-pi2-minimal-3_icon_link.png)
 [Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._

Das Image enthält das Armbian_5.14_Bananapi_Debian_jessie_4.6.2 nach download von 
![](img/sd-image-fuer-raspberry-pi2-minimal-3_icon_link.png)
 [Armbian.com](http://www.armbian.com/bananapi/) mit Vanilla Kernel.

Folgende User sind angelegt:

_**User:**_

*   io, _**Passwort:**_ broker
*   root, _**Passwort: **_bananaroot

Weiterhin ist node-js v 4.5.0 installiert sowie natürlich iobroker mit dem js-controller nach Stand vom 10.09.2016 und redis.

Es sind **nur die wichtigsten** Adapter vorinstalliert und dazu Instanzen angelegt. Diese müssen noch konfiguriert werden.

Folgende Versionen sind installiert:

<table class="aligncenter" style="height: 439px; width: 301px; border-color: #1833cc; background-color: #addcf0;" border="4">

<thead>

<tr style="height: 24px;">

<td style="width: 122px; height: 24px; text-align: center;">**Adapter**</td>

<td style="width: 165px; height: 24px; text-align: center;">**Version**</td>

</tr>

</thead>

<tbody>

<tr style="height: 24px;">

<td style="width: 122px; height: 24px; text-align: center;">js-controller</td>

<td style="width: 165px; height: 24px; text-align: center;">0.12.2</td>

</tr>

<tr style="height: 24px;">

<td style="width: 122px; height: 24px; text-align: center;">admin</td>

<td style="width: 165px; height: 24px; text-align: center;"> 1.6.1</td>

</tr>

<tr style="height: 24px;">

<td style="width: 122px; height: 24px; text-align: center;">hm-rpc</td>

<td style="width: 165px; height: 24px; text-align: center;">1.3.1</td>

</tr>

<tr style="height: 24px;">

<td style="width: 122px; height: 24px; text-align: center;">hm-rega</td>

<td style="width: 165px; height: 24px; text-align: center;">1.3.0</td>

</tr>

<tr style="height: 24px;">

<td style="width: 122px; height: 24px; text-align: center;">vis</td>

<td style="width: 165px; height: 24px; text-align: center;">0.10.9</td>

</tr>

<tr style="height: 25px;">

<td style="width: 122px; height: 25px; text-align: center;">history</td>

<td style="width: 165px; height: 25px; text-align: center;">1.3.0</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 122px;">flot</td>

<td style="text-align: center; height: 24px; width: 165px;">1.4.1</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 122px;">Javascript</td>

<td style="text-align: center; height: 24px; width: 165px;">3.0.7</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 122px;">Socket</td>

<td style="text-align: center; height: 24px; width: 165px;">1.5.2</td>

</tr>

<tr style="height: 24.875px;">

<td style="text-align: center; height: 24.875px; width: 122px;">Web</td>

<td style="text-align: center; height: 24.875px; width: 165px;">1.7.0</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 122px;">mobile</td>

<td style="text-align: center; height: 24px; width: 165px;"></td>

</tr>

</tbody>

</table>

Nach dem ersten Starten des BananaPi wird das Filesystem automatisch an die Größe der SD-Karte angepasst. Außerdem wird man aufgefordert das Root-Passwort zu ändern.

Bitte anschließend über die Konsole mit

`sudo passwd io` das Passwort für den User "io" ändern.