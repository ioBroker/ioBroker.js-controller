# Sonnenstandwinkel berechnen

Sonne Azimut und Elevation in Variablen schreiben um damit Aktionen auszuführen


## Script

<pre class="codecontent ">/* System Sonnenstand

Sonne Azimut und Elevation in Variablen schreiben

erstellt: 06.07.2015 nach ioBroker Forum http://forum.iobroker.net/viewtopic.php?f=21&t=975&sid=6f0ba055de5f82eed6809424f49ca93b#p7635
*/
var suncalc = require('suncalc'),
    result = getObject("system.adapter.javascript.0"),
    lat = result.native.latitude,
    long = result.native.longitude;

createState('Sonnenstand.Elevation', 0, {unit: '°'});
createState('Sonnenstand.Azimut', 0, {unit: '°'});

function Sonnenstand_berechnen () {
    var now = new Date();

    log("-----------------------------------------------");
    log("latitude : " + result.native.latitude,'warn');
    log("longitude: " + result.native.longitude,'warn');

    var sunpos = suncalc.getPosition(now, lat, long);
    log("sunpos: " + sunpos,'warn');

    var h = sunpos.altitude * 180 / Math.PI,
        a = sunpos.azimuth * 180 / Math.PI + 180;

    setState("javascript.0.Sonnenstand.Elevation",h.toFixed(1));
    setState("javascript.0.Sonnenstand.Azimut",a.toFixed());
}

schedule("*/1 * * * *", Sonnenstand_berechnen);
Sonnenstand_berechnen(); // bei Scriptstart</pre>