![](Stable repository)

## Available Repositories

Mit der Version 0.17.2 des js-controller wurden zwei Repositories eingeführt:
- **latest**: mit den aktuellsten Adapter Versionen von npm
- **stable**: mit geprüften und stabilen Adapter Versionen

Mit Admin 1.7.3 werden die Repositories auch automatisch bei allen Systemen hinzugefügt und **stable** als default gesetzt.

Eine Adapter-Version wird nach Tests und Feedback mehrerer Nutzer durch den Adapter-Entwickler im  **stable** Repository aktualisiert. Daher sind dort gegebenenfalls ältere, aber getestete Adapterversionen enthalten.

Fortgeschrittene Anwender können das **latest** Repository verwenden, da die Versionen dort ebenso lauffähig sind, nur nicht so gut ausgetestet. Über den Admin oder Kommandozeile kann jederzeit eine frühere Adapter-Version installiert werden, falls die aktuellste doch Probleme bringt. Diese Probleme bitte unbedingt an den Adapter-Entwickler im GitHub oder im Forum melden!
??Das müssen nur die Anwender machen, die wissen, wie man mit npm eine beliebige Adapter version installieren kann.

## Für Entwickler ...

Entwickler veröffentlichen Ihre neuen Adapter-Versionen weiterhin auf npm und diese werden einmal täglich ins **latest** Repository übernommen.

Wenn die Entwickler danach von mehreren Anwendern ein positiven Feedback haben, kann die Neue Version mittels einem Pull Request gegen das **stable** repository ([https://github.com/ioBroker/ioBroker.repositories/blob/master/sources-dist-stable.json](https://github.com/ioBroker/ioBroker.repositories/blob/master/sources-dist-stable.json)) aktualisiert werden.

Wenn man das GitHub-Projekt ioBroker.repository forkt und lokal auscheckt, dann kann man auch mit

[code]npm run update AdapterName[/code]

die Version ohne dem manuellem editieren einer Textdatei komfortabel aktualisieren. Danach Pull-Request einreichen, dann wird die neue Version übernommen.
