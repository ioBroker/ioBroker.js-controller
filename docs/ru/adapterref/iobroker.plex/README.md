---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: jXJT6rWqMtSZBhI5P93fF0BtQxWaPG/3qBnjz5B9ryA=
---
![логотип](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Количество установок](http://iobroker.live/badges/plex-installed.svg)
![Стабильная версия](http://iobroker.live/badges/plex-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.plex.svg)
![Фиксируется с момента последнего выпуска](https://img.shields.io/github/commits-since/Zefau/ioBroker.plex/latest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.plex.svg)
![NPM](https://nodei.co/npm/iobroker.plex.png?downloads=true)

# IoBroker.plex Интеграция Plex Media Server в ioBroker (с Plex Pass или без него). Кроме того, интеграция Tautulli.
[![Travis CI] (https://travis-ci.com/Zefau/ioBroker.plex.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.plex)

**Оглавление**

1. [Особенности] (# 1-функции)
2. [Инструкции по настройке] (# 2-инструкции по настройке)
   1. [Базовая настройка] (# 21-basic-setup)
   2. [Расширенная настройка] (# 22-advanced-setup-plex-pass-or-tautulli)
3. [Каналы и состояния] (# 3-каналы - состояния)
   1. [с базовой настройкой] (# 31 с базовой настройкой)
   2. [с расширенной настройкой] (# 32-с расширенной настройкой)
4. [Changelog] (# changelog)
5. [Лицензия] (# лицензия)

## 1. Особенности
- Получить подробную информацию о текущем воспроизводимом медиа-элементе (например, битрейт видео, кодек, информацию о субтитрах, аудио; см. [Расширенная настройка] (https://github.com/Zefau/ioBroker.plex/blob/master/README- States.md # with-advanced-setup) для полного списка)
- Получать «события» из Plex (через [Plex Webhook] (https://support.plex.tv/articles/115002267687-webhooks/#toc-0) и [Уведомления Plex] (https://support.plex.tv / article / push-уведомления / # toc-0) с использованием Plex Pass или через Tautulli, [__see setup! __] (# 22-advanced-setup-plex-pass-or-tautulli))
- Контроль воспроизведения для игроков
- Получить `серверы`
- Получить "библиотеки"
- Получить все предметы в библиотеке
- Получить `пользователей` (только с Tautulli)
- Получить «статистику» (только с Таутулли)
- Получить "плейлисты"
- Получить `настройки`
- Веб-интерфейс, который показывает последние события из Plex:

  ![Plex Web Interface](../../../en/adapterref/iobroker.plex/img/screenshot_adapter-interface.png)

## 2. Инструкция по настройке
### 2.1. Основные настройки
Для базовой настройки необходимо указать IP-адрес (и порт) вашей установки Plex. Кроме того, вам нужно получить выделенный токен для адаптера для извлечения данных из Plex.

После этого ioBroker.plex извлечет все основные данные (включая серверы, библиотеки). См. [Каналы и Штаты](#21-with-basis-setup) для полного списка основных данных.

### 2.2. Расширенная настройка (Plex Pass или Tautulli)
#### 2.2.1. Плекс Пасс
__Webhook__

Если вы являетесь пользователем Plex Pass, вы можете [настроить веб-крючок](https://support.plex.tv/articles/115002267687-webhooks/#toc-0) в настройках Plex для получения текущего события / действия с вашего Plex Media Server (воспроизведение, пауза, возобновление, остановка, просмотр и оценка).

Перейдите к вашему Plex Media Server и перейдите к ```Settings``` и ```Webhook```. Создайте новый веб-крючок, щелкнув ```Add Webhook``` и введите IP-адрес ioBroker с настраиваемым портом, указанным в настройках ioBroker.plex и в конце пути ```/plex```, например, ```http://192.168.178.29:41891/plex```:

![Plex Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

__Мероприятия__

Для получения информации относительно уведомлений Plex, пожалуйста, [смотрите официальную документацию](https://support.plex.tv/articles/push-notifications/#toc-0). Чтобы включить уведомления на своем Plex Media Server, перейдите к `Settings`> `Server`> `General` и затем включите параметр `Push Notifications`.

#### 2.2.2.Tautulli
[Tautulli - это стороннее приложение] (https://tautulli.com/#about), которое вы можете запускать вместе со своим Plex Media Server для мониторинга активности и отслеживания различной статистики. Наиболее важно, что эти статистические данные включают в себя то, что было просмотрено, кто это наблюдал, когда и где они смотрели, и как это смотрели. Вся статистика представлена в приятном и понятном интерфейсе со множеством таблиц и графиков, что позволяет легко хвастаться своим сервером всем остальным. Проверьте [Предварительный просмотр Tautulli] (https://tautulli.com/#preview) и [установите его на предпочитаемую систему](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation), если вы заинтересованы.

Этот адаптер подключается к [Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md), а также получает события webhook от Tautulli.

##### 2.2.2.1. API
После установки Tautulli откройте страницу _Settings_ на панели инструментов Tautulli и перейдите на _Web Interface_. Прокрутите вниз до раздела _API_ и убедитесь, что флажок ```Enable API``` отмечен. Скопируйте ```API key``` и введите его в настройках ioBroker.plex. Кроме того, добавьте IP-адрес и порт Tautulli, чтобы обеспечить связь API.

##### 2.2.2.2. Webhook
###### Обзор
Чтобы настроить webook с помощью Tautulli, следуйте инструкциям ниже и убедитесь, что вы выполнили все 4 шага:

1. Добавить агент уведомлений
2. Настройте Webhook в агенте уведомлений
3. Настройте триггеры в агенте уведомлений
4. Настройте данные в агенте уведомлений
5. Настройте параметры уведомлений

###### Описание
После установки откройте страницу настроек на панели инструментов Tautulli и перейдите к агентам уведомлений, как показано ниже:

![Настройки Tautulli](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1. Нажмите _Добавить новый агент уведомлений_ и _Webhook_.
2. Введите свой IP-адрес ioBroker с помощью специального порта, указанного в настройках ioBroker.plex, и конечного пути `` `/ tautulli````, например, `` `http://192.168.178.29: 41891 / tautulli```:

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png) Кроме того, выберите ```POST``` для метода _Webhook_ и введите любое понравившееся описание в _Description_.

3. Затем перейдите на вкладку _Triggers_, выберите нужные (или просто все) агенты уведомлений. Включенный агент уведомлений вызовет событие, которое затем будет отправлено в ioBroker. __Убедитесь ___, чтобы предоставить необходимые данные для каждого включенного агента уведомлений на следующем шаге!
4. Теперь, ___ самое главное __, заполните соответствующую полезную нагрузку данных на вкладке _Data_ в соответствии с __ [Конфигурация уведомления найдена здесь] (README-tautulli.md # Notification-configuration) __.

   Скопируйте конфигурацию уведомлений соответствующих агентов уведомлений из предыдущего шага (например, ```Playback Start```, ```Playback Stop```, ```Playback Pause``` и ```Playback Resume```) в каждом из текстовых полей, как показано ниже для § §JJJJJ_4§§:

   ![Таутулли Уведомление](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

5. Наконец, установите флажок «Разрешить последовательные уведомления», чтобы разрешить отправку последовательных уведомлений (например, как просмотренных, так и остановленных уведомлений):

   ![Настройки уведомлений Tautulli](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification_settings.png)

## 3. Каналы и состояния
После настройки как базовой, так и расширенной настройки появятся следующие каналы (библиотеки, серверы и пользователи, конечно, только примеры). Смотрите далее ниже [полный список каналов и состояний](#21-with-basis-setup).

![Примеры каналов и состояний](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 3.1. С базовой настройкой
После успешной базовой настройки будут созданы каналы в соответствии со следующей таблицей. Для списка всех состояний, которые будут созданы, пожалуйста, [см выделенный список государств](README-states.md#with-basis-setup).

| Канал / Папка | Описание |
| ------- | ----------- |
| __libraries__ | Плекс Библиотеки |
| __servers__ | Plex Серверы |
| __settings__ | Настройки Plex |

### 3.2. С расширенной настройкой
После успешной расширенной настройки будут автоматически созданы следующие каналы. Для списка всех состояний, которые будут созданы, пожалуйста, [см выделенный список государств](README-states.md#with-advanced-setup).

| Канал / Папка | Описание | Замечание |
| ---------------- | ----------- | ------ |
| __ \ _ playing__ | Plex Media играет | с Plex Pass или Tautulli |
| __statistics__ | Plex Watch Статистика | только с Таутулли |
| __users__ | Plex Пользователи | только с Таутулли |

## Changelog

### 0.9.0 (2020-05-23)
- (Zefau) added option for webhook Ip address in case Plex is running in a Docker environment (see [#53](https://github.com/Zefau/ioBroker.plex/issues/53))
- (Zefau) updated dependencies

### 0.8.11 (2020-02-26)
- (Zefau) fixed error with state retrieval on startup when no states are given
- (Zefau) updated dependencies

### 0.8.10 (2020-02-16)
- (Zefau) fixed error with state retrieval on startup when no states are given
- (Zfeau) fixed incorrect handling of certificates when using secure connection
- (Zefau) updated dependencies

### 0.8.9 (2019-12-14)
- (Zefau) updated dependencies
- (Zefau) fixed missing spaces in events (and thus Adapter Web View)
- (Zefau) fixed using username instead of email for statistics (see [#17](https://github.com/Zefau/ioBroker.plex/issues/17))

### 0.8.8 (2019-12-05)
- (Zefau) fixed player controls

### 0.8.7 (2019-12-02)
- (Zefau) fixed error with http / https settings

### 0.8.6 (2019-12-02)
- (Zefau) added further states to Tautulli Notification (see [README-tautulli.md](https://github.com/Zefau/ioBroker.plex/blob/master/README-tautulli.md))
- (Zefau) fixed design issue with select-box in the adapter settings
- (Zefau) fixed not showing thumbnails in adapter web view (when not using a secure connection)

### 0.8.5 (2019-12-01)
- (Zefau) fixed missing user / library statistics
- (Zefau) fixed using username instead of email for statistics (see [#17](https://github.com/Zefau/ioBroker.plex/issues/17))

### 0.8.4 (2019-11-07)
- (Zefau) added support for remote player control via cloud / iot adapter
- (Zefau) added thumbnail to notifications as well as web interface of adapter
- (Zefau) fixed icons within the web interface of adapter

### 0.8.3 (2019-11-06)
- (Zefau) fixed player controls (error when triggering `start`, `stop`, etc.)
- (Zefau) added additional states to `event` channel

### 0.8.1 (2019-11-02)
- (Zefau) fixed error `Cannot read property 'forEach' of undefined`

### 0.8.0 (2019-10-28)
- (Zefau) added support for Plex Notifications including customization in adapter settings
- (Zefau) added count of streams (see [#14](https://github.com/Zefau/ioBroker.plex/issues/14))
- (Zefau) reworked cleaning up states when new webhook is received (see [#11](https://github.com/Zefau/ioBroker.plex/issues/11))

### 0.7.0 (2019-10-17)
- (Zefau) reworked duty cycle (clean up of outdated / old states)
- (Zefau) fixed incorrect states (see [#15](https://github.com/Zefau/ioBroker.plex/issues/15))

### 0.6.0 (2019-08-19)
- (Zefau) replaced password with token authentication

### 0.5.0 (2019-08-18)
- (Zefau) added support for Plex Notifications (see [#9](https://github.com/Zefau/ioBroker.plex/issues/9))
- (Zefau) added support for all Tautulli triggers
- (Zefau) added Adapter Web Interface that shows the recent events

### 0.4.3 (2019-08-11)
- (Zefau) Performance improvements (dutyCycleRun and state comparison)
- (Zefau) added refresh button (to scan library files) to libraries

### 0.4.1 / 0.4.2 (2019-08-03)
- (Zefau) fixed newly introduced playback control not working for certain players
- (Zefau) removed unnecessary dependencies

### 0.4.0 (2019-08-01)
- (Zefau) added playback control for players
- (Zefau) added configuration options to only retrieve specific objects from Plex

### 0.3.2 / 0.3.3 (2019-07-25)
- (Zefau) added file, streaming and transcoding information to Tautulli event
- (Zefau) fixed bug when no playlists exist
- (Zefau) fixed missing `EVENTS.json`

### 0.3.1 (2019-07-20)
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 0.3.0 (2019-05-16)
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 (see [#6](https://github.com/Zefau/ioBroker.plex/pull/6))
- (Zefau) added support / discovery in [iobroker.discovery](https://github.com/ioBroker/ioBroker.discovery) (see [#62](https://github.com/ioBroker/ioBroker.discovery/pull/62))
- (Zefau) added playlists to states
- (Zefau) added state description for object tree ```_playing```
- (Zefau) updated German translation (instead of generating it from English)

### 0.2.0 (2019-05-14)
- (Zefau) added authentication method (using Plex user and Plex password)
- (Zefau) fixed @iobroker/adapter-core dependency

### 0.1.0 (2019-04-26)
- (Zefau) get initial data from Plex API
- (Zefau) receive events from Plex Webhook (Plex Pass only)
- (Zefau) receive events from Tatulli (if used)

## License
The MIT License (MIT)

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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