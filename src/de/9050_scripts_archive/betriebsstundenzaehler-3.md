# Betriebsstundenzähler und Verbrauchsrechner

Zählt die Einschaltzeit von beliebigen Objekten, summiert die Zeiten und legt sie nach Perioden ab. Ermittelt Verbräuche für Strom, Öl, Gas, Wasser etc und rechnet um in beliebige Einheiten wie Liter, kg, kWh, Euro etc. Zählt  Schaltvorgänge Berechnet gleitende Durschnittswerte Berechnet Minimum und Maximum Werte Loggt Datenänderungen


## Script

<pre class="codecontent">/*..........Betriebsstundenzaehler BSZ Extended Version 0.96
............Datum: 04.02.2016
............Autor: Looxer01
............Forum ioBroker
............http://forum.iobroker.com/posting.php?mode=post&f=21&sid=b3b2a31dae55081fedaf0ad9c8d74acd
............Änderungshistorie
............Version 0.25    Fehler in der  update core Funktion behoben. Eine neue Spalte "refresh" hinzugefügt. (noch ohne Funktion)
............................Das soll spaeter dazu dienen, ein komplettes Set von Variablen zu loeschen und bei "true" und bei "false " neu zu erstellen
............Version 0.30    Logging ist implementiert und kann aktiviert werden - hISTORY ist implementiert und kann aktiviert werden fuer Monat und Jahr
............................Im Rahmen der History funktion wurde die freie Bezeichnung entfernt, da  sie nirgendwo im Programm genutzt wurde
............................Refresh variable ist einstellbar. Vorläufige Funktion: Updates werden ignoriert falls auf true
............Version 0.40    Periodenabschluss (Nullen - Historiensicherung) und Refresh mit Nullung ueberarbeitet- Fehlerbeseitigung
............Version 0.60    Implementierung weiterer Methoden wie DELTA, CALC, ADD, SUB  Verallgemeinerung der Routinen um ggf weitere Methoden zu implementieren
............Version 0.70    Die Datenpunkte werden jetzt nicht  zurückgesetzt sondern  geloescht, wenn das loeschkennzeichen gesetzt wird
............................bei der Berechnung der Methoden  ist ein Divisor eingefügt worden um leichter von Millisekunden auf Verbrauchswerte zu rechnen, oder auch für alternative Darstellungen für Zeitwerte
............................DELTAM - Methode hinzugefügt um automatische Tankmessungen zu unterstützen (absteigende gemeldete Werte)
............................Zusammenführung der Methoden ADD und SUB in TIME.  Das wird durch die Anwendung der Rechenregel auch für TIME gemacht. Damit kann bei negativen faktor SUB - also Bestandsrechnung umgesetzt werden
............................Auch kann jederzeit von Darstellung DDDD:HH:MM:SS auf Sekunden/Minuten/Stunden/Tage etc durch Umrechnung umgestellt werden
............................Durch Tabelle specials kann eingestellt werden, ob der BSZ für einen Datenpunkt auf ack = true oder false reagieren soll (false sitzt i.d.R. bei selbsdefinierten Datenpunkten)
............................Die Anzal der möglichen IDs ist auf 26 erhöht
............................Eine Fluktuationsgrenze für Delta und deltaM ist in Tabelle special eingefügt. Bei blank(also '')  wird 100 angenommen. Damit können Schwankungen von Messgeraeten ausgeglichen werden (i.d.R sollte 100 ausreichend sein)
............................Zur Vermeidung von Eingabefehlern in den Tabellen sind Zahlen in hochkomma erlaubt aber auch Zahlen ohne hochkomma- bei der Angabe von status true/false ist ebenfalls beides möglich
............................Es besteht die Möglichkeit eine Individuallogik einzubauen. Beispiel ist hier "oekofen". Der gemessene Wert wird vor Anwendung der Rechenregel an die function individual(funktion,nummer,runtime) gegeben. 
............................wobei funktion = Name der Individual-Funktion / nummer = nummer des Geraetes aus der ersten Tabelle / runtime = gemessener Wert und Rückgabewert (damit wird der gemessene Wert uebersteuert)
............................Tabelle special Nummer 10 eingefügt zur Vorbereitung einer gleitenden Durchschnittsberechnung
............................Es wurden Reserveplätze für tabelle specials eingefügt (10 und 11).
............................Logging fuer die Aenderung von Datenpunkten wurde erneuert
............Version 0.90    Funktion zur gleitenden Durchschnittsberechnung für die Methoden hinzugefügt
----------------------------History verlegt unterhalb des Status (level 7)
............................Die Perioden starten jetzt mit 1-Day, 2-Week, 3-Month, 4-Year und sind damit nicht mehr kompatibel zu den Vorgängerversionen. Allerdings sind die Namen einstellbar unterhalb der Experteneinstellungen
............................Schedule Funktion für Methoden Delta,DeltaM und CALC hinzugefügt
............................Alle Lesevorgänge wurden in numerische Werte umgewandelt um die Aenderung in den Objekten zu unterstützen (Nummern werden dort als String gespeichert)
............................initial Werte fuer die GruppenTab unabhängig von Gross-und Kleinschreibung gemacht
............................Wenn kein Wert in Gruppen Position 2 eingetragen ist, dann wird der name des Geraetes / Datenpunktes als default verwendet
............................Falls der Datenpunkt in Gruppen Position1 nicht existiert wird eine logeintrag erzeugt und der Wert wird auf INITIAL gesetzt
............................Fehlerkorrektur für Monats/Jahreswechsel
............Version 0.95    Selective Logging hinzugefügt. (Bewirkt das logging von Datenpunkten in separaten Dateien)
.................................Wegen Selective Logging muss die Tabelle special um ein Feld erweitert werten und für die Logging-Dateinamen in Expert-Einstellungen muss ".csv" entfernt werden
............................Korrektur für den Fall, dass ein Status mehrfach gemeldet wird und damit kein Wechsel erfolgte. Bisher wurde immer ab der letzten Statusmeldung gemessen (TIME)
.................................Wegen MehrfachStatus  muss die Tabelle special um ein Feld erweitert werten 
............................Minimum und Maximum Funktion für alle Methoden implementiert
.................................Wegen MINMAX-Funktion  muss die Tabelle special um ein Feld erweitert werten 
............................Fehler beim anlegen der Struktur für Durschnittsbildung beseigt. Der Jahreswert wurde nicht angelegt
...........Version 0.96.....Beim Periodenwechsel Woche kam es zu einem Fehler durch fehlerhafte Parameterübergabe zum Logging

*/

// Part 1\. Initiierung
// Part 1.1 Einstellungen
/* HIER Einstellungen vornehmen............................................................................................
--------------------------------------------------------------------------------------------
Position 1 = ist die Geraete-ID bzw Objekt ID - bitte nur gültige objekte eintragen - Es funktionieren alle LEVEL und STATE Geraete und alles was mit true und false belegt werden kann
.............der Text "initial" muss eingetragen sein fuer nicht genutzte Zeilen
Position 2 = der Thema unter dem die Betriebszeiten in ioBroker abgelegt werden. - keine Sonderzeichen und keine Spaces verwenden. Statdessen aber Unterstriche eintragen
Position 3 = History, Bei true werden die zeitabschnitte Monat und Jahr vor der Loeschung per Monat und Jahr gesichert (in ioBroker objekte)
Position 4 = Variable DAY wird angelegt und kumuliert - täglicher refresh       - keine Hochkomma
Position 5 = Variable WEEK wird angelegt und kumuliert - wöchentlicher refresh  - keine Hochkomma
Position 6 = Variable MONTH wird angelegt und kumuliert - monatlicher refresh   - keine Hochkomma
Position 7 = Variable YEAR wird angelegt und kumuliert - Jährlicher refresh     - keine Hochkomma
Position 8 = Verwendung eines Zaehlers um die Statuswechsel (anzahl Schaltungen) zu zaehlen
Position 9 = entweder ein Status wie true false etc ODER Sonderfunktionen
.............bei LEVEL Geraeten eine Zahl zwischen 0 und 100 - Empfehlung 1\. Bedeutet alle Level groesser gleich 1 werden als EIN gewertet
.............delta  = Deltamessung einer Zahl (hochzählen) zwischen letztem Wert und aktuellem Wert und fortschreibung dieser Zahl in die Zeitabschnitte (Anwendung z.B. Strommessung)
.............deltam = Delta Minusmessung. wie delta aber die erwarteten Zahlen nehmen staendig ab
.............calc   =  Umwandlung von Boolean Werte durch Anwendung einer Formel oder Zeitmessung und Umwandlung der gemessenen Zeit
...................... Lokikwerte (true/false) werden umgerechnet in 0 und 1 und können z.B. mit Addition zu anderen Werten gerechnet werden (dient zur graphischen Darstellung)
.............Alle Funktionen können mit Rundung versehen werden und mit Faktoren um z.B. den Energieverbrauch zu berechnen (öl und Pellet) oder umrechnen in Euro oder von Wh in KWh etc (Tabelle special)
Position 9 - 18 - Eingabe was gezaehlt werden soll. Jeder Eintrag erzeugt eine variable in den Objekten. Sobald ein Status des Homematic-ID gesetzt wird, wird die Zeit bzw. die Anzahl der Schaltvorgaenge gespeichert
                    Status kann  in hochkomma anagegeben werden z.B. '100' oder 100\.  
                    Als eingeschaltet wird alles groesser gleich dem eingegebenen Wert berechnet
                    (bei Sonderfunktionen werden die positionen 10 - 18 ignoriert)
Position 19 = stop Refresh = true  Es werden kene  Daten mehr aktualsieirt. Solange Refresh auf true steht werden keine neuen Daten aufgezeichnet - standard ist also false
Position 20 = Loesch Datenpunkte = True   Es werden alle Daten geloescht - standard ist also false - damit geloescht wird muss auch stop refresh auf true stehen

*/
var Gruppen = [];
//              1.Homematic ID,                    2.Thema(no spaces)                    3.History  4.DAY  5.Week  6.Month 7.Year  8.Switch   9 - 18 Status to log                                                         19.stop 20.Loesch
Gruppen[ 0]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 1]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 2]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 3]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 4]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 5]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 6]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 7]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 8]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[ 9]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[10]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[11]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[12]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[13]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[14]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[15]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[16]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[17]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[18]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[19]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[20]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[21]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[22]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[23]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[24]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //
Gruppen[25]  = ['initial'                                ,''                                 ,false  ,false  ,false  ,false  ,false  ,false  ,''      ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,''     ,false ,false]; //

/*-------------------------------------------------------------------------------

Die folgende Tabelle dient zur Vergabe von Statusnamen zur besseren Lesbarkeit. Standard ist EIN
Die ziffern im Array z.B. [0] korrespondieren mit der Gruppentabelle also Gruppen[0] gehört zu logname[0]
Wird hier kein Feldname vergeben, dann wird Spalte 9-18 der Gruppentabelle als Feldname verwendet
Beispiel: Zustand Lampe = EIN ,
Beispiel: Status 1 =Start, 2 =  Heizung_Zuendung,3 = Softstart 4 = Heizung_Brennen, 5 = Heizung_Nachlauf etc
ACHTUNG- keine spaces verwenden */
var logname = [];
//              Stat1           Stat2       Stat3       Stat4               Stat5       Stat6       Stat7       Stat8   Stat9   Stat10
logname[0]  =   ['EinAus0'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[1]  =   ['EinAus1'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[2]  =   ['EinAus2'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[3]  =   ['EinAus3'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[4]  =   ['EinAus4'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[5]  =   ['EinAus5'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[6]  =   ['EinAus6'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[7]  =   ['EinAus7'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[8]  =   ['EinAus8'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[9]  =   ['EinAus9'      ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[10] =   ['EinAus10'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[11] =   ['EinAus11'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[12] =   ['EinAus12'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[13] =   ['EinAus13'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[14] =   ['EinAus14'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[15] =   ['EinAus15'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[16] =   ['EinAus16'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[17] =   ['EinAus17'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[18] =   ['EinAus18'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[19] =   ['EinAus19'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[20] =   ['EinAus20'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[21] =   ['EinAus21'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[22] =   ['EinAus22'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[23] =   ['EinAus23'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[24] =   ['EinAus24'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];
logname[25] =   ['EinAus25'     ,''         ,''         ,''                 ,''         ,''         ,''         ,''     ,''     ,''];

/*
Tabelle "special"   :   hier werden Rechenregeln und Sonderfunktionen hinterlegt
Pos1 Rundung auf Nachkommastellen
Pos2 Addition1 mit dem angegebenen Wert erfolgt vor der Multiplikation mit dem Faktor aus Pos3
Pos3 = Faktor für die Multiplikationen - Ein Faktor kann nur sinnvoll eingegeben werden, wenn zu diesem Zeitpunkt alle Werte auf Null stehen.
.......Der Faktor kann nicht null sein. In diesem Fall wird 1 angenommen.
.......Also entweder bei der Neueinrichtung bzw ein Refresh ist aller Werte ist erforderlich
Pos4 = Divisor um den Faktor lesbar zu machen z.B. Millisekunden Divisor für Sekunde = 1000 , Minute = 60000, Stunde = 3600000
.......Die Rechnung ist Faktor/Divisor / Wenn Divisor = blank oder 0, dann wird 1 angenommen
Pos5 = Addition2 mit dem angegebenen Wert erfolgt nach der Multiplikation mit dem Faktor aus Pos3
.......Formel: y=((x+add1)*faktor/divisor)+add2  / y = Ergebnis - x = eigehender Wert aus dem überwachten Datenpunkt
.......y wird in die Indivduallogik geschickt um weiter zu berechnen
Pos6 ist vorgesehen, um Funktionen im Programm zu definieren die dann aufgerufen werden - Programmierung ist erforderlich
Pos7 nur fuer Methode Delta und DeltaM - bei Tanksensoren/Energiesensoren kommt es haeufig zu Schwankungen plus und minus - Hier wird die Grenze bestimmt bei der ein Tankvorgang sicher angenommen werden kann z.B. 100 Liter differenz
......der Wert muss in der gemessenen Einheit angegeben werden. Z.B. Ultraschallsensoren senden in Liter. Dann ist die Zahl, die hier eingegeben werden muss ebenfalls Liter. Wenn nichts angegeben wird, dann wird 100 angenommen
Pos8.. Sonderfall, wenn unter Gruppe(0) ein Datenpunkt eingetragen wurde der nicht nach update eine Bestaetigung (ack) erhaelt. In diesem Fall sollte 8 auf false stehen
Pos9 =Wenn ein gleitender Durchschnitt berechnet werden soll, dann wird hier true eingetragen  (noch nicht aktiviert)
Pos10 = Zählschwelle für Durchschnittsberechnung. TIME in Millisekunden (bei einer Einschaltzeit unter der Angabe hier wird der Wert nicht in die Durchschnittsberechnung einbezogen)
........Umrechnugnen anhand von addition1 faktor, divisor und addition2 werden dabei nicht berücksichtigt
Pos11 =  Alternativ zum Auslösen bei Veränderung lassen sich hier Zeiten eingeben an denen die Erfassung des Zustandes der zu loggenden Datenpunkte erfolgt.
.........format ist CRON. Beispiele: alle 10 Minuten =  * /10 * * * *  (leerzeichen vor "/"" bitte entfernen) täglich um 12 Uhr = 0 12 * * * -
.........alle 2 Stunden = 0 * /2 * * * etc (leerzeichen vor "/"" bitte entfernen)
.........mit der folgenden Web-Seite können die Zeiten generiert werden:        http://crontab-generator.org/
.........Zur Ueberpruefung von Cron Expessions bietet sich diese Website an:    http://crontab.guru/
.........Das ist nicht fuer die Methode TIME sinnvoll und ist daher ausgeschaltet, falls ein schedule fuer TiME eingegeben wurde
Pos12 =  Logging für diesen Datenpunkt wird eingeschaltet, wenn ein true eingetragen wird. Damit werden Minimum und Maximum Werte festgehalten
Pos13 =  Mehrfachstatus loggen ? dann true. In diesem Fall wird ein Status auch dann gesetzt, wenn bereits der gleiche Status vorher gesetzt wurde.
         das hat zur Folge, dass z.B. die Zeitmessung neu gestartet wird, obwohl der Status im Grunde nicht geändert wurde. Standard ist false
Pos14 =  Selective Logging - Wenn auf true, dann wird dieser Datenpunkt in einer dedizierten Datei geloggt

*/

var special = [];
//             1.Round 2.add1   3.Faktor                4\. Divisor  5.add2  6.Individuallogik  7: DELTA(M)Grenze    8.Warten auf Bestaetigung  9.Durchschnitt - 10.Zaehlschwelle     11 Schedule    12\. Min/MAX     13\. MehrfachStatus  14\. Selektives Logging
special[0]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 , ''     ]; 
special[1]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[2]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[3]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[4]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[5]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 , ''     ];
special[6]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[7]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[8]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[9]  =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[10] =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[11] =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[12] =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ]; 
special[13] =   [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[14]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[15]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[16]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[17]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[18]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[19]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 , ''     ];
special[20]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[21]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[22]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[23]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[24]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];
special[25]  =  [''     ,''     ,''                     ,''         ,''     ,''                 ,''                 ,''                         ,''             ,''             ,''                 ,''             ,''                 ,''      ];

// Es werden zur angegebenen Uhrzeit die Kumulationsvariablen bei beginn einer neuen Periode genullt (DAY,WEEK,MONTH,YEAR)
// Zu dieser Zeit werden auch die Monatswerte und Jahreswerte gesichert falls History auf true steht
var TimeSetStunde   = "00";     // Bitte Uhrzeit - hier Stunde eingeben im 24 Stunden Format z.B. 00 für Mitternacht
var TimeSetMinute   = "04";     // Bitte Minuten eingeben z.B. 10 - = 00:10 für Null Uhr Zehn

// logging in eine exterene EXCEL Datei - hier werden alle updates gesichert - wird vor allem zum debugging benoetigt Empfehlung false fuer produktiven Betrieb
var logflag     = false;     // wenn auf true dann wird das logging in Datei /opt/iobroker/iobroker-data/BSZLog.csv eingeschaltet bei false vice versa
// logging in eine exterene EXCEL Datei - hier werden alle Zeitabschnitte vor der Nullung gesichert - Empfehlung true  fuer produktiven Betrieb
var Timelogflag = false;     // wenn auf true dann wird das logging in Datei /opt/iobroker/iobroker-data/BSZTimeLog.csv eingeschaltet bei false vice versa

// fuer OSX und Windows MUSS der volle  Pfad eingestellt werden (wenn die log flags auf true stehen)
// Beispiel: /Users/looxer01/Documents/iobroker/iobroker-data/BSZLog.csv
var LogPath = "/opt/iobroker/iobroker-data/BSZExtLog.csv";             // Pfad und Dateiname des externen Logs
var TimeLogPath = "/opt/iobroker/iobroker-data/BSZExtTimeLog.csv";     // Pfad und Dateiname des externen Logs für die Zeitabschnitte täglich, wöchentlich monatlich jährlich

// Ende Einstellungen .......................................................................................................

// Experten-Einstellungen .......................................................................................................
// die beiden Variablen regeln das abspeichern der ioBroker Variablen. Unter diesem Pfad sind sie in ioBroker javascript.0\. zu finden

var sysLocation     = "BSZ.System";              // Speicherort der Systemvariablen
var countLocation   = "BSZ.Counter";             // Speicherort der Counter Variablen (Klartext Betriebszeiten)#

// Die Periodenwerte werden damit im Text angeplasst , Achtung - damit werden zusätzliche Elemente angelegt - Vorhandene Elemente werden NICHT geändert
// Die Ziffern sorgen für die richtige Sortierung
var PeriodeDay      = "1-DAY";              // Benennung der Perioden in der Datenstruktur
var PeriodeWeek     = "2-WEEK";             // Benennung der Perioden in der Datenstruktur
var PeriodeMonth    = "3-MONTH";            // Benennung der Perioden in der Datenstruktur
var PeriodeYear     = "4-YEAR";             // Benennung der Perioden in der Datenstruktur

/* Ende Experten-Einstellungen .......................................................................................................
--------------------------------------------------------------------------------------------------------------------------------------*/

// Part 1.2 Allgemeine Variablen
// Start des Programmablaufs bevor Trigger aufgerufen werden

var SpaceChk = new RegExp(/\s/);            // pattern um zu pruefen ob eine IDGruppe blanks enthaelt
var fs = require('fs');                     // enable write fuer externes log
var string = " ";                           // Logstring
var logtext=" " ;                           // Kommentar im log
var FormTimeKum = "000:00:00:00";           // kumulierte Betriebsstunden im Format ddd:hh:mm:ss
var FormTimeSingle  = "000:00:00:00";       // kumulierte Betriebsstunden im Format ddd:hh:mm:ss
var currSec = 0;                            // aktuelle Zeit in Millisekunden
var GeraeteName = " ";                      // Bezeichnung des Geraetes
var GeraeteStatus = " ";                    // Geraetestatus z.B. true / false
var timediff = 0;                           // Variable Betriebszeit in MSec von letzter Einschaltzeit bis curren Ausschaltzeit
var newkumtime = 0;                         // Variable neue berechnete kumulirete Zeit in MSec
var LastMSec     = 0;                       // Variable letzte Einschaltzeit in MSec
var LastKumSec   = 0;                       // Variable letzte kumulierte Zeit in MSec
var DayKum = 0;                             // Rechenvariable taegliche kumulierte Werte
var WeekKum = 0;                            // Rechenvariable woechentliche kumulierte Werte
var MonthKum = 0;                           // Rechenvariable monatliche kumulierte Werte
var YearKum = 0;                            // Rechenvariable jaehrliche kumulierte Werte
var FormTimeDAY     = "000:00:00:00";       // Rechenvariable taegliche formatierte Werte
var FormTimeWEEK    = "000:00:00:00";       // Rechenvariable woechentliche formatierte Werte
var FormTimeMONTH   = "000:00:00:00";       // Rechenvariable moantliche formatierte Werte
var FormTimeYEAR    = "000:00:00:00";       // Rechenvariable jaehrliche  formatierte Werte
var cronjob = TimeSetMinute + " " + TimeSetStunde +" * * *";  // Cron Schedule setzen
var action = " ";                           // actiontext fuer Log

var objGruppe   = " ";                      // die iobroker bwz. HM  object ID
var objMSec     = " ";                      // BSZ.SystemGrp00.MSec
var objKum      = " ";                      // BSZ.SystemGrp00.Kum
var objTime     = " ";                      // BSZ.Counter.Feldname
var objSwitch   = " ";                      // BSZ.Counter.Feldname   

var OnIdTAB = new Array([Gruppen.length]);        // onID Tabelle fuer die Auslösung bei Änderung (wurde benötigt, um die schedule funktion zum Laufen zu bringen)

// Part 1.2 Aufbereitung der Tabellen mit Plausibilitaetspruefung, Default Werten, Umwandlungen von Werten von Char to Num etc
// Aufbauen der Variablentabellen zur Übergabe and die Berechnungsfunktion (Geraetupdate)
// umwandeln von bool txt in real bool
// umwandeln von zahlen txt in real zahlen
// dient zur sicheren Behandlung von "false " versus false und delta versus DELTA
var GrpSystem = [];
var zaehler2 = 0;
var spaltenzaehler;
var compare;
for (var zaehler = 0,                                                                               // Loop über das Array
             zaehler_array = Gruppen.length;                                                        // entsprechend der Anzahl der Eintragungen
             zaehler < zaehler_array; zaehler++) { // addiere eins für jeden Druchgang zaehler2 = addZero(zaehler).zero2; // fuehrende Null // zusammenbauen von // /BSZ/SYSTEM/GRP00KUM = Kumulierte nicht umgerechnete Werte // /BSZ/SYSTEM/GRP00MSEC = Letzter Wert (z.B. einschaltzeit) // /BSZ/SYSTEM/GRP00AKU = Kumulierter Wert für Durchschnittsberechnung // /BSZ/SYSTEM/GRP00ASW = Anzahl Schaltungen für Durchschnittsberechnung GrpSystem[zaehler] = [sysLocation + '.Grp' + zaehler2 + 'MSec', // Eintrag Systemstruktur Zeitstempel oder uvneränderte Werte sysLocation + '.Grp' + zaehler2 + 'Kum', // Eintrag Systemstruktur Kumulationswerte countLocation + "." + Gruppen[zaehler][1], // Eintrag Counterstruktur sysLocation + '.Grp' + zaehler2 + 'AKU', // Eintrag Systemstruktur Durchschnittsfunktion sysLocation + '.Grp' + zaehler2 + 'ASW', // Eintrag Systemstruktur Durchschnittsfunktion sysLocation + '.Grp' + zaehler2 + 'MIN', // Eintrag Systemstruktur Minimumfuntion sysLocation + '.Grp' + zaehler2 + 'MAX', // Eintrag Systemstruktur Maximumfunktion ]; // Erzeuge Eintragung ins Array if(Gruppen[zaehler][0] === '') { // in Gruppen Pos1 ist nichts eingetragen Gruppen[zaehler][0] = "INITIAL"; } if(Gruppen[zaehler][0].toUpperCase() === "INITIAL") { Gruppen[zaehler][0] = Gruppen[zaehler][0].toUpperCase(); } else { if (ObjectExists(Gruppen[zaehler][0]) === false) { Gruppen[zaehler][0]= "INITIAL"; // Objekt existiert nicht, dann auf INITIAL setzen } // endif nicht INITIAL } // endif es ist INITIAL if(Gruppen[zaehler][0].toUpperCase() !== "INITIAL" && Gruppen[zaehler][1] === '') { // nicht initial und kein Thema vergeben Gruppen[zaehler][1] = getObject(objGruppe).common.name; // Auslesen der Bezeichnung des Geraetes und ersetzen als Thema (default) } if(Gruppen[zaehler][18] === true && Gruppen[zaehler][19] === false) { // updates ist off geschaltet Gruppen[zaehler][0] = "INITIAL"; } compare = Gruppen[zaehler][8].toUpperCase(); if(compare !== "DELTA" && compare !== "DELTAM" && compare !== "CALC") { special[zaehler][10] = ''; // Bei Methode TIME ist kein schedule zulässig } OnIdTAB[zaehler] = Gruppen[zaehler][0]; // ab in die onID Tabelle if(special[zaehler][10] === '') { special[zaehler][10]= "0 5 31 2 *"; // Verhindern, dass der Job jemals ausgeführt wird. oder am 31.02\. :) } else { OnIdTAB[zaehler] = "INITIAL"; } if(Gruppen[zaehler][8] === '' && Gruppen[zaehler][0] !== "INITIAL") { // Wenn Datenpunkt nicht INITIAL ist und nichts im ersten Status (8) steht, dann wird true angenommen Gruppen[zaehler][8] = true; } // endif true setzen fuer time methode if(special[zaehler][6] === '') { // Wenn keine fluktuationstoleranz gesetzt ist, dann wird 100 angenommen (wird nur verwendet für delta und deltam) special[zaehler][6] = 100; } if(special[zaehler][8] === '') { // Durchschnittsbildung aktiv ? special[zaehler][8] = false; } else { special[zaehler][8] = true; } if(special[zaehler][9] !== '') { special[zaehler][9] = Number(special[zaehler][9]); // Umwandeln des Schwellwertes für die Durchschnittsbildung in eine Zahl } if(special[zaehler][11] === '') { // Minimum / Maximum aktiv ? special[zaehler][11] = false; } else { special[zaehler][11] = true; } if(special[zaehler][12] === '') { // DoppelstatusMeldungen ignorieren aktiv ? special[zaehler][12] = false; } else { special[zaehler][12] = true; } if(special[zaehler][13] === '') { // selective logging aktiv ? special[zaehler][13] = false; // kein Eintrag, dann kein logging } else { if(Number(special[zaehler][13]) > 0) {                                                       // ist eine Zahl eingetragen worden =
       } else {                                                                                     // wenn keine Zahl, dann sollen Logs nicht zusammengefasst werden
         special[zaehler][13] = true;       
       }
    }
    for (  spaltenzaehler = 2; spaltenzaehler < 20; spaltenzaehler++) {                              // alle true und false texte in boolean umwandeln fr die Gruppentabelle    
        compare = Gruppen[zaehler][spaltenzaehler];
        if( typeof(compare) == "string") {
            compare = compare.toUpperCase();
            if(compare === "TRUE") {
                Gruppen[zaehler][spaltenzaehler] = true;
            } // endif true
            if(compare === "FALSE") {
                Gruppen[zaehler][spaltenzaehler] = false;
            } // endif true
            if(compare === "DELTA" || compare === "DELTAM" || compare === "CALC") {
                Gruppen[zaehler][spaltenzaehler] = Gruppen[zaehler][spaltenzaehler].toUpperCase();  
            } // endif compare
//        log("Gruppentabelle " + zaehler + " " + spaltenzaehler + " " + Gruppen[zaehler][spaltenzaehler],"info");
        } // endif type ist string
    } // endfor spaltenzaehler Gruppen

   for (  spaltenzaehler = 0; spaltenzaehler < 8; spaltenzaehler++) {                                           // alle nummern als text in zahlen umwandeln falsch wert nicht INITIAL        
        if(spaltenzaehler === 5) { continue; }                                                                  // Spalte 5 ist text
        if(spaltenzaehler === 7) {                                                                              // Soll onID auch ohne ack aufgerufen werden ?    
            if(special[zaehler][7] === 'false' ||  special[zaehler][7] === false) {                             // ist es false ?
                    special[zaehler][7] = false;
                    continue;
            } else {                                                                                            // sonst ist es true
                    special[zaehler][7] = true;
                    continue;
            }  //endif ermittlung des boolean
        } //  endif es spalte 8 der special tabelle 
        if( special[zaehler][spaltenzaehler] !== '') {
           special[zaehler][spaltenzaehler] = Number(special[zaehler][spaltenzaehler]);
        }

    } // endfor spaltenzaehler special
//   log("nummer " + zaehler + " Gruppe20 " + Gruppen[zaehler][20] + " Gruppe0 " + Gruppen[zaehler][0] + " special " +  special[zaehler][10] + " onidvar " + OnIdTAB[zaehler],"info");
} // Ende FOR

// Part 1.3 Anlegen oder Loeschen von Datenpunkten
// Anlegen der Variablen falls notwendig und loeschen wenn eingestellt
CreateDelStates();                             // Anlegen der Variablen in ioBroker

// Part 1.4 Definition der Trigger und schedule aufgrund der Einstellungstabellen
// ------------------------T R I G G E R -------------------------------------------------------

on({id:  OnIdTAB[0 ], valNe: 1000 }, function(obj)    { if(special[0][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 0 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 0 ); } } });    // ende on id
on({id:  OnIdTAB[1 ], valNe: 1000 }, function(obj)    { if(special[1][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 1 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 1 ); } } });    // ende on id
on({id:  OnIdTAB[2 ], valNe: 1000 }, function(obj)    { if(special[2][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 2 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 2 ); } } });    // ende on id
on({id:  OnIdTAB[3 ], valNe: 1000 }, function(obj)    { if(special[3][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 3 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 3 ); } } });    // ende on id
on({id:  OnIdTAB[4 ], valNe: 1000 }, function(obj)    { if(special[4][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 4 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 4 ); } } });    // ende on id
on({id:  OnIdTAB[5 ], valNe: 1000 }, function(obj)    { if(special[5][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 5 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 5 ); } } });    // ende on id
on({id:  OnIdTAB[6 ], valNe: 1000 }, function(obj)    { if(special[6][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 6 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 6 ); } } });    // ende on id
on({id:  OnIdTAB[7 ], valNe: 1000 }, function(obj)    { if(special[7][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 7 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 7 ); } } });    // ende on id
on({id:  OnIdTAB[8 ], valNe: 1000 }, function(obj)    { if(special[8][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 8 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 8 ); } } });    // ende on id
on({id:  OnIdTAB[9 ], valNe: 1000 }, function(obj)    { if(special[9][7] === true) {  if (obj.state.ack)  {   GeraetUpdate( 9 );  } } else {  if(obj.state.ack === false)  { GeraetUpdate( 9 ); } } });    // ende on id
on({id:  OnIdTAB[10], valNe: 1000 }, function(obj)    { if(special[10][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(10);  }  }else {  if(obj.state.ack === false)  { GeraetUpdate(10); } } });    // ende on id
on({id:  OnIdTAB[11], valNe: 1000 }, function(obj)    { if(special[11][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(11);  }  }else {  if(obj.state.ack === false)  { GeraetUpdate(11); } } });    // ende on id
on({id:  OnIdTAB[12], valNe: 1000 }, function(obj)    { if(special[12][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(12);  }  }else {  if(obj.state.ack === false)  { GeraetUpdate(12); } } });    // ende on id
on({id:  OnIdTAB[13], valNe: 1000 }, function(obj)    { if(special[13][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(13);  }  }else {  if(obj.state.ack === false)  { GeraetUpdate(13); } } });    // ende on id
on({id:  OnIdTAB[14], valNe: 1000 }, function(obj)    { if(special[14][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(14);  }  }else {  if(obj.state.ack === false)  { GeraetUpdate(14); } } });    // ende on id
on({id:  OnIdTAB[15], valNe: 1000 }, function(obj)    { if(special[15][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(15);  }  }else {  if(obj.state.ack === false)  { GeraetUpdate(15); } } });    // ende on id
on({id:  OnIdTAB[16], valNe: 1000 }, function(obj)    { if(special[16][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(16);  }  }else {  if(obj.state.ack === false)  { GeraetUpdate(16); } } });    // ende on id
on({id:  OnIdTAB[17], valNe: 1000 }, function(obj)    { if(special[17][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(17);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(17); } } });    // ende on id
on({id:  OnIdTAB[18], valNe: 1000 }, function(obj)    { if(special[18][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(18);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(18); } } });    // ende on id
on({id:  OnIdTAB[19], valNe: 1000 }, function(obj)    { if(special[19][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(19);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(19); } } });    // ende on id
on({id:  OnIdTAB[20], valNe: 1000 }, function(obj)    { if(special[20][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(20);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(20); } } });    // ende on id
on({id:  OnIdTAB[21], valNe: 1000 }, function(obj)    { if(special[21][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(21);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(21); } } });    // ende on id
on({id:  OnIdTAB[22], valNe: 1000 }, function(obj)    { if(special[22][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(22);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(22); } } });    // ende on id
on({id:  OnIdTAB[23], valNe: 1000 }, function(obj)    { if(special[23][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(23);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(23); } } });    // ende on id
on({id:  OnIdTAB[24], valNe: 1000 }, function(obj)    { if(special[24][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(24);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(24); } } });    // ende on id
on({id:  OnIdTAB[25], valNe: 1000 }, function(obj)    { if(special[25][7] === true) {  if (obj.state.ack)  {   GeraetUpdate(25);  } } else {  if(obj.state.ack === false)  { GeraetUpdate(25); } } });    // ende on id

schedule(special[0][10], function() {   log("schedule 0 aufgerufen","info");GeraetUpdate(0);     }); // end of schedule                                
schedule(special[1][10], function() {   log("schedule 1 aufgerufen","info"); GeraetUpdate(1);     }); // end of schedule        
schedule(special[2][10], function() {   log("schedule 2 aufgerufen","info"); GeraetUpdate(2);     }); // end of schedule        
schedule(special[3][10], function() {   log("schedule 3 aufgerufen","info"); GeraetUpdate(3);     }); // end of schedule        
schedule(special[4][10], function() {   log("schedule 4 aufgerufen","info"); GeraetUpdate(4);     }); // end of schedule        
schedule(special[5][10], function() {   log("schedule 5 aufgerufen","info");GeraetUpdate(5);     }); // end of schedule        
schedule(special[6][10], function() {   log("schedule 6 aufgerufen","info");GeraetUpdate(6);     }); // end of schedule        
schedule(special[7][10], function() {   log("schedule 7 aufgerufen","info");GeraetUpdate(7);     }); // end of schedule        
schedule(special[8][10], function() {   log("schedule 8 aufgerufen","info");GeraetUpdate(8);     }); // end of schedule        
schedule(special[9][10], function() {   log("schedule 9 aufgerufen","info");GeraetUpdate(9);     }); // end of schedule        
schedule(special[10][10], function() {  log("schedule 10 aufgerufen","info"); GeraetUpdate(10);     }); // end of schedule        
schedule(special[11][10], function() {  log("schedule 11 aufgerufen","info"); GeraetUpdate(11);     }); // end of schedule        
schedule(special[12][10], function() {  log("schedule 12 aufgerufen","info"); GeraetUpdate(12);     }); // end of schedule        
schedule(special[13][10], function() {  log("schedule 13 aufgerufen","info"); GeraetUpdate(13);     }); // end of schedule        
schedule(special[14][10], function() {  log("schedule 14 aufgerufen","info"); GeraetUpdate(14);     }); // end of schedule        
schedule(special[15][10], function() {  log("schedule 15 aufgerufen","info");GeraetUpdate(15);     }); // end of schedule        
schedule(special[16][10], function() {  log("schedule 16 aufgerufen","info"); GeraetUpdate(16);     }); // end of schedule        
schedule(special[17][10], function() {  log("schedule 17 aufgerufen","info"); GeraetUpdate(17);     }); // end of schedule        
schedule(special[18][10], function() {  log("schedule 18 aufgerufen","info"); GeraetUpdate(18);     }); // end of schedule        
schedule(special[19][10], function() {  log("schedule 19 aufgerufen","info");GeraetUpdate(19);     }); // end of schedule        
schedule(special[20][10], function() {  log("schedule 20 aufgerufen","info");GeraetUpdate(20);     }); // end of schedule        
schedule(special[21][10], function() {  log("schedule 21 aufgerufen","info");GeraetUpdate(21);     }); // end of schedule        
schedule(special[22][10], function() {  log("schedule 22 aufgerufen","info");GeraetUpdate(22);     }); // end of schedule        
schedule(special[23][10], function() {  log("schedule 23 aufgerufen","info"); GeraetUpdate(23);     }); // end of schedule   
schedule(special[24][10], function() {  log("schedule 24 aufgerufen","info"); GeraetUpdate(24);     }); // end of schedule        
schedule(special[25][10], function() {  log("schedule 25 aufgerufen","info");GeraetUpdate(25);     }); // end of schedule        

// Part 3 Taegliches Zuruecksetzen der Datenpunkte aufgrund von Periodenwechsel DAY,WEEK,MONTH,YEAR
// ------------------------Aenderung des Status des Geraetes------------------------------------
//-------------------------Beim Einschalten wird die Zeit festgehalten -------------------------
//-------------------------Beim Ausschalten wird die Zeitdifferenz berechnet und gespeichert----
schedule(cronjob, function() {   PeriodChange();   });  

// ------------------------ F U N K T I O N E N -------------------------------------------------------

// Part 1.4.1 Vorbereiten zum Anlegen/Löschen von Datenpunkten
//-----------------------------------------------------------------------------------------------------
// Funktion zum Anlegen der Variablen im System
//-----------------------------------------------------------------------------------------------------
function CreateDelStates(){
    var zaehlerstatus = 0;
    var method = "TIME";
    for (var zaehler = 0,
        zaehler_array = Gruppen.length;
        zaehler < zaehler_array;
        zaehler++) {
        zaehler2 = addZero(zaehler).zero2;
        if (Gruppen[zaehler][0] === "INITIAL") { continue; }                                                    // Check Gueltigkeit object

        for    ( zaehlerstatus = 8; zaehlerstatus < 18; zaehlerstatus++) { // Spalte 8 - 18 fuer die Gruppentabelle entspriche logname -8 if (Gruppen[zaehler][zaehlerstatus] === '') { continue; } //Status is INITIAL if (method !== "TIME" && zaehlerstatus > 8)  {
                break;                                                                                          // Multiple Status werden nur gebraucht fuer TIME Objekte
            }
            method = "TIME";  
            if (Gruppen[zaehler][8] === 'DELTA') {       
                method = "DELTA";
            }
            if (Gruppen[zaehler][8] === 'DELTAM') {       
                method = "DELTAM";
            }
            if (Gruppen[zaehler][8] === 'CALC') {       
                method = "CALC";
            }

// Status fuer die Methoden anlegen
            CreateDelStateSingle(zaehler,zaehlerstatus,method,"none","none");                                   // anlegen fuer alle methods (ausser hostory und switch ) bis zum statuslevel

// Status fuer die system struktur anlegen
            if (Gruppen[zaehler][3] === true) {                                                                 // soll eine DAY kumulations Variable angelegt werden ?
             CreateDelStateSingle(zaehler,zaehlerstatus,method,"SYSTEM","day");                                        // anlegen fuer die System Struktur Periode
            }      // endif Summierung soll angelegt werden
            if (Gruppen[zaehler][4] === true) {                                                                 // soll eine week kumulations Variable angelegt werden ?
             CreateDelStateSingle(zaehler,zaehlerstatus,method,"SYSTEM","week");                                        // anlegen fuer die System Struktur Periode
            }      // endif Summierung soll angelegt werden
            if (Gruppen[zaehler][5] === true) {                                                                 // soll eine month kumulations Variable angelegt werden ?
            CreateDelStateSingle(zaehler,zaehlerstatus,method,"SYSTEM","month");                                        // anlegen fuer die System Struktur Periode
            }      // endif Summierung soll angelegt werden
            if (Gruppen[zaehler][6] === true) {                                                                 // soll eine year kumulations Variable angelegt werden ?
             CreateDelStateSingle(zaehler,zaehlerstatus,method,"SYSTEM","year");                                        // anlegen fuer die System Struktur Periode
            }      // endif Summierung soll angelegt werden

// Methoden Struktur (ausser history und Status anlegen / loeschen)

           if (Gruppen[zaehler][3] === true) {                                                                 // soll eine DAY kumulations Variable angelegt werden ?
                 CreateDelStateSingle(zaehler,zaehlerstatus,method,"none","day");
            }      // endif Summierung soll angelegt werde
            if (Gruppen[zaehler][4] === true) {                                                                 // soll eine week kumulations Variable angelegt werden ?
                CreateDelStateSingle(zaehler,zaehlerstatus,method,"none","week");
            }      // endif Summierung soll angelegt werde
            if (Gruppen[zaehler][5] === true) {                                                                 // soll eine month kumulations Variable angelegt werden ?
                CreateDelStateSingle(zaehler,zaehlerstatus,method,"none","month");
            }      // endif Summierung soll angelegt werde
           if (Gruppen[zaehler][6] === true) {                                                                 // soll eine year kumulations Variable angelegt werden ?
                CreateDelStateSingle(zaehler,zaehlerstatus,method,"none","year");
            }      // endif Summierung soll angelegt werde

 // Switch Stuktur anlengen / loeschen
            if (Gruppen[zaehler][7] === true ) {                                                                 // Soll auch eine Switch Variable angelegt werden
                CreateDelStateSingle(zaehler,zaehlerstatus,"none","SWITCH","none");
                if (Gruppen[zaehler][3] === true) {                                                               // soll eine DAY kumulations Variable angelegt werden ?               
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","SWITCH","day");                     
                }
                if (Gruppen[zaehler][4] === true) {                                                               // soll eine week kumulations Variable angelegt werden ?               
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","SWITCH","week");                     
                }
               if (Gruppen[zaehler][5] === true) {                                                               // soll eine month kumulations Variable angelegt werden ?               
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","SWITCH","month");                     
                }
               if (Gruppen[zaehler][6] === true) {                                                               // soll eine year kumulations Variable angelegt werden ?               
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","SWITCH","year");                     
                }
             } // endif Switch Variablen anzulegen ?

// Durchschnittsberechnung - Struktur anlegen
            if (special[zaehler][8] === true ) {                                                                    // Anlegen der Day Average 
                CreateDelStateSingle(zaehler,zaehlerstatus,"none","AVERAGE","none");        
                if (Gruppen[zaehler][3] === true) {                                                                 // Anlegen der Day Average 
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","AVERAGE","day");                   
                }
                 if (Gruppen[zaehler][4] === true) {                                                                // Anlegen der Day Average 
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","AVERAGE","week");                   
                }           
                if (Gruppen[zaehler][5] === true) {                                                                 // Anlegen der Day Average 
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","AVERAGE","month");                   
                }
                if (Gruppen[zaehler][6] === true) {                                                                 // Anlegen der Day Average 
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","AVERAGE","year");                   
                }
            } // endif Durschnittsbewertung aktiv

// Min/MAX - Struktur anlegen
            if (special[zaehler][11] === true ) {                                                                    // Anlegen MINMAX 
                CreateDelStateSingle(zaehler,zaehlerstatus,"none","MINMAX","none");        
                if (Gruppen[zaehler][3] === true) {                                                                 // Anlegen der Day MINMAX 
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","MINMAX","day");                   
                }
                 if (Gruppen[zaehler][4] === true) {                                                                // Anlegen der Week MINMAX 
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","MINMAX","week");                   
                }           
                if (Gruppen[zaehler][5] === true) {                                                                 // Anlegen der Month MINMAX 
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","MINMAX","month");                   
                }
                if (Gruppen[zaehler][6] === true) {                                                                 // Anlegen der Year MINMAX 
                    CreateDelStateSingle(zaehler,zaehlerstatus,"none","MINMAX","year");                   
                }
            } // endif MINMAX aktiv

// History Struktur anlegen/ loeschen
            if (Gruppen[zaehler][2] === true && Gruppen[zaehler][5] === true) {                                 // Anlegen der Monats History Werte das laufende Jahr wenn Monatskumulation und Historie angeschaltet
                CreateDelStateSingle(zaehler,zaehlerstatus,method,"HISTORY","month");                           
                if(special[zaehler][8] === true) {                                                                // Durchschnittsfunktion ist aktiv   
                    CreateDelStateSingle(zaehler,zaehlerstatus,"AVERAGE","HISTORY","month");                             
                }
                if(special[zaehler][11] === true) {                                                                // MINMAX ist aktiv   
                    CreateDelStateSingle(zaehler,zaehlerstatus,"MINMAX","MINMAX","month");                             
                }
            }

            if (Gruppen[zaehler][2] === true && Gruppen[zaehler][6] === true) {                                 // Anlegen der Jahres  History Werte das laufende Jahr wenn Jahreskumulation und Historie angeschaltet          
                CreateDelStateSingle(zaehler,zaehlerstatus,method,"HISTORY","year");                   
                if(special[zaehler][8] === true) {                                                                // Durchschnittsfunktion ist aktiv   
                    CreateDelStateSingle(zaehler,zaehlerstatus,"AVERAGE","HISTORY","year");                             
                }
                if(special[zaehler][11] === true) {                                                                // MINMAX ist aktiv   
                    CreateDelStateSingle(zaehler,zaehlerstatus,"AVERAGE","HISTORY","year");                             
                }
            }  

        } // Ende FOR Statuszaheler
    } // Ende FOR    Gruppenzaehler

}  // ende Funktion

// Part 1.4.2 Ausführen Anlegen/Löschen von Datenpunkten
//-----------------------------------------------------------------------------------------------------
// Funktion zum Anlegen der Variablen im System - hier Statusinformationen
//-----------------------------------------------------------------------------------------------------

function CreateDelStateSingle(zeile,spalte,method,funktion,periode) {
// Zeile = Zeile der Gruppentabelle 
// spalte = spalte der Gruppentabelle (status)
// method = alle Methoden
// funktion =  Funktionen Switch, Average, history
// periode = day week month year oder none
    var actionDel = false;
    if (Gruppen[zeile][19] === true && Gruppen[zeile][18] === true) {                                            // wenn actionDel = true dann soll geloescht werden
        actionDel = true;
    }
    if (actionDel === false &&  Gruppen[zeile][18] === true) {                                                    // kein loeschen aber auch nicht anlegen da Refresh auf gestoppt gesetzt
        return;
    }                                   

    var statusname = Gruppen[zeile][spalte];
    if (logname[zeile][spalte-8] !== '') {                                                                      // Gibt es einen Status in der logname tabelle  ? wenn ja merken mit vorrang
        statusname = logname[zeile][spalte-8];
    } 
    if (statusname === '' ) { return; }

    var pathCount   = countLocation + '.'       + Gruppen[zeile][1];                                            // BSZ.Counter.Thema
    var pathSysM    = sysLocation   + '.Grp'    + addZero(zeile).zero2  + 'MSec.' + statusname;
    var pathSysK    = sysLocation   + '.Grp'    + addZero(zeile).zero2  + 'Kum.'  +  statusname;
    var pathCLevel3;                                                                                            //BSZ.Counter.Thema.Type.Status
    var pathHistM;                                                                                              // BSZ.Counter.Thema.Status.History.Month
    var pathHistY;                                                                                              // BSZ.Counter.Thema.Status.History.Year
    var pathCLevel4; 
    var pathCLevel4b;    
    var pathsysaku;
    var pathsysasw; 
    var pathsysmin;                                                                                             // Minimum path
    var pathsysmax;                                                                                             // Maximum path

    var year =   new Date().getFullYear();
    var month =  addZero(new Date().getMonth()+1).zero2;                                                        // aktueller Monat
    var yearvor =new Date().getFullYear()-1;                                                                    // Jahr fuer die Historyfortschreibung - also Vorjahr

//  die Methodenstuktur und systemstruktur   anlegen
    if(funktion === "none" && periode === "none" ) {                                                            // Hier werden nur die Status der types angelegt (ohne perioden)
        pathCLevel3 = pathCount     + "."  + method  + "." + statusname;                                        //BSZ.Counter.Thema.Type.Status    
        if (actionDel === false) { 
                createState(pathSysM    ,  0);                                                                  // Anlegen systemeintrag msec
                createState(pathSysK    ,  0);                                                                  // anlegen systemeintrag kum
                createState(pathCLevel3 ,  0);      
        } else {
                ObjectExistsDelState(pathSysM   );                                                              // loeschen systemeintrag msec
                ObjectExistsDelState(pathSysK   );                                                              // loeschen systemeintrag kum
                ObjectExistsDelState(pathCLevel3);                                                              // loeschen counteintrag oberster level   
        } // endif del
    }

// die perioden der methodenstruktur anlegen
    if(periode === 'day' && funktion === "none") { 
        pathCLevel4  = pathCount     + "." + method + "." + statusname + "."+PeriodeDay;                      //BSZ.Counter.Thema.Type.Status
        pathCLevel4b = pathCount     + "." + method + "." + statusname + "."+PeriodeDay+".BEFORE";                        //BSZ.Counter.Thema.Type.Status
        if (actionDel  === false) { 
            createState(pathCLevel4 ,   0);
            createState(pathCLevel4b,   0);
          } else {
            ObjectExistsDelState(pathCLevel4 );
            ObjectExistsDelState(pathCLevel4b);
        } // endif del
    }  // endif periode

    if(periode === 'week' && funktion === "none") { 
        pathCLevel4  = pathCount     + "." + method + "." + statusname + "."+PeriodeWeek;                      //BSZ.Counter.Thema.Type.Status
        pathCLevel4b = pathCount     + "." + method + "." + statusname + "."+PeriodeWeek+".BEFORE";                        //BSZ.Counter.Thema.Type.Status
        if (actionDel  === false) { 
            createState(pathCLevel4 ,   0);
            createState(pathCLevel4b,   0);
          } else {
            ObjectExistsDelState(pathCLevel4);
            ObjectExistsDelState(pathCLevel4b);
         } // endif del
    }  // endif periode 

    if(periode === 'month' && funktion === "none") { 
        pathCLevel4  = pathCount     + "." + method + "." + statusname + "."+PeriodeMonth;                      //BSZ.Counter.Thema.Type.Status
        pathCLevel4b = pathCount     + "." + method + "." + statusname + "."+PeriodeMonth+".BEFORE";                        //BSZ.Counter.Thema.Type.Status
         if (actionDel  === false) { 
            createState(pathCLevel4 ,   0);
            createState(pathCLevel4b,   0);
        } else {
            ObjectExistsDelState(pathCLevel4 );
            ObjectExistsDelState(pathCLevel4b);
          } // endif del
    }  // endif periode

    if(periode === 'year' && funktion === "none") { 
        pathCLevel4  = pathCount     + "." + method + "." + statusname + "."+PeriodeYear;                      //BSZ.Counter.Thema.Type.Status
        pathCLevel4b = pathCount     + "." + method + "." + statusname + "."+PeriodeYear+".BEFORE";                        //BSZ.Counter.Thema.Type.Status
       if (actionDel  === false) {  
            createState(pathCLevel4 ,   0);
            createState(pathCLevel4b,   0);
        } else {
        ObjectExistsDelState(pathCLevel4 );
        ObjectExistsDelState(pathCLevel4b);
        } // endif del
    }  // endif periode

  // die perioden der systemstrktur anlegen
    if(funktion === "SYSTEM" && periode === "day" ) {                                                           // Anlegen der Perioden fuer die Systemstruktur- hier day
         pathSysK = pathSysK + "."+PeriodeDay;    
         if (actionDel  === false) { 
            createState(pathSysK    ,   0);  
        } else {
             ObjectExistsDelState(pathSysK    );              
       } // endif del
    }
    if(funktion === "SYSTEM" && periode === "week" ) {
         pathSysK = pathSysK + "."+PeriodeWeek;    
         if (actionDel  === false) { 
            createState(pathSysK    ,   0);  
        } else {
             ObjectExistsDelState(pathSysK    );              
       } // endif del
    }

    if(funktion === "SYSTEM" && periode === "month" ) {
         pathSysK = pathSysK + "."+PeriodeMonth;    
         if (actionDel  === false) { 
            createState(pathSysK    ,   0);  
        } else {
             ObjectExistsDelState(pathSysK    );              
       } // endif del
    }
    if(funktion === "SYSTEM" && periode === "year" ) {
         pathSysK = pathSysK + "."+PeriodeYear;    
         if (actionDel  === false) { 
            createState(pathSysK    ,   0);  
        } else {
             ObjectExistsDelState(pathSysK    );              
       } // endif del
    }

// Switch Struktur anlegen inkl Perioden
    if(funktion === "SWITCH" && periode === "none") {
        pathCLevel3 = pathCount + "." + "SWITCH" + "." + statusname;                                        //BSZ.Counter.Thema.Type.Status
        if (actionDel === false) { 
            createState(pathCLevel3 ,  0);      
        } else {
            ObjectExistsDelState(pathCLevel3);                                                              // loeschen counteintrag oberster level   
        } // endif del    
    }
    if(funktion === "SWITCH" && periode === "day") {
        pathCLevel4  = pathCount + "." +  "SWITCH" + "." + statusname + "."+PeriodeDay;                           //BSZ.Counter.Thema.Type.Status
        pathCLevel4b = pathCount + "." +  "SWITCH" + "." + statusname + "."+PeriodeDay+".BEFORE";                 //BSZ.Counter.Thema.Type.Status
        if (actionDel === false) { 
            createState(pathCLevel4 ,  0);      
            createState(pathCLevel4b,   0);
        } else {
            ObjectExistsDelState(pathCLevel4);                                                              // loeschen counteintrag oberster level   
            ObjectExistsDelState(pathCLevel4b);
        } // endif del    
    }
    if(funktion === "SWITCH" && periode === "week") {
        pathCLevel4  = pathCount + "." + "SWITCH" + "." + statusname + "."+PeriodeWeek;                           //BSZ.Counter.Thema.Type.Status
        pathCLevel4b = pathCount + "." + "SWITCH" + "." + statusname + "."+PeriodeWeek+".BEFORE";                 //BSZ.Counter.Thema.Type.Status
        if (actionDel === false) { 
            createState(pathCLevel4 ,  0);  
            createState(pathCLevel4b,   0);
        } else {
            ObjectExistsDelState(pathCLevel4);                                                              // loeschen counteintrag oberster level   
            ObjectExistsDelState(pathCLevel4b);
        } // endif del    
    }
    if(funktion === "SWITCH" && periode === "month") {
        pathCLevel4  = pathCount + "." + "SWITCH" + "." + statusname + "."+PeriodeMonth;                           //BSZ.Counter.Thema.Type.Status
        pathCLevel4b = pathCount + "." + "SWITCH" + "." + statusname + "."+PeriodeMonth+".BEFORE";                 //BSZ.Counter.Thema.Type.Status
        if (actionDel === false) { 
            createState(pathCLevel4 ,  0);      
            createState(pathCLevel4b,   0);
        } else {
            ObjectExistsDelState(pathCLevel4);                                                              // loeschen counteintrag oberster level   
            ObjectExistsDelState(pathCLevel4b);
        } // endif del    
    }
    if(funktion === "SWITCH" && periode === "year") {
        pathCLevel4  = pathCount + "." + "SWITCH" + "." + statusname + "."+PeriodeYear;                           //BSZ.Counter.Thema.Type.Status
        pathCLevel4b = pathCount + "." + "SWITCH" + "." + statusname + "."+PeriodeYear+".BEFORE";                 //BSZ.Counter.Thema.Type.Status
        if (actionDel === false) { 
            createState(pathCLevel4 ,  0);     
            createState(pathCLevel4b,   0);
        } else {
            ObjectExistsDelState(pathCLevel4);                                                              // loeschen counteintrag oberster level 
            ObjectExistsDelState(pathCLevel4b);
        } // endif del    
    }

// Anlegen der History Stuktur unterhalb der Methoden
    if(funktion === "HISTORY") { 
        pathHistM   = pathCount  + "."  + method + "." + statusname + ".HISTORY"+ "."+PeriodeMonth +".";                               // BSZ.Counter.Thema.Status.History.Month
        pathHistY   = pathCount  + "."  + method + "." + statusname + ".HISTORY"+ "."+PeriodeYear  +".";                               // BSZ.Counter.Thema.Status.History.Month
        if (periode === "month") {       
            for    (  i = 1; i <= 12; i++) { month = addZero(i).zero2; // Monat mit führender null if (actionDel === false) { createState(pathHistM + year + month, 0); // alle Monate des jahres anlegen } else { ObjectExistsDelState(pathHistM + year + month); // alle Monate des jahres loeschen } // endif del } // endfor if (actionDel === false) { createState(pathHistM + yearvor + "12", 0); // letzten Monat vor Jahreswechsel anlegen } else { ObjectExistsDelState(pathHistM + yearvor + "12"); //letzten Monat vor Jahreswechsel loeschen } // endif del } // endif month if (periode === "year") { if (actionDel === false) { createState(pathHistY + year, 0); //Jahr anlegen createState(pathHistY + yearvor, 0); //Vorjahr anlegen } else { ObjectExistsDelState(pathHistY + year); //Jahr loeschen ObjectExistsDelState(pathHistY + yearvor); //Vorjahr loeschen } // endif del } // endif year } // endif history // Anlegen der Struktur AVERAGE - Durchschnittsberechnung if(funktion === "AVERAGE" && periode === "none") { pathCLevel3 = pathCount + "." + "AVERAGE" + "." + statusname; //BSZ.Counter.Thema.Type.Status pathsysaku = GrpSystem[zeile][3]+ "." + statusname; pathsysasw = GrpSystem[zeile][4]+ "." + statusname; if (actionDel === false) { createState(pathCLevel3 , 0); createState(pathsysaku , 0); createState(pathsysasw , 0); } else { ObjectExistsDelState(pathCLevel3); // loeschen counteintrag oberster level ObjectExistsDelState(pathsysaku); // loeschen durchschnitt system oberster level ObjectExistsDelState(pathsysasw); // loeschen durchschnitt oberster level } // endif del } if(funktion === "AVERAGE" && periode === "day") { pathCLevel4 = pathCount + "." + "AVERAGE" + "." + statusname+ "."+PeriodeDay; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "AVERAGE" + "." + statusname + "."+PeriodeDay+".BEFORE"; //BSZ.Counter.Thema.Type.Status pathsysaku = GrpSystem[zeile][3]+ "." + statusname+ "."+PeriodeDay; pathsysasw = GrpSystem[zeile][4]+ "." + statusname+ "."+PeriodeDay; if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysaku , 0); createState(pathsysasw , 0); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysaku); // loeschen durchschnitt system oberster level ObjectExistsDelState(pathsysasw); // loeschen durchschnitt oberster level } // endif del } if(funktion === "AVERAGE" && periode === "week") { pathCLevel4 = pathCount + "." + "AVERAGE" + "." + statusname+ "."+PeriodeWeek; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "AVERAGE" + "." + statusname + "."+PeriodeWeek+".BEFORE"; //BSZ.Counter.Thema.Type.Status pathsysaku = GrpSystem[zeile][3]+ "." + statusname+ "."+PeriodeWeek; pathsysasw = GrpSystem[zeile][4]+ "." + statusname+ "."+PeriodeWeek; if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysaku , 0); createState(pathsysasw , 0); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysaku); // loeschen durchschnitt system oberster level ObjectExistsDelState(pathsysasw); // loeschen durchschnitt oberster level } // endif del } if(funktion === "AVERAGE" && periode === "month") { pathCLevel4 = pathCount + "." + "AVERAGE" + "." + statusname+ "."+PeriodeMonth; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "AVERAGE" + "." + statusname + "."+PeriodeMonth+".BEFORE"; //BSZ.Counter.Thema.Type.Status pathsysaku = GrpSystem[zeile][3]+ "." + statusname+ "."+PeriodeMonth; pathsysasw = GrpSystem[zeile][4]+ "." + statusname+ "."+PeriodeMonth; if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysaku , 0); createState(pathsysasw , 0); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysaku); // loeschen durchschnitt system oberster level ObjectExistsDelState(pathsysasw); // loeschen durchschnitt oberster level } // endif del } if(funktion === "AVERAGE" && periode === "year") { pathCLevel4 = pathCount + "." + "AVERAGE" + "." + statusname+ "."+PeriodeYear; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "AVERAGE" + "." + statusname + "."+PeriodeYear+".BEFORE"; //BSZ.Counter.Thema.Type.Status pathsysaku = GrpSystem[zeile][3]+ "." + statusname+ "."+PeriodeYear; pathsysasw = GrpSystem[zeile][4]+ "." + statusname+ "."+PeriodeYear; if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysaku , 0); createState(pathsysasw , 0); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysaku); // loeschen durchschnitt system oberster level ObjectExistsDelState(pathsysasw); // loeschen durchschnitt oberster level } // endif del } // Anlegen der Struktur MINMAX - Minimum Maximum if(funktion === "MINMAX" && periode === "none") { pathCLevel3 = pathCount + "." + "MINIMUM" + "." + statusname; //BSZ.Counter.Thema.Type.Status pathsysmin = GrpSystem[zeile][5]+ "." + statusname; pathsysmax = GrpSystem[zeile][6]+ "." + statusname; if (actionDel === false) { createState(pathCLevel3, 0); createState(pathsysmin); } else { ObjectExistsDelState(pathCLevel3); // loeschen counteintrag oberster level ObjectExistsDelState(pathsysmin); // loeschen durchschnitt system oberster level } // endif del pathCLevel3 = pathCount + "." + "MAXIMUM" + "." + statusname; //BSZ.Counter.Thema.Type.Status if (actionDel === false) { createState(pathCLevel3 , 0); createState(pathsysmax); } else { ObjectExistsDelState(pathCLevel3); // loeschen counteintrag oberster level ObjectExistsDelState(pathsysmax); // loeschen durchschnitt oberster level } // endif del } if(funktion === "MINMAX" && periode === "day") { pathCLevel4 = pathCount + "." + "MINIMUM" + "." + statusname+ "."+PeriodeDay; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "MINIMUM" + "." + statusname + "."+PeriodeDay+".BEFORE"; //BSZ.Counter.Thema.Type.Status pathsysmin = GrpSystem[zeile][5]+ "." + statusname+ "."+PeriodeDay; pathsysmax = GrpSystem[zeile][6]+ "." + statusname+ "."+PeriodeDay; if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysmin); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysmin); // loeschen durchschnitt system oberster level } // endif del pathCLevel4 = pathCount + "." + "MAXIMUM" + "." + statusname+ "."+PeriodeDay; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "MAXIMUM" + "." + statusname + "."+PeriodeDay+".BEFORE"; //BSZ.Counter.Thema.Type.Status if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysmax); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysmax); // loeschen durchschnitt oberster level } // endif del } if(funktion === "MINMAX" && periode === "week") { pathCLevel4 = pathCount + "." + "MINIMUM" + "." + statusname+ "."+PeriodeWeek; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "MINIMUM" + "." + statusname + "."+PeriodeWeek+".BEFORE"; //BSZ.Counter.Thema.Type.Status pathsysmin = GrpSystem[zeile][5]+ "." + statusname+ "."+PeriodeWeek; pathsysmax = GrpSystem[zeile][6]+ "." + statusname+ "."+PeriodeWeek; if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysmin); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysmin); // loeschen durchschnitt system oberster level } // endif del pathCLevel4 = pathCount + "." + "MAXIMUM" + "." + statusname+ "."+PeriodeWeek; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "MAXIMUM" + "." + statusname + "."+PeriodeWeek+".BEFORE"; //BSZ.Counter.Thema.Type.Status if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysmax); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysmax); // loeschen durchschnitt oberster level } // endif del } if(funktion === "MINMAX" && periode === "month") { pathCLevel4 = pathCount + "." + "MINIMUM" + "." + statusname+ "."+PeriodeMonth; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "MINIMUM" + "." + statusname + "."+PeriodeMonth+".BEFORE"; //BSZ.Counter.Thema.Type.Status pathsysmin = GrpSystem[zeile][5]+ "." + statusname+ "."+PeriodeMonth; pathsysmax = GrpSystem[zeile][6]+ "." + statusname+ "."+PeriodeMonth; if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysmin); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysmin); // loeschen durchschnitt system oberster level } // endif del pathCLevel4 = pathCount + "." + "MAXIMUM" + "." + statusname+ "."+PeriodeMonth; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "MAXIMUM" + "." + statusname + "."+PeriodeMonth+".BEFORE"; //BSZ.Counter.Thema.Type.Status if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysmax); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysmax); // loeschen durchschnitt oberster level } // endif del } if(funktion === "MINMAX" && periode === "year") { pathCLevel4 = pathCount + "." + "MINIMUM" + "." + statusname+ "."+PeriodeYear; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "MINIMUM" + "." + statusname + "."+PeriodeYear+".BEFORE"; //BSZ.Counter.Thema.Type.Status pathsysmin = GrpSystem[zeile][5]+ "." + statusname+ "."+PeriodeYear; pathsysmax = GrpSystem[zeile][6]+ "." + statusname+ "."+PeriodeYear; if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysmin); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysmin); // loeschen durchschnitt system oberster level } // endif Del pathCLevel4 = pathCount + "." + "MAXIMUM" + "." + statusname+ "."+PeriodeYear; //BSZ.Counter.Thema.Type.Status pathCLevel4b = pathCount + "." + "MAXIMUM" + "." + statusname + "."+PeriodeYear+".BEFORE"; //BSZ.Counter.Thema.Type.Status if (actionDel === false) { createState(pathCLevel4 , 0); createState(pathCLevel4b, 0); createState(pathsysmax); } else { ObjectExistsDelState(pathCLevel4); // loeschen counteintrag oberster level ObjectExistsDelState(pathCLevel4b); ObjectExistsDelState(pathsysmax); // loeschen durchschnitt oberster level } // endif del } } // ende Funktion // Part2\. Update // Part2.1 Core Update fuer Methoden TIME, DELTA, DELTAM und CALC //----------------------------------------------------------------------------------------------------- // Core Update Funktion //----------------------------------------------------------------------------------------------------- function GeraetUpdate(nummer) { // nummer ist das Tabellenobjekt, das gerade den Status gewechselt hat //variablen auslesen var objGruppe = Gruppen[nummer][0]; // die iobroker bwz. HM object ID var objMSec = GrpSystem[nummer][0]; // BSZ.SystemGrp00.MSec var objKum = GrpSystem[nummer][1]; // BSZ.SystemGrp00.Kum var objTime = GrpSystem[nummer][2]; // BSZ.Counter.Feldname var objSwitch = GrpSystem[nummer][2]; // BSZ.Counter.Feldname var day = Gruppen[nummer][3]; // soll die tages statistik geführt werden ? var week = Gruppen[nummer][4]; // soll die wochen statistik geführt werden ? var month = Gruppen[nummer][5]; // soll die Monats statistik geführt werden ? var year = Gruppen[nummer][6]; // soll die Jahres statistik geführt werden ? var zaehler = 0; // zaehler für for schleifen var zaehler2 = 0; // zaehlerumwandlung mit führender Null var statusname = ''; // statustext aus der logname tabelle var GeraeteStatus = " "; // augenblickler status der gelesenen HM ID var geraetestatusC = "true"; // character als status als hilfsvariable (für Status des Geaetes/objektes) var gruppenstatusC = "true"; // character als status als hilfsvariable (für Gruppenstatus) var switchdiff; // Rechenvariable um eine Schaltung hinzuzufügen var LastKumSwitch; // letzte Anzahl von Schaltungen var rundung; // Rechnen fuer alle Methoden var faktor; // Rechnen fuer alle Methoden var divisor; // Rechnen fuer alle Methoden var lastvalue; // Rechnen fuer alle Methoden var newvalue; // Rechnen fuer alle Methoden var lastkumvalue; var lastkumvalueobj; var newkumvalue; var newkumvalueobj; var diffvalraw; var diffval; // Rechnen für alle Methoden var addition1; // Rechnen fuer alle Methoden var addition2; // Rechnen fuer alle Methoden var switchupdate = Gruppen[nummer][7]; // sollen switch updates gezaehlt werden ? var statusoverrule = false; // spezialfall wenn Geraete beim einschalten auf false statt auf true stehen var DeltaToleranz = special[nummer][6]; // fuer Delta und DeltaM bei Tanksensoren schwanken die Messwerte. Ab diesem Wert wird ein Tankvorgang angenommen, Ruecksetzen von Energiesensoren var individualFunc = false; // flag Individualfunktion anwenden var timeformat = false; // Zeitformat fuer methode TIME = ddd.hh.mm.ss ? var LogCurrSec; // Hilfsvariable fuer Methode TIME - Specialzfalle Status war schon auf gestartet gesetzt if(special[nummer][0] === '' && special[nummer][1] === '' && special[nummer][2] === '' && special[nummer][3] === '' && special[nummer][4] === '' && special[nummer][5] === '') { // keine Urechnungslogik hinterlegt timeformat = true; } // log("update ausgefuehrt fuer nummer " + nummer + " Gruppe20" + Gruppen[nummer][20] + "Gruppe0 " + Gruppen[nummer][0] + " special " + special[nummer][10],"info"); if (Gruppen[nummer][18] === true) { return; } // es ist auf keine updates engestellt if (Gruppen[nummer][19] === true) { return; } // alle datenpunkte sollen genullt werden if (Gruppen[nummer][0] === 'INITIAL') { return; } // bei INITIAL - return GeraeteName = getObject(objGruppe).common.name; // Auslesen der Bezeichnung des Geraetes currSec = new Date().getTime(); // Aktuelle Zeit millisekunden seit 01.01.1970 if (ObjectExists(objGruppe) === false) { // Objekt falsch definiert oder nicht angelegt return; // Abbruch } statusname = Gruppen[nummer][8]; if (logname[nummer][0] !== '') { // Gibt es einen Status in der logname tabelle ? wenn ja merken mit vorrang statusname = logname[nummer][0]; } // endif logname tabelle rundung = special[nummer][0]; // lesen Einstellung zur Rundung if(rundung === '') { rundung = 16; } else { // Wenn keine Rundung angegeben ist dann 16 rundung = Number(rundung); // Rundung umwandeln in Zahl } // endif rundung addition1 = Number(special[nummer][1]); // lesen Einstellung addition1 faktor = Number(special[nummer][2]); // lesen Einstellung Faktor if(faktor === 0) { faktor = 1; } // Null ist nicht erlaubt divisor = Number(special[nummer][3]); // lesen Einstellung Divisor if(divisor === 0) { divisor = 1; } // Null ist nicht erlabut faktor = faktor / divisor; // neuer Faktor addition2 = Number(special[nummer][4]); // lesen Einstellung addition2 objKum = objKum + "." + statusname; objMSec = objMSec + "." + statusname; objSwitch = objSwitch+ '.SWITCH.' + statusname; GeraeteStatus = getState(objGruppe).val; // Neuer Status des Geraetes geraetestatusC = GeraeteStatus.toString(); //wandle in character = z.B. "9" statt 9 statusoverrule = false; // zunächst mal overrule auf false (false heisst hier, dass es einen Einschaltpunkt nicht braucht) if (GeraeteStatus === true) { // ist der aktuelle Status = true if (Gruppen[nummer][9] === false ) { // ist true overruled mit false ? statusoverrule = false; // dann reverse die logik } if (Gruppen[nummer][9] === true || Gruppen[nummer][9] === '') { // ist false overruled mit true ? statusoverrule = true; // dann reverse die logik } } //endif Status ist true if (GeraeteStatus === false) { // ist der aktuelle Status = false if (Gruppen[nummer][9] === false ) { // ist false overruled mit true ? statusoverrule = true; // dann reverse die logik } if (Gruppen[nummer][9] === true ) { // ist true overruled mit false ? statusoverrule = false; // dann reverse die logik } } //endif Status ist false if (typeof GeraeteStatus != "boolean") { // aktueller Gerätestatus ist nicht boolean if (Gruppen[nummer][9] === geraetestatusC) { statusoverrule = true; // wenn es nicht boolean ist und der Gerätestatus = dem eingetragenen dann gilt das Gerät als eingeschaltet } else { statusoverrule = false; } } // endif - es ist kein boolean if (typeof statusoverrule != "boolean") { // Problem aufgetreten ? log("hier ist ein Problem. Der Status haette boolean sein sollen, ist aber " + statusoverrule, "info"); // sollte nicht vorkommen } // calc datenpunkt if (Gruppen[nummer][8] === 'CALC') { //Es ist ein calc datenpunkt objTime = objTime + '.CALC.' + statusname; if(Gruppen[nummer][9] === '' || statusoverrule === false) { // wenn in gruppe(9) nichts eingetragen ist, dann soll immer durchlaufen werden newvalue = getState(objGruppe).val; // lese letzten Wert aus dem triggernden Datenpunkt GeraeteStatus = newvalue; // sichern für das log diffvalraw = newvalue; setState(objKum,newvalue); // Schreibe wert in Datenpunkt des Systembereichs if(special[nummer][5] !== '') { // Individualfunktionen newvalue = individual(special[nummer][5].toUpperCase(),nummer,diffvalraw); // hier kommt ein umgerechneter Wertaus der Individualfunktion zurück z.B. KG . individualFunc = true; } // endif Individualfunktion newvalue = newvalue + addition1; // add1 anwenden newvalue = newvalue * faktor; // Faktor anwenden newvalue = newvalue + addition2; // add2 anwenden newvalue = round(newvalue,rundung); // Rundung anwenden setState(objTime,newvalue); // Schreibe wert in Counter-Datenpunkt (nach Umrechnung ValKum2(nummer, day,week,month,year,objKum,objTime,newvalue,addition1,addition2,faktor,rundung,individualFunc,false,false); // update der Werte in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht Average(nummer,day,week,month,year,statusname,newvalue,diffvalraw,addition1,addition2,faktor,rundung,true); // update der Werte in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht) MINMAX(nummer,day,week,month,year,statusname,newvalue,diffvalraw,addition1,addition2,faktor,rundung,false) // update der MINMAX Werte in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht } // endif es ist ein zeit objekt und es war eingeschaltet if(switchupdate) { LastKumSwitch = getState(objSwitch).val; // lese kumulierten Zaehlungen switchdiff = LastKumSwitch + 1; setState(objSwitch,switchdiff); // setzen plus ein Schaltvorgang SwitchKum(day,week,month,year,objSwitch); // update der switches in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht } // endif Swtichupdate newvalue = TauschePunktKomma(newvalue); // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel //"Datum;Uhrzeit; Type; Activity; nummer HM-ID; Objekt-Text; CurrValue; SystemObj Alt; SysemObj Neu; SystemMSEC Alt ;SystemMSEC NEU; CounterObj ALT; CounterOBJ NEU writelog(nummer,"A","CALC" + ";" + "Change" + ";" +nummer + ";" + Gruppen[nummer][0] + ";" + GeraeteName+";"+ ";"+ ";"+ ";"+ ";"+ ";"+ ";"+ newvalue); return; } // endif calc datenpunkt // delta datenpunkt - // Delta PLUS Rechnung if (Gruppen[nummer][8] === 'DELTA') { //Es ist ein DELTA datenpunkt objTime = objTime + '.DELTA.' + statusname; lastkumvalue = Number(getState(objTime).val); // lese counter Zaehlungen lastkumvalueobj = Number(getState(objKum).val); // lese system kumulierte Zaehlungen newkumvalue = Number(getState(objGruppe).val); // lese aktuellen Wert aud dem veränderten Datenpunkt newkumvalueobj = newkumvalue; // den unveraenderten Wert merken diffvalraw = newkumvalueobj - lastkumvalueobj; // Rohwert Differenz (also ohne Umrechnung) if(special[nummer][5] !== '') { // Individualfunktionen newkumvalue = individual(special[nummer][5].toUpperCase(),nummer,newkumvalue); individualFunc = true; } newkumvalue = newkumvalue + addition1; newkumvalue = newkumvalue * faktor; // Faktor anwenden newkumvalue = newkumvalue + addition2; diffval = diffvalraw; diffval = diffval + addition1; diffval = diffval * faktor; // Faktor anwenden diffval = diffval + addition2; if (lastkumvalueobj === 0) { diffval = 0; diffvalraw = 0; } // beim ersten Aufruf nicht den ganzen Wert übernehmen // log("nummer "+ nummer + " lastkumvalueobj " + lastkumvalueobj + " newkumvalueobj " + newkumvalueobj,"info"); if (lastkumvalueobj-DeltaToleranz > newkumvalueobj ) {                           // Sonderfall, wenn z.B. der Energiezaehler zurücgesetz wurde oder ausgetauscht wurde dann ignorieren  
            lastkumvalueobj = newkumvalueobj;
            diffval = 0;
            diffvalraw = 0;
        }
        setState(objMSec,diffvalraw);                                                   //  Differenzwert schreiben
        setState(objKum,newkumvalueobj);                                                // neuer kumulierter Wert schreiben
        newkumvalue = round(newkumvalue,rundung);                                       // Rundung anwenden
        setState(objTime,newkumvalue);                                                  // den unveraenderten Wert in objKum schreiben
        ValKum2(nummer,day,week,month,year,objKum,objTime,diffvalraw,addition1,addition2,faktor,rundung,individualFunc,true,false);          // update der Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht
        Average(nummer,day,week,month,year,statusname,diffval,diffvalraw,addition1,addition2,faktor,rundung,false);                         // update der AVERAGE Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht)
        MINMAX(nummer,day,week,month,year,statusname,diffval,diffvalraw,addition1,addition2,faktor,rundung,false)           // update der MINMAX Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht                
        if(switchupdate) {
            LastKumSwitch   = getState(objSwitch).val;                                  // lese kumulierten Zaehlungen
            switchdiff = LastKumSwitch + 1;
            setState(objSwitch,switchdiff);                                             // setzen plus ein Schaltvorgang                        
            SwitchKum(day,week,month,year,objSwitch);                                   // update der switches in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht    
        } // endif Swtichupdate
        lastkumvalueobj = TauschePunktKomma(lastkumvalueobj);                           // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel
        newkumvalueobj = TauschePunktKomma(newkumvalueobj);                             // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel
        diffvalraw = TauschePunktKomma(diffvalraw);                                     // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel
        lastkumvalue = TauschePunktKomma(lastkumvalue);                                 // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel
        newkumvalue = TauschePunktKomma(newkumvalue);                                   // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel     
        GeraeteStatus = TauschePunktKomma(GeraeteStatus);                               // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel        
//"Datum;Uhrzeit;     Type;          Activity;      nummer         HM-ID;                   Objekt-Text;        CurrValue;          SystemObj Alt;           SysemObj Neu;         SystemMSEC Alt ;SystemMSEC NEU;    CounterObj ALT;         CounterOBJ NEU
        writelog(nummer,"A","DELTA" + ";" + "Change" + ";" +nummer+ ";" + Gruppen[nummer][0] + ";" + GeraeteName + ";" + GeraeteStatus +";" + lastkumvalueobj + ";" + newkumvalueobj + ";" + ";" +           diffvalraw   + ";" +  lastkumvalue +";" + newkumvalue);
        return;
    } // endif delta datenpunkt

    // deltaM datenpunkt -                                                                  // Delta Minus Rechnung
    if (Gruppen[nummer][8] === 'DELTAM')    {                                               //Es ist ein DELTA datenpunkt
        objTime          = objTime  + '.DELTAM.'   + statusname;
        lastkumvalue    = Number(getState(objTime).val);                                // lese kumulierte Zaehlungen
        lastkumvalueobj = Number(getState(objKum).val);                                 // lese system kumulierte Zaehlungen
        newkumvalue     = Number(getState(objGruppe).val);                              // lese  aktuellen Wert aud dem veränderten Datenpunkt
        newkumvalueobj  = newkumvalue;                                                  // den unveraenderten Wert merken
        diffvalraw = lastkumvalueobj - newkumvalueobj;                                  // Rohwert Differenz (also ohne Umrechnung)
        if(special[nummer][5]  !== '') {                                                // Individualfunktionen 
           newkumvalue =  individual(special[nummer][5].toUpperCase(),nummer,newkumvalue);
           individualFunc = true;
        }
        newkumvalue = newkumvalue + addition1;
        newkumvalue = newkumvalue * faktor;                                             // Faktor anwenden 
        newkumvalue = newkumvalue + addition2;        

        diffval = diffvalraw;
        diffval = diffval + addition1;
        diffval = diffval * faktor;                                                     // Faktor anwenden 
        diffval = diffval + addition2;                

        if (lastkumvalueobj === 0 ) { diffval = 0;diffvalraw = 0;  }                    // beim ersten Aufruf nicht den ganzen Wert übernehmen 
        if (lastkumvalueobj+DeltaToleranz < newkumvalueobj ) { // Sonderfall, wenn z.B. getankt wurde dann ignorieren lastkumvalueobj = newkumvalueobj; diffval = 0; diffvalraw = 0; } setState(objMSec,diffvalraw); // Einschaltzeit setzen setState(objKum,newkumvalueobj); // Schreibe wert in variable newkumvalue = round(newkumvalue,rundung); // Rundung anwenden setState(objTime,newkumvalue); // Schreibe Zeitformat in variable ValKum2(nummer,day,week,month,year,objKum,objTime,diffvalraw,addition1,addition2,faktor,rundung,individualFunc,true,false); // update der Werte in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht Average(nummer,day,week,month,year,statusname,newkumvalue,diffvalraw,addition1,addition2,faktor,rundung,false); // update der Werte in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht) MINMAX(nummer,day,week,month,year,statusname,diffval,diffvalraw,addition1,addition2,faktor,rundung,false) // update der MINMAX Werte in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht if(switchupdate) { LastKumSwitch = getState(objSwitch).val; // lese kumulierten Zaehlungen switchdiff = LastKumSwitch + 1; setState(objSwitch,switchdiff); // setzen plus ein Schaltvorgang SwitchKum(day,week,month,year,objSwitch); // update der switches in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht } // endif Swtichupdate lastkumvalueobj = TauschePunktKomma(lastkumvalueobj); // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel newkumvalueobj = TauschePunktKomma(newkumvalueobj); // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel diffvalraw = TauschePunktKomma(diffvalraw); // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel lastkumvalue = TauschePunktKomma(lastkumvalue); // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel newkumvalue = TauschePunktKomma(newkumvalue); // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel GeraeteStatus = TauschePunktKomma(GeraeteStatus); // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel //"Datum;Uhrzeit; Type; Activity; nmmmer HM-ID; Objekt-Text; CurrValue; SystemObj Alt; SysemObj Neu; SystemMSEC Alt ;SystemMSEC NEU; CounterObj ALT; CounterOBJ NEU writelog(nummer,"A","DELTAM" + ";" + "Change" + ";" +nummer + ";" + Gruppen[nummer][0] + ";" + GeraeteName + ";" + GeraeteStatus +";" + lastkumvalueobj + ";" + newkumvalueobj + ";" + ";" + diffvalraw + ";" + lastkumvalue +";" + newkumvalue); return; } // endif delta datenpunkt if (GeraeteStatus === true) { geraetestatusC = "true"; } //wandle in character = "true" statt true if (GeraeteStatus === false) { geraetestatusC = "false"; } //wandle in character = "true" statt true // TIME Datenpunkt hier LEVEL Geraet if (objGruppe.match('LEVEL')) { // ist es ein LEVEL Geraet ? if (Gruppen[nummer][8] === '') { return; } // Gibt es einen Status in der Gruppentabelle ? wenn nein ciao - es wurd nur spalte 8 abgefragt if (Gruppen[nummer][18] === true) { return; } // Objekt ist mit refresh gekennzeichnet - keine updates LastMSec = Number(getState(objMSec).val); // lese letzten Wert var statusvalue = parseInt(Gruppen[nummer][8],10); // in der Gruppentabelle Spalte 8 wird eine Zahl erwartet für LEVEL Geraete - in eine integer Zahl umwandeln if (GeraeteStatus >= statusvalue) {                                                     // Geraet wurde eingeschaltet - Einschaltzeit setzen
           if (LastMSec === 0 )  {                                                              // Wenn Geraet keine Einschaltzeit hat und der Verbraucher nicht kleiner eingeschaltet wurde als in der Gruppen tabelle unter status, dann ignoriere 
                setState(objMSec,currSec);                                                      // merken millisekunden zum Zeitpunkt "Einschalten"
                FormTimeSingle = TimeCalc(currSec,nummer);                                      // Zeit  in lesbarem Format ddd:hh:mm:ss
                GeraeteStatus = TauschePunktKomma(GeraeteStatus);                               // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel        
//"Datum;Uhrzeit;                  Type;          Activity;             nummer           HM-ID;                   Objekt-Text;         CurrValue;           SystemObj Alt;         SysemObj Neu;         SystemMSEC Alt ;  SystemMSEC NEU;    CounterObj ALT;         CounterOBJ NEU
                writelog(nummer,"A","TIME-LEVEL" + ";" + "SetCurrTime"  + ";" +nummer + ";" + Gruppen[nummer][0] + ";" + GeraeteName + ";" + GeraeteStatus +     ";" +";"          +     ";"             +       LastMSec  + ";" +  currSec);
            }
        } else {                                                                                //  Geraet wurde ausgeschaltet
            objTime          = objTime  + '.TIME.'   + statusname;
            LastKumSec       = Number(getState(objKum).val);                                    // lese kumulierten Wert
           if (LastMSec > 0 )  {                                                                // Geraet hatte eine Einschaltzeit gespeichert - jetzt rechnen und zurücksetzen
                lastvalue       = Number(getState(objTime).val);                                // lese kumulierten Wert - letzter umgerechnete Wert
                if( timeformat ||  typeof(lastvalue) == "string") {                             // falls ein timeformat gewaehlt wurde (ddd.hh.mm.ss), dann muss umgewandelt werden in millisek
                    lastvalue = LastKumSec;                                                     // der letzte Wert entspricht jetzt dem kumulierten Systemwert
                    lastvalue = lastvalue + addition1;
                    lastvalue = lastvalue * faktor;                                             // Faktor anwenden 
                    lastvalue = lastvalue + addition2;
                }
                diffvalraw      = currSec - LastMSec;                                           // Berechnen der Zeitdifferenz
                newvalue        = diffvalraw;                                                   // lese  aktuellen Wert aud dem veränderten Datenpunkt
                if(special[nummer][5]  !== '') {                                                // Individualfunktionen 
                   newvalue =  individual(special[nummer][5].toUpperCase(),nummer,diffvalraw);  // hier kommt ein umgerechneter Wertaus der Individualfunktion zurück  z.B. KG . 
                   individualFunc = true;
                } // endif Individualfunktion 
                newvalue = newvalue + addition1;
                newvalue = newvalue * faktor;                                                   // Faktor anwenden 
                newvalue = newvalue + addition2;
                newvalue = lastvalue + newvalue;                                                // neuer umgerechneter Wert für den Counter
                newkumtime = LastKumSec + diffvalraw;                                           // neuer nicht umgerechneter Wert für den Systembereich   
                setState(objKum,newkumtime);                                                    // Schreibe wert  in variable
                setState(objMSec,0);     
                newvalue = round(newvalue,rundung);                                             //  Neuer umgerechneter Gesamtwrt mit Rundung für den Counter
                FormTimeKum  = TimeCalc(newvalue,nummer);                                       // Berechne Betriebsstunden Zeitformat von millisekunden in dd:hh:mm:ss = FormTime
                setState(objTime,FormTimeKum);                                                  // Schreibe neuen Wert  in variable
                ValKum2(nummer, day,week,month,year,objKum,objTime,diffvalraw,addition1,addition2,faktor,rundung,individualFunc,true,timeformat);          // update der Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht
                Average(nummer,day,week,month,year,statusname,newvalue,diffvalraw,addition1,addition2,faktor,rundung,false);         // update der Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht)
                MINMAX(nummer,day,week,month,year,statusname,newvalue,diffvalraw,addition1,addition2,faktor,rundung,false)           // update der MINMAX Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht                
                setState(objMSec,0);                                                            // setzen Millisekunden auf Null um Fehlschaltungen zu vermeiden
                if(switchupdate) {
                  LastKumSwitch   = getState(objSwitch).val;                                    // lese kumulierten Zaehlungen
                  switchdiff = LastKumSwitch + 1;
                  setState(objSwitch,switchdiff);                                               // setzen plus ein Schaltvorgang                        
                  SwitchKum(day,week,month,year,objSwitch);                                     // update der switches in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht    
                } // endif switchupdate
        lastvalue  = TimeCalc(lastvalue,nummer);                                                //Aufbereitung für Log
        if(typeof(lastvalue) == "number") { 
             lastvalue = TauschePunktKomma(lastvalue);                                          // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel           
        }
         if(typeof(FormTimeKum) == "number") {        
             FormTimeKum = TauschePunktKomma(FormTimeKum);                                          // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel           
        }             
//"Datum;Uhrzeit;     Type;                 Activity;         nummer           HM-ID;                    Objekt-Text;        CurrValue;           SystemObj Alt;           SysemObj Neu;         SystemMSEC Alt ;SystemMSEC NEU;    CounterObj ALT; CounterOBJ NEU
        writelog(nummer,"A","TIME-LEVEL" + ";" + "SetNewTime" + ";" +nummer + ";" + Gruppen[nummer][0] + ";" + GeraeteName + ";" + GeraeteStatus +";" + LastKumSec + ";" +       newkumtime + ";" +      LastMSec +  ";" +     "0"  + ";"      +  lastvalue +";" + FormTimeKum);
        return;
            } // endif statusname
        } // Geraet war vorher eingeschaltet
        return;                                                                             // ciao  - nix mehr zu tun
    } // endif es ist ein level Geraet

 // TIME Datenpunkt für NICHT LEVEL Geraete 
 //  Jetzt wird die Betriebszeit errechnet für den vorherigen Status und die Einschaltzeit zurückgesetzt
        for ( zaehler = 8; zaehler < 18; zaehler++) { // Spalte 8 - 18 fuer die Gruppentabelle entspriche logname -8 if (Gruppen[nummer][zaehler] === '') { continue; } // Statustabelle Status is INITIAL - dann zurück zum loop if (Gruppen[nummer][18] === true) { continue; } // Objekt ist mit refresh gekennzeichnet - keine updates gruppenstatusC = Gruppen[nummer][zaehler].toString(); // status aus der Gruppentabelle in einen String umwandeln objMSec = GrpSystem[nummer][0]; statusname = Gruppen[nummer][zaehler]; // der status ist ein Teil des speicherpfades if (logname[nummer][zaehler-8] !== '') { // Gibt es einen Status in der logname tabelle ? wenn ja merken mit vorrang statusname = logname[nummer][zaehler-8]; } // endif logname tabelle // der aktuelle Status wird mit der Startzeit gespeichert if (geraetestatusC === gruppenstatusC ) { // der aktuelle geraete status wurde gefunden in der gruppentabelle objMSec = objMSec + "." + statusname; // setze pfad für MSec zusammen LastMSec = Number(getState(objMSec).val); // lese letzten Wert LogCurrSec = "not changed"; // erst auf "not changed" und dann checken ob der Status wechselte if(LastMSec === 0) { // Wenn der Status bereits gesendet wurde - soll ignoriert werden "not changed" setState(objMSec,currSec); // merken millisekunden zum Zeitpunkt "Einschalten" LogCurrSec = currSec; // logge currSec } else { if(special[nummer][12] === true) { // der mehrfachStatus soll ignoriert werden setState(objMSec,currSec); // merken millisekunden zum Zeitpunkt "Einschalten" LogCurrSec = currSec; // logge currSec } } //"Datum;Uhrzeit; Type; Activity; nummer HM-ID; Objekt-Text; CurrValue; SystemObj Alt; SysemObj Neu; SystemMSEC Alt ;SystemMSEC NEU; CounterObj ALT; CounterOBJ NEU writelog(nummer,"A","TIME" + ";" + "SetCurrTime" + ";" +nummer + ";" + Gruppen[nummer][0] + ";" + GeraeteName + ";" + GeraeteStatus + ";" +";" + ";" + LastMSec + ";" + LogCurrSec); continue; // Statusbearbeitung aktueller Status beendet } // endif Gruppenstatus = aktueller status // jetzt die Status behandeln, wenn vorher mal eingeschaltet war objKum = GrpSystem[nummer][1]; objTime = GrpSystem[nummer][2]; objSwitch = GrpSystem[nummer][2]; zaehler2 = addZero(zaehler).zero2; objMSec = objMSec + "." + statusname; // vervollständige Pfadnamen objKum = objKum + "." + statusname; objTime = objTime + '.TIME.' + statusname; objSwitch = objSwitch+ '.SWITCH.' + statusname; LastMSec = Number(getState(objMSec).val); // lese letzten Wert LastKumSec = Number(getState(objKum).val); // lese kumulierten Wert if (LastMSec > 0 )  {                                                               // der letzte Status muss  einen Wert haben und wird daraufhin berechnet                                                
                LastKumSec      = Number(getState(objKum).val);                                 // lese kumulierten Wert - Millisekunden aus dem Systembereich
                lastvalue       = Number(getState(objTime).val);                                // lese kumulierten Wert - letzter umgerechnete Wert
                if( timeformat || typeof(lastvalue) == "string") {                              // falls ein timeformat gewaehlt wurde (ddd.hh.mm.ss), dann muss umgewandelt werden in millisek
                    lastvalue = LastKumSec;                                                     // der letzte Wert entspricht jetzt dem kumulierten Systemwert
                    lastvalue = LastKumSec;                                                     // der letzte Wert entspricht jetzt dem kumulierten Systemwert
                    lastvalue = lastvalue + addition1;
                    lastvalue = lastvalue * faktor;                                             // Faktor anwenden 
                    lastvalue = lastvalue + addition2;
                }
                diffvalraw      = currSec - LastMSec;                                           // Berechnen der Zeitdifferenz
                newvalue        = diffvalraw;                                                   // lese  aktuellen Wert aud dem veränderten Datenpunkt
                if(special[nummer][5]  !== '') {                                                // Individualfunktionen 
                   newvalue =  individual(special[nummer][5].toUpperCase(),nummer,diffvalraw);  // hier kommt ein umgerechneter Wertaus der Individualfunktion zurück  z.B. KG . 
                   individualFunc = true;
                } // endif Individualfunktion 
                newvalue = newvalue + addition1;
                newvalue = newvalue * faktor;                                                   // Faktor anwenden 
                newvalue = newvalue + addition2;
                newvalue = lastvalue + newvalue;                                                // neuer umgerechneter Wert für den Counter
                newkumtime = LastKumSec + diffvalraw;                                           // neuer nicht umgerechneter Wert für den Systembereich   
                setState(objKum,newkumtime);                                                    // Schreibe wert  in variable
                setState(objMSec,0);     
                newvalue = round(newvalue,rundung);                                             //  Neuer umgerechneter Gesamtwrt mit Rundung für den Counter
                FormTimeKum  = TimeCalc(newvalue,nummer);                                       // Berechne Betriebsstunden Zeitformat von millisekunden in dd:hh:mm:ss = FormTime
                setState(objTime,FormTimeKum);                                                  // Schreibe neuen Wert  in variable
                ValKum2(nummer, day,week,month,year,objKum,objTime,diffvalraw,addition1,addition2,faktor,rundung,individualFunc,true,timeformat);          // update der Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht
                Average(nummer,day,week,month,year,statusname,newvalue,diffvalraw,addition1,addition2,faktor,rundung,false);         // update der Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht)
                MINMAX(nummer,day,week,month,year,statusname,newvalue,diffvalraw,addition1,addition2,faktor,rundung,false)           // update der MINMAX Werte  in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht                
                setState(objMSec,0);                                                            // setzen Millisekunden auf Null um Fehlschaltungen zu vermeiden
                if(switchupdate) {
                  LastKumSwitch   = getState(objSwitch).val;                                    // lese kumulierten Zaehlungen
                  switchdiff = LastKumSwitch + 1;
                  setState(objSwitch,switchdiff);                                               // setzen plus ein Schaltvorgang                        
                  SwitchKum(day,week,month,year,objSwitch);                                     // update der switches in täglichen, wöchentlichen, monatlichen, jährlichen einheiten wenn so gewünscht    
                } // endif switchupdate
        lastvalue  = TimeCalc(lastvalue,nummer);                                                //Aufbereitung für Log
        if(typeof(lastvalue) == "number") { 
             lastvalue = TauschePunktKomma(lastvalue);                                          // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel           
        }
         if(typeof(FormTimeKum) == "number") {        
             FormTimeKum = TauschePunktKomma(FormTimeKum);                                          // Umwandlung von javascript float in 2 decimals mit Komma für die Logausgabe lesbar in Excel           
        }             
//"Datum;Uhrzeit;     Type;          Activity;           nummer         HM-ID;                    Objekt-Text;        CurrValue;           SystemObj Alt;           SysemObj Neu;         SystemMSEC Alt ;SystemMSEC NEU;    CounterObj ALT; CounterOBJ NEU
        writelog(nummer,"A","TIME" + ";" + "SetNewTime" + ";" +nummer + ";" + Gruppen[nummer][0] + ";" + GeraeteName + ";" + GeraeteStatus +";" + LastKumSec + ";" +       newkumtime + ";" +      LastMSec +   ";" +  "0"  + ";"      +  lastvalue +";" + FormTimeKum);
     } // endif LastMSec                              
    } // endfor   

} // ende Funktion

// Part 2.2 Kumulation in Perioden schreiben
//-----------------------------------------------------------------------------------------------------
// Funktion Kumulierte Werte  ermitteln und speichern
//-----------------------------------------------------------------------------------------------------
function ValKum2(nummer,day,week,month,year,objKum,objCount,valdiffraw,addition1,addition2,faktor,stellen,individualFunc,kumulation,timeformat) {
// nummer = Nummer der Gruppe
// day = true/false - soll day kumuliert werden
// week= true/false - soll week kumuliert werden
// month= true/false - soll month kumuliert werden
// year= true/false - soll year kumuliert werden
// objKum = Pfad zum Datenpunkt System.kum
// objcount = Pfad zum Datenpunkt counter
// valdiff      = Wert zu speichern (dieses ist der Differenzwert umgerechnet mit der Formal aus tabelle special)
// valdiffraw   = Wert zu speichern (dieses ist der Differenzwert ohne Umrechnung)
// stellen = Rundung fuer die count datenpunkte
// Individualfunktion anwenden
// Kumulation = durchführen oder nur den lezten Wert vewenden 
// timeformat true heisst dass es ein string timeformat ist - false heisst, dass eine zahl vorliegt (gespeichert in objtime)
var valKum;
var valCount;
var periode;

  if (day)  {                                                                       // update der taeglichen kumulierten Betriebszeit
    periode = "."+PeriodeDay;                                                       // gehoerige Periode zum pfad
    valKum   = Number(getState(objKum+periode).val);                                // Lese letzte kumuoerte Perioden-Betriebszeit 
    if(kumulation) {
        valKum   = valKum + valdiffraw;                                             // Kumulation
    } else {
        valKum = valdiffraw;                                                        // Wert wird 1:1 uebernommen addiere die ermittelte Betriebszeit ohne Umrechnung
    } // endif es ist Kumulation
    valCount = valdiffraw;                                                          // counter vorbereiten
    if(individualFunc) {                                                                // Individualfunktionen 
       valCount =  individual(special[nummer][5].toUpperCase(),nummer,valdiffraw);  // hier kommt ein umgerechneter Wertaus der Individualfunktion zurück  z.B. KG . 
    } // endif Individualfunktion
    valCount = valCount + addition1;                                                // Addition1 anwenden
    valCount = valCount * faktor;                                                   // Faktor anwenden 
    valCount = valCount + addition2;                                                // Addition2 anwenden
    setState(objKum+periode,valKum);                                                // Schreibe die neue Betriebszeit ohne Urechnung in den Systembereich
    if(kumulation) {
        if(timeformat || typeof(getState(objCount+periode).val) == "string") {        // falls ein timeformat gewaehlt wurde (ddd.hh.mm.ss), dann muss umgewandelt werden in millisek
            valCount = valKum                                                       // der letzte Wert entspricht jetzt dem kumulierten Systemwert
            valCount = valCount + addition1;                                                // Addition1 anwenden
            valCount = valCount * faktor;                                                   // Faktor anwenden 
            valCount = valCount + addition2;                                                // Addition2 anwenden
        } else {
            valCount = valCount + Number(getState(objCount+periode).val);           // Addiere den neuen umgerechneten Deltawert in die Counterperiode
        } // endif type ist string
    } // endif  kumulation
    valCount = round(valCount,stellen);                                             // rundung anwenden
    valCount  = TimeCalc(valCount,nummer);                                          // formatiere "dddd.hh.mm.ss falls gewünscht"
    setState(objCount+periode,valCount);                                            // Schreibe die neue Betriebszeit mit  Umechnung in den Counter
  } // endif DAY

  if (week) {
    periode = "."+PeriodeWeek;                                                       // gehoerige Periode zum pfad
    valKum   = Number(getState(objKum+periode).val);                                // Lese letzte kumuoerte Perioden-Betriebszeit 
    if(kumulation) {
        valKum   = valKum + valdiffraw;                                             // Kumulation
    } else {
        valKum = valdiffraw;                                                        // Wert wird 1:1 uebernommen addiere die ermittelte Betriebszeit ohne Umrechnung
    } // endif es ist Kumulation
    valCount = valdiffraw;                                                          // counter vorbereiten
    if(individualFunc) {                                                                // Individualfunktionen 
       valCount =  individual(special[nummer][5].toUpperCase(),nummer,valdiffraw);  // hier kommt ein umgerechneter Wertaus der Individualfunktion zurück  z.B. KG . 
    } // endif Individualfunktion
    valCount = valCount + addition1;                                                // Addition1 anwenden
    valCount = valCount * faktor;                                                   // Faktor anwenden 
    valCount = valCount + addition2;                                                // Addition2 anwenden
    setState(objKum+periode,valKum);                                                // Schreibe die neue Betriebszeit ohne Urechnung in den Systembereich
    if(kumulation) {
        if(timeformat || typeof(getState(objCount+periode).val) == "string") {        // falls ein timeformat gewaehlt wurde (ddd.hh.mm.ss), dann muss umgewandelt werden in millisek
            valCount = valKum                                                       // der letzte Wert entspricht jetzt dem kumulierten Systemwert
            valCount = valCount + addition1;                                                // Addition1 anwenden
            valCount = valCount * faktor;                                                   // Faktor anwenden 
            valCount = valCount + addition2;                                                // Addition2 anwenden
        } else {
            valCount = valCount + Number(getState(objCount+periode).val);           // Addiere den neuen umgerechneten Deltawert in die Counterperiode
        } // endif type ist string
    } // endif  kumulation
    valCount = round(valCount,stellen);                                             // rundung anwenden
    valCount  = TimeCalc(valCount,nummer);                                          // formatiere "dddd.hh.mm.ss falls gewünscht"
    setState(objCount+periode,valCount);                                            // Schreibe die neue Betriebszeit mit  Umechnung in den Counterin den Counter
  } // endif WEEK

  if (month){
    periode = "."+PeriodeMonth;                                                       // gehoerige Periode zum pfad
    valKum   = Number(getState(objKum+periode).val);                                // Lese letzte kumuoerte Perioden-Betriebszeit 
    if(kumulation) {
        valKum   = valKum + valdiffraw;                                             // Kumulation
    } else {
        valKum = valdiffraw;                                                        // Wert wird 1:1 uebernommen addiere die ermittelte Betriebszeit ohne Umrechnung
    } // endif es ist Kumulation
    valCount = valdiffraw;                                                          // counter vorbereiten
    if(individualFunc) {                                                                // Individualfunktionen 
       valCount =  individual(special[nummer][5].toUpperCase(),nummer,valdiffraw);  // hier kommt ein umgerechneter Wertaus der Individualfunktion zurück  z.B. KG . 
    } // endif Individualfunktion
    valCount = valCount + addition1;                                                // Addition1 anwenden
    valCount = valCount * faktor;                                                   // Faktor anwenden 
    valCount = valCount + addition2;                                                // Addition2 anwenden
    setState(objKum+periode,valKum);                                                // Schreibe die neue Betriebszeit ohne Urechnung in den Systembereich
    if(kumulation) {
        if(timeformat || typeof(getState(objCount+periode).val) == "string") {        // falls ein timeformat gewaehlt wurde (ddd.hh.mm.ss), dann muss umgewandelt werden in millisek
            valCount = valKum                                                       // der letzte Wert entspricht jetzt dem kumulierten Systemwert
            valCount = valCount + addition1;                                                // Addition1 anwenden
            valCount = valCount * faktor;                                                   // Faktor anwenden 
            valCount = valCount + addition2;                                                // Addition2 anwenden
        } else {
            valCount = valCount + Number(getState(objCount+periode).val);           // Addiere den neuen umgerechneten Deltawert in die Counterperiode
        } // endif type ist string
    } // endif  kumulation
    valCount = round(valCount,stellen);                                             // rundung anwenden
    valCount  = TimeCalc(valCount,nummer);                                          // formatiere "dddd.hh.mm.ss falls gewünscht"
    setState(objCount+periode,valCount);                                            // Schreibe die neue Betriebszeit mit  Umechnung in den Counter
  } // endif MONTH

  if (year) {
    periode = "."+PeriodeYear;                                                       // gehoerige Periode zum pfad
    valKum   = Number(getState(objKum+periode).val);                                // Lese letzte kumuoerte Perioden-Betriebszeit 
    if(kumulation) {
        valKum   = valKum + valdiffraw;                                             // Kumulation
    } else {
        valKum = valdiffraw;                                                        // Wert wird 1:1 uebernommen addiere die ermittelte Betriebszeit ohne Umrechnung
    } // endif es ist Kumulation
    valCount = valdiffraw;                                                          // counter vorbereiten
    if(individualFunc) {                                                                // Individualfunktionen 
       valCount =  individual(special[nummer][5].toUpperCase(),nummer,valdiffraw);  // hier kommt ein umgerechneter Wertaus der Individualfunktion zurück  z.B. KG . 
    } // endif Individualfunktion
    valCount = valCount + addition1;                                                // Addition1 anwenden
    valCount = valCount * faktor;                                                   // Faktor anwenden 
    valCount = valCount + addition2;                                                // Addition2 anwenden
    setState(objKum+periode,valKum);                                                // Schreibe die neue Betriebszeit ohne Urechnung in den Systembereich
    if(kumulation) {
        if(timeformat || typeof(getState(objCount+periode).val) == "string") {        // falls ein timeformat gewaehlt wurde (ddd.hh.mm.ss), dann muss umgewandelt werden in millisek
            valCount = valKum                                                       // der letzte Wert entspricht jetzt dem kumulierten Systemwert
            valCount = valCount + addition1;                                                // Addition1 anwenden
            valCount = valCount * faktor;                                                   // Faktor anwenden 
            valCount = valCount + addition2;                                                // Addition2 anwenden
        } else {
            valCount = valCount + Number(getState(objCount+periode).val);           // Addiere den neuen umgerechneten Deltawert in die Counterperiode
        } // endif type ist string
    } // endif  kumulation
    valCount = round(valCount,stellen);                                             // rundung anwenden
    valCount  = TimeCalc(valCount,nummer);                                          // formatiere "dddd.hh.mm.ss falls gewünscht"
    setState(objCount+periode,valCount);                                            // Schreibe die neue Betriebszeit mit  Umechnung in den Counter
  } // endif YEAR

}       // end function

// Part 2.3 Durschnittswerte ermitteln und schreiben
//-----------------------------------------------------------------------------------------------------
// Funktion durchschnittswerte  ermitteln und speichern
//-----------------------------------------------------------------------------------------------------
function Average(nummer,day,week,month,year,statusname,newvalue,diffvalueraw,addition1,addition2,faktor,stellen,kumulation) {
// nummer                           = Zeile aus der Gruppentabelle
// day, week, month, year           = sollen die Perioden geschrieben werden ?
// statusname                       = Feldname(Thema) der Struktur
// newvalue                         = neuer Wert, der aus der Methode berechnet wurde
// diffvalueraw                     = Rohwert - wenn Schwellwertprüfung erfolgen soll dann wird gegen diesen Wert geprueft
//addition1,additin2,faktor,stellen = Berechnungsvariablen aus der Tabelle special
//Kumulation                        = soll der Wert übernommen oder kumuliert werden (Anm: aus CALC muss kumuliert werden)

var sysaku  = GrpSystem[nummer][3]+"."+statusname;                                    //BSZ.system.Grp00AAKU.Statusname
var sysasw  = GrpSystem[nummer][4]+"."+statusname;                                    //BSZ.system.Grp00ASW.Statusname
var cntave  = countLocation + "." + Gruppen[nummer][1]+".AVERAGE."+ statusname;                              //BSZ.counter.AVERAGE.Statusname
var valsysaku;
var valsysasw;
var newaverage;

if (special[nummer][8] !== true) {
    return;                                                                         // AVERAGE ist nicht aktiv
}

if (special[nummer][9] !== '') {                                                    // Prüfen ob Schwellenwert Durchschnittsberechnung zutrifft
    if(special[nummer][9] > diffvalueraw) {
        return;                                                                     // Wird nicht zur Durschnittsbildung herangezogen
    }
}

valsysasw       =  Number(getState(sysasw).val);                                    // Lesen Anzahl Messungen aus dem systembereich 
if(kumulation) {                                                                    //Kumulation fuer den Systembereich notwendig - z.B. CALC
   valsysaku    =  Number(getState(sysaku).val);                                    // Lesen des kumulierten Wertes aus dem Systembereich
   valsysaku    =  valsysaku + newvalue;                                            // Kumulation in den Systembereich 
   valsysasw    =  valsysasw + 1;                                                   // Anzahl der Messungen mit dieser
   newaverage   =  valsysaku / valsysasw;
} else {
    valsysaku   =  newvalue;             
    valsysasw   =  valsysasw + 1;                                                   // Anzahl der Messungen mit dieser
    newaverage  =  valsysaku / valsysasw;
    newaverage  = TimeCalc(newaverage,nummer);                                      // formatiere "dddd.hh.mm.ss falls gewünscht"
}

if( typeof(newaverage) == "number") {
    setState(cntave,round(newaverage,stellen));                                     // Schreiben des neuen Durchschnittswertes 
} else {
    setState(cntave,newaverage);                                                    // Schreiben des neuen Durchschnittswertes    
}
setState(sysaku,valsysaku);                                                         // Schreiben der neuen Kumulation in den Systembereich
setState(sysasw,valsysasw);                                                         // Schreiben der neuen Switchnummer in den Systembereich

  if (day)  {                                                                       // update der taeglichen kumulierten Betriebszeit
    periode = "."+PeriodeDay;                                                       // gehoerige Periode zum pfad
    valsysasw   = Number(getState(sysasw+periode).val);                             // Lese letzte kumuoerte Perioden-Betriebszeit 
    if(kumulation) {                                                                //Anzahl Messungen aus dem sysembereich 
       valsysaku =  Number(getState(sysaku+periode).val);                           // Lesen des kumulierten Wertes aus dem Systembereich
       valsysaku =  valsysaku + newvalue;                                           // Kumulation in den Systembereich 
    } else {
        valsysaku =  newvalue;             
    }
    valsysasw   = valsysasw + 1;                                                    // Anzahl der Messungen mit dieser
    newaverage  = valsysaku / valsysasw;                                            // neuer Durchschnitt
    newaverage  = TimeCalc(newaverage,nummer);                                      // formatiere "dddd.hh.mm.ss falls gewünscht"
    if( typeof(newaverage) == "number") {
        setState(cntave+periode,round(newaverage,stellen));                         // Schreiben des neuen Durchschnittswertes 
    } else {
        setState(cntave+periode,newaverage);                                        // Schreiben des neuen Durchschnittswertes    
    }
    setState(sysaku+periode,valsysaku);                                             // Schreiben der neuen Kumulation in den Systembereich
    setState(sysasw+periode,valsysasw);                                             // Schreiben der neuen Switchnummer in den Systembereich

  }

 if (week)  {                                                                        // update der taeglichen kumulierten Betriebszeit
    periode = "."+PeriodeWeek;                                                              // gehoerige Periode zum pfad
    valsysasw   = Number(getState(sysasw+periode).val);                             // Lese letzte kumuoerte Perioden-Betriebszeit 
    if(kumulation) {                                                                //Anzahl Messungen aus dem sysembereich 
       valsysaku =  Number(getState(sysaku+periode).val);                           // Lesen des kumulierten Wertes aus dem Systembereich
       valsysaku =  valsysaku + newvalue;                                           // Kumulation in den Systembereich 
    } else {
        valsysaku =  newvalue;             
    }
    valsysasw   = valsysasw + 1;                                                    // Anzahl der Messungen mit dieser
    newaverage  = valsysaku / valsysasw;                                            // neuer Durchschnitt
    newaverage  = TimeCalc(newaverage,nummer);                                      // formatiere "dddd.hh.mm.ss falls gewünscht"
    if( typeof(newaverage) == "number") {
        setState(cntave+periode,round(newaverage,stellen));                         // Schreiben des neuen Durchschnittswertes 
    } else {
        setState(cntave+periode,newaverage);                                        // Schreiben des neuen Durchschnittswertes    
    }
    setState(sysaku+periode,valsysaku);                                             // Schreiben der neuen Kumulation in den Systembereich
    setState(sysasw+periode,valsysasw);                                             // Schreiben der neuen Switchnummer in den Systembereich
  }

 if (month)  {                                                                      // update der taeglichen kumulierten Betriebszeit
    periode = "."+PeriodeMonth;                                                             // gehoerige Periode zum pfad
    valsysasw   = Number(getState(sysasw+periode).val);                             // Lese letzte kumuoerte Perioden-Betriebszeit 
    if(kumulation) {                                                                //Anzahl Messungen aus dem sysembereich 
       valsysaku =  Number(getState(sysaku+periode).val);                           // Lesen des kumulierten Wertes aus dem Systembereich
       valsysaku =  valsysaku + newvalue;                                           // Kumulation in den Systembereich 
    } else {
        valsysaku =  newvalue;             
    }
    valsysasw   = valsysasw + 1;                                                    // Anzahl der Messungen mit dieser
    newaverage  = valsysaku / valsysasw;                                            // neuer Durchschnitt
    newaverage  = TimeCalc(newaverage,nummer);                                      // formatiere "dddd.hh.mm.ss falls gewünscht"
    if( typeof(newaverage) == "number") {
        setState(cntave+periode,round(newaverage,stellen));                         // Schreiben des neuen Durchschnittswertes 
    } else {
        setState(cntave+periode,newaverage);                                        // Schreiben des neuen Durchschnittswertes    
    }
    setState(sysaku+periode,valsysaku);                                             // Schreiben der neuen Kumulation in den Systembereich
    setState(sysasw+periode,valsysasw);                                             // Schreiben der neuen Switchnummer in den Systembereich

  }

 if (year)  {                                                                        // update der taeglichen kumulierten Betriebszeit
    periode = "."+PeriodeYear;                                                              // gehoerige Periode zum pfad
    valsysasw   = Number(getState(sysasw+periode).val);                             // Lese letzte kumuoerte Perioden-Betriebszeit 
    if(kumulation) {                                                                //Anzahl Messungen aus dem sysembereich 
       valsysaku =  Number(getState(sysaku+periode).val);                           // Lesen des kumulierten Wertes aus dem Systembereich
       valsysaku =  valsysaku + newvalue;                                           // Kumulation in den Systembereich 
    } else {
        valsysaku =  newvalue;             
    }
    valsysasw   = valsysasw + 1;                                                    // Anzahl der Messungen mit dieser
    newaverage  = valsysaku / valsysasw;                                            // neuer Durchschnitt
    newaverage  = TimeCalc(newaverage,nummer);                                      // formatiere "dddd.hh.mm.ss falls gewünscht"
    if( typeof(newaverage) == "number") {
        setState(cntave+periode,round(newaverage,stellen));                         // Schreiben des neuen Durchschnittswertes 
    } else {
        setState(cntave+periode,newaverage);                                        // Schreiben des neuen Durchschnittswertes    
    }
    setState(sysaku+periode,valsysaku);                                             // Schreiben der neuen Kumulation in den Systembereich
    setState(sysasw+periode,valsysasw);                                             // Schreiben der neuen Switchnummer in den Systembereich

  }

}       // end function

// Part 2.4 Minimum Maximum Werte  ermitteln und schreiben
//-----------------------------------------------------------------------------------------------------
// Funktion MINMAX  ermitteln und speichern
//-----------------------------------------------------------------------------------------------------
function MINMAX(nummer,day,week,month,year,statusname,newvalue,diffvalueraw,addition1,addition2,faktor,stellen,kumulation) {
// nummer                           = Zeile aus der Gruppentabelle
// day, week, month, year           = sollen die Perioden geschrieben werden ?
// statusname                       = Feldname(Thema) der Struktur
// newvalue                         = neuer Wert, der aus der Methode berechnet wurde
// diffvalueraw                     = Rohwert - wenn Schwellwertprüfung erfolgen soll dann wird gegen diesen Wert geprueft
//addition1,additin2,faktor,stellen = Berechnungsvariablen aus der Tabelle special
//Kumulation                        = soll der Wert übernommen oder kumuliert werden (Anm: aus CALC muss kumuliert werden)

var sysmin  = GrpSystem[nummer][5]+"."+statusname;                              //BSZ.system.Grp00AAKU.Statusname
var sysmax  = GrpSystem[nummer][6]+"."+statusname;                              //BSZ.system.Grp00ASW.Statusname
var cntmin  = countLocation + "." + Gruppen[nummer][1]+".MINIMUM."+ statusname; //BSZ.counter.AVERAGE.Statusname
var cntmax  = countLocation + "." + Gruppen[nummer][1]+".MAXIMUM."+ statusname; //BSZ.counter.AVERAGE.Statusname
var valsysmin;
var valsysmax;
var valcntmin;
var valcntmax;
var periode;

if (special[nummer][11] !== true) {
    return;                                                                     // MINMAX ist nicht aktiv
}

newvalue = diffvalueraw;
if(special[nummer][5]  !== '') {                                                // Individualfunktionen 
   newvalue =  individual(special[nummer][5].toUpperCase(),nummer,diffvalraw);  // hier kommt ein umgerechneter Wertaus der Individualfunktion zurück  z.B. KG . 
} // endif Individualfunktion 

newvalue = newvalue + addition1;                                            // neuberechnen, da kumulation nicht gewünscht
newvalue = newvalue * faktor;                                                   // Faktor anwenden 
newvalue = newvalue + addition2;

valsysmin       =  Number(getState(sysmin).val);                                // Lesen MINMAX Wert aus dem systembereich 
valsysmax       =  Number(getState(sysmax).val);                                // Lesen MINMAX Wert aus dem systembereich 
valcntmin       = TimeCalc(newvalue,nummer);
valcntmax       = TimeCalc(newvalue,nummer);

if( getState(sysmin).val === null) {
    if ( typeof(valcntmin) == "number") {
        setState(cntmin,round(valcntmin,stellen));                              // Schreiben des neuen Min Wertes als Zahl
        setState(sysmin,diffvalueraw);                                          // Schreiben neuer Min Wert  in den Systembereich
    } else {
        setState(cntmin, valcntmin);                                            // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss
        setState(sysmin,diffvalueraw);                                          // Schreiben neuer Min Wert  in den Systembereich
    }
}

if( getState(sysmax).val === null) {
    if ( typeof(valcntmax) == "number") {
        setState(cntmax,round(valcntmax,stellen));                              // Schreiben des neuen Min Wertes als Zahl
        setState(sysmax,diffvalueraw);                                          // Schreiben neuer Min Wert  in den Systembereich
    } else {
        setState(cntmax, valcntmax);                                            // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
        setState(sysmax,diffvalueraw);                                          // Schreiben neuer Min Wert  in den Systembereich
    }
}

if( typeof(valsysmin) == "number") {
    if(diffvalueraw < valsysmin) { // aktueller Wert ist kleiner als letzter minimum Wert if ( typeof(valcntmin) == "number") { setState(cntmin,round(newvalue,stellen)); // Schreiben des neuen Min Wertes setState(sysmin,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } else { setState(cntmin, valcntmin); // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss setState(sysmin,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } } } if( typeof(valsysmax) == "number") { if(diffvalueraw > valsysmax) {                                              // aktueller Wert ist groesser  als letzter maximum  Wert 
        if ( typeof(valcntmax) == "number") {
            setState(cntmax,round(valcntmax,stellen));                          // Schreiben des neuen Min Wertes als Zahl
            setState(sysmax,diffvalueraw);                                      // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmax, valcntmax);                                        // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
            setState(sysmax,diffvalueraw);                                      // Schreiben neuer Min Wert  in den Systembereich
        }
    }            
}

  if (day)  {                                                                   // update der neuen MINMAX Werte
    periode = "."+PeriodeDay;                                                   // gehoerige Periode zum pfad
    if( getState(sysmin+periode).val === null) {
        if ( typeof(valcntmin) == "number") {
            setState(cntmin+periode,round(newvalue,stellen));                   // Schreiben des neuen Min Wertes 
            setState(sysmin+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmin+periode, valcntmin);                                // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss
            setState(sysmin+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich           
        }            
    }

    if( getState(sysmax+periode).val === null) {
        if ( typeof(valcntmax) == "number") {
            setState(cntmax+periode,round(valcntmax,stellen));                  // Schreiben des neuen Min Wertes als Zahl
            setState(sysmax+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmax+periode, valcntmax);                                // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
            setState(sysmax+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        }

    }

    valsysmin       =  Number(getState(sysmin+periode).val);                    // Lesen MINMAX Wert aus dem systembereich 
    valsysmax       =  Number(getState(sysmax+periode).val);                    // Lesen MINMAX Wert aus dem systembereich 

    if( typeof(valsysmin) == "number") {
        if(diffvalueraw < valsysmin) { // aktueller Wert ist kleiner als letzter minimum Wert if ( typeof(valcntmin) == "number") { setState(cntmin+periode,round(newvalue,stellen)); // Schreiben des neuen Min Wertes setState(sysmin+periode,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } else { setState(cntmin+periode, valcntmin); // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss setState(sysmin+periode,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } } } if( typeof(valsysmax) == "number") { if(diffvalueraw > valsysmax) {                                          // aktueller Wert ist groesser  als letzter maximum  Wert 
            if ( typeof(valcntmax) == "number") {
                setState(cntmax+periode,round(valcntmax,stellen));              // Schreiben des neuen Min Wertes als Zahl
                setState(sysmax+periode,diffvalueraw);                          // Schreiben neuer Min Wert  in den Systembereich
            } else {
                setState(cntmax+periode, valcntmax);                            // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
                setState(sysmax+periode,diffvalueraw);                          // Schreiben neuer Min Wert  in den Systembereich
            }        
        }
    }

  }

 if (week)  {                                                                   // update der neuen MINMAX Werte
    periode = "."+PeriodeWeek;                                                  // gehoerige Periode zum pfad
    if( getState(sysmin+periode).val === null) {
        if ( typeof(valcntmin) == "number") {
            setState(cntmin+periode,round(newvalue,stellen));                   // Schreiben des neuen Min Wertes 
            setState(sysmin+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmin+periode, valcntmin);                                // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss
            setState(sysmin+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich           
        }            
    }

    if( getState(sysmax+periode).val === null) {
        if ( typeof(valcntmax) == "number") {
            setState(cntmax+periode,round(valcntmax,stellen));                  // Schreiben des neuen Min Wertes als Zahl
            setState(sysmax+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmax+periode, valcntmax);                                // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
            setState(sysmax+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        }

    }

    valsysmin       =  Number(getState(sysmin+periode).val);                    // Lesen MINMAX Wert aus dem systembereich 
    valsysmax       =  Number(getState(sysmax+periode).val);                    // Lesen MINMAX Wert aus dem systembereich 

    if( typeof(valsysmin) == "number") {
        if(diffvalueraw < valsysmin) { // aktueller Wert ist kleiner als letzter minimum Wert if ( typeof(valcntmin) == "number") { setState(cntmin+periode,round(newvalue,stellen)); // Schreiben des neuen Min Wertes setState(sysmin+periode,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } else { setState(cntmin+periode, valcntmin); // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss setState(sysmin+periode,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } } } if( typeof(valsysmax) == "number") { if(diffvalueraw > valsysmax) {                                          // aktueller Wert ist groesser  als letzter maximum  Wert 
            if ( typeof(valcntmax) == "number") {
                setState(cntmax+periode,round(valcntmax,stellen));              // Schreiben des neuen Min Wertes als Zahl
                setState(sysmax+periode,diffvalueraw);                          // Schreiben neuer Min Wert  in den Systembereich
            } else {
                setState(cntmax+periode, valcntmax);                            // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
                setState(sysmax+periode,diffvalueraw);                          // Schreiben neuer Min Wert  in den Systembereich
            }        
        }
    }

 }

 if (month)  {                                                                  // update der neuen MINMAX Werte
    periode = "."+PeriodeMonth;                                                 // gehoerige Periode zum pfad
   if( getState(sysmin+periode).val === null) {
        if ( typeof(valcntmin) == "number") {
            setState(cntmin+periode,round(newvalue,stellen));                   // Schreiben des neuen Min Wertes 
            setState(sysmin+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmin+periode, valcntmin);                                // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss
            setState(sysmin+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich           
        }            
    }

    if( getState(sysmax+periode).val === null) {
        if ( typeof(valcntmax) == "number") {
            setState(cntmax+periode,round(valcntmax,stellen));                  // Schreiben des neuen Min Wertes als Zahl
            setState(sysmax+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmax+periode, valcntmax);                                // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
            setState(sysmax+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        }

    }

    valsysmin       =  Number(getState(sysmin+periode).val);                    // Lesen MINMAX Wert aus dem systembereich 
    valsysmax       =  Number(getState(sysmax+periode).val);                    // Lesen MINMAX Wert aus dem systembereich 

    if( typeof(valsysmin) == "number") {
        if(diffvalueraw < valsysmin) { // aktueller Wert ist kleiner als letzter minimum Wert if ( typeof(valcntmin) == "number") { setState(cntmin+periode,round(newvalue,stellen)); // Schreiben des neuen Min Wertes setState(sysmin+periode,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } else { setState(cntmin+periode, valcntmin); // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss setState(sysmin+periode,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } } } if( typeof(valsysmax) == "number") { if(diffvalueraw > valsysmax) {                                          // aktueller Wert ist groesser  als letzter maximum  Wert 
            if ( typeof(valcntmax) == "number") {
                setState(cntmax+periode,round(valcntmax,stellen));              // Schreiben des neuen Min Wertes als Zahl
                setState(sysmax+periode,diffvalueraw);                          // Schreiben neuer Min Wert  in den Systembereich
            } else {
                setState(cntmax+periode, valcntmax);                            // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
                setState(sysmax+periode,diffvalueraw);                          // Schreiben neuer Min Wert  in den Systembereich
            }        
        }
    }
 }

 if (year)  {                                                                   // update der neuen MINMAX Werte
    periode = "."+PeriodeYear;                                                  // gehoerige Periode zum pfad
   if( getState(sysmin+periode).val === null) {
        if ( typeof(valcntmin) == "number") {
            setState(cntmin+periode,round(newvalue,stellen));                   // Schreiben des neuen Min Wertes 
            setState(sysmin+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmin+periode, valcntmin);                                // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss
            setState(sysmin+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich           
        }            
    }

    if( getState(sysmax+periode).val === null) {
        if ( typeof(valcntmax) == "number") {
            setState(cntmax+periode,round(valcntmax,stellen));                  // Schreiben des neuen Min Wertes als Zahl
            setState(sysmax+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        } else {
            setState(cntmax+periode, valcntmax);                                // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
            setState(sysmax+periode,diffvalueraw);                              // Schreiben neuer Min Wert  in den Systembereich
        }

    }

    valsysmin       =  Number(getState(sysmin+periode).val);                    // Lesen MINMAX Wert aus dem systembereich 
    valsysmax       =  Number(getState(sysmax+periode).val);                    // Lesen MINMAX Wert aus dem systembereich 

    if( typeof(valsysmin) == "number") {
        if(diffvalueraw < valsysmin) { // aktueller Wert ist kleiner als letzter minimum Wert if ( typeof(valcntmin) == "number") { setState(cntmin+periode,round(newvalue,stellen)); // Schreiben des neuen Min Wertes setState(sysmin+periode,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } else { setState(cntmin+periode, valcntmin); // Schreiben des neuen Min Wertes als Char Wert format ddd:hh:mm:ss setState(sysmin+periode,diffvalueraw); // Schreiben neuer Min Wert in den Systembereich } } } if( typeof(valsysmax) == "number") { if(diffvalueraw > valsysmax) {                                          // aktueller Wert ist groesser  als letzter maximum  Wert 
            if ( typeof(valcntmax) == "number") {
                setState(cntmax+periode,round(valcntmax,stellen));              // Schreiben des neuen Min Wertes als Zahl
                setState(sysmax+periode,diffvalueraw);                          // Schreiben neuer Min Wert  in den Systembereich
            } else {
                setState(cntmax+periode, valcntmax);                            // Schreiben des neuen Min Wertes  als Char Wert format ddd:hh:mm:ss
                setState(sysmax+periode,diffvalueraw);                          // Schreiben neuer Min Wert  in den Systembereich
            }        
        }
    }    

 }

}       // end function

// Part3 Periodenwechsel
// Part 3.1 Vorbereitung Periodenwechsel
//-----------------------------------------------------------------------------------------------------
// Periodenwechsel
//-----------------------------------------------------------------------------------------------------
function PeriodChange() {                                                      
    var month =  addZero(new Date().getMonth()+1).zero2;                        // aktueller Monat
    var year =   new Date().getFullYear();                                      // aktuelles jahr
    var day =    addZero(new Date().getDate()).zero2;                           // Heutiger Tag
    var weekday = new Date().getDay();                                          // Tag der Woche 1 = Monday
    var zaehler2;
    for ( var zaehler = 0,                                                      // loop durch die Gruppendefinition
        zaehler_array = Gruppen.length;
        zaehler < zaehler_array;
        zaehler++) {
        if (Gruppen[zaehler][0] === "INITIAL") {  continue; }                   // Check Gueltigkeit object
        if (Gruppen[zaehler][18] === true) { continue;  }                       // Objekt ist mit refresh gekennzeichnet - keine updates
        if (ObjectExists(Gruppen[zaehler][0]) === false) { continue; }          // Objekt existiert noch mal im System checken
        TimeNull(zaehler,"TIME","day",false);                                   // day   werte zuruecksetzen
        TimeNull(zaehler,"SWITCH","day",false);                                 // day   werte zuruecksetzen
        TimeNull(zaehler,"DELTA","day",false);                                  // day   werte zuruecksetzen
        TimeNull(zaehler,"DELTAM","day",false);                                 // day   werte zuruecksetzen
        TimeNull(zaehler,"CALC","day",false);                                   // day   werte zuruecksetzen
        TimeNull(zaehler,"AVERAGE","day",false);                                // day   werte zuruecksetzen
        TimeNull(zaehler,"MINMAX","day",false);                                 // day   werte zuruecksetzen

        if ( weekday  === 1)  {                                                 // wochenwechsel (montags)
            TimeNull(zaehler,"TIME","week",false);                              // wochen  werte zuruecksetzen
            TimeNull(zaehler,"SWITCH","week",false);                            // wochen  werte zuruecksetzen 
            TimeNull(zaehler,"DELTA","week",false);                             // wochen  werte zuruecksetzen     
            TimeNull(zaehler,"DELTAM","week",false);                            // wochen  werte zuruecksetzen
            TimeNull(zaehler,"CALC","week",false);                              // wochen  werte zuruecksetzen  
            TimeNull(zaehler,"AVERAGE","week",false);                           // wochen  werte zuruecksetzen
            TimeNull(zaehler,"MINMAX","week",false);                            // wochen   werte zuruecksetzen
        }
        if ( day === "01") {                                                    // monatswechsel
            TimeNull(zaehler,"TIME","month",true);                              // monats  werte zuruecksetzen
            TimeNull(zaehler,"SWITCH","month",true);                            // monats  werte zuruecksetzen                       
            TimeNull(zaehler,"DELTA","month",true);                             // monats  werte zuruecksetzen     
            TimeNull(zaehler,"DELTAM","month",true);                            // monats   werte zuruecksetzen
            TimeNull(zaehler,"CALC","month",true);                              // monats  werte zuruecksetzen     
            TimeNull(zaehler,"AVERAGE","month",true);                           // monats  werte zuruecksetzen
        TimeNull(zaehler,"MINMAX","month",false);                               // monats   werte zuruecksetzen
        }
        if ( day === "01" && month === "01") {                                  // Jahreswechsel
            CreateDelStates();                                                  // Bei jahrswechsel müssen die neuen Jahres/Monatsdaten angelegt werden
            TimeNull(zaehler,"TIME","year",true);                               // jahres  werte zuruecksetzen
            TimeNull(zaehler,"SWITCH","year",true);                             // jahres  werte zuruecksetzen                        
            TimeNull(zaehler,"DELTA","year",true);                              // jahres  werte zuruecksetzen     
            TimeNull(zaehler,"DELTAM","year",true);                             // jahres  werte zuruecksetzen     
            TimeNull(zaehler,"CALC","year",true);                               // jahres  werte zuruecksetzen    
            TimeNull(zaehler,"AVERAGE","year",true);                            // jahres  werte zuruecksetzen  
        TimeNull(zaehler,"MINMAX","year",false);                                // jahres   werte zuruecksetzen
        }
     } // endfor

    log("EVENT Betriebsstundenzaehler werden zurueckgesetzt TAG:"+ day +" Wochentag " + weekday + "Monat " + month , "info");   // schreibe Log
}       // end function

// Part 3.2 Ausführen Periodenwechsel
//----------------------------------------------------------------------------------------------------
// Funktion Zeitabschnitte Nullen wird täglich aufgerufen oder wenn refresh eingestellt ist
//-----------------------------------------------------------------------------------------------------
function TimeNull(zaehler,type,periode,histupd) {
// uebergabewerte 
// zaehler = momentane HM-ID
// type = alle Methoden
// periode = day, week, month, year
// histupd (fortschreibung der historie = true / false)
    var month       =  addZero(new Date().getMonth()+1).zero2;                                                          // aktueller Monat
    var monthvor    =  addZero(new Date().getMonth()).zero2;                                                            // Vormonat
    if (month === "01") { monthvor = "12";  }                                                                           // im Falle von jahreswechsel
    var year =   new Date().getFullYear();                                                                              // aktuelles jahr
    var yearvor =new Date().getFullYear()-1;                                                                            // Jahr fuer die Historyfortschreibung - also Vorjahr

    var statusname ="";                                                                                                 // Statusname fur die Fortschreibung/Nullung
    var updateobj = " ";                                                                                                // Pfad fuer die TIME und SWITCH Variablen
    var histupdateobj;                                                                                                  // Pfad fuer die Historyfortschreibung
    var kumvalue;                                                                                                       // letzten Wert merken fuer das log

    var objGruppe   = Gruppen[zaehler][0];                                                                              // die iobroker bwz. HM  object ID
    var objMSec     = GrpSystem[zaehler][0];                                                                            // BSZ.SystemGrp00.MSec
    var objKum      = GrpSystem[zaehler][1];                                                                            // BSZ.SystemGrp00.Kum
    var objTime     = GrpSystem[zaehler][2];                                                                            // BSZ.Counter.Feldname
    var objSwitch   = GrpSystem[zaehler][2];                                                                            // BSZ.Counter.Feldname   
    var sysaku      = GrpSystem[zaehler][3];                                                                            // BSZ.system.Grp00AKU
    var sysasw      = GrpSystem[zaehler][4];                                                                            // BSZ.system.Grp00ASW
    var cntave      = countLocation + "." + Gruppen[zaehler][1]+".AVERAGE";                                             //BSZ.counter.AVERAGE
    var sysmin      = GrpSystem[zaehler][5];                                                                            // BSZ.system.Grp00MIN
    var sysmax      = GrpSystem[zaehler][6];                                                                            // BSZ.system.Grp00MAX    
    var cntmin      = countLocation + "." + Gruppen[zaehler][1]+".MINIMUM";                                             //BSZ.counter.MINIMUM
    var cntmax      = countLocation + "." + Gruppen[zaehler][1]+".MAXIMUM";                                             //BSZ.counter.MAXIMUM

    type = type.toUpperCase();                                                                                          // umwandeln in Grossbuchstaben
    GeraeteName   = getObject(objGruppe).common.name;                                                                   // Auslesen der Bezeichnung des Geraetes
    for ( var statuszaehler = 8; statuszaehler < 18; statuszaehler++) { if (Gruppen[zaehler][statuszaehler] === '' ) {continue; } // kein Status dann nächster loop if (type === "CALC" && Gruppen[zaehler][statuszaehler] !== type ) {continue; } // kein Status update für Methode dann nächster loop if (type === "DELTA" && Gruppen[zaehler][statuszaehler] !== type ) {continue; } // kein Status update für Methode dann nächster loop if (type === "DELTAM" && Gruppen[zaehler][statuszaehler] !== type ) {continue; } // kein Status update für Methode dann nächster loop if (type === "TIME") { // ist es ein TIME type ? if (Gruppen[zaehler][statuszaehler] === "CALC" || Gruppen[zaehler][statuszaehler] === "DELTA" || Gruppen[zaehler][statuszaehler] === "DELTAM") { continue; // es ist kein TIME objekt } // kein time objekt } // es ist type TIME if (logname[zaehler][statuszaehler-8] !== '') { // Gibt es einen Status in der logname tabelle ? wenn ja merken mit vorrang statusname = logname[zaehler][statuszaehler-8]; } // zurücksetzen der DAY variablen if (type !== "SWITCH" && type !== "AVERAGE" && type !== "MINMAX" && periode === "day" && Gruppen[zaehler][3] === true) { // taegliche Summmierung aktiv ? updateobj = objTime + "." + type + "." + statusname + "."+PeriodeDay; updateobjb= objTime + "." + type + "." + statusname + "."+PeriodeDay+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern updateobj = objKum + "." + statusname + "."+PeriodeDay; // das system kum objekt fuer TAG zurücksetzen setState(updateobj, 0); // zurücksetzen des system Kumulationsobjektes writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei // zurücksetzen der SWITCH DAY variablen } // Endif objekt existiert } // Endif taegliche Summmierung aktiv ? if (type === "SWITCH" && periode === "day" && Gruppen[zaehler][3] === true && Gruppen[zaehler][7] === true) { // sumierung und switch sind aktiv updateobj = objSwitch + "." + type + "." + statusname + "."+PeriodeDay; updateobjb= objSwitch + "." + type + "." + statusname + "."+PeriodeDay+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet exister } if (type === "AVERAGE" && periode === "day" && Gruppen[zaehler][3] === true && special[zaehler][8] === true) { // sumierung und AVERAGE sind aktiv updateobj = sysaku + "." + statusname + "."+PeriodeDay; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf } // endif geraet existert updateobj = sysasw + "." + statusname + "."+PeriodeDay; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf } // endif geraet existert updateobj = cntave + "." + statusname + "."+PeriodeDay; updateobjb= cntave + "." + statusname + "."+PeriodeDay+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert } // endif update für AVERAGE funktion if (type === "MINMAX" && periode === "day" && Gruppen[zaehler][3] === true && special[zaehler][11] === true) { // sumierung und MINMAX sind aktiv updateobj = sysmin + "." + statusname + "."+PeriodeDay; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj, null); // taeglicher Zaehler auf } // endif geraet existert updateobj = sysmax + "." + statusname + "."+PeriodeDay; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj, null); // taeglicher Zaehler auf } // endif geraet existert updateobj = cntmin + "." + statusname + "."+PeriodeDay; updateobjb= cntmin + "." + statusname + "."+PeriodeDay+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert updateobj = cntmax + "." + statusname + "."+PeriodeDay; updateobjb= cntmax + "." + statusname + "."+PeriodeDay+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert } // endif update für MINMAX funktion // zurücksetzen der WEEK variablen if (type !== "SWITCH" && type !== "AVERAGE" && type !== "MINMAX" && periode === "week" && Gruppen[zaehler][4] === true) { // wöchentliche summierung aktiv updateobj = objTime + "." + type + "." + statusname + "."+PeriodeWeek; // Pfad zusammensetzen updateobjb = objTime + "." + type + "." + statusname + "."+PeriodeWeek+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken setState(updateobj,0); // Wöchentlicher Zaehler auf 0 updateobj = objKum + "." + statusname + "."+PeriodeWeek; // das system kum objekt fuer WEEK zurücksetzen setState(updateobj, 0); // zurücksetzen des system Kumulationsobjektes setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern writelog(zaehler,"T",type + ";"+ periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei } // endif objekt existiert } // Endif woechentliche Summmierung aktiv ? if (type === "SWITCH" && periode === "week" && Gruppen[zaehler][4] === true && Gruppen[zaehler][7] === true) { // wöchentliche summierung und switch aktiv updateobj = objSwitch + "." + type + "." + statusname + "."+PeriodeWeek; // Pfad zusammensetzen updateobjb= objSwitch + "." + type + "." + statusname + "."+PeriodeWeek+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken setState(updateobj,0); // woechentlicher Zaehler auf 0 setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei } // object existiert } // Endif woechentliche Summmierung und switch aktiv ? if (type === "AVERAGE" && periode === "week" && Gruppen[zaehler][3] === true && special[zaehler][8] === true) { // sumierung und AVERAGE sind aktiv updateobj = sysaku + "." + statusname + "."+PeriodeWeek; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf } // endif geraet existert updateobj = sysasw + "." + statusname + "."+PeriodeWeek; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf } // endif geraet existert updateobj = cntave + "." + statusname + "."+PeriodeWeek; updateobjb= cntave + "." + statusname + "."+PeriodeWeek+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert } // endif update für AVERAGE funktion if (type === "MINMAX" && periode === "week" && Gruppen[zaehler][3] === true && special[zaehler][11] === true) { // sumierung und MINMAX sind aktiv updateobj = sysmin + "." + statusname + "."+PeriodeWeek; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj, null); // taeglicher Zaehler auf } // endif geraet existert updateobj = sysmax + "." + statusname + "."+PeriodeWeek; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj, null); // taeglicher Zaehler auf } // endif geraet existert updateobj = cntmin + "." + statusname + "."+PeriodeWeek; updateobjb= cntmin + "." + statusname + "."+PeriodeWeek+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert updateobj = cntmax + "." + statusname + "."+PeriodeWeek; updateobjb= cntmax + "." + statusname + "."+PeriodeWeek+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert } // endif update für MINMAX funktion // zurücksetzen der MONTH variablen if (type !== "SWITCH" && type !== "AVERAGE" && type !== "MINMAX" && periode === "month" && Gruppen[zaehler][5] === true) { // monatliche summierung aktiv updateobj = objTime + "." + type + "." + statusname + "."+PeriodeMonth; updateobjb= objTime + "." + type + "." + statusname + "."+PeriodeMonth+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das Objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken setState(updateobj,0); // Wöchentlicher Zaehler auf 0 setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei // evt zuerst den Monatswert in die Historie speichern if (Gruppen[zaehler][2] === true && histupd === true) { // soll History Variable soll angelegt werden ? histupdateobj = objTime + "." + type + "." + statusname + "." + "HISTORY" + "." + PeriodeMonth + "."; // Pfad fuer History des nächsten Monats if (month === "01") { // Jahreswechsel setState(histupdateobj+yearvor+monthvor,kumvalue); // Jahreswechsel als vorjahr nehmen nur Neujahr } else { setState(histupdateobj+year+monthvor,kumvalue); // kein jahreswechsel also in letzten Monat speichern } } // endif History soll angelegt werden setState(updateobj,0); // Monatlicher Zaehler auf 0 für updateobj = objKum + "." + statusname + "."+PeriodeMonth; // das system kum objekt fuer Monat zurücksetzen setState(updateobj, 0); } // Endif objekt existiert } // Endif monatliche Summmierung aktiv ? if (type === "SWITCH" && type !== "AVERAGE" && periode === "month" && Gruppen[zaehler][5] === true && Gruppen[zaehler][7] === true) { // monatliche summierung und switch aktiv updateobj = objSwitch + "." + type + "." + statusname + "."+PeriodeMonth; updateobjb= objSwitch + "." + type + "." + statusname + "."+PeriodeMonth+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das Objekt ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken setState(updateobj,0); // monatlicher Zaehler auf 0 setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei } // Endif objekt exists } // monatliche summierung und switch aktiv if (type === "AVERAGE" && periode === "month" && Gruppen[zaehler][3] === true && special[zaehler][8] === true) { // sumierung und AVERAGE sind aktiv updateobj = sysaku + "." + statusname + "."+PeriodeMonth; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf } // endif geraet existert updateobj = sysasw + "." + statusname + "."+PeriodeMonth; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf } // endif geraet existert updateobj = cntave + "." + statusname + "."+PeriodeMonth; updateobjb= cntave + "." + statusname + "."+PeriodeMonth+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei // evt zuerst den Monatswert in die Historie speichern if (Gruppen[zaehler][2] === true && histupd === true) { // soll History Variable soll angelegt werden ? histupdateobj = objTime + "." + "AVERAGE" + "." + statusname + "." + "HISTORY" + "." + PeriodeMonth + "."; // Pfad fuer History des nächsten Monats if (month === "01") { // Jahreswechsel setState(histupdateobj+yearvor+monthvor,kumvalue); // Jahreswechsel als vorjahr nehmen nur Neujahr } else { setState(histupdateobj+year+monthvor,kumvalue); // kein jahreswechsel also in letzten Monat speichern } } // endif History soll angelegt werden setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert } // endif update für AVERAGE funktion if (type === "MINMAX" && periode === "month" && Gruppen[zaehler][3] === true && special[zaehler][11] === true) { // sumierung und MINMAX sind aktiv updateobj = sysmin + "." + statusname + "."+PeriodeMonth; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj, null); // taeglicher Zaehler auf } // endif geraet existert updateobj = sysmax + "." + statusname + "."+PeriodeMonth; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj, null); // taeglicher Zaehler auf } // endif geraet existert updateobj = cntmin + "." + statusname + "."+PeriodeMonth; updateobjb= cntmin + "." + statusname + "."+PeriodeMonth+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei // evt zuerst den Monatswert in die Historie speichern if (Gruppen[zaehler][2] === true && histupd === true) { // soll History Variable soll angelegt werden ? histupdateobj = objTime + "." + "MINIMUM" + "." + statusname + "." + "HISTORY" + "." + PeriodeMonth + "."; // Pfad fuer History des nächsten Monats if (month === "01") { // Jahreswechsel setState(histupdateobj+yearvor+monthvor,kumvalue); // Jahreswechsel als vorjahr nehmen nur Neujahr } else { setState(histupdateobj+year+monthvor,kumvalue); // kein jahreswechsel also in letzten Monat speichern } } // endif History soll angelegt werden setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert updateobj = cntmax + "." + statusname + "."+PeriodeMonth; updateobjb= cntmax + "." + statusname + "."+PeriodeMonth+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei // evt zuerst den Monatswert in die Historie speichern if (Gruppen[zaehler][2] === true && histupd === true) { // soll History Variable soll angelegt werden ? histupdateobj = objTime + "." + "MAXIMUM" + "." + statusname + "." + "HISTORY" + "." + PeriodeMonth + "."; // Pfad fuer History des nächsten Monats if (month === "01") { // Jahreswechsel setState(histupdateobj+yearvor+monthvor,kumvalue); // Jahreswechsel als vorjahr nehmen nur Neujahr } else { setState(histupdateobj+year+monthvor,kumvalue); // kein jahreswechsel also in letzten Monat speichern } } // endif History soll angelegt werden setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert } // endif update für MINMAX funktion // zurücksetzen der YEAR variablen if (type !== "SWITCH" && type !== "AVERAGE" && type !== "MINMAX" && periode === "year" && Gruppen[zaehler][6] === true) { // jaehrliche summierung aktiv updateobj = objTime + "." + type + "." + statusname + "."+PeriodeYear; updateobjb= objTime + "." + type + "." + statusname + "."+PeriodeYear+".BEFORE"; if (ObjectExists(updateobj)) { // existiert das Objekt ? kumvalue =getState(updateobj).val; // vor nullung noch den Wert merken // evt zuerst den Jahreswert in die Historie speichern if (Gruppen[zaehler][2] === true && histupd === true) { // soll History Variable angelegt werden ? histupdateobj = objTime + "." + type + "." + statusname + "." + "HISTORY" + "." + PeriodeYear + "."; // Pfad fuer History des nächsten Jahres setState(histupdateobj+yearvor,kumvalue); // Wert in das letzte Jahr Monat speichern } // endif History soll angelegt werden setState(updateobj,0); // jaehrlicher Zaehler auf 0 updateobj = objKum + "." + statusname + "."+PeriodeYear; // das system kum objekt fuer JAHR zurücksetzen setState(updateobj, 0); setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei } // Endif objekt existis } // Endif jaehrliche Summmierung existent ? if (type === "SWITCH" && periode === "year" && Gruppen[zaehler][6] === true && Gruppen[zaehler][7] === true) { // jaehrliche summierung und switch aktiv updateobj = objSwitch + "." + type + "." + statusname + "."+PeriodeYear; updateobjb= objSwitch + "." + type + "." + statusname + "."+PeriodeYear+".BEFORE"; if (ObjectExists(updateobj)) { // Ist jaehrliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken setState(updateobj,0); // jaehrlicher Zaehler auf 0 setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei } } if (type === "AVERAGE" && periode === "year" && Gruppen[zaehler][3] === true && special[zaehler][8] === true) { // sumierung und AVERAGE sind aktiv updateobj = sysaku + "." + statusname + "."+PeriodeYear; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf } // endif geraet existert updateobj = sysasw + "." + statusname + "."+PeriodeYear; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj,0); // taeglicher Zaehler auf } // endif geraet existert updateobj = cntave + "." + statusname + "."+PeriodeYear; updateobjb= cntave + "." + statusname + "."+PeriodeYear+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei // evt zuerst den Jahreswert in die Historie speichern if (Gruppen[zaehler][2] === true && histupd === true) { // soll History Variable angelegt werden ? histupdateobj = objTime + "." + "AVERAGE" + "." + statusname + "." + "HISTORY" + "." + PeriodeYear +"."; // Pfad fuer History des nächsten Jahres setState(histupdateobj+yearvor,kumvalue); // Wert in das letzte Jahr Monat speichern } // endif History soll angelegt werden setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert } // endif update für AVERAGE funktion if (type === "MINMAX" && periode === "year" && Gruppen[zaehler][3] === true && special[zaehler][11] === true) { // sumierung und MINMAX sind aktiv updateobj = sysmin + "." + statusname + "."+PeriodeYear; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj, null); // taeglicher Zaehler auf } // endif geraet existert updateobj = sysmax + "." + statusname + "."+PeriodeYear; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei setState(updateobj, null); // taeglicher Zaehler auf } // endif geraet existert updateobj = cntmin + "." + statusname + "."+PeriodeYear; updateobjb= cntmin + "." + statusname + "."+PeriodeYear+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei // evt zuerst den Jahreswert in die Historie speichern if (Gruppen[zaehler][2] === true && histupd === true) { // soll History Variable angelegt werden ? histupdateobj = objTime + "." + "MINIMUM" + "." + statusname + "." + "HISTORY" + "." + PeriodeYear +"."; // Pfad fuer History des nächsten Jahres setState(histupdateobj+yearvor,kumvalue); // Wert in das letzte Jahr Monat speichern } // endif History soll angelegt werden setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert updateobj = cntmax + "." + statusname + "."+PeriodeYear; updateobjb= cntmax + "." + statusname + "."+PeriodeYear+".BEFORE"; if (ObjectExists(updateobj)) { // Ist taegliche Betriebszeitenkumulation eingeschaltet ? kumvalue = getState(updateobj).val; // vor nullung noch den Wert merken writelog(zaehler,"T",type + ";" + periode + ";" + Gruppen[zaehler][0] + ";" + GeraeteName +";" + updateobj+ ";" + kumvalue); // schreibe log in externe Datei // evt zuerst den Jahreswert in die Historie speichern if (Gruppen[zaehler][2] === true && histupd === true) { // soll History Variable angelegt werden ? histupdateobj = objTime + "." + "MAXIMUM" + "." + statusname + "." + "HISTORY" + "." + PeriodeYear +"."; // Pfad fuer History des nächsten Jahres setState(histupdateobj+yearvor,kumvalue); // Wert in das letzte Jahr Monat speichern } // endif History soll angelegt werden setState(updateobj,0); // taeglicher Zaehler auf setState(updateobjb,kumvalue); // Vorperiode mit WErt aus aktueller Periode sichern } // endif geraet existert } // endif update für AVERAGE funktion } // endfor statusloop } // end function // 4\. Allgemeine Funktionen //----------------------------------------------------------------------------------------------------- // Funktion zur Zeitdifferenzrechnung mit Format DDD:HH:MM:SS oder Umrechnung in andere Formate //----------------------------------------------------------------------------------------------------- function TimeCalc(diff,nummer) { // Millisekunden umrechnen in Tag Stunden Minuten Sekunden var time; if(Gruppen[nummer][8] === 'CALC') { time = diff; return time; } // Format DDDD:HH:MM:SS if(special[nummer][0] === '' && special[nummer][1] === '' && special[nummer][2] === '' && special[nummer][3] === '' && special[nummer][4] === '' && special[nummer][5] === '') { // keine Urechnungslogik hinterlegt var tag = addZero(Math.floor(diff / (1000*60*60*24))).zero3; diff = diff % (1000*60*60*24); var std = addZero(Math.floor(diff / (1000*60*60))).zero2; diff = diff % (1000*60*60); var min = addZero(Math.floor(diff / (1000*60))).zero2; diff = diff % (1000*60); var sec = addZero(Math.floor(diff / 1000)).zero2; time = tag + ":" + std + ":" + min + ":" + sec; // jetzt ddd:hh:mm:ss zusammensetzen } else { time = diff; } return time; } // Ende Funktion //----------------------------------------------------------------------------------------------------- // Funktion Speichern der Switches in die Zeitabschnitte //----------------------------------------------------------------------------------------------------- function SwitchKum(day,week,month,year,objSwitch) { if (day) { // update der taeglichen kumulierten Betriebszeit DayKum = getState(objSwitch+ '.'+PeriodeDay).val; // Lese kumuoerte Tagesbetriebszeit DayKum = DayKum + 1; // addiere die ermittelte Betriebszeit setState(objSwitch+'.'+PeriodeDay,DayKum); // Schreibe die neue Betriebszeit } if (week) { WeekKum = getState(objSwitch+'.'+PeriodeWeek).val; WeekKum = WeekKum + 1; setState(objSwitch+'.'+PeriodeWeek,WeekKum); } if (month){ MonthKum = getState(objSwitch+'.'+PeriodeMonth).val; MonthKum = MonthKum + 1; setState(objSwitch+'.'+PeriodeMonth,MonthKum); } if (year) { YearKum = getState(objSwitch+'.'+PeriodeYear).val; YearKum = YearKum + 1; setState(objSwitch+'.'+PeriodeYear,YearKum); } } // endif function //----------------------------------------------------------------------------------------------------- // Rundungsfunktion //----------------------------------------------------------------------------------------------------- function round(value, stellen) { value = parseFloat(value); if (!value) {return 0; } dez = parseInt(stellen,10); if (!stellen) { stellen=0; } var umrechnungsfaktor = Math.pow(10,stellen); return Math.round(value * umrechnungsfaktor) / umrechnungsfaktor; } // end function //----------------------------------------------------------------------------------------------------- // Funktion zur Umwandlung in Zahlen mit Komma statt Punkt (excel) //----------------------------------------------------------------------------------------------------- function TauschePunktKomma(x) { var TextAusgabe = x.toString(); TextAusgabe = TextAusgabe .replace(".",","); return TextAusgabe ; } //----------------------------------------------------------------------------------------------------- // Funktion zum umwandeln von string und boolean in 0 //----------------------------------------------------------------------------------------------------- function CheckNumber(value) { if(typeof value != "number") { return 0; } return value; } //----------------------------------------------------------------------------------------------------- // Loeschen eines States mit existent Abfrage //----------------------------------------------------------------------------------------------------- function ObjectExistsDelState(path) { if (getState(path)) { // Existiert der Datenpunkt ? deleteState(path); } // endif check on datenpunkt exists } // ende Funktion //----------------------------------------------------------------------------------------------------- // Funktion zur Ueberpruefung ob die angegebenen Geraete exisiteren //----------------------------------------------------------------------------------------------------- function ObjectExists(objGruppe) { back = false; if (SpaceChk.test(objGruppe)) { // objIDGruppe darf kein space enthalten // ist ein Geraet ueberhaupt zugeordnet ? return back; } // endif IDGruppe hat kein assignment if (getState(objGruppe)) { // Existiert das Geraet ? back = true; } else { log("Geraet existiert nicht - bitte in den Einstellungen ueberpruefen - Gruppe " + objGruppe, "info"); } // endif check on Geraet exists return back; } // ende Funktion //----------------------------------------------------------------------------------------------------- // Funktion schreibt einen Logeintrag in das Filesystem und auch in das interne Log-System //----------------------------------------------------------------------------------------------------- function writelog(nummer,type,string) { // Zerlege Datum und Zeit in Variable var now = new Date(); // store current date and time var year = now.getFullYear(); var month = addZero(now.getMonth()+1).zero2; var day = addZero(now.getDate()).zero2; var Thour = addZero(now.getHours()).zero2; var Tmin = addZero(now.getMinutes()).zero2; var Tsec = addZero(now.getSeconds()).zero2; var logdate = day + '.' + month + '.' + year; var logtime = Thour + ':' + Tmin + ':' + Tsec; var headerline = " "; var LogPath2 = LogPath + ".csv"; var TimeLogPath2 = TimeLogPath + ".csv"; var selectivelogpath= LogPath + "_" + nummer + ".csv"; var lognummer; var selectivelog = false; if(Number(special[nummer][13]) > 0) {                                                           // ist eine Zahl eingetragen worden, dann logzusammenfassung
        lognummer = Number(special[nummer][13]) ;                                                   // lognummer ermitteln
        selectivelogpath= LogPath + "_" + lognummer + ".csv";                                       // pfad definieren mit der nummer aus der Tabelle
        selectivelog = true;                                                                        // merker, dass ein log geschrieben werden soll
    } else {
        if (special[nummer][13] === true) {                                                         // wenn keine Zahl aber ein true eingetragen wurde
            selectivelog = true;                                                                    // merker, dass ein log geschrieben werden soll
        }
    }

    if (type === "A" ) {                                                                            // log  für Statuswechsel
        if (logflag === true) {                                                                     // logging ist aktiviert
            if (fs.existsSync(LogPath2)) {
                fs.appendFileSync(LogPath2, logdate+" ;"+logtime+" ;"+string + "\n");               // Füge Satz in Datei ein
            } else {
                log("Logfile nicht gefunden - wird angelegt", "info");
                 headerLine= "Datum;Uhrzeit;Type;Activity;Gruppen-Nummer;HM-ID;Objekt-Text;CurrValue;SystemObj Alt; SysemObj Neu;SystemMSEC Alt ;SystemMSEC NEU; CounterObj ALT; CounterOBJ NEU";
                 fs.appendFileSync(LogPath2, headerLine + "\n");       // Füge Satz in Datei ein
                fs.appendFileSync(LogPath2, logdate+" ;"+logtime+" ;"+string + "\n");                // Füge Satz in Datei ein
            }  // endif Filecheck
        } // logging aktiviert fuer statuswechsel
        if (selectivelog === true) {
            if (fs.existsSync(selectivelogpath)) {
                fs.appendFileSync(selectivelogpath, logdate+" ;"+logtime+" ;"+string + "\n");                // Füge Satz in Datei ein
            } else {
                log("Logfile nicht gefunden - wird angelegt", "info");
                 headerLine= "Datum;Uhrzeit;Type;Activity;Gruppen-Nummer;HM-ID;Objekt-Text;CurrValue;SystemObj Alt; SysemObj Neu;SystemMSEC Alt ;SystemMSEC NEU; CounterObj ALT; CounterOBJ NEU";
                 fs.appendFileSync(selectivelogpath, headerLine + "\n");       // Füge Satz in Datei ein
                fs.appendFileSync(selectivelogpath, logdate+" ;"+logtime+" ;"+string + "\n");                // Füge Satz in Datei ein
            }  // endif Filecheck            
        } // endif selective logging ist aktiv
    } // type ist  statuswechsel

    if (type === "T" ) {                                                                            // log  für Zeit-Kumulation 
         if (Timelogflag === true) {                                                                // logging ist aktiviert
             if (fs.existsSync(TimeLogPath2)) {
                fs.appendFileSync(TimeLogPath2, logdate+" ;"+logtime+" ;"+string + "\n");            // Füge Satz in Datei ein
             } else {
                log("Timekumulations-Logfile nicht gefunden - wird angelegt", "info");
                headerLine= "Datum;Uhrzeit;Type;Object;HM-ID;Objekt-Text;Pfad;genullter Wert";
                fs.appendFileSync(TimeLogPath2, headerLine + "\n");       // Füge Satz in Datei ein
                fs.appendFileSync(TimeLogPath2, logdate+" ;"+logtime+" ;"+string + "\n");            // Füge Satz in Datei ein   
            }  // Ende check on logflag
         } // logging aktiviert fuer time kumulation   
    } // log für statuswechsel

} // Ende Funktion

//-----------------------------------------------------------------------------------------------------
// Funktion zur Erzeugung von 2 oder 3 führenden Nullen für das Datum Format
//-----------------------------------------------------------------------------------------------------
function addZero(i) {
    if (i < 10) { j = "00" + i; i = "0" + i; } if (i > 9 && i < 100) {
        j = "0" + i;
    }
    return {
        'zero2' : i,
        'zero3' : j
    };
} // Ende Funktion

// Part 2.4 Individualfunktion
//-----------------------------------------------------------------------------------------------------
// Individualfunktionen 
//-----------------------------------------------------------------------------------------------------
function individual(funktion,nummer,runtime)  {
//    Funktion zur Verbrauchsert ermittlung  Pelletverbrauch Oekofen
//    Vorgabewerte sind anzupassen
//    function - die individualfunktion
//    nummer die aktuelle bearbeitete Gruppe
//    runtime = Wert zur weiteren Verarbeitung z.B. Millisekunden
log("funktion individual aufgerufen","info");
// Oekofen von Saugen zu pelletverbrauch
    if(funktion === "OEKOFEN") {
log("funktion Oekofen aufgerufen - Runtime ist "+runtime,"info");
        // Werte zum Einstellen--------------------------------------------------------
        var vorgpause = 6;                                                              // bei intervallsaugen die Anzahl Sekunden zwichen Intervallen
        var vorgintervall = 54;                                                         // laenge eines einzelnen Intervalls
        var vorgvorlauf = 32;                                                           // Saugzeit bevor die Schnecke läuft (Vakuum bilden)
        var vorgnachlauf = 15;                                                          // Laufzeit des Saugers nach stopp der schnecke
        var vorgverbrauch = 7.5;                                                        // Vorgabe der KG Ansaugleistung per Minute wenn die Schnecke läuft
        //----------------------------------------------------------------------------

        // Allgemeine Variablen
        var anzlaeufe = 0;
        var anzpausen = 0;
        var totpausen = 0;
        var restlaufzeit = 0;
        var net1runtime;
        var verbrauch;
        var schneckenzeit;

        runtime = runtime / 1000;                                                           // Laufzeit in Sekunden

        // Berechne Anzahl Läufe und Pausen
        net1runtime = runtime - vorgvorlauf - vorgnachlauf;
        anzlaeufe = Math.floor(net1runtime / vorgintervall);
        anzpausen = anzlaeufe-1;

        //theoretische Restlaufzeit berechnen
        restlaufzeit = runtime - ( (anzlaeufe * vorgintervall) +  vorgvorlauf + vorgnachlauf + (anzpausen * vorgpause )); 

        //Korrektur anzahl laeufe und pausen falls notwendig
        if (restlaufzeit + vorgpause < 0 )                                                  //Grenzfall wenn die Restzeit kleiner als null ist, dann muss anzahl läufe angepasst werden
          {  anzlaeufe =anzlaeufe - 1;
             anzpausen = anzpausen - 1;
             restlaufzeit = runtime - ( (anzlaeufe * vorgintervall) +  vorgvorlauf + vorgnachlauf + (anzpausen * vorgpause )); 
          }

        // Verbrauch berechnen 
        schneckenzeit = runtime - vorgvorlauf - vorgnachlauf  - (anzpausen * vorgpause);    // reine Schneckenlaufzeit berechnen
        verbrauch = schneckenzeit * vorgverbrauch/60 ; // Pelletverbrauch berechnen

        if(verbrauch < 0) {                                                                 //Wenn die Zeit zu kurz ist können Minuswerte herauskommen
            verbrauch = 0;
        }
        return verbrauch;

    } // endif Oekofen

}       // end function

</pre>