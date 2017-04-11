# SD-Image für Raspberry Pi2 (nodejs vom 23.07.2015)

Hier ist ein SD-Karten Image für den Raspberry Pi2\. Es ist für 4 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 4 GB-Karte passt ist eine 8 GB die empfohlene Mindestgröße. Die Micro-SD Karte wird am besten mit dem [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert. Das Image wird entpackt und anschließend mit Hilfe des Programms [Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._ Das Image enthält das Original RaspBian vom 05.05.2015 nach download von https://www.raspberrypi.org/downloads/ jedoch ohne Wolfram-Engine. Dafür war kein Platz mehr. folgende User sind bereits angelegt:

<table width="275">

<tbody>

<tr>

<td>**User**</td>

<td>**Passwort**</td>

</tr>

<tr>

<td>pi</td>

<td>raspberry</td>

</tr>

<tr>

<td>root</td>

<td>ioBrokerRoot</td>

</tr>

</tbody>

</table>

Weiterhin ist das neueste node-js installiert nach https://github.com/nathanjohnson320/node_arm sowie natürlich iobroker mit dem js-controller nach Stand vom 24.07.2015, 11:30 Es sind **alle**<sup>*</sup> Adapter vorinstalliert mithilfe eines shell-scripts _complete.sh_, welches sich im Ordner /root befindet. Instanzen sind außer für den admin noch nicht angelegt. Für die gewünschten Adapter müssen noch die Instanzen [erzeugt und konfiguriert](http://www.iobroker.net/?page_id=14&lang=de) werden. <sup>*</sup>drei Adapter ließen sich nicht installieren. Diese sind jedoch auch nicht betriebsbereit.