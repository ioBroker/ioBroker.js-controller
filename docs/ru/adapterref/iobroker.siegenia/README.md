---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.siegenia/README.md
title: ioBroker.siegenia
hash: f+3oUEXvUSclrjXfaamqU8G2PWLUKMavLqMbtYs224U=
---
# IoBroker.siegenia

![Версия NPM](http://img.shields.io/npm/v/iobroker.siegenia.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.siegenia.svg)
![Статус зависимости](https://img.shields.io/david/Apollon77/iobroker.siegenia.svg)
![Известные уязвимости](https://snyk.io/test/github/Apollon77/ioBroker.siegenia/badge.svg)
![NPM](https://nodei.co/npm/iobroker.siegenia.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Apollon77/ioBroker.siegenia/master.svg)

<img src="./admin/siegenia_logo.jpg"/>

Этот адаптер обеспечивает поддержку ioBroker для устройств контроля климата и воздуха Siegenia (https://www.siegenia.com)

Адаптер требует минимум Nodejs 8.x.

## Набор функций
Все текущие устройства поддерживаются этим адаптером:

* AEROPAC
* AEROMAT VT
* ПРИВОД axxent DK / MH
* SENSOAIR
* AEROVITAL атмосфера
* Семейство MHS
* AEROTUBE
* Универсальный модуль

Адаптер способен автоматически обнаруживать устройства Siegenia в той же сети, что и ioBroker, и отображать их в своем интерфейсе администратора. Вам нужно только исправить имя пользователя и пароль после обнаружения. Но вы также можете ввести IP-адреса и данные для входа вручную.

Все доступные поля данных обнаруженного устройства отображаются в объектах и предоставляют текущие данные и / или позволяют изменять данные.

Таймеры и другие более сложные данные отображаются адаптером, но их можно изменить только через приложение Siegenia.

## Changelog

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