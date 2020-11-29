---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.net-tools/README.md
title: Сетевые инструменты
hash: IzxWLgZMxRAWfn8DB4DpXBGjGipYz94IyOFgl8VTfPw=
---
![Логотип](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![Количество установок](http://iobroker.live/badges/net-tools-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.net-tools.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Тесты](https://travis-ci.org/jey-cee/ioBroker.net-tools.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)

# Сетевые инструменты
### Обнаружение устройств в сети
Установите для объекта обнаружения значение true, чтобы обнаруживать устройства в вашей сети, этот процесс занимает некоторое время.
Эта функция предоставляется адаптером обнаружения, что означает, что обнаружение будет установлено, если оно не установлено, и его необходимо запустить.

Примечание: эта функция ограничена подсетью хоста ioBroker.

### Pings настроили IP-адреса
Пингует указанные IP-адреса через определенный интервал и отслеживает результаты. (жив, об / с, время)

### Wake On LAN
Установите для объекта wol значение true, и на ваше устройство будут отправлены 3 пакета WOL с временем ожидания 750 мс.

### Сканирование портов
Установите для сканирования значение true, при этом будут сканироваться все открытые порты в диапазоне 0-65535. Этот процесс требует времени.
Результат будет записан в порты объекта.

---

## Для разработчиков
#### Получить Mac для определенного устройства
`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Примечание: эта функция ограничена подсетью хоста ioBroker.

#### Пинг определенного IP-адреса
`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake On LAN
`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация по Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## [Спонсоры](https://github.com/iobroker-community-adapters/ioBroker.net-tools/blob/master/SPONSORS.MD)
Если вам нравятся мои работы, пожалуйста, сделайте личное пожертвование (это личная ссылка на пожертвование для Jey Cee, не имеющая отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

##### Присоединяйтесь к серверу Discord, чтобы обсудить все, что касается интеграции сетевых инструментов!
<a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## Changelog

### 0.1.0 
* initial release

## License

The MIT License (MIT)

Copyright (c) 2020, Jey Cee <jey-cee@live.com>

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