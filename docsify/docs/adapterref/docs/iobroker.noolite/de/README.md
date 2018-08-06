![Logo](media/noolite.png)
ioBroker Noolite adapter
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.noolite.svg)](https://www.npmjs.com/package/iobroker.noolite)
[![Downloads](https://img.shields.io/npm/dm/iobroker.noolite.svg)](https://www.npmjs.com/package/iobroker.noolite)

[![NPM](https://nodei.co/npm/iobroker.noolite.png?downloads=true)](https://nodei.co/npm/iobroker.noolite/)

Lets control the Noolite devices from ioBroker.

***The adapter requires at least nodejs 4.x***

Actually only ethernet gateway PR1132 is supported.

## English
[по русски](#Русский)

## Install

```node iobroker.js add noolite```

### Information

### Configuration


### Ports

-------------------
## Русский        
Этот драйвер позволяет управлять noolite устройствами через USB адаптер (РС1ххх) или через Ethernet-шлюз PR1132.

Для управления устройствами с помощью USB адаптера под windows необходимо установить программу "nooLite control panel" и
прописать путь к exe файлу в настройках. Например:
```Windows exe: C:\Program Files (x86)\nooLite\noolite.exe```.

Под windows не нужно указывать TX USB Type т.к. коммуникация происходит через noolite.exe.

При использовании шлюза можно подключить до 4х различных датчиков температуры или влажности.

Приём команд на данный момент неработает, за неимением приёмного адаптера.

### Настройки


### Порты

## Changelog
### 0.2.0 (2016-04-30)
* (bluefox) USB adapter under windows
* (bluefox) RGB channel finished

### 0.0.1 (2016-03-11)
* (bluefox) initial commit
