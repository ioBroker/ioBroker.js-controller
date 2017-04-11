
# Adapter - Homepilot

Dieser Adapter verbindet die Rademacher Homepilot Basistation mit ioBroker, um die Rademacher DuoFern Geräte zu steuern.


## Unterstützte Geräte

<table>

<tbody>

<tr>

<th style="width: 10%; text-align: center;">SN#</th>

<th style="width: 90%; text-align: center;">Produktname</th>

</tr>

<tr>

<td style="width: 10%; text-align: center;">40</td>

<td style="width: 90%; text-align: center;">RolloTron Gurtwickler</td>

</tr>

<tr>

<td style="width: 10%; text-align: center;">43</td>

<td style="width: 90%; text-align: center;">Universal-Aktor</td>

</tr>

<tr>

<td style="width: 10%; text-align: center;">46</td>

<td style="width: 90%; text-align: center;">Steckdosen-Zwischenstecker</td>

</tr>

</tbody>

</table>

## Konfiguration

  ![](https://raw.githubusercontent.com/Pix---/ioBroker.homepilot/master/img/homepilotSettingScreenshot.jpg)  

### IP / Port

Die IP Adresse der Homepilot Basisstation im lokalen Netzwerk. Ohne EIngabe verwendet der Adapter homepilot.local. Die Portnummer ist optional und wird nur bei Eingabe einer IP-Adresse berücksichtigt.

* * *

### Synchronisation

Dauer zwischen den Abfragen der Homepilot Basistation durch ioBroker. Die Eingabe ist optional. Standard ist 12s.

* * *

## Datenpunkte

Es gibt zwei Hauptkanäle, einen für die Basisstation und einen für die gefundenen Gerätetypen:

<table style="height: 280px;" width="926">

<tbody>

<tr>

<th>Adapter + Instanz + channels + state</th>

<th>Value</th>

<th>Beschreibung</th>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.station`</td>

<td style="width: 301px;">Kanal</td>

<td style="width: 303px;"><span style="font-size: 10pt;">data on Homepilot station</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.station.ip`</td>

<td style="width: 301px;">Wert, Zeichenkette</td>

<td style="width: 303px;"><span style="font-size: 10pt;">IP Adresse der Station</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.station.UNREACH`</td>

<td style="width: 301px;">Wert, boolean</td>

<td style="width: 303px;"><span style="font-size: 10pt;">true, wenn Zentrale nicht erreichbar</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product`</td>

<td style="width: 301px;">Kanal</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Geräte nach Produktart sortiert</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.json`</td>

<td style="width: 301px;">Wert</td>

<td style="width: 303px;"><span style="font-size: 10pt;">JSON Datei aus Homepilot</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.deviceID.name`</td>

<td style="width: 301px;">Zeichenkette</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Name aus Homepilot</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.deviceID.description`</td>

<td style="width: 301px;">Zeichenkette</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Beschreibung aus Homepilot</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.deviceID.productName`</td>

<td style="width: 301px;">Zeichenkette</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Produktbezeichnung</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.deviceID.hasErrors`</td>

<td style="width: 301px;">Zahl</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Zahl der Fehler</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.deviceID.status_changed`</td>

<td style="width: 301px;">Zahl, Timecode</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Zeitstempel in Unix-Zeit</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.cid`</td>

<td style="width: 301px;">Zeichenkette</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Steuerkommando (vom Nutzer beschreibbar)</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.deviceID.level`</td>

<td style="width: 301px;">Zahl</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Level/Behanghöhe, vom Nutzer beschreibbar</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.deviceID.level_inverted`</td>

<td style="width: 301px;">Zahl</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Level/Behanghöhe invertiert (100-level) für Homematic-ähnliche Darstellung, vom Nutzer beschreibbar</span></td>

</tr>

<tr>

<td style="width: 300px;">`homepilot.0.devices.product.deviceID.state`</td>

<td style="width: 301px;">Boolean (wenn Gerät ein Schalter ist)</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Schaltzustand</span></td>

</tr>

</tbody>

</table>

* * *

## Steuerung

### level / level_inverted

Um die Rollläden aus Javascript, VIS oder z.B. Scenes zu steuern, gibt es zwei Möglichkeiten. Z.B. kann man den Rolladen mit der DeviceID 10002 (zB "Wohnzimmer rechts") steuern, indem der Datenpunkt `homepilot.0.devices.product.10002.level` auf "30" gesetzt wird. `level` ist eine ganze Zahl von 0 bis 100, andere Zahlen/Zeichen werden nicht angenommen. Für ein Darstellung wie beim "Homematic"-System (0% = dunkel/unten, 100% = hell/oben), verwendet man den Datenpunkt `level_inerverted`.

* * *

### Synchronisation

Alternativ können auch die Command ID von Homepilot verwendet werden. Dazu wird einfach der passende Befehl in den Datenpunkt `homepilot.0.devices.product.deviceID.cid` geschrieben. Weiterhin gibt es den Datenpunkt state zur Steuerung / Anzeige von Schaltaktoren (wird nur angelegt, wenn Seriennummern 43 oder 46, Produktname "Universal-Aktor" bzw. "Steckdosenaktor"). Er wird am besten von einem _VIS ctrl state Widget_ mit `true/false` beschrieben. Bei der Steuerung wird `true` in einen level-Wert von 100 übersetzt, `false` wird zu 0\. Diese Befehle sind bisher möglich zur Steuerung über cid in `homepilot.0.devices.product.deviceID.cid`

* * *

## VIS Widgets

### Beispiel Rollläden

<pre class="lang:default decode:true " title="VIS Widget Rollladensteuerung">[{"tpl":"tplValueFloat","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.level","visibility-cond":"==","visibility-val":1,"is_comma":true,"is_tdp":"false","factor":"1","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0","html_append_singular":" %","html_append_plural":" %","name":"RolloTron Percent","label":"{homepilot.0.devices.RolloTronStandard.10002.name}"},"style":{"left":"519px","top":"555px","color":"lightblue","text-align":"right","z-index":"20"},"widgetSet":"basic"},{"tpl":"tplValueLastchange","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.status_changed","visibility-cond":"==","visibility-val":1,"gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"format_date":"DD.MM.YYYY hh:mm:ss"},"style":{"left":"432px","top":"582px","z-index":"20","color":"lightblue","width":"148px","height":"15px","font-size":"80%","text-align":"right"},"widgetSet":"basic"},{"tpl":"tplMetroTileShutter","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.level","visibility-cond":"==","visibility-val":1,"step":"-1","bg_class":"bg-darkCobalt","brand_bg_class":"bg-mauve","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"min":"100","max":"1","oid-working":"homepilot.0.devices.RolloTronStandard.10002.level","name":"Rollotron Metro","label":"{homepilot.0.devices.RolloTronStandard.10002.name}","sliderColor":"","sliderMarkerColor":"","sliderCompleteColor":"#c19fb9"},"style":{"left":"301px","top":"439px","z-index":"15"},"widgetSet":"metro"}]</pre>

Rechts unten ist ein val-number Widget zur Anzeige des Level als Zahl drübergelegt, unter dem Metro Widget ist ein lastchange-Widget, das die letzte Bewegung des Rollladens anzeigt. ![](https://raw.githubusercontent.com/Pix---/ioBroker.homepilot/master/img/homepilot_vis_widgets.jpg) ![](https://raw.githubusercontent.com/Pix---/ioBroker.homepilot/master/img/homepilot_vis_widgets_settings.jpg)

* * *