# Sensoroffset korrigieren / Feuchte  und Taupunkt berechnen

Sensorwerte um Offset zu korrigieren, absolute Feuchte und Taupunkt zu berechnen und (inkl. Enthalpie) anzuzeigen


## Script

<pre class="codecontent">// Sensorwerte um Offset korrigieren, abs. Feuchte und Taupunkt berechnen und (inkl. Enthalpie) anzeigen

// Raumkurzname am Anfang des Datenpunktnamen und als JS-Gruppenname
var raum = name.split(".")[2];

// Offsets
var toffset = 0.0; // in K
var rhoffset = 0;  // in %

var tsid = getIdByName(raum + ".WT-Temperatur");
var hsid = getIdByName(raum + ".WT-rel.Feuchte");
var tid = getIdByName(raum + ".Temperatur");
var rhid = getIdByName(raum + ".rel_Feuchte");
var xid = getIdByName(raum + ".Feuchtegehalt");
var dpid = getIdByName(raum + ".Taupunkt");
var aid = getIdByName(raum + ".Klima");

var t = getState(tsid).val + toffset; // Temperatur, korrigiert in °C
var rh = getState(hsid).val + rhoffset; // rel. Feuchte, korrigiert in %
var x;  // Feuchtegehalt in g/kg
var dp; // Taupunkt in °C

var  DP = require('dewpoint');

// 70 m über NN
var xdp = new DP(70); 

function calc() {
    var y = xdp.Calc(t, rh);
    x = y.x;
    dp = y.dp;
    setState(xid, x);
    setState(dpid, dp);
}

function anzeige() {
   // Enthalpie berechnen
    var h = (1.00545 * t + (2.500827 + 0.00185894 * t) * x).toFixed(1) + " kJ/kg";
    var anz = "t: " + t.toFixed(1) + " °C" + '   rH: ' + rh + " %" + '   x: ' + x.toFixed(2) + " g/kg" + '   dp: ' + dp.toFixed(1) + " °C" + '   h: ' + h;
    setState(aid, anz);
}

function klima() {
   calc();
   anzeige();
}

klima(); // Script start

on(tsid, function (dp) {
    t = dp.state.val + toffset; 
    setState(tid, t);
   klima();
});

on(hsid, function (dp) {
    rh = dp.state.val + rhoffset; 
    setState(rhid, rh); 
   klima();
});</pre>