
Der Adapter liefert das Datum, die Dauer bis zu dessen Datum in Tagen und den Namen des nächsten deutschen Feiertages und gibt Auskunft, ob heute, morgen oder übermorgen ein Feiertag ist.


## Konfiguration

[caption id="attachment_2879" align="alignnone" width="600"]![adapter_feiertage_konfiguration](https://raw.githubusercontent.com/Pix---/ioBroker.feiertage/master/img/SettingScreenshot.jpg) Feiertage Adapter Einstellungen[/caption]

#### Feiertage auswählen

Feiertage, die bei der Befüllung der Datenpunkte berücksichtigt werden sollen, können ausgewählt werden. Für manche Steuerungsaufgaben macht es Sinn, die Feiertage, die naturgemäß auf Sonntag fallen, abzuwählen. Weiterhin können Festtage, die keine gesetzliche Feiertage sind (Heiligabend, Rosenmontag, etc.) ausgewählt werden.

* * *

## Aktivierung

Der Adapter startet nach Aktivierung der Instanz jeden Tag um Mitternacht. Ein häufigeres Starten ist nicht erforderlich, da sich das aktuelle Datum nur einmal täglich ändert.

* * *

## Datenpunkte

Folgende Datenpunkte werden vom Adapter bereitgestellt:

<table style="height: 280px" width="926">

<tbody>

<tr>

<th>Instanz + channel + state</th>

<th>Value</th>

<th>Beschreibung</th>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.heute.boolean`</td>

<td style="width: 301px">`false`/`true`</td>

<td style="width: 303px"><span style="font-size: 10pt">Ist heute ein Feiertag?</span></td>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.heute.Name`</td>

<td style="width: 301px"><span style="font-size: 10pt">z.B. "1\. Weihnachtsfeiertag"</span></td>

<td style="width: 303px"><span style="font-size: 10pt">Name des Feiertags heute</span></td>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.morgen.boolean`</td>

<td style="width: 301px">`false`/`true`</td>

<td style="width: 303px"><span style="font-size: 10pt">Ist morgen ein Feiertag?</span></td>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.morgen.Name`</td>

<td style="width: 301px"><span style="font-size: 10pt">z.B. "2\. Weihnachtsfeiertag"</span></td>

<td style="width: 303px"><span style="font-size: 10pt">Name des Feiertags morgen</span></td>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.uebermorgen.boolean`</td>

<td style="width: 301px">`false`/`true`</td>

<td style="width: 303px"><span style="font-size: 10pt">Ist übermorgen ein Feiertag?</span></td>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.uebermorgen.Name`</td>

<td style="width: 301px"><span style="font-size: 10pt">z.B. ""</span></td>

<td style="width: 303px"><span style="font-size: 10pt">Name des Feiertags übermorgen</span></td>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.naechster.Name`</td>

<td style="width: 301px"><span style="font-size: 10pt">z.B. "Maifeiertag"</span></td>

<td style="width: 303px"><span style="font-size: 10pt">Name des nächsten Feiertags</span></td>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.naechster.Datum`</td>

<td style="width: 301px"><span style="font-size: 10pt">z.B. "01.05.2016"</span></td>

<td style="width: 303px"><span style="font-size: 10pt">Datum des nächsten Feiertags</span></td>

</tr>

<tr>

<td style="width: 300px">`feiertage.0.naechster.Dauer`</td>

<td style="width: 301px"><span style="font-size: 10pt">z.B. "2 Tage"</span></td>

<td style="width: 303px"><span style="font-size: 10pt">Dauer bis zum nächsten Feiertag</span></td>

</tr>

</tbody>

</table>