---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zoneminder/README.md
title: ioBroker.zoneminder
hash: ToV8enlU5mDfF2NTtGaQ9cJGLap+ep6FQoAQPFVRZjo=
---
![логотип](../../../en/adapterref/iobroker.zoneminder/admin/zoneminder.png)

![Количество установок](http://iobroker.live/badges/zoneminder-installed.svg)
![Стабильная версия](http://iobroker.live/badges/zoneminder-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.zoneminder.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zoneminder.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.zoneminder.svg)
![NPM](https://nodei.co/npm/iobroker.zoneminder.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.zoneminder/master.svg)

# IoBroker.zoneminder
## Адаптер зоны для ioBroker
Подключение к вашему Zoneminder.

## Начиная
Введите свой хост, например. «http:// zoneminder / zm» неизменный пользователь и пароль «admin», если у вас нет никакой аутентификации, не меняйте пользователя или пароль.

Интервал устройства предназначен для проверки новых камер и некоторой базовой информации. Значение в секундах.
Интервал монитора предназначен для проверки предупреждений и в секундах.

Если вы хотите получать информацию о предупреждениях, пожалуйста, установите zmEventNotification на ваш zoneminder и включите его в настройках iobroker.

### Zoneminder-Настройки
Чтобы получить ссылку на камеру для работы с пользователем и pw, вам нужно отменить выбор AUTH_HASH_IPS в настройках

![логотип](../../../en/adapterref/iobroker.zoneminder/admin/auth_hash_ips.png)

## Changelog
### 0.3.3 (12.11.2019)
* (MeisterTR) error fixes, fix login error, fixes for latest
* (MeisterTR) add ZmEvents
* (MeisterTR) Select moniorfunction and disable/enable monitor
### 0.2.1
* (MeisterTR) add info states
* (MeisterTR) add camera-link with auth-key
* (MeisterTR) cange video link
### 0.1.0
* (MeisterTR) First running version
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2019 MeisterTR <meistertr.smarthome@gmail.com>

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