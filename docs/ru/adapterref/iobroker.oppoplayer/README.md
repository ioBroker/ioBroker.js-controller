---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.oppoplayer/README.md
title: ioBroker.oppoplayer
hash: 3hueLeS5wLogBYdv89SmfIkH7DSsnuj4QOWL69zo1Nw=
---
![логотип](../../../en/adapterref/iobroker.oppoplayer/admin/oppoplayer.png)

![Количество установок](http://iobroker.live/badges/oppoplayer-stable.svg)

# IoBroker.oppoplayer
Этот адаптер добавляет в ioBroker поддержку цифрового UHD-проигрывателя OPP (UDP-20x).
Вы можете контролировать воспроизведение и запросить статус.

## Советы и хитрости
* Плеер не запускает сетевой интерфейс, если он снова подключен к источнику питания (подтверждено OPPO).

  Если вы отключите его от питания, вы должны использовать триггер, чтобы запустить его.

## Участники
* Фолькеррихерт

## Changelog

### 0.2.0 ("Compact mode" release)
* (volkerrichert) add support for compact mode 

### 0.1.0 (first public release)
* (volkerrichert) handle changes on writeable states

### 0.0.2 (not released)
* (volkerrichert) providing most of the objects and remote key

### 0.0.1 (not released)
* (volkerrichert) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018 Volker Richert <volker@richert.nrw>

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