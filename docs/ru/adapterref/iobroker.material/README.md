---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.material/README.md
title: ioBroker.material
hash: Q8Y6m2vj9Mh9XVrXnfMsp2U50vjHAJj7umXrVf52bsA=
---
![логотип](../../../en/adapterref/iobroker.material/admin/material.png)

![Количество установок](http://iobroker.live/badges/material-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.material.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.material.svg)
![NPM](https://nodei.co/npm/iobroker.material.png?downloads=true)

# IoBroker.material =================
React и Material UI интерфейс.

![Скриншоты](../../../en/adapterref/iobroker.material/img/screenshot1.png)

## Монтаж
** Важно! ** Этот адаптер не может быть установлен непосредственно с GitHub. Только с нпм.

## Использование
Очень важно знать, что адаптер показывает только устройства, которые добавлены в некоторые категории, такие как *комнаты* или *функция* Лучше, если каждое устройство относится к обеим категориям. Потому что у каждого устройства есть тип и место.

## Поддерживаемые типы
### Switch
### Диммер
### Медиа-плейер
### Том
### Объем группы
## Сделать
* Камеры (над дополнительным адаптером)
* события (через дополнительный адаптер)
* Главный экран
* Графики
* Узкое меню
* пылесос
* Показать бар для ползунков, чтобы указать положение
* поддержка кодов качества
* Карты (OpensStreetMap)
* Переключиться на экран по умолчанию через X секунд
* Заказ состояний в информации
* Используйте иконки в погоду, а не текст

## Кредиты
- Использованные иконки от flaticon
- Регулятор громкости от [здесь] (https://codepen.io/blucube/pen/cudAz) Автор [Эд Хикс] (https://twitter.com/blucube) - Вдохновлен [выстрелом дрибблинга] (https: / /dribbble.com/shots/753124-Volume-Knob) [Рикардо Салазар] (https://twitter.com/rickss)

## Changelog
### 0.10.6 (2019.01.29)
*  Added Chinese support

### 0.10.5 (2018.10.15)
* (bluefox) fix error with settings

### 0.10.3 (2018.09.02)
* (bluefox) implement color temperature
* (bluefox) implement cache of objects

### 0.10.1 (2018.09.02)
* (bluefox) GUI corrections
### 0.10.0 (2018.08.30)
* (bluefox) RGB was corrected

### 0.9.12 (2018.08.19)
* (bluefox) RGB was implemented

### 0.9.11 (2018.08.14)
* (bluefox) Fixed error with empty page

### 0.9.10 (2018.08.08)
* (bluefox) Crop of images was implemented
* (bluefox) Background of tiles is possible
* (bluefox) Double width of every tile is possible
* (bluefox) Group light control
* (bluefox) Custom URLs implemented

### 0.9.9 (2018.08.03)
* (bluefox) Order of tiles is implemented
* (bluefox) Support of dwd data

### 0.9.7 (2018.07.30)
* (bluefox) Implemented the weather widget

### 0.9.4 (2018.07.26)
* (bluefox) Bug-fixes

### 0.9.3 (2018.07.25)
* (bluefox) Many changes

### 0.9.2 (2018.07.21)
* (bluefox) Update logic was implemented (only with web 2.4.1)

### 0.9.1 (2018.07.20)
* (bluefox) Volume control was implemented

### 0.8.9 (2018.07.17)
* (bluefox) React app

### 0.5.7 (2018.01.24)
* (bluefox) Ready for cloud services

### 0.5.6 (2017.10.11)
* (bluefox) fix undefined names
* (bluefox) fix detection of switches

### 0.5.3 (2017.08.11)
* (bluefox) fix dimmer

### 0.5.2 (2017.07.30)
* (bluefox) fix action icons

### 0.5.1
* (bluefox) edit of visibility

## License
CC-BY-NC

Copyright (c) 2017-2018 bluefox <dogafox@gmail.com>

Commercial use is not allowed without permission.