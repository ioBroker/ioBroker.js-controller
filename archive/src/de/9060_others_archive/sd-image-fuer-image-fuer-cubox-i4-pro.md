# ioBroker Image für Cubox i4 Pro

Hier ist ein SD-Karten Image für die Cubox i4 Pro. Es ist für 4 GB Karten und größer passend. Da es jetzt schon nur gerade nicjht mehr auf eine 2 GB-Karte passt ist eine 4 GB die empfohlene Mindestgröße.

Die SD Karte wird am besten mit dem [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert.

Das Image wird entpackt und anschließend mit Hilfe des Programms [Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._

Das Image enthält das als Betriebssystem [Armbian](http://www.armbian.com/banana-pi/) von Igor Pecovnik mit Debian wheezy.

folgende User sind bereits angelegt:

**User: pi // Passwort: raspberry**

**User: root // Passwort: ioBrokerRoot**

Weiterhin ist node-js in der Version 0.10.22 installiert, sowie natürlich iobroker mit dem js-controller 0.7.11 und dem admin 0.5.9 nach Stand vom 13.09.2015, 17:30

Es sind **alle**<sup>*</sup> Adapter vorinstalliert mithilfe eines shell-scripts _complete.sh_, welches sich im Ordner /root befindet.

Instanzen sind außer für den admin noch nicht angelegt. Für die gewünschten Adapter müssen noch die Instanzen erzeugt und konfiguriert werden.

**Update:**

Da die Entwicklung immer weitergeführt wird, ist die Version evtl. schon veraltet, wenn sie heruntergeladen wird. Als erstes sollte das System auf den neuesten Stand gebracht werden.

Über das Update-Icon im Reiter Adapter oben links wird eine Überprüfung auf neue Versionen gestartet [](http://www.iobroker.net/wp-content/uploads/2015/09/Adapter_updaten.jpg)Anschliessend müssen alle updatefähigen Adapter durch das hinter der Adapterbeschreibung erscheinende Update -Icon upgedated werden. Zuvor sollte aber im reiter Hosts überprüft werden ob der js controller upgedated werden muss. Dieser sollte zuerst auf den neuesten Stand gebracht und danach der RasPi2 neu gestartet werden.

<sup>*</sup>drei Adapter ließen sich nicht installieren. Diese wären jedoch auch nicht betriebsbereit.