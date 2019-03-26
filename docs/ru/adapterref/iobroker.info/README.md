---
BADGE-Number of Installations: http://iobroker.live/badges/info-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.info.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.info.svg
BADGE-NPM: https://nodei.co/npm/iobroker.info.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/iobroker-community-adapters/ioBroker.info/master.svg
BADGE-Dependency Status: https://img.shields.io/david/iobroker-community-adapters/iobroker.info.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/iobroker-community-adapters/ioBroker.info/badge.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.info/README.md
title: Администратор
hash: NmaBkM4/dUBUPYVrrD0VE3t1AkbDP5bDMCmQstBFB6o=
---
# Admin
Информационный адаптер был разработан для предоставления пользователю различной информации о системе, ioBroker и соответствующих темах. Пользователь должен получить обзор всех интересных и важных данных, а команда ioBroker получит возможность связаться с пользователем еще быстрее, если будет доступна важная информация

# Установка
Чтобы увидеть информационное окно на вкладке «Вкладка», необходимо сначала установить его как «Видимый» в Admin после установки. Для этого нажмите на левый треугольник в верхнем левом углу окна администратора и выберите «Информация» в меню.

# Конфигурация
* Не показывать часы - чтобы скрыть часы в левом верхнем углу.
* Показать запросы адаптера - отображает панель с запросами адаптера.
    * Запросы адаптера закрываются при запуске - Панель с запросами адаптера закрывается при запуске информационного окна.
* Просмотр известных ошибок - отображает панель с известными ошибками и запросами на установленные адаптеры.
    * Известные ошибки при запуске закрыты - Панель с известными ошибками закрывается при запуске информационного окна.

* Показать новости от iobroker.net - Отображает панель с официальными новостями ioBroker.
* Показать последние записи форума - Отображает панель с последними записями форума.
* Feednami API Key - если вы вызываете ioBroker, используя имя хоста, например iobroker: 8081 или что-то в этом роде, вам нужно бесплатно зарегистрироваться в Feednami, чтобы получить соответствующий ключ API. Это не обязательно для доступа через IP-адрес.

* Показать документацию - отображает кнопку для документации.
    * Выберите требуемые языки для документации - Выбор языков, которые будут включены в документацию.

* Поиск Github для неизвестных адаптеров (Эксперты) - отображает панель поиска неутвержденных адаптеров в Github.
    * Sort Adapter by - сортирует результаты поиска по имени, дате создания или последнему обновлению.
    * обратный порядок - меняет порядок результатов.
    * Новые адаптеры закрыты при запуске - Панель с неизвестными адаптерами закрывается при запуске информационного окна.

* Не загружать текущие системные данные - текущие системные данные не загружаются циклически.
    * Загрузка данных ЦП каждые х секунд - данные ЦП циклически загружаются каждые 2–10 секунд. 0 выключен.
    * Загружать данные памяти каждые x секунд - данные памяти загружаются циклически каждые 2-10 секунд. 0 выключен.
    * Загрузка данных на жестком диске каждые x секунд. Данные памяти загружаются циклически каждые 2-10 секунд. 0 выключен.

# Информация вкладка
## Часы
Часы не имеют специальной функции и могут быть отключены в любое время в конфигурации. <img height="200" src="img/clock.png">

## Сообщения
<img height="200" src="img/messages.png">

### Сообщения (виджет VIS)
## Документация
<img height="200" src="img/documentation.png">

## Обновления
<img height="200" src="img/updates.png">

## Новые адаптеры
<img height="200" src="img/new_adapters.png">

## Системная информация
<img height="200" src="img/systeminfo.png">

### Системная информация (детальный просмотр)
## Запросы адаптера
<img height="200" src="img/adapter_requests.png">

## Проблемы и ошибки
<img height="200" src="img/issues_bugs.png">

## Адаптер ioBroker на Github
<img height="200" src="img/adapter_search.png">

## Новости
<img height="200" src="img/news.png">

## Форум
<img height="200" src="img/forum.png">

## Changelog

### 1.3.x (2019-04-01)
* (ldittmar) better system information

### 1.2.7 (2019-03-17)
* (ldittmar) little fixes
* (ldittmar) unknow adapters search new design
* (ldittmar) better design for PC monitor
* (ldittmar) unknow adapters show more informations
* (ldittmar) stable version

### 1.2.5 (2019-03-14)
* (ldittmar) show adapter requests
* (ldittmar) show bugs and issues
* (ldittmar) diyplay important links
* (ldittmar) show important popup news
* (ldittmar) vis widget for popup news

### 1.1.3 (2019-01-03)
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support
* (ldittmar) add new forum support
* (ldittmar) add chinese forum support
* (ldittmar) move to iobroker-community-adapters

### 1.0.2 (2018-11-30)
* (ldittmar) fixed problems with Node version info in multihost system

### 1.0.1 (2018-11-27)
* (ldittmar) search for new adapters on Github
* (ldittmar) check for Node.js update
* (ldittmar) https problems with news and forum data solved
* (ldittmar) polish added as language

### 1.0.0 (2018-11-25)
* (ldittmar) full compatibility to Admin 3.x
* (ldittmar) clock can be disabled

### 0.1.0 (2018-01-02)
* (ldittmar) compatibility to Admin 3.x / beta release

### 0.0.6 (2017-12-11)
* (ldittmar) some fixes / install and update implemented

### 0.0.4 (2017-12-08)
* (ldittmar) some fixes and design correction
* (ldittmar) show informations about adapters (update/new)
* (ldittmar) show system informations

### 0.0.1 (2017-11-23)
* (ldittmar) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017 - 2019 ldittmar <iobroker@lmdsoft.de>

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