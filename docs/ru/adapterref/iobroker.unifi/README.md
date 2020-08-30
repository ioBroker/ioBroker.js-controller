---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: uzAYLNiazFB+pRFLhUAVnrVOUtlnYN9uaWaHamOgHaE=
---
![Логотип](../../../en/adapterref/iobroker.unifi/admin/unifi.png)

![Статус сборки](https://travis-ci.org/iobroker-community-adapters/ioBroker.unifi.svg?branch=master)
![Количество установок](http://iobroker.live/badges/unifi-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.unifi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi.svg)
![НПМ](https://nodei.co/npm/iobroker.unifi.png?downloads=true)

# IoBroker.unifi
Этот адаптер ioBroker позволяет осуществлять мониторинг и ограниченное управление [Устройства UniFi](http://www.ubnt.com/), например точками доступа UniFi WiFi, с помощью общедоступного веб-API UniFi Controller.

## Конфигурация
### Минимальная необходимая информация
Для запуска этого адаптера необходима следующая информация:

* IP-адрес и порт вашего контроллера UniFi (оставьте порт пустым, если ваш контроллер работает на UbiOS (например, UDM Pro))
* Имя пользователя и пароль (2FA не поддерживается)
* Интервал обновления

По умолчанию информация обновляется каждые 60 секунд. В зависимости от вашего оборудования ioBroker и размера вашей сети (количество клиентов, устройств UniFi и т. Д.) Не рекомендуется дополнительно уменьшать интервал.

### Фильтровать объекты
Адаптер обновляет как можно больше информации с вашего контроллера UniFi, но предлагает возможность ограничить обновленную информацию.

Можно отключить обновление выбранной информации или отфильтровать определенные объекты этой информации.

| Информация | Объекты фильтруются по |
|-------------|-----------------------------------------|
| Клиенты | Имя, имя хоста, IP-адрес, MAC-адрес |
| Устройства | Имя, IP-адрес, MAC-адрес |
| WLAN | Имя |
| Сети | Имя |
| Здоровье | Подсистема |

## Контроль
### Включение / отключение WLAN
Изменяя состояние «включено» WLAN, можно включить / отключить его. Через несколько секунд изменение будет внесено в точки доступа.

### Создание ваучера
Используя кнопку "vouchers.create_vouchers", можно создавать предопределенные ваучеры. Можно настроить количество создаваемых ваучеров, срок действия ваучеров, а также установить лимиты для загрузки и скачивания.

## Отсутствующие точки данных
Адаптер использует [узел-унифи](https://github.com/jens-maus/node-unifi) для подключения к вашему UniFi Controller. Чтобы упростить задачу, не все доступные точки данных загружаются в ваш ioBroker. Если вам не хватает точек данных, используйте следующие URL-адреса для проверки API. (Примечание: вы должны заменить IP, PORT и SITE своими настройками)

| Информация | URL API |
|-------------|---------------------------------------------|
| Сайты | https:// IP: ПОРТ / api / self / sites |
| SysInfo | https:// IP: ПОРТ / api / s / SITE / stat / sysinfo |
| Клиенты | https:// IP: ПОРТ / api / s / SITE / stat / sta |
| Устройства | https:// IP: ПОРТ / api / s / SITE / stat / device |
| WLAN | https:// IP: ПОРТ / api / s / SITE / rest / wlanconf |
| Сети | https:// IP: ПОРТ / api / s / SITE / rest / networkconf |
| Здоровье | https:// IP: PORT / api / s / SITE / stat / health |
| Ваучеры | https:// IP: PORT / api / s / SITE / stat / voucher |
| DPI | https:// IP: ПОРТ / api / s / SITE / stat / dpi |
| Сигнализация | https:// IP: ПОРТ / api / s / SITE / stat / alarm |

### Конечные точки UbiOS
| Информация | URL API |
|-------------|------------------------------------------------------|
| Сайты | https:// IP / прокси / сеть / api / self / sites |
| SysInfo | https:// IP / прокси / сеть / api / s / SITE / stat / sysinfo |
| Клиенты | https:// IP / прокси / сеть / api / s / SITE / stat / sta |
| Устройства | https:// IP / прокси / сеть / api / s / SITE / stat / device |
| WLAN | https:// IP / прокси / сеть / api / s / SITE / rest / wlanconf |
| Сети | https:// IP / прокси / сеть / api / s / SITE / rest / networkconf |
| Здоровье | https:// IP / прокси / сеть / api / s / SITE / stat / health |
| Ваучеры | https:// IP / прокси / сеть / api / s / SITE / stat / voucher |
| DPI | https:// IP / прокси / сеть / api / s / SITE / stat / dpi |
| Сигнализация | https:// IP / прокси / сеть / api / s / SITE / stat / alarm |

## Известные проблемы
* Состояние is_wired клиентов неверно после того, как клиент отключился. Это известная проблема контроллера UniFi, не имеющая отношения к адаптеру. (см. https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1)

## __РАБОТА В ПРОЦЕССЕ__
### 0.5.8 (29.08.2020)
* (braindead1) Исправлены проблемы, связанные с неиспользуемыми сайтами
* (braindead1) Исправлены некоторые ошибки, о которых сообщалось через Sentry.

### 0.5.7 (27.07.2020)
* (braindead1) Исправлены ошибки Sentry, вызванные не обновленной конфигурацией после обновления

### 0.5.6 (25.07.2020)
* (Scrounger, braindead1) Реализованы сигналы тревоги, DPI и трафик шлюза
* (braindead1) Предотвращено создание призрачных клиентов из-за рандомизации MAC iOS.
* (dklinger) Реализован триггер ручного обновления
* (braindead1) Реализовано удаление использованных ваучеров
* (braindead1) Исправлены некоторые ошибки, о которых сообщалось через Sentry.

### 0.5.5 (13.06.2020)
* (braindead1) Исправлены некоторые ошибки, о которых сообщалось через Sentry.

### 0.5.4 (06.06.2020)
* (braindead1) Реализовано смещение для is_online
* (braindead1) Исправлены некоторые проблемы, связанные с is_online
* (braindead1) Подготовлен белый список клиентов и т. д.

### 0.5.2 (2020-05-23)
* (jens-maus) Реализована поддержка UniFiOS / UDM-Pro.
* (braindead1) Реализована возможность включения / отключения WLAN.
* (braindead1) Реализовано создание ваучера
* (braindead1) Реализовано онлайн-состояние для клиентов
* (braindead1) Обновленные состояния клиентов
* (braindead1) Обновленные состояния устройства
* (braindead1) Улучшенные сообщения об ошибках

### 0.5.0 (09.05.2020)
* (braindead1) Реализована настройка обновлений
* (braindead1) Улучшенный JsonLogic
* (braindead1) Удален устаревший код
* (braindead1) Реализован Sentry

### 0.4.3 (24.04.2020)
* (braindead1) исправлена проблема конфигурации

### 0.4.2 (23.04.2020)
* (braindead1) проблема с подсистемой исправлена

### 0.4.1 (16.04.2020)
* (braindead1) Улучшенный рефакторинг

### 0.4.0 (16.04.2020)
* (bluefox) Рефакторинг

### 0.3.1
* (jens-maus) добавлена поддержка многосайтовых сред.

### 0.3.0
* (jens-maus) добавил запрос данных устройства доступа и вместо этого переместил клиентские устройства в поддерево «клиенты»

### 0.2.1
* (jens-maus) мелкие исправления

### 0.2.0
* (jens-maus) переместил `lib / unifi.js` в выделенный класс node-unifi nodejs и добавил его в качестве зависимости.

### 0.1.0
* (jens-maus) реализована первая в основном рабочая версия, которая может получать информацию о состоянии от контроллера UniFi.

### 0.0.1
* (jens-maus) начальная регистрация нерабочей разрабатываемой версии

## Ссылки
Этот адаптер использует функции следующих сторонних модулей nodejs:

* [узел-unifi] (https://github.com/jens-maus/node-unifi)
* [json-logic-js] (https://github.com/jwadhams/json-logic-js)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ## __WORK IN PROGRESS__
-->

## License
The MIT License (MIT)

Copyright (c) 2020 braindead1 &lt;os.braindead1@gmail.com&gt;
Copyright (c) 2016-2020 Jens Maus &lt;mail@jens-maus.de&gt;

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