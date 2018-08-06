# Servicemeldungen loggen

Servicemeldungen loggen und Anzahl in einen Datenpunkt schreiben. Dabei werden nur die Meldungen gezählt die tatsächlich aktiv sind. Zu bestätigende Meldungen werden ignoriert.


## Script

<pre class="lang:js decode:true codecontent ">// Servicemeldungen in Datei loggen und Anzahl in einem Datenpunkt erfassen
// Datenpunkt für anzahl der Servicemeldungen
var datenpunkt = "zählen_ServiceMeldungen.Fehler";
// Pfad und Dateiname zum loggen
var logdat = "/opt/iobroker/iobroker-data/servicemeldungen.log";

createState(datenpunkt,  0);
var cntid = getIdByName(datenpunkt);

on(/UNREACH|LOWBAT|CONFIG_PENDING|FAULT_REPORTING$/, function(dp) {
   var val = dp.state.val;
   var old = dp.oldState.val;
   if (val != old) flog(dp.common.name + ": " + val);
   var cnt = getState(cntid).val;
   if(val && !old) cnt++;
   else if (!val && old) cnt--;
   if (cnt < 1 ) { cnt = 0; }
   setState(cntid, cnt);
});

// Logging in Datei

var fs = require('fs');
var fn = logdat;

function flog(txt) {
   var ts = new Date();
   ts = formatDate(ts, "YYYY-MM-DD hh:mm:ss.sss") + " \t";
    fs.appendFileSync(fn, ts + txt + "\n");
}

</pre>