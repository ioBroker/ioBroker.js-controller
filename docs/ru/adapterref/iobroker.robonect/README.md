---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.robonect/README.md
title: ioBroker.robonect
hash: AIePSRE9dTKq6kfagz+sRD1BIjw03aCX+GDwSfQ9qoo=
---
![логотип](../../../en/adapterref/iobroker.robonect/admin/robonect.png)

![Статус сборки](https://ci.appveyor.com/api/projects/status/yl79oamamifjvqrq?svg=true)
![Количество установок](http://iobroker.live/badges/robonect-stable.svg)

# IoBroker.robonect
Это адаптер ioBroker для вашей газонокосилки с поддержкой Robonect HX. Он был протестирован с Robonect v1.1b (с ZeroConf v1.4) и Gardena R70Li.

## Настройки
* Требуется ввести IP-адрес модуля Robonect. Если имя пользователя и пароль установлены, они также необходимы.
* ioBroker.robonect опрашивает данные с различными интервалами: по умолчанию информация о состоянии опрашивается каждые 60 секунд (1 минута), а другая информация опрашивается каждые 900 секунд (15 минут).
* Для предотвращения опроса можно настроить два периода отдыха, например, в полдень и ночью. Информация, которую можно опросить, не разбудив газонокосилку (и подать звуковой сигнал), все равно будет опрошена.
* Для каждого запроса API можно выбрать интервал опроса (статус или информация) или вообще не опрашивать.

## Контроль
### Режим
Режим газонокосилки можно контролировать, изменив robonect.0.status.mode. Возможные режимы: «Авто», «Домой», «Ручной», «Конец дня» и «Работа» (в данный момент не полностью реализованы).

### Расширения
Можно управлять расширениями GPIO 1, GPIO 2, OUT 1 и OUT 2 модуля Robonect. Требование заключается в том, что режим расширения настраивается как «API» через веб-интерфейс Robonect. Например, если светодиоды подключены к OUT1, их можно включить ночью и выключить утром, установив для Robonect.0.extension.out1.status значение «true» или «false».

## Changelog
### 0.0.12
* (braindead1) improved polling

### 0.0.11
* (braindead1) implemented weather and GPS polls

### 0.0.10
* (braindead1) first stable version

### 0.0.9
* (braindead1) adapter improvements

### 0.0.8
* (braindead1) fixed some issues caused by different configurations

### 0.0.7
* (braindead1) prepared adapter for latest repository

### 0.0.6
* (braindead1) fixed minor issues

### 0.0.5
* (braindead1) updated to work with Robonect HX version 1.1b

### 0.0.4
* (braindead1) updated to work with Robonect HX version 1.0 Beta5

### 0.0.3
* (braindead1) support of Admin3

### 0.0.2
* (braindead1) updated to work with Robonect HX version 1.0 Beta2

### 0.0.1
* (StefSign) initial commit

## License
The MIT License (MIT)

Copyright (c) 2020 braindead1

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