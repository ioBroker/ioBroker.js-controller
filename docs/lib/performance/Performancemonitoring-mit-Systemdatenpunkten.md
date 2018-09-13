# Performancemonitoring

Ansatzpunkt für eine Performanceanalyse innerhalb von ioBroker ist die Objektauflistung im Admin. Dort werden Systeminformationen über den oder die Hosts (ioBroker ist Multihost-fähig) und zu den einzelnen Adaptern bereitgestellt. An diese Informationen gelangt man, indem man die Objektauflistung in den Expertenmodus umschaltet:


[attachment=6]2018-07-14 19_08_43-objects - ioBroker.png[/attachment]


[b][u]Performancewerte von Hosts[/u][/b]

Ein Host ist im ioBroker-Sprachgebrauch ein Rechner, der einen ioBroker js-Controller-Prozess ausführt. Das können in einer Multihost-Umgebung zur Verteilung der Last eben auch gerne mehrere Rechner sein. Sogar das jeweilig eingesetzte Betriebssystem darf sich unterscheiden. EIne hübsche Aufgabe für z.B. Raspberry Pi-Clusterstacks, um dort mit dem 1GB RAM Hardwarelimit klarzukommen.  


[attachment=5]2018-07-15 17_35_07-(2).png[/attachment][color=#808080](Jeff Geerling, youtube)[/color]

Der js-Controller der ioBrokers koordiniert das Starten und Stoppen der Adapter und führt im Hintergrund weitere Systemmanagementaufgaben aus. Im Admin sind zum jeweiligen Hostrechner sowie zum js-Controller unter der ID [i]'system.host.<Name_des_Hostrechners>'[/i]  Performance-Werte zu finden. 

Hier eine Auflistung der einzelnen Kennzahlen und ihre Bedeutung:

Kennzahl  / Datentyp / Einheit 

[list]  
[*] [b]alive[/b] / Logik / keine
[list]Zeigt an, ob der ioBroker js-Controller auf dem Host aktiv ist[/list]
[*] [b]diskFree[/b] / Zahl / MiB
[list]Freier Speicherplatz auf dem logischen Laufwerks, auf dem ioBroker installiert ist 
bi = binäres Vielfaches (1 MB = 1.000.000 Byte) < (1 MiB = 1.048.576 Byte = 1 × 1024 × 1024 Byte)[/list]
[*] [b]diskSize[/b] / Zahl / MiB
[list]Gesamtgröße des logischen Datenträgers, auf dem ioBroker installiert ist[/list]
[*] [b]diskWarning[/b] / Zahl / % 
[list]Hier kann man einen Prozentwert eintragen. Im Admin wird eine Warnung angezeigt, wenn der freie Platz auf dem Datenträger diesen Wert unterschreitet (z.B. 20). Das ist vor allem sinnvoll, wenn der History-Adapter aktiv ist.[attachment=4]2018-07-15 18_44_47-intro - ioBroker.png[/attachment][/list]
[*] [b]freemem[/b] / Zahl / MB
[list]Gesamter verfügbarer RAM-Systemspeicher des Hosts[/list]
[*] [b]inputCount[/b] / Zahl / /15s
[list]Anzahl an Veränderungen bei den State-Werten. Ein Eingangsevent kann z.B. vom Anlegen oder Setzen eines Wertes ausgelöst werden[/list]
[*] [b]load[/b] / Zahl / %
[list]Gesamtsystemlast der CPU, gemittelt über jeweils eine Sekunde. Nicht wundern, unter Windows ist dieser Wert immer 0[/list]
[*] [b]mem[/b] / Zahl / %
[list]Speichernutzung. Verhältnis zwischen freiem Speicher und Gesamtsystemspeicher[/list]
[*] [b]memHeapTotal[/b] / Zahl / MB
[list]Größe des vom js-Controller reservierten Heap-Speichers[/list]
[*] [b]memHeapUsed[/b] / Zahl / MB
[list]Größe des vom js-Controller genutzen Heap-Speichers[/list]
[*] [b]memRss[/b] / Zahl / MB
[list]Resident Set, gesamte Größe des vom js-Controller im RAM genutzen Speichers[/list]
[*] [b]outputCount[/b] / Zahl / /15s
[list]Ausgangs-Events umfassen Aktionen wie Wertevergleich, schreiben eines Wertes in die States-DB, Events aufgrund von Subscriptions oder das Logging eines Adapters um z.B. Aussagen über .connected- oder .alive-States zu bekommen. So kommen auch die 8 Events zustande, die typischerweise beim Ereignisausgangswert in der Instanzen-Liste stehen.[/list]
[*] [b]uptime[/b] / Zahl / s
[list]Laufzeit des ioBrokers auf diesen Host seit dem letzten Neustart[/list]
[/list]


Das folgende Schaubild zeigt symbolisch, wie Heap, Code und Stack zur Gesamtspeichernutzung [b]memRss[/b] eines nodejs-Prozesses beitragen:


[attachment=3]Unbenannt-5.png[/attachment]


Wenn der Master-js-Controller selbst die Objekt- und State-Datenbank für das Gesamtsystem bereitstellt, kann man sehr schön mit dieser Kennzahl den Unterschied zwischen 300 und 3000 ioBroker-Objekte am Speicherverbrauch feststellen. So schwankt z.B. auf meinem Windows-System dieser Wert bei 3500 Objekten und 2700 States zwischen 75 und 128MB. Die in nodejs integrierte Garbage Collection lässt grüßen. Nutze ich hingegen Redis als State-Datenbank, geht der Speicherverbrauch für den js-Controller auf 50MB zurück. (Jetzt braucht Redis 25MB zusätzlich = wieder 75MB ;))

Übersteigt die Anzahl der Stateänderungen die Verarbeitskapazität von abhängien Eventkonsumenten (z.B. Javascript mit on:-Triggern), baut sich in den in-Memory-Datenbanken eine Warteschlange auf. Dies kann man am Speicherverbrauch des js-Controllers erkennen. Sobald die Systemlast wieder fällt und den Eventkonsumenten zur Verabeitung der ausstehenden Wertänderungen ausreichend Zeit gegeben wird, kehrt der Wert von memRss wieder auf den Ursprungswert zurück:


[attachment=2]2018-07-15 20_26_08.png[/attachment]


Wie so häufig in diesem Umfeld kann man anhand von fixen Wertangaben keine exakten Aussagen über die Ursache von Fehlern machen. Was jedoch häufig hilft, ist die Beobachtung eines fehlerfrei funktionierenden Systems (=Referenzwerte) und dann der Vergleich [b]des gleichen Systems[/b] unter Fehlerbedingungen. Zusätzlich ist es sehr nützlich, wenn man den ein oder anderen Datenpunkt in der Histore mit aufzuzeichnet, um z.B. Tendenzen und Ausreißer festzuhalten.


[b][u]Performancewerte von Adaptern[/u][/b]

Jeder Adapter hat seinen eigenen Performancekennzahlen. Sie sind jeweils unter der ID [i]'system.adapter.<Name_des_Adapters>.<Instanz>'[/i] abgelegt und unterscheiden sich etwas von denen des Hosts.

Kennzahl  / Datentyp / Einheit 

[list]  
[*] [b]alive[/b] / Logik / keine
[list]Zeigt an, ob der Adapter aktiv geschaltet ist[/list]
[*] [b]connected[/b] / Logik / keine
[list]Gibt Auskunft, ob sich der Adapter innerhalb der letzten 30 Sekunden gemeldet hat[/list]
[*] [b]inputCount[/b] / Zahl / /15s
[list]Anzahl an Veränderungen bei den State-Werten. Ein Eingangsevent kann z.B. vom Anlegen oder Setzen eines Wertes ausgelöst werden[/list]
[*] [b]memHeapTotal[/b] / Zahl / MB
[list]Größe des vom Adapter reservierten Heap-Speichers[/list]
[*] [b]memHeapUsed[/b] / Zahl / MB
[list]Größe des vom Adapter genutzen Heap-Speichers[/list]
[*] [b]memRss[/b] / Zahl / MB
[list]Resident Set, gesamte Größe des vom Adapter im RAM genutzen Speichers[/list]
[*] [b]inputCount[/b] / Zahl / /15s
[list]Anzahl an Veränderungen der State-Werte. Ein Eingangsevent kann z.B. vom Anlegen oder dem Setzen eines Wertes ausgelöst werden[/list]
[*] [b]outputCount[/b] / Zahl / /15s
[list]Ausgangs-Events umfassen Aktionen wie Wertevergleich, schreiben eines Wertes in die States-DB, Events aufgrund von Subscriptions oder das Logging eines Adapters um z.B. Aussagen über .connected- oder .alive-States zu bekommen. So kommen auch die 8 Events zustande, die typischerweise beim Ereignisausgangswert in der Instanzen-Liste stehen.[/list]
[*] [b]uptime[/b] / Zahl / s
[list]Laufzeit des Adapters seit Adapterstart[/list]
[/list]


Wenn zum Beispiel der Javascript-Adapter urplötzlich nach einer Scriptänderung von 100 [b]inputCount[/b]-Events auf mehrere tausend hochschnellt, besteht die starke Vermutung, dass man eine Triggerschleife, d.h. ein Ringbezug in sein Script eingebaut hat. 

Sinnvoll ist auch die Betrachtung von [b]memRss[/b], um z.B. Speicherlecks durch Scripte oder in Adaptern zu erkennen. Mit [b]alive[/b] und [b]connected[/b] kann man sehr schön in vis den Status des Adapters visualisieren beziehungsweise die Anzeige von falschen Daten unterdrücken, wenn der Adapter keine neue Werte liefern kann.


[u][b]Ausblick und Frage[/b][/u]

Da zeige ich einfach mal ein Bild als Blick in die Zukunft (und in meine Entwicklungumgebung):


[attachment=1]2018-07-14 19_08_43-o1.png[/attachment]


Bei den Adaptern fehlt mir die Anzeige der durch den individuellen Adapter verursachen CPU-Last [b]cpu[/b]. Immerhin will man auch ohne ressourcenhungriger Installation weiterer Monitoring-Adapter wissen, wer im System gerade der Übeltäter ist. Nachdem nodejs single-threated ist, bezieht sich hier die Anzeige auf einen CPU-Core. Mehr als 100% geht hier nicht. 

Da hilft auch der Einsatz von CPUs mit mehreren Cores nicht, wenn ein Adapter hier ständig hohe Werte anzeigt. Einzig eine schnellere CPU (im Volksmund höherer Takt), eine Optimierung des Programmcodes oder die Aufteilung der Last auf mehrere Adapter (sofern möglich) sind in diesem Fall zielführend. 

Über die Kennzahl [b]cputime[/b] lässt dich die Summe der Prozessorzeit, die vom Adapter seit Start genutzt wurde, auswerten. Sie gibt Aufschluss über die Häufigkeit oder Intensität (Stichwort rechenintensiv), mit der ein Programm den Prozessor beansprucht. Diese Summe ist praktisch immer niedriger als die gesamte Laufzeit des Adapters [b]uptime[/b], da der Adapter selbst bei intensiver Nutzung kaum pausenlos Befehle an den Prozessor sendet. 


Hier sieht man schön, wie die verschiedenen Kennzahlen zusammspielen und wie die Reaktion des Javascript-Adapters auf eine plötzliche Anforderungswelle in Flot aussieht:


[attachment=0]2018-07-15 21_22_11-Flot Edit.png[/attachment]


Übrigens war hier der Javascript-Adapter schon so ausgelastet, das er nicht mehr alle Events sofort annehmen konnte. Es bildete sich eine Event-Warteschlange.