---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: pqu3Bjsp33UvrKBQ05qx1l3rKcZM5SddWQfAlEtdnF8=
---
![логотип](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.jeelink.svg)
![Статус сборки](https://travis-ci.org/foxthefox/ioBroker.jeelink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.jeelink.png?downloads=true)

# IoBroker.jeelink
Это адаптер для ioBroker для интеграции RFM12B / RFM69 через Jeelink.
Jeelink может использоваться с предварительно загруженным программным обеспечением (rfmdemo) для считывания датчиков openenergy (emon).
Для использования датчиков LaCrosse необходимо заменить прошивку (см. Форум iobroker).

## Монтаж:
### Выпущенная версия
```javascript
npm install iobroker.jeelink
```

на малине это может помочь использовать:

```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```

 потому что пакет serialport должен быть построен на неподдерживаемом arm-hw

### Актуальная версия разработки от github (во время тестирования может не работать!)
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

или же

```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

## Настройки:
- USB-порт JeelinkAdapter обычно / dev / ttyACME
-Серийная скорость обычно 57600 бод

## Конфигурация:
должно быть сделано в админ

* определение порта USB
* установка скорости передачи
- определить адрес датчика, который получен в эфире
- определить уникальный адрес датчика в адаптере (LaCrosse меняет адрес в эфире после замены батареи, поэтому просмотрите журнал и отрегулируйте адрес датчика после замены батареи)
- определить тип датчика (см. примеры ниже)
- определить комнату

## Датчики
| Объект | Варианты устройства | Пример телеграммы | Описание |
|--------|-------|:-:|--------|
| emonTH | emonTH | OK 19 ... | датчик от openenergy.org |
| emonWater | emonWater | OK 21 ... | датчик с RFM12B для дозирования воды |
| LaCrosseDTH | TX | OK 9 ... | датчики от LaCrosse, технолин |
| HMS100TF | TXH29DTH-IT | H00 ... | датчики технолин |
| LaCrosseBMP180 || OK WS ... | сенсорный мод, суперджи |
| LaCrosseWS | WS1080, TX22, WS1600 | OK WS ... | Метеостанция |
| EC3000 | EC3000 | OK 22 ... | Счетчик энергии |
| EMT7110 | EMT7110 | OK EMT7110 ... | Счетчик энергии |
| уровень | уровень | OK LS ... | датчик уровня |

## СДЕЛАТЬ:
* другие типы датчиков
* поместите код датчика в отдельный файл
* толкает новый датчик в конфигурацию, затем отображается на странице admin / config
* Температура HMS100TF ниже 0 °C и низкий уровень заряда батареи должны быть реализованы

## Changelog
### 0.1.0
* compact mode
### 0.0.7
* new level sensor (fhem) 
### 0.0.6
* last version of serialport
* new sensor TXH29DTH-IT
* new weather station WS1600
* new sensor EC3000, EMT7110 not verified with life data

### 0.0.5
* adminv3 improved with values2table

### 0.0.4
* command to USB-stick for configuration
* added superjee, BMP180 sensor on jeenode
* admin v3 implementation

### 0.0.3
* abs humidity and dewpoint calculation

### 0.0.2
* definition of unique sensor ID for iobroker datapoint
* implementation of LaCrosseDTH
* definition of sensors via admin

### 0.0.1
* working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>