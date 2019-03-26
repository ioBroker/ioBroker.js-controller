---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: KLXkPpXCzSL1sB94eu10raL+yR5J/hZVkNu/cnHEuxc=
---
![логотип](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![тесты](https://travis-ci.org/BuZZy1337/ioBroker.doorbird.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)

# IoBroker.doorbird =================
## Конфигурация
1. Введите IP-адрес, по которому Адаптер должен прослушивать События с Устройства Doorbird.

(Обычно это IP вашего хоста ioBroker).
Адаптер пытается заполнить поле правильным IP-адресом для вас. Если предварительно заполненный IP-адрес не является IP-адресом вашего хоста ioBroker, измените его на правильный IP-адрес.

2. Порт предопределен как `` `8100```. Вы можете изменить его, если Порт уже используется другим сервисом.

Просто попробуйте запустить адаптер с этим портом. Если порт недоступен, вы получите ошибку при запуске адаптера. Тогда просто вернитесь сюда и измените порт.

3. Введите IP-адрес вашего устройства Doorbird. Вы можете нажать на «значок поиска» слева от поля ввода. После того, как вы нажмете значок, появится сообщение в верхней части экрана конфигурации. Теперь у вас есть 60 секунд, чтобы нажать кнопку вызова на устройстве Doorbird. Адаптер пытается определить IP и заполнить все поля для вас.
4. Идентификатор устройства (НЕ IP!) Вашего Doorbird.
5. Имя пользователя, которое должно иметь разрешение API на устройстве Doorbird.
6. Пароль для имени пользователя введен в поле 5.

![Скриншот](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

После того, как вы ввели всю необходимую информацию в диалог настроек, нажмите «Сохранить и закрыть».
Адаптер должен перезагрузиться, и вы готовы к работе!

## Changelog
### 0.1.5 (2018-09-18)
* (BuZZy1337) Check response of Doorbird when triggering relays
* (BuZZy1337) Check if any favorite has to be updated (For example when adapteraddress or port changes)
* (BuZZy1337) Added state for restarting DoorBird Device (There is a bug in DoorBird Firmware .. DoorBird will fix it with next FW Update!)
* (BuZZy1337) Change some Code for working more with responses from DoorBird

### 0.1.0 (2018-09-08)
* (BuZZy1337) "public release"
* (BuZZy1337) Changed Adapteraddress option from dropdown list to inputfield
* (BuZZy1337) Added Support for triggering Doorbird-Relays

### 0.0.4
* (BuZZy1337) DO A COMPLETE REINSTALL OF THE ADAPTER (DELTE AND INSTALL THE ADAPTER AGAIN!)
DELETE ALL IOBROKER SCHEDULES AND THEN ALL IOBROKER FAVORITES IN YOUR DOORBIRD APP BEFORE STARTING 0.0.4!
* (BuZZy1337) Added support for more then one Doorbell Button
* (BuZZy1337) Encrypted saving of Doorbird Password
* (BuZZy1337) Detect and create Favorites & Schedules on the Doorbird Device.
* There is a Bug in the Doorbird Firmware for the Motion schedule! You can delete and set the Schedule for the Motionsensor in the App - thats a workaround for now.

### 0.0.3
* (BuZZy1337) Added possibility to choose the AdapterIP Address

### 0.0.2
* (BuZZy1337) Just added the info that the Adapter is not ready yet .. just to be sure! ;)

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 BuZZy1337 <buzzy1337@outlook.de>

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