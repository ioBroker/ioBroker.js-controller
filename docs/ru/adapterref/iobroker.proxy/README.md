---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.proxy/README.md
title: ioBroker.proxy
hash: iHHYy+0aocpDNzYRw4oG9/MEk1MVBab4p9GQzuyPUYM=
---
![логотип](../../../en/adapterref/iobroker.proxy/admin/proxy.png)

![Количество установок](http://iobroker.live/badges/proxy-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.proxy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.proxy.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.proxy.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.proxy.png?downloads=true)

# IoBroker.proxy =================
## Использование
Позволяет получить доступ к определенным URL или локальным файлам через один веб-сервер.

Указанные маршруты будут доступны в разделе ```http://ip:8082/proxy.0/context/...```. Конечно, порт, протокол «proxy.0» может меняться в зависимости от настроек.

## Конфигурация
- Расширить веб-адаптер: для какого веб-экземпляра будет активен этот прокси.
- Путь маршрута: путь для прокси. Если «/proxy.0», то маршруты будут доступны в `` `http:// webIP: 8082 / proxy.0 / ...` ``
- Тайм-аут ошибки (мс): минимальный интервал между повторными попытками, если запрошенный ресурс был недоступен или вернула ошибку.

## Пример настроек
| Контекст | URL | Описание |
|----------------|:---------------------------------------------------|:---------------------------------------------------|
| админ / | http:// localhost: 8081 | доступ к странице администратора |
| маршрутизатор / | http://192.168.1.1 | доступ к локальному роутеру |
| камера / | http:// user: pass@192.168.1.123 | доступ к веб-камере (например, вызов http: // ip: 8082 / proxy.0 / cam / web / snapshot.jpg) |
| реж / | / TMP / | доступ к локальному каталогу "/ tmp /" |
| реж / | тмп / | доступ к локальному каталогу "/ opt / iobroker / tmp" |
| file.jpg | /tmp/picture.jpg | доступ к локальному файлу "/tmp/picture.jpg" |

** Не все устройства могут быть доступны через прокси.

Некоторые устройства хотят находиться в корне ```http://ip/``` и не могут работать под ```http://ip/proxy.0/context/```.

Вы можете узнать больше о контексте [Вот](https://www.npmjs.com/package/http-proxy-middleware#context-matching)

Кроме того, пользователь может определить маршрут маршрута для запросов прокси.

## Changelog
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