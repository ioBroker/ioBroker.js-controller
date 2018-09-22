---
title:       "Grundlagen"
lastChanged: "14.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/basics/README.md"
---

# Grundlagen {docsify-ignore-all}

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc),
   damit die Änderungen einfacher übernommen werden können.

@@@   
Primär wird in diesem Abschnitt der Dokumentation das "WAS ist es"
beschrieben, nicht "WIE es geht".  

Der Anwender soll nach dem Lesen der Grundlagen die verschiedenen
ioBroker-spezifischen Begriffe rudimentär verstehen und zuordnen können.  

Ziel ist kurz und knackig erklären, 2-4 Zeilen, ggf. wird das ganze 
später als eine Long-Scroller-Seite umgebaut.

In den Grundlagenartikeln sollte auf die jeweils dazugehörenden
Detailbeschreibungen verwiesen werden.   
@@@

# Begriffserklärung
Um den Einstieg leicht und die weitere Hilfe verständlicher zu machen sind hier die wichtigsten Begriffe, die im und um den ioBroker auftreten erläutert.

* `Host`: das Gerät, auf dem ioBroker installiert ist
* `Adapter`: ein Modul beziehungsweise PlugIn für den ioBroker, um beispielsweise mit Hardware zu kommunizieren
  * kann nicht gestartet werden
  * pro Host kann es jeden Adapter nur einmal geben
* `Instanz`: ausführbares Exemplar eines Adapters
  * führt den vom Adapter bereitgestellten Code aus
  * kann gestartet und gestoppt werden
  * kann Einstellungen haben
  * Adapter muss installiert sein, um Instanzen vom Adapter zu haben
* `Objekt`: Feld in dem Daten gespeichert werden können
  * die meisten Instanzen legen einen `channel` an
  * ein `channel` ist ein Objekt, welches als Ordner fungiert
* `Aufzählung`: enthält beispielsweise eine Liste an Räumen
* `Log`: Protokoll dessen, welche Fehler aufgelaufen sind
  * filterbar nach schwere des Ereignisses, Instanz und weiterem
* `Ereignisse`: Liste aller Änderungen an Objekten
