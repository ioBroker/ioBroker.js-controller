---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wifilight/README.md
title: без названия
hash: iX5EastiflUGn7bjJvK4dyhqcdmfFAK23YDKRt3LuDc=
---
![логотип](../../../en/adapterref/iobroker.wifilight/admin/wifilight.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.wifilight.svg)
![тесты](http://img.shields.io/travis/soef/ioBroker.wifilight/master.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

#### IoBroker.wifilight
#### Описание
Адаптер ioBroker для WiFi Light

#### Информация
Поддерживает LW12, LD382 и LD382A.
Добавлена поддержка Mi-Light / LimitlessLED RGBW.

###### Как использовать команду состояния:
+ Возможные идентификаторы: ``red, r, green, g, blue, b, bri, sat, transition, on, off`` + Строка может быть JSON с круглыми скобками или без них.
+ Вы также можете назначить значение с помощью = + Диапазон цветов: ```0..255``` + Диапазон значений bri: ``0..100``

Некоторые примеры:

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

###### R, g, b, w состояний:
+ Значения 0..255 + \ #rrggbb [ww]

#### Монтаж
Выполните следующую команду в корневом каталоге iobroker (например, в / opt / iobroker)

```
npm install iobroker.wifilight
```

<!--

## License
The MIT License (MIT)

Copyright (c) 2016 soef <soef@gmx.net>

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
-->