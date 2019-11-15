# Instruções de atualização do JS-Controller

Devido aos diferentes hardwares e plataformas sob os quais o ioBroker é executado, o js-controller precisa ser atualizado manualmente. Mais detalhes podem ser encontrados na seção apropriada.

## Informações gerais para todas as plataformas

**Para obter uma atualização do js-controller 1.x para 2.x, sempre leia as informações em https://forum.iobroker.net/topic/26759/js-controller-2-jetzt-f%C3%BCr-alle-im-stable.**

Caso contrário, atualize os slaves primeiro com uma atualização dos sistemas master/slave e o master por último!

## Linux/macOS (novo instalador)
Esta é a opção recomendada !!

Por favor, execute os seguintes comandos em um shell SSH (console):
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` ou reinicialize o servidor, o ioBroker deve reiniciar e você pode ter certeza de que todos os processos antigos foram concluídos.

Se o comando upgrade exibir erros de Direitos de acesso/permissão, use o fixador de instalação (`curl -sL https://iobroker.net/fix.sh | bash-`) para corrigir esses problemas e execute o comando `iobroker upgrade self` novamente.

## Linux/macOS (instalado manualmente)

Uma instalação manual geralmente ocorre no root como usuário e, portanto, é necessário um "sudo" antes dos comandos.

Por favor, execute os seguintes comandos em um shell SSH (console):
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` ou reinicialização do servidor, o ioBroker deve reiniciar e você pode ter certeza de que todos os processos antigos foram concluídos.

Se o comando upgrade exibir erros de permissões, corrija-os. Às vezes "sudo" não é suficiente e você precisa executar a instalação como uma root real (simplesmente use `sudo su -`).

## Windows

Para atualizar o ioBroker no Windows, faça o download do instalador apropriado com a versão js-controller desejada na página de download https://www.iobroker.net/#en/download e faça a atualização com ele. Com o Windows Installer, servidores ou instalações instalados manualmente de outros sistemas operacionais podem ser migrados para o Windows e atualizados.

## Windows (instalado manualmente)

Uma instalação manual é feita com direitos de administrador. Inicie uma janela da linha de comando do cmd.exe como administrador (clique com o botão direito do mouse em cmd.exe e execute como administrador) e execute os seguintes comandos:

* `cd C:\iobroker` (ou onde o ioBroker foi instalado)
* `iobroker stop` para interromper o serviço ioBroker
* `iobroker status` para verificar se o ioBroker terminou
* `iobroker update`
* `iobroker upgrade self`
* Inicie o serviço ioBroker ou reinicie o computador; o ioBroker deve reiniciar e você pode ter certeza de que todos os processos antigos foram concluídos.

## Emergência Linux / macOS / Windows (reinstalação manual, se de alguma forma nada funcionar após a atualização)

No Windows, primeiro chame no menu Iniciar em "ioBroker" a linha de comando da instância relevante do ioBroker. O diretório correto é então definido automaticamente. No Linux ou macOS, acesse o diretório ioBroker.

Execute o `npm install iobroker.js-controller` lá. Uma versão específica pode ser instalada usando o npm install `iobroker.js-controller@x.y.z` (substitua x.y.z pela versão desejada).

Se houver problemas com os direitos de acesso ao executar no Linux, o comando deverá ser ligeiramente alterado:

* Para sistemas criados com o novo instalador do Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* Para sistemas instalados manualmente no Linux, prefixe `sudo` ou execute como root.

Dessa forma, só é necessário em muito poucos casos e consulte o fórum de antemão!
