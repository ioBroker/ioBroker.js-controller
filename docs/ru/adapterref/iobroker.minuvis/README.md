---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: tNrxYMcgsm7/fTwesDag94NQmL/cOWyFdQoRgiIDbB0=
---
![Логотип](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![Количество установок (последнее)](http://iobroker.live/badges/minuvis-installed.svg)
![Статус зависимости](https://img.shields.io/david/minukodu/iobroker.minuvis.svg)
![Известные уязвимости](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![Статус сборки](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

# IoBroker.minuvis
## Адаптер minuvis для ioBroker
Визуализация для всех устройств

########################################################################
# ВАЖНЫЙ !!!
при обновлении с версии <1.3.0 обратите внимание:

* место хранения конфигурационных файлов изменилось
* вы не можете сохранить ваш config-файл на старом месте
* читать config-файл с красной выпадающей кнопкой
* файл получит префикс "OF_"
* теперь сохраните конфигурационный файл
* префикс исчезнет, и конфигурационный файл будет сохранен на новом месте

########################################################################
## Инструкции
- установить адаптер как обычно
- создать экземпляр minuvis (возможно только 1)
- включить socket.io-Instance в веб-экземпляре

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

- открыть экземпляр minuvis

![экземпляр minuvis](https://minukodu.de/githubimg/minuvis_instance.jpg)

- подключитесь к socket.io-Port в сети или к вашему собственному экземпляру socket.io

![подключиться](https://minukodu.de/githubimg/minuvis_connect.jpg)

- добавить новую страницу

![добавить страницу](https://minukodu.de/githubimg/minuvis_addpage.jpg)

- добавить виджет

![добавить виджет](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

- редактировать состояние

![выберите штат](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

- Предварительный просмотр вашего нового приложения

![предварительный просмотр](https://minukodu.de/githubimg/minuvis_preview.jpg)

Для получения дополнительной информации посетите https://minukodu.de/en или посмотрите на YouTube https://youtu.be/dtHUBOEc4js

## Changelog
### 1.3.0 (2021-01-24)
* updated builder and app to V1.12.0
* new meta-datapoint "0_userdata.0" for storing config-files
### 1.2.0 (2020-12-06)
* updated builder and app to V1.11.0
### 1.1.0 (2020-12-01)
* updated builder and app to V1.10.0
### 1.0.0 (2020-11-22)
* create version V1.0.0 
### 0.0.12 (2020-11-19)
* updated builder and app to V1.9.0
### 0.0.11 (2020-11-15)
* updated builder and app to V1.8.0
### 0.0.10 (2020-10-04)
* updated builder and app to V1.6.0
### 0.0.9 (2020-09-27)
* updated builder and app to V1.5.0
### 0.0.8 (2020-09-16)
* bugfix number of buttons for valueswitcher
### 0.0.7 (2020-09-14)
* updated builder and app to V1.4.0
### 0.0.6 (2020-09-14)
* updated builder and app to V1.3.0
### 0.0.6 (2020-06-23)
* updated builder and app to V1.2.1
### 0.0.5 (2020-05-14)
* adaptions for iobroker.repositories
### 0.0.4 (2020-05-13)
* updated README.md
### 0.0.3 (2020-05-11)
* updated builder and app to V1.0.4
### 0.0.2 (2020-05-10)
* updated builder and app to V1.0.2
### 0.0.1 (2020-05-02)
* (svallant) initial release

## License
MIT License

Copyright (c) 2020 svallant <svallant@gmx.eu>

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