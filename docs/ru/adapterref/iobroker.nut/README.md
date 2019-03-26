---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nut/README.md
title: ioBroker.nut
hash: 4SodBEOGgVC7xNDqnGGZNac7CikqEi3lP5gVhp2Mgd8=
---
![логотип](../../../en/adapterref/iobroker.nut/admin/nut.png)

![Количество установок](http://iobroker.live/badges/nut-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.nut.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nut.svg)
![Трэвис-CI](http://img.shields.io/travis/Apollon77/ioBroker.nut/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.nut?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.nut.png?downloads=true)

# IoBroker.nut
[![Значок Greenkeeper] (https://badges.greenkeeper.io/Apollon77/ioBroker.nut.svg)](https://greenkeeper.io/)

[![Изменение климата] (https://codeclimate.com/github/Apollon77/ioBroker.nut/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.nut)

Этот адаптер для ioBroker подключается к определенному серверу NUT, чтобы предоставить состояние и подробную информацию о подключенном ИБП / USV в состоянии ioBroker, чтобы его можно было использовать там.

## Описание параметров
### Host_ip
IP-адрес NUT-сервера. NUT должен работать в режиме сервера и должен быть доступен компьютеру, на котором работает адаптер NUT iobroker. Поэтому проверьте настройки брандмауэра, если у вас есть проблемы, и разрешите доступ. Если ИБП подключен локально, вы также можете использовать 127.0.0.1 или localhost.

### Host_port
Порт ОРЕХОВО. Порт по умолчанию <b>3493</b>

### Ups_name
Имя ИБП, как определено в конфигурации NUT сервера NUT. </ P> Подсказка: если вы хотите подключиться к ИБП, подключенному к дисковой станции Synology, имя просто «ups».

### Update_interval
Интервал в секундах для обновления данных. По умолчанию 300

## UPS-Monitor уведомляет
Включен небольшой shell-скрипт linux в scripts / nut-notify.sh, который можно настроить в upsmon.

Сценарию нужны права на выполнение (chmod + x nut-notify.sh).

Его нужно добавить в /etc/nut/upsmon.conf, например:

```
NOTIFYCMD "cd /opt/iobroker/;./nut-notify.sh"
```

Дополнительно настройте все соответствующие уведомления, например:

```
NOTIFYFLAG ONLINE       SYSLOG+WALL+EXEC
NOTIFYFLAG ONBATT       SYSLOG+WALL+EXEC
NOTIFYFLAG LOWBATT      SYSLOG+WALL+EXEC
NOTIFYFLAG FSD          SYSLOG+WALL+EXEC
NOTIFYFLAG COMMOK       SYSLOG+WALL+EXEC
NOTIFYFLAG COMMBAD      SYSLOG+WALL+EXEC
NOTIFYFLAG SHUTDOWN     SYSLOG+WALL+EXEC
NOTIFYFLAG REPLBATT     SYSLOG+WALL+EXEC
NOTIFYFLAG NOCOMM       SYSLOG+WALL+EXEC
NOTIFYFLAG NOPARENT     SYSLOG+WALL+EXEC
```

Важным является добавленный флаг "EXEC".

Один простой пример для сценария nut-notify.sh:

```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```

## Поиск проблемы
Если у вас есть проблемы и адаптер не доставляет данные, вы можете использовать два сценария в каталоге «test» установки адаптера (как правило, в файле node_modules / iobroker.nut / test относительно вашего каталога установки iobroker), чтобы попробовать командная строка. Вызовите сценарии, используя «node filename.js», чтобы увидеть ожидаемые параметры. </ P>

* **test_upslist.js** подключается к серверу NUT и возвращает список доступных имен ИБП.
* **test_upsvars.js** подключается к серверу NUT для определенного ИБП и возвращает список доступных переменных ИБП.

## Сделать
* документы для веб-страницы

## Changelog

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (2018-03-28)
* Fix status parsing

### 1.1.1
* Enhance error handling

### 1.1.0
* Add possibility to call commands on the UPS

### 1.0.0
* change mode from schedule to deamon
* implement message support to receive messages from upsmon
* add status.severity to get one status about the USV with values idle, operating, operating_critical, action_needed, unknown

### 0.3.0
* add better usable status states under "status" channel

### 0.2.1
* finalizied initial version

### 0.1.0
* initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2016-2018 Apollon77 <ingo@fischer-ka.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.