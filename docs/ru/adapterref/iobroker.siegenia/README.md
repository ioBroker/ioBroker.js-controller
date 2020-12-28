---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.siegenia/README.md
title: ioBroker.siegenia
hash: 4S3fJKuQab8SA1AlpY1Ei5iRwPQxcS6KkamGo62zAro=
---
# IoBroker.siegenia

![Версия NPM](http://img.shields.io/npm/v/iobroker.siegenia.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.siegenia.svg)
![Статус зависимости](https://img.shields.io/david/Apollon77/iobroker.siegenia.svg)
![Известные уязвимости](https://snyk.io/test/github/Apollon77/ioBroker.siegenia/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.siegenia.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/Apollon77/ioBroker.siegenia/master.svg)

<img src="./admin/siegenia_logo.jpg"/>

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

Этот адаптер обеспечивает поддержку ioBroker для устройств управления климатом и воздухом Siegenia (https://www.siegenia.com).

Для адаптера требуется минимум Nodejs 8.x.

## Набор функций
Этот адаптер поддерживает все текущие устройства:

* АЭРОПАК
* АЭРОМАТ ВТ
* ПРИВОД axxent DK / MH
* SENSOAIR
* AEROVITAL атмосфера
* Семья MHS
* АЭРОТУБА
* Универсальный модуль

Адаптер способен автоматически обнаруживать устройства Siegenia в той же сети, что и ioBroker, и выводит их список в своем интерфейсе администратора. Вам нужно только исправить пользователя и пароль после обнаружения. Но вы также можете ввести IP-адреса и данные для входа вручную.

Все доступные поля данных обнаруженного устройства отображаются в объектах и предоставляют текущие данные и / или позволяют изменять данные.

Таймеры и другие более сложные данные отображаются адаптером, но их можно изменить только через приложение Siegenia.

## Changelog

### 1.0.1 (2020-12-24)
* (Apollon77) update dependencies
* (Apollon77) disconnect device if authentication was not successful

### 1.0.0
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2019 Apollon77

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