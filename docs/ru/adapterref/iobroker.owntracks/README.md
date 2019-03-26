---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.owntracks/README.md
title: Перемещено на https://github.com/iobroker-community-adapters/ioBroker.owntracks
hash: IWfeYjtdT3DDyKV4cYon2vDhXbQJh+qDAbqzQqcKwlw=
---
# Перемещено на https://github.com/iobroker-community-adapters/ioBroker.owntracks
![логотип](../../../en/adapterref/iobroker.owntracks/admin/owntracks.png)

![Количество установок](http://iobroker.live/badges/owntracks-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.owntracks.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.owntracks.svg)
![NPM](https://nodei.co/npm/iobroker.owntracks.png?downloads=true)

# IoBroker.owntracks
[OwnTracks](http://owntracks.org/) - приложение для Android и iOS.

Приложение непрерывно отправляет вашу позицию (позицию устройства) на определенный сервер. В нашем случае это будет сервер ioBroker. Для связи будет использоваться протокол MQTT или адаптер ioBroker.cloud / ioBroker.iot.

Ссылка для:

Android: [https://play.google.com/store/apps/details?id=org.owntracks.android](https://play.google.com/store/apps/details?id=org.owntracks .android)
- iOS: [https://itunes.apple.com/de/app/owntracks/id692424691?mt=8](https://itunes.apple.com/de/app/owntracks/id692424691?mt=8)

## Инструкция по настройке
### Конфигурация соединения (с использованием MQTT-сервера)
OwnTracks Adapter запускается через порт 1883 (настраивается) MQTT-сервера для приема сообщений от устройств с координатами.
Проблема в том, что этот сервер должен быть доступен из Интернета.
Обычно есть маршрутизатор или межсетевой экран, который должен быть настроен для пересылки трафика.

### Настройка приложения и адаптера
Следующие предпочтения должны быть установлены в приложении Android / iOS соответственно в адаптере ioBroker:

- Соединение / Режим - MQTT private
- Соединение / Хост / Хост - IP-адрес вашей системы или домена DynDNS. Например. http://www.noip.com/ позволяет использовать доменное имя вместо IP-адреса.
- Соединение / Хост / Порт - 1883 или ваш порт на вашем роутере
- Соединение / Хост / WebSockets - false
- Связь / Идентификация / Имя пользователя - iobroker
- Соединение / Идентификация / Пароль - из настроек адаптера
- Соединение / Идентификация / DeviceID - Имя устройства или человека. Для этого устройства будут созданы состояния. Например. если deviceID имеет значение «Mark», после первого контакта будут созданы следующие состояния:

    - owntracks.0.users.Mark.longitude
    - owntracks.0.users.Mark.latitude

- Connection / Identification / TrackerID - Краткое имя пользователя (до 2 букв), чтобы написать его на карте.
- Соединение / Безопасность / TLS - выключено
- Расширенный / Ключ шифрования - необязательно, но рекомендуется: Добавить кодовую фразу для шифрования

Убедитесь, что owntracks подключено к экземпляру iobroker через запись состояния в ящике:

![настройки](../../../en/adapterref/iobroker.owntracks/img/connection.jpg)

### ВАЖНАЯ ЗАМЕТКА!
** Состояния в ioBroker будут сгенерированы при получении определенной полезной нагрузки !! Это означает, что местоположения в ioBroker будут сгенерированы в первый раз, когда пользователь покидает или вводит местоположение. ** Ниже вы увидите целевую структуру

![настройки](../../../en/adapterref/iobroker.owntracks/img/structure.png)

### Конфигурация регионов
Чтобы настроить местоположения в адаптере owntracks, необходимо создать регионы в приложении owntracks для Android / iOS.
Для этого перейдите в «Регионы» в ящике

![настройки](../../../en/adapterref/iobroker.owntracks/img/regions1.jpg)

Создайте новый регион, нажав на плюс (+) в правом верхнем углу

![настройки](../../../en/adapterref/iobroker.owntracks/img/regions2.jpg)

Используйте кнопку местоположения в верхнем правом углу, чтобы получить текущее местоположение или введите их в широте и долготе самостоятельно. Кроме того, укажите радиус для местоположения. Если вы поделитесь местоположением, ваши Друзья (см. В ящике приложения Android / iOS) получат уведомление, когда вы вводите / покидаете местоположение.

![настройки](../../../en/adapterref/iobroker.owntracks/img/regions3.jpg)

### Настройки значков (в адаптере ioBroker.owntracks)
Вы можете определить для каждого пользователя иконку. Просто загрузите перетаскиванием мышью или кликнув мышью на изображение Он будет автоматически масштабирован до 64x64.

Имя должно быть равно DeviceID в приложении OwnTracks.

![настройки](../../../en/adapterref/iobroker.owntracks/img/settings1.png)

## Changelog

### 0.6.2 (2019-02-14)
* (zefau) Added support for [ioBroker compact mode](https://forum.iobroker.net/viewtopic.php?f=24&t=20387#p213466)
* (zefau) Added support for Gulp translations

### 0.6.0 (2019-01-27)
* (zefau) Added Admin v3 / materialized support
* (zefau) Added option for websockets in the adapter settings

### 0.5.1 (2019-01-25)
* (zefau) fixed an error when connection got closed

### 0.5.0 (2018-10-14)
* (zefau) Added support for locations

### 0.4.0 (2018-10-14)
* (zefau) Added support for encryption key

### 0.3.0 (2018-06-05)
* (matspi) Fix handling of publish messages

### 0.2.0 (2017-01-03)
* (jp112sdl) added two properties timestamp and datetime

### 0.1.1 (2016-09-05)
* (bluefox) add pictures

### 0.1.0 (2016-09-04)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2017 bluefox<dogafox@gmail.com>

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