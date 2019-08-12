---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: ihnvf+MUeRshlR2jF8t89A7y13pR9wbn8Zm5KetUmi8=
---
![логотип](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![Количество установок](http://iobroker.live/badges/plex-installed.svg)
![Стабильная версия](http://iobroker.live/badges/plex-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.plex.svg)
![Трэвис CI](https://travis-ci.org/Zefau/ioBroker.plex.svg?branch=master)
![Загрузки](https://img.shields.io/npm/dm/iobroker.plex.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/Zefau/ioBroker.plex.svg)
![NPM](https://nodei.co/npm/iobroker.plex.png?downloads=true)

# IoBroker.plex Интеграция Plex Media Server в ioBroker (с Plex Pass или без него). Кроме того, интеграция Tautulli.
**Оглавление**

1. [Особенности] (# 1-функции)
2. [Инструкции по настройке] (# 2-инструкции по настройке)
   1. [Базовая настройка] (# 21-basic-setup)
   2. [Расширенная настройка] (# 22-advanced-setup-plex-pass-or-tautulli)
3. [Каналы и состояния] (# 3-каналы - состояния)
   1. [с базовой настройкой] (# 31 с базовой настройкой)
   2. [с расширенной настройкой] (# 32 с расширенной настройкой)
4. [Список изменений] (# список изменений)
5. [Лицензия] (# лицензия)

## 1. Особенности
- Получать события из Plex (через Plex Pass или Tautulli)
- Контроль воспроизведения для игроков
- Получить серверы
- Получить библиотеки
- Получить все предметы в библиотеке
- Получить пользователей (только с Tautulli)
- Получить статистику (только с Таутулли)
- Получить плейлисты
- Получить настройки

## 2. Инструкция по настройке
### 2.1. Основные настройки
Для базовой настройки требуется только указать IP-адрес (и порт) вашей установки Plex. Кроме того, вы должны предоставить пользователю пароль и пароль для извлечения данных из Plex.

Если вы не хотите сохранять имя пользователя и пароль в адаптере, вы можете внести ioBroker в белый список в настройках Plex. Для этого перейдите к `Settings` вашего Plex Media Server и к `Network`. Введите IP-адрес ioBroker в оба поля: `LAN Networks` и `List of IP addresses and networks that are allowed without auth`:

![Настройки сети Plex](../../../en/adapterref/iobroker.plex/img/screenshot_plex-networksettings.jpg)

После этого ioBroker.plex извлечет все основные данные (включая серверы, библиотеки). См. [Каналы и Штаты](#21-with-basis-setup) для полного списка основных данных.

### 2.2. Расширенная настройка (Plex Pass или Tautulli)
#### 2.2.1. Плекс Пасс
Если вы являетесь пользователем Plex Pass, вы можете [настроить веб-крючок](https://support.plex.tv/articles/115002267687-webhooks/#toc-0) в настройках Plex для получения текущего события / действия с вашего Plex Media Server (воспроизведение, пауза, возобновление, остановка, просмотр и оценка).

Перейдите к своему Plex Media Server и перейдите к ```Settings``` и ```Webhook```. Создайте новый веб-крюк, щелкнув ```Add Webhook``` и введите IP-адрес ioBroker с настраиваемым портом, указанным в настройках ioBroker.plex и в конце пути ```/plex```, например, ```http://192.168.178.29:41891/plex```:

![Plex Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

#### 2.2.2.Tautulli
[Tautulli - это стороннее приложение] (https://tautulli.com/#about), которое вы можете запускать вместе со своим Plex Media Server для мониторинга активности и отслеживания различной статистики. Самое главное, что эта статистика включает в себя то, что было просмотрено, кто его смотрел, когда и где они смотрели, и как это смотрели. Вся статистика представлена в приятном и понятном интерфейсе со множеством таблиц и графиков, что позволяет легко хвастаться своим сервером всем остальным. Проверьте [Предварительный просмотр Tautulli] (https://tautulli.com/#preview) и [установите его на предпочитаемую систему](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation), если вы заинтересованы.

Этот адаптер подключается к [Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md), а также получает события webhook от Tautulli.

##### 2.2.2.1. API
После установки Tautulli откройте страницу _Settings_ на панели инструментов Tautulli и перейдите на _Web Interface_. Прокрутите вниз до раздела _API_ и убедитесь, что флажок ```Enable API``` отмечен. Скопируйте ```API key``` и введите его в настройках ioBroker.plex. Кроме того, добавьте IP-адрес и порт Tautulli, чтобы обеспечить связь API.

##### 2.2.2.2. Webhook
###### Обзор
Чтобы настроить книгу с помощью Tautulli, следуйте инструкциям ниже и убедитесь, что вы выполнили все 4 шага:

1. Добавить агент уведомлений
2. Настройте Webhook в агенте уведомлений
3. Настройте триггеры в агенте уведомлений
4. Настройка данных в агенте уведомлений
5. Настройте параметры уведомлений

###### Описание
После установки откройте страницу настроек на панели инструментов Tautulli и перейдите к агентам уведомлений, как показано ниже:

![Настройки Tautulli](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1. Нажмите _Добавить новый агент уведомлений_ и _Webhook_.
2. Введите свой IP-адрес ioBroker с помощью специального порта, указанного в настройках ioBroker.plex, и конечного пути `` `/ tautulli````, например, `` `http://192.168.178.29: 41891 / tautulli```:

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png) Кроме того, выберите ```POST``` для метода _Webhook_ и введите любое понравившееся описание в _Description_.

3. Затем перейдите на вкладку _Triggers_, выберите нужные (или просто все) агенты уведомлений. Включенный агент уведомлений вызовет событие, которое затем будет отправлено в ioBroker. __Убедитесь ___, чтобы предоставить необходимые данные для каждого из включенных агентов уведомлений на следующем шаге!
4. Теперь, ___ что наиболее важно __, заполните соответствующую полезную нагрузку данных на вкладке _Data_ в соответствии с __ [Конфигурация уведомления найдена здесь] (README-tautulli.md # Notification-configuration) __.

   Скопируйте конфигурацию уведомлений соответствующих агентов уведомлений из предыдущего шага (например, ```Playback Start```, ```Playback Stop```, ```Playback Pause``` и ```Playback Resume```) в каждом из текстовых полей, как показано ниже для § §JJJJJ_4§§:

   ![Таутулли Уведомление](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

5. Наконец, установите флажок «Разрешить последовательные уведомления», чтобы разрешить отправку последовательных уведомлений (например, как просмотренных, так и остановленных уведомлений):

   ![Настройки уведомлений Tautulli](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification_settings.png)

## 3. Каналы и состояния
После настройки как базовой, так и расширенной настройки появятся следующие каналы (библиотеки, серверы и пользователи, конечно, только примеры). Смотрите далее ниже [полный список каналов и состояний](#21-with-basis-setup).

![Примеры каналов и состояний](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 3.1. С базовой настройкой
После успешной базовой настройки будут созданы каналы в соответствии со следующей таблицей. Для получения списка всех состояний, которые будут созданы, пожалуйста, [см выделенный список государств](README-states.md#with-basis-setup).

| Канал / Папка | Описание |
| ------- | ----------- |
| __libraries__ | Плекс Библиотеки |
| __servers__ | Plex Серверы |
| __settings__ | Настройки Plex |

### 3.2. С расширенной настройкой
После успешной расширенной настройки будут автоматически созданы следующие каналы. Для получения списка всех состояний, которые будут созданы, пожалуйста, [см выделенный список государств](README-states.md#with-advanced-setup).

| Канал / Папка | Описание | Замечание |
| ---------------- | ----------- | ------ |
| __ \ _ playing__ | Plex Media играет | с Plex Pass или Tautulli |
| __statistics__ | Plex Watch Статистика | только с Таутулли |
| __users__ | Plex Пользователи | только с Таутулли |

## Changelog

### 1.0.0 (2019-xx-xx) [MILESTONES / PLANNED FEATURES FOR v1.0.0 RELEASE]
- add support for Plex Notifications ([#9](https://github.com/Zefau/ioBroker.plex/issues/9))
- add support for all Tautulli triggers

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
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#6](https://github.com/Zefau/ioBroker.plex/pull/6))
- (Zefau) added support / discovery in [iobroker.discovery](https://github.com/ioBroker/ioBroker.discovery) ([#62](https://github.com/ioBroker/ioBroker.discovery/pull/62))
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

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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