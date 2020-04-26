---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rssfeed/README.md
title: Адаптер ioBroker для запроса и показа RSS-каналов различных стандартов (Atom, RSS, RDF)
hash: fdZGN3otuVCjYZjFFxzWNfhB/D59zu4ZgSI8B7Pene4=
---
![логотип](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed-logo.png)

![Количество установок](http://iobroker.live/badges/rssfeed-installed.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Travis](https://img.shields.io/travis/oweitman/ioBroker.rssfeed.svg)
![AppVeyor Статус сборки](https://img.shields.io/appveyor/ci/oweitman/iobroker-rssfeed.svg)
![GitHub вопросы](https://img.shields.io/github/issues/oweitman/ioBroker.rssfeed.svg)

# IoBroker Адаптер для запроса и отображения RSS-каналов различных стандартов (Atom, RSS, RDF)
## Обзор
Адаптер для запроса и показа RSS-каналов разных стандартов (Atom, RSS, RDF).
Вы можете настроить вывод канала с помощью системы шаблонов. В шаблоны вы можете включить HTML, CSS и Javascript.

## Установка
Адаптер доступен в последнем репозитории.

## Добавить экземпляр
После установки адаптер должен отображаться в разделе адаптеров в iobroker.
Иногда случается, что изменения не видны, особенно с веб-изменениями (виджеты / диалоговое окно конфигурации), в командной строке может потребоваться выполнить следующую команду:

```
iobroker upload rssfeed
```

В правой части строки адаптера можно добавить экземпляр с помощью кнопки «плюс».

## Конфигурация
Конфигурация относительно проста. Есть только несколько полей

| Установка | описание |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Обновить | это общая спецификация того, как часто корм должен вызываться снова в течение нескольких минут. По умолчанию 60 минут |
| Максимальное количество элементов в точке данных | Общий объем данных для обработки может быть ограничен здесь. |

Тогда для каждого нового канала:

| Установка | описание |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| Имя | Название для точки данных. Внутри папки имя не должно появляться дважды. |
| Категория | Имя подпапки там, где должна появиться точка данных. Категория должна быть уникальной |
| URL | Полный адрес канала (с http:// или https://, см. Примеры ниже) |
| Обновить | Для этого канала можно указать другое значение. В противном случае общая спецификация берется |
| Кнопка Изменить | Выбранный элемент будет удален, а значения появятся в разделе «Добавление» |
| Удалить кнопку | Выбранный элемент будет удален |

Если вы сохранили и закрыли конфигурацию, данные канала можно найти как точку данных JSON в дереве объектов.

## Vis и виджеты
Следующие виджеты действительно существуют

* Виджет RSS Feed - чтобы показать один канал
* RSS Feed Multi виджет - чтобы показать несколько агрегированных каналов в одном виджете.
* RSS Feed meta Helper - вспомогательный виджет для проверки метаданных канала
* RSS Feed article Helper - вспомогательный виджет для проверки данных статьи канала
* RSS Feed Marquee - виджет для отображения заголовков канала в виде выделения.
* Шаблон JSON - это виджет, который не имеет ничего общего с RSS-каналами, но вы можете определить собственный шаблон для отображения любых данных JSON в vis.

Документация для vis-виджетов доступна внутри vis или [Виджет-Documentation / немецкий](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html)

## Шаблон на основе примеров
Пример, который я протестировал со следующими RSS-лентами:

* http://www.tagesschau.de/xml/rss2
* https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html

```
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Система шаблонов работает с определенными тегами.
Используемые теги означают следующее

| тег | описание |
| ----- | --------------------------------------------------------------------- |
| <% = | Содержимое содержащегося выражения / переменной будет экранировано. |
| <% - | Содержимое содержащегося выражения / переменной не экранировано. |
| <% | Нет вывода, используется для вложенных инструкций JavaScript |
| %> | обычно закрывающий тег для завершения одного из предыдущих |

Все, что находится за пределами этих тегов, отображается в точности так, как оно есть, или, если это HTML, интерпретируется как HTML. (см., например, p-tag, div-tag, small-tag В шаблоне у вас есть 2 предопределенные переменные доступны

#### Мета
Это содержит всю мета-информацию о канале. Следующий контент доступен. Я думаю, что идентификаторы говорят сами за себя. В помощь я опишу их более подробно. или укажите содержимое (некоторые из них являются массивами)

#### Статьи
Массив с отдельными элементами (массив javascript). Каждый элемент имеет следующие свойства.
Так, чтобы он подходил, например, я сделаю элемент префикса перед ним. Но если вы хотите, вы можете выбрать это самостоятельно. Это только должно быть названо соответственно в цикле (forEach). И здесь идентификаторы не требуют пояснений. Не все атрибуты заполняются в каждом фиде. Самые важные из них уже включены в шаблон выше.

item.title item.description item.summary item.link item.origlink item.permalink item.date item.pubdate item.author item.guid item.comments item.image item.categories item.source item.enclosures

## Пример шаблона и подробное описание
```
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Краткое описание того, что происходит в отдельных строках Z1: вывод заголовка канала Z2: без вывода. Команда Javascript для циклического прохождения по всем статьям, с каждым ходом текущий элемент назначается переменному элементу.
Z3: вывод даты и времени. Он заключен в тег p / small для форматирования. Vis-own функция форматирования даты используется для форматирования. Описание можно найти в адаптере виз.
Z4: вывод заголовка статьи. Заголовок 3 - тег используется для форматирования.
Z5: Вывод содержания статьи. Он заключен в p-тег. Здесь, по крайней мере, в двух примерах включен HTML-код, который обычно поставляется с изображением и описательным текстом Z6: Выведите тег div, который очищает специальное форматирование в feed-html (в обоих примерах для tagesschau и bild это необходимо. Другие каналы, возможно, не нуждались в этом.
Z7: без выхода. Эта строка закрыла цикл javascript. Все, что было определено между Z2 и Z7, повторяется для каждой отдельной статьи.

## Делать
* очистка неиспользуемых записей в datapoint info.lastRequest путем сохранения в диалоговом окне администратора.
* кнопка очистки неиспользуемых точек данных в диалоговом окне администратора
* ~~ Мульти виджет RSS-каналы ~~
* ~~ Шатер с несколькими виджетами ~~
* ~~ Weitere Datenpunkte im Template verfügbar machen. ~~
* ~~ Widget für Laufschrift mit den Titeln https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2~~

## Changelog
### 0.0.28
* remove customtab
### 0.0.27
* adapter configuration is now editable
### 0.0.26
* correct changelog size 
### 0.0.25
* the error messages for the template are improved 
### 0.0.24
* errors in the request of feeds are now real errors in the iobroker log
* loading of rules for ejs in the editor is improved 
* marquee3 widget: options to show time and date
### 0.0.23
* republish to npm
### 0.0.22
* improvements in the configuration dialog
* remove unused admintab
* new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
* New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
* the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
* Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)
### 0.0.21
* add link option to marquee widget
* widget help added 
* marquee widget: the divider characters (default: +++) are configurable
### 0.0.20
* add ejs syntax to template editor
### 0.0.19
* try to fix marquee widget.
### 0.0.18
* try to fix the wrong NoSave dialog
### 0.0.17
* rework setting objects and states
### 0.0.16
* improve logic adding rssfeed in configuration dialog
* fix wrong icon for marquee widget
* define default template for rssfeed widget
* deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
* widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles
### 0.0.15
* fix bug saving last request in adapter configuration / improve debug messages
### 0.0.14
* update package.json and install new tools for stream encoding/decoding detection
* implement encoding detection and stream encoding
* change the ejs lib with a real browserified lib
### 0.0.13
* new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.
### 0.0.12
* now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.
### 0.0.11
* improve admin layout
* implement a forceRefresh button
### 0.0.10
* fix bug a bug in marquee widget. not all styles should applied to the span tag.
### 0.0.9
* apply widget styles also to the inner span element, because they had not any effect on the marquee.
* renew the package-lock.json
* add categories to save feeds in subfolders
* improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.
### 0.0.8
* improve lasrequest logic of the adapter
* fix problem with datapoint naming
### 0.0.7
* test with encapsulation of ejs.js, becaus of error in some browsers
### 0.0.6
* add attribute duration for widget marquee to control animation duration
### 0.0.5
* new widget marquee for article titles
* add filter function for articles. the filter searchs in title,description and categories, seceral filter criteria can be seperated by semicolon
### 0.0.4
* some adjustments in readme, io-package
### 0.0.3
* add addveyor build
### 0.0.2
* added widgets meta helper and article helper
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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