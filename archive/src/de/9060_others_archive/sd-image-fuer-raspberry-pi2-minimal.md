# ioBroker Image für Raspberry Pi2

[sdm_download id="1914" fancy="0" button_text="Download"]

Dies ist ein SD-Karten Image für den Raspberry Pi2\. Es ist für 2 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 2 GB-Karte passt ist eine 4 GB die empfohlene Mindestgröße.

Die Micro-SD Karte wird am besten mit dem 
![](img/sd-image-fuer-raspberry-pi2-minimal_icon_link.png)
 [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert.

Das Image wird entpackt und anschließend mit Hilfe des Programms 
![](img/sd-image-fuer-raspberry-pi2-minimal_icon_link.png)
 [Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._

Das Image enthält das RaspBian-ua-netinstall vom 19.08.2015 nach download von 
![](img/sd-image-fuer-raspberry-pi2-minimal_icon_link.png)
 [https://github.com/debian-pi/raspbian-ua-netinst](https://github.com/debian-pi/raspbian-ua-netinst). Zusätzlich wurde noch python und build-essential installiert.

Dieses ist ein minimales RaspBian ohne grafische Oberfläche zur Bedienung über die Konsole.

folgender User ist angelegt:

_**User:**_ root

_**Passwort:**_ raspbian

Weiterhin ist node-js v 0.10.22 installiert sowie natürlich iobroker mit dem js-controller nach Stand vom 19.08.2015

Es sind **alle**<sup>*</sup> Adapter vorinstalliert mithilfe eines shell-scripts _complete.sh_, welches sich im Ordner /root befindet.

Instanzen sind außer für den admin noch nicht angelegt. Für die gewünschten Adapter müssen noch die Instanzen erzeugt und konfiguriert werden.

<sup>*</sup>drei Adapter ließen sich nicht installieren. Diese sind jedoch auch nicht betriebsbereit.