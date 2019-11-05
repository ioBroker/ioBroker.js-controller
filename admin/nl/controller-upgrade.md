# js-controller upgrade-instructies

Vanwege de verschillende hardware en platforms waarop ioBroker werkt, moet de js-controller handmatig worden bijgewerkt. Verdere details zijn te vinden in de betreffende sectie.

## Algemene informatie voor alle platforms

**Lees voor een update van js-controller 1.x naar 2.x altijd de informatie op https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im -Laatste repo lezen en noteren!**

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

## Windows (nieuwe Windows Installer)

Download in dit geval een bijgewerkt installatieprogramma van de downloadpagina en voer de update uit.

## Windows (handmatig geïnstalleerd)
Een handmatige installatie vindt meestal plaats met beheerdersrechten

Voer de volgende opdrachten uit in een SSH-shell van een beheerder (console):
* `cd C:\iobroker` (of waar ioBroker is geïnstalleerd)
* ?? Stop de ioBroker-service
* `iobroker update`
* `iobroker upgrade self`
* Start de ioBroker-service of start de computer opnieuw op. Vervolgens moet ioBroker opnieuw opstarten en kunt u er zeker van zijn dat alle oude processen zijn voltooid.

## Emergency (handmatige herinstallatie) (als er op de een of andere manier niets werkt na de update)
Ga naar de ioBroker-directory en voer `npm install iobroker.js-controller` uit. Een specifieke versie kan worden geïnstalleerd met `npm install iobroker.js-controller@x.y.z` (vervang x.y.z door de gewenste versie).

Als er tijdens de uitvoering toegangsproblemen optreden, moet de opdracht enigszins worden gewijzigd:
* Voor systemen gemaakt met het nieuwe Linux-installatieprogramma: `sudo -u iobroker -H npm install iobroker.js-controller`
* Voor systemen die handmatig onder Linux worden geïnstalleerd, geeft u het voorvoegsel `sudo` op of voert u het uit als root.
* Voor Windows-systemen zou een beheerdersshell voldoende moeten zijn

Deze manier is slechts in enkele gevallen nodig en raadpleeg vooraf het forum!
