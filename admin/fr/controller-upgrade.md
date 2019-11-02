# instructions de mise à niveau du contrôleur

En raison du matériel et des plates-formes différentes sous lesquels ioBroker s'exécute, le contrôleur js doit être mis à jour manuellement. Plus de détails peuvent être trouvés dans la section appropriée.

## Informations générales pour toutes les plateformes

**Pour une mise à jour de js-controller 1.x à 2.x, veuillez toujours lire les informations sur https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im. -Latest-repo lire et noter!**

Sinon, veuillez d'abord mettre à jour les esclaves avec une mise à jour des systèmes maître-esclave et le maître en dernier!

## Linux/macOS (nouvel installateur)
C'est l'option recommandée !!

Veuillez exécuter les commandes suivantes dans un shell SSH (console):
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` ou redémarrez le serveur, alors ioBroker devrait redémarrer et vous pouvez être sûr que tous les anciens processus sont terminés.

Si la commande de mise à niveau affiche des erreurs de droits d'accès / autorisations, veuillez utiliser le programme de réparation d'installation (`curl -sL https://iobroker.net/fix.sh | bash-`) pour résoudre ces problèmes et la commande de mise à niveau courir à nouveau.

## Linux/macOS (installé manuellement)

Une installation manuelle a généralement lieu sous root en tant qu’utilisateur et un "sudo" est donc nécessaire avant les commandes.

Veuillez exécuter les commandes suivantes dans un shell SSH (console):
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` ou le redémarrage du serveur, ioBroker doit redémarrer et vous pouvez être sûr que tous les anciens processus sont terminés.

Si la commande de mise à niveau affiche des erreurs d'autorisations / autorisations, corrigez-les. Parfois, "sudo" ne suffit pas et vous devez exécuter l'installation en tant que vraie racine (auparavant, tout simplement `sudo su-`).

## Windows (nouveau Windows Installer)

Dans ce cas, veuillez télécharger un programme d'installation mis à jour à partir de la page de téléchargement et effectuez la mise à jour avec celle-ci.

## Windows (installé manuellement)
Une installation manuelle a généralement lieu avec des droits d'administrateur

Veuillez exécuter les commandes suivantes dans un shell administrateur SSH (console):
* `cd C:\iobroker` (ou où ioBroker a été installé)
* ?? Arrêtez le service ioBroker
* `iobroker update`
* `iobroker upgrade self`
* Démarrer le service ioBroker ou redémarrer l'ordinateur, puis ioBroker devrait redémarrer et vous pouvez être sûr que tous les anciens processus sont terminés.

## Emergency (réinstallation manuelle) (si en quelque sorte rien ne fonctionne après la mise à jour)
Veuillez vous rendre dans le répertoire ioBroker et lancer `npm install iobroker.js-controller`. Une version spécifique peut être installée à l’aide de `npm install iobroker.js-controller @ x.y.z` (remplace x.y.z par la version souhaitée).

Si des problèmes d'accès surviennent pendant l'exécution, la commande doit être légèrement modifiée:
* Pour les systèmes créés avec le nouvel installateur Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* Pour les systèmes installés manuellement sous Linux, préfixez `sudo` ou exécutez-le en tant que root.
* Pour les systèmes Windows, un shell administrateur devrait suffire

Cette façon de faire n’est nécessaire que dans très peu de cas et veuillez consulter le forum à l’avance!