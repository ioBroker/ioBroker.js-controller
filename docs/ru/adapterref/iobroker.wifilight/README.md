---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wifilight/README.md
title: ioBroker.wifilight
hash: h3yqoVsmU/F7BiffThXvqiZH/tuN6ByBLAJZL5cSJ4Y=
---
![логотип](../../../en/adapterref/iobroker.wifilight/admin/wifilight.png)

![Количество установок](http://iobroker.live/badges/wifilight-community-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.wifilight.svg)
![тесты](http://img.shields.io/travis/soef/ioBroker.wifilight/master.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.wifilight
## Описание
Адаптер ioBroker для WiFi Light

## Информация
Поддерживает LW12, LD382 и LD382A.
Добавлена поддержка Mi-Light / LimitlessLED RGBW.

## Первоначальное создание
Этот адаптер изначально был создан @soef по адресу https://github.com/soef/ioBroker.wifilight, но больше не поддерживается, поэтому мы переместили его в iobroker-community, чтобы можно было исправлять ошибки. спасибо @soef за его работу.

### Как использовать команду состояния:
+ Возможные идентификаторы: ``red, r, green, g, blue, b, bri, sat, transition, on, off`` + Строка может быть JSON с круглыми скобками или без них.
+ Вы также можете присвоить значение с помощью = + Диапазон цветов: ```0..255``` + Диапазон значений bri: ``0..100``

Несколько примеров:

```
r = 100; g = 250, b = 100
r: 0, g: 0, b = 255
red: 200, green: 0, blue: 0
{r:100, b: 200, transition: 20}
off
on
{on:0}
```

Чтобы изменить цвет, вам не нужно использовать все три значения.
Например, ``` red = 0 ```, синий и зеленый останутся без изменений.

### R, g, b, w заявляет:
+ Значения 0..255 + \ #rrggbb [ww]

## Установка
Используйте панель «Адаптер» в iobroker, чтобы добавить экземпляр.

Если не существует, выполните следующую команду в корневом каталоге iobroker (например, в / opt / iobroker).

```
npm install iobroker.wifilight
```

### Исправление ошибок
Если вы не работаете, попробуйте установить пакет soef npm.

```
cd /opt/iobroker/node_modules/iobroker.wifilight
sudo npm install soef
```

## Changelog
### 1.1.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

### 1.0.0 (2019-10-18)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2019-2020 soef <soef@gmx.net>

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