---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homee/README.md
title: ioBroker Homee Адаптер
hash: 9vcI7FKhF9O/zUxisnOnNIvDoBqzWG1bNE4Gj9G3eHY=
---
![логотип](../../../en/adapterref/iobroker.homee/admin/homee.png)

![Количество установок](http://iobroker.live/badges/homee-stable.svg)

# IoBroker homee Adapter [![Значок Greenkeeper] (https://badges.greenkeeper.io/Apollon77/ioBroker.homee.svg)](https://greenkeeper.io/)
=================

## Описание
Этот адаптер соединяет ioBroker с homee и предоставляет следующие функции:

* позволяет подключение через IP или homee-ID и имя пользователя / пароль
* прочитать все устройства (узлы) и состояния (атрибуты) и показать их значения, включая обновления в ioBroker
* разрешить изменение значений в ioBroker и отправить их обратно на дом к устройствам управления
* выступает в качестве провайдера истории ioBroker для всех состояний устройств, где история включена в homee. Это означает, что вы можете использовать значения истории, хранящиеся в homee, для отображения в ioBroker с помощью flot, Admin или также JavaScript, включая все агрегаты на уровне данных, как известно, например, из. Адаптер истории

Этот адаптер основан на выдающейся работе [stfnhmplr] (http://twitter.com/stfnhmplr) и его [homee-api](https://github.com/stfnhmplr/homee-api).

## Известные вопросы
* На js-controller <1.5.0 это может иметь странные последствия при включении других провайдеров истории в некоторых ролях (например, «switch»)
* nodejs 10 НЕ РАБОТАЕТ из-за слишком старой библиотеки Websocket в Homee-API-Library

## Changelog

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018 Apollon77 <ingo@fischer-ka.de>

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