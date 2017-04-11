# PI-Regler Heizung

PI-Regler für die Raumheizung unter Verwendung des npm-Modul "pi-controller"


## Script

<pre class="codecontent">// PI-Regler Raumheizung

// Raumkurzname am Anfang des Datenpunktnamen und als JS-Gruppenname
var raum = name.split(".")[2];

// P-Band in K, Nachstellzeit in s
var Xp = 4;
var Tn = 600;

var xid = getIdByName(raum + ".Temperatur");
var wid = getIdByName(raum + ".Sollwert");
var yid = getIdByName(raum + ".Heizventil");

var  PI = require('pi-controller');

var pi = new PI(Xp, Tn); 
pi.setOutputMax(1.0);   // default: OutputMax = 100

function control() {
  var x = getState(xid).val;  // Istwert in °C
  var w = getState(wid).val;  // Sollwert in °C
  var y = pi.Control(w - x);  // Stellsignal
  setState(yid, y);
}

control();  // Script start
on(xid, control);
on(wid, control);

var timer = null;
if (Tn) {
   timer = setInterval(control, 250 * Tn );
}
else {
   if (timer) {
      clearInterval(timer);
      timer = null;
   }
}</pre>