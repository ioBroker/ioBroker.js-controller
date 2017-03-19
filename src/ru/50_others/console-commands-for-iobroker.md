Существует возможность произвести некоторые операции типа запуска, остановки или обновления данных через командную строку (windows или linux). Ниже приведено их описание. Примечание: все команды, которые запускаются вместе с  `iobroker,` могут вызываться из любой папки, в которой доступна команда iobroker. `npm install` команда должна вызываться из корневой папки ioBroker. **Примечание:** существует следующий параметр `--timeout 5000`, который может быть использован с любой командой. Он устанавливает время ожидания в миллисекундах для подключения к базе данных.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#npm-install-iorbokeradaptername)npm install iorboker.adapterName

Эта команда должна вызываться из корневой папки ioBroker (Обычно `/opt/iobroker` or `C:\Program Files\ioBroker`). Она использует пакетный менеджер npm для установки или обновления указанного драйвера или js-controller. И всегда работает, даже если существуют проблемы с "admin" или "js-controller". Примеры использования:

*   `npm install iobroker.admin` - обновить или установить драйвер "admin"
*   `npm install iobroker.js-controller` - обновить или установить сам js-controller
*   `npm install https://github.com/husky-koglhof/ioBroker.hmm/tarball/master/` - установить драйвер напрямую с GitHub или какого-либо другого места. Он должен быть пакетом либо ZIP либо GZ, и обязательно содержать package.json.

Если драйвер был установлен, после вызова `npm install ..` должна быть произведена перезагрузка указанного драйвера или всего js-controller для того, чтобы изменения вступили в силу. Это можно осуществить с помощью `iobroker restart adapterName` или же просто `iobroker restart`. Для более подробной информации, перейдите [сюда](https://github.com/ioBroker/ioBroker/wiki/Console-commands#restart). **_Примечание:_** таким образом могут быть установлены только пакеты с именем **ioBroker.zzz**.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-start)iobroker start

Запускает iobroker как службу. Если ioBroker уже был запущен, то вы получите следующее предупреждение: `Служба контроллера ioBroker уже запущена. PID: xx` **_Примечание для Windows:_** обычно ioBroker в системе Windows запускается в качестве сервиса. Эта команда запустит второй экземпляр драйвера ioBroker, что приведет к конфликту. Используйте `serviceIoBroker.bat start` из папки ioBroker вместо команды `iobroker start`. Для запуска сервиса вам необходимо обладать правами администратора.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-stop)iobroker stop

Останавливает iobroker, если он запущен как служба. Если ioBroker не запущен, тогда вы получите следующее предупреждение: `Служба контроллера ioBroker не запущена` **_Примечание для Windows:_** обычно ioBroker в системе Windows запускается в качестве сервиса. Эта команда не произведет никакого эффекта. Вызовите `serviceIoBroker.bat stop` из папки ioBroker вместо команды `iobroker stop`. Для остановки сервиса вам необходимо обладать правами администратора.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-restart)iobroker restart

Просто команды запуска и остановки вместе. Смотрите выше.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-isrun)iobroker isrun

Возвращает фактический статус ioBroker. Запущен он или нет. Если ioBroker не запущен, тогда возвращенным кодом является 100.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-start-adapternameinstance)iobroker start adapterName.instance

Вы можете запустить указанный драйвер из командной строки. Он будет автоматически активирован и запущен. Если до этого драйвер уже был запущен, тогда будет произведен его перезапуск. Контроль за тем, что экземпляр драйвера теперь активирован, может быть произведен из "admin". Применение:

*   `iobroker start email.0` - активирует и запускает экземпляр драйвера ioBroker.email.

Примечание: вы можете произвести вызов `iobroker start all` для запуска всех неактивных экземпляров драйверов, например, после восстановления системы.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-stop-adapternameinstance)iobroker stop adapterName.instance

Вы можете остановить указанный драйвер из командной строки. Он будет дезактивирован и остановлен. А в последствии не будет автоматически перезапущен. Контроль за тем, что экземпляр драйвера теперь дезактивирован, может быть произведен из "admin". Применение:

*   `iobroker stop email.0` - дезактивирует и останавливает экземпляр драйвера ioBroker.email.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-restart-adapternameinstance)iobroker restart adapterName.instance

Просто перезапускает указанный драйвер. Если он был не активен, то данная команда его активирует.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-add-adaptername)iobroker add adapterName

Полный вариант команды - `iobroker add adapterName [--enabled] [--host \<host\>] [--port \<port\>]` Устанавливает, если тот до этого не был установлен, и создает экземпляр указанного драйвера. В случае, если экземпляр драйвера уже существует, будет использован следующий номер экземпляра. Существуют следующие дополнительные параметры:

*   активен: Экземпляр драйвера будет автоматически активирован после создания, иначе предопределенное значение драйвера будет использовано для этого.
*   хост: Имя хоста, в котором будет создан экземпляр драйвера. Вы можете получить список хостов с помощью команды `iobroker list hosts`.(Еще пока не внедрено)
*   порт: если у драйвера имеются настройки native.port, он будет изменен на желаемое значение после установки.

Применение:

*   `iobroker add dwd` - Установить и создать экземпляр драйвера dwd.
*   `iobroker add admin --enabled --port 80` - Создать второй (обычно) экземпляр драйвера admin на порту 80 и активировать его.

В случае, если данная команда не работает, вы всегда можете вызвать команду `npm install iobroker.adapterName`, для принудительного запуска обновлений или установки. В подобном случае не будет создано ни одного экземпляра драйвера, и вам потребуется совершить еще один раз вызов команды `iobroker add iobroker.adapterName` после этого.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-install-adaptername)iobroker install adapterName

Только устанавливает драйвер в ioBroker и не создает никакого экземпляра. В случае, если драйвер уже установлен, вы получите следующее предупреждение: `Драйвер "admin" уже установлен. Используйте "upgrade" для установки более новой версии.`

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-upload-adaptername)iobroker upload adapterName

Загрузите веб страницы из папок "www" и "admin" в драйвер в  хранилище файлов ioBroker. Обычно используется разработчиками, чтобы увидеть, что произошли изменения на странице настройки или на страницах "www". Вы не можете изменять файлы напрямую в "iobroker/iobroker-data/adapter/file". Для разработчиков в файле конфигурации (_iobroker-data/iobroker.json_) objects.noFileCache расположен флажок, чтобы дезактивировать кэш файла. При установке этого флажка в настройках (разумеется, требуется новый запуск после изменения файла конфигурации) изменения в папке данных iobroker станут видимыми в интернете без команды `iobroker upload adapterName`. Примечание: вы можете воспользоваться вызовом `iobroker upload all,`чтобы загрузить все драйвера, например, после восстановления системы.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-setup)iobroker setup

Эту команду необходимо запускать в том случае, если ioBroker был установлен не с помощью npm или установочной программы windows (например, просто скопирован с сайта GitHub и не был распакован). Она создает файл конфигурации по умолчанию и подготавливает папки данных. Вы можете произвести вызов данной команды с помощью параметра "first", чтобы убедиться, что ничего не будет переписано, если конфигурация уже существует. Применениe: `iobroker setup first` - создает файлы конфигурации, если они до этого еще не были созданы.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-setup-custom)iobroker setup custom

Для активации конфигураций с межсерверными настройками (экспериментальными), следует произвести вызов данной команды. Должны появиться ответы на следующие вопросы:

Type of objects DB [file, couch, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]: enter IP address of the main system
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]:
Host of states DB (file), default[ip]:
Port of states DB (file), default[9000]:

Вы можете просто нажать ENTER, чтобы увидеть значение по умолчанию в []. **Примечание:** в настоящий момент поддерживается только _файловый_ тип базы данных. Вам следует быть специалистом, если вы меняете порты. **Примечание:** Проверьте параметры брандмауэра на основном хосте для определенных портов (9000/9001).

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-del-adaptername)iobroker del adapterName

Полностью удаляет все экземпляры и статусы этого драйвера из ioBroker и удаляет его с диска. Вы не можете возобновить настройки экземпляра драйвера после удаления. Применение: `iobroker del dwd` - удаляет все экземпляры и код драйвера dwd из ioBroker.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-del-adapternameinstance)iobroker del adapterName.instance

Удаляет все указанные экземпляры этого драйвера из ioBroker и **не** удаляет его с диска. Вы не можете возобновить настройки экземпляра драйвера после удаления. Применение: `iobroker del dwd.0` - удаляет экземпляр 0 адаптера dwd из ioBroker.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-update-repository-url)iobroker update [repository url]

Полный вариант команды: `iobroker update \[repository url\]` Прочтите информацию из сконфигурированного репозитория ioBroker. В случае, если `\repository url\` установлен, информация будет доступна к прочтению из этого репозитория. Применение:

*   `iobroker update` - Показывает список доступной версии из сконфигурированного (обычно локального) репозитория.
*   `iobroker update https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - Показывает доступную версию из он-лайн репозитория.

>./iobroker.js update
Невозможно получить версию "virtual".
Невозможно получить версию "geofency".
загрузка произведена
Драйвер    "zwave"         : 0.1.0
Драйвер    "yr"            : 0.1.2    , установлен 0.1.2
Драйвер    "web"           : 0.2.6    , установлен 0.2.6
Драйвер    "vis"           : 0.2.9    , установлен 0.2.9
Драйвер    "virtual"
Драйвер    "sonos"         : 0.1.5    , установлен 0.1.4 [Возможно обновление]
Драйвер    "rickshaw"      : 0.2.1    , установлен 0.2.1
Драйвер    "pushover"      : 0.1.0
Драйвер    "onkyo"         : 0.0.4
Драйвер    "telnet"        : 0.0.0
Драйвер    "socketio"      : 0.2.3    , установлен 0.2.3
Драйвер    "simple-api"    : 0.0.3    , установлен 0.0.3
Драйвер    "sayit"         : 0.3.0    , установлен 0.3.0
Драйвер    "ping"          : 0.1.3    , установлен 0.1.3
Драйвер    "node-red"      : 0.1.5    , установлен 0.1.5
Драйвер    "mqtt"          : 0.1.6    , установлен 0.1.5 [Возможно обновление]
Драйвер    "mobile"        : 0.0.2
Драйвер    "legacy"        : 0.1.12
Драйвер    "knx"           : 0.0.1
Контроллер "js-controller" : 0.5.14   , установлен 0.5.14
Драйвер    "javascript"    : 0.2.3    , установлен 0.2.3
Драйвер    "ical"          : 0.0.2    , установлен 0.0.1 [Возможно обновление]
Драйвер    "hmm"           : 0.0.15   , установлен 0.0.16
Драйвер    "hue"           : 0.2.0    , установлен 0.2.0
Драйвер    "hm-rpc"        : 0.3.5    , установлен 0.3.4 [Возможно обновление]
Драйвер    "hm-rega"       : 0.1.17   , установлен 0.1.17
Драйвер    "history"       : 0.1.3    , установлен 0.1.3
Драйвер    "highcharts"    : 0.0.0
Драйвер    "graphite"      : 0.1.0
Драйвер    "geofency"
Драйвер    "example"       : 0.1.1    , установлен 0.1.1
Драйвер    "email"         : 0.1.0
Драйвер    "dwd"           : 0.1.7    , установлен 0.1.7
Драйвер    "cul"           : 0.0.2    , установлен 0.0.3
Драйвер    "b-control-em"  : 0.1.1
Драйвер    "artnet"        : 0.0.3
Драйвер    "admin"         : 0.3.21   , установлен 0.3.20 [Возможно обновление]

Эта команда не изменяет ничего, просто обновляет внутреннюю информацию о доступной версии драйвера и показывает ее. Для того, чтобы показать только доступные для обновления драйвера, используйте фильтр "--возможно обновление".

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-upgrade)iobroker upgrade

Полная версия команды: `iobroker upgrade \[repository url\]` Обновляет все драйвера (не js-controller), если для них доступны новые версии в указанном репозитории. В случае, если не указан адрес репозитория, будет использован сконфигурированный репозиторий. Применение:

*   `iobroker upgrade` - обновляет все драйвера.
*   `iobroker upgrade https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - обновляет все драйвера из он-лайн репозитория.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-upgrade-self)iobroker upgrade self

Полная версия команды: `iobroker upgrade self \[repository url\]` Эта команда обновляет ioBroker.js-controller до версии, которая может быть обнаружена в репозитории. **Примечание:** Если в указанном или сконфигурированном репозитории находится более ранняя версия, то он будет понижен до этой версии.

*   `iobroker upgrade self` - обновляет js-controller до версии в сконфигурированном репозитории.
*   `iobroker upgrade self https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - обновляет js-controller до версии в он-лайн репозитории.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-upgrade-adaptername)iobroker upgrade adapterName

Полная версия команды: `iobroker upgrade adapterName \[repository url\]` Эта команда обновляет указанный драйвер до версии, которая находится в репозитории. **Примечание:** Если в указанном или сконфигурированном репозитории находится более ранняя версия, то он будет понижен до этой версии.

*   `iobroker upgrade email` - обновляет драйвер ioBroker.email до версии в сконфигурированном репозитории.
*   `iobroker upgrade email https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - обновляет драйвер ioBroker.email до версии в он-лайн репозитории.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-object-get)iobroker object get

Полная версия команды: `iobroker get objectId` Считывает из командной строки описание объекта: C:\pWork>iobroker object get system.adapter.admin.0.uptime

>./iobroker object get system.adapter.admin.0.uptime
{
"_id":"system.adapter.admin.0.uptime",
"type":"state",
"common":{"name":"admin.0.uptime","type":"number","role":"indicator.state","unit":"seconds"},
"native":{}
}

**Примечание:** Обычно результат не форматируется, но вы можете использовать флажок "--pretty", чтобы их отформатировать.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-object-chmod)iobroker object chmod

Формат: `iobroker object chmod <object-mode> [state-mode] <id>` ID может быть шаблоном '_'. '_' может находиться только в конце шаблона.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-object-chown)iobroker object chown

Формат: `iobroker object chown <user> <group> <id>` ID может быть шаблоном '_'. '_' может находиться только в конце шаблона.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-object-list)iobroker object list

Формат: `iobroker object list <id>` Выводит список разрешений объектов, как например:

>iobroker object list system.adapter.admin.*

ObjectAC | StateAC | Пользователь     |     Группа    | ID
---------+---------+--------------+--------------+--------------
rw-r--r-- rw-r--r--          admin  администратор system.adapter.admin.0.uptime
rw-r--r-- rw-r--r--          admin  администратор system.adapter.admin.0.memRss
rw-r--r-- rw-r--r--          admin  администратор system.adapter.admin.0.memHeapTotal
rw-r--r-- rw-r--r--          admin  администратор system.adapter.admin.0.memHeapUsed
rw-r--r-- rw-r--r--          admin  администратор system.adapter.admin.0.connected
rw-r--r-- rw-r--r--          admin  администратор system.adapter.admin.0.alive
rw-r--r--                    admin  администратор system.adapter.admin.0

ID может быть шаблоном '_'. '_' может находиться только в конце шаблона.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-set)iobroker set

Полная версия команды: `iobroker set <instance> [--port value] [--enabled true|false] [--ip address] [--auth true|false] [--ssl true|false]` Используется для модификации настроек экземпляра драйвера из командной строки. Могут быть модифицированы следующие настройки:

*   порт - изменяет порт, к которому привязан экземпляр драйвера
*   активирован - активирует/дезактивирует экземпляр драйвера (Может быть произведено с помощью `iobroker start|stop <instance>`too)
*   ip - изменяет привязанный ip адрес
*   auth - активирует или дезактивирует аутентификацию
*   ssl - включает или выключает протокол SSL

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-state-get)iobroker state get

Полная версия команды: `iobroker state get stateId` Читает значение JSON состояния:

>./iobroker state get system.adapter.admin.0.uptime
{"val":496,"ack":true,"ts":1425925626,"from":"system.adapter.admin.0","lc":1425925626}

Вы можете использовать флажок "--pretty" для форматирования результата.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-state-getplain)iobroker state getplain

Полная версия команды: `iobroker state getplain stateId` Читает простое значение статуса как перечень аттрибутов:

>./iobroker state getplain system.adapter.admin.0.uptime
571
true
system.adapter.admin.0
1425925701
1425925701

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-state-set)iobroker state set

Полная версия команды: `iobroker state set stateId newValue ack` Установите значение состояния. "подтверждение по умолчанию = false. `>iobroker state set sayit.0.tts.text "Текст сказать"` `>iobroker state set adapter.0.states.temperature 28.5 true` В случае, если ID неправильный, сообщение об ошибке не появляется.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-state-del)iobroker state del

Полная версия команды: `iobroker state del stateId` Удалить статус.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-message)iobroker message

Полная версия команды: `iobroker message adapter.instance command message` Посылается сообщение на указанный экземпляр драйвера или все экземпляры драйвера, когда экземпляр драйвера не указан.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-clean)iobroker clean

Стирает все настройки ioBroker. **Вы не можете возобновить настройки после вызова данной команды.**

>iobroker очистить да
Удалено 205 объектов.
Повторный запуск ioBroker...

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-backup)iobroker backup

Создает резервную копию ioBroker в файле zip. Резервные файлы будут созданы в папке _backups_ и будут иметь следующие имена: `2015_02_10-17_49_45_backupIoBroker.tar.gz` с текущими временем и датой. **Примечание:** еще не закончено

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-restore)iobroker restore

Полная версия команды: `iobroker restore <backup name or path>` В случае, если некоторые резервные копии были созданы с помощью команды `iobroker backup`, они могут быть восстановлены. Если вы можете восстановить их без параметров, вы получите список доступных резервных копий.

/>восстановление iobroker
Пожалуйста, укажите одно из имен резервных копий:
2015_07_18-12_20_28_backupIoBroker.tar.gz or 2015_07_18-12_20_28 or 0
2015_07_17-21_54_01_backupIoBroker.tar.gz or 2015_07_17-21_54_01 or 1

Вы можете вызвать `iobroker restore 0` для использования последнего файла резервного копирования или какого-либо другого индекса. Следующие команды будут выполнять ту же функцию, что и в предоставленном примере:

*   iobroker restore 0
*   iobroker 2015_07_18-12_20_28
*   iobroker 2015_07_17-21_54_01_backupIoBroker.tar.gz
*   iobroker /opt/iobroker/backups/2015_07_17-21_54_01_backupIoBroker.tar.gz

Все драйвера будут восстановлены как неактивные, за исключением "admin". Для активации всех драйверов одновременно, вы можете вызвать команду "iobroker start all". Если некоторые драйвера не загружены, вы можете вызвать команду "iobroker upload all" для загрузки всех файлов драйверов одновременно.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-host)iobroker host

Измените имя хоста в объектах. Иногда перемещая данные iobroker из одной системы в другую, требуется изменить имя хоста. Данная операция может быть произведена с помощью этой команды. Прежде, чем сделать это, вы должны остановить ioBroker. Для того, чтобы изменить определенное имя хоста в базе данных на текущее имя хоста, напишите `iobroker host oldHostName`. Для изменения любого имени хоста (должна существовать только одна единственная система хоста, не для межсерверных настроек) напишите `iobroker host this`.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-host-set)iobroker host set

Вы можете изменить имя хоста на какое-либо определенное (не на имя компьютера). Для этого вам следует написать: `iobroker host set newHostName` , чтобы переименовать действующее имя компьютера или предидущее указанное имя хоста.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-host-remove)iobroker host remove

Для удаления хоста, просто напишите `iobroker host remove hostNameToRemove`. Пожалуйста, будьте осторожны с этим.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-list)iobroker list

С помощью данной команда возможно показать различные типы объектов и статусов в ioBroker. Примеры:

*   `iobroker list objects hm-rega.0` - показать все объекты эземпляра драйвера hm-rega.0
*   `iobroker list states hm-rega.0` - показать все статусы экземпляра драйвера hm-rega.0
*   `iobroker list files vis.0` - показать все файлы экземпляра драйвера vis.0
*   `iobroker list instances` - показать все экземпляры
*   `iobroker list adapters` - показать все драйверы
*   `iobroker list users` - показать всех пользователей
*   `iobroker list groups` - показать все группы
*   `iobroker list enums` - показать все enum
*   `iobroker list hosts` - показать все хосты

Возможно использовать сокращения для типов:

*   o - объекты
*   s - статусы
*   u - пользователи
*   e - категории
*   g - группы
*   i - экземпляры драйверов
*   f - файлы
*   h - хосты

Например `iobroker l u` - показать перечень всех пользователей. С помощью "показать перечень экземпляров драйверов" вы можете использовать дополнительные фильтры:

*   активированные - перечислить все активные экземпляры драйверов
*   дезактивированные - перечислить все неактивные экземпляры драйверов
*   порт - показать все экземпляры драйверов с портом
*   ip - показать все экземпляры, которые могут быть привязаны к какому-либо IP
*   ssl - показать все экземпляры, где может быть активирован SSL

Применение: `iobroker list instances --enabled` перечислить все активные экземпляры драйверов или `iobroker l i --port` перечислить использованные порты.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-adduser)iobroker adduser

Эта команда позволяет создавать нового пользователя (по умолчанию в группе "администратор"). Эта группа может быть определена в команде с параметром "`--ingroup`". Если пароль не задан, то в нее следует зайти с командной строки. Например, создать пользователя "martin" в группе "пользователь": `iobroker adduser martin --group user` Создать пользователя с паролем: `iobroker adduser martin --group user --password 12345`

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-deluser)iobroker deluser

Для удаления существующего пользователя, вызовите команду: `iobroker deluser username` Пользователь будет автоматически удален также изо всех груп. Пользователь "admin" не может быть удален.

## [](https://github.com/ioBroker/ioBroker/wiki/Console-commands#iobroker-passwd)iobroker passwd

Дл изменения пароля существующего пользователя, вызовите команду: `iobroker passwd username` Вам будет предложено ввести пароль и повторить его.  Если не требуется никакого взаимодействия с командной строкой, наберите команду: `iobroker passwd username --password newPassword`

## iobroker chmod

Изменить режимный код файла.

## <a id="iobroker_chown_468"></a>iobroker chown

Изменить владельца файла.

## <a id="iobroker_file_read_471"></a>iobroker file read

Прочтите файл из базы данных и сохраните его в локальной файловой системе. Применение: `iobroker file read [storeFile]` storeFile является выборочной функцией, но может быть и путем к папке или же новому файлу. Пример: `iobroker file read /vis.0/main/img/picture.png /opt/myfile.png` "file" и "read" могут быть сокращеныо до "f r".

## <a id="iobroker_file_write_474"></a>iobroker file write

Впишите файл из локальной файловой системы в базу данных. Применение: `iobroker file write` storeFile может быть путем к папке в базе данных или же полным именем Пример: `iobroker file write /opt/myfile.png /vis.0/main/img/picture.png` "file" и "write" могут быть сокращены до "f w".