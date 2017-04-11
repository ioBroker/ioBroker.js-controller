# Image für Banana Pi

Hier ist ein SD-Karten Image für den Banana Pi. Es ist für 2 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 2 GB-Karte passt ist eine 4 GB die empfohlene Mindestgröße.

Die SD Karte wird am besten mit dem SD Formatter mit der Option Size Adjustment „ON“ formatiert.

Das Image wird entpackt und anschließend mit Hilfe des Programms Win32 DiskImager auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus und startet mit dem Button _Write._

Das Image enthält das als Betriebssystem Armbian von Igor Pecovnik mit Debian wheezy.

Bei der ersten Installation wird das Dateisystem automatisch an die Größe der SD-Karte angepasst.

Außerdem wird ein neuer SSH Schlüssel generiert, die Pakete aktualisiert und das Passwort für den User root **muss** geändert werden. Dabei wird der BananaPi ggf. mehrfach neu gestartet.

folgende User sind bereits angelegt:

<table style="height: 128px;" width="275">

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

Weiterhin ist node-js in der Version 0.12.6 installiert, sowie natürlich iobroker mit dem js-controller nach Stand vom 23.09.2015, 14:00

Es sind **alle**<sup>*</sup> Adapter vorinstalliert mithilfe eines shell-scripts _complete.sh_, welches sich im Ordner /root befindet.

Instanzen sind außer für den admin noch nicht angelegt. Für die gewünschten Adapter müssen noch die Instanzen erzeugt und konfiguriert werden.

### **Update:**

Da die Entwicklung immer weitergeführt wird, ist die Version evtl. schon veraltet, wenn sie heruntergeladen wird. Als erstes sollte das System auf den neuesten Stand gebracht werden.

Über das Update-Icon im Reiter Adapter oben links wird eine Überprüfung auf neue Versionen gestartet [](http://www.iobroker.net/wp-content/uploads/2015/09/Adapter_updaten.jpg)Anschliessend müssen alle updatefähigen Adapter durch das hinter der Adapterbeschreibung erscheinende Update -Icon upgedated werden. Zuvor sollte aber im reiter Hosts überprüft werden ob der js controller upgedated werden muss. Dieser sollte zuerst auf den neuesten Stand gebracht und danach der RasPi2 neu gestartet werden.

<sup>*</sup>drei Adapter ließen sich nicht installieren. Diese sind jedoch auch nicht betriebsbereit.