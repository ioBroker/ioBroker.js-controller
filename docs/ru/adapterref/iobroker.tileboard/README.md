---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tileboard/README.md
title: ioBroker.tileboard
hash: KDDfAmppbMhPsVKDFRcw4XVgwSDkfh3rObW7OlcqqWQ=
---
![логотип](../../../en/adapterref/iobroker.tileboard/admin/tileboard.png)

![Количество установок](http://iobroker.live/badges/tileboard-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tileboard.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tileboard.svg)
![NPM](https://nodei.co/npm/iobroker.tileboard.png?downloads=true)

# IoBroker.tileboard
Веб-визуализация для платформы ioBroker на основе [TileBoard для домашнего помощника](https://github.com/resoai/TileBoard).
Большое спасибо [Алексей Иванов](https://github.com/resoai).

## Установка и документация
<! - ![Демо интерфейс](images/user0.png) -> <! - ![Демо интерфейс](../../../en/adapterref/iobroker.tileboard/images/user7.png) ->

## Интерфейс управления
TileBoard создает 3 переменные:

- control.instance - здесь экземпляр браузера должен быть написан или "*", если каждый браузер должен контролироваться.
- control.data - Параметр для команды. Смотрите описание конкретной команды.
- control.command - Имя команды. Запись этой переменной запускает команду. Это означает, что перед тем, как команда будет записана, «экземпляр» и «данные» должны быть подготовлены с данными.

Команды:

* alert - показывать окно предупреждений в TileBoard. «control.data» имеет следующий формат «message; title; jquery-icon». Заголовок и JQuery-значок не являются обязательными. Имена значков можно найти [здесь] (http://jqueryui.com/themeroller/). Чтобы показать иконку «ui-icon-info», напишите `` `Message ;; info```.
* changeView - переключиться на нужный вид. «control.data» должен иметь индекс или заголовок представления, как определено в config.
* refresh - перезагрузить TileBoard, например, после изменения проекта, чтобы перезагрузить все браузеры.
* перезагрузить - так же, как обновить.
* popup - открывает новое окно браузера. Ссылка должна быть указана в "control.data", например, http://google.com
* playSound - воспроизвести звуковой файл. Ссылка на файл указана в «control.data», например, http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

  Вы можете загрузить свой собственный файл в TileBoard и позволить ему воспроизводиться, например, "/tileboard.0/main/img/myFile.mp3".

Если пользователь меняет представление или при запуске переменные будут заполнены TileBoard

- "control.instance": экземпляр браузера и ack = true
- «control.data»: заголовок страницы, как определено в конфигурации
- "control.command": "changeView" и ack = true

Вы можете записать JSON-строку или Object в control.command как ```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}```. В этом случае экземпляр и данные будут взяты из объекта JSON.

### Оповещение
Чтобы получить больше настроек для оповещения, вы можете отправить следующую структуру для настройки каждого параметра всплывающего уведомления из адаптера скрипта.

```
setState('tileboard.0.control.command', JSON.stringify({
    command: "alert",
    instance: "*",
    data: {
        "icon": "mdi-car",        // Material icon
        "type": "info",           // Type: info, warning, error, success
        "title": "Information",   // Header of the message
        "message": "Hello world", // Text of the message
        "lifetime": 5,            // Seconds
    }
}));
```

## Changelog
### 0.2.0 (2019-07-15)
* (bluefox) Changes of the original tileboard were merged

### 0.1.1 (2019-02-12)
* (bluefox) Changes of the original tileboard were merged

### 0.1.0 (2019-01-16)
* (bluefox) initial commit

## License
Copyright (c) 2019 bluefox <dogafox@gmail.com>
 
MIT License