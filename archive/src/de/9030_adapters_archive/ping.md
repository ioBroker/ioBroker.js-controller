
# Ping

Der ping-Adapter führt in regelmäßigen Abständen einen Ping-Befehl zu den in den EInstellungen hinterlegten IP-Adressen aus. Die Antwort (`true` oder `false`) wird in jeweils einem Datenpunkt gespeichert.




## Installation

Die Installation erfolgt über die Admin Oberfläche.

* * *

## Konfiguration


![](img/ping_Ping-Adapter-Einstellungen.png)


### Ping Intervall

Das Ping-Intervall ist die Zeit, in welchen Abständen die Ping-Abfrage gestartet werden soll. Der Mindestabstand ist 5msec je konfigurierter IP-Adresse.

### IP Adresse für Monitoring / Geräteliste

Mit dem (+) in der unteren linken Ecke können weitere Geräte hinzugefügt werden. In der neuen Zeile werden dann der Name für das Gerät, die Ip-Adresse und der Raum angegeben.

Das Ganze wird mit Anklicken des Hakens bestätigt und die Konfiguration mit _Speichern_ gesichert.

Das Konfigurationsfenster kann dann geschlossen werden.

* * *

## Bedienung

Eine manuelle Bedienung des Adapters findet nicht statt. Gemäß Ping-Intervall werden die konfigurierten Geräte zyklisch abgefragt und der aktuelle Zustand in die Datenpunkte geschrieben.