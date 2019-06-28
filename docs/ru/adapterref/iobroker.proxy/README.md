---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.proxy/README.md
title: ioBroker.proxy
hash: //IRKnZisUrRTj8PhVbFCytT++DK67nIbOBiUfK1sBs=
---
![логотип](../../../en/adapterref/iobroker.proxy/admin/proxy.png)

![Количество установок](http://iobroker.live/badges/proxy-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.proxy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.proxy.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.proxy.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.proxy.png?downloads=true)

# IoBroker.proxy
## Использование
Позволяет получить доступ к определенным URL или локальным файлам через один веб-сервер.

Указанные маршруты будут доступны в соответствии с `http://ip:8082/proxy.0/context/...`. Конечно, порт, протокол, `proxy.0`, может меняться в зависимости от настроек.

## Конфигурация
- Расширить веб-адаптер: для какого веб-экземпляра будет активен этот прокси.
- Путь маршрута: путь для прокси. Если «/proxy.0», то маршруты будут доступны по адресу http:// webIP: 8082 / proxy.0 / ...
- Тайм-аут ошибки (мс): минимальный интервал между повторными попытками, если запрошенный ресурс был недоступен или вернула ошибку.
- Используйте простой прокси: в этом случае будет использоваться очень простой, но надежный метод. Он не подходит для веб-сокетов или POST-запросов. Используйте этот метод, если у вас есть какие-то проблемы с WEB-экземпляром или с socket.io.

## Пример настроек
| Контекст | URL | Описание |
|----------------|:---------------------------------------------------|:---------------------------------------------------|
| админ / | http:// localhost: 8081 | доступ к странице администратора |
| маршрутизатор / | http://192.168.1.1 | доступ к локальному роутеру |
| камера / | http:// user: pass@192.168.1.123 | доступ к веб-камере (например, вызов http: // ip: 8082 / proxy.0 / cam / web / snapshot.jpg) |
| реж / | / TMP / | доступ к локальному каталогу "/ tmp /" |
| реж / | тмп / | доступ к локальному каталогу "/ opt / iobroker / tmp" |
| file.jpg | /tmp/picture.jpg | доступ к локальному файлу "/tmp/picture.jpg" |

** Не все устройства могут быть доступны через прокси. **

Некоторые устройства хотят находиться в корневом каталоге `http://ip/` и не могут работать под `http://ip/proxy.0/context/`.

Вы можете узнать больше о контексте [Вот](https://www.npmjs.com/package/http-proxy-middleware#context-matching)

Кроме того, пользователь может определить маршрут маршрута для запросов прокси.

## Changelog
### 1.1.0 (2019-06-27)
* (bluefox) Implemented simple proxy to eliminate socket.io problem

### 1.0.3 (2018-07-14)
* (bluefox) Newer mime version used

### 1.0.2 (2018-06-30)
* (bluefox) URI was decoded for usage of special chars in password and login

### 1.0.1 (2018-03-01)
* (bluefox) Fixed error: after 10 timeouts the web cam was never reachable
* (bluefox) Ready for Admin3

### 1.0.0 (2017-10-09)
* (bluefox) do not allow the error generation to fast

### 0.2.0 (2017-03-13)
* (bluefox) fix run-mode

### 0.0.1 (2017-01-09)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2019 bluefox <dogafox@gmail.com>

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