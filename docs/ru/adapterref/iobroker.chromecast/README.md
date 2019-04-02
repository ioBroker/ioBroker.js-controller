---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: Ae1OlCHGy/tIEHalqMKQSUTdoon2Kz4ylbi3rPoOpyM=
---
![логотип](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Количество установок](http://iobroker.live/badges/chromecast-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.chromecast.svg)
![Статус сборки](https://travis-ci.org/angelnu/ioBroker.chromecast.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.chromecast.png?downloads=true)

# IoBroker.chromecast
## Адаптер Google Home для ioBroker
Этот плагин позволяет обнаруживать видео и / или аудио устройства Google Home. Для каждого обнаруженного домашнего устройства создается устройство ioBroker. Это устройство отображает состояние устройства и позволяет отправить ему новый URL для преобразования.

Построить поверх следующих проектов:

  * [ioBroker] (http://www.iobroker.net)
  * [node-castv2-client] (https://github.com/thibauts/node-castv2-client) в качестве домашней клиентской библиотеки.

## Инструкции
1. Установите в ioBroker
   1. Перейдите на вкладку «Адаптеры ioBroker».
   2. Выберите и установите адаптер Google Home
2. Добавьте экземпляр адаптера Google Home
   * он должен автоматически запускаться после установки
3. (необязательно). Если вы планируете потоковую передачу локальных файлов, вам необходимо настроить адаптер.
   * вам нужен экземпляр веб-сервера ioBroker
4. Проверьте свой журнал: вы должны увидеть журналы об обнаруженных устройствах
5. Напишите URL-адрес, например [http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3](http://edge.live.mp3.mdn.newmedia.nacamar. .net / ps-dieneue_rock / livestream_hi.mp3) для chromecast.0. <ваше имя chromecast> `.player.url2play
6. URL должен начать воспроизводиться на вашем устройстве

## Характеристики
* обнаруживать устройства с multicast-dns
  * при желании добавить дополнительные вручную настроенные устройства в панели администратора
* создавать объекты ioBroker для каждого найденного устройства
* каналы статуса, плеера, медиа и метаданных
* управлять устройством Google Home из адаптера
  * установить громкость
  * отключить / включить звук
  * прекратить трансляцию
  * Пауза
  * play url (chromecast.0. <ваше имя в Google Home> `.player.url2play)
    * протестировано с MP3
      * Полный список форматов [здесь] (https://developers.google.com/cast/docs/media).
    * когда URL не начинается с http, тогда предположим, что это локальный файл
      * экспорт файла через веб-сервер ioBroker
    * он воспроизводит только первый файл из списка воспроизведения, например .m3u
* Виджет Vis
  * ПРИМЕЧАНИЕ: требуется [исправлено Vis адаптер] (https://github.com/angelnu/ioBroker.vis).
* Первоначальная поддержка аудиогрупп Chromecast
  * Примечание: это не работает с SSDP -> отключить по умолчанию в настройках адаптера
* Воспроизвести снова последний воспроизводимый поток: просто установите _chromecast.0`. <Ваше устройство> `.status.playing_ в значение _true_

## Чего не хватает?
* добавить конечный автомат для отслеживания состояний: обнаружено -> подключено -> загрузчик плеера -> воспроизведение
* добавить повторы: иногда Google Home не отвечает на запрос
* больше испытаний

## Как построить
1. Оформить заказ из мерзавца
2. Установите grunt с помощью `npm install -g gulp-cli`
3. Установите зависимости node.js: `npm install`
4. Внесите изменения и протестируйте их
5. Измените версию в package.json
6. Проверьте изменения с помощью `gulp`
7. Обновите [changelog] (# changelog) и [news] (io-package.json) с этим [переводчиком] (http://iobroker.net:3000/)
8. Тест Npm
9. git commit & push
10. Npm Publish

## Changelog
### 2.2.3 (2019-03-19)
* news

### 2.2.2 (2019-02-01)
* Fix missing reference when mDNS update is received

### 2.2.1 (2019-01-29)
* Remove mandatory dependency on vis adapter

### 2.2.0 (2019-01-15)
* Option to configure device URLs manually (when devices are in a different subnetwork)

### 2.1.5 (2019-01-14)
* Reconnect on mDNS updates

### 2.0.2 (2019-01-06)
* (angelnu) compact mode support

### 2.0.0 (2018-07-22)
* (bluefox) refactoring and add new states for material

### 1.4.3 (2018-04-03)
* Added enabled flag so some adapters can be ignored

### 1.4.2 (2018-01-30)
* Always use volume parameter for announcements

### 1.4.1 (2018-01-06)
* Fix for languages in io-package

### 1.4.0 (2017.11.26)
* (angelnu) Support for additional languages
* (angelnu) Support for version 3 of the Admin adapter

### 1.3.4 (2017.11.26)
* (angelnu) Update to latest cast2-player - wait for announcement

### 1.3.4 (2017.11.25)
* (angelnu) Rename to Google Home

### 1.3.3 (2017.11.24)
* (bluefox) bump a version

### 1.3.2
* (Vegetto) recognize uncompleted playlist status and trigger a new getStatus

### 1.3.1
* (Vegetto) Fix updateStates to accept null values
* (Vegetto) Add playlist currentItemdId

### 1.3.0
* (Vegetto) Create playlist channel with raw playlist and repeat modes
* (Vegetto) Moved jump and repeatMode from player to plalist channel

### 1.2.2
* (Vegetto) Forgot to step up version.

### 1.2.2
* (Vegetto) Update to player 1.1.3 - support relative paths in playlists

### 1.2.1
* (Vegetto) Update to player 1.1.2 - reconnect on url2play

### 1.2.0
* (Vegetto) Mayor rework
  * Chromecast player and scanner splitted into a separated module
  * **Support for playlists**
  * Improved MIME detection - **OGG files work now**
  * Support for **announcements** - playlist resume after completing announcement
  * Support to **jump** between playlist entries

### 1.1.3
* (Vegetto) bugfix - media title was not kept to url when streamTitle not present

### 1.1.2
* (Vegetto) Update npm dependencies in package.json to latest versions

### 1.1.1
* (Vegetto) bugfix - not playing when another chromecast playing same url
* (Vegetto) added additional logs

### 1.1.0
* (Vegetto) **Added support for playlist m3u, asx and pls files - play first entry**

### 1.0.9
* (Vegetto) Do not use this in callbacks. Replaced with _that_
* (Vegetto) Fix contentId not being updated. This was breaking the _play last stream_ feature

### 1.0.8
* (Vegetto) Do not try to stop if not playing

### 1.0.7
* (Vegetto) Show MultizoneLeader as playing
* (Vegetto) Set pause state to false when modified and device is not playing

### 1.0.6
* (Vegetto) Fix widget crashing when devId is not set

### 1.0.2
* (Vegetto) Fix deprecation warning - use dns-txt instead of mdns-txt

### 1.0.1
* (Vegetto) Fix exception

### 1.0.0
* (Vegetto) **Try to play last played URL when setting playing state to true**
* (Vegetto) Fix jshint and jscs findings

### 0.2.1
* (Vegetto) Update readme
* (Vegetto) Integrated into iobroker: listed there

### 0.2.0
* (Vegetto) Add vis widget (Alpha)
* (Vegetto) Performance improvements

### 0.1.4
* (Vegetto) Stability fixes - error handling, race-condition fixes, etc
* (Vegetto) Clean getMediaInfo handler when disconnecting player
* (Vegetto) Added support to retrieve ICY metadata from https sources
* (Vegetto) Moved code for querying media info to a separate class
* (Vegetto) **Support dynamic IP/port changes (audio groups)**

### 0.1.3
* (Vegetto) Added re-connection with retries. Will try for up 42 hours.
* (Vegetto) Support for triggering a reconnection by writing to <device>.status.connected
* (Vegetto) Fixed race condition when playing local file
* (Vegetto) **Added support for playing local files**
* (Bluefox) Russian translations
* (Vegetto) Update stale metadata when not present in player status
* (Vegetto) **Initial support for audio groups**
* (Vegetto) **Retrieve media type and title from URLs that support ICY**
* (Vegetto) Added displayName, isActiveInput and isStandBy status

### 0.1.2
* (Vegetto) Merge base

### 0.1.1
* (Vegetto) Fix package syntax
* (Vegetto) Fix package dependencies

### 0.1.0
* (Vegetto) Initial release

## License
The MIT License (MIT)

Copyright (c) 2015-2019 Vegetto <iobroker@angelnu.com>

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