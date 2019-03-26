---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pollenflug/README.md
title: Индекс риска пыльцы
hash: NkPjN63taAgECFANng1gfGLXo10RTHpxiAlaRQS2aDU=
---
![логотип](../../../en/adapterref/iobroker.pollenflug/admin/pollenflug.png)

![Travis CI Статус сборки](https://travis-ci.org/schmupu/ioBroker.pollenflug.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.pollenflug?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/pollenflug-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.pollenflug.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pollenflug.svg)
![NPM](https://nodei.co/npm/iobroker.pollenflug.png?downloads=true)

# Индекс риска пыльцы
![DWDLogo](../../../en/adapterref/iobroker.pollenflug/docs/dwdlogo.png)

Немецкая служба погоды DWD готовит ежедневные прогнозы индекса риска пыльцы.
Прогнозируются виды пыльцы: орешник, ольха, ясень, береза, трава, рожь, полынь и амброзия на сегодня и завтра, в пятницу также на послезавтра (воскресенье).
Обновляется ежедневно утром.
Информацию о округах пыльцы можно найти по адресу: https://www.dwd.de/pollenflug Авторские права на используемые данные пыльцы: © Deutscher Wetterdienst (Quelle: Deutscher Wetterdienst)

## Установка и настройка
Требуется node.js 8.0 или выше и Admin v3! Выберите округ в конфигурации адаптера ioBroker. Вы получите индекс риска пыльцы для этого округа. Индекс будет обновляться один раз в день, около 11 часов.
В объектах info.today, info.trible и info.dayaftertuture будет указан срок действия.
Возможно, например, что сегодня пятница, но в объекте info.today день - четверг.
Это верно, потому что данные DWD все еще с четверга и не обновляются до сих пор. Обновление будет в 11 часов обычно.

Предоставленные немецкие округа:

* Шлезвиг-Гольштейн и Гамбург (регион 11 и 12)
    * Inseln und Marschen (регион 11)
    * Geest, Шлезвиг-Гольштейн и Гамбург (регион 12)
* Мекленбург-Передняя Померания (регион 20)
* Niedersachsen und Bremen (регион 31 и 32)
    * Вестл. Нидерсаксен / Бремен (регион 31)
    * Остл. Нидерсаксен (регион 32)
* Северный Рейн-Вестфалия (регион 41, 42 и 43)
    * Рейн-Вестфал. Тифленд (регион 41)
    * Оствестфален (регион 42)
    * Mittelgebirge NRW (регион 43)
* Бранденбург и Берлин (регион 50)
* Sachsen-Anhalt (регион 61 и 62)
    * Tiefland Sachsen-Anhalt (регион 61)
    * Гарц (регион 62)
* Тюринген (регион 71 и 72)
    * Tiefland Thüringen (регион 71)
    * Миттельгебирге Тюринген (регион 72)
* Sachsen (регион 81 и 82)
    * Tiefland Sachsen (регион 81)
    * Mittelgebirge Sachsen (регион 82)
* Гессен (регион 91 и 92)
    * Nordhessen und hess. Миттельгебирге (регион 91)
    * Рейн-Майн (регион 92)
* Рейнланд-Пфальц и Саар (регионы 101, 102 и 103)
    * Рейн, Пфальц, Нахе и Мозель (регион 101)
    * Mittelgebirgsbereich Рейнланд-Пфальц (регион 102)
    * Саар (регион 103)
* Баден-Вюртемберг (регион 111, 112 и 113)
    * Oberrhein und unteres Neckartal (регион 111)
    * Гогенлоэ / Митлерер Неккар / Обершвабен (регион 112)
    * Миттельгебирге Баден-Вюртемберг (регион 113)
* Бавария (регион 121, 122, 123 и 124)
    * Allgäu / Oberbayern / Bay. Вальд (регион 121)
    * Donauniederungen (регион 122)
    * Бавария Нордл. дер Донау, о. Bayr. Вальд, о. Mainfranken (регион 123)
    * Mainfranken (регион 124)

![ioBroker1](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug1.png)

Исходный индекс риска DWD 0, 0-1, 1, 1-2, 2, 2-3 и 3 изменяется на 0, 1, 2, 3, 4, 5 и 6.
Этот формат проще использовать в ioBroker.

| Индекс | Индекс DWD | описание |
|-----	|---------- |------------------------------------ |
| -1 | -1 | нет данных |
| 0 | 0 | нет концентрации пыльцы |
| 1 | 0-1 | нет низкой концентрации пыльцы |
| 2 | 1 | низкая концентрация пыльцы |
| 3 | 1-2 | низкая и средняя концентрация пыльцы |
| 4 | 2 | средняя концентрация пыльцы |
| 5 | 2-3 | концентрация пыльцы от средней до высокой |
| 6 | 3 | высокая концентрация пыльцы |

** Пример полета пыльцы: ** ![ioBroker2](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug2.png)

![ioBroker3](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug3.png)

URL-адрес изображения пыльцы из DWD

![ioBroker4](https://www.dwd.de/DWD/warnungen/medizin/pollen/pollen_1_0.png)

## Пример
Если поступят новые данные из DWD (изменится сегодняшняя дата), сценарий покажет индекс риска пыльцы для Hasel и Erle.

```sh
on({id: "pollenflug.0.info.today"/*Today*/, change: "ne"}, (obj) => {
    let hasel = getState("pollenflug.0.region#12.Hasel.text_today"/*today*/).val;
    let erle  = getState("pollenflug.0.region#12.Erle.text_today"/*today*/).val;
    console.log("Haselnuss Belastung " + hasel);
    console.log("Erle Belastung " + erle);
});
```

## Changelog

### 1.0.2 (12.03.2019)
* (Stübi) Bugfixing, of changing sepaation of entries in riskindex_x from ',' to ', '
* (Stübi) unnecessary states will be deleted

### 1.0.1 (11.03.2019)
* (Stübi) Delete all states for day after tommorrow 
* (Stübi) Changed type of object riskindex_x from number to string
* (Stübi) Changed sepaation of entries in riskindex_x from ',' to ', '
* (Stübi) Deleted in summary (json) alle -1 entries

### 1.0.0 (10.03.2019)
* (Stübi) Changed the pollen index for better use in VIS. Now you you values -1, 0, 1, 2, 3, 4, 5 ,6
* (Stübi) Add summary for today, tomorrow and the day after tomorrow in json format for every region

### 0.1.9 (25.02.2019)
* (Stübi) Link to DWD Image of pollen flight added

### 0.1.8 (24.02.2019)
* (Stübi) Bugfixing deleting object

### 0.1.6 (20.02.2019)
* (Stübi) First Version of pollen index adapter

## License
The MIT License (MIT)

Copyright (c) 2019 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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