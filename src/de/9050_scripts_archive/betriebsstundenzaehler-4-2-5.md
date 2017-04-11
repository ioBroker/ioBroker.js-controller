# Raumlüftung im Sommer

Lüftungsbedarf abhängig von: - Raumtemperatur - Aussentemperatur - Raumfeuchtigkeit - AussenfeuchtigkeitLüftungsbedarf abhängig von: - Raumtemperatur - Aussentemperatur - Raumfeuchtigkeit - Aussenfeuchtigkeit


## Script

<pre class="lang:js decode:true codecontent  ">// Raumlüftung

// Raumkurzname am Anfang des Datenpunktnamen und als JS-Gruppenname
var raum = name.split(".")[2];

var tiid = getIdByName(raum + ".Temperatur");
var taid = getIdByName("Aussen.Temperatur");
var xiid = getIdByName(raum + ".Feuchtegehalt");
var xaid = getIdByName("Aussen.Feuchtegehalt");
var lid  = getIdByName(raum + ".Lueften");

var ti = getState(tiid).val;  // Raumtemperatur in °C
var ta = getState(taid).val;  // Aussentemperatur in °C
var xi = getState(xiid).val;  // Raumfeuchtegehalt in g/kg
var xa = getState(xaid).val;  // Aussenfeuchtegehalt in g/kg

// Lüftung steuern mit 0,3 g/kg und 0,5 K Hysterese
function lueften() {
   var timin = 21.5;  // minimale Raumtemperatur
   if (xa <= (xi - 0.4) && ta <= (ti - 0.6) && ti >= (timin + 0.5)) setState(lid, true);
   else if (xa >= (xi - 0.1) || ta >= (ti - 0.1) || ti <= timin) setState(lid, false);
}
/* Variante für Keller
function lueften() {
   var timin = 10.0;  // minimale Kellertemperatur
   var timax = 20.0;  // maximale Kellertemperatur
   if (xa <= (xi - 0.4) && ti <= (timax - 0.5) && ti >= (timin + 0.5)) setState(lid, true);
   else if (xa >= (xi - 0.1) || ti >= timax || ti <= timin) setState(lid, false);
} */

lueften();  // Script start

on(xiid, function (dp) {
    xi = dp.state.val;
   lueften();
});

on(xaid, function (dp) {
    xa = dp.state.val;
   lueften();
});

on(tiid, function (dp) {
    ti = dp.state.val;
   lueften();
});

on(taid, function (dp) {
    ta = dp.state.val;
   lueften();
});</pre>