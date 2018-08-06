
# Adapter - Tankerkönig / Spritpreis

Dieser Adapter liefert die Spritpreise für 10 festgelegte Tankstellen über den JSON Feed der Internetseite [tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about). Die Daten werden in Objekte gespeichert, um in [ioBroker.vis](http://www.iobroker.net/?page_id=2754&lang=de) verarbeitet zu werden. Der Adapter verwendet die Seite prices.php, welche beim Quellserver von tankerkoenig.de durch die gleichzeitige Abfrage vieler Stationen und die Rückgabe von nur wenigen Daten insgesamt sehr viel weniger Datenverkehr verursacht, als die Abfrage über list.php (Umkreissuche) oder detail.php (Einzelabfrage einer Tankstelle). Auf die beiden anderen Formen der Abfrage wurde bewusst verzichtet. Somit ist keine Umkreissuche (zB sortiert nach Preis) und keine Lieferung genauerer Daten (Straße, Marke, Hausnummer, etc.) möglich. Die jeweils günstigste Tankstelle für die drei Spritsorten E5, E10 und Diesel wird vom Adapter selbst ermittelt und in einem separaten Kanal gespeichert.


## Konfiguration

![](https://raw.githubusercontent.com/Pix---/ioBroker.tankerkoenig/master/img/tankerkoenigSettingsScreenshot.jpg) &nbsp

### API Schlüssel

Der API Schlüssel ist auf der Seite von Tankerkönig erhältlich. Die 36stellige Zeichenkette muss hier eingetragen werden.  

### <a id="Tankstellen"></a>Tankstellen

Es können bis zu 10 Tankstellen abgefragt werden. Dazu ist die Eingabe der Tankstellen ID nötig. Die ID für jede Tankstelle erhält man auf tankerkoenig.de. Sie ist ebenfalls 36stellig. Zusätzlich kann ein eigener Name für die Station hinterlegt werden. Bei der Eingabe können Zeilen frei gelassen werden (um später ein weitere Tankstelle einzufügen oder nach dem Löschen einer Station). Bei der Ermittlung der günstigsten Tankstelle für jede einzelne Spritsorte wird bei gleichen Preisen die zuerst gespeicherte Station ausgegeben.

* * *

## Aktivierung

Der Adapter startet alle 5min. Die Daten des Quellfeeds werden vom Server bei tankerkoenig.de nur alle 4min aktualisiert.

* * *

## Datenpunkte

Jeder der zehn Kanäle des Feeds produziert für jede der drei Spritsorten E5, E10 und Diesel jeweils drei Datenpunkte:

*   `feed` (Preis mit drei Dezimalstellen als Number)
*   `short` (Preis mit zwei Dezimalstellen (ungerundet) als String)
*   `3rd` (dritte Dezimalstelle des Preises zur Darstellung der Hochzahl in VIS)
*   `combined` (fertig HTML formatiert mit Preis und hochgestellter dritter Dezimalstelle oder ggf. Öffnungsstatus ["closed"/"not found"] zur einfachen Darstellung mit VIS HTML Widget)

![](https://raw.githubusercontent.com/Pix---/ioBroker.tankerkoenig/master/img/tankerkoenigDP.jpg) Ausserdem werden noch zwei Datenpunkte gespeichert:

*   `status` (Station geöffnet?)
*   `name` (vom Nutzer vergebener Name der Tankstelle)

Zusätzlich werden noch den die günstigsten Tankstellen aus der Liste ermittelt und in diese Kanäle geschrieben :

*   `cheapest.E5`
*   `cheapest.E10`
*   `cheapest.diesel`

Innerhalb dieser Kanäle ist die jeweils günstigste Tankstelle für die genannte Spritsorte angelegt. Bieten mehrere Tankstellen einen Treibstoff zum gleichen Preis an, wird die Station ausgegeben, die in den Einstellungen zuerst/ganz oben eingetragen wurde (siehe [oben](#Tankstellen)). Es werden insgesamt 168 Werte geschrieben.

* * *

## VIS Nutzung

### Widget

Der Datenpunkt **combined** lässt sich in VIS mit diesem Widget darstellen: `[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]`  

### CSS

Der Inhalt des Datenpunktes "combined" wird mit einer CSS-Klasse übergeben. Die Klassen sind `station_open`, `station_closed` und `station_notfound`. Durch die Verwendung von CSS-Definitionen im VIS Editor können so (nicht nur farblich) unterschiedliche Darstellungen für die Zustände "_geöffnet_" (zB normal), "_geschlossen_" (zB rote Schrift) und "_nicht gefunden_" (zB gelbe Schrift) erzielt werden.

<pre class="lang:css decode:true " title="CSS für den Status der Stationen">.station_open {
    color: blue; 
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}</pre>