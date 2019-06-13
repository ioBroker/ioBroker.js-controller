---
title:       "Styleguide Dokumentation"
lastChanged: "13.06.2019"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/community/styleguidedoc.md"
---

# Style Guide Dokumentation

* Die Dokumentation wird mit Hilfe der Sprache "Markdown" erstellt.
* Datei- und Ordnernamen werden mit Kleinbuchstaben geschrieben.
  Erlaubt sind die Zeichen `a-z`, `0-9`, der Unterstrich `_` sowie der
  Dezimalpunkt `.`
* Dokumente sollen einen Zeilenumbruch bei 80 Zeichen haben.
* Vorzugsweise erfolgt die Textformatierung wie in der Datei `.editorconfig`
  beschrieben.
      * Ein [Plugin][] zur automatischen Anwendung dieser Regeln ist für
        verschiedene Editoren erhältlich.

* Für deutsche Texte wird die Einhaltung der neuen deutschen Rechtschreibung
  bevorzugt.
* In Referenzdokumentationen ist die Verwendung von Personalpronomen (z.B.
  "ich", "du", "wir") zu vermeiden.
* Verwende geschlechtsneutrale Pronomen und mehrzahlige Hauptwörter.
    * In Ordnung: "sie (mehrere)", "ihr (Besitz)", "Personen",
      "Leute", "Entwickler"
    * Nicht in Ordnung: "seine", "ihre", "er", "sie (Frau)", "Jungs", "Mädels"

* Werden Klammerelemente verwendet (alle Klammerformen und
  Anführungszeichen), werden Satzzeichen wie folgt gesetzt:
    * Innerhalb der Klammer, wenn das Klammerelement einen kompletten
    Satz enthält (Subjekt, Prädikat, Objekt).
    * Außerhalb der Klammer, wenn das Klammerelement nur einen Teilsatz
    enthält.

* Dokumente beginnen immer mit einer Überschrift in der Ebene H1.
* Links werden nicht inline platziert (z.B. mit `[a link](http://example.com)`),
  sondern mit Hilfe von inline `[a link][]` und
  `[a link]: https://a.link/to/know` an das Dokumentenende gestellt.
* Wenn Gedankenstriche verwendet werden, benutzt man die kurze Schreibweise
  mit dem Minuszeichen und nicht "—" oder `Option+Shift+"-"` in OSX.
* Zusätzliche Inhalte:
      * Dokumente wie Binärdateien, Bilder, Video- oder Audio-Aufnahmen werden
      im Ordner `media` abgelegt.
      * Die Einbindung der Medien in den Text erfolgt für allgemeine Dateien
      mittels `[Medienbegriff](media/{dateiname})` und für Bilder mittels
      `![Medienbegriff](media/{dateiname})`.
      * Abbildungen weden vorzugsweise im Format SVG abgelegt. Wenn SVG
      nicht möglich ist, dann als jpg oder png-Datei. Bitte ein Auge auf die
      Dateigröße haben.

* Für Quelltextabschnitte gilt folgendes:
      * Je nach Quellcodesprache ist ein entsprechendes Markup zu wählen. Zum
        Beispiel ` ```js`  für JavaScript.
      * Ein Quelltext kann, muss aber nicht vollständig sein. Quelltextblöcke
        stellen Beispiele zur Verdeutlichung des jeweis gerade beschriebenen
        Standpunkts dar. Es müssen also keine vollständig lauffähigen Programme
        geliefert werden. Wenn dennoch ein vollständig lauffähiges Programm
        bereitgestellt werden soll, erfolgt das als Mediendatei im Ordner
        `media/{code_beispieldatei}` mit einer entsprechender Verknüpfung in
        der Dokumentation.

* Falls Unterstriche, Hochkommata, Sternchen oder Backslashes verwendet
  werden, sind die richtigen Escape-Zeichen zu setzten:
  `\_`, `\*`, `\\` und ``\` `` anstelle von `_`, `*`, `\` und `` ` ``.
* Um einen Hinweis besonders hervorzuheben, sind die folgenden Richtlinien
  zu beachten:
     - Der "Hinweis:"-Bezeichner ist in italic zu setzen, also als `*Hinweis*:`.
     - Nach dem "Hinweis:"-Bezeichner ist mit einem Großbuchstaben fortzufahren.
     - Der Hinweis ist an den Anfang eines neuen Absatzes zu setzen, damit er besser sichtbar ist.

* Für Adapter-Dokumentionen gibt es einen eigenen [Style Guide][].

[Plugin]: http://editorconfig.org/#download
[Style Guide]: ../dev/adapterdocstyleguide.md
