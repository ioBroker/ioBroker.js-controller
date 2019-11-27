# js-controller upgrade-instructies

Vanwege de verschillende hardware en platforms waarop ioBroker werkt, moet de js-controller handmatig worden bijgewerkt. Verdere details zijn te vinden in de betreffende sectie.

## Algemene informatie voor alle platforms

**Lees voor een update van js-controller 1.x naar 2.x altijd de informatie op https://forum.iobroker.net/topic/26759/js-controller-2-jetzt-f%C3%BCr-alle-im-stable lezen en noteren!**

Werk anders eerst de slaves bij met een update van master-slave-systemen en de master als laatste!

## Linux/macOS (nieuw installatieprogramma)
Dit is de aanbevolen optie !!

Voer de volgende opdrachten uit in een SSH-shell (console):
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade zelf`
* `iobroker start` of reboot server, dan moet ioBroker opnieuw opstarten en u kunt er zeker van zijn dat alle oude processen zijn voltooid.

Als de upgradeopdracht Toegangsrechten / Toestemmingsfouten weergeeft, gebruik dan de install fixer (`curl -sL https://iobroker.net/fix.sh | bash-`) om deze problemen op te lossen en de upgradeopdracht ren opnieuw.

## Linux/macOS (handmatig geïnstalleerd)

Een handmatige installatie vindt meestal plaats onder root als gebruiker en daarom is een "sudo" nodig voor de opdrachten.

Voer de volgende opdrachten uit in een SSH-shell (console):
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade zelf`
* `sudo iobroker start` of server reboot, dan moet ioBroker opnieuw opstarten en u kunt er zeker van zijn dat alle oude processen zijn voltooid.

Als de upgradeopdracht machtigingen / machtigingsfouten weergeeft, corrigeert u deze. Soms is "sudo" niet genoeg en moet je de installatie uitvoeren als een echte root (voorheen gewoon `sudo su -`).

## Windows

Voor het updaten van ioBroker op Windows, downloadt u het juiste installatieprogramma met de gewenste js-controller-versie van de downloadpagina https://www.iobroker.net/#en/download en voert u de update uit. Met de Windows Installer kunnen eerder handmatig geïnstalleerde servers of installaties van andere besturingssystemen naar Windows worden gemigreerd en bijgewerkt.

## Windows (handmatig geïnstalleerd)

Een handmatige installatie gebeurt met beheerdersrechten. Start een cmd.exe-opdrachtregelvenster als beheerder (klik met de rechtermuisknop op cmd.exe en voer het uit als beheerder) en voer de volgende opdrachten uit:

* `cd C:\iobroker` (of waar ioBroker is geïnstalleerd)
* `iobroker stop` om de ioBroker-service te stoppen
* `iobroker-status` om te controleren of ioBroker is afgelopen
* `iobroker update`
* `iobroker upgrade self`
* Start de ioBroker-service of start de computer opnieuw op. Vervolgens moet ioBroker opnieuw opstarten en kunt u er zeker van zijn dat alle oude processen zijn voltooid.

## Emergency Linux / macOS / Windows (handmatige herinstallatie, als er op de een of andere manier niets werkt na de update)

Roep in Windows eerst in het startmenu onder "ioBroker" de opdrachtregel van de relevante ioBroker-instantie op. De juiste map wordt dan automatisch ingesteld. Ga in Linux of macOS naar de ioBroker-directory.

Voer daar `npm install iobroker.js-controller` uit. Een specifieke versie kan worden geïnstalleerd met behulp van npm install `iobroker.js-controller@x.y.z` (vervang x.y.z door de gewenste versie).

Als er problemen zijn met toegangsrechten bij gebruik van Linux, moet de opdracht enigszins worden gewijzigd:

* Voor systemen gemaakt met het nieuwe Linux-installatieprogramma: `sudo -u iobroker -H npm install iobroker.js-controller`
* Voor systemen die handmatig onder Linux worden geïnstalleerd, geeft u het voorvoegsel `sudo` op of voert u het uit als root.

Deze manier is slechts in enkele gevallen nodig en raadpleeg vooraf het forum!
