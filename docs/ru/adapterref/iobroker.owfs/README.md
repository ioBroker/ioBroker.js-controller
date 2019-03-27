---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.owfs/README.md
title: Адаптер ioBroker OWFS
hash: w4iaPF0/v9YW60yr3gLQaEQPm5p2VBWypsVIKvgvFQk=
---
![логотип](../../../en/adapterref/iobroker.owfs/admin/owfs.png)

![Количество установок](http://iobroker.live/badges/owfs-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.owfs.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.owfs.svg)
![NPM](https://nodei.co/npm/iobroker.owfs.png?downloads=true)

# IoBroker Адаптер OWFS
## *Однопроводный адаптер файловой системы* для ioBroker.
поддержанный

Этот адаптер использует библиотеку owfs с https://www.npmjs.com/package/owjs и соответственно требует сервера owfs.

## Установить OWFS Linux
```sudo apt-get install owfs```

Иногда вам нужно написать следующие шаги:

- Для запуска сервера для связи через последовательный интерфейс с датчиками 1wire

```
owserver -d "/dev/ttyUSB0" --nozero
```

* / dev / ttyUSB0 * - это имя вашего последовательного устройства. Для этого использовалась флешка.

Эта команда запускает 1wire-сервер на локальном порту 4304.

- Чтобы показать данные с локального сервера 1wire в файловой системе, выполните следующую команду:

```
owfs -C -m /mnt/1wire --allow_other
```

Прежде чем вы должны создать директрой */ mnt / 1wire* с командой `mkdir /mnt/1wire`

## Установить окна OWFS
http://sourceforge.net/projects/owfs/

## Установить
```node iobroker.js add owfs```

## Конфигурация

## Changelog
### 0.5.0 (2018-03-16)
* (bluefox) Ready for Admin3

### 0.4.1 (2017-05-29)
* (ausHaus) fix translations

### 0.4.0 (2017-02-26)
* (bluefox) support iButtons

### 0.3.4 (2016-08-28)
* (bluefox) filter out service entries by list

### 0.3.3 (2016-08-25)
* (bluefox) custom poll interval for every sensor

### 0.3.2 (2016-08-24)
* (bluefox) support of local OWFS via file system

### 0.2.2 (2016-07-29)
* (bluefox) add new datapoints: pressure, volts, ...

### 0.2.1 (2016-07-28)
* (bluefox) fixes of write

### 0.2.0 (2016-07-27)
* (bluefox) discover sensors
* (bluefox) use other npm library to fix write

### 0.1.1 (2016-07-25)
* (bluefox) check configuration

### 0.1.0 (2016-07-08)
* (bluefox) remove rooms
* (bluefox) fix creation of states
* (bluefox) convert states to numbers
* (bluefox) support of quality codes

### 0.0.1 (2014-11-02)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2015-2018, bluefox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.