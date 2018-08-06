# Zweipunktregler Heizung

2-Punkt-Regler für die Raumheizung


## Script

<pre class="lang:js decode:true codecontent ">// 2-Punkt-Regler Raumheizung

// Raumkurzname am Anfang des Datenpunktnamen und als JS-Gruppenname
var raum = name.split(".")[2];

// halbe Hysterese in K
var hh = 0.1;

var xid = getIdByName(raum + ".Temperatur");
var wid = getIdByName(raum + ".Sollwert");
var yid = getIdByName(raum + ".Heizen");
var x = getState(xid).val;  // Istwert in °C
var w = getState(wid).val;  // Sollwert in °C

function hys() {
    if (x <= w - hh) setState(yid, true);
    else if (x >= w + hh) setState(yid, false);
}

hys();  // Script start

on(xid, function(dp) {
    x = dp.state.val;
    hys();
});

on(wid, function(dp) {
    w = dp.state.val;
    hys();
});
</pre>