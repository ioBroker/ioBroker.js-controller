# Idee von ioBroker
Die Grundidee von ioBroker ist es, eine Plattform anzubieten, auf der verschiedene IoT-Systeme zusammengefasst werden können um diese über ** *eine* ** Oberfläche zu steuern oder zu visualisieren.

![Broker](img/marketing-buzz.png)

Dazu bietet ioBroker verschiedene so genannte Adapter an, die sich z.B. mit dem Gateway des jeweiligen Systems verbinden. Die Zustände der in dem jeweiligen System angeschlossenen Geräte werden von diesen Adaptern bidirektional ausgewertet und in einer gemeinsamen Datenbank verwaltet, so dass mit einfachen Mitteln nur noch die Zustände dieser Datenbank bearbeitet werden müssen.

Mit weiteren Adaptern aus der Gruppe der Logik kann dann auf Änderungen dieser Zustände reagiert und ebenso Zustände, die auch von einem anderen Adapter kommen geändert werden.

Es können nicht nur komplette IoT-Systeme eingebunden werden, sondern auch andere Datenquellen. Dabei ist es ebenfalls möglich Daten nicht nur aus bereitgestellten Adaptern, z.B. Benzinpreise von dem Tankerkönig-Adapter zu verwerten, es ist auch möglich per Javascript oder mit dem Parseradapter eigene Datenpunkte zu erzeugen und mit Daten zu füllen.