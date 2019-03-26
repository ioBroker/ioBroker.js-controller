---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.places/README.md
title: ioBroker.places
hash: 699AW5/zj67nyWmkPFOvuPyuzBD73yQJbVkav9B3qHk=
---
![логотип](../../../en/adapterref/iobroker.places/admin/places.png)

![Количество установок](http://iobroker.live/badges/places-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.places.svg)
![Статус зависимости](https://img.shields.io/david/basgo/iobroker.places.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.places.svg)
![Github Issues](http://githubbadges.herokuapp.com/BasGo/ioBroker.places/issues.svg)
![Трэвис-CI](https://img.shields.io/travis/BasGo/ioBroker.places/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/eobyt279ncmd9qbi/branch/master?svg=true)

# IoBroker.places
## Описание
Это адаптер ioBroker для обработки сообщений с информацией о местоположении, который должен содержать как минимум пользователя, геопозицию и временную метку. Адаптеры анализируют, находится ли информация о местоположении в радиусе вокруг конфигурации местоположения ioBroker или дополнительных других мест.

## Конфигурация
Существует только одно обязательное значение конфигурации: радиус (в метрах), который будет использоваться для определения текущего местоположения пользователя. Местоположение ioBroker используется для идентификации пользователей, находящихся «дома», другие места могут быть добавлены как часть конфигурации.

* **Радиус** (_mandatory_) должен быть радиусом в метрах, используемым для проверки того, находится ли пользователь в определенном месте (дома или на заказ).

* **Имя для дома** можно использовать для установки собственного имени для домашнего места.

* **Ключ API Карт Google** будет использоваться для включения геокодирования. Отсутствующий ключ API будет извлечен из настроенного экземпляра vis-map (если он доступен), когда откроется страница конфигурации.

* **Геокодирование Карт Google** можно активировать, чтобы получить реальный адрес и высоту для заданной геопозиции.

* **Места** - это гибкий список, содержащий пользовательские места, где каждое место должно иметь допустимые значения для имени, широты и долготы.

* **Пользователи** - это гибкий список, содержащий сопоставления пользователей.

## Использование
Для обработки обновления местоположения просто отправьте сообщение, используя следующий синтаксис:

```javascript
// send a message to all instances of places adapter
sendTo('locations', {
        user:       "Name of person",
        latitude:   50.9576191,
        longitude:  6.8272409,
        timestamp:  1520932471
});

// send a message to a specific instance of places adapter adapter
sendTo('locations.0', {
        user:       "Name of person",
        latitude:   50.9576191,
        longitude:  6.8272409,
        timestamp:  1520932471
});

// send a message to a specific instance and define a callback
sendTo('locations.0', {
        user:       "Name of person",
        latitude:   50.9576191,
        longitude:  6.8272409,
        timestamp:  1520932471
}, function (res) { log(JSON.stringify(res)); });
```

## Структура для возвращаемых сообщений
Следующий блок показывает, как выглядят ответные сообщения. Для каждого значения дерево объектов ioBroker имеет соответствующее состояние.

```javascript
{
    "user":         "Name of person",       // name of person (may have been replaced by user mapping)
    "latitude":     50.9576191,
    "longitude":    6.8272409,
    "timestamp":    1520932471000,
    "date":         "2018-03-13 10:14:31",  // date extracted from timestamp
    "atHome":       false,                  // true if inside the configured radius around ioBroker
    "homeDistance": 104898,                 // distance in meters between position and ioBroker
    "name":         "",                     // name of place found within the configuration
    "address":      "",                     // readable address (if geocoding is active)
    "elevation":    "",                     // elevation in meters (if geocoding is active)
}
```

## Пример: OwnTracks + ioBroker.iot + ioBroker.places
### 1. Настройте iobroker.iot
Добавить пользовательские услуги **xyz** в **Белый список для услуг**

### 2. Настройка мобильных приложений OwnTracks
Измените режим на **HTTP Private** и используйте следующий адрес в качестве **Host** https://iobroker.pro/service/custom_xyz/ <user-app-key>

### 3. Настроить iobroker.places
На вкладке Интеграция необходимо выбрать экземпляр облачного адаптера и **xyz** в качестве службы. Адаптер прослушает входящие запросы на услугу и начнет обработку.

## Пример: Telegram + ioBroker.telegram + ioBroker.places
### 1. Настроить iobroker.telegram
Включите опцию **для хранения необработанных запросов**

### 2. Создать скрипт (ioBroker.javascript)
Создайте короткий скрипт с подпиской на необработанный запрос, например из **telegram.0.communicate.requestRaw** и отправьте новый объект запроса в iobroker.places (или его экземпляр):

```javascript
on({id: "telegram.0.communicate.requestRaw", change: "ne"}, function (obj) {
    var data = JSON.parse(obj.newState.val);
    if (data.from && data.location) {
        sendTo('places.0', {
            user: data.from.first_name,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            timestamp: data.date
        }, function (res) { log('places analyzed telegram position as: ' + JSON.stringify(res)); });
    }
});
```

## Кредиты
Реализация частично основана на dschaedls [ioBroker.geofency] (https://github.com/ioBroker/ioBroker.geofency) адаптер. Логотип был взят из [Бесплатные иконки PNG](http://www.freeiconspng.com/images/maps-icon) и была изменена, чтобы иметь прозрачный фон.

## Changelog

### 0.7.0 (2019-01-12)
* (BasGo) Added compact mode, replaced integration of iobroker.cloud with iobroker.iot

### 0.6.2 (2018-12-06)
* (bluefox) Error with blockly was fixed

### 0.6.1
* (BasGo) Added handling for invalid route details

### 0.6.0
* (BasGo) Changed implementation to use promises
* (BasGo) Added route details for driving home

### 0.5.1
* (BasGo) Extended help texts

### 0.5.0
* (BasGo) Added optional subscription for cloud adapter

### 0.4.2
* (BasGo) UI fixes

### 0.4.1
* (BasGo) Configuration dialog extended

### 0.4.0
* (BasGo) Google Maps can be used for configuration
* (BasGo) Geocoding can be activated

### 0.3.0
* (BasGo) Added user mappings

### 0.2.3
* (BasGo) Optimized state handling
* (BasGo) Added option to clear array

### 0.2.2
* (BasGo) Added check for newer entries

### 0.2.1
* (BasGo) Extended configuration

### 0.2.0
* (BasGo) Materialized admin page

### 0.1.1
* (BasGo) Fixed some smaller issues

### 0.1.0
* (BasGo) Initial release

## License

This adapter is licensed under the [MIT License](../blob/master/LICENSE) which is part of this repository.

Copyright (c) 2018-2019 BasGo <basgo@gmx.de>