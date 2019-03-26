---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tautulli/README.md
title: ioBroker.tautulli
hash: dgxUGRa7DjpHaUslLIRWE/MNUZH4dY5z1fGAyOH2/XA=
---
![логотип](https://raw.githubusercontent.com/Zefau/ioBroker.tautulli/master/admin/tautulli.jpeg)

![Количество установок](http://iobroker.live/badges/tautulli-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tautulli.svg)
![Трэвис CI](https://travis-ci.org/Zefau/ioBroker.tautulli.svg?branch=master)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tautulli.svg)
![NPM](https://nodei.co/npm/iobroker.tautulli.png?downloads=true)

# IoBroker.tautulli [Tautulli - стороннее приложение](https://tautulli.com/#about), который вы можете запускать вместе со своим Plex Media Server для мониторинга активности и отслеживания различной статистики. Самое главное, что эта статистика включает в себя то, что было просмотрено, кто его смотрел, когда и где он смотрел, и как это смотрели. Вся статистика представлена в приятном и понятном интерфейсе со множеством таблиц и графиков, что позволяет легко хвастаться своим сервером всем остальным.
Этот адаптер подключается к [Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md), а также получает события webhook от Tautulli и Plex (последний требует Plex Pass).

**Оглавление**

1. Инструкция по настройке
   1. Настройки API
2. TBD
3. Список изменений
4. Лицензия

## Инструкция по настройке
Проверьте [Tautulli Preview] (https://tautulli.com/#preview) и [установите его на предпочитаемую вами систему](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation), если вы заинтересованы.

### Настройки API
После установки Tautulli откройте страницу _Settings_ на панели инструментов Tautulli и перейдите на _Web Interface_. Прокрутите вниз до раздела _API_ и убедитесь, что флажок ```Enable API``` отмечен. Скопируйте ```API key``` и введите его в настройках ioBroker.tautulli. Кроме того, добавьте IP-адрес и порт Tautulli, чтобы обеспечить связь API.

## Changelog

### 0.2.0 (2019-02-01)
* (zefau) added support for Compact Mode
* (zefau) added support for gulp

### 0.1.0 (2019-01-03)
* (zefau) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Zefau <zefau@mailbox.org>

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