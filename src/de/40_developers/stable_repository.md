![](Stable repository)

Mit der Version js-controller 0.17.2 ist auch die Möglichkeit gekommen zwei Repositories zu haben:
- latest: mit den Adapter Versionen von npm
- stable: mit geprüften Adapter Versionen.

Mit Admin 1.7.3 werden die Repositories auch automatisch bei allen Systemen hinzugefügt und **stable** als default gesetzt.

Die fortgeschrittene Anwender können latest Repository verwenden, weil da sind immer noch lauffähige Versionen sind, nur nicht so gut ausgetestet. Das müssen nur die Anwender machen, die wissen, wie man mit npm eine beliebige Adapter version installieren kann.

**Stable** Repository wird seltener als **latest** sich updaten und dass müssen die Adapter-Entwickler antriggern.
Die Idee dabei ist, dass die Entwickler erst eine Version einfach auch npm puschen. Die Version wird früher ein mal am Tag ins latest übernommen. 

Danach wenn die Entwickler von mehreren Anwender ein positiven Feedback haben, dann sollten die ein Pull Request gegen stable repository machen: [https://github.com/ioBroker/ioBroker.repositories/blob/master/sources-dist-stable.json](https://github.com/ioBroker/ioBroker.repositories/blob/master/sources-dist-stable.json)

Ich werde dann das einpflegen.

Wenn man ioBroker.repository auscheckt, dann kann man auch mit 
[code]npm run update AdapterName[/code]
die npm Version automatisch in stable eintragen.