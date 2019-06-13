---
title:       "Markdown"
lastChanged: "14.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/community/docmarkdown.md"
---

# Markdown: Syntax

?> Damit die Dokumentation von ioBroker schnell erstellbar und leicht
lesbar ist, wurde Markdown als vereinfachte Auszeichnungssprache
gewählt. Die folgende Anleitung hilft, den Syntax und die
Möglichkeiten von Markdown kennenzulernen und in großartige
Dokumente umzusetzen.

Technisch werden vom Dokumentationssystem nur die folgenden Features unterstützt:

- Headers
- Tables
- Inline HTML
- Lists
- Links
- Images
- Bold text
- Italic text

<div id="overview"></div>
## Übersicht

<div id="philosophy"></div>
### Philosopie

Markdown wurde mit den Grundgedanken konzipiert, so einfach lesbar und
schreibbar wie möglich zu sein.

Lesbarkeit ist hierbei das oberste Ziel. Ein Markdown-formatiertes
Dokument sollte in seiner Grundform veröffentlicht werden können, ohne
den Anschein zu erwecken, es sei mit Tags oder Formatierungsbefehlen
versehen (wie es bei HTML der Fall ist).

Dementsprechend besteht Markdowns Syntax nur aus Zeichen, die mit
Bedacht so gewählt wurden, dass ihr Aussehen ihrer Bedeutung entspricht.
Zum Beispiel sehen Sternchen um ein Wort tatsächlich wie eine
\*Betonung\* aus. Listen in Markdown sehen aus wie Listen. Sogar
Zitat-Blöcke sehen wie zitierte Textpassagen aus, wie man sie aus eMails
kennt.


<div id="html"></div>
### Inline-HTML

Markdowns Syntax hat eine Bestimmung: Benutzt zu werden um für das Web
zu *schreiben*.

Markdown ist kein Ersatz für HTML, nicht einmal Ansatzweise. Der Umfang
der Syntax ist sehr klein und entspricht nur einem geringen Teil aller
HTML-Tags. Es ist nicht die Absicht von Markdown, das Einfügen von
HTML-Tags zu erleichtern. HTML ist bereits einfach genug. Die Idee
hinter Markdown ist es, Text so einfach wie möglich zu lesen, zu
schreiben und zu bearbeiten. HTML ist ein *Publikations-Format*;
Markdown ist ein *Schreib-Format*. Daher berücksichtigt seine Syntax nur
Inhalte, die mit purem Text zu vermitteln sind.

Für jede Formatierung, die nicht mit Markdown machbar ist, kann einfach
HTML verwendet werden. Es ist nicht nötig, HTML zu markieren um es vom
Rest abzugrenzen. Es wird einfach in den Text geschrieben.

Die einzige Beschränkung sind Block-Elemente wie z.B. `<div>`,
`<table>`, `<pre>`, `<p>` und so weiter. Sie müssen vom umgebenden
Inhalt durch leere Zeilen getrennt sein, außerdem sollten die Start- und
End-Tags nicht mit Leerzeichen oder Tabs eingerückt sein. Markdown ist
intelligent genug um keine zusätzlichen (ungewollten) `<p>`-Tags um
HTML-Blöcke zu setzen.

So baut man zum Beispiel eine HTML-Tabelle in einen Markdown-Artikel
ein:

    Dies ist ein normaler Absatz.

    <table>
        <tr>
            <td>Foo</td>
        </tr>
    </table>

    Dies ist noch ein normaler Absatz.

Es ist zu beachten, dass Markdowns Syntax innerhalb von HTML-Blöcken
nicht interpretiert wird. Es kann zum Beispiel keine *Betonung*
innerhalb von HTML-Blöcken benutzt werden.

Inline-HTML-Tags wie z.B. `<span>`, `<cite>`, oder `<del>` können
überall in einen Markdown-Absatz, Listenpunkt oder einer Kopfzeile
verwendet werden. HTML-Tags können sogar statt der entsprechenden
Markdown-Formatierung verwendet werden. Es ist kein Problem, statt
Markdows Syntax für Links oder Grafiken einfach `<a>` oder `<img>` zu
verwenden.

Im Gegensatz zu Block-Tags *wird* die Markdown-Syntax innerhalb
von Inline-Tags interpretiert.

<a id="autoescape"></a>
### Automatische Maskierung besonderer Zeichen

In HTML gibt es zwei Zeichen, die einer besonderen Behandlung bedürfen:
`<` und `&`. Die linke spitze Klammer wird verwendet um HTML-Tags zu
öffnen, das kaufmännische Und wird verwendet um benannte Zeichen
(Entities) zu beschreiben. Wenn diese Zeichen in HTML-Dokumenten als
"sie selbst" verwendet werden sollen, müssen sie als Entities maskiert
werden, also als `&lt;` und `&amp;`.

Das kaufmännische Und ist besonders unpraktisch für Web-Entwickler. Will
man über "AT&T" schreiben, muss man "`AT&amp;T`" schreiben. Das
kaufmännische Und muss sogar in URLs maskiert werden. In einem Link zur
Seite

    `http://images.google.com/images?num=30&q=larry+bird`

muss die URL wie folgt kodiert werden:

    `http://images.google.com/images?num=30&amp;q=larry+bird`

Dies ist einfach zu vergessen und vermutlich der beliebteste Fehler bei
der Validierung von ansonsten wohlgeformten HTML-Dokumenten.

Markdown erlaubt es, diese Zeichen ganz normal zu benutzen. Es regelt
die Kodierung selbst. Wenn ein Kaufmanns-Und in einem Entity verwendet
wird, wird es nicht kodiert, sonst zu `&amp;` umgewandelt.

Wenn man also zum Beispiel ein Copyright-Symbol eingeben will, kann man
einfach

    &copy;

schreiben, und Markdown wird dies nicht modifizieren. Aber aus

    AT&T

wird Markdown

    AT&amp;T

machen. Da Markdown Inline HTML unterstützt, werden spitze Klammern im
entsprechenden Fall ganz normal als HTML behandelt. Nur aus Sachen wie

    4 < 5

wird Markdown

    4 &lt; 5

machen. In Code- oder Span-Blöcken werden spitze Klammern und das
kaufmännische Und jedoch *immer* kodiert. Dies vereinfacht das Schreiben
über HTML in Markdown (Im Gegensatz zu rohem HTML, wo es meist ein
Alptraum ist, jedes `<` und `&` zu kodieren).



* * *


<div id="block"></div>

## Block-Elemente


<a id="p"></a>
### Absätze und Zeilenumbrüche
Ein Absatz besteht einfach aus einer oder aus mehreren Zeilen von Text,
abgetrennt durch eine oder mehrere leere Zeilen. (Eine leere Zeile ist
jede Zeile die *aussieht* wie eine leere Zeile -- eine Zeile die nichts
anderes enthält als Leerzeichen und Tabs wird als leer behandelt.)
Normale Absätze sollten nicht mit Leerzeichen oder Tabs eingerückt sein.

Die "eine oder mehrere Zeilen"-Regel impliziert eine Sache: Markdown
unterstützt Absätze mit "harten Umbrüchen". Dies ist ein großer
Unterschied zu den meisten anderen Text-zu-HTML-Formatierern (inklusive
der "Convert Line Breaks" Option von Movable Type), die jeden
Zeilenumbruch in einem Absatz als `<br />` formatieren.

Wenn man ein `<br />` als Umbruch haben *will*, kann man die Zeile
einfach mit zwei oder mehr Leerzeichen beenden.

Dies ist zwar ein kleiner Mehraufwand um ein `<br />` zu erzeugen, aber
eine einfache "jeder Zeilenumbruch ist ein `<br />`" Regel würde in
Markdown nicht funktionieren.

Markdowns Email-artige [Zitate][bq] und [Listen-Einträge][l] mit
mehreren Absätzen funktionieren am Besten - und sehen besser aus -- wenn
sie mit Zeilenumbrüchen formatiert werden.

  [bq]: #blockquote
  [l]:  #list



<a id="header"></a>
### Kopfzeilen
Markdown hier unterstützt nur eine Art von Kopfzeilen-Formatierung: atx.

Atx-artige Kopfzeilen verwenden 1-6 Rauten-Zeichen am Anfang der Zeile,
entsprechend den Ebenen 1-6. Zum Beispiel:

    # Dies ist ein H1

    ## Dies ist ein H2

    ###### Dies ist ein H6

<a id="blockquote"></a>
### Zitate

Markdown verwendet - wie E-Mails - das Zeichen `>` für Zitat-Blöcke.
Wenn man Erfahrung mit Zitaten in E-Mails hat, weiß man auch wie man
Zitate in Markdown erstellt. Es sieht am Besten aus wenn man den Text
pro Zeile umbricht und ein `>` vor jede Zeile setzt:

    > Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,
    > consectetuer adipiscing elit. Aliquam hendrerit mi posuere
    > lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    > vitae, risus.
    >
    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    > Suspendisse id sem consectetuer libero luctus adipiscing.

Markdown erlaubt aber auch faul zu sein und das `>` nur auf der ersten
Zeile eines hart umgebrochenen Absatzes zu verwenden:

    > Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,
    risus.

    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.


Zitate können verschachtelt werden (also Zitat in einem Zitat) indem man
mehr `>` verwendet:

    > Dies ist die erste Zitat-Ebene.
    >
    > > Dies ist ein verschachteltes Zitat.
    >
    > Zurück auf der ersten Ebene.

Zitate können andere Markdown-Elemente enthalten, darunter Kopfzeilen,
Listen und Code-Blöcke:

	> ## Dies ist eine Überschrift.
	>
	> 1.   Dies ist der erste Listenpunkt.
	> 2.   Dies ist der zweite Listenpunkt.
	>
	> Hier ist ein wenig Beispiel-Code:
	>
	>     return shell_exec("echo $input | $Markdown_script");

Jeder vernünftige Text-Editor sollte das Zitieren im Stil von E-Mail
einfach machen. In BBEdit zum Beispiel kann man eine Auswahl machen und
aus dem Menü `Text` den Punkt `Increase Quote Level` wählen.



<a id="list"></a>
### Listen

Markdown unterstützt sortierte (nummerierte) und unsortierte Listen
(Aufzählungen).

Unsortierte Listen benutzen Sternchen, Plus und Bindestriche --
austauschbar -- als Listen-Marker:

    *   Rot
    *   Grün
    *   Blau

ist gleich:

    +   Rot
    +   Grün
    +   Blau

Und:

    -   Rot
    -   Grün
    -   Blau

Sortierte Listen verwenden Zahlen mit darauf folgendem Punkt:

    1.  Hund
    2.  Katze
    3.  Maus

Hierbei ist es wichtig zu verstehen, dass die Zahlen selber keine
Auswirkung auf den Output von Markdown hat. Markdown erstellt aus der
letzten Liste folgenden HTML-Code:

    <ol>
    <li>Hund</li>
    <li>Katze</li>
    <li>Maus</li>
    </ol>

Wenn man die Liste statt dessen so schreibt:

    1.  Hund
    1.  Katze
    1.  Maus

Oder sogar:

    3. Hund
    1. Katze
    8. Maus

kommt trotzdem jedes Mal die gleiche Liste heraus. Wenn gewünscht, kann
man seine Listen von Hand richtig nummerieren. Aber wer faul sein will,
kann getrost immer die gleiche Ziffer benutzen.

Allerdings sollte man auch dann die Liste mit der Nummer 1 beginnen. In
Zukunft wird Markdown vielleicht eine Startziffer für den ersten
Listeneintrag festlegen wollen.

Listeneinträge beginnen normalerweise am linken Rand des Dokuments, sie
können jedoch bis zu drei Leerzeichen nach Rechts eingerückt sein.
Listen-Marker müssen mit ein oder mehr Leerzeichen oder einem Tab vom
folgenden Text getrennt werden.

Um Listen schön zu formatieren, können die einzelnen Einträge weiter
eingerückt werden, so wie hier:

    *   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
        viverra nec, fringilla in, laoreet vitae, risus.
    *   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
        Suspendisse id sem consectetuer libero luctus adipiscing.

Das folgende Beispiel generiert den gleichen Code, ist aber weniger
aufgeräumt:

    *   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
    *   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.

Wenn Listeinträge durch Leerzeilen getrennt sind, wird Markdown die
Listeneinträge mit `<p>` und `</p>` umhüllen.

Zum Beispiel wird dies:

    *   Warsteiner
    *   König

zu

    <ul>
    <li>Warsteiner</li>
    <li>König</li>
    </ul>

Aber dies:

    *   Warsteiner

    *   König

wird zu

    <ul>
    <li><p>Warsteiner</p></li>
    <li><p>König</p></li>
    </ul>

Listenpunkte können aus mehreren Absätzen bestehen. Jeder folgende
Absatz in einem Listenpunkt muss mit mindestens 4 Leerzeichen oder einem
Tab eingerückt werden:

    1.  Dies ist eine Listenpunkt mit zwei Absätzen. Lorem ipsum dolor
        sit amet, consectetuer adipiscing elit. Aliquam hendrerit
        mi posuere lectus.

        Vestibulum enim wisi, viverra nec, fringilla in, laoreet
        vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
        sit amet velit.

    2.  Suspendisse id sem consectetuer libero luctus adipiscing.

Es sieht gut aus wenn jede Zeile des folgenden Absatzes eingerückt ist,
aber wieder erlaubt Markdown dem Faulen, nur die erste Zeile
einzurücken:

    *   Dies ist ein Listenpunkt mit zwei Absätzen

        Dies ist der zweite Absatz in diesem Listenpunkt. Nur die
    erste Zeile muss eingerückt sein. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit.

    *   Ein weiterer Punkt in der selben Liste.

Um ein Zitat in einem Listenpunkt zu verwenden muss das Zitat eingerückt
werden:

    *   Ein Listenpunkt mit einem Zitat:

        > Dies ist ein Zitat
        > In einer Liste.

Um einen Code-Block in einem Listenpunkt zu verwenden muss er *zwei mal*
eingerückt werden -- 8 Leerzeichen oder zwei Tabs:

    *   Ein Listenpunkt mit Codebeispiel:

            <hier Code einfügen>


Es ist möglich Listen unabsichtlich zu erstellen, indem man z.B.
folgendes schreibt:

    1986. Was für ein wundervolles Jahr.

Mit anderen Worten: Die Sequenz *Zahl-Punkt-Leerzeichen* am Anfang einer
Zeile. Um dieses Problem zu vermeiden kann der Punkt per Backslash
maskiert werden:

    1986\. Was für ein wundervolles Jahr.



<h3 id="precode">Code-Blöcke</h3>

Vorformatierte Code-Blöcke werden verwendet um über Programm- oder
Markup-Quelltext zu schreiben. Statt normale Absätze zu bilden werden
die Zeilen in einem Code-Block wie vorgefunden interpretiert. Markdown
umfasst Code-Blöcke mit den Tags `<pre>` und `<code>`.

Um einen Code-Block in Markdown zu erstellen, wird einfach jede Zeile
des Blocks mit mindestens 4 Leeerzeichen oder einem Tab eingerückt. Aus
folgender Eingabe...

    Dies ist ein normaler Absatz.

        Dies ist ein Code-Block.

...macht Markdown folgendes:

    <p>Dies ist ein normaler Absatz.</p>

    <pre><code>Dies ist ein Code-Block.
    </code></pre>

Eine Stufe der Einrückung -- 4 Leerzeichen oder 1 Tab -- werden von
jeder Zeile der Einrückung entfernt. Folgendes zum Beispiel...

    Ein Beispiel in AppleScript:

        tell application "Foo"
            beep
        end tell

...wird zu

    <p>Ein Beispiel in AppleScript:</p>

    <pre><code>tell application "Foo"
        beep
    end tell
    </code></pre>

Ein Code-Block endet bei der ersten Zeile, die nicht eingerückt ist
(oder am Ende des Dokuments).

In einem Code-Block werden das kaufmännische Und (`&`) und spitze
Klammern (`<` und `>`) automatisch in HTML-Entities umgewandelt. Dies
erleichtert die Einbindung von HTML-Stücken ungemein -- einfach HTML in
das Dokument kopieren, einrücken und Markdown erledigt die Kodierung des
kaufmännischen Unds und der spitzen Klammern. Zum Beispiel:

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

wird zu:

    <pre><code>&lt;div class="footer"&gt;
        &amp;copy; 2004 Foo Corporation
    &lt;/div&gt;
    </code></pre>

Normale Markdown-Syntax wird in Code-Blöcken nicht verarbeitet. D.h.
Sternchen sind einfach nur Sternchen in einem Code-Block und nicht das
Signal, den Text hervorzuheben. Die Konsequenz ist, dass es einfach ist,
in Markdown *über* Markdown zu sprechen.



<a id="hr"></a>
### Horizontale Linien
Der Tag für horizontale Linien (`<hr />`) kann generiert werden indem 3
oder mehr Bindestriche oder Sternchen allein auf einer
Zeile geschrieben werden. Leerzeichen zwischen den Zeichen sind auch
erlaubt. Alle folgenden Beispiele würden eine horizontale Linie
generieren:

    * * *

    ***

    *****

    - - -

    ---------------------------------------


* * *


<div id="span"></div>
## Span-Elemente

<a id="link"></a>
### Links

Markdown unterstützt zwei Arten von Links: *Inline* und *Referenzen*.

In beiden Stilen wird der Link-Text mit [eckigen Klammern] markiert.

Um einen Inline-Link zu erstellen schreibt man direkt hinter der
schließenden eckigen Klammer normale Klammern. In diese Klammern wird
die URL geschrieben auf die verlinkt werden soll zusammen mit einem
*optionalen* Titel für den Link in Anführungsstrichen. Beispiele:

    Dies ist [ein Beispiel](http://example.com/ "Der Linktitel") für
    einen Inline-Link.

    [Dieser Link](http://example.net/) hat kein Titel-Attribut.

Daraus wird:

    <p>Dies ist <a href="http://example.com/" title="Titel">
    ein Beispiel</a> für einen Inline-Link.</p>

    <p><a href="http://example.net/">Dieser Link</a> hat kein
    Titel-Attribut.</p>

Wenn man auf Inhalte auf dem gleichen Server verweisen will, kann man
relative Pfade verwenden:

    Auf der Seite [Über mich](/about/) gibt es weitere Informationen.

Referenz-Links verwenden einen zweiten Satz eckige Klammern in die ein
beliebig gewählter Bezeichner für den Link geschrieben wird:

    Dies ist [ein Beispiel][id] für einen Referenz-Link.

Nach Belieben kann auch ein Leerzeichen zwischen den Klammern eingefügt
werden:

    Dies ist [ein Beispiel] [id] für einen Referenz-Link.

Dann, irgendwo im Dokument, wird der Link wie folgt auf einer eigenen
Zeile definiert:

    [id]: http://example.com/  "Optionalen Titel hier eintragen"

Also:

*   Eckige Klammern welche den Link-Bezeichner enthalten (wahlweise mit
    mit bis zu drei Leerzeichen eingerückt);
*   gefolgt von einem Doppelpunkt;
*   gefolgt von einem oder mehreren Leerzeichen (oder Tabs);
*   gefolgt von der URL für den Link;
*   optional gefolgt vom Text für das Titel-Attribut des Links,
    gehüllt in Klammern, einzelne oder doppelte Anführungsstriche.

Die folgenden drei Definitionen sind identisch:

	[foo]: http://example.com/  "Optionaler Titel"
	[foo]: http://example.com/  'Optionaler Titel'
	[foo]: http://example.com/  (Optionaler Titel)

**Anmerkung:** Es existiert bekannter Bug in Markdown 1.0.1 der die
Funktion von einzelnen Anführungszeichen als Trenner für Link-Titel
behindert.


Die Link-URL kann wahlweise in spitzen Klammern verpackt werden:

    [id]: <http://example.com/>  "Optionaler Titel hier"

Das Titel-Attribut kann auch auf die nächste Zeile gesetzt und mit mehr
Leerzeichen oder Tabs eingerückt werden. Dies sieht mit langen URLs
besser aus:

    [id]: http://example.com/langer/pfad/zu/seite
        "Optionaler Titel hier"

Link-Definitionen werden nur verwendet um Links zu erstellen während
Markdown das Dokument verarbeitet und werden aus dem Dokument entfernt
bevor das HTML ausgegeben wird.

Die Bezeichner für Link-Definitionen dürfen aus Buchstaben, Zahlen,
Leerzeichen und Satzzeichen bestehen. Sie sind *unabhängig* von Groß-
und Kleinschreibung:

	[Link-Text][a]
	[Link-Text][A]

Die beiden Link-Definitionen sind äquivalent.

Der *implizierte Link-Bezeichner* erlaubt das Auslassen des
Link-Bezeichers. In diesem Fall wird der Link-Text als Bezeichner
verwendet. Es wird einfach ein leerer Satz eckige Klammern an den
Link-Text angefügt:

	[Google][]

Dann wird der Link definiert:

	[Google]: http://google.com/

Da Link-Bezeichner Leerzeichen enthalten dürfen, funktioniert diese
Abkürzung sogar für mehrere Wörter im Link-Text:

	Besuchen Sie [Daring Fireball][] für weitere Informationen.

Dann wird der Link definiert:

	[Daring Fireball]: http://daringfireball.net/

Link-Definitionen können an einen beliebige Stelle im Markdown-Dokument
gemacht werden. Generell ist es eine gute Idee, sie nach dem Absatz zu
machen, in dem sie verwendet werden. Sie können aber auch wie Fußnoten
alle zusammen am Ende des Dokuments aufgelistet werden.

Ein kleines Beispiel:

    Ich bekomme zehn Mal mehr Traffic von [Google] [1] als von
    [Yahoo] [2] oder [MSN] [3].

      [1]: http://google.com/        "Google"
      [2]: http://search.yahoo.com/  "Yahoo Search"
      [3]: http://search.msn.com/    "MSN Search"

Mit der Abkürzung über den implizierten Link-Bezeichner kann man auch
folgendes Schreiben:

Ich bekomme zehn Mal mehr Traffic von [Google][] als von
    [Yahoo][] oder [MSN][].

      [google]: http://google.com/       "Google"
      [yahoo]: http://search.yahoo.com/  "Yahoo Search"
      [msn]: http://search.msn.com/      "MSN Search"

Beide Beispiele würden folgenden HTML-Code ergeben:

    <p>Ich bekomme zehn Mal mehr Traffic von <a href="http://google.com/"
    title="Google">Google</a> als von
    <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a>
    oder <a href="http://search.msn.com/" title="MSN Search">MSN</a>.</p>

Zum Vergleich folgt der gleiche Absatz unter Verwendung von Markdowns
Inline-Links:

    Ich bekomme zehn Mal mehr Traffic von [Google](http://google.com/ "Google")
    als von [Yahoo](http://search.yahoo.com/ "Yahoo Search") oder
    [MSN](http://search.msn.com/ "MSN Search").

Die Idee hinter Referenz-Links ist nicht, dass sie einfacher zu
schreiben sind. Die Idee ist, dass sie Dokumente weitaus lesbarer
machen. Der Beispiel-Absatz ist mit Referenz-Links nur 80 Zeichen lang,
mit Referenz-Links ist er ganze 181 Zeichen lang; als HTML sind es 239
Zeichen, mehr Markup als Inhalt.

Mit Markdowns Referenz-Links ähnelt das Quell-Dokument eher dem
endgültigen Ausgabeformat, wie es im Browser gezeigt wird. Durch die
Möglichkeit, Metadaten für Markup aus dem Absatz rauszuholen können
Links in den Text integriert werden ohne den Textfluss zu bremsen.



<a id="em"></a>
### Betonung
Markdown behandelt Sternchen (`*`) und Unterstriche (`_`) als
Indikatoren für Betonung. In einzelne `*` oder `_` gepackter Text wird
mit dem HTML-Tag `<em>` umschlossen, doppelte `*` oder `_` werden mit
dem Tag `<strong>` markiert. Folgender Text zum Beispiel:

    *Einzelne Sternchen*

    _Einzelne Unterstriche_

    **Doppelte Sternchen**

    __Doppelte Unterstriche__

Wird folgendes ausgeben:

    <em>Einzelne Sternchen</em>

    <em>Einzelne Unterstriche</em>

    <strong>Doppelte Sternchen</strong>

    <strong>Doppelte Unterstriche</strong>

Der Stil kann beliebig gewählt werden. Die einzige Begrenzung ist, dass
das gleiche Zeichen zum Öffnen und Schließen eines Betonungs-Bereiches
verwendet werden muss.

Betonung kann inmitten eines Wortes verwendet werden:

    Herr*gott*sakrament

Aber wenn ein `*` oder `_` von Leerzeichen umgeben ist, wird es wie ein
einfaches Sternchen oder ein einfacher Unterstrich behandelt.

Um ein Sternchen oder einen Unterstrich zu schreiben an einer Stelle wo
er als Betonung verstanden würde, kann er mit einem Backslash maskiert
werden:

    \*Dieser Text ist von Sternchen umschlossen.\*

<a id="code"></a>
### Code
Um einen Code-Bereich zu markieren, wird er mit Backtick-Zeichen
umschlossen (`` ` ``). Im Gegensatz zu einem Code-Block formatiert ein
Code-Bereich Code innerhalb eines normalen Absatzes:

    Benutze die Funktion `printf()` um Text auszugeben.

Wird zu:

    <p>Benutze die Funktion <code>printf()</code> um Text auszugeben.</p>

Wenn ein Backtick Im Code-Bereich dargestellt werden soll, dann können
mehrere Backticks vor und nach dem Code-Bereich verwendet werden:

    ``Irgendwo hier (`) ist ein Backtick versteckt.``

Dies wird zu:

    <p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

Die Backtick-Trennzeichen um einen Code-Bereich können Leerzeichen enthalten --
eins nach den öffnenden, eins vor dem schließenden Backticks. Dies ermöglicht
die Verwendung von Backticks innerhalb des Code-Bereiches auch am Anfang oder
Ende:

	Ein einzelner Backtick in einem Code-Bereich: `` ` ``

	Ein Backtick-umschlossener String in einem Code-Bereich: `` `foo` ``

wird zu:

	<p>Ein einzelner Backtick in einem Code-Bereich: <code>`</code></p>

	<p>Ein Backtick-umschlossener String in einem Code-Bereich: <code>`foo`</code></p>

In Code-Bereichen werden das kaufmännische Und so wie spitze Klammern
als HTML-Entitiy kodiert.

    Niemand benutzt `<blink>` Tags.

Dies wird zu:

    <p>Niemand benutzt <code>&lt;blink&gt;</code> Tags.</p>

Auch folgendes funktioniert:

    `&#8212;` ist das dezimal kodierte Äquivalent von `&mdash;`.

Dies wird zu

    <p><code>&amp;#8212;</code> ist das dezimal kodierte
    Äquivalent von <code>&amp;mdash;</code>.</p>



<a id="img"></a>
### Grafiken
Zugegebenermaßen ist es recht schwierig, eine "natürliche" Syntax für
das Einbinden von Grafiken in Text zu finden.

Markdown verwendet hierzu eine Syntax, die dem Stil von Links ähneln
soll. Dies erlaubt zwei Arten: Inline und Referenz.

Die Inline-Syntax sieht so aus:

    ![Alternativer Text](/pfad/zum/bild.jpg)

    ![Alternativer Text](/pfad/zum/bild.jpg "Optionaler Titel")

Also:

*   Ein Ausrufezeichen: `!`;
*   gefolgt von einem Satz eckiger Klammern die den Wert des
    `alt`-Attributes für die Grafik enthalten;
*   gefolgt von runden Klammern, welche die URL oder den Pfad zur Grafik
    enthalten sowie den Wert eines optionalen `title`-Attributes, verpackt
    in Anführungsstriche.

Bildverweise im Referenz-Stil sehen wie folgt aus:

    ![Alternativer Text][id]

"id" ist hier der Name einer definierten Bild-Referenz. Bild-Referenzen
werden mit dem gleicher Syntax definiert wie Link-Referenzen:

    [id]: url/zur/grafik  "Optionales title-Attribut"

Zur Zeit besitzt Markdown keine Syntax um die Größe einer Grafik
anzugeben. Sollte dies nötig sein kann einfach der normale HTML-Tag
`<img>` verwendet werden.



* * *


<div id="misc"></div>
## Verschiedenes

<a id="backslash"></a>
### Backslash-Maskierung

Markdown ermöglicht es, Backslash-Maskierung zu nutzen um Zeichen zu
schreiben, die sonst eine bestimmte Bedeutung in Markdowns Syntax haben.
Wenn man zum Beispiel ein Wort mit Sternchen umgeben will (statt dem
HTML-Tag `<em>`), kann man Backslashes vor die Sternchen stellen:

    \*Von Sternchen umgeben\*

Markdown bietet diese Möglichkeit für folgende Zeichen:

    \   Backslash
    `   Backtick
    *   Sternchen
    _   Unterstrich
    {}  Geschweifte Klammern
    []  Eckige Klammern
    ()  Runde Klammern
    #   Raute
    +	Plus-Zeichen
    -	Minus-Zeichen (Bindestrich)
    .   Punkt
    !   Ausrufezeichen

* * *

<a id="lizenz"></a>
### Lizenz

Dieses Werk ist lizenziert unter einer [Creative Commons Namensnennung -
Weitergabe unter gleichen Bedingungen (BY-SA) 4.0 International Lizenz][by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?>Dies ist eine Übersetzung der [originalen Syntax-Dokumentation][osd]
von [John Grubers][jg] [Markdown][md]. Diese Übersetzung bezieht sich
auf den Stand vom 15.12.2013 (Markdown Version 1.0.1). Für die
Richtigkeit der Übersetzung wird keine Gewähr übernommen. Bei Fehlern in
der Übersetzung wird um eine kurze Nachricht an <lasar@liepins.net> gebeten.
Auch jede andere Art von Feedback ist willkommen.*

   [jg]: http://daringfireball.net/
   [md]: http://daringfireball.net/projects/markdown/
  [osd]: http://daringfireball.net/projects/markdown/syntax
