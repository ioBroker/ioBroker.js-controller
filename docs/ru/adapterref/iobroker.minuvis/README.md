---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: PtKdcBxFW6bAM9g5DLZ2h08X+3N4W7T1cYrUKRtLNsU=
---
![логотип](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![Количество установок (последняя)](http://iobroker.live/badges/minuvis-installed.svg)
![Статус зависимости](https://img.shields.io/david/minukodu/iobroker.minuvis.svg)
![Известные уязвимости](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![Статус сборки](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

# IoBroker.minuvis
## Адаптер minuvis для ioBroker
Визуализация для всех устройств

## Инструкции
- установите адаптер как обычно
- создать экземпляр minuvis (возможно только 1)
- включить socket.io-Instance в веб-экземпляре

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

- открытый экземпляр minuvis

![экземпляр minuvis](https://minukodu.de/githubimg/minuvis_instance.jpg)

- подключиться к socket.io-порту сети или к вашему собственному socket.io-экземпляру

![подключения](https://minukodu.de/githubimg/minuvis_connect.jpg)

- добавить новую страницу

![добавить страницу](https://minukodu.de/githubimg/minuvis_addpage.jpg)

- добавить виджет

![добавить виджет](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

- изменить состояние

![выберите штат](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

- предварительно просмотреть новое приложение

![предварительный просмотр](https://minukodu.de/githubimg/minuvis_preview.jpg)

Для получения дополнительной информации посетите https://minukodu.de/en или посмотрите на YouTube https://youtu.be/dtHUBOEc4js

## Changelog
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