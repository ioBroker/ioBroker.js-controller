---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: CvgX9nV9Iu3qbzg7qfuqsuhRMbEJ1i800qF6DWbSkY0=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Количество установок (последнее)](http://iobroker.live/badges/sureflap-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/sureflap-stable.svg)
![Статус зависимости](https://img.shields.io/david/Sickboy78/iobroker.sureflap.svg)
![Известные уязвимости](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap/badge.svg)
![Трэвис-Си](http://img.shields.io/travis/Sickboy78/ioBroker.sureflap/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Sickboy78/ioBroker.sureflap?branch=master&svg=true)
![НПМ](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.sureflap
## Adpater для лоскутов SureFlap® для кошек и домашних животных от Sure Petcare®
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p>

## Конфигурация
Добавьте имя пользователя и пароль из своей учетной записи Sure Petcare® на странице конфигурации адаптера.

## Описание
Адаптер предоставляет информацию о настройках и состоянии вашей кошачьей откидной створки.

Он также показывает местонахождение ваших питомцев.

### Изменяемые значения
Следующие состояния могут быть изменены, и они вступят в силу на вашем устройстве, соответственно, они будут отражены в вашем приложении Sure Petcare®.

| состояние | описание | допустимые значения |
|-------|-------------|----------------|
| имя_хозяйства.имя_концентратора.имя_фланцы.control.curfew | включает или отключает настроенный комендантский час<br> (комендантский час настраивается через приложение) | **истина** или **ложь** |
| имя_хозяйства.имя_концентратора.Название_ заслонки.control.lockmode | устанавливает режим блокировки | **0** - открыто<br> **1** - заблокировать<br> **2** - заблокировать<br> **3** - закрыто (закрывается и выключается) |
| имя_хозяйства.pets.pet_name.inside | определяет, находится ли ваш питомец внутри | **истина** или **ложь** |

### Структура
Адаптер создает следующую иерархическую структуру:

адаптер<br> ├ имя_хозяйства<br> │ ├ имя_хаба<br> │ │ ├ led_mode<br> │ │ ├ онлайн<br> │ │ └ flap_name<br> │ │ ├ аккумулятор<br> │ │ ├ battery_percentage<br> │ │ ├ онлайн<br> │ │ ├ контроль<br> │ │ │ ├ комендантский час<br> │ │ │ └ режим блокировки<br> │ │ ├ комендантский час<br> │ │ │ └ 0..i<br> │ │ │ ├ включен<br> │ │ │ ├ lock_time<br> │ │ │ └unlock_time<br> │ │ └ last_curfew<br> │ │ └ 0..i<br> │ │ ├ включен<br> │ │ ├ lock_time<br> │ │ └ unlock_time<br> │ └ домашние животные<br> │ └ pet_name<br> │ ├ имя<br> │ ├ внутри<br> │ └ так как<br> └ информация<br> ├ all_devices_online<br> └ соединение<br>

## Примечания
SureFlap® и Sure Petcare® являются зарегистрированными товарными знаками [SureFlap Ltd.](https://www.surepetcare.com/).

Изображение откидной створки для кошек, концентратора и приложения для смартфона предоставляется бесплатно в [Конечно Petcare®](https://www.surepetcare.com/en-us/press).

## Changelog

### 1.0.3 (2021-02-28)
* (Sickboy78) code improvements from review
* (Sickboy78) fixed timezone bug

### 1.0.2 (2021-02-25)
* (Sickboy78) fixed bug setting lockmode and inside values

### 1.0.1 (2021-02-19)
* (Sickboy78) initial release

## License

MIT License

Copyright (c) 2021 Sickboy78 <asmoday_666@gmx.de>

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