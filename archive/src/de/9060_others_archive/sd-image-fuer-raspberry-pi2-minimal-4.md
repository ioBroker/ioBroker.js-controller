# ioBroker Image für Pine 64 (64bit)

Dies ist ein SD-Karten Image für den pine64\. Es ist für 8 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 8 GB-Karte passt ist eine 16 GB die empfohlene Mindestgröße.

Die Micro-SD Karte wird am besten mit dem 
![](img/sd-image-fuer-raspberry-pi2-minimal-4_icon_link.png)
 [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert.

Das Image wird entpackt und anschließend mit Hilfe des Programms 
![](img/sd-image-fuer-raspberry-pi2-minimal-4_icon_link.png)
 [Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._

Das Image enthält das <span id="Debian_Linux_Jessie_with_Mate_GUI_Image_.5B20160508.5D_by_lenny.raposo_with_Longsleep_kernel" class="mw-headline">Debian Linux Jessie with Mate GUI Image </span>nach download von 
![](img/sd-image-fuer-raspberry-pi2-minimal-4_icon_link.png)
 [Pine64.org](http://wiki.pine64.org/index.php/Pine_A64_Software_Release#Debian_Linux_Jessie_with_Mate_GUI_Image_.5B20160701.5D_by_lenny.raposo_with_Longsleep_kernel) mit Longsleep Kernel.

Folgende User sind angelegt:

_**User: debian**_

_**Passwort: debian**_

Weiterhin ist **node-js v 4.5.0** installiert sowie natürlich iobroker mit dem js-controller nach Stand vom 04.09.2016 und redis.

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

<td style="width: 174px; height: 24px; text-align: center;">0.12.2</td>

</tr>

<tr style="height: 24.875px;">

<td style="width: 129px; height: 24.875px; text-align: center;">hm-rpc</td>

<td style="width: 174px; height: 24.875px; text-align: center;">1.3.1</td>

</tr>

<tr style="height: 24px;">

<td style="width: 129px; height: 24px; text-align: center;">hm-rega</td>

<td style="width: 174px; height: 24px; text-align: center;">1.3.0</td>

</tr>

<tr style="height: 24px;">

<td style="width: 129px; height: 24px; text-align: center;">vis</td>

<td style="width: 174px; height: 24px; text-align: center;">0.10.9</td>

</tr>

<tr style="height: 25px;">

<td style="width: 129px; height: 25px; text-align: center;">history</td>

<td style="width: 174px; height: 25px; text-align: center;">1.3.0</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px;">flot</td>

<td style="text-align: center; height: 24px;">1.4.1</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px;">Javascript</td>

<td style="text-align: center; height: 24px;">3.0.7</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px;">Socket</td>

<td style="text-align: center; height: 24px;">1.7.0</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px;">Web</td>

<td style="text-align: center; height: 24px;">1.7.0</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px;">mobile</td>

<td style="text-align: center; height: 24px;">0.4.6</td>

</tr>

</tbody>

</table>

Nach dem ersten Starten des Pine 64  sollte das Filesystem an die Größe der SD-Karte angepasst werden mit:

`sudo resize_rootfs.sh`

Bitte noch selber über die Konsole das Passwort für den User debian  ändern:

`sudo passwd debian`