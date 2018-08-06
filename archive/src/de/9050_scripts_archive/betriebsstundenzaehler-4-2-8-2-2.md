# Abfrage ob Zeit  in einem bestimmten Bereich ist

Prüfung eines Datumsbereiches innerhalb eines Skriptes


## Script

<pre class="lang:js decode:true codecontent ">function currentDate() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addTime(strTime) {
    var time = strTime.split(':');
    var d = currentDate();
    d.setHours(time[0]);
    d.setMinutes(time[1]);
    d.setSeconds(time[2]);
    return d;
}
function isTimeInRange(strLower, strUpper) {
    var now = new Date();
    var lower = addTime(strLower);
    var upper = addTime(strUpper);
    var inRange = false;
    if (upper > lower) {
        // opens and closes in same day
        inRange = (now >= lower && now <= upper) ? true : false;
    } else {
        // closes in the following day
        inRange = (now >= upper && now <= lower) ? false : true;
    }
    return inRange;
}</pre>