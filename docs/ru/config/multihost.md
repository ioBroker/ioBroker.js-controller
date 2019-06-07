---
title: Расширенная настройка - Multihost
lastChanged: 13.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/config/multihost.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: iUsdZPlFyCP1nI00DzyDR5xXg4WMHHyxGpZNnUP+j04=
---
# Операция с несколькими хостами
@@ Описание того, что хорошо, еще впереди.

## Мастер конфигурации
Выполните следующую команду на мастере:

** Этот шаг необходим, только если используется Redis DB. **

1. (только с Redis) `iobroker setup custom`

```
Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: f
Host / Unix Socket of objects DB(file), default[0.0.0.0]:
Port of objects DB(file), default[9001]:
Type of states DB [(f)file, (r)edis], default [file]: r
Host / Unix Socket of states DB (redis), default[127.0.0.1]: 0.0.0.0
Port of states DB (redis), default[6379]:
Data directory (file), default[../../../iobroker-data/]: /opt/iobroker/iobroker-data/
Host name of this machine [ioBroker-RasPi]:
```

2. `iobroker multihost enable`

``` enter pass phrase```

3. `sudo service iobroker restart`

## Конфигурация ведомого
Затем выполните следующую команду на ведомом устройстве:

** Этот шаг необходим, только если используется Redis DB. **

1. (только с Redis) `sudo iobroker setup custom`

```
Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: f
Host / Unix Socket of objects DB(file), default[127.0.0.1]: <MASTER-IP>
Port of objects DB(file), default[9001]:
Type of states DB [(f)file, (r)edis], default [file]: r
Host / Unix Socket of states DB (redis), default[<MASTER-IP>]:
Port of states DB (redis), default[6379]:
Host name of this machine [raspi-sub-1]:
creating conf/iobroker.json
```

2. `iobroker multihost connect`

```
1 |       <MASTER-IP> |  host |       192.168.86.42 | "authentication required"
Please select host [1]: 1
Enter secret phrase for connection: *****

Config ok. Please restart ioBroker: "iobroker restart"
```

2. `sudo service iobroker restart`

## Проблемы
иногда что-то вроде:

```> ... bytes ... in strict mode```

просто отредактируйте файл, в котором происходит событие, с помощью нано-редактора. В самом начале `'use strict';` прокомментируйте и прокомментируйте эту строку.

```> IP Address of the host is 127.0.0.1. It accepts no connections. Please change.```

если в основной системе это не было сделано ``` setup custom ```