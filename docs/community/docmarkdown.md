---
title:       "Markdown"
lastChanged: "14.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/community/docmarkdown.md"
---

Markdown: Syntax
================

?>Damit die Dokumentation von ioBroker schnell erstellbar und leicht
lesbar ist, wurde Markdown als vereinfachte Auszeichnungssprache
gewählt. Die folgende Anleitung hilft, den Syntax und die
Möglichkeiten von Markdown kennenzulernen und in großartige
Dokumente umzusetzen.

Technisch werden vom Dokumentationssystem die folgenden Features unterstützt:

|Variante|Version|
|------|-------|
|Originales markdown.pl| - |
|CommonMark|0.28|
|GitHub Flavored Markdown|0.28|

Zusätzlich ist eine Erweiterung für die Verwendung von [Emojies](#emojies)
integriert.

Inhalt
------

* [Übersicht](#overview)
    * [Philosophie](#philosophy)
    * [Inline HTML](#html)
    * [Automatische Maskierung besonderer Zeichen](#autoescape)
* [Block-Elemente](#block)
    * [Absätze und Zeilenumbrüche](#p)
    * [Kopfzeilen](#header)
    * [Zitate](#blockquote)
    * [Listen](#list)
    * [Code-Blöcke](#precode)
    * [Horizontale Linien](#hr)
* [Span-Elemente](#span)
    * [Links](#link)
    * [Betonung](#em)
    * [Code](#code)
    * [Grafiken](#img)
* [Verschiedenes](#misc)
    * [Automatische Links](#autolink)
    * [Backslash-Maskierung](#backslash)
* [Emojies](#emojies)


<div id="overview"></div>

## Übersicht

<h3 id="philosophy">Philosopie</h3>

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


<h3 id="html">Inline-HTML</h3>

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



<h3 id="autoescape">Automatische Maskierung besonderer Zeichen</h3>

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

    http://images.google.com/images?num=30&q=larry+bird

muss die URL wie folgt kodiert werden:

    http://images.google.com/images?num=30&amp;q=larry+bird

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


<h3 id="p">Absätze und Zeilenumbrüche</h3>

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



<h3 id="header">Kopfzeilen</h3>

Markdown unterstützt zwei Arten von Kopfzeilen-Formatierung, [Setext]
[1] und [atx] [2].

Setext-artige Kopfzeilen werden mit Gleichheitszeichen (für
Überschriften erster Ebene) und Bindestrichen (für die
zweite Ebene) "unterstrichen". Zum Beispiel:

    Dies ist ein H1
    ===============

    Dies ist ein H2
    ---------------

Eine beliebige Zahl von `=` oder `-` funktioniert.

Atx-artige Kopfzeilen verwenden 1-6 Rauten-Zeichen am Anfang der Zeile,
entsprechend den Ebenen 1-6. Zum Beispiel:

    # Dies ist ein H1

    ## Dies ist ein H2

    ###### Dies ist ein H6

Wenn gewünscht können atx-artige Kopfzeilen auch "geschlossen" werden.
Dies ist nur Kosmetik -- es kann genutzt werden wenn es besser aussieht.
Die Zahl der schließenden Rauten-Zeichen muss nicht einmal der Zahl der
öffnenden Zeichen entsprechen.

    # Dies ist ein H1 #

    ## Dies ist ein H2 ##

    ### Dies ist ein H3 ######


<h3 id="blockquote">Zitate</h3>

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



<h3 id="list">Listen</h3>

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



<h3 id="hr">Horizontale Linien</h3>

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

<h3 id="link">Links</h3>

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



<h3 id="em">Betonung</h3>

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



<h3 id="code">Code</h3>

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



<h3 id="img">Grafiken</h3>

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

<h3 id="autolink">Automatische Links</h3>

Markdown unterstützt einen einfachen Stil um "automatisch" Links für
URLs und eMail-Adressen zu generieren: Die URL oder eMail-Adresse wird
einfach von spitzen Klammern umschlossen. Wenn man eine URL oder
Mailadresse direkt zeigen will, kann man dies  so lösen:

    <http://example.com/>

Markdown wird dies in den folgenden HTML-Code umsetzen:

    <a href="http://example.com/">http://example.com/</a>

Automatische Links für eMail-Adressen funktionieren ähnlich, nur das
Markdown hier per Zufallsprinzip die Adresse in dezimale und
hexadezimale Entity-Kodierung umwandelt um dabei zu helfen, die Adresse
für Spambots unzugänglich zu machen. Zum Beispiel:

    <address@example.com>

Dies wird zu so etwas wie dem Folgenden:

    <a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65;
    &#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;
    &#109;">&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;
    &#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;</a>

Im Browser wird dies als klickbarer Link zur Adresse
"address@example.com" erscheinen.

(Dieser Trick wird viele, wenn nicht die meisten, Adressen-Sammler
abschmettern. Aber er wird definitiv nicht alle erwischen. Es ist besser
als nichts, aber irgendwann wird eine so publizierte Adresse auch Spam
zugesandt bekommen.)



<h3 id="backslash">Backslash-Maskierung</h3>

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


<div id="emojies"></div>

## Verwendbare Emojis

### Personen
|     |    |
|:---:|:---|
|:bowtie:|`:bowtie:`|
|:smile:|`:smile:`|
|:laughing:|`:laughing:`|
|:blush:|`:blush:`|
|:smiley:|`:smiley:`|
|:relaxed:|`:relaxed:`|
|:smirk:|`:smirk:`|
|:heart_eyes:|`:heart_eyes:`|
|:kissing_heart:|`:kissing_heart:`|
|:kissing_closed_eyes:|`:kissing_closed_eyes:`|
|:flushed:|`:flushed:`|
|:relieved:|`:relieved:`|
|:satisfied:|`:satisfied:`|
|:grin:|`:grin:`|
|:wink:|`:wink:`|
|:stuck_out_tongue_winking_eye:|`:stuck_out_tongue_winking_eye:`|
|:stuck_out_tongue_closed_eyes:|`:stuck_out_tongue_closed_eyes:`|
|:grinning:|`:grinning:`|
|:kissing:|`:kissing:`|
|:kissing_smiling_eyes:|`:kissing_smiling_eyes:`|
|:stuck_out_tongue:|`:stuck_out_tongue:`|
|:sleeping:|`:sleeping:`|
|:worried:|`:worried:`|
|:frowning:|`:frowning:`|
|:anguished:|`:anguished:`|
|:open_mouth:|`:open_mouth:`|
|:grimacing:|`:grimacing:`|
|:confused:|`:confused:`|
|:hushed:|`:hushed:`|
|:expressionless:|`:expressionless:`|
|:unamused:|`:unamused:`|
|:sweat_smile:|`:sweat_smile:`|
|:sweat:|`:sweat:`|
|:disappointed_relieved:|`:disappointed_relieved:`|
|:weary:|`:weary:`|
|:pensive:|`:pensive:`|
|:disappointed:|`:disappointed:`|
|:confounded:|`:confounded:`|
|:fearful:|`:fearful:`|
|:cold_sweat:|`:cold_sweat:`|
|:persevere:|`:persevere:`|
|:cry:|`:cry:`|
|:sob:|`:sob:`|
|:joy:|`:joy:`|
|:astonished:|`:astonished:`|
|:scream:|`:scream:`|
|:neckbeard:|`:neckbeard:`|
|:tired_face:|`:tired_face:`|
|:angry:|`:angry:`|
|:rage:|`:rage:`|
|:triumph:|`:triumph:`|
|:sleepy:|`:sleepy:`|
|:yum:|`:yum:`|
|:mask:|`:mask:`|
|:sunglasses:|`:sunglasses:`|
|:dizzy_face:|`:dizzy_face:`|
|:imp:|`:imp:`|
|:smiling_imp:|`:smiling_imp:`|
|:neutral_face:|`:neutral_face:`|
|:no_mouth:|`:no_mouth:`|
|:innocent:|`:innocent:`|
|:alien:|`:alien:`|
|:yellow_heart:|`:yellow_heart:`|
|:blue_heart:|`:blue_heart:`|
|:purple_heart:|`:purple_heart:`|
|:heart:|`:heart:`|
|:green_heart:|`:green_heart:`|
|:broken_heart:|`:broken_heart:`|
|:heartbeat:|`:heartbeat:`|
|:heartpulse:|`:heartpulse:`|
|:two_hearts:|`:two_hearts:`|
|:revolving_hearts:|`:revolving_hearts:`|
|:cupid:|`:cupid:`|
|:sparkling_heart:|`:sparkling_heart:`|
|:sparkles:|`:sparkles:`|
|:star:|`:star:`|
|:star2:|`:star2:`|
|:dizzy:|`:dizzy:`|
|:boom:|`:boom:`|
|:collision:|`:collision:`|
|:anger:|`:anger:`|
|:exclamation:|`:exclamation:`|
|:question:|`:question:`|
|:grey_exclamation:|`:grey_exclamation:`|
|:grey_question:|`:grey_question:`|
|:zzz:|`:zzz:`|
|:dash:|`:dash:`|
|:sweat_drops:|`:sweat_drops:`|
|:notes:|`:notes:`|
|:musical_note:|`:musical_note:`|
|:fire:|`:fire:`|
|:hankey:|`:hankey:`|
|:poop:|`:poop:`|
|:shit:|`:shit:`|
|:thumbsup:|`:thumbsup:`|
|:thumbsdown:|`:thumbsdown:`|
|:ok_hand:|`:ok_hand:`|
|:punch:|`:punch:`|
|:facepunch:|`:facepunch:`|
|:fist:|`:fist:`|
|:v:|`:v:`|
|:wave:|`:wave:`|
|:hand:|`:hand:`|
|:raised_hand:|`:raised_hand:`|
|:open_hands:|`:open_hands:`|
|:point_up:|`:point_up:`|
|:point_down:|`:point_down:`|
|:point_left:|`:point_left:`|
|:point_right:|`:point_right:`|
|:raised_hands:|`:raised_hands:`|
|:pray:|`:pray:`|
|:point_up_2:|`:point_up_2:`|
|:clap:|`:clap:`|
|:muscle:|`:muscle:`|
|:metal:|`:metal:`|
|:fu:|`:fu:`|
|:runner:|`:runner:`|
|:running:|`:running:`|
|:couple:|`:couple:`|
|:family:|`:family:`|
|:two_men_holding_hands:|`:two_men_holding_hands:`|
|:two_women_holding_hands:|`:two_women_holding_hands:`|
|:dancer:|`:dancer:`|
|:dancers:|`:dancers:`|
|:ok_woman:|`:ok_woman:`|
|:no_good:|`:no_good:`|
|:information_desk_person:|`:information_desk_person:`|
|:raising_hand:|`:raising_hand:`|
|:bride_with_veil:|`:bride_with_veil:`|
|:person_with_pouting_face:|`:person_with_pouting_face:`|
|:person_frowning:|`:person_frowning:`|
|:bow:|`:bow:`|
|:couplekiss:|`:couplekiss:`|
|:couple_with_heart:|`:couple_with_heart:`|
|:massage:|`:massage:`|
|:haircut:|`:haircut:`|
|:nail_care:|`:nail_care:`|
|:boy:|`:boy:`|
|:girl:|`:girl:`|
|:woman:|`:woman:`|
|:man:|`:man:`|
|:baby:|`:baby:`|
|:older_woman:|`:older_woman:`|
|:older_man:|`:older_man:`|
|:person_with_blond_hair:|`:person_with_blond_hair:`|
|:man_with_gua_pi_mao:|`:man_with_gua_pi_mao:`|
|:man_with_turban:|`:man_with_turban:`|
|:construction_worker:|`:construction_worker:`|
|:cop:|`:cop:`|
|:angel:|`:angel:`|
|:princess:|`:princess:`|
|:smiley_cat:|`:smiley_cat:`|
|:smile_cat:|`:smile_cat:`|
|:heart_eyes_cat:|`:heart_eyes_cat:`|
|:kissing_cat:|`:kissing_cat:`|
|:smirk_cat:|`:smirk_cat:`|
|:scream_cat:|`:scream_cat:`|
|:crying_cat_face:|`:crying_cat_face:`|
|:joy_cat:|`:joy_cat:`|
|:pouting_cat:|`:pouting_cat:`|
|:japanese_ogre:|`:japanese_ogre:`|
|:japanese_goblin:|`:japanese_goblin:`|
|:see_no_evil:|`:see_no_evil:`|
|:hear_no_evil:|`:hear_no_evil:`|
|:speak_no_evil:|`:speak_no_evil:`|
|:guardsman:|`:guardsman:`|
|:skull:|`:skull:`|
|:feet:|`:feet:`|
|:lips:|`:lips:`|
|:kiss:|`:kiss:`|
|:droplet:|`:droplet:`|
|:ear:|`:ear:`|
|:eyes:|`:eyes:`|
|:nose:|`:nose:`|
|:tongue:|`:tongue:`|
|:love_letter:|`:love_letter:`|
|:bust_in_silhouette:|`:bust_in_silhouette:`|
|:busts_in_silhouette:|`:busts_in_silhouette:`|
|:speech_balloon:|`:speech_balloon:`|
|:thought_balloon:|`:thought_balloon:`|
|:feelsgood:|`:feelsgood:`|
|:finnadie:|`:finnadie:`|
|:goberserk:|`:goberserk:`|
|:godmode:|`:godmode:`|
|:hurtrealbad:|`:hurtrealbad:`|
|:rage1:|`:rage1:`|
|:rage2:|`:rage2:`|
|:rage3:|`:rage3:`|
|:rage4:|`:rage4:`|
|:suspect:|`:suspect:`|
|:trollface:|`:trollface:`|

### Natur
|     |    |
|:---:|:---|
|:sunny:|`:sunny:`|
|:umbrella:|`:umbrella:`|
|:cloud:|`:cloud:`|
|:snowflake:|`:snowflake:`|
|:snowman:|`:snowman:`|
|:zap:|`:zap:`|
|:cyclone:|`:cyclone:`|
|:foggy:|`:foggy:`|
|:ocean:|`:ocean:`|
|:cat:|`:cat:`|
|:dog:|`:dog:`|
|:mouse:|`:mouse:`|
|:hamster:|`:hamster:`|
|:rabbit:|`:rabbit:`|
|:wolf:|`:wolf:`|
|:frog:|`:frog:`|
|:tiger:|`:tiger:`|
|:koala:|`:koala:`|
|:bear:|`:bear:`|
|:pig:|`:pig:`|
|:pig_nose:|`:pig_nose:`|
|:cow:|`:cow:`|
|:boar:|`:boar:`|
|:monkey_face:|`:monkey_face:`|
|:monkey:|`:monkey:`|
|:horse:|`:horse:`|
|:racehorse:|`:racehorse:`|
|:camel:|`:camel:`|
|:sheep:|`:sheep:`|
|:elephant:|`:elephant:`|
|:panda_face:|`:panda_face:`|
|:snake:|`:snake:`|
|:bird:|`:bird:`|
|:baby_chick:|`:baby_chick:`|
|:hatched_chick:|`:hatched_chick:`|
|:hatching_chick:|`:hatching_chick:`|
|:chicken:|`:chicken:`|
|:penguin:|`:penguin:`|
|:turtle:|`:turtle:`|
|:bug:|`:bug:`|
|:honeybee:|`:honeybee:`|
|:ant:|`:ant:`|
|:beetle:|`:beetle:`|
|:snail:|`:snail:`|
|:octopus:|`:octopus:`|
|:tropical_fish:|`:tropical_fish:`|
|:fish:|`:fish:`|
|:whale:|`:whale:`|
|:whale2:|`:whale2:`|
|:dolphin:|`:dolphin:`|
|:cow2:|`:cow2:`|
|:ram:|`:ram:`|
|:rat:|`:rat:`|
|:water_buffalo:|`:water_buffalo:`|
|:tiger2:|`:tiger2:`|
|:rabbit2:|`:rabbit2:`|
|:dragon:|`:dragon:`|
|:goat:|`:goat:`|
|:rooster:|`:rooster:`|
|:dog2:|`:dog2:`|
|:pig2:|`:pig2:`|
|:mouse2:|`:mouse2:`|
|:ox:|`:ox:`|
|:dragon_face:|`:dragon_face:`|
|:blowfish:|`:blowfish:`|
|:crocodile:|`:crocodile:`|
|:dromedary_camel:|`:dromedary_camel:`|
|:leopard:|`:leopard:`|
|:cat2:|`:cat2:`|
|:poodle:|`:poodle:`|
|:paw_prints:|`:paw_prints:`|
|:bouquet:|`:bouquet:`|
|:cherry_blossom:|`:cherry_blossom:`|
|:tulip:|`:tulip:`|
|:four_leaf_clover:|`:four_leaf_clover:`|
|:rose:|`:rose:`|
|:sunflower:|`:sunflower:`|
|:hibiscus:|`:hibiscus:`|
|:maple_leaf:|`:maple_leaf:`|
|:leaves:|`:leaves:`|
|:fallen_leaf:|`:fallen_leaf:`|
|:herb:|`:herb:`|
|:mushroom:|`:mushroom:`|
|:cactus:|`:cactus:`|
|:palm_tree:|`:palm_tree:`|
|:evergreen_tree:|`:evergreen_tree:`|
|:deciduous_tree:|`:deciduous_tree:`|
|:chestnut:|`:chestnut:`|
|:seedling:|`:seedling:`|
|:blossom:|`:blossom:`|
|:ear_of_rice:|`:ear_of_rice:`|
|:shell:|`:shell:`|
|:globe_with_meridians:|`:globe_with_meridians:`|
|:sun_with_face:|`:sun_with_face:`|
|:full_moon_with_face:|`:full_moon_with_face:`|
|:new_moon_with_face:|`:new_moon_with_face:`|
|:new_moon:|`:new_moon:`|
|:waxing_crescent_moon:|`:waxing_crescent_moon:`|
|:first_quarter_moon:|`:first_quarter_moon:`|
|:waxing_gibbous_moon:|`:waxing_gibbous_moon:`|
|:full_moon:|`:full_moon:`|
|:waning_gibbous_moon:|`:waning_gibbous_moon:`|
|:last_quarter_moon:|`:last_quarter_moon:`|
|:waning_crescent_moon:|`:waning_crescent_moon:`|
|:last_quarter_moon_with_face:|`:last_quarter_moon_with_face:`|
|:first_quarter_moon_with_face:|`:first_quarter_moon_with_face:`|
|:crescent_moon:|`:crescent_moon:`|
|:earth_africa:|`:earth_africa:`|
|:earth_americas:|`:earth_americas:`|
|:earth_asia:|`:earth_asia:`|
|:volcano:|`:volcano:`|
|:milky_way:|`:milky_way:`|
|:partly_sunny:|`:partly_sunny:`|
|:octocat:|`:octocat:`|
|:squirrel:|`:squirrel:`|

### Objekte
|     |    |
|:---:|:---|
|:bamboo:|`:bamboo:`|
|:gift_heart:|`:gift_heart:`|
|:dolls:|`:dolls:`|
|:school_satchel:|`:school_satchel:`|
|:mortar_board:|`:mortar_board:`|
|:flags:|`:flags:`|
|:fireworks:|`:fireworks:`|
|:sparkler:|`:sparkler:`|
|:wind_chime:|`:wind_chime:`|
|:rice_scene:|`:rice_scene:`|
|:jack_o_lantern:|`:jack_o_lantern:`|
|:ghost:|`:ghost:`|
|:santa:|`:santa:`|
|:christmas_tree:|`:christmas_tree:`|
|:gift:|`:gift:`|
|:bell:|`:bell:`|
|:no_bell:|`:no_bell:`|
|:tanabata_tree:|`:tanabata_tree:`|
|:tada:|`:tada:`|
|:confetti_ball:|`:confetti_ball:`|
|:balloon:|`:balloon:`|
|:crystal_ball:|`:crystal_ball:`|
|:cd:|`:cd:`|
|:dvd:|`:dvd:`|
|:floppy_disk:|`:floppy_disk:`|
|:camera:|`:camera:`|
|:video_camera:|`:video_camera:`|
|:movie_camera:|`:movie_camera:`|
|:computer:|`:computer:`|
|:tv:|`:tv:`|
|:iphone:|`:iphone:`|
|:phone:|`:phone:`|
|:telephone:|`:telephone:`|
|:telephone_receiver:|`:telephone_receiver:`|
|:pager:|`:pager:`|
|:fax:|`:fax:`|
|:minidisc:|`:minidisc:`|
|:vhs:|`:vhs:`|
|:sound:|`:sound:`|
|:speaker:|`:speaker:`|
|:mute:|`:mute:`|
|:loudspeaker:|`:loudspeaker:`|
|:mega:|`:mega:`|
|:hourglass:|`:hourglass:`|
|:hourglass_flowing_sand:|`:hourglass_flowing_sand:`|
|:alarm_clock:|`:alarm_clock:`|
|:watch:|`:watch:`|
|:radio:|`:radio:`|
|:satellite:|`:satellite:`|
|:loop:|`:loop:`|
|:mag:|`:mag:`|
|:mag_right:|`:mag_right:`|
|:unlock:|`:unlock:`|
|:lock:|`:lock:`|
|:lock_with_ink_pen:|`:lock_with_ink_pen:`|
|:closed_lock_with_key:|`:closed_lock_with_key:`|
|:key:|`:key:`|
|:bulb:|`:bulb:`|
|:flashlight:|`:flashlight:`|
|:high_brightness:|`:high_brightness:`|
|:low_brightness:|`:low_brightness:`|
|:electric_plug:|`:electric_plug:`|
|:battery:|`:battery:`|
|:calling:|`:calling:`|
|:email:|`:email:`|
|:mailbox:|`:mailbox:`|
|:postbox:|`:postbox:`|
|:bath:|`:bath:`|
|:bathtub:|`:bathtub:`|
|:shower:|`:shower:`|
|:toilet:|`:toilet:`|
|:wrench:|`:wrench:`|
|:nut_and_bolt:|`:nut_and_bolt:`|
|:hammer:|`:hammer:`|
|:seat:|`:seat:`|
|:moneybag:|`:moneybag:`|
|:yen:|`:yen:`|
|:dollar:|`:dollar:`|
|:pound:|`:pound:`|
|:euro:|`:euro:`|
|:credit_card:|`:credit_card:`|
|:money_with_wings:|`:money_with_wings:`|
|:inbox_tray:|`:inbox_tray:`|
|:outbox_tray:|`:outbox_tray:`|
|:envelope:|`:envelope:`|
|:incoming_envelope:|`:incoming_envelope:`|
|:postal_horn:|`:postal_horn:`|
|:mailbox_closed:|`:mailbox_closed:`|
|:mailbox_with_mail:|`:mailbox_with_mail:`|
|:mailbox_with_no_mail:|`:mailbox_with_no_mail:`|
|:package:|`:package:`|
|:door:|`:door:`|
|:smoking:|`:smoking:`|
|:bomb:|`:bomb:`|
|:gun:|`:gun:`|
|:hocho:|`:hocho:`|
|:pill:|`:pill:`|
|:syringe:|`:syringe:`|
|:page_facing_up:|`:page_facing_up:`|
|:page_with_curl:|`:page_with_curl:`|
|:bookmark_tabs:|`:bookmark_tabs:`|
|:bar_chart:|`:bar_chart:`|
|:chart_with_upwards_trend:|`:chart_with_upwards_trend:`|
|:chart_with_downwards_trend:|`:chart_with_downwards_trend:`|
|:scroll:|`:scroll:`|
|:clipboard:|`:clipboard:`|
|:calendar:|`:calendar:`|
|:date:|`:date:`|
|:card_index:|`:card_index:`|
|:file_folder:|`:file_folder:`|
|:open_file_folder:|`:open_file_folder:`|
|:scissors:|`:scissors:`|
|:pushpin:|`:pushpin:`|
|:paperclip:|`:paperclip:`|
|:black_nib:|`:black_nib:`|
|:pencil2:|`:pencil2:`|
|:straight_ruler:|`:straight_ruler:`|
|:triangular_ruler:|`:triangular_ruler:`|
|:closed_book:|`:closed_book:`|
|:green_book:|`:green_book:`|
|:blue_book:|`:blue_book:`|
|:orange_book:|`:orange_book:`|
|:notebook:|`:notebook:`|
|:notebook_with_decorative_cover:|`:notebook_with_decorative_cover:`|
|:ledger:|`:ledger:`|
|:books:|`:books:`|
|:bookmark:|`:bookmark:`|
|:name_badge:|`:name_badge:`|
|:microscope:|`:microscope:`|
|:telescope:|`:telescope:`|
|:newspaper:|`:newspaper:`|
|:football:|`:football:`|
|:basketball:|`:basketball:`|
|:soccer:|`:soccer:`|
|:baseball:|`:baseball:`|
|:tennis:|`:tennis:`|
|:8ball:|`:8ball:`|
|:rugby_football:|`:rugby_football:`|
|:bowling:|`:bowling:`|
|:golf:|`:golf:`|
|:mountain_bicyclist:|`:mountain_bicyclist:`|
|:bicyclist:|`:bicyclist:`|
|:horse_racing:|`:horse_racing:`|
|:snowboarder:|`:snowboarder:`|
|:swimmer:|`:swimmer:`|
|:surfer:|`:surfer:`|
|:ski:|`:ski:`|
|:spades:|`:spades:`|
|:hearts:|`:hearts:`|
|:clubs:|`:clubs:`|
|:diamonds:|`:diamonds:`|
|:gem:|`:gem:`|
|:ring:|`:ring:`|
|:trophy:|`:trophy:`|
|:musical_score:|`:musical_score:`|
|:musical_keyboard:|`:musical_keyboard:`|
|:violin:|`:violin:`|
|:space_invader:|`:space_invader:`|
|:video_game:|`:video_game:`|
|:black_joker:|`:black_joker:`|
|:flower_playing_cards:|`:flower_playing_cards:`|
|:game_die:|`:game_die:`|
|:dart:|`:dart:`|
|:mahjong:|`:mahjong:`|
|:clapper:|`:clapper:`|
|:memo:|`:memo:`|
|:pencil:|`:pencil:`|
|:book:|`:book:`|
|:art:|`:art:`|
|:microphone:|`:microphone:`|
|:headphones:|`:headphones:`|
|:trumpet:|`:trumpet:`|
|:saxophone:|`:saxophone:`|
|:guitar:|`:guitar:`|
|:shoe:|`:shoe:`|
|:sandal:|`:sandal:`|
|:high_heel:|`:high_heel:`|
|:lipstick:|`:lipstick:`|
|:boot:|`:boot:`|
|:shirt:|`:shirt:`|
|:tshirt:|`:tshirt:`|
|:necktie:|`:necktie:`|
|:womans_clothes:|`:womans_clothes:`|
|:dress:|`:dress:`|
|:running_shirt_with_sash:|`:running_shirt_with_sash:`|
|:jeans:|`:jeans:`|
|:kimono:|`:kimono:`|
|:bikini:|`:bikini:`|
|:ribbon:|`:ribbon:`|
|:tophat:|`:tophat:`|
|:crown:|`:crown:`|
|:womans_hat:|`:womans_hat:`|
|:mans_shoe:|`:mans_shoe:`|
|:closed_umbrella:|`:closed_umbrella:`|
|:briefcase:|`:briefcase:`|
|:handbag:|`:handbag:`|
|:pouch:|`:pouch:`|
|:purse:|`:purse:`|
|:eyeglasses:|`:eyeglasses:`|
|:fishing_pole_and_fish:|`:fishing_pole_and_fish:`|
|:coffee:|`:coffee:`|
|:tea:|`:tea:`|
|:sake:|`:sake:`|
|:baby_bottle:|`:baby_bottle:`|
|:beer:|`:beer:`|
|:beers:|`:beers:`|
|:cocktail:|`:cocktail:`|
|:tropical_drink:|`:tropical_drink:`|
|:wine_glass:|`:wine_glass:`|
|:fork_and_knife:|`:fork_and_knife:`|
|:pizza:|`:pizza:`|
|:hamburger:|`:hamburger:`|
|:fries:|`:fries:`|
|:poultry_leg:|`:poultry_leg:`|
|:meat_on_bone:|`:meat_on_bone:`|
|:spaghetti:|`:spaghetti:`|
|:curry:|`:curry:`|
|:fried_shrimp:|`:fried_shrimp:`|
|:bento:|`:bento:`|
|:sushi:|`:sushi:`|
|:fish_cake:|`:fish_cake:`|
|:rice_ball:|`:rice_ball:`|
|:rice_cracker:|`:rice_cracker:`|
|:rice:|`:rice:`|
|:ramen:|`:ramen:`|
|:stew:|`:stew:`|
|:oden:|`:oden:`|
|:dango:|`:dango:`|
|:egg:|`:egg:`|
|:bread:|`:bread:`|
|:doughnut:|`:doughnut:`|
|:custard:|`:custard:`|
|:icecream:|`:icecream:`|
|:ice_cream:|`:ice_cream:`|
|:shaved_ice:|`:shaved_ice:`|
|:birthday:|`:birthday:`|
|:cake:|`:cake:`|
|:cookie:|`:cookie:`|
|:chocolate_bar:|`:chocolate_bar:`|
|:candy:|`:candy:`|
|:lollipop:|`:lollipop:`|
|:honey_pot:|`:honey_pot:`|
|:apple:|`:apple:`|
|:green_apple:|`:green_apple:`|
|:tangerine:|`:tangerine:`|
|:lemon:|`:lemon:`|
|:cherries:|`:cherries:`|
|:grapes:|`:grapes:`|
|:watermelon:|`:watermelon:`|
|:strawberry:|`:strawberry:`|
|:peach:|`:peach:`|
|:melon:|`:melon:`|
|:banana:|`:banana:`|
|:pear:|`:pear:`|
|:pineapple:|`:pineapple:`|
|:sweet_potato:|`:sweet_potato:`|
|:eggplant:|`:eggplant:`|
|:tomato:|`:tomato:`|
|:corn:|`:corn:`|

### Places
|     |    |
|:---:|:---|
|:house:|`:house:`|
|:house_with_garden:|`:house_with_garden:`|
|:school:|`:school:`|
|:office:|`:office:`|
|:post_office:|`:post_office:`|
|:hospital:|`:hospital:`|
|:bank:|`:bank:`|
|:convenience_store:|`:convenience_store:`|
|:love_hotel:|`:love_hotel:`|
|:hotel:|`:hotel:`|
|:wedding:|`:wedding:`|
|:church:|`:church:`|
|:department_store:|`:department_store:`|
|:european_post_office:|`:european_post_office:`|
|:city_sunrise:|`:city_sunrise:`|
|:city_sunset:|`:city_sunset:`|
|:japanese_castle:|`:japanese_castle:`|
|:european_castle:|`:european_castle:`|
|:tent:|`:tent:`|
|:factory:|`:factory:`|
|:tokyo_tower:|`:tokyo_tower:`|
|:japan:|`:japan:`|
|:mount_fuji:|`:mount_fuji:`|
|:sunrise_over_mountains:|`:sunrise_over_mountains:`|
|:sunrise:|`:sunrise:`|
|:stars:|`:stars:`|
|:statue_of_liberty:|`:statue_of_liberty:`|
|:bridge_at_night:|`:bridge_at_night:`|
|:carousel_horse:|`:carousel_horse:`|
|:rainbow:|`:rainbow:`|
|:ferris_wheel:|`:ferris_wheel:`|
|:fountain:|`:fountain:`|
|:roller_coaster:|`:roller_coaster:`|
|:ship:|`:ship:`|
|:speedboat:|`:speedboat:`|
|:boat:|`:boat:`|
|:sailboat:|`:sailboat:`|
|:rowboat:|`:rowboat:`|
|:anchor:|`:anchor:`|
|:rocket:|`:rocket:`|
|:airplane:|`:airplane:`|
|:helicopter:|`:helicopter:`|
|:steam_locomotive:|`:steam_locomotive:`|
|:tram:|`:tram:`|
|:mountain_railway:|`:mountain_railway:`|
|:bike:|`:bike:`|
|:aerial_tramway:|`:aerial_tramway:`|
|:suspension_railway:|`:suspension_railway:`|
|:mountain_cableway:|`:mountain_cableway:`|
|:tractor:|`:tractor:`|
|:blue_car:|`:blue_car:`|
|:oncoming_automobile:|`:oncoming_automobile:`|
|:car:|`:car:`|
|:red_car:|`:red_car:`|
|:taxi:|`:taxi:`|
|:oncoming_taxi:|`:oncoming_taxi:`|
|:articulated_lorry:|`:articulated_lorry:`|
|:bus:|`:bus:`|
|:oncoming_bus:|`:oncoming_bus:`|
|:rotating_light:|`:rotating_light:`|
|:police_car:|`:police_car:`|
|:oncoming_police_car:|`:oncoming_police_car:`|
|:fire_engine:|`:fire_engine:`|
|:ambulance:|`:ambulance:`|
|:minibus:|`:minibus:`|
|:truck:|`:truck:`|
|:train:|`:train:`|
|:station:|`:station:`|
|:train2:|`:train2:`|
|:bullettrain_front:|`:bullettrain_front:`|
|:bullettrain_side:|`:bullettrain_side:`|
|:light_rail:|`:light_rail:`|
|:monorail:|`:monorail:`|
|:railway_car:|`:railway_car:`|
|:trolleybus:|`:trolleybus:`|
|:ticket:|`:ticket:`|
|:fuelpump:|`:fuelpump:`|
|:vertical_traffic_light:|`:vertical_traffic_light:`|
|:traffic_light:|`:traffic_light:`|
|:warning:|`:warning:`|
|:construction:|`:construction:`|
|:beginner:|`:beginner:`|
|:atm:|`:atm:`|
|:slot_machine:|`:slot_machine:`|
|:busstop:|`:busstop:`|
|:barber:|`:barber:`|
|:hotsprings:|`:hotsprings:`|
|:checkered_flag:|`:checkered_flag:`|
|:crossed_flags:|`:crossed_flags:`|
|:izakaya_lantern:|`:izakaya_lantern:`|
|:moyai:|`:moyai:`|
|:circus_tent:|`:circus_tent:`|
|:performing_arts:|`:performing_arts:`|
|:round_pushpin:|`:round_pushpin:`|
|:triangular_flag_on_post:|`:triangular_flag_on_post:`|
|:jp:|`:jp:`|
|:kr:|`:kr:`|
|:cn:|`:cn:`|
|:us:|`:us:`|
|:fr:|`:fr:`|
|:es:|`:es:`|
|:it:|`:it:`|
|:ru:|`:ru:`|
|:gb:|`:gb:`|
|:uk:|`:uk:`|
|:de:|`:de:`|

### Symbole
|     |    |
|:---:|:---|
|:one:|`:one:`|
|:two:|`:two:`|
|:three:|`:three:`|
|:four:|`:four:`|
|:five:|`:five:`|
|:six:|`:six:`|
|:seven:|`:seven:`|
|:eight:|`:eight:`|
|:nine:|`:nine:`|
|:keycap_ten:|`:keycap_ten:`|
|:1234:|`:1234:`|
|:zero:|`:zero:`|
|:hash:|`:hash:`|
|:symbols:|`:symbols:`|
|:arrow_backward:|`:arrow_backward:`|
|:arrow_down:|`:arrow_down:`|
|:arrow_forward:|`:arrow_forward:`|
|:arrow_left:|`:arrow_left:`|
|:capital_abcd:|`:capital_abcd:`|
|:abcd:|`:abcd:`|
|:abc:|`:abc:`|
|:arrow_lower_left:|`:arrow_lower_left:`|
|:arrow_lower_right:|`:arrow_lower_right:`|
|:arrow_right:|`:arrow_right:`|
|:arrow_up:|`:arrow_up:`|
|:arrow_upper_left:|`:arrow_upper_left:`|
|:arrow_upper_right:|`:arrow_upper_right:`|
|:arrow_double_down:|`:arrow_double_down:`|
|:arrow_double_up:|`:arrow_double_up:`|
|:arrow_down_small:|`:arrow_down_small:`|
|:arrow_heading_down:|`:arrow_heading_down:`|
|:arrow_heading_up:|`:arrow_heading_up:`|
|:leftwards_arrow_with_hook:|`:leftwards_arrow_with_hook:`|
|:arrow_right_hook:|`:arrow_right_hook:`|
|:left_right_arrow:|`:left_right_arrow:`|
|:arrow_up_down:|`:arrow_up_down:`|
|:arrow_up_small:|`:arrow_up_small:`|
|:arrows_clockwise:|`:arrows_clockwise:`|
|:arrows_counterclockwise:|`:arrows_counterclockwise:`|
|:rewind:|`:rewind:`|
|:fast_forward:|`:fast_forward:`|
|:information_source:|`:information_source:`|
|:ok:|`:ok:`|
|:twisted_rightwards_arrows:|`:twisted_rightwards_arrows:`|
|:repeat:|`:repeat:`|
|:repeat_one:|`:repeat_one:`|
|:new:|`:new:`|
|:top:|`:top:`|
|:up:|`:up:`|
|:cool:|`:cool:`|
|:free:|`:free:`|
|:ng:|`:ng:`|
|:cinema:|`:cinema:`|
|:koko:|`:koko:`|
|:signal_strength:|`:signal_strength:`|
|:u5272:|`:u5272:`|
|:u5408:|`:u5408:`|
|:u55b6:|`:u55b6:`|
|:u6307:|`:u6307:`|
|:u6708:|`:u6708:`|
|:u6709:|`:u6709:`|
|:u6e80:|`:u6e80:`|
|:u7121:|`:u7121:`|
|:u7533:|`:u7533:`|
|:u7a7a:|`:u7a7a:`|
|:u7981:|`:u7981:`|
|:sa:|`:sa:`|
|:restroom:|`:restroom:`|
|:mens:|`:mens:`|
|:womens:|`:womens:`|
|:baby_symbol:|`:baby_symbol:`|
|:no_smoking:|`:no_smoking:`|
|:parking:|`:parking:`|
|:wheelchair:|`:wheelchair:`|
|:metro:|`:metro:`|
|:baggage_claim:|`:baggage_claim:`|
|:accept:|`:accept:`|
|:wc:|`:wc:`|
|:potable_water:|`:potable_water:`|
|:put_litter_in_its_place:|`:put_litter_in_its_place:`|
|:secret:|`:secret:`|
|:congratulations:|`:congratulations:`|
|:m:|`:m:`|
|:passport_control:|`:passport_control:`|
|:left_luggage:|`:left_luggage:`|
|:customs:|`:customs:`|
|:ideograph_advantage:|`:ideograph_advantage:`|
|:cl:|`:cl:`|
|:sos:|`:sos:`|
|:id:|`:id:`|
|:no_entry_sign:|`:no_entry_sign:`|
|:underage:|`:underage:`|
|:no_mobile_phones:|`:no_mobile_phones:`|
|:do_not_litter:|`:do_not_litter:`|
|:no_bicycles:|`:no_bicycles:`|
|:no_pedestrians:|`:no_pedestrians:`|
|:children_crossing:|`:children_crossing:`|
|:no_entry:|`:no_entry:`|
|:eight_spoked_asterisk:|`:eight_spoked_asterisk:`|
|:sparkle:|`:sparkle:`|
|:eight_pointed_black_star:|`:eight_pointed_black_star:`|
|:heart_decoration:|`:heart_decoration:`|
|:vs:|`:vs:`|
|:vibration_mode:|`:vibration_mode:`|
|:mobile_phone_off:|`:mobile_phone_off:`|
|:chart:|`:chart:`|
|:currency_exchange:|`:currency_exchange:`|
|:aries:|`:aries:`|
|:taurus:|`:taurus:`|
|:gemini:|`:gemini:`|
|:cancer:|`:cancer:`|
|:leo:|`:leo:`|
|:virgo:|`:virgo:`|
|:libra:|`:libra:`|
|:scorpius:|`:scorpius:`|
|:sagittarius:|`:sagittarius:`|
|:capricorn:|`:capricorn:`|
|:aquarius:|`:aquarius:`|
|:pisces:|`:pisces:`|
|:ophiuchus:|`:ophiuchus:`|
|:six_pointed_star:|`:six_pointed_star:`|
|:negative_squared_cross_mark:|`:negative_squared_cross_mark:`|
|:a:|`:a:`|
|:b:|`:b:`|
|:ab:|`:ab:`|
|:o2:|`:o2:`|
|:diamond_shape_with_a_dot_inside:|`:diamond_shape_with_a_dot_inside:`|
|:recycle:|`:recycle:`|
|:end:|`:end:`|
|:back:|`:back:`|
|:on:|`:on:`|
|:soon:|`:soon:`|
|:clock1:|`:clock1:`|
|:clock130:|`:clock130:`|
|:clock10:|`:clock10:`|
|:clock1030:|`:clock1030:`|
|:clock11:|`:clock11:`|
|:clock1130:|`:clock1130:`|
|:clock12:|`:clock12:`|
|:clock1230:|`:clock1230:`|
|:clock2:|`:clock2:`|
|:clock230:|`:clock230:`|
|:clock3:|`:clock3:`|
|:clock330:|`:clock330:`|
|:clock4:|`:clock4:`|
|:clock430:|`:clock430:`|
|:clock5:|`:clock5:`|
|:clock530:|`:clock530:`|
|:clock6:|`:clock6:`|
|:clock630:|`:clock630:`|
|:clock7:|`:clock7:`|
|:clock730:|`:clock730:`|
|:clock8:|`:clock8:`|
|:clock830:|`:clock830:`|
|:clock9:|`:clock9:`|
|:clock930:|`:clock930:`|
|:heavy_dollar_sign:|`:heavy_dollar_sign:`|
|:copyright:|`:copyright:`|
|:registered:|`:registered:`|
|:tm:|`:tm:`|
|:x:|`:x:`|
|:heavy_exclamation_mark:|`:heavy_exclamation_mark:`|
|:bangbang:|`:bangbang:`|
|:interrobang:|`:interrobang:`|
|:o:|`:o:`|
|:heavy_multiplication_x:|`:heavy_multiplication_x:`|
|:heavy_plus_sign:|`:heavy_plus_sign:`|
|:heavy_minus_sign:|`:heavy_minus_sign:`|
|:heavy_division_sign:|`:heavy_division_sign:`|
|:white_flower:|`:white_flower:`|
|:100:|`:100:`|
|:heavy_check_mark:|`:heavy_check_mark:`|
|:ballot_box_with_check:|`:ballot_box_with_check:`|
|:radio_button:|`:radio_button:`|
|:link:|`:link:`|
|:curly_loop:|`:curly_loop:`|
|:wavy_dash:|`:wavy_dash:`|
|:part_alternation_mark:|`:part_alternation_mark:`|
|:trident:|`:trident:`|
|:black_small_square:|`:black_small_square:`|
|:white_small_square:|`:white_small_square:`|
|:black_medium_small_square:|`:black_medium_small_square:`|
|:white_medium_small_square:|`:white_medium_small_square:`|
|:black_medium_square:|`:black_medium_square:`|
|:white_medium_square:|`:white_medium_square:`|
|:black_large_square:|`:black_large_square:`|
|:white_large_square:|`:white_large_square:`|
|:white_check_mark:|`:white_check_mark:`|
|:black_square_button:|`:black_square_button:`|
|:white_square_button:|`:white_square_button:`|
|:black_circle:|`:black_circle:`|
|:white_circle:|`:white_circle:`|
|:red_circle:|`:red_circle:`|
|:large_blue_circle:|`:large_blue_circle:`|
|:large_blue_diamond:|`:large_blue_diamond:`|
|:large_orange_diamond:|`:large_orange_diamond:`|
|:small_blue_diamond:|`:small_blue_diamond:`|
|:small_orange_diamond:|`:small_orange_diamond:`|
|:small_red_triangle:|`:small_red_triangle:`|
|:small_red_triangle_down:|`:small_red_triangle_down:`|
|:shipit:|`:shipit:`|

<h3 id="lizenz">Lizenz</h3>

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
