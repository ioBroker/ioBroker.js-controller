# ioBroker Image für BananaPi

Dies ist ein SD-Karten Image für den BananaPi. Es ist für 2 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 2 GB-Karte passt ist eine 4 GB die empfohlene Mindestgröße.

Die SD Karte wird am besten mit dem [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert.

Das Image wird entpackt und anschließend mit Hilfe des Programms [Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._

Das Image enthält das Armbian_5.24_Bananapi_Debian_jessie_4.8.15 nach download von [Armbian.com](http://www.armbian.com/bananapi/) mit mainline Kernel.

Folgende User sind angelegt:

_**User:**_

*   io, _**Passwort:**_ broker
*   root, _**Passwort: **_bananaroot

Weiterhin ist node-js v 6.9.4 installiert sowie natürlich iobroker mit dem js-controller nach Stand vom 14.01.2017 und redis.

Es sind **nur die wichtigsten** Adapter vorinstalliert und dazu Instanzen angelegt. Diese müssen noch konfiguriert werden.

Folgende Versionen sind installiert:

<table class="aligncenter" style="height: 476px; width: 300px; border-color: #1833cc; background-color: #addcf0;" border="4">

<thead>

<tr style="height: 24px;">

<td style="width: 121px; height: 24px; text-align: center;">**Adapter**</td>

<td style="width: 165px; height: 24px; text-align: center;">**Version**</td>

</tr>

</thead>

<tbody>

<tr style="height: 24px;">

<td style="width: 121px; height: 24px; text-align: center;">js-controller</td>

<td style="width: 165px; height: 24px; text-align: center;">0.14.0</td>

</tr>

<tr style="height: 24px;">

<td style="width: 121px; height: 24px; text-align: center;">admin</td>

<td style="width: 165px; height: 24px; text-align: center;">1.6.8</td>

</tr>

<tr style="height: 24px;">

<td style="width: 121px; height: 24px; text-align: center;">hm-rpc</td>

<td style="width: 165px; height: 24px; text-align: center;">1.3.3</td>

</tr>

<tr style="height: 24px;">

<td style="width: 121px; height: 24px; text-align: center;">hm-rega</td>

<td style="width: 165px; height: 24px; text-align: center;">1.3.0</td>

</tr>

<tr style="height: 24px;">

<td style="width: 121px; height: 24px; text-align: center;">vis</td>

<td style="width: 165px; height: 24px; text-align: center;">0.10.15</td>

</tr>

<tr style="height: 25px;">

<td style="width: 121px; height: 25px; text-align: center;">history</td>

<td style="width: 165px; height: 25px; text-align: center;">1.5.0</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 121px; text-align: center;">flot</td>

<td style="height: 24px; width: 165px; text-align: center;">1.5.6</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 121px; text-align: center;">Javascript</td>

<td style="height: 24px; width: 165px; text-align: center;">3.2.2</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 121px; text-align: center;">Socket</td>

<td style="height: 24px; width: 165px; text-align: center;">1.7.4</td>

</tr>

<tr style="height: 24.875px;">

<td style="height: 24.875px; width: 121px; text-align: center;">Web</td>

<td style="height: 24.875px; width: 165px; text-align: center;">1.7.7</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 121px; text-align: center;">mobile</td>

<td style="height: 24px; width: 165px; text-align: center;">0.4.10</td>

</tr>

<tr style="height: 24px;">

<td style="height: 24px; width: 121px; text-align: center;">rpi2</td>

<td style="height: 24px; width: 165px; text-align: center;">0.4.10</td>

</tr>

</tbody>

</table>

Nach dem ersten Starten des BananaPi wird das Filesystem automatisch an die Größe der SD-Karte angepasst. Außerdem wird man aufgefordert das Root-Passwort zu ändern.

Bitte anschließend über die Konsole mit

`sudo passwd io` das Passwort für den User "io" ändern.