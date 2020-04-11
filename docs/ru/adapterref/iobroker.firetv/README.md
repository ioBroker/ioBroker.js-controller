---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.firetv/README.md
title: без заголовка
hash: CovZUdv+x4gbupj11lkb3U6+4IVmRfxlLmRx36rxneY=
---
![логотип](../../../en/adapterref/iobroker.firetv/admin/firetv.png)

![Количество установок](http://iobroker.live/badges/firetv-community-installed.svg)
![Стабильная версия](http://iobroker.live/badges/firetv-community-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.firetv.svg)
![тесты](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Статус сборки](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)

### IoBroker.firetv
<!--
[![Версия NPM] (https://badge.fury.io/js/iobroker.firetv.svg)](https://www.npmjs.com/package/iobroker.firetv)
-->

С помощью этого адаптера вы можете управлять некоторыми функциями вашего Fire TV или Fire TV Stick.
Например.:

- Вкл выкл
- Отправить ключевые события
- Отправить текстовые строки в поля ввода
- запуск / остановка приложений
- перезагрузка
- точные команды оболочки

#### Некоторая информация
Этот адаптер использует функции «Android Debug Bridge», известного как «adb». Adb является частью Android Developer SDK. Поскольку Fire TV имеет операционную систему Android, им можно управлять с помощью adb.

#### Требования
Чтобы использовать этот адаптер, вы должны установить как минимум пакет adb Anroid SDK. Чтобы не устанавливать полный Android SDK, необходимо установить

- *Минимальный ADB и Fastboot*

Поищите в Google (Minimal ADB и Fastboot) последнюю ссылку для скачивания.

Кроме того, вы можете использовать *adbLink*

## Changelog
### 1.0.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

## License
The MIT License (MIT)

Copyright (c) 2016-2020 soef <soef@gmx.net>

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