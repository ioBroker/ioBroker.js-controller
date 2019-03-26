---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asuswrt/README.md
title: ioBroker.asuswrt
hash: th9msLcv0OCTB3cVH4NhjbOy3OabS7EF+q3Ckcxin84=
---
![логотип](../../../en/adapterref/iobroker.asuswrt/admin/asuswrt.png)

![Количество установок](http://iobroker.live/badges/asuswrt-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.asuswrt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.asuswrt.svg)
![тесты](https://api.travis-ci.org/mcdhrts/ioBroker.asuswrt.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![NPM](https://nodei.co/npm/iobroker.asuswrt.png?downloads=true)

# IoBroker.asuswrt =================
## Адаптер ASUSWRT для ioBroker
Найдите активные устройства в маршрутизаторах ASUS, работающих под управлением ASUSWRT.
Вы можете использовать это, например, в качестве обнаружения присутствия телефонов, чтобы отследить, находится ли кто-то дома.

Протестировано с Asus GT-AC5300 под управлением ASUSWRT 3.0.0.4.384_32799

Вы можете найти список от Asus, который не использует ASUSWRT здесь: https://event.asus.com/2013/nw/ASUSWRT/

## Требования
Вы должны активировать и разрешить SSH-соединения в настройках вашего маршрутизатора.

Вам нужен как минимум NodeJS V6 и Admin V3

Если вам нужно Admin V2, установите последнюю поддерживаемую версию 0.3.1

## Настроить
* IP-адрес маршрутизатора Asus (обязательно)
    * IP-адрес маршрутизатора Asus
* Логин пользователя (обязательно)
    * Имя пользователя для входа в Asus Router
* Пароль для входа (необязательно, если используется файл закрытого ключа)
    * Passwort для пользователя, чтобы войти
    * Когда вы используете файл закрытого ключа, оставьте это поле пустым
* Файл закрытого ключа (необязательно, если используется пароль)
    * Если вы не хотите использовать Passwort-Login, вы можете установить Путь к файлу закрытого ключа для SSH-Login.
    * Оставьте пустым, если не хотите
* Секретная фраза файла закрытого ключа (Необязательно, если файл закрытого ключа зашифрован)
    * Когда ваш ключевой файл зашифрован парольной фразой, введите его здесь
    * Оставьте пустым, если не нужно
* SSH-порт (обязательно)
    * Порт для подключения SSH к маршрутизатору Asus
* Время опроса
    * Время в мс для проверки активных устройств (минимальное время составляет 5000 мс = 5 с)
* Время неактивно
    * Время в мс, когда устройство больше не активно.
    * В моем случае 180000ms = 180s = 3 минуты работает отлично. Минимум 60000мс
* Адреса к мониторингу
    * Добавьте устройства для просмотра, если они активны или нет с MAC-адресом с устройства.
    * Не забудьте установить флажок, чтобы активировать мониторинг

## Changelog

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

## License
The MIT License (MIT)

Copyright (c) 2019 mcdhrts <mcdhrts@outlook.com>

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