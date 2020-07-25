---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/config/cli.md
title: Консольные команды
hash: o9cwg+qXCeRhTN48U+tVW4Y05Khl5G1/JN/mn4f76m0=
---
# Консольные команды
Существует возможность выполнять некоторые операции, такие как запуск, остановка или обновление через консоль (windows и linux). Вот их описание.

Примечание. Все команды, начинающиеся с ```iobroker```, можно вызывать из любого каталога, в котором доступна команда ioBroker. Команда ```npm install``` должна вызываться из корневого каталога ioBroker.

Возможны следующие команды:

- [npm install iobroker.adapterName] (# npm-install-iobrokeradaptername)
- [Иоброкер старт] (# iobroker-старт)
- [iobroker stop] (# iobroker-stop)
- [iobroker restart] (# iobroker-restart)
- [iobroker isrun] (# iobroker-isrun)
- [iobroker start имя-адаптера.instance] (# iobroker-start-adapternameinstance)
- [iobroker stop stop adapterName.instance] (# iobroker-stop-adapternameinstance)
- [iobroker перезапустить имя_адаптера.instance] (# iobroker-restart-adapternameinstance)
- [iobroker добавить имя адаптера \ [- включено \] \ [- хост \ <хост \> \] \ [- порт \ <порт \> \]] (# iobroker-add-adaptername)
- [iobroker установить имя адаптера] (# iobroker-install-adaptername)
- [iobroker загрузить имя адаптера] (# iobroker-upload-adaptername)
- [Настройка iobroker] (# iobroker-setup)
- [iobroker del адаптерName] (# iobroker-del-adaptername)
- [iobroker del adapName.instance] (# iobroker-del-adapternameinstance)
- [iobroker update \ [URL-адрес хранилища \] \ [- обновляемый \]] (# iobroker-update-repository-url)
- [Обновление iobroker \ [URL хранилища \]] (# обновление iobroker)
- [iobroker upgrade self \ [URL-адрес хранилища \]] (# iobroker-upgrade-self)
- [имя адаптера обновления iobroker \ [URL-адрес хранилища \]] (# iobroker-upgrade-имя-адаптера)
- [iobroker object get objectId] (# iobroker-object-get)
- [iobroker объект chmod \ <object-mode\> \ [состояние-режим \] \ <id\> ] (# Iobroker-объект-CHMOD)
- [iobroker object chown \ <пользователь \> \ <group \> \ <id \>] (# iobroker-object-chown)
- [Список объектов iobroker \ <id \>] (# список объектов iobroker)
- [iobroker set \ <instance \> \ [settings \]] (# iobroker-set)
- [iobroker state get objectId] (# iobroker-state-get)
- [iobroker state getplain objectId] (# iobroker-state-getplain)
- [iobroker state getvalue objectId] (# iobroker-state-getvalue)
- [iobroker State Set ObjectId newValue] (# iobroker-state-set)
- [iobroker state del objectId] (# iobroker-state-del)
- [Сообщение iobroker \ <адаптер \> \ [. instanceid \] \ <команда \> \ [\ message \]] (# сообщение iobroker)
- [настройка iobroker] (# iobroker-state-setplain)
- [iobroker clean] (# iobroker-clean)
- [резервное копирование iobroker] (# резервное копирование iobroker)
- [iobroker host] (# iobroker-host)
- [iobroker host set] (# iobroker-host-set)
- [iobroker host remove] (# iobroker-host-remove)
- [восстановление iobroker \ <имя или путь к резервной копии \>] (# восстановление iobroker)
- [iobroker list \ <type \> \ [pattern \]] (# iobroker-list)
- [iobroker chmod \ <mode \> \ [pattern \]] (# iobroker-chmod)
- [iobroker chown \ <пользователь \> \ [group \] \ [pattern \]] (# iobroker-chown)
- [iobroker adduser \ <пользователь \> \ [- группа группы \] \ [- пароль пароль \]] (# iobroker-adduser)
- [iobroker deluser \ <пользователь \>] (# iobroker-deluser)
- [iobroker passwd \ <пользователь \> \ [- пароль пароль \]] (# iobroker-passwd)
- [чтение файла iobroker \ <toRead \> \ [toWrite \]] (# чтение файла iobroker)
- [iobroker file write \ <toRead \> \ <toWrite \>] (# iobroker-file-write)
- [версия iobroker \ [имя_адаптера \]] (# версия iobroker)
- [iobroker uuid] (# iobroker-uuid)
- [статус iobroker] (# статус iobroker)
- [iobroker repo \ [repoName \]] (# iobroker-repo)
- [Информация о iobroker] (# информация iobroker)
- [iobroker compact status] (# iobroker-compact-status)
- [iobroker compact \ [enable | disable | on | off \]] (# iobroker-compact-enabledisableonoff)
- [iobroker compact adapterName.instance] (# iobroker-compact-adapternameinstance)
- [iobroker cert create] (# iobroker-cert-create)
- [iobroker logs \ [- watch \]] (# iobroker-logs)

** Примечание: ** есть параметр ```--timeout 5000```, который можно использовать с любой командой. Указывает время ожидания в мс для подключения к БД.

## Npm установить iobroker.adapterName
Эта команда должна вызываться из корневого каталога ioBroker (обычно ```/opt/iobroker``` или ```C:\Program Files\ioBroker```). Он использует менеджер npm для установки или обновления данного адаптера или js-контроллера. Он работает всегда, даже если проблемы возникают у «admin» или «js-controller».

Примеры использования:

- `` `npm install iobroker.admin``` - обновить или установить" admin "адаптер
- `` `npm install iobroker.js-controller``` - обновить или установить сам js-контроллер
- `` `npm install https:// github.com / husky-koglhof / ioBroker.hmm / tarball / master /` `` - установите адаптер прямо из github или из другого места. Это должен быть пакет ZIP или GZ и содержимое файла package.json.

Если адаптер был установлен, после вызова ```npm install ..``` необходимо выполнить перезапуск указанного адаптера или всего js-контроллера, чтобы изменения были активны.

Это можно сделать с помощью ```iobroker restart adapterName``` или просто ```iobroker restart```. Подробнее см. [Вот](#restart).

*** Примечание: *** могут быть установлены только пакеты с именем **ioBroker.zzz**

## Iobroker start
Запускает iobroker как демон. Если ioBroker еще не запущен, вы получите предупреждение:

```ioBroker controller daemon already running. PID: xx```

*** Примечание для Windows: *** обычно ioBroker под Windows запускается как служба. Эта команда запустит второй экземпляр ioBroker, и это приведет к конфликту. Используйте ```serviceIoBroker.bat start``` из каталога ioBroker вместо команды ```iobroker start```. Для запуска службы у вас должны быть права администратора.

## Иоброкер стоп
Останавливает iobroker, если он работает как демон. Если ioBroker не запущен, вы получите предупреждение:

```ioBroker controller daemon is not running```

*** Примечание для Windows: *** обычно ioBroker под Windows запускается как служба. Эта команда не будет иметь никакого эффекта. Используйте ```serviceIoBroker.bat stop``` из каталога ioBroker вместо команды ```iobroker stop```. У вас должны быть права администратора, чтобы остановить службу.

## Перезагрузка iobroker
Просто команды остановки и запуска вместе. Смотри выше.

## Iobroker isrun
Возвращает фактический статус ioBroker. Это началось или нет. Если ioBroker не запущен, код возврата равен 100.

То же, что ```iobroker status```.

## Iobroker запускает adapterName.instance
Вы можете запустить указанный адаптер из консоли. Он будет автоматически включен и запущен.

Если адаптер был запущен, он будет перезапущен.

В «admin» вы можете контролировать, что экземпляр адаптера теперь включен.

Применение:

- `` `iobroker start email.0``` - включает и запускает экземпляр адаптера ioBroker.email.0

Примечание: вы можете вызвать ```iobroker start all```, чтобы запустить все отключенные экземпляры, например, после восстановления.

## Остановка iobroker adapterName.instance
Вы можете остановить указанный адаптер из консоли. Он будет отключен и остановлен. Это не будет перезапущено автоматически позже.

В «admin» вы можете контролировать, что экземпляр адаптера теперь отключен.

Применение:

- `` `iobroker stop email.0``` - включает и запускает экземпляр адаптера ioBroker.email.0

## Iobroker перезапустить адаптерName.instance
Просто перезапускает указанный адаптер. Если он был отключен, он будет включен.

## Iobroker добавить имя_адаптера
Полный синтаксис: ```iobroker add adapterName [desiredInstanceNumber] [--enabled] [--host \<host\>] [--port \<port\>]```

Устанавливается, если не установлен, и создает экземпляр указанного адаптера. Если экземпляр адаптера еще существует, будет использован следующий номер экземпляра.

Есть несколько дополнительных параметров:

- enabled: экземпляр адаптера будет автоматически включен после создания, в противном случае для этого будет использоваться предопределенное значение адаптера.
- host: Имя хоста, на котором должен быть создан экземпляр адаптера. Вы можете получить список хостов с помощью команды `` `iobroker list hosts```. (Еще не реализовано)
- порт: если адаптер имеет настройки native.port, он будет установлен на нужное значение после установки.
- требуемый номер экземпляра: вы можете указать желаемый номер экземпляра.

Применение:

- `` `iobroker add dwd``` - Установить и создать экземпляр адаптера dwd.
- `` `iobroker add admin --enabled --port 80``` - создать второй (обычно) экземпляр адаптера администратора на порту 80 и включить его.

Если эта команда не работает, вы всегда можете использовать команду ```npm install iobroker.adapterName``` для принудительного обновления или установки. Экземпляр не будет создан, вы должны вызвать команду ```iobroker add iobroker.adapterName``` еще раз.

## Iobroker установить имя адаптера
Устанавливает адаптер только в ioBroker и не создает экземпляр. Если адаптер еще не установлен, вы получите следующее предупреждение:

```adapter "admin" yet installed. Use "upgrade" to install newer version.```

## Iobroker загрузить имя адаптера
Загрузите веб-страницы из папок "www" и "admin" в адаптере в хранилище файлов ioBroker. Обычно используется разработчиками для просмотра изменений, внесенных на страницах конфигурации или на страницах "www".
Вы не можете изменить файлы непосредственно в «iobroker / iobroker-data / adapter / file». Для разработчиков в конфигурационном файле (* iobroker-data / iobroker.json *) установлен объект objects.noFileCache, чтобы отключить кэш файла. Если для этого флага установлено значение true (разумеется, новый запуск необходим после изменения файла конфигурации), изменения в каталоге iobroker-data будут видны в Интернете без команды ```iobroker upload adapterName```.

Примечание. Вы можете позвонить ```iobroker upload all```, чтобы загрузить все адаптеры, например, после восстановления.

## Настройка iobroker
Эта команда должна вызываться, если ioBroker был установлен не с помощью npm или установщика Windows (например, только что скопированный с github и распакованный). Он создает файл конфигурации по умолчанию и подготавливает каталоги данных.

Вы можете вызвать эту команду с параметром «first», чтобы быть уверенным, что ничего не будет перезаписано, если конфигурация еще существует.

Применение:

```iobroker setup first``` - create configuration files if not yet created.

## iobroker setup custom
To enable multi-host configuration (experimental) this command must be called. Following questions must be answered:
<pre><code>
Type of objects DB [file, couch, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]: enter IP address of the main system
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]:
Host of states DB (file), default[ip]:
Port of states DB (file), default[9000]:
</code></pre>
You can just press ENTER to take the default value shown in \[\].

**Note:** at the moment only *file* DB type is supported. If you change the ports you must be an expert.

**Note:** Check the firewall settings on the main host for the defined ports (9000/9001).

## iobroker del adapterName
Completely removes all instances and states of this adapter from ioBroker and deletes it on the disk.

You cannot restore settings of the adapter instances after deletion.

Usage:
```iobroker del dwd``` - deletes all instances and code of adapter dwd from ioBroker.

## iobroker del adapterName.instance
Removes only specified instance of this adapter from ioBroker and **not** deletes it from the disk.

You cannot restore settings of the adapter instance after deletion.

Usage:
```iobroker del dwd.0``` - deletes instance 0 of adapter dwd from ioBroker.

## iobroker update \[repository url\]
Full syntax: ```iobroker update \[repository url\]```

Прочтите информацию из настроенного репозитория ioBroker. Если установлено ```\repository url\```, информация будет считываться из этого хранилища.

Применение:

- `` `iobroker update``` - Вывести список доступных версий из настроенного (обычно локального) хранилища.
- `` `iobroker update https:// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json``` - Вывести список доступных версий из онлайн-хранилища.

```
>./iobroker.js update
Cannot get version of "virtual".
Cannot get version of "geofency".
update done
Adapter    "zwave"         : 0.1.0
Adapter    "yr"            : 0.1.2    , installed 0.1.2
Adapter    "web"           : 0.2.6    , installed 0.2.6
Adapter    "vis"           : 0.2.9    , installed 0.2.9
Adapter    "virtual"
Adapter    "sonos"         : 0.1.5    , installed 0.1.4 [Updateable]
Adapter    "rickshaw"      : 0.2.1    , installed 0.2.1
Adapter    "pushover"      : 0.1.0
Adapter    "onkyo"         : 0.0.4
Adapter    "telnet"        : 0.0.0
Adapter    "socketio"      : 0.2.3    , installed 0.2.3
Adapter    "simple-api"    : 0.0.3    , installed 0.0.3
Adapter    "sayit"         : 0.3.0    , installed 0.3.0
Adapter    "ping"          : 0.1.3    , installed 0.1.3
Adapter    "node-red"      : 0.1.5    , installed 0.1.5
Adapter    "mqtt"          : 0.1.6    , installed 0.1.5 [Updateable]
Adapter    "mobile"        : 0.0.2
Adapter    "legacy"        : 0.1.12
Adapter    "knx"           : 0.0.1
Controller "js-controller" : 0.5.14   , installed 0.5.14
Adapter    "javascript"    : 0.2.3    , installed 0.2.3
Adapter    "ical"          : 0.0.2    , installed 0.0.1 [Updateable]
Adapter    "hmm"           : 0.0.15   , installed 0.0.16
Adapter    "hue"           : 0.2.0    , installed 0.2.0
Adapter    "hm-rpc"        : 0.3.5    , installed 0.3.4 [Updateable]
Adapter    "hm-rega"       : 0.1.17   , installed 0.1.17
Adapter    "history"       : 0.1.3    , installed 0.1.3
Adapter    "highcharts"    : 0.0.0
Adapter    "graphite"      : 0.1.0
Adapter    "geofency"
Adapter    "example"       : 0.1.1    , installed 0.1.1
Adapter    "email"         : 0.1.0
Adapter    "dwd"           : 0.1.7    , installed 0.1.7
Adapter    "cul"           : 0.0.2    , installed 0.0.3
Adapter    "b-control-em"  : 0.1.1
Adapter    "artnet"        : 0.0.3
Adapter    "admin"         : 0.3.21   , installed 0.3.20 [Updateable]
```

Эта команда ничего не меняет, просто обновляет внутреннюю информацию о доступной версии адаптера и показывает ее.

Для отображения только обновляемых адаптеров используйте фильтр «--updatable».

## Обновление iobroker
Полный синтаксис: ```iobroker upgrade \[repository url\]```

Обновляет все адаптеры (не JS-контроллер), если они доступны с более новой версией в указанном хранилище. Если ссылка на репозиторий не указана, будет использоваться настроенный репозиторий.

Применение:

- `` `iobroker upgrade``` - обновить все адаптеры.
- `` `обновление iobroker https:// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json``` - обновить все адаптеры из онлайн-хранилища

## Iobroker обновить себя
Полный синтаксис: ```iobroker upgrade self \[repository url\]```

Эта команда обновляет ioBroker.js-controller до версии, которая будет найдена в репозитории.

** Примечание: ** Если указанный или настроенный репозиторий имеет более низкую версию, он будет понижен до этой версии.

- `` `iobroker upgrade self``` - обновить js-контроллер до версии в настроенном хранилище.
- `` `iobroker самостоятельно обновить https:// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json``` - обновить js-контроллер до версии из онлайн-хранилища.

## Iobroker обновить имя адаптера
Полный синтаксис: ```iobroker upgrade adapterName \[repository url\]```

Эта команда обновляет указанный адаптер до версии, которая будет найдена в хранилище.

** Примечание: ** Если указанный или настроенный репозиторий имеет более низкую версию, он будет понижен до этой версии.

- `` `iobroker upgrade email``` - обновить адаптер ioBroker.email до версии в настроенном хранилище.
- `` `iobroker обновляет электронную почту https:// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json``` - обновить адаптер ioBroker.email до версии из онлайн-хранилища ,

## Iobroker объект get
Полный синтаксис: ```iobroker get objectId```

Читает из командной строки описание объекта: C: \ pWork> iobroker object get system.adapter.admin.0.uptime

```
>./iobroker object get system.adapter.admin.0.uptime
{
  "_id":"system.adapter.admin.0.uptime",
  "type":"state",
  "common":{"name":"admin.0.uptime","type":"number","role":"indicator.state","unit":"seconds"},
  "native":{}
}
```

** Примечание: ** Обычно выходные данные не форматируются, но вы можете использовать флаг "--pretty" для их форматирования.

## Iobroker объект chmod
Формат: ```iobroker object chmod <object-mode> [state-mode] <id>```

Идентификатор может быть шаблоном с '\ *'. '\ *' может быть только в конце шаблона.

## Iobroker объект chown
Формат: ```iobroker object chown <user> <group> <id>```

Идентификатор может быть шаблоном с '\ *'. '\ *' может быть только в конце шаблона.

## Список объектов iobroker
Формат: ```iobroker object list <id>```

Список разрешений объектов, таких как:

```
>iobroker object list system.adapter.admin.*

ObjectAC | StateAC |     User     |     Group    | ID
---------+---------+--------------+--------------+--------------
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.uptime
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memRss
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapTotal
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapUsed
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.connected
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.alive
rw-r--r--                    admin  administrator system.adapter.admin.0
```

Идентификатор может быть шаблоном с '\ *'. '\ *' может быть только в конце шаблона.

## Iobroker set
Полный синтаксис: ```iobroker set <instance> [--port value] [--enabled true|false] [--ip address] [--auth true|false] [--secure true|false] [—-ttl value]``` Используется для изменения настроек экземпляра из консоли. Следующие настройки могут быть изменены:

- порт - изменить порт, к которому привязан экземпляр
- enabled - включить / отключить экземпляр (также можно сделать с помощью `` `iobroker start | stop <instance>` ``)
- ip - изменить привязанный IP-адрес
- auth - включить или отключить аутентификацию
- secure - включить или выключить протокол SSL
- ttl - время ожидания входа в секундах

## Iobroker государство получить
Полный синтаксис: ```iobroker state get stateId``` Прочитайте значение JSON состояния:

```
>./iobroker state get system.adapter.admin.0.uptime
{"val":496,"ack":true,"ts":1425925626,"from":"system.adapter.admin.0","lc":1425925626}
```

Вы можете использовать флаг «--pretty» для форматирования вывода:

```
>./iobroker state get system.adapter.admin.0.uptime --pretty
{
  "val": 496,
  "ack": true,
  "ts": 1425925626,
  "from": "system.adapter.admin.0",
  "lc": 1425925626
}
```

## Iobroker State Getplain
Полный синтаксис: ```iobroker state getplain stateId```

Прочитать обычное значение состояния в виде списка атрибутов:

```
>./iobroker state getplain system.adapter.admin.0.uptime
571
true
system.adapter.admin.0
1425925701
1425925701
```

## Iobroker State getvalue
Полный синтаксис: ```iobroker state getvalue stateId```

Прочитать обычное значение состояния в виде списка атрибутов:

```
>./iobroker state getvalue system.adapter.admin.0.uptime
571
```

## Набор состояний iobroker
Полный синтаксис: ```iobroker state set stateId newValue ack```

Установите значение состояния. "ack по умолчанию = false.

```>iobroker state set sayit.0.tts.text "Текст сказать"```

```>iobroker state set adapter.0.states.temperature 28.5 true```

Если идентификатор неверен, сообщения об ошибке нет.

## Иоброкер Стейт дель
Полный синтаксис: ```iobroker state del stateId```

Убери государство.

## Сообщение iobroker
Полный синтаксис: ```iobroker message adapter.instance command message```

Отправьте сообщение данному экземпляру адаптера или всем экземплярам адаптера, если экземпляр не задан.

## Иоброкер чистый
Очищает все настройки ioBroker. **Вы не можете восстановить настройки, если вы вызываете эту команду.**

```
>iobroker clean yes
Deleted 205 objects.
Restarting ioBroker...
```

## Резервное копирование iobroker
Резервное копирование настроек ioBroker в zip-файле. Файлы резервных копий будут созданы в каталоге _backups_ и будут иметь имена:

```2015_02_10-17_49_45_backupIoBroker.tar.gz``` with current date and time.

**Note:** not yet finished

## iobroker restore
Full syntax: ```iobroker restore <backup name or path>```

Если некоторые резервные копии были созданы с помощью команды ```iobroker backup```, то их можно восстановить. Если вы вызываете функцию восстановления без параметров, вы получите список доступных резервных копий.

```
/>iobroker restore
Please specify one of the backup names:
   2015_07_18-12_20_28_backupIoBroker.tar.gz or 2015_07_18-12_20_28 or 0
   2015_07_17-21_54_01_backupIoBroker.tar.gz or 2015_07_17-21_54_01 or 1
```

Вы можете позвонить ```iobroker restore 0```, чтобы использовать последний файл резервной копии или какой-либо другой индекс.
Следующие команды одинаковы для данного примера:

- iobroker восстановить 0
- iobroker 2015_07_18-12_20_28
- iobroker 2015_07_17-21_54_01_backupioBroker.tar.gz
- iobroker /opt/iobroker/backups/2015_07_17-21_54_01_backupioBroker.tar.gz

Все адаптеры будут восстановлены как отключенные, кроме «admin». Чтобы включить все адаптеры одновременно, вы можете позвонить «iobroker start all». Если некоторые адаптеры не загружены, вы можете позвонить «iobroker upload all», чтобы загрузить все файлы адаптера одновременно.

## Хост iobroker
Изменить имя хоста в объектах.

Иногда при перемещении данных iobroker из одной системы в другую требуется изменить имя хоста. С помощью этой команды она может быть выполнена.

Вы должны остановить ioBroker до этого.

Чтобы заменить определенное имя хоста в БД на текущее имя хоста, напишите ```iobroker host oldHostName```.

Чтобы изменить любое имя хоста (должна быть только одна хост-система, а не для нескольких хостов), напишите ```iobroker host this```.

## Хост хост iobroker
Вы можете изменить имя хоста на какое-то конкретное (не имя компьютера). Для этого вы должны написать: ```iobroker host set newHostName```, чтобы переименовать с фактического имени компьютера или ранее указанного имени хоста.

## Хост iobroker удалить
Чтобы удалить хост, просто напишите ```iobroker host remove hostNameToRemove```. Будьте осторожны, пожалуйста.

## Список iobroker
С помощью этой команды можно показывать различные типы объектов и состояний в ioBroker. Примеры:

- `` `список объектов iobroker hm-rega.0``` - показать все объекты экземпляра hm-rega.0
- `` `список состояний iobroker hm-rega.0``` - показать все состояния экземпляра hm-rega.0
- `` `iobroker list files vis.0``` - показать все файлы экземпляра vis.0
- `` `список экземпляров iobroker``` - показать все экземпляры
- `` `список адаптеров iobroker``` - показать все адаптеры
- `` `iobroker list users``` - показать всех пользователей
- `` `iobroker list groups``` - показать все группы
- `` `iobroker list enums``` - показать все перечисления
- `` `iobroker list hosts``` - показать всех хостов

Можно использовать короткие имена типов:

- о - объекты
- s - состояния
- вы - пользователи
- e - enums
- г - группы
- я - экземпляры
- f - файлы
- ч - хозяева

Например. ```iobroker l u``` - список всех пользователей.

С «списком экземпляров» вы можете использовать дополнительные фильтры:

- enabled - перечислить все включенные экземпляры
- отключено - список всех отключенных экземпляров
- порт - список всех экземпляров с портом
- ip - перечислить все экземпляры, которые могут быть связаны с каким-либо IP
- ssl - перечислить все экземпляры, где можно включить SSL

Использование: ```iobroker list instances --enabled``` для отображения всех включенных экземпляров

или ```iobroker l i --port``` для отображения списка используемых портов.

## Iobroker adduser
Эта команда позволяет создать нового пользователя (по умолчанию в группе «администратор»). Группу можно определить в команде с параметром «--ingroup». Если пароль не указан, его необходимо ввести с консоли.
Например. создать пользователя "martin" в группе "user":

```iobroker adduser martin --group user```

Создать пользователя с паролем:

```iobroker adduser martin --group user --password 12345```

## Iobroker deluser
Чтобы удалить существующего пользователя, позвоните:

```iobroker deluser username```

Пользователь будет автоматически удален из всех групп. Пользователь "admin" не может быть удален.

## Iobroker passwd
Чтобы изменить пароль существующего звонка пользователя:

```iobroker passwd username```

Вам будет предложено ввести пароль и повторить пароль.
Если взаимодействие с консолью не требуется, позвоните:

```iobroker passwd username --password newPassword```

## Iobroker chmod
Изменить режим файла.

## Иоброкер чоун
Сменить владельца файла.

## Чтение файла iobroker
Считайте файл из БД и сохраните его в локальной файловой системе.
Применение:

```iobroker file read <fileToRead> [storeFile]```

storeFile является необязательным, но может быть путем к каталогу или новому файлу.

Пример:

```iobroker file read /vis.0/main/img/picture.png /opt/myfile.png```

„File“ и „read“ можно сократить до „f r“.

## Запись файла iobroker
Записать файл из локальной файловой системы в БД.
Применение:

```iobroker file write <fileToRead> <storeFile>```

storeFile может быть путем к директории в БД или полным именем

Пример: запись файла iobroker /opt/myfile.png /vis.0/main/img/picture.png

«File» и «write» можно сократить до «f w».

## Версия iobroker
Показать версию адаптера или js-контроллера.

Версия js-контроллера:

```
>iobroker version
0.11.2
>iobroker -v
0.11.2
>iobroker --version
0.11.2
```

Версия адаптера администратора:

```
>iobroker version admin
1.5.4
>iobroker admin -v
1.5.4
>iobroker admin --version
1.5.4
```

## Iobroker uuid
Показать UUID этой установки ioBroker.

```
>iobroker uuid
8f73s7c9-2fd6-3066-189a-cccccccccc
```

## Статус iobroker
Если ioBroker работает или нет.

## Iobroker РЕПО
Показать настроенные репозитории или выбрать один.

```
C:\ioBroker>ioBroker repo
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: fast
```

```
C:\ioBroker>ioBroker repo default
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: default
```

## Информация о iobroker
Соберите информацию об этом хосте.

```
Platform       : Windows
Architecture   : x64
CPUs           : 4
Speed          : 2496 MHz
Model          : Intel(R) Core(TM) i7-7660U CPU @ 2.50GHz
RAM            : 15.9 GB
System uptime  : 13d. 13:18:04
Node.js        : v8.11.1
adapters count : 176
Disk size      : 949.9 GiB
Disk free      : 813.3 GiB
NPM            : v5.8.0
```

## Iobroker компактный статус
** Доступно с JS-контроллера 2.0.0 **

Отображает состояние компактного режима для текущего хоста.

```
Compact mode for this host is currently enabled
```

## Iobroker compact [включить | отключить | вкл | выкл]
** Доступно с JS-контроллера 2.0.0 **

Позволяет включить или отключить компактный режим для текущего хоста. Сначала выводится текущее состояние, а затем вносятся изменения.

```
Compact mode for this host is currently disabled

Compact mode for this host changed to enabled
```

Folgende Befehle sind möglich:

- `enable / on` - активировать Compact-Modus для ioBroker
- `отключить / выключить` - отключить Compact-Modus для ioBroker

## Компактный адаптер iobrokerName.instance
** Доступно с JS-контроллера 2.0.0 **

Эта команда позволяет проверить и изменить конфигурацию в компактном режиме экземпляра адаптера.
Все настройки (см. Статус) всегда отображаются, включая внесенные изменения.

Все изменения также могут быть сделаны во время работы ioBroker. Экземпляры адаптера могут быть перезапущены.

Доступны следующие комбинации:

### Компактный адаптерName.instance status
Отображение текущего состояния и текущих настроек экземпляра.

```
Compact mode supported: true
Compact mode enabled:   true
Compact group:          0
```

Значение полей:

* Поддерживается компактный режим: адаптер обычно поддерживает компактный режим
* Включен компактный режим: этот экземпляр запускается в компактном режиме
* Компактная группа: экземпляр запускается в компактной группе, как указано. 0 означает «в главном процессе контроллера js этого хоста» (более высокий риск, меньше оперативной памяти). > 0 означает отдельный хост-процесс (меньше риска, но требуется немного больше оперативной памяти)

### Компактное имя_адаптера.instance group &lt; идентификатор группы &gt;
Устанавливает группу компактных режимов экземпляра

```
Compact mode supported: true
Compact mode enabled:   true
Compact group:          0 --> 1
Instance settings for "simple-api.0" are changed.
```

### Compact adapterName.instance &lt; disable | off &gt;
Деактивирует компактный режим для экземпляра.

```
Compact mode supported: true
Compact mode enabled:   true --> false
Compact group:          1
Instance settings for "simple-api.0" are changed.
```

### Компактная группа адаптеров_имя.instance &lt; enable | on &gt; [Группа-ID]
Активирует компактный режим для экземпляра и (необязательно) устанавливает группу в том же вызове:

```
Compact mode supported: true
Compact mode enabled:   false --> true
Compact group:          0 --> 1
Instance settings for "simple-api.0" are changed.
```

## Iobroker сертификат создать
Создает новый сертификат SSL для установки ioBroker, вводит его в систему в качестве стандартного сертификата и также выдает его.

```
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----

-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----

The object "system.certificates" was updated successfully.
```

## Журналы iobroker
Показать последние строки и отслеживать журнал ioBroker.

Эта команда показывает последние 1000 строк журнала и отслеживает журнал:

```iobroker logs --lines 1000```

Для мониторинга журнала добавьте `--watch`, как здесь:

```iobroker logs --lines 100 --watch```