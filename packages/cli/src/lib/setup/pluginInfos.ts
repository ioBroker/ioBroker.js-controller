// Special Handling to inform users about reporting plugins correctly
export function isReportingPlugin(name: string): boolean {
    return name === 'sentry';
}

export const PLUGIN_INFOS = {
    sentry: {
        headline: {
            en: 'ATTENTION: Error reporting via Sentry will be activated on next start of ioBroker',
            de: 'ACHTUNG: Die Fehlerberichterstattung über Sentry wird beim nächsten Start von ioBroker aktiviert',
            ru: 'ВНИМАНИЕ: Отчет об ошибках через Sentry будет активирован при следующем запуске ioBroker',
            pt: 'ATENÇÃO: O relatório de erros via Sentry será ativado no próximo início do ioBroker',
            nl: 'LET OP: Foutrapportage via Sentry wordt geactiveerd bij de volgende start van ioBroker',
            fr: "ATTENTION: Le rapport d'erreurs via Sentry sera activé au prochain démarrage d'ioBroker",
            it: 'ATTENZIONE: la segnalazione degli errori tramite Sentry verrà attivata al prossimo avvio di ioBroker',
            es: 'ATENCIÓN: el informe de errores a través de Sentry se activará en el próximo inicio de ioBroker',
            pl: 'UWAGA: Raportowanie błędów za pośrednictwem Sentry zostanie aktywowane przy następnym uruchomieniu ioBroker',
            uk: 'УВАГА: Звіт про помилки через Sentry буде активовано при наступному запуску ioBroker',
            'zh-cn': '注意：通过Sentry的错误报告将在ioBroker的下一次启动时被激活'
        },
        text: {
            en: "ioBroker wants to make sure to deliver the most stable smart home system.\nTo allow this we decided to implement an automatic error and crash reporting solution into the js-controller and also into adapters. \n\nTHIS REPORTING WILL BE ENABLED WITH THE NEXT START OF YOUR IOBROKER!\n\nFor any error that leads to the crash of the js-controller or one of the relevant adapters the error details are send to a server. For the js-controller and core adapters this server is located and operated in germany. For community adapters please check the Github Readme of the affected adapter for details which Sentry server is used.\n\nIf you want to disable the error reporting you can use the command\n'iobroker plugin disable sentry'\nThis command will also make sure that no adapter that runs on this host will send crash reporting data to sentry.",
            de: "Wir von ioBroker wollen das stabilste Smart-Home-System bereitstellen.\nUm dies zu ermöglichen, haben wir uns entschlossen, eine automatische Fehler- und Crash-Reporting-Lösung in den js-Controller und auch in Adapter zu implementieren.\n\nDIESE BERICHTERSTATTUNG WIRD MIT DEM NÄCHSTEN START IHRES IOBROKERS AKTIVIERT!\n\nBei Fehlern, die zum Absturz des js-Controllers oder eines der relevanten Adapter führen, werden die Fehlerdetails an einen Server gesendet. Für den js-controller und die Haupt-Adapter befindet sich dieser Server in Deutschland. Informationen zu Community-Adaptern sind in der Github-Readme-Datei des betroffenen Adapters zu finden. Dort steht welcher Sentry-Server verwendet wird.\n\nDie Fehlerberichterstattung kann, falls gewünscht, über den Befehl\n'iobroker plugin disable sentry'\ndeaktiviert werden. Dieser Befehl stellt auch sicher, dass kein Adapter, der auf diesem Host ausgeführt wird, Absturzberichtsdaten an den Sentry-Server sendet.",
            ru: "ioBroker хочет обеспечить самую стабильную систему умного дома.\nЧтобы сделать это, мы решили внедрить решение для автоматического сообщения об ошибках и сбоях в js-контроллер, а также в адаптеры.\n\nЭТА ОТЧЕТНОСТЬ БУДЕТ ВКЛЮЧЕНА С СЛЕДУЮЩИМ СТАРТОМ ВАШЕГО IOBROKER!\n\nДля любой ошибки, которая приводит к сбою js-контроллера или одного из соответствующих адаптеров, подробности ошибки отправляются на сервер. Для js-контроллера и базовых адаптеров этот сервер расположен и работает в Германии. Для адаптеров сообщества, пожалуйста, проверьте Github Readme уязвимого адаптера для деталей, какой сервер Sentry используется.\n\nЕсли вы хотите отключить отчеты об ошибках, вы можете использовать команду\n'iobroker plugin disable sentry'\nЭта команда также будет следить за тем, чтобы ни один адаптер, работающий на этом хосте, не отправлял данные отчетов о сбоях часовому.",
            pt: "A ioBroker quer garantir o sistema doméstico inteligente mais estável.\nPara permitir isso, decidimos implementar uma solução automática de relatórios de erros e falhas no controlador js e também nos adaptadores.\n\nESTE RELATÓRIO SERÁ ATIVADO COM O PRÓXIMO INÍCIO DO SEU IOBROKER!\n\nPara qualquer erro que leve ao travamento do controlador js ou de um dos adaptadores relevantes, os detalhes do erro serão enviados para um servidor. Para os controladores js e adaptadores principais, este servidor está localizado e operado na Alemanha. Para adaptadores da comunidade, consulte o Leia-me do Github do adaptador afetado para obter detalhes de qual servidor Sentry é usado.\n\nSe você deseja desativar o relatório de erros, pode usar o comando\n'iobroker plugin disable sentry'\nEste comando também garantirá que nenhum adaptador executado neste host envie dados de relatório de falha à sentinela.",
            nl: "ioBroker wil ervoor zorgen dat het het meest stabiele slimme thuissysteem levert.\nOm dit mogelijk te maken, hebben we besloten om een automatische fout- en crashrapportageoplossing in de js-controller en ook in adapters te implementeren.\n\nDEZE RAPPORTAGE WORDT INGESCHAKELD MET DE VOLGENDE START VAN UW IOBROKER!\n\nVoor elke fout die leidt tot het crashen van de js-controller of een van de relevante adapters, worden de foutdetails naar een server gestuurd. Voor de js-controller en core-adapters bevindt deze server zich in Duitsland. Raadpleeg voor communityadapters het Github Readme van de betreffende adapter voor details welke Sentry-server wordt gebruikt.\n\nAls u de foutrapportage wilt uitschakelen, kunt u de opdracht gebruiken\n'iobroker plugin disable sentry'\nDeze opdracht zorgt er ook voor dat geen enkele adapter die op deze host wordt uitgevoerd, crashrapportagegegevens naar de wachtpost verzendt.",
            fr: "ioBroker veut s'assurer de fournir le système de maison intelligente le plus stable.\nPour permettre cela, nous avons décidé d'implémenter une solution automatique de rapport d'erreurs et de plantages dans le contrôleur js et également dans les adaptateurs.\n\nCE RAPPORT SERA ACTIVÉ AU PROCHAIN DÉMARRAGE DE VOTRE IOBROKER!\n\nPour toute erreur entraînant la panne du contrôleur js ou de l'un des adaptateurs concernés, les détails de l'erreur sont envoyés à un serveur. Pour le contrôleur js et les adaptateurs principaux, ce serveur est situé et exploité en Allemagne. Pour les adaptateurs de communauté, consultez le fichier Lisezmoi Github de l'adaptateur concerné pour plus de détails sur le serveur Sentry utilisé.\n\nSi vous souhaitez désactiver le rapport d'erreurs, vous pouvez utiliser la commande\n'iobroker plugin disable sentry'\nCette commande s'assurera également qu'aucun adaptateur qui s'exécute sur cet hôte n'enverra de données de rapport d'incident à la sentinelle.",
            it: "ioBroker vuole assicurarsi di fornire il sistema di casa intelligente più stabile.\nPer consentire ciò, abbiamo deciso di implementare una soluzione di segnalazione automatica di errori e arresti anomali nel controller js e anche negli adattatori.\n\nQUESTA RENDICONTAZIONE SARÀ ABILITATA CON IL PROSSIMO INIZIO DEL TUO IOBROKER!\n\nPer qualsiasi errore che porta al crash del controller js o di uno dei relativi adattatori, i dettagli dell'errore vengono inviati a un server. Per il controller js e gli adattatori core questo server si trova e funziona in Germania. Per gli adattatori della comunità, consultare il file Leggimi di Github dell'adattatore interessato per i dettagli su quale server Sentry viene utilizzato.\n\nSe si desidera disabilitare la segnalazione degli errori, è possibile utilizzare il comando\n'iobroker plugin disable sentry'\nQuesto comando assicurerà inoltre che nessun adattatore in esecuzione su questo host invierà dati di segnalazione di crash a sentinella.",
            es: "ioBroker quiere asegurarse de ofrecer el sistema de hogar inteligente más estable.\nPara permitir esto, decidimos implementar una solución automática de informe de errores y fallas en el controlador js y también en los adaptadores.\n\n¡ESTE INFORME SERÁ HABILITADO CON EL PRÓXIMO INICIO DE SU IOBROKER!\n\nPara cualquier error que provoque el bloqueo del controlador js o de uno de los adaptadores relevantes, los detalles del error se envían a un servidor. Para el controlador js y los adaptadores principales, este servidor está ubicado y funciona en Alemania. Para los adaptadores comunitarios, consulte el archivo Léame de Github del adaptador afectado para obtener detalles sobre qué servidor Sentry se utiliza.\n\nSi desea deshabilitar el informe de errores, puede usar el comando\n'iobroker plugin disable sentry'\nEste comando también se asegurará de que ningún adaptador que se ejecute en este host envíe datos de informes de fallas al centinela.",
            pl: 'ioBroker chce zapewnić najbardziej stabilny system inteligentnego domu.\nAby to umożliwić, zdecydowaliśmy się wdrożyć automatyczne raportowanie błędów i awarii w sterowniku js, a także w adapterach.\n\nNINIEJSZE SPRAWOZDAWCZOŚĆ BĘDZIE WŁĄCZONA Z NASTĘPNYM STARTEM TWOJEGO IOBROKERA!\n\nW przypadku każdego błędu, który prowadzi do awarii sterownika js lub jednego z odpowiednich adapterów, szczegóły błędu są wysyłane do serwera. W przypadku kontrolera js i podstawowych adapterów serwer ten znajduje się i działa w Niemczech. W przypadku adapterów społecznościowych sprawdź plik Github Readme odpowiedniego adaptera, aby uzyskać szczegółowe informacje na temat używanego serwera Sentry.\n\nJeśli chcesz wyłączyć raportowanie błędów, możesz użyć polecenia\n„iobroker plugin disable sentry”\nTo polecenie upewni się również, że żaden adapter działający na tym hoście nie wyśle danych raportowania awarii do wartownika.',
            uk: 'ioBroker хоче забезпечити найстабільнішу систему розумного будинку.\nДля цього ми вирішили впровадити автоматичне повідомлення про помилки та аварії в контролері js та також в адаптери.\n\nЦЕ ЗВІТУВАННЯ БУДЕ АКТИВОВАНО З НАСТУПНИМ СТАРТОМ ВАШОГО IOBROKER!\n\nДля будь-якої помилки, яка призводить до аварії контролера js або одного з відповідних адаптерів, деталі помилки надсилаються на сервер. Для контролера js та основних адаптерів цей сервер розташований та працює в Німеччині. Для адаптерів спільноти перевірте файл Github Readme відповідного адаптера для отримання деталей про те, який сервер Sentry використовується.\n\nЯкщо ви хочете вимкнути звіт про помилки, ви можете використовувати команду\n“iobroker plugin disable sentry”\nЦя команда також переконається, що жоден адаптер, який працює на цьому хості, не надсилатиме дані звіту про аварію до вартового.',
            'zh-cn':
                'ioBroker希望确保提供最稳定的智能家居系统。\n为此，我们决定在js-controller和适配器中实现自动错误和崩溃报告解决方案。\n\n您的炸弹人的下一个开始将启用此报告！\n\n对于导致js-controller或相关适配器之一崩溃的任何错误，错误详细信息将发送到服务器。对于js-controller和核心适配器，此服务器位于德国并在其中运行。对于社区适配器，请检查受影响的适配器的Github自述文件，以了解使用哪个Sentry服务器的详细信息。\n\n如果要禁用错误报告，可以使用以下命令\n“ iobroker plugin disable sentry”\n此命令还将确保在此主机上运行的任何适配器都不会将崩溃报告数据发送到哨兵。'
        }
    }
} as const;
