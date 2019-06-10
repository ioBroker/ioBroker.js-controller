---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: HJLyKTLvHU9Jewi/UeGxqaT9xWe3MUNwRuX1sBrSi3o=
---
![логотип](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Количество установок](http://iobroker.live/badges/heatingcontrol-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![тесты](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)

# IoBroker.HeatingControl
Адаптер для управления термостатами.

функции:

* Установка заданной температуры в определенное время
* Количество ежедневных секций с различными заданными значениями температуры регулируется
* Поддерживает различные термостаты homematic
* поддерживает несколько профилей (чтобы сделать)
* Если нет прямой связи между термостатом и приводом, привод можно отключить непосредственно от адаптера.
* В настоящее время привод отключается непосредственно при достижении заданного значения температуры. Как только заданное значение температуры не достигнуто, привод снова включается. Позже, лучшее регулирование будет осуществляться здесь.
* поддерживается до двух приводов
* Термостат и привод автоматически определяются для каждой комнаты. Для этого используется функция (например, «нагрев»).
* Комнаты могут быть деактивированы в админке, если в комнате есть термостат, но ее не нужно контролировать
* Пример визуализации будет доступен здесь позже

## Настройки
### Главный
* Использовать актеры =, если вы хотите управлять приводами напрямую от адаптера. На всякий случай нет прямой связи между термостатом и приводом.
* Gewerk = функция, которая будет использоваться для обнаружения термостатов и приводов на комнату
* Путь к термостатам = путь к термостатам, например "Гм-rpc.0."
* Путь к актерам = путь объекта к приводам, например, "Гм-rpc.0."
* часовой пояс = для использования cron для настройки заданий cron
* удалить все = удалить все настройки комнаты при открытии администратора. После этого начнется новое сканирование номеров

### Профиль
* Тип профиля = в данный момент только понедельник по воскресенье является сторонником. Другие будут реализованы в ближайшее время
* количество профилей = если вам нужно больше, то в профиле увеличьте это значение. Затем вы можете выбрать, какой профиль будет использоваться.
* количество периодов = определить, сколько ежедневных секций с различной температурой вам нужно. Чем больше вы установите, тем больше точек данных будет создано. Лучше использовать низкое значение (например, 5)
* public holyday = если вы отметите это, вы получите отдельную корректировку для государственных праздников (еще не реализовано)

### Устройства
* список всех комнат с термостатами и приводами. Вы можете отключить комнату здесь. Вы не должны изменять настройки для термостатов или приводов, потому что это будет перезаписано при следующем запуске администратора.

## Заметки
* необходим узел с версией выше 8!

## Известные вопросы
* пожалуйста, создайте проблемы на [github] (https://github.com/rg-engineering/ioBroker.heatingcontrol/issues), если вы обнаружите ошибки или пожелаете новых функций

## Changelog

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License

Copyright (C) <2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.