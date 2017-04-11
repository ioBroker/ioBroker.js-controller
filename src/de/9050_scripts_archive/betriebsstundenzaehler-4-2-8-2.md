# Abfrage ob Datum  in einem bestimmten Bereich ist

Prüfung eines Datumsbereiches innerhalb eines Skriptes


##  Script

<pre class="lang:js decode:true codecontent">function currentDate2() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addDate(strDate) {
    var date = strDate.split('.');
    var d = currentDate2();
    d.setDate(date[0]);
    d.setMonth(date[1]-1);
    d.setFullYear(date[2]);
    return d;
}
function isDateInRange(strLower, strUpper) {
    var now = new Date();
    var lower = addDate(strLower);
    var upper = addDate(strUpper);
    var inRange = false;
    if (upper > lower) inRange = (now >= lower && now <= upper) ? true : false;
    else log('isDateInRange meldet Fehler! "von"-Datum ist nicht früher als "bis"-Datum', 'error');
    return inRange;
}</pre>