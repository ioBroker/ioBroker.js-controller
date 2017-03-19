
Dieser Adapter liefert den prognostizierten Solarstrom Tagesertrag für eine bestimmte Region. Die Daten kommen von [Solar-Wetter.com](http://www.auswahl-plz-bereich.solar-wetter.com). Bei Eingabe der Leistung der eigenen Solaranlage errechnet der Adapter auch die zu erwartende Energieabgabe der Anlage.


## Konfiguration

[caption id="attachment_2879" align="alignnone" width="600"]![adapter_solarwetter_konfiguration](https://raw.githubusercontent.com/Pix---/ioBroker.solarwetter/master/img/solarwetterSettingScreenshot.jpg) solarwetter Adapter Einstellungen[/caption]

### Standort

Örtlichkeit durch Auswahl des Postleitzahlenbereichs bestimmen Gesamtleistung der eigenen Solaranlage zur Berechnung der Energieerzeugung

### Solaranlage

Hier kann die Gesamtleistung der eigenen Solaranlage zur Bechnung der vorraussichtlich erzeugten Energiemenge eingegeben werden (auch Dezimalzahlen möglich).

* * *

## Aktivierung

Der Adapter startet einmal täglich.

* * *

## Datenpunkte

Folgende Datenpunkte werden vom Adapter bereitgestellt:

<table style="height: 280px;" width="926">

<tbody>

<tr>

<th>Instanz + channel + state</th>

<th>Value</th>

<th>Beschreibung</th>

</tr>

<tr>

<td style="width: 300px;">`solarwetter.0.forecast.clearSky`</td>

<td style="width: 301px;">number</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Ertrag bei klarem Himmel</span></td>

</tr>

<tr>

<td style="width: 300px;">`solarwetter.0.forecast.realSky_min`</td>

<td style="width: 301px;">number</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Mindestertrag bei vorhergesagtem Himmel</span></td>

</tr>

<tr>

<td style="width: 300px;">`solarwetter.0.forecast.realSky_max`</td>

<td style="width: 301px;">number</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Höchstertrag bei vorhergesagtem Himmel</span></td>

</tr>

<tr>

<td style="width: 300px;">`solarwetter.0.forecast.Datum`</td>

<td style="width: 301px;">string, no timestamp</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Datum der Vorhersage (kommt vom Anbieter)</span></td>

</tr>

<tr>

<td style="width: 300px;">`solarwetter.0.forecast.home.clearSky`</td>

<td style="width: 301px;">number</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Ertrag bei klarem Himmel durch die eigene Anlage</span></td>

</tr>

<tr>

<td style="width: 300px;">`solarwetter.0.forecast.home.realSky_min`</td>

<td style="width: 301px;">number</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Mindestertrag bei vorhergesagtem Himmel durch die eigene Anlage</span></td>

</tr>

<tr>

<td style="width: 300px;">`solarwetter.0.forecast.home.realSky_max`</td>

<td style="width: 301px;">number</td>

<td style="width: 303px;"><span style="font-size: 10pt;">Höchstertrag bei vorhergesagtem Himmel durch die eigene Anlage</span></td>

</tr>

</tbody>

</table>