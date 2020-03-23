---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: Dq1R7yqzh6tng4JyujLCfbpyWc1Q6H2oRCzS2Uv4Jcw=
---
![логотип](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Количество установок](http://iobroker.live/badges/lifx-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lifx.svg)
![Статус сборки](https://travis-ci.org/foxthefox/ioBroker.lifx.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.lifx.png?downloads=true)

# IoBroker.lifx
Lifx адаптер для ioBroker

## Установка:
официальная выпущенная версия

```javascript
npm install iobroker.lifx
```

актуальная версия от github:

```javascript
npm install https://github.com/foxthefox/ioBroker.lifx/tarball/master --production
```

## Настройки / Конфигурация:
- никаких настроек или конфигурации не требуется, адаптер автоматически обнаруживает лампы

### Виджет метро недоступен статус
- маленькая иконка для недоступного статуса в metro-виджете - первый объект уведомления
- object_id [0] является индикатором. недостижим
- вместо предустановки «true» будет написано «false»
- значок должен быть wifiColorRed.png
- горизонтальное смещение 6 должно работать нормально

## Визуализация:
- использовать виджеты lifx

## Объекты
| Объект | Значение | устанавливаемое | Описание |
|--------|-------|:-:|--------|
| Bulb.state | логическое значение | x | true / false -> ON / OFF |
| Bulb.colormode | логический | x | цвет, белый |
| Bulb.temp | значение | x | цветовая температура 2500 ... 9000 K |
| Bulb.hue | значение | x | цвет 0 ... 360 |
| Bulb.sat | значение | x | насыщенность 0 ... 100% |
| Bulb.bright | значение | x | яркость 0 ... 100% |
| Bulb.online | логическое | - | истина / ложь |
| Bulb.label | значение | - | имя / этикетки |
| Bulb.vendor | значение | - | информация о продавце |
| Bulb.product | значение | - | информация о продукте |
| Bulb.colorLamp | value | - | colorLamp info |
| Bulb.infraredLamp | value | - | infraredLamp info |
| Bulb.multizoneLamp | value | - | multizoneLamp info |
| Bulb.Zone.temp | значение | x | цветовая температура 2500 ... 9000 K |
| Bulb.Zone.hue | значение | x | цвет 0 ... 360 |
| Bulb.Zone.sat | значение | x | насыщенность 0 ... 100% |
| Bulb.Zone.bright | значение | x | яркость 0 ... 100% |

## СДЕЛАТЬ:
- получение регулировки значений цвета со всеми существующими настройками (настройка яркости зафиксировала 80% насыщенности и сохраняет прежнюю настройку оттенка; настройка насыщенности и регулировки оттенка зафиксировала 80% яркости)
- время перехода
- формы волны

## Известные вопросы
- значения вне диапазона вызывают сбой адаптера

## Changelog
### 0.2.0
- lifx-lan-client library instead node-lifx
- states for vendor, product, version, product features
- multizone support
- cyclic polling

### 0.1.1
- logo quadratic

### 0.1.0
- compact mode

### 0.0.5
- adminv3
- noConfig -> no admin page anymore

### 0.0.4
- jqui widget with interactive colored slider

### 0.0.3
- metro widget
- jqui widget

### 0.0.2 
- change to node-lifx
- successful tested with 2 lamps and firmware 2.1

### 0.0.1 
- initial setup with lifx

## License

The MIT License (MIT)

Copyright (c) 2016-2020 foxthefox <foxthefox@wysiwis.net>