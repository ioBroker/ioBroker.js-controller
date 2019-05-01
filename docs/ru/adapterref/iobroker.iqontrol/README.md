---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iqontrol/README.md
title: без названия
hash: xijUS6BbpAAnc+2Vym97gcsN4+HERo6RkUFHbVMvJRg=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![Статус зависимости](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![Известные уязвимости](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

<h1><img src="admin/iqontrol.png" width="64"/> ioBroker.iqontrol </h1>

## Адаптер iqontrol для ioBroker
Быстрое веб-приложение для визуализации.

![пример](img/screenshot1.jpg) ![пример](../../../en/adapterref/iobroker.iqontrol/img/screenshot2.jpg)

Работает в любом браузере.
Вы можете сохранить его как веб-приложение на домашнем экране iOS, и оно будет выглядеть как нативное приложение.
Это полностью настраиваемый.

## Как пользоваться
* Начните создавать представления.

Вы можете рассматривать представления как страницы.

* Затем создайте устройства на этих представлениях.

У устройств есть роль, которая определяет функцию устройства, какие значки используются и так далее.
В зависимости от этой роли вы можете связать несколько состояний с устройством. Это даст устройству его функциональность.
Если вы выберете «Ссылка на другой вид» в качестве роли, вы сможете создавать ссылки на другие виды. Я предлагаю скины Ссылки на другие виды с тем же фоном, который есть у связанного вида.
Вы также можете попробовать использовать функцию автоматического создания, чтобы выбрать существующее устройство из дерева объектов iobroker. Autocreate пытается выяснить роль и сопоставить как можно больше состояний.

* После этого вы можете создать панель инструментов, которая отображается в нижнем колонтитуле.

Панель инструментов-Entrys - это ссылки на виды.
Первая панель инструментов будет вашей «Домашней панелью» и будет загружена при запуске.

* Чтобы придать всему модный стиль, вы можете загрузить свои собственные изображения.

Вы можете использовать свои изображения в качестве фоновых изображений для представлений или для устройств.
Бесплатные встроенные демо-обои от www.pexels.com.

## Известные проблемы
Это первый альфа-релиз, поэтому может быть много ошибок. Но для меня это работает абсолютно стабильно.
Однако есть несколько ограничений:

- Загрузка изображений (в качестве фоновых изображений или для кнопок устройств оформления) работает, но переименование и удаление не работает
- Создание и удаление подкаталогов также не работает.

Вы можете сделать эти операции вручную через ftp в iobroker / iobroker-data / files / iqontrol / userimages

Пожалуйста, не стесняйтесь комментировать и дайте мне знать, как исправить эти проблемы!

Посетите [форум iobroker](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol).

## Changelog

### 0.0.10
* (Sebastian Bormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (Sebastian Bormann) "Philips HUE added to autocreate (colortemp is not working yet!).  
* (Sebastian Bormann) LinkedView now also works on windows, doors and fire-sensor.
* (Sebastian Bormann) Added translation (thanks ldittmar!).

### 0.0.8
* (Sebastian Bormann) Added icons to image selectboxes.

### 0.0.7
* (Sebastian Bormann) Changed order of tabs
* (Sebastian Bormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (Sebastian Bormann) Improved speed of select id and autocreate
* (Sebastian Bormann) Set filter to channel on autocreate

### 0.0.5
* (Sebastian Bormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (Sebastian Bormann) Bugfix: copy device created just a reference to old object
* (Sebastian Bormann) Addes Toolbar-Icons

### 0.0.3
* (Sebastian Bormann) various bugfixes

### 0.0.2
* (Sebastian Bormann) first partly running version

### 0.0.1
* (Sebastian Bormann) initial release

## License
MIT License

Copyright (c) 2019 Sebastian Bormann

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