# Einführung Programmieren mit Javascript



## Grundlegendes

In ioBroker gibt es verschiedene Möglichkeiten eine Art von Programmierung vorzunehmen. Exemplarisch sollen hier der Scenen-Adapter, Blockly und Javascript genannt werden. Die starrste Möglichkeit ist der Szenen-Adapter. Mit ihm sind die Möglichkeiten auf die Einstellungen (welche nicht zu verachten sind) beschränkt. Das andere Extrem ist Javascript. Hier kann der Anwender seine Ideen relativ frei formulieren. Dadurch sind die ersten Schritte vermeintlich recht schwer. Die Flexibilität des Systems zeigt sich jedoch gerade darin, dass man nicht nur Skripte, sondern sogar eigene Adapter schreiben kann. Man hat ein mächtiges Werkzeug zur Hand. Immer wieder gibt es Versuche, den Neueinsteiger die Programmierung etwa leichter zu machen. In ioBroker ist das Blockly. Auch in anderen System z.B. Homematic wurden diese Schritte gemacht. Letztendlich handelt es sich dabei um Generatoren, mit dessen Hilfe versteckt ein Skript erzeugt wird. Mich persönlich stört an diesen Click-Systemen, dass diese nicht so flexibel sind wie die echte Programmiersprache. Daher möchte ich hier zeigen, dass es gar nicht so schwer ist, selber ein Programm oder sagen wir fairerweise ein Progrämmchen zu schreiben. Welches System man wählt ist letztendlich Geschmacksache, die hier nicht weiter diskutiert werden soll.

## Das erste Programm - Hallo Welt!

Sehr häufig wird für die erste Berührung mit einer Programmiersprache ein „Hallo Welt!“-Programm geschrieben. Auch wir wollen das Ausprobieren, da man damit ganz wichtige Schritte der Programmierung kennen lernen kann. Das "Hallo Welt!“ Programm gibt dabei auf dem Bildschirm die Meldung "Hello Welt!" aus. Zunächst muss, sofern noch nicht geschehen, der Javascript-Adapter wie üblich installiert und gegebenenfalls gestartet werden. Besondere Einstellungen sind zunächst nicht notwendig. Nunmehr muss noch der Reiter **Skripte** aktiviert werden. Rechts oben auf der Admin-Seite befindet sich ein Button mit einem Bleistift. Diesen muss man anklicken und kann dann unter **Zeige** den **Skripte**-Reiter auswählen. Nunmehr kann man durch nochmaliges des **Bleistifts** den Verwaltungsmodus verlassen. Klicken wir nunmehr auf Skripte. Es erscheint ein Fenster, bei dem rechts die vorhandenen Skripte (bei Neuinstallation gibt es nur zwei Rubriken common und global) und links der Inhalt des ausgewählten Skripts unten der Konsole angezeigt wird. Jetzt können wir unser erstes Skript schreiben. Dazu klicken wir auf der linken Seite oben auf das Blatt Papier mit dem Eselsohr. Auf der rechten Seite ändert sich die Ansicht. Bei Name wählen wir **Keine Gruppe** aus. **Skript1** ersetzen wir durch **Test**. Bei Enginetyp wählen wir Javascript aus. Jetzt können wir unser erstes Progrämmchen schreiben. Dazu geben wir folgende Zeile ein:

<div class="codebox" style="text-align: justify;">`console.log("Hallo Welt!");`</div>

Nun können wir das Skript speichern. Bis auf die kleine Änderung, dass rechts unter den Skripten **Test** aufgeführt ist, ändert sich nichts. Das Skripts damit gespeichert und einsatzfähig. Jetzt wollen wir ein Erfolgserlebnis haben und das Programm ausführen. Dazu klicken wir im linken Fenster rechts neben dem Namen des Programms auf das **Play**-Symbol (rot). Die Farbe ändert sich auf grün. Wenn man genauer schaut hat sich auch etwas getan. Rechts unten im Log-Fenster gibt es drei Zeilen:

> <div>11:43:43.924[info]javascript.0 Start javascript script.js.Test 11:43:43.924[info]javascript.0 script.js.Test: Hallo Welt! 11:43:43.924[info]javascript.0 script.js.Test: registered 0 subscriptions and 0 schedules</div>

Die zweite Zeile ist die für uns zur Zeit interessanteste: Hier wurde auf dem Bildschirm der Text „Hallo Welt!“ ausgegeben. Wenn man möchte, kann man den Text im Skript ändern und neu speichern. Das Programm wird dann neu gestartet und der geänderte Text wird ausgegeben. Das Log kann man sich natürlich auch im Reiter Log anschauen. Uns reicht zur Zeit aber diese Ausgabe, da nur die relevanten Logs zu unserem Skript angezeigt werden. Hier noch ein paar Hinweise zu den Log: Beim Starten des Programms wird immer angezeigt, dass das Skript gestartet wurde. Eine Zeile im Log beginnt immer mit der Uhrzeit. Der Letzte Zahl bei der Uhrzeit ist eine Angabe in Millisekunden. Dahinter wird angezeigt, um was für einen Typ von Nachricht es sich handelt. Hier handelt es sich im eine bloße Information. Fehler und Warnungen werden anders dargestellt. Danach wird angezeigt, welche Adapter-Instanz die Nachricht verschickt. Hier ist es javascript.0\. Man kann auch mehrere Instanzen des Javascript Adapters erzeugen und starten (hierzu später mehr). Danach wird im Beispiel in der ersten Zeile angezeigt, dass das Programm gestartet wurde. In der zweiten Zeile wurde unsere Nachricht ausgegeben. Die dritte Zeile können wir zum gegenwärtigen Zeitpunkt ignorieren. Falls das Programm geändert und gespeichert wurde, wird die Ausgabe wiederholt. Interessant ist noch das zwischen der ersten und der zweiten Ausgabe sich noch eine (oder mehrere Zeilen) dazwischengeschoben haben:

> <div>11:52:31.061 [info] javascript.1 Stop script script.js.Test 11:52:31.068 [info] javascript.0 Stop script script.js.Test</div>

In allen Instanzen des Javascript Adapters wurde das Programm gestoppt. Eigentlich hätte es gereicht, wenn das Programm in der Instanz 0 des Adapters gestoppt worden wäre. Da man aber die Zuordnung der Instanz ändern kann, werden in allen Instanzen das Programm vorsichtshalber gestoppt. In welcher Instanz das Programm läuft kann man im linken Fenster in der ersten Spalte rechts vom Skript-Namen lesen und ändern. Das heißt aber auch, dass egal in welcher Instanz ein Programm läuft, der Name des Programms nur einmal vergeben werden darf.

### Das eigentliche Programm

Das Skript besteht aus nur einer Zeile. Konsole ist ein sogenanntes Objekt. Was das ist soll zunächst offen bleiben. Man Stelle sich ein Objekt einfach als Schweizer Armee Taschenmesser vor. Ein solches Messer hat mehrere Werkzeuge, z.B. Messer und Schraubendreher. Genauso ist es bei einem Objekt. Es hat mehrere Funktionen. der Name der Funktion steht rechts von dem Punkt hinter **console**. Die Funktion heißt log. Das es sich um eine Funktion handelt erkennt man an den geschwungenen Klammern. Also heißt die Funktion richtig log(). Die Funktion hat die Aufgabe eine Info in das log zu schreiben. Der Inhalt der ausgegeben wird ist eine Zeichenkette. Eine Zeichenkette setzt man in sogenannte Hochkommata, also z.B.: "Hallo Welt!“. Damit ist das Programm erklärt. Noch zwei wichtige Anmerkungen: Das Programm wird bei Start sofort ausgeführt. Des Weiteren läuft das Programm bis es beendet wird. Das bedeutet, dass auch wenn alle Zeilen des Programms abgearbeitet sind, das Programm in einer quasi Endlosschleife weiter läuft. Wozu das notwendig ist, werden wir bald sehen.

### Reaktion auf Ereignisse

Eine Hausautomation stellte im Wesentlichen eine Reaktion auf Ereignisse dar. Wenn zum Beispiel der Lichttaster gedrückt wird soll das Licht an- bzw. ausgehen. Das Ereignis ist der Druck auf den Lichtschalter. Genauso kann man eine Weckerfunktion umschreiben: Um … soll das Radio angehen. Etwas abstrakter formuliert: wenn das Ereignis a eintritt, so soll mit b reagiert werden. Ziel dieses Kapitels ist es, eine solche Logik umzusetzen. Da hier erstmalig Hardware angesprochen werden muss, wird hier von einer spezifischen Hardware, nämlich Homematic-Komponenten ausgegangen. Die Homematic ist vermutlich die häufigste Hardware die im Zusammenhang mit ioBroker eingesetzt wird. Falls man mit anderer Hardware arbeitet, ist dieses natürlich kein Beinbruch. Man muss nur die entsprechenden Hardwarepunkte anpassen. Um den Einstieg zu erleichtern, wollen wir zunächst noch nicht auf ein Ereignis reagieren, sondern einfach mittels Programm ein Licht einschalten. Zunächst suchen wir uns den entsprechenden Datenpunkt heraus. Ein Datenpunkt in ioBroker ist ein Zustand, z.B. Licht an/aus. Ich habe zum Beispiel eine Reihe von wired-Komponenten der Homematic. Die Lichter habe ich mittels eines Relais realisiert. Unter dem Reiter Objekte kann man sich einen passenden Datenpunkt heraussuchen. Zunächst sucht man dien passende Adapter-Instanz. Bei Mir ist das "hm-rpc.1“. Bei der Homematic werden in der nächsten Ebene die jeweiligen Seriennummern der Homematic-Geräte angezeigt. Bei mir hat das passende Gerät die Seriennummer "IEQ038xxxx“. In der darunter liegenden Ebene wählt man bei der Homematic den Kanal aus. Bei mir ist es Kanal 3\. Der Zustand Licht an/aus befindet sich dann unter **State**. Der Datenpunkt, auf den wir zugreifen wollen heißt also vollständig **hm-rpc.1.IEQ038xxxx3.State**. Interessant an dieser Anzeige ist, dass der aktuelle Wert auch angezeigt wird. Bei mir ist das Licht aus. Daher steht dort **false**. Dieser Wert ist wichtig, da wir dadurch wissen, was hier erwartet wird. Statt true/false könnte hier auch 1/0 erwartet werden. Wenn es sich um einen Dimmer handelt, wäre auch 100 für volle Leistung und 0 für aus denkbar. Daher macht es Sinn, zunächst zu prüfen, welche Werte erwartet werden. Nun können wir loslegen. Dazu legen wir ein Programm namens Test2 wie gehabt an. An dieser Stelle empfiehlt es sich, das ursprüngliche Testprogramm zu deaktivieren (Pausen-Button) oder besser noch, es ganz zu löschen (Mülleimer-Symbol). Das Skript lautet für den obigen Aktor wie folgt:

<div class="codebox">`setState("hm-rpc.1.IEQ038xxxx3.State",true);`</div>

Das Skript ist schnell erklärt. In ioBroker gibt es eine Funktion zum Ändern von Zuständen. Diese heißt **setState()**. Der Funktion werden zwei Parameter übergeben, den Namen des Datenpunkts und der Wert. Der Datenpunkt wird als Zeichenkette (im englischen als **string** bezeichnet) übergeben. Wir wissen bereits, das ein **string** in Hochkommata gesetzt wird. Des Weiteren wissen wir, dass das der Wert "true“ zum Anschalten übergeben werden muss. true und false sind Werte wie beispielsweise eine Zahl und brauchen (und dürfen) daher nicht mit Hochkomma angegeben werden. Wichtig ist, dass die Parameter in der Reihenfolge übergeben werden, wie die Funktion sie erwartet. Die von ioBroker zur Verfügung gestellten Funktion sind auf der GitHub-Seite des Javascript-Adapters dokumentiert und erläutert. Wenn wir das Programm ausführen lassen, so wird das Licht entsprechend eingeschaltet. Hier noch ein kleiner Hinweis: Javascript kann nicht prüfen, ob wir den Datenpunkt richtig geschrieben haben. Ein Fehler würde erst bei der Ausführung des Programms erkannt werden. Zum Glück gibt es in dem Editor eine Funktion, die uns das Leben einfacher macht. Wenn man rechts oben auf den Button **ID Einfügen** klickt, dann kann man den Datenpunkt auswählen und in das Programm einfügen. Wenn das geklappt hat können wir unser Programm um eine Ereignisverarbeitung erweitern. Wir wollten auf das Drücken eines Tasters reagieren. In Homematic gibt es zwei unterschiedliche Arten von Drücken eines Tasters: kurz (=PRESS_SHORT) und lang (=PRESS_LONG). Dazu suchen wir uns wieder einen geeigneten Datenpunkt. In anderen Systemen mag der Datenpunkt anders heißen, das Prinzip ist aber dasselbe. Bei mir heißt der Datenpunkt: **hm-rpc.1.IEQ053xxxx.1.PRESS_SHORT**. Damit ändern wir das Programm so, dass es sinngemäß wie folgt aussieht:

<div class="codebox">`on({id: 'hm-rpc.1.IEQ053xxxx.1.PRESS_SHORT‘}, function (obj) {` `   setState("hm-rpc.1.IEQ038xxxx3.State", true);` `});`</div>

Wenn wir das Programm nach dem Speichern neu starten, werden wir feststellen, dass das Programm nichts macht. Wenn wir den Schalter drücken, dann geht das Licht an. Nochmaliges drücken macht scheinbar nichts. Tatsächlich wird das Licht noch einmal eingeschaltet, was aber keinen Sinn macht (werden wir als nächstes verbessern). Jetzt wollen wir erst einmal klären, was das Programm macht. Das eigentliche Programm besteht aus dem Aufruf der Funktion on(). Die Funktion on() dient dazu, bei dem angegebenen Ereignis eine Funktion auszuführen. Den Aufbau der Funktion hier soll zunächst nicht weiter erläutert werden. Wichtig ist nur die bereits bekannte Zeile mit setState(). Hier könnten noch weitere Anweisungen stehen. Bezüglich des ersten Parameters ist auffällig, dass hier geschweifte Klammern verwendet wurden. Hierbei handelt es sich um ein assoziatives Array. Was das ist, schauen wir uns im Abschnitt über Arrays im Detail an. Wenn das Programm ausgeführt wird, wird bei Start das Ereignis und die dazugehörige Funktion registriert. Wenn wir uns die Ausgabe im Log anschauen, werden wir feststellen, dass es jetzt eine Subskription gibt. Wie oben schon erwähnt geht das Programm dann eine eine Dauerschleife. In dieser Schleife wird immer wieder geprüft, ob das Ereignis aufgetreten ist. Falls das der Fall war, wird die entsprechende Funktion aufgerufen. Wir haben jetzt das erste Programm geschrieben, dass auf ein Ereignis reagiert. Jetzt wollen wir das Progrämmchen noch etwas verbessern. Es wäre schön, dass beim Drücken des Schalters für den Fall, dass das Licht an war, das Licht ausgeschaltet wird. Dazu ändern wir das Programm so ab:

<div class="codebox">`on({id: 'hm-rpc.1.IEQ053xxxx.1.PRESS_SHORT‘}, function (obj) {`</div>

<div class="codebox">`   setState("hm-rpc.1.IEQ038xxxx3.State",!getState("hm-rpc.1.IEQ038xxxx3.State").val); });`</div>

Jetzt sollte der Lichtschalter wie erwartet funktionieren. Das Geheimnis liegt an dem Wert bei dem Aufruf von setState. In der alten Fassung stand hier einfach der Wert **true**. Jetzt steht hier **!getState("hm-rpc.1.IEQ038xxxx3.State").val**. Mittels **getState()** kann man den Zustand eines Datenpunktes abfragen. Nicht vergessen darf der Aufruf von **.val()**. Warum, hier muss ich auch auf später vertrösten. Das Ergebnis ist dann der aktuelle Zustand des Lichts: true bzw. false. Das Ausrufungszeichen vor **getState()** invertiert das Ergebnis. War das Licht true, so wird es auf false gesetzt. Dieser Wert wird dann gespeichert und damit auch der Zustand des Lichts invertiert. Damit haben wir unser erstes richtiges Programm. Statt der Funktion **on()** hätten wir auch die Funktion **subscribe()** verwenden können. Beide Funktionen sind identisch. Persönlich nehme ich gerne die Funktion **subscribe()**, da diese im Programmcode besser zu erkennen ist.

## Bedingte Ausführung

### Einführung

Stellen wir uns vor, wir wollen mit dem Lichtschalter nicht nur eine Lampe, sondern zwei Lampen, die jeweils getrennt geschaltet werden können ansteuern. Wenn wir einfach das Skript erweitern, könnte es so aussehen:

<div class="codebox">`on({id: 'hm-rpc.1.IEQ053xxxx.1.PRESS_SHORT‘}, function (obj) {`</div>

<div class="codebox" style="padding-left: 30px;">`setState("hm-rpc.1.IEQ038xxxx.3.State",!getState("hm-rpc.1.IEQ038xxxx3.State").val); setState("hm-rpc.1.IEQ056xxxx.3.State",!getState("hm-rpc.1.IEQ056xxxx.State").val);`</div>

<div class="codebox">`});`</div>

Auf den ersten Blick funktioniert das Programm auch bestens. Jetzt schalten wir mal eine Lampe an (z.B. per VIS). Wenn wir nunmehr das Licht per Lichtschalter. Wunderbar, jetzt leuchtet abwechselnd mal das eine und dann das andere Licht. Also müssen wir das Programm umschreiben. Hier eine Idee:

<div class="codebox">`on({id: 'hm-rpc.1.IEQ053xxxx.1.PRESS_SHORT‘}, function (obj) {`</div>

<div class="codebox" style="padding-left: 30px;">`var status=!getState("hm-rpc.1.IEQ038xxxx3.State").val; setState("hm-rpc.1.IEQ038xxxx.3.State",status); setState("hm-rpc.1\. IEQ056xxxx.3.State",status);`</div>

<div class="codebox">`});`</div>

In der zweiten Zeile wird der Status der ersten Lampe invertiert gespeichert. Anschließend werden die Lampen entsprechend geschaltet. Dieses Programm ist schon erheblich besser.

### if-Bedingung

Trotzdem überzeugt es nicht. Ob das Licht in dem Raum ein- oder ausgeschaltet wird hängt von dem Zustand der ersten Lampe ab. Ich persönlich würde erwarten, das wenn eine Lampe leuchtet durch das betätigen des Lichtschalters das Licht ausgeschaltet wird. Wenn kein Licht leuchtet, wird es eingeschaltet. Bei der Beschreibung kommt das Wort **wenn** vor. Es ist das Schlüsselwort. Nur wenn eine Bedingung erfüllt wird, soll der Programmteil ausgeführt werden. Im englischen heißt wenn **if**:

<div class="codebox" style="text-align: left;">`on({id: 'hm-rpc.1.IEQ053xxxx.1.PRESS_SHORT‘}, function (obj) {`</div>

<div class="codebox" style="text-align: left; padding-left: 30px;">`if (getState("hm-rpc.1.IEQ038xxxx3.State").val || getState("hm-rpc.1.IEQ038xxxx3.State").val) {`</div>

<div class="codebox" style="text-align: left; padding-left: 60px;">`setState("hm-rpc.1.IEQ038xxxx.3.State",false); setState("hm-rpc.1\. IEQ056xxxx.3.State",false);`</div>

<div class="codebox" style="text-align: left; padding-left: 30px;">`} else {`</div>

<div class="codebox" style="text-align: left; padding-left: 60px;">`setState("hm-rpc.1.IEQ038xxxx.3.State",true); setState("hm-rpc.1\. IEQ056xxxx.3.State",true);`</div>

<div class="codebox" style="text-align: left; padding-left: 30px;">`}`</div>

<div class="codebox" style="text-align: left;">`});`</div>

Zeile zwei ist die wenn-Bedingung. Das **||** ist das **oder**. Wenn entweder Lampe1 oder Lampe2 wahr ist, werden die Lampen ausgeschaltet. Damit haben wir unser erstes Beispiel für eine bedingte Ausführung. Wenn man sich das Beispiel davor noch einmal anschaut, entdeckt man, dass eine bedingte Ausführung gar nicht nötig war:

<div class="codebox" style="text-align: left;">`on({id: 'hm-rpc.1.IEQ053xxxx.1.PRESS_SHORT‘}, function (obj) {`</div>

<div class="codebox" style="text-align: left; padding-left: 30px;">`var status=!(getState("hm-rpc.1.IEQ038xxxx3.State").val || getState("hm-rpc.1.IEQ038xxxx3.State").val); setState("hm-rpc.1.IEQ038xxxx.3.State",status); setState("hm-rpc.1\. IEQ056xxxx.3.State",status);`</div>

<div class="codebox" style="text-align: left;">`});`</div>

Ein interessantes Lehrstück. Man hat endlich eine Aufgabe für eine bedingte Ausführung und man braucht sie nicht wirklich. Das hängt im wesentlichen damit zusammen, dass die Bedingung einen logischen Wert darstellt. Wäre es zum Beispiel um eine Temperatur gegangen, wäre die Bedingung zwingend notwendig gewesen.

### switch

Das Thema bedingte Anweisungen wollen wir noch nicht ganz verlassen und uns ein Dreipunktreglung als Beispiel anschauen. Stellen wir uns vor, wir haben ein Gewächshaus. Das Gewächshaus hat Fenster, die elektrisch geöffnet werden können und eine Heizung, die wir ansteuern können. Im Gewächshaus darf es nicht zu warm und nicht zu kalt sein. Wenn es wärmer als 25°C sind sollen sich die Fenster öffnen (1\. Punkt). Erst wenn es 20°C sind, sollen sie sich wieder schließen (2\. Punkt). Ist die Temperatur unter 15°C, soll die Heizung anspringen (3\. Punkt), ist es wärmer als 20°C, soll die Heizung wieder abschalten. Die Steuerung erfolgt per Funk. Leider gibt es immer wieder Übertragungsfehler. es darf aber nie dazu kommen, dass die Fenster im Winter länger offen sind als notwendig, da wir sonst nur noch einen großen Komposthaufen haben (Pflanzen erfroren). Daher entscheiden wird uns, jede Minute (Timer) die Werte neu zu setzen:

<div style="text-align: justify;">`schedule({* * * * *}, function () {`</div>

<div style="text-align: justify;">

<div class="codebox">`   //hier steht unser Programm, dass jede Minute neu ausgeführt wird });`</div>

Die weiteren Möglichkeiten eines Timers erarbeiten wir uns später. Hier jetzt das Programm:

<div class="codebox">`schedule({* * * * *}, function () {`</div>

<div class="codebox" style="padding-left: 30px;">`var temp=getState("hm-rpc.2.LEQ059xxxx.2.ACTUAL_TEMPERATURE").val); if (temp>25) {`</div>

<div class="codebox" style="padding-left: 60px;">`setState("hm-rpc.1.IEQ057xxxx.3.State",true); //Fenster öffnen`</div>

<div class="codebox" style="padding-left: 30px;">`} else if (temp<25) {`</div>

<div class="codebox" style="padding-left: 60px;">`setState("hm-rpc.1.IEQ057xxxx.3.State",true); //Fenster schließen`</div>

<div class="codebox" style="padding-left: 30px;">`} if (temp<15) {`</div>

<div class="codebox" style="padding-left: 60px;">`setState("hm-rpc.1.IEQ057xxxx.4.State",true); //Heizung an`</div>

<div class="codebox" style="padding-left: 30px;">`} else if (temp>0) {`</div>

<div class="codebox" style="padding-left: 60px;">`setState("hm-rpc.1.IEQ057xxxx.4.State",true); //Heizung aus`</div>

<div class="codebox" style="padding-left: 30px;">`}`</div>

<div class="codebox">`});`</div>

Noch ein kleiner Hinweis zu **if**. Die Bedingung steht immer in einer runden Klammer also **if (Bedingung)**. Danach kommt dann ein Block der durch geschweifte Klammern **{}** gekennzeichnet ist. An eine Bedingung kann sich ein **else if** also eine weitere Bedingung anschließen oder ein **else**. Das **else** wird immer dann ausgeführt wenn keine der vorangehenden Bedingungen erfüllt war. Ganz wichtig in diesem Zusammenhang ist noch mal zu betonen, ein **else**, auch **else if** wird immer nur ausgeführt, wenn nicht ein vorangehendes **if** ausgeführt wurde. Vielleicht habt ihr euch schon gefragt, warum ich zwei **if**-Bedingungen verwendet habe. Hätte es bei **if (temp<15) {** nicht auch ein **else if** getan? Leider nein. Stellen wir uns vor, die Temperatur fällt unter 15 Grad. Das bedeutet, die Fenster müssen geschlossen werden und die Heizung soll einspringen. Hätte man den Fehler gemacht, so würden zwar die Fenster geschlossen (2\. Bedingung), alle nachfolgenden Bedingungen würden aber nicht mehr ausgeführt werden, da die Bedingung 2 erfüllt wurde. Spätestens bei Frost müssten wir uns dann von den Pflanzen verabschieden. Bei solchen Bedingungen ist es ganz wichtig, zu prüfen, ob die Bedingungen wirklich machen, was man will. Sehr leicht schleichen sich hier Fehler ein. Z.B. ein kleines Beispiel zum Nachdenken: Wenn die Temperatur größer 20°C, dann Heizung ein, kleiner 20°C Heizung aus. Was soll eigentlich bei genau 20°C sein? In den Skript haben wir für das Ein- und Ausschalten bewusst unterschiedliche Schwellen genommen. Hier jedoch war das wohl nicht gewollt. Leider haben wir dadurch übersehen, das wir uns keine Gedanken gemacht haben, was genau bei 20°C passieren soll. Das Thema Bedingungen ist wie wir sehen, sehr wichtig. Als nächstes beschäftigen wir uns mit einer Sonderform der Bedingung:

### switch

. Zur Abwechselung nehmen wir uns ein anderes Gerät mal zur Brust: Die Netatmo Wetterstation außen. Alle Geräte der Netatmo haben, soweit sie per Funk mit der Basis kommunizieren einen Status der Qualität der Funkverbindung. Bei meinem Gerät wird die Verbindung unter "netatmo.0.Wetterstation.Garten.RfStatus" gespeichert. Der Status kann 'good', 'average' oder 'bad' sein. Wir wollen eine Meldung über den Status auf deutsch ausgeben. Mit unseren bisherigen Werkzeugen könnte das so aussehen:

<div class="codebox">`var state=getState("netatmo.0.Wetterstation.Garten.RfStatus").val;`</div>

<div class="codebox">`if (state=='good') {`</div>

<div class="codebox" style="padding-left: 30px;">`console.log('Die Sende/Empfangsqualität ist gut!');`</div>

<div class="codebox">`} else if (state=='average') {`</div>

<div class="codebox" style="padding-left: 30px;">`console.log('Die Sende/Empfangsqualität ist durchschnittlich!');`</div>

<div class="codebox">`} else if (state=='bad') {`</div>

<div class="codebox" style="padding-left: 30px;">`console.log('Die Sende/Empfangsqualität ist schlecht!');`</div>

<div class="codebox">`} else {`</div>

<div class="codebox" style="padding-left: 30px;">`console.log('Der Empfangsstatus ist unbekannt');`</div>

<div class="codebox">`}`</div>

Das funktioniert soweit ganz gut. Gut lesbar ist aber etwas anderes. Zum Glück gibt es "Switch". Damit sieht das Programm wie folgt aus:

<div class="codebox">`switch (state) {`</div>

<div class="codebox" style="padding-left: 30px;">`case 'good':`</div>

<div class="codebox" style="padding-left: 60px;">`console.log('Die Sende/Empfangsqualität ist gut!');`</div>

<div class="codebox" style="padding-left: 60px;">`break;`</div>

<div class="codebox" style="padding-left: 30px;">`case 'average':`</div>

<div class="codebox" style="padding-left: 60px;">`console.log('Die Sende/Empfangsqualität ist durchschnittlich!');`</div>

<div class="codebox" style="padding-left: 60px;">`break;`</div>

<div class="codebox" style="padding-left: 30px;">`case 'bad':`</div>

<div class="codebox" style="padding-left: 60px;">`console.log('Die Sende/Empfangsqualität ist schlecht!');`</div>

<div class="codebox" style="padding-left: 60px;">`break;`</div>

<div class="codebox" style="padding-left: 30px;">`default:`</div>

<div class="codebox" style="padding-left: 60px;">`console.log('Der Empfangsstatus ist unbekannt');`</div>

<div class="codebox">`}`</div>

Da Programm ist in diesem Fall sogar länger als unser erster Versuch. Er hat aber auf jeden Fall einen entscheidenden Vorteil. Man erkennt relativ schnell was das Programm macht. Bei der ersten Variante muss man sich jede if-Bedingung anschauen, um zu wissen, was das Programm wirklich macht. Bei der Zweiten Variante wird angegeben bei 'switch', was geprüft wird, nämlich switch. Bei dem jeweiligen 'case' ist dann das Gegenstück aufgeführt. Man sieht also sofort, was verglichen wird. Ganz wichtig und gerne vergessen wird das 'break'. Entfernt mal testweise alle breaks. Was ist dann das Ergebnis des Programms? Wahrscheinlich mehrere Ausgaben einschließlich "Die Sende/Empfangsqualität ist schlecht!". Aber warum? Ein weiteres 'case' führt nicht dazu, dass die Anweisungen beendet werden. Vielmehr werden alle Anweisungen bis zum Ende des Blocks, also bis zur schließeden geschweiften Klammer ausgeführt. Der Fehler tritt leider häufiger auf, als einem lieb ist. In der aktuellen Version des Netatmo-Adapters ([https://github.com/PArns/ioBroker.netat ... Station.js](https://github.com/PArns/ioBroker.netatmo/blob/master/netatmoStation.js) Version 0.4.0) ist er leider immer noch enthalten. Wenn ihr euch Zeile 73 anschaut, so seht ihr, dass hier vor der Zeile 'default:' das break fehlt. Prügelt aber bitte nicht auf PArns ein, er hat diesen Code nicht selber geschrieben. Apropos default: tifft keine der vorherigen Bedinungen zu, so wird default ausgeführt. Hier jetzt in Script wie man mit 'switch' nicht arbeiten sollte. Alte Hasen werden sich vielleicht sogar die Augen reiben, da sie sich wahrscheinlich nicht vorstellen können, das das Programm überhaupt funktioniert:

<div class="codebox">`var state = getState("netatmo.0.Wetterstation.Garten.RfStatus").val;`</div>

<div class="codebox">`switch (true) {`</div>

<div class="codebox" style="padding-left: 30px;">`case (state == 'good'):`</div>

<div class="codebox" style="padding-left: 60px;">`console.log('Die Sende/Empfangsqualität ist gut!');`</div>

<div class="codebox" style="padding-left: 60px;">`break;`</div>

<div class="codebox" style="padding-left: 30px;">`case (state == 'average'):`</div>

<div class="codebox" style="padding-left: 60px;">`console.log('Die Sende/Empfangsqualität ist durchschnittlich!');`</div>

<div class="codebox" style="padding-left: 60px;">`break;`</div>

<div class="codebox" style="padding-left: 30px;">`case (state == 'bad'):`</div>

<div class="codebox" style="padding-left: 60px;">`console.log('Die Sende/Empfangsqualität ist schlecht!');`</div>

<div class="codebox" style="padding-left: 60px;">`break;`</div>

<div class="codebox" style="padding-left: 30px;">`default:`</div>

<div class="codebox" style="padding-left: 60px;">`console.log('Der Empfangsstatus ist unbekannt');`</div>

<div class="codebox">`}`</div>

Überraschenderweise funktioniert es. In anderen Programmiersprachen geht das zum Glück in der Regel nicht. Durch diese schreibweise machen wir uns den Sinn von switch zunichte, da dass Programm zumindest genauso schlecht wie das aller erste Programm zu lesen ist (da ungewöhnlich formuliert wohl sogar noch schlechter). Trotzdem ist das Programm für unser Verständnis von switch wichtig: Bei switch wird der jeweilige Ausdruck von 'switch' mit dem Ausdruck des jeweiligen 'case' verglichen. Also konkret geprüft, ob der Ausdruck 'true' im 'switch' auch im 'case' true ist. Die Besonderheit von Javascript ist, dass das case nicht nur einen festen Wert haben kann (z.B. 'true'), sondern auch einen Ausdruck, der vor dem Vergleich errechnet wird. Hat also 'state' den Wert 'average', so ist das Ergebnis der Prüfung ein 'true'. Da der Vergleich von 'true' mit 'true' identisch ist, wird dann die entsprechende Meldung ausgegeben. Aber noch einmal: Bitte nicht so etwas programmieren. Auch ihr werdet später ein Problem haben dieses zu verstehen.

## Variablen

### Einführung

Wir haben bereits auf Daten zugegriffen und diese gespeichert (getState() und setState()). Hierbei handelt es sich um spezielle Methoden von ioBroker. In einem Programm ist es aber viel zu schwerfällig hiermit zu arbeiten. Man speichert ja schließlich nicht alles auf der Festplatte, was man kurzfristig sicher merken muss. Hierfür sind in den meisten Programmiersprachen Variablen vorgesehen. Typisch für eine Variable ist, dass der Inhalt nur solange erhalten bleibt, wie das Programm läuft. Spätestens dann geht der Inhalt verloren, manchmal sogar noch früher. Diese hängt vom Scope der Variablen ab, also wie lange die Variable gültig ist. Genauere auch hier erst später.

### Deklaration

Eine Variable wird in Javascript mittels dem Schlüsselwort **var** deklariert. Beispiel:

<div class="codebox">`var nachname;`</div>

Ab jetzt gibt es eine Variable **nachname**. Sie hat keinen Inhalt, sie ist **undefined**. Anders ausgedrückt: die Variable ist zwar deklariert (der Name der Variablen ist erzeugt), die Variable ist aber noch nicht initialisiert (sie hat noch keinen Inhalt). In Javascript ist es egal, welchen Inhalt die Variable hat (z.B. eine Zahl oder eine Zeichenkette). Der Typ der Variable kann jederzeit geändert werden. Es gibt also keine Typensicherheit. Daher kann der Compiler auch Fehler bezüglich des Typs nicht oder nur selten erkennen. Mehrere Variablen können auf einmal deklariert werden:

<div class="codebox">`var sLastName, sFirstName;`</div>

### Initialisierung

Die Initialisierung erfolgt durch den Zuweisungsoperator **=**):

<div class="codebox">`var nachname; nachname = "Müller";`</div>

Dieses kann man auch kürzer fassen:

<div class="codebox">`var nachname = "Müller";`</div>

Dieser letzten Schreibweise sollte auch der Vorzug gegeben werden. Da er übersichtlicher ist. Mehrere Variablen können nicht nur gleichzeitig deklariert, sondern auch initialisiert werden.

<div class="codebox">`var sLastName = "Müller", sFirstName = "Fritz";`</div>

Etwas tückisch ist, dass man Variablen auch implizit durch Wertezuweisung erzeugen kann:

<div class="codebox">`sLastName = "Müller";`</div>

Hiervon rate ich jedoch ab, da schwer zu erkennen ist, ob eine Variable erstmalig erzeugt wird, oder einen neuen Wert zugewiesen bekommt.

### Name der Variablen

Der Name der Variablen sollte keine Sonderzeichen wie Umlaute, etc. enthalten, auch wenn sie es dürfen. Der Name eine Variablen sollte so gewählt werden, dass sich aus dem Namen der Variablen ergibt, wofür die Variable dient. In Hinblick auf die fehlende Typisierung, sollte man überlegen, ob man nicht auch kenntlich macht, welchen Type die Variable hat. Häufig ist das zwar klar, aber halt nicht immer. Dies wird häufig durch Voranstellen eines Buchstabens gemacht. Hier gibt es unterschiedliche Ansätze. Ich würde folgendes vorschlagen:

<table>

<tbody>

<tr>

<td>s</td>

<td>string (Zeichenkette</td>

</tr>

<tr>

<td>c</td>

<td>char (Einzelnes Zeichen)</td>

</tr>

<tr>

<td>i</td>

<td>integer(Ganzzahl)</td>

</tr>

<tr>

<td>f</td>

<td>float(Fließkommazahl)</td>

</tr>

<tr>

<td>b</td>

<td>bool(logischer Wert true/false).</td>

</tr>

<tr>

<td>a</td>

<td>array (wird bei Datentypen erläutert)</td>

</tr>

<tr>

<td>n</td>

<td>Zähler (Counter)</td>

</tr>

<tr>

<td>i</td>

<td>index</td>

</tr>

<tr>

<td>g_</td>

<td>Globale Variable</td>

</tr>

</tbody>

</table>

Die Bedeutung der einzelnen Datentypen wird im wesentlichen im Kapitel Datentypen erläutert Wenn man diese Konvention verwendet, würde man die Variable für Nachnamen wie folgt benennen:

<div class="codebox">`var sNachname;`</div>

Des Weiteren muss man sich überlegen, ob die Variablen einen deutschen oder einen englischen Namen tragen. Gerade bei Programmen, die auch von nicht Deutschsprachlern mal weiterentwickelt werden sollen, machen englische Namen besonders Sinn. Darüberhinaus kann durch die Verwendung der englischsprachigen Namen Verwechselungen mit Zeichenketten verringert werden. Die Variable Nachname könnte also auch lauten:

<div class="codebox">`var sLastName;`</div>

Da die gute Lesbarkeit eines Programmes essenziell für die Verringerung der Zahl der Fehler ist, sollte hier großer Wert auf eindeutige Namen gelegt werden. Hier ein fehlerhaftes Beispiel: `var sLastName; sLastname = "Müller"; console.log(sLastName);` Alles scheint richtig zu sein. Leider wird uns als Ergebnis nur undefined angezeigt werden. Hintergrund ist, dass in Javascript die Groß- und Kleinschreibung eine Rolle spielt und zwar auch bei Variablen. sLastName ist also etwas anderes als sLastname. sLastName ist eine nicht initialisierte Variable (daher undefined). sLastname ist eine zweite Variable, die mit Müller initialisiert wurde. Der Compiler kann diesen Fehler nicht erkennen. Bezüglich des Namens einer Javascript-Variablenn gelten folgende Regeln:

*   dürfen aus Buchstaben a-z,A-Z und Unterstrich _ bestehen
*   dürfen aus Ziffern bestehen
*   dürfen keine Leerzeichen enthalten und keine Bindestriche enthalten
*   müssen mit einem Buchstaben, einem Unterstrich öde reinem $-Zeichen beginnen
*   dürfen nicht mit einem Schlüsselwort übereinstimmen

Buchstabe, ist jedes Zeichen, welches im Unicode-Zeichensatz als Buchstabe gilt. Wenn man mag, könnte man also mit dem Zeichen pi (Π) aus dem griechischen Alphabet eine Variable deklarieren, auch wenn es wohl klüger wäre , so etwas zu vermeiden. Hier ein paar Beispiele für gültige Variablennamen: lampe1, lampe_wohnzimmer, _lampe, Lampe_1, A352, Übermut, Spaß, ∏ Nicht erlaubt wäre: 10Lampen, Wohnzimmer.Lampe, Wohnzimmer#lampe, A-352, 5

<div class="postbody">

<div id="post_content37398">

## Datentypen

In Javascript unterscheidet man zwischen primitiven Datentypen und Objekten. Es gibt folgende primitiven Datentypen:

*   **boolean**
*   **undefined**
*   **null**
*   **number**
*   **string**

Die meisten Datentypen sind uns bereits begegnet. Trotzdem wollen wir uns die Datentypen jetzt etwas genauer anschauen:

### boolean

Der Datentyp **boolean** stellt einen logischen Wert da: **true** oder **false**. Man kann sich das vorstellen wie Licht an/aus.

### undefined

Der Datentyp Null nimmt eine Sonderstellung ein. Wenn eine Variable zwar deklariert, aber keinen anderen Datentyp zugewiesen wurde, hat die Variable den Datentyp **undefined**. Eine Variable, die **undefined** ist, hat keinen Wert, ist also nicht initialisiert.

### null

Dieser Datentyp hört sich wie der Datentyp **undefined** an. Es gibt einen gravierenden Unterschied. Bei **undefined** hat die Variable keinen Wert, ist also nicht initialisiert. Bei dem Typ **null** hat die Variable den Wert **null**, die Variable ist also initialisiert. Bloß was kann man mit so einem komischen Datentyp machen? Stellen wir uns einen Außentemperatur-Sensor vor, der per Funk verbunden ist. Grundsätzlich speichert man in der Variablen den Temperaturwert. Was macht man aber, wenn gerade keine Funkverbindung da ist. Eine Möglichkeit wäre es eine Temperatur anzugeben, die nicht vorkommt (z.B. -99°C). Hat der Sensor eine andere Aufgabe, könnte es aber vorkommen, dass dieser Wert doch erreicht wird. Eleganter wäre es, dem Wert einfach **null** zuzuweisen. Damit ist klar, dass das Programm den Wert setzen wollte, aber zu Zeit kein Wert vorhanden ist. Hätte man stattdessen **undefined** verwendet‚ so wäre nicht klar, ob das Programm jemals versucht hat die Temperatur von dem Sensor abzufragen. Der Datentyp **null** weist eine historische Besonderheit auf: Bei den primitiven Datentype erhält man bei der Abfrage des Datentype den Namen des primitiven Datentyps zurück:

Beispiel: `var test = true;` `console.log(typeof test);` Wie richtig vermutet ist das Ergebnis der Ausgabe: **boolean** Machen wir das gleiche mit einer Variablen, die null ist: `var test = null;` `console.log(typeof test);` Hier erhalten wir die Ausgabe `object`. Wie wir anfangs festgestellt haben, ist ein **object** kein primitiver Datentyp. Ursprünglich war **null** ein **object**. Dieses wurde erst später geändert. Um die Kompatibilität zu waren, hat man es bei **object** belassen.

### number

In vielen Programmiersprachen wird werden verschiedene Zahlentypen unterschieden. Beispiel: Man weiß, dass man nur eine ganze Zahl zwischen 1 und 100 hat. Diese Information könnte man in einem Byte speichert. Hat man dagegen eine Fließkommazahl, so brauch man natürlich mehr Speicherstellen. In Javascript werden alle Zahlen als 64-bittige Fließkommazahl gespeichert. Es sind damit Zahlen zwischen -(253 -1) und 253 -1) darstellbar. Neben einer Zahl kann eine **number** auch **+Infinity** (= positiv Unendlich), **-Infinity** (= negativ Unendlich) oder **NaN** (= not a Number) sein. **NaN** ist ein besonderer Zustand. Wenn eine Rechenoperation nicht erlaubt ist.

Beispiele: `console.log("1/0="+1/-0);` `console.log(„1/-0="+1/-0);` `console.log("Math.sqrt(-1)="+Math.sqrt(-1));` Bezüglich **NaN** könnte man auf die Idee kommen diesen in unserem Beispiel des Temperatursensors statt **null** zu verwenden. Davon würde ich tendenziell abraten, da **NaN** anzeigen soll, dass das Ergebnis der Rechenoperation keine Zahl zurückgibt. Es geht jedoch nicht um eine Rechenoperation. Vielmehr gibt es einfach keinen Wert.

### string

Ein String ist eine Anzahl von aufeinander folgenden Zeichen. Die Zeichen sind UTF-16 kodiert. Dies bedeutet, dass die wahre Anzahl von Zeichen nicht einfach durch die Länge des Springs bestimmt werden kann, da Zeichen 8- oder 16-Bit lang sein können.

Ein String kann wie folgt initialisiert werden: `var test1 = "Hallo";` `var test2 = 'Welt';` Es gibt also die Möglichkeit einfache oder doppelte Anführungszeichen zu verwenden. Beide Schreibweisen sind identisch. Das Zeichen, mit dem der String eingeleitet wurde, beendet auch den String. Dadurch kann man auch Anführungszeichen in einem String verwenden: `tag1 = '<div class="cont">';` Bei langen Texten besteht der Wunsch eine Text auf mehrere Zeilen aufzuteilen. Eine Möglichkeit ist die Verwendung des Backslash. `var test = 'Zeile1\` `Zeile2\` `Zeile3\` `Zeile4';` Diese Schreibweise ist tückisch. Der Backslash dient auch der der Maskierung von Zeichen (z.B: „\n“). Sollte sich bei dieser Schreibweise hinter einem Backslash ein Leerzeichen eingeschlichen haben, so bekommt man einen Fehler der fast nicht zu entdecken ist. Stattdessen empfiehlt sich folgende Schreibweise: `var test = 'Zeile1’ +` `'Zeile2’ +` `'Zeile3’ +` `'Zeile4';` Alternativ kann das auch so geschrieben werden: `var test = 'Zeile1’` `+ ’Zeile2’` `+ ’Zeile3’` `+ ’Zeile4';` Als nächstes beschäftigen wir uns mit dem ominösen Datentype "object".

##  Kommentare

Endlich ein ganz einfaches Thema: **Kommentare**! Mittels Kommentaren kann man Anmerkungen, Hinweise und Texte in einem Programm einbauen, die aber nicht ausgeführt werden.

### //

Mittels der zwei Schrägstriche wird ein Kommentar eingeleitet. Alles was nach den zwei Schrägstreichen in der Zeile folgt ist ein Kommentar: `// Dies ist einzeiliger Kommentar` `var x = 0; // Auch dies ist ein Kommentar`

### /* */

Desweiteren gibt es noch den Kommentar der durch /* */ begrenzt wird. Anders als die erste Möglichkeit kann dieser Kommentar sich über mehrere Zeilen erstrecken: `/*` `var x = 0; // Auch dies ist ein Kommentar` `console.log(x);` `*/` Eine Verschachtelung von /* */ ist nicht erlaubt: `/*` `var x = 0; /*Auch dies ist ein Kommentar*/` `console.log(x);` `*/` Dieses Beispiel führt zu einem Fehler. Das Schöne ist, dass man Kommentare nicht verwenden muss. Trotzdem kann ich nur dringend dazu raten. Neulich musste ich eine Anpassung an einem Programm vornehmen, welches ich vor 20 Jahren geschrieben habe. Das Programm besteht aus mehreren tausend Zeilen. Ich war überrascht, wie gut ich dem Quelltext kommentiert hatte. Jede Datei hatte am Anfang eine Einführung, wozu diese dient. Genauso wurde bei jeder Funktion angegeben, wozu sie dient. Auch im Quelltext ist an entscheidenden Stellen erläutert, was der Sinn ist. Dadurch war es sehr einfach, sich in das Programm hineinzufinden und die Änderungen vorzunehmen. Ein Programm sollte immer so mit Kommentaren versehen sein, dass ein Programmierer, der nie das Programm gesehen hat, sich mit minimalen Aufwand einarbeiten kann und weiter an dem Programm programmieren kann. Eine Kommentierung könnte so aussehen: `/**********************************************` `* File: xxxx` `* Zweck: yyyyy` `* Abhängigkeiten: hm_rpc, ...` `**********************************************/` `/* Funktion AllLightsOff` `Durch diese Funktion werden alle Lichter ausgeschaltet.` `*/` `function AllLightsOff() {` `    var lights = [x,y,z];   //Array aller Lichter, die ausgeschaltet werden sollen` `}` Da die Kommentierung optional ist, muss man sie nicht machen. Es gibt gewichtige Gründe einen Quelltext zu kommentieren. Je komplexer ein Programm ist, desto wichtiger ist die Kommentierung. Und man schreibt die Kommentierung gleich. Später wird nämlich immer noch später oder nie. Und immer daran denken, die Kommentierung kommt irgendwann einem zugute.

## Operatoren

Verschiedene Operatoren haben wir schon kennengelernt. Dennoch ist es nunmehr an der Zeit, sich diese genauer zu betrachten.

### Zuweisungsoperator

Diesen Operator haben wir bereits viele Male eingesetzt. Zweck dieses Operators ist es, einer Variablen einen Wert zuzuweisen. Dazu wird das Gleichheitszeichen verwendet: `var sVorname = "Adam";` Wichtig ist, immer daran zu denken, dass das Zeichen nicht zur Feststellung der Gleichheit von zwei Werten verwendet werden kann. Dieser Fehler bleibt leicht unentdeckt.

### Vergleichsoperatoren

Da wir das Thema bereits angesprochen haben. Die Gleichheit zweier Werte wird mittels == festgestellt. Beispiel: `var iAlter = 45; if (iAlter == 45) console.log(iAlter);` Liste der Vergleichsoperatoren: Operator Bedeutung Ergebnis der Operation **==** istgleich true, wenn die Werte gleich sind, sonst false. **!=** ungleich true, wenn die Werte ungleich sind, sonst false. **>** größer true, wenn der linke Wert größer als der rechte ist, sonst false. **>=** größergleich true, wenn der linke Wert größer oder gleich dem rechten ist, sonst false. **<** kleiner true, wenn der linke Wert kleiner als der rechte ist , sonst false. **<=** kleinergleich true, wenn der linke Wert kleiner oder gleich dem rechten ist, sonst false. Bei Vergleichen schleichen sich leicht Fehler ein. Beispiel: `console.log(45 == "45“);` Hier wird eine Zahl mit einem String verglichen. Javascript ist so „schlau“, dass es erkennt, dass eine Zahl mit einem String verglichen wird. Daher wandelt Javascript die Zahl in einen String um. Tatsächlich wird also "45"=="45“. Das Ergebnis ist also true. Bei dem Datentyp object ist zu beachten, dass der Vergleich mit == nur dann true ergibt, wenn bei Variablen des Typs object auf dasselbe object verweisen. Der Operator == prüft also nicht, ob es das gleiche, sondern dasselbe object ist. Es ist halt ein großer unterschied, ob man das gleiche oder dasselbe Hemd an hat.

### Typengenaue Vergleiche

Wenn eine Typenumwandlung nicht gewollt ist, es also darauf ankommt, dass sowohl Datentyp als auch Wert übereinstimmen, so stehen folgende Operatoren zur Verfügung: Operator Bedeutung Ergebnis der Operation **===** istgleich true, wenn beide Werte gleich und außerdem gleichen Typs sind, sonst false. **!==** ungleich true, wenn die Werte ungleich oder nicht gleichen Typs sind, sonst false.

### Rechenoperatoren

Die typischen Rechenoperationen +,-,*,/ sind hinreichend bekannt. Zusätzlich gibt es noch die Rechenoperation Modulo. Bei Modulo wird der Rest bei einer Division ermittelt. Bei 7 Modulo 5 wäre der Rest 2\. Das Zeichen für die Modulooperation ist %. Das Vorzeichen der Modulooperation entspricht immer dem Vorzeichen des Dividenten (1\. Zahl).

### Rechenoperationen mit Zuweisung

Häufig sind die Rechenoperationen einfacher Natur. Z.B. soll eine Variablen ein Wert hinzugefügt werden. Dies würde klassischer Weise so geschrieben werden: `   var iZahl = 0; iZahl = iZahl + 3;` Eine elegante Abkürzung ist: ` var iZahl = 0; iZahl += 3;` Folgende Operationen mit Zuweisung existieren: Schreibweise Operation Neuer Wert a += b Addition a + b a -= b Subtraktion a - b a *= b Multiplikation a * b a /= b Division a / b a %= b Rest bei Division a % b Inkrementoren und Dekrementoren Falls eine Variablen genau um 1 erhöht oder erniedrigt werden soll, gibt es auch eine Abkürzung. Damit es nicht zu einfach wird, gibt es jeweils zwei fast gleiche Schreibweisen, die sich im Detail erheblich unterscheiden: `   var a = 0; a = a + 1;` entspricht: `   a++;` Es gibt jedoch noch: `var a = 0, b; b = ++a;` Hier wird erst b der Wert von a zugewiesen, anschließend wird a um 1 erhöht. Damit hat a den Wert 1 und b den Wert 0. Die Operation ++ wird uns bei Schleifen noch häufiger begegnen. Bei -- gibt es ebenfalls beide Schreibweisen mit gleicher Funktionalität mit dem Unterschied, dass 1 subtrahiert wird.

### Logische Operatoren

Stellen wir uns vor, wir wollen wissen, ob ein Postleitzahl in einem Bereich zwischen 30000 und 31000 liegt. Muss die Zahl>= 3000 sein und <=31000. In Javascript wird das dann wie folgt formuliert: `   if (iPLZ >= 3000 && iPLZ <= 31000) console.log("Die Postleitzahl liegt im gesuchten Bereich!");` Das Ergebnis einer solchen Operation ist immer true oder false. Neben und &&, gibt es noch oder || und nicht !. Die Rechenoperationen geben folgende Werte wieder: Eingabe Ergebnis `A B A && B A || B !A false false true false true false true false true false true false false true false true true true true false`

### object

Ein object ist eine Sammlung von Eigenschaften. Eine Eigenschaft ist eine Verbindung von einem Namen und einem Wert. Der Wert eine Eigenschaft kann eine Funktion sein, die in diesem Fall Methode genannt wird.Wir haben schon viel mit objects gearbeitet ohne zu wissen, dass es sich um ein object handelt. Bestes Beispiel ist getState(). Wir haben uns schon häufig einen Wert von ioBroker mittels getState() geholt und damit gearbeitet. Jetzt wollen wir uns mal ein solches object genauer anschauen:

<pre class="codecontent">const util = require('util');
var zw = getState("hm-rpc.0.HEQ0400xxx.1.TEMPERATURE");
console.log(util.inspect(zw, { showHidden: true, depth: null }));</pre>

In der ersten Zeile wird das Modul util geladen. Was es damit auf sich hat, lassen wir mal offen. Die zweite Zeile ist uns von der Art vertraut. Ich lasse hier den Temperaturwert meiner Wetterstation einlesen. Das Spannende ist die dritte Zeile. Mit ihr wird die folgende Ausgabe erzeugt:

<div class="quotecontent">javascript.0 script.js.Test: { val: 5.8, ack: true, ts: 1477116275740, q: 0, from: 'system.adapter.hm-rpc.0', lc: 1477114757154 }</div>

Richtig, val ist die aktuelle Außentemperatur. Kommt euch val bekannt vor? Ja, richtig. Bislang haben wir immer geschrieben:

<pre class="codecontent">var zw = getState("hm-rpc.0.HEQ0400xxx.1.TEMPERATURE").val;</pre>

Mittels der Punkt-Notation kann man einen Wert des object, hier val ausgeben. Damit ist das Geheimnis um val gelöst. Schauen wir uns die anderen Eigenschaften des object mal an: ts: Zeitstempel, wann der Wert aktualisiert wurde (auch ohne Wertänderung) lc: Zeitstempel, wann der Wert geändert wurde from: Adapter-Instanz, die den Wert zuletzt aktualisiert hat q: Qualität - Nummer mit folgenden Zuständen:

*   0x00 - 00000000 - gut (kann auch undefined oder null sein)
*   0x01 - 00000001 - generell schlecht, generelles Problem
*   0x41 - 01000001 - generelles Problem mit dem Gerät
*   0x81 - 10000001 - generelles Problem mit dem Sensor
*   0x42 - 01000010 - Gerät nicht verbunden
*   0x82 - 10000010 - Sensor nicht verbunden
*   0x44 - 01000100 - Fehlermeldung aus dem Gerät
*   0x84 - 10000100 - Fehlermeldung aus dem Sensor

ioBroker verwaltet damit viel mehr Daten, als wir erwartet haben. Wenn wir uns unseren Quelltext noch einmal genau anschauen, entdecken wir, dass wir mit noch zwei object gearbeitet haben: util und console. Da wir schon häufiger console verwendet haben, wollen wir console mal genauer inspizieren:

<pre class="codecontent">const util = require('util');
console.log(util.inspect(console, { showHidden: true, depth: null }));</pre>

Das Ergebnis ist:

<div class="quotecontent">javascript.0 script.js.Test: { log: { [Function] [length]: 1, [name]: '', [prototype]: { [constructor]: [Circular] } }, error: { [Function] [length]: 1, [name]: '', [prototype]: { [constructor]: [Circular] } }, warn: { [Function] [length]: 1, [name]: '', [prototype]: { [constructor]: [Circular] } }, debug: { [Function] [length]: 1, [name]: '', [prototype]: { [constructor]: [Circular] } } }</div>

Wie zu erwarten gibt es eine Methode log, die wir mehrfach verwendet haben. Desweiteren gibt es noch die Methoden error, warn und debug. Genaueres erfahren wir in der Dokumentation von nodejs: [https://nodejs.org/api/console.html](https://nodejs.org/api/console.html). Jetzt probieren wir mal ein object selber zu erzeugen:

<pre class="codecontent">const util = require('util');
var oCar = new Object();
oCar.make = "DeLorean";
oCar.model = "DMC-12";
oCar.year = 1982;
console.log(util.inspect(oCar, { showHidden: true, depth: null }));</pre>

Die Ausgabe ist erwartungsgemäß:

<div class="quotecontent">`javascript.0 script.js.Test: { make: 'DeLorean', model: 'DMC-12', year: 1982 }`</div>

Statt der Punkt-Notation können auch eckige Klammern verwendet werden. Das obige Beispiel sieht dann so aus:

<pre class="codecontent">const util = require('util');
var oCar = new Object();
oCar["make"] = "DeLorean";
oCar["model"] = "DMC-12";
oCar["year"] = 1982;
console.log(util.inspect(oCar, { showHidden: true, depth: null }));</pre>

Bei der Punkt-Notation müssen die Namen den Anforderungen der Namensgebung von Variablen entsprechen. Bei der Notation in eckigen Klammern könnte man aber auch "letzer Tankvorgang" als gültigen Namen nehmen. Bei der Punkt Notation wäre das nicht möglich. Bei eckigen Klammer-Notation darf der Name ein String, eine Zahl oder ein object sein. Auch interessant ist, dass der Name eine Variable sein kann:

<pre class="codecontent">const util = require('util');
var meinObj = {},
str = "Name mit Leerzeichen",
rand = Math.random(),
obj = {};

meinObj.type              = "Dot notation";
meinObj["date created"]   = "String mit Leerzeichen";
meinObj[str]              = "String Wert";
meinObj[rand]             = "Random Number";
meinObj[obj]              = "Object";
meinObj[""]               = "Der Name ist ein leerer String!";
console.log(util.inspect(meinObj, { showHidden: true, depth: null }));

</pre>

### object vs primitive

*   Eine Variable vom Typ primitive besteht nicht aus anderen Datentypen. Ein primitive ist der kleinste unteilbare Datentyp. Ein object kann und besteht in der Regel aus anderen Datentypen.
*   Variablen vom Type primitive werden per Wert übergeben, dass heisst, bei einem primitive wird immer einer Kopie des Wertes übergeben. Variablen vom Typ object werden per Kopie der Referenz übergeben. Eine Referenz kann man sich als Visitenkarte vorstellen. Jeder, der eine Visitenkarte erhält, erhält eine eigene Visitenkarte (also eine Kopie). Die Person, auf die in der Visitenkarte verwieden wird, wird freilich nicht kopiert, sie bleibt einzigartig.
*   Daten vom Typ primitive hängen von keinem anderen Datentyp ab. Es gibt insbesondere keine Überklasse. Daten vom Typ object sind immer von der Klasse Object abgeleitet. Ein Object hat immer eine Reihe von Standardmethoden, die sie von der Klasse Object ererbt haben: z.B. toString() und clone(). Daten vom Type primitive haben keine eigenen Methoden.
*   Daten vom Typ primitives sind unveränderlich. Bei objects sind diese standardmäßig nicht unveränderlich. Daher ist bei dem Bearbeiten besondere Vorsicht geboten.
*   Objekte können auf zwei Arten übergeben werden. Entweder als shadow copy oder als deep copy. Eine deep copy ist eine vollständige Kopie des Objects. Eine shadow Kopie ist lediglich eine Kopie der Reference. Das object wird also selber nicht kopiert. Änderungen an der Schattenkopie haben immer auch Auswirkungen auf das "Original". Bei primitive gibt es eine solche Unterscheidung nicht. Kopien erfolgen immer als deep copy.

Jetzt ist es an der Zeit unser Wissen zu prüfen:

<pre class="codecontent">   var a = 3.14;
console.log(typeof a);
console.log(a.toFixed());</pre>

Das Ergebnis ist erwartungsgemäß 3\. Erwartungsgemäß? Die Variable a ist vom Typ number. Mittels .toFixed() wird der Ganzzahlanteil ermittelt und in einem String umgewandelt. Aber wieso funktioniert eigentlich .toFixed(). Eine number ist ein Primitive. Daten vom Type primitive haben keine Methoden. Also wieso funktioniert der Aufruf. Von jedem Datentyp primitive gibt es auch eine entsprechende Klasse. Diese heißt bei einer number, richtig geraten Number. Aufruf des Aufrufs per Methode weiß Javascript, dass der Datentyp primitiv in ein object umgewandelt werden muss. Dabei wird der Datentyp von a nicht verändert. Vielmehr wird der Wert von a in ein object der Klasse Number kopiert und anschließend die Methode toFixed() aufgerufen.

<pre class="codecontent">var a = 2;
a.test = 'Test';
console.log(a.test);</pre>

Das Ergebnis ist "undefined". Zeile 2 löst keinen Fehler aus. OK, wir wissen, dass durch Angabe von .test Javascript weiss, dass a als object behandelt werden soll. Daher kann dann auch der string zugewiesen werden. Aber es wird nicht a selber in ein object umgewandelt, sondern eine Kopie! Nach Beendigung von Zeile 2 geht das Ergebnis von der Kopie schlicht verloren. In a (immer noch eine number) gibt es schlicht keine Eigenschaft .test. Hätten wir das gewollt, hätte das so funktioniert:

<pre class="codecontent">var a = 2;
a = new Number(a);
a.test = 'Test';
console.log(a.test);</pre>

Hier noch ein paar Beispiele:

<pre class="codecontent">console.log(typeof true); //"boolean"
console.log(typeof Boolean(true)); //"boolean"
console.log(typeof new Boolean(true)); //"object"
console.log(typeof (new Boolean(true)).valueOf()); //"boolean"

console.log(typeof "abc"); //"string"
console.log(typeof String("abc")); //"string"
console.log(typeof new String("abc")); //"object"
console.log(typeof (new String("abc")).valueOf()); //"string"

console.log(typeof 123); //"number"
console.log(typeof Number(123)); //"number"
console.log(typeof new Number(123)); //"object"
console.log(typeof (new Number(123)).valueOf()); //"number"</pre>

Hier noch ein (unschönes) Beispiel:

<pre class="codecontent">String.prototype.returnMe = function() {
return this;
}

var a = "abc";
var b = a.returnMe();

console.log(a); //"abc"
console.log(typeof a); //"string" (still a primitive)
console.log(b); //"abc"
console.log(typeof b); //"object"</pre>

Wir fügen mit prototype eine Methode der Klasse String hinzu. Durch die Zeile

<div class="quotecontent">`var b = a.returnMe();`</div>

wird a als erstes in ein String object umgewandelt. Dann wird die Methode returnMe() aufgerufen. Diese Methode gibt als Ergebnis eine Referenz auf das object zurück. Diese Referenz wird in b gespeichert. Damit kann das Ergebnis über b abgerufen werden. Wir haben es aber mit einem weiteren object ganz häufig zu tun, dem string. Wir erinnern uns, alle Datentypen, die nicht zu primitiv gehören sind vom Type object. Daher muss ein string ein object sein:

<pre class="codecontent">   const util = require('util');
console.log(util.inspect("Test", { showHidden: true, depth: null }));</pre>

Die Klassen, die die primitve Datentypen ersetzen sind nur eine Art Hilfsklasse. Wenn möglich, versucht Javascript wieder den primitiven Datentyp zu verwenden:

<pre class="codecontent">   var oZahl = new Number(2);
var iZahl = 3 + oZahl;
console.log(typeof iZahl);</pre>

Das Ergebnis ist number. Dass heisst, Javascript hat oZahl in eine number umgewandelt und die Zahlen addiert. Damit sollten wir auch für folgendes Beispiel fit sein:

<pre class="codecontent">   if (new Boolean(false)) {
console.log("if-Bedinung war true");
}</pre>

Ihr habt es schon geahnt: Die if-Bedienung war tatsächlich true. Aber warum? Die if-Bedienung is ein object der Klasse Boolean. Ein Boolean object ist true, wenn es weder null noch undefined ist. Wir hätten also das object erst ausdrücklich umwandeln müssen:

<pre class="codecontent">   if (new Boolean(false).valueOf()) {
console.log("if-Bedinung war true");
}</pre>

Zum Schluss dieses Abschnitts noch eine Nuss zum Nachdenken:

<pre class="codecontent">   var s = new String("Test");
s.length = 2;
console.log(s.length);
console.log(s);</pre>

Was wird als Länge ausgegeben? 2 oder 4? Zum Glück 4\. Die Länge ist unveränderlich.</div>

## Funktionen

Wir haben sie bereits verwendet, wir haben selber etliche geschrieben, nur was ist das? Eine Funktion ist eine Zusammenfassung mehrere Anweisungen zu einem Block. Eine Funktion wird (in der Regel) über Ihren Namen aufgerufen. Ihr können Parameter übergeben werden und sie kann einen Rückgabewert haben. Nehmen wir die Funktion **getState**(). Der Funktion übergeben wir die id des States, den wir haben möchten. Als Rückgabewert erhalten wir dann den Zustand des States. Gut, eine Funktion verwendet man, wenn man sie braucht. Wann aber schreibt man eine Funktion? Dann, wenn man muss, oder wenn man sie braucht. Wir brauchen z.B. eine Funktion bei der Funktion **subscribe**() bzw. **on**().

<pre class="codecontent">on({id: 'hm-rpc.1.IEQ053xxxx.1.PRESS_SHORT‘}, function (obj) {
setState("hm-rpc.1.IEQ038xxxx.3.State",!getState("hm-rpc.1.IEQ038xxxx3.State").val);
setState("hm-rpc.1\. IEQ056xxxx.3.State",!getState("hm-rpc.1\. IEQ056xxxx.State").val);
});</pre>

Die Funktion ist der Bereich

<div class="quotecontent">`function (obj) { ... }`</div>

In diesem Fall hat die Funktion keinen Namen. Wichtig ist folgendes festzuhalten:

*   Eine Funktion ist mit dem Schlüsselwort function gekennzeichnet.
*   Eine Funktion kann einen Namen haben. Beispiel function irgendetwas. Der Name kann nach den gleichen Regeln wie der Name einer Variablen gewählt werden.
*   Einer Funktion kann ein oder mehrere Werte Übergeben werden. In dem Beispiel wird ein Wert, obj, übergeben. Mehrere Werte werden durch Komma übergeben. Die Werte werden von Runden Klammern eingeschlossen. Wird kein Wert übergeben, so bleibt der Raum zwischen den runden Klammern leer.
*   In den geschweiften Klammern wird dann die Anweisungen wie in einem ganz normalen Programm geschrieben.
*   Eine Funktion kann einen Wert zurückgeben.

Nur wann schreibt man sonst noch eine Funktion. Eine Funktion hilft dabei, ein Programm zu strukturieren und übersichtlicher zu gestalten. Gerade wenn ein Programmabschnitt mehrfach verwendet werden soll, macht es Sinn, ihn in eine Funktion auszugliedern. Zum Beispiel wollen wir an verschiedenen Stellen eines Programms die Temperatur schön formatieren. Das Programm könnte so aussehen:

<pre class="codecontent">console.log('Wohnzimmer: ' + formatTemp(20));
console.log('Küche: ' + formatTemp(18.27));

function formatTemp(temp) {
return(temp.toFixed(1) + '°C');
}</pre>

Die Funktion selber gibt nichts aus (könnte sie natürlich). Vielmehr gibt sie per **return** einen Wert zurück, den wir dann ausgeben. Ob sich für so eine einfache Aufgabe bereits eine Funktion lohnt liegt im Auge des Betrachters. Dem typografisch versierten Leser dürfte aufgefallen sein, dass man zwischen der Zahl und °C eigentlich ein Leerzeichen schreibt. Wenn wir dieses in der Funktion korrigieren, brauchen wir den Rest des Programms nicht mehr kontrollieren. Also auch bei so einem kleinen Programm kann es Sinn machen. Der Name der Funktion ist eine Variable. Daher müsste eigentlich auch folgendes gehen:

<pre class="codecontent">console.log('Wohnzimmer: ' + formatTemp(20));
console.log('Küche: ' + formatTemp(18.27));

var formatTemp = function (temp) {
return(temp.toFixed(1) + '°C');
};</pre>

Das Programm beschert uns jetzt aber leider einen Fehler:

<div class="quotecontent">`Test: ReferenceError: formatTemp is not defined at script.js`</div>

Das hängt damit zusammen, dass wir zunächst die Funktion (Variable) verwenden und diese erst später definiert wurde. So geht es:

<pre class="codecontent">var formatTemp = function (temp) {
return(temp.toFixed(1) + '°C');
};

console.log('Wohnzimmer: ' + formatTemp(20));
console.log('Küche: ' + formatTemp(18.27));</pre>

Daher macht es in der Regel Sinn bei der Deklaration der Funktion auch den Namen anzugeben. Bei dieser Schreibweise kommt es im Skript (fast) nicht darauf an, wo die Funktion deklariert wird. Idealer Weise schreibt man erst das eigentliche Programm und hängt am Ende die Hilfsfunktionen an. Wenn man der Funktion selber den Namen gibt sind Rekursionen möglich. Ein Rekursion ist eine Funktion, die sich selber aufruft. Es gibt Situationen in denen dieses notwendig ist. Nach Möglichkeiten sollte man diese wegen ihrer schlechten Lesbarkeit vermeiden. Ein Beispiel hierzu ist die Fakultät eine Zahl. Die Fakultät von 3 ist 6\. Die Fakultät ist eine mathematische Funktion, die einer natürlichen Zahl das Produkt aller natürlichen Zahlen (ohne Null) kleiner und gleich dieser Zahl zuordnet. Bei 3 wird also gerechnet: 1*2*3=6 Das Programm könnte hierzu wie folgt aussehen:

<pre class="codecontent">function fac(n) {
if (n < 2) {
console.log(n);
return 1;
} else {
console.log(n + '*')
return n * fac(n - 1)

}
}
console.log('=' + fac(3));</pre>

Wichtig ist die Zeile

<pre class="codecontent">   return n * fac(n - 1);</pre>

Hier ruft sich die Funktion selber auf. Bei der Variablenschreibweise wäre das nicht möglich. Trotzdem wäre ein solches Konstrukt nicht notwendig gewesen. Mit einer for-Schleife wäre das eleganter gewesen:

<pre class="codecontent">function fac(n) {
var ergebnis = 1;
for(var i = 2; i <= n; i++) ergebnis *= i;
return ergebnis;
}
console.log(fac(3));</pre>

Einer Funktion können beliebig viele Argumente übergeben werden. Spannend ist es, wenn die Zahl der Argumente variiert. Hier gibt es die Möglichkeit diese mit dem **arguments** Objekt abzufragen:

<pre class="codecontent">function printArgs() {
var result = '';
var i;
for (i = 0; i < arguments.length; i++) {
result += arguments[i] + ', ';
}
return result;
}

console.log(printArgs(1, 2, 3, 4, 'Maus'));</pre>

</div>

</div>