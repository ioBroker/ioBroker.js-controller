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

Si la commande de mise à niveau affiche des erreurs d'autorisations / autorisations, corrigez-les. Parfois, "sudo" ne suffit pas et vous devez exécuter l'installation en tant que vraie racine (auparavant, tout simplement `sudo su -`).

## Windows

Pour mettre à jour ioBroker sous Windows, téléchargez le programme d'installation approprié avec la version de js-controller souhaitée à partir de la page de téléchargement https://www.iobroker.net/#en/download et effectuez la mise à jour avec celle-ci. Avec Windows Installer, les serveurs précédemment installés manuellement ou les installations à partir d'autres systèmes d'exploitation peuvent être migrés vers Windows et mis à jour.

## Windows (installé manuellement)

Une installation manuelle est effectuée avec les droits d'administrateur. Veuillez lancer une fenêtre de ligne de commande cmd.exe en tant qu'administrateur (cliquez avec le bouton droit sur cmd.exe et exécutez-le en tant qu'administrateur), puis exécutez les commandes suivantes:

* `cd C:\iobroker` (ou où ioBroker a été installé)
* `iobroker stop` pour arrêter le service ioBroker
* `iobroker status` pour vérifier si ioBroker est terminé
* `iobroker update`
* `iobroker upgrade self`
* Démarrer le service ioBroker ou redémarrer l'ordinateur, puis ioBroker devrait redémarrer et vous pouvez être sûr que tous les anciens processus sont terminés.

## Linux / macOS / Windows d'urgence (réinstallation manuelle, si rien ne fonctionne après la mise à jour)

Sous Windows, veuillez d'abord appeler dans le menu de démarrage sous "ioBroker" la ligne de commande de l'instance ioBroker correspondante. Le bon répertoire est alors défini automatiquement. Sous Linux ou macOS, accédez au répertoire ioBroker.

Exécutez `npm install iobroker.js-controller` ici. Une version spécifique peut être installée à l’aide de npm install `iobroker.js-controller@x.y.z` (remplace x.y.z par la version souhaitée).

S'il y a des problèmes de droits d'accès lors de l'exécution sur Linux, la commande doit être légèrement modifiée:

* Pour les systèmes créés avec le nouvel installateur Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* Pour les systèmes installés manuellement sous Linux, préfixez `sudo` ou exécutez-le en tant que root.
Cette façon de faire n’est nécessaire que dans très peu de cas et veuillez consulter le forum à l’avance!
