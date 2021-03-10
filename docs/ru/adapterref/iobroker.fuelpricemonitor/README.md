---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fuelpricemonitor/README.md
title: ioBroker.fuelpricemonitor
hash: VveHgPApeFx1VhAc2EheNXz5kXX0ErbqiB6pBQmc9RI=
---
![Логотип](../../../en/adapterref/iobroker.fuelpricemonitor/admin/fuelpricemonitor.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.fuelpricemonitor.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/fuelpricemonitor-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fuelpricemonitor.svg)
![Количество установок (последнее)](http://iobroker.live/badges/fuelpricemonitor-installed.svg)
![Статус зависимости](https://img.shields.io/david/HGlab01/iobroker.fuelpricemonitor.svg)
![Известные уязвимости](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.fuelpricemonitor.png?downloads=true)

# IoBroker.fuelpricemonitor
[![Статус FOSSA] (https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_shield) ![Тестирование и выпуск](https://github.com/HGlab01/ioBroker.fuelpricemonitor/workflows/Test%20and%20Release/badge.svg)

## Адаптер fuelpricemonitor для ioBroker
Этот адаптер извлекает цены на топливо (дизельное топливо, Super95 и CNG) из официальной базы данных Австрии на основе вашего настроенного географического положения. Могут быть добавлены дополнительные места.
Расписание по умолчанию выполняется каждые 20 минут как задание cron на вкладке экземпляра.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

** РАБОТАЕТ С ВЕРСИЕЙ JSCONTROLER 3.2.16 ИЛИ ПОЗЖЕ! **

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.2.1 (2021-03-08)
* (HGlab01) Bump js-controller to 3.2.16 for proper device/channel/state deletion
* (HGlab01) use function deleteEverything from json-Explorer@0.0.13
* (HGlab01) improve device/channel/state cleaning

### 0.2.0 (2021-03-04)
* (HGlab01) additional locations can be added
* (HGlab01) for a proper working of the new version a uninstall/install is recommended
* (HGlab01) small improvements

### 0.1.4 (2021-02-22)
* (HGlab01) optimize device/channel deletion
* (HGlab01) improve Sentry handling

### 0.1.3 (2021-02-20)
* (HGlab01) add attributes accessMod and clubCardText
* (HGlab01) Improve logs
* (HGlab01) fuel type (Diesel, Super95, CNG) can be selected

### 0.1.2 (2021-02-17)
* (HGlab01) first beta version

### 0.0.1-3 (2021-01-07)
* (HGlab01) first alpha version

## License
MIT License

Copyright (c) 2021 HGlab01 <iobroker.fuelpricemonitor@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_large)