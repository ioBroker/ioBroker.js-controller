---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.egigeozone/README.md
title: ioBroker.egigeozone
hash: RA1yeaAyhKiG1Wa1zx6oqvF/MTg5TbZcvvOx0RM6Dco=
---
# IoBroker.egigeozone
# Описание

![Количество установок](http://iobroker.live/badges/egigeozone-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.egigeozone.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.egigeozone.svg)
![Статус зависимости](https://img.shields.io/david/basgo/iobroker.egigeozone.svg)
![NPM](https://nodei.co/npm/iobroker.egigeozone.png?downloads=true)
![Трэвис-CI](https://img.shields.io/travis/BasGo/ioBroker.egigeozone/master.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/eobyt279ncmd9qbi/branch/master?svg=true)

Это адаптер ioBroker для приложения геозон для Android "EgiGeoZone" ([Веб-сайт](https://egigeozone.de/)). Он может получать события геозоны в виде HTTP-запросов при входе или выходе из определенной области с вашего мобильного устройства.

# Совет по безопасности
Не рекомендуется выставлять этот адаптер в общедоступный Интернет (например, открыв настроенный порт в маршрутизаторе). Это означает, что любой запрос к этому порту будет перенаправлен на экземпляр ioBroker, на котором работает адаптер. Существует несколько вариантов получения большей безопасности для доступа к этому адаптеру:

* Всегда используйте VPN-соединение для запросов или
* интегрировать прокси-сервер (например, nginx) для фильтрации входящих запросов.

# Конфигурация
Внутри EgiGeoZone URL должен быть определен с использованием следующего синтаксиса:

протокол: // адрес: порт / человек

* **протокол** может быть **http** или **https**
* **адрес** должен быть адресом, к которому доступен экземпляр адаптера.
* **порт** должен быть портом, который прослушивает адаптер.
* **person** - это человек, который будет использоваться для составления списка внутри массива atHome.

### Примеры
* https:// my-domain: 7654 / John или
* http:// my-domain: 7654 / Paul

# Кредиты
Реализация в основном основана на dschaedls [ioBroker.geofency] (https://github.com/ioBroker/ioBroker.geofency) адаптер. Логотип был взят из [Бесплатные иконки PNG](http://www.freeiconspng.com/images/maps-icon) и была изменена, чтобы иметь прозрачный фон.

## Changelog

### 0.1.2
* (BasGo) Changed icon
* (BasGo) Updated NPM reference

### 0.1.1
* (BasGo) Added whitespace handling for home location

### 0.1.0
* (BasGo) Fixed issue with authorization
* (BasGo) Added description for URL configuration

### 0.0.2
* (BasGo) Updated NPM reference

### 0.0.1
* (BasGo) Initial release

## License
This adapter is licensed under the [MIT license](../blob/master/LICENSE) which is part of this repository.