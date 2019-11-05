# js-controller upgrade instructions

Devido aos diferentes hardwares e plataformas sob os quais o ioBroker é executado, o js-controller precisa ser atualizado manualmente. Mais detalhes podem ser encontrados na seção apropriada.

## Informações gerais para todas as plataformas

**Para obter uma atualização do js-controller 1.x para 2.x, sempre leia as informações em https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im-latest-repo.**

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

## Windows (novo Windows Installer)

Nesse caso, faça o download de um instalador atualizado na página de download e faça a atualização com ele.

## Windows (instalado manualmente)
Uma instalação manual geralmente ocorre com direitos de administrador

Por favor, execute os seguintes comandos em um shell SSH do administrador (console):
* `cd C:\iobroker` (ou onde o ioBroker foi instalado)
* ?? Pare o serviço ioBroker
* `iobroker update`
* `iobroker upgrade self`
* Inicie o serviço ioBroker ou reinicie o computador; o ioBroker deve reiniciar e você pode ter certeza de que todos os processos antigos foram concluídos.

## Emergência (reinstalação manual) (se de alguma forma nada funcionar após a atualização)
Por favor, vá para o diretório ioBroker e execute `npm install iobroker.js-controller`. Uma versão específica pode ser instalada usando o `npm install iobroker.js-controller@x.y.z` (substitua x.y.z pela versão desejada).

Se ocorrerem problemas de acesso durante a execução, o comando deverá ser alterado ligeiramente:
* Para sistemas criados com o novo instalador do Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* Para sistemas instalados manualmente no Linux, prefixe `sudo` ou execute como root.
* Para sistemas Windows, um shell de administrador deve ser suficiente

Dessa forma, só é necessário em muito poucos casos e consulte o fórum de antemão!
