# istruzioni per l'aggiornamento del controller js

A causa del diverso hardware e piattaforme su cui gira ioBroker, il controller js deve essere aggiornato manualmente. Ulteriori dettagli sono disponibili nell'apposita sezione.

## Informazioni generali per tutte le piattaforme

**Per un aggiornamento da js-controller da 1.xa 2.x, leggere sempre le informazioni su https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im -Ultimo repository letto e nota!**

Altrimenti aggiorna prima gli slave con un aggiornamento dei sistemi master-slave e l'ultimo master!

## Linux/macOS (nuovo programma di installazione)
Questa è l'opzione consigliata !!

Eseguire i comandi seguenti in una shell SSH (console):
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` o riavvia il server, quindi ioBroker dovrebbe riavviarsi e puoi essere sicuro che tutti i vecchi processi sono stati completati.

Se il comando di aggiornamento visualizza errori di diritti di accesso / autorizzazione, utilizzare il programma di installazione (`curl -sL https://iobroker.net/fix.sh | bash-`) per risolvere questi problemi e aggiornare il comando corri di nuovo.

## Linux/macOS (installato manualmente)

Un'installazione manuale di solito avviene sotto root come utente e quindi è necessario un "sudo" prima dei comandi.

Eseguire i comandi seguenti in una shell SSH (console):
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` o riavvio del server, quindi ioBroker dovrebbe riavviarsi e si può essere sicuri che tutti i vecchi processi siano stati completati.

Se il comando upgrade mostra errori permessi / permessi, correggili. A volte "sudo" non è sufficiente e devi eseguire l'installazione come root reale (in precedenza semplicemente `sudo su -`).

## Windows (nuovo Windows Installer)

In questo caso, scarica un programma di installazione aggiornato dalla pagina di download e esegui l'aggiornamento con esso.

## Windows (installato manualmente)
Un'installazione manuale di solito avviene con diritti di amministratore

Eseguire i comandi seguenti in una shell SSH dell'amministratore (console):
* `cd C:\iobroker` (o dove è stato installato ioBroker)
* ?? Interrompere il servizio ioBroker
* `iobroker update`
* `iobroker upgrade self`
* Avvia il servizio ioBroker o riavvia il computer, quindi ioBroker dovrebbe riavviarsi e puoi essere sicuro che tutti i vecchi processi sono stati completati.

## Emergenza (reinstallazione manuale) (se in qualche modo non funziona nulla dopo l'aggiornamento)
Vai nella directory ioBroker ed esegui `npm install iobroker.js-controller`. È possibile installare una versione specifica usando `npm install iobroker.js-controller@x.y.z` (sostituire x.y.z con la versione desiderata).

Se si verificano problemi di accesso durante l'esecuzione, il comando deve essere leggermente modificato:
* Per i sistemi creati con il nuovo programma di installazione Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* Per i sistemi installati manualmente su Linux, prefisso `sudo` o esegui come root.
* Per i sistemi Windows, dovrebbe essere sufficiente una shell dell'amministratore

In questo modo è necessario solo in pochissimi casi e consultare il forum in anticipo!
