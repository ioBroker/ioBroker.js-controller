---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Pix---/ioBroker.tankerkoenig/badge.svg?targetFile=package.json
BADGE-NPM: https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tankerkoenig/README.md
title: ioBroker.tankerkoenig
hash: prGhaNtsE2EchhnmVj2lhDlALqJtEe8yqbEtmyg/jjU=
---
![логотип](../../../en/adapterref/iobroker.tankerkoenig/../../admin/tankerkoenig.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)
![NPM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Pix---/ioBroker.tankerkoenig/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tankerkoenig?branch=master&svg=true)

# IoBroker.tankerkoenig
## Описание
Этот адаптер возвращает цены на топливо для десяти различных станций через канал JSON веб-службы [tankerkoenig.de] (https://creativecommons.tankerkoenig.de/#about). Все данные хранятся в объектах, которые будут использоваться и отображаться в [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis).
Адаптер использует сайт price.php, который уменьшает объем данных, передаваемых при обновлении, по сравнению с list.php и detail.php (массовые). Адаптер создает точки данных для станции, которая продает самые дешевые E5, E10 и дизельное топливо.

## Конфигурация
### Ключ API
Ключ API можно получить в [сайт Tankerkönig](https://creativecommons.tankerkoenig.de/#about). Это 36-значный код, который необходимо ввести в это поле.

### Станции
Можно определить до десяти различных станций. Поэтому конкретный идентификатор станции можно получить на tankerkoenig.de. Он также имеет 36 цифр. Этот идентификатор необходимо ввести в список. Соответствующее имя необязательно.
![альтернативный текст](../../../en/adapterref/iobroker.tankerkoenig/img/tankerkoenigSettingsScreenshot.jpg "Настройки снимка экрана")

### Написать ноль
В случае отключения эта опция не позволяет адаптеру сохранять старые значения. Это помогает создать более плавную диаграмму истории.

### Свернуть журнал
Эта опция может быть выбрана для уменьшения записи журнала (например, на SD-карты).

## Активация
Адаптер работает как демон (не в режиме расписания) и запускается регулярно каждые пять минут. Данные исходного фида обновляются сервером tankerkoenig.de только каждые 4 минуты, поэтому более частый запрос данных не имеет смысла и вызывает только избыточный трафик данных и требует ресурсов. В любой момент можно установить большие интервалы.

## Datapoints
У каждой из десяти десяти станций есть канал для каждого типа топлива (E5, E10 и дизельное топливо), и, кроме того, каждая из них имеет еще четыре точки данных.

* `feed` (цена с тремя десятичными знаками; номер типа)
* `short` (цена с двумя десятичными знаками; строка типа)
* `3rd` (третий десятичный знак не может быть написан как верхний индекс в VIS)
* `комбинированный` (готовая к использованию цена в формате HTML с надстрочным третьим десятичным знаком и информация, открыта ли станция [" закрыта "/" не найдена "] для отображения в виджете VIS HTML)

![альтернативный текст](../../../en/adapterref/iobroker.tankerkoenig/img/tankerkoenigDP.jpg "точек данных")

Сохранены еще три точки данных

* `status` (состояние открыто / закрыто)
* `name` (пользовательское имя станции)
* `station_id` (Идентификатор Tankerkönig этой станции)

Дополнительно хранятся самые дешевые станции для каждого типа топлива.

* `самый дешевый.E5`
* `chepest.E10`
* `самый дешевый. дизель`

В этих каналах хранятся станции с самой низкой ценой для каждого типа топлива. Если несколько станций предлагают одинаковую самую низкую цену, станции будут отсортированы в том порядке, в котором они использовались в конфигурации.

Создана 181 точка данных.

## ВИС
Объединенная точка данных может быть легко отображена в этом виджете VIS.

```
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```

Значение точки данных `combined` передает класс css. Это классы `station_open`, `station_closed` и `station_notfound`. С помощью определений CSS в редакторе CSS в VIS теперь можно достичь различимых дизайнов (например, красный цвет шрифта для закрытой станции).

```
.station_open {
    color: blue;
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}

/* € sign */
.station_combined_euro {
    font-family: Times;
    font-size: 80%;
}
```

## Компактный режим
Этот адаптер готов к работе в компактном режиме iobroker.

## Changelog
### 2.0.9 (2020-04-21)
* (pix) NodeJS 10 or higher required

### 2.0.8 (2020-03-27)
* (Zwer2k) 2.0.8 Catch error if station status reports _no data_

### 2.0.7 (2020-03-25)
* (pix) 2.0.7 Catch error if station status reports _no stations_

### 2.0.6 (2019-04-17)
* (Zwer2k) implementation of utils corrected
* (Zwer2k) fixed error occured when all stations were closed

### 2.0.5 (2019-02-22)
* (jens-maus) fixes to prevent _request()_ floodings

### 2.0.3 (2019-02-21)
* (pix) fixed issue with too short sync interval
* (pix) removed datapoint __price__ which was created for debug only

### 2.0.1 (2019-02-20)
* (pix) fixed scrollbar issue in firefox

### 2.0.0 (2019-02-18)
* (pix) admin3 ready

### 1.3.1 (2019-02-05)
* (arteck, pix) request issues fixed

### 1.3.0 (2019-02-05)
* (pix) Compact mode added

### 1.2.1 (2018-11-25)
* (pix) fixed issue __station_id__ and __status__ mixed up

### 1.2.0 (2018-11-25)
* (pix) new datapoint station ID added

### 1.1.0 (2018-05-12)
* (bluefox) prices as number to allow logging were added

### 1.0.5 (2018-02-07)
* (pix) Log entry opt out

### 1.0.4 (2017-03-21)
* (pix) position of _adapter.stop()_ optimized

### 1.0.3 (2017-01-05)
* (pix) Appveyor testing added

### 1.0.2 (2017-01-04)
* (apollon77) TravisCI testing added

### 1.0.1 (2016-12-20)
* (pix) reset to zero issue fixed

### 1.0.0 (2016-10-08)
* (pix) reset values to zero before each refresh now can be ticked off.

### 0.1.2 (2016-07-05)
* (pix,jens-maus) whitespaces between price and € sign

### 0.1.1 (2016-07-05)
* (pix) € appearance in datapoints __combined__ is customizable through css now (thanx jens-maus)

### 0.1.0 (2016-06-12)
* (pix) first version for npm
* (pix) settings window

### 0.0.8 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.7 (2016-06-09)
* (pix) New channels and values for cheapest station created

### 0.0.6 (2016-06-08)
* (pix) Short prices now string

### 0.0.5 (2016-06-08)
* (pix) Channels added for stations 2 to 10
* (pix) Readme corrected (CSS code example)
* (pix) no more log.warn if station is closed
* (pix) scheduled starting improved

### 0.0.4 (2016-06-01)
* (pix) HTML Code in Datapoint __combined__ corrected

### 0.0.3 (2016-06-01)
* (pix) Datapoint __combined__ with CSS class for status

### 0.0.2 (2016-06-01)
* (pix) Datapoint __combined__

### 0.0.1 (2016-05-31)
* (pix) Adapter created

## License

The MIT License (MIT)

Copyright (c) 2016-2020 pix

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.