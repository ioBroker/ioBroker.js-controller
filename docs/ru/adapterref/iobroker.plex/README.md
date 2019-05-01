---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: 0CYPY9d7zzGnFhi8JCG9N4S4Grx5q9BTMi02cJq1NqY=
---
![логотип](https://raw.githubusercontent.com/Zefau/ioBroker.plex/master/admin/plex.jpg)

![Количество установок](http://iobroker.live/badges/plex-installed.svg)
![Стабильная версия](http://iobroker.live/badges/plex-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.plex.svg)
![Трэвис CI](https://travis-ci.org/Zefau/ioBroker.plex.svg?branch=master)
![Загрузки](https://img.shields.io/npm/dm/iobroker.plex.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/Zefau/ioBroker.plex.svg)
![NPM](https://nodei.co/npm/iobroker.plex.png?downloads=true)

# IoBroker.plex Интеграция Plex Media Server в ioBroker (с Plex Pass или без него). Кроме того, интеграция Tautulli.
**Оглавление**

1. [Инструкции по настройке] (# 1-инструкции по настройке)
   1. [Базовая настройка] (# 11-basic-setup)
   2. [Расширенная настройка] (# 12-advanced-setup-plex-pass-or-tautulli)
2. [Каналы и состояния] (# 2-каналы - состояния)
   1. [с базовой настройкой] (# 21 с базовой установкой)
   2. [с расширенной настройкой] (# 22 с расширенной настройкой)
3. [Журнал изменений] (# changelog)
4. [Лицензия] (# лицензия)

## 1. Инструкция по настройке
### 1.1. Основные настройки
Для базовой настройки требуется только указать IP-адрес (и порт) вашей установки Plex. После этого ioBroker.plex извлечет все основные данные (включая серверы, библиотеки). См. [Каналы и Штаты](#21-with-basis-setup) для полного списка основных данных.

### 1.2. Расширенная настройка (Plex Pass или Tautulli)
#### 1.2.1. Плекс Пасс
Если вы являетесь пользователем Plex Pass, вы можете [настроить веб-крючок](https://support.plex.tv/articles/115002267687-webhooks/#toc-0) в Настройках Plex, чтобы получить текущее событие / действие с вашего Plex Media Server (воспроизведение, пауза, возобновление, остановка, просмотр и оценка).

Перейдите к своему Plex Media Server и перейдите к ```Settings``` и ```Webhook```. Создайте новый веб-крючок, нажав ```Add Webhook``` и введите свой IP-адрес ioBroker с настраиваемым портом, указанным в настройках ioBroker.plex и в конце пути ```/plex```, например ```http://192.168.178.29:41891/plex```:

![Plex Webhook](https://raw.githubusercontent.com/Zefau/ioBroker.plex/master/img/screenshot_plex-webhook.png)

#### 1.2.2.Tautulli
[Tautulli - это стороннее приложение] (https://tautulli.com/#about), которое вы можете запускать вместе со своим Plex Media Server для мониторинга активности и отслеживания различной статистики. Самое главное, что эта статистика включает в себя то, что было просмотрено, кто его смотрел, когда и где они смотрели, и как это смотрели. Вся статистика представлена в приятном и понятном интерфейсе со множеством таблиц и графиков, что позволяет легко хвастаться своим сервером всем остальным. Проверьте [Предварительный просмотр Tautulli] (https://tautulli.com/#preview) и [установите его на предпочитаемую систему](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation), если вы заинтересованы.

Этот адаптер подключается к [Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md), а также принимает события webhook от Tautulli.

##### 1.2.2.1. API
После установки Tautulli откройте страницу _Settings_ на панели инструментов Tautulli и перейдите на _Web Interface_. Прокрутите вниз до раздела _API_ и убедитесь, что флажок ```Enable API``` отмечен. Скопируйте ```API key``` и введите его в настройках ioBroker.plex. Кроме того, добавьте IP-адрес и порт Tautulli, чтобы обеспечить связь API.

##### 1.2.2.2. Webhook
###### Обзор
Чтобы настроить книгу с помощью Tautulli, следуйте инструкциям ниже и убедитесь, что вы выполнили все 4 шага:

1. Добавить агент уведомлений
2. Настройте Webhook в агенте уведомлений
3. Настройте триггеры в агенте уведомлений
4. Настройка данных в агенте уведомлений

###### Описание
После установки откройте страницу настроек на панели инструментов Tautulli и перейдите к агентам уведомлений, как показано ниже:

![Настройки Tautulli](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1. Нажмите _Добавить новый агент уведомлений_ и _Webhook_.
2. Введите свой IP-адрес ioBroker с помощью специального порта, указанного в настройках ioBroker.plex, и конечного пути `` `/ tautulli````, например `` `http://192.168.178.29: 41891 / tautulli```:

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png) Кроме того, выберите ```POST``` для метода _Webhook_ и введите любое понравившееся описание в _Description_.

3. Затем перейдите на вкладку _Triggers_, выберите желаемые (или просто все) параметры
4. И наконец, ___ наиболее важно ___ заполните соответствующую полезную нагрузку данных на вкладке _Data_ в соответствии с [найденной здесь конфигурацией уведомлений] (https://github.com/Zefau/ioBroker.plex/blob/master/README-tautulli.md# уведомление о-конфигурация). Скопируйте весь контент в первые четыре агента уведомлений (`` `Playback Start```", `` `Playback Stop```,` `` Playback Pause``` и `` `Playback Resume```)), как показано ниже для `` `Playback Start```:

   ![Таутулли Уведомление](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

## 2. Каналы и состояния
После настройки как базовой, так и расширенной настройки появятся следующие каналы (библиотеки, серверы и пользователи, конечно, только примеры). Смотрите далее ниже [полный список каналов и состояний](#21-with-basis-setup).

![Примеры каналов и состояний](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 2.1. С базовой настройкой
После успешной базовой настройки будут созданы следующие каналы и состояния:

| Канал / Папка | Государство | Описание |
| ------- | ----- | ----------- |
| __libraries__ | - | Плекс Библиотеки |
| __servers__ | - | Plex Серверы |
| __settings__ | - | Настройки Plex |

### 2.2. С расширенной настройкой
После успешной расширенной настройки будут по-прежнему созданы следующие каналы и состояния:

| Канал / Папка | Государство | Описание | Замечание |
| ------- | ----- | ----------- | ------ |
| __ \ _ playing__ | - | Plex Media играет | с Plex Pass или Tautulli |
| __statistics__ | - | Plex Watch Статистика | только с Таутулли |
| statistics.libraries | - | Plex Watch Статистика | только с Таутулли |
| statistics.libraries ._ \ <имя_библиотеки \> _ | - | Статистика просмотра библиотеки _ \ <имя_библиотеки \> _ | только с Таутулли |
| statistics.users | - | Статистика просмотра пользователя | только с Таутулли |
| statistics.users ._ \ <userName \> _ | _ (те же состояния, что и в statistics.libraries) _ | Статистика просмотра пользователя _ \ <userName \> _ | только с Таутулли |
| __users__ | - | Plex Пользователи | только с Таутулли |
| пользователи ._ \ <userName \> _ | - | Пользователь Plex _ \ <userName \> _ | только с Таутулли |

## Changelog

### 1.0.0 (2019-xx-xx) [MILESTONES / PLANNED FEATURES FOR v1.0.0 RELEASE]
- add Plex Pass Authentication by PIN (and removing current authentication with user / password)
- add playback control for players
- add support for all Tautulli triggers
- add state description for object tree ```_playing```
- add support / discovery in [iobroker.discovery](https://github.com/ioBroker/ioBroker.discovery)

### 0.2.0 (2019-05-xx) [UPCOMING RELEASE]
- fixed @iobroker/adapter-core dependency

### 0.1.0 (2019-04-26) [CURRENT RELEASE]
- get initial data from Plex API
- receive events from Plex Webhook (Plex Pass only)
- receive events from Tatulli (if used)

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